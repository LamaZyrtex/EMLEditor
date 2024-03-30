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

/**
 * EmlEditor - YAE! Yet Another Editor
 * @class EmlEditor
 * @name EmlEditor
 */
export default class EmlEditor {


	constructor(textarea: any, userOptions: any) {
		this.textarea = textarea;
		this.options = this.editorOptions = utils.extend(true, {}, (defaultOptions as any), userOptions);
		this.commands = utils.extend(true, {}, (userOptions.commands || defaultCommands));

		// Don't deep extend emoticons (fixes #565)
		this.editorOptions.emoticons = userOptions.emoticons || (defaultOptions as any).emoticons;

		if (!Array.isArray(this.options.allowedIframeUrls)) {
			this.options.allowedIframeUrls = [];
		}
		this.options.allowedIframeUrls.push('https://www.youtube-nocookie.com/embed/');

		// Create new instance of DOMPurify for each editor instance so can
		// have different allowed iframe URLs
		// eslint-disable-next-line new-cap
		this.domPurify = DOMPurify();

		// Allow iframes for things like YouTube, see:
		// https://github.com/cure53/DOMPurify/issues/340#issuecomment-670758980
		this.domPurify.addHook('uponSanitizeElement', (node: HTMLElement, data: any) => {
			let allowedUrls = this.options.allowedIframeUrls;

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
		this.domPurify.addHook('afterSanitizeAttributes', (node: HTMLElement) => {
			if ('target' in node) {
				dom.attr(node, 'data-eml-target', dom.attr(node, 'target'));
			}

			dom.removeAttr(node, 'target');
		});

		// run the initializer
		this.init();
	}

	/************************************************************************
	 * Public members
	 ************************************************************************/

	//#region
	public userOptions: any;
	public editorOptions: any;
	public textarea: any;
	public commands: any;
	public longestEmoticonCode: number;
	public emoticonsCache: any;


	/**
	 * Switches between the WYSIWYG and source modes
	 *
	 * @function
	 * @name toggleSourceMode
	 * @since 1.4.0
	 * @memberOf EmlEditor.prototype
	 */
	public toggleSourceMode(): void {
		let isInSourceMode = this.inSourceMode();

		// don't allow switching to WYSIWYG if doesn't support it
		if (!browser.isWysiwygSupported && isInSourceMode) {
			return;
		}

		if (!isInSourceMode) {
			this.rangeHelper.saveRange();
			this.rangeHelper.clear();
		}

		this.currentSelection = null;
		this.blur();

		if (isInSourceMode) {
			this.setWysiwygEditorValue(this.getSourceEditorValue());
		} else {
			this.setSourceEditorValue(this.getWysiwygEditorValue());
		}

		dom.toggle(this.sourceEditor);
		dom.toggle(this.wysiwygEditor);

		dom.toggleClass(this.editorContainer, 'wysiwygMode', isInSourceMode);
		dom.toggleClass(this.editorContainer, 'sourceMode', !isInSourceMode);

		this.updateToolBar();
		this.updateActiveButtons();
	};

	/**
	* If the editor is in source code mode
	*
	* @return {boolean}
	* @function
	* @name inSourceMode
	* @memberOf EmlEditor.prototype
	*/
	public inSourceMode(): boolean {
		return dom.hasClass(this.editorContainer, 'sourceMode');
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
	public CurrentNode(): any {
		return this.currentNode;
	};

	/**
	 * Gets the first block level node that contains the
	 * selection/caret in WYSIWYG mode.
	 *
	 * Will be null in sourceMode or if there is no selection.
	 *
	 * @return {?Node}
	 * @function
	 * @name CurrentBlockNode
	 * @memberOf EmlEditor.prototype
	 * @since 1.4.4
	 */
	public CurrentBlockNode(): any {
		return this.currentBlockNode;
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
	public blur(handler?: Function, excludeWysiwyg?: boolean, excludeSource?: boolean): any {
		if (utils.isFunction(handler)) {
			this.bind('blur', handler, excludeWysiwyg, excludeSource);
		} else if (!this.sourceMode()) {
			this.wysiwygBody.blur();
		} else {
			this.sourceEditor.blur();
		}

		return this;
	};

	/**
	 * Sets the text editor value
	 *
	 * @param {string} value
	 * @function
	 * @name setSourceEditorValue
	 * @memberOf EmlEditor.prototype
	 */
	public setSourceEditorValue(value: string): void {
		this.sourceEditor.value = value;
		this.triggerValueChanged();
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
	public val(val?: string, filter: boolean = true): any {
		if (!utils.isString(val)) {
			return this.inSourceMode() ?
				this.getSourceEditorValue(false) :
				this.getWysiwygEditorValue(filter);
		}

		if (!this.inSourceMode()) {
			if (filter !== false && 'toHtml' in this.format) {
				val = this.format.toHtml(val);
			}

			this.setWysiwygEditorValue(val);
		} else {
			this.setSourceEditorValue(val);
		}

		return this;
	};

	/**
	 * Updates the textarea that the editor is replacing
	 * with the value currently inside the editor.
	 *
	 * @function
	 * @name setTextareaValue
	 * @since 1.4.0
	 * @memberOf EmlEditor.prototype
	 */
	public setTextareaValue() {
		//TODO
		this.textarea.value = this.val();
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
	public setWysiwygEditorValue(value: string) {
		if (!value) {
			value = '<p><br /></p>';
		}

		this.wysiwygBody.innerHTML = this.sanitize(value);
		this.replaceEmoticons();
		this.appendNewLine();
		this.triggerValueChanged();
		this.autoExpand();
	};

	/**
	 * Gets the text editor value
	 *
	 * If using a plugin that filters the text like the BBCode plugin
	 * it will return the result of the filtering which is BBCode to
	 * HTML so it will return HTML. If filter is set to false it will
	 * just return the contents of the source editor (BBCode).
	 *
	 * @param {?boolean} [filter=true]
	 * @return {string}
	 * @function
	 * @since 1.4.0
	 * @name getSourceEditorValue
	 * @memberOf EmlEditor.prototype
	 */
	public getSourceEditorValue(filter?: boolean): string {
		let val = this.sourceEditor.value;

		if (filter !== false && 'toHtml' in this.format) {
			val = this.format.toHtml(val);
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
	public dimensions(width?: any, height?: any, save?: boolean): any {
		// set undefined width/height to boolean false
		width = (!width && width !== 0) ? false : width;
		height = (!height && height !== 0) ? false : height;

		if (width === false && height === false) {
			return { width: this.width(), height: this.height() };
		}

		if (width !== false) {
			if (save !== false) {
				this.options.width = width;
			}

			dom.width(this.editorContainer, width);
		}

		if (height !== false) {
			if (save !== false) {
				this.options.height = height;
			}

			dom.height(this.editorContainer, height);
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
	public readOnly(readOnly?: any): any {
		if (typeof readOnly !== 'boolean') {
			return !this.sourceEditor.readOnly;
		}

		this.wysiwygBody.contentEditable = (!readOnly).toString();
		this.sourceEditor.readOnly = !readOnly;

		this.updateToolBar(readOnly);

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
	public focus(handler?: Function, excludeWysiwyg?: boolean, excludeSource?: boolean): any {
		if (utils.isFunction(handler)) {
			this.bind('focus', handler, excludeWysiwyg, excludeSource);
		} else if (!this.inSourceMode()) {
			// Already has focus so do nothing
			if (dom.find(this.wysiwygDocument, ':focus').length) {
				return;
			}

			let container;
			let rng = this.rangeHelper.selectedRange();

			// Fix FF bug where it shows the cursor in the wrong place
			// if the editor hasn't had focus before. See issue #393
			if (!this.currentSelection) {
				this.autofocus(true);
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
					this.rangeHelper.selectRange(rng);
				}
			}

			this.wysiwygWindow.focus();
			this.wysiwygBody.focus();
		} else {
			this.sourceEditor.focus();
		}

		this.updateActiveButtons();

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
	public expandToContent(ignoreMaxHeight: boolean) {
		if (this.maximize()) {
			return;
		}

		clearTimeout(this.autoExpandThrottle);
		this.autoExpandThrottle = false;

		if (!this.autoExpandBounds) {
			let height = this.options.resizeMinHeight || this.options.height ||
				dom.height(this.textarea);

			this.autoExpandBounds = {
				min: height,
				max: this.options.resizeMaxHeight || (height * 2)
			};
		}

		let range = globalDoc.createRange();
		range.selectNodeContents(this.wysiwygBody);

		let rect = range.getBoundingClientRect();
		let current = this.wysiwygDocument.documentElement.clientHeight - 1;
		let spaceNeeded = rect.bottom - rect.top;
		let newHeight = this.height() + 1 + (spaceNeeded - current);

		if (!ignoreMaxHeight && this.autoExpandBounds.max !== -1) {
			newHeight = Math.min(newHeight, this.autoExpandBounds.max);
		}

		this.height(Math.ceil(Math.max(newHeight, this.autoExpandBounds.min)));
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
	public rtl(rtl?: boolean): any {
		let dir = rtl ? 'rtl' : 'ltr';

		if (typeof rtl !== 'boolean') {
			return dom.attr(this.sourceEditor, 'dir') === 'rtl';
		}

		dom.attr(this.wysiwygBody, 'dir', dir);
		dom.attr(this.sourceEditor, 'dir', dir);

		dom.removeClass(this.editorContainer, 'rtl');
		dom.removeClass(this.editorContainer, 'ltr');
		dom.addClass(this.editorContainer, dir);

		if (this.icons && this.icons.rtl) {
			this.icons.rtl(rtl);
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
	public emoticons(enable: boolean): any {
		let thisEditor = this;
		if (!enable && enable !== false) {
			return this.options.emoticonsEnabled;
		}

		thisEditor.options.emoticonsEnabled = enable;

		if (enable) {
			dom.on(thisEditor.wysiwygBody, 'keypress', null, thisEditor.emoticonsKeyPress);

			if (!thisEditor.sourceMode()) {
				thisEditor.rangeHelper.saveRange();

				thisEditor.replaceEmoticons();
				thisEditor.triggerValueChanged(false);

				thisEditor.rangeHelper.restoreRange();
			}
		} else {
			let emoticons = dom.find(thisEditor.wysiwygBody, 'img[data-emleditor-emoticon]');

			utils.each(emoticons, (_, img) => {
				let text: any = dom.data(img, 'emleditor-emoticon');
				let textNode = thisEditor.wysiwygDocument.createTextNode(text);
				img.parentNode.replaceChild(textNode, img);
			});

			dom.off(thisEditor.wysiwygBody, 'keypress', null, thisEditor.emoticonsKeyPress);

			thisEditor.triggerValueChanged();
		}

		return thisEditor;
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
	public sourceMode(enable?: boolean): any {
		let inSourceMode = this.inSourceMode();

		if (typeof enable !== 'boolean') {
			return inSourceMode;
		}

		if ((inSourceMode && !enable) || (!inSourceMode && enable)) {
			this.toggleSourceMode();
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
	public width(width?: number, saveWidth?: boolean): any {
		if (!width && width !== 0) {
			return dom.width(this.editorContainer);
		}

		this.dimensions(width, null, saveWidth);

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
	public height(height?: number, saveHeight?: boolean): any {
		if (!height && height !== 0) {
			return dom.height(this.editorContainer);
		}

		this.dimensions(null, height, saveHeight);

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
	public createDropDown(menuItem: HTMLElement, name: string, content: HTMLElement) {
		// first click for create second click for close
		let dropDownCss, dropDownClass = 'emleditor-' + name;
		let thisEditor = this;
		thisEditor.closeDropDown();

		// Only close the dropdown if it was already open
		if (thisEditor.dropdown && dom.hasClass(thisEditor.dropdown, dropDownClass)) {
			return;
		}

		dropDownCss = utils.extend({
			top: menuItem.offsetTop,
			left: menuItem.offsetLeft,
			marginTop: menuItem.clientHeight
		}, thisEditor.options.dropDownCss);

		thisEditor.dropdown = dom.createElement('div', {
			className: 'emleditor-dropdown ' + dropDownClass
		}) as any;

		dom.css(thisEditor.dropdown, dropDownCss);
		dom.appendChild(thisEditor.dropdown, content);
		dom.appendChild(thisEditor.editorContainer, thisEditor.dropdown);
		dom.on(thisEditor.dropdown, 'click focusin', null, (e: any) => {
			// stop clicks within the dropdown from being handled
			e.stopPropagation();
		});

		if (thisEditor.dropdown) {
			let first = dom.find(thisEditor.dropdown, 'input,textarea')[0] as HTMLElement;
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
	public maximize(maximize?: boolean): any {
		let maximizeSize = 'emleditor-maximize';

		if (utils.isUndefined(maximize)) {
			return dom.hasClass(this.editorContainer, maximizeSize);
		}

		maximize = !!maximize;

		if (maximize) {
			this.maximizeScrollPosition = globalWin.scrollY;
		}

		dom.toggleClass(globalDoc.documentElement, maximizeSize, maximize);
		dom.toggleClass(globalDoc.body, maximizeSize, maximize);
		dom.toggleClass(this.editorContainer, maximizeSize, maximize);
		this.width(maximize ? '100%' : this.options.width, false);
		this.height(maximize ? '100%' : this.options.height, false);

		if (!maximize) {
			globalWin.scrollTo(0, this.maximizeScrollPosition);
		}

		this.autoExpand();

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
	public destroy() {
		// Don't destroy if the editor has already been destroyed
		if (!this.pluginManager) {
			return;
		}

		this.pluginManager.destroy();

		this.rangeHelper = null;
		this.pluginManager = null;

		if (this.dropdown) {
			dom.remove(this.dropdown);
		}

		dom.off(globalDoc, 'click', null, this.handleDocumentClick);

		let form = this.textarea.form;
		if (form) {
			dom.off(form, 'reset', null, this.handleFormReset);
			dom.off(form, 'submit', null, this.setTextareaValue, dom.EVENT_CAPTURE);
		}

		dom.off(window, 'pagehide', null, this.setTextareaValue);
		dom.off(window, 'pageshow', null, this.handleFormReset);
		dom.remove(this.sourceEditor);
		dom.remove(this.toolbar);
		dom.remove(this.editorContainer);

		delete this.textarea._emleditor;
		dom.show(this.textarea);

		this.textarea.required = this.isRequired;
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
	public closeDropDown(focus?: boolean) {
		if (this.dropdown) {
			dom.remove(this.dropdown);
			this.dropdown = null;
		}

		if (focus === true) {
			this.focus();
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
	public wysiwygEditorInsertHtml(html: string, endHtml?: string, overrideCodeBlocking?: boolean) {
		let marker: any, scrollTop, scrollTo, editorHeight = dom.height(this.wysiwygEditor);

		this.focus();

		// TODO: This code tag should be configurable and
		// should maybe convert the HTML into text instead
		// Don't apply to code elements
		if (!overrideCodeBlocking && dom.closest(this.currentBlockNode, 'code')) {
			return;
		}

		// Insert the HTML and save the range so the editor can be scrolled
		// to the end of the selection. Also allows emoticons to be replaced
		// without affecting the cursor position
		this.rangeHelper.insertHTML(html, endHtml);
		this.rangeHelper.saveRange();
		this.replaceEmoticons();

		// Fix any invalid nesting, e.g. if a quote or other block is inserted
		// into a paragraph
		dom.fixNesting(this.wysiwygBody);

		this.wrapInlines(this.wysiwygBody, this.wysiwygDocument);

		// Scroll the editor after the end of the selection
		marker = dom.find(this.wysiwygBody, '#emleditor-end-marker')[0];
		dom.show(marker);
		scrollTop = this.wysiwygBody.scrollTop;
		scrollTo = ((dom.getOffset(marker) as any).top +
			(marker.offsetHeight * 1.5)) - editorHeight;
		dom.hide(marker);

		// Only scroll if marker isn't already visible
		if (scrollTo > scrollTop || scrollTo + editorHeight < scrollTop) {
			this.wysiwygBody.scrollTop = scrollTo;
		}

		this.triggerValueChanged(false);
		this.rangeHelper.restoreRange();

		// Add a new line after the last block element
		// so can always add text after it
		this.appendNewLine();
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
	public wysiwygEditorInsertText(text: string, endText: string): void {
		this.wysiwygEditorInsertHtml(
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
	public insertText(text: string, endText: string): any {
		if (this.inSourceMode()) {
			this.sourceEditorInsertText(text, endText);
		} else {
			this.wysiwygEditorInsertText(text, endText);
		}

		return this;
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
	public sourceEditorInsertText(text: string, endText: string): void {
		let scrollTop, currentValue, startPos = this.sourceEditor.selectionStart, endPos = this.sourceEditor.selectionEnd;

		scrollTop = this.sourceEditor.scrollTop;
		this.sourceEditor.focus();
		currentValue = this.sourceEditor.value;

		if (endText) {
			text += currentValue.substring(startPos, endPos) + endText;
		}

		this.sourceEditor.value = currentValue.substring(0, startPos) +
			text +
			currentValue.substring(endPos, currentValue.length);

		this.sourceEditor.selectionStart = (startPos + text.length) -
			(endText ? endText.length : 0);
		this.sourceEditor.selectionEnd = this.sourceEditor.selectionStart;

		this.sourceEditor.scrollTop = scrollTop;
		this.sourceEditor.focus();

		this.triggerValueChanged();
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
	public getRangeHelper(): RangeHelper {
		return this.rangeHelper;
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
	public sourceEditorCaret(position: any): any {
		this.sourceEditor.focus();

		if (position) {
			this.sourceEditor.selectionStart = position.start;
			this.sourceEditor.selectionEnd = position.end;

			return this;
		}

		return {
			start: this.sourceEditor.selectionStart,
			end: this.sourceEditor.selectionEnd
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
	public insert(start: string, end: string, filter: boolean, convertEmoticons: boolean, allowMixed: boolean
	): any {
		if (this.inSourceMode()) {
			this.sourceEditorInsertText(start, end);
			return this;
		}

		// Add the selection between start and end
		if (end) {
			let html = this.rangeHelper.selectedHtml();

			if (filter !== false && 'fragmentToSource' in this.format) {
				html = this.format
					.fragmentToSource(html, this.wysiwygDocument, this.currentNode);
			}

			start += html + end;
		}
		// TODO: This filter should allow empty tags as it's inserting.
		if (filter !== false && 'fragmentToHtml' in this.format) {
			start = this.format.fragmentToHtml(start, this.currentNode);
		}

		// Convert any escaped HTML back into HTML if mixed is allowed
		if (filter !== false && allowMixed === true) {
			start = start.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/&amp;/g, '&');
		}

		this.wysiwygEditorInsertHtml(start);

		return this;
	};

	/**
	 * Gets the WYSIWYG editors HTML value.
	 *
	 * If using a plugin that filters the Ht Ml like the BBCode plugin
	 * it will return the result of the filtering (BBCode) unless the
	 * filter param is set to false.
	 *
	 * @param {?boolean} [filter=true]
	 * @return {string}
	 * @function
	 * @name getWysiwygEditorValue
	 * @memberOf EmlEditor.prototype
	 */
	public getWysiwygEditorValue(filter?: boolean): string {
		let html;
		// Create a tmp node to store contents so it can be modified
		// without affecting anything else.
		let tmp = dom.createElement('div', {}, this.wysiwygDocument);
		let childNodes = this.wysiwygBody.childNodes;

		for (let i = 0; i < childNodes.length; i++) {
			dom.appendChild(tmp, childNodes[i].cloneNode(true));
		}

		dom.appendChild(this.wysiwygBody, tmp);
		dom.fixNesting(tmp);
		dom.remove(tmp);

		html = tmp.innerHTML;

		// filter the HTML and DOM through any plugins
		if (filter !== false && Object.prototype.hasOwnProperty.call(this.format, 'toSource')) {
			html = this.format.toSource(html, this.wysiwygDocument);
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
	public getBody(): HTMLBodyElement {
		return this.wysiwygBody;
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
	public getContentAreaContainer(): HTMLElement {
		return this.wysiwygEditor;
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
	public execCommand(command: string, param: any): void {
		let executed = false, commandObj = this.commands[command];

		this.focus();

		// TODO: make configurable
		// don't apply any commands to code elements
		if (dom.closest(this.rangeHelper.parentNode(), 'code')) {
			return;
		}

		try {
			executed = this.wysiwygDocument.execCommand(command, false, param);
		} catch (ex) { /* empty */ }

		// show error if execution failed and an error message exists
		if (!executed && commandObj && commandObj.errorMessage) {
			alert(this.translate(commandObj.errorMessage));
		}

		this.updateActiveButtons();
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
	public translate(...args: any): string {
		let undef: any;

		if (this.locale && this.locale[args[0]]) {
			args[0] = this.locale[args[0]];
		}

		return args[0].replace(/\{(\d+)\}/g, (str?: any, p1?: any) => {
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
	public bind(events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
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
					this.eventHandlers[wysEvent] = this.eventHandlers[wysEvent] || [];
					this.eventHandlers[wysEvent].push(handler);
				}

				if (!excludeSource) {
					this.eventHandlers[srcEvent] = this.eventHandlers[srcEvent] || [];
					this.eventHandlers[srcEvent].push(handler);
				}

				// Start sending value changed events
				if (eventsArr[i] === 'valuechanged') {
					this.hasHandler = true;
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
	public unbind(events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
		let eventsArr = events.split(' ');

		let i = eventsArr.length;
		while (i--) {
			if (utils.isFunction(handler)) {
				if (!excludeWysiwyg) {
					utils.arrayRemove(
						this.eventHandlers['emlwys' + eventsArr[i]] || [], handler);
				}

				if (!excludeSource) {
					utils.arrayRemove(
						this.eventHandlers['emlsrc' + eventsArr[i]] || [], handler);
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
	public keyDown(handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
		return this.bind('keydown', handler, excludeWysiwyg, excludeSource);
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
	public keyPress(handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
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
	public keyUp(handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
		return this.bind('keyup', handler, excludeWysiwyg, excludeSource);
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
	public nodeChanged(handler: Function): any {
		return this.bind('nodechanged', handler, false, true);
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
	public selectionChanged(handler: Function): any {
		return this.bind('selectionchanged', handler, false, true);
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
	public valueChanged(handler: Function, excludeWysiwyg: boolean, excludeSource: boolean): any {
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
	public css(css: string): any {
		if (!this.inlineCss) {
			this.inlineCss = dom.createElement('style', {
				id: 'inline'
			}, this.wysiwygDocument) as HTMLStyleElement;

			dom.appendChild(this.wysiwygDocument.head, this.inlineCss);
		}

		if (!utils.isString(css)) {
			return this.inlineCss.sheet ?
				this.inlineCss.innerText : this.inlineCss.innerHTML;
		}

		if (this.inlineCss.sheet) {
			this.inlineCss.innerText = css;
		} else {
			this.inlineCss.innerHTML = css;
		}

		return this;
	};

	/**
	 * Removes a shortcut handler
	 * @param  {string} shortcut
	 * @return {EmlEditor}
	 */
	public removeShortcut(shortcut: string): any {
		delete this.shortcutHandlers[shortcut.toLowerCase()];

		return this;
	};

	/**
	 * Adds a shortcut handler to the editor
	 * @param  {string}          shortcut
	 * @param  {String|Function} cmd
	 * @return {emleditor}
	 */
	public addShortcut(shortcut: string, cmd: string | Function): any {
		let thisEditor = this;
		shortcut = shortcut.toLowerCase()
		let shortcutKey = shortcut as keyof typeof thisEditor.shortcutHandlers;

		if (utils.isString(cmd)) {
			let strCmd = cmd as string;
			thisEditor.shortcutHandlers[shortcutKey] = () => {
				thisEditor.handleCommand(thisEditor.toolbarButtons[strCmd], thisEditor.commands[strCmd]);

				return false;
			};
		} else {
			thisEditor.shortcutHandlers[shortcutKey] = cmd;
		}

		return thisEditor;
	};

	/**
	 * Clears the formatting of the passed block element.
	 *
	 * If block is false, if will clear the styling of the first
	 * block level element that contains the cursor.
	 * @param  {HTMLElement} block
	 * @since 1.4.4
	 */
	public clearBlockFormatting(block: HTMLElement): any {
		block = block || this.currentStyledBlockNode();

		if (!block || dom.is(block, 'body')) {
			return this;
		}

		this.rangeHelper.saveRange();

		block.className = '';

		dom.attr(block, 'style', '');

		if (!dom.is(block, 'p,div,td')) {
			dom.convertElement(block, 'p');
		}

		this.rangeHelper.restoreRange();
		return this;
	};

	//#endregion

	/************************************************************************
	 * Public static
	 ************************************************************************/

	//#region
	// Static
	public static locale: any = {};
	public static formats: any = {};
	public static icons: any = {};
	public static command: any = {
		/**
		 * Gets a command
		 *
		 * @param {string} name
		 * @return {Object|null}
		 * @since v1.3.5
		 */
		get: (n: keyof typeof defaultCommands): object | null => {
			return defaultCommands[n] || null;
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
		set: (name: keyof typeof defaultCommands, cmd: any): any | false => {
			if (!name || !cmd) {
				return false;
			}

			// merge any existing command properties
			cmd = utils.extend(defaultCommands[name] || {}, cmd);

			cmd.remove = () => {
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
		remove: (name: keyof typeof defaultCommands): any => {
			if (defaultCommands[name]) {
				delete defaultCommands[name];
			}

			return this;
		}

	};

	//#endregion

	/************************************************************************
	 * Private members
	 ************************************************************************/

	//#region

	/**
	 * DOMPurify
	 */
	private domPurify: DOMPurify.DOMPurifyI

	/**
	 * Editor format like BBCode or HTML
	 */
	private format: any;

	/**
	 * Map of events handlers bound to this instance.
	 *
	 * @type {Object}
	 * @private
	 */
	private eventHandlers: any = {};

	/**
	 * The editors window
	 *
	 * @type {Window}
	 * @private
	 */
	private wysiwygWindow: Window;

	/**
	 * The WYSIWYG editors body element
	 *
	 * @type {HTMLBodyElement}
	 * @private
	 */
	private wysiwygBody: HTMLBodyElement;

	/**
	 * The current dropdown
	 *
	 * @type {HTMLDivElement}
	 * @private
	 */
	private dropdown: HTMLDivElement;

	/**
	 * If the user is currently composing text via IME
	 * @type {boolean}
	 */
	private isComposing: boolean;

	/**
	 * Timer for valueChanged key handler
	 * @type {number}
	 */
	private valueChangedKeyUpTimer: any;

	/**
	 * The editors locale
	 *
	 * @private
	 */
	private locale: any;

	/**
	 * Stores a cache of preloaded images
	 *
	 * @private
	 * @type {Array.<HTMLImageElement>}
	 */
	private preLoadCache: any = Array<HTMLImageElement>;

	/**
	 * Plugin manager instance
	 *
	 * @type {PluginManager}
	 * @private
	 */
	private pluginManager: PluginManager;

	/**
	 * The current node containing the selection/caret
	 *
	 * @type {Node}
	 * @private
	 */
	private currentNode: Node;

	/**
	 * The first block level parent of the current node
	 *
	 * @type {node}
	 * @private
	 */
	private currentBlockNode: HTMLElement;

	/**
	 * Used to make sure only 1 selection changed
	 * check is called every 100ms.
	 *
	 * Helps improve performance as it is checked a lot.
	 *
	 * @type {boolean}
	 * @private
	 */
	private isSelectionCheckPending: boolean;

	/**
	 * If content is required (equivalent to the HTML5 required attribute)
	 *
	 * @type {boolean}
	 * @private
	 */
	private isRequired: boolean;

	/**
	 * The inline CSS style element. Will be undefined
	 * until css() is called for the first time.
	 *
	 * @type {HTMLStyleElement}
	 * @private
	 */
	private inlineCss: HTMLStyleElement;

	/**
	 * Object containing a list of shortcut handlers
	 *
	 * @type {Object}
	 * @private
	 */
	private shortcutHandlers: any = {};

	/**
	 * The min and max heights that autoExpand should stay within
	 *
	 * @type {Object}
	 * @private
	 */
	private autoExpandBounds: any;

	/**
	 * Timeout for the autoExpand function to throttle calls
	 *
	 * @private
	 */
	private autoExpandThrottle: any;

	/**
	 * Last scroll position before maximizing so
	 * it can be restored when finished.
	 *
	 * @type {number}
	 * @private
	 */
	private maximizeScrollPosition: number;

	/**
	 * Stores the contents while a paste is taking place.
	 *
	 * Needed to support browsers that lack clipboard API support.
	 *
	 * @type {?DocumentFragment}
	 * @private
	 */
	private pasteContentFragment: any;

	/**
	 * All the emoticons from dropdown, more and hidden combined
	 * and with the emoticons root set
	 *
	 * @type {!Object<string, string>}
	 * @private
	 */
	private allEmoticons: any = {};

	/**
	 * Current icon set if any
	 *
	 * @type {?Object}
	 * @private
	 */
	private icons: any | null;

	/**
	 * An array of button state handlers
	 *
	 * @type {Array.<Object>}
	 * @private
	 */
	private btnStateHandlers: any = [];

	/**
	 * The editors toolbar
	 *
	 * @type {HTMLDivElement}
	 * @private
	 */
	private toolbar: HTMLDivElement;

	/**
	 * The WYSIWYG editors document
	 *
	 * @type {Document}
	 * @private
	 */
	private wysiwygDocument: Document;

	/**
	 * Updates if buttons are active or not
	 * @private
	 */
	private updateActiveButtons = (): void => {
		let firstBlock, parent;
		let activeClass = 'active';
		let doc = this.wysiwygDocument;
		let isSource = this.sourceMode();

		if (this.readOnly()) {
			utils.each(dom.find(this.toolbar, activeClass), (_, menuItem) => {
				dom.removeClass(menuItem, activeClass);
			});
			return;
		}

		if (!isSource) {
			parent = this.rangeHelper.parentNode();
			firstBlock = this.rangeHelper.getFirstBlockParent(parent);
		}

		for (let j = 0; j < this.btnStateHandlers.length; j++) {
			let state = 0;
			let btn = this.toolbarButtons[this.btnStateHandlers[j].name];
			let stateFn = this.btnStateHandlers[j].state;
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

		if (this.icons && this.icons.update) {
			this.icons.update(isSource, parent, firstBlock);
		}
	};

	/**
	 * Cache of the current toolbar buttons
	 *
	 * @type {Object}
	 * @private
	 */
	private toolbarButtons: any = [];

	/**
	 * Updates the toolbar to disable/enable the appropriate buttons
	 * @private
	 */
	private updateToolBar = (disable?: boolean): void => {
		let mode = this.inSourceMode() ? '_emlTxtMode' : '_emlWysiwygMode';

		utils.each(this.toolbarButtons, (_, button) => {
			dom.toggleClass(button, 'disabled', disable || !button[mode]);
		});
	};

	/**
	 * The editors iframe which should be in design mode
	 *
	 * @type {HTMLIFrameElement}
	 * @private
	 */
	private wysiwygEditor: HTMLIFrameElement;

	/**
	 * The editors textarea for viewing source
	 *
	 * @type {HTMLTextAreaElement}
	 * @private
	 */
	private sourceEditor: HTMLTextAreaElement;

	/**
	 * The current node selection/caret
	 *
	 * @type {Object}
	 * @private
	 */
	private currentSelection: any;

	/**
	 * The editors rangeHelper instance
	 *
	 * @type {RangeHelper}
	 * @private
	 */
	private rangeHelper: RangeHelper;

	/**
	 * The div which contains the editor and toolbar
	 *
	 * @type {HTMLDivElement}
	 * @private
	 */
	private editorContainer: HTMLDivElement;

	/**
	 * Checks if the current node has changed and triggers
	 * the nodechanged event if it has
	 * @private
	 */
	private checkNodeChanged = (): void => {
		// check if node has changed
		let oldNode, node = this.rangeHelper.parentNode();

		if (this.currentNode !== node) {
			oldNode = this.currentNode;
			this.currentNode = node;
			this.currentBlockNode = this.rangeHelper.getFirstBlockParent(node);

			dom.trigger(this.editorContainer, 'nodechanged', {
				oldNode: oldNode,
				newNode: this.currentNode
			});
		}
	};

	/******************************************
	 * Creates the editor iframe and textarea
	 * @private
	 */
	private init = (): void => {
		let thisEditor = this;
		this.textarea._emleditor = this;


		// Load locale
		if (thisEditor.options.locale && thisEditor.options.locale !== 'en') {
			thisEditor.initLocale();
		}

		thisEditor.editorContainer = dom.createElement('div', {
			className: 'emleditor-container',
		}) as HTMLDivElement;

		dom.insertBefore(thisEditor.editorContainer, thisEditor.textarea);
		dom.css(thisEditor.editorContainer, 'z-index', thisEditor.options.zIndex);

		thisEditor.isRequired = thisEditor.textarea.required;
		thisEditor.textarea.required = false;

		let FormatCtor = EmlEditor.formats[thisEditor.options.format];
		thisEditor.format = FormatCtor ? new FormatCtor() : {};
		/*
			* Plugins should be initialized before the formatters since
			* they may wish to add or change formatting handlers and
			* since the bbcode format caches its handlers,
			* such changes must be done first.
			*/
		thisEditor.pluginManager = new PluginManager(thisEditor);
		(thisEditor.options.plugins || '').split(',').forEach((plugin: any) => {
			thisEditor.pluginManager.register(plugin.trim());
		});
		if ('init' in thisEditor.format) {
			(thisEditor.format as any).init.call(thisEditor);
		}

		// Create the YAE!
		thisEditor.initEmoticons();
		thisEditor.initToolBar();
		thisEditor.initEditor();
		thisEditor.initOptions();
		thisEditor.initEvents();

		// force into source mode if is a browser that can't handle
		// full editing
		if (!browser.isWysiwygSupported) {
			thisEditor.toggleSourceMode();
		}

		thisEditor.updateActiveButtons();

		let loaded = () => {
			dom.off(globalWin, 'load', null, loaded);

			if (thisEditor.options.autofocus) {
				thisEditor.autofocus(!!thisEditor.options.autofocusEnd);
			}

			thisEditor.autoExpand();
			thisEditor.appendNewLine();
			// TODO: use editor doc and window?
			thisEditor.pluginManager.call('ready');
			if ('onReady' in thisEditor.format) {
				thisEditor.format.onReady.call(thisEditor);
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
	private initLocale = (): void => {
		let lang = undefined;

		this.locale = EmlEditor.locale[this.options.locale];

		if (!this.locale) {
			lang = this.options.locale.split('-');
			this.locale = EmlEditor.locale[lang[0]];
		}

		// Locale DateTime format overrides any specified in the options
		if (this.locale && this.locale.dateFormat) {
			this.options.dateFormat = this.locale.dateFormat;
		}
	};

	/**
	 * Creates the editor iframe and textarea
	 * @private
	 */
	private initEditor = (): void => {
		this.sourceEditor = dom.createElement('textarea', null) as HTMLTextAreaElement;
		this.wysiwygEditor = dom.createElement('iframe', {
			frameborder: "0",
			allowfullscreen: "true"
		}) as HTMLIFrameElement;

		/*
			* This needs to be done right after they are created because,
			* for any reason, the user may not want the value to be tinkered
			* by any filters.
			*/
		if (this.options.startInSourceMode) {
			dom.addClass(this.editorContainer, 'sourceMode');
			dom.hide(this.wysiwygEditor);
		} else {
			dom.addClass(this.editorContainer, 'wysiwygMode');
			dom.hide(this.sourceEditor);
		}

		if (!this.options.spellcheck) {
			dom.attr(this.editorContainer, 'spellcheck', 'false');
		}

		if (globalWin.location.protocol === 'https:') {
			dom.attr(this.wysiwygEditor, 'src', 'about:blank');
		}

		// Add the editor to the container
		dom.appendChild(this.editorContainer, this.wysiwygEditor);
		dom.appendChild(this.editorContainer, this.sourceEditor);

		// TODO: make this optional somehow
		this.dimensions(
			this.options.width || dom.width(this.textarea),
			this.options.height || dom.height(this.textarea)
		);

		// Add ios to HTML so can apply CSS fix to only it
		let className = browser.ios ? ' ios' : '';

		this.wysiwygDocument = this.wysiwygEditor.contentDocument;
		this.wysiwygDocument.open();
		this.wysiwygDocument.write(templates('html', {
			attrs: ' class="' + className + '"',
			spellcheck: this.options.spellcheck ? '' : 'spellcheck="false"',
			charset: this.options.charset,
			style: this.options.style
		}));
		this.wysiwygDocument.close();

		this.wysiwygBody = this.wysiwygDocument.body as HTMLBodyElement;
		this.wysiwygWindow = this.wysiwygEditor.contentWindow;

		this.readOnly(!!this.options.readOnly);

		// iframe overflow fix for iOS
		if (browser.ios) {
			dom.height(this.wysiwygBody, '100%');
			dom.on(this.wysiwygBody, 'touchend', null, this.focus);
		}

		let tabIndex = dom.attr(this.textarea, 'tabindex');
		dom.attr(this.sourceEditor, 'tabindex', tabIndex);
		dom.attr(this.wysiwygEditor, 'tabindex', tabIndex);

		this.rangeHelper = new RangeHelper(this.wysiwygWindow, null, this.sanitize);

		// load any textarea value into the editor
		dom.hide(this.textarea);
		this.val(this.textarea.value);

		let placeholder = this.options.placeholder ||
			dom.attr(this.textarea, 'placeholder');

		if (placeholder) {
			this.sourceEditor.placeholder = placeholder;
			dom.attr(this.wysiwygBody, 'placeholder', placeholder);
		}
	};

	/**
	 * Initialises options
	 * @private
	 */
	private initOptions = (): void => {
		// auto-update original textbox on blur if option set to true
		if (this.options.autoUpdate) {
			dom.on(this.wysiwygBody, 'blur', null, this.autoUpdate);
			dom.on(this.sourceEditor, 'blur', null, this.autoUpdate);
		}

		if (this.options.rtl === null) {
			this.options.rtl = dom.css(this.sourceEditor, 'direction') === 'rtl';
		}

		this.rtl(!!this.options.rtl);

		if (this.options.autoExpand) {
			// Need to update when images (or anything else) loads
			dom.on(this.wysiwygBody, 'load', null, this.autoExpand, dom.EVENT_CAPTURE);
			dom.on(this.wysiwygBody, 'input keyup', null, this.autoExpand);
		}

		if (this.options.resizeEnabled) {
			this.initResize();
		}

		dom.attr(this.editorContainer, 'id', this.options.id);
		this.emoticons(this.options.emoticonsEnabled);
	};

	/**
	 * Initialises events
	 * @private
	 */
	private initEvents = (): void => {
		let thisEditor = this;
		let form = thisEditor.textarea.form;
		let compositionEvents = 'compositionstart compositionend';
		let eventsToForward = 'keydown keyup keypress focus blur contextmenu input';
		let checkSelectionEvents = 'onselectionchange' in thisEditor.wysiwygDocument ?
			'selectionchange' :
			'keyup focus blur contextmenu mouseup touchend click';

		dom.on(globalDoc, 'click', null, thisEditor.handleDocumentClick);

		if (form) {
			dom.on(form, 'reset', null, thisEditor.handleFormReset);
			dom.on(form, 'submit', null, thisEditor.setTextareaValue, dom.EVENT_CAPTURE);
		}

		dom.on(window, 'pagehide', null, thisEditor.setTextareaValue);
		dom.on(window, 'pageshow', null, thisEditor.handleFormReset);
		dom.on(thisEditor.wysiwygBody, 'keypress', null, thisEditor.handleKeyPress);
		dom.on(thisEditor.wysiwygBody, 'keydown', null, thisEditor.handleKeyDown);
		dom.on(thisEditor.wysiwygBody, 'keydown', null, thisEditor.handleBackSpace);
		dom.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.appendNewLine);
		dom.on(thisEditor.wysiwygBody, 'blur', null, thisEditor.valueChangedBlur);
		dom.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.valueChangedKeyUp);
		dom.on(thisEditor.wysiwygBody, 'paste', null, thisEditor.handlePasteEvt);
		dom.on(thisEditor.wysiwygBody, 'cut copy', null, thisEditor.handleCutCopyEvt);
		dom.on(thisEditor.wysiwygBody, compositionEvents, null, thisEditor.handleComposition);
		dom.on(thisEditor.wysiwygBody, checkSelectionEvents, null, thisEditor.checkSelectionChanged);
		dom.on(thisEditor.wysiwygBody, eventsToForward, null, thisEditor.handleEvent);

		if (thisEditor.options.emoticonsCompat && globalWin.getSelection) {
			dom.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.emoticonsCheckWhitespace);
		}

		dom.on(thisEditor.wysiwygBody, 'blur', null, () => {
			if (!thisEditor.val()) {
				dom.addClass(thisEditor.wysiwygBody, 'placeholder');
			}
		});

		dom.on(thisEditor.wysiwygBody, 'focus', null, () => {
			dom.removeClass(thisEditor.wysiwygBody, 'placeholder');
		});

		dom.on(thisEditor.sourceEditor, 'blur', null, thisEditor.valueChangedBlur);
		dom.on(thisEditor.sourceEditor, 'keyup', null, thisEditor.valueChangedKeyUp);
		dom.on(thisEditor.sourceEditor, 'keydown', null, thisEditor.handleKeyDown);
		dom.on(thisEditor.sourceEditor, compositionEvents, null, thisEditor.handleComposition);
		dom.on(thisEditor.sourceEditor, eventsToForward, null, thisEditor.handleEvent);

		dom.on(thisEditor.wysiwygDocument, 'mousedown', null, thisEditor.handleMouseDown);
		dom.on(thisEditor.wysiwygDocument, checkSelectionEvents, null, thisEditor.checkSelectionChanged);
		dom.on(thisEditor.wysiwygDocument, 'keyup', null, thisEditor.appendNewLine);

		dom.on(thisEditor.editorContainer, 'selectionchanged', null, thisEditor.checkNodeChanged);
		dom.on(thisEditor.editorContainer, 'selectionchanged', null, thisEditor.updateActiveButtons);
		// Custom events to forward
		dom.on(
			thisEditor.editorContainer,
			'selectionchanged valuechanged nodechanged pasteraw paste',
			null,
			thisEditor.handleEvent
		);
	};

	/**
	 * Creates the toolbar and appends it to the container
	 * @private
	 */
	private initToolBar = (): void => {
		let thisEditor: any = this;
		let group: any;
		let commands = thisEditor.commands;
		let exclude = (thisEditor.options.toolbarExclude || '').split(',');
		let groups = thisEditor.options.toolbar.split('|');

		thisEditor.toolbar = dom.createElement('div', {
			className: 'emleditor-toolbar',
			unselectable: 'on'
		}) as HTMLDivElement;

		if (thisEditor.options.icons in EmlEditor.icons) {
			thisEditor.icons = new EmlEditor.icons[thisEditor.options.icons]();
		}

		utils.each(groups, (_, menuItems) => {
			group = dom.createElement('div', {
				className: 'emleditor-group'
			});

			utils.each(menuItems.split(','), (_, commandName) => {
				let button: any, shortcut, command = commands[commandName];

				// The commandName must be a valid command and not excluded
				if (!command || exclude.indexOf(commandName) > -1) {
					return;
				}

				shortcut = command.shortcut;
				button = templates('toolbarButton', {
					name: commandName,
					dispName: thisEditor.translate(command.name ||
						command.tooltip || commandName)
				}, true).firstChild;

				if (thisEditor.icons && thisEditor.icons.create) {
					let icon = thisEditor.icons.create(commandName);
					if (icon) {
						dom.insertBefore(thisEditor.icons.create(commandName),
							button.firstChild);
						dom.addClass(button, 'has-icon');
					}
				}

				button._emlTxtMode = !!command.txtExec;
				button._emlWysiwygMode = !!command.exec;
				dom.toggleClass(button, 'disabled', !command.exec);
				dom.on(button, 'click', null, (e: any) => {
					if (!dom.hasClass(button, 'disabled')) {
						thisEditor.handleCommand(button, command);
					}

					thisEditor.updateActiveButtons();
					e.preventDefault();
				});
				// Prevent editor losing focus when button clicked
				dom.on(button, 'mousedown', null, (e: any) => {
					thisEditor.closeDropDown();
					e.preventDefault();
				});

				if (command.tooltip) {
					dom.attr(button, 'title',
						thisEditor.translate(command.tooltip) +
						(shortcut ? ' (' + shortcut + ')' : '')
					);
				}

				if (shortcut) {
					thisEditor.addShortcut(shortcut, commandName);
				}

				if (command.state) {
					thisEditor.btnStateHandlers.push({
						name: commandName,
						state: command.state
					});
					// exec string commands can be passed to queryCommandState
				} else if (utils.isString(command.exec)) {
					thisEditor.btnStateHandlers.push({
						name: commandName,
						state: command.exec
					});
				}

				dom.appendChild(group, button);
				thisEditor.toolbarButtons[commandName] = button;
			});

			// Exclude empty groups
			if (group.firstChild) {
				dom.appendChild(thisEditor.toolbar, group);
			}
		});

		// Append the toolbar to the toolbarContainer option if given
		dom.appendChild(thisEditor.options.toolbarContainer || thisEditor.editorContainer, thisEditor.toolbar);
	};

	/**
	 * Creates the resizer.
	 * @private
	 */
	private initResize = (): void => {
		let minHeight: any, maxHeight: any, minWidth: any, maxWidth: any, mouseMoveFunc: any, mouseUpFunc: any, grip = dom.createElement('div', {
			className: 'emleditor-grip'
		}),
			// Cover is used to cover the editor iframe so document
			// still gets mouse move events
			cover = dom.createElement('div', {
				className: 'emleditor-resize-cover'
			}), moveEvents = 'touchmove mousemove', endEvents = 'touchcancel touchend mouseup', startX = 0, startY = 0, newX = 0, newY = 0, startWidth = 0, startHeight = 0, origWidth = dom.width(this.editorContainer), origHeight = dom.height(this.editorContainer), isDragging = false, rtl = this.rtl();

		minHeight = this.options.resizeMinHeight || origHeight / 1.5;
		maxHeight = this.options.resizeMaxHeight || origHeight * 2.5;
		minWidth = this.options.resizeMinWidth || origWidth / 1.25;
		maxWidth = this.options.resizeMaxWidth || origWidth * 1.25;

		mouseMoveFunc = (e: any) => {
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
			if (!this.options.resizeWidth) {
				newWidth = undefined;
			}

			if (maxHeight > 0 && newHeight > maxHeight) {
				newHeight = maxHeight;
			}
			if (minHeight > 0 && newHeight < minHeight) {
				newHeight = minHeight;
			}
			if (!this.options.resizeHeight) {
				newHeight = undefined;
			}

			if (newWidth || newHeight) {
				this.dimensions(newWidth, newHeight);
			}

			e.preventDefault();
		};

		mouseUpFunc = (e: any) => {
			if (!isDragging) {
				return;
			}

			isDragging = false;

			dom.hide(cover);
			dom.removeClass(this.editorContainer, 'resizing');
			dom.off(globalDoc, moveEvents, null, mouseMoveFunc);
			dom.off(globalDoc, endEvents, null, mouseUpFunc);

			e.preventDefault();
		};

		if (this.icons && this.icons.create) {
			let icon = this.icons.create('grip');
			if (icon) {
				dom.appendChild(grip, icon);
				dom.addClass(grip, 'has-icon');
			}
		}

		dom.appendChild(this.editorContainer, grip);
		dom.appendChild(this.editorContainer, cover);
		dom.hide(cover);

		dom.on(grip, 'touchstart mousedown', null, (e: any) => {
			// iOS uses window.event
			if (e.type === 'touchstart') {
				e = globalWin.event;
				startX = e.touches[0].pageX;
				startY = e.touches[0].pageY;
			} else {
				startX = e.pageX;
				startY = e.pageY;
			}

			startWidth = dom.width(this.editorContainer);
			startHeight = dom.height(this.editorContainer);
			isDragging = true;

			dom.addClass(this.editorContainer, 'resizing');
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
	private initEmoticons = (): void => {
		let thisEditor = this;
		let emoticons = this.options.emoticons;
		let root = this.options.emoticonsRoot || '';

		if (emoticons) {
			this.allEmoticons = utils.extend(
				{}, emoticons.more, emoticons.dropdown, emoticons.hidden
			);
		}

		utils.each(this.allEmoticons, (key, url) => {
			thisEditor.allEmoticons[key] = templates('emoticon', {
				key: key,
				// Prefix emoticon root to emoticon urls
				url: root + (url.url || url),
				tooltip: url.tooltip || key
			});

			// Preload the emoticon
			if (thisEditor.options.emoticonsEnabled) {
				thisEditor.preLoadCache.push(dom.createElement('img', {
					src: root + (url.url || url)
				}));
			}
		});
	};

	/**
	 * Autofocus the editor
	 * @private
	 */
	private autofocus = (focusEnd: any): void => {
		let range, txtPos, node = this.wysiwygBody.firstChild;

		// Can't focus invisible elements
		if (!dom.isVisible(this.editorContainer)) {
			return;
		}

		if (this.sourceMode()) {
			txtPos = focusEnd ? this.sourceEditor.value.length : 0;

			this.sourceEditor.setSelectionRange(txtPos, txtPos);

			return;
		}

		dom.removeWhiteSpace(this.wysiwygBody);

		if (focusEnd) {
			if (!(node = this.wysiwygBody.lastChild)) {
				node = dom.createElement('p', {}, this.wysiwygDocument);
				dom.appendChild(this.wysiwygBody, node);
			}

			while (node.lastChild) {
				node = node.lastChild;

				// Should place the cursor before the last <br>
				if (dom.is(node, 'br') && node.previousSibling) {
					node = node.previousSibling;
				}
			}
		}

		range = this.wysiwygDocument.createRange();

		if (!dom.canHaveChildren(node)) {
			range.setStartBefore(node);

			if (focusEnd) {
				range.setStartAfter(node);
			}
		} else {
			range.selectNodeContents(node);
		}

		range.collapse(!focusEnd);
		this.rangeHelper.selectRange(range);
		this.currentSelection = range;

		if (focusEnd) {
			this.wysiwygBody.scrollTop = this.wysiwygBody.scrollHeight;
		}

		this.focus();
	};

	/**
	 * Autoexpand
	 */
	private autoExpand = (): void => {
		if (this.options.autoExpand && !this.autoExpandThrottle) {
			this.autoExpandThrottle = setTimeout(this.expandToContent, 200);
		}
	};

	/**
	 * Handles any document click and closes the dropdown if open
	 * @private
	 */
	private handleDocumentClick = (e: any): void => {
		// ignore right clicks
		if (e.which !== 3 && this.dropdown && !e.defaultPrevented) {
			this.autoUpdate();

			this.closeDropDown();
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
	private handleCutCopyEvt = (e: any): void => {
		let range = this.rangeHelper.selectedRange();
		if (range) {
			let container = dom.createElement('div', {}, this.wysiwygDocument);
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
			utils.each(dom.find(container, 'p'), (_, elm) => {
				dom.convertElement(elm, 'div');
			});
			// Remove collapsed <br> tags as innerText converts them to newlines
			utils.each(dom.find(container, 'br'), (_, elm) => {
				if (!elm.nextSibling || !dom.isInline(elm.nextSibling, true)) {
					dom.remove(elm);
				}
			});

			// range.toString() doesn't include newlines so can't use this.
			// selection.toString() seems to use the same method as innerText
			// but needs to be normalised first so using container.innerText
			dom.appendChild(this.wysiwygBody, container);
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
	private handlePasteEvt = (e: ClipboardEvent): void => {
		const IMAGE_MIME_REGEX: RegExp = /^image\/(p?jpe?g|gif|png|bmp)$/i;
		let editorContext = this;
		let editable = editorContext.wysiwygBody;
		let clipboard = e.clipboardData;
		let loadImage = (file: any) => {
			let reader = new FileReader();
			reader.onload = (e: any) => {
				editorContext.handlePasteData({
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
			data.html = this.sanitize(data['text/html']);

			this.handlePasteData(data);
			// If contentsFragment exists then we are already waiting for a
			// previous paste so let the handler for that handle this one too
		} else if (!this.pasteContentFragment) {
			// Save the scroll position so can be restored
			// when contents is restored
			let scrollTop = editable.scrollTop;

			this.rangeHelper.saveRange();

			this.pasteContentFragment = globalDoc.createDocumentFragment();
			while (editable.firstChild) {
				dom.appendChild(this.pasteContentFragment, editable.firstChild);
			}

			setTimeout(() => {
				let html = editable.innerHTML;

				editable.innerHTML = '';
				dom.appendChild(editable, this.pasteContentFragment);
				editable.scrollTop = scrollTop;
				this.pasteContentFragment = false;

				this.rangeHelper.restoreRange();

				this.handlePasteData({ html: this.sanitize(html) });
			}, 0);
		}
	};

	/**
	 * Replaces any emoticon codes in the passed HTML
	 * with their emoticon images
	 * @private
	 */
	private replaceEmoticons = (): void => {
		if (this.options.emoticonsEnabled) {
			emoticons
				.replace(this.wysiwygBody, this.allEmoticons, this.options.emoticonsCompat);
		}
	};

	/**
	 * Gets the selected text of the source editor
	 * @return {string}
	 * @private
	 */
	private sourceEditorSelectedText = (): string => {
		this.sourceEditor.focus();

		return this.sourceEditor.value.substring(
			this.sourceEditor.selectionStart,
			this.sourceEditor.selectionEnd
		);
	};

	/**
	 * Handles the passed command
	 * @private
	 */
	private handleCommand = (caller: any, cmd: any): void => {
		// check if in text mode and handle text commands
		if (this.inSourceMode()) {
			if (cmd.txtExec) {
				if (Array.isArray(cmd.txtExec)) {
					this.sourceEditorInsertText.apply(this, cmd.txtExec);
				} else {
					cmd.txtExec.call(this, caller, this.sourceEditorSelectedText());
				}
			}
		} else if (cmd.exec) {
			if (utils.isFunction(cmd.exec)) {
				cmd.exec.call(this, caller);
			} else {
				this.execCommand(
					cmd.exec,
					Object.prototype.hasOwnProperty.call(cmd, 'execParam') ? cmd.execParam : null
				);
			}
		}

	};

	/**
	 * Wrap inlines that are in the root in paragraphs.
	 *
	 * @param {HTMLBodyElement} body
	 * @param {Document} doc
	 * @private
	 */
	private wrapInlines = (body: HTMLBodyElement, doc: Document) => {
		let wrapper: HTMLElement;

		dom.traverse(body, (node: HTMLElement) => {
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
	 * Checks if the current selection has changed and triggers
	 * the selectionchanged event if it has.
	 *
	 * In browsers other that don't support selectionchange event it will check
	 * at most once every 100ms.
	 * @private
	 */
	private checkSelectionChanged = (): void => {
		let thisEditor = this;
		let check = () => {
			// Don't create new selection if there isn't one (like after
			// blur event in iOS)
			if (thisEditor.wysiwygWindow.getSelection() &&
				thisEditor.wysiwygWindow.getSelection().rangeCount <= 0) {
				thisEditor.currentSelection = null;
				// rangeHelper could be null if editor was destroyed
				// before the timeout had finished
			} else if (thisEditor.rangeHelper && !thisEditor.rangeHelper.compare(thisEditor.currentSelection)) {
				thisEditor.currentSelection = thisEditor.rangeHelper.cloneSelected();

				// If the selection is in an inline wrap it in a block.
				// Fixes #331
				if (thisEditor.currentSelection && thisEditor.currentSelection.collapsed) {
					let parent = thisEditor.currentSelection.startContainer;
					let offset = thisEditor.currentSelection.startOffset;

					// Handle if selection is placed before/after an element
					if (offset && parent.nodeType !== dom.TEXT_NODE) {
						parent = parent.childNodes[offset];
					}

					while (parent && parent.parentNode !== thisEditor.wysiwygBody) {
						parent = parent.parentNode;
					}

					if (parent && dom.isInline(parent, true)) {
						thisEditor.rangeHelper.saveRange();
						thisEditor.wrapInlines(thisEditor.wysiwygBody, thisEditor.wysiwygDocument);
						thisEditor.rangeHelper.restoreRange();
					}
				}

				dom.trigger(thisEditor.editorContainer, 'selectionchanged');
			}

			thisEditor.isSelectionCheckPending = false;
		}

		if (thisEditor.isSelectionCheckPending) {
			return;
		}

		thisEditor.isSelectionCheckPending = true;

		// Don't need to limit checking if browser supports the Selection API
		if ('onselectionchange' in thisEditor.wysiwygDocument) {
			check();
		} else {
			setTimeout(check, 100);
		}
	};

	/**
	 * Handles any key press in the WYSIWYG editor
	 *
	 * @private
	 */
	private handleKeyPress = (e: any): void => {
		// FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=501496
		if (e.defaultPrevented) {
			return;
		}

		this.closeDropDown();

		// 13 = enter key
		if (e.which === 13) {
			let LIST_TAGS = 'li,ul,ol';

			// "Fix" (cludge) for blocklevel elements being duplicated in some
			// browsers when enter is pressed instead of inserting a newline
			if (!dom.is(this.currentBlockNode, LIST_TAGS) &&
				dom.hasStyling(this.currentBlockNode)) {

				let br = dom.createElement('br', {}, this.wysiwygDocument);
				this.rangeHelper.insertNode(br);

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
					this.rangeHelper.insertHTML('<br>');
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
	private appendNewLine = (): void => {
		// Check all nodes in reverse until either add a new line
		// or reach a non-empty textnode or BR at which point can
		// stop checking.
		dom.rTraverse(this.wysiwygBody, (node: any) => {
			// Last block, add new line after if has styling
			if (node.nodeType === dom.ELEMENT_NODE &&
				!/inline/.test(dom.css(node, 'display'))) {

				// Add line break after if has styling
				if (!dom.is(node, '.emleditor-nlf') && dom.hasStyling(node)) {
					let paragraph = dom.createElement('p', {}, this.wysiwygDocument);
					paragraph.className = 'emleditor-nlf';
					paragraph.innerHTML = '<br />';
					dom.appendChild(this.wysiwygBody, paragraph);
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
	private handleFormReset = (): void => {
		this.val(this.textarea.value);
	};

	/**
	 * Handles any mousedown press in the WYSIWYG editor
	 * @private
	 */
	private handleMouseDown = (): void => {
		this.closeDropDown();
	};

	/**
	 * Passes events on to any handlers
	 * @private
	 * @return void
	 */
	private handleEvent = (e: any): void => {
		if (this.pluginManager) {
			// Send event to all plugins
			this.pluginManager.call(e.type + 'Event', e, this);
		}

		// convert the event into a custom event to send
		let name = (e.target === this.sourceEditor ? 'emlsrc' : 'emlwys') + e.type as keyof typeof this.eventHandlers;

		if (this.eventHandlers[name]) {
			this.eventHandlers[name].forEach((fn: any) => {
				fn.call(this, e);
			});
		}
	};

	/**
	 * Emoticons keypress handler
	 * @private
	 */
	private emoticonsKeyPress = (e: any): void => {
		let replacedEmoticon, cachePos = 0, emoticonsCache = this.emoticonsCache, curChar = String.fromCharCode(e.which);

		// TODO: Make configurable
		if (dom.closest(this.currentBlockNode, 'code')) {
			return;
		}

		if (!emoticonsCache) {
			emoticonsCache = [];

			utils.each(this.allEmoticons, (key, html) => {
				emoticonsCache[cachePos++] = [key, html];
			});

			emoticonsCache.sort((a: any, b: any) => {
				return a[0].length - b[0].length;
			});

			this.emoticonsCache = emoticonsCache;
			this.longestEmoticonCode =
				emoticonsCache[emoticonsCache.length - 1][0].length;
		}

		replacedEmoticon = this.rangeHelper.replaceKeyword(
			this.emoticonsCache,
			true,
			true,
			this.longestEmoticonCode,
			this.options.emoticonsCompat,
			curChar
		);

		if (replacedEmoticon) {
			if (!this.options.emoticonsCompat || !/^\s$/.test(curChar)) {
				e.preventDefault();
			}
		}
	};

	/**
	 * Makes sure emoticons are surrounded by whitespace
	 * @private
	 */
	private emoticonsCheckWhitespace = (): void => {
		emoticons.checkWhitespace(this.currentBlockNode, this.rangeHelper);
	};

	/**
	 * Handles the keydown event, used for shortcuts
	 * @private
	 */
	private handleKeyDown = (e: any): void => {
		let thisEditor = this;
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
		if (thisEditor.shortcutHandlers &&
			thisEditor.shortcutHandlers[shortcut] &&
			thisEditor.shortcutHandlers[shortcut].call(thisEditor) === false) {

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
	private handleBackSpace = (e: any): void => {
		let node, offset, range, parent;

		// 8 is the backspace key
		if (this.options.disableBlockRemove || e.which !== 8 ||
			!(range = this.rangeHelper.selectedRange())) {
			return;
		}

		node = range.startContainer;
		offset = range.startOffset;

		if (offset !== 0 || !(parent = this.currentStyledBlockNode()) ||
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
		this.clearBlockFormatting(parent);
		e.preventDefault();
	};

	/**
	 * Gets the first styled block node that contains the cursor
	 * @return {HTMLElement}
	 */
	private currentStyledBlockNode = (): HTMLElement => {
		let block: any = this.currentBlockNode;

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
	private hasHandler = false;
	private triggerValueChanged = (saveRange?: boolean): any => {

		let lastVal: string;
		if (!this.pluginManager ||
			(!this.pluginManager.hasHandler('valuechangedEvent') &&
				!this.hasHandler)) {
			return;
		}

		let currentHtml, sourceMode = this.sourceMode(), hasSelection = !sourceMode && this.rangeHelper.hasSelection();

		// Composition end isn't guaranteed to fire but must have
		// ended when triggerValueChanged() is called so reset it
		this.isComposing = false;

		// Don't need to save the range if emleditor-start-marker
		// is present as the range is already saved
		saveRange = saveRange !== false &&
			!this.wysiwygDocument.getElementById('emleditor-start-marker');

		// Clear any current timeout as it's now been triggered
		if (this.valueChangedKeyUpTimer) {
			clearTimeout(this.valueChangedKeyUpTimer);
			this.valueChangedKeyUpTimer = false;
		}

		if (hasSelection && saveRange) {
			this.rangeHelper.saveRange();
		}

		currentHtml = sourceMode ? this.sourceEditor.value : this.wysiwygBody.innerHTML;

		// Only trigger if something has actually changed.
		if (currentHtml !== lastVal) {
			lastVal = currentHtml;

			dom.trigger(this.editorContainer, 'valuechanged', {
				rawValue: sourceMode ? this.val() : currentHtml
			});
		}

		if (hasSelection && saveRange) {
			this.rangeHelper.removeMarkers();
		}
	};

	/**
	 * Should be called whenever there is a blur event
	 * @private
	 */
	private valueChangedBlur = (): void => {
		if (this.valueChangedKeyUpTimer) {
			this.triggerValueChanged();
		}
	};

	/**
	 * Should be called whenever there is a keypress event
	 * @param  {Event} e The keypress event
	 * @private
	 */
	private valueChangedKeyUp = (e: any): any => {
		let thisEditor = this;
		let which = e.which;
		let lastChar: any = which;
		let triggerNext: boolean;
		let lastWasSpace = (lastChar === 13 || lastChar === 32);
		let lastWasDelete = (lastChar === 8 || lastChar === 46);

		if (thisEditor.isComposing) {
			return;
		}

		// 13 = return & 32 = space
		if (which === 13 || which === 32) {
			if (!lastWasSpace) {
				thisEditor.triggerValueChanged();
			} else {
				triggerNext = true;
			}
			// 8 = backspace & 46 = del
		} else if (which === 8 || which === 46) {
			if (!lastWasDelete) {
				thisEditor.triggerValueChanged();
			} else {
				triggerNext = true;
			}
		} else if (triggerNext) {
			thisEditor.triggerValueChanged();
			triggerNext = false;
		}

		// Clear the previous timeout and set a new one.
		clearTimeout(thisEditor.valueChangedKeyUpTimer);

		// Trigger the event 1.5s after the last keypress if space
		// isn't pressed. This might need to be lowered, will need
		// to look into what the slowest average Chars Per Min is.
		thisEditor.valueChangedKeyUpTimer = setTimeout(() => {
			if (!thisEditor.isComposing) {
				thisEditor.triggerValueChanged();
			}
		}, 1500);
	};

	private handleComposition = (e: any): void => {
		this.isComposing = /start/i.test(e.type);

		if (!this.isComposing) {
			this.triggerValueChanged();
		}
	};

	private autoUpdate = (): void => {
		this.setTextareaValue();
	};

	/**
	 * Options for this editor instance
	 * @name editorOptions
	 * @memberOf EmlEditor.prototype
	 */
	private options: any;

	/**
	 * Sanitize HTML to avoid XSS
	 *
	 * @param {string} html
	 * @return {string} html
	 * @private
	 */
	private sanitize = (html: HTMLElement | Node | string): string => {
		const allowedTags = ['iframe'].concat(this.options.allowedTags);
		const allowedAttrs = ['allowfullscreen', 'frameborder', 'target']
			.concat(this.options.allowedAttributes);

		return this.domPurify.sanitize(html, {
			ADD_TAGS: allowedTags,
			ADD_ATTR: allowedAttrs
		});
	}

	/**
	 * Gets the pasted data, filters it and then inserts it.
	 * @param {Object} data
	 * @private
	 */
	private handlePasteData = (data: any): void => {
		let pasteArea = dom.createElement('div', {}, this.wysiwygDocument);

		this.pluginManager.call('pasteRaw', data);
		dom.trigger(this.editorContainer, 'pasteraw', data);

		if (data.html) {
			// Sanitize again in case plugins modified the HTML
			pasteArea.innerHTML = this.sanitize(data.html);

			// fix any invalid nesting
			dom.fixNesting(pasteArea);
		} else {
			pasteArea.innerHTML = escape.entities(data.text || '');
		}

		let paste: any = {
			val: pasteArea.innerHTML
		};

		if ('fragmentToSource' in this.format) {
			paste.val = this.format
				.fragmentToSource(paste.val, this.wysiwygDocument, this.currentNode);
		}

		this.pluginManager.call('paste', paste);
		dom.trigger(this.editorContainer, 'paste', paste);

		if ('fragmentToHtml' in this.format) {
			paste.val = this.format
				.fragmentToHtml(paste.val, this.currentNode);
		}

		this.pluginManager.call('pasteHtml', paste);

		let parent = this.rangeHelper.getFirstBlockParent();
		this.wysiwygEditorInsertHtml(paste.val, null, true);
		dom.merge(parent);
	};

	//#endregion




}
