import * as utils from './utils';

function htmlElement(node: Node | ChildNode | ParentNode | Element): HTMLElement {
	return node as HTMLElement;
}

/**
 * Cache of camelCase CSS property names
 * @type {Object<string, string>}
 */
let cssPropertyNameCache: { [s: string]: string; } = {};

/**
 * Node type constant for element nodes
 *
 * @type {number}
 */
export const ELEMENT_NODE: number = 1;

/**
 * Node type constant for text nodes
 *
 * @type {number}
 */
export const TEXT_NODE: number = 3;

/**
 * Node type constant for comment nodes
 *
 * @type {number}
 */
export const COMMENT_NODE: number = 8;

/**
 * Node type document nodes
 *
 * @type {number}
 */
export const DOCUMENT_NODE: number = 9;

/**
 * Node type constant for document fragments
 *
 * @type {number}
 */
export const DOCUMENT_FRAGMENT_NODE: number = 11;

function toFloat(value: any): number {
	value = parseFloat(value);

	return isFinite(value) ? value : 0;
}

/**
 * Creates an element with the specified attributes
 *
 * Will create it in the current document unless context
 * is specified.
 *
 * @param {!string} tag
 * @param {!Object<string, string>} [attributes]
 * @param {!Document} [context]
 * @returns {!HTMLElement}
 */
export function createElement(tag: string, attributes?: { [s: string]: string; }, context?: Document): HTMLElement {
	let htmlElement = (context || document).createElement(tag);
	let attribs = attributes;

	utils.eachInObject(attribs || {}, function (key: keyof HTMLElement, value: string) {
		if (key == 'style') {
			htmlElement.style.cssText = value as string;
		}
		else if (key in htmlElement) {
			//@ts-expect-error
			htmlElement[key] = value;

		}
		else {
			htmlElement.setAttribute(key, value);
		}
	});

	return htmlElement;
}

/**
 * Returns an array of parents that matches the selector
 *
 * @param {!HTMLElement} node
 * @param {!string} [selector]
 * @returns {Array<HTMLElement>}
 */
export function parents(node: HTMLElement, selector: string): Array<HTMLElement> {
	let parents = [] as Array<HTMLElement>;
	let parent = node;

	while ((parent = htmlElement(parent.parentNode))
		&& !/(9|11)/.test(parent.nodeType.toString())) {
		if (!selector || is(parent, selector)) {
			parents.push(parent);
		}
	}

	return parents;
}

/**
 * Gets the first parent node that matches the selector
 *
 * @param {!HTMLElement} node
 * @param {!string} [selector]
 * @returns {HTMLElement|undefined}
 */
export function parent(node: HTMLElement, selector: string): HTMLElement | undefined {
	let parent = node;

	while ((parent = htmlElement(parent.parentNode))
		&& !/(9|11)/.test(parent.nodeType.toString())) {
		if (!selector || is(parent, selector)) {
			return parent;
		}
	}
	return undefined;
}

/**
 * Checks the passed node and all parents and
 * returns the first matching node if any.
 *
 * @param {!HTMLElement} node
 * @param {!string} selector
 * @returns {HTMLElement|undefined}
 */
export function closest(node: HTMLElement, selector: string): HTMLElement | undefined {
	if (!node) {
		return undefined;
	}
	let retElement = is(node, selector) ? node : parent(node, selector);
	return retElement;
}

/**
 * Removes the node from the DOM
 *
 * @param {!HTMLElement} node
 */
export function remove(node: Node): void {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * Appends child to parent node
 *
 * @param {!HTMLElement | DocumentFragment} node
 * @param {Node | HTMLElement | string | null } child
 */
export function appendChild(node: HTMLElement | DocumentFragment, child: HTMLElement | DocumentFragment | Text) {
	node.appendChild(child);
}

/**
 * Finds any child nodes that match the selector
 *
 * @param {!HTMLElement | Document} node
 * @param {!string} selector
 * @returns {NodeList}
 */
export function find(node: HTMLElement | Document, selector: string): NodeList {
	return node.querySelectorAll(selector);
}

/**
 * For on() and off() if to add/remove the event
 * to the capture phase
 *
 * @type {boolean}
 */
export let EVENT_CAPTURE: boolean = true;

/**
 * For on() and off() if to add/remove the event
 * to the bubble phase
 *
 * @type {boolean}
 */
export let EVENT_BUBBLE: boolean = false;

/**
 * Adds an event listener for the specified events.
 *
 * Events should be a space separated list of events.
 *
 * If selector is specified the handler will only be
 * called when the event target matches the selector.
 *
 * @param {!Node | HTMLElement | Window} node
 * @param {string} events
 * @param {string} [selector]
 * @param {(p?: any) => void}
 * @param {boolean} [capture=false]
 * @see off()
 */
// eslint-disable-next-line max-params
export function on(node: (Window & typeof globalThis) | Document | HTMLElement,
	events: string,
	selector: string,
	fn: (p?: any) => void,
	capture: boolean = false): void {
	events.split(' ').forEach(function (event) {

		let handler: ((p?: any) => void) | ((ev: Event) => void);

		if (utils.isString(selector)) {
			let key = ('_eml-event-' + event + selector);
			handler = fn[key as keyof typeof fn] || function (ev: Event) {
				let element = ev.target as HTMLElement;
				while (element && element !== node) {
					if (is(element, selector)) {
						fn.call(element, ev);
						return;
					}
					element = htmlElement(element.parentNode);
				}
			};

			fn[key as keyof typeof fn] = handler;
		}
		else {
			handler = fn;
		}

		node.addEventListener(event, handler, capture || false);
	});
}

/**
 * Removes an event listener for the specified events.
 *
 * @param {!Node | HTMLElement | Window} node
 * @param {string} events
 * @param {string} [selector]
 * @param {function(Object)} fn
 * @param {boolean} [capture=false]
 * @see on()
 */
// eslint-disable-next-line max-params
export function off(
	node: Node | HTMLElement | Window,
	events: string,
	selector: string,
	fn: (p?: any) => void,
	capture: boolean = false): void {
	events.split(' ').forEach(function (event) {
		let handler: (p?: any) => void = undefined;

		if (utils.isString(selector)) {
			let key = '_eml-event-' + event + selector;
			handler = fn[key as keyof typeof fn];
		} else {
			handler = fn;
		}

		node.removeEventListener(event, handler, capture || false);
	});
}

/**
 * If only attr param is specified it will get
 * the value of the attr param.
 *
 * If value is specified but null the attribute
 * will be removed otherwise the attr value will
 * be set to the passed value.
 *
 * @param {!HTMLElement} node
 * @param {!string} attr
 * @param {?string} [value]
 * @return {string | undefined}
 */
export function attr(node: HTMLElement, attr: string, value?: string): string | undefined {
	if (arguments.length < 3) {
		return node.getAttribute(attr);
	}

	// eslint-disable-next-line eqeqeq, no-eq-null
	if (!value) {
		removeAttr(node, attr);
	} else {
		node.setAttribute(attr, value);
	}

	return undefined;
}

/**
 * Removes the specified attribute
 *
 * @param {!HTMLElement} node
 * @param {!string} attr
 */
export function removeAttr(node: HTMLElement, attr: string): void {
	node.removeAttribute(attr);
}

/**
 * Sets the passed elements display to none
 *
 * @param {!HTMLElement} node
 */
export function hide(node: HTMLElement): void {
	css(node, 'display', 'none');
}

/**
 * Sets the passed elements display to default
 *
 * @param {!HTMLElement} node
 */
export function show(node: HTMLElement): void {
	css(node, 'display', '');
}

/**
 * Toggles an elements visibility
 *
 * @param {!HTMLElement} node
 */
export function toggle(node: HTMLElement): void {
	if (isVisible(node)) {
		hide(node);
	} else {
		show(node);
	}
}

/**
 * Gets a computed CSS values or sets an inline CSS value
 *
 * Rules should be in camelCase format and not
 * hyphenated like CSS properties.
 *
 * @param {HTMLElement} element
 * @param {string | {}} rule
 * @param {string | number | boolean} [value]
 * @return {string | null}
 */
export function css(element: HTMLElement, rule: string | {}, value?: string | number | boolean): string | null {
	let retVal = null;
	if (value === undefined) {
		if (utils.isString(rule)) {
			return element.nodeType === 1 ? getComputedStyle(element).getPropertyValue(rule as string) : null;
		}
		utils.eachInObject(rule, (objKey, objValue) => {
			css(element, objKey, objValue);
		});
	} else {
		if (typeof rule === 'string') {
			let isValueNumeric: boolean = typeof value === 'number';
			let isValueOther: boolean = (typeof value === 'string' || typeof value === 'boolean');
			if (isValueNumeric)
				element.style.setProperty(rule, value.toString() + 'px');
			if (isValueOther)
				element.style.setProperty(rule, value.toString());
		}
	}
	return retVal;
}


/**
 * Gets or sets the data attributes on a node
 *
 * Only strings can be stored.
 *
 * @param {HTMLElement} node
 * @param {string} [key]
 * @param {string} [value]
 * @return {string|undefined}
 */

export function data(node: HTMLElement, key?: string, value?: string): string | undefined {
	let argsLength = arguments.length;
	let data: any = {};

	if (node.nodeType === ELEMENT_NODE) {
		if (argsLength === 1) {
			let nodeAttributes: NamedNodeMap = node.attributes;
			utils.eachInObject(nodeAttributes, (_, attr: Attr) => {
				if (/^data-/i.test(attr.name)) {
					let idx = attr.name.substring(5) as keyof typeof data;
					data[idx] = attr.value;
				}
			});
			return data;
		}

		if (argsLength === 2) {
			return attr(node, 'data-' + key);
		}

		attr(node, 'data-' + key, String(value));
	}
}

/**
 * Checks if node matches the given selector.
 *
 * @param {?HTMLElement | ChildNode} node
 * @param {string} selector
 * @returns {boolean}
 */
export function is(node: HTMLElement, selector: string): boolean {
	let result = false;

	if (node && node.nodeType === ELEMENT_NODE) {
		result = (node.matches).call(node, selector);
	}

	return result;
}


/**
 * Returns true if node contains child otherwise false.
 *
 * This differs from the DOM contains() method in that
 * if node and child are equal this will return false.
 *
 * @param {!Node} node
 * @param {HTMLElement} child
 * @returns {boolean}
 */
export function contains(node: Node, child: HTMLElement): boolean {
	return node !== child && node.contains && node.contains(child);
}

/**
 * @param {Element} node
 * @param {string} [selector]
 * @returns {?HTMLElement}
 */
export function previousElementSibling(node: HTMLElement, selector?: string): HTMLElement | null {
	let prev = htmlElement(node.previousElementSibling);

	if (selector && prev) {
		return is(prev, selector) ? prev : null;
	}

	return prev;
}

/**
 * @param {!Node} node
 * @param {!Node} refNode
 * @returns {Node}
 */
export function insertBefore(node: HTMLElement | DocumentFragment, refNode: Element): HTMLElement | DocumentFragment {
	let retVal: HTMLElement | DocumentFragment = refNode.parentNode.insertBefore(node, refNode);
	return retVal;
}

/**
 * @param {?HTMLElement} node
 * @returns {!Array.<string>}
 */
function classes(node?: HTMLElement): string[] {
	const retValue = node?.className.trim().split(/\s+/);
	return retValue;
}

/**
 * @param {?HTMLElement} node
 * @param {string} className
 * @returns {boolean}
 */
export function hasClass(node?: HTMLElement, className?: string): boolean {
	return is(node, '.' + className);
}

/**
 * @param {!HTMLElement} node
 * @param {string} className
 */
export function addClass(node: HTMLElement, className: string): void {
	let classList = classes(node);

	if (classList.indexOf(className) < 0) {
		classList.push(className);
	}

	node.className = classList.join(' ');
}

/**
 * @param {!HTMLElement} node
 * @param {string} className
 */
export function removeClass(node: HTMLElement, className: string): void {
	let classList = classes(node);

	utils.arrayRemove(classList, className);

	node.className = classList.join(' ');
}

/**
 * Toggles a class on node.
 *
 * If state is specified and is truthy it will add
 * the class.
 *
 * If state is specified and is falsey it will remove
 * the class.
 *
 * @param {HTMLElement} node
 * @param {string} className
 * @param {boolean} [state]
 */
export function toggleClass(node: HTMLElement, className: string, state?: boolean): void {
	state = utils.isUndefined(state) ? !hasClass(node, className) : state;

	if (state) {
		addClass(node, className);
	} else {
		removeClass(node, className);
	}
}

/**
 * Gets or sets the width of the passed node.
 *
 * @param {HTMLElement} node
 * @param {number|string} [value]
 * @returns {number|undefined}
 */
export function width(node: HTMLElement, value?: number | string): number | undefined {
	if (utils.isUndefined(value)) {
		let cs = getComputedStyle(node);
		let padding = toFloat(cs.paddingLeft) + toFloat(cs.paddingRight);
		let border = toFloat(cs.borderLeftWidth) + toFloat(cs.borderRightWidth);

		return node.offsetWidth - padding - border;
	}

	css(node, 'width', value);
}

/**
 * Gets or sets the height of the passed node.
 *
 * @param {HTMLElement} node
 * @param {number|string} [value]
 * @returns {number|undefined}
 */
export function height(node: HTMLElement, value?: number | string): number | undefined {
	if (utils.isUndefined(value)) {
		let cs = getComputedStyle(node);
		let padding = toFloat(cs.paddingTop) + toFloat(cs.paddingBottom);
		let border = toFloat(cs.borderTopWidth) + toFloat(cs.borderBottomWidth);

		return node.offsetHeight - padding - border;
	}

	css(node, 'height', value);
}

/**
 * Triggers a custom event with the specified name and
 * sets the detail property to the data object passed.
 *
 * @param {HTMLElement} node
 * @param {string} eventName
 * @param {Object} [data]
 */
export function trigger(node: HTMLElement, eventName: string, data?: {}): void {
	let event;
	/*
	if (utils.isFunction(window.CustomEvent)) {
		event = new CustomEvent(eventName, {
			bubbles: true,
			cancelable: true,
			detail: data
		});
	} else {
		event = node.ownerDocument.createEvent('CustomEvent');
		event.initCustomEvent(eventName, true, true, data);
	}
	*/
	event = new CustomEvent(eventName, { bubbles: true, cancelable: true, detail: data });
	node.dispatchEvent(event);
}

/**
 * Returns if a node is visible.
 *
 * @param {HTMLElement}
 * @returns {boolean}
 */
export function isVisible(node: HTMLElement): boolean {
	return !!node.getClientRects().length;
}

/**
 * Convert CSS property names into camel case
 *
 * @param {string} string
 * @returns {string}
 */
function camelCase(str: string): string {
	return str
		.replace(/^-ms-/, 'ms-')
		.replace(/-(\w)/g, function (match, char) {
			return char.toUpperCase();
		});
}


/**
 * Loop all child nodes of the passed node
 *
 * The function should accept 1 parameter being the node.
 * If the function returns false the loop will be exited.
 *
 * @param  {HTMLElement} node
 * @param  {function} func           Callback which is called with every
 *                                   child node as the first argument.
 * @param  {boolean} innermostFirst  If the innermost node should be passed
 *                                   to the function before it's parents.
 * @param  {boolean} siblingsOnly    If to only traverse the nodes siblings
 * @param  {boolean} [reverse=false] If to traverse the nodes in reverse
 */
// eslint-disable-next-line max-params
export function traverse(node: HTMLElement, func: (node: HTMLElement) => boolean | void, innermostFirst?: boolean, siblingsOnly?: boolean, reverse: boolean = false): boolean {
	node = reverse ? htmlElement(node.lastChild) : htmlElement(node.firstChild);
	while (node) {
		let next = reverse ? node.previousSibling : node.nextSibling;

		if (
			(!innermostFirst && func(node) === false) ||
			(!siblingsOnly && traverse(
				node, func, innermostFirst, siblingsOnly, reverse
			) === false) ||
			(innermostFirst && func(node) === false)
		) {
			return false;
		}

		node = htmlElement(next);
	}

	return true;


}

/**
 * Like traverse but loops in reverse
 * @see traverse
 */
export function rTraverse(node: HTMLElement, func: (node: HTMLElement) => boolean | void, innermostFirst?: boolean, siblingsOnly?: boolean): void {
	traverse(node, func, innermostFirst, siblingsOnly, true);
}

/**
 * Parses HTML into a document fragment
 *
 * @param {string} html
 * @param {Document} [context]
 * @since 1.4.4
 * @return {DocumentFragment}
 */
export function parseHTML(html: string, context?: Document): DocumentFragment {
	context = context || document;

	let documentFragment = context.createDocumentFragment();
	let tmp: HTMLElement = createElement('div', {}, context);

	tmp.innerHTML = html;


	while (htmlElement(tmp.firstChild)) {
		appendChild(documentFragment, htmlElement(tmp.firstChild));
	}

	return documentFragment;
}

/**
 * Checks if an element has any styling.
 *
 * It has styling if it is not a plain <div> or <p> or
 * if it has a class, style attribute or data.
 *
 * @param  {HTMLElement} node
 * @return {boolean}
 * @since 1.4.4
 */
export function hasStyling(node: HTMLElement): boolean {
	return node && (!is(node, 'p,div') || node.className?.length > 0 ||
		(attr(node, 'style')?.length > 0) || utils.isString(data(node)));
}

/**
 * Converts an element from one type to another.
 *
 * For example it can convert the element <b> to <strong>
 *
 * @param  {HTMLElement} element
 * @param  {string}      toTagName
 * @return {HTMLElement}
 * @since 1.4.4
 */
export function convertElement(element: HTMLElement, toTagName: string): HTMLElement {
	let newElement = createElement(toTagName, {}, element.ownerDocument);

	utils.eachInObject(element.attributes as NamedNodeMap, function (_, attribute) {
		// Some browsers parse invalid attributes names like
		// 'size"2' which throw an exception when set, just
		// ignore these.
		try {
			attr(newElement, attribute.name, attribute.value);
		} catch (ex) { /* empty */ }
	});


	while (htmlElement(element.firstChild)) {
		appendChild(newElement, htmlElement(element.firstChild));
	}

	element.parentNode.replaceChild(newElement, element);

	return newElement;
}

/**
 * List of block level elements separated by bars (|)
 *
 * @type {string}
 */
export const blockLevelList: string = '|body|hr|p|div|h1|h2|h3|h4|h5|h6|address|pre|' +
	'form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|blockquote|center|' +
	'details|section|article|aside|nav|main|header|hgroup|footer|fieldset|' +
	'dl|dt|dd|figure|figcaption|';

/**
 * List of elements that do not allow children separated by bars (|)
 *
 * @param {Node} node
 * @return {boolean}
 * @since  1.4.5
 */
export function canHaveChildren(node: Element | Document | DocumentFragment | HTMLElement): boolean {
	// 1  = Element
	// 9  = Document
	// 11 = Document Fragment
	if (!/11?|9/.test(node.nodeType.toString())) {
		return false;
	}

	// List of empty HTML tags separated by bar (|) character.
	// Source: http://www.w3.org/TR/html4/index/elements.html
	// Source: http://www.w3.org/TR/html5/syntax.html#void-elements
	return ('|iframe|area|base|basefont|br|col|frame|hr|img|input|wbr' +
		'|isindex|link|meta|param|command|embed|keygen|source|track|' +
		'object|').indexOf('|' + node.nodeName.toLowerCase() + '|') < 0;
}

/**
 * Checks if an element is inline
 *
 * @param {Node} elm
 * @param {boolean} [includeCodeAsBlock=false]
 * @return {boolean}
 */
export function isInline(elm: Node, includeCodeAsBlock: boolean = false): boolean {
	let tagName: string = undefined;
	let nodeType: number = (elm || {}).nodeType || TEXT_NODE;

	if (nodeType !== ELEMENT_NODE) {
		return nodeType === TEXT_NODE;
	}

	tagName = htmlElement(elm).tagName.toLowerCase();

	if (tagName === 'code') {
		return !includeCodeAsBlock;
	}

	return blockLevelList.indexOf('|' + tagName + '|') < 0;
}

/**
 * Copy the CSS from 1 node to another.
 *
 * Only copies CSS defined on the element e.g. style attr.
 *
 * @param {HTMLElement} from
 * @param {HTMLElement} to
 * @deprecated since v3.1.0
 */
export function copyCSS(from: HTMLElement, to: HTMLElement): void {
	if (to.style && from.style) {
		to.style.cssText = from.style.cssText + to.style.cssText;
	}
}

/**
 * Checks if a DOM node is empty
 *
 * @param {Node} node
 * @returns {boolean}
 */
export function isEmpty(node: HTMLElement | DocumentFragment): boolean {
	let lastChild = htmlElement(node.lastChild);
	if (lastChild && isEmpty(lastChild)) {
		remove(lastChild);
	}

	return node.nodeType === 3 ? !node.nodeValue :
		(canHaveChildren(node) && !node.childNodes.length);
}

/**
 * Fixes block level elements inside in inline elements.
 *
 * Also fixes invalid list nesting by placing nested lists
 * inside the previous li tag or wrapping them in an li tag.
 *
 * @param {HTMLElement} node
 */
export function fixNesting(node: HTMLElement): void {
	traverse(node, function (node) {
		let list = 'ul,ol';
		let isBlock = !isInline(node, true) && node.nodeType !== COMMENT_NODE;
		let parent = htmlElement(node.parentNode);

		// Any blocklevel element inside an inline element needs fixing.
		// Also <p> tags that contain blocks should be fixed
		if (isBlock && (isInline(parent, true) || parent.tagName === 'P')) {
			// Find the last inline parent node
			let lastInlineParent = htmlElement(node);

			while (isInline(htmlElement(lastInlineParent.parentNode), true) ||
				(htmlElement(lastInlineParent.parentNode)).tagName === 'P') {
				lastInlineParent = htmlElement(lastInlineParent.parentNode);
			}

			let before = extractContents(lastInlineParent, node);
			let middle = htmlElement(node);

			// Clone inline styling and apply it to the blocks children
			while (parent && isInline(parent, true)) {
				if (parent.nodeType === ELEMENT_NODE) {
					let clone = parent.cloneNode();
					while ((middle.firstChild)) {
						appendChild(htmlElement(clone), htmlElement(middle.firstChild));
					}

					appendChild(middle, htmlElement(clone));
				}
				parent = htmlElement(parent.parentNode);
			}

			insertBefore(middle, lastInlineParent);
			if (!isEmpty(before)) {
				insertBefore(before, middle);
			}
			if (isEmpty(lastInlineParent)) {
				remove(lastInlineParent);
			}
		}

		// Fix invalid nested lists which should be wrapped in an li tag
		let nodeParentNode = htmlElement(node.parentNode);
		if (isBlock && is(node, list) && is(nodeParentNode, list)) {
			let li = previousElementSibling(node, 'li');

			if (!li) {
				li = createElement('li');
				insertBefore(li, node);
			}

			appendChild(li, node);
		}
	});
}

/**
 * Finds the common parent of two nodes
 *
 * @param {!HTMLElement} node1
 * @param {!HTMLElement} node2
 * @return {?HTMLElement}
 */
export function findCommonAncestor(node1: HTMLElement, node2: HTMLElement): HTMLElement | null {
	while ((node1 = htmlElement(node1.parentNode))) {
		if (contains(node1, node2)) {
			return node1;
		}
	}
	return null;
}

/**
 * @param {?Node}
 * @param {boolean} [previous=false]
 * @returns {?Node}
 */
export function getSibling(node?: HTMLElement, previous: boolean = false): HTMLElement | null {
	if (!node) {
		return null;
	}

	let sibling = (previous ? node.previousSibling : node.nextSibling) || getSibling(htmlElement(node.parentNode), previous);
	return htmlElement(sibling);
}

/**
 * Removes unused whitespace from the root and all it's children.
 *
 * @param {!HTMLElement} root
 * @since 1.4.3
 */
export function removeWhiteSpace(root: HTMLElement): void {
	let nodeValue: string;
	let nodeType: number;
	let next: HTMLElement;
	let previous: HTMLElement;
	let previousSibling: HTMLElement;
	let nextNode: HTMLElement;
	let trimStart: boolean;
	let cssWhiteSpace = css(root, 'whiteSpace');
	// Preserve newlines if is pre-line
	let preserveNewLines = /line$/i.test(cssWhiteSpace);
	let node = htmlElement(root.firstChild);

	// Skip pre & pre-wrap with any vendor prefix
	if (/pre(-wrap)?$/i.test(cssWhiteSpace)) {
		return;
	}

	while (node) {
		nextNode = htmlElement(node.nextSibling);
		nodeValue = node.nodeValue;
		nodeType = node.nodeType;

		if (nodeType === ELEMENT_NODE && node.firstChild) {
			removeWhiteSpace(node);
		}

		if (nodeType === TEXT_NODE) {
			next = getSibling(node);
			previous = getSibling(node, true);
			trimStart = false;

			while (hasClass(previous, 'emleditor-ignore')) {
				previous = getSibling(previous, true);
			}

			// If previous sibling isn't inline or is a textnode that
			// ends in whitespace, time the start whitespace
			if (isInline(node) && previous) {
				previousSibling = previous;

				while (previousSibling.lastChild) {
					previousSibling = htmlElement(previousSibling.lastChild);

					// eslint-disable-next-line max-depth
					while (hasClass(previousSibling, 'emleditor-ignore')) {
						previousSibling = getSibling(previousSibling, true);
					}
				}

				trimStart = previousSibling.nodeType === TEXT_NODE ?
					/[\t\n\r ]$/.test(previousSibling.nodeValue) :
					!isInline(previousSibling);
			}

			// Clear zero width spaces
			nodeValue = nodeValue.replace(/\u200B/g, '');

			// Strip leading whitespace
			if (!previous || !isInline(previous) || trimStart) {
				nodeValue = nodeValue.replace(
					preserveNewLines ? /^[\t ]+/ : /^[\t\n\r ]+/,
					''
				);
			}

			// Strip trailing whitespace
			if (!next || !isInline(next)) {
				nodeValue = nodeValue.replace(
					preserveNewLines ? /[\t ]+$/ : /[\t\n\r ]+$/,
					''
				);
			}

			// Remove empty text nodes
			if (!nodeValue.length) {
				remove(node);
			} else {
				node.nodeValue = nodeValue.replace(
					preserveNewLines ? /[\t ]+/g : /[\t\n\r ]+/g,
					' '
				);
			}
		}

		node = nextNode;
	}
}

/**
 * Extracts all the nodes between the start and end nodes
 *
 * @param {HTMLElement} startNode	The node to start extracting at
 * @param {HTMLElement} endNode		The node to stop extracting at
 * @return {DocumentFragment}
 */
export function extractContents(startNode: HTMLElement, endNode: HTMLElement): DocumentFragment {
	let range: Range = startNode.ownerDocument.createRange();

	range.setStartBefore(startNode);
	range.setEndAfter(endNode);

	return range.extractContents();
}

/**
 * Gets the offset position of an element
 *
 * @param  {HTMLElement} node
 * @return {Object} An object with left and top properties
 */
export function getOffset(node: HTMLElement): { left: number, top: number } {
	let left = 0;
	let top = 0;

	while (node) {
		left += node.offsetLeft;
		top += node.offsetTop;
		node = htmlElement(node.offsetParent);
	}

	return {
		left: left,
		top: top
	};
}

/**
 * Gets the value of a CSS property from the elements style attribute
 *
 * @param  {HTMLElement} elm
 * @param  {string} property
 * @return {string}
 */
export function getStyle(elm: HTMLElement, property: string): string {
	let styleValue: string;
	let elmStyle = elm.style;

	if (!cssPropertyNameCache[property]) {
		cssPropertyNameCache[property] = camelCase(property);
	}

	property = cssPropertyNameCache[property];
	styleValue = elmStyle.getPropertyValue(property);

	// Add an exception for text-align
	if ('textAlign' === property) {
		styleValue = styleValue || css(elm, property);

		if (css(htmlElement(elm.parentNode), property) === styleValue ||
			css(elm, 'display') !== 'block' || is(elm, 'hr,th')) {
			return '';
		}
	}

	return styleValue;
}

/**
 * Tests if an element has a style.
 *
 * If values are specified it will check that the styles value
 * matches one of the values
 *
 * @param  {HTMLElement} elm
 * @param  {string} property
 * @param  {string|array} [values]
 * @return {boolean}
 */
export function hasStyle(elm: HTMLElement, property: string, values?: string | Array<any>): boolean {
	let styleValue = getStyle(elm, property);

	if (!styleValue) {
		return false;
	}

	return !values || styleValue === values ||
		(Array.isArray(values) && values.indexOf(styleValue) > -1);
}

/**
 * Returns true if both nodes have the same number of inline styles and all the
 * inline styles have matching values
 *
 * @param {HTMLElement} nodeA
 * @param {HTMLElement} nodeB
 * @returns {boolean}
 */
function stylesMatch(nodeA: HTMLElement, nodeB: HTMLElement): boolean {
	let i = nodeA.style.length;
	if (i !== nodeB.style.length) {
		return false;
	}

	while (i--) {
		let prop: string = nodeA.style[i];
		if (nodeA.style.getPropertyValue(prop) !== nodeB.style.getPropertyValue(prop)) {
			return false;
		}
	}

	return true;
}

/**
 * Returns true if both nodes have the same number of attributes and all the
 * attribute values match
 *
 * @param {HTMLElement} nodeA
 * @param {HTMLElement} nodeB
 * @returns {boolean}
 */
function attributesMatch(nodeA: HTMLElement, nodeB: HTMLElement): boolean {
	let i = nodeA.attributes.length;
	if (i !== nodeB.attributes.length) {
		return false;
	}

	while (i--) {
		let prop = nodeA.attributes[i];
		let notMatches = prop.name === 'style' ?
			!stylesMatch(nodeA, nodeB) :
			prop.value !== attr(nodeB, prop.name);

		if (notMatches) {
			return false;
		}
	}

	return true;
}

/**
 * Removes an element placing its children in its place
 *
 * @param {HTMLElement} node
 */
function removeKeepChildren(node: HTMLElement): void {

	while ((node.firstChild as HTMLElement | DocumentFragment)) {
		insertBefore((node.firstChild as HTMLElement | DocumentFragment), node);
	}

	remove(node);
}

/**
 * Merges inline styles and tags with parents where possible
 *
 * @param {HTMLElement} node
 * @since 3.1.0
 */
export function merge(node: HTMLElement): void {
	if (node.nodeType !== ELEMENT_NODE) {
		return;
	}

	let parent = htmlElement(node.parentNode);
	let tagName = htmlElement(node).tagName;
	const mergeTags = /B|STRONG|EM|SPAN|FONT/;

	// Merge children (in reverse as children can be removed)
	let i = node.childNodes.length;
	while (i--) {
		merge(htmlElement(node.childNodes[i]));
	}

	// Should only merge inline tags and should not merge <br> tags
	if (!isInline(node) || tagName === 'BR') {
		return;
	}

	// Remove any inline styles that match the parent style
	i = node.style.length;
	while (i--) {
		let prop = node.style[i];
		if (css(parent, prop) === css(node, prop)) {
			node.style.removeProperty(prop);
		}
	}

	// Can only remove / merge tags if no inline styling left.
	// If there is any inline style left then it means it at least partially
	// doesn't match the parent style so must stay
	if (!node.style.length) {
		removeAttr(node, 'style');

		// Remove font attributes if match parent
		if (tagName === 'FONT') {
			if (css(node, 'fontFamily').toLowerCase() ===
				css(parent, 'fontFamily').toLowerCase()) {
				removeAttr(node, 'face');
			}

			if (css(node, 'color') === css(parent, 'color')) {
				removeAttr(node, 'color');
			}

			if (css(node, 'fontSize') === css(parent, 'fontSize')) {
				removeAttr(node, 'size');
			}
		}

		// Spans and font tags with no attributes can be safely removed
		if (!node.attributes.length && /SPAN|FONT/.test(tagName)) {
			removeKeepChildren(node);
		} else if (mergeTags.test(tagName)) {
			let isBold = /B|STRONG/.test(tagName);
			let isItalic = tagName === 'EM';

			while (parent && isInline(parent) &&
				(!isBold || /bold|700/i.test(css(parent, 'fontWeight'))) &&
				(!isItalic || css(parent, 'fontStyle') === 'italic')) {

				// Remove if parent match
				if ((parent.tagName === tagName ||
					(isBold && /B|STRONG/.test(parent.tagName))) &&
					attributesMatch(parent, node)) {
					removeKeepChildren(node);
					break;
				}

				parent = htmlElement(parent.parentNode);
			}
		}
	}

	// Merge siblings if attributes, including inline styles, match
	let next = htmlElement(node.nextSibling);
	if (next && next.tagName === tagName && attributesMatch(next, node)) {
		appendChild(node, next);
		removeKeepChildren(next);
	}
}
