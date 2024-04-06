import * as dom from './dom';
import * as utils from './utils.js';
import * as escape from './escape.js';
import { RangeHelper } from './rangeHelper';

/**
 * Checks all emoticons are surrounded by whitespace and
 * replaces any that aren't with with their emoticon code.
 *
 * @param {HTMLElement} node
 * @param {rangeHelper} rangeHelper
 * @return {void}
 */
export function checkWhitespace(node: HTMLElement, rangeHelper: RangeHelper): void {
	let noneWsRegex = /[^\s\xA0\u2002\u2003\u2009]+/;
	let emoticons = node && dom.find(node, 'img[data-emleditor-emoticon]');

	if (!node || !emoticons.length) {
		return;
	}

	for (let i = 0; i < emoticons.length; i++) {
		let emoticon = emoticons[i] as HTMLElement;
		let parent = emoticon.parentNode as HTMLElement;
		let prev = emoticon.previousSibling as Element;
		let next = emoticon.nextSibling as CharacterData;

		if ((!prev || !noneWsRegex.test(prev.nodeValue.slice(-1))) &&
			(!next || !noneWsRegex.test((next.nodeValue || '')[0]))) {
			continue;
		}

		let range = rangeHelper.cloneSelected();
		let rangeStart = -1;
		let rangeStartContainer = range.startContainer;
		let previousText = (prev && prev.nodeValue) || '';

		previousText += dom.data(emoticon, 'emleditor-emoticon');

		// If the cursor is after the removed emoticon, add
		// the length of the newly added text to it
		if (rangeStartContainer === next) {
			rangeStart = previousText.length + range.startOffset;
		}

		// If the cursor is set before the next node, set it to
		// the end of the new text node
		if (rangeStartContainer === node &&
			node.childNodes[range.startOffset] === next) {
			rangeStart = previousText.length;
		}

		// If the cursor is set before the removed emoticon,
		// just keep it at that position
		if (rangeStartContainer === prev) {
			rangeStart = range.startOffset;
		}

		if (!next || next.nodeType !== dom.TEXT_NODE) {
			next = parent.insertBefore(
				parent.ownerDocument.createTextNode(''), next
			);
		}

		next.insertData(0, previousText);
		dom.remove(emoticon);
		if (prev) {
			dom.remove(prev);
		}

		// Need to update the range starting position if it's been modified
		if (rangeStart > -1) {
			range.setStart(next, rangeStart);
			range.collapse(true);
			rangeHelper.selectRange(range);
		}
	}
}

/**
 * Replaces any emoticons inside the root node with images.
 *
 * emoticons should be an object where the key is the emoticon
 * code and the value is the HTML to replace it with.
 *
 * @param {HTMLElement} root
 * @param {Object<string, string>} emoticons
 * @param {boolean} emoticonsCompat
 * @return {void}
 */
export function replace(root: HTMLElement, emoticons: string[], emoticonsCompat: boolean): void {
	let doc = root.ownerDocument;
	let space = '(^|\\s|\xA0|\u2002|\u2003|\u2009|$)';
	let emoticonCodes: Array<any> = [];
	let emoticonRegex: any = {};

	// TODO: Make this tag configurable.
	if (dom.parent(root, 'code')) {
		return;
	}

	utils.each(emoticons, function (key) {
		emoticonRegex[key] = new RegExp(space + escape.regex(key) + space);
		emoticonCodes.push(key);
	});

	// Sort keys longest to shortest so that longer keys
	// take precedence (avoids bugs with shorter keys partially
	// matching longer ones)
	emoticonCodes.sort(function (a: string, b: string) {
		return b.length - a.length;
	});

	(function convert(node: HTMLElement) {
		node = node.firstChild as HTMLElement;

		while (node) {
			// TODO: Make this tag configurable.
			if (node.nodeType === dom.ELEMENT_NODE && !dom.is(node, 'code')) {
				convert(node);
			}

			if (node.nodeType === dom.TEXT_NODE) {
				for (let i = 0; i < emoticonCodes.length; i++) {
					let text = node.nodeValue;
					let emoticonKey = emoticonCodes[i];
					let index = emoticonsCompat ?
						text.search(emoticonRegex[emoticonKey]) :
						text.indexOf(emoticonKey);

					if (index > -1) {
						// When emoticonsCompat is enabled this will be the
						// position after any white space
						let startIndex = text.indexOf(emoticonKey, index);
						let fragment = dom.parseHTML(emoticons[emoticonKey], doc);
						let after = text.substr(startIndex + emoticonKey.length);

						fragment.appendChild(doc.createTextNode(after));

						node.nodeValue = text.substr(0, startIndex);
						node.parentNode
							.insertBefore(fragment, node.nextSibling);
					}
				}
			}

			node = node.nextSibling as HTMLElement;
		}
	}(root));
}
