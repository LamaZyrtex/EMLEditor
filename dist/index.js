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
/* harmony import */ var _themes_square_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./themes/square.less */ "./src/themes/square.less");









var editorGlobalScope = window;
editorGlobalScope.emlEditor = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFB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QVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDRDQUFXO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsMkNBQVU7QUFDYjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwwREFBeUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLHVDQUFNO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSSx5Q0FBUTtBQUNaO0FBQ0EsR0FBRywyQ0FBVTtBQUNiLGVBQWUseUNBQVE7QUFDdkI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUcsd0NBQU87QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsa0RBQWlCO0FBQ2hDO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRyxnREFBZTtBQUNsQjtBQUNBO0FBQ0EsT0FBTywrQ0FBYztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFdBQVc7QUFDWCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCLGFBQWEsaUJBQWlCO0FBQzlCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sK0NBQWM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx1Q0FBTTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4Q0FBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSwrQ0FBYyxXQUFXLDZDQUFZO0FBQy9DLHNDQUFzQyx1Q0FBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1Q0FBTTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUseUNBQVE7QUFDVjtBQUNBLE9BQU8sdUNBQU07QUFDYixHQUFHLG1EQUFrQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsNENBQVc7QUFDZDtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTLDJEQUFlO0FBQ3hCLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSywyQkFBMkI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2Q0FBWSxDQUFDLDJEQUFlLFlBQVk7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkRBQWU7QUFDakI7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMkRBQWU7QUFDckIsVUFBVSwyREFBZTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xoSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRkQ7QUFDZ0M7QUFDSTtBQUNFO0FBQ0g7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsd0NBQU87QUFDNUIsS0FBSywyQ0FBVTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FB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QUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0YsQ0FBQztJQUNELFFBQVEsRUFBRSxVQUFVLFFBQWE7UUFDaEMsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQzNCLENBQUM7Q0FDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vbm9kZV9tb2R1bGVzL2RvbXB1cmlmeS9kaXN0L3B1cmlmeS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvdGhlbWVzL3NxdWFyZS5sZXNzP2RkYzYiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9QbHVnaW5NYW5hZ2VyLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvUmFuZ2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9TQ0VkaXRvci5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0Q29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0T3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2RvbS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Vtb3RpY29ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3RlbXBsYXRlcy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBsaWNlbnNlIERPTVB1cmlmeSAzLjAuOSB8IChjKSBDdXJlNTMgYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyB8IFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgbGljZW5zZSAyLjAgYW5kIE1vemlsbGEgUHVibGljIExpY2Vuc2UgMi4wIHwgZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2Jsb2IvMy4wLjkvTElDRU5TRSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGNvbnN0IHtcbiAgICBlbnRyaWVzLFxuICAgIHNldFByb3RvdHlwZU9mLFxuICAgIGlzRnJvemVuLFxuICAgIGdldFByb3RvdHlwZU9mLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvclxuICB9ID0gT2JqZWN0O1xuICBsZXQge1xuICAgIGZyZWV6ZSxcbiAgICBzZWFsLFxuICAgIGNyZWF0ZVxuICB9ID0gT2JqZWN0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbiAgbGV0IHtcbiAgICBhcHBseSxcbiAgICBjb25zdHJ1Y3RcbiAgfSA9IHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBSZWZsZWN0O1xuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghc2VhbCkge1xuICAgIHNlYWwgPSBmdW5jdGlvbiBzZWFsKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFhcHBseSkge1xuICAgIGFwcGx5ID0gZnVuY3Rpb24gYXBwbHkoZnVuLCB0aGlzVmFsdWUsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmdW4uYXBwbHkodGhpc1ZhbHVlLCBhcmdzKTtcbiAgICB9O1xuICB9XG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgRnVuYyguLi5hcmdzKTtcbiAgICB9O1xuICB9XG4gIGNvbnN0IGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuICBjb25zdCBhcnJheVBvcCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnBvcCk7XG4gIGNvbnN0IGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICBjb25zdCBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIGNvbnN0IHN0cmluZ1RvU3RyaW5nID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nKTtcbiAgY29uc3Qgc3RyaW5nTWF0Y2ggPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUubWF0Y2gpO1xuICBjb25zdCBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICBjb25zdCBzdHJpbmdJbmRleE9mID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLmluZGV4T2YpO1xuICBjb25zdCBzdHJpbmdUcmltID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRyaW0pO1xuICBjb25zdCBvYmplY3RIYXNPd25Qcm9wZXJ0eSA9IHVuYXBwbHkoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gIGNvbnN0IHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG4gIGNvbnN0IHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCB0aGlzQXJnIGFuZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uc3RydWN0KGZ1bmMsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIHByb3BlcnRpZXMgdG8gYSBsb29rdXAgdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldCAtIFRoZSBzZXQgdG8gd2hpY2ggZWxlbWVudHMgd2lsbCBiZSBhZGRlZC5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgY29udGFpbmluZyBlbGVtZW50cyB0byBiZSBhZGRlZCB0byB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm1DYXNlRnVuYyAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgY2FzZSBvZiBlYWNoIGVsZW1lbnQgYmVmb3JlIGFkZGluZyB0byB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgbW9kaWZpZWQgc2V0IHdpdGggYWRkZWQgZWxlbWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRUb1NldChzZXQsIGFycmF5KSB7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBzdHJpbmdUb0xvd2VyQ2FzZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG4gICAgbGV0IGwgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgbGV0IGVsZW1lbnQgPSBhcnJheVtsXTtcbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgbGNFbGVtZW50ID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSBsY0VsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFtlbGVtZW50XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW4gdXAgYW4gYXJyYXkgdG8gaGFyZGVuIGFnYWluc3QgQ1NQUFxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBiZSBjbGVhbmVkLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBjbGVhbmVkIHZlcnNpb24gb2YgdGhlIGFycmF5XG4gICAqL1xuICBmdW5jdGlvbiBjbGVhbkFycmF5KGFycmF5KSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkoYXJyYXksIGluZGV4KTtcbiAgICAgIGlmICghaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGFycmF5W2luZGV4XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBjbG9uZWQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgbmV3IG9iamVjdCB0aGF0IGNvcGllcyB0aGUgb3JpZ2luYWwuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSBjcmVhdGUobnVsbCk7XG4gICAgZm9yIChjb25zdCBbcHJvcGVydHksIHZhbHVlXSBvZiBlbnRyaWVzKG9iamVjdCkpIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgaWYgKGlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xlYW5BcnJheSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsb25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhdXRvbWF0aWNhbGx5IGNoZWNrcyBpZiB0aGUgcHJvcCBpcyBmdW5jdGlvbiBvciBnZXR0ZXIgYW5kIGJlaGF2ZXMgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGxvb2sgdXAgdGhlIGdldHRlciBmdW5jdGlvbiBpbiBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCAtIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB3aGljaCB0byBmaW5kIHRoZSBnZXR0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGdldHRlciBmdW5jdGlvbiBmb3VuZCBpbiB0aGUgcHJvdG90eXBlIGNoYWluIG9yIGEgZmFsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBsb29rdXBHZXR0ZXIob2JqZWN0LCBwcm9wKSB7XG4gICAgd2hpbGUgKG9iamVjdCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3ApO1xuICAgICAgaWYgKGRlc2MpIHtcbiAgICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy5nZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmYWxsYmFja1ZhbHVlO1xuICB9XG5cbiAgY29uc3QgaHRtbCQxID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpYWxvZycsICdkaXInLCAnZGl2JywgJ2RsJywgJ2R0JywgJ2VsZW1lbnQnLCAnZW0nLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9udCcsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2ltZycsICdpbnB1dCcsICdpbnMnLCAna2JkJywgJ2xhYmVsJywgJ2xlZ2VuZCcsICdsaScsICdtYWluJywgJ21hcCcsICdtYXJrJywgJ21hcnF1ZWUnLCAnbWVudScsICdtZW51aXRlbScsICdtZXRlcicsICduYXYnLCAnbm9icicsICdvbCcsICdvcHRncm91cCcsICdvcHRpb24nLCAnb3V0cHV0JywgJ3AnLCAncGljdHVyZScsICdwcmUnLCAncHJvZ3Jlc3MnLCAncScsICdycCcsICdydCcsICdydWJ5JywgJ3MnLCAnc2FtcCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzaGFkb3cnLCAnc21hbGwnLCAnc291cmNlJywgJ3NwYWNlcicsICdzcGFuJywgJ3N0cmlrZScsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RlbXBsYXRlJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndHInLCAndHJhY2snLCAndHQnLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJ10pO1xuXG4gIC8vIFNWR1xuICBjb25zdCBzdmckMSA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwcGF0aCcsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmaWx0ZXInLCAnZm9udCcsICdnJywgJ2dseXBoJywgJ2dseXBocmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsZ3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N0eWxlJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0cGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJywgJ3ZpZXcnLCAndmtlcm4nXSk7XG4gIGNvbnN0IHN2Z0ZpbHRlcnMgPSBmcmVlemUoWydmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLCAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJywgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRHJvcFNoYWRvdycsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnXSk7XG5cbiAgLy8gTGlzdCBvZiBTVkcgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWxsb3dlZCBieSBkZWZhdWx0LlxuICAvLyBXZSBzdGlsbCBuZWVkIHRvIGtub3cgdGhlbSBzbyB0aGF0IHdlIGNhbiBkbyBuYW1lc3BhY2VcbiAgLy8gY2hlY2tzIHByb3Blcmx5IGluIGNhc2Ugb25lIHdhbnRzIHRvIGFkZCB0aGVtIHRvXG4gIC8vIGFsbG93LWxpc3QuXG4gIGNvbnN0IHN2Z0Rpc2FsbG93ZWQgPSBmcmVlemUoWydhbmltYXRlJywgJ2NvbG9yLXByb2ZpbGUnLCAnY3Vyc29yJywgJ2Rpc2NhcmQnLCAnZm9udC1mYWNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGF0Y2gnLCAnaGF0Y2hwYXRoJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21pc3NpbmctZ2x5cGgnLCAnc2NyaXB0JywgJ3NldCcsICdzb2xpZGNvbG9yJywgJ3Vua25vd24nLCAndXNlJ10pO1xuICBjb25zdCBtYXRoTWwkMSA9IGZyZWV6ZShbJ21hdGgnLCAnbWVuY2xvc2UnLCAnbWVycm9yJywgJ21mZW5jZWQnLCAnbWZyYWMnLCAnbWdseXBoJywgJ21pJywgJ21sYWJlbGVkdHInLCAnbW11bHRpc2NyaXB0cycsICdtbicsICdtbycsICdtb3ZlcicsICdtcGFkZGVkJywgJ21waGFudG9tJywgJ21yb290JywgJ21yb3cnLCAnbXMnLCAnbXNwYWNlJywgJ21zcXJ0JywgJ21zdHlsZScsICdtc3ViJywgJ21zdXAnLCAnbXN1YnN1cCcsICdtdGFibGUnLCAnbXRkJywgJ210ZXh0JywgJ210cicsICdtdW5kZXInLCAnbXVuZGVyb3ZlcicsICdtcHJlc2NyaXB0cyddKTtcblxuICAvLyBTaW1pbGFybHkgdG8gU1ZHLCB3ZSB3YW50IHRvIGtub3cgYWxsIE1hdGhNTCBlbGVtZW50cyxcbiAgLy8gZXZlbiB0aG9zZSB0aGF0IHdlIGRpc2FsbG93IGJ5IGRlZmF1bHQuXG4gIGNvbnN0IG1hdGhNbERpc2FsbG93ZWQgPSBmcmVlemUoWydtYWN0aW9uJywgJ21hbGlnbmdyb3VwJywgJ21hbGlnbm1hcmsnLCAnbWxvbmdkaXYnLCAnbXNjYXJyaWVzJywgJ21zY2FycnknLCAnbXNncm91cCcsICdtc3RhY2snLCAnbXNsaW5lJywgJ21zcm93JywgJ3NlbWFudGljcycsICdhbm5vdGF0aW9uJywgJ2Fubm90YXRpb24teG1sJywgJ21wcmVzY3JpcHRzJywgJ25vbmUnXSk7XG4gIGNvbnN0IHRleHQgPSBmcmVlemUoWycjdGV4dCddKTtcblxuICBjb25zdCBodG1sID0gZnJlZXplKFsnYWNjZXB0JywgJ2FjdGlvbicsICdhbGlnbicsICdhbHQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9waWN0dXJlaW5waWN0dXJlJywgJ2F1dG9wbGF5JywgJ2JhY2tncm91bmQnLCAnYmdjb2xvcicsICdib3JkZXInLCAnY2FwdHVyZScsICdjZWxscGFkZGluZycsICdjZWxsc3BhY2luZycsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3MnLCAnY2xlYXInLCAnY29sb3InLCAnY29scycsICdjb2xzcGFuJywgJ2NvbnRyb2xzJywgJ2NvbnRyb2xzbGlzdCcsICdjb29yZHMnLCAnY3Jvc3NvcmlnaW4nLCAnZGF0ZXRpbWUnLCAnZGVjb2RpbmcnLCAnZGVmYXVsdCcsICdkaXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZXBpY3R1cmVpbnBpY3R1cmUnLCAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsICdlbmN0eXBlJywgJ2VudGVya2V5aGludCcsICdmYWNlJywgJ2ZvcicsICdoZWFkZXJzJywgJ2hlaWdodCcsICdoaWRkZW4nLCAnaGlnaCcsICdocmVmJywgJ2hyZWZsYW5nJywgJ2lkJywgJ2lucHV0bW9kZScsICdpbnRlZ3JpdHknLCAnaXNtYXAnLCAna2luZCcsICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9hZGluZycsICdsb29wJywgJ2xvdycsICdtYXgnLCAnbWF4bGVuZ3RoJywgJ21lZGlhJywgJ21ldGhvZCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ211bHRpcGxlJywgJ211dGVkJywgJ25hbWUnLCAnbm9uY2UnLCAnbm9zaGFkZScsICdub3ZhbGlkYXRlJywgJ25vd3JhcCcsICdvcGVuJywgJ29wdGltdW0nLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcmNsYW5nJywgJ3N0YXJ0JywgJ3NyYycsICdzcmNzZXQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmluZGV4JywgJ3RpdGxlJywgJ3RyYW5zbGF0ZScsICd0eXBlJywgJ3VzZW1hcCcsICd2YWxpZ24nLCAndmFsdWUnLCAnd2lkdGgnLCAneG1sbnMnLCAnc2xvdCddKTtcbiAgY29uc3Qgc3ZnID0gZnJlZXplKFsnYWNjZW50LWhlaWdodCcsICdhY2N1bXVsYXRlJywgJ2FkZGl0aXZlJywgJ2FsaWdubWVudC1iYXNlbGluZScsICdhc2NlbnQnLCAnYXR0cmlidXRlbmFtZScsICdhdHRyaWJ1dGV0eXBlJywgJ2F6aW11dGgnLCAnYmFzZWZyZXF1ZW5jeScsICdiYXNlbGluZS1zaGlmdCcsICdiZWdpbicsICdiaWFzJywgJ2J5JywgJ2NsYXNzJywgJ2NsaXAnLCAnY2xpcHBhdGh1bml0cycsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NvbG9yJywgJ2NvbG9yLWludGVycG9sYXRpb24nLCAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJywgJ2NvbG9yLXByb2ZpbGUnLCAnY29sb3ItcmVuZGVyaW5nJywgJ2N4JywgJ2N5JywgJ2QnLCAnZHgnLCAnZHknLCAnZGlmZnVzZWNvbnN0YW50JywgJ2RpcmVjdGlvbicsICdkaXNwbGF5JywgJ2Rpdmlzb3InLCAnZHVyJywgJ2VkZ2Vtb2RlJywgJ2VsZXZhdGlvbicsICdlbmQnLCAnZmlsbCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2ZpbHRlcicsICdmaWx0ZXJ1bml0cycsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvbnQtZmFtaWx5JywgJ2ZvbnQtc2l6ZScsICdmb250LXNpemUtYWRqdXN0JywgJ2ZvbnQtc3RyZXRjaCcsICdmb250LXN0eWxlJywgJ2ZvbnQtdmFyaWFudCcsICdmb250LXdlaWdodCcsICdmeCcsICdmeScsICdnMScsICdnMicsICdnbHlwaC1uYW1lJywgJ2dseXBocmVmJywgJ2dyYWRpZW50dW5pdHMnLCAnZ3JhZGllbnR0cmFuc2Zvcm0nLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2luJywgJ2luMicsICdrJywgJ2sxJywgJ2syJywgJ2szJywgJ2s0JywgJ2tlcm5pbmcnLCAna2V5cG9pbnRzJywgJ2tleXNwbGluZXMnLCAna2V5dGltZXMnLCAnbGFuZycsICdsZW5ndGhhZGp1c3QnLCAnbGV0dGVyLXNwYWNpbmcnLCAna2VybmVsbWF0cml4JywgJ2tlcm5lbHVuaXRsZW5ndGgnLCAnbGlnaHRpbmctY29sb3InLCAnbG9jYWwnLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdtYXJrZXJoZWlnaHQnLCAnbWFya2VydW5pdHMnLCAnbWFya2Vyd2lkdGgnLCAnbWFza2NvbnRlbnR1bml0cycsICdtYXNrdW5pdHMnLCAnbWF4JywgJ21hc2snLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21vZGUnLCAnbWluJywgJ25hbWUnLCAnbnVtb2N0YXZlcycsICdvZmZzZXQnLCAnb3BlcmF0b3InLCAnb3BhY2l0eScsICdvcmRlcicsICdvcmllbnQnLCAnb3JpZW50YXRpb24nLCAnb3JpZ2luJywgJ292ZXJmbG93JywgJ3BhaW50LW9yZGVyJywgJ3BhdGgnLCAncGF0aGxlbmd0aCcsICdwYXR0ZXJuY29udGVudHVuaXRzJywgJ3BhdHRlcm50cmFuc2Zvcm0nLCAncGF0dGVybnVuaXRzJywgJ3BvaW50cycsICdwcmVzZXJ2ZWFscGhhJywgJ3ByZXNlcnZlYXNwZWN0cmF0aW8nLCAncHJpbWl0aXZldW5pdHMnLCAncicsICdyeCcsICdyeScsICdyYWRpdXMnLCAncmVmeCcsICdyZWZ5JywgJ3JlcGVhdGNvdW50JywgJ3JlcGVhdGR1cicsICdyZXN0YXJ0JywgJ3Jlc3VsdCcsICdyb3RhdGUnLCAnc2NhbGUnLCAnc2VlZCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3BlY3VsYXJjb25zdGFudCcsICdzcGVjdWxhcmV4cG9uZW50JywgJ3NwcmVhZG1ldGhvZCcsICdzdGFydG9mZnNldCcsICdzdGRkZXZpYXRpb24nLCAnc3RpdGNodGlsZXMnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlJywgJ3N0cm9rZS13aWR0aCcsICdzdHlsZScsICdzdXJmYWNlc2NhbGUnLCAnc3lzdGVtbGFuZ3VhZ2UnLCAndGFiaW5kZXgnLCAndGFyZ2V0eCcsICd0YXJnZXR5JywgJ3RyYW5zZm9ybScsICd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RleHQtYW5jaG9yJywgJ3RleHQtZGVjb3JhdGlvbicsICd0ZXh0LXJlbmRlcmluZycsICd0ZXh0bGVuZ3RoJywgJ3R5cGUnLCAndTEnLCAndTInLCAndW5pY29kZScsICd2YWx1ZXMnLCAndmlld2JveCcsICd2aXNpYmlsaXR5JywgJ3ZlcnNpb24nLCAndmVydC1hZHYteScsICd2ZXJ0LW9yaWdpbi14JywgJ3ZlcnQtb3JpZ2luLXknLCAnd2lkdGgnLCAnd29yZC1zcGFjaW5nJywgJ3dyYXAnLCAnd3JpdGluZy1tb2RlJywgJ3hjaGFubmVsc2VsZWN0b3InLCAneWNoYW5uZWxzZWxlY3RvcicsICd4JywgJ3gxJywgJ3gyJywgJ3htbG5zJywgJ3knLCAneTEnLCAneTInLCAneicsICd6b29tYW5kcGFuJ10pO1xuICBjb25zdCBtYXRoTWwgPSBmcmVlemUoWydhY2NlbnQnLCAnYWNjZW50dW5kZXInLCAnYWxpZ24nLCAnYmV2ZWxsZWQnLCAnY2xvc2UnLCAnY29sdW1uc2FsaWduJywgJ2NvbHVtbmxpbmVzJywgJ2NvbHVtbnNwYW4nLCAnZGVub21hbGlnbicsICdkZXB0aCcsICdkaXInLCAnZGlzcGxheScsICdkaXNwbGF5c3R5bGUnLCAnZW5jb2RpbmcnLCAnZmVuY2UnLCAnZnJhbWUnLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnbGFyZ2VvcCcsICdsZW5ndGgnLCAnbGluZXRoaWNrbmVzcycsICdsc3BhY2UnLCAnbHF1b3RlJywgJ21hdGhiYWNrZ3JvdW5kJywgJ21hdGhjb2xvcicsICdtYXRoc2l6ZScsICdtYXRodmFyaWFudCcsICdtYXhzaXplJywgJ21pbnNpemUnLCAnbW92YWJsZWxpbWl0cycsICdub3RhdGlvbicsICdudW1hbGlnbicsICdvcGVuJywgJ3Jvd2FsaWduJywgJ3Jvd2xpbmVzJywgJ3Jvd3NwYWNpbmcnLCAncm93c3BhbicsICdyc3BhY2UnLCAncnF1b3RlJywgJ3NjcmlwdGxldmVsJywgJ3NjcmlwdG1pbnNpemUnLCAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLCAnc2VsZWN0aW9uJywgJ3NlcGFyYXRvcicsICdzZXBhcmF0b3JzJywgJ3N0cmV0Y2h5JywgJ3N1YnNjcmlwdHNoaWZ0JywgJ3N1cHNjcmlwdHNoaWZ0JywgJ3N5bW1ldHJpYycsICd2b2Zmc2V0JywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuICBjb25zdCB4bWwgPSBmcmVlemUoWyd4bGluazpocmVmJywgJ3htbDppZCcsICd4bGluazp0aXRsZScsICd4bWw6c3BhY2UnLCAneG1sbnM6eGxpbmsnXSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG4gIGNvbnN0IE1VU1RBQ0hFX0VYUFIgPSBzZWFsKC9cXHtcXHtbXFx3XFxXXSp8W1xcd1xcV10qXFx9XFx9L2dtKTsgLy8gU3BlY2lmeSB0ZW1wbGF0ZSBkZXRlY3Rpb24gcmVnZXggZm9yIFNBRkVfRk9SX1RFTVBMQVRFUyBtb2RlXG4gIGNvbnN0IEVSQl9FWFBSID0gc2VhbCgvPCVbXFx3XFxXXSp8W1xcd1xcV10qJT4vZ20pO1xuICBjb25zdCBUTVBMSVRfRVhQUiA9IHNlYWwoL1xcJHtbXFx3XFxXXSp9L2dtKTtcbiAgY29uc3QgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IElTX0FMTE9XRURfVVJJID0gc2VhbCgvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHApOnxbXmEtel18W2EteisuXFwtXSsoPzpbXmEteisuXFwtOl18JCkpL2kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICApO1xuXG4gIGNvbnN0IElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICBjb25zdCBBVFRSX1dISVRFU1BBQ0UgPSBzZWFsKC9bXFx1MDAwMC1cXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMC1cXHUyMDI5XFx1MjA1RlxcdTMwMDBdL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICk7XG5cbiAgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuXG4gIHZhciBFWFBSRVNTSU9OUyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgTVVTVEFDSEVfRVhQUjogTVVTVEFDSEVfRVhQUixcbiAgICBFUkJfRVhQUjogRVJCX0VYUFIsXG4gICAgVE1QTElUX0VYUFI6IFRNUExJVF9FWFBSLFxuICAgIERBVEFfQVRUUjogREFUQV9BVFRSLFxuICAgIEFSSUFfQVRUUjogQVJJQV9BVFRSLFxuICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSxcbiAgICBJU19TQ1JJUFRfT1JfREFUQTogSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgQVRUUl9XSElURVNQQUNFOiBBVFRSX1dISVRFU1BBQ0UsXG4gICAgRE9DVFlQRV9OQU1FOiBET0NUWVBFX05BTUVcbiAgfSk7XG5cbiAgY29uc3QgZ2V0R2xvYmFsID0gZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3c7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBEb24ndCBleHBvcnQgdGhpcyBmdW5jdGlvbiBvdXRzaWRlIHRoaXMgbW9kdWxlIVxuICAgKiBAcGFyYW0ge1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gcHVyaWZ5SG9zdEVsZW1lbnQgVGhlIFNjcmlwdCBlbGVtZW50IHVzZWQgdG8gbG9hZCBET01QdXJpZnkgKHRvIGRldGVybWluZSBwb2xpY3kgbmFtZSBzdWZmaXgpLlxuICAgKiBAcmV0dXJuIHtUcnVzdGVkVHlwZVBvbGljeX0gVGhlIHBvbGljeSBjcmVhdGVkIChvciBudWxsLCBpZiBUcnVzdGVkIFR5cGVzXG4gICAqIGFyZSBub3Qgc3VwcG9ydGVkIG9yIGNyZWF0aW5nIHRoZSBwb2xpY3kgZmFpbGVkKS5cbiAgICovXG4gIGNvbnN0IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgcHVyaWZ5SG9zdEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIHRydXN0ZWRUeXBlcyAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxuICAgIC8vIGJ5IGFkZGluZyBhIGRhdGEtdHQtcG9saWN5LXN1ZmZpeCB0byB0aGUgc2NyaXB0IGVsZW1lbnQgd2l0aCB0aGUgRE9NUHVyaWZ5LlxuICAgIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cbiAgICBsZXQgc3VmZml4ID0gbnVsbDtcbiAgICBjb25zdCBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAocHVyaWZ5SG9zdEVsZW1lbnQgJiYgcHVyaWZ5SG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICAgIHN1ZmZpeCA9IHB1cmlmeUhvc3RFbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cbiAgICBjb25zdCBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICAgIGNyZWF0ZUhUTUwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTY3JpcHRVUkwoc2NyaXB0VXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHNjcmlwdFVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xuICAgICAgLy8gYWxyZWFkeSBydW4pLiBTa2lwIGNyZWF0aW5nIHRoZSBwb2xpY3ksIGFzIHRoaXMgd2lsbCBvbmx5IGNhdXNlIGVycm9yc1xuICAgICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIGxldCB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuICAgIGNvbnN0IERPTVB1cmlmeSA9IHJvb3QgPT4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuXG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBsYWJlbCwgZXhwb3NlZCBmb3IgZWFzaWVyIGNoZWNrc1xuICAgICAqIGlmIERPTVB1cmlmeSBpcyB1cCB0byBkYXRlIG9yIG5vdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS52ZXJzaW9uID0gJzMuMC45JztcblxuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGVsZW1lbnRzIHRoYXQgRE9NUHVyaWZ5IHJlbW92ZWQgZHVyaW5nIHNhbml0YXRpb24uXG4gICAgICogRW1wdHkgaWYgbm90aGluZyB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuICAgIGlmICghd2luZG93IHx8ICF3aW5kb3cuZG9jdW1lbnQgfHwgd2luZG93LmRvY3VtZW50Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgICAvLyBOb3QgcnVubmluZyBpbiBhIGJyb3dzZXIsIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IHlvdSBjYW4gcGFzcyB5b3VyIG93biBXaW5kb3dcbiAgICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG4gICAgbGV0IHtcbiAgICAgIGRvY3VtZW50XG4gICAgfSA9IHdpbmRvdztcbiAgICBjb25zdCBvcmlnaW5hbERvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgY3VycmVudFNjcmlwdCA9IG9yaWdpbmFsRG9jdW1lbnQuY3VycmVudFNjcmlwdDtcbiAgICBjb25zdCB7XG4gICAgICBEb2N1bWVudEZyYWdtZW50LFxuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICAgIE5vZGUsXG4gICAgICBFbGVtZW50LFxuICAgICAgTm9kZUZpbHRlcixcbiAgICAgIE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAgfHwgd2luZG93Lk1vek5hbWVkQXR0ck1hcCxcbiAgICAgIEhUTUxGb3JtRWxlbWVudCxcbiAgICAgIERPTVBhcnNlcixcbiAgICAgIHRydXN0ZWRUeXBlc1xuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IEVsZW1lbnQucHJvdG90eXBlO1xuICAgIGNvbnN0IGNsb25lTm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2xvbmVOb2RlJyk7XG4gICAgY29uc3QgZ2V0TmV4dFNpYmxpbmcgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ25leHRTaWJsaW5nJyk7XG4gICAgY29uc3QgZ2V0Q2hpbGROb2RlcyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGROb2RlcycpO1xuICAgIGNvbnN0IGdldFBhcmVudE5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ3BhcmVudE5vZGUnKTtcblxuICAgIC8vIEFzIHBlciBpc3N1ZSAjNDcsIHRoZSB3ZWItY29tcG9uZW50cyByZWdpc3RyeSBpcyBpbmhlcml0ZWQgYnkgYVxuICAgIC8vIG5ldyBkb2N1bWVudCBjcmVhdGVkIHZpYSBjcmVhdGVIVE1MRG9jdW1lbnQuIEFzIHBlciB0aGUgc3BlY1xuICAgIC8vIChodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjcmVhdGluZy1hbmQtcGFzc2luZy1yZWdpc3RyaWVzKVxuICAgIC8vIGEgbmV3IGVtcHR5IHJlZ2lzdHJ5IGlzIHVzZWQgd2hlbiBjcmVhdGluZyBhIHRlbXBsYXRlIGNvbnRlbnRzIG93bmVyXG4gICAgLy8gZG9jdW1lbnQsIHNvIHdlIHVzZSB0aGF0IGFzIG91ciBwYXJlbnQgZG9jdW1lbnQgdG8gZW5zdXJlIG5vdGhpbmdcbiAgICAvLyBpcyBpbmhlcml0ZWQuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCB0cnVzdGVkVHlwZXNQb2xpY3k7XG4gICAgbGV0IGVtcHR5SFRNTCA9ICcnO1xuICAgIGNvbnN0IHtcbiAgICAgIGltcGxlbWVudGF0aW9uLFxuICAgICAgY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgfSA9IGRvY3VtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGltcG9ydE5vZGVcbiAgICB9ID0gb3JpZ2luYWxEb2N1bWVudDtcbiAgICBsZXQgaG9va3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZW50cmllcyA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZ2V0UGFyZW50Tm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpbXBsZW1lbnRhdGlvbiAmJiBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7XG4gICAgICBNVVNUQUNIRV9FWFBSLFxuICAgICAgRVJCX0VYUFIsXG4gICAgICBUTVBMSVRfRVhQUixcbiAgICAgIERBVEFfQVRUUixcbiAgICAgIEFSSUFfQVRUUixcbiAgICAgIElTX1NDUklQVF9PUl9EQVRBLFxuICAgICAgQVRUUl9XSElURVNQQUNFXG4gICAgfSA9IEVYUFJFU1NJT05TO1xuICAgIGxldCB7XG4gICAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkkkMVxuICAgIH0gPSBFWFBSRVNTSU9OUztcblxuICAgIC8qKlxuICAgICAqIFdlIGNvbnNpZGVyIHRoZSBlbGVtZW50cyBhbmQgYXR0cmlidXRlcyBiZWxvdyB0byBiZSBzYWZlLiBJZGVhbGx5XG4gICAgICogZG9uJ3QgYWRkIGFueSBuZXcgb25lcyBidXQgZmVlbCBmcmVlIHRvIHJlbW92ZSB1bndhbnRlZCBvbmVzLlxuICAgICAqL1xuXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwkMSwgLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLm1hdGhNbCQxLCAuLi50ZXh0XSk7XG5cbiAgICAvKiBBbGxvd2VkIGF0dHJpYnV0ZSBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX0FUVFIgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9BVFRSID0gYWRkVG9TZXQoe30sIFsuLi5odG1sLCAuLi5zdmcsIC4uLm1hdGhNbCwgLi4ueG1sXSk7XG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBob3cgRE9NUFVyaWZ5IHNob3VsZCBoYW5kbGUgY3VzdG9tIGVsZW1lbnRzIGFuZCB0aGVpciBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cy5cbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSB0YWdOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGN1c3RvbSBlbGVtZW50cylcbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSBhdHRyaWJ1dGVOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGF0dHJpYnV0ZXMgbm90IG9uIHRoZSBhbGxvdyBsaXN0KVxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIGFsbG93IGN1c3RvbSBlbGVtZW50cyBkZXJpdmVkIGZyb20gYnVpbHQtaW5zIGlmIHRoZXkgcGFzcyBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2suIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAgICovXG4gICAgbGV0IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gT2JqZWN0LnNlYWwoY3JlYXRlKG51bGwsIHtcbiAgICAgIHRhZ05hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIGxldCBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIGxldCBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgc2VsZi1jbG9zaW5nIHRhZ3MgaW4gYXR0cmlidXRlcyBhcmUgYWxsb3dlZC5cbiAgICAgKiBVc3VhbGx5IHJlbW92ZWQgZHVlIHRvIGEgbVhTUyBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgbGV0IEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IHRydWU7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICBsZXQgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgbGV0IFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICBsZXQgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICBsZXQgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgbGV0IFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICBsZXQgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIGxldCBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzP1xuICAgICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBKUyB2YXJpYWJsZXMsIG1pdGlnYXRpbmcgYXR0YWNrcyB0aGF0IGFidXNlIHRoZSBIVE1ML0RPTSBzcGVjIHJ1bGVzLlxuICAgICAqXG4gICAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcbiAgICAgKiAgIC0gTmFtZWQgQWNjZXNzIG9uIFdpbmRvdyAowqc3LjMuMylcbiAgICAgKiAgIC0gRE9NIFRyZWUgQWNjZXNzb3JzICjCpzMuMS41KVxuICAgICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXG4gICAgICogICAtIElmcmFtZSBzcmNkb2MgLyBOZXN0ZWQgV2luZG93UHJveGllcyAowqc0LjguNSlcbiAgICAgKiAgIC0gSFRNTENvbGxlY3Rpb24gKMKnNC4yLjEwLjIpXG4gICAgICpcbiAgICAgKiBOYW1lc3BhY2UgaXNvbGF0aW9uIGlzIGltcGxlbWVudGVkIGJ5IHByZWZpeGluZyBgaWRgIGFuZCBgbmFtZWAgYXR0cmlidXRlc1xuICAgICAqIHdpdGggYSBjb25zdGFudCBzdHJpbmcsIGkuZS4sIGB1c2VyLWNvbnRlbnQtYFxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGZhbHNlO1xuICAgIGNvbnN0IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCA9ICd1c2VyLWNvbnRlbnQtJztcblxuICAgIC8qIEtlZXAgZWxlbWVudCBjb250ZW50IHdoZW4gcmVtb3ZpbmcgZWxlbWVudD8gKi9cbiAgICBsZXQgS0VFUF9DT05URU5UID0gdHJ1ZTtcblxuICAgIC8qIElmIGEgYE5vZGVgIGlzIHBhc3NlZCB0byBzYW5pdGl6ZSgpLCB0aGVuIHBlcmZvcm1zIHNhbml0aXphdGlvbiBpbi1wbGFjZSBpbnN0ZWFkXG4gICAgICogb2YgaW1wb3J0aW5nIGl0IGludG8gYSBuZXcgRG9jdW1lbnQgYW5kIHJldHVybmluZyBhIHNhbml0aXplZCBjb3B5ICovXG4gICAgbGV0IElOX1BMQUNFID0gZmFsc2U7XG5cbiAgICAvKiBBbGxvdyB1c2FnZSBvZiBwcm9maWxlcyBsaWtlIGh0bWwsIHN2ZyBhbmQgbWF0aE1sICovXG4gICAgbGV0IFVTRV9QUk9GSUxFUyA9IHt9O1xuXG4gICAgLyogVGFncyB0byBpZ25vcmUgY29udGVudCBvZiB3aGVuIEtFRVBfQ09OVEVOVCBpcyB0cnVlICovXG4gICAgbGV0IEZPUkJJRF9DT05URU5UUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9GT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCcsICdhdWRpbycsICdjb2xncm91cCcsICdkZXNjJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGVhZCcsICdpZnJhbWUnLCAnbWF0aCcsICdtaScsICdtbicsICdtbycsICdtcycsICdtdGV4dCcsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ25vc2NyaXB0JywgJ3BsYWludGV4dCcsICdzY3JpcHQnLCAnc3R5bGUnLCAnc3ZnJywgJ3RlbXBsYXRlJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3ZpZGVvJywgJ3htcCddKTtcblxuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICAgIGxldCBEQVRBX1VSSV9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0RBVEFfVVJJX1RBR1MgPSBhZGRUb1NldCh7fSwgWydhdWRpbycsICd2aWRlbycsICdpbWcnLCAnc291cmNlJywgJ2ltYWdlJywgJ3RyYWNrJ10pO1xuXG4gICAgLyogQXR0cmlidXRlcyBzYWZlIGZvciB2YWx1ZXMgbGlrZSBcImphdmFzY3JpcHQ6XCIgKi9cbiAgICBsZXQgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncm9sZScsICdzdW1tYXJ5JywgJ3RpdGxlJywgJ3ZhbHVlJywgJ3N0eWxlJywgJ3htbG5zJ10pO1xuICAgIGNvbnN0IE1BVEhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XG4gICAgY29uc3QgU1ZHX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgY29uc3QgSFRNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG4gICAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXG4gICAgbGV0IE5BTUVTUEFDRSA9IEhUTUxfTkFNRVNQQUNFO1xuICAgIGxldCBJU19FTVBUWV9JTlBVVCA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3dlZCBYSFRNTCtYTUwgbmFtZXNwYWNlcyAqL1xuICAgIGxldCBBTExPV0VEX05BTUVTUEFDRVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTID0gYWRkVG9TZXQoe30sIFtNQVRITUxfTkFNRVNQQUNFLCBTVkdfTkFNRVNQQUNFLCBIVE1MX05BTUVTUEFDRV0sIHN0cmluZ1RvU3RyaW5nKTtcblxuICAgIC8qIFBhcnNpbmcgb2Ygc3RyaWN0IFhIVE1MIGRvY3VtZW50cyAqL1xuICAgIGxldCBQQVJTRVJfTUVESUFfVFlQRSA9IG51bGw7XG4gICAgY29uc3QgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyA9IFsnYXBwbGljYXRpb24veGh0bWwreG1sJywgJ3RleHQvaHRtbCddO1xuICAgIGNvbnN0IERFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUgPSAndGV4dC9odG1sJztcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBudWxsO1xuXG4gICAgLyogS2VlcCBhIHJlZmVyZW5jZSB0byBjb25maWcgdG8gcGFzcyB0byBob29rcyAqL1xuICAgIGxldCBDT05GSUcgPSBudWxsO1xuXG4gICAgLyogSWRlYWxseSwgZG8gbm90IHRvdWNoIGFueXRoaW5nIGJlbG93IHRoaXMgbGluZSAqL1xuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGNvbnN0IGlzUmVnZXhPckZ1bmN0aW9uID0gZnVuY3Rpb24gaXNSZWdleE9yRnVuY3Rpb24odGVzdFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGVzdFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHRlc3RWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfcGFyc2VDb25maWcgPSBmdW5jdGlvbiBfcGFyc2VDb25maWcoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIGlmIChDT05GSUcgJiYgQ09ORklHID09PSBjZmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSB0YW1wZXJpbmcgKi9cbiAgICAgIGlmICghY2ZnIHx8IHR5cGVvZiBjZmcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNmZyA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXG4gICAgICBjZmcgPSBjbG9uZShjZmcpO1xuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTLmluZGV4T2YoY2ZnLlBBUlNFUl9NRURJQV9UWVBFKSA9PT0gLTEgPyBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogY2ZnLlBBUlNFUl9NRURJQV9UWVBFO1xuXG4gICAgICAvLyBIVE1MIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgYXJlIG5vdCBjYXNlLXNlbnNpdGl2ZSwgY29udmVydGluZyB0byBsb3dlcmNhc2UuIEtlZXBpbmcgWEhUTUwgYXMgaXMuXG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyA9IFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyA/IHN0cmluZ1RvU3RyaW5nIDogc3RyaW5nVG9Mb3dlckNhc2U7XG5cbiAgICAgIC8qIFNldCBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIEFMTE9XRURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfVEFHUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9UQUdTO1xuICAgICAgQUxMT1dFRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9BVFRSJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX0FUVFI7XG4gICAgICBBTExPV0VEX05BTUVTUEFDRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX05BTUVTUEFDRVMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9OQU1FU1BBQ0VTLCBzdHJpbmdUb1N0cmluZykgOiBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUztcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfVVJJX1NBRkVfQVRUUicpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX1VSSV9TQUZFX0FUVFIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTO1xuICAgICAgREFUQV9VUklfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9EQVRBX1VSSV9UQUdTJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfREFUQV9VUklfVEFHUyxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgICBGT1JCSURfQ09OVEVOVFMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQ09OVEVOVFMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICAgIEZPUkJJRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgRk9SQklEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XG4gICAgICBVU0VfUFJPRklMRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdVU0VfUFJPRklMRVMnKSA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSBjZmcuQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBjZmcuUkVUVVJOX1RSVVNURURfVFlQRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgRk9SQ0VfQk9EWSA9IGNmZy5GT1JDRV9CT0RZIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQU5JVElaRV9ET00gPSBjZmcuU0FOSVRJWkVfRE9NICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGNmZy5TQU5JVElaRV9OQU1FRF9QUk9QUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJDEgPSBjZmcuQUxMT1dFRF9VUklfUkVHRVhQIHx8IElTX0FMTE9XRURfVVJJO1xuICAgICAgTkFNRVNQQUNFID0gY2ZnLk5BTUVTUEFDRSB8fCBIVE1MX05BTUVTUEFDRTtcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM7XG4gICAgICB9XG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFBhcnNlIHByb2ZpbGUgaW5mbyAqL1xuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xuICAgICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgdGV4dCk7XG4gICAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLmh0bWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGh0bWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBodG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmdGaWx0ZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmdGaWx0ZXJzKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgY2ZnLkFERF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgIGlmIChGT1JCSURfQ09OVEVOVFMgPT09IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgICAgRk9SQklEX0NPTlRFTlRTID0gY2xvbmUoRk9SQklEX0NPTlRFTlRTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChGT1JCSURfQ09OVEVOVFMsIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkICN0ZXh0IGluIGNhc2UgS0VFUF9DT05URU5UIGlzIHNldCB0byB0cnVlICovXG4gICAgICBpZiAoS0VFUF9DT05URU5UKSB7XG4gICAgICAgIEFMTE9XRURfVEFHU1snI3RleHQnXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsnaHRtbCcsICdoZWFkJywgJ2JvZHknXSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCB0Ym9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSB0YWJsZXMgYXJlIHBlcm1pdHRlZCwgc2VlICMyODYsICMzNjUgKi9cbiAgICAgIGlmIChBTExPV0VEX1RBR1MudGFibGUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ3Rib2R5J10pO1xuICAgICAgICBkZWxldGUgRk9SQklEX1RBR1MudGJvZHk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZUhUTUwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlSFRNTFwiIGhvb2suJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlU2NyaXB0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZVNjcmlwdFVSTFwiIGhvb2suJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdmVyd3JpdGUgZXhpc3RpbmcgVHJ1c3RlZFR5cGVzIHBvbGljeS5cbiAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZO1xuXG4gICAgICAgIC8vIFNpZ24gbG9jYWwgdmFyaWFibGVzIHJlcXVpcmVkIGJ5IGBzYW5pdGl6ZWAuXG4gICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVuaW5pdGlhbGl6ZWQgcG9saWN5LCBhdHRlbXB0IHRvIGluaXRpYWxpemUgdGhlIGludGVybmFsIGRvbXB1cmlmeSBwb2xpY3kuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBjdXJyZW50U2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGNyZWF0aW5nIHRoZSBpbnRlcm5hbCBwb2xpY3kgc3VjY2VlZGVkIHNpZ24gaW50ZXJuYWwgdmFyaWFibGVzLlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ICE9PSBudWxsICYmIHR5cGVvZiBlbXB0eUhUTUwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAgIC8vIE5vdCBhdmFpbGFibGUgaW4gSUU4LCBTYWZhcmkgNSwgZXRjLlxuICAgICAgaWYgKGZyZWV6ZSkge1xuICAgICAgICBmcmVlemUoY2ZnKTtcbiAgICAgIH1cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuICAgIGNvbnN0IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ21pJywgJ21vJywgJ21uJywgJ21zJywgJ210ZXh0J10pO1xuICAgIGNvbnN0IEhUTUxfSU5URUdSQVRJT05fUE9JTlRTID0gYWRkVG9TZXQoe30sIFsnZm9yZWlnbm9iamVjdCcsICdkZXNjJywgJ3RpdGxlJywgJ2Fubm90YXRpb24teG1sJ10pO1xuXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBhcmUgYWxsb3dlZCBpbiBib3RoIFNWRyBhbmQgSFRNTFxuICAgIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxuICAgIC8vIHNvIHRoYXQgdGhleSBkb24ndCBnZXQgZXJyb25lb3VzbHkgZGVsZXRlZCBmcm9tXG4gICAgLy8gSFRNTCBuYW1lc3BhY2UuXG4gICAgY29uc3QgQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyA9IGFkZFRvU2V0KHt9LCBbJ3RpdGxlJywgJ3N0eWxlJywgJ2ZvbnQnLCAnYScsICdzY3JpcHQnXSk7XG5cbiAgICAvKiBLZWVwIHRyYWNrIG9mIGFsbCBwb3NzaWJsZSBTVkcgYW5kIE1hdGhNTCB0YWdzXG4gICAgICogc28gdGhhdCB3ZSBjYW4gcGVyZm9ybSB0aGUgbmFtZXNwYWNlIGNoZWNrc1xuICAgICAqIGNvcnJlY3RseS4gKi9cbiAgICBjb25zdCBBTExfU1ZHX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5zdmdEaXNhbGxvd2VkXSk7XG4gICAgY29uc3QgQUxMX01BVEhNTF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5tYXRoTWwkMSwgLi4ubWF0aE1sRGlzYWxsb3dlZF0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBhIERPTSBlbGVtZW50IHdob3NlIG5hbWVzcGFjZSBpcyBiZWluZyBjaGVja2VkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgICAqICBuYW1lc3BhY2UgdGhhdCBhIHNwZWMtY29tcGxpYW50IHBhcnNlciB3b3VsZCBuZXZlclxuICAgICAqICByZXR1cm4uIFJldHVybiB0cnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgICAvLyBJbiBKU0RPTSwgaWYgd2UncmUgaW5zaWRlIHNoYWRvdyBET00sIHRoZW4gcGFyZW50Tm9kZVxuICAgICAgLy8gY2FuIGJlIG51bGwuIFdlIGp1c3Qgc2ltdWxhdGUgcGFyZW50IGluIHRoaXMgY2FzZS5cbiAgICAgIGlmICghcGFyZW50IHx8ICFwYXJlbnQudGFnTmFtZSkge1xuICAgICAgICBwYXJlbnQgPSB7XG4gICAgICAgICAgbmFtZXNwYWNlVVJJOiBOQU1FU1BBQ0UsXG4gICAgICAgICAgdGFnTmFtZTogJ3RlbXBsYXRlJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY29uc3QgdGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKGVsZW1lbnQudGFnTmFtZSk7XG4gICAgICBjb25zdCBwYXJlbnRUYWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UocGFyZW50LnRhZ05hbWUpO1xuICAgICAgaWYgKCFBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gU1ZHXG4gICAgICAgIC8vIGlzIHZpYSA8c3ZnPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2Zyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gTWF0aE1MIHRvIFNWRyBpcyB2aWFgXG4gICAgICAgIC8vIHN2ZyBpZiBwYXJlbnQgaXMgZWl0aGVyIDxhbm5vdGF0aW9uLXhtbD4gb3IgTWF0aE1MXG4gICAgICAgIC8vIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJyAmJiAocGFyZW50VGFnTmFtZSA9PT0gJ2Fubm90YXRpb24teG1sJyB8fCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIFNWR1xuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIFNWRyBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIE1hdGhNTFxuICAgICAgICAvLyBpcyB2aWEgPG1hdGg+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIE1hdGhNTCBpcyB2aWFcbiAgICAgICAgLy8gPG1hdGg+IGFuZCBIVE1MIGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCcgJiYgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gTWF0aE1MXG4gICAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gTWF0aE1MIG5hbWVzcGFjZS5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBIVE1MIGlzIHZpYVxuICAgICAgICAvLyBIVE1MIGludGVncmF0aW9uIHBvaW50cywgYW5kIGZyb20gTWF0aE1MIHRvIEhUTUxcbiAgICAgICAgLy8gaXMgdmlhIE1hdGhNTCB0ZXh0IGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSAmJiAhSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UgJiYgIU1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGRpc2FsbG93IHRhZ3MgdGhhdCBhcmUgc3BlY2lmaWMgZm9yIE1hdGhNTFxuICAgICAgICAvLyBvciBTVkcgYW5kIHNob3VsZCBuZXZlciBhcHBlYXIgaW4gSFRNTCBuYW1lc3BhY2VcbiAgICAgICAgcmV0dXJuICFBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0gJiYgKENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFNbdGFnTmFtZV0gfHwgIUFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBYSFRNTCBhbmQgWE1MIGRvY3VtZW50cyB0aGF0IHN1cHBvcnQgY3VzdG9tIG5hbWVzcGFjZXNcbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvZGUgc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXMgcGxhY2UgKHRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgc29tZWhvdyBnb3QgbmFtZXNwYWNlIHRoYXQgaXMgbm90XG4gICAgICAvLyBIVE1MLCBTVkcsIE1hdGhNTCBvciBhbGxvd2VkIHZpYSBBTExPV0VEX05BTUVTUEFDRVMpLlxuICAgICAgLy8gUmV0dXJuIGZhbHNlIGp1c3QgaW4gY2FzZS5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2ZvcmNlUmVtb3ZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfZm9yY2VSZW1vdmUgPSBmdW5jdGlvbiBfZm9yY2VSZW1vdmUobm9kZSkge1xuICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgIGVsZW1lbnQ6IG5vZGVcbiAgICAgIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLXJlbW92ZVxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIG5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbnVsbCxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICAgIC8vIFdlIHZvaWQgYXR0cmlidXRlIHZhbHVlcyBmb3IgdW5yZW1vdmFibGUgXCJpc1wiXCIgYXR0cmlidXRlc1xuICAgICAgaWYgKG5hbWUgPT09ICdpcycgJiYgIUFMTE9XRURfQVRUUltuYW1lXSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTSB8fCBSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF9mb3JjZVJlbW92ZShub2RlKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaW5pdERvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGRpcnR5IGEgc3RyaW5nIG9mIGRpcnR5IG1hcmt1cFxuICAgICAqIEByZXR1cm4ge0RvY3VtZW50fSBhIERPTSwgZmlsbGVkIHdpdGggdGhlIGRpcnR5IG1hcmt1cFxuICAgICAqL1xuICAgIGNvbnN0IF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICBsZXQgZG9jID0gbnVsbDtcbiAgICAgIGxldCBsZWFkaW5nV2hpdGVzcGFjZSA9IG51bGw7XG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gc3RyaW5nTWF0Y2goZGlydHksIC9eW1xcclxcblxcdCBdKy8pO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXTtcbiAgICAgIH1cbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBSb290IG9mIFhIVE1MIGRvYyBtdXN0IGNvbnRhaW4geG1sbnMgZGVjbGFyYXRpb24gKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIveGh0bWwxL25vcm1hdGl2ZS5odG1sI3N0cmljdClcbiAgICAgICAgZGlydHkgPSAnPGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+PGhlYWQ+PC9oZWFkPjxib2R5PicgKyBkaXJ0eSArICc8L2JvZHk+PC9odG1sPic7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qXG4gICAgICAgKiBVc2UgdGhlIERPTVBhcnNlciBBUEkgYnkgZGVmYXVsdCwgZmFsbGJhY2sgbGF0ZXIgaWYgbmVlZHMgYmVcbiAgICAgICAqIERPTVBhcnNlciBub3Qgd29yayBmb3Igc3ZnIHdoZW4gaGFzIG11bHRpcGxlIHJvb3QgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgUEFSU0VSX01FRElBX1RZUEUpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBVc2UgY3JlYXRlSFRNTERvY3VtZW50IGluIGNhc2UgRE9NUGFyc2VyIGlzIG5vdCBhdmFpbGFibGUgKi9cbiAgICAgIGlmICghZG9jIHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGRvYyA9IGltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KE5BTUVTUEFDRSwgJ3RlbXBsYXRlJywgbnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBJU19FTVBUWV9JTlBVVCA/IGVtcHR5SFRNTCA6IGRpcnR5UGF5bG9hZDtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIC8vIFN5bnRheCBlcnJvciBpZiBkaXJ0eVBheWxvYWQgaXMgaW52YWxpZCB4bWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLCBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gV0hPTEVfRE9DVU1FTlQgPyBkb2MuZG9jdW1lbnRFbGVtZW50IDogYm9keTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE5vZGVJdGVyYXRvciBvYmplY3QgdGhhdCB5b3UgY2FuIHVzZSB0byB0cmF2ZXJzZSBmaWx0ZXJlZCBsaXN0cyBvZiBub2RlcyBvciBlbGVtZW50cyBpbiBhIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IG9yIG5vZGUgdG8gc3RhcnQgdHJhdmVyc2luZyBvbi5cbiAgICAgKiBAcmV0dXJuIHtOb2RlSXRlcmF0b3J9IFRoZSBjcmVhdGVkIE5vZGVJdGVyYXRvclxuICAgICAqL1xuICAgIGNvbnN0IF9jcmVhdGVOb2RlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChyb290Lm93bmVyRG9jdW1lbnQgfHwgcm9vdCwgcm9vdCxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNDbG9iYmVyZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGVsbSBlbGVtZW50IHRvIGNoZWNrIGZvciBjbG9iYmVyaW5nIGF0dGFja3NcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Nsb2JiZXJlZCA9IGZ1bmN0aW9uIF9pc0Nsb2JiZXJlZChlbG0pIHtcbiAgICAgIHJldHVybiBlbG0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgJiYgKHR5cGVvZiBlbG0ubm9kZU5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQ2hpbGQgIT09ICdmdW5jdGlvbicgfHwgIShlbG0uYXR0cmlidXRlcyBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCkgfHwgdHlwZW9mIGVsbS5yZW1vdmVBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5zZXRBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5uYW1lc3BhY2VVUkkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0uaW5zZXJ0QmVmb3JlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uaGFzQ2hpbGROb2RlcyAhPT0gJ2Z1bmN0aW9uJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBET00gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG9iamVjdCBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2lzTm9kZSA9IGZ1bmN0aW9uIF9pc05vZGUob2JqZWN0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIE5vZGUgPT09ICdmdW5jdGlvbicgJiYgb2JqZWN0IGluc3RhbmNlb2YgTm9kZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2V4ZWN1dGVIb29rXG4gICAgICogRXhlY3V0ZSB1c2VyIGNvbmZpZ3VyYWJsZSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSBub2RlIHRvIHdvcmsgb24gd2l0aCB0aGUgaG9va1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGhvb2sgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGNvbnN0IF9leGVjdXRlSG9vayA9IGZ1bmN0aW9uIF9leGVjdXRlSG9vayhlbnRyeVBvaW50LCBjdXJyZW50Tm9kZSwgZGF0YSkge1xuICAgICAgaWYgKCFob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcnJheUZvckVhY2goaG9va3NbZW50cnlQb2ludF0sIGhvb2sgPT4ge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSB7XG4gICAgICBsZXQgY29udGVudCA9IG51bGw7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBOb3cgbGV0J3MgY2hlY2sgdGhlIGVsZW1lbnQncyB0eXBlIGFuZCBuYW1lICovXG4gICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG4gICAgICBpZiAoY3VycmVudE5vZGUuaGFzQ2hpbGROb2RlcygpICYmICFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBlbGVtZW50IGlmIGFueXRoaW5nIGZvcmJpZHMgaXRzIHByZXNlbmNlICovXG4gICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGEgY3VzdG9tIGVsZW1lbnQgdG8gaGFuZGxlICovXG4gICAgICAgIGlmICghRk9SQklEX1RBR1NbdGFnTmFtZV0gJiYgX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpKSB7XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh0YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEtlZXAgY29udGVudCBleGNlcHQgZm9yIGJhZC1saXN0ZWQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKEtFRVBfQ09OVEVOVCAmJiAhRk9SQklEX0NPTlRFTlRTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IGdldENoaWxkTm9kZXMoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICAgICAgaWYgKGNoaWxkTm9kZXMgJiYgcGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb3VudCA9IGNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNoaWxkQ291bnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUoY2hpbGROb2Rlc1tpXSwgdHJ1ZSksIGdldE5leHRTaWJsaW5nKGN1cnJlbnROb2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3aGV0aGVyIGVsZW1lbnQgaGFzIGEgdmFsaWQgbmFtZXNwYWNlICovXG4gICAgICBpZiAoY3VycmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmICFfY2hlY2tWYWxpZE5hbWVzcGFjZShjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE1ha2Ugc3VyZSB0aGF0IG9sZGVyIGJyb3dzZXJzIGRvbid0IGdldCBmYWxsYmFjay10YWcgbVhTUyAqL1xuICAgICAgaWYgKCh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8IHRhZ05hbWUgPT09ICdub2VtYmVkJyB8fCB0YWdOYW1lID09PSAnbm9mcmFtZXMnKSAmJiByZWdFeHBUZXN0KC88XFwvbm8oc2NyaXB0fGVtYmVkfGZyYW1lcykvaSwgY3VycmVudE5vZGUuaW5uZXJIVE1MKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZWxlbWVudCBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLyogR2V0IHRoZSBlbGVtZW50J3MgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBleHByLCAnICcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnRleHRDb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgICBlbGVtZW50OiBjdXJyZW50Tm9kZS5jbG9uZU5vZGUoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnJlbnROb2RlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIGNvbnN0IF9pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpIHtcbiAgICAgIC8qIE1ha2Ugc3VyZSBhdHRyaWJ1dGUgY2Fubm90IGNsb2JiZXIgKi9cbiAgICAgIGlmIChTQU5JVElaRV9ET00gJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykgJiYgKHZhbHVlIGluIGRvY3VtZW50IHx8IHZhbHVlIGluIGZvcm1FbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcbiAgICAgICAgICBYTUwtY29tcGF0aWJsZSAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN4bWwtY29tcGF0aWJsZSBhbmQgaHR0cDovL3d3dy53My5vcmcvVFIveG1sLyNkMGU4MDQpXG4gICAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuICAgICAgaWYgKEFMTE9XX0RBVEFfQVRUUiAmJiAhRk9SQklEX0FUVFJbbGNOYW1lXSAmJiByZWdFeHBUZXN0KERBVEFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoIUFMTE9XRURfQVRUUltsY05hbWVdIHx8IEZPUkJJRF9BVFRSW2xjTmFtZV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBGaXJzdCBjb25kaXRpb24gZG9lcyBhIHZlcnkgYmFzaWMgY2hlY2sgaWYgYSkgaXQncyBiYXNpY2FsbHkgYSB2YWxpZCBjdXN0b20gZWxlbWVudCB0YWduYW1lIEFORFxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAvLyBhbmQgYykgaWYgdGhlIGF0dHJpYnV0ZSBuYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrXG4gICAgICAgIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudChsY1RhZykgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgbGNUYWcpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayhsY1RhZykpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2ssIGxjTmFtZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKGxjTmFtZSkpIHx8XG4gICAgICAgIC8vIEFsdGVybmF0aXZlLCBzZWNvbmQgY29uZGl0aW9uIGNoZWNrcyBpZiBpdCdzIGFuIGBpc2AtYXR0cmlidXRlLCBBTkRcbiAgICAgICAgLy8gdGhlIHZhbHVlIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIGxjTmFtZSA9PT0gJ2lzJyAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdmFsdWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh2YWx1ZSkpKSA7IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBDaGVjayB2YWx1ZSBpcyBzYWZlLiBGaXJzdCwgaXMgYXR0ciBpbmVydD8gSWYgc28sIGlzIHNhZmUgKi9cbiAgICAgIH0gZWxzZSBpZiAoVVJJX1NBRkVfQVRUUklCVVRFU1tsY05hbWVdKSA7IGVsc2UgaWYgKHJlZ0V4cFRlc3QoSVNfQUxMT1dFRF9VUkkkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpKSA7IGVsc2UgaWYgKChsY05hbWUgPT09ICdzcmMnIHx8IGxjTmFtZSA9PT0gJ3hsaW5rOmhyZWYnIHx8IGxjTmFtZSA9PT0gJ2hyZWYnKSAmJiBsY1RhZyAhPT0gJ3NjcmlwdCcgJiYgc3RyaW5nSW5kZXhPZih2YWx1ZSwgJ2RhdGE6JykgPT09IDAgJiYgREFUQV9VUklfVEFHU1tsY1RhZ10pIDsgZWxzZSBpZiAoQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgJiYgIXJlZ0V4cFRlc3QoSVNfU0NSSVBUX09SX0RBVEEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudFxuICAgICAqIGNoZWNrcyBpZiBhdCBsZWFzdCBvbmUgZGFzaCBpcyBpbmNsdWRlZCBpbiB0YWdOYW1lLCBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGNoYXJcbiAgICAgKiBmb3IgbW9yZSBzb3BoaXN0aWNhdGVkIGNoZWNraW5nIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3ZhbGlkYXRlLWVsZW1lbnQtbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgbmFtZSBvZiB0aGUgdGFnIG9mIHRoZSBub2RlIHRvIHNhbml0aXplXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIG5hbWUgbWVldHMgdGhlIGJhc2ljIGNyaXRlcmlhIGZvciBhIGN1c3RvbSBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgY29uc3QgX2lzQmFzaWNDdXN0b21FbGVtZW50ID0gZnVuY3Rpb24gX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiB0YWdOYW1lICE9PSAnYW5ub3RhdGlvbi14bWwnICYmIHRhZ05hbWUuaW5kZXhPZignLScpID4gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXR0cmlidXRlc1xuICAgICAgfSA9IGN1cnJlbnROb2RlO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG4gICAgICBpZiAoIWF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaG9va0V2ZW50ID0ge1xuICAgICAgICBhdHRyTmFtZTogJycsXG4gICAgICAgIGF0dHJWYWx1ZTogJycsXG4gICAgICAgIGtlZXBBdHRyOiB0cnVlLFxuICAgICAgICBhbGxvd2VkQXR0cmlidXRlczogQUxMT1dFRF9BVFRSXG4gICAgICB9O1xuICAgICAgbGV0IGwgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcblxuICAgICAgLyogR28gYmFja3dhcmRzIG92ZXIgYWxsIGF0dHJpYnV0ZXM7IHNhZmVseSByZW1vdmUgYmFkIG9uZXMgKi9cbiAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIG5hbWVzcGFjZVVSSSxcbiAgICAgICAgICB2YWx1ZTogYXR0clZhbHVlXG4gICAgICAgIH0gPSBhdHRyO1xuICAgICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhuYW1lKTtcbiAgICAgICAgbGV0IHZhbHVlID0gbmFtZSA9PT0gJ3ZhbHVlJyA/IGF0dHJWYWx1ZSA6IHN0cmluZ1RyaW0oYXR0clZhbHVlKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmICghQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICYmIHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSBhdHRyaWJ1dGUgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBleHByLCAnICcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSXMgYHZhbHVlYCB2YWxpZCBmb3IgdGhpcyBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGNvbnN0IGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuICAgICAgICBpZiAoIV9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICAgKiBQcmVmaXggaWQgYW5kIG5hbWUgYXR0cmlidXRlcyB3aXRoIGB1c2VyLWNvbnRlbnQtYFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKFNBTklUSVpFX05BTUVEX1BST1BTICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGlzIHZhbHVlXG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAvLyBQcmVmaXggdGhlIHZhbHVlIGFuZCBsYXRlciByZS1jcmVhdGUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW5pdGl6ZWQgdmFsdWVcbiAgICAgICAgICB2YWx1ZSA9IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCArIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlIFRydXN0ZWQgVHlwZXMgKi9cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSA7IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZShsY1RhZywgbGNOYW1lKSkge1xuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkSFRNTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRTY3JpcHRVUkwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZVNjcmlwdFVSTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGludmFsaWQgZGF0YS0qIGF0dHJpYnV0ZSBzZXQgYnkgdHJ5LWNhdGNoaW5nIGl0ICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIEZhbGxiYWNrIHRvIHNldEF0dHJpYnV0ZSgpIGZvciBicm93c2VyLXVucmVjb2duaXplZCBuYW1lc3BhY2VzIGUuZy4gXCJ4LXNjaGVtYVwiLiAqL1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZVNoYWRvd0RPTSA9IGZ1bmN0aW9uIF9zYW5pdGl6ZVNoYWRvd0RPTShmcmFnbWVudCkge1xuICAgICAgbGV0IHNoYWRvd05vZGUgPSBudWxsO1xuICAgICAgY29uc3Qgc2hhZG93SXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICAgIHdoaWxlIChzaGFkb3dOb2RlID0gc2hhZG93SXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplU2hhZG93Tm9kZScsIHNoYWRvd05vZGUsIG51bGwpO1xuXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhzaGFkb3dOb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRGVlcCBzaGFkb3cgRE9NIGRldGVjdGVkICovXG4gICAgICAgIGlmIChzaGFkb3dOb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKHNoYWRvd05vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhzaGFkb3dOb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTYW5pdGl6ZVxuICAgICAqIFB1YmxpYyBtZXRob2QgcHJvdmlkaW5nIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlfSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5KSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGxldCBib2R5ID0gbnVsbDtcbiAgICAgIGxldCBpbXBvcnRlZE5vZGUgPSBudWxsO1xuICAgICAgbGV0IGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgIGxldCByZXR1cm5Ob2RlID0gbnVsbDtcbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXG4gICAgICAgIHRoZSB1c2VyIGhhcyByZXF1ZXN0ZWQgYSBET00gb2JqZWN0IHJhdGhlciB0aGFuIGEgc3RyaW5nICovXG4gICAgICBJU19FTVBUWV9JTlBVVCA9ICFkaXJ0eTtcbiAgICAgIGlmIChJU19FTVBUWV9JTlBVVCkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGlydHkgPSBkaXJ0eS50b1N0cmluZygpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ2RpcnR5IGlzIG5vdCBhIHN0cmluZywgYWJvcnRpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCd0b1N0cmluZyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBkaXJ0eSBIVE1MIGlmIERPTVB1cmlmeSBjYW5ub3QgcnVuICovXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFzc2lnbiBjb25maWcgdmFycyAqL1xuICAgICAgaWYgKCFTRVRfQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgfVxuXG4gICAgICAvKiBDbGVhbiB1cCByZW1vdmVkIGVsZW1lbnRzICovXG4gICAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gICAgICAvKiBDaGVjayBpZiBkaXJ0eSBpcyBjb3JyZWN0bHkgdHlwZWQgZm9yIElOX1BMQUNFICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIC8qIERvIHNvbWUgZWFybHkgcHJlLXNhbml0aXphdGlvbiB0byBhdm9pZCB1bnNhZmUgcm9vdCBub2RlcyAqL1xuICAgICAgICBpZiAoZGlydHkubm9kZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZGlydHkubm9kZU5hbWUpO1xuICAgICAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3Jvb3Qgbm9kZSBpcyBmb3JiaWRkZW4gYW5kIGNhbm5vdCBiZSBzYW5pdGl6ZWQgaW4tcGxhY2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlydHkgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxuICAgICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KCc8IS0tLS0+Jyk7XG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgIC8qIE5vZGUgaXMgYWxyZWFkeSBhIGJvZHksIHVzZSBhcyBpcyAqL1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogUkVUVVJOX1RSVVNURURfVFlQRSA/IGVtcHR5SFRNTCA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgY29uc3Qgbm9kZUl0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2hhZG93IERPTSBkZXRlY3RlZCwgc2FuaXRpemUgaXQgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKGN1cnJlbnROb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoY3VycmVudE5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBJZiB3ZSBzYW5pdGl6ZWQgYGRpcnR5YCBpbi1wbGFjZSwgcmV0dXJuIGl0LiAqL1xuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIHNhbml0aXplZCBzdHJpbmcgb3IgRE9NICovXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBjcmVhdGVEb2N1bWVudEZyYWdtZW50LmNhbGwoYm9keS5vd25lckRvY3VtZW50KTtcbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgICByZXR1cm5Ob2RlLmFwcGVuZENoaWxkKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIuc2hhZG93cm9vdCB8fCBBTExPV0VEX0FUVFIuc2hhZG93cm9vdG1vZGUpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybk5vZGU7XG4gICAgICB9XG4gICAgICBsZXQgc2VyaWFsaXplZEhUTUwgPSBXSE9MRV9ET0NVTUVOVCA/IGJvZHkub3V0ZXJIVE1MIDogYm9keS5pbm5lckhUTUw7XG5cbiAgICAgIC8qIFNlcmlhbGl6ZSBkb2N0eXBlIGlmIGFsbG93ZWQgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCAmJiBBTExPV0VEX1RBR1NbJyFkb2N0eXBlJ10gJiYgYm9keS5vd25lckRvY3VtZW50ICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgJiYgcmVnRXhwVGVzdChET0NUWVBFX05BTUUsIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gJzwhRE9DVFlQRSAnICsgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSArICc+XFxuJyArIHNlcmlhbGl6ZWRIVE1MO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChzZXJpYWxpemVkSFRNTCkgOiBzZXJpYWxpemVkSFRNTDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBzZXQgdGhlIGNvbmZpZ3VyYXRpb24gb25jZVxuICAgICAqIHNldENvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS5zZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XG4gICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZEhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGFkZCBET01QdXJpZnkgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rRnVuY3Rpb24gZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5hZGRIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQsIGhvb2tGdW5jdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBob29rRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmVtb3ZlZChwb3BwZWQpIGhvb2tcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9va3MgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2tzID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICBob29rc1tlbnRyeVBvaW50XSA9IFtdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVBbGxIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3NcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IHt9O1xuICAgIH07XG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuICB2YXIgcHVyaWZ5ID0gY3JlYXRlRE9NUHVyaWZ5KCk7XG5cbiAgcmV0dXJuIHB1cmlmeTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVyaWZ5LmpzLm1hcFxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwidmFyIHBsdWdpbnMgPSB7fTtcblxuLyoqXG4gKiBQbHVnaW4gTWFuYWdlciBjbGFzc1xuICogQGNsYXNzIFBsdWdpbk1hbmFnZXJcbiAqIEBuYW1lIFBsdWdpbk1hbmFnZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGx1Z2luTWFuYWdlcih0aGlzT2JqKSB7XG5cdC8qKlxuXHQgKiBBbGlhcyBvZiB0aGlzXG5cdCAqXG5cdCAqIEBwcml2YXRlXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcblx0dmFyIGJhc2UgPSB0aGlzO1xuXG5cdC8qKlxuXHQgKiBBcnJheSBvZiBhbGwgY3VycmVudGx5IHJlZ2lzdGVyZWQgcGx1Z2luc1xuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgcmVnaXN0ZXJlZFBsdWdpbnMgPSBbXTtcblxuXG5cdC8qKlxuXHQgKiBDaGFuZ2VzIGEgc2lnbmFscyBuYW1lIGZyb20gXCJuYW1lXCIgaW50byBcInNpZ25hbE5hbWVcIi5cblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSBzaWduYWxcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dmFyIGZvcm1hdFNpZ25hbE5hbWUgPSBmdW5jdGlvbiAoc2lnbmFsKSB7XG5cdFx0cmV0dXJuICdzaWduYWwnICsgc2lnbmFsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc2lnbmFsLnNsaWNlKDEpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxscyBoYW5kbGVycyBmb3IgYSBzaWduYWxcblx0ICpcblx0ICogQHNlZSBjYWxsKClcblx0ICogQHNlZSBjYWxsT25seUZpcnN0KClcblx0ICogQHBhcmFtICB7QXJyYXl9ICAgYXJnc1xuXHQgKiBAcGFyYW0gIHtib29sZWFufSByZXR1cm5BdEZpcnN0XG5cdCAqIEByZXR1cm4geyp9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgY2FsbEhhbmRsZXJzID0gZnVuY3Rpb24gKGFyZ3MsIHJldHVybkF0Rmlyc3QpIHtcblx0XHRhcmdzID0gW10uc2xpY2UuY2FsbChhcmdzKTtcblxuXHRcdHZhclx0aWR4LCByZXQsXG5cdFx0XHRzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKGFyZ3Muc2hpZnQoKSk7XG5cblx0XHRmb3IgKGlkeCA9IDA7IGlkeCA8IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDsgaWR4KyspIHtcblx0XHRcdGlmIChzaWduYWwgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaWR4XSkge1xuXHRcdFx0XHRyZXQgPSByZWdpc3RlcmVkUGx1Z2luc1tpZHhdW3NpZ25hbF0uYXBwbHkodGhpc09iaiwgYXJncyk7XG5cblx0XHRcdFx0aWYgKHJldHVybkF0Rmlyc3QpIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBDYWxscyBhbGwgaGFuZGxlcnMgZm9yIHRoZSBwYXNzZWQgc2lnbmFsXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgc2lnbmFsXG5cdCAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJnc1xuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY2FsbFxuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY2FsbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRjYWxsSGFuZGxlcnMoYXJndW1lbnRzLCBmYWxzZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGxzIHRoZSBmaXJzdCBoYW5kbGVyIGZvciBhIHNpZ25hbCwgYW5kIHJldHVybnMgdGhlXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgc2lnbmFsXG5cdCAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJnc1xuXHQgKiBAcmV0dXJuIHsqfSBUaGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIGhhbmRsZXJcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGNhbGxPbmx5Rmlyc3Rcblx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmNhbGxPbmx5Rmlyc3QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGNhbGxIYW5kbGVycyhhcmd1bWVudHMsIHRydWUpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgYSBzaWduYWwgaGFzIGEgaGFuZGxlclxuXHQgKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaGFzSGFuZGxlclxuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChzaWduYWwpIHtcblx0XHR2YXIgaSAgPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XG5cdFx0c2lnbmFsID0gZm9ybWF0U2lnbmFsTmFtZShzaWduYWwpO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpXSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiB0aGUgcGx1Z2luIGV4aXN0cyBpbiBwbHVnaW5zXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBleGlzdHNcblx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmV4aXN0cyA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblx0XHRpZiAocGx1Z2luIGluIHBsdWdpbnMpIHtcblx0XHRcdHBsdWdpbiA9IHBsdWdpbnNbcGx1Z2luXTtcblxuXHRcdFx0cmV0dXJuIHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0dHlwZW9mIHBsdWdpbi5wcm90b3R5cGUgPT09ICdvYmplY3QnO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZSBwYXNzZWQgcGx1Z2luIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IHBsdWdpblxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaXNSZWdpc3RlcmVkXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5pc1JlZ2lzdGVyZWQgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG5cdFx0aWYgKGJhc2UuZXhpc3RzKHBsdWdpbikpIHtcblx0XHRcdHZhciBpZHggPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XG5cblx0XHRcdHdoaWxlIChpZHgtLSkge1xuXHRcdFx0XHRpZiAocmVnaXN0ZXJlZFBsdWdpbnNbaWR4XSBpbnN0YW5jZW9mIHBsdWdpbnNbcGx1Z2luXSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZWdpc3RlcnMgYSBwbHVnaW4gdG8gcmVjZWl2ZSBzaWduYWxzXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSByZWdpc3RlclxuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UucmVnaXN0ZXIgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG5cdFx0aWYgKCFiYXNlLmV4aXN0cyhwbHVnaW4pIHx8IGJhc2UuaXNSZWdpc3RlcmVkKHBsdWdpbikpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRwbHVnaW4gPSBuZXcgcGx1Z2luc1twbHVnaW5dKCk7XG5cdFx0cmVnaXN0ZXJlZFBsdWdpbnMucHVzaChwbHVnaW4pO1xuXG5cdFx0aWYgKCdpbml0JyBpbiBwbHVnaW4pIHtcblx0XHRcdHBsdWdpbi5pbml0LmNhbGwodGhpc09iaik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblx0LyoqXG5cdCAqIERlcmVnaXN0ZXJzIGEgcGx1Z2luLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IHBsdWdpblxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZGVyZWdpc3RlclxuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZGVyZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblx0XHR2YXJcdHJlbW92ZWRQbHVnaW4sXG5cdFx0XHRwbHVnaW5JZHggPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGgsXG5cdFx0XHRyZW1vdmVkICAgPSBmYWxzZTtcblxuXHRcdGlmICghYmFzZS5pc1JlZ2lzdGVyZWQocGx1Z2luKSkge1xuXHRcdFx0cmV0dXJuIHJlbW92ZWQ7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKHBsdWdpbklkeC0tKSB7XG5cdFx0XHRpZiAocmVnaXN0ZXJlZFBsdWdpbnNbcGx1Z2luSWR4XSBpbnN0YW5jZW9mIHBsdWdpbnNbcGx1Z2luXSkge1xuXHRcdFx0XHRyZW1vdmVkUGx1Z2luID0gcmVnaXN0ZXJlZFBsdWdpbnMuc3BsaWNlKHBsdWdpbklkeCwgMSlbMF07XG5cdFx0XHRcdHJlbW92ZWQgICAgICAgPSB0cnVlO1xuXG5cdFx0XHRcdGlmICgnZGVzdHJveScgaW4gcmVtb3ZlZFBsdWdpbikge1xuXHRcdFx0XHRcdHJlbW92ZWRQbHVnaW4uZGVzdHJveS5jYWxsKHRoaXNPYmopO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlbW92ZWQ7XG5cdH07XG5cblx0LyoqXG5cdCAqIENsZWFycyBhbGwgcGx1Z2lucyBhbmQgcmVtb3ZlcyB0aGUgb3duZXIgcmVmZXJlbmNlLlxuXHQgKlxuXHQgKiBDYWxsaW5nIGFueSBmdW5jdGlvbnMgb24gdGhpcyBvYmplY3QgYWZ0ZXIgY2FsbGluZ1xuXHQgKiBkZXN0cm95IHdpbGwgY2F1c2UgYSBKUyBlcnJvci5cblx0ICpcblx0ICogQG5hbWUgZGVzdHJveVxuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgaSA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcblxuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGlmICgnZGVzdHJveScgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaV0pIHtcblx0XHRcdFx0cmVnaXN0ZXJlZFBsdWdpbnNbaV0uZGVzdHJveS5jYWxsKHRoaXNPYmopO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJlZ2lzdGVyZWRQbHVnaW5zID0gW107XG5cdFx0dGhpc09iaiAgICA9IG51bGw7XG5cdH07XG59XG5cblBsdWdpbk1hbmFnZXIucGx1Z2lucyA9IHBsdWdpbnM7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcblxuXG4vKipcbiAqIEdldHMgdGhlIHRleHQsIHN0YXJ0L2VuZCBub2RlIGFuZCBvZmZzZXQgZm9yXG4gKiBsZW5ndGggY2hhcnMgbGVmdCBvciByaWdodCBvZiB0aGUgcGFzc2VkIG5vZGVcbiAqIGF0IHRoZSBzcGVjaWZpZWQgb2Zmc2V0LlxuICpcbiAqIEBwYXJhbSAge05vZGV9ICBub2RlXG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBvZmZzZXRcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGlzTGVmdFxuICogQHBhcmFtICB7bnVtYmVyfSAgbGVuZ3RoXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgb3V0ZXJUZXh0ID0gZnVuY3Rpb24gKHJhbmdlLCBpc0xlZnQsIGxlbmd0aCkge1xuXHR2YXIgbm9kZVZhbHVlLCByZW1haW5pbmcsIHN0YXJ0LCBlbmQsIG5vZGUsXG5cdFx0dGV4dCA9ICcnLFxuXHRcdG5leHQgPSByYW5nZS5zdGFydENvbnRhaW5lcixcblx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcblxuXHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgbm9kZSBpcyBhIHBhcmFncmFwaCBhbmQgb2Zmc2V0XG5cdC8vIHJlZmVycyB0byB0aGUgaW5kZXggb2YgYSB0ZXh0IG5vZGUuXG5cdC8vIDMgPSB0ZXh0IG5vZGVcblx0aWYgKG5leHQgJiYgbmV4dC5ub2RlVHlwZSAhPT0gMykge1xuXHRcdG5leHQgPSBuZXh0LmNoaWxkTm9kZXNbb2Zmc2V0XTtcblx0XHRvZmZzZXQgPSAwO1xuXHR9XG5cblx0c3RhcnQgPSBlbmQgPSBvZmZzZXQ7XG5cblx0d2hpbGUgKGxlbmd0aCA+IHRleHQubGVuZ3RoICYmIG5leHQgJiYgbmV4dC5ub2RlVHlwZSA9PT0gMykge1xuXHRcdG5vZGVWYWx1ZSA9IG5leHQubm9kZVZhbHVlO1xuXHRcdHJlbWFpbmluZyA9IGxlbmd0aCAtIHRleHQubGVuZ3RoO1xuXG5cdFx0Ly8gSWYgbm90IHRoZSBmaXJzdCBub2RlLCBzdGFydCBhbmQgZW5kIHNob3VsZCBiZSBhdCB0aGVpclxuXHRcdC8vIG1heCB2YWx1ZXMgYXMgd2lsbCBiZSB1cGRhdGVkIHdoZW4gZ2V0dGluZyB0aGUgdGV4dFxuXHRcdGlmIChub2RlKSB7XG5cdFx0XHRlbmQgPSBub2RlVmFsdWUubGVuZ3RoO1xuXHRcdFx0c3RhcnQgPSAwO1xuXHRcdH1cblxuXHRcdG5vZGUgPSBuZXh0O1xuXG5cdFx0aWYgKGlzTGVmdCkge1xuXHRcdFx0c3RhcnQgPSBNYXRoLm1heChlbmQgLSByZW1haW5pbmcsIDApO1xuXHRcdFx0b2Zmc2V0ID0gc3RhcnQ7XG5cblx0XHRcdHRleHQgPSBub2RlVmFsdWUuc3Vic3RyKHN0YXJ0LCBlbmQgLSBzdGFydCkgKyB0ZXh0O1xuXHRcdFx0bmV4dCA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbmQgPSBNYXRoLm1pbihyZW1haW5pbmcsIG5vZGVWYWx1ZS5sZW5ndGgpO1xuXHRcdFx0b2Zmc2V0ID0gc3RhcnQgKyBlbmQ7XG5cblx0XHRcdHRleHQgKz0gbm9kZVZhbHVlLnN1YnN0cihzdGFydCwgZW5kKTtcblx0XHRcdG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bm9kZTogbm9kZSB8fCBuZXh0LFxuXHRcdG9mZnNldDogb2Zmc2V0LFxuXHRcdHRleHQ6IHRleHRcblx0fTtcbn07XG5cbi8qKlxuICogUmFuZ2UgaGVscGVyXG4gKlxuICogQGNsYXNzIFJhbmdlSGVscGVyXG4gKiBAbmFtZSBSYW5nZUhlbHBlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSYW5nZUhlbHBlcih3aW4sIGQsIHNhbml0aXplKSB7XG5cdHZhclx0X2NyZWF0ZU1hcmtlciwgX3ByZXBhcmVJbnB1dCxcblx0XHRkb2MgICAgICAgICAgPSBkIHx8IHdpbi5jb250ZW50RG9jdW1lbnQgfHwgd2luLmRvY3VtZW50LFxuXHRcdHN0YXJ0TWFya2VyICA9ICdzY2VkaXRvci1zdGFydC1tYXJrZXInLFxuXHRcdGVuZE1hcmtlciAgICA9ICdzY2VkaXRvci1lbmQtbWFya2VyJyxcblx0XHRiYXNlICAgICAgICAgPSB0aGlzO1xuXG5cdC8qKlxuXHQgKiBJbnNlcnRzIEhUTUwgaW50byB0aGUgY3VycmVudCByYW5nZSByZXBsYWNpbmcgYW55IHNlbGVjdGVkXG5cdCAqIHRleHQuXG5cdCAqXG5cdCAqIElmIGVuZEhUTUwgaXMgc3BlY2lmaWVkIHRoZSBzZWxlY3RlZCBjb250ZW50cyB3aWxsIGJlIHB1dCBiZXR3ZWVuXG5cdCAqIGh0bWwgYW5kIGVuZEhUTUwuIElmIHRoZXJlIGlzIG5vdGhpbmcgc2VsZWN0ZWQgaHRtbCBhbmQgZW5kSFRNTCBhcmVcblx0ICoganVzdCBjb25jYXRlbmF0ZSB0b2dldGhlci5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRIVE1MXVxuXHQgKiBAcmV0dXJuIEZhbHNlIG9uIGZhaWxcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGluc2VydEhUTUxcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5pbnNlcnRIVE1MID0gZnVuY3Rpb24gKGh0bWwsIGVuZEhUTUwpIHtcblx0XHR2YXJcdG5vZGUsIGRpdixcblx0XHRcdHJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRpZiAoIXJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGVuZEhUTUwpIHtcblx0XHRcdGh0bWwgKz0gYmFzZS5zZWxlY3RlZEh0bWwoKSArIGVuZEhUTUw7XG5cdFx0fVxuXG5cdFx0ZGl2ICAgICAgICAgICA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XG5cdFx0bm9kZSAgICAgICAgICA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0ZGl2LmlubmVySFRNTCA9IHNhbml0aXplKGh0bWwpO1xuXG5cdFx0d2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQobm9kZSwgZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdGJhc2UuaW5zZXJ0Tm9kZShub2RlKTtcblx0fTtcblxuXHQvKipcblx0ICogUHJlcGFyZXMgSFRNTCB0byBiZSBpbnNlcnRlZCBieSBhZGRpbmcgYSB6ZXJvIHdpZHRoIHNwYWNlXG5cdCAqIGlmIHRoZSBsYXN0IGNoaWxkIGlzIGVtcHR5IGFuZCBhZGRpbmcgdGhlIHJhbmdlIHN0YXJ0L2VuZFxuXHQgKiBtYXJrZXJzIHRvIHRoZSBsYXN0IGNoaWxkLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gbm9kZVxuXHQgKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW2VuZE5vZGVdXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXR1cm5IdG1sXVxuXHQgKiBAcmV0dXJuIHtOb2RlfHN0cmluZ31cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9wcmVwYXJlSW5wdXQgPSBmdW5jdGlvbiAobm9kZSwgZW5kTm9kZSwgcmV0dXJuSHRtbCkge1xuXHRcdHZhciBsYXN0Q2hpbGQsXG5cdFx0XHRmcmFnID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuXHRcdGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChlbmROb2RlKSB7XG5cdFx0XHRcdG5vZGUgKz0gYmFzZS5zZWxlY3RlZEh0bWwoKSArIGVuZE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGZyYWcgPSBkb20ucGFyc2VIVE1MKG5vZGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgbm9kZSk7XG5cblx0XHRcdGlmIChlbmROb2RlKSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBiYXNlLnNlbGVjdGVkUmFuZ2UoKS5leHRyYWN0Q29udGVudHMoKSk7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBlbmROb2RlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIShsYXN0Q2hpbGQgPSBmcmFnLmxhc3RDaGlsZCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR3aGlsZSAoIWRvbS5pc0lubGluZShsYXN0Q2hpbGQubGFzdENoaWxkLCB0cnVlKSkge1xuXHRcdFx0bGFzdENoaWxkID0gbGFzdENoaWxkLmxhc3RDaGlsZDtcblx0XHR9XG5cblx0XHRpZiAoZG9tLmNhbkhhdmVDaGlsZHJlbihsYXN0Q2hpbGQpKSB7XG5cdFx0XHQvLyBXZWJraXQgd29uJ3QgYWxsb3cgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQgaW5zaWRlIGFuXG5cdFx0XHQvLyBlbXB0eSB0YWcsIHNvIGFkZCBhIHplcm8gd2lkdGggc3BhY2UgdG8gaXQuXG5cdFx0XHRpZiAoIWxhc3RDaGlsZC5sYXN0Q2hpbGQpIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1xcdTIwMEInKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxhc3RDaGlsZCA9IGZyYWc7XG5cdFx0fVxuXG5cdFx0YmFzZS5yZW1vdmVNYXJrZXJzKCk7XG5cblx0XHQvLyBBcHBlbmQgbWFya3MgdG8gbGFzdCBjaGlsZCBzbyB3aGVuIHJlc3RvcmVkIGN1cnNvciB3aWxsIGJlIGluXG5cdFx0Ly8gdGhlIHJpZ2h0IHBsYWNlXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcikpO1xuXHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XG5cblx0XHRpZiAocmV0dXJuSHRtbCkge1xuXHRcdFx0dmFyIGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChkaXYsIGZyYWcpO1xuXG5cdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcblx0XHR9XG5cblx0XHRyZXR1cm4gZnJhZztcblx0fTtcblxuXHQvKipcblx0ICogVGhlIHNhbWUgYXMgaW5zZXJ0SFRNTCBleGNlcHQgd2l0aCBET00gbm9kZXMgaW5zdGVhZFxuXHQgKlxuXHQgKiA8c3Ryb25nPldhcm5pbmc6PC9zdHJvbmc+IHRoZSBub2RlcyBtdXN0IGJlbG9uZyB0byB0aGVcblx0ICogZG9jdW1lbnQgdGhleSBhcmUgYmVpbmcgaW5zZXJ0ZWQgaW50by4gU29tZSBicm93c2Vyc1xuXHQgKiB3aWxsIHRocm93IGV4Y2VwdGlvbnMgaWYgdGhleSBkb24ndC5cblx0ICpcblx0ICogUmV0dXJucyBib29sZWFuIGZhbHNlIG9uIGZhaWxcblx0ICpcblx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdCAqIEBwYXJhbSB7Tm9kZX0gZW5kTm9kZVxuXHQgKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpbnNlcnROb2RlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuaW5zZXJ0Tm9kZSA9IGZ1bmN0aW9uIChub2RlLCBlbmROb2RlKSB7XG5cdFx0dmFyXHRmaXJzdCwgbGFzdCxcblx0XHRcdGlucHV0ICA9IF9wcmVwYXJlSW5wdXQobm9kZSwgZW5kTm9kZSksXG5cdFx0XHRyYW5nZSAgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKSxcblx0XHRcdHBhcmVudCA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyLFxuXHRcdFx0ZW1wdHlOb2RlcyA9IFtdO1xuXG5cdFx0aWYgKCFpbnB1dCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlbW92ZUlmRW1wdHkobm9kZSkge1xuXHRcdFx0Ly8gT25seSByZW1vdmUgZW1wdHkgbm9kZSBpZiBpdCB3YXNuJ3QgYWxyZWFkeSBlbXB0eVxuXHRcdFx0aWYgKG5vZGUgJiYgZG9tLmlzRW1wdHkobm9kZSkgJiYgZW1wdHlOb2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkge1xuXHRcdFx0XHRkb20ucmVtb3ZlKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChyYW5nZS5zdGFydENvbnRhaW5lciAhPT0gcmFuZ2UuZW5kQ29udGFpbmVyKSB7XG5cdFx0XHR1dGlscy5lYWNoKHBhcmVudC5jaGlsZE5vZGVzLCBmdW5jdGlvbiAoXywgbm9kZSkge1xuXHRcdFx0XHRpZiAoZG9tLmlzRW1wdHkobm9kZSkpIHtcblx0XHRcdFx0XHRlbXB0eU5vZGVzLnB1c2gobm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRmaXJzdCA9IGlucHV0LmZpcnN0Q2hpbGQ7XG5cdFx0XHRsYXN0ID0gaW5wdXQubGFzdENoaWxkO1xuXHRcdH1cblxuXHRcdHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG5cblx0XHQvLyBGRiBhbGxvd3MgPGJyIC8+IHRvIGJlIHNlbGVjdGVkIGJ1dCBpbnNlcnRpbmcgYSBub2RlXG5cdFx0Ly8gaW50byA8YnIgLz4gd2lsbCBjYXVzZSBpdCBub3QgdG8gYmUgZGlzcGxheWVkIHNvIG11c3Rcblx0XHQvLyBpbnNlcnQgYmVmb3JlIHRoZSA8YnIgLz4gaW4gRkYuXG5cdFx0Ly8gMyA9IFRleHROb2RlXG5cdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDMgJiYgIWRvbS5jYW5IYXZlQ2hpbGRyZW4ocGFyZW50KSkge1xuXHRcdFx0ZG9tLmluc2VydEJlZm9yZShpbnB1dCwgcGFyZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmFuZ2UuaW5zZXJ0Tm9kZShpbnB1dCk7XG5cblx0XHRcdC8vIElmIGEgbm9kZSB3YXMgc3BsaXQgb3IgaXRzIGNvbnRlbnRzIGRlbGV0ZWQsIHJlbW92ZSBhbnkgcmVzdWx0aW5nXG5cdFx0XHQvLyBlbXB0eSB0YWdzLiBGb3IgZXhhbXBsZTpcblx0XHRcdC8vIDxwPnx0ZXN0PC9wPjxkaXY+dGVzdHw8L2Rpdj5cblx0XHRcdC8vIFdoZW4gZGVsZXRlQ29udGVudHMgY291bGQgYmVjb21lOlxuXHRcdFx0Ly8gPHA+PC9wPnw8ZGl2PjwvZGl2PlxuXHRcdFx0Ly8gU28gcmVtb3ZlIHRoZSBlbXB0eSBvbmVzXG5cdFx0XHRyZW1vdmVJZkVtcHR5KGZpcnN0ICYmIGZpcnN0LnByZXZpb3VzU2libGluZyk7XG5cdFx0XHRyZW1vdmVJZkVtcHR5KGxhc3QgJiYgbGFzdC5uZXh0U2libGluZyk7XG5cdFx0fVxuXG5cdFx0YmFzZS5yZXN0b3JlUmFuZ2UoKTtcblx0fTtcblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBzZWxlY3RlZCBSYW5nZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtSYW5nZX1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGNsb25lU2VsZWN0ZWRcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5jbG9uZVNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciByYW5nZSA9IGJhc2Uuc2VsZWN0ZWRSYW5nZSgpO1xuXG5cdFx0aWYgKHJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gcmFuZ2UuY2xvbmVSYW5nZSgpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogR2V0cyB0aGUgc2VsZWN0ZWQgUmFuZ2Vcblx0ICpcblx0ICogQHJldHVybiB7UmFuZ2V9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzZWxlY3RlZFJhbmdlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2Uuc2VsZWN0ZWRSYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXJcdHJhbmdlLCBmaXJzdENoaWxkLFxuXHRcdFx0c2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXG5cdFx0aWYgKCFzZWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXaGVuIGNyZWF0aW5nIGEgbmV3IHJhbmdlLCBzZXQgdGhlIHN0YXJ0IHRvIHRoZSBmaXJzdCBjaGlsZFxuXHRcdC8vIGVsZW1lbnQgb2YgdGhlIGJvZHkgZWxlbWVudCB0byBhdm9pZCBlcnJvcnMgaW4gRkYuXG5cdFx0aWYgKHNlbC5yYW5nZUNvdW50IDw9IDApIHtcblx0XHRcdGZpcnN0Q2hpbGQgPSBkb2MuYm9keTtcblx0XHRcdHdoaWxlIChmaXJzdENoaWxkLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0Zmlyc3RDaGlsZCA9IGZpcnN0Q2hpbGQuZmlyc3RDaGlsZDtcblx0XHRcdH1cblxuXHRcdFx0cmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcblx0XHRcdC8vIE11c3QgYmUgc2V0U3RhcnRCZWZvcmUgb3RoZXJ3aXNlIGl0IGNhbiBjYXVzZSBpbmZpbml0ZVxuXHRcdFx0Ly8gbG9vcHMgd2l0aCBsaXN0cyBpbiBXZWJLaXQuIFNlZSBpc3N1ZSA0NDJcblx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKGZpcnN0Q2hpbGQpO1xuXG5cdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuXHRcdH1cblxuXHRcdGlmIChzZWwucmFuZ2VDb3VudCA+IDApIHtcblx0XHRcdHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJhbmdlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGlvblxuXHQgKlxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaGFzU2VsZWN0aW9uXG5cdCAqIEBzaW5jZSAxLjQuNFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmhhc1NlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXJcdHNlbCA9IHdpbi5nZXRTZWxlY3Rpb24oKTtcblxuXHRcdHJldHVybiBzZWwgJiYgc2VsLnJhbmdlQ291bnQgPiAwO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgSFRNTFxuXHQgKlxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzZWxlY3RlZEh0bWxcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5zZWxlY3RlZEh0bWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyXHRkaXYsXG5cdFx0XHRyYW5nZSA9IGJhc2Uuc2VsZWN0ZWRSYW5nZSgpO1xuXG5cdFx0aWYgKHJhbmdlKSB7XG5cdFx0XHRkaXYgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCBkb2MpO1xuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgcmFuZ2UuY2xvbmVDb250ZW50cygpKTtcblxuXHRcdFx0cmV0dXJuIGRpdi5pbm5lckhUTUw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICcnO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBwYXJlbnQgbm9kZSBvZiB0aGUgc2VsZWN0ZWQgY29udGVudHMgaW4gdGhlIHJhbmdlXG5cdCAqXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgcGFyZW50Tm9kZVxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnBhcmVudE5vZGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcblx0ICogY29udGVudHMgb2YgdGhlIHJhbmdlLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGdldEZpcnN0QmxvY2tQYXJlbnRcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0LyoqXG5cdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcblx0ICogY29udGVudHMgb2YgdGhlIHJhbmdlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IFtuXSBUaGUgZWxlbWVudCB0byBnZXQgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBmcm9tXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudF4yXG5cdCAqIEBzaW5jZSAxLjQuMVxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmdldEZpcnN0QmxvY2tQYXJlbnQgPSBmdW5jdGlvbiAobm9kZSkge1xuXHRcdHZhciBmdW5jID0gZnVuY3Rpb24gKGVsbSkge1xuXHRcdFx0aWYgKCFkb20uaXNJbmxpbmUoZWxtLCB0cnVlKSkge1xuXHRcdFx0XHRyZXR1cm4gZWxtO1xuXHRcdFx0fVxuXG5cdFx0XHRlbG0gPSBlbG0gPyBlbG0ucGFyZW50Tm9kZSA6IG51bGw7XG5cblx0XHRcdHJldHVybiBlbG0gPyBmdW5jKGVsbSkgOiBlbG07XG5cdFx0fTtcblxuXHRcdHJldHVybiBmdW5jKG5vZGUgfHwgYmFzZS5wYXJlbnROb2RlKCkpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBJbnNlcnRzIGEgbm9kZSBhdCBlaXRoZXIgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0ICpcblx0ICogQHBhcmFtIHtCb29sfSBzdGFydFxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGluc2VydE5vZGVBdFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmluc2VydE5vZGVBdCA9IGZ1bmN0aW9uIChzdGFydCwgbm9kZSkge1xuXHRcdHZhclx0Y3VycmVudFJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCksXG5cdFx0XHRyYW5nZSAgICAgICAgPSBiYXNlLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyYW5nZS5jb2xsYXBzZShzdGFydCk7XG5cdFx0cmFuZ2UuaW5zZXJ0Tm9kZShub2RlKTtcblxuXHRcdC8vIFJlc2VsZWN0IHRoZSBjdXJyZW50IHJhbmdlLlxuXHRcdC8vIEZpeGVzIGlzc3VlIHdpdGggQ2hyb21lIGxvc2luZyB0aGUgc2VsZWN0aW9uLiBJc3N1ZSM4MlxuXHRcdGJhc2Uuc2VsZWN0UmFuZ2UoY3VycmVudFJhbmdlKTtcblx0fTtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG1hcmtlciBub2RlXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuXHQgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRfY3JlYXRlTWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0YmFzZS5yZW1vdmVNYXJrZXIoaWQpO1xuXG5cdFx0dmFyIG1hcmtlciAgPSBkb20uY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcblx0XHRcdGlkOiBpZCxcblx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLXNlbGVjdGlvbiBzY2VkaXRvci1pZ25vcmUnLFxuXHRcdFx0c3R5bGU6ICdkaXNwbGF5Om5vbmU7bGluZS1oZWlnaHQ6MCdcblx0XHR9LCBkb2MpO1xuXG5cdFx0bWFya2VyLmlubmVySFRNTCA9ICcgJztcblxuXHRcdHJldHVybiBtYXJrZXI7XG5cdH07XG5cblx0LyoqXG5cdCAqIEluc2VydHMgc3RhcnQvZW5kIG1hcmtlcnMgZm9yIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHQgKiB3aGljaCBjYW4gYmUgdXNlZCBieSByZXN0b3JlUmFuZ2UgdG8gcmUtc2VsZWN0IHRoZVxuXHQgKiByYW5nZS5cblx0ICpcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaW5zZXJ0TWFya2Vyc1xuXHQgKi9cblx0YmFzZS5pbnNlcnRNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0Y3VycmVudFJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cdFx0dmFyIHN0YXJ0Tm9kZSA9IF9jcmVhdGVNYXJrZXIoc3RhcnRNYXJrZXIpO1xuXG5cdFx0YmFzZS5yZW1vdmVNYXJrZXJzKCk7XG5cdFx0YmFzZS5pbnNlcnROb2RlQXQodHJ1ZSwgc3RhcnROb2RlKTtcblxuXHRcdC8vIEZpeGVzIGlzc3VlIHdpdGggZW5kIG1hcmtlciBzb21ldGltZXMgYmVpbmcgcGxhY2VkIGJlZm9yZVxuXHRcdC8vIHRoZSBzdGFydCBtYXJrZXIgd2hlbiB0aGUgcmFuZ2UgaXMgY29sbGFwc2VkLlxuXHRcdGlmIChjdXJyZW50UmFuZ2UgJiYgY3VycmVudFJhbmdlLmNvbGxhcHNlZCkge1xuXHRcdFx0c3RhcnROb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuXHRcdFx0XHRfY3JlYXRlTWFya2VyKGVuZE1hcmtlciksIHN0YXJ0Tm9kZS5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJhc2UuaW5zZXJ0Tm9kZUF0KGZhbHNlLCBfY3JlYXRlTWFya2VyKGVuZE1hcmtlcikpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogR2V0cyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaWRcblx0ICogQHJldHVybiB7Tm9kZX1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGdldE1hcmtlclxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmdldE1hcmtlciA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdHJldHVybiBkb2MuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIHRoZSBtYXJrZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElEXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgcmVtb3ZlTWFya2VyXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0dmFyIG1hcmtlciA9IGJhc2UuZ2V0TWFya2VyKGlkKTtcblxuXHRcdGlmIChtYXJrZXIpIHtcblx0XHRcdGRvbS5yZW1vdmUobWFya2VyKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgdGhlIHN0YXJ0L2VuZCBtYXJrZXJzXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSByZW1vdmVNYXJrZXJzXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uICgpIHtcblx0XHRiYXNlLnJlbW92ZU1hcmtlcihzdGFydE1hcmtlcik7XG5cdFx0YmFzZS5yZW1vdmVNYXJrZXIoZW5kTWFya2VyKTtcblx0fTtcblxuXHQvKipcblx0ICogU2F2ZXMgdGhlIGN1cnJlbnQgcmFuZ2UgbG9jYXRpb24uIEFsaWFzIG9mIGluc2VydE1hcmtlcnMoKVxuXHQgKlxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgc2F2ZVJhZ2Vcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5zYXZlUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0YmFzZS5pbnNlcnRNYXJrZXJzKCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNlbGVjdCB0aGUgc3BlY2lmaWVkIHJhbmdlXG5cdCAqXG5cdCAqIEBwYXJhbSB7UmFuZ2V9IHJhbmdlXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzZWxlY3RSYW5nZVxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNlbGVjdFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0dmFyIGxhc3RDaGlsZDtcblx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXHRcdHZhciBjb250YWluZXIgPSByYW5nZS5lbmRDb250YWluZXI7XG5cblx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcblx0XHQvLyBjaGlsZCBvZiB0aGUgcGFyZW50LiBJbiBGaXJlZm94IHRoaXMgY2F1c2VzIGEgbGluZSBicmVha1xuXHRcdC8vIHRvIG9jY3VyIHdoZW4gc29tZXRoaW5nIGlzIHR5cGVkLiBTZWUgaXNzdWUgIzMyMVxuXHRcdGlmIChyYW5nZS5jb2xsYXBzZWQgJiYgY29udGFpbmVyICYmXG5cdFx0XHQhZG9tLmlzSW5saW5lKGNvbnRhaW5lciwgdHJ1ZSkpIHtcblxuXHRcdFx0bGFzdENoaWxkID0gY29udGFpbmVyLmxhc3RDaGlsZDtcblx0XHRcdHdoaWxlIChsYXN0Q2hpbGQgJiYgZG9tLmlzKGxhc3RDaGlsZCwgJy5zY2VkaXRvci1pZ25vcmUnKSkge1xuXHRcdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQucHJldmlvdXNTaWJsaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG9tLmlzKGxhc3RDaGlsZCwgJ2JyJykpIHtcblx0XHRcdFx0dmFyIHJuZyA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuXHRcdFx0XHRybmcuc2V0RW5kQWZ0ZXIobGFzdENoaWxkKTtcblx0XHRcdFx0cm5nLmNvbGxhcHNlKGZhbHNlKTtcblxuXHRcdFx0XHRpZiAoYmFzZS5jb21wYXJlKHJhbmdlLCBybmcpKSB7XG5cdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUobGFzdENoaWxkKTtcblx0XHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChzZWwpIHtcblx0XHRcdGJhc2UuY2xlYXIoKTtcblx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXN0b3JlcyB0aGUgbGFzdCByYW5nZSBzYXZlZCBieSBzYXZlUmFuZ2UoKSBvciBpbnNlcnRNYXJrZXJzKClcblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlc3RvcmVSYW5nZVxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnJlc3RvcmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXJcdGlzQ29sbGFwc2VkLFxuXHRcdFx0cmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKSxcblx0XHRcdHN0YXJ0ID0gYmFzZS5nZXRNYXJrZXIoc3RhcnRNYXJrZXIpLFxuXHRcdFx0ZW5kICAgPSBiYXNlLmdldE1hcmtlcihlbmRNYXJrZXIpO1xuXG5cdFx0aWYgKCFzdGFydCB8fCAhZW5kIHx8ICFyYW5nZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlzQ29sbGFwc2VkID0gc3RhcnQubmV4dFNpYmxpbmcgPT09IGVuZDtcblxuXHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoc3RhcnQpO1xuXHRcdHJhbmdlLnNldEVuZEFmdGVyKGVuZCk7XG5cblx0XHRpZiAoaXNDb2xsYXBzZWQpIHtcblx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuXHRcdH1cblxuXHRcdGJhc2Uuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHRcdGJhc2UucmVtb3ZlTWFya2VycygpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTZWxlY3RzIHRoZSB0ZXh0IGxlZnQgYW5kIHJpZ2h0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gbGVmdFxuXHQgKiBAcGFyYW0ge251bWJlcn0gcmlnaHRcblx0ICogQHNpbmNlIDEuNC4zXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzZWxlY3RPdXRlclRleHRcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5zZWxlY3RPdXRlclRleHQgPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcblx0XHR2YXIgc3RhcnQsIGVuZCxcblx0XHRcdHJhbmdlID0gYmFzZS5jbG9uZVNlbGVjdGVkKCk7XG5cblx0XHRpZiAoIXJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuXG5cdFx0c3RhcnQgPSBvdXRlclRleHQocmFuZ2UsIHRydWUsIGxlZnQpO1xuXHRcdGVuZCA9IG91dGVyVGV4dChyYW5nZSwgZmFsc2UsIHJpZ2h0KTtcblxuXHRcdHJhbmdlLnNldFN0YXJ0KHN0YXJ0Lm5vZGUsIHN0YXJ0Lm9mZnNldCk7XG5cdFx0cmFuZ2Uuc2V0RW5kKGVuZC5ub2RlLCBlbmQub2Zmc2V0KTtcblxuXHRcdGJhc2Uuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSB0ZXh0IGxlZnQgb3IgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gYmVmb3JlXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcblx0ICogQHJldHVybiB7c3RyaW5nfVxuXHQgKiBAc2luY2UgMS40LjNcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmdldE91dGVyVGV4dCA9IGZ1bmN0aW9uIChiZWZvcmUsIGxlbmd0aCkge1xuXHRcdHZhclx0cmFuZ2UgPSBiYXNlLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRyYW5nZS5jb2xsYXBzZSghYmVmb3JlKTtcblxuXHRcdHJldHVybiBvdXRlclRleHQocmFuZ2UsIGJlZm9yZSwgbGVuZ3RoKS50ZXh0O1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZXBsYWNlcyBrZXl3b3JkcyB3aXRoIHZhbHVlcyBiYXNlZCBvbiB0aGUgY3VycmVudCBjYXJldCBwb3NpdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge0FycmF5fSAgIGtleXdvcmRzXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5jbHVkZUFmdGVyICAgICAgSWYgdG8gaW5jbHVkZSB0aGUgdGV4dCBhZnRlciB0aGVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50IGNhcmV0IHBvc2l0aW9uIG9yIGp1c3Rcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0IGJlZm9yZVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGtleXdvcmRzU29ydGVkICAgIElmIHRoZSBrZXl3b3JkcyBhcnJheSBpcyBwcmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgc2hvcnRlc3QgdG8gbG9uZ2VzdFxuXHQgKiBAcGFyYW0ge251bWJlcn0gIGxvbmdlc3RLZXl3b3JkICAgIExlbmd0aCBvZiB0aGUgbG9uZ2VzdCBrZXl3b3JkXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gcmVxdWlyZVdoaXRlc3BhY2UgSWYgdGhlIGtleSBtdXN0IGJlIHN1cnJvdW5kZWRcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieSB3aGl0ZXNwYWNlXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSAga2V5cHJlc3NDaGFyICAgICAgSWYgdGhpcyBpcyBiZWluZyBjYWxsZWQgZnJvbVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEga2V5cHJlc3MgZXZlbnQsIHRoaXMgc2hvdWxkIGJlXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0IHRvIHRoZSBwcmVzc2VkIGNoYXJhY3RlclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgcmVwbGFjZUtleXdvcmRcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcblx0YmFzZS5yZXBsYWNlS2V5d29yZCA9IGZ1bmN0aW9uIChcblx0XHRrZXl3b3Jkcyxcblx0XHRpbmNsdWRlQWZ0ZXIsXG5cdFx0a2V5d29yZHNTb3J0ZWQsXG5cdFx0bG9uZ2VzdEtleXdvcmQsXG5cdFx0cmVxdWlyZVdoaXRlc3BhY2UsXG5cdFx0a2V5cHJlc3NDaGFyXG5cdCkge1xuXHRcdGlmICgha2V5d29yZHNTb3J0ZWQpIHtcblx0XHRcdGtleXdvcmRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR2YXIgb3V0ZXJUZXh0LCBtYXRjaCwgbWF0Y2hQb3MsIHN0YXJ0SW5kZXgsXG5cdFx0XHRsZWZ0TGVuLCBjaGFyc0xlZnQsIGtleXdvcmQsIGtleXdvcmRMZW4sXG5cdFx0XHR3aGl0ZXNwYWNlUmVnZXggPSAnKF58W1xcXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKScsXG5cdFx0XHRrZXl3b3JkSWR4ICAgICAgPSBrZXl3b3Jkcy5sZW5ndGgsXG5cdFx0XHR3aGl0ZXNwYWNlTGVuICAgPSByZXF1aXJlV2hpdGVzcGFjZSA/IDEgOiAwLFxuXHRcdFx0bWF4S2V5TGVuICAgICAgID0gbG9uZ2VzdEtleXdvcmQgfHxcblx0XHRcdFx0a2V5d29yZHNba2V5d29yZElkeCAtIDFdWzBdLmxlbmd0aDtcblxuXHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xuXHRcdFx0bWF4S2V5TGVuKys7XG5cdFx0fVxuXG5cdFx0a2V5cHJlc3NDaGFyID0ga2V5cHJlc3NDaGFyIHx8ICcnO1xuXHRcdG91dGVyVGV4dCAgICA9IGJhc2UuZ2V0T3V0ZXJUZXh0KHRydWUsIG1heEtleUxlbik7XG5cdFx0bGVmdExlbiAgICAgID0gb3V0ZXJUZXh0Lmxlbmd0aDtcblx0XHRvdXRlclRleHQgICArPSBrZXlwcmVzc0NoYXI7XG5cblx0XHRpZiAoaW5jbHVkZUFmdGVyKSB7XG5cdFx0XHRvdXRlclRleHQgKz0gYmFzZS5nZXRPdXRlclRleHQoZmFsc2UsIG1heEtleUxlbik7XG5cdFx0fVxuXG5cdFx0d2hpbGUgKGtleXdvcmRJZHgtLSkge1xuXHRcdFx0a2V5d29yZCAgICA9IGtleXdvcmRzW2tleXdvcmRJZHhdWzBdO1xuXHRcdFx0a2V5d29yZExlbiA9IGtleXdvcmQubGVuZ3RoO1xuXHRcdFx0c3RhcnRJbmRleCA9IE1hdGgubWF4KDAsIGxlZnRMZW4gLSBrZXl3b3JkTGVuIC0gd2hpdGVzcGFjZUxlbik7XG5cdFx0XHRtYXRjaFBvcyAgID0gLTE7XG5cblx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xuXHRcdFx0XHRtYXRjaCA9IG91dGVyVGV4dFxuXHRcdFx0XHRcdC5zdWJzdHIoc3RhcnRJbmRleClcblx0XHRcdFx0XHQubWF0Y2gobmV3IFJlZ0V4cCh3aGl0ZXNwYWNlUmVnZXggK1xuXHRcdFx0XHRcdFx0ZXNjYXBlLnJlZ2V4KGtleXdvcmQpICsgd2hpdGVzcGFjZVJlZ2V4KSk7XG5cblx0XHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdFx0Ly8gQWRkIHRoZSBsZW5ndGggb2YgdGhlIHRleHQgdGhhdCB3YXMgcmVtb3ZlZCBieVxuXHRcdFx0XHRcdC8vIHN1YnN0cigpIGFuZCBhbHNvIGFkZCAxIGZvciB0aGUgd2hpdGVzcGFjZVxuXHRcdFx0XHRcdG1hdGNoUG9zID0gbWF0Y2guaW5kZXggKyBzdGFydEluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtYXRjaFBvcyA9IG91dGVyVGV4dC5pbmRleE9mKGtleXdvcmQsIHN0YXJ0SW5kZXgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobWF0Y2hQb3MgPiAtMSkge1xuXHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIG1hdGNoIGlzIGJldHdlZW4gYmVmb3JlIGFuZFxuXHRcdFx0XHQvLyBhZnRlciwgbm90IGp1c3QgZW50aXJlbHkgaW4gb25lIHNpZGUgb3IgdGhlIG90aGVyXG5cdFx0XHRcdGlmIChtYXRjaFBvcyA8PSBsZWZ0TGVuICYmXG5cdFx0XHRcdFx0bWF0Y2hQb3MgKyBrZXl3b3JkTGVuICsgd2hpdGVzcGFjZUxlbiA+PSBsZWZ0TGVuKSB7XG5cdFx0XHRcdFx0Y2hhcnNMZWZ0ID0gbGVmdExlbiAtIG1hdGNoUG9zO1xuXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIGtleXByZXNzIGNoYXIgaXMgd2hpdGUgc3BhY2UgdGhlbiBpdCBzaG91bGRcblx0XHRcdFx0XHQvLyBub3QgYmUgcmVwbGFjZWQsIG9ubHkgY2hhcnMgdGhhdCBhcmUgcGFydCBvZiB0aGVcblx0XHRcdFx0XHQvLyBrZXkgc2hvdWxkIGJlIHJlcGxhY2VkLlxuXHRcdFx0XHRcdGJhc2Uuc2VsZWN0T3V0ZXJUZXh0KFxuXHRcdFx0XHRcdFx0Y2hhcnNMZWZ0LFxuXHRcdFx0XHRcdFx0a2V5d29yZExlbiAtIGNoYXJzTGVmdCAtXG5cdFx0XHRcdFx0XHRcdCgvXlxcUy8udGVzdChrZXlwcmVzc0NoYXIpID8gMSA6IDApXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGJhc2UuaW5zZXJ0SFRNTChrZXl3b3Jkc1trZXl3b3JkSWR4XVsxXSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIENvbXBhcmVzIHR3byByYW5nZXMuXG5cdCAqXG5cdCAqIElmIHJhbmdlQiBpcyB1bmRlZmluZWQgaXQgd2lsbCBiZSBzZXQgdG9cblx0ICogdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmFuZ2Vcblx0ICpcblx0ICogQHBhcmFtICB7UmFuZ2V9IHJuZ0Fcblx0ICogQHBhcmFtICB7UmFuZ2V9IFtybmdCXVxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY29tcGFyZVxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmNvbXBhcmUgPSBmdW5jdGlvbiAocm5nQSwgcm5nQikge1xuXHRcdGlmICghcm5nQikge1xuXHRcdFx0cm5nQiA9IGJhc2Uuc2VsZWN0ZWRSYW5nZSgpO1xuXHRcdH1cblxuXHRcdGlmICghcm5nQSB8fCAhcm5nQikge1xuXHRcdFx0cmV0dXJuICFybmdBICYmICFybmdCO1xuXHRcdH1cblxuXHRcdHJldHVybiBybmdBLmNvbXBhcmVCb3VuZGFyeVBvaW50cyhSYW5nZS5FTkRfVE9fRU5ELCBybmdCKSA9PT0gMCAmJlxuXHRcdFx0cm5nQS5jb21wYXJlQm91bmRhcnlQb2ludHMoUmFuZ2UuU1RBUlRfVE9fU1RBUlQsIHJuZ0IpID09PSAwO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFueSBjdXJyZW50IHNlbGVjdGlvblxuXHQgKlxuXHQgKiBAc2luY2UgMS40LjZcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGNsZWFyXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHNlbCA9IHdpbi5nZXRTZWxlY3Rpb24oKTtcblxuXHRcdGlmIChzZWwpIHtcblx0XHRcdGlmIChzZWwucmVtb3ZlQWxsUmFuZ2VzKSB7XG5cdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcblx0XHRcdH0gZWxzZSBpZiAoc2VsLmVtcHR5KSB7XG5cdFx0XHRcdHNlbC5lbXB0eSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cbiIsIu+7v2ltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9kZWZhdWx0Q29tbWFuZHMuanMnO1xyXG5pbXBvcnQgUGx1Z2luTWFuYWdlciBmcm9tICcuL1BsdWdpbk1hbmFnZXIuanMnO1xyXG5pbXBvcnQgUmFuZ2VIZWxwZXIgZnJvbSAnLi9SYW5nZUhlbHBlci5qcyc7XHJcbmltcG9ydCBfdG1wbCBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZW1vdGljb25zIGZyb20gJy4vZW1vdGljb25zLmpzJztcclxuaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknO1xyXG5cclxudmFyIGdsb2JhbFdpbiAgPSB3aW5kb3c7XHJcbnZhciBnbG9iYWxEb2MgID0gZG9jdW1lbnQ7XHJcblxyXG52YXIgSU1BR0VfTUlNRV9SRUdFWCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblxyXG4vKipcclxuICogV3JhcCBpbmxpbmVzIHRoYXQgYXJlIGluIHRoZSByb290IGluIHBhcmFncmFwaHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcElubGluZXMoYm9keSwgZG9jKSB7XHJcblx0dmFyIHdyYXBwZXI7XHJcblxyXG5cdGRvbS50cmF2ZXJzZShib2R5LCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKGRvbS5pc0lubGluZShub2RlLCB0cnVlKSkge1xyXG5cdFx0XHQvLyBJZ25vcmUgdGV4dCBub2RlcyB1bmxlc3MgdGhleSBjb250YWluIG5vbi13aGl0ZXNwYWNlIGNoYXJzIGFzXHJcblx0XHRcdC8vIHdoaXRlc3BhY2Ugd2lsbCBiZSBjb2xsYXBzZWQuXHJcblx0XHRcdC8vIElnbm9yZSBzY2VkaXRvci1pZ25vcmUgZWxlbWVudHMgdW5sZXNzIHdyYXBwaW5nIHNpYmxpbmdzXHJcblx0XHRcdC8vIFNob3VsZCBzdGlsbCB3cmFwIGJvdGggaWYgd3JhcHBpbmcgc2libGluZ3MuXHJcblx0XHRcdGlmICh3cmFwcGVyIHx8IG5vZGUubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgP1xyXG5cdFx0XHRcdC9cXFMvLnRlc3Qobm9kZS5ub2RlVmFsdWUpIDogIWRvbS5pcyhub2RlLCAnLnNjZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0aWYgKCF3cmFwcGVyKSB7XHJcblx0XHRcdFx0XHR3cmFwcGVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUod3JhcHBlciwgbm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3JhcHBlciwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHdyYXBwZXIgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH0sIGZhbHNlLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNDRWRpdG9yIC0gQSBsaWdodHdlaWdodCBXWVNJV1lHIGVkaXRvclxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxUZXh0QXJlYUVsZW1lbnR9IG9yaWdpbmFsIFRoZSB0ZXh0YXJlYSB0byBiZSBjb252ZXJ0ZWRcclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJPcHRpb25zXHJcbiAqIEBjbGFzcyBTQ0VkaXRvclxyXG4gKiBAbmFtZSBTQ0VkaXRvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU0NFZGl0b3Iob3JpZ2luYWwsIHVzZXJPcHRpb25zKSB7XHJcblx0LyoqXHJcblx0ICogQWxpYXMgb2YgdGhpc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcclxuXHR2YXIgYmFzZSA9IHRoaXM7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVkaXRvciBmb3JtYXQgbGlrZSBCQkNvZGUgb3IgSFRNTFxyXG5cdCAqL1xyXG5cdHZhciBmb3JtYXQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkaXYgd2hpY2ggY29udGFpbnMgdGhlIGVkaXRvciBhbmQgdG9vbGJhclxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGVkaXRvckNvbnRhaW5lcjtcclxuXHJcblx0LyoqXHJcblx0ICogTWFwIG9mIGV2ZW50cyBoYW5kbGVycyBib3VuZCB0byB0aGlzIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBldmVudEhhbmRsZXJzID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHRvb2xiYXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciB0b29sYmFyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBpZnJhbWUgd2hpY2ggc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgd3lzaXd5Z0VkaXRvcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVkaXRvcnMgd2luZG93XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7V2luZG93fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHd5c2l3eWdXaW5kb3c7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBXWVNJV1lHIGVkaXRvcnMgYm9keSBlbGVtZW50XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTEJvZHlFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHd5c2l3eWdCb2R5O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGRvY3VtZW50XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7RG9jdW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgd3lzaXd5Z0RvY3VtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyB0ZXh0YXJlYSBmb3Igdmlld2luZyBzb3VyY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MVGV4dEFyZWFFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHNvdXJjZUVkaXRvcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgZHJvcGRvd25cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBkcm9wZG93bjtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGNvbXBvc2luZyB0ZXh0IHZpYSBJTUVcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHR2YXIgaXNDb21wb3Npbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRpbWVyIGZvciB2YWx1ZUNoYW5nZWQga2V5IGhhbmRsZXJcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHZhciB2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBsb2NhbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGxvY2FsZTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcmVzIGEgY2FjaGUgb2YgcHJlbG9hZGVkIGltYWdlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAdHlwZSB7QXJyYXkuPEhUTUxJbWFnZUVsZW1lbnQ+fVxyXG5cdCAqL1xyXG5cdHZhciBwcmVMb2FkQ2FjaGUgPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVkaXRvcnMgcmFuZ2VIZWxwZXIgaW5zdGFuY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtSYW5nZUhlbHBlcn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciByYW5nZUhlbHBlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQW4gYXJyYXkgb2YgYnV0dG9uIHN0YXRlIGhhbmRsZXJzXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7QXJyYXkuPE9iamVjdD59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgYnRuU3RhdGVIYW5kbGVycyA9IFtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBQbHVnaW4gbWFuYWdlciBpbnN0YW5jZVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1BsdWdpbk1hbmFnZXJ9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgcGx1Z2luTWFuYWdlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgbm9kZSBjb250YWluaW5nIHRoZSBzZWxlY3Rpb24vY2FyZXRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOb2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGN1cnJlbnROb2RlO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBjdXJyZW50IG5vZGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtub2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGN1cnJlbnRCbG9ja05vZGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IG5vZGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGN1cnJlbnRTZWxlY3Rpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZWQgdG8gbWFrZSBzdXJlIG9ubHkgMSBzZWxlY3Rpb24gY2hhbmdlZFxyXG5cdCAqIGNoZWNrIGlzIGNhbGxlZCBldmVyeSAxMDBtcy5cclxuXHQgKlxyXG5cdCAqIEhlbHBzIGltcHJvdmUgcGVyZm9ybWFuY2UgYXMgaXQgaXMgY2hlY2tlZCBhIGxvdC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiBjb250ZW50IGlzIHJlcXVpcmVkIChlcXVpdmFsZW50IHRvIHRoZSBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUpXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBpc1JlcXVpcmVkO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaW5saW5lIENTUyBzdHlsZSBlbGVtZW50LiBXaWxsIGJlIHVuZGVmaW5lZFxyXG5cdCAqIHVudGlsIGNzcygpIGlzIGNhbGxlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTFN0eWxlRWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBpbmxpbmVDc3M7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9iamVjdCBjb250YWluaW5nIGEgbGlzdCBvZiBzaG9ydGN1dCBoYW5kbGVyc1xyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBzaG9ydGN1dEhhbmRsZXJzID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtaW4gYW5kIG1heCBoZWlnaHRzIHRoYXQgYXV0b0V4cGFuZCBzaG91bGQgc3RheSB3aXRoaW5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgYXV0b0V4cGFuZEJvdW5kcztcclxuXHJcblx0LyoqXHJcblx0ICogVGltZW91dCBmb3IgdGhlIGF1dG9FeHBhbmQgZnVuY3Rpb24gdG8gdGhyb3R0bGUgY2FsbHNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGF1dG9FeHBhbmRUaHJvdHRsZTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2FjaGUgb2YgdGhlIGN1cnJlbnQgdG9vbGJhciBidXR0b25zXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHRvb2xiYXJCdXR0b25zID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIExhc3Qgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSBtYXhpbWl6aW5nIHNvXHJcblx0ICogaXQgY2FuIGJlIHJlc3RvcmVkIHdoZW4gZmluaXNoZWQuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIG1heGltaXplU2Nyb2xsUG9zaXRpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3JlcyB0aGUgY29udGVudHMgd2hpbGUgYSBwYXN0ZSBpcyB0YWtpbmcgcGxhY2UuXHJcblx0ICpcclxuXHQgKiBOZWVkZWQgdG8gc3VwcG9ydCBicm93c2VycyB0aGF0IGxhY2sgY2xpcGJvYXJkIEFQSSBzdXBwb3J0LlxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9Eb2N1bWVudEZyYWdtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHBhc3RlQ29udGVudEZyYWdtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgdGhlIGVtb3RpY29ucyBmcm9tIGRyb3Bkb3duLCBtb3JlIGFuZCBoaWRkZW4gY29tYmluZWRcclxuXHQgKiBhbmQgd2l0aCB0aGUgZW1vdGljb25zIHJvb3Qgc2V0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgYWxsRW1vdGljb25zID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgaWNvbiBzZXQgaWYgYW55XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7P09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBpY29ucztcclxuXHJcblx0LyoqXHJcblx0ICogUHJpdmF0ZSBmdW5jdGlvbnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhclx0aW5pdCxcclxuXHRcdHJlcGxhY2VFbW90aWNvbnMsXHJcblx0XHRoYW5kbGVDb21tYW5kLFxyXG5cdFx0aW5pdEVkaXRvcixcclxuXHRcdGluaXRMb2NhbGUsXHJcblx0XHRpbml0VG9vbEJhcixcclxuXHRcdGluaXRPcHRpb25zLFxyXG5cdFx0aW5pdEV2ZW50cyxcclxuXHRcdGluaXRSZXNpemUsXHJcblx0XHRpbml0RW1vdGljb25zLFxyXG5cdFx0aGFuZGxlUGFzdGVFdnQsXHJcblx0XHRoYW5kbGVDdXRDb3B5RXZ0LFxyXG5cdFx0aGFuZGxlUGFzdGVEYXRhLFxyXG5cdFx0aGFuZGxlS2V5RG93bixcclxuXHRcdGhhbmRsZUJhY2tTcGFjZSxcclxuXHRcdGhhbmRsZUtleVByZXNzLFxyXG5cdFx0aGFuZGxlRm9ybVJlc2V0LFxyXG5cdFx0aGFuZGxlTW91c2VEb3duLFxyXG5cdFx0aGFuZGxlQ29tcG9zaXRpb24sXHJcblx0XHRoYW5kbGVFdmVudCxcclxuXHRcdGhhbmRsZURvY3VtZW50Q2xpY2ssXHJcblx0XHR1cGRhdGVUb29sQmFyLFxyXG5cdFx0dXBkYXRlQWN0aXZlQnV0dG9ucyxcclxuXHRcdHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCxcclxuXHRcdGFwcGVuZE5ld0xpbmUsXHJcblx0XHRjaGVja1NlbGVjdGlvbkNoYW5nZWQsXHJcblx0XHRjaGVja05vZGVDaGFuZ2VkLFxyXG5cdFx0YXV0b2ZvY3VzLFxyXG5cdFx0ZW1vdGljb25zS2V5UHJlc3MsXHJcblx0XHRlbW90aWNvbnNDaGVja1doaXRlc3BhY2UsXHJcblx0XHRjdXJyZW50U3R5bGVkQmxvY2tOb2RlLFxyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCxcclxuXHRcdHZhbHVlQ2hhbmdlZEJsdXIsXHJcblx0XHR2YWx1ZUNoYW5nZWRLZXlVcCxcclxuXHRcdGF1dG9VcGRhdGUsXHJcblx0XHRhdXRvRXhwYW5kO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgdGhlIGNvbW1hbmRzIHN1cHBvcnRlZCBieSB0aGUgZWRpdG9yXHJcblx0ICogQG5hbWUgY29tbWFuZHNcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5jb21tYW5kcyA9IHV0aWxzXHJcblx0XHQuZXh0ZW5kKHRydWUsIHt9LCAodXNlck9wdGlvbnMuY29tbWFuZHMgfHwgZGVmYXVsdENvbW1hbmRzKSk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wdGlvbnMgZm9yIHRoaXMgZWRpdG9yIGluc3RhbmNlXHJcblx0ICogQG5hbWUgb3B0c1xyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHR2YXIgb3B0aW9ucyA9IGJhc2Uub3B0cyA9IHV0aWxzLmV4dGVuZChcclxuXHRcdHRydWUsIHt9LCBkZWZhdWx0T3B0aW9ucywgdXNlck9wdGlvbnNcclxuXHQpO1xyXG5cclxuXHQvLyBEb24ndCBkZWVwIGV4dGVuZCBlbW90aWNvbnMgKGZpeGVzICM1NjUpXHJcblx0YmFzZS5vcHRzLmVtb3RpY29ucyA9IHVzZXJPcHRpb25zLmVtb3RpY29ucyB8fCBkZWZhdWx0T3B0aW9ucy5lbW90aWNvbnM7XHJcblxyXG5cdGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzKSkge1xyXG5cdFx0b3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscyA9IFtdO1xyXG5cdH1cclxuXHRvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzLnB1c2goJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLycpO1xyXG5cclxuXHQvLyBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIERPTVB1cmlmeSBmb3IgZWFjaCBlZGl0b3IgaW5zdGFuY2Ugc28gY2FuXHJcblx0Ly8gaGF2ZSBkaWZmZXJlbnQgYWxsb3dlZCBpZnJhbWUgVVJMc1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXHJcblx0dmFyIGRvbVB1cmlmeSA9IERPTVB1cmlmeSgpO1xyXG5cclxuXHQvLyBBbGxvdyBpZnJhbWVzIGZvciB0aGluZ3MgbGlrZSBZb3VUdWJlLCBzZWU6XHJcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvaXNzdWVzLzM0MCNpc3N1ZWNvbW1lbnQtNjcwNzU4OTgwXHJcblx0ZG9tUHVyaWZ5LmFkZEhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBmdW5jdGlvbiAobm9kZSwgZGF0YSkge1xyXG5cdFx0dmFyIGFsbG93ZWRVcmxzID0gb3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscztcclxuXHJcblx0XHRpZiAoZGF0YS50YWdOYW1lID09PSAnaWZyYW1lJykge1xyXG5cdFx0XHR2YXIgc3JjID0gZG9tLmF0dHIobm9kZSwgJ3NyYycpIHx8ICcnO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxvd2VkVXJscy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciB1cmwgPSBhbGxvd2VkVXJsc1tpXTtcclxuXHJcblx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHVybCkgJiYgc3JjLnN1YnN0cigwLCB1cmwubGVuZ3RoKSA9PT0gdXJsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBIYW5kbGUgcmVnZXhcclxuXHRcdFx0XHRpZiAodXJsLnRlc3QgJiYgdXJsLnRlc3Qoc3JjKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTm8gbWF0Y2ggc28gcmVtb3ZlXHJcblx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIENvbnZlcnQgdGFyZ2V0IGF0dHJpYnV0ZSBpbnRvIGRhdGEtc2NlLXRhcmdldCBhdHRyaWJ1dGVzIHNvIFhIVE1MIGZvcm1hdFxyXG5cdC8vIGNhbiBhbGxvdyB0aGVtXHJcblx0ZG9tUHVyaWZ5LmFkZEhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGlmICgndGFyZ2V0JyBpbiBub2RlKSB7XHJcblx0XHRcdGRvbS5hdHRyKG5vZGUsICdkYXRhLXNjZS10YXJnZXQnLCBkb20uYXR0cihub2RlLCAndGFyZ2V0JykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5yZW1vdmVBdHRyKG5vZGUsICd0YXJnZXQnKTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0ICogU2FuaXRpemUgSFRNTCB0byBhdm9pZCBYU1NcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcblx0ICogQHJldHVybiB7c3RyaW5nfSBodG1sXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBzYW5pdGl6ZShodG1sKSB7XHJcblx0XHRjb25zdCBhbGxvd2VkVGFncyA9IFsnaWZyYW1lJ10uY29uY2F0KG9wdGlvbnMuYWxsb3dlZFRhZ3MpO1xyXG5cdFx0Y29uc3QgYWxsb3dlZEF0dHJzID0gWydhbGxvd2Z1bGxzY3JlZW4nLCAnZnJhbWVib3JkZXInLCAndGFyZ2V0J11cclxuXHRcdFx0LmNvbmNhdChvcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRyZXR1cm4gZG9tUHVyaWZ5LnNhbml0aXplKGh0bWwsIHtcclxuXHRcdFx0QUREX1RBR1M6IGFsbG93ZWRUYWdzLFxyXG5cdFx0XHRBRERfQVRUUjogYWxsb3dlZEF0dHJzXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGVkaXRvciBpZnJhbWUgYW5kIHRleHRhcmVhXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0b3JpZ2luYWwuX3NjZWRpdG9yID0gYmFzZTtcclxuXHJcblx0XHQvLyBMb2FkIGxvY2FsZVxyXG5cdFx0aWYgKG9wdGlvbnMubG9jYWxlICYmIG9wdGlvbnMubG9jYWxlICE9PSAnZW4nKSB7XHJcblx0XHRcdGluaXRMb2NhbGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0b3JDb250YWluZXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1jb250YWluZXInXHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20uaW5zZXJ0QmVmb3JlKGVkaXRvckNvbnRhaW5lciwgb3JpZ2luYWwpO1xyXG5cdFx0ZG9tLmNzcyhlZGl0b3JDb250YWluZXIsICd6LWluZGV4Jywgb3B0aW9ucy56SW5kZXgpO1xyXG5cclxuXHRcdGlzUmVxdWlyZWQgPSBvcmlnaW5hbC5yZXF1aXJlZDtcclxuXHRcdG9yaWdpbmFsLnJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG5cdFx0dmFyIEZvcm1hdEN0b3IgPSBTQ0VkaXRvci5mb3JtYXRzW29wdGlvbnMuZm9ybWF0XTtcclxuXHRcdGZvcm1hdCA9IEZvcm1hdEN0b3IgPyBuZXcgRm9ybWF0Q3RvcigpIDoge307XHJcblx0XHQvKlxyXG5cdFx0ICogUGx1Z2lucyBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIHRoZSBmb3JtYXR0ZXJzIHNpbmNlXHJcblx0XHQgKiB0aGV5IG1heSB3aXNoIHRvIGFkZCBvciBjaGFuZ2UgZm9ybWF0dGluZyBoYW5kbGVycyBhbmRcclxuXHRcdCAqIHNpbmNlIHRoZSBiYmNvZGUgZm9ybWF0IGNhY2hlcyBpdHMgaGFuZGxlcnMsXHJcblx0XHQgKiBzdWNoIGNoYW5nZXMgbXVzdCBiZSBkb25lIGZpcnN0LlxyXG5cdFx0ICovXHJcblx0XHRwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoYmFzZSk7XHJcblx0XHQob3B0aW9ucy5wbHVnaW5zIHx8ICcnKS5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xyXG5cdFx0XHRwbHVnaW5NYW5hZ2VyLnJlZ2lzdGVyKHBsdWdpbi50cmltKCkpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoJ2luaXQnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRmb3JtYXQuaW5pdC5jYWxsKGJhc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSB0aGUgZWRpdG9yXHJcblx0XHRpbml0RW1vdGljb25zKCk7XHJcblx0XHRpbml0VG9vbEJhcigpO1xyXG5cdFx0aW5pdEVkaXRvcigpO1xyXG5cdFx0aW5pdE9wdGlvbnMoKTtcclxuXHRcdGluaXRFdmVudHMoKTtcclxuXHJcblx0XHQvLyBmb3JjZSBpbnRvIHNvdXJjZSBtb2RlIGlmIGlzIGEgYnJvd3NlciB0aGF0IGNhbid0IGhhbmRsZVxyXG5cdFx0Ly8gZnVsbCBlZGl0aW5nXHJcblx0XHRpZiAoIWJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkKSB7XHJcblx0XHRcdGJhc2UudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHR2YXIgbG9hZGVkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRkb20ub2ZmKGdsb2JhbFdpbiwgJ2xvYWQnLCBsb2FkZWQpO1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0YXV0b2ZvY3VzKCEhb3B0aW9ucy5hdXRvZm9jdXNFbmQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhdXRvRXhwYW5kKCk7XHJcblx0XHRcdGFwcGVuZE5ld0xpbmUoKTtcclxuXHRcdFx0Ly8gVE9ETzogdXNlIGVkaXRvciBkb2MgYW5kIHdpbmRvdz9cclxuXHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdyZWFkeScpO1xyXG5cdFx0XHRpZiAoJ29uUmVhZHknIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdGZvcm1hdC5vblJlYWR5LmNhbGwoYmFzZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRkb20ub24oZ2xvYmFsV2luLCAnbG9hZCcsIGxvYWRlZCk7XHJcblx0XHRpZiAoZ2xvYmFsRG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0bG9hZGVkKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdCB0aGUgbG9jYWxlIHZhcmlhYmxlIHdpdGggdGhlIHNwZWNpZmllZCBsb2NhbGUgaWYgcG9zc2libGVcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGluaXRMb2NhbGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbGFuZztcclxuXHJcblx0XHRsb2NhbGUgPSBTQ0VkaXRvci5sb2NhbGVbb3B0aW9ucy5sb2NhbGVdO1xyXG5cclxuXHRcdGlmICghbG9jYWxlKSB7XHJcblx0XHRcdGxhbmcgICA9IG9wdGlvbnMubG9jYWxlLnNwbGl0KCctJyk7XHJcblx0XHRcdGxvY2FsZSA9IFNDRWRpdG9yLmxvY2FsZVtsYW5nWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBMb2NhbGUgRGF0ZVRpbWUgZm9ybWF0IG92ZXJyaWRlcyBhbnkgc3BlY2lmaWVkIGluIHRoZSBvcHRpb25zXHJcblx0XHRpZiAobG9jYWxlICYmIGxvY2FsZS5kYXRlRm9ybWF0KSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0ZUZvcm1hdCA9IGxvY2FsZS5kYXRlRm9ybWF0O1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGVkaXRvciBpZnJhbWUgYW5kIHRleHRhcmVhXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRpbml0RWRpdG9yID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0c291cmNlRWRpdG9yICA9IGRvbS5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG5cdFx0d3lzaXd5Z0VkaXRvciA9IGRvbS5jcmVhdGVFbGVtZW50KCdpZnJhbWUnLCB7XHJcblx0XHRcdGZyYW1lYm9yZGVyOiAwLFxyXG5cdFx0XHRhbGxvd2Z1bGxzY3JlZW46IHRydWVcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgcmlnaHQgYWZ0ZXIgdGhleSBhcmUgY3JlYXRlZCBiZWNhdXNlLFxyXG5cdFx0ICogZm9yIGFueSByZWFzb24sIHRoZSB1c2VyIG1heSBub3Qgd2FudCB0aGUgdmFsdWUgdG8gYmUgdGlua2VyZWRcclxuXHRcdCAqIGJ5IGFueSBmaWx0ZXJzLlxyXG5cdFx0ICovXHJcblx0XHRpZiAob3B0aW9ucy5zdGFydEluU291cmNlTW9kZSkge1xyXG5cdFx0XHRkb20uYWRkQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZSh3eXNpd3lnRWRpdG9yKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZShzb3VyY2VFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghb3B0aW9ucy5zcGVsbGNoZWNrKSB7XHJcblx0XHRcdGRvbS5hdHRyKGVkaXRvckNvbnRhaW5lciwgJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZ2xvYmFsV2luLmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6Jykge1xyXG5cdFx0XHRkb20uYXR0cih3eXNpd3lnRWRpdG9yLCAnc3JjJywgJ2Fib3V0OmJsYW5rJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBlZGl0b3IgdG8gdGhlIGNvbnRhaW5lclxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgd3lzaXd5Z0VkaXRvcik7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBzb3VyY2VFZGl0b3IpO1xyXG5cclxuXHRcdC8vIFRPRE86IG1ha2UgdGhpcyBvcHRpb25hbCBzb21laG93XHJcblx0XHRiYXNlLmRpbWVuc2lvbnMoXHJcblx0XHRcdG9wdGlvbnMud2lkdGggfHwgZG9tLndpZHRoKG9yaWdpbmFsKSxcclxuXHRcdFx0b3B0aW9ucy5oZWlnaHQgfHwgZG9tLmhlaWdodChvcmlnaW5hbClcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gQWRkIGlvcyB0byBIVE1MIHNvIGNhbiBhcHBseSBDU1MgZml4IHRvIG9ubHkgaXRcclxuXHRcdHZhciBjbGFzc05hbWUgPSBicm93c2VyLmlvcyA/ICcgaW9zJyA6ICcnO1xyXG5cclxuXHRcdHd5c2l3eWdEb2N1bWVudCA9IHd5c2l3eWdFZGl0b3IuY29udGVudERvY3VtZW50O1xyXG5cdFx0d3lzaXd5Z0RvY3VtZW50Lm9wZW4oKTtcclxuXHRcdHd5c2l3eWdEb2N1bWVudC53cml0ZShfdG1wbCgnaHRtbCcsIHtcclxuXHRcdFx0YXR0cnM6ICcgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiJyxcclxuXHRcdFx0c3BlbGxjaGVjazogb3B0aW9ucy5zcGVsbGNoZWNrID8gJycgOiAnc3BlbGxjaGVjaz1cImZhbHNlXCInLFxyXG5cdFx0XHRjaGFyc2V0OiBvcHRpb25zLmNoYXJzZXQsXHJcblx0XHRcdHN0eWxlOiBvcHRpb25zLnN0eWxlXHJcblx0XHR9KSk7XHJcblx0XHR3eXNpd3lnRG9jdW1lbnQuY2xvc2UoKTtcclxuXHJcblx0XHR3eXNpd3lnQm9keSA9IHd5c2l3eWdEb2N1bWVudC5ib2R5O1xyXG5cdFx0d3lzaXd5Z1dpbmRvdyA9IHd5c2l3eWdFZGl0b3IuY29udGVudFdpbmRvdztcclxuXHJcblx0XHRiYXNlLnJlYWRPbmx5KCEhb3B0aW9ucy5yZWFkT25seSk7XHJcblxyXG5cdFx0Ly8gaWZyYW1lIG92ZXJmbG93IGZpeCBmb3IgaU9TXHJcblx0XHRpZiAoYnJvd3Nlci5pb3MpIHtcclxuXHRcdFx0ZG9tLmhlaWdodCh3eXNpd3lnQm9keSwgJzEwMCUnKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBiYXNlLmZvY3VzKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGFiSW5kZXggPSBkb20uYXR0cihvcmlnaW5hbCwgJ3RhYmluZGV4Jyk7XHJcblx0XHRkb20uYXR0cihzb3VyY2VFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHRcdGRvbS5hdHRyKHd5c2l3eWdFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHJcblx0XHRyYW5nZUhlbHBlciA9IG5ldyBSYW5nZUhlbHBlcih3eXNpd3lnV2luZG93LCBudWxsLCBzYW5pdGl6ZSk7XHJcblxyXG5cdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRkb20uaGlkZShvcmlnaW5hbCk7XHJcblx0XHRiYXNlLnZhbChvcmlnaW5hbC52YWx1ZSk7XHJcblxyXG5cdFx0dmFyIHBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fFxyXG5cdFx0XHRkb20uYXR0cihvcmlnaW5hbCwgJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG5cdFx0aWYgKHBsYWNlaG9sZGVyKSB7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG5cdFx0XHRkb20uYXR0cih3eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpc2VzIG9wdGlvbnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRPcHRpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gYXV0by11cGRhdGUgb3JpZ2luYWwgdGV4dGJveCBvbiBibHVyIGlmIG9wdGlvbiBzZXQgdG8gdHJ1ZVxyXG5cdFx0aWYgKG9wdGlvbnMuYXV0b1VwZGF0ZSkge1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdibHVyJywgYXV0b1VwZGF0ZSk7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdibHVyJywgYXV0b1VwZGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMucnRsID09PSBudWxsKSB7XHJcblx0XHRcdG9wdGlvbnMucnRsID0gZG9tLmNzcyhzb3VyY2VFZGl0b3IsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCc7XHJcblx0XHR9XHJcblxyXG5cdFx0YmFzZS5ydGwoISFvcHRpb25zLnJ0bCk7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuYXV0b0V4cGFuZCkge1xyXG5cdFx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB3aGVuIGltYWdlcyAob3IgYW55dGhpbmcgZWxzZSkgbG9hZHNcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnbG9hZCcsIGF1dG9FeHBhbmQsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnaW5wdXQga2V5dXAnLCBhdXRvRXhwYW5kKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5yZXNpemVFbmFibGVkKSB7XHJcblx0XHRcdGluaXRSZXNpemUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXR0cihlZGl0b3JDb250YWluZXIsICdpZCcsIG9wdGlvbnMuaWQpO1xyXG5cdFx0YmFzZS5lbW90aWNvbnMob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXNlcyBldmVudHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZm9ybSA9IG9yaWdpbmFsLmZvcm07XHJcblx0XHR2YXIgY29tcG9zaXRpb25FdmVudHMgPSAnY29tcG9zaXRpb25zdGFydCBjb21wb3NpdGlvbmVuZCc7XHJcblx0XHR2YXIgZXZlbnRzVG9Gb3J3YXJkID1cclxuXHRcdFx0J2tleWRvd24ga2V5dXAga2V5cHJlc3MgZm9jdXMgYmx1ciBjb250ZXh0bWVudSBpbnB1dCc7XHJcblx0XHR2YXIgY2hlY2tTZWxlY3Rpb25FdmVudHMgPSAnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHd5c2l3eWdEb2N1bWVudCA/XHJcblx0XHRcdCdzZWxlY3Rpb25jaGFuZ2UnIDpcclxuXHRcdFx0J2tleXVwIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgbW91c2V1cCB0b3VjaGVuZCBjbGljayc7XHJcblxyXG5cdFx0ZG9tLm9uKGdsb2JhbERvYywgJ2NsaWNrJywgaGFuZGxlRG9jdW1lbnRDbGljayk7XHJcblxyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdGRvbS5vbihmb3JtLCAnc3VibWl0JywgYmFzZS51cGRhdGVPcmlnaW5hbCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vbih3aW5kb3csICdwYWdlaGlkZScsIGJhc2UudXBkYXRlT3JpZ2luYWwpO1xyXG5cdFx0ZG9tLm9uKHdpbmRvdywgJ3BhZ2VzaG93JywgaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgaGFuZGxlS2V5UHJlc3MpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5ZG93bicsIGhhbmRsZUJhY2tTcGFjZSk7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIGFwcGVuZE5ld0xpbmUpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCB2YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdwYXN0ZScsIGhhbmRsZVBhc3RlRXZ0KTtcclxuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2N1dCBjb3B5JywgaGFuZGxlQ3V0Q29weUV2dCk7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksIGNvbXBvc2l0aW9uRXZlbnRzLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCBldmVudHNUb0ZvcndhcmQsIGhhbmRsZUV2ZW50KTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNDb21wYXQgJiYgZ2xvYmFsV2luLmdldFNlbGVjdGlvbikge1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIGVtb3RpY29uc0NoZWNrV2hpdGVzcGFjZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCFiYXNlLnZhbCgpKSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnZm9jdXMnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyh3eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24oc291cmNlRWRpdG9yLCAnYmx1cicsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0ZG9tLm9uKHNvdXJjZUVkaXRvciwgJ2tleXVwJywgdmFsdWVDaGFuZ2VkS2V5VXApO1xyXG5cdFx0ZG9tLm9uKHNvdXJjZUVkaXRvciwgJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGNvbXBvc2l0aW9uRXZlbnRzLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRkb20ub24oc291cmNlRWRpdG9yLCBldmVudHNUb0ZvcndhcmQsIGhhbmRsZUV2ZW50KTtcclxuXHJcblx0XHRkb20ub24od3lzaXd5Z0RvY3VtZW50LCAnbW91c2Vkb3duJywgaGFuZGxlTW91c2VEb3duKTtcclxuXHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdEb2N1bWVudCwgJ2tleXVwJywgYXBwZW5kTmV3TGluZSk7XHJcblxyXG5cdFx0ZG9tLm9uKGVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnLCBjaGVja05vZGVDaGFuZ2VkKTtcclxuXHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgdXBkYXRlQWN0aXZlQnV0dG9ucyk7XHJcblx0XHQvLyBDdXN0b20gZXZlbnRzIHRvIGZvcndhcmRcclxuXHRcdGRvbS5vbihcclxuXHRcdFx0ZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlZCB2YWx1ZWNoYW5nZWQgbm9kZWNoYW5nZWQgcGFzdGVyYXcgcGFzdGUnLFxyXG5cdFx0XHRoYW5kbGVFdmVudFxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSB0b29sYmFyIGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBjb250YWluZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRUb29sQmFyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyXHRncm91cCxcclxuXHRcdFx0Y29tbWFuZHMgPSBiYXNlLmNvbW1hbmRzLFxyXG5cdFx0XHRleGNsdWRlICA9IChvcHRpb25zLnRvb2xiYXJFeGNsdWRlIHx8ICcnKS5zcGxpdCgnLCcpLFxyXG5cdFx0XHRncm91cHMgICA9IG9wdGlvbnMudG9vbGJhci5zcGxpdCgnfCcpO1xyXG5cclxuXHRcdHRvb2xiYXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dW5zZWxlY3RhYmxlOiAnb24nXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5pY29ucyBpbiBTQ0VkaXRvci5pY29ucykge1xyXG5cdFx0XHRpY29ucyA9IG5ldyBTQ0VkaXRvci5pY29uc1tvcHRpb25zLmljb25zXSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHV0aWxzLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiAoXywgbWVudUl0ZW1zKSB7XHJcblx0XHRcdGdyb3VwID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1ncm91cCdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR1dGlscy5lYWNoKG1lbnVJdGVtcy5zcGxpdCgnLCcpLCBmdW5jdGlvbiAoXywgY29tbWFuZE5hbWUpIHtcclxuXHRcdFx0XHR2YXJcdGJ1dHRvbiwgc2hvcnRjdXQsXHJcblx0XHRcdFx0XHRjb21tYW5kICA9IGNvbW1hbmRzW2NvbW1hbmROYW1lXTtcclxuXHJcblx0XHRcdFx0Ly8gVGhlIGNvbW1hbmROYW1lIG11c3QgYmUgYSB2YWxpZCBjb21tYW5kIGFuZCBub3QgZXhjbHVkZWRcclxuXHRcdFx0XHRpZiAoIWNvbW1hbmQgfHwgZXhjbHVkZS5pbmRleE9mKGNvbW1hbmROYW1lKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzaG9ydGN1dCA9IGNvbW1hbmQuc2hvcnRjdXQ7XHJcblx0XHRcdFx0YnV0dG9uICAgPSBfdG1wbCgndG9vbGJhckJ1dHRvbicsIHtcclxuXHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0ZGlzcE5hbWU6IGJhc2UuXyhjb21tYW5kLm5hbWUgfHxcclxuXHRcdFx0XHRcdFx0XHRjb21tYW5kLnRvb2x0aXAgfHwgY29tbWFuZE5hbWUpXHJcblx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0aWYgKGljb25zICYmIGljb25zLmNyZWF0ZSkge1xyXG5cdFx0XHRcdFx0dmFyIGljb24gPSBpY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShpY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpLFxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRidXR0b24uX3NjZVR4dE1vZGUgPSAhIWNvbW1hbmQudHh0RXhlYztcclxuXHRcdFx0XHRidXR0b24uX3NjZVd5c2l3eWdNb2RlID0gISFjb21tYW5kLmV4ZWM7XHJcblx0XHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJywgIWNvbW1hbmQuZXhlYyk7XHJcblx0XHRcdFx0ZG9tLm9uKGJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdGlmICghZG9tLmhhc0NsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJykpIHtcclxuXHRcdFx0XHRcdFx0aGFuZGxlQ29tbWFuZChidXR0b24sIGNvbW1hbmQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvLyBQcmV2ZW50IGVkaXRvciBsb3NpbmcgZm9jdXMgd2hlbiBidXR0b24gY2xpY2tlZFxyXG5cdFx0XHRcdGRvbS5vbihidXR0b24sICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmIChjb21tYW5kLnRvb2x0aXApIHtcclxuXHRcdFx0XHRcdGRvbS5hdHRyKGJ1dHRvbiwgJ3RpdGxlJyxcclxuXHRcdFx0XHRcdFx0YmFzZS5fKGNvbW1hbmQudG9vbHRpcCkgK1xyXG5cdFx0XHRcdFx0XHRcdChzaG9ydGN1dCA/ICcgKCcgKyBzaG9ydGN1dCArICcpJyA6ICcnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChzaG9ydGN1dCkge1xyXG5cdFx0XHRcdFx0YmFzZS5hZGRTaG9ydGN1dChzaG9ydGN1dCwgY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNvbW1hbmQuc3RhdGUpIHtcclxuXHRcdFx0XHRcdGJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0XHRzdGF0ZTogY29tbWFuZC5zdGF0ZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly8gZXhlYyBzdHJpbmcgY29tbWFuZHMgY2FuIGJlIHBhc3NlZCB0byBxdWVyeUNvbW1hbmRTdGF0ZVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY29tbWFuZC5leGVjKSkge1xyXG5cdFx0XHRcdFx0YnRuU3RhdGVIYW5kbGVycy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0bmFtZTogY29tbWFuZE5hbWUsXHJcblx0XHRcdFx0XHRcdHN0YXRlOiBjb21tYW5kLmV4ZWNcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGdyb3VwLCBidXR0b24pO1xyXG5cdFx0XHRcdHRvb2xiYXJCdXR0b25zW2NvbW1hbmROYW1lXSA9IGJ1dHRvbjtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBFeGNsdWRlIGVtcHR5IGdyb3Vwc1xyXG5cdFx0XHRpZiAoZ3JvdXAuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0b29sYmFyLCBncm91cCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFwcGVuZCB0aGUgdG9vbGJhciB0byB0aGUgdG9vbGJhckNvbnRhaW5lciBvcHRpb24gaWYgZ2l2ZW5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZChvcHRpb25zLnRvb2xiYXJDb250YWluZXIgfHwgZWRpdG9yQ29udGFpbmVyLCB0b29sYmFyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSByZXNpemVyLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aW5pdFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhclx0bWluSGVpZ2h0LCBtYXhIZWlnaHQsIG1pbldpZHRoLCBtYXhXaWR0aCxcclxuXHRcdFx0bW91c2VNb3ZlRnVuYywgbW91c2VVcEZ1bmMsXHJcblx0XHRcdGdyaXAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1ncmlwJ1xyXG5cdFx0XHR9KSxcclxuXHRcdFx0Ly8gQ292ZXIgaXMgdXNlZCB0byBjb3ZlciB0aGUgZWRpdG9yIGlmcmFtZSBzbyBkb2N1bWVudFxyXG5cdFx0XHQvLyBzdGlsbCBnZXRzIG1vdXNlIG1vdmUgZXZlbnRzXHJcblx0XHRcdGNvdmVyICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1yZXNpemUtY292ZXInXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRtb3ZlRXZlbnRzICA9ICd0b3VjaG1vdmUgbW91c2Vtb3ZlJyxcclxuXHRcdFx0ZW5kRXZlbnRzICAgPSAndG91Y2hjYW5jZWwgdG91Y2hlbmQgbW91c2V1cCcsXHJcblx0XHRcdHN0YXJ0WCAgICAgID0gMCxcclxuXHRcdFx0c3RhcnRZICAgICAgPSAwLFxyXG5cdFx0XHRuZXdYICAgICAgICA9IDAsXHJcblx0XHRcdG5ld1kgICAgICAgID0gMCxcclxuXHRcdFx0c3RhcnRXaWR0aCAgPSAwLFxyXG5cdFx0XHRzdGFydEhlaWdodCA9IDAsXHJcblx0XHRcdG9yaWdXaWR0aCAgID0gZG9tLndpZHRoKGVkaXRvckNvbnRhaW5lciksXHJcblx0XHRcdG9yaWdIZWlnaHQgID0gZG9tLmhlaWdodChlZGl0b3JDb250YWluZXIpLFxyXG5cdFx0XHRpc0RyYWdnaW5nICA9IGZhbHNlLFxyXG5cdFx0XHRydGwgICAgICAgICA9IGJhc2UucnRsKCk7XHJcblxyXG5cdFx0bWluSGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgb3JpZ0hlaWdodCAvIDEuNTtcclxuXHRcdG1heEhlaWdodCA9IG9wdGlvbnMucmVzaXplTWF4SGVpZ2h0IHx8IG9yaWdIZWlnaHQgKiAyLjU7XHJcblx0XHRtaW5XaWR0aCAgPSBvcHRpb25zLnJlc2l6ZU1pbldpZHRoICB8fCBvcmlnV2lkdGggIC8gMS4yNTtcclxuXHRcdG1heFdpZHRoICA9IG9wdGlvbnMucmVzaXplTWF4V2lkdGggIHx8IG9yaWdXaWR0aCAgKiAxLjI1O1xyXG5cclxuXHRcdG1vdXNlTW92ZUZ1bmMgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHQvLyBpT1MgdXNlcyB3aW5kb3cuZXZlbnRcclxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcclxuXHRcdFx0XHRlICAgID0gZ2xvYmFsV2luLmV2ZW50O1xyXG5cdFx0XHRcdG5ld1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0XHRcdG5ld1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5ld1ggPSBlLnBhZ2VYO1xyXG5cdFx0XHRcdG5ld1kgPSBlLnBhZ2VZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXJcdG5ld0hlaWdodCA9IHN0YXJ0SGVpZ2h0ICsgKG5ld1kgLSBzdGFydFkpLFxyXG5cdFx0XHRcdG5ld1dpZHRoICA9IHJ0bCA/XHJcblx0XHRcdFx0XHRzdGFydFdpZHRoIC0gKG5ld1ggLSBzdGFydFgpIDpcclxuXHRcdFx0XHRcdHN0YXJ0V2lkdGggKyAobmV3WCAtIHN0YXJ0WCk7XHJcblxyXG5cdFx0XHRpZiAobWF4V2lkdGggPiAwICYmIG5ld1dpZHRoID4gbWF4V2lkdGgpIHtcclxuXHRcdFx0XHRuZXdXaWR0aCA9IG1heFdpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtaW5XaWR0aCA+IDAgJiYgbmV3V2lkdGggPCBtaW5XaWR0aCkge1xyXG5cdFx0XHRcdG5ld1dpZHRoID0gbWluV2lkdGg7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFvcHRpb25zLnJlc2l6ZVdpZHRoKSB7XHJcblx0XHRcdFx0bmV3V2lkdGggPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG1heEhlaWdodCA+IDAgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtaW5IZWlnaHQgPiAwICYmIG5ld0hlaWdodCA8IG1pbkhlaWdodCkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IG1pbkhlaWdodDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIW9wdGlvbnMucmVzaXplSGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChuZXdXaWR0aCB8fCBuZXdIZWlnaHQpIHtcclxuXHRcdFx0XHRiYXNlLmRpbWVuc2lvbnMobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0bW91c2VVcEZ1bmMgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRpZiAoIWlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdGRvbS5oaWRlKGNvdmVyKTtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XHJcblx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0ZG9tLm9mZihnbG9iYWxEb2MsIGVuZEV2ZW50cywgbW91c2VVcEZ1bmMpO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoaWNvbnMgJiYgaWNvbnMuY3JlYXRlKSB7XHJcblx0XHRcdHZhciBpY29uID0gaWNvbnMuY3JlYXRlKCdncmlwJyk7XHJcblx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGdyaXAsIGljb24pO1xyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhncmlwLCAnaGFzLWljb24nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIGdyaXApO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgY292ZXIpO1xyXG5cdFx0ZG9tLmhpZGUoY292ZXIpO1xyXG5cclxuXHRcdGRvbS5vbihncmlwLCAndG91Y2hzdGFydCBtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHQvLyBpT1MgdXNlcyB3aW5kb3cuZXZlbnRcclxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcblx0XHRcdFx0ZSAgICAgID0gZ2xvYmFsV2luLmV2ZW50O1xyXG5cdFx0XHRcdHN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRzdGFydFkgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c3RhcnRYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRzdGFydFkgPSBlLnBhZ2VZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdGFydFdpZHRoICA9IGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xyXG5cdFx0XHRzdGFydEhlaWdodCA9IGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdFx0aXNEcmFnZ2luZyAgPSB0cnVlO1xyXG5cclxuXHRcdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XHJcblx0XHRcdGRvbS5zaG93KGNvdmVyKTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbW91c2VNb3ZlRnVuYyk7XHJcblx0XHRcdGRvbS5vbihnbG9iYWxEb2MsIGVuZEV2ZW50cywgbW91c2VVcEZ1bmMpO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUHJlZml4ZXMgYW5kIHByZWxvYWRzIHRoZSBlbW90aWNvbiBpbWFnZXNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRFbW90aWNvbnMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXJcdGVtb3RpY29ucyA9IG9wdGlvbnMuZW1vdGljb25zO1xyXG5cdFx0dmFyIHJvb3QgICAgICA9IG9wdGlvbnMuZW1vdGljb25zUm9vdCB8fCAnJztcclxuXHJcblx0XHRpZiAoZW1vdGljb25zKSB7XHJcblx0XHRcdGFsbEVtb3RpY29ucyA9IHV0aWxzLmV4dGVuZChcclxuXHRcdFx0XHR7fSwgZW1vdGljb25zLm1vcmUsIGVtb3RpY29ucy5kcm9wZG93biwgZW1vdGljb25zLmhpZGRlblxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCB1cmwpIHtcclxuXHRcdFx0YWxsRW1vdGljb25zW2tleV0gPSBfdG1wbCgnZW1vdGljb24nLCB7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0Ly8gUHJlZml4IGVtb3RpY29uIHJvb3QgdG8gZW1vdGljb24gdXJsc1xyXG5cdFx0XHRcdHVybDogcm9vdCArICh1cmwudXJsIHx8IHVybCksXHJcblx0XHRcdFx0dG9vbHRpcDogdXJsLnRvb2x0aXAgfHwga2V5XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUHJlbG9hZCB0aGUgZW1vdGljb25cclxuXHRcdFx0aWYgKG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCkge1xyXG5cdFx0XHRcdHByZUxvYWRDYWNoZS5wdXNoKGRvbS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IHJvb3QgKyAodXJsLnVybCB8fCB1cmwpXHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBdXRvZm9jdXMgdGhlIGVkaXRvclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0YXV0b2ZvY3VzID0gZnVuY3Rpb24gKGZvY3VzRW5kKSB7XHJcblx0XHR2YXJcdHJhbmdlLCB0eHRQb3MsXHJcblx0XHRcdG5vZGUgPSB3eXNpd3lnQm9keS5maXJzdENoaWxkO1xyXG5cclxuXHRcdC8vIENhbid0IGZvY3VzIGludmlzaWJsZSBlbGVtZW50c1xyXG5cdFx0aWYgKCFkb20uaXNWaXNpYmxlKGVkaXRvckNvbnRhaW5lcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChiYXNlLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0eHRQb3MgPSBmb2N1c0VuZCA/IHNvdXJjZUVkaXRvci52YWx1ZS5sZW5ndGggOiAwO1xyXG5cclxuXHRcdFx0c291cmNlRWRpdG9yLnNldFNlbGVjdGlvblJhbmdlKHR4dFBvcywgdHh0UG9zKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ucmVtb3ZlV2hpdGVTcGFjZSh3eXNpd3lnQm9keSk7XHJcblxyXG5cdFx0aWYgKGZvY3VzRW5kKSB7XHJcblx0XHRcdGlmICghKG5vZGUgPSB3eXNpd3lnQm9keS5sYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0bm9kZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKG5vZGUubGFzdENoaWxkKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUubGFzdENoaWxkO1xyXG5cclxuXHRcdFx0XHQvLyBTaG91bGQgcGxhY2UgdGhlIGN1cnNvciBiZWZvcmUgdGhlIGxhc3QgPGJyPlxyXG5cdFx0XHRcdGlmIChkb20uaXMobm9kZSwgJ2JyJykgJiYgbm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZSA9IHd5c2l3eWdEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRcdGlmICghZG9tLmNhbkhhdmVDaGlsZHJlbihub2RlKSkge1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShub2RlKTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0QWZ0ZXIobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZS5jb2xsYXBzZSghZm9jdXNFbmQpO1xyXG5cdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2UocmFuZ2UpO1xyXG5cdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlO1xyXG5cclxuXHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHR3eXNpd3lnQm9keS5zY3JvbGxUb3AgPSB3eXNpd3lnQm9keS5zY3JvbGxIZWlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0YmFzZS5mb2N1cygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHlcclxuXHQgKlxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSByZWFkT25seVxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSByZWFkT25seVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSByZWFkT25seV4yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiYXNlLnJlYWRPbmx5ID0gZnVuY3Rpb24gKHJlYWRPbmx5KSB7XHJcblx0XHRpZiAodHlwZW9mIHJlYWRPbmx5ICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuICFzb3VyY2VFZGl0b3IucmVhZG9ubHk7XHJcblx0XHR9XHJcblxyXG5cdFx0d3lzaXd5Z0JvZHkuY29udGVudEVkaXRhYmxlID0gIXJlYWRPbmx5O1xyXG5cdFx0c291cmNlRWRpdG9yLnJlYWRvbmx5ID0gIXJlYWRPbmx5O1xyXG5cclxuXHRcdHVwZGF0ZVRvb2xCYXIocmVhZE9ubHkpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBSVEwgbW9kZVxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIHJ0bFxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIFJUTCBtb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBydGxeMlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0YmFzZS5ydGwgPSBmdW5jdGlvbiAocnRsKSB7XHJcblx0XHR2YXIgZGlyID0gcnRsID8gJ3J0bCcgOiAnbHRyJztcclxuXHJcblx0XHRpZiAodHlwZW9mIHJ0bCAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdHJldHVybiBkb20uYXR0cihzb3VyY2VFZGl0b3IsICdkaXInKSA9PT0gJ3J0bCc7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmF0dHIod3lzaXd5Z0JvZHksICdkaXInLCBkaXIpO1xyXG5cdFx0ZG9tLmF0dHIoc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcclxuXHJcblx0XHRkb20ucmVtb3ZlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAncnRsJyk7XHJcblx0XHRkb20ucmVtb3ZlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnbHRyJyk7XHJcblx0XHRkb20uYWRkQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBkaXIpO1xyXG5cclxuXHRcdGlmIChpY29ucyAmJiBpY29ucy5ydGwpIHtcclxuXHRcdFx0aWNvbnMucnRsKHJ0bCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJhc2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdG9vbGJhciB0byBkaXNhYmxlL2VuYWJsZSB0aGUgYXBwcm9wcmlhdGUgYnV0dG9uc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dXBkYXRlVG9vbEJhciA9IGZ1bmN0aW9uIChkaXNhYmxlKSB7XHJcblx0XHR2YXIgbW9kZSA9IGJhc2UuaW5Tb3VyY2VNb2RlKCkgPyAnX3NjZVR4dE1vZGUnIDogJ19zY2VXeXNpd3lnTW9kZSc7XHJcblxyXG5cdFx0dXRpbHMuZWFjaCh0b29sYmFyQnV0dG9ucywgZnVuY3Rpb24gKF8sIGJ1dHRvbikge1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCBkaXNhYmxlIHx8ICFidXR0b25bbW9kZV0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIGVkaXRvciBpbiBwaXhlbHNcclxuXHQgKlxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSB3aWR0aFxyXG5cdCAqIEByZXR1cm4ge251bWJlcn1cclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggV2lkdGggaW4gcGl4ZWxzXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIHdpZHRoXjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdpZHRoIG9mIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIFRoZSBzYXZlV2lkdGggc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIHdpZHRoLiBUaGUgc3RvcmVkIHdpZHRoIGNhbiBiZVxyXG5cdCAqIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tIG1heGltaXplZCBzdGF0ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSAgICAgd2lkdGggICAgICAgICAgICBXaWR0aCBpbiBwaXhlbHNcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZVdpZHRoPXRydWVdIElmIHRvIHN0b3JlIHRoZSB3aWR0aFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSB3aWR0aF4zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiYXNlLndpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBzYXZlV2lkdGgpIHtcclxuXHRcdGlmICghd2lkdGggJiYgd2lkdGggIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2UuZGltZW5zaW9ucyh3aWR0aCwgbnVsbCwgc2F2ZVdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIHdpZHRoIGFuZCBoZWlnaHRcclxuXHQgKiB3aGljaCBhcmUgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGVkaXRvciBpbiBweC5cclxuXHQgKlxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBkaW1lbnNpb25zXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIDxwPlNldHMgdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGVkaXRvci48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiB3aWR0aCBvciBoZWlnaHQgaXMgbm90IG51bWVyaWMgaXQgaXMgaWdub3JlZC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn1cdHdpZHRoXHRXaWR0aCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0aGVpZ2h0XHRIZWlnaHQgaW4gcHhcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgZGltZW5zaW9uc14yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiA8cD5TZXRzIHRoZSB3aWR0aCBhbmQvb3IgaGVpZ2h0IG9mIHRoZSBlZGl0b3IuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgd2lkdGggb3IgaGVpZ2h0IGlzIG5vdCBudW1lcmljIGl0IGlzIGlnbm9yZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHNhdmUgYXJndW1lbnQgc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIG5ldyBzaXplcy5cclxuXHQgKiBUaGUgc2F2ZWQgc2l6ZXMgY2FuIGJlIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tXHJcblx0ICogbWF4aW1pemVkIHN0YXRlLiBUaGlzIHNob3VsZCBub3JtYWxseSBiZSBsZWZ0IGFzIHRydWUuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdHdpZHRoXHRcdFdpZHRoIGluIHB4XHJcblx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdGhlaWdodFx0XHRIZWlnaHQgaW4gcHhcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZT10cnVlXVx0SWYgdG8gc3RvcmUgdGhlIG5ldyBzaXplc1xyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBkaW1lbnNpb25zXjNcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGJhc2UuZGltZW5zaW9ucyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBzYXZlKSB7XHJcblx0XHQvLyBzZXQgdW5kZWZpbmVkIHdpZHRoL2hlaWdodCB0byBib29sZWFuIGZhbHNlXHJcblx0XHR3aWR0aCAgPSAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSA/IGZhbHNlIDogd2lkdGg7XHJcblx0XHRoZWlnaHQgPSAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApID8gZmFsc2UgOiBoZWlnaHQ7XHJcblxyXG5cdFx0aWYgKHdpZHRoID09PSBmYWxzZSAmJiBoZWlnaHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiB7IHdpZHRoOiBiYXNlLndpZHRoKCksIGhlaWdodDogYmFzZS5oZWlnaHQoKSB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh3aWR0aCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyLCB3aWR0aCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhlaWdodCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyLCBoZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yIGluIHB4XHJcblx0ICpcclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgaGVpZ2h0XHJcblx0ICogQHJldHVybiB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBoZWlnaHReMlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXHJcblx0ICpcclxuXHQgKiBUaGUgc3RvcmVkIGhlaWdodCBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2VcclxuXHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBoZWlnaHReM1xyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0YmFzZS5oZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBzYXZlSGVpZ2h0KSB7XHJcblx0XHRpZiAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRiYXNlLmRpbWVuc2lvbnMobnVsbCwgaGVpZ2h0LCBzYXZlSGVpZ2h0KTtcclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIG1heGltaXplXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBtYXhpbWl6ZSBJZiB0byBtYXhpbWlzZSB0aGUgZWRpdG9yXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIG1heGltaXplXjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGJhc2UubWF4aW1pemUgPSBmdW5jdGlvbiAobWF4aW1pemUpIHtcclxuXHRcdHZhciBtYXhpbWl6ZVNpemUgPSAnc2NlZGl0b3ItbWF4aW1pemUnO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1VuZGVmaW5lZChtYXhpbWl6ZSkpIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyhlZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWF4aW1pemUgPSAhIW1heGltaXplO1xyXG5cclxuXHRcdGlmIChtYXhpbWl6ZSkge1xyXG5cdFx0XHRtYXhpbWl6ZVNjcm9sbFBvc2l0aW9uID0gZ2xvYmFsV2luLnBhZ2VZT2Zmc2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS50b2dnbGVDbGFzcyhnbG9iYWxEb2MuZG9jdW1lbnRFbGVtZW50LCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdGRvbS50b2dnbGVDbGFzcyhnbG9iYWxEb2MuYm9keSwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdGJhc2Uud2lkdGgobWF4aW1pemUgPyAnMTAwJScgOiBvcHRpb25zLndpZHRoLCBmYWxzZSk7XHJcblx0XHRiYXNlLmhlaWdodChtYXhpbWl6ZSA/ICcxMDAlJyA6IG9wdGlvbnMuaGVpZ2h0LCBmYWxzZSk7XHJcblxyXG5cdFx0aWYgKCFtYXhpbWl6ZSkge1xyXG5cdFx0XHRnbG9iYWxXaW4uc2Nyb2xsVG8oMCwgbWF4aW1pemVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0YXV0b0V4cGFuZCgpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdGF1dG9FeHBhbmQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAob3B0aW9ucy5hdXRvRXhwYW5kICYmICFhdXRvRXhwYW5kVGhyb3R0bGUpIHtcclxuXHRcdFx0YXV0b0V4cGFuZFRocm90dGxlID0gc2V0VGltZW91dChiYXNlLmV4cGFuZFRvQ29udGVudCwgMjAwKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeHBhbmRzIG9yIHNocmlua3MgdGhlIGVkaXRvcnMgaGVpZ2h0IHRvIHRoZSBoZWlnaHQgb2YgaXQncyBjb250ZW50XHJcblx0ICpcclxuXHQgKiBVbmxlc3MgaWdub3JlTWF4SGVpZ2h0IGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbm90IGV4cGFuZFxyXG5cdCAqIGhpZ2hlciB0aGFuIHRoZSBtYXhIZWlnaHQgb3B0aW9uLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlTWF4SGVpZ2h0PWZhbHNlXVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGV4cGFuZFRvQ29udGVudFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2VlICNyZXNpemVUb0NvbnRlbnRcclxuXHQgKi9cclxuXHRiYXNlLmV4cGFuZFRvQ29udGVudCA9IGZ1bmN0aW9uIChpZ25vcmVNYXhIZWlnaHQpIHtcclxuXHRcdGlmIChiYXNlLm1heGltaXplKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsZWFyVGltZW91dChhdXRvRXhwYW5kVGhyb3R0bGUpO1xyXG5cdFx0YXV0b0V4cGFuZFRocm90dGxlID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCFhdXRvRXhwYW5kQm91bmRzKSB7XHJcblx0XHRcdHZhciBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZU1pbkhlaWdodCB8fCBvcHRpb25zLmhlaWdodCB8fFxyXG5cdFx0XHRcdGRvbS5oZWlnaHQob3JpZ2luYWwpO1xyXG5cclxuXHRcdFx0YXV0b0V4cGFuZEJvdW5kcyA9IHtcclxuXHRcdFx0XHRtaW46IGhlaWdodCxcclxuXHRcdFx0XHRtYXg6IG9wdGlvbnMucmVzaXplTWF4SGVpZ2h0IHx8IChoZWlnaHQgKiAyKVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciByYW5nZSA9IGdsb2JhbERvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHR2YXIgcmVjdCA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0dmFyIGN1cnJlbnQgPSB3eXNpd3lnRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDE7XHJcblx0XHR2YXIgc3BhY2VOZWVkZWQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wO1xyXG5cdFx0dmFyIG5ld0hlaWdodCA9IGJhc2UuaGVpZ2h0KCkgKyAxICsgKHNwYWNlTmVlZGVkIC0gY3VycmVudCk7XHJcblxyXG5cdFx0aWYgKCFpZ25vcmVNYXhIZWlnaHQgJiYgYXV0b0V4cGFuZEJvdW5kcy5tYXggIT09IC0xKSB7XHJcblx0XHRcdG5ld0hlaWdodCA9IE1hdGgubWluKG5ld0hlaWdodCwgYXV0b0V4cGFuZEJvdW5kcy5tYXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2UuaGVpZ2h0KE1hdGguY2VpbChNYXRoLm1heChuZXdIZWlnaHQsIGF1dG9FeHBhbmRCb3VuZHMubWluKSkpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoZSBlZGl0b3IsIHJlbW92aW5nIGFsbCBlbGVtZW50cyBhbmRcclxuXHQgKiBldmVudCBoYW5kbGVycy5cclxuXHQgKlxyXG5cdCAqIExlYXZlcyBvbmx5IHRoZSBvcmlnaW5hbCB0ZXh0YXJlYS5cclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGRlc3Ryb3lcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gRG9uJ3QgZGVzdHJveSBpZiB0aGUgZWRpdG9yIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkXHJcblx0XHRpZiAoIXBsdWdpbk1hbmFnZXIpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBsdWdpbk1hbmFnZXIuZGVzdHJveSgpO1xyXG5cclxuXHRcdHJhbmdlSGVscGVyICAgPSBudWxsO1xyXG5cdFx0cGx1Z2luTWFuYWdlciA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGRyb3Bkb3duKSB7XHJcblx0XHRcdGRvbS5yZW1vdmUoZHJvcGRvd24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCAnY2xpY2snLCBoYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHR2YXIgZm9ybSA9IG9yaWdpbmFsLmZvcm07XHJcblx0XHRpZiAoZm9ybSkge1xyXG5cdFx0XHRkb20ub2ZmKGZvcm0sICdyZXNldCcsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdGRvbS5vZmYoZm9ybSwgJ3N1Ym1pdCcsIGJhc2UudXBkYXRlT3JpZ2luYWwsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub2ZmKHdpbmRvdywgJ3BhZ2VoaWRlJywgYmFzZS51cGRhdGVPcmlnaW5hbCk7XHJcblx0XHRkb20ub2ZmKHdpbmRvdywgJ3BhZ2VzaG93JywgaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5yZW1vdmUoc291cmNlRWRpdG9yKTtcclxuXHRcdGRvbS5yZW1vdmUodG9vbGJhcik7XHJcblx0XHRkb20ucmVtb3ZlKGVkaXRvckNvbnRhaW5lcik7XHJcblxyXG5cdFx0ZGVsZXRlIG9yaWdpbmFsLl9zY2VkaXRvcjtcclxuXHRcdGRvbS5zaG93KG9yaWdpbmFsKTtcclxuXHJcblx0XHRvcmlnaW5hbC5yZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZW51IGl0ZW0gZHJvcCBkb3duXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW0gVGhlIGJ1dHRvbiB0byBhbGlnbiB0aGUgZHJvcGRvd24gd2l0aFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgICAgICAgICBVc2VkIGZvciBzdHlsaW5nIHRoZSBkcm9wZG93biwgd2lsbCBiZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGNsYXNzIHNjZWRpdG9yLW5hbWVcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udGVudCAgVGhlIEhUTUwgY29udGVudCBvZiB0aGUgZHJvcGRvd25cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjcmVhdGVEcm9wRG93blxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmNyZWF0ZURyb3BEb3duID0gZnVuY3Rpb24gKG1lbnVJdGVtLCBuYW1lLCBjb250ZW50KSB7XHJcblx0XHQvLyBmaXJzdCBjbGljayBmb3IgY3JlYXRlIHNlY29uZCBjbGljayBmb3IgY2xvc2VcclxuXHRcdHZhclx0ZHJvcERvd25Dc3MsXHJcblx0XHRcdGRyb3BEb3duQ2xhc3MgPSAnc2NlZGl0b3ItJyArIG5hbWU7XHJcblxyXG5cdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblxyXG5cdFx0Ly8gT25seSBjbG9zZSB0aGUgZHJvcGRvd24gaWYgaXQgd2FzIGFscmVhZHkgb3BlblxyXG5cdFx0aWYgKGRyb3Bkb3duICYmIGRvbS5oYXNDbGFzcyhkcm9wZG93biwgZHJvcERvd25DbGFzcykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRyb3BEb3duQ3NzID0gdXRpbHMuZXh0ZW5kKHtcclxuXHRcdFx0dG9wOiBtZW51SXRlbS5vZmZzZXRUb3AsXHJcblx0XHRcdGxlZnQ6IG1lbnVJdGVtLm9mZnNldExlZnQsXHJcblx0XHRcdG1hcmdpblRvcDogbWVudUl0ZW0uY2xpZW50SGVpZ2h0XHJcblx0XHR9LCBvcHRpb25zLmRyb3BEb3duQ3NzKTtcclxuXHJcblx0XHRkcm9wZG93biA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLWRyb3Bkb3duICcgKyBkcm9wRG93bkNsYXNzXHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20uY3NzKGRyb3Bkb3duLCBkcm9wRG93bkNzcyk7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQoZHJvcGRvd24sIGNvbnRlbnQpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgZHJvcGRvd24pO1xyXG5cdFx0ZG9tLm9uKGRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdC8vIHN0b3AgY2xpY2tzIHdpdGhpbiB0aGUgZHJvcGRvd24gZnJvbSBiZWluZyBoYW5kbGVkXHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoZHJvcGRvd24pIHtcclxuXHRcdFx0dmFyIGZpcnN0ID0gZG9tLmZpbmQoZHJvcGRvd24sICdpbnB1dCx0ZXh0YXJlYScpWzBdO1xyXG5cdFx0XHRpZiAoZmlyc3QpIHtcclxuXHRcdFx0XHRmaXJzdC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkgZG9jdW1lbnQgY2xpY2sgYW5kIGNsb3NlcyB0aGUgZHJvcGRvd24gaWYgb3BlblxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlRG9jdW1lbnRDbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvLyBpZ25vcmUgcmlnaHQgY2xpY2tzXHJcblx0XHRpZiAoZS53aGljaCAhPT0gMyAmJiBkcm9wZG93biAmJiAhZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdGF1dG9VcGRhdGUoKTtcclxuXHJcblx0XHRcdGJhc2UuY2xvc2VEcm9wRG93bigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjdXQgJiBjb3B5IGV2ZW50c1xyXG5cdCAqXHJcblx0ICogQnkgZGVmYXVsdCBicm93c2VycyBhbHNvIGNvcHkgaW5oZXJpdGVkIHN0eWxpbmcgZnJvbSB0aGUgc3R5bGVzaGVldCBhbmRcclxuXHQgKiBicm93c2VyIGRlZmF1bHQgc3R5bGluZyB3aGljaCBpcyB1bm5lY2Vzc2FyeS5cclxuXHQgKlxyXG5cdCAqIFRoaXMgd2lsbCBpZ25vcmUgaW5oZXJpdGVkIHN0eWxlcyBhbmQgb25seSBjb3B5IGlubGluZSBzdHlsaW5nLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlQ3V0Q29weUV2dCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgcmFuZ2UgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0dmFyIGNvbnRhaW5lciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0dmFyIGZpcnN0UGFyZW50O1xyXG5cclxuXHRcdFx0Ly8gQ29weSBhbGwgaW5saW5lIHBhcmVudCBub2RlcyB1cCB0byB0aGUgZmlyc3QgYmxvY2sgcGFyZW50IHNvIGNhblxyXG5cdFx0XHQvLyBjb3B5IGlubGluZSBzdHlsZXNcclxuXHRcdFx0dmFyIHBhcmVudCA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xyXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0aWYgKHBhcmVudC5ub2RlVHlwZSA9PT0gZG9tLkVMRU1FTlRfTk9ERSkge1xyXG5cdFx0XHRcdFx0dmFyIGNsb25lID0gcGFyZW50LmNsb25lTm9kZSgpO1xyXG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjbG9uZSwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250YWluZXIsIGNsb25lKTtcclxuXHRcdFx0XHRcdGZpcnN0UGFyZW50ID0gZmlyc3RQYXJlbnQgfHwgY2xvbmU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZmlyc3RQYXJlbnQgfHwgY29udGFpbmVyLCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG5cdFx0XHRkb20ucmVtb3ZlV2hpdGVTcGFjZShjb250YWluZXIpO1xyXG5cclxuXHRcdFx0ZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvaHRtbCcsIGNvbnRhaW5lci5pbm5lckhUTUwpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogUmVmYWN0b3IgaW50byBwcml2YXRlIHNoYXJlZCBtb2R1bGUgd2l0aCBwbGFpbnRleHQgcGx1Z2luXHJcblx0XHRcdC8vIGlubmVyVGV4dCBhZGRzIHR3byBuZXdsaW5lcyBhZnRlciA8cD4gdGFncyBzbyBjb252ZXJ0IHRoZW0gdG9cclxuXHRcdFx0Ly8gPGRpdj4gdGFnc1xyXG5cdFx0XHR1dGlscy5lYWNoKGRvbS5maW5kKGNvbnRhaW5lciwgJ3AnKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xyXG5cdFx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChlbG0sICdkaXYnKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdC8vIFJlbW92ZSBjb2xsYXBzZWQgPGJyPiB0YWdzIGFzIGlubmVyVGV4dCBjb252ZXJ0cyB0aGVtIHRvIG5ld2xpbmVzXHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAnYnInKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xyXG5cdFx0XHRcdGlmICghZWxtLm5leHRTaWJsaW5nIHx8ICFkb20uaXNJbmxpbmUoZWxtLm5leHRTaWJsaW5nLCB0cnVlKSkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShlbG0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyByYW5nZS50b1N0cmluZygpIGRvZXNuJ3QgaW5jbHVkZSBuZXdsaW5lcyBzbyBjYW4ndCB1c2UgdGhhdC5cclxuXHRcdFx0Ly8gc2VsZWN0aW9uLnRvU3RyaW5nKCkgc2VlbXMgdG8gdXNlIHRoZSBzYW1lIG1ldGhvZCBhcyBpbm5lclRleHRcclxuXHRcdFx0Ly8gYnV0IG5lZWRzIHRvIGJlIG5vcm1hbGlzZWQgZmlyc3Qgc28gdXNpbmcgY29udGFpbmVyLmlubmVyVGV4dFxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIGNvbnRhaW5lcik7XHJcblx0XHRcdGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L3BsYWluJywgY29udGFpbmVyLmlubmVyVGV4dCk7XHJcblx0XHRcdGRvbS5yZW1vdmUoY29udGFpbmVyKTtcclxuXHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICdjdXQnKSB7XHJcblx0XHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBwYXN0ZSBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlUGFzdGVFdnQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIGVkaXRhYmxlID0gd3lzaXd5Z0JvZHk7XHJcblx0XHR2YXIgY2xpcGJvYXJkID0gZS5jbGlwYm9hcmREYXRhO1xyXG5cdFx0dmFyIGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChmaWxlKSB7XHJcblx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRoYW5kbGVQYXN0ZURhdGEoe1xyXG5cdFx0XHRcdFx0aHRtbDogJzxpbWcgc3JjPVwiJyArIGUudGFyZ2V0LnJlc3VsdCArICdcIiAvPidcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE1vZGVybiBicm93c2VycyB3aXRoIGNsaXBib2FyZCBBUEkgLSBldmVyeXRoaW5nIG90aGVyIHRoYW4gX3ZlcnlfXHJcblx0XHQvLyBvbGQgYW5kcm9pZCB3ZWIgdmlld3MgYW5kIFVDIGJyb3dzZXIgd2hpY2ggZG9lc24ndCBzdXBwb3J0IHRoZVxyXG5cdFx0Ly8gcGFzdGUgZXZlbnQgYXQgYWxsLlxyXG5cdFx0aWYgKGNsaXBib2FyZCkge1xyXG5cdFx0XHR2YXIgZGF0YSA9IHt9O1xyXG5cdFx0XHR2YXIgdHlwZXMgPSBjbGlwYm9hcmQudHlwZXM7XHJcblx0XHRcdHZhciBpdGVtcyA9IGNsaXBib2FyZC5pdGVtcztcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHQvLyBXb3JkIHNvbWV0aW1lcyBhZGRzIGNvcGllZCB0ZXh0IGFzIGFuIGltYWdlIHNvIGlmIEhUTUxcclxuXHRcdFx0XHQvLyBleGlzdHMgcHJlZmVyIHRoYXQgb3ZlciBpbWFnZXNcclxuXHRcdFx0XHRpZiAodHlwZXMuaW5kZXhPZigndGV4dC9odG1sJykgPCAwKSB7XHJcblx0XHRcdFx0XHQvLyBOb3JtYWxpc2UgaW1hZ2UgcGFzdGluZyB0byBwYXN0ZSBhcyBhIGRhdGEtdXJpXHJcblx0XHRcdFx0XHRpZiAoZ2xvYmFsV2luLkZpbGVSZWFkZXIgJiYgaXRlbXMgJiZcclxuXHRcdFx0XHRcdFx0SU1BR0VfTUlNRV9SRUdFWC50ZXN0KGl0ZW1zW2ldLnR5cGUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBsb2FkSW1hZ2UoY2xpcGJvYXJkLml0ZW1zW2ldLmdldEFzRmlsZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRhdGFbdHlwZXNbaV1dID0gY2xpcGJvYXJkLmdldERhdGEodHlwZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIENhbGwgcGx1Z2lucyBoZXJlIHdpdGggZmlsZT9cclxuXHRcdFx0ZGF0YS50ZXh0ID0gZGF0YVsndGV4dC9wbGFpbiddO1xyXG5cdFx0XHRkYXRhLmh0bWwgPSBzYW5pdGl6ZShkYXRhWyd0ZXh0L2h0bWwnXSk7XHJcblxyXG5cdFx0XHRoYW5kbGVQYXN0ZURhdGEoZGF0YSk7XHJcblx0XHQvLyBJZiBjb250ZW50c0ZyYWdtZW50IGV4aXN0cyB0aGVuIHdlIGFyZSBhbHJlYWR5IHdhaXRpbmcgZm9yIGFcclxuXHRcdC8vIHByZXZpb3VzIHBhc3RlIHNvIGxldCB0aGUgaGFuZGxlciBmb3IgdGhhdCBoYW5kbGUgdGhpcyBvbmUgdG9vXHJcblx0XHR9IGVsc2UgaWYgKCFwYXN0ZUNvbnRlbnRGcmFnbWVudCkge1xyXG5cdFx0XHQvLyBTYXZlIHRoZSBzY3JvbGwgcG9zaXRpb24gc28gY2FuIGJlIHJlc3RvcmVkXHJcblx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9IGVkaXRhYmxlLnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cclxuXHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBnbG9iYWxEb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHR3aGlsZSAoZWRpdGFibGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChwYXN0ZUNvbnRlbnRGcmFnbWVudCwgZWRpdGFibGUuZmlyc3RDaGlsZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBodG1sID0gZWRpdGFibGUuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdGFibGUsIHBhc3RlQ29udGVudEZyYWdtZW50KTtcclxuXHRcdFx0XHRlZGl0YWJsZS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcblx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdGhhbmRsZVBhc3RlRGF0YSh7IGh0bWw6IHNhbml0aXplKGh0bWwpIH0pO1xyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBwYXN0ZWQgZGF0YSwgZmlsdGVycyBpdCBhbmQgdGhlbiBpbnNlcnRzIGl0LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRoYW5kbGVQYXN0ZURhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0dmFyIHBhc3RlQXJlYSA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHJcblx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlUmF3JywgZGF0YSk7XHJcblx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdwYXN0ZXJhdycsIGRhdGEpO1xyXG5cclxuXHRcdGlmIChkYXRhLmh0bWwpIHtcclxuXHRcdFx0Ly8gU2FuaXRpemUgYWdhaW4gaW4gY2FzZSBwbHVnaW5zIG1vZGlmaWVkIHRoZSBIVE1MXHJcblx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBzYW5pdGl6ZShkYXRhLmh0bWwpO1xyXG5cclxuXHRcdFx0Ly8gZml4IGFueSBpbnZhbGlkIG5lc3RpbmdcclxuXHRcdFx0ZG9tLmZpeE5lc3RpbmcocGFzdGVBcmVhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBlc2NhcGUuZW50aXRpZXMoZGF0YS50ZXh0IHx8ICcnKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcGFzdGUgPSB7XHJcblx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRwYXN0ZS52YWwgPSBmb3JtYXRcclxuXHRcdFx0XHQuZnJhZ21lbnRUb1NvdXJjZShwYXN0ZS52YWwsIHd5c2l3eWdEb2N1bWVudCwgY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGUnLCBwYXN0ZSk7XHJcblx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0cGFzdGUudmFsID0gZm9ybWF0XHJcblx0XHRcdFx0LmZyYWdtZW50VG9IdG1sKHBhc3RlLnZhbCwgY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGVIdG1sJywgcGFzdGUpO1xyXG5cclxuXHRcdHZhciBwYXJlbnQgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblx0XHRiYXNlLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKHBhc3RlLnZhbCwgbnVsbCwgdHJ1ZSk7XHJcblx0XHRkb20ubWVyZ2UocGFyZW50KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDbG9zZXMgYW55IGN1cnJlbnRseSBvcGVuIGRyb3AgZG93blxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbZm9jdXM9ZmFsc2VdIElmIHRvIGZvY3VzIHRoZSBlZGl0b3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgY2xvc2luZyB0aGUgZHJvcCBkb3duXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY2xvc2VEcm9wRG93blxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmNsb3NlRHJvcERvd24gPSBmdW5jdGlvbiAoZm9jdXMpIHtcclxuXHRcdGlmIChkcm9wZG93bikge1xyXG5cdFx0XHRkb20ucmVtb3ZlKGRyb3Bkb3duKTtcclxuXHRcdFx0ZHJvcGRvd24gPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChmb2N1cyA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRiYXNlLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEluc2VydHMgSFRNTCBpbnRvIFdZU0lXWUcgZWRpdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgZW5kSHRtbCBpcyBzcGVjaWZpZWQsIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkXHJcblx0ICogYmV0d2VlbiBodG1sIGFuZCBlbmRIdG1sLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IGh0bWxcclxuXHQgKiBhbmQgZW5kSHRtbCB3aWxsIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kSHRtbD1udWxsXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW292ZXJyaWRlQ29kZUJsb2NraW5nPWZhbHNlXSBJZiB0byBpbnNlcnQgdGhlIGh0bWxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50byBjb2RlIHRhZ3MsIGJ5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgY29kZSB0YWdzIG9ubHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCB0ZXh0LlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwgPSBmdW5jdGlvbiAoXHJcblx0XHRodG1sLCBlbmRIdG1sLCBvdmVycmlkZUNvZGVCbG9ja2luZ1xyXG5cdCkge1xyXG5cdFx0dmFyXHRtYXJrZXIsIHNjcm9sbFRvcCwgc2Nyb2xsVG8sXHJcblx0XHRcdGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQod3lzaXd5Z0VkaXRvcik7XHJcblxyXG5cdFx0YmFzZS5mb2N1cygpO1xyXG5cclxuXHRcdC8vIFRPRE86IFRoaXMgY29kZSB0YWcgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSBhbmRcclxuXHRcdC8vIHNob3VsZCBtYXliZSBjb252ZXJ0IHRoZSBIVE1MIGludG8gdGV4dCBpbnN0ZWFkXHJcblx0XHQvLyBEb24ndCBhcHBseSB0byBjb2RlIGVsZW1lbnRzXHJcblx0XHRpZiAoIW92ZXJyaWRlQ29kZUJsb2NraW5nICYmIGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEluc2VydCB0aGUgSFRNTCBhbmQgc2F2ZSB0aGUgcmFuZ2Ugc28gdGhlIGVkaXRvciBjYW4gYmUgc2Nyb2xsZWRcclxuXHRcdC8vIHRvIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvbi4gQWxzbyBhbGxvd3MgZW1vdGljb25zIHRvIGJlIHJlcGxhY2VkXHJcblx0XHQvLyB3aXRob3V0IGFmZmVjdGluZyB0aGUgY3Vyc29yIHBvc2l0aW9uXHJcblx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKGh0bWwsIGVuZEh0bWwpO1xyXG5cdFx0cmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblxyXG5cdFx0Ly8gRml4IGFueSBpbnZhbGlkIG5lc3RpbmcsIGUuZy4gaWYgYSBxdW90ZSBvciBvdGhlciBibG9jayBpcyBpbnNlcnRlZFxyXG5cdFx0Ly8gaW50byBhIHBhcmFncmFwaFxyXG5cdFx0ZG9tLmZpeE5lc3Rpbmcod3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdHdyYXBJbmxpbmVzKHd5c2l3eWdCb2R5LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdC8vIFNjcm9sbCB0aGUgZWRpdG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvblxyXG5cdFx0bWFya2VyICAgPSBkb20uZmluZCh3eXNpd3lnQm9keSwgJyNzY2VkaXRvci1lbmQtbWFya2VyJylbMF07XHJcblx0XHRkb20uc2hvdyhtYXJrZXIpO1xyXG5cdFx0c2Nyb2xsVG9wID0gd3lzaXd5Z0JvZHkuc2Nyb2xsVG9wO1xyXG5cdFx0c2Nyb2xsVG8gID0gKGRvbS5nZXRPZmZzZXQobWFya2VyKS50b3AgK1xyXG5cdFx0XHQobWFya2VyLm9mZnNldEhlaWdodCAqIDEuNSkpIC0gZWRpdG9ySGVpZ2h0O1xyXG5cdFx0ZG9tLmhpZGUobWFya2VyKTtcclxuXHJcblx0XHQvLyBPbmx5IHNjcm9sbCBpZiBtYXJrZXIgaXNuJ3QgYWxyZWFkeSB2aXNpYmxlXHJcblx0XHRpZiAoc2Nyb2xsVG8gPiBzY3JvbGxUb3AgfHwgc2Nyb2xsVG8gKyBlZGl0b3JIZWlnaHQgPCBzY3JvbGxUb3ApIHtcclxuXHRcdFx0d3lzaXd5Z0JvZHkuc2Nyb2xsVG9wID0gc2Nyb2xsVG87XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XHJcblx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHJcblx0XHQvLyBBZGQgYSBuZXcgbGluZSBhZnRlciB0aGUgbGFzdCBibG9jayBlbGVtZW50XHJcblx0XHQvLyBzbyBjYW4gYWx3YXlzIGFkZCB0ZXh0IGFmdGVyIGl0XHJcblx0XHRhcHBlbmROZXdMaW5lKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBleGNlcHQgaXQgd2lsbCBjb252ZXJ0IGFueSBIVE1MXHJcblx0ICogaW50byB0ZXh0IGJlZm9yZSBpbnNlcnRpbmcgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0XHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dCwgZW5kVGV4dCkge1xyXG5cdFx0YmFzZS53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcclxuXHRcdFx0ZXNjYXBlLmVudGl0aWVzKHRleHQpLCBlc2NhcGUuZW50aXRpZXMoZW5kVGV4dClcclxuXHRcdCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5zZXJ0cyB0ZXh0IGludG8gdGhlIFdZU0lXWUcgb3Igc291cmNlIGVkaXRvciBkZXBlbmRpbmcgb24gd2hpY2hcclxuXHQgKiBtb2RlIHRoZSBlZGl0b3IgaXMgaW4uXHJcblx0ICpcclxuXHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBpbnNlcnRUZXh0XHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UuaW5zZXJ0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBlbmRUZXh0KSB7XHJcblx0XHRpZiAoYmFzZS5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRiYXNlLnNvdXJjZUVkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRiYXNlLnd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQsIGVuZFRleHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgYnV0IGluc2VydHMgdGV4dCBpbnRvIHRoZVxyXG5cdCAqIHNvdXJjZSBtb2RlIGVkaXRvciBpbnN0ZWFkLlxyXG5cdCAqXHJcblx0ICogSWYgZW5kVGV4dCBpcyBzcGVjaWZpZWQgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWQgYmV0d2VlblxyXG5cdCAqIHRleHQgYW5kIGVuZFRleHQuIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQgdGV4dCBhbmQgZW5kVGV4dCB3aWxsXHJcblx0ICoganVzdCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHQgKlxyXG5cdCAqIFRoZSBjdXJzb3Igd2lsbCBiZSBwbGFjZWQgYWZ0ZXIgdGhlIHRleHQgcGFyYW0uIElmIGVuZFRleHQgaXNcclxuXHQgKiBzcGVjaWZpZWQgdGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBiZWZvcmUgZW5kVGV4dCwgc28gcGFzc2luZzo8YnIgLz5cclxuXHQgKlxyXG5cdCAqICdbYl0nLCAnWy9iXSdcclxuXHQgKlxyXG5cdCAqIFdvdWxkIGNhdXNlIHRoZSBjdXJzb3IgdG8gYmUgcGxhY2VkOjxiciAvPlxyXG5cdCAqXHJcblx0ICogW2JdU2VsZWN0ZWQgdGV4dHxbL2JdXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNvdXJjZUVkaXRvckluc2VydFRleHRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0ID0gZnVuY3Rpb24gKHRleHQsIGVuZFRleHQpIHtcclxuXHRcdHZhciBzY3JvbGxUb3AsIGN1cnJlbnRWYWx1ZSxcclxuXHRcdFx0c3RhcnRQb3MgPSBzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQsXHJcblx0XHRcdGVuZFBvcyAgID0gc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZDtcclxuXHJcblx0XHRzY3JvbGxUb3AgPSBzb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wO1xyXG5cdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHRjdXJyZW50VmFsdWUgPSBzb3VyY2VFZGl0b3IudmFsdWU7XHJcblxyXG5cdFx0aWYgKGVuZFRleHQpIHtcclxuXHRcdFx0dGV4dCArPSBjdXJyZW50VmFsdWUuc3Vic3RyaW5nKHN0YXJ0UG9zLCBlbmRQb3MpICsgZW5kVGV4dDtcclxuXHRcdH1cclxuXHJcblx0XHRzb3VyY2VFZGl0b3IudmFsdWUgPSBjdXJyZW50VmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArXHJcblx0XHRcdHRleHQgK1xyXG5cdFx0XHRjdXJyZW50VmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcblxyXG5cdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gKHN0YXJ0UG9zICsgdGV4dC5sZW5ndGgpIC1cclxuXHRcdFx0KGVuZFRleHQgPyBlbmRUZXh0Lmxlbmd0aCA6IDApO1xyXG5cdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZCA9IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydDtcclxuXHJcblx0XHRzb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhlIHJhbmdlSGVscGVyIGNsYXNzXHJcblx0ICogZm9yIHRoZSBlZGl0b3IuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtSYW5nZUhlbHBlcn1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBnZXRSYW5nZUhlbHBlclxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldFJhbmdlSGVscGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHJhbmdlSGVscGVyO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgc291cmNlIGVkaXRvciBjYXJldCBwb3NpdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcG9zaXRpb25dXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjVcclxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JDYXJldFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnNvdXJjZUVkaXRvckNhcmV0ID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcblx0XHRzb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gcG9zaXRpb24uc3RhcnQ7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmQgPSBwb3NpdGlvbi5lbmQ7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGFydDogc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIHRoZSBlZGl0b3IgaXMgaW4gV1lTSVdZRyBtb2RlIGl0IHdpbGwgcmV0dXJuIHRoZSBmaWx0ZXJlZFxyXG5cdCAqIEhUTUwgZnJvbSBpdCAoY29udmVydGVkIHRvIEJCQ29kZSBpZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpbikuXHJcblx0ICogSXQgaXQncyBpbiBTb3VyY2UgTW9kZSBpdCB3aWxsIHJldHVybiB0aGUgdW5maWx0ZXJlZCBjb250ZW50c1xyXG5cdCAqIG9mIHRoZSBzb3VyY2UgZWRpdG9yIChpZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpbiB0aGlzIHdpbGwgYmVcclxuXHQgKiBCQkNvZGUgYWdhaW4pLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHZhbFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZWRpdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgZmlsdGVyIHNldCB0cnVlIHRoZSB2YWwgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyXHJcblx0ICogZnVuY3Rpb24uIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luIGl0IHdpbGwgcGFzcyB0aGUgdmFsIHRvXHJcblx0ICogdGhlIEJCQ29kZSBmaWx0ZXIgdG8gY29udmVydCBhbnkgQkJDb2RlIGludG8gSFRNTC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHZhbF4yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UudmFsID0gZnVuY3Rpb24gKHZhbCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcclxuXHRcdFx0cmV0dXJuIGJhc2UuaW5Tb3VyY2VNb2RlKCkgP1xyXG5cdFx0XHRcdGJhc2UuZ2V0U291cmNlRWRpdG9yVmFsdWUoZmFsc2UpIDpcclxuXHRcdFx0XHRiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZShmaWx0ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghYmFzZS5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHR2YWwgPSBmb3JtYXQudG9IdG1sKHZhbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGJhc2Uuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRiYXNlLnNldFNvdXJjZUVkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJhc2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5zZXJ0cyBIVE1ML0JCQ29kZSBpbnRvIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIElmIGVuZCBpcyBzdXBwbGllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogc3RhcnQgYW5kIGVuZC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBzdGFydCBhbmQgZW5kXHJcblx0ICogd2lsbCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHQgKlxyXG5cdCAqIElmIHRoZSBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIHRydWUsIHRoZSBIVE1ML0JCQ29kZSB3aWxsIGJlXHJcblx0ICogcGFzc2VkIHRocm91Z2ggYW55IHBsdWdpbiBmaWx0ZXJzLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIHRoaXMgd2lsbCBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmQ9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtjb252ZXJ0RW1vdGljb25zPXRydWVdIElmIHRvIGNvbnZlcnQgZW1vdGljb25zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBpbnNlcnRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogSW5zZXJ0cyBIVE1ML0JCQ29kZSBpbnRvIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIElmIGVuZCBpcyBzdXBwbGllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogc3RhcnQgYW5kIGVuZC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBzdGFydCBhbmQgZW5kXHJcblx0ICogd2lsbCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHQgKlxyXG5cdCAqIElmIHRoZSBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIHRydWUsIHRoZSBIVE1ML0JCQ29kZSB3aWxsIGJlXHJcblx0ICogcGFzc2VkIHRocm91Z2ggYW55IHBsdWdpbiBmaWx0ZXJzLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIHRoaXMgd2lsbCBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxyXG5cdCAqXHJcblx0ICogSWYgdGhlIGFsbG93TWl4ZWQgcGFyYW0gaXMgc2V0IHRvIHRydWUsIEhUTUwgYW55IHdpbGwgbm90IGJlXHJcblx0ICogZXNjYXBlZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmQ9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtjb252ZXJ0RW1vdGljb25zPXRydWVdIElmIHRvIGNvbnZlcnQgZW1vdGljb25zXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbYWxsb3dNaXhlZD1mYWxzZV1cclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluc2VydF4yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcblx0YmFzZS5pbnNlcnQgPSBmdW5jdGlvbiAoXHJcblx0XHRzdGFydCwgZW5kLCBmaWx0ZXIsIGNvbnZlcnRFbW90aWNvbnMsIGFsbG93TWl4ZWRcclxuXHQpIHtcclxuXHRcdGlmIChiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdGJhc2Uuc291cmNlRWRpdG9ySW5zZXJ0VGV4dChzdGFydCwgZW5kKTtcclxuXHRcdFx0cmV0dXJuIGJhc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBzZWxlY3Rpb24gYmV0d2VlbiBzdGFydCBhbmQgZW5kXHJcblx0XHRpZiAoZW5kKSB7XHJcblx0XHRcdHZhclx0aHRtbCA9IHJhbmdlSGVscGVyLnNlbGVjdGVkSHRtbCgpO1xyXG5cclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdGh0bWwgPSBmb3JtYXRcclxuXHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKGh0bWwsIHd5c2l3eWdEb2N1bWVudCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdGFydCArPSBodG1sICsgZW5kO1xyXG5cdFx0fVxyXG5cdFx0Ly8gVE9ETzogVGhpcyBmaWx0ZXIgc2hvdWxkIGFsbG93IGVtcHR5IHRhZ3MgYXMgaXQncyBpbnNlcnRpbmcuXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb0h0bWwnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRzdGFydCA9IGZvcm1hdC5mcmFnbWVudFRvSHRtbChzdGFydCwgY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgYW55IGVzY2FwZWQgSFRNTCBiYWNrIGludG8gSFRNTCBpZiBtaXhlZCBpcyBhbGxvd2VkXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiBhbGxvd01peGVkID09PSB0cnVlKSB7XHJcblx0XHRcdHN0YXJ0ID0gc3RhcnQucmVwbGFjZSgvJmx0Oy9nLCAnPCcpXHJcblx0XHRcdFx0LnJlcGxhY2UoLyZndDsvZywgJz4nKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoc3RhcnQpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBIVE1MIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogSWYgdXNpbmcgYSBwbHVnaW4gdGhhdCBmaWx0ZXJzIHRoZSBIdCBNbCBsaWtlIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogaXQgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlsdGVyaW5nIChCQkNvZGUpIHVubGVzcyB0aGVcclxuXHQgKiBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIGZhbHNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGdldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcclxuXHRcdHZhclx0aHRtbDtcclxuXHRcdC8vIENyZWF0ZSBhIHRtcCBub2RlIHRvIHN0b3JlIGNvbnRlbnRzIHNvIGl0IGNhbiBiZSBtb2RpZmllZFxyXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgYW55dGhpbmcgZWxzZS5cclxuXHRcdHZhciB0bXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHd5c2l3eWdCb2R5LmNoaWxkTm9kZXM7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0bXAsIGNoaWxkTm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIHRtcCk7XHJcblx0XHRkb20uZml4TmVzdGluZyh0bXApO1xyXG5cdFx0ZG9tLnJlbW92ZSh0bXApO1xyXG5cclxuXHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xyXG5cclxuXHRcdC8vIGZpbHRlciB0aGUgSFRNTCBhbmQgRE9NIHRocm91Z2ggYW55IHBsdWdpbnNcclxuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXQsICd0b1NvdXJjZScpKSB7XHJcblx0XHRcdGh0bWwgPSBmb3JtYXQudG9Tb3VyY2UoaHRtbCwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaHRtbDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Qm9keVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldEJvZHkgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gd3lzaXd5Z0JvZHk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgV1lTSVdZRyBlZGl0b3JzIGNvbnRhaW5lciBhcmVhICh3aG9sZSBpRnJhbWUpLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Q29udGVudEFyZWFDb250YWluZXJcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5nZXRDb250ZW50QXJlYUNvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB3eXNpd3lnRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0ICpcclxuXHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIHRleHQgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyB3aGljaCBpcyBCQkNvZGUgdG9cclxuXHQgKiBIVE1MIHNvIGl0IHdpbGwgcmV0dXJuIEhUTUwuIElmIGZpbHRlciBpcyBzZXQgdG8gZmFsc2UgaXQgd2lsbFxyXG5cdCAqIGp1c3QgcmV0dXJuIHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIGVkaXRvciAoQkJDb2RlKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjBcclxuXHQgKiBAbmFtZSBnZXRTb3VyY2VFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldFNvdXJjZUVkaXRvclZhbHVlID0gZnVuY3Rpb24gKGZpbHRlcikge1xyXG5cdFx0dmFyIHZhbCA9IHNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0dmFsID0gZm9ybWF0LnRvSHRtbCh2YWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWw7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgV1lTSVdZRyBIVE1MIGVkaXRvciB2YWx1ZS4gU2hvdWxkIG9ubHkgYmUgdGhlIEhUTUxcclxuXHQgKiBjb250YWluZWQgd2l0aGluIHRoZSBib2R5IHRhZ3NcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnNldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0aWYgKCF2YWx1ZSkge1xyXG5cdFx0XHR2YWx1ZSA9ICc8cD48YnIgLz48L3A+JztcclxuXHRcdH1cclxuXHJcblx0XHR3eXNpd3lnQm9keS5pbm5lckhUTUwgPSBzYW5pdGl6ZSh2YWx1ZSk7XHJcblx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblxyXG5cdFx0YXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0YXV0b0V4cGFuZCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBzZXRTb3VyY2VFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnNldFNvdXJjZUVkaXRvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRzb3VyY2VFZGl0b3IudmFsdWUgPSB2YWx1ZTtcclxuXHJcblx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdGV4dGFyZWEgdGhhdCB0aGUgZWRpdG9yIGlzIHJlcGxhY2luZ1xyXG5cdCAqIHdpdGggdGhlIHZhbHVlIGN1cnJlbnRseSBpbnNpZGUgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHVwZGF0ZU9yaWdpbmFsXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UudXBkYXRlT3JpZ2luYWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRvcmlnaW5hbC52YWx1ZSA9IGJhc2UudmFsKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgYW55IGVtb3RpY29uIGNvZGVzIGluIHRoZSBwYXNzZWQgSFRNTFxyXG5cdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRyZXBsYWNlRW1vdGljb25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCkge1xyXG5cdFx0XHRlbW90aWNvbnNcclxuXHRcdFx0XHQucmVwbGFjZSh3eXNpd3lnQm9keSwgYWxsRW1vdGljb25zLCBvcHRpb25zLmVtb3RpY29uc0NvbXBhdCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2UgY29kZSBtb2RlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluU291cmNlTW9kZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmluU291cmNlTW9kZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb20uaGFzQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGJvb2xlYW5cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBzb3VyY2VNb2RlXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlTW9kZV4yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2Uuc291cmNlTW9kZSA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuXHRcdHZhciBpblNvdXJjZU1vZGUgPSBiYXNlLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgZW5hYmxlICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuIGluU291cmNlTW9kZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoKGluU291cmNlTW9kZSAmJiAhZW5hYmxlKSB8fCAoIWluU291cmNlTW9kZSAmJiBlbmFibGUpKSB7XHJcblx0XHRcdGJhc2UudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdGhlIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2Rlc1xyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgdG9nZ2xlU291cmNlTW9kZVxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnRvZ2dsZVNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaXNJblNvdXJjZU1vZGUgPSBiYXNlLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdC8vIGRvbid0IGFsbG93IHN3aXRjaGluZyB0byBXWVNJV1lHIGlmIGRvZXNuJ3Qgc3VwcG9ydCBpdFxyXG5cdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCAmJiBpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0cmFuZ2VIZWxwZXIuY2xlYXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcclxuXHRcdGJhc2UuYmx1cigpO1xyXG5cclxuXHRcdGlmIChpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRiYXNlLnNldFd5c2l3eWdFZGl0b3JWYWx1ZShiYXNlLmdldFNvdXJjZUVkaXRvclZhbHVlKCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YmFzZS5zZXRTb3VyY2VFZGl0b3JWYWx1ZShiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20udG9nZ2xlKHNvdXJjZUVkaXRvcik7XHJcblx0XHRkb20udG9nZ2xlKHd5c2l3eWdFZGl0b3IpO1xyXG5cclxuXHRcdGRvbS50b2dnbGVDbGFzcyhlZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScsIGlzSW5Tb3VyY2VNb2RlKTtcclxuXHRcdGRvbS50b2dnbGVDbGFzcyhlZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJywgIWlzSW5Tb3VyY2VNb2RlKTtcclxuXHJcblx0XHR1cGRhdGVUb29sQmFyKCk7XHJcblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgc2VsZWN0ZWQgdGV4dCBvZiB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdHJldHVybiBzb3VyY2VFZGl0b3IudmFsdWUuc3Vic3RyaW5nKFxyXG5cdFx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQsXHJcblx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgcGFzc2VkIGNvbW1hbmRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGhhbmRsZUNvbW1hbmQgPSBmdW5jdGlvbiAoY2FsbGVyLCBjbWQpIHtcclxuXHRcdC8vIGNoZWNrIGlmIGluIHRleHQgbW9kZSBhbmQgaGFuZGxlIHRleHQgY29tbWFuZHNcclxuXHRcdGlmIChiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdGlmIChjbWQudHh0RXhlYykge1xyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNtZC50eHRFeGVjKSkge1xyXG5cdFx0XHRcdFx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0LmFwcGx5KGJhc2UsIGNtZC50eHRFeGVjKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y21kLnR4dEV4ZWMuY2FsbChiYXNlLCBjYWxsZXIsIHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY21kLmV4ZWMpIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oY21kLmV4ZWMpKSB7XHJcblx0XHRcdFx0Y21kLmV4ZWMuY2FsbChiYXNlLCBjYWxsZXIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGJhc2UuZXhlY0NvbW1hbmQoXHJcblx0XHRcdFx0XHRjbWQuZXhlYyxcclxuXHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjbWQsICdleGVjUGFyYW0nKSA/IGNtZC5leGVjUGFyYW0gOiBudWxsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IFtwYXJhbV1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBleGVjQ29tbWFuZFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmV4ZWNDb21tYW5kID0gZnVuY3Rpb24gKGNvbW1hbmQsIHBhcmFtKSB7XHJcblx0XHR2YXJcdGV4ZWN1dGVkICAgID0gZmFsc2UsXHJcblx0XHRcdGNvbW1hbmRPYmogID0gYmFzZS5jb21tYW5kc1tjb21tYW5kXTtcclxuXHJcblx0XHRiYXNlLmZvY3VzKCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogbWFrZSBjb25maWd1cmFibGVcclxuXHRcdC8vIGRvbid0IGFwcGx5IGFueSBjb21tYW5kcyB0byBjb2RlIGVsZW1lbnRzXHJcblx0XHRpZiAoZG9tLmNsb3Nlc3QocmFuZ2VIZWxwZXIucGFyZW50Tm9kZSgpLCAnY29kZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRleGVjdXRlZCA9IHd5c2l3eWdEb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgcGFyYW0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdC8vIHNob3cgZXJyb3IgaWYgZXhlY3V0aW9uIGZhaWxlZCBhbmQgYW4gZXJyb3IgbWVzc2FnZSBleGlzdHNcclxuXHRcdGlmICghZXhlY3V0ZWQgJiYgY29tbWFuZE9iaiAmJiBjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkge1xyXG5cdFx0XHRhbGVydChiYXNlLl8oY29tbWFuZE9iai5lcnJvck1lc3NhZ2UpKTtcclxuXHRcdH1cclxuXHJcblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBoYXMgY2hhbmdlZCBhbmQgdHJpZ2dlcnNcclxuXHQgKiB0aGUgc2VsZWN0aW9uY2hhbmdlZCBldmVudCBpZiBpdCBoYXMuXHJcblx0ICpcclxuXHQgKiBJbiBicm93c2VycyBvdGhlciB0aGF0IGRvbid0IHN1cHBvcnQgc2VsZWN0aW9uY2hhbmdlIGV2ZW50IGl0IHdpbGwgY2hlY2tcclxuXHQgKiBhdCBtb3N0IG9uY2UgZXZlcnkgMTAwbXMuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRjaGVja1NlbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRmdW5jdGlvbiBjaGVjaygpIHtcclxuXHRcdFx0Ly8gRG9uJ3QgY3JlYXRlIG5ldyBzZWxlY3Rpb24gaWYgdGhlcmUgaXNuJ3Qgb25lIChsaWtlIGFmdGVyXHJcblx0XHRcdC8vIGJsdXIgZXZlbnQgaW4gaU9TKVxyXG5cdFx0XHRpZiAod3lzaXd5Z1dpbmRvdy5nZXRTZWxlY3Rpb24oKSAmJlxyXG5cdFx0XHRcdHd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkucmFuZ2VDb3VudCA8PSAwKSB7XHJcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IG51bGw7XHJcblx0XHRcdC8vIHJhbmdlSGVscGVyIGNvdWxkIGJlIG51bGwgaWYgZWRpdG9yIHdhcyBkZXN0cm95ZWRcclxuXHRcdFx0Ly8gYmVmb3JlIHRoZSB0aW1lb3V0IGhhZCBmaW5pc2hlZFxyXG5cdFx0XHR9IGVsc2UgaWYgKHJhbmdlSGVscGVyICYmICFyYW5nZUhlbHBlci5jb21wYXJlKGN1cnJlbnRTZWxlY3Rpb24pKSB7XHJcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgdGhlIHNlbGVjdGlvbiBpcyBpbiBhbiBpbmxpbmUgd3JhcCBpdCBpbiBhIGJsb2NrLlxyXG5cdFx0XHRcdC8vIEZpeGVzICMzMzFcclxuXHRcdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uLmNvbGxhcHNlZCkge1xyXG5cdFx0XHRcdFx0dmFyIHBhcmVudCA9IGN1cnJlbnRTZWxlY3Rpb24uc3RhcnRDb250YWluZXI7XHJcblx0XHRcdFx0XHR2YXIgb2Zmc2V0ID0gY3VycmVudFNlbGVjdGlvbi5zdGFydE9mZnNldDtcclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0aWYgKG9mZnNldCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcclxuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LmNoaWxkTm9kZXNbb2Zmc2V0XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR3aGlsZSAocGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSB3eXNpd3lnQm9keSkge1xyXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAocGFyZW50ICYmIGRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0XHR3cmFwSW5saW5lcyh3eXNpd3lnQm9keSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpc1NlbGVjdGlvbkNoZWNrUGVuZGluZyA9IHRydWU7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBsaW1pdCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnRzIHRoZSBTZWxlY3Rpb24gQVBJXHJcblx0XHRpZiAoJ29uc2VsZWN0aW9uY2hhbmdlJyBpbiB3eXNpd3lnRG9jdW1lbnQpIHtcclxuXHRcdFx0Y2hlY2soKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNldFRpbWVvdXQoY2hlY2ssIDEwMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IG5vZGUgaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXHJcblx0ICogdGhlIG5vZGVjaGFuZ2VkIGV2ZW50IGlmIGl0IGhhc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0Y2hlY2tOb2RlQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vIGNoZWNrIGlmIG5vZGUgaGFzIGNoYW5nZWRcclxuXHRcdHZhclx0b2xkTm9kZSxcclxuXHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHJcblx0XHRpZiAoY3VycmVudE5vZGUgIT09IG5vZGUpIHtcclxuXHRcdFx0b2xkTm9kZSAgICAgICAgICA9IGN1cnJlbnROb2RlO1xyXG5cdFx0XHRjdXJyZW50Tm9kZSAgICAgID0gbm9kZTtcclxuXHRcdFx0Y3VycmVudEJsb2NrTm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdub2RlY2hhbmdlZCcsIHtcclxuXHRcdFx0XHRvbGROb2RlOiBvbGROb2RlLFxyXG5cdFx0XHRcdG5ld05vZGU6IGN1cnJlbnROb2RlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBzZWxlY3Rpb24vY2FyZXQgaW5cclxuXHQgKiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBXaWxsIGJlIG51bGwgaW4gc291cmNlTW9kZSBvciBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHs/Tm9kZX1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjdXJyZW50Tm9kZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmN1cnJlbnROb2RlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGN1cnJlbnROb2RlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIG5vZGUgdGhhdCBjb250YWlucyB0aGVcclxuXHQgKiBzZWxlY3Rpb24vY2FyZXQgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7P05vZGV9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY3VycmVudEJsb2NrTm9kZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRiYXNlLmN1cnJlbnRCbG9ja05vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gY3VycmVudEJsb2NrTm9kZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIGlmIGJ1dHRvbnMgYXJlIGFjdGl2ZSBvciBub3RcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0dmFyIGFjdGl2ZUNsYXNzID0gJ2FjdGl2ZSc7XHJcblx0XHR2YXIgZG9jICAgICAgICAgPSB3eXNpd3lnRG9jdW1lbnQ7XHJcblx0XHR2YXIgaXNTb3VyY2UgICAgPSBiYXNlLnNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRpZiAoYmFzZS5yZWFkT25seSgpKSB7XHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQodG9vbGJhciwgYWN0aXZlQ2xhc3MpLCBmdW5jdGlvbiAoXywgbWVudUl0ZW0pIHtcclxuXHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MobWVudUl0ZW0sIGFjdGl2ZUNsYXNzKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWlzU291cmNlKSB7XHJcblx0XHRcdHBhcmVudCAgICAgPSByYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblx0XHRcdGZpcnN0QmxvY2sgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KHBhcmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBidG5TdGF0ZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdHZhciBzdGF0ZSAgICAgID0gMDtcclxuXHRcdFx0dmFyIGJ0biAgICAgICAgPSB0b29sYmFyQnV0dG9uc1tidG5TdGF0ZUhhbmRsZXJzW2pdLm5hbWVdO1xyXG5cdFx0XHR2YXIgc3RhdGVGbiAgICA9IGJ0blN0YXRlSGFuZGxlcnNbal0uc3RhdGU7XHJcblx0XHRcdHZhciBpc0Rpc2FibGVkID0gKGlzU291cmNlICYmICFidG4uX3NjZVR4dE1vZGUpIHx8XHJcblx0XHRcdFx0XHRcdCghaXNTb3VyY2UgJiYgIWJ0bi5fc2NlV3lzaXd5Z01vZGUpO1xyXG5cclxuXHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XHJcblx0XHRcdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtZGVwdGhcclxuXHRcdFx0XHRcdFx0aWYgKHN0YXRlID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRTdGF0ZShzdGF0ZUZuKSA/IDEgOiAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0Rpc2FibGVkKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBzdGF0ZUZuLmNhbGwoYmFzZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCB8fCBzdGF0ZSA8IDApO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCBhY3RpdmVDbGFzcywgc3RhdGUgPiAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaWNvbnMgJiYgaWNvbnMudXBkYXRlKSB7XHJcblx0XHRcdGljb25zLnVwZGF0ZShpc1NvdXJjZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGFueSBrZXkgcHJlc3MgaW4gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGhhbmRsZUtleVByZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vIEZGIGJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTAxNDk2XHJcblx0XHRpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRiYXNlLmNsb3NlRHJvcERvd24oKTtcclxuXHJcblx0XHQvLyAxMyA9IGVudGVyIGtleVxyXG5cdFx0aWYgKGUud2hpY2ggPT09IDEzKSB7XHJcblx0XHRcdHZhciBMSVNUX1RBR1MgPSAnbGksdWwsb2wnO1xyXG5cclxuXHRcdFx0Ly8gXCJGaXhcIiAoY2x1ZGdlKSBmb3IgYmxvY2tsZXZlbCBlbGVtZW50cyBiZWluZyBkdXBsaWNhdGVkIGluIHNvbWVcclxuXHRcdFx0Ly8gYnJvd3NlcnMgd2hlbiBlbnRlciBpcyBwcmVzc2VkIGluc3RlYWQgb2YgaW5zZXJ0aW5nIGEgbmV3bGluZVxyXG5cdFx0XHRpZiAoIWRvbS5pcyhjdXJyZW50QmxvY2tOb2RlLCBMSVNUX1RBR1MpICYmXHJcblx0XHRcdFx0ZG9tLmhhc1N0eWxpbmcoY3VycmVudEJsb2NrTm9kZSkpIHtcclxuXHJcblx0XHRcdFx0dmFyIGJyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2JyJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIuaW5zZXJ0Tm9kZShicik7XHJcblxyXG5cdFx0XHRcdC8vIExhc3QgPGJyPiBvZiBhIGJsb2NrIHdpbGwgYmUgY29sbGFwc2VkICBzbyBuZWVkIHRvIG1ha2Ugc3VyZVxyXG5cdFx0XHRcdC8vIHRoZSA8YnI+IHRoYXQgd2FzIGluc2VydGVkIGlzbid0IHRoZSBsYXN0IG5vZGUgb2YgYSBibG9jay5cclxuXHRcdFx0XHR2YXIgcGFyZW50ICA9IGJyLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0dmFyIGxhc3RDaGlsZCA9IHBhcmVudC5sYXN0Q2hpbGQ7XHJcblxyXG5cdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxyXG5cdFx0XHRcdGlmIChsYXN0Q2hpbGQgJiYgbGFzdENoaWxkLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFICYmXHJcblx0XHRcdFx0XHRsYXN0Q2hpbGQubm9kZVZhbHVlID09PSAnJykge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0bGFzdENoaWxkID0gcGFyZW50Lmxhc3RDaGlsZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgQlIgb2YgYSBibG9jayBhbmQgdGhlIHByZXZpb3VzXHJcblx0XHRcdFx0Ly8gc2libGluZyBpcyBpbmxpbmUgdGhlbiB3aWxsIG5lZWQgYW4gZXh0cmEgQlIuIFRoaXNcclxuXHRcdFx0XHQvLyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgbGFzdCBCUiBvZiBhIGJsb2NrIHdpbGwgYmVcclxuXHRcdFx0XHQvLyBjb2xsYXBzZWQuIEZpeGVzIGlzc3VlICMyNDhcclxuXHRcdFx0XHRpZiAoIWRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpICYmIGxhc3RDaGlsZCA9PT0gYnIgJiZcclxuXHRcdFx0XHRcdGRvbS5pc0lubGluZShici5wcmV2aW91c1NpYmxpbmcpKSB7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKCc8YnI+Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBzdXJlIHRoYXQgaWYgdGhlcmUgaXMgYSBjb2RlIG9yIHF1b3RlIHRhZyBhdCB0aGVcclxuXHQgKiBlbmQgb2YgdGhlIGVkaXRvciwgdGhhdCB0aGVyZSBpcyBhIG5ldyBsaW5lIGFmdGVyIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgdGhlcmUgd2Fzbid0IGEgbmV3IGxpbmUgYXQgdGhlIGVuZCB5b3Ugd291bGRuJ3QgYmUgYWJsZVxyXG5cdCAqIHRvIGVudGVyIGFueSB0ZXh0IGFmdGVyIGEgY29kZS9xdW90ZSB0YWdcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0YXBwZW5kTmV3TGluZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vIENoZWNrIGFsbCBub2RlcyBpbiByZXZlcnNlIHVudGlsIGVpdGhlciBhZGQgYSBuZXcgbGluZVxyXG5cdFx0Ly8gb3IgcmVhY2ggYSBub24tZW1wdHkgdGV4dG5vZGUgb3IgQlIgYXQgd2hpY2ggcG9pbnQgY2FuXHJcblx0XHQvLyBzdG9wIGNoZWNraW5nLlxyXG5cdFx0ZG9tLnJUcmF2ZXJzZSh3eXNpd3lnQm9keSwgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdFx0Ly8gTGFzdCBibG9jaywgYWRkIG5ldyBsaW5lIGFmdGVyIGlmIGhhcyBzdHlsaW5nXHJcblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmXHJcblx0XHRcdFx0IS9pbmxpbmUvLnRlc3QoZG9tLmNzcyhub2RlLCAnZGlzcGxheScpKSkge1xyXG5cclxuXHRcdFx0XHQvLyBBZGQgbGluZSBicmVhayBhZnRlciBpZiBoYXMgc3R5bGluZ1xyXG5cdFx0XHRcdGlmICghZG9tLmlzKG5vZGUsICcuc2NlZGl0b3ItbmxmJykgJiYgZG9tLmhhc1N0eWxpbmcobm9kZSkpIHtcclxuXHRcdFx0XHRcdHZhciBwYXJhZ3JhcGggPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdFx0cGFyYWdyYXBoLmNsYXNzTmFtZSA9ICdzY2VkaXRvci1ubGYnO1xyXG5cdFx0XHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9ICc8YnIgLz4nO1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBwYXJhZ3JhcGgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTGFzdCBub24tZW1wdHkgdGV4dCBub2RlIG9yIGxpbmUgYnJlYWsuXHJcblx0XHRcdC8vIE5vIG5lZWQgdG8gYWRkIGxpbmUtYnJlYWsgYWZ0ZXIgdGhlbVxyXG5cdFx0XHRpZiAoKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIS9eXFxzKiQvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB8fFxyXG5cdFx0XHRcdGRvbS5pcyhub2RlLCAnYnInKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBmb3JtIHJlc2V0IGV2ZW50XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRoYW5kbGVGb3JtUmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRiYXNlLnZhbChvcmlnaW5hbC52YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkgbW91c2Vkb3duIHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlTW91c2VEb3duID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVHJhbnNsYXRlcyB0aGUgc3RyaW5nIGludG8gdGhlIGxvY2FsZSBsYW5ndWFnZS5cclxuXHQgKlxyXG5cdCAqIFJlcGxhY2VzIGFueSB7MH0sIHsxfSwgezJ9LCBlY3QuIHdpdGggdGhlIHBhcmFtcyBwcm92aWRlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuXHQgKiBAcGFyYW0gey4uLlN0cmluZ30gYXJnc1xyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBfXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UuXyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhclx0dW5kZWYsXHJcblx0XHRcdGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG5cdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGVbYXJnc1swXV0pIHtcclxuXHRcdFx0YXJnc1swXSA9IGxvY2FsZVthcmdzWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXJnc1swXS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgZnVuY3Rpb24gKHN0ciwgcDEpIHtcclxuXHRcdFx0cmV0dXJuIGFyZ3NbcDEgLSAwICsgMV0gIT09IHVuZGVmID9cclxuXHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcclxuXHRcdFx0XHQneycgKyBwMSArICd9JztcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBhc3NlcyBldmVudHMgb24gdG8gYW55IGhhbmRsZXJzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRoYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAocGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHQvLyBTZW5kIGV2ZW50IHRvIGFsbCBwbHVnaW5zXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbChlLnR5cGUgKyAnRXZlbnQnLCBlLCBiYXNlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBjb252ZXJ0IHRoZSBldmVudCBpbnRvIGEgY3VzdG9tIGV2ZW50IHRvIHNlbmRcclxuXHRcdHZhciBuYW1lID0gKGUudGFyZ2V0ID09PSBzb3VyY2VFZGl0b3IgPyAnc2Nlc3JjJyA6ICdzY2V3eXMnKSArIGUudHlwZTtcclxuXHJcblx0XHRpZiAoZXZlbnRIYW5kbGVyc1tuYW1lXSkge1xyXG5cdFx0XHRldmVudEhhbmRsZXJzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XHJcblx0XHRcdFx0Zm4uY2FsbChiYXNlLCBlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgYSBoYW5kbGVyIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnRzXHJcblx0ICpcclxuXHQgKiBUaGlzIGZ1bmN0aW9uIG9ubHkgYmluZHMgdG8gYSBsaW1pdGVkIGxpc3Qgb2ZcclxuXHQgKiBzdXBwb3J0ZWQgZXZlbnRzLlxyXG5cdCAqXHJcblx0ICogVGhlIHN1cHBvcnRlZCBldmVudHMgYXJlOlxyXG5cdCAqXHJcblx0ICogKiBrZXl1cFxyXG5cdCAqICoga2V5ZG93blxyXG5cdCAqICogS2V5cHJlc3NcclxuXHQgKiAqIGJsdXJcclxuXHQgKiAqIGZvY3VzXHJcblx0ICogKiBpbnB1dFxyXG5cdCAqICogbm9kZWNoYW5nZWQgLSBXaGVuIHRoZSBjdXJyZW50IG5vZGUgY29udGFpbmluZ1xyXG5cdCAqIFx0XHR0aGUgc2VsZWN0aW9uIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlXHJcblx0ICogKiBjb250ZXh0bWVudVxyXG5cdCAqICogc2VsZWN0aW9uY2hhbmdlZFxyXG5cdCAqICogdmFsdWVjaGFuZ2VkXHJcblx0ICpcclxuXHQgKlxyXG5cdCAqIFRoZSBldmVudHMgcGFyYW0gc2hvdWxkIGJlIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50KHMpXHJcblx0ICogdG8gYmluZCB0aGlzIGhhbmRsZXIgdG8uIElmIG11bHRpcGxlLCB0aGV5IHNob3VsZCBiZSBzZXBhcmF0ZWRcclxuXHQgKiBieSBzcGFjZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW50c1xyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGJpbmRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0YmFzZS5iaW5kID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdGV2ZW50cyA9IGV2ZW50cy5zcGxpdCgnICcpO1xyXG5cclxuXHRcdHZhciBpICA9IGV2ZW50cy5sZW5ndGg7XHJcblx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0dmFyIHd5c0V2ZW50ID0gJ3NjZXd5cycgKyBldmVudHNbaV07XHJcblx0XHRcdFx0dmFyIHNyY0V2ZW50ID0gJ3NjZXNyYycgKyBldmVudHNbaV07XHJcblx0XHRcdFx0Ly8gVXNlIGN1c3RvbSBldmVudHMgdG8gYWxsb3cgcGFzc2luZyB0aGUgaW5zdGFuY2UgYXMgdGhlXHJcblx0XHRcdFx0Ly8gMm5kIGFyZ3VtZW50LlxyXG5cdFx0XHRcdC8vIEFsc28gYWxsb3dzIHVuYmluZGluZyB3aXRob3V0IHVuYmluZGluZyB0aGUgZWRpdG9ycyBvd25cclxuXHRcdFx0XHQvLyBldmVudCBoYW5kbGVycy5cclxuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XHJcblx0XHRcdFx0XHRldmVudEhhbmRsZXJzW3d5c0V2ZW50XSA9IGV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdIHx8IFtdO1xyXG5cdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0gPSBldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdLnB1c2goaGFuZGxlcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBTdGFydCBzZW5kaW5nIHZhbHVlIGNoYW5nZWQgZXZlbnRzXHJcblx0XHRcdFx0aWYgKGV2ZW50c1tpXSA9PT0gJ3ZhbHVlY2hhbmdlZCcpIHtcclxuXHRcdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQuaGFzSGFuZGxlciA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJhc2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVW5iaW5kcyBhbiBldmVudCB0aGF0IHdhcyBib3VuZCB1c2luZyBiaW5kKCkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW50c1xyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSB1bmJpbmRpbmcgdGhpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgZnJvbSB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBpZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB1bmJpbmRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQHNlZSBiaW5kXHJcblx0ICovXHJcblx0YmFzZS51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0ZXZlbnRzID0gZXZlbnRzLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0dmFyIGkgID0gZXZlbnRzLmxlbmd0aDtcclxuXHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1snc2Nld3lzJyArIGV2ZW50c1tpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1snc2Nlc3JjJyArIGV2ZW50c1tpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJsdXJzIHRoZSBlZGl0b3JzIGlucHV0IGFyZWFcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgYmx1clxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS4zLjZcclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgZWRpdG9ycyBibHVyIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBibHVyXjJcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0YmFzZS5ibHVyID0gZnVuY3Rpb24gKGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKSB7XHJcblx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHRiYXNlLmJpbmQoJ2JsdXInLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCFiYXNlLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR3eXNpd3lnQm9keS5ibHVyKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzb3VyY2VFZGl0b3IuYmx1cigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZvY3VzZXMgdGhlIGVkaXRvcnMgaW5wdXQgYXJlYVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBmb2N1c1xyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGZvY3VzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBmb2N1c14yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdGJhc2UuZm9jdXMgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdGJhc2UuYmluZCgnZm9jdXMnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCFiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdC8vIEFscmVhZHkgaGFzIGZvY3VzIHNvIGRvIG5vdGhpbmdcclxuXHRcdFx0aWYgKGRvbS5maW5kKHd5c2l3eWdEb2N1bWVudCwgJzpmb2N1cycpLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNvbnRhaW5lcjtcclxuXHRcdFx0dmFyIHJuZyA9IHJhbmdlSGVscGVyLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdC8vIEZpeCBGRiBidWcgd2hlcmUgaXQgc2hvd3MgdGhlIGN1cnNvciBpbiB0aGUgd3JvbmcgcGxhY2VcclxuXHRcdFx0Ly8gaWYgdGhlIGVkaXRvciBoYXNuJ3QgaGFkIGZvY3VzIGJlZm9yZS4gU2VlIGlzc3VlICMzOTNcclxuXHRcdFx0aWYgKCFjdXJyZW50U2VsZWN0aW9uKSB7XHJcblx0XHRcdFx0YXV0b2ZvY3VzKHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcclxuXHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcclxuXHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdGlmIChybmcgJiYgcm5nLmVuZE9mZnNldCA9PT0gMSAmJiBybmcuY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0Y29udGFpbmVyID0gcm5nLmVuZENvbnRhaW5lcjtcclxuXHJcblx0XHRcdFx0aWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcclxuXHRcdFx0XHRcdGRvbS5pcyhjb250YWluZXIuZmlyc3RDaGlsZCwgJ2JyJykpIHtcclxuXHRcdFx0XHRcdHJuZy5zZXRTdGFydEJlZm9yZShjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5zZWxlY3RSYW5nZShybmcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d3lzaXd5Z1dpbmRvdy5mb2N1cygpO1xyXG5cdFx0XHR3eXNpd3lnQm9keS5mb2N1cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgZG93biBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5RG93blxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRiYXNlLmtleURvd24gPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdHJldHVybiBiYXNlLmJpbmQoJ2tleWRvd24nLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBwcmVzcyBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5UHJlc3NcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0YmFzZS5rZXlQcmVzcyA9IGZ1bmN0aW9uIChoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0cmV0dXJuIGJhc2VcclxuXHRcdFx0LmJpbmQoJ2tleXByZXNzJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgdXAgZXZlbnRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGtleVVwXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdGJhc2Uua2V5VXAgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdHJldHVybiBiYXNlLmJpbmQoJ2tleXVwJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIG5vZGVDaGFuZ2VkXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdGJhc2Uubm9kZUNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG5cdFx0cmV0dXJuIGJhc2UuYmluZCgnbm9kZWNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHNlbGVjdGlvbiBjaGFuZ2VkIGV2ZW50XHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRiYXNlLnNlbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG5cdFx0cmV0dXJuIGJhc2UuYmluZCgnc2VsZWN0aW9uY2hhbmdlZCcsIGhhbmRsZXIsIGZhbHNlLCB0cnVlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgdmFsdWUgY2hhbmdlZCBldmVudFxyXG5cdCAqXHJcblx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgY3VycmVudCBlZGl0b3IgdmFsdWUgY2hhbmdlcy5cclxuXHQgKlxyXG5cdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdCAqIDEuNSBzZWNzIGFmdGVyIHRleHQgaXMgdHlwZWQuIElmIGEgc3BhY2UgaXMgdHlwZWQgaXQgd2lsbFxyXG5cdCAqIGNhdXNlIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZlxyXG5cdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC41XHJcblx0ICovXHJcblx0YmFzZS52YWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdHJldHVybiBiYXNlXHJcblx0XHRcdC5iaW5kKCd2YWx1ZWNoYW5nZWQnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW1vdGljb25zIGtleXByZXNzIGhhbmRsZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGVtb3RpY29uc0tleVByZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhclx0cmVwbGFjZWRFbW90aWNvbixcclxuXHRcdFx0Y2FjaGVQb3MgICAgICAgPSAwLFxyXG5cdFx0XHRlbW90aWNvbnNDYWNoZSA9IGJhc2UuZW1vdGljb25zQ2FjaGUsXHJcblx0XHRcdGN1ckNoYXIgICAgICAgID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBNYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0aWYgKGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghZW1vdGljb25zQ2FjaGUpIHtcclxuXHRcdFx0ZW1vdGljb25zQ2FjaGUgPSBbXTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCBodG1sKSB7XHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbY2FjaGVQb3MrK10gPSBba2V5LCBodG1sXTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlbW90aWNvbnNDYWNoZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0YmFzZS5lbW90aWNvbnNDYWNoZSA9IGVtb3RpY29uc0NhY2hlO1xyXG5cdFx0XHRiYXNlLmxvbmdlc3RFbW90aWNvbkNvZGUgPVxyXG5cdFx0XHRcdGVtb3RpY29uc0NhY2hlW2Vtb3RpY29uc0NhY2hlLmxlbmd0aCAtIDFdWzBdLmxlbmd0aDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlZEVtb3RpY29uID0gcmFuZ2VIZWxwZXIucmVwbGFjZUtleXdvcmQoXHJcblx0XHRcdGJhc2UuZW1vdGljb25zQ2FjaGUsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdGJhc2UubG9uZ2VzdEVtb3RpY29uQ29kZSxcclxuXHRcdFx0b3B0aW9ucy5lbW90aWNvbnNDb21wYXQsXHJcblx0XHRcdGN1ckNoYXJcclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKHJlcGxhY2VkRW1vdGljb24pIHtcclxuXHRcdFx0aWYgKCFvcHRpb25zLmVtb3RpY29uc0NvbXBhdCB8fCAhL15cXHMkLy50ZXN0KGN1ckNoYXIpKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgc3VyZSBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0ZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0ZW1vdGljb25zLmNoZWNrV2hpdGVzcGFjZShjdXJyZW50QmxvY2tOb2RlLCByYW5nZUhlbHBlcik7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBpZiBlbW90aWNvbnMgYXJlIGN1cnJlbnRseSBlbmFibGVkXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBlbW90aWNvbnNcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4yXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcy9kaXNhYmxlcyBlbW90aWNvbnNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBlbW90aWNvbnNeMlxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjJcclxuXHQgKi9cclxuXHRiYXNlLmVtb3RpY29ucyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuXHRcdGlmICghZW5hYmxlICYmIGVuYWJsZSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuIG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZDtcclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zLmVtb3RpY29uc0VuYWJsZWQgPSBlbmFibGU7XHJcblxyXG5cdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIGVtb3RpY29uc0tleVByZXNzKTtcclxuXHJcblx0XHRcdGlmICghYmFzZS5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0cmVwbGFjZUVtb3RpY29ucygpO1xyXG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGVtb3RpY29ucyA9XHJcblx0XHRcdFx0ZG9tLmZpbmQod3lzaXd5Z0JvZHksICdpbWdbZGF0YS1zY2VkaXRvci1lbW90aWNvbl0nKTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoXywgaW1nKSB7XHJcblx0XHRcdFx0dmFyIHRleHQgPSBkb20uZGF0YShpbWcsICdzY2VkaXRvci1lbW90aWNvbicpO1xyXG5cdFx0XHRcdHZhciB0ZXh0Tm9kZSA9IHd5c2l3eWdEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxuXHRcdFx0XHRpbWcucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIGltZyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9mZih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgZW1vdGljb25zS2V5UHJlc3MpO1xyXG5cclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgV1lTSVdZRyBlZGl0b3JzIGlubGluZSBDU1NcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjc3NcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjc3NcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc14yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqL1xyXG5cdGJhc2UuY3NzID0gZnVuY3Rpb24gKGNzcykge1xyXG5cdFx0aWYgKCFpbmxpbmVDc3MpIHtcclxuXHRcdFx0aW5saW5lQ3NzID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywge1xyXG5cdFx0XHRcdGlkOiAnaW5saW5lJ1xyXG5cdFx0XHR9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdEb2N1bWVudC5oZWFkLCBpbmxpbmVDc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdXRpbHMuaXNTdHJpbmcoY3NzKSkge1xyXG5cdFx0XHRyZXR1cm4gaW5saW5lQ3NzLnN0eWxlU2hlZXQgP1xyXG5cdFx0XHRcdGlubGluZUNzcy5zdHlsZVNoZWV0LmNzc1RleHQgOiBpbmxpbmVDc3MuaW5uZXJIVE1MO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbmxpbmVDc3Muc3R5bGVTaGVldCkge1xyXG5cdFx0XHRpbmxpbmVDc3Muc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBrZXlkb3duIGV2ZW50LCB1c2VkIGZvciBzaG9ydGN1dHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGhhbmRsZUtleURvd24gPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyXHRzaG9ydGN1dCAgID0gW10sXHJcblx0XHRcdFNISUZUX0tFWVMgPSB7XHJcblx0XHRcdFx0J2AnOiAnficsXHJcblx0XHRcdFx0JzEnOiAnIScsXHJcblx0XHRcdFx0JzInOiAnQCcsXHJcblx0XHRcdFx0JzMnOiAnIycsXHJcblx0XHRcdFx0JzQnOiAnJCcsXHJcblx0XHRcdFx0JzUnOiAnJScsXHJcblx0XHRcdFx0JzYnOiAnXicsXHJcblx0XHRcdFx0JzcnOiAnJicsXHJcblx0XHRcdFx0JzgnOiAnKicsXHJcblx0XHRcdFx0JzknOiAnKCcsXHJcblx0XHRcdFx0JzAnOiAnKScsXHJcblx0XHRcdFx0Jy0nOiAnXycsXHJcblx0XHRcdFx0Jz0nOiAnKycsXHJcblx0XHRcdFx0JzsnOiAnOiAnLFxyXG5cdFx0XHRcdCdcXCcnOiAnXCInLFxyXG5cdFx0XHRcdCcsJzogJzwnLFxyXG5cdFx0XHRcdCcuJzogJz4nLFxyXG5cdFx0XHRcdCcvJzogJz8nLFxyXG5cdFx0XHRcdCdcXFxcJzogJ3wnLFxyXG5cdFx0XHRcdCdbJzogJ3snLFxyXG5cdFx0XHRcdCddJzogJ30nXHJcblx0XHRcdH0sXHJcblx0XHRcdFNQRUNJQUxfS0VZUyA9IHtcclxuXHRcdFx0XHQ4OiAnYmFja3NwYWNlJyxcclxuXHRcdFx0XHQ5OiAndGFiJyxcclxuXHRcdFx0XHQxMzogJ2VudGVyJyxcclxuXHRcdFx0XHQxOTogJ3BhdXNlJyxcclxuXHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcclxuXHRcdFx0XHQyNzogJ2VzYycsXHJcblx0XHRcdFx0MzI6ICdzcGFjZScsXHJcblx0XHRcdFx0MzM6ICdwYWdldXAnLFxyXG5cdFx0XHRcdDM0OiAncGFnZWRvd24nLFxyXG5cdFx0XHRcdDM1OiAnZW5kJyxcclxuXHRcdFx0XHQzNjogJ2hvbWUnLFxyXG5cdFx0XHRcdDM3OiAnbGVmdCcsXHJcblx0XHRcdFx0Mzg6ICd1cCcsXHJcblx0XHRcdFx0Mzk6ICdyaWdodCcsXHJcblx0XHRcdFx0NDA6ICdkb3duJyxcclxuXHRcdFx0XHQ0NTogJ2luc2VydCcsXHJcblx0XHRcdFx0NDY6ICdkZWwnLFxyXG5cdFx0XHRcdDkxOiAnd2luJyxcclxuXHRcdFx0XHQ5MjogJ3dpbicsXHJcblx0XHRcdFx0OTM6ICdzZWxlY3QnLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOScsXHJcblx0XHRcdFx0MTA2OiAnKicsXHJcblx0XHRcdFx0MTA3OiAnKycsXHJcblx0XHRcdFx0MTA5OiAnLScsXHJcblx0XHRcdFx0MTEwOiAnLicsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0MTEyOiAnZjEnLFxyXG5cdFx0XHRcdDExMzogJ2YyJyxcclxuXHRcdFx0XHQxMTQ6ICdmMycsXHJcblx0XHRcdFx0MTE1OiAnZjQnLFxyXG5cdFx0XHRcdDExNjogJ2Y1JyxcclxuXHRcdFx0XHQxMTc6ICdmNicsXHJcblx0XHRcdFx0MTE4OiAnZjcnLFxyXG5cdFx0XHRcdDExOTogJ2Y4JyxcclxuXHRcdFx0XHQxMjA6ICdmOScsXHJcblx0XHRcdFx0MTIxOiAnZjEwJyxcclxuXHRcdFx0XHQxMjI6ICdmMTEnLFxyXG5cdFx0XHRcdDEyMzogJ2YxMicsXHJcblx0XHRcdFx0MTQ0OiAnbnVtbG9jaycsXHJcblx0XHRcdFx0MTQ1OiAnc2Nyb2xsbG9jaycsXHJcblx0XHRcdFx0MTg2OiAnOycsXHJcblx0XHRcdFx0MTg3OiAnPScsXHJcblx0XHRcdFx0MTg4OiAnLCcsXHJcblx0XHRcdFx0MTg5OiAnLScsXHJcblx0XHRcdFx0MTkwOiAnLicsXHJcblx0XHRcdFx0MTkxOiAnLycsXHJcblx0XHRcdFx0MTkyOiAnYCcsXHJcblx0XHRcdFx0MjE5OiAnWycsXHJcblx0XHRcdFx0MjIwOiAnXFxcXCcsXHJcblx0XHRcdFx0MjIxOiAnXScsXHJcblx0XHRcdFx0MjIyOiAnXFwnJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHROVU1QQURfU0hJRlRfS0VZUyA9IHtcclxuXHRcdFx0XHQxMDk6ICctJyxcclxuXHRcdFx0XHQxMTA6ICdkZWwnLFxyXG5cdFx0XHRcdDExMTogJy8nLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOSdcclxuXHRcdFx0fSxcclxuXHRcdFx0d2hpY2ggICAgID0gZS53aGljaCxcclxuXHRcdFx0Y2hhcmFjdGVyID0gU1BFQ0lBTF9LRVlTW3doaWNoXSB8fFxyXG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUod2hpY2gpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcclxuXHRcdFx0c2hvcnRjdXQucHVzaCgnY3RybCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLmFsdEtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdhbHQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZS5zaGlmdEtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdzaGlmdCcpO1xyXG5cclxuXHRcdFx0aWYgKE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXSkge1xyXG5cdFx0XHRcdGNoYXJhY3RlciA9IE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXTtcclxuXHRcdFx0fSBlbHNlIGlmIChTSElGVF9LRVlTW2NoYXJhY3Rlcl0pIHtcclxuXHRcdFx0XHRjaGFyYWN0ZXIgPSBTSElGVF9LRVlTW2NoYXJhY3Rlcl07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTaGlmdCBpcyAxNiwgY3RybCBpcyAxNyBhbmQgYWx0IGlzIDE4XHJcblx0XHRpZiAoY2hhcmFjdGVyICYmICh3aGljaCA8IDE2IHx8IHdoaWNoID4gMTgpKSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goY2hhcmFjdGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG9ydGN1dCA9IHNob3J0Y3V0LmpvaW4oJysnKTtcclxuXHRcdGlmIChzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XSAmJlxyXG5cdFx0XHRzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XS5jYWxsKGJhc2UpID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBzaG9ydGN1dCBoYW5kbGVyIHRvIHRoZSBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgIHNob3J0Y3V0XHJcblx0ICogQHBhcmFtICB7U3RyaW5nfEZ1bmN0aW9ufSBjbWRcclxuXHQgKiBAcmV0dXJuIHtzY2VkaXRvcn1cclxuXHQgKi9cclxuXHRiYXNlLmFkZFNob3J0Y3V0ID0gZnVuY3Rpb24gKHNob3J0Y3V0LCBjbWQpIHtcclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoY21kKSkge1xyXG5cdFx0XHRzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRoYW5kbGVDb21tYW5kKHRvb2xiYXJCdXR0b25zW2NtZF0sIGJhc2UuY29tbWFuZHNbY21kXSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdID0gY21kO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBzaG9ydGN1dCBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBzaG9ydGN1dFxyXG5cdCAqIEByZXR1cm4ge3NjZWRpdG9yfVxyXG5cdCAqL1xyXG5cdGJhc2UucmVtb3ZlU2hvcnRjdXQgPSBmdW5jdGlvbiAoc2hvcnRjdXQpIHtcclxuXHRcdGRlbGV0ZSBzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0LnRvTG93ZXJDYXNlKCldO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGJhY2tzcGFjZSBrZXkgcHJlc3NcclxuXHQgKlxyXG5cdCAqIFdpbGwgcmVtb3ZlIGJsb2NrIHN0eWxpbmcgbGlrZSBxdW90ZXMvY29kZSBlY3QgaWYgYXQgdGhlIHN0YXJ0LlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlQmFja1NwYWNlID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhclx0bm9kZSwgb2Zmc2V0LCByYW5nZSwgcGFyZW50O1xyXG5cclxuXHRcdC8vIDggaXMgdGhlIGJhY2tzcGFjZSBrZXlcclxuXHRcdGlmIChvcHRpb25zLmRpc2FibGVCbG9ja1JlbW92ZSB8fCBlLndoaWNoICE9PSA4IHx8XHJcblx0XHRcdCEocmFuZ2UgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCkpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlICAgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcclxuXHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cclxuXHRcdGlmIChvZmZzZXQgIT09IDAgfHwgIShwYXJlbnQgPSBjdXJyZW50U3R5bGVkQmxvY2tOb2RlKCkpIHx8XHJcblx0XHRcdGRvbS5pcyhwYXJlbnQsICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlIChub2RlICE9PSBwYXJlbnQpIHtcclxuXHRcdFx0d2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHQvLyBFdmVyeXRoaW5nIGJ1dCBlbXB0eSB0ZXh0IG5vZGVzIGJlZm9yZSB0aGUgY3Vyc29yXHJcblx0XHRcdFx0Ly8gc2hvdWxkIHByZXZlbnQgdGhlIHN0eWxlIGZyb20gYmVpbmcgcmVtb3ZlZFxyXG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFIHx8IG5vZGUubm9kZVZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRoZSBiYWNrc3BhY2Ugd2FzIHByZXNzZWQgYXQgdGhlIHN0YXJ0IG9mXHJcblx0XHQvLyB0aGUgY29udGFpbmVyIHNvIGNsZWFyIHRoZSBzdHlsZVxyXG5cdFx0YmFzZS5jbGVhckJsb2NrRm9ybWF0dGluZyhwYXJlbnQpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IHN0eWxlZCBibG9jayBub2RlIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvclxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqL1xyXG5cdGN1cnJlbnRTdHlsZWRCbG9ja05vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYmxvY2sgPSBjdXJyZW50QmxvY2tOb2RlO1xyXG5cclxuXHRcdHdoaWxlICghZG9tLmhhc1N0eWxpbmcoYmxvY2spIHx8IGRvbS5pc0lubGluZShibG9jaywgdHJ1ZSkpIHtcclxuXHRcdFx0aWYgKCEoYmxvY2sgPSBibG9jay5wYXJlbnROb2RlKSB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmxvY2s7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYXJzIHRoZSBmb3JtYXR0aW5nIG9mIHRoZSBwYXNzZWQgYmxvY2sgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIElmIGJsb2NrIGlzIGZhbHNlLCBpZiB3aWxsIGNsZWFyIHRoZSBzdHlsaW5nIG9mIHRoZSBmaXJzdFxyXG5cdCAqIGJsb2NrIGxldmVsIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgY3Vyc29yLlxyXG5cdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBibG9ja1xyXG5cdCAqIEBzaW5jZSAxLjQuNFxyXG5cdCAqL1xyXG5cdGJhc2UuY2xlYXJCbG9ja0Zvcm1hdHRpbmcgPSBmdW5jdGlvbiAoYmxvY2spIHtcclxuXHRcdGJsb2NrID0gYmxvY2sgfHwgY3VycmVudFN0eWxlZEJsb2NrTm9kZSgpO1xyXG5cclxuXHRcdGlmICghYmxvY2sgfHwgZG9tLmlzKGJsb2NrLCAnYm9keScpKSB7XHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cclxuXHRcdGJsb2NrLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuXHRcdGRvbS5hdHRyKGJsb2NrLCAnc3R5bGUnLCAnJyk7XHJcblxyXG5cdFx0aWYgKCFkb20uaXMoYmxvY2ssICdwLGRpdix0ZCcpKSB7XHJcblx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChibG9jaywgJ3AnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyaWdnZXJzIHRoZSB2YWx1ZUNoYW5nZWQgc2lnbmFsIGlmIHRoZXJlIGlzXHJcblx0ICogYSBwbHVnaW4gdGhhdCBoYW5kbGVzIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgcmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCkgaGFzIGFscmVhZHkgYmVlblxyXG5cdCAqIGNhbGxlZCwgdGhlbiBzYXZlUmFuZ2Ugc2hvdWxkIGJlIHNldCB0byBmYWxzZVxyXG5cdCAqIHRvIHByZXZlbnQgdGhlIHJhbmdlIGJlaW5nIHNhdmVkIHR3aWNlLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBzYXZlUmFuZ2UgSWYgdG8gY2FsbCByYW5nZUhlbHBlci5zYXZlUmFuZ2UoKS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHRyaWdnZXJWYWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoc2F2ZVJhbmdlKSB7XHJcblx0XHRpZiAoIXBsdWdpbk1hbmFnZXIgfHxcclxuXHRcdFx0KCFwbHVnaW5NYW5hZ2VyLmhhc0hhbmRsZXIoJ3ZhbHVlY2hhbmdlZEV2ZW50JykgJiZcclxuXHRcdFx0XHQhdHJpZ2dlclZhbHVlQ2hhbmdlZC5oYXNIYW5kbGVyKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyXHRjdXJyZW50SHRtbCxcclxuXHRcdFx0c291cmNlTW9kZSAgID0gYmFzZS5zb3VyY2VNb2RlKCksXHJcblx0XHRcdGhhc1NlbGVjdGlvbiA9ICFzb3VyY2VNb2RlICYmIHJhbmdlSGVscGVyLmhhc1NlbGVjdGlvbigpO1xyXG5cclxuXHRcdC8vIENvbXBvc2l0aW9uIGVuZCBpc24ndCBndWFyYW50ZWVkIHRvIGZpcmUgYnV0IG11c3QgaGF2ZVxyXG5cdFx0Ly8gZW5kZWQgd2hlbiB0cmlnZ2VyVmFsdWVDaGFuZ2VkKCkgaXMgY2FsbGVkIHNvIHJlc2V0IGl0XHJcblx0XHRpc0NvbXBvc2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgc2NlZGl0b3Itc3RhcnQtbWFya2VyXHJcblx0XHQvLyBpcyBwcmVzZW50IGFzIHRoZSByYW5nZSBpcyBhbHJlYWR5IHNhdmVkXHJcblx0XHRzYXZlUmFuZ2UgPSBzYXZlUmFuZ2UgIT09IGZhbHNlICYmXHJcblx0XHRcdCF3eXNpd3lnRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjZWRpdG9yLXN0YXJ0LW1hcmtlcicpO1xyXG5cclxuXHRcdC8vIENsZWFyIGFueSBjdXJyZW50IHRpbWVvdXQgYXMgaXQncyBub3cgYmVlbiB0cmlnZ2VyZWRcclxuXHRcdGlmICh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKTtcclxuXHRcdFx0dmFsdWVDaGFuZ2VkS2V5VXBUaW1lciA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoYXNTZWxlY3Rpb24gJiYgc2F2ZVJhbmdlKSB7XHJcblx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN1cnJlbnRIdG1sID0gc291cmNlTW9kZSA/IHNvdXJjZUVkaXRvci52YWx1ZSA6IHd5c2l3eWdCb2R5LmlubmVySFRNTDtcclxuXHJcblx0XHQvLyBPbmx5IHRyaWdnZXIgaWYgc29tZXRoaW5nIGhhcyBhY3R1YWxseSBjaGFuZ2VkLlxyXG5cdFx0aWYgKGN1cnJlbnRIdG1sICE9PSB0cmlnZ2VyVmFsdWVDaGFuZ2VkLmxhc3RWYWwpIHtcclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZC5sYXN0VmFsID0gY3VycmVudEh0bWw7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICd2YWx1ZWNoYW5nZWQnLCB7XHJcblx0XHRcdFx0cmF3VmFsdWU6IHNvdXJjZU1vZGUgPyBiYXNlLnZhbCgpIDogY3VycmVudEh0bWxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhhc1NlbGVjdGlvbiAmJiBzYXZlUmFuZ2UpIHtcclxuXHRcdFx0cmFuZ2VIZWxwZXIucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBibHVyIGV2ZW50XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YWx1ZUNoYW5nZWRCbHVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHZhbHVlQ2hhbmdlZEtleVVwVGltZXIpIHtcclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBrZXlwcmVzcyBldmVudFxyXG5cdCAqIEBwYXJhbSAge0V2ZW50fSBlIFRoZSBrZXlwcmVzcyBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFsdWVDaGFuZ2VkS2V5VXAgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHdoaWNoICAgICAgICAgPSBlLndoaWNoLFxyXG5cdFx0XHRsYXN0Q2hhciAgICAgID0gdmFsdWVDaGFuZ2VkS2V5VXAubGFzdENoYXIsXHJcblx0XHRcdGxhc3RXYXNTcGFjZSAgPSAobGFzdENoYXIgPT09IDEzIHx8IGxhc3RDaGFyID09PSAzMiksXHJcblx0XHRcdGxhc3RXYXNEZWxldGUgPSAobGFzdENoYXIgPT09IDggfHwgbGFzdENoYXIgPT09IDQ2KTtcclxuXHJcblx0XHR2YWx1ZUNoYW5nZWRLZXlVcC5sYXN0Q2hhciA9IHdoaWNoO1xyXG5cclxuXHRcdGlmIChpc0NvbXBvc2luZykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gMTMgPSByZXR1cm4gJiAzMiA9IHNwYWNlXHJcblx0XHRpZiAod2hpY2ggPT09IDEzIHx8IHdoaWNoID09PSAzMikge1xyXG5cdFx0XHRpZiAoIWxhc3RXYXNTcGFjZSkge1xyXG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdC8vIDggPSBiYWNrc3BhY2UgJiA0NiA9IGRlbFxyXG5cdFx0fSBlbHNlIGlmICh3aGljaCA9PT0gOCB8fCB3aGljaCA9PT0gNDYpIHtcclxuXHRcdFx0aWYgKCFsYXN0V2FzRGVsZXRlKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCkge1xyXG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0ID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHByZXZpb3VzIHRpbWVvdXQgYW5kIHNldCBhIG5ldyBvbmUuXHJcblx0XHRjbGVhclRpbWVvdXQodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciB0aGUgZXZlbnQgMS41cyBhZnRlciB0aGUgbGFzdCBrZXlwcmVzcyBpZiBzcGFjZVxyXG5cdFx0Ly8gaXNuJ3QgcHJlc3NlZC4gVGhpcyBtaWdodCBuZWVkIHRvIGJlIGxvd2VyZWQsIHdpbGwgbmVlZFxyXG5cdFx0Ly8gdG8gbG9vayBpbnRvIHdoYXQgdGhlIHNsb3dlc3QgYXZlcmFnZSBDaGFycyBQZXIgTWluIGlzLlxyXG5cdFx0dmFsdWVDaGFuZ2VkS2V5VXBUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxNTAwKTtcclxuXHR9O1xyXG5cclxuXHRoYW5kbGVDb21wb3NpdGlvbiA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpc0NvbXBvc2luZyA9IC9zdGFydC9pLnRlc3QoZS50eXBlKTtcclxuXHJcblx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRhdXRvVXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0YmFzZS51cGRhdGVPcmlnaW5hbCgpO1xyXG5cdH07XHJcblxyXG5cdC8vIHJ1biB0aGUgaW5pdGlhbGl6ZXJcclxuXHRpbml0KCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTWFwIGNvbnRhaW5pbmcgdGhlIGxvYWRlZCBTQ0VkaXRvciBsb2NhbGVzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBuYW1lIGxvY2FsZVxyXG4gKiBAbWVtYmVyT2Ygc2NlZGl0b3JcclxuICovXHJcblNDRWRpdG9yLmxvY2FsZSA9IHt9O1xyXG5cclxuU0NFZGl0b3IuZm9ybWF0cyA9IHt9O1xyXG5TQ0VkaXRvci5pY29ucyA9IHt9O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGF0aWMgY29tbWFuZCBoZWxwZXIgY2xhc3NcclxuICogQGNsYXNzIGNvbW1hbmRcclxuICogQG5hbWUgc2NlZGl0b3IuY29tbWFuZFxyXG4gKi9cclxuU0NFZGl0b3IuY29tbWFuZCA9XHJcbi8qKiBAbGVuZHMgc2NlZGl0b3IuY29tbWFuZCAqL1xyXG57XHJcblx0LyoqXHJcblx0ICogR2V0cyBhIGNvbW1hbmRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0ICogQHJldHVybiB7T2JqZWN0fG51bGx9XHJcblx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdCAqL1xyXG5cdGdldDogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHJldHVybiBkZWZhdWx0Q29tbWFuZHNbbmFtZV0gfHwgbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiA8cD5BZGRzIGEgY29tbWFuZCB0byB0aGUgZWRpdG9yIG9yIHVwZGF0ZXMgYW4gZXhpc3RpbmdcclxuXHQgKiBjb21tYW5kIGlmIGEgY29tbWFuZCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbHJlYWR5IGV4aXN0cy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5PbmNlIGEgY29tbWFuZCBpcyBhZGQgaXQgY2FuIGJlIGluY2x1ZGVkIGluIHRoZSB0b29sYmFyIGJ5XHJcblx0ICogYWRkaW5nIGl0J3MgbmFtZSB0byB0aGUgdG9vbGJhciBvcHRpb24gaW4gdGhlIGNvbnN0cnVjdG9yLiBJdFxyXG5cdCAqIGNhbiBhbHNvIGJlIGV4ZWN1dGVkIG1hbnVhbGx5IGJ5IGNhbGxpbmdcclxuXHQgKiB7QGxpbmsgc2NlZGl0b3IuZXhlY0NvbW1hbmR9PC9wPlxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBTQ0VkaXRvci5jb21tYW5kLnNldChcImhlbGxvXCIsXHJcblx0ICoge1xyXG5cdCAqICAgICBleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0ICogICAgICAgICBhbGVydChcIkhlbGxvIFdvcmxkIVwiKTtcclxuXHQgKiAgICAgfVxyXG5cdCAqIH0pO1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gY21kXHJcblx0ICogQHJldHVybiB7dGhpc3xmYWxzZX0gUmV0dXJucyBmYWxzZSBpZiBuYW1lIG9yIGNtZCBpcyBmYWxzZVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRzZXQ6IGZ1bmN0aW9uIChuYW1lLCBjbWQpIHtcclxuXHRcdGlmICghbmFtZSB8fCAhY21kKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBtZXJnZSBhbnkgZXhpc3RpbmcgY29tbWFuZCBwcm9wZXJ0aWVzXHJcblx0XHRjbWQgPSB1dGlscy5leHRlbmQoZGVmYXVsdENvbW1hbmRzW25hbWVdIHx8IHt9LCBjbWQpO1xyXG5cclxuXHRcdGNtZC5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFNDRWRpdG9yLmNvbW1hbmQucmVtb3ZlKG5hbWUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRkZWZhdWx0Q29tbWFuZHNbbmFtZV0gPSBjbWQ7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgY29tbWFuZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRyZW1vdmU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRpZiAoZGVmYXVsdENvbW1hbmRzW25hbWVdKSB7XHJcblx0XHRcdGRlbGV0ZSBkZWZhdWx0Q29tbWFuZHNbbmFtZV07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG59O1xyXG4iLCJ2YXIgVVNFUl9BR0VOVCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbi8qKlxuICogRGV0ZWN0cyBpZiB0aGUgYnJvd3NlciBpcyBpT1NcbiAqXG4gKiBOZWVkZWQgdG8gZml4IGlPUyBzcGVjaWZpYyBidWdzXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBpb3NcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlvcyA9IC9pUGhvbmV8aVBvZHxpUGFkfCB3b3Nicm93c2VyXFwvL2kudGVzdChVU0VSX0FHRU5UKTtcblxuLyoqXG4gKiBJZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBXWVNJV1lHIGVkaXRpbmcgKGUuZy4gb2xkZXIgbW9iaWxlIGJyb3dzZXJzKS5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIGlzV3lzaXd5Z1N1cHBvcnRlZFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpc1d5c2l3eWdTdXBwb3J0ZWQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXJcdG1hdGNoLCBpc1Vuc3VwcG9ydGVkO1xuXG5cdC8vIElFIGlzIHRoZSBvbmx5IGJyb3dzZXIgdG8gc3VwcG9ydCBkb2N1bWVudE1vZGVcblx0dmFyIGllID0gISF3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRNb2RlO1xuXHR2YXIgbGVnYWN5RWRnZSA9ICctbXMtaW1lLWFsaWduJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cblx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRkaXYuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcblxuXHQvLyBDaGVjayBpZiB0aGUgY29udGVudEVkaXRhYmxlIGF0dHJpYnV0ZSBpcyBzdXBwb3J0ZWRcblx0aWYgKCEoJ2NvbnRlbnRFZGl0YWJsZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB8fFxuXHRcdGRpdi5jb250ZW50RWRpdGFibGUgIT09ICd0cnVlJykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEkgdGhpbmsgYmxhY2tiZXJyeSBzdXBwb3J0cyBjb250ZW50RWRpdGFibGUgb3Igd2lsbCBhdCBsZWFzdFxuXHQvLyBnaXZlIGEgdmFsaWQgdmFsdWUgZm9yIHRoZSBjb250ZW50RWRpdGFibGUgZGV0ZWN0aW9uIGFib3ZlXG5cdC8vIHNvIGl0IGlzbid0IGluY2x1ZGVkIGluIHRoZSBiZWxvdyB0ZXN0cy5cblxuXHQvLyBJIGhhdGUgaGF2aW5nIHRvIGRvIFVBIHNuaWZmaW5nIGJ1dCBzb21lIG1vYmlsZSBicm93c2VycyBzYXkgdGhleVxuXHQvLyBzdXBwb3J0IGNvbnRlbnRlZGlhYmxlIHdoZW4gaXQgaXNuJ3QgdXNhYmxlLCBpLmUuIHlvdSBjYW4ndCBlbnRlclxuXHQvLyB0ZXh0LlxuXHQvLyBUaGlzIGlzIHRoZSBvbmx5IHdheSBJIGNhbiB0aGluayBvZiB0byBkZXRlY3QgdGhlbSB3aGljaCBpcyBhbHNvIGhvd1xuXHQvLyBldmVyeSBvdGhlciBlZGl0b3IgSSd2ZSBzZWVuIGRlYWxzIHdpdGggdGhpcyBpc3N1ZS5cblxuXHQvLyBFeGNsdWRlIE9wZXJhIG1vYmlsZSBhbmQgbWluaVxuXHRpc1Vuc3VwcG9ydGVkID0gL09wZXJhIE1vYml8T3BlcmEgTWluaS9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cblx0aWYgKC9BbmRyb2lkL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSB0cnVlO1xuXG5cdFx0aWYgKC9TYWZhcmkvLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRcdC8vIEFuZHJvaWQgYnJvd3NlciA1MzQrIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGVcblx0XHRcdC8vIFRoaXMgYWxzbyBtYXRjaGVzIENocm9tZSB3aGljaCBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlIHRvb1xuXHRcdFx0bWF0Y2ggPSAvU2FmYXJpXFwvKFxcZCspLy5leGVjKFVTRVJfQUdFTlQpO1xuXHRcdFx0aXNVbnN1cHBvcnRlZCA9ICghbWF0Y2ggfHwgIW1hdGNoWzFdID8gdHJ1ZSA6IG1hdGNoWzFdIDwgNTM0KTtcblx0XHR9XG5cdH1cblxuXHQvLyBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIEFtYXpvbiBTaWxrIHN1cHBvcnRzIGl0LCBvbGRlciB2ZXJzaW9ucyBkaWRuJ3Rcblx0Ly8gQXMgaXQgdXNlcyB3ZWJraXQgbGlrZSBBbmRyb2lkLCBhc3N1bWUgaXQncyB0aGUgc2FtZSBhbmQgc3RhcnRlZFxuXHQvLyB3b3JraW5nIGF0IHZlcnNpb25zID49IDUzNFxuXHRpZiAoLyBTaWxrXFwvL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdG1hdGNoID0gL0FwcGxlV2ViS2l0XFwvKFxcZCspLy5leGVjKFVTRVJfQUdFTlQpO1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSAoIW1hdGNoIHx8ICFtYXRjaFsxXSA/IHRydWUgOiBtYXRjaFsxXSA8IDUzNCk7XG5cdH1cblxuXHQvLyBpT1MgNSsgc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZVxuXHRpZiAoaW9zKSB7XG5cdFx0Ly8gQmxvY2sgYW55IHZlcnNpb24gPD0gNF94KF94KVxuXHRcdGlzVW5zdXBwb3J0ZWQgPSAvT1MgWzAtNF0oX1xcZCkrIGxpa2UgTWFjL2kudGVzdChVU0VSX0FHRU5UKTtcblx0fVxuXG5cdC8vIEZpcmVmb3ggZG9lcyBzdXBwb3J0IFdZU0lXWUcgb24gbW9iaWxlcyBzbyBvdmVycmlkZVxuXHQvLyBhbnkgcHJldmlvdXMgdmFsdWUgaWYgdXNpbmcgRkZcblx0aWYgKC9GaXJlZm94L2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdGlmICgvT25lQnJvd3Nlci9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHQvLyBVQ0Jyb3dzZXIgd29ya3MgYnV0IGRvZXNuJ3QgZ2l2ZSBhIHVuaXF1ZSB1c2VyIGFnZW50XG5cdGlmIChuYXZpZ2F0b3IudmVuZG9yID09PSAnVUNXRUInKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gSUUgYW5kIGxlZ2FjeSBlZGdlIGFyZSBub3Qgc3VwcG9ydGVkIGFueSBtb3JlXG5cdGlmIChpZSB8fCBsZWdhY3lFZGdlKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IHRydWU7XG5cdH1cblxuXHRyZXR1cm4gIWlzVW5zdXBwb3J0ZWQ7XG59KCkpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMgKi9cbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5pbXBvcnQgX3RtcGwgZnJvbSAnLi90ZW1wbGF0ZXMuanMnO1xuXG4vKipcbiAqIEZpeGVzIGEgYnVnIGluIEZGIHdoZXJlIGl0IHNvbWV0aW1lcyB3cmFwc1xuICogbmV3IGxpbmVzIGluIHRoZWlyIG93biBsaXN0IGl0ZW0uXG4gKiBTZWUgaXNzdWUgIzM1OVxuICovXG5mdW5jdGlvbiBmaXhGaXJlZm94TGlzdEJ1ZyhlZGl0b3IpIHtcblx0Ly8gT25seSBhcHBseSB0byBGaXJlZm94IGFzIHdpbGwgYnJlYWsgb3RoZXIgYnJvd3NlcnMuXG5cdGlmICgnbW96SGlkZGVuJyBpbiBkb2N1bWVudCkge1xuXHRcdHZhciBub2RlID0gZWRpdG9yLmdldEJvZHkoKTtcblx0XHR2YXIgbmV4dDtcblxuXHRcdHdoaWxlIChub2RlKSB7XG5cdFx0XHRuZXh0ID0gbm9kZTtcblxuXHRcdFx0aWYgKG5leHQuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRuZXh0ID0gbmV4dC5maXJzdENoaWxkO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR3aGlsZSAobmV4dCAmJiAhbmV4dC5uZXh0U2libGluZykge1xuXHRcdFx0XHRcdG5leHQgPSBuZXh0LnBhcmVudE5vZGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSAzICYmIC9bXFxuXFxyXFx0XSsvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB7XG5cdFx0XHRcdC8vIE9ubHkgcmVtb3ZlIGlmIG5ld2xpbmVzIGFyZSBjb2xsYXBzZWRcblx0XHRcdFx0aWYgKCEvXnByZS8udGVzdChkb20uY3NzKG5vZGUucGFyZW50Tm9kZSwgJ3doaXRlU3BhY2UnKSkpIHtcblx0XHRcdFx0XHRkb20ucmVtb3ZlKG5vZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG5vZGUgPSBuZXh0O1xuXHRcdH1cblx0fVxufVxuXG5cbi8qKlxuICogTWFwIG9mIGFsbCB0aGUgY29tbWFuZHMgZm9yIFNDRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQG5hbWUgY29tbWFuZHNcbiAqL1xudmFyIGRlZmF1bHRDbWRzID0ge1xuXHQvLyBTVEFSVF9DT01NQU5EOiBCb2xkXG5cdGJvbGQ6IHtcblx0XHRleGVjOiAnYm9sZCcsXG5cdFx0dG9vbHRpcDogJ0JvbGQnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtCJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBJdGFsaWNcblx0aXRhbGljOiB7XG5cdFx0ZXhlYzogJ2l0YWxpYycsXG5cdFx0dG9vbHRpcDogJ0l0YWxpYycsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0knXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVuZGVybGluZVxuXHR1bmRlcmxpbmU6IHtcblx0XHRleGVjOiAndW5kZXJsaW5lJyxcblx0XHR0b29sdGlwOiAnVW5kZXJsaW5lJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrVSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogU3RyaWtldGhyb3VnaFxuXHRzdHJpa2U6IHtcblx0XHRleGVjOiAnc3RyaWtldGhyb3VnaCcsXG5cdFx0dG9vbHRpcDogJ1N0cmlrZXRocm91Z2gnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1YnNjcmlwdFxuXHRzdWJzY3JpcHQ6IHtcblx0XHRleGVjOiAnc3Vic2NyaXB0Jyxcblx0XHR0b29sdGlwOiAnU3Vic2NyaXB0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdXBlcnNjcmlwdFxuXHRzdXBlcnNjcmlwdDoge1xuXHRcdGV4ZWM6ICdzdXBlcnNjcmlwdCcsXG5cdFx0dG9vbHRpcDogJ1N1cGVyc2NyaXB0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IExlZnRcblx0bGVmdDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMykge1xuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZSkge1xuXHRcdFx0XHR2YXIgaXNMdHIgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cic7XG5cdFx0XHRcdHZhciBhbGlnbiA9IGRvbS5jc3Mobm9kZSwgJ3RleHRBbGlnbicpO1xuXG5cdFx0XHRcdC8vIENhbiBiZSAtbW96LWxlZnRcblx0XHRcdFx0cmV0dXJuIC9sZWZ0Ly50ZXN0KGFsaWduKSB8fFxuXHRcdFx0XHRcdGFsaWduID09PSAoaXNMdHIgPyAnc3RhcnQnIDogJ2VuZCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZXhlYzogJ2p1c3RpZnlsZWZ0Jyxcblx0XHR0b29sdGlwOiAnQWxpZ24gbGVmdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQ2VudHJlXG5cdGNlbnRlcjoge1xuXHRcdGV4ZWM6ICdqdXN0aWZ5Y2VudGVyJyxcblx0XHR0b29sdGlwOiAnQ2VudGVyJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBSaWdodFxuXHRyaWdodDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMykge1xuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZSkge1xuXHRcdFx0XHR2YXIgaXNMdHIgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cic7XG5cdFx0XHRcdHZhciBhbGlnbiA9IGRvbS5jc3Mobm9kZSwgJ3RleHRBbGlnbicpO1xuXG5cdFx0XHRcdC8vIENhbiBiZSAtbW96LXJpZ2h0XG5cdFx0XHRcdHJldHVybiAvcmlnaHQvLnRlc3QoYWxpZ24pIHx8XG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdlbmQnIDogJ3N0YXJ0Jyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRleGVjOiAnanVzdGlmeXJpZ2h0Jyxcblx0XHR0b29sdGlwOiAnQWxpZ24gcmlnaHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEp1c3RpZnlcblx0anVzdGlmeToge1xuXHRcdGV4ZWM6ICdqdXN0aWZ5ZnVsbCcsXG5cdFx0dG9vbHRpcDogJ0p1c3RpZnknXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRm9udFxuXHRmb250OiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGRvbS5kYXRhKHRoaXMsICdmb250JykpO1xuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5vcHRzLmZvbnRzLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoZm9udCkge1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2ZvbnRPcHQnLCB7XG5cdFx0XHRcdFx0Zm9udDogZm9udFxuXHRcdFx0XHR9LCB0cnVlKSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2ZvbnQtcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuZm9udC5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250TmFtZSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRuYW1lJywgZm9udE5hbWUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBOYW1lJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTaXplXG5cdHNpemU6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ3NpemUnKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gNzsgaSsrKSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnc2l6ZU9wdCcsIHtcblx0XHRcdFx0XHRzaXplOiBpXG5cdFx0XHRcdH0sIHRydWUpKTtcblx0XHRcdH1cblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2ZvbnRzaXplLXBpY2tlcicsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLnNpemUuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoZm9udFNpemUpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb250c2l6ZScsIGZvbnRTaXplKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0ZvbnQgU2l6ZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29sb3VyXG5cdGNvbG9yOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdGh0bWwgICAgPSAnJyxcblx0XHRcdFx0Y21kICAgICA9IGRlZmF1bHRDbWRzLmNvbG9yO1xuXG5cdFx0XHRpZiAoIWNtZC5faHRtbENhY2hlKSB7XG5cdFx0XHRcdGVkaXRvci5vcHRzLmNvbG9ycy5zcGxpdCgnfCcpLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbikge1xuXHRcdFx0XHRcdGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJzY2VkaXRvci1jb2xvci1jb2x1bW5cIj4nO1xuXG5cdFx0XHRcdFx0Y29sdW1uLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRcdFx0XHRcdGh0bWwgKz1cblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzY2VkaXRvci1jb2xvci1vcHRpb25cIicgK1xuXHRcdFx0XHRcdFx0XHQnIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJyArIGNvbG9yICsgJ1wiJyArXG5cdFx0XHRcdFx0XHRcdCcgZGF0YS1jb2xvcj1cIicgKyBjb2xvciArICdcIj48L2E+Jztcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGh0bWwgKz0gJzwvZGl2Pic7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGNtZC5faHRtbENhY2hlID0gaHRtbDtcblx0XHRcdH1cblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGRvbS5wYXJzZUhUTUwoY21kLl9odG1sQ2FjaGUpKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2NvbG9yJykpO1xuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdjb2xvci1waWNrZXInLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5jb2xvci5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChjb2xvcikge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvcmVjb2xvcicsIGNvbG9yKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0ZvbnQgQ29sb3InXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJlbW92ZSBGb3JtYXRcblx0cmVtb3ZlZm9ybWF0OiB7XG5cdFx0ZXhlYzogJ3JlbW92ZWZvcm1hdCcsXG5cdFx0dG9vbHRpcDogJ1JlbW92ZSBGb3JtYXR0aW5nJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEN1dFxuXHRjdXQ6IHtcblx0XHRleGVjOiAnY3V0Jyxcblx0XHR0b29sdGlwOiAnQ3V0Jyxcblx0XHRlcnJvck1lc3NhZ2U6ICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgYWxsb3cgdGhlIGN1dCBjb21tYW5kLiAnICtcblx0XHRcdCdQbGVhc2UgdXNlIHRoZSBrZXlib2FyZCBzaG9ydGN1dCBDdHJsL0NtZC1YJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb3B5XG5cdGNvcHk6IHtcblx0XHRleGVjOiAnY29weScsXG5cdFx0dG9vbHRpcDogJ0NvcHknLFxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY29weSBjb21tYW5kLiAnICtcblx0XHRcdCdQbGVhc2UgdXNlIHRoZSBrZXlib2FyZCBzaG9ydGN1dCBDdHJsL0NtZC1DJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBQYXN0ZVxuXHRwYXN0ZToge1xuXHRcdGV4ZWM6ICdwYXN0ZScsXG5cdFx0dG9vbHRpcDogJ1Bhc3RlJyxcblx0XHRlcnJvck1lc3NhZ2U6ICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgYWxsb3cgdGhlIHBhc3RlIGNvbW1hbmQuICcgK1xuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLVYnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlIFRleHRcblx0cGFzdGV0ZXh0OiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHR2YWwsXG5cdFx0XHRcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdGVkaXRvciAgPSB0aGlzO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3Bhc3RldGV4dCcsIHtcblx0XHRcdFx0bGFiZWw6IGVkaXRvci5fKFxuXHRcdFx0XHRcdCdQYXN0ZSB5b3VyIHRleHQgaW5zaWRlIHRoZSBmb2xsb3dpbmcgYm94Oidcblx0XHRcdFx0KSxcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFsID0gZG9tLmZpbmQoY29udGVudCwgJyN0eHQnKVswXS52YWx1ZTtcblxuXHRcdFx0XHRpZiAodmFsKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHZhbCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdwYXN0ZXRleHQnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdQYXN0ZSBUZXh0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBCdWxsZXQgTGlzdFxuXHRidWxsZXRsaXN0OiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0Zml4RmlyZWZveExpc3RCdWcodGhpcyk7XG5cdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdpbnNlcnR1bm9yZGVyZWRsaXN0Jyk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnQnVsbGV0IGxpc3QnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IE9yZGVyZWQgTGlzdFxuXHRvcmRlcmVkbGlzdDoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZpeEZpcmVmb3hMaXN0QnVnKHRoaXMpO1xuXHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnaW5zZXJ0b3JkZXJlZGxpc3QnKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdOdW1iZXJlZCBsaXN0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBJbmRlbnRcblx0aW5kZW50OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnQsIGZpcnN0QmxvY2spIHtcblx0XHRcdC8vIE9ubHkgd29ya3Mgd2l0aCBsaXN0cywgZm9yIG5vd1xuXHRcdFx0dmFyXHRyYW5nZSwgc3RhcnRQYXJlbnQsIGVuZFBhcmVudDtcblxuXHRcdFx0aWYgKGRvbS5pcyhmaXJzdEJsb2NrLCAnbGknKSkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRvbS5pcyhmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpKSB7XG5cdFx0XHRcdC8vIGlmIHRoZSB3aG9sZSBsaXN0IGlzIHNlbGVjdGVkLCB0aGVuIHRoaXMgbXVzdCBiZVxuXHRcdFx0XHQvLyBpbnZhbGlkYXRlZCBiZWNhdXNlIHRoZSBicm93c2VyIHdpbGwgcGxhY2UgYVxuXHRcdFx0XHQvLyA8YmxvY2txdW90ZT4gdGhlcmVcblx0XHRcdFx0cmFuZ2UgPSB0aGlzLmdldFJhbmdlSGVscGVyKCkuc2VsZWN0ZWRSYW5nZSgpO1xuXG5cdFx0XHRcdHN0YXJ0UGFyZW50ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIucGFyZW50Tm9kZTtcblx0XHRcdFx0ZW5kUGFyZW50ICAgPSByYW5nZS5lbmRDb250YWluZXIucGFyZW50Tm9kZTtcblxuXHRcdFx0XHQvLyBUT0RPOiBjb3VsZCB1c2Ugbm9kZVR5cGUgZm9yIHRoaXM/XG5cdFx0XHRcdC8vIE1heWJlIGp1c3QgY2hlY2sgdGhlIGZpcnN0QmxvY2sgY29udGFpbnMgYm90aCB0aGUgc3RhcnRcblx0XHRcdFx0Ly9hbmQgZW5kIGNvbnRhaW5lcnNcblxuXHRcdFx0XHQvLyBTZWxlY3QgdGhlIHRhZywgbm90IHRoZSB0ZXh0Tm9kZVxuXHRcdFx0XHQvLyAodGhhdCdzIHdoeSB0aGUgcGFyZW50Tm9kZSlcblx0XHRcdFx0aWYgKHN0YXJ0UGFyZW50ICE9PVxuXHRcdFx0XHRcdHN0YXJ0UGFyZW50LnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgfHxcblx0XHRcdFx0XHQvLyB3b3JrIGFyb3VuZCBhIGJ1ZyBpbiBGRlxuXHRcdFx0XHRcdChkb20uaXMoZW5kUGFyZW50LCAnbGknKSAmJiBlbmRQYXJlbnQgIT09XG5cdFx0XHRcdFx0XHRlbmRQYXJlbnQucGFyZW50Tm9kZS5sYXN0RWxlbWVudENoaWxkKSkge1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtMTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzLFxuXHRcdFx0XHRibG9jayA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblxuXHRcdFx0ZWRpdG9yLmZvY3VzKCk7XG5cblx0XHRcdC8vIEFuIGluZGVudCBzeXN0ZW0gaXMgcXVpdGUgY29tcGxpY2F0ZWQgYXMgdGhlcmUgYXJlIGxvYWRzXG5cdFx0XHQvLyBvZiBjb21wbGljYXRpb25zIGFuZCBpc3N1ZXMgYXJvdW5kIGhvdyB0byBpbmRlbnQgdGV4dFxuXHRcdFx0Ly8gQXMgZGVmYXVsdCwgbGV0J3MganVzdCBzdGF5IHdpdGggaW5kZW50aW5nIHRoZSBsaXN0cyxcblx0XHRcdC8vIGF0IGxlYXN0LCBmb3Igbm93LlxuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGJsb2NrLCAndWwsb2wsbWVudScpKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnaW5kZW50Jyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnQWRkIGluZGVudCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogT3V0ZGVudFxuXHRvdXRkZW50OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZG9tLmNsb3Nlc3QoZmlyc3RCbG9jaywgJ3VsLG9sLG1lbnUnKSA/IDAgOiAtMTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhclx0YmxvY2sgPSB0aGlzLmdldFJhbmdlSGVscGVyKCkuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGJsb2NrLCAndWwsb2wsbWVudScpKSB7XG5cdFx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ291dGRlbnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgb25lIGluZGVudCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBUYWJsZVxuXHR0YWJsZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0ZWRpdG9yICA9IHRoaXMsXG5cdFx0XHRcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgndGFibGUnLCB7XG5cdFx0XHRcdHJvd3M6IGVkaXRvci5fKCdSb3dzOicpLFxuXHRcdFx0XHRjb2xzOiBlZGl0b3IuXygnQ29sczonKSxcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyXHRyb3dzID0gTnVtYmVyKGRvbS5maW5kKGNvbnRlbnQsICcjcm93cycpWzBdLnZhbHVlKSxcblx0XHRcdFx0XHRjb2xzID0gTnVtYmVyKGRvbS5maW5kKGNvbnRlbnQsICcjY29scycpWzBdLnZhbHVlKSxcblx0XHRcdFx0XHRodG1sID0gJzx0YWJsZT4nO1xuXG5cdFx0XHRcdGlmIChyb3dzID4gMCAmJiBjb2xzID4gMCkge1xuXHRcdFx0XHRcdGh0bWwgKz0gQXJyYXkocm93cyArIDEpLmpvaW4oXG5cdFx0XHRcdFx0XHQnPHRyPicgK1xuXHRcdFx0XHRcdFx0XHRBcnJheShjb2xzICsgMSkuam9pbihcblx0XHRcdFx0XHRcdFx0XHQnPHRkPjxiciAvPjwvdGQ+J1xuXHRcdFx0XHRcdFx0XHQpICtcblx0XHRcdFx0XHRcdCc8L3RyPidcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0aHRtbCArPSAnPC90YWJsZT4nO1xuXG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKGh0bWwpO1xuXHRcdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnR0YWJsZScsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIHRhYmxlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEhvcml6b250YWwgUnVsZVxuXHRob3Jpem9udGFscnVsZToge1xuXHRcdGV4ZWM6ICdpbnNlcnRob3Jpem9udGFscnVsZScsXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIGhvcml6b250YWwgcnVsZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2RlXG5cdGNvZGU6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHQnPGNvZGU+Jyxcblx0XHRcdFx0JzxiciAvPjwvY29kZT4nXG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0NvZGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogSW1hZ2Vcblx0aW1hZ2U6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgc2VsZWN0ZWQsIGNiKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnaW1hZ2UnLCB7XG5cdFx0XHRcdHVybDogZWRpdG9yLl8oJ1VSTDonKSxcblx0XHRcdFx0d2lkdGg6IGVkaXRvci5fKCdXaWR0aCAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRoZWlnaHQ6IGVkaXRvci5fKCdIZWlnaHQgKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXG5cdFx0XHR2YXJcdHVybElucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNpbWFnZScpWzBdO1xuXG5cdFx0XHR1cmxJbnB1dC52YWx1ZSA9IHNlbGVjdGVkO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAodXJsSW5wdXQudmFsdWUpIHtcblx0XHRcdFx0XHRjYihcblx0XHRcdFx0XHRcdHVybElucHV0LnZhbHVlLFxuXHRcdFx0XHRcdFx0ZG9tLmZpbmQoY29udGVudCwgJyN3aWR0aCcpWzBdLnZhbHVlLFxuXHRcdFx0XHRcdFx0ZG9tLmZpbmQoY29udGVudCwgJyNoZWlnaHQnKVswXS52YWx1ZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRpbWFnZScsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuaW1hZ2UuX2Ryb3BEb3duKFxuXHRcdFx0XHRlZGl0b3IsXG5cdFx0XHRcdGNhbGxlcixcblx0XHRcdFx0JycsXG5cdFx0XHRcdGZ1bmN0aW9uICh1cmwsIHdpZHRoLCBoZWlnaHQpIHtcblx0XHRcdFx0XHR2YXIgYXR0cnMgID0gJyc7XG5cblx0XHRcdFx0XHRpZiAod2lkdGgpIHtcblx0XHRcdFx0XHRcdGF0dHJzICs9ICcgd2lkdGg9XCInICsgcGFyc2VJbnQod2lkdGgsIDEwKSArICdcIic7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGhlaWdodCkge1xuXHRcdFx0XHRcdFx0YXR0cnMgKz0gJyBoZWlnaHQ9XCInICsgcGFyc2VJbnQoaGVpZ2h0LCAxMCkgKyAnXCInO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGF0dHJzICs9ICcgc3JjPVwiJyArIGVzY2FwZS5lbnRpdGllcyh1cmwpICsgJ1wiJztcblxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0XHRcdCc8aW1nJyArIGF0dHJzICsgJyAvPidcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBpbWFnZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBFLW1haWxcblx0ZW1haWw6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2IpIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdlbWFpbCcsIHtcblx0XHRcdFx0bGFiZWw6IGVkaXRvci5fKCdFLW1haWw6JyksXG5cdFx0XHRcdGRlc2M6IGVkaXRvci5fKCdEZXNjcmlwdGlvbiAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXIgZW1haWwgPSBkb20uZmluZChjb250ZW50LCAnI2VtYWlsJylbMF0udmFsdWU7XG5cblx0XHRcdFx0aWYgKGVtYWlsKSB7XG5cdFx0XHRcdFx0Y2IoZW1haWwsIGRvbS5maW5kKGNvbnRlbnQsICcjZGVzJylbMF0udmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0ZW1haWwnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0ZWRpdG9yICA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmVtYWlsLl9kcm9wRG93bihcblx0XHRcdFx0ZWRpdG9yLFxuXHRcdFx0XHRjYWxsZXIsXG5cdFx0XHRcdGZ1bmN0aW9uIChlbWFpbCwgdGV4dCkge1xuXHRcdFx0XHRcdGlmICghZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuc2VsZWN0ZWRIdG1sKCkgfHwgdGV4dCkge1xuXHRcdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHRcdFx0XHQnPGEgaHJlZj1cIicgK1xuXHRcdFx0XHRcdFx0XHQnbWFpbHRvOicgKyBlc2NhcGUuZW50aXRpZXMoZW1haWwpICsgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcygodGV4dCB8fCBlbWFpbCkpICtcblx0XHRcdFx0XHRcdFx0JzwvYT4nXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2NyZWF0ZWxpbmsnLCAnbWFpbHRvOicgKyBlbWFpbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBlbWFpbCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBMaW5rXG5cdGxpbms6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2IpIHtcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2xpbmsnLCB7XG5cdFx0XHRcdHVybDogZWRpdG9yLl8oJ1VSTDonKSxcblx0XHRcdFx0ZGVzYzogZWRpdG9yLl8oJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGluczogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdHZhciBsaW5rSW5wdXQgPSBkb20uZmluZChjb250ZW50LCAnI2xpbmsnKVswXTtcblxuXHRcdFx0ZnVuY3Rpb24gaW5zZXJ0VXJsKGUpIHtcblx0XHRcdFx0aWYgKGxpbmtJbnB1dC52YWx1ZSkge1xuXHRcdFx0XHRcdGNiKGxpbmtJbnB1dC52YWx1ZSwgZG9tLmZpbmQoY29udGVudCwgJyNkZXMnKVswXS52YWx1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBpbnNlcnRVcmwpO1xuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdrZXlwcmVzcycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIDEzID0gZW50ZXIga2V5XG5cdFx0XHRcdGlmIChlLndoaWNoID09PSAxMyAmJiBsaW5rSW5wdXQudmFsdWUpIHtcblx0XHRcdFx0XHRpbnNlcnRVcmwoZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIGRvbS5FVkVOVF9DQVBUVVJFKTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGxpbmsnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5saW5rLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKHVybCwgdGV4dCkge1xuXHRcdFx0XHRpZiAodGV4dCB8fCAhZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuc2VsZWN0ZWRIdG1sKCkpIHtcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdFx0XHQnPGEgaHJlZj1cIicgKyBlc2NhcGUuZW50aXRpZXModXJsKSArICdcIj4nICtcblx0XHRcdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKHRleHQgfHwgdXJsKSArXG5cdFx0XHRcdFx0XHQnPC9hPidcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsIHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIGxpbmsnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVW5saW5rXG5cdHVubGluazoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50Tm9kZSgpLCAnYScpID8gMCA6IC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGFuY2hvciA9IGRvbS5jbG9zZXN0KHRoaXMuY3VycmVudE5vZGUoKSwgJ2EnKTtcblxuXHRcdFx0aWYgKGFuY2hvcikge1xuXHRcdFx0XHR3aGlsZSAoYW5jaG9yLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGFuY2hvci5maXJzdENoaWxkLCBhbmNob3IpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZG9tLnJlbW92ZShhbmNob3IpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1VubGluaydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFF1b3RlXG5cdHF1b3RlOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlciwgaHRtbCwgYXV0aG9yKSB7XG5cdFx0XHR2YXJcdGJlZm9yZSA9ICc8YmxvY2txdW90ZT4nLFxuXHRcdFx0XHRlbmQgICAgPSAnPC9ibG9ja3F1b3RlPic7XG5cblx0XHRcdC8vIGlmIHRoZXJlIGlzIEhUTUwgcGFzc2VkIHNldCBlbmQgdG8gbnVsbCBzbyBhbnkgc2VsZWN0ZWRcblx0XHRcdC8vIHRleHQgaXMgcmVwbGFjZWRcblx0XHRcdGlmIChodG1sKSB7XG5cdFx0XHRcdGF1dGhvciA9IChhdXRob3IgPyAnPGNpdGU+JyArXG5cdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKGF1dGhvcikgK1xuXHRcdFx0XHQnPC9jaXRlPicgOiAnJyk7XG5cdFx0XHRcdGJlZm9yZSA9IGJlZm9yZSArIGF1dGhvciArIGh0bWwgKyBlbmQ7XG5cdFx0XHRcdGVuZCAgICA9IG51bGw7XG5cdFx0XHQvLyBpZiBub3QgYWRkIGEgbmV3bGluZSB0byB0aGUgZW5kIG9mIHRoZSBpbnNlcnRlZCBxdW90ZVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmdldFJhbmdlSGVscGVyKCkuc2VsZWN0ZWRIdG1sKCkgPT09ICcnKSB7XG5cdFx0XHRcdGVuZCA9ICc8YnIgLz4nICsgZW5kO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKGJlZm9yZSwgZW5kKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBRdW90ZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBFbW90aWNvbnNcblx0ZW1vdGljb246IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0dmFyIGNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbiAoaW5jbHVkZU1vcmUpIHtcblx0XHRcdFx0dmFyXHRtb3JlTGluayxcblx0XHRcdFx0XHRvcHRzICAgICAgICAgICAgPSBlZGl0b3Iub3B0cyxcblx0XHRcdFx0XHRlbW90aWNvbnNSb290ICAgPSBvcHRzLmVtb3RpY29uc1Jvb3QgfHwgJycsXG5cdFx0XHRcdFx0ZW1vdGljb25zQ29tcGF0ID0gb3B0cy5lbW90aWNvbnNDb21wYXQsXG5cdFx0XHRcdFx0cmFuZ2VIZWxwZXIgICAgID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdFx0c3RhcnRTcGFjZSAgICAgID0gZW1vdGljb25zQ29tcGF0ICYmXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5nZXRPdXRlclRleHQodHJ1ZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxuXHRcdFx0XHRcdGVuZFNwYWNlICAgICAgICA9IGVtb3RpY29uc0NvbXBhdCAmJlxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIuZ2V0T3V0ZXJUZXh0KGZhbHNlLCAxKSAhPT0gJyAnID8gJyAnIDogJycsXG5cdFx0XHRcdFx0Y29udGVudCAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRcdGxpbmUgICAgICAgICAgICA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0XHRwZXJMaW5lICAgICAgICAgPSAwLFxuXHRcdFx0XHRcdGVtb3RpY29ucyAgICAgICA9IHV0aWxzLmV4dGVuZChcblx0XHRcdFx0XHRcdHt9LFxuXHRcdFx0XHRcdFx0b3B0cy5lbW90aWNvbnMuZHJvcGRvd24sXG5cdFx0XHRcdFx0XHRpbmNsdWRlTW9yZSA/IG9wdHMuZW1vdGljb25zLm1vcmUgOiB7fVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGxpbmUpO1xuXG5cdFx0XHRcdHBlckxpbmUgPSBNYXRoLnNxcnQoT2JqZWN0LmtleXMoZW1vdGljb25zKS5sZW5ndGgpO1xuXG5cdFx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnaW1nJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRlZGl0b3IuaW5zZXJ0KHN0YXJ0U3BhY2UgKyBkb20uYXR0cih0aGlzLCAnYWx0JykgKyBlbmRTcGFjZSxcblx0XHRcdFx0XHRcdG51bGwsIGZhbHNlKS5jbG9zZURyb3BEb3duKHRydWUpO1xuXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR1dGlscy5lYWNoKGVtb3RpY29ucywgZnVuY3Rpb24gKGNvZGUsIGVtb3RpY29uKSB7XG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxpbmUsIGRvbS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XG5cdFx0XHRcdFx0XHRzcmM6IGVtb3RpY29uc1Jvb3QgKyAoZW1vdGljb24udXJsIHx8IGVtb3RpY29uKSxcblx0XHRcdFx0XHRcdGFsdDogY29kZSxcblx0XHRcdFx0XHRcdHRpdGxlOiBlbW90aWNvbi50b29sdGlwIHx8IGNvZGVcblx0XHRcdFx0XHR9KSk7XG5cblx0XHRcdFx0XHRpZiAobGluZS5jaGlsZHJlbi5sZW5ndGggPj0gcGVyTGluZSkge1xuXHRcdFx0XHRcdFx0bGluZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBsaW5lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICghaW5jbHVkZU1vcmUgJiYgb3B0cy5lbW90aWNvbnMubW9yZSkge1xuXHRcdFx0XHRcdG1vcmVMaW5rID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2EnLCB7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1tb3JlJ1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKG1vcmVMaW5rLFxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZWRpdG9yLl8oJ01vcmUnKSkpO1xuXG5cdFx0XHRcdFx0ZG9tLm9uKG1vcmVMaW5rLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKFxuXHRcdFx0XHRcdFx0XHRjYWxsZXIsICdtb3JlLWVtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQodHJ1ZSlcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBtb3JlTGluayk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH07XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdlbW90aWNvbnMnLCBjcmVhdGVDb250ZW50KGZhbHNlKSk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHRkZWZhdWx0Q21kcy5lbW90aWNvbi5leGVjLmNhbGwodGhpcywgY2FsbGVyKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1vdGljb24nXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogWW91VHViZVxuXHR5b3V0dWJlOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgneW91dHViZU1lbnUnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IuXygnVmlkZW8gVVJMOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXIgdmFsID0gZG9tLmZpbmQoY29udGVudCwgJyNsaW5rJylbMF0udmFsdWU7XG5cdFx0XHRcdHZhciBpZE1hdGNoID0gdmFsLm1hdGNoKC8oPzp2PXx2XFwvfGVtYmVkXFwvfHlvdXR1LmJlXFwvKT8oW2EtekEtWjAtOV8tXXsxMX0pLyk7XG5cdFx0XHRcdHZhciB0aW1lTWF0Y2ggPSB2YWwubWF0Y2goL1smfD9dKD86c3Rhcik/dD0oKFxcZCtbaG1zXT8pezEsM30pLyk7XG5cdFx0XHRcdHZhciB0aW1lID0gMDtcblxuXHRcdFx0XHRpZiAodGltZU1hdGNoKSB7XG5cdFx0XHRcdFx0dXRpbHMuZWFjaCh0aW1lTWF0Y2hbMV0uc3BsaXQoL1tobXNdLyksIGZ1bmN0aW9uIChpLCB2YWwpIHtcblx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWUgPSAodGltZSAqIDYwKSArIE51bWJlcih2YWwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlkTWF0Y2ggJiYgL15bYS16QS1aMC05Xy1dezExfSQvLnRlc3QoaWRNYXRjaFsxXSkpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhpZE1hdGNoWzFdLCB0aW1lKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGxpbmsnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChidG4pIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy55b3V0dWJlLl9kcm9wRG93bihlZGl0b3IsIGJ0biwgZnVuY3Rpb24gKGlkLCB0aW1lKSB7XG5cdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChfdG1wbCgneW91dHViZScsIHtcblx0XHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBZb3VUdWJlIHZpZGVvJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IERhdGVcblx0ZGF0ZToge1xuXHRcdF9kYXRlOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG5cdFx0XHR2YXJcdG5vdyAgID0gbmV3IERhdGUoKSxcblx0XHRcdFx0eWVhciAgPSBub3cuZ2V0WWVhcigpLFxuXHRcdFx0XHRtb250aCA9IG5vdy5nZXRNb250aCgpICsgMSxcblx0XHRcdFx0ZGF5ICAgPSBub3cuZ2V0RGF0ZSgpO1xuXG5cdFx0XHRpZiAoeWVhciA8IDIwMDApIHtcblx0XHRcdFx0eWVhciA9IDE5MDAgKyB5ZWFyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobW9udGggPCAxMCkge1xuXHRcdFx0XHRtb250aCA9ICcwJyArIG1vbnRoO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGF5IDwgMTApIHtcblx0XHRcdFx0ZGF5ID0gJzAnICsgZGF5O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWRpdG9yLm9wdHMuZGF0ZUZvcm1hdFxuXHRcdFx0XHQucmVwbGFjZSgveWVhci9pLCB5ZWFyKVxuXHRcdFx0XHQucmVwbGFjZSgvbW9udGgvaSwgbW9udGgpXG5cdFx0XHRcdC5yZXBsYWNlKC9kYXkvaSwgZGF5KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy5kYXRlLl9kYXRlKHRoaXMpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy5kYXRlLl9kYXRlKHRoaXMpKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgY3VycmVudCBkYXRlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRpbWVcblx0dGltZToge1xuXHRcdF90aW1lOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdG5vdyAgID0gbmV3IERhdGUoKSxcblx0XHRcdFx0aG91cnMgPSBub3cuZ2V0SG91cnMoKSxcblx0XHRcdFx0bWlucyAgPSBub3cuZ2V0TWludXRlcygpLFxuXHRcdFx0XHRzZWNzICA9IG5vdy5nZXRTZWNvbmRzKCk7XG5cblx0XHRcdGlmIChob3VycyA8IDEwKSB7XG5cdFx0XHRcdGhvdXJzID0gJzAnICsgaG91cnM7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtaW5zIDwgMTApIHtcblx0XHRcdFx0bWlucyA9ICcwJyArIG1pbnM7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzZWNzIDwgMTApIHtcblx0XHRcdFx0c2VjcyA9ICcwJyArIHNlY3M7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBob3VycyArICc6JyArIG1pbnMgKyAnOicgKyBzZWNzO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLnRpbWUuX3RpbWUoKSk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgY3VycmVudCB0aW1lJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTHRyXG5cdGx0cjoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50cywgZmlyc3RCbG9jaykge1xuXHRcdFx0cmV0dXJuIGZpcnN0QmxvY2sgJiYgZmlyc3RCbG9jay5zdHlsZS5kaXJlY3Rpb24gPT09ICdsdHInO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRlZGl0b3IgPSB0aGlzLFxuXHRcdFx0XHRyYW5nZUhlbHBlciA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCAncCcpO1xuXG5cdFx0XHRcdG5vZGUgID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRcdGlmICghbm9kZSB8fCBkb20uaXMobm9kZSwgJ2JvZHknKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9nZ2xlVmFsdWUgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cicgPyAnJyA6ICdsdHInO1xuXHRcdFx0ZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJywgdG9nZ2xlVmFsdWUpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0xlZnQtdG8tUmlnaHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUnRsXG5cdHJ0bDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50cywgZmlyc3RCbG9jaykge1xuXHRcdFx0cmV0dXJuIGZpcnN0QmxvY2sgJiYgZmlyc3RCbG9jay5zdHlsZS5kaXJlY3Rpb24gPT09ICdydGwnO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRlZGl0b3IgPSB0aGlzLFxuXHRcdFx0XHRyYW5nZUhlbHBlciA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCAncCcpO1xuXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAncnRsJyA/ICcnIDogJ3J0bCc7XG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnUmlnaHQtdG8tTGVmdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFByaW50XG5cdHByaW50OiB7XG5cdFx0ZXhlYzogJ3ByaW50Jyxcblx0XHR0b29sdGlwOiAnUHJpbnQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTWF4aW1pemVcblx0bWF4aW1pemU6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubWF4aW1pemUoKTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLm1heGltaXplKCF0aGlzLm1heGltaXplKCkpO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ01heGltaXplJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrU2hpZnQrTSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBTb3VyY2Vcblx0c291cmNlOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLnNvdXJjZU1vZGUoKTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMudG9nZ2xlU291cmNlTW9kZSgpO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnVmlldyBzb3VyY2UnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtTJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIHRoaXMgaXMgaGVyZSBzbyB0aGF0IGNvbW1hbmRzIGFib3ZlIGNhbiBiZSByZW1vdmVkXG5cdC8vIHdpdGhvdXQgaGF2aW5nIHRvIHJlbW92ZSB0aGUgLCBhZnRlciB0aGUgbGFzdCBvbmUuXG5cdC8vIE5lZWRlZCBmb3IgSUUuXG5cdGlnbm9yZToge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRDbWRzO1xuIiwiaW1wb3J0IHsgYXR0ciB9IGZyb20gJy4vZG9tLmpzJztcblxuLyoqXG4gKiBEZWZhdWx0IG9wdGlvbnMgZm9yIFNDRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCB7XG5cdC8qKlxuXHQgKiBUb29sYmFyIGJ1dHRvbnMgb3JkZXIgYW5kIGdyb3Vwcy4gU2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmRcblx0ICogaGF2ZSBhIGJhciB8IHRvIHNlcGFyYXRlIGdyb3Vwc1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhcjogJ2JvbGQsaXRhbGljLHVuZGVybGluZSxzdHJpa2Usc3Vic2NyaXB0LHN1cGVyc2NyaXB0fCcgK1xuXHRcdCdsZWZ0LGNlbnRlcixyaWdodCxqdXN0aWZ5fGZvbnQsc2l6ZSxjb2xvcixyZW1vdmVmb3JtYXR8JyArXG5cdFx0J2N1dCxjb3B5LHBhc3RldGV4dHxidWxsZXRsaXN0LG9yZGVyZWRsaXN0LGluZGVudCxvdXRkZW50fCcgK1xuXHRcdCd0YWJsZXxjb2RlLHF1b3RlfGhvcml6b250YWxydWxlLGltYWdlLGVtYWlsLGxpbmssdW5saW5rfCcgK1xuXHRcdCdlbW90aWNvbix5b3V0dWJlLGRhdGUsdGltZXxsdHIscnRsfHByaW50LG1heGltaXplLHNvdXJjZScsXG5cblx0LyoqXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGNvbW1hbmRzIHRvIGV4Y2x1ZGVzIGZyb20gdGhlIHRvb2xiYXJcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHRvb2xiYXJFeGNsdWRlOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBTdHlsZXNoZWV0IHRvIGluY2x1ZGUgaW4gdGhlIFdZU0lXWUcgZWRpdG9yLiBUaGlzIGlzIHdoYXQgd2lsbCBzdHlsZVxuXHQgKiB0aGUgV1lTSVdZRyBlbGVtZW50c1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c3R5bGU6ICdqcXVlcnkuc2NlZGl0b3IuZGVmYXVsdC5jc3MnLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBmb250cyBmb3IgdGhlIGZvbnQgc2VsZWN0b3Jcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGZvbnRzOiAnQXJpYWwsQXJpYWwgQmxhY2ssQ29taWMgU2FucyBNUyxDb3VyaWVyIE5ldyxHZW9yZ2lhLEltcGFjdCwnICtcblx0XHQnU2Fucy1zZXJpZixTZXJpZixUaW1lcyBOZXcgUm9tYW4sVHJlYnVjaGV0IE1TLFZlcmRhbmEnLFxuXG5cdC8qKlxuXHQgKiBDb2xvcnMgc2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmQgaGF2ZSBhIGJhciB8IHRvIHNpZ25hbCBhIG5ld1xuXHQgKiBjb2x1bW4uXG5cdCAqXG5cdCAqIElmIG51bGwgdGhlIGNvbG9ycyB3aWxsIGJlIGF1dG8gZ2VuZXJhdGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y29sb3JzOiAnIzAwMDAwMCwjNDRCOEZGLCMxRTkyRjcsIzAwNzREOSwjMDA1REMyLCMwMDM2OUIsI2IzZDVmNHwnICtcblx0XHRcdCcjNDQ0NDQ0LCNDM0ZGRkYsIzlERjlGRiwjN0ZEQkZGLCM2OEM0RTgsIzQxOURDMSwjZDlmNGZmfCcgK1xuXHRcdFx0JyM2NjY2NjYsIzcyRkY4NCwjNENFQTVFLCMyRUNDNDAsIzE3QjUyOSwjMDA4RTAyLCNjMGYwYzZ8JyArXG5cdFx0XHQnIzg4ODg4OCwjRkZGRjQ0LCNGRkZBMUUsI0ZGREMwMCwjRThDNTAwLCNDMTlFMDAsI2ZmZjViM3wnICtcblx0XHRcdCcjYWFhYWFhLCNGRkM5NUYsI0ZGQTMzOSwjRkY4NTFCLCNFODZFMDQsI0MxNDcwMCwjZmZkYmJifCcgK1xuXHRcdFx0JyNjY2NjY2MsI0ZGODU3QSwjRkY1RjU0LCNGRjQxMzYsI0U4MkExRiwjQzEwMzAwLCNmZmM2YzN8JyArXG5cdFx0XHQnI2VlZWVlZSwjRkY1NkZGLCNGRjMwREMsI0YwMTJCRSwjRDkwMEE3LCNCMjAwODAsI2ZiYjhlY3wnICtcblx0XHRcdCcjZmZmZmZmLCNGNTUxRkYsI0NGMkJFNywjQjEwREM5LCM5QTAwQjIsIzlBMDBCMiwjZThiNmVmJyxcblxuXHQvKipcblx0ICogVGhlIGxvY2FsZSB0byB1c2UuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRsb2NhbGU6IGF0dHIoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbGFuZycpIHx8ICdlbicsXG5cblx0LyoqXG5cdCAqIFRoZSBDaGFyc2V0IHRvIHVzZVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y2hhcnNldDogJ3V0Zi04JyxcblxuXHQvKipcblx0ICogQ29tcGF0aWJpbGl0eSBtb2RlIGZvciBlbW90aWNvbnMuXG5cdCAqXG5cdCAqIEhlbHBzIGlmIHlvdSBoYXZlIGVtb3RpY29ucyBzdWNoIGFzIDovIHdoaWNoIHdvdWxkIHB1dCBhbiBlbW90aWNvblxuXHQgKiBpbnNpZGUgaHR0cDovL1xuXHQgKlxuXHQgKiBUaGlzIG1vZGUgcmVxdWlyZXMgZW1vdGljb25zIHRvIGJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBvciBlbmQgb2Zcblx0ICogbGluZSBjaGFycy4gVGhpcyBtb2RlIGhhcyBsaW1pdGVkIEFzIFlvdSBUeXBlIGVtb3RpY29uIGNvbnZlcnNpb25cblx0ICogc3VwcG9ydC4gSXQgd2lsbCBub3QgcmVwbGFjZSBBWVQgZm9yIGVuZCBvZiBsaW5lIGNoYXJzLCBvbmx5XG5cdCAqIGVtb3RpY29ucyBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UuIFRoZXkgd2lsbCBzdGlsbCBiZSByZXBsYWNlZFxuXHQgKiBjb3JyZWN0bHkgd2hlbiBsb2FkZWQganVzdCBub3QgQVlULlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVtb3RpY29uc0NvbXBhdDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBlbW90aWNvbnMuIENhbiBiZSBjaGFuZ2VzIGF0IHJ1bnRpbWUgdXNpbmcgdGhlXG5cdCAqIGVtb3RpY29ucygpIG1ldGhvZC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqIEBzaW5jZSAxLjQuMlxuXHQgKi9cblx0ZW1vdGljb25zRW5hYmxlZDogdHJ1ZSxcblxuXHQvKipcblx0ICogRW1vdGljb24gcm9vdCBVUkxcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGVtb3RpY29uc1Jvb3Q6ICcnLFxuXHRlbW90aWNvbnM6IHtcblx0XHRkcm9wZG93bjoge1xuXHRcdFx0JzopJzogJ2Vtb3RpY29ucy9zbWlsZS5wbmcnLFxuXHRcdFx0JzphbmdlbDonOiAnZW1vdGljb25zL2FuZ2VsLnBuZycsXG5cdFx0XHQnOmFuZ3J5Oic6ICdlbW90aWNvbnMvYW5ncnkucG5nJyxcblx0XHRcdCc4LSknOiAnZW1vdGljb25zL2Nvb2wucG5nJyxcblx0XHRcdCc6XFwnKCc6ICdlbW90aWNvbnMvY3d5LnBuZycsXG5cdFx0XHQnOmVybW06JzogJ2Vtb3RpY29ucy9lcm1tLnBuZycsXG5cdFx0XHQnOkQnOiAnZW1vdGljb25zL2dyaW4ucG5nJyxcblx0XHRcdCc8Myc6ICdlbW90aWNvbnMvaGVhcnQucG5nJyxcblx0XHRcdCc6KCc6ICdlbW90aWNvbnMvc2FkLnBuZycsXG5cdFx0XHQnOk8nOiAnZW1vdGljb25zL3Nob2NrZWQucG5nJyxcblx0XHRcdCc6UCc6ICdlbW90aWNvbnMvdG9uZ3VlLnBuZycsXG5cdFx0XHQnOyknOiAnZW1vdGljb25zL3dpbmsucG5nJ1xuXHRcdH0sXG5cdFx0bW9yZToge1xuXHRcdFx0JzphbGllbjonOiAnZW1vdGljb25zL2FsaWVuLnBuZycsXG5cdFx0XHQnOmJsaW5rOic6ICdlbW90aWNvbnMvYmxpbmsucG5nJyxcblx0XHRcdCc6Ymx1c2g6JzogJ2Vtb3RpY29ucy9ibHVzaC5wbmcnLFxuXHRcdFx0JzpjaGVlcmZ1bDonOiAnZW1vdGljb25zL2NoZWVyZnVsLnBuZycsXG5cdFx0XHQnOmRldmlsOic6ICdlbW90aWNvbnMvZGV2aWwucG5nJyxcblx0XHRcdCc6ZGl6enk6JzogJ2Vtb3RpY29ucy9kaXp6eS5wbmcnLFxuXHRcdFx0JzpnZXRsb3N0Oic6ICdlbW90aWNvbnMvZ2V0bG9zdC5wbmcnLFxuXHRcdFx0JzpoYXBweTonOiAnZW1vdGljb25zL2hhcHB5LnBuZycsXG5cdFx0XHQnOmtpc3Npbmc6JzogJ2Vtb3RpY29ucy9raXNzaW5nLnBuZycsXG5cdFx0XHQnOm5pbmphOic6ICdlbW90aWNvbnMvbmluamEucG5nJyxcblx0XHRcdCc6cGluY2g6JzogJ2Vtb3RpY29ucy9waW5jaC5wbmcnLFxuXHRcdFx0Jzpwb3V0eTonOiAnZW1vdGljb25zL3BvdXR5LnBuZycsXG5cdFx0XHQnOnNpY2s6JzogJ2Vtb3RpY29ucy9zaWNrLnBuZycsXG5cdFx0XHQnOnNpZGV3YXlzOic6ICdlbW90aWNvbnMvc2lkZXdheXMucG5nJyxcblx0XHRcdCc6c2lsbHk6JzogJ2Vtb3RpY29ucy9zaWxseS5wbmcnLFxuXHRcdFx0JzpzbGVlcGluZzonOiAnZW1vdGljb25zL3NsZWVwaW5nLnBuZycsXG5cdFx0XHQnOnVuc3VyZTonOiAnZW1vdGljb25zL3Vuc3VyZS5wbmcnLFxuXHRcdFx0Jzp3b290Oic6ICdlbW90aWNvbnMvdzAwdC5wbmcnLFxuXHRcdFx0Jzp3YXNzYXQ6JzogJ2Vtb3RpY29ucy93YXNzYXQucG5nJ1xuXHRcdH0sXG5cdFx0aGlkZGVuOiB7XG5cdFx0XHQnOndoaXN0bGluZzonOiAnZW1vdGljb25zL3doaXN0bGluZy5wbmcnLFxuXHRcdFx0Jzpsb3ZlOic6ICdlbW90aWNvbnMvd3ViLnBuZydcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFdpZHRoIG9mIHRoZSBlZGl0b3IuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWMgd2l0aFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHdpZHRoOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBIZWlnaHQgb2YgdGhlIGVkaXRvciBpbmNsdWRpbmcgdG9vbGJhci4gU2V0IHRvIG51bGwgZm9yIGF1dG9tYXRpY1xuXHQgKiBoZWlnaHRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRoZWlnaHQ6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgcmVzaXplZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUVuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBoYWxmIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5XaWR0aDogbnVsbCxcblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSBoZWlnaHQgb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1pbkhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIGhlaWdodCBvciAtMVxuXHQgKiBmb3IgdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4SGVpZ2h0OiBudWxsLFxuXHQvKipcblx0ICogTWF4IHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4V2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSBoZWlnaHQgaXMgZW5hYmxlZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUhlaWdodDogdHJ1ZSxcblx0LyoqXG5cdCAqIElmIHJlc2l6aW5nIGJ5IHdpZHRoIGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVXaWR0aDogdHJ1ZSxcblxuXHQvKipcblx0ICogRGF0ZSBmb3JtYXQsIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBsb2NhbGUgc3BlY2lmaWVzIG9uZS5cblx0ICpcblx0ICogVGhlIHdvcmRzIHllYXIsIG1vbnRoIGFuZCBkYXkgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB1c2VycyBjdXJyZW50XG5cdCAqIHllYXIsIG1vbnRoIGFuZCBkYXkuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkYXRlRm9ybWF0OiAneWVhci1tb250aC1kYXknLFxuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGluc2V0IHRoZSB0b29sYmFyIGludG8uXG5cdCAqXG5cdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdHRvb2xiYXJDb250YWluZXI6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBwYXN0ZSBmaWx0ZXJpbmcuIFRoaXMgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbCwgcGxlYXNlXG5cdCAqIHJlcG9ydCBhbnkgaXNzdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVuYWJsZVBhc3RlRmlsdGVyaW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gY29tcGxldGVseSBkaXNhYmxlIHBhc3RpbmcgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZGlzYWJsZVBhc3Rpbmc6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZWFkT25seTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIHNldCB0aGUgZWRpdG9yIHRvIHJpZ2h0LXRvLWxlZnQgbW9kZS5cblx0ICpcblx0ICogSWYgc2V0IHRvIG51bGwgdGhlIGRpcmVjdGlvbiB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cnRsOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIG9uIHBhZ2UgbG9hZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1czogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciB0byB0aGUgZW5kIG9mIHRoZSBjb250ZW50XG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b2ZvY3VzRW5kOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGV4cGFuZCB0aGUgZWRpdG9yIHRvIGZpeCB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9FeHBhbmQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIHVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXJcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvVXBkYXRlOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIHRoZSBicm93c2VycyBidWlsdCBpbiBzcGVsbCBjaGVja2VyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3BlbGxjaGVjazogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gcnVuIHRoZSBzb3VyY2UgZWRpdG9yIHdoZW4gdGhlcmUgaXMgbm8gV1lTSVdZRyBzdXBwb3J0LiBPbmx5XG5cdCAqIHJlYWxseSBhcHBsaWVzIHRvIG1vYmlsZSBPUydzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGxvYWQgdGhlIGVkaXRvciBpbiBzb3VyY2UgbW9kZSBhbmQgc3RpbGwgYWxsb3cgc3dpdGNoaW5nXG5cdCAqIGJldHdlZW4gV1lTSVdZRyBhbmQgc291cmNlIG1vZGVcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzdGFydEluU291cmNlTW9kZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIElEIHRvIGdpdmUgdGhlIGVkaXRvci5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGlkOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVnaW5zOiAnJyxcblxuXHQvKipcblx0ICogei1pbmRleCB0byBzZXQgdGhlIGVkaXRvciBjb250YWluZXIgdG8uIE5lZWRlZCBmb3IgalF1ZXJ5IFVJIGRpYWxvZy5cblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR6SW5kZXg6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIHRyaW0gdGhlIEJCQ29kZS4gUmVtb3ZlcyBhbnkgc3BhY2VzIGF0IHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZVxuXHQgKiBCQkNvZGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGJiY29kZVRyaW06IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBkaXNhYmxlIHJlbW92aW5nIGJsb2NrIGxldmVsIGVsZW1lbnRzIGJ5IHByZXNzaW5nIGJhY2tzcGFjZSBhdFxuXHQgKiB0aGUgc3RhcnQgb2YgdGhlbVxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVCbG9ja1JlbW92ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbG93ZWQgVVJMIChzaG91bGQgYmUgZWl0aGVyIHN0cmluZ3Mgb3IgcmVnZXgpIGZvciBpZnJhbWVzLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGEgc3RyaW5nIHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3RhcnQgb2YgdGhlIHNyYyBtYXRjaGVzIHRoZVxuXHQgKiBzcGVjaWZpZWQgc3RyaW5nIHdpbGwgYmUgYWxsb3dlZC5cblx0ICpcblx0ICogSWYgaXQncyBhIHJlZ2V4IHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3JjIG1hdGNoZXMgdGhlIHJlZ2V4IHdpbGwgYmVcblx0ICogYWxsb3dlZC5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZElmcmFtZVVybHM6IFtdLFxuXG5cdC8qKlxuXHQgKiBCQkNvZGUgcGFyc2VyIG9wdGlvbnMsIG9ubHkgYXBwbGllcyBpZiB1c2luZyB0aGUgZWRpdG9yIGluIEJCQ29kZVxuXHQgKiBtb2RlLlxuXHQgKlxuXHQgKiBTZWUgU0NFZGl0b3IuQkJDb2RlUGFyc2VyLmRlZmF1bHRzIGZvciBsaXN0IG9mIHZhbGlkIG9wdGlvbnNcblx0ICpcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHBhcnNlck9wdGlvbnM6IHsgfSxcblxuXHQvKipcblx0ICogQ1NTIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgdG8gZHJvcGRvd24gbWVudSAoZWcuIHotaW5kZXgpXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRkcm9wRG93bkNzczogeyB9LFxuXG5cdC8qKlxuXHQgKiBBbiBhcnJheSBvZiB0YWdzIHRoYXQgYXJlIGFsbG93ZWQgaW4gdGhlIGVkaXRvciBjb250ZW50LlxuXHQgKiBJZiBhIHRhZyBpcyBub3QgbGlzdGVkIGhlcmUsIGl0IHdpbGwgYmUgcmVtb3ZlZCB3aGVuIHRoZSBjb250ZW50IGlzXG5cdCAqIHNhbml0aXplZC5cblx0ICpcblx0ICogMSBUYWcgaXMgYWxyZWFkeSBhZGRlZCBieSBkZWZhdWx0OiBbJ2lmcmFtZSddLiBObyBuZWVkIHRvIGFkZCB0aGlzXG5cdCAqIGZ1cnRoZXIuXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICovXG5cdGFsbG93ZWRUYWdzOiBbXSxcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgYXR0cmlidXRlcyB0aGF0IGFyZSBhbGxvd2VkIG9uIHRhZ3MgaW4gdGhlIGVkaXRvciBjb250ZW50LlxuXHQgKiBJZiBhbiBhdHRyaWJ1dGUgaXMgbm90IGxpc3RlZCBoZXJlLCBpdCB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGUgY29udGVudFxuXHQgKiBpcyBzYW5pdGl6ZWQuXG5cdCAqXG5cdCAqIDMgQXR0cmlidXRlcyBhcmUgYWxyZWFkeSBhZGRlZCBieSBkZWZhdWx0OlxuXHQgKiBcdFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddLlxuXHQgKiBObyBuZWVkIHRvIGFkZCB0aGVzZSBmdXJ0aGVyLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkQXR0cmlidXRlczogW11cbn07XG4iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBDYWNoZSBvZiBjYW1lbENhc2UgQ1NTIHByb3BlcnR5IG5hbWVzXHJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxyXG4gKi9cclxudmFyIGNzc1Byb3BlcnR5TmFtZUNhY2hlID0ge307XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBlbGVtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIEVMRU1FTlRfTk9ERSA9IDE7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciB0ZXh0IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIFRFWFRfTk9ERSA9IDM7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBjb21tZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIENPTU1FTlRfTk9ERSA9IDg7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGRvY3VtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIERPQ1VNRU5UX05PREUgPSA5O1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgZG9jdW1lbnQgZnJhZ21lbnRzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPSAxMTtcclxuXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuXHR2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG5cclxuXHRyZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzXHJcbiAqXHJcbiAqIFdpbGwgY3JlYXRlIGl0IGluIHRoZSBjdXJyZW50IGRvY3VtZW50IHVubGVzcyBjb250ZXh0XHJcbiAqIGlzIHNwZWNpZmllZC5cclxuICpcclxuICogQHBhcmFtIHshc3RyaW5nfSB0YWdcclxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgc3RyaW5nPn0gW2F0dHJpYnV0ZXNdXHJcbiAqIEBwYXJhbSB7IURvY3VtZW50fSBbY29udGV4dF1cclxuICogQHJldHVybnMgeyFIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cmlidXRlcywgY29udGV4dCkge1xyXG5cdHZhciBub2RlID0gKGNvbnRleHQgfHwgZG9jdW1lbnQpLmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcblx0dXRpbHMuZWFjaChhdHRyaWJ1dGVzIHx8IHt9LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKGtleSA9PT0gJ3N0eWxlJykge1xyXG5cdFx0XHRub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZTtcclxuXHRcdH0gZWxzZSBpZiAoa2V5IGluIG5vZGUpIHtcclxuXHRcdFx0bm9kZVtrZXldID0gdmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHBhcmVudHMgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMge0FycmF5PEhUTUxFbGVtZW50Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJlbnRzKG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0dmFyIHBhcmVudHMgPSBbXTtcclxuXHR2YXIgcGFyZW50ID0gbm9kZSB8fCB7fTtcclxuXHJcblx0d2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgIS8oOXwxMSkvLnRlc3QocGFyZW50Lm5vZGVUeXBlKSkge1xyXG5cdFx0aWYgKCFzZWxlY3RvciB8fCBpcyhwYXJlbnQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRwYXJlbnRzLnB1c2gocGFyZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJlbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgZmlyc3QgcGFyZW50IG5vZGUgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJlbnQobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcGFyZW50ID0gbm9kZSB8fCB7fTtcclxuXHJcblx0d2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgIS8oOXwxMSkvLnRlc3QocGFyZW50Lm5vZGVUeXBlKSkge1xyXG5cdFx0aWYgKCFzZWxlY3RvciB8fCBpcyhwYXJlbnQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyB0aGUgcGFzc2VkIG5vZGUgYW5kIGFsbCBwYXJlbnRzIGFuZFxyXG4gKiByZXR1cm5zIHRoZSBmaXJzdCBtYXRjaGluZyBub2RlIGlmIGFueS5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3Qobm9kZSwgc2VsZWN0b3IpIHtcclxuXHRyZXR1cm4gaXMobm9kZSwgc2VsZWN0b3IpID8gbm9kZSA6IHBhcmVudChub2RlLCBzZWxlY3Rvcik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIERPTVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XHJcblx0aWYgKG5vZGUucGFyZW50Tm9kZSkge1xyXG5cdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFwcGVuZHMgY2hpbGQgdG8gcGFyZW50IG5vZGVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IGNoaWxkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcclxuXHRub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIGFueSBjaGlsZCBub2RlcyB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtOb2RlTGlzdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0cmV0dXJuIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcclxuICogdG8gdGhlIGNhcHR1cmUgcGhhc2VcclxuICpcclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIEVWRU5UX0NBUFRVUkUgPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIEZvciBvbigpIGFuZCBvZmYoKSBpZiB0byBhZGQvcmVtb3ZlIHRoZSBldmVudFxyXG4gKiB0byB0aGUgYnViYmxlIHBoYXNlXHJcbiAqXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBFVkVOVF9CVUJCTEUgPSBmYWxzZTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50cy5cclxuICpcclxuICogRXZlbnRzIHNob3VsZCBiZSBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50cy5cclxuICpcclxuICogSWYgc2VsZWN0b3IgaXMgc3BlY2lmaWVkIHRoZSBoYW5kbGVyIHdpbGwgb25seSBiZVxyXG4gKiBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGFyZ2V0IG1hdGNoZXMgdGhlIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBmblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9mZigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb24obm9kZSwgZXZlbnRzLCBzZWxlY3RvciwgZm4sIGNhcHR1cmUpIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRoYW5kbGVyID0gZm5bJ19zY2UtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdIHx8IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cdFx0XHRcdHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBub2RlKSB7XHJcblx0XHRcdFx0XHRpZiAoaXModGFyZ2V0LCBzZWxlY3RvcikpIHtcclxuXHRcdFx0XHRcdFx0Zm4uY2FsbCh0YXJnZXQsIGUpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Zm5bJ19zY2UtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdID0gaGFuZGxlcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZXIgPSBzZWxlY3RvcjtcclxuXHRcdFx0Y2FwdHVyZSA9IGZuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSB8fCBmYWxzZSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50cy5cclxuICpcclxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gZm5cclxuICogQHBhcmFtIHtib29sZWFufSBbY2FwdHVyZT1mYWxzZV1cclxuICogQHNlZSBvbigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb2ZmKG5vZGUsIGV2ZW50cywgc2VsZWN0b3IsIGZuLCBjYXB0dXJlKSB7XHJcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHZhciBoYW5kbGVyO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcclxuXHRcdFx0aGFuZGxlciA9IGZuWydfc2NlLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZXIgPSBzZWxlY3RvcjtcclxuXHRcdFx0Y2FwdHVyZSA9IGZuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSB8fCBmYWxzZSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJZiBvbmx5IGF0dHIgcGFyYW0gaXMgc3BlY2lmaWVkIGl0IHdpbGwgZ2V0XHJcbiAqIHRoZSB2YWx1ZSBvZiB0aGUgYXR0ciBwYXJhbS5cclxuICpcclxuICogSWYgdmFsdWUgaXMgc3BlY2lmaWVkIGJ1dCBudWxsIHRoZSBhdHRyaWJ1dGVcclxuICogd2lsbCBiZSByZW1vdmVkIG90aGVyd2lzZSB0aGUgYXR0ciB2YWx1ZSB3aWxsXHJcbiAqIGJlIHNldCB0byB0aGUgcGFzc2VkIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGF0dHJcclxuICogQHBhcmFtIHs/c3RyaW5nfSBbdmFsdWVdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyLCB2YWx1ZSkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0cmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG5cdH1cclxuXHJcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcSwgbm8tZXEtbnVsbFxyXG5cdGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcblx0XHRyZW1vdmVBdHRyKG5vZGUsIGF0dHIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRub2RlLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGF0dHJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBdHRyKG5vZGUsIGF0dHIpIHtcclxuXHRub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHBhc3NlZCBlbGVtZW50cyBkaXNwbGF5IHRvIG5vbmVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlKG5vZGUpIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gZGVmYXVsdFxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3cobm9kZSkge1xyXG5cdGNzcyhub2RlLCAnZGlzcGxheScsICcnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgYW4gZWxlbWVudHMgdmlzaWJpbGl0eVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShub2RlKSB7XHJcblx0aWYgKGlzVmlzaWJsZShub2RlKSkge1xyXG5cdFx0aGlkZShub2RlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c2hvdyhub2RlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIGEgY29tcHV0ZWQgQ1NTIHZhbHVlcyBvciBzZXRzIGFuIGlubGluZSBDU1MgdmFsdWVcclxuICpcclxuICogUnVsZXMgc2hvdWxkIGJlIGluIGNhbWVsQ2FzZSBmb3JtYXQgYW5kIG5vdFxyXG4gKiBoeXBoZW5hdGVkIGxpa2UgQ1NTIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IU9iamVjdHxzdHJpbmd9IHJ1bGVcclxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBbdmFsdWVdXHJcbiAqIEByZXR1cm4ge3N0cmluZ3xudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNzcyhub2RlLCBydWxlLCB2YWx1ZSkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHJ1bGUpKSB7XHJcblx0XHRcdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxID8gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKVtydWxlXSA6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dXRpbHMuZWFjaChydWxlLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRjc3Mobm9kZSwga2V5LCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gaXNOYU4gcmV0dXJucyBmYWxzZSBmb3IgbnVsbCwgZmFsc2UgYW5kIGVtcHR5IHN0cmluZ3NcclxuXHRcdC8vIHNvIG5lZWQgdG8gY2hlY2sgaXQncyB0cnV0aHkgb3IgMFxyXG5cdFx0dmFyIGlzTnVtZXJpYyA9ICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkgJiYgIWlzTmFOKHZhbHVlKTtcclxuXHRcdG5vZGUuc3R5bGVbcnVsZV0gPSBpc051bWVyaWMgPyB2YWx1ZSArICdweCcgOiB2YWx1ZTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSBkYXRhIGF0dHJpYnV0ZXMgb24gYSBub2RlXHJcbiAqXHJcbiAqIFVubGlrZSB0aGUgalF1ZXJ5IHZlcnNpb24gdGhpcyBvbmx5IHN0b3JlcyBkYXRhXHJcbiAqIGluIHRoZSBET00gYXR0cmlidXRlcyB3aGljaCBtZWFucyBvbmx5IHN0cmluZ3NcclxuICogY2FuIGJlIHN0b3JlZC5cclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ZhbHVlXVxyXG4gKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGEobm9kZSwga2V5LCB2YWx1ZSkge1xyXG5cdHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcclxuXHR2YXIgZGF0YSA9IHt9O1xyXG5cclxuXHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHR1dGlscy5lYWNoKG5vZGUuYXR0cmlidXRlcywgZnVuY3Rpb24gKF8sIGF0dHIpIHtcclxuXHRcdFx0XHRpZiAoL15kYXRhLS9pLnRlc3QoYXR0ci5uYW1lKSkge1xyXG5cdFx0XHRcdFx0ZGF0YVthdHRyLm5hbWUuc3Vic3RyKDUpXSA9IGF0dHIudmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAyKSB7XHJcblx0XHRcdHJldHVybiBhdHRyKG5vZGUsICdkYXRhLScgKyBrZXkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF0dHIobm9kZSwgJ2RhdGEtJyArIGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIG5vZGUgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpcyhub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciByZXN1bHQgPSBmYWxzZTtcclxuXHJcblx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXN1bHQgPSAobm9kZS5tYXRjaGVzIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3IgfHxcclxuXHRcdFx0bm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgc2VsZWN0b3IpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgbm9kZSBjb250YWlucyBjaGlsZCBvdGhlcndpc2UgZmFsc2UuXHJcbiAqXHJcbiAqIFRoaXMgZGlmZmVycyBmcm9tIHRoZSBET00gY29udGFpbnMoKSBtZXRob2QgaW4gdGhhdFxyXG4gKiBpZiBub2RlIGFuZCBjaGlsZCBhcmUgZXF1YWwgdGhpcyB3aWxsIHJldHVybiBmYWxzZS5cclxuICpcclxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWlucyhub2RlLCBjaGlsZCkge1xyXG5cdHJldHVybiBub2RlICE9PSBjaGlsZCAmJiBub2RlLmNvbnRhaW5zICYmIG5vZGUuY29udGFpbnMoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEByZXR1cm5zIHs/SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciBwcmV2ID0gbm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuXHRpZiAoc2VsZWN0b3IgJiYgcHJldikge1xyXG5cdFx0cmV0dXJuIGlzKHByZXYsIHNlbGVjdG9yKSA/IHByZXYgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHByZXY7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7IU5vZGV9IHJlZk5vZGVcclxuICogQHJldHVybnMge05vZGV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZk5vZGUpIHtcclxuXHRyZXR1cm4gcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPHN0cmluZz59XHJcbiAqL1xyXG5mdW5jdGlvbiBjbGFzc2VzKG5vZGUpIHtcclxuXHRyZXR1cm4gbm9kZS5jbGFzc05hbWUudHJpbSgpLnNwbGl0KC9cXHMrLyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xyXG5cdHJldHVybiBpcyhub2RlLCAnLicgKyBjbGFzc05hbWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xyXG5cdHZhciBjbGFzc0xpc3QgPSBjbGFzc2VzKG5vZGUpO1xyXG5cclxuXHRpZiAoY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcclxuXHRcdGNsYXNzTGlzdC5wdXNoKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHRub2RlLmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKCcgJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSB7XHJcblx0dmFyIGNsYXNzTGlzdCA9IGNsYXNzZXMobm9kZSk7XHJcblxyXG5cdHV0aWxzLmFycmF5UmVtb3ZlKGNsYXNzTGlzdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhIGNsYXNzIG9uIG5vZGUuXHJcbiAqXHJcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgdHJ1dGh5IGl0IHdpbGwgYWRkXHJcbiAqIHRoZSBjbGFzcy5cclxuICpcclxuICogSWYgc3RhdGUgaXMgc3BlY2lmaWVkIGFuZCBpcyBmYWxzZXkgaXQgd2lsbCByZW1vdmVcclxuICogdGhlIGNsYXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICogQHBhcmFtIHtib29sZWFufSBbc3RhdGVdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lLCBzdGF0ZSkge1xyXG5cdHN0YXRlID0gdXRpbHMuaXNVbmRlZmluZWQoc3RhdGUpID8gIWhhc0NsYXNzKG5vZGUsIGNsYXNzTmFtZSkgOiBzdGF0ZTtcclxuXHJcblx0aWYgKHN0YXRlKSB7XHJcblx0XHRhZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgb3Igc2V0cyB0aGUgd2lkdGggb2YgdGhlIHBhc3NlZCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW3ZhbHVlXVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB3aWR0aChub2RlLCB2YWx1ZSkge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ0xlZnQpICsgdG9GbG9hdChjcy5wYWRkaW5nUmlnaHQpO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyTGVmdFdpZHRoKSArIHRvRmxvYXQoY3MuYm9yZGVyUmlnaHRXaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0V2lkdGggLSBwYWRkaW5nIC0gYm9yZGVyO1xyXG5cdH1cclxuXHJcblx0Y3NzKG5vZGUsICd3aWR0aCcsIHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgb3Igc2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBwYXNzZWQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0KG5vZGUsIHZhbHVlKSB7XHJcblx0aWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG5cdFx0dmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuXHRcdHZhciBwYWRkaW5nID0gdG9GbG9hdChjcy5wYWRkaW5nVG9wKSArIHRvRmxvYXQoY3MucGFkZGluZ0JvdHRvbSk7XHJcblx0XHR2YXIgYm9yZGVyID0gdG9GbG9hdChjcy5ib3JkZXJUb3BXaWR0aCkgKyB0b0Zsb2F0KGNzLmJvcmRlckJvdHRvbVdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gbm9kZS5vZmZzZXRIZWlnaHQgLSBwYWRkaW5nIC0gYm9yZGVyO1xyXG5cdH1cclxuXHJcblx0Y3NzKG5vZGUsICdoZWlnaHQnLCB2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VycyBhIGN1c3RvbSBldmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmRcclxuICogc2V0cyB0aGUgZGV0YWlsIHByb3BlcnR5IHRvIHRoZSBkYXRhIG9iamVjdCBwYXNzZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlcihub2RlLCBldmVudE5hbWUsIGRhdGEpIHtcclxuXHR2YXIgZXZlbnQ7XHJcblxyXG5cdGlmICh1dGlscy5pc0Z1bmN0aW9uKHdpbmRvdy5DdXN0b21FdmVudCkpIHtcclxuXHRcdGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge1xyXG5cdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxyXG5cdFx0XHRkZXRhaWw6IGRhdGFcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRldmVudCA9IG5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuXHRcdGV2ZW50LmluaXRDdXN0b21FdmVudChldmVudE5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgaWYgYSBub2RlIGlzIHZpc2libGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlKSB7XHJcblx0cmV0dXJuICEhbm9kZS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgQ1NTIHByb3BlcnR5IG5hbWVzIGludG8gY2FtZWwgY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBjYW1lbENhc2Uoc3RyaW5nKSB7XHJcblx0cmV0dXJuIHN0cmluZ1xyXG5cdFx0LnJlcGxhY2UoL14tbXMtLywgJ21zLScpXHJcblx0XHQucmVwbGFjZSgvLShcXHcpL2csIGZ1bmN0aW9uIChtYXRjaCwgY2hhcikge1xyXG5cdFx0XHRyZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTG9vcCBhbGwgY2hpbGQgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlXHJcbiAqXHJcbiAqIFRoZSBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IDEgcGFyYW1ldGVyIGJlaW5nIHRoZSBub2RlLlxyXG4gKiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGUgbG9vcCB3aWxsIGJlIGV4aXRlZC5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtICB7ZnVuY3Rpb259IGZ1bmMgICAgICAgICAgIENhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aXRoIGV2ZXJ5XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBub2RlIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gaW5uZXJtb3N0Rmlyc3QgIElmIHRoZSBpbm5lcm1vc3Qgbm9kZSBzaG91bGQgYmUgcGFzc2VkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgZnVuY3Rpb24gYmVmb3JlIGl0J3MgcGFyZW50cy5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gc2libGluZ3NPbmx5ICAgIElmIHRvIG9ubHkgdHJhdmVyc2UgdGhlIG5vZGVzIHNpYmxpbmdzXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXZlcnNlPWZhbHNlXSBJZiB0byB0cmF2ZXJzZSB0aGUgbm9kZXMgaW4gcmV2ZXJzZVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHJldmVyc2UpIHtcclxuXHRub2RlID0gcmV2ZXJzZSA/IG5vZGUubGFzdENoaWxkIDogbm9kZS5maXJzdENoaWxkO1xyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0dmFyIG5leHQgPSByZXZlcnNlID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0KCFpbm5lcm1vc3RGaXJzdCAmJiBmdW5jKG5vZGUpID09PSBmYWxzZSkgfHxcclxuXHRcdFx0KCFzaWJsaW5nc09ubHkgJiYgdHJhdmVyc2UoXHJcblx0XHRcdFx0bm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSwgcmV2ZXJzZVxyXG5cdFx0XHQpID09PSBmYWxzZSkgfHxcclxuXHRcdFx0KGlubmVybW9zdEZpcnN0ICYmIGZ1bmMobm9kZSkgPT09IGZhbHNlKVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gbmV4dDtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaWtlIHRyYXZlcnNlIGJ1dCBsb29wcyBpbiByZXZlcnNlXHJcbiAqIEBzZWUgdHJhdmVyc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByVHJhdmVyc2Uobm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSkge1xyXG5cdHRyYXZlcnNlKG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2VzIEhUTUwgaW50byBhIGRvY3VtZW50IGZyYWdtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IFtjb250ZXh0XVxyXG4gKiBAc2luY2UgMS40LjRcclxuICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCwgY29udGV4dCkge1xyXG5cdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG5cclxuXHR2YXJcdHJldCA9IGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdHZhciB0bXAgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY29udGV4dCk7XHJcblxyXG5cdHRtcC5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuXHR3aGlsZSAodG1wLmZpcnN0Q2hpbGQpIHtcclxuXHRcdGFwcGVuZENoaWxkKHJldCwgdG1wLmZpcnN0Q2hpbGQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhbnkgc3R5bGluZy5cclxuICpcclxuICogSXQgaGFzIHN0eWxpbmcgaWYgaXQgaXMgbm90IGEgcGxhaW4gPGRpdj4gb3IgPHA+IG9yXHJcbiAqIGlmIGl0IGhhcyBhIGNsYXNzLCBzdHlsZSBhdHRyaWJ1dGUgb3IgZGF0YS5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgMS40LjRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsaW5nKG5vZGUpIHtcclxuXHRyZXR1cm4gbm9kZSAmJiAoIWlzKG5vZGUsICdwLGRpdicpIHx8IG5vZGUuY2xhc3NOYW1lIHx8XHJcblx0XHRhdHRyKG5vZGUsICdzdHlsZScpIHx8ICF1dGlscy5pc0VtcHR5T2JqZWN0KGRhdGEobm9kZSkpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIGVsZW1lbnQgZnJvbSBvbmUgdHlwZSB0byBhbm90aGVyLlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSBpdCBjYW4gY29udmVydCB0aGUgZWxlbWVudCA8Yj4gdG8gPHN0cm9uZz5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgIHRvVGFnTmFtZVxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEVsZW1lbnQoZWxlbWVudCwgdG9UYWdOYW1lKSB7XHJcblx0dmFyIG5ld0VsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRvVGFnTmFtZSwge30sIGVsZW1lbnQub3duZXJEb2N1bWVudCk7XHJcblxyXG5cdHV0aWxzLmVhY2goZWxlbWVudC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoXywgYXR0cmlidXRlKSB7XHJcblx0XHQvLyBTb21lIGJyb3dzZXJzIHBhcnNlIGludmFsaWQgYXR0cmlidXRlcyBuYW1lcyBsaWtlXHJcblx0XHQvLyAnc2l6ZVwiMicgd2hpY2ggdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gc2V0LCBqdXN0XHJcblx0XHQvLyBpZ25vcmUgdGhlc2UuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRhdHRyKG5ld0VsZW1lbnQsIGF0dHJpYnV0ZS5uYW1lLCBhdHRyaWJ1dGUudmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cdH0pO1xyXG5cclxuXHR3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRhcHBlbmRDaGlsZChuZXdFbGVtZW50LCBlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdH1cclxuXHJcblx0ZWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCBlbGVtZW50KTtcclxuXHJcblx0cmV0dXJuIG5ld0VsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIGJsb2NrIGxldmVsIGVsZW1lbnRzIHNlcGFyYXRlZCBieSBiYXJzICh8KVxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IHZhciBibG9ja0xldmVsTGlzdCA9ICd8Ym9keXxocnxwfGRpdnxoMXxoMnxoM3xoNHxoNXxoNnxhZGRyZXNzfHByZXwnICtcclxuXHQnZm9ybXx0YWJsZXx0Ym9keXx0aGVhZHx0Zm9vdHx0aHx0cnx0ZHxsaXxvbHx1bHxibG9ja3F1b3RlfGNlbnRlcnwnICtcclxuXHQnZGV0YWlsc3xzZWN0aW9ufGFydGljbGV8YXNpZGV8bmF2fG1haW58aGVhZGVyfGhncm91cHxmb290ZXJ8ZmllbGRzZXR8JyArXHJcblx0J2RsfGR0fGRkfGZpZ3VyZXxmaWdjYXB0aW9ufCc7XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBlbGVtZW50cyB0aGF0IGRvIG5vdCBhbGxvdyBjaGlsZHJlbiBzZXBhcmF0ZWQgYnkgYmFycyAofClcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqIEBzaW5jZSAgMS40LjVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5IYXZlQ2hpbGRyZW4obm9kZSkge1xyXG5cdC8vIDEgID0gRWxlbWVudFxyXG5cdC8vIDkgID0gRG9jdW1lbnRcclxuXHQvLyAxMSA9IERvY3VtZW50IEZyYWdtZW50XHJcblx0aWYgKCEvMTE/fDkvLnRlc3Qobm9kZS5ub2RlVHlwZSkpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8vIExpc3Qgb2YgZW1wdHkgSFRNTCB0YWdzIHNlcGFyYXRlZCBieSBiYXIgKHwpIGNoYXJhY3Rlci5cclxuXHQvLyBTb3VyY2U6IGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L2luZGV4L2VsZW1lbnRzLmh0bWxcclxuXHQvLyBTb3VyY2U6IGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI3ZvaWQtZWxlbWVudHNcclxuXHRyZXR1cm4gKCd8aWZyYW1lfGFyZWF8YmFzZXxiYXNlZm9udHxicnxjb2x8ZnJhbWV8aHJ8aW1nfGlucHV0fHdicicgK1xyXG5cdFx0J3xpc2luZGV4fGxpbmt8bWV0YXxwYXJhbXxjb21tYW5kfGVtYmVkfGtleWdlbnxzb3VyY2V8dHJhY2t8JyArXHJcblx0XHQnb2JqZWN0fCcpLmluZGV4T2YoJ3wnICsgbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICsgJ3wnKSA8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gZWxlbWVudCBpcyBpbmxpbmVcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVDb2RlQXNCbG9jaz1mYWxzZV1cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0lubGluZShlbG0sIGluY2x1ZGVDb2RlQXNCbG9jaykge1xyXG5cdHZhciB0YWdOYW1lLFxyXG5cdFx0bm9kZVR5cGUgPSAoZWxtIHx8IHt9KS5ub2RlVHlwZSB8fCBURVhUX05PREU7XHJcblxyXG5cdGlmIChub2RlVHlwZSAhPT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXR1cm4gbm9kZVR5cGUgPT09IFRFWFRfTk9ERTtcclxuXHR9XHJcblxyXG5cdHRhZ05hbWUgPSBlbG0udGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRpZiAodGFnTmFtZSA9PT0gJ2NvZGUnKSB7XHJcblx0XHRyZXR1cm4gIWluY2x1ZGVDb2RlQXNCbG9jaztcclxuXHR9XHJcblxyXG5cdHJldHVybiBibG9ja0xldmVsTGlzdC5pbmRleE9mKCd8JyArIHRhZ05hbWUgKyAnfCcpIDwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvcHkgdGhlIENTUyBmcm9tIDEgbm9kZSB0byBhbm90aGVyLlxyXG4gKlxyXG4gKiBPbmx5IGNvcGllcyBDU1MgZGVmaW5lZCBvbiB0aGUgZWxlbWVudCBlLmcuIHN0eWxlIGF0dHIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZyb21cclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9cclxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjMuMS4wXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29weUNTUyhmcm9tLCB0bykge1xyXG5cdGlmICh0by5zdHlsZSAmJiBmcm9tLnN0eWxlKSB7XHJcblx0XHR0by5zdHlsZS5jc3NUZXh0ID0gZnJvbS5zdHlsZS5jc3NUZXh0ICsgdG8uc3R5bGUuY3NzVGV4dDtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBET00gbm9kZSBpcyBlbXB0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eShub2RlKSB7XHJcblx0aWYgKG5vZGUubGFzdENoaWxkICYmIGlzRW1wdHkobm9kZS5sYXN0Q2hpbGQpKSB7XHJcblx0XHRyZW1vdmUobm9kZS5sYXN0Q2hpbGQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDMgPyAhbm9kZS5ub2RlVmFsdWUgOlxyXG5cdFx0KGNhbkhhdmVDaGlsZHJlbihub2RlKSAmJiAhbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaXhlcyBibG9jayBsZXZlbCBlbGVtZW50cyBpbnNpZGUgaW4gaW5saW5lIGVsZW1lbnRzLlxyXG4gKlxyXG4gKiBBbHNvIGZpeGVzIGludmFsaWQgbGlzdCBuZXN0aW5nIGJ5IHBsYWNpbmcgbmVzdGVkIGxpc3RzXHJcbiAqIGluc2lkZSB0aGUgcHJldmlvdXMgbGkgdGFnIG9yIHdyYXBwaW5nIHRoZW0gaW4gYW4gbGkgdGFnLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZml4TmVzdGluZyhub2RlKSB7XHJcblx0dHJhdmVyc2Uobm9kZSwgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdHZhciBsaXN0ID0gJ3VsLG9sJyxcclxuXHRcdFx0aXNCbG9jayA9ICFpc0lubGluZShub2RlLCB0cnVlKSAmJiBub2RlLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUsXHJcblx0XHRcdHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHJcblx0XHQvLyBBbnkgYmxvY2tsZXZlbCBlbGVtZW50IGluc2lkZSBhbiBpbmxpbmUgZWxlbWVudCBuZWVkcyBmaXhpbmcuXHJcblx0XHQvLyBBbHNvIDxwPiB0YWdzIHRoYXQgY29udGFpbiBibG9ja3Mgc2hvdWxkIGJlIGZpeGVkXHJcblx0XHRpZiAoaXNCbG9jayAmJiAoaXNJbmxpbmUocGFyZW50LCB0cnVlKSB8fCBwYXJlbnQudGFnTmFtZSA9PT0gJ1AnKSkge1xyXG5cdFx0XHQvLyBGaW5kIHRoZSBsYXN0IGlubGluZSBwYXJlbnQgbm9kZVxyXG5cdFx0XHR2YXJcdGxhc3RJbmxpbmVQYXJlbnQgPSBub2RlO1xyXG5cdFx0XHR3aGlsZSAoaXNJbmxpbmUobGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlLCB0cnVlKSB8fFxyXG5cdFx0XHRcdGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZS50YWdOYW1lID09PSAnUCcpIHtcclxuXHRcdFx0XHRsYXN0SW5saW5lUGFyZW50ID0gbGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgYmVmb3JlID0gZXh0cmFjdENvbnRlbnRzKGxhc3RJbmxpbmVQYXJlbnQsIG5vZGUpO1xyXG5cdFx0XHR2YXIgbWlkZGxlID0gbm9kZTtcclxuXHJcblx0XHRcdC8vIENsb25lIGlubGluZSBzdHlsaW5nIGFuZCBhcHBseSBpdCB0byB0aGUgYmxvY2tzIGNoaWxkcmVuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50LCB0cnVlKSkge1xyXG5cdFx0XHRcdGlmIChwYXJlbnQubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0XHRcdFx0dmFyIGNsb25lID0gcGFyZW50LmNsb25lTm9kZSgpO1xyXG5cdFx0XHRcdFx0d2hpbGUgKG1pZGRsZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRcdGFwcGVuZENoaWxkKGNsb25lLCBtaWRkbGUuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YXBwZW5kQ2hpbGQobWlkZGxlLCBjbG9uZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbnNlcnRCZWZvcmUobWlkZGxlLCBsYXN0SW5saW5lUGFyZW50KTtcclxuXHRcdFx0aWYgKCFpc0VtcHR5KGJlZm9yZSkpIHtcclxuXHRcdFx0XHRpbnNlcnRCZWZvcmUoYmVmb3JlLCBtaWRkbGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpc0VtcHR5KGxhc3RJbmxpbmVQYXJlbnQpKSB7XHJcblx0XHRcdFx0cmVtb3ZlKGxhc3RJbmxpbmVQYXJlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRml4IGludmFsaWQgbmVzdGVkIGxpc3RzIHdoaWNoIHNob3VsZCBiZSB3cmFwcGVkIGluIGFuIGxpIHRhZ1xyXG5cdFx0aWYgKGlzQmxvY2sgJiYgaXMobm9kZSwgbGlzdCkgJiYgaXMobm9kZS5wYXJlbnROb2RlLCBsaXN0KSkge1xyXG5cdFx0XHR2YXIgbGkgPSBwcmV2aW91c0VsZW1lbnRTaWJsaW5nKG5vZGUsICdsaScpO1xyXG5cclxuXHRcdFx0aWYgKCFsaSkge1xyXG5cdFx0XHRcdGxpID0gY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0XHRpbnNlcnRCZWZvcmUobGksIG5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhcHBlbmRDaGlsZChsaSwgbm9kZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyB0aGUgY29tbW9uIHBhcmVudCBvZiB0d28gbm9kZXNcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGUxXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMlxyXG4gKiBAcmV0dXJuIHs/SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZENvbW1vbkFuY2VzdG9yKG5vZGUxLCBub2RlMikge1xyXG5cdHdoaWxlICgobm9kZTEgPSBub2RlMS5wYXJlbnROb2RlKSkge1xyXG5cdFx0aWYgKGNvbnRhaW5zKG5vZGUxLCBub2RlMikpIHtcclxuXHRcdFx0cmV0dXJuIG5vZGUxO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7P05vZGV9XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZXZpb3VzPWZhbHNlXVxyXG4gKiBAcmV0dXJucyB7P05vZGV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2libGluZyhub2RlLCBwcmV2aW91cykge1xyXG5cdGlmICghbm9kZSkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKHByZXZpb3VzID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nKSB8fFxyXG5cdFx0Z2V0U2libGluZyhub2RlLnBhcmVudE5vZGUsIHByZXZpb3VzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdW51c2VkIHdoaXRlc3BhY2UgZnJvbSB0aGUgcm9vdCBhbmQgYWxsIGl0J3MgY2hpbGRyZW4uXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSByb290XHJcbiAqIEBzaW5jZSAxLjQuM1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVdoaXRlU3BhY2Uocm9vdCkge1xyXG5cdHZhclx0bm9kZVZhbHVlLCBub2RlVHlwZSwgbmV4dCwgcHJldmlvdXMsIHByZXZpb3VzU2libGluZyxcclxuXHRcdG5leHROb2RlLCB0cmltU3RhcnQsXHJcblx0XHRjc3NXaGl0ZVNwYWNlID0gY3NzKHJvb3QsICd3aGl0ZVNwYWNlJyksXHJcblx0XHQvLyBQcmVzZXJ2ZSBuZXdsaW5lcyBpZiBpcyBwcmUtbGluZVxyXG5cdFx0cHJlc2VydmVOZXdMaW5lcyA9IC9saW5lJC9pLnRlc3QoY3NzV2hpdGVTcGFjZSksXHJcblx0XHRub2RlID0gcm9vdC5maXJzdENoaWxkO1xyXG5cclxuXHQvLyBTa2lwIHByZSAmIHByZS13cmFwIHdpdGggYW55IHZlbmRvciBwcmVmaXhcclxuXHRpZiAoL3ByZSgtd3JhcCk/JC9pLnRlc3QoY3NzV2hpdGVTcGFjZSkpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHRuZXh0Tm9kZSAgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cdFx0bm9kZVZhbHVlID0gbm9kZS5ub2RlVmFsdWU7XHJcblx0XHRub2RlVHlwZSAgPSBub2RlLm5vZGVUeXBlO1xyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFICYmIG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRyZW1vdmVXaGl0ZVNwYWNlKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gVEVYVF9OT0RFKSB7XHJcblx0XHRcdG5leHQgICAgICA9IGdldFNpYmxpbmcobm9kZSk7XHJcblx0XHRcdHByZXZpb3VzICA9IGdldFNpYmxpbmcobm9kZSwgdHJ1ZSk7XHJcblx0XHRcdHRyaW1TdGFydCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzLCAnc2NlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRwcmV2aW91cyA9IGdldFNpYmxpbmcocHJldmlvdXMsIHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiBwcmV2aW91cyBzaWJsaW5nIGlzbid0IGlubGluZSBvciBpcyBhIHRleHRub2RlIHRoYXRcclxuXHRcdFx0Ly8gZW5kcyBpbiB3aGl0ZXNwYWNlLCB0aW1lIHRoZSBzdGFydCB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmIChpc0lubGluZShub2RlKSAmJiBwcmV2aW91cykge1xyXG5cdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAocHJldmlvdXNTaWJsaW5nLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLmxhc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWRlcHRoXHJcblx0XHRcdFx0XHR3aGlsZSAoaGFzQ2xhc3MocHJldmlvdXNTaWJsaW5nLCAnc2NlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gZ2V0U2libGluZyhwcmV2aW91c1NpYmxpbmcsIHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dHJpbVN0YXJ0ID0gcHJldmlvdXNTaWJsaW5nLm5vZGVUeXBlID09PSBURVhUX05PREUgP1xyXG5cdFx0XHRcdFx0L1tcXHRcXG5cXHIgXSQvLnRlc3QocHJldmlvdXNTaWJsaW5nLm5vZGVWYWx1ZSkgOlxyXG5cdFx0XHRcdFx0IWlzSW5saW5lKHByZXZpb3VzU2libGluZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENsZWFyIHplcm8gd2lkdGggc3BhY2VzXHJcblx0XHRcdG5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKC9cXHUyMDBCL2csICcnKTtcclxuXHJcblx0XHRcdC8vIFN0cmlwIGxlYWRpbmcgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoIXByZXZpb3VzIHx8ICFpc0lubGluZShwcmV2aW91cykgfHwgdHJpbVN0YXJ0KSB7XHJcblx0XHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL15bXFx0IF0rLyA6IC9eW1xcdFxcblxcciBdKy8sXHJcblx0XHRcdFx0XHQnJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFN0cmlwIHRyYWlsaW5nIHdoaXRlc3BhY2VcclxuXHRcdFx0aWYgKCFuZXh0IHx8ICFpc0lubGluZShuZXh0KSkge1xyXG5cdFx0XHRcdG5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9bXFx0IF0rJC8gOiAvW1xcdFxcblxcciBdKyQvLFxyXG5cdFx0XHRcdFx0JydcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgZW1wdHkgdGV4dCBub2Rlc1xyXG5cdFx0XHRpZiAoIW5vZGVWYWx1ZS5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZW1vdmUobm9kZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvW1xcdCBdKy9nIDogL1tcXHRcXG5cXHIgXSsvZyxcclxuXHRcdFx0XHRcdCcgJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gbmV4dE5vZGU7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogRXh0cmFjdHMgYWxsIHRoZSBub2RlcyBiZXR3ZWVuIHRoZSBzdGFydCBhbmQgZW5kIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHN0YXJ0Tm9kZVx0VGhlIG5vZGUgdG8gc3RhcnQgZXh0cmFjdGluZyBhdFxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbmROb2RlXHRcdFRoZSBub2RlIHRvIHN0b3AgZXh0cmFjdGluZyBhdFxyXG4gKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDb250ZW50cyhzdGFydE5vZGUsIGVuZE5vZGUpIHtcclxuXHR2YXIgcmFuZ2UgPSBzdGFydE5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRyYW5nZS5zZXRTdGFydEJlZm9yZShzdGFydE5vZGUpO1xyXG5cdHJhbmdlLnNldEVuZEFmdGVyKGVuZE5vZGUpO1xyXG5cclxuXHRyZXR1cm4gcmFuZ2UuZXh0cmFjdENvbnRlbnRzKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBvZmZzZXQgcG9zaXRpb24gb2YgYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGxlZnQgYW5kIHRvcCBwcm9wZXJ0aWVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2Zmc2V0KG5vZGUpIHtcclxuXHR2YXJcdGxlZnQgPSAwLFxyXG5cdFx0dG9wID0gMDtcclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdGxlZnQgKz0gbm9kZS5vZmZzZXRMZWZ0O1xyXG5cdFx0dG9wICArPSBub2RlLm9mZnNldFRvcDtcclxuXHRcdG5vZGUgID0gbm9kZS5vZmZzZXRQYXJlbnQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bGVmdDogbGVmdCxcclxuXHRcdHRvcDogdG9wXHJcblx0fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGEgQ1NTIHByb3BlcnR5IGZyb20gdGhlIGVsZW1lbnRzIHN0eWxlIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlKGVsbSwgcHJvcGVydHkpIHtcclxuXHR2YXJcdHN0eWxlVmFsdWUsXHJcblx0XHRlbG1TdHlsZSA9IGVsbS5zdHlsZTtcclxuXHJcblx0aWYgKCFjc3NQcm9wZXJ0eU5hbWVDYWNoZVtwcm9wZXJ0eV0pIHtcclxuXHRcdGNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSA9IGNhbWVsQ2FzZShwcm9wZXJ0eSk7XHJcblx0fVxyXG5cclxuXHRwcm9wZXJ0eSAgID0gY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldO1xyXG5cdHN0eWxlVmFsdWUgPSBlbG1TdHlsZVtwcm9wZXJ0eV07XHJcblxyXG5cdC8vIEFkZCBhbiBleGNlcHRpb24gZm9yIHRleHQtYWxpZ25cclxuXHRpZiAoJ3RleHRBbGlnbicgPT09IHByb3BlcnR5KSB7XHJcblx0XHRzdHlsZVZhbHVlID0gc3R5bGVWYWx1ZSB8fCBjc3MoZWxtLCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0aWYgKGNzcyhlbG0ucGFyZW50Tm9kZSwgcHJvcGVydHkpID09PSBzdHlsZVZhbHVlIHx8XHJcblx0XHRcdGNzcyhlbG0sICdkaXNwbGF5JykgIT09ICdibG9jaycgfHwgaXMoZWxtLCAnaHIsdGgnKSkge1xyXG5cdFx0XHRyZXR1cm4gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3R5bGVWYWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIGFuIGVsZW1lbnQgaGFzIGEgc3R5bGUuXHJcbiAqXHJcbiAqIElmIHZhbHVlcyBhcmUgc3BlY2lmaWVkIGl0IHdpbGwgY2hlY2sgdGhhdCB0aGUgc3R5bGVzIHZhbHVlXHJcbiAqIG1hdGNoZXMgb25lIG9mIHRoZSB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByb3BlcnR5XHJcbiAqIEBwYXJhbSAge3N0cmluZ3xhcnJheX0gW3ZhbHVlc11cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsZShlbG0sIHByb3BlcnR5LCB2YWx1ZXMpIHtcclxuXHR2YXIgc3R5bGVWYWx1ZSA9IGdldFN0eWxlKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRpZiAoIXN0eWxlVmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAhdmFsdWVzIHx8IHN0eWxlVmFsdWUgPT09IHZhbHVlcyB8fFxyXG5cdFx0KEFycmF5LmlzQXJyYXkodmFsdWVzKSAmJiB2YWx1ZXMuaW5kZXhPZihzdHlsZVZhbHVlKSA+IC0xKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGlubGluZSBzdHlsZXMgYW5kIGFsbCB0aGVcclxuICogaW5saW5lIHN0eWxlcyBoYXZlIG1hdGNoaW5nIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIHN0eWxlc01hdGNoKG5vZGVBLCBub2RlQikge1xyXG5cdHZhciBpID0gbm9kZUEuc3R5bGUubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5zdHlsZS5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdHZhciBwcm9wID0gbm9kZUEuc3R5bGVbaV07XHJcblx0XHRpZiAobm9kZUEuc3R5bGVbcHJvcF0gIT09IG5vZGVCLnN0eWxlW3Byb3BdKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGJvdGggbm9kZXMgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgYXR0cmlidXRlcyBhbmQgYWxsIHRoZVxyXG4gKiBhdHRyaWJ1dGUgdmFsdWVzIG1hdGNoXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVBXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVCXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gYXR0cmlidXRlc01hdGNoKG5vZGVBLCBub2RlQikge1xyXG5cdHZhciBpID0gbm9kZUEuYXR0cmlidXRlcy5sZW5ndGg7XHJcblx0aWYgKGkgIT09IG5vZGVCLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGVBLmF0dHJpYnV0ZXNbaV07XHJcblx0XHR2YXIgbm90TWF0Y2hlcyA9IHByb3AubmFtZSA9PT0gJ3N0eWxlJyA/XHJcblx0XHRcdCFzdHlsZXNNYXRjaChub2RlQSwgbm9kZUIpIDpcclxuXHRcdFx0cHJvcC52YWx1ZSAhPT0gYXR0cihub2RlQiwgcHJvcC5uYW1lKTtcclxuXHJcblx0XHRpZiAobm90TWF0Y2hlcykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZWxlbWVudCBwbGFjaW5nIGl0cyBjaGlsZHJlbiBpbiBpdHMgcGxhY2VcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlS2VlcENoaWxkcmVuKG5vZGUpIHtcclxuXHR3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XHJcblx0XHRpbnNlcnRCZWZvcmUobm9kZS5maXJzdENoaWxkLCBub2RlKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZShub2RlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlcyBpbmxpbmUgc3R5bGVzIGFuZCB0YWdzIHdpdGggcGFyZW50cyB3aGVyZSBwb3NzaWJsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHNpbmNlIDMuMS4wXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2Uobm9kZSkge1xyXG5cdGlmIChub2RlLm5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0dmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWU7XHJcblx0dmFyIG1lcmdlVGFncyA9IC9CfFNUUk9OR3xFTXxTUEFOfEZPTlQvO1xyXG5cclxuXHQvLyBNZXJnZSBjaGlsZHJlbiAoaW4gcmV2ZXJzZSBhcyBjaGlsZHJlbiBjYW4gYmUgcmVtb3ZlZClcclxuXHR2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0bWVyZ2Uobm9kZS5jaGlsZE5vZGVzW2ldKTtcclxuXHR9XHJcblxyXG5cdC8vIFNob3VsZCBvbmx5IG1lcmdlIGlubGluZSB0YWdzIGFuZCBzaG91bGQgbm90IG1lcmdlIDxicj4gdGFnc1xyXG5cdGlmICghaXNJbmxpbmUobm9kZSkgfHwgdGFnTmFtZSA9PT0gJ0JSJykge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gUmVtb3ZlIGFueSBpbmxpbmUgc3R5bGVzIHRoYXQgbWF0Y2ggdGhlIHBhcmVudCBzdHlsZVxyXG5cdGkgPSBub2RlLnN0eWxlLmxlbmd0aDtcclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGUuc3R5bGVbaV07XHJcblx0XHRpZiAoY3NzKHBhcmVudCwgcHJvcCkgPT09IGNzcyhub2RlLCBwcm9wKSkge1xyXG5cdFx0XHRub2RlLnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3ApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gQ2FuIG9ubHkgcmVtb3ZlIC8gbWVyZ2UgdGFncyBpZiBubyBpbmxpbmUgc3R5bGluZyBsZWZ0LlxyXG5cdC8vIElmIHRoZXJlIGlzIGFueSBpbmxpbmUgc3R5bGUgbGVmdCB0aGVuIGl0IG1lYW5zIGl0IGF0IGxlYXN0IHBhcnRpYWxseVxyXG5cdC8vIGRvZXNuJ3QgbWF0Y2ggdGhlIHBhcmVudCBzdHlsZSBzbyBtdXN0IHN0YXlcclxuXHRpZiAoIW5vZGUuc3R5bGUubGVuZ3RoKSB7XHJcblx0XHRyZW1vdmVBdHRyKG5vZGUsICdzdHlsZScpO1xyXG5cclxuXHRcdC8vIFJlbW92ZSBmb250IGF0dHJpYnV0ZXMgaWYgbWF0Y2ggcGFyZW50XHJcblx0XHRpZiAodGFnTmFtZSA9PT0gJ0ZPTlQnKSB7XHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2ZvbnRGYW1pbHknKS50b0xvd2VyQ2FzZSgpID09PVxyXG5cdFx0XHRcdGNzcyhwYXJlbnQsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ2ZhY2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnY29sb3InKSA9PT0gY3NzKHBhcmVudCwgJ2NvbG9yJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdjb2xvcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250U2l6ZScpID09PSBjc3MocGFyZW50LCAnZm9udFNpemUnKSkge1xyXG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ3NpemUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNwYW5zIGFuZCBmb250IHRhZ3Mgd2l0aCBubyBhdHRyaWJ1dGVzIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZFxyXG5cdFx0aWYgKCFub2RlLmF0dHJpYnV0ZXMubGVuZ3RoICYmIC9TUEFOfEZPTlQvLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlS2VlcENoaWxkcmVuKG5vZGUpO1xyXG5cdFx0fSBlbHNlIGlmIChtZXJnZVRhZ3MudGVzdCh0YWdOYW1lKSkge1xyXG5cdFx0XHR2YXIgaXNCb2xkID0gL0J8U1RST05HLy50ZXN0KHRhZ05hbWUpO1xyXG5cdFx0XHR2YXIgaXNJdGFsaWMgPSB0YWdOYW1lID09PSAnRU0nO1xyXG5cclxuXHRcdFx0d2hpbGUgKHBhcmVudCAmJiBpc0lubGluZShwYXJlbnQpICYmXHJcblx0XHRcdFx0KCFpc0JvbGQgfHwgL2JvbGR8NzAwL2kudGVzdChjc3MocGFyZW50LCAnZm9udFdlaWdodCcpKSkgJiZcclxuXHRcdFx0XHQoIWlzSXRhbGljIHx8IGNzcyhwYXJlbnQsICdmb250U3R5bGUnKSA9PT0gJ2l0YWxpYycpKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBpZiBwYXJlbnQgbWF0Y2hcclxuXHRcdFx0XHRpZiAoKHBhcmVudC50YWdOYW1lID09PSB0YWdOYW1lIHx8XHJcblx0XHRcdFx0XHQoaXNCb2xkICYmIC9CfFNUUk9ORy8udGVzdChwYXJlbnQudGFnTmFtZSkpKSAmJlxyXG5cdFx0XHRcdFx0YXR0cmlidXRlc01hdGNoKHBhcmVudCwgbm9kZSkpIHtcclxuXHRcdFx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIE1lcmdlIHNpYmxpbmdzIGlmIGF0dHJpYnV0ZXMsIGluY2x1ZGluZyBpbmxpbmUgc3R5bGVzLCBtYXRjaFxyXG5cdHZhciBuZXh0ID0gbm9kZS5uZXh0U2libGluZztcclxuXHRpZiAobmV4dCAmJiBuZXh0LnRhZ05hbWUgPT09IHRhZ05hbWUgJiYgYXR0cmlidXRlc01hdGNoKG5leHQsIG5vZGUpKSB7XHJcblx0XHRhcHBlbmRDaGlsZChub2RlLCBuZXh0KTtcclxuXHRcdHJlbW92ZUtlZXBDaGlsZHJlbihuZXh0KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcblxuLyoqXG4gKiBDaGVja3MgYWxsIGVtb3RpY29ucyBhcmUgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlIGFuZFxuICogcmVwbGFjZXMgYW55IHRoYXQgYXJlbid0IHdpdGggd2l0aCB0aGVpciBlbW90aWNvbiBjb2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7cmFuZ2VIZWxwZXJ9IHJhbmdlSGVscGVyXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tXaGl0ZXNwYWNlKG5vZGUsIHJhbmdlSGVscGVyKSB7XG5cdHZhciBub25lV3NSZWdleCA9IC9bXlxcc1xceEEwXFx1MjAwMlxcdTIwMDNcXHUyMDA5XSsvO1xuXHR2YXIgZW1vdGljb25zID0gbm9kZSAmJiBkb20uZmluZChub2RlLCAnaW1nW2RhdGEtc2NlZGl0b3ItZW1vdGljb25dJyk7XG5cblx0aWYgKCFub2RlIHx8ICFlbW90aWNvbnMubGVuZ3RoKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbW90aWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZW1vdGljb24gPSBlbW90aWNvbnNbaV07XG5cdFx0dmFyIHBhcmVudCA9IGVtb3RpY29uLnBhcmVudE5vZGU7XG5cdFx0dmFyIHByZXYgPSBlbW90aWNvbi5wcmV2aW91c1NpYmxpbmc7XG5cdFx0dmFyIG5leHQgPSBlbW90aWNvbi5uZXh0U2libGluZztcblxuXHRcdGlmICgoIXByZXYgfHwgIW5vbmVXc1JlZ2V4LnRlc3QocHJldi5ub2RlVmFsdWUuc2xpY2UoLTEpKSkgJiZcblx0XHRcdCghbmV4dCB8fCAhbm9uZVdzUmVnZXgudGVzdCgobmV4dC5ub2RlVmFsdWUgfHwgJycpWzBdKSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciByYW5nZSA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcblx0XHR2YXIgcmFuZ2VTdGFydCA9IC0xO1xuXHRcdHZhciByYW5nZVN0YXJ0Q29udGFpbmVyID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG5cdFx0dmFyIHByZXZpb3VzVGV4dCA9IChwcmV2ICYmIHByZXYubm9kZVZhbHVlKSB8fCAnJztcblxuXHRcdHByZXZpb3VzVGV4dCArPSBkb20uZGF0YShlbW90aWNvbiwgJ3NjZWRpdG9yLWVtb3RpY29uJyk7XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIGFmdGVyIHRoZSByZW1vdmVkIGVtb3RpY29uLCBhZGRcblx0XHQvLyB0aGUgbGVuZ3RoIG9mIHRoZSBuZXdseSBhZGRlZCB0ZXh0IHRvIGl0XG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IG5leHQpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSBwcmV2aW91c1RleHQubGVuZ3RoICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSBuZXh0IG5vZGUsIHNldCBpdCB0b1xuXHRcdC8vIHRoZSBlbmQgb2YgdGhlIG5ldyB0ZXh0IG5vZGVcblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gbm9kZSAmJlxuXHRcdFx0bm9kZS5jaGlsZE5vZGVzW3JhbmdlLnN0YXJ0T2Zmc2V0XSA9PT0gbmV4dCkge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHByZXZpb3VzVGV4dC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSByZW1vdmVkIGVtb3RpY29uLFxuXHRcdC8vIGp1c3Qga2VlcCBpdCBhdCB0aGF0IHBvc2l0aW9uXG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IHByZXYpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSByYW5nZS5zdGFydE9mZnNldDtcblx0XHR9XG5cblx0XHRpZiAoIW5leHQgfHwgbmV4dC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xuXHRcdFx0bmV4dCA9IHBhcmVudC5pbnNlcnRCZWZvcmUoXG5cdFx0XHRcdHBhcmVudC5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSwgbmV4dFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRuZXh0Lmluc2VydERhdGEoMCwgcHJldmlvdXNUZXh0KTtcblx0XHRkb20ucmVtb3ZlKGVtb3RpY29uKTtcblx0XHRpZiAocHJldikge1xuXHRcdFx0ZG9tLnJlbW92ZShwcmV2KTtcblx0XHR9XG5cblx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB0aGUgcmFuZ2Ugc3RhcnRpbmcgcG9zaXRpb24gaWYgaXQncyBiZWVuIG1vZGlmaWVkXG5cdFx0aWYgKHJhbmdlU3RhcnQgPiAtMSkge1xuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQobmV4dCwgcmFuZ2VTdGFydCk7XG5cdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcblx0XHRcdHJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJhbmdlKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBSZXBsYWNlcyBhbnkgZW1vdGljb25zIGluc2lkZSB0aGUgcm9vdCBub2RlIHdpdGggaW1hZ2VzLlxuICpcbiAqIGVtb3RpY29ucyBzaG91bGQgYmUgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXkgaXMgdGhlIGVtb3RpY29uXG4gKiBjb2RlIGFuZCB0aGUgdmFsdWUgaXMgdGhlIEhUTUwgdG8gcmVwbGFjZSBpdCB3aXRoLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3RcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gZW1vdGljb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVtb3RpY29uc0NvbXBhdFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2Uocm9vdCwgZW1vdGljb25zLCBlbW90aWNvbnNDb21wYXQpIHtcblx0dmFyXHRkb2MgICAgICAgICAgID0gcm9vdC5vd25lckRvY3VtZW50O1xuXHR2YXIgc3BhY2UgICAgICAgICA9ICcoXnxcXFxcc3xcXHhBMHxcXHUyMDAyfFxcdTIwMDN8XFx1MjAwOXwkKSc7XG5cdHZhciBlbW90aWNvbkNvZGVzID0gW107XG5cdHZhciBlbW90aWNvblJlZ2V4ID0ge307XG5cblx0Ly8gVE9ETzogTWFrZSB0aGlzIHRhZyBjb25maWd1cmFibGUuXG5cdGlmIChkb20ucGFyZW50KHJvb3QsICdjb2RlJykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR1dGlscy5lYWNoKGVtb3RpY29ucywgZnVuY3Rpb24gKGtleSkge1xuXHRcdGVtb3RpY29uUmVnZXhba2V5XSA9IG5ldyBSZWdFeHAoc3BhY2UgKyBlc2NhcGUucmVnZXgoa2V5KSArIHNwYWNlKTtcblx0XHRlbW90aWNvbkNvZGVzLnB1c2goa2V5KTtcblx0fSk7XG5cblx0Ly8gU29ydCBrZXlzIGxvbmdlc3QgdG8gc2hvcnRlc3Qgc28gdGhhdCBsb25nZXIga2V5c1xuXHQvLyB0YWtlIHByZWNlZGVuY2UgKGF2b2lkcyBidWdzIHdpdGggc2hvcnRlciBrZXlzIHBhcnRpYWxseVxuXHQvLyBtYXRjaGluZyBsb25nZXIgb25lcylcblx0ZW1vdGljb25Db2Rlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0cmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG5cdH0pO1xuXG5cdChmdW5jdGlvbiBjb252ZXJ0KG5vZGUpIHtcblx0XHRub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG5cdFx0d2hpbGUgKG5vZGUpIHtcblx0XHRcdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiYgIWRvbS5pcyhub2RlLCAnY29kZScpKSB7XG5cdFx0XHRcdGNvbnZlcnQobm9kZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW1vdGljb25Db2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciB0ZXh0ICA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHZhciBrZXkgICA9IGVtb3RpY29uQ29kZXNbaV07XG5cdFx0XHRcdFx0dmFyIGluZGV4ID0gZW1vdGljb25zQ29tcGF0ID9cblx0XHRcdFx0XHRcdHRleHQuc2VhcmNoKGVtb3RpY29uUmVnZXhba2V5XSkgOlxuXHRcdFx0XHRcdFx0dGV4dC5pbmRleE9mKGtleSk7XG5cblx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gV2hlbiBlbW90aWNvbnNDb21wYXQgaXMgZW5hYmxlZCB0aGlzIHdpbGwgYmUgdGhlXG5cdFx0XHRcdFx0XHQvLyBwb3NpdGlvbiBhZnRlciBhbnkgd2hpdGUgc3BhY2Vcblx0XHRcdFx0XHRcdHZhciBzdGFydEluZGV4ID0gdGV4dC5pbmRleE9mKGtleSwgaW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIGZyYWdtZW50ICAgPSBkb20ucGFyc2VIVE1MKGVtb3RpY29uc1trZXldLCBkb2MpO1xuXHRcdFx0XHRcdFx0dmFyIGFmdGVyICAgICAgPSB0ZXh0LnN1YnN0cihzdGFydEluZGV4ICsga2V5Lmxlbmd0aCk7XG5cblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShhZnRlcikpO1xuXG5cdFx0XHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IHRleHQuc3Vic3RyKDAsIHN0YXJ0SW5kZXgpO1xuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnROb2RlXG5cdFx0XHRcdFx0XHRcdC5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIG5vZGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbm9kZS5uZXh0U2libGluZztcblx0XHR9XG5cdH0ocm9vdCkpO1xufVxuIiwiLy8gTXVzdCBzdGFydCB3aXRoIGEgdmFsaWQgc2NoZW1lXG4vLyBcdFx0XlxuLy8gU2NoZW1lcyB0aGF0IGFyZSBjb25zaWRlcmVkIHNhZmVcbi8vIFx0XHQoaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8XG4vLyBSZWxhdGl2ZSBzY2hlbWVzICgvLzopIGFyZSBjb25zaWRlcmVkIHNhZmVcbi8vIFx0XHQoXFxcXC9cXFxcLyl8XG4vLyBJbWFnZSBkYXRhIFVSSSdzIGFyZSBjb25zaWRlcmVkIHNhZmVcbi8vIFx0XHRkYXRhOmltYWdlXFxcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7XG52YXIgVkFMSURfU0NIRU1FX1JFR0VYID1cblx0L14oaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8KFxcL1xcLyl8ZGF0YTppbWFnZVxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTsvaTtcblxuLyoqXG4gKiBFc2NhcGVzIGEgc3RyaW5nIHNvIGl0J3Mgc2FmZSB0byB1c2UgaW4gcmVnZXhcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdleChzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oWy0uKis/Xj0hOiR7fSgpfFtcXF0vXFxcXF0pL2csICdcXFxcJDEnKTtcbn1cblxuLyoqXG4gKiBFc2NhcGVzIGFsbCBIVE1MIGVudGl0aWVzIGluIGEgc3RyaW5nXG4gKlxuICogSWYgbm9RdW90ZXMgaXMgc2V0IHRvIGZhbHNlLCBhbGwgc2luZ2xlIGFuZCBkb3VibGVcbiAqIHF1b3RlcyB3aWxsIGFsc28gYmUgZXNjYXBlZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25vUXVvdGVzPXRydWVdXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAc2luY2UgMS40LjFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVudGl0aWVzKHN0ciwgbm9RdW90ZXMpIHtcblx0aWYgKCFzdHIpIHtcblx0XHRyZXR1cm4gc3RyO1xuXHR9XG5cblx0dmFyIHJlcGxhY2VtZW50cyA9IHtcblx0XHQnJic6ICcmYW1wOycsXG5cdFx0JzwnOiAnJmx0OycsXG5cdFx0Jz4nOiAnJmd0OycsXG5cdFx0JyAgJzogJyZuYnNwOyAnLFxuXHRcdCdcXHJcXG4nOiAnPGJyIC8+Jyxcblx0XHQnXFxyJzogJzxiciAvPicsXG5cdFx0J1xcbic6ICc8YnIgLz4nXG5cdH07XG5cblx0aWYgKG5vUXVvdGVzICE9PSBmYWxzZSkge1xuXHRcdHJlcGxhY2VtZW50c1snXCInXSAgPSAnJiMzNDsnO1xuXHRcdHJlcGxhY2VtZW50c1snXFwnJ10gPSAnJiMzOTsnO1xuXHRcdHJlcGxhY2VtZW50c1snYCddICA9ICcmIzk2Oyc7XG5cdH1cblxuXHRzdHIgPSBzdHIucmVwbGFjZSgvIHsyfXxcXHJcXG58WyY8PlxcclxcbidcImBdL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuXHRcdHJldHVybiByZXBsYWNlbWVudHNbbWF0Y2hdIHx8IG1hdGNoO1xuXHR9KTtcblxuXHRyZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIEVzY2FwZSBVUkkgc2NoZW1lLlxuICpcbiAqIEFwcGVuZHMgdGhlIGN1cnJlbnQgVVJMIHRvIGEgdXJsIGlmIGl0IGhhcyBhIHNjaGVtZSB0aGF0IGlzIG5vdDpcbiAqXG4gKiBodHRwXG4gKiBodHRwc1xuICogc2Z0cFxuICogZnRwXG4gKiBtYWlsdG9cbiAqIHNwb3RpZnlcbiAqIHNreXBlXG4gKiBzc2hcbiAqIHRlYW1zcGVha1xuICogdGVsXG4gKiAvL1xuICogZGF0YTppbWFnZS8ocG5nfGpwZWd8anBnfHBqcGVnfGJtcHxnaWYpO1xuICpcbiAqICoqSU1QT1JUQU5UKio6IFRoaXMgZG9lcyBub3QgZXNjYXBlIGFueSBIVE1MIGluIGEgdXJsLCBmb3JcbiAqIHRoYXQgdXNlIHRoZSBlc2NhcGUuZW50aXRpZXMoKSBtZXRob2QuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqIEBzaW5jZSAxLjQuNVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXJpU2NoZW1lKHVybCkge1xuXHR2YXJcdHBhdGgsXG5cdFx0Ly8gSWYgdGhlcmUgaXMgYSA6IGJlZm9yZSBhIC8gdGhlbiBpdCBoYXMgYSBzY2hlbWVcblx0XHRoYXNTY2hlbWUgPSAvXlteL10qOi9pLFxuXHRcdGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xuXG5cdC8vIEhhcyBubyBzY2hlbWUgb3IgYSB2YWxpZCBzY2hlbWVcblx0aWYgKCghdXJsIHx8ICFoYXNTY2hlbWUudGVzdCh1cmwpKSB8fCBWQUxJRF9TQ0hFTUVfUkVHRVgudGVzdCh1cmwpKSB7XG5cdFx0cmV0dXJuIHVybDtcblx0fVxuXG5cdHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuXHRwYXRoLnBvcCgpO1xuXG5cdHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgK1xuXHRcdGxvY2F0aW9uLmhvc3QgK1xuXHRcdHBhdGguam9pbignLycpICsgJy8nICtcblx0XHR1cmw7XG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcblxuXG4vKipcbiAqIEhUTUwgdGVtcGxhdGVzIHVzZWQgYnkgdGhlIGVkaXRvciBhbmQgZGVmYXVsdCBjb21tYW5kc1xuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBfdGVtcGxhdGVzID0ge1xuXHRodG1sOlxuXHRcdCc8IURPQ1RZUEUgaHRtbD4nICtcblx0XHQnPGh0bWx7YXR0cnN9PicgK1xuXHRcdFx0JzxoZWFkPicgK1xuXHRcdFx0XHQnPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiICcgK1xuXHRcdFx0XHRcdCdjb250ZW50PVwidGV4dC9odG1sO2NoYXJzZXQ9e2NoYXJzZXR9XCIgLz4nICtcblx0XHRcdFx0JzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwie3N0eWxlfVwiIC8+JyArXG5cdFx0XHQnPC9oZWFkPicgK1xuXHRcdFx0Jzxib2R5IGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiB7c3BlbGxjaGVja30+PHA+PC9wPjwvYm9keT4nICtcblx0XHQnPC9odG1sPicsXG5cblx0dG9vbGJhckJ1dHRvbjogJzxhIGNsYXNzPVwic2NlZGl0b3ItYnV0dG9uIHNjZWRpdG9yLWJ1dHRvbi17bmFtZX1cIiAnICtcblx0XHQnZGF0YS1zY2VkaXRvci1jb21tYW5kPVwie25hbWV9XCIgdW5zZWxlY3RhYmxlPVwib25cIj4nICtcblx0XHQnPGRpdiB1bnNlbGVjdGFibGU9XCJvblwiPntkaXNwTmFtZX08L2Rpdj48L2E+JyxcblxuXHRlbW90aWNvbjogJzxpbWcgc3JjPVwie3VybH1cIiBkYXRhLXNjZWRpdG9yLWVtb3RpY29uPVwie2tleX1cIiAnICtcblx0XHQnYWx0PVwie2tleX1cIiB0aXRsZT1cInt0b29sdGlwfVwiIC8+JyxcblxuXHRmb250T3B0OiAnPGEgY2xhc3M9XCJzY2VkaXRvci1mb250LW9wdGlvblwiIGhyZWY9XCIjXCIgJyArXG5cdFx0J2RhdGEtZm9udD1cIntmb250fVwiPjxmb250IGZhY2U9XCJ7Zm9udH1cIj57Zm9udH08L2ZvbnQ+PC9hPicsXG5cblx0c2l6ZU9wdDogJzxhIGNsYXNzPVwic2NlZGl0b3ItZm9udHNpemUtb3B0aW9uXCIgZGF0YS1zaXplPVwie3NpemV9XCIgJyArXG5cdFx0J2hyZWY9XCIjXCI+PGZvbnQgc2l6ZT1cIntzaXplfVwiPntzaXplfTwvZm9udD48L2E+JyxcblxuXHRwYXN0ZXRleHQ6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInR4dFwiPntsYWJlbH08L2xhYmVsPiAnICtcblx0XHRcdCc8dGV4dGFyZWEgY29scz1cIjIwXCIgcm93cz1cIjdcIiBpZD1cInR4dFwiPjwvdGV4dGFyZWE+PC9kaXY+JyArXG5cdFx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0JzwvZGl2PicsXG5cblx0dGFibGU6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInJvd3NcIj57cm93c308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xuXHRcdFx0J2lkPVwicm93c1wiIHZhbHVlPVwiMlwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImNvbHNcIj57Y29sc308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xuXHRcdFx0J2lkPVwiY29sc1wiIHZhbHVlPVwiMlwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIicgK1xuXHRcdFx0JyAvPjwvZGl2PicsXG5cblx0aW1hZ2U6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImltYWdlXCI+e3VybH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImltYWdlXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cIndpZHRoXCI+e3dpZHRofTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwid2lkdGhcIiBzaXplPVwiMlwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImhlaWdodFwiPntoZWlnaHR9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJoZWlnaHRcIiBzaXplPVwiMlwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xuXHRcdFx0JzwvZGl2PicsXG5cblx0ZW1haWw6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImVtYWlsXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZW1haWxcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJkZXNcIj57ZGVzY308L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xuXHRcdFx0JzwvZGl2PicsXG5cblx0bGluazpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPnt1cmx9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImRlc1wiPntkZXNjfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zfVwiIC8+PC9kaXY+JyxcblxuXHR5b3V0dWJlTWVudTpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPntsYWJlbH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpbmtcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0XHQnPC9kaXY+JyxcblxuXHR5b3V0dWJlOlxuXHRcdCc8aWZyYW1lIHdpZHRoPVwiNTYwXCIgaGVpZ2h0PVwiMzE1XCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuICcgK1xuXHRcdCdzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC97aWR9P3dtb2RlPW9wYXF1ZSZzdGFydD17dGltZX1cIiAnICtcblx0XHQnZGF0YS15b3V0dWJlLWlkPVwie2lkfVwiPjwvaWZyYW1lPidcbn07XG5cbi8qKlxuICogUmVwbGFjZXMgYW55IHBhcmFtcyBpbiBhIHRlbXBsYXRlIHdpdGggdGhlIHBhc3NlZCBwYXJhbXMuXG4gKlxuICogSWYgY3JlYXRlSHRtbCBpcyBwYXNzZWQgaXQgd2lsbCByZXR1cm4gYSBEb2N1bWVudEZyYWdtZW50XG4gKiBjb250YWluaW5nIHRoZSBwYXJzZWQgdGVtcGxhdGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQHBhcmFtIHtib29sZWFufSBbY3JlYXRlSHRtbF1cbiAqIEByZXR1cm5zIHtzdHJpbmd8RG9jdW1lbnRGcmFnbWVudH1cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMsIGNyZWF0ZUh0bWwpIHtcblx0dmFyIHRlbXBsYXRlID0gX3RlbXBsYXRlc1tuYW1lXTtcblxuXHRPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHR0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoXG5cdFx0XHRuZXcgUmVnRXhwKGVzY2FwZS5yZWdleCgneycgKyBuYW1lICsgJ30nKSwgJ2cnKSwgcGFyYW1zW25hbWVdXG5cdFx0KTtcblx0fSk7XG5cblx0aWYgKGNyZWF0ZUh0bWwpIHtcblx0XHR0ZW1wbGF0ZSA9IGRvbS5wYXJzZUhUTUwodGVtcGxhdGUpO1xuXHR9XG5cblx0cmV0dXJuIHRlbXBsYXRlO1xufVxuIiwiLyoqXG4gKiBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHRoZVxuICogdGhlIHBhc3NlZCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0geyp9IGFyZ1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVHlwZW9mKHR5cGUsIGFyZykge1xuXHRyZXR1cm4gdHlwZW9mIGFyZyA9PT0gdHlwZTtcbn1cblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNTdHJpbmcgPSBpc1R5cGVvZi5iaW5kKG51bGwsICdzdHJpbmcnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNVbmRlZmluZWQgPSBpc1R5cGVvZi5iaW5kKG51bGwsICd1bmRlZmluZWQnKTtcblxuLyoqXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNGdW5jdGlvbiA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ2Z1bmN0aW9uJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzTnVtYmVyID0gaXNUeXBlb2YuYmluZChudWxsLCAnbnVtYmVyJyk7XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gb2JqZWN0IGhhcyBubyBrZXlzXG4gKlxuICogQHBhcmFtIHshT2JqZWN0fSBvYmpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmopIHtcblx0cmV0dXJuICFPYmplY3Qua2V5cyhvYmopLmxlbmd0aDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIHRoZSBmaXJzdCBvYmplY3Qgd2l0aCBhbnkgZXh0cmEgb2JqZWN0cyBwYXNzZWRcbiAqXG4gKiBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYm9vbGVhbiBhbmQgc2V0IHRvIHRydWVcbiAqIGl0IHdpbGwgZXh0ZW5kIGNoaWxkIGFycmF5cyBhbmQgb2JqZWN0cyByZWN1cnNpdmVseS5cbiAqXG4gKiBAcGFyYW0geyFPYmplY3R8Ym9vbGVhbn0gdGFyZ2V0QXJnXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQodGFyZ2V0QXJnLCBzb3VyY2VBcmcpIHtcblx0dmFyIGlzVGFyZ2V0Qm9vbGVhbiA9IHRhcmdldEFyZyA9PT0gISF0YXJnZXRBcmc7XG5cdHZhciBpICAgICAgPSBpc1RhcmdldEJvb2xlYW4gPyAyIDogMTtcblx0dmFyIHRhcmdldCA9IGlzVGFyZ2V0Qm9vbGVhbiA/IHNvdXJjZUFyZyA6IHRhcmdldEFyZztcblx0dmFyIGlzRGVlcCA9IGlzVGFyZ2V0Qm9vbGVhbiA/IHRhcmdldEFyZyA6IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG5cdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHRcdE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSkgPT09IE9iamVjdC5wcm90b3R5cGU7XG5cdH1cblxuXHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cblx0XHQvLyBDb3B5IGFsbCBwcm9wZXJ0aWVzIGZvciBqUXVlcnkgY29tcGF0aWJpbGl0eVxuXHRcdC8qIGVzbGludCBndWFyZC1mb3ItaW46IG9mZiAqL1xuXHRcdGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcblx0XHRcdHZhciB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldO1xuXHRcdFx0dmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cblx0XHRcdC8vIFNraXAgdW5kZWZpbmVkIHZhbHVlcyB0byBtYXRjaCBqUXVlcnlcblx0XHRcdGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNraXAgc3BlY2lhbCBrZXlzIHRvIHByZXZlbnQgcHJvdG90eXBlIHBvbGx1dGlvblxuXHRcdFx0aWYgKGtleSA9PT0gJ19fcHJvdG9fXycgfHwga2V5ID09PSAnY29uc3RydWN0b3InKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaXNWYWx1ZU9iamVjdCA9IGlzT2JqZWN0KHZhbHVlKTtcblx0XHRcdHZhciBpc1ZhbHVlQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcblxuXHRcdFx0aWYgKGlzRGVlcCAmJiAoaXNWYWx1ZU9iamVjdCB8fCBpc1ZhbHVlQXJyYXkpKSB7XG5cdFx0XHRcdC8vIENhbiBvbmx5IG1lcmdlIGlmIHRhcmdldCB0eXBlIG1hdGNoZXMgb3RoZXJ3aXNlIGNyZWF0ZVxuXHRcdFx0XHQvLyBuZXcgdGFyZ2V0IHRvIG1lcmdlIGludG9cblx0XHRcdFx0dmFyIGlzU2FtZVR5cGUgPSBpc09iamVjdCh0YXJnZXRWYWx1ZSkgPT09IGlzVmFsdWVPYmplY3QgJiZcblx0XHRcdFx0XHRBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSA9PT0gaXNWYWx1ZUFycmF5O1xuXG5cdFx0XHRcdHRhcmdldFtrZXldID0gZXh0ZW5kKFxuXHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0aXNTYW1lVHlwZSA/IHRhcmdldFZhbHVlIDogKGlzVmFsdWVBcnJheSA/IFtdIDoge30pLFxuXHRcdFx0XHRcdHZhbHVlXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIHBhc3NlZCBhcnJheVxuICpcbiAqIEBwYXJhbSB7IUFycmF5fSBhcnJcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyLCBpdGVtKSB7XG5cdHZhciBpID0gYXJyLmluZGV4T2YoaXRlbSk7XG5cblx0aWYgKGkgPiAtMSkge1xuXHRcdGFyci5zcGxpY2UoaSwgMSk7XG5cdH1cbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGFuIGFycmF5IG9yIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7IU9iamVjdHxBcnJheX0gb2JqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosICopfSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gZWFjaChvYmosIGZuKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KG9iaikgfHwgJ2xlbmd0aCcgaW4gb2JqICYmIGlzTnVtYmVyKG9iai5sZW5ndGgpKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcblx0XHRcdGZuKGksIG9ialtpXSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRmbihrZXksIG9ialtrZXldKTtcblx0XHR9KTtcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBTQ0VkaXRvciBmcm9tICcuL2xpYi9TQ0VkaXRvci5qcyc7XG5pbXBvcnQgUGx1Z2luTWFuYWdlciBmcm9tICcuL2xpYi9QbHVnaW5NYW5hZ2VyLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2xpYi9lc2NhcGUuanMnO1xuaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2xpYi9icm93c2VyLmpzJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2xpYi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2xpYi9kZWZhdWx0Q29tbWFuZHMuanMnO1xuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vbGliL2RlZmF1bHRPcHRpb25zLmpzJztcbmltcG9ydCAnLi90aGVtZXMvc3F1YXJlLmxlc3MnO1xuXG5cbnR5cGUgR2xvYmFsU2NvcGUgPSB7XG5cdGVtbEVkaXRvcjogYW55O1xufTtcblxuXG52YXIgZWRpdG9yR2xvYmFsU2NvcGUgPSAod2luZG93IGFzIGFueSkgYXMgR2xvYmFsU2NvcGU7XG5cblxuZWRpdG9yR2xvYmFsU2NvcGUuZW1sRWRpdG9yID0ge1xuXHRjb21tYW5kOiBTQ0VkaXRvci5jb21tYW5kLFxuXHRjb21tYW5kczogZGVmYXVsdENvbW1hbmRzLFxuXHRkZWZhdWx0T3B0aW9uczogZGVmYXVsdE9wdGlvbnMsXG5cblx0aW9zOiBicm93c2VyLmlvcyxcblx0aXNXeXNpd3lnU3VwcG9ydGVkOiBicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCxcblxuXHRyZWdleEVzY2FwZTogZXNjYXBlLnJlZ2V4LFxuXHRlc2NhcGVFbnRpdGllczogZXNjYXBlLmVudGl0aWVzLFxuXHRlc2NhcGVVcmlTY2hlbWU6IGVzY2FwZS51cmlTY2hlbWUsXG5cblx0ZG9tOiB7XG5cdFx0Y3NzOiBkb20uY3NzLFxuXHRcdGF0dHI6IGRvbS5hdHRyLFxuXHRcdHJlbW92ZUF0dHI6IGRvbS5yZW1vdmVBdHRyLFxuXHRcdGlzOiBkb20uaXMsXG5cdFx0Y2xvc2VzdDogZG9tLmNsb3Nlc3QsXG5cdFx0d2lkdGg6IGRvbS53aWR0aCxcblx0XHRoZWlnaHQ6IGRvbS5oZWlnaHQsXG5cdFx0dHJhdmVyc2U6IGRvbS50cmF2ZXJzZSxcblx0XHRyVHJhdmVyc2U6IGRvbS5yVHJhdmVyc2UsXG5cdFx0cGFyc2VIVE1MOiBkb20ucGFyc2VIVE1MLFxuXHRcdGhhc1N0eWxpbmc6IGRvbS5oYXNTdHlsaW5nLFxuXHRcdGNvbnZlcnRFbGVtZW50OiBkb20uY29udmVydEVsZW1lbnQsXG5cdFx0YmxvY2tMZXZlbExpc3Q6IGRvbS5ibG9ja0xldmVsTGlzdCxcblx0XHRjYW5IYXZlQ2hpbGRyZW46IGRvbS5jYW5IYXZlQ2hpbGRyZW4sXG5cdFx0aXNJbmxpbmU6IGRvbS5pc0lubGluZSxcblx0XHRjb3B5Q1NTOiBkb20uY29weUNTUyxcblx0XHRmaXhOZXN0aW5nOiBkb20uZml4TmVzdGluZyxcblx0XHRmaW5kQ29tbW9uQW5jZXN0b3I6IGRvbS5maW5kQ29tbW9uQW5jZXN0b3IsXG5cdFx0Z2V0U2libGluZzogZG9tLmdldFNpYmxpbmcsXG5cdFx0cmVtb3ZlV2hpdGVTcGFjZTogZG9tLnJlbW92ZVdoaXRlU3BhY2UsXG5cdFx0ZXh0cmFjdENvbnRlbnRzOiBkb20uZXh0cmFjdENvbnRlbnRzLFxuXHRcdGdldE9mZnNldDogZG9tLmdldE9mZnNldCxcblx0XHRnZXRTdHlsZTogZG9tLmdldFN0eWxlLFxuXHRcdGhhc1N0eWxlOiBkb20uaGFzU3R5bGVcblx0fSxcblx0bG9jYWxlOiBTQ0VkaXRvci5sb2NhbGUsXG5cdGljb25zOiBTQ0VkaXRvci5pY29ucyxcblx0dXRpbHM6IHtcblx0XHRlYWNoOiB1dGlscy5lYWNoLFxuXHRcdGlzRW1wdHlPYmplY3Q6IHV0aWxzLmlzRW1wdHlPYmplY3QsXG5cdFx0ZXh0ZW5kOiB1dGlscy5leHRlbmRcblx0fSxcblx0cGx1Z2luczogUGx1Z2luTWFuYWdlci5wbHVnaW5zLFxuXHRmb3JtYXRzOiBTQ0VkaXRvci5mb3JtYXRzLFxuXHRjcmVhdGU6IGZ1bmN0aW9uICh0ZXh0YXJlYTogYW55LCBvcHRpb25zOiBhbnkpIHtcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdC8vIERvbid0IGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgaW5pdGlhbGlzZWRcblx0XHQvLyBvbiBpdCdzIG93biBzb3VyY2UgZWRpdG9yXG5cdFx0aWYgKGRvbS5wYXJlbnQodGV4dGFyZWEsICcuc2NlZGl0b3ItY29udGFpbmVyJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5ydW5XaXRob3V0V3lzaXd5Z1N1cHBvcnQgfHwgYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcblx0XHRcdC8qZXNsaW50IG5vLW5ldzogb2ZmKi9cblx0XHRcdChuZXcgU0NFZGl0b3IodGV4dGFyZWEsIG9wdGlvbnMpKTtcblx0XHR9XG5cdH0sXG5cdGluc3RhbmNlOiBmdW5jdGlvbiAodGV4dGFyZWE6IGFueSkge1xuXHRcdHJldHVybiB0ZXh0YXJlYS5fc2NlZGl0b3I7XG5cdH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=