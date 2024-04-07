/* eslint-disable @typescript-eslint/no-this-alias */
import * as dom from './dom';
import * as escape from './escape.js';
import * as utils from './utils';


/**
 * Gets the text, start/end node and offset for
 * length chars left or right of the passed node
 * at the specified offset.
 *
 * @param  {Node}  node
 * @param  {number}  offset
 * @param  {boolean} isLeft
 * @param  {number}  length
 * @return {Object}
 * @private
 */
var outerText = function (range: any, isLeft: boolean, length: number): any {
	var nodeValue, remaining, start, end, node,
		text = '',
		next = range.startContainer,
		offset = range.startOffset;

	// Handle cases where node is a paragraph and offset
	// refers to the index of a text node.
	// 3 = text node
	if (next && next.nodeType !== 3) {
		next = next.childNodes[offset];
		offset = 0;
	}

	start = end = offset;

	while (length > text.length && next && next.nodeType === 3) {
		nodeValue = next.nodeValue;
		remaining = length - text.length;

		// If not the first node, start and end should be at their
		// max values as will be updated when getting the text
		if (node) {
			end = nodeValue.length;
			start = 0;
		}

		node = next;

		if (isLeft) {
			start = Math.max(end - remaining, 0);
			offset = start;

			text = nodeValue.substr(start, end - start) + text;
			next = node.previousSibling;
		} else {
			end = Math.min(remaining, nodeValue.length);
			offset = start + end;

			text += nodeValue.substr(start, end);
			next = node.nextSibling;
		}
	}

	return {
		node: node || next,
		offset: offset,
		text: text
	};
};

/**
 * Range helper
 *
 * @class RangeHelper
 * @name RangeHelper
 */
export class RangeHelper {

	insertHTML: (html: string, endHTML?: string) => boolean;
	insertNode: (node?: any, endNode?: any) => false | undefined;
	cloneSelected: () => Range;
	selectedRange: () => Range;
	hasSelection: () => boolean;
	selectedHtml: () => string;
	parentNode: () => HTMLElement;
	getFirstBlockParent: (node?: any) => any;
	insertNodeAt: (start: any, node: any) => boolean;
	insertMarkers: () => void;
	getMarker: (id: any) => any;
	removeMarker: (id: any) => void;
	removeMarkers: () => void;
	saveRange: () => void;
	selectRange: (range: any) => void;
	restoreRange: () => boolean;
	selectOuterText: (left: any, right: any) => boolean;
	getOuterText: (before: any, length: any) => any;
	replaceKeyword: (keywords: any, includeAfter: any, keywordsSorted: any, longestKeyword: any, requireWhitespace: any, keypressChar: any) => boolean;
	compare: (rngA?: any, rngB?: any) => boolean;
	clear: () => void;

	constructor(win: any, d: null, sanitize: { (html: string): string; (arg0: any): string; }) {
		let _createMarker: any;
		let _prepareInput: any;
		let doc: any = d || win.contentDocument || win.document;
		let startMarker: string = 'emleditor-start-marker';
		let endMarker: string = 'emleditor-end-marker';

		/**
		 * Inserts HTML into the current range replacing any selected
		 * text.
		 *
		 * If endHTML is specified the selected contents will be put between
		 * html and endHTML. If there is nothing selected html and endHTML are
		 * just concatenate together.
		 *
		 * @param {string} html
		 * @param {string} [endHTML]
		 * @return False on fail
		 * @function
		 * @name insertHTML
		 * @memberOf RangeHelper.prototype
		 */
		this.insertHTML = function (html: string, endHTML?: string) {
			var node, div, range = this.selectedRange();

			if (!range) {
				return false;
			}

			if (endHTML) {
				html += this.selectedHtml() + endHTML;
			}

			div = dom.createElement('p', {}, doc);
			node = doc.createDocumentFragment();
			div.innerHTML = sanitize(html);

			while (div.firstChild) {
				let divFirstChild = div.firstChild as HTMLElement;
				dom.appendChild(node, divFirstChild);
			}

			this.insertNode(node);
		};

		/**
		* Removes the start/end markers
		*
		* @function
		* @name removeMarkers
		* @memberOf RangeHelper.prototype
		*/
		this.removeMarkers = function () {
			this.removeMarker(startMarker);
			this.removeMarker(endMarker);
		};

		/**
		 * The same as insertHTML except with DOM nodes instead
		 *
		 * <strong>Warning:</strong> the nodes must belong to the
		 * document they are being inserted into. Some browsers
		 * will throw exceptions if they don't.
		 *
		 * Returns boolean false on fail
		 *
		 * @param {Node} node
		 * @param {Node} endNode
		 * @return {false|undefined}
		 * @function
		 * @name insertNode
		 * @memberOf RangeHelper.prototype
		 */
		this.insertNode = function (node?: Node, endNode?: Node): false | undefined {
			let first, last, input = _prepareInput(node, endNode), range = this.selectedRange(), parent = range.commonAncestorContainer;
			let emptyNodes: any = [];

			if (!input) {
				return false;
			}

			function removeIfEmpty(node: any) {
				// Only remove empty node if it wasn't already empty
				if (node && dom.isEmpty(node) && emptyNodes.indexOf(node) < 0) {
					dom.remove(node);
				}
			}

			if (range.startContainer !== range.endContainer) {
				utils.each(parent.childNodes, function (_, node) {
					if (dom.isEmpty(node)) {
						emptyNodes.push(node);
					}
				});

				first = input.firstChild;
				last = input.lastChild;
			}

			range.deleteContents();

			// FF allows <br /> to be selected but inserting a node
			// into <br /> will cause it not to be displayed so must
			// insert before the <br /> in FF.
			// 3 = TextNode
			if (parent && parent.nodeType !== 3 && !dom.canHaveChildren(parent)) {
				dom.insertBefore(input, parent);
			} else {
				range.insertNode(input);

				// If a node was split or its contents deleted, remove any resulting
				// empty tags. For example:
				// <p>|test</p><div>test|</div>
				// When deleteContents could become:
				// <p></p>|<div></div>
				// So remove the empty ones
				removeIfEmpty(first && first.previousSibling);
				removeIfEmpty(last && last.nextSibling);
			}

			this.restoreRange();
		};

		/**
		 * Clones the selected Range
		 *
		 * @return {Range}
		 * @function
		 * @name cloneSelected
		 * @memberOf RangeHelper.prototype
		 */
		this.cloneSelected = function (): Range {
			var range = this.selectedRange();

			if (range) {
				return range.cloneRange();
			}
		};

		/**
		 * Gets the selected Range
		 *
		 * @return {Range}
		 * @function
		 * @name selectedRange
		 * @memberOf RangeHelper.prototype
		 */
		this.selectedRange = function (): Range {
			var range, firstChild, sel = win.getSelection();

			if (!sel) {
				return;
			}

			// When creating a new range, set the start to the first child
			// element of the body element to avoid errors in FF.
			if (sel.rangeCount <= 0) {
				firstChild = doc.body;
				while (firstChild.firstChild) {
					firstChild = firstChild.firstChild;
				}

				range = doc.createRange();
				// Must be setStartBefore otherwise it can cause infinite
				// loops with lists in WebKit. See issue 442
				range.setStartBefore(firstChild);

				sel.addRange(range);
			}

			if (sel.rangeCount > 0) {
				range = sel.getRangeAt(0);
			}

			return range;
		};

		/**
		 * Gets if there is currently a selection
		 *
		 * @return {boolean}
		 * @function
		 * @name hasSelection
		 * @since 1.4.4
		 * @memberOf RangeHelper.prototype
		 */
		this.hasSelection = function (): boolean {
			var sel = win.getSelection();

			return sel && sel.rangeCount > 0;
		};

		/**
		 * Gets the currently selected HTML
		 *
		 * @return {string}
		 * @function
		 * @name selectedHtml
		 * @memberOf RangeHelper.prototype
		 */
		this.selectedHtml = function (): string {
			var div, range = this.selectedRange();

			if (range) {
				div = dom.createElement('p', {}, doc);
				dom.appendChild(div, range.cloneContents());

				return div.innerHTML;
			}

			return '';
		};

		/**
		 * Gets the parent node of the selected contents in the range
		 *
		 * @return {HTMLElement}
		 * @function
		 * @name parentNode
		 * @memberOf RangeHelper.prototype
		 */
		this.parentNode = function (): HTMLElement {
			var range = this.selectedRange();

			if (range) {
				return range.commonAncestorContainer;
			}
		};

		/**
		 * Gets the first block level parent of the selected
		 * contents of the range.
		 *
		 * @return {HTMLElement}
		 * @function
		 * @name getFirstBlockParent
		 * @memberOf RangeHelper.prototype
		 */
		/**
		 * Gets the first block level parent of the selected
		 * contents of the range.
		 *
		 * @param {Node} [n] The element to get the first block level parent from
		 * @return {HTMLElement}
		 * @function
		 * @name getFirstBlockParent^2
		 * @since 1.4.1
		 * @memberOf RangeHelper.prototype
		 */
		this.getFirstBlockParent = function (node?: any): HTMLElement {
			var func = function (elm: any): any {
				if (!dom.isInline(elm, true)) {
					return elm;
				}

				elm = elm ? elm.parentNode : null;

				return elm ? func(elm) : elm;
			};

			return func(node || this.parentNode());
		};

		/**
		 * Inserts a node at either the start or end of the current selection
		 *
		 * @param {Bool} start
		 * @param {Node} node
		 * @function
		 * @name insertNodeAt
		 * @memberOf RangeHelper.prototype
		 */
		this.insertNodeAt = function (start: boolean, node: Node) {
			var currentRange = this.selectedRange(), range = this.cloneSelected();

			if (!range) {
				return false;
			}

			range.collapse(start);
			range.insertNode(node);

			// Reselect the current range.
			// Fixes issue with Chrome losing the selection. Issue#82
			this.selectRange(currentRange);
		};

		/**
		 * Inserts start/end markers for the current selection
		 * which can be used by restoreRange to re-select the
		 * range.
		 *
		 * @memberOf RangeHelper.prototype
		 * @function
		 * @name insertMarkers
		 */
		this.insertMarkers = function () {
			var currentRange = this.selectedRange();
			var startNode = _createMarker(startMarker);

			this.removeMarkers();
			this.insertNodeAt(true, startNode);

			// Fixes issue with end marker sometimes being placed before
			// the start marker when the range is collapsed.
			if (currentRange && currentRange.collapsed) {
				startNode.parentNode.insertBefore(
					_createMarker(endMarker), startNode.nextSibling);
			} else {
				this.insertNodeAt(false, _createMarker(endMarker));
			}
		};

		/**
		 * Gets the marker with the specified ID
		 *
		 * @param {string} id
		 * @return {Node}
		 * @function
		 * @name getMarker
		 * @memberOf RangeHelper.prototype
		 */
		this.getMarker = function (id) {
			return doc.getElementById(id);
		};

		/**
		 * Removes the marker with the specified ID
		 *
		 * @param {string} id
		 * @function
		 * @name removeMarker
		 * @memberOf RangeHelper.prototype
		 */
		this.removeMarker = function (id) {
			var marker = this.getMarker(id);

			if (marker) {
				dom.remove(marker);
			}
		};

		/**
		 * Saves the current range location. Alias of insertMarkers()
		 *
		 * @function
		 * @name saveRage
		 * @memberOf RangeHelper.prototype
		 */
		this.saveRange = function () {
			this.insertMarkers();
		};

		/**
		 * Select the specified range
		 *
		 * @param {Range} range
		 * @function
		 * @name selectRange
		 * @memberOf RangeHelper.prototype
		 */
		this.selectRange = function (range) {
			var lastChild;
			var sel = win.getSelection();
			var container = range.endContainer;

			// Check if cursor is set after a BR when the BR is the only
			// child of the parent. In Firefox this causes a line break
			// to occur when something is typed. See issue #321
			if (range.collapsed && container &&
				!dom.isInline(container, true)) {

				lastChild = container.lastChild;
				while (lastChild && dom.is(lastChild, '.emleditor-ignore')) {
					lastChild = lastChild.previousSibling;
				}

				if (dom.is(lastChild, 'br')) {
					var rng = doc.createRange();
					rng.setEndAfter(lastChild);
					rng.collapse(false);

					if (this.compare(range, rng)) {
						range.setStartBefore(lastChild);
						range.collapse(true);
					}
				}
			}

			if (sel) {
				this.clear();
				sel.addRange(range);
			}
		};

		/**
		 * Restores the last range saved by saveRange() or insertMarkers()
		 *
		 * @function
		 * @name restoreRange
		 * @memberOf RangeHelper.prototype
		 */
		this.restoreRange = function () {
			var isCollapsed, range = this.selectedRange(), start = this.getMarker(startMarker), end = this.getMarker(endMarker);

			if (!start || !end || !range) {
				return false;
			}

			isCollapsed = start.nextSibling === end;

			range = doc.createRange();
			range.setStartBefore(start);
			range.setEndAfter(end);

			if (isCollapsed) {
				range.collapse(true);
			}

			this.selectRange(range);
			this.removeMarkers();
		};

		/**
		 * Selects the text left and right of the current selection
		 *
		 * @param {number} left
		 * @param {number} right
		 * @since 1.4.3
		 * @function
		 * @name selectOuterText
		 * @memberOf RangeHelper.prototype
		 */
		this.selectOuterText = function (left: number, right: number) {
			let start: any, end: any, range: any = this.cloneSelected();

			if (!range) {
				return false;
			}

			range.collapse(false);

			start = outerText(range, true, left);
			end = outerText(range, false, right);

			range.setStart(start.node, start.offset);
			range.setEnd(end.node, end.offset);

			this.selectRange(range);
		};

		/**
		 * Gets the text left or right of the current selection
		 *
		 * @param {boolean} before
		 * @param {number} length
		 * @return {string}
		 * @since 1.4.3
		 * @function
		 * @name selectOuterText
		 * @memberOf RangeHelper.prototype
		 */
		this.getOuterText = function (before, length) {
			var range = this.cloneSelected();

			if (!range) {
				return '';
			}

			range.collapse(!before);

			return outerText(range, before, length).text;
		};

		/**
		 * Replaces keywords with values based on the current caret position
		 *
		 * @param {Array}   keywords
		 * @param {boolean} includeAfter      If to include the text after the
		 *                                    current caret position or just
		 *                                    text before
		 * @param {boolean} keywordsSorted    If the keywords array is pre
		 *                                    sorted shortest to longest
		 * @param {number}  longestKeyword    Length of the longest keyword
		 * @param {boolean} requireWhitespace If the key must be surrounded
		 *                                    by whitespace
		 * @param {string}  keypressChar      If this is being called from
		 *                                    a keypress event, this should be
		 *                                    set to the pressed character
		 * @return {boolean}
		 * @function
		 * @name replaceKeyword
		 * @memberOf RangeHelper.prototype
		 */
		// eslint-disable-next-line max-params
		this.replaceKeyword = function (
			keywords,
			includeAfter,
			keywordsSorted,
			longestKeyword,
			requireWhitespace,
			keypressChar
		) {
			if (!keywordsSorted) {
				keywords.sort(function (a: any, b: any) {
					return a[0].length - b[0].length;
				});
			}

			var outerText, match, matchPos, startIndex, leftLen, charsLeft, keyword, keywordLen, whitespaceRegex = '(^|[\\s\xA0\u2002\u2003\u2009])', keywordIdx = keywords.length, whitespaceLen = requireWhitespace ? 1 : 0, maxKeyLen = longestKeyword ||
				keywords[keywordIdx - 1][0].length;

			if (requireWhitespace) {
				maxKeyLen++;
			}

			keypressChar = keypressChar || '';
			outerText = this.getOuterText(true, maxKeyLen);
			leftLen = outerText.length;
			outerText += keypressChar;

			if (includeAfter) {
				outerText += this.getOuterText(false, maxKeyLen);
			}

			while (keywordIdx--) {
				keyword = keywords[keywordIdx][0];
				keywordLen = keyword.length;
				startIndex = Math.max(0, leftLen - keywordLen - whitespaceLen);
				matchPos = -1;

				if (requireWhitespace) {
					match = outerText
						.substr(startIndex)
						.match(new RegExp(whitespaceRegex +
							escape.regex(keyword) + whitespaceRegex));

					if (match) {
						// Add the length of the text that was removed by
						// substr() and also add 1 for the whitespace
						matchPos = match.index + startIndex + match[1].length;
					}
				} else {
					matchPos = outerText.indexOf(keyword, startIndex);
				}

				if (matchPos > -1) {
					// Make sure the match is between before and
					// after, not just entirely in one side or the other
					if (matchPos <= leftLen &&
						matchPos + keywordLen + whitespaceLen >= leftLen) {
						charsLeft = leftLen - matchPos;

						// If the keypress char is white space then it should
						// not be replaced, only chars that are part of the
						// key should be replaced.
						this.selectOuterText(
							charsLeft,
							keywordLen - charsLeft -
							(/^\S/.test(keypressChar) ? 1 : 0)
						);

						this.insertHTML(keywords[keywordIdx][1]);
						return true;
					}
				}
			}

			return false;
		};

		/**
		 * Compares two ranges.
		 *
		 * If rangeB is undefined it will be set to
		 * the current selected range
		 *
		 * @param  {Range} rngA
		 * @param  {Range} [rngB]
		 * @return {boolean}
		 * @function
		 * @name compare
		 * @memberOf RangeHelper.prototype
		 */
		this.compare = function (rngA?: Range, rngB?: Range): boolean {
			if (!rngB) {
				rngB = this.selectedRange();
			}

			if (!rngA || !rngB) {
				return !rngA && !rngB;
			}

			return rngA.compareBoundaryPoints(Range.END_TO_END, rngB) === 0 &&
				rngA.compareBoundaryPoints(Range.START_TO_START, rngB) === 0;
		};

		/**
		 * Removes any current selection
		 *
		 * @since 1.4.6
		 * @function
		 * @name clear
		 * @memberOf RangeHelper.prototype
		 */
		this.clear = function () {
			var sel = win.getSelection();

			if (sel) {
				if (sel.removeAllRanges) {
					sel.removeAllRanges();
				} else if (sel.empty) {
					sel.empty();
				}
			}
		};

		/**
		 * Prepares HTML to be inserted by adding a zero width space
		 * if the last child is empty and adding the range start/end
		 * markers to the last child.
		 *
		 * @param  {Node|string} node
		 * @param  {Node|string} [endNode]
		 * @param  {boolean} [returnHtml]
		 * @return {Node|string}
		 * @private
		 */
		_prepareInput = (node: Node | string, endNode: HTMLElement | string, returnHtml?: boolean): Node | string => {
			var lastChild, frag = doc.createDocumentFragment();

			if (typeof node === 'string') {
				if (endNode) {
					node += this.selectedHtml() + endNode;
				}

				frag = dom.parseHTML(node);
			} else {
				let htmlNode = node as HTMLElement;
				dom.appendChild(frag, htmlNode);

				if (typeof endNode !== 'string' && endNode) {
					let extracted = this.selectedRange().extractContents();
					dom.appendChild(frag, extracted);
					dom.appendChild(frag, endNode);
				}
			}

			if (!(lastChild = frag.lastChild)) {
				return;
			}

			while (!dom.isInline(lastChild.lastChild, true)) {
				lastChild = lastChild.lastChild;
			}

			if (dom.canHaveChildren(lastChild)) {
				// Webkit won't allow the cursor to be placed inside an
				// empty tag, so add a zero width space to it.
				if (!lastChild.lastChild) {
					let txtNode = document.createTextNode('\u200B');
					dom.appendChild(lastChild, txtNode);
				}
			} else {
				lastChild = frag;
			}

			this.removeMarkers();

			// Append marks to last child so when restored cursor will be in
			// the right place
			dom.appendChild(lastChild, _createMarker(startMarker));
			dom.appendChild(lastChild, _createMarker(endMarker));

			if (returnHtml) {
				var div = dom.createElement('div');
				dom.appendChild(div, frag);

				return div.innerHTML;
			}

			return frag;
		};

		/**
		 * Creates a marker node
		 *
		 * @param {string} id
		 * @return {HTMLSpanElement}
		 * @private
		 */
		_createMarker = (id: string): HTMLSpanElement => {
			this.removeMarker(id);

			var marker = dom.createElement('span', {
				id: id,
				className: 'emleditor-selection emleditor-ignore',
				style: 'display:none;line-height:0'
			}, doc);

			marker.innerHTML = ' ';

			return marker;
		};
	}
}
