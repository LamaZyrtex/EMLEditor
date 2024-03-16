import EmlEditor from './lib/EmlEditor.js';
import PluginManager from './lib/PluginManager.js';
import * as escape from './lib/escape.js';
import * as browser from './lib/browser.js';
import * as dom from './lib/dom.js';
import * as utils from './lib/utils.js';
import defaultCommands from './lib/defaultCommands.js';
import defaultOptions from './lib/defaultOptions.js';
import './themes/square.less';

declare global {
	interface Window {
		emlEditor: IEditor;
	}
}

interface IEditor {
	command: Object;
	locale: Object;
	icons: Object;
	formats: Object;
	commands: Object;
	defaultOptions: Object;
	ios: boolean;
	isWysiwygSupported: boolean;
	regexEscape(str: string): string;
	escapeEntities(str: string, noQuotes: boolean | null): string;
	escapeUriScheme(url: string): string;
	dom: Object;
	utils: Object;
	plugins: Object;
	create(textarea: HTMLTextAreaElement, options: Object): void;
	instance(textarea: HTMLTextAreaElement): IEditor;
}

window.emlEditor = {
	command: EmlEditor.command,
	locale: EmlEditor.locale,
	icons: EmlEditor.icons,
	formats: EmlEditor.formats,

	commands: defaultCommands,
	defaultOptions: defaultOptions,
	ios: browser.ios,
	isWysiwygSupported: browser.isWysiwygSupported,
	regexEscape: escape.regex,
	escapeEntities: escape.entities,
	escapeUriScheme: escape.uriScheme,

	dom: {
		css: dom.css,
		attr: dom.attr,
		removeAttr: dom.removeAttr,
		is: dom.is,
		closest: dom.closest,
		width: dom.width,
		height: dom.height,
		traverse: dom.traverse,
		rTraverse: dom.rTraverse,
		parseHTML: dom.parseHTML,
		hasStyling: dom.hasStyling,
		convertElement: dom.convertElement,
		blockLevelList: dom.blockLevelList,
		canHaveChildren: dom.canHaveChildren,
		isInline: dom.isInline,
		copyCSS: dom.copyCSS,
		fixNesting: dom.fixNesting,
		findCommonAncestor: dom.findCommonAncestor,
		getSibling: dom.getSibling,
		removeWhiteSpace: dom.removeWhiteSpace,
		extractContents: dom.extractContents,
		getOffset: dom.getOffset,
		getStyle: dom.getStyle,
		hasStyle: dom.hasStyle
	},

	utils: {
		each: utils.each,
		isEmptyObject: utils.isEmptyObject,
		extend: utils.extend
	},

	plugins: PluginManager.plugins,

	create: function (textarea: any, options: any) {
		options = options || {};

		// Don't allow the editor to be initialised
		// on it's own source editor
		if (dom.parent(textarea, '.sceditor-container')) {
			return;
		}

		if (options.runWithoutWysiwygSupport || browser.isWysiwygSupported) {
			/*eslint no-new: off*/
			(new EmlEditor(textarea, options));
		}
	},

	instance: function (textarea: any) {
		return textarea._sceditor;
	}
};
