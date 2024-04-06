/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dompurify/dist/purify.js":
/*!***********************************************!*\
  !*** ./node_modules/dompurify/dist/purify.js ***!
  \***********************************************/
/***/ (function(module) {

/*! @license DOMPurify 3.0.9 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.9/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  const {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  let {
    freeze,
    seal,
    create
  } = Object; // eslint-disable-line import/no-mutable-exports
  let {
    apply,
    construct
  } = typeof Reflect !== 'undefined' && Reflect;
  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }
  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }
  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }
  if (!construct) {
    construct = function construct(Func, args) {
      return new Func(...args);
    };
  }
  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);

  /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param {Function} func - The function to be wrapped and called.
   * @returns {Function} A new function that calls the given function with a specified thisArg and arguments.
   */
  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return apply(func, thisArg, args);
    };
  }

  /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param {Function} func - The constructor function to be wrapped and called.
   * @returns {Function} A new function that constructs an instance of the given constructor function with the provided arguments.
   */
  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return construct(func, args);
    };
  }

  /**
   * Add properties to a lookup table
   *
   * @param {Object} set - The set to which elements will be added.
   * @param {Array} array - The array containing elements to be added to the set.
   * @param {Function} transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns {Object} The modified set with added elements.
   */
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === 'string') {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }

  /**
   * Clean up an array to harden against CSPP
   *
   * @param {Array} array - The array to be cleaned.
   * @returns {Array} The cleaned version of the array
   */
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }

  /**
   * Shallow clone an object
   *
   * @param {Object} object - The object to be cloned.
   * @returns {Object} A new object that copies the original.
   */
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === 'object' && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }

  /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param {Object} object - The object to look up the getter function in its prototype chain.
   * @param {String} prop - The property name for which to find the getter function.
   * @returns {Function} The getter function found in the prototype chain or a fallback function.
   */
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }

  const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);

  // SVG
  const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);

  // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.
  const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);

  // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.
  const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  const text = freeze(['#text']);

  const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
  const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  // eslint-disable-next-line unicorn/better-regex
  const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode
  const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape
  const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
  const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );

  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );

  const DOCTYPE_NAME = seal(/^html$/i);

  var EXPRESSIONS = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: MUSTACHE_EXPR,
    ERB_EXPR: ERB_EXPR,
    TMPLIT_EXPR: TMPLIT_EXPR,
    DATA_ATTR: DATA_ATTR,
    ARIA_ATTR: ARIA_ATTR,
    IS_ALLOWED_URI: IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE: ATTR_WHITESPACE,
    DOCTYPE_NAME: DOCTYPE_NAME
  });

  const getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };

  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {HTMLScriptElement} purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return {TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */
  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    }

    // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.
    let suffix = null;
    const ATTR_NAME = 'data-tt-policy-suffix';
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html) {
          return html;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };
  function createDOMPurify() {
    let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
    const DOMPurify = root => createDOMPurify(root);

    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */
    DOMPurify.version = '3.0.9';

    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */
    DOMPurify.removed = [];
    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document
    } = window;
    const originalDocument = document;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element,
      NodeFilter,
      NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    const getParentNode = lookupGetter(ElementPrototype, 'parentNode');

    // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.
    if (typeof HTMLTemplateElement === 'function') {
      const template = document.createElement('template');
      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = '';
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document;
    const {
      importNode
    } = originalDocument;
    let hooks = {};

    /**
     * Expose whether this browser supports running the full DOMPurify.
     */
    DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
    const {
      MUSTACHE_EXPR,
      ERB_EXPR,
      TMPLIT_EXPR,
      DATA_ATTR,
      ARIA_ATTR,
      IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;

    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);

    /* Allowed attribute names */
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);

    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));

    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
    let FORBID_TAGS = null;

    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
    let FORBID_ATTR = null;

    /* Decide if ARIA attributes are okay */
    let ALLOW_ARIA_ATTR = true;

    /* Decide if custom data attributes are okay */
    let ALLOW_DATA_ATTR = true;

    /* Decide if unknown protocols are okay */
    let ALLOW_UNKNOWN_PROTOCOLS = false;

    /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */
    let ALLOW_SELF_CLOSE_IN_ATTR = true;

    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */
    let SAFE_FOR_TEMPLATES = false;

    /* Decide if document with <html>... should be returned */
    let WHOLE_DOCUMENT = false;

    /* Track whether config is already set on this instance of DOMPurify. */
    let SET_CONFIG = false;

    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */
    let FORCE_BODY = false;

    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */
    let RETURN_DOM = false;

    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */
    let RETURN_DOM_FRAGMENT = false;

    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */
    let RETURN_TRUSTED_TYPE = false;

    /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */
    let SANITIZE_DOM = true;

    /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';

    /* Keep element content when removing element? */
    let KEEP_CONTENT = true;

    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */
    let IN_PLACE = false;

    /* Allow usage of profiles like html, svg and mathMl */
    let USE_PROFILES = {};

    /* Tags to ignore content of when KEEP_CONTENT is true */
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);

    /* Tags that are safe for data: URIs */
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);

    /* Attributes safe for values like "javascript:" */
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;

    /* Allowed XHTML+XML namespaces */
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);

    /* Parsing of strict XHTML documents */
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    let transformCaseFunc = null;

    /* Keep a reference to config to pass to hooks */
    let CONFIG = null;

    /* Ideally, do not touch anything below this line */
    /* ______________________________________________ */

    const formElement = document.createElement('form');
    const isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };

    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity
    const _parseConfig = function _parseConfig() {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }

      /* Shield configuration object from tampering */
      if (!cfg || typeof cfg !== 'object') {
        cfg = {};
      }

      /* Shield configuration object from prototype pollution */
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE =
      // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;

      // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;

      /* Set configuration parameters */
      ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES),
      // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') ? addToSet(clone(DEFAULT_DATA_URI_TAGS),
      // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
      RETURN_DOM = cfg.RETURN_DOM || false; // Default false
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
      FORCE_BODY = cfg.FORCE_BODY || false; // Default false
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
      IN_PLACE = cfg.IN_PLACE || false; // Default false
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }

      /* Parse profile info */
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }

      /* Merge configuration parameters */
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }

      /* Add #text in case KEEP_CONTENT is set to true */
      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }

      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }

      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }

        // Overwrite existing TrustedTypes policy.
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;

        // Sign local variables required by `sanitize`.
        emptyHTML = trustedTypesPolicy.createHTML('');
      } else {
        // Uninitialized policy, attempt to initialize the internal dompurify policy.
        if (trustedTypesPolicy === undefined) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }

        // If creating the internal policy succeeded sign internal variables.
        if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
          emptyHTML = trustedTypesPolicy.createHTML('');
        }
      }

      // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    const HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']);

    // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);

    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);

    /**
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */
    const _checkValidNamespace = function _checkValidNamespace(element) {
      let parent = getParentNode(element);

      // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: 'template'
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        }

        // The only way to switch from MathML to SVG is via`
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }

        // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        }

        // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        }

        // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }

      // For XHTML and XML documents that support custom namespaces
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }

      // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
      // Return false just in case.
      return false;
    };

    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */
    const _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        node.remove();
      }
    };

    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */
    const _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }
      node.removeAttribute(name);

      // We void attribute values for unremovable "is"" attributes
      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };

    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */
    const _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }

      /* Use createHTMLDocument in case DOMParser is not available */
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {
          // Syntax error if dirtyPayload is invalid xml
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }

      /* Work on whole document or just its body */
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };

    /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param  {Node} root The root element or node to start traversing on.
     * @return {NodeIterator} The created NodeIterator
     */
    const _createNodeIterator = function _createNodeIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null);
    };

    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */
    const _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
    };

    /**
     * Checks whether the given object is a DOM node.
     *
     * @param  {Node} object object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */
    const _isNode = function _isNode(object) {
      return typeof Node === 'function' && object instanceof Node;
    };

    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */
    const _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }
      arrayForEach(hooks[entryPoint], hook => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };

    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */
    const _sanitizeElements = function _sanitizeElements(currentNode) {
      let content = null;

      /* Execute a hook if present */
      _executeHook('beforeSanitizeElements', currentNode, null);

      /* Check if element is clobbered or can clobber */
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Now let's check the element's type and name */
      const tagName = transformCaseFunc(currentNode.nodeName);

      /* Execute a hook if present */
      _executeHook('uponSanitizeElement', currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });

      /* Detect mXSS attempts abusing namespace confusion */
      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Remove element if anything forbids its presence */
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }

        /* Keep content except for bad-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }

      /* Check whether element has a valid namespace */
      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Make sure that older browsers don't get fallback-tag mXSS */
      if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }

      /* Sanitize element content to be template-safe */
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          content = stringReplace(content, expr, ' ');
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeElements', currentNode, null);
      return false;
    };

    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity
    const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }

      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) ||
        // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
        return false;
      } else ;
      return true;
    };

    /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param {string} tagName name of the tag of the node to sanitize
     * @returns {boolean} Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */
    const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
      return tagName !== 'annotation-xml' && tagName.indexOf('-') > 0;
    };

    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */
    const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      /* Execute a hook if present */
      _executeHook('beforeSanitizeAttributes', currentNode, null);
      const {
        attributes
      } = currentNode;

      /* Check if we have attributes; if not we might have a text node */
      if (!attributes) {
        return;
      }
      const hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      let l = attributes.length;

      /* Go backwards over all attributes; safely remove bad ones */
      while (l--) {
        const attr = attributes[l];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        let value = name === 'value' ? attrValue : stringTrim(attrValue);

        /* Execute a hook if present */
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);
        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */
        if (hookEvent.forceKeepAttr) {
          continue;
        }

        /* Remove attribute */
        _removeAttribute(name, currentNode);

        /* Did the hooks approve of the attribute? */
        if (!hookEvent.keepAttr) {
          continue;
        }

        /* Work around a security issue in jQuery 3.0 */
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }

        /* Sanitize attribute content to be template-safe */
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
            value = stringReplace(value, expr, ' ');
          });
        }

        /* Is `value` valid for this attribute? */
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }

        /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */
        if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
          // Remove the attribute with this value
          _removeAttribute(name, currentNode);

          // Prefix the value and later re-create the attribute with the sanitized value
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }

        /* Handle attributes that require Trusted Types */
        if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                {
                  value = trustedTypesPolicy.createHTML(value);
                  break;
                }
              case 'TrustedScriptURL':
                {
                  value = trustedTypesPolicy.createScriptURL(value);
                  break;
                }
            }
          }
        }

        /* Handle invalid data-* attribute set by try-catching it */
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }
          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeAttributes', currentNode, null);
    };

    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */
    const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);

      /* Execute a hook if present */
      _executeHook('beforeSanitizeShadowDOM', fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);

        /* Sanitize tags and elements */
        if (_sanitizeElements(shadowNode)) {
          continue;
        }

        /* Deep shadow DOM detected */
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(shadowNode);
      }

      /* Execute a hook if present */
      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };

    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} cfg object
     */
    // eslint-disable-next-line complexity
    DOMPurify.sanitize = function (dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }

      /* Stringify, in case dirty is an object */
      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        if (typeof dirty.toString === 'function') {
          dirty = dirty.toString();
          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        } else {
          throw typeErrorCreate('toString is not a function');
        }
      }

      /* Return dirty HTML if DOMPurify cannot run */
      if (!DOMPurify.isSupported) {
        return dirty;
      }

      /* Assign config vars */
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }

      /* Clean up removed elements */
      DOMPurify.removed = [];

      /* Check if dirty is correctly typed for IN_PLACE */
      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
        // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }

        /* Initialize the document to work on */
        body = _initDocument(dirty);

        /* Check we have a DOM node from the data */
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }

      /* Remove first element node (ours) if FORCE_BODY is set */
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }

      /* Get node iterator */
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);

      /* Now start iterating over the created document */
      while (currentNode = nodeIterator.nextNode()) {
        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }

        /* Shadow DOM detected, sanitize it */
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }

        /* Check attributes, sanitize if necessary */
        _sanitizeAttributes(currentNode);
      }

      /* If we sanitized `dirty` in-place, return it. */
      if (IN_PLACE) {
        return dirty;
      }

      /* Return sanitized string or DOM */
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;

      /* Serialize doctype if allowed */
      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }

      /* Sanitize final string template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          serializedHTML = stringReplace(serializedHTML, expr, ' ');
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };

    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */
    DOMPurify.setConfig = function () {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };

    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */
    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };

    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {String} tag Tag name of containing element.
     * @param  {String} attr Attribute name.
     * @param  {String} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */
    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };

    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */
    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }
      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };

    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */
    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };

    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */
    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };

    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     */
    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ "./src/themes/square.less":
/*!********************************!*\
  !*** ./src/themes/square.less ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/lib/defaultCommands.ts":
/*!************************************!*\
  !*** ./src/lib/defaultCommands.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/lib/dom.ts");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./escape.js */ "./src/lib/escape.js");
/* harmony import */ var _templates_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates.js */ "./src/lib/templates.js");
/* eslint-disable @typescript-eslint/no-this-alias */




/**
 * Fixes a bug in FF where it sometimes wraps
 * new lines in their own list item.
 * See issue #359
 */
function fixFirefoxListBug(editor) {
    // Only apply to Firefox as will break other browsers.
    if ('mozHidden' in document) {
        let node = editor.getBody();
        let next;
        while (node) {
            next = node;
            if (next.firstChild) {
                next = next.firstChild;
            }
            else {
                while (next && !next.nextSibling) {
                    next = next.parentNode;
                }
                if (next) {
                    next = next.nextSibling;
                }
            }
            if (node.nodeType === 3 && /[\n\r\t]+/.test(node.nodeValue)) {
                // Only remove if newlines are collapsed
                if (!/^pre/.test(_dom__WEBPACK_IMPORTED_MODULE_0__.css(node.parentNode, 'whiteSpace'))) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.remove(node);
                }
            }
            node = next;
        }
    }
}
/**
 * Map of all the commands for EmlEditor
 * @type {Object}
 * @name commands
 */
var defaultCmds = {
    // START_COMMAND: Bold
    bold: {
        exec: 'bold',
        tooltip: 'Bold',
        shortcut: 'Ctrl+B'
    },
    // END_COMMAND
    // START_COMMAND: Italic
    italic: {
        exec: 'italic',
        tooltip: 'Italic',
        shortcut: 'Ctrl+I'
    },
    // END_COMMAND
    // START_COMMAND: Underline
    underline: {
        exec: 'underline',
        tooltip: 'Underline',
        shortcut: 'Ctrl+U'
    },
    // END_COMMAND
    // START_COMMAND: Strikethrough
    strike: {
        exec: 'strikethrough',
        tooltip: 'Strikethrough'
    },
    // END_COMMAND
    // START_COMMAND: Subscript
    subscript: {
        exec: 'subscript',
        tooltip: 'Subscript'
    },
    // END_COMMAND
    // START_COMMAND: Superscript
    superscript: {
        exec: 'superscript',
        tooltip: 'Superscript'
    },
    // END_COMMAND
    // START_COMMAND: Left
    left: {
        state: function (node) {
            if (node && node.nodeType === 3) {
                node = node.parentNode;
            }
            if (node) {
                var isLtr = _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'ltr';
                var align = _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'textAlign');
                // Can be -moz-left
                return /left/.test(align) ||
                    align === (isLtr ? 'start' : 'end');
            }
        },
        exec: 'justifyleft',
        tooltip: 'Align left'
    },
    // END_COMMAND
    // START_COMMAND: Centre
    center: {
        exec: 'justifycenter',
        tooltip: 'Center'
    },
    // END_COMMAND
    // START_COMMAND: Right
    right: {
        state: function (node) {
            if (node && node.nodeType === 3) {
                node = node.parentNode;
            }
            if (node) {
                var isLtr = _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'ltr';
                var align = _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'textAlign');
                // Can be -moz-right
                return /right/.test(align) ||
                    align === (isLtr ? 'end' : 'start');
            }
        },
        exec: 'justifyright',
        tooltip: 'Align right'
    },
    // END_COMMAND
    // START_COMMAND: Justify
    justify: {
        exec: 'justifyfull',
        tooltip: 'Justify'
    },
    // END_COMMAND
    // START_COMMAND: Font
    font: {
        _dropDown: function (editor, caller, callback) {
            var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'a', function (e) {
                callback(_dom__WEBPACK_IMPORTED_MODULE_0__.data(this, 'font'));
                editor.closeDropDown(true);
                e.preventDefault();
            });
            editor.editorOptions.fonts.split(',').forEach(function (font) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('fontOpt', {
                    font: font
                }, true));
            });
            editor.createDropDown(caller, 'font-picker', content);
        },
        exec: function (caller) {
            var editor = this;
            defaultCmds.font._dropDown(editor, caller, function (fontName) {
                editor.execCommand('fontname', fontName);
            });
        },
        tooltip: 'Font Name'
    },
    // END_COMMAND
    // START_COMMAND: Size
    size: {
        _dropDown: function (editor, caller, callback) {
            var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'a', function (e) {
                callback(_dom__WEBPACK_IMPORTED_MODULE_0__.data(this, 'size'));
                editor.closeDropDown(true);
                e.preventDefault();
            });
            for (var i = 1; i <= 7; i++) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('sizeOpt', {
                    size: i
                }, true));
            }
            editor.createDropDown(caller, 'fontsize-picker', content);
        },
        exec: function (caller) {
            var editor = this;
            defaultCmds.size._dropDown(editor, caller, function (fontSize) {
                editor.execCommand('fontsize', fontSize);
            });
        },
        tooltip: 'Font Size'
    },
    // END_COMMAND
    // START_COMMAND: Colour
    color: {
        _dropDown: function (editor, caller, callback) {
            var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            var html = '';
            var cmd = defaultCmds.color;
            if (!cmd._htmlCache) {
                editor.editorOptions.colors.split('|').forEach(function (column) {
                    html += '<div class="emleditor-color-column">';
                    column.split(',').forEach(function (color) {
                        html +=
                            '<a href="#" class="emleditor-color-option"' +
                                ' style="background-color: ' + color + '"' +
                                ' data-color="' + color + '"></a>';
                    });
                    html += '</div>';
                });
                cmd._htmlCache = html;
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, _dom__WEBPACK_IMPORTED_MODULE_0__.parseHTML(cmd._htmlCache));
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'a', function (e) {
                callback(_dom__WEBPACK_IMPORTED_MODULE_0__.data(this, 'color'));
                editor.closeDropDown(true);
                e.preventDefault();
            });
            editor.createDropDown(caller, 'color-picker', content);
        },
        exec: function (caller) {
            var editor = this;
            defaultCmds.color._dropDown(editor, caller, function (color) {
                editor.execCommand('forecolor', color);
            });
        },
        tooltip: 'Font Color'
    },
    // END_COMMAND
    // START_COMMAND: Remove Format
    removeformat: {
        exec: 'removeformat',
        tooltip: 'Remove Formatting'
    },
    // END_COMMAND
    // START_COMMAND: Cut
    cut: {
        exec: 'cut',
        tooltip: 'Cut',
        errorMessage: 'Your browser does not allow the cut command. ' +
            'Please use the keyboard shortcut Ctrl/Cmd-X'
    },
    // END_COMMAND
    // START_COMMAND: Copy
    copy: {
        exec: 'copy',
        tooltip: 'Copy',
        errorMessage: 'Your browser does not allow the copy command. ' +
            'Please use the keyboard shortcut Ctrl/Cmd-C'
    },
    // END_COMMAND
    // START_COMMAND: Paste
    paste: {
        exec: 'paste',
        tooltip: 'Paste',
        errorMessage: 'Your browser does not allow the paste command. ' +
            'Please use the keyboard shortcut Ctrl/Cmd-V'
    },
    // END_COMMAND
    // START_COMMAND: Paste Text
    pastetext: {
        exec: function (caller) {
            var val, content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div'), editor = this;
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('pastetext', {
                label: editor.translate('Paste your text inside the following box:'),
                insert: editor.translate('Insert')
            }, true));
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
                val = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#txt')[0].value;
                if (val) {
                    editor.wysiwygEditorInsertText(val);
                }
                editor.closeDropDown(true);
                e.preventDefault();
            });
            editor.createDropDown(caller, 'pastetext', content);
        },
        tooltip: 'Paste Text'
    },
    // END_COMMAND
    // START_COMMAND: Bullet List
    bulletlist: {
        exec: function () {
            fixFirefoxListBug(this);
            this.execCommand('insertunorderedlist');
        },
        tooltip: 'Bullet list'
    },
    // END_COMMAND
    // START_COMMAND: Ordered List
    orderedlist: {
        exec: function () {
            fixFirefoxListBug(this);
            this.execCommand('insertorderedlist');
        },
        tooltip: 'Numbered list'
    },
    // END_COMMAND
    // START_COMMAND: Indent
    indent: {
        state: function (parent, firstBlock) {
            // Only works with lists, for now
            var range, startParent, endParent;
            if (_dom__WEBPACK_IMPORTED_MODULE_0__.is(firstBlock, 'li')) {
                return 0;
            }
            if (_dom__WEBPACK_IMPORTED_MODULE_0__.is(firstBlock, 'ul,ol,menu')) {
                // if the whole list is selected, then this must be
                // invalidated because the browser will place a
                // <blockquote> there
                range = this.getRangeHelper().selectedRange();
                startParent = range.startContainer.parentNode;
                endParent = range.endContainer.parentNode;
                // TODO: could use nodeType for this?
                // Maybe just check the firstBlock contains both the start
                //and end containers
                // Select the tag, not the textNode
                // (that's why the parentNode)
                if (startParent !==
                    startParent.parentNode.firstElementChild ||
                    // work around a bug in FF
                    (_dom__WEBPACK_IMPORTED_MODULE_0__.is(endParent, 'li') && endParent !==
                        endParent.parentNode.lastElementChild)) {
                    return 0;
                }
            }
            return -1;
        },
        exec: function () {
            var editor = this, block = editor.getRangeHelper().getFirstBlockParent();
            editor.focus();
            // An indent system is quite complicated as there are loads
            // of complications and issues around how to indent text
            // As default, let's just stay with indenting the lists,
            // at least, for now.
            if (_dom__WEBPACK_IMPORTED_MODULE_0__.closest(block, 'ul,ol,menu')) {
                editor.execCommand('indent');
            }
        },
        tooltip: 'Add indent'
    },
    // END_COMMAND
    // START_COMMAND: Outdent
    outdent: {
        state: function (parents, firstBlock) {
            return _dom__WEBPACK_IMPORTED_MODULE_0__.closest(firstBlock, 'ul,ol,menu') ? 0 : -1;
        },
        exec: function () {
            var block = this.getRangeHelper().getFirstBlockParent();
            if (_dom__WEBPACK_IMPORTED_MODULE_0__.closest(block, 'ul,ol,menu')) {
                this.execCommand('outdent');
            }
        },
        tooltip: 'Remove one indent'
    },
    // END_COMMAND
    // START_COMMAND: Table
    table: {
        exec: function (caller) {
            var editor = this, content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('table', {
                rows: editor.translate('Rows:'),
                cols: editor.translate('Cols:'),
                insert: editor.translate('Insert')
            }, true));
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
                var rows = Number(_dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#rows')[0].value), cols = Number(_dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#cols')[0].value), html = '<table>';
                if (rows > 0 && cols > 0) {
                    html += Array(rows + 1).join('<tr>' +
                        Array(cols + 1).join('<td><br /></td>') +
                        '</tr>');
                    html += '</table>';
                    editor.wysiwygEditorInsertHtml(html);
                    editor.closeDropDown(true);
                    e.preventDefault();
                }
            });
            editor.createDropDown(caller, 'inserttable', content);
        },
        tooltip: 'Insert a table'
    },
    // END_COMMAND
    // START_COMMAND: Horizontal Rule
    horizontalrule: {
        exec: 'inserthorizontalrule',
        tooltip: 'Insert a horizontal rule'
    },
    // END_COMMAND
    // START_COMMAND: Code
    code: {
        exec: function () {
            this.wysiwygEditorInsertHtml('<code>', '<br /></code>');
        },
        tooltip: 'Code'
    },
    // END_COMMAND
    // START_COMMAND: Image
    image: {
        _dropDown: function (editor, caller, selected, callback) {
            var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('image', {
                url: editor.translate('URL:'),
                width: editor.translate('Width (optional):'),
                height: editor.translate('Height (optional):'),
                insert: editor.translate('Insert')
            }, true));
            var urlInput = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#image')[0];
            urlInput.value = selected;
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
                if (urlInput.value) {
                    callback(urlInput.value, _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#width')[0].value, _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#height')[0].value);
                }
                editor.closeDropDown(true);
                e.preventDefault();
            });
            editor.createDropDown(caller, 'insertimage', content);
        },
        exec: function (caller) {
            var editor = this;
            defaultCmds.image._dropDown(editor, caller, '', function (url, width, height) {
                var attrs = '';
                if (width) {
                    attrs += ' width="' + parseInt(width, 10) + '"';
                }
                if (height) {
                    attrs += ' height="' + parseInt(height, 10) + '"';
                }
                attrs += ' src="' + _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(url) + '"';
                editor.wysiwygEditorInsertHtml('<img' + attrs + ' />');
            });
        },
        tooltip: 'Insert an image'
    },
    // END_COMMAND
    // START_COMMAND: E-mail
    email: {
        _dropDown: function (editor, caller, callback) {
            var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('email', {
                label: editor.translate('E-mail:'),
                desc: editor.translate('Description (optional):'),
                insert: editor.translate('Insert')
            }, true));
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
                let email = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#email')[0].value;
                if (email) {
                    callback(email, _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#des')[0].value);
                }
                editor.closeDropDown(true);
                e.preventDefault();
            });
            editor.createDropDown(caller, 'insertemail', content);
        },
        exec: function (caller) {
            var editor = this;
            defaultCmds.email._dropDown(editor, caller, function (email, text) {
                if (!editor.getRangeHelper().selectedHtml() || text) {
                    editor.wysiwygEditorInsertHtml('<a href="' +
                        'mailto:' + _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(email) + '">' +
                        _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities((text || email)) +
                        '</a>');
                }
                else {
                    editor.execCommand('createlink', 'mailto:' + email);
                }
            });
        },
        tooltip: 'Insert an email'
    },
    // END_COMMAND
    // START_COMMAND: Link
    link: {
        _dropDown: function (editor, caller, callback) {
            var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('link', {
                url: editor.translate('URL:'),
                desc: editor.translate('Description (optional):'),
                ins: editor.translate('Insert')
            }, true));
            var linkInput = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#link')[0];
            var desInput = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#des')[0];
            function insertUrl(e) {
                if (linkInput.value) {
                    callback(linkInput.value, desInput.value);
                }
                editor.closeDropDown(true);
                e.preventDefault();
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', insertUrl);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'keypress', null, function (e) {
                // 13 = enter key
                if (e.which === 13 && linkInput.value) {
                    insertUrl(e);
                }
            }, _dom__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
            editor.createDropDown(caller, 'insertlink', content);
        },
        exec: function (caller) {
            var editor = this;
            defaultCmds.link._dropDown(editor, caller, function (url, text) {
                if (text || !editor.getRangeHelper().selectedHtml()) {
                    editor.wysiwygEditorInsertHtml('<a href="' + _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(url) + '">' +
                        _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(text || url) +
                        '</a>');
                }
                else {
                    editor.execCommand('createlink', url);
                }
            });
        },
        tooltip: 'Insert a link'
    },
    // END_COMMAND
    // START_COMMAND: Unlink
    unlink: {
        state: function () {
            return _dom__WEBPACK_IMPORTED_MODULE_0__.closest(this.CurrentNode(), 'a') ? 0 : -1;
        },
        exec: function () {
            var anchor = _dom__WEBPACK_IMPORTED_MODULE_0__.closest(this.CurrentNode(), 'a');
            if (anchor) {
                while (anchor.firstChild) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.insertBefore(anchor.firstChild, anchor);
                }
                _dom__WEBPACK_IMPORTED_MODULE_0__.remove(anchor);
            }
        },
        tooltip: 'Unlink'
    },
    // END_COMMAND
    // START_COMMAND: Quote
    quote: {
        exec: function (caller, html, author) {
            var before = '<blockquote>', end = '</blockquote>';
            // if there is HTML passed set end to null so any selected
            // text is replaced
            if (html) {
                author = (author ? '<cite>' +
                    _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(author) +
                    '</cite>' : '');
                before = before + author + html + end;
                end = null;
                // if not add a newline to the end of the inserted quote
            }
            else if (this.getRangeHelper().selectedHtml() === '') {
                end = '<br />' + end;
            }
            this.wysiwygEditorInsertHtml(before, end);
        },
        tooltip: 'Insert a Quote'
    },
    // END_COMMAND
    // START_COMMAND: Emoticons
    emoticon: {
        exec: function (caller) {
            var editor = this;
            var createContent = function (includeMore) {
                var moreLink, opts = editor.editorOptions, emoticonsRoot = opts.emoticonsRoot || '', emoticonsCompat = opts.emoticonsCompat, rangeHelper = editor.getRangeHelper(), startSpace = emoticonsCompat &&
                    rangeHelper.getOuterText(true, 1) !== ' ' ? ' ' : '', endSpace = emoticonsCompat &&
                    rangeHelper.getOuterText(false, 1) !== ' ' ? ' ' : '', content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div'), line = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div'), perLine = 0, emoticons = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend({}, opts.emoticons.dropdown, includeMore ? opts.emoticons.more : {});
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, line);
                perLine = Math.sqrt(Object.keys(emoticons).length);
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'img', function (e) {
                    editor.insert(startSpace + _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this, 'alt') + endSpace, null, false).closeDropDown(true);
                    e.preventDefault();
                });
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, function (code, emoticon) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(line, _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
                        src: emoticonsRoot + (emoticon.url || emoticon),
                        alt: code,
                        title: emoticon.tooltip || code
                    }));
                    if (line.children.length >= perLine) {
                        line = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
                        _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, line);
                    }
                });
                if (!includeMore && opts.emoticons.more) {
                    moreLink = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('a', {
                        className: 'emleditor-more'
                    });
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(moreLink, document.createTextNode(editor.translate('More')));
                    _dom__WEBPACK_IMPORTED_MODULE_0__.on(moreLink, 'click', null, function (e) {
                        editor.createDropDown(caller, 'more-emoticons', createContent(true));
                        e.preventDefault();
                    });
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, moreLink);
                }
                return content;
            };
            editor.createDropDown(caller, 'emoticons', createContent(false));
        },
        txtExec: function (caller) {
            defaultCmds.emoticon.exec.call(this, caller);
        },
        tooltip: 'Insert an emoticon'
    },
    // END_COMMAND
    // START_COMMAND: YouTube
    youtube: {
        _dropDown: function (editor, caller, callback) {
            var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('youtubeMenu', {
                label: editor.translate('Video URL:'),
                insert: editor.translate('Insert')
            }, true));
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
                var val = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#link')[0].value;
                var idMatch = val.match(/(?:v=|v\/|embed\/|youtu.be\/)?([a-zA-Z0-9_-]{11})/);
                var timeMatch = val.match(/[&|?](?:star)?t=((\d+[hms]?){1,3})/);
                var time = 0;
                if (timeMatch) {
                    _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(timeMatch[1].split(/[hms]/), function (i, val) {
                        if (val !== '') {
                            time = (time * 60) + Number(val);
                        }
                    });
                }
                if (idMatch && /^[a-zA-Z0-9_-]{11}$/.test(idMatch[1])) {
                    callback(idMatch[1], time);
                }
                editor.closeDropDown(true);
                e.preventDefault();
            });
            editor.createDropDown(caller, 'insertlink', content);
        },
        exec: function (btn) {
            var editor = this;
            defaultCmds.youtube._dropDown(editor, btn, function (id, time) {
                editor.wysiwygEditorInsertHtml((0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('youtube', {
                    id: id,
                    time: time
                }));
            });
        },
        tooltip: 'Insert a YouTube video'
    },
    // END_COMMAND
    // START_COMMAND: Date
    date: {
        _date: function (editor) {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            let yearAsString = year.toString();
            let monthAsString = month.toString();
            let dayAsString = day.toString();
            if (month < 10) {
                monthAsString = '0' + month;
            }
            if (day < 10) {
                dayAsString = '0' + day;
            }
            return editor.editorOptions.dateFormat
                .replace(/year/i, yearAsString)
                .replace(/month/i, monthAsString)
                .replace(/day/i, dayAsString);
        },
        exec: function () {
            this.insertText(defaultCmds.date._date(this));
        },
        txtExec: function () {
            this.insertText(defaultCmds.date._date(this));
        },
        tooltip: 'Insert current date'
    },
    // END_COMMAND
    // START_COMMAND: Time
    time: {
        _time: function () {
            var now = new Date(), hours = now.getHours(), mins = now.getMinutes(), secs = now.getSeconds();
            let hoursAsString = hours.toString();
            let minshAsString = mins.toString();
            let secsAsString = secs.toString();
            if (hours < 10) {
                hoursAsString = '0' + hours.toString();
            }
            if (mins < 10) {
                minshAsString = '0' + mins.toString();
            }
            if (secs < 10) {
                secsAsString = '0' + secs.toString();
            }
            return hoursAsString + ':' + minshAsString + ':' + secsAsString;
        },
        exec: function () {
            this.insertText(defaultCmds.time._time());
        },
        txtExec: function () {
            this.insertText(defaultCmds.time._time());
        },
        tooltip: 'Insert current time'
    },
    // END_COMMAND
    // START_COMMAND: Ltr
    ltr: {
        state: function (parents, firstBlock) {
            return firstBlock && firstBlock.style.direction === 'ltr';
        },
        exec: function () {
            var editor = this, rangeHelper = editor.getRangeHelper(), node = rangeHelper.getFirstBlockParent();
            editor.focus();
            if (!node || _dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
                editor.execCommand('formatBlock', 'p');
                node = rangeHelper.getFirstBlockParent();
                if (!node || _dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
                    return;
                }
            }
            var toggleValue = _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'ltr' ? '' : 'ltr';
            _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction', toggleValue);
        },
        tooltip: 'Left-to-Right'
    },
    // END_COMMAND
    // START_COMMAND: Rtl
    rtl: {
        state: function (parents, firstBlock) {
            return firstBlock && firstBlock.style.direction === 'rtl';
        },
        exec: function () {
            var editor = this, rangeHelper = editor.getRangeHelper(), node = rangeHelper.getFirstBlockParent();
            editor.focus();
            if (!node || _dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
                editor.execCommand('formatBlock', 'p');
                node = rangeHelper.getFirstBlockParent();
                if (!node || _dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
                    return;
                }
            }
            var toggleValue = _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'rtl' ? '' : 'rtl';
            _dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction', toggleValue);
        },
        tooltip: 'Right-to-Left'
    },
    // END_COMMAND
    // START_COMMAND: Print
    print: {
        exec: 'print',
        tooltip: 'Print'
    },
    // END_COMMAND
    // START_COMMAND: Maximize
    maximize: {
        state: function () {
            return this.maximize();
        },
        exec: function () {
            this.maximize(!this.maximize());
            this.focus();
        },
        txtExec: function () {
            this.maximize(!this.maximize());
            this.focus();
        },
        tooltip: 'Maximize',
        shortcut: 'Ctrl+Shift+M'
    },
    // END_COMMAND
    // START_COMMAND: Source
    source: {
        state: function () {
            return this.sourceMode();
        },
        exec: function () {
            this.toggleSourceMode();
            this.focus();
        },
        txtExec: function () {
            this.toggleSourceMode();
            this.focus();
        },
        tooltip: 'View source',
        shortcut: 'Ctrl+Shift+S'
    },
    // END_COMMAND
    // this is here so that commands above can be removed
    // without having to remove the , after the last one.
    // Needed for IE.
    ignore: {}
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultCmds);


/***/ }),

/***/ "./src/lib/dom.ts":
/*!************************!*\
  !*** ./src/lib/dom.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMMENT_NODE: () => (/* binding */ COMMENT_NODE),
/* harmony export */   DOCUMENT_FRAGMENT_NODE: () => (/* binding */ DOCUMENT_FRAGMENT_NODE),
/* harmony export */   DOCUMENT_NODE: () => (/* binding */ DOCUMENT_NODE),
/* harmony export */   ELEMENT_NODE: () => (/* binding */ ELEMENT_NODE),
/* harmony export */   EVENT_BUBBLE: () => (/* binding */ EVENT_BUBBLE),
/* harmony export */   EVENT_CAPTURE: () => (/* binding */ EVENT_CAPTURE),
/* harmony export */   TEXT_NODE: () => (/* binding */ TEXT_NODE),
/* harmony export */   addClass: () => (/* binding */ addClass),
/* harmony export */   appendChild: () => (/* binding */ appendChild),
/* harmony export */   attr: () => (/* binding */ attr),
/* harmony export */   blockLevelList: () => (/* binding */ blockLevelList),
/* harmony export */   canHaveChildren: () => (/* binding */ canHaveChildren),
/* harmony export */   closest: () => (/* binding */ closest),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   convertElement: () => (/* binding */ convertElement),
/* harmony export */   copyCSS: () => (/* binding */ copyCSS),
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   css: () => (/* binding */ css),
/* harmony export */   data: () => (/* binding */ data),
/* harmony export */   extractContents: () => (/* binding */ extractContents),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   findCommonAncestor: () => (/* binding */ findCommonAncestor),
/* harmony export */   fixNesting: () => (/* binding */ fixNesting),
/* harmony export */   getOffset: () => (/* binding */ getOffset),
/* harmony export */   getSibling: () => (/* binding */ getSibling),
/* harmony export */   getStyle: () => (/* binding */ getStyle),
/* harmony export */   hasClass: () => (/* binding */ hasClass),
/* harmony export */   hasStyle: () => (/* binding */ hasStyle),
/* harmony export */   hasStyling: () => (/* binding */ hasStyling),
/* harmony export */   height: () => (/* binding */ height),
/* harmony export */   hide: () => (/* binding */ hide),
/* harmony export */   insertBefore: () => (/* binding */ insertBefore),
/* harmony export */   is: () => (/* binding */ is),
/* harmony export */   isEmpty: () => (/* binding */ isEmpty),
/* harmony export */   isInline: () => (/* binding */ isInline),
/* harmony export */   isVisible: () => (/* binding */ isVisible),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   off: () => (/* binding */ off),
/* harmony export */   on: () => (/* binding */ on),
/* harmony export */   parent: () => (/* binding */ parent),
/* harmony export */   parents: () => (/* binding */ parents),
/* harmony export */   parseHTML: () => (/* binding */ parseHTML),
/* harmony export */   previousElementSibling: () => (/* binding */ previousElementSibling),
/* harmony export */   rTraverse: () => (/* binding */ rTraverse),
/* harmony export */   remove: () => (/* binding */ remove),
/* harmony export */   removeAttr: () => (/* binding */ removeAttr),
/* harmony export */   removeClass: () => (/* binding */ removeClass),
/* harmony export */   removeWhiteSpace: () => (/* binding */ removeWhiteSpace),
/* harmony export */   show: () => (/* binding */ show),
/* harmony export */   toggle: () => (/* binding */ toggle),
/* harmony export */   toggleClass: () => (/* binding */ toggleClass),
/* harmony export */   traverse: () => (/* binding */ traverse),
/* harmony export */   trigger: () => (/* binding */ trigger),
/* harmony export */   width: () => (/* binding */ width)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");

/**
 * Cache of camelCase CSS property names
 * @type {Object<string, string>}
 */
let cssPropertyNameCache = {};
/**
 * Node type constant for element nodes
 *
 * @type {number}
 */
const ELEMENT_NODE = 1;
/**
 * Node type constant for text nodes
 *
 * @type {number}
 */
const TEXT_NODE = 3;
/**
 * Node type constant for comment nodes
 *
 * @type {number}
 */
const COMMENT_NODE = 8;
/**
 * Node type document nodes
 *
 * @type {number}
 */
const DOCUMENT_NODE = 9;
/**
 * Node type constant for document fragments
 *
 * @type {number}
 */
const DOCUMENT_FRAGMENT_NODE = 11;
function toFloat(value) {
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
function createElement(tag, attributes, context) {
    let htmlElement = (context || document).createElement(tag);
    let attribs = attributes;
    _utils_js__WEBPACK_IMPORTED_MODULE_0__.each(attribs || {}, function (key, value) {
        if (key == 'style') {
            htmlElement.style.cssText = value;
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
function parents(node, selector) {
    var parents = [];
    var parent = node;
    while ((parent = parent.parentNode)
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
function parent(node, selector) {
    var parent = node;
    while ((parent = parent.parentNode)
        && !/(9|11)/.test(parent.nodeType.toString())) {
        if (!selector || is(parent, selector)) {
            return parent;
        }
    }
}
/**
 * Checks the passed node and all parents and
 * returns the first matching node if any.
 *
 * @param {!HTMLElement} node
 * @param {!string} selector
 * @returns {HTMLElement|undefined}
 */
function closest(node, selector) {
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
function remove(node) {
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
function appendChild(node, child) {
    node.appendChild(child);
}
/**
 * Finds any child nodes that match the selector
 *
 * @param {!HTMLElement | Document} node
 * @param {!string} selector
 * @returns {NodeList}
 */
function find(node, selector) {
    return node.querySelectorAll(selector);
}
/**
 * For on() and off() if to add/remove the event
 * to the capture phase
 *
 * @type {boolean}
 */
let EVENT_CAPTURE = true;
/**
 * For on() and off() if to add/remove the event
 * to the bubble phase
 *
 * @type {boolean}
 */
let EVENT_BUBBLE = false;
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
 * @param {function(...any)}
 * @param {boolean} [capture=false]
 * @see off()
 */
// eslint-disable-next-line max-params
function on(node, events, selector, fn, capture = false) {
    events.split(' ').forEach(function (event) {
        var handler;
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(selector)) {
            handler = fn['_eml-event-' + event + selector] || function (e) {
                var target = e.target;
                while (target && target !== node) {
                    if (is(target, selector)) {
                        fn.call(target, e);
                        return;
                    }
                    target = target.parentNode;
                }
            };
            fn['_eml-event-' + event + selector] = handler;
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
function off(node, events, selector, fn, capture = false) {
    events.split(' ').forEach(function (event) {
        var handler;
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(selector)) {
            let key = '_eml-event-' + event + selector;
            handler = fn[key];
        }
        else {
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
function attr(node, attr, value) {
    if (arguments.length < 3) {
        return node.getAttribute(attr);
    }
    // eslint-disable-next-line eqeqeq, no-eq-null
    if (!value) {
        removeAttr(node, attr);
    }
    else {
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
function removeAttr(node, attr) {
    node.removeAttribute(attr);
}
/**
 * Sets the passed elements display to none
 *
 * @param {!HTMLElement} node
 */
function hide(node) {
    css(node, 'display', 'none');
}
/**
 * Sets the passed elements display to default
 *
 * @param {!HTMLElement} node
 */
function show(node) {
    css(node, 'display', '');
}
/**
 * Toggles an elements visibility
 *
 * @param {!HTMLElement} node
 */
function toggle(node) {
    if (isVisible(node)) {
        hide(node);
    }
    else {
        show(node);
    }
}
/**
 * Gets a computed CSS values or sets an inline CSS value
 *
 * Rules should be in camelCase format and not
 * hyphenated like CSS properties.
 *
 * @param {any} node
 * @param {any} rule
 * @param {any} [value]
 * @return {string | null}
 */
function css(node, rule, value) {
    let retVal = null;
    if (arguments.length < 3) {
        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(rule)) {
            return node.nodeType === 1 ? getComputedStyle(node)[rule] : null;
        }
        _utils_js__WEBPACK_IMPORTED_MODULE_0__.each(rule, function (key, value) {
            css(node, key, value);
        });
    }
    else {
        // isNaN returns false for null, false and empty strings
        // so need to check it's truthy or 0
        var isNumeric = (value || value === 0) && !isNaN(value);
        node.style[rule] = isNumeric ? value.toString() + 'px' : value;
    }
    return retVal;
}
/**
 * Gets or sets the data attributes on a node
 *
 * Unlike the jQuery version this only stores data
 * in the DOM attributes which means only strings
 * can be stored.
 *
 * @param {Node} node
 * @param {string} [key]
 * @param {string} [value]
 * @return {Object|undefined}
 */
function data(node, key, value) {
    var argsLength = arguments.length;
    var data = {};
    if (node.nodeType === ELEMENT_NODE) {
        if (argsLength === 1) {
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.each(node.attributes, function (_, attr) {
                if (/^data-/i.test(attr.name)) {
                    let idx = attr.name.substr(5);
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
function is(node, selector) {
    var result = false;
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
function contains(node, child) {
    return node !== child && node.contains && node.contains(child);
}
/**
 * @param {Element} node
 * @param {string} [selector]
 * @returns {?HTMLElement}
 */
function previousElementSibling(node, selector) {
    var prev = node.previousElementSibling;
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
function insertBefore(node, refNode) {
    let retVal = refNode.parentNode.insertBefore(node, refNode);
    return retVal;
}
/**
 * @param {?HTMLElement} node
 * @returns {!Array.<string>}
 */
function classes(node) {
    const retValue = node.className.trim().split(/\s+/);
    return retValue;
}
/**
 * @param {?HTMLElement} node
 * @param {string} className
 * @returns {boolean}
 */
function hasClass(node, className) {
    return is(node, '.' + className);
}
/**
 * @param {!HTMLElement} node
 * @param {string} className
 */
function addClass(node, className) {
    var classList = classes(node);
    if (classList.indexOf(className) < 0) {
        classList.push(className);
    }
    node.className = classList.join(' ');
}
/**
 * @param {!HTMLElement} node
 * @param {string} className
 */
function removeClass(node, className) {
    var classList = classes(node);
    _utils_js__WEBPACK_IMPORTED_MODULE_0__.arrayRemove(classList, className);
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
function toggleClass(node, className, state) {
    state = _utils_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined(state) ? !hasClass(node, className) : state;
    if (state) {
        addClass(node, className);
    }
    else {
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
function width(node, value) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined(value)) {
        var cs = getComputedStyle(node);
        var padding = toFloat(cs.paddingLeft) + toFloat(cs.paddingRight);
        var border = toFloat(cs.borderLeftWidth) + toFloat(cs.borderRightWidth);
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
function height(node, value) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined(value)) {
        var cs = getComputedStyle(node);
        var padding = toFloat(cs.paddingTop) + toFloat(cs.paddingBottom);
        var border = toFloat(cs.borderTopWidth) + toFloat(cs.borderBottomWidth);
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
function trigger(node, eventName, data) {
    var event;
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isFunction(window.CustomEvent)) {
        event = new CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
            detail: data
        });
    }
    else {
        event = node.ownerDocument.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, data);
    }
    node.dispatchEvent(event);
}
/**
 * Returns if a node is visible.
 *
 * @param {HTMLElement}
 * @returns {boolean}
 */
function isVisible(node) {
    return !!node.getClientRects().length;
}
/**
 * Convert CSS property names into camel case
 *
 * @param {string} string
 * @returns {string}
 */
function camelCase(str) {
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
function traverse(node, func, innermostFirst, siblingsOnly, reverse = false) {
    node = reverse ? node.lastChild : node.firstChild;
    while (node) {
        var next = reverse ? node.previousSibling : node.nextSibling;
        if ((!innermostFirst && func(node) === false) ||
            (!siblingsOnly && traverse(node, func, innermostFirst, siblingsOnly, reverse) === false) ||
            (innermostFirst && func(node) === false)) {
            return false;
        }
        node = next;
    }
    return true;
}
/**
 * Like traverse but loops in reverse
 * @see traverse
 */
function rTraverse(node, func, innermostFirst, siblingsOnly) {
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
function parseHTML(html, context) {
    context = context || document;
    var ret = context.createDocumentFragment();
    var tmp = createElement('div', {}, context);
    tmp.innerHTML = html;
    while (tmp.firstChild) {
        appendChild(ret, tmp.firstChild);
    }
    return ret;
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
function hasStyling(node) {
    return node && (!is(node, 'p,div') || node.className?.length > 0 ||
        (attr(node, 'style')?.length > 0) || _utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(data(node)));
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
function convertElement(element, toTagName) {
    var newElement = createElement(toTagName, {}, element.ownerDocument);
    _utils_js__WEBPACK_IMPORTED_MODULE_0__.each(element.attributes, function (_, attribute) {
        // Some browsers parse invalid attributes names like
        // 'size"2' which throw an exception when set, just
        // ignore these.
        try {
            attr(newElement, attribute.name, attribute.value);
        }
        catch (ex) { /* empty */ }
    });
    while (element.firstChild) {
        appendChild(newElement, element.firstChild);
    }
    element.parentNode.replaceChild(newElement, element);
    return newElement;
}
/**
 * List of block level elements separated by bars (|)
 *
 * @type {string}
 */
var blockLevelList = '|body|hr|p|div|h1|h2|h3|h4|h5|h6|address|pre|' +
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
function canHaveChildren(node) {
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
 * @param {HTMLElement | any} elm
 * @param {boolean} [includeCodeAsBlock=false]
 * @return {boolean}
 */
function isInline(elm, includeCodeAsBlock = false) {
    var tagName, nodeType = (elm || {}).nodeType || TEXT_NODE;
    if (nodeType !== ELEMENT_NODE) {
        return nodeType === TEXT_NODE;
    }
    tagName = elm.tagName.toLowerCase();
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
function copyCSS(from, to) {
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
function isEmpty(node) {
    let lastChild = node.lastChild;
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
function fixNesting(node) {
    traverse(node, function (node) {
        let list = 'ul,ol', isBlock = !isInline(node, true) && node.nodeType !== COMMENT_NODE, parent = node.parentNode;
        // Any blocklevel element inside an inline element needs fixing.
        // Also <p> tags that contain blocks should be fixed
        if (isBlock && (isInline(parent, true) || parent.tagName === 'P')) {
            // Find the last inline parent node
            let lastInlineParent = node;
            while (isInline(lastInlineParent.parentNode, true) ||
                lastInlineParent.parentNode.tagName === 'P') {
                lastInlineParent = lastInlineParent.parentNode;
            }
            let before = extractContents(lastInlineParent, node);
            let middle = node;
            // Clone inline styling and apply it to the blocks children
            while (parent && isInline(parent, true)) {
                if (parent.nodeType === ELEMENT_NODE) {
                    let clone = parent.cloneNode();
                    while (middle.firstChild) {
                        appendChild(clone, middle.firstChild);
                    }
                    appendChild(middle, clone);
                }
                parent = parent.parentNode;
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
        let nodeParentNode = node.parentNode;
        if (isBlock && is(node, list) && is(nodeParentNode, list)) {
            var li = previousElementSibling(node, 'li');
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
function findCommonAncestor(node1, node2) {
    while ((node1 = node1.parentNode)) {
        if (contains(node1, node2)) {
            return node1;
        }
    }
}
/**
 * @param {?Node}
 * @param {boolean} [previous=false]
 * @returns {?Node}
 */
function getSibling(node, previous = false) {
    if (!node) {
        return null;
    }
    let sibling = (previous ? node.previousSibling : node.nextSibling) || getSibling(node.parentNode, previous);
    return sibling;
}
/**
 * Removes unused whitespace from the root and all it's children.
 *
 * @param {!HTMLElement} root
 * @since 1.4.3
 */
function removeWhiteSpace(root) {
    var nodeValue, nodeType, next, previous, previousSibling, nextNode, trimStart, cssWhiteSpace = css(root, 'whiteSpace'), 
    // Preserve newlines if is pre-line
    preserveNewLines = /line$/i.test(cssWhiteSpace), node = root.firstChild;
    // Skip pre & pre-wrap with any vendor prefix
    if (/pre(-wrap)?$/i.test(cssWhiteSpace)) {
        return;
    }
    while (node) {
        nextNode = node.nextSibling;
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
                    previousSibling = previousSibling.lastChild;
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
                nodeValue = nodeValue.replace(preserveNewLines ? /^[\t ]+/ : /^[\t\n\r ]+/, '');
            }
            // Strip trailing whitespace
            if (!next || !isInline(next)) {
                nodeValue = nodeValue.replace(preserveNewLines ? /[\t ]+$/ : /[\t\n\r ]+$/, '');
            }
            // Remove empty text nodes
            if (!nodeValue.length) {
                remove(node);
            }
            else {
                node.nodeValue = nodeValue.replace(preserveNewLines ? /[\t ]+/g : /[\t\n\r ]+/g, ' ');
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
function extractContents(startNode, endNode) {
    var range = startNode.ownerDocument.createRange();
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
function getOffset(node) {
    var left = 0, top = 0;
    while (node) {
        left += node.offsetLeft;
        top += node.offsetTop;
        node = node.offsetParent;
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
function getStyle(elm, property) {
    let styleValue;
    let elmStyle = elm.style;
    if (!cssPropertyNameCache[property]) {
        cssPropertyNameCache[property] = camelCase(property);
    }
    property = cssPropertyNameCache[property];
    styleValue = elmStyle.getPropertyValue(property);
    // Add an exception for text-align
    if ('textAlign' === property) {
        styleValue = styleValue || css(elm, property);
        if (css(elm.parentNode, property) === styleValue ||
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
function hasStyle(elm, property, values) {
    var styleValue = getStyle(elm, property);
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
function stylesMatch(nodeA, nodeB) {
    var i = nodeA.style.length;
    if (i !== nodeB.style.length) {
        return false;
    }
    while (i--) {
        let prop = nodeA.style[i];
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
function attributesMatch(nodeA, nodeB) {
    var i = nodeA.attributes.length;
    if (i !== nodeB.attributes.length) {
        return false;
    }
    while (i--) {
        var prop = nodeA.attributes[i];
        var notMatches = prop.name === 'style' ?
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
function removeKeepChildren(node) {
    while (node.firstChild) {
        insertBefore(node.firstChild, node);
    }
    remove(node);
}
/**
 * Merges inline styles and tags with parents where possible
 *
 * @param {Node} node
 * @since 3.1.0
 */
function merge(node) {
    if (node.nodeType !== ELEMENT_NODE) {
        return;
    }
    var parent = node.parentNode;
    var tagName = node.tagName;
    var mergeTags = /B|STRONG|EM|SPAN|FONT/;
    // Merge children (in reverse as children can be removed)
    var i = node.childNodes.length;
    while (i--) {
        merge(node.childNodes[i]);
    }
    // Should only merge inline tags and should not merge <br> tags
    if (!isInline(node) || tagName === 'BR') {
        return;
    }
    // Remove any inline styles that match the parent style
    i = node.style.length;
    while (i--) {
        var prop = node.style[i];
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
        }
        else if (mergeTags.test(tagName)) {
            var isBold = /B|STRONG/.test(tagName);
            var isItalic = tagName === 'EM';
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
                parent = parent.parentNode;
            }
        }
    }
    // Merge siblings if attributes, including inline styles, match
    var next = node.nextSibling;
    if (next && next.tagName === tagName && attributesMatch(next, node)) {
        appendChild(node, next);
        removeKeepChildren(next);
    }
}


/***/ }),

/***/ "./src/lib/emlEditor.ts":
/*!******************************!*\
  !*** ./src/lib/emlEditor.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/lib/dom.ts");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _defaultCommands__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultCommands */ "./src/lib/defaultCommands.ts");
/* harmony import */ var _pluginManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluginManager */ "./src/lib/pluginManager.ts");
/* harmony import */ var _rangeHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rangeHelper */ "./src/lib/rangeHelper.ts");
/* harmony import */ var _templates_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./templates.js */ "./src/lib/templates.js");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./escape.js */ "./src/lib/escape.js");
/* harmony import */ var _browser_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./browser.js */ "./src/lib/browser.js");
/* harmony import */ var _emoticons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./emoticons */ "./src/lib/emoticons.ts");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_10__);
var _a;











var globalWin = window;
var globalDoc = document;
/**
 * EmlEditor - YAE! Yet Another Editor
 * @class EmlEditor
 * @name EmlEditor
 */
class EmlEditor {
    constructor(textarea, userOptions) {
        /**
         * Map of events handlers bound to this instance.
         *
         * @type {Object}
         * @private
         */
        this.eventHandlers = {};
        /**
         * Stores a cache of preloaded images
         *
         * @private
         * @type {Array.<HTMLImageElement>}
         */
        this.preLoadCache = (Array);
        /**
         * Object containing a list of shortcut handlers
         *
         * @type {Object}
         * @private
         */
        this.shortcutHandlers = {};
        /**
         * All the emoticons from dropdown, more and hidden combined
         * and with the emoticons root set
         *
         * @type {!Object<string, string>}
         * @private
         */
        this.allEmoticons = {};
        /**
         * An array of button state handlers
         *
         * @type {Array.<Object>}
         * @private
         */
        this.btnStateHandlers = [];
        /**
         * Updates if buttons are active or not
         * @private
         */
        this.updateActiveButtons = () => {
            let firstBlock, parent;
            let activeClass = 'active';
            let doc = this.wysiwygDocument;
            let isSource = this.sourceMode();
            if (this.readOnly()) {
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom__WEBPACK_IMPORTED_MODULE_0__.find(this.toolbar, activeClass), (_, menuItem) => {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.removeClass(menuItem, activeClass);
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
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(stateFn)) {
                    if (!isSource) {
                        try {
                            state = doc.queryCommandEnabled(stateFn) ? 0 : -1;
                            // eslint-disable-next-line max-depth
                            if (state > -1) {
                                state = doc.queryCommandState(stateFn) ? 1 : 0;
                            }
                        }
                        catch (ex) { /* empty */ }
                    }
                }
                else if (!isDisabled) {
                    state = stateFn.call(this, parent, firstBlock);
                }
                _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(btn, 'disabled', isDisabled || state < 0);
                _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(btn, activeClass, state > 0);
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
        this.toolbarButtons = [];
        /**
         * Updates the toolbar to disable/enable the appropriate buttons
         * @private
         */
        this.updateToolBar = (disable) => {
            let mode = this.inSourceMode() ? '_emlTxtMode' : '_emlWysiwygMode';
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(this.toolbarButtons, (_, button) => {
                _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', disable || !button[mode]);
            });
        };
        /**
         * Checks if the current node has changed and triggers
         * the nodechanged event if it has
         * @private
         */
        this.checkNodeChanged = () => {
            // check if node has changed
            let oldNode, node = this.rangeHelper.parentNode();
            if (this.currentNode !== node) {
                oldNode = this.currentNode;
                this.currentNode = node;
                this.currentBlockNode = this.rangeHelper.getFirstBlockParent(node);
                _dom__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'nodechanged', {
                    oldNode: oldNode,
                    newNode: this.currentNode
                });
            }
        };
        /******************************************
         * Creates the editor iframe and textarea
         * @private
         */
        this.init = () => {
            let thisEditor = this;
            this.textarea._emleditor = this;
            // Load locale
            if (thisEditor.options.locale && thisEditor.options.locale !== 'en') {
                thisEditor.initLocale();
            }
            thisEditor.editorContainer = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-container',
            });
            _dom__WEBPACK_IMPORTED_MODULE_0__.insertBefore(thisEditor.editorContainer, thisEditor.textarea);
            _dom__WEBPACK_IMPORTED_MODULE_0__.css(thisEditor.editorContainer, 'z-index', thisEditor.options.zIndex);
            thisEditor.isRequired = thisEditor.textarea.required;
            thisEditor.textarea.required = false;
            let FormatCtor = _a.formats[thisEditor.options.format];
            thisEditor.format = FormatCtor ? new FormatCtor() : {};
            /*
                * Plugins should be initialized before the formatters since
                * they may wish to add or change formatting handlers and
                * since the bbcode format caches its handlers,
                * such changes must be done first.
                */
            thisEditor.pluginManager = new _pluginManager__WEBPACK_IMPORTED_MODULE_4__.PluginManager(thisEditor);
            (thisEditor.options.plugins || '').split(',').forEach((plugin) => {
                thisEditor.pluginManager.register(plugin.trim());
            });
            if ('init' in thisEditor.format) {
                thisEditor.format.init.call(thisEditor);
            }
            // Create the YAE!
            thisEditor.initEmoticons();
            thisEditor.initToolBar();
            thisEditor.initEditor();
            thisEditor.initOptions();
            thisEditor.initEvents();
            // force into source mode if is a browser that can't handle
            // full editing
            if (!_browser_js__WEBPACK_IMPORTED_MODULE_8__.isWysiwygSupported) {
                thisEditor.toggleSourceMode();
            }
            thisEditor.updateActiveButtons();
            let loaded = () => {
                _dom__WEBPACK_IMPORTED_MODULE_0__.off(globalWin, 'load', null, loaded);
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
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(globalWin, 'load', null, loaded);
            if (globalDoc.readyState === 'complete') {
                loaded();
            }
        };
        /**
         * Init the locale variable with the specified locale if possible
         * @private
         * @return void
         */
        this.initLocale = () => {
            let lang = undefined;
            this.locale = _a.locale[this.options.locale];
            if (!this.locale) {
                lang = this.options.locale.split('-');
                this.locale = _a.locale[lang[0]];
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
        this.initEditor = () => {
            this.sourceEditor = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('textarea', null);
            this.wysiwygEditor = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('iframe', {
                frameborder: "0",
                allowfullscreen: "true"
            });
            /*
                * This needs to be done right after they are created because,
                * for any reason, the user may not want the value to be tinkered
                * by any filters.
                */
            if (this.options.startInSourceMode) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, 'sourceMode');
                _dom__WEBPACK_IMPORTED_MODULE_0__.hide(this.wysiwygEditor);
            }
            else {
                _dom__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, 'wysiwygMode');
                _dom__WEBPACK_IMPORTED_MODULE_0__.hide(this.sourceEditor);
            }
            if (!this.options.spellcheck) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.editorContainer, 'spellcheck', 'false');
            }
            if (globalWin.location.protocol === 'https:') {
                _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygEditor, 'src', 'about:blank');
            }
            // Add the editor to the container
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, this.wysiwygEditor);
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, this.sourceEditor);
            // TODO: make this optional somehow
            this.dimensions(this.options.width || _dom__WEBPACK_IMPORTED_MODULE_0__.width(this.textarea), this.options.height || _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.textarea));
            // Add ios to HTML so can apply CSS fix to only it
            let className = _browser_js__WEBPACK_IMPORTED_MODULE_8__.ios ? ' ios' : '';
            this.wysiwygDocument = this.wysiwygEditor.contentDocument;
            this.wysiwygDocument.open();
            this.wysiwygDocument.write((0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('html', {
                attrs: ' class="' + className + '"',
                spellcheck: this.options.spellcheck ? '' : 'spellcheck="false"',
                charset: this.options.charset,
                style: this.options.style
            }));
            this.wysiwygDocument.close();
            this.wysiwygBody = this.wysiwygDocument.body;
            this.wysiwygWindow = this.wysiwygEditor.contentWindow;
            this.readOnly(!!this.options.readOnly);
            // iframe overflow fix for iOS
            if (_browser_js__WEBPACK_IMPORTED_MODULE_8__.ios) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.wysiwygBody, '100%');
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'touchend', null, this.focus);
            }
            let tabIndex = _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.textarea, 'tabindex');
            _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.sourceEditor, 'tabindex', tabIndex);
            _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygEditor, 'tabindex', tabIndex);
            this.rangeHelper = new _rangeHelper__WEBPACK_IMPORTED_MODULE_5__.RangeHelper(this.wysiwygWindow, null, this.sanitize);
            // load any textarea value into the editor
            _dom__WEBPACK_IMPORTED_MODULE_0__.hide(this.textarea);
            this.val(this.textarea.value);
            let placeholder = this.options.placeholder ||
                _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.textarea, 'placeholder');
            if (placeholder) {
                this.sourceEditor.placeholder = placeholder;
                _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygBody, 'placeholder', placeholder);
            }
        };
        /**
         * Initialises options
         * @private
         */
        this.initOptions = () => {
            // auto-update original textbox on blur if option set to true
            if (this.options.autoUpdate) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'blur', null, this.autoUpdate);
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(this.sourceEditor, 'blur', null, this.autoUpdate);
            }
            if (this.options.rtl === null) {
                this.options.rtl = _dom__WEBPACK_IMPORTED_MODULE_0__.css(this.sourceEditor, 'direction') === 'rtl';
            }
            this.rtl(!!this.options.rtl);
            if (this.options.autoExpand) {
                // Need to update when images (or anything else) loads
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'load', null, this.autoExpand, _dom__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'input keyup', null, this.autoExpand);
            }
            if (this.options.resizeEnabled) {
                this.initResize();
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.editorContainer, 'id', this.options.id);
            this.emoticons(this.options.emoticonsEnabled);
        };
        /**
         * Initialises events
         * @private
         */
        this.initEvents = () => {
            let thisEditor = this;
            let form = thisEditor.textarea.form;
            let compositionEvents = 'compositionstart compositionend';
            let eventsToForward = 'keydown keyup keypress focus blur contextmenu input';
            let checkSelectionEvents = 'onselectionchange' in thisEditor.wysiwygDocument ?
                'selectionchange' :
                'keyup focus blur contextmenu mouseup touchend click';
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, 'click', null, thisEditor.handleDocumentClick);
            if (form) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(form, 'reset', null, thisEditor.handleFormReset);
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(form, 'submit', null, thisEditor.setTextareaValue, _dom__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pagehide', null, thisEditor.setTextareaValue);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pageshow', null, thisEditor.handleFormReset);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keypress', null, thisEditor.handleKeyPress);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keydown', null, thisEditor.handleKeyDown);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keydown', null, thisEditor.handleBackSpace);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.appendNewLine);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'blur', null, thisEditor.valueChangedBlur);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.valueChangedKeyUp);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'paste', null, thisEditor.handlePasteEvt);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'cut copy', null, thisEditor.handleCutCopyEvt);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, compositionEvents, null, thisEditor.handleComposition);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, checkSelectionEvents, null, thisEditor.checkSelectionChanged);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, eventsToForward, null, thisEditor.handleEvent);
            if (thisEditor.options.emoticonsCompat && globalWin.getSelection) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.emoticonsCheckWhitespace);
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'blur', null, () => {
                if (!thisEditor.val()) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.addClass(thisEditor.wysiwygBody, 'placeholder');
                }
            });
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'focus', null, () => {
                _dom__WEBPACK_IMPORTED_MODULE_0__.removeClass(thisEditor.wysiwygBody, 'placeholder');
            });
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, 'blur', null, thisEditor.valueChangedBlur);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, 'keyup', null, thisEditor.valueChangedKeyUp);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, 'keydown', null, thisEditor.handleKeyDown);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, compositionEvents, null, thisEditor.handleComposition);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, eventsToForward, null, thisEditor.handleEvent);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygDocument, 'mousedown', null, thisEditor.handleMouseDown);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygDocument, checkSelectionEvents, null, thisEditor.checkSelectionChanged);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygDocument, 'keyup', null, thisEditor.appendNewLine);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.editorContainer, 'selectionchanged', null, thisEditor.checkNodeChanged);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.editorContainer, 'selectionchanged', null, thisEditor.updateActiveButtons);
            // Custom events to forward
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.editorContainer, 'selectionchanged valuechanged nodechanged pasteraw paste', null, thisEditor.handleEvent);
        };
        /**
         * Creates the toolbar and appends it to the container
         * @private
         */
        this.initToolBar = () => {
            let thisEditor = this;
            let group;
            let commands = thisEditor.commands;
            let exclude = (thisEditor.options.toolbarExclude || '').split(',');
            let groups = thisEditor.options.toolbar.split('|');
            thisEditor.toolbar = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-toolbar',
                unselectable: 'on'
            });
            if (thisEditor.options.icons in _a.icons) {
                thisEditor.icons = new _a.icons[thisEditor.options.icons]();
            }
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(groups, (_, menuItems) => {
                group = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                    className: 'emleditor-group'
                });
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(menuItems.split(','), (_, commandName) => {
                    let button, shortcut, command = commands[commandName];
                    // The commandName must be a valid command and not excluded
                    if (!command || exclude.indexOf(commandName) > -1) {
                        return;
                    }
                    shortcut = command.shortcut;
                    button = (0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('toolbarButton', {
                        name: commandName,
                        dispName: thisEditor.translate(command.name ||
                            command.tooltip || commandName)
                    }, true).firstChild;
                    if (thisEditor.icons && thisEditor.icons.create) {
                        let icon = thisEditor.icons.create(commandName);
                        if (icon) {
                            _dom__WEBPACK_IMPORTED_MODULE_0__.insertBefore(thisEditor.icons.create(commandName), button.firstChild);
                            _dom__WEBPACK_IMPORTED_MODULE_0__.addClass(button, 'has-icon');
                        }
                    }
                    button._emlTxtMode = !!command.txtExec;
                    button._emlWysiwygMode = !!command.exec;
                    _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', !command.exec);
                    _dom__WEBPACK_IMPORTED_MODULE_0__.on(button, 'click', null, (e) => {
                        if (!_dom__WEBPACK_IMPORTED_MODULE_0__.hasClass(button, 'disabled')) {
                            thisEditor.handleCommand(button, command);
                        }
                        thisEditor.updateActiveButtons();
                        e.preventDefault();
                    });
                    // Prevent editor losing focus when button clicked
                    _dom__WEBPACK_IMPORTED_MODULE_0__.on(button, 'mousedown', null, (e) => {
                        thisEditor.closeDropDown();
                        e.preventDefault();
                    });
                    if (command.tooltip) {
                        _dom__WEBPACK_IMPORTED_MODULE_0__.attr(button, 'title', thisEditor.translate(command.tooltip) +
                            (shortcut ? ' (' + shortcut + ')' : ''));
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
                    }
                    else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(command.exec)) {
                        thisEditor.btnStateHandlers.push({
                            name: commandName,
                            state: command.exec
                        });
                    }
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(group, button);
                    thisEditor.toolbarButtons[commandName] = button;
                });
                // Exclude empty groups
                if (group.firstChild) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.toolbar, group);
                }
            });
            // Append the toolbar to the toolbarContainer option if given
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.options.toolbarContainer || thisEditor.editorContainer, thisEditor.toolbar);
        };
        /**
         * Creates the resizer.
         * @private
         */
        this.initResize = () => {
            let minHeight, maxHeight, minWidth, maxWidth, mouseMoveFunc, mouseUpFunc, grip = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-grip'
            }), 
            // Cover is used to cover the editor iframe so document
            // still gets mouse move events
            cover = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-resize-cover'
            }), moveEvents = 'touchmove mousemove', endEvents = 'touchcancel touchend mouseup', startX = 0, startY = 0, newX = 0, newY = 0, startWidth = 0, startHeight = 0, origWidth = _dom__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer), origHeight = _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer), isDragging = false, rtl = this.rtl();
            minHeight = this.options.resizeMinHeight || origHeight / 1.5;
            maxHeight = this.options.resizeMaxHeight || origHeight * 2.5;
            minWidth = this.options.resizeMinWidth || origWidth / 1.25;
            maxWidth = this.options.resizeMaxWidth || origWidth * 1.25;
            mouseMoveFunc = (e) => {
                // iOS uses window.event
                if (e.type === 'touchmove') {
                    let touchEvent = e;
                    newX = touchEvent.changedTouches[0].pageX;
                    newY = touchEvent.changedTouches[0].pageY;
                }
                else {
                    let mouseEvent = e;
                    newX = mouseEvent.pageX;
                    newY = mouseEvent.pageY;
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
            mouseUpFunc = (e) => {
                if (!isDragging) {
                    return;
                }
                isDragging = false;
                _dom__WEBPACK_IMPORTED_MODULE_0__.hide(cover);
                _dom__WEBPACK_IMPORTED_MODULE_0__.removeClass(this.editorContainer, 'resizing');
                _dom__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, moveEvents, null, mouseMoveFunc);
                _dom__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, endEvents, null, mouseUpFunc);
                e.preventDefault();
            };
            if (this.icons && this.icons.create) {
                let icon = this.icons.create('grip');
                if (icon) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(grip, icon);
                    _dom__WEBPACK_IMPORTED_MODULE_0__.addClass(grip, 'has-icon');
                }
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, grip);
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, cover);
            _dom__WEBPACK_IMPORTED_MODULE_0__.hide(cover);
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(grip, 'touchstart mousedown', null, (e) => {
                // iOS uses window.event
                if (e.type === 'touchstart') {
                    let te = e;
                    startX = te.touches[0].pageX;
                    startY = te.touches[0].pageY;
                }
                else {
                    let me = e;
                    startX = me.pageX;
                    startY = me.pageY;
                }
                startWidth = _dom__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer);
                startHeight = _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer);
                isDragging = true;
                _dom__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, 'resizing');
                _dom__WEBPACK_IMPORTED_MODULE_0__.show(cover);
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, moveEvents, null, mouseMoveFunc);
                _dom__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, endEvents, null, mouseUpFunc);
                e.preventDefault();
            });
        };
        /**
         * Prefixes and preloads the emoticon images
         * @private
         */
        this.initEmoticons = () => {
            let thisEditor = this;
            let emoticons = this.options.emoticons;
            let root = this.options.emoticonsRoot || '';
            if (emoticons) {
                this.allEmoticons = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend({}, emoticons.more, emoticons.dropdown, emoticons.hidden);
            }
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(this.allEmoticons, (key, url) => {
                thisEditor.allEmoticons[key] = (0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('emoticon', {
                    key: key,
                    // Prefix emoticon root to emoticon urls
                    url: root + (url.url || url),
                    tooltip: url.tooltip || key
                });
                // Preload the emoticon
                if (thisEditor.options.emoticonsEnabled) {
                    thisEditor.preLoadCache.push(_dom__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
                        src: root + (url.url || url)
                    }));
                }
            });
        };
        /**
         * Autofocus the editor
         * @private
         */
        this.autofocus = (focusEnd) => {
            let range, txtPos;
            let node = this.wysiwygBody.firstChild;
            // Can't focus invisible elements
            if (!_dom__WEBPACK_IMPORTED_MODULE_0__.isVisible(this.editorContainer)) {
                return;
            }
            if (this.sourceMode()) {
                txtPos = focusEnd ? this.sourceEditor.value.length : 0;
                this.sourceEditor.setSelectionRange(txtPos, txtPos);
                return;
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.removeWhiteSpace(this.wysiwygBody);
            if (focusEnd) {
                let lastChild = this.wysiwygBody.lastChild;
                if (!(node = lastChild)) {
                    node = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, this.wysiwygDocument);
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, node);
                }
                while (node.lastChild) {
                    node = node.lastChild;
                    // Should place the cursor before the last <br>
                    if (_dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'br') && node.previousSibling) {
                        node = node.previousSibling;
                    }
                }
            }
            range = this.wysiwygDocument.createRange();
            if (!_dom__WEBPACK_IMPORTED_MODULE_0__.canHaveChildren(node)) {
                range.setStartBefore(node);
                if (focusEnd) {
                    range.setStartAfter(node);
                }
            }
            else {
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
        this.autoExpand = () => {
            if (this.options.autoExpand && !this.autoExpandThrottle) {
                this.autoExpandThrottle = setTimeout(this.expandToContent, 200);
            }
        };
        /**
         * Handles any document click and closes the dropdown if open
         * @private
         */
        this.handleDocumentClick = (e) => {
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
        this.handleCutCopyEvt = (e) => {
            let range = this.rangeHelper.selectedRange();
            if (range) {
                let container = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, this.wysiwygDocument);
                let firstParent;
                // Copy all inline parent nodes up to the first block parent so can
                // copy inline styles
                let parent = range.commonAncestorContainer;
                while (parent && _dom__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true)) {
                    if (parent.nodeType === _dom__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE) {
                        let clone = parent.cloneNode();
                        if (container.firstChild) {
                            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(clone, container.firstChild);
                        }
                        _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(container, clone);
                        firstParent = firstParent || clone;
                    }
                    parent = parent.parentNode;
                }
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(firstParent || container, range.cloneContents());
                _dom__WEBPACK_IMPORTED_MODULE_0__.removeWhiteSpace(container);
                e.clipboardData.setData('text/html', container.innerHTML);
                // TODO: Refactor into private shared module with plaintext plugin
                // innerText adds two newlines after <p> tags so convert them to
                // <div> tags
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom__WEBPACK_IMPORTED_MODULE_0__.find(container, 'p'), (_, elm) => {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.convertElement(elm, 'div');
                });
                // Remove collapsed <br> tags as innerText converts them to newlines
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom__WEBPACK_IMPORTED_MODULE_0__.find(container, 'br'), (_, elm) => {
                    if (!elm.nextSibling || !_dom__WEBPACK_IMPORTED_MODULE_0__.isInline(elm.nextSibling, true)) {
                        _dom__WEBPACK_IMPORTED_MODULE_0__.remove(elm);
                    }
                });
                // range.toString() doesn't include newlines so can't use this.
                // selection.toString() seems to use the same method as innerText
                // but needs to be normalised first so using container.innerText
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, container);
                e.clipboardData.setData('text/plain', container.innerText);
                _dom__WEBPACK_IMPORTED_MODULE_0__.remove(container);
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
        this.handlePasteEvt = (e) => {
            const IMAGE_MIME_REGEX = /^image\/(p?jpe?g|gif|png|bmp)$/i;
            let editorContext = this;
            let editable = editorContext.wysiwygBody;
            let clipboard = e.clipboardData;
            let loadImage = (file) => {
                let reader = new FileReader();
                reader.onload = (e) => {
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
                let data = [];
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
            }
            else if (!this.pasteContentFragment) {
                // Save the scroll position so can be restored
                // when contents is restored
                let scrollTop = editable.scrollTop;
                this.rangeHelper.saveRange();
                this.pasteContentFragment = globalDoc.createDocumentFragment();
                while (editable.firstChild) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.pasteContentFragment, editable.firstChild);
                }
                setTimeout(() => {
                    let html = editable.innerHTML;
                    editable.innerHTML = '';
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(editable, this.pasteContentFragment);
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
        this.replaceEmoticons = () => {
            if (this.options.emoticonsEnabled) {
                _emoticons__WEBPACK_IMPORTED_MODULE_9__.replace(this.wysiwygBody, this.allEmoticons, this.options.emoticonsCompat);
            }
        };
        /**
         * Gets the selected text of the source editor
         * @return {string}
         * @private
         */
        this.sourceEditorSelectedText = () => {
            this.sourceEditor.focus();
            return this.sourceEditor.value.substring(this.sourceEditor.selectionStart, this.sourceEditor.selectionEnd);
        };
        /**
         * Handles the passed command
         * @private
         */
        this.handleCommand = (caller, cmd) => {
            // check if in text mode and handle text commands
            if (this.inSourceMode()) {
                if (cmd.txtExec) {
                    if (Array.isArray(cmd.txtExec)) {
                        this.sourceEditorInsertText.apply(this, cmd.txtExec);
                    }
                    else {
                        cmd.txtExec.call(this, caller, this.sourceEditorSelectedText());
                    }
                }
            }
            else if (cmd.exec) {
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(cmd.exec)) {
                    cmd.exec.call(this, caller);
                }
                else {
                    this.execCommand(cmd.exec, Object.prototype.hasOwnProperty.call(cmd, 'execParam') ? cmd.execParam : null);
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
        this.wrapInlines = (body, doc) => {
            let wrapper;
            _dom__WEBPACK_IMPORTED_MODULE_0__.traverse(body, (node) => {
                if (_dom__WEBPACK_IMPORTED_MODULE_0__.isInline(node, true)) {
                    // Ignore text nodes unless they contain non-whitespace chars as
                    // whitespace will be collapsed.
                    // Ignore emleditor-ignore elements unless wrapping siblings
                    // Should still wrap both if wrapping siblings.
                    if (wrapper || node.nodeType === _dom__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE ?
                        /\S/.test(node.nodeValue) : !_dom__WEBPACK_IMPORTED_MODULE_0__.is(node, '.emleditor-ignore')) {
                        if (!wrapper) {
                            wrapper = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
                            _dom__WEBPACK_IMPORTED_MODULE_0__.insertBefore(wrapper, node);
                        }
                        _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(wrapper, node);
                    }
                }
                else {
                    wrapper = null;
                }
            }, false, true);
        };
        /**
         * Checks if the current selection has changed and triggers
         * the selectionchanged event if it has.
         *
         * In browsers other that don't support selectionchange event it will check
         * at most once every 100ms.
         * @private
         */
        this.checkSelectionChanged = () => {
            let thisEditor = this;
            let check = () => {
                // Don't create new selection if there isn't one (like after
                // blur event in iOS)
                if (thisEditor.wysiwygWindow.getSelection() &&
                    thisEditor.wysiwygWindow.getSelection().rangeCount <= 0) {
                    thisEditor.currentSelection = null;
                    // rangeHelper could be null if editor was destroyed
                    // before the timeout had finished
                }
                else if (thisEditor.rangeHelper && !thisEditor.rangeHelper.compare(thisEditor.currentSelection)) {
                    thisEditor.currentSelection = thisEditor.rangeHelper.cloneSelected();
                    // If the selection is in an inline wrap it in a block.
                    // Fixes #331
                    if (thisEditor.currentSelection && thisEditor.currentSelection.collapsed) {
                        let parent = thisEditor.currentSelection.startContainer;
                        let offset = thisEditor.currentSelection.startOffset;
                        // Handle if selection is placed before/after an element
                        if (offset && parent.nodeType !== _dom__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE) {
                            parent = parent.childNodes[offset];
                        }
                        while (parent && parent.parentNode !== thisEditor.wysiwygBody) {
                            parent = parent.parentNode;
                        }
                        if (parent && _dom__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true)) {
                            thisEditor.rangeHelper.saveRange();
                            thisEditor.wrapInlines(thisEditor.wysiwygBody, thisEditor.wysiwygDocument);
                            thisEditor.rangeHelper.restoreRange();
                        }
                    }
                    _dom__WEBPACK_IMPORTED_MODULE_0__.trigger(thisEditor.editorContainer, 'selectionchanged');
                }
                thisEditor.isSelectionCheckPending = false;
            };
            if (thisEditor.isSelectionCheckPending) {
                return;
            }
            thisEditor.isSelectionCheckPending = true;
            // Don't need to limit checking if browser supports the Selection API
            if ('onselectionchange' in thisEditor.wysiwygDocument) {
                check();
            }
            else {
                setTimeout(check, 100);
            }
        };
        /**
         * Handles any key press in the WYSIWYG editor
         *
         * @private
         */
        this.handleKeyPress = (e) => {
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
                if (!_dom__WEBPACK_IMPORTED_MODULE_0__.is(this.currentBlockNode, LIST_TAGS) &&
                    _dom__WEBPACK_IMPORTED_MODULE_0__.hasStyling(this.currentBlockNode)) {
                    let br = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('br', {}, this.wysiwygDocument);
                    this.rangeHelper.insertNode(br);
                    // Last <br> of a block will be collapsed  so need to make sure
                    // the <br> that was inserted isn't the last node of a block.
                    let parent = br.parentNode;
                    let lastChild = parent.lastChild;
                    // Sometimes an empty next node is created after the <br>
                    if (lastChild && lastChild.nodeType === _dom__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE &&
                        lastChild.nodeValue === '') {
                        _dom__WEBPACK_IMPORTED_MODULE_0__.remove(lastChild);
                        lastChild = parent.lastChild;
                    }
                    // If this is the last BR of a block and the previous
                    // sibling is inline then will need an extra BR. This
                    // is needed because the last BR of a block will be
                    // collapsed. Fixes issue #248
                    if (!_dom__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true) && lastChild === br &&
                        _dom__WEBPACK_IMPORTED_MODULE_0__.isInline(br.previousSibling)) {
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
        this.appendNewLine = () => {
            // Check all nodes in reverse until either add a new line
            // or reach a non-empty textnode or BR at which point can
            // stop checking.
            _dom__WEBPACK_IMPORTED_MODULE_0__.rTraverse(this.wysiwygBody, (node) => {
                // Last block, add new line after if has styling
                if (node.nodeType === _dom__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE &&
                    !/inline/.test(_dom__WEBPACK_IMPORTED_MODULE_0__.css(node, 'display'))) {
                    // Add line break after if has styling
                    if (!_dom__WEBPACK_IMPORTED_MODULE_0__.is(node, '.emleditor-nlf') && _dom__WEBPACK_IMPORTED_MODULE_0__.hasStyling(node)) {
                        let paragraph = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, this.wysiwygDocument);
                        paragraph.className = 'emleditor-nlf';
                        paragraph.innerHTML = '<br />';
                        _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, paragraph);
                        return false;
                    }
                }
                // Last non-empty text node or line break.
                // No need to add line-break after them
                if ((node.nodeType === 3 && !/^\s*$/.test(node.nodeValue)) ||
                    _dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'br')) {
                    return false;
                }
            });
        };
        /**
         * Handles form reset event
         * @private
         */
        this.handleFormReset = () => {
            this.val(this.textarea.value);
        };
        /**
         * Handles any mousedown press in the WYSIWYG editor
         * @private
         */
        this.handleMouseDown = () => {
            this.closeDropDown();
        };
        /**
         * Passes events on to any handlers
         * @private
         * @return void
         */
        this.handleEvent = (e) => {
            if (this.pluginManager) {
                // Send event to all plugins
                this.pluginManager.call(e.type + 'Event', e, this);
            }
            // convert the event into a custom event to send
            let name = (e.target === this.sourceEditor ? 'emlsrc' : 'emlwys') + e.type;
            if (this.eventHandlers[name]) {
                this.eventHandlers[name].forEach((fn) => {
                    fn.call(this, e);
                });
            }
        };
        /**
         * Emoticons keypress handler
         * @private
         */
        this.emoticonsKeyPress = (e) => {
            let replacedEmoticon, cachePos = 0, emoticonsCache = this.emoticonsCache, curChar = String.fromCharCode(e.which);
            // TODO: Make configurable
            if (_dom__WEBPACK_IMPORTED_MODULE_0__.closest(this.currentBlockNode, 'code')) {
                return;
            }
            if (!emoticonsCache) {
                emoticonsCache = [];
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(this.allEmoticons, (key, html) => {
                    emoticonsCache[cachePos++] = [key, html];
                });
                emoticonsCache.sort((a, b) => {
                    return a[0].length - b[0].length;
                });
                this.emoticonsCache = emoticonsCache;
                this.longestEmoticonCode =
                    emoticonsCache[emoticonsCache.length - 1][0].length;
            }
            replacedEmoticon = this.rangeHelper.replaceKeyword(this.emoticonsCache, true, true, this.longestEmoticonCode, this.options.emoticonsCompat, curChar);
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
        this.emoticonsCheckWhitespace = () => {
            _emoticons__WEBPACK_IMPORTED_MODULE_9__.checkWhitespace(this.currentBlockNode, this.rangeHelper);
        };
        /**
         * Handles the keydown event, used for shortcuts
         * @private
         */
        this.handleKeyDown = (e) => {
            let thisEditor = this;
            let shortcut = [], SHIFT_KEYS = {
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
            }, SPECIAL_KEYS = {
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
            }, NUMPAD_SHIFT_KEYS = {
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
                }
                else if (SHIFT_KEYS[character]) {
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
        this.handleBackSpace = (e) => {
            let node, offset, range, parent;
            // 8 is the backspace key
            if (this.options.disableBlockRemove || e.which !== 8 ||
                !(range = this.rangeHelper.selectedRange())) {
                return;
            }
            node = range.startContainer;
            offset = range.startOffset;
            if (offset !== 0 || !(parent = this.currentStyledBlockNode()) ||
                _dom__WEBPACK_IMPORTED_MODULE_0__.is(parent, 'body')) {
                return;
            }
            while (node !== parent) {
                while (node.previousSibling) {
                    node = node.previousSibling;
                    // Everything but empty text nodes before the cursor
                    // should prevent the style from being removed
                    if (node.nodeType !== _dom__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE || node.nodeValue) {
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
        this.currentStyledBlockNode = () => {
            let block = this.currentBlockNode;
            while (!_dom__WEBPACK_IMPORTED_MODULE_0__.hasStyling(block) || _dom__WEBPACK_IMPORTED_MODULE_0__.isInline(block, true)) {
                if (!(block = block.parentNode) || _dom__WEBPACK_IMPORTED_MODULE_0__.is(block, 'body')) {
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
        this.hasHandler = false;
        this.triggerValueChanged = (saveRange) => {
            let lastVal;
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
                _dom__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'valuechanged', {
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
        this.valueChangedBlur = () => {
            if (this.valueChangedKeyUpTimer) {
                this.triggerValueChanged();
            }
        };
        /**
         * Should be called whenever there is a keypress event
         * @param  {Event} e The keypress event
         * @private
         */
        this.valueChangedKeyUp = (e) => {
            let thisEditor = this;
            let which = e.which;
            let lastChar = which;
            let triggerNext;
            let lastWasSpace = (lastChar === 13 || lastChar === 32);
            let lastWasDelete = (lastChar === 8 || lastChar === 46);
            if (thisEditor.isComposing) {
                return;
            }
            // 13 = return & 32 = space
            if (which === 13 || which === 32) {
                if (!lastWasSpace) {
                    thisEditor.triggerValueChanged();
                }
                else {
                    triggerNext = true;
                }
                // 8 = backspace & 46 = del
            }
            else if (which === 8 || which === 46) {
                if (!lastWasDelete) {
                    thisEditor.triggerValueChanged();
                }
                else {
                    triggerNext = true;
                }
            }
            else if (triggerNext) {
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
        this.handleComposition = (e) => {
            this.isComposing = /start/i.test(e.type);
            if (!this.isComposing) {
                this.triggerValueChanged();
            }
        };
        this.autoUpdate = () => {
            this.setTextareaValue();
        };
        /**
         * Sanitize HTML to avoid XSS
         *
         * @param {string} html
         * @return {string} html
         * @private
         */
        this.sanitize = (html) => {
            const allowedTags = ['iframe'].concat(this.options.allowedTags);
            const allowedAttrs = ['allowfullscreen', 'frameborder', 'target']
                .concat(this.options.allowedAttributes);
            return this.domPurify.sanitize(html, {
                ADD_TAGS: allowedTags,
                ADD_ATTR: allowedAttrs
            });
        };
        /**
         * Gets the pasted data, filters it and then inserts it.
         * @param {Object} data
         * @private
         */
        this.handlePasteData = (data) => {
            let pasteArea = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, this.wysiwygDocument);
            this.pluginManager.call('pasteRaw', data);
            _dom__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'pasteraw', data);
            if (data.html) {
                // Sanitize again in case plugins modified the HTML
                pasteArea.innerHTML = this.sanitize(data.html);
                // fix any invalid nesting
                _dom__WEBPACK_IMPORTED_MODULE_0__.fixNesting(pasteArea);
            }
            else {
                pasteArea.innerHTML = _escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(data.text || '');
            }
            let paste = {
                val: pasteArea.innerHTML
            };
            if ('fragmentToSource' in this.format) {
                paste.val = this.format
                    .fragmentToSource(paste.val, this.wysiwygDocument, this.currentNode);
            }
            this.pluginManager.call('paste', paste);
            _dom__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'paste', paste);
            if ('fragmentToHtml' in this.format) {
                paste.val = this.format
                    .fragmentToHtml(paste.val, this.currentNode);
            }
            this.pluginManager.call('pasteHtml', paste);
            let parent = this.rangeHelper.getFirstBlockParent();
            this.wysiwygEditorInsertHtml(paste.val, null, true);
            _dom__WEBPACK_IMPORTED_MODULE_0__.merge(parent);
        };
        this.textarea = textarea;
        this.options = this.editorOptions = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"], userOptions);
        this.commands = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, (userOptions.commands || _defaultCommands__WEBPACK_IMPORTED_MODULE_3__["default"]));
        // Don't deep extend emoticons (fixes #565)
        this.editorOptions.emoticons = userOptions.emoticons || _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"].emoticons;
        if (!Array.isArray(this.options.allowedIframeUrls)) {
            this.options.allowedIframeUrls = [];
        }
        this.options.allowedIframeUrls.push('https://www.youtube-nocookie.com/embed/');
        // Create new instance of DOMPurify for each editor instance so can
        // have different allowed iframe URLs
        // eslint-disable-next-line new-cap
        this.domPurify = dompurify__WEBPACK_IMPORTED_MODULE_10___default()();
        // Allow iframes for things like YouTube, see:
        // https://github.com/cure53/DOMPurify/issues/340#issuecomment-670758980
        this.domPurify.addHook('uponSanitizeElement', (node, data) => {
            let allowedUrls = this.options.allowedIframeUrls;
            if (data.tagName === 'iframe') {
                let src = _dom__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'src') || '';
                for (let i = 0; i < allowedUrls.length; i++) {
                    let url = allowedUrls[i];
                    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(url) && src.substr(0, url.length) === url) {
                        return;
                    }
                    // Handle regex
                    if (url.test && url.test(src)) {
                        return;
                    }
                }
                // No match so remove
                _dom__WEBPACK_IMPORTED_MODULE_0__.remove(node);
            }
        });
        // Convert target attribute into data-eml-target attributes so XHTML format
        // can allow them
        this.domPurify.addHook('afterSanitizeAttributes', (node) => {
            if ('target' in node) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'data-eml-target', _dom__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'target'));
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.removeAttr(node, 'target');
        });
        // run the initializer
        this.init();
    }
    /**
     * Switches between the WYSIWYG and source modes
     *
     * @function
     * @name toggleSourceMode
     * @since 1.4.0
     * @memberOf EmlEditor.prototype
     */
    toggleSourceMode() {
        let isInSourceMode = this.inSourceMode();
        // don't allow switching to WYSIWYG if doesn't support it
        if (!_browser_js__WEBPACK_IMPORTED_MODULE_8__.isWysiwygSupported && isInSourceMode) {
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
        }
        else {
            this.setSourceEditorValue(this.getWysiwygEditorValue());
        }
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggle(this.sourceEditor);
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggle(this.wysiwygEditor);
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(this.editorContainer, 'wysiwygMode', isInSourceMode);
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(this.editorContainer, 'sourceMode', !isInSourceMode);
        this.updateToolBar();
        this.updateActiveButtons();
    }
    ;
    /**
    * If the editor is in source code mode
    *
    * @return {boolean}
    * @function
    * @name inSourceMode
    * @memberOf EmlEditor.prototype
    */
    inSourceMode() {
        return _dom__WEBPACK_IMPORTED_MODULE_0__.hasClass(this.editorContainer, 'sourceMode');
    }
    ;
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
    CurrentNode() {
        return this.currentNode;
    }
    ;
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
    CurrentBlockNode() {
        return this.currentBlockNode;
    }
    ;
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
    blur(handler, excludeWysiwyg, excludeSource) {
        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
            this.bind('blur', handler, excludeWysiwyg, excludeSource);
        }
        else if (!this.sourceMode()) {
            this.wysiwygBody.blur();
        }
        else {
            this.sourceEditor.blur();
        }
        return this;
    }
    ;
    /**
     * Sets the text editor value
     *
     * @param {string} value
     * @function
     * @name setSourceEditorValue
     * @memberOf EmlEditor.prototype
     */
    setSourceEditorValue(value) {
        this.sourceEditor.value = value;
        this.triggerValueChanged();
    }
    ;
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
    val(val, filter = true) {
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(val)) {
            return this.inSourceMode() ?
                this.getSourceEditorValue(false) :
                this.getWysiwygEditorValue(filter);
        }
        if (!this.inSourceMode()) {
            if (filter !== false && 'toHtml' in this.format) {
                val = this.format.toHtml(val);
            }
            this.setWysiwygEditorValue(val);
        }
        else {
            this.setSourceEditorValue(val);
        }
        return this;
    }
    ;
    /**
     * Updates the textarea that the editor is replacing
     * with the value currently inside the editor.
     *
     * @function
     * @name setTextareaValue
     * @since 1.4.0
     * @memberOf EmlEditor.prototype
     */
    setTextareaValue() {
        //TODO
        this.textarea.value = this.val();
    }
    ;
    /**
     * Sets the WYSIWYG HTML editor value. Should only be the HTML
     * contained within the body tags
     *
     * @param {string} value
     * @function
     * @name setWysiwygEditorValue
     * @memberOf EmlEditor.prototype
     */
    setWysiwygEditorValue(value) {
        if (!value) {
            value = '<p><br /></p>';
        }
        this.wysiwygBody.innerHTML = this.sanitize(value);
        this.replaceEmoticons();
        this.appendNewLine();
        this.triggerValueChanged();
        this.autoExpand();
    }
    ;
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
    getSourceEditorValue(filter) {
        let val = this.sourceEditor.value;
        if (filter !== false && 'toHtml' in this.format) {
            val = this.format.toHtml(val);
        }
        return val;
    }
    ;
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
    dimensions(width, height, save) {
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
            _dom__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer, width);
        }
        if (height !== false) {
            if (save !== false) {
                this.options.height = height;
            }
            _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer, height);
        }
        return this;
    }
    ;
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
    readOnly(readOnly) {
        if (typeof readOnly !== 'boolean') {
            return !this.sourceEditor.readOnly;
        }
        this.wysiwygBody.contentEditable = (!readOnly).toString();
        this.sourceEditor.readOnly = !readOnly;
        this.updateToolBar(readOnly);
        return this;
    }
    ;
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
    focus(handler, excludeWysiwyg, excludeSource) {
        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
            this.bind('focus', handler, excludeWysiwyg, excludeSource);
        }
        else if (!this.inSourceMode()) {
            // Already has focus so do nothing
            if (_dom__WEBPACK_IMPORTED_MODULE_0__.find(this.wysiwygDocument, ':focus').length) {
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
                if (container && container.childNodes.length === 1 && _dom__WEBPACK_IMPORTED_MODULE_0__.is(container.firstChild, 'br')) {
                    rng.setStartBefore(container.firstChild);
                    rng.collapse(true);
                    this.rangeHelper.selectRange(rng);
                }
            }
            this.wysiwygWindow.focus();
            this.wysiwygBody.focus();
        }
        else {
            this.sourceEditor.focus();
        }
        this.updateActiveButtons();
        return this;
    }
    ;
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
    expandToContent(ignoreMaxHeight) {
        if (this.maximize()) {
            return;
        }
        clearTimeout(this.autoExpandThrottle);
        this.autoExpandThrottle = false;
        if (!this.autoExpandBounds) {
            let height = this.options.resizeMinHeight || this.options.height ||
                _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.textarea);
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
    }
    ;
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
    rtl(rtl) {
        let dir = rtl ? 'rtl' : 'ltr';
        if (typeof rtl !== 'boolean') {
            return _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.sourceEditor, 'dir') === 'rtl';
        }
        _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygBody, 'dir', dir);
        _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this.sourceEditor, 'dir', dir);
        _dom__WEBPACK_IMPORTED_MODULE_0__.removeClass(this.editorContainer, 'rtl');
        _dom__WEBPACK_IMPORTED_MODULE_0__.removeClass(this.editorContainer, 'ltr');
        _dom__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, dir);
        if (this.icons && this.icons.rtl) {
            this.icons.rtl(rtl);
        }
        return this;
    }
    ;
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
    emoticons(enable) {
        let thisEditor = this;
        if (!enable && enable !== false) {
            return this.options.emoticonsEnabled;
        }
        thisEditor.options.emoticonsEnabled = enable;
        if (enable) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keypress', null, thisEditor.emoticonsKeyPress);
            if (!thisEditor.sourceMode()) {
                thisEditor.rangeHelper.saveRange();
                thisEditor.replaceEmoticons();
                thisEditor.triggerValueChanged(false);
                thisEditor.rangeHelper.restoreRange();
            }
        }
        else {
            let emoticons = _dom__WEBPACK_IMPORTED_MODULE_0__.find(thisEditor.wysiwygBody, 'img[data-emleditor-emoticon]');
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, (_, img) => {
                let text = _dom__WEBPACK_IMPORTED_MODULE_0__.data(img, 'emleditor-emoticon');
                let textNode = thisEditor.wysiwygDocument.createTextNode(text);
                img.parentNode.replaceChild(textNode, img);
            });
            _dom__WEBPACK_IMPORTED_MODULE_0__.off(thisEditor.wysiwygBody, 'keypress', null, thisEditor.emoticonsKeyPress);
            thisEditor.triggerValueChanged();
        }
        return thisEditor;
    }
    ;
    /**
     * Sets if the editor is in sourceMode
     *
     * @param {boolean} enable
     * @return {this}
     * @function
     * @name sourceMode^2
     * @memberOf EmlEditor.prototype
     */
    sourceMode(enable) {
        let inSourceMode = this.inSourceMode();
        if (typeof enable !== 'boolean') {
            return inSourceMode;
        }
        if ((inSourceMode && !enable) || (!inSourceMode && enable)) {
            this.toggleSourceMode();
        }
        return this;
    }
    ;
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
    width(width, saveWidth) {
        if (!width && width !== 0) {
            return _dom__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer);
        }
        this.dimensions(width, null, saveWidth);
        return this;
    }
    ;
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
    height(height, saveHeight) {
        if (!height && height !== 0) {
            return _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer);
        }
        this.dimensions(null, height, saveHeight);
        return this;
    }
    ;
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
    createDropDown(menuItem, name, content) {
        // first click for create second click for close
        let dropDownCss, dropDownClass = 'emleditor-' + name;
        let thisEditor = this;
        thisEditor.closeDropDown();
        // Only close the dropdown if it was already open
        if (thisEditor.dropdown && _dom__WEBPACK_IMPORTED_MODULE_0__.hasClass(thisEditor.dropdown, dropDownClass)) {
            return;
        }
        dropDownCss = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend({
            top: menuItem.offsetTop,
            left: menuItem.offsetLeft,
            marginTop: menuItem.clientHeight
        }, thisEditor.options.dropDownCss);
        thisEditor.dropdown = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
            className: 'emleditor-dropdown ' + dropDownClass
        });
        _dom__WEBPACK_IMPORTED_MODULE_0__.css(thisEditor.dropdown, dropDownCss);
        _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.dropdown, content);
        _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.editorContainer, thisEditor.dropdown);
        _dom__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.dropdown, 'click focusin', null, (e) => {
            // stop clicks within the dropdown from being handled
            e.stopPropagation();
        });
        if (thisEditor.dropdown) {
            let first = _dom__WEBPACK_IMPORTED_MODULE_0__.find(thisEditor.dropdown, 'input,textarea')[0];
            if (first) {
                first.focus();
            }
        }
    }
    ;
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
    maximize(maximize) {
        let maximizeSize = 'emleditor-maximize';
        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined(maximize)) {
            return _dom__WEBPACK_IMPORTED_MODULE_0__.hasClass(this.editorContainer, maximizeSize);
        }
        maximize = !!maximize;
        if (maximize) {
            this.maximizeScrollPosition = globalWin.scrollY;
        }
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.documentElement, maximizeSize, maximize);
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.body, maximizeSize, maximize);
        _dom__WEBPACK_IMPORTED_MODULE_0__.toggleClass(this.editorContainer, maximizeSize, maximize);
        this.width(maximize ? '100%' : this.options.width, false);
        this.height(maximize ? '100%' : this.options.height, false);
        if (!maximize) {
            globalWin.scrollTo(0, this.maximizeScrollPosition);
        }
        this.autoExpand();
        return this;
    }
    ;
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
    destroy() {
        // Don't destroy if the editor has already been destroyed
        if (!this.pluginManager) {
            return;
        }
        this.pluginManager.destroy();
        this.rangeHelper = null;
        this.pluginManager = null;
        if (this.dropdown) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.remove(this.dropdown);
        }
        _dom__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, 'click', null, this.handleDocumentClick);
        let form = this.textarea.form;
        if (form) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.off(form, 'reset', null, this.handleFormReset);
            _dom__WEBPACK_IMPORTED_MODULE_0__.off(form, 'submit', null, this.setTextareaValue, _dom__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
        }
        _dom__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pagehide', null, this.setTextareaValue);
        _dom__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pageshow', null, this.handleFormReset);
        _dom__WEBPACK_IMPORTED_MODULE_0__.remove(this.sourceEditor);
        _dom__WEBPACK_IMPORTED_MODULE_0__.remove(this.toolbar);
        _dom__WEBPACK_IMPORTED_MODULE_0__.remove(this.editorContainer);
        delete this.textarea._emleditor;
        _dom__WEBPACK_IMPORTED_MODULE_0__.show(this.textarea);
        this.textarea.required = this.isRequired;
    }
    ;
    /**
     * Closes any currently open drop down
     *
     * @param {boolean} [focus=false] If to focus the editor
     *                             after closing the drop down
     * @function
     * @name closeDropDown
     * @memberOf EmlEditor.prototype
     */
    closeDropDown(focus) {
        if (this.dropdown) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.remove(this.dropdown);
            this.dropdown = null;
        }
        if (focus === true) {
            this.focus();
        }
    }
    ;
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
    wysiwygEditorInsertHtml(html, endHtml, overrideCodeBlocking) {
        let marker, scrollTop, scrollTo, editorHeight = _dom__WEBPACK_IMPORTED_MODULE_0__.height(this.wysiwygEditor);
        this.focus();
        // TODO: This code tag should be configurable and
        // should maybe convert the HTML into text instead
        // Don't apply to code elements
        if (!overrideCodeBlocking && _dom__WEBPACK_IMPORTED_MODULE_0__.closest(this.currentBlockNode, 'code')) {
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
        _dom__WEBPACK_IMPORTED_MODULE_0__.fixNesting(this.wysiwygBody);
        this.wrapInlines(this.wysiwygBody, this.wysiwygDocument);
        // Scroll the editor after the end of the selection
        marker = _dom__WEBPACK_IMPORTED_MODULE_0__.find(this.wysiwygBody, '#emleditor-end-marker')[0];
        _dom__WEBPACK_IMPORTED_MODULE_0__.show(marker);
        scrollTop = this.wysiwygBody.scrollTop;
        scrollTo = (_dom__WEBPACK_IMPORTED_MODULE_0__.getOffset(marker).top +
            (marker.offsetHeight * 1.5)) - editorHeight;
        _dom__WEBPACK_IMPORTED_MODULE_0__.hide(marker);
        // Only scroll if marker isn't already visible
        if (scrollTo > scrollTop || scrollTo + editorHeight < scrollTop) {
            this.wysiwygBody.scrollTop = scrollTo;
        }
        this.triggerValueChanged(false);
        this.rangeHelper.restoreRange();
        // Add a new line after the last block element
        // so can always add text after it
        this.appendNewLine();
    }
    ;
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
    wysiwygEditorInsertText(text, endText) {
        this.wysiwygEditorInsertHtml(_escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(text), _escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(endText));
    }
    ;
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
    insertText(text, endText) {
        if (this.inSourceMode()) {
            this.sourceEditorInsertText(text, endText);
        }
        else {
            this.wysiwygEditorInsertText(text, endText);
        }
        return this;
    }
    ;
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
    sourceEditorInsertText(text, endText) {
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
    }
    ;
    /**
     * Gets the current instance of the rangeHelper class
     * for the editor.
     *
     * @return {RangeHelper}
     * @function
     * @name getRangeHelper
     * @memberOf EmlEditor.prototype
     */
    getRangeHelper() {
        return this.rangeHelper;
    }
    ;
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
    sourceEditorCaret(position) {
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
    }
    ;
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
    insert(start, end, filter, convertEmoticons, allowMixed) {
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
    }
    ;
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
    getWysiwygEditorValue(filter) {
        let html;
        // Create a tmp node to store contents so it can be modified
        // without affecting anything else.
        let tmp = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, this.wysiwygDocument);
        let childNodes = this.wysiwygBody.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(tmp, childNodes[i].cloneNode(true));
        }
        _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, tmp);
        _dom__WEBPACK_IMPORTED_MODULE_0__.fixNesting(tmp);
        _dom__WEBPACK_IMPORTED_MODULE_0__.remove(tmp);
        html = tmp.innerHTML;
        // filter the HTML and DOM through any plugins
        if (filter !== false && Object.prototype.hasOwnProperty.call(this.format, 'toSource')) {
            html = this.format.toSource(html, this.wysiwygDocument);
        }
        return html;
    }
    ;
    /**
     * Gets the WYSIWYG editor's iFrame Body.
     *
     * @return {HTMLElement}
     * @function
     * @since 1.4.3
     * @name getBody
     * @memberOf EmlEditor.prototype
     */
    getBody() {
        return this.wysiwygBody;
    }
    ;
    /**
     * Gets the WYSIWYG editors container area (whole iFrame).
     *
     * @return {HTMLElement}
     * @function
     * @since 1.4.3
     * @name getContentAreaContainer
     * @memberOf EmlEditor.prototype
     */
    getContentAreaContainer() {
        return this.wysiwygEditor;
    }
    ;
    /**
     * Executes a command on the WYSIWYG editor
     *
     * @param {string} command
     * @param {String|Boolean} [param]
     * @function
     * @name execCommand
     * @memberOf EmlEditor.prototype
     */
    execCommand(command, param) {
        let executed = false, commandObj = this.commands[command];
        this.focus();
        // TODO: make configurable
        // don't apply any commands to code elements
        if (_dom__WEBPACK_IMPORTED_MODULE_0__.closest(this.rangeHelper.parentNode(), 'code')) {
            return;
        }
        try {
            executed = this.wysiwygDocument.execCommand(command, false, param);
        }
        catch (ex) { /* empty */ }
        // show error if execution failed and an error message exists
        if (!executed && commandObj && commandObj.errorMessage) {
            alert(this.translate(commandObj.errorMessage));
        }
        this.updateActiveButtons();
    }
    ;
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
    translate(...args) {
        let undef;
        if (this.locale && this.locale[args[0]]) {
            args[0] = this.locale[args[0]];
        }
        return args[0].replace(/\{(\d+)\}/g, (str, p1) => {
            return args[p1 - 0 + 1] !== undef ?
                args[p1 - 0 + 1] :
                '{' + p1 + '}';
        });
    }
    ;
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
    bind(events, handler, excludeWysiwyg, excludeSource) {
        let eventsArr = events.split(' ');
        let i = eventsArr.length;
        while (i--) {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
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
    }
    ;
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
    unbind(events, handler, excludeWysiwyg, excludeSource) {
        let eventsArr = events.split(' ');
        let i = eventsArr.length;
        while (i--) {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                if (!excludeWysiwyg) {
                    _utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(this.eventHandlers['emlwys' + eventsArr[i]] || [], handler);
                }
                if (!excludeSource) {
                    _utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(this.eventHandlers['emlsrc' + eventsArr[i]] || [], handler);
                }
            }
        }
        return this;
    }
    ;
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
    keyDown(handler, excludeWysiwyg, excludeSource) {
        return this.bind('keydown', handler, excludeWysiwyg, excludeSource);
    }
    ;
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
    keyPress(handler, excludeWysiwyg, excludeSource) {
        return this
            .bind('keypress', handler, excludeWysiwyg, excludeSource);
    }
    ;
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
    keyUp(handler, excludeWysiwyg, excludeSource) {
        return this.bind('keyup', handler, excludeWysiwyg, excludeSource);
    }
    ;
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
    nodeChanged(handler) {
        return this.bind('nodechanged', handler, false, true);
    }
    ;
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
    selectionChanged(handler) {
        return this.bind('selectionchanged', handler, false, true);
    }
    ;
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
    valueChanged(handler, excludeWysiwyg, excludeSource) {
        return this
            .bind('valuechanged', handler, excludeWysiwyg, excludeSource);
    }
    ;
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
    css(css) {
        if (!this.inlineCss) {
            this.inlineCss = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('style', {
                id: 'inline'
            }, this.wysiwygDocument);
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygDocument.head, this.inlineCss);
        }
        if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(css)) {
            return this.inlineCss.sheet ?
                this.inlineCss.innerText : this.inlineCss.innerHTML;
        }
        if (this.inlineCss.sheet) {
            this.inlineCss.innerText = css;
        }
        else {
            this.inlineCss.innerHTML = css;
        }
        return this;
    }
    ;
    /**
     * Removes a shortcut handler
     * @param  {string} shortcut
     * @return {EmlEditor}
     */
    removeShortcut(shortcut) {
        delete this.shortcutHandlers[shortcut.toLowerCase()];
        return this;
    }
    ;
    /**
     * Adds a shortcut handler to the editor
     * @param  {string}          shortcut
     * @param  {String|Function} cmd
     * @return {emleditor}
     */
    addShortcut(shortcut, cmd) {
        let thisEditor = this;
        shortcut = shortcut.toLowerCase();
        let shortcutKey = shortcut;
        if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(cmd)) {
            let strCmd = cmd;
            thisEditor.shortcutHandlers[shortcutKey] = () => {
                thisEditor.handleCommand(thisEditor.toolbarButtons[strCmd], thisEditor.commands[strCmd]);
                return false;
            };
        }
        else {
            thisEditor.shortcutHandlers[shortcutKey] = cmd;
        }
        return thisEditor;
    }
    ;
    /**
     * Clears the formatting of the passed block element.
     *
     * If block is false, if will clear the styling of the first
     * block level element that contains the cursor.
     * @param  {HTMLElement} block
     * @since 1.4.4
     */
    clearBlockFormatting(block) {
        block = block || this.currentStyledBlockNode();
        if (!block || _dom__WEBPACK_IMPORTED_MODULE_0__.is(block, 'body')) {
            return this;
        }
        this.rangeHelper.saveRange();
        block.className = '';
        _dom__WEBPACK_IMPORTED_MODULE_0__.attr(block, 'style', '');
        if (!_dom__WEBPACK_IMPORTED_MODULE_0__.is(block, 'p,div,td')) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.convertElement(block, 'p');
        }
        this.rangeHelper.restoreRange();
        return this;
    }
    ;
}
_a = EmlEditor;
//#endregion
/************************************************************************
 * Public static
 ************************************************************************/
//#region
// Static
EmlEditor.locale = {};
EmlEditor.formats = {};
EmlEditor.icons = {};
EmlEditor.command = {
    /**
     * Gets a command
     *
     * @param {string} name
     * @return {Object|null}
     * @since v1.3.5
     */
    get: (n) => {
        return _defaultCommands__WEBPACK_IMPORTED_MODULE_3__["default"][n] || null;
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
    set: (name, cmd) => {
        if (!name || !cmd) {
            return false;
        }
        // merge any existing command properties
        cmd = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(_defaultCommands__WEBPACK_IMPORTED_MODULE_3__["default"][name] || {}, cmd);
        cmd.remove = () => {
            _a.command.remove(name);
        };
        _defaultCommands__WEBPACK_IMPORTED_MODULE_3__["default"][name] = cmd;
        return _a;
    },
    /**
     * Removes a command
     *
     * @param {string} name
     * @return {this}
     * @since v1.3.5
     */
    remove: (name) => {
        if (_defaultCommands__WEBPACK_IMPORTED_MODULE_3__["default"][name]) {
            delete _defaultCommands__WEBPACK_IMPORTED_MODULE_3__["default"][name];
        }
        return _a;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmlEditor);


/***/ }),

/***/ "./src/lib/emoticons.ts":
/*!******************************!*\
  !*** ./src/lib/emoticons.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkWhitespace: () => (/* binding */ checkWhitespace),
/* harmony export */   replace: () => (/* binding */ replace)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/lib/dom.ts");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./escape.js */ "./src/lib/escape.js");



/**
 * Checks all emoticons are surrounded by whitespace and
 * replaces any that aren't with with their emoticon code.
 *
 * @param {HTMLElement} node
 * @param {rangeHelper} rangeHelper
 * @return {void}
 */
function checkWhitespace(node, rangeHelper) {
    let noneWsRegex = /[^\s\xA0\u2002\u2003\u2009]+/;
    let emoticons = node && _dom__WEBPACK_IMPORTED_MODULE_0__.find(node, 'img[data-emleditor-emoticon]');
    if (!node || !emoticons.length) {
        return;
    }
    for (let i = 0; i < emoticons.length; i++) {
        let emoticon = emoticons[i];
        let parent = emoticon.parentNode;
        let prev = emoticon.previousSibling;
        let next = emoticon.nextSibling;
        if ((!prev || !noneWsRegex.test(prev.nodeValue.slice(-1))) &&
            (!next || !noneWsRegex.test((next.nodeValue || '')[0]))) {
            continue;
        }
        let range = rangeHelper.cloneSelected();
        let rangeStart = -1;
        let rangeStartContainer = range.startContainer;
        let previousText = (prev && prev.nodeValue) || '';
        previousText += _dom__WEBPACK_IMPORTED_MODULE_0__.data(emoticon, 'emleditor-emoticon');
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
        if (!next || next.nodeType !== _dom__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE) {
            next = parent.insertBefore(parent.ownerDocument.createTextNode(''), next);
        }
        next.insertData(0, previousText);
        _dom__WEBPACK_IMPORTED_MODULE_0__.remove(emoticon);
        if (prev) {
            _dom__WEBPACK_IMPORTED_MODULE_0__.remove(prev);
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
function replace(root, emoticons, emoticonsCompat) {
    let doc = root.ownerDocument;
    let space = '(^|\\s|\xA0|\u2002|\u2003|\u2009|$)';
    let emoticonCodes = [];
    let emoticonRegex = {};
    // TODO: Make this tag configurable.
    if (_dom__WEBPACK_IMPORTED_MODULE_0__.parent(root, 'code')) {
        return;
    }
    _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, function (key) {
        emoticonRegex[key] = new RegExp(space + _escape_js__WEBPACK_IMPORTED_MODULE_2__.regex(key) + space);
        emoticonCodes.push(key);
    });
    // Sort keys longest to shortest so that longer keys
    // take precedence (avoids bugs with shorter keys partially
    // matching longer ones)
    emoticonCodes.sort(function (a, b) {
        return b.length - a.length;
    });
    (function convert(node) {
        node = node.firstChild;
        while (node) {
            // TODO: Make this tag configurable.
            if (node.nodeType === _dom__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE && !_dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'code')) {
                convert(node);
            }
            if (node.nodeType === _dom__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE) {
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
                        let fragment = _dom__WEBPACK_IMPORTED_MODULE_0__.parseHTML(emoticons[emoticonKey], doc);
                        let after = text.substr(startIndex + emoticonKey.length);
                        fragment.appendChild(doc.createTextNode(after));
                        node.nodeValue = text.substr(0, startIndex);
                        node.parentNode
                            .insertBefore(fragment, node.nextSibling);
                    }
                }
            }
            node = node.nextSibling;
        }
    }(root));
}


/***/ }),

/***/ "./src/lib/pluginManager.ts":
/*!**********************************!*\
  !*** ./src/lib/pluginManager.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginManager: () => (/* binding */ PluginManager)
/* harmony export */ });
class PluginManager {
    constructor(thisObj) {
        PluginManager.plugins = {};
        /**
         * Array of all currently registered plugins
         *
         * @type {Array}
         * @private
         */
        var registeredPlugins = [];
        /**
         * Changes a signals name from "name" into "signalName".
         *
         * @param  {string} signal
         * @return {string}
         * @private
         */
        var formatSignalName = function (signal) {
            return 'signal' + signal.charAt(0).toUpperCase() + signal.slice(1);
        };
        /**
         * Calls handlers for a signal
         *
         * @see call()
         * @see callOnlyFirst()
         * @param  {Array}   args
         * @param  {boolean} returnAtFirst
         * @return {*}
         * @private
         */
        var callHandlers = function (args, returnAtFirst) {
            args = [].slice.call(args);
            var idx, ret, signal = formatSignalName(Array.from(args).shift());
            for (idx = 0; idx < registeredPlugins.length; idx++) {
                if (signal in registeredPlugins[idx]) {
                    ret = registeredPlugins[idx][signal].apply(thisObj, args);
                    if (returnAtFirst) {
                        return ret;
                    }
                }
            }
        };
        /**
         * Calls all handlers for the passed signal
         *
         * @param  {string}    signal
         * @param  {...string} args
         * @function
         * @name call
         * @memberOf PluginManager.prototype
         */
        this.call = function (...args) {
            callHandlers(args, false);
        };
        /**
         * Calls the first handler for a signal, and returns the
         *
         * @param  {string}    signal
         * @param  {...string} args
         * @return {*} The result of calling the handler
         * @function
         * @name callOnlyFirst
         * @memberOf PluginManager.prototype
         */
        this.callOnlyFirst = function () {
            return callHandlers(arguments, true);
        };
        /**
         * Checks if a signal has a handler
         *
         * @param  {string} signal
         * @return {boolean}
         * @function
         * @name hasHandler
         * @memberOf PluginManager.prototype
         */
        this.hasHandler = function (signal) {
            var i = registeredPlugins.length;
            signal = formatSignalName(signal);
            while (i--) {
                if (signal in registeredPlugins[i]) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Checks if the plugin exists in plugins
         *
         * @param  {string} plugin
         * @return {boolean}
         * @function
         * @name exists
         * @memberOf PluginManager.prototype
         */
        this.exists = function (plugin) {
            if (plugin in PluginManager.plugins) {
                let pluginObj = PluginManager.plugins[plugin];
                return typeof pluginObj === 'function' && typeof pluginObj.prototype === 'object';
            }
            return false;
        };
        /**
         * Checks if the passed plugin is currently registered.
         *
         * @param  {string} plugin
         * @return {boolean}
         * @function
         * @name isRegistered
         * @memberOf PluginManager.prototype
         */
        this.isRegistered = function (plugin) {
            if (this.exists(plugin)) {
                var idx = registeredPlugins.length;
                while (idx--) {
                    if (registeredPlugins[idx] instanceof PluginManager.plugins[plugin]) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * Registers a plugin to receive signals
         *
         * @param  {string} plugin
         * @return {boolean}
         * @function
         * @name register
         * @memberOf PluginManager.prototype
         */
        this.register = function (plugin) {
            if (!this.exists(plugin) || this.isRegistered(plugin)) {
                return false;
            }
            let pluginObj = new this.plugins[plugin]();
            registeredPlugins.push(plugin);
            if ('init' in this.plugin) {
                pluginObj.init.call(thisObj);
            }
            return true;
        };
        /**
         * Deregisters a plugin.
         *
         * @param  {string} plugin
         * @return {boolean}
         * @function
         * @name deregister
         * @memberOf PluginManager.prototype
         */
        this.deregister = function (plugin) {
            var removedPlugin, pluginIdx = registeredPlugins.length, removed = false;
            if (!this.isRegistered(plugin)) {
                return removed;
            }
            while (pluginIdx--) {
                if (registeredPlugins[pluginIdx] instanceof PluginManager.plugins[plugin]) {
                    removedPlugin = registeredPlugins.splice(pluginIdx, 1)[0];
                    removed = true;
                    if ('destroy' in removedPlugin) {
                        removedPlugin.destroy.call(thisObj);
                    }
                }
            }
            return removed;
        };
        /**
         * Clears all plugins and removes the owner reference.
         *
         * Calling any functions on this object after calling
         * destroy will cause a JS error.
         *
         * @name destroy
         * @memberOf PluginManager.prototype
         */
        this.destroy = function () {
            var i = registeredPlugins.length;
            while (i--) {
                if ('destroy' in registeredPlugins[i]) {
                    registeredPlugins[i].destroy.call(thisObj);
                }
            }
            registeredPlugins = [];
            thisObj = null;
        };
    }
}


/***/ }),

/***/ "./src/lib/rangeHelper.ts":
/*!********************************!*\
  !*** ./src/lib/rangeHelper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RangeHelper: () => (/* binding */ RangeHelper)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/lib/dom.ts");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./escape.js */ "./src/lib/escape.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");
/* eslint-disable @typescript-eslint/no-this-alias */



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
var outerText = function (range, isLeft, length) {
    var nodeValue, remaining, start, end, node, text = '', next = range.startContainer, offset = range.startOffset;
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
        }
        else {
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
class RangeHelper {
    constructor(win, d, sanitize) {
        let _createMarker;
        let _prepareInput;
        let doc = d || win.contentDocument || win.document;
        let startMarker = 'emleditor-start-marker';
        let endMarker = 'emleditor-end-marker';
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
        this.insertHTML = function (html, endHTML) {
            var node, div, range = this.selectedRange();
            if (!range) {
                return false;
            }
            if (endHTML) {
                html += this.selectedHtml() + endHTML;
            }
            div = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
            node = doc.createDocumentFragment();
            div.innerHTML = sanitize(html);
            while (div.firstChild) {
                let divFirstChild = div.firstChild;
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(node, divFirstChild);
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
        this.insertNode = function (node, endNode) {
            let first, last, input = _prepareInput(node, endNode), range = this.selectedRange(), parent = range.commonAncestorContainer;
            let emptyNodes = [];
            if (!input) {
                return false;
            }
            function removeIfEmpty(node) {
                // Only remove empty node if it wasn't already empty
                if (node && _dom__WEBPACK_IMPORTED_MODULE_0__.isEmpty(node) && emptyNodes.indexOf(node) < 0) {
                    _dom__WEBPACK_IMPORTED_MODULE_0__.remove(node);
                }
            }
            if (range.startContainer !== range.endContainer) {
                _utils_js__WEBPACK_IMPORTED_MODULE_2__.each(parent.childNodes, function (_, node) {
                    if (_dom__WEBPACK_IMPORTED_MODULE_0__.isEmpty(node)) {
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
            if (parent && parent.nodeType !== 3 && !_dom__WEBPACK_IMPORTED_MODULE_0__.canHaveChildren(parent)) {
                _dom__WEBPACK_IMPORTED_MODULE_0__.insertBefore(input, parent);
            }
            else {
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
        this.cloneSelected = function () {
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
        this.selectedRange = function () {
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
        this.hasSelection = function () {
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
        this.selectedHtml = function () {
            var div, range = this.selectedRange();
            if (range) {
                div = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(div, range.cloneContents());
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
        this.parentNode = function () {
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
        this.getFirstBlockParent = function (node) {
            var func = function (elm) {
                if (!_dom__WEBPACK_IMPORTED_MODULE_0__.isInline(elm, true)) {
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
        this.insertNodeAt = function (start, node) {
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
                startNode.parentNode.insertBefore(_createMarker(endMarker), startNode.nextSibling);
            }
            else {
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
                _dom__WEBPACK_IMPORTED_MODULE_0__.remove(marker);
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
                !_dom__WEBPACK_IMPORTED_MODULE_0__.isInline(container, true)) {
                lastChild = container.lastChild;
                while (lastChild && _dom__WEBPACK_IMPORTED_MODULE_0__.is(lastChild, '.emleditor-ignore')) {
                    lastChild = lastChild.previousSibling;
                }
                if (_dom__WEBPACK_IMPORTED_MODULE_0__.is(lastChild, 'br')) {
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
        this.selectOuterText = function (left, right) {
            let start, end, range = this.cloneSelected();
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
        this.replaceKeyword = function (keywords, includeAfter, keywordsSorted, longestKeyword, requireWhitespace, keypressChar) {
            if (!keywordsSorted) {
                keywords.sort(function (a, b) {
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
                        _escape_js__WEBPACK_IMPORTED_MODULE_1__.regex(keyword) + whitespaceRegex));
                    if (match) {
                        // Add the length of the text that was removed by
                        // substr() and also add 1 for the whitespace
                        matchPos = match.index + startIndex + match[1].length;
                    }
                }
                else {
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
                        this.selectOuterText(charsLeft, keywordLen - charsLeft -
                            (/^\S/.test(keypressChar) ? 1 : 0));
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
        this.compare = function (rngA, rngB) {
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
                }
                else if (sel.empty) {
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
        _prepareInput = (node, endNode, returnHtml) => {
            var lastChild, frag = doc.createDocumentFragment();
            if (typeof node === 'string') {
                if (endNode) {
                    node += this.selectedHtml() + endNode;
                }
                frag = _dom__WEBPACK_IMPORTED_MODULE_0__.parseHTML(node);
            }
            else {
                let htmlNode = node;
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, htmlNode);
                if (typeof endNode !== 'string' && endNode) {
                    let extracted = this.selectedRange().extractContents();
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, extracted);
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, endNode);
                }
            }
            if (!(lastChild = frag.lastChild)) {
                return;
            }
            while (!_dom__WEBPACK_IMPORTED_MODULE_0__.isInline(lastChild.lastChild, true)) {
                lastChild = lastChild.lastChild;
            }
            if (_dom__WEBPACK_IMPORTED_MODULE_0__.canHaveChildren(lastChild)) {
                // Webkit won't allow the cursor to be placed inside an
                // empty tag, so add a zero width space to it.
                if (!lastChild.lastChild) {
                    let txtNode = document.createTextNode('\u200B');
                    _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(lastChild, txtNode);
                }
            }
            else {
                lastChild = frag;
            }
            this.removeMarkers();
            // Append marks to last child so when restored cursor will be in
            // the right place
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(lastChild, _createMarker(startMarker));
            _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(lastChild, _createMarker(endMarker));
            if (returnHtml) {
                var div = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
                _dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(div, frag);
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
        _createMarker = (id) => {
            this.removeMarker(id);
            var marker = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('span', {
                id: id,
                className: 'emleditor-selection emleditor-ignore',
                style: 'display:none;line-height:0'
            }, doc);
            marker.innerHTML = ' ';
            return marker;
        };
    }
}


/***/ }),

/***/ "./src/lib/browser.js":
/*!****************************!*\
  !*** ./src/lib/browser.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ios: () => (/* binding */ ios),
/* harmony export */   isWysiwygSupported: () => (/* binding */ isWysiwygSupported)
/* harmony export */ });
var USER_AGENT = navigator.userAgent;

/**
 * Detects if the browser is iOS
 *
 * Needed to fix iOS specific bugs
 *
 * @function
 * @name ios
 * @type {boolean}
 */
var ios = /iPhone|iPod|iPad| wosbrowser\//i.test(USER_AGENT);

/**
 * If the browser supports WYSIWYG editing (e.g. older mobile browsers).
 *
 * @function
 * @name isWysiwygSupported
 * @return {boolean}
 */
var isWysiwygSupported = (function () {
	var	match, isUnsupported;

	// IE is the only browser to support documentMode
	var ie = !!window.document.documentMode;
	var legacyEdge = '-ms-ime-align' in document.documentElement.style;

	var div = document.createElement('div');
	div.contentEditable = true;

	// Check if the contentEditable attribute is supported
	if (!('contentEditable' in document.documentElement) ||
		div.contentEditable !== 'true') {
		return false;
	}

	// I think blackberry supports contentEditable or will at least
	// give a valid value for the contentEditable detection above
	// so it isn't included in the below tests.

	// I hate having to do UA sniffing but some mobile browsers say they
	// support contentediable when it isn't usable, i.e. you can't enter
	// text.
	// This is the only way I can think of to detect them which is also how
	// every other editor I've seen deals with this issue.

	// Exclude Opera mobile and mini
	isUnsupported = /Opera Mobi|Opera Mini/i.test(USER_AGENT);

	if (/Android/i.test(USER_AGENT)) {
		isUnsupported = true;

		if (/Safari/.test(USER_AGENT)) {
			// Android browser 534+ supports content editable
			// This also matches Chrome which supports content editable too
			match = /Safari\/(\d+)/.exec(USER_AGENT);
			isUnsupported = (!match || !match[1] ? true : match[1] < 534);
		}
	}

	// The current version of Amazon Silk supports it, older versions didn't
	// As it uses webkit like Android, assume it's the same and started
	// working at versions >= 534
	if (/ Silk\//i.test(USER_AGENT)) {
		match = /AppleWebKit\/(\d+)/.exec(USER_AGENT);
		isUnsupported = (!match || !match[1] ? true : match[1] < 534);
	}

	// iOS 5+ supports content editable
	if (ios) {
		// Block any version <= 4_x(_x)
		isUnsupported = /OS [0-4](_\d)+ like Mac/i.test(USER_AGENT);
	}

	// Firefox does support WYSIWYG on mobiles so override
	// any previous value if using FF
	if (/Firefox/i.test(USER_AGENT)) {
		isUnsupported = false;
	}

	if (/OneBrowser/i.test(USER_AGENT)) {
		isUnsupported = false;
	}

	// UCBrowser works but doesn't give a unique user agent
	if (navigator.vendor === 'UCWEB') {
		isUnsupported = false;
	}

	// IE and legacy edge are not supported any more
	if (ie || legacyEdge) {
		isUnsupported = true;
	}

	return !isUnsupported;
}());


/***/ }),

/***/ "./src/lib/defaultOptions.js":
/*!***********************************!*\
  !*** ./src/lib/defaultOptions.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/lib/dom.ts");


/**
 * Default options for EmlEditor
 * @type {Object}
 */
const defaultOptions = {
	/**
	 * Toolbar buttons order and groups. Should be comma separated and
	 * have a bar | to separate groups
	 *
	 * @type {string}
	 */
	toolbar: 'bold,italic,underline,strike,subscript,superscript|' +
		'left,center,right,justify|font,size,color,removeformat|' +
		'cut,copy,pastetext|bulletlist,orderedlist,indent,outdent|' +
		'table|code,quote|horizontalrule,image,email,link,unlink|' +
		'emoticon,youtube,date,time|ltr,rtl|print,maximize,source',

	/**
	 * Comma separated list of commands to excludes from the toolbar
	 *
	 * @type {string}
	 */
	toolbarExclude: null,

	/**
	 * Stylesheet to include in the WYSIWYG editor. This is what will style
	 * the WYSIWYG elements
	 *
	 * @type {string}
	 */
	style: 'jquery.emleditor.default.css',

	/**
	 * Comma separated list of fonts for the font selector
	 *
	 * @type {string}
	 */
	fonts: 'Arial,Arial Black,Comic Sans MS,Courier New,Georgia,Impact,' +
		'Sans-serif,Serif,Times New Roman,Trebuchet MS,Verdana',

	/**
	 * Colors should be comma separated and have a bar | to signal a new
	 * column.
	 *
	 * If null the colors will be auto generated.
	 *
	 * @type {string}
	 */
	colors: '#000000,#44B8FF,#1E92F7,#0074D9,#005DC2,#00369B,#b3d5f4|' +
			'#444444,#C3FFFF,#9DF9FF,#7FDBFF,#68C4E8,#419DC1,#d9f4ff|' +
			'#666666,#72FF84,#4CEA5E,#2ECC40,#17B529,#008E02,#c0f0c6|' +
			'#888888,#FFFF44,#FFFA1E,#FFDC00,#E8C500,#C19E00,#fff5b3|' +
			'#aaaaaa,#FFC95F,#FFA339,#FF851B,#E86E04,#C14700,#ffdbbb|' +
			'#cccccc,#FF857A,#FF5F54,#FF4136,#E82A1F,#C10300,#ffc6c3|' +
			'#eeeeee,#FF56FF,#FF30DC,#F012BE,#D900A7,#B20080,#fbb8ec|' +
			'#ffffff,#F551FF,#CF2BE7,#B10DC9,#9A00B2,#9A00B2,#e8b6ef',

	/**
	 * The locale to use.
	 * @type {string}
	 */
	locale: (0,_dom__WEBPACK_IMPORTED_MODULE_0__.attr)(document.documentElement, 'lang') || 'en',

	/**
	 * The Charset to use
	 * @type {string}
	 */
	charset: 'utf-8',

	/**
	 * Compatibility mode for emoticons.
	 *
	 * Helps if you have emoticons such as :/ which would put an emoticon
	 * inside http://
	 *
	 * This mode requires emoticons to be surrounded by whitespace or end of
	 * line chars. This mode has limited As You Type emoticon conversion
	 * support. It will not replace AYT for end of line chars, only
	 * emoticons surrounded by whitespace. They will still be replaced
	 * correctly when loaded just not AYT.
	 *
	 * @type {boolean}
	 */
	emoticonsCompat: false,

	/**
	 * If to enable emoticons. Can be changes at runtime using the
	 * emoticons() method.
	 *
	 * @type {boolean}
	 * @since 1.4.2
	 */
	emoticonsEnabled: true,

	/**
	 * Emoticon root URL
	 *
	 * @type {string}
	 */
	emoticonsRoot: '',
	emoticons: {
		dropdown: {
			':)': 'emoticons/smile.png',
			':angel:': 'emoticons/angel.png',
			':angry:': 'emoticons/angry.png',
			'8-)': 'emoticons/cool.png',
			':\'(': 'emoticons/cwy.png',
			':ermm:': 'emoticons/ermm.png',
			':D': 'emoticons/grin.png',
			'<3': 'emoticons/heart.png',
			':(': 'emoticons/sad.png',
			':O': 'emoticons/shocked.png',
			':P': 'emoticons/tongue.png',
			';)': 'emoticons/wink.png'
		},
		more: {
			':alien:': 'emoticons/alien.png',
			':blink:': 'emoticons/blink.png',
			':blush:': 'emoticons/blush.png',
			':cheerful:': 'emoticons/cheerful.png',
			':devil:': 'emoticons/devil.png',
			':dizzy:': 'emoticons/dizzy.png',
			':getlost:': 'emoticons/getlost.png',
			':happy:': 'emoticons/happy.png',
			':kissing:': 'emoticons/kissing.png',
			':ninja:': 'emoticons/ninja.png',
			':pinch:': 'emoticons/pinch.png',
			':pouty:': 'emoticons/pouty.png',
			':sick:': 'emoticons/sick.png',
			':sideways:': 'emoticons/sideways.png',
			':silly:': 'emoticons/silly.png',
			':sleeping:': 'emoticons/sleeping.png',
			':unsure:': 'emoticons/unsure.png',
			':woot:': 'emoticons/w00t.png',
			':wassat:': 'emoticons/wassat.png'
		},
		hidden: {
			':whistling:': 'emoticons/whistling.png',
			':love:': 'emoticons/wub.png'
		}
	},

	/**
	 * Width of the editor. Set to null for automatic with
	 *
	 * @type {?number}
	 */
	width: null,

	/**
	 * Height of the editor including toolbar. Set to null for automatic
	 * height
	 *
	 * @type {?number}
	 */
	height: null,

	/**
	 * If to allow the editor to be resized
	 *
	 * @type {boolean}
	 */
	resizeEnabled: true,

	/**
	 * Min resize to width, set to null for half textarea width or -1 for
	 * unlimited
	 *
	 * @type {?number}
	 */
	resizeMinWidth: null,
	/**
	 * Min resize to height, set to null for half textarea height or -1 for
	 * unlimited
	 *
	 * @type {?number}
	 */
	resizeMinHeight: null,
	/**
	 * Max resize to height, set to null for double textarea height or -1
	 * for unlimited
	 *
	 * @type {?number}
	 */
	resizeMaxHeight: null,
	/**
	 * Max resize to width, set to null for double textarea width or -1 for
	 * unlimited
	 *
	 * @type {?number}
	 */
	resizeMaxWidth: null,
	/**
	 * If resizing by height is enabled
	 *
	 * @type {boolean}
	 */
	resizeHeight: true,
	/**
	 * If resizing by width is enabled
	 *
	 * @type {boolean}
	 */
	resizeWidth: true,

	/**
	 * Date format, will be overridden if locale specifies one.
	 *
	 * The words year, month and day will be replaced with the users current
	 * year, month and day.
	 *
	 * @type {string}
	 */
	dateFormat: 'year-month-day',

	/**
	 * Element to inset the toolbar into.
	 *
	 * @type {HTMLElement}
	 */
	toolbarContainer: null,

	/**
	 * If to enable paste filtering. This is currently experimental, please
	 * report any issues.
	 *
	 * @type {boolean}
	 */
	enablePasteFiltering: false,

	/**
	 * If to completely disable pasting into the editor
	 *
	 * @type {boolean}
	 */
	disablePasting: false,

	/**
	 * If the editor is read only.
	 *
	 * @type {boolean}
	 */
	readOnly: false,

	/**
	 * If to set the editor to right-to-left mode.
	 *
	 * If set to null the direction will be automatically detected.
	 *
	 * @type {boolean}
	 */
	rtl: false,

	/**
	 * If to auto focus the editor on page load
	 *
	 * @type {boolean}
	 */
	autofocus: false,

	/**
	 * If to auto focus the editor to the end of the content
	 *
	 * @type {boolean}
	 */
	autofocusEnd: true,

	/**
	 * If to auto expand the editor to fix the content
	 *
	 * @type {boolean}
	 */
	autoExpand: false,

	/**
	 * If to auto update original textbox on blur
	 *
	 * @type {boolean}
	 */
	autoUpdate: false,

	/**
	 * If to enable the browsers built in spell checker
	 *
	 * @type {boolean}
	 */
	spellcheck: true,

	/**
	 * If to run the source editor when there is no WYSIWYG support. Only
	 * really applies to mobile OS's.
	 *
	 * @type {boolean}
	 */
	runWithoutWysiwygSupport: false,

	/**
	 * If to load the editor in source mode and still allow switching
	 * between WYSIWYG and source mode
	 *
	 * @type {boolean}
	 */
	startInSourceMode: false,

	/**
	 * Optional ID to give the editor.
	 *
	 * @type {string}
	 */
	id: null,

	/**
	 * Comma separated list of plugins
	 *
	 * @type {string}
	 */
	plugins: '',

	/**
	 * z-index to set the editor container to. Needed for jQuery UI dialog.
	 *
	 * @type {?number}
	 */
	zIndex: null,

	/**
	 * If to trim the BBCode. Removes any spaces at the start and end of the
	 * BBCode string.
	 *
	 * @type {boolean}
	 */
	bbcodeTrim: false,

	/**
	 * If to disable removing block level elements by pressing backspace at
	 * the start of them
	 *
	 * @type {boolean}
	 */
	disableBlockRemove: false,

	/**
	 * Array of allowed URL (should be either strings or regex) for iframes.
	 *
	 * If it's a string then iframes where the start of the src matches the
	 * specified string will be allowed.
	 *
	 * If it's a regex then iframes where the src matches the regex will be
	 * allowed.
	 *
	 * @type {Array}
	 */
	allowedIframeUrls: [],

	/**
	 * BBCode parser options, only applies if using the editor in BBCode
	 * mode.
	 *
	 * See EmlEditor.BBCodeParser.defaults for list of valid options
	 *
	 * @type {Object}
	 */
	parserOptions: { },

	/**
	 * CSS that will be added to the to dropdown menu (eg. z-index)
	 *
	 * @type {Object}
	 */
	dropDownCss: { },

	/**
	 * An array of tags that are allowed in the editor content.
	 * If a tag is not listed here, it will be removed when the content is
	 * sanitized.
	 *
	 * 1 Tag is already added by default: ['iframe']. No need to add this
	 * further.
	 *
	 * @type {Array}
	 */
	allowedTags: [],

	/**
	 * An array of attributes that are allowed on tags in the editor content.
	 * If an attribute is not listed here, it will be removed when the content
	 * is sanitized.
	 *
	 * 3 Attributes are already added by default:
	 * 	['allowfullscreen', 'frameborder', 'target'].
	 * No need to add these further.
	 *
	 * @type {Array}
	 */
	allowedAttributes: []
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultOptions);


/***/ }),

/***/ "./src/lib/escape.js":
/*!***************************!*\
  !*** ./src/lib/escape.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entities: () => (/* binding */ entities),
/* harmony export */   regex: () => (/* binding */ regex),
/* harmony export */   uriScheme: () => (/* binding */ uriScheme)
/* harmony export */ });
// Must start with a valid scheme
// 		^
// Schemes that are considered safe
// 		(https?|s?ftp|mailto|spotify|skype|ssh|teamspeak|tel):|
// Relative schemes (//:) are considered safe
// 		(\\/\\/)|
// Image data URI's are considered safe
// 		data:image\\/(png|bmp|gif|p?jpe?g);
var VALID_SCHEME_REGEX =
	/^(https?|s?ftp|mailto|spotify|skype|ssh|teamspeak|tel):|(\/\/)|data:image\/(png|bmp|gif|p?jpe?g);/i;

/**
 * Escapes a string so it's safe to use in regex
 *
 * @param {string} str
 * @return {string}
 */
function regex(str) {
	return str.replace(/([-.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

/**
 * Escapes all HTML entities in a string
 *
 * If noQuotes is set to false, all single and double
 * quotes will also be escaped
 *
 * @param {string} str
 * @param {boolean} [noQuotes=true]
 * @return {string}
 * @since 1.4.1
 */
function entities(str, noQuotes) {
	if (!str) {
		return str;
	}

	var replacements = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'  ': '&nbsp; ',
		'\r\n': '<br />',
		'\r': '<br />',
		'\n': '<br />'
	};

	if (noQuotes !== false) {
		replacements['"']  = '&#34;';
		replacements['\''] = '&#39;';
		replacements['`']  = '&#96;';
	}

	str = str.replace(/ {2}|\r\n|[&<>\r\n'"`]/g, function (match) {
		return replacements[match] || match;
	});

	return str;
}

/**
 * Escape URI scheme.
 *
 * Appends the current URL to a url if it has a scheme that is not:
 *
 * http
 * https
 * sftp
 * ftp
 * mailto
 * spotify
 * skype
 * ssh
 * teamspeak
 * tel
 * //
 * data:image/(png|jpeg|jpg|pjpeg|bmp|gif);
 *
 * **IMPORTANT**: This does not escape any HTML in a url, for
 * that use the escape.entities() method.
 *
 * @param  {string} url
 * @return {string}
 * @since 1.4.5
 */
function uriScheme(url) {
	var	path,
		// If there is a : before a / then it has a scheme
		hasScheme = /^[^/]*:/i,
		location = window.location;

	// Has no scheme or a valid scheme
	if ((!url || !hasScheme.test(url)) || VALID_SCHEME_REGEX.test(url)) {
		return url;
	}

	path = location.pathname.split('/');
	path.pop();

	return location.protocol + '//' +
		location.host +
		path.join('/') + '/' +
		url;
}


/***/ }),

/***/ "./src/lib/templates.js":
/*!******************************!*\
  !*** ./src/lib/templates.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ templates)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/lib/dom.ts");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./escape.js */ "./src/lib/escape.js");




/**
 * HTML templates used by the editor and default commands
 * @type {Object}
 * @private
 */
var _templates = {
	html:
		'<!DOCTYPE html>' +
		'<html{attrs}>' +
			'<head>' +
				'<meta http-equiv="Content-Type" ' +
					'content="text/html;charset={charset}" />' +
				'<link rel="stylesheet" type="text/css" href="{style}" />' +
			'</head>' +
			'<body contenteditable="true" {spellcheck}><p></p></body>' +
		'</html>',

	toolbarButton: '<a class="emleditor-button emleditor-button-{name}" ' +
		'data-emleditor-command="{name}" unselectable="on">' +
		'<div unselectable="on">{dispName}</div></a>',

	emoticon: '<img src="{url}" data-emleditor-emoticon="{key}" ' +
		'alt="{key}" title="{tooltip}" />',

	fontOpt: '<a class="emleditor-font-option" href="#" ' +
		'data-font="{font}"><font face="{font}">{font}</font></a>',

	sizeOpt: '<a class="emleditor-fontsize-option" data-size="{size}" ' +
		'href="#"><font size="{size}">{size}</font></a>',

	pastetext:
		'<div><label for="txt">{label}</label> ' +
			'<textarea cols="20" rows="7" id="txt"></textarea></div>' +
			'<div><input type="button" class="button" value="{insert}" />' +
		'</div>',

	table:
		'<div><label for="rows">{rows}</label><input type="text" ' +
			'id="rows" value="2" /></div>' +
		'<div><label for="cols">{cols}</label><input type="text" ' +
			'id="cols" value="2" /></div>' +
		'<div><input type="button" class="button" value="{insert}"' +
			' /></div>',

	image:
		'<div><label for="image">{url}</label> ' +
			'<input type="text" id="image" dir="ltr" placeholder="https://" /></div>' +
		'<div><label for="width">{width}</label> ' +
			'<input type="text" id="width" size="2" dir="ltr" /></div>' +
		'<div><label for="height">{height}</label> ' +
			'<input type="text" id="height" size="2" dir="ltr" /></div>' +
		'<div><input type="button" class="button" value="{insert}" />' +
			'</div>',

	email:
		'<div><label for="email">{label}</label> ' +
			'<input type="text" id="email" dir="ltr" /></div>' +
		'<div><label for="des">{desc}</label> ' +
			'<input type="text" id="des" /></div>' +
		'<div><input type="button" class="button" value="{insert}" />' +
			'</div>',

	link:
		'<div><label for="link">{url}</label> ' +
			'<input type="text" id="link" dir="ltr" placeholder="https://" /></div>' +
		'<div><label for="des">{desc}</label> ' +
			'<input type="text" id="des" /></div>' +
		'<div><input type="button" class="button" value="{ins}" /></div>',

	youtubeMenu:
		'<div><label for="link">{label}</label> ' +
			'<input type="text" id="link" dir="ltr" placeholder="https://" /></div>' +
		'<div><input type="button" class="button" value="{insert}" />' +
			'</div>',

	youtube:
		'<iframe width="560" height="315" frameborder="0" allowfullscreen ' +
		'src="https://www.youtube-nocookie.com/embed/{id}?wmode=opaque&start={time}" ' +
		'data-youtube-id="{id}"></iframe>'
};

/**
 * Replaces any params in a template with the passed params.
 *
 * If createHtml is passed it will return a DocumentFragment
 * containing the parsed template.
 *
 * @param {string} name
 * @param {Object} [params]
 * @param {boolean} [createHtml]
 * @returns {any}
 * @private
 */
function templates (name, params, createHtml) {
	var template = _templates[name];

	Object.keys(params).forEach(function (name) {
		template = template.replace(
			new RegExp(_escape_js__WEBPACK_IMPORTED_MODULE_1__.regex('{' + name + '}'), 'g'), params[name]
		);
	});

	if (createHtml) {
		template = _dom__WEBPACK_IMPORTED_MODULE_0__.parseHTML(template);
	}

	return template;
}


/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayRemove: () => (/* binding */ arrayRemove),
/* harmony export */   each: () => (/* binding */ each),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   isEmptyObject: () => (/* binding */ isEmptyObject),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });
/**
 * Check if the passed argument is the
 * the passed type.
 *
 * @param {string} type
 * @param {*} arg
 * @returns {boolean}
 */
function isTypeof(type, arg) {
	return typeof arg === type;
}

/**
 * @type {function(*): boolean}
 */
var isString = isTypeof.bind(null, 'string');

/**
 * @type {function(*): boolean}
 */
var isUndefined = isTypeof.bind(null, 'undefined');

/**
 * @type {function(*): boolean}
 */
var isFunction = isTypeof.bind(null, 'function');

/**
 * @type {function(*): boolean}
 */
var isNumber = isTypeof.bind(null, 'number');


/**
 * Returns true if an object has no keys
 *
 * @param {!Object} obj
 * @returns {boolean}
 */
function isEmptyObject(obj) {
	return !Object.keys(obj).length;
}

/**
 * Extends the first object with any extra objects passed
 *
 * If the first argument is boolean and set to true
 * it will extend child arrays and objects recursively.
 *
 * @param {!Object|boolean} targetArg
 * @param {...Object} source
 * @return {Object}
 */
function extend(targetArg, sourceArg) {
	var isTargetBoolean = targetArg === !!targetArg;
	var i      = isTargetBoolean ? 2 : 1;
	var target = isTargetBoolean ? sourceArg : targetArg;
	var isDeep = isTargetBoolean ? targetArg : false;

	function isObject(value) {
		return value !== null && typeof value === 'object' &&
			Object.getPrototypeOf(value) === Object.prototype;
	}

	for (; i < arguments.length; i++) {
		var source = arguments[i];

		// Copy all properties for jQuery compatibility
		/* eslint guard-for-in: off */
		for (var key in source) {
			var targetValue = target[key];
			var value = source[key];

			// Skip undefined values to match jQuery
			if (isUndefined(value)) {
				continue;
			}

			// Skip special keys to prevent prototype pollution
			if (key === '__proto__' || key === 'constructor') {
				continue;
			}

			var isValueObject = isObject(value);
			var isValueArray = Array.isArray(value);

			if (isDeep && (isValueObject || isValueArray)) {
				// Can only merge if target type matches otherwise create
				// new target to merge into
				var isSameType = isObject(targetValue) === isValueObject &&
					Array.isArray(targetValue) === isValueArray;

				target[key] = extend(
					true,
					isSameType ? targetValue : (isValueArray ? [] : {}),
					value
				);
			} else {
				target[key] = value;
			}
		}
	}

	return target;
}

/**
 * Removes an item from the passed array
 *
 * @param {!Array} arr
 * @param {*} item
 */
function arrayRemove(arr, item) {
	var i = arr.indexOf(item);

	if (i > -1) {
		arr.splice(i, 1);
	}
}

/**
 * Iterates over an array or object
 *
 * @param {!Object|Array} obj
 * @param {function(*, *)} fn
 */
function each(obj, fn) {
	if (Array.isArray(obj) &&  (obj)?.length > 0) {
		for (var i = 0; i < obj.length; i++) {
			fn(i, obj[i]);
		}
	} else {
		Object.keys(obj).forEach(function (key) {
			fn(key, obj[key]);
		});
	}
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/emlEditor */ "./src/lib/emlEditor.ts");
/* harmony import */ var _lib_pluginManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/pluginManager */ "./src/lib/pluginManager.ts");
/* harmony import */ var _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/escape.js */ "./src/lib/escape.js");
/* harmony import */ var _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/browser.js */ "./src/lib/browser.js");
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/dom */ "./src/lib/dom.ts");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/utils.js */ "./src/lib/utils.js");
/* harmony import */ var _lib_defaultCommands__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/defaultCommands */ "./src/lib/defaultCommands.ts");
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _themes_square_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./themes/square.less */ "./src/themes/square.less");









window.emlEditor = {
    command: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].command,
    locale: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].locale,
    icons: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].icons,
    formats: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].formats,
    commands: _lib_defaultCommands__WEBPACK_IMPORTED_MODULE_6__["default"],
    defaultOptions: _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__["default"],
    ios: _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__.ios,
    isWysiwygSupported: _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__.isWysiwygSupported,
    regexEscape: _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__.regex,
    escapeEntities: _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__.entities,
    escapeUriScheme: _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__.uriScheme,
    dom: {
        css: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.css,
        attr: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.attr,
        removeAttr: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.removeAttr,
        is: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.is,
        closest: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.closest,
        width: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.width,
        height: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.height,
        traverse: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.traverse,
        rTraverse: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.rTraverse,
        parseHTML: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.parseHTML,
        hasStyling: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.hasStyling,
        convertElement: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.convertElement,
        blockLevelList: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.blockLevelList,
        canHaveChildren: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.canHaveChildren,
        isInline: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.isInline,
        copyCSS: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.copyCSS,
        fixNesting: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.fixNesting,
        findCommonAncestor: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.findCommonAncestor,
        getSibling: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.getSibling,
        removeWhiteSpace: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.removeWhiteSpace,
        extractContents: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.extractContents,
        getOffset: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.getOffset,
        getStyle: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.getStyle,
        hasStyle: _lib_dom__WEBPACK_IMPORTED_MODULE_4__.hasStyle
    },
    utils: {
        each: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.each,
        isEmptyObject: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.isEmptyObject,
        extend: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.extend
    },
    plugins: _lib_pluginManager__WEBPACK_IMPORTED_MODULE_1__.PluginManager.plugins,
    create: (textarea, options) => {
        options = options || {};
        // Don't allow the editor to be initialised
        // on it's own source editor
        if (_lib_dom__WEBPACK_IMPORTED_MODULE_4__.parent(textarea, '.emleditor-container')) {
            return;
        }
        if (options.runWithoutWysiwygSupport || _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__.isWysiwygSupported) {
            (new _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"](textarea, options));
        }
    },
    instance: function (textarea) {
        return textarea._emleditor;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUN2K0NBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBLHFEQUFxRDtBQUN4QjtBQUNPO0FBQ0U7QUFDSDtBQUduQzs7OztHQUlHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxNQUFpQjtJQUMzQyxzREFBc0Q7SUFDdEQsSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDO1FBRVQsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUNiLElBQUksR0FBRyxJQUFJLENBQUM7WUFFWixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDeEIsQ0FBQztpQkFBTSxDQUFDO2dCQUVQLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNsQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxJQUFJLElBQUksRUFBRSxDQUFDO29CQUNWLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN6QixDQUFDO1lBQ0YsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDN0Qsd0NBQXdDO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxxQ0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMxRCx3Q0FBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0YsQ0FBQztZQUVELElBQUksR0FBRyxJQUFXLENBQUM7UUFDcEIsQ0FBQztJQUNGLENBQUM7QUFDRixDQUFDO0FBR0Q7Ozs7R0FJRztBQUNILElBQUksV0FBVyxHQUFRO0lBRXRCLHNCQUFzQjtJQUN0QixJQUFJLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxNQUFNO1FBQ2YsUUFBUSxFQUFFLFFBQVE7S0FDbEI7SUFDRCxjQUFjO0lBQ2Qsd0JBQXdCO0lBQ3hCLE1BQU0sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsUUFBUSxFQUFFLFFBQVE7S0FDbEI7SUFDRCxjQUFjO0lBQ2QsMkJBQTJCO0lBQzNCLFNBQVMsRUFBRTtRQUNWLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU8sRUFBRSxXQUFXO1FBQ3BCLFFBQVEsRUFBRSxRQUFRO0tBQ2xCO0lBQ0QsY0FBYztJQUNkLCtCQUErQjtJQUMvQixNQUFNLEVBQUU7UUFDUCxJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsZUFBZTtLQUN4QjtJQUNELGNBQWM7SUFDZCwyQkFBMkI7SUFDM0IsU0FBUyxFQUFFO1FBQ1YsSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLFdBQVc7S0FDcEI7SUFDRCxjQUFjO0lBQ2QsNkJBQTZCO0lBQzdCLFdBQVcsRUFBRTtRQUNaLElBQUksRUFBRSxhQUFhO1FBQ25CLE9BQU8sRUFBRSxhQUFhO0tBQ3RCO0lBQ0QsY0FBYztJQUVkLHNCQUFzQjtJQUN0QixJQUFJLEVBQUU7UUFDTCxLQUFLLEVBQUUsVUFBVSxJQUFpQjtZQUNqQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQXlCLENBQUM7WUFDdkMsQ0FBQztZQUVELElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxLQUFLLEdBQUcscUNBQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssS0FBSyxDQUFDO2dCQUNqRCxJQUFJLEtBQUssR0FBRyxxQ0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFFdkMsbUJBQW1CO2dCQUNuQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUN4QixLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsQ0FBQztRQUNGLENBQUM7UUFDRCxJQUFJLEVBQUUsYUFBYTtRQUNuQixPQUFPLEVBQUUsWUFBWTtLQUNyQjtJQUNELGNBQWM7SUFDZCx3QkFBd0I7SUFDeEIsTUFBTSxFQUFFO1FBQ1AsSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLFFBQVE7S0FDakI7SUFDRCxjQUFjO0lBQ2QsdUJBQXVCO0lBQ3ZCLEtBQUssRUFBRTtRQUNOLEtBQUssRUFBRSxVQUFVLElBQWlCO1lBQ2pDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBeUIsQ0FBQztZQUN2QyxDQUFDO1lBRUQsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDVixJQUFJLEtBQUssR0FBRyxxQ0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsS0FBSyxLQUFLLENBQUM7Z0JBQ2pELElBQUksS0FBSyxHQUFHLHFDQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUV2QyxvQkFBb0I7Z0JBQ3BCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ3pCLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxDQUFDO1FBQ0YsQ0FBQztRQUNELElBQUksRUFBRSxjQUFjO1FBQ3BCLE9BQU8sRUFBRSxhQUFhO0tBQ3RCO0lBQ0QsY0FBYztJQUNkLHlCQUF5QjtJQUN6QixPQUFPLEVBQUU7UUFDUixJQUFJLEVBQUUsYUFBYTtRQUNuQixPQUFPLEVBQUUsU0FBUztLQUNsQjtJQUNELGNBQWM7SUFFZCxzQkFBc0I7SUFDdEIsSUFBSSxFQUFFO1FBQ0wsU0FBUyxFQUFFLFVBQVUsTUFBaUIsRUFBRSxNQUFtQixFQUFFLFFBQThCO1lBQzFGLElBQUksT0FBTyxHQUFHLCtDQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXZDLG9DQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFRO2dCQUMvQyxRQUFRLENBQUMsc0NBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQVM7Z0JBQ2hFLDZDQUFlLENBQUMsT0FBTyxFQUFFLHlEQUFLLENBQUMsU0FBUyxFQUFFO29CQUN6QyxJQUFJLEVBQUUsSUFBSTtpQkFDVixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBQ0QsSUFBSSxFQUFFLFVBQVUsTUFBbUI7WUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBRWxCLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxRQUFnQjtnQkFDcEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxFQUFFLFdBQVc7S0FDcEI7SUFDRCxjQUFjO0lBQ2Qsc0JBQXNCO0lBQ3RCLElBQUksRUFBRTtRQUNMLFNBQVMsRUFBRSxVQUFVLE1BQWlCLEVBQUUsTUFBbUIsRUFBRSxRQUE4QjtZQUMxRixJQUFJLE9BQU8sR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV2QyxvQ0FBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBUTtnQkFDL0MsUUFBUSxDQUFDLHNDQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDN0IsNkNBQWUsQ0FBQyxPQUFPLEVBQUUseURBQUssQ0FBQyxTQUFTLEVBQUU7b0JBQ3pDLElBQUksRUFBRSxDQUFDO2lCQUNQLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUM7WUFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBQ0QsSUFBSSxFQUFFLFVBQVUsTUFBbUI7WUFDbEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBRWxCLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxRQUFnQjtnQkFDcEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxFQUFFLFdBQVc7S0FDcEI7SUFDRCxjQUFjO0lBQ2Qsd0JBQXdCO0lBQ3hCLEtBQUssRUFBRTtRQUNOLFNBQVMsRUFBRSxVQUFVLE1BQWlCLEVBQUUsTUFBbUIsRUFBRSxRQUE4QjtZQUMxRixJQUFJLE9BQU8sR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBRTVCLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxNQUFjO29CQUN0RSxJQUFJLElBQUksc0NBQXNDLENBQUM7b0JBRS9DLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBYTt3QkFDaEQsSUFBSTs0QkFDSCw0Q0FBNEM7Z0NBQzVDLDRCQUE0QixHQUFHLEtBQUssR0FBRyxHQUFHO2dDQUMxQyxlQUFlLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxJQUFJLFFBQVEsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsQ0FBQztZQUVELDZDQUFlLENBQUMsT0FBTyxFQUFFLDJDQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFFeEQsb0NBQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQVE7Z0JBQy9DLFFBQVEsQ0FBQyxzQ0FBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUNELElBQUksRUFBRSxVQUFVLE1BQW1CO1lBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUVsQixXQUFXLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsS0FBYTtnQkFDbEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDO1FBQ0QsT0FBTyxFQUFFLFlBQVk7S0FDckI7SUFDRCxjQUFjO0lBQ2QsK0JBQStCO0lBQy9CLFlBQVksRUFBRTtRQUNiLElBQUksRUFBRSxjQUFjO1FBQ3BCLE9BQU8sRUFBRSxtQkFBbUI7S0FDNUI7SUFDRCxjQUFjO0lBRWQscUJBQXFCO0lBQ3JCLEdBQUcsRUFBRTtRQUNKLElBQUksRUFBRSxLQUFLO1FBQ1gsT0FBTyxFQUFFLEtBQUs7UUFDZCxZQUFZLEVBQUUsK0NBQStDO1lBQzVELDZDQUE2QztLQUM5QztJQUNELGNBQWM7SUFDZCxzQkFBc0I7SUFDdEIsSUFBSSxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPLEVBQUUsTUFBTTtRQUNmLFlBQVksRUFBRSxnREFBZ0Q7WUFDN0QsNkNBQTZDO0tBQzlDO0lBQ0QsY0FBYztJQUNkLHVCQUF1QjtJQUN2QixLQUFLLEVBQUU7UUFDTixJQUFJLEVBQUUsT0FBTztRQUNiLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFlBQVksRUFBRSxpREFBaUQ7WUFDOUQsNkNBQTZDO0tBQzlDO0lBQ0QsY0FBYztJQUNkLDRCQUE0QjtJQUM1QixTQUFTLEVBQUU7UUFDVixJQUFJLEVBQUUsVUFBVSxNQUFtQjtZQUNsQyxJQUFJLEdBQUcsRUFDTixPQUFPLEdBQUcsK0NBQWlCLENBQUMsS0FBSyxDQUFDLEVBQ2xDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFZiw2Q0FBZSxDQUFDLE9BQU8sRUFBRSx5REFBSyxDQUFDLFdBQVcsRUFBRTtnQkFDM0MsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQ3RCLDJDQUEyQyxDQUMzQztnQkFDRCxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDbEMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRVYsb0NBQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQVE7Z0JBQ3JELEdBQUcsR0FBSSxzQ0FBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQXlCLENBQUMsS0FBSyxDQUFDO2dCQUVsRSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNULE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsQ0FBQztnQkFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUNELE9BQU8sRUFBRSxZQUFZO0tBQ3JCO0lBQ0QsY0FBYztJQUNkLDZCQUE2QjtJQUM3QixVQUFVLEVBQUU7UUFDWCxJQUFJLEVBQUU7WUFDTCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sRUFBRSxhQUFhO0tBQ3RCO0lBQ0QsY0FBYztJQUNkLDhCQUE4QjtJQUM5QixXQUFXLEVBQUU7UUFDWixJQUFJLEVBQUU7WUFDTCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELE9BQU8sRUFBRSxlQUFlO0tBQ3hCO0lBQ0QsY0FBYztJQUNkLHdCQUF3QjtJQUN4QixNQUFNLEVBQUU7UUFDUCxLQUFLLEVBQUUsVUFBVSxNQUFXLEVBQUUsVUFBdUI7WUFDcEQsaUNBQWlDO1lBQ2pDLElBQUksS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFFbEMsSUFBSSxvQ0FBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUM5QixPQUFPLENBQUMsQ0FBQztZQUNWLENBQUM7WUFFRCxJQUFJLG9DQUFNLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLG1EQUFtRDtnQkFDbkQsK0NBQStDO2dCQUMvQyxxQkFBcUI7Z0JBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRTlDLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztnQkFDOUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO2dCQUUxQyxxQ0FBcUM7Z0JBQ3JDLDBEQUEwRDtnQkFDMUQsb0JBQW9CO2dCQUVwQixtQ0FBbUM7Z0JBQ25DLDhCQUE4QjtnQkFDOUIsSUFBSSxXQUFXO29CQUNkLFdBQVcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCO29CQUN4QywwQkFBMEI7b0JBQzFCLENBQUMsb0NBQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUzt3QkFDcEMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7b0JBQzFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNWLENBQUM7WUFDRixDQUFDO1lBRUQsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDTCxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQ2hCLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUV2RCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFZiwyREFBMkQ7WUFDM0Qsd0RBQXdEO1lBQ3hELHdEQUF3RDtZQUN4RCxxQkFBcUI7WUFDckIsSUFBSSx5Q0FBVyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO2dCQUN0QyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlCLENBQUM7UUFDRixDQUFDO1FBQ0QsT0FBTyxFQUFFLFlBQVk7S0FDckI7SUFDRCxjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLE9BQU8sRUFBRTtRQUNSLEtBQUssRUFBRSxVQUFVLE9BQVksRUFBRSxVQUF1QjtZQUNyRCxPQUFPLHlDQUFXLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDTCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUN4RCxJQUFJLHlDQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsQ0FBQztRQUNGLENBQUM7UUFDRCxPQUFPLEVBQUUsbUJBQW1CO0tBQzVCO0lBQ0QsY0FBYztJQUVkLHVCQUF1QjtJQUN2QixLQUFLLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVSxNQUFtQjtZQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQ2hCLE9BQU8sR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVwQyw2Q0FBZSxDQUFDLE9BQU8sRUFBRSx5REFBSyxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUMvQixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7Z0JBQy9CLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUNsQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFVixvQ0FBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBUTtnQkFDckQsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFFLHNDQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBeUIsQ0FBQyxLQUFLLENBQUMsRUFDOUUsSUFBSSxHQUFHLE1BQU0sQ0FBRSxzQ0FBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQXlCLENBQUMsS0FBSyxDQUFDLEVBQzNFLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBRWxCLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzFCLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDM0IsTUFBTTt3QkFDTixLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDbkIsaUJBQWlCLENBQ2pCO3dCQUNELE9BQU8sQ0FDUCxDQUFDO29CQUVGLElBQUksSUFBSSxVQUFVLENBQUM7b0JBRW5CLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNwQixDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELE9BQU8sRUFBRSxnQkFBZ0I7S0FDekI7SUFDRCxjQUFjO0lBRWQsaUNBQWlDO0lBQ2pDLGNBQWMsRUFBRTtRQUNmLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsT0FBTyxFQUFFLDBCQUEwQjtLQUNuQztJQUNELGNBQWM7SUFFZCxzQkFBc0I7SUFDdEIsSUFBSSxFQUFFO1FBQ0wsSUFBSSxFQUFFO1lBQ0wsSUFBSSxDQUFDLHVCQUF1QixDQUMzQixRQUFRLEVBQ1IsZUFBZSxDQUNmLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxFQUFFLE1BQU07S0FDZjtJQUNELGNBQWM7SUFFZCx1QkFBdUI7SUFDdkIsS0FBSyxFQUFFO1FBQ04sU0FBUyxFQUFFLFVBQVUsTUFBaUIsRUFBRSxNQUFtQixFQUFFLFFBQWEsRUFBRSxRQUF5RTtZQUNwSixJQUFJLE9BQU8sR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV2Qyw2Q0FBZSxDQUFDLE9BQU8sRUFBRSx5REFBSyxDQUFDLE9BQU8sRUFBRTtnQkFDdkMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUM3QixLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDNUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7Z0JBQzlDLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUNsQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFHVixJQUFJLFFBQVEsR0FBRyxzQ0FBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQXFCLENBQUM7WUFFbEUsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFFMUIsb0NBQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQVE7Z0JBQ3JELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNwQixRQUFRLENBQ1AsUUFBUSxDQUFDLEtBQUssRUFDYixzQ0FBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQXNCLENBQUMsS0FBSyxFQUN6RCxzQ0FBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQXNCLENBQUMsS0FBSyxDQUMzRCxDQUFDO2dCQUNILENBQUM7Z0JBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLEVBQUUsVUFBVSxNQUFtQjtZQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFbEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQzFCLE1BQU0sRUFDTixNQUFNLEVBQ04sRUFBRSxFQUNGLFVBQVUsR0FBVyxFQUFFLEtBQWMsRUFBRSxNQUFlO2dCQUNyRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBRWYsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQkFDWCxLQUFLLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNqRCxDQUFDO2dCQUVELElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1osS0FBSyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDbkQsQ0FBQztnQkFFRCxLQUFLLElBQUksUUFBUSxHQUFHLGdEQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUUvQyxNQUFNLENBQUMsdUJBQXVCLENBQzdCLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUN0QixDQUFDO1lBQ0gsQ0FBQyxDQUNELENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxFQUFFLGlCQUFpQjtLQUMxQjtJQUNELGNBQWM7SUFFZCx3QkFBd0I7SUFDeEIsS0FBSyxFQUFFO1FBQ04sU0FBUyxFQUFFLFVBQVUsTUFBaUIsRUFBRSxNQUFtQixFQUFFLFFBQThDO1lBQzFHLElBQUksT0FBTyxHQUFHLCtDQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXZDLDZDQUFlLENBQUMsT0FBTyxFQUFFLHlEQUFLLENBQUMsT0FBTyxFQUFFO2dCQUN2QyxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2xDLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDO2dCQUNqRCxNQUFNLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDbEMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRVYsb0NBQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQVE7Z0JBQ3JELElBQUksS0FBSyxHQUFZLHNDQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBc0IsQ0FBQyxLQUFLLENBQUM7Z0JBRS9FLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ1gsUUFBUSxDQUFDLEtBQUssRUFBRyxzQ0FBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNFLENBQUM7Z0JBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLEVBQUUsVUFBVSxNQUFtQjtZQUNsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFbEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQzFCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxLQUFhLEVBQUUsSUFBWTtnQkFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDckQsTUFBTSxDQUFDLHVCQUF1QixDQUM3QixXQUFXO3dCQUNYLFNBQVMsR0FBRyxnREFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUk7d0JBQ3pDLGdEQUFlLENBQUMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUM7d0JBQ2hDLE1BQU0sQ0FDTixDQUFDO2dCQUNILENBQUM7cUJBQU0sQ0FBQztvQkFDUCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ3JELENBQUM7WUFDRixDQUFDLENBQ0QsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLEVBQUUsaUJBQWlCO0tBQzFCO0lBQ0QsY0FBYztJQUVkLHNCQUFzQjtJQUN0QixJQUFJLEVBQUU7UUFDTCxTQUFTLEVBQUUsVUFBVSxNQUFpQixFQUFFLE1BQW1CLEVBQUUsUUFBNkM7WUFDekcsSUFBSSxPQUFPLEdBQUcsK0NBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdkMsNkNBQWUsQ0FBQyxPQUFPLEVBQUUseURBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RDLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUM7Z0JBQ2pELEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUMvQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFVixJQUFJLFNBQVMsR0FBRyxzQ0FBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQXFCLENBQUM7WUFDbEUsSUFBSSxRQUFRLEdBQUcsc0NBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFxQixDQUFDO1lBRWhFLFNBQVMsU0FBUyxDQUFDLENBQVE7Z0JBQzFCLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNyQixRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLENBQUM7Z0JBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxvQ0FBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLG9DQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFnQjtnQkFDM0QsaUJBQWlCO2dCQUNqQixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDdkMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNkLENBQUM7WUFDRixDQUFDLEVBQUUsK0NBQWlCLENBQUMsQ0FBQztZQUV0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELElBQUksRUFBRSxVQUFVLE1BQW1CO1lBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUVsQixXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsR0FBVyxFQUFFLElBQVk7Z0JBQzdFLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7b0JBQ3JELE1BQU0sQ0FBQyx1QkFBdUIsQ0FDN0IsV0FBVyxHQUFHLGdEQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSTt3QkFDekMsZ0RBQWUsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDO3dCQUM1QixNQUFNLENBQ04sQ0FBQztnQkFDSCxDQUFDO3FCQUFNLENBQUM7b0JBQ1AsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPLEVBQUUsZUFBZTtLQUN4QjtJQUNELGNBQWM7SUFFZCx3QkFBd0I7SUFDeEIsTUFBTSxFQUFFO1FBQ1AsS0FBSyxFQUFFO1lBQ04sT0FBTyx5Q0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQ0QsSUFBSSxFQUFFO1lBQ0wsSUFBSSxNQUFNLEdBQUcseUNBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFbEQsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDWixPQUFPLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDMUIsOENBQWdCLENBQUMsTUFBTSxDQUFDLFVBQXlCLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBRUQsd0NBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixDQUFDO1FBQ0YsQ0FBQztRQUNELE9BQU8sRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsY0FBYztJQUdkLHVCQUF1QjtJQUN2QixLQUFLLEVBQUU7UUFDTixJQUFJLEVBQUUsVUFBVSxNQUFtQixFQUFFLElBQVksRUFBRSxNQUFjO1lBQ2hFLElBQUksTUFBTSxHQUFHLGNBQWMsRUFDMUIsR0FBRyxHQUFHLGVBQWUsQ0FBQztZQUV2QiwwREFBMEQ7WUFDMUQsbUJBQW1CO1lBQ25CLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1YsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRO29CQUMxQixnREFBZSxDQUFDLE1BQU0sQ0FBQztvQkFDdkIsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDdEMsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDWCx3REFBd0Q7WUFDekQsQ0FBQztpQkFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztnQkFDeEQsR0FBRyxHQUFHLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDdEIsQ0FBQztZQUVELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELE9BQU8sRUFBRSxnQkFBZ0I7S0FDekI7SUFDRCxjQUFjO0lBRWQsMkJBQTJCO0lBQzNCLFFBQVEsRUFBRTtRQUNULElBQUksRUFBRSxVQUFVLE1BQW1CO1lBQ2xDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUVsQixJQUFJLGFBQWEsR0FBRyxVQUFVLFdBQW9CO2dCQUNqRCxJQUFJLFFBQVEsRUFDWCxJQUFJLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFDM0IsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksRUFBRSxFQUN4QyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFDdEMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFDckMsVUFBVSxHQUFHLGVBQWU7b0JBQzNCLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3JELFFBQVEsR0FBRyxlQUFlO29CQUN6QixXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUN0RCxPQUFPLEdBQUcsK0NBQWlCLENBQUMsS0FBSyxDQUFDLEVBQ2xDLElBQUksR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLENBQUMsRUFDL0IsT0FBTyxHQUFHLENBQUMsRUFDWCxTQUFTLEdBQUcsNkNBQVksQ0FDdkIsRUFBRSxFQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUN2QixXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3RDLENBQUM7Z0JBRUgsNkNBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRS9CLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRW5ELG9DQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFRO29CQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxzQ0FBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxRQUFRLEVBQzFELElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRWxDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsMkNBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxJQUFJLEVBQUUsUUFBUTtvQkFDN0MsNkNBQWUsQ0FBQyxJQUFJLEVBQUUsK0NBQWlCLENBQUMsS0FBSyxFQUFFO3dCQUM5QyxHQUFHLEVBQUUsYUFBYSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUM7d0JBQy9DLEdBQUcsRUFBRSxJQUFJO3dCQUNULEtBQUssRUFBRSxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUk7cUJBQy9CLENBQUMsQ0FBQyxDQUFDO29CQUVKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7d0JBQ3JDLElBQUksR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDaEMsNkNBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN6QyxRQUFRLEdBQUcsK0NBQWlCLENBQUMsR0FBRyxFQUFFO3dCQUNqQyxTQUFTLEVBQUUsZ0JBQWdCO3FCQUMzQixDQUFDLENBQUM7b0JBRUgsNkNBQWUsQ0FBQyxRQUFRLEVBQ3ZCLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXBELG9DQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFRO3dCQUNqRCxNQUFNLENBQUMsY0FBYyxDQUNwQixNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUM3QyxDQUFDO3dCQUVGLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUM7b0JBRUgsNkNBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7Z0JBRUQsT0FBTyxPQUFPLENBQUM7WUFDaEIsQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBVSxNQUFtQjtZQUNyQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxPQUFPLEVBQUUsb0JBQW9CO0tBQzdCO0lBQ0QsY0FBYztJQUVkLHlCQUF5QjtJQUN6QixPQUFPLEVBQUU7UUFDUixTQUFTLEVBQUUsVUFBVSxNQUFpQixFQUFFLE1BQW1CLEVBQUUsUUFBNEM7WUFDeEcsSUFBSSxPQUFPLEdBQUcsK0NBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdkMsNkNBQWUsQ0FBQyxPQUFPLEVBQUUseURBQUssQ0FBQyxhQUFhLEVBQUU7Z0JBQzdDLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztnQkFDckMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2FBQ2xDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVWLG9DQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFRO2dCQUNyRCxJQUFJLEdBQUcsR0FBSSxzQ0FBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQXNCLENBQUMsS0FBSyxDQUFDO2dCQUNwRSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7Z0JBQzdFLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUViLElBQUksU0FBUyxFQUFFLENBQUM7b0JBQ2YsMkNBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEdBQUc7d0JBQ3ZELElBQUksR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDOzRCQUNoQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQyxDQUFDO29CQUNGLENBQUMsQ0FBQyxDQUFDO2dCQUNKLENBQUM7Z0JBRUQsSUFBSSxPQUFPLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3ZELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFDRCxJQUFJLEVBQUUsVUFBVSxHQUFRO1lBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUVsQixXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBTyxFQUFFLElBQVM7Z0JBQ3RFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyx5REFBSyxDQUFDLFNBQVMsRUFBRTtvQkFDL0MsRUFBRSxFQUFFLEVBQUU7b0JBQ04sSUFBSSxFQUFFLElBQUk7aUJBQ1YsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUM7UUFDRCxPQUFPLEVBQUUsd0JBQXdCO0tBQ2pDO0lBQ0QsY0FBYztJQUVkLHNCQUFzQjtJQUN0QixJQUFJLEVBQUU7UUFDTCxLQUFLLEVBQUUsVUFBVSxNQUFpQjtZQUNqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9CLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JDLElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVqQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDaEIsYUFBYSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDN0IsQ0FBQztZQUVELElBQUksR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUNkLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ3pCLENBQUM7WUFFRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVTtpQkFDcEMsT0FBTyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7aUJBQzlCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDO2lCQUNoQyxPQUFPLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE9BQU8sRUFBRTtZQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBQ0QsT0FBTyxFQUFFLHFCQUFxQjtLQUM5QjtJQUNELGNBQWM7SUFFZCxzQkFBc0I7SUFDdEIsSUFBSSxFQUFFO1FBQ0wsS0FBSyxFQUFFO1lBQ04sSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFDdEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFDdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVuQyxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDaEIsYUFBYSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEMsQ0FBQztZQUVELElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUNmLGFBQWEsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZDLENBQUM7WUFFRCxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDZixZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxDQUFDO1lBRUQsT0FBTyxhQUFhLEdBQUcsR0FBRyxHQUFHLGFBQWEsR0FBRyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBQ2pFLENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsT0FBTyxFQUFFO1lBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELE9BQU8sRUFBRSxxQkFBcUI7S0FDOUI7SUFDRCxjQUFjO0lBR2QscUJBQXFCO0lBQ3JCLEdBQUcsRUFBRTtRQUNKLEtBQUssRUFBRSxVQUFVLE9BQVksRUFBRSxVQUF1QjtZQUNyRCxPQUFPLFVBQVUsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUM7UUFDM0QsQ0FBQztRQUNELElBQUksRUFBRTtZQUNMLElBQUksTUFBTSxHQUFHLElBQUksRUFDaEIsV0FBVyxHQUFHLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFDckMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRTFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVmLElBQUksQ0FBQyxJQUFJLElBQUksb0NBQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRXZDLElBQUksR0FBRyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFFekMsSUFBSSxDQUFDLElBQUksSUFBSSxvQ0FBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUNuQyxPQUFPO2dCQUNSLENBQUM7WUFDRixDQUFDO1lBRUQsSUFBSSxXQUFXLEdBQUcscUNBQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNwRSxxQ0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELE9BQU8sRUFBRSxlQUFlO0tBQ3hCO0lBQ0QsY0FBYztJQUVkLHFCQUFxQjtJQUNyQixHQUFHLEVBQUU7UUFDSixLQUFLLEVBQUUsVUFBVSxPQUFZLEVBQUUsVUFBdUI7WUFDckQsT0FBTyxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDO1FBQzNELENBQUM7UUFDRCxJQUFJLEVBQUU7WUFDTCxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQ2hCLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQ3JDLElBQUksR0FBRyxXQUFXLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUUxQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFZixJQUFJLENBQUMsSUFBSSxJQUFJLG9DQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUV2QyxJQUFJLEdBQUcsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBRXpDLElBQUksQ0FBQyxJQUFJLElBQUksb0NBQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztvQkFDbkMsT0FBTztnQkFDUixDQUFDO1lBQ0YsQ0FBQztZQUVELElBQUksV0FBVyxHQUFHLHFDQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDcEUscUNBQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFDRCxPQUFPLEVBQUUsZUFBZTtLQUN4QjtJQUNELGNBQWM7SUFHZCx1QkFBdUI7SUFDdkIsS0FBSyxFQUFFO1FBQ04sSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUUsT0FBTztLQUNoQjtJQUNELGNBQWM7SUFFZCwwQkFBMEI7SUFDMUIsUUFBUSxFQUFFO1FBQ1QsS0FBSyxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksRUFBRTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsT0FBTyxFQUFFO1lBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxPQUFPLEVBQUUsVUFBVTtRQUNuQixRQUFRLEVBQUUsY0FBYztLQUN4QjtJQUNELGNBQWM7SUFFZCx3QkFBd0I7SUFDeEIsTUFBTSxFQUFFO1FBQ1AsS0FBSyxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksRUFBRTtZQUNMLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFDRCxPQUFPLEVBQUU7WUFDUixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBQ0QsT0FBTyxFQUFFLGFBQWE7UUFDdEIsUUFBUSxFQUFFLGNBQWM7S0FDeEI7SUFDRCxjQUFjO0lBRWQscURBQXFEO0lBQ3JELHFEQUFxRDtJQUNyRCxpQkFBaUI7SUFDakIsTUFBTSxFQUFFLEVBQUU7Q0FDVixDQUFDO0FBRUYsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeDhCUztBQUVwQzs7O0dBR0c7QUFDSCxJQUFJLG9CQUFvQixHQUE2QixFQUFFLENBQUM7QUFFeEQ7Ozs7R0FJRztBQUNJLE1BQU0sWUFBWSxHQUFXLENBQUMsQ0FBQztBQUV0Qzs7OztHQUlHO0FBQ0ksTUFBTSxTQUFTLEdBQVcsQ0FBQyxDQUFDO0FBRW5DOzs7O0dBSUc7QUFDSSxNQUFNLFlBQVksR0FBVyxDQUFDLENBQUM7QUFFdEM7Ozs7R0FJRztBQUNJLE1BQU0sYUFBYSxHQUFXLENBQUMsQ0FBQztBQUV2Qzs7OztHQUlHO0FBQ0ksTUFBTSxzQkFBc0IsR0FBVyxFQUFFLENBQUM7QUFFakQsU0FBUyxPQUFPLENBQUMsS0FBVTtJQUMxQixLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTFCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNJLFNBQVMsYUFBYSxDQUFDLEdBQVcsRUFBRSxVQUFxQyxFQUFFLE9BQWtCO0lBQ25HLElBQUksV0FBVyxHQUFHLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFFekIsMkNBQVUsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLFVBQVUsR0FBc0IsRUFBRSxLQUFVO1FBQ3JFLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQWUsQ0FBQztRQUM3QyxDQUFDO2FBQ0ksSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDN0Isa0JBQWtCO1lBQ2xCLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFMUIsQ0FBQzthQUNJLENBQUM7WUFDTCxXQUFXLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQztBQUNwQixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxPQUFPLENBQUMsSUFBaUIsRUFBRSxRQUFnQjtJQUMxRCxJQUFJLE9BQU8sR0FBRyxFQUF3QixDQUFDO0lBQ3ZDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztJQUVsQixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUF5QixDQUFDO1dBQzlDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLENBQUM7SUFDRixDQUFDO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDaEIsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNJLFNBQVMsTUFBTSxDQUFDLElBQWlCLEVBQUUsUUFBZ0I7SUFDekQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBRWxCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQXlCLENBQUM7V0FDOUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLE9BQU8sTUFBTSxDQUFDO1FBQ2YsQ0FBQztJQUNGLENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNJLFNBQVMsT0FBTyxDQUFDLElBQWlCLEVBQUUsUUFBZ0I7SUFDMUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUNELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRSxPQUFPLFVBQVUsQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsTUFBTSxDQUFDLElBQVU7SUFDaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLFNBQVMsV0FBVyxDQUFDLElBQW9DLEVBQUUsS0FBNEM7SUFDN0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxJQUFJLENBQUMsSUFBNEIsRUFBRSxRQUFnQjtJQUNsRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxJQUFJLGFBQWEsR0FBWSxJQUFJLENBQUM7QUFFekM7Ozs7O0dBS0c7QUFDSSxJQUFJLFlBQVksR0FBWSxLQUFLLENBQUM7QUFFekM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxzQ0FBc0M7QUFDL0IsU0FBUyxFQUFFLENBQUMsSUFBMkQsRUFBRSxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxFQUFPLEVBQUUsVUFBbUIsS0FBSztJQUNsSixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUs7UUFDeEMsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJLCtDQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM5QixPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFNO2dCQUNqRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUN0QixPQUFPLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ2xDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUMxQixFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsT0FBTztvQkFDUixDQUFDO29CQUVELE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUM1QixDQUFDO1lBQ0YsQ0FBQyxDQUFDO1lBRUYsRUFBRSxDQUFDLGFBQWEsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2hELENBQUM7YUFBTSxDQUFDO1lBQ1AsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsc0NBQXNDO0FBQy9CLFNBQVMsR0FBRyxDQUFDLElBQWlDLEVBQUUsTUFBYyxFQUFFLFFBQWdCLEVBQUUsRUFBeUIsRUFBRSxVQUFtQixLQUFLO0lBQzNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSztRQUN4QyxJQUFJLE9BQU8sQ0FBQztRQUVaLElBQUksK0NBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUksR0FBRyxHQUFHLGFBQWEsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQzNDLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBc0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7YUFBTSxDQUFDO1lBQ1AsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0ksU0FBUyxJQUFJLENBQUMsSUFBaUIsRUFBRSxJQUFZLEVBQUUsS0FBYztJQUNuRSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1osVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO1NBQU0sQ0FBQztRQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNsQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxTQUFTLFVBQVUsQ0FBQyxJQUFpQixFQUFFLElBQVk7SUFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNJLFNBQVMsSUFBSSxDQUFDLElBQWlCO0lBQ3JDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxJQUFJLENBQUMsSUFBaUI7SUFDckMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLE1BQU0sQ0FBQyxJQUFpQjtJQUN2QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7U0FBTSxDQUFDO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0ksU0FBUyxHQUFHLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxLQUFXO0lBQ3BELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztJQUNsQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDMUIsSUFBSSwrQ0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsRSxDQUFDO1FBQ0QsMkNBQVUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsS0FBSztZQUNwQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7U0FBTSxDQUFDO1FBQ1Asd0RBQXdEO1FBQ3hELG9DQUFvQztRQUNwQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNoRSxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDO0FBR0Q7Ozs7Ozs7Ozs7O0dBV0c7QUFDSSxTQUFTLElBQUksQ0FBQyxJQUFTLEVBQUUsR0FBUyxFQUFFLEtBQVc7SUFDckQsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7SUFFbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RCLDJDQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJO2dCQUM1QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQy9CLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBc0IsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELElBQUksVUFBVSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0FBQ0YsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNJLFNBQVMsRUFBRSxDQUFDLElBQWlCLEVBQUUsUUFBZ0I7SUFDckQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFLENBQUM7UUFDNUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQztBQUdEOzs7Ozs7Ozs7R0FTRztBQUNJLFNBQVMsUUFBUSxDQUFDLElBQVUsRUFBRSxLQUFrQjtJQUN0RCxPQUFPLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxzQkFBc0IsQ0FBQyxJQUFpQixFQUFFLFFBQWlCO0lBQzFFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBcUMsQ0FBQztJQUV0RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxZQUFZLENBQUMsSUFBb0MsRUFBRSxPQUFnQjtJQUNsRixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUQsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBaUI7SUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsT0FBTyxRQUFRLENBQUM7QUFDakIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxJQUFpQixFQUFFLFNBQWlCO0lBQzVELE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVEOzs7R0FHRztBQUNJLFNBQVMsUUFBUSxDQUFDLElBQWlCLEVBQUUsU0FBaUI7SUFDNUQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVEOzs7R0FHRztBQUNJLFNBQVMsV0FBVyxDQUFDLElBQWlCLEVBQUUsU0FBaUI7SUFDL0QsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLGtEQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNJLFNBQVMsV0FBVyxDQUFDLElBQWlCLEVBQUUsU0FBaUIsRUFBRSxLQUFlO0lBQ2hGLEtBQUssR0FBRyxrREFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFdEUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNYLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQztTQUFNLENBQUM7UUFDUCxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxLQUFLLENBQUMsSUFBaUIsRUFBRSxLQUF1QjtJQUMvRCxJQUFJLGtEQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXhFLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxNQUFNLENBQUMsSUFBaUIsRUFBRSxLQUF1QjtJQUNoRSxJQUFJLGtEQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXhFLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNJLFNBQVMsT0FBTyxDQUFDLElBQWlCLEVBQUUsU0FBaUIsRUFBRSxJQUFVO0lBQ3ZFLElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxpREFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLElBQUk7WUFDaEIsTUFBTSxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7SUFDSixDQUFDO1NBQU0sQ0FBQztRQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLFNBQVMsU0FBUyxDQUFDLElBQWlCO0lBQzFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDdkMsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBUyxTQUFTLENBQUMsR0FBVztJQUM3QixPQUFPLEdBQUc7U0FDUixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztTQUN2QixPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsS0FBSyxFQUFFLElBQUk7UUFDdkMsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBR0Q7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILHNDQUFzQztBQUMvQixTQUFTLFFBQVEsQ0FBQyxJQUFTLEVBQUUsSUFBZ0MsRUFBRSxjQUF3QixFQUFFLFlBQXNCLEVBQUUsVUFBbUIsS0FBSztJQUMvSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBRWxELE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFN0QsSUFDQyxDQUFDLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUM7WUFDekMsQ0FBQyxDQUFDLFlBQVksSUFBSSxRQUFRLENBQ3pCLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQ2pELEtBQUssS0FBSyxDQUFDO1lBQ1osQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUN2QyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFFRDs7O0dBR0c7QUFDSSxTQUFTLFNBQVMsQ0FBQyxJQUFTLEVBQUUsSUFBNkIsRUFBRSxjQUF3QixFQUFFLFlBQXNCO0lBQ25ILFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSSxTQUFTLFNBQVMsQ0FBQyxJQUFZLEVBQUUsT0FBa0I7SUFDekQsT0FBTyxHQUFHLE9BQU8sSUFBSSxRQUFRLENBQUM7SUFFOUIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDM0MsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFNUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFHckIsT0FBTyxHQUFHLENBQUMsVUFBeUIsRUFBRSxDQUFDO1FBQ3RDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQXlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDWixDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0ksU0FBUyxVQUFVLENBQUMsSUFBaUI7SUFDM0MsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEdBQUcsQ0FBQztRQUMvRCxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLCtDQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0ksU0FBUyxjQUFjLENBQUMsT0FBb0IsRUFBRSxTQUFpQjtJQUNyRSxJQUFJLFVBQVUsR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFckUsMkNBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxFQUFFLFNBQVM7UUFDcEQsb0RBQW9EO1FBQ3BELG1EQUFtRDtRQUNuRCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDO1lBQ0osSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBR0gsT0FBTyxPQUFPLENBQUMsVUFBeUIsRUFBRSxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQXlCLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXJELE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksSUFBSSxjQUFjLEdBQVcsK0NBQStDO0lBQ2xGLG1FQUFtRTtJQUNuRSx1RUFBdUU7SUFDdkUsNkJBQTZCLENBQUM7QUFFL0I7Ozs7OztHQU1HO0FBQ0ksU0FBUyxlQUFlLENBQUMsSUFBeUQ7SUFDeEYsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDN0MsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsMERBQTBEO0lBQzFELHlEQUF5RDtJQUN6RCwrREFBK0Q7SUFDL0QsT0FBTyxDQUFDLDBEQUEwRDtRQUNqRSw2REFBNkQ7UUFDN0QsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxRQUFRLENBQUMsR0FBc0IsRUFBRSxxQkFBOEIsS0FBSztJQUNuRixJQUFJLE9BQU8sRUFDVixRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQztJQUU5QyxJQUFJLFFBQVEsS0FBSyxZQUFZLEVBQUUsQ0FBQztRQUMvQixPQUFPLFFBQVEsS0FBSyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXBDLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNJLFNBQVMsT0FBTyxDQUFDLElBQWlCLEVBQUUsRUFBZTtJQUN6RCxJQUFJLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzFELENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxTQUFTLE9BQU8sQ0FBQyxJQUFvQztJQUMzRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBd0IsQ0FBQztJQUM5QyxJQUFJLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNJLFNBQVMsVUFBVSxDQUFDLElBQWlCO0lBQzNDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxJQUFJO1FBQzVCLElBQUksSUFBSSxHQUFHLE9BQU8sRUFDakIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFDakUsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUF5QixDQUFDO1FBRXpDLGdFQUFnRTtRQUNoRSxvREFBb0Q7UUFDcEQsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNuRSxtQ0FBbUM7WUFDbkMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFtQixDQUFDO1lBRTNDLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQXlCLEVBQUUsSUFBSSxDQUFDO2dCQUMvRCxnQkFBZ0IsQ0FBQyxVQUEwQixDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDL0QsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsVUFBeUIsQ0FBQztZQUMvRCxDQUFDO1lBRUQsSUFBSSxNQUFNLEdBQUcsZUFBZSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JELElBQUksTUFBTSxHQUFHLElBQW1CLENBQUM7WUFFakMsMkRBQTJEO1lBQzNELE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRSxDQUFDO29CQUN0QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFpQixDQUFDO29CQUM5QyxPQUFRLE1BQU0sQ0FBQyxVQUEwQixFQUFFLENBQUM7d0JBQzNDLFdBQVcsQ0FBQyxLQUFLLEVBQUcsTUFBTSxDQUFDLFVBQTBCLENBQUMsQ0FBQztvQkFDeEQsQ0FBQztvQkFFRCxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBeUIsQ0FBQztZQUMzQyxDQUFDO1lBRUQsWUFBWSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDdEIsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQ0QsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO2dCQUMvQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0YsQ0FBQztRQUVELGdFQUFnRTtRQUNoRSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBeUIsQ0FBQztRQUNwRCxJQUFJLE9BQU8sSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMzRCxJQUFJLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNULEVBQUUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUVELFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNJLFNBQVMsa0JBQWtCLENBQUMsS0FBa0IsRUFBRSxLQUFrQjtJQUN4RSxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUF5QixDQUFDLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDRixDQUFDO0FBQ0YsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFVBQVUsQ0FBQyxJQUFrQixFQUFFLFdBQW9CLEtBQUs7SUFDdkUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBRUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQXlCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0gsT0FBTyxPQUFzQixDQUFDO0FBQy9CLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLFNBQVMsZ0JBQWdCLENBQUMsSUFBaUI7SUFDakQsSUFBSSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUN2RCxRQUFRLEVBQUUsU0FBUyxFQUNuQixhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUM7SUFDdkMsbUNBQW1DO0lBQ25DLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQy9DLElBQUksR0FBRyxJQUFJLENBQUMsVUFBeUIsQ0FBQztJQUV2Qyw2Q0FBNkM7SUFDN0MsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFDekMsT0FBTztJQUNSLENBQUM7SUFFRCxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2IsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUEwQixDQUFDO1FBQzNDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzNCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXpCLElBQUksUUFBUSxLQUFLLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbEMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUVsQixPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxDQUFDO2dCQUMvQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBRUQseURBQXlEO1lBQ3pELGdEQUFnRDtZQUNoRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDaEMsZUFBZSxHQUFHLFFBQVEsQ0FBQztnQkFFM0IsT0FBTyxlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ2xDLGVBQWUsR0FBRyxlQUFlLENBQUMsU0FBd0IsQ0FBQztvQkFFM0QscUNBQXFDO29CQUNyQyxPQUFPLFFBQVEsQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxDQUFDO3dCQUN0RCxlQUFlLEdBQUcsVUFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDckQsQ0FBQztnQkFDRixDQUFDO2dCQUVELFNBQVMsR0FBRyxlQUFlLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDO29CQUNuRCxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM5QyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBRUQsMEJBQTBCO1lBQzFCLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU3QywyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDbkQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzVCLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFDNUMsRUFBRSxDQUNGLENBQUM7WUFDSCxDQUFDO1lBRUQsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQzVCLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFDNUMsRUFBRSxDQUNGLENBQUM7WUFDSCxDQUFDO1lBRUQsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLENBQUM7aUJBQU0sQ0FBQztnQkFDUCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQ2pDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFDNUMsR0FBRyxDQUNILENBQUM7WUFDSCxDQUFDO1FBQ0YsQ0FBQztRQUVELElBQUksR0FBRyxRQUFRLENBQUM7SUFDakIsQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSSxTQUFTLGVBQWUsQ0FBQyxTQUFzQixFQUFFLE9BQW9CO0lBQzNFLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFbEQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTNCLE9BQU8sS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ2hDLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLFNBQVMsU0FBUyxDQUFDLElBQWlCO0lBQzFDLElBQUksSUFBSSxHQUFHLENBQUMsRUFDWCxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRVQsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNiLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3hCLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsWUFBMkIsQ0FBQztJQUN6QyxDQUFDO0lBRUQsT0FBTztRQUNOLElBQUksRUFBRSxJQUFJO1FBQ1YsR0FBRyxFQUFFLEdBQUc7S0FDUixDQUFDO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNJLFNBQVMsUUFBUSxDQUFDLEdBQWdCLEVBQUUsUUFBZ0I7SUFDMUQsSUFBSSxVQUFrQixDQUFDO0lBQ3ZCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFFekIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDckMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxRQUFRLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVqRCxrQ0FBa0M7SUFDbEMsSUFBSSxXQUFXLEtBQUssUUFBUSxFQUFFLENBQUM7UUFDOUIsVUFBVSxHQUFHLFVBQVUsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEtBQUssVUFBVTtZQUMvQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxLQUFLLE9BQU8sSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDdEQsT0FBTyxFQUFFLENBQUM7UUFDWCxDQUFDO0lBQ0YsQ0FBQztJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0ksU0FBUyxRQUFRLENBQUMsR0FBZ0IsRUFBRSxRQUFnQixFQUFFLE1BQTRCO0lBQ3hGLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFekMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFNLElBQUksVUFBVSxLQUFLLE1BQU07UUFDdEMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILFNBQVMsV0FBVyxDQUFDLEtBQWtCLEVBQUUsS0FBa0I7SUFDMUQsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDM0IsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDWixJQUFJLElBQUksR0FBVyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDL0UsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0YsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFTLGVBQWUsQ0FBQyxLQUFrQixFQUFFLEtBQWtCO0lBQzlELElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2hDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbkMsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNoQixPQUFPLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDRixDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQVMsa0JBQWtCLENBQUMsSUFBaUI7SUFFNUMsT0FBUSxJQUFJLENBQUMsVUFBNkMsRUFBRSxDQUFDO1FBQzVELFlBQVksQ0FBRSxJQUFJLENBQUMsVUFBNkMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0ksU0FBUyxLQUFLLENBQUMsSUFBaUI7SUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQ3BDLE9BQU87SUFDUixDQUFDO0lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQXlCLENBQUM7SUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMzQixJQUFJLFNBQVMsR0FBRyx1QkFBdUIsQ0FBQztJQUV4Qyx5REFBeUQ7SUFDekQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDL0IsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1osS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFnQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxPQUFPO0lBQ1IsQ0FBQztJQUVELHVEQUF1RDtJQUN2RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDdEIsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDRixDQUFDO0lBRUQsMERBQTBEO0lBQzFELHdFQUF3RTtJQUN4RSw4Q0FBOEM7SUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxQix5Q0FBeUM7UUFDekMsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDeEIsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRTtnQkFDeEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLENBQUM7WUFFRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUNqRCxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFFRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN2RCxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDRixDQUFDO1FBRUQsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDMUQsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQzthQUFNLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3BDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQztZQUVoQyxPQUFPLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxDQUFDLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLEtBQUssUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFFdkQseUJBQXlCO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxPQUFPO29CQUM5QixDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQ2hDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixNQUFNO2dCQUNQLENBQUM7Z0JBRUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUF5QixDQUFDO1lBQzNDLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBMEIsQ0FBQztJQUMzQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDckUsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvc0M0QjtBQUNPO0FBQ2E7QUFDRDtBQUNBO0FBQ0o7QUFDTDtBQUNEO0FBQ0U7QUFDQztBQUNQO0FBRWxDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFFekI7Ozs7R0FJRztBQUNILE1BQXFCLFNBQVM7SUFHN0IsWUFBWSxRQUFhLEVBQUUsV0FBZ0I7UUFzaEQzQzs7Ozs7V0FLRztRQUNLLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBNkNoQzs7Ozs7V0FLRztRQUNLLGlCQUFZLEdBQVEsTUFBdUIsRUFBQztRQXNEcEQ7Ozs7O1dBS0c7UUFDSyxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFvQ25DOzs7Ozs7V0FNRztRQUNLLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBVS9COzs7OztXQUtHO1FBQ0sscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBa0JuQzs7O1dBR0c7UUFDSyx3QkFBbUIsR0FBRyxHQUFTLEVBQUU7WUFDeEMsSUFBSSxVQUFVLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUNyQiwyQ0FBVSxDQUFDLHNDQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRTtvQkFDL0QsNkNBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDUixDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUM3QyxJQUFJLFVBQVUsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7b0JBQzlDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRXJDLElBQUksK0NBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDOzRCQUNKLEtBQUssR0FBRyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRWxELHFDQUFxQzs0QkFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQ0FDaEIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hELENBQUM7d0JBQ0YsQ0FBQzt3QkFBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0YsQ0FBQztxQkFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3hCLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBRUQsNkNBQWUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFVBQVUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELDZDQUFlLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7Ozs7V0FLRztRQUNLLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBRWpDOzs7V0FHRztRQUNLLGtCQUFhLEdBQUcsQ0FBQyxPQUFpQixFQUFRLEVBQUU7WUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBRW5FLDJDQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDN0MsNkNBQWUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBMENGOzs7O1dBSUc7UUFDSyxxQkFBZ0IsR0FBRyxHQUFTLEVBQUU7WUFDckMsNEJBQTRCO1lBQzVCLElBQUksT0FBTyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkUseUNBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRTtvQkFDaEQsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDekIsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLFNBQUksR0FBRyxHQUFTLEVBQUU7WUFDekIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUdoQyxjQUFjO1lBQ2QsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDckUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3pCLENBQUM7WUFFRCxVQUFVLENBQUMsZUFBZSxHQUFHLCtDQUFpQixDQUFDLEtBQUssRUFBRTtnQkFDckQsU0FBUyxFQUFFLHFCQUFxQjthQUNoQyxDQUFtQixDQUFDO1lBRXJCLDhDQUFnQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xFLHFDQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUxRSxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3JELFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUVyQyxJQUFJLFVBQVUsR0FBRyxFQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2RDs7Ozs7a0JBS0c7WUFDSCxVQUFVLENBQUMsYUFBYSxHQUFHLElBQUkseURBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtnQkFDckUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hDLFVBQVUsQ0FBQyxNQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBRUQsa0JBQWtCO1lBQ2xCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQixVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hCLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFeEIsMkRBQTJEO1lBQzNELGVBQWU7WUFDZixJQUFJLENBQUMsMkRBQTBCLEVBQUUsQ0FBQztnQkFDakMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDL0IsQ0FBQztZQUVELFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRWpDLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDakIscUNBQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFekMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNsQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQUVELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDeEIsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQixtQ0FBbUM7Z0JBQ25DLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3BDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztZQUNGLENBQUMsQ0FBQztZQUNGLG9DQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEMsSUFBSSxTQUFTLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLEVBQUUsQ0FBQztZQUNWLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0ssZUFBVSxHQUFHLEdBQVMsRUFBRTtZQUMvQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7WUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFFRCxnRUFBZ0U7WUFDaEUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2xELENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxlQUFVLEdBQUcsR0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsK0NBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBd0IsQ0FBQztZQUMvRSxJQUFJLENBQUMsYUFBYSxHQUFHLCtDQUFpQixDQUFDLFFBQVEsRUFBRTtnQkFDaEQsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLGVBQWUsRUFBRSxNQUFNO2FBQ3ZCLENBQXNCLENBQUM7WUFFeEI7Ozs7a0JBSUc7WUFDSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDcEMsMENBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5QixDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsMENBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNsRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzlCLHNDQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUVELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzlDLHNDQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUVELGtDQUFrQztZQUNsQyw2Q0FBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFELDZDQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFekQsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksdUNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLHdDQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNoRCxDQUFDO1lBRUYsa0RBQWtEO1lBQ2xELElBQUksU0FBUyxHQUFHLDRDQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRTFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7WUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyx5REFBUyxDQUFDLE1BQU0sRUFBRTtnQkFDNUMsS0FBSyxFQUFFLFVBQVUsR0FBRyxTQUFTLEdBQUcsR0FBRztnQkFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtnQkFDL0QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSzthQUN6QixDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQXVCLENBQUM7WUFDaEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUV0RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZDLDhCQUE4QjtZQUM5QixJQUFJLDRDQUFXLEVBQUUsQ0FBQztnQkFDakIsd0NBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxvQ0FBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUVELElBQUksUUFBUSxHQUFHLHNDQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNuRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELHNDQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFEQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVFLDBDQUEwQztZQUMxQyxzQ0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUN6QyxzQ0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFeEMsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUM1QyxzQ0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxnQkFBVyxHQUFHLEdBQVMsRUFBRTtZQUNoQyw2REFBNkQ7WUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM3QixvQ0FBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hELG9DQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcscUNBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQztZQUN0RSxDQUFDO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU3QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzdCLHNEQUFzRDtnQkFDdEQsb0NBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSwrQ0FBaUIsQ0FBQyxDQUFDO2dCQUMzRSxvQ0FBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25CLENBQUM7WUFFRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssZUFBVSxHQUFHLEdBQVMsRUFBRTtZQUMvQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxpQkFBaUIsR0FBRyxpQ0FBaUMsQ0FBQztZQUMxRCxJQUFJLGVBQWUsR0FBRyxxREFBcUQsQ0FBQztZQUM1RSxJQUFJLG9CQUFvQixHQUFHLG1CQUFtQixJQUFJLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0UsaUJBQWlCLENBQUMsQ0FBQztnQkFDbkIscURBQXFELENBQUM7WUFFdkQsb0NBQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVqRSxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNWLG9DQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN4RCxvQ0FBTSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSwrQ0FBaUIsQ0FBQyxDQUFDO1lBQzlFLENBQUM7WUFFRCxvQ0FBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlELG9DQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdELG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVFLG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMxRSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM1RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN0RixvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzdGLG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU5RSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbEUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDcEYsQ0FBQztZQUVELG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO29CQUN2QiwwQ0FBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDbEQsNkNBQWUsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1lBRUgsb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0Usb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDN0Usb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNFLG9DQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkYsb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRS9FLG9DQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRixvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pHLG9DQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU1RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFGLG9DQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0YsMkJBQTJCO1lBQzNCLG9DQUFNLENBQ0wsVUFBVSxDQUFDLGVBQWUsRUFDMUIsMERBQTBELEVBQzFELElBQUksRUFDSixVQUFVLENBQUMsV0FBVyxDQUN0QixDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssZ0JBQVcsR0FBRyxHQUFTLEVBQUU7WUFDaEMsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO1lBQzNCLElBQUksS0FBVSxDQUFDO1lBQ2YsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxJQUFJLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkQsVUFBVSxDQUFDLE9BQU8sR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQzdDLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLFlBQVksRUFBRSxJQUFJO2FBQ2xCLENBQW1CLENBQUM7WUFFckIsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pELFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNwRSxDQUFDO1lBRUQsMkNBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQ25DLEtBQUssR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hDLFNBQVMsRUFBRSxpQkFBaUI7aUJBQzVCLENBQUMsQ0FBQztnQkFFSCwyQ0FBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUU7b0JBQ25ELElBQUksTUFBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUUzRCwyREFBMkQ7b0JBQzNELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNuRCxPQUFPO29CQUNSLENBQUM7b0JBRUQsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQzVCLE1BQU0sR0FBRyx5REFBUyxDQUFDLGVBQWUsRUFBRTt3QkFDbkMsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLFFBQVEsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJOzRCQUMxQyxPQUFPLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQztxQkFDaEMsRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7b0JBRXBCLElBQUksVUFBVSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNqRCxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDaEQsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDViw4Q0FBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFDcEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNwQiwwQ0FBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDbEMsQ0FBQztvQkFDRixDQUFDO29CQUVELE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3hDLDZDQUFlLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkQsb0NBQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFO3dCQUMxQyxJQUFJLENBQUMsMENBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQzs0QkFDdkMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzNDLENBQUM7d0JBRUQsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsa0RBQWtEO29CQUNsRCxvQ0FBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUU7d0JBQzlDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDckIsc0NBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUN2QixVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7NEJBQ3JDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ3ZDLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxJQUFJLFFBQVEsRUFBRSxDQUFDO3dCQUNkLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUMvQyxDQUFDO29CQUVELElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNuQixVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOzRCQUNoQyxJQUFJLEVBQUUsV0FBVzs0QkFDakIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO3lCQUNwQixDQUFDLENBQUM7d0JBQ0gsMERBQTBEO29CQUMzRCxDQUFDO3lCQUFNLElBQUksK0NBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDekMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQzs0QkFDaEMsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSTt5QkFDbkIsQ0FBQyxDQUFDO29CQUNKLENBQUM7b0JBRUQsNkNBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQy9CLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztnQkFFSCx1QkFBdUI7Z0JBQ3ZCLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUN0Qiw2Q0FBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILDZEQUE2RDtZQUM3RCw2Q0FBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEcsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssZUFBVSxHQUFHLEdBQVMsRUFBRTtZQUMvQixJQUFJLFNBQWMsRUFBRSxTQUFjLEVBQUUsUUFBYSxFQUFFLFFBQWEsRUFBRSxhQUFrQixFQUFFLFdBQWdCLEVBQUUsSUFBSSxHQUFHLCtDQUFpQixDQUFDLEtBQUssRUFBRTtnQkFDdkksU0FBUyxFQUFFLGdCQUFnQjthQUMzQixDQUFDO1lBQ0QsdURBQXVEO1lBQ3ZELCtCQUErQjtZQUMvQixLQUFLLEdBQUcsK0NBQWlCLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxTQUFTLEVBQUUsd0JBQXdCO2FBQ25DLENBQUMsRUFBRSxVQUFVLEdBQUcscUJBQXFCLEVBQUUsU0FBUyxHQUFHLDhCQUE4QixFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyx1Q0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxVQUFVLEdBQUcsd0NBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsVUFBVSxHQUFHLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRW5TLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQzdELFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQzdELFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzNELFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBRTNELGFBQWEsR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO2dCQUM1Qix3QkFBd0I7Z0JBQ3hCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxVQUFVLEdBQUksQ0FBZ0IsQ0FBQztvQkFDbkMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUMxQyxJQUFJLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLENBQUM7cUJBQU0sQ0FBQztvQkFDUCxJQUFJLFVBQVUsR0FBSSxDQUFnQixDQUFDO29CQUNuQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztvQkFDeEIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLENBQUM7Z0JBRUQsSUFBSSxTQUFTLEdBQUcsV0FBVyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDOUQsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxRQUFRLEVBQUUsQ0FBQztvQkFDekMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDckIsQ0FBQztnQkFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLFFBQVEsRUFBRSxDQUFDO29CQUN6QyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUNyQixDQUFDO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMvQixRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUN0QixDQUFDO2dCQUVELElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsU0FBUyxFQUFFLENBQUM7b0JBQzVDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQ0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztvQkFDNUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsQ0FBQztnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDaEMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsQ0FBQztnQkFFRCxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBRUQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVGLFdBQVcsR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2pCLE9BQU87Z0JBQ1IsQ0FBQztnQkFFRCxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUVuQixzQ0FBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQiw2Q0FBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xELHFDQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3BELHFDQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRWpELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUM7WUFFRixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ1YsNkNBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzVCLDBDQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0YsQ0FBQztZQUVELDZDQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1Qyw2Q0FBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0Msc0NBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVoQixvQ0FBTSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRTtnQkFDdkQsd0JBQXdCO2dCQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFLENBQUM7b0JBQzdCLElBQUksRUFBRSxHQUFHLENBQWUsQ0FBQztvQkFDekIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUM3QixNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLENBQUM7cUJBQU0sQ0FBQztvQkFDUCxJQUFJLEVBQUUsR0FBRyxDQUFlO29CQUN4QixNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztvQkFDbEIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsVUFBVSxHQUFHLHVDQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3QyxXQUFXLEdBQUcsd0NBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQy9DLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBRWxCLDBDQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDL0Msc0NBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsb0NBQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDbkQsb0NBQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFFaEQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssa0JBQWEsR0FBRyxHQUFTLEVBQUU7WUFDbEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztZQUU1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsNkNBQVksQ0FDL0IsRUFBRSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUN4RCxDQUFDO1lBQ0gsQ0FBQztZQUVELDJDQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDMUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyx5REFBUyxDQUFDLFVBQVUsRUFBRTtvQkFDcEQsR0FBRyxFQUFFLEdBQUc7b0JBQ1Isd0NBQXdDO29CQUN4QyxHQUFHLEVBQUUsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUM7b0JBQzVCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUc7aUJBQzNCLENBQUMsQ0FBQztnQkFFSCx1QkFBdUI7Z0JBQ3ZCLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN6QyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywrQ0FBaUIsQ0FBQyxLQUFLLEVBQUU7d0JBQ3JELEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztxQkFDNUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssY0FBUyxHQUFHLENBQUMsUUFBYSxFQUFRLEVBQUU7WUFDM0MsSUFBSSxLQUFLLEVBQUUsTUFBTSxDQUFDO1lBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBeUIsQ0FBQztZQUV0RCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLDJDQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7Z0JBQzFDLE9BQU87WUFDUixDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXZELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUVwRCxPQUFPO1lBQ1IsQ0FBQztZQUVELGtEQUFvQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUV2QyxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNkLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBd0IsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ3pCLElBQUksR0FBRywrQ0FBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQWdCLENBQUM7b0JBQ3ZFLDZDQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekMsQ0FBQztnQkFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUF3QixDQUFDO29CQUVyQywrQ0FBK0M7b0JBQy9DLElBQUksb0NBQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUNoRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQThCLENBQUM7b0JBQzVDLENBQUM7Z0JBQ0YsQ0FBQztZQUNGLENBQUM7WUFFRCxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUUzQyxJQUFJLENBQUMsaURBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFM0IsSUFBSSxRQUFRLEVBQUUsQ0FBQztvQkFDZCxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQixDQUFDO1lBQ0YsQ0FBQztpQkFBTSxDQUFDO2dCQUNQLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7WUFFOUIsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQztZQUM1RCxDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO1FBRUY7O1dBRUc7UUFDSyxlQUFVLEdBQUcsR0FBUyxFQUFFO1lBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDekQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pFLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyx3QkFBbUIsR0FBRyxDQUFDLENBQWdCLEVBQVEsRUFBRTtZQUN4RCxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFFbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3RCLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7V0FRRztRQUNLLHFCQUFnQixHQUFHLENBQUMsQ0FBaUIsRUFBUSxFQUFFO1lBQ3RELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0MsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDWCxJQUFJLFNBQVMsR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxXQUFXLENBQUM7Z0JBRWhCLG1FQUFtRTtnQkFDbkUscUJBQXFCO2dCQUNyQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsdUJBQXVCLENBQUM7Z0JBQzNDLE9BQU8sTUFBTSxJQUFJLDBDQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzdDLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyw4Q0FBZ0IsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFpQixDQUFDO3dCQUM5QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDMUIsNkNBQWUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFVBQXlCLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFFRCw2Q0FBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDbEMsV0FBVyxHQUFHLFdBQVcsSUFBSSxLQUFLLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsNkNBQWUsQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxrREFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFaEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFMUQsa0VBQWtFO2dCQUNsRSxnRUFBZ0U7Z0JBQ2hFLGFBQWE7Z0JBQ2IsMkNBQVUsQ0FBQyxzQ0FBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDL0MsZ0RBQWtCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxvRUFBb0U7Z0JBQ3BFLDJDQUFVLENBQUMsc0NBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsMENBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzlELHdDQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsK0RBQStEO2dCQUMvRCxpRUFBaUU7Z0JBQ2pFLGdFQUFnRTtnQkFDaEUsNkNBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCx3Q0FBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUV0QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLG1CQUFjLEdBQUcsQ0FBQyxDQUFpQixFQUFRLEVBQUU7WUFDcEQsTUFBTSxnQkFBZ0IsR0FBVyxpQ0FBaUMsQ0FBQztZQUNuRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ2hDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRTtvQkFDMUIsYUFBYSxDQUFDLGVBQWUsQ0FBQzt3QkFDN0IsSUFBSSxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNO3FCQUM3QyxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDO1lBRUYsb0VBQW9FO1lBQ3BFLGlFQUFpRTtZQUNqRSxzQkFBc0I7WUFDdEIsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDZixJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7Z0JBQ25CLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQzVCLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBRTVCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDdkMseURBQXlEO29CQUN6RCxpQ0FBaUM7b0JBQ2pDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDcEMsaURBQWlEO3dCQUNqRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLElBQUksS0FBSzs0QkFDaEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUN2QyxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBQ2xELENBQUM7b0JBQ0YsQ0FBQztvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFDRCwrQkFBK0I7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBRTdDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLCtEQUErRDtnQkFDL0QsaUVBQWlFO1lBQ2xFLENBQUM7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUN2Qyw4Q0FBOEM7Z0JBQzlDLDRCQUE0QjtnQkFDNUIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFFbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUMvRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDNUIsNkNBQWUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLFVBQXlCLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNmLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7b0JBRTlCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUN4Qiw2Q0FBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDckQsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7b0JBRWxDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBRWhDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0sscUJBQWdCLEdBQUcsR0FBUyxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQywrQ0FDUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlFLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0ssNkJBQXdCLEdBQUcsR0FBVyxFQUFFO1lBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FDOUIsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLGtCQUFhLEdBQUcsQ0FBQyxNQUFXLEVBQUUsR0FBUSxFQUFRLEVBQUU7WUFDdkQsaURBQWlEO1lBQ2pELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7Z0JBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7d0JBQ2hDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEQsQ0FBQzt5QkFBTSxDQUFDO3dCQUNQLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQztvQkFDakUsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztpQkFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxpREFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QixDQUFDO3FCQUFNLENBQUM7b0JBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FDZixHQUFHLENBQUMsSUFBSSxFQUNSLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDN0UsQ0FBQztnQkFDSCxDQUFDO1lBQ0YsQ0FBQztRQUVGLENBQUMsQ0FBQztRQUVGOzs7Ozs7V0FNRztRQUNLLGdCQUFXLEdBQUcsQ0FBQyxJQUFxQixFQUFFLEdBQWEsRUFBRSxFQUFFO1lBQzlELElBQUksT0FBb0IsQ0FBQztZQUV6QiwwQ0FBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQWlCLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSwwQ0FBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM5QixnRUFBZ0U7b0JBQ2hFLGdDQUFnQztvQkFDaEMsNERBQTREO29CQUM1RCwrQ0FBK0M7b0JBQy9DLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssMkNBQWEsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQ0FBTSxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDZCxPQUFPLEdBQUcsK0NBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDMUMsOENBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNqQyxDQUFDO3dCQUVELDZDQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNoQyxDQUFDO2dCQUNGLENBQUM7cUJBQU0sQ0FBQztvQkFDUCxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0YsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDBCQUFxQixHQUFHLEdBQVMsRUFBRTtZQUMxQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO2dCQUNoQiw0REFBNEQ7Z0JBQzVELHFCQUFxQjtnQkFDckIsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtvQkFDMUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzFELFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ25DLG9EQUFvRDtvQkFDcEQsa0NBQWtDO2dCQUNuQyxDQUFDO3FCQUFNLElBQUksVUFBVSxDQUFDLFdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7b0JBQ25HLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUVyRSx1REFBdUQ7b0JBQ3ZELGFBQWE7b0JBQ2IsSUFBSSxVQUFVLENBQUMsZ0JBQWdCLElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUMxRSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO3dCQUN4RCxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO3dCQUVyRCx3REFBd0Q7d0JBQ3hELElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssMkNBQWEsRUFBRSxDQUFDOzRCQUNqRCxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFFRCxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDL0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQzVCLENBQUM7d0JBRUQsSUFBSSxNQUFNLElBQUksMENBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQzs0QkFDMUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDbkMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs0QkFDM0UsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDdkMsQ0FBQztvQkFDRixDQUFDO29CQUVELHlDQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUVELFVBQVUsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7WUFDNUMsQ0FBQztZQUVELElBQUksVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQ3hDLE9BQU87WUFDUixDQUFDO1lBRUQsVUFBVSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztZQUUxQyxxRUFBcUU7WUFDckUsSUFBSSxtQkFBbUIsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZELEtBQUssRUFBRSxDQUFDO1lBQ1QsQ0FBQztpQkFBTSxDQUFDO2dCQUNQLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEIsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7O1dBSUc7UUFDSyxtQkFBYyxHQUFHLENBQUMsQ0FBZ0IsRUFBUSxFQUFFO1lBQ25ELDhEQUE4RDtZQUM5RCxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixPQUFPO1lBQ1IsQ0FBQztZQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUM7Z0JBRTNCLGtFQUFrRTtnQkFDbEUsZ0VBQWdFO2dCQUNoRSxJQUFJLENBQUMsb0NBQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDO29CQUM1Qyw0Q0FBYyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7b0JBRXhDLElBQUksRUFBRSxHQUFHLCtDQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFaEMsK0RBQStEO29CQUMvRCw2REFBNkQ7b0JBQzdELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQzNCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFnQixDQUFDO29CQUV4Qyx5REFBeUQ7b0JBQ3pELElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssMkNBQWE7d0JBQ3BELFNBQVMsQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFFLENBQUM7d0JBQzdCLHdDQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3RCLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO29CQUM5QixDQUFDO29CQUVELHFEQUFxRDtvQkFDckQscURBQXFEO29CQUNyRCxtREFBbUQ7b0JBQ25ELDhCQUE4QjtvQkFDOUIsSUFBSSxDQUFDLDBDQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLFNBQVMsS0FBSyxFQUFFO3dCQUNsRCwwQ0FBWSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO3dCQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckMsQ0FBQztvQkFFRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3BCLENBQUM7WUFDRixDQUFDO1FBQ0YsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7O1dBUUc7UUFDSyxrQkFBYSxHQUFHLEdBQVMsRUFBRTtZQUNsQyx5REFBeUQ7WUFDekQseURBQXlEO1lBQ3pELGlCQUFpQjtZQUNqQiwyQ0FBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDN0MsZ0RBQWdEO2dCQUNoRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssOENBQWdCO29CQUNyQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMscUNBQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUUzQyxzQ0FBc0M7b0JBQ3RDLElBQUksQ0FBQyxvQ0FBTSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLDRDQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDN0QsSUFBSSxTQUFTLEdBQUcsK0NBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQ2pFLFNBQVMsQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDO3dCQUN0QyxTQUFTLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzt3QkFDL0IsNkNBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO3dCQUM3QyxPQUFPLEtBQUssQ0FBQztvQkFDZCxDQUFDO2dCQUNGLENBQUM7Z0JBRUQsMENBQTBDO2dCQUMxQyx1Q0FBdUM7Z0JBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6RCxvQ0FBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUNyQixPQUFPLEtBQUssQ0FBQztnQkFDZCxDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxvQkFBZSxHQUFHLEdBQVMsRUFBRTtZQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssb0JBQWUsR0FBRyxHQUFTLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQUVGOzs7O1dBSUc7UUFDSyxnQkFBVyxHQUFHLENBQUMsQ0FBUSxFQUFRLEVBQUU7WUFDeEMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLDRCQUE0QjtnQkFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BELENBQUM7WUFFRCxnREFBZ0Q7WUFDaEQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQXVDLENBQUM7WUFFOUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUU7b0JBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxzQkFBaUIsR0FBRyxDQUFDLENBQWdCLEVBQVEsRUFBRTtZQUN0RCxJQUFJLGdCQUFnQixFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWpILDBCQUEwQjtZQUMxQixJQUFJLHlDQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ2hELE9BQU87WUFDUixDQUFDO1lBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNyQixjQUFjLEdBQUcsRUFBRSxDQUFDO2dCQUVwQiwyQ0FBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7b0JBQzNDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMxQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLENBQU0sRUFBRSxFQUFFO29CQUN0QyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxtQkFBbUI7b0JBQ3ZCLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUN0RCxDQUFDO1lBRUQsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQ2pELElBQUksQ0FBQyxjQUFjLEVBQ25CLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxDQUFDLG1CQUFtQixFQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFDNUIsT0FBTyxDQUNQLENBQUM7WUFFRixJQUFJLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDNUQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNwQixDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLDZCQUF3QixHQUFHLEdBQVMsRUFBRTtZQUM3Qyx1REFBeUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLGtCQUFhLEdBQUcsQ0FBQyxDQUFnQixFQUFRLEVBQUU7WUFDbEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksUUFBUSxHQUFRLEVBQUUsRUFFckIsVUFBVSxHQUFRO2dCQUNqQixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsSUFBSTtnQkFDVCxJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRzthQUNSLEVBQUUsWUFBWSxHQUFRO2dCQUN0QixDQUFDLEVBQUUsV0FBVztnQkFDZCxDQUFDLEVBQUUsS0FBSztnQkFDUixFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsVUFBVTtnQkFDZCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsUUFBUTtnQkFDWixFQUFFLEVBQUUsVUFBVTtnQkFDZCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsTUFBTTtnQkFDVixFQUFFLEVBQUUsTUFBTTtnQkFDVixFQUFFLEVBQUUsSUFBSTtnQkFDUixFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsTUFBTTtnQkFDVixFQUFFLEVBQUUsUUFBUTtnQkFDWixFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsUUFBUTtnQkFDWixFQUFFLEVBQUUsR0FBRztnQkFDUCxFQUFFLEVBQUUsR0FBRztnQkFDUCxFQUFFLEVBQUUsR0FBRztnQkFDUCxFQUFFLEVBQUUsR0FBRztnQkFDUCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsS0FBSztnQkFDVixHQUFHLEVBQUUsS0FBSztnQkFDVixHQUFHLEVBQUUsS0FBSztnQkFDVixHQUFHLEVBQUUsU0FBUztnQkFDZCxHQUFHLEVBQUUsWUFBWTtnQkFDakIsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7YUFDVCxFQUFFLGlCQUFpQixHQUFRO2dCQUMzQixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsS0FBSztnQkFDVixHQUFHLEVBQUUsR0FBRztnQkFDUixFQUFFLEVBQUUsR0FBRztnQkFDUCxFQUFFLEVBQUUs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QUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0Y0QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTLDBDQUFJO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNsQyxNQUFNLEVBQUUsaURBQVk7S0FDcEI7SUFFRCxPQUFPLEVBQUUsNkRBQWEsQ0FBQyxPQUFPO0lBRTlCLE1BQU0sRUFBRSxDQUFDLFFBQTZCLEVBQUUsT0FBWSxFQUFRLEVBQUU7UUFDN0QsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFFeEIsMkNBQTJDO1FBQzNDLDRCQUE0QjtRQUM1QixJQUFJLDRDQUFVLENBQUMsUUFBUSxFQUFFLHNCQUFzQixDQUFDLEVBQUUsQ0FBQztZQUNsRCxPQUFPO1FBQ1IsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDLHdCQUF3QixJQUFJLCtEQUEwQixFQUFFLENBQUM7WUFDcEUsQ0FBQyxJQUFJLHNEQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNGLENBQUM7SUFFRCxRQUFRLEVBQUUsVUFBVSxRQUFhO1FBQ2hDLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixDQUFDO0NBQ0QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2VtbGVkaXRvci8uL25vZGVfbW9kdWxlcy9kb21wdXJpZnkvZGlzdC9wdXJpZnkuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL3RoZW1lcy9zcXVhcmUubGVzcz9kZGM2Iiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdENvbW1hbmRzLnRzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZG9tLnRzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZW1sRWRpdG9yLnRzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZW1vdGljb25zLnRzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvcGx1Z2luTWFuYWdlci50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3JhbmdlSGVscGVyLnRzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2RlZmF1bHRPcHRpb25zLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZXNjYXBlLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvdGVtcGxhdGVzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgQGxpY2Vuc2UgRE9NUHVyaWZ5IDMuMC45IHwgKGMpIEN1cmU1MyBhbmQgb3RoZXIgY29udHJpYnV0b3JzIHwgUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZSBsaWNlbnNlIDIuMCBhbmQgTW96aWxsYSBQdWJsaWMgTGljZW5zZSAyLjAgfCBnaXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvYmxvYi8zLjAuOS9MSUNFTlNFICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkRPTVB1cmlmeSA9IGZhY3RvcnkoKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgY29uc3Qge1xuICAgIGVudHJpZXMsXG4gICAgc2V0UHJvdG90eXBlT2YsXG4gICAgaXNGcm96ZW4sXG4gICAgZ2V0UHJvdG90eXBlT2YsXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXG4gIH0gPSBPYmplY3Q7XG4gIGxldCB7XG4gICAgZnJlZXplLFxuICAgIHNlYWwsXG4gICAgY3JlYXRlXG4gIH0gPSBPYmplY3Q7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xuICBsZXQge1xuICAgIGFwcGx5LFxuICAgIGNvbnN0cnVjdFxuICB9ID0gdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3Q7XG4gIGlmICghZnJlZXplKSB7XG4gICAgZnJlZXplID0gZnVuY3Rpb24gZnJlZXplKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFzZWFsKSB7XG4gICAgc2VhbCA9IGZ1bmN0aW9uIHNlYWwoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICBpZiAoIWFwcGx5KSB7XG4gICAgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmdW4sIHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgcmV0dXJuIGZ1bi5hcHBseSh0aGlzVmFsdWUsIGFyZ3MpO1xuICAgIH07XG4gIH1cbiAgaWYgKCFjb25zdHJ1Y3QpIHtcbiAgICBjb25zdHJ1Y3QgPSBmdW5jdGlvbiBjb25zdHJ1Y3QoRnVuYywgYXJncykge1xuICAgICAgcmV0dXJuIG5ldyBGdW5jKC4uLmFyZ3MpO1xuICAgIH07XG4gIH1cbiAgY29uc3QgYXJyYXlGb3JFYWNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUuZm9yRWFjaCk7XG4gIGNvbnN0IGFycmF5UG9wID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucG9wKTtcbiAgY29uc3QgYXJyYXlQdXNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gIGNvbnN0IHN0cmluZ1RvTG93ZXJDYXNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlKTtcbiAgY29uc3Qgc3RyaW5nVG9TdHJpbmcgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcpO1xuICBjb25zdCBzdHJpbmdNYXRjaCA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5tYXRjaCk7XG4gIGNvbnN0IHN0cmluZ1JlcGxhY2UgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG4gIGNvbnN0IHN0cmluZ0luZGV4T2YgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZik7XG4gIGNvbnN0IHN0cmluZ1RyaW0gPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG4gIGNvbnN0IG9iamVjdEhhc093blByb3BlcnR5ID0gdW5hcHBseShPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiAgY29uc3QgcmVnRXhwVGVzdCA9IHVuYXBwbHkoUmVnRXhwLnByb3RvdHlwZS50ZXN0KTtcbiAgY29uc3QgdHlwZUVycm9yQ3JlYXRlID0gdW5jb25zdHJ1Y3QoVHlwZUVycm9yKTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIHRoaXNBcmcgYW5kIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCBjYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCB0aGlzQXJnIGFuZCBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB1bmFwcGx5KGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXNBcmcpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgYW5kIGNhbGxlZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IGNvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHVuY29uc3RydWN0KGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb25zdHJ1Y3QoZnVuYywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgcHJvcGVydGllcyB0byBhIGxvb2t1cCB0YWJsZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0IC0gVGhlIHNldCB0byB3aGljaCBlbGVtZW50cyB3aWxsIGJlIGFkZGVkLlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSBjb250YWluaW5nIGVsZW1lbnRzIHRvIGJlIGFkZGVkIHRvIHRoZSBzZXQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybUNhc2VGdW5jIC0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gdHJhbnNmb3JtIHRoZSBjYXNlIG9mIGVhY2ggZWxlbWVudCBiZWZvcmUgYWRkaW5nIHRvIHRoZSBzZXQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBtb2RpZmllZCBzZXQgd2l0aCBhZGRlZCBlbGVtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIGFkZFRvU2V0KHNldCwgYXJyYXkpIHtcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHN0cmluZ1RvTG93ZXJDYXNlO1xuICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgLy8gTWFrZSAnaW4nIGFuZCB0cnV0aHkgY2hlY2tzIGxpa2UgQm9vbGVhbihzZXQuY29uc3RydWN0b3IpXG4gICAgICAvLyBpbmRlcGVuZGVudCBvZiBhbnkgcHJvcGVydGllcyBkZWZpbmVkIG9uIE9iamVjdC5wcm90b3R5cGUuXG4gICAgICAvLyBQcmV2ZW50IHByb3RvdHlwZSBzZXR0ZXJzIGZyb20gaW50ZXJjZXB0aW5nIHNldCBhcyBhIHRoaXMgdmFsdWUuXG4gICAgICBzZXRQcm90b3R5cGVPZihzZXQsIG51bGwpO1xuICAgIH1cbiAgICBsZXQgbCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IGFycmF5W2xdO1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBsY0VsZW1lbnQgPSB0cmFuc2Zvcm1DYXNlRnVuYyhlbGVtZW50KTtcbiAgICAgICAgaWYgKGxjRWxlbWVudCAhPT0gZWxlbWVudCkge1xuICAgICAgICAgIC8vIENvbmZpZyBwcmVzZXRzIChlLmcuIHRhZ3MuanMsIGF0dHJzLmpzKSBhcmUgaW1tdXRhYmxlLlxuICAgICAgICAgIGlmICghaXNGcm96ZW4oYXJyYXkpKSB7XG4gICAgICAgICAgICBhcnJheVtsXSA9IGxjRWxlbWVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0W2VsZW1lbnRdID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiB1cCBhbiBhcnJheSB0byBoYXJkZW4gYWdhaW5zdCBDU1BQXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IHRvIGJlIGNsZWFuZWQuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGNsZWFuZWQgdmVyc2lvbiBvZiB0aGUgYXJyYXlcbiAgICovXG4gIGZ1bmN0aW9uIGNsZWFuQXJyYXkoYXJyYXkpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBpc1Byb3BlcnR5RXhpc3QgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShhcnJheSwgaW5kZXgpO1xuICAgICAgaWYgKCFpc1Byb3BlcnR5RXhpc3QpIHtcbiAgICAgICAgYXJyYXlbaW5kZXhdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIFNoYWxsb3cgY2xvbmUgYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGJlIGNsb25lZC5cbiAgICogQHJldHVybnMge09iamVjdH0gQSBuZXcgb2JqZWN0IHRoYXQgY29waWVzIHRoZSBvcmlnaW5hbC5cbiAgICovXG4gIGZ1bmN0aW9uIGNsb25lKG9iamVjdCkge1xuICAgIGNvbnN0IG5ld09iamVjdCA9IGNyZWF0ZShudWxsKTtcbiAgICBmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgdmFsdWVdIG9mIGVudHJpZXMob2JqZWN0KSkge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSBjbGVhbkFycmF5KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xvbmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGF1dG9tYXRpY2FsbHkgY2hlY2tzIGlmIHRoZSBwcm9wIGlzIGZ1bmN0aW9uIG9yIGdldHRlciBhbmQgYmVoYXZlcyBhY2NvcmRpbmdseS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gbG9vayB1cCB0aGUgZ2V0dGVyIGZ1bmN0aW9uIGluIGl0cyBwcm90b3R5cGUgY2hhaW4uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIC0gVGhlIHByb3BlcnR5IG5hbWUgZm9yIHdoaWNoIHRvIGZpbmQgdGhlIGdldHRlciBmdW5jdGlvbi5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgZ2V0dGVyIGZ1bmN0aW9uIGZvdW5kIGluIHRoZSBwcm90b3R5cGUgY2hhaW4gb3IgYSBmYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGxvb2t1cEdldHRlcihvYmplY3QsIHByb3ApIHtcbiAgICB3aGlsZSAob2JqZWN0ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkZXNjID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcCk7XG4gICAgICBpZiAoZGVzYykge1xuICAgICAgICBpZiAoZGVzYy5nZXQpIHtcbiAgICAgICAgICByZXR1cm4gdW5hcHBseShkZXNjLmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkZXNjLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IGdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZhbGxiYWNrVmFsdWUoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbGxiYWNrVmFsdWU7XG4gIH1cblxuICBjb25zdCBodG1sJDEgPSBmcmVlemUoWydhJywgJ2FiYnInLCAnYWNyb255bScsICdhZGRyZXNzJywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsICdiJywgJ2JkaScsICdiZG8nLCAnYmlnJywgJ2JsaW5rJywgJ2Jsb2NrcXVvdGUnLCAnYm9keScsICdicicsICdidXR0b24nLCAnY2FudmFzJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnY29udGVudCcsICdkYXRhJywgJ2RhdGFsaXN0JywgJ2RkJywgJ2RlY29yYXRvcicsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlhbG9nJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZWxlbWVudCcsICdlbScsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJywgJ2knLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGVyJywgJ25hdicsICdub2JyJywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInXSk7XG5cbiAgLy8gU1ZHXG4gIGNvbnN0IHN2ZyQxID0gZnJlZXplKFsnc3ZnJywgJ2EnLCAnYWx0Z2x5cGgnLCAnYWx0Z2x5cGhkZWYnLCAnYWx0Z2x5cGhpdGVtJywgJ2FuaW1hdGVjb2xvcicsICdhbmltYXRlbW90aW9uJywgJ2FuaW1hdGV0cmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2NsaXBwYXRoJywgJ2RlZnMnLCAnZGVzYycsICdlbGxpcHNlJywgJ2ZpbHRlcicsICdmb250JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhyZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJncmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtcGF0aCcsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxncmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3R5bGUnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRwYXRoJywgJ3RpdGxlJywgJ3RyZWYnLCAndHNwYW4nLCAndmlldycsICd2a2VybiddKTtcbiAgY29uc3Qgc3ZnRmlsdGVycyA9IGZyZWV6ZShbJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVEcm9wU2hhZG93JywgJ2ZlRmxvb2QnLCAnZmVGdW5jQScsICdmZUZ1bmNCJywgJ2ZlRnVuY0cnLCAnZmVGdW5jUicsICdmZUdhdXNzaWFuQmx1cicsICdmZUltYWdlJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZSddKTtcblxuICAvLyBMaXN0IG9mIFNWRyBlbGVtZW50cyB0aGF0IGFyZSBkaXNhbGxvd2VkIGJ5IGRlZmF1bHQuXG4gIC8vIFdlIHN0aWxsIG5lZWQgdG8ga25vdyB0aGVtIHNvIHRoYXQgd2UgY2FuIGRvIG5hbWVzcGFjZVxuICAvLyBjaGVja3MgcHJvcGVybHkgaW4gY2FzZSBvbmUgd2FudHMgdG8gYWRkIHRoZW0gdG9cbiAgLy8gYWxsb3ctbGlzdC5cbiAgY29uc3Qgc3ZnRGlzYWxsb3dlZCA9IGZyZWV6ZShbJ2FuaW1hdGUnLCAnY29sb3ItcHJvZmlsZScsICdjdXJzb3InLCAnZGlzY2FyZCcsICdmb250LWZhY2UnLCAnZm9udC1mYWNlLWZvcm1hdCcsICdmb250LWZhY2UtbmFtZScsICdmb250LWZhY2Utc3JjJywgJ2ZvbnQtZmFjZS11cmknLCAnZm9yZWlnbm9iamVjdCcsICdoYXRjaCcsICdoYXRjaHBhdGgnLCAnbWVzaCcsICdtZXNoZ3JhZGllbnQnLCAnbWVzaHBhdGNoJywgJ21lc2hyb3cnLCAnbWlzc2luZy1nbHlwaCcsICdzY3JpcHQnLCAnc2V0JywgJ3NvbGlkY29sb3InLCAndW5rbm93bicsICd1c2UnXSk7XG4gIGNvbnN0IG1hdGhNbCQxID0gZnJlZXplKFsnbWF0aCcsICdtZW5jbG9zZScsICdtZXJyb3InLCAnbWZlbmNlZCcsICdtZnJhYycsICdtZ2x5cGgnLCAnbWknLCAnbWxhYmVsZWR0cicsICdtbXVsdGlzY3JpcHRzJywgJ21uJywgJ21vJywgJ21vdmVyJywgJ21wYWRkZWQnLCAnbXBoYW50b20nLCAnbXJvb3QnLCAnbXJvdycsICdtcycsICdtc3BhY2UnLCAnbXNxcnQnLCAnbXN0eWxlJywgJ21zdWInLCAnbXN1cCcsICdtc3Vic3VwJywgJ210YWJsZScsICdtdGQnLCAnbXRleHQnLCAnbXRyJywgJ211bmRlcicsICdtdW5kZXJvdmVyJywgJ21wcmVzY3JpcHRzJ10pO1xuXG4gIC8vIFNpbWlsYXJseSB0byBTVkcsIHdlIHdhbnQgdG8ga25vdyBhbGwgTWF0aE1MIGVsZW1lbnRzLFxuICAvLyBldmVuIHRob3NlIHRoYXQgd2UgZGlzYWxsb3cgYnkgZGVmYXVsdC5cbiAgY29uc3QgbWF0aE1sRGlzYWxsb3dlZCA9IGZyZWV6ZShbJ21hY3Rpb24nLCAnbWFsaWduZ3JvdXAnLCAnbWFsaWdubWFyaycsICdtbG9uZ2RpdicsICdtc2NhcnJpZXMnLCAnbXNjYXJyeScsICdtc2dyb3VwJywgJ21zdGFjaycsICdtc2xpbmUnLCAnbXNyb3cnLCAnc2VtYW50aWNzJywgJ2Fubm90YXRpb24nLCAnYW5ub3RhdGlvbi14bWwnLCAnbXByZXNjcmlwdHMnLCAnbm9uZSddKTtcbiAgY29uc3QgdGV4dCA9IGZyZWV6ZShbJyN0ZXh0J10pO1xuXG4gIGNvbnN0IGh0bWwgPSBmcmVlemUoWydhY2NlcHQnLCAnYWN0aW9uJywgJ2FsaWduJywgJ2FsdCcsICdhdXRvY2FwaXRhbGl6ZScsICdhdXRvY29tcGxldGUnLCAnYXV0b3BpY3R1cmVpbnBpY3R1cmUnLCAnYXV0b3BsYXknLCAnYmFja2dyb3VuZCcsICdiZ2NvbG9yJywgJ2JvcmRlcicsICdjYXB0dXJlJywgJ2NlbGxwYWRkaW5nJywgJ2NlbGxzcGFjaW5nJywgJ2NoZWNrZWQnLCAnY2l0ZScsICdjbGFzcycsICdjbGVhcicsICdjb2xvcicsICdjb2xzJywgJ2NvbHNwYW4nLCAnY29udHJvbHMnLCAnY29udHJvbHNsaXN0JywgJ2Nvb3JkcycsICdjcm9zc29yaWdpbicsICdkYXRldGltZScsICdkZWNvZGluZycsICdkZWZhdWx0JywgJ2RpcicsICdkaXNhYmxlZCcsICdkaXNhYmxlcGljdHVyZWlucGljdHVyZScsICdkaXNhYmxlcmVtb3RlcGxheWJhY2snLCAnZG93bmxvYWQnLCAnZHJhZ2dhYmxlJywgJ2VuY3R5cGUnLCAnZW50ZXJrZXloaW50JywgJ2ZhY2UnLCAnZm9yJywgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZmxhbmcnLCAnaWQnLCAnaW5wdXRtb2RlJywgJ2ludGVncml0eScsICdpc21hcCcsICdraW5kJywgJ2xhYmVsJywgJ2xhbmcnLCAnbGlzdCcsICdsb2FkaW5nJywgJ2xvb3AnLCAnbG93JywgJ21heCcsICdtYXhsZW5ndGgnLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21pbicsICdtaW5sZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLCAnbmFtZScsICdub25jZScsICdub3NoYWRlJywgJ25vdmFsaWRhdGUnLCAnbm93cmFwJywgJ29wZW4nLCAnb3B0aW11bScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3BsYXlzaW5saW5lJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3B1YmRhdGUnLCAncmFkaW9ncm91cCcsICdyZWFkb25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2JywgJ3JldmVyc2VkJywgJ3JvbGUnLCAncm93cycsICdyb3dzcGFuJywgJ3NwZWxsY2hlY2snLCAnc2NvcGUnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NyY2xhbmcnLCAnc3RhcnQnLCAnc3JjJywgJ3NyY3NldCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLCAndGFiaW5kZXgnLCAndGl0bGUnLCAndHJhbnNsYXRlJywgJ3R5cGUnLCAndXNlbWFwJywgJ3ZhbGlnbicsICd2YWx1ZScsICd3aWR0aCcsICd4bWxucycsICdzbG90J10pO1xuICBjb25zdCBzdmcgPSBmcmVlemUoWydhY2NlbnQtaGVpZ2h0JywgJ2FjY3VtdWxhdGUnLCAnYWRkaXRpdmUnLCAnYWxpZ25tZW50LWJhc2VsaW5lJywgJ2FzY2VudCcsICdhdHRyaWJ1dGVuYW1lJywgJ2F0dHJpYnV0ZXR5cGUnLCAnYXppbXV0aCcsICdiYXNlZnJlcXVlbmN5JywgJ2Jhc2VsaW5lLXNoaWZ0JywgJ2JlZ2luJywgJ2JpYXMnLCAnYnknLCAnY2xhc3MnLCAnY2xpcCcsICdjbGlwcGF0aHVuaXRzJywgJ2NsaXAtcGF0aCcsICdjbGlwLXJ1bGUnLCAnY29sb3InLCAnY29sb3ItaW50ZXJwb2xhdGlvbicsICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnLCAnY29sb3ItcHJvZmlsZScsICdjb2xvci1yZW5kZXJpbmcnLCAnY3gnLCAnY3knLCAnZCcsICdkeCcsICdkeScsICdkaWZmdXNlY29uc3RhbnQnLCAnZGlyZWN0aW9uJywgJ2Rpc3BsYXknLCAnZGl2aXNvcicsICdkdXInLCAnZWRnZW1vZGUnLCAnZWxldmF0aW9uJywgJ2VuZCcsICdmaWxsJywgJ2ZpbGwtb3BhY2l0eScsICdmaWxsLXJ1bGUnLCAnZmlsdGVyJywgJ2ZpbHRlcnVuaXRzJywgJ2Zsb29kLWNvbG9yJywgJ2Zsb29kLW9wYWNpdHknLCAnZm9udC1mYW1pbHknLCAnZm9udC1zaXplJywgJ2ZvbnQtc2l6ZS1hZGp1c3QnLCAnZm9udC1zdHJldGNoJywgJ2ZvbnQtc3R5bGUnLCAnZm9udC12YXJpYW50JywgJ2ZvbnQtd2VpZ2h0JywgJ2Z4JywgJ2Z5JywgJ2cxJywgJ2cyJywgJ2dseXBoLW5hbWUnLCAnZ2x5cGhyZWYnLCAnZ3JhZGllbnR1bml0cycsICdncmFkaWVudHRyYW5zZm9ybScsICdoZWlnaHQnLCAnaHJlZicsICdpZCcsICdpbWFnZS1yZW5kZXJpbmcnLCAnaW4nLCAnaW4yJywgJ2snLCAnazEnLCAnazInLCAnazMnLCAnazQnLCAna2VybmluZycsICdrZXlwb2ludHMnLCAna2V5c3BsaW5lcycsICdrZXl0aW1lcycsICdsYW5nJywgJ2xlbmd0aGFkanVzdCcsICdsZXR0ZXItc3BhY2luZycsICdrZXJuZWxtYXRyaXgnLCAna2VybmVsdW5pdGxlbmd0aCcsICdsaWdodGluZy1jb2xvcicsICdsb2NhbCcsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0JywgJ21hcmtlcmhlaWdodCcsICdtYXJrZXJ1bml0cycsICdtYXJrZXJ3aWR0aCcsICdtYXNrY29udGVudHVuaXRzJywgJ21hc2t1bml0cycsICdtYXgnLCAnbWFzaycsICdtZWRpYScsICdtZXRob2QnLCAnbW9kZScsICdtaW4nLCAnbmFtZScsICdudW1vY3RhdmVzJywgJ29mZnNldCcsICdvcGVyYXRvcicsICdvcGFjaXR5JywgJ29yZGVyJywgJ29yaWVudCcsICdvcmllbnRhdGlvbicsICdvcmlnaW4nLCAnb3ZlcmZsb3cnLCAncGFpbnQtb3JkZXInLCAncGF0aCcsICdwYXRobGVuZ3RoJywgJ3BhdHRlcm5jb250ZW50dW5pdHMnLCAncGF0dGVybnRyYW5zZm9ybScsICdwYXR0ZXJudW5pdHMnLCAncG9pbnRzJywgJ3ByZXNlcnZlYWxwaGEnLCAncHJlc2VydmVhc3BlY3RyYXRpbycsICdwcmltaXRpdmV1bml0cycsICdyJywgJ3J4JywgJ3J5JywgJ3JhZGl1cycsICdyZWZ4JywgJ3JlZnknLCAncmVwZWF0Y291bnQnLCAncmVwZWF0ZHVyJywgJ3Jlc3RhcnQnLCAncmVzdWx0JywgJ3JvdGF0ZScsICdzY2FsZScsICdzZWVkJywgJ3NoYXBlLXJlbmRlcmluZycsICdzcGVjdWxhcmNvbnN0YW50JywgJ3NwZWN1bGFyZXhwb25lbnQnLCAnc3ByZWFkbWV0aG9kJywgJ3N0YXJ0b2Zmc2V0JywgJ3N0ZGRldmlhdGlvbicsICdzdGl0Y2h0aWxlcycsICdzdG9wLWNvbG9yJywgJ3N0b3Atb3BhY2l0eScsICdzdHJva2UtZGFzaGFycmF5JywgJ3N0cm9rZS1kYXNob2Zmc2V0JywgJ3N0cm9rZS1saW5lY2FwJywgJ3N0cm9rZS1saW5lam9pbicsICdzdHJva2UtbWl0ZXJsaW1pdCcsICdzdHJva2Utb3BhY2l0eScsICdzdHJva2UnLCAnc3Ryb2tlLXdpZHRoJywgJ3N0eWxlJywgJ3N1cmZhY2VzY2FsZScsICdzeXN0ZW1sYW5ndWFnZScsICd0YWJpbmRleCcsICd0YXJnZXR4JywgJ3RhcmdldHknLCAndHJhbnNmb3JtJywgJ3RyYW5zZm9ybS1vcmlnaW4nLCAndGV4dC1hbmNob3InLCAndGV4dC1kZWNvcmF0aW9uJywgJ3RleHQtcmVuZGVyaW5nJywgJ3RleHRsZW5ndGgnLCAndHlwZScsICd1MScsICd1MicsICd1bmljb2RlJywgJ3ZhbHVlcycsICd2aWV3Ym94JywgJ3Zpc2liaWxpdHknLCAndmVyc2lvbicsICd2ZXJ0LWFkdi15JywgJ3ZlcnQtb3JpZ2luLXgnLCAndmVydC1vcmlnaW4teScsICd3aWR0aCcsICd3b3JkLXNwYWNpbmcnLCAnd3JhcCcsICd3cml0aW5nLW1vZGUnLCAneGNoYW5uZWxzZWxlY3RvcicsICd5Y2hhbm5lbHNlbGVjdG9yJywgJ3gnLCAneDEnLCAneDInLCAneG1sbnMnLCAneScsICd5MScsICd5MicsICd6JywgJ3pvb21hbmRwYW4nXSk7XG4gIGNvbnN0IG1hdGhNbCA9IGZyZWV6ZShbJ2FjY2VudCcsICdhY2NlbnR1bmRlcicsICdhbGlnbicsICdiZXZlbGxlZCcsICdjbG9zZScsICdjb2x1bW5zYWxpZ24nLCAnY29sdW1ubGluZXMnLCAnY29sdW1uc3BhbicsICdkZW5vbWFsaWduJywgJ2RlcHRoJywgJ2RpcicsICdkaXNwbGF5JywgJ2Rpc3BsYXlzdHlsZScsICdlbmNvZGluZycsICdmZW5jZScsICdmcmFtZScsICdoZWlnaHQnLCAnaHJlZicsICdpZCcsICdsYXJnZW9wJywgJ2xlbmd0aCcsICdsaW5ldGhpY2tuZXNzJywgJ2xzcGFjZScsICdscXVvdGUnLCAnbWF0aGJhY2tncm91bmQnLCAnbWF0aGNvbG9yJywgJ21hdGhzaXplJywgJ21hdGh2YXJpYW50JywgJ21heHNpemUnLCAnbWluc2l6ZScsICdtb3ZhYmxlbGltaXRzJywgJ25vdGF0aW9uJywgJ251bWFsaWduJywgJ29wZW4nLCAncm93YWxpZ24nLCAncm93bGluZXMnLCAncm93c3BhY2luZycsICdyb3dzcGFuJywgJ3JzcGFjZScsICdycXVvdGUnLCAnc2NyaXB0bGV2ZWwnLCAnc2NyaXB0bWluc2l6ZScsICdzY3JpcHRzaXplbXVsdGlwbGllcicsICdzZWxlY3Rpb24nLCAnc2VwYXJhdG9yJywgJ3NlcGFyYXRvcnMnLCAnc3RyZXRjaHknLCAnc3Vic2NyaXB0c2hpZnQnLCAnc3Vwc2NyaXB0c2hpZnQnLCAnc3ltbWV0cmljJywgJ3ZvZmZzZXQnLCAnd2lkdGgnLCAneG1sbnMnXSk7XG4gIGNvbnN0IHhtbCA9IGZyZWV6ZShbJ3hsaW5rOmhyZWYnLCAneG1sOmlkJywgJ3hsaW5rOnRpdGxlJywgJ3htbDpzcGFjZScsICd4bWxuczp4bGluayddKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9iZXR0ZXItcmVnZXhcbiAgY29uc3QgTVVTVEFDSEVfRVhQUiA9IHNlYWwoL1xce1xce1tcXHdcXFddKnxbXFx3XFxXXSpcXH1cXH0vZ20pOyAvLyBTcGVjaWZ5IHRlbXBsYXRlIGRldGVjdGlvbiByZWdleCBmb3IgU0FGRV9GT1JfVEVNUExBVEVTIG1vZGVcbiAgY29uc3QgRVJCX0VYUFIgPSBzZWFsKC88JVtcXHdcXFddKnxbXFx3XFxXXSolPi9nbSk7XG4gIGNvbnN0IFRNUExJVF9FWFBSID0gc2VhbCgvXFwke1tcXHdcXFddKn0vZ20pO1xuICBjb25zdCBEQVRBX0FUVFIgPSBzZWFsKC9eZGF0YS1bXFwtXFx3LlxcdTAwQjctXFx1RkZGRl0vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICBjb25zdCBBUklBX0FUVFIgPSBzZWFsKC9eYXJpYS1bXFwtXFx3XSskLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgSVNfQUxMT1dFRF9VUkkgPSBzZWFsKC9eKD86KD86KD86ZnxodCl0cHM/fG1haWx0b3x0ZWx8Y2FsbHRvfHNtc3xjaWR8eG1wcCk6fFteYS16XXxbYS16Ky5cXC1dKyg/OlteYS16Ky5cXC06XXwkKSkvaSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICk7XG5cbiAgY29uc3QgSVNfU0NSSVBUX09SX0RBVEEgPSBzZWFsKC9eKD86XFx3K3NjcmlwdHxkYXRhKTovaSk7XG4gIGNvbnN0IEFUVFJfV0hJVEVTUEFDRSA9IHNlYWwoL1tcXHUwMDAwLVxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwLVxcdTIwMjlcXHUyMDVGXFx1MzAwMF0vZyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbiAgKTtcblxuICBjb25zdCBET0NUWVBFX05BTUUgPSBzZWFsKC9eaHRtbCQvaSk7XG5cbiAgdmFyIEVYUFJFU1NJT05TID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBNVVNUQUNIRV9FWFBSOiBNVVNUQUNIRV9FWFBSLFxuICAgIEVSQl9FWFBSOiBFUkJfRVhQUixcbiAgICBUTVBMSVRfRVhQUjogVE1QTElUX0VYUFIsXG4gICAgREFUQV9BVFRSOiBEQVRBX0FUVFIsXG4gICAgQVJJQV9BVFRSOiBBUklBX0FUVFIsXG4gICAgSVNfQUxMT1dFRF9VUkk6IElTX0FMTE9XRURfVVJJLFxuICAgIElTX1NDUklQVF9PUl9EQVRBOiBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICBBVFRSX1dISVRFU1BBQ0U6IEFUVFJfV0hJVEVTUEFDRSxcbiAgICBET0NUWVBFX05BTUU6IERPQ1RZUEVfTkFNRVxuICB9KTtcblxuICBjb25zdCBnZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdztcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5vLW9wIHBvbGljeSBmb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqIERvbid0IGV4cG9ydCB0aGlzIGZ1bmN0aW9uIG91dHNpZGUgdGhpcyBtb2R1bGUhXG4gICAqIEBwYXJhbSB7VHJ1c3RlZFR5cGVQb2xpY3lGYWN0b3J5fSB0cnVzdGVkVHlwZXMgVGhlIHBvbGljeSBmYWN0b3J5LlxuICAgKiBAcGFyYW0ge0hUTUxTY3JpcHRFbGVtZW50fSBwdXJpZnlIb3N0RWxlbWVudCBUaGUgU2NyaXB0IGVsZW1lbnQgdXNlZCB0byBsb2FkIERPTVB1cmlmeSAodG8gZGV0ZXJtaW5lIHBvbGljeSBuYW1lIHN1ZmZpeCkuXG4gICAqIEByZXR1cm4ge1RydXN0ZWRUeXBlUG9saWN5fSBUaGUgcG9saWN5IGNyZWF0ZWQgKG9yIG51bGwsIGlmIFRydXN0ZWQgVHlwZXNcbiAgICogYXJlIG5vdCBzdXBwb3J0ZWQgb3IgY3JlYXRpbmcgdGhlIHBvbGljeSBmYWlsZWQpLlxuICAgKi9cbiAgY29uc3QgX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSA9IGZ1bmN0aW9uIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBwdXJpZnlIb3N0RWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgdHJ1c3RlZFR5cGVzICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgdGhlIGNhbGxlcnMgdG8gY29udHJvbCB0aGUgdW5pcXVlIHBvbGljeSBuYW1lXG4gICAgLy8gYnkgYWRkaW5nIGEgZGF0YS10dC1wb2xpY3ktc3VmZml4IHRvIHRoZSBzY3JpcHQgZWxlbWVudCB3aXRoIHRoZSBET01QdXJpZnkuXG4gICAgLy8gUG9saWN5IGNyZWF0aW9uIHdpdGggZHVwbGljYXRlIG5hbWVzIHRocm93cyBpbiBUcnVzdGVkIFR5cGVzLlxuICAgIGxldCBzdWZmaXggPSBudWxsO1xuICAgIGNvbnN0IEFUVFJfTkFNRSA9ICdkYXRhLXR0LXBvbGljeS1zdWZmaXgnO1xuICAgIGlmIChwdXJpZnlIb3N0RWxlbWVudCAmJiBwdXJpZnlIb3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoQVRUUl9OQU1FKSkge1xuICAgICAgc3VmZml4ID0gcHVyaWZ5SG9zdEVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJfTkFNRSk7XG4gICAgfVxuICAgIGNvbnN0IHBvbGljeU5hbWUgPSAnZG9tcHVyaWZ5JyArIChzdWZmaXggPyAnIycgKyBzdWZmaXggOiAnJyk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KHBvbGljeU5hbWUsIHtcbiAgICAgICAgY3JlYXRlSFRNTChodG1sKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVNjcmlwdFVSTChzY3JpcHRVcmwpIHtcbiAgICAgICAgICByZXR1cm4gc2NyaXB0VXJsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAvLyBQb2xpY3kgY3JlYXRpb24gZmFpbGVkIChtb3N0IGxpa2VseSBhbm90aGVyIERPTVB1cmlmeSBzY3JpcHQgaGFzXG4gICAgICAvLyBhbHJlYWR5IHJ1bikuIFNraXAgY3JlYXRpbmcgdGhlIHBvbGljeSwgYXMgdGhpcyB3aWxsIG9ubHkgY2F1c2UgZXJyb3JzXG4gICAgICAvLyBpZiBUVCBhcmUgZW5mb3JjZWQuXG4gICAgICBjb25zb2xlLndhcm4oJ1RydXN0ZWRUeXBlcyBwb2xpY3kgJyArIHBvbGljeU5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjcmVhdGVkLicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBjcmVhdGVET01QdXJpZnkoKSB7XG4gICAgbGV0IHdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZ2V0R2xvYmFsKCk7XG4gICAgY29uc3QgRE9NUHVyaWZ5ID0gcm9vdCA9PiBjcmVhdGVET01QdXJpZnkocm9vdCk7XG5cbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIGxhYmVsLCBleHBvc2VkIGZvciBlYXNpZXIgY2hlY2tzXG4gICAgICogaWYgRE9NUHVyaWZ5IGlzIHVwIHRvIGRhdGUgb3Igbm90XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnZlcnNpb24gPSAnMy4wLjknO1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgZWxlbWVudHMgdGhhdCBET01QdXJpZnkgcmVtb3ZlZCBkdXJpbmcgc2FuaXRhdGlvbi5cbiAgICAgKiBFbXB0eSBpZiBub3RoaW5nIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG4gICAgaWYgKCF3aW5kb3cgfHwgIXdpbmRvdy5kb2N1bWVudCB8fCB3aW5kb3cuZG9jdW1lbnQubm9kZVR5cGUgIT09IDkpIHtcbiAgICAgIC8vIE5vdCBydW5uaW5nIGluIGEgYnJvd3NlciwgcHJvdmlkZSBhIGZhY3RvcnkgZnVuY3Rpb25cbiAgICAgIC8vIHNvIHRoYXQgeW91IGNhbiBwYXNzIHlvdXIgb3duIFdpbmRvd1xuICAgICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gRE9NUHVyaWZ5O1xuICAgIH1cbiAgICBsZXQge1xuICAgICAgZG9jdW1lbnRcbiAgICB9ID0gd2luZG93O1xuICAgIGNvbnN0IG9yaWdpbmFsRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICBjb25zdCBjdXJyZW50U2NyaXB0ID0gb3JpZ2luYWxEb2N1bWVudC5jdXJyZW50U2NyaXB0O1xuICAgIGNvbnN0IHtcbiAgICAgIERvY3VtZW50RnJhZ21lbnQsXG4gICAgICBIVE1MVGVtcGxhdGVFbGVtZW50LFxuICAgICAgTm9kZSxcbiAgICAgIEVsZW1lbnQsXG4gICAgICBOb2RlRmlsdGVyLFxuICAgICAgTmFtZWROb2RlTWFwID0gd2luZG93Lk5hbWVkTm9kZU1hcCB8fCB3aW5kb3cuTW96TmFtZWRBdHRyTWFwLFxuICAgICAgSFRNTEZvcm1FbGVtZW50LFxuICAgICAgRE9NUGFyc2VyLFxuICAgICAgdHJ1c3RlZFR5cGVzXG4gICAgfSA9IHdpbmRvdztcbiAgICBjb25zdCBFbGVtZW50UHJvdG90eXBlID0gRWxlbWVudC5wcm90b3R5cGU7XG4gICAgY29uc3QgY2xvbmVOb2RlID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdjbG9uZU5vZGUnKTtcbiAgICBjb25zdCBnZXROZXh0U2libGluZyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnbmV4dFNpYmxpbmcnKTtcbiAgICBjb25zdCBnZXRDaGlsZE5vZGVzID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdjaGlsZE5vZGVzJyk7XG4gICAgY29uc3QgZ2V0UGFyZW50Tm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAncGFyZW50Tm9kZScpO1xuXG4gICAgLy8gQXMgcGVyIGlzc3VlICM0NywgdGhlIHdlYi1jb21wb25lbnRzIHJlZ2lzdHJ5IGlzIGluaGVyaXRlZCBieSBhXG4gICAgLy8gbmV3IGRvY3VtZW50IGNyZWF0ZWQgdmlhIGNyZWF0ZUhUTUxEb2N1bWVudC4gQXMgcGVyIHRoZSBzcGVjXG4gICAgLy8gKGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYmNvbXBvbmVudHMvc3BlYy9jdXN0b20vI2NyZWF0aW5nLWFuZC1wYXNzaW5nLXJlZ2lzdHJpZXMpXG4gICAgLy8gYSBuZXcgZW1wdHkgcmVnaXN0cnkgaXMgdXNlZCB3aGVuIGNyZWF0aW5nIGEgdGVtcGxhdGUgY29udGVudHMgb3duZXJcbiAgICAvLyBkb2N1bWVudCwgc28gd2UgdXNlIHRoYXQgYXMgb3VyIHBhcmVudCBkb2N1bWVudCB0byBlbnN1cmUgbm90aGluZ1xuICAgIC8vIGlzIGluaGVyaXRlZC5cbiAgICBpZiAodHlwZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgIGlmICh0ZW1wbGF0ZS5jb250ZW50ICYmIHRlbXBsYXRlLmNvbnRlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICBkb2N1bWVudCA9IHRlbXBsYXRlLmNvbnRlbnQub3duZXJEb2N1bWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHRydXN0ZWRUeXBlc1BvbGljeTtcbiAgICBsZXQgZW1wdHlIVE1MID0gJyc7XG4gICAgY29uc3Qge1xuICAgICAgaW1wbGVtZW50YXRpb24sXG4gICAgICBjcmVhdGVOb2RlSXRlcmF0b3IsXG4gICAgICBjcmVhdGVEb2N1bWVudEZyYWdtZW50LFxuICAgICAgZ2V0RWxlbWVudHNCeVRhZ05hbWVcbiAgICB9ID0gZG9jdW1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgaW1wb3J0Tm9kZVxuICAgIH0gPSBvcmlnaW5hbERvY3VtZW50O1xuICAgIGxldCBob29rcyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogRXhwb3NlIHdoZXRoZXIgdGhpcyBicm93c2VyIHN1cHBvcnRzIHJ1bm5pbmcgdGhlIGZ1bGwgRE9NUHVyaWZ5LlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IHR5cGVvZiBlbnRyaWVzID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBnZXRQYXJlbnROb2RlID09PSAnZnVuY3Rpb24nICYmIGltcGxlbWVudGF0aW9uICYmIGltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtcbiAgICAgIE1VU1RBQ0hFX0VYUFIsXG4gICAgICBFUkJfRVhQUixcbiAgICAgIFRNUExJVF9FWFBSLFxuICAgICAgREFUQV9BVFRSLFxuICAgICAgQVJJQV9BVFRSLFxuICAgICAgSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgICBBVFRSX1dISVRFU1BBQ0VcbiAgICB9ID0gRVhQUkVTU0lPTlM7XG4gICAgbGV0IHtcbiAgICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSQxXG4gICAgfSA9IEVYUFJFU1NJT05TO1xuXG4gICAgLyoqXG4gICAgICogV2UgY29uc2lkZXIgdGhlIGVsZW1lbnRzIGFuZCBhdHRyaWJ1dGVzIGJlbG93IHRvIGJlIHNhZmUuIElkZWFsbHlcbiAgICAgKiBkb24ndCBhZGQgYW55IG5ldyBvbmVzIGJ1dCBmZWVsIGZyZWUgdG8gcmVtb3ZlIHVud2FudGVkIG9uZXMuXG4gICAgICovXG5cbiAgICAvKiBhbGxvd2VkIGVsZW1lbnQgbmFtZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCQxLCAuLi5zdmckMSwgLi4uc3ZnRmlsdGVycywgLi4ubWF0aE1sJDEsIC4uLnRleHRdKTtcblxuICAgIC8qIEFsbG93ZWQgYXR0cmlidXRlIG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfQVRUUiA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX0FUVFIgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwsIC4uLnN2ZywgLi4ubWF0aE1sLCAuLi54bWxdKTtcblxuICAgIC8qXG4gICAgICogQ29uZmlndXJlIGhvdyBET01QVXJpZnkgc2hvdWxkIGhhbmRsZSBjdXN0b20gZWxlbWVudHMgYW5kIHRoZWlyIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyBjdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzLlxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IHRhZ05hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgY3VzdG9tIGVsZW1lbnRzKVxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IGF0dHJpYnV0ZU5hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgYXR0cmlidXRlcyBub3Qgb24gdGhlIGFsbG93IGxpc3QpXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgYWxsb3cgY3VzdG9tIGVsZW1lbnRzIGRlcml2ZWQgZnJvbSBidWlsdC1pbnMgaWYgdGhleSBwYXNzIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjay4gRGVmYXVsdDogYGZhbHNlYC5cbiAgICAgKi9cbiAgICBsZXQgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgPSBPYmplY3Quc2VhbChjcmVhdGUobnVsbCwge1xuICAgICAgdGFnTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGF0dHJpYnV0ZU5hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfVxuICAgIH0pKTtcblxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIHRhZ3MgKG92ZXJyaWRlcyBBTExPV0VEX1RBR1MvQUREX1RBR1MpICovXG4gICAgbGV0IEZPUkJJRF9UQUdTID0gbnVsbDtcblxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIGF0dHJpYnV0ZXMgKG92ZXJyaWRlcyBBTExPV0VEX0FUVFIvQUREX0FUVFIpICovXG4gICAgbGV0IEZPUkJJRF9BVFRSID0gbnVsbDtcblxuICAgIC8qIERlY2lkZSBpZiBBUklBIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfQVJJQV9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIERlY2lkZSBpZiBjdXN0b20gZGF0YSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX0RBVEFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgdW5rbm93biBwcm90b2NvbHMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBzZWxmLWNsb3NpbmcgdGFncyBpbiBhdHRyaWJ1dGVzIGFyZSBhbGxvd2VkLlxuICAgICAqIFVzdWFsbHkgcmVtb3ZlZCBkdWUgdG8gYSBtWFNTIGlzc3VlIGluIGpRdWVyeSAzLjAgKi9cbiAgICBsZXQgQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIE91dHB1dCBzaG91bGQgYmUgc2FmZSBmb3IgY29tbW9uIHRlbXBsYXRlIGVuZ2luZXMuXG4gICAgICogVGhpcyBtZWFucywgRE9NUHVyaWZ5IHJlbW92ZXMgZGF0YSBhdHRyaWJ1dGVzLCBtdXN0YWNoZXMgYW5kIEVSQlxuICAgICAqL1xuICAgIGxldCBTQUZFX0ZPUl9URU1QTEFURVMgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBkb2N1bWVudCB3aXRoIDxodG1sPi4uLiBzaG91bGQgYmUgcmV0dXJuZWQgKi9cbiAgICBsZXQgV0hPTEVfRE9DVU1FTlQgPSBmYWxzZTtcblxuICAgIC8qIFRyYWNrIHdoZXRoZXIgY29uZmlnIGlzIGFscmVhZHkgc2V0IG9uIHRoaXMgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5LiAqL1xuICAgIGxldCBTRVRfQ09ORklHID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYWxsIGVsZW1lbnRzIChlLmcuIHN0eWxlLCBzY3JpcHQpIG11c3QgYmUgY2hpbGRyZW4gb2ZcbiAgICAgKiBkb2N1bWVudC5ib2R5LiBCeSBkZWZhdWx0LCBicm93c2VycyBtaWdodCBtb3ZlIHRoZW0gdG8gZG9jdW1lbnQuaGVhZCAqL1xuICAgIGxldCBGT1JDRV9CT0RZID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYEhUTUxCb2R5RWxlbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAob3IgYSBUcnVzdGVkSFRNTCBvYmplY3QgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgc3VwcG9ydGVkKS5cbiAgICAgKiBJZiBgV0hPTEVfRE9DVU1FTlRgIGlzIGVuYWJsZWQgYSBgSFRNTEh0bWxFbGVtZW50YCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWRcbiAgICAgKi9cbiAgICBsZXQgUkVUVVJOX0RPTSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBEb2N1bWVudEZyYWdtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXG4gICAgICogc3RyaW5nICAob3IgYSBUcnVzdGVkSFRNTCBvYmplY3QgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgc3VwcG9ydGVkKSAqL1xuICAgIGxldCBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcnkgdG8gcmV0dXJuIGEgVHJ1c3RlZCBUeXBlIG9iamVjdCBpbnN0ZWFkIG9mIGEgc3RyaW5nLCByZXR1cm4gYSBzdHJpbmcgaW5cbiAgICAgKiBjYXNlIFRydXN0ZWQgVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgICovXG4gICAgbGV0IFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBmYWxzZTtcblxuICAgIC8qIE91dHB1dCBzaG91bGQgYmUgZnJlZSBmcm9tIERPTSBjbG9iYmVyaW5nIGF0dGFja3M/XG4gICAgICogVGhpcyBzYW5pdGl6ZXMgbWFya3VwcyBuYW1lZCB3aXRoIGNvbGxpZGluZywgY2xvYmJlcmFibGUgYnVpbHQtaW4gRE9NIEFQSXMuXG4gICAgICovXG4gICAgbGV0IFNBTklUSVpFX0RPTSA9IHRydWU7XG5cbiAgICAvKiBBY2hpZXZlIGZ1bGwgRE9NIENsb2JiZXJpbmcgcHJvdGVjdGlvbiBieSBpc29sYXRpbmcgdGhlIG5hbWVzcGFjZSBvZiBuYW1lZFxuICAgICAqIHByb3BlcnRpZXMgYW5kIEpTIHZhcmlhYmxlcywgbWl0aWdhdGluZyBhdHRhY2tzIHRoYXQgYWJ1c2UgdGhlIEhUTUwvRE9NIHNwZWMgcnVsZXMuXG4gICAgICpcbiAgICAgKiBIVE1ML0RPTSBzcGVjIHJ1bGVzIHRoYXQgZW5hYmxlIERPTSBDbG9iYmVyaW5nOlxuICAgICAqICAgLSBOYW1lZCBBY2Nlc3Mgb24gV2luZG93ICjCpzcuMy4zKVxuICAgICAqICAgLSBET00gVHJlZSBBY2Nlc3NvcnMgKMKnMy4xLjUpXG4gICAgICogICAtIEZvcm0gRWxlbWVudCBQYXJlbnQtQ2hpbGQgUmVsYXRpb25zICjCpzQuMTAuMylcbiAgICAgKiAgIC0gSWZyYW1lIHNyY2RvYyAvIE5lc3RlZCBXaW5kb3dQcm94aWVzICjCpzQuOC41KVxuICAgICAqICAgLSBIVE1MQ29sbGVjdGlvbiAowqc0LjIuMTAuMilcbiAgICAgKlxuICAgICAqIE5hbWVzcGFjZSBpc29sYXRpb24gaXMgaW1wbGVtZW50ZWQgYnkgcHJlZml4aW5nIGBpZGAgYW5kIGBuYW1lYCBhdHRyaWJ1dGVzXG4gICAgICogd2l0aCBhIGNvbnN0YW50IHN0cmluZywgaS5lLiwgYHVzZXItY29udGVudC1gXG4gICAgICovXG4gICAgbGV0IFNBTklUSVpFX05BTUVEX1BST1BTID0gZmFsc2U7XG4gICAgY29uc3QgU0FOSVRJWkVfTkFNRURfUFJPUFNfUFJFRklYID0gJ3VzZXItY29udGVudC0nO1xuXG4gICAgLyogS2VlcCBlbGVtZW50IGNvbnRlbnQgd2hlbiByZW1vdmluZyBlbGVtZW50PyAqL1xuICAgIGxldCBLRUVQX0NPTlRFTlQgPSB0cnVlO1xuXG4gICAgLyogSWYgYSBgTm9kZWAgaXMgcGFzc2VkIHRvIHNhbml0aXplKCksIHRoZW4gcGVyZm9ybXMgc2FuaXRpemF0aW9uIGluLXBsYWNlIGluc3RlYWRcbiAgICAgKiBvZiBpbXBvcnRpbmcgaXQgaW50byBhIG5ldyBEb2N1bWVudCBhbmQgcmV0dXJuaW5nIGEgc2FuaXRpemVkIGNvcHkgKi9cbiAgICBsZXQgSU5fUExBQ0UgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93IHVzYWdlIG9mIHByb2ZpbGVzIGxpa2UgaHRtbCwgc3ZnIGFuZCBtYXRoTWwgKi9cbiAgICBsZXQgVVNFX1BST0ZJTEVTID0ge307XG5cbiAgICAvKiBUYWdzIHRvIGlnbm9yZSBjb250ZW50IG9mIHdoZW4gS0VFUF9DT05URU5UIGlzIHRydWUgKi9cbiAgICBsZXQgRk9SQklEX0NPTlRFTlRTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0ZPUkJJRF9DT05URU5UUyA9IGFkZFRvU2V0KHt9LCBbJ2Fubm90YXRpb24teG1sJywgJ2F1ZGlvJywgJ2NvbGdyb3VwJywgJ2Rlc2MnLCAnZm9yZWlnbm9iamVjdCcsICdoZWFkJywgJ2lmcmFtZScsICdtYXRoJywgJ21pJywgJ21uJywgJ21vJywgJ21zJywgJ210ZXh0JywgJ25vZW1iZWQnLCAnbm9mcmFtZXMnLCAnbm9zY3JpcHQnLCAncGxhaW50ZXh0JywgJ3NjcmlwdCcsICdzdHlsZScsICdzdmcnLCAndGVtcGxhdGUnLCAndGhlYWQnLCAndGl0bGUnLCAndmlkZW8nLCAneG1wJ10pO1xuXG4gICAgLyogVGFncyB0aGF0IGFyZSBzYWZlIGZvciBkYXRhOiBVUklzICovXG4gICAgbGV0IERBVEFfVVJJX1RBR1MgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbJ2F1ZGlvJywgJ3ZpZGVvJywgJ2ltZycsICdzb3VyY2UnLCAnaW1hZ2UnLCAndHJhY2snXSk7XG5cbiAgICAvKiBBdHRyaWJ1dGVzIHNhZmUgZm9yIHZhbHVlcyBsaWtlIFwiamF2YXNjcmlwdDpcIiAqL1xuICAgIGxldCBVUklfU0FGRV9BVFRSSUJVVEVTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMgPSBhZGRUb1NldCh7fSwgWydhbHQnLCAnY2xhc3MnLCAnZm9yJywgJ2lkJywgJ2xhYmVsJywgJ25hbWUnLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdyb2xlJywgJ3N1bW1hcnknLCAndGl0bGUnLCAndmFsdWUnLCAnc3R5bGUnLCAneG1sbnMnXSk7XG4gICAgY29uc3QgTUFUSE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJztcbiAgICBjb25zdCBTVkdfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBjb25zdCBIVE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcbiAgICAvKiBEb2N1bWVudCBuYW1lc3BhY2UgKi9cbiAgICBsZXQgTkFNRVNQQUNFID0gSFRNTF9OQU1FU1BBQ0U7XG4gICAgbGV0IElTX0VNUFRZX0lOUFVUID0gZmFsc2U7XG5cbiAgICAvKiBBbGxvd2VkIFhIVE1MK1hNTCBuYW1lc3BhY2VzICovXG4gICAgbGV0IEFMTE9XRURfTkFNRVNQQUNFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVMgPSBhZGRUb1NldCh7fSwgW01BVEhNTF9OQU1FU1BBQ0UsIFNWR19OQU1FU1BBQ0UsIEhUTUxfTkFNRVNQQUNFXSwgc3RyaW5nVG9TdHJpbmcpO1xuXG4gICAgLyogUGFyc2luZyBvZiBzdHJpY3QgWEhUTUwgZG9jdW1lbnRzICovXG4gICAgbGV0IFBBUlNFUl9NRURJQV9UWVBFID0gbnVsbDtcbiAgICBjb25zdCBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTID0gWydhcHBsaWNhdGlvbi94aHRtbCt4bWwnLCAndGV4dC9odG1sJ107XG4gICAgY29uc3QgREVGQVVMVF9QQVJTRVJfTUVESUFfVFlQRSA9ICd0ZXh0L2h0bWwnO1xuICAgIGxldCB0cmFuc2Zvcm1DYXNlRnVuYyA9IG51bGw7XG5cbiAgICAvKiBLZWVwIGEgcmVmZXJlbmNlIHRvIGNvbmZpZyB0byBwYXNzIHRvIGhvb2tzICovXG4gICAgbGV0IENPTkZJRyA9IG51bGw7XG5cbiAgICAvKiBJZGVhbGx5LCBkbyBub3QgdG91Y2ggYW55dGhpbmcgYmVsb3cgdGhpcyBsaW5lICovXG4gICAgLyogX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXyAqL1xuXG4gICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgY29uc3QgaXNSZWdleE9yRnVuY3Rpb24gPSBmdW5jdGlvbiBpc1JlZ2V4T3JGdW5jdGlvbih0ZXN0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgdGVzdFZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb247XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9wYXJzZUNvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjZmcgb3B0aW9uYWwgY29uZmlnIGxpdGVyYWxcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIGNvbnN0IF9wYXJzZUNvbmZpZyA9IGZ1bmN0aW9uIF9wYXJzZUNvbmZpZygpIHtcbiAgICAgIGxldCBjZmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgaWYgKENPTkZJRyAmJiBDT05GSUcgPT09IGNmZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHRhbXBlcmluZyAqL1xuICAgICAgaWYgKCFjZmcgfHwgdHlwZW9mIGNmZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgY2ZnID0ge307XG4gICAgICB9XG5cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHByb3RvdHlwZSBwb2xsdXRpb24gKi9cbiAgICAgIGNmZyA9IGNsb25lKGNmZyk7XG4gICAgICBQQVJTRVJfTUVESUFfVFlQRSA9XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgIFNVUFBPUlRFRF9QQVJTRVJfTUVESUFfVFlQRVMuaW5kZXhPZihjZmcuUEFSU0VSX01FRElBX1RZUEUpID09PSAtMSA/IERFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUgOiBjZmcuUEFSU0VSX01FRElBX1RZUEU7XG5cbiAgICAgIC8vIEhUTUwgdGFncyBhbmQgYXR0cmlidXRlcyBhcmUgbm90IGNhc2Utc2Vuc2l0aXZlLCBjb252ZXJ0aW5nIHRvIGxvd2VyY2FzZS4gS2VlcGluZyBYSFRNTCBhcyBpcy5cbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jID0gUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnID8gc3RyaW5nVG9TdHJpbmcgOiBzdHJpbmdUb0xvd2VyQ2FzZTtcblxuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgQUxMT1dFRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9UQUdTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX1RBR1M7XG4gICAgICBBTExPV0VEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX0FUVFInKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0FMTE9XRURfQVRUUjtcbiAgICAgIEFMTE9XRURfTkFNRVNQQUNFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfTkFNRVNQQUNFUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX05BTUVTUEFDRVMsIHN0cmluZ1RvU3RyaW5nKSA6IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTO1xuICAgICAgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9VUklfU0FGRV9BVFRSJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMpLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfVVJJX1NBRkVfQVRUUixcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgOiBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVM7XG4gICAgICBEQVRBX1VSSV9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUREX0RBVEFfVVJJX1RBR1MnKSA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfREFUQV9VUklfVEFHUyksXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgY2ZnLkFERF9EQVRBX1VSSV9UQUdTLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICA6IERFRkFVTFRfREFUQV9VUklfVEFHUztcbiAgICAgIEZPUkJJRF9DT05URU5UUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9DT05URU5UUycpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTO1xuICAgICAgRk9SQklEX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfVEFHUycpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XG4gICAgICBGT1JCSURfQVRUUiA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9BVFRSJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiB7fTtcbiAgICAgIFVTRV9QUk9GSUxFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ1VTRV9QUk9GSUxFUycpID8gY2ZnLlVTRV9QUk9GSUxFUyA6IGZhbHNlO1xuICAgICAgQUxMT1dfQVJJQV9BVFRSID0gY2ZnLkFMTE9XX0FSSUFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfREFUQV9BVFRSID0gY2ZnLkFMTE9XX0RBVEFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBjZmcuQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IGNmZy5BTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIFNBRkVfRk9SX1RFTVBMQVRFUyA9IGNmZy5TQUZFX0ZPUl9URU1QTEFURVMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFdIT0xFX0RPQ1VNRU5UID0gY2ZnLldIT0xFX0RPQ1VNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NID0gY2ZnLlJFVFVSTl9ET00gfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET01fRlJBR01FTlQgPSBjZmcuUkVUVVJOX0RPTV9GUkFHTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX1RSVVNURURfVFlQRSA9IGNmZy5SRVRVUk5fVFJVU1RFRF9UWVBFIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBGT1JDRV9CT0RZID0gY2ZnLkZPUkNFX0JPRFkgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFNBTklUSVpFX0RPTSA9IGNmZy5TQU5JVElaRV9ET00gIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIFNBTklUSVpFX05BTUVEX1BST1BTID0gY2ZnLlNBTklUSVpFX05BTUVEX1BST1BTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBLRUVQX0NPTlRFTlQgPSBjZmcuS0VFUF9DT05URU5UICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBJTl9QTEFDRSA9IGNmZy5JTl9QTEFDRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgSVNfQUxMT1dFRF9VUkkkMSA9IGNmZy5BTExPV0VEX1VSSV9SRUdFWFAgfHwgSVNfQUxMT1dFRF9VUkk7XG4gICAgICBOQU1FU1BBQ0UgPSBjZmcuTkFNRVNQQUNFIHx8IEhUTUxfTkFNRVNQQUNFO1xuICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgfHwge307XG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIGlzUmVnZXhPckZ1bmN0aW9uKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2spKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2s7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIGlzUmVnZXhPckZ1bmN0aW9uKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2spKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2s7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIHR5cGVvZiBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cztcbiAgICAgIH1cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgQUxMT1dfREFUQV9BVFRSID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICBSRVRVUk5fRE9NID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogUGFyc2UgcHJvZmlsZSBpbmZvICovXG4gICAgICBpZiAoVVNFX1BST0ZJTEVTKSB7XG4gICAgICAgIEFMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCB0ZXh0KTtcbiAgICAgICAgQUxMT1dFRF9BVFRSID0gW107XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuaHRtbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgaHRtbCQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGh0bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmckMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBzdmcpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2Z0ZpbHRlcnMpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5tYXRoTWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIG1hdGhNbCQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIG1hdGhNbCk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIE1lcmdlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgaWYgKGNmZy5BRERfVEFHUykge1xuICAgICAgICBpZiAoQUxMT1dFRF9UQUdTID09PSBERUZBVUxUX0FMTE9XRURfVEFHUykge1xuICAgICAgICAgIEFMTE9XRURfVEFHUyA9IGNsb25lKEFMTE9XRURfVEFHUyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBjZmcuQUREX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQUREX0FUVFIpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfQVRUUiA9PT0gREVGQVVMVF9BTExPV0VEX0FUVFIpIHtcbiAgICAgICAgICBBTExPV0VEX0FUVFIgPSBjbG9uZShBTExPV0VEX0FUVFIpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgY2ZnLkFERF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9VUklfU0FGRV9BVFRSKSB7XG4gICAgICAgIGFkZFRvU2V0KFVSSV9TQUZFX0FUVFJJQlVURVMsIGNmZy5BRERfVVJJX1NBRkVfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5GT1JCSURfQ09OVEVOVFMpIHtcbiAgICAgICAgaWYgKEZPUkJJRF9DT05URU5UUyA9PT0gREVGQVVMVF9GT1JCSURfQ09OVEVOVFMpIHtcbiAgICAgICAgICBGT1JCSURfQ09OVEVOVFMgPSBjbG9uZShGT1JCSURfQ09OVEVOVFMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEZPUkJJRF9DT05URU5UUywgY2ZnLkZPUkJJRF9DT05URU5UUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgI3RleHQgaW4gY2FzZSBLRUVQX0NPTlRFTlQgaXMgc2V0IHRvIHRydWUgKi9cbiAgICAgIGlmIChLRUVQX0NPTlRFTlQpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTWycjdGV4dCddID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIGh0bWwsIGhlYWQgYW5kIGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgV0hPTEVfRE9DVU1FTlQgaXMgdHJ1ZSAqL1xuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWydodG1sJywgJ2hlYWQnLCAnYm9keSddKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xuICAgICAgaWYgKEFMTE9XRURfVEFHUy50YWJsZSkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsndGJvZHknXSk7XG4gICAgICAgIGRlbGV0ZSBGT1JCSURfVEFHUy50Ym9keTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlSFRNTCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnVFJVU1RFRF9UWVBFU19QT0xJQ1kgY29uZmlndXJhdGlvbiBvcHRpb24gbXVzdCBwcm92aWRlIGEgXCJjcmVhdGVIVE1MXCIgaG9vay4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWS5jcmVhdGVTY3JpcHRVUkwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlU2NyaXB0VVJMXCIgaG9vay4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE92ZXJ3cml0ZSBleGlzdGluZyBUcnVzdGVkVHlwZXMgcG9saWN5LlxuICAgICAgICB0cnVzdGVkVHlwZXNQb2xpY3kgPSBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1k7XG5cbiAgICAgICAgLy8gU2lnbiBsb2NhbCB2YXJpYWJsZXMgcmVxdWlyZWQgYnkgYHNhbml0aXplYC5cbiAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVW5pbml0aWFsaXplZCBwb2xpY3ksIGF0dGVtcHQgdG8gaW5pdGlhbGl6ZSB0aGUgaW50ZXJuYWwgZG9tcHVyaWZ5IHBvbGljeS5cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSh0cnVzdGVkVHlwZXMsIGN1cnJlbnRTY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgY3JlYXRpbmcgdGhlIGludGVybmFsIHBvbGljeSBzdWNjZWVkZWQgc2lnbiBpbnRlcm5hbCB2YXJpYWJsZXMuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgIT09IG51bGwgJiYgdHlwZW9mIGVtcHR5SFRNTCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBmdXJ0aGVyIG1hbmlwdWxhdGlvbiBvZiBjb25maWd1cmF0aW9uLlxuICAgICAgLy8gTm90IGF2YWlsYWJsZSBpbiBJRTgsIFNhZmFyaSA1LCBldGMuXG4gICAgICBpZiAoZnJlZXplKSB7XG4gICAgICAgIGZyZWV6ZShjZmcpO1xuICAgICAgfVxuICAgICAgQ09ORklHID0gY2ZnO1xuICAgIH07XG4gICAgY29uc3QgTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTID0gYWRkVG9TZXQoe30sIFsnbWknLCAnbW8nLCAnbW4nLCAnbXMnLCAnbXRleHQnXSk7XG4gICAgY29uc3QgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydmb3JlaWdub2JqZWN0JywgJ2Rlc2MnLCAndGl0bGUnLCAnYW5ub3RhdGlvbi14bWwnXSk7XG5cbiAgICAvLyBDZXJ0YWluIGVsZW1lbnRzIGFyZSBhbGxvd2VkIGluIGJvdGggU1ZHIGFuZCBIVE1MXG4gICAgLy8gbmFtZXNwYWNlLiBXZSBuZWVkIHRvIHNwZWNpZnkgdGhlbSBleHBsaWNpdGx5XG4gICAgLy8gc28gdGhhdCB0aGV5IGRvbid0IGdldCBlcnJvbmVvdXNseSBkZWxldGVkIGZyb21cbiAgICAvLyBIVE1MIG5hbWVzcGFjZS5cbiAgICBjb25zdCBDT01NT05fU1ZHX0FORF9IVE1MX0VMRU1FTlRTID0gYWRkVG9TZXQoe30sIFsndGl0bGUnLCAnc3R5bGUnLCAnZm9udCcsICdhJywgJ3NjcmlwdCddKTtcblxuICAgIC8qIEtlZXAgdHJhY2sgb2YgYWxsIHBvc3NpYmxlIFNWRyBhbmQgTWF0aE1MIHRhZ3NcbiAgICAgKiBzbyB0aGF0IHdlIGNhbiBwZXJmb3JtIHRoZSBuYW1lc3BhY2UgY2hlY2tzXG4gICAgICogY29ycmVjdGx5LiAqL1xuICAgIGNvbnN0IEFMTF9TVkdfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLnN2Z0Rpc2FsbG93ZWRdKTtcbiAgICBjb25zdCBBTExfTUFUSE1MX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLm1hdGhNbCQxLCAuLi5tYXRoTWxEaXNhbGxvd2VkXSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IGEgRE9NIGVsZW1lbnQgd2hvc2UgbmFtZXNwYWNlIGlzIGJlaW5nIGNoZWNrZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJuIGZhbHNlIGlmIHRoZSBlbGVtZW50IGhhcyBhXG4gICAgICogIG5hbWVzcGFjZSB0aGF0IGEgc3BlYy1jb21wbGlhbnQgcGFyc2VyIHdvdWxkIG5ldmVyXG4gICAgICogIHJldHVybi4gUmV0dXJuIHRydWUgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGNvbnN0IF9jaGVja1ZhbGlkTmFtZXNwYWNlID0gZnVuY3Rpb24gX2NoZWNrVmFsaWROYW1lc3BhY2UoZWxlbWVudCkge1xuICAgICAgbGV0IHBhcmVudCA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgICAgIC8vIEluIEpTRE9NLCBpZiB3ZSdyZSBpbnNpZGUgc2hhZG93IERPTSwgdGhlbiBwYXJlbnROb2RlXG4gICAgICAvLyBjYW4gYmUgbnVsbC4gV2UganVzdCBzaW11bGF0ZSBwYXJlbnQgaW4gdGhpcyBjYXNlLlxuICAgICAgaWYgKCFwYXJlbnQgfHwgIXBhcmVudC50YWdOYW1lKSB7XG4gICAgICAgIHBhcmVudCA9IHtcbiAgICAgICAgICBuYW1lc3BhY2VVUkk6IE5BTUVTUEFDRSxcbiAgICAgICAgICB0YWdOYW1lOiAndGVtcGxhdGUnXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjb25zdCB0YWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoZWxlbWVudC50YWdOYW1lKTtcbiAgICAgIGNvbnN0IHBhcmVudFRhZ05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShwYXJlbnQudGFnTmFtZSk7XG4gICAgICBpZiAoIUFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBIVE1MIG5hbWVzcGFjZSB0byBTVkdcbiAgICAgICAgLy8gaXMgdmlhIDxzdmc+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBNYXRoTUwgdG8gU1ZHIGlzIHZpYWBcbiAgICAgICAgLy8gc3ZnIGlmIHBhcmVudCBpcyBlaXRoZXIgPGFubm90YXRpb24teG1sPiBvciBNYXRoTUxcbiAgICAgICAgLy8gdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHMuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnICYmIChwYXJlbnRUYWdOYW1lID09PSAnYW5ub3RhdGlvbi14bWwnIHx8IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gU1ZHXG4gICAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gU1ZHIG5hbWVzcGFjZS5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX1NWR19UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gTWF0aE1MXG4gICAgICAgIC8vIGlzIHZpYSA8bWF0aD4uIElmIGl0IGhhcHBlbnMgdmlhIGFueSBvdGhlciB0YWcsIHRoZW5cbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGtpbGxlZC5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdtYXRoJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gTWF0aE1MIGlzIHZpYVxuICAgICAgICAvLyA8bWF0aD4gYW5kIEhUTUwgaW50ZWdyYXRpb24gcG9pbnRzXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdtYXRoJyAmJiBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBNYXRoTUxcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBNYXRoTUwgbmFtZXNwYWNlLlxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIEhUTUwgaXMgdmlhXG4gICAgICAgIC8vIEhUTUwgaW50ZWdyYXRpb24gcG9pbnRzLCBhbmQgZnJvbSBNYXRoTUwgdG8gSFRNTFxuICAgICAgICAvLyBpcyB2aWEgTWF0aE1MIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFICYmICFIVE1MX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSAmJiAhTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgZGlzYWxsb3cgdGFncyB0aGF0IGFyZSBzcGVjaWZpYyBmb3IgTWF0aE1MXG4gICAgICAgIC8vIG9yIFNWRyBhbmQgc2hvdWxkIG5ldmVyIGFwcGVhciBpbiBIVE1MIG5hbWVzcGFjZVxuICAgICAgICByZXR1cm4gIUFMTF9NQVRITUxfVEFHU1t0YWdOYW1lXSAmJiAoQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UU1t0YWdOYW1lXSB8fCAhQUxMX1NWR19UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIFhIVE1MIGFuZCBYTUwgZG9jdW1lbnRzIHRoYXQgc3VwcG9ydCBjdXN0b20gbmFtZXNwYWNlc1xuICAgICAgaWYgKFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyAmJiBBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29kZSBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpcyBwbGFjZSAodGhpcyBtZWFuc1xuICAgICAgLy8gdGhhdCB0aGUgZWxlbWVudCBzb21laG93IGdvdCBuYW1lc3BhY2UgdGhhdCBpcyBub3RcbiAgICAgIC8vIEhUTUwsIFNWRywgTWF0aE1MIG9yIGFsbG93ZWQgdmlhIEFMTE9XRURfTkFNRVNQQUNFUykuXG4gICAgICAvLyBSZXR1cm4gZmFsc2UganVzdCBpbiBjYXNlLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfZm9yY2VSZW1vdmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9mb3JjZVJlbW92ZSA9IGZ1bmN0aW9uIF9mb3JjZVJlbW92ZShub2RlKSB7XG4gICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgZWxlbWVudDogbm9kZVxuICAgICAgfSk7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtcmVtb3ZlXG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3JlbW92ZUF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIGFuIEF0dHJpYnV0ZSBuYW1lXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX3JlbW92ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgbm9kZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgYXR0cmlidXRlOiBub2RlLmdldEF0dHJpYnV0ZU5vZGUobmFtZSksXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgYXR0cmlidXRlOiBudWxsLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblxuICAgICAgLy8gV2Ugdm9pZCBhdHRyaWJ1dGUgdmFsdWVzIGZvciB1bnJlbW92YWJsZSBcImlzXCJcIiBhdHRyaWJ1dGVzXG4gICAgICBpZiAobmFtZSA9PT0gJ2lzJyAmJiAhQUxMT1dFRF9BVFRSW25hbWVdKSB7XG4gICAgICAgIGlmIChSRVRVUk5fRE9NIHx8IFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX2ZvcmNlUmVtb3ZlKG5vZGUpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pbml0RG9jdW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZGlydHkgYSBzdHJpbmcgb2YgZGlydHkgbWFya3VwXG4gICAgICogQHJldHVybiB7RG9jdW1lbnR9IGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXG4gICAgICovXG4gICAgY29uc3QgX2luaXREb2N1bWVudCA9IGZ1bmN0aW9uIF9pbml0RG9jdW1lbnQoZGlydHkpIHtcbiAgICAgIC8qIENyZWF0ZSBhIEhUTUwgZG9jdW1lbnQgKi9cbiAgICAgIGxldCBkb2MgPSBudWxsO1xuICAgICAgbGV0IGxlYWRpbmdXaGl0ZXNwYWNlID0gbnVsbDtcbiAgICAgIGlmIChGT1JDRV9CT0RZKSB7XG4gICAgICAgIGRpcnR5ID0gJzxyZW1vdmU+PC9yZW1vdmU+JyArIGRpcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogSWYgRk9SQ0VfQk9EWSBpc24ndCB1c2VkLCBsZWFkaW5nIHdoaXRlc3BhY2UgbmVlZHMgdG8gYmUgcHJlc2VydmVkIG1hbnVhbGx5ICovXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBzdHJpbmdNYXRjaChkaXJ0eSwgL15bXFxyXFxuXFx0IF0rLyk7XG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzBdO1xuICAgICAgfVxuICAgICAgaWYgKFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyAmJiBOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFJvb3Qgb2YgWEhUTUwgZG9jIG11c3QgY29udGFpbiB4bWxucyBkZWNsYXJhdGlvbiAoc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvbm9ybWF0aXZlLmh0bWwjc3RyaWN0KVxuICAgICAgICBkaXJ0eSA9ICc8aHRtbCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj48aGVhZD48L2hlYWQ+PGJvZHk+JyArIGRpcnR5ICsgJzwvYm9keT48L2h0bWw+JztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpcnR5UGF5bG9hZCA9IHRydXN0ZWRUeXBlc1BvbGljeSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgLypcbiAgICAgICAqIFVzZSB0aGUgRE9NUGFyc2VyIEFQSSBieSBkZWZhdWx0LCBmYWxsYmFjayBsYXRlciBpZiBuZWVkcyBiZVxuICAgICAgICogRE9NUGFyc2VyIG5vdCB3b3JrIGZvciBzdmcgd2hlbiBoYXMgbXVsdGlwbGUgcm9vdCBlbGVtZW50LlxuICAgICAgICovXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZGlydHlQYXlsb2FkLCBQQVJTRVJfTUVESUFfVFlQRSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICB9XG5cbiAgICAgIC8qIFVzZSBjcmVhdGVIVE1MRG9jdW1lbnQgaW4gY2FzZSBET01QYXJzZXIgaXMgbm90IGF2YWlsYWJsZSAqL1xuICAgICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZG9jID0gaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoTkFNRVNQQUNFLCAndGVtcGxhdGUnLCBudWxsKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTCA9IElTX0VNUFRZX0lOUFVUID8gZW1wdHlIVE1MIDogZGlydHlQYXlsb2FkO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgLy8gU3ludGF4IGVycm9yIGlmIGRpcnR5UGF5bG9hZCBpcyBpbnZhbGlkIHhtbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBib2R5ID0gZG9jLmJvZHkgfHwgZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGlmIChkaXJ0eSAmJiBsZWFkaW5nV2hpdGVzcGFjZSkge1xuICAgICAgICBib2R5Lmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsZWFkaW5nV2hpdGVzcGFjZSksIGJvZHkuY2hpbGROb2Rlc1swXSB8fCBudWxsKTtcbiAgICAgIH1cblxuICAgICAgLyogV29yayBvbiB3aG9sZSBkb2N1bWVudCBvciBqdXN0IGl0cyBib2R5ICovXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeVRhZ05hbWUuY2FsbChkb2MsIFdIT0xFX0RPQ1VNRU5UID8gJ2h0bWwnIDogJ2JvZHknKVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBXSE9MRV9ET0NVTUVOVCA/IGRvYy5kb2N1bWVudEVsZW1lbnQgOiBib2R5O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTm9kZUl0ZXJhdG9yIG9iamVjdCB0aGF0IHlvdSBjYW4gdXNlIHRvIHRyYXZlcnNlIGZpbHRlcmVkIGxpc3RzIG9mIG5vZGVzIG9yIGVsZW1lbnRzIGluIGEgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSByb290IFRoZSByb290IGVsZW1lbnQgb3Igbm9kZSB0byBzdGFydCB0cmF2ZXJzaW5nIG9uLlxuICAgICAqIEByZXR1cm4ge05vZGVJdGVyYXRvcn0gVGhlIGNyZWF0ZWQgTm9kZUl0ZXJhdG9yXG4gICAgICovXG4gICAgY29uc3QgX2NyZWF0ZU5vZGVJdGVyYXRvciA9IGZ1bmN0aW9uIF9jcmVhdGVOb2RlSXRlcmF0b3Iocm9vdCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vZGVJdGVyYXRvci5jYWxsKHJvb3Qub3duZXJEb2N1bWVudCB8fCByb290LCByb290LFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UIHwgTm9kZUZpbHRlci5TSE9XX0NPTU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc0Nsb2JiZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gZWxtIGVsZW1lbnQgdG8gY2hlY2sgZm9yIGNsb2JiZXJpbmcgYXR0YWNrc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgY2xvYmJlcmVkLCBmYWxzZSBpZiBzYWZlXG4gICAgICovXG4gICAgY29uc3QgX2lzQ2xvYmJlcmVkID0gZnVuY3Rpb24gX2lzQ2xvYmJlcmVkKGVsbSkge1xuICAgICAgcmV0dXJuIGVsbSBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCAmJiAodHlwZW9mIGVsbS5ub2RlTmFtZSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS5yZW1vdmVDaGlsZCAhPT0gJ2Z1bmN0aW9uJyB8fCAhKGVsbS5hdHRyaWJ1dGVzIGluc3RhbmNlb2YgTmFtZWROb2RlTWFwKSB8fCB0eXBlb2YgZWxtLnJlbW92ZUF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLnNldEF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLm5hbWVzcGFjZVVSSSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS5pbnNlcnRCZWZvcmUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5oYXNDaGlsZE5vZGVzICE9PSAnZnVuY3Rpb24nKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIERPTSBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gb2JqZWN0IG9iamVjdCB0byBjaGVjayB3aGV0aGVyIGl0J3MgYSBET00gbm9kZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaXMgb2JqZWN0IGlzIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfaXNOb2RlID0gZnVuY3Rpb24gX2lzTm9kZShvYmplY3QpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgTm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmplY3QgaW5zdGFuY2VvZiBOb2RlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfZXhlY3V0ZUhvb2tcbiAgICAgKiBFeGVjdXRlIHVzZXIgY29uZmlndXJhYmxlIGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGVudHJ5UG9pbnQgIE5hbWUgb2YgdGhlIGhvb2sncyBlbnRyeSBwb2ludFxuICAgICAqIEBwYXJhbSAge05vZGV9IGN1cnJlbnROb2RlIG5vZGUgdG8gd29yayBvbiB3aXRoIHRoZSBob29rXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIGFkZGl0aW9uYWwgaG9vayBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgY29uc3QgX2V4ZWN1dGVIb29rID0gZnVuY3Rpb24gX2V4ZWN1dGVIb29rKGVudHJ5UG9pbnQsIGN1cnJlbnROb2RlLCBkYXRhKSB7XG4gICAgICBpZiAoIWhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFycmF5Rm9yRWFjaChob29rc1tlbnRyeVBvaW50XSwgaG9vayA9PiB7XG4gICAgICAgIGhvb2suY2FsbChET01QdXJpZnksIGN1cnJlbnROb2RlLCBkYXRhLCBDT05GSUcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZUVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgICAqIEBwcm90ZWN0IHRleHRDb250ZW50XG4gICAgICogQHByb3RlY3QgcmVtb3ZlQ2hpbGRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBjaGVjayBmb3IgcGVybWlzc2lvbiB0byBleGlzdFxuICAgICAqIEByZXR1cm4gIHtCb29sZWFufSB0cnVlIGlmIG5vZGUgd2FzIGtpbGxlZCwgZmFsc2UgaWYgbGVmdCBhbGl2ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUVsZW1lbnRzID0gZnVuY3Rpb24gX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpIHtcbiAgICAgIGxldCBjb250ZW50ID0gbnVsbDtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgICAvKiBDaGVjayBpZiBlbGVtZW50IGlzIGNsb2JiZXJlZCBvciBjYW4gY2xvYmJlciAqL1xuICAgICAgaWYgKF9pc0Nsb2JiZXJlZChjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE5vdyBsZXQncyBjaGVjayB0aGUgZWxlbWVudCdzIHR5cGUgYW5kIG5hbWUgKi9cbiAgICAgIGNvbnN0IHRhZ05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIGN1cnJlbnROb2RlLCB7XG4gICAgICAgIHRhZ05hbWUsXG4gICAgICAgIGFsbG93ZWRUYWdzOiBBTExPV0VEX1RBR1NcbiAgICAgIH0pO1xuXG4gICAgICAvKiBEZXRlY3QgbVhTUyBhdHRlbXB0cyBhYnVzaW5nIG5hbWVzcGFjZSBjb25mdXNpb24gKi9cbiAgICAgIGlmIChjdXJyZW50Tm9kZS5oYXNDaGlsZE5vZGVzKCkgJiYgIV9pc05vZGUoY3VycmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpICYmIHJlZ0V4cFRlc3QoLzxbL1xcd10vZywgY3VycmVudE5vZGUuaW5uZXJIVE1MKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLnRleHRDb250ZW50KSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGVsZW1lbnQgaWYgYW55dGhpbmcgZm9yYmlkcyBpdHMgcHJlc2VuY2UgKi9cbiAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYSBjdXN0b20gZWxlbWVudCB0byBoYW5kbGUgKi9cbiAgICAgICAgaWYgKCFGT1JCSURfVEFHU1t0YWdOYW1lXSAmJiBfaXNCYXNpY0N1c3RvbUVsZW1lbnQodGFnTmFtZSkpIHtcbiAgICAgICAgICBpZiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCB0YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKHRhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogS2VlcCBjb250ZW50IGV4Y2VwdCBmb3IgYmFkLWxpc3RlZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoS0VFUF9DT05URU5UICYmICFGT1JCSURfQ09OVEVOVFNbdGFnTmFtZV0pIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gZ2V0Q2hpbGROb2RlcyhjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgICBpZiAoY2hpbGROb2RlcyAmJiBwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENvdW50ID0gY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY2hpbGRDb3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTm9kZShjaGlsZE5vZGVzW2ldLCB0cnVlKSwgZ2V0TmV4dFNpYmxpbmcoY3VycmVudE5vZGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIENoZWNrIHdoZXRoZXIgZWxlbWVudCBoYXMgYSB2YWxpZCBuYW1lc3BhY2UgKi9cbiAgICAgIGlmIChjdXJyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgIV9jaGVja1ZhbGlkTmFtZXNwYWNlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogTWFrZSBzdXJlIHRoYXQgb2xkZXIgYnJvd3NlcnMgZG9uJ3QgZ2V0IGZhbGxiYWNrLXRhZyBtWFNTICovXG4gICAgICBpZiAoKHRhZ05hbWUgPT09ICdub3NjcmlwdCcgfHwgdGFnTmFtZSA9PT0gJ25vZW1iZWQnIHx8IHRhZ05hbWUgPT09ICdub2ZyYW1lcycpICYmIHJlZ0V4cFRlc3QoLzxcXC9ubyhzY3JpcHR8ZW1iZWR8ZnJhbWVzKS9pLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBlbGVtZW50IGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUyAmJiBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAvKiBHZXQgdGhlIGVsZW1lbnQncyB0ZXh0IGNvbnRlbnQgKi9cbiAgICAgICAgY29udGVudCA9IGN1cnJlbnROb2RlLnRleHRDb250ZW50O1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIGV4cHIsICcgJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUudGV4dENvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGN1cnJlbnROb2RlLmNsb25lTm9kZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY1RhZyBMb3dlcmNhc2UgdGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNOYW1lIExvd2VyY2FzZSBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgY29uc3QgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xuICAgICAgLyogTWFrZSBzdXJlIGF0dHJpYnV0ZSBjYW5ub3QgY2xvYmJlciAqL1xuICAgICAgaWYgKFNBTklUSVpFX0RPTSAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJiAodmFsdWUgaW4gZG9jdW1lbnQgfHwgdmFsdWUgaW4gZm9ybUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyogQWxsb3cgdmFsaWQgZGF0YS0qIGF0dHJpYnV0ZXM6IEF0IGxlYXN0IG9uZSBjaGFyYWN0ZXIgYWZ0ZXIgXCItXCJcbiAgICAgICAgICAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZG9tLmh0bWwjZW1iZWRkaW5nLWN1c3RvbS1ub24tdmlzaWJsZS1kYXRhLXdpdGgtdGhlLWRhdGEtKi1hdHRyaWJ1dGVzKVxuICAgICAgICAgIFhNTC1jb21wYXRpYmxlIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3htbC1jb21wYXRpYmxlIGFuZCBodHRwOi8vd3d3LnczLm9yZy9UUi94bWwvI2QwZTgwNClcbiAgICAgICAgICBXZSBkb24ndCBuZWVkIHRvIGNoZWNrIHRoZSB2YWx1ZTsgaXQncyBhbHdheXMgVVJJIHNhZmUuICovXG4gICAgICBpZiAoQUxMT1dfREFUQV9BVFRSICYmICFGT1JCSURfQVRUUltsY05hbWVdICYmIHJlZ0V4cFRlc3QoREFUQV9BVFRSLCBsY05hbWUpKSA7IGVsc2UgaWYgKEFMTE9XX0FSSUFfQVRUUiAmJiByZWdFeHBUZXN0KEFSSUFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgIC8vIEZpcnN0IGNvbmRpdGlvbiBkb2VzIGEgdmVyeSBiYXNpYyBjaGVjayBpZiBhKSBpdCdzIGJhc2ljYWxseSBhIHZhbGlkIGN1c3RvbSBlbGVtZW50IHRhZ25hbWUgQU5EXG4gICAgICAgIC8vIGIpIGlmIHRoZSB0YWdOYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIC8vIGFuZCBjKSBpZiB0aGUgYXR0cmlidXRlIG5hbWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2tcbiAgICAgICAgX2lzQmFzaWNDdXN0b21FbGVtZW50KGxjVGFnKSAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCBsY1RhZykgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKGxjVGFnKSkgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaywgbGNOYW1lKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sobGNOYW1lKSkgfHxcbiAgICAgICAgLy8gQWx0ZXJuYXRpdmUsIHNlY29uZCBjb25kaXRpb24gY2hlY2tzIGlmIGl0J3MgYW4gYGlzYC1hdHRyaWJ1dGUsIEFORFxuICAgICAgICAvLyB0aGUgdmFsdWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2tcbiAgICAgICAgbGNOYW1lID09PSAnaXMnICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCB2YWx1ZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKHZhbHVlKSkpIDsgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qIENoZWNrIHZhbHVlIGlzIHNhZmUuIEZpcnN0LCBpcyBhdHRyIGluZXJ0PyBJZiBzbywgaXMgc2FmZSAqL1xuICAgICAgfSBlbHNlIGlmIChVUklfU0FGRV9BVFRSSUJVVEVTW2xjTmFtZV0pIDsgZWxzZSBpZiAocmVnRXhwVGVzdChJU19BTExPV0VEX1VSSSQxLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSkpIDsgZWxzZSBpZiAoKGxjTmFtZSA9PT0gJ3NyYycgfHwgbGNOYW1lID09PSAneGxpbms6aHJlZicgfHwgbGNOYW1lID09PSAnaHJlZicpICYmIGxjVGFnICE9PSAnc2NyaXB0JyAmJiBzdHJpbmdJbmRleE9mKHZhbHVlLCAnZGF0YTonKSA9PT0gMCAmJiBEQVRBX1VSSV9UQUdTW2xjVGFnXSkgOyBlbHNlIGlmIChBTExPV19VTktOT1dOX1BST1RPQ09MUyAmJiAhcmVnRXhwVGVzdChJU19TQ1JJUFRfT1JfREFUQSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpKSA7IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQmFzaWNDdXN0b21FbGVtZW50XG4gICAgICogY2hlY2tzIGlmIGF0IGxlYXN0IG9uZSBkYXNoIGlzIGluY2x1ZGVkIGluIHRhZ05hbWUsIGFuZCBpdCdzIG5vdCB0aGUgZmlyc3QgY2hhclxuICAgICAqIGZvciBtb3JlIHNvcGhpc3RpY2F0ZWQgY2hlY2tpbmcgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvdmFsaWRhdGUtZWxlbWVudC1uYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBuYW1lIG9mIHRoZSB0YWcgb2YgdGhlIG5vZGUgdG8gc2FuaXRpemVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgbmFtZSBtZWV0cyB0aGUgYmFzaWMgY3JpdGVyaWEgZm9yIGEgY3VzdG9tIGVsZW1lbnQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfaXNCYXNpY0N1c3RvbUVsZW1lbnQgPSBmdW5jdGlvbiBfaXNCYXNpY0N1c3RvbUVsZW1lbnQodGFnTmFtZSkge1xuICAgICAgcmV0dXJuIHRhZ05hbWUgIT09ICdhbm5vdGF0aW9uLXhtbCcgJiYgdGFnTmFtZS5pbmRleE9mKCctJykgPiAwO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVBdHRyaWJ1dGVzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdCBhdHRyaWJ1dGVzXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVBdHRyaWJ1dGVcbiAgICAgKiBAcHJvdGVjdCBzZXRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGN1cnJlbnROb2RlIHRvIHNhbml0aXplXG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplQXR0cmlidXRlcyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoY3VycmVudE5vZGUpIHtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBhdHRyaWJ1dGVzXG4gICAgICB9ID0gY3VycmVudE5vZGU7XG5cbiAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYXR0cmlidXRlczsgaWYgbm90IHdlIG1pZ2h0IGhhdmUgYSB0ZXh0IG5vZGUgKi9cbiAgICAgIGlmICghYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBob29rRXZlbnQgPSB7XG4gICAgICAgIGF0dHJOYW1lOiAnJyxcbiAgICAgICAgYXR0clZhbHVlOiAnJyxcbiAgICAgICAga2VlcEF0dHI6IHRydWUsXG4gICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiBBTExPV0VEX0FUVFJcbiAgICAgIH07XG4gICAgICBsZXQgbCA9IGF0dHJpYnV0ZXMubGVuZ3RoO1xuXG4gICAgICAvKiBHbyBiYWNrd2FyZHMgb3ZlciBhbGwgYXR0cmlidXRlczsgc2FmZWx5IHJlbW92ZSBiYWQgb25lcyAqL1xuICAgICAgd2hpbGUgKGwtLSkge1xuICAgICAgICBjb25zdCBhdHRyID0gYXR0cmlidXRlc1tsXTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgbmFtZXNwYWNlVVJJLFxuICAgICAgICAgIHZhbHVlOiBhdHRyVmFsdWVcbiAgICAgICAgfSA9IGF0dHI7XG4gICAgICAgIGNvbnN0IGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKG5hbWUpO1xuICAgICAgICBsZXQgdmFsdWUgPSBuYW1lID09PSAndmFsdWUnID8gYXR0clZhbHVlIDogc3RyaW5nVHJpbShhdHRyVmFsdWUpO1xuXG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgaG9va0V2ZW50LmF0dHJOYW1lID0gbGNOYW1lO1xuICAgICAgICBob29rRXZlbnQuYXR0clZhbHVlID0gdmFsdWU7XG4gICAgICAgIGhvb2tFdmVudC5rZWVwQXR0ciA9IHRydWU7XG4gICAgICAgIGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyID0gdW5kZWZpbmVkOyAvLyBBbGxvd3MgZGV2ZWxvcGVycyB0byBzZWUgdGhpcyBpcyBhIHByb3BlcnR5IHRoZXkgY2FuIHNldFxuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUF0dHJpYnV0ZScsIGN1cnJlbnROb2RlLCBob29rRXZlbnQpO1xuICAgICAgICB2YWx1ZSA9IGhvb2tFdmVudC5hdHRyVmFsdWU7XG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoaG9va0V2ZW50LmZvcmNlS2VlcEF0dHIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92ZSBhdHRyaWJ1dGUgKi9cbiAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGlmICghaG9va0V2ZW50LmtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBXb3JrIGFyb3VuZCBhIHNlY3VyaXR5IGlzc3VlIGluIGpRdWVyeSAzLjAgKi9cbiAgICAgICAgaWYgKCFBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgJiYgcmVnRXhwVGVzdCgvXFwvPi9pLCB2YWx1ZSkpIHtcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNhbml0aXplIGF0dHJpYnV0ZSBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgZXhwciA9PiB7XG4gICAgICAgICAgICB2YWx1ZSA9IHN0cmluZ1JlcGxhY2UodmFsdWUsIGV4cHIsICcgJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJcyBgdmFsdWVgIHZhbGlkIGZvciB0aGlzIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG4gICAgICAgIGlmICghX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBGdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gdmlhIG5hbWVzcGFjZSBpc29sYXRpb24sXG4gICAgICAgICAqIFByZWZpeCBpZCBhbmQgbmFtZSBhdHRyaWJ1dGVzIHdpdGggYHVzZXItY29udGVudC1gXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoU0FOSVRJWkVfTkFNRURfUFJPUFMgJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoaXMgdmFsdWVcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcblxuICAgICAgICAgIC8vIFByZWZpeCB0aGUgdmFsdWUgYW5kIGxhdGVyIHJlLWNyZWF0ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhlIHNhbml0aXplZCB2YWx1ZVxuICAgICAgICAgIHZhbHVlID0gU0FOSVRJWkVfTkFNRURfUFJPUFNfUFJFRklYICsgdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBIYW5kbGUgYXR0cmlidXRlcyB0aGF0IHJlcXVpcmUgVHJ1c3RlZCBUeXBlcyAqL1xuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ICYmIHR5cGVvZiB0cnVzdGVkVHlwZXMgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIDsgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRydXN0ZWRUeXBlcy5nZXRBdHRyaWJ1dGVUeXBlKGxjVGFnLCBsY05hbWUpKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRIVE1MJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2FzZSAnVHJ1c3RlZFNjcmlwdFVSTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlU2NyaXB0VVJMKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBIYW5kbGUgaW52YWxpZCBkYXRhLSogYXR0cmlidXRlIHNldCBieSB0cnktY2F0Y2hpbmcgaXQgKi9cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5zZXRBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVUkksIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyogRmFsbGJhY2sgdG8gc2V0QXR0cmlidXRlKCkgZm9yIGJyb3dzZXItdW5yZWNvZ25pemVkIG5hbWVzcGFjZXMgZS5nLiBcIngtc2NoZW1hXCIuICovXG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhcnJheVBvcChET01QdXJpZnkucmVtb3ZlZCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZVNoYWRvd0RPTVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnQgdG8gaXRlcmF0ZSBvdmVyIHJlY3Vyc2l2ZWx5XG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplU2hhZG93RE9NID0gZnVuY3Rpb24gX3Nhbml0aXplU2hhZG93RE9NKGZyYWdtZW50KSB7XG4gICAgICBsZXQgc2hhZG93Tm9kZSA9IG51bGw7XG4gICAgICBjb25zdCBzaGFkb3dJdGVyYXRvciA9IF9jcmVhdGVOb2RlSXRlcmF0b3IoZnJhZ21lbnQpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuICAgICAgd2hpbGUgKHNoYWRvd05vZGUgPSBzaGFkb3dJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVTaGFkb3dOb2RlJywgc2hhZG93Tm9kZSwgbnVsbCk7XG5cbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKHNoYWRvd05vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cbiAgICAgICAgaWYgKHNoYWRvd05vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oc2hhZG93Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplXG4gICAgICogUHVibGljIG1ldGhvZCBwcm92aWRpbmcgY29yZSBzYW5pdGF0aW9uIGZ1bmN0aW9uYWxpdHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE5vZGV9IGRpcnR5IHN0cmluZyBvciBET00gbm9kZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgb2JqZWN0XG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBET01QdXJpZnkuc2FuaXRpemUgPSBmdW5jdGlvbiAoZGlydHkpIHtcbiAgICAgIGxldCBjZmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgbGV0IGJvZHkgPSBudWxsO1xuICAgICAgbGV0IGltcG9ydGVkTm9kZSA9IG51bGw7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBudWxsO1xuICAgICAgbGV0IHJldHVybk5vZGUgPSBudWxsO1xuICAgICAgLyogTWFrZSBzdXJlIHdlIGhhdmUgYSBzdHJpbmcgdG8gc2FuaXRpemUuXG4gICAgICAgIERPIE5PVCByZXR1cm4gZWFybHksIGFzIHRoaXMgd2lsbCByZXR1cm4gdGhlIHdyb25nIHR5cGUgaWZcbiAgICAgICAgdGhlIHVzZXIgaGFzIHJlcXVlc3RlZCBhIERPTSBvYmplY3QgcmF0aGVyIHRoYW4gYSBzdHJpbmcgKi9cbiAgICAgIElTX0VNUFRZX0lOUFVUID0gIWRpcnR5O1xuICAgICAgaWYgKElTX0VNUFRZX0lOUFVUKSB7XG4gICAgICAgIGRpcnR5ID0gJzwhLS0+JztcbiAgICAgIH1cblxuICAgICAgLyogU3RyaW5naWZ5LCBpbiBjYXNlIGRpcnR5IGlzIGFuIG9iamVjdCAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycgJiYgIV9pc05vZGUoZGlydHkpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGlydHkudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkaXJ0eSA9IGRpcnR5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnZGlydHkgaXMgbm90IGEgc3RyaW5nLCBhYm9ydGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3RvU3RyaW5nIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIGRpcnR5IEhUTUwgaWYgRE9NUHVyaWZ5IGNhbm5vdCBydW4gKi9cbiAgICAgIGlmICghRE9NUHVyaWZ5LmlzU3VwcG9ydGVkKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogQXNzaWduIGNvbmZpZyB2YXJzICovXG4gICAgICBpZiAoIVNFVF9DT05GSUcpIHtcbiAgICAgICAgX3BhcnNlQ29uZmlnKGNmZyk7XG4gICAgICB9XG5cbiAgICAgIC8qIENsZWFuIHVwIHJlbW92ZWQgZWxlbWVudHMgKi9cbiAgICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG5cbiAgICAgIC8qIENoZWNrIGlmIGRpcnR5IGlzIGNvcnJlY3RseSB0eXBlZCBmb3IgSU5fUExBQ0UgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIElOX1BMQUNFID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoSU5fUExBQ0UpIHtcbiAgICAgICAgLyogRG8gc29tZSBlYXJseSBwcmUtc2FuaXRpemF0aW9uIHRvIGF2b2lkIHVuc2FmZSByb290IG5vZGVzICovXG4gICAgICAgIGlmIChkaXJ0eS5ub2RlTmFtZSkge1xuICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhkaXJ0eS5ub2RlTmFtZSk7XG4gICAgICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgncm9vdCBub2RlIGlzIGZvcmJpZGRlbiBhbmQgY2Fubm90IGJlIHNhbml0aXplZCBpbi1wbGFjZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkaXJ0eSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgLyogSWYgZGlydHkgaXMgYSBET00gZWxlbWVudCwgYXBwZW5kIHRvIGFuIGVtcHR5IGRvY3VtZW50IHRvIGF2b2lkXG4gICAgICAgICAgIGVsZW1lbnRzIGJlaW5nIHN0cmlwcGVkIGJ5IHRoZSBwYXJzZXIgKi9cbiAgICAgICAgYm9keSA9IF9pbml0RG9jdW1lbnQoJzwhLS0tLT4nKTtcbiAgICAgICAgaW1wb3J0ZWROb2RlID0gYm9keS5vd25lckRvY3VtZW50LmltcG9ydE5vZGUoZGlydHksIHRydWUpO1xuICAgICAgICBpZiAoaW1wb3J0ZWROb2RlLm5vZGVUeXBlID09PSAxICYmIGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgICAgLyogTm9kZSBpcyBhbHJlYWR5IGEgYm9keSwgdXNlIGFzIGlzICovXG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIGlmIChpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLWFwcGVuZFxuICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1wb3J0ZWROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogRXhpdCBkaXJlY3RseSBpZiB3ZSBoYXZlIG5vdGhpbmcgdG8gZG8gKi9cbiAgICAgICAgaWYgKCFSRVRVUk5fRE9NICYmICFTQUZFX0ZPUl9URU1QTEFURVMgJiYgIVdIT0xFX0RPQ1VNRU5UICYmXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICAgICAgICBkaXJ0eS5pbmRleE9mKCc8JykgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJbml0aWFsaXplIHRoZSBkb2N1bWVudCB0byB3b3JrIG9uICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KGRpcnR5KTtcblxuICAgICAgICAvKiBDaGVjayB3ZSBoYXZlIGEgRE9NIG5vZGUgZnJvbSB0aGUgZGF0YSAqL1xuICAgICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgICByZXR1cm4gUkVUVVJOX0RPTSA/IG51bGwgOiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gZW1wdHlIVE1MIDogJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGZpcnN0IGVsZW1lbnQgbm9kZSAob3VycykgaWYgRk9SQ0VfQk9EWSBpcyBzZXQgKi9cbiAgICAgIGlmIChib2R5ICYmIEZPUkNFX0JPRFkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIC8qIEdldCBub2RlIGl0ZXJhdG9yICovXG4gICAgICBjb25zdCBub2RlSXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKElOX1BMQUNFID8gZGlydHkgOiBib2R5KTtcblxuICAgICAgLyogTm93IHN0YXJ0IGl0ZXJhdGluZyBvdmVyIHRoZSBjcmVhdGVkIGRvY3VtZW50ICovXG4gICAgICB3aGlsZSAoY3VycmVudE5vZGUgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTaGFkb3cgRE9NIGRldGVjdGVkLCBzYW5pdGl6ZSBpdCAqL1xuICAgICAgICBpZiAoY3VycmVudE5vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oY3VycmVudE5vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8qIElmIHdlIHNhbml0aXplZCBgZGlydHlgIGluLXBsYWNlLCByZXR1cm4gaXQuICovXG4gICAgICBpZiAoSU5fUExBQ0UpIHtcbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBSZXR1cm4gc2FuaXRpemVkIHN0cmluZyBvciBET00gKi9cbiAgICAgIGlmIChSRVRVUk5fRE9NKSB7XG4gICAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGNyZWF0ZURvY3VtZW50RnJhZ21lbnQuY2FsbChib2R5Lm93bmVyRG9jdW1lbnQpO1xuICAgICAgICAgIHdoaWxlIChib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFMTE9XRURfQVRUUi5zaGFkb3dyb290IHx8IEFMTE9XRURfQVRUUi5zaGFkb3dyb290bW9kZSkge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICBBZG9wdE5vZGUoKSBpcyBub3QgdXNlZCBiZWNhdXNlIGludGVybmFsIHN0YXRlIGlzIG5vdCByZXNldFxuICAgICAgICAgICAgKGUuZy4gdGhlIHBhc3QgbmFtZXMgbWFwIG9mIGEgSFRNTEZvcm1FbGVtZW50KSwgdGhpcyBpcyBzYWZlXG4gICAgICAgICAgICBpbiB0aGVvcnkgYnV0IHdlIHdvdWxkIHJhdGhlciBub3QgcmlzayBhbm90aGVyIGF0dGFjayB2ZWN0b3IuXG4gICAgICAgICAgICBUaGUgc3RhdGUgdGhhdCBpcyBjbG9uZWQgYnkgaW1wb3J0Tm9kZSgpIGlzIGV4cGxpY2l0bHkgZGVmaW5lZFxuICAgICAgICAgICAgYnkgdGhlIHNwZWNzLlxuICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGltcG9ydE5vZGUuY2FsbChvcmlnaW5hbERvY3VtZW50LCByZXR1cm5Ob2RlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICAgIH1cbiAgICAgIGxldCBzZXJpYWxpemVkSFRNTCA9IFdIT0xFX0RPQ1VNRU5UID8gYm9keS5vdXRlckhUTUwgOiBib2R5LmlubmVySFRNTDtcblxuICAgICAgLyogU2VyaWFsaXplIGRvY3R5cGUgaWYgYWxsb3dlZCAqL1xuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UICYmIEFMTE9XRURfVEFHU1snIWRvY3R5cGUnXSAmJiBib2R5Lm93bmVyRG9jdW1lbnQgJiYgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUgJiYgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSAmJiByZWdFeHBUZXN0KERPQ1RZUEVfTkFNRSwgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSkpIHtcbiAgICAgICAgc2VyaWFsaXplZEhUTUwgPSAnPCFET0NUWVBFICcgKyBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lICsgJz5cXG4nICsgc2VyaWFsaXplZEhUTUw7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGZpbmFsIHN0cmluZyB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgZXhwciA9PiB7XG4gICAgICAgICAgc2VyaWFsaXplZEhUTUwgPSBzdHJpbmdSZXBsYWNlKHNlcmlhbGl6ZWRIVE1MLCBleHByLCAnICcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHNlcmlhbGl6ZWRIVE1MKSA6IHNlcmlhbGl6ZWRIVE1MO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHNldCB0aGUgY29uZmlndXJhdGlvbiBvbmNlXG4gICAgICogc2V0Q29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnNldENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjZmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgX3BhcnNlQ29uZmlnKGNmZyk7XG4gICAgICBTRVRfQ09ORklHID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgdGhlIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBjbGVhckNvbmZpZ1xuICAgICAqXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmNsZWFyQ29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgQ09ORklHID0gbnVsbDtcbiAgICAgIFNFVF9DT05GSUcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBjaGVjayBpZiBhbiBhdHRyaWJ1dGUgdmFsdWUgaXMgdmFsaWQuXG4gICAgICogVXNlcyBsYXN0IHNldCBjb25maWcsIGlmIGFueS4gT3RoZXJ3aXNlLCB1c2VzIGNvbmZpZyBkZWZhdWx0cy5cbiAgICAgKiBpc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRhZyBUYWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBhdHRyIEF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLiBPdGhlcndpc2UsIHJldHVybnMgZmFsc2UuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyLCB2YWx1ZSkge1xuICAgICAgLyogSW5pdGlhbGl6ZSBzaGFyZWQgY29uZmlnIHZhcnMgaWYgbmVjZXNzYXJ5LiAqL1xuICAgICAgaWYgKCFDT05GSUcpIHtcbiAgICAgICAgX3BhcnNlQ29uZmlnKHt9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmModGFnKTtcbiAgICAgIGNvbnN0IGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGF0dHIpO1xuICAgICAgcmV0dXJuIF9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gYWRkIERPTVB1cmlmeSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIGFkZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhvb2tGdW5jdGlvbiBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmFkZEhvb2sgPSBmdW5jdGlvbiAoZW50cnlQb2ludCwgaG9va0Z1bmN0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIGhvb2tGdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBob29rc1tlbnRyeVBvaW50XSA9IGhvb2tzW2VudHJ5UG9pbnRdIHx8IFtdO1xuICAgICAgYXJyYXlQdXNoKGhvb2tzW2VudHJ5UG9pbnRdLCBob29rRnVuY3Rpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYSBET01QdXJpZnkgaG9vayBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKiAocG9wcyBpdCBmcm9tIHRoZSBzdGFjayBvZiBob29rcyBpZiBtb3JlIGFyZSBwcmVzZW50KVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByZW1vdmVkKHBvcHBlZCkgaG9va1xuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICByZXR1cm4gYXJyYXlQb3AoaG9va3NbZW50cnlQb2ludF0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3MgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rcyB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9va3MgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gW107XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUFsbEhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rc1xuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVBbGxIb29rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhvb2tzID0ge307XG4gICAgfTtcbiAgICByZXR1cm4gRE9NUHVyaWZ5O1xuICB9XG4gIHZhciBwdXJpZnkgPSBjcmVhdGVET01QdXJpZnkoKTtcblxuICByZXR1cm4gcHVyaWZ5O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdXJpZnkuanMubWFwXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xyXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuaW1wb3J0IF90bXBsIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcclxuaW1wb3J0IEVtbEVkaXRvciBmcm9tICcuL2VtbEVkaXRvcic7XHJcblxyXG4vKipcclxuICogRml4ZXMgYSBidWcgaW4gRkYgd2hlcmUgaXQgc29tZXRpbWVzIHdyYXBzXHJcbiAqIG5ldyBsaW5lcyBpbiB0aGVpciBvd24gbGlzdCBpdGVtLlxyXG4gKiBTZWUgaXNzdWUgIzM1OVxyXG4gKi9cclxuZnVuY3Rpb24gZml4RmlyZWZveExpc3RCdWcoZWRpdG9yOiBFbWxFZGl0b3IpIHtcclxuXHQvLyBPbmx5IGFwcGx5IHRvIEZpcmVmb3ggYXMgd2lsbCBicmVhayBvdGhlciBicm93c2Vycy5cclxuXHRpZiAoJ21vekhpZGRlbicgaW4gZG9jdW1lbnQpIHtcclxuXHRcdGxldCBub2RlID0gZWRpdG9yLmdldEJvZHkoKTtcclxuXHRcdGxldCBuZXh0O1xyXG5cclxuXHRcdHdoaWxlIChub2RlKSB7XHJcblx0XHRcdG5leHQgPSBub2RlO1xyXG5cclxuXHRcdFx0aWYgKG5leHQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdG5leHQgPSBuZXh0LmZpcnN0Q2hpbGQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHdoaWxlIChuZXh0ICYmICFuZXh0Lm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG5leHQpIHtcclxuXHRcdFx0XHRcdG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgL1tcXG5cXHJcXHRdKy8udGVzdChub2RlLm5vZGVWYWx1ZSkpIHtcclxuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBpZiBuZXdsaW5lcyBhcmUgY29sbGFwc2VkXHJcblx0XHRcdFx0aWYgKCEvXnByZS8udGVzdChkb20uY3NzKG5vZGUucGFyZW50Tm9kZSwgJ3doaXRlU3BhY2UnKSkpIHtcclxuXHRcdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRub2RlID0gbmV4dCBhcyBhbnk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIE1hcCBvZiBhbGwgdGhlIGNvbW1hbmRzIGZvciBFbWxFZGl0b3JcclxuICogQHR5cGUge09iamVjdH1cclxuICogQG5hbWUgY29tbWFuZHNcclxuICovXHJcbnZhciBkZWZhdWx0Q21kczogYW55ID0ge1xyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBCb2xkXHJcblx0Ym9sZDoge1xyXG5cdFx0ZXhlYzogJ2JvbGQnLFxyXG5cdFx0dG9vbHRpcDogJ0JvbGQnLFxyXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0InXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEl0YWxpY1xyXG5cdGl0YWxpYzoge1xyXG5cdFx0ZXhlYzogJ2l0YWxpYycsXHJcblx0XHR0b29sdGlwOiAnSXRhbGljJyxcclxuXHRcdHNob3J0Y3V0OiAnQ3RybCtJJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBVbmRlcmxpbmVcclxuXHR1bmRlcmxpbmU6IHtcclxuXHRcdGV4ZWM6ICd1bmRlcmxpbmUnLFxyXG5cdFx0dG9vbHRpcDogJ1VuZGVybGluZScsXHJcblx0XHRzaG9ydGN1dDogJ0N0cmwrVSdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogU3RyaWtldGhyb3VnaFxyXG5cdHN0cmlrZToge1xyXG5cdFx0ZXhlYzogJ3N0cmlrZXRocm91Z2gnLFxyXG5cdFx0dG9vbHRpcDogJ1N0cmlrZXRocm91Z2gnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1YnNjcmlwdFxyXG5cdHN1YnNjcmlwdDoge1xyXG5cdFx0ZXhlYzogJ3N1YnNjcmlwdCcsXHJcblx0XHR0b29sdGlwOiAnU3Vic2NyaXB0J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdXBlcnNjcmlwdFxyXG5cdHN1cGVyc2NyaXB0OiB7XHJcblx0XHRleGVjOiAnc3VwZXJzY3JpcHQnLFxyXG5cdFx0dG9vbHRpcDogJ1N1cGVyc2NyaXB0J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogTGVmdFxyXG5cdGxlZnQ6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMykge1xyXG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChub2RlKSB7XHJcblx0XHRcdFx0dmFyIGlzTHRyID0gZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJykgPT09ICdsdHInO1xyXG5cdFx0XHRcdHZhciBhbGlnbiA9IGRvbS5jc3Mobm9kZSwgJ3RleHRBbGlnbicpO1xyXG5cclxuXHRcdFx0XHQvLyBDYW4gYmUgLW1vei1sZWZ0XHJcblx0XHRcdFx0cmV0dXJuIC9sZWZ0Ly50ZXN0KGFsaWduKSB8fFxyXG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdzdGFydCcgOiAnZW5kJyk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRleGVjOiAnanVzdGlmeWxlZnQnLFxyXG5cdFx0dG9vbHRpcDogJ0FsaWduIGxlZnQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENlbnRyZVxyXG5cdGNlbnRlcjoge1xyXG5cdFx0ZXhlYzogJ2p1c3RpZnljZW50ZXInLFxyXG5cdFx0dG9vbHRpcDogJ0NlbnRlcidcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogUmlnaHRcclxuXHRyaWdodDoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHR2YXIgaXNMdHIgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cic7XHJcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XHJcblxyXG5cdFx0XHRcdC8vIENhbiBiZSAtbW96LXJpZ2h0XHJcblx0XHRcdFx0cmV0dXJuIC9yaWdodC8udGVzdChhbGlnbikgfHxcclxuXHRcdFx0XHRcdGFsaWduID09PSAoaXNMdHIgPyAnZW5kJyA6ICdzdGFydCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogJ2p1c3RpZnlyaWdodCcsXHJcblx0XHR0b29sdGlwOiAnQWxpZ24gcmlnaHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEp1c3RpZnlcclxuXHRqdXN0aWZ5OiB7XHJcblx0XHRleGVjOiAnanVzdGlmeWZ1bGwnLFxyXG5cdFx0dG9vbHRpcDogJ0p1c3RpZnknXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBGb250XHJcblx0Zm9udDoge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yOiBFbWxFZGl0b3IsIGNhbGxlcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAoc3RyOiBzdHJpbmcpID0+IGFueSkge1xyXG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKGRvbS5kYXRhKHRoaXMsICdmb250JykpO1xyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuZWRpdG9yT3B0aW9ucy5mb250cy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKGZvbnQ6IGFueSkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZm9udE9wdCcsIHtcclxuXHRcdFx0XHRcdGZvbnQ6IGZvbnRcclxuXHRcdFx0XHR9LCB0cnVlKSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2ZvbnQtcGlja2VyJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XHJcblxyXG5cdFx0XHRkZWZhdWx0Q21kcy5mb250Ll9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGZvbnROYW1lOiBzdHJpbmcpIHtcclxuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRuYW1lJywgZm9udE5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnRm9udCBOYW1lJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBTaXplXHJcblx0c2l6ZToge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yOiBFbWxFZGl0b3IsIGNhbGxlcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAoc3RyOiBzdHJpbmcpID0+IGFueSkge1xyXG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKGRvbS5kYXRhKHRoaXMsICdzaXplJykpO1xyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSA3OyBpKyspIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3NpemVPcHQnLCB7XHJcblx0XHRcdFx0XHRzaXplOiBpXHJcblx0XHRcdFx0fSwgdHJ1ZSkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udHNpemUtcGlja2VyJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XHJcblxyXG5cdFx0XHRkZWZhdWx0Q21kcy5zaXplLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGZvbnRTaXplOiBzdHJpbmcpIHtcclxuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRzaXplJywgZm9udFNpemUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnRm9udCBTaXplJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2xvdXJcclxuXHRjb2xvcjoge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yOiBFbWxFZGl0b3IsIGNhbGxlcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAoc3RyOiBzdHJpbmcpID0+IGFueSkge1xyXG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0dmFyIGh0bWwgPSAnJztcclxuXHRcdFx0dmFyIGNtZCA9IGRlZmF1bHRDbWRzLmNvbG9yO1xyXG5cclxuXHRcdFx0aWYgKCFjbWQuX2h0bWxDYWNoZSkge1xyXG5cdFx0XHRcdGVkaXRvci5lZGl0b3JPcHRpb25zLmNvbG9ycy5zcGxpdCgnfCcpLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbjogc3RyaW5nKSB7XHJcblx0XHRcdFx0XHRodG1sICs9ICc8ZGl2IGNsYXNzPVwiZW1sZWRpdG9yLWNvbG9yLWNvbHVtblwiPic7XHJcblxyXG5cdFx0XHRcdFx0Y29sdW1uLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoY29sb3I6IHN0cmluZykge1xyXG5cdFx0XHRcdFx0XHRodG1sICs9XHJcblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJlbWxlZGl0b3ItY29sb3Itb3B0aW9uXCInICtcclxuXHRcdFx0XHRcdFx0XHQnIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJyArIGNvbG9yICsgJ1wiJyArXHJcblx0XHRcdFx0XHRcdFx0JyBkYXRhLWNvbG9yPVwiJyArIGNvbG9yICsgJ1wiPjwvYT4nO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0aHRtbCArPSAnPC9kaXY+JztcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Y21kLl9odG1sQ2FjaGUgPSBodG1sO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgZG9tLnBhcnNlSFRNTChjbWQuX2h0bWxDYWNoZSkpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2NvbG9yJykpO1xyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnY29sb3ItcGlja2VyJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XHJcblxyXG5cdFx0XHRkZWZhdWx0Q21kcy5jb2xvci5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChjb2xvcjogc3RyaW5nKSB7XHJcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JlY29sb3InLCBjb2xvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdGb250IENvbG9yJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBSZW1vdmUgRm9ybWF0XHJcblx0cmVtb3ZlZm9ybWF0OiB7XHJcblx0XHRleGVjOiAncmVtb3ZlZm9ybWF0JyxcclxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgRm9ybWF0dGluZydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEN1dFxyXG5cdGN1dDoge1xyXG5cdFx0ZXhlYzogJ2N1dCcsXHJcblx0XHR0b29sdGlwOiAnQ3V0JyxcclxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY3V0IGNvbW1hbmQuICcgK1xyXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtWCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29weVxyXG5cdGNvcHk6IHtcclxuXHRcdGV4ZWM6ICdjb3B5JyxcclxuXHRcdHRvb2x0aXA6ICdDb3B5JyxcclxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY29weSBjb21tYW5kLiAnICtcclxuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLUMnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlXHJcblx0cGFzdGU6IHtcclxuXHRcdGV4ZWM6ICdwYXN0ZScsXHJcblx0XHR0b29sdGlwOiAnUGFzdGUnLFxyXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBwYXN0ZSBjb21tYW5kLiAnICtcclxuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLVYnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlIFRleHRcclxuXHRwYXN0ZXRleHQ6IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXI6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHZhciB2YWwsXHJcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRlZGl0b3IgPSB0aGlzO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdwYXN0ZXRleHQnLCB7XHJcblx0XHRcdFx0bGFiZWw6IGVkaXRvci50cmFuc2xhdGUoXHJcblx0XHRcdFx0XHQnUGFzdGUgeW91ciB0ZXh0IGluc2lkZSB0aGUgZm9sbG93aW5nIGJveDonXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci50cmFuc2xhdGUoJ0luc2VydCcpXHJcblx0XHRcdH0sIHRydWUpKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xyXG5cdFx0XHRcdHZhbCA9IChkb20uZmluZChjb250ZW50LCAnI3R4dCcpWzBdIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbHVlO1xyXG5cclxuXHRcdFx0XHRpZiAodmFsKSB7XHJcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydFRleHQodmFsKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAncGFzdGV0ZXh0JywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ1Bhc3RlIFRleHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJ1bGxldCBMaXN0XHJcblx0YnVsbGV0bGlzdDoge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcclxuXHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnaW5zZXJ0dW5vcmRlcmVkbGlzdCcpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdCdWxsZXQgbGlzdCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogT3JkZXJlZCBMaXN0XHJcblx0b3JkZXJlZGxpc3Q6IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Zml4RmlyZWZveExpc3RCdWcodGhpcyk7XHJcblx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ2luc2VydG9yZGVyZWRsaXN0Jyk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ051bWJlcmVkIGxpc3QnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEluZGVudFxyXG5cdGluZGVudDoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnQ6IGFueSwgZmlyc3RCbG9jazogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0Ly8gT25seSB3b3JrcyB3aXRoIGxpc3RzLCBmb3Igbm93XHJcblx0XHRcdHZhciByYW5nZSwgc3RhcnRQYXJlbnQsIGVuZFBhcmVudDtcclxuXHJcblx0XHRcdGlmIChkb20uaXMoZmlyc3RCbG9jaywgJ2xpJykpIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGRvbS5pcyhmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpKSB7XHJcblx0XHRcdFx0Ly8gaWYgdGhlIHdob2xlIGxpc3QgaXMgc2VsZWN0ZWQsIHRoZW4gdGhpcyBtdXN0IGJlXHJcblx0XHRcdFx0Ly8gaW52YWxpZGF0ZWQgYmVjYXVzZSB0aGUgYnJvd3NlciB3aWxsIHBsYWNlIGFcclxuXHRcdFx0XHQvLyA8YmxvY2txdW90ZT4gdGhlcmVcclxuXHRcdFx0XHRyYW5nZSA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdHN0YXJ0UGFyZW50ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRlbmRQYXJlbnQgPSByYW5nZS5lbmRDb250YWluZXIucGFyZW50Tm9kZTtcclxuXHJcblx0XHRcdFx0Ly8gVE9ETzogY291bGQgdXNlIG5vZGVUeXBlIGZvciB0aGlzP1xyXG5cdFx0XHRcdC8vIE1heWJlIGp1c3QgY2hlY2sgdGhlIGZpcnN0QmxvY2sgY29udGFpbnMgYm90aCB0aGUgc3RhcnRcclxuXHRcdFx0XHQvL2FuZCBlbmQgY29udGFpbmVyc1xyXG5cclxuXHRcdFx0XHQvLyBTZWxlY3QgdGhlIHRhZywgbm90IHRoZSB0ZXh0Tm9kZVxyXG5cdFx0XHRcdC8vICh0aGF0J3Mgd2h5IHRoZSBwYXJlbnROb2RlKVxyXG5cdFx0XHRcdGlmIChzdGFydFBhcmVudCAhPT1cclxuXHRcdFx0XHRcdHN0YXJ0UGFyZW50LnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgfHxcclxuXHRcdFx0XHRcdC8vIHdvcmsgYXJvdW5kIGEgYnVnIGluIEZGXHJcblx0XHRcdFx0XHQoZG9tLmlzKGVuZFBhcmVudCwgJ2xpJykgJiYgZW5kUGFyZW50ICE9PVxyXG5cdFx0XHRcdFx0XHRlbmRQYXJlbnQucGFyZW50Tm9kZS5sYXN0RWxlbWVudENoaWxkKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcyxcclxuXHRcdFx0XHRibG9jayA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHJcblx0XHRcdGVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0Ly8gQW4gaW5kZW50IHN5c3RlbSBpcyBxdWl0ZSBjb21wbGljYXRlZCBhcyB0aGVyZSBhcmUgbG9hZHNcclxuXHRcdFx0Ly8gb2YgY29tcGxpY2F0aW9ucyBhbmQgaXNzdWVzIGFyb3VuZCBob3cgdG8gaW5kZW50IHRleHRcclxuXHRcdFx0Ly8gQXMgZGVmYXVsdCwgbGV0J3MganVzdCBzdGF5IHdpdGggaW5kZW50aW5nIHRoZSBsaXN0cyxcclxuXHRcdFx0Ly8gYXQgbGVhc3QsIGZvciBub3cuXHJcblx0XHRcdGlmIChkb20uY2xvc2VzdChibG9jaywgJ3VsLG9sLG1lbnUnKSkge1xyXG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnaW5kZW50Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnQWRkIGluZGVudCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogT3V0ZGVudFxyXG5cdG91dGRlbnQ6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50czogYW55LCBmaXJzdEJsb2NrOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLmNsb3Nlc3QoZmlyc3RCbG9jaywgJ3VsLG9sLG1lbnUnKSA/IDAgOiAtMTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBibG9jayA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblx0XHRcdGlmIChkb20uY2xvc2VzdChibG9jaywgJ3VsLG9sLG1lbnUnKSkge1xyXG5cdFx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ291dGRlbnQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgb25lIGluZGVudCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRhYmxlXHJcblx0dGFibGU6IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXI6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzLFxyXG5cdFx0XHRcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3RhYmxlJywge1xyXG5cdFx0XHRcdHJvd3M6IGVkaXRvci50cmFuc2xhdGUoJ1Jvd3M6JyksXHJcblx0XHRcdFx0Y29sczogZWRpdG9yLnRyYW5zbGF0ZSgnQ29sczonKSxcclxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci50cmFuc2xhdGUoJ0luc2VydCcpXHJcblx0XHRcdH0sIHRydWUpKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xyXG5cdFx0XHRcdHZhciByb3dzID0gTnVtYmVyKChkb20uZmluZChjb250ZW50LCAnI3Jvd3MnKVswXSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KS52YWx1ZSksXHJcblx0XHRcdFx0XHRjb2xzID0gTnVtYmVyKChkb20uZmluZChjb250ZW50LCAnI2NvbHMnKVswXSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50KS52YWx1ZSksXHJcblx0XHRcdFx0XHRodG1sID0gJzx0YWJsZT4nO1xyXG5cclxuXHRcdFx0XHRpZiAocm93cyA+IDAgJiYgY29scyA+IDApIHtcclxuXHRcdFx0XHRcdGh0bWwgKz0gQXJyYXkocm93cyArIDEpLmpvaW4oXHJcblx0XHRcdFx0XHRcdCc8dHI+JyArXHJcblx0XHRcdFx0XHRcdEFycmF5KGNvbHMgKyAxKS5qb2luKFxyXG5cdFx0XHRcdFx0XHRcdCc8dGQ+PGJyIC8+PC90ZD4nXHJcblx0XHRcdFx0XHRcdCkgK1xyXG5cdFx0XHRcdFx0XHQnPC90cj4nXHJcblx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdGh0bWwgKz0gJzwvdGFibGU+JztcclxuXHJcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoaHRtbCk7XHJcblx0XHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydHRhYmxlJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIHRhYmxlJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSG9yaXpvbnRhbCBSdWxlXHJcblx0aG9yaXpvbnRhbHJ1bGU6IHtcclxuXHRcdGV4ZWM6ICdpbnNlcnRob3Jpem9udGFscnVsZScsXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgaG9yaXpvbnRhbCBydWxlJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29kZVxyXG5cdGNvZGU6IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcclxuXHRcdFx0XHQnPGNvZGU+JyxcclxuXHRcdFx0XHQnPGJyIC8+PC9jb2RlPidcclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnQ29kZSdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEltYWdlXHJcblx0aW1hZ2U6IHtcclxuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvcjogRW1sRWRpdG9yLCBjYWxsZXI6IEhUTUxFbGVtZW50LCBzZWxlY3RlZDogYW55LCBjYWxsYmFjazogKGlucHV0VmFsOiBzdHJpbmcsIHdpZHRoVmFsOiBzdHJpbmcsIGhlaWdodFZhbDogc3RyaW5nKSA9PiB2b2lkKSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdpbWFnZScsIHtcclxuXHRcdFx0XHR1cmw6IGVkaXRvci50cmFuc2xhdGUoJ1VSTDonKSxcclxuXHRcdFx0XHR3aWR0aDogZWRpdG9yLnRyYW5zbGF0ZSgnV2lkdGggKG9wdGlvbmFsKTonKSxcclxuXHRcdFx0XHRoZWlnaHQ6IGVkaXRvci50cmFuc2xhdGUoJ0hlaWdodCAob3B0aW9uYWwpOicpLFxyXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0JylcclxuXHRcdFx0fSwgdHJ1ZSkpO1xyXG5cclxuXHJcblx0XHRcdHZhciB1cmxJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjaW1hZ2UnKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuXHRcdFx0dXJsSW5wdXQudmFsdWUgPSBzZWxlY3RlZDtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xyXG5cdFx0XHRcdGlmICh1cmxJbnB1dC52YWx1ZSkge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soXHJcblx0XHRcdFx0XHRcdHVybElucHV0LnZhbHVlLFxyXG5cdFx0XHRcdFx0XHQoZG9tLmZpbmQoY29udGVudCwgJyN3aWR0aCcpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLFxyXG5cdFx0XHRcdFx0XHQoZG9tLmZpbmQoY29udGVudCwgJyNoZWlnaHQnKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0aW1hZ2UnLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmltYWdlLl9kcm9wRG93bihcclxuXHRcdFx0XHRlZGl0b3IsXHJcblx0XHRcdFx0Y2FsbGVyLFxyXG5cdFx0XHRcdCcnLFxyXG5cdFx0XHRcdGZ1bmN0aW9uICh1cmw6IHN0cmluZywgd2lkdGg/OiBzdHJpbmcsIGhlaWdodD86IHN0cmluZykge1xyXG5cdFx0XHRcdFx0dmFyIGF0dHJzID0gJyc7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHdpZHRoKSB7XHJcblx0XHRcdFx0XHRcdGF0dHJzICs9ICcgd2lkdGg9XCInICsgcGFyc2VJbnQod2lkdGgsIDEwKSArICdcIic7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGhlaWdodCkge1xyXG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIGhlaWdodD1cIicgKyBwYXJzZUludChoZWlnaHQsIDEwKSArICdcIic7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YXR0cnMgKz0gJyBzcmM9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCInO1xyXG5cclxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcclxuXHRcdFx0XHRcdFx0JzxpbWcnICsgYXR0cnMgKyAnIC8+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBpbWFnZSdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEUtbWFpbFxyXG5cdGVtYWlsOiB7XHJcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3I6IEVtbEVkaXRvciwgY2FsbGVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChlbWFpbDogc3RyaW5nLCBkZXM6IHN0cmluZykgPT4gdm9pZCkge1xyXG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZW1haWwnLCB7XHJcblx0XHRcdFx0bGFiZWw6IGVkaXRvci50cmFuc2xhdGUoJ0UtbWFpbDonKSxcclxuXHRcdFx0XHRkZXNjOiBlZGl0b3IudHJhbnNsYXRlKCdEZXNjcmlwdGlvbiAob3B0aW9uYWwpOicpLFxyXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0JylcclxuXHRcdFx0fSwgdHJ1ZSkpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0bGV0IGVtYWlsOiBzdHJpbmcgPSAoZG9tLmZpbmQoY29udGVudCwgJyNlbWFpbCcpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG5cclxuXHRcdFx0XHRpZiAoZW1haWwpIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKGVtYWlsLCAoZG9tLmZpbmQoY29udGVudCwgJyNkZXMnKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGVtYWlsJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XHJcblxyXG5cdFx0XHRkZWZhdWx0Q21kcy5lbWFpbC5fZHJvcERvd24oXHJcblx0XHRcdFx0ZWRpdG9yLFxyXG5cdFx0XHRcdGNhbGxlcixcclxuXHRcdFx0XHRmdW5jdGlvbiAoZW1haWw6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XHJcblx0XHRcdFx0XHRpZiAoIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpIHx8IHRleHQpIHtcclxuXHRcdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArXHJcblx0XHRcdFx0XHRcdFx0J21haWx0bzonICsgZXNjYXBlLmVudGl0aWVzKGVtYWlsKSArICdcIj4nICtcclxuXHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoKHRleHQgfHwgZW1haWwpKSArXHJcblx0XHRcdFx0XHRcdFx0JzwvYT4nXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2NyZWF0ZWxpbmsnLCAnbWFpbHRvOicgKyBlbWFpbCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1haWwnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBMaW5rXHJcblx0bGluazoge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yOiBFbWxFZGl0b3IsIGNhbGxlcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAobGluazogc3RyaW5nLCB2YWw6IHN0cmluZykgPT4gdm9pZCkge1xyXG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnbGluaycsIHtcclxuXHRcdFx0XHR1cmw6IGVkaXRvci50cmFuc2xhdGUoJ1VSTDonKSxcclxuXHRcdFx0XHRkZXNjOiBlZGl0b3IudHJhbnNsYXRlKCdEZXNjcmlwdGlvbiAob3B0aW9uYWwpOicpLFxyXG5cdFx0XHRcdGluczogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0JylcclxuXHRcdFx0fSwgdHJ1ZSkpO1xyXG5cclxuXHRcdFx0dmFyIGxpbmtJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjbGluaycpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblx0XHRcdHZhciBkZXNJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjZGVzJylbMF0gYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcblx0XHRcdGZ1bmN0aW9uIGluc2VydFVybChlOiBFdmVudCkge1xyXG5cdFx0XHRcdGlmIChsaW5rSW5wdXQudmFsdWUpIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKGxpbmtJbnB1dC52YWx1ZSwgZGVzSW5wdXQudmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBpbnNlcnRVcmwpO1xyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2tleXByZXNzJywgbnVsbCwgZnVuY3Rpb24gKGU6IEtleWJvYXJkRXZlbnQpIHtcclxuXHRcdFx0XHQvLyAxMyA9IGVudGVyIGtleVxyXG5cdFx0XHRcdGlmIChlLndoaWNoID09PSAxMyAmJiBsaW5rSW5wdXQudmFsdWUpIHtcclxuXHRcdFx0XHRcdGluc2VydFVybChlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRsaW5rJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XHJcblxyXG5cdFx0XHRkZWZhdWx0Q21kcy5saW5rLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKHVybDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcclxuXHRcdFx0XHRpZiAodGV4dCB8fCAhZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuc2VsZWN0ZWRIdG1sKCkpIHtcclxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcclxuXHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCI+JyArXHJcblx0XHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyh0ZXh0IHx8IHVybCkgK1xyXG5cdFx0XHRcdFx0XHQnPC9hPidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsIHVybCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgbGluaydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVubGlua1xyXG5cdHVubGluazoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5jbG9zZXN0KHRoaXMuQ3VycmVudE5vZGUoKSwgJ2EnKSA/IDAgOiAtMTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBhbmNob3IgPSBkb20uY2xvc2VzdCh0aGlzLkN1cnJlbnROb2RlKCksICdhJyk7XHJcblxyXG5cdFx0XHRpZiAoYW5jaG9yKSB7XHJcblx0XHRcdFx0d2hpbGUgKGFuY2hvci5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGFuY2hvci5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50LCBhbmNob3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLnJlbW92ZShhbmNob3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ1VubGluaydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBRdW90ZVxyXG5cdHF1b3RlOiB7XHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCwgaHRtbDogc3RyaW5nLCBhdXRob3I6IHN0cmluZykge1xyXG5cdFx0XHR2YXIgYmVmb3JlID0gJzxibG9ja3F1b3RlPicsXHJcblx0XHRcdFx0ZW5kID0gJzwvYmxvY2txdW90ZT4nO1xyXG5cclxuXHRcdFx0Ly8gaWYgdGhlcmUgaXMgSFRNTCBwYXNzZWQgc2V0IGVuZCB0byBudWxsIHNvIGFueSBzZWxlY3RlZFxyXG5cdFx0XHQvLyB0ZXh0IGlzIHJlcGxhY2VkXHJcblx0XHRcdGlmIChodG1sKSB7XHJcblx0XHRcdFx0YXV0aG9yID0gKGF1dGhvciA/ICc8Y2l0ZT4nICtcclxuXHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyhhdXRob3IpICtcclxuXHRcdFx0XHRcdCc8L2NpdGU+JyA6ICcnKTtcclxuXHRcdFx0XHRiZWZvcmUgPSBiZWZvcmUgKyBhdXRob3IgKyBodG1sICsgZW5kO1xyXG5cdFx0XHRcdGVuZCA9IG51bGw7XHJcblx0XHRcdFx0Ly8gaWYgbm90IGFkZCBhIG5ld2xpbmUgdG8gdGhlIGVuZCBvZiB0aGUgaW5zZXJ0ZWQgcXVvdGVcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmdldFJhbmdlSGVscGVyKCkuc2VsZWN0ZWRIdG1sKCkgPT09ICcnKSB7XHJcblx0XHRcdFx0ZW5kID0gJzxiciAvPicgKyBlbmQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoYmVmb3JlLCBlbmQpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBRdW90ZSdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEVtb3RpY29uc1xyXG5cdGVtb3RpY29uOiB7XHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdHZhciBjcmVhdGVDb250ZW50ID0gZnVuY3Rpb24gKGluY2x1ZGVNb3JlOiBib29sZWFuKSB7XHJcblx0XHRcdFx0dmFyIG1vcmVMaW5rLFxyXG5cdFx0XHRcdFx0b3B0cyA9IGVkaXRvci5lZGl0b3JPcHRpb25zLFxyXG5cdFx0XHRcdFx0ZW1vdGljb25zUm9vdCA9IG9wdHMuZW1vdGljb25zUm9vdCB8fCAnJyxcclxuXHRcdFx0XHRcdGVtb3RpY29uc0NvbXBhdCA9IG9wdHMuZW1vdGljb25zQ29tcGF0LFxyXG5cdFx0XHRcdFx0cmFuZ2VIZWxwZXIgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcclxuXHRcdFx0XHRcdHN0YXJ0U3BhY2UgPSBlbW90aWNvbnNDb21wYXQgJiZcclxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIuZ2V0T3V0ZXJUZXh0KHRydWUsIDEpICE9PSAnICcgPyAnICcgOiAnJyxcclxuXHRcdFx0XHRcdGVuZFNwYWNlID0gZW1vdGljb25zQ29tcGF0ICYmXHJcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dChmYWxzZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxyXG5cdFx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRcdGxpbmUgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHRcdFx0XHRwZXJMaW5lID0gMCxcclxuXHRcdFx0XHRcdGVtb3RpY29ucyA9IHV0aWxzLmV4dGVuZChcclxuXHRcdFx0XHRcdFx0e30sXHJcblx0XHRcdFx0XHRcdG9wdHMuZW1vdGljb25zLmRyb3Bkb3duLFxyXG5cdFx0XHRcdFx0XHRpbmNsdWRlTW9yZSA/IG9wdHMuZW1vdGljb25zLm1vcmUgOiB7fVxyXG5cdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGxpbmUpO1xyXG5cclxuXHRcdFx0XHRwZXJMaW5lID0gTWF0aC5zcXJ0KE9iamVjdC5rZXlzKGVtb3RpY29ucykubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdpbWcnLCBmdW5jdGlvbiAoZTogRXZlbnQpIHtcclxuXHRcdFx0XHRcdGVkaXRvci5pbnNlcnQoc3RhcnRTcGFjZSArIGRvbS5hdHRyKHRoaXMsICdhbHQnKSArIGVuZFNwYWNlLFxyXG5cdFx0XHRcdFx0XHRudWxsLCBmYWxzZSkuY2xvc2VEcm9wRG93bih0cnVlKTtcclxuXHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoY29kZSwgZW1vdGljb24pIHtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChsaW5lLCBkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRzcmM6IGVtb3RpY29uc1Jvb3QgKyAoZW1vdGljb24udXJsIHx8IGVtb3RpY29uKSxcclxuXHRcdFx0XHRcdFx0YWx0OiBjb2RlLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTogZW1vdGljb24udG9vbHRpcCB8fCBjb2RlXHJcblx0XHRcdFx0XHR9KSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGxpbmUuY2hpbGRyZW4ubGVuZ3RoID49IHBlckxpbmUpIHtcclxuXHRcdFx0XHRcdFx0bGluZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGxpbmUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRpZiAoIWluY2x1ZGVNb3JlICYmIG9wdHMuZW1vdGljb25zLm1vcmUpIHtcclxuXHRcdFx0XHRcdG1vcmVMaW5rID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2EnLCB7XHJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1tb3JlJ1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKG1vcmVMaW5rLFxyXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlZGl0b3IudHJhbnNsYXRlKCdNb3JlJykpKTtcclxuXHJcblx0XHRcdFx0XHRkb20ub24obW9yZUxpbmssICdjbGljaycsIG51bGwsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xyXG5cdFx0XHRcdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oXHJcblx0XHRcdFx0XHRcdFx0Y2FsbGVyLCAnbW9yZS1lbW90aWNvbnMnLCBjcmVhdGVDb250ZW50KHRydWUpXHJcblx0XHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbW9yZUxpbmspO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZW1vdGljb25zJywgY3JlYXRlQ29udGVudChmYWxzZSkpO1xyXG5cdFx0fSxcclxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uIChjYWxsZXI6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdGRlZmF1bHRDbWRzLmVtb3RpY29uLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1vdGljb24nXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBZb3VUdWJlXHJcblx0eW91dHViZToge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yOiBFbWxFZGl0b3IsIGNhbGxlcjogSFRNTEVsZW1lbnQsIGNhbGxiYWNrOiAobWF0Y2g6IGFueSwgdGltZTogbnVtYmVyKSA9PiB2b2lkKSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd5b3V0dWJlTWVudScsIHtcclxuXHRcdFx0XHRsYWJlbDogZWRpdG9yLnRyYW5zbGF0ZSgnVmlkZW8gVVJMOicpLFxyXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0JylcclxuXHRcdFx0fSwgdHJ1ZSkpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0dmFyIHZhbCA9IChkb20uZmluZChjb250ZW50LCAnI2xpbmsnKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcclxuXHRcdFx0XHR2YXIgaWRNYXRjaCA9IHZhbC5tYXRjaCgvKD86dj18dlxcL3xlbWJlZFxcL3x5b3V0dS5iZVxcLyk/KFthLXpBLVowLTlfLV17MTF9KS8pO1xyXG5cdFx0XHRcdHZhciB0aW1lTWF0Y2ggPSB2YWwubWF0Y2goL1smfD9dKD86c3Rhcik/dD0oKFxcZCtbaG1zXT8pezEsM30pLyk7XHJcblx0XHRcdFx0dmFyIHRpbWUgPSAwO1xyXG5cclxuXHRcdFx0XHRpZiAodGltZU1hdGNoKSB7XHJcblx0XHRcdFx0XHR1dGlscy5lYWNoKHRpbWVNYXRjaFsxXS5zcGxpdCgvW2htc10vKSwgZnVuY3Rpb24gKGksIHZhbCkge1xyXG5cdFx0XHRcdFx0XHRpZiAodmFsICE9PSAnJykge1xyXG5cdFx0XHRcdFx0XHRcdHRpbWUgPSAodGltZSAqIDYwKSArIE51bWJlcih2YWwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChpZE1hdGNoICYmIC9eW2EtekEtWjAtOV8tXXsxMX0kLy50ZXN0KGlkTWF0Y2hbMV0pKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjayhpZE1hdGNoWzFdLCB0aW1lKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChidG46IGFueSkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLnlvdXR1YmUuX2Ryb3BEb3duKGVkaXRvciwgYnRuLCBmdW5jdGlvbiAoaWQ6IGFueSwgdGltZTogYW55KSB7XHJcblx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKF90bXBsKCd5b3V0dWJlJywge1xyXG5cdFx0XHRcdFx0aWQ6IGlkLFxyXG5cdFx0XHRcdFx0dGltZTogdGltZVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFlvdVR1YmUgdmlkZW8nXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBEYXRlXHJcblx0ZGF0ZToge1xyXG5cdFx0X2RhdGU6IGZ1bmN0aW9uIChlZGl0b3I6IEVtbEVkaXRvcikge1xyXG5cdFx0XHRsZXQgbm93ID0gbmV3IERhdGUoKTtcclxuXHRcdFx0bGV0IHllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcclxuXHRcdFx0bGV0IG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxO1xyXG5cdFx0XHRsZXQgZGF5ID0gbm93LmdldERhdGUoKTtcclxuXHRcdFx0bGV0IHllYXJBc1N0cmluZyA9IHllYXIudG9TdHJpbmcoKTtcclxuXHRcdFx0bGV0IG1vbnRoQXNTdHJpbmcgPSBtb250aC50b1N0cmluZygpO1xyXG5cdFx0XHRsZXQgZGF5QXNTdHJpbmcgPSBkYXkudG9TdHJpbmcoKTtcclxuXHJcblx0XHRcdGlmIChtb250aCA8IDEwKSB7XHJcblx0XHRcdFx0bW9udGhBc1N0cmluZyA9ICcwJyArIG1vbnRoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZGF5IDwgMTApIHtcclxuXHRcdFx0XHRkYXlBc1N0cmluZyA9ICcwJyArIGRheTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGVkaXRvci5lZGl0b3JPcHRpb25zLmRhdGVGb3JtYXRcclxuXHRcdFx0XHQucmVwbGFjZSgveWVhci9pLCB5ZWFyQXNTdHJpbmcpXHJcblx0XHRcdFx0LnJlcGxhY2UoL21vbnRoL2ksIG1vbnRoQXNTdHJpbmcpXHJcblx0XHRcdFx0LnJlcGxhY2UoL2RheS9pLCBkYXlBc1N0cmluZyk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMuZGF0ZS5fZGF0ZSh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMuZGF0ZS5fZGF0ZSh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IGRhdGUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBUaW1lXHJcblx0dGltZToge1xyXG5cdFx0X3RpbWU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG5vdyA9IG5ldyBEYXRlKCksXHJcblx0XHRcdFx0aG91cnMgPSBub3cuZ2V0SG91cnMoKSxcclxuXHRcdFx0XHRtaW5zID0gbm93LmdldE1pbnV0ZXMoKSxcclxuXHRcdFx0XHRzZWNzID0gbm93LmdldFNlY29uZHMoKTtcclxuXHRcdFx0bGV0IGhvdXJzQXNTdHJpbmcgPSBob3Vycy50b1N0cmluZygpO1xyXG5cdFx0XHRsZXQgbWluc2hBc1N0cmluZyA9IG1pbnMudG9TdHJpbmcoKTtcclxuXHRcdFx0bGV0IHNlY3NBc1N0cmluZyA9IHNlY3MudG9TdHJpbmcoKTtcclxuXHJcblx0XHRcdGlmIChob3VycyA8IDEwKSB7XHJcblx0XHRcdFx0aG91cnNBc1N0cmluZyA9ICcwJyArIGhvdXJzLnRvU3RyaW5nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChtaW5zIDwgMTApIHtcclxuXHRcdFx0XHRtaW5zaEFzU3RyaW5nID0gJzAnICsgbWlucy50b1N0cmluZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VjcyA8IDEwKSB7XHJcblx0XHRcdFx0c2Vjc0FzU3RyaW5nID0gJzAnICsgc2Vjcy50b1N0cmluZygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gaG91cnNBc1N0cmluZyArICc6JyArIG1pbnNoQXNTdHJpbmcgKyAnOicgKyBzZWNzQXNTdHJpbmc7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcclxuXHRcdH0sXHJcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgY3VycmVudCB0aW1lJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEx0clxyXG5cdGx0cjoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzOiBhbnksIGZpcnN0QmxvY2s6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHJldHVybiBmaXJzdEJsb2NrICYmIGZpcnN0QmxvY2suc3R5bGUuZGlyZWN0aW9uID09PSAnbHRyJztcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzLFxyXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXHJcblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHJcblx0XHRcdGVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XHJcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XHJcblxyXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblxyXG5cdFx0XHRcdGlmICghbm9kZSB8fCBkb20uaXMobm9kZSwgJ2JvZHknKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRvZ2dsZVZhbHVlID0gZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJykgPT09ICdsdHInID8gJycgOiAnbHRyJztcclxuXHRcdFx0ZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJywgdG9nZ2xlVmFsdWUpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdMZWZ0LXRvLVJpZ2h0J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogUnRsXHJcblx0cnRsOiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudHM6IGFueSwgZmlyc3RCbG9jazogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0cmV0dXJuIGZpcnN0QmxvY2sgJiYgZmlyc3RCbG9jay5zdHlsZS5kaXJlY3Rpb24gPT09ICdydGwnO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMsXHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcclxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcclxuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgJ3AnKTtcclxuXHJcblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHJcblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdG9nZ2xlVmFsdWUgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcgPyAnJyA6ICdydGwnO1xyXG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ1JpZ2h0LXRvLUxlZnQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogUHJpbnRcclxuXHRwcmludDoge1xyXG5cdFx0ZXhlYzogJ3ByaW50JyxcclxuXHRcdHRvb2x0aXA6ICdQcmludCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IE1heGltaXplXHJcblx0bWF4aW1pemU6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1heGltaXplKCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLm1heGltaXplKCF0aGlzLm1heGltaXplKCkpO1xyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHR9LFxyXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLm1heGltaXplKCF0aGlzLm1heGltaXplKCkpO1xyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ01heGltaXplJyxcclxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtNJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogU291cmNlXHJcblx0c291cmNlOiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zb3VyY2VNb2RlKCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0fSxcclxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnVmlldyBzb3VyY2UnLFxyXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K1MnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyB0aGlzIGlzIGhlcmUgc28gdGhhdCBjb21tYW5kcyBhYm92ZSBjYW4gYmUgcmVtb3ZlZFxyXG5cdC8vIHdpdGhvdXQgaGF2aW5nIHRvIHJlbW92ZSB0aGUgLCBhZnRlciB0aGUgbGFzdCBvbmUuXHJcblx0Ly8gTmVlZGVkIGZvciBJRS5cclxuXHRpZ25vcmU6IHt9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0Q21kcztcclxuIiwiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcblxyXG4vKipcclxuICogQ2FjaGUgb2YgY2FtZWxDYXNlIENTUyBwcm9wZXJ0eSBuYW1lc1xyXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cclxuICovXHJcbmxldCBjc3NQcm9wZXJ0eU5hbWVDYWNoZTogeyBbczogc3RyaW5nXTogc3RyaW5nOyB9ID0ge307XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBlbGVtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRUxFTUVOVF9OT0RFOiBudW1iZXIgPSAxO1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgdGV4dCBub2Rlc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRFWFRfTk9ERTogbnVtYmVyID0gMztcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGNvbW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBDT01NRU5UX05PREU6IG51bWJlciA9IDg7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGRvY3VtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfTk9ERTogbnVtYmVyID0gOTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGRvY3VtZW50IGZyYWdtZW50c1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UX0ZSQUdNRU5UX05PREU6IG51bWJlciA9IDExO1xyXG5cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZTogYW55KTogbnVtYmVyIHtcclxuXHR2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG5cclxuXHRyZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzXHJcbiAqXHJcbiAqIFdpbGwgY3JlYXRlIGl0IGluIHRoZSBjdXJyZW50IGRvY3VtZW50IHVubGVzcyBjb250ZXh0XHJcbiAqIGlzIHNwZWNpZmllZC5cclxuICpcclxuICogQHBhcmFtIHshc3RyaW5nfSB0YWdcclxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgc3RyaW5nPn0gW2F0dHJpYnV0ZXNdXHJcbiAqIEBwYXJhbSB7IURvY3VtZW50fSBbY29udGV4dF1cclxuICogQHJldHVybnMgeyFIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZzogc3RyaW5nLCBhdHRyaWJ1dGVzPzogeyBbczogc3RyaW5nXTogc3RyaW5nOyB9LCBjb250ZXh0PzogRG9jdW1lbnQpOiBIVE1MRWxlbWVudCB7XHJcblx0bGV0IGh0bWxFbGVtZW50ID0gKGNvbnRleHQgfHwgZG9jdW1lbnQpLmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHRsZXQgYXR0cmlicyA9IGF0dHJpYnV0ZXM7XHJcblxyXG5cdHV0aWxzLmVhY2goYXR0cmlicyB8fCB7fSwgZnVuY3Rpb24gKGtleToga2V5b2YgSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcclxuXHRcdGlmIChrZXkgPT0gJ3N0eWxlJykge1xyXG5cdFx0XHRodG1sRWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gdmFsdWUgYXMgc3RyaW5nO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoa2V5IGluIGh0bWxFbGVtZW50KSB7XHJcblx0XHRcdC8vQHRzLWV4cGVjdC1lcnJvclxyXG5cdFx0XHRodG1sRWxlbWVudFtrZXldID0gdmFsdWU7XHJcblxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGh0bWxFbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIGh0bWxFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiBwYXJlbnRzIHRoYXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3JcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEByZXR1cm5zIHtBcnJheTxIVE1MRWxlbWVudD59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyZW50cyhub2RlOiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IEFycmF5PEhUTUxFbGVtZW50PiB7XHJcblx0dmFyIHBhcmVudHMgPSBbXSBhcyBBcnJheTxIVE1MRWxlbWVudD47XHJcblx0dmFyIHBhcmVudCA9IG5vZGU7XHJcblxyXG5cdHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpXHJcblx0XHQmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUudG9TdHJpbmcoKSkpIHtcclxuXHRcdGlmICghc2VsZWN0b3IgfHwgaXMocGFyZW50LCBzZWxlY3RvcikpIHtcclxuXHRcdFx0cGFyZW50cy5wdXNoKHBhcmVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcGFyZW50cztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGZpcnN0IHBhcmVudCBub2RlIHRoYXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3JcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyZW50KG5vZGU6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG5cdHZhciBwYXJlbnQgPSBub2RlO1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KVxyXG5cdFx0JiYgIS8oOXwxMSkvLnRlc3QocGFyZW50Lm5vZGVUeXBlLnRvU3RyaW5nKCkpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHJldHVybiBwYXJlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIHRoZSBwYXNzZWQgbm9kZSBhbmQgYWxsIHBhcmVudHMgYW5kXHJcbiAqIHJldHVybnMgdGhlIGZpcnN0IG1hdGNoaW5nIG5vZGUgaWYgYW55LlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdChub2RlOiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuXHRpZiAoIW5vZGUpIHtcclxuXHRcdHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cdGxldCByZXRFbGVtZW50ID0gaXMobm9kZSwgc2VsZWN0b3IpID8gbm9kZSA6IHBhcmVudChub2RlLCBzZWxlY3Rvcik7XHJcblx0cmV0dXJuIHJldEVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIERPTVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShub2RlOiBOb2RlKTogdm9pZCB7XHJcblx0aWYgKG5vZGUucGFyZW50Tm9kZSkge1xyXG5cdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFwcGVuZHMgY2hpbGQgdG8gcGFyZW50IG5vZGVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7Tm9kZSB8IEhUTUxFbGVtZW50IHwgc3RyaW5nIHwgbnVsbCB9IGNoaWxkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHwgVGV4dCkge1xyXG5cdG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgYW55IGNoaWxkIG5vZGVzIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50IHwgRG9jdW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Tm9kZUxpc3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZChub2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogTm9kZUxpc3Qge1xyXG5cdHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogRm9yIG9uKCkgYW5kIG9mZigpIGlmIHRvIGFkZC9yZW1vdmUgdGhlIGV2ZW50XHJcbiAqIHRvIHRoZSBjYXB0dXJlIHBoYXNlXHJcbiAqXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGxldCBFVkVOVF9DQVBUVVJFOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcclxuICogdG8gdGhlIGJ1YmJsZSBwaGFzZVxyXG4gKlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBsZXQgRVZFTlRfQlVCQkxFOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEV2ZW50cyBzaG91bGQgYmUgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudHMuXHJcbiAqXHJcbiAqIElmIHNlbGVjdG9yIGlzIHNwZWNpZmllZCB0aGUgaGFuZGxlciB3aWxsIG9ubHkgYmVcclxuICogY2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRhcmdldCBtYXRjaGVzIHRoZSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHshTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbiguLi5hbnkpfVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9mZigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb24obm9kZTogKFdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzKSB8IERvY3VtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50czogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBmbjogYW55LCBjYXB0dXJlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRoYW5kbGVyID0gZm5bJ19lbWwtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdIHx8IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHRcdFx0d2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgIT09IG5vZGUpIHtcclxuXHRcdFx0XHRcdGlmIChpcyh0YXJnZXQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRcdFx0XHRmbi5jYWxsKHRhcmdldCwgZSk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRmblsnX2VtbC1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl0gPSBoYW5kbGVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGFuZGxlciA9IGZuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSB8fCBmYWxzZSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50cy5cclxuICpcclxuICogQHBhcmFtIHshTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBmblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9uKClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiBvZmYobm9kZTogTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93LCBldmVudHM6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZywgZm46IChhcmcwOiBvYmplY3QpID0+IGFueSwgY2FwdHVyZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHZhciBoYW5kbGVyO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcclxuXHRcdFx0bGV0IGtleSA9ICdfZW1sLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yO1xyXG5cdFx0XHRoYW5kbGVyID0gZm5ba2V5IGFzIGtleW9mIHR5cGVvZiBmbl07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoYW5kbGVyID0gZm47XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlIHx8IGZhbHNlKTtcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIG9ubHkgYXR0ciBwYXJhbSBpcyBzcGVjaWZpZWQgaXQgd2lsbCBnZXRcclxuICogdGhlIHZhbHVlIG9mIHRoZSBhdHRyIHBhcmFtLlxyXG4gKlxyXG4gKiBJZiB2YWx1ZSBpcyBzcGVjaWZpZWQgYnV0IG51bGwgdGhlIGF0dHJpYnV0ZVxyXG4gKiB3aWxsIGJlIHJlbW92ZWQgb3RoZXJ3aXNlIHRoZSBhdHRyIHZhbHVlIHdpbGxcclxuICogYmUgc2V0IHRvIHRoZSBwYXNzZWQgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKiBAcGFyYW0gez9zdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybiB7c3RyaW5nIHwgdW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dHIobm9kZTogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZywgdmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0cmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG5cdH1cclxuXHJcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcSwgbm8tZXEtbnVsbFxyXG5cdGlmICghdmFsdWUpIHtcclxuXHRcdHJlbW92ZUF0dHIobm9kZSwgYXR0cik7XHJcblx0fSBlbHNlIHtcclxuXHRcdG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHIobm9kZTogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZyk6IHZvaWQge1xyXG5cdG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gbm9uZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGUobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gZGVmYXVsdFxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3cobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGFuIGVsZW1lbnRzIHZpc2liaWxpdHlcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRpZiAoaXNWaXNpYmxlKG5vZGUpKSB7XHJcblx0XHRoaWRlKG5vZGUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzaG93KG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgYSBjb21wdXRlZCBDU1MgdmFsdWVzIG9yIHNldHMgYW4gaW5saW5lIENTUyB2YWx1ZVxyXG4gKlxyXG4gKiBSdWxlcyBzaG91bGQgYmUgaW4gY2FtZWxDYXNlIGZvcm1hdCBhbmQgbm90XHJcbiAqIGh5cGhlbmF0ZWQgbGlrZSBDU1MgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHthbnl9IG5vZGVcclxuICogQHBhcmFtIHthbnl9IHJ1bGVcclxuICogQHBhcmFtIHthbnl9IFt2YWx1ZV1cclxuICogQHJldHVybiB7c3RyaW5nIHwgbnVsbH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjc3Mobm9kZTogYW55LCBydWxlOiBhbnksIHZhbHVlPzogYW55KTogc3RyaW5nIHwgbnVsbCB7XHJcblx0bGV0IHJldFZhbCA9IG51bGw7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcocnVsZSkpIHtcclxuXHRcdFx0cmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgPyBnZXRDb21wdXRlZFN0eWxlKG5vZGUpW3J1bGVdIDogbnVsbDtcclxuXHRcdH1cclxuXHRcdHV0aWxzLmVhY2gocnVsZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0Y3NzKG5vZGUsIGtleSwgdmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIGlzTmFOIHJldHVybnMgZmFsc2UgZm9yIG51bGwsIGZhbHNlIGFuZCBlbXB0eSBzdHJpbmdzXHJcblx0XHQvLyBzbyBuZWVkIHRvIGNoZWNrIGl0J3MgdHJ1dGh5IG9yIDBcclxuXHRcdHZhciBpc051bWVyaWMgPSAodmFsdWUgfHwgdmFsdWUgPT09IDApICYmICFpc05hTih2YWx1ZSk7XHJcblx0XHRub2RlLnN0eWxlW3J1bGVdID0gaXNOdW1lcmljID8gdmFsdWUudG9TdHJpbmcoKSArICdweCcgOiB2YWx1ZTtcclxuXHR9XHJcblx0cmV0dXJuIHJldFZhbDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGRhdGEgYXR0cmlidXRlcyBvbiBhIG5vZGVcclxuICpcclxuICogVW5saWtlIHRoZSBqUXVlcnkgdmVyc2lvbiB0aGlzIG9ubHkgc3RvcmVzIGRhdGFcclxuICogaW4gdGhlIERPTSBhdHRyaWJ1dGVzIHdoaWNoIG1lYW5zIG9ubHkgc3RyaW5nc1xyXG4gKiBjYW4gYmUgc3RvcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGF0YShub2RlOiBhbnksIGtleT86IGFueSwgdmFsdWU/OiBhbnkpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG5cdHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcclxuXHR2YXIgZGF0YTogYW55ID0ge307XHJcblxyXG5cdGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHV0aWxzLmVhY2gobm9kZS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoXywgYXR0cikge1xyXG5cdFx0XHRcdGlmICgvXmRhdGEtL2kudGVzdChhdHRyLm5hbWUpKSB7XHJcblx0XHRcdFx0XHRsZXQgaWR4ID0gYXR0ci5uYW1lLnN1YnN0cig1KSBhcyBrZXlvZiB0eXBlb2YgZGF0YTtcclxuXHRcdFx0XHRcdGRhdGFbaWR4XSA9IGF0dHIudmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAyKSB7XHJcblx0XHRcdHJldHVybiBhdHRyKG5vZGUsICdkYXRhLScgKyBrZXkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF0dHIobm9kZSwgJ2RhdGEtJyArIGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIG5vZGUgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50IHwgQ2hpbGROb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpcyhub2RlOiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdHZhciByZXN1bHQgPSBmYWxzZTtcclxuXHJcblx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXN1bHQgPSAobm9kZS5tYXRjaGVzKS5jYWxsKG5vZGUsIHNlbGVjdG9yKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIG5vZGUgY29udGFpbnMgY2hpbGQgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gKlxyXG4gKiBUaGlzIGRpZmZlcnMgZnJvbSB0aGUgRE9NIGNvbnRhaW5zKCkgbWV0aG9kIGluIHRoYXRcclxuICogaWYgbm9kZSBhbmQgY2hpbGQgYXJlIGVxdWFsIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMobm9kZTogTm9kZSwgY2hpbGQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0cmV0dXJuIG5vZGUgIT09IGNoaWxkICYmIG5vZGUuY29udGFpbnMgJiYgbm9kZS5jb250YWlucyhjaGlsZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMgez9IVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0VsZW1lbnRTaWJsaW5nKG5vZGU6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcj86IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0dmFyIHByZXYgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdGlmIChzZWxlY3RvciAmJiBwcmV2KSB7XHJcblx0XHRyZXR1cm4gaXMocHJldiwgc2VsZWN0b3IpID8gcHJldiA6IG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcHJldjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHshTm9kZX0gcmVmTm9kZVxyXG4gKiBAcmV0dXJucyB7Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRCZWZvcmUobm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50LCByZWZOb2RlOiBFbGVtZW50KTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcclxuXHRsZXQgcmV0VmFsID0gcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKTtcclxuXHRyZXR1cm4gcmV0VmFsO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybnMgeyFBcnJheS48c3RyaW5nPn1cclxuICovXHJcbmZ1bmN0aW9uIGNsYXNzZXMobm9kZTogSFRNTEVsZW1lbnQpOiBzdHJpbmdbXSB7XHJcblx0Y29uc3QgcmV0VmFsdWUgPSBub2RlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKTtcclxuXHRyZXR1cm4gcmV0VmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKG5vZGU6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdHJldHVybiBpcyhub2RlLCAnLicgKyBjbGFzc05hbWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKG5vZGU6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG5cdHZhciBjbGFzc0xpc3QgPSBjbGFzc2VzKG5vZGUpO1xyXG5cclxuXHRpZiAoY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcclxuXHRcdGNsYXNzTGlzdC5wdXNoKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHRub2RlLmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKCcgJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mobm9kZTogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcblx0dmFyIGNsYXNzTGlzdCA9IGNsYXNzZXMobm9kZSk7XHJcblxyXG5cdHV0aWxzLmFycmF5UmVtb3ZlKGNsYXNzTGlzdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhIGNsYXNzIG9uIG5vZGUuXHJcbiAqXHJcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgdHJ1dGh5IGl0IHdpbGwgYWRkXHJcbiAqIHRoZSBjbGFzcy5cclxuICpcclxuICogSWYgc3RhdGUgaXMgc3BlY2lmaWVkIGFuZCBpcyBmYWxzZXkgaXQgd2lsbCByZW1vdmVcclxuICogdGhlIGNsYXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICogQHBhcmFtIHtib29sZWFufSBbc3RhdGVdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xhc3Mobm9kZTogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBzdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRzdGF0ZSA9IHV0aWxzLmlzVW5kZWZpbmVkKHN0YXRlKSA/ICFoYXNDbGFzcyhub2RlLCBjbGFzc05hbWUpIDogc3RhdGU7XHJcblxyXG5cdGlmIChzdGF0ZSkge1xyXG5cdFx0YWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIHdpZHRoIG9mIHRoZSBwYXNzZWQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgobm9kZTogSFRNTEVsZW1lbnQsIHZhbHVlPzogbnVtYmVyIHwgc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuXHRpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHR2YXIgY3MgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdMZWZ0KSArIHRvRmxvYXQoY3MucGFkZGluZ1JpZ2h0KTtcclxuXHRcdHZhciBib3JkZXIgPSB0b0Zsb2F0KGNzLmJvcmRlckxlZnRXaWR0aCkgKyB0b0Zsb2F0KGNzLmJvcmRlclJpZ2h0V2lkdGgpO1xyXG5cclxuXHRcdHJldHVybiBub2RlLm9mZnNldFdpZHRoIC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnd2lkdGgnLCB2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGhlaWdodCBvZiB0aGUgcGFzc2VkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChub2RlOiBIVE1MRWxlbWVudCwgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ1RvcCkgKyB0b0Zsb2F0KGNzLnBhZGRpbmdCb3R0b20pO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyVG9wV2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJCb3R0b21XaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0SGVpZ2h0IC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnaGVpZ2h0JywgdmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZ2dlcnMgYSBjdXN0b20gZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kXHJcbiAqIHNldHMgdGhlIGRldGFpbCBwcm9wZXJ0eSB0byB0aGUgZGF0YSBvYmplY3QgcGFzc2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXIobm9kZTogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XHJcblx0dmFyIGV2ZW50O1xyXG5cclxuXHRpZiAodXRpbHMuaXNGdW5jdGlvbih3aW5kb3cuQ3VzdG9tRXZlbnQpKSB7XHJcblx0XHRldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcclxuXHRcdFx0ZGV0YWlsOiBkYXRhXHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZXZlbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblx0XHRldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Zpc2libGUobm9kZTogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRyZXR1cm4gISFub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBDU1MgcHJvcGVydHkgbmFtZXMgaW50byBjYW1lbCBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0cmV0dXJuIHN0clxyXG5cdFx0LnJlcGxhY2UoL14tbXMtLywgJ21zLScpXHJcblx0XHQucmVwbGFjZSgvLShcXHcpL2csIGZ1bmN0aW9uIChtYXRjaCwgY2hhcikge1xyXG5cdFx0XHRyZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTG9vcCBhbGwgY2hpbGQgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlXHJcbiAqXHJcbiAqIFRoZSBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IDEgcGFyYW1ldGVyIGJlaW5nIHRoZSBub2RlLlxyXG4gKiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGUgbG9vcCB3aWxsIGJlIGV4aXRlZC5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtICB7ZnVuY3Rpb259IGZ1bmMgICAgICAgICAgIENhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aXRoIGV2ZXJ5XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBub2RlIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gaW5uZXJtb3N0Rmlyc3QgIElmIHRoZSBpbm5lcm1vc3Qgbm9kZSBzaG91bGQgYmUgcGFzc2VkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgZnVuY3Rpb24gYmVmb3JlIGl0J3MgcGFyZW50cy5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gc2libGluZ3NPbmx5ICAgIElmIHRvIG9ubHkgdHJhdmVyc2UgdGhlIG5vZGVzIHNpYmxpbmdzXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXZlcnNlPWZhbHNlXSBJZiB0byB0cmF2ZXJzZSB0aGUgbm9kZXMgaW4gcmV2ZXJzZVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGU6IGFueSwgZnVuYzogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBhbnksIGlubmVybW9zdEZpcnN0PzogYm9vbGVhbiwgc2libGluZ3NPbmx5PzogYm9vbGVhbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcblx0bm9kZSA9IHJldmVyc2UgPyBub2RlLmxhc3RDaGlsZCA6IG5vZGUuZmlyc3RDaGlsZDtcclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdHZhciBuZXh0ID0gcmV2ZXJzZSA/IG5vZGUucHJldmlvdXNTaWJsaW5nIDogbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRpZiAoXHJcblx0XHRcdCghaW5uZXJtb3N0Rmlyc3QgJiYgZnVuYyhub2RlKSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdCghc2libGluZ3NPbmx5ICYmIHRyYXZlcnNlKFxyXG5cdFx0XHRcdG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHJldmVyc2VcclxuXHRcdFx0KSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdChpbm5lcm1vc3RGaXJzdCAmJiBmdW5jKG5vZGUpID09PSBmYWxzZSlcclxuXHRcdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpa2UgdHJhdmVyc2UgYnV0IGxvb3BzIGluIHJldmVyc2VcclxuICogQHNlZSB0cmF2ZXJzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJUcmF2ZXJzZShub2RlOiBhbnksIGZ1bmM6IChub2RlOiBOb2RlKSA9PiBib29sZWFuLCBpbm5lcm1vc3RGaXJzdD86IGJvb2xlYW4sIHNpYmxpbmdzT25seT86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBIVE1MIGludG8gYSBkb2N1bWVudCBmcmFnbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG4gKiBAcGFyYW0ge0RvY3VtZW50fSBbY29udGV4dF1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWw6IHN0cmluZywgY29udGV4dD86IERvY3VtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7XHJcblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblxyXG5cdHZhciByZXQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHR2YXIgdG1wID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGNvbnRleHQpO1xyXG5cclxuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcblxyXG5cdHdoaWxlICh0bXAuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCkge1xyXG5cdFx0YXBwZW5kQ2hpbGQocmV0LCB0bXAuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmV0O1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGFueSBzdHlsaW5nLlxyXG4gKlxyXG4gKiBJdCBoYXMgc3R5bGluZyBpZiBpdCBpcyBub3QgYSBwbGFpbiA8ZGl2PiBvciA8cD4gb3JcclxuICogaWYgaXQgaGFzIGEgY2xhc3MsIHN0eWxlIGF0dHJpYnV0ZSBvciBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgMS40LjRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsaW5nKG5vZGU6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0cmV0dXJuIG5vZGUgJiYgKCFpcyhub2RlLCAncCxkaXYnKSB8fCBub2RlLmNsYXNzTmFtZT8ubGVuZ3RoID4gMCB8fFxyXG5cdFx0KGF0dHIobm9kZSwgJ3N0eWxlJyk/Lmxlbmd0aCA+IDApIHx8IHV0aWxzLmlzU3RyaW5nKGRhdGEobm9kZSkpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIGVsZW1lbnQgZnJvbSBvbmUgdHlwZSB0byBhbm90aGVyLlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSBpdCBjYW4gY29udmVydCB0aGUgZWxlbWVudCA8Yj4gdG8gPHN0cm9uZz5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgIHRvVGFnTmFtZVxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHRvVGFnTmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG5cdHZhciBuZXdFbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0b1RhZ05hbWUsIHt9LCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpO1xyXG5cclxuXHR1dGlscy5lYWNoKGVsZW1lbnQuYXR0cmlidXRlcywgZnVuY3Rpb24gKF8sIGF0dHJpYnV0ZSkge1xyXG5cdFx0Ly8gU29tZSBicm93c2VycyBwYXJzZSBpbnZhbGlkIGF0dHJpYnV0ZXMgbmFtZXMgbGlrZVxyXG5cdFx0Ly8gJ3NpemVcIjInIHdoaWNoIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIHNldCwganVzdFxyXG5cdFx0Ly8gaWdub3JlIHRoZXNlLlxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YXR0cihuZXdFbGVtZW50LCBhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7IC8qIGVtcHR5ICovIH1cclxuXHR9KTtcclxuXHJcblxyXG5cdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpIHtcclxuXHRcdGFwcGVuZENoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRlbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQpO1xyXG5cclxuXHRyZXR1cm4gbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgYmxvY2sgbGV2ZWwgZWxlbWVudHMgc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgdmFyIGJsb2NrTGV2ZWxMaXN0OiBzdHJpbmcgPSAnfGJvZHl8aHJ8cHxkaXZ8aDF8aDJ8aDN8aDR8aDV8aDZ8YWRkcmVzc3xwcmV8JyArXHJcblx0J2Zvcm18dGFibGV8dGJvZHl8dGhlYWR8dGZvb3R8dGh8dHJ8dGR8bGl8b2x8dWx8YmxvY2txdW90ZXxjZW50ZXJ8JyArXHJcblx0J2RldGFpbHN8c2VjdGlvbnxhcnRpY2xlfGFzaWRlfG5hdnxtYWlufGhlYWRlcnxoZ3JvdXB8Zm9vdGVyfGZpZWxkc2V0fCcgK1xyXG5cdCdkbHxkdHxkZHxmaWd1cmV8ZmlnY2FwdGlvbnwnO1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBkbyBub3QgYWxsb3cgY2hpbGRyZW4gc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2FuSGF2ZUNoaWxkcmVuKG5vZGU6IEVsZW1lbnQgfCBEb2N1bWVudCB8IERvY3VtZW50RnJhZ21lbnQgfCBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG5cdC8vIDEgID0gRWxlbWVudFxyXG5cdC8vIDkgID0gRG9jdW1lbnRcclxuXHQvLyAxMSA9IERvY3VtZW50IEZyYWdtZW50XHJcblx0aWYgKCEvMTE/fDkvLnRlc3Qobm9kZS5ub2RlVHlwZS50b1N0cmluZygpKSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8gTGlzdCBvZiBlbXB0eSBIVE1MIHRhZ3Mgc2VwYXJhdGVkIGJ5IGJhciAofCkgY2hhcmFjdGVyLlxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvaW5kZXgvZWxlbWVudHMuaHRtbFxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xyXG5cdHJldHVybiAoJ3xpZnJhbWV8YXJlYXxiYXNlfGJhc2Vmb250fGJyfGNvbHxmcmFtZXxocnxpbWd8aW5wdXR8d2JyJyArXHJcblx0XHQnfGlzaW5kZXh8bGlua3xtZXRhfHBhcmFtfGNvbW1hbmR8ZW1iZWR8a2V5Z2VufHNvdXJjZXx0cmFja3wnICtcclxuXHRcdCdvYmplY3R8JykuaW5kZXhPZignfCcgKyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnfCcpIDwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGlzIGlubGluZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgYW55fSBlbG1cclxuICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZUNvZGVBc0Jsb2NrPWZhbHNlXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5saW5lKGVsbTogSFRNTEVsZW1lbnQgfCBhbnksIGluY2x1ZGVDb2RlQXNCbG9jazogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcblx0dmFyIHRhZ05hbWUsXHJcblx0XHRub2RlVHlwZSA9IChlbG0gfHwge30pLm5vZGVUeXBlIHx8IFRFWFRfTk9ERTtcclxuXHJcblx0aWYgKG5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybiBub2RlVHlwZSA9PT0gVEVYVF9OT0RFO1xyXG5cdH1cclxuXHJcblx0dGFnTmFtZSA9IGVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdGlmICh0YWdOYW1lID09PSAnY29kZScpIHtcclxuXHRcdHJldHVybiAhaW5jbHVkZUNvZGVBc0Jsb2NrO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGJsb2NrTGV2ZWxMaXN0LmluZGV4T2YoJ3wnICsgdGFnTmFtZSArICd8JykgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0aGUgQ1NTIGZyb20gMSBub2RlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIE9ubHkgY29waWVzIENTUyBkZWZpbmVkIG9uIHRoZSBlbGVtZW50IGUuZy4gc3R5bGUgYXR0ci5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZnJvbVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b1xyXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4xLjBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q1NTKGZyb206IEhUTUxFbGVtZW50LCB0bzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRpZiAodG8uc3R5bGUgJiYgZnJvbS5zdHlsZSkge1xyXG5cdFx0dG8uc3R5bGUuY3NzVGV4dCA9IGZyb20uc3R5bGUuY3NzVGV4dCArIHRvLnN0eWxlLmNzc1RleHQ7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgRE9NIG5vZGUgaXMgZW1wdHlcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkobm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50KTogYm9vbGVhbiB7XHJcblx0bGV0IGxhc3RDaGlsZCA9IG5vZGUubGFzdENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG5cdGlmIChsYXN0Q2hpbGQgJiYgaXNFbXB0eShsYXN0Q2hpbGQpKSB7XHJcblx0XHRyZW1vdmUobGFzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzID8gIW5vZGUubm9kZVZhbHVlIDpcclxuXHRcdChjYW5IYXZlQ2hpbGRyZW4obm9kZSkgJiYgIW5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpO1xyXG59XHJcblxyXG4vKipcclxuICogRml4ZXMgYmxvY2sgbGV2ZWwgZWxlbWVudHMgaW5zaWRlIGluIGlubGluZSBlbGVtZW50cy5cclxuICpcclxuICogQWxzbyBmaXhlcyBpbnZhbGlkIGxpc3QgbmVzdGluZyBieSBwbGFjaW5nIG5lc3RlZCBsaXN0c1xyXG4gKiBpbnNpZGUgdGhlIHByZXZpb3VzIGxpIHRhZyBvciB3cmFwcGluZyB0aGVtIGluIGFuIGxpIHRhZy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeE5lc3Rpbmcobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0bGV0IGxpc3QgPSAndWwsb2wnLFxyXG5cdFx0XHRpc0Jsb2NrID0gIWlzSW5saW5lKG5vZGUsIHRydWUpICYmIG5vZGUubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSxcclxuXHRcdFx0cGFyZW50ID0gbm9kZS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdC8vIEFueSBibG9ja2xldmVsIGVsZW1lbnQgaW5zaWRlIGFuIGlubGluZSBlbGVtZW50IG5lZWRzIGZpeGluZy5cclxuXHRcdC8vIEFsc28gPHA+IHRhZ3MgdGhhdCBjb250YWluIGJsb2NrcyBzaG91bGQgYmUgZml4ZWRcclxuXHRcdGlmIChpc0Jsb2NrICYmIChpc0lubGluZShwYXJlbnQsIHRydWUpIHx8IHBhcmVudC50YWdOYW1lID09PSAnUCcpKSB7XHJcblx0XHRcdC8vIEZpbmQgdGhlIGxhc3QgaW5saW5lIHBhcmVudCBub2RlXHJcblx0XHRcdGxldCBsYXN0SW5saW5lUGFyZW50ID0gbm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRcdHdoaWxlIChpc0lubGluZShsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQsIHRydWUpIHx8XHJcblx0XHRcdFx0KGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkudGFnTmFtZSA9PT0gJ1AnKSB7XHJcblx0XHRcdFx0bGFzdElubGluZVBhcmVudCA9IGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGJlZm9yZSA9IGV4dHJhY3RDb250ZW50cyhsYXN0SW5saW5lUGFyZW50LCBub2RlKTtcclxuXHRcdFx0bGV0IG1pZGRsZSA9IG5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0XHQvLyBDbG9uZSBpbmxpbmUgc3R5bGluZyBhbmQgYXBwbHkgaXQgdG8gdGhlIGJsb2NrcyBjaGlsZHJlblxyXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdFx0XHRcdGxldCBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRcdHdoaWxlICgobWlkZGxlLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpKSB7XHJcblx0XHRcdFx0XHRcdGFwcGVuZENoaWxkKGNsb25lLCAobWlkZGxlLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhcHBlbmRDaGlsZChtaWRkbGUsIGNsb25lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGluc2VydEJlZm9yZShtaWRkbGUsIGxhc3RJbmxpbmVQYXJlbnQpO1xyXG5cdFx0XHRpZiAoIWlzRW1wdHkoYmVmb3JlKSkge1xyXG5cdFx0XHRcdGluc2VydEJlZm9yZShiZWZvcmUsIG1pZGRsZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGlzRW1wdHkobGFzdElubGluZVBhcmVudCkpIHtcclxuXHRcdFx0XHRyZW1vdmUobGFzdElubGluZVBhcmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBGaXggaW52YWxpZCBuZXN0ZWQgbGlzdHMgd2hpY2ggc2hvdWxkIGJlIHdyYXBwZWQgaW4gYW4gbGkgdGFnXHJcblx0XHRsZXQgbm9kZVBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRpZiAoaXNCbG9jayAmJiBpcyhub2RlLCBsaXN0KSAmJiBpcyhub2RlUGFyZW50Tm9kZSwgbGlzdCkpIHtcclxuXHRcdFx0dmFyIGxpID0gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlLCAnbGknKTtcclxuXHJcblx0XHRcdGlmICghbGkpIHtcclxuXHRcdFx0XHRsaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGxpLCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YXBwZW5kQ2hpbGQobGksIG5vZGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgdGhlIGNvbW1vbiBwYXJlbnQgb2YgdHdvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMVxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTJcclxuICogQHJldHVybiB7P0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21tb25BbmNlc3Rvcihub2RlMTogSFRNTEVsZW1lbnQsIG5vZGUyOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0d2hpbGUgKChub2RlMSA9IG5vZGUxLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpKSB7XHJcblx0XHRpZiAoY29udGFpbnMobm9kZTEsIG5vZGUyKSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZTE7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/Tm9kZX1cclxuICogQHBhcmFtIHtib29sZWFufSBbcHJldmlvdXM9ZmFsc2VdXHJcbiAqIEByZXR1cm5zIHs/Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaWJsaW5nKG5vZGU/OiBIVE1MRWxlbWVudCwgcHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0aWYgKCFub2RlKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGxldCBzaWJsaW5nID0gKHByZXZpb3VzID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nKSB8fCBnZXRTaWJsaW5nKG5vZGUucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCwgcHJldmlvdXMpO1xyXG5cdHJldHVybiBzaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB1bnVzZWQgd2hpdGVzcGFjZSBmcm9tIHRoZSByb290IGFuZCBhbGwgaXQncyBjaGlsZHJlbi5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IHJvb3RcclxuICogQHNpbmNlIDEuNC4zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlV2hpdGVTcGFjZShyb290OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdHZhciBub2RlVmFsdWUsIG5vZGVUeXBlLCBuZXh0LCBwcmV2aW91cywgcHJldmlvdXNTaWJsaW5nLFxyXG5cdFx0bmV4dE5vZGUsIHRyaW1TdGFydCxcclxuXHRcdGNzc1doaXRlU3BhY2UgPSBjc3Mocm9vdCwgJ3doaXRlU3BhY2UnKSxcclxuXHRcdC8vIFByZXNlcnZlIG5ld2xpbmVzIGlmIGlzIHByZS1saW5lXHJcblx0XHRwcmVzZXJ2ZU5ld0xpbmVzID0gL2xpbmUkL2kudGVzdChjc3NXaGl0ZVNwYWNlKSxcclxuXHRcdG5vZGUgPSByb290LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdC8vIFNraXAgcHJlICYgcHJlLXdyYXAgd2l0aCBhbnkgdmVuZG9yIHByZWZpeFxyXG5cdGlmICgvcHJlKC13cmFwKT8kL2kudGVzdChjc3NXaGl0ZVNwYWNlKSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdG5leHROb2RlID0gbm9kZS5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHRcdG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xyXG5cdFx0bm9kZVR5cGUgPSBub2RlLm5vZGVUeXBlO1xyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFICYmIG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRyZW1vdmVXaGl0ZVNwYWNlKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gVEVYVF9OT0RFKSB7XHJcblx0XHRcdG5leHQgPSBnZXRTaWJsaW5nKG5vZGUpO1xyXG5cdFx0XHRwcmV2aW91cyA9IGdldFNpYmxpbmcobm9kZSwgdHJ1ZSk7XHJcblx0XHRcdHRyaW1TdGFydCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzLCAnZW1sZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0cHJldmlvdXMgPSBnZXRTaWJsaW5nKHByZXZpb3VzLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgc2libGluZyBpc24ndCBpbmxpbmUgb3IgaXMgYSB0ZXh0bm9kZSB0aGF0XHJcblx0XHRcdC8vIGVuZHMgaW4gd2hpdGVzcGFjZSwgdGltZSB0aGUgc3RhcnQgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoaXNJbmxpbmUobm9kZSkgJiYgcHJldmlvdXMpIHtcclxuXHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91cztcclxuXHJcblx0XHRcdFx0d2hpbGUgKHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzU2libGluZywgJ2VtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBnZXRTaWJsaW5nKHByZXZpb3VzU2libGluZywgdHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0cmltU3RhcnQgPSBwcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgPT09IFRFWFRfTk9ERSA/XHJcblx0XHRcdFx0XHQvW1xcdFxcblxcciBdJC8udGVzdChwcmV2aW91c1NpYmxpbmcubm9kZVZhbHVlKSA6XHJcblx0XHRcdFx0XHQhaXNJbmxpbmUocHJldmlvdXNTaWJsaW5nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2xlYXIgemVybyB3aWR0aCBzcGFjZXNcclxuXHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoL1xcdTIwMEIvZywgJycpO1xyXG5cclxuXHRcdFx0Ly8gU3RyaXAgbGVhZGluZyB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmICghcHJldmlvdXMgfHwgIWlzSW5saW5lKHByZXZpb3VzKSB8fCB0cmltU3RhcnQpIHtcclxuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvXltcXHQgXSsvIDogL15bXFx0XFxuXFxyIF0rLyxcclxuXHRcdFx0XHRcdCcnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU3RyaXAgdHJhaWxpbmcgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoIW5leHQgfHwgIWlzSW5saW5lKG5leHQpKSB7XHJcblx0XHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSskLyA6IC9bXFx0XFxuXFxyIF0rJC8sXHJcblx0XHRcdFx0XHQnJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBlbXB0eSB0ZXh0IG5vZGVzXHJcblx0XHRcdGlmICghbm9kZVZhbHVlLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlbW92ZShub2RlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9bXFx0IF0rL2cgOiAvW1xcdFxcblxcciBdKy9nLFxyXG5cdFx0XHRcdFx0JyAnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0Tm9kZTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbGwgdGhlIG5vZGVzIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RhcnROb2RlXHRUaGUgbm9kZSB0byBzdGFydCBleHRyYWN0aW5nIGF0XHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVuZE5vZGVcdFx0VGhlIG5vZGUgdG8gc3RvcCBleHRyYWN0aW5nIGF0XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRzKHN0YXJ0Tm9kZTogSFRNTEVsZW1lbnQsIGVuZE5vZGU6IEhUTUxFbGVtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7XHJcblx0dmFyIHJhbmdlID0gc3RhcnROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHJcblx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoc3RhcnROb2RlKTtcclxuXHRyYW5nZS5zZXRFbmRBZnRlcihlbmROb2RlKTtcclxuXHJcblx0cmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgb2Zmc2V0IHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBsZWZ0IGFuZCB0b3AgcHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChub2RlOiBIVE1MRWxlbWVudCk6IHsgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciB9IHtcclxuXHR2YXIgbGVmdCA9IDAsXHJcblx0XHR0b3AgPSAwO1xyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0bGVmdCArPSBub2RlLm9mZnNldExlZnQ7XHJcblx0XHR0b3AgKz0gbm9kZS5vZmZzZXRUb3A7XHJcblx0XHRub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bGVmdDogbGVmdCxcclxuXHRcdHRvcDogdG9wXHJcblx0fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGEgQ1NTIHByb3BlcnR5IGZyb20gdGhlIGVsZW1lbnRzIHN0eWxlIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdGxldCBzdHlsZVZhbHVlOiBzdHJpbmc7XHJcblx0bGV0IGVsbVN0eWxlID0gZWxtLnN0eWxlO1xyXG5cclxuXHRpZiAoIWNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSkge1xyXG5cdFx0Y3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldID0gY2FtZWxDYXNlKHByb3BlcnR5KTtcclxuXHR9XHJcblxyXG5cdHByb3BlcnR5ID0gY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldO1xyXG5cdHN0eWxlVmFsdWUgPSBlbG1TdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcclxuXHJcblx0Ly8gQWRkIGFuIGV4Y2VwdGlvbiBmb3IgdGV4dC1hbGlnblxyXG5cdGlmICgndGV4dEFsaWduJyA9PT0gcHJvcGVydHkpIHtcclxuXHRcdHN0eWxlVmFsdWUgPSBzdHlsZVZhbHVlIHx8IGNzcyhlbG0sIHByb3BlcnR5KTtcclxuXHJcblx0XHRpZiAoY3NzKGVsbS5wYXJlbnROb2RlLCBwcm9wZXJ0eSkgPT09IHN0eWxlVmFsdWUgfHxcclxuXHRcdFx0Y3NzKGVsbSwgJ2Rpc3BsYXknKSAhPT0gJ2Jsb2NrJyB8fCBpcyhlbG0sICdocix0aCcpKSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBzdHlsZVZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgYW4gZWxlbWVudCBoYXMgYSBzdHlsZS5cclxuICpcclxuICogSWYgdmFsdWVzIGFyZSBzcGVjaWZpZWQgaXQgd2lsbCBjaGVjayB0aGF0IHRoZSBzdHlsZXMgdmFsdWVcclxuICogbWF0Y2hlcyBvbmUgb2YgdGhlIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSBbdmFsdWVzXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlcz86IHN0cmluZyB8IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuXHR2YXIgc3R5bGVWYWx1ZSA9IGdldFN0eWxlKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRpZiAoIXN0eWxlVmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAhdmFsdWVzIHx8IHN0eWxlVmFsdWUgPT09IHZhbHVlcyB8fFxyXG5cdFx0KEFycmF5LmlzQXJyYXkodmFsdWVzKSAmJiB2YWx1ZXMuaW5kZXhPZihzdHlsZVZhbHVlKSA+IC0xKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGlubGluZSBzdHlsZXMgYW5kIGFsbCB0aGVcclxuICogaW5saW5lIHN0eWxlcyBoYXZlIG1hdGNoaW5nIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIHN0eWxlc01hdGNoKG5vZGVBOiBIVE1MRWxlbWVudCwgbm9kZUI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0dmFyIGkgPSBub2RlQS5zdHlsZS5sZW5ndGg7XHJcblx0aWYgKGkgIT09IG5vZGVCLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0bGV0IHByb3A6IHN0cmluZyA9IG5vZGVBLnN0eWxlW2ldO1xyXG5cdFx0aWYgKG5vZGVBLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkgIT09IG5vZGVCLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCBub2RlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBhdHRyaWJ1dGVzIGFuZCBhbGwgdGhlXHJcbiAqIGF0dHJpYnV0ZSB2YWx1ZXMgbWF0Y2hcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUFcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBhdHRyaWJ1dGVzTWF0Y2gobm9kZUE6IEhUTUxFbGVtZW50LCBub2RlQjogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHR2YXIgaSA9IG5vZGVBLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlQS5hdHRyaWJ1dGVzW2ldO1xyXG5cdFx0dmFyIG5vdE1hdGNoZXMgPSBwcm9wLm5hbWUgPT09ICdzdHlsZScgP1xyXG5cdFx0XHQhc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSA6XHJcblx0XHRcdHByb3AudmFsdWUgIT09IGF0dHIobm9kZUIsIHByb3AubmFtZSk7XHJcblxyXG5cdFx0aWYgKG5vdE1hdGNoZXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGVsZW1lbnQgcGxhY2luZyBpdHMgY2hpbGRyZW4gaW4gaXRzIHBsYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUtlZXBDaGlsZHJlbihub2RlOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cclxuXHR3aGlsZSAoKG5vZGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQpKSB7XHJcblx0XHRpbnNlcnRCZWZvcmUoKG5vZGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQpLCBub2RlKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZShub2RlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlcyBpbmxpbmUgc3R5bGVzIGFuZCB0YWdzIHdpdGggcGFyZW50cyB3aGVyZSBwb3NzaWJsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHNpbmNlIDMuMS4wXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2Uobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lO1xyXG5cdHZhciBtZXJnZVRhZ3MgPSAvQnxTVFJPTkd8RU18U1BBTnxGT05ULztcclxuXHJcblx0Ly8gTWVyZ2UgY2hpbGRyZW4gKGluIHJldmVyc2UgYXMgY2hpbGRyZW4gY2FuIGJlIHJlbW92ZWQpXHJcblx0dmFyIGkgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdG1lcmdlKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBIVE1MRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHQvLyBTaG91bGQgb25seSBtZXJnZSBpbmxpbmUgdGFncyBhbmQgc2hvdWxkIG5vdCBtZXJnZSA8YnI+IHRhZ3NcclxuXHRpZiAoIWlzSW5saW5lKG5vZGUpIHx8IHRhZ05hbWUgPT09ICdCUicpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIFJlbW92ZSBhbnkgaW5saW5lIHN0eWxlcyB0aGF0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGVcclxuXHRpID0gbm9kZS5zdHlsZS5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlLnN0eWxlW2ldO1xyXG5cdFx0aWYgKGNzcyhwYXJlbnQsIHByb3ApID09PSBjc3Mobm9kZSwgcHJvcCkpIHtcclxuXHRcdFx0bm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIENhbiBvbmx5IHJlbW92ZSAvIG1lcmdlIHRhZ3MgaWYgbm8gaW5saW5lIHN0eWxpbmcgbGVmdC5cclxuXHQvLyBJZiB0aGVyZSBpcyBhbnkgaW5saW5lIHN0eWxlIGxlZnQgdGhlbiBpdCBtZWFucyBpdCBhdCBsZWFzdCBwYXJ0aWFsbHlcclxuXHQvLyBkb2Vzbid0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGUgc28gbXVzdCBzdGF5XHJcblx0aWYgKCFub2RlLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmVtb3ZlQXR0cihub2RlLCAnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBSZW1vdmUgZm9udCBhdHRyaWJ1dGVzIGlmIG1hdGNoIHBhcmVudFxyXG5cdFx0aWYgKHRhZ05hbWUgPT09ICdGT05UJykge1xyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSA9PT1cclxuXHRcdFx0XHRjc3MocGFyZW50LCAnZm9udEZhbWlseScpLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdmYWNlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2NvbG9yJykgPT09IGNzcyhwYXJlbnQsICdjb2xvcicpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQXR0cihub2RlLCAnY29sb3InKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnZm9udFNpemUnKSA9PT0gY3NzKHBhcmVudCwgJ2ZvbnRTaXplJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdzaXplJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTcGFucyBhbmQgZm9udCB0YWdzIHdpdGggbm8gYXR0cmlidXRlcyBjYW4gYmUgc2FmZWx5IHJlbW92ZWRcclxuXHRcdGlmICghbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCAmJiAvU1BBTnxGT05ULy50ZXN0KHRhZ05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdH0gZWxzZSBpZiAobWVyZ2VUYWdzLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0dmFyIGlzQm9sZCA9IC9CfFNUUk9ORy8udGVzdCh0YWdOYW1lKTtcclxuXHRcdFx0dmFyIGlzSXRhbGljID0gdGFnTmFtZSA9PT0gJ0VNJztcclxuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50KSAmJlxyXG5cdFx0XHRcdCghaXNCb2xkIHx8IC9ib2xkfDcwMC9pLnRlc3QoY3NzKHBhcmVudCwgJ2ZvbnRXZWlnaHQnKSkpICYmXHJcblx0XHRcdFx0KCFpc0l0YWxpYyB8fCBjc3MocGFyZW50LCAnZm9udFN0eWxlJykgPT09ICdpdGFsaWMnKSkge1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgaWYgcGFyZW50IG1hdGNoXHJcblx0XHRcdFx0aWYgKChwYXJlbnQudGFnTmFtZSA9PT0gdGFnTmFtZSB8fFxyXG5cdFx0XHRcdFx0KGlzQm9sZCAmJiAvQnxTVFJPTkcvLnRlc3QocGFyZW50LnRhZ05hbWUpKSkgJiZcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNNYXRjaChwYXJlbnQsIG5vZGUpKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBNZXJnZSBzaWJsaW5ncyBpZiBhdHRyaWJ1dGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlcywgbWF0Y2hcclxuXHR2YXIgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcblx0aWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09PSB0YWdOYW1lICYmIGF0dHJpYnV0ZXNNYXRjaChuZXh0LCBub2RlKSkge1xyXG5cdFx0YXBwZW5kQ2hpbGQobm9kZSwgbmV4dCk7XHJcblx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obmV4dCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9kZWZhdWx0Q29tbWFuZHMnO1xyXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi9wbHVnaW5NYW5hZ2VyJztcclxuaW1wb3J0IHsgUmFuZ2VIZWxwZXIgfSBmcm9tICcuL3JhbmdlSGVscGVyJztcclxuaW1wb3J0IHRlbXBsYXRlcyBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZW1vdGljb25zIGZyb20gJy4vZW1vdGljb25zJztcclxuaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknO1xyXG5cclxudmFyIGdsb2JhbFdpbiA9IHdpbmRvdztcclxudmFyIGdsb2JhbERvYyA9IGRvY3VtZW50O1xyXG5cclxuLyoqXHJcbiAqIEVtbEVkaXRvciAtIFlBRSEgWWV0IEFub3RoZXIgRWRpdG9yXHJcbiAqIEBjbGFzcyBFbWxFZGl0b3JcclxuICogQG5hbWUgRW1sRWRpdG9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWxFZGl0b3Ige1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IodGV4dGFyZWE6IGFueSwgdXNlck9wdGlvbnM6IGFueSkge1xyXG5cdFx0dGhpcy50ZXh0YXJlYSA9IHRleHRhcmVhO1xyXG5cdFx0dGhpcy5vcHRpb25zID0gdGhpcy5lZGl0b3JPcHRpb25zID0gdXRpbHMuZXh0ZW5kKHRydWUsIHt9LCAoZGVmYXVsdE9wdGlvbnMgYXMgYW55KSwgdXNlck9wdGlvbnMpO1xyXG5cdFx0dGhpcy5jb21tYW5kcyA9IHV0aWxzLmV4dGVuZCh0cnVlLCB7fSwgKHVzZXJPcHRpb25zLmNvbW1hbmRzIHx8IGRlZmF1bHRDb21tYW5kcykpO1xyXG5cclxuXHRcdC8vIERvbid0IGRlZXAgZXh0ZW5kIGVtb3RpY29ucyAoZml4ZXMgIzU2NSlcclxuXHRcdHRoaXMuZWRpdG9yT3B0aW9ucy5lbW90aWNvbnMgPSB1c2VyT3B0aW9ucy5lbW90aWNvbnMgfHwgKGRlZmF1bHRPcHRpb25zIGFzIGFueSkuZW1vdGljb25zO1xyXG5cclxuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHMpKSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscyA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5vcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzLnB1c2goJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLycpO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5IGZvciBlYWNoIGVkaXRvciBpbnN0YW5jZSBzbyBjYW5cclxuXHRcdC8vIGhhdmUgZGlmZmVyZW50IGFsbG93ZWQgaWZyYW1lIFVSTHNcclxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXHJcblx0XHR0aGlzLmRvbVB1cmlmeSA9IERPTVB1cmlmeSgpO1xyXG5cclxuXHRcdC8vIEFsbG93IGlmcmFtZXMgZm9yIHRoaW5ncyBsaWtlIFlvdVR1YmUsIHNlZTpcclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2lzc3Vlcy8zNDAjaXNzdWVjb21tZW50LTY3MDc1ODk4MFxyXG5cdFx0dGhpcy5kb21QdXJpZnkuYWRkSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIChub2RlOiBIVE1MRWxlbWVudCwgZGF0YTogYW55KSA9PiB7XHJcblx0XHRcdGxldCBhbGxvd2VkVXJscyA9IHRoaXMub3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscztcclxuXHJcblx0XHRcdGlmIChkYXRhLnRhZ05hbWUgPT09ICdpZnJhbWUnKSB7XHJcblx0XHRcdFx0bGV0IHNyYyA9IGRvbS5hdHRyKG5vZGUsICdzcmMnKSB8fCAnJztcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhbGxvd2VkVXJscy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0bGV0IHVybCA9IGFsbG93ZWRVcmxzW2ldO1xyXG5cclxuXHRcdFx0XHRcdGlmICh1dGlscy5pc1N0cmluZyh1cmwpICYmIHNyYy5zdWJzdHIoMCwgdXJsLmxlbmd0aCkgPT09IHVybCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGFuZGxlIHJlZ2V4XHJcblx0XHRcdFx0XHRpZiAodXJsLnRlc3QgJiYgdXJsLnRlc3Qoc3JjKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBObyBtYXRjaCBzbyByZW1vdmVcclxuXHRcdFx0XHRkb20ucmVtb3ZlKG5vZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBDb252ZXJ0IHRhcmdldCBhdHRyaWJ1dGUgaW50byBkYXRhLWVtbC10YXJnZXQgYXR0cmlidXRlcyBzbyBYSFRNTCBmb3JtYXRcclxuXHRcdC8vIGNhbiBhbGxvdyB0aGVtXHJcblx0XHR0aGlzLmRvbVB1cmlmeS5hZGRIb29rKCdhZnRlclNhbml0aXplQXR0cmlidXRlcycsIChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG5cdFx0XHRpZiAoJ3RhcmdldCcgaW4gbm9kZSkge1xyXG5cdFx0XHRcdGRvbS5hdHRyKG5vZGUsICdkYXRhLWVtbC10YXJnZXQnLCBkb20uYXR0cihub2RlLCAndGFyZ2V0JykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ucmVtb3ZlQXR0cihub2RlLCAndGFyZ2V0Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBydW4gdGhlIGluaXRpYWxpemVyXHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHQgKiBQdWJsaWMgbWVtYmVyc1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cdHB1YmxpYyB1c2VyT3B0aW9uczogYW55O1xyXG5cdHB1YmxpYyBlZGl0b3JPcHRpb25zOiBhbnk7XHJcblx0cHVibGljIHRleHRhcmVhOiBhbnk7XHJcblx0cHVibGljIGNvbW1hbmRzOiBhbnk7XHJcblx0cHVibGljIGxvbmdlc3RFbW90aWNvbkNvZGU6IG51bWJlcjtcclxuXHRwdWJsaWMgZW1vdGljb25zQ2FjaGU6IGFueTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdGhlIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2Rlc1xyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgdG9nZ2xlU291cmNlTW9kZVxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHRvZ2dsZVNvdXJjZU1vZGUoKTogdm9pZCB7XHJcblx0XHRsZXQgaXNJblNvdXJjZU1vZGUgPSB0aGlzLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdC8vIGRvbid0IGFsbG93IHN3aXRjaGluZyB0byBXWVNJV1lHIGlmIGRvZXNuJ3Qgc3VwcG9ydCBpdFxyXG5cdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCAmJiBpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLmNsZWFyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuYmx1cigpO1xyXG5cclxuXHRcdGlmIChpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHR0aGlzLnNldFd5c2l3eWdFZGl0b3JWYWx1ZSh0aGlzLmdldFNvdXJjZUVkaXRvclZhbHVlKCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zZXRTb3VyY2VFZGl0b3JWYWx1ZSh0aGlzLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20udG9nZ2xlKHRoaXMuc291cmNlRWRpdG9yKTtcclxuXHRcdGRvbS50b2dnbGUodGhpcy53eXNpd3lnRWRpdG9yKTtcclxuXHJcblx0XHRkb20udG9nZ2xlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScsIGlzSW5Tb3VyY2VNb2RlKTtcclxuXHRcdGRvbS50b2dnbGVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3NvdXJjZU1vZGUnLCAhaXNJblNvdXJjZU1vZGUpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlVG9vbEJhcigpO1xyXG5cdFx0dGhpcy51cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0KiBJZiB0aGUgZWRpdG9yIGlzIGluIHNvdXJjZSBjb2RlIG1vZGVcclxuXHQqXHJcblx0KiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCogQGZ1bmN0aW9uXHJcblx0KiBAbmFtZSBpblNvdXJjZU1vZGVcclxuXHQqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0Ki9cclxuXHRwdWJsaWMgaW5Tb3VyY2VNb2RlKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3NvdXJjZU1vZGUnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IG5vZGUgdGhhdCBjb250YWlucyB0aGUgc2VsZWN0aW9uL2NhcmV0IGluXHJcblx0ICogV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7P05vZGV9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY3VycmVudE5vZGVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBDdXJyZW50Tm9kZSgpOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudE5vZGU7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZVxyXG5cdCAqIHNlbGVjdGlvbi9jYXJldCBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBXaWxsIGJlIG51bGwgaW4gc291cmNlTW9kZSBvciBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHs/Tm9kZX1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBDdXJyZW50QmxvY2tOb2RlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRwdWJsaWMgQ3VycmVudEJsb2NrTm9kZSgpOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudEJsb2NrTm9kZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgZWRpdG9ycyBibHVyIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBibHVyXjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBibHVyKGhhbmRsZXI/OiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc/OiBib29sZWFuLCBleGNsdWRlU291cmNlPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHR0aGlzLmJpbmQoJ2JsdXInLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LmJsdXIoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9yLmJsdXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB0ZXh0IGVkaXRvciB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2V0U291cmNlRWRpdG9yVmFsdWVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRTb3VyY2VFZGl0b3JWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLnNvdXJjZUVkaXRvci52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0dGhpcy50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIGZpbHRlciBzZXQgdHJ1ZSB0aGUgdmFsIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlclxyXG5cdCAqIGZ1bmN0aW9uLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpbiBpdCB3aWxsIHBhc3MgdGhlIHZhbCB0b1xyXG5cdCAqIHRoZSBCQkNvZGUgZmlsdGVyIHRvIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IHZhbFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgdmFsXjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB2YWwodmFsPzogc3RyaW5nLCBmaWx0ZXI6IGJvb2xlYW4gPSB0cnVlKTogYW55IHtcclxuXHRcdGlmICghdXRpbHMuaXNTdHJpbmcodmFsKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pblNvdXJjZU1vZGUoKSA/XHJcblx0XHRcdFx0dGhpcy5nZXRTb3VyY2VFZGl0b3JWYWx1ZShmYWxzZSkgOlxyXG5cdFx0XHRcdHRoaXMuZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICd0b0h0bWwnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdFx0dmFsID0gdGhpcy5mb3JtYXQudG9IdG1sKHZhbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNldFNvdXJjZUVkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdGV4dGFyZWEgdGhhdCB0aGUgZWRpdG9yIGlzIHJlcGxhY2luZ1xyXG5cdCAqIHdpdGggdGhlIHZhbHVlIGN1cnJlbnRseSBpbnNpZGUgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNldFRleHRhcmVhVmFsdWVcclxuXHQgKiBAc2luY2UgMS40LjBcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRUZXh0YXJlYVZhbHVlKCkge1xyXG5cdFx0Ly9UT0RPXHJcblx0XHR0aGlzLnRleHRhcmVhLnZhbHVlID0gdGhpcy52YWwoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBXWVNJV1lHIEhUTUwgZWRpdG9yIHZhbHVlLiBTaG91bGQgb25seSBiZSB0aGUgSFRNTFxyXG5cdCAqIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGJvZHkgdGFnc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2V0V3lzaXd5Z0VkaXRvclZhbHVlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuXHRcdGlmICghdmFsdWUpIHtcclxuXHRcdFx0dmFsdWUgPSAnPHA+PGJyIC8+PC9wPic7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy53eXNpd3lnQm9keS5pbm5lckhUTUwgPSB0aGlzLnNhbml0aXplKHZhbHVlKTtcclxuXHRcdHRoaXMucmVwbGFjZUVtb3RpY29ucygpO1xyXG5cdFx0dGhpcy5hcHBlbmROZXdMaW5lKCk7XHJcblx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdHRoaXMuYXV0b0V4cGFuZCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0ICpcclxuXHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIHRleHQgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyB3aGljaCBpcyBCQkNvZGUgdG9cclxuXHQgKiBIVE1MIHNvIGl0IHdpbGwgcmV0dXJuIEhUTUwuIElmIGZpbHRlciBpcyBzZXQgdG8gZmFsc2UgaXQgd2lsbFxyXG5cdCAqIGp1c3QgcmV0dXJuIHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIGVkaXRvciAoQkJDb2RlKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7P2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQG5hbWUgZ2V0U291cmNlRWRpdG9yVmFsdWVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRTb3VyY2VFZGl0b3JWYWx1ZShmaWx0ZXI/OiBib29sZWFuKTogc3RyaW5nIHtcclxuXHRcdGxldCB2YWwgPSB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHR2YWwgPSB0aGlzLmZvcm1hdC50b0h0bWwodmFsKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB2YWw7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogPHA+U2V0cyB0aGUgd2lkdGggYW5kL29yIGhlaWdodCBvZiB0aGUgZWRpdG9yLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIHdpZHRoIG9yIGhlaWdodCBpcyBub3QgbnVtZXJpYyBpdCBpcyBpZ25vcmVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBzYXZlIGFyZ3VtZW50IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBuZXcgc2l6ZXMuXHJcblx0ICogVGhlIHNhdmVkIHNpemVzIGNhbiBiZSB1c2VkIGZvciB0aGluZ3MgbGlrZSByZXN0b3JpbmcgZnJvbVxyXG5cdCAqIG1heGltaXplZCBzdGF0ZS4gVGhpcyBzaG91bGQgbm9ybWFsbHkgYmUgbGVmdCBhcyB0cnVlLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0XHR3aWR0aFx0XHRXaWR0aCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0XHRoZWlnaHRcdFx0SGVpZ2h0IGluIHB4XHJcblx0ICogQHBhcmFtIHtib29sZWFufVx0W3NhdmU9dHJ1ZV1cdElmIHRvIHN0b3JlIHRoZSBuZXcgc2l6ZXNcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIGRpbWVuc2lvbnNeM1xyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0cHVibGljIGRpbWVuc2lvbnMod2lkdGg/OiBhbnksIGhlaWdodD86IGFueSwgc2F2ZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0Ly8gc2V0IHVuZGVmaW5lZCB3aWR0aC9oZWlnaHQgdG8gYm9vbGVhbiBmYWxzZVxyXG5cdFx0d2lkdGggPSAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSA/IGZhbHNlIDogd2lkdGg7XHJcblx0XHRoZWlnaHQgPSAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApID8gZmFsc2UgOiBoZWlnaHQ7XHJcblxyXG5cdFx0aWYgKHdpZHRoID09PSBmYWxzZSAmJiBoZWlnaHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiB7IHdpZHRoOiB0aGlzLndpZHRoKCksIGhlaWdodDogdGhpcy5oZWlnaHQoKSB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh3aWR0aCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5vcHRpb25zLndpZHRoID0gd2lkdGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lciwgd2lkdGgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoZWlnaHQgIT09IGZhbHNlKSB7XHJcblx0XHRcdGlmIChzYXZlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHRoaXMub3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5oZWlnaHQodGhpcy5lZGl0b3JDb250YWluZXIsIGhlaWdodCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHthbnl9IHJlYWRPbmx5XHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSByZWFkT25seV4yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVhZE9ubHkocmVhZE9ubHk/OiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKHR5cGVvZiByZWFkT25seSAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdHJldHVybiAhdGhpcy5zb3VyY2VFZGl0b3IucmVhZE9ubHk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy53eXNpd3lnQm9keS5jb250ZW50RWRpdGFibGUgPSAoIXJlYWRPbmx5KS50b1N0cmluZygpO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IucmVhZE9ubHkgPSAhcmVhZE9ubHk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVUb29sQmFyKHJlYWRPbmx5KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGZvY3VzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbiB8IGFueX0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBmb2N1c14yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMgZm9jdXMoaGFuZGxlcj86IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5Zz86IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdHRoaXMuYmluZCgnZm9jdXMnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCF0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdC8vIEFscmVhZHkgaGFzIGZvY3VzIHNvIGRvIG5vdGhpbmdcclxuXHRcdFx0aWYgKGRvbS5maW5kKHRoaXMud3lzaXd5Z0RvY3VtZW50LCAnOmZvY3VzJykubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgY29udGFpbmVyO1xyXG5cdFx0XHRsZXQgcm5nID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHQvLyBGaXggRkYgYnVnIHdoZXJlIGl0IHNob3dzIHRoZSBjdXJzb3IgaW4gdGhlIHdyb25nIHBsYWNlXHJcblx0XHRcdC8vIGlmIHRoZSBlZGl0b3IgaGFzbid0IGhhZCBmb2N1cyBiZWZvcmUuIFNlZSBpc3N1ZSAjMzkzXHJcblx0XHRcdGlmICghdGhpcy5jdXJyZW50U2VsZWN0aW9uKSB7XHJcblx0XHRcdFx0dGhpcy5hdXRvZm9jdXModHJ1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIGN1cnNvciBpcyBzZXQgYWZ0ZXIgYSBCUiB3aGVuIHRoZSBCUiBpcyB0aGUgb25seVxyXG5cdFx0XHQvLyBjaGlsZCBvZiB0aGUgcGFyZW50LiBJbiBGaXJlZm94IHRoaXMgY2F1c2VzIGEgbGluZSBicmVha1xyXG5cdFx0XHQvLyB0byBvY2N1ciB3aGVuIHNvbWV0aGluZyBpcyB0eXBlZC4gU2VlIGlzc3VlICMzMjFcclxuXHRcdFx0aWYgKHJuZyAmJiBybmcuZW5kT2Zmc2V0ID09PSAxICYmIHJuZy5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRjb250YWluZXIgPSBybmcuZW5kQ29udGFpbmVyO1xyXG5cclxuXHRcdFx0XHRpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJiBkb20uaXMoKGNvbnRhaW5lci5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50KSwgJ2JyJykpIHtcclxuXHRcdFx0XHRcdHJuZy5zZXRTdGFydEJlZm9yZShjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJuZyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnd5c2l3eWdXaW5kb3cuZm9jdXMoKTtcclxuXHRcdFx0dGhpcy53eXNpd3lnQm9keS5mb2N1cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeHBhbmRzIG9yIHNocmlua3MgdGhlIGVkaXRvcnMgaGVpZ2h0IHRvIHRoZSBoZWlnaHQgb2YgaXQncyBjb250ZW50XHJcblx0ICpcclxuXHQgKiBVbmxlc3MgaWdub3JlTWF4SGVpZ2h0IGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbm90IGV4cGFuZFxyXG5cdCAqIGhpZ2hlciB0aGFuIHRoZSBtYXhIZWlnaHQgb3B0aW9uLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlTWF4SGVpZ2h0PWZhbHNlXVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGV4cGFuZFRvQ29udGVudFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNlZSAjcmVzaXplVG9Db250ZW50XHJcblx0ICovXHJcblx0cHVibGljIGV4cGFuZFRvQ29udGVudChpZ25vcmVNYXhIZWlnaHQ6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLm1heGltaXplKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSk7XHJcblx0XHR0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICghdGhpcy5hdXRvRXhwYW5kQm91bmRzKSB7XHJcblx0XHRcdGxldCBoZWlnaHQgPSB0aGlzLm9wdGlvbnMucmVzaXplTWluSGVpZ2h0IHx8IHRoaXMub3B0aW9ucy5oZWlnaHQgfHxcclxuXHRcdFx0XHRkb20uaGVpZ2h0KHRoaXMudGV4dGFyZWEpO1xyXG5cclxuXHRcdFx0dGhpcy5hdXRvRXhwYW5kQm91bmRzID0ge1xyXG5cdFx0XHRcdG1pbjogaGVpZ2h0LFxyXG5cdFx0XHRcdG1heDogdGhpcy5vcHRpb25zLnJlc2l6ZU1heEhlaWdodCB8fCAoaGVpZ2h0ICogMilcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmFuZ2UgPSBnbG9iYWxEb2MuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0aGlzLnd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHRsZXQgcmVjdCA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0bGV0IGN1cnJlbnQgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMTtcclxuXHRcdGxldCBzcGFjZU5lZWRlZCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7XHJcblx0XHRsZXQgbmV3SGVpZ2h0ID0gdGhpcy5oZWlnaHQoKSArIDEgKyAoc3BhY2VOZWVkZWQgLSBjdXJyZW50KTtcclxuXHJcblx0XHRpZiAoIWlnbm9yZU1heEhlaWdodCAmJiB0aGlzLmF1dG9FeHBhbmRCb3VuZHMubWF4ICE9PSAtMSkge1xyXG5cdFx0XHRuZXdIZWlnaHQgPSBNYXRoLm1pbihuZXdIZWlnaHQsIHRoaXMuYXV0b0V4cGFuZEJvdW5kcy5tYXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuaGVpZ2h0KE1hdGguY2VpbChNYXRoLm1heChuZXdIZWlnaHQsIHRoaXMuYXV0b0V4cGFuZEJvdW5kcy5taW4pKSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIFJUTCBtb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgcnRsXjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBydGwocnRsPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRsZXQgZGlyID0gcnRsID8gJ3J0bCcgOiAnbHRyJztcclxuXHJcblx0XHRpZiAodHlwZW9mIHJ0bCAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdHJldHVybiBkb20uYXR0cih0aGlzLnNvdXJjZUVkaXRvciwgJ2RpcicpID09PSAncnRsJztcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdCb2R5LCAnZGlyJywgZGlyKTtcclxuXHRcdGRvbS5hdHRyKHRoaXMuc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcclxuXHJcblx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdydGwnKTtcclxuXHRcdGRvbS5yZW1vdmVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ2x0cicpO1xyXG5cdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBkaXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb25zICYmIHRoaXMuaWNvbnMucnRsKSB7XHJcblx0XHRcdHRoaXMuaWNvbnMucnRsKHJ0bCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcy9kaXNhYmxlcyBlbW90aWNvbnNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBlbW90aWNvbnNeMlxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4yXHJcblx0ICovXHJcblx0cHVibGljIGVtb3RpY29ucyhlbmFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0aWYgKCFlbmFibGUgJiYgZW5hYmxlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc0VkaXRvci5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQgPSBlbmFibGU7XHJcblxyXG5cdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXByZXNzJywgbnVsbCwgdGhpc0VkaXRvci5lbW90aWNvbnNLZXlQcmVzcyk7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXNFZGl0b3Iuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0dGhpc0VkaXRvci5yZXBsYWNlRW1vdGljb25zKCk7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGVtb3RpY29ucyA9IGRvbS5maW5kKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdpbWdbZGF0YS1lbWxlZGl0b3ItZW1vdGljb25dJyk7XHJcblxyXG5cdFx0XHR1dGlscy5lYWNoKGVtb3RpY29ucywgKF8sIGltZykgPT4ge1xyXG5cdFx0XHRcdGxldCB0ZXh0OiBhbnkgPSBkb20uZGF0YShpbWcsICdlbWxlZGl0b3ItZW1vdGljb24nKTtcclxuXHRcdFx0XHRsZXQgdGV4dE5vZGUgPSB0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxuXHRcdFx0XHRpbWcucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIGltZyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9mZih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBudWxsLCB0aGlzRWRpdG9yLmVtb3RpY29uc0tleVByZXNzKTtcclxuXHJcblx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlTW9kZV4yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgc291cmNlTW9kZShlbmFibGU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBpblNvdXJjZU1vZGUgPSB0aGlzLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgZW5hYmxlICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuIGluU291cmNlTW9kZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoKGluU291cmNlTW9kZSAmJiAhZW5hYmxlKSB8fCAoIWluU291cmNlTW9kZSAmJiBlbmFibGUpKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd2lkdGggb2YgdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogVGhlIHNhdmVXaWR0aCBzcGVjaWZpZXMgaWYgdG8gc2F2ZSB0aGUgd2lkdGguIFRoZSBzdG9yZWQgd2lkdGggY2FuIGJlXHJcblx0ICogdXNlZCBmb3IgdGhpbmdzIGxpa2UgcmVzdG9yaW5nIGZyb20gbWF4aW1pemVkIHN0YXRlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9ICAgICB3aWR0aCAgICAgICAgICAgIFdpZHRoIGluIHBpeGVsc1xyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn1cdFtzYXZlV2lkdGg9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIHdpZHRoXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSB3aWR0aF4zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgd2lkdGgod2lkdGg/OiBudW1iZXIsIHNhdmVXaWR0aD86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0aWYgKCF3aWR0aCAmJiB3aWR0aCAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLndpZHRoKHRoaXMuZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmRpbWVuc2lvbnMod2lkdGgsIG51bGwsIHNhdmVXaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXHJcblx0ICpcclxuXHQgKiBUaGUgc3RvcmVkIGhlaWdodCBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2VcclxuXHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgaGVpZ2h0XjNcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoZWlnaHQoaGVpZ2h0PzogbnVtYmVyLCBzYXZlSGVpZ2h0PzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQodGhpcy5lZGl0b3JDb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGltZW5zaW9ucyhudWxsLCBoZWlnaHQsIHNhdmVIZWlnaHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZW51IGl0ZW0gZHJvcCBkb3duXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW0gVGhlIGJ1dHRvbiB0byBhbGlnbiB0aGUgZHJvcGRvd24gd2l0aFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgICAgICAgICBVc2VkIGZvciBzdHlsaW5nIHRoZSBkcm9wZG93biwgd2lsbCBiZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGNsYXNzIGVtbGVkaXRvci1uYW1lXHJcblx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRlbnQgIFRoZSBIVE1MIGNvbnRlbnQgb2YgdGhlIGRyb3Bkb3duXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY3JlYXRlRHJvcERvd25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjcmVhdGVEcm9wRG93bihtZW51SXRlbTogSFRNTEVsZW1lbnQsIG5hbWU6IHN0cmluZywgY29udGVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdC8vIGZpcnN0IGNsaWNrIGZvciBjcmVhdGUgc2Vjb25kIGNsaWNrIGZvciBjbG9zZVxyXG5cdFx0bGV0IGRyb3BEb3duQ3NzLCBkcm9wRG93bkNsYXNzID0gJ2VtbGVkaXRvci0nICsgbmFtZTtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHRoaXNFZGl0b3IuY2xvc2VEcm9wRG93bigpO1xyXG5cclxuXHRcdC8vIE9ubHkgY2xvc2UgdGhlIGRyb3Bkb3duIGlmIGl0IHdhcyBhbHJlYWR5IG9wZW5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmRyb3Bkb3duICYmIGRvbS5oYXNDbGFzcyh0aGlzRWRpdG9yLmRyb3Bkb3duLCBkcm9wRG93bkNsYXNzKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0ZHJvcERvd25Dc3MgPSB1dGlscy5leHRlbmQoe1xyXG5cdFx0XHR0b3A6IG1lbnVJdGVtLm9mZnNldFRvcCxcclxuXHRcdFx0bGVmdDogbWVudUl0ZW0ub2Zmc2V0TGVmdCxcclxuXHRcdFx0bWFyZ2luVG9wOiBtZW51SXRlbS5jbGllbnRIZWlnaHRcclxuXHRcdH0sIHRoaXNFZGl0b3Iub3B0aW9ucy5kcm9wRG93bkNzcyk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci5kcm9wZG93biA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1kcm9wZG93biAnICsgZHJvcERvd25DbGFzc1xyXG5cdFx0fSkgYXMgYW55O1xyXG5cclxuXHRcdGRvbS5jc3ModGhpc0VkaXRvci5kcm9wZG93biwgZHJvcERvd25Dc3MpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXNFZGl0b3IuZHJvcGRvd24sIGNvbnRlbnQpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCB0aGlzRWRpdG9yLmRyb3Bkb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLmRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIG51bGwsIChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHQvLyBzdG9wIGNsaWNrcyB3aXRoaW4gdGhlIGRyb3Bkb3duIGZyb20gYmVpbmcgaGFuZGxlZFxyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3IuZHJvcGRvd24pIHtcclxuXHRcdFx0bGV0IGZpcnN0ID0gZG9tLmZpbmQodGhpc0VkaXRvci5kcm9wZG93biwgJ2lucHV0LHRleHRhcmVhJylbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGlmIChmaXJzdCkge1xyXG5cdFx0XHRcdGZpcnN0LmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBtYXhpbWl6ZSBJZiB0byBtYXhpbWlzZSB0aGUgZWRpdG9yXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBtYXhpbWl6ZV4yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4aW1pemUobWF4aW1pemU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBtYXhpbWl6ZVNpemUgPSAnZW1sZWRpdG9yLW1heGltaXplJztcclxuXHJcblx0XHRpZiAodXRpbHMuaXNVbmRlZmluZWQobWF4aW1pemUpKSB7XHJcblx0XHRcdHJldHVybiBkb20uaGFzQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWF4aW1pemUgPSAhIW1heGltaXplO1xyXG5cclxuXHRcdGlmIChtYXhpbWl6ZSkge1xyXG5cdFx0XHR0aGlzLm1heGltaXplU2Nyb2xsUG9zaXRpb24gPSBnbG9iYWxXaW4uc2Nyb2xsWTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmRvY3VtZW50RWxlbWVudCwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmJvZHksIG1heGltaXplU2l6ZSwgbWF4aW1pemUpO1xyXG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdHRoaXMud2lkdGgobWF4aW1pemUgPyAnMTAwJScgOiB0aGlzLm9wdGlvbnMud2lkdGgsIGZhbHNlKTtcclxuXHRcdHRoaXMuaGVpZ2h0KG1heGltaXplID8gJzEwMCUnIDogdGhpcy5vcHRpb25zLmhlaWdodCwgZmFsc2UpO1xyXG5cclxuXHRcdGlmICghbWF4aW1pemUpIHtcclxuXHRcdFx0Z2xvYmFsV2luLnNjcm9sbFRvKDAsIHRoaXMubWF4aW1pemVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdXRvRXhwYW5kKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhlIGVkaXRvciwgcmVtb3ZpbmcgYWxsIGVsZW1lbnRzIGFuZFxyXG5cdCAqIGV2ZW50IGhhbmRsZXJzLlxyXG5cdCAqXHJcblx0ICogTGVhdmVzIG9ubHkgdGhlIG9yaWdpbmFsIHRleHRhcmVhLlxyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZGVzdHJveVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGRlc3Ryb3koKSB7XHJcblx0XHQvLyBEb24ndCBkZXN0cm95IGlmIHRoZSBlZGl0b3IgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcclxuXHRcdGlmICghdGhpcy5wbHVnaW5NYW5hZ2VyKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBsdWdpbk1hbmFnZXIuZGVzdHJveSgpO1xyXG5cclxuXHRcdHRoaXMucmFuZ2VIZWxwZXIgPSBudWxsO1xyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5kcm9wZG93bikge1xyXG5cdFx0XHRkb20ucmVtb3ZlKHRoaXMuZHJvcGRvd24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCAnY2xpY2snLCBudWxsLCB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2spO1xyXG5cclxuXHRcdGxldCBmb3JtID0gdGhpcy50ZXh0YXJlYS5mb3JtO1xyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9mZihmb3JtLCAncmVzZXQnLCBudWxsLCB0aGlzLmhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdGRvbS5vZmYoZm9ybSwgJ3N1Ym1pdCcsIG51bGwsIHRoaXMuc2V0VGV4dGFyZWFWYWx1ZSwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYod2luZG93LCAncGFnZWhpZGUnLCBudWxsLCB0aGlzLnNldFRleHRhcmVhVmFsdWUpO1xyXG5cdFx0ZG9tLm9mZih3aW5kb3csICdwYWdlc2hvdycsIG51bGwsIHRoaXMuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5yZW1vdmUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLnRvb2xiYXIpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMudGV4dGFyZWEuX2VtbGVkaXRvcjtcclxuXHRcdGRvbS5zaG93KHRoaXMudGV4dGFyZWEpO1xyXG5cclxuXHRcdHRoaXMudGV4dGFyZWEucmVxdWlyZWQgPSB0aGlzLmlzUmVxdWlyZWQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xvc2VzIGFueSBjdXJyZW50bHkgb3BlbiBkcm9wIGRvd25cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvY3VzPWZhbHNlXSBJZiB0byBmb2N1cyB0aGUgZWRpdG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGNsb3NpbmcgdGhlIGRyb3AgZG93blxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNsb3NlRHJvcERvd25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9zZURyb3BEb3duKGZvY3VzPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMuZHJvcGRvd24pIHtcclxuXHRcdFx0ZG9tLnJlbW92ZSh0aGlzLmRyb3Bkb3duKTtcclxuXHRcdFx0dGhpcy5kcm9wZG93biA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGZvY3VzID09PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwgaW50byBXWVNJV1lHIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIGVuZEh0bWwgaXMgc3BlY2lmaWVkLCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZFxyXG5cdCAqIGJldHdlZW4gaHRtbCBhbmQgZW5kSHRtbC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBodG1sXHJcblx0ICogYW5kIGVuZEh0bWwgd2lsbCBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEh0bWw9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvdmVycmlkZUNvZGVCbG9ja2luZz1mYWxzZV0gSWYgdG8gaW5zZXJ0IHRoZSBodG1sXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludG8gY29kZSB0YWdzLCBieVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGNvZGUgdGFncyBvbmx5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgdGV4dC5cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKGh0bWw6IHN0cmluZywgZW5kSHRtbD86IHN0cmluZywgb3ZlcnJpZGVDb2RlQmxvY2tpbmc/OiBib29sZWFuKSB7XHJcblx0XHRsZXQgbWFya2VyOiBhbnksIHNjcm9sbFRvcCwgc2Nyb2xsVG8sIGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQodGhpcy53eXNpd3lnRWRpdG9yKTtcclxuXHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogVGhpcyBjb2RlIHRhZyBzaG91bGQgYmUgY29uZmlndXJhYmxlIGFuZFxyXG5cdFx0Ly8gc2hvdWxkIG1heWJlIGNvbnZlcnQgdGhlIEhUTUwgaW50byB0ZXh0IGluc3RlYWRcclxuXHRcdC8vIERvbid0IGFwcGx5IHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmICghb3ZlcnJpZGVDb2RlQmxvY2tpbmcgJiYgZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50QmxvY2tOb2RlLCAnY29kZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJbnNlcnQgdGhlIEhUTUwgYW5kIHNhdmUgdGhlIHJhbmdlIHNvIHRoZSBlZGl0b3IgY2FuIGJlIHNjcm9sbGVkXHJcblx0XHQvLyB0byB0aGUgZW5kIG9mIHRoZSBzZWxlY3Rpb24uIEFsc28gYWxsb3dzIGVtb3RpY29ucyB0byBiZSByZXBsYWNlZFxyXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgdGhlIGN1cnNvciBwb3NpdGlvblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5pbnNlcnRIVE1MKGh0bWwsIGVuZEh0bWwpO1xyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdHRoaXMucmVwbGFjZUVtb3RpY29ucygpO1xyXG5cclxuXHRcdC8vIEZpeCBhbnkgaW52YWxpZCBuZXN0aW5nLCBlLmcuIGlmIGEgcXVvdGUgb3Igb3RoZXIgYmxvY2sgaXMgaW5zZXJ0ZWRcclxuXHRcdC8vIGludG8gYSBwYXJhZ3JhcGhcclxuXHRcdGRvbS5maXhOZXN0aW5nKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdHRoaXMud3JhcElubGluZXModGhpcy53eXNpd3lnQm9keSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdC8vIFNjcm9sbCB0aGUgZWRpdG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvblxyXG5cdFx0bWFya2VyID0gZG9tLmZpbmQodGhpcy53eXNpd3lnQm9keSwgJyNlbWxlZGl0b3ItZW5kLW1hcmtlcicpWzBdO1xyXG5cdFx0ZG9tLnNob3cobWFya2VyKTtcclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMud3lzaXd5Z0JvZHkuc2Nyb2xsVG9wO1xyXG5cdFx0c2Nyb2xsVG8gPSAoKGRvbS5nZXRPZmZzZXQobWFya2VyKSBhcyBhbnkpLnRvcCArXHJcblx0XHRcdChtYXJrZXIub2Zmc2V0SGVpZ2h0ICogMS41KSkgLSBlZGl0b3JIZWlnaHQ7XHJcblx0XHRkb20uaGlkZShtYXJrZXIpO1xyXG5cclxuXHRcdC8vIE9ubHkgc2Nyb2xsIGlmIG1hcmtlciBpc24ndCBhbHJlYWR5IHZpc2libGVcclxuXHRcdGlmIChzY3JvbGxUbyA+IHNjcm9sbFRvcCB8fCBzY3JvbGxUbyArIGVkaXRvckhlaWdodCA8IHNjcm9sbFRvcCkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHNjcm9sbFRvO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XHJcblx0XHR0aGlzLnJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cclxuXHRcdC8vIEFkZCBhIG5ldyBsaW5lIGFmdGVyIHRoZSBsYXN0IGJsb2NrIGVsZW1lbnRcclxuXHRcdC8vIHNvIGNhbiBhbHdheXMgYWRkIHRleHQgYWZ0ZXIgaXRcclxuXHRcdHRoaXMuYXBwZW5kTmV3TGluZSgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgZXhjZXB0IGl0IHdpbGwgY29udmVydCBhbnkgSFRNTFxyXG5cdCAqIGludG8gdGV4dCBiZWZvcmUgaW5zZXJ0aW5nIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCksIGVzY2FwZS5lbnRpdGllcyhlbmRUZXh0KVxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIHRleHQgaW50byB0aGUgV1lTSVdZRyBvciBzb3VyY2UgZWRpdG9yIGRlcGVuZGluZyBvbiB3aGljaFxyXG5cdCAqIG1vZGUgdGhlIGVkaXRvciBpcyBpbi5cclxuXHQgKlxyXG5cdCAqIElmIGVuZFRleHQgaXMgc3BlY2lmaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiB0ZXh0IGFuZCBlbmRUZXh0LiBJZiBubyB0ZXh0IGlzIHNlbGVjdGVkIHRleHQgYW5kIGVuZFRleHQgd2lsbFxyXG5cdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluc2VydFRleHRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICh0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCh0ZXh0LCBlbmRUZXh0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBidXQgaW5zZXJ0cyB0ZXh0IGludG8gdGhlXHJcblx0ICogc291cmNlIG1vZGUgZWRpdG9yIGluc3RlYWQuXHJcblx0ICpcclxuXHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogVGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBhZnRlciB0aGUgdGV4dCBwYXJhbS4gSWYgZW5kVGV4dCBpc1xyXG5cdCAqIHNwZWNpZmllZCB0aGUgY3Vyc29yIHdpbGwgYmUgcGxhY2VkIGJlZm9yZSBlbmRUZXh0LCBzbyBwYXNzaW5nOjxiciAvPlxyXG5cdCAqXHJcblx0ICogJ1tiXScsICdbL2JdJ1xyXG5cdCAqXHJcblx0ICogV291bGQgY2F1c2UgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQ6PGJyIC8+XHJcblx0ICpcclxuXHQgKiBbYl1TZWxlY3RlZCB0ZXh0fFsvYl1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRUZXh0PW51bGxdXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckluc2VydFRleHQodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGxldCBzY3JvbGxUb3AsIGN1cnJlbnRWYWx1ZSwgc3RhcnRQb3MgPSB0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCwgZW5kUG9zID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kO1xyXG5cclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMuc291cmNlRWRpdG9yLnNjcm9sbFRvcDtcclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHRjdXJyZW50VmFsdWUgPSB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZW5kVGV4dCkge1xyXG5cdFx0XHR0ZXh0ICs9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoc3RhcnRQb3MsIGVuZFBvcykgKyBlbmRUZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnZhbHVlID0gY3VycmVudFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgK1xyXG5cdFx0XHR0ZXh0ICtcclxuXHRcdFx0Y3VycmVudFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIGN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gKHN0YXJ0UG9zICsgdGV4dC5sZW5ndGgpIC1cclxuXHRcdFx0KGVuZFRleHQgPyBlbmRUZXh0Lmxlbmd0aCA6IDApO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQ7XHJcblxyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHR9O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGUgcmFuZ2VIZWxwZXIgY2xhc3NcclxuXHQgKiBmb3IgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge1JhbmdlSGVscGVyfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGdldFJhbmdlSGVscGVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmFuZ2VIZWxwZXIoKTogUmFuZ2VIZWxwZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMucmFuZ2VIZWxwZXI7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgc291cmNlIGVkaXRvciBjYXJldCBwb3NpdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcG9zaXRpb25dXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjVcclxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JDYXJldFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckNhcmV0KHBvc2l0aW9uOiBhbnkpOiBhbnkge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQgPSBwb3NpdGlvbi5zdGFydDtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gcG9zaXRpb24uZW5kO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwvQkJDb2RlIGludG8gdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogSWYgZW5kIGlzIHN1cHBsaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiBzdGFydCBhbmQgZW5kLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IHN0YXJ0IGFuZCBlbmRcclxuXHQgKiB3aWxsIGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogSWYgdGhlIGZpbHRlciBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgdGhlIEhUTUwvQkJDb2RlIHdpbGwgYmVcclxuXHQgKiBwYXNzZWQgdGhyb3VnaCBhbnkgcGx1Z2luIGZpbHRlcnMuIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogdGhpcyB3aWxsIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0ICpcclxuXHQgKiBJZiB0aGUgYWxsb3dNaXhlZCBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgSFRNTCBhbnkgd2lsbCBub3QgYmVcclxuXHQgKiBlc2NhcGVkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZD1udWxsXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnZlcnRFbW90aWNvbnM9dHJ1ZV0gSWYgdG8gY29udmVydCBlbW90aWNvbnNcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxvd01peGVkPWZhbHNlXVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgaW5zZXJ0XjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnNlcnQoc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcsIGZpbHRlcjogYm9vbGVhbiwgY29udmVydEVtb3RpY29uczogYm9vbGVhbiwgYWxsb3dNaXhlZDogYm9vbGVhblxyXG5cdCk6IGFueSB7XHJcblx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvckluc2VydFRleHQoc3RhcnQsIGVuZCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCB0aGUgc2VsZWN0aW9uIGJldHdlZW4gc3RhcnQgYW5kIGVuZFxyXG5cdFx0aWYgKGVuZCkge1xyXG5cdFx0XHRsZXQgaHRtbCA9IHRoaXMucmFuZ2VIZWxwZXIuc2VsZWN0ZWRIdG1sKCk7XHJcblxyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb1NvdXJjZScgaW4gdGhpcy5mb3JtYXQpIHtcclxuXHRcdFx0XHRodG1sID0gdGhpcy5mb3JtYXRcclxuXHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKGh0bWwsIHRoaXMud3lzaXd5Z0RvY3VtZW50LCB0aGlzLmN1cnJlbnROb2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RhcnQgKz0gaHRtbCArIGVuZDtcclxuXHRcdH1cclxuXHRcdC8vIFRPRE86IFRoaXMgZmlsdGVyIHNob3VsZCBhbGxvdyBlbXB0eSB0YWdzIGFzIGl0J3MgaW5zZXJ0aW5nLlxyXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRzdGFydCA9IHRoaXMuZm9ybWF0LmZyYWdtZW50VG9IdG1sKHN0YXJ0LCB0aGlzLmN1cnJlbnROb2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb252ZXJ0IGFueSBlc2NhcGVkIEhUTUwgYmFjayBpbnRvIEhUTUwgaWYgbWl4ZWQgaXMgYWxsb3dlZFxyXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgYWxsb3dNaXhlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRzdGFydCA9IHN0YXJ0LnJlcGxhY2UoLyZsdDsvZywgJzwnKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcclxuXHRcdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgJyYnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKHN0YXJ0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcnMgSFRNTCB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIElmIHVzaW5nIGEgcGx1Z2luIHRoYXQgZmlsdGVycyB0aGUgSHQgTWwgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyAoQkJDb2RlKSB1bmxlc3MgdGhlXHJcblx0ICogZmlsdGVyIHBhcmFtIGlzIHNldCB0byBmYWxzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7P2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZ2V0V3lzaXd5Z0VkaXRvclZhbHVlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcj86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG5cdFx0bGV0IGh0bWw7XHJcblx0XHQvLyBDcmVhdGUgYSB0bXAgbm9kZSB0byBzdG9yZSBjb250ZW50cyBzbyBpdCBjYW4gYmUgbW9kaWZpZWRcclxuXHRcdC8vIHdpdGhvdXQgYWZmZWN0aW5nIGFueXRoaW5nIGVsc2UuXHJcblx0XHRsZXQgdG1wID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRsZXQgY2hpbGROb2RlcyA9IHRoaXMud3lzaXd5Z0JvZHkuY2hpbGROb2RlcztcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRtcCwgKGNoaWxkTm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0JvZHksIHRtcCk7XHJcblx0XHRkb20uZml4TmVzdGluZyh0bXApO1xyXG5cdFx0ZG9tLnJlbW92ZSh0bXApO1xyXG5cclxuXHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xyXG5cclxuXHRcdC8vIGZpbHRlciB0aGUgSFRNTCBhbmQgRE9NIHRocm91Z2ggYW55IHBsdWdpbnNcclxuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmZvcm1hdCwgJ3RvU291cmNlJykpIHtcclxuXHRcdFx0aHRtbCA9IHRoaXMuZm9ybWF0LnRvU291cmNlKGh0bWwsIHRoaXMud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaHRtbDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Qm9keVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGdldEJvZHkoKTogSFRNTEJvZHlFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLnd5c2l3eWdCb2R5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjb250YWluZXIgYXJlYSAod2hvbGUgaUZyYW1lKS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqIEBuYW1lIGdldENvbnRlbnRBcmVhQ29udGFpbmVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q29udGVudEFyZWFDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHRoaXMud3lzaXd5Z0VkaXRvcjtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IFtwYXJhbV1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBleGVjQ29tbWFuZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IGFueSk6IHZvaWQge1xyXG5cdFx0bGV0IGV4ZWN1dGVkID0gZmFsc2UsIGNvbW1hbmRPYmogPSB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdO1xyXG5cclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBtYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0Ly8gZG9uJ3QgYXBwbHkgYW55IGNvbW1hbmRzIHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmIChkb20uY2xvc2VzdCh0aGlzLnJhbmdlSGVscGVyLnBhcmVudE5vZGUoKSwgJ2NvZGUnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZXhlY3V0ZWQgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgcGFyYW0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdC8vIHNob3cgZXJyb3IgaWYgZXhlY3V0aW9uIGZhaWxlZCBhbmQgYW4gZXJyb3IgbWVzc2FnZSBleGlzdHNcclxuXHRcdGlmICghZXhlY3V0ZWQgJiYgY29tbWFuZE9iaiAmJiBjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkge1xyXG5cdFx0XHRhbGVydCh0aGlzLnRyYW5zbGF0ZShjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zbGF0ZXMgdGhlIHN0cmluZyBpbnRvIHRoZSBsb2NhbGUgbGFuZ3VhZ2UuXHJcblx0ICpcclxuXHQgKiBSZXBsYWNlcyBhbnkgezB9LCB7MX0sIHsyfSwgZWN0LiB3aXRoIHRoZSBwYXJhbXMgcHJvdmlkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcblx0ICogQHBhcmFtIHsuLi5TdHJpbmd9IGFyZ3NcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgX1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZSguLi5hcmdzOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHVuZGVmOiBhbnk7XHJcblxyXG5cdFx0aWYgKHRoaXMubG9jYWxlICYmIHRoaXMubG9jYWxlW2FyZ3NbMF1dKSB7XHJcblx0XHRcdGFyZ3NbMF0gPSB0aGlzLmxvY2FsZVthcmdzWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXJnc1swXS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKHN0cj86IGFueSwgcDE/OiBhbnkpID0+IHtcclxuXHRcdFx0cmV0dXJuIGFyZ3NbcDEgLSAwICsgMV0gIT09IHVuZGVmID9cclxuXHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcclxuXHRcdFx0XHQneycgKyBwMSArICd9JztcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGEgaGFuZGxlciB0byB0aGUgc3BlY2lmaWVkIGV2ZW50c1xyXG5cdCAqXHJcblx0ICogVGhpcyBmdW5jdGlvbiBvbmx5IGJpbmRzIHRvIGEgbGltaXRlZCBsaXN0IG9mXHJcblx0ICogc3VwcG9ydGVkIGV2ZW50cy5cclxuXHQgKlxyXG5cdCAqIFRoZSBzdXBwb3J0ZWQgZXZlbnRzIGFyZTpcclxuXHQgKlxyXG5cdCAqICoga2V5dXBcclxuXHQgKiAqIGtleWRvd25cclxuXHQgKiAqIEtleXByZXNzXHJcblx0ICogKiBibHVyXHJcblx0ICogKiBmb2N1c1xyXG5cdCAqICogaW5wdXRcclxuXHQgKiAqIG5vZGVjaGFuZ2VkIC0gV2hlbiB0aGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmdcclxuXHQgKiBcdFx0dGhlIHNlbGVjdGlvbiBjaGFuZ2VzIGluIFdZU0lXWUcgbW9kZVxyXG5cdCAqICogY29udGV4dG1lbnVcclxuXHQgKiAqIHNlbGVjdGlvbmNoYW5nZWRcclxuXHQgKiAqIHZhbHVlY2hhbmdlZFxyXG5cdCAqXHJcblx0ICpcclxuXHQgKiBUaGUgZXZlbnRzIHBhcmFtIHNob3VsZCBiZSBhIHN0cmluZyBjb250YWluaW5nIHRoZSBldmVudChzKVxyXG5cdCAqIHRvIGJpbmQgdGhpcyBoYW5kbGVyIHRvLiBJZiBtdWx0aXBsZSwgdGhleSBzaG91bGQgYmUgc2VwYXJhdGVkXHJcblx0ICogYnkgc3BhY2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBldmVudHNcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7RW1sRWRpdG9yfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGJpbmRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBiaW5kKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IGV2ZW50c0FyciA9IGV2ZW50cy5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGxldCBpID0gZXZlbnRzQXJyLmxlbmd0aDtcclxuXHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRsZXQgd3lzRXZlbnQgPSAnZW1sd3lzJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHRsZXQgc3JjRXZlbnQgPSAnZW1sc3JjJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHQvLyBVc2UgY3VzdG9tIGV2ZW50cyB0byBhbGxvdyBwYXNzaW5nIHRoZSBpbnN0YW5jZSBhcyB0aGVcclxuXHRcdFx0XHQvLyAybmQgYXJndW1lbnQuXHJcblx0XHRcdFx0Ly8gQWxzbyBhbGxvd3MgdW5iaW5kaW5nIHdpdGhvdXQgdW5iaW5kaW5nIHRoZSBlZGl0b3JzIG93blxyXG5cdFx0XHRcdC8vIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0XHRcdGlmICghZXhjbHVkZVd5c2l3eWcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gPSB0aGlzLmV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdIHx8IFtdO1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzW3d5c0V2ZW50XS5wdXNoKGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdID0gdGhpcy5ldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFN0YXJ0IHNlbmRpbmcgdmFsdWUgY2hhbmdlZCBldmVudHNcclxuXHRcdFx0XHRpZiAoZXZlbnRzQXJyW2ldID09PSAndmFsdWVjaGFuZ2VkJykge1xyXG5cdFx0XHRcdFx0dGhpcy5oYXNIYW5kbGVyID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBVbmJpbmRzIGFuIGV2ZW50IHRoYXQgd2FzIGJvdW5kIHVzaW5nIGJpbmQoKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgdW5iaW5kaW5nIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyIGZyb20gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHVuYmluZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQHNlZSBiaW5kXHJcblx0ICovXHJcblx0cHVibGljIHVuYmluZChldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBldmVudHNBcnIgPSBldmVudHMuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRsZXQgaSA9IGV2ZW50c0Fyci5sZW5ndGg7XHJcblx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0aWYgKCFleGNsdWRlV3lzaXd5Zykge1xyXG5cdFx0XHRcdFx0dXRpbHMuYXJyYXlSZW1vdmUoXHJcblx0XHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1snZW1sd3lzJyArIGV2ZW50c0FycltpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzWydlbWxzcmMnICsgZXZlbnRzQXJyW2ldXSB8fCBbXSwgaGFuZGxlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBkb3duIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlEb3duXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMga2V5RG93bihoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5ZG93bicsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUga2V5IHByZXNzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlQcmVzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIGtleVByZXNzKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHQuYmluZCgna2V5cHJlc3MnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSB1cCBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5VXBcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBrZXlVcChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5dXAnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIG5vZGVDaGFuZ2VkXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMgbm9kZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnbm9kZWNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHNlbGVjdGlvbiBjaGFuZ2VkIGV2ZW50XHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIHNlbGVjdGlvbkNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnc2VsZWN0aW9uY2hhbmdlZCcsIGhhbmRsZXIsIGZhbHNlLCB0cnVlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgdmFsdWUgY2hhbmdlZCBldmVudFxyXG5cdCAqXHJcblx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgY3VycmVudCBlZGl0b3IgdmFsdWUgY2hhbmdlcy5cclxuXHQgKlxyXG5cdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdCAqIDEuNSBzZWNzIGFmdGVyIHRleHQgaXMgdHlwZWQuIElmIGEgc3BhY2UgaXMgdHlwZWQgaXQgd2lsbFxyXG5cdCAqIGNhdXNlIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZlxyXG5cdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuNVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdHJldHVybiB0aGlzXHJcblx0XHRcdC5iaW5kKCd2YWx1ZWNoYW5nZWQnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBXWVNJV1lHIGVkaXRvcnMgaW5saW5lIENTU1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjc3NcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc14yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjNcclxuXHQgKi9cclxuXHRwdWJsaWMgY3NzKGNzczogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICghdGhpcy5pbmxpbmVDc3MpIHtcclxuXHRcdFx0dGhpcy5pbmxpbmVDc3MgPSBkb20uY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7XHJcblx0XHRcdFx0aWQ6ICdpbmxpbmUnXHJcblx0XHRcdH0sIHRoaXMud3lzaXd5Z0RvY3VtZW50KSBhcyBIVE1MU3R5bGVFbGVtZW50O1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0RvY3VtZW50LmhlYWQsIHRoaXMuaW5saW5lQ3NzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKGNzcykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5saW5lQ3NzLnNoZWV0ID9cclxuXHRcdFx0XHR0aGlzLmlubGluZUNzcy5pbm5lclRleHQgOiB0aGlzLmlubGluZUNzcy5pbm5lckhUTUw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5saW5lQ3NzLnNoZWV0KSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgc2hvcnRjdXQgaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gc2hvcnRjdXRcclxuXHQgKiBAcmV0dXJuIHtFbWxFZGl0b3J9XHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZVNob3J0Y3V0KHNob3J0Y3V0OiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0ZGVsZXRlIHRoaXMuc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgc2hvcnRjdXQgaGFuZGxlciB0byB0aGUgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICBzaG9ydGN1dFxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gY21kXHJcblx0ICogQHJldHVybiB7ZW1sZWRpdG9yfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRTaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nLCBjbWQ6IHN0cmluZyB8IEZ1bmN0aW9uKTogYW55IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKVxyXG5cdFx0bGV0IHNob3J0Y3V0S2V5ID0gc2hvcnRjdXQgYXMga2V5b2YgdHlwZW9mIHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVycztcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoY21kKSkge1xyXG5cdFx0XHRsZXQgc3RyQ21kID0gY21kIGFzIHN0cmluZztcclxuXHRcdFx0dGhpc0VkaXRvci5zaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0S2V5XSA9ICgpID0+IHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUNvbW1hbmQodGhpc0VkaXRvci50b29sYmFyQnV0dG9uc1tzdHJDbWRdLCB0aGlzRWRpdG9yLmNvbW1hbmRzW3N0ckNtZF0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRLZXldID0gY21kO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgZm9ybWF0dGluZyBvZiB0aGUgcGFzc2VkIGJsb2NrIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBJZiBibG9jayBpcyBmYWxzZSwgaWYgd2lsbCBjbGVhciB0aGUgc3R5bGluZyBvZiB0aGUgZmlyc3RcclxuXHQgKiBibG9jayBsZXZlbCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGN1cnNvci5cclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gYmxvY2tcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xlYXJCbG9ja0Zvcm1hdHRpbmcoYmxvY2s6IEhUTUxFbGVtZW50KTogYW55IHtcclxuXHRcdGJsb2NrID0gYmxvY2sgfHwgdGhpcy5jdXJyZW50U3R5bGVkQmxvY2tOb2RlKCk7XHJcblxyXG5cdFx0aWYgKCFibG9jayB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRibG9jay5jbGFzc05hbWUgPSAnJztcclxuXHJcblx0XHRkb20uYXR0cihibG9jaywgJ3N0eWxlJywgJycpO1xyXG5cclxuXHRcdGlmICghZG9tLmlzKGJsb2NrLCAncCxkaXYsdGQnKSkge1xyXG5cdFx0XHRkb20uY29udmVydEVsZW1lbnQoYmxvY2ssICdwJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8vI2VuZHJlZ2lvblxyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogUHVibGljIHN0YXRpY1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cdC8vIFN0YXRpY1xyXG5cdHB1YmxpYyBzdGF0aWMgbG9jYWxlOiBhbnkgPSB7fTtcclxuXHRwdWJsaWMgc3RhdGljIGZvcm1hdHM6IGFueSA9IHt9O1xyXG5cdHB1YmxpYyBzdGF0aWMgaWNvbnM6IGFueSA9IHt9O1xyXG5cdHB1YmxpYyBzdGF0aWMgY29tbWFuZDogYW55ID0ge1xyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGEgY29tbWFuZFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R8bnVsbH1cclxuXHRcdCAqIEBzaW5jZSB2MS4zLjVcclxuXHRcdCAqL1xyXG5cdFx0Z2V0OiAobjoga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcyk6IG9iamVjdCB8IG51bGwgPT4ge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdENvbW1hbmRzW25dIHx8IG51bGw7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogPHA+QWRkcyBhIGNvbW1hbmQgdG8gdGhlIGVkaXRvciBvciB1cGRhdGVzIGFuIGV4aXN0aW5nXHJcblx0XHQgKiBjb21tYW5kIGlmIGEgY29tbWFuZCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbHJlYWR5IGV4aXN0cy48L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogPHA+T25jZSBhIGNvbW1hbmQgaXMgYWRkIGl0IGNhbiBiZSBpbmNsdWRlZCBpbiB0aGUgdG9vbGJhciBieVxyXG5cdFx0ICogYWRkaW5nIGl0J3MgbmFtZSB0byB0aGUgdG9vbGJhciBvcHRpb24gaW4gdGhlIGNvbnN0cnVjdG9yLiBJdFxyXG5cdFx0ICogY2FuIGFsc28gYmUgZXhlY3V0ZWQgbWFudWFsbHkgYnkgY2FsbGluZ1xyXG5cdFx0ICoge0BsaW5rIGVtbGVkaXRvci5leGVjQ29tbWFuZH08L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogQGV4YW1wbGVcclxuXHRcdCAqIEVtbEVkaXRvci5jb21tYW5kLnNldChcImhlbGxvXCIsXHJcblx0XHQgKiB7XHJcblx0XHQgKiAgICAgZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0ICogICAgICAgICBhbGVydChcIkhlbGxvIFdvcmxkIVwiKTtcclxuXHRcdCAqICAgICB9XHJcblx0XHQgKiB9KTtcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGNtZFxyXG5cdFx0ICogQHJldHVybiB7dGhpc3xmYWxzZX0gUmV0dXJucyBmYWxzZSBpZiBuYW1lIG9yIGNtZCBpcyBmYWxzZVxyXG5cdFx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdFx0ICovXHJcblx0XHRzZXQ6IChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzLCBjbWQ6IGFueSk6IGFueSB8IGZhbHNlID0+IHtcclxuXHRcdFx0aWYgKCFuYW1lIHx8ICFjbWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIG1lcmdlIGFueSBleGlzdGluZyBjb21tYW5kIHByb3BlcnRpZXNcclxuXHRcdFx0Y21kID0gdXRpbHMuZXh0ZW5kKGRlZmF1bHRDb21tYW5kc1tuYW1lXSB8fCB7fSwgY21kKTtcclxuXHJcblx0XHRcdGNtZC5yZW1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdFx0RW1sRWRpdG9yLmNvbW1hbmQucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZGVmYXVsdENvbW1hbmRzW25hbWVdID0gY21kO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmVzIGEgY29tbWFuZFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdFx0ICovXHJcblx0XHRyZW1vdmU6IChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzKTogYW55ID0+IHtcclxuXHRcdFx0aWYgKGRlZmF1bHRDb21tYW5kc1tuYW1lXSkge1xyXG5cdFx0XHRcdGRlbGV0ZSBkZWZhdWx0Q29tbWFuZHNbbmFtZV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvLyNlbmRyZWdpb25cclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAqIFByaXZhdGUgbWVtYmVyc1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cclxuXHQvKipcclxuXHQgKiBET01QdXJpZnlcclxuXHQgKi9cclxuXHRwcml2YXRlIGRvbVB1cmlmeTogRE9NUHVyaWZ5LkRPTVB1cmlmeUlcclxuXHJcblx0LyoqXHJcblx0ICogRWRpdG9yIGZvcm1hdCBsaWtlIEJCQ29kZSBvciBIVE1MXHJcblx0ICovXHJcblx0cHJpdmF0ZSBmb3JtYXQ6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFwIG9mIGV2ZW50cyBoYW5kbGVycyBib3VuZCB0byB0aGlzIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZXZlbnRIYW5kbGVyczogYW55ID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHdpbmRvd1xyXG5cdCAqXHJcblx0ICogQHR5cGUge1dpbmRvd31cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z1dpbmRvdzogV2luZG93O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGJvZHkgZWxlbWVudFxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxCb2R5RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z0JvZHk6IEhUTUxCb2R5RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgZHJvcGRvd25cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZHJvcGRvd246IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgdXNlciBpcyBjdXJyZW50bHkgY29tcG9zaW5nIHRleHQgdmlhIElNRVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNDb21wb3Npbmc6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRpbWVyIGZvciB2YWx1ZUNoYW5nZWQga2V5IGhhbmRsZXJcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdmFsdWVDaGFuZ2VkS2V5VXBUaW1lcjogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBsb2NhbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBsb2NhbGU6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcmVzIGEgY2FjaGUgb2YgcHJlbG9hZGVkIGltYWdlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAdHlwZSB7QXJyYXkuPEhUTUxJbWFnZUVsZW1lbnQ+fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcHJlTG9hZENhY2hlOiBhbnkgPSBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PjtcclxuXHJcblx0LyoqXHJcblx0ICogUGx1Z2luIG1hbmFnZXIgaW5zdGFuY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtQbHVnaW5NYW5hZ2VyfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqXHJcblx0ICogQHR5cGUge05vZGV9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGN1cnJlbnROb2RlOiBOb2RlO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBjdXJyZW50IG5vZGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtub2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50QmxvY2tOb2RlOiBIVE1MRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVXNlZCB0byBtYWtlIHN1cmUgb25seSAxIHNlbGVjdGlvbiBjaGFuZ2VkXHJcblx0ICogY2hlY2sgaXMgY2FsbGVkIGV2ZXJ5IDEwMG1zLlxyXG5cdCAqXHJcblx0ICogSGVscHMgaW1wcm92ZSBwZXJmb3JtYW5jZSBhcyBpdCBpcyBjaGVja2VkIGEgbG90LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiBjb250ZW50IGlzIHJlcXVpcmVkIChlcXVpdmFsZW50IHRvIHRoZSBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUpXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNSZXF1aXJlZDogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGlubGluZSBDU1Mgc3R5bGUgZWxlbWVudC4gV2lsbCBiZSB1bmRlZmluZWRcclxuXHQgKiB1bnRpbCBjc3MoKSBpcyBjYWxsZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxTdHlsZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGlubGluZUNzczogSFRNTFN0eWxlRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogT2JqZWN0IGNvbnRhaW5pbmcgYSBsaXN0IG9mIHNob3J0Y3V0IGhhbmRsZXJzXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG9ydGN1dEhhbmRsZXJzOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1pbiBhbmQgbWF4IGhlaWdodHMgdGhhdCBhdXRvRXhwYW5kIHNob3VsZCBzdGF5IHdpdGhpblxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b0V4cGFuZEJvdW5kczogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaW1lb3V0IGZvciB0aGUgYXV0b0V4cGFuZCBmdW5jdGlvbiB0byB0aHJvdHRsZSBjYWxsc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGF1dG9FeHBhbmRUaHJvdHRsZTogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBMYXN0IHNjcm9sbCBwb3NpdGlvbiBiZWZvcmUgbWF4aW1pemluZyBzb1xyXG5cdCAqIGl0IGNhbiBiZSByZXN0b3JlZCB3aGVuIGZpbmlzaGVkLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge251bWJlcn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbWF4aW1pemVTY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBTdG9yZXMgdGhlIGNvbnRlbnRzIHdoaWxlIGEgcGFzdGUgaXMgdGFraW5nIHBsYWNlLlxyXG5cdCAqXHJcblx0ICogTmVlZGVkIHRvIHN1cHBvcnQgYnJvd3NlcnMgdGhhdCBsYWNrIGNsaXBib2FyZCBBUEkgc3VwcG9ydC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHs/RG9jdW1lbnRGcmFnbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcGFzdGVDb250ZW50RnJhZ21lbnQ6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogQWxsIHRoZSBlbW90aWNvbnMgZnJvbSBkcm9wZG93biwgbW9yZSBhbmQgaGlkZGVuIGNvbWJpbmVkXHJcblx0ICogYW5kIHdpdGggdGhlIGVtb3RpY29ucyByb290IHNldFxyXG5cdCAqXHJcblx0ICogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhbGxFbW90aWNvbnM6IGFueSA9IHt9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXJyZW50IGljb24gc2V0IGlmIGFueVxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9PYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGljb25zOiBhbnkgfCBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbiBhcnJheSBvZiBidXR0b24gc3RhdGUgaGFuZGxlcnNcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtBcnJheS48T2JqZWN0Pn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYnRuU3RhdGVIYW5kbGVyczogYW55ID0gW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHRvb2xiYXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdG9vbGJhcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBXWVNJV1lHIGVkaXRvcnMgZG9jdW1lbnRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEb2N1bWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z0RvY3VtZW50OiBEb2N1bWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyBpZiBidXR0b25zIGFyZSBhY3RpdmUgb3Igbm90XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZUFjdGl2ZUJ1dHRvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0bGV0IGFjdGl2ZUNsYXNzID0gJ2FjdGl2ZSc7XHJcblx0XHRsZXQgZG9jID0gdGhpcy53eXNpd3lnRG9jdW1lbnQ7XHJcblx0XHRsZXQgaXNTb3VyY2UgPSB0aGlzLnNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5yZWFkT25seSgpKSB7XHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQodGhpcy50b29sYmFyLCBhY3RpdmVDbGFzcyksIChfLCBtZW51SXRlbSkgPT4ge1xyXG5cdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhtZW51SXRlbSwgYWN0aXZlQ2xhc3MpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghaXNTb3VyY2UpIHtcclxuXHRcdFx0cGFyZW50ID0gdGhpcy5yYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblx0XHRcdGZpcnN0QmxvY2sgPSB0aGlzLnJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQocGFyZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYnRuU3RhdGVIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRsZXQgc3RhdGUgPSAwO1xyXG5cdFx0XHRsZXQgYnRuID0gdGhpcy50b29sYmFyQnV0dG9uc1t0aGlzLmJ0blN0YXRlSGFuZGxlcnNbal0ubmFtZV07XHJcblx0XHRcdGxldCBzdGF0ZUZuID0gdGhpcy5idG5TdGF0ZUhhbmRsZXJzW2pdLnN0YXRlO1xyXG5cdFx0XHRsZXQgaXNEaXNhYmxlZCA9IChpc1NvdXJjZSAmJiAhYnRuLl9lbWxUeHRNb2RlKSB8fFxyXG5cdFx0XHRcdCghaXNTb3VyY2UgJiYgIWJ0bi5fZW1sV3lzaXd5Z01vZGUpO1xyXG5cclxuXHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XHJcblx0XHRcdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtZGVwdGhcclxuXHRcdFx0XHRcdFx0aWYgKHN0YXRlID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRTdGF0ZShzdGF0ZUZuKSA/IDEgOiAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0Rpc2FibGVkKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBzdGF0ZUZuLmNhbGwodGhpcywgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCB8fCBzdGF0ZSA8IDApO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCBhY3RpdmVDbGFzcywgc3RhdGUgPiAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pY29ucyAmJiB0aGlzLmljb25zLnVwZGF0ZSkge1xyXG5cdFx0XHR0aGlzLmljb25zLnVwZGF0ZShpc1NvdXJjZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWNoZSBvZiB0aGUgY3VycmVudCB0b29sYmFyIGJ1dHRvbnNcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHRvb2xiYXJCdXR0b25zOiBhbnkgPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdG9vbGJhciB0byBkaXNhYmxlL2VuYWJsZSB0aGUgYXBwcm9wcmlhdGUgYnV0dG9uc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVUb29sQmFyID0gKGRpc2FibGU/OiBib29sZWFuKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgbW9kZSA9IHRoaXMuaW5Tb3VyY2VNb2RlKCkgPyAnX2VtbFR4dE1vZGUnIDogJ19lbWxXeXNpd3lnTW9kZSc7XHJcblxyXG5cdFx0dXRpbHMuZWFjaCh0aGlzLnRvb2xiYXJCdXR0b25zLCAoXywgYnV0dG9uKSA9PiB7XHJcblx0XHRcdGRvbS50b2dnbGVDbGFzcyhidXR0b24sICdkaXNhYmxlZCcsIGRpc2FibGUgfHwgIWJ1dHRvblttb2RlXSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBpZnJhbWUgd2hpY2ggc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHd5c2l3eWdFZGl0b3I6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyB0ZXh0YXJlYSBmb3Igdmlld2luZyBzb3VyY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MVGV4dEFyZWFFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBzb3VyY2VFZGl0b3I6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IG5vZGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50U2VsZWN0aW9uOiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHJhbmdlSGVscGVyIGluc3RhbmNlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UmFuZ2VIZWxwZXJ9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHJhbmdlSGVscGVyOiBSYW5nZUhlbHBlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRpdiB3aGljaCBjb250YWlucyB0aGUgZWRpdG9yIGFuZCB0b29sYmFyXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGVkaXRvckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBub2RlIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdCAqIHRoZSBub2RlY2hhbmdlZCBldmVudCBpZiBpdCBoYXNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tOb2RlQ2hhbmdlZCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdC8vIGNoZWNrIGlmIG5vZGUgaGFzIGNoYW5nZWRcclxuXHRcdGxldCBvbGROb2RlLCBub2RlID0gdGhpcy5yYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudE5vZGUgIT09IG5vZGUpIHtcclxuXHRcdFx0b2xkTm9kZSA9IHRoaXMuY3VycmVudE5vZGU7XHJcblx0XHRcdHRoaXMuY3VycmVudE5vZGUgPSBub2RlO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCbG9ja05vZGUgPSB0aGlzLnJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ25vZGVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdG9sZE5vZGU6IG9sZE5vZGUsXHJcblx0XHRcdFx0bmV3Tm9kZTogdGhpcy5jdXJyZW50Tm9kZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGlmcmFtZSBhbmQgdGV4dGFyZWFcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHRoaXMudGV4dGFyZWEuX2VtbGVkaXRvciA9IHRoaXM7XHJcblxyXG5cclxuXHRcdC8vIExvYWQgbG9jYWxlXHJcblx0XHRpZiAodGhpc0VkaXRvci5vcHRpb25zLmxvY2FsZSAmJiB0aGlzRWRpdG9yLm9wdGlvbnMubG9jYWxlICE9PSAnZW4nKSB7XHJcblx0XHRcdHRoaXNFZGl0b3IuaW5pdExvY2FsZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWNvbnRhaW5lcicsXHJcblx0XHR9KSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0XHRkb20uaW5zZXJ0QmVmb3JlKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCB0aGlzRWRpdG9yLnRleHRhcmVhKTtcclxuXHRcdGRvbS5jc3ModGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsICd6LWluZGV4JywgdGhpc0VkaXRvci5vcHRpb25zLnpJbmRleCk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci5pc1JlcXVpcmVkID0gdGhpc0VkaXRvci50ZXh0YXJlYS5yZXF1aXJlZDtcclxuXHRcdHRoaXNFZGl0b3IudGV4dGFyZWEucmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcblx0XHRsZXQgRm9ybWF0Q3RvciA9IEVtbEVkaXRvci5mb3JtYXRzW3RoaXNFZGl0b3Iub3B0aW9ucy5mb3JtYXRdO1xyXG5cdFx0dGhpc0VkaXRvci5mb3JtYXQgPSBGb3JtYXRDdG9yID8gbmV3IEZvcm1hdEN0b3IoKSA6IHt9O1xyXG5cdFx0LypcclxuXHRcdFx0KiBQbHVnaW5zIHNob3VsZCBiZSBpbml0aWFsaXplZCBiZWZvcmUgdGhlIGZvcm1hdHRlcnMgc2luY2VcclxuXHRcdFx0KiB0aGV5IG1heSB3aXNoIHRvIGFkZCBvciBjaGFuZ2UgZm9ybWF0dGluZyBoYW5kbGVycyBhbmRcclxuXHRcdFx0KiBzaW5jZSB0aGUgYmJjb2RlIGZvcm1hdCBjYWNoZXMgaXRzIGhhbmRsZXJzLFxyXG5cdFx0XHQqIHN1Y2ggY2hhbmdlcyBtdXN0IGJlIGRvbmUgZmlyc3QuXHJcblx0XHRcdCovXHJcblx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIgPSBuZXcgUGx1Z2luTWFuYWdlcih0aGlzRWRpdG9yKTtcclxuXHRcdCh0aGlzRWRpdG9yLm9wdGlvbnMucGx1Z2lucyB8fCAnJykuc3BsaXQoJywnKS5mb3JFYWNoKChwbHVnaW46IGFueSkgPT4ge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIucmVnaXN0ZXIocGx1Z2luLnRyaW0oKSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICgnaW5pdCcgaW4gdGhpc0VkaXRvci5mb3JtYXQpIHtcclxuXHRcdFx0KHRoaXNFZGl0b3IuZm9ybWF0IGFzIGFueSkuaW5pdC5jYWxsKHRoaXNFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENyZWF0ZSB0aGUgWUFFIVxyXG5cdFx0dGhpc0VkaXRvci5pbml0RW1vdGljb25zKCk7XHJcblx0XHR0aGlzRWRpdG9yLmluaXRUb29sQmFyKCk7XHJcblx0XHR0aGlzRWRpdG9yLmluaXRFZGl0b3IoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdE9wdGlvbnMoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdEV2ZW50cygpO1xyXG5cclxuXHRcdC8vIGZvcmNlIGludG8gc291cmNlIG1vZGUgaWYgaXMgYSBicm93c2VyIHRoYXQgY2FuJ3QgaGFuZGxlXHJcblx0XHQvLyBmdWxsIGVkaXRpbmdcclxuXHRcdGlmICghYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcclxuXHRcdFx0dGhpc0VkaXRvci50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc0VkaXRvci51cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblxyXG5cdFx0bGV0IGxvYWRlZCA9ICgpID0+IHtcclxuXHRcdFx0ZG9tLm9mZihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHJcblx0XHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5hdXRvZm9jdXMoISF0aGlzRWRpdG9yLm9wdGlvbnMuYXV0b2ZvY3VzRW5kKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc0VkaXRvci5hdXRvRXhwYW5kKCk7XHJcblx0XHRcdHRoaXNFZGl0b3IuYXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0XHQvLyBUT0RPOiB1c2UgZWRpdG9yIGRvYyBhbmQgd2luZG93P1xyXG5cdFx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIuY2FsbCgncmVhZHknKTtcclxuXHRcdFx0aWYgKCdvblJlYWR5JyBpbiB0aGlzRWRpdG9yLmZvcm1hdCkge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IuZm9ybWF0Lm9uUmVhZHkuY2FsbCh0aGlzRWRpdG9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGRvbS5vbihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHRcdGlmIChnbG9iYWxEb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xyXG5cdFx0XHRsb2FkZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0IHRoZSBsb2NhbGUgdmFyaWFibGUgd2l0aCB0aGUgc3BlY2lmaWVkIGxvY2FsZSBpZiBwb3NzaWJsZVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0TG9jYWxlID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IGxhbmcgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0dGhpcy5sb2NhbGUgPSBFbWxFZGl0b3IubG9jYWxlW3RoaXMub3B0aW9ucy5sb2NhbGVdO1xyXG5cclxuXHRcdGlmICghdGhpcy5sb2NhbGUpIHtcclxuXHRcdFx0bGFuZyA9IHRoaXMub3B0aW9ucy5sb2NhbGUuc3BsaXQoJy0nKTtcclxuXHRcdFx0dGhpcy5sb2NhbGUgPSBFbWxFZGl0b3IubG9jYWxlW2xhbmdbMF1dO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIExvY2FsZSBEYXRlVGltZSBmb3JtYXQgb3ZlcnJpZGVzIGFueSBzcGVjaWZpZWQgaW4gdGhlIG9wdGlvbnNcclxuXHRcdGlmICh0aGlzLmxvY2FsZSAmJiB0aGlzLmxvY2FsZS5kYXRlRm9ybWF0KSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucy5kYXRlRm9ybWF0ID0gdGhpcy5sb2NhbGUuZGF0ZUZvcm1hdDtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0RWRpdG9yID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IgPSBkb20uY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnLCBudWxsKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9yID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScsIHtcclxuXHRcdFx0ZnJhbWVib3JkZXI6IFwiMFwiLFxyXG5cdFx0XHRhbGxvd2Z1bGxzY3JlZW46IFwidHJ1ZVwiXHJcblx0XHR9KSBhcyBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcblx0XHQvKlxyXG5cdFx0XHQqIFRoaXMgbmVlZHMgdG8gYmUgZG9uZSByaWdodCBhZnRlciB0aGV5IGFyZSBjcmVhdGVkIGJlY2F1c2UsXHJcblx0XHRcdCogZm9yIGFueSByZWFzb24sIHRoZSB1c2VyIG1heSBub3Qgd2FudCB0aGUgdmFsdWUgdG8gYmUgdGlua2VyZWRcclxuXHRcdFx0KiBieSBhbnkgZmlsdGVycy5cclxuXHRcdFx0Ki9cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuc3RhcnRJblNvdXJjZU1vZGUpIHtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLnd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnd3lzaXd5Z01vZGUnKTtcclxuXHRcdFx0ZG9tLmhpZGUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5vcHRpb25zLnNwZWxsY2hlY2spIHtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy5lZGl0b3JDb250YWluZXIsICdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGdsb2JhbFdpbi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy53eXNpd3lnRWRpdG9yLCAnc3JjJywgJ2Fib3V0OmJsYW5rJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBlZGl0b3IgdG8gdGhlIGNvbnRhaW5lclxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCB0aGlzLnd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCB0aGlzLnNvdXJjZUVkaXRvcik7XHJcblxyXG5cdFx0Ly8gVE9ETzogbWFrZSB0aGlzIG9wdGlvbmFsIHNvbWVob3dcclxuXHRcdHRoaXMuZGltZW5zaW9ucyhcclxuXHRcdFx0dGhpcy5vcHRpb25zLndpZHRoIHx8IGRvbS53aWR0aCh0aGlzLnRleHRhcmVhKSxcclxuXHRcdFx0dGhpcy5vcHRpb25zLmhlaWdodCB8fCBkb20uaGVpZ2h0KHRoaXMudGV4dGFyZWEpXHJcblx0XHQpO1xyXG5cclxuXHRcdC8vIEFkZCBpb3MgdG8gSFRNTCBzbyBjYW4gYXBwbHkgQ1NTIGZpeCB0byBvbmx5IGl0XHJcblx0XHRsZXQgY2xhc3NOYW1lID0gYnJvd3Nlci5pb3MgPyAnIGlvcycgOiAnJztcclxuXHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudCA9IHRoaXMud3lzaXd5Z0VkaXRvci5jb250ZW50RG9jdW1lbnQ7XHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudC5vcGVuKCk7XHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudC53cml0ZSh0ZW1wbGF0ZXMoJ2h0bWwnLCB7XHJcblx0XHRcdGF0dHJzOiAnIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIicsXHJcblx0XHRcdHNwZWxsY2hlY2s6IHRoaXMub3B0aW9ucy5zcGVsbGNoZWNrID8gJycgOiAnc3BlbGxjaGVjaz1cImZhbHNlXCInLFxyXG5cdFx0XHRjaGFyc2V0OiB0aGlzLm9wdGlvbnMuY2hhcnNldCxcclxuXHRcdFx0c3R5bGU6IHRoaXMub3B0aW9ucy5zdHlsZVxyXG5cdFx0fSkpO1xyXG5cdFx0dGhpcy53eXNpd3lnRG9jdW1lbnQuY2xvc2UoKTtcclxuXHJcblx0XHR0aGlzLnd5c2l3eWdCb2R5ID0gdGhpcy53eXNpd3lnRG9jdW1lbnQuYm9keSBhcyBIVE1MQm9keUVsZW1lbnQ7XHJcblx0XHR0aGlzLnd5c2l3eWdXaW5kb3cgPSB0aGlzLnd5c2l3eWdFZGl0b3IuY29udGVudFdpbmRvdztcclxuXHJcblx0XHR0aGlzLnJlYWRPbmx5KCEhdGhpcy5vcHRpb25zLnJlYWRPbmx5KTtcclxuXHJcblx0XHQvLyBpZnJhbWUgb3ZlcmZsb3cgZml4IGZvciBpT1NcclxuXHRcdGlmIChicm93c2VyLmlvcykge1xyXG5cdFx0XHRkb20uaGVpZ2h0KHRoaXMud3lzaXd5Z0JvZHksICcxMDAlJyk7XHJcblx0XHRcdGRvbS5vbih0aGlzLnd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBudWxsLCB0aGlzLmZvY3VzKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFiSW5kZXggPSBkb20uYXR0cih0aGlzLnRleHRhcmVhLCAndGFiaW5kZXgnKTtcclxuXHRcdGRvbS5hdHRyKHRoaXMuc291cmNlRWRpdG9yLCAndGFiaW5kZXgnLCB0YWJJbmRleCk7XHJcblx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHJcblx0XHR0aGlzLnJhbmdlSGVscGVyID0gbmV3IFJhbmdlSGVscGVyKHRoaXMud3lzaXd5Z1dpbmRvdywgbnVsbCwgdGhpcy5zYW5pdGl6ZSk7XHJcblxyXG5cdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRkb20uaGlkZSh0aGlzLnRleHRhcmVhKTtcclxuXHRcdHRoaXMudmFsKHRoaXMudGV4dGFyZWEudmFsdWUpO1xyXG5cclxuXHRcdGxldCBwbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlciB8fFxyXG5cdFx0XHRkb20uYXR0cih0aGlzLnRleHRhcmVhLCAncGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRpZiAocGxhY2Vob2xkZXIpIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3IucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy53eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpc2VzIG9wdGlvbnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdE9wdGlvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHQvLyBhdXRvLXVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXIgaWYgb3B0aW9uIHNldCB0byB0cnVlXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9VcGRhdGUpIHtcclxuXHRcdFx0ZG9tLm9uKHRoaXMud3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgdGhpcy5hdXRvVXBkYXRlKTtcclxuXHRcdFx0ZG9tLm9uKHRoaXMuc291cmNlRWRpdG9yLCAnYmx1cicsIG51bGwsIHRoaXMuYXV0b1VwZGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ydGwgPT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLnJ0bCA9IGRvbS5jc3ModGhpcy5zb3VyY2VFZGl0b3IsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ydGwoISF0aGlzLm9wdGlvbnMucnRsKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9FeHBhbmQpIHtcclxuXHRcdFx0Ly8gTmVlZCB0byB1cGRhdGUgd2hlbiBpbWFnZXMgKG9yIGFueXRoaW5nIGVsc2UpIGxvYWRzXHJcblx0XHRcdGRvbS5vbih0aGlzLnd5c2l3eWdCb2R5LCAnbG9hZCcsIG51bGwsIHRoaXMuYXV0b0V4cGFuZCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0XHRkb20ub24odGhpcy53eXNpd3lnQm9keSwgJ2lucHV0IGtleXVwJywgbnVsbCwgdGhpcy5hdXRvRXhwYW5kKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnJlc2l6ZUVuYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5pbml0UmVzaXplKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmF0dHIodGhpcy5lZGl0b3JDb250YWluZXIsICdpZCcsIHRoaXMub3B0aW9ucy5pZCk7XHJcblx0XHR0aGlzLmVtb3RpY29ucyh0aGlzLm9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGlzZXMgZXZlbnRzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRFdmVudHMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgZm9ybSA9IHRoaXNFZGl0b3IudGV4dGFyZWEuZm9ybTtcclxuXHRcdGxldCBjb21wb3NpdGlvbkV2ZW50cyA9ICdjb21wb3NpdGlvbnN0YXJ0IGNvbXBvc2l0aW9uZW5kJztcclxuXHRcdGxldCBldmVudHNUb0ZvcndhcmQgPSAna2V5ZG93biBrZXl1cCBrZXlwcmVzcyBmb2N1cyBibHVyIGNvbnRleHRtZW51IGlucHV0JztcclxuXHRcdGxldCBjaGVja1NlbGVjdGlvbkV2ZW50cyA9ICdvbnNlbGVjdGlvbmNoYW5nZScgaW4gdGhpc0VkaXRvci53eXNpd3lnRG9jdW1lbnQgP1xyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlJyA6XHJcblx0XHRcdCdrZXl1cCBmb2N1cyBibHVyIGNvbnRleHRtZW51IG1vdXNldXAgdG91Y2hlbmQgY2xpY2snO1xyXG5cclxuXHRcdGRvbS5vbihnbG9iYWxEb2MsICdjbGljaycsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRG9jdW1lbnRDbGljayk7XHJcblxyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdzdWJtaXQnLCBudWxsLCB0aGlzRWRpdG9yLnNldFRleHRhcmVhVmFsdWUsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub24od2luZG93LCAncGFnZWhpZGUnLCBudWxsLCB0aGlzRWRpdG9yLnNldFRleHRhcmVhVmFsdWUpO1xyXG5cdFx0ZG9tLm9uKHdpbmRvdywgJ3BhZ2VzaG93JywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlS2V5UHJlc3MpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXlkb3duJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5ZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlQmFja1NwYWNlKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCB0aGlzRWRpdG9yLmFwcGVuZE5ld0xpbmUpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRCbHVyKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCB0aGlzRWRpdG9yLnZhbHVlQ2hhbmdlZEtleVVwKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAncGFzdGUnLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZVBhc3RlRXZ0KTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAnY3V0IGNvcHknLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUN1dENvcHlFdnQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksIGNvbXBvc2l0aW9uRXZlbnRzLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUNvbXBvc2l0aW9uKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCBjaGVja1NlbGVjdGlvbkV2ZW50cywgbnVsbCwgdGhpc0VkaXRvci5jaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksIGV2ZW50c1RvRm9yd2FyZCwgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVFdmVudCk7XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3Iub3B0aW9ucy5lbW90aWNvbnNDb21wYXQgJiYgZ2xvYmFsV2luLmdldFNlbGVjdGlvbikge1xyXG5cdFx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci5lbW90aWNvbnNDaGVja1doaXRlc3BhY2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAnYmx1cicsIG51bGwsICgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzRWRpdG9yLnZhbCgpKSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdwbGFjZWhvbGRlcicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2ZvY3VzJywgbnVsbCwgKCkgPT4ge1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsICdibHVyJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRCbHVyKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnNvdXJjZUVkaXRvciwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsICdrZXlkb3duJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnNvdXJjZUVkaXRvciwgY29tcG9zaXRpb25FdmVudHMsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlQ29tcG9zaXRpb24pO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iuc291cmNlRWRpdG9yLCBldmVudHNUb0ZvcndhcmQsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRXZlbnQpO1xyXG5cclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgJ21vdXNlZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlTW91c2VEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgY2hlY2tTZWxlY3Rpb25FdmVudHMsIG51bGwsIHRoaXNFZGl0b3IuY2hlY2tTZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci5hcHBlbmROZXdMaW5lKTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgdGhpc0VkaXRvci5jaGVja05vZGVDaGFuZ2VkKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnLCBudWxsLCB0aGlzRWRpdG9yLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMpO1xyXG5cdFx0Ly8gQ3VzdG9tIGV2ZW50cyB0byBmb3J3YXJkXHJcblx0XHRkb20ub24oXHJcblx0XHRcdHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlZCB2YWx1ZWNoYW5nZWQgbm9kZWNoYW5nZWQgcGFzdGVyYXcgcGFzdGUnLFxyXG5cdFx0XHRudWxsLFxyXG5cdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUV2ZW50XHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHRvb2xiYXIgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIGNvbnRhaW5lclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0VG9vbEJhciA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yOiBhbnkgPSB0aGlzO1xyXG5cdFx0bGV0IGdyb3VwOiBhbnk7XHJcblx0XHRsZXQgY29tbWFuZHMgPSB0aGlzRWRpdG9yLmNvbW1hbmRzO1xyXG5cdFx0bGV0IGV4Y2x1ZGUgPSAodGhpc0VkaXRvci5vcHRpb25zLnRvb2xiYXJFeGNsdWRlIHx8ICcnKS5zcGxpdCgnLCcpO1xyXG5cdFx0bGV0IGdyb3VwcyA9IHRoaXNFZGl0b3Iub3B0aW9ucy50b29sYmFyLnNwbGl0KCd8Jyk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci50b29sYmFyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLXRvb2xiYXInLFxyXG5cdFx0XHR1bnNlbGVjdGFibGU6ICdvbidcclxuXHRcdH0pIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuaWNvbnMgaW4gRW1sRWRpdG9yLmljb25zKSB7XHJcblx0XHRcdHRoaXNFZGl0b3IuaWNvbnMgPSBuZXcgRW1sRWRpdG9yLmljb25zW3RoaXNFZGl0b3Iub3B0aW9ucy5pY29uc10oKTtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKGdyb3VwcywgKF8sIG1lbnVJdGVtcykgPT4ge1xyXG5cdFx0XHRncm91cCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWdyb3VwJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2gobWVudUl0ZW1zLnNwbGl0KCcsJyksIChfLCBjb21tYW5kTmFtZSkgPT4ge1xyXG5cdFx0XHRcdGxldCBidXR0b246IGFueSwgc2hvcnRjdXQsIGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kTmFtZV07XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBjb21tYW5kTmFtZSBtdXN0IGJlIGEgdmFsaWQgY29tbWFuZCBhbmQgbm90IGV4Y2x1ZGVkXHJcblx0XHRcdFx0aWYgKCFjb21tYW5kIHx8IGV4Y2x1ZGUuaW5kZXhPZihjb21tYW5kTmFtZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2hvcnRjdXQgPSBjb21tYW5kLnNob3J0Y3V0O1xyXG5cdFx0XHRcdGJ1dHRvbiA9IHRlbXBsYXRlcygndG9vbGJhckJ1dHRvbicsIHtcclxuXHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0ZGlzcE5hbWU6IHRoaXNFZGl0b3IudHJhbnNsYXRlKGNvbW1hbmQubmFtZSB8fFxyXG5cdFx0XHRcdFx0XHRjb21tYW5kLnRvb2x0aXAgfHwgY29tbWFuZE5hbWUpXHJcblx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXNFZGl0b3IuaWNvbnMgJiYgdGhpc0VkaXRvci5pY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0XHRcdGxldCBpY29uID0gdGhpc0VkaXRvci5pY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZSh0aGlzRWRpdG9yLmljb25zLmNyZWF0ZShjb21tYW5kTmFtZSksXHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRkb20uYWRkQ2xhc3MoYnV0dG9uLCAnaGFzLWljb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJ1dHRvbi5fZW1sVHh0TW9kZSA9ICEhY29tbWFuZC50eHRFeGVjO1xyXG5cdFx0XHRcdGJ1dHRvbi5fZW1sV3lzaXd5Z01vZGUgPSAhIWNvbW1hbmQuZXhlYztcclxuXHRcdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCAhY29tbWFuZC5leGVjKTtcclxuXHRcdFx0XHRkb20ub24oYnV0dG9uLCAnY2xpY2snLCBudWxsLCAoZTogRXZlbnQpID0+IHtcclxuXHRcdFx0XHRcdGlmICghZG9tLmhhc0NsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJykpIHtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci5oYW5kbGVDb21tYW5kKGJ1dHRvbiwgY29tbWFuZCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci51cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly8gUHJldmVudCBlZGl0b3IgbG9zaW5nIGZvY3VzIHdoZW4gYnV0dG9uIGNsaWNrZWRcclxuXHRcdFx0XHRkb20ub24oYnV0dG9uLCAnbW91c2Vkb3duJywgbnVsbCwgKGU6IEV2ZW50KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmNsb3NlRHJvcERvd24oKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbW1hbmQudG9vbHRpcCkge1xyXG5cdFx0XHRcdFx0ZG9tLmF0dHIoYnV0dG9uLCAndGl0bGUnLFxyXG5cdFx0XHRcdFx0XHR0aGlzRWRpdG9yLnRyYW5zbGF0ZShjb21tYW5kLnRvb2x0aXApICtcclxuXHRcdFx0XHRcdFx0KHNob3J0Y3V0ID8gJyAoJyArIHNob3J0Y3V0ICsgJyknIDogJycpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNob3J0Y3V0KSB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmFkZFNob3J0Y3V0KHNob3J0Y3V0LCBjb21tYW5kTmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY29tbWFuZC5zdGF0ZSkge1xyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci5idG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuc3RhdGVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gZXhlYyBzdHJpbmcgY29tbWFuZHMgY2FuIGJlIHBhc3NlZCB0byBxdWVyeUNvbW1hbmRTdGF0ZVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY29tbWFuZC5leGVjKSkge1xyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci5idG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuZXhlY1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZ3JvdXAsIGJ1dHRvbik7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50b29sYmFyQnV0dG9uc1tjb21tYW5kTmFtZV0gPSBidXR0b247XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXhjbHVkZSBlbXB0eSBncm91cHNcclxuXHRcdFx0aWYgKGdyb3VwLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpc0VkaXRvci50b29sYmFyLCBncm91cCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFwcGVuZCB0aGUgdG9vbGJhciB0byB0aGUgdG9vbGJhckNvbnRhaW5lciBvcHRpb24gaWYgZ2l2ZW5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzRWRpdG9yLm9wdGlvbnMudG9vbGJhckNvbnRhaW5lciB8fCB0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgdGhpc0VkaXRvci50b29sYmFyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSByZXNpemVyLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0UmVzaXplID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IG1pbkhlaWdodDogYW55LCBtYXhIZWlnaHQ6IGFueSwgbWluV2lkdGg6IGFueSwgbWF4V2lkdGg6IGFueSwgbW91c2VNb3ZlRnVuYzogYW55LCBtb3VzZVVwRnVuYzogYW55LCBncmlwID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWdyaXAnXHJcblx0XHR9KSxcclxuXHRcdFx0Ly8gQ292ZXIgaXMgdXNlZCB0byBjb3ZlciB0aGUgZWRpdG9yIGlmcmFtZSBzbyBkb2N1bWVudFxyXG5cdFx0XHQvLyBzdGlsbCBnZXRzIG1vdXNlIG1vdmUgZXZlbnRzXHJcblx0XHRcdGNvdmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItcmVzaXplLWNvdmVyJ1xyXG5cdFx0XHR9KSwgbW92ZUV2ZW50cyA9ICd0b3VjaG1vdmUgbW91c2Vtb3ZlJywgZW5kRXZlbnRzID0gJ3RvdWNoY2FuY2VsIHRvdWNoZW5kIG1vdXNldXAnLCBzdGFydFggPSAwLCBzdGFydFkgPSAwLCBuZXdYID0gMCwgbmV3WSA9IDAsIHN0YXJ0V2lkdGggPSAwLCBzdGFydEhlaWdodCA9IDAsIG9yaWdXaWR0aCA9IGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lciksIG9yaWdIZWlnaHQgPSBkb20uaGVpZ2h0KHRoaXMuZWRpdG9yQ29udGFpbmVyKSwgaXNEcmFnZ2luZyA9IGZhbHNlLCBydGwgPSB0aGlzLnJ0bCgpO1xyXG5cclxuXHRcdG1pbkhlaWdodCA9IHRoaXMub3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgb3JpZ0hlaWdodCAvIDEuNTtcclxuXHRcdG1heEhlaWdodCA9IHRoaXMub3B0aW9ucy5yZXNpemVNYXhIZWlnaHQgfHwgb3JpZ0hlaWdodCAqIDIuNTtcclxuXHRcdG1pbldpZHRoID0gdGhpcy5vcHRpb25zLnJlc2l6ZU1pbldpZHRoIHx8IG9yaWdXaWR0aCAvIDEuMjU7XHJcblx0XHRtYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5yZXNpemVNYXhXaWR0aCB8fCBvcmlnV2lkdGggKiAxLjI1O1xyXG5cclxuXHRcdG1vdXNlTW92ZUZ1bmMgPSAoZTogRXZlbnQpID0+IHtcclxuXHRcdFx0Ly8gaU9TIHVzZXMgd2luZG93LmV2ZW50XHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcblx0XHRcdFx0bGV0IHRvdWNoRXZlbnQgPSAoZSBhcyBUb3VjaEV2ZW50KTtcclxuXHRcdFx0XHRuZXdYID0gdG91Y2hFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRuZXdZID0gdG91Y2hFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgbW91c2VFdmVudCA9IChlIGFzIE1vdXNlRXZlbnQpO1xyXG5cdFx0XHRcdG5ld1ggPSBtb3VzZUV2ZW50LnBhZ2VYO1xyXG5cdFx0XHRcdG5ld1kgPSBtb3VzZUV2ZW50LnBhZ2VZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgbmV3SGVpZ2h0ID0gc3RhcnRIZWlnaHQgKyAobmV3WSAtIHN0YXJ0WSksIG5ld1dpZHRoID0gcnRsID9cclxuXHRcdFx0XHRzdGFydFdpZHRoIC0gKG5ld1ggLSBzdGFydFgpIDpcclxuXHRcdFx0XHRzdGFydFdpZHRoICsgKG5ld1ggLSBzdGFydFgpO1xyXG5cclxuXHRcdFx0aWYgKG1heFdpZHRoID4gMCAmJiBuZXdXaWR0aCA+IG1heFdpZHRoKSB7XHJcblx0XHRcdFx0bmV3V2lkdGggPSBtYXhXaWR0aDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobWluV2lkdGggPiAwICYmIG5ld1dpZHRoIDwgbWluV2lkdGgpIHtcclxuXHRcdFx0XHRuZXdXaWR0aCA9IG1pbldpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoKSB7XHJcblx0XHRcdFx0bmV3V2lkdGggPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChtYXhIZWlnaHQgPiAwICYmIG5ld0hlaWdodCA+IG1heEhlaWdodCkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IG1heEhlaWdodDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobWluSGVpZ2h0ID4gMCAmJiBuZXdIZWlnaHQgPCBtaW5IZWlnaHQpIHtcclxuXHRcdFx0XHRuZXdIZWlnaHQgPSBtaW5IZWlnaHQ7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobmV3V2lkdGggfHwgbmV3SGVpZ2h0KSB7XHJcblx0XHRcdFx0dGhpcy5kaW1lbnNpb25zKG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG1vdXNlVXBGdW5jID0gKGU6IEV2ZW50KSA9PiB7XHJcblx0XHRcdGlmICghaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0ZG9tLmhpZGUoY292ZXIpO1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbnVsbCwgbW91c2VNb3ZlRnVuYyk7XHJcblx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG51bGwsIG1vdXNlVXBGdW5jKTtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbnMgJiYgdGhpcy5pY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0bGV0IGljb24gPSB0aGlzLmljb25zLmNyZWF0ZSgnZ3JpcCcpO1xyXG5cdFx0XHRpZiAoaWNvbikge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChncmlwLCBpY29uKTtcclxuXHRcdFx0XHRkb20uYWRkQ2xhc3MoZ3JpcCwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5lZGl0b3JDb250YWluZXIsIGdyaXApO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBjb3Zlcik7XHJcblx0XHRkb20uaGlkZShjb3Zlcik7XHJcblxyXG5cdFx0ZG9tLm9uKGdyaXAsICd0b3VjaHN0YXJ0IG1vdXNlZG93bicsIG51bGwsIChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHQvLyBpT1MgdXNlcyB3aW5kb3cuZXZlbnRcclxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcblx0XHRcdFx0bGV0IHRlID0gZSBhcyBUb3VjaEV2ZW50O1xyXG5cdFx0XHRcdHN0YXJ0WCA9IHRlLnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0c3RhcnRZID0gdGUudG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgbWUgPSBlIGFzIE1vdXNlRXZlbnRcclxuXHRcdFx0XHRzdGFydFggPSBtZS5wYWdlWDtcclxuXHRcdFx0XHRzdGFydFkgPSBtZS5wYWdlWTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RhcnRXaWR0aCA9IGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdHN0YXJ0SGVpZ2h0ID0gZG9tLmhlaWdodCh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdGlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAncmVzaXppbmcnKTtcclxuXHRcdFx0ZG9tLnNob3coY292ZXIpO1xyXG5cdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbERvYywgZW5kRXZlbnRzLCBudWxsLCBtb3VzZVVwRnVuYyk7XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQcmVmaXhlcyBhbmQgcHJlbG9hZHMgdGhlIGVtb3RpY29uIGltYWdlc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0RW1vdGljb25zID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IGVtb3RpY29ucyA9IHRoaXMub3B0aW9ucy5lbW90aWNvbnM7XHJcblx0XHRsZXQgcm9vdCA9IHRoaXMub3B0aW9ucy5lbW90aWNvbnNSb290IHx8ICcnO1xyXG5cclxuXHRcdGlmIChlbW90aWNvbnMpIHtcclxuXHRcdFx0dGhpcy5hbGxFbW90aWNvbnMgPSB1dGlscy5leHRlbmQoXHJcblx0XHRcdFx0e30sIGVtb3RpY29ucy5tb3JlLCBlbW90aWNvbnMuZHJvcGRvd24sIGVtb3RpY29ucy5oaWRkZW5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKHRoaXMuYWxsRW1vdGljb25zLCAoa2V5LCB1cmwpID0+IHtcclxuXHRcdFx0dGhpc0VkaXRvci5hbGxFbW90aWNvbnNba2V5XSA9IHRlbXBsYXRlcygnZW1vdGljb24nLCB7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0Ly8gUHJlZml4IGVtb3RpY29uIHJvb3QgdG8gZW1vdGljb24gdXJsc1xyXG5cdFx0XHRcdHVybDogcm9vdCArICh1cmwudXJsIHx8IHVybCksXHJcblx0XHRcdFx0dG9vbHRpcDogdXJsLnRvb2x0aXAgfHwga2V5XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUHJlbG9hZCB0aGUgZW1vdGljb25cclxuXHRcdFx0aWYgKHRoaXNFZGl0b3Iub3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5wcmVMb2FkQ2FjaGUucHVzaChkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiByb290ICsgKHVybC51cmwgfHwgdXJsKVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXV0b2ZvY3VzIHRoZSBlZGl0b3JcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b2ZvY3VzID0gKGZvY3VzRW5kOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGxldCByYW5nZSwgdHh0UG9zO1xyXG5cdFx0bGV0IG5vZGUgPSB0aGlzLnd5c2l3eWdCb2R5LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0Ly8gQ2FuJ3QgZm9jdXMgaW52aXNpYmxlIGVsZW1lbnRzXHJcblx0XHRpZiAoIWRvbS5pc1Zpc2libGUodGhpcy5lZGl0b3JDb250YWluZXIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0dHh0UG9zID0gZm9jdXNFbmQgPyB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZS5sZW5ndGggOiAwO1xyXG5cclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2V0U2VsZWN0aW9uUmFuZ2UodHh0UG9zLCB0eHRQb3MpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRsZXQgbGFzdENoaWxkID0gdGhpcy53eXNpd3lnQm9keS5sYXN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGlmICghKG5vZGUgPSBsYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0bm9kZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHRoaXMud3lzaXd5Z0RvY3VtZW50KSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy53eXNpd3lnQm9keSwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChub2RlLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdG5vZGUgPSBub2RlLmxhc3RDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRcdFx0Ly8gU2hvdWxkIHBsYWNlIHRoZSBjdXJzb3IgYmVmb3JlIHRoZSBsYXN0IDxicj5cclxuXHRcdFx0XHRpZiAoZG9tLmlzKG5vZGUsICdicicpICYmIG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmFuZ2UgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRcdGlmICghZG9tLmNhbkhhdmVDaGlsZHJlbihub2RlKSkge1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShub2RlKTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0QWZ0ZXIobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZS5jb2xsYXBzZSghZm9jdXNFbmQpO1xyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XHJcblx0XHR0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSByYW5nZTtcclxuXHJcblx0XHRpZiAoZm9jdXNFbmQpIHtcclxuXHRcdFx0dGhpcy53eXNpd3lnQm9keS5zY3JvbGxUb3AgPSB0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbEhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXV0b2V4cGFuZFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b0V4cGFuZCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b0V4cGFuZCAmJiAhdGhpcy5hdXRvRXhwYW5kVGhyb3R0bGUpIHtcclxuXHRcdFx0dGhpcy5hdXRvRXhwYW5kVGhyb3R0bGUgPSBzZXRUaW1lb3V0KHRoaXMuZXhwYW5kVG9Db250ZW50LCAyMDApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYW55IGRvY3VtZW50IGNsaWNrIGFuZCBjbG9zZXMgdGhlIGRyb3Bkb3duIGlmIG9wZW5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlRG9jdW1lbnRDbGljayA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHQvLyBpZ25vcmUgcmlnaHQgY2xpY2tzXHJcblx0XHRpZiAoZS53aGljaCAhPT0gMyAmJiB0aGlzLmRyb3Bkb3duICYmICFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuXHRcdFx0dGhpcy5hdXRvVXBkYXRlKCk7XHJcblxyXG5cdFx0XHR0aGlzLmNsb3NlRHJvcERvd24oKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgY3V0ICYgY29weSBldmVudHNcclxuXHQgKlxyXG5cdCAqIEJ5IGRlZmF1bHQgYnJvd3NlcnMgYWxzbyBjb3B5IGluaGVyaXRlZCBzdHlsaW5nIGZyb20gdGhlIHN0eWxlc2hlZXQgYW5kXHJcblx0ICogYnJvd3NlciBkZWZhdWx0IHN0eWxpbmcgd2hpY2ggaXMgdW5uZWNlc3NhcnkuXHJcblx0ICpcclxuXHQgKiBUaGlzIHdpbGwgaWdub3JlIGluaGVyaXRlZCBzdHlsZXMgYW5kIG9ubHkgY29weSBpbmxpbmUgc3R5bGluZy5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlQ3V0Q29weUV2dCA9IChlOiBDbGlwYm9hcmRFdmVudCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHJhbmdlID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0bGV0IGNvbnRhaW5lciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRsZXQgZmlyc3RQYXJlbnQ7XHJcblxyXG5cdFx0XHQvLyBDb3B5IGFsbCBpbmxpbmUgcGFyZW50IG5vZGVzIHVwIHRvIHRoZSBmaXJzdCBibG9jayBwYXJlbnQgc28gY2FuXHJcblx0XHRcdC8vIGNvcHkgaW5saW5lIHN0eWxlc1xyXG5cdFx0XHRsZXQgcGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRcdFx0XHRsZXQgY2xvbmUgPSBwYXJlbnQuY2xvbmVOb2RlKCkgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNsb25lLCBjb250YWluZXIuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRhaW5lciwgY2xvbmUpO1xyXG5cdFx0XHRcdFx0Zmlyc3RQYXJlbnQgPSBmaXJzdFBhcmVudCB8fCBjbG9uZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChmaXJzdFBhcmVudCB8fCBjb250YWluZXIsIHJhbmdlLmNsb25lQ29udGVudHMoKSk7XHJcblx0XHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9odG1sJywgY29udGFpbmVyLmlubmVySFRNTCk7XHJcblxyXG5cdFx0XHQvLyBUT0RPOiBSZWZhY3RvciBpbnRvIHByaXZhdGUgc2hhcmVkIG1vZHVsZSB3aXRoIHBsYWludGV4dCBwbHVnaW5cclxuXHRcdFx0Ly8gaW5uZXJUZXh0IGFkZHMgdHdvIG5ld2xpbmVzIGFmdGVyIDxwPiB0YWdzIHNvIGNvbnZlcnQgdGhlbSB0b1xyXG5cdFx0XHQvLyA8ZGl2PiB0YWdzXHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAncCcpLCAoXywgZWxtKSA9PiB7XHJcblx0XHRcdFx0ZG9tLmNvbnZlcnRFbGVtZW50KGVsbSwgJ2RpdicpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8gUmVtb3ZlIGNvbGxhcHNlZCA8YnI+IHRhZ3MgYXMgaW5uZXJUZXh0IGNvbnZlcnRzIHRoZW0gdG8gbmV3bGluZXNcclxuXHRcdFx0dXRpbHMuZWFjaChkb20uZmluZChjb250YWluZXIsICdicicpLCAoXywgZWxtKSA9PiB7XHJcblx0XHRcdFx0aWYgKCFlbG0ubmV4dFNpYmxpbmcgfHwgIWRvbS5pc0lubGluZShlbG0ubmV4dFNpYmxpbmcsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRkb20ucmVtb3ZlKGVsbSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIHJhbmdlLnRvU3RyaW5nKCkgZG9lc24ndCBpbmNsdWRlIG5ld2xpbmVzIHNvIGNhbid0IHVzZSB0aGlzLlxyXG5cdFx0XHQvLyBzZWxlY3Rpb24udG9TdHJpbmcoKSBzZWVtcyB0byB1c2UgdGhlIHNhbWUgbWV0aG9kIGFzIGlubmVyVGV4dFxyXG5cdFx0XHQvLyBidXQgbmVlZHMgdG8gYmUgbm9ybWFsaXNlZCBmaXJzdCBzbyB1c2luZyBjb250YWluZXIuaW5uZXJUZXh0XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzLnd5c2l3eWdCb2R5LCBjb250YWluZXIpO1xyXG5cdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIGNvbnRhaW5lci5pbm5lclRleHQpO1xyXG5cdFx0XHRkb20ucmVtb3ZlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRpZiAoZS50eXBlID09PSAnY3V0Jykge1xyXG5cdFx0XHRcdHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgcGFzdGUgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlUGFzdGVFdnQgPSAoZTogQ2xpcGJvYXJkRXZlbnQpOiB2b2lkID0+IHtcclxuXHRcdGNvbnN0IElNQUdFX01JTUVfUkVHRVg6IFJlZ0V4cCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblx0XHRsZXQgZWRpdG9yQ29udGV4dCA9IHRoaXM7XHJcblx0XHRsZXQgZWRpdGFibGUgPSBlZGl0b3JDb250ZXh0Lnd5c2l3eWdCb2R5O1xyXG5cdFx0bGV0IGNsaXBib2FyZCA9IGUuY2xpcGJvYXJkRGF0YTtcclxuXHRcdGxldCBsb2FkSW1hZ2UgPSAoZmlsZTogYW55KSA9PiB7XHJcblx0XHRcdGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRyZWFkZXIub25sb2FkID0gKGU6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGVkaXRvckNvbnRleHQuaGFuZGxlUGFzdGVEYXRhKHtcclxuXHRcdFx0XHRcdGh0bWw6ICc8aW1nIHNyYz1cIicgKyBlLnRhcmdldC5yZXN1bHQgKyAnXCIgLz4nXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBNb2Rlcm4gYnJvd3NlcnMgd2l0aCBjbGlwYm9hcmQgQVBJIC0gZXZlcnl0aGluZyBvdGhlciB0aGFuIF92ZXJ5X1xyXG5cdFx0Ly8gb2xkIGFuZHJvaWQgd2ViIHZpZXdzIGFuZCBVQyBicm93c2VyIHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCB0aGVcclxuXHRcdC8vIHBhc3RlIGV2ZW50IGF0IGFsbC5cclxuXHRcdGlmIChjbGlwYm9hcmQpIHtcclxuXHRcdFx0bGV0IGRhdGE6IGFueSA9IFtdO1xyXG5cdFx0XHRsZXQgdHlwZXMgPSBjbGlwYm9hcmQudHlwZXM7XHJcblx0XHRcdGxldCBpdGVtcyA9IGNsaXBib2FyZC5pdGVtcztcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHQvLyBXb3JkIHNvbWV0aW1lcyBhZGRzIGNvcGllZCB0ZXh0IGFzIGFuIGltYWdlIHNvIGlmIEhUTUxcclxuXHRcdFx0XHQvLyBleGlzdHMgcHJlZmVyIHRoYXQgb3ZlciBpbWFnZXNcclxuXHRcdFx0XHRpZiAodHlwZXMuaW5kZXhPZigndGV4dC9odG1sJykgPCAwKSB7XHJcblx0XHRcdFx0XHQvLyBOb3JtYWxpc2UgaW1hZ2UgcGFzdGluZyB0byBwYXN0ZSBhcyBhIGRhdGEtdXJpXHJcblx0XHRcdFx0XHRpZiAoZ2xvYmFsV2luLkZpbGVSZWFkZXIgJiYgaXRlbXMgJiZcclxuXHRcdFx0XHRcdFx0SU1BR0VfTUlNRV9SRUdFWC50ZXN0KGl0ZW1zW2ldLnR5cGUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBsb2FkSW1hZ2UoY2xpcGJvYXJkLml0ZW1zW2ldLmdldEFzRmlsZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGF0YVt0eXBlc1tpXV0gPSBjbGlwYm9hcmQuZ2V0RGF0YSh0eXBlc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ2FsbCBwbHVnaW5zIGhlcmUgd2l0aCBmaWxlP1xyXG5cdFx0XHRkYXRhLnRleHQgPSBkYXRhWyd0ZXh0L3BsYWluJ107XHJcblx0XHRcdGRhdGEuaHRtbCA9IHRoaXMuc2FuaXRpemUoZGF0YVsndGV4dC9odG1sJ10pO1xyXG5cclxuXHRcdFx0dGhpcy5oYW5kbGVQYXN0ZURhdGEoZGF0YSk7XHJcblx0XHRcdC8vIElmIGNvbnRlbnRzRnJhZ21lbnQgZXhpc3RzIHRoZW4gd2UgYXJlIGFscmVhZHkgd2FpdGluZyBmb3IgYVxyXG5cdFx0XHQvLyBwcmV2aW91cyBwYXN0ZSBzbyBsZXQgdGhlIGhhbmRsZXIgZm9yIHRoYXQgaGFuZGxlIHRoaXMgb25lIHRvb1xyXG5cdFx0fSBlbHNlIGlmICghdGhpcy5wYXN0ZUNvbnRlbnRGcmFnbWVudCkge1xyXG5cdFx0XHQvLyBTYXZlIHRoZSBzY3JvbGwgcG9zaXRpb24gc28gY2FuIGJlIHJlc3RvcmVkXHJcblx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0bGV0IHNjcm9sbFRvcCA9IGVkaXRhYmxlLnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblxyXG5cdFx0XHR0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50ID0gZ2xvYmFsRG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHRcdFx0d2hpbGUgKGVkaXRhYmxlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5wYXN0ZUNvbnRlbnRGcmFnbWVudCwgZWRpdGFibGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGxldCBodG1sID0gZWRpdGFibGUuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdGFibGUsIHRoaXMucGFzdGVDb250ZW50RnJhZ21lbnQpO1xyXG5cdFx0XHRcdGVkaXRhYmxlLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuXHRcdFx0XHR0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdHRoaXMucmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdHRoaXMuaGFuZGxlUGFzdGVEYXRhKHsgaHRtbDogdGhpcy5zYW5pdGl6ZShodG1sKSB9KTtcclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgYW55IGVtb3RpY29uIGNvZGVzIGluIHRoZSBwYXNzZWQgSFRNTFxyXG5cdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlcGxhY2VFbW90aWNvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQpIHtcclxuXHRcdFx0ZW1vdGljb25zXHJcblx0XHRcdFx0LnJlcGxhY2UodGhpcy53eXNpd3lnQm9keSwgdGhpcy5hbGxFbW90aWNvbnMsIHRoaXMub3B0aW9ucy5lbW90aWNvbnNDb21wYXQpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHNlbGVjdGVkIHRleHQgb2YgdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zb3VyY2VFZGl0b3IudmFsdWUuc3Vic3RyaW5nKFxyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCxcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kXHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIHBhc3NlZCBjb21tYW5kXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUNvbW1hbmQgPSAoY2FsbGVyOiBhbnksIGNtZDogYW55KTogdm9pZCA9PiB7XHJcblx0XHQvLyBjaGVjayBpZiBpbiB0ZXh0IG1vZGUgYW5kIGhhbmRsZSB0ZXh0IGNvbW1hbmRzXHJcblx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRpZiAoY21kLnR4dEV4ZWMpIHtcclxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjbWQudHh0RXhlYykpIHtcclxuXHRcdFx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dC5hcHBseSh0aGlzLCBjbWQudHh0RXhlYyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNtZC50eHRFeGVjLmNhbGwodGhpcywgY2FsbGVyLCB0aGlzLnNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY21kLmV4ZWMpIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oY21kLmV4ZWMpKSB7XHJcblx0XHRcdFx0Y21kLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoXHJcblx0XHRcdFx0XHRjbWQuZXhlYyxcclxuXHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjbWQsICdleGVjUGFyYW0nKSA/IGNtZC5leGVjUGFyYW0gOiBudWxsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBXcmFwIGlubGluZXMgdGhhdCBhcmUgaW4gdGhlIHJvb3QgaW4gcGFyYWdyYXBocy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcblx0ICogQHBhcmFtIHtEb2N1bWVudH0gZG9jXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHdyYXBJbmxpbmVzID0gKGJvZHk6IEhUTUxCb2R5RWxlbWVudCwgZG9jOiBEb2N1bWVudCkgPT4ge1xyXG5cdFx0bGV0IHdyYXBwZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdGRvbS50cmF2ZXJzZShib2R5LCAobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKGRvbS5pc0lubGluZShub2RlLCB0cnVlKSkge1xyXG5cdFx0XHRcdC8vIElnbm9yZSB0ZXh0IG5vZGVzIHVubGVzcyB0aGV5IGNvbnRhaW4gbm9uLXdoaXRlc3BhY2UgY2hhcnMgYXNcclxuXHRcdFx0XHQvLyB3aGl0ZXNwYWNlIHdpbGwgYmUgY29sbGFwc2VkLlxyXG5cdFx0XHRcdC8vIElnbm9yZSBlbWxlZGl0b3ItaWdub3JlIGVsZW1lbnRzIHVubGVzcyB3cmFwcGluZyBzaWJsaW5nc1xyXG5cdFx0XHRcdC8vIFNob3VsZCBzdGlsbCB3cmFwIGJvdGggaWYgd3JhcHBpbmcgc2libGluZ3MuXHJcblx0XHRcdFx0aWYgKHdyYXBwZXIgfHwgbm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSA/XHJcblx0XHRcdFx0XHQvXFxTLy50ZXN0KG5vZGUubm9kZVZhbHVlKSA6ICFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRcdGlmICghd3JhcHBlcikge1xyXG5cdFx0XHRcdFx0XHR3cmFwcGVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZSh3cmFwcGVyLCBub2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3JhcHBlciwgbm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHdyYXBwZXIgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9LCBmYWxzZSwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdCAqIHRoZSBzZWxlY3Rpb25jaGFuZ2VkIGV2ZW50IGlmIGl0IGhhcy5cclxuXHQgKlxyXG5cdCAqIEluIGJyb3dzZXJzIG90aGVyIHRoYXQgZG9uJ3Qgc3VwcG9ydCBzZWxlY3Rpb25jaGFuZ2UgZXZlbnQgaXQgd2lsbCBjaGVja1xyXG5cdCAqIGF0IG1vc3Qgb25jZSBldmVyeSAxMDBtcy5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tTZWxlY3Rpb25DaGFuZ2VkID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IGNoZWNrID0gKCkgPT4ge1xyXG5cdFx0XHQvLyBEb24ndCBjcmVhdGUgbmV3IHNlbGVjdGlvbiBpZiB0aGVyZSBpc24ndCBvbmUgKGxpa2UgYWZ0ZXJcclxuXHRcdFx0Ly8gYmx1ciBldmVudCBpbiBpT1MpXHJcblx0XHRcdGlmICh0aGlzRWRpdG9yLnd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkgJiZcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkucmFuZ2VDb3VudCA8PSAwKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcclxuXHRcdFx0XHQvLyByYW5nZUhlbHBlciBjb3VsZCBiZSBudWxsIGlmIGVkaXRvciB3YXMgZGVzdHJveWVkXHJcblx0XHRcdFx0Ly8gYmVmb3JlIHRoZSB0aW1lb3V0IGhhZCBmaW5pc2hlZFxyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXNFZGl0b3IucmFuZ2VIZWxwZXIgJiYgIXRoaXNFZGl0b3IucmFuZ2VIZWxwZXIuY29tcGFyZSh0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24pKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uID0gdGhpc0VkaXRvci5yYW5nZUhlbHBlci5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoZSBzZWxlY3Rpb24gaXMgaW4gYW4gaW5saW5lIHdyYXAgaXQgaW4gYSBibG9jay5cclxuXHRcdFx0XHQvLyBGaXhlcyAjMzMxXHJcblx0XHRcdFx0aWYgKHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbiAmJiB0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24uY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0XHRsZXQgcGFyZW50ID0gdGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uLnN0YXJ0Q29udGFpbmVyO1xyXG5cdFx0XHRcdFx0bGV0IG9mZnNldCA9IHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbi5zdGFydE9mZnNldDtcclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0aWYgKG9mZnNldCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcclxuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LmNoaWxkTm9kZXNbb2Zmc2V0XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR3aGlsZSAocGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSB0aGlzRWRpdG9yLnd5c2l3eWdCb2R5KSB7XHJcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci53cmFwSW5saW5lcyh0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCB0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRcdHRoaXNFZGl0b3IucmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20udHJpZ2dlcih0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc0VkaXRvci5pc1NlbGVjdGlvbkNoZWNrUGVuZGluZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzRWRpdG9yLmlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBEb24ndCBuZWVkIHRvIGxpbWl0IGNoZWNraW5nIGlmIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFNlbGVjdGlvbiBBUElcclxuXHRcdGlmICgnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHRoaXNFZGl0b3Iud3lzaXd5Z0RvY3VtZW50KSB7XHJcblx0XHRcdGNoZWNrKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGNoZWNrLCAxMDApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYW55IGtleSBwcmVzcyBpbiB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVLZXlQcmVzcyA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHQvLyBGRiBidWc6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTUwMTQ5NlxyXG5cdFx0aWYgKGUuZGVmYXVsdFByZXZlbnRlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jbG9zZURyb3BEb3duKCk7XHJcblxyXG5cdFx0Ly8gMTMgPSBlbnRlciBrZXlcclxuXHRcdGlmIChlLndoaWNoID09PSAxMykge1xyXG5cdFx0XHRsZXQgTElTVF9UQUdTID0gJ2xpLHVsLG9sJztcclxuXHJcblx0XHRcdC8vIFwiRml4XCIgKGNsdWRnZSkgZm9yIGJsb2NrbGV2ZWwgZWxlbWVudHMgYmVpbmcgZHVwbGljYXRlZCBpbiBzb21lXHJcblx0XHRcdC8vIGJyb3dzZXJzIHdoZW4gZW50ZXIgaXMgcHJlc3NlZCBpbnN0ZWFkIG9mIGluc2VydGluZyBhIG5ld2xpbmVcclxuXHRcdFx0aWYgKCFkb20uaXModGhpcy5jdXJyZW50QmxvY2tOb2RlLCBMSVNUX1RBR1MpICYmXHJcblx0XHRcdFx0ZG9tLmhhc1N0eWxpbmcodGhpcy5jdXJyZW50QmxvY2tOb2RlKSkge1xyXG5cclxuXHRcdFx0XHRsZXQgYnIgPSBkb20uY3JlYXRlRWxlbWVudCgnYnInLCB7fSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuaW5zZXJ0Tm9kZShicik7XHJcblxyXG5cdFx0XHRcdC8vIExhc3QgPGJyPiBvZiBhIGJsb2NrIHdpbGwgYmUgY29sbGFwc2VkICBzbyBuZWVkIHRvIG1ha2Ugc3VyZVxyXG5cdFx0XHRcdC8vIHRoZSA8YnI+IHRoYXQgd2FzIGluc2VydGVkIGlzbid0IHRoZSBsYXN0IG5vZGUgb2YgYSBibG9jay5cclxuXHRcdFx0XHRsZXQgcGFyZW50ID0gYnIucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRsZXQgbGFzdENoaWxkID0gcGFyZW50Lmxhc3RDaGlsZCBhcyBhbnk7XHJcblxyXG5cdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxyXG5cdFx0XHRcdGlmIChsYXN0Q2hpbGQgJiYgbGFzdENoaWxkLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFICYmXHJcblx0XHRcdFx0XHRsYXN0Q2hpbGQubm9kZVZhbHVlID09PSAnJykge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0bGFzdENoaWxkID0gcGFyZW50Lmxhc3RDaGlsZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgQlIgb2YgYSBibG9jayBhbmQgdGhlIHByZXZpb3VzXHJcblx0XHRcdFx0Ly8gc2libGluZyBpcyBpbmxpbmUgdGhlbiB3aWxsIG5lZWQgYW4gZXh0cmEgQlIuIFRoaXNcclxuXHRcdFx0XHQvLyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgbGFzdCBCUiBvZiBhIGJsb2NrIHdpbGwgYmVcclxuXHRcdFx0XHQvLyBjb2xsYXBzZWQuIEZpeGVzIGlzc3VlICMyNDhcclxuXHRcdFx0XHRpZiAoIWRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpICYmIGxhc3RDaGlsZCA9PT0gYnIgJiZcclxuXHRcdFx0XHRcdGRvbS5pc0lubGluZShici5wcmV2aW91c1NpYmxpbmcpKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJhbmdlSGVscGVyLmluc2VydEhUTUwoJzxicj4nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIHN1cmUgdGhhdCBpZiB0aGVyZSBpcyBhIGNvZGUgb3IgcXVvdGUgdGFnIGF0IHRoZVxyXG5cdCAqIGVuZCBvZiB0aGUgZWRpdG9yLCB0aGF0IHRoZXJlIGlzIGEgbmV3IGxpbmUgYWZ0ZXIgaXQuXHJcblx0ICpcclxuXHQgKiBJZiB0aGVyZSB3YXNuJ3QgYSBuZXcgbGluZSBhdCB0aGUgZW5kIHlvdSB3b3VsZG4ndCBiZSBhYmxlXHJcblx0ICogdG8gZW50ZXIgYW55IHRleHQgYWZ0ZXIgYSBjb2RlL3F1b3RlIHRhZ1xyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGFwcGVuZE5ld0xpbmUgPSAoKTogdm9pZCA9PiB7XHJcblx0XHQvLyBDaGVjayBhbGwgbm9kZXMgaW4gcmV2ZXJzZSB1bnRpbCBlaXRoZXIgYWRkIGEgbmV3IGxpbmVcclxuXHRcdC8vIG9yIHJlYWNoIGEgbm9uLWVtcHR5IHRleHRub2RlIG9yIEJSIGF0IHdoaWNoIHBvaW50IGNhblxyXG5cdFx0Ly8gc3RvcCBjaGVja2luZy5cclxuXHRcdGRvbS5yVHJhdmVyc2UodGhpcy53eXNpd3lnQm9keSwgKG5vZGU6IGFueSkgPT4ge1xyXG5cdFx0XHQvLyBMYXN0IGJsb2NrLCBhZGQgbmV3IGxpbmUgYWZ0ZXIgaWYgaGFzIHN0eWxpbmdcclxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiZcclxuXHRcdFx0XHQhL2lubGluZS8udGVzdChkb20uY3NzKG5vZGUsICdkaXNwbGF5JykpKSB7XHJcblxyXG5cdFx0XHRcdC8vIEFkZCBsaW5lIGJyZWFrIGFmdGVyIGlmIGhhcyBzdHlsaW5nXHJcblx0XHRcdFx0aWYgKCFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItbmxmJykgJiYgZG9tLmhhc1N0eWxpbmcobm9kZSkpIHtcclxuXHRcdFx0XHRcdGxldCBwYXJhZ3JhcGggPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRwYXJhZ3JhcGguY2xhc3NOYW1lID0gJ2VtbGVkaXRvci1ubGYnO1xyXG5cdFx0XHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9ICc8YnIgLz4nO1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0JvZHksIHBhcmFncmFwaCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBMYXN0IG5vbi1lbXB0eSB0ZXh0IG5vZGUgb3IgbGluZSBicmVhay5cclxuXHRcdFx0Ly8gTm8gbmVlZCB0byBhZGQgbGluZS1icmVhayBhZnRlciB0aGVtXHJcblx0XHRcdGlmICgobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAhL15cXHMqJC8udGVzdChub2RlLm5vZGVWYWx1ZSkpIHx8XHJcblx0XHRcdFx0ZG9tLmlzKG5vZGUsICdicicpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGZvcm0gcmVzZXQgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlRm9ybVJlc2V0ID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0dGhpcy52YWwodGhpcy50ZXh0YXJlYS52YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkgbW91c2Vkb3duIHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVNb3VzZURvd24gPSAoKTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLmNsb3NlRHJvcERvd24oKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQYXNzZXMgZXZlbnRzIG9uIHRvIGFueSBoYW5kbGVyc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVFdmVudCA9IChlOiBFdmVudCk6IHZvaWQgPT4ge1xyXG5cdFx0aWYgKHRoaXMucGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHQvLyBTZW5kIGV2ZW50IHRvIGFsbCBwbHVnaW5zXHJcblx0XHRcdHRoaXMucGx1Z2luTWFuYWdlci5jYWxsKGUudHlwZSArICdFdmVudCcsIGUsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNvbnZlcnQgdGhlIGV2ZW50IGludG8gYSBjdXN0b20gZXZlbnQgdG8gc2VuZFxyXG5cdFx0bGV0IG5hbWUgPSAoZS50YXJnZXQgPT09IHRoaXMuc291cmNlRWRpdG9yID8gJ2VtbHNyYycgOiAnZW1sd3lzJykgKyBlLnR5cGUgYXMga2V5b2YgdHlwZW9mIHRoaXMuZXZlbnRIYW5kbGVycztcclxuXHJcblx0XHRpZiAodGhpcy5ldmVudEhhbmRsZXJzW25hbWVdKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1tuYW1lXS5mb3JFYWNoKChmbjogYW55KSA9PiB7XHJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW1vdGljb25zIGtleXByZXNzIGhhbmRsZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZW1vdGljb25zS2V5UHJlc3MgPSAoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHJlcGxhY2VkRW1vdGljb24sIGNhY2hlUG9zID0gMCwgZW1vdGljb25zQ2FjaGUgPSB0aGlzLmVtb3RpY29uc0NhY2hlLCBjdXJDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBNYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0aWYgKGRvbS5jbG9zZXN0KHRoaXMuY3VycmVudEJsb2NrTm9kZSwgJ2NvZGUnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFlbW90aWNvbnNDYWNoZSkge1xyXG5cdFx0XHRlbW90aWNvbnNDYWNoZSA9IFtdO1xyXG5cclxuXHRcdFx0dXRpbHMuZWFjaCh0aGlzLmFsbEVtb3RpY29ucywgKGtleSwgaHRtbCkgPT4ge1xyXG5cdFx0XHRcdGVtb3RpY29uc0NhY2hlW2NhY2hlUG9zKytdID0gW2tleSwgaHRtbF07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZW1vdGljb25zQ2FjaGUuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmVtb3RpY29uc0NhY2hlID0gZW1vdGljb25zQ2FjaGU7XHJcblx0XHRcdHRoaXMubG9uZ2VzdEVtb3RpY29uQ29kZSA9XHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbZW1vdGljb25zQ2FjaGUubGVuZ3RoIC0gMV1bMF0ubGVuZ3RoO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2VkRW1vdGljb24gPSB0aGlzLnJhbmdlSGVscGVyLnJlcGxhY2VLZXl3b3JkKFxyXG5cdFx0XHR0aGlzLmVtb3RpY29uc0NhY2hlLFxyXG5cdFx0XHR0cnVlLFxyXG5cdFx0XHR0cnVlLFxyXG5cdFx0XHR0aGlzLmxvbmdlc3RFbW90aWNvbkNvZGUsXHJcblx0XHRcdHRoaXMub3B0aW9ucy5lbW90aWNvbnNDb21wYXQsXHJcblx0XHRcdGN1ckNoYXJcclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKHJlcGxhY2VkRW1vdGljb24pIHtcclxuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMuZW1vdGljb25zQ29tcGF0IHx8ICEvXlxccyQvLnRlc3QoY3VyQ2hhcikpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBzdXJlIGVtb3RpY29ucyBhcmUgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGVtb3RpY29uc0NoZWNrV2hpdGVzcGFjZSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGVtb3RpY29ucy5jaGVja1doaXRlc3BhY2UodGhpcy5jdXJyZW50QmxvY2tOb2RlLCB0aGlzLnJhbmdlSGVscGVyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBrZXlkb3duIGV2ZW50LCB1c2VkIGZvciBzaG9ydGN1dHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgc2hvcnRjdXQ6IGFueSA9IFtdLFxyXG5cclxuXHRcdFx0U0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdCdgJzogJ34nLFxyXG5cdFx0XHRcdCcxJzogJyEnLFxyXG5cdFx0XHRcdCcyJzogJ0AnLFxyXG5cdFx0XHRcdCczJzogJyMnLFxyXG5cdFx0XHRcdCc0JzogJyQnLFxyXG5cdFx0XHRcdCc1JzogJyUnLFxyXG5cdFx0XHRcdCc2JzogJ14nLFxyXG5cdFx0XHRcdCc3JzogJyYnLFxyXG5cdFx0XHRcdCc4JzogJyonLFxyXG5cdFx0XHRcdCc5JzogJygnLFxyXG5cdFx0XHRcdCcwJzogJyknLFxyXG5cdFx0XHRcdCctJzogJ18nLFxyXG5cdFx0XHRcdCc9JzogJysnLFxyXG5cdFx0XHRcdCc7JzogJzogJyxcclxuXHRcdFx0XHQnXFwnJzogJ1wiJyxcclxuXHRcdFx0XHQnLCc6ICc8JyxcclxuXHRcdFx0XHQnLic6ICc+JyxcclxuXHRcdFx0XHQnLyc6ICc/JyxcclxuXHRcdFx0XHQnXFxcXCc6ICd8JyxcclxuXHRcdFx0XHQnWyc6ICd7JyxcclxuXHRcdFx0XHQnXSc6ICd9J1xyXG5cdFx0XHR9LCBTUEVDSUFMX0tFWVM6IGFueSA9IHtcclxuXHRcdFx0XHQ4OiAnYmFja3NwYWNlJyxcclxuXHRcdFx0XHQ5OiAndGFiJyxcclxuXHRcdFx0XHQxMzogJ2VudGVyJyxcclxuXHRcdFx0XHQxOTogJ3BhdXNlJyxcclxuXHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcclxuXHRcdFx0XHQyNzogJ2VzYycsXHJcblx0XHRcdFx0MzI6ICdzcGFjZScsXHJcblx0XHRcdFx0MzM6ICdwYWdldXAnLFxyXG5cdFx0XHRcdDM0OiAncGFnZWRvd24nLFxyXG5cdFx0XHRcdDM1OiAnZW5kJyxcclxuXHRcdFx0XHQzNjogJ2hvbWUnLFxyXG5cdFx0XHRcdDM3OiAnbGVmdCcsXHJcblx0XHRcdFx0Mzg6ICd1cCcsXHJcblx0XHRcdFx0Mzk6ICdyaWdodCcsXHJcblx0XHRcdFx0NDA6ICdkb3duJyxcclxuXHRcdFx0XHQ0NTogJ2luc2VydCcsXHJcblx0XHRcdFx0NDY6ICdkZWwnLFxyXG5cdFx0XHRcdDkxOiAnd2luJyxcclxuXHRcdFx0XHQ5MjogJ3dpbicsXHJcblx0XHRcdFx0OTM6ICdzZWxlY3QnLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOScsXHJcblx0XHRcdFx0MTA2OiAnKicsXHJcblx0XHRcdFx0MTA3OiAnKycsXHJcblx0XHRcdFx0MTA5OiAnLScsXHJcblx0XHRcdFx0MTEwOiAnLicsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0MTEyOiAnZjEnLFxyXG5cdFx0XHRcdDExMzogJ2YyJyxcclxuXHRcdFx0XHQxMTQ6ICdmMycsXHJcblx0XHRcdFx0MTE1OiAnZjQnLFxyXG5cdFx0XHRcdDExNjogJ2Y1JyxcclxuXHRcdFx0XHQxMTc6ICdmNicsXHJcblx0XHRcdFx0MTE4OiAnZjcnLFxyXG5cdFx0XHRcdDExOTogJ2Y4JyxcclxuXHRcdFx0XHQxMjA6ICdmOScsXHJcblx0XHRcdFx0MTIxOiAnZjEwJyxcclxuXHRcdFx0XHQxMjI6ICdmMTEnLFxyXG5cdFx0XHRcdDEyMzogJ2YxMicsXHJcblx0XHRcdFx0MTQ0OiAnbnVtbG9jaycsXHJcblx0XHRcdFx0MTQ1OiAnc2Nyb2xsbG9jaycsXHJcblx0XHRcdFx0MTg2OiAnOycsXHJcblx0XHRcdFx0MTg3OiAnPScsXHJcblx0XHRcdFx0MTg4OiAnLCcsXHJcblx0XHRcdFx0MTg5OiAnLScsXHJcblx0XHRcdFx0MTkwOiAnLicsXHJcblx0XHRcdFx0MTkxOiAnLycsXHJcblx0XHRcdFx0MTkyOiAnYCcsXHJcblx0XHRcdFx0MjE5OiAnWycsXHJcblx0XHRcdFx0MjIwOiAnXFxcXCcsXHJcblx0XHRcdFx0MjIxOiAnXScsXHJcblx0XHRcdFx0MjIyOiAnXFwnJ1xyXG5cdFx0XHR9LCBOVU1QQURfU0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdDEwOTogJy0nLFxyXG5cdFx0XHRcdDExMDogJ2RlbCcsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0OTY6ICcwJyxcclxuXHRcdFx0XHQ5NzogJzEnLFxyXG5cdFx0XHRcdDk4OiAnMicsXHJcblx0XHRcdFx0OTk6ICczJyxcclxuXHRcdFx0XHQxMDA6ICc0JyxcclxuXHRcdFx0XHQxMDE6ICc1JyxcclxuXHRcdFx0XHQxMDI6ICc2JyxcclxuXHRcdFx0XHQxMDM6ICc3JyxcclxuXHRcdFx0XHQxMDQ6ICc4JyxcclxuXHRcdFx0XHQxMDU6ICc5J1xyXG5cdFx0XHR9LCB3aGljaCA9IGUud2hpY2gsIGNoYXJhY3RlciA9IFNQRUNJQUxfS0VZU1t3aGljaF0gfHwgU3RyaW5nLmZyb21DaGFyQ29kZSh3aGljaCkudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdjdHJsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGUuYWx0S2V5KSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goJ2FsdCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLnNoaWZ0S2V5KSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goJ3NoaWZ0Jyk7XHJcblxyXG5cdFx0XHRpZiAoTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdKSB7XHJcblx0XHRcdFx0Y2hhcmFjdGVyID0gTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdO1xyXG5cdFx0XHR9IGVsc2UgaWYgKFNISUZUX0tFWVNbY2hhcmFjdGVyXSkge1xyXG5cdFx0XHRcdGNoYXJhY3RlciA9IFNISUZUX0tFWVNbY2hhcmFjdGVyXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNoaWZ0IGlzIDE2LCBjdHJsIGlzIDE3IGFuZCBhbHQgaXMgMThcclxuXHRcdGlmIChjaGFyYWN0ZXIgJiYgKHdoaWNoIDwgMTYgfHwgd2hpY2ggPiAxOCkpIHtcclxuXHRcdFx0c2hvcnRjdXQucHVzaChjaGFyYWN0ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQuam9pbignKycpO1xyXG5cdFx0aWYgKHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVycyAmJlxyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdICYmXHJcblx0XHRcdHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0uY2FsbCh0aGlzRWRpdG9yKSA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBiYWNrc3BhY2Uga2V5IHByZXNzXHJcblx0ICpcclxuXHQgKiBXaWxsIHJlbW92ZSBibG9jayBzdHlsaW5nIGxpa2UgcXVvdGVzL2NvZGUgZWN0IGlmIGF0IHRoZSBzdGFydC5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlQmFja1NwYWNlID0gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcclxuXHRcdGxldCBub2RlLCBvZmZzZXQsIHJhbmdlLCBwYXJlbnQ7XHJcblxyXG5cdFx0Ly8gOCBpcyB0aGUgYmFja3NwYWNlIGtleVxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQmxvY2tSZW1vdmUgfHwgZS53aGljaCAhPT0gOCB8fFxyXG5cdFx0XHQhKHJhbmdlID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCkpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XHJcblx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcclxuXHJcblx0XHRpZiAob2Zmc2V0ICE9PSAwIHx8ICEocGFyZW50ID0gdGhpcy5jdXJyZW50U3R5bGVkQmxvY2tOb2RlKCkpIHx8XHJcblx0XHRcdGRvbS5pcyhwYXJlbnQsICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlIChub2RlICE9PSBwYXJlbnQpIHtcclxuXHRcdFx0d2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHQvLyBFdmVyeXRoaW5nIGJ1dCBlbXB0eSB0ZXh0IG5vZGVzIGJlZm9yZSB0aGUgY3Vyc29yXHJcblx0XHRcdFx0Ly8gc2hvdWxkIHByZXZlbnQgdGhlIHN0eWxlIGZyb20gYmVpbmcgcmVtb3ZlZFxyXG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFIHx8IG5vZGUubm9kZVZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRoZSBiYWNrc3BhY2Ugd2FzIHByZXNzZWQgYXQgdGhlIHN0YXJ0IG9mXHJcblx0XHQvLyB0aGUgY29udGFpbmVyIHNvIGNsZWFyIHRoZSBzdHlsZVxyXG5cdFx0dGhpcy5jbGVhckJsb2NrRm9ybWF0dGluZyhwYXJlbnQpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IHN0eWxlZCBibG9jayBub2RlIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvclxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3VycmVudFN0eWxlZEJsb2NrTm9kZSA9ICgpOiBIVE1MRWxlbWVudCA9PiB7XHJcblx0XHRsZXQgYmxvY2s6IGFueSA9IHRoaXMuY3VycmVudEJsb2NrTm9kZTtcclxuXHJcblx0XHR3aGlsZSAoIWRvbS5oYXNTdHlsaW5nKGJsb2NrKSB8fCBkb20uaXNJbmxpbmUoYmxvY2ssIHRydWUpKSB7XHJcblx0XHRcdGlmICghKGJsb2NrID0gYmxvY2sucGFyZW50Tm9kZSkgfHwgZG9tLmlzKGJsb2NrLCAnYm9keScpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJsb2NrO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyaWdnZXJzIHRoZSB2YWx1ZUNoYW5nZWQgc2lnbmFsIGlmIHRoZXJlIGlzXHJcblx0ICogYSBwbHVnaW4gdGhhdCBoYW5kbGVzIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgcmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCkgaGFzIGFscmVhZHkgYmVlblxyXG5cdCAqIGNhbGxlZCwgdGhlbiBzYXZlUmFuZ2Ugc2hvdWxkIGJlIHNldCB0byBmYWxzZVxyXG5cdCAqIHRvIHByZXZlbnQgdGhlIHJhbmdlIGJlaW5nIHNhdmVkIHR3aWNlLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBzYXZlUmFuZ2UgSWYgdG8gY2FsbCByYW5nZUhlbHBlci5zYXZlUmFuZ2UoKS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFzSGFuZGxlciA9IGZhbHNlO1xyXG5cdHByaXZhdGUgdHJpZ2dlclZhbHVlQ2hhbmdlZCA9IChzYXZlUmFuZ2U/OiBib29sZWFuKTogYW55ID0+IHtcclxuXHJcblx0XHRsZXQgbGFzdFZhbDogc3RyaW5nO1xyXG5cdFx0aWYgKCF0aGlzLnBsdWdpbk1hbmFnZXIgfHxcclxuXHRcdFx0KCF0aGlzLnBsdWdpbk1hbmFnZXIuaGFzSGFuZGxlcigndmFsdWVjaGFuZ2VkRXZlbnQnKSAmJlxyXG5cdFx0XHRcdCF0aGlzLmhhc0hhbmRsZXIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3VycmVudEh0bWwsIHNvdXJjZU1vZGUgPSB0aGlzLnNvdXJjZU1vZGUoKSwgaGFzU2VsZWN0aW9uID0gIXNvdXJjZU1vZGUgJiYgdGhpcy5yYW5nZUhlbHBlci5oYXNTZWxlY3Rpb24oKTtcclxuXHJcblx0XHQvLyBDb21wb3NpdGlvbiBlbmQgaXNuJ3QgZ3VhcmFudGVlZCB0byBmaXJlIGJ1dCBtdXN0IGhhdmVcclxuXHRcdC8vIGVuZGVkIHdoZW4gdHJpZ2dlclZhbHVlQ2hhbmdlZCgpIGlzIGNhbGxlZCBzbyByZXNldCBpdFxyXG5cdFx0dGhpcy5pc0NvbXBvc2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgZW1sZWRpdG9yLXN0YXJ0LW1hcmtlclxyXG5cdFx0Ly8gaXMgcHJlc2VudCBhcyB0aGUgcmFuZ2UgaXMgYWxyZWFkeSBzYXZlZFxyXG5cdFx0c2F2ZVJhbmdlID0gc2F2ZVJhbmdlICE9PSBmYWxzZSAmJlxyXG5cdFx0XHQhdGhpcy53eXNpd3lnRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtbGVkaXRvci1zdGFydC1tYXJrZXInKTtcclxuXHJcblx0XHQvLyBDbGVhciBhbnkgY3VycmVudCB0aW1lb3V0IGFzIGl0J3Mgbm93IGJlZW4gdHJpZ2dlcmVkXHJcblx0XHRpZiAodGhpcy52YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIpO1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN1cnJlbnRIdG1sID0gc291cmNlTW9kZSA/IHRoaXMuc291cmNlRWRpdG9yLnZhbHVlIDogdGhpcy53eXNpd3lnQm9keS5pbm5lckhUTUw7XHJcblxyXG5cdFx0Ly8gT25seSB0cmlnZ2VyIGlmIHNvbWV0aGluZyBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cclxuXHRcdGlmIChjdXJyZW50SHRtbCAhPT0gbGFzdFZhbCkge1xyXG5cdFx0XHRsYXN0VmFsID0gY3VycmVudEh0bWw7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3ZhbHVlY2hhbmdlZCcsIHtcclxuXHRcdFx0XHRyYXdWYWx1ZTogc291cmNlTW9kZSA/IHRoaXMudmFsKCkgOiBjdXJyZW50SHRtbFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnJlbW92ZU1hcmtlcnMoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEgYmx1ciBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB2YWx1ZUNoYW5nZWRCbHVyID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0aWYgKHRoaXMudmFsdWVDaGFuZ2VkS2V5VXBUaW1lcikge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEga2V5cHJlc3MgZXZlbnRcclxuXHQgKiBAcGFyYW0gIHtFdmVudH0gZSBUaGUga2V5cHJlc3MgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdmFsdWVDaGFuZ2VkS2V5VXAgPSAoZTogS2V5Ym9hcmRFdmVudCk6IGFueSA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgd2hpY2ggPSBlLndoaWNoO1xyXG5cdFx0bGV0IGxhc3RDaGFyOiBhbnkgPSB3aGljaDtcclxuXHRcdGxldCB0cmlnZ2VyTmV4dDogYm9vbGVhbjtcclxuXHRcdGxldCBsYXN0V2FzU3BhY2UgPSAobGFzdENoYXIgPT09IDEzIHx8IGxhc3RDaGFyID09PSAzMik7XHJcblx0XHRsZXQgbGFzdFdhc0RlbGV0ZSA9IChsYXN0Q2hhciA9PT0gOCB8fCBsYXN0Q2hhciA9PT0gNDYpO1xyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyAxMyA9IHJldHVybiAmIDMyID0gc3BhY2VcclxuXHRcdGlmICh3aGljaCA9PT0gMTMgfHwgd2hpY2ggPT09IDMyKSB7XHJcblx0XHRcdGlmICghbGFzdFdhc1NwYWNlKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dHJpZ2dlck5leHQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIDggPSBiYWNrc3BhY2UgJiA0NiA9IGRlbFxyXG5cdFx0fSBlbHNlIGlmICh3aGljaCA9PT0gOCB8fCB3aGljaCA9PT0gNDYpIHtcclxuXHRcdFx0aWYgKCFsYXN0V2FzRGVsZXRlKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dHJpZ2dlck5leHQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHRyaWdnZXJOZXh0KSB7XHJcblx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR0cmlnZ2VyTmV4dCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENsZWFyIHRoZSBwcmV2aW91cyB0aW1lb3V0IGFuZCBzZXQgYSBuZXcgb25lLlxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXNFZGl0b3IudmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciB0aGUgZXZlbnQgMS41cyBhZnRlciB0aGUgbGFzdCBrZXlwcmVzcyBpZiBzcGFjZVxyXG5cdFx0Ly8gaXNuJ3QgcHJlc3NlZC4gVGhpcyBtaWdodCBuZWVkIHRvIGJlIGxvd2VyZWQsIHdpbGwgbmVlZFxyXG5cdFx0Ly8gdG8gbG9vayBpbnRvIHdoYXQgdGhlIHNsb3dlc3QgYXZlcmFnZSBDaGFycyBQZXIgTWluIGlzLlxyXG5cdFx0dGhpc0VkaXRvci52YWx1ZUNoYW5nZWRLZXlVcFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpc0VkaXRvci5pc0NvbXBvc2luZykge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxNTAwKTtcclxuXHR9O1xyXG5cclxuXHRwcml2YXRlIGhhbmRsZUNvbXBvc2l0aW9uID0gKGU6IEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLmlzQ29tcG9zaW5nID0gL3N0YXJ0L2kudGVzdChlLnR5cGUpO1xyXG5cclxuXHRcdGlmICghdGhpcy5pc0NvbXBvc2luZykge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwcml2YXRlIGF1dG9VcGRhdGUgPSAoKTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLnNldFRleHRhcmVhVmFsdWUoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBPcHRpb25zIGZvciB0aGlzIGVkaXRvciBpbnN0YW5jZVxyXG5cdCAqIEBuYW1lIGVkaXRvck9wdGlvbnNcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb3B0aW9uczogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBTYW5pdGl6ZSBIVE1MIHRvIGF2b2lkIFhTU1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2FuaXRpemUgPSAoaHRtbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgc3RyaW5nKTogc3RyaW5nID0+IHtcclxuXHRcdGNvbnN0IGFsbG93ZWRUYWdzID0gWydpZnJhbWUnXS5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRUYWdzKTtcclxuXHRcdGNvbnN0IGFsbG93ZWRBdHRycyA9IFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddXHJcblx0XHRcdC5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kb21QdXJpZnkuc2FuaXRpemUoaHRtbCwge1xyXG5cdFx0XHRBRERfVEFHUzogYWxsb3dlZFRhZ3MsXHJcblx0XHRcdEFERF9BVFRSOiBhbGxvd2VkQXR0cnNcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgcGFzdGVkIGRhdGEsIGZpbHRlcnMgaXQgYW5kIHRoZW4gaW5zZXJ0cyBpdC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVQYXN0ZURhdGEgPSAoZGF0YTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgcGFzdGVBcmVhID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlUmF3JywgZGF0YSk7XHJcblx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3Bhc3RlcmF3JywgZGF0YSk7XHJcblxyXG5cdFx0aWYgKGRhdGEuaHRtbCkge1xyXG5cdFx0XHQvLyBTYW5pdGl6ZSBhZ2FpbiBpbiBjYXNlIHBsdWdpbnMgbW9kaWZpZWQgdGhlIEhUTUxcclxuXHRcdFx0cGFzdGVBcmVhLmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUoZGF0YS5odG1sKTtcclxuXHJcblx0XHRcdC8vIGZpeCBhbnkgaW52YWxpZCBuZXN0aW5nXHJcblx0XHRcdGRvbS5maXhOZXN0aW5nKHBhc3RlQXJlYSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXN0ZUFyZWEuaW5uZXJIVE1MID0gZXNjYXBlLmVudGl0aWVzKGRhdGEudGV4dCB8fCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBhc3RlOiBhbnkgPSB7XHJcblx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdHBhc3RlLnZhbCA9IHRoaXMuZm9ybWF0XHJcblx0XHRcdFx0LmZyYWdtZW50VG9Tb3VyY2UocGFzdGUudmFsLCB0aGlzLnd5c2l3eWdEb2N1bWVudCwgdGhpcy5jdXJyZW50Tm9kZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlJywgcGFzdGUpO1xyXG5cdFx0ZG9tLnRyaWdnZXIodGhpcy5lZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRwYXN0ZS52YWwgPSB0aGlzLmZvcm1hdFxyXG5cdFx0XHRcdC5mcmFnbWVudFRvSHRtbChwYXN0ZS52YWwsIHRoaXMuY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZUh0bWwnLCBwYXN0ZSk7XHJcblxyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMucmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChwYXN0ZS52YWwsIG51bGwsIHRydWUpO1xyXG5cdFx0ZG9tLm1lcmdlKHBhcmVudCk7XHJcblx0fTtcclxuXHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cclxuXHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xyXG5pbXBvcnQgeyBSYW5nZUhlbHBlciB9IGZyb20gJy4vcmFuZ2VIZWxwZXInO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBhbGwgZW1vdGljb25zIGFyZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UgYW5kXHJcbiAqIHJlcGxhY2VzIGFueSB0aGF0IGFyZW4ndCB3aXRoIHdpdGggdGhlaXIgZW1vdGljb24gY29kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3JhbmdlSGVscGVyfSByYW5nZUhlbHBlclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2hpdGVzcGFjZShub2RlOiBIVE1MRWxlbWVudCwgcmFuZ2VIZWxwZXI6IFJhbmdlSGVscGVyKTogdm9pZCB7XHJcblx0bGV0IG5vbmVXc1JlZ2V4ID0gL1teXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKy87XHJcblx0bGV0IGVtb3RpY29ucyA9IG5vZGUgJiYgZG9tLmZpbmQobm9kZSwgJ2ltZ1tkYXRhLWVtbGVkaXRvci1lbW90aWNvbl0nKTtcclxuXHJcblx0aWYgKCFub2RlIHx8ICFlbW90aWNvbnMubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGVtb3RpY29ucy5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IGVtb3RpY29uID0gZW1vdGljb25zW2ldIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0bGV0IHBhcmVudCA9IGVtb3RpY29uLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRsZXQgcHJldiA9IGVtb3RpY29uLnByZXZpb3VzU2libGluZyBhcyBFbGVtZW50O1xyXG5cdFx0bGV0IG5leHQgPSBlbW90aWNvbi5uZXh0U2libGluZyBhcyBDaGFyYWN0ZXJEYXRhO1xyXG5cclxuXHRcdGlmICgoIXByZXYgfHwgIW5vbmVXc1JlZ2V4LnRlc3QocHJldi5ub2RlVmFsdWUuc2xpY2UoLTEpKSkgJiZcclxuXHRcdFx0KCFuZXh0IHx8ICFub25lV3NSZWdleC50ZXN0KChuZXh0Lm5vZGVWYWx1ZSB8fCAnJylbMF0pKSkge1xyXG5cdFx0XHRjb250aW51ZTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmFuZ2UgPSByYW5nZUhlbHBlci5jbG9uZVNlbGVjdGVkKCk7XHJcblx0XHRsZXQgcmFuZ2VTdGFydCA9IC0xO1xyXG5cdFx0bGV0IHJhbmdlU3RhcnRDb250YWluZXIgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcclxuXHRcdGxldCBwcmV2aW91c1RleHQgPSAocHJldiAmJiBwcmV2Lm5vZGVWYWx1ZSkgfHwgJyc7XHJcblxyXG5cdFx0cHJldmlvdXNUZXh0ICs9IGRvbS5kYXRhKGVtb3RpY29uLCAnZW1sZWRpdG9yLWVtb3RpY29uJyk7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBhZnRlciB0aGUgcmVtb3ZlZCBlbW90aWNvbiwgYWRkXHJcblx0XHQvLyB0aGUgbGVuZ3RoIG9mIHRoZSBuZXdseSBhZGRlZCB0ZXh0IHRvIGl0XHJcblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gbmV4dCkge1xyXG5cdFx0XHRyYW5nZVN0YXJ0ID0gcHJldmlvdXNUZXh0Lmxlbmd0aCArIHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgc2V0IGJlZm9yZSB0aGUgbmV4dCBub2RlLCBzZXQgaXQgdG9cclxuXHRcdC8vIHRoZSBlbmQgb2YgdGhlIG5ldyB0ZXh0IG5vZGVcclxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBub2RlICYmXHJcblx0XHRcdG5vZGUuY2hpbGROb2Rlc1tyYW5nZS5zdGFydE9mZnNldF0gPT09IG5leHQpIHtcclxuXHRcdFx0cmFuZ2VTdGFydCA9IHByZXZpb3VzVGV4dC5sZW5ndGg7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSByZW1vdmVkIGVtb3RpY29uLFxyXG5cdFx0Ly8ganVzdCBrZWVwIGl0IGF0IHRoYXQgcG9zaXRpb25cclxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBwcmV2KSB7XHJcblx0XHRcdHJhbmdlU3RhcnQgPSByYW5nZS5zdGFydE9mZnNldDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIW5leHQgfHwgbmV4dC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xyXG5cdFx0XHRuZXh0ID0gcGFyZW50Lmluc2VydEJlZm9yZShcclxuXHRcdFx0XHRwYXJlbnQub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyksIG5leHRcclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHRuZXh0Lmluc2VydERhdGEoMCwgcHJldmlvdXNUZXh0KTtcclxuXHRcdGRvbS5yZW1vdmUoZW1vdGljb24pO1xyXG5cdFx0aWYgKHByZXYpIHtcclxuXHRcdFx0ZG9tLnJlbW92ZShwcmV2KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB0aGUgcmFuZ2Ugc3RhcnRpbmcgcG9zaXRpb24gaWYgaXQncyBiZWVuIG1vZGlmaWVkXHJcblx0XHRpZiAocmFuZ2VTdGFydCA+IC0xKSB7XHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0KG5leHQsIHJhbmdlU3RhcnQpO1xyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2UocmFuZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2VzIGFueSBlbW90aWNvbnMgaW5zaWRlIHRoZSByb290IG5vZGUgd2l0aCBpbWFnZXMuXHJcbiAqXHJcbiAqIGVtb3RpY29ucyBzaG91bGQgYmUgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXkgaXMgdGhlIGVtb3RpY29uXHJcbiAqIGNvZGUgYW5kIHRoZSB2YWx1ZSBpcyB0aGUgSFRNTCB0byByZXBsYWNlIGl0IHdpdGguXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3RcclxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBlbW90aWNvbnNcclxuICogQHBhcmFtIHtib29sZWFufSBlbW90aWNvbnNDb21wYXRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKHJvb3Q6IEhUTUxFbGVtZW50LCBlbW90aWNvbnM6IHN0cmluZ1tdLCBlbW90aWNvbnNDb21wYXQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRsZXQgZG9jID0gcm9vdC5vd25lckRvY3VtZW50O1xyXG5cdGxldCBzcGFjZSA9ICcoXnxcXFxcc3xcXHhBMHxcXHUyMDAyfFxcdTIwMDN8XFx1MjAwOXwkKSc7XHJcblx0bGV0IGVtb3RpY29uQ29kZXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHRsZXQgZW1vdGljb25SZWdleDogYW55ID0ge307XHJcblxyXG5cdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxyXG5cdGlmIChkb20ucGFyZW50KHJvb3QsICdjb2RlJykpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRlbW90aWNvblJlZ2V4W2tleV0gPSBuZXcgUmVnRXhwKHNwYWNlICsgZXNjYXBlLnJlZ2V4KGtleSkgKyBzcGFjZSk7XHJcblx0XHRlbW90aWNvbkNvZGVzLnB1c2goa2V5KTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU29ydCBrZXlzIGxvbmdlc3QgdG8gc2hvcnRlc3Qgc28gdGhhdCBsb25nZXIga2V5c1xyXG5cdC8vIHRha2UgcHJlY2VkZW5jZSAoYXZvaWRzIGJ1Z3Mgd2l0aCBzaG9ydGVyIGtleXMgcGFydGlhbGx5XHJcblx0Ly8gbWF0Y2hpbmcgbG9uZ2VyIG9uZXMpXHJcblx0ZW1vdGljb25Db2Rlcy5zb3J0KGZ1bmN0aW9uIChhOiBzdHJpbmcsIGI6IHN0cmluZykge1xyXG5cdFx0cmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XHJcblx0fSk7XHJcblxyXG5cdChmdW5jdGlvbiBjb252ZXJ0KG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRub2RlID0gbm9kZS5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdHdoaWxlIChub2RlKSB7XHJcblx0XHRcdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxyXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLkVMRU1FTlRfTk9ERSAmJiAhZG9tLmlzKG5vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0XHRjb252ZXJ0KG5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSkge1xyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZW1vdGljb25Db2Rlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0bGV0IHRleHQgPSBub2RlLm5vZGVWYWx1ZTtcclxuXHRcdFx0XHRcdGxldCBlbW90aWNvbktleSA9IGVtb3RpY29uQ29kZXNbaV07XHJcblx0XHRcdFx0XHRsZXQgaW5kZXggPSBlbW90aWNvbnNDb21wYXQgP1xyXG5cdFx0XHRcdFx0XHR0ZXh0LnNlYXJjaChlbW90aWNvblJlZ2V4W2Vtb3RpY29uS2V5XSkgOlxyXG5cdFx0XHRcdFx0XHR0ZXh0LmluZGV4T2YoZW1vdGljb25LZXkpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdC8vIFdoZW4gZW1vdGljb25zQ29tcGF0IGlzIGVuYWJsZWQgdGhpcyB3aWxsIGJlIHRoZVxyXG5cdFx0XHRcdFx0XHQvLyBwb3NpdGlvbiBhZnRlciBhbnkgd2hpdGUgc3BhY2VcclxuXHRcdFx0XHRcdFx0bGV0IHN0YXJ0SW5kZXggPSB0ZXh0LmluZGV4T2YoZW1vdGljb25LZXksIGluZGV4KTtcclxuXHRcdFx0XHRcdFx0bGV0IGZyYWdtZW50ID0gZG9tLnBhcnNlSFRNTChlbW90aWNvbnNbZW1vdGljb25LZXldLCBkb2MpO1xyXG5cdFx0XHRcdFx0XHRsZXQgYWZ0ZXIgPSB0ZXh0LnN1YnN0cihzdGFydEluZGV4ICsgZW1vdGljb25LZXkubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShhZnRlcikpO1xyXG5cclxuXHRcdFx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSB0ZXh0LnN1YnN0cigwLCBzdGFydEluZGV4KTtcclxuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnROb2RlXHJcblx0XHRcdFx0XHRcdFx0Lmluc2VydEJlZm9yZShmcmFnbWVudCwgbm9kZS5uZXh0U2libGluZyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRub2RlID0gbm9kZS5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHRcdH1cclxuXHR9KHJvb3QpKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUGx1Z2luTWFuYWdlciB7XHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcih0aGlzT2JqOiBhbnkpIHtcclxuXHJcblx0XHRQbHVnaW5NYW5hZ2VyLnBsdWdpbnMgPSB7fTtcclxuXHRcdC8qKlxyXG5cdFx0ICogQXJyYXkgb2YgYWxsIGN1cnJlbnRseSByZWdpc3RlcmVkIHBsdWdpbnNcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7QXJyYXl9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgcmVnaXN0ZXJlZFBsdWdpbnM6IGFueVtdID0gW107XHJcblxyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoYW5nZXMgYSBzaWduYWxzIG5hbWUgZnJvbSBcIm5hbWVcIiBpbnRvIFwic2lnbmFsTmFtZVwiLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gc2lnbmFsXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgZm9ybWF0U2lnbmFsTmFtZSA9IGZ1bmN0aW9uIChzaWduYWw6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiAnc2lnbmFsJyArIHNpZ25hbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHNpZ25hbC5zbGljZSgxKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDYWxscyBoYW5kbGVycyBmb3IgYSBzaWduYWxcclxuXHRcdCAqXHJcblx0XHQgKiBAc2VlIGNhbGwoKVxyXG5cdFx0ICogQHNlZSBjYWxsT25seUZpcnN0KClcclxuXHRcdCAqIEBwYXJhbSAge0FycmF5fSAgIGFyZ3NcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IHJldHVybkF0Rmlyc3RcclxuXHRcdCAqIEByZXR1cm4geyp9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgY2FsbEhhbmRsZXJzID0gZnVuY3Rpb24gKGFyZ3M6IElBcmd1bWVudHMsIHJldHVybkF0Rmlyc3Q6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRhcmdzID0gW10uc2xpY2UuY2FsbChhcmdzKTtcclxuXHJcblx0XHRcdHZhciBpZHgsIHJldCwgc2lnbmFsID0gZm9ybWF0U2lnbmFsTmFtZShBcnJheS5mcm9tKGFyZ3MpLnNoaWZ0KCkpO1xyXG5cclxuXHRcdFx0Zm9yIChpZHggPSAwOyBpZHggPCByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7IGlkeCsrKSB7XHJcblx0XHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpZHhdKSB7XHJcblx0XHRcdFx0XHRyZXQgPSByZWdpc3RlcmVkUGx1Z2luc1tpZHhdW3NpZ25hbF0uYXBwbHkodGhpc09iaiwgYXJncyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHJldHVybkF0Rmlyc3QpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJldDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDYWxscyBhbGwgaGFuZGxlcnMgZm9yIHRoZSBwYXNzZWQgc2lnbmFsXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcclxuXHRcdCAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJnc1xyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjYWxsXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jYWxsID0gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRjYWxsSGFuZGxlcnMoYXJncywgZmFsc2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENhbGxzIHRoZSBmaXJzdCBoYW5kbGVyIGZvciBhIHNpZ25hbCwgYW5kIHJldHVybnMgdGhlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcclxuXHRcdCAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJnc1xyXG5cdFx0ICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBoYW5kbGVyXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNhbGxPbmx5Rmlyc3RcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNhbGxPbmx5Rmlyc3QgPSBmdW5jdGlvbiAoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIGNhbGxIYW5kbGVycyhhcmd1bWVudHMsIHRydWUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiBhIHNpZ25hbCBoYXMgYSBoYW5kbGVyXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBzaWduYWxcclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGhhc0hhbmRsZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmhhc0hhbmRsZXIgPSBmdW5jdGlvbiAoc2lnbmFsOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIGkgPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XHJcblx0XHRcdHNpZ25hbCA9IGZvcm1hdFNpZ25hbE5hbWUoc2lnbmFsKTtcclxuXHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAoc2lnbmFsIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGVja3MgaWYgdGhlIHBsdWdpbiBleGlzdHMgaW4gcGx1Z2luc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBleGlzdHNcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmV4aXN0cyA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAocGx1Z2luIGluIFBsdWdpbk1hbmFnZXIucGx1Z2lucykge1xyXG5cdFx0XHRcdGxldCBwbHVnaW5PYmo6IHt9ID0gUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXTtcclxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHBsdWdpbk9iaiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcGx1Z2luT2JqLnByb3RvdHlwZSA9PT0gJ29iamVjdCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBwbHVnaW4gaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGlzUmVnaXN0ZXJlZFxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaXNSZWdpc3RlcmVkID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLmV4aXN0cyhwbHVnaW4pKSB7XHJcblx0XHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0d2hpbGUgKGlkeC0tKSB7XHJcblx0XHRcdFx0XHRpZiAocmVnaXN0ZXJlZFBsdWdpbnNbaWR4XSBpbnN0YW5jZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc1twbHVnaW4gYXMga2V5b2YgdHlwZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc10pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVnaXN0ZXJzIGEgcGx1Z2luIHRvIHJlY2VpdmUgc2lnbmFsc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZWdpc3RlclxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKCF0aGlzLmV4aXN0cyhwbHVnaW4pIHx8IHRoaXMuaXNSZWdpc3RlcmVkKHBsdWdpbikpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBwbHVnaW5PYmogPSBuZXcgdGhpcy5wbHVnaW5zW3BsdWdpbl0oKTtcclxuXHRcdFx0cmVnaXN0ZXJlZFBsdWdpbnMucHVzaChwbHVnaW4pO1xyXG5cclxuXHRcdFx0aWYgKCdpbml0JyBpbiB0aGlzLnBsdWdpbikge1xyXG5cdFx0XHRcdHBsdWdpbk9iai5pbml0LmNhbGwodGhpc09iaik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlcmVnaXN0ZXJzIGEgcGx1Z2luLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBkZXJlZ2lzdGVyXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5kZXJlZ2lzdGVyID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciByZW1vdmVkUGx1Z2luLCBwbHVnaW5JZHggPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGgsIHJlbW92ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmICghdGhpcy5pc1JlZ2lzdGVyZWQocGx1Z2luKSkge1xyXG5cdFx0XHRcdHJldHVybiByZW1vdmVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3aGlsZSAocGx1Z2luSWR4LS0pIHtcclxuXHRcdFx0XHRpZiAocmVnaXN0ZXJlZFBsdWdpbnNbcGx1Z2luSWR4XSBpbnN0YW5jZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc1twbHVnaW4gYXMga2V5b2YgdHlwZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc10pIHtcclxuXHRcdFx0XHRcdHJlbW92ZWRQbHVnaW4gPSByZWdpc3RlcmVkUGx1Z2lucy5zcGxpY2UocGx1Z2luSWR4LCAxKVswXTtcclxuXHRcdFx0XHRcdHJlbW92ZWQgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdGlmICgnZGVzdHJveScgaW4gcmVtb3ZlZFBsdWdpbikge1xyXG5cdFx0XHRcdFx0XHRyZW1vdmVkUGx1Z2luLmRlc3Ryb3kuY2FsbCh0aGlzT2JqKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZW1vdmVkO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFycyBhbGwgcGx1Z2lucyBhbmQgcmVtb3ZlcyB0aGUgb3duZXIgcmVmZXJlbmNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIENhbGxpbmcgYW55IGZ1bmN0aW9ucyBvbiB0aGlzIG9iamVjdCBhZnRlciBjYWxsaW5nXHJcblx0XHQgKiBkZXN0cm95IHdpbGwgY2F1c2UgYSBKUyBlcnJvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAbmFtZSBkZXN0cm95XHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgaSA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcclxuXHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAoJ2Rlc3Ryb3knIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XHJcblx0XHRcdFx0XHRyZWdpc3RlcmVkUGx1Z2luc1tpXS5kZXN0cm95LmNhbGwodGhpc09iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZWdpc3RlcmVkUGx1Z2lucyA9IFtdO1xyXG5cdFx0XHR0aGlzT2JqID0gbnVsbDtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGx1Z2luczoge307XHJcblx0Y2FsbDogKC4uLmFyZzogYW55KSA9PiB2b2lkO1xyXG5cdGNhbGxPbmx5Rmlyc3Q6ICgpID0+IGFueTtcclxuXHRoYXNIYW5kbGVyOiAoc2lnbmFsOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0ZXhpc3RzOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0aXNSZWdpc3RlcmVkOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0cmVnaXN0ZXI6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRkZXJlZ2lzdGVyOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0ZGVzdHJveTogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMgKi9cclxuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHRleHQsIHN0YXJ0L2VuZCBub2RlIGFuZCBvZmZzZXQgZm9yXHJcbiAqIGxlbmd0aCBjaGFycyBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBwYXNzZWQgbm9kZVxyXG4gKiBhdCB0aGUgc3BlY2lmaWVkIG9mZnNldC5cclxuICpcclxuICogQHBhcmFtICB7Tm9kZX0gIG5vZGVcclxuICogQHBhcmFtICB7bnVtYmVyfSAgb2Zmc2V0XHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGlzTGVmdFxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBsZW5ndGhcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmFyIG91dGVyVGV4dCA9IGZ1bmN0aW9uIChyYW5nZTogYW55LCBpc0xlZnQ6IGJvb2xlYW4sIGxlbmd0aDogbnVtYmVyKTogYW55IHtcclxuXHR2YXIgbm9kZVZhbHVlLCByZW1haW5pbmcsIHN0YXJ0LCBlbmQsIG5vZGUsXHJcblx0XHR0ZXh0ID0gJycsXHJcblx0XHRuZXh0ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIsXHJcblx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcclxuXHJcblx0Ly8gSGFuZGxlIGNhc2VzIHdoZXJlIG5vZGUgaXMgYSBwYXJhZ3JhcGggYW5kIG9mZnNldFxyXG5cdC8vIHJlZmVycyB0byB0aGUgaW5kZXggb2YgYSB0ZXh0IG5vZGUuXHJcblx0Ly8gMyA9IHRleHQgbm9kZVxyXG5cdGlmIChuZXh0ICYmIG5leHQubm9kZVR5cGUgIT09IDMpIHtcclxuXHRcdG5leHQgPSBuZXh0LmNoaWxkTm9kZXNbb2Zmc2V0XTtcclxuXHRcdG9mZnNldCA9IDA7XHJcblx0fVxyXG5cclxuXHRzdGFydCA9IGVuZCA9IG9mZnNldDtcclxuXHJcblx0d2hpbGUgKGxlbmd0aCA+IHRleHQubGVuZ3RoICYmIG5leHQgJiYgbmV4dC5ub2RlVHlwZSA9PT0gMykge1xyXG5cdFx0bm9kZVZhbHVlID0gbmV4dC5ub2RlVmFsdWU7XHJcblx0XHRyZW1haW5pbmcgPSBsZW5ndGggLSB0ZXh0Lmxlbmd0aDtcclxuXHJcblx0XHQvLyBJZiBub3QgdGhlIGZpcnN0IG5vZGUsIHN0YXJ0IGFuZCBlbmQgc2hvdWxkIGJlIGF0IHRoZWlyXHJcblx0XHQvLyBtYXggdmFsdWVzIGFzIHdpbGwgYmUgdXBkYXRlZCB3aGVuIGdldHRpbmcgdGhlIHRleHRcclxuXHRcdGlmIChub2RlKSB7XHJcblx0XHRcdGVuZCA9IG5vZGVWYWx1ZS5sZW5ndGg7XHJcblx0XHRcdHN0YXJ0ID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gbmV4dDtcclxuXHJcblx0XHRpZiAoaXNMZWZ0KSB7XHJcblx0XHRcdHN0YXJ0ID0gTWF0aC5tYXgoZW5kIC0gcmVtYWluaW5nLCAwKTtcclxuXHRcdFx0b2Zmc2V0ID0gc3RhcnQ7XHJcblxyXG5cdFx0XHR0ZXh0ID0gbm9kZVZhbHVlLnN1YnN0cihzdGFydCwgZW5kIC0gc3RhcnQpICsgdGV4dDtcclxuXHRcdFx0bmV4dCA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZW5kID0gTWF0aC5taW4ocmVtYWluaW5nLCBub2RlVmFsdWUubGVuZ3RoKTtcclxuXHRcdFx0b2Zmc2V0ID0gc3RhcnQgKyBlbmQ7XHJcblxyXG5cdFx0XHR0ZXh0ICs9IG5vZGVWYWx1ZS5zdWJzdHIoc3RhcnQsIGVuZCk7XHJcblx0XHRcdG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdG5vZGU6IG5vZGUgfHwgbmV4dCxcclxuXHRcdG9mZnNldDogb2Zmc2V0LFxyXG5cdFx0dGV4dDogdGV4dFxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogUmFuZ2UgaGVscGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBSYW5nZUhlbHBlclxyXG4gKiBAbmFtZSBSYW5nZUhlbHBlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJhbmdlSGVscGVyIHtcclxuXHJcblx0aW5zZXJ0SFRNTDogKGh0bWw6IHN0cmluZywgZW5kSFRNTD86IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRpbnNlcnROb2RlOiAobm9kZT86IGFueSwgZW5kTm9kZT86IGFueSkgPT4gZmFsc2UgfCB1bmRlZmluZWQ7XHJcblx0Y2xvbmVTZWxlY3RlZDogKCkgPT4gUmFuZ2U7XHJcblx0c2VsZWN0ZWRSYW5nZTogKCkgPT4gUmFuZ2U7XHJcblx0aGFzU2VsZWN0aW9uOiAoKSA9PiBib29sZWFuO1xyXG5cdHNlbGVjdGVkSHRtbDogKCkgPT4gc3RyaW5nO1xyXG5cdHBhcmVudE5vZGU6ICgpID0+IEhUTUxFbGVtZW50O1xyXG5cdGdldEZpcnN0QmxvY2tQYXJlbnQ6IChub2RlPzogYW55KSA9PiBhbnk7XHJcblx0aW5zZXJ0Tm9kZUF0OiAoc3RhcnQ6IGFueSwgbm9kZTogYW55KSA9PiBib29sZWFuO1xyXG5cdGluc2VydE1hcmtlcnM6ICgpID0+IHZvaWQ7XHJcblx0Z2V0TWFya2VyOiAoaWQ6IGFueSkgPT4gYW55O1xyXG5cdHJlbW92ZU1hcmtlcjogKGlkOiBhbnkpID0+IHZvaWQ7XHJcblx0cmVtb3ZlTWFya2VyczogKCkgPT4gdm9pZDtcclxuXHRzYXZlUmFuZ2U6ICgpID0+IHZvaWQ7XHJcblx0c2VsZWN0UmFuZ2U6IChyYW5nZTogYW55KSA9PiB2b2lkO1xyXG5cdHJlc3RvcmVSYW5nZTogKCkgPT4gYm9vbGVhbjtcclxuXHRzZWxlY3RPdXRlclRleHQ6IChsZWZ0OiBhbnksIHJpZ2h0OiBhbnkpID0+IGJvb2xlYW47XHJcblx0Z2V0T3V0ZXJUZXh0OiAoYmVmb3JlOiBhbnksIGxlbmd0aDogYW55KSA9PiBhbnk7XHJcblx0cmVwbGFjZUtleXdvcmQ6IChrZXl3b3JkczogYW55LCBpbmNsdWRlQWZ0ZXI6IGFueSwga2V5d29yZHNTb3J0ZWQ6IGFueSwgbG9uZ2VzdEtleXdvcmQ6IGFueSwgcmVxdWlyZVdoaXRlc3BhY2U6IGFueSwga2V5cHJlc3NDaGFyOiBhbnkpID0+IGJvb2xlYW47XHJcblx0Y29tcGFyZTogKHJuZ0E/OiBhbnksIHJuZ0I/OiBhbnkpID0+IGJvb2xlYW47XHJcblx0Y2xlYXI6ICgpID0+IHZvaWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHdpbjogYW55LCBkOiBudWxsLCBzYW5pdGl6ZTogeyAoaHRtbDogc3RyaW5nKTogc3RyaW5nOyAoYXJnMDogYW55KTogc3RyaW5nOyB9KSB7XHJcblx0XHRsZXQgX2NyZWF0ZU1hcmtlcjogYW55O1xyXG5cdFx0bGV0IF9wcmVwYXJlSW5wdXQ6IGFueTtcclxuXHRcdGxldCBkb2M6IGFueSA9IGQgfHwgd2luLmNvbnRlbnREb2N1bWVudCB8fCB3aW4uZG9jdW1lbnQ7XHJcblx0XHRsZXQgc3RhcnRNYXJrZXI6IHN0cmluZyA9ICdlbWxlZGl0b3Itc3RhcnQtbWFya2VyJztcclxuXHRcdGxldCBlbmRNYXJrZXI6IHN0cmluZyA9ICdlbWxlZGl0b3ItZW5kLW1hcmtlcic7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIEhUTUwgaW50byB0aGUgY3VycmVudCByYW5nZSByZXBsYWNpbmcgYW55IHNlbGVjdGVkXHJcblx0XHQgKiB0ZXh0LlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGVuZEhUTUwgaXMgc3BlY2lmaWVkIHRoZSBzZWxlY3RlZCBjb250ZW50cyB3aWxsIGJlIHB1dCBiZXR3ZWVuXHJcblx0XHQgKiBodG1sIGFuZCBlbmRIVE1MLiBJZiB0aGVyZSBpcyBub3RoaW5nIHNlbGVjdGVkIGh0bWwgYW5kIGVuZEhUTUwgYXJlXHJcblx0XHQgKiBqdXN0IGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEhUTUxdXHJcblx0XHQgKiBAcmV0dXJuIEZhbHNlIG9uIGZhaWxcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaW5zZXJ0SFRNTFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmluc2VydEhUTUwgPSBmdW5jdGlvbiAoaHRtbDogc3RyaW5nLCBlbmRIVE1MPzogc3RyaW5nKSB7XHJcblx0XHRcdHZhciBub2RlLCBkaXYsIHJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZW5kSFRNTCkge1xyXG5cdFx0XHRcdGh0bWwgKz0gdGhpcy5zZWxlY3RlZEh0bWwoKSArIGVuZEhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XHJcblx0XHRcdG5vZGUgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gc2FuaXRpemUoaHRtbCk7XHJcblxyXG5cdFx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRsZXQgZGl2Rmlyc3RDaGlsZCA9IGRpdi5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChub2RlLCBkaXZGaXJzdENoaWxkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5pbnNlcnROb2RlKG5vZGUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCogUmVtb3ZlcyB0aGUgc3RhcnQvZW5kIG1hcmtlcnNcclxuXHRcdCpcclxuXHRcdCogQGZ1bmN0aW9uXHJcblx0XHQqIEBuYW1lIHJlbW92ZU1hcmtlcnNcclxuXHRcdCogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0Ki9cclxuXHRcdHRoaXMucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoc3RhcnRNYXJrZXIpO1xyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcihlbmRNYXJrZXIpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzYW1lIGFzIGluc2VydEhUTUwgZXhjZXB0IHdpdGggRE9NIG5vZGVzIGluc3RlYWRcclxuXHRcdCAqXHJcblx0XHQgKiA8c3Ryb25nPldhcm5pbmc6PC9zdHJvbmc+IHRoZSBub2RlcyBtdXN0IGJlbG9uZyB0byB0aGVcclxuXHRcdCAqIGRvY3VtZW50IHRoZXkgYXJlIGJlaW5nIGluc2VydGVkIGludG8uIFNvbWUgYnJvd3NlcnNcclxuXHRcdCAqIHdpbGwgdGhyb3cgZXhjZXB0aW9ucyBpZiB0aGV5IGRvbid0LlxyXG5cdFx0ICpcclxuXHRcdCAqIFJldHVybnMgYm9vbGVhbiBmYWxzZSBvbiBmYWlsXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBub2RlXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IGVuZE5vZGVcclxuXHRcdCAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaW5zZXJ0Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmluc2VydE5vZGUgPSBmdW5jdGlvbiAobm9kZT86IE5vZGUsIGVuZE5vZGU/OiBOb2RlKTogZmFsc2UgfCB1bmRlZmluZWQge1xyXG5cdFx0XHRsZXQgZmlyc3QsIGxhc3QsIGlucHV0ID0gX3ByZXBhcmVJbnB1dChub2RlLCBlbmROb2RlKSwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKSwgcGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcblx0XHRcdGxldCBlbXB0eU5vZGVzOiBhbnkgPSBbXTtcclxuXHJcblx0XHRcdGlmICghaW5wdXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHJlbW92ZUlmRW1wdHkobm9kZTogYW55KSB7XHJcblx0XHRcdFx0Ly8gT25seSByZW1vdmUgZW1wdHkgbm9kZSBpZiBpdCB3YXNuJ3QgYWxyZWFkeSBlbXB0eVxyXG5cdFx0XHRcdGlmIChub2RlICYmIGRvbS5pc0VtcHR5KG5vZGUpICYmIGVtcHR5Tm9kZXMuaW5kZXhPZihub2RlKSA8IDApIHtcclxuXHRcdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmFuZ2Uuc3RhcnRDb250YWluZXIgIT09IHJhbmdlLmVuZENvbnRhaW5lcikge1xyXG5cdFx0XHRcdHV0aWxzLmVhY2gocGFyZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChfLCBub2RlKSB7XHJcblx0XHRcdFx0XHRpZiAoZG9tLmlzRW1wdHkobm9kZSkpIHtcclxuXHRcdFx0XHRcdFx0ZW1wdHlOb2Rlcy5wdXNoKG5vZGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRmaXJzdCA9IGlucHV0LmZpcnN0Q2hpbGQ7XHJcblx0XHRcdFx0bGFzdCA9IGlucHV0Lmxhc3RDaGlsZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuXHJcblx0XHRcdC8vIEZGIGFsbG93cyA8YnIgLz4gdG8gYmUgc2VsZWN0ZWQgYnV0IGluc2VydGluZyBhIG5vZGVcclxuXHRcdFx0Ly8gaW50byA8YnIgLz4gd2lsbCBjYXVzZSBpdCBub3QgdG8gYmUgZGlzcGxheWVkIHNvIG11c3RcclxuXHRcdFx0Ly8gaW5zZXJ0IGJlZm9yZSB0aGUgPGJyIC8+IGluIEZGLlxyXG5cdFx0XHQvLyAzID0gVGV4dE5vZGVcclxuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDMgJiYgIWRvbS5jYW5IYXZlQ2hpbGRyZW4ocGFyZW50KSkge1xyXG5cdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoaW5wdXQsIHBhcmVudCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmFuZ2UuaW5zZXJ0Tm9kZShpbnB1dCk7XHJcblxyXG5cdFx0XHRcdC8vIElmIGEgbm9kZSB3YXMgc3BsaXQgb3IgaXRzIGNvbnRlbnRzIGRlbGV0ZWQsIHJlbW92ZSBhbnkgcmVzdWx0aW5nXHJcblx0XHRcdFx0Ly8gZW1wdHkgdGFncy4gRm9yIGV4YW1wbGU6XHJcblx0XHRcdFx0Ly8gPHA+fHRlc3Q8L3A+PGRpdj50ZXN0fDwvZGl2PlxyXG5cdFx0XHRcdC8vIFdoZW4gZGVsZXRlQ29udGVudHMgY291bGQgYmVjb21lOlxyXG5cdFx0XHRcdC8vIDxwPjwvcD58PGRpdj48L2Rpdj5cclxuXHRcdFx0XHQvLyBTbyByZW1vdmUgdGhlIGVtcHR5IG9uZXNcclxuXHRcdFx0XHRyZW1vdmVJZkVtcHR5KGZpcnN0ICYmIGZpcnN0LnByZXZpb3VzU2libGluZyk7XHJcblx0XHRcdFx0cmVtb3ZlSWZFbXB0eShsYXN0ICYmIGxhc3QubmV4dFNpYmxpbmcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlc3RvcmVSYW5nZSgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsb25lcyB0aGUgc2VsZWN0ZWQgUmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtSYW5nZX1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY2xvbmVTZWxlY3RlZFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNsb25lU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKTogUmFuZ2Uge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiByYW5nZS5jbG9uZVJhbmdlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBzZWxlY3RlZCBSYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge1JhbmdlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RlZFJhbmdlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc2VsZWN0ZWRSYW5nZSA9IGZ1bmN0aW9uICgpOiBSYW5nZSB7XHJcblx0XHRcdHZhciByYW5nZSwgZmlyc3RDaGlsZCwgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKCFzZWwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFdoZW4gY3JlYXRpbmcgYSBuZXcgcmFuZ2UsIHNldCB0aGUgc3RhcnQgdG8gdGhlIGZpcnN0IGNoaWxkXHJcblx0XHRcdC8vIGVsZW1lbnQgb2YgdGhlIGJvZHkgZWxlbWVudCB0byBhdm9pZCBlcnJvcnMgaW4gRkYuXHJcblx0XHRcdGlmIChzZWwucmFuZ2VDb3VudCA8PSAwKSB7XHJcblx0XHRcdFx0Zmlyc3RDaGlsZCA9IGRvYy5ib2R5O1xyXG5cdFx0XHRcdHdoaWxlIChmaXJzdENoaWxkLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGZpcnN0Q2hpbGQgPSBmaXJzdENoaWxkLmZpcnN0Q2hpbGQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRcdC8vIE11c3QgYmUgc2V0U3RhcnRCZWZvcmUgb3RoZXJ3aXNlIGl0IGNhbiBjYXVzZSBpbmZpbml0ZVxyXG5cdFx0XHRcdC8vIGxvb3BzIHdpdGggbGlzdHMgaW4gV2ViS2l0LiBTZWUgaXNzdWUgNDQyXHJcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoZmlyc3RDaGlsZCk7XHJcblxyXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWwucmFuZ2VDb3VudCA+IDApIHtcclxuXHRcdFx0XHRyYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmFuZ2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBoYXNTZWxlY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuNFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmhhc1NlbGVjdGlvbiA9IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIHNlbCA9IHdpbi5nZXRTZWxlY3Rpb24oKTtcclxuXHJcblx0XHRcdHJldHVybiBzZWwgJiYgc2VsLnJhbmdlQ291bnQgPiAwO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBIVE1MXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RlZEh0bWxcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zZWxlY3RlZEh0bWwgPSBmdW5jdGlvbiAoKTogc3RyaW5nIHtcclxuXHRcdFx0dmFyIGRpdiwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgcmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBwYXJlbnQgbm9kZSBvZiB0aGUgc2VsZWN0ZWQgY29udGVudHMgaW4gdGhlIHJhbmdlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHBhcmVudE5vZGVcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5wYXJlbnROb2RlID0gZnVuY3Rpb24gKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdFx0dmFyIHJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXHJcblx0XHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGdldEZpcnN0QmxvY2tQYXJlbnRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXHJcblx0XHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBbbl0gVGhlIGVsZW1lbnQgdG8gZ2V0IHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgZnJvbVxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGdldEZpcnN0QmxvY2tQYXJlbnReMlxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZ2V0Rmlyc3RCbG9ja1BhcmVudCA9IGZ1bmN0aW9uIChub2RlPzogYW55KTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHR2YXIgZnVuYyA9IGZ1bmN0aW9uIChlbG06IGFueSk6IGFueSB7XHJcblx0XHRcdFx0aWYgKCFkb20uaXNJbmxpbmUoZWxtLCB0cnVlKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGVsbTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsbSA9IGVsbSA/IGVsbS5wYXJlbnROb2RlIDogbnVsbDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGVsbSA/IGZ1bmMoZWxtKSA6IGVsbTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiBmdW5jKG5vZGUgfHwgdGhpcy5wYXJlbnROb2RlKCkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgYSBub2RlIGF0IGVpdGhlciB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7Qm9vbH0gc3RhcnRcclxuXHRcdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnROb2RlQXRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pbnNlcnROb2RlQXQgPSBmdW5jdGlvbiAoc3RhcnQ6IGJvb2xlYW4sIG5vZGU6IE5vZGUpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRSYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCByYW5nZSA9IHRoaXMuY2xvbmVTZWxlY3RlZCgpO1xyXG5cclxuXHRcdFx0aWYgKCFyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFuZ2UuY29sbGFwc2Uoc3RhcnQpO1xyXG5cdFx0XHRyYW5nZS5pbnNlcnROb2RlKG5vZGUpO1xyXG5cclxuXHRcdFx0Ly8gUmVzZWxlY3QgdGhlIGN1cnJlbnQgcmFuZ2UuXHJcblx0XHRcdC8vIEZpeGVzIGlzc3VlIHdpdGggQ2hyb21lIGxvc2luZyB0aGUgc2VsZWN0aW9uLiBJc3N1ZSM4MlxyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKGN1cnJlbnRSYW5nZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBzdGFydC9lbmQgbWFya2VycyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKiB3aGljaCBjYW4gYmUgdXNlZCBieSByZXN0b3JlUmFuZ2UgdG8gcmUtc2VsZWN0IHRoZVxyXG5cdFx0ICogcmFuZ2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnRNYXJrZXJzXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0TWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRSYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cdFx0XHR2YXIgc3RhcnROb2RlID0gX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcik7XHJcblxyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcnMoKTtcclxuXHRcdFx0dGhpcy5pbnNlcnROb2RlQXQodHJ1ZSwgc3RhcnROb2RlKTtcclxuXHJcblx0XHRcdC8vIEZpeGVzIGlzc3VlIHdpdGggZW5kIG1hcmtlciBzb21ldGltZXMgYmVpbmcgcGxhY2VkIGJlZm9yZVxyXG5cdFx0XHQvLyB0aGUgc3RhcnQgbWFya2VyIHdoZW4gdGhlIHJhbmdlIGlzIGNvbGxhcHNlZC5cclxuXHRcdFx0aWYgKGN1cnJlbnRSYW5nZSAmJiBjdXJyZW50UmFuZ2UuY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0c3RhcnROb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxyXG5cdFx0XHRcdFx0X2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpLCBzdGFydE5vZGUubmV4dFNpYmxpbmcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaW5zZXJ0Tm9kZUF0KGZhbHNlLCBfY3JlYXRlTWFya2VyKGVuZE1hcmtlcikpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQHJldHVybiB7Tm9kZX1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0TWFya2VyXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZ2V0TWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XHJcblx0XHRcdHJldHVybiBkb2MuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZXMgdGhlIG1hcmtlciB3aXRoIHRoZSBzcGVjaWZpZWQgSURcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcmVtb3ZlTWFya2VyXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XHJcblx0XHRcdHZhciBtYXJrZXIgPSB0aGlzLmdldE1hcmtlcihpZCk7XHJcblxyXG5cdFx0XHRpZiAobWFya2VyKSB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZShtYXJrZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2F2ZXMgdGhlIGN1cnJlbnQgcmFuZ2UgbG9jYXRpb24uIEFsaWFzIG9mIGluc2VydE1hcmtlcnMoKVxyXG5cdFx0ICpcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2F2ZVJhZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zYXZlUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuaW5zZXJ0TWFya2VycygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNlbGVjdCB0aGUgc3BlY2lmaWVkIHJhbmdlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtSYW5nZX0gcmFuZ2VcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2VsZWN0UmFuZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zZWxlY3RSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xyXG5cdFx0XHR2YXIgbGFzdENoaWxkO1xyXG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cdFx0XHR2YXIgY29udGFpbmVyID0gcmFuZ2UuZW5kQ29udGFpbmVyO1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgY3Vyc29yIGlzIHNldCBhZnRlciBhIEJSIHdoZW4gdGhlIEJSIGlzIHRoZSBvbmx5XHJcblx0XHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXHJcblx0XHRcdC8vIHRvIG9jY3VyIHdoZW4gc29tZXRoaW5nIGlzIHR5cGVkLiBTZWUgaXNzdWUgIzMyMVxyXG5cdFx0XHRpZiAocmFuZ2UuY29sbGFwc2VkICYmIGNvbnRhaW5lciAmJlxyXG5cdFx0XHRcdCFkb20uaXNJbmxpbmUoY29udGFpbmVyLCB0cnVlKSkge1xyXG5cclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBjb250YWluZXIubGFzdENoaWxkO1xyXG5cdFx0XHRcdHdoaWxlIChsYXN0Q2hpbGQgJiYgZG9tLmlzKGxhc3RDaGlsZCwgJy5lbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRcdGxhc3RDaGlsZCA9IGxhc3RDaGlsZC5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoZG9tLmlzKGxhc3RDaGlsZCwgJ2JyJykpIHtcclxuXHRcdFx0XHRcdHZhciBybmcgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdHJuZy5zZXRFbmRBZnRlcihsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0cm5nLmNvbGxhcHNlKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5jb21wYXJlKHJhbmdlLCBybmcpKSB7XHJcblx0XHRcdFx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKGxhc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbCkge1xyXG5cdFx0XHRcdHRoaXMuY2xlYXIoKTtcclxuXHRcdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVzdG9yZXMgdGhlIGxhc3QgcmFuZ2Ugc2F2ZWQgYnkgc2F2ZVJhbmdlKCkgb3IgaW5zZXJ0TWFya2VycygpXHJcblx0XHQgKlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZXN0b3JlUmFuZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZXN0b3JlUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpc0NvbGxhcHNlZCwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKSwgc3RhcnQgPSB0aGlzLmdldE1hcmtlcihzdGFydE1hcmtlciksIGVuZCA9IHRoaXMuZ2V0TWFya2VyKGVuZE1hcmtlcik7XHJcblxyXG5cdFx0XHRpZiAoIXN0YXJ0IHx8ICFlbmQgfHwgIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpc0NvbGxhcHNlZCA9IHN0YXJ0Lm5leHRTaWJsaW5nID09PSBlbmQ7XHJcblxyXG5cdFx0XHRyYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShzdGFydCk7XHJcblx0XHRcdHJhbmdlLnNldEVuZEFmdGVyKGVuZCk7XHJcblxyXG5cdFx0XHRpZiAoaXNDb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zZWxlY3RSYW5nZShyYW5nZSk7XHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNlbGVjdHMgdGhlIHRleHQgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGxlZnRcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSByaWdodFxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdE91dGVyVGV4dCA9IGZ1bmN0aW9uIChsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIpIHtcclxuXHRcdFx0bGV0IHN0YXJ0OiBhbnksIGVuZDogYW55LCByYW5nZTogYW55ID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcblxyXG5cdFx0XHRzdGFydCA9IG91dGVyVGV4dChyYW5nZSwgdHJ1ZSwgbGVmdCk7XHJcblx0XHRcdGVuZCA9IG91dGVyVGV4dChyYW5nZSwgZmFsc2UsIHJpZ2h0KTtcclxuXHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0KHN0YXJ0Lm5vZGUsIHN0YXJ0Lm9mZnNldCk7XHJcblx0XHRcdHJhbmdlLnNldEVuZChlbmQubm9kZSwgZW5kLm9mZnNldCk7XHJcblxyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKHJhbmdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSB0ZXh0IGxlZnQgb3IgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBiZWZvcmVcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RPdXRlclRleHRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRPdXRlclRleHQgPSBmdW5jdGlvbiAoYmVmb3JlLCBsZW5ndGgpIHtcclxuXHRcdFx0dmFyIHJhbmdlID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZSghYmVmb3JlKTtcclxuXHJcblx0XHRcdHJldHVybiBvdXRlclRleHQocmFuZ2UsIGJlZm9yZSwgbGVuZ3RoKS50ZXh0O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlcGxhY2VzIGtleXdvcmRzIHdpdGggdmFsdWVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IGNhcmV0IHBvc2l0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtBcnJheX0gICBrZXl3b3Jkc1xyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQWZ0ZXIgICAgICBJZiB0byBpbmNsdWRlIHRoZSB0ZXh0IGFmdGVyIHRoZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50IGNhcmV0IHBvc2l0aW9uIG9yIGp1c3RcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCBiZWZvcmVcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0ga2V5d29yZHNTb3J0ZWQgICAgSWYgdGhlIGtleXdvcmRzIGFycmF5IGlzIHByZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgc2hvcnRlc3QgdG8gbG9uZ2VzdFxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9ICBsb25nZXN0S2V5d29yZCAgICBMZW5ndGggb2YgdGhlIGxvbmdlc3Qga2V5d29yZFxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSByZXF1aXJlV2hpdGVzcGFjZSBJZiB0aGUga2V5IG11c3QgYmUgc3Vycm91bmRlZFxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieSB3aGl0ZXNwYWNlXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gIGtleXByZXNzQ2hhciAgICAgIElmIHRoaXMgaXMgYmVpbmcgY2FsbGVkIGZyb21cclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBrZXlwcmVzcyBldmVudCwgdGhpcyBzaG91bGQgYmVcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0IHRvIHRoZSBwcmVzc2VkIGNoYXJhY3RlclxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcmVwbGFjZUtleXdvcmRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuXHRcdHRoaXMucmVwbGFjZUtleXdvcmQgPSBmdW5jdGlvbiAoXHJcblx0XHRcdGtleXdvcmRzLFxyXG5cdFx0XHRpbmNsdWRlQWZ0ZXIsXHJcblx0XHRcdGtleXdvcmRzU29ydGVkLFxyXG5cdFx0XHRsb25nZXN0S2V5d29yZCxcclxuXHRcdFx0cmVxdWlyZVdoaXRlc3BhY2UsXHJcblx0XHRcdGtleXByZXNzQ2hhclxyXG5cdFx0KSB7XHJcblx0XHRcdGlmICgha2V5d29yZHNTb3J0ZWQpIHtcclxuXHRcdFx0XHRrZXl3b3Jkcy5zb3J0KGZ1bmN0aW9uIChhOiBhbnksIGI6IGFueSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBvdXRlclRleHQsIG1hdGNoLCBtYXRjaFBvcywgc3RhcnRJbmRleCwgbGVmdExlbiwgY2hhcnNMZWZ0LCBrZXl3b3JkLCBrZXl3b3JkTGVuLCB3aGl0ZXNwYWNlUmVnZXggPSAnKF58W1xcXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKScsIGtleXdvcmRJZHggPSBrZXl3b3Jkcy5sZW5ndGgsIHdoaXRlc3BhY2VMZW4gPSByZXF1aXJlV2hpdGVzcGFjZSA/IDEgOiAwLCBtYXhLZXlMZW4gPSBsb25nZXN0S2V5d29yZCB8fFxyXG5cdFx0XHRcdGtleXdvcmRzW2tleXdvcmRJZHggLSAxXVswXS5sZW5ndGg7XHJcblxyXG5cdFx0XHRpZiAocmVxdWlyZVdoaXRlc3BhY2UpIHtcclxuXHRcdFx0XHRtYXhLZXlMZW4rKztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0a2V5cHJlc3NDaGFyID0ga2V5cHJlc3NDaGFyIHx8ICcnO1xyXG5cdFx0XHRvdXRlclRleHQgPSB0aGlzLmdldE91dGVyVGV4dCh0cnVlLCBtYXhLZXlMZW4pO1xyXG5cdFx0XHRsZWZ0TGVuID0gb3V0ZXJUZXh0Lmxlbmd0aDtcclxuXHRcdFx0b3V0ZXJUZXh0ICs9IGtleXByZXNzQ2hhcjtcclxuXHJcblx0XHRcdGlmIChpbmNsdWRlQWZ0ZXIpIHtcclxuXHRcdFx0XHRvdXRlclRleHQgKz0gdGhpcy5nZXRPdXRlclRleHQoZmFsc2UsIG1heEtleUxlbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChrZXl3b3JkSWR4LS0pIHtcclxuXHRcdFx0XHRrZXl3b3JkID0ga2V5d29yZHNba2V5d29yZElkeF1bMF07XHJcblx0XHRcdFx0a2V5d29yZExlbiA9IGtleXdvcmQubGVuZ3RoO1xyXG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBNYXRoLm1heCgwLCBsZWZ0TGVuIC0ga2V5d29yZExlbiAtIHdoaXRlc3BhY2VMZW4pO1xyXG5cdFx0XHRcdG1hdGNoUG9zID0gLTE7XHJcblxyXG5cdFx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xyXG5cdFx0XHRcdFx0bWF0Y2ggPSBvdXRlclRleHRcclxuXHRcdFx0XHRcdFx0LnN1YnN0cihzdGFydEluZGV4KVxyXG5cdFx0XHRcdFx0XHQubWF0Y2gobmV3IFJlZ0V4cCh3aGl0ZXNwYWNlUmVnZXggK1xyXG5cdFx0XHRcdFx0XHRcdGVzY2FwZS5yZWdleChrZXl3b3JkKSArIHdoaXRlc3BhY2VSZWdleCkpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xyXG5cdFx0XHRcdFx0XHQvLyBBZGQgdGhlIGxlbmd0aCBvZiB0aGUgdGV4dCB0aGF0IHdhcyByZW1vdmVkIGJ5XHJcblx0XHRcdFx0XHRcdC8vIHN1YnN0cigpIGFuZCBhbHNvIGFkZCAxIGZvciB0aGUgd2hpdGVzcGFjZVxyXG5cdFx0XHRcdFx0XHRtYXRjaFBvcyA9IG1hdGNoLmluZGV4ICsgc3RhcnRJbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWF0Y2hQb3MgPSBvdXRlclRleHQuaW5kZXhPZihrZXl3b3JkLCBzdGFydEluZGV4KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChtYXRjaFBvcyA+IC0xKSB7XHJcblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIG1hdGNoIGlzIGJldHdlZW4gYmVmb3JlIGFuZFxyXG5cdFx0XHRcdFx0Ly8gYWZ0ZXIsIG5vdCBqdXN0IGVudGlyZWx5IGluIG9uZSBzaWRlIG9yIHRoZSBvdGhlclxyXG5cdFx0XHRcdFx0aWYgKG1hdGNoUG9zIDw9IGxlZnRMZW4gJiZcclxuXHRcdFx0XHRcdFx0bWF0Y2hQb3MgKyBrZXl3b3JkTGVuICsgd2hpdGVzcGFjZUxlbiA+PSBsZWZ0TGVuKSB7XHJcblx0XHRcdFx0XHRcdGNoYXJzTGVmdCA9IGxlZnRMZW4gLSBtYXRjaFBvcztcclxuXHJcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBrZXlwcmVzcyBjaGFyIGlzIHdoaXRlIHNwYWNlIHRoZW4gaXQgc2hvdWxkXHJcblx0XHRcdFx0XHRcdC8vIG5vdCBiZSByZXBsYWNlZCwgb25seSBjaGFycyB0aGF0IGFyZSBwYXJ0IG9mIHRoZVxyXG5cdFx0XHRcdFx0XHQvLyBrZXkgc2hvdWxkIGJlIHJlcGxhY2VkLlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdE91dGVyVGV4dChcclxuXHRcdFx0XHRcdFx0XHRjaGFyc0xlZnQsXHJcblx0XHRcdFx0XHRcdFx0a2V5d29yZExlbiAtIGNoYXJzTGVmdCAtXHJcblx0XHRcdFx0XHRcdFx0KC9eXFxTLy50ZXN0KGtleXByZXNzQ2hhcikgPyAxIDogMClcclxuXHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuaW5zZXJ0SFRNTChrZXl3b3Jkc1trZXl3b3JkSWR4XVsxXSk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENvbXBhcmVzIHR3byByYW5nZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgcmFuZ2VCIGlzIHVuZGVmaW5lZCBpdCB3aWxsIGJlIHNldCB0b1xyXG5cdFx0ICogdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtSYW5nZX0gcm5nQVxyXG5cdFx0ICogQHBhcmFtICB7UmFuZ2V9IFtybmdCXVxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY29tcGFyZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNvbXBhcmUgPSBmdW5jdGlvbiAocm5nQT86IFJhbmdlLCBybmdCPzogUmFuZ2UpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKCFybmdCKSB7XHJcblx0XHRcdFx0cm5nQiA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXJuZ0EgfHwgIXJuZ0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gIXJuZ0EgJiYgIXJuZ0I7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBybmdBLmNvbXBhcmVCb3VuZGFyeVBvaW50cyhSYW5nZS5FTkRfVE9fRU5ELCBybmdCKSA9PT0gMCAmJlxyXG5cdFx0XHRcdHJuZ0EuY29tcGFyZUJvdW5kYXJ5UG9pbnRzKFJhbmdlLlNUQVJUX1RPX1NUQVJULCBybmdCKSA9PT0gMDtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmVzIGFueSBjdXJyZW50IHNlbGVjdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEBzaW5jZSAxLjQuNlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjbGVhclxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKHNlbCkge1xyXG5cdFx0XHRcdGlmIChzZWwucmVtb3ZlQWxsUmFuZ2VzKSB7XHJcblx0XHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChzZWwuZW1wdHkpIHtcclxuXHRcdFx0XHRcdHNlbC5lbXB0eSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFByZXBhcmVzIEhUTUwgdG8gYmUgaW5zZXJ0ZWQgYnkgYWRkaW5nIGEgemVybyB3aWR0aCBzcGFjZVxyXG5cdFx0ICogaWYgdGhlIGxhc3QgY2hpbGQgaXMgZW1wdHkgYW5kIGFkZGluZyB0aGUgcmFuZ2Ugc3RhcnQvZW5kXHJcblx0XHQgKiBtYXJrZXJzIHRvIHRoZSBsYXN0IGNoaWxkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBub2RlXHJcblx0XHQgKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW2VuZE5vZGVdXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBbcmV0dXJuSHRtbF1cclxuXHRcdCAqIEByZXR1cm4ge05vZGV8c3RyaW5nfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0X3ByZXBhcmVJbnB1dCA9IChub2RlOiBOb2RlIHwgc3RyaW5nLCBlbmROb2RlOiBIVE1MRWxlbWVudCB8IHN0cmluZywgcmV0dXJuSHRtbD86IGJvb2xlYW4pOiBOb2RlIHwgc3RyaW5nID0+IHtcclxuXHRcdFx0dmFyIGxhc3RDaGlsZCwgZnJhZyA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0aWYgKGVuZE5vZGUpIHtcclxuXHRcdFx0XHRcdG5vZGUgKz0gdGhpcy5zZWxlY3RlZEh0bWwoKSArIGVuZE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmcmFnID0gZG9tLnBhcnNlSFRNTChub2RlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgaHRtbE5vZGUgPSBub2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBodG1sTm9kZSk7XHJcblxyXG5cdFx0XHRcdGlmICh0eXBlb2YgZW5kTm9kZSAhPT0gJ3N0cmluZycgJiYgZW5kTm9kZSkge1xyXG5cdFx0XHRcdFx0bGV0IGV4dHJhY3RlZCA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLmV4dHJhY3RDb250ZW50cygpO1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGV4dHJhY3RlZCk7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgZW5kTm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShsYXN0Q2hpbGQgPSBmcmFnLmxhc3RDaGlsZCkpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlICghZG9tLmlzSW5saW5lKGxhc3RDaGlsZC5sYXN0Q2hpbGQsIHRydWUpKSB7XHJcblx0XHRcdFx0bGFzdENoaWxkID0gbGFzdENoaWxkLmxhc3RDaGlsZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGRvbS5jYW5IYXZlQ2hpbGRyZW4obGFzdENoaWxkKSkge1xyXG5cdFx0XHRcdC8vIFdlYmtpdCB3b24ndCBhbGxvdyB0aGUgY3Vyc29yIHRvIGJlIHBsYWNlZCBpbnNpZGUgYW5cclxuXHRcdFx0XHQvLyBlbXB0eSB0YWcsIHNvIGFkZCBhIHplcm8gd2lkdGggc3BhY2UgdG8gaXQuXHJcblx0XHRcdFx0aWYgKCFsYXN0Q2hpbGQubGFzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRsZXQgdHh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdcXHUyMDBCJyk7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCB0eHROb2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGFzdENoaWxkID0gZnJhZztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXJzKCk7XHJcblxyXG5cdFx0XHQvLyBBcHBlbmQgbWFya3MgdG8gbGFzdCBjaGlsZCBzbyB3aGVuIHJlc3RvcmVkIGN1cnNvciB3aWxsIGJlIGluXHJcblx0XHRcdC8vIHRoZSByaWdodCBwbGFjZVxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCBfY3JlYXRlTWFya2VyKHN0YXJ0TWFya2VyKSk7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XHJcblxyXG5cdFx0XHRpZiAocmV0dXJuSHRtbCkge1xyXG5cdFx0XHRcdHZhciBkaXYgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgZnJhZyk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZnJhZztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDcmVhdGVzIGEgbWFya2VyIG5vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuXHRcdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdF9jcmVhdGVNYXJrZXIgPSAoaWQ6IHN0cmluZyk6IEhUTUxTcGFuRWxlbWVudCA9PiB7XHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VyKGlkKTtcclxuXHJcblx0XHRcdHZhciBtYXJrZXIgPSBkb20uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcclxuXHRcdFx0XHRpZDogaWQsXHJcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLXNlbGVjdGlvbiBlbWxlZGl0b3ItaWdub3JlJyxcclxuXHRcdFx0XHRzdHlsZTogJ2Rpc3BsYXk6bm9uZTtsaW5lLWhlaWdodDowJ1xyXG5cdFx0XHR9LCBkb2MpO1xyXG5cclxuXHRcdFx0bWFya2VyLmlubmVySFRNTCA9ICcgJztcclxuXHJcblx0XHRcdHJldHVybiBtYXJrZXI7XHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iLCJ2YXIgVVNFUl9BR0VOVCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbi8qKlxuICogRGV0ZWN0cyBpZiB0aGUgYnJvd3NlciBpcyBpT1NcbiAqXG4gKiBOZWVkZWQgdG8gZml4IGlPUyBzcGVjaWZpYyBidWdzXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBpb3NcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlvcyA9IC9pUGhvbmV8aVBvZHxpUGFkfCB3b3Nicm93c2VyXFwvL2kudGVzdChVU0VSX0FHRU5UKTtcblxuLyoqXG4gKiBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBXWVNJV1lHIGVkaXRpbmcgKGUuZy4gb2xkZXIgbW9iaWxlIGJyb3dzZXJzKS5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIGlzV3lzaXd5Z1N1cHBvcnRlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpc1d5c2l3eWdTdXBwb3J0ZWQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXJcdG1hdGNoLCBpc1Vuc3VwcG9ydGVkO1xuXG5cdC8vIElFIGlzIHRoZSBvbmx5IGJyb3dzZXIgdG8gc3VwcG9ydCBkb2N1bWVudE1vZGVcblx0dmFyIGllID0gISF3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRNb2RlO1xuXHR2YXIgbGVnYWN5RWRnZSA9ICctbXMtaW1lLWFsaWduJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cblx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRkaXYuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcblxuXHQvLyBDaGVjayBpZiB0aGUgY29udGVudEVkaXRhYmxlIGF0dHJpYnV0ZSBpcyBzdXBwb3J0ZWRcblx0aWYgKCEoJ2NvbnRlbnRFZGl0YWJsZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB8fFxuXHRcdGRpdi5jb250ZW50RWRpdGFibGUgIT09ICd0cnVlJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEkgdGhpbmsgYmxhY2tiZXJyeSBzdXBwb3J0cyBjb250ZW50RWRpdGFibGUgb3Igd2lsbCBhdCBsZWFzdFxuXHQvLyBnaXZlIGEgdmFsaWQgdmFsdWUgZm9yIHRoZSBjb250ZW50RWRpdGFibGUgZGV0ZWN0aW9uIGFib3ZlXG5cdC8vIHNvIGl0IGlzbid0IGluY2x1ZGVkIGluIHRoZSBiZWxvdyB0ZXN0cy5cblxuXHQvLyBJIGhhdGUgaGF2aW5nIHRvIGRvIFVBIHNuaWZmaW5nIGJ1dCBzb21lIG1vYmlsZSBicm93c2VycyBzYXkgdGhleVxuXHQvLyBzdXBwb3J0IGNvbnRlbnRlZGlhYmxlIHdoZW4gaXQgaXNuJ3QgdXNhYmxlLCBpLmUuIHlvdSBjYW4ndCBlbnRlclxuXHQvLyB0ZXh0LlxuXHQvLyBUaGlzIGlzIHRoZSBvbmx5IHdheSBJIGNhbiB0aGluayBvZiB0byBkZXRlY3QgdGhlbSB3aGljaCBpcyBhbHNvIGhvd1xuXHQvLyBldmVyeSBvdGhlciBlZGl0b3IgSSd2ZSBzZWVuIGRlYWxzIHdpdGggdGhpcyBpc3N1ZS5cblxuXHQvLyBFeGNsdWRlIE9wZXJhIG1vYmlsZSBhbmQgbWluaVxuXHRpc1Vuc3VwcG9ydGVkID0gL09wZXJhIE1vYml8T3BlcmEgTWluaS9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cblx0aWYgKC9BbmRyb2lkL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSB0cnVlO1xuXG5cdFx0aWYgKC9TYWZhcmkvLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRcdC8vIEFuZHJvaWQgYnJvd3NlciA1MzQrIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGVcblx0XHRcdC8vIFRoaXMgYWxzbyBtYXRjaGVzIENocm9tZSB3aGljaCBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlIHRvb1xuXHRcdFx0bWF0Y2ggPSAvU2FmYXJpXFwvKFxcZCspLy5leGVjKFVTRVJfQUdFTlQpO1xuXHRcdFx0aXNVbnN1cHBvcnRlZCA9ICghbWF0Y2ggfHwgIW1hdGNoWzFdID8gdHJ1ZSA6IG1hdGNoWzFdIDwgNTM0KTtcblx0XHR9XG5cdH1cblxuXHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIEFtYXpvbiBTaWxrIHN1cHBvcnRzIGl0LCBvbGRlciB2ZXJzaW9ucyBkaWRuJ3Rcblx0Ly8gQXMgaXQgdXNlcyB3ZWJraXQgbGlrZSBBbmRyb2lkLCBhc3N1bWUgaXQncyB0aGUgc2FtZSBhbmQgc3RhcnRlZFxuXHQvLyB3b3JraW5nIGF0IHZlcnNpb25zID49IDUzNFxuXHRpZiAoLyBTaWxrXFwvL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdG1hdGNoID0gL0FwcGxlV2ViS2l0XFwvKFxcZCspLy5leGVjKFVTRVJfQUdFTlQpO1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSAoIW1hdGNoIHx8ICFtYXRjaFsxXSA/IHRydWUgOiBtYXRjaFsxXSA8IDUzNCk7XG5cdH1cblxuXHQvLyBpT1MgNSsgc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZVxuXHRpZiAoaW9zKSB7XG5cdFx0Ly8gQmxvY2sgYW55IHZlcnNpb24gPD0gNF94KF94KVxuXHRcdGlzVW5zdXBwb3J0ZWQgPSAvT1MgWzAtNF0oX1xcZCkrIGxpa2UgTWFjL2kudGVzdChVU0VSX0FHRU5UKTtcblx0fVxuXG5cdC8vIEZpcmVmb3ggZG9lcyBzdXBwb3J0IFdZU0lXWUcgb24gbW9iaWxlcyBzbyBvdmVycmlkZVxuXHQvLyBhbnkgcHJldmlvdXMgdmFsdWUgaWYgdXNpbmcgRkZcblx0aWYgKC9GaXJlZm94L2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdGlmICgvT25lQnJvd3Nlci9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHQvLyBVQ0Jyb3dzZXIgd29ya3MgYnV0IGRvZXNuJ3QgZ2l2ZSBhIHVuaXF1ZSB1c2VyIGFnZW50XG5cdGlmIChuYXZpZ2F0b3IudmVuZG9yID09PSAnVUNXRUInKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gSUUgYW5kIGxlZ2FjeSBlZGdlIGFyZSBub3Qgc3VwcG9ydGVkIGFueSBtb3JlXG5cdGlmIChpZSB8fCBsZWdhY3lFZGdlKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IHRydWU7XG5cdH1cblxuXHRyZXR1cm4gIWlzVW5zdXBwb3J0ZWQ7XG59KCkpO1xuIiwiaW1wb3J0IHsgYXR0ciB9IGZyb20gJy4vZG9tJztcclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IG9wdGlvbnMgZm9yIEVtbEVkaXRvclxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcblx0LyoqXHJcblx0ICogVG9vbGJhciBidXR0b25zIG9yZGVyIGFuZCBncm91cHMuIFNob3VsZCBiZSBjb21tYSBzZXBhcmF0ZWQgYW5kXHJcblx0ICogaGF2ZSBhIGJhciB8IHRvIHNlcGFyYXRlIGdyb3Vwc1xyXG5cdCAqXHJcblx0ICogQHR5cGUge3N0cmluZ31cclxuXHQgKi9cclxuXHR0b29sYmFyOiAnYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZSxzdWJzY3JpcHQsc3VwZXJzY3JpcHR8JyArXHJcblx0XHQnbGVmdCxjZW50ZXIscmlnaHQsanVzdGlmeXxmb250LHNpemUsY29sb3IscmVtb3ZlZm9ybWF0fCcgK1xyXG5cdFx0J2N1dCxjb3B5LHBhc3RldGV4dHxidWxsZXRsaXN0LG9yZGVyZWRsaXN0LGluZGVudCxvdXRkZW50fCcgK1xyXG5cdFx0J3RhYmxlfGNvZGUscXVvdGV8aG9yaXpvbnRhbHJ1bGUsaW1hZ2UsZW1haWwsbGluayx1bmxpbmt8JyArXHJcblx0XHQnZW1vdGljb24seW91dHViZSxkYXRlLHRpbWV8bHRyLHJ0bHxwcmludCxtYXhpbWl6ZSxzb3VyY2UnLFxyXG5cclxuXHQvKipcclxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBjb21tYW5kcyB0byBleGNsdWRlcyBmcm9tIHRoZSB0b29sYmFyXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdHRvb2xiYXJFeGNsdWRlOiBudWxsLFxyXG5cclxuXHQvKipcclxuXHQgKiBTdHlsZXNoZWV0IHRvIGluY2x1ZGUgaW4gdGhlIFdZU0lXWUcgZWRpdG9yLiBUaGlzIGlzIHdoYXQgd2lsbCBzdHlsZVxyXG5cdCAqIHRoZSBXWVNJV1lHIGVsZW1lbnRzXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdHN0eWxlOiAnanF1ZXJ5LmVtbGVkaXRvci5kZWZhdWx0LmNzcycsXHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGZvbnRzIGZvciB0aGUgZm9udCBzZWxlY3RvclxyXG5cdCAqXHJcblx0ICogQHR5cGUge3N0cmluZ31cclxuXHQgKi9cclxuXHRmb250czogJ0FyaWFsLEFyaWFsIEJsYWNrLENvbWljIFNhbnMgTVMsQ291cmllciBOZXcsR2VvcmdpYSxJbXBhY3QsJyArXHJcblx0XHQnU2Fucy1zZXJpZixTZXJpZixUaW1lcyBOZXcgUm9tYW4sVHJlYnVjaGV0IE1TLFZlcmRhbmEnLFxyXG5cclxuXHQvKipcclxuXHQgKiBDb2xvcnMgc2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmQgaGF2ZSBhIGJhciB8IHRvIHNpZ25hbCBhIG5ld1xyXG5cdCAqIGNvbHVtbi5cclxuXHQgKlxyXG5cdCAqIElmIG51bGwgdGhlIGNvbG9ycyB3aWxsIGJlIGF1dG8gZ2VuZXJhdGVkLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge3N0cmluZ31cclxuXHQgKi9cclxuXHRjb2xvcnM6ICcjMDAwMDAwLCM0NEI4RkYsIzFFOTJGNywjMDA3NEQ5LCMwMDVEQzIsIzAwMzY5QiwjYjNkNWY0fCcgK1xyXG5cdFx0XHQnIzQ0NDQ0NCwjQzNGRkZGLCM5REY5RkYsIzdGREJGRiwjNjhDNEU4LCM0MTlEQzEsI2Q5ZjRmZnwnICtcclxuXHRcdFx0JyM2NjY2NjYsIzcyRkY4NCwjNENFQTVFLCMyRUNDNDAsIzE3QjUyOSwjMDA4RTAyLCNjMGYwYzZ8JyArXHJcblx0XHRcdCcjODg4ODg4LCNGRkZGNDQsI0ZGRkExRSwjRkZEQzAwLCNFOEM1MDAsI0MxOUUwMCwjZmZmNWIzfCcgK1xyXG5cdFx0XHQnI2FhYWFhYSwjRkZDOTVGLCNGRkEzMzksI0ZGODUxQiwjRTg2RTA0LCNDMTQ3MDAsI2ZmZGJiYnwnICtcclxuXHRcdFx0JyNjY2NjY2MsI0ZGODU3QSwjRkY1RjU0LCNGRjQxMzYsI0U4MkExRiwjQzEwMzAwLCNmZmM2YzN8JyArXHJcblx0XHRcdCcjZWVlZWVlLCNGRjU2RkYsI0ZGMzBEQywjRjAxMkJFLCNEOTAwQTcsI0IyMDA4MCwjZmJiOGVjfCcgK1xyXG5cdFx0XHQnI2ZmZmZmZiwjRjU1MUZGLCNDRjJCRTcsI0IxMERDOSwjOUEwMEIyLCM5QTAwQjIsI2U4YjZlZicsXHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBsb2NhbGUgdG8gdXNlLlxyXG5cdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0ICovXHJcblx0bG9jYWxlOiBhdHRyKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ2xhbmcnKSB8fCAnZW4nLFxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgQ2hhcnNldCB0byB1c2VcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGNoYXJzZXQ6ICd1dGYtOCcsXHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbXBhdGliaWxpdHkgbW9kZSBmb3IgZW1vdGljb25zLlxyXG5cdCAqXHJcblx0ICogSGVscHMgaWYgeW91IGhhdmUgZW1vdGljb25zIHN1Y2ggYXMgOi8gd2hpY2ggd291bGQgcHV0IGFuIGVtb3RpY29uXHJcblx0ICogaW5zaWRlIGh0dHA6Ly9cclxuXHQgKlxyXG5cdCAqIFRoaXMgbW9kZSByZXF1aXJlcyBlbW90aWNvbnMgdG8gYmUgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlIG9yIGVuZCBvZlxyXG5cdCAqIGxpbmUgY2hhcnMuIFRoaXMgbW9kZSBoYXMgbGltaXRlZCBBcyBZb3UgVHlwZSBlbW90aWNvbiBjb252ZXJzaW9uXHJcblx0ICogc3VwcG9ydC4gSXQgd2lsbCBub3QgcmVwbGFjZSBBWVQgZm9yIGVuZCBvZiBsaW5lIGNoYXJzLCBvbmx5XHJcblx0ICogZW1vdGljb25zIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZS4gVGhleSB3aWxsIHN0aWxsIGJlIHJlcGxhY2VkXHJcblx0ICogY29ycmVjdGx5IHdoZW4gbG9hZGVkIGp1c3Qgbm90IEFZVC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGVtb3RpY29uc0NvbXBhdDogZmFsc2UsXHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRvIGVuYWJsZSBlbW90aWNvbnMuIENhbiBiZSBjaGFuZ2VzIGF0IHJ1bnRpbWUgdXNpbmcgdGhlXHJcblx0ICogZW1vdGljb25zKCkgbWV0aG9kLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQHNpbmNlIDEuNC4yXHJcblx0ICovXHJcblx0ZW1vdGljb25zRW5hYmxlZDogdHJ1ZSxcclxuXHJcblx0LyoqXHJcblx0ICogRW1vdGljb24gcm9vdCBVUkxcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0ICovXHJcblx0ZW1vdGljb25zUm9vdDogJycsXHJcblx0ZW1vdGljb25zOiB7XHJcblx0XHRkcm9wZG93bjoge1xyXG5cdFx0XHQnOiknOiAnZW1vdGljb25zL3NtaWxlLnBuZycsXHJcblx0XHRcdCc6YW5nZWw6JzogJ2Vtb3RpY29ucy9hbmdlbC5wbmcnLFxyXG5cdFx0XHQnOmFuZ3J5Oic6ICdlbW90aWNvbnMvYW5ncnkucG5nJyxcclxuXHRcdFx0JzgtKSc6ICdlbW90aWNvbnMvY29vbC5wbmcnLFxyXG5cdFx0XHQnOlxcJygnOiAnZW1vdGljb25zL2N3eS5wbmcnLFxyXG5cdFx0XHQnOmVybW06JzogJ2Vtb3RpY29ucy9lcm1tLnBuZycsXHJcblx0XHRcdCc6RCc6ICdlbW90aWNvbnMvZ3Jpbi5wbmcnLFxyXG5cdFx0XHQnPDMnOiAnZW1vdGljb25zL2hlYXJ0LnBuZycsXHJcblx0XHRcdCc6KCc6ICdlbW90aWNvbnMvc2FkLnBuZycsXHJcblx0XHRcdCc6Tyc6ICdlbW90aWNvbnMvc2hvY2tlZC5wbmcnLFxyXG5cdFx0XHQnOlAnOiAnZW1vdGljb25zL3Rvbmd1ZS5wbmcnLFxyXG5cdFx0XHQnOyknOiAnZW1vdGljb25zL3dpbmsucG5nJ1xyXG5cdFx0fSxcclxuXHRcdG1vcmU6IHtcclxuXHRcdFx0JzphbGllbjonOiAnZW1vdGljb25zL2FsaWVuLnBuZycsXHJcblx0XHRcdCc6Ymxpbms6JzogJ2Vtb3RpY29ucy9ibGluay5wbmcnLFxyXG5cdFx0XHQnOmJsdXNoOic6ICdlbW90aWNvbnMvYmx1c2gucG5nJyxcclxuXHRcdFx0JzpjaGVlcmZ1bDonOiAnZW1vdGljb25zL2NoZWVyZnVsLnBuZycsXHJcblx0XHRcdCc6ZGV2aWw6JzogJ2Vtb3RpY29ucy9kZXZpbC5wbmcnLFxyXG5cdFx0XHQnOmRpenp5Oic6ICdlbW90aWNvbnMvZGl6enkucG5nJyxcclxuXHRcdFx0JzpnZXRsb3N0Oic6ICdlbW90aWNvbnMvZ2V0bG9zdC5wbmcnLFxyXG5cdFx0XHQnOmhhcHB5Oic6ICdlbW90aWNvbnMvaGFwcHkucG5nJyxcclxuXHRcdFx0JzpraXNzaW5nOic6ICdlbW90aWNvbnMva2lzc2luZy5wbmcnLFxyXG5cdFx0XHQnOm5pbmphOic6ICdlbW90aWNvbnMvbmluamEucG5nJyxcclxuXHRcdFx0JzpwaW5jaDonOiAnZW1vdGljb25zL3BpbmNoLnBuZycsXHJcblx0XHRcdCc6cG91dHk6JzogJ2Vtb3RpY29ucy9wb3V0eS5wbmcnLFxyXG5cdFx0XHQnOnNpY2s6JzogJ2Vtb3RpY29ucy9zaWNrLnBuZycsXHJcblx0XHRcdCc6c2lkZXdheXM6JzogJ2Vtb3RpY29ucy9zaWRld2F5cy5wbmcnLFxyXG5cdFx0XHQnOnNpbGx5Oic6ICdlbW90aWNvbnMvc2lsbHkucG5nJyxcclxuXHRcdFx0JzpzbGVlcGluZzonOiAnZW1vdGljb25zL3NsZWVwaW5nLnBuZycsXHJcblx0XHRcdCc6dW5zdXJlOic6ICdlbW90aWNvbnMvdW5zdXJlLnBuZycsXHJcblx0XHRcdCc6d29vdDonOiAnZW1vdGljb25zL3cwMHQucG5nJyxcclxuXHRcdFx0Jzp3YXNzYXQ6JzogJ2Vtb3RpY29ucy93YXNzYXQucG5nJ1xyXG5cdFx0fSxcclxuXHRcdGhpZGRlbjoge1xyXG5cdFx0XHQnOndoaXN0bGluZzonOiAnZW1vdGljb25zL3doaXN0bGluZy5wbmcnLFxyXG5cdFx0XHQnOmxvdmU6JzogJ2Vtb3RpY29ucy93dWIucG5nJ1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIFdpZHRoIG9mIHRoZSBlZGl0b3IuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWMgd2l0aFxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9udW1iZXJ9XHJcblx0ICovXHJcblx0d2lkdGg6IG51bGwsXHJcblxyXG5cdC8qKlxyXG5cdCAqIEhlaWdodCBvZiB0aGUgZWRpdG9yIGluY2x1ZGluZyB0b29sYmFyLiBTZXQgdG8gbnVsbCBmb3IgYXV0b21hdGljXHJcblx0ICogaGVpZ2h0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7P251bWJlcn1cclxuXHQgKi9cclxuXHRoZWlnaHQ6IG51bGwsXHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgcmVzaXplZFxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cmVzaXplRW5hYmxlZDogdHJ1ZSxcclxuXHJcblx0LyoqXHJcblx0ICogTWluIHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGhhbGYgdGV4dGFyZWEgd2lkdGggb3IgLTEgZm9yXHJcblx0ICogdW5saW1pdGVkXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7P251bWJlcn1cclxuXHQgKi9cclxuXHRyZXNpemVNaW5XaWR0aDogbnVsbCxcclxuXHQvKipcclxuXHQgKiBNaW4gcmVzaXplIHRvIGhlaWdodCwgc2V0IHRvIG51bGwgZm9yIGhhbGYgdGV4dGFyZWEgaGVpZ2h0IG9yIC0xIGZvclxyXG5cdCAqIHVubGltaXRlZFxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9udW1iZXJ9XHJcblx0ICovXHJcblx0cmVzaXplTWluSGVpZ2h0OiBudWxsLFxyXG5cdC8qKlxyXG5cdCAqIE1heCByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIGhlaWdodCBvciAtMVxyXG5cdCAqIGZvciB1bmxpbWl0ZWRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHJlc2l6ZU1heEhlaWdodDogbnVsbCxcclxuXHQvKipcclxuXHQgKiBNYXggcmVzaXplIHRvIHdpZHRoLCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxyXG5cdCAqIHVubGltaXRlZFxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9udW1iZXJ9XHJcblx0ICovXHJcblx0cmVzaXplTWF4V2lkdGg6IG51bGwsXHJcblx0LyoqXHJcblx0ICogSWYgcmVzaXppbmcgYnkgaGVpZ2h0IGlzIGVuYWJsZWRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHJlc2l6ZUhlaWdodDogdHJ1ZSxcclxuXHQvKipcclxuXHQgKiBJZiByZXNpemluZyBieSB3aWR0aCBpcyBlbmFibGVkXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRyZXNpemVXaWR0aDogdHJ1ZSxcclxuXHJcblx0LyoqXHJcblx0ICogRGF0ZSBmb3JtYXQsIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBsb2NhbGUgc3BlY2lmaWVzIG9uZS5cclxuXHQgKlxyXG5cdCAqIFRoZSB3b3JkcyB5ZWFyLCBtb250aCBhbmQgZGF5IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgdXNlcnMgY3VycmVudFxyXG5cdCAqIHllYXIsIG1vbnRoIGFuZCBkYXkuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGRhdGVGb3JtYXQ6ICd5ZWFyLW1vbnRoLWRheScsXHJcblxyXG5cdC8qKlxyXG5cdCAqIEVsZW1lbnQgdG8gaW5zZXQgdGhlIHRvb2xiYXIgaW50by5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cclxuXHQgKi9cclxuXHR0b29sYmFyQ29udGFpbmVyOiBudWxsLFxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0byBlbmFibGUgcGFzdGUgZmlsdGVyaW5nLiBUaGlzIGlzIGN1cnJlbnRseSBleHBlcmltZW50YWwsIHBsZWFzZVxyXG5cdCAqIHJlcG9ydCBhbnkgaXNzdWVzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0ZW5hYmxlUGFzdGVGaWx0ZXJpbmc6IGZhbHNlLFxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0byBjb21wbGV0ZWx5IGRpc2FibGUgcGFzdGluZyBpbnRvIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGRpc2FibGVQYXN0aW5nOiBmYWxzZSxcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHkuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRyZWFkT25seTogZmFsc2UsXHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRvIHNldCB0aGUgZWRpdG9yIHRvIHJpZ2h0LXRvLWxlZnQgbW9kZS5cclxuXHQgKlxyXG5cdCAqIElmIHNldCB0byBudWxsIHRoZSBkaXJlY3Rpb24gd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGRldGVjdGVkLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cnRsOiBmYWxzZSxcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIG9uIHBhZ2UgbG9hZFxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0YXV0b2ZvY3VzOiBmYWxzZSxcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIHRvIHRoZSBlbmQgb2YgdGhlIGNvbnRlbnRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGF1dG9mb2N1c0VuZDogdHJ1ZSxcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdG8gYXV0byBleHBhbmQgdGhlIGVkaXRvciB0byBmaXggdGhlIGNvbnRlbnRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGF1dG9FeHBhbmQ6IGZhbHNlLFxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0byBhdXRvIHVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGF1dG9VcGRhdGU6IGZhbHNlLFxyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0byBlbmFibGUgdGhlIGJyb3dzZXJzIGJ1aWx0IGluIHNwZWxsIGNoZWNrZXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHNwZWxsY2hlY2s6IHRydWUsXHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRvIHJ1biB0aGUgc291cmNlIGVkaXRvciB3aGVuIHRoZXJlIGlzIG5vIFdZU0lXWUcgc3VwcG9ydC4gT25seVxyXG5cdCAqIHJlYWxseSBhcHBsaWVzIHRvIG1vYmlsZSBPUydzLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0cnVuV2l0aG91dFd5c2l3eWdTdXBwb3J0OiBmYWxzZSxcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdG8gbG9hZCB0aGUgZWRpdG9yIGluIHNvdXJjZSBtb2RlIGFuZCBzdGlsbCBhbGxvdyBzd2l0Y2hpbmdcclxuXHQgKiBiZXR3ZWVuIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2RlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzdGFydEluU291cmNlTW9kZTogZmFsc2UsXHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wdGlvbmFsIElEIHRvIGdpdmUgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0ICovXHJcblx0aWQ6IG51bGwsXHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIHBsdWdpbnNcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtzdHJpbmd9XHJcblx0ICovXHJcblx0cGx1Z2luczogJycsXHJcblxyXG5cdC8qKlxyXG5cdCAqIHotaW5kZXggdG8gc2V0IHRoZSBlZGl0b3IgY29udGFpbmVyIHRvLiBOZWVkZWQgZm9yIGpRdWVyeSBVSSBkaWFsb2cuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7P251bWJlcn1cclxuXHQgKi9cclxuXHR6SW5kZXg6IG51bGwsXHJcblxyXG5cdC8qKlxyXG5cdCAqIElmIHRvIHRyaW0gdGhlIEJCQ29kZS4gUmVtb3ZlcyBhbnkgc3BhY2VzIGF0IHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZVxyXG5cdCAqIEJCQ29kZSBzdHJpbmcuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRiYmNvZGVUcmltOiBmYWxzZSxcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdG8gZGlzYWJsZSByZW1vdmluZyBibG9jayBsZXZlbCBlbGVtZW50cyBieSBwcmVzc2luZyBiYWNrc3BhY2UgYXRcclxuXHQgKiB0aGUgc3RhcnQgb2YgdGhlbVxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICovXHJcblx0ZGlzYWJsZUJsb2NrUmVtb3ZlOiBmYWxzZSxcclxuXHJcblx0LyoqXHJcblx0ICogQXJyYXkgb2YgYWxsb3dlZCBVUkwgKHNob3VsZCBiZSBlaXRoZXIgc3RyaW5ncyBvciByZWdleCkgZm9yIGlmcmFtZXMuXHJcblx0ICpcclxuXHQgKiBJZiBpdCdzIGEgc3RyaW5nIHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3RhcnQgb2YgdGhlIHNyYyBtYXRjaGVzIHRoZVxyXG5cdCAqIHNwZWNpZmllZCBzdHJpbmcgd2lsbCBiZSBhbGxvd2VkLlxyXG5cdCAqXHJcblx0ICogSWYgaXQncyBhIHJlZ2V4IHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3JjIG1hdGNoZXMgdGhlIHJlZ2V4IHdpbGwgYmVcclxuXHQgKiBhbGxvd2VkLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0FycmF5fVxyXG5cdCAqL1xyXG5cdGFsbG93ZWRJZnJhbWVVcmxzOiBbXSxcclxuXHJcblx0LyoqXHJcblx0ICogQkJDb2RlIHBhcnNlciBvcHRpb25zLCBvbmx5IGFwcGxpZXMgaWYgdXNpbmcgdGhlIGVkaXRvciBpbiBCQkNvZGVcclxuXHQgKiBtb2RlLlxyXG5cdCAqXHJcblx0ICogU2VlIEVtbEVkaXRvci5CQkNvZGVQYXJzZXIuZGVmYXVsdHMgZm9yIGxpc3Qgb2YgdmFsaWQgb3B0aW9uc1xyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKi9cclxuXHRwYXJzZXJPcHRpb25zOiB7IH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIENTUyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRvIGRyb3Bkb3duIG1lbnUgKGVnLiB6LWluZGV4KVxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKi9cclxuXHRkcm9wRG93bkNzczogeyB9LFxyXG5cclxuXHQvKipcclxuXHQgKiBBbiBhcnJheSBvZiB0YWdzIHRoYXQgYXJlIGFsbG93ZWQgaW4gdGhlIGVkaXRvciBjb250ZW50LlxyXG5cdCAqIElmIGEgdGFnIGlzIG5vdCBsaXN0ZWQgaGVyZSwgaXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIGNvbnRlbnQgaXNcclxuXHQgKiBzYW5pdGl6ZWQuXHJcblx0ICpcclxuXHQgKiAxIFRhZyBpcyBhbHJlYWR5IGFkZGVkIGJ5IGRlZmF1bHQ6IFsnaWZyYW1lJ10uIE5vIG5lZWQgdG8gYWRkIHRoaXNcclxuXHQgKiBmdXJ0aGVyLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0FycmF5fVxyXG5cdCAqL1xyXG5cdGFsbG93ZWRUYWdzOiBbXSxcclxuXHJcblx0LyoqXHJcblx0ICogQW4gYXJyYXkgb2YgYXR0cmlidXRlcyB0aGF0IGFyZSBhbGxvd2VkIG9uIHRhZ3MgaW4gdGhlIGVkaXRvciBjb250ZW50LlxyXG5cdCAqIElmIGFuIGF0dHJpYnV0ZSBpcyBub3QgbGlzdGVkIGhlcmUsIGl0IHdpbGwgYmUgcmVtb3ZlZCB3aGVuIHRoZSBjb250ZW50XHJcblx0ICogaXMgc2FuaXRpemVkLlxyXG5cdCAqXHJcblx0ICogMyBBdHRyaWJ1dGVzIGFyZSBhbHJlYWR5IGFkZGVkIGJ5IGRlZmF1bHQ6XHJcblx0ICogXHRbJ2FsbG93ZnVsbHNjcmVlbicsICdmcmFtZWJvcmRlcicsICd0YXJnZXQnXS5cclxuXHQgKiBObyBuZWVkIHRvIGFkZCB0aGVzZSBmdXJ0aGVyLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0FycmF5fVxyXG5cdCAqL1xyXG5cdGFsbG93ZWRBdHRyaWJ1dGVzOiBbXVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdE9wdGlvbnM7XHJcbiIsIi8vIE11c3Qgc3RhcnQgd2l0aCBhIHZhbGlkIHNjaGVtZVxyXG4vLyBcdFx0XlxyXG4vLyBTY2hlbWVzIHRoYXQgYXJlIGNvbnNpZGVyZWQgc2FmZVxyXG4vLyBcdFx0KGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fFxyXG4vLyBSZWxhdGl2ZSBzY2hlbWVzICgvLzopIGFyZSBjb25zaWRlcmVkIHNhZmVcclxuLy8gXHRcdChcXFxcL1xcXFwvKXxcclxuLy8gSW1hZ2UgZGF0YSBVUkkncyBhcmUgY29uc2lkZXJlZCBzYWZlXHJcbi8vIFx0XHRkYXRhOmltYWdlXFxcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7XHJcbnZhciBWQUxJRF9TQ0hFTUVfUkVHRVggPVxyXG5cdC9eKGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fChcXC9cXC8pfGRhdGE6aW1hZ2VcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7L2k7XHJcblxyXG4vKipcclxuICogRXNjYXBlcyBhIHN0cmluZyBzbyBpdCdzIHNhZmUgdG8gdXNlIGluIHJlZ2V4XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2V4KHN0cikge1xyXG5cdHJldHVybiBzdHIucmVwbGFjZSgvKFstLiorP149IToke30oKXxbXFxdL1xcXFxdKS9nLCAnXFxcXCQxJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGFsbCBIVE1MIGVudGl0aWVzIGluIGEgc3RyaW5nXHJcbiAqXHJcbiAqIElmIG5vUXVvdGVzIGlzIHNldCB0byBmYWxzZSwgYWxsIHNpbmdsZSBhbmQgZG91YmxlXHJcbiAqIHF1b3RlcyB3aWxsIGFsc28gYmUgZXNjYXBlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25vUXVvdGVzPXRydWVdXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogQHNpbmNlIDEuNC4xXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW50aXRpZXMoc3RyLCBub1F1b3Rlcykge1xyXG5cdGlmICghc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0dmFyIHJlcGxhY2VtZW50cyA9IHtcclxuXHRcdCcmJzogJyZhbXA7JyxcclxuXHRcdCc8JzogJyZsdDsnLFxyXG5cdFx0Jz4nOiAnJmd0OycsXHJcblx0XHQnICAnOiAnJm5ic3A7ICcsXHJcblx0XHQnXFxyXFxuJzogJzxiciAvPicsXHJcblx0XHQnXFxyJzogJzxiciAvPicsXHJcblx0XHQnXFxuJzogJzxiciAvPidcclxuXHR9O1xyXG5cclxuXHRpZiAobm9RdW90ZXMgIT09IGZhbHNlKSB7XHJcblx0XHRyZXBsYWNlbWVudHNbJ1wiJ10gID0gJyYjMzQ7JztcclxuXHRcdHJlcGxhY2VtZW50c1snXFwnJ10gPSAnJiMzOTsnO1xyXG5cdFx0cmVwbGFjZW1lbnRzWydgJ10gID0gJyYjOTY7JztcclxuXHR9XHJcblxyXG5cdHN0ciA9IHN0ci5yZXBsYWNlKC8gezJ9fFxcclxcbnxbJjw+XFxyXFxuJ1wiYF0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XHJcblx0XHRyZXR1cm4gcmVwbGFjZW1lbnRzW21hdGNoXSB8fCBtYXRjaDtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZSBVUkkgc2NoZW1lLlxyXG4gKlxyXG4gKiBBcHBlbmRzIHRoZSBjdXJyZW50IFVSTCB0byBhIHVybCBpZiBpdCBoYXMgYSBzY2hlbWUgdGhhdCBpcyBub3Q6XHJcbiAqXHJcbiAqIGh0dHBcclxuICogaHR0cHNcclxuICogc2Z0cFxyXG4gKiBmdHBcclxuICogbWFpbHRvXHJcbiAqIHNwb3RpZnlcclxuICogc2t5cGVcclxuICogc3NoXHJcbiAqIHRlYW1zcGVha1xyXG4gKiB0ZWxcclxuICogLy9cclxuICogZGF0YTppbWFnZS8ocG5nfGpwZWd8anBnfHBqcGVnfGJtcHxnaWYpO1xyXG4gKlxyXG4gKiAqKklNUE9SVEFOVCoqOiBUaGlzIGRvZXMgbm90IGVzY2FwZSBhbnkgSFRNTCBpbiBhIHVybCwgZm9yXHJcbiAqIHRoYXQgdXNlIHRoZSBlc2NhcGUuZW50aXRpZXMoKSBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogQHNpbmNlIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXJpU2NoZW1lKHVybCkge1xyXG5cdHZhclx0cGF0aCxcclxuXHRcdC8vIElmIHRoZXJlIGlzIGEgOiBiZWZvcmUgYSAvIHRoZW4gaXQgaGFzIGEgc2NoZW1lXHJcblx0XHRoYXNTY2hlbWUgPSAvXlteL10qOi9pLFxyXG5cdFx0bG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblxyXG5cdC8vIEhhcyBubyBzY2hlbWUgb3IgYSB2YWxpZCBzY2hlbWVcclxuXHRpZiAoKCF1cmwgfHwgIWhhc1NjaGVtZS50ZXN0KHVybCkpIHx8IFZBTElEX1NDSEVNRV9SRUdFWC50ZXN0KHVybCkpIHtcclxuXHRcdHJldHVybiB1cmw7XHJcblx0fVxyXG5cclxuXHRwYXRoID0gbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcclxuXHRwYXRoLnBvcCgpO1xyXG5cclxuXHRyZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICtcclxuXHRcdGxvY2F0aW9uLmhvc3QgK1xyXG5cdFx0cGF0aC5qb2luKCcvJykgKyAnLycgK1xyXG5cdFx0dXJsO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEhUTUwgdGVtcGxhdGVzIHVzZWQgYnkgdGhlIGVkaXRvciBhbmQgZGVmYXVsdCBjb21tYW5kc1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmFyIF90ZW1wbGF0ZXMgPSB7XHJcblx0aHRtbDpcclxuXHRcdCc8IURPQ1RZUEUgaHRtbD4nICtcclxuXHRcdCc8aHRtbHthdHRyc30+JyArXHJcblx0XHRcdCc8aGVhZD4nICtcclxuXHRcdFx0XHQnPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiICcgK1xyXG5cdFx0XHRcdFx0J2NvbnRlbnQ9XCJ0ZXh0L2h0bWw7Y2hhcnNldD17Y2hhcnNldH1cIiAvPicgK1xyXG5cdFx0XHRcdCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIntzdHlsZX1cIiAvPicgK1xyXG5cdFx0XHQnPC9oZWFkPicgK1xyXG5cdFx0XHQnPGJvZHkgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiIHtzcGVsbGNoZWNrfT48cD48L3A+PC9ib2R5PicgK1xyXG5cdFx0JzwvaHRtbD4nLFxyXG5cclxuXHR0b29sYmFyQnV0dG9uOiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItYnV0dG9uIGVtbGVkaXRvci1idXR0b24te25hbWV9XCIgJyArXHJcblx0XHQnZGF0YS1lbWxlZGl0b3ItY29tbWFuZD1cIntuYW1lfVwiIHVuc2VsZWN0YWJsZT1cIm9uXCI+JyArXHJcblx0XHQnPGRpdiB1bnNlbGVjdGFibGU9XCJvblwiPntkaXNwTmFtZX08L2Rpdj48L2E+JyxcclxuXHJcblx0ZW1vdGljb246ICc8aW1nIHNyYz1cInt1cmx9XCIgZGF0YS1lbWxlZGl0b3ItZW1vdGljb249XCJ7a2V5fVwiICcgK1xyXG5cdFx0J2FsdD1cIntrZXl9XCIgdGl0bGU9XCJ7dG9vbHRpcH1cIiAvPicsXHJcblxyXG5cdGZvbnRPcHQ6ICc8YSBjbGFzcz1cImVtbGVkaXRvci1mb250LW9wdGlvblwiIGhyZWY9XCIjXCIgJyArXHJcblx0XHQnZGF0YS1mb250PVwie2ZvbnR9XCI+PGZvbnQgZmFjZT1cIntmb250fVwiPntmb250fTwvZm9udD48L2E+JyxcclxuXHJcblx0c2l6ZU9wdDogJzxhIGNsYXNzPVwiZW1sZWRpdG9yLWZvbnRzaXplLW9wdGlvblwiIGRhdGEtc2l6ZT1cIntzaXplfVwiICcgK1xyXG5cdFx0J2hyZWY9XCIjXCI+PGZvbnQgc2l6ZT1cIntzaXplfVwiPntzaXplfTwvZm9udD48L2E+JyxcclxuXHJcblx0cGFzdGV0ZXh0OlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInR4dFwiPntsYWJlbH08L2xhYmVsPiAnICtcclxuXHRcdFx0Jzx0ZXh0YXJlYSBjb2xzPVwiMjBcIiByb3dzPVwiN1wiIGlkPVwidHh0XCI+PC90ZXh0YXJlYT48L2Rpdj4nICtcclxuXHRcdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xyXG5cdFx0JzwvZGl2PicsXHJcblxyXG5cdHRhYmxlOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInJvd3NcIj57cm93c308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xyXG5cdFx0XHQnaWQ9XCJyb3dzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJjb2xzXCI+e2NvbHN9PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiAnICtcclxuXHRcdFx0J2lkPVwiY29sc1wiIHZhbHVlPVwiMlwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiJyArXHJcblx0XHRcdCcgLz48L2Rpdj4nLFxyXG5cclxuXHRpbWFnZTpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJpbWFnZVwiPnt1cmx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImltYWdlXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwid2lkdGhcIj57d2lkdGh9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIndpZHRoXCIgc2l6ZT1cIjJcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImhlaWdodFwiPntoZWlnaHR9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImhlaWdodFwiIHNpemU9XCIyXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcclxuXHRcdFx0JzwvZGl2PicsXHJcblxyXG5cdGVtYWlsOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImVtYWlsXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWFpbFwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZGVzXCI+e2Rlc2N9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXHJcblx0XHRcdCc8L2Rpdj4nLFxyXG5cclxuXHRsaW5rOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImxpbmtcIj57dXJsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZGVzXCI+e2Rlc2N9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zfVwiIC8+PC9kaXY+JyxcclxuXHJcblx0eW91dHViZU1lbnU6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPntsYWJlbH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlua1wiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xyXG5cdFx0XHQnPC9kaXY+JyxcclxuXHJcblx0eW91dHViZTpcclxuXHRcdCc8aWZyYW1lIHdpZHRoPVwiNTYwXCIgaGVpZ2h0PVwiMzE1XCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuICcgK1xyXG5cdFx0J3NyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL3tpZH0/d21vZGU9b3BhcXVlJnN0YXJ0PXt0aW1lfVwiICcgK1xyXG5cdFx0J2RhdGEteW91dHViZS1pZD1cIntpZH1cIj48L2lmcmFtZT4nXHJcbn07XHJcblxyXG4vKipcclxuICogUmVwbGFjZXMgYW55IHBhcmFtcyBpbiBhIHRlbXBsYXRlIHdpdGggdGhlIHBhc3NlZCBwYXJhbXMuXHJcbiAqXHJcbiAqIElmIGNyZWF0ZUh0bWwgaXMgcGFzc2VkIGl0IHdpbGwgcmV0dXJuIGEgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBjb250YWluaW5nIHRoZSBwYXJzZWQgdGVtcGxhdGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjcmVhdGVIdG1sXVxyXG4gKiBAcmV0dXJucyB7YW55fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGVtcGxhdGVzIChuYW1lLCBwYXJhbXMsIGNyZWF0ZUh0bWwpIHtcclxuXHR2YXIgdGVtcGxhdGUgPSBfdGVtcGxhdGVzW25hbWVdO1xyXG5cclxuXHRPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShcclxuXHRcdFx0bmV3IFJlZ0V4cChlc2NhcGUucmVnZXgoJ3snICsgbmFtZSArICd9JyksICdnJyksIHBhcmFtc1tuYW1lXVxyXG5cdFx0KTtcclxuXHR9KTtcclxuXHJcblx0aWYgKGNyZWF0ZUh0bWwpIHtcclxuXHRcdHRlbXBsYXRlID0gZG9tLnBhcnNlSFRNTCh0ZW1wbGF0ZSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGVtcGxhdGU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgdGhlXHJcbiAqIHRoZSBwYXNzZWQgdHlwZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHsqfSBhcmdcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc1R5cGVvZih0eXBlLCBhcmcpIHtcclxuXHRyZXR1cm4gdHlwZW9mIGFyZyA9PT0gdHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNTdHJpbmcgPSBpc1R5cGVvZi5iaW5kKG51bGwsICdzdHJpbmcnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzVW5kZWZpbmVkID0gaXNUeXBlb2YuYmluZChudWxsLCAndW5kZWZpbmVkJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc0Z1bmN0aW9uID0gaXNUeXBlb2YuYmluZChudWxsLCAnZnVuY3Rpb24nKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzTnVtYmVyID0gaXNUeXBlb2YuYmluZChudWxsLCAnbnVtYmVyJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBvYmplY3QgaGFzIG5vIGtleXNcclxuICpcclxuICogQHBhcmFtIHshT2JqZWN0fSBvYmpcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmopIHtcclxuXHRyZXR1cm4gIU9iamVjdC5rZXlzKG9iaikubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogRXh0ZW5kcyB0aGUgZmlyc3Qgb2JqZWN0IHdpdGggYW55IGV4dHJhIG9iamVjdHMgcGFzc2VkXHJcbiAqXHJcbiAqIElmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBib29sZWFuIGFuZCBzZXQgdG8gdHJ1ZVxyXG4gKiBpdCB3aWxsIGV4dGVuZCBjaGlsZCBhcnJheXMgYW5kIG9iamVjdHMgcmVjdXJzaXZlbHkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdHxib29sZWFufSB0YXJnZXRBcmdcclxuICogQHBhcmFtIHsuLi5PYmplY3R9IHNvdXJjZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHRhcmdldEFyZywgc291cmNlQXJnKSB7XHJcblx0dmFyIGlzVGFyZ2V0Qm9vbGVhbiA9IHRhcmdldEFyZyA9PT0gISF0YXJnZXRBcmc7XHJcblx0dmFyIGkgICAgICA9IGlzVGFyZ2V0Qm9vbGVhbiA/IDIgOiAxO1xyXG5cdHZhciB0YXJnZXQgPSBpc1RhcmdldEJvb2xlYW4gPyBzb3VyY2VBcmcgOiB0YXJnZXRBcmc7XHJcblx0dmFyIGlzRGVlcCA9IGlzVGFyZ2V0Qm9vbGVhbiA/IHRhcmdldEFyZyA6IGZhbHNlO1xyXG5cclxuXHRmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcclxuXHRcdFx0T2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcclxuXHR9XHJcblxyXG5cdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xyXG5cclxuXHRcdC8vIENvcHkgYWxsIHByb3BlcnRpZXMgZm9yIGpRdWVyeSBjb21wYXRpYmlsaXR5XHJcblx0XHQvKiBlc2xpbnQgZ3VhcmQtZm9yLWluOiBvZmYgKi9cclxuXHRcdGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuXHRcdFx0dmFyIHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XHJcblx0XHRcdHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdFx0Ly8gU2tpcCB1bmRlZmluZWQgdmFsdWVzIHRvIG1hdGNoIGpRdWVyeVxyXG5cdFx0XHRpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNraXAgc3BlY2lhbCBrZXlzIHRvIHByZXZlbnQgcHJvdG90eXBlIHBvbGx1dGlvblxyXG5cdFx0XHRpZiAoa2V5ID09PSAnX19wcm90b19fJyB8fCBrZXkgPT09ICdjb25zdHJ1Y3RvcicpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGlzVmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSk7XHJcblx0XHRcdHZhciBpc1ZhbHVlQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcclxuXHJcblx0XHRcdGlmIChpc0RlZXAgJiYgKGlzVmFsdWVPYmplY3QgfHwgaXNWYWx1ZUFycmF5KSkge1xyXG5cdFx0XHRcdC8vIENhbiBvbmx5IG1lcmdlIGlmIHRhcmdldCB0eXBlIG1hdGNoZXMgb3RoZXJ3aXNlIGNyZWF0ZVxyXG5cdFx0XHRcdC8vIG5ldyB0YXJnZXQgdG8gbWVyZ2UgaW50b1xyXG5cdFx0XHRcdHZhciBpc1NhbWVUeXBlID0gaXNPYmplY3QodGFyZ2V0VmFsdWUpID09PSBpc1ZhbHVlT2JqZWN0ICYmXHJcblx0XHRcdFx0XHRBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSA9PT0gaXNWYWx1ZUFycmF5O1xyXG5cclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGV4dGVuZChcclxuXHRcdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0XHRpc1NhbWVUeXBlID8gdGFyZ2V0VmFsdWUgOiAoaXNWYWx1ZUFycmF5ID8gW10gOiB7fSksXHJcblx0XHRcdFx0XHR2YWx1ZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBwYXNzZWQgYXJyYXlcclxuICpcclxuICogQHBhcmFtIHshQXJyYXl9IGFyclxyXG4gKiBAcGFyYW0geyp9IGl0ZW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIGl0ZW0pIHtcclxuXHR2YXIgaSA9IGFyci5pbmRleE9mKGl0ZW0pO1xyXG5cclxuXHRpZiAoaSA+IC0xKSB7XHJcblx0XHRhcnIuc3BsaWNlKGksIDEpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGVzIG92ZXIgYW4gYXJyYXkgb3Igb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdHxBcnJheX0gb2JqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgKil9IGZuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZWFjaChvYmosIGZuKSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSAmJiAgKG9iaik/Lmxlbmd0aCA+IDApIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGZuKGksIG9ialtpXSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRcdGZuKGtleSwgb2JqW2tleV0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1sRWRpdG9yIGZyb20gJy4vbGliL2VtbEVkaXRvcic7XHJcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuL2xpYi9wbHVnaW5NYW5hZ2VyJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vbGliL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9saWIvYnJvd3Nlci5qcyc7XHJcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2xpYi9kb20nO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2xpYi91dGlscy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9saWIvZGVmYXVsdENvbW1hbmRzJztcclxuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vbGliL2RlZmF1bHRPcHRpb25zLmpzJztcclxuaW1wb3J0ICcuL3RoZW1lcy9zcXVhcmUubGVzcyc7XHJcblxyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG5cdGludGVyZmFjZSBXaW5kb3cge1xyXG5cdFx0ZW1sRWRpdG9yOiBJRWRpdG9yO1xyXG5cdH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElFZGl0b3Ige1xyXG5cdGNvbW1hbmQ6IE9iamVjdDtcclxuXHRsb2NhbGU6IE9iamVjdDtcclxuXHRpY29uczogT2JqZWN0O1xyXG5cdGZvcm1hdHM6IE9iamVjdDtcclxuXHRjb21tYW5kczogT2JqZWN0O1xyXG5cdGRlZmF1bHRPcHRpb25zOiBPYmplY3Q7XHJcblx0aW9zOiBib29sZWFuO1xyXG5cdGlzV3lzaXd5Z1N1cHBvcnRlZDogYm9vbGVhbjtcclxuXHRyZWdleEVzY2FwZShzdHI6IHN0cmluZyk6IHN0cmluZztcclxuXHRlc2NhcGVFbnRpdGllcyhzdHI6IHN0cmluZywgbm9RdW90ZXM6IGJvb2xlYW4gfCBudWxsKTogc3RyaW5nO1xyXG5cdGVzY2FwZVVyaVNjaGVtZSh1cmw6IHN0cmluZyk6IHN0cmluZztcclxuXHRkb206IE9iamVjdDtcclxuXHR1dGlsczogT2JqZWN0O1xyXG5cdHBsdWdpbnM6IE9iamVjdDtcclxuXHRjcmVhdGUodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIG9wdGlvbnM6IE9iamVjdCk6IHZvaWQ7XHJcblx0aW5zdGFuY2UodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiBJRWRpdG9yO1xyXG59XHJcblxyXG53aW5kb3cuZW1sRWRpdG9yID0ge1xyXG5cdGNvbW1hbmQ6IEVtbEVkaXRvci5jb21tYW5kLFxyXG5cdGxvY2FsZTogRW1sRWRpdG9yLmxvY2FsZSxcclxuXHRpY29uczogRW1sRWRpdG9yLmljb25zLFxyXG5cdGZvcm1hdHM6IEVtbEVkaXRvci5mb3JtYXRzLFxyXG5cclxuXHRjb21tYW5kczogZGVmYXVsdENvbW1hbmRzLFxyXG5cdGRlZmF1bHRPcHRpb25zOiBkZWZhdWx0T3B0aW9ucyxcclxuXHRpb3M6IGJyb3dzZXIuaW9zLFxyXG5cdGlzV3lzaXd5Z1N1cHBvcnRlZDogYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQsXHJcblx0cmVnZXhFc2NhcGU6IGVzY2FwZS5yZWdleCxcclxuXHRlc2NhcGVFbnRpdGllczogZXNjYXBlLmVudGl0aWVzLFxyXG5cdGVzY2FwZVVyaVNjaGVtZTogZXNjYXBlLnVyaVNjaGVtZSxcclxuXHJcblx0ZG9tOiB7XHJcblx0XHRjc3M6IGRvbS5jc3MsXHJcblx0XHRhdHRyOiBkb20uYXR0cixcclxuXHRcdHJlbW92ZUF0dHI6IGRvbS5yZW1vdmVBdHRyLFxyXG5cdFx0aXM6IGRvbS5pcyxcclxuXHRcdGNsb3Nlc3Q6IGRvbS5jbG9zZXN0LFxyXG5cdFx0d2lkdGg6IGRvbS53aWR0aCxcclxuXHRcdGhlaWdodDogZG9tLmhlaWdodCxcclxuXHRcdHRyYXZlcnNlOiBkb20udHJhdmVyc2UsXHJcblx0XHRyVHJhdmVyc2U6IGRvbS5yVHJhdmVyc2UsXHJcblx0XHRwYXJzZUhUTUw6IGRvbS5wYXJzZUhUTUwsXHJcblx0XHRoYXNTdHlsaW5nOiBkb20uaGFzU3R5bGluZyxcclxuXHRcdGNvbnZlcnRFbGVtZW50OiBkb20uY29udmVydEVsZW1lbnQsXHJcblx0XHRibG9ja0xldmVsTGlzdDogZG9tLmJsb2NrTGV2ZWxMaXN0LFxyXG5cdFx0Y2FuSGF2ZUNoaWxkcmVuOiBkb20uY2FuSGF2ZUNoaWxkcmVuLFxyXG5cdFx0aXNJbmxpbmU6IGRvbS5pc0lubGluZSxcclxuXHRcdGNvcHlDU1M6IGRvbS5jb3B5Q1NTLFxyXG5cdFx0Zml4TmVzdGluZzogZG9tLmZpeE5lc3RpbmcsXHJcblx0XHRmaW5kQ29tbW9uQW5jZXN0b3I6IGRvbS5maW5kQ29tbW9uQW5jZXN0b3IsXHJcblx0XHRnZXRTaWJsaW5nOiBkb20uZ2V0U2libGluZyxcclxuXHRcdHJlbW92ZVdoaXRlU3BhY2U6IGRvbS5yZW1vdmVXaGl0ZVNwYWNlLFxyXG5cdFx0ZXh0cmFjdENvbnRlbnRzOiBkb20uZXh0cmFjdENvbnRlbnRzLFxyXG5cdFx0Z2V0T2Zmc2V0OiBkb20uZ2V0T2Zmc2V0LFxyXG5cdFx0Z2V0U3R5bGU6IGRvbS5nZXRTdHlsZSxcclxuXHRcdGhhc1N0eWxlOiBkb20uaGFzU3R5bGVcclxuXHR9LFxyXG5cclxuXHR1dGlsczoge1xyXG5cdFx0ZWFjaDogdXRpbHMuZWFjaCxcclxuXHRcdGlzRW1wdHlPYmplY3Q6IHV0aWxzLmlzRW1wdHlPYmplY3QsXHJcblx0XHRleHRlbmQ6IHV0aWxzLmV4dGVuZFxyXG5cdH0sXHJcblxyXG5cdHBsdWdpbnM6IFBsdWdpbk1hbmFnZXIucGx1Z2lucyxcclxuXHJcblx0Y3JlYXRlOiAodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIG9wdGlvbnM6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG5cdFx0Ly8gRG9uJ3QgYWxsb3cgdGhlIGVkaXRvciB0byBiZSBpbml0aWFsaXNlZFxyXG5cdFx0Ly8gb24gaXQncyBvd24gc291cmNlIGVkaXRvclxyXG5cdFx0aWYgKGRvbS5wYXJlbnQodGV4dGFyZWEsICcuZW1sZWRpdG9yLWNvbnRhaW5lcicpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5ydW5XaXRob3V0V3lzaXd5Z1N1cHBvcnQgfHwgYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcclxuXHRcdFx0KG5ldyBFbWxFZGl0b3IodGV4dGFyZWEsIG9wdGlvbnMpKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRpbnN0YW5jZTogZnVuY3Rpb24gKHRleHRhcmVhOiBhbnkpIHtcclxuXHRcdHJldHVybiB0ZXh0YXJlYS5fZW1sZWRpdG9yO1xyXG5cdH1cclxufTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9