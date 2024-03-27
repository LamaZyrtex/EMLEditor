import * as dom from './dom.js';
import * as utils from './utils.js';
import defaultOptions from './defaultOptions.js';
import defaultCommands from './defaultCommands.js';
import { PluginManager } from './pluginManager';
import { RangeHelper } from './rangeHelper';
import templates from './templates.js';
import * as escape from './escape.js';
import * as browser from './browser.js';
import * as emoticons from './emoticons.js';
import DOMPurify from 'dompurify';

var globalWin = window;
var globalDoc = document;

var IMAGE_MIME_REGEX = /^image\/(p?jpe?g|gif|png|bmp)$/i;

/**
 * Wrap inlines that are in the root in paragraphs.
 *
 * @param {HTMLBodyElement} body
 * @param {Document} doc
 * @private
 */
function wrapInlines(body: HTMLBodyElement, doc: Document) {
	let wrapper: HTMLElement;

	dom.traverse(body, function (node: HTMLElement) {
		if (dom.isInline(node, true)) {
			// Ignore text nodes unless they contain non-whitespace chars as
			// whitespace will be collapsed.
			// Ignore emleditor-ignore elements unless wrapping siblings
			// Should still wrap both if wrapping siblings.
			if (wrapper || node.nodeType === dom.TEXT_NODE ?
				/\S/.test(node.nodeValue) : !dom.is(node, '.emleditor-ignore')) {
				if (!wrapper) {
					wrapper = dom.createElement('p', {}, doc);
					dom.insertBefore(wrapper, node);
				}

				dom.appendChild(wrapper, node);
			}
		} else {
			wrapper = null;
		}
	}, false, true);
}

/**
 * EmlEditor - A lightweight WYSIWYG editor
 *
 * @param {HTMLTextAreaElement} textarea The textarea to be converted
 * @param {Object} userOptions
 * @class EmlEditor
 * @name EmlEditor
 */
export default class EmlEditor {

	commands: any;
	opts: any;
	toggleSourceMode: () => void;
	longestEmoticonCode: number;
	inSourceMode: () => boolean;
	blur: (handler?: Function, excludeWysiwyg?: boolean, excludeSource?: boolean) => any;
	setWysiwygEditorValue: (value: string) => void;
	setSourceEditorValue: (value: string) => void;
	updateOriginal: () => void;
	getSourceEditorValue: (filter?: boolean) => string;
	dimensions: (width?: any, height?: any, save?: boolean) => any;
	readOnly: (readOnly?: any) => any;
	focus: (handler?: any, excludeWysiwyg?: boolean, excludeSource?: boolean) => any;
	val: (val?: string, filter?: boolean) => any;
	expandToContent: (ignoreMaxHeight: boolean) => void;
	rtl: (rtl?: boolean) => any;
	emoticons: (enable: boolean) => any;
	sourceMode: (enable?: boolean) => any;
	width: (width?: number, saveWidth?: boolean) => any;
	height: (height?: number, saveHeight?: boolean) => any;
	createDropDown: (menuItem: HTMLElement, name: string, content: HTMLElement) => void;
	maximize: (maximize?: boolean) => any;
	destroy: () => void;
	closeDropDown: (focus?: boolean) => void;
	wysiwygEditorInsertHtml: (html: string, endHtml?: string, overrideCodeBlocking?: boolean) => void;
	wysiwygEditorInsertText: (text: string, endText: string) => void;
	insertText: (text: string, endText: string) => any;
	sourceEditorInsertText: (text: string, endText: string) => void;
	getRangeHelper: () => RangeHelper;
	sourceEditorCaret: (position: any) => any;
	insert: (start: string, end: string, filter: boolean, convertEmoticons: boolean, allowMixed: boolean) => any;
	getWysiwygEditorValue: (filter?: boolean) => string;
	getBody: () => HTMLBodyElement;
	getContentAreaContainer: () => HTMLElement;
	execCommand: (command: string, param: string | boolean) => void;
	currentNode: () => any;
	currentBlockNode: () => any;
	bind: (events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
	unbind: (events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
	keyDown: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
	keyPress: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
	keyUp: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
	nodeChanged: (handler: Function) => any;
	selectionChanged: (handler: Function) => any;
	valueChanged: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
	css: (css: string) => any;
	removeShortcut: (shortcut: string) => any;
	emoticonsCache: any;
	addShortcut: (shortcut: string, cmd: string | Function) => any;
	clearBlockFormatting: (block: HTMLElement) => any;
	translate: (...args: any) => string;

	// Static
	static locale: any = {};
	static formats: any = {};
	static icons: any = {};
	static command: any = {};

	constructor(textarea: any, userOptions: any) {

		let emlEditor = this;

		/**
		 * Editor format like BBCode or HTML
		 */
		let format: any;

		/**
		 * The div which contains the editor and toolbar
		 *
		 * @type {HTMLDivElement}
		 * @private
		 */
		let editorContainer: HTMLDivElement;

		/**
		 * Map of events handlers bound to this instance.
		 *
		 * @type {Object}
		 * @private
		 */
		let eventHandlers: any = {};

		/**
		 * The editors toolbar
		 *
		 * @type {HTMLDivElement}
		 * @private
		 */
		let toolbar: HTMLDivElement;

		/**
		 * The editors iframe which should be in design mode
		 *
		 * @type {HTMLIFrameElement}
		 * @private
		 */
		let wysiwygEditor: HTMLIFrameElement;

		/**
		 * The editors window
		 *
		 * @type {Window}
		 * @private
		 */
		let wysiwygWindow: Window;

		/**
		 * The WYSIWYG editors body element
		 *
		 * @type {HTMLBodyElement}
		 * @private
		 */
		let wysiwygBody: HTMLBodyElement;

		/**
		 * The WYSIWYG editors document
		 *
		 * @type {Document}
		 * @private
		 */
		let wysiwygDocument: Document;

		/**
		 * The editors textarea for viewing source
		 *
		 * @type {HTMLTextAreaElement}
		 * @private
		 */
		let sourceEditor: HTMLTextAreaElement;

		/**
		 * The current dropdown
		 *
		 * @type {HTMLDivElement}
		 * @private
		 */
		let dropdown: HTMLDivElement;

		/**
		 * If the user is currently composing text via IME
		 * @type {boolean}
		 */
		let isComposing: boolean;

		/**
		 * Timer for valueChanged key handler
		 * @type {number}
		 */
		let valueChangedKeyUpTimer: any;

		/**
		 * The editors locale
		 *
		 * @private
		 */
		let locale: any;

		/**
		 * Stores a cache of preloaded images
		 *
		 * @private
		 * @type {Array.<HTMLImageElement>}
		 */
		let preLoadCache: any = Array<HTMLImageElement>;

		/**
		 * The editors rangeHelper instance
		 *
		 * @type {RangeHelper}
		 * @private
		 */
		let rangeHelper: RangeHelper;

		/**
		 * An array of button state handlers
		 *
		 * @type {Array.<Object>}
		 * @private
		 */
		let btnStateHandlers: any = [];

		/**
		 * Plugin manager instance
		 *
		 * @type {PluginManager}
		 * @private
		 */
		let pluginManager: PluginManager;

		/**
		 * The current node containing the selection/caret
		 *
		 * @type {Node}
		 * @private
		 */
		let currentNode: Node;

		/**
		 * The first block level parent of the current node
		 *
		 * @type {node}
		 * @private
		 */
		let currentBlockNode: HTMLElement;

		/**
		 * The current node selection/caret
		 *
		 * @type {Object}
		 * @private
		 */
		let currentSelection: any;

		/**
		 * Used to make sure only 1 selection changed
		 * check is called every 100ms.
		 *
		 * Helps improve performance as it is checked a lot.
		 *
		 * @type {boolean}
		 * @private
		 */
		let isSelectionCheckPending: boolean;

		/**
		 * If content is required (equivalent to the HTML5 required attribute)
		 *
		 * @type {boolean}
		 * @private
		 */
		let isRequired: boolean;

		/**
		 * The inline CSS style element. Will be undefined
		 * until css() is called for the first time.
		 *
		 * @type {HTMLStyleElement}
		 * @private
		 */
		let inlineCss: HTMLStyleElement;

		/**
		 * Object containing a list of shortcut handlers
		 *
		 * @type {Object}
		 * @private
		 */
		let shortcutHandlers: any = {};

		/**
		 * The min and max heights that autoExpand should stay within
		 *
		 * @type {Object}
		 * @private
		 */
		let autoExpandBounds: any;

		/**
		 * Timeout for the autoExpand function to throttle calls
		 *
		 * @private
		 */
		let autoExpandThrottle: any;

		/**
		 * Cache of the current toolbar buttons
		 *
		 * @type {Object}
		 * @private
		 */
		let toolbarButtons: any = [];

		/**
		 * Last scroll position before maximizing so
		 * it can be restored when finished.
		 *
		 * @type {number}
		 * @private
		 */
		let maximizeScrollPosition: number;

		/**
		 * Stores the contents while a paste is taking place.
		 *
		 * Needed to support browsers that lack clipboard API support.
		 *
		 * @type {?DocumentFragment}
		 * @private
		 */
		let pasteContentFragment: any;

		/**
		 * All the emoticons from dropdown, more and hidden combined
		 * and with the emoticons root set
		 *
		 * @type {!Object<string, string>}
		 * @private
		 */
		let allEmoticons: any = {};

		/**
		 * Current icon set if any
		 *
		 * @type {?Object}
		 * @private
		 */
		let icons: any | null;

		/**
		 * Private functions
		 * @private
		 */
		let init: any, replaceEmoticons: any, handleCommand: any, initEditor: any, initEvents: any, initLocale: any, initToolBar: any, initOptions: any, initResize: any, initEmoticons: any;
		let handlePasteEvt: any, handleCutCopyEvt: any, handlePasteData: any, handleKeyDown: any, handleBackSpace: any, handleKeyPress: any, handleFormReset: any, handleMouseDown: any, handleComposition: any;
		let handleEvent: any, handleDocumentClick: any, updateActiveButtons: any, sourceEditorSelectedText: any, appendNewLine: any, checkSelectionChanged: any, checkNodeChanged: any, autofocus: any, emoticonsKeyPress: any;
		let emoticonsCheckWhitespace: any, currentStyledBlockNode: any, triggerValueChanged: any, valueChangedBlur: any, valueChangedKeyUp: any, autoUpdate: any, autoExpand: any;

		/**
		 * All the commands supported by the editor
		 * @name commands
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.commands = utils
			.extend(true, {}, (userOptions.commands || defaultCommands));

		/**
		 * Options for this editor instance
		 * @name opts
		 * @memberOf EmlEditor.prototype
		 */
		let options: any = emlEditor.opts = utils.extend(
			true, {}, (defaultOptions as any), userOptions
		);

		// Don't deep extend emoticons (fixes #565)
		emlEditor.opts.emoticons = userOptions.emoticons || (defaultOptions as any).emoticons;

		if (!Array.isArray(options.allowedIframeUrls)) {
			options.allowedIframeUrls = [];
		}
		options.allowedIframeUrls.push('https://www.youtube-nocookie.com/embed/');

		// Create new instance of DOMPurify for each editor instance so can
		// have different allowed iframe URLs
		// eslint-disable-next-line new-cap
		let domPurify = DOMPurify();

		// Allow iframes for things like YouTube, see:
		// https://github.com/cure53/DOMPurify/issues/340#issuecomment-670758980
		domPurify.addHook('uponSanitizeElement', function (node: HTMLElement, data: any) {
			let allowedUrls = options.allowedIframeUrls;

			if (data.tagName === 'iframe') {
				let src = dom.attr(node, 'src') || '';

				for (let i = 0; i < allowedUrls.length; i++) {
					let url = allowedUrls[i];

					if (utils.isString(url) && src.substr(0, url.length) === url) {
						return;
					}

					// Handle regex
					if (url.test && url.test(src)) {
						return;
					}
				}

				// No match so remove
				dom.remove(node);
			}
		});

		// Convert target attribute into data-eml-target attributes so XHTML format
		// can allow them
		domPurify.addHook('afterSanitizeAttributes', function (node: HTMLElement) {
			if ('target' in node) {
				dom.attr(node, 'data-eml-target', dom.attr(node, 'target'));
			}

			dom.removeAttr(node, 'target');
		});

		/**
		 * Sanitize HTML to avoid XSS
		 *
		 * @param {string} html
		 * @return {string} html
		 * @private
		 */
		function sanitize(html: HTMLElement | Node | string): string {
			const allowedTags = ['iframe'].concat(options.allowedTags);
			const allowedAttrs = ['allowfullscreen', 'frameborder', 'target']
				.concat(options.allowedAttributes);

			return domPurify.sanitize(html, {
				ADD_TAGS: allowedTags,
				ADD_ATTR: allowedAttrs
			});
		}

		/**
		 * Switches between the WYSIWYG and source modes
		 *
		 * @function
		 * @name toggleSourceMode
		 * @since 1.4.0
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.toggleSourceMode = function () {
			let isInSourceMode = emlEditor.inSourceMode();

			// don't allow switching to WYSIWYG if doesn't support it
			if (!browser.isWysiwygSupported && isInSourceMode) {
				return;
			}

			if (!isInSourceMode) {
				rangeHelper.saveRange();
				rangeHelper.clear();
			}

			currentSelection = null;
			emlEditor.blur();

			if (isInSourceMode) {
				emlEditor.setWysiwygEditorValue(emlEditor.getSourceEditorValue());
			} else {
				emlEditor.setSourceEditorValue(emlEditor.getWysiwygEditorValue());
			}

			dom.toggle(sourceEditor);
			dom.toggle(wysiwygEditor);

			dom.toggleClass(editorContainer, 'wysiwygMode', isInSourceMode);
			dom.toggleClass(editorContainer, 'sourceMode', !isInSourceMode);

			updateToolBar();
			updateActiveButtons();
		};

		/**
		* If the editor is in source code mode
		*
		* @return {boolean}
		* @function
		* @name inSourceMode
		* @memberOf EmlEditor.prototype
		*/
		emlEditor.inSourceMode = function (): boolean {
			return dom.hasClass(editorContainer, 'sourceMode');
		};

		/**
		 * Adds a handler to the editors blur event
		 *
		 * @param  {Function} handler
		 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
		 *                                  to the WYSIWYG editor
		 * @param  {boolean} excludeSource  if to exclude adding this handler
		 *                                  to the source editor
		 * @return {this}
		 * @function
		 * @name blur^2
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.blur = function (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			if (utils.isFunction(handler)) {
				emlEditor.bind('blur', handler, excludeWysiwyg, excludeSource);
			} else if (!emlEditor.sourceMode()) {
				wysiwygBody.blur();
			} else {
				sourceEditor.blur();
			}

			return emlEditor;
		};

		/**
		 * Sets the WYSIWYG HTML editor value. Should only be the HTML
		 * contained within the body tags
		 *
		 * @param {string} value
		 * @function
		 * @name setWysiwygEditorValue
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.setWysiwygEditorValue = function (value: string) {
			if (!value) {
				value = '<p><br /></p>';
			}

			wysiwygBody.innerHTML = sanitize(value);
			replaceEmoticons();

			appendNewLine();
			triggerValueChanged();
			autoExpand();
		};

		/**
		 * Sets the text editor value
		 *
		 * @param {string} value
		 * @function
		 * @name setSourceEditorValue
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.setSourceEditorValue = function (value: string) {
			sourceEditor.value = value;

			triggerValueChanged();
		};

		/**
		 * Updates the textarea that the editor is replacing
		 * with the value currently inside the editor.
		 *
		 * @function
		 * @name updateOriginal
		 * @since 1.4.0
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.updateOriginal = function () {
			textarea.value = emlEditor.val();
		};

		/**
		 * Gets the text editor value
		 *
		 * If using a plugin that filters the text like the BBCode plugin
		 * it will return the result of the filtering which is BBCode to
		 * HTML so it will return HTML. If filter is set to false it will
		 * just return the contents of the source editor (BBCode).
		 *
		 * @param {boolean} [filter=true]
		 * @return {string}
		 * @function
		 * @since 1.4.0
		 * @name getSourceEditorValue
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.getSourceEditorValue = function (filter: boolean): string {
			let val = sourceEditor.value;

			if (filter !== false && 'toHtml' in format) {
				val = format.toHtml(val);
			}
			return val;
		};

		/**
		 * <p>Sets the width and/or height of the editor.</p>
		 *
		 * <p>If width or height is not numeric it is ignored.</p>
		 *
		 * <p>The save argument specifies if to save the new sizes.
		 * The saved sizes can be used for things like restoring from
		 * maximized state. This should normally be left as true.</p>
		 *
		 * @param {number}		width		Width in px
		 * @param {number}		height		Height in px
		 * @param {boolean}	[save=true]	If to store the new sizes
		 * @since 1.4.1
		 * @function
		 * @memberOf EmlEditor.prototype
		 * @name dimensions^3
		 * @return {this}
		 */
		emlEditor.dimensions = function (width?: any, height?: any, save?: boolean): any {
			// set undefined width/height to boolean false
			width = (!width && width !== 0) ? false : width;
			height = (!height && height !== 0) ? false : height;

			if (width === false && height === false) {
				return { width: emlEditor.width(), height: emlEditor.height() };
			}

			if (width !== false) {
				if (save !== false) {
					options.width = width;
				}

				dom.width(editorContainer, width);
			}

			if (height !== false) {
				if (save !== false) {
					options.height = height;
				}

				dom.height(editorContainer, height);
			}

			return this;
		};

		/**
		 * Sets if the editor is read only
		 *
		 * @param {any} readOnly
		 * @since 1.3.5
		 * @function
		 * @memberOf EmlEditor.prototype
		 * @name readOnly^2
		 * @return {this}
		 */
		emlEditor.readOnly = function (readOnly?: any): any {
			if (typeof readOnly !== 'boolean') {
				return !sourceEditor.readOnly;
			}

			wysiwygBody.contentEditable = (!readOnly).toString();
			sourceEditor.readOnly = !readOnly;

			updateToolBar(readOnly);

			return this;
		};

		/**
		 * Adds an event handler to the focus event
		 *
		 * @param  {Function | any} handler
		 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
		 *                                  to the WYSIWYG editor
		 * @param  {boolean} excludeSource  if to exclude adding this handler
		 *                                  to the source editor
		 * @return {this}
		 * @function
		 * @name focus^2
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.focus = function (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			if (utils.isFunction(handler)) {
				emlEditor.bind('focus', handler, excludeWysiwyg, excludeSource);
			} else if (!emlEditor.inSourceMode()) {
				// Already has focus so do nothing
				if (dom.find(wysiwygDocument, ':focus').length) {
					return;
				}

				let container;
				let rng = rangeHelper.selectedRange();

				// Fix FF bug where it shows the cursor in the wrong place
				// if the editor hasn't had focus before. See issue #393
				if (!currentSelection) {
					autofocus(true);
				}

				// Check if cursor is set after a BR when the BR is the only
				// child of the parent. In Firefox this causes a line break
				// to occur when something is typed. See issue #321
				if (rng && rng.endOffset === 1 && rng.collapsed) {
					container = rng.endContainer;

					if (container && container.childNodes.length === 1 &&
						dom.is(container.firstChild, 'br')) {
						rng.setStartBefore(container.firstChild);
						rng.collapse(true);
						rangeHelper.selectRange(rng);
					}
				}

				wysiwygWindow.focus();
				wysiwygBody.focus();
			} else {
				sourceEditor.focus();
			}

			updateActiveButtons();

			return this;
		};

		/**
		 * Sets the value of the editor.
		 *
		 * If filter set true the val will be passed through the filter
		 * function. If using the BBCode plugin it will pass the val to
		 * the BBCode filter to convert any BBCode into HTML.
		 *
		 * @param {string | undefined | null} val
		 * @param {boolean} [filter=true]
		 * @return {this}
		 * @since 1.3.5
		 * @function
		 * @name val^2
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.val = function (val?: string, filter: boolean = true): any {
			if (!utils.isString(val)) {
				return emlEditor.inSourceMode() ?
					emlEditor.getSourceEditorValue(false) :
					emlEditor.getWysiwygEditorValue(filter);
			}

			if (!emlEditor.inSourceMode()) {
				if (filter !== false && 'toHtml' in format) {
					val = format.toHtml(val);
				}

				emlEditor.setWysiwygEditorValue(val);
			} else {
				emlEditor.setSourceEditorValue(val);
			}

			return this;
		};

		/**
		 * Expands or shrinks the editors height to the height of it's content
		 *
		 * Unless ignoreMaxHeight is set to true it will not expand
		 * higher than the maxHeight option.
		 *
		 * @since 1.3.5
		 * @param {boolean} [ignoreMaxHeight=false]
		 * @function
		 * @name expandToContent
		 * @memberOf EmlEditor.prototype
		 * @see #resizeToContent
		 */
		emlEditor.expandToContent = function (ignoreMaxHeight: boolean) {
			if (emlEditor.maximize()) {
				return;
			}

			clearTimeout(autoExpandThrottle);
			autoExpandThrottle = false;

			if (!autoExpandBounds) {
				let height = options.resizeMinHeight || options.height ||
					dom.height(textarea);

				autoExpandBounds = {
					min: height,
					max: options.resizeMaxHeight || (height * 2)
				};
			}

			let range = globalDoc.createRange();
			range.selectNodeContents(wysiwygBody);

			let rect = range.getBoundingClientRect();
			let current = wysiwygDocument.documentElement.clientHeight - 1;
			let spaceNeeded = rect.bottom - rect.top;
			let newHeight = emlEditor.height() + 1 + (spaceNeeded - current);

			if (!ignoreMaxHeight && autoExpandBounds.max !== -1) {
				newHeight = Math.min(newHeight, autoExpandBounds.max);
			}

			emlEditor.height(Math.ceil(Math.max(newHeight, autoExpandBounds.min)));
		};

		/**
		 * Sets if the editor is in RTL mode
		 *
		 * @param {boolean} rtl
		 * @since 1.4.1
		 * @function
		 * @memberOf EmlEditor.prototype
		 * @name rtl^2
		 * @return {this}
		 */
		emlEditor.rtl = function (rtl?: boolean): any {
			let dir = rtl ? 'rtl' : 'ltr';

			if (typeof rtl !== 'boolean') {
				return dom.attr(sourceEditor, 'dir') === 'rtl';
			}

			dom.attr(wysiwygBody, 'dir', dir);
			dom.attr(sourceEditor, 'dir', dir);

			dom.removeClass(editorContainer, 'rtl');
			dom.removeClass(editorContainer, 'ltr');
			dom.addClass(editorContainer, dir);

			if (icons && icons.rtl) {
				icons.rtl(rtl);
			}

			return this;
		};

		/**
		 * Enables/disables emoticons
		 *
		 * @param {boolean} enable
		 * @return {this}
		 * @function
		 * @name emoticons^2
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.2
		 */
		emlEditor.emoticons = function (enable: boolean): any {
			if (!enable && enable !== false) {
				return options.emoticonsEnabled;
			}

			options.emoticonsEnabled = enable;

			if (enable) {
				dom.on(wysiwygBody, 'keypress', null, emoticonsKeyPress);

				if (!emlEditor.sourceMode()) {
					rangeHelper.saveRange();

					replaceEmoticons();
					triggerValueChanged(false);

					rangeHelper.restoreRange();
				}
			} else {
				let emoticons = dom.find(wysiwygBody, 'img[data-emleditor-emoticon]');

				utils.each(emoticons, function (_, img) {
					let text: any = dom.data(img, 'emleditor-emoticon');
					let textNode = wysiwygDocument.createTextNode(text);
					img.parentNode.replaceChild(textNode, img);
				});

				dom.off(wysiwygBody, 'keypress', null, emoticonsKeyPress);

				triggerValueChanged();
			}

			return this;
		};

		/**
		 * Sets if the editor is in sourceMode
		 *
		 * @param {boolean} enable
		 * @return {this}
		 * @function
		 * @name sourceMode^2
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.sourceMode = function (enable?: boolean): any {
			let inSourceMode = emlEditor.inSourceMode();

			if (typeof enable !== 'boolean') {
				return inSourceMode;
			}

			if ((inSourceMode && !enable) || (!inSourceMode && enable)) {
				emlEditor.toggleSourceMode();
			}
			return this;
		};

		/**
		 * Sets the width of the editor
		 *
		 * The saveWidth specifies if to save the width. The stored width can be
		 * used for things like restoring from maximized state.
		 *
		 * @param {number}     width            Width in pixels
		 * @param {boolean}	[saveWidth=true] If to store the width
		 * @since 1.4.1
		 * @function
		 * @memberOf EmlEditor.prototype
		 * @name width^3
		 * @return {this}
		 */
		emlEditor.width = function (width: number, saveWidth: boolean): any {
			if (!width && width !== 0) {
				return dom.width(editorContainer);
			}

			emlEditor.dimensions(width, null, saveWidth);

			return this;
		};

		/**
		 * Sets the height of the editor
		 *
		 * The saveHeight specifies if to save the height.
		 *
		 * The stored height can be used for things like
		 * restoring from maximized state.
		 *
		 * @param {number} height Height in px
		 * @param {boolean} [saveHeight=true] If to store the height
		 * @since 1.4.1
		 * @function
		 * @memberOf EmlEditor.prototype
		 * @name height^3
		 * @return {this}
		 */
		emlEditor.height = function (height?: number, saveHeight?: boolean): any {
			if (!height && height !== 0) {
				return dom.height(editorContainer);
			}

			emlEditor.dimensions(null, height, saveHeight);

			return this;
		};

		/**
		 * Creates a menu item drop down
		 *
		 * @param  {HTMLElement} menuItem The button to align the dropdown with
		 * @param  {string} name          Used for styling the dropdown, will be
		 *                                a class emleditor-name
		 * @param  {HTMLElement} content  The HTML content of the dropdown
		 * @function
		 * @name createDropDown
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.createDropDown = function (menuItem: HTMLElement, name: string, content: HTMLElement) {
			// first click for create second click for close
			let dropDownCss, dropDownClass = 'emleditor-' + name;

			emlEditor.closeDropDown();

			// Only close the dropdown if it was already open
			if (dropdown && dom.hasClass(dropdown, dropDownClass)) {
				return;
			}

			dropDownCss = utils.extend({
				top: menuItem.offsetTop,
				left: menuItem.offsetLeft,
				marginTop: menuItem.clientHeight
			}, options.dropDownCss);

			dropdown = dom.createElement('div', {
				className: 'emleditor-dropdown ' + dropDownClass
			}) as any;

			dom.css(dropdown, dropDownCss);
			dom.appendChild(dropdown, content);
			dom.appendChild(editorContainer, dropdown);
			dom.on(dropdown, 'click focusin', null, function (e: any) {
				// stop clicks within the dropdown from being handled
				e.stopPropagation();
			});

			if (dropdown) {
				let first = dom.find(dropdown, 'input,textarea')[0] as HTMLElement;
				if (first) {
					first.focus();
				}
			}
		};

		/**
		 * Sets if the editor is maximised or not
		 *
		 * @param {boolean} maximize If to maximise the editor
		 * @since 1.4.1
		 * @function
		 * @memberOf EmlEditor.prototype
		 * @name maximize^2
		 * @return {this}
		 */
		emlEditor.maximize = function (maximize?: boolean): any {
			let maximizeSize = 'emleditor-maximize';

			if (utils.isUndefined(maximize)) {
				return dom.hasClass(editorContainer, maximizeSize);
			}

			maximize = !!maximize;

			if (maximize) {
				maximizeScrollPosition = globalWin.scrollY;
			}

			dom.toggleClass(globalDoc.documentElement, maximizeSize, maximize);
			dom.toggleClass(globalDoc.body, maximizeSize, maximize);
			dom.toggleClass(editorContainer, maximizeSize, maximize);
			emlEditor.width(maximize ? '100%' : options.width, false);
			emlEditor.height(maximize ? '100%' : options.height, false);

			if (!maximize) {
				globalWin.scrollTo(0, maximizeScrollPosition);
			}

			autoExpand();

			return this;
		};

		/**
		 * Destroys the editor, removing all elements and
		 * event handlers.
		 *
		 * Leaves only the original textarea.
		 *
		 * @function
		 * @name destroy
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.destroy = function () {
			// Don't destroy if the editor has already been destroyed
			if (!pluginManager) {
				return;
			}

			pluginManager.destroy();

			rangeHelper = null;
			pluginManager = null;

			if (dropdown) {
				dom.remove(dropdown);
			}

			dom.off(globalDoc, 'click', null, handleDocumentClick);

			let form = textarea.form;
			if (form) {
				dom.off(form, 'reset', null, handleFormReset);
				dom.off(form, 'submit', null, emlEditor.updateOriginal, dom.EVENT_CAPTURE);
			}

			dom.off(window, 'pagehide', null, emlEditor.updateOriginal);
			dom.off(window, 'pageshow', null, handleFormReset);
			dom.remove(sourceEditor);
			dom.remove(toolbar);
			dom.remove(editorContainer);

			delete textarea._emleditor;
			dom.show(textarea);

			textarea.required = isRequired;
		};

		/**
		 * Closes any currently open drop down
		 *
		 * @param {boolean} [focus=false] If to focus the editor
		 *                             after closing the drop down
		 * @function
		 * @name closeDropDown
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.closeDropDown = function (focus?: boolean) {
			if (dropdown) {
				dom.remove(dropdown);
				dropdown = null;
			}

			if (focus === true) {
				emlEditor.focus();
			}
		};

		/**
		 * Inserts HTML into WYSIWYG editor.
		 *
		 * If endHtml is specified, any selected text will be placed
		 * between html and endHtml. If there is no selected text html
		 * and endHtml will just be concatenate together.
		 *
		 * @param {string} html
		 * @param {string} [endHtml=null]
		 * @param {boolean} [overrideCodeBlocking=false] If to insert the html
		 *                                               into code tags, by
		 *                                               default code tags only
		 *                                               support text.
		 * @function
		 * @name wysiwygEditorInsertHtml
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.wysiwygEditorInsertHtml = function (html: string, endHtml?: string, overrideCodeBlocking?: boolean) {
			let marker: any, scrollTop, scrollTo, editorHeight = dom.height(wysiwygEditor);

			emlEditor.focus();

			// TODO: This code tag should be configurable and
			// should maybe convert the HTML into text instead
			// Don't apply to code elements
			if (!overrideCodeBlocking && dom.closest(currentBlockNode, 'code')) {
				return;
			}

			// Insert the HTML and save the range so the editor can be scrolled
			// to the end of the selection. Also allows emoticons to be replaced
			// without affecting the cursor position
			rangeHelper.insertHTML(html, endHtml);
			rangeHelper.saveRange();
			replaceEmoticons();

			// Fix any invalid nesting, e.g. if a quote or other block is inserted
			// into a paragraph
			dom.fixNesting(wysiwygBody);

			wrapInlines(wysiwygBody, wysiwygDocument);

			// Scroll the editor after the end of the selection
			marker = dom.find(wysiwygBody, '#emleditor-end-marker')[0];
			dom.show(marker);
			scrollTop = wysiwygBody.scrollTop;
			scrollTo = ((dom.getOffset(marker) as any).top +
				(marker.offsetHeight * 1.5)) - editorHeight;
			dom.hide(marker);

			// Only scroll if marker isn't already visible
			if (scrollTo > scrollTop || scrollTo + editorHeight < scrollTop) {
				wysiwygBody.scrollTop = scrollTo;
			}

			triggerValueChanged(false);
			rangeHelper.restoreRange();

			// Add a new line after the last block element
			// so can always add text after it
			appendNewLine();
		};

		/**
		 * Like wysiwygEditorInsertHtml except it will convert any HTML
		 * into text before inserting it.
		 *
		 * @param {string} text
		 * @param {string} [endText=null]
		 * @function
		 * @name wysiwygEditorInsertText
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.wysiwygEditorInsertText = function (text: string, endText: string) {
			emlEditor.wysiwygEditorInsertHtml(
				escape.entities(text), escape.entities(endText)
			);
		};

		/**
		 * Inserts text into the WYSIWYG or source editor depending on which
		 * mode the editor is in.
		 *
		 * If endText is specified any selected text will be placed between
		 * text and endText. If no text is selected text and endText will
		 * just be concatenate together.
		 *
		 * @param {string} text
		 * @param {string} [endText=null]
		 * @since 1.3.5
		 * @function
		 * @name insertText
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.insertText = function (text: string, endText: string): any {
			if (emlEditor.inSourceMode()) {
				emlEditor.sourceEditorInsertText(text, endText);
			} else {
				emlEditor.wysiwygEditorInsertText(text, endText);
			}

			return this;
		};

		/**
		 * Gets the pasted data, filters it and then inserts it.
		 * @param {Object} data
		 * @private
		 */
		handlePasteData = (data: any) => {
			let pasteArea = dom.createElement('div', {}, wysiwygDocument);

			pluginManager.call('pasteRaw', data);
			dom.trigger(editorContainer, 'pasteraw', data);

			if (data.html) {
				// Sanitize again in case plugins modified the HTML
				pasteArea.innerHTML = sanitize(data.html);

				// fix any invalid nesting
				dom.fixNesting(pasteArea);
			} else {
				pasteArea.innerHTML = escape.entities(data.text || '');
			}

			let paste: any = {
				val: pasteArea.innerHTML
			};

			if ('fragmentToSource' in format) {
				paste.val = format
					.fragmentToSource(paste.val, wysiwygDocument, currentNode);
			}

			pluginManager.call('paste', paste);
			dom.trigger(editorContainer, 'paste', paste);

			if ('fragmentToHtml' in format) {
				paste.val = format
					.fragmentToHtml(paste.val, currentNode);
			}

			pluginManager.call('pasteHtml', paste);

			let parent = rangeHelper.getFirstBlockParent();
			emlEditor.wysiwygEditorInsertHtml(paste.val, null, true);
			dom.merge(parent);
		};


		/**
		 * Like wysiwygEditorInsertHtml but inserts text into the
		 * source mode editor instead.
		 *
		 * If endText is specified any selected text will be placed between
		 * text and endText. If no text is selected text and endText will
		 * just be concatenate together.
		 *
		 * The cursor will be placed after the text param. If endText is
		 * specified the cursor will be placed before endText, so passing:<br />
		 *
		 * '[b]', '[/b]'
		 *
		 * Would cause the cursor to be placed:<br />
		 *
		 * [b]Selected text|[/b]
		 *
		 * @param {string} text
		 * @param {string} [endText=null]
		 * @since 1.4.0
		 * @function
		 * @name sourceEditorInsertText
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.sourceEditorInsertText = function (text: string, endText: string): void {
			let scrollTop, currentValue, startPos = sourceEditor.selectionStart, endPos = sourceEditor.selectionEnd;

			scrollTop = sourceEditor.scrollTop;
			sourceEditor.focus();
			currentValue = sourceEditor.value;

			if (endText) {
				text += currentValue.substring(startPos, endPos) + endText;
			}

			sourceEditor.value = currentValue.substring(0, startPos) +
				text +
				currentValue.substring(endPos, currentValue.length);

			sourceEditor.selectionStart = (startPos + text.length) -
				(endText ? endText.length : 0);
			sourceEditor.selectionEnd = sourceEditor.selectionStart;

			sourceEditor.scrollTop = scrollTop;
			sourceEditor.focus();

			triggerValueChanged();
		};


		/**
		 * Gets the current instance of the rangeHelper class
		 * for the editor.
		 *
		 * @return {RangeHelper}
		 * @function
		 * @name getRangeHelper
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.getRangeHelper = function (): RangeHelper {
			return rangeHelper;
		};


		/**
		 * Gets or sets the source editor caret position.
		 *
		 * @param {Object} [position]
		 * @return {this}
		 * @function
		 * @since 1.4.5
		 * @name sourceEditorCaret
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.sourceEditorCaret = function (position: any): any {
			sourceEditor.focus();

			if (position) {
				sourceEditor.selectionStart = position.start;
				sourceEditor.selectionEnd = position.end;

				return this;
			}

			return {
				start: sourceEditor.selectionStart,
				end: sourceEditor.selectionEnd
			};
		};



		/**
		 * Inserts HTML/BBCode into the editor
		 *
		 * If end is supplied any selected text will be placed between
		 * start and end. If there is no selected text start and end
		 * will be concatenate together.
		 *
		 * If the filter param is set to true, the HTML/BBCode will be
		 * passed through any plugin filters. If using the BBCode plugin
		 * this will convert any BBCode into HTML.
		 *
		 * If the allowMixed param is set to true, HTML any will not be
		 * escaped
		 *
		 * @param {string} start
		 * @param {string} [end=null]
		 * @param {boolean} [filter=true]
		 * @param {boolean} [convertEmoticons=true] If to convert emoticons
		 * @param {boolean} [allowMixed=false]
		 * @return {this}
		 * @since 1.4.3
		 * @function
		 * @name insert^2
		 * @memberOf EmlEditor.prototype
		 */
		// eslint-disable-next-line max-params
		emlEditor.insert = function (
			start: string, end: string, filter: boolean, convertEmoticons: boolean, allowMixed: boolean
		): any {
			if (emlEditor.inSourceMode()) {
				emlEditor.sourceEditorInsertText(start, end);
				return this;
			}

			// Add the selection between start and end
			if (end) {
				let html = rangeHelper.selectedHtml();

				if (filter !== false && 'fragmentToSource' in format) {
					html = format
						.fragmentToSource(html, wysiwygDocument, currentNode);
				}

				start += html + end;
			}
			// TODO: This filter should allow empty tags as it's inserting.
			if (filter !== false && 'fragmentToHtml' in format) {
				start = format.fragmentToHtml(start, currentNode);
			}

			// Convert any escaped HTML back into HTML if mixed is allowed
			if (filter !== false && allowMixed === true) {
				start = start.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&amp;/g, '&');
			}

			emlEditor.wysiwygEditorInsertHtml(start);

			return this;
		};


		/**
		 * Gets the WYSIWYG editors HTML value.
		 *
		 * If using a plugin that filters the Ht Ml like the BBCode plugin
		 * it will return the result of the filtering (BBCode) unless the
		 * filter param is set to false.
		 *
		 * @param {boolean} [filter=true]
		 * @return {string}
		 * @function
		 * @name getWysiwygEditorValue
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.getWysiwygEditorValue = function (filter: boolean): string {
			let html;
			// Create a tmp node to store contents so it can be modified
			// without affecting anything else.
			let tmp = dom.createElement('div', {}, wysiwygDocument);
			let childNodes = wysiwygBody.childNodes;

			for (let i = 0; i < childNodes.length; i++) {
				dom.appendChild(tmp, childNodes[i].cloneNode(true));
			}

			dom.appendChild(wysiwygBody, tmp);
			dom.fixNesting(tmp);
			dom.remove(tmp);

			html = tmp.innerHTML;

			// filter the HTML and DOM through any plugins
			if (filter !== false && Object.prototype.hasOwnProperty.call(format, 'toSource')) {
				html = format.toSource(html, wysiwygDocument);
			}

			return html;
		};


		/**
		 * Gets the WYSIWYG editor's iFrame Body.
		 *
		 * @return {HTMLElement}
		 * @function
		 * @since 1.4.3
		 * @name getBody
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.getBody = function (): HTMLBodyElement {
			return wysiwygBody;
		};

		/**
		 * Gets the WYSIWYG editors container area (whole iFrame).
		 *
		 * @return {HTMLElement}
		 * @function
		 * @since 1.4.3
		 * @name getContentAreaContainer
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.getContentAreaContainer = function (): HTMLElement {
			return wysiwygEditor;
		};


		/**
		 * Executes a command on the WYSIWYG editor
		 *
		 * @param {string} command
		 * @param {String|Boolean} [param]
		 * @function
		 * @name execCommand
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.execCommand = function (command: string, param: any): void {
			let executed = false, commandObj = emlEditor.commands[command];

			emlEditor.focus();

			// TODO: make configurable
			// don't apply any commands to code elements
			if (dom.closest(rangeHelper.parentNode(), 'code')) {
				return;
			}

			try {
				executed = wysiwygDocument.execCommand(command, false, param);
			} catch (ex) { /* empty */ }

			// show error if execution failed and an error message exists
			if (!executed && commandObj && commandObj.errorMessage) {
				alert(emlEditor.translate(commandObj.errorMessage));
			}

			updateActiveButtons();
		};

		/**
		 * Gets the current node that contains the selection/caret in
		 * WYSIWYG mode.
		 *
		 * Will be null in sourceMode or if there is no selection.
		 *
		 * @return {?Node}
		 * @function
		 * @name currentNode
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.currentNode = function (): any {
			return currentNode;
		};


		/**
		 * Gets the first block level node that contains the
		 * selection/caret in WYSIWYG mode.
		 *
		 * Will be null in sourceMode or if there is no selection.
		 *
		 * @return {?Node}
		 * @function
		 * @name currentBlockNode
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.4
		 */
		emlEditor.currentBlockNode = function (): any {
			return currentBlockNode;
		};

		/**
		 * Translates the string into the locale language.
		 *
		 * Replaces any {0}, {1}, {2}, ect. with the params provided.
		 *
		 * @param {string} str
		 * @param {...String} args
		 * @return {string}
		 * @function
		 * @name _
		 * @memberOf EmlEditor.prototype
		 */
		emlEditor.translate = function (...args: any): string {
			let undef: any;

			if (locale && locale[args[0]]) {
				args[0] = locale[args[0]];
			}

			return args[0].replace(/\{(\d+)\}/g, function (str?: any, p1?: any) {
				return args[p1 - 0 + 1] !== undef ?
					args[p1 - 0 + 1] :
					'{' + p1 + '}';
			});
		};

		/**
		 * Binds a handler to the specified events
		 *
		 * This function only binds to a limited list of
		 * supported events.
		 *
		 * The supported events are:
		 *
		 * * keyup
		 * * keydown
		 * * Keypress
		 * * blur
		 * * focus
		 * * input
		 * * nodechanged - When the current node containing
		 * 		the selection changes in WYSIWYG mode
		 * * contextmenu
		 * * selectionchanged
		 * * valuechanged
		 *
		 *
		 * The events param should be a string containing the event(s)
		 * to bind this handler to. If multiple, they should be separated
		 * by spaces.
		 *
		 * @param  {string} events
		 * @param  {Function} handler
		 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
		 *                                  to the WYSIWYG editor
		 * @param  {boolean} excludeSource  if to exclude adding this handler
		 *                                  to the source editor
		 * @return {EmlEditor}
		 * @function
		 * @name bind
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.bind = function (events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			let eventsArr = events.split(' ');

			let i = eventsArr.length;
			while (i--) {
				if (utils.isFunction(handler)) {
					let wysEvent = 'emlwys' + eventsArr[i];
					let srcEvent = 'emlsrc' + eventsArr[i];
					// Use custom events to allow passing the instance as the
					// 2nd argument.
					// Also allows unbinding without unbinding the editors own
					// event handlers.
					if (!excludeWysiwyg) {
						eventHandlers[wysEvent] = eventHandlers[wysEvent] || [];
						eventHandlers[wysEvent].push(handler);
					}

					if (!excludeSource) {
						eventHandlers[srcEvent] = eventHandlers[srcEvent] || [];
						eventHandlers[srcEvent].push(handler);
					}

					// Start sending value changed events
					if (eventsArr[i] === 'valuechanged') {
						triggerValueChanged.hasHandler = true;
					}
				}
			}

			return this;
		};

		/**
		 * Unbinds an event that was bound using bind().
		 *
		 * @param  {string} events
		 * @param  {Function} handler
		 * @param  {boolean} excludeWysiwyg If to exclude unbinding this
		 *                                  handler from the WYSIWYG editor
		 * @param  {boolean} excludeSource  if to exclude unbinding this
		 *                                  handler from the source editor
		 * @return {this}
		 * @function
		 * @name unbind
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 * @see bind
		 */
		emlEditor.unbind = function (events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			let eventsArr = events.split(' ');

			let i = eventsArr.length;
			while (i--) {
				if (utils.isFunction(handler)) {
					if (!excludeWysiwyg) {
						utils.arrayRemove(
							eventHandlers['emlwys' + eventsArr[i]] || [], handler);
					}

					if (!excludeSource) {
						utils.arrayRemove(
							eventHandlers['emlsrc' + eventsArr[i]] || [], handler);
					}
				}
			}

			return this;
		};

		/**
		 * Adds a handler to the key down event
		 *
		 * @param  {Function} handler
		 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
		 *                                  to the WYSIWYG editor
		 * @param  {boolean} excludeSource  If to exclude adding this handler
		 *                                  to the source editor
		 * @return {this}
		 * @function
		 * @name keyDown
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.keyDown = function (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			return emlEditor.bind('keydown', handler, excludeWysiwyg, excludeSource);
		};

		/**
		 * Adds a handler to the key press event
		 *
		 * @param  {Function} handler
		 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
		 *                                  to the WYSIWYG editor
		 * @param  {boolean} excludeSource  If to exclude adding this handler
		 *                                  to the source editor
		 * @return {this}
		 * @function
		 * @name keyPress
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.keyPress = function (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			return this
				.bind('keypress', handler, excludeWysiwyg, excludeSource);
		};

		/**
		 * Adds a handler to the key up event
		 *
		 * @param  {Function} handler
		 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
		 *                                  to the WYSIWYG editor
		 * @param  {boolean} excludeSource  If to exclude adding this handler
		 *                                  to the source editor
		 * @return {this}
		 * @function
		 * @name keyUp
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.keyUp = function (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			return emlEditor.bind('keyup', handler, excludeWysiwyg, excludeSource);
		};


		/**
		 * Adds a handler to the node changed event.
		 *
		 * Happens whenever the node containing the selection/caret
		 * changes in WYSIWYG mode.
		 *
		 * @param  {Function} handler
		 * @return {this}
		 * @function
		 * @name nodeChanged
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.nodeChanged = function (handler: Function): any {
			return emlEditor.bind('nodechanged', handler, false, true);
		};

		/**
		 * Adds a handler to the selection changed event
		 *
		 * Happens whenever the selection changes in WYSIWYG mode.
		 *
		 * @param  {Function} handler
		 * @return {this}
		 * @function
		 * @name selectionChanged
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		emlEditor.selectionChanged = function (handler: Function): any {
			return emlEditor.bind('selectionchanged', handler, false, true);
		};

		/**
		 * Adds a handler to the value changed event
		 *
		 * Happens whenever the current editor value changes.
		 *
		 * Whenever anything is inserted, the value changed or
		 * 1.5 secs after text is typed. If a space is typed it will
		 * cause the event to be triggered immediately instead of
		 * after 1.5 seconds
		 *
		 * @param  {Function} handler
		 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
		 *                                  to the WYSIWYG editor
		 * @param  {boolean} excludeSource  If to exclude adding this handler
		 *                                  to the source editor
		 * @return {this}
		 * @function
		 * @name valueChanged
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.5
		 */
		emlEditor.valueChanged = function (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
			return this
				.bind('valuechanged', handler, excludeWysiwyg, excludeSource);
		};

		/**
		 * Gets the current WYSIWYG editors inline CSS
		 *
		 * @return {string}
		 * @function
		 * @name css
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.3
		 */
		/**
		 * Sets inline CSS for the WYSIWYG editor
		 *
		 * @param {string} css
		 * @return {this}
		 * @function
		 * @name css^2
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.3
		 */
		emlEditor.css = function (css: string): any {
			if (!inlineCss) {
				inlineCss = dom.createElement('style', {
					id: 'inline'
				}, wysiwygDocument) as HTMLStyleElement;

				dom.appendChild(wysiwygDocument.head, inlineCss);
			}

			if (!utils.isString(css)) {
				return inlineCss.sheet ?
					inlineCss.innerText : inlineCss.innerHTML;
			}

			if (inlineCss.sheet) {
				inlineCss.innerText = css;
			} else {
				inlineCss.innerHTML = css;
			}

			return this;
		};

		/**
		 * Removes a shortcut handler
		 * @param  {string} shortcut
		 * @return {EmlEditor}
		 */
		emlEditor.removeShortcut = function (shortcut: string): any {
			delete shortcutHandlers[shortcut.toLowerCase()];

			return this;
		};

		/**
		 * Adds a shortcut handler to the editor
		 * @param  {string}          shortcut
		 * @param  {String|Function} cmd
		 * @return {emleditor}
		 */
		emlEditor.addShortcut = function (shortcut: string, cmd: string | Function): any {
			shortcut = shortcut.toLowerCase()
			let shortcutKey = shortcut as keyof typeof shortcutHandlers;

			if (utils.isString(cmd)) {
				let strCmd = cmd as string;
				shortcutHandlers[shortcutKey] = function () {
					handleCommand(toolbarButtons[strCmd], emlEditor.commands[strCmd]);

					return false;
				};
			} else {
				shortcutHandlers[shortcutKey] = cmd;
			}

			return this;
		};

		/**
		 * Clears the formatting of the passed block element.
		 *
		 * If block is false, if will clear the styling of the first
		 * block level element that contains the cursor.
		 * @param  {HTMLElement} block
		 * @since 1.4.4
		 */
		emlEditor.clearBlockFormatting = function (block: HTMLElement): any {
			block = block || currentStyledBlockNode();

			if (!block || dom.is(block, 'body')) {
				return this;
			}

			rangeHelper.saveRange();

			block.className = '';

			dom.attr(block, 'style', '');

			if (!dom.is(block, 'p,div,td')) {
				dom.convertElement(block, 'p');
			}

			rangeHelper.restoreRange();
			return this;
		};

		/******************************************
		 * Creates the editor iframe and textarea
		 * @private
		 */
		init = () => {
			textarea._emleditor = this;

			// Load locale
			if (options.locale && options.locale !== 'en') {
				initLocale();
			}

			editorContainer = dom.createElement('div', {
				className: 'emleditor-container',
			}) as HTMLDivElement;

			dom.insertBefore(editorContainer, textarea);
			dom.css(editorContainer, 'z-index', options.zIndex);

			isRequired = textarea.required;
			textarea.required = false;

			let FormatCtor = EmlEditor.formats[options.format];
			format = FormatCtor ? new FormatCtor() : {};
			/*
			 * Plugins should be initialized before the formatters since
			 * they may wish to add or change formatting handlers and
			 * since the bbcode format caches its handlers,
			 * such changes must be done first.
			 */
			pluginManager = new PluginManager(this);
			(options.plugins || '').split(',').forEach(function (plugin: any) {
				pluginManager.register(plugin.trim());
			});
			if ('init' in format) {
				(format as any).init.call(this);
			}

			// create the editor
			initEmoticons();
			initToolBar();
			initEditor();
			initOptions();
			initEvents();

			// force into source mode if is a browser that can't handle
			// full editing
			if (!browser.isWysiwygSupported) {
				emlEditor.toggleSourceMode();
			}

			updateActiveButtons();

			let loaded = function () {
				dom.off(globalWin, 'load', null, loaded);

				if (options.autofocus) {
					autofocus(!!options.autofocusEnd);
				}

				autoExpand();
				appendNewLine();
				// TODO: use editor doc and window?
				pluginManager.call('ready');
				if ('onReady' in format) {
					format.onReady.call(this);
				}
			};
			dom.on(globalWin, 'load', null, loaded);
			if (globalDoc.readyState === 'complete') {
				loaded();
			}
		};

		/**
		 * Init the locale variable with the specified locale if possible
		 * @private
		 * @return void
		 */
		initLocale = () => {
			let lang;

			locale = EmlEditor.locale[options.locale];

			if (!locale) {
				lang = options.locale.split('-');
				locale = EmlEditor.locale[lang[0]];
			}

			// Locale DateTime format overrides any specified in the options
			if (locale && locale.dateFormat) {
				options.dateFormat = locale.dateFormat;
			}
		};

		/**
		 * Creates the editor iframe and textarea
		 * @private
		 */
		initEditor = () => {
			sourceEditor = dom.createElement('textarea', null) as HTMLTextAreaElement;
			wysiwygEditor = dom.createElement('iframe', {
				frameborder: "0",
				allowfullscreen: "true"
			}) as HTMLIFrameElement;

			/*
			 * This needs to be done right after they are created because,
			 * for any reason, the user may not want the value to be tinkered
			 * by any filters.
			 */
			if (options.startInSourceMode) {
				dom.addClass(editorContainer, 'sourceMode');
				dom.hide(wysiwygEditor);
			} else {
				dom.addClass(editorContainer, 'wysiwygMode');
				dom.hide(sourceEditor);
			}

			if (!options.spellcheck) {
				dom.attr(editorContainer, 'spellcheck', 'false');
			}

			if (globalWin.location.protocol === 'https:') {
				dom.attr(wysiwygEditor, 'src', 'about:blank');
			}

			// Add the editor to the container
			dom.appendChild(editorContainer, wysiwygEditor);
			dom.appendChild(editorContainer, sourceEditor);

			// TODO: make this optional somehow
			emlEditor.dimensions(
				options.width || dom.width(textarea),
				options.height || dom.height(textarea)
			);

			// Add ios to HTML so can apply CSS fix to only it
			let className = browser.ios ? ' ios' : '';

			wysiwygDocument = wysiwygEditor.contentDocument;
			wysiwygDocument.open();
			wysiwygDocument.write(templates('html', {
				attrs: ' class="' + className + '"',
				spellcheck: options.spellcheck ? '' : 'spellcheck="false"',
				charset: options.charset,
				style: options.style
			}));
			wysiwygDocument.close();

			wysiwygBody = wysiwygDocument.body as HTMLBodyElement;
			wysiwygWindow = wysiwygEditor.contentWindow;

			emlEditor.readOnly(!!options.readOnly);

			// iframe overflow fix for iOS
			if (browser.ios) {
				dom.height(wysiwygBody, '100%');
				dom.on(wysiwygBody, 'touchend', null, emlEditor.focus);
			}

			let tabIndex = dom.attr(textarea, 'tabindex');
			dom.attr(sourceEditor, 'tabindex', tabIndex);
			dom.attr(wysiwygEditor, 'tabindex', tabIndex);

			rangeHelper = new RangeHelper(wysiwygWindow, null, sanitize);

			// load any textarea value into the editor
			dom.hide(textarea);
			emlEditor.val(textarea.value);

			let placeholder = options.placeholder ||
				dom.attr(textarea, 'placeholder');

			if (placeholder) {
				sourceEditor.placeholder = placeholder;
				dom.attr(wysiwygBody, 'placeholder', placeholder);
			}
		};

		/**
		 * Initialises options
		 * @private
		 */
		initOptions = () => {
			// auto-update original textbox on blur if option set to true
			if (options.autoUpdate) {
				dom.on(wysiwygBody, 'blur', null, autoUpdate);
				dom.on(sourceEditor, 'blur', null, autoUpdate);
			}

			if (options.rtl === null) {
				options.rtl = dom.css(sourceEditor, 'direction') === 'rtl';
			}

			emlEditor.rtl(!!options.rtl);

			if (options.autoExpand) {
				// Need to update when images (or anything else) loads
				dom.on(wysiwygBody, 'load', null, autoExpand, dom.EVENT_CAPTURE);
				dom.on(wysiwygBody, 'input keyup', null, autoExpand);
			}

			if (options.resizeEnabled) {
				initResize();
			}

			dom.attr(editorContainer, 'id', options.id);
			emlEditor.emoticons(options.emoticonsEnabled);
		};

		/**
		 * Initialises events
		 * @private
		 */
		initEvents = () => {
			let form = textarea.form;
			let compositionEvents = 'compositionstart compositionend';
			let eventsToForward = 'keydown keyup keypress focus blur contextmenu input';
			let checkSelectionEvents = 'onselectionchange' in wysiwygDocument ?
				'selectionchange' :
				'keyup focus blur contextmenu mouseup touchend click';

			dom.on(globalDoc, 'click', null, handleDocumentClick);

			if (form) {
				dom.on(form, 'reset', null, handleFormReset);
				dom.on(form, 'submit', null, emlEditor.updateOriginal, dom.EVENT_CAPTURE);
			}

			dom.on(window, 'pagehide', null, emlEditor.updateOriginal);
			dom.on(window, 'pageshow', null, handleFormReset);
			dom.on(wysiwygBody, 'keypress', null, handleKeyPress);
			dom.on(wysiwygBody, 'keydown', null, handleKeyDown);
			dom.on(wysiwygBody, 'keydown', null, handleBackSpace);
			dom.on(wysiwygBody, 'keyup', null, appendNewLine);
			dom.on(wysiwygBody, 'blur', null, valueChangedBlur);
			dom.on(wysiwygBody, 'keyup', null, valueChangedKeyUp);
			dom.on(wysiwygBody, 'paste', null, handlePasteEvt);
			dom.on(wysiwygBody, 'cut copy', null, handleCutCopyEvt);
			dom.on(wysiwygBody, compositionEvents, null, handleComposition);
			dom.on(wysiwygBody, checkSelectionEvents, null, checkSelectionChanged);
			dom.on(wysiwygBody, eventsToForward, null, handleEvent);

			if (options.emoticonsCompat && globalWin.getSelection) {
				dom.on(wysiwygBody, 'keyup', null, emoticonsCheckWhitespace);
			}

			dom.on(wysiwygBody, 'blur', null, function () {
				if (!emlEditor.val()) {
					dom.addClass(wysiwygBody, 'placeholder');
				}
			});

			dom.on(wysiwygBody, 'focus', null, function () {
				dom.removeClass(wysiwygBody, 'placeholder');
			});

			dom.on(sourceEditor, 'blur', null, valueChangedBlur);
			dom.on(sourceEditor, 'keyup', null, valueChangedKeyUp);
			dom.on(sourceEditor, 'keydown', null, handleKeyDown);
			dom.on(sourceEditor, compositionEvents, null, handleComposition);
			dom.on(sourceEditor, eventsToForward, null, handleEvent);

			dom.on(wysiwygDocument, 'mousedown', null, handleMouseDown);
			dom.on(wysiwygDocument, checkSelectionEvents, null, checkSelectionChanged);
			dom.on(wysiwygDocument, 'keyup', null, appendNewLine);

			dom.on(editorContainer, 'selectionchanged', null, checkNodeChanged);
			dom.on(editorContainer, 'selectionchanged', null, updateActiveButtons);
			// Custom events to forward
			dom.on(
				editorContainer,
				'selectionchanged valuechanged nodechanged pasteraw paste',
				null,
				handleEvent
			);
		};

		/**
		 * Creates the toolbar and appends it to the container
		 * @private
		 */
		initToolBar = () => {
			let editor: any = this;
			let group: any;
			let commands = editor.commands;
			let exclude = (options.toolbarExclude || '').split(',');
			let groups = options.toolbar.split('|');

			toolbar = dom.createElement('div', {
				className: 'emleditor-toolbar',
				unselectable: 'on'
			}) as HTMLDivElement;

			if (options.icons in EmlEditor.icons) {
				icons = new EmlEditor.icons[options.icons]();
			}

			utils.each(groups, function (_, menuItems) {
				group = dom.createElement('div', {
					className: 'emleditor-group'
				});

				utils.each(menuItems.split(','), function (_, commandName) {
					let button: any, shortcut, command = commands[commandName];

					// The commandName must be a valid command and not excluded
					if (!command || exclude.indexOf(commandName) > -1) {
						return;
					}

					shortcut = command.shortcut;
					button = templates('toolbarButton', {
						name: commandName,
						dispName: editor.translate(command.name ||
							command.tooltip || commandName)
					}, true).firstChild;

					if (icons && icons.create) {
						let icon = icons.create(commandName);
						if (icon) {
							dom.insertBefore(icons.create(commandName),
								button.firstChild);
							dom.addClass(button, 'has-icon');
						}
					}

					button._emlTxtMode = !!command.txtExec;
					button._emlWysiwygMode = !!command.exec;
					dom.toggleClass(button, 'disabled', !command.exec);
					dom.on(button, 'click', null, function (e: any) {
						if (!dom.hasClass(button, 'disabled')) {
							handleCommand(button, command);
						}

						updateActiveButtons();
						e.preventDefault();
					});
					// Prevent editor losing focus when button clicked
					dom.on(button, 'mousedown', null, function (e: any) {
						editor.closeDropDown();
						e.preventDefault();
					});

					if (command.tooltip) {
						dom.attr(button, 'title',
							editor.translate(command.tooltip) +
							(shortcut ? ' (' + shortcut + ')' : '')
						);
					}

					if (shortcut) {
						editor.addShortcut(shortcut, commandName);
					}

					if (command.state) {
						btnStateHandlers.push({
							name: commandName,
							state: command.state
						});
						// exec string commands can be passed to queryCommandState
					} else if (utils.isString(command.exec)) {
						btnStateHandlers.push({
							name: commandName,
							state: command.exec
						});
					}

					dom.appendChild(group, button);
					toolbarButtons[commandName] = button;
				});

				// Exclude empty groups
				if (group.firstChild) {
					dom.appendChild(toolbar, group);
				}
			});

			// Append the toolbar to the toolbarContainer option if given
			dom.appendChild(options.toolbarContainer || editorContainer, toolbar);
		};

		/**
		 * Creates the resizer.
		 * @private
		 */
		initResize = () => {
			let minHeight: any, maxHeight: any, minWidth: any, maxWidth: any, mouseMoveFunc: any, mouseUpFunc: any, grip = dom.createElement('div', {
				className: 'emleditor-grip'
			}),
				// Cover is used to cover the editor iframe so document
				// still gets mouse move events
				cover = dom.createElement('div', {
					className: 'emleditor-resize-cover'
				}), moveEvents = 'touchmove mousemove', endEvents = 'touchcancel touchend mouseup', startX = 0, startY = 0, newX = 0, newY = 0, startWidth = 0, startHeight = 0, origWidth = dom.width(editorContainer), origHeight = dom.height(editorContainer), isDragging = false, rtl = emlEditor.rtl();

			minHeight = options.resizeMinHeight || origHeight / 1.5;
			maxHeight = options.resizeMaxHeight || origHeight * 2.5;
			minWidth = options.resizeMinWidth || origWidth / 1.25;
			maxWidth = options.resizeMaxWidth || origWidth * 1.25;

			mouseMoveFunc = function (e: any) {
				// iOS uses window.event
				if (e.type === 'touchmove') {
					e = globalWin.event;
					newX = e.changedTouches[0].pageX;
					newY = e.changedTouches[0].pageY;
				} else {
					newX = e.pageX;
					newY = e.pageY;
				}

				let newHeight = startHeight + (newY - startY), newWidth = rtl ?
					startWidth - (newX - startX) :
					startWidth + (newX - startX);

				if (maxWidth > 0 && newWidth > maxWidth) {
					newWidth = maxWidth;
				}
				if (minWidth > 0 && newWidth < minWidth) {
					newWidth = minWidth;
				}
				if (!options.resizeWidth) {
					newWidth = undefined;
				}

				if (maxHeight > 0 && newHeight > maxHeight) {
					newHeight = maxHeight;
				}
				if (minHeight > 0 && newHeight < minHeight) {
					newHeight = minHeight;
				}
				if (!options.resizeHeight) {
					newHeight = undefined;
				}

				if (newWidth || newHeight) {
					emlEditor.dimensions(newWidth, newHeight);
				}

				e.preventDefault();
			};

			mouseUpFunc = function (e: any) {
				if (!isDragging) {
					return;
				}

				isDragging = false;

				dom.hide(cover);
				dom.removeClass(editorContainer, 'resizing');
				dom.off(globalDoc, moveEvents, null, mouseMoveFunc);
				dom.off(globalDoc, endEvents, null, mouseUpFunc);

				e.preventDefault();
			};

			if (icons && icons.create) {
				let icon = icons.create('grip');
				if (icon) {
					dom.appendChild(grip, icon);
					dom.addClass(grip, 'has-icon');
				}
			}

			dom.appendChild(editorContainer, grip);
			dom.appendChild(editorContainer, cover);
			dom.hide(cover);

			dom.on(grip, 'touchstart mousedown', null, function (e: any) {
				// iOS uses window.event
				if (e.type === 'touchstart') {
					e = globalWin.event;
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
				} else {
					startX = e.pageX;
					startY = e.pageY;
				}

				startWidth = dom.width(editorContainer);
				startHeight = dom.height(editorContainer);
				isDragging = true;

				dom.addClass(editorContainer, 'resizing');
				dom.show(cover);
				dom.on(globalDoc, moveEvents, null, mouseMoveFunc);
				dom.on(globalDoc, endEvents, null, mouseUpFunc);

				e.preventDefault();
			});
		};

		/**
		 * Prefixes and preloads the emoticon images
		 * @private
		 */
		initEmoticons = () => {
			let emoticons = options.emoticons;
			let root = options.emoticonsRoot || '';

			if (emoticons) {
				allEmoticons = utils.extend(
					{}, emoticons.more, emoticons.dropdown, emoticons.hidden
				);
			}

			utils.each(allEmoticons, function (key, url) {
				allEmoticons[key] = templates('emoticon', {
					key: key,
					// Prefix emoticon root to emoticon urls
					url: root + (url.url || url),
					tooltip: url.tooltip || key
				});

				// Preload the emoticon
				if (options.emoticonsEnabled) {
					preLoadCache.push(dom.createElement('img', {
						src: root + (url.url || url)
					}));
				}
			});
		};

		/**
		 * Autofocus the editor
		 * @private
		 */
		autofocus = (focusEnd: any) => {
			let range, txtPos, node = wysiwygBody.firstChild;

			// Can't focus invisible elements
			if (!dom.isVisible(editorContainer)) {
				return;
			}

			if (emlEditor.sourceMode()) {
				txtPos = focusEnd ? sourceEditor.value.length : 0;

				sourceEditor.setSelectionRange(txtPos, txtPos);

				return;
			}

			dom.removeWhiteSpace(wysiwygBody);

			if (focusEnd) {
				if (!(node = wysiwygBody.lastChild)) {
					node = dom.createElement('p', {}, wysiwygDocument);
					dom.appendChild(wysiwygBody, node);
				}

				while (node.lastChild) {
					node = node.lastChild;

					// Should place the cursor before the last <br>
					if (dom.is(node, 'br') && node.previousSibling) {
						node = node.previousSibling;
					}
				}
			}

			range = wysiwygDocument.createRange();

			if (!dom.canHaveChildren(node)) {
				range.setStartBefore(node);

				if (focusEnd) {
					range.setStartAfter(node);
				}
			} else {
				range.selectNodeContents(node);
			}

			range.collapse(!focusEnd);
			rangeHelper.selectRange(range);
			currentSelection = range;

			if (focusEnd) {
				wysiwygBody.scrollTop = wysiwygBody.scrollHeight;
			}

			emlEditor.focus();
		};

		/**
		 * Updates the toolbar to disable/enable the appropriate buttons
		 * @private
		 */
		let updateToolBar = (disable?: boolean): void => {
			let mode = emlEditor.inSourceMode() ? '_emlTxtMode' : '_emlWysiwygMode';

			utils.each(toolbarButtons, function (_, button) {
				dom.toggleClass(button, 'disabled', disable || !button[mode]);
			});
		};

		autoExpand = () => {
			if (options.autoExpand && !autoExpandThrottle) {
				autoExpandThrottle = setTimeout(emlEditor.expandToContent, 200);
			}
		};

		/**
		 * Handles any document click and closes the dropdown if open
		 * @private
		 */
		handleDocumentClick = (e: any) => {
			// ignore right clicks
			if (e.which !== 3 && dropdown && !e.defaultPrevented) {
				autoUpdate();

				emlEditor.closeDropDown();
			}
		};

		/**
		 * Handles the WYSIWYG editors cut & copy events
		 *
		 * By default browsers also copy inherited styling from the stylesheet and
		 * browser default styling which is unnecessary.
		 *
		 * This will ignore inherited styles and only copy inline styling.
		 * @private
		 */
		handleCutCopyEvt = function (e: any) {
			let range = rangeHelper.selectedRange();
			if (range) {
				let container = dom.createElement('div', {}, wysiwygDocument);
				let firstParent;

				// Copy all inline parent nodes up to the first block parent so can
				// copy inline styles
				let parent = range.commonAncestorContainer;
				while (parent && dom.isInline(parent, true)) {
					if (parent.nodeType === dom.ELEMENT_NODE) {
						let clone = parent.cloneNode() as HTMLElement;
						if (container.firstChild) {
							dom.appendChild(clone, container.firstChild);
						}

						dom.appendChild(container, clone);
						firstParent = firstParent || clone;
					}
					parent = parent.parentNode;
				}

				dom.appendChild(firstParent || container, range.cloneContents());
				dom.removeWhiteSpace(container);

				e.clipboardData.setData('text/html', container.innerHTML);

				// TODO: Refactor into private shared module with plaintext plugin
				// innerText adds two newlines after <p> tags so convert them to
				// <div> tags
				utils.each(dom.find(container, 'p'), function (_, elm) {
					dom.convertElement(elm, 'div');
				});
				// Remove collapsed <br> tags as innerText converts them to newlines
				utils.each(dom.find(container, 'br'), function (_, elm) {
					if (!elm.nextSibling || !dom.isInline(elm.nextSibling, true)) {
						dom.remove(elm);
					}
				});

				// range.toString() doesn't include newlines so can't use emlEditor.
				// selection.toString() seems to use the same method as innerText
				// but needs to be normalised first so using container.innerText
				dom.appendChild(wysiwygBody, container);
				e.clipboardData.setData('text/plain', container.innerText);
				dom.remove(container);

				if (e.type === 'cut') {
					range.deleteContents();
				}

				e.preventDefault();
			}
		};

		/**
		 * Handles the WYSIWYG editors paste event
		 * @private
		 */
		handlePasteEvt = (e: ClipboardEvent) => {
			let editable = wysiwygBody;
			let clipboard = e.clipboardData;
			let loadImage = function (file: any) {
				let reader = new FileReader();
				reader.onload = function (e) {
					handlePasteData({
						html: '<img src="' + e.target.result + '" />'
					});
				};
				reader.readAsDataURL(file);
			};

			// Modern browsers with clipboard API - everything other than _very_
			// old android web views and UC browser which doesn't support the
			// paste event at all.
			if (clipboard) {
				let data: any = [];
				let types = clipboard.types;
				let items = clipboard.items;

				e.preventDefault();

				for (let i = 0; i < types.length; i++) {
					// Word sometimes adds copied text as an image so if HTML
					// exists prefer that over images
					if (types.indexOf('text/html') < 0) {
						// Normalise image pasting to paste as a data-uri
						if (globalWin.FileReader && items &&
							IMAGE_MIME_REGEX.test(items[i].type)) {
							return loadImage(clipboard.items[i].getAsFile());
						}
					}
					data[types[i]] = clipboard.getData(types[i]);
				}
				// Call plugins here with file?
				data.text = data['text/plain'];
				data.html = sanitize(data['text/html']);

				handlePasteData(data);
				// If contentsFragment exists then we are already waiting for a
				// previous paste so let the handler for that handle this one too
			} else if (!pasteContentFragment) {
				// Save the scroll position so can be restored
				// when contents is restored
				let scrollTop = editable.scrollTop;

				rangeHelper.saveRange();

				pasteContentFragment = globalDoc.createDocumentFragment();
				while (editable.firstChild) {
					dom.appendChild(pasteContentFragment, editable.firstChild);
				}

				setTimeout(function () {
					let html = editable.innerHTML;

					editable.innerHTML = '';
					dom.appendChild(editable, pasteContentFragment);
					editable.scrollTop = scrollTop;
					pasteContentFragment = false;

					rangeHelper.restoreRange();

					handlePasteData({ html: sanitize(html) });
				}, 0);
			}
		};

		/**
		 * Replaces any emoticon codes in the passed HTML
		 * with their emoticon images
		 * @private
		 */
		replaceEmoticons = () => {
			if (options.emoticonsEnabled) {
				emoticons
					.replace(wysiwygBody, allEmoticons, options.emoticonsCompat);
			}
		};


		/**
		 * Gets the selected text of the source editor
		 * @return {string}
		 * @private
		 */
		sourceEditorSelectedText = (): string => {
			sourceEditor.focus();

			return sourceEditor.value.substring(
				sourceEditor.selectionStart,
				sourceEditor.selectionEnd
			);
		};

		/**
		 * Handles the passed command
		 * @private
		 */
		handleCommand = (caller: any, cmd: any) => {
			// check if in text mode and handle text commands
			if (emlEditor.inSourceMode()) {
				if (cmd.txtExec) {
					if (Array.isArray(cmd.txtExec)) {
						emlEditor.sourceEditorInsertText.apply(this, cmd.txtExec);
					} else {
						cmd.txtExec.call(this, caller, sourceEditorSelectedText());
					}
				}
			} else if (cmd.exec) {
				if (utils.isFunction(cmd.exec)) {
					cmd.exec.call(this, caller);
				} else {
					emlEditor.execCommand(
						cmd.exec,
						Object.prototype.hasOwnProperty.call(cmd, 'execParam') ? cmd.execParam : null
					);
				}
			}

		};

		/**
		 * Checks if the current selection has changed and triggers
		 * the selectionchanged event if it has.
		 *
		 * In browsers other that don't support selectionchange event it will check
		 * at most once every 100ms.
		 * @private
		 */
		checkSelectionChanged = () => {
			function check() {
				// Don't create new selection if there isn't one (like after
				// blur event in iOS)
				if (wysiwygWindow.getSelection() &&
					wysiwygWindow.getSelection().rangeCount <= 0) {
					currentSelection = null;
					// rangeHelper could be null if editor was destroyed
					// before the timeout had finished
				} else if (rangeHelper && !rangeHelper.compare(currentSelection)) {
					currentSelection = rangeHelper.cloneSelected();

					// If the selection is in an inline wrap it in a block.
					// Fixes #331
					if (currentSelection && currentSelection.collapsed) {
						let parent = currentSelection.startContainer;
						let offset = currentSelection.startOffset;

						// Handle if selection is placed before/after an element
						if (offset && parent.nodeType !== dom.TEXT_NODE) {
							parent = parent.childNodes[offset];
						}

						while (parent && parent.parentNode !== wysiwygBody) {
							parent = parent.parentNode;
						}

						if (parent && dom.isInline(parent, true)) {
							rangeHelper.saveRange();
							wrapInlines(wysiwygBody, wysiwygDocument);
							rangeHelper.restoreRange();
						}
					}

					dom.trigger(editorContainer, 'selectionchanged');
				}

				isSelectionCheckPending = false;
			}

			if (isSelectionCheckPending) {
				return;
			}

			isSelectionCheckPending = true;

			// Don't need to limit checking if browser supports the Selection API
			if ('onselectionchange' in wysiwygDocument) {
				check();
			} else {
				setTimeout(check, 100);
			}
		};

		/**
		 * Checks if the current node has changed and triggers
		 * the nodechanged event if it has
		 * @private
		 */
		checkNodeChanged = () => {
			// check if node has changed
			let oldNode, node = rangeHelper.parentNode();

			if (currentNode !== node) {
				oldNode = currentNode;
				currentNode = node;
				currentBlockNode = rangeHelper.getFirstBlockParent(node);

				dom.trigger(editorContainer, 'nodechanged', {
					oldNode: oldNode,
					newNode: currentNode
				});
			}
		};


		/**
		 * Updates if buttons are active or not
		 * @private
		 */
		updateActiveButtons = () => {
			let firstBlock, parent;
			let activeClass = 'active';
			let doc = wysiwygDocument;
			let isSource = emlEditor.sourceMode();

			if (emlEditor.readOnly()) {
				utils.each(dom.find(toolbar, activeClass), function (_, menuItem) {
					dom.removeClass(menuItem, activeClass);
				});
				return;
			}

			if (!isSource) {
				parent = rangeHelper.parentNode();
				firstBlock = rangeHelper.getFirstBlockParent(parent);
			}

			for (let j = 0; j < btnStateHandlers.length; j++) {
				let state = 0;
				let btn = toolbarButtons[btnStateHandlers[j].name];
				let stateFn = btnStateHandlers[j].state;
				let isDisabled = (isSource && !btn._emlTxtMode) ||
					(!isSource && !btn._emlWysiwygMode);

				if (utils.isString(stateFn)) {
					if (!isSource) {
						try {
							state = doc.queryCommandEnabled(stateFn) ? 0 : -1;

							// eslint-disable-next-line max-depth
							if (state > -1) {
								state = doc.queryCommandState(stateFn) ? 1 : 0;
							}
						} catch (ex) { /* empty */ }
					}
				} else if (!isDisabled) {
					state = stateFn.call(this, parent, firstBlock);
				}

				dom.toggleClass(btn, 'disabled', isDisabled || state < 0);
				dom.toggleClass(btn, activeClass, state > 0);
			}

			if (icons && icons.update) {
				icons.update(isSource, parent, firstBlock);
			}
		};

		/**
		 * Handles any key press in the WYSIWYG editor
		 *
		 * @private
		 */
		handleKeyPress = (e: any) => {
			// FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=501496
			if (e.defaultPrevented) {
				return;
			}

			emlEditor.closeDropDown();

			// 13 = enter key
			if (e.which === 13) {
				let LIST_TAGS = 'li,ul,ol';

				// "Fix" (cludge) for blocklevel elements being duplicated in some
				// browsers when enter is pressed instead of inserting a newline
				if (!dom.is(currentBlockNode, LIST_TAGS) &&
					dom.hasStyling(currentBlockNode)) {

					let br = dom.createElement('br', {}, wysiwygDocument);
					rangeHelper.insertNode(br);

					// Last <br> of a block will be collapsed  so need to make sure
					// the <br> that was inserted isn't the last node of a block.
					let parent = br.parentNode;
					let lastChild = parent.lastChild as any;

					// Sometimes an empty next node is created after the <br>
					if (lastChild && lastChild.nodeType === dom.TEXT_NODE &&
						lastChild.nodeValue === '') {
						dom.remove(lastChild);
						lastChild = parent.lastChild;
					}

					// If this is the last BR of a block and the previous
					// sibling is inline then will need an extra BR. This
					// is needed because the last BR of a block will be
					// collapsed. Fixes issue #248
					if (!dom.isInline(parent, true) && lastChild === br &&
						dom.isInline(br.previousSibling)) {
						rangeHelper.insertHTML('<br>');
					}

					e.preventDefault();
				}
			}
		};

		/**
		 * Makes sure that if there is a code or quote tag at the
		 * end of the editor, that there is a new line after it.
		 *
		 * If there wasn't a new line at the end you wouldn't be able
		 * to enter any text after a code/quote tag
		 * @return {void}
		 * @private
		 */
		appendNewLine = (): void => {
			// Check all nodes in reverse until either add a new line
			// or reach a non-empty textnode or BR at which point can
			// stop checking.
			dom.rTraverse(wysiwygBody, function (node: any) {
				// Last block, add new line after if has styling
				if (node.nodeType === dom.ELEMENT_NODE &&
					!/inline/.test(dom.css(node, 'display'))) {

					// Add line break after if has styling
					if (!dom.is(node, '.emleditor-nlf') && dom.hasStyling(node)) {
						let paragraph = dom.createElement('p', {}, wysiwygDocument);
						paragraph.className = 'emleditor-nlf';
						paragraph.innerHTML = '<br />';
						dom.appendChild(wysiwygBody, paragraph);
						return false;
					}
				}

				// Last non-empty text node or line break.
				// No need to add line-break after them
				if ((node.nodeType === 3 && !/^\s*$/.test(node.nodeValue)) ||
					dom.is(node, 'br')) {
					return false;
				}
			});
		};

		/**
		 * Handles form reset event
		 * @private
		 */
		handleFormReset = () => {
			emlEditor.val(textarea.value);
		};

		/**
		 * Handles any mousedown press in the WYSIWYG editor
		 * @private
		 */
		handleMouseDown = () => {
			emlEditor.closeDropDown();
		};

		/**
		 * Passes events on to any handlers
		 * @private
		 * @return void
		 */
		handleEvent = (e: any) => {
			if (pluginManager) {
				// Send event to all plugins
				pluginManager.call(e.type + 'Event', e, this);
			}

			// convert the event into a custom event to send
			let name = (e.target === sourceEditor ? 'emlsrc' : 'emlwys') + e.type as keyof typeof eventHandlers;

			if (eventHandlers[name]) {
				eventHandlers[name].forEach(function (fn: any) {
					fn.call(this, e);
				});
			}
		};

		/**
		 * Emoticons keypress handler
		 * @private
		 */
		emoticonsKeyPress = (e: any) => {
			let replacedEmoticon, cachePos = 0, emoticonsCache = emlEditor.emoticonsCache, curChar = String.fromCharCode(e.which);

			// TODO: Make configurable
			if (dom.closest(currentBlockNode, 'code')) {
				return;
			}

			if (!emoticonsCache) {
				emoticonsCache = [];

				utils.each(allEmoticons, function (key, html) {
					emoticonsCache[cachePos++] = [key, html];
				});

				emoticonsCache.sort(function (a: any, b: any) {
					return a[0].length - b[0].length;
				});

				emlEditor.emoticonsCache = emoticonsCache;
				emlEditor.longestEmoticonCode =
					emoticonsCache[emoticonsCache.length - 1][0].length;
			}

			replacedEmoticon = rangeHelper.replaceKeyword(
				emlEditor.emoticonsCache,
				true,
				true,
				emlEditor.longestEmoticonCode,
				options.emoticonsCompat,
				curChar
			);

			if (replacedEmoticon) {
				if (!options.emoticonsCompat || !/^\s$/.test(curChar)) {
					e.preventDefault();
				}
			}
		};

		/**
		 * Makes sure emoticons are surrounded by whitespace
		 * @private
		 */
		emoticonsCheckWhitespace = () => {
			emoticons.checkWhitespace(currentBlockNode, rangeHelper);
		};


		/**
		 * Handles the keydown event, used for shortcuts
		 * @private
		 */
		handleKeyDown = function (e: any) {
			let shortcut: any = [],

				SHIFT_KEYS: any = {
					'`': '~',
					'1': '!',
					'2': '@',
					'3': '#',
					'4': '$',
					'5': '%',
					'6': '^',
					'7': '&',
					'8': '*',
					'9': '(',
					'0': ')',
					'-': '_',
					'=': '+',
					';': ': ',
					'\'': '"',
					',': '<',
					'.': '>',
					'/': '?',
					'\\': '|',
					'[': '{',
					']': '}'
				}, SPECIAL_KEYS: any = {
					8: 'backspace',
					9: 'tab',
					13: 'enter',
					19: 'pause',
					20: 'capslock',
					27: 'esc',
					32: 'space',
					33: 'pageup',
					34: 'pagedown',
					35: 'end',
					36: 'home',
					37: 'left',
					38: 'up',
					39: 'right',
					40: 'down',
					45: 'insert',
					46: 'del',
					91: 'win',
					92: 'win',
					93: 'select',
					96: '0',
					97: '1',
					98: '2',
					99: '3',
					100: '4',
					101: '5',
					102: '6',
					103: '7',
					104: '8',
					105: '9',
					106: '*',
					107: '+',
					109: '-',
					110: '.',
					111: '/',
					112: 'f1',
					113: 'f2',
					114: 'f3',
					115: 'f4',
					116: 'f5',
					117: 'f6',
					118: 'f7',
					119: 'f8',
					120: 'f9',
					121: 'f10',
					122: 'f11',
					123: 'f12',
					144: 'numlock',
					145: 'scrolllock',
					186: ';',
					187: '=',
					188: ',',
					189: '-',
					190: '.',
					191: '/',
					192: '`',
					219: '[',
					220: '\\',
					221: ']',
					222: '\''
				}, NUMPAD_SHIFT_KEYS: any = {
					109: '-',
					110: 'del',
					111: '/',
					96: '0',
					97: '1',
					98: '2',
					99: '3',
					100: '4',
					101: '5',
					102: '6',
					103: '7',
					104: '8',
					105: '9'
				}, which = e.which, character = SPECIAL_KEYS[which] || String.fromCharCode(which).toLowerCase();

			if (e.ctrlKey || e.metaKey) {
				shortcut.push('ctrl');
			}

			if (e.altKey) {
				shortcut.push('alt');
			}

			if (e.shiftKey) {
				shortcut.push('shift');

				if (NUMPAD_SHIFT_KEYS[which]) {
					character = NUMPAD_SHIFT_KEYS[which];
				} else if (SHIFT_KEYS[character]) {
					character = SHIFT_KEYS[character];
				}
			}

			// Shift is 16, ctrl is 17 and alt is 18
			if (character && (which < 16 || which > 18)) {
				shortcut.push(character);
			}

			shortcut = shortcut.join('+');
			if (shortcutHandlers[shortcut] &&
				shortcutHandlers[shortcut].call(this) === false) {

				e.stopPropagation();
				e.preventDefault();
			}
		};

		/**
		 * Handles the backspace key press
		 *
		 * Will remove block styling like quotes/code ect if at the start.
		 * @private
		 */
		handleBackSpace = (e: any) => {
			let node, offset, range, parent;

			// 8 is the backspace key
			if (options.disableBlockRemove || e.which !== 8 ||
				!(range = rangeHelper.selectedRange())) {
				return;
			}

			node = range.startContainer;
			offset = range.startOffset;

			if (offset !== 0 || !(parent = currentStyledBlockNode()) ||
				dom.is(parent, 'body')) {
				return;
			}

			while (node !== parent) {
				while (node.previousSibling) {
					node = node.previousSibling;

					// Everything but empty text nodes before the cursor
					// should prevent the style from being removed
					if (node.nodeType !== dom.TEXT_NODE || node.nodeValue) {
						return;
					}
				}

				if (!(node = node.parentNode)) {
					return;
				}
			}

			// The backspace was pressed at the start of
			// the container so clear the style
			emlEditor.clearBlockFormatting(parent);
			e.preventDefault();
		};

		/**
		 * Gets the first styled block node that contains the cursor
		 * @return {HTMLElement}
		 */
		currentStyledBlockNode = (): HTMLElement => {
			let block: any = currentBlockNode;

			while (!dom.hasStyling(block) || dom.isInline(block, true)) {
				if (!(block = block.parentNode) || dom.is(block, 'body')) {
					return;
				}
			}

			return block;
		};

		/**
		 * Triggers the valueChanged signal if there is
		 * a plugin that handles it.
		 *
		 * If rangeHelper.saveRange() has already been
		 * called, then saveRange should be set to false
		 * to prevent the range being saved twice.
		 *
		 * @since 1.4.5
		 * @param {boolean} saveRange If to call rangeHelper.saveRange().
		 * @private
		 */
		triggerValueChanged = (saveRange: boolean) => {
			if (!pluginManager ||
				(!pluginManager.hasHandler('valuechangedEvent') &&
					!triggerValueChanged.hasHandler)) {
				return;
			}

			let currentHtml, sourceMode = emlEditor.sourceMode(), hasSelection = !sourceMode && rangeHelper.hasSelection();

			// Composition end isn't guaranteed to fire but must have
			// ended when triggerValueChanged() is called so reset it
			isComposing = false;

			// Don't need to save the range if emleditor-start-marker
			// is present as the range is already saved
			saveRange = saveRange !== false &&
				!wysiwygDocument.getElementById('emleditor-start-marker');

			// Clear any current timeout as it's now been triggered
			if (valueChangedKeyUpTimer) {
				clearTimeout(valueChangedKeyUpTimer);
				valueChangedKeyUpTimer = false;
			}

			if (hasSelection && saveRange) {
				rangeHelper.saveRange();
			}

			currentHtml = sourceMode ? sourceEditor.value : wysiwygBody.innerHTML;

			// Only trigger if something has actually changed.
			if (currentHtml !== triggerValueChanged.lastVal) {
				triggerValueChanged.lastVal = currentHtml;

				dom.trigger(editorContainer, 'valuechanged', {
					rawValue: sourceMode ? emlEditor.val() : currentHtml
				});
			}

			if (hasSelection && saveRange) {
				rangeHelper.removeMarkers();
			}
		};

		/**
		 * Should be called whenever there is a blur event
		 * @private
		 */
		valueChangedBlur = () => {
			if (valueChangedKeyUpTimer) {
				triggerValueChanged();
			}
		};

		/**
		 * Should be called whenever there is a keypress event
		 * @param  {Event} e The keypress event
		 * @private
		 */
		valueChangedKeyUp = (e: any) => {
			let which = e.which, lastChar = valueChangedKeyUp.lastChar, lastWasSpace = (lastChar === 13 || lastChar === 32), lastWasDelete = (lastChar === 8 || lastChar === 46);

			valueChangedKeyUp.lastChar = which;

			if (isComposing) {
				return;
			}

			// 13 = return & 32 = space
			if (which === 13 || which === 32) {
				if (!lastWasSpace) {
					triggerValueChanged();
				} else {
					valueChangedKeyUp.triggerNext = true;
				}
				// 8 = backspace & 46 = del
			} else if (which === 8 || which === 46) {
				if (!lastWasDelete) {
					triggerValueChanged();
				} else {
					valueChangedKeyUp.triggerNext = true;
				}
			} else if (valueChangedKeyUp.triggerNext) {
				triggerValueChanged();
				valueChangedKeyUp.triggerNext = false;
			}

			// Clear the previous timeout and set a new one.
			clearTimeout(valueChangedKeyUpTimer);

			// Trigger the event 1.5s after the last keypress if space
			// isn't pressed. This might need to be lowered, will need
			// to look into what the slowest average Chars Per Min is.
			valueChangedKeyUpTimer = setTimeout(function () {
				if (!isComposing) {
					triggerValueChanged();
				}
			}, 1500);
		};

		handleComposition = (e: any) => {
			isComposing = /start/i.test(e.type);

			if (!isComposing) {
				triggerValueChanged();
			}
		};

		autoUpdate = function () {
			emlEditor.updateOriginal();
		};

		// run the initializer
		init();
	}
}

/**
 * Static command helper class
 * @class command
 * @name emleditor.command
 */
EmlEditor.command =
/** @lends emleditor.command */
{
	/**
	 * Gets a command
	 *
	 * @param {string} name
	 * @return {Object|null}
	 * @since v1.3.5
	 */
	get: function (name: keyof typeof defaultCommands): object | null {
		return defaultCommands[name] || null;
	},

	/**
	 * <p>Adds a command to the editor or updates an existing
	 * command if a command with the specified name already exists.</p>
	 *
	 * <p>Once a command is add it can be included in the toolbar by
	 * adding it's name to the toolbar option in the constructor. It
	 * can also be executed manually by calling
	 * {@link emleditor.execCommand}</p>
	 *
	 * @example
	 * EmlEditor.command.set("hello",
	 * {
	 *     exec: function () {
	 *         alert("Hello World!");
	 *     }
	 * });
	 *
	 * @param {string} name
	 * @param {Object} cmd
	 * @return {this|false} Returns false if name or cmd is false
	 * @since v1.3.5
	 */
	set: function (name: keyof typeof defaultCommands, cmd: any): any | false {
		if (!name || !cmd) {
			return false;
		}

		// merge any existing command properties
		cmd = utils.extend(defaultCommands[name] || {}, cmd);

		cmd.remove = function () {
			EmlEditor.command.remove(name);
		};

		defaultCommands[name] = cmd;
		return this;
	},

	/**
	 * Removes a command
	 *
	 * @param {string} name
	 * @return {this}
	 * @since v1.3.5
	 */
	remove: function (name: keyof typeof defaultCommands): any {
		if (defaultCommands[name]) {
			delete defaultCommands[name];
		}

		return this;
	}
};
