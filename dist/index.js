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
/* harmony import */ var _emoticons_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./emoticons.js */ "./src/lib/emoticons.js");
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
                _emoticons_js__WEBPACK_IMPORTED_MODULE_9__.replace(this.wysiwygBody, this.allEmoticons, this.options.emoticonsCompat);
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
            _emoticons_js__WEBPACK_IMPORTED_MODULE_9__.checkWhitespace(this.currentBlockNode, this.rangeHelper);
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
	var noneWsRegex = /[^\s\xA0\u2002\u2003\u2009]+/;
	var emoticons = node && _dom__WEBPACK_IMPORTED_MODULE_0__.find(node, 'img[data-emleditor-emoticon]');

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
			next = parent.insertBefore(
				parent.ownerDocument.createTextNode(''), next
			);
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
	var	doc           = root.ownerDocument;
	var space         = '(^|\\s|\xA0|\u2002|\u2003|\u2009|$)';
	var emoticonCodes = [];
	var emoticonRegex = {};

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
						var fragment   = _dom__WEBPACK_IMPORTED_MODULE_0__.parseHTML(emoticons[key], doc);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFB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Q1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7YUFDUixFQUFFLFlBQVksR0FBUTtnQkFDdEIsQ0FBQyxFQUFFLFdBQVc7Z0JBQ2QsQ0FBQyxFQUFFLEtBQUs7Z0JBQ1IsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxJQUFJO2FBQ1QsRUFBRSxpQkFBaUIsR0FBUTtnQkFDM0IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFF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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUywwQ0FBSTs7QUFFYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QztRQUNwQyxDQUFDO0lBQ0YsQ0FBQztJQUVELFFBQVEsRUFBRSxVQUFVLFFBQWE7UUFDaEMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLENBQUM7Q0FDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vbm9kZV9tb2R1bGVzL2RvbXB1cmlmeS9kaXN0L3B1cmlmeS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvdGhlbWVzL3NxdWFyZS5sZXNzP2RkYzYiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0Q29tbWFuZHMudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kb20udHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lbWxFZGl0b3IudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9wbHVnaW5NYW5hZ2VyLnRzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvcmFuZ2VIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lbW90aWNvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi90ZW1wbGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBAbGljZW5zZSBET01QdXJpZnkgMy4wLjkgfCAoYykgQ3VyZTUzIGFuZCBvdGhlciBjb250cmlidXRvcnMgfCBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIGxpY2Vuc2UgMi4wIGFuZCBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlIDIuMCB8IGdpdGh1Yi5jb20vY3VyZTUzL0RPTVB1cmlmeS9ibG9iLzMuMC45L0xJQ0VOU0UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuRE9NUHVyaWZ5ID0gZmFjdG9yeSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBjb25zdCB7XG4gICAgZW50cmllcyxcbiAgICBzZXRQcm90b3R5cGVPZixcbiAgICBpc0Zyb3plbixcbiAgICBnZXRQcm90b3R5cGVPZixcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgfSA9IE9iamVjdDtcbiAgbGV0IHtcbiAgICBmcmVlemUsXG4gICAgc2VhbCxcbiAgICBjcmVhdGVcbiAgfSA9IE9iamVjdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG4gIGxldCB7XG4gICAgYXBwbHksXG4gICAgY29uc3RydWN0XG4gIH0gPSB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgUmVmbGVjdDtcbiAgaWYgKCFmcmVlemUpIHtcbiAgICBmcmVlemUgPSBmdW5jdGlvbiBmcmVlemUoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICBpZiAoIXNlYWwpIHtcbiAgICBzZWFsID0gZnVuY3Rpb24gc2VhbCh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghYXBwbHkpIHtcbiAgICBhcHBseSA9IGZ1bmN0aW9uIGFwcGx5KGZ1biwgdGhpc1ZhbHVlLCBhcmdzKSB7XG4gICAgICByZXR1cm4gZnVuLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgfTtcbiAgfVxuICBpZiAoIWNvbnN0cnVjdCkge1xuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uIGNvbnN0cnVjdChGdW5jLCBhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IEZ1bmMoLi4uYXJncyk7XG4gICAgfTtcbiAgfVxuICBjb25zdCBhcnJheUZvckVhY2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKTtcbiAgY29uc3QgYXJyYXlQb3AgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wb3ApO1xuICBjb25zdCBhcnJheVB1c2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAgY29uc3Qgc3RyaW5nVG9Mb3dlckNhc2UgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2UpO1xuICBjb25zdCBzdHJpbmdUb1N0cmluZyA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyk7XG4gIGNvbnN0IHN0cmluZ01hdGNoID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLm1hdGNoKTtcbiAgY29uc3Qgc3RyaW5nUmVwbGFjZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbiAgY29uc3Qgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgY29uc3Qgc3RyaW5nVHJpbSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50cmltKTtcbiAgY29uc3Qgb2JqZWN0SGFzT3duUHJvcGVydHkgPSB1bmFwcGx5KE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICBjb25zdCByZWdFeHBUZXN0ID0gdW5hcHBseShSZWdFeHAucHJvdG90eXBlLnRlc3QpO1xuICBjb25zdCB0eXBlRXJyb3JDcmVhdGUgPSB1bmNvbnN0cnVjdChUeXBlRXJyb3IpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgYW5kIGNhbGxlZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIHRoaXNBcmcgYW5kIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHVuYXBwbHkoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpc0FyZykge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5jb25zdHJ1Y3QoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnN0cnVjdChmdW5jLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBwcm9wZXJ0aWVzIHRvIGEgbG9va3VwIHRhYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgLSBUaGUgc2V0IHRvIHdoaWNoIGVsZW1lbnRzIHdpbGwgYmUgYWRkZWQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IGNvbnRhaW5pbmcgZWxlbWVudHMgdG8gYmUgYWRkZWQgdG8gdGhlIHNldC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtQ2FzZUZ1bmMgLSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIGNhc2Ugb2YgZWFjaCBlbGVtZW50IGJlZm9yZSBhZGRpbmcgdG8gdGhlIHNldC5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIG1vZGlmaWVkIHNldCB3aXRoIGFkZGVkIGVsZW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gYWRkVG9TZXQoc2V0LCBhcnJheSkge1xuICAgIGxldCB0cmFuc2Zvcm1DYXNlRnVuYyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogc3RyaW5nVG9Mb3dlckNhc2U7XG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAvLyBNYWtlICdpbicgYW5kIHRydXRoeSBjaGVja3MgbGlrZSBCb29sZWFuKHNldC5jb25zdHJ1Y3RvcilcbiAgICAgIC8vIGluZGVwZW5kZW50IG9mIGFueSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gT2JqZWN0LnByb3RvdHlwZS5cbiAgICAgIC8vIFByZXZlbnQgcHJvdG90eXBlIHNldHRlcnMgZnJvbSBpbnRlcmNlcHRpbmcgc2V0IGFzIGEgdGhpcyB2YWx1ZS5cbiAgICAgIHNldFByb3RvdHlwZU9mKHNldCwgbnVsbCk7XG4gICAgfVxuICAgIGxldCBsID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgIGxldCBlbGVtZW50ID0gYXJyYXlbbF07XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGxjRWxlbWVudCA9IHRyYW5zZm9ybUNhc2VGdW5jKGVsZW1lbnQpO1xuICAgICAgICBpZiAobGNFbGVtZW50ICE9PSBlbGVtZW50KSB7XG4gICAgICAgICAgLy8gQ29uZmlnIHByZXNldHMgKGUuZy4gdGFncy5qcywgYXR0cnMuanMpIGFyZSBpbW11dGFibGUuXG4gICAgICAgICAgaWYgKCFpc0Zyb3plbihhcnJheSkpIHtcbiAgICAgICAgICAgIGFycmF5W2xdID0gbGNFbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gbGNFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuIHVwIGFuIGFycmF5IHRvIGhhcmRlbiBhZ2FpbnN0IENTUFBcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgdG8gYmUgY2xlYW5lZC5cbiAgICogQHJldHVybnMge0FycmF5fSBUaGUgY2xlYW5lZCB2ZXJzaW9uIG9mIHRoZSBhcnJheVxuICAgKi9cbiAgZnVuY3Rpb24gY2xlYW5BcnJheShhcnJheSkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KGFycmF5LCBpbmRleCk7XG4gICAgICBpZiAoIWlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBhcnJheVtpbmRleF0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogU2hhbGxvdyBjbG9uZSBhbiBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gYmUgY2xvbmVkLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIG5ldyBvYmplY3QgdGhhdCBjb3BpZXMgdGhlIG9yaWdpbmFsLlxuICAgKi9cbiAgZnVuY3Rpb24gY2xvbmUob2JqZWN0KSB7XG4gICAgY29uc3QgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgIGZvciAoY29uc3QgW3Byb3BlcnR5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmplY3QpKSB7XG4gICAgICBjb25zdCBpc1Byb3BlcnR5RXhpc3QgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgIGlmIChpc1Byb3BlcnR5RXhpc3QpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsZWFuQXJyYXkodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSBjbG9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXV0b21hdGljYWxseSBjaGVja3MgaWYgdGhlIHByb3AgaXMgZnVuY3Rpb24gb3IgZ2V0dGVyIGFuZCBiZWhhdmVzIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBsb29rIHVwIHRoZSBnZXR0ZXIgZnVuY3Rpb24gaW4gaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgLSBUaGUgcHJvcGVydHkgbmFtZSBmb3Igd2hpY2ggdG8gZmluZCB0aGUgZ2V0dGVyIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSBnZXR0ZXIgZnVuY3Rpb24gZm91bmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbiBvciBhIGZhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbG9va3VwR2V0dGVyKG9iamVjdCwgcHJvcCkge1xuICAgIHdoaWxlIChvYmplY3QgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRlc2MgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcbiAgICAgIGlmIChkZXNjKSB7XG4gICAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MuZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRlc2MudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdW5hcHBseShkZXNjLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmFsbGJhY2tWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGh0bWwkMSA9IGZyZWV6ZShbJ2EnLCAnYWJicicsICdhY3JvbnltJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmRpJywgJ2JkbycsICdiaWcnLCAnYmxpbmsnLCAnYmxvY2txdW90ZScsICdib2R5JywgJ2JyJywgJ2J1dHRvbicsICdjYW52YXMnLCAnY2FwdGlvbicsICdjZW50ZXInLCAnY2l0ZScsICdjb2RlJywgJ2NvbCcsICdjb2xncm91cCcsICdjb250ZW50JywgJ2RhdGEnLCAnZGF0YWxpc3QnLCAnZGQnLCAnZGVjb3JhdG9yJywgJ2RlbCcsICdkZXRhaWxzJywgJ2RmbicsICdkaWFsb2cnLCAnZGlyJywgJ2RpdicsICdkbCcsICdkdCcsICdlbGVtZW50JywgJ2VtJywgJ2ZpZWxkc2V0JywgJ2ZpZ2NhcHRpb24nLCAnZmlndXJlJywgJ2ZvbnQnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdsYWJlbCcsICdsZWdlbmQnLCAnbGknLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0ZXInLCAnbmF2JywgJ25vYnInLCAnb2wnLCAnb3B0Z3JvdXAnLCAnb3B0aW9uJywgJ291dHB1dCcsICdwJywgJ3BpY3R1cmUnLCAncHJlJywgJ3Byb2dyZXNzJywgJ3EnLCAncnAnLCAncnQnLCAncnVieScsICdzJywgJ3NhbXAnLCAnc2VjdGlvbicsICdzZWxlY3QnLCAnc2hhZG93JywgJ3NtYWxsJywgJ3NvdXJjZScsICdzcGFjZXInLCAnc3BhbicsICdzdHJpa2UnLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsICd0YWJsZScsICd0Ym9keScsICd0ZCcsICd0ZW1wbGF0ZScsICd0ZXh0YXJlYScsICd0Zm9vdCcsICd0aCcsICd0aGVhZCcsICd0aW1lJywgJ3RyJywgJ3RyYWNrJywgJ3R0JywgJ3UnLCAndWwnLCAndmFyJywgJ3ZpZGVvJywgJ3diciddKTtcblxuICAvLyBTVkdcbiAgY29uc3Qgc3ZnJDEgPSBmcmVlemUoWydzdmcnLCAnYScsICdhbHRnbHlwaCcsICdhbHRnbHlwaGRlZicsICdhbHRnbHlwaGl0ZW0nLCAnYW5pbWF0ZWNvbG9yJywgJ2FuaW1hdGVtb3Rpb24nLCAnYW5pbWF0ZXRyYW5zZm9ybScsICdjaXJjbGUnLCAnY2xpcHBhdGgnLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZycsICdnbHlwaCcsICdnbHlwaHJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJywgJ2xpbmVhcmdyYWRpZW50JywgJ21hcmtlcicsICdtYXNrJywgJ21ldGFkYXRhJywgJ21wYXRoJywgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbGdyYWRpZW50JywgJ3JlY3QnLCAnc3RvcCcsICdzdHlsZScsICdzd2l0Y2gnLCAnc3ltYm9sJywgJ3RleHQnLCAndGV4dHBhdGgnLCAndGl0bGUnLCAndHJlZicsICd0c3BhbicsICd2aWV3JywgJ3ZrZXJuJ10pO1xuICBjb25zdCBzdmdGaWx0ZXJzID0gZnJlZXplKFsnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZURyb3BTaGFkb3cnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJ10pO1xuXG4gIC8vIExpc3Qgb2YgU1ZHIGVsZW1lbnRzIHRoYXQgYXJlIGRpc2FsbG93ZWQgYnkgZGVmYXVsdC5cbiAgLy8gV2Ugc3RpbGwgbmVlZCB0byBrbm93IHRoZW0gc28gdGhhdCB3ZSBjYW4gZG8gbmFtZXNwYWNlXG4gIC8vIGNoZWNrcyBwcm9wZXJseSBpbiBjYXNlIG9uZSB3YW50cyB0byBhZGQgdGhlbSB0b1xuICAvLyBhbGxvdy1saXN0LlxuICBjb25zdCBzdmdEaXNhbGxvd2VkID0gZnJlZXplKFsnYW5pbWF0ZScsICdjb2xvci1wcm9maWxlJywgJ2N1cnNvcicsICdkaXNjYXJkJywgJ2ZvbnQtZmFjZScsICdmb250LWZhY2UtZm9ybWF0JywgJ2ZvbnQtZmFjZS1uYW1lJywgJ2ZvbnQtZmFjZS1zcmMnLCAnZm9udC1mYWNlLXVyaScsICdmb3JlaWdub2JqZWN0JywgJ2hhdGNoJywgJ2hhdGNocGF0aCcsICdtZXNoJywgJ21lc2hncmFkaWVudCcsICdtZXNocGF0Y2gnLCAnbWVzaHJvdycsICdtaXNzaW5nLWdseXBoJywgJ3NjcmlwdCcsICdzZXQnLCAnc29saWRjb2xvcicsICd1bmtub3duJywgJ3VzZSddKTtcbiAgY29uc3QgbWF0aE1sJDEgPSBmcmVlemUoWydtYXRoJywgJ21lbmNsb3NlJywgJ21lcnJvcicsICdtZmVuY2VkJywgJ21mcmFjJywgJ21nbHlwaCcsICdtaScsICdtbGFiZWxlZHRyJywgJ21tdWx0aXNjcmlwdHMnLCAnbW4nLCAnbW8nLCAnbW92ZXInLCAnbXBhZGRlZCcsICdtcGhhbnRvbScsICdtcm9vdCcsICdtcm93JywgJ21zJywgJ21zcGFjZScsICdtc3FydCcsICdtc3R5bGUnLCAnbXN1YicsICdtc3VwJywgJ21zdWJzdXAnLCAnbXRhYmxlJywgJ210ZCcsICdtdGV4dCcsICdtdHInLCAnbXVuZGVyJywgJ211bmRlcm92ZXInLCAnbXByZXNjcmlwdHMnXSk7XG5cbiAgLy8gU2ltaWxhcmx5IHRvIFNWRywgd2Ugd2FudCB0byBrbm93IGFsbCBNYXRoTUwgZWxlbWVudHMsXG4gIC8vIGV2ZW4gdGhvc2UgdGhhdCB3ZSBkaXNhbGxvdyBieSBkZWZhdWx0LlxuICBjb25zdCBtYXRoTWxEaXNhbGxvd2VkID0gZnJlZXplKFsnbWFjdGlvbicsICdtYWxpZ25ncm91cCcsICdtYWxpZ25tYXJrJywgJ21sb25nZGl2JywgJ21zY2FycmllcycsICdtc2NhcnJ5JywgJ21zZ3JvdXAnLCAnbXN0YWNrJywgJ21zbGluZScsICdtc3JvdycsICdzZW1hbnRpY3MnLCAnYW5ub3RhdGlvbicsICdhbm5vdGF0aW9uLXhtbCcsICdtcHJlc2NyaXB0cycsICdub25lJ10pO1xuICBjb25zdCB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XG5cbiAgY29uc3QgaHRtbCA9IGZyZWV6ZShbJ2FjY2VwdCcsICdhY3Rpb24nLCAnYWxpZ24nLCAnYWx0JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvcGljdHVyZWlucGljdHVyZScsICdhdXRvcGxheScsICdiYWNrZ3JvdW5kJywgJ2JnY29sb3InLCAnYm9yZGVyJywgJ2NhcHR1cmUnLCAnY2VsbHBhZGRpbmcnLCAnY2VsbHNwYWNpbmcnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzJywgJ2NsZWFyJywgJ2NvbG9yJywgJ2NvbHMnLCAnY29sc3BhbicsICdjb250cm9scycsICdjb250cm9sc2xpc3QnLCAnY29vcmRzJywgJ2Nyb3Nzb3JpZ2luJywgJ2RhdGV0aW1lJywgJ2RlY29kaW5nJywgJ2RlZmF1bHQnLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJywgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLCAnZW5jdHlwZScsICdlbnRlcmtleWhpbnQnLCAnZmFjZScsICdmb3InLCAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmbGFuZycsICdpZCcsICdpbnB1dG1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzbWFwJywgJ2tpbmQnLCAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvYWRpbmcnLCAnbG9vcCcsICdsb3cnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtZWRpYScsICdtZXRob2QnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsICduYW1lJywgJ25vbmNlJywgJ25vc2hhZGUnLCAnbm92YWxpZGF0ZScsICdub3dyYXAnLCAnb3BlbicsICdvcHRpbXVtJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncGxheXNpbmxpbmUnLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHViZGF0ZScsICdyYWRpb2dyb3VwJywgJ3JlYWRvbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXYnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dzJywgJ3Jvd3NwYW4nLCAnc3BlbGxjaGVjaycsICdzY29wZScsICdzZWxlY3RlZCcsICdzaGFwZScsICdzaXplJywgJ3NpemVzJywgJ3NwYW4nLCAnc3JjbGFuZycsICdzdGFydCcsICdzcmMnLCAnc3Jjc2V0JywgJ3N0ZXAnLCAnc3R5bGUnLCAnc3VtbWFyeScsICd0YWJpbmRleCcsICd0aXRsZScsICd0cmFuc2xhdGUnLCAndHlwZScsICd1c2VtYXAnLCAndmFsaWduJywgJ3ZhbHVlJywgJ3dpZHRoJywgJ3htbG5zJywgJ3Nsb3QnXSk7XG4gIGNvbnN0IHN2ZyA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndHJhbnNmb3JtLW9yaWdpbicsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dGxlbmd0aCcsICd0eXBlJywgJ3UxJywgJ3UyJywgJ3VuaWNvZGUnLCAndmFsdWVzJywgJ3ZpZXdib3gnLCAndmlzaWJpbGl0eScsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dpZHRoJywgJ3dvcmQtc3BhY2luZycsICd3cmFwJywgJ3dyaXRpbmctbW9kZScsICd4Y2hhbm5lbHNlbGVjdG9yJywgJ3ljaGFubmVsc2VsZWN0b3InLCAneCcsICd4MScsICd4MicsICd4bWxucycsICd5JywgJ3kxJywgJ3kyJywgJ3onLCAnem9vbWFuZHBhbiddKTtcbiAgY29uc3QgbWF0aE1sID0gZnJlZXplKFsnYWNjZW50JywgJ2FjY2VudHVuZGVyJywgJ2FsaWduJywgJ2JldmVsbGVkJywgJ2Nsb3NlJywgJ2NvbHVtbnNhbGlnbicsICdjb2x1bW5saW5lcycsICdjb2x1bW5zcGFuJywgJ2Rlbm9tYWxpZ24nLCAnZGVwdGgnLCAnZGlyJywgJ2Rpc3BsYXknLCAnZGlzcGxheXN0eWxlJywgJ2VuY29kaW5nJywgJ2ZlbmNlJywgJ2ZyYW1lJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2xhcmdlb3AnLCAnbGVuZ3RoJywgJ2xpbmV0aGlja25lc3MnLCAnbHNwYWNlJywgJ2xxdW90ZScsICdtYXRoYmFja2dyb3VuZCcsICdtYXRoY29sb3InLCAnbWF0aHNpemUnLCAnbWF0aHZhcmlhbnQnLCAnbWF4c2l6ZScsICdtaW5zaXplJywgJ21vdmFibGVsaW1pdHMnLCAnbm90YXRpb24nLCAnbnVtYWxpZ24nLCAnb3BlbicsICdyb3dhbGlnbicsICdyb3dsaW5lcycsICdyb3dzcGFjaW5nJywgJ3Jvd3NwYW4nLCAncnNwYWNlJywgJ3JxdW90ZScsICdzY3JpcHRsZXZlbCcsICdzY3JpcHRtaW5zaXplJywgJ3NjcmlwdHNpemVtdWx0aXBsaWVyJywgJ3NlbGVjdGlvbicsICdzZXBhcmF0b3InLCAnc2VwYXJhdG9ycycsICdzdHJldGNoeScsICdzdWJzY3JpcHRzaGlmdCcsICdzdXBzY3JpcHRzaGlmdCcsICdzeW1tZXRyaWMnLCAndm9mZnNldCcsICd3aWR0aCcsICd4bWxucyddKTtcbiAgY29uc3QgeG1sID0gZnJlZXplKFsneGxpbms6aHJlZicsICd4bWw6aWQnLCAneGxpbms6dGl0bGUnLCAneG1sOnNwYWNlJywgJ3htbG5zOnhsaW5rJ10pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICBjb25zdCBNVVNUQUNIRV9FWFBSID0gc2VhbCgvXFx7XFx7W1xcd1xcV10qfFtcXHdcXFddKlxcfVxcfS9nbSk7IC8vIFNwZWNpZnkgdGVtcGxhdGUgZGV0ZWN0aW9uIHJlZ2V4IGZvciBTQUZFX0ZPUl9URU1QTEFURVMgbW9kZVxuICBjb25zdCBFUkJfRVhQUiA9IHNlYWwoLzwlW1xcd1xcV10qfFtcXHdcXFddKiU+L2dtKTtcbiAgY29uc3QgVE1QTElUX0VYUFIgPSBzZWFsKC9cXCR7W1xcd1xcV10qfS9nbSk7XG4gIGNvbnN0IERBVEFfQVRUUiA9IHNlYWwoL15kYXRhLVtcXC1cXHcuXFx1MDBCNy1cXHVGRkZGXS8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IEFSSUFfQVRUUiA9IHNlYWwoL15hcmlhLVtcXC1cXHddKyQvKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICBjb25zdCBJU19BTExPV0VEX1VSSSA9IHNlYWwoL14oPzooPzooPzpmfGh0KXRwcz98bWFpbHRvfHRlbHxjYWxsdG98c21zfGNpZHx4bXBwKTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcblxuICBjb25zdCBJU19TQ1JJUFRfT1JfREFUQSA9IHNlYWwoL14oPzpcXHcrc2NyaXB0fGRhdGEpOi9pKTtcbiAgY29uc3QgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuICApO1xuXG4gIGNvbnN0IERPQ1RZUEVfTkFNRSA9IHNlYWwoL15odG1sJC9pKTtcblxuICB2YXIgRVhQUkVTU0lPTlMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIE1VU1RBQ0hFX0VYUFI6IE1VU1RBQ0hFX0VYUFIsXG4gICAgRVJCX0VYUFI6IEVSQl9FWFBSLFxuICAgIFRNUExJVF9FWFBSOiBUTVBMSVRfRVhQUixcbiAgICBEQVRBX0FUVFI6IERBVEFfQVRUUixcbiAgICBBUklBX0FUVFI6IEFSSUFfQVRUUixcbiAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkksXG4gICAgSVNfU0NSSVBUX09SX0RBVEE6IElTX1NDUklQVF9PUl9EQVRBLFxuICAgIEFUVFJfV0hJVEVTUEFDRTogQVRUUl9XSElURVNQQUNFLFxuICAgIERPQ1RZUEVfTkFNRTogRE9DVFlQRV9OQU1FXG4gIH0pO1xuXG4gIGNvbnN0IGdldEdsb2JhbCA9IGZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93O1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbm8tb3AgcG9saWN5IGZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogRG9uJ3QgZXhwb3J0IHRoaXMgZnVuY3Rpb24gb3V0c2lkZSB0aGlzIG1vZHVsZSFcbiAgICogQHBhcmFtIHtUcnVzdGVkVHlwZVBvbGljeUZhY3Rvcnl9IHRydXN0ZWRUeXBlcyBUaGUgcG9saWN5IGZhY3RvcnkuXG4gICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHB1cmlmeUhvc3RFbGVtZW50IFRoZSBTY3JpcHQgZWxlbWVudCB1c2VkIHRvIGxvYWQgRE9NUHVyaWZ5ICh0byBkZXRlcm1pbmUgcG9saWN5IG5hbWUgc3VmZml4KS5cbiAgICogQHJldHVybiB7VHJ1c3RlZFR5cGVQb2xpY3l9IFRoZSBwb2xpY3kgY3JlYXRlZCAob3IgbnVsbCwgaWYgVHJ1c3RlZCBUeXBlc1xuICAgKiBhcmUgbm90IHN1cHBvcnRlZCBvciBjcmVhdGluZyB0aGUgcG9saWN5IGZhaWxlZCkuXG4gICAqL1xuICBjb25zdCBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5ID0gZnVuY3Rpb24gX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSh0cnVzdGVkVHlwZXMsIHB1cmlmeUhvc3RFbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0cnVzdGVkVHlwZXMgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB0aGUgY2FsbGVycyB0byBjb250cm9sIHRoZSB1bmlxdWUgcG9saWN5IG5hbWVcbiAgICAvLyBieSBhZGRpbmcgYSBkYXRhLXR0LXBvbGljeS1zdWZmaXggdG8gdGhlIHNjcmlwdCBlbGVtZW50IHdpdGggdGhlIERPTVB1cmlmeS5cbiAgICAvLyBQb2xpY3kgY3JlYXRpb24gd2l0aCBkdXBsaWNhdGUgbmFtZXMgdGhyb3dzIGluIFRydXN0ZWQgVHlwZXMuXG4gICAgbGV0IHN1ZmZpeCA9IG51bGw7XG4gICAgY29uc3QgQVRUUl9OQU1FID0gJ2RhdGEtdHQtcG9saWN5LXN1ZmZpeCc7XG4gICAgaWYgKHB1cmlmeUhvc3RFbGVtZW50ICYmIHB1cmlmeUhvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShBVFRSX05BTUUpKSB7XG4gICAgICBzdWZmaXggPSBwdXJpZnlIb3N0RWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUl9OQU1FKTtcbiAgICB9XG4gICAgY29uc3QgcG9saWN5TmFtZSA9ICdkb21wdXJpZnknICsgKHN1ZmZpeCA/ICcjJyArIHN1ZmZpeCA6ICcnKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kocG9saWN5TmFtZSwge1xuICAgICAgICBjcmVhdGVIVE1MKGh0bWwpIHtcbiAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlU2NyaXB0VVJMKHNjcmlwdFVybCkge1xuICAgICAgICAgIHJldHVybiBzY3JpcHRVcmw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIC8vIFBvbGljeSBjcmVhdGlvbiBmYWlsZWQgKG1vc3QgbGlrZWx5IGFub3RoZXIgRE9NUHVyaWZ5IHNjcmlwdCBoYXNcbiAgICAgIC8vIGFscmVhZHkgcnVuKS4gU2tpcCBjcmVhdGluZyB0aGUgcG9saWN5LCBhcyB0aGlzIHdpbGwgb25seSBjYXVzZSBlcnJvcnNcbiAgICAgIC8vIGlmIFRUIGFyZSBlbmZvcmNlZC5cbiAgICAgIGNvbnNvbGUud2FybignVHJ1c3RlZFR5cGVzIHBvbGljeSAnICsgcG9saWN5TmFtZSArICcgY291bGQgbm90IGJlIGNyZWF0ZWQuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGNyZWF0ZURPTVB1cmlmeSgpIHtcbiAgICBsZXQgd2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRHbG9iYWwoKTtcbiAgICBjb25zdCBET01QdXJpZnkgPSByb290ID0+IGNyZWF0ZURPTVB1cmlmeShyb290KTtcblxuICAgIC8qKlxuICAgICAqIFZlcnNpb24gbGFiZWwsIGV4cG9zZWQgZm9yIGVhc2llciBjaGVja3NcbiAgICAgKiBpZiBET01QdXJpZnkgaXMgdXAgdG8gZGF0ZSBvciBub3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkudmVyc2lvbiA9ICczLjAuOSc7XG5cbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBlbGVtZW50cyB0aGF0IERPTVB1cmlmeSByZW1vdmVkIGR1cmluZyBzYW5pdGF0aW9uLlxuICAgICAqIEVtcHR5IGlmIG5vdGhpbmcgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBET01QdXJpZnk7XG4gICAgfVxuICAgIGxldCB7XG4gICAgICBkb2N1bWVudFxuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3Qgb3JpZ2luYWxEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGN1cnJlbnRTY3JpcHQgPSBvcmlnaW5hbERvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG4gICAgY29uc3Qge1xuICAgICAgRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICBOb2RlLFxuICAgICAgRWxlbWVudCxcbiAgICAgIE5vZGVGaWx0ZXIsXG4gICAgICBOYW1lZE5vZGVNYXAgPSB3aW5kb3cuTmFtZWROb2RlTWFwIHx8IHdpbmRvdy5Nb3pOYW1lZEF0dHJNYXAsXG4gICAgICBIVE1MRm9ybUVsZW1lbnQsXG4gICAgICBET01QYXJzZXIsXG4gICAgICB0cnVzdGVkVHlwZXNcbiAgICB9ID0gd2luZG93O1xuICAgIGNvbnN0IEVsZW1lbnRQcm90b3R5cGUgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICBjb25zdCBjbG9uZU5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2Nsb25lTm9kZScpO1xuICAgIGNvbnN0IGdldE5leHRTaWJsaW5nID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICduZXh0U2libGluZycpO1xuICAgIGNvbnN0IGdldENoaWxkTm9kZXMgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2NoaWxkTm9kZXMnKTtcbiAgICBjb25zdCBnZXRQYXJlbnROb2RlID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdwYXJlbnROb2RlJyk7XG5cbiAgICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuICAgIGlmICh0eXBlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgdHJ1c3RlZFR5cGVzUG9saWN5O1xuICAgIGxldCBlbXB0eUhUTUwgPSAnJztcbiAgICBjb25zdCB7XG4gICAgICBpbXBsZW1lbnRhdGlvbixcbiAgICAgIGNyZWF0ZU5vZGVJdGVyYXRvcixcbiAgICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQsXG4gICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZVxuICAgIH0gPSBkb2N1bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBpbXBvcnROb2RlXG4gICAgfSA9IG9yaWdpbmFsRG9jdW1lbnQ7XG4gICAgbGV0IGhvb2tzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2Ugd2hldGhlciB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgcnVubmluZyB0aGUgZnVsbCBET01QdXJpZnkuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gdHlwZW9mIGVudHJpZXMgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGdldFBhcmVudE5vZGUgPT09ICdmdW5jdGlvbicgJiYgaW1wbGVtZW50YXRpb24gJiYgaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50ICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3Qge1xuICAgICAgTVVTVEFDSEVfRVhQUixcbiAgICAgIEVSQl9FWFBSLFxuICAgICAgVE1QTElUX0VYUFIsXG4gICAgICBEQVRBX0FUVFIsXG4gICAgICBBUklBX0FUVFIsXG4gICAgICBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICAgIEFUVFJfV0hJVEVTUEFDRVxuICAgIH0gPSBFWFBSRVNTSU9OUztcbiAgICBsZXQge1xuICAgICAgSVNfQUxMT1dFRF9VUkk6IElTX0FMTE9XRURfVVJJJDFcbiAgICB9ID0gRVhQUkVTU0lPTlM7XG5cbiAgICAvKipcbiAgICAgKiBXZSBjb25zaWRlciB0aGUgZWxlbWVudHMgYW5kIGF0dHJpYnV0ZXMgYmVsb3cgdG8gYmUgc2FmZS4gSWRlYWxseVxuICAgICAqIGRvbid0IGFkZCBhbnkgbmV3IG9uZXMgYnV0IGZlZWwgZnJlZSB0byByZW1vdmUgdW53YW50ZWQgb25lcy5cbiAgICAgKi9cblxuICAgIC8qIGFsbG93ZWQgZWxlbWVudCBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX1RBR1MgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5odG1sJDEsIC4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5tYXRoTWwkMSwgLi4udGV4dF0pO1xuXG4gICAgLyogQWxsb3dlZCBhdHRyaWJ1dGUgbmFtZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfQVRUUiA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCwgLi4uc3ZnLCAuLi5tYXRoTWwsIC4uLnhtbF0pO1xuXG4gICAgLypcbiAgICAgKiBDb25maWd1cmUgaG93IERPTVBVcmlmeSBzaG91bGQgaGFuZGxlIGN1c3RvbSBlbGVtZW50cyBhbmQgdGhlaXIgYXR0cmlidXRlcyBhcyB3ZWxsIGFzIGN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHMuXG4gICAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gdGFnTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBjdXN0b20gZWxlbWVudHMpXG4gICAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gYXR0cmlidXRlTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBhdHRyaWJ1dGVzIG5vdCBvbiB0aGUgYWxsb3cgbGlzdClcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyBhbGxvdyBjdXN0b20gZWxlbWVudHMgZGVyaXZlZCBmcm9tIGJ1aWx0LWlucyBpZiB0aGV5IHBhc3MgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLiBEZWZhdWx0OiBgZmFsc2VgLlxuICAgICAqL1xuICAgIGxldCBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IE9iamVjdC5zZWFsKGNyZWF0ZShudWxsLCB7XG4gICAgICB0YWdOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50czoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gdGFncyAob3ZlcnJpZGVzIEFMTE9XRURfVEFHUy9BRERfVEFHUykgKi9cbiAgICBsZXQgRk9SQklEX1RBR1MgPSBudWxsO1xuXG4gICAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gYXR0cmlidXRlcyAob3ZlcnJpZGVzIEFMTE9XRURfQVRUUi9BRERfQVRUUikgKi9cbiAgICBsZXQgRk9SQklEX0FUVFIgPSBudWxsO1xuXG4gICAgLyogRGVjaWRlIGlmIEFSSUEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19BUklBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIGN1c3RvbSBkYXRhIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfREFUQV9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIERlY2lkZSBpZiB1bmtub3duIHByb3RvY29scyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIHNlbGYtY2xvc2luZyB0YWdzIGluIGF0dHJpYnV0ZXMgYXJlIGFsbG93ZWQuXG4gICAgICogVXN1YWxseSByZW1vdmVkIGR1ZSB0byBhIG1YU1MgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuICAgIGxldCBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBzYWZlIGZvciBjb21tb24gdGVtcGxhdGUgZW5naW5lcy5cbiAgICAgKiBUaGlzIG1lYW5zLCBET01QdXJpZnkgcmVtb3ZlcyBkYXRhIGF0dHJpYnV0ZXMsIG11c3RhY2hlcyBhbmQgRVJCXG4gICAgICovXG4gICAgbGV0IFNBRkVfRk9SX1RFTVBMQVRFUyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGRvY3VtZW50IHdpdGggPGh0bWw+Li4uIHNob3VsZCBiZSByZXR1cm5lZCAqL1xuICAgIGxldCBXSE9MRV9ET0NVTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJhY2sgd2hldGhlciBjb25maWcgaXMgYWxyZWFkeSBzZXQgb24gdGhpcyBpbnN0YW5jZSBvZiBET01QdXJpZnkuICovXG4gICAgbGV0IFNFVF9DT05GSUcgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhbGwgZWxlbWVudHMgKGUuZy4gc3R5bGUsIHNjcmlwdCkgbXVzdCBiZSBjaGlsZHJlbiBvZlxuICAgICAqIGRvY3VtZW50LmJvZHkuIEJ5IGRlZmF1bHQsIGJyb3dzZXJzIG1pZ2h0IG1vdmUgdGhlbSB0byBkb2N1bWVudC5oZWFkICovXG4gICAgbGV0IEZPUkNFX0JPRFkgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgSFRNTEJvZHlFbGVtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXG4gICAgICogc3RyaW5nIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpLlxuICAgICAqIElmIGBXSE9MRV9ET0NVTUVOVGAgaXMgZW5hYmxlZCBhIGBIVE1MSHRtbEVsZW1lbnRgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZFxuICAgICAqL1xuICAgIGxldCBSRVRVUk5fRE9NID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYERvY3VtZW50RnJhZ21lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpICovXG4gICAgbGV0IFJFVFVSTl9ET01fRlJBR01FTlQgPSBmYWxzZTtcblxuICAgIC8qIFRyeSB0byByZXR1cm4gYSBUcnVzdGVkIFR5cGUgb2JqZWN0IGluc3RlYWQgb2YgYSBzdHJpbmcsIHJldHVybiBhIHN0cmluZyBpblxuICAgICAqIGNhc2UgVHJ1c3RlZCBUeXBlcyBhcmUgbm90IHN1cHBvcnRlZCAgKi9cbiAgICBsZXQgUkVUVVJOX1RSVVNURURfVFlQRSA9IGZhbHNlO1xuXG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBmcmVlIGZyb20gRE9NIGNsb2JiZXJpbmcgYXR0YWNrcz9cbiAgICAgKiBUaGlzIHNhbml0aXplcyBtYXJrdXBzIG5hbWVkIHdpdGggY29sbGlkaW5nLCBjbG9iYmVyYWJsZSBidWlsdC1pbiBET00gQVBJcy5cbiAgICAgKi9cbiAgICBsZXQgU0FOSVRJWkVfRE9NID0gdHJ1ZTtcblxuICAgIC8qIEFjaGlldmUgZnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIGJ5IGlzb2xhdGluZyB0aGUgbmFtZXNwYWNlIG9mIG5hbWVkXG4gICAgICogcHJvcGVydGllcyBhbmQgSlMgdmFyaWFibGVzLCBtaXRpZ2F0aW5nIGF0dGFja3MgdGhhdCBhYnVzZSB0aGUgSFRNTC9ET00gc3BlYyBydWxlcy5cbiAgICAgKlxuICAgICAqIEhUTUwvRE9NIHNwZWMgcnVsZXMgdGhhdCBlbmFibGUgRE9NIENsb2JiZXJpbmc6XG4gICAgICogICAtIE5hbWVkIEFjY2VzcyBvbiBXaW5kb3cgKMKnNy4zLjMpXG4gICAgICogICAtIERPTSBUcmVlIEFjY2Vzc29ycyAowqczLjEuNSlcbiAgICAgKiAgIC0gRm9ybSBFbGVtZW50IFBhcmVudC1DaGlsZCBSZWxhdGlvbnMgKMKnNC4xMC4zKVxuICAgICAqICAgLSBJZnJhbWUgc3JjZG9jIC8gTmVzdGVkIFdpbmRvd1Byb3hpZXMgKMKnNC44LjUpXG4gICAgICogICAtIEhUTUxDb2xsZWN0aW9uICjCpzQuMi4xMC4yKVxuICAgICAqXG4gICAgICogTmFtZXNwYWNlIGlzb2xhdGlvbiBpcyBpbXBsZW1lbnRlZCBieSBwcmVmaXhpbmcgYGlkYCBhbmQgYG5hbWVgIGF0dHJpYnV0ZXNcbiAgICAgKiB3aXRoIGEgY29uc3RhbnQgc3RyaW5nLCBpLmUuLCBgdXNlci1jb250ZW50LWBcbiAgICAgKi9cbiAgICBsZXQgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBmYWxzZTtcbiAgICBjb25zdCBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggPSAndXNlci1jb250ZW50LSc7XG5cbiAgICAvKiBLZWVwIGVsZW1lbnQgY29udGVudCB3aGVuIHJlbW92aW5nIGVsZW1lbnQ/ICovXG4gICAgbGV0IEtFRVBfQ09OVEVOVCA9IHRydWU7XG5cbiAgICAvKiBJZiBhIGBOb2RlYCBpcyBwYXNzZWQgdG8gc2FuaXRpemUoKSwgdGhlbiBwZXJmb3JtcyBzYW5pdGl6YXRpb24gaW4tcGxhY2UgaW5zdGVhZFxuICAgICAqIG9mIGltcG9ydGluZyBpdCBpbnRvIGEgbmV3IERvY3VtZW50IGFuZCByZXR1cm5pbmcgYSBzYW5pdGl6ZWQgY29weSAqL1xuICAgIGxldCBJTl9QTEFDRSA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3cgdXNhZ2Ugb2YgcHJvZmlsZXMgbGlrZSBodG1sLCBzdmcgYW5kIG1hdGhNbCAqL1xuICAgIGxldCBVU0VfUFJPRklMRVMgPSB7fTtcblxuICAgIC8qIFRhZ3MgdG8gaWdub3JlIGNvbnRlbnQgb2Ygd2hlbiBLRUVQX0NPTlRFTlQgaXMgdHJ1ZSAqL1xuICAgIGxldCBGT1JCSURfQ09OVEVOVFMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTID0gYWRkVG9TZXQoe30sIFsnYW5ub3RhdGlvbi14bWwnLCAnYXVkaW8nLCAnY29sZ3JvdXAnLCAnZGVzYycsICdmb3JlaWdub2JqZWN0JywgJ2hlYWQnLCAnaWZyYW1lJywgJ21hdGgnLCAnbWknLCAnbW4nLCAnbW8nLCAnbXMnLCAnbXRleHQnLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdub3NjcmlwdCcsICdwbGFpbnRleHQnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3N2ZycsICd0ZW1wbGF0ZScsICd0aGVhZCcsICd0aXRsZScsICd2aWRlbycsICd4bXAnXSk7XG5cbiAgICAvKiBUYWdzIHRoYXQgYXJlIHNhZmUgZm9yIGRhdGE6IFVSSXMgKi9cbiAgICBsZXQgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9EQVRBX1VSSV9UQUdTID0gYWRkVG9TZXQoe30sIFsnYXVkaW8nLCAndmlkZW8nLCAnaW1nJywgJ3NvdXJjZScsICdpbWFnZScsICd0cmFjayddKTtcblxuICAgIC8qIEF0dHJpYnV0ZXMgc2FmZSBmb3IgdmFsdWVzIGxpa2UgXCJqYXZhc2NyaXB0OlwiICovXG4gICAgbGV0IFVSSV9TQUZFX0FUVFJJQlVURVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyA9IGFkZFRvU2V0KHt9LCBbJ2FsdCcsICdjbGFzcycsICdmb3InLCAnaWQnLCAnbGFiZWwnLCAnbmFtZScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3JvbGUnLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcbiAgICBjb25zdCBNQVRITUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnO1xuICAgIGNvbnN0IFNWR19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGNvbnN0IEhUTUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuICAgIC8qIERvY3VtZW50IG5hbWVzcGFjZSAqL1xuICAgIGxldCBOQU1FU1BBQ0UgPSBIVE1MX05BTUVTUEFDRTtcbiAgICBsZXQgSVNfRU1QVFlfSU5QVVQgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93ZWQgWEhUTUwrWE1MIG5hbWVzcGFjZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9OQU1FU1BBQ0VTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUyA9IGFkZFRvU2V0KHt9LCBbTUFUSE1MX05BTUVTUEFDRSwgU1ZHX05BTUVTUEFDRSwgSFRNTF9OQU1FU1BBQ0VdLCBzdHJpbmdUb1N0cmluZyk7XG5cbiAgICAvKiBQYXJzaW5nIG9mIHN0cmljdCBYSFRNTCBkb2N1bWVudHMgKi9cbiAgICBsZXQgUEFSU0VSX01FRElBX1RZUEUgPSBudWxsO1xuICAgIGNvbnN0IFNVUFBPUlRFRF9QQVJTRVJfTUVESUFfVFlQRVMgPSBbJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsICd0ZXh0L2h0bWwnXTtcbiAgICBjb25zdCBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFID0gJ3RleHQvaHRtbCc7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gbnVsbDtcblxuICAgIC8qIEtlZXAgYSByZWZlcmVuY2UgdG8gY29uZmlnIHRvIHBhc3MgdG8gaG9va3MgKi9cbiAgICBsZXQgQ09ORklHID0gbnVsbDtcblxuICAgIC8qIElkZWFsbHksIGRvIG5vdCB0b3VjaCBhbnl0aGluZyBiZWxvdyB0aGlzIGxpbmUgKi9cbiAgICAvKiBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fICovXG5cbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCBpc1JlZ2V4T3JGdW5jdGlvbiA9IGZ1bmN0aW9uIGlzUmVnZXhPckZ1bmN0aW9uKHRlc3RWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRlc3RWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3BhcnNlQ29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNmZyBvcHRpb25hbCBjb25maWcgbGl0ZXJhbFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgY29uc3QgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBpZiAoQ09ORklHICYmIENPTkZJRyA9PT0gY2ZnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gdGFtcGVyaW5nICovXG4gICAgICBpZiAoIWNmZyB8fCB0eXBlb2YgY2ZnICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjZmcgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gcHJvdG90eXBlIHBvbGx1dGlvbiAqL1xuICAgICAgY2ZnID0gY2xvbmUoY2ZnKTtcbiAgICAgIFBBUlNFUl9NRURJQV9UWVBFID1cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICAgICAgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUy5pbmRleE9mKGNmZy5QQVJTRVJfTUVESUFfVFlQRSkgPT09IC0xID8gREVGQVVMVF9QQVJTRVJfTUVESUFfVFlQRSA6IGNmZy5QQVJTRVJfTUVESUFfVFlQRTtcblxuICAgICAgLy8gSFRNTCB0YWdzIGFuZCBhdHRyaWJ1dGVzIGFyZSBub3QgY2FzZS1zZW5zaXRpdmUsIGNvbnZlcnRpbmcgdG8gbG93ZXJjYXNlLiBLZWVwaW5nIFhIVE1MIGFzIGlzLlxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgPyBzdHJpbmdUb1N0cmluZyA6IHN0cmluZ1RvTG93ZXJDYXNlO1xuXG4gICAgICAvKiBTZXQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgICBBTExPV0VEX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0FMTE9XRURfVEFHUztcbiAgICAgIEFMTE9XRURfQVRUUiA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9BVFRSO1xuICAgICAgQUxMT1dFRF9OQU1FU1BBQ0VTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9OQU1FU1BBQ0VTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfTkFNRVNQQUNFUywgc3RyaW5nVG9TdHJpbmcpIDogREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVM7XG4gICAgICBVUklfU0FGRV9BVFRSSUJVVEVTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUREX1VSSV9TQUZFX0FUVFInKSA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyksXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgY2ZnLkFERF9VUklfU0FGRV9BVFRSLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICA6IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUztcbiAgICAgIERBVEFfVVJJX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfREFUQV9VUklfVEFHUycpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9EQVRBX1VSSV9UQUdTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX0RBVEFfVVJJX1RBR1MsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9EQVRBX1VSSV9UQUdTO1xuICAgICAgRk9SQklEX0NPTlRFTlRTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0NPTlRFTlRTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9DT05URU5UUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9GT1JCSURfQ09OVEVOVFM7XG4gICAgICBGT1JCSURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9UQUdTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiB7fTtcbiAgICAgIEZPUkJJRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0FUVFInKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgVVNFX1BST0ZJTEVTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnVVNFX1BST0ZJTEVTJykgPyBjZmcuVVNFX1BST0ZJTEVTIDogZmFsc2U7XG4gICAgICBBTExPV19BUklBX0FUVFIgPSBjZmcuQUxMT1dfQVJJQV9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBBTExPV19EQVRBX0FUVFIgPSBjZmcuQUxMT1dfREFUQV9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGNmZy5BTExPV19VTktOT1dOX1BST1RPQ09MUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSID0gY2ZnLkFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgU0FGRV9GT1JfVEVNUExBVEVTID0gY2ZnLlNBRkVfRk9SX1RFTVBMQVRFUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgV0hPTEVfRE9DVU1FTlQgPSBjZmcuV0hPTEVfRE9DVU1FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET00gPSBjZmcuUkVUVVJOX0RPTSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGNmZy5SRVRVUk5fRE9NX0ZSQUdNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fVFJVU1RFRF9UWVBFID0gY2ZnLlJFVFVSTl9UUlVTVEVEX1RZUEUgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEZPUkNFX0JPRFkgPSBjZmcuRk9SQ0VfQk9EWSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgU0FOSVRJWkVfRE9NID0gY2ZnLlNBTklUSVpFX0RPTSAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBjZmcuU0FOSVRJWkVfTkFNRURfUFJPUFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEtFRVBfQ09OVEVOVCA9IGNmZy5LRUVQX0NPTlRFTlQgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIElOX1BMQUNFID0gY2ZnLklOX1BMQUNFIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBJU19BTExPV0VEX1VSSSQxID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBJU19BTExPV0VEX1VSSTtcbiAgICAgIE5BTUVTUEFDRSA9IGNmZy5OQU1FU1BBQ0UgfHwgSFRNTF9OQU1FU1BBQ0U7XG4gICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyB8fCB7fTtcbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaykpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaztcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaykpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaztcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgdHlwZW9mIGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPT09ICdib29sZWFuJykge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzO1xuICAgICAgfVxuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBBTExPV19EQVRBX0FUVFIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgIFJFVFVSTl9ET00gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICAgIGlmIChVU0VfUFJPRklMRVMpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIHRleHQpO1xuICAgICAgICBBTExPV0VEX0FUVFIgPSBbXTtcbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmcgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2ZyQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnRmlsdGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnRmlsdGVycyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBzdmcpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLm1hdGhNbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogTWVyZ2UgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgICBpZiAoY2ZnLkFERF9UQUdTKSB7XG4gICAgICAgIGlmIChBTExPV0VEX1RBR1MgPT09IERFRkFVTFRfQUxMT1dFRF9UQUdTKSB7XG4gICAgICAgICAgQUxMT1dFRF9UQUdTID0gY2xvbmUoQUxMT1dFRF9UQUdTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGNmZy5BRERfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfQVRUUikge1xuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSID09PSBERUZBVUxUX0FMTE9XRURfQVRUUikge1xuICAgICAgICAgIEFMTE9XRURfQVRUUiA9IGNsb25lKEFMTE9XRURfQVRUUik7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBjZmcuQUREX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQUREX1VSSV9TQUZFX0FUVFIpIHtcbiAgICAgICAgYWRkVG9TZXQoVVJJX1NBRkVfQVRUUklCVVRFUywgY2ZnLkFERF9VUklfU0FGRV9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkZPUkJJRF9DT05URU5UUykge1xuICAgICAgICBpZiAoRk9SQklEX0NPTlRFTlRTID09PSBERUZBVUxUX0ZPUkJJRF9DT05URU5UUykge1xuICAgICAgICAgIEZPUkJJRF9DT05URU5UUyA9IGNsb25lKEZPUkJJRF9DT05URU5UUyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoRk9SQklEX0NPTlRFTlRTLCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCAjdGV4dCBpbiBjYXNlIEtFRVBfQ09OVEVOVCBpcyBzZXQgdG8gdHJ1ZSAqL1xuICAgICAgaWYgKEtFRVBfQ09OVEVOVCkge1xuICAgICAgICBBTExPV0VEX1RBR1NbJyN0ZXh0J10gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgaHRtbCwgaGVhZCBhbmQgYm9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSBXSE9MRV9ET0NVTUVOVCBpcyB0cnVlICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ2h0bWwnLCAnaGVhZCcsICdib2R5J10pO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgdGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgdGFibGVzIGFyZSBwZXJtaXR0ZWQsIHNlZSAjMjg2LCAjMzY1ICovXG4gICAgICBpZiAoQUxMT1dFRF9UQUdTLnRhYmxlKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWyd0Ym9keSddKTtcbiAgICAgICAgZGVsZXRlIEZPUkJJRF9UQUdTLnRib2R5O1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWSkge1xuICAgICAgICBpZiAodHlwZW9mIGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWS5jcmVhdGVIVE1MICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZUhUTUxcIiBob29rLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZVNjcmlwdFVSTCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnVFJVU1RFRF9UWVBFU19QT0xJQ1kgY29uZmlndXJhdGlvbiBvcHRpb24gbXVzdCBwcm92aWRlIGEgXCJjcmVhdGVTY3JpcHRVUkxcIiBob29rLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3ZlcndyaXRlIGV4aXN0aW5nIFRydXN0ZWRUeXBlcyBwb2xpY3kuXG4gICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWTtcblxuICAgICAgICAvLyBTaWduIGxvY2FsIHZhcmlhYmxlcyByZXF1aXJlZCBieSBgc2FuaXRpemVgLlxuICAgICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVbmluaXRpYWxpemVkIHBvbGljeSwgYXR0ZW1wdCB0byBpbml0aWFsaXplIHRoZSBpbnRlcm5hbCBkb21wdXJpZnkgcG9saWN5LlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgY3VycmVudFNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjcmVhdGluZyB0aGUgaW50ZXJuYWwgcG9saWN5IHN1Y2NlZWRlZCBzaWduIGludGVybmFsIHZhcmlhYmxlcy5cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAhPT0gbnVsbCAmJiB0eXBlb2YgZW1wdHlIVE1MID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IGZ1cnRoZXIgbWFuaXB1bGF0aW9uIG9mIGNvbmZpZ3VyYXRpb24uXG4gICAgICAvLyBOb3QgYXZhaWxhYmxlIGluIElFOCwgU2FmYXJpIDUsIGV0Yy5cbiAgICAgIGlmIChmcmVlemUpIHtcbiAgICAgICAgZnJlZXplKGNmZyk7XG4gICAgICB9XG4gICAgICBDT05GSUcgPSBjZmc7XG4gICAgfTtcbiAgICBjb25zdCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydtaScsICdtbycsICdtbicsICdtcycsICdtdGV4dCddKTtcbiAgICBjb25zdCBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ2ZvcmVpZ25vYmplY3QnLCAnZGVzYycsICd0aXRsZScsICdhbm5vdGF0aW9uLXhtbCddKTtcblxuICAgIC8vIENlcnRhaW4gZWxlbWVudHMgYXJlIGFsbG93ZWQgaW4gYm90aCBTVkcgYW5kIEhUTUxcbiAgICAvLyBuYW1lc3BhY2UuIFdlIG5lZWQgdG8gc3BlY2lmeSB0aGVtIGV4cGxpY2l0bHlcbiAgICAvLyBzbyB0aGF0IHRoZXkgZG9uJ3QgZ2V0IGVycm9uZW91c2x5IGRlbGV0ZWQgZnJvbVxuICAgIC8vIEhUTUwgbmFtZXNwYWNlLlxuICAgIGNvbnN0IENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFMgPSBhZGRUb1NldCh7fSwgWyd0aXRsZScsICdzdHlsZScsICdmb250JywgJ2EnLCAnc2NyaXB0J10pO1xuXG4gICAgLyogS2VlcCB0cmFjayBvZiBhbGwgcG9zc2libGUgU1ZHIGFuZCBNYXRoTUwgdGFnc1xuICAgICAqIHNvIHRoYXQgd2UgY2FuIHBlcmZvcm0gdGhlIG5hbWVzcGFjZSBjaGVja3NcbiAgICAgKiBjb3JyZWN0bHkuICovXG4gICAgY29uc3QgQUxMX1NWR19UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5zdmckMSwgLi4uc3ZnRmlsdGVycywgLi4uc3ZnRGlzYWxsb3dlZF0pO1xuICAgIGNvbnN0IEFMTF9NQVRITUxfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4ubWF0aE1sJDEsIC4uLm1hdGhNbERpc2FsbG93ZWRdKTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgYSBET00gZWxlbWVudCB3aG9zZSBuYW1lc3BhY2UgaXMgYmVpbmcgY2hlY2tlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm4gZmFsc2UgaWYgdGhlIGVsZW1lbnQgaGFzIGFcbiAgICAgKiAgbmFtZXNwYWNlIHRoYXQgYSBzcGVjLWNvbXBsaWFudCBwYXJzZXIgd291bGQgbmV2ZXJcbiAgICAgKiAgcmV0dXJuLiBSZXR1cm4gdHJ1ZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgY29uc3QgX2NoZWNrVmFsaWROYW1lc3BhY2UgPSBmdW5jdGlvbiBfY2hlY2tWYWxpZE5hbWVzcGFjZShlbGVtZW50KSB7XG4gICAgICBsZXQgcGFyZW50ID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcblxuICAgICAgLy8gSW4gSlNET00sIGlmIHdlJ3JlIGluc2lkZSBzaGFkb3cgRE9NLCB0aGVuIHBhcmVudE5vZGVcbiAgICAgIC8vIGNhbiBiZSBudWxsLiBXZSBqdXN0IHNpbXVsYXRlIHBhcmVudCBpbiB0aGlzIGNhc2UuXG4gICAgICBpZiAoIXBhcmVudCB8fCAhcGFyZW50LnRhZ05hbWUpIHtcbiAgICAgICAgcGFyZW50ID0ge1xuICAgICAgICAgIG5hbWVzcGFjZVVSSTogTkFNRVNQQUNFLFxuICAgICAgICAgIHRhZ05hbWU6ICd0ZW1wbGF0ZSdcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShlbGVtZW50LnRhZ05hbWUpO1xuICAgICAgY29uc3QgcGFyZW50VGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKHBhcmVudC50YWdOYW1lKTtcbiAgICAgIGlmICghQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIFNWR1xuICAgICAgICAvLyBpcyB2aWEgPHN2Zz4uIElmIGl0IGhhcHBlbnMgdmlhIGFueSBvdGhlciB0YWcsIHRoZW5cbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGtpbGxlZC5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIE1hdGhNTCB0byBTVkcgaXMgdmlhYFxuICAgICAgICAvLyBzdmcgaWYgcGFyZW50IGlzIGVpdGhlciA8YW5ub3RhdGlvbi14bWw+IG9yIE1hdGhNTFxuICAgICAgICAvLyB0ZXh0IGludGVncmF0aW9uIHBvaW50cy5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2ZycgJiYgKHBhcmVudFRhZ05hbWUgPT09ICdhbm5vdGF0aW9uLXhtbCcgfHwgTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBTVkdcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBTVkcgbmFtZXNwYWNlLlxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBIVE1MIG5hbWVzcGFjZSB0byBNYXRoTUxcbiAgICAgICAgLy8gaXMgdmlhIDxtYXRoPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBNYXRoTUwgaXMgdmlhXG4gICAgICAgIC8vIDxtYXRoPiBhbmQgSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnICYmIEhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIE1hdGhNTFxuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIE1hdGhNTCBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9NQVRITUxfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gSFRNTCBpcyB2aWFcbiAgICAgICAgLy8gSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHMsIGFuZCBmcm9tIE1hdGhNTCB0byBIVE1MXG4gICAgICAgIC8vIGlzIHZpYSBNYXRoTUwgdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UgJiYgIUhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFICYmICFNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBkaXNhbGxvdyB0YWdzIHRoYXQgYXJlIHNwZWNpZmljIGZvciBNYXRoTUxcbiAgICAgICAgLy8gb3IgU1ZHIGFuZCBzaG91bGQgbmV2ZXIgYXBwZWFyIGluIEhUTUwgbmFtZXNwYWNlXG4gICAgICAgIHJldHVybiAhQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdICYmIChDT01NT05fU1ZHX0FORF9IVE1MX0VMRU1FTlRTW3RhZ05hbWVdIHx8ICFBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBGb3IgWEhUTUwgYW5kIFhNTCBkb2N1bWVudHMgdGhhdCBzdXBwb3J0IGN1c3RvbSBuYW1lc3BhY2VzXG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIEFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb2RlIHNob3VsZCBuZXZlciByZWFjaCB0aGlzIHBsYWNlICh0aGlzIG1lYW5zXG4gICAgICAvLyB0aGF0IHRoZSBlbGVtZW50IHNvbWVob3cgZ290IG5hbWVzcGFjZSB0aGF0IGlzIG5vdFxuICAgICAgLy8gSFRNTCwgU1ZHLCBNYXRoTUwgb3IgYWxsb3dlZCB2aWEgQUxMT1dFRF9OQU1FU1BBQ0VTKS5cbiAgICAgIC8vIFJldHVybiBmYWxzZSBqdXN0IGluIGNhc2UuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9mb3JjZVJlbW92ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2ZvcmNlUmVtb3ZlID0gZnVuY3Rpb24gX2ZvcmNlUmVtb3ZlKG5vZGUpIHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICBlbGVtZW50OiBub2RlXG4gICAgICB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1yZW1vdmVcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcmVtb3ZlQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgYW4gQXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfcmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBub2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG51bGwsXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXG4gICAgICAvLyBXZSB2b2lkIGF0dHJpYnV0ZSB2YWx1ZXMgZm9yIHVucmVtb3ZhYmxlIFwiaXNcIlwiIGF0dHJpYnV0ZXNcbiAgICAgIGlmIChuYW1lID09PSAnaXMnICYmICFBTExPV0VEX0FUVFJbbmFtZV0pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET00gfHwgUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBfZm9yY2VSZW1vdmUobm9kZSk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2luaXREb2N1bWVudFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBkaXJ0eSBhIHN0cmluZyBvZiBkaXJ0eSBtYXJrdXBcbiAgICAgKiBAcmV0dXJuIHtEb2N1bWVudH0gYSBET00sIGZpbGxlZCB3aXRoIHRoZSBkaXJ0eSBtYXJrdXBcbiAgICAgKi9cbiAgICBjb25zdCBfaW5pdERvY3VtZW50ID0gZnVuY3Rpb24gX2luaXREb2N1bWVudChkaXJ0eSkge1xuICAgICAgLyogQ3JlYXRlIGEgSFRNTCBkb2N1bWVudCAqL1xuICAgICAgbGV0IGRvYyA9IG51bGw7XG4gICAgICBsZXQgbGVhZGluZ1doaXRlc3BhY2UgPSBudWxsO1xuICAgICAgaWYgKEZPUkNFX0JPRFkpIHtcbiAgICAgICAgZGlydHkgPSAnPHJlbW92ZT48L3JlbW92ZT4nICsgZGlydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBJZiBGT1JDRV9CT0RZIGlzbid0IHVzZWQsIGxlYWRpbmcgd2hpdGVzcGFjZSBuZWVkcyB0byBiZSBwcmVzZXJ2ZWQgbWFudWFsbHkgKi9cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHN0cmluZ01hdGNoKGRpcnR5LCAvXltcXHJcXG5cXHQgXSsvKTtcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2UgPSBtYXRjaGVzICYmIG1hdGNoZXNbMF07XG4gICAgICB9XG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gUm9vdCBvZiBYSFRNTCBkb2MgbXVzdCBjb250YWluIHhtbG5zIGRlY2xhcmF0aW9uIChzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3hodG1sMS9ub3JtYXRpdmUuaHRtbCNzdHJpY3QpXG4gICAgICAgIGRpcnR5ID0gJzxodG1sIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPjxoZWFkPjwvaGVhZD48Ym9keT4nICsgZGlydHkgKyAnPC9ib2R5PjwvaHRtbD4nO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlydHlQYXlsb2FkID0gdHJ1c3RlZFR5cGVzUG9saWN5ID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XG4gICAgICAvKlxuICAgICAgICogVXNlIHRoZSBET01QYXJzZXIgQVBJIGJ5IGRlZmF1bHQsIGZhbGxiYWNrIGxhdGVyIGlmIG5lZWRzIGJlXG4gICAgICAgKiBET01QYXJzZXIgbm90IHdvcmsgZm9yIHN2ZyB3aGVuIGhhcyBtdWx0aXBsZSByb290IGVsZW1lbnQuXG4gICAgICAgKi9cbiAgICAgIGlmIChOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkaXJ0eVBheWxvYWQsIFBBUlNFUl9NRURJQV9UWVBFKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH1cblxuICAgICAgLyogVXNlIGNyZWF0ZUhUTUxEb2N1bWVudCBpbiBjYXNlIERPTVBhcnNlciBpcyBub3QgYXZhaWxhYmxlICovXG4gICAgICBpZiAoIWRvYyB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBkb2MgPSBpbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudChOQU1FU1BBQ0UsICd0ZW1wbGF0ZScsIG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gSVNfRU1QVFlfSU5QVVQgPyBlbXB0eUhUTUwgOiBkaXJ0eVBheWxvYWQ7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAvLyBTeW50YXggZXJyb3IgaWYgZGlydHlQYXlsb2FkIGlzIGludmFsaWQgeG1sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGJvZHkgPSBkb2MuYm9keSB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgaWYgKGRpcnR5ICYmIGxlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGJvZHkuaW5zZXJ0QmVmb3JlKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxlYWRpbmdXaGl0ZXNwYWNlKSwgYm9keS5jaGlsZE5vZGVzWzBdIHx8IG51bGwpO1xuICAgICAgfVxuXG4gICAgICAvKiBXb3JrIG9uIHdob2xlIGRvY3VtZW50IG9yIGp1c3QgaXRzIGJvZHkgKi9cbiAgICAgIGlmIChOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5VGFnTmFtZS5jYWxsKGRvYywgV0hPTEVfRE9DVU1FTlQgPyAnaHRtbCcgOiAnYm9keScpWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFdIT0xFX0RPQ1VNRU5UID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGJvZHk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBOb2RlSXRlcmF0b3Igb2JqZWN0IHRoYXQgeW91IGNhbiB1c2UgdG8gdHJhdmVyc2UgZmlsdGVyZWQgbGlzdHMgb2Ygbm9kZXMgb3IgZWxlbWVudHMgaW4gYSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IHJvb3QgVGhlIHJvb3QgZWxlbWVudCBvciBub2RlIHRvIHN0YXJ0IHRyYXZlcnNpbmcgb24uXG4gICAgICogQHJldHVybiB7Tm9kZUl0ZXJhdG9yfSBUaGUgY3JlYXRlZCBOb2RlSXRlcmF0b3JcbiAgICAgKi9cbiAgICBjb25zdCBfY3JlYXRlTm9kZUl0ZXJhdG9yID0gZnVuY3Rpb24gX2NyZWF0ZU5vZGVJdGVyYXRvcihyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm9kZUl0ZXJhdG9yLmNhbGwocm9vdC5vd25lckRvY3VtZW50IHx8IHJvb3QsIHJvb3QsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19URVhULCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQ2xvYmJlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBlbG0gZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBjbG9iYmVyZWQsIGZhbHNlIGlmIHNhZmVcbiAgICAgKi9cbiAgICBjb25zdCBfaXNDbG9iYmVyZWQgPSBmdW5jdGlvbiBfaXNDbG9iYmVyZWQoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50ICYmICh0eXBlb2YgZWxtLm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnJlbW92ZUNoaWxkICE9PSAnZnVuY3Rpb24nIHx8ICEoZWxtLmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uc2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0ubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLmluc2VydEJlZm9yZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLmhhc0NoaWxkTm9kZXMgIT09ICdmdW5jdGlvbicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGEgRE9NIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBvYmplY3Qgb2JqZWN0IHRvIGNoZWNrIHdoZXRoZXIgaXQncyBhIERPTSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpcyBvYmplY3QgaXMgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc05vZGUgPSBmdW5jdGlvbiBfaXNOb2RlKG9iamVjdCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBOb2RlID09PSAnZnVuY3Rpb24nICYmIG9iamVjdCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9leGVjdXRlSG9va1xuICAgICAqIEV4ZWN1dGUgdXNlciBjb25maWd1cmFibGUgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCAgTmFtZSBvZiB0aGUgaG9vaydzIGVudHJ5IHBvaW50XG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgbm9kZSB0byB3b3JrIG9uIHdpdGggdGhlIGhvb2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgYWRkaXRpb25hbCBob29rIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBjb25zdCBfZXhlY3V0ZUhvb2sgPSBmdW5jdGlvbiBfZXhlY3V0ZUhvb2soZW50cnlQb2ludCwgY3VycmVudE5vZGUsIGRhdGEpIHtcbiAgICAgIGlmICghaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBob29rID0+IHtcbiAgICAgICAgaG9vay5jYWxsKERPTVB1cmlmeSwgY3VycmVudE5vZGUsIGRhdGEsIENPTkZJRyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplRWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgdGV4dENvbnRlbnRcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVDaGlsZFxuICAgICAqXG4gICAgICogQHBhcmFtICAge05vZGV9IGN1cnJlbnROb2RlIHRvIGNoZWNrIGZvciBwZXJtaXNzaW9uIHRvIGV4aXN0XG4gICAgICogQHJldHVybiAge0Jvb2xlYW59IHRydWUgaWYgbm9kZSB3YXMga2lsbGVkLCBmYWxzZSBpZiBsZWZ0IGFsaXZlXG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplRWxlbWVudHMgPSBmdW5jdGlvbiBfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkge1xuICAgICAgbGV0IGNvbnRlbnQgPSBudWxsO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG5cbiAgICAgIC8qIENoZWNrIGlmIGVsZW1lbnQgaXMgY2xvYmJlcmVkIG9yIGNhbiBjbG9iYmVyICovXG4gICAgICBpZiAoX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogTm93IGxldCdzIGNoZWNrIHRoZSBlbGVtZW50J3MgdHlwZSBhbmQgbmFtZSAqL1xuICAgICAgY29uc3QgdGFnTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGN1cnJlbnROb2RlLm5vZGVOYW1lKTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVFbGVtZW50JywgY3VycmVudE5vZGUsIHtcbiAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgYWxsb3dlZFRhZ3M6IEFMTE9XRURfVEFHU1xuICAgICAgfSk7XG5cbiAgICAgIC8qIERldGVjdCBtWFNTIGF0dGVtcHRzIGFidXNpbmcgbmFtZXNwYWNlIGNvbmZ1c2lvbiAqL1xuICAgICAgaWYgKGN1cnJlbnROb2RlLmhhc0NoaWxkTm9kZXMoKSAmJiAhX2lzTm9kZShjdXJyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpICYmIHJlZ0V4cFRlc3QoLzxbL1xcd10vZywgY3VycmVudE5vZGUudGV4dENvbnRlbnQpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhIGN1c3RvbSBlbGVtZW50IHRvIGhhbmRsZSAqL1xuICAgICAgICBpZiAoIUZPUkJJRF9UQUdTW3RhZ05hbWVdICYmIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSkge1xuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHRhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBLZWVwIGNvbnRlbnQgZXhjZXB0IGZvciBiYWQtbGlzdGVkIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChLRUVQX0NPTlRFTlQgJiYgIUZPUkJJRF9DT05URU5UU1t0YWdOYW1lXSkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGN1cnJlbnROb2RlKSB8fCBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBnZXRDaGlsZE5vZGVzKGN1cnJlbnROb2RlKSB8fCBjdXJyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICAgIGlmIChjaGlsZE5vZGVzICYmIHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ291bnQgPSBjaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaGlsZENvdW50IC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVOb2RlKGNoaWxkTm9kZXNbaV0sIHRydWUpLCBnZXROZXh0U2libGluZyhjdXJyZW50Tm9kZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQ2hlY2sgd2hldGhlciBlbGVtZW50IGhhcyBhIHZhbGlkIG5hbWVzcGFjZSAqL1xuICAgICAgaWYgKGN1cnJlbnROb2RlIGluc3RhbmNlb2YgRWxlbWVudCAmJiAhX2NoZWNrVmFsaWROYW1lc3BhY2UoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBNYWtlIHN1cmUgdGhhdCBvbGRlciBicm93c2VycyBkb24ndCBnZXQgZmFsbGJhY2stdGFnIG1YU1MgKi9cbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ25vc2NyaXB0JyB8fCB0YWdOYW1lID09PSAnbm9lbWJlZCcgfHwgdGFnTmFtZSA9PT0gJ25vZnJhbWVzJykgJiYgcmVnRXhwVGVzdCgvPFxcL25vKHNjcmlwdHxlbWJlZHxmcmFtZXMpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGVsZW1lbnQgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIC8qIEdldCB0aGUgZWxlbWVudCdzIHRleHQgY29udGVudCAqL1xuICAgICAgICBjb250ZW50ID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgZXhwciA9PiB7XG4gICAgICAgICAgY29udGVudCA9IHN0cmluZ1JlcGxhY2UoY29udGVudCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS50ZXh0Q29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgICAgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjVGFnIExvd2VyY2FzZSB0YWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY05hbWUgTG93ZXJjYXNlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSB7XG4gICAgICAvKiBNYWtlIHN1cmUgYXR0cmlidXRlIGNhbm5vdCBjbG9iYmVyICovXG4gICAgICBpZiAoU0FOSVRJWkVfRE9NICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpICYmICh2YWx1ZSBpbiBkb2N1bWVudCB8fCB2YWx1ZSBpbiBmb3JtRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKiBBbGxvdyB2YWxpZCBkYXRhLSogYXR0cmlidXRlczogQXQgbGVhc3Qgb25lIGNoYXJhY3RlciBhZnRlciBcIi1cIlxuICAgICAgICAgIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9kb20uaHRtbCNlbWJlZGRpbmctY3VzdG9tLW5vbi12aXNpYmxlLWRhdGEtd2l0aC10aGUtZGF0YS0qLWF0dHJpYnV0ZXMpXG4gICAgICAgICAgWE1MLWNvbXBhdGlibGUgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjeG1sLWNvbXBhdGlibGUgYW5kIGh0dHA6Ly93d3cudzMub3JnL1RSL3htbC8jZDBlODA0KVxuICAgICAgICAgIFdlIGRvbid0IG5lZWQgdG8gY2hlY2sgdGhlIHZhbHVlOyBpdCdzIGFsd2F5cyBVUkkgc2FmZS4gKi9cbiAgICAgIGlmIChBTExPV19EQVRBX0FUVFIgJiYgIUZPUkJJRF9BVFRSW2xjTmFtZV0gJiYgcmVnRXhwVGVzdChEQVRBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoQUxMT1dfQVJJQV9BVFRSICYmIHJlZ0V4cFRlc3QoQVJJQV9BVFRSLCBsY05hbWUpKSA7IGVsc2UgaWYgKCFBTExPV0VEX0FUVFJbbGNOYW1lXSB8fCBGT1JCSURfQVRUUltsY05hbWVdKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgLy8gRmlyc3QgY29uZGl0aW9uIGRvZXMgYSB2ZXJ5IGJhc2ljIGNoZWNrIGlmIGEpIGl0J3MgYmFzaWNhbGx5IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgdGFnbmFtZSBBTkRcbiAgICAgICAgLy8gYikgaWYgdGhlIHRhZ05hbWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2tcbiAgICAgICAgLy8gYW5kIGMpIGlmIHRoZSBhdHRyaWJ1dGUgbmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVja1xuICAgICAgICBfaXNCYXNpY0N1c3RvbUVsZW1lbnQobGNUYWcpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIGxjVGFnKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sobGNUYWcpKSAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrLCBsY05hbWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayhsY05hbWUpKSB8fFxuICAgICAgICAvLyBBbHRlcm5hdGl2ZSwgc2Vjb25kIGNvbmRpdGlvbiBjaGVja3MgaWYgaXQncyBhbiBgaXNgLWF0dHJpYnV0ZSwgQU5EXG4gICAgICAgIC8vIHRoZSB2YWx1ZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICBsY05hbWUgPT09ICdpcycgJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHZhbHVlKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodmFsdWUpKSkgOyBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJDEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICgobGNOYW1lID09PSAnc3JjJyB8fCBsY05hbWUgPT09ICd4bGluazpocmVmJyB8fCBsY05hbWUgPT09ICdocmVmJykgJiYgbGNUYWcgIT09ICdzY3JpcHQnICYmIHN0cmluZ0luZGV4T2YodmFsdWUsICdkYXRhOicpID09PSAwICYmIERBVEFfVVJJX1RBR1NbbGNUYWddKSA7IGVsc2UgaWYgKEFMTE9XX1VOS05PV05fUFJPVE9DT0xTICYmICFyZWdFeHBUZXN0KElTX1NDUklQVF9PUl9EQVRBLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSkpIDsgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNCYXNpY0N1c3RvbUVsZW1lbnRcbiAgICAgKiBjaGVja3MgaWYgYXQgbGVhc3Qgb25lIGRhc2ggaXMgaW5jbHVkZWQgaW4gdGFnTmFtZSwgYW5kIGl0J3Mgbm90IHRoZSBmaXJzdCBjaGFyXG4gICAgICogZm9yIG1vcmUgc29waGlzdGljYXRlZCBjaGVja2luZyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy92YWxpZGF0ZS1lbGVtZW50LW5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIG5hbWUgb2YgdGhlIHRhZyBvZiB0aGUgbm9kZSB0byBzYW5pdGl6ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBuYW1lIG1lZXRzIHRoZSBiYXNpYyBjcml0ZXJpYSBmb3IgYSBjdXN0b20gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCA9IGZ1bmN0aW9uIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgICByZXR1cm4gdGFnTmFtZSAhPT0gJ2Fubm90YXRpb24teG1sJyAmJiB0YWdOYW1lLmluZGV4T2YoJy0nKSA+IDA7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZUF0dHJpYnV0ZXNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IGF0dHJpYnV0ZXNcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUF0dHJpYnV0ZVxuICAgICAqIEBwcm90ZWN0IHNldEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gc2FuaXRpemVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVBdHRyaWJ1dGVzID0gZnVuY3Rpb24gX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSkge1xuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGF0dHJpYnV0ZXNcbiAgICAgIH0gPSBjdXJyZW50Tm9kZTtcblxuICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhdHRyaWJ1dGVzOyBpZiBub3Qgd2UgbWlnaHQgaGF2ZSBhIHRleHQgbm9kZSAqL1xuICAgICAgaWYgKCFhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGhvb2tFdmVudCA9IHtcbiAgICAgICAgYXR0ck5hbWU6ICcnLFxuICAgICAgICBhdHRyVmFsdWU6ICcnLFxuICAgICAgICBrZWVwQXR0cjogdHJ1ZSxcbiAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXM6IEFMTE9XRURfQVRUUlxuICAgICAgfTtcbiAgICAgIGxldCBsID0gYXR0cmlidXRlcy5sZW5ndGg7XG5cbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXG4gICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBhdHRyaWJ1dGVzW2xdO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBuYW1lc3BhY2VVUkksXG4gICAgICAgICAgdmFsdWU6IGF0dHJWYWx1ZVxuICAgICAgICB9ID0gYXR0cjtcbiAgICAgICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMobmFtZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5hbWUgPT09ICd2YWx1ZScgPyBhdHRyVmFsdWUgOiBzdHJpbmdUcmltKGF0dHJWYWx1ZSk7XG5cbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgICBob29rRXZlbnQuYXR0ck5hbWUgPSBsY05hbWU7XG4gICAgICAgIGhvb2tFdmVudC5hdHRyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaG9va0V2ZW50LmtlZXBBdHRyID0gdHJ1ZTtcbiAgICAgICAgaG9va0V2ZW50LmZvcmNlS2VlcEF0dHIgPSB1bmRlZmluZWQ7IC8vIEFsbG93cyBkZXZlbG9wZXJzIHRvIHNlZSB0aGlzIGlzIGEgcHJvcGVydHkgdGhleSBjYW4gc2V0XG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplQXR0cmlidXRlJywgY3VycmVudE5vZGUsIGhvb2tFdmVudCk7XG4gICAgICAgIHZhbHVlID0gaG9va0V2ZW50LmF0dHJWYWx1ZTtcbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGlmIChob29rRXZlbnQuZm9yY2VLZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogUmVtb3ZlIGF0dHJpYnV0ZSAqL1xuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcblxuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKCFob29rRXZlbnQua2VlcEF0dHIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFdvcmsgYXJvdW5kIGEgc2VjdXJpdHkgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuICAgICAgICBpZiAoIUFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiAmJiByZWdFeHBUZXN0KC9cXC8+L2ksIHZhbHVlKSkge1xuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgZXhwciwgJyAnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIElzIGB2YWx1ZWAgdmFsaWQgZm9yIHRoaXMgYXR0cmlidXRlPyAqL1xuICAgICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKGN1cnJlbnROb2RlLm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKCFfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEZ1bGwgRE9NIENsb2JiZXJpbmcgcHJvdGVjdGlvbiB2aWEgbmFtZXNwYWNlIGlzb2xhdGlvbixcbiAgICAgICAgICogUHJlZml4IGlkIGFuZCBuYW1lIGF0dHJpYnV0ZXMgd2l0aCBgdXNlci1jb250ZW50LWBcbiAgICAgICAgICovXG4gICAgICAgIGlmIChTQU5JVElaRV9OQU1FRF9QUk9QUyAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSkge1xuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhpcyB2YWx1ZVxuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgICAgLy8gUHJlZml4IHRoZSB2YWx1ZSBhbmQgbGF0ZXIgcmUtY3JlYXRlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGUgc2FuaXRpemVkIHZhbHVlXG4gICAgICAgICAgdmFsdWUgPSBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggKyB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBhdHRyaWJ1dGVzIHRoYXQgcmVxdWlyZSBUcnVzdGVkIFR5cGVzICovXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgJiYgdHlwZW9mIHRydXN0ZWRUeXBlcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHRydXN0ZWRUeXBlcy5nZXRBdHRyaWJ1dGVUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkgOyBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUobGNUYWcsIGxjTmFtZSkpIHtcbiAgICAgICAgICAgICAgY2FzZSAnVHJ1c3RlZEhUTUwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkU2NyaXB0VVJMJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVTY3JpcHRVUkwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBGYWxsYmFjayB0byBzZXRBdHRyaWJ1dGUoKSBmb3IgYnJvd3Nlci11bnJlY29nbml6ZWQgbmFtZXNwYWNlcyBlLmcuIFwieC1zY2hlbWFcIi4gKi9cbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFycmF5UG9wKERPTVB1cmlmeS5yZW1vdmVkKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplU2hhZG93RE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudCB0byBpdGVyYXRlIG92ZXIgcmVjdXJzaXZlbHlcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcbiAgICAgIGxldCBzaGFkb3dOb2RlID0gbnVsbDtcbiAgICAgIGNvbnN0IHNoYWRvd0l0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihmcmFnbWVudCk7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgICB3aGlsZSAoc2hhZG93Tm9kZSA9IHNoYWRvd0l0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZVNoYWRvd05vZGUnLCBzaGFkb3dOb2RlLCBudWxsKTtcblxuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoc2hhZG93Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIERlZXAgc2hhZG93IERPTSBkZXRlY3RlZCAqL1xuICAgICAgICBpZiAoc2hhZG93Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShzaGFkb3dOb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoc2hhZG93Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2FuaXRpemVcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHByb3ZpZGluZyBjb3JlIHNhbml0YXRpb24gZnVuY3Rpb25hbGl0eVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZX0gZGlydHkgc3RyaW5nIG9yIERPTSBub2RlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBvYmplY3RcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIERPTVB1cmlmeS5zYW5pdGl6ZSA9IGZ1bmN0aW9uIChkaXJ0eSkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBsZXQgYm9keSA9IG51bGw7XG4gICAgICBsZXQgaW1wb3J0ZWROb2RlID0gbnVsbDtcbiAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICBsZXQgcmV0dXJuTm9kZSA9IG51bGw7XG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cbiAgICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgICB0aGUgdXNlciBoYXMgcmVxdWVzdGVkIGEgRE9NIG9iamVjdCByYXRoZXIgdGhhbiBhIHN0cmluZyAqL1xuICAgICAgSVNfRU1QVFlfSU5QVVQgPSAhZGlydHk7XG4gICAgICBpZiAoSVNfRU1QVFlfSU5QVVQpIHtcbiAgICAgICAgZGlydHkgPSAnPCEtLT4nO1xuICAgICAgfVxuXG4gICAgICAvKiBTdHJpbmdpZnksIGluIGNhc2UgZGlydHkgaXMgYW4gb2JqZWN0ICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJyAmJiAhX2lzTm9kZShkaXJ0eSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eS50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRpcnR5ID0gZGlydHkudG9TdHJpbmcoKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdkaXJ0eSBpcyBub3QgYSBzdHJpbmcsIGFib3J0aW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgndG9TdHJpbmcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBSZXR1cm4gZGlydHkgSFRNTCBpZiBET01QdXJpZnkgY2Fubm90IHJ1biAqL1xuICAgICAgaWYgKCFET01QdXJpZnkuaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cblxuICAgICAgLyogQ2xlYW4gdXAgcmVtb3ZlZCBlbGVtZW50cyAqL1xuICAgICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcblxuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgSU5fUExBQ0UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICAvKiBEbyBzb21lIGVhcmx5IHByZS1zYW5pdGl6YXRpb24gdG8gYXZvaWQgdW5zYWZlIHJvb3Qgbm9kZXMgKi9cbiAgICAgICAgaWYgKGRpcnR5Lm5vZGVOYW1lKSB7XG4gICAgICAgICAgY29uc3QgdGFnTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGRpcnR5Lm5vZGVOYW1lKTtcbiAgICAgICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdyb290IG5vZGUgaXMgZm9yYmlkZGVuIGFuZCBjYW5ub3QgYmUgc2FuaXRpemVkIGluLXBsYWNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAvKiBJZiBkaXJ0eSBpcyBhIERPTSBlbGVtZW50LCBhcHBlbmQgdG8gYW4gZW1wdHkgZG9jdW1lbnQgdG8gYXZvaWRcbiAgICAgICAgICAgZWxlbWVudHMgYmVpbmcgc3RyaXBwZWQgYnkgdGhlIHBhcnNlciAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xuICAgICAgICBpbXBvcnRlZE5vZGUgPSBib2R5Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkaXJ0eSwgdHJ1ZSk7XG4gICAgICAgIGlmIChpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IDEgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChpbXBvcnRlZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBFeGl0IGRpcmVjdGx5IGlmIHdlIGhhdmUgbm90aGluZyB0byBkbyAqL1xuICAgICAgICBpZiAoIVJFVFVSTl9ET00gJiYgIVNBRkVfRk9SX1RFTVBMQVRFUyAmJiAhV0hPTEVfRE9DVU1FTlQgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICAgIGRpcnR5LmluZGV4T2YoJzwnKSA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEluaXRpYWxpemUgdGhlIGRvY3VtZW50IHRvIHdvcmsgb24gKi9cbiAgICAgICAgYm9keSA9IF9pbml0RG9jdW1lbnQoZGlydHkpO1xuXG4gICAgICAgIC8qIENoZWNrIHdlIGhhdmUgYSBET00gbm9kZSBmcm9tIHRoZSBkYXRhICovXG4gICAgICAgIGlmICghYm9keSkge1xuICAgICAgICAgIHJldHVybiBSRVRVUk5fRE9NID8gbnVsbCA6IFJFVFVSTl9UUlVTVEVEX1RZUEUgPyBlbXB0eUhUTUwgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZmlyc3QgZWxlbWVudCBub2RlIChvdXJzKSBpZiBGT1JDRV9CT0RZIGlzIHNldCAqL1xuICAgICAgaWYgKGJvZHkgJiYgRk9SQ0VfQk9EWSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoYm9keS5maXJzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgLyogR2V0IG5vZGUgaXRlcmF0b3IgKi9cbiAgICAgIGNvbnN0IG5vZGVJdGVyYXRvciA9IF9jcmVhdGVOb2RlSXRlcmF0b3IoSU5fUExBQ0UgPyBkaXJ0eSA6IGJvZHkpO1xuXG4gICAgICAvKiBOb3cgc3RhcnQgaXRlcmF0aW5nIG92ZXIgdGhlIGNyZWF0ZWQgZG9jdW1lbnQgKi9cbiAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNoYWRvdyBET00gZGV0ZWN0ZWQsIHNhbml0aXplIGl0ICovXG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShjdXJyZW50Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBzYW5pdGl6ZWQgc3RyaW5nIG9yIERPTSAqL1xuICAgICAgaWYgKFJFVFVSTl9ET00pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gY3JlYXRlRG9jdW1lbnRGcmFnbWVudC5jYWxsKGJvZHkub3duZXJEb2N1bWVudCk7XG4gICAgICAgICAgd2hpbGUgKGJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLWFwcGVuZFxuICAgICAgICAgICAgcmV0dXJuTm9kZS5hcHBlbmRDaGlsZChib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3QgfHwgQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3Rtb2RlKSB7XG4gICAgICAgICAgLypcbiAgICAgICAgICAgIEFkb3B0Tm9kZSgpIGlzIG5vdCB1c2VkIGJlY2F1c2UgaW50ZXJuYWwgc3RhdGUgaXMgbm90IHJlc2V0XG4gICAgICAgICAgICAoZS5nLiB0aGUgcGFzdCBuYW1lcyBtYXAgb2YgYSBIVE1MRm9ybUVsZW1lbnQpLCB0aGlzIGlzIHNhZmVcbiAgICAgICAgICAgIGluIHRoZW9yeSBidXQgd2Ugd291bGQgcmF0aGVyIG5vdCByaXNrIGFub3RoZXIgYXR0YWNrIHZlY3Rvci5cbiAgICAgICAgICAgIFRoZSBzdGF0ZSB0aGF0IGlzIGNsb25lZCBieSBpbXBvcnROb2RlKCkgaXMgZXhwbGljaXRseSBkZWZpbmVkXG4gICAgICAgICAgICBieSB0aGUgc3BlY3MuXG4gICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm5Ob2RlID0gaW1wb3J0Tm9kZS5jYWxsKG9yaWdpbmFsRG9jdW1lbnQsIHJldHVybk5vZGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5Ob2RlO1xuICAgICAgfVxuICAgICAgbGV0IHNlcmlhbGl6ZWRIVE1MID0gV0hPTEVfRE9DVU1FTlQgPyBib2R5Lm91dGVySFRNTCA6IGJvZHkuaW5uZXJIVE1MO1xuXG4gICAgICAvKiBTZXJpYWxpemUgZG9jdHlwZSBpZiBhbGxvd2VkICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQgJiYgQUxMT1dFRF9UQUdTWychZG9jdHlwZSddICYmIGJvZHkub3duZXJEb2N1bWVudCAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZSAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lICYmIHJlZ0V4cFRlc3QoRE9DVFlQRV9OQU1FLCBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lKSkge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9ICc8IURPQ1RZUEUgJyArIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgKyAnPlxcbicgKyBzZXJpYWxpemVkSFRNTDtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZmluYWwgc3RyaW5nIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIGV4cHIsICcgJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoc2VyaWFsaXplZEhUTUwpIDogc2VyaWFsaXplZEhUTUw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gc2V0IHRoZSBjb25maWd1cmF0aW9uIG9uY2VcbiAgICAgKiBzZXRDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkuc2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIFNFVF9DT05GSUcgPSB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSB0aGUgY29uZmlndXJhdGlvblxuICAgICAqIGNsZWFyQ29uZmlnXG4gICAgICpcbiAgICAgKi9cbiAgICBET01QdXJpZnkuY2xlYXJDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBDT05GSUcgPSBudWxsO1xuICAgICAgU0VUX0NPTkZJRyA9IGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNoZWNrIGlmIGFuIGF0dHJpYnV0ZSB2YWx1ZSBpcyB2YWxpZC5cbiAgICAgKiBVc2VzIGxhc3Qgc2V0IGNvbmZpZywgaWYgYW55LiBPdGhlcndpc2UsIHVzZXMgY29uZmlnIGRlZmF1bHRzLlxuICAgICAqIGlzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdGFnIFRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGF0dHIgQXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQuIE90aGVyd2lzZSwgcmV0dXJucyBmYWxzZS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHIsIHZhbHVlKSB7XG4gICAgICAvKiBJbml0aWFsaXplIHNoYXJlZCBjb25maWcgdmFycyBpZiBuZWNlc3NhcnkuICovXG4gICAgICBpZiAoIUNPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoe30pO1xuICAgICAgfVxuICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyh0YWcpO1xuICAgICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoYXR0cik7XG4gICAgICByZXR1cm4gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKi9cbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2YgaG9va0Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gaG9va3NbZW50cnlQb2ludF0gfHwgW107XG4gICAgICBhcnJheVB1c2goaG9va3NbZW50cnlQb2ludF0sIGhvb2tGdW5jdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhIERPTVB1cmlmeSBob29rIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqIChwb3BzIGl0IGZyb20gdGhlIHN0YWNrIG9mIGhvb2tzIGlmIG1vcmUgYXJlIHByZXNlbnQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IHJlbW92ZWQocG9wcGVkKSBob29rXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2sgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybiBhcnJheVBvcChob29rc1tlbnRyeVBvaW50XSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rcyBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2tzIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rcyA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlQWxsSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUFsbEhvb2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaG9va3MgPSB7fTtcbiAgICB9O1xuICAgIHJldHVybiBET01QdXJpZnk7XG4gIH1cbiAgdmFyIHB1cmlmeSA9IGNyZWF0ZURPTVB1cmlmeSgpO1xuXG4gIHJldHVybiBwdXJpZnk7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1cmlmeS5qcy5tYXBcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXHJcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xyXG5pbXBvcnQgX3RtcGwgZnJvbSAnLi90ZW1wbGF0ZXMuanMnO1xyXG5pbXBvcnQgRW1sRWRpdG9yIGZyb20gJy4vZW1sRWRpdG9yJztcclxuXHJcbi8qKlxyXG4gKiBGaXhlcyBhIGJ1ZyBpbiBGRiB3aGVyZSBpdCBzb21ldGltZXMgd3JhcHNcclxuICogbmV3IGxpbmVzIGluIHRoZWlyIG93biBsaXN0IGl0ZW0uXHJcbiAqIFNlZSBpc3N1ZSAjMzU5XHJcbiAqL1xyXG5mdW5jdGlvbiBmaXhGaXJlZm94TGlzdEJ1ZyhlZGl0b3I6IEVtbEVkaXRvcikge1xyXG5cdC8vIE9ubHkgYXBwbHkgdG8gRmlyZWZveCBhcyB3aWxsIGJyZWFrIG90aGVyIGJyb3dzZXJzLlxyXG5cdGlmICgnbW96SGlkZGVuJyBpbiBkb2N1bWVudCkge1xyXG5cdFx0bGV0IG5vZGUgPSBlZGl0b3IuZ2V0Qm9keSgpO1xyXG5cdFx0bGV0IG5leHQ7XHJcblxyXG5cdFx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdFx0bmV4dCA9IG5vZGU7XHJcblxyXG5cdFx0XHRpZiAobmV4dC5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0bmV4dCA9IG5leHQuZmlyc3RDaGlsZDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0d2hpbGUgKG5leHQgJiYgIW5leHQubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0XHRcdG5leHQgPSBuZXh0LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAobmV4dCkge1xyXG5cdFx0XHRcdFx0bmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAvW1xcblxcclxcdF0rLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkge1xyXG5cdFx0XHRcdC8vIE9ubHkgcmVtb3ZlIGlmIG5ld2xpbmVzIGFyZSBjb2xsYXBzZWRcclxuXHRcdFx0XHRpZiAoIS9ecHJlLy50ZXN0KGRvbS5jc3Mobm9kZS5wYXJlbnROb2RlLCAnd2hpdGVTcGFjZScpKSkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5vZGUgPSBuZXh0IGFzIGFueTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTWFwIG9mIGFsbCB0aGUgY29tbWFuZHMgZm9yIEVtbEVkaXRvclxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAbmFtZSBjb21tYW5kc1xyXG4gKi9cclxudmFyIGRlZmF1bHRDbWRzOiBhbnkgPSB7XHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJvbGRcclxuXHRib2xkOiB7XHJcblx0XHRleGVjOiAnYm9sZCcsXHJcblx0XHR0b29sdGlwOiAnQm9sZCcsXHJcblx0XHRzaG9ydGN1dDogJ0N0cmwrQidcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSXRhbGljXHJcblx0aXRhbGljOiB7XHJcblx0XHRleGVjOiAnaXRhbGljJyxcclxuXHRcdHRvb2x0aXA6ICdJdGFsaWMnLFxyXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0knXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVuZGVybGluZVxyXG5cdHVuZGVybGluZToge1xyXG5cdFx0ZXhlYzogJ3VuZGVybGluZScsXHJcblx0XHR0b29sdGlwOiAnVW5kZXJsaW5lJyxcclxuXHRcdHNob3J0Y3V0OiAnQ3RybCtVJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdHJpa2V0aHJvdWdoXHJcblx0c3RyaWtlOiB7XHJcblx0XHRleGVjOiAnc3RyaWtldGhyb3VnaCcsXHJcblx0XHR0b29sdGlwOiAnU3RyaWtldGhyb3VnaCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogU3Vic2NyaXB0XHJcblx0c3Vic2NyaXB0OiB7XHJcblx0XHRleGVjOiAnc3Vic2NyaXB0JyxcclxuXHRcdHRvb2x0aXA6ICdTdWJzY3JpcHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1cGVyc2NyaXB0XHJcblx0c3VwZXJzY3JpcHQ6IHtcclxuXHRcdGV4ZWM6ICdzdXBlcnNjcmlwdCcsXHJcblx0XHR0b29sdGlwOiAnU3VwZXJzY3JpcHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBMZWZ0XHJcblx0bGVmdDoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHR2YXIgaXNMdHIgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cic7XHJcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XHJcblxyXG5cdFx0XHRcdC8vIENhbiBiZSAtbW96LWxlZnRcclxuXHRcdFx0XHRyZXR1cm4gL2xlZnQvLnRlc3QoYWxpZ24pIHx8XHJcblx0XHRcdFx0XHRhbGlnbiA9PT0gKGlzTHRyID8gJ3N0YXJ0JyA6ICdlbmQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGV4ZWM6ICdqdXN0aWZ5bGVmdCcsXHJcblx0XHR0b29sdGlwOiAnQWxpZ24gbGVmdCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogQ2VudHJlXHJcblx0Y2VudGVyOiB7XHJcblx0XHRleGVjOiAnanVzdGlmeWNlbnRlcicsXHJcblx0XHR0b29sdGlwOiAnQ2VudGVyJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBSaWdodFxyXG5cdHJpZ2h0OiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IDMpIHtcclxuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcclxuXHRcdFx0XHR2YXIgYWxpZ24gPSBkb20uY3NzKG5vZGUsICd0ZXh0QWxpZ24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otcmlnaHRcclxuXHRcdFx0XHRyZXR1cm4gL3JpZ2h0Ly50ZXN0KGFsaWduKSB8fFxyXG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdlbmQnIDogJ3N0YXJ0Jyk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRleGVjOiAnanVzdGlmeXJpZ2h0JyxcclxuXHRcdHRvb2x0aXA6ICdBbGlnbiByaWdodCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSnVzdGlmeVxyXG5cdGp1c3RpZnk6IHtcclxuXHRcdGV4ZWM6ICdqdXN0aWZ5ZnVsbCcsXHJcblx0XHR0b29sdGlwOiAnSnVzdGlmeSdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEZvbnRcclxuXHRmb250OiB7XHJcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3I6IEVtbEVkaXRvciwgY2FsbGVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChzdHI6IHN0cmluZykgPT4gYW55KSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2ZvbnQnKSk7XHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5lZGl0b3JPcHRpb25zLmZvbnRzLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoZm9udDogYW55KSB7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdmb250T3B0Jywge1xyXG5cdFx0XHRcdFx0Zm9udDogZm9udFxyXG5cdFx0XHRcdH0sIHRydWUpKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udC1waWNrZXInLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmZvbnQuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoZm9udE5hbWU6IHN0cmluZykge1xyXG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udG5hbWUnLCBmb250TmFtZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdGb250IE5hbWUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNpemVcclxuXHRzaXplOiB7XHJcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3I6IEVtbEVkaXRvciwgY2FsbGVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChzdHI6IHN0cmluZykgPT4gYW55KSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ3NpemUnKSk7XHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IDc7IGkrKykge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnc2l6ZU9wdCcsIHtcclxuXHRcdFx0XHRcdHNpemU6IGlcclxuXHRcdFx0XHR9LCB0cnVlKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdmb250c2l6ZS1waWNrZXInLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLnNpemUuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoZm9udFNpemU6IHN0cmluZykge1xyXG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udHNpemUnLCBmb250U2l6ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdGb250IFNpemUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvbG91clxyXG5cdGNvbG9yOiB7XHJcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3I6IEVtbEVkaXRvciwgY2FsbGVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChzdHI6IHN0cmluZykgPT4gYW55KSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHR2YXIgaHRtbCA9ICcnO1xyXG5cdFx0XHR2YXIgY21kID0gZGVmYXVsdENtZHMuY29sb3I7XHJcblxyXG5cdFx0XHRpZiAoIWNtZC5faHRtbENhY2hlKSB7XHJcblx0XHRcdFx0ZWRpdG9yLmVkaXRvck9wdGlvbnMuY29sb3JzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uOiBzdHJpbmcpIHtcclxuXHRcdFx0XHRcdGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJlbWxlZGl0b3ItY29sb3ItY29sdW1uXCI+JztcclxuXHJcblx0XHRcdFx0XHRjb2x1bW4uc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChjb2xvcjogc3RyaW5nKSB7XHJcblx0XHRcdFx0XHRcdGh0bWwgKz1cclxuXHRcdFx0XHRcdFx0XHQnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImVtbGVkaXRvci1jb2xvci1vcHRpb25cIicgK1xyXG5cdFx0XHRcdFx0XHRcdCcgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnICsgY29sb3IgKyAnXCInICtcclxuXHRcdFx0XHRcdFx0XHQnIGRhdGEtY29sb3I9XCInICsgY29sb3IgKyAnXCI+PC9hPic7XHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRodG1sICs9ICc8L2Rpdj4nO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRjbWQuX2h0bWxDYWNoZSA9IGh0bWw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBkb20ucGFyc2VIVE1MKGNtZC5faHRtbENhY2hlKSk7XHJcblxyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZTogRXZlbnQpIHtcclxuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnY29sb3InKSk7XHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdjb2xvci1waWNrZXInLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmNvbG9yLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGNvbG9yOiBzdHJpbmcpIHtcclxuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvcmVjb2xvcicsIGNvbG9yKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0ZvbnQgQ29sb3InXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJlbW92ZSBGb3JtYXRcclxuXHRyZW1vdmVmb3JtYXQ6IHtcclxuXHRcdGV4ZWM6ICdyZW1vdmVmb3JtYXQnLFxyXG5cdFx0dG9vbHRpcDogJ1JlbW92ZSBGb3JtYXR0aW5nJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogQ3V0XHJcblx0Y3V0OiB7XHJcblx0XHRleGVjOiAnY3V0JyxcclxuXHRcdHRvb2x0aXA6ICdDdXQnLFxyXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjdXQgY29tbWFuZC4gJyArXHJcblx0XHRcdCdQbGVhc2UgdXNlIHRoZSBrZXlib2FyZCBzaG9ydGN1dCBDdHJsL0NtZC1YJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb3B5XHJcblx0Y29weToge1xyXG5cdFx0ZXhlYzogJ2NvcHknLFxyXG5cdFx0dG9vbHRpcDogJ0NvcHknLFxyXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjb3B5IGNvbW1hbmQuICcgK1xyXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtQydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGVcclxuXHRwYXN0ZToge1xyXG5cdFx0ZXhlYzogJ3Bhc3RlJyxcclxuXHRcdHRvb2x0aXA6ICdQYXN0ZScsXHJcblx0XHRlcnJvck1lc3NhZ2U6ICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgYWxsb3cgdGhlIHBhc3RlIGNvbW1hbmQuICcgK1xyXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtVidcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGUgVGV4dFxyXG5cdHBhc3RldGV4dDoge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dmFyIHZhbCxcclxuXHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdGVkaXRvciA9IHRoaXM7XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3Bhc3RldGV4dCcsIHtcclxuXHRcdFx0XHRsYWJlbDogZWRpdG9yLnRyYW5zbGF0ZShcclxuXHRcdFx0XHRcdCdQYXN0ZSB5b3VyIHRleHQgaW5zaWRlIHRoZSBmb2xsb3dpbmcgYm94OidcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0JylcclxuXHRcdFx0fSwgdHJ1ZSkpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0dmFsID0gKGRvbS5maW5kKGNvbnRlbnQsICcjdHh0JylbMF0gYXMgSFRNTFRleHRBcmVhRWxlbWVudCkudmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dCh2YWwpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdwYXN0ZXRleHQnLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnUGFzdGUgVGV4dCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogQnVsbGV0IExpc3RcclxuXHRidWxsZXRsaXN0OiB7XHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGZpeEZpcmVmb3hMaXN0QnVnKHRoaXMpO1xyXG5cdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdpbnNlcnR1bm9yZGVyZWRsaXN0Jyk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0J1bGxldCBsaXN0J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBPcmRlcmVkIExpc3RcclxuXHRvcmRlcmVkbGlzdDoge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcclxuXHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnaW5zZXJ0b3JkZXJlZGxpc3QnKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnTnVtYmVyZWQgbGlzdCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSW5kZW50XHJcblx0aW5kZW50OiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudDogYW55LCBmaXJzdEJsb2NrOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHQvLyBPbmx5IHdvcmtzIHdpdGggbGlzdHMsIGZvciBub3dcclxuXHRcdFx0dmFyIHJhbmdlLCBzdGFydFBhcmVudCwgZW5kUGFyZW50O1xyXG5cclxuXHRcdFx0aWYgKGRvbS5pcyhmaXJzdEJsb2NrLCAnbGknKSkge1xyXG5cdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICd1bCxvbCxtZW51JykpIHtcclxuXHRcdFx0XHQvLyBpZiB0aGUgd2hvbGUgbGlzdCBpcyBzZWxlY3RlZCwgdGhlbiB0aGlzIG11c3QgYmVcclxuXHRcdFx0XHQvLyBpbnZhbGlkYXRlZCBiZWNhdXNlIHRoZSBicm93c2VyIHdpbGwgcGxhY2UgYVxyXG5cdFx0XHRcdC8vIDxibG9ja3F1b3RlPiB0aGVyZVxyXG5cdFx0XHRcdHJhbmdlID0gdGhpcy5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0c3RhcnRQYXJlbnQgPSByYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdGVuZFBhcmVudCA9IHJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0XHQvLyBUT0RPOiBjb3VsZCB1c2Ugbm9kZVR5cGUgZm9yIHRoaXM/XHJcblx0XHRcdFx0Ly8gTWF5YmUganVzdCBjaGVjayB0aGUgZmlyc3RCbG9jayBjb250YWlucyBib3RoIHRoZSBzdGFydFxyXG5cdFx0XHRcdC8vYW5kIGVuZCBjb250YWluZXJzXHJcblxyXG5cdFx0XHRcdC8vIFNlbGVjdCB0aGUgdGFnLCBub3QgdGhlIHRleHROb2RlXHJcblx0XHRcdFx0Ly8gKHRoYXQncyB3aHkgdGhlIHBhcmVudE5vZGUpXHJcblx0XHRcdFx0aWYgKHN0YXJ0UGFyZW50ICE9PVxyXG5cdFx0XHRcdFx0c3RhcnRQYXJlbnQucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCB8fFxyXG5cdFx0XHRcdFx0Ly8gd29yayBhcm91bmQgYSBidWcgaW4gRkZcclxuXHRcdFx0XHRcdChkb20uaXMoZW5kUGFyZW50LCAnbGknKSAmJiBlbmRQYXJlbnQgIT09XHJcblx0XHRcdFx0XHRcdGVuZFBhcmVudC5wYXJlbnROb2RlLmxhc3RFbGVtZW50Q2hpbGQpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAtMTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzLFxyXG5cdFx0XHRcdGJsb2NrID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHQvLyBBbiBpbmRlbnQgc3lzdGVtIGlzIHF1aXRlIGNvbXBsaWNhdGVkIGFzIHRoZXJlIGFyZSBsb2Fkc1xyXG5cdFx0XHQvLyBvZiBjb21wbGljYXRpb25zIGFuZCBpc3N1ZXMgYXJvdW5kIGhvdyB0byBpbmRlbnQgdGV4dFxyXG5cdFx0XHQvLyBBcyBkZWZhdWx0LCBsZXQncyBqdXN0IHN0YXkgd2l0aCBpbmRlbnRpbmcgdGhlIGxpc3RzLFxyXG5cdFx0XHQvLyBhdCBsZWFzdCwgZm9yIG5vdy5cclxuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGJsb2NrLCAndWwsb2wsbWVudScpKSB7XHJcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdpbmRlbnQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdBZGQgaW5kZW50J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBPdXRkZW50XHJcblx0b3V0ZGVudDoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzOiBhbnksIGZpcnN0QmxvY2s6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdChmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpID8gMCA6IC0xO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGJsb2NrID0gdGhpcy5nZXRSYW5nZUhlbHBlcigpLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGJsb2NrLCAndWwsb2wsbWVudScpKSB7XHJcblx0XHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnb3V0ZGVudCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ1JlbW92ZSBvbmUgaW5kZW50J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogVGFibGVcclxuXHR0YWJsZToge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMsXHJcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgndGFibGUnLCB7XHJcblx0XHRcdFx0cm93czogZWRpdG9yLnRyYW5zbGF0ZSgnUm93czonKSxcclxuXHRcdFx0XHRjb2xzOiBlZGl0b3IudHJhbnNsYXRlKCdDb2xzOicpLFxyXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0JylcclxuXHRcdFx0fSwgdHJ1ZSkpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0dmFyIHJvd3MgPSBOdW1iZXIoKGRvbS5maW5kKGNvbnRlbnQsICcjcm93cycpWzBdIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbHVlKSxcclxuXHRcdFx0XHRcdGNvbHMgPSBOdW1iZXIoKGRvbS5maW5kKGNvbnRlbnQsICcjY29scycpWzBdIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQpLnZhbHVlKSxcclxuXHRcdFx0XHRcdGh0bWwgPSAnPHRhYmxlPic7XHJcblxyXG5cdFx0XHRcdGlmIChyb3dzID4gMCAmJiBjb2xzID4gMCkge1xyXG5cdFx0XHRcdFx0aHRtbCArPSBBcnJheShyb3dzICsgMSkuam9pbihcclxuXHRcdFx0XHRcdFx0Jzx0cj4nICtcclxuXHRcdFx0XHRcdFx0QXJyYXkoY29scyArIDEpLmpvaW4oXHJcblx0XHRcdFx0XHRcdFx0Jzx0ZD48YnIgLz48L3RkPidcclxuXHRcdFx0XHRcdFx0KSArXHJcblx0XHRcdFx0XHRcdCc8L3RyPidcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0aHRtbCArPSAnPC90YWJsZT4nO1xyXG5cclxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChodG1sKTtcclxuXHRcdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0dGFibGUnLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgdGFibGUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBIb3Jpem9udGFsIFJ1bGVcclxuXHRob3Jpem9udGFscnVsZToge1xyXG5cdFx0ZXhlYzogJ2luc2VydGhvcml6b250YWxydWxlJyxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBob3Jpem9udGFsIHJ1bGUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2RlXHJcblx0Y29kZToge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRcdCc8Y29kZT4nLFxyXG5cdFx0XHRcdCc8YnIgLz48L2NvZGU+J1xyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdDb2RlJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSW1hZ2VcclxuXHRpbWFnZToge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yOiBFbWxFZGl0b3IsIGNhbGxlcjogSFRNTEVsZW1lbnQsIHNlbGVjdGVkOiBhbnksIGNhbGxiYWNrOiAoaW5wdXRWYWw6IHN0cmluZywgd2lkdGhWYWw6IHN0cmluZywgaGVpZ2h0VmFsOiBzdHJpbmcpID0+IHZvaWQpIHtcclxuXHRcdFx0dmFyIGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2ltYWdlJywge1xyXG5cdFx0XHRcdHVybDogZWRpdG9yLnRyYW5zbGF0ZSgnVVJMOicpLFxyXG5cdFx0XHRcdHdpZHRoOiBlZGl0b3IudHJhbnNsYXRlKCdXaWR0aCAob3B0aW9uYWwpOicpLFxyXG5cdFx0XHRcdGhlaWdodDogZWRpdG9yLnRyYW5zbGF0ZSgnSGVpZ2h0IChvcHRpb25hbCk6JyksXHJcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cclxuXHRcdFx0dmFyIHVybElucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNpbWFnZScpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG5cdFx0XHR1cmxJbnB1dC52YWx1ZSA9IHNlbGVjdGVkO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0aWYgKHVybElucHV0LnZhbHVlKSB7XHJcblx0XHRcdFx0XHRjYWxsYmFjayhcclxuXHRcdFx0XHRcdFx0dXJsSW5wdXQudmFsdWUsXHJcblx0XHRcdFx0XHRcdChkb20uZmluZChjb250ZW50LCAnI3dpZHRoJylbMF0gYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUsXHJcblx0XHRcdFx0XHRcdChkb20uZmluZChjb250ZW50LCAnI2hlaWdodCcpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRpbWFnZScsIGNvbnRlbnQpO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXI6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xyXG5cclxuXHRcdFx0ZGVmYXVsdENtZHMuaW1hZ2UuX2Ryb3BEb3duKFxyXG5cdFx0XHRcdGVkaXRvcixcclxuXHRcdFx0XHRjYWxsZXIsXHJcblx0XHRcdFx0JycsXHJcblx0XHRcdFx0ZnVuY3Rpb24gKHVybDogc3RyaW5nLCB3aWR0aD86IHN0cmluZywgaGVpZ2h0Pzogc3RyaW5nKSB7XHJcblx0XHRcdFx0XHR2YXIgYXR0cnMgPSAnJztcclxuXHJcblx0XHRcdFx0XHRpZiAod2lkdGgpIHtcclxuXHRcdFx0XHRcdFx0YXR0cnMgKz0gJyB3aWR0aD1cIicgKyBwYXJzZUludCh3aWR0aCwgMTApICsgJ1wiJztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoaGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRcdGF0dHJzICs9ICcgaGVpZ2h0PVwiJyArIHBhcnNlSW50KGhlaWdodCwgMTApICsgJ1wiJztcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhdHRycyArPSAnIHNyYz1cIicgKyBlc2NhcGUuZW50aXRpZXModXJsKSArICdcIic7XHJcblxyXG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRcdFx0XHQnPGltZycgKyBhdHRycyArICcgLz4nXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGltYWdlJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogRS1tYWlsXHJcblx0ZW1haWw6IHtcclxuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvcjogRW1sRWRpdG9yLCBjYWxsZXI6IEhUTUxFbGVtZW50LCBjYWxsYmFjazogKGVtYWlsOiBzdHJpbmcsIGRlczogc3RyaW5nKSA9PiB2b2lkKSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdlbWFpbCcsIHtcclxuXHRcdFx0XHRsYWJlbDogZWRpdG9yLnRyYW5zbGF0ZSgnRS1tYWlsOicpLFxyXG5cdFx0XHRcdGRlc2M6IGVkaXRvci50cmFuc2xhdGUoJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXHJcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZTogRXZlbnQpIHtcclxuXHRcdFx0XHRsZXQgZW1haWw6IHN0cmluZyA9IChkb20uZmluZChjb250ZW50LCAnI2VtYWlsJylbMF0gYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmIChlbWFpbCkge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2soZW1haWwsIChkb20uZmluZChjb250ZW50LCAnI2RlcycpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0ZW1haWwnLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmVtYWlsLl9kcm9wRG93bihcclxuXHRcdFx0XHRlZGl0b3IsXHJcblx0XHRcdFx0Y2FsbGVyLFxyXG5cdFx0XHRcdGZ1bmN0aW9uIChlbWFpbDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcclxuXHRcdFx0XHRcdGlmICghZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuc2VsZWN0ZWRIdG1sKCkgfHwgdGV4dCkge1xyXG5cdFx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXHJcblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICtcclxuXHRcdFx0XHRcdFx0XHQnbWFpbHRvOicgKyBlc2NhcGUuZW50aXRpZXMoZW1haWwpICsgJ1wiPicgK1xyXG5cdFx0XHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcygodGV4dCB8fCBlbWFpbCkpICtcclxuXHRcdFx0XHRcdFx0XHQnPC9hPidcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsICdtYWlsdG86JyArIGVtYWlsKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBlbWFpbCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IExpbmtcclxuXHRsaW5rOiB7XHJcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3I6IEVtbEVkaXRvciwgY2FsbGVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChsaW5rOiBzdHJpbmcsIHZhbDogc3RyaW5nKSA9PiB2b2lkKSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdsaW5rJywge1xyXG5cdFx0XHRcdHVybDogZWRpdG9yLnRyYW5zbGF0ZSgnVVJMOicpLFxyXG5cdFx0XHRcdGRlc2M6IGVkaXRvci50cmFuc2xhdGUoJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXHJcblx0XHRcdFx0aW5zOiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cdFx0XHR2YXIgbGlua0lucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNsaW5rJylbMF0gYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHRcdFx0dmFyIGRlc0lucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNkZXMnKVswXSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuXHRcdFx0ZnVuY3Rpb24gaW5zZXJ0VXJsKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0aWYgKGxpbmtJbnB1dC52YWx1ZSkge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2sobGlua0lucHV0LnZhbHVlLCBkZXNJbnB1dC52YWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGluc2VydFVybCk7XHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAna2V5cHJlc3MnLCBudWxsLCBmdW5jdGlvbiAoZTogS2V5Ym9hcmRFdmVudCkge1xyXG5cdFx0XHRcdC8vIDEzID0gZW50ZXIga2V5XHJcblx0XHRcdFx0aWYgKGUud2hpY2ggPT09IDEzICYmIGxpbmtJbnB1dC52YWx1ZSkge1xyXG5cdFx0XHRcdFx0aW5zZXJ0VXJsKGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGxpbmsnLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmxpbmsuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAodXJsOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xyXG5cdFx0XHRcdGlmICh0ZXh0IHx8ICFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSkge1xyXG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRcdFx0XHQnPGEgaHJlZj1cIicgKyBlc2NhcGUuZW50aXRpZXModXJsKSArICdcIj4nICtcclxuXHRcdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKHRleHQgfHwgdXJsKSArXHJcblx0XHRcdFx0XHRcdCc8L2E+J1xyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgdXJsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBsaW5rJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogVW5saW5rXHJcblx0dW5saW5rOiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLmNsb3Nlc3QodGhpcy5DdXJyZW50Tm9kZSgpLCAnYScpID8gMCA6IC0xO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGFuY2hvciA9IGRvbS5jbG9zZXN0KHRoaXMuQ3VycmVudE5vZGUoKSwgJ2EnKTtcclxuXHJcblx0XHRcdGlmIChhbmNob3IpIHtcclxuXHRcdFx0XHR3aGlsZSAoYW5jaG9yLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoYW5jaG9yLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQsIGFuY2hvcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20ucmVtb3ZlKGFuY2hvcik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnVW5saW5rJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFF1b3RlXHJcblx0cXVvdGU6IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXI6IEhUTUxFbGVtZW50LCBodG1sOiBzdHJpbmcsIGF1dGhvcjogc3RyaW5nKSB7XHJcblx0XHRcdHZhciBiZWZvcmUgPSAnPGJsb2NrcXVvdGU+JyxcclxuXHRcdFx0XHRlbmQgPSAnPC9ibG9ja3F1b3RlPic7XHJcblxyXG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBIVE1MIHBhc3NlZCBzZXQgZW5kIHRvIG51bGwgc28gYW55IHNlbGVjdGVkXHJcblx0XHRcdC8vIHRleHQgaXMgcmVwbGFjZWRcclxuXHRcdFx0aWYgKGh0bWwpIHtcclxuXHRcdFx0XHRhdXRob3IgPSAoYXV0aG9yID8gJzxjaXRlPicgK1xyXG5cdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKGF1dGhvcikgK1xyXG5cdFx0XHRcdFx0JzwvY2l0ZT4nIDogJycpO1xyXG5cdFx0XHRcdGJlZm9yZSA9IGJlZm9yZSArIGF1dGhvciArIGh0bWwgKyBlbmQ7XHJcblx0XHRcdFx0ZW5kID0gbnVsbDtcclxuXHRcdFx0XHQvLyBpZiBub3QgYWRkIGEgbmV3bGluZSB0byB0aGUgZW5kIG9mIHRoZSBpbnNlcnRlZCBxdW90ZVxyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSA9PT0gJycpIHtcclxuXHRcdFx0XHRlbmQgPSAnPGJyIC8+JyArIGVuZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChiZWZvcmUsIGVuZCk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFF1b3RlJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogRW1vdGljb25zXHJcblx0ZW1vdGljb246IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXI6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xyXG5cclxuXHRcdFx0dmFyIGNyZWF0ZUNvbnRlbnQgPSBmdW5jdGlvbiAoaW5jbHVkZU1vcmU6IGJvb2xlYW4pIHtcclxuXHRcdFx0XHR2YXIgbW9yZUxpbmssXHJcblx0XHRcdFx0XHRvcHRzID0gZWRpdG9yLmVkaXRvck9wdGlvbnMsXHJcblx0XHRcdFx0XHRlbW90aWNvbnNSb290ID0gb3B0cy5lbW90aWNvbnNSb290IHx8ICcnLFxyXG5cdFx0XHRcdFx0ZW1vdGljb25zQ29tcGF0ID0gb3B0cy5lbW90aWNvbnNDb21wYXQsXHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlciA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxyXG5cdFx0XHRcdFx0c3RhcnRTcGFjZSA9IGVtb3RpY29uc0NvbXBhdCAmJlxyXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5nZXRPdXRlclRleHQodHJ1ZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxyXG5cdFx0XHRcdFx0ZW5kU3BhY2UgPSBlbW90aWNvbnNDb21wYXQgJiZcclxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIuZ2V0T3V0ZXJUZXh0KGZhbHNlLCAxKSAhPT0gJyAnID8gJyAnIDogJycsXHJcblx0XHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0bGluZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRcdHBlckxpbmUgPSAwLFxyXG5cdFx0XHRcdFx0ZW1vdGljb25zID0gdXRpbHMuZXh0ZW5kKFxyXG5cdFx0XHRcdFx0XHR7fSxcclxuXHRcdFx0XHRcdFx0b3B0cy5lbW90aWNvbnMuZHJvcGRvd24sXHJcblx0XHRcdFx0XHRcdGluY2x1ZGVNb3JlID8gb3B0cy5lbW90aWNvbnMubW9yZSA6IHt9XHJcblx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XHJcblxyXG5cdFx0XHRcdHBlckxpbmUgPSBNYXRoLnNxcnQoT2JqZWN0LmtleXMoZW1vdGljb25zKS5sZW5ndGgpO1xyXG5cclxuXHRcdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2ltZycsIGZ1bmN0aW9uIChlOiBFdmVudCkge1xyXG5cdFx0XHRcdFx0ZWRpdG9yLmluc2VydChzdGFydFNwYWNlICsgZG9tLmF0dHIodGhpcywgJ2FsdCcpICsgZW5kU3BhY2UsXHJcblx0XHRcdFx0XHRcdG51bGwsIGZhbHNlKS5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChjb2RlLCBlbW90aWNvbikge1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxpbmUsIGRvbS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRcdHNyYzogZW1vdGljb25zUm9vdCArIChlbW90aWNvbi51cmwgfHwgZW1vdGljb24pLFxyXG5cdFx0XHRcdFx0XHRhbHQ6IGNvZGUsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBlbW90aWNvbi50b29sdGlwIHx8IGNvZGVcclxuXHRcdFx0XHRcdH0pKTtcclxuXHJcblx0XHRcdFx0XHRpZiAobGluZS5jaGlsZHJlbi5sZW5ndGggPj0gcGVyTGluZSkge1xyXG5cdFx0XHRcdFx0XHRsaW5lID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmICghaW5jbHVkZU1vcmUgJiYgb3B0cy5lbW90aWNvbnMubW9yZSkge1xyXG5cdFx0XHRcdFx0bW9yZUxpbmsgPSBkb20uY3JlYXRlRWxlbWVudCgnYScsIHtcclxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLW1vcmUnXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobW9yZUxpbmssXHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGVkaXRvci50cmFuc2xhdGUoJ01vcmUnKSkpO1xyXG5cclxuXHRcdFx0XHRcdGRvbS5vbihtb3JlTGluaywgJ2NsaWNrJywgbnVsbCwgZnVuY3Rpb24gKGU6IEV2ZW50KSB7XHJcblx0XHRcdFx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihcclxuXHRcdFx0XHRcdFx0XHRjYWxsZXIsICdtb3JlLWVtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQodHJ1ZSlcclxuXHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBtb3JlTGluayk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdlbW90aWNvbnMnLCBjcmVhdGVDb250ZW50KGZhbHNlKSk7XHJcblx0XHR9LFxyXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKGNhbGxlcjogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0ZGVmYXVsdENtZHMuZW1vdGljb24uZXhlYy5jYWxsKHRoaXMsIGNhbGxlcik7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBlbW90aWNvbidcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFlvdVR1YmVcclxuXHR5b3V0dWJlOiB7XHJcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3I6IEVtbEVkaXRvciwgY2FsbGVyOiBIVE1MRWxlbWVudCwgY2FsbGJhY2s6IChtYXRjaDogYW55LCB0aW1lOiBudW1iZXIpID0+IHZvaWQpIHtcclxuXHRcdFx0dmFyIGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3lvdXR1YmVNZW51Jywge1xyXG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IudHJhbnNsYXRlKCdWaWRlbyBVUkw6JyksXHJcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZTogRXZlbnQpIHtcclxuXHRcdFx0XHR2YXIgdmFsID0gKGRvbS5maW5kKGNvbnRlbnQsICcjbGluaycpWzBdIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG5cdFx0XHRcdHZhciBpZE1hdGNoID0gdmFsLm1hdGNoKC8oPzp2PXx2XFwvfGVtYmVkXFwvfHlvdXR1LmJlXFwvKT8oW2EtekEtWjAtOV8tXXsxMX0pLyk7XHJcblx0XHRcdFx0dmFyIHRpbWVNYXRjaCA9IHZhbC5tYXRjaCgvWyZ8P10oPzpzdGFyKT90PSgoXFxkK1tobXNdPyl7MSwzfSkvKTtcclxuXHRcdFx0XHR2YXIgdGltZSA9IDA7XHJcblxyXG5cdFx0XHRcdGlmICh0aW1lTWF0Y2gpIHtcclxuXHRcdFx0XHRcdHV0aWxzLmVhY2godGltZU1hdGNoWzFdLnNwbGl0KC9baG1zXS8pLCBmdW5jdGlvbiAoaSwgdmFsKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XHJcblx0XHRcdFx0XHRcdFx0dGltZSA9ICh0aW1lICogNjApICsgTnVtYmVyKHZhbCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGlkTWF0Y2ggJiYgL15bYS16QS1aMC05Xy1dezExfSQvLnRlc3QoaWRNYXRjaFsxXSkpIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKGlkTWF0Y2hbMV0sIHRpbWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRsaW5rJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGJ0bjogYW55KSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xyXG5cclxuXHRcdFx0ZGVmYXVsdENtZHMueW91dHViZS5fZHJvcERvd24oZWRpdG9yLCBidG4sIGZ1bmN0aW9uIChpZDogYW55LCB0aW1lOiBhbnkpIHtcclxuXHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoX3RtcGwoJ3lvdXR1YmUnLCB7XHJcblx0XHRcdFx0XHRpZDogaWQsXHJcblx0XHRcdFx0XHR0aW1lOiB0aW1lXHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgWW91VHViZSB2aWRlbydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IERhdGVcclxuXHRkYXRlOiB7XHJcblx0XHRfZGF0ZTogZnVuY3Rpb24gKGVkaXRvcjogRW1sRWRpdG9yKSB7XHJcblx0XHRcdGxldCBub3cgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRsZXQgeWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xyXG5cdFx0XHRsZXQgbW9udGggPSBub3cuZ2V0TW9udGgoKSArIDE7XHJcblx0XHRcdGxldCBkYXkgPSBub3cuZ2V0RGF0ZSgpO1xyXG5cdFx0XHRsZXQgeWVhckFzU3RyaW5nID0geWVhci50b1N0cmluZygpO1xyXG5cdFx0XHRsZXQgbW9udGhBc1N0cmluZyA9IG1vbnRoLnRvU3RyaW5nKCk7XHJcblx0XHRcdGxldCBkYXlBc1N0cmluZyA9IGRheS50b1N0cmluZygpO1xyXG5cclxuXHRcdFx0aWYgKG1vbnRoIDwgMTApIHtcclxuXHRcdFx0XHRtb250aEFzU3RyaW5nID0gJzAnICsgbW9udGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkYXkgPCAxMCkge1xyXG5cdFx0XHRcdGRheUFzU3RyaW5nID0gJzAnICsgZGF5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZWRpdG9yLmVkaXRvck9wdGlvbnMuZGF0ZUZvcm1hdFxyXG5cdFx0XHRcdC5yZXBsYWNlKC95ZWFyL2ksIHllYXJBc1N0cmluZylcclxuXHRcdFx0XHQucmVwbGFjZSgvbW9udGgvaSwgbW9udGhBc1N0cmluZylcclxuXHRcdFx0XHQucmVwbGFjZSgvZGF5L2ksIGRheUFzU3RyaW5nKTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy5kYXRlLl9kYXRlKHRoaXMpKTtcclxuXHRcdH0sXHJcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy5kYXRlLl9kYXRlKHRoaXMpKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGN1cnJlbnQgZGF0ZSdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRpbWVcclxuXHR0aW1lOiB7XHJcblx0XHRfdGltZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgbm93ID0gbmV3IERhdGUoKSxcclxuXHRcdFx0XHRob3VycyA9IG5vdy5nZXRIb3VycygpLFxyXG5cdFx0XHRcdG1pbnMgPSBub3cuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRcdHNlY3MgPSBub3cuZ2V0U2Vjb25kcygpO1xyXG5cdFx0XHRsZXQgaG91cnNBc1N0cmluZyA9IGhvdXJzLnRvU3RyaW5nKCk7XHJcblx0XHRcdGxldCBtaW5zaEFzU3RyaW5nID0gbWlucy50b1N0cmluZygpO1xyXG5cdFx0XHRsZXQgc2Vjc0FzU3RyaW5nID0gc2Vjcy50b1N0cmluZygpO1xyXG5cclxuXHRcdFx0aWYgKGhvdXJzIDwgMTApIHtcclxuXHRcdFx0XHRob3Vyc0FzU3RyaW5nID0gJzAnICsgaG91cnMudG9TdHJpbmcoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG1pbnMgPCAxMCkge1xyXG5cdFx0XHRcdG1pbnNoQXNTdHJpbmcgPSAnMCcgKyBtaW5zLnRvU3RyaW5nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWNzIDwgMTApIHtcclxuXHRcdFx0XHRzZWNzQXNTdHJpbmcgPSAnMCcgKyBzZWNzLnRvU3RyaW5nKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBob3Vyc0FzU3RyaW5nICsgJzonICsgbWluc2hBc1N0cmluZyArICc6JyArIHNlY3NBc1N0cmluZztcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xyXG5cdFx0fSxcclxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLnRpbWUuX3RpbWUoKSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IHRpbWUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogTHRyXHJcblx0bHRyOiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudHM6IGFueSwgZmlyc3RCbG9jazogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0cmV0dXJuIGZpcnN0QmxvY2sgJiYgZmlyc3RCbG9jay5zdHlsZS5kaXJlY3Rpb24gPT09ICdsdHInO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMsXHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcclxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcclxuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgJ3AnKTtcclxuXHJcblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHJcblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdG9nZ2xlVmFsdWUgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cicgPyAnJyA6ICdsdHInO1xyXG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0xlZnQtdG8tUmlnaHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBSdGxcclxuXHRydGw6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50czogYW55LCBmaXJzdEJsb2NrOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcyxcclxuXHRcdFx0XHRyYW5nZUhlbHBlciA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxyXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblxyXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRcdGlmICghbm9kZSB8fCBkb20uaXMobm9kZSwgJ2JvZHknKSkge1xyXG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCAncCcpO1xyXG5cclxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAncnRsJyA/ICcnIDogJ3J0bCc7XHJcblx0XHRcdGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicsIHRvZ2dsZVZhbHVlKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnUmlnaHQtdG8tTGVmdCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBQcmludFxyXG5cdHByaW50OiB7XHJcblx0XHRleGVjOiAncHJpbnQnLFxyXG5cdFx0dG9vbHRpcDogJ1ByaW50J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogTWF4aW1pemVcclxuXHRtYXhpbWl6ZToge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMubWF4aW1pemUoKTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH0sXHJcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnTWF4aW1pemUnLFxyXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K00nXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBTb3VyY2VcclxuXHRzb3VyY2U6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnNvdXJjZU1vZGUoKTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHR9LFxyXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdWaWV3IHNvdXJjZScsXHJcblx0XHRzaG9ydGN1dDogJ0N0cmwrU2hpZnQrUydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIHRoaXMgaXMgaGVyZSBzbyB0aGF0IGNvbW1hbmRzIGFib3ZlIGNhbiBiZSByZW1vdmVkXHJcblx0Ly8gd2l0aG91dCBoYXZpbmcgdG8gcmVtb3ZlIHRoZSAsIGFmdGVyIHRoZSBsYXN0IG9uZS5cclxuXHQvLyBOZWVkZWQgZm9yIElFLlxyXG5cdGlnbm9yZToge31cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRDbWRzO1xyXG4iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBDYWNoZSBvZiBjYW1lbENhc2UgQ1NTIHByb3BlcnR5IG5hbWVzXHJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxyXG4gKi9cclxubGV0IGNzc1Byb3BlcnR5TmFtZUNhY2hlOiB7IFtzOiBzdHJpbmddOiBzdHJpbmc7IH0gPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGVsZW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBFTEVNRU5UX05PREU6IG51bWJlciA9IDE7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciB0ZXh0IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgVEVYVF9OT0RFOiBudW1iZXIgPSAzO1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgY29tbWVudCBub2Rlc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IENPTU1FTlRfTk9ERTogbnVtYmVyID0gODtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgZG9jdW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBET0NVTUVOVF9OT0RFOiBudW1iZXIgPSA5O1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgZG9jdW1lbnQgZnJhZ21lbnRzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfRlJBR01FTlRfTk9ERTogbnVtYmVyID0gMTE7XHJcblxyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlOiBhbnkpOiBudW1iZXIge1xyXG5cdHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcblxyXG5cdHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyB2YWx1ZSA6IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcclxuICpcclxuICogV2lsbCBjcmVhdGUgaXQgaW4gdGhlIGN1cnJlbnQgZG9jdW1lbnQgdW5sZXNzIGNvbnRleHRcclxuICogaXMgc3BlY2lmaWVkLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHRhZ1xyXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBbYXR0cmlidXRlc11cclxuICogQHBhcmFtIHshRG9jdW1lbnR9IFtjb250ZXh0XVxyXG4gKiBAcmV0dXJucyB7IUhUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnOiBzdHJpbmcsIGF0dHJpYnV0ZXM/OiB7IFtzOiBzdHJpbmddOiBzdHJpbmc7IH0sIGNvbnRleHQ/OiBEb2N1bWVudCk6IEhUTUxFbGVtZW50IHtcclxuXHRsZXQgaHRtbEVsZW1lbnQgPSAoY29udGV4dCB8fCBkb2N1bWVudCkuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cdGxldCBhdHRyaWJzID0gYXR0cmlidXRlcztcclxuXHJcblx0dXRpbHMuZWFjaChhdHRyaWJzIHx8IHt9LCBmdW5jdGlvbiAoa2V5OiBrZXlvZiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xyXG5cdFx0aWYgKGtleSA9PSAnc3R5bGUnKSB7XHJcblx0XHRcdGh0bWxFbGVtZW50LnN0eWxlLmNzc1RleHQgPSB2YWx1ZSBhcyBzdHJpbmc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChrZXkgaW4gaHRtbEVsZW1lbnQpIHtcclxuXHRcdFx0Ly9AdHMtZXhwZWN0LWVycm9yXHJcblx0XHRcdGh0bWxFbGVtZW50W2tleV0gPSB2YWx1ZTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aHRtbEVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gaHRtbEVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHBhcmVudHMgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMge0FycmF5PEhUTUxFbGVtZW50Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJlbnRzKG5vZGU6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogQXJyYXk8SFRNTEVsZW1lbnQ+IHtcclxuXHR2YXIgcGFyZW50cyA9IFtdIGFzIEFycmF5PEhUTUxFbGVtZW50PjtcclxuXHR2YXIgcGFyZW50ID0gbm9kZTtcclxuXHJcblx0d2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudClcclxuXHRcdCYmICEvKDl8MTEpLy50ZXN0KHBhcmVudC5ub2RlVHlwZS50b1N0cmluZygpKSkge1xyXG5cdFx0aWYgKCFzZWxlY3RvciB8fCBpcyhwYXJlbnQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRwYXJlbnRzLnB1c2gocGFyZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJlbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgZmlyc3QgcGFyZW50IG5vZGUgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJlbnQobm9kZTogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcblx0dmFyIHBhcmVudCA9IG5vZGU7XHJcblxyXG5cdHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpXHJcblx0XHQmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUudG9TdHJpbmcoKSkpIHtcclxuXHRcdGlmICghc2VsZWN0b3IgfHwgaXMocGFyZW50LCBzZWxlY3RvcikpIHtcclxuXHRcdFx0cmV0dXJuIHBhcmVudDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgdGhlIHBhc3NlZCBub2RlIGFuZCBhbGwgcGFyZW50cyBhbmRcclxuICogcmV0dXJucyB0aGUgZmlyc3QgbWF0Y2hpbmcgbm9kZSBpZiBhbnkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KG5vZGU6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xyXG5cdGlmICghbm9kZSkge1xyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcclxuXHR9XHJcblx0bGV0IHJldEVsZW1lbnQgPSBpcyhub2RlLCBzZWxlY3RvcikgPyBub2RlIDogcGFyZW50KG5vZGUsIHNlbGVjdG9yKTtcclxuXHRyZXR1cm4gcmV0RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSB0aGUgRE9NXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKG5vZGU6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcblx0aWYgKG5vZGUucGFyZW50Tm9kZSkge1xyXG5cdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFwcGVuZHMgY2hpbGQgdG8gcGFyZW50IG5vZGVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7Tm9kZSB8IEhUTUxFbGVtZW50IHwgc3RyaW5nIHwgbnVsbCB9IGNoaWxkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50LCBjaGlsZDogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHwgVGV4dCkge1xyXG5cdG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgYW55IGNoaWxkIG5vZGVzIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50IHwgRG9jdW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Tm9kZUxpc3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZChub2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogTm9kZUxpc3Qge1xyXG5cdHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogRm9yIG9uKCkgYW5kIG9mZigpIGlmIHRvIGFkZC9yZW1vdmUgdGhlIGV2ZW50XHJcbiAqIHRvIHRoZSBjYXB0dXJlIHBoYXNlXHJcbiAqXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGxldCBFVkVOVF9DQVBUVVJFOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcclxuICogdG8gdGhlIGJ1YmJsZSBwaGFzZVxyXG4gKlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBsZXQgRVZFTlRfQlVCQkxFOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEV2ZW50cyBzaG91bGQgYmUgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudHMuXHJcbiAqXHJcbiAqIElmIHNlbGVjdG9yIGlzIHNwZWNpZmllZCB0aGUgaGFuZGxlciB3aWxsIG9ubHkgYmVcclxuICogY2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRhcmdldCBtYXRjaGVzIHRoZSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHshTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbiguLi5hbnkpfVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9mZigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb24obm9kZTogKFdpbmRvdyAmIHR5cGVvZiBnbG9iYWxUaGlzKSB8IERvY3VtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50czogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBmbjogYW55LCBjYXB0dXJlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRoYW5kbGVyID0gZm5bJ19lbWwtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdIHx8IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHRcdFx0d2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgIT09IG5vZGUpIHtcclxuXHRcdFx0XHRcdGlmIChpcyh0YXJnZXQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRcdFx0XHRmbi5jYWxsKHRhcmdldCwgZSk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRmblsnX2VtbC1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl0gPSBoYW5kbGVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGFuZGxlciA9IGZuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSB8fCBmYWxzZSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50cy5cclxuICpcclxuICogQHBhcmFtIHshTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBmblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9uKClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiBvZmYobm9kZTogTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93LCBldmVudHM6IHN0cmluZywgc2VsZWN0b3I6IHN0cmluZywgZm46IChhcmcwOiBvYmplY3QpID0+IGFueSwgY2FwdHVyZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHZhciBoYW5kbGVyO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcclxuXHRcdFx0bGV0IGtleSA9ICdfZW1sLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yO1xyXG5cdFx0XHRoYW5kbGVyID0gZm5ba2V5IGFzIGtleW9mIHR5cGVvZiBmbl07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoYW5kbGVyID0gZm47XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlIHx8IGZhbHNlKTtcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIG9ubHkgYXR0ciBwYXJhbSBpcyBzcGVjaWZpZWQgaXQgd2lsbCBnZXRcclxuICogdGhlIHZhbHVlIG9mIHRoZSBhdHRyIHBhcmFtLlxyXG4gKlxyXG4gKiBJZiB2YWx1ZSBpcyBzcGVjaWZpZWQgYnV0IG51bGwgdGhlIGF0dHJpYnV0ZVxyXG4gKiB3aWxsIGJlIHJlbW92ZWQgb3RoZXJ3aXNlIHRoZSBhdHRyIHZhbHVlIHdpbGxcclxuICogYmUgc2V0IHRvIHRoZSBwYXNzZWQgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKiBAcGFyYW0gez9zdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybiB7c3RyaW5nIHwgdW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dHIobm9kZTogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZywgdmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0cmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG5cdH1cclxuXHJcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcSwgbm8tZXEtbnVsbFxyXG5cdGlmICghdmFsdWUpIHtcclxuXHRcdHJlbW92ZUF0dHIobm9kZSwgYXR0cik7XHJcblx0fSBlbHNlIHtcclxuXHRcdG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHIobm9kZTogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZyk6IHZvaWQge1xyXG5cdG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gbm9uZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGUobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gZGVmYXVsdFxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3cobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGFuIGVsZW1lbnRzIHZpc2liaWxpdHlcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRpZiAoaXNWaXNpYmxlKG5vZGUpKSB7XHJcblx0XHRoaWRlKG5vZGUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzaG93KG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgYSBjb21wdXRlZCBDU1MgdmFsdWVzIG9yIHNldHMgYW4gaW5saW5lIENTUyB2YWx1ZVxyXG4gKlxyXG4gKiBSdWxlcyBzaG91bGQgYmUgaW4gY2FtZWxDYXNlIGZvcm1hdCBhbmQgbm90XHJcbiAqIGh5cGhlbmF0ZWQgbGlrZSBDU1MgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHthbnl9IG5vZGVcclxuICogQHBhcmFtIHthbnl9IHJ1bGVcclxuICogQHBhcmFtIHthbnl9IFt2YWx1ZV1cclxuICogQHJldHVybiB7c3RyaW5nIHwgbnVsbH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjc3Mobm9kZTogYW55LCBydWxlOiBhbnksIHZhbHVlPzogYW55KTogc3RyaW5nIHwgbnVsbCB7XHJcblx0bGV0IHJldFZhbCA9IG51bGw7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcocnVsZSkpIHtcclxuXHRcdFx0cmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgPyBnZXRDb21wdXRlZFN0eWxlKG5vZGUpW3J1bGVdIDogbnVsbDtcclxuXHRcdH1cclxuXHRcdHV0aWxzLmVhY2gocnVsZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0Y3NzKG5vZGUsIGtleSwgdmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIGlzTmFOIHJldHVybnMgZmFsc2UgZm9yIG51bGwsIGZhbHNlIGFuZCBlbXB0eSBzdHJpbmdzXHJcblx0XHQvLyBzbyBuZWVkIHRvIGNoZWNrIGl0J3MgdHJ1dGh5IG9yIDBcclxuXHRcdHZhciBpc051bWVyaWMgPSAodmFsdWUgfHwgdmFsdWUgPT09IDApICYmICFpc05hTih2YWx1ZSk7XHJcblx0XHRub2RlLnN0eWxlW3J1bGVdID0gaXNOdW1lcmljID8gdmFsdWUudG9TdHJpbmcoKSArICdweCcgOiB2YWx1ZTtcclxuXHR9XHJcblx0cmV0dXJuIHJldFZhbDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGRhdGEgYXR0cmlidXRlcyBvbiBhIG5vZGVcclxuICpcclxuICogVW5saWtlIHRoZSBqUXVlcnkgdmVyc2lvbiB0aGlzIG9ubHkgc3RvcmVzIGRhdGFcclxuICogaW4gdGhlIERPTSBhdHRyaWJ1dGVzIHdoaWNoIG1lYW5zIG9ubHkgc3RyaW5nc1xyXG4gKiBjYW4gYmUgc3RvcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGF0YShub2RlOiBhbnksIGtleT86IGFueSwgdmFsdWU/OiBhbnkpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG5cdHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcclxuXHR2YXIgZGF0YTogYW55ID0ge307XHJcblxyXG5cdGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHV0aWxzLmVhY2gobm9kZS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoXywgYXR0cikge1xyXG5cdFx0XHRcdGlmICgvXmRhdGEtL2kudGVzdChhdHRyLm5hbWUpKSB7XHJcblx0XHRcdFx0XHRsZXQgaWR4ID0gYXR0ci5uYW1lLnN1YnN0cig1KSBhcyBrZXlvZiB0eXBlb2YgZGF0YTtcclxuXHRcdFx0XHRcdGRhdGFbaWR4XSA9IGF0dHIudmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAyKSB7XHJcblx0XHRcdHJldHVybiBhdHRyKG5vZGUsICdkYXRhLScgKyBrZXkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF0dHIobm9kZSwgJ2RhdGEtJyArIGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIG5vZGUgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50IHwgQ2hpbGROb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpcyhub2RlOiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdHZhciByZXN1bHQgPSBmYWxzZTtcclxuXHJcblx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXN1bHQgPSAobm9kZS5tYXRjaGVzKS5jYWxsKG5vZGUsIHNlbGVjdG9yKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIG5vZGUgY29udGFpbnMgY2hpbGQgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gKlxyXG4gKiBUaGlzIGRpZmZlcnMgZnJvbSB0aGUgRE9NIGNvbnRhaW5zKCkgbWV0aG9kIGluIHRoYXRcclxuICogaWYgbm9kZSBhbmQgY2hpbGQgYXJlIGVxdWFsIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMobm9kZTogTm9kZSwgY2hpbGQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0cmV0dXJuIG5vZGUgIT09IGNoaWxkICYmIG5vZGUuY29udGFpbnMgJiYgbm9kZS5jb250YWlucyhjaGlsZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMgez9IVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0VsZW1lbnRTaWJsaW5nKG5vZGU6IEhUTUxFbGVtZW50LCBzZWxlY3Rvcj86IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0dmFyIHByZXYgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdGlmIChzZWxlY3RvciAmJiBwcmV2KSB7XHJcblx0XHRyZXR1cm4gaXMocHJldiwgc2VsZWN0b3IpID8gcHJldiA6IG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcHJldjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHshTm9kZX0gcmVmTm9kZVxyXG4gKiBAcmV0dXJucyB7Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRCZWZvcmUobm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50LCByZWZOb2RlOiBFbGVtZW50KTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50IHtcclxuXHRsZXQgcmV0VmFsID0gcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKTtcclxuXHRyZXR1cm4gcmV0VmFsO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybnMgeyFBcnJheS48c3RyaW5nPn1cclxuICovXHJcbmZ1bmN0aW9uIGNsYXNzZXMobm9kZTogSFRNTEVsZW1lbnQpOiBzdHJpbmdbXSB7XHJcblx0Y29uc3QgcmV0VmFsdWUgPSBub2RlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKTtcclxuXHRyZXR1cm4gcmV0VmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKG5vZGU6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdHJldHVybiBpcyhub2RlLCAnLicgKyBjbGFzc05hbWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKG5vZGU6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG5cdHZhciBjbGFzc0xpc3QgPSBjbGFzc2VzKG5vZGUpO1xyXG5cclxuXHRpZiAoY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcclxuXHRcdGNsYXNzTGlzdC5wdXNoKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHRub2RlLmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKCcgJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mobm9kZTogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcblx0dmFyIGNsYXNzTGlzdCA9IGNsYXNzZXMobm9kZSk7XHJcblxyXG5cdHV0aWxzLmFycmF5UmVtb3ZlKGNsYXNzTGlzdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhIGNsYXNzIG9uIG5vZGUuXHJcbiAqXHJcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgdHJ1dGh5IGl0IHdpbGwgYWRkXHJcbiAqIHRoZSBjbGFzcy5cclxuICpcclxuICogSWYgc3RhdGUgaXMgc3BlY2lmaWVkIGFuZCBpcyBmYWxzZXkgaXQgd2lsbCByZW1vdmVcclxuICogdGhlIGNsYXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICogQHBhcmFtIHtib29sZWFufSBbc3RhdGVdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xhc3Mobm9kZTogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBzdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRzdGF0ZSA9IHV0aWxzLmlzVW5kZWZpbmVkKHN0YXRlKSA/ICFoYXNDbGFzcyhub2RlLCBjbGFzc05hbWUpIDogc3RhdGU7XHJcblxyXG5cdGlmIChzdGF0ZSkge1xyXG5cdFx0YWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIHdpZHRoIG9mIHRoZSBwYXNzZWQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgobm9kZTogSFRNTEVsZW1lbnQsIHZhbHVlPzogbnVtYmVyIHwgc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuXHRpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHR2YXIgY3MgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdMZWZ0KSArIHRvRmxvYXQoY3MucGFkZGluZ1JpZ2h0KTtcclxuXHRcdHZhciBib3JkZXIgPSB0b0Zsb2F0KGNzLmJvcmRlckxlZnRXaWR0aCkgKyB0b0Zsb2F0KGNzLmJvcmRlclJpZ2h0V2lkdGgpO1xyXG5cclxuXHRcdHJldHVybiBub2RlLm9mZnNldFdpZHRoIC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnd2lkdGgnLCB2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGhlaWdodCBvZiB0aGUgcGFzc2VkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChub2RlOiBIVE1MRWxlbWVudCwgdmFsdWU/OiBudW1iZXIgfCBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ1RvcCkgKyB0b0Zsb2F0KGNzLnBhZGRpbmdCb3R0b20pO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyVG9wV2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJCb3R0b21XaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0SGVpZ2h0IC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnaGVpZ2h0JywgdmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZ2dlcnMgYSBjdXN0b20gZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kXHJcbiAqIHNldHMgdGhlIGRldGFpbCBwcm9wZXJ0eSB0byB0aGUgZGF0YSBvYmplY3QgcGFzc2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXIobm9kZTogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XHJcblx0dmFyIGV2ZW50O1xyXG5cclxuXHRpZiAodXRpbHMuaXNGdW5jdGlvbih3aW5kb3cuQ3VzdG9tRXZlbnQpKSB7XHJcblx0XHRldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcclxuXHRcdFx0ZGV0YWlsOiBkYXRhXHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZXZlbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblx0XHRldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Zpc2libGUobm9kZTogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHRyZXR1cm4gISFub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBDU1MgcHJvcGVydHkgbmFtZXMgaW50byBjYW1lbCBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0cmV0dXJuIHN0clxyXG5cdFx0LnJlcGxhY2UoL14tbXMtLywgJ21zLScpXHJcblx0XHQucmVwbGFjZSgvLShcXHcpL2csIGZ1bmN0aW9uIChtYXRjaCwgY2hhcikge1xyXG5cdFx0XHRyZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTG9vcCBhbGwgY2hpbGQgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlXHJcbiAqXHJcbiAqIFRoZSBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IDEgcGFyYW1ldGVyIGJlaW5nIHRoZSBub2RlLlxyXG4gKiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGUgbG9vcCB3aWxsIGJlIGV4aXRlZC5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtICB7ZnVuY3Rpb259IGZ1bmMgICAgICAgICAgIENhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aXRoIGV2ZXJ5XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBub2RlIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gaW5uZXJtb3N0Rmlyc3QgIElmIHRoZSBpbm5lcm1vc3Qgbm9kZSBzaG91bGQgYmUgcGFzc2VkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgZnVuY3Rpb24gYmVmb3JlIGl0J3MgcGFyZW50cy5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gc2libGluZ3NPbmx5ICAgIElmIHRvIG9ubHkgdHJhdmVyc2UgdGhlIG5vZGVzIHNpYmxpbmdzXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXZlcnNlPWZhbHNlXSBJZiB0byB0cmF2ZXJzZSB0aGUgbm9kZXMgaW4gcmV2ZXJzZVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGU6IGFueSwgZnVuYzogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBhbnksIGlubmVybW9zdEZpcnN0PzogYm9vbGVhbiwgc2libGluZ3NPbmx5PzogYm9vbGVhbiwgcmV2ZXJzZTogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcblx0bm9kZSA9IHJldmVyc2UgPyBub2RlLmxhc3RDaGlsZCA6IG5vZGUuZmlyc3RDaGlsZDtcclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdHZhciBuZXh0ID0gcmV2ZXJzZSA/IG5vZGUucHJldmlvdXNTaWJsaW5nIDogbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRpZiAoXHJcblx0XHRcdCghaW5uZXJtb3N0Rmlyc3QgJiYgZnVuYyhub2RlKSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdCghc2libGluZ3NPbmx5ICYmIHRyYXZlcnNlKFxyXG5cdFx0XHRcdG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHJldmVyc2VcclxuXHRcdFx0KSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdChpbm5lcm1vc3RGaXJzdCAmJiBmdW5jKG5vZGUpID09PSBmYWxzZSlcclxuXHRcdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpa2UgdHJhdmVyc2UgYnV0IGxvb3BzIGluIHJldmVyc2VcclxuICogQHNlZSB0cmF2ZXJzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJUcmF2ZXJzZShub2RlOiBhbnksIGZ1bmM6IChub2RlOiBOb2RlKSA9PiBib29sZWFuLCBpbm5lcm1vc3RGaXJzdD86IGJvb2xlYW4sIHNpYmxpbmdzT25seT86IGJvb2xlYW4pOiB2b2lkIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBIVE1MIGludG8gYSBkb2N1bWVudCBmcmFnbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG4gKiBAcGFyYW0ge0RvY3VtZW50fSBbY29udGV4dF1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWw6IHN0cmluZywgY29udGV4dD86IERvY3VtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7XHJcblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblxyXG5cdHZhciByZXQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHR2YXIgdG1wID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGNvbnRleHQpO1xyXG5cclxuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcblxyXG5cdHdoaWxlICh0bXAuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCkge1xyXG5cdFx0YXBwZW5kQ2hpbGQocmV0LCB0bXAuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmV0O1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGFueSBzdHlsaW5nLlxyXG4gKlxyXG4gKiBJdCBoYXMgc3R5bGluZyBpZiBpdCBpcyBub3QgYSBwbGFpbiA8ZGl2PiBvciA8cD4gb3JcclxuICogaWYgaXQgaGFzIGEgY2xhc3MsIHN0eWxlIGF0dHJpYnV0ZSBvciBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgMS40LjRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsaW5nKG5vZGU6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0cmV0dXJuIG5vZGUgJiYgKCFpcyhub2RlLCAncCxkaXYnKSB8fCBub2RlLmNsYXNzTmFtZT8ubGVuZ3RoID4gMCB8fFxyXG5cdFx0KGF0dHIobm9kZSwgJ3N0eWxlJyk/Lmxlbmd0aCA+IDApIHx8IHV0aWxzLmlzU3RyaW5nKGRhdGEobm9kZSkpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIGVsZW1lbnQgZnJvbSBvbmUgdHlwZSB0byBhbm90aGVyLlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSBpdCBjYW4gY29udmVydCB0aGUgZWxlbWVudCA8Yj4gdG8gPHN0cm9uZz5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgIHRvVGFnTmFtZVxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHRvVGFnTmFtZTogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG5cdHZhciBuZXdFbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0b1RhZ05hbWUsIHt9LCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpO1xyXG5cclxuXHR1dGlscy5lYWNoKGVsZW1lbnQuYXR0cmlidXRlcywgZnVuY3Rpb24gKF8sIGF0dHJpYnV0ZSkge1xyXG5cdFx0Ly8gU29tZSBicm93c2VycyBwYXJzZSBpbnZhbGlkIGF0dHJpYnV0ZXMgbmFtZXMgbGlrZVxyXG5cdFx0Ly8gJ3NpemVcIjInIHdoaWNoIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIHNldCwganVzdFxyXG5cdFx0Ly8gaWdub3JlIHRoZXNlLlxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YXR0cihuZXdFbGVtZW50LCBhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7IC8qIGVtcHR5ICovIH1cclxuXHR9KTtcclxuXHJcblxyXG5cdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpIHtcclxuXHRcdGFwcGVuZENoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHRlbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQpO1xyXG5cclxuXHRyZXR1cm4gbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgYmxvY2sgbGV2ZWwgZWxlbWVudHMgc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgdmFyIGJsb2NrTGV2ZWxMaXN0OiBzdHJpbmcgPSAnfGJvZHl8aHJ8cHxkaXZ8aDF8aDJ8aDN8aDR8aDV8aDZ8YWRkcmVzc3xwcmV8JyArXHJcblx0J2Zvcm18dGFibGV8dGJvZHl8dGhlYWR8dGZvb3R8dGh8dHJ8dGR8bGl8b2x8dWx8YmxvY2txdW90ZXxjZW50ZXJ8JyArXHJcblx0J2RldGFpbHN8c2VjdGlvbnxhcnRpY2xlfGFzaWRlfG5hdnxtYWlufGhlYWRlcnxoZ3JvdXB8Zm9vdGVyfGZpZWxkc2V0fCcgK1xyXG5cdCdkbHxkdHxkZHxmaWd1cmV8ZmlnY2FwdGlvbnwnO1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBkbyBub3QgYWxsb3cgY2hpbGRyZW4gc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2FuSGF2ZUNoaWxkcmVuKG5vZGU6IEVsZW1lbnQgfCBEb2N1bWVudCB8IERvY3VtZW50RnJhZ21lbnQgfCBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG5cdC8vIDEgID0gRWxlbWVudFxyXG5cdC8vIDkgID0gRG9jdW1lbnRcclxuXHQvLyAxMSA9IERvY3VtZW50IEZyYWdtZW50XHJcblx0aWYgKCEvMTE/fDkvLnRlc3Qobm9kZS5ub2RlVHlwZS50b1N0cmluZygpKSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8gTGlzdCBvZiBlbXB0eSBIVE1MIHRhZ3Mgc2VwYXJhdGVkIGJ5IGJhciAofCkgY2hhcmFjdGVyLlxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvaW5kZXgvZWxlbWVudHMuaHRtbFxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xyXG5cdHJldHVybiAoJ3xpZnJhbWV8YXJlYXxiYXNlfGJhc2Vmb250fGJyfGNvbHxmcmFtZXxocnxpbWd8aW5wdXR8d2JyJyArXHJcblx0XHQnfGlzaW5kZXh8bGlua3xtZXRhfHBhcmFtfGNvbW1hbmR8ZW1iZWR8a2V5Z2VufHNvdXJjZXx0cmFja3wnICtcclxuXHRcdCdvYmplY3R8JykuaW5kZXhPZignfCcgKyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnfCcpIDwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGlzIGlubGluZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgYW55fSBlbG1cclxuICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZUNvZGVBc0Jsb2NrPWZhbHNlXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5saW5lKGVsbTogSFRNTEVsZW1lbnQgfCBhbnksIGluY2x1ZGVDb2RlQXNCbG9jazogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcblx0dmFyIHRhZ05hbWUsXHJcblx0XHRub2RlVHlwZSA9IChlbG0gfHwge30pLm5vZGVUeXBlIHx8IFRFWFRfTk9ERTtcclxuXHJcblx0aWYgKG5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybiBub2RlVHlwZSA9PT0gVEVYVF9OT0RFO1xyXG5cdH1cclxuXHJcblx0dGFnTmFtZSA9IGVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdGlmICh0YWdOYW1lID09PSAnY29kZScpIHtcclxuXHRcdHJldHVybiAhaW5jbHVkZUNvZGVBc0Jsb2NrO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGJsb2NrTGV2ZWxMaXN0LmluZGV4T2YoJ3wnICsgdGFnTmFtZSArICd8JykgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0aGUgQ1NTIGZyb20gMSBub2RlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIE9ubHkgY29waWVzIENTUyBkZWZpbmVkIG9uIHRoZSBlbGVtZW50IGUuZy4gc3R5bGUgYXR0ci5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZnJvbVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b1xyXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4xLjBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q1NTKGZyb206IEhUTUxFbGVtZW50LCB0bzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRpZiAodG8uc3R5bGUgJiYgZnJvbS5zdHlsZSkge1xyXG5cdFx0dG8uc3R5bGUuY3NzVGV4dCA9IGZyb20uc3R5bGUuY3NzVGV4dCArIHRvLnN0eWxlLmNzc1RleHQ7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgRE9NIG5vZGUgaXMgZW1wdHlcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkobm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50KTogYm9vbGVhbiB7XHJcblx0bGV0IGxhc3RDaGlsZCA9IG5vZGUubGFzdENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG5cdGlmIChsYXN0Q2hpbGQgJiYgaXNFbXB0eShsYXN0Q2hpbGQpKSB7XHJcblx0XHRyZW1vdmUobGFzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzID8gIW5vZGUubm9kZVZhbHVlIDpcclxuXHRcdChjYW5IYXZlQ2hpbGRyZW4obm9kZSkgJiYgIW5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpO1xyXG59XHJcblxyXG4vKipcclxuICogRml4ZXMgYmxvY2sgbGV2ZWwgZWxlbWVudHMgaW5zaWRlIGluIGlubGluZSBlbGVtZW50cy5cclxuICpcclxuICogQWxzbyBmaXhlcyBpbnZhbGlkIGxpc3QgbmVzdGluZyBieSBwbGFjaW5nIG5lc3RlZCBsaXN0c1xyXG4gKiBpbnNpZGUgdGhlIHByZXZpb3VzIGxpIHRhZyBvciB3cmFwcGluZyB0aGVtIGluIGFuIGxpIHRhZy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeE5lc3Rpbmcobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0bGV0IGxpc3QgPSAndWwsb2wnLFxyXG5cdFx0XHRpc0Jsb2NrID0gIWlzSW5saW5lKG5vZGUsIHRydWUpICYmIG5vZGUubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSxcclxuXHRcdFx0cGFyZW50ID0gbm9kZS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdC8vIEFueSBibG9ja2xldmVsIGVsZW1lbnQgaW5zaWRlIGFuIGlubGluZSBlbGVtZW50IG5lZWRzIGZpeGluZy5cclxuXHRcdC8vIEFsc28gPHA+IHRhZ3MgdGhhdCBjb250YWluIGJsb2NrcyBzaG91bGQgYmUgZml4ZWRcclxuXHRcdGlmIChpc0Jsb2NrICYmIChpc0lubGluZShwYXJlbnQsIHRydWUpIHx8IHBhcmVudC50YWdOYW1lID09PSAnUCcpKSB7XHJcblx0XHRcdC8vIEZpbmQgdGhlIGxhc3QgaW5saW5lIHBhcmVudCBub2RlXHJcblx0XHRcdGxldCBsYXN0SW5saW5lUGFyZW50ID0gbm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRcdHdoaWxlIChpc0lubGluZShsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQsIHRydWUpIHx8XHJcblx0XHRcdFx0KGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCkudGFnTmFtZSA9PT0gJ1AnKSB7XHJcblx0XHRcdFx0bGFzdElubGluZVBhcmVudCA9IGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGJlZm9yZSA9IGV4dHJhY3RDb250ZW50cyhsYXN0SW5saW5lUGFyZW50LCBub2RlKTtcclxuXHRcdFx0bGV0IG1pZGRsZSA9IG5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0XHQvLyBDbG9uZSBpbmxpbmUgc3R5bGluZyBhbmQgYXBwbHkgaXQgdG8gdGhlIGJsb2NrcyBjaGlsZHJlblxyXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdFx0XHRcdGxldCBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRcdHdoaWxlICgobWlkZGxlLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpKSB7XHJcblx0XHRcdFx0XHRcdGFwcGVuZENoaWxkKGNsb25lLCAobWlkZGxlLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhcHBlbmRDaGlsZChtaWRkbGUsIGNsb25lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGluc2VydEJlZm9yZShtaWRkbGUsIGxhc3RJbmxpbmVQYXJlbnQpO1xyXG5cdFx0XHRpZiAoIWlzRW1wdHkoYmVmb3JlKSkge1xyXG5cdFx0XHRcdGluc2VydEJlZm9yZShiZWZvcmUsIG1pZGRsZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGlzRW1wdHkobGFzdElubGluZVBhcmVudCkpIHtcclxuXHRcdFx0XHRyZW1vdmUobGFzdElubGluZVBhcmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBGaXggaW52YWxpZCBuZXN0ZWQgbGlzdHMgd2hpY2ggc2hvdWxkIGJlIHdyYXBwZWQgaW4gYW4gbGkgdGFnXHJcblx0XHRsZXQgbm9kZVBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRpZiAoaXNCbG9jayAmJiBpcyhub2RlLCBsaXN0KSAmJiBpcyhub2RlUGFyZW50Tm9kZSwgbGlzdCkpIHtcclxuXHRcdFx0dmFyIGxpID0gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlLCAnbGknKTtcclxuXHJcblx0XHRcdGlmICghbGkpIHtcclxuXHRcdFx0XHRsaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGxpLCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YXBwZW5kQ2hpbGQobGksIG5vZGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgdGhlIGNvbW1vbiBwYXJlbnQgb2YgdHdvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMVxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTJcclxuICogQHJldHVybiB7P0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21tb25BbmNlc3Rvcihub2RlMTogSFRNTEVsZW1lbnQsIG5vZGUyOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0d2hpbGUgKChub2RlMSA9IG5vZGUxLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpKSB7XHJcblx0XHRpZiAoY29udGFpbnMobm9kZTEsIG5vZGUyKSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZTE7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/Tm9kZX1cclxuICogQHBhcmFtIHtib29sZWFufSBbcHJldmlvdXM9ZmFsc2VdXHJcbiAqIEByZXR1cm5zIHs/Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaWJsaW5nKG5vZGU/OiBIVE1MRWxlbWVudCwgcHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0aWYgKCFub2RlKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGxldCBzaWJsaW5nID0gKHByZXZpb3VzID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nKSB8fCBnZXRTaWJsaW5nKG5vZGUucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCwgcHJldmlvdXMpO1xyXG5cdHJldHVybiBzaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB1bnVzZWQgd2hpdGVzcGFjZSBmcm9tIHRoZSByb290IGFuZCBhbGwgaXQncyBjaGlsZHJlbi5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IHJvb3RcclxuICogQHNpbmNlIDEuNC4zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlV2hpdGVTcGFjZShyb290OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdHZhciBub2RlVmFsdWUsIG5vZGVUeXBlLCBuZXh0LCBwcmV2aW91cywgcHJldmlvdXNTaWJsaW5nLFxyXG5cdFx0bmV4dE5vZGUsIHRyaW1TdGFydCxcclxuXHRcdGNzc1doaXRlU3BhY2UgPSBjc3Mocm9vdCwgJ3doaXRlU3BhY2UnKSxcclxuXHRcdC8vIFByZXNlcnZlIG5ld2xpbmVzIGlmIGlzIHByZS1saW5lXHJcblx0XHRwcmVzZXJ2ZU5ld0xpbmVzID0gL2xpbmUkL2kudGVzdChjc3NXaGl0ZVNwYWNlKSxcclxuXHRcdG5vZGUgPSByb290LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdC8vIFNraXAgcHJlICYgcHJlLXdyYXAgd2l0aCBhbnkgdmVuZG9yIHByZWZpeFxyXG5cdGlmICgvcHJlKC13cmFwKT8kL2kudGVzdChjc3NXaGl0ZVNwYWNlKSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdG5leHROb2RlID0gbm9kZS5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHRcdG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xyXG5cdFx0bm9kZVR5cGUgPSBub2RlLm5vZGVUeXBlO1xyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFICYmIG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRyZW1vdmVXaGl0ZVNwYWNlKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gVEVYVF9OT0RFKSB7XHJcblx0XHRcdG5leHQgPSBnZXRTaWJsaW5nKG5vZGUpO1xyXG5cdFx0XHRwcmV2aW91cyA9IGdldFNpYmxpbmcobm9kZSwgdHJ1ZSk7XHJcblx0XHRcdHRyaW1TdGFydCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzLCAnZW1sZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0cHJldmlvdXMgPSBnZXRTaWJsaW5nKHByZXZpb3VzLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgc2libGluZyBpc24ndCBpbmxpbmUgb3IgaXMgYSB0ZXh0bm9kZSB0aGF0XHJcblx0XHRcdC8vIGVuZHMgaW4gd2hpdGVzcGFjZSwgdGltZSB0aGUgc3RhcnQgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoaXNJbmxpbmUobm9kZSkgJiYgcHJldmlvdXMpIHtcclxuXHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91cztcclxuXHJcblx0XHRcdFx0d2hpbGUgKHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzU2libGluZywgJ2VtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBnZXRTaWJsaW5nKHByZXZpb3VzU2libGluZywgdHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0cmltU3RhcnQgPSBwcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgPT09IFRFWFRfTk9ERSA/XHJcblx0XHRcdFx0XHQvW1xcdFxcblxcciBdJC8udGVzdChwcmV2aW91c1NpYmxpbmcubm9kZVZhbHVlKSA6XHJcblx0XHRcdFx0XHQhaXNJbmxpbmUocHJldmlvdXNTaWJsaW5nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2xlYXIgemVybyB3aWR0aCBzcGFjZXNcclxuXHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoL1xcdTIwMEIvZywgJycpO1xyXG5cclxuXHRcdFx0Ly8gU3RyaXAgbGVhZGluZyB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmICghcHJldmlvdXMgfHwgIWlzSW5saW5lKHByZXZpb3VzKSB8fCB0cmltU3RhcnQpIHtcclxuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvXltcXHQgXSsvIDogL15bXFx0XFxuXFxyIF0rLyxcclxuXHRcdFx0XHRcdCcnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU3RyaXAgdHJhaWxpbmcgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoIW5leHQgfHwgIWlzSW5saW5lKG5leHQpKSB7XHJcblx0XHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSskLyA6IC9bXFx0XFxuXFxyIF0rJC8sXHJcblx0XHRcdFx0XHQnJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBlbXB0eSB0ZXh0IG5vZGVzXHJcblx0XHRcdGlmICghbm9kZVZhbHVlLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlbW92ZShub2RlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9bXFx0IF0rL2cgOiAvW1xcdFxcblxcciBdKy9nLFxyXG5cdFx0XHRcdFx0JyAnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0Tm9kZTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbGwgdGhlIG5vZGVzIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RhcnROb2RlXHRUaGUgbm9kZSB0byBzdGFydCBleHRyYWN0aW5nIGF0XHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVuZE5vZGVcdFx0VGhlIG5vZGUgdG8gc3RvcCBleHRyYWN0aW5nIGF0XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRzKHN0YXJ0Tm9kZTogSFRNTEVsZW1lbnQsIGVuZE5vZGU6IEhUTUxFbGVtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7XHJcblx0dmFyIHJhbmdlID0gc3RhcnROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHJcblx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoc3RhcnROb2RlKTtcclxuXHRyYW5nZS5zZXRFbmRBZnRlcihlbmROb2RlKTtcclxuXHJcblx0cmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgb2Zmc2V0IHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBsZWZ0IGFuZCB0b3AgcHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChub2RlOiBIVE1MRWxlbWVudCk6IHsgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciB9IHtcclxuXHR2YXIgbGVmdCA9IDAsXHJcblx0XHR0b3AgPSAwO1xyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0bGVmdCArPSBub2RlLm9mZnNldExlZnQ7XHJcblx0XHR0b3AgKz0gbm9kZS5vZmZzZXRUb3A7XHJcblx0XHRub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bGVmdDogbGVmdCxcclxuXHRcdHRvcDogdG9wXHJcblx0fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGEgQ1NTIHByb3BlcnR5IGZyb20gdGhlIGVsZW1lbnRzIHN0eWxlIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdGxldCBzdHlsZVZhbHVlOiBzdHJpbmc7XHJcblx0bGV0IGVsbVN0eWxlID0gZWxtLnN0eWxlO1xyXG5cclxuXHRpZiAoIWNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSkge1xyXG5cdFx0Y3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldID0gY2FtZWxDYXNlKHByb3BlcnR5KTtcclxuXHR9XHJcblxyXG5cdHByb3BlcnR5ID0gY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldO1xyXG5cdHN0eWxlVmFsdWUgPSBlbG1TdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcclxuXHJcblx0Ly8gQWRkIGFuIGV4Y2VwdGlvbiBmb3IgdGV4dC1hbGlnblxyXG5cdGlmICgndGV4dEFsaWduJyA9PT0gcHJvcGVydHkpIHtcclxuXHRcdHN0eWxlVmFsdWUgPSBzdHlsZVZhbHVlIHx8IGNzcyhlbG0sIHByb3BlcnR5KTtcclxuXHJcblx0XHRpZiAoY3NzKGVsbS5wYXJlbnROb2RlLCBwcm9wZXJ0eSkgPT09IHN0eWxlVmFsdWUgfHxcclxuXHRcdFx0Y3NzKGVsbSwgJ2Rpc3BsYXknKSAhPT0gJ2Jsb2NrJyB8fCBpcyhlbG0sICdocix0aCcpKSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBzdHlsZVZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgYW4gZWxlbWVudCBoYXMgYSBzdHlsZS5cclxuICpcclxuICogSWYgdmFsdWVzIGFyZSBzcGVjaWZpZWQgaXQgd2lsbCBjaGVjayB0aGF0IHRoZSBzdHlsZXMgdmFsdWVcclxuICogbWF0Y2hlcyBvbmUgb2YgdGhlIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSBbdmFsdWVzXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlcz86IHN0cmluZyB8IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuXHR2YXIgc3R5bGVWYWx1ZSA9IGdldFN0eWxlKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRpZiAoIXN0eWxlVmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAhdmFsdWVzIHx8IHN0eWxlVmFsdWUgPT09IHZhbHVlcyB8fFxyXG5cdFx0KEFycmF5LmlzQXJyYXkodmFsdWVzKSAmJiB2YWx1ZXMuaW5kZXhPZihzdHlsZVZhbHVlKSA+IC0xKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGlubGluZSBzdHlsZXMgYW5kIGFsbCB0aGVcclxuICogaW5saW5lIHN0eWxlcyBoYXZlIG1hdGNoaW5nIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIHN0eWxlc01hdGNoKG5vZGVBOiBIVE1MRWxlbWVudCwgbm9kZUI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0dmFyIGkgPSBub2RlQS5zdHlsZS5sZW5ndGg7XHJcblx0aWYgKGkgIT09IG5vZGVCLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0bGV0IHByb3A6IHN0cmluZyA9IG5vZGVBLnN0eWxlW2ldO1xyXG5cdFx0aWYgKG5vZGVBLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkgIT09IG5vZGVCLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCBub2RlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBhdHRyaWJ1dGVzIGFuZCBhbGwgdGhlXHJcbiAqIGF0dHJpYnV0ZSB2YWx1ZXMgbWF0Y2hcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUFcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBhdHRyaWJ1dGVzTWF0Y2gobm9kZUE6IEhUTUxFbGVtZW50LCBub2RlQjogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHR2YXIgaSA9IG5vZGVBLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlQS5hdHRyaWJ1dGVzW2ldO1xyXG5cdFx0dmFyIG5vdE1hdGNoZXMgPSBwcm9wLm5hbWUgPT09ICdzdHlsZScgP1xyXG5cdFx0XHQhc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSA6XHJcblx0XHRcdHByb3AudmFsdWUgIT09IGF0dHIobm9kZUIsIHByb3AubmFtZSk7XHJcblxyXG5cdFx0aWYgKG5vdE1hdGNoZXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGVsZW1lbnQgcGxhY2luZyBpdHMgY2hpbGRyZW4gaW4gaXRzIHBsYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUtlZXBDaGlsZHJlbihub2RlOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cclxuXHR3aGlsZSAoKG5vZGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQpKSB7XHJcblx0XHRpbnNlcnRCZWZvcmUoKG5vZGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQpLCBub2RlKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZShub2RlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlcyBpbmxpbmUgc3R5bGVzIGFuZCB0YWdzIHdpdGggcGFyZW50cyB3aGVyZSBwb3NzaWJsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHNpbmNlIDMuMS4wXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2Uobm9kZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuXHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lO1xyXG5cdHZhciBtZXJnZVRhZ3MgPSAvQnxTVFJPTkd8RU18U1BBTnxGT05ULztcclxuXHJcblx0Ly8gTWVyZ2UgY2hpbGRyZW4gKGluIHJldmVyc2UgYXMgY2hpbGRyZW4gY2FuIGJlIHJlbW92ZWQpXHJcblx0dmFyIGkgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdG1lcmdlKG5vZGUuY2hpbGROb2Rlc1tpXSBhcyBIVE1MRWxlbWVudCk7XHJcblx0fVxyXG5cclxuXHQvLyBTaG91bGQgb25seSBtZXJnZSBpbmxpbmUgdGFncyBhbmQgc2hvdWxkIG5vdCBtZXJnZSA8YnI+IHRhZ3NcclxuXHRpZiAoIWlzSW5saW5lKG5vZGUpIHx8IHRhZ05hbWUgPT09ICdCUicpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIFJlbW92ZSBhbnkgaW5saW5lIHN0eWxlcyB0aGF0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGVcclxuXHRpID0gbm9kZS5zdHlsZS5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlLnN0eWxlW2ldO1xyXG5cdFx0aWYgKGNzcyhwYXJlbnQsIHByb3ApID09PSBjc3Mobm9kZSwgcHJvcCkpIHtcclxuXHRcdFx0bm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIENhbiBvbmx5IHJlbW92ZSAvIG1lcmdlIHRhZ3MgaWYgbm8gaW5saW5lIHN0eWxpbmcgbGVmdC5cclxuXHQvLyBJZiB0aGVyZSBpcyBhbnkgaW5saW5lIHN0eWxlIGxlZnQgdGhlbiBpdCBtZWFucyBpdCBhdCBsZWFzdCBwYXJ0aWFsbHlcclxuXHQvLyBkb2Vzbid0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGUgc28gbXVzdCBzdGF5XHJcblx0aWYgKCFub2RlLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmVtb3ZlQXR0cihub2RlLCAnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBSZW1vdmUgZm9udCBhdHRyaWJ1dGVzIGlmIG1hdGNoIHBhcmVudFxyXG5cdFx0aWYgKHRhZ05hbWUgPT09ICdGT05UJykge1xyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSA9PT1cclxuXHRcdFx0XHRjc3MocGFyZW50LCAnZm9udEZhbWlseScpLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdmYWNlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2NvbG9yJykgPT09IGNzcyhwYXJlbnQsICdjb2xvcicpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQXR0cihub2RlLCAnY29sb3InKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnZm9udFNpemUnKSA9PT0gY3NzKHBhcmVudCwgJ2ZvbnRTaXplJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdzaXplJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTcGFucyBhbmQgZm9udCB0YWdzIHdpdGggbm8gYXR0cmlidXRlcyBjYW4gYmUgc2FmZWx5IHJlbW92ZWRcclxuXHRcdGlmICghbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCAmJiAvU1BBTnxGT05ULy50ZXN0KHRhZ05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdH0gZWxzZSBpZiAobWVyZ2VUYWdzLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0dmFyIGlzQm9sZCA9IC9CfFNUUk9ORy8udGVzdCh0YWdOYW1lKTtcclxuXHRcdFx0dmFyIGlzSXRhbGljID0gdGFnTmFtZSA9PT0gJ0VNJztcclxuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50KSAmJlxyXG5cdFx0XHRcdCghaXNCb2xkIHx8IC9ib2xkfDcwMC9pLnRlc3QoY3NzKHBhcmVudCwgJ2ZvbnRXZWlnaHQnKSkpICYmXHJcblx0XHRcdFx0KCFpc0l0YWxpYyB8fCBjc3MocGFyZW50LCAnZm9udFN0eWxlJykgPT09ICdpdGFsaWMnKSkge1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgaWYgcGFyZW50IG1hdGNoXHJcblx0XHRcdFx0aWYgKChwYXJlbnQudGFnTmFtZSA9PT0gdGFnTmFtZSB8fFxyXG5cdFx0XHRcdFx0KGlzQm9sZCAmJiAvQnxTVFJPTkcvLnRlc3QocGFyZW50LnRhZ05hbWUpKSkgJiZcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNNYXRjaChwYXJlbnQsIG5vZGUpKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBNZXJnZSBzaWJsaW5ncyBpZiBhdHRyaWJ1dGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlcywgbWF0Y2hcclxuXHR2YXIgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcblx0aWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09PSB0YWdOYW1lICYmIGF0dHJpYnV0ZXNNYXRjaChuZXh0LCBub2RlKSkge1xyXG5cdFx0YXBwZW5kQ2hpbGQobm9kZSwgbmV4dCk7XHJcblx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obmV4dCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9kZWZhdWx0Q29tbWFuZHMnO1xyXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi9wbHVnaW5NYW5hZ2VyJztcclxuaW1wb3J0IHsgUmFuZ2VIZWxwZXIgfSBmcm9tICcuL3JhbmdlSGVscGVyJztcclxuaW1wb3J0IHRlbXBsYXRlcyBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZW1vdGljb25zIGZyb20gJy4vZW1vdGljb25zLmpzJztcclxuaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknO1xyXG5cclxudmFyIGdsb2JhbFdpbiA9IHdpbmRvdztcclxudmFyIGdsb2JhbERvYyA9IGRvY3VtZW50O1xyXG5cclxuLyoqXHJcbiAqIEVtbEVkaXRvciAtIFlBRSEgWWV0IEFub3RoZXIgRWRpdG9yXHJcbiAqIEBjbGFzcyBFbWxFZGl0b3JcclxuICogQG5hbWUgRW1sRWRpdG9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWxFZGl0b3Ige1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IodGV4dGFyZWE6IGFueSwgdXNlck9wdGlvbnM6IGFueSkge1xyXG5cdFx0dGhpcy50ZXh0YXJlYSA9IHRleHRhcmVhO1xyXG5cdFx0dGhpcy5vcHRpb25zID0gdGhpcy5lZGl0b3JPcHRpb25zID0gdXRpbHMuZXh0ZW5kKHRydWUsIHt9LCAoZGVmYXVsdE9wdGlvbnMgYXMgYW55KSwgdXNlck9wdGlvbnMpO1xyXG5cdFx0dGhpcy5jb21tYW5kcyA9IHV0aWxzLmV4dGVuZCh0cnVlLCB7fSwgKHVzZXJPcHRpb25zLmNvbW1hbmRzIHx8IGRlZmF1bHRDb21tYW5kcykpO1xyXG5cclxuXHRcdC8vIERvbid0IGRlZXAgZXh0ZW5kIGVtb3RpY29ucyAoZml4ZXMgIzU2NSlcclxuXHRcdHRoaXMuZWRpdG9yT3B0aW9ucy5lbW90aWNvbnMgPSB1c2VyT3B0aW9ucy5lbW90aWNvbnMgfHwgKGRlZmF1bHRPcHRpb25zIGFzIGFueSkuZW1vdGljb25zO1xyXG5cclxuXHRcdGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHMpKSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscyA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5vcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzLnB1c2goJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLycpO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5IGZvciBlYWNoIGVkaXRvciBpbnN0YW5jZSBzbyBjYW5cclxuXHRcdC8vIGhhdmUgZGlmZmVyZW50IGFsbG93ZWQgaWZyYW1lIFVSTHNcclxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXHJcblx0XHR0aGlzLmRvbVB1cmlmeSA9IERPTVB1cmlmeSgpO1xyXG5cclxuXHRcdC8vIEFsbG93IGlmcmFtZXMgZm9yIHRoaW5ncyBsaWtlIFlvdVR1YmUsIHNlZTpcclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2lzc3Vlcy8zNDAjaXNzdWVjb21tZW50LTY3MDc1ODk4MFxyXG5cdFx0dGhpcy5kb21QdXJpZnkuYWRkSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIChub2RlOiBIVE1MRWxlbWVudCwgZGF0YTogYW55KSA9PiB7XHJcblx0XHRcdGxldCBhbGxvd2VkVXJscyA9IHRoaXMub3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscztcclxuXHJcblx0XHRcdGlmIChkYXRhLnRhZ05hbWUgPT09ICdpZnJhbWUnKSB7XHJcblx0XHRcdFx0bGV0IHNyYyA9IGRvbS5hdHRyKG5vZGUsICdzcmMnKSB8fCAnJztcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhbGxvd2VkVXJscy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0bGV0IHVybCA9IGFsbG93ZWRVcmxzW2ldO1xyXG5cclxuXHRcdFx0XHRcdGlmICh1dGlscy5pc1N0cmluZyh1cmwpICYmIHNyYy5zdWJzdHIoMCwgdXJsLmxlbmd0aCkgPT09IHVybCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGFuZGxlIHJlZ2V4XHJcblx0XHRcdFx0XHRpZiAodXJsLnRlc3QgJiYgdXJsLnRlc3Qoc3JjKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBObyBtYXRjaCBzbyByZW1vdmVcclxuXHRcdFx0XHRkb20ucmVtb3ZlKG5vZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBDb252ZXJ0IHRhcmdldCBhdHRyaWJ1dGUgaW50byBkYXRhLWVtbC10YXJnZXQgYXR0cmlidXRlcyBzbyBYSFRNTCBmb3JtYXRcclxuXHRcdC8vIGNhbiBhbGxvdyB0aGVtXHJcblx0XHR0aGlzLmRvbVB1cmlmeS5hZGRIb29rKCdhZnRlclNhbml0aXplQXR0cmlidXRlcycsIChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG5cdFx0XHRpZiAoJ3RhcmdldCcgaW4gbm9kZSkge1xyXG5cdFx0XHRcdGRvbS5hdHRyKG5vZGUsICdkYXRhLWVtbC10YXJnZXQnLCBkb20uYXR0cihub2RlLCAndGFyZ2V0JykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ucmVtb3ZlQXR0cihub2RlLCAndGFyZ2V0Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBydW4gdGhlIGluaXRpYWxpemVyXHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHQgKiBQdWJsaWMgbWVtYmVyc1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cdHB1YmxpYyB1c2VyT3B0aW9uczogYW55O1xyXG5cdHB1YmxpYyBlZGl0b3JPcHRpb25zOiBhbnk7XHJcblx0cHVibGljIHRleHRhcmVhOiBhbnk7XHJcblx0cHVibGljIGNvbW1hbmRzOiBhbnk7XHJcblx0cHVibGljIGxvbmdlc3RFbW90aWNvbkNvZGU6IG51bWJlcjtcclxuXHRwdWJsaWMgZW1vdGljb25zQ2FjaGU6IGFueTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdGhlIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2Rlc1xyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgdG9nZ2xlU291cmNlTW9kZVxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHRvZ2dsZVNvdXJjZU1vZGUoKTogdm9pZCB7XHJcblx0XHRsZXQgaXNJblNvdXJjZU1vZGUgPSB0aGlzLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdC8vIGRvbid0IGFsbG93IHN3aXRjaGluZyB0byBXWVNJV1lHIGlmIGRvZXNuJ3Qgc3VwcG9ydCBpdFxyXG5cdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCAmJiBpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLmNsZWFyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcclxuXHRcdHRoaXMuYmx1cigpO1xyXG5cclxuXHRcdGlmIChpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHR0aGlzLnNldFd5c2l3eWdFZGl0b3JWYWx1ZSh0aGlzLmdldFNvdXJjZUVkaXRvclZhbHVlKCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zZXRTb3VyY2VFZGl0b3JWYWx1ZSh0aGlzLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20udG9nZ2xlKHRoaXMuc291cmNlRWRpdG9yKTtcclxuXHRcdGRvbS50b2dnbGUodGhpcy53eXNpd3lnRWRpdG9yKTtcclxuXHJcblx0XHRkb20udG9nZ2xlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScsIGlzSW5Tb3VyY2VNb2RlKTtcclxuXHRcdGRvbS50b2dnbGVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3NvdXJjZU1vZGUnLCAhaXNJblNvdXJjZU1vZGUpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlVG9vbEJhcigpO1xyXG5cdFx0dGhpcy51cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0KiBJZiB0aGUgZWRpdG9yIGlzIGluIHNvdXJjZSBjb2RlIG1vZGVcclxuXHQqXHJcblx0KiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCogQGZ1bmN0aW9uXHJcblx0KiBAbmFtZSBpblNvdXJjZU1vZGVcclxuXHQqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0Ki9cclxuXHRwdWJsaWMgaW5Tb3VyY2VNb2RlKCk6IGJvb2xlYW4ge1xyXG5cdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3NvdXJjZU1vZGUnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBjdXJyZW50IG5vZGUgdGhhdCBjb250YWlucyB0aGUgc2VsZWN0aW9uL2NhcmV0IGluXHJcblx0ICogV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7P05vZGV9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY3VycmVudE5vZGVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBDdXJyZW50Tm9kZSgpOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudE5vZGU7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZVxyXG5cdCAqIHNlbGVjdGlvbi9jYXJldCBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBXaWxsIGJlIG51bGwgaW4gc291cmNlTW9kZSBvciBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHs/Tm9kZX1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBDdXJyZW50QmxvY2tOb2RlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRwdWJsaWMgQ3VycmVudEJsb2NrTm9kZSgpOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudEJsb2NrTm9kZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgZWRpdG9ycyBibHVyIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBibHVyXjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBibHVyKGhhbmRsZXI/OiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc/OiBib29sZWFuLCBleGNsdWRlU291cmNlPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHR0aGlzLmJpbmQoJ2JsdXInLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LmJsdXIoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9yLmJsdXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB0ZXh0IGVkaXRvciB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2V0U291cmNlRWRpdG9yVmFsdWVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRTb3VyY2VFZGl0b3JWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLnNvdXJjZUVkaXRvci52YWx1ZSA9IHZhbHVlO1xyXG5cdFx0dGhpcy50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIGZpbHRlciBzZXQgdHJ1ZSB0aGUgdmFsIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlclxyXG5cdCAqIGZ1bmN0aW9uLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpbiBpdCB3aWxsIHBhc3MgdGhlIHZhbCB0b1xyXG5cdCAqIHRoZSBCQkNvZGUgZmlsdGVyIHRvIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IHZhbFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgdmFsXjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB2YWwodmFsPzogc3RyaW5nLCBmaWx0ZXI6IGJvb2xlYW4gPSB0cnVlKTogYW55IHtcclxuXHRcdGlmICghdXRpbHMuaXNTdHJpbmcodmFsKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5pblNvdXJjZU1vZGUoKSA/XHJcblx0XHRcdFx0dGhpcy5nZXRTb3VyY2VFZGl0b3JWYWx1ZShmYWxzZSkgOlxyXG5cdFx0XHRcdHRoaXMuZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICd0b0h0bWwnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdFx0dmFsID0gdGhpcy5mb3JtYXQudG9IdG1sKHZhbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNldFNvdXJjZUVkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdGV4dGFyZWEgdGhhdCB0aGUgZWRpdG9yIGlzIHJlcGxhY2luZ1xyXG5cdCAqIHdpdGggdGhlIHZhbHVlIGN1cnJlbnRseSBpbnNpZGUgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNldFRleHRhcmVhVmFsdWVcclxuXHQgKiBAc2luY2UgMS40LjBcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRUZXh0YXJlYVZhbHVlKCkge1xyXG5cdFx0Ly9UT0RPXHJcblx0XHR0aGlzLnRleHRhcmVhLnZhbHVlID0gdGhpcy52YWwoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBXWVNJV1lHIEhUTUwgZWRpdG9yIHZhbHVlLiBTaG91bGQgb25seSBiZSB0aGUgSFRNTFxyXG5cdCAqIGNvbnRhaW5lZCB3aXRoaW4gdGhlIGJvZHkgdGFnc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2V0V3lzaXd5Z0VkaXRvclZhbHVlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuXHRcdGlmICghdmFsdWUpIHtcclxuXHRcdFx0dmFsdWUgPSAnPHA+PGJyIC8+PC9wPic7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy53eXNpd3lnQm9keS5pbm5lckhUTUwgPSB0aGlzLnNhbml0aXplKHZhbHVlKTtcclxuXHRcdHRoaXMucmVwbGFjZUVtb3RpY29ucygpO1xyXG5cdFx0dGhpcy5hcHBlbmROZXdMaW5lKCk7XHJcblx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdHRoaXMuYXV0b0V4cGFuZCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0ICpcclxuXHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIHRleHQgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyB3aGljaCBpcyBCQkNvZGUgdG9cclxuXHQgKiBIVE1MIHNvIGl0IHdpbGwgcmV0dXJuIEhUTUwuIElmIGZpbHRlciBpcyBzZXQgdG8gZmFsc2UgaXQgd2lsbFxyXG5cdCAqIGp1c3QgcmV0dXJuIHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIGVkaXRvciAoQkJDb2RlKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7P2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQG5hbWUgZ2V0U291cmNlRWRpdG9yVmFsdWVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRTb3VyY2VFZGl0b3JWYWx1ZShmaWx0ZXI/OiBib29sZWFuKTogc3RyaW5nIHtcclxuXHRcdGxldCB2YWwgPSB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHR2YWwgPSB0aGlzLmZvcm1hdC50b0h0bWwodmFsKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB2YWw7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogPHA+U2V0cyB0aGUgd2lkdGggYW5kL29yIGhlaWdodCBvZiB0aGUgZWRpdG9yLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPklmIHdpZHRoIG9yIGhlaWdodCBpcyBub3QgbnVtZXJpYyBpdCBpcyBpZ25vcmVkLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPlRoZSBzYXZlIGFyZ3VtZW50IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBuZXcgc2l6ZXMuXHJcblx0ICogVGhlIHNhdmVkIHNpemVzIGNhbiBiZSB1c2VkIGZvciB0aGluZ3MgbGlrZSByZXN0b3JpbmcgZnJvbVxyXG5cdCAqIG1heGltaXplZCBzdGF0ZS4gVGhpcyBzaG91bGQgbm9ybWFsbHkgYmUgbGVmdCBhcyB0cnVlLjwvcD5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0XHR3aWR0aFx0XHRXaWR0aCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0XHRoZWlnaHRcdFx0SGVpZ2h0IGluIHB4XHJcblx0ICogQHBhcmFtIHtib29sZWFufVx0W3NhdmU9dHJ1ZV1cdElmIHRvIHN0b3JlIHRoZSBuZXcgc2l6ZXNcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIGRpbWVuc2lvbnNeM1xyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0cHVibGljIGRpbWVuc2lvbnMod2lkdGg/OiBhbnksIGhlaWdodD86IGFueSwgc2F2ZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0Ly8gc2V0IHVuZGVmaW5lZCB3aWR0aC9oZWlnaHQgdG8gYm9vbGVhbiBmYWxzZVxyXG5cdFx0d2lkdGggPSAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSA/IGZhbHNlIDogd2lkdGg7XHJcblx0XHRoZWlnaHQgPSAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApID8gZmFsc2UgOiBoZWlnaHQ7XHJcblxyXG5cdFx0aWYgKHdpZHRoID09PSBmYWxzZSAmJiBoZWlnaHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiB7IHdpZHRoOiB0aGlzLndpZHRoKCksIGhlaWdodDogdGhpcy5oZWlnaHQoKSB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh3aWR0aCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5vcHRpb25zLndpZHRoID0gd2lkdGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lciwgd2lkdGgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoZWlnaHQgIT09IGZhbHNlKSB7XHJcblx0XHRcdGlmIChzYXZlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHRoaXMub3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5oZWlnaHQodGhpcy5lZGl0b3JDb250YWluZXIsIGhlaWdodCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHthbnl9IHJlYWRPbmx5XHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSByZWFkT25seV4yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgcmVhZE9ubHkocmVhZE9ubHk/OiBhbnkpOiBhbnkge1xyXG5cdFx0aWYgKHR5cGVvZiByZWFkT25seSAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdHJldHVybiAhdGhpcy5zb3VyY2VFZGl0b3IucmVhZE9ubHk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy53eXNpd3lnQm9keS5jb250ZW50RWRpdGFibGUgPSAoIXJlYWRPbmx5KS50b1N0cmluZygpO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IucmVhZE9ubHkgPSAhcmVhZE9ubHk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVUb29sQmFyKHJlYWRPbmx5KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGZvY3VzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbiB8IGFueX0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBmb2N1c14yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMgZm9jdXMoaGFuZGxlcj86IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5Zz86IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdHRoaXMuYmluZCgnZm9jdXMnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCF0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdC8vIEFscmVhZHkgaGFzIGZvY3VzIHNvIGRvIG5vdGhpbmdcclxuXHRcdFx0aWYgKGRvbS5maW5kKHRoaXMud3lzaXd5Z0RvY3VtZW50LCAnOmZvY3VzJykubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgY29udGFpbmVyO1xyXG5cdFx0XHRsZXQgcm5nID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHQvLyBGaXggRkYgYnVnIHdoZXJlIGl0IHNob3dzIHRoZSBjdXJzb3IgaW4gdGhlIHdyb25nIHBsYWNlXHJcblx0XHRcdC8vIGlmIHRoZSBlZGl0b3IgaGFzbid0IGhhZCBmb2N1cyBiZWZvcmUuIFNlZSBpc3N1ZSAjMzkzXHJcblx0XHRcdGlmICghdGhpcy5jdXJyZW50U2VsZWN0aW9uKSB7XHJcblx0XHRcdFx0dGhpcy5hdXRvZm9jdXModHJ1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIGN1cnNvciBpcyBzZXQgYWZ0ZXIgYSBCUiB3aGVuIHRoZSBCUiBpcyB0aGUgb25seVxyXG5cdFx0XHQvLyBjaGlsZCBvZiB0aGUgcGFyZW50LiBJbiBGaXJlZm94IHRoaXMgY2F1c2VzIGEgbGluZSBicmVha1xyXG5cdFx0XHQvLyB0byBvY2N1ciB3aGVuIHNvbWV0aGluZyBpcyB0eXBlZC4gU2VlIGlzc3VlICMzMjFcclxuXHRcdFx0aWYgKHJuZyAmJiBybmcuZW5kT2Zmc2V0ID09PSAxICYmIHJuZy5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRjb250YWluZXIgPSBybmcuZW5kQ29udGFpbmVyO1xyXG5cclxuXHRcdFx0XHRpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJiBkb20uaXMoKGNvbnRhaW5lci5maXJzdENoaWxkIGFzIEhUTUxFbGVtZW50KSwgJ2JyJykpIHtcclxuXHRcdFx0XHRcdHJuZy5zZXRTdGFydEJlZm9yZShjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJuZyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnd5c2l3eWdXaW5kb3cuZm9jdXMoKTtcclxuXHRcdFx0dGhpcy53eXNpd3lnQm9keS5mb2N1cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeHBhbmRzIG9yIHNocmlua3MgdGhlIGVkaXRvcnMgaGVpZ2h0IHRvIHRoZSBoZWlnaHQgb2YgaXQncyBjb250ZW50XHJcblx0ICpcclxuXHQgKiBVbmxlc3MgaWdub3JlTWF4SGVpZ2h0IGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbm90IGV4cGFuZFxyXG5cdCAqIGhpZ2hlciB0aGFuIHRoZSBtYXhIZWlnaHQgb3B0aW9uLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlTWF4SGVpZ2h0PWZhbHNlXVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGV4cGFuZFRvQ29udGVudFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNlZSAjcmVzaXplVG9Db250ZW50XHJcblx0ICovXHJcblx0cHVibGljIGV4cGFuZFRvQ29udGVudChpZ25vcmVNYXhIZWlnaHQ6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLm1heGltaXplKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSk7XHJcblx0XHR0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICghdGhpcy5hdXRvRXhwYW5kQm91bmRzKSB7XHJcblx0XHRcdGxldCBoZWlnaHQgPSB0aGlzLm9wdGlvbnMucmVzaXplTWluSGVpZ2h0IHx8IHRoaXMub3B0aW9ucy5oZWlnaHQgfHxcclxuXHRcdFx0XHRkb20uaGVpZ2h0KHRoaXMudGV4dGFyZWEpO1xyXG5cclxuXHRcdFx0dGhpcy5hdXRvRXhwYW5kQm91bmRzID0ge1xyXG5cdFx0XHRcdG1pbjogaGVpZ2h0LFxyXG5cdFx0XHRcdG1heDogdGhpcy5vcHRpb25zLnJlc2l6ZU1heEhlaWdodCB8fCAoaGVpZ2h0ICogMilcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmFuZ2UgPSBnbG9iYWxEb2MuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0aGlzLnd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHRsZXQgcmVjdCA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0bGV0IGN1cnJlbnQgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMTtcclxuXHRcdGxldCBzcGFjZU5lZWRlZCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7XHJcblx0XHRsZXQgbmV3SGVpZ2h0ID0gdGhpcy5oZWlnaHQoKSArIDEgKyAoc3BhY2VOZWVkZWQgLSBjdXJyZW50KTtcclxuXHJcblx0XHRpZiAoIWlnbm9yZU1heEhlaWdodCAmJiB0aGlzLmF1dG9FeHBhbmRCb3VuZHMubWF4ICE9PSAtMSkge1xyXG5cdFx0XHRuZXdIZWlnaHQgPSBNYXRoLm1pbihuZXdIZWlnaHQsIHRoaXMuYXV0b0V4cGFuZEJvdW5kcy5tYXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuaGVpZ2h0KE1hdGguY2VpbChNYXRoLm1heChuZXdIZWlnaHQsIHRoaXMuYXV0b0V4cGFuZEJvdW5kcy5taW4pKSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIFJUTCBtb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgcnRsXjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBydGwocnRsPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRsZXQgZGlyID0gcnRsID8gJ3J0bCcgOiAnbHRyJztcclxuXHJcblx0XHRpZiAodHlwZW9mIHJ0bCAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdHJldHVybiBkb20uYXR0cih0aGlzLnNvdXJjZUVkaXRvciwgJ2RpcicpID09PSAncnRsJztcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdCb2R5LCAnZGlyJywgZGlyKTtcclxuXHRcdGRvbS5hdHRyKHRoaXMuc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcclxuXHJcblx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdydGwnKTtcclxuXHRcdGRvbS5yZW1vdmVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ2x0cicpO1xyXG5cdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBkaXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb25zICYmIHRoaXMuaWNvbnMucnRsKSB7XHJcblx0XHRcdHRoaXMuaWNvbnMucnRsKHJ0bCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcy9kaXNhYmxlcyBlbW90aWNvbnNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBlbW90aWNvbnNeMlxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4yXHJcblx0ICovXHJcblx0cHVibGljIGVtb3RpY29ucyhlbmFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0aWYgKCFlbmFibGUgJiYgZW5hYmxlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc0VkaXRvci5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQgPSBlbmFibGU7XHJcblxyXG5cdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXByZXNzJywgbnVsbCwgdGhpc0VkaXRvci5lbW90aWNvbnNLZXlQcmVzcyk7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXNFZGl0b3Iuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0dGhpc0VkaXRvci5yZXBsYWNlRW1vdGljb25zKCk7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGVtb3RpY29ucyA9IGRvbS5maW5kKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdpbWdbZGF0YS1lbWxlZGl0b3ItZW1vdGljb25dJyk7XHJcblxyXG5cdFx0XHR1dGlscy5lYWNoKGVtb3RpY29ucywgKF8sIGltZykgPT4ge1xyXG5cdFx0XHRcdGxldCB0ZXh0OiBhbnkgPSBkb20uZGF0YShpbWcsICdlbWxlZGl0b3ItZW1vdGljb24nKTtcclxuXHRcdFx0XHRsZXQgdGV4dE5vZGUgPSB0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxuXHRcdFx0XHRpbWcucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIGltZyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9mZih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBudWxsLCB0aGlzRWRpdG9yLmVtb3RpY29uc0tleVByZXNzKTtcclxuXHJcblx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlTW9kZV4yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgc291cmNlTW9kZShlbmFibGU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBpblNvdXJjZU1vZGUgPSB0aGlzLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgZW5hYmxlICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuIGluU291cmNlTW9kZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoKGluU291cmNlTW9kZSAmJiAhZW5hYmxlKSB8fCAoIWluU291cmNlTW9kZSAmJiBlbmFibGUpKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd2lkdGggb2YgdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogVGhlIHNhdmVXaWR0aCBzcGVjaWZpZXMgaWYgdG8gc2F2ZSB0aGUgd2lkdGguIFRoZSBzdG9yZWQgd2lkdGggY2FuIGJlXHJcblx0ICogdXNlZCBmb3IgdGhpbmdzIGxpa2UgcmVzdG9yaW5nIGZyb20gbWF4aW1pemVkIHN0YXRlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9ICAgICB3aWR0aCAgICAgICAgICAgIFdpZHRoIGluIHBpeGVsc1xyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn1cdFtzYXZlV2lkdGg9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIHdpZHRoXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSB3aWR0aF4zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgd2lkdGgod2lkdGg/OiBudW1iZXIsIHNhdmVXaWR0aD86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0aWYgKCF3aWR0aCAmJiB3aWR0aCAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLndpZHRoKHRoaXMuZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmRpbWVuc2lvbnMod2lkdGgsIG51bGwsIHNhdmVXaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXHJcblx0ICpcclxuXHQgKiBUaGUgc3RvcmVkIGhlaWdodCBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2VcclxuXHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgaGVpZ2h0XjNcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoZWlnaHQoaGVpZ2h0PzogbnVtYmVyLCBzYXZlSGVpZ2h0PzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQodGhpcy5lZGl0b3JDb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGltZW5zaW9ucyhudWxsLCBoZWlnaHQsIHNhdmVIZWlnaHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZW51IGl0ZW0gZHJvcCBkb3duXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW0gVGhlIGJ1dHRvbiB0byBhbGlnbiB0aGUgZHJvcGRvd24gd2l0aFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgICAgICAgICBVc2VkIGZvciBzdHlsaW5nIHRoZSBkcm9wZG93biwgd2lsbCBiZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGNsYXNzIGVtbGVkaXRvci1uYW1lXHJcblx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRlbnQgIFRoZSBIVE1MIGNvbnRlbnQgb2YgdGhlIGRyb3Bkb3duXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY3JlYXRlRHJvcERvd25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjcmVhdGVEcm9wRG93bihtZW51SXRlbTogSFRNTEVsZW1lbnQsIG5hbWU6IHN0cmluZywgY29udGVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdC8vIGZpcnN0IGNsaWNrIGZvciBjcmVhdGUgc2Vjb25kIGNsaWNrIGZvciBjbG9zZVxyXG5cdFx0bGV0IGRyb3BEb3duQ3NzLCBkcm9wRG93bkNsYXNzID0gJ2VtbGVkaXRvci0nICsgbmFtZTtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHRoaXNFZGl0b3IuY2xvc2VEcm9wRG93bigpO1xyXG5cclxuXHRcdC8vIE9ubHkgY2xvc2UgdGhlIGRyb3Bkb3duIGlmIGl0IHdhcyBhbHJlYWR5IG9wZW5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmRyb3Bkb3duICYmIGRvbS5oYXNDbGFzcyh0aGlzRWRpdG9yLmRyb3Bkb3duLCBkcm9wRG93bkNsYXNzKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0ZHJvcERvd25Dc3MgPSB1dGlscy5leHRlbmQoe1xyXG5cdFx0XHR0b3A6IG1lbnVJdGVtLm9mZnNldFRvcCxcclxuXHRcdFx0bGVmdDogbWVudUl0ZW0ub2Zmc2V0TGVmdCxcclxuXHRcdFx0bWFyZ2luVG9wOiBtZW51SXRlbS5jbGllbnRIZWlnaHRcclxuXHRcdH0sIHRoaXNFZGl0b3Iub3B0aW9ucy5kcm9wRG93bkNzcyk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci5kcm9wZG93biA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1kcm9wZG93biAnICsgZHJvcERvd25DbGFzc1xyXG5cdFx0fSkgYXMgYW55O1xyXG5cclxuXHRcdGRvbS5jc3ModGhpc0VkaXRvci5kcm9wZG93biwgZHJvcERvd25Dc3MpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXNFZGl0b3IuZHJvcGRvd24sIGNvbnRlbnQpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCB0aGlzRWRpdG9yLmRyb3Bkb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLmRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIG51bGwsIChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHQvLyBzdG9wIGNsaWNrcyB3aXRoaW4gdGhlIGRyb3Bkb3duIGZyb20gYmVpbmcgaGFuZGxlZFxyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3IuZHJvcGRvd24pIHtcclxuXHRcdFx0bGV0IGZpcnN0ID0gZG9tLmZpbmQodGhpc0VkaXRvci5kcm9wZG93biwgJ2lucHV0LHRleHRhcmVhJylbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGlmIChmaXJzdCkge1xyXG5cdFx0XHRcdGZpcnN0LmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBtYXhpbWl6ZSBJZiB0byBtYXhpbWlzZSB0aGUgZWRpdG9yXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBtYXhpbWl6ZV4yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4aW1pemUobWF4aW1pemU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBtYXhpbWl6ZVNpemUgPSAnZW1sZWRpdG9yLW1heGltaXplJztcclxuXHJcblx0XHRpZiAodXRpbHMuaXNVbmRlZmluZWQobWF4aW1pemUpKSB7XHJcblx0XHRcdHJldHVybiBkb20uaGFzQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWF4aW1pemUgPSAhIW1heGltaXplO1xyXG5cclxuXHRcdGlmIChtYXhpbWl6ZSkge1xyXG5cdFx0XHR0aGlzLm1heGltaXplU2Nyb2xsUG9zaXRpb24gPSBnbG9iYWxXaW4uc2Nyb2xsWTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmRvY3VtZW50RWxlbWVudCwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmJvZHksIG1heGltaXplU2l6ZSwgbWF4aW1pemUpO1xyXG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdHRoaXMud2lkdGgobWF4aW1pemUgPyAnMTAwJScgOiB0aGlzLm9wdGlvbnMud2lkdGgsIGZhbHNlKTtcclxuXHRcdHRoaXMuaGVpZ2h0KG1heGltaXplID8gJzEwMCUnIDogdGhpcy5vcHRpb25zLmhlaWdodCwgZmFsc2UpO1xyXG5cclxuXHRcdGlmICghbWF4aW1pemUpIHtcclxuXHRcdFx0Z2xvYmFsV2luLnNjcm9sbFRvKDAsIHRoaXMubWF4aW1pemVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdXRvRXhwYW5kKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhlIGVkaXRvciwgcmVtb3ZpbmcgYWxsIGVsZW1lbnRzIGFuZFxyXG5cdCAqIGV2ZW50IGhhbmRsZXJzLlxyXG5cdCAqXHJcblx0ICogTGVhdmVzIG9ubHkgdGhlIG9yaWdpbmFsIHRleHRhcmVhLlxyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZGVzdHJveVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGRlc3Ryb3koKSB7XHJcblx0XHQvLyBEb24ndCBkZXN0cm95IGlmIHRoZSBlZGl0b3IgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcclxuXHRcdGlmICghdGhpcy5wbHVnaW5NYW5hZ2VyKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBsdWdpbk1hbmFnZXIuZGVzdHJveSgpO1xyXG5cclxuXHRcdHRoaXMucmFuZ2VIZWxwZXIgPSBudWxsO1xyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5kcm9wZG93bikge1xyXG5cdFx0XHRkb20ucmVtb3ZlKHRoaXMuZHJvcGRvd24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCAnY2xpY2snLCBudWxsLCB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2spO1xyXG5cclxuXHRcdGxldCBmb3JtID0gdGhpcy50ZXh0YXJlYS5mb3JtO1xyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9mZihmb3JtLCAncmVzZXQnLCBudWxsLCB0aGlzLmhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdGRvbS5vZmYoZm9ybSwgJ3N1Ym1pdCcsIG51bGwsIHRoaXMuc2V0VGV4dGFyZWFWYWx1ZSwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYod2luZG93LCAncGFnZWhpZGUnLCBudWxsLCB0aGlzLnNldFRleHRhcmVhVmFsdWUpO1xyXG5cdFx0ZG9tLm9mZih3aW5kb3csICdwYWdlc2hvdycsIG51bGwsIHRoaXMuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5yZW1vdmUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLnRvb2xiYXIpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMudGV4dGFyZWEuX2VtbGVkaXRvcjtcclxuXHRcdGRvbS5zaG93KHRoaXMudGV4dGFyZWEpO1xyXG5cclxuXHRcdHRoaXMudGV4dGFyZWEucmVxdWlyZWQgPSB0aGlzLmlzUmVxdWlyZWQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xvc2VzIGFueSBjdXJyZW50bHkgb3BlbiBkcm9wIGRvd25cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvY3VzPWZhbHNlXSBJZiB0byBmb2N1cyB0aGUgZWRpdG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGNsb3NpbmcgdGhlIGRyb3AgZG93blxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNsb3NlRHJvcERvd25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9zZURyb3BEb3duKGZvY3VzPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMuZHJvcGRvd24pIHtcclxuXHRcdFx0ZG9tLnJlbW92ZSh0aGlzLmRyb3Bkb3duKTtcclxuXHRcdFx0dGhpcy5kcm9wZG93biA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGZvY3VzID09PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwgaW50byBXWVNJV1lHIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIGVuZEh0bWwgaXMgc3BlY2lmaWVkLCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZFxyXG5cdCAqIGJldHdlZW4gaHRtbCBhbmQgZW5kSHRtbC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBodG1sXHJcblx0ICogYW5kIGVuZEh0bWwgd2lsbCBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEh0bWw9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvdmVycmlkZUNvZGVCbG9ja2luZz1mYWxzZV0gSWYgdG8gaW5zZXJ0IHRoZSBodG1sXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludG8gY29kZSB0YWdzLCBieVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGNvZGUgdGFncyBvbmx5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgdGV4dC5cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKGh0bWw6IHN0cmluZywgZW5kSHRtbD86IHN0cmluZywgb3ZlcnJpZGVDb2RlQmxvY2tpbmc/OiBib29sZWFuKSB7XHJcblx0XHRsZXQgbWFya2VyOiBhbnksIHNjcm9sbFRvcCwgc2Nyb2xsVG8sIGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQodGhpcy53eXNpd3lnRWRpdG9yKTtcclxuXHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogVGhpcyBjb2RlIHRhZyBzaG91bGQgYmUgY29uZmlndXJhYmxlIGFuZFxyXG5cdFx0Ly8gc2hvdWxkIG1heWJlIGNvbnZlcnQgdGhlIEhUTUwgaW50byB0ZXh0IGluc3RlYWRcclxuXHRcdC8vIERvbid0IGFwcGx5IHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmICghb3ZlcnJpZGVDb2RlQmxvY2tpbmcgJiYgZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50QmxvY2tOb2RlLCAnY29kZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJbnNlcnQgdGhlIEhUTUwgYW5kIHNhdmUgdGhlIHJhbmdlIHNvIHRoZSBlZGl0b3IgY2FuIGJlIHNjcm9sbGVkXHJcblx0XHQvLyB0byB0aGUgZW5kIG9mIHRoZSBzZWxlY3Rpb24uIEFsc28gYWxsb3dzIGVtb3RpY29ucyB0byBiZSByZXBsYWNlZFxyXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgdGhlIGN1cnNvciBwb3NpdGlvblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5pbnNlcnRIVE1MKGh0bWwsIGVuZEh0bWwpO1xyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdHRoaXMucmVwbGFjZUVtb3RpY29ucygpO1xyXG5cclxuXHRcdC8vIEZpeCBhbnkgaW52YWxpZCBuZXN0aW5nLCBlLmcuIGlmIGEgcXVvdGUgb3Igb3RoZXIgYmxvY2sgaXMgaW5zZXJ0ZWRcclxuXHRcdC8vIGludG8gYSBwYXJhZ3JhcGhcclxuXHRcdGRvbS5maXhOZXN0aW5nKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdHRoaXMud3JhcElubGluZXModGhpcy53eXNpd3lnQm9keSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdC8vIFNjcm9sbCB0aGUgZWRpdG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvblxyXG5cdFx0bWFya2VyID0gZG9tLmZpbmQodGhpcy53eXNpd3lnQm9keSwgJyNlbWxlZGl0b3ItZW5kLW1hcmtlcicpWzBdO1xyXG5cdFx0ZG9tLnNob3cobWFya2VyKTtcclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMud3lzaXd5Z0JvZHkuc2Nyb2xsVG9wO1xyXG5cdFx0c2Nyb2xsVG8gPSAoKGRvbS5nZXRPZmZzZXQobWFya2VyKSBhcyBhbnkpLnRvcCArXHJcblx0XHRcdChtYXJrZXIub2Zmc2V0SGVpZ2h0ICogMS41KSkgLSBlZGl0b3JIZWlnaHQ7XHJcblx0XHRkb20uaGlkZShtYXJrZXIpO1xyXG5cclxuXHRcdC8vIE9ubHkgc2Nyb2xsIGlmIG1hcmtlciBpc24ndCBhbHJlYWR5IHZpc2libGVcclxuXHRcdGlmIChzY3JvbGxUbyA+IHNjcm9sbFRvcCB8fCBzY3JvbGxUbyArIGVkaXRvckhlaWdodCA8IHNjcm9sbFRvcCkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHNjcm9sbFRvO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XHJcblx0XHR0aGlzLnJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cclxuXHRcdC8vIEFkZCBhIG5ldyBsaW5lIGFmdGVyIHRoZSBsYXN0IGJsb2NrIGVsZW1lbnRcclxuXHRcdC8vIHNvIGNhbiBhbHdheXMgYWRkIHRleHQgYWZ0ZXIgaXRcclxuXHRcdHRoaXMuYXBwZW5kTmV3TGluZSgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgZXhjZXB0IGl0IHdpbGwgY29udmVydCBhbnkgSFRNTFxyXG5cdCAqIGludG8gdGV4dCBiZWZvcmUgaW5zZXJ0aW5nIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCksIGVzY2FwZS5lbnRpdGllcyhlbmRUZXh0KVxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIHRleHQgaW50byB0aGUgV1lTSVdZRyBvciBzb3VyY2UgZWRpdG9yIGRlcGVuZGluZyBvbiB3aGljaFxyXG5cdCAqIG1vZGUgdGhlIGVkaXRvciBpcyBpbi5cclxuXHQgKlxyXG5cdCAqIElmIGVuZFRleHQgaXMgc3BlY2lmaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiB0ZXh0IGFuZCBlbmRUZXh0LiBJZiBubyB0ZXh0IGlzIHNlbGVjdGVkIHRleHQgYW5kIGVuZFRleHQgd2lsbFxyXG5cdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluc2VydFRleHRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICh0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCh0ZXh0LCBlbmRUZXh0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBidXQgaW5zZXJ0cyB0ZXh0IGludG8gdGhlXHJcblx0ICogc291cmNlIG1vZGUgZWRpdG9yIGluc3RlYWQuXHJcblx0ICpcclxuXHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogVGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBhZnRlciB0aGUgdGV4dCBwYXJhbS4gSWYgZW5kVGV4dCBpc1xyXG5cdCAqIHNwZWNpZmllZCB0aGUgY3Vyc29yIHdpbGwgYmUgcGxhY2VkIGJlZm9yZSBlbmRUZXh0LCBzbyBwYXNzaW5nOjxiciAvPlxyXG5cdCAqXHJcblx0ICogJ1tiXScsICdbL2JdJ1xyXG5cdCAqXHJcblx0ICogV291bGQgY2F1c2UgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQ6PGJyIC8+XHJcblx0ICpcclxuXHQgKiBbYl1TZWxlY3RlZCB0ZXh0fFsvYl1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRUZXh0PW51bGxdXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckluc2VydFRleHQodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGxldCBzY3JvbGxUb3AsIGN1cnJlbnRWYWx1ZSwgc3RhcnRQb3MgPSB0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCwgZW5kUG9zID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kO1xyXG5cclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMuc291cmNlRWRpdG9yLnNjcm9sbFRvcDtcclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHRjdXJyZW50VmFsdWUgPSB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZW5kVGV4dCkge1xyXG5cdFx0XHR0ZXh0ICs9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoc3RhcnRQb3MsIGVuZFBvcykgKyBlbmRUZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnZhbHVlID0gY3VycmVudFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgK1xyXG5cdFx0XHR0ZXh0ICtcclxuXHRcdFx0Y3VycmVudFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIGN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gKHN0YXJ0UG9zICsgdGV4dC5sZW5ndGgpIC1cclxuXHRcdFx0KGVuZFRleHQgPyBlbmRUZXh0Lmxlbmd0aCA6IDApO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQ7XHJcblxyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHR9O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGUgcmFuZ2VIZWxwZXIgY2xhc3NcclxuXHQgKiBmb3IgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge1JhbmdlSGVscGVyfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGdldFJhbmdlSGVscGVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmFuZ2VIZWxwZXIoKTogUmFuZ2VIZWxwZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMucmFuZ2VIZWxwZXI7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgc291cmNlIGVkaXRvciBjYXJldCBwb3NpdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcG9zaXRpb25dXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjVcclxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JDYXJldFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckNhcmV0KHBvc2l0aW9uOiBhbnkpOiBhbnkge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQgPSBwb3NpdGlvbi5zdGFydDtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gcG9zaXRpb24uZW5kO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwvQkJDb2RlIGludG8gdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogSWYgZW5kIGlzIHN1cHBsaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiBzdGFydCBhbmQgZW5kLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IHN0YXJ0IGFuZCBlbmRcclxuXHQgKiB3aWxsIGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogSWYgdGhlIGZpbHRlciBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgdGhlIEhUTUwvQkJDb2RlIHdpbGwgYmVcclxuXHQgKiBwYXNzZWQgdGhyb3VnaCBhbnkgcGx1Z2luIGZpbHRlcnMuIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogdGhpcyB3aWxsIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0ICpcclxuXHQgKiBJZiB0aGUgYWxsb3dNaXhlZCBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgSFRNTCBhbnkgd2lsbCBub3QgYmVcclxuXHQgKiBlc2NhcGVkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZD1udWxsXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnZlcnRFbW90aWNvbnM9dHJ1ZV0gSWYgdG8gY29udmVydCBlbW90aWNvbnNcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxvd01peGVkPWZhbHNlXVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgaW5zZXJ0XjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnNlcnQoc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcsIGZpbHRlcjogYm9vbGVhbiwgY29udmVydEVtb3RpY29uczogYm9vbGVhbiwgYWxsb3dNaXhlZDogYm9vbGVhblxyXG5cdCk6IGFueSB7XHJcblx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvckluc2VydFRleHQoc3RhcnQsIGVuZCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCB0aGUgc2VsZWN0aW9uIGJldHdlZW4gc3RhcnQgYW5kIGVuZFxyXG5cdFx0aWYgKGVuZCkge1xyXG5cdFx0XHRsZXQgaHRtbCA9IHRoaXMucmFuZ2VIZWxwZXIuc2VsZWN0ZWRIdG1sKCk7XHJcblxyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb1NvdXJjZScgaW4gdGhpcy5mb3JtYXQpIHtcclxuXHRcdFx0XHRodG1sID0gdGhpcy5mb3JtYXRcclxuXHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKGh0bWwsIHRoaXMud3lzaXd5Z0RvY3VtZW50LCB0aGlzLmN1cnJlbnROb2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RhcnQgKz0gaHRtbCArIGVuZDtcclxuXHRcdH1cclxuXHRcdC8vIFRPRE86IFRoaXMgZmlsdGVyIHNob3VsZCBhbGxvdyBlbXB0eSB0YWdzIGFzIGl0J3MgaW5zZXJ0aW5nLlxyXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRzdGFydCA9IHRoaXMuZm9ybWF0LmZyYWdtZW50VG9IdG1sKHN0YXJ0LCB0aGlzLmN1cnJlbnROb2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb252ZXJ0IGFueSBlc2NhcGVkIEhUTUwgYmFjayBpbnRvIEhUTUwgaWYgbWl4ZWQgaXMgYWxsb3dlZFxyXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgYWxsb3dNaXhlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRzdGFydCA9IHN0YXJ0LnJlcGxhY2UoLyZsdDsvZywgJzwnKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcclxuXHRcdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgJyYnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKHN0YXJ0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcnMgSFRNTCB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIElmIHVzaW5nIGEgcGx1Z2luIHRoYXQgZmlsdGVycyB0aGUgSHQgTWwgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyAoQkJDb2RlKSB1bmxlc3MgdGhlXHJcblx0ICogZmlsdGVyIHBhcmFtIGlzIHNldCB0byBmYWxzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7P2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZ2V0V3lzaXd5Z0VkaXRvclZhbHVlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcj86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG5cdFx0bGV0IGh0bWw7XHJcblx0XHQvLyBDcmVhdGUgYSB0bXAgbm9kZSB0byBzdG9yZSBjb250ZW50cyBzbyBpdCBjYW4gYmUgbW9kaWZpZWRcclxuXHRcdC8vIHdpdGhvdXQgYWZmZWN0aW5nIGFueXRoaW5nIGVsc2UuXHJcblx0XHRsZXQgdG1wID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRsZXQgY2hpbGROb2RlcyA9IHRoaXMud3lzaXd5Z0JvZHkuY2hpbGROb2RlcztcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRtcCwgKGNoaWxkTm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0JvZHksIHRtcCk7XHJcblx0XHRkb20uZml4TmVzdGluZyh0bXApO1xyXG5cdFx0ZG9tLnJlbW92ZSh0bXApO1xyXG5cclxuXHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xyXG5cclxuXHRcdC8vIGZpbHRlciB0aGUgSFRNTCBhbmQgRE9NIHRocm91Z2ggYW55IHBsdWdpbnNcclxuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmZvcm1hdCwgJ3RvU291cmNlJykpIHtcclxuXHRcdFx0aHRtbCA9IHRoaXMuZm9ybWF0LnRvU291cmNlKGh0bWwsIHRoaXMud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaHRtbDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Qm9keVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGdldEJvZHkoKTogSFRNTEJvZHlFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLnd5c2l3eWdCb2R5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjb250YWluZXIgYXJlYSAod2hvbGUgaUZyYW1lKS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqIEBuYW1lIGdldENvbnRlbnRBcmVhQ29udGFpbmVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q29udGVudEFyZWFDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHRoaXMud3lzaXd5Z0VkaXRvcjtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IFtwYXJhbV1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBleGVjQ29tbWFuZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IGFueSk6IHZvaWQge1xyXG5cdFx0bGV0IGV4ZWN1dGVkID0gZmFsc2UsIGNvbW1hbmRPYmogPSB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdO1xyXG5cclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBtYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0Ly8gZG9uJ3QgYXBwbHkgYW55IGNvbW1hbmRzIHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmIChkb20uY2xvc2VzdCh0aGlzLnJhbmdlSGVscGVyLnBhcmVudE5vZGUoKSwgJ2NvZGUnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZXhlY3V0ZWQgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgcGFyYW0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdC8vIHNob3cgZXJyb3IgaWYgZXhlY3V0aW9uIGZhaWxlZCBhbmQgYW4gZXJyb3IgbWVzc2FnZSBleGlzdHNcclxuXHRcdGlmICghZXhlY3V0ZWQgJiYgY29tbWFuZE9iaiAmJiBjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkge1xyXG5cdFx0XHRhbGVydCh0aGlzLnRyYW5zbGF0ZShjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zbGF0ZXMgdGhlIHN0cmluZyBpbnRvIHRoZSBsb2NhbGUgbGFuZ3VhZ2UuXHJcblx0ICpcclxuXHQgKiBSZXBsYWNlcyBhbnkgezB9LCB7MX0sIHsyfSwgZWN0LiB3aXRoIHRoZSBwYXJhbXMgcHJvdmlkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcblx0ICogQHBhcmFtIHsuLi5TdHJpbmd9IGFyZ3NcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgX1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZSguLi5hcmdzOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHVuZGVmOiBhbnk7XHJcblxyXG5cdFx0aWYgKHRoaXMubG9jYWxlICYmIHRoaXMubG9jYWxlW2FyZ3NbMF1dKSB7XHJcblx0XHRcdGFyZ3NbMF0gPSB0aGlzLmxvY2FsZVthcmdzWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXJnc1swXS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKHN0cj86IGFueSwgcDE/OiBhbnkpID0+IHtcclxuXHRcdFx0cmV0dXJuIGFyZ3NbcDEgLSAwICsgMV0gIT09IHVuZGVmID9cclxuXHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcclxuXHRcdFx0XHQneycgKyBwMSArICd9JztcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGEgaGFuZGxlciB0byB0aGUgc3BlY2lmaWVkIGV2ZW50c1xyXG5cdCAqXHJcblx0ICogVGhpcyBmdW5jdGlvbiBvbmx5IGJpbmRzIHRvIGEgbGltaXRlZCBsaXN0IG9mXHJcblx0ICogc3VwcG9ydGVkIGV2ZW50cy5cclxuXHQgKlxyXG5cdCAqIFRoZSBzdXBwb3J0ZWQgZXZlbnRzIGFyZTpcclxuXHQgKlxyXG5cdCAqICoga2V5dXBcclxuXHQgKiAqIGtleWRvd25cclxuXHQgKiAqIEtleXByZXNzXHJcblx0ICogKiBibHVyXHJcblx0ICogKiBmb2N1c1xyXG5cdCAqICogaW5wdXRcclxuXHQgKiAqIG5vZGVjaGFuZ2VkIC0gV2hlbiB0aGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmdcclxuXHQgKiBcdFx0dGhlIHNlbGVjdGlvbiBjaGFuZ2VzIGluIFdZU0lXWUcgbW9kZVxyXG5cdCAqICogY29udGV4dG1lbnVcclxuXHQgKiAqIHNlbGVjdGlvbmNoYW5nZWRcclxuXHQgKiAqIHZhbHVlY2hhbmdlZFxyXG5cdCAqXHJcblx0ICpcclxuXHQgKiBUaGUgZXZlbnRzIHBhcmFtIHNob3VsZCBiZSBhIHN0cmluZyBjb250YWluaW5nIHRoZSBldmVudChzKVxyXG5cdCAqIHRvIGJpbmQgdGhpcyBoYW5kbGVyIHRvLiBJZiBtdWx0aXBsZSwgdGhleSBzaG91bGQgYmUgc2VwYXJhdGVkXHJcblx0ICogYnkgc3BhY2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBldmVudHNcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7RW1sRWRpdG9yfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGJpbmRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBiaW5kKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IGV2ZW50c0FyciA9IGV2ZW50cy5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGxldCBpID0gZXZlbnRzQXJyLmxlbmd0aDtcclxuXHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRsZXQgd3lzRXZlbnQgPSAnZW1sd3lzJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHRsZXQgc3JjRXZlbnQgPSAnZW1sc3JjJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHQvLyBVc2UgY3VzdG9tIGV2ZW50cyB0byBhbGxvdyBwYXNzaW5nIHRoZSBpbnN0YW5jZSBhcyB0aGVcclxuXHRcdFx0XHQvLyAybmQgYXJndW1lbnQuXHJcblx0XHRcdFx0Ly8gQWxzbyBhbGxvd3MgdW5iaW5kaW5nIHdpdGhvdXQgdW5iaW5kaW5nIHRoZSBlZGl0b3JzIG93blxyXG5cdFx0XHRcdC8vIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0XHRcdGlmICghZXhjbHVkZVd5c2l3eWcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gPSB0aGlzLmV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdIHx8IFtdO1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzW3d5c0V2ZW50XS5wdXNoKGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdID0gdGhpcy5ldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFN0YXJ0IHNlbmRpbmcgdmFsdWUgY2hhbmdlZCBldmVudHNcclxuXHRcdFx0XHRpZiAoZXZlbnRzQXJyW2ldID09PSAndmFsdWVjaGFuZ2VkJykge1xyXG5cdFx0XHRcdFx0dGhpcy5oYXNIYW5kbGVyID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBVbmJpbmRzIGFuIGV2ZW50IHRoYXQgd2FzIGJvdW5kIHVzaW5nIGJpbmQoKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgdW5iaW5kaW5nIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyIGZyb20gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHVuYmluZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQHNlZSBiaW5kXHJcblx0ICovXHJcblx0cHVibGljIHVuYmluZChldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBldmVudHNBcnIgPSBldmVudHMuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRsZXQgaSA9IGV2ZW50c0Fyci5sZW5ndGg7XHJcblx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0aWYgKCFleGNsdWRlV3lzaXd5Zykge1xyXG5cdFx0XHRcdFx0dXRpbHMuYXJyYXlSZW1vdmUoXHJcblx0XHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1snZW1sd3lzJyArIGV2ZW50c0FycltpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzWydlbWxzcmMnICsgZXZlbnRzQXJyW2ldXSB8fCBbXSwgaGFuZGxlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBkb3duIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlEb3duXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMga2V5RG93bihoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5ZG93bicsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUga2V5IHByZXNzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlQcmVzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIGtleVByZXNzKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHQuYmluZCgna2V5cHJlc3MnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSB1cCBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5VXBcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBrZXlVcChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5dXAnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIG5vZGVDaGFuZ2VkXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMgbm9kZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnbm9kZWNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHNlbGVjdGlvbiBjaGFuZ2VkIGV2ZW50XHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIHNlbGVjdGlvbkNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnc2VsZWN0aW9uY2hhbmdlZCcsIGhhbmRsZXIsIGZhbHNlLCB0cnVlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgdmFsdWUgY2hhbmdlZCBldmVudFxyXG5cdCAqXHJcblx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgY3VycmVudCBlZGl0b3IgdmFsdWUgY2hhbmdlcy5cclxuXHQgKlxyXG5cdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdCAqIDEuNSBzZWNzIGFmdGVyIHRleHQgaXMgdHlwZWQuIElmIGEgc3BhY2UgaXMgdHlwZWQgaXQgd2lsbFxyXG5cdCAqIGNhdXNlIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZlxyXG5cdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuNVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdHJldHVybiB0aGlzXHJcblx0XHRcdC5iaW5kKCd2YWx1ZWNoYW5nZWQnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBXWVNJV1lHIGVkaXRvcnMgaW5saW5lIENTU1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjc3NcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc14yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjNcclxuXHQgKi9cclxuXHRwdWJsaWMgY3NzKGNzczogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICghdGhpcy5pbmxpbmVDc3MpIHtcclxuXHRcdFx0dGhpcy5pbmxpbmVDc3MgPSBkb20uY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7XHJcblx0XHRcdFx0aWQ6ICdpbmxpbmUnXHJcblx0XHRcdH0sIHRoaXMud3lzaXd5Z0RvY3VtZW50KSBhcyBIVE1MU3R5bGVFbGVtZW50O1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0RvY3VtZW50LmhlYWQsIHRoaXMuaW5saW5lQ3NzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKGNzcykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5saW5lQ3NzLnNoZWV0ID9cclxuXHRcdFx0XHR0aGlzLmlubGluZUNzcy5pbm5lclRleHQgOiB0aGlzLmlubGluZUNzcy5pbm5lckhUTUw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5saW5lQ3NzLnNoZWV0KSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgc2hvcnRjdXQgaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gc2hvcnRjdXRcclxuXHQgKiBAcmV0dXJuIHtFbWxFZGl0b3J9XHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZVNob3J0Y3V0KHNob3J0Y3V0OiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0ZGVsZXRlIHRoaXMuc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgc2hvcnRjdXQgaGFuZGxlciB0byB0aGUgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICBzaG9ydGN1dFxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gY21kXHJcblx0ICogQHJldHVybiB7ZW1sZWRpdG9yfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRTaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nLCBjbWQ6IHN0cmluZyB8IEZ1bmN0aW9uKTogYW55IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKVxyXG5cdFx0bGV0IHNob3J0Y3V0S2V5ID0gc2hvcnRjdXQgYXMga2V5b2YgdHlwZW9mIHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVycztcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoY21kKSkge1xyXG5cdFx0XHRsZXQgc3RyQ21kID0gY21kIGFzIHN0cmluZztcclxuXHRcdFx0dGhpc0VkaXRvci5zaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0S2V5XSA9ICgpID0+IHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUNvbW1hbmQodGhpc0VkaXRvci50b29sYmFyQnV0dG9uc1tzdHJDbWRdLCB0aGlzRWRpdG9yLmNvbW1hbmRzW3N0ckNtZF0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRLZXldID0gY21kO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgZm9ybWF0dGluZyBvZiB0aGUgcGFzc2VkIGJsb2NrIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBJZiBibG9jayBpcyBmYWxzZSwgaWYgd2lsbCBjbGVhciB0aGUgc3R5bGluZyBvZiB0aGUgZmlyc3RcclxuXHQgKiBibG9jayBsZXZlbCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGN1cnNvci5cclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gYmxvY2tcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xlYXJCbG9ja0Zvcm1hdHRpbmcoYmxvY2s6IEhUTUxFbGVtZW50KTogYW55IHtcclxuXHRcdGJsb2NrID0gYmxvY2sgfHwgdGhpcy5jdXJyZW50U3R5bGVkQmxvY2tOb2RlKCk7XHJcblxyXG5cdFx0aWYgKCFibG9jayB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRibG9jay5jbGFzc05hbWUgPSAnJztcclxuXHJcblx0XHRkb20uYXR0cihibG9jaywgJ3N0eWxlJywgJycpO1xyXG5cclxuXHRcdGlmICghZG9tLmlzKGJsb2NrLCAncCxkaXYsdGQnKSkge1xyXG5cdFx0XHRkb20uY29udmVydEVsZW1lbnQoYmxvY2ssICdwJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8vI2VuZHJlZ2lvblxyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogUHVibGljIHN0YXRpY1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cdC8vIFN0YXRpY1xyXG5cdHB1YmxpYyBzdGF0aWMgbG9jYWxlOiBhbnkgPSB7fTtcclxuXHRwdWJsaWMgc3RhdGljIGZvcm1hdHM6IGFueSA9IHt9O1xyXG5cdHB1YmxpYyBzdGF0aWMgaWNvbnM6IGFueSA9IHt9O1xyXG5cdHB1YmxpYyBzdGF0aWMgY29tbWFuZDogYW55ID0ge1xyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGEgY29tbWFuZFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R8bnVsbH1cclxuXHRcdCAqIEBzaW5jZSB2MS4zLjVcclxuXHRcdCAqL1xyXG5cdFx0Z2V0OiAobjoga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcyk6IG9iamVjdCB8IG51bGwgPT4ge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdENvbW1hbmRzW25dIHx8IG51bGw7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogPHA+QWRkcyBhIGNvbW1hbmQgdG8gdGhlIGVkaXRvciBvciB1cGRhdGVzIGFuIGV4aXN0aW5nXHJcblx0XHQgKiBjb21tYW5kIGlmIGEgY29tbWFuZCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbHJlYWR5IGV4aXN0cy48L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogPHA+T25jZSBhIGNvbW1hbmQgaXMgYWRkIGl0IGNhbiBiZSBpbmNsdWRlZCBpbiB0aGUgdG9vbGJhciBieVxyXG5cdFx0ICogYWRkaW5nIGl0J3MgbmFtZSB0byB0aGUgdG9vbGJhciBvcHRpb24gaW4gdGhlIGNvbnN0cnVjdG9yLiBJdFxyXG5cdFx0ICogY2FuIGFsc28gYmUgZXhlY3V0ZWQgbWFudWFsbHkgYnkgY2FsbGluZ1xyXG5cdFx0ICoge0BsaW5rIGVtbGVkaXRvci5leGVjQ29tbWFuZH08L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogQGV4YW1wbGVcclxuXHRcdCAqIEVtbEVkaXRvci5jb21tYW5kLnNldChcImhlbGxvXCIsXHJcblx0XHQgKiB7XHJcblx0XHQgKiAgICAgZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0ICogICAgICAgICBhbGVydChcIkhlbGxvIFdvcmxkIVwiKTtcclxuXHRcdCAqICAgICB9XHJcblx0XHQgKiB9KTtcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGNtZFxyXG5cdFx0ICogQHJldHVybiB7dGhpc3xmYWxzZX0gUmV0dXJucyBmYWxzZSBpZiBuYW1lIG9yIGNtZCBpcyBmYWxzZVxyXG5cdFx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdFx0ICovXHJcblx0XHRzZXQ6IChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzLCBjbWQ6IGFueSk6IGFueSB8IGZhbHNlID0+IHtcclxuXHRcdFx0aWYgKCFuYW1lIHx8ICFjbWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIG1lcmdlIGFueSBleGlzdGluZyBjb21tYW5kIHByb3BlcnRpZXNcclxuXHRcdFx0Y21kID0gdXRpbHMuZXh0ZW5kKGRlZmF1bHRDb21tYW5kc1tuYW1lXSB8fCB7fSwgY21kKTtcclxuXHJcblx0XHRcdGNtZC5yZW1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdFx0RW1sRWRpdG9yLmNvbW1hbmQucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZGVmYXVsdENvbW1hbmRzW25hbWVdID0gY21kO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmVzIGEgY29tbWFuZFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdFx0ICovXHJcblx0XHRyZW1vdmU6IChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzKTogYW55ID0+IHtcclxuXHRcdFx0aWYgKGRlZmF1bHRDb21tYW5kc1tuYW1lXSkge1xyXG5cdFx0XHRcdGRlbGV0ZSBkZWZhdWx0Q29tbWFuZHNbbmFtZV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvLyNlbmRyZWdpb25cclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAqIFByaXZhdGUgbWVtYmVyc1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cclxuXHQvKipcclxuXHQgKiBET01QdXJpZnlcclxuXHQgKi9cclxuXHRwcml2YXRlIGRvbVB1cmlmeTogRE9NUHVyaWZ5LkRPTVB1cmlmeUlcclxuXHJcblx0LyoqXHJcblx0ICogRWRpdG9yIGZvcm1hdCBsaWtlIEJCQ29kZSBvciBIVE1MXHJcblx0ICovXHJcblx0cHJpdmF0ZSBmb3JtYXQ6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFwIG9mIGV2ZW50cyBoYW5kbGVycyBib3VuZCB0byB0aGlzIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZXZlbnRIYW5kbGVyczogYW55ID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHdpbmRvd1xyXG5cdCAqXHJcblx0ICogQHR5cGUge1dpbmRvd31cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z1dpbmRvdzogV2luZG93O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGJvZHkgZWxlbWVudFxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxCb2R5RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z0JvZHk6IEhUTUxCb2R5RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgZHJvcGRvd25cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZHJvcGRvd246IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgdXNlciBpcyBjdXJyZW50bHkgY29tcG9zaW5nIHRleHQgdmlhIElNRVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNDb21wb3Npbmc6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRpbWVyIGZvciB2YWx1ZUNoYW5nZWQga2V5IGhhbmRsZXJcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdmFsdWVDaGFuZ2VkS2V5VXBUaW1lcjogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBsb2NhbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBsb2NhbGU6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcmVzIGEgY2FjaGUgb2YgcHJlbG9hZGVkIGltYWdlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAdHlwZSB7QXJyYXkuPEhUTUxJbWFnZUVsZW1lbnQ+fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcHJlTG9hZENhY2hlOiBhbnkgPSBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PjtcclxuXHJcblx0LyoqXHJcblx0ICogUGx1Z2luIG1hbmFnZXIgaW5zdGFuY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtQbHVnaW5NYW5hZ2VyfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqXHJcblx0ICogQHR5cGUge05vZGV9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGN1cnJlbnROb2RlOiBOb2RlO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBjdXJyZW50IG5vZGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtub2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50QmxvY2tOb2RlOiBIVE1MRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVXNlZCB0byBtYWtlIHN1cmUgb25seSAxIHNlbGVjdGlvbiBjaGFuZ2VkXHJcblx0ICogY2hlY2sgaXMgY2FsbGVkIGV2ZXJ5IDEwMG1zLlxyXG5cdCAqXHJcblx0ICogSGVscHMgaW1wcm92ZSBwZXJmb3JtYW5jZSBhcyBpdCBpcyBjaGVja2VkIGEgbG90LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiBjb250ZW50IGlzIHJlcXVpcmVkIChlcXVpdmFsZW50IHRvIHRoZSBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUpXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNSZXF1aXJlZDogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGlubGluZSBDU1Mgc3R5bGUgZWxlbWVudC4gV2lsbCBiZSB1bmRlZmluZWRcclxuXHQgKiB1bnRpbCBjc3MoKSBpcyBjYWxsZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxTdHlsZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGlubGluZUNzczogSFRNTFN0eWxlRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogT2JqZWN0IGNvbnRhaW5pbmcgYSBsaXN0IG9mIHNob3J0Y3V0IGhhbmRsZXJzXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG9ydGN1dEhhbmRsZXJzOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1pbiBhbmQgbWF4IGhlaWdodHMgdGhhdCBhdXRvRXhwYW5kIHNob3VsZCBzdGF5IHdpdGhpblxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b0V4cGFuZEJvdW5kczogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaW1lb3V0IGZvciB0aGUgYXV0b0V4cGFuZCBmdW5jdGlvbiB0byB0aHJvdHRsZSBjYWxsc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGF1dG9FeHBhbmRUaHJvdHRsZTogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBMYXN0IHNjcm9sbCBwb3NpdGlvbiBiZWZvcmUgbWF4aW1pemluZyBzb1xyXG5cdCAqIGl0IGNhbiBiZSByZXN0b3JlZCB3aGVuIGZpbmlzaGVkLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge251bWJlcn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbWF4aW1pemVTY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBTdG9yZXMgdGhlIGNvbnRlbnRzIHdoaWxlIGEgcGFzdGUgaXMgdGFraW5nIHBsYWNlLlxyXG5cdCAqXHJcblx0ICogTmVlZGVkIHRvIHN1cHBvcnQgYnJvd3NlcnMgdGhhdCBsYWNrIGNsaXBib2FyZCBBUEkgc3VwcG9ydC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHs/RG9jdW1lbnRGcmFnbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcGFzdGVDb250ZW50RnJhZ21lbnQ6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogQWxsIHRoZSBlbW90aWNvbnMgZnJvbSBkcm9wZG93biwgbW9yZSBhbmQgaGlkZGVuIGNvbWJpbmVkXHJcblx0ICogYW5kIHdpdGggdGhlIGVtb3RpY29ucyByb290IHNldFxyXG5cdCAqXHJcblx0ICogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhbGxFbW90aWNvbnM6IGFueSA9IHt9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXJyZW50IGljb24gc2V0IGlmIGFueVxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9PYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGljb25zOiBhbnkgfCBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbiBhcnJheSBvZiBidXR0b24gc3RhdGUgaGFuZGxlcnNcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtBcnJheS48T2JqZWN0Pn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYnRuU3RhdGVIYW5kbGVyczogYW55ID0gW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHRvb2xiYXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdG9vbGJhcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBXWVNJV1lHIGVkaXRvcnMgZG9jdW1lbnRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEb2N1bWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z0RvY3VtZW50OiBEb2N1bWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyBpZiBidXR0b25zIGFyZSBhY3RpdmUgb3Igbm90XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZUFjdGl2ZUJ1dHRvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0bGV0IGFjdGl2ZUNsYXNzID0gJ2FjdGl2ZSc7XHJcblx0XHRsZXQgZG9jID0gdGhpcy53eXNpd3lnRG9jdW1lbnQ7XHJcblx0XHRsZXQgaXNTb3VyY2UgPSB0aGlzLnNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5yZWFkT25seSgpKSB7XHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQodGhpcy50b29sYmFyLCBhY3RpdmVDbGFzcyksIChfLCBtZW51SXRlbSkgPT4ge1xyXG5cdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhtZW51SXRlbSwgYWN0aXZlQ2xhc3MpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghaXNTb3VyY2UpIHtcclxuXHRcdFx0cGFyZW50ID0gdGhpcy5yYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblx0XHRcdGZpcnN0QmxvY2sgPSB0aGlzLnJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQocGFyZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYnRuU3RhdGVIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRsZXQgc3RhdGUgPSAwO1xyXG5cdFx0XHRsZXQgYnRuID0gdGhpcy50b29sYmFyQnV0dG9uc1t0aGlzLmJ0blN0YXRlSGFuZGxlcnNbal0ubmFtZV07XHJcblx0XHRcdGxldCBzdGF0ZUZuID0gdGhpcy5idG5TdGF0ZUhhbmRsZXJzW2pdLnN0YXRlO1xyXG5cdFx0XHRsZXQgaXNEaXNhYmxlZCA9IChpc1NvdXJjZSAmJiAhYnRuLl9lbWxUeHRNb2RlKSB8fFxyXG5cdFx0XHRcdCghaXNTb3VyY2UgJiYgIWJ0bi5fZW1sV3lzaXd5Z01vZGUpO1xyXG5cclxuXHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XHJcblx0XHRcdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtZGVwdGhcclxuXHRcdFx0XHRcdFx0aWYgKHN0YXRlID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRTdGF0ZShzdGF0ZUZuKSA/IDEgOiAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0Rpc2FibGVkKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBzdGF0ZUZuLmNhbGwodGhpcywgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCB8fCBzdGF0ZSA8IDApO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCBhY3RpdmVDbGFzcywgc3RhdGUgPiAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pY29ucyAmJiB0aGlzLmljb25zLnVwZGF0ZSkge1xyXG5cdFx0XHR0aGlzLmljb25zLnVwZGF0ZShpc1NvdXJjZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWNoZSBvZiB0aGUgY3VycmVudCB0b29sYmFyIGJ1dHRvbnNcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHRvb2xiYXJCdXR0b25zOiBhbnkgPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdG9vbGJhciB0byBkaXNhYmxlL2VuYWJsZSB0aGUgYXBwcm9wcmlhdGUgYnV0dG9uc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVUb29sQmFyID0gKGRpc2FibGU/OiBib29sZWFuKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgbW9kZSA9IHRoaXMuaW5Tb3VyY2VNb2RlKCkgPyAnX2VtbFR4dE1vZGUnIDogJ19lbWxXeXNpd3lnTW9kZSc7XHJcblxyXG5cdFx0dXRpbHMuZWFjaCh0aGlzLnRvb2xiYXJCdXR0b25zLCAoXywgYnV0dG9uKSA9PiB7XHJcblx0XHRcdGRvbS50b2dnbGVDbGFzcyhidXR0b24sICdkaXNhYmxlZCcsIGRpc2FibGUgfHwgIWJ1dHRvblttb2RlXSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBpZnJhbWUgd2hpY2ggc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHd5c2l3eWdFZGl0b3I6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyB0ZXh0YXJlYSBmb3Igdmlld2luZyBzb3VyY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MVGV4dEFyZWFFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBzb3VyY2VFZGl0b3I6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IG5vZGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50U2VsZWN0aW9uOiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHJhbmdlSGVscGVyIGluc3RhbmNlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UmFuZ2VIZWxwZXJ9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHJhbmdlSGVscGVyOiBSYW5nZUhlbHBlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRpdiB3aGljaCBjb250YWlucyB0aGUgZWRpdG9yIGFuZCB0b29sYmFyXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGVkaXRvckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBub2RlIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdCAqIHRoZSBub2RlY2hhbmdlZCBldmVudCBpZiBpdCBoYXNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tOb2RlQ2hhbmdlZCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdC8vIGNoZWNrIGlmIG5vZGUgaGFzIGNoYW5nZWRcclxuXHRcdGxldCBvbGROb2RlLCBub2RlID0gdGhpcy5yYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudE5vZGUgIT09IG5vZGUpIHtcclxuXHRcdFx0b2xkTm9kZSA9IHRoaXMuY3VycmVudE5vZGU7XHJcblx0XHRcdHRoaXMuY3VycmVudE5vZGUgPSBub2RlO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCbG9ja05vZGUgPSB0aGlzLnJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ25vZGVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdG9sZE5vZGU6IG9sZE5vZGUsXHJcblx0XHRcdFx0bmV3Tm9kZTogdGhpcy5jdXJyZW50Tm9kZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGlmcmFtZSBhbmQgdGV4dGFyZWFcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHRoaXMudGV4dGFyZWEuX2VtbGVkaXRvciA9IHRoaXM7XHJcblxyXG5cclxuXHRcdC8vIExvYWQgbG9jYWxlXHJcblx0XHRpZiAodGhpc0VkaXRvci5vcHRpb25zLmxvY2FsZSAmJiB0aGlzRWRpdG9yLm9wdGlvbnMubG9jYWxlICE9PSAnZW4nKSB7XHJcblx0XHRcdHRoaXNFZGl0b3IuaW5pdExvY2FsZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWNvbnRhaW5lcicsXHJcblx0XHR9KSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0XHRkb20uaW5zZXJ0QmVmb3JlKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCB0aGlzRWRpdG9yLnRleHRhcmVhKTtcclxuXHRcdGRvbS5jc3ModGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsICd6LWluZGV4JywgdGhpc0VkaXRvci5vcHRpb25zLnpJbmRleCk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci5pc1JlcXVpcmVkID0gdGhpc0VkaXRvci50ZXh0YXJlYS5yZXF1aXJlZDtcclxuXHRcdHRoaXNFZGl0b3IudGV4dGFyZWEucmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcblx0XHRsZXQgRm9ybWF0Q3RvciA9IEVtbEVkaXRvci5mb3JtYXRzW3RoaXNFZGl0b3Iub3B0aW9ucy5mb3JtYXRdO1xyXG5cdFx0dGhpc0VkaXRvci5mb3JtYXQgPSBGb3JtYXRDdG9yID8gbmV3IEZvcm1hdEN0b3IoKSA6IHt9O1xyXG5cdFx0LypcclxuXHRcdFx0KiBQbHVnaW5zIHNob3VsZCBiZSBpbml0aWFsaXplZCBiZWZvcmUgdGhlIGZvcm1hdHRlcnMgc2luY2VcclxuXHRcdFx0KiB0aGV5IG1heSB3aXNoIHRvIGFkZCBvciBjaGFuZ2UgZm9ybWF0dGluZyBoYW5kbGVycyBhbmRcclxuXHRcdFx0KiBzaW5jZSB0aGUgYmJjb2RlIGZvcm1hdCBjYWNoZXMgaXRzIGhhbmRsZXJzLFxyXG5cdFx0XHQqIHN1Y2ggY2hhbmdlcyBtdXN0IGJlIGRvbmUgZmlyc3QuXHJcblx0XHRcdCovXHJcblx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIgPSBuZXcgUGx1Z2luTWFuYWdlcih0aGlzRWRpdG9yKTtcclxuXHRcdCh0aGlzRWRpdG9yLm9wdGlvbnMucGx1Z2lucyB8fCAnJykuc3BsaXQoJywnKS5mb3JFYWNoKChwbHVnaW46IGFueSkgPT4ge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIucmVnaXN0ZXIocGx1Z2luLnRyaW0oKSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICgnaW5pdCcgaW4gdGhpc0VkaXRvci5mb3JtYXQpIHtcclxuXHRcdFx0KHRoaXNFZGl0b3IuZm9ybWF0IGFzIGFueSkuaW5pdC5jYWxsKHRoaXNFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENyZWF0ZSB0aGUgWUFFIVxyXG5cdFx0dGhpc0VkaXRvci5pbml0RW1vdGljb25zKCk7XHJcblx0XHR0aGlzRWRpdG9yLmluaXRUb29sQmFyKCk7XHJcblx0XHR0aGlzRWRpdG9yLmluaXRFZGl0b3IoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdE9wdGlvbnMoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdEV2ZW50cygpO1xyXG5cclxuXHRcdC8vIGZvcmNlIGludG8gc291cmNlIG1vZGUgaWYgaXMgYSBicm93c2VyIHRoYXQgY2FuJ3QgaGFuZGxlXHJcblx0XHQvLyBmdWxsIGVkaXRpbmdcclxuXHRcdGlmICghYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcclxuXHRcdFx0dGhpc0VkaXRvci50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc0VkaXRvci51cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblxyXG5cdFx0bGV0IGxvYWRlZCA9ICgpID0+IHtcclxuXHRcdFx0ZG9tLm9mZihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHJcblx0XHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5hdXRvZm9jdXMoISF0aGlzRWRpdG9yLm9wdGlvbnMuYXV0b2ZvY3VzRW5kKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc0VkaXRvci5hdXRvRXhwYW5kKCk7XHJcblx0XHRcdHRoaXNFZGl0b3IuYXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0XHQvLyBUT0RPOiB1c2UgZWRpdG9yIGRvYyBhbmQgd2luZG93P1xyXG5cdFx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIuY2FsbCgncmVhZHknKTtcclxuXHRcdFx0aWYgKCdvblJlYWR5JyBpbiB0aGlzRWRpdG9yLmZvcm1hdCkge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IuZm9ybWF0Lm9uUmVhZHkuY2FsbCh0aGlzRWRpdG9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGRvbS5vbihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHRcdGlmIChnbG9iYWxEb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xyXG5cdFx0XHRsb2FkZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0IHRoZSBsb2NhbGUgdmFyaWFibGUgd2l0aCB0aGUgc3BlY2lmaWVkIGxvY2FsZSBpZiBwb3NzaWJsZVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0TG9jYWxlID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IGxhbmcgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0dGhpcy5sb2NhbGUgPSBFbWxFZGl0b3IubG9jYWxlW3RoaXMub3B0aW9ucy5sb2NhbGVdO1xyXG5cclxuXHRcdGlmICghdGhpcy5sb2NhbGUpIHtcclxuXHRcdFx0bGFuZyA9IHRoaXMub3B0aW9ucy5sb2NhbGUuc3BsaXQoJy0nKTtcclxuXHRcdFx0dGhpcy5sb2NhbGUgPSBFbWxFZGl0b3IubG9jYWxlW2xhbmdbMF1dO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIExvY2FsZSBEYXRlVGltZSBmb3JtYXQgb3ZlcnJpZGVzIGFueSBzcGVjaWZpZWQgaW4gdGhlIG9wdGlvbnNcclxuXHRcdGlmICh0aGlzLmxvY2FsZSAmJiB0aGlzLmxvY2FsZS5kYXRlRm9ybWF0KSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucy5kYXRlRm9ybWF0ID0gdGhpcy5sb2NhbGUuZGF0ZUZvcm1hdDtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0RWRpdG9yID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IgPSBkb20uY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnLCBudWxsKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9yID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScsIHtcclxuXHRcdFx0ZnJhbWVib3JkZXI6IFwiMFwiLFxyXG5cdFx0XHRhbGxvd2Z1bGxzY3JlZW46IFwidHJ1ZVwiXHJcblx0XHR9KSBhcyBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcblx0XHQvKlxyXG5cdFx0XHQqIFRoaXMgbmVlZHMgdG8gYmUgZG9uZSByaWdodCBhZnRlciB0aGV5IGFyZSBjcmVhdGVkIGJlY2F1c2UsXHJcblx0XHRcdCogZm9yIGFueSByZWFzb24sIHRoZSB1c2VyIG1heSBub3Qgd2FudCB0aGUgdmFsdWUgdG8gYmUgdGlua2VyZWRcclxuXHRcdFx0KiBieSBhbnkgZmlsdGVycy5cclxuXHRcdFx0Ki9cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuc3RhcnRJblNvdXJjZU1vZGUpIHtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLnd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnd3lzaXd5Z01vZGUnKTtcclxuXHRcdFx0ZG9tLmhpZGUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5vcHRpb25zLnNwZWxsY2hlY2spIHtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy5lZGl0b3JDb250YWluZXIsICdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGdsb2JhbFdpbi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy53eXNpd3lnRWRpdG9yLCAnc3JjJywgJ2Fib3V0OmJsYW5rJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBlZGl0b3IgdG8gdGhlIGNvbnRhaW5lclxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCB0aGlzLnd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCB0aGlzLnNvdXJjZUVkaXRvcik7XHJcblxyXG5cdFx0Ly8gVE9ETzogbWFrZSB0aGlzIG9wdGlvbmFsIHNvbWVob3dcclxuXHRcdHRoaXMuZGltZW5zaW9ucyhcclxuXHRcdFx0dGhpcy5vcHRpb25zLndpZHRoIHx8IGRvbS53aWR0aCh0aGlzLnRleHRhcmVhKSxcclxuXHRcdFx0dGhpcy5vcHRpb25zLmhlaWdodCB8fCBkb20uaGVpZ2h0KHRoaXMudGV4dGFyZWEpXHJcblx0XHQpO1xyXG5cclxuXHRcdC8vIEFkZCBpb3MgdG8gSFRNTCBzbyBjYW4gYXBwbHkgQ1NTIGZpeCB0byBvbmx5IGl0XHJcblx0XHRsZXQgY2xhc3NOYW1lID0gYnJvd3Nlci5pb3MgPyAnIGlvcycgOiAnJztcclxuXHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudCA9IHRoaXMud3lzaXd5Z0VkaXRvci5jb250ZW50RG9jdW1lbnQ7XHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudC5vcGVuKCk7XHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudC53cml0ZSh0ZW1wbGF0ZXMoJ2h0bWwnLCB7XHJcblx0XHRcdGF0dHJzOiAnIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIicsXHJcblx0XHRcdHNwZWxsY2hlY2s6IHRoaXMub3B0aW9ucy5zcGVsbGNoZWNrID8gJycgOiAnc3BlbGxjaGVjaz1cImZhbHNlXCInLFxyXG5cdFx0XHRjaGFyc2V0OiB0aGlzLm9wdGlvbnMuY2hhcnNldCxcclxuXHRcdFx0c3R5bGU6IHRoaXMub3B0aW9ucy5zdHlsZVxyXG5cdFx0fSkpO1xyXG5cdFx0dGhpcy53eXNpd3lnRG9jdW1lbnQuY2xvc2UoKTtcclxuXHJcblx0XHR0aGlzLnd5c2l3eWdCb2R5ID0gdGhpcy53eXNpd3lnRG9jdW1lbnQuYm9keSBhcyBIVE1MQm9keUVsZW1lbnQ7XHJcblx0XHR0aGlzLnd5c2l3eWdXaW5kb3cgPSB0aGlzLnd5c2l3eWdFZGl0b3IuY29udGVudFdpbmRvdztcclxuXHJcblx0XHR0aGlzLnJlYWRPbmx5KCEhdGhpcy5vcHRpb25zLnJlYWRPbmx5KTtcclxuXHJcblx0XHQvLyBpZnJhbWUgb3ZlcmZsb3cgZml4IGZvciBpT1NcclxuXHRcdGlmIChicm93c2VyLmlvcykge1xyXG5cdFx0XHRkb20uaGVpZ2h0KHRoaXMud3lzaXd5Z0JvZHksICcxMDAlJyk7XHJcblx0XHRcdGRvbS5vbih0aGlzLnd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBudWxsLCB0aGlzLmZvY3VzKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFiSW5kZXggPSBkb20uYXR0cih0aGlzLnRleHRhcmVhLCAndGFiaW5kZXgnKTtcclxuXHRcdGRvbS5hdHRyKHRoaXMuc291cmNlRWRpdG9yLCAndGFiaW5kZXgnLCB0YWJJbmRleCk7XHJcblx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHJcblx0XHR0aGlzLnJhbmdlSGVscGVyID0gbmV3IFJhbmdlSGVscGVyKHRoaXMud3lzaXd5Z1dpbmRvdywgbnVsbCwgdGhpcy5zYW5pdGl6ZSk7XHJcblxyXG5cdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRkb20uaGlkZSh0aGlzLnRleHRhcmVhKTtcclxuXHRcdHRoaXMudmFsKHRoaXMudGV4dGFyZWEudmFsdWUpO1xyXG5cclxuXHRcdGxldCBwbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlciB8fFxyXG5cdFx0XHRkb20uYXR0cih0aGlzLnRleHRhcmVhLCAncGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRpZiAocGxhY2Vob2xkZXIpIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3IucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy53eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpc2VzIG9wdGlvbnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdE9wdGlvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHQvLyBhdXRvLXVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXIgaWYgb3B0aW9uIHNldCB0byB0cnVlXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9VcGRhdGUpIHtcclxuXHRcdFx0ZG9tLm9uKHRoaXMud3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgdGhpcy5hdXRvVXBkYXRlKTtcclxuXHRcdFx0ZG9tLm9uKHRoaXMuc291cmNlRWRpdG9yLCAnYmx1cicsIG51bGwsIHRoaXMuYXV0b1VwZGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ydGwgPT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLnJ0bCA9IGRvbS5jc3ModGhpcy5zb3VyY2VFZGl0b3IsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ydGwoISF0aGlzLm9wdGlvbnMucnRsKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9FeHBhbmQpIHtcclxuXHRcdFx0Ly8gTmVlZCB0byB1cGRhdGUgd2hlbiBpbWFnZXMgKG9yIGFueXRoaW5nIGVsc2UpIGxvYWRzXHJcblx0XHRcdGRvbS5vbih0aGlzLnd5c2l3eWdCb2R5LCAnbG9hZCcsIG51bGwsIHRoaXMuYXV0b0V4cGFuZCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0XHRkb20ub24odGhpcy53eXNpd3lnQm9keSwgJ2lucHV0IGtleXVwJywgbnVsbCwgdGhpcy5hdXRvRXhwYW5kKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnJlc2l6ZUVuYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5pbml0UmVzaXplKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmF0dHIodGhpcy5lZGl0b3JDb250YWluZXIsICdpZCcsIHRoaXMub3B0aW9ucy5pZCk7XHJcblx0XHR0aGlzLmVtb3RpY29ucyh0aGlzLm9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGlzZXMgZXZlbnRzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRFdmVudHMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgZm9ybSA9IHRoaXNFZGl0b3IudGV4dGFyZWEuZm9ybTtcclxuXHRcdGxldCBjb21wb3NpdGlvbkV2ZW50cyA9ICdjb21wb3NpdGlvbnN0YXJ0IGNvbXBvc2l0aW9uZW5kJztcclxuXHRcdGxldCBldmVudHNUb0ZvcndhcmQgPSAna2V5ZG93biBrZXl1cCBrZXlwcmVzcyBmb2N1cyBibHVyIGNvbnRleHRtZW51IGlucHV0JztcclxuXHRcdGxldCBjaGVja1NlbGVjdGlvbkV2ZW50cyA9ICdvbnNlbGVjdGlvbmNoYW5nZScgaW4gdGhpc0VkaXRvci53eXNpd3lnRG9jdW1lbnQgP1xyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlJyA6XHJcblx0XHRcdCdrZXl1cCBmb2N1cyBibHVyIGNvbnRleHRtZW51IG1vdXNldXAgdG91Y2hlbmQgY2xpY2snO1xyXG5cclxuXHRcdGRvbS5vbihnbG9iYWxEb2MsICdjbGljaycsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRG9jdW1lbnRDbGljayk7XHJcblxyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdzdWJtaXQnLCBudWxsLCB0aGlzRWRpdG9yLnNldFRleHRhcmVhVmFsdWUsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub24od2luZG93LCAncGFnZWhpZGUnLCBudWxsLCB0aGlzRWRpdG9yLnNldFRleHRhcmVhVmFsdWUpO1xyXG5cdFx0ZG9tLm9uKHdpbmRvdywgJ3BhZ2VzaG93JywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlS2V5UHJlc3MpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXlkb3duJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5ZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlQmFja1NwYWNlKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCB0aGlzRWRpdG9yLmFwcGVuZE5ld0xpbmUpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRCbHVyKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCB0aGlzRWRpdG9yLnZhbHVlQ2hhbmdlZEtleVVwKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAncGFzdGUnLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZVBhc3RlRXZ0KTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAnY3V0IGNvcHknLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUN1dENvcHlFdnQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksIGNvbXBvc2l0aW9uRXZlbnRzLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUNvbXBvc2l0aW9uKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCBjaGVja1NlbGVjdGlvbkV2ZW50cywgbnVsbCwgdGhpc0VkaXRvci5jaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksIGV2ZW50c1RvRm9yd2FyZCwgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVFdmVudCk7XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3Iub3B0aW9ucy5lbW90aWNvbnNDb21wYXQgJiYgZ2xvYmFsV2luLmdldFNlbGVjdGlvbikge1xyXG5cdFx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci5lbW90aWNvbnNDaGVja1doaXRlc3BhY2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAnYmx1cicsIG51bGwsICgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzRWRpdG9yLnZhbCgpKSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdwbGFjZWhvbGRlcicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2ZvY3VzJywgbnVsbCwgKCkgPT4ge1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsICdibHVyJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRCbHVyKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnNvdXJjZUVkaXRvciwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsICdrZXlkb3duJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnNvdXJjZUVkaXRvciwgY29tcG9zaXRpb25FdmVudHMsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlQ29tcG9zaXRpb24pO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iuc291cmNlRWRpdG9yLCBldmVudHNUb0ZvcndhcmQsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRXZlbnQpO1xyXG5cclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgJ21vdXNlZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlTW91c2VEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgY2hlY2tTZWxlY3Rpb25FdmVudHMsIG51bGwsIHRoaXNFZGl0b3IuY2hlY2tTZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci5hcHBlbmROZXdMaW5lKTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgdGhpc0VkaXRvci5jaGVja05vZGVDaGFuZ2VkKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnLCBudWxsLCB0aGlzRWRpdG9yLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMpO1xyXG5cdFx0Ly8gQ3VzdG9tIGV2ZW50cyB0byBmb3J3YXJkXHJcblx0XHRkb20ub24oXHJcblx0XHRcdHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlZCB2YWx1ZWNoYW5nZWQgbm9kZWNoYW5nZWQgcGFzdGVyYXcgcGFzdGUnLFxyXG5cdFx0XHRudWxsLFxyXG5cdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUV2ZW50XHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHRvb2xiYXIgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIGNvbnRhaW5lclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0VG9vbEJhciA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yOiBhbnkgPSB0aGlzO1xyXG5cdFx0bGV0IGdyb3VwOiBhbnk7XHJcblx0XHRsZXQgY29tbWFuZHMgPSB0aGlzRWRpdG9yLmNvbW1hbmRzO1xyXG5cdFx0bGV0IGV4Y2x1ZGUgPSAodGhpc0VkaXRvci5vcHRpb25zLnRvb2xiYXJFeGNsdWRlIHx8ICcnKS5zcGxpdCgnLCcpO1xyXG5cdFx0bGV0IGdyb3VwcyA9IHRoaXNFZGl0b3Iub3B0aW9ucy50b29sYmFyLnNwbGl0KCd8Jyk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci50b29sYmFyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLXRvb2xiYXInLFxyXG5cdFx0XHR1bnNlbGVjdGFibGU6ICdvbidcclxuXHRcdH0pIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuaWNvbnMgaW4gRW1sRWRpdG9yLmljb25zKSB7XHJcblx0XHRcdHRoaXNFZGl0b3IuaWNvbnMgPSBuZXcgRW1sRWRpdG9yLmljb25zW3RoaXNFZGl0b3Iub3B0aW9ucy5pY29uc10oKTtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKGdyb3VwcywgKF8sIG1lbnVJdGVtcykgPT4ge1xyXG5cdFx0XHRncm91cCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWdyb3VwJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2gobWVudUl0ZW1zLnNwbGl0KCcsJyksIChfLCBjb21tYW5kTmFtZSkgPT4ge1xyXG5cdFx0XHRcdGxldCBidXR0b246IGFueSwgc2hvcnRjdXQsIGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kTmFtZV07XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBjb21tYW5kTmFtZSBtdXN0IGJlIGEgdmFsaWQgY29tbWFuZCBhbmQgbm90IGV4Y2x1ZGVkXHJcblx0XHRcdFx0aWYgKCFjb21tYW5kIHx8IGV4Y2x1ZGUuaW5kZXhPZihjb21tYW5kTmFtZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2hvcnRjdXQgPSBjb21tYW5kLnNob3J0Y3V0O1xyXG5cdFx0XHRcdGJ1dHRvbiA9IHRlbXBsYXRlcygndG9vbGJhckJ1dHRvbicsIHtcclxuXHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0ZGlzcE5hbWU6IHRoaXNFZGl0b3IudHJhbnNsYXRlKGNvbW1hbmQubmFtZSB8fFxyXG5cdFx0XHRcdFx0XHRjb21tYW5kLnRvb2x0aXAgfHwgY29tbWFuZE5hbWUpXHJcblx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXNFZGl0b3IuaWNvbnMgJiYgdGhpc0VkaXRvci5pY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0XHRcdGxldCBpY29uID0gdGhpc0VkaXRvci5pY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZSh0aGlzRWRpdG9yLmljb25zLmNyZWF0ZShjb21tYW5kTmFtZSksXHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRkb20uYWRkQ2xhc3MoYnV0dG9uLCAnaGFzLWljb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJ1dHRvbi5fZW1sVHh0TW9kZSA9ICEhY29tbWFuZC50eHRFeGVjO1xyXG5cdFx0XHRcdGJ1dHRvbi5fZW1sV3lzaXd5Z01vZGUgPSAhIWNvbW1hbmQuZXhlYztcclxuXHRcdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCAhY29tbWFuZC5leGVjKTtcclxuXHRcdFx0XHRkb20ub24oYnV0dG9uLCAnY2xpY2snLCBudWxsLCAoZTogRXZlbnQpID0+IHtcclxuXHRcdFx0XHRcdGlmICghZG9tLmhhc0NsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJykpIHtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci5oYW5kbGVDb21tYW5kKGJ1dHRvbiwgY29tbWFuZCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci51cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly8gUHJldmVudCBlZGl0b3IgbG9zaW5nIGZvY3VzIHdoZW4gYnV0dG9uIGNsaWNrZWRcclxuXHRcdFx0XHRkb20ub24oYnV0dG9uLCAnbW91c2Vkb3duJywgbnVsbCwgKGU6IEV2ZW50KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmNsb3NlRHJvcERvd24oKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbW1hbmQudG9vbHRpcCkge1xyXG5cdFx0XHRcdFx0ZG9tLmF0dHIoYnV0dG9uLCAndGl0bGUnLFxyXG5cdFx0XHRcdFx0XHR0aGlzRWRpdG9yLnRyYW5zbGF0ZShjb21tYW5kLnRvb2x0aXApICtcclxuXHRcdFx0XHRcdFx0KHNob3J0Y3V0ID8gJyAoJyArIHNob3J0Y3V0ICsgJyknIDogJycpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNob3J0Y3V0KSB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmFkZFNob3J0Y3V0KHNob3J0Y3V0LCBjb21tYW5kTmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY29tbWFuZC5zdGF0ZSkge1xyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci5idG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuc3RhdGVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gZXhlYyBzdHJpbmcgY29tbWFuZHMgY2FuIGJlIHBhc3NlZCB0byBxdWVyeUNvbW1hbmRTdGF0ZVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY29tbWFuZC5leGVjKSkge1xyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci5idG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuZXhlY1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZ3JvdXAsIGJ1dHRvbik7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50b29sYmFyQnV0dG9uc1tjb21tYW5kTmFtZV0gPSBidXR0b247XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXhjbHVkZSBlbXB0eSBncm91cHNcclxuXHRcdFx0aWYgKGdyb3VwLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpc0VkaXRvci50b29sYmFyLCBncm91cCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFwcGVuZCB0aGUgdG9vbGJhciB0byB0aGUgdG9vbGJhckNvbnRhaW5lciBvcHRpb24gaWYgZ2l2ZW5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzRWRpdG9yLm9wdGlvbnMudG9vbGJhckNvbnRhaW5lciB8fCB0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgdGhpc0VkaXRvci50b29sYmFyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSByZXNpemVyLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0UmVzaXplID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IG1pbkhlaWdodDogYW55LCBtYXhIZWlnaHQ6IGFueSwgbWluV2lkdGg6IGFueSwgbWF4V2lkdGg6IGFueSwgbW91c2VNb3ZlRnVuYzogYW55LCBtb3VzZVVwRnVuYzogYW55LCBncmlwID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWdyaXAnXHJcblx0XHR9KSxcclxuXHRcdFx0Ly8gQ292ZXIgaXMgdXNlZCB0byBjb3ZlciB0aGUgZWRpdG9yIGlmcmFtZSBzbyBkb2N1bWVudFxyXG5cdFx0XHQvLyBzdGlsbCBnZXRzIG1vdXNlIG1vdmUgZXZlbnRzXHJcblx0XHRcdGNvdmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItcmVzaXplLWNvdmVyJ1xyXG5cdFx0XHR9KSwgbW92ZUV2ZW50cyA9ICd0b3VjaG1vdmUgbW91c2Vtb3ZlJywgZW5kRXZlbnRzID0gJ3RvdWNoY2FuY2VsIHRvdWNoZW5kIG1vdXNldXAnLCBzdGFydFggPSAwLCBzdGFydFkgPSAwLCBuZXdYID0gMCwgbmV3WSA9IDAsIHN0YXJ0V2lkdGggPSAwLCBzdGFydEhlaWdodCA9IDAsIG9yaWdXaWR0aCA9IGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lciksIG9yaWdIZWlnaHQgPSBkb20uaGVpZ2h0KHRoaXMuZWRpdG9yQ29udGFpbmVyKSwgaXNEcmFnZ2luZyA9IGZhbHNlLCBydGwgPSB0aGlzLnJ0bCgpO1xyXG5cclxuXHRcdG1pbkhlaWdodCA9IHRoaXMub3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgb3JpZ0hlaWdodCAvIDEuNTtcclxuXHRcdG1heEhlaWdodCA9IHRoaXMub3B0aW9ucy5yZXNpemVNYXhIZWlnaHQgfHwgb3JpZ0hlaWdodCAqIDIuNTtcclxuXHRcdG1pbldpZHRoID0gdGhpcy5vcHRpb25zLnJlc2l6ZU1pbldpZHRoIHx8IG9yaWdXaWR0aCAvIDEuMjU7XHJcblx0XHRtYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5yZXNpemVNYXhXaWR0aCB8fCBvcmlnV2lkdGggKiAxLjI1O1xyXG5cclxuXHRcdG1vdXNlTW92ZUZ1bmMgPSAoZTogRXZlbnQpID0+IHtcclxuXHRcdFx0Ly8gaU9TIHVzZXMgd2luZG93LmV2ZW50XHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcblx0XHRcdFx0bGV0IHRvdWNoRXZlbnQgPSAoZSBhcyBUb3VjaEV2ZW50KTtcclxuXHRcdFx0XHRuZXdYID0gdG91Y2hFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRuZXdZID0gdG91Y2hFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgbW91c2VFdmVudCA9IChlIGFzIE1vdXNlRXZlbnQpO1xyXG5cdFx0XHRcdG5ld1ggPSBtb3VzZUV2ZW50LnBhZ2VYO1xyXG5cdFx0XHRcdG5ld1kgPSBtb3VzZUV2ZW50LnBhZ2VZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgbmV3SGVpZ2h0ID0gc3RhcnRIZWlnaHQgKyAobmV3WSAtIHN0YXJ0WSksIG5ld1dpZHRoID0gcnRsID9cclxuXHRcdFx0XHRzdGFydFdpZHRoIC0gKG5ld1ggLSBzdGFydFgpIDpcclxuXHRcdFx0XHRzdGFydFdpZHRoICsgKG5ld1ggLSBzdGFydFgpO1xyXG5cclxuXHRcdFx0aWYgKG1heFdpZHRoID4gMCAmJiBuZXdXaWR0aCA+IG1heFdpZHRoKSB7XHJcblx0XHRcdFx0bmV3V2lkdGggPSBtYXhXaWR0aDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobWluV2lkdGggPiAwICYmIG5ld1dpZHRoIDwgbWluV2lkdGgpIHtcclxuXHRcdFx0XHRuZXdXaWR0aCA9IG1pbldpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLnJlc2l6ZVdpZHRoKSB7XHJcblx0XHRcdFx0bmV3V2lkdGggPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChtYXhIZWlnaHQgPiAwICYmIG5ld0hlaWdodCA+IG1heEhlaWdodCkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IG1heEhlaWdodDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAobWluSGVpZ2h0ID4gMCAmJiBuZXdIZWlnaHQgPCBtaW5IZWlnaHQpIHtcclxuXHRcdFx0XHRuZXdIZWlnaHQgPSBtaW5IZWlnaHQ7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMucmVzaXplSGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobmV3V2lkdGggfHwgbmV3SGVpZ2h0KSB7XHJcblx0XHRcdFx0dGhpcy5kaW1lbnNpb25zKG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG1vdXNlVXBGdW5jID0gKGU6IEV2ZW50KSA9PiB7XHJcblx0XHRcdGlmICghaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0ZG9tLmhpZGUoY292ZXIpO1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbnVsbCwgbW91c2VNb3ZlRnVuYyk7XHJcblx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG51bGwsIG1vdXNlVXBGdW5jKTtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbnMgJiYgdGhpcy5pY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0bGV0IGljb24gPSB0aGlzLmljb25zLmNyZWF0ZSgnZ3JpcCcpO1xyXG5cdFx0XHRpZiAoaWNvbikge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChncmlwLCBpY29uKTtcclxuXHRcdFx0XHRkb20uYWRkQ2xhc3MoZ3JpcCwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5lZGl0b3JDb250YWluZXIsIGdyaXApO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBjb3Zlcik7XHJcblx0XHRkb20uaGlkZShjb3Zlcik7XHJcblxyXG5cdFx0ZG9tLm9uKGdyaXAsICd0b3VjaHN0YXJ0IG1vdXNlZG93bicsIG51bGwsIChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHQvLyBpT1MgdXNlcyB3aW5kb3cuZXZlbnRcclxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcblx0XHRcdFx0bGV0IHRlID0gZSBhcyBUb3VjaEV2ZW50O1xyXG5cdFx0XHRcdHN0YXJ0WCA9IHRlLnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0c3RhcnRZID0gdGUudG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgbWUgPSBlIGFzIE1vdXNlRXZlbnRcclxuXHRcdFx0XHRzdGFydFggPSBtZS5wYWdlWDtcclxuXHRcdFx0XHRzdGFydFkgPSBtZS5wYWdlWTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RhcnRXaWR0aCA9IGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdHN0YXJ0SGVpZ2h0ID0gZG9tLmhlaWdodCh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdGlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAncmVzaXppbmcnKTtcclxuXHRcdFx0ZG9tLnNob3coY292ZXIpO1xyXG5cdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbERvYywgZW5kRXZlbnRzLCBudWxsLCBtb3VzZVVwRnVuYyk7XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQcmVmaXhlcyBhbmQgcHJlbG9hZHMgdGhlIGVtb3RpY29uIGltYWdlc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0RW1vdGljb25zID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IGVtb3RpY29ucyA9IHRoaXMub3B0aW9ucy5lbW90aWNvbnM7XHJcblx0XHRsZXQgcm9vdCA9IHRoaXMub3B0aW9ucy5lbW90aWNvbnNSb290IHx8ICcnO1xyXG5cclxuXHRcdGlmIChlbW90aWNvbnMpIHtcclxuXHRcdFx0dGhpcy5hbGxFbW90aWNvbnMgPSB1dGlscy5leHRlbmQoXHJcblx0XHRcdFx0e30sIGVtb3RpY29ucy5tb3JlLCBlbW90aWNvbnMuZHJvcGRvd24sIGVtb3RpY29ucy5oaWRkZW5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKHRoaXMuYWxsRW1vdGljb25zLCAoa2V5LCB1cmwpID0+IHtcclxuXHRcdFx0dGhpc0VkaXRvci5hbGxFbW90aWNvbnNba2V5XSA9IHRlbXBsYXRlcygnZW1vdGljb24nLCB7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0Ly8gUHJlZml4IGVtb3RpY29uIHJvb3QgdG8gZW1vdGljb24gdXJsc1xyXG5cdFx0XHRcdHVybDogcm9vdCArICh1cmwudXJsIHx8IHVybCksXHJcblx0XHRcdFx0dG9vbHRpcDogdXJsLnRvb2x0aXAgfHwga2V5XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUHJlbG9hZCB0aGUgZW1vdGljb25cclxuXHRcdFx0aWYgKHRoaXNFZGl0b3Iub3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5wcmVMb2FkQ2FjaGUucHVzaChkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiByb290ICsgKHVybC51cmwgfHwgdXJsKVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXV0b2ZvY3VzIHRoZSBlZGl0b3JcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b2ZvY3VzID0gKGZvY3VzRW5kOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGxldCByYW5nZSwgdHh0UG9zO1xyXG5cdFx0bGV0IG5vZGUgPSB0aGlzLnd5c2l3eWdCb2R5LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0Ly8gQ2FuJ3QgZm9jdXMgaW52aXNpYmxlIGVsZW1lbnRzXHJcblx0XHRpZiAoIWRvbS5pc1Zpc2libGUodGhpcy5lZGl0b3JDb250YWluZXIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0dHh0UG9zID0gZm9jdXNFbmQgPyB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZS5sZW5ndGggOiAwO1xyXG5cclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2V0U2VsZWN0aW9uUmFuZ2UodHh0UG9zLCB0eHRQb3MpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRsZXQgbGFzdENoaWxkID0gdGhpcy53eXNpd3lnQm9keS5sYXN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGlmICghKG5vZGUgPSBsYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0bm9kZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHRoaXMud3lzaXd5Z0RvY3VtZW50KSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy53eXNpd3lnQm9keSwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChub2RlLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdG5vZGUgPSBub2RlLmxhc3RDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRcdFx0Ly8gU2hvdWxkIHBsYWNlIHRoZSBjdXJzb3IgYmVmb3JlIHRoZSBsYXN0IDxicj5cclxuXHRcdFx0XHRpZiAoZG9tLmlzKG5vZGUsICdicicpICYmIG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmFuZ2UgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRcdGlmICghZG9tLmNhbkhhdmVDaGlsZHJlbihub2RlKSkge1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShub2RlKTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0QWZ0ZXIobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZS5jb2xsYXBzZSghZm9jdXNFbmQpO1xyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XHJcblx0XHR0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSByYW5nZTtcclxuXHJcblx0XHRpZiAoZm9jdXNFbmQpIHtcclxuXHRcdFx0dGhpcy53eXNpd3lnQm9keS5zY3JvbGxUb3AgPSB0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbEhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXV0b2V4cGFuZFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b0V4cGFuZCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b0V4cGFuZCAmJiAhdGhpcy5hdXRvRXhwYW5kVGhyb3R0bGUpIHtcclxuXHRcdFx0dGhpcy5hdXRvRXhwYW5kVGhyb3R0bGUgPSBzZXRUaW1lb3V0KHRoaXMuZXhwYW5kVG9Db250ZW50LCAyMDApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYW55IGRvY3VtZW50IGNsaWNrIGFuZCBjbG9zZXMgdGhlIGRyb3Bkb3duIGlmIG9wZW5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlRG9jdW1lbnRDbGljayA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHQvLyBpZ25vcmUgcmlnaHQgY2xpY2tzXHJcblx0XHRpZiAoZS53aGljaCAhPT0gMyAmJiB0aGlzLmRyb3Bkb3duICYmICFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuXHRcdFx0dGhpcy5hdXRvVXBkYXRlKCk7XHJcblxyXG5cdFx0XHR0aGlzLmNsb3NlRHJvcERvd24oKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgY3V0ICYgY29weSBldmVudHNcclxuXHQgKlxyXG5cdCAqIEJ5IGRlZmF1bHQgYnJvd3NlcnMgYWxzbyBjb3B5IGluaGVyaXRlZCBzdHlsaW5nIGZyb20gdGhlIHN0eWxlc2hlZXQgYW5kXHJcblx0ICogYnJvd3NlciBkZWZhdWx0IHN0eWxpbmcgd2hpY2ggaXMgdW5uZWNlc3NhcnkuXHJcblx0ICpcclxuXHQgKiBUaGlzIHdpbGwgaWdub3JlIGluaGVyaXRlZCBzdHlsZXMgYW5kIG9ubHkgY29weSBpbmxpbmUgc3R5bGluZy5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlQ3V0Q29weUV2dCA9IChlOiBDbGlwYm9hcmRFdmVudCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHJhbmdlID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0bGV0IGNvbnRhaW5lciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRsZXQgZmlyc3RQYXJlbnQ7XHJcblxyXG5cdFx0XHQvLyBDb3B5IGFsbCBpbmxpbmUgcGFyZW50IG5vZGVzIHVwIHRvIHRoZSBmaXJzdCBibG9jayBwYXJlbnQgc28gY2FuXHJcblx0XHRcdC8vIGNvcHkgaW5saW5lIHN0eWxlc1xyXG5cdFx0XHRsZXQgcGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRcdFx0XHRsZXQgY2xvbmUgPSBwYXJlbnQuY2xvbmVOb2RlKCkgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNsb25lLCBjb250YWluZXIuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRhaW5lciwgY2xvbmUpO1xyXG5cdFx0XHRcdFx0Zmlyc3RQYXJlbnQgPSBmaXJzdFBhcmVudCB8fCBjbG9uZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChmaXJzdFBhcmVudCB8fCBjb250YWluZXIsIHJhbmdlLmNsb25lQ29udGVudHMoKSk7XHJcblx0XHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9odG1sJywgY29udGFpbmVyLmlubmVySFRNTCk7XHJcblxyXG5cdFx0XHQvLyBUT0RPOiBSZWZhY3RvciBpbnRvIHByaXZhdGUgc2hhcmVkIG1vZHVsZSB3aXRoIHBsYWludGV4dCBwbHVnaW5cclxuXHRcdFx0Ly8gaW5uZXJUZXh0IGFkZHMgdHdvIG5ld2xpbmVzIGFmdGVyIDxwPiB0YWdzIHNvIGNvbnZlcnQgdGhlbSB0b1xyXG5cdFx0XHQvLyA8ZGl2PiB0YWdzXHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAncCcpLCAoXywgZWxtKSA9PiB7XHJcblx0XHRcdFx0ZG9tLmNvbnZlcnRFbGVtZW50KGVsbSwgJ2RpdicpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8gUmVtb3ZlIGNvbGxhcHNlZCA8YnI+IHRhZ3MgYXMgaW5uZXJUZXh0IGNvbnZlcnRzIHRoZW0gdG8gbmV3bGluZXNcclxuXHRcdFx0dXRpbHMuZWFjaChkb20uZmluZChjb250YWluZXIsICdicicpLCAoXywgZWxtKSA9PiB7XHJcblx0XHRcdFx0aWYgKCFlbG0ubmV4dFNpYmxpbmcgfHwgIWRvbS5pc0lubGluZShlbG0ubmV4dFNpYmxpbmcsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRkb20ucmVtb3ZlKGVsbSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIHJhbmdlLnRvU3RyaW5nKCkgZG9lc24ndCBpbmNsdWRlIG5ld2xpbmVzIHNvIGNhbid0IHVzZSB0aGlzLlxyXG5cdFx0XHQvLyBzZWxlY3Rpb24udG9TdHJpbmcoKSBzZWVtcyB0byB1c2UgdGhlIHNhbWUgbWV0aG9kIGFzIGlubmVyVGV4dFxyXG5cdFx0XHQvLyBidXQgbmVlZHMgdG8gYmUgbm9ybWFsaXNlZCBmaXJzdCBzbyB1c2luZyBjb250YWluZXIuaW5uZXJUZXh0XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzLnd5c2l3eWdCb2R5LCBjb250YWluZXIpO1xyXG5cdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIGNvbnRhaW5lci5pbm5lclRleHQpO1xyXG5cdFx0XHRkb20ucmVtb3ZlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRpZiAoZS50eXBlID09PSAnY3V0Jykge1xyXG5cdFx0XHRcdHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgcGFzdGUgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlUGFzdGVFdnQgPSAoZTogQ2xpcGJvYXJkRXZlbnQpOiB2b2lkID0+IHtcclxuXHRcdGNvbnN0IElNQUdFX01JTUVfUkVHRVg6IFJlZ0V4cCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblx0XHRsZXQgZWRpdG9yQ29udGV4dCA9IHRoaXM7XHJcblx0XHRsZXQgZWRpdGFibGUgPSBlZGl0b3JDb250ZXh0Lnd5c2l3eWdCb2R5O1xyXG5cdFx0bGV0IGNsaXBib2FyZCA9IGUuY2xpcGJvYXJkRGF0YTtcclxuXHRcdGxldCBsb2FkSW1hZ2UgPSAoZmlsZTogYW55KSA9PiB7XHJcblx0XHRcdGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRyZWFkZXIub25sb2FkID0gKGU6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGVkaXRvckNvbnRleHQuaGFuZGxlUGFzdGVEYXRhKHtcclxuXHRcdFx0XHRcdGh0bWw6ICc8aW1nIHNyYz1cIicgKyBlLnRhcmdldC5yZXN1bHQgKyAnXCIgLz4nXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBNb2Rlcm4gYnJvd3NlcnMgd2l0aCBjbGlwYm9hcmQgQVBJIC0gZXZlcnl0aGluZyBvdGhlciB0aGFuIF92ZXJ5X1xyXG5cdFx0Ly8gb2xkIGFuZHJvaWQgd2ViIHZpZXdzIGFuZCBVQyBicm93c2VyIHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCB0aGVcclxuXHRcdC8vIHBhc3RlIGV2ZW50IGF0IGFsbC5cclxuXHRcdGlmIChjbGlwYm9hcmQpIHtcclxuXHRcdFx0bGV0IGRhdGE6IGFueSA9IFtdO1xyXG5cdFx0XHRsZXQgdHlwZXMgPSBjbGlwYm9hcmQudHlwZXM7XHJcblx0XHRcdGxldCBpdGVtcyA9IGNsaXBib2FyZC5pdGVtcztcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHQvLyBXb3JkIHNvbWV0aW1lcyBhZGRzIGNvcGllZCB0ZXh0IGFzIGFuIGltYWdlIHNvIGlmIEhUTUxcclxuXHRcdFx0XHQvLyBleGlzdHMgcHJlZmVyIHRoYXQgb3ZlciBpbWFnZXNcclxuXHRcdFx0XHRpZiAodHlwZXMuaW5kZXhPZigndGV4dC9odG1sJykgPCAwKSB7XHJcblx0XHRcdFx0XHQvLyBOb3JtYWxpc2UgaW1hZ2UgcGFzdGluZyB0byBwYXN0ZSBhcyBhIGRhdGEtdXJpXHJcblx0XHRcdFx0XHRpZiAoZ2xvYmFsV2luLkZpbGVSZWFkZXIgJiYgaXRlbXMgJiZcclxuXHRcdFx0XHRcdFx0SU1BR0VfTUlNRV9SRUdFWC50ZXN0KGl0ZW1zW2ldLnR5cGUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBsb2FkSW1hZ2UoY2xpcGJvYXJkLml0ZW1zW2ldLmdldEFzRmlsZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGF0YVt0eXBlc1tpXV0gPSBjbGlwYm9hcmQuZ2V0RGF0YSh0eXBlc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ2FsbCBwbHVnaW5zIGhlcmUgd2l0aCBmaWxlP1xyXG5cdFx0XHRkYXRhLnRleHQgPSBkYXRhWyd0ZXh0L3BsYWluJ107XHJcblx0XHRcdGRhdGEuaHRtbCA9IHRoaXMuc2FuaXRpemUoZGF0YVsndGV4dC9odG1sJ10pO1xyXG5cclxuXHRcdFx0dGhpcy5oYW5kbGVQYXN0ZURhdGEoZGF0YSk7XHJcblx0XHRcdC8vIElmIGNvbnRlbnRzRnJhZ21lbnQgZXhpc3RzIHRoZW4gd2UgYXJlIGFscmVhZHkgd2FpdGluZyBmb3IgYVxyXG5cdFx0XHQvLyBwcmV2aW91cyBwYXN0ZSBzbyBsZXQgdGhlIGhhbmRsZXIgZm9yIHRoYXQgaGFuZGxlIHRoaXMgb25lIHRvb1xyXG5cdFx0fSBlbHNlIGlmICghdGhpcy5wYXN0ZUNvbnRlbnRGcmFnbWVudCkge1xyXG5cdFx0XHQvLyBTYXZlIHRoZSBzY3JvbGwgcG9zaXRpb24gc28gY2FuIGJlIHJlc3RvcmVkXHJcblx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0bGV0IHNjcm9sbFRvcCA9IGVkaXRhYmxlLnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblxyXG5cdFx0XHR0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50ID0gZ2xvYmFsRG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHRcdFx0d2hpbGUgKGVkaXRhYmxlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5wYXN0ZUNvbnRlbnRGcmFnbWVudCwgZWRpdGFibGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGxldCBodG1sID0gZWRpdGFibGUuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdGFibGUsIHRoaXMucGFzdGVDb250ZW50RnJhZ21lbnQpO1xyXG5cdFx0XHRcdGVkaXRhYmxlLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuXHRcdFx0XHR0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdHRoaXMucmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdHRoaXMuaGFuZGxlUGFzdGVEYXRhKHsgaHRtbDogdGhpcy5zYW5pdGl6ZShodG1sKSB9KTtcclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgYW55IGVtb3RpY29uIGNvZGVzIGluIHRoZSBwYXNzZWQgSFRNTFxyXG5cdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlcGxhY2VFbW90aWNvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQpIHtcclxuXHRcdFx0ZW1vdGljb25zXHJcblx0XHRcdFx0LnJlcGxhY2UodGhpcy53eXNpd3lnQm9keSwgdGhpcy5hbGxFbW90aWNvbnMsIHRoaXMub3B0aW9ucy5lbW90aWNvbnNDb21wYXQpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHNlbGVjdGVkIHRleHQgb2YgdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zb3VyY2VFZGl0b3IudmFsdWUuc3Vic3RyaW5nKFxyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCxcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kXHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIHBhc3NlZCBjb21tYW5kXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUNvbW1hbmQgPSAoY2FsbGVyOiBhbnksIGNtZDogYW55KTogdm9pZCA9PiB7XHJcblx0XHQvLyBjaGVjayBpZiBpbiB0ZXh0IG1vZGUgYW5kIGhhbmRsZSB0ZXh0IGNvbW1hbmRzXHJcblx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRpZiAoY21kLnR4dEV4ZWMpIHtcclxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjbWQudHh0RXhlYykpIHtcclxuXHRcdFx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dC5hcHBseSh0aGlzLCBjbWQudHh0RXhlYyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNtZC50eHRFeGVjLmNhbGwodGhpcywgY2FsbGVyLCB0aGlzLnNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY21kLmV4ZWMpIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oY21kLmV4ZWMpKSB7XHJcblx0XHRcdFx0Y21kLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoXHJcblx0XHRcdFx0XHRjbWQuZXhlYyxcclxuXHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjbWQsICdleGVjUGFyYW0nKSA/IGNtZC5leGVjUGFyYW0gOiBudWxsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBXcmFwIGlubGluZXMgdGhhdCBhcmUgaW4gdGhlIHJvb3QgaW4gcGFyYWdyYXBocy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcblx0ICogQHBhcmFtIHtEb2N1bWVudH0gZG9jXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHdyYXBJbmxpbmVzID0gKGJvZHk6IEhUTUxCb2R5RWxlbWVudCwgZG9jOiBEb2N1bWVudCkgPT4ge1xyXG5cdFx0bGV0IHdyYXBwZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdGRvbS50cmF2ZXJzZShib2R5LCAobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKGRvbS5pc0lubGluZShub2RlLCB0cnVlKSkge1xyXG5cdFx0XHRcdC8vIElnbm9yZSB0ZXh0IG5vZGVzIHVubGVzcyB0aGV5IGNvbnRhaW4gbm9uLXdoaXRlc3BhY2UgY2hhcnMgYXNcclxuXHRcdFx0XHQvLyB3aGl0ZXNwYWNlIHdpbGwgYmUgY29sbGFwc2VkLlxyXG5cdFx0XHRcdC8vIElnbm9yZSBlbWxlZGl0b3ItaWdub3JlIGVsZW1lbnRzIHVubGVzcyB3cmFwcGluZyBzaWJsaW5nc1xyXG5cdFx0XHRcdC8vIFNob3VsZCBzdGlsbCB3cmFwIGJvdGggaWYgd3JhcHBpbmcgc2libGluZ3MuXHJcblx0XHRcdFx0aWYgKHdyYXBwZXIgfHwgbm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSA/XHJcblx0XHRcdFx0XHQvXFxTLy50ZXN0KG5vZGUubm9kZVZhbHVlKSA6ICFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRcdGlmICghd3JhcHBlcikge1xyXG5cdFx0XHRcdFx0XHR3cmFwcGVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZSh3cmFwcGVyLCBub2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3JhcHBlciwgbm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHdyYXBwZXIgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9LCBmYWxzZSwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdCAqIHRoZSBzZWxlY3Rpb25jaGFuZ2VkIGV2ZW50IGlmIGl0IGhhcy5cclxuXHQgKlxyXG5cdCAqIEluIGJyb3dzZXJzIG90aGVyIHRoYXQgZG9uJ3Qgc3VwcG9ydCBzZWxlY3Rpb25jaGFuZ2UgZXZlbnQgaXQgd2lsbCBjaGVja1xyXG5cdCAqIGF0IG1vc3Qgb25jZSBldmVyeSAxMDBtcy5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tTZWxlY3Rpb25DaGFuZ2VkID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IGNoZWNrID0gKCkgPT4ge1xyXG5cdFx0XHQvLyBEb24ndCBjcmVhdGUgbmV3IHNlbGVjdGlvbiBpZiB0aGVyZSBpc24ndCBvbmUgKGxpa2UgYWZ0ZXJcclxuXHRcdFx0Ly8gYmx1ciBldmVudCBpbiBpT1MpXHJcblx0XHRcdGlmICh0aGlzRWRpdG9yLnd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkgJiZcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkucmFuZ2VDb3VudCA8PSAwKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcclxuXHRcdFx0XHQvLyByYW5nZUhlbHBlciBjb3VsZCBiZSBudWxsIGlmIGVkaXRvciB3YXMgZGVzdHJveWVkXHJcblx0XHRcdFx0Ly8gYmVmb3JlIHRoZSB0aW1lb3V0IGhhZCBmaW5pc2hlZFxyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXNFZGl0b3IucmFuZ2VIZWxwZXIgJiYgIXRoaXNFZGl0b3IucmFuZ2VIZWxwZXIuY29tcGFyZSh0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24pKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uID0gdGhpc0VkaXRvci5yYW5nZUhlbHBlci5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoZSBzZWxlY3Rpb24gaXMgaW4gYW4gaW5saW5lIHdyYXAgaXQgaW4gYSBibG9jay5cclxuXHRcdFx0XHQvLyBGaXhlcyAjMzMxXHJcblx0XHRcdFx0aWYgKHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbiAmJiB0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24uY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0XHRsZXQgcGFyZW50ID0gdGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uLnN0YXJ0Q29udGFpbmVyO1xyXG5cdFx0XHRcdFx0bGV0IG9mZnNldCA9IHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbi5zdGFydE9mZnNldDtcclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0aWYgKG9mZnNldCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcclxuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LmNoaWxkTm9kZXNbb2Zmc2V0XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR3aGlsZSAocGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSB0aGlzRWRpdG9yLnd5c2l3eWdCb2R5KSB7XHJcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci53cmFwSW5saW5lcyh0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCB0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRcdHRoaXNFZGl0b3IucmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20udHJpZ2dlcih0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc0VkaXRvci5pc1NlbGVjdGlvbkNoZWNrUGVuZGluZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzRWRpdG9yLmlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBEb24ndCBuZWVkIHRvIGxpbWl0IGNoZWNraW5nIGlmIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFNlbGVjdGlvbiBBUElcclxuXHRcdGlmICgnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHRoaXNFZGl0b3Iud3lzaXd5Z0RvY3VtZW50KSB7XHJcblx0XHRcdGNoZWNrKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGNoZWNrLCAxMDApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYW55IGtleSBwcmVzcyBpbiB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVLZXlQcmVzcyA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHQvLyBGRiBidWc6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTUwMTQ5NlxyXG5cdFx0aWYgKGUuZGVmYXVsdFByZXZlbnRlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jbG9zZURyb3BEb3duKCk7XHJcblxyXG5cdFx0Ly8gMTMgPSBlbnRlciBrZXlcclxuXHRcdGlmIChlLndoaWNoID09PSAxMykge1xyXG5cdFx0XHRsZXQgTElTVF9UQUdTID0gJ2xpLHVsLG9sJztcclxuXHJcblx0XHRcdC8vIFwiRml4XCIgKGNsdWRnZSkgZm9yIGJsb2NrbGV2ZWwgZWxlbWVudHMgYmVpbmcgZHVwbGljYXRlZCBpbiBzb21lXHJcblx0XHRcdC8vIGJyb3dzZXJzIHdoZW4gZW50ZXIgaXMgcHJlc3NlZCBpbnN0ZWFkIG9mIGluc2VydGluZyBhIG5ld2xpbmVcclxuXHRcdFx0aWYgKCFkb20uaXModGhpcy5jdXJyZW50QmxvY2tOb2RlLCBMSVNUX1RBR1MpICYmXHJcblx0XHRcdFx0ZG9tLmhhc1N0eWxpbmcodGhpcy5jdXJyZW50QmxvY2tOb2RlKSkge1xyXG5cclxuXHRcdFx0XHRsZXQgYnIgPSBkb20uY3JlYXRlRWxlbWVudCgnYnInLCB7fSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuaW5zZXJ0Tm9kZShicik7XHJcblxyXG5cdFx0XHRcdC8vIExhc3QgPGJyPiBvZiBhIGJsb2NrIHdpbGwgYmUgY29sbGFwc2VkICBzbyBuZWVkIHRvIG1ha2Ugc3VyZVxyXG5cdFx0XHRcdC8vIHRoZSA8YnI+IHRoYXQgd2FzIGluc2VydGVkIGlzbid0IHRoZSBsYXN0IG5vZGUgb2YgYSBibG9jay5cclxuXHRcdFx0XHRsZXQgcGFyZW50ID0gYnIucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRsZXQgbGFzdENoaWxkID0gcGFyZW50Lmxhc3RDaGlsZCBhcyBhbnk7XHJcblxyXG5cdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxyXG5cdFx0XHRcdGlmIChsYXN0Q2hpbGQgJiYgbGFzdENoaWxkLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFICYmXHJcblx0XHRcdFx0XHRsYXN0Q2hpbGQubm9kZVZhbHVlID09PSAnJykge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0bGFzdENoaWxkID0gcGFyZW50Lmxhc3RDaGlsZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgQlIgb2YgYSBibG9jayBhbmQgdGhlIHByZXZpb3VzXHJcblx0XHRcdFx0Ly8gc2libGluZyBpcyBpbmxpbmUgdGhlbiB3aWxsIG5lZWQgYW4gZXh0cmEgQlIuIFRoaXNcclxuXHRcdFx0XHQvLyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgbGFzdCBCUiBvZiBhIGJsb2NrIHdpbGwgYmVcclxuXHRcdFx0XHQvLyBjb2xsYXBzZWQuIEZpeGVzIGlzc3VlICMyNDhcclxuXHRcdFx0XHRpZiAoIWRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpICYmIGxhc3RDaGlsZCA9PT0gYnIgJiZcclxuXHRcdFx0XHRcdGRvbS5pc0lubGluZShici5wcmV2aW91c1NpYmxpbmcpKSB7XHJcblx0XHRcdFx0XHR0aGlzLnJhbmdlSGVscGVyLmluc2VydEhUTUwoJzxicj4nKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIHN1cmUgdGhhdCBpZiB0aGVyZSBpcyBhIGNvZGUgb3IgcXVvdGUgdGFnIGF0IHRoZVxyXG5cdCAqIGVuZCBvZiB0aGUgZWRpdG9yLCB0aGF0IHRoZXJlIGlzIGEgbmV3IGxpbmUgYWZ0ZXIgaXQuXHJcblx0ICpcclxuXHQgKiBJZiB0aGVyZSB3YXNuJ3QgYSBuZXcgbGluZSBhdCB0aGUgZW5kIHlvdSB3b3VsZG4ndCBiZSBhYmxlXHJcblx0ICogdG8gZW50ZXIgYW55IHRleHQgYWZ0ZXIgYSBjb2RlL3F1b3RlIHRhZ1xyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGFwcGVuZE5ld0xpbmUgPSAoKTogdm9pZCA9PiB7XHJcblx0XHQvLyBDaGVjayBhbGwgbm9kZXMgaW4gcmV2ZXJzZSB1bnRpbCBlaXRoZXIgYWRkIGEgbmV3IGxpbmVcclxuXHRcdC8vIG9yIHJlYWNoIGEgbm9uLWVtcHR5IHRleHRub2RlIG9yIEJSIGF0IHdoaWNoIHBvaW50IGNhblxyXG5cdFx0Ly8gc3RvcCBjaGVja2luZy5cclxuXHRcdGRvbS5yVHJhdmVyc2UodGhpcy53eXNpd3lnQm9keSwgKG5vZGU6IGFueSkgPT4ge1xyXG5cdFx0XHQvLyBMYXN0IGJsb2NrLCBhZGQgbmV3IGxpbmUgYWZ0ZXIgaWYgaGFzIHN0eWxpbmdcclxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiZcclxuXHRcdFx0XHQhL2lubGluZS8udGVzdChkb20uY3NzKG5vZGUsICdkaXNwbGF5JykpKSB7XHJcblxyXG5cdFx0XHRcdC8vIEFkZCBsaW5lIGJyZWFrIGFmdGVyIGlmIGhhcyBzdHlsaW5nXHJcblx0XHRcdFx0aWYgKCFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItbmxmJykgJiYgZG9tLmhhc1N0eWxpbmcobm9kZSkpIHtcclxuXHRcdFx0XHRcdGxldCBwYXJhZ3JhcGggPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRwYXJhZ3JhcGguY2xhc3NOYW1lID0gJ2VtbGVkaXRvci1ubGYnO1xyXG5cdFx0XHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9ICc8YnIgLz4nO1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0JvZHksIHBhcmFncmFwaCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBMYXN0IG5vbi1lbXB0eSB0ZXh0IG5vZGUgb3IgbGluZSBicmVhay5cclxuXHRcdFx0Ly8gTm8gbmVlZCB0byBhZGQgbGluZS1icmVhayBhZnRlciB0aGVtXHJcblx0XHRcdGlmICgobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAhL15cXHMqJC8udGVzdChub2RlLm5vZGVWYWx1ZSkpIHx8XHJcblx0XHRcdFx0ZG9tLmlzKG5vZGUsICdicicpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGZvcm0gcmVzZXQgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlRm9ybVJlc2V0ID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0dGhpcy52YWwodGhpcy50ZXh0YXJlYS52YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkgbW91c2Vkb3duIHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVNb3VzZURvd24gPSAoKTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLmNsb3NlRHJvcERvd24oKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQYXNzZXMgZXZlbnRzIG9uIHRvIGFueSBoYW5kbGVyc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVFdmVudCA9IChlOiBFdmVudCk6IHZvaWQgPT4ge1xyXG5cdFx0aWYgKHRoaXMucGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHQvLyBTZW5kIGV2ZW50IHRvIGFsbCBwbHVnaW5zXHJcblx0XHRcdHRoaXMucGx1Z2luTWFuYWdlci5jYWxsKGUudHlwZSArICdFdmVudCcsIGUsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNvbnZlcnQgdGhlIGV2ZW50IGludG8gYSBjdXN0b20gZXZlbnQgdG8gc2VuZFxyXG5cdFx0bGV0IG5hbWUgPSAoZS50YXJnZXQgPT09IHRoaXMuc291cmNlRWRpdG9yID8gJ2VtbHNyYycgOiAnZW1sd3lzJykgKyBlLnR5cGUgYXMga2V5b2YgdHlwZW9mIHRoaXMuZXZlbnRIYW5kbGVycztcclxuXHJcblx0XHRpZiAodGhpcy5ldmVudEhhbmRsZXJzW25hbWVdKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1tuYW1lXS5mb3JFYWNoKChmbjogYW55KSA9PiB7XHJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW1vdGljb25zIGtleXByZXNzIGhhbmRsZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZW1vdGljb25zS2V5UHJlc3MgPSAoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHJlcGxhY2VkRW1vdGljb24sIGNhY2hlUG9zID0gMCwgZW1vdGljb25zQ2FjaGUgPSB0aGlzLmVtb3RpY29uc0NhY2hlLCBjdXJDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBNYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0aWYgKGRvbS5jbG9zZXN0KHRoaXMuY3VycmVudEJsb2NrTm9kZSwgJ2NvZGUnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFlbW90aWNvbnNDYWNoZSkge1xyXG5cdFx0XHRlbW90aWNvbnNDYWNoZSA9IFtdO1xyXG5cclxuXHRcdFx0dXRpbHMuZWFjaCh0aGlzLmFsbEVtb3RpY29ucywgKGtleSwgaHRtbCkgPT4ge1xyXG5cdFx0XHRcdGVtb3RpY29uc0NhY2hlW2NhY2hlUG9zKytdID0gW2tleSwgaHRtbF07XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZW1vdGljb25zQ2FjaGUuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcclxuXHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0aGlzLmVtb3RpY29uc0NhY2hlID0gZW1vdGljb25zQ2FjaGU7XHJcblx0XHRcdHRoaXMubG9uZ2VzdEVtb3RpY29uQ29kZSA9XHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbZW1vdGljb25zQ2FjaGUubGVuZ3RoIC0gMV1bMF0ubGVuZ3RoO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJlcGxhY2VkRW1vdGljb24gPSB0aGlzLnJhbmdlSGVscGVyLnJlcGxhY2VLZXl3b3JkKFxyXG5cdFx0XHR0aGlzLmVtb3RpY29uc0NhY2hlLFxyXG5cdFx0XHR0cnVlLFxyXG5cdFx0XHR0cnVlLFxyXG5cdFx0XHR0aGlzLmxvbmdlc3RFbW90aWNvbkNvZGUsXHJcblx0XHRcdHRoaXMub3B0aW9ucy5lbW90aWNvbnNDb21wYXQsXHJcblx0XHRcdGN1ckNoYXJcclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKHJlcGxhY2VkRW1vdGljb24pIHtcclxuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMuZW1vdGljb25zQ29tcGF0IHx8ICEvXlxccyQvLnRlc3QoY3VyQ2hhcikpIHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBzdXJlIGVtb3RpY29ucyBhcmUgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGVtb3RpY29uc0NoZWNrV2hpdGVzcGFjZSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGVtb3RpY29ucy5jaGVja1doaXRlc3BhY2UodGhpcy5jdXJyZW50QmxvY2tOb2RlLCB0aGlzLnJhbmdlSGVscGVyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBrZXlkb3duIGV2ZW50LCB1c2VkIGZvciBzaG9ydGN1dHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlS2V5RG93biA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgc2hvcnRjdXQ6IGFueSA9IFtdLFxyXG5cclxuXHRcdFx0U0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdCdgJzogJ34nLFxyXG5cdFx0XHRcdCcxJzogJyEnLFxyXG5cdFx0XHRcdCcyJzogJ0AnLFxyXG5cdFx0XHRcdCczJzogJyMnLFxyXG5cdFx0XHRcdCc0JzogJyQnLFxyXG5cdFx0XHRcdCc1JzogJyUnLFxyXG5cdFx0XHRcdCc2JzogJ14nLFxyXG5cdFx0XHRcdCc3JzogJyYnLFxyXG5cdFx0XHRcdCc4JzogJyonLFxyXG5cdFx0XHRcdCc5JzogJygnLFxyXG5cdFx0XHRcdCcwJzogJyknLFxyXG5cdFx0XHRcdCctJzogJ18nLFxyXG5cdFx0XHRcdCc9JzogJysnLFxyXG5cdFx0XHRcdCc7JzogJzogJyxcclxuXHRcdFx0XHQnXFwnJzogJ1wiJyxcclxuXHRcdFx0XHQnLCc6ICc8JyxcclxuXHRcdFx0XHQnLic6ICc+JyxcclxuXHRcdFx0XHQnLyc6ICc/JyxcclxuXHRcdFx0XHQnXFxcXCc6ICd8JyxcclxuXHRcdFx0XHQnWyc6ICd7JyxcclxuXHRcdFx0XHQnXSc6ICd9J1xyXG5cdFx0XHR9LCBTUEVDSUFMX0tFWVM6IGFueSA9IHtcclxuXHRcdFx0XHQ4OiAnYmFja3NwYWNlJyxcclxuXHRcdFx0XHQ5OiAndGFiJyxcclxuXHRcdFx0XHQxMzogJ2VudGVyJyxcclxuXHRcdFx0XHQxOTogJ3BhdXNlJyxcclxuXHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcclxuXHRcdFx0XHQyNzogJ2VzYycsXHJcblx0XHRcdFx0MzI6ICdzcGFjZScsXHJcblx0XHRcdFx0MzM6ICdwYWdldXAnLFxyXG5cdFx0XHRcdDM0OiAncGFnZWRvd24nLFxyXG5cdFx0XHRcdDM1OiAnZW5kJyxcclxuXHRcdFx0XHQzNjogJ2hvbWUnLFxyXG5cdFx0XHRcdDM3OiAnbGVmdCcsXHJcblx0XHRcdFx0Mzg6ICd1cCcsXHJcblx0XHRcdFx0Mzk6ICdyaWdodCcsXHJcblx0XHRcdFx0NDA6ICdkb3duJyxcclxuXHRcdFx0XHQ0NTogJ2luc2VydCcsXHJcblx0XHRcdFx0NDY6ICdkZWwnLFxyXG5cdFx0XHRcdDkxOiAnd2luJyxcclxuXHRcdFx0XHQ5MjogJ3dpbicsXHJcblx0XHRcdFx0OTM6ICdzZWxlY3QnLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOScsXHJcblx0XHRcdFx0MTA2OiAnKicsXHJcblx0XHRcdFx0MTA3OiAnKycsXHJcblx0XHRcdFx0MTA5OiAnLScsXHJcblx0XHRcdFx0MTEwOiAnLicsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0MTEyOiAnZjEnLFxyXG5cdFx0XHRcdDExMzogJ2YyJyxcclxuXHRcdFx0XHQxMTQ6ICdmMycsXHJcblx0XHRcdFx0MTE1OiAnZjQnLFxyXG5cdFx0XHRcdDExNjogJ2Y1JyxcclxuXHRcdFx0XHQxMTc6ICdmNicsXHJcblx0XHRcdFx0MTE4OiAnZjcnLFxyXG5cdFx0XHRcdDExOTogJ2Y4JyxcclxuXHRcdFx0XHQxMjA6ICdmOScsXHJcblx0XHRcdFx0MTIxOiAnZjEwJyxcclxuXHRcdFx0XHQxMjI6ICdmMTEnLFxyXG5cdFx0XHRcdDEyMzogJ2YxMicsXHJcblx0XHRcdFx0MTQ0OiAnbnVtbG9jaycsXHJcblx0XHRcdFx0MTQ1OiAnc2Nyb2xsbG9jaycsXHJcblx0XHRcdFx0MTg2OiAnOycsXHJcblx0XHRcdFx0MTg3OiAnPScsXHJcblx0XHRcdFx0MTg4OiAnLCcsXHJcblx0XHRcdFx0MTg5OiAnLScsXHJcblx0XHRcdFx0MTkwOiAnLicsXHJcblx0XHRcdFx0MTkxOiAnLycsXHJcblx0XHRcdFx0MTkyOiAnYCcsXHJcblx0XHRcdFx0MjE5OiAnWycsXHJcblx0XHRcdFx0MjIwOiAnXFxcXCcsXHJcblx0XHRcdFx0MjIxOiAnXScsXHJcblx0XHRcdFx0MjIyOiAnXFwnJ1xyXG5cdFx0XHR9LCBOVU1QQURfU0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdDEwOTogJy0nLFxyXG5cdFx0XHRcdDExMDogJ2RlbCcsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0OTY6ICcwJyxcclxuXHRcdFx0XHQ5NzogJzEnLFxyXG5cdFx0XHRcdDk4OiAnMicsXHJcblx0XHRcdFx0OTk6ICczJyxcclxuXHRcdFx0XHQxMDA6ICc0JyxcclxuXHRcdFx0XHQxMDE6ICc1JyxcclxuXHRcdFx0XHQxMDI6ICc2JyxcclxuXHRcdFx0XHQxMDM6ICc3JyxcclxuXHRcdFx0XHQxMDQ6ICc4JyxcclxuXHRcdFx0XHQxMDU6ICc5J1xyXG5cdFx0XHR9LCB3aGljaCA9IGUud2hpY2gsIGNoYXJhY3RlciA9IFNQRUNJQUxfS0VZU1t3aGljaF0gfHwgU3RyaW5nLmZyb21DaGFyQ29kZSh3aGljaCkudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdjdHJsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGUuYWx0S2V5KSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goJ2FsdCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLnNoaWZ0S2V5KSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goJ3NoaWZ0Jyk7XHJcblxyXG5cdFx0XHRpZiAoTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdKSB7XHJcblx0XHRcdFx0Y2hhcmFjdGVyID0gTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdO1xyXG5cdFx0XHR9IGVsc2UgaWYgKFNISUZUX0tFWVNbY2hhcmFjdGVyXSkge1xyXG5cdFx0XHRcdGNoYXJhY3RlciA9IFNISUZUX0tFWVNbY2hhcmFjdGVyXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNoaWZ0IGlzIDE2LCBjdHJsIGlzIDE3IGFuZCBhbHQgaXMgMThcclxuXHRcdGlmIChjaGFyYWN0ZXIgJiYgKHdoaWNoIDwgMTYgfHwgd2hpY2ggPiAxOCkpIHtcclxuXHRcdFx0c2hvcnRjdXQucHVzaChjaGFyYWN0ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQuam9pbignKycpO1xyXG5cdFx0aWYgKHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVycyAmJlxyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdICYmXHJcblx0XHRcdHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0uY2FsbCh0aGlzRWRpdG9yKSA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBiYWNrc3BhY2Uga2V5IHByZXNzXHJcblx0ICpcclxuXHQgKiBXaWxsIHJlbW92ZSBibG9jayBzdHlsaW5nIGxpa2UgcXVvdGVzL2NvZGUgZWN0IGlmIGF0IHRoZSBzdGFydC5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlQmFja1NwYWNlID0gKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkID0+IHtcclxuXHRcdGxldCBub2RlLCBvZmZzZXQsIHJhbmdlLCBwYXJlbnQ7XHJcblxyXG5cdFx0Ly8gOCBpcyB0aGUgYmFja3NwYWNlIGtleVxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQmxvY2tSZW1vdmUgfHwgZS53aGljaCAhPT0gOCB8fFxyXG5cdFx0XHQhKHJhbmdlID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCkpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XHJcblx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcclxuXHJcblx0XHRpZiAob2Zmc2V0ICE9PSAwIHx8ICEocGFyZW50ID0gdGhpcy5jdXJyZW50U3R5bGVkQmxvY2tOb2RlKCkpIHx8XHJcblx0XHRcdGRvbS5pcyhwYXJlbnQsICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlIChub2RlICE9PSBwYXJlbnQpIHtcclxuXHRcdFx0d2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHQvLyBFdmVyeXRoaW5nIGJ1dCBlbXB0eSB0ZXh0IG5vZGVzIGJlZm9yZSB0aGUgY3Vyc29yXHJcblx0XHRcdFx0Ly8gc2hvdWxkIHByZXZlbnQgdGhlIHN0eWxlIGZyb20gYmVpbmcgcmVtb3ZlZFxyXG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFIHx8IG5vZGUubm9kZVZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRoZSBiYWNrc3BhY2Ugd2FzIHByZXNzZWQgYXQgdGhlIHN0YXJ0IG9mXHJcblx0XHQvLyB0aGUgY29udGFpbmVyIHNvIGNsZWFyIHRoZSBzdHlsZVxyXG5cdFx0dGhpcy5jbGVhckJsb2NrRm9ybWF0dGluZyhwYXJlbnQpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IHN0eWxlZCBibG9jayBub2RlIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvclxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3VycmVudFN0eWxlZEJsb2NrTm9kZSA9ICgpOiBIVE1MRWxlbWVudCA9PiB7XHJcblx0XHRsZXQgYmxvY2s6IGFueSA9IHRoaXMuY3VycmVudEJsb2NrTm9kZTtcclxuXHJcblx0XHR3aGlsZSAoIWRvbS5oYXNTdHlsaW5nKGJsb2NrKSB8fCBkb20uaXNJbmxpbmUoYmxvY2ssIHRydWUpKSB7XHJcblx0XHRcdGlmICghKGJsb2NrID0gYmxvY2sucGFyZW50Tm9kZSkgfHwgZG9tLmlzKGJsb2NrLCAnYm9keScpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJsb2NrO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyaWdnZXJzIHRoZSB2YWx1ZUNoYW5nZWQgc2lnbmFsIGlmIHRoZXJlIGlzXHJcblx0ICogYSBwbHVnaW4gdGhhdCBoYW5kbGVzIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgcmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCkgaGFzIGFscmVhZHkgYmVlblxyXG5cdCAqIGNhbGxlZCwgdGhlbiBzYXZlUmFuZ2Ugc2hvdWxkIGJlIHNldCB0byBmYWxzZVxyXG5cdCAqIHRvIHByZXZlbnQgdGhlIHJhbmdlIGJlaW5nIHNhdmVkIHR3aWNlLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBzYXZlUmFuZ2UgSWYgdG8gY2FsbCByYW5nZUhlbHBlci5zYXZlUmFuZ2UoKS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFzSGFuZGxlciA9IGZhbHNlO1xyXG5cdHByaXZhdGUgdHJpZ2dlclZhbHVlQ2hhbmdlZCA9IChzYXZlUmFuZ2U/OiBib29sZWFuKTogYW55ID0+IHtcclxuXHJcblx0XHRsZXQgbGFzdFZhbDogc3RyaW5nO1xyXG5cdFx0aWYgKCF0aGlzLnBsdWdpbk1hbmFnZXIgfHxcclxuXHRcdFx0KCF0aGlzLnBsdWdpbk1hbmFnZXIuaGFzSGFuZGxlcigndmFsdWVjaGFuZ2VkRXZlbnQnKSAmJlxyXG5cdFx0XHRcdCF0aGlzLmhhc0hhbmRsZXIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3VycmVudEh0bWwsIHNvdXJjZU1vZGUgPSB0aGlzLnNvdXJjZU1vZGUoKSwgaGFzU2VsZWN0aW9uID0gIXNvdXJjZU1vZGUgJiYgdGhpcy5yYW5nZUhlbHBlci5oYXNTZWxlY3Rpb24oKTtcclxuXHJcblx0XHQvLyBDb21wb3NpdGlvbiBlbmQgaXNuJ3QgZ3VhcmFudGVlZCB0byBmaXJlIGJ1dCBtdXN0IGhhdmVcclxuXHRcdC8vIGVuZGVkIHdoZW4gdHJpZ2dlclZhbHVlQ2hhbmdlZCgpIGlzIGNhbGxlZCBzbyByZXNldCBpdFxyXG5cdFx0dGhpcy5pc0NvbXBvc2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgZW1sZWRpdG9yLXN0YXJ0LW1hcmtlclxyXG5cdFx0Ly8gaXMgcHJlc2VudCBhcyB0aGUgcmFuZ2UgaXMgYWxyZWFkeSBzYXZlZFxyXG5cdFx0c2F2ZVJhbmdlID0gc2F2ZVJhbmdlICE9PSBmYWxzZSAmJlxyXG5cdFx0XHQhdGhpcy53eXNpd3lnRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtbGVkaXRvci1zdGFydC1tYXJrZXInKTtcclxuXHJcblx0XHQvLyBDbGVhciBhbnkgY3VycmVudCB0aW1lb3V0IGFzIGl0J3Mgbm93IGJlZW4gdHJpZ2dlcmVkXHJcblx0XHRpZiAodGhpcy52YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIpO1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN1cnJlbnRIdG1sID0gc291cmNlTW9kZSA/IHRoaXMuc291cmNlRWRpdG9yLnZhbHVlIDogdGhpcy53eXNpd3lnQm9keS5pbm5lckhUTUw7XHJcblxyXG5cdFx0Ly8gT25seSB0cmlnZ2VyIGlmIHNvbWV0aGluZyBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cclxuXHRcdGlmIChjdXJyZW50SHRtbCAhPT0gbGFzdFZhbCkge1xyXG5cdFx0XHRsYXN0VmFsID0gY3VycmVudEh0bWw7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3ZhbHVlY2hhbmdlZCcsIHtcclxuXHRcdFx0XHRyYXdWYWx1ZTogc291cmNlTW9kZSA/IHRoaXMudmFsKCkgOiBjdXJyZW50SHRtbFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnJlbW92ZU1hcmtlcnMoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEgYmx1ciBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB2YWx1ZUNoYW5nZWRCbHVyID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0aWYgKHRoaXMudmFsdWVDaGFuZ2VkS2V5VXBUaW1lcikge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEga2V5cHJlc3MgZXZlbnRcclxuXHQgKiBAcGFyYW0gIHtFdmVudH0gZSBUaGUga2V5cHJlc3MgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdmFsdWVDaGFuZ2VkS2V5VXAgPSAoZTogS2V5Ym9hcmRFdmVudCk6IGFueSA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgd2hpY2ggPSBlLndoaWNoO1xyXG5cdFx0bGV0IGxhc3RDaGFyOiBhbnkgPSB3aGljaDtcclxuXHRcdGxldCB0cmlnZ2VyTmV4dDogYm9vbGVhbjtcclxuXHRcdGxldCBsYXN0V2FzU3BhY2UgPSAobGFzdENoYXIgPT09IDEzIHx8IGxhc3RDaGFyID09PSAzMik7XHJcblx0XHRsZXQgbGFzdFdhc0RlbGV0ZSA9IChsYXN0Q2hhciA9PT0gOCB8fCBsYXN0Q2hhciA9PT0gNDYpO1xyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyAxMyA9IHJldHVybiAmIDMyID0gc3BhY2VcclxuXHRcdGlmICh3aGljaCA9PT0gMTMgfHwgd2hpY2ggPT09IDMyKSB7XHJcblx0XHRcdGlmICghbGFzdFdhc1NwYWNlKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dHJpZ2dlck5leHQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIDggPSBiYWNrc3BhY2UgJiA0NiA9IGRlbFxyXG5cdFx0fSBlbHNlIGlmICh3aGljaCA9PT0gOCB8fCB3aGljaCA9PT0gNDYpIHtcclxuXHRcdFx0aWYgKCFsYXN0V2FzRGVsZXRlKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dHJpZ2dlck5leHQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKHRyaWdnZXJOZXh0KSB7XHJcblx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR0cmlnZ2VyTmV4dCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENsZWFyIHRoZSBwcmV2aW91cyB0aW1lb3V0IGFuZCBzZXQgYSBuZXcgb25lLlxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXNFZGl0b3IudmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciB0aGUgZXZlbnQgMS41cyBhZnRlciB0aGUgbGFzdCBrZXlwcmVzcyBpZiBzcGFjZVxyXG5cdFx0Ly8gaXNuJ3QgcHJlc3NlZC4gVGhpcyBtaWdodCBuZWVkIHRvIGJlIGxvd2VyZWQsIHdpbGwgbmVlZFxyXG5cdFx0Ly8gdG8gbG9vayBpbnRvIHdoYXQgdGhlIHNsb3dlc3QgYXZlcmFnZSBDaGFycyBQZXIgTWluIGlzLlxyXG5cdFx0dGhpc0VkaXRvci52YWx1ZUNoYW5nZWRLZXlVcFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpc0VkaXRvci5pc0NvbXBvc2luZykge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxNTAwKTtcclxuXHR9O1xyXG5cclxuXHRwcml2YXRlIGhhbmRsZUNvbXBvc2l0aW9uID0gKGU6IEV2ZW50KTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLmlzQ29tcG9zaW5nID0gL3N0YXJ0L2kudGVzdChlLnR5cGUpO1xyXG5cclxuXHRcdGlmICghdGhpcy5pc0NvbXBvc2luZykge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwcml2YXRlIGF1dG9VcGRhdGUgPSAoKTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLnNldFRleHRhcmVhVmFsdWUoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBPcHRpb25zIGZvciB0aGlzIGVkaXRvciBpbnN0YW5jZVxyXG5cdCAqIEBuYW1lIGVkaXRvck9wdGlvbnNcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb3B0aW9uczogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBTYW5pdGl6ZSBIVE1MIHRvIGF2b2lkIFhTU1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2FuaXRpemUgPSAoaHRtbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgc3RyaW5nKTogc3RyaW5nID0+IHtcclxuXHRcdGNvbnN0IGFsbG93ZWRUYWdzID0gWydpZnJhbWUnXS5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRUYWdzKTtcclxuXHRcdGNvbnN0IGFsbG93ZWRBdHRycyA9IFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddXHJcblx0XHRcdC5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kb21QdXJpZnkuc2FuaXRpemUoaHRtbCwge1xyXG5cdFx0XHRBRERfVEFHUzogYWxsb3dlZFRhZ3MsXHJcblx0XHRcdEFERF9BVFRSOiBhbGxvd2VkQXR0cnNcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgcGFzdGVkIGRhdGEsIGZpbHRlcnMgaXQgYW5kIHRoZW4gaW5zZXJ0cyBpdC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVQYXN0ZURhdGEgPSAoZGF0YTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgcGFzdGVBcmVhID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlUmF3JywgZGF0YSk7XHJcblx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3Bhc3RlcmF3JywgZGF0YSk7XHJcblxyXG5cdFx0aWYgKGRhdGEuaHRtbCkge1xyXG5cdFx0XHQvLyBTYW5pdGl6ZSBhZ2FpbiBpbiBjYXNlIHBsdWdpbnMgbW9kaWZpZWQgdGhlIEhUTUxcclxuXHRcdFx0cGFzdGVBcmVhLmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUoZGF0YS5odG1sKTtcclxuXHJcblx0XHRcdC8vIGZpeCBhbnkgaW52YWxpZCBuZXN0aW5nXHJcblx0XHRcdGRvbS5maXhOZXN0aW5nKHBhc3RlQXJlYSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXN0ZUFyZWEuaW5uZXJIVE1MID0gZXNjYXBlLmVudGl0aWVzKGRhdGEudGV4dCB8fCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBhc3RlOiBhbnkgPSB7XHJcblx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdHBhc3RlLnZhbCA9IHRoaXMuZm9ybWF0XHJcblx0XHRcdFx0LmZyYWdtZW50VG9Tb3VyY2UocGFzdGUudmFsLCB0aGlzLnd5c2l3eWdEb2N1bWVudCwgdGhpcy5jdXJyZW50Tm9kZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlJywgcGFzdGUpO1xyXG5cdFx0ZG9tLnRyaWdnZXIodGhpcy5lZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRwYXN0ZS52YWwgPSB0aGlzLmZvcm1hdFxyXG5cdFx0XHRcdC5mcmFnbWVudFRvSHRtbChwYXN0ZS52YWwsIHRoaXMuY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZUh0bWwnLCBwYXN0ZSk7XHJcblxyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMucmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChwYXN0ZS52YWwsIG51bGwsIHRydWUpO1xyXG5cdFx0ZG9tLm1lcmdlKHBhcmVudCk7XHJcblx0fTtcclxuXHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cclxuXHJcblxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBQbHVnaW5NYW5hZ2VyIHtcclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKHRoaXNPYmo6IGFueSkge1xyXG5cclxuXHRcdFBsdWdpbk1hbmFnZXIucGx1Z2lucyA9IHt9O1xyXG5cdFx0LyoqXHJcblx0XHQgKiBBcnJheSBvZiBhbGwgY3VycmVudGx5IHJlZ2lzdGVyZWQgcGx1Z2luc1xyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtBcnJheX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciByZWdpc3RlcmVkUGx1Z2luczogYW55W10gPSBbXTtcclxuXHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2hhbmdlcyBhIHNpZ25hbHMgbmFtZSBmcm9tIFwibmFtZVwiIGludG8gXCJzaWduYWxOYW1lXCIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBzaWduYWxcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBmb3JtYXRTaWduYWxOYW1lID0gZnVuY3Rpb24gKHNpZ25hbDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuICdzaWduYWwnICsgc2lnbmFsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc2lnbmFsLnNsaWNlKDEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENhbGxzIGhhbmRsZXJzIGZvciBhIHNpZ25hbFxyXG5cdFx0ICpcclxuXHRcdCAqIEBzZWUgY2FsbCgpXHJcblx0XHQgKiBAc2VlIGNhbGxPbmx5Rmlyc3QoKVxyXG5cdFx0ICogQHBhcmFtICB7QXJyYXl9ICAgYXJnc1xyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gcmV0dXJuQXRGaXJzdFxyXG5cdFx0ICogQHJldHVybiB7Kn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBjYWxsSGFuZGxlcnMgPSBmdW5jdGlvbiAoYXJnczogSUFyZ3VtZW50cywgcmV0dXJuQXRGaXJzdDogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3MpO1xyXG5cclxuXHRcdFx0dmFyIGlkeCwgcmV0LCBzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKEFycmF5LmZyb20oYXJncykuc2hpZnQoKSk7XHJcblxyXG5cdFx0XHRmb3IgKGlkeCA9IDA7IGlkeCA8IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDsgaWR4KyspIHtcclxuXHRcdFx0XHRpZiAoc2lnbmFsIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF0pIHtcclxuXHRcdFx0XHRcdHJldCA9IHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF1bc2lnbmFsXS5hcHBseSh0aGlzT2JqLCBhcmdzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmV0dXJuQXRGaXJzdCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmV0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENhbGxzIGFsbCBoYW5kbGVycyBmb3IgdGhlIHBhc3NlZCBzaWduYWxcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIHNpZ25hbFxyXG5cdFx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNhbGxcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNhbGwgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55KTogdm9pZCB7XHJcblx0XHRcdGNhbGxIYW5kbGVycyhhcmdzLCBmYWxzZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2FsbHMgdGhlIGZpcnN0IGhhbmRsZXIgZm9yIGEgc2lnbmFsLCBhbmQgcmV0dXJucyB0aGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIHNpZ25hbFxyXG5cdFx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXHJcblx0XHQgKiBAcmV0dXJuIHsqfSBUaGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIGhhbmRsZXJcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY2FsbE9ubHlGaXJzdFxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2FsbE9ubHlGaXJzdCA9IGZ1bmN0aW9uICgpOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gY2FsbEhhbmRsZXJzKGFyZ3VtZW50cywgdHJ1ZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2hlY2tzIGlmIGEgc2lnbmFsIGhhcyBhIGhhbmRsZXJcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaGFzSGFuZGxlclxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChzaWduYWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgaSA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcclxuXHRcdFx0c2lnbmFsID0gZm9ybWF0U2lnbmFsTmFtZShzaWduYWwpO1xyXG5cclxuXHRcdFx0d2hpbGUgKGktLSkge1xyXG5cdFx0XHRcdGlmIChzaWduYWwgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaV0pIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgcGx1Z2luIGV4aXN0cyBpbiBwbHVnaW5zXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGV4aXN0c1xyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZXhpc3RzID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChwbHVnaW4gaW4gUGx1Z2luTWFuYWdlci5wbHVnaW5zKSB7XHJcblx0XHRcdFx0bGV0IHBsdWdpbk9iajoge30gPSBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdO1xyXG5cdFx0XHRcdHJldHVybiB0eXBlb2YgcGx1Z2luT2JqID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBwbHVnaW5PYmoucHJvdG90eXBlID09PSAnb2JqZWN0JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgcGFzc2VkIHBsdWdpbiBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHBsdWdpblxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaXNSZWdpc3RlcmVkXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pc1JlZ2lzdGVyZWQgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMuZXhpc3RzKHBsdWdpbikpIHtcclxuXHRcdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAoaWR4LS0pIHtcclxuXHRcdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1tpZHhdIGluc3RhbmNlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZWdpc3RlcnMgYSBwbHVnaW4gdG8gcmVjZWl2ZSBzaWduYWxzXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHJlZ2lzdGVyXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoIXRoaXMuZXhpc3RzKHBsdWdpbikgfHwgdGhpcy5pc1JlZ2lzdGVyZWQocGx1Z2luKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHBsdWdpbk9iaiA9IG5ldyB0aGlzLnBsdWdpbnNbcGx1Z2luXSgpO1xyXG5cdFx0XHRyZWdpc3RlcmVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XHJcblxyXG5cdFx0XHRpZiAoJ2luaXQnIGluIHRoaXMucGx1Z2luKSB7XHJcblx0XHRcdFx0cGx1Z2luT2JqLmluaXQuY2FsbCh0aGlzT2JqKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVyZWdpc3RlcnMgYSBwbHVnaW4uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGRlcmVnaXN0ZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmRlcmVnaXN0ZXIgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIHJlbW92ZWRQbHVnaW4sIHBsdWdpbklkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aCwgcmVtb3ZlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKCF0aGlzLmlzUmVnaXN0ZXJlZChwbHVnaW4pKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlbW92ZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChwbHVnaW5JZHgtLSkge1xyXG5cdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1twbHVnaW5JZHhdIGluc3RhbmNlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXSkge1xyXG5cdFx0XHRcdFx0cmVtb3ZlZFBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLnNwbGljZShwbHVnaW5JZHgsIDEpWzBdO1xyXG5cdFx0XHRcdFx0cmVtb3ZlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZW1vdmVkUGx1Z2luKSB7XHJcblx0XHRcdFx0XHRcdHJlbW92ZWRQbHVnaW4uZGVzdHJveS5jYWxsKHRoaXNPYmopO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlbW92ZWQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXJzIGFsbCBwbHVnaW5zIGFuZCByZW1vdmVzIHRoZSBvd25lciByZWZlcmVuY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQ2FsbGluZyBhbnkgZnVuY3Rpb25zIG9uIHRoaXMgb2JqZWN0IGFmdGVyIGNhbGxpbmdcclxuXHRcdCAqIGRlc3Ryb3kgd2lsbCBjYXVzZSBhIEpTIGVycm9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBuYW1lIGRlc3Ryb3lcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xyXG5cclxuXHRcdFx0d2hpbGUgKGktLSkge1xyXG5cdFx0XHRcdGlmICgnZGVzdHJveScgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaV0pIHtcclxuXHRcdFx0XHRcdHJlZ2lzdGVyZWRQbHVnaW5zW2ldLmRlc3Ryb3kuY2FsbCh0aGlzT2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlZ2lzdGVyZWRQbHVnaW5zID0gW107XHJcblx0XHRcdHRoaXNPYmogPSBudWxsO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwbHVnaW5zOiB7fTtcclxuXHRjYWxsOiAoLi4uYXJnOiBhbnkpID0+IHZvaWQ7XHJcblx0Y2FsbE9ubHlGaXJzdDogKCkgPT4gYW55O1xyXG5cdGhhc0hhbmRsZXI6IChzaWduYWw6IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRleGlzdHM6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRpc1JlZ2lzdGVyZWQ6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRyZWdpc3RlcjogKHBsdWdpbjogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdGRlcmVnaXN0ZXI6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRkZXN0cm95OiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xyXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuXHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgdGV4dCwgc3RhcnQvZW5kIG5vZGUgYW5kIG9mZnNldCBmb3JcclxuICogbGVuZ3RoIGNoYXJzIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHBhc3NlZCBub2RlXHJcbiAqIGF0IHRoZSBzcGVjaWZpZWQgb2Zmc2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtOb2RlfSAgbm9kZVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBvZmZzZXRcclxuICogQHBhcmFtICB7Ym9vbGVhbn0gaXNMZWZ0XHJcbiAqIEBwYXJhbSAge251bWJlcn0gIGxlbmd0aFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52YXIgb3V0ZXJUZXh0ID0gZnVuY3Rpb24gKHJhbmdlOiBhbnksIGlzTGVmdDogYm9vbGVhbiwgbGVuZ3RoOiBudW1iZXIpOiBhbnkge1xyXG5cdHZhciBub2RlVmFsdWUsIHJlbWFpbmluZywgc3RhcnQsIGVuZCwgbm9kZSxcclxuXHRcdHRleHQgPSAnJyxcclxuXHRcdG5leHQgPSByYW5nZS5zdGFydENvbnRhaW5lcixcclxuXHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cclxuXHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgbm9kZSBpcyBhIHBhcmFncmFwaCBhbmQgb2Zmc2V0XHJcblx0Ly8gcmVmZXJzIHRvIHRoZSBpbmRleCBvZiBhIHRleHQgbm9kZS5cclxuXHQvLyAzID0gdGV4dCBub2RlXHJcblx0aWYgKG5leHQgJiYgbmV4dC5ub2RlVHlwZSAhPT0gMykge1xyXG5cdFx0bmV4dCA9IG5leHQuY2hpbGROb2Rlc1tvZmZzZXRdO1xyXG5cdFx0b2Zmc2V0ID0gMDtcclxuXHR9XHJcblxyXG5cdHN0YXJ0ID0gZW5kID0gb2Zmc2V0O1xyXG5cclxuXHR3aGlsZSAobGVuZ3RoID4gdGV4dC5sZW5ndGggJiYgbmV4dCAmJiBuZXh0Lm5vZGVUeXBlID09PSAzKSB7XHJcblx0XHRub2RlVmFsdWUgPSBuZXh0Lm5vZGVWYWx1ZTtcclxuXHRcdHJlbWFpbmluZyA9IGxlbmd0aCAtIHRleHQubGVuZ3RoO1xyXG5cclxuXHRcdC8vIElmIG5vdCB0aGUgZmlyc3Qgbm9kZSwgc3RhcnQgYW5kIGVuZCBzaG91bGQgYmUgYXQgdGhlaXJcclxuXHRcdC8vIG1heCB2YWx1ZXMgYXMgd2lsbCBiZSB1cGRhdGVkIHdoZW4gZ2V0dGluZyB0aGUgdGV4dFxyXG5cdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0ZW5kID0gbm9kZVZhbHVlLmxlbmd0aDtcclxuXHRcdFx0c3RhcnQgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0O1xyXG5cclxuXHRcdGlmIChpc0xlZnQpIHtcclxuXHRcdFx0c3RhcnQgPSBNYXRoLm1heChlbmQgLSByZW1haW5pbmcsIDApO1xyXG5cdFx0XHRvZmZzZXQgPSBzdGFydDtcclxuXHJcblx0XHRcdHRleHQgPSBub2RlVmFsdWUuc3Vic3RyKHN0YXJ0LCBlbmQgLSBzdGFydCkgKyB0ZXh0O1xyXG5cdFx0XHRuZXh0ID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbmQgPSBNYXRoLm1pbihyZW1haW5pbmcsIG5vZGVWYWx1ZS5sZW5ndGgpO1xyXG5cdFx0XHRvZmZzZXQgPSBzdGFydCArIGVuZDtcclxuXHJcblx0XHRcdHRleHQgKz0gbm9kZVZhbHVlLnN1YnN0cihzdGFydCwgZW5kKTtcclxuXHRcdFx0bmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bm9kZTogbm9kZSB8fCBuZXh0LFxyXG5cdFx0b2Zmc2V0OiBvZmZzZXQsXHJcblx0XHR0ZXh0OiB0ZXh0XHJcblx0fTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSYW5nZSBoZWxwZXJcclxuICpcclxuICogQGNsYXNzIFJhbmdlSGVscGVyXHJcbiAqIEBuYW1lIFJhbmdlSGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmFuZ2VIZWxwZXIge1xyXG5cclxuXHRpbnNlcnRIVE1MOiAoaHRtbDogc3RyaW5nLCBlbmRIVE1MPzogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdGluc2VydE5vZGU6IChub2RlPzogYW55LCBlbmROb2RlPzogYW55KSA9PiBmYWxzZSB8IHVuZGVmaW5lZDtcclxuXHRjbG9uZVNlbGVjdGVkOiAoKSA9PiBSYW5nZTtcclxuXHRzZWxlY3RlZFJhbmdlOiAoKSA9PiBSYW5nZTtcclxuXHRoYXNTZWxlY3Rpb246ICgpID0+IGJvb2xlYW47XHJcblx0c2VsZWN0ZWRIdG1sOiAoKSA9PiBzdHJpbmc7XHJcblx0cGFyZW50Tm9kZTogKCkgPT4gSFRNTEVsZW1lbnQ7XHJcblx0Z2V0Rmlyc3RCbG9ja1BhcmVudDogKG5vZGU/OiBhbnkpID0+IGFueTtcclxuXHRpbnNlcnROb2RlQXQ6IChzdGFydDogYW55LCBub2RlOiBhbnkpID0+IGJvb2xlYW47XHJcblx0aW5zZXJ0TWFya2VyczogKCkgPT4gdm9pZDtcclxuXHRnZXRNYXJrZXI6IChpZDogYW55KSA9PiBhbnk7XHJcblx0cmVtb3ZlTWFya2VyOiAoaWQ6IGFueSkgPT4gdm9pZDtcclxuXHRyZW1vdmVNYXJrZXJzOiAoKSA9PiB2b2lkO1xyXG5cdHNhdmVSYW5nZTogKCkgPT4gdm9pZDtcclxuXHRzZWxlY3RSYW5nZTogKHJhbmdlOiBhbnkpID0+IHZvaWQ7XHJcblx0cmVzdG9yZVJhbmdlOiAoKSA9PiBib29sZWFuO1xyXG5cdHNlbGVjdE91dGVyVGV4dDogKGxlZnQ6IGFueSwgcmlnaHQ6IGFueSkgPT4gYm9vbGVhbjtcclxuXHRnZXRPdXRlclRleHQ6IChiZWZvcmU6IGFueSwgbGVuZ3RoOiBhbnkpID0+IGFueTtcclxuXHRyZXBsYWNlS2V5d29yZDogKGtleXdvcmRzOiBhbnksIGluY2x1ZGVBZnRlcjogYW55LCBrZXl3b3Jkc1NvcnRlZDogYW55LCBsb25nZXN0S2V5d29yZDogYW55LCByZXF1aXJlV2hpdGVzcGFjZTogYW55LCBrZXlwcmVzc0NoYXI6IGFueSkgPT4gYm9vbGVhbjtcclxuXHRjb21wYXJlOiAocm5nQT86IGFueSwgcm5nQj86IGFueSkgPT4gYm9vbGVhbjtcclxuXHRjbGVhcjogKCkgPT4gdm9pZDtcclxuXHJcblx0Y29uc3RydWN0b3Iod2luOiBhbnksIGQ6IG51bGwsIHNhbml0aXplOiB7IChodG1sOiBzdHJpbmcpOiBzdHJpbmc7IChhcmcwOiBhbnkpOiBzdHJpbmc7IH0pIHtcclxuXHRcdGxldCBfY3JlYXRlTWFya2VyOiBhbnk7XHJcblx0XHRsZXQgX3ByZXBhcmVJbnB1dDogYW55O1xyXG5cdFx0bGV0IGRvYzogYW55ID0gZCB8fCB3aW4uY29udGVudERvY3VtZW50IHx8IHdpbi5kb2N1bWVudDtcclxuXHRcdGxldCBzdGFydE1hcmtlcjogc3RyaW5nID0gJ2VtbGVkaXRvci1zdGFydC1tYXJrZXInO1xyXG5cdFx0bGV0IGVuZE1hcmtlcjogc3RyaW5nID0gJ2VtbGVkaXRvci1lbmQtbWFya2VyJztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgSFRNTCBpbnRvIHRoZSBjdXJyZW50IHJhbmdlIHJlcGxhY2luZyBhbnkgc2VsZWN0ZWRcclxuXHRcdCAqIHRleHQuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kSFRNTCBpcyBzcGVjaWZpZWQgdGhlIHNlbGVjdGVkIGNvbnRlbnRzIHdpbGwgYmUgcHV0IGJldHdlZW5cclxuXHRcdCAqIGh0bWwgYW5kIGVuZEhUTUwuIElmIHRoZXJlIGlzIG5vdGhpbmcgc2VsZWN0ZWQgaHRtbCBhbmQgZW5kSFRNTCBhcmVcclxuXHRcdCAqIGp1c3QgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kSFRNTF1cclxuXHRcdCAqIEByZXR1cm4gRmFsc2Ugb24gZmFpbFxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnRIVE1MXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0SFRNTCA9IGZ1bmN0aW9uIChodG1sOiBzdHJpbmcsIGVuZEhUTUw/OiBzdHJpbmcpIHtcclxuXHRcdFx0dmFyIG5vZGUsIGRpdiwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlbmRIVE1MKSB7XHJcblx0XHRcdFx0aHRtbCArPSB0aGlzLnNlbGVjdGVkSHRtbCgpICsgZW5kSFRNTDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0bm9kZSA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblx0XHRcdGRpdi5pbm5lckhUTUwgPSBzYW5pdGl6ZShodG1sKTtcclxuXHJcblx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGxldCBkaXZGaXJzdENoaWxkID0gZGl2LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKG5vZGUsIGRpdkZpcnN0Q2hpbGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmluc2VydE5vZGUobm9kZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0KiBSZW1vdmVzIHRoZSBzdGFydC9lbmQgbWFya2Vyc1xyXG5cdFx0KlxyXG5cdFx0KiBAZnVuY3Rpb25cclxuXHRcdCogQG5hbWUgcmVtb3ZlTWFya2Vyc1xyXG5cdFx0KiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcihzdGFydE1hcmtlcik7XHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VyKGVuZE1hcmtlcik7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNhbWUgYXMgaW5zZXJ0SFRNTCBleGNlcHQgd2l0aCBET00gbm9kZXMgaW5zdGVhZFxyXG5cdFx0ICpcclxuXHRcdCAqIDxzdHJvbmc+V2FybmluZzo8L3N0cm9uZz4gdGhlIG5vZGVzIG11c3QgYmVsb25nIHRvIHRoZVxyXG5cdFx0ICogZG9jdW1lbnQgdGhleSBhcmUgYmVpbmcgaW5zZXJ0ZWQgaW50by4gU29tZSBicm93c2Vyc1xyXG5cdFx0ICogd2lsbCB0aHJvdyBleGNlcHRpb25zIGlmIHRoZXkgZG9uJ3QuXHJcblx0XHQgKlxyXG5cdFx0ICogUmV0dXJucyBib29sZWFuIGZhbHNlIG9uIGZhaWxcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuXHRcdCAqIEBwYXJhbSB7Tm9kZX0gZW5kTm9kZVxyXG5cdFx0ICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnROb2RlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0Tm9kZSA9IGZ1bmN0aW9uIChub2RlPzogTm9kZSwgZW5kTm9kZT86IE5vZGUpOiBmYWxzZSB8IHVuZGVmaW5lZCB7XHJcblx0XHRcdGxldCBmaXJzdCwgbGFzdCwgaW5wdXQgPSBfcHJlcGFyZUlucHV0KG5vZGUsIGVuZE5vZGUpLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0bGV0IGVtcHR5Tm9kZXM6IGFueSA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKCFpbnB1dCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlSWZFbXB0eShub2RlOiBhbnkpIHtcclxuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBlbXB0eSBub2RlIGlmIGl0IHdhc24ndCBhbHJlYWR5IGVtcHR5XHJcblx0XHRcdFx0aWYgKG5vZGUgJiYgZG9tLmlzRW1wdHkobm9kZSkgJiYgZW1wdHlOb2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyYW5nZS5zdGFydENvbnRhaW5lciAhPT0gcmFuZ2UuZW5kQ29udGFpbmVyKSB7XHJcblx0XHRcdFx0dXRpbHMuZWFjaChwYXJlbnQuY2hpbGROb2RlcywgZnVuY3Rpb24gKF8sIG5vZGUpIHtcclxuXHRcdFx0XHRcdGlmIChkb20uaXNFbXB0eShub2RlKSkge1xyXG5cdFx0XHRcdFx0XHRlbXB0eU5vZGVzLnB1c2gobm9kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGZpcnN0ID0gaW5wdXQuZmlyc3RDaGlsZDtcclxuXHRcdFx0XHRsYXN0ID0gaW5wdXQubGFzdENoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xyXG5cclxuXHRcdFx0Ly8gRkYgYWxsb3dzIDxiciAvPiB0byBiZSBzZWxlY3RlZCBidXQgaW5zZXJ0aW5nIGEgbm9kZVxyXG5cdFx0XHQvLyBpbnRvIDxiciAvPiB3aWxsIGNhdXNlIGl0IG5vdCB0byBiZSBkaXNwbGF5ZWQgc28gbXVzdFxyXG5cdFx0XHQvLyBpbnNlcnQgYmVmb3JlIHRoZSA8YnIgLz4gaW4gRkYuXHJcblx0XHRcdC8vIDMgPSBUZXh0Tm9kZVxyXG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMyAmJiAhZG9tLmNhbkhhdmVDaGlsZHJlbihwYXJlbnQpKSB7XHJcblx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShpbnB1dCwgcGFyZW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyYW5nZS5pbnNlcnROb2RlKGlucHV0KTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgYSBub2RlIHdhcyBzcGxpdCBvciBpdHMgY29udGVudHMgZGVsZXRlZCwgcmVtb3ZlIGFueSByZXN1bHRpbmdcclxuXHRcdFx0XHQvLyBlbXB0eSB0YWdzLiBGb3IgZXhhbXBsZTpcclxuXHRcdFx0XHQvLyA8cD58dGVzdDwvcD48ZGl2PnRlc3R8PC9kaXY+XHJcblx0XHRcdFx0Ly8gV2hlbiBkZWxldGVDb250ZW50cyBjb3VsZCBiZWNvbWU6XHJcblx0XHRcdFx0Ly8gPHA+PC9wPnw8ZGl2PjwvZGl2PlxyXG5cdFx0XHRcdC8vIFNvIHJlbW92ZSB0aGUgZW1wdHkgb25lc1xyXG5cdFx0XHRcdHJlbW92ZUlmRW1wdHkoZmlyc3QgJiYgZmlyc3QucHJldmlvdXNTaWJsaW5nKTtcclxuXHRcdFx0XHRyZW1vdmVJZkVtcHR5KGxhc3QgJiYgbGFzdC5uZXh0U2libGluZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucmVzdG9yZVJhbmdlKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xvbmVzIHRoZSBzZWxlY3RlZCBSYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge1JhbmdlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjbG9uZVNlbGVjdGVkXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2xvbmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpOiBSYW5nZSB7XHJcblx0XHRcdHZhciByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKHJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJhbmdlLmNsb25lUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHNlbGVjdGVkIFJhbmdlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7UmFuZ2V9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdGVkUmFuZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zZWxlY3RlZFJhbmdlID0gZnVuY3Rpb24gKCk6IFJhbmdlIHtcclxuXHRcdFx0dmFyIHJhbmdlLCBmaXJzdENoaWxkLCBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAoIXNlbCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gV2hlbiBjcmVhdGluZyBhIG5ldyByYW5nZSwgc2V0IHRoZSBzdGFydCB0byB0aGUgZmlyc3QgY2hpbGRcclxuXHRcdFx0Ly8gZWxlbWVudCBvZiB0aGUgYm9keSBlbGVtZW50IHRvIGF2b2lkIGVycm9ycyBpbiBGRi5cclxuXHRcdFx0aWYgKHNlbC5yYW5nZUNvdW50IDw9IDApIHtcclxuXHRcdFx0XHRmaXJzdENoaWxkID0gZG9jLmJvZHk7XHJcblx0XHRcdFx0d2hpbGUgKGZpcnN0Q2hpbGQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0Zmlyc3RDaGlsZCA9IGZpcnN0Q2hpbGQuZmlyc3RDaGlsZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdFx0Ly8gTXVzdCBiZSBzZXRTdGFydEJlZm9yZSBvdGhlcndpc2UgaXQgY2FuIGNhdXNlIGluZmluaXRlXHJcblx0XHRcdFx0Ly8gbG9vcHMgd2l0aCBsaXN0cyBpbiBXZWJLaXQuIFNlZSBpc3N1ZSA0NDJcclxuXHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShmaXJzdENoaWxkKTtcclxuXHJcblx0XHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbC5yYW5nZUNvdW50ID4gMCkge1xyXG5cdFx0XHRcdHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByYW5nZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGhhc1NlbGVjdGlvblxyXG5cdFx0ICogQHNpbmNlIDEuNC40XHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaGFzU2VsZWN0aW9uID0gZnVuY3Rpb24gKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlbCAmJiBzZWwucmFuZ2VDb3VudCA+IDA7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIEhUTUxcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdGVkSHRtbFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdGVkSHRtbCA9IGZ1bmN0aW9uICgpOiBzdHJpbmcge1xyXG5cdFx0XHR2YXIgZGl2LCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKHJhbmdlKSB7XHJcblx0XHRcdFx0ZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHBhcmVudCBub2RlIG9mIHRoZSBzZWxlY3RlZCBjb250ZW50cyBpbiB0aGUgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcGFyZW50Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnBhcmVudE5vZGUgPSBmdW5jdGlvbiAoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcclxuXHRcdCAqIGNvbnRlbnRzIG9mIHRoZSByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcclxuXHRcdCAqIGNvbnRlbnRzIG9mIHRoZSByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IFtuXSBUaGUgZWxlbWVudCB0byBnZXQgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBmcm9tXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudF4yXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRGaXJzdEJsb2NrUGFyZW50ID0gZnVuY3Rpb24gKG5vZGU/OiBhbnkpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRcdHZhciBmdW5jID0gZnVuY3Rpb24gKGVsbTogYW55KTogYW55IHtcclxuXHRcdFx0XHRpZiAoIWRvbS5pc0lubGluZShlbG0sIHRydWUpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZWxtO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWxtID0gZWxtID8gZWxtLnBhcmVudE5vZGUgOiBudWxsO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZWxtID8gZnVuYyhlbG0pIDogZWxtO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmMobm9kZSB8fCB0aGlzLnBhcmVudE5vZGUoKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBhIG5vZGUgYXQgZWl0aGVyIHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtCb29sfSBzdGFydFxyXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBub2RlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydE5vZGVBdFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmluc2VydE5vZGVBdCA9IGZ1bmN0aW9uIChzdGFydDogYm9vbGVhbiwgbm9kZTogTm9kZSkge1xyXG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCksIHJhbmdlID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShzdGFydCk7XHJcblx0XHRcdHJhbmdlLmluc2VydE5vZGUobm9kZSk7XHJcblxyXG5cdFx0XHQvLyBSZXNlbGVjdCB0aGUgY3VycmVudCByYW5nZS5cclxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBDaHJvbWUgbG9zaW5nIHRoZSBzZWxlY3Rpb24uIElzc3VlIzgyXHJcblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UoY3VycmVudFJhbmdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIHN0YXJ0L2VuZCBtYXJrZXJzIGZvciB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHJlc3RvcmVSYW5nZSB0byByZS1zZWxlY3QgdGhlXHJcblx0XHQgKiByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydE1hcmtlcnNcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pbnNlcnRNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRcdHZhciBzdGFydE5vZGUgPSBfY3JlYXRlTWFya2VyKHN0YXJ0TWFya2VyKTtcclxuXHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0XHR0aGlzLmluc2VydE5vZGVBdCh0cnVlLCBzdGFydE5vZGUpO1xyXG5cclxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBlbmQgbWFya2VyIHNvbWV0aW1lcyBiZWluZyBwbGFjZWQgYmVmb3JlXHJcblx0XHRcdC8vIHRoZSBzdGFydCBtYXJrZXIgd2hlbiB0aGUgcmFuZ2UgaXMgY29sbGFwc2VkLlxyXG5cdFx0XHRpZiAoY3VycmVudFJhbmdlICYmIGN1cnJlbnRSYW5nZS5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRzdGFydE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXHJcblx0XHRcdFx0XHRfY3JlYXRlTWFya2VyKGVuZE1hcmtlciksIHN0YXJ0Tm9kZS5uZXh0U2libGluZyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pbnNlcnROb2RlQXQoZmFsc2UsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBtYXJrZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElEXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcblx0XHQgKiBAcmV0dXJuIHtOb2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBnZXRNYXJrZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0cmV0dXJuIGRvYy5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlcyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZW1vdmVNYXJrZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0dmFyIG1hcmtlciA9IHRoaXMuZ2V0TWFya2VyKGlkKTtcclxuXHJcblx0XHRcdGlmIChtYXJrZXIpIHtcclxuXHRcdFx0XHRkb20ucmVtb3ZlKG1hcmtlcik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTYXZlcyB0aGUgY3VycmVudCByYW5nZSBsb2NhdGlvbi4gQWxpYXMgb2YgaW5zZXJ0TWFya2VycygpXHJcblx0XHQgKlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzYXZlUmFnZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNhdmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5pbnNlcnRNYXJrZXJzKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2VsZWN0IHRoZSBzcGVjaWZpZWQgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge1JhbmdlfSByYW5nZVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RSYW5nZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XHJcblx0XHRcdHZhciBsYXN0Q2hpbGQ7XHJcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdHZhciBjb250YWluZXIgPSByYW5nZS5lbmRDb250YWluZXI7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcclxuXHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcclxuXHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdGlmIChyYW5nZS5jb2xsYXBzZWQgJiYgY29udGFpbmVyICYmXHJcblx0XHRcdFx0IWRvbS5pc0lubGluZShjb250YWluZXIsIHRydWUpKSB7XHJcblxyXG5cdFx0XHRcdGxhc3RDaGlsZCA9IGNvbnRhaW5lci5sYXN0Q2hpbGQ7XHJcblx0XHRcdFx0d2hpbGUgKGxhc3RDaGlsZCAmJiBkb20uaXMobGFzdENoaWxkLCAnLmVtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0bGFzdENoaWxkID0gbGFzdENoaWxkLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkb20uaXMobGFzdENoaWxkLCAnYnInKSkge1xyXG5cdFx0XHRcdFx0dmFyIHJuZyA9IGRvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0cm5nLnNldEVuZEFmdGVyKGxhc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbXBhcmUocmFuZ2UsIHJuZykpIHtcclxuXHRcdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUobGFzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsKSB7XHJcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXN0b3JlcyB0aGUgbGFzdCByYW5nZSBzYXZlZCBieSBzYXZlUmFuZ2UoKSBvciBpbnNlcnRNYXJrZXJzKClcclxuXHRcdCAqXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHJlc3RvcmVSYW5nZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnJlc3RvcmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGlzQ29sbGFwc2VkLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBzdGFydCA9IHRoaXMuZ2V0TWFya2VyKHN0YXJ0TWFya2VyKSwgZW5kID0gdGhpcy5nZXRNYXJrZXIoZW5kTWFya2VyKTtcclxuXHJcblx0XHRcdGlmICghc3RhcnQgfHwgIWVuZCB8fCAhcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlzQ29sbGFwc2VkID0gc3RhcnQubmV4dFNpYmxpbmcgPT09IGVuZDtcclxuXHJcblx0XHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKHN0YXJ0KTtcclxuXHRcdFx0cmFuZ2Uuc2V0RW5kQWZ0ZXIoZW5kKTtcclxuXHJcblx0XHRcdGlmIChpc0NvbGxhcHNlZCkge1xyXG5cdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXJzKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2VsZWN0cyB0aGUgdGV4dCBsZWZ0IGFuZCByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gbGVmdFxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0XHJcblx0XHQgKiBAc2luY2UgMS40LjNcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlcikge1xyXG5cdFx0XHRsZXQgc3RhcnQ6IGFueSwgZW5kOiBhbnksIHJhbmdlOiBhbnkgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcclxuXHJcblx0XHRcdHN0YXJ0ID0gb3V0ZXJUZXh0KHJhbmdlLCB0cnVlLCBsZWZ0KTtcclxuXHRcdFx0ZW5kID0gb3V0ZXJUZXh0KHJhbmdlLCBmYWxzZSwgcmlnaHQpO1xyXG5cclxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQoc3RhcnQubm9kZSwgc3RhcnQub2Zmc2V0KTtcclxuXHRcdFx0cmFuZ2Uuc2V0RW5kKGVuZC5ub2RlLCBlbmQub2Zmc2V0KTtcclxuXHJcblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UocmFuZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHRleHQgbGVmdCBvciByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGJlZm9yZVxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmdldE91dGVyVGV4dCA9IGZ1bmN0aW9uIChiZWZvcmUsIGxlbmd0aCkge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKCFiZWZvcmUpO1xyXG5cclxuXHRcdFx0cmV0dXJuIG91dGVyVGV4dChyYW5nZSwgYmVmb3JlLCBsZW5ndGgpLnRleHQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVwbGFjZXMga2V5d29yZHMgd2l0aCB2YWx1ZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgY2FyZXQgcG9zaXRpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge0FycmF5fSAgIGtleXdvcmRzXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBZnRlciAgICAgIElmIHRvIGluY2x1ZGUgdGhlIHRleHQgYWZ0ZXIgdGhlXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgY2FyZXQgcG9zaXRpb24gb3IganVzdFxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0IGJlZm9yZVxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBrZXl3b3Jkc1NvcnRlZCAgICBJZiB0aGUga2V5d29yZHMgYXJyYXkgaXMgcHJlXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCBzaG9ydGVzdCB0byBsb25nZXN0XHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gIGxvbmdlc3RLZXl3b3JkICAgIExlbmd0aCBvZiB0aGUgbG9uZ2VzdCBrZXl3b3JkXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcXVpcmVXaGl0ZXNwYWNlIElmIHRoZSBrZXkgbXVzdCBiZSBzdXJyb3VuZGVkXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IHdoaXRlc3BhY2VcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSAga2V5cHJlc3NDaGFyICAgICAgSWYgdGhpcyBpcyBiZWluZyBjYWxsZWQgZnJvbVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGtleXByZXNzIGV2ZW50LCB0aGlzIHNob3VsZCBiZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQgdG8gdGhlIHByZXNzZWQgY2hhcmFjdGVyXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZXBsYWNlS2V5d29yZFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5cdFx0dGhpcy5yZXBsYWNlS2V5d29yZCA9IGZ1bmN0aW9uIChcclxuXHRcdFx0a2V5d29yZHMsXHJcblx0XHRcdGluY2x1ZGVBZnRlcixcclxuXHRcdFx0a2V5d29yZHNTb3J0ZWQsXHJcblx0XHRcdGxvbmdlc3RLZXl3b3JkLFxyXG5cdFx0XHRyZXF1aXJlV2hpdGVzcGFjZSxcclxuXHRcdFx0a2V5cHJlc3NDaGFyXHJcblx0XHQpIHtcclxuXHRcdFx0aWYgKCFrZXl3b3Jkc1NvcnRlZCkge1xyXG5cdFx0XHRcdGtleXdvcmRzLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG91dGVyVGV4dCwgbWF0Y2gsIG1hdGNoUG9zLCBzdGFydEluZGV4LCBsZWZ0TGVuLCBjaGFyc0xlZnQsIGtleXdvcmQsIGtleXdvcmRMZW4sIHdoaXRlc3BhY2VSZWdleCA9ICcoXnxbXFxcXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0pJywga2V5d29yZElkeCA9IGtleXdvcmRzLmxlbmd0aCwgd2hpdGVzcGFjZUxlbiA9IHJlcXVpcmVXaGl0ZXNwYWNlID8gMSA6IDAsIG1heEtleUxlbiA9IGxvbmdlc3RLZXl3b3JkIHx8XHJcblx0XHRcdFx0a2V5d29yZHNba2V5d29yZElkeCAtIDFdWzBdLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xyXG5cdFx0XHRcdG1heEtleUxlbisrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRrZXlwcmVzc0NoYXIgPSBrZXlwcmVzc0NoYXIgfHwgJyc7XHJcblx0XHRcdG91dGVyVGV4dCA9IHRoaXMuZ2V0T3V0ZXJUZXh0KHRydWUsIG1heEtleUxlbik7XHJcblx0XHRcdGxlZnRMZW4gPSBvdXRlclRleHQubGVuZ3RoO1xyXG5cdFx0XHRvdXRlclRleHQgKz0ga2V5cHJlc3NDaGFyO1xyXG5cclxuXHRcdFx0aWYgKGluY2x1ZGVBZnRlcikge1xyXG5cdFx0XHRcdG91dGVyVGV4dCArPSB0aGlzLmdldE91dGVyVGV4dChmYWxzZSwgbWF4S2V5TGVuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKGtleXdvcmRJZHgtLSkge1xyXG5cdFx0XHRcdGtleXdvcmQgPSBrZXl3b3Jkc1trZXl3b3JkSWR4XVswXTtcclxuXHRcdFx0XHRrZXl3b3JkTGVuID0ga2V5d29yZC5sZW5ndGg7XHJcblx0XHRcdFx0c3RhcnRJbmRleCA9IE1hdGgubWF4KDAsIGxlZnRMZW4gLSBrZXl3b3JkTGVuIC0gd2hpdGVzcGFjZUxlbik7XHJcblx0XHRcdFx0bWF0Y2hQb3MgPSAtMTtcclxuXHJcblx0XHRcdFx0aWYgKHJlcXVpcmVXaGl0ZXNwYWNlKSB7XHJcblx0XHRcdFx0XHRtYXRjaCA9IG91dGVyVGV4dFxyXG5cdFx0XHRcdFx0XHQuc3Vic3RyKHN0YXJ0SW5kZXgpXHJcblx0XHRcdFx0XHRcdC5tYXRjaChuZXcgUmVnRXhwKHdoaXRlc3BhY2VSZWdleCArXHJcblx0XHRcdFx0XHRcdFx0ZXNjYXBlLnJlZ2V4KGtleXdvcmQpICsgd2hpdGVzcGFjZVJlZ2V4KSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1hdGNoKSB7XHJcblx0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGVuZ3RoIG9mIHRoZSB0ZXh0IHRoYXQgd2FzIHJlbW92ZWQgYnlcclxuXHRcdFx0XHRcdFx0Ly8gc3Vic3RyKCkgYW5kIGFsc28gYWRkIDEgZm9yIHRoZSB3aGl0ZXNwYWNlXHJcblx0XHRcdFx0XHRcdG1hdGNoUG9zID0gbWF0Y2guaW5kZXggKyBzdGFydEluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtYXRjaFBvcyA9IG91dGVyVGV4dC5pbmRleE9mKGtleXdvcmQsIHN0YXJ0SW5kZXgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG1hdGNoUG9zID4gLTEpIHtcclxuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgbWF0Y2ggaXMgYmV0d2VlbiBiZWZvcmUgYW5kXHJcblx0XHRcdFx0XHQvLyBhZnRlciwgbm90IGp1c3QgZW50aXJlbHkgaW4gb25lIHNpZGUgb3IgdGhlIG90aGVyXHJcblx0XHRcdFx0XHRpZiAobWF0Y2hQb3MgPD0gbGVmdExlbiAmJlxyXG5cdFx0XHRcdFx0XHRtYXRjaFBvcyArIGtleXdvcmRMZW4gKyB3aGl0ZXNwYWNlTGVuID49IGxlZnRMZW4pIHtcclxuXHRcdFx0XHRcdFx0Y2hhcnNMZWZ0ID0gbGVmdExlbiAtIG1hdGNoUG9zO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGtleXByZXNzIGNoYXIgaXMgd2hpdGUgc3BhY2UgdGhlbiBpdCBzaG91bGRcclxuXHRcdFx0XHRcdFx0Ly8gbm90IGJlIHJlcGxhY2VkLCBvbmx5IGNoYXJzIHRoYXQgYXJlIHBhcnQgb2YgdGhlXHJcblx0XHRcdFx0XHRcdC8vIGtleSBzaG91bGQgYmUgcmVwbGFjZWQuXHJcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0KFxyXG5cdFx0XHRcdFx0XHRcdGNoYXJzTGVmdCxcclxuXHRcdFx0XHRcdFx0XHRrZXl3b3JkTGVuIC0gY2hhcnNMZWZ0IC1cclxuXHRcdFx0XHRcdFx0XHQoL15cXFMvLnRlc3Qoa2V5cHJlc3NDaGFyKSA/IDEgOiAwKVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5pbnNlcnRIVE1MKGtleXdvcmRzW2tleXdvcmRJZHhdWzFdKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ29tcGFyZXMgdHdvIHJhbmdlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiByYW5nZUIgaXMgdW5kZWZpbmVkIGl0IHdpbGwgYmUgc2V0IHRvXHJcblx0XHQgKiB0aGUgY3VycmVudCBzZWxlY3RlZCByYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge1JhbmdlfSBybmdBXHJcblx0XHQgKiBAcGFyYW0gIHtSYW5nZX0gW3JuZ0JdXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjb21wYXJlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY29tcGFyZSA9IGZ1bmN0aW9uIChybmdBPzogUmFuZ2UsIHJuZ0I/OiBSYW5nZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoIXJuZ0IpIHtcclxuXHRcdFx0XHRybmdCID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghcm5nQSB8fCAhcm5nQikge1xyXG5cdFx0XHRcdHJldHVybiAhcm5nQSAmJiAhcm5nQjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJuZ0EuY29tcGFyZUJvdW5kYXJ5UG9pbnRzKFJhbmdlLkVORF9UT19FTkQsIHJuZ0IpID09PSAwICYmXHJcblx0XHRcdFx0cm5nQS5jb21wYXJlQm91bmRhcnlQb2ludHMoUmFuZ2UuU1RBUlRfVE9fU1RBUlQsIHJuZ0IpID09PSAwO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZXMgYW55IGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuNC42XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNsZWFyXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAoc2VsKSB7XHJcblx0XHRcdFx0aWYgKHNlbC5yZW1vdmVBbGxSYW5nZXMpIHtcclxuXHRcdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbC5lbXB0eSkge1xyXG5cdFx0XHRcdFx0c2VsLmVtcHR5KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUHJlcGFyZXMgSFRNTCB0byBiZSBpbnNlcnRlZCBieSBhZGRpbmcgYSB6ZXJvIHdpZHRoIHNwYWNlXHJcblx0XHQgKiBpZiB0aGUgbGFzdCBjaGlsZCBpcyBlbXB0eSBhbmQgYWRkaW5nIHRoZSByYW5nZSBzdGFydC9lbmRcclxuXHRcdCAqIG1hcmtlcnMgdG8gdGhlIGxhc3QgY2hpbGQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IG5vZGVcclxuXHRcdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbZW5kTm9kZV1cclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXR1cm5IdG1sXVxyXG5cdFx0ICogQHJldHVybiB7Tm9kZXxzdHJpbmd9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRfcHJlcGFyZUlucHV0ID0gKG5vZGU6IE5vZGUgfCBzdHJpbmcsIGVuZE5vZGU6IEhUTUxFbGVtZW50IHwgc3RyaW5nLCByZXR1cm5IdG1sPzogYm9vbGVhbik6IE5vZGUgfCBzdHJpbmcgPT4ge1xyXG5cdFx0XHR2YXIgbGFzdENoaWxkLCBmcmFnID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRpZiAoZW5kTm9kZSkge1xyXG5cdFx0XHRcdFx0bm9kZSArPSB0aGlzLnNlbGVjdGVkSHRtbCgpICsgZW5kTm9kZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZyYWcgPSBkb20ucGFyc2VIVE1MKG5vZGUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxldCBodG1sTm9kZSA9IG5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGh0bWxOb2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBlbmROb2RlICE9PSAnc3RyaW5nJyAmJiBlbmROb2RlKSB7XHJcblx0XHRcdFx0XHRsZXQgZXh0cmFjdGVkID0gdGhpcy5zZWxlY3RlZFJhbmdlKCkuZXh0cmFjdENvbnRlbnRzKCk7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgZXh0cmFjdGVkKTtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBlbmROb2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKGxhc3RDaGlsZCA9IGZyYWcubGFzdENoaWxkKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKCFkb20uaXNJbmxpbmUobGFzdENoaWxkLmxhc3RDaGlsZCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQubGFzdENoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZG9tLmNhbkhhdmVDaGlsZHJlbihsYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0Ly8gV2Via2l0IHdvbid0IGFsbG93IHRoZSBjdXJzb3IgdG8gYmUgcGxhY2VkIGluc2lkZSBhblxyXG5cdFx0XHRcdC8vIGVtcHR5IHRhZywgc28gYWRkIGEgemVybyB3aWR0aCBzcGFjZSB0byBpdC5cclxuXHRcdFx0XHRpZiAoIWxhc3RDaGlsZC5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGxldCB0eHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1xcdTIwMEInKTtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIHR4dE5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBmcmFnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcnMoKTtcclxuXHJcblx0XHRcdC8vIEFwcGVuZCBtYXJrcyB0byBsYXN0IGNoaWxkIHNvIHdoZW4gcmVzdG9yZWQgY3Vyc29yIHdpbGwgYmUgaW5cclxuXHRcdFx0Ly8gdGhlIHJpZ2h0IHBsYWNlXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIF9jcmVhdGVNYXJrZXIoc3RhcnRNYXJrZXIpKTtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpKTtcclxuXHJcblx0XHRcdGlmIChyZXR1cm5IdG1sKSB7XHJcblx0XHRcdFx0dmFyIGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCBmcmFnKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmcmFnO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgYSBtYXJrZXIgbm9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0X2NyZWF0ZU1hcmtlciA9IChpZDogc3RyaW5nKTogSFRNTFNwYW5FbGVtZW50ID0+IHtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoaWQpO1xyXG5cclxuXHRcdFx0dmFyIG1hcmtlciA9IGRvbS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdGlkOiBpZCxcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3Itc2VsZWN0aW9uIGVtbGVkaXRvci1pZ25vcmUnLFxyXG5cdFx0XHRcdHN0eWxlOiAnZGlzcGxheTpub25lO2xpbmUtaGVpZ2h0OjAnXHJcblx0XHRcdH0sIGRvYyk7XHJcblxyXG5cdFx0XHRtYXJrZXIuaW5uZXJIVE1MID0gJyAnO1xyXG5cclxuXHRcdFx0cmV0dXJuIG1hcmtlcjtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsInZhciBVU0VSX0FHRU5UID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuLyoqXG4gKiBEZXRlY3RzIGlmIHRoZSBicm93c2VyIGlzIGlPU1xuICpcbiAqIE5lZWRlZCB0byBmaXggaU9TIHNwZWNpZmljIGJ1Z3NcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIGlvc1xuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaW9zID0gL2lQaG9uZXxpUG9kfGlQYWR8IHdvc2Jyb3dzZXJcXC8vaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG4vKipcbiAqIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFdZU0lXWUcgZWRpdGluZyAoZS5nLiBvbGRlciBtb2JpbGUgYnJvd3NlcnMpLlxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaXNXeXNpd3lnU3VwcG9ydGVkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzV3lzaXd5Z1N1cHBvcnRlZCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhclx0bWF0Y2gsIGlzVW5zdXBwb3J0ZWQ7XG5cblx0Ly8gSUUgaXMgdGhlIG9ubHkgYnJvd3NlciB0byBzdXBwb3J0IGRvY3VtZW50TW9kZVxuXHR2YXIgaWUgPSAhIXdpbmRvdy5kb2N1bWVudC5kb2N1bWVudE1vZGU7XG5cdHZhciBsZWdhY3lFZGdlID0gJy1tcy1pbWUtYWxpZ24nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpdi5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuXG5cdC8vIENoZWNrIGlmIHRoZSBjb250ZW50RWRpdGFibGUgYXR0cmlidXRlIGlzIHN1cHBvcnRlZFxuXHRpZiAoISgnY29udGVudEVkaXRhYmxlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHx8XG5cdFx0ZGl2LmNvbnRlbnRFZGl0YWJsZSAhPT0gJ3RydWUnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gSSB0aGluayBibGFja2JlcnJ5IHN1cHBvcnRzIGNvbnRlbnRFZGl0YWJsZSBvciB3aWxsIGF0IGxlYXN0XG5cdC8vIGdpdmUgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIGNvbnRlbnRFZGl0YWJsZSBkZXRlY3Rpb24gYWJvdmVcblx0Ly8gc28gaXQgaXNuJ3QgaW5jbHVkZWQgaW4gdGhlIGJlbG93IHRlc3RzLlxuXG5cdC8vIEkgaGF0ZSBoYXZpbmcgdG8gZG8gVUEgc25pZmZpbmcgYnV0IHNvbWUgbW9iaWxlIGJyb3dzZXJzIHNheSB0aGV5XG5cdC8vIHN1cHBvcnQgY29udGVudGVkaWFibGUgd2hlbiBpdCBpc24ndCB1c2FibGUsIGkuZS4geW91IGNhbid0IGVudGVyXG5cdC8vIHRleHQuXG5cdC8vIFRoaXMgaXMgdGhlIG9ubHkgd2F5IEkgY2FuIHRoaW5rIG9mIHRvIGRldGVjdCB0aGVtIHdoaWNoIGlzIGFsc28gaG93XG5cdC8vIGV2ZXJ5IG90aGVyIGVkaXRvciBJJ3ZlIHNlZW4gZGVhbHMgd2l0aCB0aGlzIGlzc3VlLlxuXG5cdC8vIEV4Y2x1ZGUgT3BlcmEgbW9iaWxlIGFuZCBtaW5pXG5cdGlzVW5zdXBwb3J0ZWQgPSAvT3BlcmEgTW9iaXxPcGVyYSBNaW5pL2kudGVzdChVU0VSX0FHRU5UKTtcblxuXHRpZiAoL0FuZHJvaWQvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IHRydWU7XG5cblx0XHRpZiAoL1NhZmFyaS8udGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdFx0Ly8gQW5kcm9pZCBicm93c2VyIDUzNCsgc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZVxuXHRcdFx0Ly8gVGhpcyBhbHNvIG1hdGNoZXMgQ2hyb21lIHdoaWNoIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGUgdG9vXG5cdFx0XHRtYXRjaCA9IC9TYWZhcmlcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgQW1hem9uIFNpbGsgc3VwcG9ydHMgaXQsIG9sZGVyIHZlcnNpb25zIGRpZG4ndFxuXHQvLyBBcyBpdCB1c2VzIHdlYmtpdCBsaWtlIEFuZHJvaWQsIGFzc3VtZSBpdCdzIHRoZSBzYW1lIGFuZCBzdGFydGVkXG5cdC8vIHdvcmtpbmcgYXQgdmVyc2lvbnMgPj0gNTM0XG5cdGlmICgvIFNpbGtcXC8vaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0bWF0Y2ggPSAvQXBwbGVXZWJLaXRcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0aXNVbnN1cHBvcnRlZCA9ICghbWF0Y2ggfHwgIW1hdGNoWzFdID8gdHJ1ZSA6IG1hdGNoWzFdIDwgNTM0KTtcblx0fVxuXG5cdC8vIGlPUyA1KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdGlmIChpb3MpIHtcblx0XHQvLyBCbG9jayBhbnkgdmVyc2lvbiA8PSA0X3goX3gpXG5cdFx0aXNVbnN1cHBvcnRlZCA9IC9PUyBbMC00XShfXFxkKSsgbGlrZSBNYWMvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXHR9XG5cblx0Ly8gRmlyZWZveCBkb2VzIHN1cHBvcnQgV1lTSVdZRyBvbiBtb2JpbGVzIHNvIG92ZXJyaWRlXG5cdC8vIGFueSBwcmV2aW91cyB2YWx1ZSBpZiB1c2luZyBGRlxuXHRpZiAoL0ZpcmVmb3gvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0aWYgKC9PbmVCcm93c2VyL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIFVDQnJvd3NlciB3b3JrcyBidXQgZG9lc24ndCBnaXZlIGEgdW5pcXVlIHVzZXIgYWdlbnRcblx0aWYgKG5hdmlnYXRvci52ZW5kb3IgPT09ICdVQ1dFQicpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHQvLyBJRSBhbmQgbGVnYWN5IGVkZ2UgYXJlIG5vdCBzdXBwb3J0ZWQgYW55IG1vcmVcblx0aWYgKGllIHx8IGxlZ2FjeUVkZ2UpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiAhaXNVbnN1cHBvcnRlZDtcbn0oKSk7XG4iLCJpbXBvcnQgeyBhdHRyIH0gZnJvbSAnLi9kb20nO1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBmb3IgRW1sRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcblx0LyoqXG5cdCAqIFRvb2xiYXIgYnV0dG9ucyBvcmRlciBhbmQgZ3JvdXBzLiBTaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZFxuXHQgKiBoYXZlIGEgYmFyIHwgdG8gc2VwYXJhdGUgZ3JvdXBzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0b29sYmFyOiAnYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZSxzdWJzY3JpcHQsc3VwZXJzY3JpcHR8JyArXG5cdFx0J2xlZnQsY2VudGVyLHJpZ2h0LGp1c3RpZnl8Zm9udCxzaXplLGNvbG9yLHJlbW92ZWZvcm1hdHwnICtcblx0XHQnY3V0LGNvcHkscGFzdGV0ZXh0fGJ1bGxldGxpc3Qsb3JkZXJlZGxpc3QsaW5kZW50LG91dGRlbnR8JyArXG5cdFx0J3RhYmxlfGNvZGUscXVvdGV8aG9yaXpvbnRhbHJ1bGUsaW1hZ2UsZW1haWwsbGluayx1bmxpbmt8JyArXG5cdFx0J2Vtb3RpY29uLHlvdXR1YmUsZGF0ZSx0aW1lfGx0cixydGx8cHJpbnQsbWF4aW1pemUsc291cmNlJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY29tbWFuZHMgdG8gZXhjbHVkZXMgZnJvbSB0aGUgdG9vbGJhclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhckV4Y2x1ZGU6IG51bGwsXG5cblx0LyoqXG5cdCAqIFN0eWxlc2hlZXQgdG8gaW5jbHVkZSBpbiB0aGUgV1lTSVdZRyBlZGl0b3IuIFRoaXMgaXMgd2hhdCB3aWxsIHN0eWxlXG5cdCAqIHRoZSBXWVNJV1lHIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzdHlsZTogJ2pxdWVyeS5lbWxlZGl0b3IuZGVmYXVsdC5jc3MnLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBmb250cyBmb3IgdGhlIGZvbnQgc2VsZWN0b3Jcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGZvbnRzOiAnQXJpYWwsQXJpYWwgQmxhY2ssQ29taWMgU2FucyBNUyxDb3VyaWVyIE5ldyxHZW9yZ2lhLEltcGFjdCwnICtcblx0XHQnU2Fucy1zZXJpZixTZXJpZixUaW1lcyBOZXcgUm9tYW4sVHJlYnVjaGV0IE1TLFZlcmRhbmEnLFxuXG5cdC8qKlxuXHQgKiBDb2xvcnMgc2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmQgaGF2ZSBhIGJhciB8IHRvIHNpZ25hbCBhIG5ld1xuXHQgKiBjb2x1bW4uXG5cdCAqXG5cdCAqIElmIG51bGwgdGhlIGNvbG9ycyB3aWxsIGJlIGF1dG8gZ2VuZXJhdGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y29sb3JzOiAnIzAwMDAwMCwjNDRCOEZGLCMxRTkyRjcsIzAwNzREOSwjMDA1REMyLCMwMDM2OUIsI2IzZDVmNHwnICtcblx0XHRcdCcjNDQ0NDQ0LCNDM0ZGRkYsIzlERjlGRiwjN0ZEQkZGLCM2OEM0RTgsIzQxOURDMSwjZDlmNGZmfCcgK1xuXHRcdFx0JyM2NjY2NjYsIzcyRkY4NCwjNENFQTVFLCMyRUNDNDAsIzE3QjUyOSwjMDA4RTAyLCNjMGYwYzZ8JyArXG5cdFx0XHQnIzg4ODg4OCwjRkZGRjQ0LCNGRkZBMUUsI0ZGREMwMCwjRThDNTAwLCNDMTlFMDAsI2ZmZjViM3wnICtcblx0XHRcdCcjYWFhYWFhLCNGRkM5NUYsI0ZGQTMzOSwjRkY4NTFCLCNFODZFMDQsI0MxNDcwMCwjZmZkYmJifCcgK1xuXHRcdFx0JyNjY2NjY2MsI0ZGODU3QSwjRkY1RjU0LCNGRjQxMzYsI0U4MkExRiwjQzEwMzAwLCNmZmM2YzN8JyArXG5cdFx0XHQnI2VlZWVlZSwjRkY1NkZGLCNGRjMwREMsI0YwMTJCRSwjRDkwMEE3LCNCMjAwODAsI2ZiYjhlY3wnICtcblx0XHRcdCcjZmZmZmZmLCNGNTUxRkYsI0NGMkJFNywjQjEwREM5LCM5QTAwQjIsIzlBMDBCMiwjZThiNmVmJyxcblxuXHQvKipcblx0ICogVGhlIGxvY2FsZSB0byB1c2UuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRsb2NhbGU6IGF0dHIoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbGFuZycpIHx8ICdlbicsXG5cblx0LyoqXG5cdCAqIFRoZSBDaGFyc2V0IHRvIHVzZVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y2hhcnNldDogJ3V0Zi04JyxcblxuXHQvKipcblx0ICogQ29tcGF0aWJpbGl0eSBtb2RlIGZvciBlbW90aWNvbnMuXG5cdCAqXG5cdCAqIEhlbHBzIGlmIHlvdSBoYXZlIGVtb3RpY29ucyBzdWNoIGFzIDovIHdoaWNoIHdvdWxkIHB1dCBhbiBlbW90aWNvblxuXHQgKiBpbnNpZGUgaHR0cDovL1xuXHQgKlxuXHQgKiBUaGlzIG1vZGUgcmVxdWlyZXMgZW1vdGljb25zIHRvIGJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBvciBlbmQgb2Zcblx0ICogbGluZSBjaGFycy4gVGhpcyBtb2RlIGhhcyBsaW1pdGVkIEFzIFlvdSBUeXBlIGVtb3RpY29uIGNvbnZlcnNpb25cblx0ICogc3VwcG9ydC4gSXQgd2lsbCBub3QgcmVwbGFjZSBBWVQgZm9yIGVuZCBvZiBsaW5lIGNoYXJzLCBvbmx5XG5cdCAqIGVtb3RpY29ucyBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UuIFRoZXkgd2lsbCBzdGlsbCBiZSByZXBsYWNlZFxuXHQgKiBjb3JyZWN0bHkgd2hlbiBsb2FkZWQganVzdCBub3QgQVlULlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVtb3RpY29uc0NvbXBhdDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBlbW90aWNvbnMuIENhbiBiZSBjaGFuZ2VzIGF0IHJ1bnRpbWUgdXNpbmcgdGhlXG5cdCAqIGVtb3RpY29ucygpIG1ldGhvZC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqIEBzaW5jZSAxLjQuMlxuXHQgKi9cblx0ZW1vdGljb25zRW5hYmxlZDogdHJ1ZSxcblxuXHQvKipcblx0ICogRW1vdGljb24gcm9vdCBVUkxcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGVtb3RpY29uc1Jvb3Q6ICcnLFxuXHRlbW90aWNvbnM6IHtcblx0XHRkcm9wZG93bjoge1xuXHRcdFx0JzopJzogJ2Vtb3RpY29ucy9zbWlsZS5wbmcnLFxuXHRcdFx0JzphbmdlbDonOiAnZW1vdGljb25zL2FuZ2VsLnBuZycsXG5cdFx0XHQnOmFuZ3J5Oic6ICdlbW90aWNvbnMvYW5ncnkucG5nJyxcblx0XHRcdCc4LSknOiAnZW1vdGljb25zL2Nvb2wucG5nJyxcblx0XHRcdCc6XFwnKCc6ICdlbW90aWNvbnMvY3d5LnBuZycsXG5cdFx0XHQnOmVybW06JzogJ2Vtb3RpY29ucy9lcm1tLnBuZycsXG5cdFx0XHQnOkQnOiAnZW1vdGljb25zL2dyaW4ucG5nJyxcblx0XHRcdCc8Myc6ICdlbW90aWNvbnMvaGVhcnQucG5nJyxcblx0XHRcdCc6KCc6ICdlbW90aWNvbnMvc2FkLnBuZycsXG5cdFx0XHQnOk8nOiAnZW1vdGljb25zL3Nob2NrZWQucG5nJyxcblx0XHRcdCc6UCc6ICdlbW90aWNvbnMvdG9uZ3VlLnBuZycsXG5cdFx0XHQnOyknOiAnZW1vdGljb25zL3dpbmsucG5nJ1xuXHRcdH0sXG5cdFx0bW9yZToge1xuXHRcdFx0JzphbGllbjonOiAnZW1vdGljb25zL2FsaWVuLnBuZycsXG5cdFx0XHQnOmJsaW5rOic6ICdlbW90aWNvbnMvYmxpbmsucG5nJyxcblx0XHRcdCc6Ymx1c2g6JzogJ2Vtb3RpY29ucy9ibHVzaC5wbmcnLFxuXHRcdFx0JzpjaGVlcmZ1bDonOiAnZW1vdGljb25zL2NoZWVyZnVsLnBuZycsXG5cdFx0XHQnOmRldmlsOic6ICdlbW90aWNvbnMvZGV2aWwucG5nJyxcblx0XHRcdCc6ZGl6enk6JzogJ2Vtb3RpY29ucy9kaXp6eS5wbmcnLFxuXHRcdFx0JzpnZXRsb3N0Oic6ICdlbW90aWNvbnMvZ2V0bG9zdC5wbmcnLFxuXHRcdFx0JzpoYXBweTonOiAnZW1vdGljb25zL2hhcHB5LnBuZycsXG5cdFx0XHQnOmtpc3Npbmc6JzogJ2Vtb3RpY29ucy9raXNzaW5nLnBuZycsXG5cdFx0XHQnOm5pbmphOic6ICdlbW90aWNvbnMvbmluamEucG5nJyxcblx0XHRcdCc6cGluY2g6JzogJ2Vtb3RpY29ucy9waW5jaC5wbmcnLFxuXHRcdFx0Jzpwb3V0eTonOiAnZW1vdGljb25zL3BvdXR5LnBuZycsXG5cdFx0XHQnOnNpY2s6JzogJ2Vtb3RpY29ucy9zaWNrLnBuZycsXG5cdFx0XHQnOnNpZGV3YXlzOic6ICdlbW90aWNvbnMvc2lkZXdheXMucG5nJyxcblx0XHRcdCc6c2lsbHk6JzogJ2Vtb3RpY29ucy9zaWxseS5wbmcnLFxuXHRcdFx0JzpzbGVlcGluZzonOiAnZW1vdGljb25zL3NsZWVwaW5nLnBuZycsXG5cdFx0XHQnOnVuc3VyZTonOiAnZW1vdGljb25zL3Vuc3VyZS5wbmcnLFxuXHRcdFx0Jzp3b290Oic6ICdlbW90aWNvbnMvdzAwdC5wbmcnLFxuXHRcdFx0Jzp3YXNzYXQ6JzogJ2Vtb3RpY29ucy93YXNzYXQucG5nJ1xuXHRcdH0sXG5cdFx0aGlkZGVuOiB7XG5cdFx0XHQnOndoaXN0bGluZzonOiAnZW1vdGljb25zL3doaXN0bGluZy5wbmcnLFxuXHRcdFx0Jzpsb3ZlOic6ICdlbW90aWNvbnMvd3ViLnBuZydcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFdpZHRoIG9mIHRoZSBlZGl0b3IuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWMgd2l0aFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHdpZHRoOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBIZWlnaHQgb2YgdGhlIGVkaXRvciBpbmNsdWRpbmcgdG9vbGJhci4gU2V0IHRvIG51bGwgZm9yIGF1dG9tYXRpY1xuXHQgKiBoZWlnaHRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRoZWlnaHQ6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgcmVzaXplZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUVuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBoYWxmIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5XaWR0aDogbnVsbCxcblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSBoZWlnaHQgb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1pbkhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIGhlaWdodCBvciAtMVxuXHQgKiBmb3IgdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4SGVpZ2h0OiBudWxsLFxuXHQvKipcblx0ICogTWF4IHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4V2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSBoZWlnaHQgaXMgZW5hYmxlZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUhlaWdodDogdHJ1ZSxcblx0LyoqXG5cdCAqIElmIHJlc2l6aW5nIGJ5IHdpZHRoIGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVXaWR0aDogdHJ1ZSxcblxuXHQvKipcblx0ICogRGF0ZSBmb3JtYXQsIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBsb2NhbGUgc3BlY2lmaWVzIG9uZS5cblx0ICpcblx0ICogVGhlIHdvcmRzIHllYXIsIG1vbnRoIGFuZCBkYXkgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB1c2VycyBjdXJyZW50XG5cdCAqIHllYXIsIG1vbnRoIGFuZCBkYXkuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkYXRlRm9ybWF0OiAneWVhci1tb250aC1kYXknLFxuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGluc2V0IHRoZSB0b29sYmFyIGludG8uXG5cdCAqXG5cdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdHRvb2xiYXJDb250YWluZXI6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBwYXN0ZSBmaWx0ZXJpbmcuIFRoaXMgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbCwgcGxlYXNlXG5cdCAqIHJlcG9ydCBhbnkgaXNzdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVuYWJsZVBhc3RlRmlsdGVyaW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gY29tcGxldGVseSBkaXNhYmxlIHBhc3RpbmcgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZGlzYWJsZVBhc3Rpbmc6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZWFkT25seTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIHNldCB0aGUgZWRpdG9yIHRvIHJpZ2h0LXRvLWxlZnQgbW9kZS5cblx0ICpcblx0ICogSWYgc2V0IHRvIG51bGwgdGhlIGRpcmVjdGlvbiB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cnRsOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIG9uIHBhZ2UgbG9hZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1czogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciB0byB0aGUgZW5kIG9mIHRoZSBjb250ZW50XG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b2ZvY3VzRW5kOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGV4cGFuZCB0aGUgZWRpdG9yIHRvIGZpeCB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9FeHBhbmQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIHVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXJcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvVXBkYXRlOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIHRoZSBicm93c2VycyBidWlsdCBpbiBzcGVsbCBjaGVja2VyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3BlbGxjaGVjazogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gcnVuIHRoZSBzb3VyY2UgZWRpdG9yIHdoZW4gdGhlcmUgaXMgbm8gV1lTSVdZRyBzdXBwb3J0LiBPbmx5XG5cdCAqIHJlYWxseSBhcHBsaWVzIHRvIG1vYmlsZSBPUydzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGxvYWQgdGhlIGVkaXRvciBpbiBzb3VyY2UgbW9kZSBhbmQgc3RpbGwgYWxsb3cgc3dpdGNoaW5nXG5cdCAqIGJldHdlZW4gV1lTSVdZRyBhbmQgc291cmNlIG1vZGVcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzdGFydEluU291cmNlTW9kZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIElEIHRvIGdpdmUgdGhlIGVkaXRvci5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGlkOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVnaW5zOiAnJyxcblxuXHQvKipcblx0ICogei1pbmRleCB0byBzZXQgdGhlIGVkaXRvciBjb250YWluZXIgdG8uIE5lZWRlZCBmb3IgalF1ZXJ5IFVJIGRpYWxvZy5cblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR6SW5kZXg6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIHRyaW0gdGhlIEJCQ29kZS4gUmVtb3ZlcyBhbnkgc3BhY2VzIGF0IHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZVxuXHQgKiBCQkNvZGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGJiY29kZVRyaW06IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBkaXNhYmxlIHJlbW92aW5nIGJsb2NrIGxldmVsIGVsZW1lbnRzIGJ5IHByZXNzaW5nIGJhY2tzcGFjZSBhdFxuXHQgKiB0aGUgc3RhcnQgb2YgdGhlbVxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVCbG9ja1JlbW92ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbG93ZWQgVVJMIChzaG91bGQgYmUgZWl0aGVyIHN0cmluZ3Mgb3IgcmVnZXgpIGZvciBpZnJhbWVzLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGEgc3RyaW5nIHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3RhcnQgb2YgdGhlIHNyYyBtYXRjaGVzIHRoZVxuXHQgKiBzcGVjaWZpZWQgc3RyaW5nIHdpbGwgYmUgYWxsb3dlZC5cblx0ICpcblx0ICogSWYgaXQncyBhIHJlZ2V4IHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3JjIG1hdGNoZXMgdGhlIHJlZ2V4IHdpbGwgYmVcblx0ICogYWxsb3dlZC5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZElmcmFtZVVybHM6IFtdLFxuXG5cdC8qKlxuXHQgKiBCQkNvZGUgcGFyc2VyIG9wdGlvbnMsIG9ubHkgYXBwbGllcyBpZiB1c2luZyB0aGUgZWRpdG9yIGluIEJCQ29kZVxuXHQgKiBtb2RlLlxuXHQgKlxuXHQgKiBTZWUgRW1sRWRpdG9yLkJCQ29kZVBhcnNlci5kZWZhdWx0cyBmb3IgbGlzdCBvZiB2YWxpZCBvcHRpb25zXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRwYXJzZXJPcHRpb25zOiB7IH0sXG5cblx0LyoqXG5cdCAqIENTUyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRvIGRyb3Bkb3duIG1lbnUgKGVnLiB6LWluZGV4KVxuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0ZHJvcERvd25Dc3M6IHsgfSxcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgdGFncyB0aGF0IGFyZSBhbGxvd2VkIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYSB0YWcgaXMgbm90IGxpc3RlZCBoZXJlLCBpdCB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGUgY29udGVudCBpc1xuXHQgKiBzYW5pdGl6ZWQuXG5cdCAqXG5cdCAqIDEgVGFnIGlzIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDogWydpZnJhbWUnXS4gTm8gbmVlZCB0byBhZGQgdGhpc1xuXHQgKiBmdXJ0aGVyLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkVGFnczogW10sXG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIGF0dHJpYnV0ZXMgdGhhdCBhcmUgYWxsb3dlZCBvbiB0YWdzIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYW4gYXR0cmlidXRlIGlzIG5vdCBsaXN0ZWQgaGVyZSwgaXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIGNvbnRlbnRcblx0ICogaXMgc2FuaXRpemVkLlxuXHQgKlxuXHQgKiAzIEF0dHJpYnV0ZXMgYXJlIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDpcblx0ICogXHRbJ2FsbG93ZnVsbHNjcmVlbicsICdmcmFtZWJvcmRlcicsICd0YXJnZXQnXS5cblx0ICogTm8gbmVlZCB0byBhZGQgdGhlc2UgZnVydGhlci5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZEF0dHJpYnV0ZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0T3B0aW9ucztcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGFsbCBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBhbmRcbiAqIHJlcGxhY2VzIGFueSB0aGF0IGFyZW4ndCB3aXRoIHdpdGggdGhlaXIgZW1vdGljb24gY29kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3JhbmdlSGVscGVyfSByYW5nZUhlbHBlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2hpdGVzcGFjZShub2RlLCByYW5nZUhlbHBlcikge1xuXHR2YXIgbm9uZVdzUmVnZXggPSAvW15cXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0rLztcblx0dmFyIGVtb3RpY29ucyA9IG5vZGUgJiYgZG9tLmZpbmQobm9kZSwgJ2ltZ1tkYXRhLWVtbGVkaXRvci1lbW90aWNvbl0nKTtcblxuXHRpZiAoIW5vZGUgfHwgIWVtb3RpY29ucy5sZW5ndGgpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBlbW90aWNvbiA9IGVtb3RpY29uc1tpXTtcblx0XHR2YXIgcGFyZW50ID0gZW1vdGljb24ucGFyZW50Tm9kZTtcblx0XHR2YXIgcHJldiA9IGVtb3RpY29uLnByZXZpb3VzU2libGluZztcblx0XHR2YXIgbmV4dCA9IGVtb3RpY29uLm5leHRTaWJsaW5nO1xuXG5cdFx0aWYgKCghcHJldiB8fCAhbm9uZVdzUmVnZXgudGVzdChwcmV2Lm5vZGVWYWx1ZS5zbGljZSgtMSkpKSAmJlxuXHRcdFx0KCFuZXh0IHx8ICFub25lV3NSZWdleC50ZXN0KChuZXh0Lm5vZGVWYWx1ZSB8fCAnJylbMF0pKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFyIHJhbmdlID0gcmFuZ2VIZWxwZXIuY2xvbmVTZWxlY3RlZCgpO1xuXHRcdHZhciByYW5nZVN0YXJ0ID0gLTE7XG5cdFx0dmFyIHJhbmdlU3RhcnRDb250YWluZXIgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcblx0XHR2YXIgcHJldmlvdXNUZXh0ID0gKHByZXYgJiYgcHJldi5ub2RlVmFsdWUpIHx8ICcnO1xuXG5cdFx0cHJldmlvdXNUZXh0ICs9IGRvbS5kYXRhKGVtb3RpY29uLCAnZW1sZWRpdG9yLWVtb3RpY29uJyk7XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIGFmdGVyIHRoZSByZW1vdmVkIGVtb3RpY29uLCBhZGRcblx0XHQvLyB0aGUgbGVuZ3RoIG9mIHRoZSBuZXdseSBhZGRlZCB0ZXh0IHRvIGl0XG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IG5leHQpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSBwcmV2aW91c1RleHQubGVuZ3RoICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSBuZXh0IG5vZGUsIHNldCBpdCB0b1xuXHRcdC8vIHRoZSBlbmQgb2YgdGhlIG5ldyB0ZXh0IG5vZGVcblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gbm9kZSAmJlxuXHRcdFx0bm9kZS5jaGlsZE5vZGVzW3JhbmdlLnN0YXJ0T2Zmc2V0XSA9PT0gbmV4dCkge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHByZXZpb3VzVGV4dC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSByZW1vdmVkIGVtb3RpY29uLFxuXHRcdC8vIGp1c3Qga2VlcCBpdCBhdCB0aGF0IHBvc2l0aW9uXG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IHByZXYpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSByYW5nZS5zdGFydE9mZnNldDtcblx0XHR9XG5cblx0XHRpZiAoIW5leHQgfHwgbmV4dC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xuXHRcdFx0bmV4dCA9IHBhcmVudC5pbnNlcnRCZWZvcmUoXG5cdFx0XHRcdHBhcmVudC5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSwgbmV4dFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRuZXh0Lmluc2VydERhdGEoMCwgcHJldmlvdXNUZXh0KTtcblx0XHRkb20ucmVtb3ZlKGVtb3RpY29uKTtcblx0XHRpZiAocHJldikge1xuXHRcdFx0ZG9tLnJlbW92ZShwcmV2KTtcblx0XHR9XG5cblx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB0aGUgcmFuZ2Ugc3RhcnRpbmcgcG9zaXRpb24gaWYgaXQncyBiZWVuIG1vZGlmaWVkXG5cdFx0aWYgKHJhbmdlU3RhcnQgPiAtMSkge1xuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQobmV4dCwgcmFuZ2VTdGFydCk7XG5cdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcblx0XHRcdHJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJhbmdlKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBSZXBsYWNlcyBhbnkgZW1vdGljb25zIGluc2lkZSB0aGUgcm9vdCBub2RlIHdpdGggaW1hZ2VzLlxuICpcbiAqIGVtb3RpY29ucyBzaG91bGQgYmUgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXkgaXMgdGhlIGVtb3RpY29uXG4gKiBjb2RlIGFuZCB0aGUgdmFsdWUgaXMgdGhlIEhUTUwgdG8gcmVwbGFjZSBpdCB3aXRoLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3RcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gZW1vdGljb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVtb3RpY29uc0NvbXBhdFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2Uocm9vdCwgZW1vdGljb25zLCBlbW90aWNvbnNDb21wYXQpIHtcblx0dmFyXHRkb2MgICAgICAgICAgID0gcm9vdC5vd25lckRvY3VtZW50O1xuXHR2YXIgc3BhY2UgICAgICAgICA9ICcoXnxcXFxcc3xcXHhBMHxcXHUyMDAyfFxcdTIwMDN8XFx1MjAwOXwkKSc7XG5cdHZhciBlbW90aWNvbkNvZGVzID0gW107XG5cdHZhciBlbW90aWNvblJlZ2V4ID0ge307XG5cblx0Ly8gVE9ETzogTWFrZSB0aGlzIHRhZyBjb25maWd1cmFibGUuXG5cdGlmIChkb20ucGFyZW50KHJvb3QsICdjb2RlJykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR1dGlscy5lYWNoKGVtb3RpY29ucywgZnVuY3Rpb24gKGtleSkge1xuXHRcdGVtb3RpY29uUmVnZXhba2V5XSA9IG5ldyBSZWdFeHAoc3BhY2UgKyBlc2NhcGUucmVnZXgoa2V5KSArIHNwYWNlKTtcblx0XHRlbW90aWNvbkNvZGVzLnB1c2goa2V5KTtcblx0fSk7XG5cblx0Ly8gU29ydCBrZXlzIGxvbmdlc3QgdG8gc2hvcnRlc3Qgc28gdGhhdCBsb25nZXIga2V5c1xuXHQvLyB0YWtlIHByZWNlZGVuY2UgKGF2b2lkcyBidWdzIHdpdGggc2hvcnRlciBrZXlzIHBhcnRpYWxseVxuXHQvLyBtYXRjaGluZyBsb25nZXIgb25lcylcblx0ZW1vdGljb25Db2Rlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0cmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG5cdH0pO1xuXG5cdChmdW5jdGlvbiBjb252ZXJ0KG5vZGUpIHtcblx0XHRub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG5cdFx0d2hpbGUgKG5vZGUpIHtcblx0XHRcdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiYgIWRvbS5pcyhub2RlLCAnY29kZScpKSB7XG5cdFx0XHRcdGNvbnZlcnQobm9kZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW1vdGljb25Db2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciB0ZXh0ICA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHZhciBrZXkgICA9IGVtb3RpY29uQ29kZXNbaV07XG5cdFx0XHRcdFx0dmFyIGluZGV4ID0gZW1vdGljb25zQ29tcGF0ID9cblx0XHRcdFx0XHRcdHRleHQuc2VhcmNoKGVtb3RpY29uUmVnZXhba2V5XSkgOlxuXHRcdFx0XHRcdFx0dGV4dC5pbmRleE9mKGtleSk7XG5cblx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gV2hlbiBlbW90aWNvbnNDb21wYXQgaXMgZW5hYmxlZCB0aGlzIHdpbGwgYmUgdGhlXG5cdFx0XHRcdFx0XHQvLyBwb3NpdGlvbiBhZnRlciBhbnkgd2hpdGUgc3BhY2Vcblx0XHRcdFx0XHRcdHZhciBzdGFydEluZGV4ID0gdGV4dC5pbmRleE9mKGtleSwgaW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIGZyYWdtZW50ICAgPSBkb20ucGFyc2VIVE1MKGVtb3RpY29uc1trZXldLCBkb2MpO1xuXHRcdFx0XHRcdFx0dmFyIGFmdGVyICAgICAgPSB0ZXh0LnN1YnN0cihzdGFydEluZGV4ICsga2V5Lmxlbmd0aCk7XG5cblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShhZnRlcikpO1xuXG5cdFx0XHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IHRleHQuc3Vic3RyKDAsIHN0YXJ0SW5kZXgpO1xuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnROb2RlXG5cdFx0XHRcdFx0XHRcdC5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIG5vZGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbm9kZS5uZXh0U2libGluZztcblx0XHR9XG5cdH0ocm9vdCkpO1xufVxuIiwiLy8gTXVzdCBzdGFydCB3aXRoIGEgdmFsaWQgc2NoZW1lXHJcbi8vIFx0XHReXHJcbi8vIFNjaGVtZXMgdGhhdCBhcmUgY29uc2lkZXJlZCBzYWZlXHJcbi8vIFx0XHQoaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8XHJcbi8vIFJlbGF0aXZlIHNjaGVtZXMgKC8vOikgYXJlIGNvbnNpZGVyZWQgc2FmZVxyXG4vLyBcdFx0KFxcXFwvXFxcXC8pfFxyXG4vLyBJbWFnZSBkYXRhIFVSSSdzIGFyZSBjb25zaWRlcmVkIHNhZmVcclxuLy8gXHRcdGRhdGE6aW1hZ2VcXFxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTtcclxudmFyIFZBTElEX1NDSEVNRV9SRUdFWCA9XHJcblx0L14oaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8KFxcL1xcLyl8ZGF0YTppbWFnZVxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTsvaTtcclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGEgc3RyaW5nIHNvIGl0J3Mgc2FmZSB0byB1c2UgaW4gcmVnZXhcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVnZXgoc3RyKSB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oWy0uKis/Xj0hOiR7fSgpfFtcXF0vXFxcXF0pL2csICdcXFxcJDEnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZXMgYWxsIEhUTUwgZW50aXRpZXMgaW4gYSBzdHJpbmdcclxuICpcclxuICogSWYgbm9RdW90ZXMgaXMgc2V0IHRvIGZhbHNlLCBhbGwgc2luZ2xlIGFuZCBkb3VibGVcclxuICogcXVvdGVzIHdpbGwgYWxzbyBiZSBlc2NhcGVkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtib29sZWFufSBbbm9RdW90ZXM9dHJ1ZV1cclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiBAc2luY2UgMS40LjFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnRpdGllcyhzdHIsIG5vUXVvdGVzKSB7XHJcblx0aWYgKCFzdHIpIHtcclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG5cclxuXHR2YXIgcmVwbGFjZW1lbnRzID0ge1xyXG5cdFx0JyYnOiAnJmFtcDsnLFxyXG5cdFx0JzwnOiAnJmx0OycsXHJcblx0XHQnPic6ICcmZ3Q7JyxcclxuXHRcdCcgICc6ICcmbmJzcDsgJyxcclxuXHRcdCdcXHJcXG4nOiAnPGJyIC8+JyxcclxuXHRcdCdcXHInOiAnPGJyIC8+JyxcclxuXHRcdCdcXG4nOiAnPGJyIC8+J1xyXG5cdH07XHJcblxyXG5cdGlmIChub1F1b3RlcyAhPT0gZmFsc2UpIHtcclxuXHRcdHJlcGxhY2VtZW50c1snXCInXSAgPSAnJiMzNDsnO1xyXG5cdFx0cmVwbGFjZW1lbnRzWydcXCcnXSA9ICcmIzM5Oyc7XHJcblx0XHRyZXBsYWNlbWVudHNbJ2AnXSAgPSAnJiM5NjsnO1xyXG5cdH1cclxuXHJcblx0c3RyID0gc3RyLnJlcGxhY2UoLyB7Mn18XFxyXFxufFsmPD5cXHJcXG4nXCJgXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcclxuXHRcdHJldHVybiByZXBsYWNlbWVudHNbbWF0Y2hdIHx8IG1hdGNoO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gc3RyO1xyXG59XHJcblxyXG4vKipcclxuICogRXNjYXBlIFVSSSBzY2hlbWUuXHJcbiAqXHJcbiAqIEFwcGVuZHMgdGhlIGN1cnJlbnQgVVJMIHRvIGEgdXJsIGlmIGl0IGhhcyBhIHNjaGVtZSB0aGF0IGlzIG5vdDpcclxuICpcclxuICogaHR0cFxyXG4gKiBodHRwc1xyXG4gKiBzZnRwXHJcbiAqIGZ0cFxyXG4gKiBtYWlsdG9cclxuICogc3BvdGlmeVxyXG4gKiBza3lwZVxyXG4gKiBzc2hcclxuICogdGVhbXNwZWFrXHJcbiAqIHRlbFxyXG4gKiAvL1xyXG4gKiBkYXRhOmltYWdlLyhwbmd8anBlZ3xqcGd8cGpwZWd8Ym1wfGdpZik7XHJcbiAqXHJcbiAqICoqSU1QT1JUQU5UKio6IFRoaXMgZG9lcyBub3QgZXNjYXBlIGFueSBIVE1MIGluIGEgdXJsLCBmb3JcclxuICogdGhhdCB1c2UgdGhlIGVzY2FwZS5lbnRpdGllcygpIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiBAc2luY2UgMS40LjVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmlTY2hlbWUodXJsKSB7XHJcblx0dmFyXHRwYXRoLFxyXG5cdFx0Ly8gSWYgdGhlcmUgaXMgYSA6IGJlZm9yZSBhIC8gdGhlbiBpdCBoYXMgYSBzY2hlbWVcclxuXHRcdGhhc1NjaGVtZSA9IC9eW14vXSo6L2ksXHJcblx0XHRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcclxuXHJcblx0Ly8gSGFzIG5vIHNjaGVtZSBvciBhIHZhbGlkIHNjaGVtZVxyXG5cdGlmICgoIXVybCB8fCAhaGFzU2NoZW1lLnRlc3QodXJsKSkgfHwgVkFMSURfU0NIRU1FX1JFR0VYLnRlc3QodXJsKSkge1xyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcblxyXG5cdHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xyXG5cdHBhdGgucG9wKCk7XHJcblxyXG5cdHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgK1xyXG5cdFx0bG9jYXRpb24uaG9zdCArXHJcblx0XHRwYXRoLmpvaW4oJy8nKSArICcvJyArXHJcblx0XHR1cmw7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuXHJcblxyXG4vKipcclxuICogSFRNTCB0ZW1wbGF0ZXMgdXNlZCBieSB0aGUgZWRpdG9yIGFuZCBkZWZhdWx0IGNvbW1hbmRzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52YXIgX3RlbXBsYXRlcyA9IHtcclxuXHRodG1sOlxyXG5cdFx0JzwhRE9DVFlQRSBodG1sPicgK1xyXG5cdFx0JzxodG1se2F0dHJzfT4nICtcclxuXHRcdFx0JzxoZWFkPicgK1xyXG5cdFx0XHRcdCc8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgJyArXHJcblx0XHRcdFx0XHQnY29udGVudD1cInRleHQvaHRtbDtjaGFyc2V0PXtjaGFyc2V0fVwiIC8+JyArXHJcblx0XHRcdFx0JzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwie3N0eWxlfVwiIC8+JyArXHJcblx0XHRcdCc8L2hlYWQ+JyArXHJcblx0XHRcdCc8Ym9keSBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIge3NwZWxsY2hlY2t9PjxwPjwvcD48L2JvZHk+JyArXHJcblx0XHQnPC9odG1sPicsXHJcblxyXG5cdHRvb2xiYXJCdXR0b246ICc8YSBjbGFzcz1cImVtbGVkaXRvci1idXR0b24gZW1sZWRpdG9yLWJ1dHRvbi17bmFtZX1cIiAnICtcclxuXHRcdCdkYXRhLWVtbGVkaXRvci1jb21tYW5kPVwie25hbWV9XCIgdW5zZWxlY3RhYmxlPVwib25cIj4nICtcclxuXHRcdCc8ZGl2IHVuc2VsZWN0YWJsZT1cIm9uXCI+e2Rpc3BOYW1lfTwvZGl2PjwvYT4nLFxyXG5cclxuXHRlbW90aWNvbjogJzxpbWcgc3JjPVwie3VybH1cIiBkYXRhLWVtbGVkaXRvci1lbW90aWNvbj1cIntrZXl9XCIgJyArXHJcblx0XHQnYWx0PVwie2tleX1cIiB0aXRsZT1cInt0b29sdGlwfVwiIC8+JyxcclxuXHJcblx0Zm9udE9wdDogJzxhIGNsYXNzPVwiZW1sZWRpdG9yLWZvbnQtb3B0aW9uXCIgaHJlZj1cIiNcIiAnICtcclxuXHRcdCdkYXRhLWZvbnQ9XCJ7Zm9udH1cIj48Zm9udCBmYWNlPVwie2ZvbnR9XCI+e2ZvbnR9PC9mb250PjwvYT4nLFxyXG5cclxuXHRzaXplT3B0OiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItZm9udHNpemUtb3B0aW9uXCIgZGF0YS1zaXplPVwie3NpemV9XCIgJyArXHJcblx0XHQnaHJlZj1cIiNcIj48Zm9udCBzaXplPVwie3NpemV9XCI+e3NpemV9PC9mb250PjwvYT4nLFxyXG5cclxuXHRwYXN0ZXRleHQ6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwidHh0XCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPHRleHRhcmVhIGNvbHM9XCIyMFwiIHJvd3M9XCI3XCIgaWQ9XCJ0eHRcIj48L3RleHRhcmVhPjwvZGl2PicgK1xyXG5cdFx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXHJcblx0XHQnPC9kaXY+JyxcclxuXHJcblx0dGFibGU6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwicm93c1wiPntyb3dzfTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgJyArXHJcblx0XHRcdCdpZD1cInJvd3NcIiB2YWx1ZT1cIjJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImNvbHNcIj57Y29sc308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xyXG5cdFx0XHQnaWQ9XCJjb2xzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCInICtcclxuXHRcdFx0JyAvPjwvZGl2PicsXHJcblxyXG5cdGltYWdlOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImltYWdlXCI+e3VybH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaW1hZ2VcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJ3aWR0aFwiPnt3aWR0aH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwid2lkdGhcIiBzaXplPVwiMlwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiaGVpZ2h0XCI+e2hlaWdodH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaGVpZ2h0XCIgc2l6ZT1cIjJcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xyXG5cdFx0XHQnPC9kaXY+JyxcclxuXHJcblx0ZW1haWw6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZW1haWxcIj57bGFiZWx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImVtYWlsXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJkZXNcIj57ZGVzY308L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcclxuXHRcdFx0JzwvZGl2PicsXHJcblxyXG5cdGxpbms6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPnt1cmx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpbmtcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJkZXNcIj57ZGVzY308L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnN9XCIgLz48L2Rpdj4nLFxyXG5cclxuXHR5b3V0dWJlTWVudTpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJsaW5rXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXHJcblx0XHRcdCc8L2Rpdj4nLFxyXG5cclxuXHR5b3V0dWJlOlxyXG5cdFx0JzxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4gJyArXHJcblx0XHQnc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQve2lkfT93bW9kZT1vcGFxdWUmc3RhcnQ9e3RpbWV9XCIgJyArXHJcblx0XHQnZGF0YS15b3V0dWJlLWlkPVwie2lkfVwiPjwvaWZyYW1lPidcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlcyBhbnkgcGFyYW1zIGluIGEgdGVtcGxhdGUgd2l0aCB0aGUgcGFzc2VkIHBhcmFtcy5cclxuICpcclxuICogSWYgY3JlYXRlSHRtbCBpcyBwYXNzZWQgaXQgd2lsbCByZXR1cm4gYSBEb2N1bWVudEZyYWdtZW50XHJcbiAqIGNvbnRhaW5pbmcgdGhlIHBhcnNlZCB0ZW1wbGF0ZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NyZWF0ZUh0bWxdXHJcbiAqIEByZXR1cm5zIHthbnl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0ZW1wbGF0ZXMgKG5hbWUsIHBhcmFtcywgY3JlYXRlSHRtbCkge1xyXG5cdHZhciB0ZW1wbGF0ZSA9IF90ZW1wbGF0ZXNbbmFtZV07XHJcblxyXG5cdE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0dGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFxyXG5cdFx0XHRuZXcgUmVnRXhwKGVzY2FwZS5yZWdleCgneycgKyBuYW1lICsgJ30nKSwgJ2cnKSwgcGFyYW1zW25hbWVdXHJcblx0XHQpO1xyXG5cdH0pO1xyXG5cclxuXHRpZiAoY3JlYXRlSHRtbCkge1xyXG5cdFx0dGVtcGxhdGUgPSBkb20ucGFyc2VIVE1MKHRlbXBsYXRlKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0ZW1wbGF0ZTtcclxufVxyXG4iLCIvKipcclxuICogQ2hlY2sgaWYgdGhlIHBhc3NlZCBhcmd1bWVudCBpcyB0aGVcclxuICogdGhlIHBhc3NlZCB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0geyp9IGFyZ1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzVHlwZW9mKHR5cGUsIGFyZykge1xyXG5cdHJldHVybiB0eXBlb2YgYXJnID09PSB0eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc1N0cmluZyA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ3N0cmluZycpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNVbmRlZmluZWQgPSBpc1R5cGVvZi5iaW5kKG51bGwsICd1bmRlZmluZWQnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzRnVuY3Rpb24gPSBpc1R5cGVvZi5iaW5kKG51bGwsICdmdW5jdGlvbicpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNOdW1iZXIgPSBpc1R5cGVvZi5iaW5kKG51bGwsICdudW1iZXInKTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGFuIG9iamVjdCBoYXMgbm8ga2V5c1xyXG4gKlxyXG4gKiBAcGFyYW0geyFPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5T2JqZWN0KG9iaikge1xyXG5cdHJldHVybiAhT2JqZWN0LmtleXMob2JqKS5sZW5ndGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRlbmRzIHRoZSBmaXJzdCBvYmplY3Qgd2l0aCBhbnkgZXh0cmEgb2JqZWN0cyBwYXNzZWRcclxuICpcclxuICogSWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGJvb2xlYW4gYW5kIHNldCB0byB0cnVlXHJcbiAqIGl0IHdpbGwgZXh0ZW5kIGNoaWxkIGFycmF5cyBhbmQgb2JqZWN0cyByZWN1cnNpdmVseS5cclxuICpcclxuICogQHBhcmFtIHshT2JqZWN0fGJvb2xlYW59IHRhcmdldEFyZ1xyXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQodGFyZ2V0QXJnLCBzb3VyY2VBcmcpIHtcclxuXHR2YXIgaXNUYXJnZXRCb29sZWFuID0gdGFyZ2V0QXJnID09PSAhIXRhcmdldEFyZztcclxuXHR2YXIgaSAgICAgID0gaXNUYXJnZXRCb29sZWFuID8gMiA6IDE7XHJcblx0dmFyIHRhcmdldCA9IGlzVGFyZ2V0Qm9vbGVhbiA/IHNvdXJjZUFyZyA6IHRhcmdldEFyZztcclxuXHR2YXIgaXNEZWVwID0gaXNUYXJnZXRCb29sZWFuID8gdGFyZ2V0QXJnIDogZmFsc2U7XHJcblxyXG5cdGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxyXG5cdFx0XHRPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpID09PSBPYmplY3QucHJvdG90eXBlO1xyXG5cdH1cclxuXHJcblx0Zm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XHJcblxyXG5cdFx0Ly8gQ29weSBhbGwgcHJvcGVydGllcyBmb3IgalF1ZXJ5IGNvbXBhdGliaWxpdHlcclxuXHRcdC8qIGVzbGludCBndWFyZC1mb3ItaW46IG9mZiAqL1xyXG5cdFx0Zm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0VmFsdWUgPSB0YXJnZXRba2V5XTtcclxuXHRcdFx0dmFyIHZhbHVlID0gc291cmNlW2tleV07XHJcblxyXG5cdFx0XHQvLyBTa2lwIHVuZGVmaW5lZCB2YWx1ZXMgdG8gbWF0Y2ggalF1ZXJ5XHJcblx0XHRcdGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2tpcCBzcGVjaWFsIGtleXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uXHJcblx0XHRcdGlmIChrZXkgPT09ICdfX3Byb3RvX18nIHx8IGtleSA9PT0gJ2NvbnN0cnVjdG9yJykge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaXNWYWx1ZU9iamVjdCA9IGlzT2JqZWN0KHZhbHVlKTtcclxuXHRcdFx0dmFyIGlzVmFsdWVBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xyXG5cclxuXHRcdFx0aWYgKGlzRGVlcCAmJiAoaXNWYWx1ZU9iamVjdCB8fCBpc1ZhbHVlQXJyYXkpKSB7XHJcblx0XHRcdFx0Ly8gQ2FuIG9ubHkgbWVyZ2UgaWYgdGFyZ2V0IHR5cGUgbWF0Y2hlcyBvdGhlcndpc2UgY3JlYXRlXHJcblx0XHRcdFx0Ly8gbmV3IHRhcmdldCB0byBtZXJnZSBpbnRvXHJcblx0XHRcdFx0dmFyIGlzU2FtZVR5cGUgPSBpc09iamVjdCh0YXJnZXRWYWx1ZSkgPT09IGlzVmFsdWVPYmplY3QgJiZcclxuXHRcdFx0XHRcdEFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpID09PSBpc1ZhbHVlQXJyYXk7XHJcblxyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gZXh0ZW5kKFxyXG5cdFx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRcdGlzU2FtZVR5cGUgPyB0YXJnZXRWYWx1ZSA6IChpc1ZhbHVlQXJyYXkgPyBbXSA6IHt9KSxcclxuXHRcdFx0XHRcdHZhbHVlXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIHBhc3NlZCBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0geyFBcnJheX0gYXJyXHJcbiAqIEBwYXJhbSB7Kn0gaXRlbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgaXRlbSkge1xyXG5cdHZhciBpID0gYXJyLmluZGV4T2YoaXRlbSk7XHJcblxyXG5cdGlmIChpID4gLTEpIHtcclxuXHRcdGFyci5zcGxpY2UoaSwgMSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogSXRlcmF0ZXMgb3ZlciBhbiBhcnJheSBvciBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHshT2JqZWN0fEFycmF5fSBvYmpcclxuICogQHBhcmFtIHtmdW5jdGlvbigqLCAqKX0gZm5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlYWNoKG9iaiwgZm4pIHtcclxuXHRpZiAoQXJyYXkuaXNBcnJheShvYmopICYmICAob2JqKT8ubGVuZ3RoID4gMCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Zm4oaSwgb2JqW2ldKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdFx0Zm4oa2V5LCBvYmpba2V5XSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBFbWxFZGl0b3IgZnJvbSAnLi9saWIvZW1sRWRpdG9yJztcclxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4vbGliL3BsdWdpbk1hbmFnZXInO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9saWIvZXNjYXBlLmpzJztcclxuaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2xpYi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vbGliL2RvbSc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vbGliL3V0aWxzLmpzJztcclxuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2xpYi9kZWZhdWx0Q29tbWFuZHMnO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9saWIvZGVmYXVsdE9wdGlvbnMuanMnO1xyXG5pbXBvcnQgJy4vdGhlbWVzL3NxdWFyZS5sZXNzJztcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuXHRpbnRlcmZhY2UgV2luZG93IHtcclxuXHRcdGVtbEVkaXRvcjogSUVkaXRvcjtcclxuXHR9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRWRpdG9yIHtcclxuXHRjb21tYW5kOiBPYmplY3Q7XHJcblx0bG9jYWxlOiBPYmplY3Q7XHJcblx0aWNvbnM6IE9iamVjdDtcclxuXHRmb3JtYXRzOiBPYmplY3Q7XHJcblx0Y29tbWFuZHM6IE9iamVjdDtcclxuXHRkZWZhdWx0T3B0aW9uczogT2JqZWN0O1xyXG5cdGlvczogYm9vbGVhbjtcclxuXHRpc1d5c2l3eWdTdXBwb3J0ZWQ6IGJvb2xlYW47XHJcblx0cmVnZXhFc2NhcGUoc3RyOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0ZXNjYXBlRW50aXRpZXMoc3RyOiBzdHJpbmcsIG5vUXVvdGVzOiBib29sZWFuIHwgbnVsbCk6IHN0cmluZztcclxuXHRlc2NhcGVVcmlTY2hlbWUodXJsOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0ZG9tOiBPYmplY3Q7XHJcblx0dXRpbHM6IE9iamVjdDtcclxuXHRwbHVnaW5zOiBPYmplY3Q7XHJcblx0Y3JlYXRlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBvcHRpb25zOiBPYmplY3QpOiB2b2lkO1xyXG5cdGluc3RhbmNlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50KTogSUVkaXRvcjtcclxufVxyXG5cclxud2luZG93LmVtbEVkaXRvciA9IHtcclxuXHRjb21tYW5kOiBFbWxFZGl0b3IuY29tbWFuZCxcclxuXHRsb2NhbGU6IEVtbEVkaXRvci5sb2NhbGUsXHJcblx0aWNvbnM6IEVtbEVkaXRvci5pY29ucyxcclxuXHRmb3JtYXRzOiBFbWxFZGl0b3IuZm9ybWF0cyxcclxuXHJcblx0Y29tbWFuZHM6IGRlZmF1bHRDb21tYW5kcyxcclxuXHRkZWZhdWx0T3B0aW9uczogZGVmYXVsdE9wdGlvbnMsXHJcblx0aW9zOiBicm93c2VyLmlvcyxcclxuXHRpc1d5c2l3eWdTdXBwb3J0ZWQ6IGJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkLFxyXG5cdHJlZ2V4RXNjYXBlOiBlc2NhcGUucmVnZXgsXHJcblx0ZXNjYXBlRW50aXRpZXM6IGVzY2FwZS5lbnRpdGllcyxcclxuXHRlc2NhcGVVcmlTY2hlbWU6IGVzY2FwZS51cmlTY2hlbWUsXHJcblxyXG5cdGRvbToge1xyXG5cdFx0Y3NzOiBkb20uY3NzLFxyXG5cdFx0YXR0cjogZG9tLmF0dHIsXHJcblx0XHRyZW1vdmVBdHRyOiBkb20ucmVtb3ZlQXR0cixcclxuXHRcdGlzOiBkb20uaXMsXHJcblx0XHRjbG9zZXN0OiBkb20uY2xvc2VzdCxcclxuXHRcdHdpZHRoOiBkb20ud2lkdGgsXHJcblx0XHRoZWlnaHQ6IGRvbS5oZWlnaHQsXHJcblx0XHR0cmF2ZXJzZTogZG9tLnRyYXZlcnNlLFxyXG5cdFx0clRyYXZlcnNlOiBkb20uclRyYXZlcnNlLFxyXG5cdFx0cGFyc2VIVE1MOiBkb20ucGFyc2VIVE1MLFxyXG5cdFx0aGFzU3R5bGluZzogZG9tLmhhc1N0eWxpbmcsXHJcblx0XHRjb252ZXJ0RWxlbWVudDogZG9tLmNvbnZlcnRFbGVtZW50LFxyXG5cdFx0YmxvY2tMZXZlbExpc3Q6IGRvbS5ibG9ja0xldmVsTGlzdCxcclxuXHRcdGNhbkhhdmVDaGlsZHJlbjogZG9tLmNhbkhhdmVDaGlsZHJlbixcclxuXHRcdGlzSW5saW5lOiBkb20uaXNJbmxpbmUsXHJcblx0XHRjb3B5Q1NTOiBkb20uY29weUNTUyxcclxuXHRcdGZpeE5lc3Rpbmc6IGRvbS5maXhOZXN0aW5nLFxyXG5cdFx0ZmluZENvbW1vbkFuY2VzdG9yOiBkb20uZmluZENvbW1vbkFuY2VzdG9yLFxyXG5cdFx0Z2V0U2libGluZzogZG9tLmdldFNpYmxpbmcsXHJcblx0XHRyZW1vdmVXaGl0ZVNwYWNlOiBkb20ucmVtb3ZlV2hpdGVTcGFjZSxcclxuXHRcdGV4dHJhY3RDb250ZW50czogZG9tLmV4dHJhY3RDb250ZW50cyxcclxuXHRcdGdldE9mZnNldDogZG9tLmdldE9mZnNldCxcclxuXHRcdGdldFN0eWxlOiBkb20uZ2V0U3R5bGUsXHJcblx0XHRoYXNTdHlsZTogZG9tLmhhc1N0eWxlXHJcblx0fSxcclxuXHJcblx0dXRpbHM6IHtcclxuXHRcdGVhY2g6IHV0aWxzLmVhY2gsXHJcblx0XHRpc0VtcHR5T2JqZWN0OiB1dGlscy5pc0VtcHR5T2JqZWN0LFxyXG5cdFx0ZXh0ZW5kOiB1dGlscy5leHRlbmRcclxuXHR9LFxyXG5cclxuXHRwbHVnaW5zOiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnMsXHJcblxyXG5cdGNyZWF0ZTogKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBvcHRpb25zOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHRcdC8vIERvbid0IGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgaW5pdGlhbGlzZWRcclxuXHRcdC8vIG9uIGl0J3Mgb3duIHNvdXJjZSBlZGl0b3JcclxuXHRcdGlmIChkb20ucGFyZW50KHRleHRhcmVhLCAnLmVtbGVkaXRvci1jb250YWluZXInKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMucnVuV2l0aG91dFd5c2l3eWdTdXBwb3J0IHx8IGJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkKSB7XHJcblx0XHRcdChuZXcgRW1sRWRpdG9yKHRleHRhcmVhLCBvcHRpb25zKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0aW5zdGFuY2U6IGZ1bmN0aW9uICh0ZXh0YXJlYTogYW55KSB7XHJcblx0XHRyZXR1cm4gdGV4dGFyZWEuX2VtbGVkaXRvcjtcclxuXHR9XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==