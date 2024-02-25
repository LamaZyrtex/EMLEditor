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

/***/ "./src/themes/office.less":
/*!********************************!*\
  !*** ./src/themes/office.less ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/lib/PluginManager.js":
/*!**********************************!*\
  !*** ./src/lib/PluginManager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PluginManager)
/* harmony export */ });
var plugins = {};

/**
 * Plugin Manager class
 * @class PluginManager
 * @name PluginManager
 */
function PluginManager(thisObj) {
	/**
	 * Alias of this
	 *
	 * @private
	 * @type {Object}
	 */
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	var base = this;

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

		var	idx, ret,
			signal = formatSignalName(args.shift());

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
	base.call = function () {
		callHandlers(arguments, false);
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
	base.callOnlyFirst = function () {
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
	base.hasHandler = function (signal) {
		var i  = registeredPlugins.length;
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
	base.exists = function (plugin) {
		if (plugin in plugins) {
			plugin = plugins[plugin];

			return typeof plugin === 'function' &&
				typeof plugin.prototype === 'object';
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
	base.isRegistered = function (plugin) {
		if (base.exists(plugin)) {
			var idx = registeredPlugins.length;

			while (idx--) {
				if (registeredPlugins[idx] instanceof plugins[plugin]) {
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
	base.register = function (plugin) {
		if (!base.exists(plugin) || base.isRegistered(plugin)) {
			return false;
		}

		plugin = new plugins[plugin]();
		registeredPlugins.push(plugin);

		if ('init' in plugin) {
			plugin.init.call(thisObj);
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
	base.deregister = function (plugin) {
		var	removedPlugin,
			pluginIdx = registeredPlugins.length,
			removed   = false;

		if (!base.isRegistered(plugin)) {
			return removed;
		}

		while (pluginIdx--) {
			if (registeredPlugins[pluginIdx] instanceof plugins[plugin]) {
				removedPlugin = registeredPlugins.splice(pluginIdx, 1)[0];
				removed       = true;

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
	base.destroy = function () {
		var i = registeredPlugins.length;

		while (i--) {
			if ('destroy' in registeredPlugins[i]) {
				registeredPlugins[i].destroy.call(thisObj);
			}
		}

		registeredPlugins = [];
		thisObj    = null;
	};
}

PluginManager.plugins = plugins;


/***/ }),

/***/ "./src/lib/RangeHelper.js":
/*!********************************!*\
  !*** ./src/lib/RangeHelper.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RangeHelper)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");
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
function RangeHelper(win, d, sanitize) {
	var	_createMarker, _prepareInput,
		doc          = d || win.contentDocument || win.document,
		startMarker  = 'sceditor-start-marker',
		endMarker    = 'sceditor-end-marker',
		base         = this;

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
	base.insertHTML = function (html, endHTML) {
		var	node, div,
			range = base.selectedRange();

		if (!range) {
			return false;
		}

		if (endHTML) {
			html += base.selectedHtml() + endHTML;
		}

		div           = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
		node          = doc.createDocumentFragment();
		div.innerHTML = sanitize(html);

		while (div.firstChild) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(node, div.firstChild);
		}

		base.insertNode(node);
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
	_prepareInput = function (node, endNode, returnHtml) {
		var lastChild,
			frag = doc.createDocumentFragment();

		if (typeof node === 'string') {
			if (endNode) {
				node += base.selectedHtml() + endNode;
			}

			frag = _dom_js__WEBPACK_IMPORTED_MODULE_0__.parseHTML(node);
		} else {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, node);

			if (endNode) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, base.selectedRange().extractContents());
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, endNode);
			}
		}

		if (!(lastChild = frag.lastChild)) {
			return;
		}

		while (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(lastChild.lastChild, true)) {
			lastChild = lastChild.lastChild;
		}

		if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.canHaveChildren(lastChild)) {
			// Webkit won't allow the cursor to be placed inside an
			// empty tag, so add a zero width space to it.
			if (!lastChild.lastChild) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(lastChild, document.createTextNode('\u200B'));
			}
		} else {
			lastChild = frag;
		}

		base.removeMarkers();

		// Append marks to last child so when restored cursor will be in
		// the right place
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(lastChild, _createMarker(startMarker));
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(lastChild, _createMarker(endMarker));

		if (returnHtml) {
			var div = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(div, frag);

			return div.innerHTML;
		}

		return frag;
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
	base.insertNode = function (node, endNode) {
		var	first, last,
			input  = _prepareInput(node, endNode),
			range  = base.selectedRange(),
			parent = range.commonAncestorContainer,
			emptyNodes = [];

		if (!input) {
			return false;
		}

		function removeIfEmpty(node) {
			// Only remove empty node if it wasn't already empty
			if (node && _dom_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty(node) && emptyNodes.indexOf(node) < 0) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(node);
			}
		}

		if (range.startContainer !== range.endContainer) {
			_utils_js__WEBPACK_IMPORTED_MODULE_2__.each(parent.childNodes, function (_, node) {
				if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty(node)) {
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
		if (parent && parent.nodeType !== 3 && !_dom_js__WEBPACK_IMPORTED_MODULE_0__.canHaveChildren(parent)) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(input, parent);
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

		base.restoreRange();
	};

	/**
	 * Clones the selected Range
	 *
	 * @return {Range}
	 * @function
	 * @name cloneSelected
	 * @memberOf RangeHelper.prototype
	 */
	base.cloneSelected = function () {
		var range = base.selectedRange();

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
	base.selectedRange = function () {
		var	range, firstChild,
			sel = win.getSelection();

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
	base.hasSelection = function () {
		var	sel = win.getSelection();

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
	base.selectedHtml = function () {
		var	div,
			range = base.selectedRange();

		if (range) {
			div = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(div, range.cloneContents());

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
	base.parentNode = function () {
		var range = base.selectedRange();

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
	base.getFirstBlockParent = function (node) {
		var func = function (elm) {
			if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(elm, true)) {
				return elm;
			}

			elm = elm ? elm.parentNode : null;

			return elm ? func(elm) : elm;
		};

		return func(node || base.parentNode());
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
	base.insertNodeAt = function (start, node) {
		var	currentRange = base.selectedRange(),
			range        = base.cloneSelected();

		if (!range) {
			return false;
		}

		range.collapse(start);
		range.insertNode(node);

		// Reselect the current range.
		// Fixes issue with Chrome losing the selection. Issue#82
		base.selectRange(currentRange);
	};

	/**
	 * Creates a marker node
	 *
	 * @param {string} id
	 * @return {HTMLSpanElement}
	 * @private
	 */
	_createMarker = function (id) {
		base.removeMarker(id);

		var marker  = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('span', {
			id: id,
			className: 'sceditor-selection sceditor-ignore',
			style: 'display:none;line-height:0'
		}, doc);

		marker.innerHTML = ' ';

		return marker;
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
	base.insertMarkers = function () {
		var	currentRange = base.selectedRange();
		var startNode = _createMarker(startMarker);

		base.removeMarkers();
		base.insertNodeAt(true, startNode);

		// Fixes issue with end marker sometimes being placed before
		// the start marker when the range is collapsed.
		if (currentRange && currentRange.collapsed) {
			startNode.parentNode.insertBefore(
				_createMarker(endMarker), startNode.nextSibling);
		} else {
			base.insertNodeAt(false, _createMarker(endMarker));
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
	base.getMarker = function (id) {
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
	base.removeMarker = function (id) {
		var marker = base.getMarker(id);

		if (marker) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(marker);
		}
	};

	/**
	 * Removes the start/end markers
	 *
	 * @function
	 * @name removeMarkers
	 * @memberOf RangeHelper.prototype
	 */
	base.removeMarkers = function () {
		base.removeMarker(startMarker);
		base.removeMarker(endMarker);
	};

	/**
	 * Saves the current range location. Alias of insertMarkers()
	 *
	 * @function
	 * @name saveRage
	 * @memberOf RangeHelper.prototype
	 */
	base.saveRange = function () {
		base.insertMarkers();
	};

	/**
	 * Select the specified range
	 *
	 * @param {Range} range
	 * @function
	 * @name selectRange
	 * @memberOf RangeHelper.prototype
	 */
	base.selectRange = function (range) {
		var lastChild;
		var sel = win.getSelection();
		var container = range.endContainer;

		// Check if cursor is set after a BR when the BR is the only
		// child of the parent. In Firefox this causes a line break
		// to occur when something is typed. See issue #321
		if (range.collapsed && container &&
			!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(container, true)) {

			lastChild = container.lastChild;
			while (lastChild && _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(lastChild, '.sceditor-ignore')) {
				lastChild = lastChild.previousSibling;
			}

			if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(lastChild, 'br')) {
				var rng = doc.createRange();
				rng.setEndAfter(lastChild);
				rng.collapse(false);

				if (base.compare(range, rng)) {
					range.setStartBefore(lastChild);
					range.collapse(true);
				}
			}
		}

		if (sel) {
			base.clear();
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
	base.restoreRange = function () {
		var	isCollapsed,
			range = base.selectedRange(),
			start = base.getMarker(startMarker),
			end   = base.getMarker(endMarker);

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

		base.selectRange(range);
		base.removeMarkers();
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
	base.selectOuterText = function (left, right) {
		var start, end,
			range = base.cloneSelected();

		if (!range) {
			return false;
		}

		range.collapse(false);

		start = outerText(range, true, left);
		end = outerText(range, false, right);

		range.setStart(start.node, start.offset);
		range.setEnd(end.node, end.offset);

		base.selectRange(range);
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
	base.getOuterText = function (before, length) {
		var	range = base.cloneSelected();

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
	base.replaceKeyword = function (
		keywords,
		includeAfter,
		keywordsSorted,
		longestKeyword,
		requireWhitespace,
		keypressChar
	) {
		if (!keywordsSorted) {
			keywords.sort(function (a, b) {
				return a[0].length - b[0].length;
			});
		}

		var outerText, match, matchPos, startIndex,
			leftLen, charsLeft, keyword, keywordLen,
			whitespaceRegex = '(^|[\\s\xA0\u2002\u2003\u2009])',
			keywordIdx      = keywords.length,
			whitespaceLen   = requireWhitespace ? 1 : 0,
			maxKeyLen       = longestKeyword ||
				keywords[keywordIdx - 1][0].length;

		if (requireWhitespace) {
			maxKeyLen++;
		}

		keypressChar = keypressChar || '';
		outerText    = base.getOuterText(true, maxKeyLen);
		leftLen      = outerText.length;
		outerText   += keypressChar;

		if (includeAfter) {
			outerText += base.getOuterText(false, maxKeyLen);
		}

		while (keywordIdx--) {
			keyword    = keywords[keywordIdx][0];
			keywordLen = keyword.length;
			startIndex = Math.max(0, leftLen - keywordLen - whitespaceLen);
			matchPos   = -1;

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
					base.selectOuterText(
						charsLeft,
						keywordLen - charsLeft -
							(/^\S/.test(keypressChar) ? 1 : 0)
					);

					base.insertHTML(keywords[keywordIdx][1]);
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
	base.compare = function (rngA, rngB) {
		if (!rngB) {
			rngB = base.selectedRange();
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
	base.clear = function () {
		var sel = win.getSelection();

		if (sel) {
			if (sel.removeAllRanges) {
				sel.removeAllRanges();
			} else if (sel.empty) {
				sel.empty();
			}
		}
	};
}


/***/ }),

/***/ "./src/lib/SCEditor.js":
/*!*****************************!*\
  !*** ./src/lib/SCEditor.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SCEditor)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultCommands.js */ "./src/lib/defaultCommands.js");
/* harmony import */ var _PluginManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PluginManager.js */ "./src/lib/PluginManager.js");
/* harmony import */ var _RangeHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RangeHelper.js */ "./src/lib/RangeHelper.js");
/* harmony import */ var _templates_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./templates.js */ "./src/lib/templates.js");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./escape.js */ "./src/lib/escape.js");
/* harmony import */ var _browser_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./browser.js */ "./src/lib/browser.js");
/* harmony import */ var _emoticons_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./emoticons.js */ "./src/lib/emoticons.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_10__);
﻿











var globalWin  = window;
var globalDoc  = document;

var IMAGE_MIME_REGEX = /^image\/(p?jpe?g|gif|png|bmp)$/i;

/**
 * Wrap inlines that are in the root in paragraphs.
 *
 * @param {HTMLBodyElement} body
 * @param {Document} doc
 * @private
 */
function wrapInlines(body, doc) {
	var wrapper;

	_dom_js__WEBPACK_IMPORTED_MODULE_0__.traverse(body, function (node) {
		if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(node, true)) {
			// Ignore text nodes unless they contain non-whitespace chars as
			// whitespace will be collapsed.
			// Ignore sceditor-ignore elements unless wrapping siblings
			// Should still wrap both if wrapping siblings.
			if (wrapper || node.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE ?
				/\S/.test(node.nodeValue) : !_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, '.sceditor-ignore')) {
				if (!wrapper) {
					wrapper = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(wrapper, node);
				}

				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wrapper, node);
			}
		} else {
			wrapper = null;
		}
	}, false, true);
}

/**
 * SCEditor - A lightweight WYSIWYG editor
 *
 * @param {HTMLTextAreaElement} original The textarea to be converted
 * @param {Object} userOptions
 * @class SCEditor
 * @name SCEditor
 */
function SCEditor(original, userOptions) {
	/**
	 * Alias of this
	 *
	 * @private
	 */
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	var base = this;

	/**
	 * Editor format like BBCode or HTML
	 */
	var format;

	/**
	 * The div which contains the editor and toolbar
	 *
	 * @type {HTMLDivElement}
	 * @private
	 */
	var editorContainer;

	/**
	 * Map of events handlers bound to this instance.
	 *
	 * @type {Object}
	 * @private
	 */
	var eventHandlers = {};

	/**
	 * The editors toolbar
	 *
	 * @type {HTMLDivElement}
	 * @private
	 */
	var toolbar;

	/**
	 * The editors iframe which should be in design mode
	 *
	 * @type {HTMLIFrameElement}
	 * @private
	 */
	var wysiwygEditor;

	/**
	 * The editors window
	 *
	 * @type {Window}
	 * @private
	 */
	var wysiwygWindow;

	/**
	 * The WYSIWYG editors body element
	 *
	 * @type {HTMLBodyElement}
	 * @private
	 */
	var wysiwygBody;

	/**
	 * The WYSIWYG editors document
	 *
	 * @type {Document}
	 * @private
	 */
	var wysiwygDocument;

	/**
	 * The editors textarea for viewing source
	 *
	 * @type {HTMLTextAreaElement}
	 * @private
	 */
	var sourceEditor;

	/**
	 * The current dropdown
	 *
	 * @type {HTMLDivElement}
	 * @private
	 */
	var dropdown;

	/**
	 * If the user is currently composing text via IME
	 * @type {boolean}
	 */
	var isComposing;

	/**
	 * Timer for valueChanged key handler
	 * @type {number}
	 */
	var valueChangedKeyUpTimer;

	/**
	 * The editors locale
	 *
	 * @private
	 */
	var locale;

	/**
	 * Stores a cache of preloaded images
	 *
	 * @private
	 * @type {Array.<HTMLImageElement>}
	 */
	var preLoadCache = [];

	/**
	 * The editors rangeHelper instance
	 *
	 * @type {RangeHelper}
	 * @private
	 */
	var rangeHelper;

	/**
	 * An array of button state handlers
	 *
	 * @type {Array.<Object>}
	 * @private
	 */
	var btnStateHandlers = [];

	/**
	 * Plugin manager instance
	 *
	 * @type {PluginManager}
	 * @private
	 */
	var pluginManager;

	/**
	 * The current node containing the selection/caret
	 *
	 * @type {Node}
	 * @private
	 */
	var currentNode;

	/**
	 * The first block level parent of the current node
	 *
	 * @type {node}
	 * @private
	 */
	var currentBlockNode;

	/**
	 * The current node selection/caret
	 *
	 * @type {Object}
	 * @private
	 */
	var currentSelection;

	/**
	 * Used to make sure only 1 selection changed
	 * check is called every 100ms.
	 *
	 * Helps improve performance as it is checked a lot.
	 *
	 * @type {boolean}
	 * @private
	 */
	var isSelectionCheckPending;

	/**
	 * If content is required (equivalent to the HTML5 required attribute)
	 *
	 * @type {boolean}
	 * @private
	 */
	var isRequired;

	/**
	 * The inline CSS style element. Will be undefined
	 * until css() is called for the first time.
	 *
	 * @type {HTMLStyleElement}
	 * @private
	 */
	var inlineCss;

	/**
	 * Object containing a list of shortcut handlers
	 *
	 * @type {Object}
	 * @private
	 */
	var shortcutHandlers = {};

	/**
	 * The min and max heights that autoExpand should stay within
	 *
	 * @type {Object}
	 * @private
	 */
	var autoExpandBounds;

	/**
	 * Timeout for the autoExpand function to throttle calls
	 *
	 * @private
	 */
	var autoExpandThrottle;

	/**
	 * Cache of the current toolbar buttons
	 *
	 * @type {Object}
	 * @private
	 */
	var toolbarButtons = {};

	/**
	 * Last scroll position before maximizing so
	 * it can be restored when finished.
	 *
	 * @type {number}
	 * @private
	 */
	var maximizeScrollPosition;

	/**
	 * Stores the contents while a paste is taking place.
	 *
	 * Needed to support browsers that lack clipboard API support.
	 *
	 * @type {?DocumentFragment}
	 * @private
	 */
	var pasteContentFragment;

	/**
	 * All the emoticons from dropdown, more and hidden combined
	 * and with the emoticons root set
	 *
	 * @type {!Object<string, string>}
	 * @private
	 */
	var allEmoticons = {};

	/**
	 * Current icon set if any
	 *
	 * @type {?Object}
	 * @private
	 */
	var icons;

	/**
	 * Private functions
	 * @private
	 */
	var	init,
		replaceEmoticons,
		handleCommand,
		initEditor,
		initLocale,
		initToolBar,
		initOptions,
		initEvents,
		initResize,
		initEmoticons,
		handlePasteEvt,
		handleCutCopyEvt,
		handlePasteData,
		handleKeyDown,
		handleBackSpace,
		handleKeyPress,
		handleFormReset,
		handleMouseDown,
		handleComposition,
		handleEvent,
		handleDocumentClick,
		updateToolBar,
		updateActiveButtons,
		sourceEditorSelectedText,
		appendNewLine,
		checkSelectionChanged,
		checkNodeChanged,
		autofocus,
		emoticonsKeyPress,
		emoticonsCheckWhitespace,
		currentStyledBlockNode,
		triggerValueChanged,
		valueChangedBlur,
		valueChangedKeyUp,
		autoUpdate,
		autoExpand;

	/**
	 * All the commands supported by the editor
	 * @name commands
	 * @memberOf SCEditor.prototype
	 */
	base.commands = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, (userOptions.commands || _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"]));

	/**
	 * Options for this editor instance
	 * @name opts
	 * @memberOf SCEditor.prototype
	 */
	var options = base.opts = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(
		true, {}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"], userOptions
	);

	// Don't deep extend emoticons (fixes #565)
	base.opts.emoticons = userOptions.emoticons || _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"].emoticons;

	if (!Array.isArray(options.allowedIframeUrls)) {
		options.allowedIframeUrls = [];
	}
	options.allowedIframeUrls.push('https://www.youtube-nocookie.com/embed/');

	// Create new instance of DOMPurify for each editor instance so can
	// have different allowed iframe URLs
	// eslint-disable-next-line new-cap
	var domPurify = dompurify__WEBPACK_IMPORTED_MODULE_10___default()();

	// Allow iframes for things like YouTube, see:
	// https://github.com/cure53/DOMPurify/issues/340#issuecomment-670758980
	domPurify.addHook('uponSanitizeElement', function (node, data) {
		var allowedUrls = options.allowedIframeUrls;

		if (data.tagName === 'iframe') {
			var src = _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'src') || '';

			for (var i = 0; i < allowedUrls.length; i++) {
				var url = allowedUrls[i];

				if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(url) && src.substr(0, url.length) === url) {
					return;
				}

				// Handle regex
				if (url.test && url.test(src)) {
					return;
				}
			}

			// No match so remove
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(node);
		}
	});

	// Convert target attribute into data-sce-target attributes so XHTML format
	// can allow them
	domPurify.addHook('afterSanitizeAttributes', function (node) {
		if ('target' in node) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'data-sce-target', _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'target'));
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeAttr(node, 'target');
	});

	/**
	 * Sanitize HTML to avoid XSS
	 *
	 * @param {string} html
	 * @return {string} html
	 * @private
	 */
	function sanitize(html) {
		const allowedTags = ['iframe'].concat(options.allowedTags);
		const allowedAttrs = ['allowfullscreen', 'frameborder', 'target']
			.concat(options.allowedAttributes);

		return domPurify.sanitize(html, {
			ADD_TAGS: allowedTags,
			ADD_ATTR: allowedAttrs
		});
	}

	/**
	 * Creates the editor iframe and textarea
	 * @private
	 */
	init = function () {
		original._sceditor = base;

		// Load locale
		if (options.locale && options.locale !== 'en') {
			initLocale();
		}

		editorContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
			className: 'sceditor-container'
		});

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(editorContainer, original);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(editorContainer, 'z-index', options.zIndex);

		isRequired = original.required;
		original.required = false;

		var FormatCtor = SCEditor.formats[options.format];
		format = FormatCtor ? new FormatCtor() : {};
		/*
		 * Plugins should be initialized before the formatters since
		 * they may wish to add or change formatting handlers and
		 * since the bbcode format caches its handlers,
		 * such changes must be done first.
		 */
		pluginManager = new _PluginManager_js__WEBPACK_IMPORTED_MODULE_4__["default"](base);
		(options.plugins || '').split(',').forEach(function (plugin) {
			pluginManager.register(plugin.trim());
		});
		if ('init' in format) {
			format.init.call(base);
		}

		// create the editor
		initEmoticons();
		initToolBar();
		initEditor();
		initOptions();
		initEvents();

		// force into source mode if is a browser that can't handle
		// full editing
		if (!_browser_js__WEBPACK_IMPORTED_MODULE_8__.isWysiwygSupported) {
			base.toggleSourceMode();
		}

		updateActiveButtons();

		var loaded = function () {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalWin, 'load', loaded);

			if (options.autofocus) {
				autofocus(!!options.autofocusEnd);
			}

			autoExpand();
			appendNewLine();
			// TODO: use editor doc and window?
			pluginManager.call('ready');
			if ('onReady' in format) {
				format.onReady.call(base);
			}
		};
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalWin, 'load', loaded);
		if (globalDoc.readyState === 'complete') {
			loaded();
		}
	};

	/**
	 * Init the locale variable with the specified locale if possible
	 * @private
	 * @return void
	 */
	initLocale = function () {
		var lang;

		locale = SCEditor.locale[options.locale];

		if (!locale) {
			lang   = options.locale.split('-');
			locale = SCEditor.locale[lang[0]];
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
	initEditor = function () {
		sourceEditor  = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('textarea');
		wysiwygEditor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('iframe', {
			frameborder: 0,
			allowfullscreen: true
		});

		/*
		 * This needs to be done right after they are created because,
		 * for any reason, the user may not want the value to be tinkered
		 * by any filters.
		 */
		if (options.startInSourceMode) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(editorContainer, 'sourceMode');
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(wysiwygEditor);
		} else {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(editorContainer, 'wysiwygMode');
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(sourceEditor);
		}

		if (!options.spellcheck) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(editorContainer, 'spellcheck', 'false');
		}

		if (globalWin.location.protocol === 'https:') {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygEditor, 'src', 'about:blank');
		}

		// Add the editor to the container
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, wysiwygEditor);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, sourceEditor);

		// TODO: make this optional somehow
		base.dimensions(
			options.width || _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(original),
			options.height || _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(original)
		);

		// Add ios to HTML so can apply CSS fix to only it
		var className = _browser_js__WEBPACK_IMPORTED_MODULE_8__.ios ? ' ios' : '';

		wysiwygDocument = wysiwygEditor.contentDocument;
		wysiwygDocument.open();
		wysiwygDocument.write((0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('html', {
			attrs: ' class="' + className + '"',
			spellcheck: options.spellcheck ? '' : 'spellcheck="false"',
			charset: options.charset,
			style: options.style
		}));
		wysiwygDocument.close();

		wysiwygBody = wysiwygDocument.body;
		wysiwygWindow = wysiwygEditor.contentWindow;

		base.readOnly(!!options.readOnly);

		// iframe overflow fix for iOS
		if (_browser_js__WEBPACK_IMPORTED_MODULE_8__.ios) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.height(wysiwygBody, '100%');
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'touchend', base.focus);
		}

		var tabIndex = _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(original, 'tabindex');
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(sourceEditor, 'tabindex', tabIndex);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygEditor, 'tabindex', tabIndex);

		rangeHelper = new _RangeHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"](wysiwygWindow, null, sanitize);

		// load any textarea value into the editor
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(original);
		base.val(original.value);

		var placeholder = options.placeholder ||
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(original, 'placeholder');

		if (placeholder) {
			sourceEditor.placeholder = placeholder;
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygBody, 'placeholder', placeholder);
		}
	};

	/**
	 * Initialises options
	 * @private
	 */
	initOptions = function () {
		// auto-update original textbox on blur if option set to true
		if (options.autoUpdate) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'blur', autoUpdate);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'blur', autoUpdate);
		}

		if (options.rtl === null) {
			options.rtl = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(sourceEditor, 'direction') === 'rtl';
		}

		base.rtl(!!options.rtl);

		if (options.autoExpand) {
			// Need to update when images (or anything else) loads
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'load', autoExpand, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'input keyup', autoExpand);
		}

		if (options.resizeEnabled) {
			initResize();
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(editorContainer, 'id', options.id);
		base.emoticons(options.emoticonsEnabled);
	};

	/**
	 * Initialises events
	 * @private
	 */
	initEvents = function () {
		var form = original.form;
		var compositionEvents = 'compositionstart compositionend';
		var eventsToForward =
			'keydown keyup keypress focus blur contextmenu input';
		var checkSelectionEvents = 'onselectionchange' in wysiwygDocument ?
			'selectionchange' :
			'keyup focus blur contextmenu mouseup touchend click';

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, 'click', handleDocumentClick);

		if (form) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(form, 'reset', handleFormReset);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(form, 'submit', base.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pagehide', base.updateOriginal);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pageshow', handleFormReset);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keypress', handleKeyPress);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keydown', handleKeyDown);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keydown', handleBackSpace);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keyup', appendNewLine);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'blur', valueChangedBlur);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keyup', valueChangedKeyUp);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'paste', handlePasteEvt);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'cut copy', handleCutCopyEvt);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, compositionEvents, handleComposition);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, checkSelectionEvents, checkSelectionChanged);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, eventsToForward, handleEvent);

		if (options.emoticonsCompat && globalWin.getSelection) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keyup', emoticonsCheckWhitespace);
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'blur', function () {
			if (!base.val()) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(wysiwygBody, 'placeholder');
			}
		});

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'focus', function () {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(wysiwygBody, 'placeholder');
		});

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'blur', valueChangedBlur);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'keyup', valueChangedKeyUp);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'keydown', handleKeyDown);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, compositionEvents, handleComposition);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, eventsToForward, handleEvent);

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygDocument, 'mousedown', handleMouseDown);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygDocument, checkSelectionEvents, checkSelectionChanged);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygDocument, 'keyup', appendNewLine);

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(editorContainer, 'selectionchanged', checkNodeChanged);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(editorContainer, 'selectionchanged', updateActiveButtons);
		// Custom events to forward
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(
			editorContainer,
			'selectionchanged valuechanged nodechanged pasteraw paste',
			handleEvent
		);
	};

	/**
	 * Creates the toolbar and appends it to the container
	 * @private
	 */
	initToolBar = function () {
		var	group,
			commands = base.commands,
			exclude  = (options.toolbarExclude || '').split(','),
			groups   = options.toolbar.split('|');

		toolbar = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
			className: 'sceditor-toolbar',
			unselectable: 'on'
		});

		if (options.icons in SCEditor.icons) {
			icons = new SCEditor.icons[options.icons]();
		}

		_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(groups, function (_, menuItems) {
			group = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
				className: 'sceditor-group'
			});

			_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(menuItems.split(','), function (_, commandName) {
				var	button, shortcut,
					command  = commands[commandName];

				// The commandName must be a valid command and not excluded
				if (!command || exclude.indexOf(commandName) > -1) {
					return;
				}

				shortcut = command.shortcut;
				button   = (0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('toolbarButton', {
					name: commandName,
					dispName: base._(command.name ||
							command.tooltip || commandName)
				}, true).firstChild;

				if (icons && icons.create) {
					var icon = icons.create(commandName);
					if (icon) {
						_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(icons.create(commandName),
							button.firstChild);
						_dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(button, 'has-icon');
					}
				}

				button._sceTxtMode = !!command.txtExec;
				button._sceWysiwygMode = !!command.exec;
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', !command.exec);
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(button, 'click', function (e) {
					if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(button, 'disabled')) {
						handleCommand(button, command);
					}

					updateActiveButtons();
					e.preventDefault();
				});
				// Prevent editor losing focus when button clicked
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(button, 'mousedown', function (e) {
					base.closeDropDown();
					e.preventDefault();
				});

				if (command.tooltip) {
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(button, 'title',
						base._(command.tooltip) +
							(shortcut ? ' (' + shortcut + ')' : '')
					);
				}

				if (shortcut) {
					base.addShortcut(shortcut, commandName);
				}

				if (command.state) {
					btnStateHandlers.push({
						name: commandName,
						state: command.state
					});
				// exec string commands can be passed to queryCommandState
				} else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(command.exec)) {
					btnStateHandlers.push({
						name: commandName,
						state: command.exec
					});
				}

				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(group, button);
				toolbarButtons[commandName] = button;
			});

			// Exclude empty groups
			if (group.firstChild) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(toolbar, group);
			}
		});

		// Append the toolbar to the toolbarContainer option if given
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(options.toolbarContainer || editorContainer, toolbar);
	};

	/**
	 * Creates the resizer.
	 * @private
	 */
	initResize = function () {
		var	minHeight, maxHeight, minWidth, maxWidth,
			mouseMoveFunc, mouseUpFunc,
			grip        = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
				className: 'sceditor-grip'
			}),
			// Cover is used to cover the editor iframe so document
			// still gets mouse move events
			cover       = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
				className: 'sceditor-resize-cover'
			}),
			moveEvents  = 'touchmove mousemove',
			endEvents   = 'touchcancel touchend mouseup',
			startX      = 0,
			startY      = 0,
			newX        = 0,
			newY        = 0,
			startWidth  = 0,
			startHeight = 0,
			origWidth   = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer),
			origHeight  = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer),
			isDragging  = false,
			rtl         = base.rtl();

		minHeight = options.resizeMinHeight || origHeight / 1.5;
		maxHeight = options.resizeMaxHeight || origHeight * 2.5;
		minWidth  = options.resizeMinWidth  || origWidth  / 1.25;
		maxWidth  = options.resizeMaxWidth  || origWidth  * 1.25;

		mouseMoveFunc = function (e) {
			// iOS uses window.event
			if (e.type === 'touchmove') {
				e    = globalWin.event;
				newX = e.changedTouches[0].pageX;
				newY = e.changedTouches[0].pageY;
			} else {
				newX = e.pageX;
				newY = e.pageY;
			}

			var	newHeight = startHeight + (newY - startY),
				newWidth  = rtl ?
					startWidth - (newX - startX) :
					startWidth + (newX - startX);

			if (maxWidth > 0 && newWidth > maxWidth) {
				newWidth = maxWidth;
			}
			if (minWidth > 0 && newWidth < minWidth) {
				newWidth = minWidth;
			}
			if (!options.resizeWidth) {
				newWidth = false;
			}

			if (maxHeight > 0 && newHeight > maxHeight) {
				newHeight = maxHeight;
			}
			if (minHeight > 0 && newHeight < minHeight) {
				newHeight = minHeight;
			}
			if (!options.resizeHeight) {
				newHeight = false;
			}

			if (newWidth || newHeight) {
				base.dimensions(newWidth, newHeight);
			}

			e.preventDefault();
		};

		mouseUpFunc = function (e) {
			if (!isDragging) {
				return;
			}

			isDragging = false;

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(cover);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(editorContainer, 'resizing');
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, moveEvents, mouseMoveFunc);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, endEvents, mouseUpFunc);

			e.preventDefault();
		};

		if (icons && icons.create) {
			var icon = icons.create('grip');
			if (icon) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(grip, icon);
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(grip, 'has-icon');
			}
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, grip);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, cover);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(cover);

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(grip, 'touchstart mousedown', function (e) {
			// iOS uses window.event
			if (e.type === 'touchstart') {
				e      = globalWin.event;
				startX = e.touches[0].pageX;
				startY = e.touches[0].pageY;
			} else {
				startX = e.pageX;
				startY = e.pageY;
			}

			startWidth  = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer);
			startHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer);
			isDragging  = true;

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(editorContainer, 'resizing');
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.show(cover);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, moveEvents, mouseMoveFunc);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, endEvents, mouseUpFunc);

			e.preventDefault();
		});
	};

	/**
	 * Prefixes and preloads the emoticon images
	 * @private
	 */
	initEmoticons = function () {
		var	emoticons = options.emoticons;
		var root      = options.emoticonsRoot || '';

		if (emoticons) {
			allEmoticons = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(
				{}, emoticons.more, emoticons.dropdown, emoticons.hidden
			);
		}

		_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(allEmoticons, function (key, url) {
			allEmoticons[key] = (0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('emoticon', {
				key: key,
				// Prefix emoticon root to emoticon urls
				url: root + (url.url || url),
				tooltip: url.tooltip || key
			});

			// Preload the emoticon
			if (options.emoticonsEnabled) {
				preLoadCache.push(_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
					src: root + (url.url || url)
				}));
			}
		});
	};

	/**
	 * Autofocus the editor
	 * @private
	 */
	autofocus = function (focusEnd) {
		var	range, txtPos,
			node = wysiwygBody.firstChild;

		// Can't focus invisible elements
		if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isVisible(editorContainer)) {
			return;
		}

		if (base.sourceMode()) {
			txtPos = focusEnd ? sourceEditor.value.length : 0;

			sourceEditor.setSelectionRange(txtPos, txtPos);

			return;
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeWhiteSpace(wysiwygBody);

		if (focusEnd) {
			if (!(node = wysiwygBody.lastChild)) {
				node = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, wysiwygDocument);
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wysiwygBody, node);
			}

			while (node.lastChild) {
				node = node.lastChild;

				// Should place the cursor before the last <br>
				if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'br') && node.previousSibling) {
					node = node.previousSibling;
				}
			}
		}

		range = wysiwygDocument.createRange();

		if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.canHaveChildren(node)) {
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

		base.focus();
	};

	/**
	 * Gets if the editor is read only
	 *
	 * @since 1.3.5
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name readOnly
	 * @return {boolean}
	 */
	/**
	 * Sets if the editor is read only
	 *
	 * @param {boolean} readOnly
	 * @since 1.3.5
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name readOnly^2
	 * @return {this}
	 */
	base.readOnly = function (readOnly) {
		if (typeof readOnly !== 'boolean') {
			return !sourceEditor.readonly;
		}

		wysiwygBody.contentEditable = !readOnly;
		sourceEditor.readonly = !readOnly;

		updateToolBar(readOnly);

		return base;
	};

	/**
	 * Gets if the editor is in RTL mode
	 *
	 * @since 1.4.1
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name rtl
	 * @return {boolean}
	 */
	/**
	 * Sets if the editor is in RTL mode
	 *
	 * @param {boolean} rtl
	 * @since 1.4.1
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name rtl^2
	 * @return {this}
	 */
	base.rtl = function (rtl) {
		var dir = rtl ? 'rtl' : 'ltr';

		if (typeof rtl !== 'boolean') {
			return _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(sourceEditor, 'dir') === 'rtl';
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygBody, 'dir', dir);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(sourceEditor, 'dir', dir);

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(editorContainer, 'rtl');
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(editorContainer, 'ltr');
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(editorContainer, dir);

		if (icons && icons.rtl) {
			icons.rtl(rtl);
		}

		return base;
	};

	/**
	 * Updates the toolbar to disable/enable the appropriate buttons
	 * @private
	 */
	updateToolBar = function (disable) {
		var mode = base.inSourceMode() ? '_sceTxtMode' : '_sceWysiwygMode';

		_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(toolbarButtons, function (_, button) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', disable || !button[mode]);
		});
	};

	/**
	 * Gets the width of the editor in pixels
	 *
	 * @since 1.3.5
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name width
	 * @return {number}
	 */
	/**
	 * Sets the width of the editor
	 *
	 * @param {number} width Width in pixels
	 * @since 1.3.5
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name width^2
	 * @return {this}
	 */
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
	 * @memberOf SCEditor.prototype
	 * @name width^3
	 * @return {this}
	 */
	base.width = function (width, saveWidth) {
		if (!width && width !== 0) {
			return _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer);
		}

		base.dimensions(width, null, saveWidth);

		return base;
	};

	/**
	 * Returns an object with the properties width and height
	 * which are the width and height of the editor in px.
	 *
	 * @since 1.4.1
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name dimensions
	 * @return {object}
	 */
	/**
	 * <p>Sets the width and/or height of the editor.</p>
	 *
	 * <p>If width or height is not numeric it is ignored.</p>
	 *
	 * @param {number}	width	Width in px
	 * @param {number}	height	Height in px
	 * @since 1.4.1
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name dimensions^2
	 * @return {this}
	 */
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
	 * @memberOf SCEditor.prototype
	 * @name dimensions^3
	 * @return {this}
	 */
	base.dimensions = function (width, height, save) {
		// set undefined width/height to boolean false
		width  = (!width && width !== 0) ? false : width;
		height = (!height && height !== 0) ? false : height;

		if (width === false && height === false) {
			return { width: base.width(), height: base.height() };
		}

		if (width !== false) {
			if (save !== false) {
				options.width = width;
			}

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer, width);
		}

		if (height !== false) {
			if (save !== false) {
				options.height = height;
			}

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer, height);
		}

		return base;
	};

	/**
	 * Gets the height of the editor in px
	 *
	 * @since 1.3.5
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name height
	 * @return {number}
	 */
	/**
	 * Sets the height of the editor
	 *
	 * @param {number} height Height in px
	 * @since 1.3.5
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name height^2
	 * @return {this}
	 */
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
	 * @memberOf SCEditor.prototype
	 * @name height^3
	 * @return {this}
	 */
	base.height = function (height, saveHeight) {
		if (!height && height !== 0) {
			return _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer);
		}

		base.dimensions(null, height, saveHeight);

		return base;
	};

	/**
	 * Gets if the editor is maximised or not
	 *
	 * @since 1.4.1
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name maximize
	 * @return {boolean}
	 */
	/**
	 * Sets if the editor is maximised or not
	 *
	 * @param {boolean} maximize If to maximise the editor
	 * @since 1.4.1
	 * @function
	 * @memberOf SCEditor.prototype
	 * @name maximize^2
	 * @return {this}
	 */
	base.maximize = function (maximize) {
		var maximizeSize = 'sceditor-maximize';

		if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined(maximize)) {
			return _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(editorContainer, maximizeSize);
		}

		maximize = !!maximize;

		if (maximize) {
			maximizeScrollPosition = globalWin.pageYOffset;
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.documentElement, maximizeSize, maximize);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.body, maximizeSize, maximize);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(editorContainer, maximizeSize, maximize);
		base.width(maximize ? '100%' : options.width, false);
		base.height(maximize ? '100%' : options.height, false);

		if (!maximize) {
			globalWin.scrollTo(0, maximizeScrollPosition);
		}

		autoExpand();

		return base;
	};

	autoExpand = function () {
		if (options.autoExpand && !autoExpandThrottle) {
			autoExpandThrottle = setTimeout(base.expandToContent, 200);
		}
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
	 * @memberOf SCEditor.prototype
	 * @see #resizeToContent
	 */
	base.expandToContent = function (ignoreMaxHeight) {
		if (base.maximize()) {
			return;
		}

		clearTimeout(autoExpandThrottle);
		autoExpandThrottle = false;

		if (!autoExpandBounds) {
			var height = options.resizeMinHeight || options.height ||
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.height(original);

			autoExpandBounds = {
				min: height,
				max: options.resizeMaxHeight || (height * 2)
			};
		}

		var range = globalDoc.createRange();
		range.selectNodeContents(wysiwygBody);

		var rect = range.getBoundingClientRect();
		var current = wysiwygDocument.documentElement.clientHeight - 1;
		var spaceNeeded = rect.bottom - rect.top;
		var newHeight = base.height() + 1 + (spaceNeeded - current);

		if (!ignoreMaxHeight && autoExpandBounds.max !== -1) {
			newHeight = Math.min(newHeight, autoExpandBounds.max);
		}

		base.height(Math.ceil(Math.max(newHeight, autoExpandBounds.min)));
	};

	/**
	 * Destroys the editor, removing all elements and
	 * event handlers.
	 *
	 * Leaves only the original textarea.
	 *
	 * @function
	 * @name destroy
	 * @memberOf SCEditor.prototype
	 */
	base.destroy = function () {
		// Don't destroy if the editor has already been destroyed
		if (!pluginManager) {
			return;
		}

		pluginManager.destroy();

		rangeHelper   = null;
		pluginManager = null;

		if (dropdown) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(dropdown);
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, 'click', handleDocumentClick);

		var form = original.form;
		if (form) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'reset', handleFormReset);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'submit', base.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pagehide', base.updateOriginal);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pageshow', handleFormReset);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(sourceEditor);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(toolbar);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(editorContainer);

		delete original._sceditor;
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.show(original);

		original.required = isRequired;
	};


	/**
	 * Creates a menu item drop down
	 *
	 * @param  {HTMLElement} menuItem The button to align the dropdown with
	 * @param  {string} name          Used for styling the dropdown, will be
	 *                                a class sceditor-name
	 * @param  {HTMLElement} content  The HTML content of the dropdown
	 * @function
	 * @name createDropDown
	 * @memberOf SCEditor.prototype
	 */
	base.createDropDown = function (menuItem, name, content) {
		// first click for create second click for close
		var	dropDownCss,
			dropDownClass = 'sceditor-' + name;

		base.closeDropDown();

		// Only close the dropdown if it was already open
		if (dropdown && _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(dropdown, dropDownClass)) {
			return;
		}

		dropDownCss = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend({
			top: menuItem.offsetTop,
			left: menuItem.offsetLeft,
			marginTop: menuItem.clientHeight
		}, options.dropDownCss);

		dropdown = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
			className: 'sceditor-dropdown ' + dropDownClass
		});

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(dropdown, dropDownCss);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(dropdown, content);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, dropdown);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(dropdown, 'click focusin', function (e) {
			// stop clicks within the dropdown from being handled
			e.stopPropagation();
		});

		if (dropdown) {
			var first = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(dropdown, 'input,textarea')[0];
			if (first) {
				first.focus();
			}
		}
	};

	/**
	 * Handles any document click and closes the dropdown if open
	 * @private
	 */
	handleDocumentClick = function (e) {
		// ignore right clicks
		if (e.which !== 3 && dropdown && !e.defaultPrevented) {
			autoUpdate();

			base.closeDropDown();
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
	handleCutCopyEvt = function (e) {
		var range = rangeHelper.selectedRange();
		if (range) {
			var container = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, wysiwygDocument);
			var firstParent;

			// Copy all inline parent nodes up to the first block parent so can
			// copy inline styles
			var parent = range.commonAncestorContainer;
			while (parent && _dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true)) {
				if (parent.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE) {
					var clone = parent.cloneNode();
					if (container.firstChild) {
						_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(clone, container.firstChild);
					}

					_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(container, clone);
					firstParent = firstParent || clone;
				}
				parent = parent.parentNode;
			}

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(firstParent || container, range.cloneContents());
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeWhiteSpace(container);

			e.clipboardData.setData('text/html', container.innerHTML);

			// TODO: Refactor into private shared module with plaintext plugin
			// innerText adds two newlines after <p> tags so convert them to
			// <div> tags
			_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(container, 'p'), function (_, elm) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.convertElement(elm, 'div');
			});
			// Remove collapsed <br> tags as innerText converts them to newlines
			_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(container, 'br'), function (_, elm) {
				if (!elm.nextSibling || !_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(elm.nextSibling, true)) {
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(elm);
				}
			});

			// range.toString() doesn't include newlines so can't use that.
			// selection.toString() seems to use the same method as innerText
			// but needs to be normalised first so using container.innerText
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wysiwygBody, container);
			e.clipboardData.setData('text/plain', container.innerText);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(container);

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
	handlePasteEvt = function (e) {
		var editable = wysiwygBody;
		var clipboard = e.clipboardData;
		var loadImage = function (file) {
			var reader = new FileReader();
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
			var data = {};
			var types = clipboard.types;
			var items = clipboard.items;

			e.preventDefault();

			for (var i = 0; i < types.length; i++) {
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
			var scrollTop = editable.scrollTop;

			rangeHelper.saveRange();

			pasteContentFragment = globalDoc.createDocumentFragment();
			while (editable.firstChild) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(pasteContentFragment, editable.firstChild);
			}

			setTimeout(function () {
				var html = editable.innerHTML;

				editable.innerHTML = '';
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editable, pasteContentFragment);
				editable.scrollTop = scrollTop;
				pasteContentFragment = false;

				rangeHelper.restoreRange();

				handlePasteData({ html: sanitize(html) });
			}, 0);
		}
	};

	/**
	 * Gets the pasted data, filters it and then inserts it.
	 * @param {Object} data
	 * @private
	 */
	handlePasteData = function (data) {
		var pasteArea = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, wysiwygDocument);

		pluginManager.call('pasteRaw', data);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(editorContainer, 'pasteraw', data);

		if (data.html) {
			// Sanitize again in case plugins modified the HTML
			pasteArea.innerHTML = sanitize(data.html);

			// fix any invalid nesting
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.fixNesting(pasteArea);
		} else {
			pasteArea.innerHTML = _escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(data.text || '');
		}

		var paste = {
			val: pasteArea.innerHTML
		};

		if ('fragmentToSource' in format) {
			paste.val = format
				.fragmentToSource(paste.val, wysiwygDocument, currentNode);
		}

		pluginManager.call('paste', paste);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(editorContainer, 'paste', paste);

		if ('fragmentToHtml' in format) {
			paste.val = format
				.fragmentToHtml(paste.val, currentNode);
		}

		pluginManager.call('pasteHtml', paste);

		var parent = rangeHelper.getFirstBlockParent();
		base.wysiwygEditorInsertHtml(paste.val, null, true);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.merge(parent);
	};

	/**
	 * Closes any currently open drop down
	 *
	 * @param {boolean} [focus=false] If to focus the editor
	 *                             after closing the drop down
	 * @function
	 * @name closeDropDown
	 * @memberOf SCEditor.prototype
	 */
	base.closeDropDown = function (focus) {
		if (dropdown) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(dropdown);
			dropdown = null;
		}

		if (focus === true) {
			base.focus();
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
	 * @memberOf SCEditor.prototype
	 */
	base.wysiwygEditorInsertHtml = function (
		html, endHtml, overrideCodeBlocking
	) {
		var	marker, scrollTop, scrollTo,
			editorHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(wysiwygEditor);

		base.focus();

		// TODO: This code tag should be configurable and
		// should maybe convert the HTML into text instead
		// Don't apply to code elements
		if (!overrideCodeBlocking && _dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(currentBlockNode, 'code')) {
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
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.fixNesting(wysiwygBody);

		wrapInlines(wysiwygBody, wysiwygDocument);

		// Scroll the editor after the end of the selection
		marker   = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(wysiwygBody, '#sceditor-end-marker')[0];
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.show(marker);
		scrollTop = wysiwygBody.scrollTop;
		scrollTo  = (_dom_js__WEBPACK_IMPORTED_MODULE_0__.getOffset(marker).top +
			(marker.offsetHeight * 1.5)) - editorHeight;
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(marker);

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
	 * @memberOf SCEditor.prototype
	 */
	base.wysiwygEditorInsertText = function (text, endText) {
		base.wysiwygEditorInsertHtml(
			_escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(text), _escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(endText)
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
	 * @memberOf SCEditor.prototype
	 */
	base.insertText = function (text, endText) {
		if (base.inSourceMode()) {
			base.sourceEditorInsertText(text, endText);
		} else {
			base.wysiwygEditorInsertText(text, endText);
		}

		return base;
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
	 * @memberOf SCEditor.prototype
	 */
	base.sourceEditorInsertText = function (text, endText) {
		var scrollTop, currentValue,
			startPos = sourceEditor.selectionStart,
			endPos   = sourceEditor.selectionEnd;

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
	 * @memberOf SCEditor.prototype
	 */
	base.getRangeHelper = function () {
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
	 * @memberOf SCEditor.prototype
	 */
	base.sourceEditorCaret = function (position) {
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
	 * Gets the value of the editor.
	 *
	 * If the editor is in WYSIWYG mode it will return the filtered
	 * HTML from it (converted to BBCode if using the BBCode plugin).
	 * It it's in Source Mode it will return the unfiltered contents
	 * of the source editor (if using the BBCode plugin this will be
	 * BBCode again).
	 *
	 * @since 1.3.5
	 * @return {string}
	 * @function
	 * @name val
	 * @memberOf SCEditor.prototype
	 */
	/**
	 * Sets the value of the editor.
	 *
	 * If filter set true the val will be passed through the filter
	 * function. If using the BBCode plugin it will pass the val to
	 * the BBCode filter to convert any BBCode into HTML.
	 *
	 * @param {string} val
	 * @param {boolean} [filter=true]
	 * @return {this}
	 * @since 1.3.5
	 * @function
	 * @name val^2
	 * @memberOf SCEditor.prototype
	 */
	base.val = function (val, filter) {
		if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(val)) {
			return base.inSourceMode() ?
				base.getSourceEditorValue(false) :
				base.getWysiwygEditorValue(filter);
		}

		if (!base.inSourceMode()) {
			if (filter !== false && 'toHtml' in format) {
				val = format.toHtml(val);
			}

			base.setWysiwygEditorValue(val);
		} else {
			base.setSourceEditorValue(val);
		}

		return base;
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
	 * @param {string} start
	 * @param {string} [end=null]
	 * @param {boolean} [filter=true]
	 * @param {boolean} [convertEmoticons=true] If to convert emoticons
	 * @return {this}
	 * @since 1.3.5
	 * @function
	 * @name insert
	 * @memberOf SCEditor.prototype
	 */
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
	 * @memberOf SCEditor.prototype
	 */
	// eslint-disable-next-line max-params
	base.insert = function (
		start, end, filter, convertEmoticons, allowMixed
	) {
		if (base.inSourceMode()) {
			base.sourceEditorInsertText(start, end);
			return base;
		}

		// Add the selection between start and end
		if (end) {
			var	html = rangeHelper.selectedHtml();

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

		base.wysiwygEditorInsertHtml(start);

		return base;
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
	 * @memberOf SCEditor.prototype
	 */
	base.getWysiwygEditorValue = function (filter) {
		var	html;
		// Create a tmp node to store contents so it can be modified
		// without affecting anything else.
		var tmp = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, wysiwygDocument);
		var childNodes = wysiwygBody.childNodes;

		for (var i = 0; i < childNodes.length; i++) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(tmp, childNodes[i].cloneNode(true));
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wysiwygBody, tmp);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.fixNesting(tmp);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(tmp);

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
	 * @memberOf SCEditor.prototype
	 */
	base.getBody = function () {
		return wysiwygBody;
	};

	/**
	 * Gets the WYSIWYG editors container area (whole iFrame).
	 *
	 * @return {HTMLElement}
	 * @function
	 * @since 1.4.3
	 * @name getContentAreaContainer
	 * @memberOf SCEditor.prototype
	 */
	base.getContentAreaContainer = function () {
		return wysiwygEditor;
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
	 * @memberOf SCEditor.prototype
	 */
	base.getSourceEditorValue = function (filter) {
		var val = sourceEditor.value;

		if (filter !== false && 'toHtml' in format) {
			val = format.toHtml(val);
		}

		return val;
	};

	/**
	 * Sets the WYSIWYG HTML editor value. Should only be the HTML
	 * contained within the body tags
	 *
	 * @param {string} value
	 * @function
	 * @name setWysiwygEditorValue
	 * @memberOf SCEditor.prototype
	 */
	base.setWysiwygEditorValue = function (value) {
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
	 * @memberOf SCEditor.prototype
	 */
	base.setSourceEditorValue = function (value) {
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
	 * @memberOf SCEditor.prototype
	 */
	base.updateOriginal = function () {
		original.value = base.val();
	};

	/**
	 * Replaces any emoticon codes in the passed HTML
	 * with their emoticon images
	 * @private
	 */
	replaceEmoticons = function () {
		if (options.emoticonsEnabled) {
			_emoticons_js__WEBPACK_IMPORTED_MODULE_9__.replace(wysiwygBody, allEmoticons, options.emoticonsCompat);
		}
	};

	/**
	 * If the editor is in source code mode
	 *
	 * @return {boolean}
	 * @function
	 * @name inSourceMode
	 * @memberOf SCEditor.prototype
	 */
	base.inSourceMode = function () {
		return _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(editorContainer, 'sourceMode');
	};

	/**
	 * Gets if the editor is in sourceMode
	 *
	 * @return boolean
	 * @function
	 * @name sourceMode
	 * @memberOf SCEditor.prototype
	 */
	/**
	 * Sets if the editor is in sourceMode
	 *
	 * @param {boolean} enable
	 * @return {this}
	 * @function
	 * @name sourceMode^2
	 * @memberOf SCEditor.prototype
	 */
	base.sourceMode = function (enable) {
		var inSourceMode = base.inSourceMode();

		if (typeof enable !== 'boolean') {
			return inSourceMode;
		}

		if ((inSourceMode && !enable) || (!inSourceMode && enable)) {
			base.toggleSourceMode();
		}

		return base;
	};

	/**
	 * Switches between the WYSIWYG and source modes
	 *
	 * @function
	 * @name toggleSourceMode
	 * @since 1.4.0
	 * @memberOf SCEditor.prototype
	 */
	base.toggleSourceMode = function () {
		var isInSourceMode = base.inSourceMode();

		// don't allow switching to WYSIWYG if doesn't support it
		if (!_browser_js__WEBPACK_IMPORTED_MODULE_8__.isWysiwygSupported && isInSourceMode) {
			return;
		}

		if (!isInSourceMode) {
			rangeHelper.saveRange();
			rangeHelper.clear();
		}

		currentSelection = null;
		base.blur();

		if (isInSourceMode) {
			base.setWysiwygEditorValue(base.getSourceEditorValue());
		} else {
			base.setSourceEditorValue(base.getWysiwygEditorValue());
		}

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggle(sourceEditor);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggle(wysiwygEditor);

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(editorContainer, 'wysiwygMode', isInSourceMode);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(editorContainer, 'sourceMode', !isInSourceMode);

		updateToolBar();
		updateActiveButtons();
	};

	/**
	 * Gets the selected text of the source editor
	 * @return {string}
	 * @private
	 */
	sourceEditorSelectedText = function () {
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
	handleCommand = function (caller, cmd) {
		// check if in text mode and handle text commands
		if (base.inSourceMode()) {
			if (cmd.txtExec) {
				if (Array.isArray(cmd.txtExec)) {
					base.sourceEditorInsertText.apply(base, cmd.txtExec);
				} else {
					cmd.txtExec.call(base, caller, sourceEditorSelectedText());
				}
			}
		} else if (cmd.exec) {
			if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(cmd.exec)) {
				cmd.exec.call(base, caller);
			} else {
				base.execCommand(
					cmd.exec,
					Object.prototype.hasOwnProperty.call(cmd, 'execParam') ? cmd.execParam : null
				);
			}
		}

	};

	/**
	 * Executes a command on the WYSIWYG editor
	 *
	 * @param {string} command
	 * @param {String|Boolean} [param]
	 * @function
	 * @name execCommand
	 * @memberOf SCEditor.prototype
	 */
	base.execCommand = function (command, param) {
		var	executed    = false,
			commandObj  = base.commands[command];

		base.focus();

		// TODO: make configurable
		// don't apply any commands to code elements
		if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(rangeHelper.parentNode(), 'code')) {
			return;
		}

		try {
			executed = wysiwygDocument.execCommand(command, false, param);
		} catch (ex) { /* empty */ }

		// show error if execution failed and an error message exists
		if (!executed && commandObj && commandObj.errorMessage) {
			alert(base._(commandObj.errorMessage));
		}

		updateActiveButtons();
	};

	/**
	 * Checks if the current selection has changed and triggers
	 * the selectionchanged event if it has.
	 *
	 * In browsers other that don't support selectionchange event it will check
	 * at most once every 100ms.
	 * @private
	 */
	checkSelectionChanged = function () {
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
					var parent = currentSelection.startContainer;
					var offset = currentSelection.startOffset;

					// Handle if selection is placed before/after an element
					if (offset && parent.nodeType !== _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE) {
						parent = parent.childNodes[offset];
					}

					while (parent && parent.parentNode !== wysiwygBody) {
						parent = parent.parentNode;
					}

					if (parent && _dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true)) {
						rangeHelper.saveRange();
						wrapInlines(wysiwygBody, wysiwygDocument);
						rangeHelper.restoreRange();
					}
				}

				_dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(editorContainer, 'selectionchanged');
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
	checkNodeChanged = function () {
		// check if node has changed
		var	oldNode,
			node = rangeHelper.parentNode();

		if (currentNode !== node) {
			oldNode          = currentNode;
			currentNode      = node;
			currentBlockNode = rangeHelper.getFirstBlockParent(node);

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(editorContainer, 'nodechanged', {
				oldNode: oldNode,
				newNode: currentNode
			});
		}
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
	 * @memberOf SCEditor.prototype
	 */
	base.currentNode = function () {
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.4
	 */
	base.currentBlockNode = function () {
		return currentBlockNode;
	};

	/**
	 * Updates if buttons are active or not
	 * @private
	 */
	updateActiveButtons = function () {
		var firstBlock, parent;
		var activeClass = 'active';
		var doc         = wysiwygDocument;
		var isSource    = base.sourceMode();

		if (base.readOnly()) {
			_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(toolbar, activeClass), function (_, menuItem) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(menuItem, activeClass);
			});
			return;
		}

		if (!isSource) {
			parent     = rangeHelper.parentNode();
			firstBlock = rangeHelper.getFirstBlockParent(parent);
		}

		for (var j = 0; j < btnStateHandlers.length; j++) {
			var state      = 0;
			var btn        = toolbarButtons[btnStateHandlers[j].name];
			var stateFn    = btnStateHandlers[j].state;
			var isDisabled = (isSource && !btn._sceTxtMode) ||
						(!isSource && !btn._sceWysiwygMode);

			if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(stateFn)) {
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
				state = stateFn.call(base, parent, firstBlock);
			}

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(btn, 'disabled', isDisabled || state < 0);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(btn, activeClass, state > 0);
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
	handleKeyPress = function (e) {
		// FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=501496
		if (e.defaultPrevented) {
			return;
		}

		base.closeDropDown();

		// 13 = enter key
		if (e.which === 13) {
			var LIST_TAGS = 'li,ul,ol';

			// "Fix" (cludge) for blocklevel elements being duplicated in some
			// browsers when enter is pressed instead of inserting a newline
			if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(currentBlockNode, LIST_TAGS) &&
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(currentBlockNode)) {

				var br = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('br', {}, wysiwygDocument);
				rangeHelper.insertNode(br);

				// Last <br> of a block will be collapsed  so need to make sure
				// the <br> that was inserted isn't the last node of a block.
				var parent  = br.parentNode;
				var lastChild = parent.lastChild;

				// Sometimes an empty next node is created after the <br>
				if (lastChild && lastChild.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE &&
					lastChild.nodeValue === '') {
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(lastChild);
					lastChild = parent.lastChild;
				}

				// If this is the last BR of a block and the previous
				// sibling is inline then will need an extra BR. This
				// is needed because the last BR of a block will be
				// collapsed. Fixes issue #248
				if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true) && lastChild === br &&
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(br.previousSibling)) {
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
	appendNewLine = function () {
		// Check all nodes in reverse until either add a new line
		// or reach a non-empty textnode or BR at which point can
		// stop checking.
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.rTraverse(wysiwygBody, function (node) {
			// Last block, add new line after if has styling
			if (node.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE &&
				!/inline/.test(_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'display'))) {

				// Add line break after if has styling
				if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, '.sceditor-nlf') && _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(node)) {
					var paragraph = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, wysiwygDocument);
					paragraph.className = 'sceditor-nlf';
					paragraph.innerHTML = '<br />';
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wysiwygBody, paragraph);
					return false;
				}
			}

			// Last non-empty text node or line break.
			// No need to add line-break after them
			if ((node.nodeType === 3 && !/^\s*$/.test(node.nodeValue)) ||
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'br')) {
				return false;
			}
		});
	};

	/**
	 * Handles form reset event
	 * @private
	 */
	handleFormReset = function () {
		base.val(original.value);
	};

	/**
	 * Handles any mousedown press in the WYSIWYG editor
	 * @private
	 */
	handleMouseDown = function () {
		base.closeDropDown();
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
	 * @memberOf SCEditor.prototype
	 */
	base._ = function () {
		var	undef,
			args = arguments;

		if (locale && locale[args[0]]) {
			args[0] = locale[args[0]];
		}

		return args[0].replace(/\{(\d+)\}/g, function (str, p1) {
			return args[p1 - 0 + 1] !== undef ?
				args[p1 - 0 + 1] :
				'{' + p1 + '}';
		});
	};

	/**
	 * Passes events on to any handlers
	 * @private
	 * @return void
	 */
	handleEvent = function (e) {
		if (pluginManager) {
			// Send event to all plugins
			pluginManager.call(e.type + 'Event', e, base);
		}

		// convert the event into a custom event to send
		var name = (e.target === sourceEditor ? 'scesrc' : 'scewys') + e.type;

		if (eventHandlers[name]) {
			eventHandlers[name].forEach(function (fn) {
				fn.call(base, e);
			});
		}
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
	 * @return {this}
	 * @function
	 * @name bind
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.bind = function (events, handler, excludeWysiwyg, excludeSource) {
		events = events.split(' ');

		var i  = events.length;
		while (i--) {
			if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
				var wysEvent = 'scewys' + events[i];
				var srcEvent = 'scesrc' + events[i];
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
				if (events[i] === 'valuechanged') {
					triggerValueChanged.hasHandler = true;
				}
			}
		}

		return base;
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 * @see bind
	 */
	base.unbind = function (events, handler, excludeWysiwyg, excludeSource) {
		events = events.split(' ');

		var i  = events.length;
		while (i--) {
			if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
				if (!excludeWysiwyg) {
					_utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(
						eventHandlers['scewys' + events[i]] || [], handler);
				}

				if (!excludeSource) {
					_utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(
						eventHandlers['scesrc' + events[i]] || [], handler);
				}
			}
		}

		return base;
	};

	/**
	 * Blurs the editors input area
	 *
	 * @return {this}
	 * @function
	 * @name blur
	 * @memberOf SCEditor.prototype
	 * @since 1.3.6
	 */
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.blur = function (handler, excludeWysiwyg, excludeSource) {
		if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
			base.bind('blur', handler, excludeWysiwyg, excludeSource);
		} else if (!base.sourceMode()) {
			wysiwygBody.blur();
		} else {
			sourceEditor.blur();
		}

		return base;
	};

	/**
	 * Focuses the editors input area
	 *
	 * @return {this}
	 * @function
	 * @name focus
	 * @memberOf SCEditor.prototype
	 */
	/**
	 * Adds an event handler to the focus event
	 *
	 * @param  {Function} handler
	 * @param  {boolean} excludeWysiwyg If to exclude adding this handler
	 *                                  to the WYSIWYG editor
	 * @param  {boolean} excludeSource  if to exclude adding this handler
	 *                                  to the source editor
	 * @return {this}
	 * @function
	 * @name focus^2
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.focus = function (handler, excludeWysiwyg, excludeSource) {
		if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
			base.bind('focus', handler, excludeWysiwyg, excludeSource);
		} else if (!base.inSourceMode()) {
			// Already has focus so do nothing
			if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(wysiwygDocument, ':focus').length) {
				return;
			}

			var container;
			var rng = rangeHelper.selectedRange();

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
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(container.firstChild, 'br')) {
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

		return base;
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.keyDown = function (handler, excludeWysiwyg, excludeSource) {
		return base.bind('keydown', handler, excludeWysiwyg, excludeSource);
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.keyPress = function (handler, excludeWysiwyg, excludeSource) {
		return base
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.keyUp = function (handler, excludeWysiwyg, excludeSource) {
		return base.bind('keyup', handler, excludeWysiwyg, excludeSource);
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.nodeChanged = function (handler) {
		return base.bind('nodechanged', handler, false, true);
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.1
	 */
	base.selectionChanged = function (handler) {
		return base.bind('selectionchanged', handler, false, true);
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
	 * @memberOf SCEditor.prototype
	 * @since 1.4.5
	 */
	base.valueChanged = function (handler, excludeWysiwyg, excludeSource) {
		return base
			.bind('valuechanged', handler, excludeWysiwyg, excludeSource);
	};

	/**
	 * Emoticons keypress handler
	 * @private
	 */
	emoticonsKeyPress = function (e) {
		var	replacedEmoticon,
			cachePos       = 0,
			emoticonsCache = base.emoticonsCache,
			curChar        = String.fromCharCode(e.which);

		// TODO: Make configurable
		if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(currentBlockNode, 'code')) {
			return;
		}

		if (!emoticonsCache) {
			emoticonsCache = [];

			_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(allEmoticons, function (key, html) {
				emoticonsCache[cachePos++] = [key, html];
			});

			emoticonsCache.sort(function (a, b) {
				return a[0].length - b[0].length;
			});

			base.emoticonsCache = emoticonsCache;
			base.longestEmoticonCode =
				emoticonsCache[emoticonsCache.length - 1][0].length;
		}

		replacedEmoticon = rangeHelper.replaceKeyword(
			base.emoticonsCache,
			true,
			true,
			base.longestEmoticonCode,
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
	emoticonsCheckWhitespace = function () {
		_emoticons_js__WEBPACK_IMPORTED_MODULE_9__.checkWhitespace(currentBlockNode, rangeHelper);
	};

	/**
	 * Gets if emoticons are currently enabled
	 * @return {boolean}
	 * @function
	 * @name emoticons
	 * @memberOf SCEditor.prototype
	 * @since 1.4.2
	 */
	/**
	 * Enables/disables emoticons
	 *
	 * @param {boolean} enable
	 * @return {this}
	 * @function
	 * @name emoticons^2
	 * @memberOf SCEditor.prototype
	 * @since 1.4.2
	 */
	base.emoticons = function (enable) {
		if (!enable && enable !== false) {
			return options.emoticonsEnabled;
		}

		options.emoticonsEnabled = enable;

		if (enable) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keypress', emoticonsKeyPress);

			if (!base.sourceMode()) {
				rangeHelper.saveRange();

				replaceEmoticons();
				triggerValueChanged(false);

				rangeHelper.restoreRange();
			}
		} else {
			var emoticons =
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(wysiwygBody, 'img[data-sceditor-emoticon]');

			_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, function (_, img) {
				var text = _dom_js__WEBPACK_IMPORTED_MODULE_0__.data(img, 'sceditor-emoticon');
				var textNode = wysiwygDocument.createTextNode(text);
				img.parentNode.replaceChild(textNode, img);
			});

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(wysiwygBody, 'keypress', emoticonsKeyPress);

			triggerValueChanged();
		}

		return base;
	};

	/**
	 * Gets the current WYSIWYG editors inline CSS
	 *
	 * @return {string}
	 * @function
	 * @name css
	 * @memberOf SCEditor.prototype
	 * @since 1.4.3
	 */
	/**
	 * Sets inline CSS for the WYSIWYG editor
	 *
	 * @param {string} css
	 * @return {this}
	 * @function
	 * @name css^2
	 * @memberOf SCEditor.prototype
	 * @since 1.4.3
	 */
	base.css = function (css) {
		if (!inlineCss) {
			inlineCss = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('style', {
				id: 'inline'
			}, wysiwygDocument);

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wysiwygDocument.head, inlineCss);
		}

		if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(css)) {
			return inlineCss.styleSheet ?
				inlineCss.styleSheet.cssText : inlineCss.innerHTML;
		}

		if (inlineCss.styleSheet) {
			inlineCss.styleSheet.cssText = css;
		} else {
			inlineCss.innerHTML = css;
		}

		return base;
	};

	/**
	 * Handles the keydown event, used for shortcuts
	 * @private
	 */
	handleKeyDown = function (e) {
		var	shortcut   = [],
			SHIFT_KEYS = {
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
			},
			SPECIAL_KEYS = {
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
			},
			NUMPAD_SHIFT_KEYS = {
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
			},
			which     = e.which,
			character = SPECIAL_KEYS[which] ||
				String.fromCharCode(which).toLowerCase();

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
			shortcutHandlers[shortcut].call(base) === false) {

			e.stopPropagation();
			e.preventDefault();
		}
	};

	/**
	 * Adds a shortcut handler to the editor
	 * @param  {string}          shortcut
	 * @param  {String|Function} cmd
	 * @return {sceditor}
	 */
	base.addShortcut = function (shortcut, cmd) {
		shortcut = shortcut.toLowerCase();

		if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(cmd)) {
			shortcutHandlers[shortcut] = function () {
				handleCommand(toolbarButtons[cmd], base.commands[cmd]);

				return false;
			};
		} else {
			shortcutHandlers[shortcut] = cmd;
		}

		return base;
	};

	/**
	 * Removes a shortcut handler
	 * @param  {string} shortcut
	 * @return {sceditor}
	 */
	base.removeShortcut = function (shortcut) {
		delete shortcutHandlers[shortcut.toLowerCase()];

		return base;
	};

	/**
	 * Handles the backspace key press
	 *
	 * Will remove block styling like quotes/code ect if at the start.
	 * @private
	 */
	handleBackSpace = function (e) {
		var	node, offset, range, parent;

		// 8 is the backspace key
		if (options.disableBlockRemove || e.which !== 8 ||
			!(range = rangeHelper.selectedRange())) {
			return;
		}

		node   = range.startContainer;
		offset = range.startOffset;

		if (offset !== 0 || !(parent = currentStyledBlockNode()) ||
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(parent, 'body')) {
			return;
		}

		while (node !== parent) {
			while (node.previousSibling) {
				node = node.previousSibling;

				// Everything but empty text nodes before the cursor
				// should prevent the style from being removed
				if (node.nodeType !== _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE || node.nodeValue) {
					return;
				}
			}

			if (!(node = node.parentNode)) {
				return;
			}
		}

		// The backspace was pressed at the start of
		// the container so clear the style
		base.clearBlockFormatting(parent);
		e.preventDefault();
	};

	/**
	 * Gets the first styled block node that contains the cursor
	 * @return {HTMLElement}
	 */
	currentStyledBlockNode = function () {
		var block = currentBlockNode;

		while (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(block) || _dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(block, true)) {
			if (!(block = block.parentNode) || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'body')) {
				return;
			}
		}

		return block;
	};

	/**
	 * Clears the formatting of the passed block element.
	 *
	 * If block is false, if will clear the styling of the first
	 * block level element that contains the cursor.
	 * @param  {HTMLElement} block
	 * @since 1.4.4
	 */
	base.clearBlockFormatting = function (block) {
		block = block || currentStyledBlockNode();

		if (!block || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'body')) {
			return base;
		}

		rangeHelper.saveRange();

		block.className = '';

		_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(block, 'style', '');

		if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'p,div,td')) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.convertElement(block, 'p');
		}

		rangeHelper.restoreRange();
		return base;
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
	triggerValueChanged = function (saveRange) {
		if (!pluginManager ||
			(!pluginManager.hasHandler('valuechangedEvent') &&
				!triggerValueChanged.hasHandler)) {
			return;
		}

		var	currentHtml,
			sourceMode   = base.sourceMode(),
			hasSelection = !sourceMode && rangeHelper.hasSelection();

		// Composition end isn't guaranteed to fire but must have
		// ended when triggerValueChanged() is called so reset it
		isComposing = false;

		// Don't need to save the range if sceditor-start-marker
		// is present as the range is already saved
		saveRange = saveRange !== false &&
			!wysiwygDocument.getElementById('sceditor-start-marker');

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

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(editorContainer, 'valuechanged', {
				rawValue: sourceMode ? base.val() : currentHtml
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
	valueChangedBlur = function () {
		if (valueChangedKeyUpTimer) {
			triggerValueChanged();
		}
	};

	/**
	 * Should be called whenever there is a keypress event
	 * @param  {Event} e The keypress event
	 * @private
	 */
	valueChangedKeyUp = function (e) {
		var which         = e.which,
			lastChar      = valueChangedKeyUp.lastChar,
			lastWasSpace  = (lastChar === 13 || lastChar === 32),
			lastWasDelete = (lastChar === 8 || lastChar === 46);

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

	handleComposition = function (e) {
		isComposing = /start/i.test(e.type);

		if (!isComposing) {
			triggerValueChanged();
		}
	};

	autoUpdate = function () {
		base.updateOriginal();
	};

	// run the initializer
	init();
}


/**
 * Map containing the loaded SCEditor locales
 * @type {Object}
 * @name locale
 * @memberOf sceditor
 */
SCEditor.locale = {};

SCEditor.formats = {};
SCEditor.icons = {};


/**
 * Static command helper class
 * @class command
 * @name sceditor.command
 */
SCEditor.command =
/** @lends sceditor.command */
{
	/**
	 * Gets a command
	 *
	 * @param {string} name
	 * @return {Object|null}
	 * @since v1.3.5
	 */
	get: function (name) {
		return _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name] || null;
	},

	/**
	 * <p>Adds a command to the editor or updates an existing
	 * command if a command with the specified name already exists.</p>
	 *
	 * <p>Once a command is add it can be included in the toolbar by
	 * adding it's name to the toolbar option in the constructor. It
	 * can also be executed manually by calling
	 * {@link sceditor.execCommand}</p>
	 *
	 * @example
	 * SCEditor.command.set("hello",
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
	set: function (name, cmd) {
		if (!name || !cmd) {
			return false;
		}

		// merge any existing command properties
		cmd = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(_defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name] || {}, cmd);

		cmd.remove = function () {
			SCEditor.command.remove(name);
		};

		_defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name] = cmd;
		return this;
	},

	/**
	 * Removes a command
	 *
	 * @param {string} name
	 * @return {this}
	 * @since v1.3.5
	 */
	remove: function (name) {
		if (_defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name]) {
			delete _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name];
		}

		return this;
	}
};


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
 * @memberOf jQuery.sceditor
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

/***/ "./src/lib/defaultCommands.js":
/*!************************************!*\
  !*** ./src/lib/defaultCommands.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");
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
		var node = editor.getBody();
		var next;

		while (node) {
			next = node;

			if (next.firstChild) {
				next = next.firstChild;
			} else {

				while (next && !next.nextSibling) {
					next = next.parentNode;
				}

				if (next) {
					next = next.nextSibling;
				}
			}

			if (node.nodeType === 3 && /[\n\r\t]+/.test(node.nodeValue)) {
				// Only remove if newlines are collapsed
				if (!/^pre/.test(_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node.parentNode, 'whiteSpace'))) {
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(node);
				}
			}

			node = next;
		}
	}
}


/**
 * Map of all the commands for SCEditor
 * @type {Object}
 * @name commands
 * @memberOf jQuery.sceditor
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
				var isLtr = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'ltr';
				var align = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'textAlign');

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
				var isLtr = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'ltr';
				var align = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'textAlign');

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
			var	content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'a', function (e) {
				callback(_dom_js__WEBPACK_IMPORTED_MODULE_0__.data(this, 'font'));
				editor.closeDropDown(true);
				e.preventDefault();
			});

			editor.opts.fonts.split(',').forEach(function (font) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('fontOpt', {
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
			var	content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'a', function (e) {
				callback(_dom_js__WEBPACK_IMPORTED_MODULE_0__.data(this, 'size'));
				editor.closeDropDown(true);
				e.preventDefault();
			});

			for (var i = 1; i <= 7; i++) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('sizeOpt', {
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
			var	content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
				html    = '',
				cmd     = defaultCmds.color;

			if (!cmd._htmlCache) {
				editor.opts.colors.split('|').forEach(function (column) {
					html += '<div class="sceditor-color-column">';

					column.split(',').forEach(function (color) {
						html +=
							'<a href="#" class="sceditor-color-option"' +
							' style="background-color: ' + color + '"' +
							' data-color="' + color + '"></a>';
					});

					html += '</div>';
				});

				cmd._htmlCache = html;
			}

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, _dom_js__WEBPACK_IMPORTED_MODULE_0__.parseHTML(cmd._htmlCache));

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'a', function (e) {
				callback(_dom_js__WEBPACK_IMPORTED_MODULE_0__.data(this, 'color'));
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
			var	val,
				content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
				editor  = this;

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('pastetext', {
				label: editor._(
					'Paste your text inside the following box:'
				),
				insert: editor._('Insert')
			}, true));

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				val = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#txt')[0].value;

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
			var	range, startParent, endParent;

			if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(firstBlock, 'li')) {
				return 0;
			}

			if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(firstBlock, 'ul,ol,menu')) {
				// if the whole list is selected, then this must be
				// invalidated because the browser will place a
				// <blockquote> there
				range = this.getRangeHelper().selectedRange();

				startParent = range.startContainer.parentNode;
				endParent   = range.endContainer.parentNode;

				// TODO: could use nodeType for this?
				// Maybe just check the firstBlock contains both the start
				//and end containers

				// Select the tag, not the textNode
				// (that's why the parentNode)
				if (startParent !==
					startParent.parentNode.firstElementChild ||
					// work around a bug in FF
					(_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(endParent, 'li') && endParent !==
						endParent.parentNode.lastElementChild)) {
					return 0;
				}
			}

			return -1;
		},
		exec: function () {
			var editor = this,
				block = editor.getRangeHelper().getFirstBlockParent();

			editor.focus();

			// An indent system is quite complicated as there are loads
			// of complications and issues around how to indent text
			// As default, let's just stay with indenting the lists,
			// at least, for now.
			if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(block, 'ul,ol,menu')) {
				editor.execCommand('indent');
			}
		},
		tooltip: 'Add indent'
	},
	// END_COMMAND
	// START_COMMAND: Outdent
	outdent: {
		state: function (parents, firstBlock) {
			return _dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(firstBlock, 'ul,ol,menu') ? 0 : -1;
		},
		exec: function () {
			var	block = this.getRangeHelper().getFirstBlockParent();
			if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(block, 'ul,ol,menu')) {
				this.execCommand('outdent');
			}
		},
		tooltip: 'Remove one indent'
	},
	// END_COMMAND

	// START_COMMAND: Table
	table: {
		exec: function (caller) {
			var	editor  = this,
				content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('table', {
				rows: editor._('Rows:'),
				cols: editor._('Cols:'),
				insert: editor._('Insert')
			}, true));

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				var	rows = Number(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#rows')[0].value),
					cols = Number(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#cols')[0].value),
					html = '<table>';

				if (rows > 0 && cols > 0) {
					html += Array(rows + 1).join(
						'<tr>' +
							Array(cols + 1).join(
								'<td><br /></td>'
							) +
						'</tr>'
					);

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
			this.wysiwygEditorInsertHtml(
				'<code>',
				'<br /></code>'
			);
		},
		tooltip: 'Code'
	},
	// END_COMMAND

	// START_COMMAND: Image
	image: {
		_dropDown: function (editor, caller, selected, cb) {
			var	content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('image', {
				url: editor._('URL:'),
				width: editor._('Width (optional):'),
				height: editor._('Height (optional):'),
				insert: editor._('Insert')
			}, true));


			var	urlInput = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#image')[0];

			urlInput.value = selected;

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				if (urlInput.value) {
					cb(
						urlInput.value,
						_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#width')[0].value,
						_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#height')[0].value
					);
				}

				editor.closeDropDown(true);
				e.preventDefault();
			});

			editor.createDropDown(caller, 'insertimage', content);
		},
		exec: function (caller) {
			var	editor  = this;

			defaultCmds.image._dropDown(
				editor,
				caller,
				'',
				function (url, width, height) {
					var attrs  = '';

					if (width) {
						attrs += ' width="' + parseInt(width, 10) + '"';
					}

					if (height) {
						attrs += ' height="' + parseInt(height, 10) + '"';
					}

					attrs += ' src="' + _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(url) + '"';

					editor.wysiwygEditorInsertHtml(
						'<img' + attrs + ' />'
					);
				}
			);
		},
		tooltip: 'Insert an image'
	},
	// END_COMMAND

	// START_COMMAND: E-mail
	email: {
		_dropDown: function (editor, caller, cb) {
			var	content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('email', {
				label: editor._('E-mail:'),
				desc: editor._('Description (optional):'),
				insert: editor._('Insert')
			}, true));

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				var email = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#email')[0].value;

				if (email) {
					cb(email, _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#des')[0].value);
				}

				editor.closeDropDown(true);
				e.preventDefault();
			});

			editor.createDropDown(caller, 'insertemail', content);
		},
		exec: function (caller) {
			var	editor  = this;

			defaultCmds.email._dropDown(
				editor,
				caller,
				function (email, text) {
					if (!editor.getRangeHelper().selectedHtml() || text) {
						editor.wysiwygEditorInsertHtml(
							'<a href="' +
							'mailto:' + _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(email) + '">' +
								_escape_js__WEBPACK_IMPORTED_MODULE_2__.entities((text || email)) +
							'</a>'
						);
					} else {
						editor.execCommand('createlink', 'mailto:' + email);
					}
				}
			);
		},
		tooltip: 'Insert an email'
	},
	// END_COMMAND

	// START_COMMAND: Link
	link: {
		_dropDown: function (editor, caller, cb) {
			var content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('link', {
				url: editor._('URL:'),
				desc: editor._('Description (optional):'),
				ins: editor._('Insert')
			}, true));

			var linkInput = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#link')[0];

			function insertUrl(e) {
				if (linkInput.value) {
					cb(linkInput.value, _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#des')[0].value);
				}

				editor.closeDropDown(true);
				e.preventDefault();
			}

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', insertUrl);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'keypress', function (e) {
				// 13 = enter key
				if (e.which === 13 && linkInput.value) {
					insertUrl(e);
				}
			}, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);

			editor.createDropDown(caller, 'insertlink', content);
		},
		exec: function (caller) {
			var editor = this;

			defaultCmds.link._dropDown(editor, caller, function (url, text) {
				if (text || !editor.getRangeHelper().selectedHtml()) {
					editor.wysiwygEditorInsertHtml(
						'<a href="' + _escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(url) + '">' +
							_escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(text || url) +
						'</a>'
					);
				} else {
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
			return _dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(this.currentNode(), 'a') ? 0 : -1;
		},
		exec: function () {
			var anchor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(this.currentNode(), 'a');

			if (anchor) {
				while (anchor.firstChild) {
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(anchor.firstChild, anchor);
				}

				_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(anchor);
			}
		},
		tooltip: 'Unlink'
	},
	// END_COMMAND


	// START_COMMAND: Quote
	quote: {
		exec: function (caller, html, author) {
			var	before = '<blockquote>',
				end    = '</blockquote>';

			// if there is HTML passed set end to null so any selected
			// text is replaced
			if (html) {
				author = (author ? '<cite>' +
					_escape_js__WEBPACK_IMPORTED_MODULE_2__.entities(author) +
				'</cite>' : '');
				before = before + author + html + end;
				end    = null;
			// if not add a newline to the end of the inserted quote
			} else if (this.getRangeHelper().selectedHtml() === '') {
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
				var	moreLink,
					opts            = editor.opts,
					emoticonsRoot   = opts.emoticonsRoot || '',
					emoticonsCompat = opts.emoticonsCompat,
					rangeHelper     = editor.getRangeHelper(),
					startSpace      = emoticonsCompat &&
						rangeHelper.getOuterText(true, 1) !== ' ' ? ' ' : '',
					endSpace        = emoticonsCompat &&
						rangeHelper.getOuterText(false, 1) !== ' ' ? ' ' : '',
					content         = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
					line            = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
					perLine         = 0,
					emoticons       = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(
						{},
						opts.emoticons.dropdown,
						includeMore ? opts.emoticons.more : {}
					);

				_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, line);

				perLine = Math.sqrt(Object.keys(emoticons).length);

				_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'img', function (e) {
					editor.insert(startSpace + _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this, 'alt') + endSpace,
						null, false).closeDropDown(true);

					e.preventDefault();
				});

				_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, function (code, emoticon) {
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(line, _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
						src: emoticonsRoot + (emoticon.url || emoticon),
						alt: code,
						title: emoticon.tooltip || code
					}));

					if (line.children.length >= perLine) {
						line = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');
						_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, line);
					}
				});

				if (!includeMore && opts.emoticons.more) {
					moreLink = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('a', {
						className: 'sceditor-more'
					});

					_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(moreLink,
						document.createTextNode(editor._('More')));

					_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(moreLink, 'click', function (e) {
						editor.createDropDown(
							caller, 'more-emoticons', createContent(true)
						);

						e.preventDefault();
					});

					_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, moreLink);
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
			var	content = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('youtubeMenu', {
				label: editor._('Video URL:'),
				insert: editor._('Insert')
			}, true));

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				var val = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(content, '#link')[0].value;
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
			var	now   = new Date(),
				year  = now.getYear(),
				month = now.getMonth() + 1,
				day   = now.getDate();

			if (year < 2000) {
				year = 1900 + year;
			}

			if (month < 10) {
				month = '0' + month;
			}

			if (day < 10) {
				day = '0' + day;
			}

			return editor.opts.dateFormat
				.replace(/year/i, year)
				.replace(/month/i, month)
				.replace(/day/i, day);
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
			var	now   = new Date(),
				hours = now.getHours(),
				mins  = now.getMinutes(),
				secs  = now.getSeconds();

			if (hours < 10) {
				hours = '0' + hours;
			}

			if (mins < 10) {
				mins = '0' + mins;
			}

			if (secs < 10) {
				secs = '0' + secs;
			}

			return hours + ':' + mins + ':' + secs;
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
			var	editor = this,
				rangeHelper = editor.getRangeHelper(),
				node = rangeHelper.getFirstBlockParent();

			editor.focus();

			if (!node || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
				editor.execCommand('formatBlock', 'p');

				node  = rangeHelper.getFirstBlockParent();

				if (!node || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
					return;
				}
			}

			var toggleValue = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'ltr' ? '' : 'ltr';
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction', toggleValue);
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
			var	editor = this,
				rangeHelper = editor.getRangeHelper(),
				node = rangeHelper.getFirstBlockParent();

			editor.focus();

			if (!node || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
				editor.execCommand('formatBlock', 'p');

				node = rangeHelper.getFirstBlockParent();

				if (!node || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
					return;
				}
			}

			var toggleValue = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction') === 'rtl' ? '' : 'rtl';
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'direction', toggleValue);
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
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");


/**
 * Default options for SCEditor
 * @type {Object}
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
	/** @lends jQuery.sceditor.defaultOptions */
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
	style: 'jquery.sceditor.default.css',

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
	locale: (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr)(document.documentElement, 'lang') || 'en',

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
	emoticonsEnabled: false,

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
	 * See SCEditor.BBCodeParser.defaults for list of valid options
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
});


/***/ }),

/***/ "./src/lib/dom.js":
/*!************************!*\
  !*** ./src/lib/dom.js ***!
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
var cssPropertyNameCache = {};

/**
 * Node type constant for element nodes
 *
 * @type {number}
 */
var ELEMENT_NODE = 1;

/**
 * Node type constant for text nodes
 *
 * @type {number}
 */
var TEXT_NODE = 3;

/**
 * Node type constant for comment nodes
 *
 * @type {number}
 */
var COMMENT_NODE = 8;

/**
 * Node type document nodes
 *
 * @type {number}
 */
var DOCUMENT_NODE = 9;

/**
 * Node type constant for document fragments
 *
 * @type {number}
 */
var DOCUMENT_FRAGMENT_NODE = 11;

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
	var node = (context || document).createElement(tag);

	_utils_js__WEBPACK_IMPORTED_MODULE_0__.each(attributes || {}, function (key, value) {
		if (key === 'style') {
			node.style.cssText = value;
		} else if (key in node) {
			node[key] = value;
		} else {
			node.setAttribute(key, value);
		}
	});

	return node;
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
	var parent = node || {};

	while ((parent = parent.parentNode) && !/(9|11)/.test(parent.nodeType)) {
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
	var parent = node || {};

	while ((parent = parent.parentNode) && !/(9|11)/.test(parent.nodeType)) {
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
	return is(node, selector) ? node : parent(node, selector);
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
 * @param {!HTMLElement} node
 * @param {!HTMLElement} child
 */
function appendChild(node, child) {
	node.appendChild(child);
}

/**
 * Finds any child nodes that match the selector
 *
 * @param {!HTMLElement} node
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
var EVENT_CAPTURE = true;

/**
 * For on() and off() if to add/remove the event
 * to the bubble phase
 *
 * @type {boolean}
 */
var EVENT_BUBBLE = false;

/**
 * Adds an event listener for the specified events.
 *
 * Events should be a space separated list of events.
 *
 * If selector is specified the handler will only be
 * called when the event target matches the selector.
 *
 * @param {!Node} node
 * @param {string} events
 * @param {string} [selector]
 * @param {function(Object)} fn
 * @param {boolean} [capture=false]
 * @see off()
 */
// eslint-disable-next-line max-params
function on(node, events, selector, fn, capture) {
	events.split(' ').forEach(function (event) {
		var handler;

		if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(selector)) {
			handler = fn['_sce-event-' + event + selector] || function (e) {
				var target = e.target;
				while (target && target !== node) {
					if (is(target, selector)) {
						fn.call(target, e);
						return;
					}

					target = target.parentNode;
				}
			};

			fn['_sce-event-' + event + selector] = handler;
		} else {
			handler = selector;
			capture = fn;
		}

		node.addEventListener(event, handler, capture || false);
	});
}

/**
 * Removes an event listener for the specified events.
 *
 * @param {!Node} node
 * @param {string} events
 * @param {string} [selector]
 * @param {function(Object)} fn
 * @param {boolean} [capture=false]
 * @see on()
 */
// eslint-disable-next-line max-params
function off(node, events, selector, fn, capture) {
	events.split(' ').forEach(function (event) {
		var handler;

		if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(selector)) {
			handler = fn['_sce-event-' + event + selector];
		} else {
			handler = selector;
			capture = fn;
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
 */
function attr(node, attr, value) {
	if (arguments.length < 3) {
		return node.getAttribute(attr);
	}

	// eslint-disable-next-line eqeqeq, no-eq-null
	if (value == null) {
		removeAttr(node, attr);
	} else {
		node.setAttribute(attr, value);
	}
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
 * @param {!HTMLElement} node
 * @param {!Object|string} rule
 * @param {string|number} [value]
 * @return {string|number|undefined}
 */
function css(node, rule, value) {
	if (arguments.length < 3) {
		if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(rule)) {
			return node.nodeType === 1 ? getComputedStyle(node)[rule] : null;
		}

		_utils_js__WEBPACK_IMPORTED_MODULE_0__.each(rule, function (key, value) {
			css(node, key, value);
		});
	} else {
		// isNaN returns false for null, false and empty strings
		// so need to check it's truthy or 0
		var isNumeric = (value || value === 0) && !isNaN(value);
		node.style[rule] = isNumeric ? value + 'px' : value;
	}
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
					data[attr.name.substr(5)] = attr.value;
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
 * @param {?HTMLElement} node
 * @param {string} selector
 * @returns {boolean}
 */
function is(node, selector) {
	var result = false;

	if (node && node.nodeType === ELEMENT_NODE) {
		result = (node.matches || node.msMatchesSelector ||
			node.webkitMatchesSelector).call(node, selector);
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
 * @param {Node} node
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
	return refNode.parentNode.insertBefore(node, refNode);
}

/**
 * @param {?HTMLElement} node
 * @returns {!Array.<string>}
 */
function classes(node) {
	return node.className.trim().split(/\s+/);
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
	} else {
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
function camelCase(string) {
	return string
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
function traverse(node, func, innermostFirst, siblingsOnly, reverse) {
	node = reverse ? node.lastChild : node.firstChild;

	while (node) {
		var next = reverse ? node.previousSibling : node.nextSibling;

		if (
			(!innermostFirst && func(node) === false) ||
			(!siblingsOnly && traverse(
				node, func, innermostFirst, siblingsOnly, reverse
			) === false) ||
			(innermostFirst && func(node) === false)
		) {
			return false;
		}

		node = next;
	}
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

	var	ret = context.createDocumentFragment();
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
 * @param  {HTMLElement} elm
 * @return {boolean}
 * @since 1.4.4
 */
function hasStyling(node) {
	return node && (!is(node, 'p,div') || node.className ||
		attr(node, 'style') || !_utils_js__WEBPACK_IMPORTED_MODULE_0__.isEmptyObject(data(node)));
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
		} catch (ex) { /* empty */ }
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
	if (!/11?|9/.test(node.nodeType)) {
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
 * @param {HTMLElement} elm
 * @param {boolean} [includeCodeAsBlock=false]
 * @return {boolean}
 */
function isInline(elm, includeCodeAsBlock) {
	var tagName,
		nodeType = (elm || {}).nodeType || TEXT_NODE;

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
	if (node.lastChild && isEmpty(node.lastChild)) {
		remove(node.lastChild);
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
		var list = 'ul,ol',
			isBlock = !isInline(node, true) && node.nodeType !== COMMENT_NODE,
			parent = node.parentNode;

		// Any blocklevel element inside an inline element needs fixing.
		// Also <p> tags that contain blocks should be fixed
		if (isBlock && (isInline(parent, true) || parent.tagName === 'P')) {
			// Find the last inline parent node
			var	lastInlineParent = node;
			while (isInline(lastInlineParent.parentNode, true) ||
				lastInlineParent.parentNode.tagName === 'P') {
				lastInlineParent = lastInlineParent.parentNode;
			}

			var before = extractContents(lastInlineParent, node);
			var middle = node;

			// Clone inline styling and apply it to the blocks children
			while (parent && isInline(parent, true)) {
				if (parent.nodeType === ELEMENT_NODE) {
					var clone = parent.cloneNode();
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
		if (isBlock && is(node, list) && is(node.parentNode, list)) {
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
function getSibling(node, previous) {
	if (!node) {
		return null;
	}

	return (previous ? node.previousSibling : node.nextSibling) ||
		getSibling(node.parentNode, previous);
}

/**
 * Removes unused whitespace from the root and all it's children.
 *
 * @param {!HTMLElement} root
 * @since 1.4.3
 */
function removeWhiteSpace(root) {
	var	nodeValue, nodeType, next, previous, previousSibling,
		nextNode, trimStart,
		cssWhiteSpace = css(root, 'whiteSpace'),
		// Preserve newlines if is pre-line
		preserveNewLines = /line$/i.test(cssWhiteSpace),
		node = root.firstChild;

	// Skip pre & pre-wrap with any vendor prefix
	if (/pre(-wrap)?$/i.test(cssWhiteSpace)) {
		return;
	}

	while (node) {
		nextNode  = node.nextSibling;
		nodeValue = node.nodeValue;
		nodeType  = node.nodeType;

		if (nodeType === ELEMENT_NODE && node.firstChild) {
			removeWhiteSpace(node);
		}

		if (nodeType === TEXT_NODE) {
			next      = getSibling(node);
			previous  = getSibling(node, true);
			trimStart = false;

			while (hasClass(previous, 'sceditor-ignore')) {
				previous = getSibling(previous, true);
			}

			// If previous sibling isn't inline or is a textnode that
			// ends in whitespace, time the start whitespace
			if (isInline(node) && previous) {
				previousSibling = previous;

				while (previousSibling.lastChild) {
					previousSibling = previousSibling.lastChild;

					// eslint-disable-next-line max-depth
					while (hasClass(previousSibling, 'sceditor-ignore')) {
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
	var	left = 0,
		top = 0;

	while (node) {
		left += node.offsetLeft;
		top  += node.offsetTop;
		node  = node.offsetParent;
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
	var	styleValue,
		elmStyle = elm.style;

	if (!cssPropertyNameCache[property]) {
		cssPropertyNameCache[property] = camelCase(property);
	}

	property   = cssPropertyNameCache[property];
	styleValue = elmStyle[property];

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
		var prop = nodeA.style[i];
		if (nodeA.style[prop] !== nodeB.style[prop]) {
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
		} else if (mergeTags.test(tagName)) {
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

/***/ "./src/lib/emoticons.js":
/*!******************************!*\
  !*** ./src/lib/emoticons.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkWhitespace: () => (/* binding */ checkWhitespace),
/* harmony export */   replace: () => (/* binding */ replace)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");
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
	var noneWsRegex = /[^\s\xA0\u2002\u2003\u2009]+/;
	var emoticons = node && _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(node, 'img[data-sceditor-emoticon]');

	if (!node || !emoticons.length) {
		return;
	}

	for (var i = 0; i < emoticons.length; i++) {
		var emoticon = emoticons[i];
		var parent = emoticon.parentNode;
		var prev = emoticon.previousSibling;
		var next = emoticon.nextSibling;

		if ((!prev || !noneWsRegex.test(prev.nodeValue.slice(-1))) &&
			(!next || !noneWsRegex.test((next.nodeValue || '')[0]))) {
			continue;
		}

		var range = rangeHelper.cloneSelected();
		var rangeStart = -1;
		var rangeStartContainer = range.startContainer;
		var previousText = (prev && prev.nodeValue) || '';

		previousText += _dom_js__WEBPACK_IMPORTED_MODULE_0__.data(emoticon, 'sceditor-emoticon');

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

		if (!next || next.nodeType !== _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE) {
			next = parent.insertBefore(
				parent.ownerDocument.createTextNode(''), next
			);
		}

		next.insertData(0, previousText);
		_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(emoticon);
		if (prev) {
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(prev);
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
	var	doc           = root.ownerDocument;
	var space         = '(^|\\s|\xA0|\u2002|\u2003|\u2009|$)';
	var emoticonCodes = [];
	var emoticonRegex = {};

	// TODO: Make this tag configurable.
	if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.parent(root, 'code')) {
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
			if (node.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE && !_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'code')) {
				convert(node);
			}

			if (node.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE) {
				for (var i = 0; i < emoticonCodes.length; i++) {
					var text  = node.nodeValue;
					var key   = emoticonCodes[i];
					var index = emoticonsCompat ?
						text.search(emoticonRegex[key]) :
						text.indexOf(key);

					if (index > -1) {
						// When emoticonsCompat is enabled this will be the
						// position after any white space
						var startIndex = text.indexOf(key, index);
						var fragment   = _dom_js__WEBPACK_IMPORTED_MODULE_0__.parseHTML(emoticons[key], doc);
						var after      = text.substr(startIndex + key.length);

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
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");
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

	toolbarButton: '<a class="sceditor-button sceditor-button-{name}" ' +
		'data-sceditor-command="{name}" unselectable="on">' +
		'<div unselectable="on">{dispName}</div></a>',

	emoticon: '<img src="{url}" data-sceditor-emoticon="{key}" ' +
		'alt="{key}" title="{tooltip}" />',

	fontOpt: '<a class="sceditor-font-option" href="#" ' +
		'data-font="{font}"><font face="{font}">{font}</font></a>',

	sizeOpt: '<a class="sceditor-fontsize-option" data-size="{size}" ' +
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
 * @returns {string|DocumentFragment}
 * @private
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, params, createHtml) {
	var template = _templates[name];

	Object.keys(params).forEach(function (name) {
		template = template.replace(
			new RegExp(_escape_js__WEBPACK_IMPORTED_MODULE_1__.regex('{' + name + '}'), 'g'), params[name]
		);
	});

	if (createHtml) {
		template = _dom_js__WEBPACK_IMPORTED_MODULE_0__.parseHTML(template);
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
	if (Array.isArray(obj) || 'length' in obj && isNumber(obj.length)) {
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
/* harmony import */ var _lib_SCEditor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/SCEditor.js */ "./src/lib/SCEditor.js");
/* harmony import */ var _lib_PluginManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/PluginManager.js */ "./src/lib/PluginManager.js");
/* harmony import */ var _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/escape.js */ "./src/lib/escape.js");
/* harmony import */ var _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/browser.js */ "./src/lib/browser.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/dom.js */ "./src/lib/dom.js");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/utils.js */ "./src/lib/utils.js");
/* harmony import */ var _lib_defaultCommands_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/defaultCommands.js */ "./src/lib/defaultCommands.js");
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _themes_office_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./themes/office.less */ "./src/themes/office.less");









window.sceditor = {
    command: _lib_SCEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].command,
    commands: _lib_defaultCommands_js__WEBPACK_IMPORTED_MODULE_6__["default"],
    defaultOptions: _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__["default"],
    ios: _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__.ios,
    isWysiwygSupported: _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__.isWysiwygSupported,
    regexEscape: _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__.regex,
    escapeEntities: _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__.entities,
    escapeUriScheme: _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__.uriScheme,
    dom: {
        css: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.css,
        attr: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.attr,
        removeAttr: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.removeAttr,
        is: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.is,
        closest: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.closest,
        width: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.width,
        height: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.height,
        traverse: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.traverse,
        rTraverse: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.rTraverse,
        parseHTML: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.parseHTML,
        hasStyling: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.hasStyling,
        convertElement: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.convertElement,
        blockLevelList: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.blockLevelList,
        canHaveChildren: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.canHaveChildren,
        isInline: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.isInline,
        copyCSS: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.copyCSS,
        fixNesting: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.fixNesting,
        findCommonAncestor: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.findCommonAncestor,
        getSibling: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.getSibling,
        removeWhiteSpace: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.removeWhiteSpace,
        extractContents: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.extractContents,
        getOffset: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.getOffset,
        getStyle: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.getStyle,
        hasStyle: _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.hasStyle
    },
    locale: _lib_SCEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].locale,
    icons: _lib_SCEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].icons,
    utils: {
        each: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.each,
        isEmptyObject: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.isEmptyObject,
        extend: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.extend
    },
    plugins: _lib_PluginManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].plugins,
    formats: _lib_SCEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].formats,
    create: function (textarea, options) {
        options = options || {};
        // Don't allow the editor to be initialised
        // on it's own source editor
        if (_lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.parent(textarea, '.sceditor-container')) {
            return;
        }
        if (options.runWithoutWysiwygSupport || _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__.isWysiwygSupported) {
            /*eslint no-new: off*/
            (new _lib_SCEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"](textarea, options));
        }
    },
    instance: function (textarea) {
        return textarea._sceditor;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0M7O0FBRS9DO0FBQ0E7QUFDQSw2Q0FBNkM7O0FBRTdDO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrREFBa0Q7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRFQUE0RTtBQUM1RSw0RUFBNEU7QUFDNUUsd0ZBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEYsMEVBQTBFO0FBQzFFLDBFQUEwRTtBQUMxRTtBQUNBLHVEQUF1RDtBQUN2RCx1REFBdUQ7QUFDdkQsc0VBQXNFO0FBQ3RFLHlFQUF5RTtBQUN6RSw0REFBNEQ7QUFDNUQsb0RBQW9EO0FBQ3BELDRDQUE0QztBQUM1Qyw4REFBOEQ7QUFDOUQsOERBQThEO0FBQzlELDRDQUE0QztBQUM1QyxpREFBaUQ7QUFDakQsZ0VBQWdFO0FBQ2hFLGlEQUFpRDtBQUNqRCx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RCwrQ0FBK0M7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EOztBQUVwRDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEMsdUNBQXVDOztBQUV2QztBQUNBLGdCQUFnQixTQUFTO0FBQ3pCLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFB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WDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDZDQUNSLFNBQVMsMkJBQTJCLDJEQUFlOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZDQUFZO0FBQ3ZDLFVBQVUsRUFBRSww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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLGdEQUFlLFFBQVEsZ0RBQWU7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFNBQVM7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtB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QTs7QUFFQTtBQUNBLEtBQUssdUNBQU07QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLDRDQUFXO0FBQ2pC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QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcDhCSzs7QUFFaEM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFNBQVMsNkNBQUk7O0FBRWI7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QUF3QixJQUFJLCtEQUEwQixFQUFFLENBQUM7WUFDcEUsc0JBQXNCO1lBQ3RCLENBQUMsSUFBSSx3REFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDRixDQUFDO0lBQ0QsUUFBUSxFQUFFLFVBQVUsUUFBYTtRQUNoQyxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDM0IsQ0FBQztDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9ub2RlX21vZHVsZXMvZG9tcHVyaWZ5L2Rpc3QvcHVyaWZ5LmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy90aGVtZXMvb2ZmaWNlLmxlc3M/MjFmYSIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL1BsdWdpbk1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9SYW5nZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL1NDRWRpdG9yLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2RlZmF1bHRDb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2RlZmF1bHRPcHRpb25zLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZG9tLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZW1vdGljb25zLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZXNjYXBlLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvdGVtcGxhdGVzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgQGxpY2Vuc2UgRE9NUHVyaWZ5IDMuMC45IHwgKGMpIEN1cmU1MyBhbmQgb3RoZXIgY29udHJpYnV0b3JzIHwgUmVsZWFzZWQgdW5kZXIgdGhlIEFwYWNoZSBsaWNlbnNlIDIuMCBhbmQgTW96aWxsYSBQdWJsaWMgTGljZW5zZSAyLjAgfCBnaXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvYmxvYi8zLjAuOS9MSUNFTlNFICovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbFRoaXMgOiBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLkRPTVB1cmlmeSA9IGZhY3RvcnkoKSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbiAgY29uc3Qge1xuICAgIGVudHJpZXMsXG4gICAgc2V0UHJvdG90eXBlT2YsXG4gICAgaXNGcm96ZW4sXG4gICAgZ2V0UHJvdG90eXBlT2YsXG4gICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yXG4gIH0gPSBPYmplY3Q7XG4gIGxldCB7XG4gICAgZnJlZXplLFxuICAgIHNlYWwsXG4gICAgY3JlYXRlXG4gIH0gPSBPYmplY3Q7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1xuICBsZXQge1xuICAgIGFwcGx5LFxuICAgIGNvbnN0cnVjdFxuICB9ID0gdHlwZW9mIFJlZmxlY3QgIT09ICd1bmRlZmluZWQnICYmIFJlZmxlY3Q7XG4gIGlmICghZnJlZXplKSB7XG4gICAgZnJlZXplID0gZnVuY3Rpb24gZnJlZXplKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFzZWFsKSB7XG4gICAgc2VhbCA9IGZ1bmN0aW9uIHNlYWwoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICBpZiAoIWFwcGx5KSB7XG4gICAgYXBwbHkgPSBmdW5jdGlvbiBhcHBseShmdW4sIHRoaXNWYWx1ZSwgYXJncykge1xuICAgICAgcmV0dXJuIGZ1bi5hcHBseSh0aGlzVmFsdWUsIGFyZ3MpO1xuICAgIH07XG4gIH1cbiAgaWYgKCFjb25zdHJ1Y3QpIHtcbiAgICBjb25zdHJ1Y3QgPSBmdW5jdGlvbiBjb25zdHJ1Y3QoRnVuYywgYXJncykge1xuICAgICAgcmV0dXJuIG5ldyBGdW5jKC4uLmFyZ3MpO1xuICAgIH07XG4gIH1cbiAgY29uc3QgYXJyYXlGb3JFYWNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUuZm9yRWFjaCk7XG4gIGNvbnN0IGFycmF5UG9wID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucG9wKTtcbiAgY29uc3QgYXJyYXlQdXNoID0gdW5hcHBseShBcnJheS5wcm90b3R5cGUucHVzaCk7XG4gIGNvbnN0IHN0cmluZ1RvTG93ZXJDYXNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlKTtcbiAgY29uc3Qgc3RyaW5nVG9TdHJpbmcgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudG9TdHJpbmcpO1xuICBjb25zdCBzdHJpbmdNYXRjaCA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5tYXRjaCk7XG4gIGNvbnN0IHN0cmluZ1JlcGxhY2UgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG4gIGNvbnN0IHN0cmluZ0luZGV4T2YgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZik7XG4gIGNvbnN0IHN0cmluZ1RyaW0gPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG4gIGNvbnN0IG9iamVjdEhhc093blByb3BlcnR5ID0gdW5hcHBseShPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiAgY29uc3QgcmVnRXhwVGVzdCA9IHVuYXBwbHkoUmVnRXhwLnByb3RvdHlwZS50ZXN0KTtcbiAgY29uc3QgdHlwZUVycm9yQ3JlYXRlID0gdW5jb25zdHJ1Y3QoVHlwZUVycm9yKTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIHRoaXNBcmcgYW5kIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCBjYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCB0aGlzQXJnIGFuZCBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB1bmFwcGx5KGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXNBcmcpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgYW5kIGNhbGxlZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IGNvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHVuY29uc3RydWN0KGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb25zdHJ1Y3QoZnVuYywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgcHJvcGVydGllcyB0byBhIGxvb2t1cCB0YWJsZVxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0IC0gVGhlIHNldCB0byB3aGljaCBlbGVtZW50cyB3aWxsIGJlIGFkZGVkLlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSBjb250YWluaW5nIGVsZW1lbnRzIHRvIGJlIGFkZGVkIHRvIHRoZSBzZXQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybUNhc2VGdW5jIC0gQW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gdHJhbnNmb3JtIHRoZSBjYXNlIG9mIGVhY2ggZWxlbWVudCBiZWZvcmUgYWRkaW5nIHRvIHRoZSBzZXQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBtb2RpZmllZCBzZXQgd2l0aCBhZGRlZCBlbGVtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIGFkZFRvU2V0KHNldCwgYXJyYXkpIHtcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHN0cmluZ1RvTG93ZXJDYXNlO1xuICAgIGlmIChzZXRQcm90b3R5cGVPZikge1xuICAgICAgLy8gTWFrZSAnaW4nIGFuZCB0cnV0aHkgY2hlY2tzIGxpa2UgQm9vbGVhbihzZXQuY29uc3RydWN0b3IpXG4gICAgICAvLyBpbmRlcGVuZGVudCBvZiBhbnkgcHJvcGVydGllcyBkZWZpbmVkIG9uIE9iamVjdC5wcm90b3R5cGUuXG4gICAgICAvLyBQcmV2ZW50IHByb3RvdHlwZSBzZXR0ZXJzIGZyb20gaW50ZXJjZXB0aW5nIHNldCBhcyBhIHRoaXMgdmFsdWUuXG4gICAgICBzZXRQcm90b3R5cGVPZihzZXQsIG51bGwpO1xuICAgIH1cbiAgICBsZXQgbCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IGFycmF5W2xdO1xuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBsY0VsZW1lbnQgPSB0cmFuc2Zvcm1DYXNlRnVuYyhlbGVtZW50KTtcbiAgICAgICAgaWYgKGxjRWxlbWVudCAhPT0gZWxlbWVudCkge1xuICAgICAgICAgIC8vIENvbmZpZyBwcmVzZXRzIChlLmcuIHRhZ3MuanMsIGF0dHJzLmpzKSBhcmUgaW1tdXRhYmxlLlxuICAgICAgICAgIGlmICghaXNGcm96ZW4oYXJyYXkpKSB7XG4gICAgICAgICAgICBhcnJheVtsXSA9IGxjRWxlbWVudDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxlbWVudCA9IGxjRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0W2VsZW1lbnRdID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiB1cCBhbiBhcnJheSB0byBoYXJkZW4gYWdhaW5zdCBDU1BQXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IHRvIGJlIGNsZWFuZWQuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gVGhlIGNsZWFuZWQgdmVyc2lvbiBvZiB0aGUgYXJyYXlcbiAgICovXG4gIGZ1bmN0aW9uIGNsZWFuQXJyYXkoYXJyYXkpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBpc1Byb3BlcnR5RXhpc3QgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShhcnJheSwgaW5kZXgpO1xuICAgICAgaWYgKCFpc1Byb3BlcnR5RXhpc3QpIHtcbiAgICAgICAgYXJyYXlbaW5kZXhdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgLyoqXG4gICAqIFNoYWxsb3cgY2xvbmUgYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGJlIGNsb25lZC5cbiAgICogQHJldHVybnMge09iamVjdH0gQSBuZXcgb2JqZWN0IHRoYXQgY29waWVzIHRoZSBvcmlnaW5hbC5cbiAgICovXG4gIGZ1bmN0aW9uIGNsb25lKG9iamVjdCkge1xuICAgIGNvbnN0IG5ld09iamVjdCA9IGNyZWF0ZShudWxsKTtcbiAgICBmb3IgKGNvbnN0IFtwcm9wZXJ0eSwgdmFsdWVdIG9mIGVudHJpZXMob2JqZWN0KSkge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSk7XG4gICAgICBpZiAoaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSBjbGVhbkFycmF5KHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xvbmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3T2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGF1dG9tYXRpY2FsbHkgY2hlY2tzIGlmIHRoZSBwcm9wIGlzIGZ1bmN0aW9uIG9yIGdldHRlciBhbmQgYmVoYXZlcyBhY2NvcmRpbmdseS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gbG9vayB1cCB0aGUgZ2V0dGVyIGZ1bmN0aW9uIGluIGl0cyBwcm90b3R5cGUgY2hhaW4uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIC0gVGhlIHByb3BlcnR5IG5hbWUgZm9yIHdoaWNoIHRvIGZpbmQgdGhlIGdldHRlciBmdW5jdGlvbi5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBUaGUgZ2V0dGVyIGZ1bmN0aW9uIGZvdW5kIGluIHRoZSBwcm90b3R5cGUgY2hhaW4gb3IgYSBmYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGxvb2t1cEdldHRlcihvYmplY3QsIHByb3ApIHtcbiAgICB3aGlsZSAob2JqZWN0ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkZXNjID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcCk7XG4gICAgICBpZiAoZGVzYykge1xuICAgICAgICBpZiAoZGVzYy5nZXQpIHtcbiAgICAgICAgICByZXR1cm4gdW5hcHBseShkZXNjLmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkZXNjLnZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IGdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZhbGxiYWNrVmFsdWUoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbGxiYWNrVmFsdWU7XG4gIH1cblxuICBjb25zdCBodG1sJDEgPSBmcmVlemUoWydhJywgJ2FiYnInLCAnYWNyb255bScsICdhZGRyZXNzJywgJ2FyZWEnLCAnYXJ0aWNsZScsICdhc2lkZScsICdhdWRpbycsICdiJywgJ2JkaScsICdiZG8nLCAnYmlnJywgJ2JsaW5rJywgJ2Jsb2NrcXVvdGUnLCAnYm9keScsICdicicsICdidXR0b24nLCAnY2FudmFzJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NpdGUnLCAnY29kZScsICdjb2wnLCAnY29sZ3JvdXAnLCAnY29udGVudCcsICdkYXRhJywgJ2RhdGFsaXN0JywgJ2RkJywgJ2RlY29yYXRvcicsICdkZWwnLCAnZGV0YWlscycsICdkZm4nLCAnZGlhbG9nJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZWxlbWVudCcsICdlbScsICdmaWVsZHNldCcsICdmaWdjYXB0aW9uJywgJ2ZpZ3VyZScsICdmb250JywgJ2Zvb3RlcicsICdmb3JtJywgJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ2hlYWQnLCAnaGVhZGVyJywgJ2hncm91cCcsICdocicsICdodG1sJywgJ2knLCAnaW1nJywgJ2lucHV0JywgJ2lucycsICdrYmQnLCAnbGFiZWwnLCAnbGVnZW5kJywgJ2xpJywgJ21haW4nLCAnbWFwJywgJ21hcmsnLCAnbWFycXVlZScsICdtZW51JywgJ21lbnVpdGVtJywgJ21ldGVyJywgJ25hdicsICdub2JyJywgJ29sJywgJ29wdGdyb3VwJywgJ29wdGlvbicsICdvdXRwdXQnLCAncCcsICdwaWN0dXJlJywgJ3ByZScsICdwcm9ncmVzcycsICdxJywgJ3JwJywgJ3J0JywgJ3J1YnknLCAncycsICdzYW1wJywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NoYWRvdycsICdzbWFsbCcsICdzb3VyY2UnLCAnc3BhY2VyJywgJ3NwYW4nLCAnc3RyaWtlJywgJ3N0cm9uZycsICdzdHlsZScsICdzdWInLCAnc3VtbWFyeScsICdzdXAnLCAndGFibGUnLCAndGJvZHknLCAndGQnLCAndGVtcGxhdGUnLCAndGV4dGFyZWEnLCAndGZvb3QnLCAndGgnLCAndGhlYWQnLCAndGltZScsICd0cicsICd0cmFjaycsICd0dCcsICd1JywgJ3VsJywgJ3ZhcicsICd2aWRlbycsICd3YnInXSk7XG5cbiAgLy8gU1ZHXG4gIGNvbnN0IHN2ZyQxID0gZnJlZXplKFsnc3ZnJywgJ2EnLCAnYWx0Z2x5cGgnLCAnYWx0Z2x5cGhkZWYnLCAnYWx0Z2x5cGhpdGVtJywgJ2FuaW1hdGVjb2xvcicsICdhbmltYXRlbW90aW9uJywgJ2FuaW1hdGV0cmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2NsaXBwYXRoJywgJ2RlZnMnLCAnZGVzYycsICdlbGxpcHNlJywgJ2ZpbHRlcicsICdmb250JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhyZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsICdsaW5lYXJncmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtcGF0aCcsICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxncmFkaWVudCcsICdyZWN0JywgJ3N0b3AnLCAnc3R5bGUnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRwYXRoJywgJ3RpdGxlJywgJ3RyZWYnLCAndHNwYW4nLCAndmlldycsICd2a2VybiddKTtcbiAgY29uc3Qgc3ZnRmlsdGVycyA9IGZyZWV6ZShbJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVEcm9wU2hhZG93JywgJ2ZlRmxvb2QnLCAnZmVGdW5jQScsICdmZUZ1bmNCJywgJ2ZlRnVuY0cnLCAnZmVGdW5jUicsICdmZUdhdXNzaWFuQmx1cicsICdmZUltYWdlJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZSddKTtcblxuICAvLyBMaXN0IG9mIFNWRyBlbGVtZW50cyB0aGF0IGFyZSBkaXNhbGxvd2VkIGJ5IGRlZmF1bHQuXG4gIC8vIFdlIHN0aWxsIG5lZWQgdG8ga25vdyB0aGVtIHNvIHRoYXQgd2UgY2FuIGRvIG5hbWVzcGFjZVxuICAvLyBjaGVja3MgcHJvcGVybHkgaW4gY2FzZSBvbmUgd2FudHMgdG8gYWRkIHRoZW0gdG9cbiAgLy8gYWxsb3ctbGlzdC5cbiAgY29uc3Qgc3ZnRGlzYWxsb3dlZCA9IGZyZWV6ZShbJ2FuaW1hdGUnLCAnY29sb3ItcHJvZmlsZScsICdjdXJzb3InLCAnZGlzY2FyZCcsICdmb250LWZhY2UnLCAnZm9udC1mYWNlLWZvcm1hdCcsICdmb250LWZhY2UtbmFtZScsICdmb250LWZhY2Utc3JjJywgJ2ZvbnQtZmFjZS11cmknLCAnZm9yZWlnbm9iamVjdCcsICdoYXRjaCcsICdoYXRjaHBhdGgnLCAnbWVzaCcsICdtZXNoZ3JhZGllbnQnLCAnbWVzaHBhdGNoJywgJ21lc2hyb3cnLCAnbWlzc2luZy1nbHlwaCcsICdzY3JpcHQnLCAnc2V0JywgJ3NvbGlkY29sb3InLCAndW5rbm93bicsICd1c2UnXSk7XG4gIGNvbnN0IG1hdGhNbCQxID0gZnJlZXplKFsnbWF0aCcsICdtZW5jbG9zZScsICdtZXJyb3InLCAnbWZlbmNlZCcsICdtZnJhYycsICdtZ2x5cGgnLCAnbWknLCAnbWxhYmVsZWR0cicsICdtbXVsdGlzY3JpcHRzJywgJ21uJywgJ21vJywgJ21vdmVyJywgJ21wYWRkZWQnLCAnbXBoYW50b20nLCAnbXJvb3QnLCAnbXJvdycsICdtcycsICdtc3BhY2UnLCAnbXNxcnQnLCAnbXN0eWxlJywgJ21zdWInLCAnbXN1cCcsICdtc3Vic3VwJywgJ210YWJsZScsICdtdGQnLCAnbXRleHQnLCAnbXRyJywgJ211bmRlcicsICdtdW5kZXJvdmVyJywgJ21wcmVzY3JpcHRzJ10pO1xuXG4gIC8vIFNpbWlsYXJseSB0byBTVkcsIHdlIHdhbnQgdG8ga25vdyBhbGwgTWF0aE1MIGVsZW1lbnRzLFxuICAvLyBldmVuIHRob3NlIHRoYXQgd2UgZGlzYWxsb3cgYnkgZGVmYXVsdC5cbiAgY29uc3QgbWF0aE1sRGlzYWxsb3dlZCA9IGZyZWV6ZShbJ21hY3Rpb24nLCAnbWFsaWduZ3JvdXAnLCAnbWFsaWdubWFyaycsICdtbG9uZ2RpdicsICdtc2NhcnJpZXMnLCAnbXNjYXJyeScsICdtc2dyb3VwJywgJ21zdGFjaycsICdtc2xpbmUnLCAnbXNyb3cnLCAnc2VtYW50aWNzJywgJ2Fubm90YXRpb24nLCAnYW5ub3RhdGlvbi14bWwnLCAnbXByZXNjcmlwdHMnLCAnbm9uZSddKTtcbiAgY29uc3QgdGV4dCA9IGZyZWV6ZShbJyN0ZXh0J10pO1xuXG4gIGNvbnN0IGh0bWwgPSBmcmVlemUoWydhY2NlcHQnLCAnYWN0aW9uJywgJ2FsaWduJywgJ2FsdCcsICdhdXRvY2FwaXRhbGl6ZScsICdhdXRvY29tcGxldGUnLCAnYXV0b3BpY3R1cmVpbnBpY3R1cmUnLCAnYXV0b3BsYXknLCAnYmFja2dyb3VuZCcsICdiZ2NvbG9yJywgJ2JvcmRlcicsICdjYXB0dXJlJywgJ2NlbGxwYWRkaW5nJywgJ2NlbGxzcGFjaW5nJywgJ2NoZWNrZWQnLCAnY2l0ZScsICdjbGFzcycsICdjbGVhcicsICdjb2xvcicsICdjb2xzJywgJ2NvbHNwYW4nLCAnY29udHJvbHMnLCAnY29udHJvbHNsaXN0JywgJ2Nvb3JkcycsICdjcm9zc29yaWdpbicsICdkYXRldGltZScsICdkZWNvZGluZycsICdkZWZhdWx0JywgJ2RpcicsICdkaXNhYmxlZCcsICdkaXNhYmxlcGljdHVyZWlucGljdHVyZScsICdkaXNhYmxlcmVtb3RlcGxheWJhY2snLCAnZG93bmxvYWQnLCAnZHJhZ2dhYmxlJywgJ2VuY3R5cGUnLCAnZW50ZXJrZXloaW50JywgJ2ZhY2UnLCAnZm9yJywgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZmxhbmcnLCAnaWQnLCAnaW5wdXRtb2RlJywgJ2ludGVncml0eScsICdpc21hcCcsICdraW5kJywgJ2xhYmVsJywgJ2xhbmcnLCAnbGlzdCcsICdsb2FkaW5nJywgJ2xvb3AnLCAnbG93JywgJ21heCcsICdtYXhsZW5ndGgnLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21pbicsICdtaW5sZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLCAnbmFtZScsICdub25jZScsICdub3NoYWRlJywgJ25vdmFsaWRhdGUnLCAnbm93cmFwJywgJ29wZW4nLCAnb3B0aW11bScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3BsYXlzaW5saW5lJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3B1YmRhdGUnLCAncmFkaW9ncm91cCcsICdyZWFkb25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2JywgJ3JldmVyc2VkJywgJ3JvbGUnLCAncm93cycsICdyb3dzcGFuJywgJ3NwZWxsY2hlY2snLCAnc2NvcGUnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NyY2xhbmcnLCAnc3RhcnQnLCAnc3JjJywgJ3NyY3NldCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLCAndGFiaW5kZXgnLCAndGl0bGUnLCAndHJhbnNsYXRlJywgJ3R5cGUnLCAndXNlbWFwJywgJ3ZhbGlnbicsICd2YWx1ZScsICd3aWR0aCcsICd4bWxucycsICdzbG90J10pO1xuICBjb25zdCBzdmcgPSBmcmVlemUoWydhY2NlbnQtaGVpZ2h0JywgJ2FjY3VtdWxhdGUnLCAnYWRkaXRpdmUnLCAnYWxpZ25tZW50LWJhc2VsaW5lJywgJ2FzY2VudCcsICdhdHRyaWJ1dGVuYW1lJywgJ2F0dHJpYnV0ZXR5cGUnLCAnYXppbXV0aCcsICdiYXNlZnJlcXVlbmN5JywgJ2Jhc2VsaW5lLXNoaWZ0JywgJ2JlZ2luJywgJ2JpYXMnLCAnYnknLCAnY2xhc3MnLCAnY2xpcCcsICdjbGlwcGF0aHVuaXRzJywgJ2NsaXAtcGF0aCcsICdjbGlwLXJ1bGUnLCAnY29sb3InLCAnY29sb3ItaW50ZXJwb2xhdGlvbicsICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnLCAnY29sb3ItcHJvZmlsZScsICdjb2xvci1yZW5kZXJpbmcnLCAnY3gnLCAnY3knLCAnZCcsICdkeCcsICdkeScsICdkaWZmdXNlY29uc3RhbnQnLCAnZGlyZWN0aW9uJywgJ2Rpc3BsYXknLCAnZGl2aXNvcicsICdkdXInLCAnZWRnZW1vZGUnLCAnZWxldmF0aW9uJywgJ2VuZCcsICdmaWxsJywgJ2ZpbGwtb3BhY2l0eScsICdmaWxsLXJ1bGUnLCAnZmlsdGVyJywgJ2ZpbHRlcnVuaXRzJywgJ2Zsb29kLWNvbG9yJywgJ2Zsb29kLW9wYWNpdHknLCAnZm9udC1mYW1pbHknLCAnZm9udC1zaXplJywgJ2ZvbnQtc2l6ZS1hZGp1c3QnLCAnZm9udC1zdHJldGNoJywgJ2ZvbnQtc3R5bGUnLCAnZm9udC12YXJpYW50JywgJ2ZvbnQtd2VpZ2h0JywgJ2Z4JywgJ2Z5JywgJ2cxJywgJ2cyJywgJ2dseXBoLW5hbWUnLCAnZ2x5cGhyZWYnLCAnZ3JhZGllbnR1bml0cycsICdncmFkaWVudHRyYW5zZm9ybScsICdoZWlnaHQnLCAnaHJlZicsICdpZCcsICdpbWFnZS1yZW5kZXJpbmcnLCAnaW4nLCAnaW4yJywgJ2snLCAnazEnLCAnazInLCAnazMnLCAnazQnLCAna2VybmluZycsICdrZXlwb2ludHMnLCAna2V5c3BsaW5lcycsICdrZXl0aW1lcycsICdsYW5nJywgJ2xlbmd0aGFkanVzdCcsICdsZXR0ZXItc3BhY2luZycsICdrZXJuZWxtYXRyaXgnLCAna2VybmVsdW5pdGxlbmd0aCcsICdsaWdodGluZy1jb2xvcicsICdsb2NhbCcsICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0JywgJ21hcmtlcmhlaWdodCcsICdtYXJrZXJ1bml0cycsICdtYXJrZXJ3aWR0aCcsICdtYXNrY29udGVudHVuaXRzJywgJ21hc2t1bml0cycsICdtYXgnLCAnbWFzaycsICdtZWRpYScsICdtZXRob2QnLCAnbW9kZScsICdtaW4nLCAnbmFtZScsICdudW1vY3RhdmVzJywgJ29mZnNldCcsICdvcGVyYXRvcicsICdvcGFjaXR5JywgJ29yZGVyJywgJ29yaWVudCcsICdvcmllbnRhdGlvbicsICdvcmlnaW4nLCAnb3ZlcmZsb3cnLCAncGFpbnQtb3JkZXInLCAncGF0aCcsICdwYXRobGVuZ3RoJywgJ3BhdHRlcm5jb250ZW50dW5pdHMnLCAncGF0dGVybnRyYW5zZm9ybScsICdwYXR0ZXJudW5pdHMnLCAncG9pbnRzJywgJ3ByZXNlcnZlYWxwaGEnLCAncHJlc2VydmVhc3BlY3RyYXRpbycsICdwcmltaXRpdmV1bml0cycsICdyJywgJ3J4JywgJ3J5JywgJ3JhZGl1cycsICdyZWZ4JywgJ3JlZnknLCAncmVwZWF0Y291bnQnLCAncmVwZWF0ZHVyJywgJ3Jlc3RhcnQnLCAncmVzdWx0JywgJ3JvdGF0ZScsICdzY2FsZScsICdzZWVkJywgJ3NoYXBlLXJlbmRlcmluZycsICdzcGVjdWxhcmNvbnN0YW50JywgJ3NwZWN1bGFyZXhwb25lbnQnLCAnc3ByZWFkbWV0aG9kJywgJ3N0YXJ0b2Zmc2V0JywgJ3N0ZGRldmlhdGlvbicsICdzdGl0Y2h0aWxlcycsICdzdG9wLWNvbG9yJywgJ3N0b3Atb3BhY2l0eScsICdzdHJva2UtZGFzaGFycmF5JywgJ3N0cm9rZS1kYXNob2Zmc2V0JywgJ3N0cm9rZS1saW5lY2FwJywgJ3N0cm9rZS1saW5lam9pbicsICdzdHJva2UtbWl0ZXJsaW1pdCcsICdzdHJva2Utb3BhY2l0eScsICdzdHJva2UnLCAnc3Ryb2tlLXdpZHRoJywgJ3N0eWxlJywgJ3N1cmZhY2VzY2FsZScsICdzeXN0ZW1sYW5ndWFnZScsICd0YWJpbmRleCcsICd0YXJnZXR4JywgJ3RhcmdldHknLCAndHJhbnNmb3JtJywgJ3RyYW5zZm9ybS1vcmlnaW4nLCAndGV4dC1hbmNob3InLCAndGV4dC1kZWNvcmF0aW9uJywgJ3RleHQtcmVuZGVyaW5nJywgJ3RleHRsZW5ndGgnLCAndHlwZScsICd1MScsICd1MicsICd1bmljb2RlJywgJ3ZhbHVlcycsICd2aWV3Ym94JywgJ3Zpc2liaWxpdHknLCAndmVyc2lvbicsICd2ZXJ0LWFkdi15JywgJ3ZlcnQtb3JpZ2luLXgnLCAndmVydC1vcmlnaW4teScsICd3aWR0aCcsICd3b3JkLXNwYWNpbmcnLCAnd3JhcCcsICd3cml0aW5nLW1vZGUnLCAneGNoYW5uZWxzZWxlY3RvcicsICd5Y2hhbm5lbHNlbGVjdG9yJywgJ3gnLCAneDEnLCAneDInLCAneG1sbnMnLCAneScsICd5MScsICd5MicsICd6JywgJ3pvb21hbmRwYW4nXSk7XG4gIGNvbnN0IG1hdGhNbCA9IGZyZWV6ZShbJ2FjY2VudCcsICdhY2NlbnR1bmRlcicsICdhbGlnbicsICdiZXZlbGxlZCcsICdjbG9zZScsICdjb2x1bW5zYWxpZ24nLCAnY29sdW1ubGluZXMnLCAnY29sdW1uc3BhbicsICdkZW5vbWFsaWduJywgJ2RlcHRoJywgJ2RpcicsICdkaXNwbGF5JywgJ2Rpc3BsYXlzdHlsZScsICdlbmNvZGluZycsICdmZW5jZScsICdmcmFtZScsICdoZWlnaHQnLCAnaHJlZicsICdpZCcsICdsYXJnZW9wJywgJ2xlbmd0aCcsICdsaW5ldGhpY2tuZXNzJywgJ2xzcGFjZScsICdscXVvdGUnLCAnbWF0aGJhY2tncm91bmQnLCAnbWF0aGNvbG9yJywgJ21hdGhzaXplJywgJ21hdGh2YXJpYW50JywgJ21heHNpemUnLCAnbWluc2l6ZScsICdtb3ZhYmxlbGltaXRzJywgJ25vdGF0aW9uJywgJ251bWFsaWduJywgJ29wZW4nLCAncm93YWxpZ24nLCAncm93bGluZXMnLCAncm93c3BhY2luZycsICdyb3dzcGFuJywgJ3JzcGFjZScsICdycXVvdGUnLCAnc2NyaXB0bGV2ZWwnLCAnc2NyaXB0bWluc2l6ZScsICdzY3JpcHRzaXplbXVsdGlwbGllcicsICdzZWxlY3Rpb24nLCAnc2VwYXJhdG9yJywgJ3NlcGFyYXRvcnMnLCAnc3RyZXRjaHknLCAnc3Vic2NyaXB0c2hpZnQnLCAnc3Vwc2NyaXB0c2hpZnQnLCAnc3ltbWV0cmljJywgJ3ZvZmZzZXQnLCAnd2lkdGgnLCAneG1sbnMnXSk7XG4gIGNvbnN0IHhtbCA9IGZyZWV6ZShbJ3hsaW5rOmhyZWYnLCAneG1sOmlkJywgJ3hsaW5rOnRpdGxlJywgJ3htbDpzcGFjZScsICd4bWxuczp4bGluayddKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9iZXR0ZXItcmVnZXhcbiAgY29uc3QgTVVTVEFDSEVfRVhQUiA9IHNlYWwoL1xce1xce1tcXHdcXFddKnxbXFx3XFxXXSpcXH1cXH0vZ20pOyAvLyBTcGVjaWZ5IHRlbXBsYXRlIGRldGVjdGlvbiByZWdleCBmb3IgU0FGRV9GT1JfVEVNUExBVEVTIG1vZGVcbiAgY29uc3QgRVJCX0VYUFIgPSBzZWFsKC88JVtcXHdcXFddKnxbXFx3XFxXXSolPi9nbSk7XG4gIGNvbnN0IFRNUExJVF9FWFBSID0gc2VhbCgvXFwke1tcXHdcXFddKn0vZ20pO1xuICBjb25zdCBEQVRBX0FUVFIgPSBzZWFsKC9eZGF0YS1bXFwtXFx3LlxcdTAwQjctXFx1RkZGRl0vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICBjb25zdCBBUklBX0FUVFIgPSBzZWFsKC9eYXJpYS1bXFwtXFx3XSskLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgSVNfQUxMT1dFRF9VUkkgPSBzZWFsKC9eKD86KD86KD86ZnxodCl0cHM/fG1haWx0b3x0ZWx8Y2FsbHRvfHNtc3xjaWR8eG1wcCk6fFteYS16XXxbYS16Ky5cXC1dKyg/OlteYS16Ky5cXC06XXwkKSkvaSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gICk7XG5cbiAgY29uc3QgSVNfU0NSSVBUX09SX0RBVEEgPSBzZWFsKC9eKD86XFx3K3NjcmlwdHxkYXRhKTovaSk7XG4gIGNvbnN0IEFUVFJfV0hJVEVTUEFDRSA9IHNlYWwoL1tcXHUwMDAwLVxcdTAwMjBcXHUwMEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwLVxcdTIwMjlcXHUyMDVGXFx1MzAwMF0vZyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbiAgKTtcblxuICBjb25zdCBET0NUWVBFX05BTUUgPSBzZWFsKC9eaHRtbCQvaSk7XG5cbiAgdmFyIEVYUFJFU1NJT05TID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBNVVNUQUNIRV9FWFBSOiBNVVNUQUNIRV9FWFBSLFxuICAgIEVSQl9FWFBSOiBFUkJfRVhQUixcbiAgICBUTVBMSVRfRVhQUjogVE1QTElUX0VYUFIsXG4gICAgREFUQV9BVFRSOiBEQVRBX0FUVFIsXG4gICAgQVJJQV9BVFRSOiBBUklBX0FUVFIsXG4gICAgSVNfQUxMT1dFRF9VUkk6IElTX0FMTE9XRURfVVJJLFxuICAgIElTX1NDUklQVF9PUl9EQVRBOiBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICBBVFRSX1dISVRFU1BBQ0U6IEFUVFJfV0hJVEVTUEFDRSxcbiAgICBET0NUWVBFX05BTUU6IERPQ1RZUEVfTkFNRVxuICB9KTtcblxuICBjb25zdCBnZXRHbG9iYWwgPSBmdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHdpbmRvdztcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5vLW9wIHBvbGljeSBmb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqIERvbid0IGV4cG9ydCB0aGlzIGZ1bmN0aW9uIG91dHNpZGUgdGhpcyBtb2R1bGUhXG4gICAqIEBwYXJhbSB7VHJ1c3RlZFR5cGVQb2xpY3lGYWN0b3J5fSB0cnVzdGVkVHlwZXMgVGhlIHBvbGljeSBmYWN0b3J5LlxuICAgKiBAcGFyYW0ge0hUTUxTY3JpcHRFbGVtZW50fSBwdXJpZnlIb3N0RWxlbWVudCBUaGUgU2NyaXB0IGVsZW1lbnQgdXNlZCB0byBsb2FkIERPTVB1cmlmeSAodG8gZGV0ZXJtaW5lIHBvbGljeSBuYW1lIHN1ZmZpeCkuXG4gICAqIEByZXR1cm4ge1RydXN0ZWRUeXBlUG9saWN5fSBUaGUgcG9saWN5IGNyZWF0ZWQgKG9yIG51bGwsIGlmIFRydXN0ZWQgVHlwZXNcbiAgICogYXJlIG5vdCBzdXBwb3J0ZWQgb3IgY3JlYXRpbmcgdGhlIHBvbGljeSBmYWlsZWQpLlxuICAgKi9cbiAgY29uc3QgX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSA9IGZ1bmN0aW9uIF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBwdXJpZnlIb3N0RWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgdHJ1c3RlZFR5cGVzICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQWxsb3cgdGhlIGNhbGxlcnMgdG8gY29udHJvbCB0aGUgdW5pcXVlIHBvbGljeSBuYW1lXG4gICAgLy8gYnkgYWRkaW5nIGEgZGF0YS10dC1wb2xpY3ktc3VmZml4IHRvIHRoZSBzY3JpcHQgZWxlbWVudCB3aXRoIHRoZSBET01QdXJpZnkuXG4gICAgLy8gUG9saWN5IGNyZWF0aW9uIHdpdGggZHVwbGljYXRlIG5hbWVzIHRocm93cyBpbiBUcnVzdGVkIFR5cGVzLlxuICAgIGxldCBzdWZmaXggPSBudWxsO1xuICAgIGNvbnN0IEFUVFJfTkFNRSA9ICdkYXRhLXR0LXBvbGljeS1zdWZmaXgnO1xuICAgIGlmIChwdXJpZnlIb3N0RWxlbWVudCAmJiBwdXJpZnlIb3N0RWxlbWVudC5oYXNBdHRyaWJ1dGUoQVRUUl9OQU1FKSkge1xuICAgICAgc3VmZml4ID0gcHVyaWZ5SG9zdEVsZW1lbnQuZ2V0QXR0cmlidXRlKEFUVFJfTkFNRSk7XG4gICAgfVxuICAgIGNvbnN0IHBvbGljeU5hbWUgPSAnZG9tcHVyaWZ5JyArIChzdWZmaXggPyAnIycgKyBzdWZmaXggOiAnJyk7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5KHBvbGljeU5hbWUsIHtcbiAgICAgICAgY3JlYXRlSFRNTChodG1sKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG4gICAgICAgIGNyZWF0ZVNjcmlwdFVSTChzY3JpcHRVcmwpIHtcbiAgICAgICAgICByZXR1cm4gc2NyaXB0VXJsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAvLyBQb2xpY3kgY3JlYXRpb24gZmFpbGVkIChtb3N0IGxpa2VseSBhbm90aGVyIERPTVB1cmlmeSBzY3JpcHQgaGFzXG4gICAgICAvLyBhbHJlYWR5IHJ1bikuIFNraXAgY3JlYXRpbmcgdGhlIHBvbGljeSwgYXMgdGhpcyB3aWxsIG9ubHkgY2F1c2UgZXJyb3JzXG4gICAgICAvLyBpZiBUVCBhcmUgZW5mb3JjZWQuXG4gICAgICBjb25zb2xlLndhcm4oJ1RydXN0ZWRUeXBlcyBwb2xpY3kgJyArIHBvbGljeU5hbWUgKyAnIGNvdWxkIG5vdCBiZSBjcmVhdGVkLicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9O1xuICBmdW5jdGlvbiBjcmVhdGVET01QdXJpZnkoKSB7XG4gICAgbGV0IHdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogZ2V0R2xvYmFsKCk7XG4gICAgY29uc3QgRE9NUHVyaWZ5ID0gcm9vdCA9PiBjcmVhdGVET01QdXJpZnkocm9vdCk7XG5cbiAgICAvKipcbiAgICAgKiBWZXJzaW9uIGxhYmVsLCBleHBvc2VkIGZvciBlYXNpZXIgY2hlY2tzXG4gICAgICogaWYgRE9NUHVyaWZ5IGlzIHVwIHRvIGRhdGUgb3Igbm90XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnZlcnNpb24gPSAnMy4wLjknO1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgZWxlbWVudHMgdGhhdCBET01QdXJpZnkgcmVtb3ZlZCBkdXJpbmcgc2FuaXRhdGlvbi5cbiAgICAgKiBFbXB0eSBpZiBub3RoaW5nIHdhcyByZW1vdmVkLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG4gICAgaWYgKCF3aW5kb3cgfHwgIXdpbmRvdy5kb2N1bWVudCB8fCB3aW5kb3cuZG9jdW1lbnQubm9kZVR5cGUgIT09IDkpIHtcbiAgICAgIC8vIE5vdCBydW5uaW5nIGluIGEgYnJvd3NlciwgcHJvdmlkZSBhIGZhY3RvcnkgZnVuY3Rpb25cbiAgICAgIC8vIHNvIHRoYXQgeW91IGNhbiBwYXNzIHlvdXIgb3duIFdpbmRvd1xuICAgICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICByZXR1cm4gRE9NUHVyaWZ5O1xuICAgIH1cbiAgICBsZXQge1xuICAgICAgZG9jdW1lbnRcbiAgICB9ID0gd2luZG93O1xuICAgIGNvbnN0IG9yaWdpbmFsRG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICBjb25zdCBjdXJyZW50U2NyaXB0ID0gb3JpZ2luYWxEb2N1bWVudC5jdXJyZW50U2NyaXB0O1xuICAgIGNvbnN0IHtcbiAgICAgIERvY3VtZW50RnJhZ21lbnQsXG4gICAgICBIVE1MVGVtcGxhdGVFbGVtZW50LFxuICAgICAgTm9kZSxcbiAgICAgIEVsZW1lbnQsXG4gICAgICBOb2RlRmlsdGVyLFxuICAgICAgTmFtZWROb2RlTWFwID0gd2luZG93Lk5hbWVkTm9kZU1hcCB8fCB3aW5kb3cuTW96TmFtZWRBdHRyTWFwLFxuICAgICAgSFRNTEZvcm1FbGVtZW50LFxuICAgICAgRE9NUGFyc2VyLFxuICAgICAgdHJ1c3RlZFR5cGVzXG4gICAgfSA9IHdpbmRvdztcbiAgICBjb25zdCBFbGVtZW50UHJvdG90eXBlID0gRWxlbWVudC5wcm90b3R5cGU7XG4gICAgY29uc3QgY2xvbmVOb2RlID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdjbG9uZU5vZGUnKTtcbiAgICBjb25zdCBnZXROZXh0U2libGluZyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnbmV4dFNpYmxpbmcnKTtcbiAgICBjb25zdCBnZXRDaGlsZE5vZGVzID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdjaGlsZE5vZGVzJyk7XG4gICAgY29uc3QgZ2V0UGFyZW50Tm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAncGFyZW50Tm9kZScpO1xuXG4gICAgLy8gQXMgcGVyIGlzc3VlICM0NywgdGhlIHdlYi1jb21wb25lbnRzIHJlZ2lzdHJ5IGlzIGluaGVyaXRlZCBieSBhXG4gICAgLy8gbmV3IGRvY3VtZW50IGNyZWF0ZWQgdmlhIGNyZWF0ZUhUTUxEb2N1bWVudC4gQXMgcGVyIHRoZSBzcGVjXG4gICAgLy8gKGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYmNvbXBvbmVudHMvc3BlYy9jdXN0b20vI2NyZWF0aW5nLWFuZC1wYXNzaW5nLXJlZ2lzdHJpZXMpXG4gICAgLy8gYSBuZXcgZW1wdHkgcmVnaXN0cnkgaXMgdXNlZCB3aGVuIGNyZWF0aW5nIGEgdGVtcGxhdGUgY29udGVudHMgb3duZXJcbiAgICAvLyBkb2N1bWVudCwgc28gd2UgdXNlIHRoYXQgYXMgb3VyIHBhcmVudCBkb2N1bWVudCB0byBlbnN1cmUgbm90aGluZ1xuICAgIC8vIGlzIGluaGVyaXRlZC5cbiAgICBpZiAodHlwZW9mIEhUTUxUZW1wbGF0ZUVsZW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICAgIGlmICh0ZW1wbGF0ZS5jb250ZW50ICYmIHRlbXBsYXRlLmNvbnRlbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgICBkb2N1bWVudCA9IHRlbXBsYXRlLmNvbnRlbnQub3duZXJEb2N1bWVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHRydXN0ZWRUeXBlc1BvbGljeTtcbiAgICBsZXQgZW1wdHlIVE1MID0gJyc7XG4gICAgY29uc3Qge1xuICAgICAgaW1wbGVtZW50YXRpb24sXG4gICAgICBjcmVhdGVOb2RlSXRlcmF0b3IsXG4gICAgICBjcmVhdGVEb2N1bWVudEZyYWdtZW50LFxuICAgICAgZ2V0RWxlbWVudHNCeVRhZ05hbWVcbiAgICB9ID0gZG9jdW1lbnQ7XG4gICAgY29uc3Qge1xuICAgICAgaW1wb3J0Tm9kZVxuICAgIH0gPSBvcmlnaW5hbERvY3VtZW50O1xuICAgIGxldCBob29rcyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogRXhwb3NlIHdoZXRoZXIgdGhpcyBicm93c2VyIHN1cHBvcnRzIHJ1bm5pbmcgdGhlIGZ1bGwgRE9NUHVyaWZ5LlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IHR5cGVvZiBlbnRyaWVzID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBnZXRQYXJlbnROb2RlID09PSAnZnVuY3Rpb24nICYmIGltcGxlbWVudGF0aW9uICYmIGltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCAhPT0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHtcbiAgICAgIE1VU1RBQ0hFX0VYUFIsXG4gICAgICBFUkJfRVhQUixcbiAgICAgIFRNUExJVF9FWFBSLFxuICAgICAgREFUQV9BVFRSLFxuICAgICAgQVJJQV9BVFRSLFxuICAgICAgSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgICBBVFRSX1dISVRFU1BBQ0VcbiAgICB9ID0gRVhQUkVTU0lPTlM7XG4gICAgbGV0IHtcbiAgICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSQxXG4gICAgfSA9IEVYUFJFU1NJT05TO1xuXG4gICAgLyoqXG4gICAgICogV2UgY29uc2lkZXIgdGhlIGVsZW1lbnRzIGFuZCBhdHRyaWJ1dGVzIGJlbG93IHRvIGJlIHNhZmUuIElkZWFsbHlcbiAgICAgKiBkb24ndCBhZGQgYW55IG5ldyBvbmVzIGJ1dCBmZWVsIGZyZWUgdG8gcmVtb3ZlIHVud2FudGVkIG9uZXMuXG4gICAgICovXG5cbiAgICAvKiBhbGxvd2VkIGVsZW1lbnQgbmFtZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCQxLCAuLi5zdmckMSwgLi4uc3ZnRmlsdGVycywgLi4ubWF0aE1sJDEsIC4uLnRleHRdKTtcblxuICAgIC8qIEFsbG93ZWQgYXR0cmlidXRlIG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfQVRUUiA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX0FUVFIgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwsIC4uLnN2ZywgLi4ubWF0aE1sLCAuLi54bWxdKTtcblxuICAgIC8qXG4gICAgICogQ29uZmlndXJlIGhvdyBET01QVXJpZnkgc2hvdWxkIGhhbmRsZSBjdXN0b20gZWxlbWVudHMgYW5kIHRoZWlyIGF0dHJpYnV0ZXMgYXMgd2VsbCBhcyBjdXN0b21pemVkIGJ1aWx0LWluIGVsZW1lbnRzLlxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IHRhZ05hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgY3VzdG9tIGVsZW1lbnRzKVxuICAgICAqIEBwcm9wZXJ0eSB7UmVnRXhwfEZ1bmN0aW9ufG51bGx9IGF0dHJpYnV0ZU5hbWVDaGVjayBvbmUgb2YgW251bGwsIHJlZ2V4UGF0dGVybiwgcHJlZGljYXRlXS4gRGVmYXVsdDogYG51bGxgIChkaXNhbGxvdyBhbnkgYXR0cmlidXRlcyBub3Qgb24gdGhlIGFsbG93IGxpc3QpXG4gICAgICogQHByb3BlcnR5IHtib29sZWFufSBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgYWxsb3cgY3VzdG9tIGVsZW1lbnRzIGRlcml2ZWQgZnJvbSBidWlsdC1pbnMgaWYgdGhleSBwYXNzIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjay4gRGVmYXVsdDogYGZhbHNlYC5cbiAgICAgKi9cbiAgICBsZXQgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgPSBPYmplY3Quc2VhbChjcmVhdGUobnVsbCwge1xuICAgICAgdGFnTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGF0dHJpYnV0ZU5hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgICAgfVxuICAgIH0pKTtcblxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIHRhZ3MgKG92ZXJyaWRlcyBBTExPV0VEX1RBR1MvQUREX1RBR1MpICovXG4gICAgbGV0IEZPUkJJRF9UQUdTID0gbnVsbDtcblxuICAgIC8qIEV4cGxpY2l0bHkgZm9yYmlkZGVuIGF0dHJpYnV0ZXMgKG92ZXJyaWRlcyBBTExPV0VEX0FUVFIvQUREX0FUVFIpICovXG4gICAgbGV0IEZPUkJJRF9BVFRSID0gbnVsbDtcblxuICAgIC8qIERlY2lkZSBpZiBBUklBIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfQVJJQV9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIERlY2lkZSBpZiBjdXN0b20gZGF0YSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX0RBVEFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgdW5rbm93biBwcm90b2NvbHMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBzZWxmLWNsb3NpbmcgdGFncyBpbiBhdHRyaWJ1dGVzIGFyZSBhbGxvd2VkLlxuICAgICAqIFVzdWFsbHkgcmVtb3ZlZCBkdWUgdG8gYSBtWFNTIGlzc3VlIGluIGpRdWVyeSAzLjAgKi9cbiAgICBsZXQgQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIE91dHB1dCBzaG91bGQgYmUgc2FmZSBmb3IgY29tbW9uIHRlbXBsYXRlIGVuZ2luZXMuXG4gICAgICogVGhpcyBtZWFucywgRE9NUHVyaWZ5IHJlbW92ZXMgZGF0YSBhdHRyaWJ1dGVzLCBtdXN0YWNoZXMgYW5kIEVSQlxuICAgICAqL1xuICAgIGxldCBTQUZFX0ZPUl9URU1QTEFURVMgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBkb2N1bWVudCB3aXRoIDxodG1sPi4uLiBzaG91bGQgYmUgcmV0dXJuZWQgKi9cbiAgICBsZXQgV0hPTEVfRE9DVU1FTlQgPSBmYWxzZTtcblxuICAgIC8qIFRyYWNrIHdoZXRoZXIgY29uZmlnIGlzIGFscmVhZHkgc2V0IG9uIHRoaXMgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5LiAqL1xuICAgIGxldCBTRVRfQ09ORklHID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYWxsIGVsZW1lbnRzIChlLmcuIHN0eWxlLCBzY3JpcHQpIG11c3QgYmUgY2hpbGRyZW4gb2ZcbiAgICAgKiBkb2N1bWVudC5ib2R5LiBCeSBkZWZhdWx0LCBicm93c2VycyBtaWdodCBtb3ZlIHRoZW0gdG8gZG9jdW1lbnQuaGVhZCAqL1xuICAgIGxldCBGT1JDRV9CT0RZID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYEhUTUxCb2R5RWxlbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAob3IgYSBUcnVzdGVkSFRNTCBvYmplY3QgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgc3VwcG9ydGVkKS5cbiAgICAgKiBJZiBgV0hPTEVfRE9DVU1FTlRgIGlzIGVuYWJsZWQgYSBgSFRNTEh0bWxFbGVtZW50YCB3aWxsIGJlIHJldHVybmVkIGluc3RlYWRcbiAgICAgKi9cbiAgICBsZXQgUkVUVVJOX0RPTSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBEb2N1bWVudEZyYWdtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXG4gICAgICogc3RyaW5nICAob3IgYSBUcnVzdGVkSFRNTCBvYmplY3QgaWYgVHJ1c3RlZCBUeXBlcyBhcmUgc3VwcG9ydGVkKSAqL1xuICAgIGxldCBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcnkgdG8gcmV0dXJuIGEgVHJ1c3RlZCBUeXBlIG9iamVjdCBpbnN0ZWFkIG9mIGEgc3RyaW5nLCByZXR1cm4gYSBzdHJpbmcgaW5cbiAgICAgKiBjYXNlIFRydXN0ZWQgVHlwZXMgYXJlIG5vdCBzdXBwb3J0ZWQgICovXG4gICAgbGV0IFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBmYWxzZTtcblxuICAgIC8qIE91dHB1dCBzaG91bGQgYmUgZnJlZSBmcm9tIERPTSBjbG9iYmVyaW5nIGF0dGFja3M/XG4gICAgICogVGhpcyBzYW5pdGl6ZXMgbWFya3VwcyBuYW1lZCB3aXRoIGNvbGxpZGluZywgY2xvYmJlcmFibGUgYnVpbHQtaW4gRE9NIEFQSXMuXG4gICAgICovXG4gICAgbGV0IFNBTklUSVpFX0RPTSA9IHRydWU7XG5cbiAgICAvKiBBY2hpZXZlIGZ1bGwgRE9NIENsb2JiZXJpbmcgcHJvdGVjdGlvbiBieSBpc29sYXRpbmcgdGhlIG5hbWVzcGFjZSBvZiBuYW1lZFxuICAgICAqIHByb3BlcnRpZXMgYW5kIEpTIHZhcmlhYmxlcywgbWl0aWdhdGluZyBhdHRhY2tzIHRoYXQgYWJ1c2UgdGhlIEhUTUwvRE9NIHNwZWMgcnVsZXMuXG4gICAgICpcbiAgICAgKiBIVE1ML0RPTSBzcGVjIHJ1bGVzIHRoYXQgZW5hYmxlIERPTSBDbG9iYmVyaW5nOlxuICAgICAqICAgLSBOYW1lZCBBY2Nlc3Mgb24gV2luZG93ICjCpzcuMy4zKVxuICAgICAqICAgLSBET00gVHJlZSBBY2Nlc3NvcnMgKMKnMy4xLjUpXG4gICAgICogICAtIEZvcm0gRWxlbWVudCBQYXJlbnQtQ2hpbGQgUmVsYXRpb25zICjCpzQuMTAuMylcbiAgICAgKiAgIC0gSWZyYW1lIHNyY2RvYyAvIE5lc3RlZCBXaW5kb3dQcm94aWVzICjCpzQuOC41KVxuICAgICAqICAgLSBIVE1MQ29sbGVjdGlvbiAowqc0LjIuMTAuMilcbiAgICAgKlxuICAgICAqIE5hbWVzcGFjZSBpc29sYXRpb24gaXMgaW1wbGVtZW50ZWQgYnkgcHJlZml4aW5nIGBpZGAgYW5kIGBuYW1lYCBhdHRyaWJ1dGVzXG4gICAgICogd2l0aCBhIGNvbnN0YW50IHN0cmluZywgaS5lLiwgYHVzZXItY29udGVudC1gXG4gICAgICovXG4gICAgbGV0IFNBTklUSVpFX05BTUVEX1BST1BTID0gZmFsc2U7XG4gICAgY29uc3QgU0FOSVRJWkVfTkFNRURfUFJPUFNfUFJFRklYID0gJ3VzZXItY29udGVudC0nO1xuXG4gICAgLyogS2VlcCBlbGVtZW50IGNvbnRlbnQgd2hlbiByZW1vdmluZyBlbGVtZW50PyAqL1xuICAgIGxldCBLRUVQX0NPTlRFTlQgPSB0cnVlO1xuXG4gICAgLyogSWYgYSBgTm9kZWAgaXMgcGFzc2VkIHRvIHNhbml0aXplKCksIHRoZW4gcGVyZm9ybXMgc2FuaXRpemF0aW9uIGluLXBsYWNlIGluc3RlYWRcbiAgICAgKiBvZiBpbXBvcnRpbmcgaXQgaW50byBhIG5ldyBEb2N1bWVudCBhbmQgcmV0dXJuaW5nIGEgc2FuaXRpemVkIGNvcHkgKi9cbiAgICBsZXQgSU5fUExBQ0UgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93IHVzYWdlIG9mIHByb2ZpbGVzIGxpa2UgaHRtbCwgc3ZnIGFuZCBtYXRoTWwgKi9cbiAgICBsZXQgVVNFX1BST0ZJTEVTID0ge307XG5cbiAgICAvKiBUYWdzIHRvIGlnbm9yZSBjb250ZW50IG9mIHdoZW4gS0VFUF9DT05URU5UIGlzIHRydWUgKi9cbiAgICBsZXQgRk9SQklEX0NPTlRFTlRTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0ZPUkJJRF9DT05URU5UUyA9IGFkZFRvU2V0KHt9LCBbJ2Fubm90YXRpb24teG1sJywgJ2F1ZGlvJywgJ2NvbGdyb3VwJywgJ2Rlc2MnLCAnZm9yZWlnbm9iamVjdCcsICdoZWFkJywgJ2lmcmFtZScsICdtYXRoJywgJ21pJywgJ21uJywgJ21vJywgJ21zJywgJ210ZXh0JywgJ25vZW1iZWQnLCAnbm9mcmFtZXMnLCAnbm9zY3JpcHQnLCAncGxhaW50ZXh0JywgJ3NjcmlwdCcsICdzdHlsZScsICdzdmcnLCAndGVtcGxhdGUnLCAndGhlYWQnLCAndGl0bGUnLCAndmlkZW8nLCAneG1wJ10pO1xuXG4gICAgLyogVGFncyB0aGF0IGFyZSBzYWZlIGZvciBkYXRhOiBVUklzICovXG4gICAgbGV0IERBVEFfVVJJX1RBR1MgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfREFUQV9VUklfVEFHUyA9IGFkZFRvU2V0KHt9LCBbJ2F1ZGlvJywgJ3ZpZGVvJywgJ2ltZycsICdzb3VyY2UnLCAnaW1hZ2UnLCAndHJhY2snXSk7XG5cbiAgICAvKiBBdHRyaWJ1dGVzIHNhZmUgZm9yIHZhbHVlcyBsaWtlIFwiamF2YXNjcmlwdDpcIiAqL1xuICAgIGxldCBVUklfU0FGRV9BVFRSSUJVVEVTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMgPSBhZGRUb1NldCh7fSwgWydhbHQnLCAnY2xhc3MnLCAnZm9yJywgJ2lkJywgJ2xhYmVsJywgJ25hbWUnLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdyb2xlJywgJ3N1bW1hcnknLCAndGl0bGUnLCAndmFsdWUnLCAnc3R5bGUnLCAneG1sbnMnXSk7XG4gICAgY29uc3QgTUFUSE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk4L01hdGgvTWF0aE1MJztcbiAgICBjb25zdCBTVkdfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgICBjb25zdCBIVE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcbiAgICAvKiBEb2N1bWVudCBuYW1lc3BhY2UgKi9cbiAgICBsZXQgTkFNRVNQQUNFID0gSFRNTF9OQU1FU1BBQ0U7XG4gICAgbGV0IElTX0VNUFRZX0lOUFVUID0gZmFsc2U7XG5cbiAgICAvKiBBbGxvd2VkIFhIVE1MK1hNTCBuYW1lc3BhY2VzICovXG4gICAgbGV0IEFMTE9XRURfTkFNRVNQQUNFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVMgPSBhZGRUb1NldCh7fSwgW01BVEhNTF9OQU1FU1BBQ0UsIFNWR19OQU1FU1BBQ0UsIEhUTUxfTkFNRVNQQUNFXSwgc3RyaW5nVG9TdHJpbmcpO1xuXG4gICAgLyogUGFyc2luZyBvZiBzdHJpY3QgWEhUTUwgZG9jdW1lbnRzICovXG4gICAgbGV0IFBBUlNFUl9NRURJQV9UWVBFID0gbnVsbDtcbiAgICBjb25zdCBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTID0gWydhcHBsaWNhdGlvbi94aHRtbCt4bWwnLCAndGV4dC9odG1sJ107XG4gICAgY29uc3QgREVGQVVMVF9QQVJTRVJfTUVESUFfVFlQRSA9ICd0ZXh0L2h0bWwnO1xuICAgIGxldCB0cmFuc2Zvcm1DYXNlRnVuYyA9IG51bGw7XG5cbiAgICAvKiBLZWVwIGEgcmVmZXJlbmNlIHRvIGNvbmZpZyB0byBwYXNzIHRvIGhvb2tzICovXG4gICAgbGV0IENPTkZJRyA9IG51bGw7XG5cbiAgICAvKiBJZGVhbGx5LCBkbyBub3QgdG91Y2ggYW55dGhpbmcgYmVsb3cgdGhpcyBsaW5lICovXG4gICAgLyogX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXyAqL1xuXG4gICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgY29uc3QgaXNSZWdleE9yRnVuY3Rpb24gPSBmdW5jdGlvbiBpc1JlZ2V4T3JGdW5jdGlvbih0ZXN0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgdGVzdFZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb247XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9wYXJzZUNvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBjZmcgb3B0aW9uYWwgY29uZmlnIGxpdGVyYWxcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIGNvbnN0IF9wYXJzZUNvbmZpZyA9IGZ1bmN0aW9uIF9wYXJzZUNvbmZpZygpIHtcbiAgICAgIGxldCBjZmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgaWYgKENPTkZJRyAmJiBDT05GSUcgPT09IGNmZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHRhbXBlcmluZyAqL1xuICAgICAgaWYgKCFjZmcgfHwgdHlwZW9mIGNmZyAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgY2ZnID0ge307XG4gICAgICB9XG5cbiAgICAgIC8qIFNoaWVsZCBjb25maWd1cmF0aW9uIG9iamVjdCBmcm9tIHByb3RvdHlwZSBwb2xsdXRpb24gKi9cbiAgICAgIGNmZyA9IGNsb25lKGNmZyk7XG4gICAgICBQQVJTRVJfTUVESUFfVFlQRSA9XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgIFNVUFBPUlRFRF9QQVJTRVJfTUVESUFfVFlQRVMuaW5kZXhPZihjZmcuUEFSU0VSX01FRElBX1RZUEUpID09PSAtMSA/IERFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUgOiBjZmcuUEFSU0VSX01FRElBX1RZUEU7XG5cbiAgICAgIC8vIEhUTUwgdGFncyBhbmQgYXR0cmlidXRlcyBhcmUgbm90IGNhc2Utc2Vuc2l0aXZlLCBjb252ZXJ0aW5nIHRvIGxvd2VyY2FzZS4gS2VlcGluZyBYSFRNTCBhcyBpcy5cbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jID0gUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnID8gc3RyaW5nVG9TdHJpbmcgOiBzdHJpbmdUb0xvd2VyQ2FzZTtcblxuICAgICAgLyogU2V0IGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgQUxMT1dFRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9UQUdTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX1RBR1M7XG4gICAgICBBTExPV0VEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX0FUVFInKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0FMTE9XRURfQVRUUjtcbiAgICAgIEFMTE9XRURfTkFNRVNQQUNFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfTkFNRVNQQUNFUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX05BTUVTUEFDRVMsIHN0cmluZ1RvU3RyaW5nKSA6IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTO1xuICAgICAgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9VUklfU0FGRV9BVFRSJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVMpLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfVVJJX1NBRkVfQVRUUixcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgOiBERUZBVUxUX1VSSV9TQUZFX0FUVFJJQlVURVM7XG4gICAgICBEQVRBX1VSSV9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUREX0RBVEFfVVJJX1RBR1MnKSA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfREFUQV9VUklfVEFHUyksXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgY2ZnLkFERF9EQVRBX1VSSV9UQUdTLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICA6IERFRkFVTFRfREFUQV9VUklfVEFHUztcbiAgICAgIEZPUkJJRF9DT05URU5UUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9DT05URU5UUycpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTO1xuICAgICAgRk9SQklEX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfVEFHUycpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XG4gICAgICBGT1JCSURfQVRUUiA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9BVFRSJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiB7fTtcbiAgICAgIFVTRV9QUk9GSUxFUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ1VTRV9QUk9GSUxFUycpID8gY2ZnLlVTRV9QUk9GSUxFUyA6IGZhbHNlO1xuICAgICAgQUxMT1dfQVJJQV9BVFRSID0gY2ZnLkFMTE9XX0FSSUFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfREFUQV9BVFRSID0gY2ZnLkFMTE9XX0RBVEFfQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgPSBjZmcuQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IGNmZy5BTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIFNBRkVfRk9SX1RFTVBMQVRFUyA9IGNmZy5TQUZFX0ZPUl9URU1QTEFURVMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFdIT0xFX0RPQ1VNRU5UID0gY2ZnLldIT0xFX0RPQ1VNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NID0gY2ZnLlJFVFVSTl9ET00gfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET01fRlJBR01FTlQgPSBjZmcuUkVUVVJOX0RPTV9GUkFHTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX1RSVVNURURfVFlQRSA9IGNmZy5SRVRVUk5fVFJVU1RFRF9UWVBFIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBGT1JDRV9CT0RZID0gY2ZnLkZPUkNFX0JPRFkgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFNBTklUSVpFX0RPTSA9IGNmZy5TQU5JVElaRV9ET00gIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIFNBTklUSVpFX05BTUVEX1BST1BTID0gY2ZnLlNBTklUSVpFX05BTUVEX1BST1BTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBLRUVQX0NPTlRFTlQgPSBjZmcuS0VFUF9DT05URU5UICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBJTl9QTEFDRSA9IGNmZy5JTl9QTEFDRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgSVNfQUxMT1dFRF9VUkkkMSA9IGNmZy5BTExPV0VEX1VSSV9SRUdFWFAgfHwgSVNfQUxMT1dFRF9VUkk7XG4gICAgICBOQU1FU1BBQ0UgPSBjZmcuTkFNRVNQQUNFIHx8IEhUTUxfTkFNRVNQQUNFO1xuICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgfHwge307XG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIGlzUmVnZXhPckZ1bmN0aW9uKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2spKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2s7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIGlzUmVnZXhPckZ1bmN0aW9uKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2spKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2s7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HICYmIHR5cGVvZiBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cztcbiAgICAgIH1cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgQUxMT1dfREFUQV9BVFRSID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICBSRVRVUk5fRE9NID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogUGFyc2UgcHJvZmlsZSBpbmZvICovXG4gICAgICBpZiAoVVNFX1BST0ZJTEVTKSB7XG4gICAgICAgIEFMTE9XRURfVEFHUyA9IGFkZFRvU2V0KHt9LCB0ZXh0KTtcbiAgICAgICAgQUxMT1dFRF9BVFRSID0gW107XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuaHRtbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgaHRtbCQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGh0bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmckMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBzdmcpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2Z0ZpbHRlcnMgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2Z0ZpbHRlcnMpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5tYXRoTWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIG1hdGhNbCQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIG1hdGhNbCk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIE1lcmdlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyAqL1xuICAgICAgaWYgKGNmZy5BRERfVEFHUykge1xuICAgICAgICBpZiAoQUxMT1dFRF9UQUdTID09PSBERUZBVUxUX0FMTE9XRURfVEFHUykge1xuICAgICAgICAgIEFMTE9XRURfVEFHUyA9IGNsb25lKEFMTE9XRURfVEFHUyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBjZmcuQUREX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQUREX0FUVFIpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfQVRUUiA9PT0gREVGQVVMVF9BTExPV0VEX0FUVFIpIHtcbiAgICAgICAgICBBTExPV0VEX0FUVFIgPSBjbG9uZShBTExPV0VEX0FUVFIpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgY2ZnLkFERF9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9VUklfU0FGRV9BVFRSKSB7XG4gICAgICAgIGFkZFRvU2V0KFVSSV9TQUZFX0FUVFJJQlVURVMsIGNmZy5BRERfVVJJX1NBRkVfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5GT1JCSURfQ09OVEVOVFMpIHtcbiAgICAgICAgaWYgKEZPUkJJRF9DT05URU5UUyA9PT0gREVGQVVMVF9GT1JCSURfQ09OVEVOVFMpIHtcbiAgICAgICAgICBGT1JCSURfQ09OVEVOVFMgPSBjbG9uZShGT1JCSURfQ09OVEVOVFMpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEZPUkJJRF9DT05URU5UUywgY2ZnLkZPUkJJRF9DT05URU5UUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgI3RleHQgaW4gY2FzZSBLRUVQX0NPTlRFTlQgaXMgc2V0IHRvIHRydWUgKi9cbiAgICAgIGlmIChLRUVQX0NPTlRFTlQpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTWycjdGV4dCddID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIGh0bWwsIGhlYWQgYW5kIGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgV0hPTEVfRE9DVU1FTlQgaXMgdHJ1ZSAqL1xuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWydodG1sJywgJ2hlYWQnLCAnYm9keSddKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkIHRib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIHRhYmxlcyBhcmUgcGVybWl0dGVkLCBzZWUgIzI4NiwgIzM2NSAqL1xuICAgICAgaWYgKEFMTE9XRURfVEFHUy50YWJsZSkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsndGJvZHknXSk7XG4gICAgICAgIGRlbGV0ZSBGT1JCSURfVEFHUy50Ym9keTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlSFRNTCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnVFJVU1RFRF9UWVBFU19QT0xJQ1kgY29uZmlndXJhdGlvbiBvcHRpb24gbXVzdCBwcm92aWRlIGEgXCJjcmVhdGVIVE1MXCIgaG9vay4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWS5jcmVhdGVTY3JpcHRVUkwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlU2NyaXB0VVJMXCIgaG9vay4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE92ZXJ3cml0ZSBleGlzdGluZyBUcnVzdGVkVHlwZXMgcG9saWN5LlxuICAgICAgICB0cnVzdGVkVHlwZXNQb2xpY3kgPSBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1k7XG5cbiAgICAgICAgLy8gU2lnbiBsb2NhbCB2YXJpYWJsZXMgcmVxdWlyZWQgYnkgYHNhbml0aXplYC5cbiAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVW5pbml0aWFsaXplZCBwb2xpY3ksIGF0dGVtcHQgdG8gaW5pdGlhbGl6ZSB0aGUgaW50ZXJuYWwgZG9tcHVyaWZ5IHBvbGljeS5cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSh0cnVzdGVkVHlwZXMsIGN1cnJlbnRTY3JpcHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgY3JlYXRpbmcgdGhlIGludGVybmFsIHBvbGljeSBzdWNjZWVkZWQgc2lnbiBpbnRlcm5hbCB2YXJpYWJsZXMuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgIT09IG51bGwgJiYgdHlwZW9mIGVtcHR5SFRNTCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUHJldmVudCBmdXJ0aGVyIG1hbmlwdWxhdGlvbiBvZiBjb25maWd1cmF0aW9uLlxuICAgICAgLy8gTm90IGF2YWlsYWJsZSBpbiBJRTgsIFNhZmFyaSA1LCBldGMuXG4gICAgICBpZiAoZnJlZXplKSB7XG4gICAgICAgIGZyZWV6ZShjZmcpO1xuICAgICAgfVxuICAgICAgQ09ORklHID0gY2ZnO1xuICAgIH07XG4gICAgY29uc3QgTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTID0gYWRkVG9TZXQoe30sIFsnbWknLCAnbW8nLCAnbW4nLCAnbXMnLCAnbXRleHQnXSk7XG4gICAgY29uc3QgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydmb3JlaWdub2JqZWN0JywgJ2Rlc2MnLCAndGl0bGUnLCAnYW5ub3RhdGlvbi14bWwnXSk7XG5cbiAgICAvLyBDZXJ0YWluIGVsZW1lbnRzIGFyZSBhbGxvd2VkIGluIGJvdGggU1ZHIGFuZCBIVE1MXG4gICAgLy8gbmFtZXNwYWNlLiBXZSBuZWVkIHRvIHNwZWNpZnkgdGhlbSBleHBsaWNpdGx5XG4gICAgLy8gc28gdGhhdCB0aGV5IGRvbid0IGdldCBlcnJvbmVvdXNseSBkZWxldGVkIGZyb21cbiAgICAvLyBIVE1MIG5hbWVzcGFjZS5cbiAgICBjb25zdCBDT01NT05fU1ZHX0FORF9IVE1MX0VMRU1FTlRTID0gYWRkVG9TZXQoe30sIFsndGl0bGUnLCAnc3R5bGUnLCAnZm9udCcsICdhJywgJ3NjcmlwdCddKTtcblxuICAgIC8qIEtlZXAgdHJhY2sgb2YgYWxsIHBvc3NpYmxlIFNWRyBhbmQgTWF0aE1MIHRhZ3NcbiAgICAgKiBzbyB0aGF0IHdlIGNhbiBwZXJmb3JtIHRoZSBuYW1lc3BhY2UgY2hlY2tzXG4gICAgICogY29ycmVjdGx5LiAqL1xuICAgIGNvbnN0IEFMTF9TVkdfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLnN2Z0Rpc2FsbG93ZWRdKTtcbiAgICBjb25zdCBBTExfTUFUSE1MX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLm1hdGhNbCQxLCAuLi5tYXRoTWxEaXNhbGxvd2VkXSk7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IGEgRE9NIGVsZW1lbnQgd2hvc2UgbmFtZXNwYWNlIGlzIGJlaW5nIGNoZWNrZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJuIGZhbHNlIGlmIHRoZSBlbGVtZW50IGhhcyBhXG4gICAgICogIG5hbWVzcGFjZSB0aGF0IGEgc3BlYy1jb21wbGlhbnQgcGFyc2VyIHdvdWxkIG5ldmVyXG4gICAgICogIHJldHVybi4gUmV0dXJuIHRydWUgb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGNvbnN0IF9jaGVja1ZhbGlkTmFtZXNwYWNlID0gZnVuY3Rpb24gX2NoZWNrVmFsaWROYW1lc3BhY2UoZWxlbWVudCkge1xuICAgICAgbGV0IHBhcmVudCA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgICAgIC8vIEluIEpTRE9NLCBpZiB3ZSdyZSBpbnNpZGUgc2hhZG93IERPTSwgdGhlbiBwYXJlbnROb2RlXG4gICAgICAvLyBjYW4gYmUgbnVsbC4gV2UganVzdCBzaW11bGF0ZSBwYXJlbnQgaW4gdGhpcyBjYXNlLlxuICAgICAgaWYgKCFwYXJlbnQgfHwgIXBhcmVudC50YWdOYW1lKSB7XG4gICAgICAgIHBhcmVudCA9IHtcbiAgICAgICAgICBuYW1lc3BhY2VVUkk6IE5BTUVTUEFDRSxcbiAgICAgICAgICB0YWdOYW1lOiAndGVtcGxhdGUnXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjb25zdCB0YWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UoZWxlbWVudC50YWdOYW1lKTtcbiAgICAgIGNvbnN0IHBhcmVudFRhZ05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShwYXJlbnQudGFnTmFtZSk7XG4gICAgICBpZiAoIUFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBIVE1MIG5hbWVzcGFjZSB0byBTVkdcbiAgICAgICAgLy8gaXMgdmlhIDxzdmc+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBNYXRoTUwgdG8gU1ZHIGlzIHZpYWBcbiAgICAgICAgLy8gc3ZnIGlmIHBhcmVudCBpcyBlaXRoZXIgPGFubm90YXRpb24teG1sPiBvciBNYXRoTUxcbiAgICAgICAgLy8gdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHMuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnICYmIChwYXJlbnRUYWdOYW1lID09PSAnYW5ub3RhdGlvbi14bWwnIHx8IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gU1ZHXG4gICAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gU1ZHIG5hbWVzcGFjZS5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX1NWR19UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gTWF0aE1MXG4gICAgICAgIC8vIGlzIHZpYSA8bWF0aD4uIElmIGl0IGhhcHBlbnMgdmlhIGFueSBvdGhlciB0YWcsIHRoZW5cbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGtpbGxlZC5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdtYXRoJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gTWF0aE1MIGlzIHZpYVxuICAgICAgICAvLyA8bWF0aD4gYW5kIEhUTUwgaW50ZWdyYXRpb24gcG9pbnRzXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdtYXRoJyAmJiBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBNYXRoTUxcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBNYXRoTUwgbmFtZXNwYWNlLlxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIEhUTUwgaXMgdmlhXG4gICAgICAgIC8vIEhUTUwgaW50ZWdyYXRpb24gcG9pbnRzLCBhbmQgZnJvbSBNYXRoTUwgdG8gSFRNTFxuICAgICAgICAvLyBpcyB2aWEgTWF0aE1MIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFICYmICFIVE1MX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSAmJiAhTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgZGlzYWxsb3cgdGFncyB0aGF0IGFyZSBzcGVjaWZpYyBmb3IgTWF0aE1MXG4gICAgICAgIC8vIG9yIFNWRyBhbmQgc2hvdWxkIG5ldmVyIGFwcGVhciBpbiBIVE1MIG5hbWVzcGFjZVxuICAgICAgICByZXR1cm4gIUFMTF9NQVRITUxfVEFHU1t0YWdOYW1lXSAmJiAoQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UU1t0YWdOYW1lXSB8fCAhQUxMX1NWR19UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIFhIVE1MIGFuZCBYTUwgZG9jdW1lbnRzIHRoYXQgc3VwcG9ydCBjdXN0b20gbmFtZXNwYWNlc1xuICAgICAgaWYgKFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyAmJiBBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29kZSBzaG91bGQgbmV2ZXIgcmVhY2ggdGhpcyBwbGFjZSAodGhpcyBtZWFuc1xuICAgICAgLy8gdGhhdCB0aGUgZWxlbWVudCBzb21laG93IGdvdCBuYW1lc3BhY2UgdGhhdCBpcyBub3RcbiAgICAgIC8vIEhUTUwsIFNWRywgTWF0aE1MIG9yIGFsbG93ZWQgdmlhIEFMTE9XRURfTkFNRVNQQUNFUykuXG4gICAgICAvLyBSZXR1cm4gZmFsc2UganVzdCBpbiBjYXNlLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfZm9yY2VSZW1vdmVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9mb3JjZVJlbW92ZSA9IGZ1bmN0aW9uIF9mb3JjZVJlbW92ZShub2RlKSB7XG4gICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgZWxlbWVudDogbm9kZVxuICAgICAgfSk7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtcmVtb3ZlXG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgbm9kZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3JlbW92ZUF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIGFuIEF0dHJpYnV0ZSBuYW1lXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX3JlbW92ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgbm9kZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgYXR0cmlidXRlOiBub2RlLmdldEF0dHJpYnV0ZU5vZGUobmFtZSksXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgYXR0cmlidXRlOiBudWxsLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcblxuICAgICAgLy8gV2Ugdm9pZCBhdHRyaWJ1dGUgdmFsdWVzIGZvciB1bnJlbW92YWJsZSBcImlzXCJcIiBhdHRyaWJ1dGVzXG4gICAgICBpZiAobmFtZSA9PT0gJ2lzJyAmJiAhQUxMT1dFRF9BVFRSW25hbWVdKSB7XG4gICAgICAgIGlmIChSRVRVUk5fRE9NIHx8IFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX2ZvcmNlUmVtb3ZlKG5vZGUpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pbml0RG9jdW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZGlydHkgYSBzdHJpbmcgb2YgZGlydHkgbWFya3VwXG4gICAgICogQHJldHVybiB7RG9jdW1lbnR9IGEgRE9NLCBmaWxsZWQgd2l0aCB0aGUgZGlydHkgbWFya3VwXG4gICAgICovXG4gICAgY29uc3QgX2luaXREb2N1bWVudCA9IGZ1bmN0aW9uIF9pbml0RG9jdW1lbnQoZGlydHkpIHtcbiAgICAgIC8qIENyZWF0ZSBhIEhUTUwgZG9jdW1lbnQgKi9cbiAgICAgIGxldCBkb2MgPSBudWxsO1xuICAgICAgbGV0IGxlYWRpbmdXaGl0ZXNwYWNlID0gbnVsbDtcbiAgICAgIGlmIChGT1JDRV9CT0RZKSB7XG4gICAgICAgIGRpcnR5ID0gJzxyZW1vdmU+PC9yZW1vdmU+JyArIGRpcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogSWYgRk9SQ0VfQk9EWSBpc24ndCB1c2VkLCBsZWFkaW5nIHdoaXRlc3BhY2UgbmVlZHMgdG8gYmUgcHJlc2VydmVkIG1hbnVhbGx5ICovXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBzdHJpbmdNYXRjaChkaXJ0eSwgL15bXFxyXFxuXFx0IF0rLyk7XG4gICAgICAgIGxlYWRpbmdXaGl0ZXNwYWNlID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzBdO1xuICAgICAgfVxuICAgICAgaWYgKFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyAmJiBOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFJvb3Qgb2YgWEhUTUwgZG9jIG11c3QgY29udGFpbiB4bWxucyBkZWNsYXJhdGlvbiAoc2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvbm9ybWF0aXZlLmh0bWwjc3RyaWN0KVxuICAgICAgICBkaXJ0eSA9ICc8aHRtbCB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIj48aGVhZD48L2hlYWQ+PGJvZHk+JyArIGRpcnR5ICsgJzwvYm9keT48L2h0bWw+JztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpcnR5UGF5bG9hZCA9IHRydXN0ZWRUeXBlc1BvbGljeSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgLypcbiAgICAgICAqIFVzZSB0aGUgRE9NUGFyc2VyIEFQSSBieSBkZWZhdWx0LCBmYWxsYmFjayBsYXRlciBpZiBuZWVkcyBiZVxuICAgICAgICogRE9NUGFyc2VyIG5vdCB3b3JrIGZvciBzdmcgd2hlbiBoYXMgbXVsdGlwbGUgcm9vdCBlbGVtZW50LlxuICAgICAgICovXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoZGlydHlQYXlsb2FkLCBQQVJTRVJfTUVESUFfVFlQRSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICB9XG5cbiAgICAgIC8qIFVzZSBjcmVhdGVIVE1MRG9jdW1lbnQgaW4gY2FzZSBET01QYXJzZXIgaXMgbm90IGF2YWlsYWJsZSAqL1xuICAgICAgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgZG9jID0gaW1wbGVtZW50YXRpb24uY3JlYXRlRG9jdW1lbnQoTkFNRVNQQUNFLCAndGVtcGxhdGUnLCBudWxsKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MuZG9jdW1lbnRFbGVtZW50LmlubmVySFRNTCA9IElTX0VNUFRZX0lOUFVUID8gZW1wdHlIVE1MIDogZGlydHlQYXlsb2FkO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgLy8gU3ludGF4IGVycm9yIGlmIGRpcnR5UGF5bG9hZCBpcyBpbnZhbGlkIHhtbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBib2R5ID0gZG9jLmJvZHkgfHwgZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgIGlmIChkaXJ0eSAmJiBsZWFkaW5nV2hpdGVzcGFjZSkge1xuICAgICAgICBib2R5Lmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsZWFkaW5nV2hpdGVzcGFjZSksIGJvZHkuY2hpbGROb2Rlc1swXSB8fCBudWxsKTtcbiAgICAgIH1cblxuICAgICAgLyogV29yayBvbiB3aG9sZSBkb2N1bWVudCBvciBqdXN0IGl0cyBib2R5ICovXG4gICAgICBpZiAoTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeVRhZ05hbWUuY2FsbChkb2MsIFdIT0xFX0RPQ1VNRU5UID8gJ2h0bWwnIDogJ2JvZHknKVswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBXSE9MRV9ET0NVTUVOVCA/IGRvYy5kb2N1bWVudEVsZW1lbnQgOiBib2R5O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgTm9kZUl0ZXJhdG9yIG9iamVjdCB0aGF0IHlvdSBjYW4gdXNlIHRvIHRyYXZlcnNlIGZpbHRlcmVkIGxpc3RzIG9mIG5vZGVzIG9yIGVsZW1lbnRzIGluIGEgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSByb290IFRoZSByb290IGVsZW1lbnQgb3Igbm9kZSB0byBzdGFydCB0cmF2ZXJzaW5nIG9uLlxuICAgICAqIEByZXR1cm4ge05vZGVJdGVyYXRvcn0gVGhlIGNyZWF0ZWQgTm9kZUl0ZXJhdG9yXG4gICAgICovXG4gICAgY29uc3QgX2NyZWF0ZU5vZGVJdGVyYXRvciA9IGZ1bmN0aW9uIF9jcmVhdGVOb2RlSXRlcmF0b3Iocm9vdCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vZGVJdGVyYXRvci5jYWxsKHJvb3Qub3duZXJEb2N1bWVudCB8fCByb290LCByb290LFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UIHwgTm9kZUZpbHRlci5TSE9XX0NPTU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfVEVYVCwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc0Nsb2JiZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gZWxtIGVsZW1lbnQgdG8gY2hlY2sgZm9yIGNsb2JiZXJpbmcgYXR0YWNrc1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgY2xvYmJlcmVkLCBmYWxzZSBpZiBzYWZlXG4gICAgICovXG4gICAgY29uc3QgX2lzQ2xvYmJlcmVkID0gZnVuY3Rpb24gX2lzQ2xvYmJlcmVkKGVsbSkge1xuICAgICAgcmV0dXJuIGVsbSBpbnN0YW5jZW9mIEhUTUxGb3JtRWxlbWVudCAmJiAodHlwZW9mIGVsbS5ub2RlTmFtZSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS50ZXh0Q29udGVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS5yZW1vdmVDaGlsZCAhPT0gJ2Z1bmN0aW9uJyB8fCAhKGVsbS5hdHRyaWJ1dGVzIGluc3RhbmNlb2YgTmFtZWROb2RlTWFwKSB8fCB0eXBlb2YgZWxtLnJlbW92ZUF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLnNldEF0dHJpYnV0ZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLm5hbWVzcGFjZVVSSSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsbS5pbnNlcnRCZWZvcmUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5oYXNDaGlsZE5vZGVzICE9PSAnZnVuY3Rpb24nKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBhIERPTSBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gb2JqZWN0IG9iamVjdCB0byBjaGVjayB3aGV0aGVyIGl0J3MgYSBET00gbm9kZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaXMgb2JqZWN0IGlzIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfaXNOb2RlID0gZnVuY3Rpb24gX2lzTm9kZShvYmplY3QpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgTm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmplY3QgaW5zdGFuY2VvZiBOb2RlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfZXhlY3V0ZUhvb2tcbiAgICAgKiBFeGVjdXRlIHVzZXIgY29uZmlndXJhYmxlIGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGVudHJ5UG9pbnQgIE5hbWUgb2YgdGhlIGhvb2sncyBlbnRyeSBwb2ludFxuICAgICAqIEBwYXJhbSAge05vZGV9IGN1cnJlbnROb2RlIG5vZGUgdG8gd29yayBvbiB3aXRoIHRoZSBob29rXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIGFkZGl0aW9uYWwgaG9vayBwYXJhbWV0ZXJzXG4gICAgICovXG4gICAgY29uc3QgX2V4ZWN1dGVIb29rID0gZnVuY3Rpb24gX2V4ZWN1dGVIb29rKGVudHJ5UG9pbnQsIGN1cnJlbnROb2RlLCBkYXRhKSB7XG4gICAgICBpZiAoIWhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFycmF5Rm9yRWFjaChob29rc1tlbnRyeVBvaW50XSwgaG9vayA9PiB7XG4gICAgICAgIGhvb2suY2FsbChET01QdXJpZnksIGN1cnJlbnROb2RlLCBkYXRhLCBDT05GSUcpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZUVsZW1lbnRzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgICAqIEBwcm90ZWN0IHRleHRDb250ZW50XG4gICAgICogQHByb3RlY3QgcmVtb3ZlQ2hpbGRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAgIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBjaGVjayBmb3IgcGVybWlzc2lvbiB0byBleGlzdFxuICAgICAqIEByZXR1cm4gIHtCb29sZWFufSB0cnVlIGlmIG5vZGUgd2FzIGtpbGxlZCwgZmFsc2UgaWYgbGVmdCBhbGl2ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUVsZW1lbnRzID0gZnVuY3Rpb24gX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpIHtcbiAgICAgIGxldCBjb250ZW50ID0gbnVsbDtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuXG4gICAgICAvKiBDaGVjayBpZiBlbGVtZW50IGlzIGNsb2JiZXJlZCBvciBjYW4gY2xvYmJlciAqL1xuICAgICAgaWYgKF9pc0Nsb2JiZXJlZChjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE5vdyBsZXQncyBjaGVjayB0aGUgZWxlbWVudCdzIHR5cGUgYW5kIG5hbWUgKi9cbiAgICAgIGNvbnN0IHRhZ05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIGN1cnJlbnROb2RlLCB7XG4gICAgICAgIHRhZ05hbWUsXG4gICAgICAgIGFsbG93ZWRUYWdzOiBBTExPV0VEX1RBR1NcbiAgICAgIH0pO1xuXG4gICAgICAvKiBEZXRlY3QgbVhTUyBhdHRlbXB0cyBhYnVzaW5nIG5hbWVzcGFjZSBjb25mdXNpb24gKi9cbiAgICAgIGlmIChjdXJyZW50Tm9kZS5oYXNDaGlsZE5vZGVzKCkgJiYgIV9pc05vZGUoY3VycmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpICYmIHJlZ0V4cFRlc3QoLzxbL1xcd10vZywgY3VycmVudE5vZGUuaW5uZXJIVE1MKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLnRleHRDb250ZW50KSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGVsZW1lbnQgaWYgYW55dGhpbmcgZm9yYmlkcyBpdHMgcHJlc2VuY2UgKi9cbiAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYSBjdXN0b20gZWxlbWVudCB0byBoYW5kbGUgKi9cbiAgICAgICAgaWYgKCFGT1JCSURfVEFHU1t0YWdOYW1lXSAmJiBfaXNCYXNpY0N1c3RvbUVsZW1lbnQodGFnTmFtZSkpIHtcbiAgICAgICAgICBpZiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCB0YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKHRhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogS2VlcCBjb250ZW50IGV4Y2VwdCBmb3IgYmFkLWxpc3RlZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoS0VFUF9DT05URU5UICYmICFGT1JCSURfQ09OVEVOVFNbdGFnTmFtZV0pIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICBjb25zdCBjaGlsZE5vZGVzID0gZ2V0Q2hpbGROb2RlcyhjdXJyZW50Tm9kZSkgfHwgY3VycmVudE5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgICBpZiAoY2hpbGROb2RlcyAmJiBwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZENvdW50ID0gY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY2hpbGRDb3VudCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTm9kZShjaGlsZE5vZGVzW2ldLCB0cnVlKSwgZ2V0TmV4dFNpYmxpbmcoY3VycmVudE5vZGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIENoZWNrIHdoZXRoZXIgZWxlbWVudCBoYXMgYSB2YWxpZCBuYW1lc3BhY2UgKi9cbiAgICAgIGlmIChjdXJyZW50Tm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgIV9jaGVja1ZhbGlkTmFtZXNwYWNlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogTWFrZSBzdXJlIHRoYXQgb2xkZXIgYnJvd3NlcnMgZG9uJ3QgZ2V0IGZhbGxiYWNrLXRhZyBtWFNTICovXG4gICAgICBpZiAoKHRhZ05hbWUgPT09ICdub3NjcmlwdCcgfHwgdGFnTmFtZSA9PT0gJ25vZW1iZWQnIHx8IHRhZ05hbWUgPT09ICdub2ZyYW1lcycpICYmIHJlZ0V4cFRlc3QoLzxcXC9ubyhzY3JpcHR8ZW1iZWR8ZnJhbWVzKS9pLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBlbGVtZW50IGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUyAmJiBjdXJyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAvKiBHZXQgdGhlIGVsZW1lbnQncyB0ZXh0IGNvbnRlbnQgKi9cbiAgICAgICAgY29udGVudCA9IGN1cnJlbnROb2RlLnRleHRDb250ZW50O1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIGNvbnRlbnQgPSBzdHJpbmdSZXBsYWNlKGNvbnRlbnQsIGV4cHIsICcgJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUudGV4dENvbnRlbnQgIT09IGNvbnRlbnQpIHtcbiAgICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGN1cnJlbnROb2RlLmNsb25lTm9kZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY3VycmVudE5vZGUudGV4dENvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUVsZW1lbnRzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY1RhZyBMb3dlcmNhc2UgdGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNOYW1lIExvd2VyY2FzZSBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgY29uc3QgX2lzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkge1xuICAgICAgLyogTWFrZSBzdXJlIGF0dHJpYnV0ZSBjYW5ub3QgY2xvYmJlciAqL1xuICAgICAgaWYgKFNBTklUSVpFX0RPTSAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSAmJiAodmFsdWUgaW4gZG9jdW1lbnQgfHwgdmFsdWUgaW4gZm9ybUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLyogQWxsb3cgdmFsaWQgZGF0YS0qIGF0dHJpYnV0ZXM6IEF0IGxlYXN0IG9uZSBjaGFyYWN0ZXIgYWZ0ZXIgXCItXCJcbiAgICAgICAgICAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvZG9tLmh0bWwjZW1iZWRkaW5nLWN1c3RvbS1ub24tdmlzaWJsZS1kYXRhLXdpdGgtdGhlLWRhdGEtKi1hdHRyaWJ1dGVzKVxuICAgICAgICAgIFhNTC1jb21wYXRpYmxlIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI3htbC1jb21wYXRpYmxlIGFuZCBodHRwOi8vd3d3LnczLm9yZy9UUi94bWwvI2QwZTgwNClcbiAgICAgICAgICBXZSBkb24ndCBuZWVkIHRvIGNoZWNrIHRoZSB2YWx1ZTsgaXQncyBhbHdheXMgVVJJIHNhZmUuICovXG4gICAgICBpZiAoQUxMT1dfREFUQV9BVFRSICYmICFGT1JCSURfQVRUUltsY05hbWVdICYmIHJlZ0V4cFRlc3QoREFUQV9BVFRSLCBsY05hbWUpKSA7IGVsc2UgaWYgKEFMTE9XX0FSSUFfQVRUUiAmJiByZWdFeHBUZXN0KEFSSUFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmICghQUxMT1dFRF9BVFRSW2xjTmFtZV0gfHwgRk9SQklEX0FUVFJbbGNOYW1lXSkge1xuICAgICAgICBpZiAoXG4gICAgICAgIC8vIEZpcnN0IGNvbmRpdGlvbiBkb2VzIGEgdmVyeSBiYXNpYyBjaGVjayBpZiBhKSBpdCdzIGJhc2ljYWxseSBhIHZhbGlkIGN1c3RvbSBlbGVtZW50IHRhZ25hbWUgQU5EXG4gICAgICAgIC8vIGIpIGlmIHRoZSB0YWdOYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIC8vIGFuZCBjKSBpZiB0aGUgYXR0cmlidXRlIG5hbWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2tcbiAgICAgICAgX2lzQmFzaWNDdXN0b21FbGVtZW50KGxjVGFnKSAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCBsY1RhZykgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKGxjVGFnKSkgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaywgbGNOYW1lKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sobGNOYW1lKSkgfHxcbiAgICAgICAgLy8gQWx0ZXJuYXRpdmUsIHNlY29uZCBjb25kaXRpb24gY2hlY2tzIGlmIGl0J3MgYW4gYGlzYC1hdHRyaWJ1dGUsIEFORFxuICAgICAgICAvLyB0aGUgdmFsdWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2tcbiAgICAgICAgbGNOYW1lID09PSAnaXMnICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLCB2YWx1ZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKHZhbHVlKSkpIDsgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qIENoZWNrIHZhbHVlIGlzIHNhZmUuIEZpcnN0LCBpcyBhdHRyIGluZXJ0PyBJZiBzbywgaXMgc2FmZSAqL1xuICAgICAgfSBlbHNlIGlmIChVUklfU0FGRV9BVFRSSUJVVEVTW2xjTmFtZV0pIDsgZWxzZSBpZiAocmVnRXhwVGVzdChJU19BTExPV0VEX1VSSSQxLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSkpIDsgZWxzZSBpZiAoKGxjTmFtZSA9PT0gJ3NyYycgfHwgbGNOYW1lID09PSAneGxpbms6aHJlZicgfHwgbGNOYW1lID09PSAnaHJlZicpICYmIGxjVGFnICE9PSAnc2NyaXB0JyAmJiBzdHJpbmdJbmRleE9mKHZhbHVlLCAnZGF0YTonKSA9PT0gMCAmJiBEQVRBX1VSSV9UQUdTW2xjVGFnXSkgOyBlbHNlIGlmIChBTExPV19VTktOT1dOX1BST1RPQ09MUyAmJiAhcmVnRXhwVGVzdChJU19TQ1JJUFRfT1JfREFUQSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpKSA7IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSA7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQmFzaWNDdXN0b21FbGVtZW50XG4gICAgICogY2hlY2tzIGlmIGF0IGxlYXN0IG9uZSBkYXNoIGlzIGluY2x1ZGVkIGluIHRhZ05hbWUsIGFuZCBpdCdzIG5vdCB0aGUgZmlyc3QgY2hhclxuICAgICAqIGZvciBtb3JlIHNvcGhpc3RpY2F0ZWQgY2hlY2tpbmcgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvdmFsaWRhdGUtZWxlbWVudC1uYW1lXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFnTmFtZSBuYW1lIG9mIHRoZSB0YWcgb2YgdGhlIG5vZGUgdG8gc2FuaXRpemVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgbmFtZSBtZWV0cyB0aGUgYmFzaWMgY3JpdGVyaWEgZm9yIGEgY3VzdG9tIGVsZW1lbnQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfaXNCYXNpY0N1c3RvbUVsZW1lbnQgPSBmdW5jdGlvbiBfaXNCYXNpY0N1c3RvbUVsZW1lbnQodGFnTmFtZSkge1xuICAgICAgcmV0dXJuIHRhZ05hbWUgIT09ICdhbm5vdGF0aW9uLXhtbCcgJiYgdGFnTmFtZS5pbmRleE9mKCctJykgPiAwO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVBdHRyaWJ1dGVzXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdCBhdHRyaWJ1dGVzXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVBdHRyaWJ1dGVcbiAgICAgKiBAcHJvdGVjdCBzZXRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGN1cnJlbnROb2RlIHRvIHNhbml0aXplXG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplQXR0cmlidXRlcyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoY3VycmVudE5vZGUpIHtcbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgICAgY29uc3Qge1xuICAgICAgICBhdHRyaWJ1dGVzXG4gICAgICB9ID0gY3VycmVudE5vZGU7XG5cbiAgICAgIC8qIENoZWNrIGlmIHdlIGhhdmUgYXR0cmlidXRlczsgaWYgbm90IHdlIG1pZ2h0IGhhdmUgYSB0ZXh0IG5vZGUgKi9cbiAgICAgIGlmICghYXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBob29rRXZlbnQgPSB7XG4gICAgICAgIGF0dHJOYW1lOiAnJyxcbiAgICAgICAgYXR0clZhbHVlOiAnJyxcbiAgICAgICAga2VlcEF0dHI6IHRydWUsXG4gICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzOiBBTExPV0VEX0FUVFJcbiAgICAgIH07XG4gICAgICBsZXQgbCA9IGF0dHJpYnV0ZXMubGVuZ3RoO1xuXG4gICAgICAvKiBHbyBiYWNrd2FyZHMgb3ZlciBhbGwgYXR0cmlidXRlczsgc2FmZWx5IHJlbW92ZSBiYWQgb25lcyAqL1xuICAgICAgd2hpbGUgKGwtLSkge1xuICAgICAgICBjb25zdCBhdHRyID0gYXR0cmlidXRlc1tsXTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgbmFtZXNwYWNlVVJJLFxuICAgICAgICAgIHZhbHVlOiBhdHRyVmFsdWVcbiAgICAgICAgfSA9IGF0dHI7XG4gICAgICAgIGNvbnN0IGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKG5hbWUpO1xuICAgICAgICBsZXQgdmFsdWUgPSBuYW1lID09PSAndmFsdWUnID8gYXR0clZhbHVlIDogc3RyaW5nVHJpbShhdHRyVmFsdWUpO1xuXG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgaG9va0V2ZW50LmF0dHJOYW1lID0gbGNOYW1lO1xuICAgICAgICBob29rRXZlbnQuYXR0clZhbHVlID0gdmFsdWU7XG4gICAgICAgIGhvb2tFdmVudC5rZWVwQXR0ciA9IHRydWU7XG4gICAgICAgIGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyID0gdW5kZWZpbmVkOyAvLyBBbGxvd3MgZGV2ZWxvcGVycyB0byBzZWUgdGhpcyBpcyBhIHByb3BlcnR5IHRoZXkgY2FuIHNldFxuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUF0dHJpYnV0ZScsIGN1cnJlbnROb2RlLCBob29rRXZlbnQpO1xuICAgICAgICB2YWx1ZSA9IGhvb2tFdmVudC5hdHRyVmFsdWU7XG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoaG9va0V2ZW50LmZvcmNlS2VlcEF0dHIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFJlbW92ZSBhdHRyaWJ1dGUgKi9cbiAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGlmICghaG9va0V2ZW50LmtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBXb3JrIGFyb3VuZCBhIHNlY3VyaXR5IGlzc3VlIGluIGpRdWVyeSAzLjAgKi9cbiAgICAgICAgaWYgKCFBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgJiYgcmVnRXhwVGVzdCgvXFwvPi9pLCB2YWx1ZSkpIHtcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNhbml0aXplIGF0dHJpYnV0ZSBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgZXhwciA9PiB7XG4gICAgICAgICAgICB2YWx1ZSA9IHN0cmluZ1JlcGxhY2UodmFsdWUsIGV4cHIsICcgJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJcyBgdmFsdWVgIHZhbGlkIGZvciB0aGlzIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyhjdXJyZW50Tm9kZS5ub2RlTmFtZSk7XG4gICAgICAgIGlmICghX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBGdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gdmlhIG5hbWVzcGFjZSBpc29sYXRpb24sXG4gICAgICAgICAqIFByZWZpeCBpZCBhbmQgbmFtZSBhdHRyaWJ1dGVzIHdpdGggYHVzZXItY29udGVudC1gXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoU0FOSVRJWkVfTkFNRURfUFJPUFMgJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoaXMgdmFsdWVcbiAgICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcblxuICAgICAgICAgIC8vIFByZWZpeCB0aGUgdmFsdWUgYW5kIGxhdGVyIHJlLWNyZWF0ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhlIHNhbml0aXplZCB2YWx1ZVxuICAgICAgICAgIHZhbHVlID0gU0FOSVRJWkVfTkFNRURfUFJPUFNfUFJFRklYICsgdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBIYW5kbGUgYXR0cmlidXRlcyB0aGF0IHJlcXVpcmUgVHJ1c3RlZCBUeXBlcyAqL1xuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ICYmIHR5cGVvZiB0cnVzdGVkVHlwZXMgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIDsgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRydXN0ZWRUeXBlcy5nZXRBdHRyaWJ1dGVUeXBlKGxjVGFnLCBsY05hbWUpKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRIVE1MJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2FzZSAnVHJ1c3RlZFNjcmlwdFVSTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlU2NyaXB0VVJMKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBIYW5kbGUgaW52YWxpZCBkYXRhLSogYXR0cmlidXRlIHNldCBieSB0cnktY2F0Y2hpbmcgaXQgKi9cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5zZXRBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVUkksIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyogRmFsbGJhY2sgdG8gc2V0QXR0cmlidXRlKCkgZm9yIGJyb3dzZXItdW5yZWNvZ25pemVkIG5hbWVzcGFjZXMgZS5nLiBcIngtc2NoZW1hXCIuICovXG4gICAgICAgICAgICBjdXJyZW50Tm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhcnJheVBvcChET01QdXJpZnkucmVtb3ZlZCk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZVNoYWRvd0RPTVxuICAgICAqXG4gICAgICogQHBhcmFtICB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnQgdG8gaXRlcmF0ZSBvdmVyIHJlY3Vyc2l2ZWx5XG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplU2hhZG93RE9NID0gZnVuY3Rpb24gX3Nhbml0aXplU2hhZG93RE9NKGZyYWdtZW50KSB7XG4gICAgICBsZXQgc2hhZG93Tm9kZSA9IG51bGw7XG4gICAgICBjb25zdCBzaGFkb3dJdGVyYXRvciA9IF9jcmVhdGVOb2RlSXRlcmF0b3IoZnJhZ21lbnQpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuICAgICAgd2hpbGUgKHNoYWRvd05vZGUgPSBzaGFkb3dJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVTaGFkb3dOb2RlJywgc2hhZG93Tm9kZSwgbnVsbCk7XG5cbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKHNoYWRvd05vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBEZWVwIHNoYWRvdyBET00gZGV0ZWN0ZWQgKi9cbiAgICAgICAgaWYgKHNoYWRvd05vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oc2hhZG93Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKHNoYWRvd05vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNhbml0aXplXG4gICAgICogUHVibGljIG1ldGhvZCBwcm92aWRpbmcgY29yZSBzYW5pdGF0aW9uIGZ1bmN0aW9uYWxpdHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE5vZGV9IGRpcnR5IHN0cmluZyBvciBET00gbm9kZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgb2JqZWN0XG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBET01QdXJpZnkuc2FuaXRpemUgPSBmdW5jdGlvbiAoZGlydHkpIHtcbiAgICAgIGxldCBjZmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgbGV0IGJvZHkgPSBudWxsO1xuICAgICAgbGV0IGltcG9ydGVkTm9kZSA9IG51bGw7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBudWxsO1xuICAgICAgbGV0IHJldHVybk5vZGUgPSBudWxsO1xuICAgICAgLyogTWFrZSBzdXJlIHdlIGhhdmUgYSBzdHJpbmcgdG8gc2FuaXRpemUuXG4gICAgICAgIERPIE5PVCByZXR1cm4gZWFybHksIGFzIHRoaXMgd2lsbCByZXR1cm4gdGhlIHdyb25nIHR5cGUgaWZcbiAgICAgICAgdGhlIHVzZXIgaGFzIHJlcXVlc3RlZCBhIERPTSBvYmplY3QgcmF0aGVyIHRoYW4gYSBzdHJpbmcgKi9cbiAgICAgIElTX0VNUFRZX0lOUFVUID0gIWRpcnR5O1xuICAgICAgaWYgKElTX0VNUFRZX0lOUFVUKSB7XG4gICAgICAgIGRpcnR5ID0gJzwhLS0+JztcbiAgICAgIH1cblxuICAgICAgLyogU3RyaW5naWZ5LCBpbiBjYXNlIGRpcnR5IGlzIGFuIG9iamVjdCAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycgJiYgIV9pc05vZGUoZGlydHkpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGlydHkudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkaXJ0eSA9IGRpcnR5LnRvU3RyaW5nKCk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnZGlydHkgaXMgbm90IGEgc3RyaW5nLCBhYm9ydGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3RvU3RyaW5nIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIGRpcnR5IEhUTUwgaWYgRE9NUHVyaWZ5IGNhbm5vdCBydW4gKi9cbiAgICAgIGlmICghRE9NUHVyaWZ5LmlzU3VwcG9ydGVkKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogQXNzaWduIGNvbmZpZyB2YXJzICovXG4gICAgICBpZiAoIVNFVF9DT05GSUcpIHtcbiAgICAgICAgX3BhcnNlQ29uZmlnKGNmZyk7XG4gICAgICB9XG5cbiAgICAgIC8qIENsZWFuIHVwIHJlbW92ZWQgZWxlbWVudHMgKi9cbiAgICAgIERPTVB1cmlmeS5yZW1vdmVkID0gW107XG5cbiAgICAgIC8qIENoZWNrIGlmIGRpcnR5IGlzIGNvcnJlY3RseSB0eXBlZCBmb3IgSU5fUExBQ0UgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIElOX1BMQUNFID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoSU5fUExBQ0UpIHtcbiAgICAgICAgLyogRG8gc29tZSBlYXJseSBwcmUtc2FuaXRpemF0aW9uIHRvIGF2b2lkIHVuc2FmZSByb290IG5vZGVzICovXG4gICAgICAgIGlmIChkaXJ0eS5ub2RlTmFtZSkge1xuICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhkaXJ0eS5ub2RlTmFtZSk7XG4gICAgICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgncm9vdCBub2RlIGlzIGZvcmJpZGRlbiBhbmQgY2Fubm90IGJlIHNhbml0aXplZCBpbi1wbGFjZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkaXJ0eSBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgLyogSWYgZGlydHkgaXMgYSBET00gZWxlbWVudCwgYXBwZW5kIHRvIGFuIGVtcHR5IGRvY3VtZW50IHRvIGF2b2lkXG4gICAgICAgICAgIGVsZW1lbnRzIGJlaW5nIHN0cmlwcGVkIGJ5IHRoZSBwYXJzZXIgKi9cbiAgICAgICAgYm9keSA9IF9pbml0RG9jdW1lbnQoJzwhLS0tLT4nKTtcbiAgICAgICAgaW1wb3J0ZWROb2RlID0gYm9keS5vd25lckRvY3VtZW50LmltcG9ydE5vZGUoZGlydHksIHRydWUpO1xuICAgICAgICBpZiAoaW1wb3J0ZWROb2RlLm5vZGVUeXBlID09PSAxICYmIGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgICAgLyogTm9kZSBpcyBhbHJlYWR5IGEgYm9keSwgdXNlIGFzIGlzICovXG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIGlmIChpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLWFwcGVuZFxuICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQoaW1wb3J0ZWROb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogRXhpdCBkaXJlY3RseSBpZiB3ZSBoYXZlIG5vdGhpbmcgdG8gZG8gKi9cbiAgICAgICAgaWYgKCFSRVRVUk5fRE9NICYmICFTQUZFX0ZPUl9URU1QTEFURVMgJiYgIVdIT0xFX0RPQ1VNRU5UICYmXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICAgICAgICBkaXJ0eS5pbmRleE9mKCc8JykgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBJbml0aWFsaXplIHRoZSBkb2N1bWVudCB0byB3b3JrIG9uICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KGRpcnR5KTtcblxuICAgICAgICAvKiBDaGVjayB3ZSBoYXZlIGEgRE9NIG5vZGUgZnJvbSB0aGUgZGF0YSAqL1xuICAgICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgICByZXR1cm4gUkVUVVJOX0RPTSA/IG51bGwgOiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gZW1wdHlIVE1MIDogJyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogUmVtb3ZlIGZpcnN0IGVsZW1lbnQgbm9kZSAob3VycykgaWYgRk9SQ0VfQk9EWSBpcyBzZXQgKi9cbiAgICAgIGlmIChib2R5ICYmIEZPUkNFX0JPRFkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICB9XG5cbiAgICAgIC8qIEdldCBub2RlIGl0ZXJhdG9yICovXG4gICAgICBjb25zdCBub2RlSXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKElOX1BMQUNFID8gZGlydHkgOiBib2R5KTtcblxuICAgICAgLyogTm93IHN0YXJ0IGl0ZXJhdGluZyBvdmVyIHRoZSBjcmVhdGVkIGRvY3VtZW50ICovXG4gICAgICB3aGlsZSAoY3VycmVudE5vZGUgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoY3VycmVudE5vZGUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTaGFkb3cgRE9NIGRldGVjdGVkLCBzYW5pdGl6ZSBpdCAqL1xuICAgICAgICBpZiAoY3VycmVudE5vZGUuY29udGVudCBpbnN0YW5jZW9mIERvY3VtZW50RnJhZ21lbnQpIHtcbiAgICAgICAgICBfc2FuaXRpemVTaGFkb3dET00oY3VycmVudE5vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8qIElmIHdlIHNhbml0aXplZCBgZGlydHlgIGluLXBsYWNlLCByZXR1cm4gaXQuICovXG4gICAgICBpZiAoSU5fUExBQ0UpIHtcbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBSZXR1cm4gc2FuaXRpemVkIHN0cmluZyBvciBET00gKi9cbiAgICAgIGlmIChSRVRVUk5fRE9NKSB7XG4gICAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGNyZWF0ZURvY3VtZW50RnJhZ21lbnQuY2FsbChib2R5Lm93bmVyRG9jdW1lbnQpO1xuICAgICAgICAgIHdoaWxlIChib2R5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICAgIHJldHVybk5vZGUuYXBwZW5kQ2hpbGQoYm9keS5maXJzdENoaWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGJvZHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFMTE9XRURfQVRUUi5zaGFkb3dyb290IHx8IEFMTE9XRURfQVRUUi5zaGFkb3dyb290bW9kZSkge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICBBZG9wdE5vZGUoKSBpcyBub3QgdXNlZCBiZWNhdXNlIGludGVybmFsIHN0YXRlIGlzIG5vdCByZXNldFxuICAgICAgICAgICAgKGUuZy4gdGhlIHBhc3QgbmFtZXMgbWFwIG9mIGEgSFRNTEZvcm1FbGVtZW50KSwgdGhpcyBpcyBzYWZlXG4gICAgICAgICAgICBpbiB0aGVvcnkgYnV0IHdlIHdvdWxkIHJhdGhlciBub3QgcmlzayBhbm90aGVyIGF0dGFjayB2ZWN0b3IuXG4gICAgICAgICAgICBUaGUgc3RhdGUgdGhhdCBpcyBjbG9uZWQgYnkgaW1wb3J0Tm9kZSgpIGlzIGV4cGxpY2l0bHkgZGVmaW5lZFxuICAgICAgICAgICAgYnkgdGhlIHNwZWNzLlxuICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuTm9kZSA9IGltcG9ydE5vZGUuY2FsbChvcmlnaW5hbERvY3VtZW50LCByZXR1cm5Ob2RlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuTm9kZTtcbiAgICAgIH1cbiAgICAgIGxldCBzZXJpYWxpemVkSFRNTCA9IFdIT0xFX0RPQ1VNRU5UID8gYm9keS5vdXRlckhUTUwgOiBib2R5LmlubmVySFRNTDtcblxuICAgICAgLyogU2VyaWFsaXplIGRvY3R5cGUgaWYgYWxsb3dlZCAqL1xuICAgICAgaWYgKFdIT0xFX0RPQ1VNRU5UICYmIEFMTE9XRURfVEFHU1snIWRvY3R5cGUnXSAmJiBib2R5Lm93bmVyRG9jdW1lbnQgJiYgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUgJiYgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSAmJiByZWdFeHBUZXN0KERPQ1RZUEVfTkFNRSwgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSkpIHtcbiAgICAgICAgc2VyaWFsaXplZEhUTUwgPSAnPCFET0NUWVBFICcgKyBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lICsgJz5cXG4nICsgc2VyaWFsaXplZEhUTUw7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGZpbmFsIHN0cmluZyB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgZXhwciA9PiB7XG4gICAgICAgICAgc2VyaWFsaXplZEhUTUwgPSBzdHJpbmdSZXBsYWNlKHNlcmlhbGl6ZWRIVE1MLCBleHByLCAnICcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKHNlcmlhbGl6ZWRIVE1MKSA6IHNlcmlhbGl6ZWRIVE1MO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHNldCB0aGUgY29uZmlndXJhdGlvbiBvbmNlXG4gICAgICogc2V0Q29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnNldENvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjZmcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgX3BhcnNlQ29uZmlnKGNmZyk7XG4gICAgICBTRVRfQ09ORklHID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgdGhlIGNvbmZpZ3VyYXRpb25cbiAgICAgKiBjbGVhckNvbmZpZ1xuICAgICAqXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmNsZWFyQ29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgQ09ORklHID0gbnVsbDtcbiAgICAgIFNFVF9DT05GSUcgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBjaGVjayBpZiBhbiBhdHRyaWJ1dGUgdmFsdWUgaXMgdmFsaWQuXG4gICAgICogVXNlcyBsYXN0IHNldCBjb25maWcsIGlmIGFueS4gT3RoZXJ3aXNlLCB1c2VzIGNvbmZpZyBkZWZhdWx0cy5cbiAgICAgKiBpc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRhZyBUYWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBhdHRyIEF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLiBPdGhlcndpc2UsIHJldHVybnMgZmFsc2UuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzVmFsaWRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAodGFnLCBhdHRyLCB2YWx1ZSkge1xuICAgICAgLyogSW5pdGlhbGl6ZSBzaGFyZWQgY29uZmlnIHZhcnMgaWYgbmVjZXNzYXJ5LiAqL1xuICAgICAgaWYgKCFDT05GSUcpIHtcbiAgICAgICAgX3BhcnNlQ29uZmlnKHt9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmModGFnKTtcbiAgICAgIGNvbnN0IGxjTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGF0dHIpO1xuICAgICAgcmV0dXJuIF9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gYWRkIERPTVB1cmlmeSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIGFkZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGhvb2tGdW5jdGlvbiBmdW5jdGlvbiB0byBleGVjdXRlXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmFkZEhvb2sgPSBmdW5jdGlvbiAoZW50cnlQb2ludCwgaG9va0Z1bmN0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIGhvb2tGdW5jdGlvbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBob29rc1tlbnRyeVBvaW50XSA9IGhvb2tzW2VudHJ5UG9pbnRdIHx8IFtdO1xuICAgICAgYXJyYXlQdXNoKGhvb2tzW2VudHJ5UG9pbnRdLCBob29rRnVuY3Rpb24pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYSBET01QdXJpZnkgaG9vayBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKiAocG9wcyBpdCBmcm9tIHRoZSBzdGFjayBvZiBob29rcyBpZiBtb3JlIGFyZSBwcmVzZW50KVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rIHRvIHJlbW92ZVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSByZW1vdmVkKHBvcHBlZCkgaG9va1xuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICByZXR1cm4gYXJyYXlQb3AoaG9va3NbZW50cnlQb2ludF0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3MgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGVudHJ5UG9pbnQgZW50cnkgcG9pbnQgZm9yIHRoZSBob29rcyB0byByZW1vdmVcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9va3MgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gW107XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUFsbEhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rc1xuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVBbGxIb29rcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhvb2tzID0ge307XG4gICAgfTtcbiAgICByZXR1cm4gRE9NUHVyaWZ5O1xuICB9XG4gIHZhciBwdXJpZnkgPSBjcmVhdGVET01QdXJpZnkoKTtcblxuICByZXR1cm4gcHVyaWZ5O1xuXG59KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wdXJpZnkuanMubWFwXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJ2YXIgcGx1Z2lucyA9IHt9O1xuXG4vKipcbiAqIFBsdWdpbiBNYW5hZ2VyIGNsYXNzXG4gKiBAY2xhc3MgUGx1Z2luTWFuYWdlclxuICogQG5hbWUgUGx1Z2luTWFuYWdlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbHVnaW5NYW5hZ2VyKHRoaXNPYmopIHtcblx0LyoqXG5cdCAqIEFsaWFzIG9mIHRoaXNcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuXHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbCBjdXJyZW50bHkgcmVnaXN0ZXJlZCBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciByZWdpc3RlcmVkUGx1Z2lucyA9IFtdO1xuXG5cblx0LyoqXG5cdCAqIENoYW5nZXMgYSBzaWduYWxzIG5hbWUgZnJvbSBcIm5hbWVcIiBpbnRvIFwic2lnbmFsTmFtZVwiLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgZm9ybWF0U2lnbmFsTmFtZSA9IGZ1bmN0aW9uIChzaWduYWwpIHtcblx0XHRyZXR1cm4gJ3NpZ25hbCcgKyBzaWduYWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzaWduYWwuc2xpY2UoMSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGxzIGhhbmRsZXJzIGZvciBhIHNpZ25hbFxuXHQgKlxuXHQgKiBAc2VlIGNhbGwoKVxuXHQgKiBAc2VlIGNhbGxPbmx5Rmlyc3QoKVxuXHQgKiBAcGFyYW0gIHtBcnJheX0gICBhcmdzXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IHJldHVybkF0Rmlyc3Rcblx0ICogQHJldHVybiB7Kn1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciBjYWxsSGFuZGxlcnMgPSBmdW5jdGlvbiAoYXJncywgcmV0dXJuQXRGaXJzdCkge1xuXHRcdGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3MpO1xuXG5cdFx0dmFyXHRpZHgsIHJldCxcblx0XHRcdHNpZ25hbCA9IGZvcm1hdFNpZ25hbE5hbWUoYXJncy5zaGlmdCgpKTtcblxuXHRcdGZvciAoaWR4ID0gMDsgaWR4IDwgcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoOyBpZHgrKykge1xuXHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpZHhdKSB7XG5cdFx0XHRcdHJldCA9IHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF1bc2lnbmFsXS5hcHBseSh0aGlzT2JqLCBhcmdzKTtcblxuXHRcdFx0XHRpZiAocmV0dXJuQXRGaXJzdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGxzIGFsbCBoYW5kbGVycyBmb3IgdGhlIHBhc3NlZCBzaWduYWxcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcblx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBjYWxsXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5jYWxsID0gZnVuY3Rpb24gKCkge1xuXHRcdGNhbGxIYW5kbGVycyhhcmd1bWVudHMsIGZhbHNlKTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsbHMgdGhlIGZpcnN0IGhhbmRsZXIgZm9yIGEgc2lnbmFsLCBhbmQgcmV0dXJucyB0aGVcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcblx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXG5cdCAqIEByZXR1cm4geyp9IFRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgaGFuZGxlclxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY2FsbE9ubHlGaXJzdFxuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY2FsbE9ubHlGaXJzdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gY2FsbEhhbmRsZXJzKGFyZ3VtZW50cywgdHJ1ZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBhIHNpZ25hbCBoYXMgYSBoYW5kbGVyXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gc2lnbmFsXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBoYXNIYW5kbGVyXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5oYXNIYW5kbGVyID0gZnVuY3Rpb24gKHNpZ25hbCkge1xuXHRcdHZhciBpICA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcblx0XHRzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKHNpZ25hbCk7XG5cblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRpZiAoc2lnbmFsIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZSBwbHVnaW4gZXhpc3RzIGluIHBsdWdpbnNcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGV4aXN0c1xuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZXhpc3RzID0gZnVuY3Rpb24gKHBsdWdpbikge1xuXHRcdGlmIChwbHVnaW4gaW4gcGx1Z2lucykge1xuXHRcdFx0cGx1Z2luID0gcGx1Z2luc1twbHVnaW5dO1xuXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHR0eXBlb2YgcGx1Z2luLnByb3RvdHlwZSA9PT0gJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBwbHVnaW4gaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpc1JlZ2lzdGVyZWRcblx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmlzUmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblx0XHRpZiAoYmFzZS5leGlzdHMocGx1Z2luKSkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKGlkeC0tKSB7XG5cdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1tpZHhdIGluc3RhbmNlb2YgcGx1Z2luc1twbHVnaW5dKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVycyBhIHBsdWdpbiB0byByZWNlaXZlIHNpZ25hbHNcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlZ2lzdGVyXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblx0XHRpZiAoIWJhc2UuZXhpc3RzKHBsdWdpbikgfHwgYmFzZS5pc1JlZ2lzdGVyZWQocGx1Z2luKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHBsdWdpbiA9IG5ldyBwbHVnaW5zW3BsdWdpbl0oKTtcblx0XHRyZWdpc3RlcmVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XG5cblx0XHRpZiAoJ2luaXQnIGluIHBsdWdpbikge1xuXHRcdFx0cGx1Z2luLmluaXQuY2FsbCh0aGlzT2JqKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHQvKipcblx0ICogRGVyZWdpc3RlcnMgYSBwbHVnaW4uXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBkZXJlZ2lzdGVyXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5kZXJlZ2lzdGVyID0gZnVuY3Rpb24gKHBsdWdpbikge1xuXHRcdHZhclx0cmVtb3ZlZFBsdWdpbixcblx0XHRcdHBsdWdpbklkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aCxcblx0XHRcdHJlbW92ZWQgICA9IGZhbHNlO1xuXG5cdFx0aWYgKCFiYXNlLmlzUmVnaXN0ZXJlZChwbHVnaW4pKSB7XG5cdFx0XHRyZXR1cm4gcmVtb3ZlZDtcblx0XHR9XG5cblx0XHR3aGlsZSAocGx1Z2luSWR4LS0pIHtcblx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1twbHVnaW5JZHhdIGluc3RhbmNlb2YgcGx1Z2luc1twbHVnaW5dKSB7XG5cdFx0XHRcdHJlbW92ZWRQbHVnaW4gPSByZWdpc3RlcmVkUGx1Z2lucy5zcGxpY2UocGx1Z2luSWR4LCAxKVswXTtcblx0XHRcdFx0cmVtb3ZlZCAgICAgICA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZW1vdmVkUGx1Z2luKSB7XG5cdFx0XHRcdFx0cmVtb3ZlZFBsdWdpbi5kZXN0cm95LmNhbGwodGhpc09iaik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVtb3ZlZDtcblx0fTtcblxuXHQvKipcblx0ICogQ2xlYXJzIGFsbCBwbHVnaW5zIGFuZCByZW1vdmVzIHRoZSBvd25lciByZWZlcmVuY2UuXG5cdCAqXG5cdCAqIENhbGxpbmcgYW55IGZ1bmN0aW9ucyBvbiB0aGlzIG9iamVjdCBhZnRlciBjYWxsaW5nXG5cdCAqIGRlc3Ryb3kgd2lsbCBjYXVzZSBhIEpTIGVycm9yLlxuXHQgKlxuXHQgKiBAbmFtZSBkZXN0cm95XG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBpID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZWdpc3RlcmVkUGx1Z2luc1tpXSkge1xuXHRcdFx0XHRyZWdpc3RlcmVkUGx1Z2luc1tpXS5kZXN0cm95LmNhbGwodGhpc09iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmVnaXN0ZXJlZFBsdWdpbnMgPSBbXTtcblx0XHR0aGlzT2JqICAgID0gbnVsbDtcblx0fTtcbn1cblxuUGx1Z2luTWFuYWdlci5wbHVnaW5zID0gcGx1Z2lucztcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuXG5cbi8qKlxuICogR2V0cyB0aGUgdGV4dCwgc3RhcnQvZW5kIG5vZGUgYW5kIG9mZnNldCBmb3JcbiAqIGxlbmd0aCBjaGFycyBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBwYXNzZWQgbm9kZVxuICogYXQgdGhlIHNwZWNpZmllZCBvZmZzZXQuXG4gKlxuICogQHBhcmFtICB7Tm9kZX0gIG5vZGVcbiAqIEBwYXJhbSAge251bWJlcn0gIG9mZnNldFxuICogQHBhcmFtICB7Ym9vbGVhbn0gaXNMZWZ0XG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBsZW5ndGhcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBvdXRlclRleHQgPSBmdW5jdGlvbiAocmFuZ2UsIGlzTGVmdCwgbGVuZ3RoKSB7XG5cdHZhciBub2RlVmFsdWUsIHJlbWFpbmluZywgc3RhcnQsIGVuZCwgbm9kZSxcblx0XHR0ZXh0ID0gJycsXG5cdFx0bmV4dCA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLFxuXHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXG5cdC8vIEhhbmRsZSBjYXNlcyB3aGVyZSBub2RlIGlzIGEgcGFyYWdyYXBoIGFuZCBvZmZzZXRcblx0Ly8gcmVmZXJzIHRvIHRoZSBpbmRleCBvZiBhIHRleHQgbm9kZS5cblx0Ly8gMyA9IHRleHQgbm9kZVxuXHRpZiAobmV4dCAmJiBuZXh0Lm5vZGVUeXBlICE9PSAzKSB7XG5cdFx0bmV4dCA9IG5leHQuY2hpbGROb2Rlc1tvZmZzZXRdO1xuXHRcdG9mZnNldCA9IDA7XG5cdH1cblxuXHRzdGFydCA9IGVuZCA9IG9mZnNldDtcblxuXHR3aGlsZSAobGVuZ3RoID4gdGV4dC5sZW5ndGggJiYgbmV4dCAmJiBuZXh0Lm5vZGVUeXBlID09PSAzKSB7XG5cdFx0bm9kZVZhbHVlID0gbmV4dC5ub2RlVmFsdWU7XG5cdFx0cmVtYWluaW5nID0gbGVuZ3RoIC0gdGV4dC5sZW5ndGg7XG5cblx0XHQvLyBJZiBub3QgdGhlIGZpcnN0IG5vZGUsIHN0YXJ0IGFuZCBlbmQgc2hvdWxkIGJlIGF0IHRoZWlyXG5cdFx0Ly8gbWF4IHZhbHVlcyBhcyB3aWxsIGJlIHVwZGF0ZWQgd2hlbiBnZXR0aW5nIHRoZSB0ZXh0XG5cdFx0aWYgKG5vZGUpIHtcblx0XHRcdGVuZCA9IG5vZGVWYWx1ZS5sZW5ndGg7XG5cdFx0XHRzdGFydCA9IDA7XG5cdFx0fVxuXG5cdFx0bm9kZSA9IG5leHQ7XG5cblx0XHRpZiAoaXNMZWZ0KSB7XG5cdFx0XHRzdGFydCA9IE1hdGgubWF4KGVuZCAtIHJlbWFpbmluZywgMCk7XG5cdFx0XHRvZmZzZXQgPSBzdGFydDtcblxuXHRcdFx0dGV4dCA9IG5vZGVWYWx1ZS5zdWJzdHIoc3RhcnQsIGVuZCAtIHN0YXJ0KSArIHRleHQ7XG5cdFx0XHRuZXh0ID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVuZCA9IE1hdGgubWluKHJlbWFpbmluZywgbm9kZVZhbHVlLmxlbmd0aCk7XG5cdFx0XHRvZmZzZXQgPSBzdGFydCArIGVuZDtcblxuXHRcdFx0dGV4dCArPSBub2RlVmFsdWUuc3Vic3RyKHN0YXJ0LCBlbmQpO1xuXHRcdFx0bmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRub2RlOiBub2RlIHx8IG5leHQsXG5cdFx0b2Zmc2V0OiBvZmZzZXQsXG5cdFx0dGV4dDogdGV4dFxuXHR9O1xufTtcblxuLyoqXG4gKiBSYW5nZSBoZWxwZXJcbiAqXG4gKiBAY2xhc3MgUmFuZ2VIZWxwZXJcbiAqIEBuYW1lIFJhbmdlSGVscGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJhbmdlSGVscGVyKHdpbiwgZCwgc2FuaXRpemUpIHtcblx0dmFyXHRfY3JlYXRlTWFya2VyLCBfcHJlcGFyZUlucHV0LFxuXHRcdGRvYyAgICAgICAgICA9IGQgfHwgd2luLmNvbnRlbnREb2N1bWVudCB8fCB3aW4uZG9jdW1lbnQsXG5cdFx0c3RhcnRNYXJrZXIgID0gJ3NjZWRpdG9yLXN0YXJ0LW1hcmtlcicsXG5cdFx0ZW5kTWFya2VyICAgID0gJ3NjZWRpdG9yLWVuZC1tYXJrZXInLFxuXHRcdGJhc2UgICAgICAgICA9IHRoaXM7XG5cblx0LyoqXG5cdCAqIEluc2VydHMgSFRNTCBpbnRvIHRoZSBjdXJyZW50IHJhbmdlIHJlcGxhY2luZyBhbnkgc2VsZWN0ZWRcblx0ICogdGV4dC5cblx0ICpcblx0ICogSWYgZW5kSFRNTCBpcyBzcGVjaWZpZWQgdGhlIHNlbGVjdGVkIGNvbnRlbnRzIHdpbGwgYmUgcHV0IGJldHdlZW5cblx0ICogaHRtbCBhbmQgZW5kSFRNTC4gSWYgdGhlcmUgaXMgbm90aGluZyBzZWxlY3RlZCBodG1sIGFuZCBlbmRIVE1MIGFyZVxuXHQgKiBqdXN0IGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEhUTUxdXG5cdCAqIEByZXR1cm4gRmFsc2Ugb24gZmFpbFxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaW5zZXJ0SFRNTFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmluc2VydEhUTUwgPSBmdW5jdGlvbiAoaHRtbCwgZW5kSFRNTCkge1xuXHRcdHZhclx0bm9kZSwgZGl2LFxuXHRcdFx0cmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKTtcblxuXHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoZW5kSFRNTCkge1xuXHRcdFx0aHRtbCArPSBiYXNlLnNlbGVjdGVkSHRtbCgpICsgZW5kSFRNTDtcblx0XHR9XG5cblx0XHRkaXYgICAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcblx0XHRub2RlICAgICAgICAgID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRkaXYuaW5uZXJIVE1MID0gc2FuaXRpemUoaHRtbCk7XG5cblx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChub2RlLCBkaXYuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0YmFzZS5pbnNlcnROb2RlKG5vZGUpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBQcmVwYXJlcyBIVE1MIHRvIGJlIGluc2VydGVkIGJ5IGFkZGluZyBhIHplcm8gd2lkdGggc3BhY2Vcblx0ICogaWYgdGhlIGxhc3QgY2hpbGQgaXMgZW1wdHkgYW5kIGFkZGluZyB0aGUgcmFuZ2Ugc3RhcnQvZW5kXG5cdCAqIG1hcmtlcnMgdG8gdGhlIGxhc3QgY2hpbGQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBub2RlXG5cdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbZW5kTm9kZV1cblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gW3JldHVybkh0bWxdXG5cdCAqIEByZXR1cm4ge05vZGV8c3RyaW5nfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3ByZXBhcmVJbnB1dCA9IGZ1bmN0aW9uIChub2RlLCBlbmROb2RlLCByZXR1cm5IdG1sKSB7XG5cdFx0dmFyIGxhc3RDaGlsZCxcblx0XHRcdGZyYWcgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG5cdFx0aWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKGVuZE5vZGUpIHtcblx0XHRcdFx0bm9kZSArPSBiYXNlLnNlbGVjdGVkSHRtbCgpICsgZW5kTm9kZTtcblx0XHRcdH1cblxuXHRcdFx0ZnJhZyA9IGRvbS5wYXJzZUhUTUwobm9kZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBub2RlKTtcblxuXHRcdFx0aWYgKGVuZE5vZGUpIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGJhc2Uuc2VsZWN0ZWRSYW5nZSgpLmV4dHJhY3RDb250ZW50cygpKTtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGVuZE5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghKGxhc3RDaGlsZCA9IGZyYWcubGFzdENoaWxkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHdoaWxlICghZG9tLmlzSW5saW5lKGxhc3RDaGlsZC5sYXN0Q2hpbGQsIHRydWUpKSB7XG5cdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQubGFzdENoaWxkO1xuXHRcdH1cblxuXHRcdGlmIChkb20uY2FuSGF2ZUNoaWxkcmVuKGxhc3RDaGlsZCkpIHtcblx0XHRcdC8vIFdlYmtpdCB3b24ndCBhbGxvdyB0aGUgY3Vyc29yIHRvIGJlIHBsYWNlZCBpbnNpZGUgYW5cblx0XHRcdC8vIGVtcHR5IHRhZywgc28gYWRkIGEgemVybyB3aWR0aCBzcGFjZSB0byBpdC5cblx0XHRcdGlmICghbGFzdENoaWxkLmxhc3RDaGlsZCkge1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnXFx1MjAwQicpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGFzdENoaWxkID0gZnJhZztcblx0XHR9XG5cblx0XHRiYXNlLnJlbW92ZU1hcmtlcnMoKTtcblxuXHRcdC8vIEFwcGVuZCBtYXJrcyB0byBsYXN0IGNoaWxkIHNvIHdoZW4gcmVzdG9yZWQgY3Vyc29yIHdpbGwgYmUgaW5cblx0XHQvLyB0aGUgcmlnaHQgcGxhY2Vcblx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCBfY3JlYXRlTWFya2VyKHN0YXJ0TWFya2VyKSk7XG5cdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpKTtcblxuXHRcdGlmIChyZXR1cm5IdG1sKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgZnJhZyk7XG5cblx0XHRcdHJldHVybiBkaXYuaW5uZXJIVE1MO1xuXHRcdH1cblxuXHRcdHJldHVybiBmcmFnO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBUaGUgc2FtZSBhcyBpbnNlcnRIVE1MIGV4Y2VwdCB3aXRoIERPTSBub2RlcyBpbnN0ZWFkXG5cdCAqXG5cdCAqIDxzdHJvbmc+V2FybmluZzo8L3N0cm9uZz4gdGhlIG5vZGVzIG11c3QgYmVsb25nIHRvIHRoZVxuXHQgKiBkb2N1bWVudCB0aGV5IGFyZSBiZWluZyBpbnNlcnRlZCBpbnRvLiBTb21lIGJyb3dzZXJzXG5cdCAqIHdpbGwgdGhyb3cgZXhjZXB0aW9ucyBpZiB0aGV5IGRvbid0LlxuXHQgKlxuXHQgKiBSZXR1cm5zIGJvb2xlYW4gZmFsc2Ugb24gZmFpbFxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQHBhcmFtIHtOb2RlfSBlbmROb2RlXG5cdCAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGluc2VydE5vZGVcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5pbnNlcnROb2RlID0gZnVuY3Rpb24gKG5vZGUsIGVuZE5vZGUpIHtcblx0XHR2YXJcdGZpcnN0LCBsYXN0LFxuXHRcdFx0aW5wdXQgID0gX3ByZXBhcmVJbnB1dChub2RlLCBlbmROb2RlKSxcblx0XHRcdHJhbmdlICA9IGJhc2Uuc2VsZWN0ZWRSYW5nZSgpLFxuXHRcdFx0cGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIsXG5cdFx0XHRlbXB0eU5vZGVzID0gW107XG5cblx0XHRpZiAoIWlucHV0KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlSWZFbXB0eShub2RlKSB7XG5cdFx0XHQvLyBPbmx5IHJlbW92ZSBlbXB0eSBub2RlIGlmIGl0IHdhc24ndCBhbHJlYWR5IGVtcHR5XG5cdFx0XHRpZiAobm9kZSAmJiBkb20uaXNFbXB0eShub2RlKSAmJiBlbXB0eU5vZGVzLmluZGV4T2Yobm9kZSkgPCAwKSB7XG5cdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHJhbmdlLnN0YXJ0Q29udGFpbmVyICE9PSByYW5nZS5lbmRDb250YWluZXIpIHtcblx0XHRcdHV0aWxzLmVhY2gocGFyZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChfLCBub2RlKSB7XG5cdFx0XHRcdGlmIChkb20uaXNFbXB0eShub2RlKSkge1xuXHRcdFx0XHRcdGVtcHR5Tm9kZXMucHVzaChub2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGZpcnN0ID0gaW5wdXQuZmlyc3RDaGlsZDtcblx0XHRcdGxhc3QgPSBpbnB1dC5sYXN0Q2hpbGQ7XG5cdFx0fVxuXG5cdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcblxuXHRcdC8vIEZGIGFsbG93cyA8YnIgLz4gdG8gYmUgc2VsZWN0ZWQgYnV0IGluc2VydGluZyBhIG5vZGVcblx0XHQvLyBpbnRvIDxiciAvPiB3aWxsIGNhdXNlIGl0IG5vdCB0byBiZSBkaXNwbGF5ZWQgc28gbXVzdFxuXHRcdC8vIGluc2VydCBiZWZvcmUgdGhlIDxiciAvPiBpbiBGRi5cblx0XHQvLyAzID0gVGV4dE5vZGVcblx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMyAmJiAhZG9tLmNhbkhhdmVDaGlsZHJlbihwYXJlbnQpKSB7XG5cdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGlucHV0LCBwYXJlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyYW5nZS5pbnNlcnROb2RlKGlucHV0KTtcblxuXHRcdFx0Ly8gSWYgYSBub2RlIHdhcyBzcGxpdCBvciBpdHMgY29udGVudHMgZGVsZXRlZCwgcmVtb3ZlIGFueSByZXN1bHRpbmdcblx0XHRcdC8vIGVtcHR5IHRhZ3MuIEZvciBleGFtcGxlOlxuXHRcdFx0Ly8gPHA+fHRlc3Q8L3A+PGRpdj50ZXN0fDwvZGl2PlxuXHRcdFx0Ly8gV2hlbiBkZWxldGVDb250ZW50cyBjb3VsZCBiZWNvbWU6XG5cdFx0XHQvLyA8cD48L3A+fDxkaXY+PC9kaXY+XG5cdFx0XHQvLyBTbyByZW1vdmUgdGhlIGVtcHR5IG9uZXNcblx0XHRcdHJlbW92ZUlmRW1wdHkoZmlyc3QgJiYgZmlyc3QucHJldmlvdXNTaWJsaW5nKTtcblx0XHRcdHJlbW92ZUlmRW1wdHkobGFzdCAmJiBsYXN0Lm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0XHRiYXNlLnJlc3RvcmVSYW5nZSgpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIHNlbGVjdGVkIFJhbmdlXG5cdCAqXG5cdCAqIEByZXR1cm4ge1JhbmdlfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY2xvbmVTZWxlY3RlZFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmNsb25lU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiByYW5nZS5jbG9uZVJhbmdlKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBzZWxlY3RlZCBSYW5nZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtSYW5nZX1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdGVkUmFuZ2Vcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5zZWxlY3RlZFJhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0cmFuZ2UsIGZpcnN0Q2hpbGQsXG5cdFx0XHRzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHRpZiAoIXNlbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gY3JlYXRpbmcgYSBuZXcgcmFuZ2UsIHNldCB0aGUgc3RhcnQgdG8gdGhlIGZpcnN0IGNoaWxkXG5cdFx0Ly8gZWxlbWVudCBvZiB0aGUgYm9keSBlbGVtZW50IHRvIGF2b2lkIGVycm9ycyBpbiBGRi5cblx0XHRpZiAoc2VsLnJhbmdlQ291bnQgPD0gMCkge1xuXHRcdFx0Zmlyc3RDaGlsZCA9IGRvYy5ib2R5O1xuXHRcdFx0d2hpbGUgKGZpcnN0Q2hpbGQuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRmaXJzdENoaWxkID0gZmlyc3RDaGlsZC5maXJzdENoaWxkO1xuXHRcdFx0fVxuXG5cdFx0XHRyYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuXHRcdFx0Ly8gTXVzdCBiZSBzZXRTdGFydEJlZm9yZSBvdGhlcndpc2UgaXQgY2FuIGNhdXNlIGluZmluaXRlXG5cdFx0XHQvLyBsb29wcyB3aXRoIGxpc3RzIGluIFdlYktpdC4gU2VlIGlzc3VlIDQ0MlxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoZmlyc3RDaGlsZCk7XG5cblx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XG5cdFx0fVxuXG5cdFx0aWYgKHNlbC5yYW5nZUNvdW50ID4gMCkge1xuXHRcdFx0cmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmFuZ2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgaWYgdGhlcmUgaXMgY3VycmVudGx5IGEgc2VsZWN0aW9uXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBoYXNTZWxlY3Rpb25cblx0ICogQHNpbmNlIDEuNC40XG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuaGFzU2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0c2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXG5cdFx0cmV0dXJuIHNlbCAmJiBzZWwucmFuZ2VDb3VudCA+IDA7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBIVE1MXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdGVkSHRtbFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNlbGVjdGVkSHRtbCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXJcdGRpdixcblx0XHRcdHJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xuXG5cdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHBhcmVudCBub2RlIG9mIHRoZSBzZWxlY3RlZCBjb250ZW50cyBpbiB0aGUgcmFuZ2Vcblx0ICpcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBwYXJlbnROb2RlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UucGFyZW50Tm9kZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKTtcblxuXHRcdGlmIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogR2V0cyB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBzZWxlY3RlZFxuXHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHQvKipcblx0ICogR2V0cyB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBzZWxlY3RlZFxuXHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gW25dIFRoZSBlbGVtZW50IHRvIGdldCB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IGZyb21cblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBnZXRGaXJzdEJsb2NrUGFyZW50XjJcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZ2V0Rmlyc3RCbG9ja1BhcmVudCA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0dmFyIGZ1bmMgPSBmdW5jdGlvbiAoZWxtKSB7XG5cdFx0XHRpZiAoIWRvbS5pc0lubGluZShlbG0sIHRydWUpKSB7XG5cdFx0XHRcdHJldHVybiBlbG07XG5cdFx0XHR9XG5cblx0XHRcdGVsbSA9IGVsbSA/IGVsbS5wYXJlbnROb2RlIDogbnVsbDtcblxuXHRcdFx0cmV0dXJuIGVsbSA/IGZ1bmMoZWxtKSA6IGVsbTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmMobm9kZSB8fCBiYXNlLnBhcmVudE5vZGUoKSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEluc2VydHMgYSBub2RlIGF0IGVpdGhlciB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge0Jvb2x9IHN0YXJ0XG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaW5zZXJ0Tm9kZUF0XG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuaW5zZXJ0Tm9kZUF0ID0gZnVuY3Rpb24gKHN0YXJ0LCBub2RlKSB7XG5cdFx0dmFyXHRjdXJyZW50UmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKSxcblx0XHRcdHJhbmdlICAgICAgICA9IGJhc2UuY2xvbmVTZWxlY3RlZCgpO1xuXG5cdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJhbmdlLmNvbGxhcHNlKHN0YXJ0KTtcblx0XHRyYW5nZS5pbnNlcnROb2RlKG5vZGUpO1xuXG5cdFx0Ly8gUmVzZWxlY3QgdGhlIGN1cnJlbnQgcmFuZ2UuXG5cdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBDaHJvbWUgbG9zaW5nIHRoZSBzZWxlY3Rpb24uIElzc3VlIzgyXG5cdFx0YmFzZS5zZWxlY3RSYW5nZShjdXJyZW50UmFuZ2UpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbWFya2VyIG5vZGVcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXG5cdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRiYXNlLnJlbW92ZU1hcmtlcihpZCk7XG5cblx0XHR2YXIgbWFya2VyICA9IGRvbS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xuXHRcdFx0aWQ6IGlkLFxuXHRcdFx0Y2xhc3NOYW1lOiAnc2NlZGl0b3Itc2VsZWN0aW9uIHNjZWRpdG9yLWlnbm9yZScsXG5cdFx0XHRzdHlsZTogJ2Rpc3BsYXk6bm9uZTtsaW5lLWhlaWdodDowJ1xuXHRcdH0sIGRvYyk7XG5cblx0XHRtYXJrZXIuaW5uZXJIVE1MID0gJyAnO1xuXG5cdFx0cmV0dXJuIG1hcmtlcjtcblx0fTtcblxuXHQvKipcblx0ICogSW5zZXJ0cyBzdGFydC9lbmQgbWFya2VycyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdCAqIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHJlc3RvcmVSYW5nZSB0byByZS1zZWxlY3QgdGhlXG5cdCAqIHJhbmdlLlxuXHQgKlxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpbnNlcnRNYXJrZXJzXG5cdCAqL1xuXHRiYXNlLmluc2VydE1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyXHRjdXJyZW50UmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKTtcblx0XHR2YXIgc3RhcnROb2RlID0gX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcik7XG5cblx0XHRiYXNlLnJlbW92ZU1hcmtlcnMoKTtcblx0XHRiYXNlLmluc2VydE5vZGVBdCh0cnVlLCBzdGFydE5vZGUpO1xuXG5cdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBlbmQgbWFya2VyIHNvbWV0aW1lcyBiZWluZyBwbGFjZWQgYmVmb3JlXG5cdFx0Ly8gdGhlIHN0YXJ0IG1hcmtlciB3aGVuIHRoZSByYW5nZSBpcyBjb2xsYXBzZWQuXG5cdFx0aWYgKGN1cnJlbnRSYW5nZSAmJiBjdXJyZW50UmFuZ2UuY29sbGFwc2VkKSB7XG5cdFx0XHRzdGFydE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG5cdFx0XHRcdF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSwgc3RhcnROb2RlLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmFzZS5pbnNlcnROb2RlQXQoZmFsc2UsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBtYXJrZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElEXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuXHQgKiBAcmV0dXJuIHtOb2RlfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZ2V0TWFya2VyXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZ2V0TWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0cmV0dXJuIGRvYy5nZXRFbGVtZW50QnlJZChpZCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgdGhlIG1hcmtlciB3aXRoIHRoZSBzcGVjaWZpZWQgSURcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSByZW1vdmVNYXJrZXJcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHR2YXIgbWFya2VyID0gYmFzZS5nZXRNYXJrZXIoaWQpO1xuXG5cdFx0aWYgKG1hcmtlcikge1xuXHRcdFx0ZG9tLnJlbW92ZShtYXJrZXIpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogUmVtb3ZlcyB0aGUgc3RhcnQvZW5kIG1hcmtlcnNcblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlbW92ZU1hcmtlcnNcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuXHRcdGJhc2UucmVtb3ZlTWFya2VyKHN0YXJ0TWFya2VyKTtcblx0XHRiYXNlLnJlbW92ZU1hcmtlcihlbmRNYXJrZXIpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTYXZlcyB0aGUgY3VycmVudCByYW5nZSBsb2NhdGlvbi4gQWxpYXMgb2YgaW5zZXJ0TWFya2VycygpXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzYXZlUmFnZVxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNhdmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRiYXNlLmluc2VydE1hcmtlcnMoKTtcblx0fTtcblxuXHQvKipcblx0ICogU2VsZWN0IHRoZSBzcGVjaWZpZWQgcmFuZ2Vcblx0ICpcblx0ICogQHBhcmFtIHtSYW5nZX0gcmFuZ2Vcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdFJhbmdlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2Uuc2VsZWN0UmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHR2YXIgbGFzdENoaWxkO1xuXHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cdFx0dmFyIGNvbnRhaW5lciA9IHJhbmdlLmVuZENvbnRhaW5lcjtcblxuXHRcdC8vIENoZWNrIGlmIGN1cnNvciBpcyBzZXQgYWZ0ZXIgYSBCUiB3aGVuIHRoZSBCUiBpcyB0aGUgb25seVxuXHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXG5cdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXG5cdFx0aWYgKHJhbmdlLmNvbGxhcHNlZCAmJiBjb250YWluZXIgJiZcblx0XHRcdCFkb20uaXNJbmxpbmUoY29udGFpbmVyLCB0cnVlKSkge1xuXG5cdFx0XHRsYXN0Q2hpbGQgPSBjb250YWluZXIubGFzdENoaWxkO1xuXHRcdFx0d2hpbGUgKGxhc3RDaGlsZCAmJiBkb20uaXMobGFzdENoaWxkLCAnLnNjZWRpdG9yLWlnbm9yZScpKSB7XG5cdFx0XHRcdGxhc3RDaGlsZCA9IGxhc3RDaGlsZC5wcmV2aW91c1NpYmxpbmc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb20uaXMobGFzdENoaWxkLCAnYnInKSkge1xuXHRcdFx0XHR2YXIgcm5nID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cdFx0XHRcdHJuZy5zZXRFbmRBZnRlcihsYXN0Q2hpbGQpO1xuXHRcdFx0XHRybmcuY29sbGFwc2UoZmFsc2UpO1xuXG5cdFx0XHRcdGlmIChiYXNlLmNvbXBhcmUocmFuZ2UsIHJuZykpIHtcblx0XHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShsYXN0Q2hpbGQpO1xuXHRcdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHNlbCkge1xuXHRcdFx0YmFzZS5jbGVhcigpO1xuXHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlc3RvcmVzIHRoZSBsYXN0IHJhbmdlIHNhdmVkIGJ5IHNhdmVSYW5nZSgpIG9yIGluc2VydE1hcmtlcnMoKVxuXHQgKlxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgcmVzdG9yZVJhbmdlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UucmVzdG9yZVJhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0aXNDb2xsYXBzZWQsXG5cdFx0XHRyYW5nZSA9IGJhc2Uuc2VsZWN0ZWRSYW5nZSgpLFxuXHRcdFx0c3RhcnQgPSBiYXNlLmdldE1hcmtlcihzdGFydE1hcmtlciksXG5cdFx0XHRlbmQgICA9IGJhc2UuZ2V0TWFya2VyKGVuZE1hcmtlcik7XG5cblx0XHRpZiAoIXN0YXJ0IHx8ICFlbmQgfHwgIXJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aXNDb2xsYXBzZWQgPSBzdGFydC5uZXh0U2libGluZyA9PT0gZW5kO1xuXG5cdFx0cmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcblx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShzdGFydCk7XG5cdFx0cmFuZ2Uuc2V0RW5kQWZ0ZXIoZW5kKTtcblxuXHRcdGlmIChpc0NvbGxhcHNlZCkge1xuXHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0fVxuXG5cdFx0YmFzZS5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdFx0YmFzZS5yZW1vdmVNYXJrZXJzKCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNlbGVjdHMgdGhlIHRleHQgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSByaWdodFxuXHQgKiBAc2luY2UgMS40LjNcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNlbGVjdE91dGVyVGV4dCA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuXHRcdHZhciBzdGFydCwgZW5kLFxuXHRcdFx0cmFuZ2UgPSBiYXNlLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyYW5nZS5jb2xsYXBzZShmYWxzZSk7XG5cblx0XHRzdGFydCA9IG91dGVyVGV4dChyYW5nZSwgdHJ1ZSwgbGVmdCk7XG5cdFx0ZW5kID0gb3V0ZXJUZXh0KHJhbmdlLCBmYWxzZSwgcmlnaHQpO1xuXG5cdFx0cmFuZ2Uuc2V0U3RhcnQoc3RhcnQubm9kZSwgc3RhcnQub2Zmc2V0KTtcblx0XHRyYW5nZS5zZXRFbmQoZW5kLm5vZGUsIGVuZC5vZmZzZXQpO1xuXG5cdFx0YmFzZS5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHRleHQgbGVmdCBvciByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBiZWZvcmVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqIEBzaW5jZSAxLjQuM1xuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZ2V0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGJlZm9yZSwgbGVuZ3RoKSB7XG5cdFx0dmFyXHRyYW5nZSA9IGJhc2UuY2xvbmVTZWxlY3RlZCgpO1xuXG5cdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdHJhbmdlLmNvbGxhcHNlKCFiZWZvcmUpO1xuXG5cdFx0cmV0dXJuIG91dGVyVGV4dChyYW5nZSwgYmVmb3JlLCBsZW5ndGgpLnRleHQ7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlcGxhY2VzIGtleXdvcmRzIHdpdGggdmFsdWVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IGNhcmV0IHBvc2l0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9ICAga2V5d29yZHNcblx0ICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQWZ0ZXIgICAgICBJZiB0byBpbmNsdWRlIHRoZSB0ZXh0IGFmdGVyIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgY2FyZXQgcG9zaXRpb24gb3IganVzdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgYmVmb3JlXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0ga2V5d29yZHNTb3J0ZWQgICAgSWYgdGhlIGtleXdvcmRzIGFycmF5IGlzIHByZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCBzaG9ydGVzdCB0byBsb25nZXN0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSAgbG9uZ2VzdEtleXdvcmQgICAgTGVuZ3RoIG9mIHRoZSBsb25nZXN0IGtleXdvcmRcblx0ICogQHBhcmFtIHtib29sZWFufSByZXF1aXJlV2hpdGVzcGFjZSBJZiB0aGUga2V5IG11c3QgYmUgc3Vycm91bmRlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IHdoaXRlc3BhY2Vcblx0ICogQHBhcmFtIHtzdHJpbmd9ICBrZXlwcmVzc0NoYXIgICAgICBJZiB0aGlzIGlzIGJlaW5nIGNhbGxlZCBmcm9tXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBrZXlwcmVzcyBldmVudCwgdGhpcyBzaG91bGQgYmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQgdG8gdGhlIHByZXNzZWQgY2hhcmFjdGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSByZXBsYWNlS2V5d29yZFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xuXHRiYXNlLnJlcGxhY2VLZXl3b3JkID0gZnVuY3Rpb24gKFxuXHRcdGtleXdvcmRzLFxuXHRcdGluY2x1ZGVBZnRlcixcblx0XHRrZXl3b3Jkc1NvcnRlZCxcblx0XHRsb25nZXN0S2V5d29yZCxcblx0XHRyZXF1aXJlV2hpdGVzcGFjZSxcblx0XHRrZXlwcmVzc0NoYXJcblx0KSB7XG5cdFx0aWYgKCFrZXl3b3Jkc1NvcnRlZCkge1xuXHRcdFx0a2V5d29yZHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBvdXRlclRleHQsIG1hdGNoLCBtYXRjaFBvcywgc3RhcnRJbmRleCxcblx0XHRcdGxlZnRMZW4sIGNoYXJzTGVmdCwga2V5d29yZCwga2V5d29yZExlbixcblx0XHRcdHdoaXRlc3BhY2VSZWdleCA9ICcoXnxbXFxcXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0pJyxcblx0XHRcdGtleXdvcmRJZHggICAgICA9IGtleXdvcmRzLmxlbmd0aCxcblx0XHRcdHdoaXRlc3BhY2VMZW4gICA9IHJlcXVpcmVXaGl0ZXNwYWNlID8gMSA6IDAsXG5cdFx0XHRtYXhLZXlMZW4gICAgICAgPSBsb25nZXN0S2V5d29yZCB8fFxuXHRcdFx0XHRrZXl3b3Jkc1trZXl3b3JkSWR4IC0gMV1bMF0ubGVuZ3RoO1xuXG5cdFx0aWYgKHJlcXVpcmVXaGl0ZXNwYWNlKSB7XG5cdFx0XHRtYXhLZXlMZW4rKztcblx0XHR9XG5cblx0XHRrZXlwcmVzc0NoYXIgPSBrZXlwcmVzc0NoYXIgfHwgJyc7XG5cdFx0b3V0ZXJUZXh0ICAgID0gYmFzZS5nZXRPdXRlclRleHQodHJ1ZSwgbWF4S2V5TGVuKTtcblx0XHRsZWZ0TGVuICAgICAgPSBvdXRlclRleHQubGVuZ3RoO1xuXHRcdG91dGVyVGV4dCAgICs9IGtleXByZXNzQ2hhcjtcblxuXHRcdGlmIChpbmNsdWRlQWZ0ZXIpIHtcblx0XHRcdG91dGVyVGV4dCArPSBiYXNlLmdldE91dGVyVGV4dChmYWxzZSwgbWF4S2V5TGVuKTtcblx0XHR9XG5cblx0XHR3aGlsZSAoa2V5d29yZElkeC0tKSB7XG5cdFx0XHRrZXl3b3JkICAgID0ga2V5d29yZHNba2V5d29yZElkeF1bMF07XG5cdFx0XHRrZXl3b3JkTGVuID0ga2V5d29yZC5sZW5ndGg7XG5cdFx0XHRzdGFydEluZGV4ID0gTWF0aC5tYXgoMCwgbGVmdExlbiAtIGtleXdvcmRMZW4gLSB3aGl0ZXNwYWNlTGVuKTtcblx0XHRcdG1hdGNoUG9zICAgPSAtMTtcblxuXHRcdFx0aWYgKHJlcXVpcmVXaGl0ZXNwYWNlKSB7XG5cdFx0XHRcdG1hdGNoID0gb3V0ZXJUZXh0XG5cdFx0XHRcdFx0LnN1YnN0cihzdGFydEluZGV4KVxuXHRcdFx0XHRcdC5tYXRjaChuZXcgUmVnRXhwKHdoaXRlc3BhY2VSZWdleCArXG5cdFx0XHRcdFx0XHRlc2NhcGUucmVnZXgoa2V5d29yZCkgKyB3aGl0ZXNwYWNlUmVnZXgpKTtcblxuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHQvLyBBZGQgdGhlIGxlbmd0aCBvZiB0aGUgdGV4dCB0aGF0IHdhcyByZW1vdmVkIGJ5XG5cdFx0XHRcdFx0Ly8gc3Vic3RyKCkgYW5kIGFsc28gYWRkIDEgZm9yIHRoZSB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0bWF0Y2hQb3MgPSBtYXRjaC5pbmRleCArIHN0YXJ0SW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1hdGNoUG9zID0gb3V0ZXJUZXh0LmluZGV4T2Yoa2V5d29yZCwgc3RhcnRJbmRleCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtYXRjaFBvcyA+IC0xKSB7XG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgbWF0Y2ggaXMgYmV0d2VlbiBiZWZvcmUgYW5kXG5cdFx0XHRcdC8vIGFmdGVyLCBub3QganVzdCBlbnRpcmVseSBpbiBvbmUgc2lkZSBvciB0aGUgb3RoZXJcblx0XHRcdFx0aWYgKG1hdGNoUG9zIDw9IGxlZnRMZW4gJiZcblx0XHRcdFx0XHRtYXRjaFBvcyArIGtleXdvcmRMZW4gKyB3aGl0ZXNwYWNlTGVuID49IGxlZnRMZW4pIHtcblx0XHRcdFx0XHRjaGFyc0xlZnQgPSBsZWZ0TGVuIC0gbWF0Y2hQb3M7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUga2V5cHJlc3MgY2hhciBpcyB3aGl0ZSBzcGFjZSB0aGVuIGl0IHNob3VsZFxuXHRcdFx0XHRcdC8vIG5vdCBiZSByZXBsYWNlZCwgb25seSBjaGFycyB0aGF0IGFyZSBwYXJ0IG9mIHRoZVxuXHRcdFx0XHRcdC8vIGtleSBzaG91bGQgYmUgcmVwbGFjZWQuXG5cdFx0XHRcdFx0YmFzZS5zZWxlY3RPdXRlclRleHQoXG5cdFx0XHRcdFx0XHRjaGFyc0xlZnQsXG5cdFx0XHRcdFx0XHRrZXl3b3JkTGVuIC0gY2hhcnNMZWZ0IC1cblx0XHRcdFx0XHRcdFx0KC9eXFxTLy50ZXN0KGtleXByZXNzQ2hhcikgPyAxIDogMClcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0YmFzZS5pbnNlcnRIVE1MKGtleXdvcmRzW2tleXdvcmRJZHhdWzFdKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKipcblx0ICogQ29tcGFyZXMgdHdvIHJhbmdlcy5cblx0ICpcblx0ICogSWYgcmFuZ2VCIGlzIHVuZGVmaW5lZCBpdCB3aWxsIGJlIHNldCB0b1xuXHQgKiB0aGUgY3VycmVudCBzZWxlY3RlZCByYW5nZVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtSYW5nZX0gcm5nQVxuXHQgKiBAcGFyYW0gIHtSYW5nZX0gW3JuZ0JdXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBjb21wYXJlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY29tcGFyZSA9IGZ1bmN0aW9uIChybmdBLCBybmdCKSB7XG5cdFx0aWYgKCFybmdCKSB7XG5cdFx0XHRybmdCID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCFybmdBIHx8ICFybmdCKSB7XG5cdFx0XHRyZXR1cm4gIXJuZ0EgJiYgIXJuZ0I7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJuZ0EuY29tcGFyZUJvdW5kYXJ5UG9pbnRzKFJhbmdlLkVORF9UT19FTkQsIHJuZ0IpID09PSAwICYmXG5cdFx0XHRybmdBLmNvbXBhcmVCb3VuZGFyeVBvaW50cyhSYW5nZS5TVEFSVF9UT19TVEFSVCwgcm5nQikgPT09IDA7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW55IGN1cnJlbnQgc2VsZWN0aW9uXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjQuNlxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY2xlYXJcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXG5cdFx0aWYgKHNlbCkge1xuXHRcdFx0aWYgKHNlbC5yZW1vdmVBbGxSYW5nZXMpIHtcblx0XHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRcdFx0fSBlbHNlIGlmIChzZWwuZW1wdHkpIHtcblx0XHRcdFx0c2VsLmVtcHR5KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuIiwi77u/aW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vZGVmYXVsdE9wdGlvbnMuanMnO1xuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2RlZmF1bHRDb21tYW5kcy5qcyc7XG5pbXBvcnQgUGx1Z2luTWFuYWdlciBmcm9tICcuL1BsdWdpbk1hbmFnZXIuanMnO1xuaW1wb3J0IFJhbmdlSGVscGVyIGZyb20gJy4vUmFuZ2VIZWxwZXIuanMnO1xuaW1wb3J0IF90bXBsIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5pbXBvcnQgKiBhcyBicm93c2VyIGZyb20gJy4vYnJvd3Nlci5qcyc7XG5pbXBvcnQgKiBhcyBlbW90aWNvbnMgZnJvbSAnLi9lbW90aWNvbnMuanMnO1xuaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknO1xuXG52YXIgZ2xvYmFsV2luICA9IHdpbmRvdztcbnZhciBnbG9iYWxEb2MgID0gZG9jdW1lbnQ7XG5cbnZhciBJTUFHRV9NSU1FX1JFR0VYID0gL15pbWFnZVxcLyhwP2pwZT9nfGdpZnxwbmd8Ym1wKSQvaTtcblxuLyoqXG4gKiBXcmFwIGlubGluZXMgdGhhdCBhcmUgaW4gdGhlIHJvb3QgaW4gcGFyYWdyYXBocy5cbiAqXG4gKiBAcGFyYW0ge0hUTUxCb2R5RWxlbWVudH0gYm9keVxuICogQHBhcmFtIHtEb2N1bWVudH0gZG9jXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB3cmFwSW5saW5lcyhib2R5LCBkb2MpIHtcblx0dmFyIHdyYXBwZXI7XG5cblx0ZG9tLnRyYXZlcnNlKGJvZHksIGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0aWYgKGRvbS5pc0lubGluZShub2RlLCB0cnVlKSkge1xuXHRcdFx0Ly8gSWdub3JlIHRleHQgbm9kZXMgdW5sZXNzIHRoZXkgY29udGFpbiBub24td2hpdGVzcGFjZSBjaGFycyBhc1xuXHRcdFx0Ly8gd2hpdGVzcGFjZSB3aWxsIGJlIGNvbGxhcHNlZC5cblx0XHRcdC8vIElnbm9yZSBzY2VkaXRvci1pZ25vcmUgZWxlbWVudHMgdW5sZXNzIHdyYXBwaW5nIHNpYmxpbmdzXG5cdFx0XHQvLyBTaG91bGQgc3RpbGwgd3JhcCBib3RoIGlmIHdyYXBwaW5nIHNpYmxpbmdzLlxuXHRcdFx0aWYgKHdyYXBwZXIgfHwgbm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSA/XG5cdFx0XHRcdC9cXFMvLnRlc3Qobm9kZS5ub2RlVmFsdWUpIDogIWRvbS5pcyhub2RlLCAnLnNjZWRpdG9yLWlnbm9yZScpKSB7XG5cdFx0XHRcdGlmICghd3JhcHBlcikge1xuXHRcdFx0XHRcdHdyYXBwZXIgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCBkb2MpO1xuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUod3JhcHBlciwgbm9kZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3JhcHBlciwgbm9kZSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHdyYXBwZXIgPSBudWxsO1xuXHRcdH1cblx0fSwgZmFsc2UsIHRydWUpO1xufVxuXG4vKipcbiAqIFNDRWRpdG9yIC0gQSBsaWdodHdlaWdodCBXWVNJV1lHIGVkaXRvclxuICpcbiAqIEBwYXJhbSB7SFRNTFRleHRBcmVhRWxlbWVudH0gb3JpZ2luYWwgVGhlIHRleHRhcmVhIHRvIGJlIGNvbnZlcnRlZFxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJPcHRpb25zXG4gKiBAY2xhc3MgU0NFZGl0b3JcbiAqIEBuYW1lIFNDRWRpdG9yXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNDRWRpdG9yKG9yaWdpbmFsLCB1c2VyT3B0aW9ucykge1xuXHQvKipcblx0ICogQWxpYXMgb2YgdGhpc1xuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG5cdHZhciBiYXNlID0gdGhpcztcblxuXHQvKipcblx0ICogRWRpdG9yIGZvcm1hdCBsaWtlIEJCQ29kZSBvciBIVE1MXG5cdCAqL1xuXHR2YXIgZm9ybWF0O1xuXG5cdC8qKlxuXHQgKiBUaGUgZGl2IHdoaWNoIGNvbnRhaW5zIHRoZSBlZGl0b3IgYW5kIHRvb2xiYXJcblx0ICpcblx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGVkaXRvckNvbnRhaW5lcjtcblxuXHQvKipcblx0ICogTWFwIG9mIGV2ZW50cyBoYW5kbGVycyBib3VuZCB0byB0aGlzIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGV2ZW50SGFuZGxlcnMgPSB7fTtcblxuXHQvKipcblx0ICogVGhlIGVkaXRvcnMgdG9vbGJhclxuXHQgKlxuXHQgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgdG9vbGJhcjtcblxuXHQvKipcblx0ICogVGhlIGVkaXRvcnMgaWZyYW1lIHdoaWNoIHNob3VsZCBiZSBpbiBkZXNpZ24gbW9kZVxuXHQgKlxuXHQgKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgd3lzaXd5Z0VkaXRvcjtcblxuXHQvKipcblx0ICogVGhlIGVkaXRvcnMgd2luZG93XG5cdCAqXG5cdCAqIEB0eXBlIHtXaW5kb3d9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgd3lzaXd5Z1dpbmRvdztcblxuXHQvKipcblx0ICogVGhlIFdZU0lXWUcgZWRpdG9ycyBib2R5IGVsZW1lbnRcblx0ICpcblx0ICogQHR5cGUge0hUTUxCb2R5RWxlbWVudH1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciB3eXNpd3lnQm9keTtcblxuXHQvKipcblx0ICogVGhlIFdZU0lXWUcgZWRpdG9ycyBkb2N1bWVudFxuXHQgKlxuXHQgKiBAdHlwZSB7RG9jdW1lbnR9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgd3lzaXd5Z0RvY3VtZW50O1xuXG5cdC8qKlxuXHQgKiBUaGUgZWRpdG9ycyB0ZXh0YXJlYSBmb3Igdmlld2luZyBzb3VyY2Vcblx0ICpcblx0ICogQHR5cGUge0hUTUxUZXh0QXJlYUVsZW1lbnR9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgc291cmNlRWRpdG9yO1xuXG5cdC8qKlxuXHQgKiBUaGUgY3VycmVudCBkcm9wZG93blxuXHQgKlxuXHQgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgZHJvcGRvd247XG5cblx0LyoqXG5cdCAqIElmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBjb21wb3NpbmcgdGV4dCB2aWEgSU1FXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0dmFyIGlzQ29tcG9zaW5nO1xuXG5cdC8qKlxuXHQgKiBUaW1lciBmb3IgdmFsdWVDaGFuZ2VkIGtleSBoYW5kbGVyXG5cdCAqIEB0eXBlIHtudW1iZXJ9XG5cdCAqL1xuXHR2YXIgdmFsdWVDaGFuZ2VkS2V5VXBUaW1lcjtcblxuXHQvKipcblx0ICogVGhlIGVkaXRvcnMgbG9jYWxlXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgbG9jYWxlO1xuXG5cdC8qKlxuXHQgKiBTdG9yZXMgYSBjYWNoZSBvZiBwcmVsb2FkZWQgaW1hZ2VzXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB0eXBlIHtBcnJheS48SFRNTEltYWdlRWxlbWVudD59XG5cdCAqL1xuXHR2YXIgcHJlTG9hZENhY2hlID0gW107XG5cblx0LyoqXG5cdCAqIFRoZSBlZGl0b3JzIHJhbmdlSGVscGVyIGluc3RhbmNlXG5cdCAqXG5cdCAqIEB0eXBlIHtSYW5nZUhlbHBlcn1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciByYW5nZUhlbHBlcjtcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgYnV0dG9uIHN0YXRlIGhhbmRsZXJzXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheS48T2JqZWN0Pn1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciBidG5TdGF0ZUhhbmRsZXJzID0gW107XG5cblx0LyoqXG5cdCAqIFBsdWdpbiBtYW5hZ2VyIGluc3RhbmNlXG5cdCAqXG5cdCAqIEB0eXBlIHtQbHVnaW5NYW5hZ2VyfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIHBsdWdpbk1hbmFnZXI7XG5cblx0LyoqXG5cdCAqIFRoZSBjdXJyZW50IG5vZGUgY29udGFpbmluZyB0aGUgc2VsZWN0aW9uL2NhcmV0XG5cdCAqXG5cdCAqIEB0eXBlIHtOb2RlfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGN1cnJlbnROb2RlO1xuXG5cdC8qKlxuXHQgKiBUaGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBjdXJyZW50IG5vZGVcblx0ICpcblx0ICogQHR5cGUge25vZGV9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgY3VycmVudEJsb2NrTm9kZTtcblxuXHQvKipcblx0ICogVGhlIGN1cnJlbnQgbm9kZSBzZWxlY3Rpb24vY2FyZXRcblx0ICpcblx0ICogQHR5cGUge09iamVjdH1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciBjdXJyZW50U2VsZWN0aW9uO1xuXG5cdC8qKlxuXHQgKiBVc2VkIHRvIG1ha2Ugc3VyZSBvbmx5IDEgc2VsZWN0aW9uIGNoYW5nZWRcblx0ICogY2hlY2sgaXMgY2FsbGVkIGV2ZXJ5IDEwMG1zLlxuXHQgKlxuXHQgKiBIZWxwcyBpbXByb3ZlIHBlcmZvcm1hbmNlIGFzIGl0IGlzIGNoZWNrZWQgYSBsb3QuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nO1xuXG5cdC8qKlxuXHQgKiBJZiBjb250ZW50IGlzIHJlcXVpcmVkIChlcXVpdmFsZW50IHRvIHRoZSBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUpXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGlzUmVxdWlyZWQ7XG5cblx0LyoqXG5cdCAqIFRoZSBpbmxpbmUgQ1NTIHN0eWxlIGVsZW1lbnQuIFdpbGwgYmUgdW5kZWZpbmVkXG5cdCAqIHVudGlsIGNzcygpIGlzIGNhbGxlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXG5cdCAqXG5cdCAqIEB0eXBlIHtIVE1MU3R5bGVFbGVtZW50fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGlubGluZUNzcztcblxuXHQvKipcblx0ICogT2JqZWN0IGNvbnRhaW5pbmcgYSBsaXN0IG9mIHNob3J0Y3V0IGhhbmRsZXJzXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgc2hvcnRjdXRIYW5kbGVycyA9IHt9O1xuXG5cdC8qKlxuXHQgKiBUaGUgbWluIGFuZCBtYXggaGVpZ2h0cyB0aGF0IGF1dG9FeHBhbmQgc2hvdWxkIHN0YXkgd2l0aGluXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgYXV0b0V4cGFuZEJvdW5kcztcblxuXHQvKipcblx0ICogVGltZW91dCBmb3IgdGhlIGF1dG9FeHBhbmQgZnVuY3Rpb24gdG8gdGhyb3R0bGUgY2FsbHNcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciBhdXRvRXhwYW5kVGhyb3R0bGU7XG5cblx0LyoqXG5cdCAqIENhY2hlIG9mIHRoZSBjdXJyZW50IHRvb2xiYXIgYnV0dG9uc1xuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIHRvb2xiYXJCdXR0b25zID0ge307XG5cblx0LyoqXG5cdCAqIExhc3Qgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSBtYXhpbWl6aW5nIHNvXG5cdCAqIGl0IGNhbiBiZSByZXN0b3JlZCB3aGVuIGZpbmlzaGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIG1heGltaXplU2Nyb2xsUG9zaXRpb247XG5cblx0LyoqXG5cdCAqIFN0b3JlcyB0aGUgY29udGVudHMgd2hpbGUgYSBwYXN0ZSBpcyB0YWtpbmcgcGxhY2UuXG5cdCAqXG5cdCAqIE5lZWRlZCB0byBzdXBwb3J0IGJyb3dzZXJzIHRoYXQgbGFjayBjbGlwYm9hcmQgQVBJIHN1cHBvcnQuXG5cdCAqXG5cdCAqIEB0eXBlIHs/RG9jdW1lbnRGcmFnbWVudH1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciBwYXN0ZUNvbnRlbnRGcmFnbWVudDtcblxuXHQvKipcblx0ICogQWxsIHRoZSBlbW90aWNvbnMgZnJvbSBkcm9wZG93biwgbW9yZSBhbmQgaGlkZGVuIGNvbWJpbmVkXG5cdCAqIGFuZCB3aXRoIHRoZSBlbW90aWNvbnMgcm9vdCBzZXRcblx0ICpcblx0ICogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGFsbEVtb3RpY29ucyA9IHt9O1xuXG5cdC8qKlxuXHQgKiBDdXJyZW50IGljb24gc2V0IGlmIGFueVxuXHQgKlxuXHQgKiBAdHlwZSB7P09iamVjdH1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciBpY29ucztcblxuXHQvKipcblx0ICogUHJpdmF0ZSBmdW5jdGlvbnNcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhclx0aW5pdCxcblx0XHRyZXBsYWNlRW1vdGljb25zLFxuXHRcdGhhbmRsZUNvbW1hbmQsXG5cdFx0aW5pdEVkaXRvcixcblx0XHRpbml0TG9jYWxlLFxuXHRcdGluaXRUb29sQmFyLFxuXHRcdGluaXRPcHRpb25zLFxuXHRcdGluaXRFdmVudHMsXG5cdFx0aW5pdFJlc2l6ZSxcblx0XHRpbml0RW1vdGljb25zLFxuXHRcdGhhbmRsZVBhc3RlRXZ0LFxuXHRcdGhhbmRsZUN1dENvcHlFdnQsXG5cdFx0aGFuZGxlUGFzdGVEYXRhLFxuXHRcdGhhbmRsZUtleURvd24sXG5cdFx0aGFuZGxlQmFja1NwYWNlLFxuXHRcdGhhbmRsZUtleVByZXNzLFxuXHRcdGhhbmRsZUZvcm1SZXNldCxcblx0XHRoYW5kbGVNb3VzZURvd24sXG5cdFx0aGFuZGxlQ29tcG9zaXRpb24sXG5cdFx0aGFuZGxlRXZlbnQsXG5cdFx0aGFuZGxlRG9jdW1lbnRDbGljayxcblx0XHR1cGRhdGVUb29sQmFyLFxuXHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMsXG5cdFx0c291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0LFxuXHRcdGFwcGVuZE5ld0xpbmUsXG5cdFx0Y2hlY2tTZWxlY3Rpb25DaGFuZ2VkLFxuXHRcdGNoZWNrTm9kZUNoYW5nZWQsXG5cdFx0YXV0b2ZvY3VzLFxuXHRcdGVtb3RpY29uc0tleVByZXNzLFxuXHRcdGVtb3RpY29uc0NoZWNrV2hpdGVzcGFjZSxcblx0XHRjdXJyZW50U3R5bGVkQmxvY2tOb2RlLFxuXHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQsXG5cdFx0dmFsdWVDaGFuZ2VkQmx1cixcblx0XHR2YWx1ZUNoYW5nZWRLZXlVcCxcblx0XHRhdXRvVXBkYXRlLFxuXHRcdGF1dG9FeHBhbmQ7XG5cblx0LyoqXG5cdCAqIEFsbCB0aGUgY29tbWFuZHMgc3VwcG9ydGVkIGJ5IHRoZSBlZGl0b3Jcblx0ICogQG5hbWUgY29tbWFuZHNcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5jb21tYW5kcyA9IHV0aWxzXG5cdFx0LmV4dGVuZCh0cnVlLCB7fSwgKHVzZXJPcHRpb25zLmNvbW1hbmRzIHx8IGRlZmF1bHRDb21tYW5kcykpO1xuXG5cdC8qKlxuXHQgKiBPcHRpb25zIGZvciB0aGlzIGVkaXRvciBpbnN0YW5jZVxuXHQgKiBAbmFtZSBvcHRzXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdHZhciBvcHRpb25zID0gYmFzZS5vcHRzID0gdXRpbHMuZXh0ZW5kKFxuXHRcdHRydWUsIHt9LCBkZWZhdWx0T3B0aW9ucywgdXNlck9wdGlvbnNcblx0KTtcblxuXHQvLyBEb24ndCBkZWVwIGV4dGVuZCBlbW90aWNvbnMgKGZpeGVzICM1NjUpXG5cdGJhc2Uub3B0cy5lbW90aWNvbnMgPSB1c2VyT3B0aW9ucy5lbW90aWNvbnMgfHwgZGVmYXVsdE9wdGlvbnMuZW1vdGljb25zO1xuXG5cdGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzKSkge1xuXHRcdG9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHMgPSBbXTtcblx0fVxuXHRvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzLnB1c2goJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLycpO1xuXG5cdC8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5IGZvciBlYWNoIGVkaXRvciBpbnN0YW5jZSBzbyBjYW5cblx0Ly8gaGF2ZSBkaWZmZXJlbnQgYWxsb3dlZCBpZnJhbWUgVVJMc1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbmV3LWNhcFxuXHR2YXIgZG9tUHVyaWZ5ID0gRE9NUHVyaWZ5KCk7XG5cblx0Ly8gQWxsb3cgaWZyYW1lcyBmb3IgdGhpbmdzIGxpa2UgWW91VHViZSwgc2VlOlxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vY3VyZTUzL0RPTVB1cmlmeS9pc3N1ZXMvMzQwI2lzc3VlY29tbWVudC02NzA3NTg5ODBcblx0ZG9tUHVyaWZ5LmFkZEhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBmdW5jdGlvbiAobm9kZSwgZGF0YSkge1xuXHRcdHZhciBhbGxvd2VkVXJscyA9IG9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHM7XG5cblx0XHRpZiAoZGF0YS50YWdOYW1lID09PSAnaWZyYW1lJykge1xuXHRcdFx0dmFyIHNyYyA9IGRvbS5hdHRyKG5vZGUsICdzcmMnKSB8fCAnJztcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxvd2VkVXJscy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgdXJsID0gYWxsb3dlZFVybHNbaV07XG5cblx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHVybCkgJiYgc3JjLnN1YnN0cigwLCB1cmwubGVuZ3RoKSA9PT0gdXJsKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHJlZ2V4XG5cdFx0XHRcdGlmICh1cmwudGVzdCAmJiB1cmwudGVzdChzcmMpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5vIG1hdGNoIHNvIHJlbW92ZVxuXHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIENvbnZlcnQgdGFyZ2V0IGF0dHJpYnV0ZSBpbnRvIGRhdGEtc2NlLXRhcmdldCBhdHRyaWJ1dGVzIHNvIFhIVE1MIGZvcm1hdFxuXHQvLyBjYW4gYWxsb3cgdGhlbVxuXHRkb21QdXJpZnkuYWRkSG9vaygnYWZ0ZXJTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBmdW5jdGlvbiAobm9kZSkge1xuXHRcdGlmICgndGFyZ2V0JyBpbiBub2RlKSB7XG5cdFx0XHRkb20uYXR0cihub2RlLCAnZGF0YS1zY2UtdGFyZ2V0JywgZG9tLmF0dHIobm9kZSwgJ3RhcmdldCcpKTtcblx0XHR9XG5cblx0XHRkb20ucmVtb3ZlQXR0cihub2RlLCAndGFyZ2V0Jyk7XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBTYW5pdGl6ZSBIVE1MIHRvIGF2b2lkIFhTU1xuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGh0bWxcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIHNhbml0aXplKGh0bWwpIHtcblx0XHRjb25zdCBhbGxvd2VkVGFncyA9IFsnaWZyYW1lJ10uY29uY2F0KG9wdGlvbnMuYWxsb3dlZFRhZ3MpO1xuXHRcdGNvbnN0IGFsbG93ZWRBdHRycyA9IFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddXG5cdFx0XHQuY29uY2F0KG9wdGlvbnMuYWxsb3dlZEF0dHJpYnV0ZXMpO1xuXG5cdFx0cmV0dXJuIGRvbVB1cmlmeS5zYW5pdGl6ZShodG1sLCB7XG5cdFx0XHRBRERfVEFHUzogYWxsb3dlZFRhZ3MsXG5cdFx0XHRBRERfQVRUUjogYWxsb3dlZEF0dHJzXG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGlmcmFtZSBhbmQgdGV4dGFyZWFcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0b3JpZ2luYWwuX3NjZWRpdG9yID0gYmFzZTtcblxuXHRcdC8vIExvYWQgbG9jYWxlXG5cdFx0aWYgKG9wdGlvbnMubG9jYWxlICYmIG9wdGlvbnMubG9jYWxlICE9PSAnZW4nKSB7XG5cdFx0XHRpbml0TG9jYWxlKCk7XG5cdFx0fVxuXG5cdFx0ZWRpdG9yQ29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcblx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLWNvbnRhaW5lcidcblx0XHR9KTtcblxuXHRcdGRvbS5pbnNlcnRCZWZvcmUoZWRpdG9yQ29udGFpbmVyLCBvcmlnaW5hbCk7XG5cdFx0ZG9tLmNzcyhlZGl0b3JDb250YWluZXIsICd6LWluZGV4Jywgb3B0aW9ucy56SW5kZXgpO1xuXG5cdFx0aXNSZXF1aXJlZCA9IG9yaWdpbmFsLnJlcXVpcmVkO1xuXHRcdG9yaWdpbmFsLnJlcXVpcmVkID0gZmFsc2U7XG5cblx0XHR2YXIgRm9ybWF0Q3RvciA9IFNDRWRpdG9yLmZvcm1hdHNbb3B0aW9ucy5mb3JtYXRdO1xuXHRcdGZvcm1hdCA9IEZvcm1hdEN0b3IgPyBuZXcgRm9ybWF0Q3RvcigpIDoge307XG5cdFx0Lypcblx0XHQgKiBQbHVnaW5zIHNob3VsZCBiZSBpbml0aWFsaXplZCBiZWZvcmUgdGhlIGZvcm1hdHRlcnMgc2luY2Vcblx0XHQgKiB0aGV5IG1heSB3aXNoIHRvIGFkZCBvciBjaGFuZ2UgZm9ybWF0dGluZyBoYW5kbGVycyBhbmRcblx0XHQgKiBzaW5jZSB0aGUgYmJjb2RlIGZvcm1hdCBjYWNoZXMgaXRzIGhhbmRsZXJzLFxuXHRcdCAqIHN1Y2ggY2hhbmdlcyBtdXN0IGJlIGRvbmUgZmlyc3QuXG5cdFx0ICovXG5cdFx0cGx1Z2luTWFuYWdlciA9IG5ldyBQbHVnaW5NYW5hZ2VyKGJhc2UpO1xuXHRcdChvcHRpb25zLnBsdWdpbnMgfHwgJycpLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG5cdFx0XHRwbHVnaW5NYW5hZ2VyLnJlZ2lzdGVyKHBsdWdpbi50cmltKCkpO1xuXHRcdH0pO1xuXHRcdGlmICgnaW5pdCcgaW4gZm9ybWF0KSB7XG5cdFx0XHRmb3JtYXQuaW5pdC5jYWxsKGJhc2UpO1xuXHRcdH1cblxuXHRcdC8vIGNyZWF0ZSB0aGUgZWRpdG9yXG5cdFx0aW5pdEVtb3RpY29ucygpO1xuXHRcdGluaXRUb29sQmFyKCk7XG5cdFx0aW5pdEVkaXRvcigpO1xuXHRcdGluaXRPcHRpb25zKCk7XG5cdFx0aW5pdEV2ZW50cygpO1xuXG5cdFx0Ly8gZm9yY2UgaW50byBzb3VyY2UgbW9kZSBpZiBpcyBhIGJyb3dzZXIgdGhhdCBjYW4ndCBoYW5kbGVcblx0XHQvLyBmdWxsIGVkaXRpbmdcblx0XHRpZiAoIWJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkKSB7XG5cdFx0XHRiYXNlLnRvZ2dsZVNvdXJjZU1vZGUoKTtcblx0XHR9XG5cblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XG5cblx0XHR2YXIgbG9hZGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZG9tLm9mZihnbG9iYWxXaW4sICdsb2FkJywgbG9hZGVkKTtcblxuXHRcdFx0aWYgKG9wdGlvbnMuYXV0b2ZvY3VzKSB7XG5cdFx0XHRcdGF1dG9mb2N1cyghIW9wdGlvbnMuYXV0b2ZvY3VzRW5kKTtcblx0XHRcdH1cblxuXHRcdFx0YXV0b0V4cGFuZCgpO1xuXHRcdFx0YXBwZW5kTmV3TGluZSgpO1xuXHRcdFx0Ly8gVE9ETzogdXNlIGVkaXRvciBkb2MgYW5kIHdpbmRvdz9cblx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncmVhZHknKTtcblx0XHRcdGlmICgnb25SZWFkeScgaW4gZm9ybWF0KSB7XG5cdFx0XHRcdGZvcm1hdC5vblJlYWR5LmNhbGwoYmFzZSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRkb20ub24oZ2xvYmFsV2luLCAnbG9hZCcsIGxvYWRlZCk7XG5cdFx0aWYgKGdsb2JhbERvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG5cdFx0XHRsb2FkZWQoKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEluaXQgdGhlIGxvY2FsZSB2YXJpYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbG9jYWxlIGlmIHBvc3NpYmxlXG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm4gdm9pZFxuXHQgKi9cblx0aW5pdExvY2FsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgbGFuZztcblxuXHRcdGxvY2FsZSA9IFNDRWRpdG9yLmxvY2FsZVtvcHRpb25zLmxvY2FsZV07XG5cblx0XHRpZiAoIWxvY2FsZSkge1xuXHRcdFx0bGFuZyAgID0gb3B0aW9ucy5sb2NhbGUuc3BsaXQoJy0nKTtcblx0XHRcdGxvY2FsZSA9IFNDRWRpdG9yLmxvY2FsZVtsYW5nWzBdXTtcblx0XHR9XG5cblx0XHQvLyBMb2NhbGUgRGF0ZVRpbWUgZm9ybWF0IG92ZXJyaWRlcyBhbnkgc3BlY2lmaWVkIGluIHRoZSBvcHRpb25zXG5cdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGUuZGF0ZUZvcm1hdCkge1xuXHRcdFx0b3B0aW9ucy5kYXRlRm9ybWF0ID0gbG9jYWxlLmRhdGVGb3JtYXQ7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0aW5pdEVkaXRvciA9IGZ1bmN0aW9uICgpIHtcblx0XHRzb3VyY2VFZGl0b3IgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cdFx0d3lzaXd5Z0VkaXRvciA9IGRvbS5jcmVhdGVFbGVtZW50KCdpZnJhbWUnLCB7XG5cdFx0XHRmcmFtZWJvcmRlcjogMCxcblx0XHRcdGFsbG93ZnVsbHNjcmVlbjogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0Lypcblx0XHQgKiBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgcmlnaHQgYWZ0ZXIgdGhleSBhcmUgY3JlYXRlZCBiZWNhdXNlLFxuXHRcdCAqIGZvciBhbnkgcmVhc29uLCB0aGUgdXNlciBtYXkgbm90IHdhbnQgdGhlIHZhbHVlIHRvIGJlIHRpbmtlcmVkXG5cdFx0ICogYnkgYW55IGZpbHRlcnMuXG5cdFx0ICovXG5cdFx0aWYgKG9wdGlvbnMuc3RhcnRJblNvdXJjZU1vZGUpIHtcblx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJyk7XG5cdFx0XHRkb20uaGlkZSh3eXNpd3lnRWRpdG9yKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3d5c2l3eWdNb2RlJyk7XG5cdFx0XHRkb20uaGlkZShzb3VyY2VFZGl0b3IpO1xuXHRcdH1cblxuXHRcdGlmICghb3B0aW9ucy5zcGVsbGNoZWNrKSB7XG5cdFx0XHRkb20uYXR0cihlZGl0b3JDb250YWluZXIsICdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7XG5cdFx0fVxuXG5cdFx0aWYgKGdsb2JhbFdpbi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcblx0XHRcdGRvbS5hdHRyKHd5c2l3eWdFZGl0b3IsICdzcmMnLCAnYWJvdXQ6YmxhbmsnKTtcblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIGVkaXRvciB0byB0aGUgY29udGFpbmVyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgd3lzaXd5Z0VkaXRvcik7XG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgc291cmNlRWRpdG9yKTtcblxuXHRcdC8vIFRPRE86IG1ha2UgdGhpcyBvcHRpb25hbCBzb21laG93XG5cdFx0YmFzZS5kaW1lbnNpb25zKFxuXHRcdFx0b3B0aW9ucy53aWR0aCB8fCBkb20ud2lkdGgob3JpZ2luYWwpLFxuXHRcdFx0b3B0aW9ucy5oZWlnaHQgfHwgZG9tLmhlaWdodChvcmlnaW5hbClcblx0XHQpO1xuXG5cdFx0Ly8gQWRkIGlvcyB0byBIVE1MIHNvIGNhbiBhcHBseSBDU1MgZml4IHRvIG9ubHkgaXRcblx0XHR2YXIgY2xhc3NOYW1lID0gYnJvd3Nlci5pb3MgPyAnIGlvcycgOiAnJztcblxuXHRcdHd5c2l3eWdEb2N1bWVudCA9IHd5c2l3eWdFZGl0b3IuY29udGVudERvY3VtZW50O1xuXHRcdHd5c2l3eWdEb2N1bWVudC5vcGVuKCk7XG5cdFx0d3lzaXd5Z0RvY3VtZW50LndyaXRlKF90bXBsKCdodG1sJywge1xuXHRcdFx0YXR0cnM6ICcgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiJyxcblx0XHRcdHNwZWxsY2hlY2s6IG9wdGlvbnMuc3BlbGxjaGVjayA/ICcnIDogJ3NwZWxsY2hlY2s9XCJmYWxzZVwiJyxcblx0XHRcdGNoYXJzZXQ6IG9wdGlvbnMuY2hhcnNldCxcblx0XHRcdHN0eWxlOiBvcHRpb25zLnN0eWxlXG5cdFx0fSkpO1xuXHRcdHd5c2l3eWdEb2N1bWVudC5jbG9zZSgpO1xuXG5cdFx0d3lzaXd5Z0JvZHkgPSB3eXNpd3lnRG9jdW1lbnQuYm9keTtcblx0XHR3eXNpd3lnV2luZG93ID0gd3lzaXd5Z0VkaXRvci5jb250ZW50V2luZG93O1xuXG5cdFx0YmFzZS5yZWFkT25seSghIW9wdGlvbnMucmVhZE9ubHkpO1xuXG5cdFx0Ly8gaWZyYW1lIG92ZXJmbG93IGZpeCBmb3IgaU9TXG5cdFx0aWYgKGJyb3dzZXIuaW9zKSB7XG5cdFx0XHRkb20uaGVpZ2h0KHd5c2l3eWdCb2R5LCAnMTAwJScpO1xuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBiYXNlLmZvY3VzKTtcblx0XHR9XG5cblx0XHR2YXIgdGFiSW5kZXggPSBkb20uYXR0cihvcmlnaW5hbCwgJ3RhYmluZGV4Jyk7XG5cdFx0ZG9tLmF0dHIoc291cmNlRWRpdG9yLCAndGFiaW5kZXgnLCB0YWJJbmRleCk7XG5cdFx0ZG9tLmF0dHIod3lzaXd5Z0VkaXRvciwgJ3RhYmluZGV4JywgdGFiSW5kZXgpO1xuXG5cdFx0cmFuZ2VIZWxwZXIgPSBuZXcgUmFuZ2VIZWxwZXIod3lzaXd5Z1dpbmRvdywgbnVsbCwgc2FuaXRpemUpO1xuXG5cdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXG5cdFx0ZG9tLmhpZGUob3JpZ2luYWwpO1xuXHRcdGJhc2UudmFsKG9yaWdpbmFsLnZhbHVlKTtcblxuXHRcdHZhciBwbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXIgfHxcblx0XHRcdGRvbS5hdHRyKG9yaWdpbmFsLCAncGxhY2Vob2xkZXInKTtcblxuXHRcdGlmIChwbGFjZWhvbGRlcikge1xuXHRcdFx0c291cmNlRWRpdG9yLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG5cdFx0XHRkb20uYXR0cih3eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogSW5pdGlhbGlzZXMgb3B0aW9uc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0aW5pdE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gYXV0by11cGRhdGUgb3JpZ2luYWwgdGV4dGJveCBvbiBibHVyIGlmIG9wdGlvbiBzZXQgdG8gdHJ1ZVxuXHRcdGlmIChvcHRpb25zLmF1dG9VcGRhdGUpIHtcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2JsdXInLCBhdXRvVXBkYXRlKTtcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdibHVyJywgYXV0b1VwZGF0ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKG9wdGlvbnMucnRsID09PSBudWxsKSB7XG5cdFx0XHRvcHRpb25zLnJ0bCA9IGRvbS5jc3Moc291cmNlRWRpdG9yLCAnZGlyZWN0aW9uJykgPT09ICdydGwnO1xuXHRcdH1cblxuXHRcdGJhc2UucnRsKCEhb3B0aW9ucy5ydGwpO1xuXG5cdFx0aWYgKG9wdGlvbnMuYXV0b0V4cGFuZCkge1xuXHRcdFx0Ly8gTmVlZCB0byB1cGRhdGUgd2hlbiBpbWFnZXMgKG9yIGFueXRoaW5nIGVsc2UpIGxvYWRzXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdsb2FkJywgYXV0b0V4cGFuZCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnaW5wdXQga2V5dXAnLCBhdXRvRXhwYW5kKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5yZXNpemVFbmFibGVkKSB7XG5cdFx0XHRpbml0UmVzaXplKCk7XG5cdFx0fVxuXG5cdFx0ZG9tLmF0dHIoZWRpdG9yQ29udGFpbmVyLCAnaWQnLCBvcHRpb25zLmlkKTtcblx0XHRiYXNlLmVtb3RpY29ucyhvcHRpb25zLmVtb3RpY29uc0VuYWJsZWQpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXNlcyBldmVudHNcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGluaXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGZvcm0gPSBvcmlnaW5hbC5mb3JtO1xuXHRcdHZhciBjb21wb3NpdGlvbkV2ZW50cyA9ICdjb21wb3NpdGlvbnN0YXJ0IGNvbXBvc2l0aW9uZW5kJztcblx0XHR2YXIgZXZlbnRzVG9Gb3J3YXJkID1cblx0XHRcdCdrZXlkb3duIGtleXVwIGtleXByZXNzIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgaW5wdXQnO1xuXHRcdHZhciBjaGVja1NlbGVjdGlvbkV2ZW50cyA9ICdvbnNlbGVjdGlvbmNoYW5nZScgaW4gd3lzaXd5Z0RvY3VtZW50ID9cblx0XHRcdCdzZWxlY3Rpb25jaGFuZ2UnIDpcblx0XHRcdCdrZXl1cCBmb2N1cyBibHVyIGNvbnRleHRtZW51IG1vdXNldXAgdG91Y2hlbmQgY2xpY2snO1xuXG5cdFx0ZG9tLm9uKGdsb2JhbERvYywgJ2NsaWNrJywgaGFuZGxlRG9jdW1lbnRDbGljayk7XG5cblx0XHRpZiAoZm9ybSkge1xuXHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIGhhbmRsZUZvcm1SZXNldCk7XG5cdFx0XHRkb20ub24oZm9ybSwgJ3N1Ym1pdCcsIGJhc2UudXBkYXRlT3JpZ2luYWwsIGRvbS5FVkVOVF9DQVBUVVJFKTtcblx0XHR9XG5cblx0XHRkb20ub24od2luZG93LCAncGFnZWhpZGUnLCBiYXNlLnVwZGF0ZU9yaWdpbmFsKTtcblx0XHRkb20ub24od2luZG93LCAncGFnZXNob3cnLCBoYW5kbGVGb3JtUmVzZXQpO1xuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgaGFuZGxlS2V5UHJlc3MpO1xuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXlkb3duJywgaGFuZGxlQmFja1NwYWNlKTtcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIGFwcGVuZE5ld0xpbmUpO1xuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2JsdXInLCB2YWx1ZUNoYW5nZWRCbHVyKTtcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIHZhbHVlQ2hhbmdlZEtleVVwKTtcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdwYXN0ZScsIGhhbmRsZVBhc3RlRXZ0KTtcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdjdXQgY29weScsIGhhbmRsZUN1dENvcHlFdnQpO1xuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgY29tcG9zaXRpb25FdmVudHMsIGhhbmRsZUNvbXBvc2l0aW9uKTtcblx0XHRkb20ub24od3lzaXd5Z0JvZHksIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgZXZlbnRzVG9Gb3J3YXJkLCBoYW5kbGVFdmVudCk7XG5cblx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNDb21wYXQgJiYgZ2xvYmFsV2luLmdldFNlbGVjdGlvbikge1xuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCBlbW90aWNvbnNDaGVja1doaXRlc3BhY2UpO1xuXHRcdH1cblxuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIWJhc2UudmFsKCkpIHtcblx0XHRcdFx0ZG9tLmFkZENsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2ZvY3VzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcblx0XHR9KTtcblxuXHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdibHVyJywgdmFsdWVDaGFuZ2VkQmx1cik7XG5cdFx0ZG9tLm9uKHNvdXJjZUVkaXRvciwgJ2tleXVwJywgdmFsdWVDaGFuZ2VkS2V5VXApO1xuXHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG5cdFx0ZG9tLm9uKHNvdXJjZUVkaXRvciwgY29tcG9zaXRpb25FdmVudHMsIGhhbmRsZUNvbXBvc2l0aW9uKTtcblx0XHRkb20ub24oc291cmNlRWRpdG9yLCBldmVudHNUb0ZvcndhcmQsIGhhbmRsZUV2ZW50KTtcblxuXHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsICdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24pO1xuXHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xuXHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsICdrZXl1cCcsIGFwcGVuZE5ld0xpbmUpO1xuXG5cdFx0ZG9tLm9uKGVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnLCBjaGVja05vZGVDaGFuZ2VkKTtcblx0XHRkb20ub24oZWRpdG9yQ29udGFpbmVyLCAnc2VsZWN0aW9uY2hhbmdlZCcsIHVwZGF0ZUFjdGl2ZUJ1dHRvbnMpO1xuXHRcdC8vIEN1c3RvbSBldmVudHMgdG8gZm9yd2FyZFxuXHRcdGRvbS5vbihcblx0XHRcdGVkaXRvckNvbnRhaW5lcixcblx0XHRcdCdzZWxlY3Rpb25jaGFuZ2VkIHZhbHVlY2hhbmdlZCBub2RlY2hhbmdlZCBwYXN0ZXJhdyBwYXN0ZScsXG5cdFx0XHRoYW5kbGVFdmVudFxuXHRcdCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgdGhlIHRvb2xiYXIgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIGNvbnRhaW5lclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0aW5pdFRvb2xCYXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyXHRncm91cCxcblx0XHRcdGNvbW1hbmRzID0gYmFzZS5jb21tYW5kcyxcblx0XHRcdGV4Y2x1ZGUgID0gKG9wdGlvbnMudG9vbGJhckV4Y2x1ZGUgfHwgJycpLnNwbGl0KCcsJyksXG5cdFx0XHRncm91cHMgICA9IG9wdGlvbnMudG9vbGJhci5zcGxpdCgnfCcpO1xuXG5cdFx0dG9vbGJhciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG5cdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci10b29sYmFyJyxcblx0XHRcdHVuc2VsZWN0YWJsZTogJ29uJ1xuXHRcdH0pO1xuXG5cdFx0aWYgKG9wdGlvbnMuaWNvbnMgaW4gU0NFZGl0b3IuaWNvbnMpIHtcblx0XHRcdGljb25zID0gbmV3IFNDRWRpdG9yLmljb25zW29wdGlvbnMuaWNvbnNdKCk7XG5cdFx0fVxuXG5cdFx0dXRpbHMuZWFjaChncm91cHMsIGZ1bmN0aW9uIChfLCBtZW51SXRlbXMpIHtcblx0XHRcdGdyb3VwID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcblx0XHRcdFx0Y2xhc3NOYW1lOiAnc2NlZGl0b3ItZ3JvdXAnXG5cdFx0XHR9KTtcblxuXHRcdFx0dXRpbHMuZWFjaChtZW51SXRlbXMuc3BsaXQoJywnKSwgZnVuY3Rpb24gKF8sIGNvbW1hbmROYW1lKSB7XG5cdFx0XHRcdHZhclx0YnV0dG9uLCBzaG9ydGN1dCxcblx0XHRcdFx0XHRjb21tYW5kICA9IGNvbW1hbmRzW2NvbW1hbmROYW1lXTtcblxuXHRcdFx0XHQvLyBUaGUgY29tbWFuZE5hbWUgbXVzdCBiZSBhIHZhbGlkIGNvbW1hbmQgYW5kIG5vdCBleGNsdWRlZFxuXHRcdFx0XHRpZiAoIWNvbW1hbmQgfHwgZXhjbHVkZS5pbmRleE9mKGNvbW1hbmROYW1lKSA+IC0xKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2hvcnRjdXQgPSBjb21tYW5kLnNob3J0Y3V0O1xuXHRcdFx0XHRidXR0b24gICA9IF90bXBsKCd0b29sYmFyQnV0dG9uJywge1xuXHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxuXHRcdFx0XHRcdGRpc3BOYW1lOiBiYXNlLl8oY29tbWFuZC5uYW1lIHx8XG5cdFx0XHRcdFx0XHRcdGNvbW1hbmQudG9vbHRpcCB8fCBjb21tYW5kTmFtZSlcblx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcblxuXHRcdFx0XHRpZiAoaWNvbnMgJiYgaWNvbnMuY3JlYXRlKSB7XG5cdFx0XHRcdFx0dmFyIGljb24gPSBpY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpO1xuXHRcdFx0XHRcdGlmIChpY29uKSB7XG5cdFx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGljb25zLmNyZWF0ZShjb21tYW5kTmFtZSksXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5maXJzdENoaWxkKTtcblx0XHRcdFx0XHRcdGRvbS5hZGRDbGFzcyhidXR0b24sICdoYXMtaWNvbicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJ1dHRvbi5fc2NlVHh0TW9kZSA9ICEhY29tbWFuZC50eHRFeGVjO1xuXHRcdFx0XHRidXR0b24uX3NjZVd5c2l3eWdNb2RlID0gISFjb21tYW5kLmV4ZWM7XG5cdFx0XHRcdGRvbS50b2dnbGVDbGFzcyhidXR0b24sICdkaXNhYmxlZCcsICFjb21tYW5kLmV4ZWMpO1xuXHRcdFx0XHRkb20ub24oYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmICghZG9tLmhhc0NsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJykpIHtcblx0XHRcdFx0XHRcdGhhbmRsZUNvbW1hbmQoYnV0dG9uLCBjb21tYW5kKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0Ly8gUHJldmVudCBlZGl0b3IgbG9zaW5nIGZvY3VzIHdoZW4gYnV0dG9uIGNsaWNrZWRcblx0XHRcdFx0ZG9tLm9uKGJ1dHRvbiwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoY29tbWFuZC50b29sdGlwKSB7XG5cdFx0XHRcdFx0ZG9tLmF0dHIoYnV0dG9uLCAndGl0bGUnLFxuXHRcdFx0XHRcdFx0YmFzZS5fKGNvbW1hbmQudG9vbHRpcCkgK1xuXHRcdFx0XHRcdFx0XHQoc2hvcnRjdXQgPyAnICgnICsgc2hvcnRjdXQgKyAnKScgOiAnJylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNob3J0Y3V0KSB7XG5cdFx0XHRcdFx0YmFzZS5hZGRTaG9ydGN1dChzaG9ydGN1dCwgY29tbWFuZE5hbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNvbW1hbmQuc3RhdGUpIHtcblx0XHRcdFx0XHRidG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xuXHRcdFx0XHRcdFx0bmFtZTogY29tbWFuZE5hbWUsXG5cdFx0XHRcdFx0XHRzdGF0ZTogY29tbWFuZC5zdGF0ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHQvLyBleGVjIHN0cmluZyBjb21tYW5kcyBjYW4gYmUgcGFzc2VkIHRvIHF1ZXJ5Q29tbWFuZFN0YXRlXG5cdFx0XHRcdH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY29tbWFuZC5leGVjKSkge1xuXHRcdFx0XHRcdGJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcblx0XHRcdFx0XHRcdHN0YXRlOiBjb21tYW5kLmV4ZWNcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChncm91cCwgYnV0dG9uKTtcblx0XHRcdFx0dG9vbGJhckJ1dHRvbnNbY29tbWFuZE5hbWVdID0gYnV0dG9uO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEV4Y2x1ZGUgZW1wdHkgZ3JvdXBzXG5cdFx0XHRpZiAoZ3JvdXAuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodG9vbGJhciwgZ3JvdXApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gQXBwZW5kIHRoZSB0b29sYmFyIHRvIHRoZSB0b29sYmFyQ29udGFpbmVyIG9wdGlvbiBpZiBnaXZlblxuXHRcdGRvbS5hcHBlbmRDaGlsZChvcHRpb25zLnRvb2xiYXJDb250YWluZXIgfHwgZWRpdG9yQ29udGFpbmVyLCB0b29sYmFyKTtcblx0fTtcblxuXHQvKipcblx0ICogQ3JlYXRlcyB0aGUgcmVzaXplci5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdGluaXRSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyXHRtaW5IZWlnaHQsIG1heEhlaWdodCwgbWluV2lkdGgsIG1heFdpZHRoLFxuXHRcdFx0bW91c2VNb3ZlRnVuYywgbW91c2VVcEZ1bmMsXG5cdFx0XHRncmlwICAgICAgICA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XG5cdFx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLWdyaXAnXG5cdFx0XHR9KSxcblx0XHRcdC8vIENvdmVyIGlzIHVzZWQgdG8gY292ZXIgdGhlIGVkaXRvciBpZnJhbWUgc28gZG9jdW1lbnRcblx0XHRcdC8vIHN0aWxsIGdldHMgbW91c2UgbW92ZSBldmVudHNcblx0XHRcdGNvdmVyICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcblx0XHRcdFx0Y2xhc3NOYW1lOiAnc2NlZGl0b3ItcmVzaXplLWNvdmVyJ1xuXHRcdFx0fSksXG5cdFx0XHRtb3ZlRXZlbnRzICA9ICd0b3VjaG1vdmUgbW91c2Vtb3ZlJyxcblx0XHRcdGVuZEV2ZW50cyAgID0gJ3RvdWNoY2FuY2VsIHRvdWNoZW5kIG1vdXNldXAnLFxuXHRcdFx0c3RhcnRYICAgICAgPSAwLFxuXHRcdFx0c3RhcnRZICAgICAgPSAwLFxuXHRcdFx0bmV3WCAgICAgICAgPSAwLFxuXHRcdFx0bmV3WSAgICAgICAgPSAwLFxuXHRcdFx0c3RhcnRXaWR0aCAgPSAwLFxuXHRcdFx0c3RhcnRIZWlnaHQgPSAwLFxuXHRcdFx0b3JpZ1dpZHRoICAgPSBkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyKSxcblx0XHRcdG9yaWdIZWlnaHQgID0gZG9tLmhlaWdodChlZGl0b3JDb250YWluZXIpLFxuXHRcdFx0aXNEcmFnZ2luZyAgPSBmYWxzZSxcblx0XHRcdHJ0bCAgICAgICAgID0gYmFzZS5ydGwoKTtcblxuXHRcdG1pbkhlaWdodCA9IG9wdGlvbnMucmVzaXplTWluSGVpZ2h0IHx8IG9yaWdIZWlnaHQgLyAxLjU7XG5cdFx0bWF4SGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVNYXhIZWlnaHQgfHwgb3JpZ0hlaWdodCAqIDIuNTtcblx0XHRtaW5XaWR0aCAgPSBvcHRpb25zLnJlc2l6ZU1pbldpZHRoICB8fCBvcmlnV2lkdGggIC8gMS4yNTtcblx0XHRtYXhXaWR0aCAgPSBvcHRpb25zLnJlc2l6ZU1heFdpZHRoICB8fCBvcmlnV2lkdGggICogMS4yNTtcblxuXHRcdG1vdXNlTW92ZUZ1bmMgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0Ly8gaU9TIHVzZXMgd2luZG93LmV2ZW50XG5cdFx0XHRpZiAoZS50eXBlID09PSAndG91Y2htb3ZlJykge1xuXHRcdFx0XHRlICAgID0gZ2xvYmFsV2luLmV2ZW50O1xuXHRcdFx0XHRuZXdYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcblx0XHRcdFx0bmV3WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdYID0gZS5wYWdlWDtcblx0XHRcdFx0bmV3WSA9IGUucGFnZVk7XG5cdFx0XHR9XG5cblx0XHRcdHZhclx0bmV3SGVpZ2h0ID0gc3RhcnRIZWlnaHQgKyAobmV3WSAtIHN0YXJ0WSksXG5cdFx0XHRcdG5ld1dpZHRoICA9IHJ0bCA/XG5cdFx0XHRcdFx0c3RhcnRXaWR0aCAtIChuZXdYIC0gc3RhcnRYKSA6XG5cdFx0XHRcdFx0c3RhcnRXaWR0aCArIChuZXdYIC0gc3RhcnRYKTtcblxuXHRcdFx0aWYgKG1heFdpZHRoID4gMCAmJiBuZXdXaWR0aCA+IG1heFdpZHRoKSB7XG5cdFx0XHRcdG5ld1dpZHRoID0gbWF4V2lkdGg7XG5cdFx0XHR9XG5cdFx0XHRpZiAobWluV2lkdGggPiAwICYmIG5ld1dpZHRoIDwgbWluV2lkdGgpIHtcblx0XHRcdFx0bmV3V2lkdGggPSBtaW5XaWR0aDtcblx0XHRcdH1cblx0XHRcdGlmICghb3B0aW9ucy5yZXNpemVXaWR0aCkge1xuXHRcdFx0XHRuZXdXaWR0aCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobWF4SGVpZ2h0ID4gMCAmJiBuZXdIZWlnaHQgPiBtYXhIZWlnaHQpIHtcblx0XHRcdFx0bmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1pbkhlaWdodCA+IDAgJiYgbmV3SGVpZ2h0IDwgbWluSGVpZ2h0KSB7XG5cdFx0XHRcdG5ld0hlaWdodCA9IG1pbkhlaWdodDtcblx0XHRcdH1cblx0XHRcdGlmICghb3B0aW9ucy5yZXNpemVIZWlnaHQpIHtcblx0XHRcdFx0bmV3SGVpZ2h0ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChuZXdXaWR0aCB8fCBuZXdIZWlnaHQpIHtcblx0XHRcdFx0YmFzZS5kaW1lbnNpb25zKG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fTtcblxuXHRcdG1vdXNlVXBGdW5jID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdGlmICghaXNEcmFnZ2luZykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuXHRcdFx0ZG9tLmhpZGUoY292ZXIpO1xuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XG5cdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbW91c2VNb3ZlRnVuYyk7XG5cdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgZW5kRXZlbnRzLCBtb3VzZVVwRnVuYyk7XG5cblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9O1xuXG5cdFx0aWYgKGljb25zICYmIGljb25zLmNyZWF0ZSkge1xuXHRcdFx0dmFyIGljb24gPSBpY29ucy5jcmVhdGUoJ2dyaXAnKTtcblx0XHRcdGlmIChpY29uKSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChncmlwLCBpY29uKTtcblx0XHRcdFx0ZG9tLmFkZENsYXNzKGdyaXAsICdoYXMtaWNvbicpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIGdyaXApO1xuXHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIGNvdmVyKTtcblx0XHRkb20uaGlkZShjb3Zlcik7XG5cblx0XHRkb20ub24oZ3JpcCwgJ3RvdWNoc3RhcnQgbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdC8vIGlPUyB1c2VzIHdpbmRvdy5ldmVudFxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG5cdFx0XHRcdGUgICAgICA9IGdsb2JhbFdpbi5ldmVudDtcblx0XHRcdFx0c3RhcnRYID0gZS50b3VjaGVzWzBdLnBhZ2VYO1xuXHRcdFx0XHRzdGFydFkgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdGFydFggPSBlLnBhZ2VYO1xuXHRcdFx0XHRzdGFydFkgPSBlLnBhZ2VZO1xuXHRcdFx0fVxuXG5cdFx0XHRzdGFydFdpZHRoICA9IGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xuXHRcdFx0c3RhcnRIZWlnaHQgPSBkb20uaGVpZ2h0KGVkaXRvckNvbnRhaW5lcik7XG5cdFx0XHRpc0RyYWdnaW5nICA9IHRydWU7XG5cblx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xuXHRcdFx0ZG9tLnNob3coY292ZXIpO1xuXHRcdFx0ZG9tLm9uKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbW91c2VNb3ZlRnVuYyk7XG5cdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG1vdXNlVXBGdW5jKTtcblxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBQcmVmaXhlcyBhbmQgcHJlbG9hZHMgdGhlIGVtb3RpY29uIGltYWdlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0aW5pdEVtb3RpY29ucyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXJcdGVtb3RpY29ucyA9IG9wdGlvbnMuZW1vdGljb25zO1xuXHRcdHZhciByb290ICAgICAgPSBvcHRpb25zLmVtb3RpY29uc1Jvb3QgfHwgJyc7XG5cblx0XHRpZiAoZW1vdGljb25zKSB7XG5cdFx0XHRhbGxFbW90aWNvbnMgPSB1dGlscy5leHRlbmQoXG5cdFx0XHRcdHt9LCBlbW90aWNvbnMubW9yZSwgZW1vdGljb25zLmRyb3Bkb3duLCBlbW90aWNvbnMuaGlkZGVuXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCB1cmwpIHtcblx0XHRcdGFsbEVtb3RpY29uc1trZXldID0gX3RtcGwoJ2Vtb3RpY29uJywge1xuXHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0Ly8gUHJlZml4IGVtb3RpY29uIHJvb3QgdG8gZW1vdGljb24gdXJsc1xuXHRcdFx0XHR1cmw6IHJvb3QgKyAodXJsLnVybCB8fCB1cmwpLFxuXHRcdFx0XHR0b29sdGlwOiB1cmwudG9vbHRpcCB8fCBrZXlcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBQcmVsb2FkIHRoZSBlbW90aWNvblxuXHRcdFx0aWYgKG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCkge1xuXHRcdFx0XHRwcmVMb2FkQ2FjaGUucHVzaChkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xuXHRcdFx0XHRcdHNyYzogcm9vdCArICh1cmwudXJsIHx8IHVybClcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBdXRvZm9jdXMgdGhlIGVkaXRvclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0YXV0b2ZvY3VzID0gZnVuY3Rpb24gKGZvY3VzRW5kKSB7XG5cdFx0dmFyXHRyYW5nZSwgdHh0UG9zLFxuXHRcdFx0bm9kZSA9IHd5c2l3eWdCb2R5LmZpcnN0Q2hpbGQ7XG5cblx0XHQvLyBDYW4ndCBmb2N1cyBpbnZpc2libGUgZWxlbWVudHNcblx0XHRpZiAoIWRvbS5pc1Zpc2libGUoZWRpdG9yQ29udGFpbmVyKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChiYXNlLnNvdXJjZU1vZGUoKSkge1xuXHRcdFx0dHh0UG9zID0gZm9jdXNFbmQgPyBzb3VyY2VFZGl0b3IudmFsdWUubGVuZ3RoIDogMDtcblxuXHRcdFx0c291cmNlRWRpdG9yLnNldFNlbGVjdGlvblJhbmdlKHR4dFBvcywgdHh0UG9zKTtcblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKHd5c2l3eWdCb2R5KTtcblxuXHRcdGlmIChmb2N1c0VuZCkge1xuXHRcdFx0aWYgKCEobm9kZSA9IHd5c2l3eWdCb2R5Lmxhc3RDaGlsZCkpIHtcblx0XHRcdFx0bm9kZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHd5c2l3eWdEb2N1bWVudCk7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3eXNpd3lnQm9keSwgbm9kZSk7XG5cdFx0XHR9XG5cblx0XHRcdHdoaWxlIChub2RlLmxhc3RDaGlsZCkge1xuXHRcdFx0XHRub2RlID0gbm9kZS5sYXN0Q2hpbGQ7XG5cblx0XHRcdFx0Ly8gU2hvdWxkIHBsYWNlIHRoZSBjdXJzb3IgYmVmb3JlIHRoZSBsYXN0IDxicj5cblx0XHRcdFx0aWYgKGRvbS5pcyhub2RlLCAnYnInKSAmJiBub2RlLnByZXZpb3VzU2libGluZykge1xuXHRcdFx0XHRcdG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJhbmdlID0gd3lzaXd5Z0RvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG5cblx0XHRpZiAoIWRvbS5jYW5IYXZlQ2hpbGRyZW4obm9kZSkpIHtcblx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKG5vZGUpO1xuXG5cdFx0XHRpZiAoZm9jdXNFbmQpIHtcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRBZnRlcihub2RlKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xuXHRcdH1cblxuXHRcdHJhbmdlLmNvbGxhcHNlKCFmb2N1c0VuZCk7XG5cdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHRcdGN1cnJlbnRTZWxlY3Rpb24gPSByYW5nZTtcblxuXHRcdGlmIChmb2N1c0VuZCkge1xuXHRcdFx0d3lzaXd5Z0JvZHkuc2Nyb2xsVG9wID0gd3lzaXd5Z0JvZHkuc2Nyb2xsSGVpZ2h0O1xuXHRcdH1cblxuXHRcdGJhc2UuZm9jdXMoKTtcblx0fTtcblxuXHQvKipcblx0ICogR2V0cyBpZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seVxuXHQgKlxuXHQgKiBAc2luY2UgMS4zLjVcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgcmVhZE9ubHlcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICovXG5cdC8qKlxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgcmVhZCBvbmx5XG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVhZE9ubHlcblx0ICogQHNpbmNlIDEuMy41XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqIEBuYW1lIHJlYWRPbmx5XjJcblx0ICogQHJldHVybiB7dGhpc31cblx0ICovXG5cdGJhc2UucmVhZE9ubHkgPSBmdW5jdGlvbiAocmVhZE9ubHkpIHtcblx0XHRpZiAodHlwZW9mIHJlYWRPbmx5ICE9PSAnYm9vbGVhbicpIHtcblx0XHRcdHJldHVybiAhc291cmNlRWRpdG9yLnJlYWRvbmx5O1xuXHRcdH1cblxuXHRcdHd5c2l3eWdCb2R5LmNvbnRlbnRFZGl0YWJsZSA9ICFyZWFkT25seTtcblx0XHRzb3VyY2VFZGl0b3IucmVhZG9ubHkgPSAhcmVhZE9ubHk7XG5cblx0XHR1cGRhdGVUb29sQmFyKHJlYWRPbmx5KTtcblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIGlmIHRoZSBlZGl0b3IgaXMgaW4gUlRMIG1vZGVcblx0ICpcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqIEBuYW1lIHJ0bFxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKi9cblx0LyoqXG5cdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBSVEwgbW9kZVxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxuXHQgKiBAc2luY2UgMS40LjFcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgcnRsXjJcblx0ICogQHJldHVybiB7dGhpc31cblx0ICovXG5cdGJhc2UucnRsID0gZnVuY3Rpb24gKHJ0bCkge1xuXHRcdHZhciBkaXIgPSBydGwgPyAncnRsJyA6ICdsdHInO1xuXG5cdFx0aWYgKHR5cGVvZiBydGwgIT09ICdib29sZWFuJykge1xuXHRcdFx0cmV0dXJuIGRvbS5hdHRyKHNvdXJjZUVkaXRvciwgJ2RpcicpID09PSAncnRsJztcblx0XHR9XG5cblx0XHRkb20uYXR0cih3eXNpd3lnQm9keSwgJ2RpcicsIGRpcik7XG5cdFx0ZG9tLmF0dHIoc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcblxuXHRcdGRvbS5yZW1vdmVDbGFzcyhlZGl0b3JDb250YWluZXIsICdydGwnKTtcblx0XHRkb20ucmVtb3ZlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnbHRyJyk7XG5cdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgZGlyKTtcblxuXHRcdGlmIChpY29ucyAmJiBpY29ucy5ydGwpIHtcblx0XHRcdGljb25zLnJ0bChydGwpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB0b29sYmFyIHRvIGRpc2FibGUvZW5hYmxlIHRoZSBhcHByb3ByaWF0ZSBidXR0b25zXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR1cGRhdGVUb29sQmFyID0gZnVuY3Rpb24gKGRpc2FibGUpIHtcblx0XHR2YXIgbW9kZSA9IGJhc2UuaW5Tb3VyY2VNb2RlKCkgPyAnX3NjZVR4dE1vZGUnIDogJ19zY2VXeXNpd3lnTW9kZSc7XG5cblx0XHR1dGlscy5lYWNoKHRvb2xiYXJCdXR0b25zLCBmdW5jdGlvbiAoXywgYnV0dG9uKSB7XG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCBkaXNhYmxlIHx8ICFidXR0b25bbW9kZV0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSB3aWR0aCBvZiB0aGUgZWRpdG9yIGluIHBpeGVsc1xuXHQgKlxuXHQgKiBAc2luY2UgMS4zLjVcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgd2lkdGhcblx0ICogQHJldHVybiB7bnVtYmVyfVxuXHQgKi9cblx0LyoqXG5cdCAqIFNldHMgdGhlIHdpZHRoIG9mIHRoZSBlZGl0b3Jcblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFdpZHRoIGluIHBpeGVsc1xuXHQgKiBAc2luY2UgMS4zLjVcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgd2lkdGheMlxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKi9cblx0LyoqXG5cdCAqIFNldHMgdGhlIHdpZHRoIG9mIHRoZSBlZGl0b3Jcblx0ICpcblx0ICogVGhlIHNhdmVXaWR0aCBzcGVjaWZpZXMgaWYgdG8gc2F2ZSB0aGUgd2lkdGguIFRoZSBzdG9yZWQgd2lkdGggY2FuIGJlXG5cdCAqIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tIG1heGltaXplZCBzdGF0ZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9ICAgICB3aWR0aCAgICAgICAgICAgIFdpZHRoIGluIHBpeGVsc1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZVdpZHRoPXRydWVdIElmIHRvIHN0b3JlIHRoZSB3aWR0aFxuXHQgKiBAc2luY2UgMS40LjFcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgd2lkdGheM1xuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKi9cblx0YmFzZS53aWR0aCA9IGZ1bmN0aW9uICh3aWR0aCwgc2F2ZVdpZHRoKSB7XG5cdFx0aWYgKCF3aWR0aCAmJiB3aWR0aCAhPT0gMCkge1xuXHRcdFx0cmV0dXJuIGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xuXHRcdH1cblxuXHRcdGJhc2UuZGltZW5zaW9ucyh3aWR0aCwgbnVsbCwgc2F2ZVdpZHRoKTtcblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIHdpZHRoIGFuZCBoZWlnaHRcblx0ICogd2hpY2ggYXJlIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBlZGl0b3IgaW4gcHguXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjQuMVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAbmFtZSBkaW1lbnNpb25zXG5cdCAqIEByZXR1cm4ge29iamVjdH1cblx0ICovXG5cdC8qKlxuXHQgKiA8cD5TZXRzIHRoZSB3aWR0aCBhbmQvb3IgaGVpZ2h0IG9mIHRoZSBlZGl0b3IuPC9wPlxuXHQgKlxuXHQgKiA8cD5JZiB3aWR0aCBvciBoZWlnaHQgaXMgbm90IG51bWVyaWMgaXQgaXMgaWdub3JlZC48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0d2lkdGhcdFdpZHRoIGluIHB4XG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0aGVpZ2h0XHRIZWlnaHQgaW4gcHhcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqIEBuYW1lIGRpbWVuc2lvbnNeMlxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKi9cblx0LyoqXG5cdCAqIDxwPlNldHMgdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGVkaXRvci48L3A+XG5cdCAqXG5cdCAqIDxwPklmIHdpZHRoIG9yIGhlaWdodCBpcyBub3QgbnVtZXJpYyBpdCBpcyBpZ25vcmVkLjwvcD5cblx0ICpcblx0ICogPHA+VGhlIHNhdmUgYXJndW1lbnQgc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIG5ldyBzaXplcy5cblx0ICogVGhlIHNhdmVkIHNpemVzIGNhbiBiZSB1c2VkIGZvciB0aGluZ3MgbGlrZSByZXN0b3JpbmcgZnJvbVxuXHQgKiBtYXhpbWl6ZWQgc3RhdGUuIFRoaXMgc2hvdWxkIG5vcm1hbGx5IGJlIGxlZnQgYXMgdHJ1ZS48L3A+XG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0XHR3aWR0aFx0XHRXaWR0aCBpbiBweFxuXHQgKiBAcGFyYW0ge251bWJlcn1cdFx0aGVpZ2h0XHRcdEhlaWdodCBpbiBweFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZT10cnVlXVx0SWYgdG8gc3RvcmUgdGhlIG5ldyBzaXplc1xuXHQgKiBAc2luY2UgMS40LjFcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgZGltZW5zaW9uc14zXG5cdCAqIEByZXR1cm4ge3RoaXN9XG5cdCAqL1xuXHRiYXNlLmRpbWVuc2lvbnMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgc2F2ZSkge1xuXHRcdC8vIHNldCB1bmRlZmluZWQgd2lkdGgvaGVpZ2h0IHRvIGJvb2xlYW4gZmFsc2Vcblx0XHR3aWR0aCAgPSAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSA/IGZhbHNlIDogd2lkdGg7XG5cdFx0aGVpZ2h0ID0gKCFoZWlnaHQgJiYgaGVpZ2h0ICE9PSAwKSA/IGZhbHNlIDogaGVpZ2h0O1xuXG5cdFx0aWYgKHdpZHRoID09PSBmYWxzZSAmJiBoZWlnaHQgPT09IGZhbHNlKSB7XG5cdFx0XHRyZXR1cm4geyB3aWR0aDogYmFzZS53aWR0aCgpLCBoZWlnaHQ6IGJhc2UuaGVpZ2h0KCkgfTtcblx0XHR9XG5cblx0XHRpZiAod2lkdGggIT09IGZhbHNlKSB7XG5cdFx0XHRpZiAoc2F2ZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0b3B0aW9ucy53aWR0aCA9IHdpZHRoO1xuXHRcdFx0fVxuXG5cdFx0XHRkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyLCB3aWR0aCk7XG5cdFx0fVxuXG5cdFx0aWYgKGhlaWdodCAhPT0gZmFsc2UpIHtcblx0XHRcdGlmIChzYXZlICE9PSBmYWxzZSkge1xuXHRcdFx0XHRvcHRpb25zLmhlaWdodCA9IGhlaWdodDtcblx0XHRcdH1cblxuXHRcdFx0ZG9tLmhlaWdodChlZGl0b3JDb250YWluZXIsIGhlaWdodCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJhc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yIGluIHB4XG5cdCAqXG5cdCAqIEBzaW5jZSAxLjMuNVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAbmFtZSBoZWlnaHRcblx0ICogQHJldHVybiB7bnVtYmVyfVxuXHQgKi9cblx0LyoqXG5cdCAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgSGVpZ2h0IGluIHB4XG5cdCAqIEBzaW5jZSAxLjMuNVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAbmFtZSBoZWlnaHReMlxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKi9cblx0LyoqXG5cdCAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXG5cdCAqXG5cdCAqIFRoZSBzdG9yZWQgaGVpZ2h0IGNhbiBiZSB1c2VkIGZvciB0aGluZ3MgbGlrZVxuXHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgSGVpZ2h0IGluIHB4XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxuXHQgKiBAc2luY2UgMS40LjFcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgaGVpZ2h0XjNcblx0ICogQHJldHVybiB7dGhpc31cblx0ICovXG5cdGJhc2UuaGVpZ2h0ID0gZnVuY3Rpb24gKGhlaWdodCwgc2F2ZUhlaWdodCkge1xuXHRcdGlmICghaGVpZ2h0ICYmIGhlaWdodCAhPT0gMCkge1xuXHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKTtcblx0XHR9XG5cblx0XHRiYXNlLmRpbWVuc2lvbnMobnVsbCwgaGVpZ2h0LCBzYXZlSGVpZ2h0KTtcblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxuXHQgKlxuXHQgKiBAc2luY2UgMS40LjFcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQG5hbWUgbWF4aW1pemVcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICovXG5cdC8qKlxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG1heGltaXplIElmIHRvIG1heGltaXNlIHRoZSBlZGl0b3Jcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqIEBuYW1lIG1heGltaXplXjJcblx0ICogQHJldHVybiB7dGhpc31cblx0ICovXG5cdGJhc2UubWF4aW1pemUgPSBmdW5jdGlvbiAobWF4aW1pemUpIHtcblx0XHR2YXIgbWF4aW1pemVTaXplID0gJ3NjZWRpdG9yLW1heGltaXplJztcblxuXHRcdGlmICh1dGlscy5pc1VuZGVmaW5lZChtYXhpbWl6ZSkpIHtcblx0XHRcdHJldHVybiBkb20uaGFzQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUpO1xuXHRcdH1cblxuXHRcdG1heGltaXplID0gISFtYXhpbWl6ZTtcblxuXHRcdGlmIChtYXhpbWl6ZSkge1xuXHRcdFx0bWF4aW1pemVTY3JvbGxQb3NpdGlvbiA9IGdsb2JhbFdpbi5wYWdlWU9mZnNldDtcblx0XHR9XG5cblx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmRvY3VtZW50RWxlbWVudCwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKGdsb2JhbERvYy5ib2R5LCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcblx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcblx0XHRiYXNlLndpZHRoKG1heGltaXplID8gJzEwMCUnIDogb3B0aW9ucy53aWR0aCwgZmFsc2UpO1xuXHRcdGJhc2UuaGVpZ2h0KG1heGltaXplID8gJzEwMCUnIDogb3B0aW9ucy5oZWlnaHQsIGZhbHNlKTtcblxuXHRcdGlmICghbWF4aW1pemUpIHtcblx0XHRcdGdsb2JhbFdpbi5zY3JvbGxUbygwLCBtYXhpbWl6ZVNjcm9sbFBvc2l0aW9uKTtcblx0XHR9XG5cblx0XHRhdXRvRXhwYW5kKCk7XG5cblx0XHRyZXR1cm4gYmFzZTtcblx0fTtcblxuXHRhdXRvRXhwYW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChvcHRpb25zLmF1dG9FeHBhbmQgJiYgIWF1dG9FeHBhbmRUaHJvdHRsZSkge1xuXHRcdFx0YXV0b0V4cGFuZFRocm90dGxlID0gc2V0VGltZW91dChiYXNlLmV4cGFuZFRvQ29udGVudCwgMjAwKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEV4cGFuZHMgb3Igc2hyaW5rcyB0aGUgZWRpdG9ycyBoZWlnaHQgdG8gdGhlIGhlaWdodCBvZiBpdCdzIGNvbnRlbnRcblx0ICpcblx0ICogVW5sZXNzIGlnbm9yZU1heEhlaWdodCBpcyBzZXQgdG8gdHJ1ZSBpdCB3aWxsIG5vdCBleHBhbmRcblx0ICogaGlnaGVyIHRoYW4gdGhlIG1heEhlaWdodCBvcHRpb24uXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjMuNVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtpZ25vcmVNYXhIZWlnaHQ9ZmFsc2VdXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBleHBhbmRUb0NvbnRlbnRcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAc2VlICNyZXNpemVUb0NvbnRlbnRcblx0ICovXG5cdGJhc2UuZXhwYW5kVG9Db250ZW50ID0gZnVuY3Rpb24gKGlnbm9yZU1heEhlaWdodCkge1xuXHRcdGlmIChiYXNlLm1heGltaXplKCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjbGVhclRpbWVvdXQoYXV0b0V4cGFuZFRocm90dGxlKTtcblx0XHRhdXRvRXhwYW5kVGhyb3R0bGUgPSBmYWxzZTtcblxuXHRcdGlmICghYXV0b0V4cGFuZEJvdW5kcykge1xuXHRcdFx0dmFyIGhlaWdodCA9IG9wdGlvbnMucmVzaXplTWluSGVpZ2h0IHx8IG9wdGlvbnMuaGVpZ2h0IHx8XG5cdFx0XHRcdGRvbS5oZWlnaHQob3JpZ2luYWwpO1xuXG5cdFx0XHRhdXRvRXhwYW5kQm91bmRzID0ge1xuXHRcdFx0XHRtaW46IGhlaWdodCxcblx0XHRcdFx0bWF4OiBvcHRpb25zLnJlc2l6ZU1heEhlaWdodCB8fCAoaGVpZ2h0ICogMilcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0dmFyIHJhbmdlID0gZ2xvYmFsRG9jLmNyZWF0ZVJhbmdlKCk7XG5cdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHd5c2l3eWdCb2R5KTtcblxuXHRcdHZhciByZWN0ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0dmFyIGN1cnJlbnQgPSB3eXNpd3lnRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDE7XG5cdFx0dmFyIHNwYWNlTmVlZGVkID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcDtcblx0XHR2YXIgbmV3SGVpZ2h0ID0gYmFzZS5oZWlnaHQoKSArIDEgKyAoc3BhY2VOZWVkZWQgLSBjdXJyZW50KTtcblxuXHRcdGlmICghaWdub3JlTWF4SGVpZ2h0ICYmIGF1dG9FeHBhbmRCb3VuZHMubWF4ICE9PSAtMSkge1xuXHRcdFx0bmV3SGVpZ2h0ID0gTWF0aC5taW4obmV3SGVpZ2h0LCBhdXRvRXhwYW5kQm91bmRzLm1heCk7XG5cdFx0fVxuXG5cdFx0YmFzZS5oZWlnaHQoTWF0aC5jZWlsKE1hdGgubWF4KG5ld0hlaWdodCwgYXV0b0V4cGFuZEJvdW5kcy5taW4pKSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIERlc3Ryb3lzIHRoZSBlZGl0b3IsIHJlbW92aW5nIGFsbCBlbGVtZW50cyBhbmRcblx0ICogZXZlbnQgaGFuZGxlcnMuXG5cdCAqXG5cdCAqIExlYXZlcyBvbmx5IHRoZSBvcmlnaW5hbCB0ZXh0YXJlYS5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGRlc3Ryb3lcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXHRcdC8vIERvbid0IGRlc3Ryb3kgaWYgdGhlIGVkaXRvciBoYXMgYWxyZWFkeSBiZWVuIGRlc3Ryb3llZFxuXHRcdGlmICghcGx1Z2luTWFuYWdlcikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHBsdWdpbk1hbmFnZXIuZGVzdHJveSgpO1xuXG5cdFx0cmFuZ2VIZWxwZXIgICA9IG51bGw7XG5cdFx0cGx1Z2luTWFuYWdlciA9IG51bGw7XG5cblx0XHRpZiAoZHJvcGRvd24pIHtcblx0XHRcdGRvbS5yZW1vdmUoZHJvcGRvd24pO1xuXHRcdH1cblxuXHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCAnY2xpY2snLCBoYW5kbGVEb2N1bWVudENsaWNrKTtcblxuXHRcdHZhciBmb3JtID0gb3JpZ2luYWwuZm9ybTtcblx0XHRpZiAoZm9ybSkge1xuXHRcdFx0ZG9tLm9mZihmb3JtLCAncmVzZXQnLCBoYW5kbGVGb3JtUmVzZXQpO1xuXHRcdFx0ZG9tLm9mZihmb3JtLCAnc3VibWl0JywgYmFzZS51cGRhdGVPcmlnaW5hbCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xuXHRcdH1cblxuXHRcdGRvbS5vZmYod2luZG93LCAncGFnZWhpZGUnLCBiYXNlLnVwZGF0ZU9yaWdpbmFsKTtcblx0XHRkb20ub2ZmKHdpbmRvdywgJ3BhZ2VzaG93JywgaGFuZGxlRm9ybVJlc2V0KTtcblx0XHRkb20ucmVtb3ZlKHNvdXJjZUVkaXRvcik7XG5cdFx0ZG9tLnJlbW92ZSh0b29sYmFyKTtcblx0XHRkb20ucmVtb3ZlKGVkaXRvckNvbnRhaW5lcik7XG5cblx0XHRkZWxldGUgb3JpZ2luYWwuX3NjZWRpdG9yO1xuXHRcdGRvbS5zaG93KG9yaWdpbmFsKTtcblxuXHRcdG9yaWdpbmFsLnJlcXVpcmVkID0gaXNSZXF1aXJlZDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbWVudSBpdGVtIGRyb3AgZG93blxuXHQgKlxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW0gVGhlIGJ1dHRvbiB0byBhbGlnbiB0aGUgZHJvcGRvd24gd2l0aFxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWUgICAgICAgICAgVXNlZCBmb3Igc3R5bGluZyB0aGUgZHJvcGRvd24sIHdpbGwgYmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgY2xhc3Mgc2NlZGl0b3ItbmFtZVxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udGVudCAgVGhlIEhUTUwgY29udGVudCBvZiB0aGUgZHJvcGRvd25cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGNyZWF0ZURyb3BEb3duXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY3JlYXRlRHJvcERvd24gPSBmdW5jdGlvbiAobWVudUl0ZW0sIG5hbWUsIGNvbnRlbnQpIHtcblx0XHQvLyBmaXJzdCBjbGljayBmb3IgY3JlYXRlIHNlY29uZCBjbGljayBmb3IgY2xvc2Vcblx0XHR2YXJcdGRyb3BEb3duQ3NzLFxuXHRcdFx0ZHJvcERvd25DbGFzcyA9ICdzY2VkaXRvci0nICsgbmFtZTtcblxuXHRcdGJhc2UuY2xvc2VEcm9wRG93bigpO1xuXG5cdFx0Ly8gT25seSBjbG9zZSB0aGUgZHJvcGRvd24gaWYgaXQgd2FzIGFscmVhZHkgb3BlblxuXHRcdGlmIChkcm9wZG93biAmJiBkb20uaGFzQ2xhc3MoZHJvcGRvd24sIGRyb3BEb3duQ2xhc3MpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZHJvcERvd25Dc3MgPSB1dGlscy5leHRlbmQoe1xuXHRcdFx0dG9wOiBtZW51SXRlbS5vZmZzZXRUb3AsXG5cdFx0XHRsZWZ0OiBtZW51SXRlbS5vZmZzZXRMZWZ0LFxuXHRcdFx0bWFyZ2luVG9wOiBtZW51SXRlbS5jbGllbnRIZWlnaHRcblx0XHR9LCBvcHRpb25zLmRyb3BEb3duQ3NzKTtcblxuXHRcdGRyb3Bkb3duID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcblx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLWRyb3Bkb3duICcgKyBkcm9wRG93bkNsYXNzXG5cdFx0fSk7XG5cblx0XHRkb20uY3NzKGRyb3Bkb3duLCBkcm9wRG93bkNzcyk7XG5cdFx0ZG9tLmFwcGVuZENoaWxkKGRyb3Bkb3duLCBjb250ZW50KTtcblx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBkcm9wZG93bik7XG5cdFx0ZG9tLm9uKGRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHQvLyBzdG9wIGNsaWNrcyB3aXRoaW4gdGhlIGRyb3Bkb3duIGZyb20gYmVpbmcgaGFuZGxlZFxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9KTtcblxuXHRcdGlmIChkcm9wZG93bikge1xuXHRcdFx0dmFyIGZpcnN0ID0gZG9tLmZpbmQoZHJvcGRvd24sICdpbnB1dCx0ZXh0YXJlYScpWzBdO1xuXHRcdFx0aWYgKGZpcnN0KSB7XG5cdFx0XHRcdGZpcnN0LmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIGFueSBkb2N1bWVudCBjbGljayBhbmQgY2xvc2VzIHRoZSBkcm9wZG93biBpZiBvcGVuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRoYW5kbGVEb2N1bWVudENsaWNrID0gZnVuY3Rpb24gKGUpIHtcblx0XHQvLyBpZ25vcmUgcmlnaHQgY2xpY2tzXG5cdFx0aWYgKGUud2hpY2ggIT09IDMgJiYgZHJvcGRvd24gJiYgIWUuZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0YXV0b1VwZGF0ZSgpO1xuXG5cdFx0XHRiYXNlLmNsb3NlRHJvcERvd24oKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjdXQgJiBjb3B5IGV2ZW50c1xuXHQgKlxuXHQgKiBCeSBkZWZhdWx0IGJyb3dzZXJzIGFsc28gY29weSBpbmhlcml0ZWQgc3R5bGluZyBmcm9tIHRoZSBzdHlsZXNoZWV0IGFuZFxuXHQgKiBicm93c2VyIGRlZmF1bHQgc3R5bGluZyB3aGljaCBpcyB1bm5lY2Vzc2FyeS5cblx0ICpcblx0ICogVGhpcyB3aWxsIGlnbm9yZSBpbmhlcml0ZWQgc3R5bGVzIGFuZCBvbmx5IGNvcHkgaW5saW5lIHN0eWxpbmcuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRoYW5kbGVDdXRDb3B5RXZ0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgcmFuZ2UgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XG5cdFx0aWYgKHJhbmdlKSB7XG5cdFx0XHR2YXIgY29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xuXHRcdFx0dmFyIGZpcnN0UGFyZW50O1xuXG5cdFx0XHQvLyBDb3B5IGFsbCBpbmxpbmUgcGFyZW50IG5vZGVzIHVwIHRvIHRoZSBmaXJzdCBibG9jayBwYXJlbnQgc28gY2FuXG5cdFx0XHQvLyBjb3B5IGlubGluZSBzdHlsZXNcblx0XHRcdHZhciBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcblx0XHRcdFx0aWYgKHBhcmVudC5ub2RlVHlwZSA9PT0gZG9tLkVMRU1FTlRfTk9ERSkge1xuXHRcdFx0XHRcdHZhciBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKTtcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjbG9uZSwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250YWluZXIsIGNsb25lKTtcblx0XHRcdFx0XHRmaXJzdFBhcmVudCA9IGZpcnN0UGFyZW50IHx8IGNsb25lO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZmlyc3RQYXJlbnQgfHwgY29udGFpbmVyLCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xuXHRcdFx0ZG9tLnJlbW92ZVdoaXRlU3BhY2UoY29udGFpbmVyKTtcblxuXHRcdFx0ZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvaHRtbCcsIGNvbnRhaW5lci5pbm5lckhUTUwpO1xuXG5cdFx0XHQvLyBUT0RPOiBSZWZhY3RvciBpbnRvIHByaXZhdGUgc2hhcmVkIG1vZHVsZSB3aXRoIHBsYWludGV4dCBwbHVnaW5cblx0XHRcdC8vIGlubmVyVGV4dCBhZGRzIHR3byBuZXdsaW5lcyBhZnRlciA8cD4gdGFncyBzbyBjb252ZXJ0IHRoZW0gdG9cblx0XHRcdC8vIDxkaXY+IHRhZ3Ncblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAncCcpLCBmdW5jdGlvbiAoXywgZWxtKSB7XG5cdFx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChlbG0sICdkaXYnKTtcblx0XHRcdH0pO1xuXHRcdFx0Ly8gUmVtb3ZlIGNvbGxhcHNlZCA8YnI+IHRhZ3MgYXMgaW5uZXJUZXh0IGNvbnZlcnRzIHRoZW0gdG8gbmV3bGluZXNcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAnYnInKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xuXHRcdFx0XHRpZiAoIWVsbS5uZXh0U2libGluZyB8fCAhZG9tLmlzSW5saW5lKGVsbS5uZXh0U2libGluZywgdHJ1ZSkpIHtcblx0XHRcdFx0XHRkb20ucmVtb3ZlKGVsbSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyByYW5nZS50b1N0cmluZygpIGRvZXNuJ3QgaW5jbHVkZSBuZXdsaW5lcyBzbyBjYW4ndCB1c2UgdGhhdC5cblx0XHRcdC8vIHNlbGVjdGlvbi50b1N0cmluZygpIHNlZW1zIHRvIHVzZSB0aGUgc2FtZSBtZXRob2QgYXMgaW5uZXJUZXh0XG5cdFx0XHQvLyBidXQgbmVlZHMgdG8gYmUgbm9ybWFsaXNlZCBmaXJzdCBzbyB1c2luZyBjb250YWluZXIuaW5uZXJUZXh0XG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIGNvbnRhaW5lcik7XG5cdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIGNvbnRhaW5lci5pbm5lclRleHQpO1xuXHRcdFx0ZG9tLnJlbW92ZShjb250YWluZXIpO1xuXG5cdFx0XHRpZiAoZS50eXBlID09PSAnY3V0Jykge1xuXHRcdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xuXHRcdFx0fVxuXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgcGFzdGUgZXZlbnRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGhhbmRsZVBhc3RlRXZ0ID0gZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgZWRpdGFibGUgPSB3eXNpd3lnQm9keTtcblx0XHR2YXIgY2xpcGJvYXJkID0gZS5jbGlwYm9hcmREYXRhO1xuXHRcdHZhciBsb2FkSW1hZ2UgPSBmdW5jdGlvbiAoZmlsZSkge1xuXHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aGFuZGxlUGFzdGVEYXRhKHtcblx0XHRcdFx0XHRodG1sOiAnPGltZyBzcmM9XCInICsgZS50YXJnZXQucmVzdWx0ICsgJ1wiIC8+J1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcblx0XHR9O1xuXG5cdFx0Ly8gTW9kZXJuIGJyb3dzZXJzIHdpdGggY2xpcGJvYXJkIEFQSSAtIGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiBfdmVyeV9cblx0XHQvLyBvbGQgYW5kcm9pZCB3ZWIgdmlld3MgYW5kIFVDIGJyb3dzZXIgd2hpY2ggZG9lc24ndCBzdXBwb3J0IHRoZVxuXHRcdC8vIHBhc3RlIGV2ZW50IGF0IGFsbC5cblx0XHRpZiAoY2xpcGJvYXJkKSB7XG5cdFx0XHR2YXIgZGF0YSA9IHt9O1xuXHRcdFx0dmFyIHR5cGVzID0gY2xpcGJvYXJkLnR5cGVzO1xuXHRcdFx0dmFyIGl0ZW1zID0gY2xpcGJvYXJkLml0ZW1zO1xuXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Ly8gV29yZCBzb21ldGltZXMgYWRkcyBjb3BpZWQgdGV4dCBhcyBhbiBpbWFnZSBzbyBpZiBIVE1MXG5cdFx0XHRcdC8vIGV4aXN0cyBwcmVmZXIgdGhhdCBvdmVyIGltYWdlc1xuXHRcdFx0XHRpZiAodHlwZXMuaW5kZXhPZigndGV4dC9odG1sJykgPCAwKSB7XG5cdFx0XHRcdFx0Ly8gTm9ybWFsaXNlIGltYWdlIHBhc3RpbmcgdG8gcGFzdGUgYXMgYSBkYXRhLXVyaVxuXHRcdFx0XHRcdGlmIChnbG9iYWxXaW4uRmlsZVJlYWRlciAmJiBpdGVtcyAmJlxuXHRcdFx0XHRcdFx0SU1BR0VfTUlNRV9SRUdFWC50ZXN0KGl0ZW1zW2ldLnR5cGUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbG9hZEltYWdlKGNsaXBib2FyZC5pdGVtc1tpXS5nZXRBc0ZpbGUoKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGF0YVt0eXBlc1tpXV0gPSBjbGlwYm9hcmQuZ2V0RGF0YSh0eXBlc1tpXSk7XG5cdFx0XHR9XG5cdFx0XHQvLyBDYWxsIHBsdWdpbnMgaGVyZSB3aXRoIGZpbGU/XG5cdFx0XHRkYXRhLnRleHQgPSBkYXRhWyd0ZXh0L3BsYWluJ107XG5cdFx0XHRkYXRhLmh0bWwgPSBzYW5pdGl6ZShkYXRhWyd0ZXh0L2h0bWwnXSk7XG5cblx0XHRcdGhhbmRsZVBhc3RlRGF0YShkYXRhKTtcblx0XHQvLyBJZiBjb250ZW50c0ZyYWdtZW50IGV4aXN0cyB0aGVuIHdlIGFyZSBhbHJlYWR5IHdhaXRpbmcgZm9yIGFcblx0XHQvLyBwcmV2aW91cyBwYXN0ZSBzbyBsZXQgdGhlIGhhbmRsZXIgZm9yIHRoYXQgaGFuZGxlIHRoaXMgb25lIHRvb1xuXHRcdH0gZWxzZSBpZiAoIXBhc3RlQ29udGVudEZyYWdtZW50KSB7XG5cdFx0XHQvLyBTYXZlIHRoZSBzY3JvbGwgcG9zaXRpb24gc28gY2FuIGJlIHJlc3RvcmVkXG5cdFx0XHQvLyB3aGVuIGNvbnRlbnRzIGlzIHJlc3RvcmVkXG5cdFx0XHR2YXIgc2Nyb2xsVG9wID0gZWRpdGFibGUuc2Nyb2xsVG9wO1xuXG5cdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcblxuXHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBnbG9iYWxEb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXHRcdFx0d2hpbGUgKGVkaXRhYmxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHBhc3RlQ29udGVudEZyYWdtZW50LCBlZGl0YWJsZS5maXJzdENoaWxkKTtcblx0XHRcdH1cblxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBodG1sID0gZWRpdGFibGUuaW5uZXJIVE1MO1xuXG5cdFx0XHRcdGVkaXRhYmxlLmlubmVySFRNTCA9ICcnO1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdGFibGUsIHBhc3RlQ29udGVudEZyYWdtZW50KTtcblx0XHRcdFx0ZWRpdGFibGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuXHRcdFx0XHRwYXN0ZUNvbnRlbnRGcmFnbWVudCA9IGZhbHNlO1xuXG5cdFx0XHRcdHJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xuXG5cdFx0XHRcdGhhbmRsZVBhc3RlRGF0YSh7IGh0bWw6IHNhbml0aXplKGh0bWwpIH0pO1xuXHRcdFx0fSwgMCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBwYXN0ZWQgZGF0YSwgZmlsdGVycyBpdCBhbmQgdGhlbiBpbnNlcnRzIGl0LlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0aGFuZGxlUGFzdGVEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcblx0XHR2YXIgcGFzdGVBcmVhID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xuXG5cdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZVJhdycsIGRhdGEpO1xuXHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ3Bhc3RlcmF3JywgZGF0YSk7XG5cblx0XHRpZiAoZGF0YS5odG1sKSB7XG5cdFx0XHQvLyBTYW5pdGl6ZSBhZ2FpbiBpbiBjYXNlIHBsdWdpbnMgbW9kaWZpZWQgdGhlIEhUTUxcblx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBzYW5pdGl6ZShkYXRhLmh0bWwpO1xuXG5cdFx0XHQvLyBmaXggYW55IGludmFsaWQgbmVzdGluZ1xuXHRcdFx0ZG9tLmZpeE5lc3RpbmcocGFzdGVBcmVhKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFzdGVBcmVhLmlubmVySFRNTCA9IGVzY2FwZS5lbnRpdGllcyhkYXRhLnRleHQgfHwgJycpO1xuXHRcdH1cblxuXHRcdHZhciBwYXN0ZSA9IHtcblx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxuXHRcdH07XG5cblx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIGZvcm1hdCkge1xuXHRcdFx0cGFzdGUudmFsID0gZm9ybWF0XG5cdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKHBhc3RlLnZhbCwgd3lzaXd5Z0RvY3VtZW50LCBjdXJyZW50Tm9kZSk7XG5cdFx0fVxuXG5cdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZScsIHBhc3RlKTtcblx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcblxuXHRcdGlmICgnZnJhZ21lbnRUb0h0bWwnIGluIGZvcm1hdCkge1xuXHRcdFx0cGFzdGUudmFsID0gZm9ybWF0XG5cdFx0XHRcdC5mcmFnbWVudFRvSHRtbChwYXN0ZS52YWwsIGN1cnJlbnROb2RlKTtcblx0XHR9XG5cblx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlSHRtbCcsIHBhc3RlKTtcblxuXHRcdHZhciBwYXJlbnQgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cdFx0YmFzZS53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChwYXN0ZS52YWwsIG51bGwsIHRydWUpO1xuXHRcdGRvbS5tZXJnZShwYXJlbnQpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDbG9zZXMgYW55IGN1cnJlbnRseSBvcGVuIGRyb3AgZG93blxuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb2N1cz1mYWxzZV0gSWYgdG8gZm9jdXMgdGhlIGVkaXRvclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgY2xvc2luZyB0aGUgZHJvcCBkb3duXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBjbG9zZURyb3BEb3duXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY2xvc2VEcm9wRG93biA9IGZ1bmN0aW9uIChmb2N1cykge1xuXHRcdGlmIChkcm9wZG93bikge1xuXHRcdFx0ZG9tLnJlbW92ZShkcm9wZG93bik7XG5cdFx0XHRkcm9wZG93biA9IG51bGw7XG5cdFx0fVxuXG5cdFx0aWYgKGZvY3VzID09PSB0cnVlKSB7XG5cdFx0XHRiYXNlLmZvY3VzKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEluc2VydHMgSFRNTCBpbnRvIFdZU0lXWUcgZWRpdG9yLlxuXHQgKlxuXHQgKiBJZiBlbmRIdG1sIGlzIHNwZWNpZmllZCwgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWRcblx0ICogYmV0d2VlbiBodG1sIGFuZCBlbmRIdG1sLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IGh0bWxcblx0ICogYW5kIGVuZEh0bWwgd2lsbCBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEh0bWw9bnVsbF1cblx0ICogQHBhcmFtIHtib29sZWFufSBbb3ZlcnJpZGVDb2RlQmxvY2tpbmc9ZmFsc2VdIElmIHRvIGluc2VydCB0aGUgaHRtbFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50byBjb2RlIHRhZ3MsIGJ5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGNvZGUgdGFncyBvbmx5XG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0IHRleHQuXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbFxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sID0gZnVuY3Rpb24gKFxuXHRcdGh0bWwsIGVuZEh0bWwsIG92ZXJyaWRlQ29kZUJsb2NraW5nXG5cdCkge1xuXHRcdHZhclx0bWFya2VyLCBzY3JvbGxUb3AsIHNjcm9sbFRvLFxuXHRcdFx0ZWRpdG9ySGVpZ2h0ID0gZG9tLmhlaWdodCh3eXNpd3lnRWRpdG9yKTtcblxuXHRcdGJhc2UuZm9jdXMoKTtcblxuXHRcdC8vIFRPRE86IFRoaXMgY29kZSB0YWcgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSBhbmRcblx0XHQvLyBzaG91bGQgbWF5YmUgY29udmVydCB0aGUgSFRNTCBpbnRvIHRleHQgaW5zdGVhZFxuXHRcdC8vIERvbid0IGFwcGx5IHRvIGNvZGUgZWxlbWVudHNcblx0XHRpZiAoIW92ZXJyaWRlQ29kZUJsb2NraW5nICYmIGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBJbnNlcnQgdGhlIEhUTUwgYW5kIHNhdmUgdGhlIHJhbmdlIHNvIHRoZSBlZGl0b3IgY2FuIGJlIHNjcm9sbGVkXG5cdFx0Ly8gdG8gdGhlIGVuZCBvZiB0aGUgc2VsZWN0aW9uLiBBbHNvIGFsbG93cyBlbW90aWNvbnMgdG8gYmUgcmVwbGFjZWRcblx0XHQvLyB3aXRob3V0IGFmZmVjdGluZyB0aGUgY3Vyc29yIHBvc2l0aW9uXG5cdFx0cmFuZ2VIZWxwZXIuaW5zZXJ0SFRNTChodG1sLCBlbmRIdG1sKTtcblx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcblx0XHRyZXBsYWNlRW1vdGljb25zKCk7XG5cblx0XHQvLyBGaXggYW55IGludmFsaWQgbmVzdGluZywgZS5nLiBpZiBhIHF1b3RlIG9yIG90aGVyIGJsb2NrIGlzIGluc2VydGVkXG5cdFx0Ly8gaW50byBhIHBhcmFncmFwaFxuXHRcdGRvbS5maXhOZXN0aW5nKHd5c2l3eWdCb2R5KTtcblxuXHRcdHdyYXBJbmxpbmVzKHd5c2l3eWdCb2R5LCB3eXNpd3lnRG9jdW1lbnQpO1xuXG5cdFx0Ly8gU2Nyb2xsIHRoZSBlZGl0b3IgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgc2VsZWN0aW9uXG5cdFx0bWFya2VyICAgPSBkb20uZmluZCh3eXNpd3lnQm9keSwgJyNzY2VkaXRvci1lbmQtbWFya2VyJylbMF07XG5cdFx0ZG9tLnNob3cobWFya2VyKTtcblx0XHRzY3JvbGxUb3AgPSB3eXNpd3lnQm9keS5zY3JvbGxUb3A7XG5cdFx0c2Nyb2xsVG8gID0gKGRvbS5nZXRPZmZzZXQobWFya2VyKS50b3AgK1xuXHRcdFx0KG1hcmtlci5vZmZzZXRIZWlnaHQgKiAxLjUpKSAtIGVkaXRvckhlaWdodDtcblx0XHRkb20uaGlkZShtYXJrZXIpO1xuXG5cdFx0Ly8gT25seSBzY3JvbGwgaWYgbWFya2VyIGlzbid0IGFscmVhZHkgdmlzaWJsZVxuXHRcdGlmIChzY3JvbGxUbyA+IHNjcm9sbFRvcCB8fCBzY3JvbGxUbyArIGVkaXRvckhlaWdodCA8IHNjcm9sbFRvcCkge1xuXHRcdFx0d3lzaXd5Z0JvZHkuc2Nyb2xsVG9wID0gc2Nyb2xsVG87XG5cdFx0fVxuXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XG5cdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XG5cblx0XHQvLyBBZGQgYSBuZXcgbGluZSBhZnRlciB0aGUgbGFzdCBibG9jayBlbGVtZW50XG5cdFx0Ly8gc28gY2FuIGFsd2F5cyBhZGQgdGV4dCBhZnRlciBpdFxuXHRcdGFwcGVuZE5ld0xpbmUoKTtcblx0fTtcblxuXHQvKipcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBleGNlcHQgaXQgd2lsbCBjb252ZXJ0IGFueSBIVE1MXG5cdCAqIGludG8gdGV4dCBiZWZvcmUgaW5zZXJ0aW5nIGl0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0XG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dCwgZW5kVGV4dCkge1xuXHRcdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCksIGVzY2FwZS5lbnRpdGllcyhlbmRUZXh0KVxuXHRcdCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEluc2VydHMgdGV4dCBpbnRvIHRoZSBXWVNJV1lHIG9yIHNvdXJjZSBlZGl0b3IgZGVwZW5kaW5nIG9uIHdoaWNoXG5cdCAqIG1vZGUgdGhlIGVkaXRvciBpcyBpbi5cblx0ICpcblx0ICogSWYgZW5kVGV4dCBpcyBzcGVjaWZpZWQgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWQgYmV0d2VlblxuXHQgKiB0ZXh0IGFuZCBlbmRUZXh0LiBJZiBubyB0ZXh0IGlzIHNlbGVjdGVkIHRleHQgYW5kIGVuZFRleHQgd2lsbFxuXHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cblx0ICogQHNpbmNlIDEuMy41XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpbnNlcnRUZXh0XG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuaW5zZXJ0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBlbmRUZXh0KSB7XG5cdFx0aWYgKGJhc2UuaW5Tb3VyY2VNb2RlKCkpIHtcblx0XHRcdGJhc2Uuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCh0ZXh0LCBlbmRUZXh0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmFzZS53eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dCh0ZXh0LCBlbmRUZXh0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYmFzZTtcblx0fTtcblxuXHQvKipcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBidXQgaW5zZXJ0cyB0ZXh0IGludG8gdGhlXG5cdCAqIHNvdXJjZSBtb2RlIGVkaXRvciBpbnN0ZWFkLlxuXHQgKlxuXHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXG5cdCAqIHRleHQgYW5kIGVuZFRleHQuIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQgdGV4dCBhbmQgZW5kVGV4dCB3aWxsXG5cdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXG5cdCAqXG5cdCAqIFRoZSBjdXJzb3Igd2lsbCBiZSBwbGFjZWQgYWZ0ZXIgdGhlIHRleHQgcGFyYW0uIElmIGVuZFRleHQgaXNcblx0ICogc3BlY2lmaWVkIHRoZSBjdXJzb3Igd2lsbCBiZSBwbGFjZWQgYmVmb3JlIGVuZFRleHQsIHNvIHBhc3Npbmc6PGJyIC8+XG5cdCAqXG5cdCAqICdbYl0nLCAnWy9iXSdcblx0ICpcblx0ICogV291bGQgY2F1c2UgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQ6PGJyIC8+XG5cdCAqXG5cdCAqIFtiXVNlbGVjdGVkIHRleHR8Wy9iXVxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cblx0ICogQHNpbmNlIDEuNC4wXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JJbnNlcnRUZXh0XG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2Uuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBlbmRUZXh0KSB7XG5cdFx0dmFyIHNjcm9sbFRvcCwgY3VycmVudFZhbHVlLFxuXHRcdFx0c3RhcnRQb3MgPSBzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQsXG5cdFx0XHRlbmRQb3MgICA9IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmQ7XG5cblx0XHRzY3JvbGxUb3AgPSBzb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wO1xuXHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xuXHRcdGN1cnJlbnRWYWx1ZSA9IHNvdXJjZUVkaXRvci52YWx1ZTtcblxuXHRcdGlmIChlbmRUZXh0KSB7XG5cdFx0XHR0ZXh0ICs9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoc3RhcnRQb3MsIGVuZFBvcykgKyBlbmRUZXh0O1xuXHRcdH1cblxuXHRcdHNvdXJjZUVkaXRvci52YWx1ZSA9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICtcblx0XHRcdHRleHQgK1xuXHRcdFx0Y3VycmVudFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIGN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xuXG5cdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gKHN0YXJ0UG9zICsgdGV4dC5sZW5ndGgpIC1cblx0XHRcdChlbmRUZXh0ID8gZW5kVGV4dC5sZW5ndGggOiAwKTtcblx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0O1xuXG5cdFx0c291cmNlRWRpdG9yLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcblx0XHRzb3VyY2VFZGl0b3IuZm9jdXMoKTtcblxuXHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcblx0fTtcblxuXHQvKipcblx0ICogR2V0cyB0aGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGUgcmFuZ2VIZWxwZXIgY2xhc3Ncblx0ICogZm9yIHRoZSBlZGl0b3IuXG5cdCAqXG5cdCAqIEByZXR1cm4ge1JhbmdlSGVscGVyfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZ2V0UmFuZ2VIZWxwZXJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5nZXRSYW5nZUhlbHBlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gcmFuZ2VIZWxwZXI7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgc291cmNlIGVkaXRvciBjYXJldCBwb3NpdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtPYmplY3R9IFtwb3NpdGlvbl1cblx0ICogQHJldHVybiB7dGhpc31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBzaW5jZSAxLjQuNVxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JDYXJldFxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNvdXJjZUVkaXRvckNhcmV0ID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XG5cdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XG5cblx0XHRpZiAocG9zaXRpb24pIHtcblx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCA9IHBvc2l0aW9uLnN0YXJ0O1xuXHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZCA9IHBvc2l0aW9uLmVuZDtcblxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YXJ0OiBzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQsXG5cdFx0XHRlbmQ6IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcblx0XHR9O1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZWRpdG9yLlxuXHQgKlxuXHQgKiBJZiB0aGUgZWRpdG9yIGlzIGluIFdZU0lXWUcgbW9kZSBpdCB3aWxsIHJldHVybiB0aGUgZmlsdGVyZWRcblx0ICogSFRNTCBmcm9tIGl0IChjb252ZXJ0ZWQgdG8gQkJDb2RlIGlmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luKS5cblx0ICogSXQgaXQncyBpbiBTb3VyY2UgTW9kZSBpdCB3aWxsIHJldHVybiB0aGUgdW5maWx0ZXJlZCBjb250ZW50c1xuXHQgKiBvZiB0aGUgc291cmNlIGVkaXRvciAoaWYgdXNpbmcgdGhlIEJCQ29kZSBwbHVnaW4gdGhpcyB3aWxsIGJlXG5cdCAqIEJCQ29kZSBhZ2FpbikuXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjMuNVxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSB2YWxcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0LyoqXG5cdCAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBlZGl0b3IuXG5cdCAqXG5cdCAqIElmIGZpbHRlciBzZXQgdHJ1ZSB0aGUgdmFsIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlclxuXHQgKiBmdW5jdGlvbi4gSWYgdXNpbmcgdGhlIEJCQ29kZSBwbHVnaW4gaXQgd2lsbCBwYXNzIHRoZSB2YWwgdG9cblx0ICogdGhlIEJCQ29kZSBmaWx0ZXIgdG8gY29udmVydCBhbnkgQkJDb2RlIGludG8gSFRNTC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cblx0ICogQHJldHVybiB7dGhpc31cblx0ICogQHNpbmNlIDEuMy41XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSB2YWxeMlxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnZhbCA9IGZ1bmN0aW9uICh2YWwsIGZpbHRlcikge1xuXHRcdGlmICghdXRpbHMuaXNTdHJpbmcodmFsKSkge1xuXHRcdFx0cmV0dXJuIGJhc2UuaW5Tb3VyY2VNb2RlKCkgP1xuXHRcdFx0XHRiYXNlLmdldFNvdXJjZUVkaXRvclZhbHVlKGZhbHNlKSA6XG5cdFx0XHRcdGJhc2UuZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcik7XG5cdFx0fVxuXG5cdFx0aWYgKCFiYXNlLmluU291cmNlTW9kZSgpKSB7XG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiBmb3JtYXQpIHtcblx0XHRcdFx0dmFsID0gZm9ybWF0LnRvSHRtbCh2YWwpO1xuXHRcdFx0fVxuXG5cdFx0XHRiYXNlLnNldFd5c2l3eWdFZGl0b3JWYWx1ZSh2YWwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRiYXNlLnNldFNvdXJjZUVkaXRvclZhbHVlKHZhbCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJhc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIEluc2VydHMgSFRNTC9CQkNvZGUgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIElmIGVuZCBpcyBzdXBwbGllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXG5cdCAqIHN0YXJ0IGFuZCBlbmQuIElmIHRoZXJlIGlzIG5vIHNlbGVjdGVkIHRleHQgc3RhcnQgYW5kIGVuZFxuXHQgKiB3aWxsIGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxuXHQgKlxuXHQgKiBJZiB0aGUgZmlsdGVyIHBhcmFtIGlzIHNldCB0byB0cnVlLCB0aGUgSFRNTC9CQkNvZGUgd2lsbCBiZVxuXHQgKiBwYXNzZWQgdGhyb3VnaCBhbnkgcGx1Z2luIGZpbHRlcnMuIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luXG5cdCAqIHRoaXMgd2lsbCBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmQ9bnVsbF1cblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnZlcnRFbW90aWNvbnM9dHJ1ZV0gSWYgdG8gY29udmVydCBlbW90aWNvbnNcblx0ICogQHJldHVybiB7dGhpc31cblx0ICogQHNpbmNlIDEuMy41XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpbnNlcnRcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0LyoqXG5cdCAqIEluc2VydHMgSFRNTC9CQkNvZGUgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIElmIGVuZCBpcyBzdXBwbGllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXG5cdCAqIHN0YXJ0IGFuZCBlbmQuIElmIHRoZXJlIGlzIG5vIHNlbGVjdGVkIHRleHQgc3RhcnQgYW5kIGVuZFxuXHQgKiB3aWxsIGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxuXHQgKlxuXHQgKiBJZiB0aGUgZmlsdGVyIHBhcmFtIGlzIHNldCB0byB0cnVlLCB0aGUgSFRNTC9CQkNvZGUgd2lsbCBiZVxuXHQgKiBwYXNzZWQgdGhyb3VnaCBhbnkgcGx1Z2luIGZpbHRlcnMuIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luXG5cdCAqIHRoaXMgd2lsbCBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxuXHQgKlxuXHQgKiBJZiB0aGUgYWxsb3dNaXhlZCBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgSFRNTCBhbnkgd2lsbCBub3QgYmVcblx0ICogZXNjYXBlZFxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmQ9bnVsbF1cblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnZlcnRFbW90aWNvbnM9dHJ1ZV0gSWYgdG8gY29udmVydCBlbW90aWNvbnNcblx0ICogQHBhcmFtIHtib29sZWFufSBbYWxsb3dNaXhlZD1mYWxzZV1cblx0ICogQHJldHVybiB7dGhpc31cblx0ICogQHNpbmNlIDEuNC4zXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpbnNlcnReMlxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xuXHRiYXNlLmluc2VydCA9IGZ1bmN0aW9uIChcblx0XHRzdGFydCwgZW5kLCBmaWx0ZXIsIGNvbnZlcnRFbW90aWNvbnMsIGFsbG93TWl4ZWRcblx0KSB7XG5cdFx0aWYgKGJhc2UuaW5Tb3VyY2VNb2RlKCkpIHtcblx0XHRcdGJhc2Uuc291cmNlRWRpdG9ySW5zZXJ0VGV4dChzdGFydCwgZW5kKTtcblx0XHRcdHJldHVybiBiYXNlO1xuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGUgc2VsZWN0aW9uIGJldHdlZW4gc3RhcnQgYW5kIGVuZFxuXHRcdGlmIChlbmQpIHtcblx0XHRcdHZhclx0aHRtbCA9IHJhbmdlSGVscGVyLnNlbGVjdGVkSHRtbCgpO1xuXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb1NvdXJjZScgaW4gZm9ybWF0KSB7XG5cdFx0XHRcdGh0bWwgPSBmb3JtYXRcblx0XHRcdFx0XHQuZnJhZ21lbnRUb1NvdXJjZShodG1sLCB3eXNpd3lnRG9jdW1lbnQsIGN1cnJlbnROb2RlKTtcblx0XHRcdH1cblxuXHRcdFx0c3RhcnQgKz0gaHRtbCArIGVuZDtcblx0XHR9XG5cdFx0Ly8gVE9ETzogVGhpcyBmaWx0ZXIgc2hvdWxkIGFsbG93IGVtcHR5IHRhZ3MgYXMgaXQncyBpbnNlcnRpbmcuXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9IdG1sJyBpbiBmb3JtYXQpIHtcblx0XHRcdHN0YXJ0ID0gZm9ybWF0LmZyYWdtZW50VG9IdG1sKHN0YXJ0LCBjdXJyZW50Tm9kZSk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBhbnkgZXNjYXBlZCBIVE1MIGJhY2sgaW50byBIVE1MIGlmIG1peGVkIGlzIGFsbG93ZWRcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiBhbGxvd01peGVkID09PSB0cnVlKSB7XG5cdFx0XHRzdGFydCA9IHN0YXJ0LnJlcGxhY2UoLyZsdDsvZywgJzwnKVxuXHRcdFx0XHQucmVwbGFjZSgvJmd0Oy9nLCAnPicpXG5cdFx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xuXHRcdH1cblxuXHRcdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoc3RhcnQpO1xuXG5cdFx0cmV0dXJuIGJhc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBIVE1MIHZhbHVlLlxuXHQgKlxuXHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIEh0IE1sIGxpa2UgdGhlIEJCQ29kZSBwbHVnaW5cblx0ICogaXQgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlsdGVyaW5nIChCQkNvZGUpIHVubGVzcyB0aGVcblx0ICogZmlsdGVyIHBhcmFtIGlzIHNldCB0byBmYWxzZS5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGdldFd5c2l3eWdFZGl0b3JWYWx1ZVxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcblx0XHR2YXJcdGh0bWw7XG5cdFx0Ly8gQ3JlYXRlIGEgdG1wIG5vZGUgdG8gc3RvcmUgY29udGVudHMgc28gaXQgY2FuIGJlIG1vZGlmaWVkXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgYW55dGhpbmcgZWxzZS5cblx0XHR2YXIgdG1wID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gd3lzaXd5Z0JvZHkuY2hpbGROb2RlcztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRtcCwgY2hpbGROb2Rlc1tpXS5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdH1cblxuXHRcdGRvbS5hcHBlbmRDaGlsZCh3eXNpd3lnQm9keSwgdG1wKTtcblx0XHRkb20uZml4TmVzdGluZyh0bXApO1xuXHRcdGRvbS5yZW1vdmUodG1wKTtcblxuXHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xuXG5cdFx0Ly8gZmlsdGVyIHRoZSBIVE1MIGFuZCBET00gdGhyb3VnaCBhbnkgcGx1Z2luc1xuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXQsICd0b1NvdXJjZScpKSB7XG5cdFx0XHRodG1sID0gZm9ybWF0LnRvU291cmNlKGh0bWwsIHd5c2l3eWdEb2N1bWVudCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGh0bWw7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9yJ3MgaUZyYW1lIEJvZHkuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQHNpbmNlIDEuNC4zXG5cdCAqIEBuYW1lIGdldEJvZHlcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5nZXRCb2R5ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB3eXNpd3lnQm9keTtcblx0fTtcblxuXHQvKipcblx0ICogR2V0cyB0aGUgV1lTSVdZRyBlZGl0b3JzIGNvbnRhaW5lciBhcmVhICh3aG9sZSBpRnJhbWUpLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBzaW5jZSAxLjQuM1xuXHQgKiBAbmFtZSBnZXRDb250ZW50QXJlYUNvbnRhaW5lclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmdldENvbnRlbnRBcmVhQ29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiB3eXNpd3lnRWRpdG9yO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSB0ZXh0IGVkaXRvciB2YWx1ZVxuXHQgKlxuXHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIHRleHQgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxuXHQgKiBpdCB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBmaWx0ZXJpbmcgd2hpY2ggaXMgQkJDb2RlIHRvXG5cdCAqIEhUTUwgc28gaXQgd2lsbCByZXR1cm4gSFRNTC4gSWYgZmlsdGVyIGlzIHNldCB0byBmYWxzZSBpdCB3aWxsXG5cdCAqIGp1c3QgcmV0dXJuIHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIGVkaXRvciAoQkJDb2RlKS5cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBzaW5jZSAxLjQuMFxuXHQgKiBAbmFtZSBnZXRTb3VyY2VFZGl0b3JWYWx1ZVxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmdldFNvdXJjZUVkaXRvclZhbHVlID0gZnVuY3Rpb24gKGZpbHRlcikge1xuXHRcdHZhciB2YWwgPSBzb3VyY2VFZGl0b3IudmFsdWU7XG5cblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiBmb3JtYXQpIHtcblx0XHRcdHZhbCA9IGZvcm1hdC50b0h0bWwodmFsKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBXWVNJV1lHIEhUTUwgZWRpdG9yIHZhbHVlLiBTaG91bGQgb25seSBiZSB0aGUgSFRNTFxuXHQgKiBjb250YWluZWQgd2l0aGluIHRoZSBib2R5IHRhZ3Ncblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzZXRXeXNpd3lnRWRpdG9yVmFsdWVcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5zZXRXeXNpd3lnRWRpdG9yVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRpZiAoIXZhbHVlKSB7XG5cdFx0XHR2YWx1ZSA9ICc8cD48YnIgLz48L3A+Jztcblx0XHR9XG5cblx0XHR3eXNpd3lnQm9keS5pbm5lckhUTUwgPSBzYW5pdGl6ZSh2YWx1ZSk7XG5cdFx0cmVwbGFjZUVtb3RpY29ucygpO1xuXG5cdFx0YXBwZW5kTmV3TGluZSgpO1xuXHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcblx0XHRhdXRvRXhwYW5kKCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgc2V0U291cmNlRWRpdG9yVmFsdWVcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5zZXRTb3VyY2VFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHNvdXJjZUVkaXRvci52YWx1ZSA9IHZhbHVlO1xuXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB0ZXh0YXJlYSB0aGF0IHRoZSBlZGl0b3IgaXMgcmVwbGFjaW5nXG5cdCAqIHdpdGggdGhlIHZhbHVlIGN1cnJlbnRseSBpbnNpZGUgdGhlIGVkaXRvci5cblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHVwZGF0ZU9yaWdpbmFsXG5cdCAqIEBzaW5jZSAxLjQuMFxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnVwZGF0ZU9yaWdpbmFsID0gZnVuY3Rpb24gKCkge1xuXHRcdG9yaWdpbmFsLnZhbHVlID0gYmFzZS52YWwoKTtcblx0fTtcblxuXHQvKipcblx0ICogUmVwbGFjZXMgYW55IGVtb3RpY29uIGNvZGVzIGluIHRoZSBwYXNzZWQgSFRNTFxuXHQgKiB3aXRoIHRoZWlyIGVtb3RpY29uIGltYWdlc1xuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cmVwbGFjZUVtb3RpY29ucyA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XG5cdFx0XHRlbW90aWNvbnNcblx0XHRcdFx0LnJlcGxhY2Uod3lzaXd5Z0JvZHksIGFsbEVtb3RpY29ucywgb3B0aW9ucy5lbW90aWNvbnNDb21wYXQpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogSWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2UgY29kZSBtb2RlXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpblNvdXJjZU1vZGVcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5pblNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyhlZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJyk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXG5cdCAqXG5cdCAqIEByZXR1cm4gYm9vbGVhblxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgc291cmNlTW9kZVxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHQvKipcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIHNvdXJjZU1vZGVcblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBlbmFibGVcblx0ICogQHJldHVybiB7dGhpc31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNvdXJjZU1vZGVeMlxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XG5cdFx0dmFyIGluU291cmNlTW9kZSA9IGJhc2UuaW5Tb3VyY2VNb2RlKCk7XG5cblx0XHRpZiAodHlwZW9mIGVuYWJsZSAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRyZXR1cm4gaW5Tb3VyY2VNb2RlO1xuXHRcdH1cblxuXHRcdGlmICgoaW5Tb3VyY2VNb2RlICYmICFlbmFibGUpIHx8ICghaW5Tb3VyY2VNb2RlICYmIGVuYWJsZSkpIHtcblx0XHRcdGJhc2UudG9nZ2xlU291cmNlTW9kZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHRoZSBXWVNJV1lHIGFuZCBzb3VyY2UgbW9kZXNcblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHRvZ2dsZVNvdXJjZU1vZGVcblx0ICogQHNpbmNlIDEuNC4wXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UudG9nZ2xlU291cmNlTW9kZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaXNJblNvdXJjZU1vZGUgPSBiYXNlLmluU291cmNlTW9kZSgpO1xuXG5cdFx0Ly8gZG9uJ3QgYWxsb3cgc3dpdGNoaW5nIHRvIFdZU0lXWUcgaWYgZG9lc24ndCBzdXBwb3J0IGl0XG5cdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCAmJiBpc0luU291cmNlTW9kZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghaXNJblNvdXJjZU1vZGUpIHtcblx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xuXHRcdFx0cmFuZ2VIZWxwZXIuY2xlYXIoKTtcblx0XHR9XG5cblx0XHRjdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcblx0XHRiYXNlLmJsdXIoKTtcblxuXHRcdGlmIChpc0luU291cmNlTW9kZSkge1xuXHRcdFx0YmFzZS5zZXRXeXNpd3lnRWRpdG9yVmFsdWUoYmFzZS5nZXRTb3VyY2VFZGl0b3JWYWx1ZSgpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmFzZS5zZXRTb3VyY2VFZGl0b3JWYWx1ZShiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcblx0XHR9XG5cblx0XHRkb20udG9nZ2xlKHNvdXJjZUVkaXRvcik7XG5cdFx0ZG9tLnRvZ2dsZSh3eXNpd3lnRWRpdG9yKTtcblxuXHRcdGRvbS50b2dnbGVDbGFzcyhlZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScsIGlzSW5Tb3VyY2VNb2RlKTtcblx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScsICFpc0luU291cmNlTW9kZSk7XG5cblx0XHR1cGRhdGVUb29sQmFyKCk7XG5cdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBzZWxlY3RlZCB0ZXh0IG9mIHRoZSBzb3VyY2UgZWRpdG9yXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCA9IGZ1bmN0aW9uICgpIHtcblx0XHRzb3VyY2VFZGl0b3IuZm9jdXMoKTtcblxuXHRcdHJldHVybiBzb3VyY2VFZGl0b3IudmFsdWUuc3Vic3RyaW5nKFxuXHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxuXHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZFxuXHRcdCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIHBhc3NlZCBjb21tYW5kXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRoYW5kbGVDb21tYW5kID0gZnVuY3Rpb24gKGNhbGxlciwgY21kKSB7XG5cdFx0Ly8gY2hlY2sgaWYgaW4gdGV4dCBtb2RlIGFuZCBoYW5kbGUgdGV4dCBjb21tYW5kc1xuXHRcdGlmIChiYXNlLmluU291cmNlTW9kZSgpKSB7XG5cdFx0XHRpZiAoY21kLnR4dEV4ZWMpIHtcblx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY21kLnR4dEV4ZWMpKSB7XG5cdFx0XHRcdFx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0LmFwcGx5KGJhc2UsIGNtZC50eHRFeGVjKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjbWQudHh0RXhlYy5jYWxsKGJhc2UsIGNhbGxlciwgc291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0KCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChjbWQuZXhlYykge1xuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oY21kLmV4ZWMpKSB7XG5cdFx0XHRcdGNtZC5leGVjLmNhbGwoYmFzZSwgY2FsbGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJhc2UuZXhlY0NvbW1hbmQoXG5cdFx0XHRcdFx0Y21kLmV4ZWMsXG5cdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNtZCwgJ2V4ZWNQYXJhbScpID8gY21kLmV4ZWNQYXJhbSA6IG51bGxcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0fTtcblxuXHQvKipcblx0ICogRXhlY3V0ZXMgYSBjb21tYW5kIG9uIHRoZSBXWVNJV1lHIGVkaXRvclxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxuXHQgKiBAcGFyYW0ge1N0cmluZ3xCb29sZWFufSBbcGFyYW1dXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBleGVjQ29tbWFuZFxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmV4ZWNDb21tYW5kID0gZnVuY3Rpb24gKGNvbW1hbmQsIHBhcmFtKSB7XG5cdFx0dmFyXHRleGVjdXRlZCAgICA9IGZhbHNlLFxuXHRcdFx0Y29tbWFuZE9iaiAgPSBiYXNlLmNvbW1hbmRzW2NvbW1hbmRdO1xuXG5cdFx0YmFzZS5mb2N1cygpO1xuXG5cdFx0Ly8gVE9ETzogbWFrZSBjb25maWd1cmFibGVcblx0XHQvLyBkb24ndCBhcHBseSBhbnkgY29tbWFuZHMgdG8gY29kZSBlbGVtZW50c1xuXHRcdGlmIChkb20uY2xvc2VzdChyYW5nZUhlbHBlci5wYXJlbnROb2RlKCksICdjb2RlJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0ZXhlY3V0ZWQgPSB3eXNpd3lnRG9jdW1lbnQuZXhlY0NvbW1hbmQoY29tbWFuZCwgZmFsc2UsIHBhcmFtKTtcblx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XG5cblx0XHQvLyBzaG93IGVycm9yIGlmIGV4ZWN1dGlvbiBmYWlsZWQgYW5kIGFuIGVycm9yIG1lc3NhZ2UgZXhpc3RzXG5cdFx0aWYgKCFleGVjdXRlZCAmJiBjb21tYW5kT2JqICYmIGNvbW1hbmRPYmouZXJyb3JNZXNzYWdlKSB7XG5cdFx0XHRhbGVydChiYXNlLl8oY29tbWFuZE9iai5lcnJvck1lc3NhZ2UpKTtcblx0XHR9XG5cblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXG5cdCAqIHRoZSBzZWxlY3Rpb25jaGFuZ2VkIGV2ZW50IGlmIGl0IGhhcy5cblx0ICpcblx0ICogSW4gYnJvd3NlcnMgb3RoZXIgdGhhdCBkb24ndCBzdXBwb3J0IHNlbGVjdGlvbmNoYW5nZSBldmVudCBpdCB3aWxsIGNoZWNrXG5cdCAqIGF0IG1vc3Qgb25jZSBldmVyeSAxMDBtcy5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNoZWNrU2VsZWN0aW9uQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRmdW5jdGlvbiBjaGVjaygpIHtcblx0XHRcdC8vIERvbid0IGNyZWF0ZSBuZXcgc2VsZWN0aW9uIGlmIHRoZXJlIGlzbid0IG9uZSAobGlrZSBhZnRlclxuXHRcdFx0Ly8gYmx1ciBldmVudCBpbiBpT1MpXG5cdFx0XHRpZiAod3lzaXd5Z1dpbmRvdy5nZXRTZWxlY3Rpb24oKSAmJlxuXHRcdFx0XHR3eXNpd3lnV2luZG93LmdldFNlbGVjdGlvbigpLnJhbmdlQ291bnQgPD0gMCkge1xuXHRcdFx0XHRjdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcblx0XHRcdC8vIHJhbmdlSGVscGVyIGNvdWxkIGJlIG51bGwgaWYgZWRpdG9yIHdhcyBkZXN0cm95ZWRcblx0XHRcdC8vIGJlZm9yZSB0aGUgdGltZW91dCBoYWQgZmluaXNoZWRcblx0XHRcdH0gZWxzZSBpZiAocmFuZ2VIZWxwZXIgJiYgIXJhbmdlSGVscGVyLmNvbXBhcmUoY3VycmVudFNlbGVjdGlvbikpIHtcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdFx0XHQvLyBJZiB0aGUgc2VsZWN0aW9uIGlzIGluIGFuIGlubGluZSB3cmFwIGl0IGluIGEgYmxvY2suXG5cdFx0XHRcdC8vIEZpeGVzICMzMzFcblx0XHRcdFx0aWYgKGN1cnJlbnRTZWxlY3Rpb24gJiYgY3VycmVudFNlbGVjdGlvbi5jb2xsYXBzZWQpIHtcblx0XHRcdFx0XHR2YXIgcGFyZW50ID0gY3VycmVudFNlbGVjdGlvbi5zdGFydENvbnRhaW5lcjtcblx0XHRcdFx0XHR2YXIgb2Zmc2V0ID0gY3VycmVudFNlbGVjdGlvbi5zdGFydE9mZnNldDtcblxuXHRcdFx0XHRcdC8vIEhhbmRsZSBpZiBzZWxlY3Rpb24gaXMgcGxhY2VkIGJlZm9yZS9hZnRlciBhbiBlbGVtZW50XG5cdFx0XHRcdFx0aWYgKG9mZnNldCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5jaGlsZE5vZGVzW29mZnNldF07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0d2hpbGUgKHBhcmVudCAmJiBwYXJlbnQucGFyZW50Tm9kZSAhPT0gd3lzaXd5Z0JvZHkpIHtcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xuXHRcdFx0XHRcdFx0d3JhcElubGluZXMod3lzaXd5Z0JvZHksIHd5c2l3eWdEb2N1bWVudCk7XG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aXNTZWxlY3Rpb25DaGVja1BlbmRpbmcgPSB0cnVlO1xuXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBsaW1pdCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnRzIHRoZSBTZWxlY3Rpb24gQVBJXG5cdFx0aWYgKCdvbnNlbGVjdGlvbmNoYW5nZScgaW4gd3lzaXd5Z0RvY3VtZW50KSB7XG5cdFx0XHRjaGVjaygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaW1lb3V0KGNoZWNrLCAxMDApO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IG5vZGUgaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXG5cdCAqIHRoZSBub2RlY2hhbmdlZCBldmVudCBpZiBpdCBoYXNcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNoZWNrTm9kZUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gY2hlY2sgaWYgbm9kZSBoYXMgY2hhbmdlZFxuXHRcdHZhclx0b2xkTm9kZSxcblx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XG5cblx0XHRpZiAoY3VycmVudE5vZGUgIT09IG5vZGUpIHtcblx0XHRcdG9sZE5vZGUgICAgICAgICAgPSBjdXJyZW50Tm9kZTtcblx0XHRcdGN1cnJlbnROb2RlICAgICAgPSBub2RlO1xuXHRcdFx0Y3VycmVudEJsb2NrTm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XG5cblx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ25vZGVjaGFuZ2VkJywge1xuXHRcdFx0XHRvbGROb2RlOiBvbGROb2RlLFxuXHRcdFx0XHRuZXdOb2RlOiBjdXJyZW50Tm9kZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IG5vZGUgdGhhdCBjb250YWlucyB0aGUgc2VsZWN0aW9uL2NhcmV0IGluXG5cdCAqIFdZU0lXWUcgbW9kZS5cblx0ICpcblx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHs/Tm9kZX1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGN1cnJlbnROb2RlXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY3VycmVudE5vZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGN1cnJlbnROb2RlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBub2RlIHRoYXQgY29udGFpbnMgdGhlXG5cdCAqIHNlbGVjdGlvbi9jYXJldCBpbiBXWVNJV1lHIG1vZGUuXG5cdCAqXG5cdCAqIFdpbGwgYmUgbnVsbCBpbiBzb3VyY2VNb2RlIG9yIGlmIHRoZXJlIGlzIG5vIHNlbGVjdGlvbi5cblx0ICpcblx0ICogQHJldHVybiB7P05vZGV9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBjdXJyZW50QmxvY2tOb2RlXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuNC40XG5cdCAqL1xuXHRiYXNlLmN1cnJlbnRCbG9ja05vZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGN1cnJlbnRCbG9ja05vZGU7XG5cdH07XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgaWYgYnV0dG9ucyBhcmUgYWN0aXZlIG9yIG5vdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dXBkYXRlQWN0aXZlQnV0dG9ucyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgZmlyc3RCbG9jaywgcGFyZW50O1xuXHRcdHZhciBhY3RpdmVDbGFzcyA9ICdhY3RpdmUnO1xuXHRcdHZhciBkb2MgICAgICAgICA9IHd5c2l3eWdEb2N1bWVudDtcblx0XHR2YXIgaXNTb3VyY2UgICAgPSBiYXNlLnNvdXJjZU1vZGUoKTtcblxuXHRcdGlmIChiYXNlLnJlYWRPbmx5KCkpIHtcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQodG9vbGJhciwgYWN0aXZlQ2xhc3MpLCBmdW5jdGlvbiAoXywgbWVudUl0ZW0pIHtcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKG1lbnVJdGVtLCBhY3RpdmVDbGFzcyk7XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIWlzU291cmNlKSB7XG5cdFx0XHRwYXJlbnQgICAgID0gcmFuZ2VIZWxwZXIucGFyZW50Tm9kZSgpO1xuXHRcdFx0Zmlyc3RCbG9jayA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQocGFyZW50KTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGJ0blN0YXRlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdHZhciBzdGF0ZSAgICAgID0gMDtcblx0XHRcdHZhciBidG4gICAgICAgID0gdG9vbGJhckJ1dHRvbnNbYnRuU3RhdGVIYW5kbGVyc1tqXS5uYW1lXTtcblx0XHRcdHZhciBzdGF0ZUZuICAgID0gYnRuU3RhdGVIYW5kbGVyc1tqXS5zdGF0ZTtcblx0XHRcdHZhciBpc0Rpc2FibGVkID0gKGlzU291cmNlICYmICFidG4uX3NjZVR4dE1vZGUpIHx8XG5cdFx0XHRcdFx0XHQoIWlzU291cmNlICYmICFidG4uX3NjZVd5c2l3eWdNb2RlKTtcblxuXHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XG5cdFx0XHRcdGlmICghaXNTb3VyY2UpIHtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcblxuXHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxuXHRcdFx0XHRcdFx0aWYgKHN0YXRlID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kU3RhdGUoc3RhdGVGbikgPyAxIDogMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoIWlzRGlzYWJsZWQpIHtcblx0XHRcdFx0c3RhdGUgPSBzdGF0ZUZuLmNhbGwoYmFzZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcblx0XHRcdH1cblxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCB8fCBzdGF0ZSA8IDApO1xuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgYWN0aXZlQ2xhc3MsIHN0YXRlID4gMCk7XG5cdFx0fVxuXG5cdFx0aWYgKGljb25zICYmIGljb25zLnVwZGF0ZSkge1xuXHRcdFx0aWNvbnMudXBkYXRlKGlzU291cmNlLCBwYXJlbnQsIGZpcnN0QmxvY2spO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogSGFuZGxlcyBhbnkga2V5IHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxuXHQgKlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0aGFuZGxlS2V5UHJlc3MgPSBmdW5jdGlvbiAoZSkge1xuXHRcdC8vIEZGIGJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTAxNDk2XG5cdFx0aWYgKGUuZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGJhc2UuY2xvc2VEcm9wRG93bigpO1xuXG5cdFx0Ly8gMTMgPSBlbnRlciBrZXlcblx0XHRpZiAoZS53aGljaCA9PT0gMTMpIHtcblx0XHRcdHZhciBMSVNUX1RBR1MgPSAnbGksdWwsb2wnO1xuXG5cdFx0XHQvLyBcIkZpeFwiIChjbHVkZ2UpIGZvciBibG9ja2xldmVsIGVsZW1lbnRzIGJlaW5nIGR1cGxpY2F0ZWQgaW4gc29tZVxuXHRcdFx0Ly8gYnJvd3NlcnMgd2hlbiBlbnRlciBpcyBwcmVzc2VkIGluc3RlYWQgb2YgaW5zZXJ0aW5nIGEgbmV3bGluZVxuXHRcdFx0aWYgKCFkb20uaXMoY3VycmVudEJsb2NrTm9kZSwgTElTVF9UQUdTKSAmJlxuXHRcdFx0XHRkb20uaGFzU3R5bGluZyhjdXJyZW50QmxvY2tOb2RlKSkge1xuXG5cdFx0XHRcdHZhciBiciA9IGRvbS5jcmVhdGVFbGVtZW50KCdicicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xuXHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnROb2RlKGJyKTtcblxuXHRcdFx0XHQvLyBMYXN0IDxicj4gb2YgYSBibG9jayB3aWxsIGJlIGNvbGxhcHNlZCAgc28gbmVlZCB0byBtYWtlIHN1cmVcblx0XHRcdFx0Ly8gdGhlIDxicj4gdGhhdCB3YXMgaW5zZXJ0ZWQgaXNuJ3QgdGhlIGxhc3Qgbm9kZSBvZiBhIGJsb2NrLlxuXHRcdFx0XHR2YXIgcGFyZW50ICA9IGJyLnBhcmVudE5vZGU7XG5cdFx0XHRcdHZhciBsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdENoaWxkO1xuXG5cdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxuXHRcdFx0XHRpZiAobGFzdENoaWxkICYmIGxhc3RDaGlsZC5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSAmJlxuXHRcdFx0XHRcdGxhc3RDaGlsZC5ub2RlVmFsdWUgPT09ICcnKSB7XG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xuXHRcdFx0XHRcdGxhc3RDaGlsZCA9IHBhcmVudC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGlzIGlzIHRoZSBsYXN0IEJSIG9mIGEgYmxvY2sgYW5kIHRoZSBwcmV2aW91c1xuXHRcdFx0XHQvLyBzaWJsaW5nIGlzIGlubGluZSB0aGVuIHdpbGwgbmVlZCBhbiBleHRyYSBCUi4gVGhpc1xuXHRcdFx0XHQvLyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgbGFzdCBCUiBvZiBhIGJsb2NrIHdpbGwgYmVcblx0XHRcdFx0Ly8gY29sbGFwc2VkLiBGaXhlcyBpc3N1ZSAjMjQ4XG5cdFx0XHRcdGlmICghZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkgJiYgbGFzdENoaWxkID09PSBiciAmJlxuXHRcdFx0XHRcdGRvbS5pc0lubGluZShici5wcmV2aW91c1NpYmxpbmcpKSB7XG5cdFx0XHRcdFx0cmFuZ2VIZWxwZXIuaW5zZXJ0SFRNTCgnPGJyPicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogTWFrZXMgc3VyZSB0aGF0IGlmIHRoZXJlIGlzIGEgY29kZSBvciBxdW90ZSB0YWcgYXQgdGhlXG5cdCAqIGVuZCBvZiB0aGUgZWRpdG9yLCB0aGF0IHRoZXJlIGlzIGEgbmV3IGxpbmUgYWZ0ZXIgaXQuXG5cdCAqXG5cdCAqIElmIHRoZXJlIHdhc24ndCBhIG5ldyBsaW5lIGF0IHRoZSBlbmQgeW91IHdvdWxkbid0IGJlIGFibGVcblx0ICogdG8gZW50ZXIgYW55IHRleHQgYWZ0ZXIgYSBjb2RlL3F1b3RlIHRhZ1xuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0YXBwZW5kTmV3TGluZSA9IGZ1bmN0aW9uICgpIHtcblx0XHQvLyBDaGVjayBhbGwgbm9kZXMgaW4gcmV2ZXJzZSB1bnRpbCBlaXRoZXIgYWRkIGEgbmV3IGxpbmVcblx0XHQvLyBvciByZWFjaCBhIG5vbi1lbXB0eSB0ZXh0bm9kZSBvciBCUiBhdCB3aGljaCBwb2ludCBjYW5cblx0XHQvLyBzdG9wIGNoZWNraW5nLlxuXHRcdGRvbS5yVHJhdmVyc2Uod3lzaXd5Z0JvZHksIGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHQvLyBMYXN0IGJsb2NrLCBhZGQgbmV3IGxpbmUgYWZ0ZXIgaWYgaGFzIHN0eWxpbmdcblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmXG5cdFx0XHRcdCEvaW5saW5lLy50ZXN0KGRvbS5jc3Mobm9kZSwgJ2Rpc3BsYXknKSkpIHtcblxuXHRcdFx0XHQvLyBBZGQgbGluZSBicmVhayBhZnRlciBpZiBoYXMgc3R5bGluZ1xuXHRcdFx0XHRpZiAoIWRvbS5pcyhub2RlLCAnLnNjZWRpdG9yLW5sZicpICYmIGRvbS5oYXNTdHlsaW5nKG5vZGUpKSB7XG5cdFx0XHRcdFx0dmFyIHBhcmFncmFwaCA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHd5c2l3eWdEb2N1bWVudCk7XG5cdFx0XHRcdFx0cGFyYWdyYXBoLmNsYXNzTmFtZSA9ICdzY2VkaXRvci1ubGYnO1xuXHRcdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSAnPGJyIC8+Jztcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIHBhcmFncmFwaCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIExhc3Qgbm9uLWVtcHR5IHRleHQgbm9kZSBvciBsaW5lIGJyZWFrLlxuXHRcdFx0Ly8gTm8gbmVlZCB0byBhZGQgbGluZS1icmVhayBhZnRlciB0aGVtXG5cdFx0XHRpZiAoKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIS9eXFxzKiQvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB8fFxuXHRcdFx0XHRkb20uaXMobm9kZSwgJ2JyJykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIGZvcm0gcmVzZXQgZXZlbnRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGhhbmRsZUZvcm1SZXNldCA9IGZ1bmN0aW9uICgpIHtcblx0XHRiYXNlLnZhbChvcmlnaW5hbC52YWx1ZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgYW55IG1vdXNlZG93biBwcmVzcyBpbiB0aGUgV1lTSVdZRyBlZGl0b3Jcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGhhbmRsZU1vdXNlRG93biA9IGZ1bmN0aW9uICgpIHtcblx0XHRiYXNlLmNsb3NlRHJvcERvd24oKTtcblx0fTtcblxuXHQvKipcblx0ICogVHJhbnNsYXRlcyB0aGUgc3RyaW5nIGludG8gdGhlIGxvY2FsZSBsYW5ndWFnZS5cblx0ICpcblx0ICogUmVwbGFjZXMgYW55IHswfSwgezF9LCB7Mn0sIGVjdC4gd2l0aCB0aGUgcGFyYW1zIHByb3ZpZGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RyXG5cdCAqIEBwYXJhbSB7Li4uU3RyaW5nfSBhcmdzXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIF9cblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5fID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0dW5kZWYsXG5cdFx0XHRhcmdzID0gYXJndW1lbnRzO1xuXG5cdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGVbYXJnc1swXV0pIHtcblx0XHRcdGFyZ3NbMF0gPSBsb2NhbGVbYXJnc1swXV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFyZ3NbMF0ucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIGZ1bmN0aW9uIChzdHIsIHAxKSB7XG5cdFx0XHRyZXR1cm4gYXJnc1twMSAtIDAgKyAxXSAhPT0gdW5kZWYgP1xuXHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcblx0XHRcdFx0J3snICsgcDEgKyAnfSc7XG5cdFx0fSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFBhc3NlcyBldmVudHMgb24gdG8gYW55IGhhbmRsZXJzXG5cdCAqIEBwcml2YXRlXG5cdCAqIEByZXR1cm4gdm9pZFxuXHQgKi9cblx0aGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuXHRcdGlmIChwbHVnaW5NYW5hZ2VyKSB7XG5cdFx0XHQvLyBTZW5kIGV2ZW50IHRvIGFsbCBwbHVnaW5zXG5cdFx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoZS50eXBlICsgJ0V2ZW50JywgZSwgYmFzZSk7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgZXZlbnQgaW50byBhIGN1c3RvbSBldmVudCB0byBzZW5kXG5cdFx0dmFyIG5hbWUgPSAoZS50YXJnZXQgPT09IHNvdXJjZUVkaXRvciA/ICdzY2VzcmMnIDogJ3NjZXd5cycpICsgZS50eXBlO1xuXG5cdFx0aWYgKGV2ZW50SGFuZGxlcnNbbmFtZV0pIHtcblx0XHRcdGV2ZW50SGFuZGxlcnNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcblx0XHRcdFx0Zm4uY2FsbChiYXNlLCBlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQmluZHMgYSBoYW5kbGVyIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnRzXG5cdCAqXG5cdCAqIFRoaXMgZnVuY3Rpb24gb25seSBiaW5kcyB0byBhIGxpbWl0ZWQgbGlzdCBvZlxuXHQgKiBzdXBwb3J0ZWQgZXZlbnRzLlxuXHQgKlxuXHQgKiBUaGUgc3VwcG9ydGVkIGV2ZW50cyBhcmU6XG5cdCAqXG5cdCAqICoga2V5dXBcblx0ICogKiBrZXlkb3duXG5cdCAqICogS2V5cHJlc3Ncblx0ICogKiBibHVyXG5cdCAqICogZm9jdXNcblx0ICogKiBpbnB1dFxuXHQgKiAqIG5vZGVjaGFuZ2VkIC0gV2hlbiB0aGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmdcblx0ICogXHRcdHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGVcblx0ICogKiBjb250ZXh0bWVudVxuXHQgKiAqIHNlbGVjdGlvbmNoYW5nZWRcblx0ICogKiB2YWx1ZWNoYW5nZWRcblx0ICpcblx0ICpcblx0ICogVGhlIGV2ZW50cyBwYXJhbSBzaG91bGQgYmUgYSBzdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQocylcblx0ICogdG8gYmluZCB0aGlzIGhhbmRsZXIgdG8uIElmIG11bHRpcGxlLCB0aGV5IHNob3VsZCBiZSBzZXBhcmF0ZWRcblx0ICogYnkgc3BhY2VzLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW50c1xuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgYmluZFxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqIEBzaW5jZSAxLjQuMVxuXHQgKi9cblx0YmFzZS5iaW5kID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcblx0XHRldmVudHMgPSBldmVudHMuc3BsaXQoJyAnKTtcblxuXHRcdHZhciBpICA9IGV2ZW50cy5sZW5ndGg7XG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcblx0XHRcdFx0dmFyIHd5c0V2ZW50ID0gJ3NjZXd5cycgKyBldmVudHNbaV07XG5cdFx0XHRcdHZhciBzcmNFdmVudCA9ICdzY2VzcmMnICsgZXZlbnRzW2ldO1xuXHRcdFx0XHQvLyBVc2UgY3VzdG9tIGV2ZW50cyB0byBhbGxvdyBwYXNzaW5nIHRoZSBpbnN0YW5jZSBhcyB0aGVcblx0XHRcdFx0Ly8gMm5kIGFyZ3VtZW50LlxuXHRcdFx0XHQvLyBBbHNvIGFsbG93cyB1bmJpbmRpbmcgd2l0aG91dCB1bmJpbmRpbmcgdGhlIGVkaXRvcnMgb3duXG5cdFx0XHRcdC8vIGV2ZW50IGhhbmRsZXJzLlxuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XG5cdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gPSBldmVudEhhbmRsZXJzW3d5c0V2ZW50XSB8fCBbXTtcblx0XHRcdFx0XHRldmVudEhhbmRsZXJzW3d5c0V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XG5cdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0gPSBldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcblx0XHRcdFx0XHRldmVudEhhbmRsZXJzW3NyY0V2ZW50XS5wdXNoKGhhbmRsZXIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gU3RhcnQgc2VuZGluZyB2YWx1ZSBjaGFuZ2VkIGV2ZW50c1xuXHRcdFx0XHRpZiAoZXZlbnRzW2ldID09PSAndmFsdWVjaGFuZ2VkJykge1xuXHRcdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQuaGFzSGFuZGxlciA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gYmFzZTtcblx0fTtcblxuXHQvKipcblx0ICogVW5iaW5kcyBhbiBldmVudCB0aGF0IHdhcyBib3VuZCB1c2luZyBiaW5kKCkuXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgdW5iaW5kaW5nIHRoaXNcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBXWVNJV1lHIGVkaXRvclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBpZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgZnJvbSB0aGUgc291cmNlIGVkaXRvclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgdW5iaW5kXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqIEBzZWUgYmluZFxuXHQgKi9cblx0YmFzZS51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xuXHRcdGV2ZW50cyA9IGV2ZW50cy5zcGxpdCgnICcpO1xuXG5cdFx0dmFyIGkgID0gZXZlbnRzLmxlbmd0aDtcblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XG5cdFx0XHRcdFx0dXRpbHMuYXJyYXlSZW1vdmUoXG5cdFx0XHRcdFx0XHRldmVudEhhbmRsZXJzWydzY2V3eXMnICsgZXZlbnRzW2ldXSB8fCBbXSwgaGFuZGxlcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVTb3VyY2UpIHtcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbJ3NjZXNyYycgKyBldmVudHNbaV1dIHx8IFtdLCBoYW5kbGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBCbHVycyB0aGUgZWRpdG9ycyBpbnB1dCBhcmVhXG5cdCAqXG5cdCAqIEByZXR1cm4ge3RoaXN9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBibHVyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuMy42XG5cdCAqL1xuXHQvKipcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGVkaXRvcnMgYmx1ciBldmVudFxuXHQgKlxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgYmx1cl4yXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqL1xuXHRiYXNlLmJsdXIgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcblx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuXHRcdFx0YmFzZS5iaW5kKCdibHVyJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xuXHRcdH0gZWxzZSBpZiAoIWJhc2Uuc291cmNlTW9kZSgpKSB7XG5cdFx0XHR3eXNpd3lnQm9keS5ibHVyKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNvdXJjZUVkaXRvci5ibHVyKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJhc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIEZvY3VzZXMgdGhlIGVkaXRvcnMgaW5wdXQgYXJlYVxuXHQgKlxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZm9jdXNcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKi9cblx0LyoqXG5cdCAqIEFkZHMgYW4gZXZlbnQgaGFuZGxlciB0byB0aGUgZm9jdXMgZXZlbnRcblx0ICpcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBpZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3Jcblx0ICogQHJldHVybiB7dGhpc31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGZvY3VzXjJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAc2luY2UgMS40LjFcblx0ICovXG5cdGJhc2UuZm9jdXMgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcblx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuXHRcdFx0YmFzZS5iaW5kKCdmb2N1cycsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcblx0XHR9IGVsc2UgaWYgKCFiYXNlLmluU291cmNlTW9kZSgpKSB7XG5cdFx0XHQvLyBBbHJlYWR5IGhhcyBmb2N1cyBzbyBkbyBub3RoaW5nXG5cdFx0XHRpZiAoZG9tLmZpbmQod3lzaXd5Z0RvY3VtZW50LCAnOmZvY3VzJykubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNvbnRhaW5lcjtcblx0XHRcdHZhciBybmcgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdC8vIEZpeCBGRiBidWcgd2hlcmUgaXQgc2hvd3MgdGhlIGN1cnNvciBpbiB0aGUgd3JvbmcgcGxhY2Vcblx0XHRcdC8vIGlmIHRoZSBlZGl0b3IgaGFzbid0IGhhZCBmb2N1cyBiZWZvcmUuIFNlZSBpc3N1ZSAjMzkzXG5cdFx0XHRpZiAoIWN1cnJlbnRTZWxlY3Rpb24pIHtcblx0XHRcdFx0YXV0b2ZvY3VzKHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcblx0XHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXG5cdFx0XHQvLyB0byBvY2N1ciB3aGVuIHNvbWV0aGluZyBpcyB0eXBlZC4gU2VlIGlzc3VlICMzMjFcblx0XHRcdGlmIChybmcgJiYgcm5nLmVuZE9mZnNldCA9PT0gMSAmJiBybmcuY29sbGFwc2VkKSB7XG5cdFx0XHRcdGNvbnRhaW5lciA9IHJuZy5lbmRDb250YWluZXI7XG5cblx0XHRcdFx0aWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcblx0XHRcdFx0XHRkb20uaXMoY29udGFpbmVyLmZpcnN0Q2hpbGQsICdicicpKSB7XG5cdFx0XHRcdFx0cm5nLnNldFN0YXJ0QmVmb3JlKGNvbnRhaW5lci5maXJzdENoaWxkKTtcblx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XG5cdFx0XHRcdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2Uocm5nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR3eXNpd3lnV2luZG93LmZvY3VzKCk7XG5cdFx0XHR3eXNpd3lnQm9keS5mb2N1cygpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzb3VyY2VFZGl0b3IuZm9jdXMoKTtcblx0XHR9XG5cblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XG5cblx0XHRyZXR1cm4gYmFzZTtcblx0fTtcblxuXHQvKipcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBkb3duIGV2ZW50XG5cdCAqXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3Jcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXG5cdCAqIEByZXR1cm4ge3RoaXN9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBrZXlEb3duXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqL1xuXHRiYXNlLmtleURvd24gPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcblx0XHRyZXR1cm4gYmFzZS5iaW5kKCdrZXlkb3duJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUga2V5IHByZXNzIGV2ZW50XG5cdCAqXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3Jcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXG5cdCAqIEByZXR1cm4ge3RoaXN9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBrZXlQcmVzc1xuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqIEBzaW5jZSAxLjQuMVxuXHQgKi9cblx0YmFzZS5rZXlQcmVzcyA9IGZ1bmN0aW9uIChoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xuXHRcdHJldHVybiBiYXNlXG5cdFx0XHQuYmluZCgna2V5cHJlc3MnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgdXAgZXZlbnRcblx0ICpcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3Jcblx0ICogQHJldHVybiB7dGhpc31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGtleVVwXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqL1xuXHRiYXNlLmtleVVwID0gZnVuY3Rpb24gKGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKSB7XG5cdFx0cmV0dXJuIGJhc2UuYmluZCgna2V5dXAnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXG5cdCAqXG5cdCAqIEhhcHBlbnMgd2hlbmV2ZXIgdGhlIG5vZGUgY29udGFpbmluZyB0aGUgc2VsZWN0aW9uL2NhcmV0XG5cdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgbm9kZUNoYW5nZWRcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAc2luY2UgMS40LjFcblx0ICovXG5cdGJhc2Uubm9kZUNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdHJldHVybiBiYXNlLmJpbmQoJ25vZGVjaGFuZ2VkJywgaGFuZGxlciwgZmFsc2UsIHRydWUpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgc2VsZWN0aW9uIGNoYW5nZWQgZXZlbnRcblx0ICpcblx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgc2VsZWN0aW9uIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXG5cdCAqIEBzaW5jZSAxLjQuMVxuXHQgKi9cblx0YmFzZS5zZWxlY3Rpb25DaGFuZ2VkID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0XHRyZXR1cm4gYmFzZS5iaW5kKCdzZWxlY3Rpb25jaGFuZ2VkJywgaGFuZGxlciwgZmFsc2UsIHRydWUpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgdmFsdWUgY2hhbmdlZCBldmVudFxuXHQgKlxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBjdXJyZW50IGVkaXRvciB2YWx1ZSBjaGFuZ2VzLlxuXHQgKlxuXHQgKiBXaGVuZXZlciBhbnl0aGluZyBpcyBpbnNlcnRlZCwgdGhlIHZhbHVlIGNoYW5nZWQgb3Jcblx0ICogMS41IHNlY3MgYWZ0ZXIgdGV4dCBpcyB0eXBlZC4gSWYgYSBzcGFjZSBpcyB0eXBlZCBpdCB3aWxsXG5cdCAqIGNhdXNlIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZlxuXHQgKiBhZnRlciAxLjUgc2Vjb25kc1xuXHQgKlxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgdmFsdWVDaGFuZ2VkXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuNC41XG5cdCAqL1xuXHRiYXNlLnZhbHVlQ2hhbmdlZCA9IGZ1bmN0aW9uIChoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xuXHRcdHJldHVybiBiYXNlXG5cdFx0XHQuYmluZCgndmFsdWVjaGFuZ2VkJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBFbW90aWNvbnMga2V5cHJlc3MgaGFuZGxlclxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZW1vdGljb25zS2V5UHJlc3MgPSBmdW5jdGlvbiAoZSkge1xuXHRcdHZhclx0cmVwbGFjZWRFbW90aWNvbixcblx0XHRcdGNhY2hlUG9zICAgICAgID0gMCxcblx0XHRcdGVtb3RpY29uc0NhY2hlID0gYmFzZS5lbW90aWNvbnNDYWNoZSxcblx0XHRcdGN1ckNoYXIgICAgICAgID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcblxuXHRcdC8vIFRPRE86IE1ha2UgY29uZmlndXJhYmxlXG5cdFx0aWYgKGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIWVtb3RpY29uc0NhY2hlKSB7XG5cdFx0XHRlbW90aWNvbnNDYWNoZSA9IFtdO1xuXG5cdFx0XHR1dGlscy5lYWNoKGFsbEVtb3RpY29ucywgZnVuY3Rpb24gKGtleSwgaHRtbCkge1xuXHRcdFx0XHRlbW90aWNvbnNDYWNoZVtjYWNoZVBvcysrXSA9IFtrZXksIGh0bWxdO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVtb3RpY29uc0NhY2hlLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XG5cdFx0XHR9KTtcblxuXHRcdFx0YmFzZS5lbW90aWNvbnNDYWNoZSA9IGVtb3RpY29uc0NhY2hlO1xuXHRcdFx0YmFzZS5sb25nZXN0RW1vdGljb25Db2RlID1cblx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbZW1vdGljb25zQ2FjaGUubGVuZ3RoIC0gMV1bMF0ubGVuZ3RoO1xuXHRcdH1cblxuXHRcdHJlcGxhY2VkRW1vdGljb24gPSByYW5nZUhlbHBlci5yZXBsYWNlS2V5d29yZChcblx0XHRcdGJhc2UuZW1vdGljb25zQ2FjaGUsXG5cdFx0XHR0cnVlLFxuXHRcdFx0dHJ1ZSxcblx0XHRcdGJhc2UubG9uZ2VzdEVtb3RpY29uQ29kZSxcblx0XHRcdG9wdGlvbnMuZW1vdGljb25zQ29tcGF0LFxuXHRcdFx0Y3VyQ2hhclxuXHRcdCk7XG5cblx0XHRpZiAocmVwbGFjZWRFbW90aWNvbikge1xuXHRcdFx0aWYgKCFvcHRpb25zLmVtb3RpY29uc0NvbXBhdCB8fCAhL15cXHMkLy50ZXN0KGN1ckNoYXIpKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIE1ha2VzIHN1cmUgZW1vdGljb25zIGFyZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2Vcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGVtb3RpY29uc0NoZWNrV2hpdGVzcGFjZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRlbW90aWNvbnMuY2hlY2tXaGl0ZXNwYWNlKGN1cnJlbnRCbG9ja05vZGUsIHJhbmdlSGVscGVyKTtcblx0fTtcblxuXHQvKipcblx0ICogR2V0cyBpZiBlbW90aWNvbnMgYXJlIGN1cnJlbnRseSBlbmFibGVkXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBlbW90aWNvbnNcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAc2luY2UgMS40LjJcblx0ICovXG5cdC8qKlxuXHQgKiBFbmFibGVzL2Rpc2FibGVzIGVtb3RpY29uc1xuXHQgKlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZW1vdGljb25zXjJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAc2luY2UgMS40LjJcblx0ICovXG5cdGJhc2UuZW1vdGljb25zID0gZnVuY3Rpb24gKGVuYWJsZSkge1xuXHRcdGlmICghZW5hYmxlICYmIGVuYWJsZSAhPT0gZmFsc2UpIHtcblx0XHRcdHJldHVybiBvcHRpb25zLmVtb3RpY29uc0VuYWJsZWQ7XG5cdFx0fVxuXG5cdFx0b3B0aW9ucy5lbW90aWNvbnNFbmFibGVkID0gZW5hYmxlO1xuXG5cdFx0aWYgKGVuYWJsZSkge1xuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBlbW90aWNvbnNLZXlQcmVzcyk7XG5cblx0XHRcdGlmICghYmFzZS5zb3VyY2VNb2RlKCkpIHtcblx0XHRcdFx0cmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XG5cblx0XHRcdFx0cmVwbGFjZUVtb3RpY29ucygpO1xuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKGZhbHNlKTtcblxuXHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGVtb3RpY29ucyA9XG5cdFx0XHRcdGRvbS5maW5kKHd5c2l3eWdCb2R5LCAnaW1nW2RhdGEtc2NlZGl0b3ItZW1vdGljb25dJyk7XG5cblx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoXywgaW1nKSB7XG5cdFx0XHRcdHZhciB0ZXh0ID0gZG9tLmRhdGEoaW1nLCAnc2NlZGl0b3ItZW1vdGljb24nKTtcblx0XHRcdFx0dmFyIHRleHROb2RlID0gd3lzaXd5Z0RvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuXHRcdFx0XHRpbWcucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIGltZyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZG9tLm9mZih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgZW1vdGljb25zS2V5UHJlc3MpO1xuXG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJhc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgV1lTSVdZRyBlZGl0b3JzIGlubGluZSBDU1Ncblx0ICpcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY3NzXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcblx0ICogQHNpbmNlIDEuNC4zXG5cdCAqL1xuXHQvKipcblx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3Jcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNzc1xuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY3NzXjJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxuXHQgKiBAc2luY2UgMS40LjNcblx0ICovXG5cdGJhc2UuY3NzID0gZnVuY3Rpb24gKGNzcykge1xuXHRcdGlmICghaW5saW5lQ3NzKSB7XG5cdFx0XHRpbmxpbmVDc3MgPSBkb20uY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7XG5cdFx0XHRcdGlkOiAnaW5saW5lJ1xuXHRcdFx0fSwgd3lzaXd5Z0RvY3VtZW50KTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdEb2N1bWVudC5oZWFkLCBpbmxpbmVDc3MpO1xuXHRcdH1cblxuXHRcdGlmICghdXRpbHMuaXNTdHJpbmcoY3NzKSkge1xuXHRcdFx0cmV0dXJuIGlubGluZUNzcy5zdHlsZVNoZWV0ID9cblx0XHRcdFx0aW5saW5lQ3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA6IGlubGluZUNzcy5pbm5lckhUTUw7XG5cdFx0fVxuXG5cdFx0aWYgKGlubGluZUNzcy5zdHlsZVNoZWV0KSB7XG5cdFx0XHRpbmxpbmVDc3Muc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpbmxpbmVDc3MuaW5uZXJIVE1MID0gY3NzO1xuXHRcdH1cblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSBrZXlkb3duIGV2ZW50LCB1c2VkIGZvciBzaG9ydGN1dHNcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGhhbmRsZUtleURvd24gPSBmdW5jdGlvbiAoZSkge1xuXHRcdHZhclx0c2hvcnRjdXQgICA9IFtdLFxuXHRcdFx0U0hJRlRfS0VZUyA9IHtcblx0XHRcdFx0J2AnOiAnficsXG5cdFx0XHRcdCcxJzogJyEnLFxuXHRcdFx0XHQnMic6ICdAJyxcblx0XHRcdFx0JzMnOiAnIycsXG5cdFx0XHRcdCc0JzogJyQnLFxuXHRcdFx0XHQnNSc6ICclJyxcblx0XHRcdFx0JzYnOiAnXicsXG5cdFx0XHRcdCc3JzogJyYnLFxuXHRcdFx0XHQnOCc6ICcqJyxcblx0XHRcdFx0JzknOiAnKCcsXG5cdFx0XHRcdCcwJzogJyknLFxuXHRcdFx0XHQnLSc6ICdfJyxcblx0XHRcdFx0Jz0nOiAnKycsXG5cdFx0XHRcdCc7JzogJzogJyxcblx0XHRcdFx0J1xcJyc6ICdcIicsXG5cdFx0XHRcdCcsJzogJzwnLFxuXHRcdFx0XHQnLic6ICc+Jyxcblx0XHRcdFx0Jy8nOiAnPycsXG5cdFx0XHRcdCdcXFxcJzogJ3wnLFxuXHRcdFx0XHQnWyc6ICd7Jyxcblx0XHRcdFx0J10nOiAnfSdcblx0XHRcdH0sXG5cdFx0XHRTUEVDSUFMX0tFWVMgPSB7XG5cdFx0XHRcdDg6ICdiYWNrc3BhY2UnLFxuXHRcdFx0XHQ5OiAndGFiJyxcblx0XHRcdFx0MTM6ICdlbnRlcicsXG5cdFx0XHRcdDE5OiAncGF1c2UnLFxuXHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcblx0XHRcdFx0Mjc6ICdlc2MnLFxuXHRcdFx0XHQzMjogJ3NwYWNlJyxcblx0XHRcdFx0MzM6ICdwYWdldXAnLFxuXHRcdFx0XHQzNDogJ3BhZ2Vkb3duJyxcblx0XHRcdFx0MzU6ICdlbmQnLFxuXHRcdFx0XHQzNjogJ2hvbWUnLFxuXHRcdFx0XHQzNzogJ2xlZnQnLFxuXHRcdFx0XHQzODogJ3VwJyxcblx0XHRcdFx0Mzk6ICdyaWdodCcsXG5cdFx0XHRcdDQwOiAnZG93bicsXG5cdFx0XHRcdDQ1OiAnaW5zZXJ0Jyxcblx0XHRcdFx0NDY6ICdkZWwnLFxuXHRcdFx0XHQ5MTogJ3dpbicsXG5cdFx0XHRcdDkyOiAnd2luJyxcblx0XHRcdFx0OTM6ICdzZWxlY3QnLFxuXHRcdFx0XHQ5NjogJzAnLFxuXHRcdFx0XHQ5NzogJzEnLFxuXHRcdFx0XHQ5ODogJzInLFxuXHRcdFx0XHQ5OTogJzMnLFxuXHRcdFx0XHQxMDA6ICc0Jyxcblx0XHRcdFx0MTAxOiAnNScsXG5cdFx0XHRcdDEwMjogJzYnLFxuXHRcdFx0XHQxMDM6ICc3Jyxcblx0XHRcdFx0MTA0OiAnOCcsXG5cdFx0XHRcdDEwNTogJzknLFxuXHRcdFx0XHQxMDY6ICcqJyxcblx0XHRcdFx0MTA3OiAnKycsXG5cdFx0XHRcdDEwOTogJy0nLFxuXHRcdFx0XHQxMTA6ICcuJyxcblx0XHRcdFx0MTExOiAnLycsXG5cdFx0XHRcdDExMjogJ2YxJyxcblx0XHRcdFx0MTEzOiAnZjInLFxuXHRcdFx0XHQxMTQ6ICdmMycsXG5cdFx0XHRcdDExNTogJ2Y0Jyxcblx0XHRcdFx0MTE2OiAnZjUnLFxuXHRcdFx0XHQxMTc6ICdmNicsXG5cdFx0XHRcdDExODogJ2Y3Jyxcblx0XHRcdFx0MTE5OiAnZjgnLFxuXHRcdFx0XHQxMjA6ICdmOScsXG5cdFx0XHRcdDEyMTogJ2YxMCcsXG5cdFx0XHRcdDEyMjogJ2YxMScsXG5cdFx0XHRcdDEyMzogJ2YxMicsXG5cdFx0XHRcdDE0NDogJ251bWxvY2snLFxuXHRcdFx0XHQxNDU6ICdzY3JvbGxsb2NrJyxcblx0XHRcdFx0MTg2OiAnOycsXG5cdFx0XHRcdDE4NzogJz0nLFxuXHRcdFx0XHQxODg6ICcsJyxcblx0XHRcdFx0MTg5OiAnLScsXG5cdFx0XHRcdDE5MDogJy4nLFxuXHRcdFx0XHQxOTE6ICcvJyxcblx0XHRcdFx0MTkyOiAnYCcsXG5cdFx0XHRcdDIxOTogJ1snLFxuXHRcdFx0XHQyMjA6ICdcXFxcJyxcblx0XHRcdFx0MjIxOiAnXScsXG5cdFx0XHRcdDIyMjogJ1xcJydcblx0XHRcdH0sXG5cdFx0XHROVU1QQURfU0hJRlRfS0VZUyA9IHtcblx0XHRcdFx0MTA5OiAnLScsXG5cdFx0XHRcdDExMDogJ2RlbCcsXG5cdFx0XHRcdDExMTogJy8nLFxuXHRcdFx0XHQ5NjogJzAnLFxuXHRcdFx0XHQ5NzogJzEnLFxuXHRcdFx0XHQ5ODogJzInLFxuXHRcdFx0XHQ5OTogJzMnLFxuXHRcdFx0XHQxMDA6ICc0Jyxcblx0XHRcdFx0MTAxOiAnNScsXG5cdFx0XHRcdDEwMjogJzYnLFxuXHRcdFx0XHQxMDM6ICc3Jyxcblx0XHRcdFx0MTA0OiAnOCcsXG5cdFx0XHRcdDEwNTogJzknXG5cdFx0XHR9LFxuXHRcdFx0d2hpY2ggICAgID0gZS53aGljaCxcblx0XHRcdGNoYXJhY3RlciA9IFNQRUNJQUxfS0VZU1t3aGljaF0gfHxcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSh3aGljaCkudG9Mb3dlckNhc2UoKTtcblxuXHRcdGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdjdHJsJyk7XG5cdFx0fVxuXG5cdFx0aWYgKGUuYWx0S2V5KSB7XG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdhbHQnKTtcblx0XHR9XG5cblx0XHRpZiAoZS5zaGlmdEtleSkge1xuXHRcdFx0c2hvcnRjdXQucHVzaCgnc2hpZnQnKTtcblxuXHRcdFx0aWYgKE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXSkge1xuXHRcdFx0XHRjaGFyYWN0ZXIgPSBOVU1QQURfU0hJRlRfS0VZU1t3aGljaF07XG5cdFx0XHR9IGVsc2UgaWYgKFNISUZUX0tFWVNbY2hhcmFjdGVyXSkge1xuXHRcdFx0XHRjaGFyYWN0ZXIgPSBTSElGVF9LRVlTW2NoYXJhY3Rlcl07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2hpZnQgaXMgMTYsIGN0cmwgaXMgMTcgYW5kIGFsdCBpcyAxOFxuXHRcdGlmIChjaGFyYWN0ZXIgJiYgKHdoaWNoIDwgMTYgfHwgd2hpY2ggPiAxOCkpIHtcblx0XHRcdHNob3J0Y3V0LnB1c2goY2hhcmFjdGVyKTtcblx0XHR9XG5cblx0XHRzaG9ydGN1dCA9IHNob3J0Y3V0LmpvaW4oJysnKTtcblx0XHRpZiAoc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0gJiZcblx0XHRcdHNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdLmNhbGwoYmFzZSkgPT09IGZhbHNlKSB7XG5cblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBBZGRzIGEgc2hvcnRjdXQgaGFuZGxlciB0byB0aGUgZWRpdG9yXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgc2hvcnRjdXRcblx0ICogQHBhcmFtICB7U3RyaW5nfEZ1bmN0aW9ufSBjbWRcblx0ICogQHJldHVybiB7c2NlZGl0b3J9XG5cdCAqL1xuXHRiYXNlLmFkZFNob3J0Y3V0ID0gZnVuY3Rpb24gKHNob3J0Y3V0LCBjbWQpIHtcblx0XHRzaG9ydGN1dCA9IHNob3J0Y3V0LnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoY21kKSkge1xuXHRcdFx0c2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGhhbmRsZUNvbW1hbmQodG9vbGJhckJ1dHRvbnNbY21kXSwgYmFzZS5jb21tYW5kc1tjbWRdKTtcblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XSA9IGNtZDtcblx0XHR9XG5cblx0XHRyZXR1cm4gYmFzZTtcblx0fTtcblxuXHQvKipcblx0ICogUmVtb3ZlcyBhIHNob3J0Y3V0IGhhbmRsZXJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBzaG9ydGN1dFxuXHQgKiBAcmV0dXJuIHtzY2VkaXRvcn1cblx0ICovXG5cdGJhc2UucmVtb3ZlU2hvcnRjdXQgPSBmdW5jdGlvbiAoc2hvcnRjdXQpIHtcblx0XHRkZWxldGUgc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXTtcblxuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBIYW5kbGVzIHRoZSBiYWNrc3BhY2Uga2V5IHByZXNzXG5cdCAqXG5cdCAqIFdpbGwgcmVtb3ZlIGJsb2NrIHN0eWxpbmcgbGlrZSBxdW90ZXMvY29kZSBlY3QgaWYgYXQgdGhlIHN0YXJ0LlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0aGFuZGxlQmFja1NwYWNlID0gZnVuY3Rpb24gKGUpIHtcblx0XHR2YXJcdG5vZGUsIG9mZnNldCwgcmFuZ2UsIHBhcmVudDtcblxuXHRcdC8vIDggaXMgdGhlIGJhY2tzcGFjZSBrZXlcblx0XHRpZiAob3B0aW9ucy5kaXNhYmxlQmxvY2tSZW1vdmUgfHwgZS53aGljaCAhPT0gOCB8fFxuXHRcdFx0IShyYW5nZSA9IHJhbmdlSGVscGVyLnNlbGVjdGVkUmFuZ2UoKSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRub2RlICAgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcblx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcblxuXHRcdGlmIChvZmZzZXQgIT09IDAgfHwgIShwYXJlbnQgPSBjdXJyZW50U3R5bGVkQmxvY2tOb2RlKCkpIHx8XG5cdFx0XHRkb20uaXMocGFyZW50LCAnYm9keScpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0d2hpbGUgKG5vZGUgIT09IHBhcmVudCkge1xuXHRcdFx0d2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcblxuXHRcdFx0XHQvLyBFdmVyeXRoaW5nIGJ1dCBlbXB0eSB0ZXh0IG5vZGVzIGJlZm9yZSB0aGUgY3Vyc29yXG5cdFx0XHRcdC8vIHNob3VsZCBwcmV2ZW50IHRoZSBzdHlsZSBmcm9tIGJlaW5nIHJlbW92ZWRcblx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUgfHwgbm9kZS5ub2RlVmFsdWUpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCEobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFRoZSBiYWNrc3BhY2Ugd2FzIHByZXNzZWQgYXQgdGhlIHN0YXJ0IG9mXG5cdFx0Ly8gdGhlIGNvbnRhaW5lciBzbyBjbGVhciB0aGUgc3R5bGVcblx0XHRiYXNlLmNsZWFyQmxvY2tGb3JtYXR0aW5nKHBhcmVudCk7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBmaXJzdCBzdHlsZWQgYmxvY2sgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBjdXJzb3Jcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAqL1xuXHRjdXJyZW50U3R5bGVkQmxvY2tOb2RlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBibG9jayA9IGN1cnJlbnRCbG9ja05vZGU7XG5cblx0XHR3aGlsZSAoIWRvbS5oYXNTdHlsaW5nKGJsb2NrKSB8fCBkb20uaXNJbmxpbmUoYmxvY2ssIHRydWUpKSB7XG5cdFx0XHRpZiAoIShibG9jayA9IGJsb2NrLnBhcmVudE5vZGUpIHx8IGRvbS5pcyhibG9jaywgJ2JvZHknKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGJsb2NrO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDbGVhcnMgdGhlIGZvcm1hdHRpbmcgb2YgdGhlIHBhc3NlZCBibG9jayBlbGVtZW50LlxuXHQgKlxuXHQgKiBJZiBibG9jayBpcyBmYWxzZSwgaWYgd2lsbCBjbGVhciB0aGUgc3R5bGluZyBvZiB0aGUgZmlyc3Rcblx0ICogYmxvY2sgbGV2ZWwgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBjdXJzb3IuXG5cdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBibG9ja1xuXHQgKiBAc2luY2UgMS40LjRcblx0ICovXG5cdGJhc2UuY2xlYXJCbG9ja0Zvcm1hdHRpbmcgPSBmdW5jdGlvbiAoYmxvY2spIHtcblx0XHRibG9jayA9IGJsb2NrIHx8IGN1cnJlbnRTdHlsZWRCbG9ja05vZGUoKTtcblxuXHRcdGlmICghYmxvY2sgfHwgZG9tLmlzKGJsb2NrLCAnYm9keScpKSB7XG5cdFx0XHRyZXR1cm4gYmFzZTtcblx0XHR9XG5cblx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcblxuXHRcdGJsb2NrLmNsYXNzTmFtZSA9ICcnO1xuXG5cdFx0ZG9tLmF0dHIoYmxvY2ssICdzdHlsZScsICcnKTtcblxuXHRcdGlmICghZG9tLmlzKGJsb2NrLCAncCxkaXYsdGQnKSkge1xuXHRcdFx0ZG9tLmNvbnZlcnRFbGVtZW50KGJsb2NrLCAncCcpO1xuXHRcdH1cblxuXHRcdHJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xuXHRcdHJldHVybiBiYXNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBUcmlnZ2VycyB0aGUgdmFsdWVDaGFuZ2VkIHNpZ25hbCBpZiB0aGVyZSBpc1xuXHQgKiBhIHBsdWdpbiB0aGF0IGhhbmRsZXMgaXQuXG5cdCAqXG5cdCAqIElmIHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpIGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY2FsbGVkLCB0aGVuIHNhdmVSYW5nZSBzaG91bGQgYmUgc2V0IHRvIGZhbHNlXG5cdCAqIHRvIHByZXZlbnQgdGhlIHJhbmdlIGJlaW5nIHNhdmVkIHR3aWNlLlxuXHQgKlxuXHQgKiBAc2luY2UgMS40LjVcblx0ICogQHBhcmFtIHtib29sZWFufSBzYXZlUmFuZ2UgSWYgdG8gY2FsbCByYW5nZUhlbHBlci5zYXZlUmFuZ2UoKS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHRyaWdnZXJWYWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoc2F2ZVJhbmdlKSB7XG5cdFx0aWYgKCFwbHVnaW5NYW5hZ2VyIHx8XG5cdFx0XHQoIXBsdWdpbk1hbmFnZXIuaGFzSGFuZGxlcigndmFsdWVjaGFuZ2VkRXZlbnQnKSAmJlxuXHRcdFx0XHQhdHJpZ2dlclZhbHVlQ2hhbmdlZC5oYXNIYW5kbGVyKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhclx0Y3VycmVudEh0bWwsXG5cdFx0XHRzb3VyY2VNb2RlICAgPSBiYXNlLnNvdXJjZU1vZGUoKSxcblx0XHRcdGhhc1NlbGVjdGlvbiA9ICFzb3VyY2VNb2RlICYmIHJhbmdlSGVscGVyLmhhc1NlbGVjdGlvbigpO1xuXG5cdFx0Ly8gQ29tcG9zaXRpb24gZW5kIGlzbid0IGd1YXJhbnRlZWQgdG8gZmlyZSBidXQgbXVzdCBoYXZlXG5cdFx0Ly8gZW5kZWQgd2hlbiB0cmlnZ2VyVmFsdWVDaGFuZ2VkKCkgaXMgY2FsbGVkIHNvIHJlc2V0IGl0XG5cdFx0aXNDb21wb3NpbmcgPSBmYWxzZTtcblxuXHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgc2NlZGl0b3Itc3RhcnQtbWFya2VyXG5cdFx0Ly8gaXMgcHJlc2VudCBhcyB0aGUgcmFuZ2UgaXMgYWxyZWFkeSBzYXZlZFxuXHRcdHNhdmVSYW5nZSA9IHNhdmVSYW5nZSAhPT0gZmFsc2UgJiZcblx0XHRcdCF3eXNpd3lnRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjZWRpdG9yLXN0YXJ0LW1hcmtlcicpO1xuXG5cdFx0Ly8gQ2xlYXIgYW55IGN1cnJlbnQgdGltZW91dCBhcyBpdCdzIG5vdyBiZWVuIHRyaWdnZXJlZFxuXHRcdGlmICh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XG5cdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGhhc1NlbGVjdGlvbiAmJiBzYXZlUmFuZ2UpIHtcblx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xuXHRcdH1cblxuXHRcdGN1cnJlbnRIdG1sID0gc291cmNlTW9kZSA/IHNvdXJjZUVkaXRvci52YWx1ZSA6IHd5c2l3eWdCb2R5LmlubmVySFRNTDtcblxuXHRcdC8vIE9ubHkgdHJpZ2dlciBpZiBzb21ldGhpbmcgaGFzIGFjdHVhbGx5IGNoYW5nZWQuXG5cdFx0aWYgKGN1cnJlbnRIdG1sICE9PSB0cmlnZ2VyVmFsdWVDaGFuZ2VkLmxhc3RWYWwpIHtcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQubGFzdFZhbCA9IGN1cnJlbnRIdG1sO1xuXG5cdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICd2YWx1ZWNoYW5nZWQnLCB7XG5cdFx0XHRcdHJhd1ZhbHVlOiBzb3VyY2VNb2RlID8gYmFzZS52YWwoKSA6IGN1cnJlbnRIdG1sXG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xuXHRcdFx0cmFuZ2VIZWxwZXIucmVtb3ZlTWFya2VycygpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGVyZSBpcyBhIGJsdXIgZXZlbnRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhbHVlQ2hhbmdlZEJsdXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHZhbHVlQ2hhbmdlZEtleVVwVGltZXIpIHtcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBrZXlwcmVzcyBldmVudFxuXHQgKiBAcGFyYW0gIHtFdmVudH0gZSBUaGUga2V5cHJlc3MgZXZlbnRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhbHVlQ2hhbmdlZEtleVVwID0gZnVuY3Rpb24gKGUpIHtcblx0XHR2YXIgd2hpY2ggICAgICAgICA9IGUud2hpY2gsXG5cdFx0XHRsYXN0Q2hhciAgICAgID0gdmFsdWVDaGFuZ2VkS2V5VXAubGFzdENoYXIsXG5cdFx0XHRsYXN0V2FzU3BhY2UgID0gKGxhc3RDaGFyID09PSAxMyB8fCBsYXN0Q2hhciA9PT0gMzIpLFxuXHRcdFx0bGFzdFdhc0RlbGV0ZSA9IChsYXN0Q2hhciA9PT0gOCB8fCBsYXN0Q2hhciA9PT0gNDYpO1xuXG5cdFx0dmFsdWVDaGFuZ2VkS2V5VXAubGFzdENoYXIgPSB3aGljaDtcblxuXHRcdGlmIChpc0NvbXBvc2luZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIDEzID0gcmV0dXJuICYgMzIgPSBzcGFjZVxuXHRcdGlmICh3aGljaCA9PT0gMTMgfHwgd2hpY2ggPT09IDMyKSB7XG5cdFx0XHRpZiAoIWxhc3RXYXNTcGFjZSkge1xuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0Ly8gOCA9IGJhY2tzcGFjZSAmIDQ2ID0gZGVsXG5cdFx0fSBlbHNlIGlmICh3aGljaCA9PT0gOCB8fCB3aGljaCA9PT0gNDYpIHtcblx0XHRcdGlmICghbGFzdFdhc0RlbGV0ZSkge1xuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCkge1xuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xuXHRcdFx0dmFsdWVDaGFuZ2VkS2V5VXAudHJpZ2dlck5leHQgPSBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBDbGVhciB0aGUgcHJldmlvdXMgdGltZW91dCBhbmQgc2V0IGEgbmV3IG9uZS5cblx0XHRjbGVhclRpbWVvdXQodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XG5cblx0XHQvLyBUcmlnZ2VyIHRoZSBldmVudCAxLjVzIGFmdGVyIHRoZSBsYXN0IGtleXByZXNzIGlmIHNwYWNlXG5cdFx0Ly8gaXNuJ3QgcHJlc3NlZC4gVGhpcyBtaWdodCBuZWVkIHRvIGJlIGxvd2VyZWQsIHdpbGwgbmVlZFxuXHRcdC8vIHRvIGxvb2sgaW50byB3aGF0IHRoZSBzbG93ZXN0IGF2ZXJhZ2UgQ2hhcnMgUGVyIE1pbiBpcy5cblx0XHR2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcblx0XHRcdH1cblx0XHR9LCAxNTAwKTtcblx0fTtcblxuXHRoYW5kbGVDb21wb3NpdGlvbiA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0aXNDb21wb3NpbmcgPSAvc3RhcnQvaS50ZXN0KGUudHlwZSk7XG5cblx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGF1dG9VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YmFzZS51cGRhdGVPcmlnaW5hbCgpO1xuXHR9O1xuXG5cdC8vIHJ1biB0aGUgaW5pdGlhbGl6ZXJcblx0aW5pdCgpO1xufVxuXG5cbi8qKlxuICogTWFwIGNvbnRhaW5pbmcgdGhlIGxvYWRlZCBTQ0VkaXRvciBsb2NhbGVzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQG5hbWUgbG9jYWxlXG4gKiBAbWVtYmVyT2Ygc2NlZGl0b3JcbiAqL1xuU0NFZGl0b3IubG9jYWxlID0ge307XG5cblNDRWRpdG9yLmZvcm1hdHMgPSB7fTtcblNDRWRpdG9yLmljb25zID0ge307XG5cblxuLyoqXG4gKiBTdGF0aWMgY29tbWFuZCBoZWxwZXIgY2xhc3NcbiAqIEBjbGFzcyBjb21tYW5kXG4gKiBAbmFtZSBzY2VkaXRvci5jb21tYW5kXG4gKi9cblNDRWRpdG9yLmNvbW1hbmQgPVxuLyoqIEBsZW5kcyBzY2VkaXRvci5jb21tYW5kICovXG57XG5cdC8qKlxuXHQgKiBHZXRzIGEgY29tbWFuZFxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuXHQgKiBAcmV0dXJuIHtPYmplY3R8bnVsbH1cblx0ICogQHNpbmNlIHYxLjMuNVxuXHQgKi9cblx0Z2V0OiBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiBkZWZhdWx0Q29tbWFuZHNbbmFtZV0gfHwgbnVsbDtcblx0fSxcblxuXHQvKipcblx0ICogPHA+QWRkcyBhIGNvbW1hbmQgdG8gdGhlIGVkaXRvciBvciB1cGRhdGVzIGFuIGV4aXN0aW5nXG5cdCAqIGNvbW1hbmQgaWYgYSBjb21tYW5kIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFscmVhZHkgZXhpc3RzLjwvcD5cblx0ICpcblx0ICogPHA+T25jZSBhIGNvbW1hbmQgaXMgYWRkIGl0IGNhbiBiZSBpbmNsdWRlZCBpbiB0aGUgdG9vbGJhciBieVxuXHQgKiBhZGRpbmcgaXQncyBuYW1lIHRvIHRoZSB0b29sYmFyIG9wdGlvbiBpbiB0aGUgY29uc3RydWN0b3IuIEl0XG5cdCAqIGNhbiBhbHNvIGJlIGV4ZWN1dGVkIG1hbnVhbGx5IGJ5IGNhbGxpbmdcblx0ICoge0BsaW5rIHNjZWRpdG9yLmV4ZWNDb21tYW5kfTwvcD5cblx0ICpcblx0ICogQGV4YW1wbGVcblx0ICogU0NFZGl0b3IuY29tbWFuZC5zZXQoXCJoZWxsb1wiLFxuXHQgKiB7XG5cdCAqICAgICBleGVjOiBmdW5jdGlvbiAoKSB7XG5cdCAqICAgICAgICAgYWxlcnQoXCJIZWxsbyBXb3JsZCFcIik7XG5cdCAqICAgICB9XG5cdCAqIH0pO1xuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuXHQgKiBAcGFyYW0ge09iamVjdH0gY21kXG5cdCAqIEByZXR1cm4ge3RoaXN8ZmFsc2V9IFJldHVybnMgZmFsc2UgaWYgbmFtZSBvciBjbWQgaXMgZmFsc2Vcblx0ICogQHNpbmNlIHYxLjMuNVxuXHQgKi9cblx0c2V0OiBmdW5jdGlvbiAobmFtZSwgY21kKSB7XG5cdFx0aWYgKCFuYW1lIHx8ICFjbWQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBtZXJnZSBhbnkgZXhpc3RpbmcgY29tbWFuZCBwcm9wZXJ0aWVzXG5cdFx0Y21kID0gdXRpbHMuZXh0ZW5kKGRlZmF1bHRDb21tYW5kc1tuYW1lXSB8fCB7fSwgY21kKTtcblxuXHRcdGNtZC5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRTQ0VkaXRvci5jb21tYW5kLnJlbW92ZShuYW1lKTtcblx0XHR9O1xuXG5cdFx0ZGVmYXVsdENvbW1hbmRzW25hbWVdID0gY21kO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGEgY29tbWFuZFxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuXHQgKiBAcmV0dXJuIHt0aGlzfVxuXHQgKiBAc2luY2UgdjEuMy41XG5cdCAqL1xuXHRyZW1vdmU6IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0aWYgKGRlZmF1bHRDb21tYW5kc1tuYW1lXSkge1xuXHRcdFx0ZGVsZXRlIGRlZmF1bHRDb21tYW5kc1tuYW1lXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcbiIsInZhciBVU0VSX0FHRU5UID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuLyoqXG4gKiBEZXRlY3RzIGlmIHRoZSBicm93c2VyIGlzIGlPU1xuICpcbiAqIE5lZWRlZCB0byBmaXggaU9TIHNwZWNpZmljIGJ1Z3NcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIGlvc1xuICogQG1lbWJlck9mIGpRdWVyeS5zY2VkaXRvclxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaW9zID0gL2lQaG9uZXxpUG9kfGlQYWR8IHdvc2Jyb3dzZXJcXC8vaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG4vKipcbiAqIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFdZU0lXWUcgZWRpdGluZyAoZS5nLiBvbGRlciBtb2JpbGUgYnJvd3NlcnMpLlxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaXNXeXNpd3lnU3VwcG9ydGVkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzV3lzaXd5Z1N1cHBvcnRlZCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhclx0bWF0Y2gsIGlzVW5zdXBwb3J0ZWQ7XG5cblx0Ly8gSUUgaXMgdGhlIG9ubHkgYnJvd3NlciB0byBzdXBwb3J0IGRvY3VtZW50TW9kZVxuXHR2YXIgaWUgPSAhIXdpbmRvdy5kb2N1bWVudC5kb2N1bWVudE1vZGU7XG5cdHZhciBsZWdhY3lFZGdlID0gJy1tcy1pbWUtYWxpZ24nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpdi5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuXG5cdC8vIENoZWNrIGlmIHRoZSBjb250ZW50RWRpdGFibGUgYXR0cmlidXRlIGlzIHN1cHBvcnRlZFxuXHRpZiAoISgnY29udGVudEVkaXRhYmxlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHx8XG5cdFx0ZGl2LmNvbnRlbnRFZGl0YWJsZSAhPT0gJ3RydWUnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gSSB0aGluayBibGFja2JlcnJ5IHN1cHBvcnRzIGNvbnRlbnRFZGl0YWJsZSBvciB3aWxsIGF0IGxlYXN0XG5cdC8vIGdpdmUgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIGNvbnRlbnRFZGl0YWJsZSBkZXRlY3Rpb24gYWJvdmVcblx0Ly8gc28gaXQgaXNuJ3QgaW5jbHVkZWQgaW4gdGhlIGJlbG93IHRlc3RzLlxuXG5cdC8vIEkgaGF0ZSBoYXZpbmcgdG8gZG8gVUEgc25pZmZpbmcgYnV0IHNvbWUgbW9iaWxlIGJyb3dzZXJzIHNheSB0aGV5XG5cdC8vIHN1cHBvcnQgY29udGVudGVkaWFibGUgd2hlbiBpdCBpc24ndCB1c2FibGUsIGkuZS4geW91IGNhbid0IGVudGVyXG5cdC8vIHRleHQuXG5cdC8vIFRoaXMgaXMgdGhlIG9ubHkgd2F5IEkgY2FuIHRoaW5rIG9mIHRvIGRldGVjdCB0aGVtIHdoaWNoIGlzIGFsc28gaG93XG5cdC8vIGV2ZXJ5IG90aGVyIGVkaXRvciBJJ3ZlIHNlZW4gZGVhbHMgd2l0aCB0aGlzIGlzc3VlLlxuXG5cdC8vIEV4Y2x1ZGUgT3BlcmEgbW9iaWxlIGFuZCBtaW5pXG5cdGlzVW5zdXBwb3J0ZWQgPSAvT3BlcmEgTW9iaXxPcGVyYSBNaW5pL2kudGVzdChVU0VSX0FHRU5UKTtcblxuXHRpZiAoL0FuZHJvaWQvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IHRydWU7XG5cblx0XHRpZiAoL1NhZmFyaS8udGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdFx0Ly8gQW5kcm9pZCBicm93c2VyIDUzNCsgc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZVxuXHRcdFx0Ly8gVGhpcyBhbHNvIG1hdGNoZXMgQ2hyb21lIHdoaWNoIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGUgdG9vXG5cdFx0XHRtYXRjaCA9IC9TYWZhcmlcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgQW1hem9uIFNpbGsgc3VwcG9ydHMgaXQsIG9sZGVyIHZlcnNpb25zIGRpZG4ndFxuXHQvLyBBcyBpdCB1c2VzIHdlYmtpdCBsaWtlIEFuZHJvaWQsIGFzc3VtZSBpdCdzIHRoZSBzYW1lIGFuZCBzdGFydGVkXG5cdC8vIHdvcmtpbmcgYXQgdmVyc2lvbnMgPj0gNTM0XG5cdGlmICgvIFNpbGtcXC8vaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0bWF0Y2ggPSAvQXBwbGVXZWJLaXRcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0aXNVbnN1cHBvcnRlZCA9ICghbWF0Y2ggfHwgIW1hdGNoWzFdID8gdHJ1ZSA6IG1hdGNoWzFdIDwgNTM0KTtcblx0fVxuXG5cdC8vIGlPUyA1KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdGlmIChpb3MpIHtcblx0XHQvLyBCbG9jayBhbnkgdmVyc2lvbiA8PSA0X3goX3gpXG5cdFx0aXNVbnN1cHBvcnRlZCA9IC9PUyBbMC00XShfXFxkKSsgbGlrZSBNYWMvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXHR9XG5cblx0Ly8gRmlyZWZveCBkb2VzIHN1cHBvcnQgV1lTSVdZRyBvbiBtb2JpbGVzIHNvIG92ZXJyaWRlXG5cdC8vIGFueSBwcmV2aW91cyB2YWx1ZSBpZiB1c2luZyBGRlxuXHRpZiAoL0ZpcmVmb3gvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0aWYgKC9PbmVCcm93c2VyL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIFVDQnJvd3NlciB3b3JrcyBidXQgZG9lc24ndCBnaXZlIGEgdW5pcXVlIHVzZXIgYWdlbnRcblx0aWYgKG5hdmlnYXRvci52ZW5kb3IgPT09ICdVQ1dFQicpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHQvLyBJRSBhbmQgbGVnYWN5IGVkZ2UgYXJlIG5vdCBzdXBwb3J0ZWQgYW55IG1vcmVcblx0aWYgKGllIHx8IGxlZ2FjeUVkZ2UpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiAhaXNVbnN1cHBvcnRlZDtcbn0oKSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcbmltcG9ydCBfdG1wbCBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XG5cbi8qKlxuICogRml4ZXMgYSBidWcgaW4gRkYgd2hlcmUgaXQgc29tZXRpbWVzIHdyYXBzXG4gKiBuZXcgbGluZXMgaW4gdGhlaXIgb3duIGxpc3QgaXRlbS5cbiAqIFNlZSBpc3N1ZSAjMzU5XG4gKi9cbmZ1bmN0aW9uIGZpeEZpcmVmb3hMaXN0QnVnKGVkaXRvcikge1xuXHQvLyBPbmx5IGFwcGx5IHRvIEZpcmVmb3ggYXMgd2lsbCBicmVhayBvdGhlciBicm93c2Vycy5cblx0aWYgKCdtb3pIaWRkZW4nIGluIGRvY3VtZW50KSB7XG5cdFx0dmFyIG5vZGUgPSBlZGl0b3IuZ2V0Qm9keSgpO1xuXHRcdHZhciBuZXh0O1xuXG5cdFx0d2hpbGUgKG5vZGUpIHtcblx0XHRcdG5leHQgPSBub2RlO1xuXG5cdFx0XHRpZiAobmV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRcdG5leHQgPSBuZXh0LmZpcnN0Q2hpbGQ7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHdoaWxlIChuZXh0ICYmICFuZXh0Lm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdFx0bmV4dCA9IG5leHQucGFyZW50Tm9kZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChuZXh0KSB7XG5cdFx0XHRcdFx0bmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgL1tcXG5cXHJcXHRdKy8udGVzdChub2RlLm5vZGVWYWx1ZSkpIHtcblx0XHRcdFx0Ly8gT25seSByZW1vdmUgaWYgbmV3bGluZXMgYXJlIGNvbGxhcHNlZFxuXHRcdFx0XHRpZiAoIS9ecHJlLy50ZXN0KGRvbS5jc3Mobm9kZS5wYXJlbnROb2RlLCAnd2hpdGVTcGFjZScpKSkge1xuXHRcdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bm9kZSA9IG5leHQ7XG5cdFx0fVxuXHR9XG59XG5cblxuLyoqXG4gKiBNYXAgb2YgYWxsIHRoZSBjb21tYW5kcyBmb3IgU0NFZGl0b3JcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAbmFtZSBjb21tYW5kc1xuICogQG1lbWJlck9mIGpRdWVyeS5zY2VkaXRvclxuICovXG52YXIgZGVmYXVsdENtZHMgPSB7XG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJvbGRcblx0Ym9sZDoge1xuXHRcdGV4ZWM6ICdib2xkJyxcblx0XHR0b29sdGlwOiAnQm9sZCcsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0InXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEl0YWxpY1xuXHRpdGFsaWM6IHtcblx0XHRleGVjOiAnaXRhbGljJyxcblx0XHR0b29sdGlwOiAnSXRhbGljJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrSSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogVW5kZXJsaW5lXG5cdHVuZGVybGluZToge1xuXHRcdGV4ZWM6ICd1bmRlcmxpbmUnLFxuXHRcdHRvb2x0aXA6ICdVbmRlcmxpbmUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtVJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdHJpa2V0aHJvdWdoXG5cdHN0cmlrZToge1xuXHRcdGV4ZWM6ICdzdHJpa2V0aHJvdWdoJyxcblx0XHR0b29sdGlwOiAnU3RyaWtldGhyb3VnaCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogU3Vic2NyaXB0XG5cdHN1YnNjcmlwdDoge1xuXHRcdGV4ZWM6ICdzdWJzY3JpcHQnLFxuXHRcdHRvb2x0aXA6ICdTdWJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1cGVyc2NyaXB0XG5cdHN1cGVyc2NyaXB0OiB7XG5cdFx0ZXhlYzogJ3N1cGVyc2NyaXB0Jyxcblx0XHR0b29sdGlwOiAnU3VwZXJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGVmdFxuXHRsZWZ0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otbGVmdFxuXHRcdFx0XHRyZXR1cm4gL2xlZnQvLnRlc3QoYWxpZ24pIHx8XG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdzdGFydCcgOiAnZW5kJyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRleGVjOiAnanVzdGlmeWxlZnQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiBsZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDZW50cmVcblx0Y2VudGVyOiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnljZW50ZXInLFxuXHRcdHRvb2x0aXA6ICdDZW50ZXInXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJpZ2h0XG5cdHJpZ2h0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otcmlnaHRcblx0XHRcdFx0cmV0dXJuIC9yaWdodC8udGVzdChhbGlnbikgfHxcblx0XHRcdFx0XHRhbGlnbiA9PT0gKGlzTHRyID8gJ2VuZCcgOiAnc3RhcnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGV4ZWM6ICdqdXN0aWZ5cmlnaHQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiByaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogSnVzdGlmeVxuXHRqdXN0aWZ5OiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnlmdWxsJyxcblx0XHR0b29sdGlwOiAnSnVzdGlmeSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBGb250XG5cdGZvbnQ6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2ZvbnQnKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLm9wdHMuZm9udHMuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChmb250KSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZm9udE9wdCcsIHtcblx0XHRcdFx0XHRmb250OiBmb250XG5cdFx0XHRcdH0sIHRydWUpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udC1waWNrZXInLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5mb250Ll9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGZvbnROYW1lKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udG5hbWUnLCBmb250TmFtZSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IE5hbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNpemVcblx0c2l6ZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnc2l6ZScpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSA3OyBpKyspIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdzaXplT3B0Jywge1xuXHRcdFx0XHRcdHNpemU6IGlcblx0XHRcdFx0fSwgdHJ1ZSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udHNpemUtcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuc2l6ZS5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250U2l6ZSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRzaXplJywgZm9udFNpemUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBTaXplJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2xvdXJcblx0Y29sb3I6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0aHRtbCAgICA9ICcnLFxuXHRcdFx0XHRjbWQgICAgID0gZGVmYXVsdENtZHMuY29sb3I7XG5cblx0XHRcdGlmICghY21kLl9odG1sQ2FjaGUpIHtcblx0XHRcdFx0ZWRpdG9yLm9wdHMuY29sb3JzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XG5cdFx0XHRcdFx0aHRtbCArPSAnPGRpdiBjbGFzcz1cInNjZWRpdG9yLWNvbG9yLWNvbHVtblwiPic7XG5cblx0XHRcdFx0XHRjb2x1bW4uc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChjb2xvcikge1xuXHRcdFx0XHRcdFx0aHRtbCArPVxuXHRcdFx0XHRcdFx0XHQnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNjZWRpdG9yLWNvbG9yLW9wdGlvblwiJyArXG5cdFx0XHRcdFx0XHRcdCcgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnICsgY29sb3IgKyAnXCInICtcblx0XHRcdFx0XHRcdFx0JyBkYXRhLWNvbG9yPVwiJyArIGNvbG9yICsgJ1wiPjwvYT4nO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aHRtbCArPSAnPC9kaXY+Jztcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Y21kLl9odG1sQ2FjaGUgPSBodG1sO1xuXHRcdFx0fVxuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgZG9tLnBhcnNlSFRNTChjbWQuX2h0bWxDYWNoZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnY29sb3InKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2NvbG9yLXBpY2tlcicsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmNvbG9yLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGNvbG9yKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9yZWNvbG9yJywgY29sb3IpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBDb2xvcidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUmVtb3ZlIEZvcm1hdFxuXHRyZW1vdmVmb3JtYXQ6IHtcblx0XHRleGVjOiAncmVtb3ZlZm9ybWF0Jyxcblx0XHR0b29sdGlwOiAnUmVtb3ZlIEZvcm1hdHRpbmcnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogQ3V0XG5cdGN1dDoge1xuXHRcdGV4ZWM6ICdjdXQnLFxuXHRcdHRvb2x0aXA6ICdDdXQnLFxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY3V0IGNvbW1hbmQuICcgK1xuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLVgnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvcHlcblx0Y29weToge1xuXHRcdGV4ZWM6ICdjb3B5Jyxcblx0XHR0b29sdGlwOiAnQ29weScsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjb3B5IGNvbW1hbmQuICcgK1xuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLUMnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlXG5cdHBhc3RlOiB7XG5cdFx0ZXhlYzogJ3Bhc3RlJyxcblx0XHR0b29sdGlwOiAnUGFzdGUnLFxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgcGFzdGUgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtVidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGUgVGV4dFxuXHRwYXN0ZXRleHQ6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdHZhbCxcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0ZWRpdG9yICA9IHRoaXM7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgncGFzdGV0ZXh0Jywge1xuXHRcdFx0XHRsYWJlbDogZWRpdG9yLl8oXG5cdFx0XHRcdFx0J1Bhc3RlIHlvdXIgdGV4dCBpbnNpZGUgdGhlIGZvbGxvd2luZyBib3g6J1xuXHRcdFx0XHQpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YWwgPSBkb20uZmluZChjb250ZW50LCAnI3R4dCcpWzBdLnZhbHVlO1xuXG5cdFx0XHRcdGlmICh2YWwpIHtcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydFRleHQodmFsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ3Bhc3RldGV4dCcsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1Bhc3RlIFRleHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJ1bGxldCBMaXN0XG5cdGJ1bGxldGxpc3Q6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcblx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ2luc2VydHVub3JkZXJlZGxpc3QnKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdCdWxsZXQgbGlzdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogT3JkZXJlZCBMaXN0XG5cdG9yZGVyZWRsaXN0OiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0Zml4RmlyZWZveExpc3RCdWcodGhpcyk7XG5cdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdpbnNlcnRvcmRlcmVkbGlzdCcpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ051bWJlcmVkIGxpc3QnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEluZGVudFxuXHRpbmRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudCwgZmlyc3RCbG9jaykge1xuXHRcdFx0Ly8gT25seSB3b3JrcyB3aXRoIGxpc3RzLCBmb3Igbm93XG5cdFx0XHR2YXJcdHJhbmdlLCBzdGFydFBhcmVudCwgZW5kUGFyZW50O1xuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICdsaScpKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIHdob2xlIGxpc3QgaXMgc2VsZWN0ZWQsIHRoZW4gdGhpcyBtdXN0IGJlXG5cdFx0XHRcdC8vIGludmFsaWRhdGVkIGJlY2F1c2UgdGhlIGJyb3dzZXIgd2lsbCBwbGFjZSBhXG5cdFx0XHRcdC8vIDxibG9ja3F1b3RlPiB0aGVyZVxuXHRcdFx0XHRyYW5nZSA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdFx0c3RhcnRQYXJlbnQgPSByYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xuXHRcdFx0XHRlbmRQYXJlbnQgICA9IHJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnROb2RlO1xuXG5cdFx0XHRcdC8vIFRPRE86IGNvdWxkIHVzZSBub2RlVHlwZSBmb3IgdGhpcz9cblx0XHRcdFx0Ly8gTWF5YmUganVzdCBjaGVjayB0aGUgZmlyc3RCbG9jayBjb250YWlucyBib3RoIHRoZSBzdGFydFxuXHRcdFx0XHQvL2FuZCBlbmQgY29udGFpbmVyc1xuXG5cdFx0XHRcdC8vIFNlbGVjdCB0aGUgdGFnLCBub3QgdGhlIHRleHROb2RlXG5cdFx0XHRcdC8vICh0aGF0J3Mgd2h5IHRoZSBwYXJlbnROb2RlKVxuXHRcdFx0XHRpZiAoc3RhcnRQYXJlbnQgIT09XG5cdFx0XHRcdFx0c3RhcnRQYXJlbnQucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCB8fFxuXHRcdFx0XHRcdC8vIHdvcmsgYXJvdW5kIGEgYnVnIGluIEZGXG5cdFx0XHRcdFx0KGRvbS5pcyhlbmRQYXJlbnQsICdsaScpICYmIGVuZFBhcmVudCAhPT1cblx0XHRcdFx0XHRcdGVuZFBhcmVudC5wYXJlbnROb2RlLmxhc3RFbGVtZW50Q2hpbGQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdGJsb2NrID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0Ly8gQW4gaW5kZW50IHN5c3RlbSBpcyBxdWl0ZSBjb21wbGljYXRlZCBhcyB0aGVyZSBhcmUgbG9hZHNcblx0XHRcdC8vIG9mIGNvbXBsaWNhdGlvbnMgYW5kIGlzc3VlcyBhcm91bmQgaG93IHRvIGluZGVudCB0ZXh0XG5cdFx0XHQvLyBBcyBkZWZhdWx0LCBsZXQncyBqdXN0IHN0YXkgd2l0aCBpbmRlbnRpbmcgdGhlIGxpc3RzLFxuXHRcdFx0Ly8gYXQgbGVhc3QsIGZvciBub3cuXG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdpbmRlbnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdBZGQgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBPdXRkZW50XG5cdG91dGRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudHMsIGZpcnN0QmxvY2spIHtcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdChmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpID8gMCA6IC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRibG9jayA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnb3V0ZGVudCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1JlbW92ZSBvbmUgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRhYmxlXG5cdHRhYmxlOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcyxcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd0YWJsZScsIHtcblx0XHRcdFx0cm93czogZWRpdG9yLl8oJ1Jvd3M6JyksXG5cdFx0XHRcdGNvbHM6IGVkaXRvci5fKCdDb2xzOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXJcdHJvd3MgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNyb3dzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGNvbHMgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNjb2xzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGh0bWwgPSAnPHRhYmxlPic7XG5cblx0XHRcdFx0aWYgKHJvd3MgPiAwICYmIGNvbHMgPiAwKSB7XG5cdFx0XHRcdFx0aHRtbCArPSBBcnJheShyb3dzICsgMSkuam9pbihcblx0XHRcdFx0XHRcdCc8dHI+JyArXG5cdFx0XHRcdFx0XHRcdEFycmF5KGNvbHMgKyAxKS5qb2luKFxuXHRcdFx0XHRcdFx0XHRcdCc8dGQ+PGJyIC8+PC90ZD4nXG5cdFx0XHRcdFx0XHRcdCkgK1xuXHRcdFx0XHRcdFx0JzwvdHI+J1xuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRodG1sICs9ICc8L3RhYmxlPic7XG5cblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoaHRtbCk7XG5cdFx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydHRhYmxlJywgY29udGVudCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgdGFibGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogSG9yaXpvbnRhbCBSdWxlXG5cdGhvcml6b250YWxydWxlOiB7XG5cdFx0ZXhlYzogJ2luc2VydGhvcml6b250YWxydWxlJyxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgaG9yaXpvbnRhbCBydWxlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvZGVcblx0Y29kZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdCc8Y29kZT4nLFxuXHRcdFx0XHQnPGJyIC8+PC9jb2RlPidcblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnQ29kZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBJbWFnZVxuXHRpbWFnZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBzZWxlY3RlZCwgY2IpIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdpbWFnZScsIHtcblx0XHRcdFx0dXJsOiBlZGl0b3IuXygnVVJMOicpLFxuXHRcdFx0XHR3aWR0aDogZWRpdG9yLl8oJ1dpZHRoIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGhlaWdodDogZWRpdG9yLl8oJ0hlaWdodCAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cblx0XHRcdHZhclx0dXJsSW5wdXQgPSBkb20uZmluZChjb250ZW50LCAnI2ltYWdlJylbMF07XG5cblx0XHRcdHVybElucHV0LnZhbHVlID0gc2VsZWN0ZWQ7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICh1cmxJbnB1dC52YWx1ZSkge1xuXHRcdFx0XHRcdGNiKFxuXHRcdFx0XHRcdFx0dXJsSW5wdXQudmFsdWUsXG5cdFx0XHRcdFx0XHRkb20uZmluZChjb250ZW50LCAnI3dpZHRoJylbMF0udmFsdWUsXG5cdFx0XHRcdFx0XHRkb20uZmluZChjb250ZW50LCAnI2hlaWdodCcpWzBdLnZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGltYWdlJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5pbWFnZS5fZHJvcERvd24oXG5cdFx0XHRcdGVkaXRvcixcblx0XHRcdFx0Y2FsbGVyLFxuXHRcdFx0XHQnJyxcblx0XHRcdFx0ZnVuY3Rpb24gKHVybCwgd2lkdGgsIGhlaWdodCkge1xuXHRcdFx0XHRcdHZhciBhdHRycyAgPSAnJztcblxuXHRcdFx0XHRcdGlmICh3aWR0aCkge1xuXHRcdFx0XHRcdFx0YXR0cnMgKz0gJyB3aWR0aD1cIicgKyBwYXJzZUludCh3aWR0aCwgMTApICsgJ1wiJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIGhlaWdodD1cIicgKyBwYXJzZUludChoZWlnaHQsIDEwKSArICdcIic7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YXR0cnMgKz0gJyBzcmM9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCInO1xuXG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHRcdFx0JzxpbWcnICsgYXR0cnMgKyAnIC8+J1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGltYWdlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEUtbWFpbFxuXHRlbWFpbDoge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYikge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2VtYWlsJywge1xuXHRcdFx0XHRsYWJlbDogZWRpdG9yLl8oJ0UtbWFpbDonKSxcblx0XHRcdFx0ZGVzYzogZWRpdG9yLl8oJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciBlbWFpbCA9IGRvbS5maW5kKGNvbnRlbnQsICcjZW1haWwnKVswXS52YWx1ZTtcblxuXHRcdFx0XHRpZiAoZW1haWwpIHtcblx0XHRcdFx0XHRjYihlbWFpbCwgZG9tLmZpbmQoY29udGVudCwgJyNkZXMnKVswXS52YWx1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRlbWFpbCcsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuZW1haWwuX2Ryb3BEb3duKFxuXHRcdFx0XHRlZGl0b3IsXG5cdFx0XHRcdGNhbGxlcixcblx0XHRcdFx0ZnVuY3Rpb24gKGVtYWlsLCB0ZXh0KSB7XG5cdFx0XHRcdFx0aWYgKCFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSB8fCB0ZXh0KSB7XG5cdFx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArXG5cdFx0XHRcdFx0XHRcdCdtYWlsdG86JyArIGVzY2FwZS5lbnRpdGllcyhlbWFpbCkgKyAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKCh0ZXh0IHx8IGVtYWlsKSkgK1xuXHRcdFx0XHRcdFx0XHQnPC9hPidcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsICdtYWlsdG86JyArIGVtYWlsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGVtYWlsJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IExpbmtcblx0bGluazoge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYikge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnbGluaycsIHtcblx0XHRcdFx0dXJsOiBlZGl0b3IuXygnVVJMOicpLFxuXHRcdFx0XHRkZXNjOiBlZGl0b3IuXygnRGVzY3JpcHRpb24gKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aW5zOiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0dmFyIGxpbmtJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjbGluaycpWzBdO1xuXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRVcmwoZSkge1xuXHRcdFx0XHRpZiAobGlua0lucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2IobGlua0lucHV0LnZhbHVlLCBkb20uZmluZChjb250ZW50LCAnI2RlcycpWzBdLnZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGluc2VydFVybCk7XG5cdFx0XHRkb20ub24oY29udGVudCwgJ2tleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Ly8gMTMgPSBlbnRlciBrZXlcblx0XHRcdFx0aWYgKGUud2hpY2ggPT09IDEzICYmIGxpbmtJbnB1dC52YWx1ZSkge1xuXHRcdFx0XHRcdGluc2VydFVybChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgZG9tLkVWRU5UX0NBUFRVUkUpO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmxpbmsuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAodXJsLCB0ZXh0KSB7XG5cdFx0XHRcdGlmICh0ZXh0IHx8ICFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSkge1xuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArIGVzY2FwZS5lbnRpdGllcyh1cmwpICsgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCB8fCB1cmwpICtcblx0XHRcdFx0XHRcdCc8L2E+J1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgdXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgbGluaydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBVbmxpbmtcblx0dW5saW5rOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdCh0aGlzLmN1cnJlbnROb2RlKCksICdhJykgPyAwIDogLTE7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYW5jaG9yID0gZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50Tm9kZSgpLCAnYScpO1xuXG5cdFx0XHRpZiAoYW5jaG9yKSB7XG5cdFx0XHRcdHdoaWxlIChhbmNob3IuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoYW5jaG9yLmZpcnN0Q2hpbGQsIGFuY2hvcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkb20ucmVtb3ZlKGFuY2hvcik7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnVW5saW5rJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUXVvdGVcblx0cXVvdGU6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyLCBodG1sLCBhdXRob3IpIHtcblx0XHRcdHZhclx0YmVmb3JlID0gJzxibG9ja3F1b3RlPicsXG5cdFx0XHRcdGVuZCAgICA9ICc8L2Jsb2NrcXVvdGU+JztcblxuXHRcdFx0Ly8gaWYgdGhlcmUgaXMgSFRNTCBwYXNzZWQgc2V0IGVuZCB0byBudWxsIHNvIGFueSBzZWxlY3RlZFxuXHRcdFx0Ly8gdGV4dCBpcyByZXBsYWNlZFxuXHRcdFx0aWYgKGh0bWwpIHtcblx0XHRcdFx0YXV0aG9yID0gKGF1dGhvciA/ICc8Y2l0ZT4nICtcblx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoYXV0aG9yKSArXG5cdFx0XHRcdCc8L2NpdGU+JyA6ICcnKTtcblx0XHRcdFx0YmVmb3JlID0gYmVmb3JlICsgYXV0aG9yICsgaHRtbCArIGVuZDtcblx0XHRcdFx0ZW5kICAgID0gbnVsbDtcblx0XHRcdC8vIGlmIG5vdCBhZGQgYSBuZXdsaW5lIHRvIHRoZSBlbmQgb2YgdGhlIGluc2VydGVkIHF1b3RlXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSA9PT0gJycpIHtcblx0XHRcdFx0ZW5kID0gJzxiciAvPicgKyBlbmQ7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoYmVmb3JlLCBlbmQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFF1b3RlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEVtb3RpY29uc1xuXHRlbW90aWNvbjoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHR2YXIgY3JlYXRlQ29udGVudCA9IGZ1bmN0aW9uIChpbmNsdWRlTW9yZSkge1xuXHRcdFx0XHR2YXJcdG1vcmVMaW5rLFxuXHRcdFx0XHRcdG9wdHMgICAgICAgICAgICA9IGVkaXRvci5vcHRzLFxuXHRcdFx0XHRcdGVtb3RpY29uc1Jvb3QgICA9IG9wdHMuZW1vdGljb25zUm9vdCB8fCAnJyxcblx0XHRcdFx0XHRlbW90aWNvbnNDb21wYXQgPSBvcHRzLmVtb3RpY29uc0NvbXBhdCxcblx0XHRcdFx0XHRyYW5nZUhlbHBlciAgICAgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcblx0XHRcdFx0XHRzdGFydFNwYWNlICAgICAgPSBlbW90aWNvbnNDb21wYXQgJiZcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dCh0cnVlLCAxKSAhPT0gJyAnID8gJyAnIDogJycsXG5cdFx0XHRcdFx0ZW5kU3BhY2UgICAgICAgID0gZW1vdGljb25zQ29tcGF0ICYmXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5nZXRPdXRlclRleHQoZmFsc2UsIDEpICE9PSAnICcgPyAnICcgOiAnJyxcblx0XHRcdFx0XHRjb250ZW50ICAgICAgICAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdFx0bGluZSAgICAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRcdHBlckxpbmUgICAgICAgICA9IDAsXG5cdFx0XHRcdFx0ZW1vdGljb25zICAgICAgID0gdXRpbHMuZXh0ZW5kKFxuXHRcdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0XHRvcHRzLmVtb3RpY29ucy5kcm9wZG93bixcblx0XHRcdFx0XHRcdGluY2x1ZGVNb3JlID8gb3B0cy5lbW90aWNvbnMubW9yZSA6IHt9XG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XG5cblx0XHRcdFx0cGVyTGluZSA9IE1hdGguc3FydChPYmplY3Qua2V5cyhlbW90aWNvbnMpLmxlbmd0aCk7XG5cblx0XHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdpbWcnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGVkaXRvci5pbnNlcnQoc3RhcnRTcGFjZSArIGRvbS5hdHRyKHRoaXMsICdhbHQnKSArIGVuZFNwYWNlLFxuXHRcdFx0XHRcdFx0bnVsbCwgZmFsc2UpLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoY29kZSwgZW1vdGljb24pIHtcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobGluZSwgZG9tLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcblx0XHRcdFx0XHRcdHNyYzogZW1vdGljb25zUm9vdCArIChlbW90aWNvbi51cmwgfHwgZW1vdGljb24pLFxuXHRcdFx0XHRcdFx0YWx0OiBjb2RlLFxuXHRcdFx0XHRcdFx0dGl0bGU6IGVtb3RpY29uLnRvb2x0aXAgfHwgY29kZVxuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRcdGlmIChsaW5lLmNoaWxkcmVuLmxlbmd0aCA+PSBwZXJMaW5lKSB7XG5cdFx0XHRcdFx0XHRsaW5lID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGxpbmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKCFpbmNsdWRlTW9yZSAmJiBvcHRzLmVtb3RpY29ucy5tb3JlKSB7XG5cdFx0XHRcdFx0bW9yZUxpbmsgPSBkb20uY3JlYXRlRWxlbWVudCgnYScsIHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLW1vcmUnXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobW9yZUxpbmssXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlZGl0b3IuXygnTW9yZScpKSk7XG5cblx0XHRcdFx0XHRkb20ub24obW9yZUxpbmssICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oXG5cdFx0XHRcdFx0XHRcdGNhbGxlciwgJ21vcmUtZW1vdGljb25zJywgY3JlYXRlQ29udGVudCh0cnVlKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIG1vcmVMaW5rKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2Vtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQoZmFsc2UpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdGRlZmF1bHRDbWRzLmVtb3RpY29uLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBlbW90aWNvbidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBZb3VUdWJlXG5cdHlvdXR1YmU6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd5b3V0dWJlTWVudScsIHtcblx0XHRcdFx0bGFiZWw6IGVkaXRvci5fKCdWaWRlbyBVUkw6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBkb20uZmluZChjb250ZW50LCAnI2xpbmsnKVswXS52YWx1ZTtcblx0XHRcdFx0dmFyIGlkTWF0Y2ggPSB2YWwubWF0Y2goLyg/OnY9fHZcXC98ZW1iZWRcXC98eW91dHUuYmVcXC8pPyhbYS16QS1aMC05Xy1dezExfSkvKTtcblx0XHRcdFx0dmFyIHRpbWVNYXRjaCA9IHZhbC5tYXRjaCgvWyZ8P10oPzpzdGFyKT90PSgoXFxkK1tobXNdPyl7MSwzfSkvKTtcblx0XHRcdFx0dmFyIHRpbWUgPSAwO1xuXG5cdFx0XHRcdGlmICh0aW1lTWF0Y2gpIHtcblx0XHRcdFx0XHR1dGlscy5lYWNoKHRpbWVNYXRjaFsxXS5zcGxpdCgvW2htc10vKSwgZnVuY3Rpb24gKGksIHZhbCkge1xuXHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0dGltZSA9ICh0aW1lICogNjApICsgTnVtYmVyKHZhbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWRNYXRjaCAmJiAvXlthLXpBLVowLTlfLV17MTF9JC8udGVzdChpZE1hdGNoWzFdKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKGlkTWF0Y2hbMV0sIHRpbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGJ0bikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLnlvdXR1YmUuX2Ryb3BEb3duKGVkaXRvciwgYnRuLCBmdW5jdGlvbiAoaWQsIHRpbWUpIHtcblx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKF90bXBsKCd5b3V0dWJlJywge1xuXHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFlvdVR1YmUgdmlkZW8nXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRGF0ZVxuXHRkYXRlOiB7XG5cdFx0X2RhdGU6IGZ1bmN0aW9uIChlZGl0b3IpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHR5ZWFyICA9IG5vdy5nZXRZZWFyKCksXG5cdFx0XHRcdG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxLFxuXHRcdFx0XHRkYXkgICA9IG5vdy5nZXREYXRlKCk7XG5cblx0XHRcdGlmICh5ZWFyIDwgMjAwMCkge1xuXHRcdFx0XHR5ZWFyID0gMTkwMCArIHllYXI7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtb250aCA8IDEwKSB7XG5cdFx0XHRcdG1vbnRoID0gJzAnICsgbW9udGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXkgPCAxMCkge1xuXHRcdFx0XHRkYXkgPSAnMCcgKyBkYXk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlZGl0b3Iub3B0cy5kYXRlRm9ybWF0XG5cdFx0XHRcdC5yZXBsYWNlKC95ZWFyL2ksIHllYXIpXG5cdFx0XHRcdC5yZXBsYWNlKC9tb250aC9pLCBtb250aClcblx0XHRcdFx0LnJlcGxhY2UoL2RheS9pLCBkYXkpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IGRhdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVGltZVxuXHR0aW1lOiB7XG5cdFx0X3RpbWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRob3VycyA9IG5vdy5nZXRIb3VycygpLFxuXHRcdFx0XHRtaW5zICA9IG5vdy5nZXRNaW51dGVzKCksXG5cdFx0XHRcdHNlY3MgID0gbm93LmdldFNlY29uZHMoKTtcblxuXHRcdFx0aWYgKGhvdXJzIDwgMTApIHtcblx0XHRcdFx0aG91cnMgPSAnMCcgKyBob3Vycztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1pbnMgPCAxMCkge1xuXHRcdFx0XHRtaW5zID0gJzAnICsgbWlucztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNlY3MgPCAxMCkge1xuXHRcdFx0XHRzZWNzID0gJzAnICsgc2Vjcztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGhvdXJzICsgJzonICsgbWlucyArICc6JyArIHNlY3M7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IHRpbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBMdHJcblx0bHRyOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ2x0cic7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSAgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJyA/ICcnIDogJ2x0cic7XG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTGVmdC10by1SaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBSdGxcblx0cnRsOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblxuXHRcdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHRvZ2dsZVZhbHVlID0gZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJykgPT09ICdydGwnID8gJycgOiAncnRsJztcblx0XHRcdGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicsIHRvZ2dsZVZhbHVlKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdSaWdodC10by1MZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUHJpbnRcblx0cHJpbnQ6IHtcblx0XHRleGVjOiAncHJpbnQnLFxuXHRcdHRvb2x0aXA6ICdQcmludCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBNYXhpbWl6ZVxuXHRtYXhpbWl6ZToge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5tYXhpbWl6ZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5tYXhpbWl6ZSghdGhpcy5tYXhpbWl6ZSgpKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTWF4aW1pemUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtNJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNvdXJjZVxuXHRzb3VyY2U6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlTW9kZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdWaWV3IHNvdXJjZScsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K1MnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgY29tbWFuZHMgYWJvdmUgY2FuIGJlIHJlbW92ZWRcblx0Ly8gd2l0aG91dCBoYXZpbmcgdG8gcmVtb3ZlIHRoZSAsIGFmdGVyIHRoZSBsYXN0IG9uZS5cblx0Ly8gTmVlZGVkIGZvciBJRS5cblx0aWdub3JlOiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdENtZHM7XG4iLCJpbXBvcnQgeyBhdHRyIH0gZnJvbSAnLi9kb20uanMnO1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBmb3IgU0NFZGl0b3JcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcblx0LyoqIEBsZW5kcyBqUXVlcnkuc2NlZGl0b3IuZGVmYXVsdE9wdGlvbnMgKi9cblx0LyoqXG5cdCAqIFRvb2xiYXIgYnV0dG9ucyBvcmRlciBhbmQgZ3JvdXBzLiBTaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZFxuXHQgKiBoYXZlIGEgYmFyIHwgdG8gc2VwYXJhdGUgZ3JvdXBzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0b29sYmFyOiAnYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZSxzdWJzY3JpcHQsc3VwZXJzY3JpcHR8JyArXG5cdFx0J2xlZnQsY2VudGVyLHJpZ2h0LGp1c3RpZnl8Zm9udCxzaXplLGNvbG9yLHJlbW92ZWZvcm1hdHwnICtcblx0XHQnY3V0LGNvcHkscGFzdGV0ZXh0fGJ1bGxldGxpc3Qsb3JkZXJlZGxpc3QsaW5kZW50LG91dGRlbnR8JyArXG5cdFx0J3RhYmxlfGNvZGUscXVvdGV8aG9yaXpvbnRhbHJ1bGUsaW1hZ2UsZW1haWwsbGluayx1bmxpbmt8JyArXG5cdFx0J2Vtb3RpY29uLHlvdXR1YmUsZGF0ZSx0aW1lfGx0cixydGx8cHJpbnQsbWF4aW1pemUsc291cmNlJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY29tbWFuZHMgdG8gZXhjbHVkZXMgZnJvbSB0aGUgdG9vbGJhclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhckV4Y2x1ZGU6IG51bGwsXG5cblx0LyoqXG5cdCAqIFN0eWxlc2hlZXQgdG8gaW5jbHVkZSBpbiB0aGUgV1lTSVdZRyBlZGl0b3IuIFRoaXMgaXMgd2hhdCB3aWxsIHN0eWxlXG5cdCAqIHRoZSBXWVNJV1lHIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzdHlsZTogJ2pxdWVyeS5zY2VkaXRvci5kZWZhdWx0LmNzcycsXG5cblx0LyoqXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGZvbnRzIGZvciB0aGUgZm9udCBzZWxlY3RvclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Zm9udHM6ICdBcmlhbCxBcmlhbCBCbGFjayxDb21pYyBTYW5zIE1TLENvdXJpZXIgTmV3LEdlb3JnaWEsSW1wYWN0LCcgK1xuXHRcdCdTYW5zLXNlcmlmLFNlcmlmLFRpbWVzIE5ldyBSb21hbixUcmVidWNoZXQgTVMsVmVyZGFuYScsXG5cblx0LyoqXG5cdCAqIENvbG9ycyBzaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZCBoYXZlIGEgYmFyIHwgdG8gc2lnbmFsIGEgbmV3XG5cdCAqIGNvbHVtbi5cblx0ICpcblx0ICogSWYgbnVsbCB0aGUgY29sb3JzIHdpbGwgYmUgYXV0byBnZW5lcmF0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjb2xvcnM6ICcjMDAwMDAwLCM0NEI4RkYsIzFFOTJGNywjMDA3NEQ5LCMwMDVEQzIsIzAwMzY5QiwjYjNkNWY0fCcgK1xuXHRcdFx0JyM0NDQ0NDQsI0MzRkZGRiwjOURGOUZGLCM3RkRCRkYsIzY4QzRFOCwjNDE5REMxLCNkOWY0ZmZ8JyArXG5cdFx0XHQnIzY2NjY2NiwjNzJGRjg0LCM0Q0VBNUUsIzJFQ0M0MCwjMTdCNTI5LCMwMDhFMDIsI2MwZjBjNnwnICtcblx0XHRcdCcjODg4ODg4LCNGRkZGNDQsI0ZGRkExRSwjRkZEQzAwLCNFOEM1MDAsI0MxOUUwMCwjZmZmNWIzfCcgK1xuXHRcdFx0JyNhYWFhYWEsI0ZGQzk1RiwjRkZBMzM5LCNGRjg1MUIsI0U4NkUwNCwjQzE0NzAwLCNmZmRiYmJ8JyArXG5cdFx0XHQnI2NjY2NjYywjRkY4NTdBLCNGRjVGNTQsI0ZGNDEzNiwjRTgyQTFGLCNDMTAzMDAsI2ZmYzZjM3wnICtcblx0XHRcdCcjZWVlZWVlLCNGRjU2RkYsI0ZGMzBEQywjRjAxMkJFLCNEOTAwQTcsI0IyMDA4MCwjZmJiOGVjfCcgK1xuXHRcdFx0JyNmZmZmZmYsI0Y1NTFGRiwjQ0YyQkU3LCNCMTBEQzksIzlBMDBCMiwjOUEwMEIyLCNlOGI2ZWYnLFxuXG5cdC8qKlxuXHQgKiBUaGUgbG9jYWxlIHRvIHVzZS5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGxvY2FsZTogYXR0cihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdsYW5nJykgfHwgJ2VuJyxcblxuXHQvKipcblx0ICogVGhlIENoYXJzZXQgdG8gdXNlXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjaGFyc2V0OiAndXRmLTgnLFxuXG5cdC8qKlxuXHQgKiBDb21wYXRpYmlsaXR5IG1vZGUgZm9yIGVtb3RpY29ucy5cblx0ICpcblx0ICogSGVscHMgaWYgeW91IGhhdmUgZW1vdGljb25zIHN1Y2ggYXMgOi8gd2hpY2ggd291bGQgcHV0IGFuIGVtb3RpY29uXG5cdCAqIGluc2lkZSBodHRwOi8vXG5cdCAqXG5cdCAqIFRoaXMgbW9kZSByZXF1aXJlcyBlbW90aWNvbnMgdG8gYmUgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlIG9yIGVuZCBvZlxuXHQgKiBsaW5lIGNoYXJzLiBUaGlzIG1vZGUgaGFzIGxpbWl0ZWQgQXMgWW91IFR5cGUgZW1vdGljb24gY29udmVyc2lvblxuXHQgKiBzdXBwb3J0LiBJdCB3aWxsIG5vdCByZXBsYWNlIEFZVCBmb3IgZW5kIG9mIGxpbmUgY2hhcnMsIG9ubHlcblx0ICogZW1vdGljb25zIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZS4gVGhleSB3aWxsIHN0aWxsIGJlIHJlcGxhY2VkXG5cdCAqIGNvcnJlY3RseSB3aGVuIGxvYWRlZCBqdXN0IG5vdCBBWVQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZW1vdGljb25zQ29tcGF0OiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIGVtb3RpY29ucy4gQ2FuIGJlIGNoYW5nZXMgYXQgcnVudGltZSB1c2luZyB0aGVcblx0ICogZW1vdGljb25zKCkgbWV0aG9kLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICogQHNpbmNlIDEuNC4yXG5cdCAqL1xuXHRlbW90aWNvbnNFbmFibGVkOiBmYWxzZSxcblxuXHQvKipcblx0ICogRW1vdGljb24gcm9vdCBVUkxcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGVtb3RpY29uc1Jvb3Q6ICcnLFxuXHRlbW90aWNvbnM6IHtcblx0XHRkcm9wZG93bjoge1xuXHRcdFx0JzopJzogJ2Vtb3RpY29ucy9zbWlsZS5wbmcnLFxuXHRcdFx0JzphbmdlbDonOiAnZW1vdGljb25zL2FuZ2VsLnBuZycsXG5cdFx0XHQnOmFuZ3J5Oic6ICdlbW90aWNvbnMvYW5ncnkucG5nJyxcblx0XHRcdCc4LSknOiAnZW1vdGljb25zL2Nvb2wucG5nJyxcblx0XHRcdCc6XFwnKCc6ICdlbW90aWNvbnMvY3d5LnBuZycsXG5cdFx0XHQnOmVybW06JzogJ2Vtb3RpY29ucy9lcm1tLnBuZycsXG5cdFx0XHQnOkQnOiAnZW1vdGljb25zL2dyaW4ucG5nJyxcblx0XHRcdCc8Myc6ICdlbW90aWNvbnMvaGVhcnQucG5nJyxcblx0XHRcdCc6KCc6ICdlbW90aWNvbnMvc2FkLnBuZycsXG5cdFx0XHQnOk8nOiAnZW1vdGljb25zL3Nob2NrZWQucG5nJyxcblx0XHRcdCc6UCc6ICdlbW90aWNvbnMvdG9uZ3VlLnBuZycsXG5cdFx0XHQnOyknOiAnZW1vdGljb25zL3dpbmsucG5nJ1xuXHRcdH0sXG5cdFx0bW9yZToge1xuXHRcdFx0JzphbGllbjonOiAnZW1vdGljb25zL2FsaWVuLnBuZycsXG5cdFx0XHQnOmJsaW5rOic6ICdlbW90aWNvbnMvYmxpbmsucG5nJyxcblx0XHRcdCc6Ymx1c2g6JzogJ2Vtb3RpY29ucy9ibHVzaC5wbmcnLFxuXHRcdFx0JzpjaGVlcmZ1bDonOiAnZW1vdGljb25zL2NoZWVyZnVsLnBuZycsXG5cdFx0XHQnOmRldmlsOic6ICdlbW90aWNvbnMvZGV2aWwucG5nJyxcblx0XHRcdCc6ZGl6enk6JzogJ2Vtb3RpY29ucy9kaXp6eS5wbmcnLFxuXHRcdFx0JzpnZXRsb3N0Oic6ICdlbW90aWNvbnMvZ2V0bG9zdC5wbmcnLFxuXHRcdFx0JzpoYXBweTonOiAnZW1vdGljb25zL2hhcHB5LnBuZycsXG5cdFx0XHQnOmtpc3Npbmc6JzogJ2Vtb3RpY29ucy9raXNzaW5nLnBuZycsXG5cdFx0XHQnOm5pbmphOic6ICdlbW90aWNvbnMvbmluamEucG5nJyxcblx0XHRcdCc6cGluY2g6JzogJ2Vtb3RpY29ucy9waW5jaC5wbmcnLFxuXHRcdFx0Jzpwb3V0eTonOiAnZW1vdGljb25zL3BvdXR5LnBuZycsXG5cdFx0XHQnOnNpY2s6JzogJ2Vtb3RpY29ucy9zaWNrLnBuZycsXG5cdFx0XHQnOnNpZGV3YXlzOic6ICdlbW90aWNvbnMvc2lkZXdheXMucG5nJyxcblx0XHRcdCc6c2lsbHk6JzogJ2Vtb3RpY29ucy9zaWxseS5wbmcnLFxuXHRcdFx0JzpzbGVlcGluZzonOiAnZW1vdGljb25zL3NsZWVwaW5nLnBuZycsXG5cdFx0XHQnOnVuc3VyZTonOiAnZW1vdGljb25zL3Vuc3VyZS5wbmcnLFxuXHRcdFx0Jzp3b290Oic6ICdlbW90aWNvbnMvdzAwdC5wbmcnLFxuXHRcdFx0Jzp3YXNzYXQ6JzogJ2Vtb3RpY29ucy93YXNzYXQucG5nJ1xuXHRcdH0sXG5cdFx0aGlkZGVuOiB7XG5cdFx0XHQnOndoaXN0bGluZzonOiAnZW1vdGljb25zL3doaXN0bGluZy5wbmcnLFxuXHRcdFx0Jzpsb3ZlOic6ICdlbW90aWNvbnMvd3ViLnBuZydcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFdpZHRoIG9mIHRoZSBlZGl0b3IuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWMgd2l0aFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHdpZHRoOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBIZWlnaHQgb2YgdGhlIGVkaXRvciBpbmNsdWRpbmcgdG9vbGJhci4gU2V0IHRvIG51bGwgZm9yIGF1dG9tYXRpY1xuXHQgKiBoZWlnaHRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRoZWlnaHQ6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgcmVzaXplZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUVuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBoYWxmIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5XaWR0aDogbnVsbCxcblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSBoZWlnaHQgb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1pbkhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIGhlaWdodCBvciAtMVxuXHQgKiBmb3IgdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4SGVpZ2h0OiBudWxsLFxuXHQvKipcblx0ICogTWF4IHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4V2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSBoZWlnaHQgaXMgZW5hYmxlZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUhlaWdodDogdHJ1ZSxcblx0LyoqXG5cdCAqIElmIHJlc2l6aW5nIGJ5IHdpZHRoIGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVXaWR0aDogdHJ1ZSxcblxuXHQvKipcblx0ICogRGF0ZSBmb3JtYXQsIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBsb2NhbGUgc3BlY2lmaWVzIG9uZS5cblx0ICpcblx0ICogVGhlIHdvcmRzIHllYXIsIG1vbnRoIGFuZCBkYXkgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB1c2VycyBjdXJyZW50XG5cdCAqIHllYXIsIG1vbnRoIGFuZCBkYXkuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkYXRlRm9ybWF0OiAneWVhci1tb250aC1kYXknLFxuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGluc2V0IHRoZSB0b29sYmFyIGludG8uXG5cdCAqXG5cdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdHRvb2xiYXJDb250YWluZXI6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBwYXN0ZSBmaWx0ZXJpbmcuIFRoaXMgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbCwgcGxlYXNlXG5cdCAqIHJlcG9ydCBhbnkgaXNzdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVuYWJsZVBhc3RlRmlsdGVyaW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gY29tcGxldGVseSBkaXNhYmxlIHBhc3RpbmcgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZGlzYWJsZVBhc3Rpbmc6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZWFkT25seTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIHNldCB0aGUgZWRpdG9yIHRvIHJpZ2h0LXRvLWxlZnQgbW9kZS5cblx0ICpcblx0ICogSWYgc2V0IHRvIG51bGwgdGhlIGRpcmVjdGlvbiB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cnRsOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIG9uIHBhZ2UgbG9hZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1czogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciB0byB0aGUgZW5kIG9mIHRoZSBjb250ZW50XG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b2ZvY3VzRW5kOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGV4cGFuZCB0aGUgZWRpdG9yIHRvIGZpeCB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9FeHBhbmQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIHVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXJcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvVXBkYXRlOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIHRoZSBicm93c2VycyBidWlsdCBpbiBzcGVsbCBjaGVja2VyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3BlbGxjaGVjazogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gcnVuIHRoZSBzb3VyY2UgZWRpdG9yIHdoZW4gdGhlcmUgaXMgbm8gV1lTSVdZRyBzdXBwb3J0LiBPbmx5XG5cdCAqIHJlYWxseSBhcHBsaWVzIHRvIG1vYmlsZSBPUydzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGxvYWQgdGhlIGVkaXRvciBpbiBzb3VyY2UgbW9kZSBhbmQgc3RpbGwgYWxsb3cgc3dpdGNoaW5nXG5cdCAqIGJldHdlZW4gV1lTSVdZRyBhbmQgc291cmNlIG1vZGVcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzdGFydEluU291cmNlTW9kZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIElEIHRvIGdpdmUgdGhlIGVkaXRvci5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGlkOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVnaW5zOiAnJyxcblxuXHQvKipcblx0ICogei1pbmRleCB0byBzZXQgdGhlIGVkaXRvciBjb250YWluZXIgdG8uIE5lZWRlZCBmb3IgalF1ZXJ5IFVJIGRpYWxvZy5cblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR6SW5kZXg6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIHRyaW0gdGhlIEJCQ29kZS4gUmVtb3ZlcyBhbnkgc3BhY2VzIGF0IHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZVxuXHQgKiBCQkNvZGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGJiY29kZVRyaW06IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBkaXNhYmxlIHJlbW92aW5nIGJsb2NrIGxldmVsIGVsZW1lbnRzIGJ5IHByZXNzaW5nIGJhY2tzcGFjZSBhdFxuXHQgKiB0aGUgc3RhcnQgb2YgdGhlbVxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVCbG9ja1JlbW92ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbG93ZWQgVVJMIChzaG91bGQgYmUgZWl0aGVyIHN0cmluZ3Mgb3IgcmVnZXgpIGZvciBpZnJhbWVzLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGEgc3RyaW5nIHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3RhcnQgb2YgdGhlIHNyYyBtYXRjaGVzIHRoZVxuXHQgKiBzcGVjaWZpZWQgc3RyaW5nIHdpbGwgYmUgYWxsb3dlZC5cblx0ICpcblx0ICogSWYgaXQncyBhIHJlZ2V4IHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3JjIG1hdGNoZXMgdGhlIHJlZ2V4IHdpbGwgYmVcblx0ICogYWxsb3dlZC5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZElmcmFtZVVybHM6IFtdLFxuXG5cdC8qKlxuXHQgKiBCQkNvZGUgcGFyc2VyIG9wdGlvbnMsIG9ubHkgYXBwbGllcyBpZiB1c2luZyB0aGUgZWRpdG9yIGluIEJCQ29kZVxuXHQgKiBtb2RlLlxuXHQgKlxuXHQgKiBTZWUgU0NFZGl0b3IuQkJDb2RlUGFyc2VyLmRlZmF1bHRzIGZvciBsaXN0IG9mIHZhbGlkIG9wdGlvbnNcblx0ICpcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHBhcnNlck9wdGlvbnM6IHsgfSxcblxuXHQvKipcblx0ICogQ1NTIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgdG8gZHJvcGRvd24gbWVudSAoZWcuIHotaW5kZXgpXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRkcm9wRG93bkNzczogeyB9LFxuXG5cdC8qKlxuXHQgKiBBbiBhcnJheSBvZiB0YWdzIHRoYXQgYXJlIGFsbG93ZWQgaW4gdGhlIGVkaXRvciBjb250ZW50LlxuXHQgKiBJZiBhIHRhZyBpcyBub3QgbGlzdGVkIGhlcmUsIGl0IHdpbGwgYmUgcmVtb3ZlZCB3aGVuIHRoZSBjb250ZW50IGlzXG5cdCAqIHNhbml0aXplZC5cblx0ICpcblx0ICogMSBUYWcgaXMgYWxyZWFkeSBhZGRlZCBieSBkZWZhdWx0OiBbJ2lmcmFtZSddLiBObyBuZWVkIHRvIGFkZCB0aGlzXG5cdCAqIGZ1cnRoZXIuXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICovXG5cdGFsbG93ZWRUYWdzOiBbXSxcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgYXR0cmlidXRlcyB0aGF0IGFyZSBhbGxvd2VkIG9uIHRhZ3MgaW4gdGhlIGVkaXRvciBjb250ZW50LlxuXHQgKiBJZiBhbiBhdHRyaWJ1dGUgaXMgbm90IGxpc3RlZCBoZXJlLCBpdCB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGUgY29udGVudFxuXHQgKiBpcyBzYW5pdGl6ZWQuXG5cdCAqXG5cdCAqIDMgQXR0cmlidXRlcyBhcmUgYWxyZWFkeSBhZGRlZCBieSBkZWZhdWx0OlxuXHQgKiBcdFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddLlxuXHQgKiBObyBuZWVkIHRvIGFkZCB0aGVzZSBmdXJ0aGVyLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkQXR0cmlidXRlczogW11cbn07XG4iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcblxuLyoqXG4gKiBDYWNoZSBvZiBjYW1lbENhc2UgQ1NTIHByb3BlcnR5IG5hbWVzXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAqL1xudmFyIGNzc1Byb3BlcnR5TmFtZUNhY2hlID0ge307XG5cbi8qKlxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBlbGVtZW50IG5vZGVzXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IHZhciBFTEVNRU5UX05PREUgPSAxO1xuXG4vKipcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgdGV4dCBub2Rlc1xuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCB2YXIgVEVYVF9OT0RFID0gMztcblxuLyoqXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGNvbW1lbnQgbm9kZXNcbiAqXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5leHBvcnQgdmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbi8qKlxuICogTm9kZSB0eXBlIGRvY3VtZW50IG5vZGVzXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IHZhciBET0NVTUVOVF9OT0RFID0gOTtcblxuLyoqXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGRvY3VtZW50IGZyYWdtZW50c1xuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCB2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xuXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XG5cdHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG5cblx0cmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogMDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcbiAqXG4gKiBXaWxsIGNyZWF0ZSBpdCBpbiB0aGUgY3VycmVudCBkb2N1bWVudCB1bmxlc3MgY29udGV4dFxuICogaXMgc3BlY2lmaWVkLlxuICpcbiAqIEBwYXJhbSB7IXN0cmluZ30gdGFnXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBbYXR0cmlidXRlc11cbiAqIEBwYXJhbSB7IURvY3VtZW50fSBbY29udGV4dF1cbiAqIEByZXR1cm5zIHshSFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cmlidXRlcywgY29udGV4dCkge1xuXHR2YXIgbm9kZSA9IChjb250ZXh0IHx8IGRvY3VtZW50KS5jcmVhdGVFbGVtZW50KHRhZyk7XG5cblx0dXRpbHMuZWFjaChhdHRyaWJ1dGVzIHx8IHt9LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdGlmIChrZXkgPT09ICdzdHlsZScpIHtcblx0XHRcdG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlO1xuXHRcdH0gZWxzZSBpZiAoa2V5IGluIG5vZGUpIHtcblx0XHRcdG5vZGVba2V5XSA9IHZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBub2RlO1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgcGFyZW50cyB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxuICogQHJldHVybnMge0FycmF5PEhUTUxFbGVtZW50Pn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudHMobm9kZSwgc2VsZWN0b3IpIHtcblx0dmFyIHBhcmVudHMgPSBbXTtcblx0dmFyIHBhcmVudCA9IG5vZGUgfHwge307XG5cblx0d2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgIS8oOXwxMSkvLnRlc3QocGFyZW50Lm5vZGVUeXBlKSkge1xuXHRcdGlmICghc2VsZWN0b3IgfHwgaXMocGFyZW50LCBzZWxlY3RvcikpIHtcblx0XHRcdHBhcmVudHMucHVzaChwYXJlbnQpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBwYXJlbnRzO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGZpcnN0IHBhcmVudCBub2RlIHRoYXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHshc3RyaW5nfSBbc2VsZWN0b3JdXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyZW50KG5vZGUsIHNlbGVjdG9yKSB7XG5cdHZhciBwYXJlbnQgPSBub2RlIHx8IHt9O1xuXG5cdHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpICYmICEvKDl8MTEpLy50ZXN0KHBhcmVudC5ub2RlVHlwZSkpIHtcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XG5cdFx0XHRyZXR1cm4gcGFyZW50O1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyB0aGUgcGFzc2VkIG5vZGUgYW5kIGFsbCBwYXJlbnRzIGFuZFxuICogcmV0dXJucyB0aGUgZmlyc3QgbWF0Y2hpbmcgbm9kZSBpZiBhbnkuXG4gKlxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7IXN0cmluZ30gc2VsZWN0b3JcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHx1bmRlZmluZWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KG5vZGUsIHNlbGVjdG9yKSB7XG5cdHJldHVybiBpcyhub2RlLCBzZWxlY3RvcikgPyBub2RlIDogcGFyZW50KG5vZGUsIHNlbGVjdG9yKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIERPTVxuICpcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUobm9kZSkge1xuXHRpZiAobm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuXHR9XG59XG5cbi8qKlxuICogQXBwZW5kcyBjaGlsZCB0byBwYXJlbnQgbm9kZVxuICpcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gY2hpbGRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XG5cdG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xufVxuXG4vKipcbiAqIEZpbmRzIGFueSBjaGlsZCBub2RlcyB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvclxuICpcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0geyFzdHJpbmd9IHNlbGVjdG9yXG4gKiBAcmV0dXJucyB7Tm9kZUxpc3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kKG5vZGUsIHNlbGVjdG9yKSB7XG5cdHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufVxuXG4vKipcbiAqIEZvciBvbigpIGFuZCBvZmYoKSBpZiB0byBhZGQvcmVtb3ZlIHRoZSBldmVudFxuICogdG8gdGhlIGNhcHR1cmUgcGhhc2VcbiAqXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBFVkVOVF9DQVBUVVJFID0gdHJ1ZTtcblxuLyoqXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcbiAqIHRvIHRoZSBidWJibGUgcGhhc2VcbiAqXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBFVkVOVF9CVUJCTEUgPSBmYWxzZTtcblxuLyoqXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50cy5cbiAqXG4gKiBFdmVudHMgc2hvdWxkIGJlIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnRzLlxuICpcbiAqIElmIHNlbGVjdG9yIGlzIHNwZWNpZmllZCB0aGUgaGFuZGxlciB3aWxsIG9ubHkgYmVcbiAqIGNhbGxlZCB3aGVuIHRoZSBldmVudCB0YXJnZXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gZm5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhcHR1cmU9ZmFsc2VdXG4gKiBAc2VlIG9mZigpXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXG5leHBvcnQgZnVuY3Rpb24gb24obm9kZSwgZXZlbnRzLCBzZWxlY3RvciwgZm4sIGNhcHR1cmUpIHtcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHR2YXIgaGFuZGxlcjtcblxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcblx0XHRcdGhhbmRsZXIgPSBmblsnX3NjZS1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl0gfHwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuXHRcdFx0XHR3aGlsZSAodGFyZ2V0ICYmIHRhcmdldCAhPT0gbm9kZSkge1xuXHRcdFx0XHRcdGlmIChpcyh0YXJnZXQsIHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdFx0Zm4uY2FsbCh0YXJnZXQsIGUpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRmblsnX3NjZS1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl0gPSBoYW5kbGVyO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XG5cdFx0XHRjYXB0dXJlID0gZm47XG5cdFx0fVxuXG5cdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlIHx8IGZhbHNlKTtcblx0fSk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXG4gKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50c1xuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gZm5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhcHR1cmU9ZmFsc2VdXG4gKiBAc2VlIG9uKClcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcbmV4cG9ydCBmdW5jdGlvbiBvZmYobm9kZSwgZXZlbnRzLCBzZWxlY3RvciwgZm4sIGNhcHR1cmUpIHtcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHR2YXIgaGFuZGxlcjtcblxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcblx0XHRcdGhhbmRsZXIgPSBmblsnX3NjZS1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGhhbmRsZXIgPSBzZWxlY3Rvcjtcblx0XHRcdGNhcHR1cmUgPSBmbjtcblx0XHR9XG5cblx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUgfHwgZmFsc2UpO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBJZiBvbmx5IGF0dHIgcGFyYW0gaXMgc3BlY2lmaWVkIGl0IHdpbGwgZ2V0XG4gKiB0aGUgdmFsdWUgb2YgdGhlIGF0dHIgcGFyYW0uXG4gKlxuICogSWYgdmFsdWUgaXMgc3BlY2lmaWVkIGJ1dCBudWxsIHRoZSBhdHRyaWJ1dGVcbiAqIHdpbGwgYmUgcmVtb3ZlZCBvdGhlcndpc2UgdGhlIGF0dHIgdmFsdWUgd2lsbFxuICogYmUgc2V0IHRvIHRoZSBwYXNzZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxuICogQHBhcmFtIHs/c3RyaW5nfSBbdmFsdWVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHIsIHZhbHVlKSB7XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuXHRcdHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShhdHRyKTtcblx0fVxuXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXEsIG5vLWVxLW51bGxcblx0aWYgKHZhbHVlID09IG51bGwpIHtcblx0XHRyZW1vdmVBdHRyKG5vZGUsIGF0dHIpO1xuXHR9IGVsc2Uge1xuXHRcdG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcblx0fVxufVxuXG4vKipcbiAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHshc3RyaW5nfSBhdHRyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBdHRyKG5vZGUsIGF0dHIpIHtcblx0bm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gbm9uZVxuICpcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWRlKG5vZGUpIHtcblx0Y3NzKG5vZGUsICdkaXNwbGF5JywgJ25vbmUnKTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBwYXNzZWQgZWxlbWVudHMgZGlzcGxheSB0byBkZWZhdWx0XG4gKlxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3cobm9kZSkge1xuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnJyk7XG59XG5cbi8qKlxuICogVG9nZ2xlcyBhbiBlbGVtZW50cyB2aXNpYmlsaXR5XG4gKlxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShub2RlKSB7XG5cdGlmIChpc1Zpc2libGUobm9kZSkpIHtcblx0XHRoaWRlKG5vZGUpO1xuXHR9IGVsc2Uge1xuXHRcdHNob3cobm9kZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBHZXRzIGEgY29tcHV0ZWQgQ1NTIHZhbHVlcyBvciBzZXRzIGFuIGlubGluZSBDU1MgdmFsdWVcbiAqXG4gKiBSdWxlcyBzaG91bGQgYmUgaW4gY2FtZWxDYXNlIGZvcm1hdCBhbmQgbm90XG4gKiBoeXBoZW5hdGVkIGxpa2UgQ1NTIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7IU9iamVjdHxzdHJpbmd9IHJ1bGVcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW3ZhbHVlXVxuICogQHJldHVybiB7c3RyaW5nfG51bWJlcnx1bmRlZmluZWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjc3Mobm9kZSwgcnVsZSwgdmFsdWUpIHtcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHJ1bGUpKSB7XG5cdFx0XHRyZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMSA/IGdldENvbXB1dGVkU3R5bGUobm9kZSlbcnVsZV0gOiBudWxsO1xuXHRcdH1cblxuXHRcdHV0aWxzLmVhY2gocnVsZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGNzcyhub2RlLCBrZXksIHZhbHVlKTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHQvLyBpc05hTiByZXR1cm5zIGZhbHNlIGZvciBudWxsLCBmYWxzZSBhbmQgZW1wdHkgc3RyaW5nc1xuXHRcdC8vIHNvIG5lZWQgdG8gY2hlY2sgaXQncyB0cnV0aHkgb3IgMFxuXHRcdHZhciBpc051bWVyaWMgPSAodmFsdWUgfHwgdmFsdWUgPT09IDApICYmICFpc05hTih2YWx1ZSk7XG5cdFx0bm9kZS5zdHlsZVtydWxlXSA9IGlzTnVtZXJpYyA/IHZhbHVlICsgJ3B4JyA6IHZhbHVlO1xuXHR9XG59XG5cblxuLyoqXG4gKiBHZXRzIG9yIHNldHMgdGhlIGRhdGEgYXR0cmlidXRlcyBvbiBhIG5vZGVcbiAqXG4gKiBVbmxpa2UgdGhlIGpRdWVyeSB2ZXJzaW9uIHRoaXMgb25seSBzdG9yZXMgZGF0YVxuICogaW4gdGhlIERPTSBhdHRyaWJ1dGVzIHdoaWNoIG1lYW5zIG9ubHkgc3RyaW5nc1xuICogY2FuIGJlIHN0b3JlZC5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XVxuICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZV1cbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkYXRhKG5vZGUsIGtleSwgdmFsdWUpIHtcblx0dmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHR2YXIgZGF0YSA9IHt9O1xuXG5cdGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMSkge1xuXHRcdFx0dXRpbHMuZWFjaChub2RlLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfLCBhdHRyKSB7XG5cdFx0XHRcdGlmICgvXmRhdGEtL2kudGVzdChhdHRyLm5hbWUpKSB7XG5cdFx0XHRcdFx0ZGF0YVthdHRyLm5hbWUuc3Vic3RyKDUpXSA9IGF0dHIudmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gZGF0YTtcblx0XHR9XG5cblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMikge1xuXHRcdFx0cmV0dXJuIGF0dHIobm9kZSwgJ2RhdGEtJyArIGtleSk7XG5cdFx0fVxuXG5cdFx0YXR0cihub2RlLCAnZGF0YS0nICsga2V5LCBTdHJpbmcodmFsdWUpKTtcblx0fVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBub2RlIG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLlxuICpcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXMobm9kZSwgc2VsZWN0b3IpIHtcblx0dmFyIHJlc3VsdCA9IGZhbHNlO1xuXG5cdGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuXHRcdHJlc3VsdCA9IChub2RlLm1hdGNoZXMgfHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdFx0bm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgc2VsZWN0b3IpO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBub2RlIGNvbnRhaW5zIGNoaWxkIG90aGVyd2lzZSBmYWxzZS5cbiAqXG4gKiBUaGlzIGRpZmZlcnMgZnJvbSB0aGUgRE9NIGNvbnRhaW5zKCkgbWV0aG9kIGluIHRoYXRcbiAqIGlmIG5vZGUgYW5kIGNoaWxkIGFyZSBlcXVhbCB0aGlzIHdpbGwgcmV0dXJuIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKG5vZGUsIGNoaWxkKSB7XG5cdHJldHVybiBub2RlICE9PSBjaGlsZCAmJiBub2RlLmNvbnRhaW5zICYmIG5vZGUuY29udGFpbnMoY2hpbGQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cbiAqIEByZXR1cm5zIHs/SFRNTEVsZW1lbnR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0VsZW1lbnRTaWJsaW5nKG5vZGUsIHNlbGVjdG9yKSB7XG5cdHZhciBwcmV2ID0gbm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG5cdGlmIChzZWxlY3RvciAmJiBwcmV2KSB7XG5cdFx0cmV0dXJuIGlzKHByZXYsIHNlbGVjdG9yKSA/IHByZXYgOiBudWxsO1xuXHR9XG5cblx0cmV0dXJuIHByZXY7XG59XG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICogQHBhcmFtIHshTm9kZX0gcmVmTm9kZVxuICogQHJldHVybnMge05vZGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSkge1xuXHRyZXR1cm4gcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxuICogQHJldHVybnMgeyFBcnJheS48c3RyaW5nPn1cbiAqL1xuZnVuY3Rpb24gY2xhc3Nlcyhub2RlKSB7XG5cdHJldHVybiBub2RlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcblx0cmV0dXJuIGlzKG5vZGUsICcuJyArIGNsYXNzTmFtZSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xuXHR2YXIgY2xhc3NMaXN0ID0gY2xhc3Nlcyhub2RlKTtcblxuXHRpZiAoY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcblx0XHRjbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xuXHR9XG5cblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcblx0dmFyIGNsYXNzTGlzdCA9IGNsYXNzZXMobm9kZSk7XG5cblx0dXRpbHMuYXJyYXlSZW1vdmUoY2xhc3NMaXN0LCBjbGFzc05hbWUpO1xuXG5cdG5vZGUuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBUb2dnbGVzIGEgY2xhc3Mgb24gbm9kZS5cbiAqXG4gKiBJZiBzdGF0ZSBpcyBzcGVjaWZpZWQgYW5kIGlzIHRydXRoeSBpdCB3aWxsIGFkZFxuICogdGhlIGNsYXNzLlxuICpcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgZmFsc2V5IGl0IHdpbGwgcmVtb3ZlXG4gKiB0aGUgY2xhc3MuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICogQHBhcmFtIHtib29sZWFufSBbc3RhdGVdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyhub2RlLCBjbGFzc05hbWUsIHN0YXRlKSB7XG5cdHN0YXRlID0gdXRpbHMuaXNVbmRlZmluZWQoc3RhdGUpID8gIWhhc0NsYXNzKG5vZGUsIGNsYXNzTmFtZSkgOiBzdGF0ZTtcblxuXHRpZiAoc3RhdGUpIHtcblx0XHRhZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdHJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XG5cdH1cbn1cblxuLyoqXG4gKiBHZXRzIG9yIHNldHMgdGhlIHdpZHRoIG9mIHRoZSBwYXNzZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgobm9kZSwgdmFsdWUpIHtcblx0aWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdMZWZ0KSArIHRvRmxvYXQoY3MucGFkZGluZ1JpZ2h0KTtcblx0XHR2YXIgYm9yZGVyID0gdG9GbG9hdChjcy5ib3JkZXJMZWZ0V2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJSaWdodFdpZHRoKTtcblxuXHRcdHJldHVybiBub2RlLm9mZnNldFdpZHRoIC0gcGFkZGluZyAtIGJvcmRlcjtcblx0fVxuXG5cdGNzcyhub2RlLCAnd2lkdGgnLCB2YWx1ZSk7XG59XG5cbi8qKlxuICogR2V0cyBvciBzZXRzIHRoZSBoZWlnaHQgb2YgdGhlIHBhc3NlZCBub2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW3ZhbHVlXVxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQobm9kZSwgdmFsdWUpIHtcblx0aWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdUb3ApICsgdG9GbG9hdChjcy5wYWRkaW5nQm90dG9tKTtcblx0XHR2YXIgYm9yZGVyID0gdG9GbG9hdChjcy5ib3JkZXJUb3BXaWR0aCkgKyB0b0Zsb2F0KGNzLmJvcmRlckJvdHRvbVdpZHRoKTtcblxuXHRcdHJldHVybiBub2RlLm9mZnNldEhlaWdodCAtIHBhZGRpbmcgLSBib3JkZXI7XG5cdH1cblxuXHRjc3Mobm9kZSwgJ2hlaWdodCcsIHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VycyBhIGN1c3RvbSBldmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmRcbiAqIHNldHMgdGhlIGRldGFpbCBwcm9wZXJ0eSB0byB0aGUgZGF0YSBvYmplY3QgcGFzc2VkLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXIobm9kZSwgZXZlbnROYW1lLCBkYXRhKSB7XG5cdHZhciBldmVudDtcblxuXHRpZiAodXRpbHMuaXNGdW5jdGlvbih3aW5kb3cuQ3VzdG9tRXZlbnQpKSB7XG5cdFx0ZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7XG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcblx0XHRcdGRldGFpbDogZGF0YVxuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGV2ZW50ID0gbm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXHRcdGV2ZW50LmluaXRDdXN0b21FdmVudChldmVudE5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuXHR9XG5cblx0bm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlKSB7XG5cdHJldHVybiAhIW5vZGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGg7XG59XG5cbi8qKlxuICogQ29udmVydCBDU1MgcHJvcGVydHkgbmFtZXMgaW50byBjYW1lbCBjYXNlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2FtZWxDYXNlKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nXG5cdFx0LnJlcGxhY2UoL14tbXMtLywgJ21zLScpXG5cdFx0LnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAobWF0Y2gsIGNoYXIpIHtcblx0XHRcdHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCk7XG5cdFx0fSk7XG59XG5cblxuLyoqXG4gKiBMb29wIGFsbCBjaGlsZCBub2RlcyBvZiB0aGUgcGFzc2VkIG5vZGVcbiAqXG4gKiBUaGUgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCAxIHBhcmFtZXRlciBiZWluZyB0aGUgbm9kZS5cbiAqIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIGZhbHNlIHRoZSBsb29wIHdpbGwgYmUgZXhpdGVkLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZnVuYyAgICAgICAgICAgQ2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdpdGggZXZlcnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBub2RlIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cbiAqIEBwYXJhbSAge2Jvb2xlYW59IGlubmVybW9zdEZpcnN0ICBJZiB0aGUgaW5uZXJtb3N0IG5vZGUgc2hvdWxkIGJlIHBhc3NlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBmdW5jdGlvbiBiZWZvcmUgaXQncyBwYXJlbnRzLlxuICogQHBhcmFtICB7Ym9vbGVhbn0gc2libGluZ3NPbmx5ICAgIElmIHRvIG9ubHkgdHJhdmVyc2UgdGhlIG5vZGVzIHNpYmxpbmdzXG4gKiBAcGFyYW0gIHtib29sZWFufSBbcmV2ZXJzZT1mYWxzZV0gSWYgdG8gdHJhdmVyc2UgdGhlIG5vZGVzIGluIHJldmVyc2VcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCByZXZlcnNlKSB7XG5cdG5vZGUgPSByZXZlcnNlID8gbm9kZS5sYXN0Q2hpbGQgOiBub2RlLmZpcnN0Q2hpbGQ7XG5cblx0d2hpbGUgKG5vZGUpIHtcblx0XHR2YXIgbmV4dCA9IHJldmVyc2UgPyBub2RlLnByZXZpb3VzU2libGluZyA6IG5vZGUubmV4dFNpYmxpbmc7XG5cblx0XHRpZiAoXG5cdFx0XHQoIWlubmVybW9zdEZpcnN0ICYmIGZ1bmMobm9kZSkgPT09IGZhbHNlKSB8fFxuXHRcdFx0KCFzaWJsaW5nc09ubHkgJiYgdHJhdmVyc2UoXG5cdFx0XHRcdG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHJldmVyc2Vcblx0XHRcdCkgPT09IGZhbHNlKSB8fFxuXHRcdFx0KGlubmVybW9zdEZpcnN0ICYmIGZ1bmMobm9kZSkgPT09IGZhbHNlKVxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdG5vZGUgPSBuZXh0O1xuXHR9XG59XG5cbi8qKlxuICogTGlrZSB0cmF2ZXJzZSBidXQgbG9vcHMgaW4gcmV2ZXJzZVxuICogQHNlZSB0cmF2ZXJzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gclRyYXZlcnNlKG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHkpIHtcblx0dHJhdmVyc2Uobm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSwgdHJ1ZSk7XG59XG5cbi8qKlxuICogUGFyc2VzIEhUTUwgaW50byBhIGRvY3VtZW50IGZyYWdtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IFtjb250ZXh0XVxuICogQHNpbmNlIDEuNC40XG4gKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwsIGNvbnRleHQpIHtcblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0dmFyXHRyZXQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0dmFyIHRtcCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjb250ZXh0KTtcblxuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcblxuXHR3aGlsZSAodG1wLmZpcnN0Q2hpbGQpIHtcblx0XHRhcHBlbmRDaGlsZChyZXQsIHRtcC5maXJzdENoaWxkKTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGFueSBzdHlsaW5nLlxuICpcbiAqIEl0IGhhcyBzdHlsaW5nIGlmIGl0IGlzIG5vdCBhIHBsYWluIDxkaXY+IG9yIDxwPiBvclxuICogaWYgaXQgaGFzIGEgY2xhc3MsIHN0eWxlIGF0dHJpYnV0ZSBvciBkYXRhLlxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKiBAc2luY2UgMS40LjRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxpbmcobm9kZSkge1xuXHRyZXR1cm4gbm9kZSAmJiAoIWlzKG5vZGUsICdwLGRpdicpIHx8IG5vZGUuY2xhc3NOYW1lIHx8XG5cdFx0YXR0cihub2RlLCAnc3R5bGUnKSB8fCAhdXRpbHMuaXNFbXB0eU9iamVjdChkYXRhKG5vZGUpKSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gZWxlbWVudCBmcm9tIG9uZSB0eXBlIHRvIGFub3RoZXIuXG4gKlxuICogRm9yIGV4YW1wbGUgaXQgY2FuIGNvbnZlcnQgdGhlIGVsZW1lbnQgPGI+IHRvIDxzdHJvbmc+XG4gKlxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICB0b1RhZ05hbWVcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICogQHNpbmNlIDEuNC40XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RWxlbWVudChlbGVtZW50LCB0b1RhZ05hbWUpIHtcblx0dmFyIG5ld0VsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRvVGFnTmFtZSwge30sIGVsZW1lbnQub3duZXJEb2N1bWVudCk7XG5cblx0dXRpbHMuZWFjaChlbGVtZW50LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfLCBhdHRyaWJ1dGUpIHtcblx0XHQvLyBTb21lIGJyb3dzZXJzIHBhcnNlIGludmFsaWQgYXR0cmlidXRlcyBuYW1lcyBsaWtlXG5cdFx0Ly8gJ3NpemVcIjInIHdoaWNoIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIHNldCwganVzdFxuXHRcdC8vIGlnbm9yZSB0aGVzZS5cblx0XHR0cnkge1xuXHRcdFx0YXR0cihuZXdFbGVtZW50LCBhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcblx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XG5cdH0pO1xuXG5cdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRhcHBlbmRDaGlsZChuZXdFbGVtZW50LCBlbGVtZW50LmZpcnN0Q2hpbGQpO1xuXHR9XG5cblx0ZWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCBlbGVtZW50KTtcblxuXHRyZXR1cm4gbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBMaXN0IG9mIGJsb2NrIGxldmVsIGVsZW1lbnRzIHNlcGFyYXRlZCBieSBiYXJzICh8KVxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCB2YXIgYmxvY2tMZXZlbExpc3QgPSAnfGJvZHl8aHJ8cHxkaXZ8aDF8aDJ8aDN8aDR8aDV8aDZ8YWRkcmVzc3xwcmV8JyArXG5cdCdmb3JtfHRhYmxlfHRib2R5fHRoZWFkfHRmb290fHRofHRyfHRkfGxpfG9sfHVsfGJsb2NrcXVvdGV8Y2VudGVyfCcgK1xuXHQnZGV0YWlsc3xzZWN0aW9ufGFydGljbGV8YXNpZGV8bmF2fG1haW58aGVhZGVyfGhncm91cHxmb290ZXJ8ZmllbGRzZXR8JyArXG5cdCdkbHxkdHxkZHxmaWd1cmV8ZmlnY2FwdGlvbnwnO1xuXG4vKipcbiAqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBkbyBub3QgYWxsb3cgY2hpbGRyZW4gc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICogQHNpbmNlICAxLjQuNVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FuSGF2ZUNoaWxkcmVuKG5vZGUpIHtcblx0Ly8gMSAgPSBFbGVtZW50XG5cdC8vIDkgID0gRG9jdW1lbnRcblx0Ly8gMTEgPSBEb2N1bWVudCBGcmFnbWVudFxuXHRpZiAoIS8xMT98OS8udGVzdChub2RlLm5vZGVUeXBlKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIExpc3Qgb2YgZW1wdHkgSFRNTCB0YWdzIHNlcGFyYXRlZCBieSBiYXIgKHwpIGNoYXJhY3Rlci5cblx0Ly8gU291cmNlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNC9pbmRleC9lbGVtZW50cy5odG1sXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xuXHRyZXR1cm4gKCd8aWZyYW1lfGFyZWF8YmFzZXxiYXNlZm9udHxicnxjb2x8ZnJhbWV8aHJ8aW1nfGlucHV0fHdicicgK1xuXHRcdCd8aXNpbmRleHxsaW5rfG1ldGF8cGFyYW18Y29tbWFuZHxlbWJlZHxrZXlnZW58c291cmNlfHRyYWNrfCcgK1xuXHRcdCdvYmplY3R8JykuaW5kZXhPZignfCcgKyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnfCcpIDwgMDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYW4gZWxlbWVudCBpcyBpbmxpbmVcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbG1cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVDb2RlQXNCbG9jaz1mYWxzZV1cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lubGluZShlbG0sIGluY2x1ZGVDb2RlQXNCbG9jaykge1xuXHR2YXIgdGFnTmFtZSxcblx0XHRub2RlVHlwZSA9IChlbG0gfHwge30pLm5vZGVUeXBlIHx8IFRFWFRfTk9ERTtcblxuXHRpZiAobm9kZVR5cGUgIT09IEVMRU1FTlRfTk9ERSkge1xuXHRcdHJldHVybiBub2RlVHlwZSA9PT0gVEVYVF9OT0RFO1xuXHR9XG5cblx0dGFnTmFtZSA9IGVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0aWYgKHRhZ05hbWUgPT09ICdjb2RlJykge1xuXHRcdHJldHVybiAhaW5jbHVkZUNvZGVBc0Jsb2NrO1xuXHR9XG5cblx0cmV0dXJuIGJsb2NrTGV2ZWxMaXN0LmluZGV4T2YoJ3wnICsgdGFnTmFtZSArICd8JykgPCAwO1xufVxuXG4vKipcbiAqIENvcHkgdGhlIENTUyBmcm9tIDEgbm9kZSB0byBhbm90aGVyLlxuICpcbiAqIE9ubHkgY29waWVzIENTUyBkZWZpbmVkIG9uIHRoZSBlbGVtZW50IGUuZy4gc3R5bGUgYXR0ci5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBmcm9tXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b1xuICogQGRlcHJlY2F0ZWQgc2luY2UgdjMuMS4wXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q1NTKGZyb20sIHRvKSB7XG5cdGlmICh0by5zdHlsZSAmJiBmcm9tLnN0eWxlKSB7XG5cdFx0dG8uc3R5bGUuY3NzVGV4dCA9IGZyb20uc3R5bGUuY3NzVGV4dCArIHRvLnN0eWxlLmNzc1RleHQ7XG5cdH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBET00gbm9kZSBpcyBlbXB0eVxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG5vZGUpIHtcblx0aWYgKG5vZGUubGFzdENoaWxkICYmIGlzRW1wdHkobm9kZS5sYXN0Q2hpbGQpKSB7XG5cdFx0cmVtb3ZlKG5vZGUubGFzdENoaWxkKTtcblx0fVxuXG5cdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzID8gIW5vZGUubm9kZVZhbHVlIDpcblx0XHQoY2FuSGF2ZUNoaWxkcmVuKG5vZGUpICYmICFub2RlLmNoaWxkTm9kZXMubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBGaXhlcyBibG9jayBsZXZlbCBlbGVtZW50cyBpbnNpZGUgaW4gaW5saW5lIGVsZW1lbnRzLlxuICpcbiAqIEFsc28gZml4ZXMgaW52YWxpZCBsaXN0IG5lc3RpbmcgYnkgcGxhY2luZyBuZXN0ZWQgbGlzdHNcbiAqIGluc2lkZSB0aGUgcHJldmlvdXMgbGkgdGFnIG9yIHdyYXBwaW5nIHRoZW0gaW4gYW4gbGkgdGFnLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeE5lc3Rpbmcobm9kZSkge1xuXHR0cmF2ZXJzZShub2RlLCBmdW5jdGlvbiAobm9kZSkge1xuXHRcdHZhciBsaXN0ID0gJ3VsLG9sJyxcblx0XHRcdGlzQmxvY2sgPSAhaXNJbmxpbmUobm9kZSwgdHJ1ZSkgJiYgbm9kZS5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFLFxuXHRcdFx0cGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuXG5cdFx0Ly8gQW55IGJsb2NrbGV2ZWwgZWxlbWVudCBpbnNpZGUgYW4gaW5saW5lIGVsZW1lbnQgbmVlZHMgZml4aW5nLlxuXHRcdC8vIEFsc28gPHA+IHRhZ3MgdGhhdCBjb250YWluIGJsb2NrcyBzaG91bGQgYmUgZml4ZWRcblx0XHRpZiAoaXNCbG9jayAmJiAoaXNJbmxpbmUocGFyZW50LCB0cnVlKSB8fCBwYXJlbnQudGFnTmFtZSA9PT0gJ1AnKSkge1xuXHRcdFx0Ly8gRmluZCB0aGUgbGFzdCBpbmxpbmUgcGFyZW50IG5vZGVcblx0XHRcdHZhclx0bGFzdElubGluZVBhcmVudCA9IG5vZGU7XG5cdFx0XHR3aGlsZSAoaXNJbmxpbmUobGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlLCB0cnVlKSB8fFxuXHRcdFx0XHRsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGUudGFnTmFtZSA9PT0gJ1AnKSB7XG5cdFx0XHRcdGxhc3RJbmxpbmVQYXJlbnQgPSBsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBiZWZvcmUgPSBleHRyYWN0Q29udGVudHMobGFzdElubGluZVBhcmVudCwgbm9kZSk7XG5cdFx0XHR2YXIgbWlkZGxlID0gbm9kZTtcblxuXHRcdFx0Ly8gQ2xvbmUgaW5saW5lIHN0eWxpbmcgYW5kIGFwcGx5IGl0IHRvIHRoZSBibG9ja3MgY2hpbGRyZW5cblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50LCB0cnVlKSkge1xuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcblx0XHRcdFx0XHR2YXIgY2xvbmUgPSBwYXJlbnQuY2xvbmVOb2RlKCk7XG5cdFx0XHRcdFx0d2hpbGUgKG1pZGRsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjbG9uZSwgbWlkZGxlLmZpcnN0Q2hpbGQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGFwcGVuZENoaWxkKG1pZGRsZSwgY2xvbmUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRpbnNlcnRCZWZvcmUobWlkZGxlLCBsYXN0SW5saW5lUGFyZW50KTtcblx0XHRcdGlmICghaXNFbXB0eShiZWZvcmUpKSB7XG5cdFx0XHRcdGluc2VydEJlZm9yZShiZWZvcmUsIG1pZGRsZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNFbXB0eShsYXN0SW5saW5lUGFyZW50KSkge1xuXHRcdFx0XHRyZW1vdmUobGFzdElubGluZVBhcmVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRml4IGludmFsaWQgbmVzdGVkIGxpc3RzIHdoaWNoIHNob3VsZCBiZSB3cmFwcGVkIGluIGFuIGxpIHRhZ1xuXHRcdGlmIChpc0Jsb2NrICYmIGlzKG5vZGUsIGxpc3QpICYmIGlzKG5vZGUucGFyZW50Tm9kZSwgbGlzdCkpIHtcblx0XHRcdHZhciBsaSA9IHByZXZpb3VzRWxlbWVudFNpYmxpbmcobm9kZSwgJ2xpJyk7XG5cblx0XHRcdGlmICghbGkpIHtcblx0XHRcdFx0bGkgPSBjcmVhdGVFbGVtZW50KCdsaScpO1xuXHRcdFx0XHRpbnNlcnRCZWZvcmUobGksIG5vZGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRhcHBlbmRDaGlsZChsaSwgbm9kZSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgY29tbW9uIHBhcmVudCBvZiB0d28gbm9kZXNcbiAqXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTFcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMlxuICogQHJldHVybiB7P0hUTUxFbGVtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZENvbW1vbkFuY2VzdG9yKG5vZGUxLCBub2RlMikge1xuXHR3aGlsZSAoKG5vZGUxID0gbm9kZTEucGFyZW50Tm9kZSkpIHtcblx0XHRpZiAoY29udGFpbnMobm9kZTEsIG5vZGUyKSkge1xuXHRcdFx0cmV0dXJuIG5vZGUxO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7P05vZGV9XG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmV2aW91cz1mYWxzZV1cbiAqIEByZXR1cm5zIHs/Tm9kZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNpYmxpbmcobm9kZSwgcHJldmlvdXMpIHtcblx0aWYgKCFub2RlKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gKHByZXZpb3VzID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nKSB8fFxuXHRcdGdldFNpYmxpbmcobm9kZS5wYXJlbnROb2RlLCBwcmV2aW91cyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyB1bnVzZWQgd2hpdGVzcGFjZSBmcm9tIHRoZSByb290IGFuZCBhbGwgaXQncyBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gcm9vdFxuICogQHNpbmNlIDEuNC4zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVXaGl0ZVNwYWNlKHJvb3QpIHtcblx0dmFyXHRub2RlVmFsdWUsIG5vZGVUeXBlLCBuZXh0LCBwcmV2aW91cywgcHJldmlvdXNTaWJsaW5nLFxuXHRcdG5leHROb2RlLCB0cmltU3RhcnQsXG5cdFx0Y3NzV2hpdGVTcGFjZSA9IGNzcyhyb290LCAnd2hpdGVTcGFjZScpLFxuXHRcdC8vIFByZXNlcnZlIG5ld2xpbmVzIGlmIGlzIHByZS1saW5lXG5cdFx0cHJlc2VydmVOZXdMaW5lcyA9IC9saW5lJC9pLnRlc3QoY3NzV2hpdGVTcGFjZSksXG5cdFx0bm9kZSA9IHJvb3QuZmlyc3RDaGlsZDtcblxuXHQvLyBTa2lwIHByZSAmIHByZS13cmFwIHdpdGggYW55IHZlbmRvciBwcmVmaXhcblx0aWYgKC9wcmUoLXdyYXApPyQvaS50ZXN0KGNzc1doaXRlU3BhY2UpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0d2hpbGUgKG5vZGUpIHtcblx0XHRuZXh0Tm9kZSAgPSBub2RlLm5leHRTaWJsaW5nO1xuXHRcdG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdG5vZGVUeXBlICA9IG5vZGUubm9kZVR5cGU7XG5cblx0XHRpZiAobm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSAmJiBub2RlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHJlbW92ZVdoaXRlU3BhY2Uobm9kZSk7XG5cdFx0fVxuXG5cdFx0aWYgKG5vZGVUeXBlID09PSBURVhUX05PREUpIHtcblx0XHRcdG5leHQgICAgICA9IGdldFNpYmxpbmcobm9kZSk7XG5cdFx0XHRwcmV2aW91cyAgPSBnZXRTaWJsaW5nKG5vZGUsIHRydWUpO1xuXHRcdFx0dHJpbVN0YXJ0ID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlIChoYXNDbGFzcyhwcmV2aW91cywgJ3NjZWRpdG9yLWlnbm9yZScpKSB7XG5cdFx0XHRcdHByZXZpb3VzID0gZ2V0U2libGluZyhwcmV2aW91cywgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHByZXZpb3VzIHNpYmxpbmcgaXNuJ3QgaW5saW5lIG9yIGlzIGEgdGV4dG5vZGUgdGhhdFxuXHRcdFx0Ly8gZW5kcyBpbiB3aGl0ZXNwYWNlLCB0aW1lIHRoZSBzdGFydCB3aGl0ZXNwYWNlXG5cdFx0XHRpZiAoaXNJbmxpbmUobm9kZSkgJiYgcHJldmlvdXMpIHtcblx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXM7XG5cblx0XHRcdFx0d2hpbGUgKHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQpIHtcblx0XHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcubGFzdENoaWxkO1xuXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxuXHRcdFx0XHRcdHdoaWxlIChoYXNDbGFzcyhwcmV2aW91c1NpYmxpbmcsICdzY2VkaXRvci1pZ25vcmUnKSkge1xuXHRcdFx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gZ2V0U2libGluZyhwcmV2aW91c1NpYmxpbmcsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRyaW1TdGFydCA9IHByZXZpb3VzU2libGluZy5ub2RlVHlwZSA9PT0gVEVYVF9OT0RFID9cblx0XHRcdFx0XHQvW1xcdFxcblxcciBdJC8udGVzdChwcmV2aW91c1NpYmxpbmcubm9kZVZhbHVlKSA6XG5cdFx0XHRcdFx0IWlzSW5saW5lKHByZXZpb3VzU2libGluZyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENsZWFyIHplcm8gd2lkdGggc3BhY2VzXG5cdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZSgvXFx1MjAwQi9nLCAnJyk7XG5cblx0XHRcdC8vIFN0cmlwIGxlYWRpbmcgd2hpdGVzcGFjZVxuXHRcdFx0aWYgKCFwcmV2aW91cyB8fCAhaXNJbmxpbmUocHJldmlvdXMpIHx8IHRyaW1TdGFydCkge1xuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL15bXFx0IF0rLyA6IC9eW1xcdFxcblxcciBdKy8sXG5cdFx0XHRcdFx0Jydcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RyaXAgdHJhaWxpbmcgd2hpdGVzcGFjZVxuXHRcdFx0aWYgKCFuZXh0IHx8ICFpc0lubGluZShuZXh0KSkge1xuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSskLyA6IC9bXFx0XFxuXFxyIF0rJC8sXG5cdFx0XHRcdFx0Jydcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IHRleHQgbm9kZXNcblx0XHRcdGlmICghbm9kZVZhbHVlLmxlbmd0aCkge1xuXHRcdFx0XHRyZW1vdmUobm9kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvW1xcdCBdKy9nIDogL1tcXHRcXG5cXHIgXSsvZyxcblx0XHRcdFx0XHQnICdcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRub2RlID0gbmV4dE5vZGU7XG5cdH1cbn1cblxuLyoqXG4gKiBFeHRyYWN0cyBhbGwgdGhlIG5vZGVzIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgbm9kZXNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGFydE5vZGVcdFRoZSBub2RlIHRvIHN0YXJ0IGV4dHJhY3RpbmcgYXRcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVuZE5vZGVcdFx0VGhlIG5vZGUgdG8gc3RvcCBleHRyYWN0aW5nIGF0XG4gKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRzKHN0YXJ0Tm9kZSwgZW5kTm9kZSkge1xuXHR2YXIgcmFuZ2UgPSBzdGFydE5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuXG5cdHJhbmdlLnNldFN0YXJ0QmVmb3JlKHN0YXJ0Tm9kZSk7XG5cdHJhbmdlLnNldEVuZEFmdGVyKGVuZE5vZGUpO1xuXG5cdHJldHVybiByYW5nZS5leHRyYWN0Q29udGVudHMoKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBvZmZzZXQgcG9zaXRpb24gb2YgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGxlZnQgYW5kIHRvcCBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPZmZzZXQobm9kZSkge1xuXHR2YXJcdGxlZnQgPSAwLFxuXHRcdHRvcCA9IDA7XG5cblx0d2hpbGUgKG5vZGUpIHtcblx0XHRsZWZ0ICs9IG5vZGUub2Zmc2V0TGVmdDtcblx0XHR0b3AgICs9IG5vZGUub2Zmc2V0VG9wO1xuXHRcdG5vZGUgID0gbm9kZS5vZmZzZXRQYXJlbnQ7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxlZnQ6IGxlZnQsXG5cdFx0dG9wOiB0b3Bcblx0fTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhIENTUyBwcm9wZXJ0eSBmcm9tIHRoZSBlbGVtZW50cyBzdHlsZSBhdHRyaWJ1dGVcbiAqXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByb3BlcnR5XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZShlbG0sIHByb3BlcnR5KSB7XG5cdHZhclx0c3R5bGVWYWx1ZSxcblx0XHRlbG1TdHlsZSA9IGVsbS5zdHlsZTtcblxuXHRpZiAoIWNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSkge1xuXHRcdGNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSA9IGNhbWVsQ2FzZShwcm9wZXJ0eSk7XG5cdH1cblxuXHRwcm9wZXJ0eSAgID0gY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldO1xuXHRzdHlsZVZhbHVlID0gZWxtU3R5bGVbcHJvcGVydHldO1xuXG5cdC8vIEFkZCBhbiBleGNlcHRpb24gZm9yIHRleHQtYWxpZ25cblx0aWYgKCd0ZXh0QWxpZ24nID09PSBwcm9wZXJ0eSkge1xuXHRcdHN0eWxlVmFsdWUgPSBzdHlsZVZhbHVlIHx8IGNzcyhlbG0sIHByb3BlcnR5KTtcblxuXHRcdGlmIChjc3MoZWxtLnBhcmVudE5vZGUsIHByb3BlcnR5KSA9PT0gc3R5bGVWYWx1ZSB8fFxuXHRcdFx0Y3NzKGVsbSwgJ2Rpc3BsYXknKSAhPT0gJ2Jsb2NrJyB8fCBpcyhlbG0sICdocix0aCcpKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHN0eWxlVmFsdWU7XG59XG5cbi8qKlxuICogVGVzdHMgaWYgYW4gZWxlbWVudCBoYXMgYSBzdHlsZS5cbiAqXG4gKiBJZiB2YWx1ZXMgYXJlIHNwZWNpZmllZCBpdCB3aWxsIGNoZWNrIHRoYXQgdGhlIHN0eWxlcyB2YWx1ZVxuICogbWF0Y2hlcyBvbmUgb2YgdGhlIHZhbHVlc1xuICpcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcbiAqIEBwYXJhbSAge3N0cmluZ3xhcnJheX0gW3ZhbHVlc11cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsZShlbG0sIHByb3BlcnR5LCB2YWx1ZXMpIHtcblx0dmFyIHN0eWxlVmFsdWUgPSBnZXRTdHlsZShlbG0sIHByb3BlcnR5KTtcblxuXHRpZiAoIXN0eWxlVmFsdWUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gIXZhbHVlcyB8fCBzdHlsZVZhbHVlID09PSB2YWx1ZXMgfHxcblx0XHQoQXJyYXkuaXNBcnJheSh2YWx1ZXMpICYmIHZhbHVlcy5pbmRleE9mKHN0eWxlVmFsdWUpID4gLTEpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGlubGluZSBzdHlsZXMgYW5kIGFsbCB0aGVcbiAqIGlubGluZSBzdHlsZXMgaGF2ZSBtYXRjaGluZyB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzdHlsZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcblx0dmFyIGkgPSBub2RlQS5zdHlsZS5sZW5ndGg7XG5cdGlmIChpICE9PSBub2RlQi5zdHlsZS5sZW5ndGgpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHR3aGlsZSAoaS0tKSB7XG5cdFx0dmFyIHByb3AgPSBub2RlQS5zdHlsZVtpXTtcblx0XHRpZiAobm9kZUEuc3R5bGVbcHJvcF0gIT09IG5vZGVCLnN0eWxlW3Byb3BdKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGJvdGggbm9kZXMgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgYXR0cmlidXRlcyBhbmQgYWxsIHRoZVxuICogYXR0cmlidXRlIHZhbHVlcyBtYXRjaFxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVBXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGF0dHJpYnV0ZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcblx0dmFyIGkgPSBub2RlQS5hdHRyaWJ1dGVzLmxlbmd0aDtcblx0aWYgKGkgIT09IG5vZGVCLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0d2hpbGUgKGktLSkge1xuXHRcdHZhciBwcm9wID0gbm9kZUEuYXR0cmlidXRlc1tpXTtcblx0XHR2YXIgbm90TWF0Y2hlcyA9IHByb3AubmFtZSA9PT0gJ3N0eWxlJyA/XG5cdFx0XHQhc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSA6XG5cdFx0XHRwcm9wLnZhbHVlICE9PSBhdHRyKG5vZGVCLCBwcm9wLm5hbWUpO1xuXG5cdFx0aWYgKG5vdE1hdGNoZXMpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGVsZW1lbnQgcGxhY2luZyBpdHMgY2hpbGRyZW4gaW4gaXRzIHBsYWNlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICovXG5mdW5jdGlvbiByZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSkge1xuXHR3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG5cdFx0aW5zZXJ0QmVmb3JlKG5vZGUuZmlyc3RDaGlsZCwgbm9kZSk7XG5cdH1cblxuXHRyZW1vdmUobm9kZSk7XG59XG5cbi8qKlxuICogTWVyZ2VzIGlubGluZSBzdHlsZXMgYW5kIHRhZ3Mgd2l0aCBwYXJlbnRzIHdoZXJlIHBvc3NpYmxlXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAc2luY2UgMy4xLjBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKG5vZGUpIHtcblx0aWYgKG5vZGUubm9kZVR5cGUgIT09IEVMRU1FTlRfTk9ERSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lO1xuXHR2YXIgbWVyZ2VUYWdzID0gL0J8U1RST05HfEVNfFNQQU58Rk9OVC87XG5cblx0Ly8gTWVyZ2UgY2hpbGRyZW4gKGluIHJldmVyc2UgYXMgY2hpbGRyZW4gY2FuIGJlIHJlbW92ZWQpXG5cdHZhciBpID0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDtcblx0d2hpbGUgKGktLSkge1xuXHRcdG1lcmdlKG5vZGUuY2hpbGROb2Rlc1tpXSk7XG5cdH1cblxuXHQvLyBTaG91bGQgb25seSBtZXJnZSBpbmxpbmUgdGFncyBhbmQgc2hvdWxkIG5vdCBtZXJnZSA8YnI+IHRhZ3Ncblx0aWYgKCFpc0lubGluZShub2RlKSB8fCB0YWdOYW1lID09PSAnQlInKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gUmVtb3ZlIGFueSBpbmxpbmUgc3R5bGVzIHRoYXQgbWF0Y2ggdGhlIHBhcmVudCBzdHlsZVxuXHRpID0gbm9kZS5zdHlsZS5sZW5ndGg7XG5cdHdoaWxlIChpLS0pIHtcblx0XHR2YXIgcHJvcCA9IG5vZGUuc3R5bGVbaV07XG5cdFx0aWYgKGNzcyhwYXJlbnQsIHByb3ApID09PSBjc3Mobm9kZSwgcHJvcCkpIHtcblx0XHRcdG5vZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQ2FuIG9ubHkgcmVtb3ZlIC8gbWVyZ2UgdGFncyBpZiBubyBpbmxpbmUgc3R5bGluZyBsZWZ0LlxuXHQvLyBJZiB0aGVyZSBpcyBhbnkgaW5saW5lIHN0eWxlIGxlZnQgdGhlbiBpdCBtZWFucyBpdCBhdCBsZWFzdCBwYXJ0aWFsbHlcblx0Ly8gZG9lc24ndCBtYXRjaCB0aGUgcGFyZW50IHN0eWxlIHNvIG11c3Qgc3RheVxuXHRpZiAoIW5vZGUuc3R5bGUubGVuZ3RoKSB7XG5cdFx0cmVtb3ZlQXR0cihub2RlLCAnc3R5bGUnKTtcblxuXHRcdC8vIFJlbW92ZSBmb250IGF0dHJpYnV0ZXMgaWYgbWF0Y2ggcGFyZW50XG5cdFx0aWYgKHRhZ05hbWUgPT09ICdGT05UJykge1xuXHRcdFx0aWYgKGNzcyhub2RlLCAnZm9udEZhbWlseScpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHRcdGNzcyhwYXJlbnQsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdmYWNlJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjc3Mobm9kZSwgJ2NvbG9yJykgPT09IGNzcyhwYXJlbnQsICdjb2xvcicpKSB7XG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ2NvbG9yJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjc3Mobm9kZSwgJ2ZvbnRTaXplJykgPT09IGNzcyhwYXJlbnQsICdmb250U2l6ZScpKSB7XG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ3NpemUnKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBTcGFucyBhbmQgZm9udCB0YWdzIHdpdGggbm8gYXR0cmlidXRlcyBjYW4gYmUgc2FmZWx5IHJlbW92ZWRcblx0XHRpZiAoIW5vZGUuYXR0cmlidXRlcy5sZW5ndGggJiYgL1NQQU58Rk9OVC8udGVzdCh0YWdOYW1lKSkge1xuXHRcdFx0cmVtb3ZlS2VlcENoaWxkcmVuKG5vZGUpO1xuXHRcdH0gZWxzZSBpZiAobWVyZ2VUYWdzLnRlc3QodGFnTmFtZSkpIHtcblx0XHRcdHZhciBpc0JvbGQgPSAvQnxTVFJPTkcvLnRlc3QodGFnTmFtZSk7XG5cdFx0XHR2YXIgaXNJdGFsaWMgPSB0YWdOYW1lID09PSAnRU0nO1xuXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGlzSW5saW5lKHBhcmVudCkgJiZcblx0XHRcdFx0KCFpc0JvbGQgfHwgL2JvbGR8NzAwL2kudGVzdChjc3MocGFyZW50LCAnZm9udFdlaWdodCcpKSkgJiZcblx0XHRcdFx0KCFpc0l0YWxpYyB8fCBjc3MocGFyZW50LCAnZm9udFN0eWxlJykgPT09ICdpdGFsaWMnKSkge1xuXG5cdFx0XHRcdC8vIFJlbW92ZSBpZiBwYXJlbnQgbWF0Y2hcblx0XHRcdFx0aWYgKChwYXJlbnQudGFnTmFtZSA9PT0gdGFnTmFtZSB8fFxuXHRcdFx0XHRcdChpc0JvbGQgJiYgL0J8U1RST05HLy50ZXN0KHBhcmVudC50YWdOYW1lKSkpICYmXG5cdFx0XHRcdFx0YXR0cmlidXRlc01hdGNoKHBhcmVudCwgbm9kZSkpIHtcblx0XHRcdFx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBNZXJnZSBzaWJsaW5ncyBpZiBhdHRyaWJ1dGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlcywgbWF0Y2hcblx0dmFyIG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xuXHRpZiAobmV4dCAmJiBuZXh0LnRhZ05hbWUgPT09IHRhZ05hbWUgJiYgYXR0cmlidXRlc01hdGNoKG5leHQsIG5vZGUpKSB7XG5cdFx0YXBwZW5kQ2hpbGQobm9kZSwgbmV4dCk7XG5cdFx0cmVtb3ZlS2VlcENoaWxkcmVuKG5leHQpO1xuXHR9XG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuXG4vKipcbiAqIENoZWNrcyBhbGwgZW1vdGljb25zIGFyZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UgYW5kXG4gKiByZXBsYWNlcyBhbnkgdGhhdCBhcmVuJ3Qgd2l0aCB3aXRoIHRoZWlyIGVtb3RpY29uIGNvZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtyYW5nZUhlbHBlcn0gcmFuZ2VIZWxwZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1doaXRlc3BhY2Uobm9kZSwgcmFuZ2VIZWxwZXIpIHtcblx0dmFyIG5vbmVXc1JlZ2V4ID0gL1teXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKy87XG5cdHZhciBlbW90aWNvbnMgPSBub2RlICYmIGRvbS5maW5kKG5vZGUsICdpbWdbZGF0YS1zY2VkaXRvci1lbW90aWNvbl0nKTtcblxuXHRpZiAoIW5vZGUgfHwgIWVtb3RpY29ucy5sZW5ndGgpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBlbW90aWNvbiA9IGVtb3RpY29uc1tpXTtcblx0XHR2YXIgcGFyZW50ID0gZW1vdGljb24ucGFyZW50Tm9kZTtcblx0XHR2YXIgcHJldiA9IGVtb3RpY29uLnByZXZpb3VzU2libGluZztcblx0XHR2YXIgbmV4dCA9IGVtb3RpY29uLm5leHRTaWJsaW5nO1xuXG5cdFx0aWYgKCghcHJldiB8fCAhbm9uZVdzUmVnZXgudGVzdChwcmV2Lm5vZGVWYWx1ZS5zbGljZSgtMSkpKSAmJlxuXHRcdFx0KCFuZXh0IHx8ICFub25lV3NSZWdleC50ZXN0KChuZXh0Lm5vZGVWYWx1ZSB8fCAnJylbMF0pKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFyIHJhbmdlID0gcmFuZ2VIZWxwZXIuY2xvbmVTZWxlY3RlZCgpO1xuXHRcdHZhciByYW5nZVN0YXJ0ID0gLTE7XG5cdFx0dmFyIHJhbmdlU3RhcnRDb250YWluZXIgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcblx0XHR2YXIgcHJldmlvdXNUZXh0ID0gKHByZXYgJiYgcHJldi5ub2RlVmFsdWUpIHx8ICcnO1xuXG5cdFx0cHJldmlvdXNUZXh0ICs9IGRvbS5kYXRhKGVtb3RpY29uLCAnc2NlZGl0b3ItZW1vdGljb24nKTtcblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgYWZ0ZXIgdGhlIHJlbW92ZWQgZW1vdGljb24sIGFkZFxuXHRcdC8vIHRoZSBsZW5ndGggb2YgdGhlIG5ld2x5IGFkZGVkIHRleHQgdG8gaXRcblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gbmV4dCkge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHByZXZpb3VzVGV4dC5sZW5ndGggKyByYW5nZS5zdGFydE9mZnNldDtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIHNldCBiZWZvcmUgdGhlIG5leHQgbm9kZSwgc2V0IGl0IHRvXG5cdFx0Ly8gdGhlIGVuZCBvZiB0aGUgbmV3IHRleHQgbm9kZVxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBub2RlICYmXG5cdFx0XHRub2RlLmNoaWxkTm9kZXNbcmFuZ2Uuc3RhcnRPZmZzZXRdID09PSBuZXh0KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcHJldmlvdXNUZXh0Lmxlbmd0aDtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIHNldCBiZWZvcmUgdGhlIHJlbW92ZWQgZW1vdGljb24sXG5cdFx0Ly8ganVzdCBrZWVwIGl0IGF0IHRoYXQgcG9zaXRpb25cblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gcHJldikge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXHRcdH1cblxuXHRcdGlmICghbmV4dCB8fCBuZXh0Lm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFKSB7XG5cdFx0XHRuZXh0ID0gcGFyZW50Lmluc2VydEJlZm9yZShcblx0XHRcdFx0cGFyZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpLCBuZXh0XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdG5leHQuaW5zZXJ0RGF0YSgwLCBwcmV2aW91c1RleHQpO1xuXHRcdGRvbS5yZW1vdmUoZW1vdGljb24pO1xuXHRcdGlmIChwcmV2KSB7XG5cdFx0XHRkb20ucmVtb3ZlKHByZXYpO1xuXHRcdH1cblxuXHRcdC8vIE5lZWQgdG8gdXBkYXRlIHRoZSByYW5nZSBzdGFydGluZyBwb3NpdGlvbiBpZiBpdCdzIGJlZW4gbW9kaWZpZWRcblx0XHRpZiAocmFuZ2VTdGFydCA+IC0xKSB7XG5cdFx0XHRyYW5nZS5zZXRTdGFydChuZXh0LCByYW5nZVN0YXJ0KTtcblx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuXHRcdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFJlcGxhY2VzIGFueSBlbW90aWNvbnMgaW5zaWRlIHRoZSByb290IG5vZGUgd2l0aCBpbWFnZXMuXG4gKlxuICogZW1vdGljb25zIHNob3VsZCBiZSBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleSBpcyB0aGUgZW1vdGljb25cbiAqIGNvZGUgYW5kIHRoZSB2YWx1ZSBpcyB0aGUgSFRNTCB0byByZXBsYWNlIGl0IHdpdGguXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdFxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBlbW90aWNvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZW1vdGljb25zQ29tcGF0XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShyb290LCBlbW90aWNvbnMsIGVtb3RpY29uc0NvbXBhdCkge1xuXHR2YXJcdGRvYyAgICAgICAgICAgPSByb290Lm93bmVyRG9jdW1lbnQ7XG5cdHZhciBzcGFjZSAgICAgICAgID0gJyhefFxcXFxzfFxceEEwfFxcdTIwMDJ8XFx1MjAwM3xcXHUyMDA5fCQpJztcblx0dmFyIGVtb3RpY29uQ29kZXMgPSBbXTtcblx0dmFyIGVtb3RpY29uUmVnZXggPSB7fTtcblxuXHQvLyBUT0RPOiBNYWtlIHRoaXMgdGFnIGNvbmZpZ3VyYWJsZS5cblx0aWYgKGRvbS5wYXJlbnQocm9vdCwgJ2NvZGUnKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZW1vdGljb25SZWdleFtrZXldID0gbmV3IFJlZ0V4cChzcGFjZSArIGVzY2FwZS5yZWdleChrZXkpICsgc3BhY2UpO1xuXHRcdGVtb3RpY29uQ29kZXMucHVzaChrZXkpO1xuXHR9KTtcblxuXHQvLyBTb3J0IGtleXMgbG9uZ2VzdCB0byBzaG9ydGVzdCBzbyB0aGF0IGxvbmdlciBrZXlzXG5cdC8vIHRha2UgcHJlY2VkZW5jZSAoYXZvaWRzIGJ1Z3Mgd2l0aCBzaG9ydGVyIGtleXMgcGFydGlhbGx5XG5cdC8vIG1hdGNoaW5nIGxvbmdlciBvbmVzKVxuXHRlbW90aWNvbkNvZGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRyZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcblx0fSk7XG5cblx0KGZ1bmN0aW9uIGNvbnZlcnQobm9kZSkge1xuXHRcdG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG5cblx0XHR3aGlsZSAobm9kZSkge1xuXHRcdFx0Ly8gVE9ETzogTWFrZSB0aGlzIHRhZyBjb25maWd1cmFibGUuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLkVMRU1FTlRfTk9ERSAmJiAhZG9tLmlzKG5vZGUsICdjb2RlJykpIHtcblx0XHRcdFx0Y29udmVydChub2RlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbW90aWNvbkNvZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIHRleHQgID0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0dmFyIGtleSAgID0gZW1vdGljb25Db2Rlc1tpXTtcblx0XHRcdFx0XHR2YXIgaW5kZXggPSBlbW90aWNvbnNDb21wYXQgP1xuXHRcdFx0XHRcdFx0dGV4dC5zZWFyY2goZW1vdGljb25SZWdleFtrZXldKSA6XG5cdFx0XHRcdFx0XHR0ZXh0LmluZGV4T2Yoa2V5KTtcblxuXHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyBXaGVuIGVtb3RpY29uc0NvbXBhdCBpcyBlbmFibGVkIHRoaXMgd2lsbCBiZSB0aGVcblx0XHRcdFx0XHRcdC8vIHBvc2l0aW9uIGFmdGVyIGFueSB3aGl0ZSBzcGFjZVxuXHRcdFx0XHRcdFx0dmFyIHN0YXJ0SW5kZXggPSB0ZXh0LmluZGV4T2Yoa2V5LCBpbmRleCk7XG5cdFx0XHRcdFx0XHR2YXIgZnJhZ21lbnQgICA9IGRvbS5wYXJzZUhUTUwoZW1vdGljb25zW2tleV0sIGRvYyk7XG5cdFx0XHRcdFx0XHR2YXIgYWZ0ZXIgICAgICA9IHRleHQuc3Vic3RyKHN0YXJ0SW5kZXggKyBrZXkubGVuZ3RoKTtcblxuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKGFmdGVyKSk7XG5cblx0XHRcdFx0XHRcdG5vZGUubm9kZVZhbHVlID0gdGV4dC5zdWJzdHIoMCwgc3RhcnRJbmRleCk7XG5cdFx0XHRcdFx0XHRub2RlLnBhcmVudE5vZGVcblx0XHRcdFx0XHRcdFx0Lmluc2VydEJlZm9yZShmcmFnbWVudCwgbm9kZS5uZXh0U2libGluZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuXHRcdH1cblx0fShyb290KSk7XG59XG4iLCIvLyBNdXN0IHN0YXJ0IHdpdGggYSB2YWxpZCBzY2hlbWVcbi8vIFx0XHReXG4vLyBTY2hlbWVzIHRoYXQgYXJlIGNvbnNpZGVyZWQgc2FmZVxuLy8gXHRcdChodHRwcz98cz9mdHB8bWFpbHRvfHNwb3RpZnl8c2t5cGV8c3NofHRlYW1zcGVha3x0ZWwpOnxcbi8vIFJlbGF0aXZlIHNjaGVtZXMgKC8vOikgYXJlIGNvbnNpZGVyZWQgc2FmZVxuLy8gXHRcdChcXFxcL1xcXFwvKXxcbi8vIEltYWdlIGRhdGEgVVJJJ3MgYXJlIGNvbnNpZGVyZWQgc2FmZVxuLy8gXHRcdGRhdGE6aW1hZ2VcXFxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTtcbnZhciBWQUxJRF9TQ0hFTUVfUkVHRVggPVxuXHQvXihodHRwcz98cz9mdHB8bWFpbHRvfHNwb3RpZnl8c2t5cGV8c3NofHRlYW1zcGVha3x0ZWwpOnwoXFwvXFwvKXxkYXRhOmltYWdlXFwvKHBuZ3xibXB8Z2lmfHA/anBlP2cpOy9pO1xuXG4vKipcbiAqIEVzY2FwZXMgYSBzdHJpbmcgc28gaXQncyBzYWZlIHRvIHVzZSBpbiByZWdleFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2V4KHN0cikge1xuXHRyZXR1cm4gc3RyLnJlcGxhY2UoLyhbLS4qKz9ePSE6JHt9KCl8W1xcXS9cXFxcXSkvZywgJ1xcXFwkMScpO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgYWxsIEhUTUwgZW50aXRpZXMgaW4gYSBzdHJpbmdcbiAqXG4gKiBJZiBub1F1b3RlcyBpcyBzZXQgdG8gZmFsc2UsIGFsbCBzaW5nbGUgYW5kIGRvdWJsZVxuICogcXVvdGVzIHdpbGwgYWxzbyBiZSBlc2NhcGVkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHtib29sZWFufSBbbm9RdW90ZXM9dHJ1ZV1cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBzaW5jZSAxLjQuMVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW50aXRpZXMoc3RyLCBub1F1b3Rlcykge1xuXHRpZiAoIXN0cikge1xuXHRcdHJldHVybiBzdHI7XG5cdH1cblxuXHR2YXIgcmVwbGFjZW1lbnRzID0ge1xuXHRcdCcmJzogJyZhbXA7Jyxcblx0XHQnPCc6ICcmbHQ7Jyxcblx0XHQnPic6ICcmZ3Q7Jyxcblx0XHQnICAnOiAnJm5ic3A7ICcsXG5cdFx0J1xcclxcbic6ICc8YnIgLz4nLFxuXHRcdCdcXHInOiAnPGJyIC8+Jyxcblx0XHQnXFxuJzogJzxiciAvPidcblx0fTtcblxuXHRpZiAobm9RdW90ZXMgIT09IGZhbHNlKSB7XG5cdFx0cmVwbGFjZW1lbnRzWydcIiddICA9ICcmIzM0Oyc7XG5cdFx0cmVwbGFjZW1lbnRzWydcXCcnXSA9ICcmIzM5Oyc7XG5cdFx0cmVwbGFjZW1lbnRzWydgJ10gID0gJyYjOTY7Jztcblx0fVxuXG5cdHN0ciA9IHN0ci5yZXBsYWNlKC8gezJ9fFxcclxcbnxbJjw+XFxyXFxuJ1wiYF0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG5cdFx0cmV0dXJuIHJlcGxhY2VtZW50c1ttYXRjaF0gfHwgbWF0Y2g7XG5cdH0pO1xuXG5cdHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogRXNjYXBlIFVSSSBzY2hlbWUuXG4gKlxuICogQXBwZW5kcyB0aGUgY3VycmVudCBVUkwgdG8gYSB1cmwgaWYgaXQgaGFzIGEgc2NoZW1lIHRoYXQgaXMgbm90OlxuICpcbiAqIGh0dHBcbiAqIGh0dHBzXG4gKiBzZnRwXG4gKiBmdHBcbiAqIG1haWx0b1xuICogc3BvdGlmeVxuICogc2t5cGVcbiAqIHNzaFxuICogdGVhbXNwZWFrXG4gKiB0ZWxcbiAqIC8vXG4gKiBkYXRhOmltYWdlLyhwbmd8anBlZ3xqcGd8cGpwZWd8Ym1wfGdpZik7XG4gKlxuICogKipJTVBPUlRBTlQqKjogVGhpcyBkb2VzIG5vdCBlc2NhcGUgYW55IEhUTUwgaW4gYSB1cmwsIGZvclxuICogdGhhdCB1c2UgdGhlIGVzY2FwZS5lbnRpdGllcygpIG1ldGhvZC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybFxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHNpbmNlIDEuNC41XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cmlTY2hlbWUodXJsKSB7XG5cdHZhclx0cGF0aCxcblx0XHQvLyBJZiB0aGVyZSBpcyBhIDogYmVmb3JlIGEgLyB0aGVuIGl0IGhhcyBhIHNjaGVtZVxuXHRcdGhhc1NjaGVtZSA9IC9eW14vXSo6L2ksXG5cdFx0bG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG5cblx0Ly8gSGFzIG5vIHNjaGVtZSBvciBhIHZhbGlkIHNjaGVtZVxuXHRpZiAoKCF1cmwgfHwgIWhhc1NjaGVtZS50ZXN0KHVybCkpIHx8IFZBTElEX1NDSEVNRV9SRUdFWC50ZXN0KHVybCkpIHtcblx0XHRyZXR1cm4gdXJsO1xuXHR9XG5cblx0cGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XG5cdHBhdGgucG9wKCk7XG5cblx0cmV0dXJuIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArXG5cdFx0bG9jYXRpb24uaG9zdCArXG5cdFx0cGF0aC5qb2luKCcvJykgKyAnLycgK1xuXHRcdHVybDtcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuXG5cbi8qKlxuICogSFRNTCB0ZW1wbGF0ZXMgdXNlZCBieSB0aGUgZWRpdG9yIGFuZCBkZWZhdWx0IGNvbW1hbmRzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIF90ZW1wbGF0ZXMgPSB7XG5cdGh0bWw6XG5cdFx0JzwhRE9DVFlQRSBodG1sPicgK1xuXHRcdCc8aHRtbHthdHRyc30+JyArXG5cdFx0XHQnPGhlYWQ+JyArXG5cdFx0XHRcdCc8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgJyArXG5cdFx0XHRcdFx0J2NvbnRlbnQ9XCJ0ZXh0L2h0bWw7Y2hhcnNldD17Y2hhcnNldH1cIiAvPicgK1xuXHRcdFx0XHQnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJ7c3R5bGV9XCIgLz4nICtcblx0XHRcdCc8L2hlYWQ+JyArXG5cdFx0XHQnPGJvZHkgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiIHtzcGVsbGNoZWNrfT48cD48L3A+PC9ib2R5PicgK1xuXHRcdCc8L2h0bWw+JyxcblxuXHR0b29sYmFyQnV0dG9uOiAnPGEgY2xhc3M9XCJzY2VkaXRvci1idXR0b24gc2NlZGl0b3ItYnV0dG9uLXtuYW1lfVwiICcgK1xuXHRcdCdkYXRhLXNjZWRpdG9yLWNvbW1hbmQ9XCJ7bmFtZX1cIiB1bnNlbGVjdGFibGU9XCJvblwiPicgK1xuXHRcdCc8ZGl2IHVuc2VsZWN0YWJsZT1cIm9uXCI+e2Rpc3BOYW1lfTwvZGl2PjwvYT4nLFxuXG5cdGVtb3RpY29uOiAnPGltZyBzcmM9XCJ7dXJsfVwiIGRhdGEtc2NlZGl0b3ItZW1vdGljb249XCJ7a2V5fVwiICcgK1xuXHRcdCdhbHQ9XCJ7a2V5fVwiIHRpdGxlPVwie3Rvb2x0aXB9XCIgLz4nLFxuXG5cdGZvbnRPcHQ6ICc8YSBjbGFzcz1cInNjZWRpdG9yLWZvbnQtb3B0aW9uXCIgaHJlZj1cIiNcIiAnICtcblx0XHQnZGF0YS1mb250PVwie2ZvbnR9XCI+PGZvbnQgZmFjZT1cIntmb250fVwiPntmb250fTwvZm9udD48L2E+JyxcblxuXHRzaXplT3B0OiAnPGEgY2xhc3M9XCJzY2VkaXRvci1mb250c2l6ZS1vcHRpb25cIiBkYXRhLXNpemU9XCJ7c2l6ZX1cIiAnICtcblx0XHQnaHJlZj1cIiNcIj48Zm9udCBzaXplPVwie3NpemV9XCI+e3NpemV9PC9mb250PjwvYT4nLFxuXG5cdHBhc3RldGV4dDpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwidHh0XCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xuXHRcdFx0Jzx0ZXh0YXJlYSBjb2xzPVwiMjBcIiByb3dzPVwiN1wiIGlkPVwidHh0XCI+PC90ZXh0YXJlYT48L2Rpdj4nICtcblx0XHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcblx0XHQnPC9kaXY+JyxcblxuXHR0YWJsZTpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwicm93c1wiPntyb3dzfTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgJyArXG5cdFx0XHQnaWQ9XCJyb3dzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiY29sc1wiPntjb2xzfTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgJyArXG5cdFx0XHQnaWQ9XCJjb2xzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiJyArXG5cdFx0XHQnIC8+PC9kaXY+JyxcblxuXHRpbWFnZTpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiaW1hZ2VcIj57dXJsfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaW1hZ2VcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwid2lkdGhcIj57d2lkdGh9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ3aWR0aFwiIHNpemU9XCIyXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiaGVpZ2h0XCI+e2hlaWdodH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImhlaWdodFwiIHNpemU9XCIyXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0XHQnPC9kaXY+JyxcblxuXHRlbWFpbDpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZW1haWxcIj57bGFiZWx9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWFpbFwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImRlc1wiPntkZXNjfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0XHQnPC9kaXY+JyxcblxuXHRsaW5rOlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJsaW5rXCI+e3VybH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpbmtcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZGVzXCI+e2Rlc2N9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnN9XCIgLz48L2Rpdj4nLFxuXG5cdHlvdXR1YmVNZW51OlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJsaW5rXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlua1wiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcblx0XHRcdCc8L2Rpdj4nLFxuXG5cdHlvdXR1YmU6XG5cdFx0JzxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4gJyArXG5cdFx0J3NyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL3tpZH0/d21vZGU9b3BhcXVlJnN0YXJ0PXt0aW1lfVwiICcgK1xuXHRcdCdkYXRhLXlvdXR1YmUtaWQ9XCJ7aWR9XCI+PC9pZnJhbWU+J1xufTtcblxuLyoqXG4gKiBSZXBsYWNlcyBhbnkgcGFyYW1zIGluIGEgdGVtcGxhdGUgd2l0aCB0aGUgcGFzc2VkIHBhcmFtcy5cbiAqXG4gKiBJZiBjcmVhdGVIdG1sIGlzIHBhc3NlZCBpdCB3aWxsIHJldHVybiBhIERvY3VtZW50RnJhZ21lbnRcbiAqIGNvbnRhaW5pbmcgdGhlIHBhcnNlZCB0ZW1wbGF0ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjcmVhdGVIdG1sXVxuICogQHJldHVybnMge3N0cmluZ3xEb2N1bWVudEZyYWdtZW50fVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG5hbWUsIHBhcmFtcywgY3JlYXRlSHRtbCkge1xuXHR2YXIgdGVtcGxhdGUgPSBfdGVtcGxhdGVzW25hbWVdO1xuXG5cdE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuXHRcdHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShcblx0XHRcdG5ldyBSZWdFeHAoZXNjYXBlLnJlZ2V4KCd7JyArIG5hbWUgKyAnfScpLCAnZycpLCBwYXJhbXNbbmFtZV1cblx0XHQpO1xuXHR9KTtcblxuXHRpZiAoY3JlYXRlSHRtbCkge1xuXHRcdHRlbXBsYXRlID0gZG9tLnBhcnNlSFRNTCh0ZW1wbGF0ZSk7XG5cdH1cblxuXHRyZXR1cm4gdGVtcGxhdGU7XG59XG4iLCIvKipcbiAqIENoZWNrIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgdGhlXG4gKiB0aGUgcGFzc2VkIHR5cGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7Kn0gYXJnXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNUeXBlb2YodHlwZSwgYXJnKSB7XG5cdHJldHVybiB0eXBlb2YgYXJnID09PSB0eXBlO1xufVxuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpc1N0cmluZyA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ3N0cmluZycpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpc1VuZGVmaW5lZCA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpc0Z1bmN0aW9uID0gaXNUeXBlb2YuYmluZChudWxsLCAnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNOdW1iZXIgPSBpc1R5cGVvZi5iaW5kKG51bGwsICdudW1iZXInKTtcblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBvYmplY3QgaGFzIG5vIGtleXNcbiAqXG4gKiBAcGFyYW0geyFPYmplY3R9IG9ialxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5T2JqZWN0KG9iaikge1xuXHRyZXR1cm4gIU9iamVjdC5rZXlzKG9iaikubGVuZ3RoO1xufVxuXG4vKipcbiAqIEV4dGVuZHMgdGhlIGZpcnN0IG9iamVjdCB3aXRoIGFueSBleHRyYSBvYmplY3RzIHBhc3NlZFxuICpcbiAqIElmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBib29sZWFuIGFuZCBzZXQgdG8gdHJ1ZVxuICogaXQgd2lsbCBleHRlbmQgY2hpbGQgYXJyYXlzIGFuZCBvYmplY3RzIHJlY3Vyc2l2ZWx5LlxuICpcbiAqIEBwYXJhbSB7IU9iamVjdHxib29sZWFufSB0YXJnZXRBcmdcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXRBcmcsIHNvdXJjZUFyZykge1xuXHR2YXIgaXNUYXJnZXRCb29sZWFuID0gdGFyZ2V0QXJnID09PSAhIXRhcmdldEFyZztcblx0dmFyIGkgICAgICA9IGlzVGFyZ2V0Qm9vbGVhbiA/IDIgOiAxO1xuXHR2YXIgdGFyZ2V0ID0gaXNUYXJnZXRCb29sZWFuID8gc291cmNlQXJnIDogdGFyZ2V0QXJnO1xuXHR2YXIgaXNEZWVwID0gaXNUYXJnZXRCb29sZWFuID8gdGFyZ2V0QXJnIDogZmFsc2U7XG5cblx0ZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcblx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdFx0T2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcblx0fVxuXG5cdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdC8vIENvcHkgYWxsIHByb3BlcnRpZXMgZm9yIGpRdWVyeSBjb21wYXRpYmlsaXR5XG5cdFx0LyogZXNsaW50IGd1YXJkLWZvci1pbjogb2ZmICovXG5cdFx0Zm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuXHRcdFx0dmFyIHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XG5cdFx0XHR2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0Ly8gU2tpcCB1bmRlZmluZWQgdmFsdWVzIHRvIG1hdGNoIGpRdWVyeVxuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2tpcCBzcGVjaWFsIGtleXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uXG5cdFx0XHRpZiAoa2V5ID09PSAnX19wcm90b19fJyB8fCBrZXkgPT09ICdjb25zdHJ1Y3RvcicpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpc1ZhbHVlT2JqZWN0ID0gaXNPYmplY3QodmFsdWUpO1xuXHRcdFx0dmFyIGlzVmFsdWVBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xuXG5cdFx0XHRpZiAoaXNEZWVwICYmIChpc1ZhbHVlT2JqZWN0IHx8IGlzVmFsdWVBcnJheSkpIHtcblx0XHRcdFx0Ly8gQ2FuIG9ubHkgbWVyZ2UgaWYgdGFyZ2V0IHR5cGUgbWF0Y2hlcyBvdGhlcndpc2UgY3JlYXRlXG5cdFx0XHRcdC8vIG5ldyB0YXJnZXQgdG8gbWVyZ2UgaW50b1xuXHRcdFx0XHR2YXIgaXNTYW1lVHlwZSA9IGlzT2JqZWN0KHRhcmdldFZhbHVlKSA9PT0gaXNWYWx1ZU9iamVjdCAmJlxuXHRcdFx0XHRcdEFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpID09PSBpc1ZhbHVlQXJyYXk7XG5cblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBleHRlbmQoXG5cdFx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0XHRpc1NhbWVUeXBlID8gdGFyZ2V0VmFsdWUgOiAoaXNWYWx1ZUFycmF5ID8gW10gOiB7fSksXG5cdFx0XHRcdFx0dmFsdWVcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgcGFzc2VkIGFycmF5XG4gKlxuICogQHBhcmFtIHshQXJyYXl9IGFyclxuICogQHBhcmFtIHsqfSBpdGVtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIGl0ZW0pIHtcblx0dmFyIGkgPSBhcnIuaW5kZXhPZihpdGVtKTtcblxuXHRpZiAoaSA+IC0xKSB7XG5cdFx0YXJyLnNwbGljZShpLCAxKTtcblx0fVxufVxuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgYW4gYXJyYXkgb3Igb2JqZWN0XG4gKlxuICogQHBhcmFtIHshT2JqZWN0fEFycmF5fSBvYmpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgKil9IGZuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlYWNoKG9iaiwgZm4pIHtcblx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSB8fCAnbGVuZ3RoJyBpbiBvYmogJiYgaXNOdW1iZXIob2JqLmxlbmd0aCkpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuXHRcdFx0Zm4oaSwgb2JqW2ldKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGZuKGtleSwgb2JqW2tleV0pO1xuXHRcdH0pO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFNDRWRpdG9yIGZyb20gJy4vbGliL1NDRWRpdG9yLmpzJztcbmltcG9ydCBQbHVnaW5NYW5hZ2VyIGZyb20gJy4vbGliL1BsdWdpbk1hbmFnZXIuanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vbGliL2VzY2FwZS5qcyc7XG5pbXBvcnQgKiBhcyBicm93c2VyIGZyb20gJy4vbGliL2Jyb3dzZXIuanMnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vbGliL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2xpYi91dGlscy5qcyc7XG5pbXBvcnQgZGVmYXVsdENvbW1hbmRzIGZyb20gJy4vbGliL2RlZmF1bHRDb21tYW5kcy5qcyc7XG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9saWIvZGVmYXVsdE9wdGlvbnMuanMnO1xuaW1wb3J0ICcuL3RoZW1lcy9vZmZpY2UubGVzcyc7XG5cblxuKHdpbmRvdyBhcyBhbnkpLnNjZWRpdG9yID0ge1xuXHRjb21tYW5kOiBTQ0VkaXRvci5jb21tYW5kLFxuXHRjb21tYW5kczogZGVmYXVsdENvbW1hbmRzLFxuXHRkZWZhdWx0T3B0aW9uczogZGVmYXVsdE9wdGlvbnMsXG5cblx0aW9zOiBicm93c2VyLmlvcyxcblx0aXNXeXNpd3lnU3VwcG9ydGVkOiBicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCxcblxuXHRyZWdleEVzY2FwZTogZXNjYXBlLnJlZ2V4LFxuXHRlc2NhcGVFbnRpdGllczogZXNjYXBlLmVudGl0aWVzLFxuXHRlc2NhcGVVcmlTY2hlbWU6IGVzY2FwZS51cmlTY2hlbWUsXG5cblx0ZG9tOiB7XG5cdFx0Y3NzOiBkb20uY3NzLFxuXHRcdGF0dHI6IGRvbS5hdHRyLFxuXHRcdHJlbW92ZUF0dHI6IGRvbS5yZW1vdmVBdHRyLFxuXHRcdGlzOiBkb20uaXMsXG5cdFx0Y2xvc2VzdDogZG9tLmNsb3Nlc3QsXG5cdFx0d2lkdGg6IGRvbS53aWR0aCxcblx0XHRoZWlnaHQ6IGRvbS5oZWlnaHQsXG5cdFx0dHJhdmVyc2U6IGRvbS50cmF2ZXJzZSxcblx0XHRyVHJhdmVyc2U6IGRvbS5yVHJhdmVyc2UsXG5cdFx0cGFyc2VIVE1MOiBkb20ucGFyc2VIVE1MLFxuXHRcdGhhc1N0eWxpbmc6IGRvbS5oYXNTdHlsaW5nLFxuXHRcdGNvbnZlcnRFbGVtZW50OiBkb20uY29udmVydEVsZW1lbnQsXG5cdFx0YmxvY2tMZXZlbExpc3Q6IGRvbS5ibG9ja0xldmVsTGlzdCxcblx0XHRjYW5IYXZlQ2hpbGRyZW46IGRvbS5jYW5IYXZlQ2hpbGRyZW4sXG5cdFx0aXNJbmxpbmU6IGRvbS5pc0lubGluZSxcblx0XHRjb3B5Q1NTOiBkb20uY29weUNTUyxcblx0XHRmaXhOZXN0aW5nOiBkb20uZml4TmVzdGluZyxcblx0XHRmaW5kQ29tbW9uQW5jZXN0b3I6IGRvbS5maW5kQ29tbW9uQW5jZXN0b3IsXG5cdFx0Z2V0U2libGluZzogZG9tLmdldFNpYmxpbmcsXG5cdFx0cmVtb3ZlV2hpdGVTcGFjZTogZG9tLnJlbW92ZVdoaXRlU3BhY2UsXG5cdFx0ZXh0cmFjdENvbnRlbnRzOiBkb20uZXh0cmFjdENvbnRlbnRzLFxuXHRcdGdldE9mZnNldDogZG9tLmdldE9mZnNldCxcblx0XHRnZXRTdHlsZTogZG9tLmdldFN0eWxlLFxuXHRcdGhhc1N0eWxlOiBkb20uaGFzU3R5bGVcblx0fSxcblx0bG9jYWxlOiBTQ0VkaXRvci5sb2NhbGUsXG5cdGljb25zOiBTQ0VkaXRvci5pY29ucyxcblx0dXRpbHM6IHtcblx0XHRlYWNoOiB1dGlscy5lYWNoLFxuXHRcdGlzRW1wdHlPYmplY3Q6IHV0aWxzLmlzRW1wdHlPYmplY3QsXG5cdFx0ZXh0ZW5kOiB1dGlscy5leHRlbmRcblx0fSxcblx0cGx1Z2luczogUGx1Z2luTWFuYWdlci5wbHVnaW5zLFxuXHRmb3JtYXRzOiBTQ0VkaXRvci5mb3JtYXRzLFxuXHRjcmVhdGU6IGZ1bmN0aW9uICh0ZXh0YXJlYTogYW55LCBvcHRpb25zOiBhbnkpIHtcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdC8vIERvbid0IGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgaW5pdGlhbGlzZWRcblx0XHQvLyBvbiBpdCdzIG93biBzb3VyY2UgZWRpdG9yXG5cdFx0aWYgKGRvbS5wYXJlbnQodGV4dGFyZWEsICcuc2NlZGl0b3ItY29udGFpbmVyJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5ydW5XaXRob3V0V3lzaXd5Z1N1cHBvcnQgfHwgYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcblx0XHRcdC8qZXNsaW50IG5vLW5ldzogb2ZmKi9cblx0XHRcdChuZXcgU0NFZGl0b3IodGV4dGFyZWEsIG9wdGlvbnMpKTtcblx0XHR9XG5cdH0sXG5cdGluc3RhbmNlOiBmdW5jdGlvbiAodGV4dGFyZWE6IGFueSkge1xuXHRcdHJldHVybiB0ZXh0YXJlYS5fc2NlZGl0b3I7XG5cdH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=