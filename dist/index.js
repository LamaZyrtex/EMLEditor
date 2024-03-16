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

/***/ "./src/lib/EmlEditor.js":
/*!******************************!*\
  !*** ./src/lib/EmlEditor.js ***!
  \******************************/
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
/* harmony import */ var _lib_EmlEditor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/EmlEditor.js */ "./src/lib/EmlEditor.js");
/* harmony import */ var _lib_PluginManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/PluginManager.js */ "./src/lib/PluginManager.js");
/* harmony import */ var _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/escape.js */ "./src/lib/escape.js");
/* harmony import */ var _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/browser.js */ "./src/lib/browser.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/dom.js */ "./src/lib/dom.js");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/utils.js */ "./src/lib/utils.js");
/* harmony import */ var _lib_defaultCommands_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/defaultCommands.js */ "./src/lib/defaultCommands.js");
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _themes_square_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./themes/square.less */ "./src/themes/square.less");









window.emlEditor = {
    command: _lib_EmlEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].command,
    locale: _lib_EmlEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].locale,
    icons: _lib_EmlEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].icons,
    formats: _lib_EmlEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"].formats,
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
    utils: {
        each: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.each,
        isEmptyObject: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.isEmptyObject,
        extend: _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__.extend
    },
    plugins: _lib_PluginManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].plugins,
    create: function (textarea, options) {
        options = options || {};
        // Don't allow the editor to be initialised
        // on it's own source editor
        if (_lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.parent(textarea, '.sceditor-container')) {
            return;
        }
        if (options.runWithoutWysiwygSupport || _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__.isWysiwygSupported) {
            /*eslint no-new: off*/
            (new _lib_EmlEditor_js__WEBPACK_IMPORTED_MODULE_0__["default"](textarea, options));
        }
    },
    instance: function (textarea) {
        return textarea._sceditor;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixNQUFNO0FBQ3ZCLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsc0ZBQXNGLDZEQUE2RDtBQUNuSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVUQUF1VDtBQUN2VDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdDQUF3QyxvRkFBb0Ysb0tBQW9LLGlIQUFpSDtBQUN6WjtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVIsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUN2K0NBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsQ0FBaUM7QUFDRztBQUNhO0FBQ0U7QUFDSjtBQUNKO0FBQ1I7QUFDRztBQUNFO0FBQ0k7QUFDVjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGlCQUFpQjtBQUM1QixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNkNBQVk7QUFDYixNQUFNLDZDQUFZO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLDhDQUFhO0FBQ2pELGlDQUFpQyx1Q0FBTTtBQUN2QztBQUNBLGVBQWUsa0RBQWlCLFFBQVE7QUFDeEMsS0FBSyxpREFBZ0I7QUFDckI7QUFDQTtBQUNBLElBQUksZ0RBQWU7QUFDbkI7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw2Q0FDUixTQUFTLDJCQUEyQiwyREFBZTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsNkNBQVk7QUFDdkMsVUFBVSxFQUFFLDBEQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCwwREFBYztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaURBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlDQUFRO0FBQ3JCO0FBQ0EsbUJBQW1CLHdCQUF3QjtBQUMzQztBQUNBO0FBQ0EsUUFBUSwrQ0FBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsMkNBQVU7QUFDYjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx5Q0FBUSwwQkFBMEIseUNBQVE7QUFDN0M7QUFDQTtBQUNBLEVBQUUsK0NBQWM7QUFDaEIsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtEQUFpQjtBQUNyQztBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUUsaURBQWdCO0FBQ2xCLEVBQUUsd0NBQU87QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IseURBQWE7QUFDbkM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sMkRBQTBCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsd0NBQU87QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsdUNBQU07QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrREFBaUI7QUFDbkMsa0JBQWtCLGtEQUFpQjtBQUNuQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyw2Q0FBWTtBQUNmLEdBQUcseUNBQVE7QUFDWCxJQUFJO0FBQ0osR0FBRyw2Q0FBWTtBQUNmLEdBQUcseUNBQVE7QUFDWDtBQUNBO0FBQ0E7QUFDQSxHQUFHLHlDQUFRO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsR0FBRyx5Q0FBUTtBQUNYO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQWU7QUFDakIsRUFBRSxnREFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMENBQVM7QUFDN0IscUJBQXFCLDJDQUFVO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw0Q0FBVztBQUM3QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseURBQUs7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sNENBQVc7QUFDakIsR0FBRywyQ0FBVTtBQUNiLEdBQUcsdUNBQU07QUFDVDtBQUNBO0FBQ0EsaUJBQWlCLHlDQUFRO0FBQ3pCLEVBQUUseUNBQVE7QUFDVixFQUFFLHlDQUFRO0FBQ1Y7QUFDQSxvQkFBb0IsdURBQVc7QUFDL0I7QUFDQTtBQUNBLEVBQUUseUNBQVE7QUFDVjtBQUNBO0FBQ0E7QUFDQSxHQUFHLHlDQUFRO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsR0FBRyx5Q0FBUTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx1Q0FBTTtBQUNULEdBQUcsdUNBQU07QUFDVDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsd0NBQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx1Q0FBTSxrQ0FBa0Msa0RBQWlCO0FBQzVELEdBQUcsdUNBQU07QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHlDQUFRO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHVDQUFNO0FBQ1I7QUFDQTtBQUNBLEdBQUcsdUNBQU07QUFDVCxHQUFHLHVDQUFNLHNDQUFzQyxrREFBaUI7QUFDaEU7QUFDQTtBQUNBLEVBQUUsdUNBQU07QUFDUixFQUFFLHVDQUFNO0FBQ1IsRUFBRSx1Q0FBTTtBQUNSLEVBQUUsdUNBQU07QUFDUixFQUFFLHVDQUFNO0FBQ1IsRUFBRSx1Q0FBTTtBQUNSLEVBQUUsdUNBQU07QUFDUixFQUFFLHVDQUFNO0FBQ1IsRUFBRSx1Q0FBTTtBQUNSLEVBQUUsdUNBQU07QUFDUixFQUFFLHVDQUFNO0FBQ1IsRUFBRSx1Q0FBTTtBQUNSLEVBQUUsdUNBQU07QUFDUjtBQUNBO0FBQ0EsR0FBRyx1Q0FBTTtBQUNUO0FBQ0E7QUFDQSxFQUFFLHVDQUFNO0FBQ1I7QUFDQSxJQUFJLDZDQUFZO0FBQ2hCO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRSx1Q0FBTTtBQUNSLEdBQUcsZ0RBQWU7QUFDbEIsR0FBRztBQUNIO0FBQ0EsRUFBRSx1Q0FBTTtBQUNSLEVBQUUsdUNBQU07QUFDUixFQUFFLHVDQUFNO0FBQ1IsRUFBRSx1Q0FBTTtBQUNSLEVBQUUsdUNBQU07QUFDUjtBQUNBLEVBQUUsdUNBQU07QUFDUixFQUFFLHVDQUFNO0FBQ1IsRUFBRSx1Q0FBTTtBQUNSO0FBQ0EsRUFBRSx1Q0FBTTtBQUNSLEVBQUUsdUNBQU07QUFDUjtBQUNBLEVBQUUsdUNBQU07QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksa0RBQWlCO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQVU7QUFDWixXQUFXLGtEQUFpQjtBQUM1QjtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUcsMkNBQVU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHlEQUFLO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saURBQWdCO0FBQ3RCO0FBQ0EsTUFBTSw2Q0FBWTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBZTtBQUNuQixJQUFJLHVDQUFNO0FBQ1YsVUFBVSw2Q0FBWTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSx1Q0FBTTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUsseUNBQVE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU0sU0FBUywrQ0FBYztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLElBQUksZ0RBQWU7QUFDbkI7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBZTtBQUNuQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRSxnREFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0RBQWlCO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxpQkFBaUIsa0RBQWlCO0FBQ2xDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMENBQVM7QUFDMUIsaUJBQWlCLDJDQUFVO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLHlDQUFRO0FBQ1gsR0FBRyxnREFBZTtBQUNsQixHQUFHLHdDQUFPO0FBQ1YsR0FBRyx3Q0FBTztBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBZTtBQUNuQixJQUFJLDZDQUFZO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQWU7QUFDakIsRUFBRSxnREFBZTtBQUNqQixFQUFFLHlDQUFRO0FBQ1Y7QUFDQSxFQUFFLHVDQUFNO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwwQ0FBUztBQUMxQixpQkFBaUIsMkNBQVU7QUFDM0I7QUFDQTtBQUNBLEdBQUcsNkNBQVk7QUFDZixHQUFHLHlDQUFRO0FBQ1gsR0FBRyx1Q0FBTTtBQUNULEdBQUcsdUNBQU07QUFDVDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsNkNBQVk7QUFDOUIsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQVU7QUFDWix1QkFBdUIseURBQUs7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtEQUFpQjtBQUN2QztBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw4Q0FBYTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxxREFBb0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxrREFBaUIsUUFBUTtBQUNwQyxJQUFJLGdEQUFlO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdUNBQU07QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sb0RBQW1CO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx5Q0FBUTtBQUNsQjtBQUNBO0FBQ0EsRUFBRSx5Q0FBUTtBQUNWLEVBQUUseUNBQVE7QUFDVjtBQUNBLEVBQUUsZ0RBQWU7QUFDakIsRUFBRSxnREFBZTtBQUNqQixFQUFFLDZDQUFZO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBVTtBQUNaLEdBQUcsZ0RBQWU7QUFDbEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksWUFBWTtBQUN4QixZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBVSwwQ0FBUztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQixZQUFZLFNBQVM7QUFDckIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRywwQ0FBUztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRywyQ0FBVTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMkNBQVU7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sa0RBQWlCO0FBQ3ZCLFVBQVUsNkNBQVk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQWU7QUFDakIsRUFBRSxnREFBZTtBQUNqQixFQUFFLGdEQUFlO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksMkNBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRywyQ0FBVTtBQUNiO0FBQ0E7QUFDQSxFQUFFLHdDQUFPO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsR0FBRyx3Q0FBTztBQUNWLEdBQUcsd0NBQU8sc0NBQXNDLGtEQUFpQjtBQUNqRTtBQUNBO0FBQ0EsRUFBRSx3Q0FBTztBQUNULEVBQUUsd0NBQU87QUFDVCxFQUFFLDJDQUFVO0FBQ1osRUFBRSwyQ0FBVTtBQUNaLEVBQUUsMkNBQVU7QUFDWjtBQUNBO0FBQ0EsRUFBRSx5Q0FBUTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGFBQWE7QUFDMUIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiw2Q0FBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkNBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsYUFBYSxrREFBaUI7QUFDOUI7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFLHdDQUFPO0FBQ1QsRUFBRSxnREFBZTtBQUNqQixFQUFFLGdEQUFlO0FBQ2pCLEVBQUUsdUNBQU07QUFDUjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxlQUFlLHlDQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtEQUFpQixVQUFVO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkNBQVk7QUFDaEMsNEJBQTRCLGlEQUFnQjtBQUM1QztBQUNBO0FBQ0EsTUFBTSxnREFBZTtBQUNyQjtBQUNBO0FBQ0EsS0FBSyxnREFBZTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxnREFBZTtBQUNsQixHQUFHLHFEQUFvQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLDJDQUFVLENBQUMseUNBQVE7QUFDdEIsSUFBSSxtREFBa0I7QUFDdEIsSUFBSTtBQUNKO0FBQ0EsR0FBRywyQ0FBVSxDQUFDLHlDQUFRO0FBQ3RCLDZCQUE2Qiw2Q0FBWTtBQUN6QyxLQUFLLDJDQUFVO0FBQ2Y7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLGdEQUFlO0FBQ2xCO0FBQ0EsR0FBRywyQ0FBVTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxnREFBZTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFlO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrREFBaUIsVUFBVTtBQUM3QztBQUNBO0FBQ0EsRUFBRSw0Q0FBVztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsK0NBQWM7QUFDakIsSUFBSTtBQUNKLHlCQUF5QixnREFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDRDQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDBDQUFTO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsMkNBQVU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMkNBQVU7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDRDQUFXO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsK0NBQWM7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlDQUFRO0FBQ3JCLEVBQUUseUNBQVE7QUFDVjtBQUNBLGVBQWUsOENBQWE7QUFDNUI7QUFDQSxFQUFFLHlDQUFRO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLGdEQUFlLFFBQVEsZ0RBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFNBQVM7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sK0NBQWM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixZQUFZLFNBQVM7QUFDckIsWUFBWSxTQUFTO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEIsWUFBWSxTQUFTO0FBQ3JCLFlBQVksU0FBUztBQUNyQixZQUFZLFNBQVM7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxrREFBaUIsVUFBVTtBQUN2QztBQUNBO0FBQ0Esa0JBQWtCLHVCQUF1QjtBQUN6QyxHQUFHLGdEQUFlO0FBQ2xCO0FBQ0E7QUFDQSxFQUFFLGdEQUFlO0FBQ2pCLEVBQUUsK0NBQWM7QUFDaEIsRUFBRSwyQ0FBVTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxrREFDUztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw2Q0FBWTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksU0FBUztBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxpREFBZ0I7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGlEQUFnQjtBQUN2QjtBQUNBLEtBQUssa0RBQWlCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxrREFBaUI7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlEQUFnQjtBQUN0QjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saURBQWdCO0FBQ3RCO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsT0FBTyx5Q0FBUTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyx1Q0FBTTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QixhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSw0Q0FBVztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLDJDQUFVO0FBQ2I7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMERBQXlCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx1Q0FBTTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUkseUNBQVE7QUFDWjtBQUNBLEdBQUcsMkNBQVU7QUFDYixlQUFlLHlDQUFRO0FBQ3ZCO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHLHdDQUFPO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtEQUFpQjtBQUNoQztBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUcsZ0RBQWU7QUFDbEI7QUFDQTtBQUNBLE9BQU8sK0NBQWM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxXQUFXO0FBQ1gsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QixhQUFhLGlCQUFpQjtBQUM5QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLCtDQUFjO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsdUNBQU07QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsOENBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsK0NBQWMsV0FBVyw2Q0FBWTtBQUMvQyxzQ0FBc0MsdUNBQU07QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsdUNBQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHlDQUFRO0FBQ1Y7QUFDQSxPQUFPLHVDQUFNO0FBQ2IsR0FBRyxtREFBa0I7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLDRDQUFXO0FBQ2Q7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUywyREFBZTtBQUN4QixFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssMkJBQTJCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQixhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkNBQVksQ0FBQywyREFBZSxZQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJEQUFlO0FBQ2pCO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxNQUFNLDJEQUFlO0FBQ3JCLFVBQVUsMkRBQWU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xoSEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxnQkFBZ0IsZ0NBQWdDO0FBQ2hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsV0FBVztBQUN4QixhQUFhLFdBQVc7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxXQUFXO0FBQ3hCLGFBQWEsV0FBVztBQUN4QixhQUFhLEdBQUc7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNPQTtBQUNnQztBQUNNO0FBQ0Y7OztBQUdwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksU0FBUztBQUNyQixZQUFZLFNBQVM7QUFDckIsWUFBWSxTQUFTO0FBQ3JCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGtEQUFpQixRQUFRO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQSxHQUFHLGdEQUFlO0FBQ2xCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsYUFBYTtBQUMxQixhQUFhLGFBQWE7QUFDMUIsYUFBYSxTQUFTO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVUsOENBQWE7QUFDdkIsSUFBSTtBQUNKLEdBQUcsZ0RBQWU7O0FBRWxCO0FBQ0EsSUFBSSxnREFBZTtBQUNuQixJQUFJLGdEQUFlO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFVBQVUsNkNBQVk7QUFDdEI7QUFDQTs7QUFFQSxNQUFNLG9EQUFtQjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdEQUFlO0FBQ25CO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUUsZ0RBQWU7QUFDakIsRUFBRSxnREFBZTs7QUFFakI7QUFDQSxhQUFhLGtEQUFpQjtBQUM5QixHQUFHLGdEQUFlOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLFlBQVksTUFBTTtBQUNsQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLDRDQUFXO0FBQzFCLElBQUksMkNBQVU7QUFDZDtBQUNBOztBQUVBO0FBQ0EsR0FBRywyQ0FBVTtBQUNiLFFBQVEsNENBQVc7QUFDbkI7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLG9EQUFtQjtBQUM3RCxHQUFHLGlEQUFnQjtBQUNuQixJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxrREFBaUIsUUFBUTtBQUNsQyxHQUFHLGdEQUFlOztBQUVsQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsNkNBQVk7QUFDcEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixrREFBaUI7QUFDakM7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QixHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRywyQ0FBVTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkNBQVk7O0FBRWhCO0FBQ0EsdUJBQXVCLHVDQUFNO0FBQzdCO0FBQ0E7O0FBRUEsT0FBTyx1Q0FBTTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLFlBQVksUUFBUTtBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLFlBQVksU0FBUztBQUNyQjtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sNkNBQVk7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3h4QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRkQ7QUFDZ0M7QUFDSTtBQUNFO0FBQ0g7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsd0NBQU87QUFDNUIsS0FBSywyQ0FBVTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ244Qks7O0FBRWhDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUyw2Q0FBSTs7QUFFYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1lNO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLHlCQUF5QjtBQUNwQyxXQUFXLFdBQVc7QUFDdEIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0EsQ0FBQywyQ0FBVSxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxjQUFjO0FBQ3pCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsa0JBQWtCO0FBQzdCLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU0sK0NBQWM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxrQkFBa0I7QUFDN0IsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBTSwrQ0FBYztBQUNwQjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsU0FBUztBQUNwQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekI7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLGdCQUFnQjtBQUMzQixXQUFXLGVBQWU7QUFDMUIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBLE1BQU0sK0NBQWM7QUFDcEI7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBVTtBQUNaO0FBQ0EsR0FBRztBQUNILEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLDJDQUFVO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsYUFBYTtBQUN4QixhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxRQUFRO0FBQ25CO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLFFBQVE7QUFDbkI7QUFDTztBQUNQO0FBQ0E7QUFDQSxDQUFDLGtEQUFpQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxTQUFTO0FBQ3BCO0FBQ087QUFDUCxTQUFTLGtEQUFpQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxlQUFlO0FBQzFCLGFBQWE7QUFDYjtBQUNPO0FBQ1AsS0FBSyxrREFBaUI7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxlQUFlO0FBQzFCLGFBQWE7QUFDYjtBQUNPO0FBQ1AsS0FBSyxrREFBaUI7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ087QUFDUDtBQUNBO0FBQ0EsS0FBSyxpREFBZ0I7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLGFBQWE7QUFDYjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCLFlBQVksVUFBVTtBQUN0QjtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBLFlBQVksU0FBUztBQUNyQixZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsVUFBVTtBQUNyQjtBQUNBLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCLFlBQVk7QUFDWjtBQUNBO0FBQ087QUFDUDtBQUNBLDBCQUEwQixvREFBbUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekIsWUFBWSxhQUFhO0FBQ3pCLFlBQVk7QUFDWjtBQUNBO0FBQ087QUFDUCw2Q0FBNkM7QUFDN0M7QUFDQSxDQUFDLDJDQUFVO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYTtBQUNqQixFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVk7QUFDWjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLGNBQWM7QUFDekIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsYUFBYTtBQUN4QixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekIsWUFBWSxRQUFRO0FBQ3BCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGFBQWE7QUFDekIsWUFBWSxRQUFRO0FBQ3BCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYTtBQUN6QixZQUFZLFFBQVE7QUFDcEIsWUFBWSxjQUFjO0FBQzFCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdnJDZ0M7QUFDSTtBQUNFOztBQUV0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBLHlCQUF5Qix5Q0FBUTs7QUFFakM7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHlDQUFROztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyw4Q0FBYTtBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUsMkNBQVU7QUFDWjtBQUNBLEdBQUcsMkNBQVU7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLHdCQUF3QjtBQUNuQyxXQUFXLFNBQVM7QUFDcEIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUssMkNBQVU7QUFDZjtBQUNBOztBQUVBLENBQUMsMkNBQVU7QUFDWCwwQ0FBMEMsNkNBQVk7QUFDdEQ7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixpREFBZ0IsS0FBSyx1Q0FBTTtBQUNwRDtBQUNBOztBQUVBLHlCQUF5Qiw4Q0FBYTtBQUN0QyxvQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsOENBQWE7QUFDcEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtR0FBbUc7O0FBRW5HO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDTztBQUNQLG1DQUFtQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsWUFBWTtBQUNaLFlBQVk7QUFDWixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3Qjs7QUFFQSxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWTtBQUNaO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkdnQztBQUNNOzs7QUFHdEM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxNQUFNO0FBQ2Y7QUFDQTtBQUNBLHlCQUF5QixTQUFTLFFBQVE7QUFDMUMsbURBQW1ELE1BQU07QUFDekQ7QUFDQSxrQ0FBa0MsV0FBVztBQUM3Qzs7QUFFQSw0REFBNEQsS0FBSztBQUNqRSwyQkFBMkIsS0FBSztBQUNoQywyQkFBMkIsU0FBUzs7QUFFcEMsdUJBQXVCLElBQUksMkJBQTJCLElBQUk7QUFDMUQsU0FBUyxJQUFJLFVBQVUsUUFBUTs7QUFFL0I7QUFDQSxlQUFlLEtBQUssZUFBZSxLQUFLLEdBQUcsS0FBSzs7QUFFaEQsMkRBQTJELEtBQUs7QUFDaEUseUJBQXlCLEtBQUssR0FBRyxLQUFLOztBQUV0QztBQUNBLDBCQUEwQixNQUFNO0FBQ2hDO0FBQ0EscURBQXFELE9BQU87QUFDNUQ7O0FBRUE7QUFDQSwyQkFBMkIsS0FBSztBQUNoQztBQUNBLDJCQUEyQixLQUFLO0FBQ2hDO0FBQ0Esb0RBQW9ELE9BQU87QUFDM0Q7O0FBRUE7QUFDQSw0QkFBNEIsSUFBSTtBQUNoQztBQUNBLDRCQUE0QixNQUFNO0FBQ2xDO0FBQ0EsNkJBQTZCLE9BQU87QUFDcEM7QUFDQSxvREFBb0QsT0FBTztBQUMzRDs7QUFFQTtBQUNBLDRCQUE0QixNQUFNO0FBQ2xDO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQSxvREFBb0QsT0FBTztBQUMzRDs7QUFFQTtBQUNBLDJCQUEyQixJQUFJO0FBQy9CO0FBQ0EsMEJBQTBCLEtBQUs7QUFDL0I7QUFDQSxvREFBb0QsSUFBSTs7QUFFeEQ7QUFDQSwyQkFBMkIsTUFBTTtBQUNqQztBQUNBLG9EQUFvRCxPQUFPO0FBQzNEOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsR0FBRyxxQkFBcUIsS0FBSztBQUM3RSxxQkFBcUIsR0FBRztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBLDZCQUFlLG9DQUFVO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQSxjQUFjLDZDQUFZLEdBQUcsYUFBYTtBQUMxQztBQUNBLEVBQUU7O0FBRUY7QUFDQSxhQUFhLDhDQUFhO0FBQzFCOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsR0FBRztBQUNkLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNPOztBQUVQO0FBQ0EsVUFBVTtBQUNWO0FBQ087O0FBRVA7QUFDQSxVQUFVO0FBQ1Y7QUFDTzs7QUFFUDtBQUNBLFVBQVU7QUFDVjtBQUNPOzs7QUFHUDtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUJBQWlCO0FBQzVCLFdBQVcsV0FBVztBQUN0QixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0JBQXNCO0FBQzlCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLEdBQUc7QUFDZDtBQUNPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ087QUFDUDtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7VUN4SUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ04yQztBQUNRO0FBQ1Q7QUFDRTtBQUNSO0FBQ0k7QUFDZTtBQUNGO0FBQ3ZCO0FBMkI5QixNQUFNLENBQUMsU0FBUyxHQUFHO0lBQ2xCLE9BQU8sRUFBRSx5REFBUyxDQUFDLE9BQU87SUFDMUIsTUFBTSxFQUFFLHlEQUFTLENBQUMsTUFBTTtJQUN4QixLQUFLLEVBQUUseURBQVMsQ0FBQyxLQUFLO0lBQ3RCLE9BQU8sRUFBRSx5REFBUyxDQUFDLE9BQU87SUFFMUIsUUFBUSxFQUFFLCtEQUFlO0lBQ3pCLGNBQWMsRUFBRSw4REFBYztJQUM5QixHQUFHLEVBQUUsZ0RBQVc7SUFDaEIsa0JBQWtCLEVBQUUsK0RBQTBCO0lBQzlDLFdBQVcsRUFBRSxpREFBWTtJQUN6QixjQUFjLEVBQUUsb0RBQWU7SUFDL0IsZUFBZSxFQUFFLHFEQUFnQjtJQUVqQyxHQUFHLEVBQUU7UUFDSixHQUFHLEVBQUUsNENBQU87UUFDWixJQUFJLEVBQUUsNkNBQVE7UUFDZCxVQUFVLEVBQUUsbURBQWM7UUFDMUIsRUFBRSxFQUFFLDJDQUFNO1FBQ1YsT0FBTyxFQUFFLGdEQUFXO1FBQ3BCLEtBQUssRUFBRSw4Q0FBUztRQUNoQixNQUFNLEVBQUUsK0NBQVU7UUFDbEIsUUFBUSxFQUFFLGlEQUFZO1FBQ3RCLFNBQVMsRUFBRSxrREFBYTtRQUN4QixTQUFTLEVBQUUsa0RBQWE7UUFDeEIsVUFBVSxFQUFFLG1EQUFjO1FBQzFCLGNBQWMsRUFBRSx1REFBa0I7UUFDbEMsY0FBYyxFQUFFLHVEQUFrQjtRQUNsQyxlQUFlLEVBQUUsd0RBQW1CO1FBQ3BDLFFBQVEsRUFBRSxpREFBWTtRQUN0QixPQUFPLEVBQUUsZ0RBQVc7UUFDcEIsVUFBVSxFQUFFLG1EQUFjO1FBQzFCLGtCQUFrQixFQUFFLDJEQUFzQjtRQUMxQyxVQUFVLEVBQUUsbURBQWM7UUFDMUIsZ0JBQWdCLEVBQUUseURBQW9CO1FBQ3RDLGVBQWUsRUFBRSx3REFBbUI7UUFDcEMsU0FBUyxFQUFFLGtEQUFhO1FBQ3hCLFFBQVEsRUFBRSxpREFBWTtRQUN0QixRQUFRLEVBQUUsaURBQVk7S0FDdEI7SUFFRCxLQUFLLEVBQUU7UUFDTixJQUFJLEVBQUUsK0NBQVU7UUFDaEIsYUFBYSxFQUFFLHdEQUFtQjtRQUNsQyxNQUFNLEVBQUUsaURBQVk7S0FDcEI7SUFFRCxPQUFPLEVBQUUsNkRBQWEsQ0FBQyxPQUFPO0lBRTlCLE1BQU0sRUFBRSxVQUFVLFFBQWEsRUFBRSxPQUFZO1FBQzVDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBRXhCLDJDQUEyQztRQUMzQyw0QkFBNEI7UUFDNUIsSUFBSSwrQ0FBVSxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7WUFDakQsT0FBTztRQUNSLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyx3QkFBd0IsSUFBSSwrREFBMEIsRUFBRSxDQUFDO1lBQ3BFLHNCQUFzQjtZQUN0QixDQUFDLElBQUkseURBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0YsQ0FBQztJQUVELFFBQVEsRUFBRSxVQUFVLFFBQWE7UUFDaEMsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQzNCLENBQUM7Q0FDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vbm9kZV9tb2R1bGVzL2RvbXB1cmlmeS9kaXN0L3B1cmlmeS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvdGhlbWVzL3NxdWFyZS5sZXNzP2RkYzYiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9FbWxFZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9QbHVnaW5NYW5hZ2VyLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvUmFuZ2VIZWxwZXIuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdENvbW1hbmRzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kb20uanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lbW90aWNvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi90ZW1wbGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBAbGljZW5zZSBET01QdXJpZnkgMy4wLjkgfCAoYykgQ3VyZTUzIGFuZCBvdGhlciBjb250cmlidXRvcnMgfCBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIGxpY2Vuc2UgMi4wIGFuZCBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlIDIuMCB8IGdpdGh1Yi5jb20vY3VyZTUzL0RPTVB1cmlmeS9ibG9iLzMuMC45L0xJQ0VOU0UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuRE9NUHVyaWZ5ID0gZmFjdG9yeSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBjb25zdCB7XG4gICAgZW50cmllcyxcbiAgICBzZXRQcm90b3R5cGVPZixcbiAgICBpc0Zyb3plbixcbiAgICBnZXRQcm90b3R5cGVPZixcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgfSA9IE9iamVjdDtcbiAgbGV0IHtcbiAgICBmcmVlemUsXG4gICAgc2VhbCxcbiAgICBjcmVhdGVcbiAgfSA9IE9iamVjdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG4gIGxldCB7XG4gICAgYXBwbHksXG4gICAgY29uc3RydWN0XG4gIH0gPSB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgUmVmbGVjdDtcbiAgaWYgKCFmcmVlemUpIHtcbiAgICBmcmVlemUgPSBmdW5jdGlvbiBmcmVlemUoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICBpZiAoIXNlYWwpIHtcbiAgICBzZWFsID0gZnVuY3Rpb24gc2VhbCh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghYXBwbHkpIHtcbiAgICBhcHBseSA9IGZ1bmN0aW9uIGFwcGx5KGZ1biwgdGhpc1ZhbHVlLCBhcmdzKSB7XG4gICAgICByZXR1cm4gZnVuLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgfTtcbiAgfVxuICBpZiAoIWNvbnN0cnVjdCkge1xuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uIGNvbnN0cnVjdChGdW5jLCBhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IEZ1bmMoLi4uYXJncyk7XG4gICAgfTtcbiAgfVxuICBjb25zdCBhcnJheUZvckVhY2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKTtcbiAgY29uc3QgYXJyYXlQb3AgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wb3ApO1xuICBjb25zdCBhcnJheVB1c2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAgY29uc3Qgc3RyaW5nVG9Mb3dlckNhc2UgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2UpO1xuICBjb25zdCBzdHJpbmdUb1N0cmluZyA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyk7XG4gIGNvbnN0IHN0cmluZ01hdGNoID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLm1hdGNoKTtcbiAgY29uc3Qgc3RyaW5nUmVwbGFjZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbiAgY29uc3Qgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgY29uc3Qgc3RyaW5nVHJpbSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50cmltKTtcbiAgY29uc3Qgb2JqZWN0SGFzT3duUHJvcGVydHkgPSB1bmFwcGx5KE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICBjb25zdCByZWdFeHBUZXN0ID0gdW5hcHBseShSZWdFeHAucHJvdG90eXBlLnRlc3QpO1xuICBjb25zdCB0eXBlRXJyb3JDcmVhdGUgPSB1bmNvbnN0cnVjdChUeXBlRXJyb3IpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgYW5kIGNhbGxlZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIHRoaXNBcmcgYW5kIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHVuYXBwbHkoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpc0FyZykge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5jb25zdHJ1Y3QoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnN0cnVjdChmdW5jLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBwcm9wZXJ0aWVzIHRvIGEgbG9va3VwIHRhYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgLSBUaGUgc2V0IHRvIHdoaWNoIGVsZW1lbnRzIHdpbGwgYmUgYWRkZWQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IGNvbnRhaW5pbmcgZWxlbWVudHMgdG8gYmUgYWRkZWQgdG8gdGhlIHNldC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtQ2FzZUZ1bmMgLSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIGNhc2Ugb2YgZWFjaCBlbGVtZW50IGJlZm9yZSBhZGRpbmcgdG8gdGhlIHNldC5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIG1vZGlmaWVkIHNldCB3aXRoIGFkZGVkIGVsZW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gYWRkVG9TZXQoc2V0LCBhcnJheSkge1xuICAgIGxldCB0cmFuc2Zvcm1DYXNlRnVuYyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogc3RyaW5nVG9Mb3dlckNhc2U7XG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAvLyBNYWtlICdpbicgYW5kIHRydXRoeSBjaGVja3MgbGlrZSBCb29sZWFuKHNldC5jb25zdHJ1Y3RvcilcbiAgICAgIC8vIGluZGVwZW5kZW50IG9mIGFueSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gT2JqZWN0LnByb3RvdHlwZS5cbiAgICAgIC8vIFByZXZlbnQgcHJvdG90eXBlIHNldHRlcnMgZnJvbSBpbnRlcmNlcHRpbmcgc2V0IGFzIGEgdGhpcyB2YWx1ZS5cbiAgICAgIHNldFByb3RvdHlwZU9mKHNldCwgbnVsbCk7XG4gICAgfVxuICAgIGxldCBsID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgIGxldCBlbGVtZW50ID0gYXJyYXlbbF07XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGxjRWxlbWVudCA9IHRyYW5zZm9ybUNhc2VGdW5jKGVsZW1lbnQpO1xuICAgICAgICBpZiAobGNFbGVtZW50ICE9PSBlbGVtZW50KSB7XG4gICAgICAgICAgLy8gQ29uZmlnIHByZXNldHMgKGUuZy4gdGFncy5qcywgYXR0cnMuanMpIGFyZSBpbW11dGFibGUuXG4gICAgICAgICAgaWYgKCFpc0Zyb3plbihhcnJheSkpIHtcbiAgICAgICAgICAgIGFycmF5W2xdID0gbGNFbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gbGNFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuIHVwIGFuIGFycmF5IHRvIGhhcmRlbiBhZ2FpbnN0IENTUFBcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgdG8gYmUgY2xlYW5lZC5cbiAgICogQHJldHVybnMge0FycmF5fSBUaGUgY2xlYW5lZCB2ZXJzaW9uIG9mIHRoZSBhcnJheVxuICAgKi9cbiAgZnVuY3Rpb24gY2xlYW5BcnJheShhcnJheSkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KGFycmF5LCBpbmRleCk7XG4gICAgICBpZiAoIWlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBhcnJheVtpbmRleF0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogU2hhbGxvdyBjbG9uZSBhbiBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gYmUgY2xvbmVkLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIG5ldyBvYmplY3QgdGhhdCBjb3BpZXMgdGhlIG9yaWdpbmFsLlxuICAgKi9cbiAgZnVuY3Rpb24gY2xvbmUob2JqZWN0KSB7XG4gICAgY29uc3QgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgIGZvciAoY29uc3QgW3Byb3BlcnR5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmplY3QpKSB7XG4gICAgICBjb25zdCBpc1Byb3BlcnR5RXhpc3QgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgIGlmIChpc1Byb3BlcnR5RXhpc3QpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsZWFuQXJyYXkodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSBjbG9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXV0b21hdGljYWxseSBjaGVja3MgaWYgdGhlIHByb3AgaXMgZnVuY3Rpb24gb3IgZ2V0dGVyIGFuZCBiZWhhdmVzIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBsb29rIHVwIHRoZSBnZXR0ZXIgZnVuY3Rpb24gaW4gaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgLSBUaGUgcHJvcGVydHkgbmFtZSBmb3Igd2hpY2ggdG8gZmluZCB0aGUgZ2V0dGVyIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSBnZXR0ZXIgZnVuY3Rpb24gZm91bmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbiBvciBhIGZhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbG9va3VwR2V0dGVyKG9iamVjdCwgcHJvcCkge1xuICAgIHdoaWxlIChvYmplY3QgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRlc2MgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcbiAgICAgIGlmIChkZXNjKSB7XG4gICAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MuZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRlc2MudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdW5hcHBseShkZXNjLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmFsbGJhY2tWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGh0bWwkMSA9IGZyZWV6ZShbJ2EnLCAnYWJicicsICdhY3JvbnltJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmRpJywgJ2JkbycsICdiaWcnLCAnYmxpbmsnLCAnYmxvY2txdW90ZScsICdib2R5JywgJ2JyJywgJ2J1dHRvbicsICdjYW52YXMnLCAnY2FwdGlvbicsICdjZW50ZXInLCAnY2l0ZScsICdjb2RlJywgJ2NvbCcsICdjb2xncm91cCcsICdjb250ZW50JywgJ2RhdGEnLCAnZGF0YWxpc3QnLCAnZGQnLCAnZGVjb3JhdG9yJywgJ2RlbCcsICdkZXRhaWxzJywgJ2RmbicsICdkaWFsb2cnLCAnZGlyJywgJ2RpdicsICdkbCcsICdkdCcsICdlbGVtZW50JywgJ2VtJywgJ2ZpZWxkc2V0JywgJ2ZpZ2NhcHRpb24nLCAnZmlndXJlJywgJ2ZvbnQnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdsYWJlbCcsICdsZWdlbmQnLCAnbGknLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0ZXInLCAnbmF2JywgJ25vYnInLCAnb2wnLCAnb3B0Z3JvdXAnLCAnb3B0aW9uJywgJ291dHB1dCcsICdwJywgJ3BpY3R1cmUnLCAncHJlJywgJ3Byb2dyZXNzJywgJ3EnLCAncnAnLCAncnQnLCAncnVieScsICdzJywgJ3NhbXAnLCAnc2VjdGlvbicsICdzZWxlY3QnLCAnc2hhZG93JywgJ3NtYWxsJywgJ3NvdXJjZScsICdzcGFjZXInLCAnc3BhbicsICdzdHJpa2UnLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsICd0YWJsZScsICd0Ym9keScsICd0ZCcsICd0ZW1wbGF0ZScsICd0ZXh0YXJlYScsICd0Zm9vdCcsICd0aCcsICd0aGVhZCcsICd0aW1lJywgJ3RyJywgJ3RyYWNrJywgJ3R0JywgJ3UnLCAndWwnLCAndmFyJywgJ3ZpZGVvJywgJ3diciddKTtcblxuICAvLyBTVkdcbiAgY29uc3Qgc3ZnJDEgPSBmcmVlemUoWydzdmcnLCAnYScsICdhbHRnbHlwaCcsICdhbHRnbHlwaGRlZicsICdhbHRnbHlwaGl0ZW0nLCAnYW5pbWF0ZWNvbG9yJywgJ2FuaW1hdGVtb3Rpb24nLCAnYW5pbWF0ZXRyYW5zZm9ybScsICdjaXJjbGUnLCAnY2xpcHBhdGgnLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZycsICdnbHlwaCcsICdnbHlwaHJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJywgJ2xpbmVhcmdyYWRpZW50JywgJ21hcmtlcicsICdtYXNrJywgJ21ldGFkYXRhJywgJ21wYXRoJywgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbGdyYWRpZW50JywgJ3JlY3QnLCAnc3RvcCcsICdzdHlsZScsICdzd2l0Y2gnLCAnc3ltYm9sJywgJ3RleHQnLCAndGV4dHBhdGgnLCAndGl0bGUnLCAndHJlZicsICd0c3BhbicsICd2aWV3JywgJ3ZrZXJuJ10pO1xuICBjb25zdCBzdmdGaWx0ZXJzID0gZnJlZXplKFsnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZURyb3BTaGFkb3cnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJ10pO1xuXG4gIC8vIExpc3Qgb2YgU1ZHIGVsZW1lbnRzIHRoYXQgYXJlIGRpc2FsbG93ZWQgYnkgZGVmYXVsdC5cbiAgLy8gV2Ugc3RpbGwgbmVlZCB0byBrbm93IHRoZW0gc28gdGhhdCB3ZSBjYW4gZG8gbmFtZXNwYWNlXG4gIC8vIGNoZWNrcyBwcm9wZXJseSBpbiBjYXNlIG9uZSB3YW50cyB0byBhZGQgdGhlbSB0b1xuICAvLyBhbGxvdy1saXN0LlxuICBjb25zdCBzdmdEaXNhbGxvd2VkID0gZnJlZXplKFsnYW5pbWF0ZScsICdjb2xvci1wcm9maWxlJywgJ2N1cnNvcicsICdkaXNjYXJkJywgJ2ZvbnQtZmFjZScsICdmb250LWZhY2UtZm9ybWF0JywgJ2ZvbnQtZmFjZS1uYW1lJywgJ2ZvbnQtZmFjZS1zcmMnLCAnZm9udC1mYWNlLXVyaScsICdmb3JlaWdub2JqZWN0JywgJ2hhdGNoJywgJ2hhdGNocGF0aCcsICdtZXNoJywgJ21lc2hncmFkaWVudCcsICdtZXNocGF0Y2gnLCAnbWVzaHJvdycsICdtaXNzaW5nLWdseXBoJywgJ3NjcmlwdCcsICdzZXQnLCAnc29saWRjb2xvcicsICd1bmtub3duJywgJ3VzZSddKTtcbiAgY29uc3QgbWF0aE1sJDEgPSBmcmVlemUoWydtYXRoJywgJ21lbmNsb3NlJywgJ21lcnJvcicsICdtZmVuY2VkJywgJ21mcmFjJywgJ21nbHlwaCcsICdtaScsICdtbGFiZWxlZHRyJywgJ21tdWx0aXNjcmlwdHMnLCAnbW4nLCAnbW8nLCAnbW92ZXInLCAnbXBhZGRlZCcsICdtcGhhbnRvbScsICdtcm9vdCcsICdtcm93JywgJ21zJywgJ21zcGFjZScsICdtc3FydCcsICdtc3R5bGUnLCAnbXN1YicsICdtc3VwJywgJ21zdWJzdXAnLCAnbXRhYmxlJywgJ210ZCcsICdtdGV4dCcsICdtdHInLCAnbXVuZGVyJywgJ211bmRlcm92ZXInLCAnbXByZXNjcmlwdHMnXSk7XG5cbiAgLy8gU2ltaWxhcmx5IHRvIFNWRywgd2Ugd2FudCB0byBrbm93IGFsbCBNYXRoTUwgZWxlbWVudHMsXG4gIC8vIGV2ZW4gdGhvc2UgdGhhdCB3ZSBkaXNhbGxvdyBieSBkZWZhdWx0LlxuICBjb25zdCBtYXRoTWxEaXNhbGxvd2VkID0gZnJlZXplKFsnbWFjdGlvbicsICdtYWxpZ25ncm91cCcsICdtYWxpZ25tYXJrJywgJ21sb25nZGl2JywgJ21zY2FycmllcycsICdtc2NhcnJ5JywgJ21zZ3JvdXAnLCAnbXN0YWNrJywgJ21zbGluZScsICdtc3JvdycsICdzZW1hbnRpY3MnLCAnYW5ub3RhdGlvbicsICdhbm5vdGF0aW9uLXhtbCcsICdtcHJlc2NyaXB0cycsICdub25lJ10pO1xuICBjb25zdCB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XG5cbiAgY29uc3QgaHRtbCA9IGZyZWV6ZShbJ2FjY2VwdCcsICdhY3Rpb24nLCAnYWxpZ24nLCAnYWx0JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvcGljdHVyZWlucGljdHVyZScsICdhdXRvcGxheScsICdiYWNrZ3JvdW5kJywgJ2JnY29sb3InLCAnYm9yZGVyJywgJ2NhcHR1cmUnLCAnY2VsbHBhZGRpbmcnLCAnY2VsbHNwYWNpbmcnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzJywgJ2NsZWFyJywgJ2NvbG9yJywgJ2NvbHMnLCAnY29sc3BhbicsICdjb250cm9scycsICdjb250cm9sc2xpc3QnLCAnY29vcmRzJywgJ2Nyb3Nzb3JpZ2luJywgJ2RhdGV0aW1lJywgJ2RlY29kaW5nJywgJ2RlZmF1bHQnLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJywgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLCAnZW5jdHlwZScsICdlbnRlcmtleWhpbnQnLCAnZmFjZScsICdmb3InLCAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmbGFuZycsICdpZCcsICdpbnB1dG1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzbWFwJywgJ2tpbmQnLCAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvYWRpbmcnLCAnbG9vcCcsICdsb3cnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtZWRpYScsICdtZXRob2QnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsICduYW1lJywgJ25vbmNlJywgJ25vc2hhZGUnLCAnbm92YWxpZGF0ZScsICdub3dyYXAnLCAnb3BlbicsICdvcHRpbXVtJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncGxheXNpbmxpbmUnLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHViZGF0ZScsICdyYWRpb2dyb3VwJywgJ3JlYWRvbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXYnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dzJywgJ3Jvd3NwYW4nLCAnc3BlbGxjaGVjaycsICdzY29wZScsICdzZWxlY3RlZCcsICdzaGFwZScsICdzaXplJywgJ3NpemVzJywgJ3NwYW4nLCAnc3JjbGFuZycsICdzdGFydCcsICdzcmMnLCAnc3Jjc2V0JywgJ3N0ZXAnLCAnc3R5bGUnLCAnc3VtbWFyeScsICd0YWJpbmRleCcsICd0aXRsZScsICd0cmFuc2xhdGUnLCAndHlwZScsICd1c2VtYXAnLCAndmFsaWduJywgJ3ZhbHVlJywgJ3dpZHRoJywgJ3htbG5zJywgJ3Nsb3QnXSk7XG4gIGNvbnN0IHN2ZyA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndHJhbnNmb3JtLW9yaWdpbicsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dGxlbmd0aCcsICd0eXBlJywgJ3UxJywgJ3UyJywgJ3VuaWNvZGUnLCAndmFsdWVzJywgJ3ZpZXdib3gnLCAndmlzaWJpbGl0eScsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dpZHRoJywgJ3dvcmQtc3BhY2luZycsICd3cmFwJywgJ3dyaXRpbmctbW9kZScsICd4Y2hhbm5lbHNlbGVjdG9yJywgJ3ljaGFubmVsc2VsZWN0b3InLCAneCcsICd4MScsICd4MicsICd4bWxucycsICd5JywgJ3kxJywgJ3kyJywgJ3onLCAnem9vbWFuZHBhbiddKTtcbiAgY29uc3QgbWF0aE1sID0gZnJlZXplKFsnYWNjZW50JywgJ2FjY2VudHVuZGVyJywgJ2FsaWduJywgJ2JldmVsbGVkJywgJ2Nsb3NlJywgJ2NvbHVtbnNhbGlnbicsICdjb2x1bW5saW5lcycsICdjb2x1bW5zcGFuJywgJ2Rlbm9tYWxpZ24nLCAnZGVwdGgnLCAnZGlyJywgJ2Rpc3BsYXknLCAnZGlzcGxheXN0eWxlJywgJ2VuY29kaW5nJywgJ2ZlbmNlJywgJ2ZyYW1lJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2xhcmdlb3AnLCAnbGVuZ3RoJywgJ2xpbmV0aGlja25lc3MnLCAnbHNwYWNlJywgJ2xxdW90ZScsICdtYXRoYmFja2dyb3VuZCcsICdtYXRoY29sb3InLCAnbWF0aHNpemUnLCAnbWF0aHZhcmlhbnQnLCAnbWF4c2l6ZScsICdtaW5zaXplJywgJ21vdmFibGVsaW1pdHMnLCAnbm90YXRpb24nLCAnbnVtYWxpZ24nLCAnb3BlbicsICdyb3dhbGlnbicsICdyb3dsaW5lcycsICdyb3dzcGFjaW5nJywgJ3Jvd3NwYW4nLCAncnNwYWNlJywgJ3JxdW90ZScsICdzY3JpcHRsZXZlbCcsICdzY3JpcHRtaW5zaXplJywgJ3NjcmlwdHNpemVtdWx0aXBsaWVyJywgJ3NlbGVjdGlvbicsICdzZXBhcmF0b3InLCAnc2VwYXJhdG9ycycsICdzdHJldGNoeScsICdzdWJzY3JpcHRzaGlmdCcsICdzdXBzY3JpcHRzaGlmdCcsICdzeW1tZXRyaWMnLCAndm9mZnNldCcsICd3aWR0aCcsICd4bWxucyddKTtcbiAgY29uc3QgeG1sID0gZnJlZXplKFsneGxpbms6aHJlZicsICd4bWw6aWQnLCAneGxpbms6dGl0bGUnLCAneG1sOnNwYWNlJywgJ3htbG5zOnhsaW5rJ10pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICBjb25zdCBNVVNUQUNIRV9FWFBSID0gc2VhbCgvXFx7XFx7W1xcd1xcV10qfFtcXHdcXFddKlxcfVxcfS9nbSk7IC8vIFNwZWNpZnkgdGVtcGxhdGUgZGV0ZWN0aW9uIHJlZ2V4IGZvciBTQUZFX0ZPUl9URU1QTEFURVMgbW9kZVxuICBjb25zdCBFUkJfRVhQUiA9IHNlYWwoLzwlW1xcd1xcV10qfFtcXHdcXFddKiU+L2dtKTtcbiAgY29uc3QgVE1QTElUX0VYUFIgPSBzZWFsKC9cXCR7W1xcd1xcV10qfS9nbSk7XG4gIGNvbnN0IERBVEFfQVRUUiA9IHNlYWwoL15kYXRhLVtcXC1cXHcuXFx1MDBCNy1cXHVGRkZGXS8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IEFSSUFfQVRUUiA9IHNlYWwoL15hcmlhLVtcXC1cXHddKyQvKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICBjb25zdCBJU19BTExPV0VEX1VSSSA9IHNlYWwoL14oPzooPzooPzpmfGh0KXRwcz98bWFpbHRvfHRlbHxjYWxsdG98c21zfGNpZHx4bXBwKTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcblxuICBjb25zdCBJU19TQ1JJUFRfT1JfREFUQSA9IHNlYWwoL14oPzpcXHcrc2NyaXB0fGRhdGEpOi9pKTtcbiAgY29uc3QgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuICApO1xuXG4gIGNvbnN0IERPQ1RZUEVfTkFNRSA9IHNlYWwoL15odG1sJC9pKTtcblxuICB2YXIgRVhQUkVTU0lPTlMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIE1VU1RBQ0hFX0VYUFI6IE1VU1RBQ0hFX0VYUFIsXG4gICAgRVJCX0VYUFI6IEVSQl9FWFBSLFxuICAgIFRNUExJVF9FWFBSOiBUTVBMSVRfRVhQUixcbiAgICBEQVRBX0FUVFI6IERBVEFfQVRUUixcbiAgICBBUklBX0FUVFI6IEFSSUFfQVRUUixcbiAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkksXG4gICAgSVNfU0NSSVBUX09SX0RBVEE6IElTX1NDUklQVF9PUl9EQVRBLFxuICAgIEFUVFJfV0hJVEVTUEFDRTogQVRUUl9XSElURVNQQUNFLFxuICAgIERPQ1RZUEVfTkFNRTogRE9DVFlQRV9OQU1FXG4gIH0pO1xuXG4gIGNvbnN0IGdldEdsb2JhbCA9IGZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93O1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbm8tb3AgcG9saWN5IGZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogRG9uJ3QgZXhwb3J0IHRoaXMgZnVuY3Rpb24gb3V0c2lkZSB0aGlzIG1vZHVsZSFcbiAgICogQHBhcmFtIHtUcnVzdGVkVHlwZVBvbGljeUZhY3Rvcnl9IHRydXN0ZWRUeXBlcyBUaGUgcG9saWN5IGZhY3RvcnkuXG4gICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHB1cmlmeUhvc3RFbGVtZW50IFRoZSBTY3JpcHQgZWxlbWVudCB1c2VkIHRvIGxvYWQgRE9NUHVyaWZ5ICh0byBkZXRlcm1pbmUgcG9saWN5IG5hbWUgc3VmZml4KS5cbiAgICogQHJldHVybiB7VHJ1c3RlZFR5cGVQb2xpY3l9IFRoZSBwb2xpY3kgY3JlYXRlZCAob3IgbnVsbCwgaWYgVHJ1c3RlZCBUeXBlc1xuICAgKiBhcmUgbm90IHN1cHBvcnRlZCBvciBjcmVhdGluZyB0aGUgcG9saWN5IGZhaWxlZCkuXG4gICAqL1xuICBjb25zdCBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5ID0gZnVuY3Rpb24gX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSh0cnVzdGVkVHlwZXMsIHB1cmlmeUhvc3RFbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0cnVzdGVkVHlwZXMgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB0aGUgY2FsbGVycyB0byBjb250cm9sIHRoZSB1bmlxdWUgcG9saWN5IG5hbWVcbiAgICAvLyBieSBhZGRpbmcgYSBkYXRhLXR0LXBvbGljeS1zdWZmaXggdG8gdGhlIHNjcmlwdCBlbGVtZW50IHdpdGggdGhlIERPTVB1cmlmeS5cbiAgICAvLyBQb2xpY3kgY3JlYXRpb24gd2l0aCBkdXBsaWNhdGUgbmFtZXMgdGhyb3dzIGluIFRydXN0ZWQgVHlwZXMuXG4gICAgbGV0IHN1ZmZpeCA9IG51bGw7XG4gICAgY29uc3QgQVRUUl9OQU1FID0gJ2RhdGEtdHQtcG9saWN5LXN1ZmZpeCc7XG4gICAgaWYgKHB1cmlmeUhvc3RFbGVtZW50ICYmIHB1cmlmeUhvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShBVFRSX05BTUUpKSB7XG4gICAgICBzdWZmaXggPSBwdXJpZnlIb3N0RWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUl9OQU1FKTtcbiAgICB9XG4gICAgY29uc3QgcG9saWN5TmFtZSA9ICdkb21wdXJpZnknICsgKHN1ZmZpeCA/ICcjJyArIHN1ZmZpeCA6ICcnKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kocG9saWN5TmFtZSwge1xuICAgICAgICBjcmVhdGVIVE1MKGh0bWwpIHtcbiAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlU2NyaXB0VVJMKHNjcmlwdFVybCkge1xuICAgICAgICAgIHJldHVybiBzY3JpcHRVcmw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIC8vIFBvbGljeSBjcmVhdGlvbiBmYWlsZWQgKG1vc3QgbGlrZWx5IGFub3RoZXIgRE9NUHVyaWZ5IHNjcmlwdCBoYXNcbiAgICAgIC8vIGFscmVhZHkgcnVuKS4gU2tpcCBjcmVhdGluZyB0aGUgcG9saWN5LCBhcyB0aGlzIHdpbGwgb25seSBjYXVzZSBlcnJvcnNcbiAgICAgIC8vIGlmIFRUIGFyZSBlbmZvcmNlZC5cbiAgICAgIGNvbnNvbGUud2FybignVHJ1c3RlZFR5cGVzIHBvbGljeSAnICsgcG9saWN5TmFtZSArICcgY291bGQgbm90IGJlIGNyZWF0ZWQuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGNyZWF0ZURPTVB1cmlmeSgpIHtcbiAgICBsZXQgd2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRHbG9iYWwoKTtcbiAgICBjb25zdCBET01QdXJpZnkgPSByb290ID0+IGNyZWF0ZURPTVB1cmlmeShyb290KTtcblxuICAgIC8qKlxuICAgICAqIFZlcnNpb24gbGFiZWwsIGV4cG9zZWQgZm9yIGVhc2llciBjaGVja3NcbiAgICAgKiBpZiBET01QdXJpZnkgaXMgdXAgdG8gZGF0ZSBvciBub3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkudmVyc2lvbiA9ICczLjAuOSc7XG5cbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBlbGVtZW50cyB0aGF0IERPTVB1cmlmeSByZW1vdmVkIGR1cmluZyBzYW5pdGF0aW9uLlxuICAgICAqIEVtcHR5IGlmIG5vdGhpbmcgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBET01QdXJpZnk7XG4gICAgfVxuICAgIGxldCB7XG4gICAgICBkb2N1bWVudFxuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3Qgb3JpZ2luYWxEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGN1cnJlbnRTY3JpcHQgPSBvcmlnaW5hbERvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG4gICAgY29uc3Qge1xuICAgICAgRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICBOb2RlLFxuICAgICAgRWxlbWVudCxcbiAgICAgIE5vZGVGaWx0ZXIsXG4gICAgICBOYW1lZE5vZGVNYXAgPSB3aW5kb3cuTmFtZWROb2RlTWFwIHx8IHdpbmRvdy5Nb3pOYW1lZEF0dHJNYXAsXG4gICAgICBIVE1MRm9ybUVsZW1lbnQsXG4gICAgICBET01QYXJzZXIsXG4gICAgICB0cnVzdGVkVHlwZXNcbiAgICB9ID0gd2luZG93O1xuICAgIGNvbnN0IEVsZW1lbnRQcm90b3R5cGUgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICBjb25zdCBjbG9uZU5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2Nsb25lTm9kZScpO1xuICAgIGNvbnN0IGdldE5leHRTaWJsaW5nID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICduZXh0U2libGluZycpO1xuICAgIGNvbnN0IGdldENoaWxkTm9kZXMgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2NoaWxkTm9kZXMnKTtcbiAgICBjb25zdCBnZXRQYXJlbnROb2RlID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdwYXJlbnROb2RlJyk7XG5cbiAgICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuICAgIGlmICh0eXBlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgdHJ1c3RlZFR5cGVzUG9saWN5O1xuICAgIGxldCBlbXB0eUhUTUwgPSAnJztcbiAgICBjb25zdCB7XG4gICAgICBpbXBsZW1lbnRhdGlvbixcbiAgICAgIGNyZWF0ZU5vZGVJdGVyYXRvcixcbiAgICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQsXG4gICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZVxuICAgIH0gPSBkb2N1bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBpbXBvcnROb2RlXG4gICAgfSA9IG9yaWdpbmFsRG9jdW1lbnQ7XG4gICAgbGV0IGhvb2tzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2Ugd2hldGhlciB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgcnVubmluZyB0aGUgZnVsbCBET01QdXJpZnkuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gdHlwZW9mIGVudHJpZXMgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGdldFBhcmVudE5vZGUgPT09ICdmdW5jdGlvbicgJiYgaW1wbGVtZW50YXRpb24gJiYgaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50ICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3Qge1xuICAgICAgTVVTVEFDSEVfRVhQUixcbiAgICAgIEVSQl9FWFBSLFxuICAgICAgVE1QTElUX0VYUFIsXG4gICAgICBEQVRBX0FUVFIsXG4gICAgICBBUklBX0FUVFIsXG4gICAgICBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICAgIEFUVFJfV0hJVEVTUEFDRVxuICAgIH0gPSBFWFBSRVNTSU9OUztcbiAgICBsZXQge1xuICAgICAgSVNfQUxMT1dFRF9VUkk6IElTX0FMTE9XRURfVVJJJDFcbiAgICB9ID0gRVhQUkVTU0lPTlM7XG5cbiAgICAvKipcbiAgICAgKiBXZSBjb25zaWRlciB0aGUgZWxlbWVudHMgYW5kIGF0dHJpYnV0ZXMgYmVsb3cgdG8gYmUgc2FmZS4gSWRlYWxseVxuICAgICAqIGRvbid0IGFkZCBhbnkgbmV3IG9uZXMgYnV0IGZlZWwgZnJlZSB0byByZW1vdmUgdW53YW50ZWQgb25lcy5cbiAgICAgKi9cblxuICAgIC8qIGFsbG93ZWQgZWxlbWVudCBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX1RBR1MgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5odG1sJDEsIC4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5tYXRoTWwkMSwgLi4udGV4dF0pO1xuXG4gICAgLyogQWxsb3dlZCBhdHRyaWJ1dGUgbmFtZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfQVRUUiA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCwgLi4uc3ZnLCAuLi5tYXRoTWwsIC4uLnhtbF0pO1xuXG4gICAgLypcbiAgICAgKiBDb25maWd1cmUgaG93IERPTVBVcmlmeSBzaG91bGQgaGFuZGxlIGN1c3RvbSBlbGVtZW50cyBhbmQgdGhlaXIgYXR0cmlidXRlcyBhcyB3ZWxsIGFzIGN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHMuXG4gICAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gdGFnTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBjdXN0b20gZWxlbWVudHMpXG4gICAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gYXR0cmlidXRlTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBhdHRyaWJ1dGVzIG5vdCBvbiB0aGUgYWxsb3cgbGlzdClcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyBhbGxvdyBjdXN0b20gZWxlbWVudHMgZGVyaXZlZCBmcm9tIGJ1aWx0LWlucyBpZiB0aGV5IHBhc3MgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLiBEZWZhdWx0OiBgZmFsc2VgLlxuICAgICAqL1xuICAgIGxldCBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IE9iamVjdC5zZWFsKGNyZWF0ZShudWxsLCB7XG4gICAgICB0YWdOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50czoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gdGFncyAob3ZlcnJpZGVzIEFMTE9XRURfVEFHUy9BRERfVEFHUykgKi9cbiAgICBsZXQgRk9SQklEX1RBR1MgPSBudWxsO1xuXG4gICAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gYXR0cmlidXRlcyAob3ZlcnJpZGVzIEFMTE9XRURfQVRUUi9BRERfQVRUUikgKi9cbiAgICBsZXQgRk9SQklEX0FUVFIgPSBudWxsO1xuXG4gICAgLyogRGVjaWRlIGlmIEFSSUEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19BUklBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIGN1c3RvbSBkYXRhIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfREFUQV9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIERlY2lkZSBpZiB1bmtub3duIHByb3RvY29scyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIHNlbGYtY2xvc2luZyB0YWdzIGluIGF0dHJpYnV0ZXMgYXJlIGFsbG93ZWQuXG4gICAgICogVXN1YWxseSByZW1vdmVkIGR1ZSB0byBhIG1YU1MgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuICAgIGxldCBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBzYWZlIGZvciBjb21tb24gdGVtcGxhdGUgZW5naW5lcy5cbiAgICAgKiBUaGlzIG1lYW5zLCBET01QdXJpZnkgcmVtb3ZlcyBkYXRhIGF0dHJpYnV0ZXMsIG11c3RhY2hlcyBhbmQgRVJCXG4gICAgICovXG4gICAgbGV0IFNBRkVfRk9SX1RFTVBMQVRFUyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGRvY3VtZW50IHdpdGggPGh0bWw+Li4uIHNob3VsZCBiZSByZXR1cm5lZCAqL1xuICAgIGxldCBXSE9MRV9ET0NVTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJhY2sgd2hldGhlciBjb25maWcgaXMgYWxyZWFkeSBzZXQgb24gdGhpcyBpbnN0YW5jZSBvZiBET01QdXJpZnkuICovXG4gICAgbGV0IFNFVF9DT05GSUcgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhbGwgZWxlbWVudHMgKGUuZy4gc3R5bGUsIHNjcmlwdCkgbXVzdCBiZSBjaGlsZHJlbiBvZlxuICAgICAqIGRvY3VtZW50LmJvZHkuIEJ5IGRlZmF1bHQsIGJyb3dzZXJzIG1pZ2h0IG1vdmUgdGhlbSB0byBkb2N1bWVudC5oZWFkICovXG4gICAgbGV0IEZPUkNFX0JPRFkgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgSFRNTEJvZHlFbGVtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXG4gICAgICogc3RyaW5nIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpLlxuICAgICAqIElmIGBXSE9MRV9ET0NVTUVOVGAgaXMgZW5hYmxlZCBhIGBIVE1MSHRtbEVsZW1lbnRgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZFxuICAgICAqL1xuICAgIGxldCBSRVRVUk5fRE9NID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYERvY3VtZW50RnJhZ21lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpICovXG4gICAgbGV0IFJFVFVSTl9ET01fRlJBR01FTlQgPSBmYWxzZTtcblxuICAgIC8qIFRyeSB0byByZXR1cm4gYSBUcnVzdGVkIFR5cGUgb2JqZWN0IGluc3RlYWQgb2YgYSBzdHJpbmcsIHJldHVybiBhIHN0cmluZyBpblxuICAgICAqIGNhc2UgVHJ1c3RlZCBUeXBlcyBhcmUgbm90IHN1cHBvcnRlZCAgKi9cbiAgICBsZXQgUkVUVVJOX1RSVVNURURfVFlQRSA9IGZhbHNlO1xuXG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBmcmVlIGZyb20gRE9NIGNsb2JiZXJpbmcgYXR0YWNrcz9cbiAgICAgKiBUaGlzIHNhbml0aXplcyBtYXJrdXBzIG5hbWVkIHdpdGggY29sbGlkaW5nLCBjbG9iYmVyYWJsZSBidWlsdC1pbiBET00gQVBJcy5cbiAgICAgKi9cbiAgICBsZXQgU0FOSVRJWkVfRE9NID0gdHJ1ZTtcblxuICAgIC8qIEFjaGlldmUgZnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIGJ5IGlzb2xhdGluZyB0aGUgbmFtZXNwYWNlIG9mIG5hbWVkXG4gICAgICogcHJvcGVydGllcyBhbmQgSlMgdmFyaWFibGVzLCBtaXRpZ2F0aW5nIGF0dGFja3MgdGhhdCBhYnVzZSB0aGUgSFRNTC9ET00gc3BlYyBydWxlcy5cbiAgICAgKlxuICAgICAqIEhUTUwvRE9NIHNwZWMgcnVsZXMgdGhhdCBlbmFibGUgRE9NIENsb2JiZXJpbmc6XG4gICAgICogICAtIE5hbWVkIEFjY2VzcyBvbiBXaW5kb3cgKMKnNy4zLjMpXG4gICAgICogICAtIERPTSBUcmVlIEFjY2Vzc29ycyAowqczLjEuNSlcbiAgICAgKiAgIC0gRm9ybSBFbGVtZW50IFBhcmVudC1DaGlsZCBSZWxhdGlvbnMgKMKnNC4xMC4zKVxuICAgICAqICAgLSBJZnJhbWUgc3JjZG9jIC8gTmVzdGVkIFdpbmRvd1Byb3hpZXMgKMKnNC44LjUpXG4gICAgICogICAtIEhUTUxDb2xsZWN0aW9uICjCpzQuMi4xMC4yKVxuICAgICAqXG4gICAgICogTmFtZXNwYWNlIGlzb2xhdGlvbiBpcyBpbXBsZW1lbnRlZCBieSBwcmVmaXhpbmcgYGlkYCBhbmQgYG5hbWVgIGF0dHJpYnV0ZXNcbiAgICAgKiB3aXRoIGEgY29uc3RhbnQgc3RyaW5nLCBpLmUuLCBgdXNlci1jb250ZW50LWBcbiAgICAgKi9cbiAgICBsZXQgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBmYWxzZTtcbiAgICBjb25zdCBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggPSAndXNlci1jb250ZW50LSc7XG5cbiAgICAvKiBLZWVwIGVsZW1lbnQgY29udGVudCB3aGVuIHJlbW92aW5nIGVsZW1lbnQ/ICovXG4gICAgbGV0IEtFRVBfQ09OVEVOVCA9IHRydWU7XG5cbiAgICAvKiBJZiBhIGBOb2RlYCBpcyBwYXNzZWQgdG8gc2FuaXRpemUoKSwgdGhlbiBwZXJmb3JtcyBzYW5pdGl6YXRpb24gaW4tcGxhY2UgaW5zdGVhZFxuICAgICAqIG9mIGltcG9ydGluZyBpdCBpbnRvIGEgbmV3IERvY3VtZW50IGFuZCByZXR1cm5pbmcgYSBzYW5pdGl6ZWQgY29weSAqL1xuICAgIGxldCBJTl9QTEFDRSA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3cgdXNhZ2Ugb2YgcHJvZmlsZXMgbGlrZSBodG1sLCBzdmcgYW5kIG1hdGhNbCAqL1xuICAgIGxldCBVU0VfUFJPRklMRVMgPSB7fTtcblxuICAgIC8qIFRhZ3MgdG8gaWdub3JlIGNvbnRlbnQgb2Ygd2hlbiBLRUVQX0NPTlRFTlQgaXMgdHJ1ZSAqL1xuICAgIGxldCBGT1JCSURfQ09OVEVOVFMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTID0gYWRkVG9TZXQoe30sIFsnYW5ub3RhdGlvbi14bWwnLCAnYXVkaW8nLCAnY29sZ3JvdXAnLCAnZGVzYycsICdmb3JlaWdub2JqZWN0JywgJ2hlYWQnLCAnaWZyYW1lJywgJ21hdGgnLCAnbWknLCAnbW4nLCAnbW8nLCAnbXMnLCAnbXRleHQnLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdub3NjcmlwdCcsICdwbGFpbnRleHQnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3N2ZycsICd0ZW1wbGF0ZScsICd0aGVhZCcsICd0aXRsZScsICd2aWRlbycsICd4bXAnXSk7XG5cbiAgICAvKiBUYWdzIHRoYXQgYXJlIHNhZmUgZm9yIGRhdGE6IFVSSXMgKi9cbiAgICBsZXQgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9EQVRBX1VSSV9UQUdTID0gYWRkVG9TZXQoe30sIFsnYXVkaW8nLCAndmlkZW8nLCAnaW1nJywgJ3NvdXJjZScsICdpbWFnZScsICd0cmFjayddKTtcblxuICAgIC8qIEF0dHJpYnV0ZXMgc2FmZSBmb3IgdmFsdWVzIGxpa2UgXCJqYXZhc2NyaXB0OlwiICovXG4gICAgbGV0IFVSSV9TQUZFX0FUVFJJQlVURVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyA9IGFkZFRvU2V0KHt9LCBbJ2FsdCcsICdjbGFzcycsICdmb3InLCAnaWQnLCAnbGFiZWwnLCAnbmFtZScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3JvbGUnLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcbiAgICBjb25zdCBNQVRITUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnO1xuICAgIGNvbnN0IFNWR19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGNvbnN0IEhUTUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuICAgIC8qIERvY3VtZW50IG5hbWVzcGFjZSAqL1xuICAgIGxldCBOQU1FU1BBQ0UgPSBIVE1MX05BTUVTUEFDRTtcbiAgICBsZXQgSVNfRU1QVFlfSU5QVVQgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93ZWQgWEhUTUwrWE1MIG5hbWVzcGFjZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9OQU1FU1BBQ0VTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUyA9IGFkZFRvU2V0KHt9LCBbTUFUSE1MX05BTUVTUEFDRSwgU1ZHX05BTUVTUEFDRSwgSFRNTF9OQU1FU1BBQ0VdLCBzdHJpbmdUb1N0cmluZyk7XG5cbiAgICAvKiBQYXJzaW5nIG9mIHN0cmljdCBYSFRNTCBkb2N1bWVudHMgKi9cbiAgICBsZXQgUEFSU0VSX01FRElBX1RZUEUgPSBudWxsO1xuICAgIGNvbnN0IFNVUFBPUlRFRF9QQVJTRVJfTUVESUFfVFlQRVMgPSBbJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsICd0ZXh0L2h0bWwnXTtcbiAgICBjb25zdCBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFID0gJ3RleHQvaHRtbCc7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gbnVsbDtcblxuICAgIC8qIEtlZXAgYSByZWZlcmVuY2UgdG8gY29uZmlnIHRvIHBhc3MgdG8gaG9va3MgKi9cbiAgICBsZXQgQ09ORklHID0gbnVsbDtcblxuICAgIC8qIElkZWFsbHksIGRvIG5vdCB0b3VjaCBhbnl0aGluZyBiZWxvdyB0aGlzIGxpbmUgKi9cbiAgICAvKiBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fICovXG5cbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCBpc1JlZ2V4T3JGdW5jdGlvbiA9IGZ1bmN0aW9uIGlzUmVnZXhPckZ1bmN0aW9uKHRlc3RWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRlc3RWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3BhcnNlQ29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNmZyBvcHRpb25hbCBjb25maWcgbGl0ZXJhbFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgY29uc3QgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBpZiAoQ09ORklHICYmIENPTkZJRyA9PT0gY2ZnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gdGFtcGVyaW5nICovXG4gICAgICBpZiAoIWNmZyB8fCB0eXBlb2YgY2ZnICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjZmcgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gcHJvdG90eXBlIHBvbGx1dGlvbiAqL1xuICAgICAgY2ZnID0gY2xvbmUoY2ZnKTtcbiAgICAgIFBBUlNFUl9NRURJQV9UWVBFID1cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICAgICAgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUy5pbmRleE9mKGNmZy5QQVJTRVJfTUVESUFfVFlQRSkgPT09IC0xID8gREVGQVVMVF9QQVJTRVJfTUVESUFfVFlQRSA6IGNmZy5QQVJTRVJfTUVESUFfVFlQRTtcblxuICAgICAgLy8gSFRNTCB0YWdzIGFuZCBhdHRyaWJ1dGVzIGFyZSBub3QgY2FzZS1zZW5zaXRpdmUsIGNvbnZlcnRpbmcgdG8gbG93ZXJjYXNlLiBLZWVwaW5nIFhIVE1MIGFzIGlzLlxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgPyBzdHJpbmdUb1N0cmluZyA6IHN0cmluZ1RvTG93ZXJDYXNlO1xuXG4gICAgICAvKiBTZXQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgICBBTExPV0VEX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0FMTE9XRURfVEFHUztcbiAgICAgIEFMTE9XRURfQVRUUiA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9BVFRSO1xuICAgICAgQUxMT1dFRF9OQU1FU1BBQ0VTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9OQU1FU1BBQ0VTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfTkFNRVNQQUNFUywgc3RyaW5nVG9TdHJpbmcpIDogREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVM7XG4gICAgICBVUklfU0FGRV9BVFRSSUJVVEVTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUREX1VSSV9TQUZFX0FUVFInKSA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyksXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgY2ZnLkFERF9VUklfU0FGRV9BVFRSLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICA6IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUztcbiAgICAgIERBVEFfVVJJX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfREFUQV9VUklfVEFHUycpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9EQVRBX1VSSV9UQUdTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX0RBVEFfVVJJX1RBR1MsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9EQVRBX1VSSV9UQUdTO1xuICAgICAgRk9SQklEX0NPTlRFTlRTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0NPTlRFTlRTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9DT05URU5UUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9GT1JCSURfQ09OVEVOVFM7XG4gICAgICBGT1JCSURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9UQUdTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiB7fTtcbiAgICAgIEZPUkJJRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0FUVFInKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgVVNFX1BST0ZJTEVTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnVVNFX1BST0ZJTEVTJykgPyBjZmcuVVNFX1BST0ZJTEVTIDogZmFsc2U7XG4gICAgICBBTExPV19BUklBX0FUVFIgPSBjZmcuQUxMT1dfQVJJQV9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBBTExPV19EQVRBX0FUVFIgPSBjZmcuQUxMT1dfREFUQV9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGNmZy5BTExPV19VTktOT1dOX1BST1RPQ09MUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSID0gY2ZnLkFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgU0FGRV9GT1JfVEVNUExBVEVTID0gY2ZnLlNBRkVfRk9SX1RFTVBMQVRFUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgV0hPTEVfRE9DVU1FTlQgPSBjZmcuV0hPTEVfRE9DVU1FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET00gPSBjZmcuUkVUVVJOX0RPTSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGNmZy5SRVRVUk5fRE9NX0ZSQUdNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fVFJVU1RFRF9UWVBFID0gY2ZnLlJFVFVSTl9UUlVTVEVEX1RZUEUgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEZPUkNFX0JPRFkgPSBjZmcuRk9SQ0VfQk9EWSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgU0FOSVRJWkVfRE9NID0gY2ZnLlNBTklUSVpFX0RPTSAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBjZmcuU0FOSVRJWkVfTkFNRURfUFJPUFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEtFRVBfQ09OVEVOVCA9IGNmZy5LRUVQX0NPTlRFTlQgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIElOX1BMQUNFID0gY2ZnLklOX1BMQUNFIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBJU19BTExPV0VEX1VSSSQxID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBJU19BTExPV0VEX1VSSTtcbiAgICAgIE5BTUVTUEFDRSA9IGNmZy5OQU1FU1BBQ0UgfHwgSFRNTF9OQU1FU1BBQ0U7XG4gICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyB8fCB7fTtcbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaykpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaztcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaykpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaztcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgdHlwZW9mIGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPT09ICdib29sZWFuJykge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzO1xuICAgICAgfVxuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBBTExPV19EQVRBX0FUVFIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgIFJFVFVSTl9ET00gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICAgIGlmIChVU0VfUFJPRklMRVMpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIHRleHQpO1xuICAgICAgICBBTExPV0VEX0FUVFIgPSBbXTtcbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmcgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2ZyQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnRmlsdGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnRmlsdGVycyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBzdmcpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLm1hdGhNbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogTWVyZ2UgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgICBpZiAoY2ZnLkFERF9UQUdTKSB7XG4gICAgICAgIGlmIChBTExPV0VEX1RBR1MgPT09IERFRkFVTFRfQUxMT1dFRF9UQUdTKSB7XG4gICAgICAgICAgQUxMT1dFRF9UQUdTID0gY2xvbmUoQUxMT1dFRF9UQUdTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGNmZy5BRERfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfQVRUUikge1xuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSID09PSBERUZBVUxUX0FMTE9XRURfQVRUUikge1xuICAgICAgICAgIEFMTE9XRURfQVRUUiA9IGNsb25lKEFMTE9XRURfQVRUUik7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBjZmcuQUREX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQUREX1VSSV9TQUZFX0FUVFIpIHtcbiAgICAgICAgYWRkVG9TZXQoVVJJX1NBRkVfQVRUUklCVVRFUywgY2ZnLkFERF9VUklfU0FGRV9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkZPUkJJRF9DT05URU5UUykge1xuICAgICAgICBpZiAoRk9SQklEX0NPTlRFTlRTID09PSBERUZBVUxUX0ZPUkJJRF9DT05URU5UUykge1xuICAgICAgICAgIEZPUkJJRF9DT05URU5UUyA9IGNsb25lKEZPUkJJRF9DT05URU5UUyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoRk9SQklEX0NPTlRFTlRTLCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCAjdGV4dCBpbiBjYXNlIEtFRVBfQ09OVEVOVCBpcyBzZXQgdG8gdHJ1ZSAqL1xuICAgICAgaWYgKEtFRVBfQ09OVEVOVCkge1xuICAgICAgICBBTExPV0VEX1RBR1NbJyN0ZXh0J10gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgaHRtbCwgaGVhZCBhbmQgYm9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSBXSE9MRV9ET0NVTUVOVCBpcyB0cnVlICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ2h0bWwnLCAnaGVhZCcsICdib2R5J10pO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgdGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgdGFibGVzIGFyZSBwZXJtaXR0ZWQsIHNlZSAjMjg2LCAjMzY1ICovXG4gICAgICBpZiAoQUxMT1dFRF9UQUdTLnRhYmxlKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWyd0Ym9keSddKTtcbiAgICAgICAgZGVsZXRlIEZPUkJJRF9UQUdTLnRib2R5O1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWSkge1xuICAgICAgICBpZiAodHlwZW9mIGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWS5jcmVhdGVIVE1MICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZUhUTUxcIiBob29rLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZVNjcmlwdFVSTCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnVFJVU1RFRF9UWVBFU19QT0xJQ1kgY29uZmlndXJhdGlvbiBvcHRpb24gbXVzdCBwcm92aWRlIGEgXCJjcmVhdGVTY3JpcHRVUkxcIiBob29rLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3ZlcndyaXRlIGV4aXN0aW5nIFRydXN0ZWRUeXBlcyBwb2xpY3kuXG4gICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWTtcblxuICAgICAgICAvLyBTaWduIGxvY2FsIHZhcmlhYmxlcyByZXF1aXJlZCBieSBgc2FuaXRpemVgLlxuICAgICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVbmluaXRpYWxpemVkIHBvbGljeSwgYXR0ZW1wdCB0byBpbml0aWFsaXplIHRoZSBpbnRlcm5hbCBkb21wdXJpZnkgcG9saWN5LlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgY3VycmVudFNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjcmVhdGluZyB0aGUgaW50ZXJuYWwgcG9saWN5IHN1Y2NlZWRlZCBzaWduIGludGVybmFsIHZhcmlhYmxlcy5cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAhPT0gbnVsbCAmJiB0eXBlb2YgZW1wdHlIVE1MID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IGZ1cnRoZXIgbWFuaXB1bGF0aW9uIG9mIGNvbmZpZ3VyYXRpb24uXG4gICAgICAvLyBOb3QgYXZhaWxhYmxlIGluIElFOCwgU2FmYXJpIDUsIGV0Yy5cbiAgICAgIGlmIChmcmVlemUpIHtcbiAgICAgICAgZnJlZXplKGNmZyk7XG4gICAgICB9XG4gICAgICBDT05GSUcgPSBjZmc7XG4gICAgfTtcbiAgICBjb25zdCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydtaScsICdtbycsICdtbicsICdtcycsICdtdGV4dCddKTtcbiAgICBjb25zdCBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ2ZvcmVpZ25vYmplY3QnLCAnZGVzYycsICd0aXRsZScsICdhbm5vdGF0aW9uLXhtbCddKTtcblxuICAgIC8vIENlcnRhaW4gZWxlbWVudHMgYXJlIGFsbG93ZWQgaW4gYm90aCBTVkcgYW5kIEhUTUxcbiAgICAvLyBuYW1lc3BhY2UuIFdlIG5lZWQgdG8gc3BlY2lmeSB0aGVtIGV4cGxpY2l0bHlcbiAgICAvLyBzbyB0aGF0IHRoZXkgZG9uJ3QgZ2V0IGVycm9uZW91c2x5IGRlbGV0ZWQgZnJvbVxuICAgIC8vIEhUTUwgbmFtZXNwYWNlLlxuICAgIGNvbnN0IENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFMgPSBhZGRUb1NldCh7fSwgWyd0aXRsZScsICdzdHlsZScsICdmb250JywgJ2EnLCAnc2NyaXB0J10pO1xuXG4gICAgLyogS2VlcCB0cmFjayBvZiBhbGwgcG9zc2libGUgU1ZHIGFuZCBNYXRoTUwgdGFnc1xuICAgICAqIHNvIHRoYXQgd2UgY2FuIHBlcmZvcm0gdGhlIG5hbWVzcGFjZSBjaGVja3NcbiAgICAgKiBjb3JyZWN0bHkuICovXG4gICAgY29uc3QgQUxMX1NWR19UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5zdmckMSwgLi4uc3ZnRmlsdGVycywgLi4uc3ZnRGlzYWxsb3dlZF0pO1xuICAgIGNvbnN0IEFMTF9NQVRITUxfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4ubWF0aE1sJDEsIC4uLm1hdGhNbERpc2FsbG93ZWRdKTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgYSBET00gZWxlbWVudCB3aG9zZSBuYW1lc3BhY2UgaXMgYmVpbmcgY2hlY2tlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm4gZmFsc2UgaWYgdGhlIGVsZW1lbnQgaGFzIGFcbiAgICAgKiAgbmFtZXNwYWNlIHRoYXQgYSBzcGVjLWNvbXBsaWFudCBwYXJzZXIgd291bGQgbmV2ZXJcbiAgICAgKiAgcmV0dXJuLiBSZXR1cm4gdHJ1ZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgY29uc3QgX2NoZWNrVmFsaWROYW1lc3BhY2UgPSBmdW5jdGlvbiBfY2hlY2tWYWxpZE5hbWVzcGFjZShlbGVtZW50KSB7XG4gICAgICBsZXQgcGFyZW50ID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcblxuICAgICAgLy8gSW4gSlNET00sIGlmIHdlJ3JlIGluc2lkZSBzaGFkb3cgRE9NLCB0aGVuIHBhcmVudE5vZGVcbiAgICAgIC8vIGNhbiBiZSBudWxsLiBXZSBqdXN0IHNpbXVsYXRlIHBhcmVudCBpbiB0aGlzIGNhc2UuXG4gICAgICBpZiAoIXBhcmVudCB8fCAhcGFyZW50LnRhZ05hbWUpIHtcbiAgICAgICAgcGFyZW50ID0ge1xuICAgICAgICAgIG5hbWVzcGFjZVVSSTogTkFNRVNQQUNFLFxuICAgICAgICAgIHRhZ05hbWU6ICd0ZW1wbGF0ZSdcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShlbGVtZW50LnRhZ05hbWUpO1xuICAgICAgY29uc3QgcGFyZW50VGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKHBhcmVudC50YWdOYW1lKTtcbiAgICAgIGlmICghQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIFNWR1xuICAgICAgICAvLyBpcyB2aWEgPHN2Zz4uIElmIGl0IGhhcHBlbnMgdmlhIGFueSBvdGhlciB0YWcsIHRoZW5cbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGtpbGxlZC5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIE1hdGhNTCB0byBTVkcgaXMgdmlhYFxuICAgICAgICAvLyBzdmcgaWYgcGFyZW50IGlzIGVpdGhlciA8YW5ub3RhdGlvbi14bWw+IG9yIE1hdGhNTFxuICAgICAgICAvLyB0ZXh0IGludGVncmF0aW9uIHBvaW50cy5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2ZycgJiYgKHBhcmVudFRhZ05hbWUgPT09ICdhbm5vdGF0aW9uLXhtbCcgfHwgTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBTVkdcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBTVkcgbmFtZXNwYWNlLlxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBIVE1MIG5hbWVzcGFjZSB0byBNYXRoTUxcbiAgICAgICAgLy8gaXMgdmlhIDxtYXRoPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBNYXRoTUwgaXMgdmlhXG4gICAgICAgIC8vIDxtYXRoPiBhbmQgSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnICYmIEhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIE1hdGhNTFxuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIE1hdGhNTCBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9NQVRITUxfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gSFRNTCBpcyB2aWFcbiAgICAgICAgLy8gSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHMsIGFuZCBmcm9tIE1hdGhNTCB0byBIVE1MXG4gICAgICAgIC8vIGlzIHZpYSBNYXRoTUwgdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UgJiYgIUhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFICYmICFNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBkaXNhbGxvdyB0YWdzIHRoYXQgYXJlIHNwZWNpZmljIGZvciBNYXRoTUxcbiAgICAgICAgLy8gb3IgU1ZHIGFuZCBzaG91bGQgbmV2ZXIgYXBwZWFyIGluIEhUTUwgbmFtZXNwYWNlXG4gICAgICAgIHJldHVybiAhQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdICYmIChDT01NT05fU1ZHX0FORF9IVE1MX0VMRU1FTlRTW3RhZ05hbWVdIHx8ICFBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBGb3IgWEhUTUwgYW5kIFhNTCBkb2N1bWVudHMgdGhhdCBzdXBwb3J0IGN1c3RvbSBuYW1lc3BhY2VzXG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIEFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb2RlIHNob3VsZCBuZXZlciByZWFjaCB0aGlzIHBsYWNlICh0aGlzIG1lYW5zXG4gICAgICAvLyB0aGF0IHRoZSBlbGVtZW50IHNvbWVob3cgZ290IG5hbWVzcGFjZSB0aGF0IGlzIG5vdFxuICAgICAgLy8gSFRNTCwgU1ZHLCBNYXRoTUwgb3IgYWxsb3dlZCB2aWEgQUxMT1dFRF9OQU1FU1BBQ0VTKS5cbiAgICAgIC8vIFJldHVybiBmYWxzZSBqdXN0IGluIGNhc2UuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9mb3JjZVJlbW92ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2ZvcmNlUmVtb3ZlID0gZnVuY3Rpb24gX2ZvcmNlUmVtb3ZlKG5vZGUpIHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICBlbGVtZW50OiBub2RlXG4gICAgICB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1yZW1vdmVcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcmVtb3ZlQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgYW4gQXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfcmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBub2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG51bGwsXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXG4gICAgICAvLyBXZSB2b2lkIGF0dHJpYnV0ZSB2YWx1ZXMgZm9yIHVucmVtb3ZhYmxlIFwiaXNcIlwiIGF0dHJpYnV0ZXNcbiAgICAgIGlmIChuYW1lID09PSAnaXMnICYmICFBTExPV0VEX0FUVFJbbmFtZV0pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET00gfHwgUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBfZm9yY2VSZW1vdmUobm9kZSk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2luaXREb2N1bWVudFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBkaXJ0eSBhIHN0cmluZyBvZiBkaXJ0eSBtYXJrdXBcbiAgICAgKiBAcmV0dXJuIHtEb2N1bWVudH0gYSBET00sIGZpbGxlZCB3aXRoIHRoZSBkaXJ0eSBtYXJrdXBcbiAgICAgKi9cbiAgICBjb25zdCBfaW5pdERvY3VtZW50ID0gZnVuY3Rpb24gX2luaXREb2N1bWVudChkaXJ0eSkge1xuICAgICAgLyogQ3JlYXRlIGEgSFRNTCBkb2N1bWVudCAqL1xuICAgICAgbGV0IGRvYyA9IG51bGw7XG4gICAgICBsZXQgbGVhZGluZ1doaXRlc3BhY2UgPSBudWxsO1xuICAgICAgaWYgKEZPUkNFX0JPRFkpIHtcbiAgICAgICAgZGlydHkgPSAnPHJlbW92ZT48L3JlbW92ZT4nICsgZGlydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBJZiBGT1JDRV9CT0RZIGlzbid0IHVzZWQsIGxlYWRpbmcgd2hpdGVzcGFjZSBuZWVkcyB0byBiZSBwcmVzZXJ2ZWQgbWFudWFsbHkgKi9cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHN0cmluZ01hdGNoKGRpcnR5LCAvXltcXHJcXG5cXHQgXSsvKTtcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2UgPSBtYXRjaGVzICYmIG1hdGNoZXNbMF07XG4gICAgICB9XG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gUm9vdCBvZiBYSFRNTCBkb2MgbXVzdCBjb250YWluIHhtbG5zIGRlY2xhcmF0aW9uIChzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3hodG1sMS9ub3JtYXRpdmUuaHRtbCNzdHJpY3QpXG4gICAgICAgIGRpcnR5ID0gJzxodG1sIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPjxoZWFkPjwvaGVhZD48Ym9keT4nICsgZGlydHkgKyAnPC9ib2R5PjwvaHRtbD4nO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlydHlQYXlsb2FkID0gdHJ1c3RlZFR5cGVzUG9saWN5ID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XG4gICAgICAvKlxuICAgICAgICogVXNlIHRoZSBET01QYXJzZXIgQVBJIGJ5IGRlZmF1bHQsIGZhbGxiYWNrIGxhdGVyIGlmIG5lZWRzIGJlXG4gICAgICAgKiBET01QYXJzZXIgbm90IHdvcmsgZm9yIHN2ZyB3aGVuIGhhcyBtdWx0aXBsZSByb290IGVsZW1lbnQuXG4gICAgICAgKi9cbiAgICAgIGlmIChOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkaXJ0eVBheWxvYWQsIFBBUlNFUl9NRURJQV9UWVBFKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH1cblxuICAgICAgLyogVXNlIGNyZWF0ZUhUTUxEb2N1bWVudCBpbiBjYXNlIERPTVBhcnNlciBpcyBub3QgYXZhaWxhYmxlICovXG4gICAgICBpZiAoIWRvYyB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBkb2MgPSBpbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudChOQU1FU1BBQ0UsICd0ZW1wbGF0ZScsIG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gSVNfRU1QVFlfSU5QVVQgPyBlbXB0eUhUTUwgOiBkaXJ0eVBheWxvYWQ7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAvLyBTeW50YXggZXJyb3IgaWYgZGlydHlQYXlsb2FkIGlzIGludmFsaWQgeG1sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGJvZHkgPSBkb2MuYm9keSB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgaWYgKGRpcnR5ICYmIGxlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGJvZHkuaW5zZXJ0QmVmb3JlKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxlYWRpbmdXaGl0ZXNwYWNlKSwgYm9keS5jaGlsZE5vZGVzWzBdIHx8IG51bGwpO1xuICAgICAgfVxuXG4gICAgICAvKiBXb3JrIG9uIHdob2xlIGRvY3VtZW50IG9yIGp1c3QgaXRzIGJvZHkgKi9cbiAgICAgIGlmIChOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5VGFnTmFtZS5jYWxsKGRvYywgV0hPTEVfRE9DVU1FTlQgPyAnaHRtbCcgOiAnYm9keScpWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFdIT0xFX0RPQ1VNRU5UID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGJvZHk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBOb2RlSXRlcmF0b3Igb2JqZWN0IHRoYXQgeW91IGNhbiB1c2UgdG8gdHJhdmVyc2UgZmlsdGVyZWQgbGlzdHMgb2Ygbm9kZXMgb3IgZWxlbWVudHMgaW4gYSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IHJvb3QgVGhlIHJvb3QgZWxlbWVudCBvciBub2RlIHRvIHN0YXJ0IHRyYXZlcnNpbmcgb24uXG4gICAgICogQHJldHVybiB7Tm9kZUl0ZXJhdG9yfSBUaGUgY3JlYXRlZCBOb2RlSXRlcmF0b3JcbiAgICAgKi9cbiAgICBjb25zdCBfY3JlYXRlTm9kZUl0ZXJhdG9yID0gZnVuY3Rpb24gX2NyZWF0ZU5vZGVJdGVyYXRvcihyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm9kZUl0ZXJhdG9yLmNhbGwocm9vdC5vd25lckRvY3VtZW50IHx8IHJvb3QsIHJvb3QsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19URVhULCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQ2xvYmJlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBlbG0gZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBjbG9iYmVyZWQsIGZhbHNlIGlmIHNhZmVcbiAgICAgKi9cbiAgICBjb25zdCBfaXNDbG9iYmVyZWQgPSBmdW5jdGlvbiBfaXNDbG9iYmVyZWQoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50ICYmICh0eXBlb2YgZWxtLm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnJlbW92ZUNoaWxkICE9PSAnZnVuY3Rpb24nIHx8ICEoZWxtLmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uc2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0ubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLmluc2VydEJlZm9yZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLmhhc0NoaWxkTm9kZXMgIT09ICdmdW5jdGlvbicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGEgRE9NIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBvYmplY3Qgb2JqZWN0IHRvIGNoZWNrIHdoZXRoZXIgaXQncyBhIERPTSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpcyBvYmplY3QgaXMgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc05vZGUgPSBmdW5jdGlvbiBfaXNOb2RlKG9iamVjdCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBOb2RlID09PSAnZnVuY3Rpb24nICYmIG9iamVjdCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9leGVjdXRlSG9va1xuICAgICAqIEV4ZWN1dGUgdXNlciBjb25maWd1cmFibGUgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCAgTmFtZSBvZiB0aGUgaG9vaydzIGVudHJ5IHBvaW50XG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgbm9kZSB0byB3b3JrIG9uIHdpdGggdGhlIGhvb2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgYWRkaXRpb25hbCBob29rIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBjb25zdCBfZXhlY3V0ZUhvb2sgPSBmdW5jdGlvbiBfZXhlY3V0ZUhvb2soZW50cnlQb2ludCwgY3VycmVudE5vZGUsIGRhdGEpIHtcbiAgICAgIGlmICghaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBob29rID0+IHtcbiAgICAgICAgaG9vay5jYWxsKERPTVB1cmlmeSwgY3VycmVudE5vZGUsIGRhdGEsIENPTkZJRyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplRWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgdGV4dENvbnRlbnRcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVDaGlsZFxuICAgICAqXG4gICAgICogQHBhcmFtICAge05vZGV9IGN1cnJlbnROb2RlIHRvIGNoZWNrIGZvciBwZXJtaXNzaW9uIHRvIGV4aXN0XG4gICAgICogQHJldHVybiAge0Jvb2xlYW59IHRydWUgaWYgbm9kZSB3YXMga2lsbGVkLCBmYWxzZSBpZiBsZWZ0IGFsaXZlXG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplRWxlbWVudHMgPSBmdW5jdGlvbiBfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkge1xuICAgICAgbGV0IGNvbnRlbnQgPSBudWxsO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG5cbiAgICAgIC8qIENoZWNrIGlmIGVsZW1lbnQgaXMgY2xvYmJlcmVkIG9yIGNhbiBjbG9iYmVyICovXG4gICAgICBpZiAoX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogTm93IGxldCdzIGNoZWNrIHRoZSBlbGVtZW50J3MgdHlwZSBhbmQgbmFtZSAqL1xuICAgICAgY29uc3QgdGFnTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGN1cnJlbnROb2RlLm5vZGVOYW1lKTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVFbGVtZW50JywgY3VycmVudE5vZGUsIHtcbiAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgYWxsb3dlZFRhZ3M6IEFMTE9XRURfVEFHU1xuICAgICAgfSk7XG5cbiAgICAgIC8qIERldGVjdCBtWFNTIGF0dGVtcHRzIGFidXNpbmcgbmFtZXNwYWNlIGNvbmZ1c2lvbiAqL1xuICAgICAgaWYgKGN1cnJlbnROb2RlLmhhc0NoaWxkTm9kZXMoKSAmJiAhX2lzTm9kZShjdXJyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpICYmIHJlZ0V4cFRlc3QoLzxbL1xcd10vZywgY3VycmVudE5vZGUudGV4dENvbnRlbnQpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhIGN1c3RvbSBlbGVtZW50IHRvIGhhbmRsZSAqL1xuICAgICAgICBpZiAoIUZPUkJJRF9UQUdTW3RhZ05hbWVdICYmIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSkge1xuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHRhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBLZWVwIGNvbnRlbnQgZXhjZXB0IGZvciBiYWQtbGlzdGVkIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChLRUVQX0NPTlRFTlQgJiYgIUZPUkJJRF9DT05URU5UU1t0YWdOYW1lXSkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGN1cnJlbnROb2RlKSB8fCBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBnZXRDaGlsZE5vZGVzKGN1cnJlbnROb2RlKSB8fCBjdXJyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICAgIGlmIChjaGlsZE5vZGVzICYmIHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ291bnQgPSBjaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaGlsZENvdW50IC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVOb2RlKGNoaWxkTm9kZXNbaV0sIHRydWUpLCBnZXROZXh0U2libGluZyhjdXJyZW50Tm9kZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQ2hlY2sgd2hldGhlciBlbGVtZW50IGhhcyBhIHZhbGlkIG5hbWVzcGFjZSAqL1xuICAgICAgaWYgKGN1cnJlbnROb2RlIGluc3RhbmNlb2YgRWxlbWVudCAmJiAhX2NoZWNrVmFsaWROYW1lc3BhY2UoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBNYWtlIHN1cmUgdGhhdCBvbGRlciBicm93c2VycyBkb24ndCBnZXQgZmFsbGJhY2stdGFnIG1YU1MgKi9cbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ25vc2NyaXB0JyB8fCB0YWdOYW1lID09PSAnbm9lbWJlZCcgfHwgdGFnTmFtZSA9PT0gJ25vZnJhbWVzJykgJiYgcmVnRXhwVGVzdCgvPFxcL25vKHNjcmlwdHxlbWJlZHxmcmFtZXMpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGVsZW1lbnQgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIC8qIEdldCB0aGUgZWxlbWVudCdzIHRleHQgY29udGVudCAqL1xuICAgICAgICBjb250ZW50ID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgZXhwciA9PiB7XG4gICAgICAgICAgY29udGVudCA9IHN0cmluZ1JlcGxhY2UoY29udGVudCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS50ZXh0Q29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgICAgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjVGFnIExvd2VyY2FzZSB0YWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY05hbWUgTG93ZXJjYXNlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSB7XG4gICAgICAvKiBNYWtlIHN1cmUgYXR0cmlidXRlIGNhbm5vdCBjbG9iYmVyICovXG4gICAgICBpZiAoU0FOSVRJWkVfRE9NICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpICYmICh2YWx1ZSBpbiBkb2N1bWVudCB8fCB2YWx1ZSBpbiBmb3JtRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKiBBbGxvdyB2YWxpZCBkYXRhLSogYXR0cmlidXRlczogQXQgbGVhc3Qgb25lIGNoYXJhY3RlciBhZnRlciBcIi1cIlxuICAgICAgICAgIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9kb20uaHRtbCNlbWJlZGRpbmctY3VzdG9tLW5vbi12aXNpYmxlLWRhdGEtd2l0aC10aGUtZGF0YS0qLWF0dHJpYnV0ZXMpXG4gICAgICAgICAgWE1MLWNvbXBhdGlibGUgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjeG1sLWNvbXBhdGlibGUgYW5kIGh0dHA6Ly93d3cudzMub3JnL1RSL3htbC8jZDBlODA0KVxuICAgICAgICAgIFdlIGRvbid0IG5lZWQgdG8gY2hlY2sgdGhlIHZhbHVlOyBpdCdzIGFsd2F5cyBVUkkgc2FmZS4gKi9cbiAgICAgIGlmIChBTExPV19EQVRBX0FUVFIgJiYgIUZPUkJJRF9BVFRSW2xjTmFtZV0gJiYgcmVnRXhwVGVzdChEQVRBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoQUxMT1dfQVJJQV9BVFRSICYmIHJlZ0V4cFRlc3QoQVJJQV9BVFRSLCBsY05hbWUpKSA7IGVsc2UgaWYgKCFBTExPV0VEX0FUVFJbbGNOYW1lXSB8fCBGT1JCSURfQVRUUltsY05hbWVdKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgLy8gRmlyc3QgY29uZGl0aW9uIGRvZXMgYSB2ZXJ5IGJhc2ljIGNoZWNrIGlmIGEpIGl0J3MgYmFzaWNhbGx5IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgdGFnbmFtZSBBTkRcbiAgICAgICAgLy8gYikgaWYgdGhlIHRhZ05hbWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2tcbiAgICAgICAgLy8gYW5kIGMpIGlmIHRoZSBhdHRyaWJ1dGUgbmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVja1xuICAgICAgICBfaXNCYXNpY0N1c3RvbUVsZW1lbnQobGNUYWcpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIGxjVGFnKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sobGNUYWcpKSAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrLCBsY05hbWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayhsY05hbWUpKSB8fFxuICAgICAgICAvLyBBbHRlcm5hdGl2ZSwgc2Vjb25kIGNvbmRpdGlvbiBjaGVja3MgaWYgaXQncyBhbiBgaXNgLWF0dHJpYnV0ZSwgQU5EXG4gICAgICAgIC8vIHRoZSB2YWx1ZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICBsY05hbWUgPT09ICdpcycgJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHZhbHVlKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodmFsdWUpKSkgOyBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJDEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICgobGNOYW1lID09PSAnc3JjJyB8fCBsY05hbWUgPT09ICd4bGluazpocmVmJyB8fCBsY05hbWUgPT09ICdocmVmJykgJiYgbGNUYWcgIT09ICdzY3JpcHQnICYmIHN0cmluZ0luZGV4T2YodmFsdWUsICdkYXRhOicpID09PSAwICYmIERBVEFfVVJJX1RBR1NbbGNUYWddKSA7IGVsc2UgaWYgKEFMTE9XX1VOS05PV05fUFJPVE9DT0xTICYmICFyZWdFeHBUZXN0KElTX1NDUklQVF9PUl9EQVRBLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSkpIDsgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNCYXNpY0N1c3RvbUVsZW1lbnRcbiAgICAgKiBjaGVja3MgaWYgYXQgbGVhc3Qgb25lIGRhc2ggaXMgaW5jbHVkZWQgaW4gdGFnTmFtZSwgYW5kIGl0J3Mgbm90IHRoZSBmaXJzdCBjaGFyXG4gICAgICogZm9yIG1vcmUgc29waGlzdGljYXRlZCBjaGVja2luZyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy92YWxpZGF0ZS1lbGVtZW50LW5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIG5hbWUgb2YgdGhlIHRhZyBvZiB0aGUgbm9kZSB0byBzYW5pdGl6ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBuYW1lIG1lZXRzIHRoZSBiYXNpYyBjcml0ZXJpYSBmb3IgYSBjdXN0b20gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCA9IGZ1bmN0aW9uIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgICByZXR1cm4gdGFnTmFtZSAhPT0gJ2Fubm90YXRpb24teG1sJyAmJiB0YWdOYW1lLmluZGV4T2YoJy0nKSA+IDA7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZUF0dHJpYnV0ZXNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IGF0dHJpYnV0ZXNcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUF0dHJpYnV0ZVxuICAgICAqIEBwcm90ZWN0IHNldEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gc2FuaXRpemVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVBdHRyaWJ1dGVzID0gZnVuY3Rpb24gX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSkge1xuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGF0dHJpYnV0ZXNcbiAgICAgIH0gPSBjdXJyZW50Tm9kZTtcblxuICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhdHRyaWJ1dGVzOyBpZiBub3Qgd2UgbWlnaHQgaGF2ZSBhIHRleHQgbm9kZSAqL1xuICAgICAgaWYgKCFhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGhvb2tFdmVudCA9IHtcbiAgICAgICAgYXR0ck5hbWU6ICcnLFxuICAgICAgICBhdHRyVmFsdWU6ICcnLFxuICAgICAgICBrZWVwQXR0cjogdHJ1ZSxcbiAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXM6IEFMTE9XRURfQVRUUlxuICAgICAgfTtcbiAgICAgIGxldCBsID0gYXR0cmlidXRlcy5sZW5ndGg7XG5cbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXG4gICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBhdHRyaWJ1dGVzW2xdO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBuYW1lc3BhY2VVUkksXG4gICAgICAgICAgdmFsdWU6IGF0dHJWYWx1ZVxuICAgICAgICB9ID0gYXR0cjtcbiAgICAgICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMobmFtZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5hbWUgPT09ICd2YWx1ZScgPyBhdHRyVmFsdWUgOiBzdHJpbmdUcmltKGF0dHJWYWx1ZSk7XG5cbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgICBob29rRXZlbnQuYXR0ck5hbWUgPSBsY05hbWU7XG4gICAgICAgIGhvb2tFdmVudC5hdHRyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaG9va0V2ZW50LmtlZXBBdHRyID0gdHJ1ZTtcbiAgICAgICAgaG9va0V2ZW50LmZvcmNlS2VlcEF0dHIgPSB1bmRlZmluZWQ7IC8vIEFsbG93cyBkZXZlbG9wZXJzIHRvIHNlZSB0aGlzIGlzIGEgcHJvcGVydHkgdGhleSBjYW4gc2V0XG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplQXR0cmlidXRlJywgY3VycmVudE5vZGUsIGhvb2tFdmVudCk7XG4gICAgICAgIHZhbHVlID0gaG9va0V2ZW50LmF0dHJWYWx1ZTtcbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGlmIChob29rRXZlbnQuZm9yY2VLZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogUmVtb3ZlIGF0dHJpYnV0ZSAqL1xuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcblxuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKCFob29rRXZlbnQua2VlcEF0dHIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFdvcmsgYXJvdW5kIGEgc2VjdXJpdHkgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuICAgICAgICBpZiAoIUFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiAmJiByZWdFeHBUZXN0KC9cXC8+L2ksIHZhbHVlKSkge1xuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgZXhwciwgJyAnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIElzIGB2YWx1ZWAgdmFsaWQgZm9yIHRoaXMgYXR0cmlidXRlPyAqL1xuICAgICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKGN1cnJlbnROb2RlLm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKCFfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEZ1bGwgRE9NIENsb2JiZXJpbmcgcHJvdGVjdGlvbiB2aWEgbmFtZXNwYWNlIGlzb2xhdGlvbixcbiAgICAgICAgICogUHJlZml4IGlkIGFuZCBuYW1lIGF0dHJpYnV0ZXMgd2l0aCBgdXNlci1jb250ZW50LWBcbiAgICAgICAgICovXG4gICAgICAgIGlmIChTQU5JVElaRV9OQU1FRF9QUk9QUyAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSkge1xuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhpcyB2YWx1ZVxuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgICAgLy8gUHJlZml4IHRoZSB2YWx1ZSBhbmQgbGF0ZXIgcmUtY3JlYXRlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGUgc2FuaXRpemVkIHZhbHVlXG4gICAgICAgICAgdmFsdWUgPSBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggKyB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBhdHRyaWJ1dGVzIHRoYXQgcmVxdWlyZSBUcnVzdGVkIFR5cGVzICovXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgJiYgdHlwZW9mIHRydXN0ZWRUeXBlcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHRydXN0ZWRUeXBlcy5nZXRBdHRyaWJ1dGVUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkgOyBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUobGNUYWcsIGxjTmFtZSkpIHtcbiAgICAgICAgICAgICAgY2FzZSAnVHJ1c3RlZEhUTUwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkU2NyaXB0VVJMJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVTY3JpcHRVUkwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBGYWxsYmFjayB0byBzZXRBdHRyaWJ1dGUoKSBmb3IgYnJvd3Nlci11bnJlY29nbml6ZWQgbmFtZXNwYWNlcyBlLmcuIFwieC1zY2hlbWFcIi4gKi9cbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFycmF5UG9wKERPTVB1cmlmeS5yZW1vdmVkKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplU2hhZG93RE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudCB0byBpdGVyYXRlIG92ZXIgcmVjdXJzaXZlbHlcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcbiAgICAgIGxldCBzaGFkb3dOb2RlID0gbnVsbDtcbiAgICAgIGNvbnN0IHNoYWRvd0l0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihmcmFnbWVudCk7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgICB3aGlsZSAoc2hhZG93Tm9kZSA9IHNoYWRvd0l0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZVNoYWRvd05vZGUnLCBzaGFkb3dOb2RlLCBudWxsKTtcblxuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoc2hhZG93Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIERlZXAgc2hhZG93IERPTSBkZXRlY3RlZCAqL1xuICAgICAgICBpZiAoc2hhZG93Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShzaGFkb3dOb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoc2hhZG93Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2FuaXRpemVcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHByb3ZpZGluZyBjb3JlIHNhbml0YXRpb24gZnVuY3Rpb25hbGl0eVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZX0gZGlydHkgc3RyaW5nIG9yIERPTSBub2RlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBvYmplY3RcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIERPTVB1cmlmeS5zYW5pdGl6ZSA9IGZ1bmN0aW9uIChkaXJ0eSkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBsZXQgYm9keSA9IG51bGw7XG4gICAgICBsZXQgaW1wb3J0ZWROb2RlID0gbnVsbDtcbiAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICBsZXQgcmV0dXJuTm9kZSA9IG51bGw7XG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cbiAgICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgICB0aGUgdXNlciBoYXMgcmVxdWVzdGVkIGEgRE9NIG9iamVjdCByYXRoZXIgdGhhbiBhIHN0cmluZyAqL1xuICAgICAgSVNfRU1QVFlfSU5QVVQgPSAhZGlydHk7XG4gICAgICBpZiAoSVNfRU1QVFlfSU5QVVQpIHtcbiAgICAgICAgZGlydHkgPSAnPCEtLT4nO1xuICAgICAgfVxuXG4gICAgICAvKiBTdHJpbmdpZnksIGluIGNhc2UgZGlydHkgaXMgYW4gb2JqZWN0ICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJyAmJiAhX2lzTm9kZShkaXJ0eSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eS50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRpcnR5ID0gZGlydHkudG9TdHJpbmcoKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdkaXJ0eSBpcyBub3QgYSBzdHJpbmcsIGFib3J0aW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgndG9TdHJpbmcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBSZXR1cm4gZGlydHkgSFRNTCBpZiBET01QdXJpZnkgY2Fubm90IHJ1biAqL1xuICAgICAgaWYgKCFET01QdXJpZnkuaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cblxuICAgICAgLyogQ2xlYW4gdXAgcmVtb3ZlZCBlbGVtZW50cyAqL1xuICAgICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcblxuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgSU5fUExBQ0UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICAvKiBEbyBzb21lIGVhcmx5IHByZS1zYW5pdGl6YXRpb24gdG8gYXZvaWQgdW5zYWZlIHJvb3Qgbm9kZXMgKi9cbiAgICAgICAgaWYgKGRpcnR5Lm5vZGVOYW1lKSB7XG4gICAgICAgICAgY29uc3QgdGFnTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGRpcnR5Lm5vZGVOYW1lKTtcbiAgICAgICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdyb290IG5vZGUgaXMgZm9yYmlkZGVuIGFuZCBjYW5ub3QgYmUgc2FuaXRpemVkIGluLXBsYWNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAvKiBJZiBkaXJ0eSBpcyBhIERPTSBlbGVtZW50LCBhcHBlbmQgdG8gYW4gZW1wdHkgZG9jdW1lbnQgdG8gYXZvaWRcbiAgICAgICAgICAgZWxlbWVudHMgYmVpbmcgc3RyaXBwZWQgYnkgdGhlIHBhcnNlciAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xuICAgICAgICBpbXBvcnRlZE5vZGUgPSBib2R5Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkaXJ0eSwgdHJ1ZSk7XG4gICAgICAgIGlmIChpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IDEgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChpbXBvcnRlZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBFeGl0IGRpcmVjdGx5IGlmIHdlIGhhdmUgbm90aGluZyB0byBkbyAqL1xuICAgICAgICBpZiAoIVJFVFVSTl9ET00gJiYgIVNBRkVfRk9SX1RFTVBMQVRFUyAmJiAhV0hPTEVfRE9DVU1FTlQgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICAgIGRpcnR5LmluZGV4T2YoJzwnKSA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEluaXRpYWxpemUgdGhlIGRvY3VtZW50IHRvIHdvcmsgb24gKi9cbiAgICAgICAgYm9keSA9IF9pbml0RG9jdW1lbnQoZGlydHkpO1xuXG4gICAgICAgIC8qIENoZWNrIHdlIGhhdmUgYSBET00gbm9kZSBmcm9tIHRoZSBkYXRhICovXG4gICAgICAgIGlmICghYm9keSkge1xuICAgICAgICAgIHJldHVybiBSRVRVUk5fRE9NID8gbnVsbCA6IFJFVFVSTl9UUlVTVEVEX1RZUEUgPyBlbXB0eUhUTUwgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZmlyc3QgZWxlbWVudCBub2RlIChvdXJzKSBpZiBGT1JDRV9CT0RZIGlzIHNldCAqL1xuICAgICAgaWYgKGJvZHkgJiYgRk9SQ0VfQk9EWSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoYm9keS5maXJzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgLyogR2V0IG5vZGUgaXRlcmF0b3IgKi9cbiAgICAgIGNvbnN0IG5vZGVJdGVyYXRvciA9IF9jcmVhdGVOb2RlSXRlcmF0b3IoSU5fUExBQ0UgPyBkaXJ0eSA6IGJvZHkpO1xuXG4gICAgICAvKiBOb3cgc3RhcnQgaXRlcmF0aW5nIG92ZXIgdGhlIGNyZWF0ZWQgZG9jdW1lbnQgKi9cbiAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNoYWRvdyBET00gZGV0ZWN0ZWQsIHNhbml0aXplIGl0ICovXG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShjdXJyZW50Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBzYW5pdGl6ZWQgc3RyaW5nIG9yIERPTSAqL1xuICAgICAgaWYgKFJFVFVSTl9ET00pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gY3JlYXRlRG9jdW1lbnRGcmFnbWVudC5jYWxsKGJvZHkub3duZXJEb2N1bWVudCk7XG4gICAgICAgICAgd2hpbGUgKGJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLWFwcGVuZFxuICAgICAgICAgICAgcmV0dXJuTm9kZS5hcHBlbmRDaGlsZChib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3QgfHwgQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3Rtb2RlKSB7XG4gICAgICAgICAgLypcbiAgICAgICAgICAgIEFkb3B0Tm9kZSgpIGlzIG5vdCB1c2VkIGJlY2F1c2UgaW50ZXJuYWwgc3RhdGUgaXMgbm90IHJlc2V0XG4gICAgICAgICAgICAoZS5nLiB0aGUgcGFzdCBuYW1lcyBtYXAgb2YgYSBIVE1MRm9ybUVsZW1lbnQpLCB0aGlzIGlzIHNhZmVcbiAgICAgICAgICAgIGluIHRoZW9yeSBidXQgd2Ugd291bGQgcmF0aGVyIG5vdCByaXNrIGFub3RoZXIgYXR0YWNrIHZlY3Rvci5cbiAgICAgICAgICAgIFRoZSBzdGF0ZSB0aGF0IGlzIGNsb25lZCBieSBpbXBvcnROb2RlKCkgaXMgZXhwbGljaXRseSBkZWZpbmVkXG4gICAgICAgICAgICBieSB0aGUgc3BlY3MuXG4gICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm5Ob2RlID0gaW1wb3J0Tm9kZS5jYWxsKG9yaWdpbmFsRG9jdW1lbnQsIHJldHVybk5vZGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5Ob2RlO1xuICAgICAgfVxuICAgICAgbGV0IHNlcmlhbGl6ZWRIVE1MID0gV0hPTEVfRE9DVU1FTlQgPyBib2R5Lm91dGVySFRNTCA6IGJvZHkuaW5uZXJIVE1MO1xuXG4gICAgICAvKiBTZXJpYWxpemUgZG9jdHlwZSBpZiBhbGxvd2VkICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQgJiYgQUxMT1dFRF9UQUdTWychZG9jdHlwZSddICYmIGJvZHkub3duZXJEb2N1bWVudCAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZSAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lICYmIHJlZ0V4cFRlc3QoRE9DVFlQRV9OQU1FLCBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lKSkge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9ICc8IURPQ1RZUEUgJyArIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgKyAnPlxcbicgKyBzZXJpYWxpemVkSFRNTDtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZmluYWwgc3RyaW5nIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIGV4cHIsICcgJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoc2VyaWFsaXplZEhUTUwpIDogc2VyaWFsaXplZEhUTUw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gc2V0IHRoZSBjb25maWd1cmF0aW9uIG9uY2VcbiAgICAgKiBzZXRDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkuc2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIFNFVF9DT05GSUcgPSB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSB0aGUgY29uZmlndXJhdGlvblxuICAgICAqIGNsZWFyQ29uZmlnXG4gICAgICpcbiAgICAgKi9cbiAgICBET01QdXJpZnkuY2xlYXJDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBDT05GSUcgPSBudWxsO1xuICAgICAgU0VUX0NPTkZJRyA9IGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNoZWNrIGlmIGFuIGF0dHJpYnV0ZSB2YWx1ZSBpcyB2YWxpZC5cbiAgICAgKiBVc2VzIGxhc3Qgc2V0IGNvbmZpZywgaWYgYW55LiBPdGhlcndpc2UsIHVzZXMgY29uZmlnIGRlZmF1bHRzLlxuICAgICAqIGlzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdGFnIFRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGF0dHIgQXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQuIE90aGVyd2lzZSwgcmV0dXJucyBmYWxzZS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHIsIHZhbHVlKSB7XG4gICAgICAvKiBJbml0aWFsaXplIHNoYXJlZCBjb25maWcgdmFycyBpZiBuZWNlc3NhcnkuICovXG4gICAgICBpZiAoIUNPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoe30pO1xuICAgICAgfVxuICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyh0YWcpO1xuICAgICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoYXR0cik7XG4gICAgICByZXR1cm4gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKi9cbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2YgaG9va0Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gaG9va3NbZW50cnlQb2ludF0gfHwgW107XG4gICAgICBhcnJheVB1c2goaG9va3NbZW50cnlQb2ludF0sIGhvb2tGdW5jdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhIERPTVB1cmlmeSBob29rIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqIChwb3BzIGl0IGZyb20gdGhlIHN0YWNrIG9mIGhvb2tzIGlmIG1vcmUgYXJlIHByZXNlbnQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IHJlbW92ZWQocG9wcGVkKSBob29rXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2sgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybiBhcnJheVBvcChob29rc1tlbnRyeVBvaW50XSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rcyBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2tzIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rcyA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlQWxsSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUFsbEhvb2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaG9va3MgPSB7fTtcbiAgICB9O1xuICAgIHJldHVybiBET01QdXJpZnk7XG4gIH1cbiAgdmFyIHB1cmlmeSA9IGNyZWF0ZURPTVB1cmlmeSgpO1xuXG4gIHJldHVybiBwdXJpZnk7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1cmlmeS5qcy5tYXBcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIu+7v2ltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9kZWZhdWx0Q29tbWFuZHMuanMnO1xyXG5pbXBvcnQgUGx1Z2luTWFuYWdlciBmcm9tICcuL1BsdWdpbk1hbmFnZXIuanMnO1xyXG5pbXBvcnQgUmFuZ2VIZWxwZXIgZnJvbSAnLi9SYW5nZUhlbHBlci5qcyc7XHJcbmltcG9ydCBfdG1wbCBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZW1vdGljb25zIGZyb20gJy4vZW1vdGljb25zLmpzJztcclxuaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknO1xyXG5cclxudmFyIGdsb2JhbFdpbiAgPSB3aW5kb3c7XHJcbnZhciBnbG9iYWxEb2MgID0gZG9jdW1lbnQ7XHJcblxyXG52YXIgSU1BR0VfTUlNRV9SRUdFWCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblxyXG4vKipcclxuICogV3JhcCBpbmxpbmVzIHRoYXQgYXJlIGluIHRoZSByb290IGluIHBhcmFncmFwaHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcElubGluZXMoYm9keSwgZG9jKSB7XHJcblx0dmFyIHdyYXBwZXI7XHJcblxyXG5cdGRvbS50cmF2ZXJzZShib2R5LCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKGRvbS5pc0lubGluZShub2RlLCB0cnVlKSkge1xyXG5cdFx0XHQvLyBJZ25vcmUgdGV4dCBub2RlcyB1bmxlc3MgdGhleSBjb250YWluIG5vbi13aGl0ZXNwYWNlIGNoYXJzIGFzXHJcblx0XHRcdC8vIHdoaXRlc3BhY2Ugd2lsbCBiZSBjb2xsYXBzZWQuXHJcblx0XHRcdC8vIElnbm9yZSBzY2VkaXRvci1pZ25vcmUgZWxlbWVudHMgdW5sZXNzIHdyYXBwaW5nIHNpYmxpbmdzXHJcblx0XHRcdC8vIFNob3VsZCBzdGlsbCB3cmFwIGJvdGggaWYgd3JhcHBpbmcgc2libGluZ3MuXHJcblx0XHRcdGlmICh3cmFwcGVyIHx8IG5vZGUubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgP1xyXG5cdFx0XHRcdC9cXFMvLnRlc3Qobm9kZS5ub2RlVmFsdWUpIDogIWRvbS5pcyhub2RlLCAnLnNjZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0aWYgKCF3cmFwcGVyKSB7XHJcblx0XHRcdFx0XHR3cmFwcGVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUod3JhcHBlciwgbm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3JhcHBlciwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHdyYXBwZXIgPSBudWxsO1xyXG5cdFx0fVxyXG5cdH0sIGZhbHNlLCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNDRWRpdG9yIC0gQSBsaWdodHdlaWdodCBXWVNJV1lHIGVkaXRvclxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxUZXh0QXJlYUVsZW1lbnR9IG9yaWdpbmFsIFRoZSB0ZXh0YXJlYSB0byBiZSBjb252ZXJ0ZWRcclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJPcHRpb25zXHJcbiAqIEBjbGFzcyBTQ0VkaXRvclxyXG4gKiBAbmFtZSBTQ0VkaXRvclxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU0NFZGl0b3Iob3JpZ2luYWwsIHVzZXJPcHRpb25zKSB7XHJcblx0LyoqXHJcblx0ICogQWxpYXMgb2YgdGhpc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcclxuXHR2YXIgYmFzZSA9IHRoaXM7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVkaXRvciBmb3JtYXQgbGlrZSBCQkNvZGUgb3IgSFRNTFxyXG5cdCAqL1xyXG5cdHZhciBmb3JtYXQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBkaXYgd2hpY2ggY29udGFpbnMgdGhlIGVkaXRvciBhbmQgdG9vbGJhclxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGVkaXRvckNvbnRhaW5lcjtcclxuXHJcblx0LyoqXHJcblx0ICogTWFwIG9mIGV2ZW50cyBoYW5kbGVycyBib3VuZCB0byB0aGlzIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBldmVudEhhbmRsZXJzID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHRvb2xiYXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciB0b29sYmFyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBpZnJhbWUgd2hpY2ggc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgd3lzaXd5Z0VkaXRvcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVkaXRvcnMgd2luZG93XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7V2luZG93fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHd5c2l3eWdXaW5kb3c7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBXWVNJV1lHIGVkaXRvcnMgYm9keSBlbGVtZW50XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTEJvZHlFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHd5c2l3eWdCb2R5O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGRvY3VtZW50XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7RG9jdW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgd3lzaXd5Z0RvY3VtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyB0ZXh0YXJlYSBmb3Igdmlld2luZyBzb3VyY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MVGV4dEFyZWFFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHNvdXJjZUVkaXRvcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgZHJvcGRvd25cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBkcm9wZG93bjtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGNvbXBvc2luZyB0ZXh0IHZpYSBJTUVcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHR2YXIgaXNDb21wb3Npbmc7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRpbWVyIGZvciB2YWx1ZUNoYW5nZWQga2V5IGhhbmRsZXJcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHZhciB2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBsb2NhbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGxvY2FsZTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcmVzIGEgY2FjaGUgb2YgcHJlbG9hZGVkIGltYWdlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAdHlwZSB7QXJyYXkuPEhUTUxJbWFnZUVsZW1lbnQ+fVxyXG5cdCAqL1xyXG5cdHZhciBwcmVMb2FkQ2FjaGUgPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVkaXRvcnMgcmFuZ2VIZWxwZXIgaW5zdGFuY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtSYW5nZUhlbHBlcn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciByYW5nZUhlbHBlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQW4gYXJyYXkgb2YgYnV0dG9uIHN0YXRlIGhhbmRsZXJzXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7QXJyYXkuPE9iamVjdD59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgYnRuU3RhdGVIYW5kbGVycyA9IFtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBQbHVnaW4gbWFuYWdlciBpbnN0YW5jZVxyXG5cdCAqXHJcblx0ICogQHR5cGUge1BsdWdpbk1hbmFnZXJ9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgcGx1Z2luTWFuYWdlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgbm9kZSBjb250YWluaW5nIHRoZSBzZWxlY3Rpb24vY2FyZXRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOb2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGN1cnJlbnROb2RlO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBjdXJyZW50IG5vZGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtub2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGN1cnJlbnRCbG9ja05vZGU7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IG5vZGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGN1cnJlbnRTZWxlY3Rpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZWQgdG8gbWFrZSBzdXJlIG9ubHkgMSBzZWxlY3Rpb24gY2hhbmdlZFxyXG5cdCAqIGNoZWNrIGlzIGNhbGxlZCBldmVyeSAxMDBtcy5cclxuXHQgKlxyXG5cdCAqIEhlbHBzIGltcHJvdmUgcGVyZm9ybWFuY2UgYXMgaXQgaXMgY2hlY2tlZCBhIGxvdC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nO1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiBjb250ZW50IGlzIHJlcXVpcmVkIChlcXVpdmFsZW50IHRvIHRoZSBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUpXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBpc1JlcXVpcmVkO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgaW5saW5lIENTUyBzdHlsZSBlbGVtZW50LiBXaWxsIGJlIHVuZGVmaW5lZFxyXG5cdCAqIHVudGlsIGNzcygpIGlzIGNhbGxlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTFN0eWxlRWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBpbmxpbmVDc3M7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9iamVjdCBjb250YWluaW5nIGEgbGlzdCBvZiBzaG9ydGN1dCBoYW5kbGVyc1xyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBzaG9ydGN1dEhhbmRsZXJzID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtaW4gYW5kIG1heCBoZWlnaHRzIHRoYXQgYXV0b0V4cGFuZCBzaG91bGQgc3RheSB3aXRoaW5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgYXV0b0V4cGFuZEJvdW5kcztcclxuXHJcblx0LyoqXHJcblx0ICogVGltZW91dCBmb3IgdGhlIGF1dG9FeHBhbmQgZnVuY3Rpb24gdG8gdGhyb3R0bGUgY2FsbHNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIGF1dG9FeHBhbmRUaHJvdHRsZTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2FjaGUgb2YgdGhlIGN1cnJlbnQgdG9vbGJhciBidXR0b25zXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHRvb2xiYXJCdXR0b25zID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIExhc3Qgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSBtYXhpbWl6aW5nIHNvXHJcblx0ICogaXQgY2FuIGJlIHJlc3RvcmVkIHdoZW4gZmluaXNoZWQuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIG1heGltaXplU2Nyb2xsUG9zaXRpb247XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3JlcyB0aGUgY29udGVudHMgd2hpbGUgYSBwYXN0ZSBpcyB0YWtpbmcgcGxhY2UuXHJcblx0ICpcclxuXHQgKiBOZWVkZWQgdG8gc3VwcG9ydCBicm93c2VycyB0aGF0IGxhY2sgY2xpcGJvYXJkIEFQSSBzdXBwb3J0LlxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9Eb2N1bWVudEZyYWdtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFyIHBhc3RlQ29udGVudEZyYWdtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgdGhlIGVtb3RpY29ucyBmcm9tIGRyb3Bkb3duLCBtb3JlIGFuZCBoaWRkZW4gY29tYmluZWRcclxuXHQgKiBhbmQgd2l0aCB0aGUgZW1vdGljb25zIHJvb3Qgc2V0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YXIgYWxsRW1vdGljb25zID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgaWNvbiBzZXQgaWYgYW55XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7P09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhciBpY29ucztcclxuXHJcblx0LyoqXHJcblx0ICogUHJpdmF0ZSBmdW5jdGlvbnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHZhclx0aW5pdCxcclxuXHRcdHJlcGxhY2VFbW90aWNvbnMsXHJcblx0XHRoYW5kbGVDb21tYW5kLFxyXG5cdFx0aW5pdEVkaXRvcixcclxuXHRcdGluaXRMb2NhbGUsXHJcblx0XHRpbml0VG9vbEJhcixcclxuXHRcdGluaXRPcHRpb25zLFxyXG5cdFx0aW5pdEV2ZW50cyxcclxuXHRcdGluaXRSZXNpemUsXHJcblx0XHRpbml0RW1vdGljb25zLFxyXG5cdFx0aGFuZGxlUGFzdGVFdnQsXHJcblx0XHRoYW5kbGVDdXRDb3B5RXZ0LFxyXG5cdFx0aGFuZGxlUGFzdGVEYXRhLFxyXG5cdFx0aGFuZGxlS2V5RG93bixcclxuXHRcdGhhbmRsZUJhY2tTcGFjZSxcclxuXHRcdGhhbmRsZUtleVByZXNzLFxyXG5cdFx0aGFuZGxlRm9ybVJlc2V0LFxyXG5cdFx0aGFuZGxlTW91c2VEb3duLFxyXG5cdFx0aGFuZGxlQ29tcG9zaXRpb24sXHJcblx0XHRoYW5kbGVFdmVudCxcclxuXHRcdGhhbmRsZURvY3VtZW50Q2xpY2ssXHJcblx0XHR1cGRhdGVUb29sQmFyLFxyXG5cdFx0dXBkYXRlQWN0aXZlQnV0dG9ucyxcclxuXHRcdHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCxcclxuXHRcdGFwcGVuZE5ld0xpbmUsXHJcblx0XHRjaGVja1NlbGVjdGlvbkNoYW5nZWQsXHJcblx0XHRjaGVja05vZGVDaGFuZ2VkLFxyXG5cdFx0YXV0b2ZvY3VzLFxyXG5cdFx0ZW1vdGljb25zS2V5UHJlc3MsXHJcblx0XHRlbW90aWNvbnNDaGVja1doaXRlc3BhY2UsXHJcblx0XHRjdXJyZW50U3R5bGVkQmxvY2tOb2RlLFxyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCxcclxuXHRcdHZhbHVlQ2hhbmdlZEJsdXIsXHJcblx0XHR2YWx1ZUNoYW5nZWRLZXlVcCxcclxuXHRcdGF1dG9VcGRhdGUsXHJcblx0XHRhdXRvRXhwYW5kO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbGwgdGhlIGNvbW1hbmRzIHN1cHBvcnRlZCBieSB0aGUgZWRpdG9yXHJcblx0ICogQG5hbWUgY29tbWFuZHNcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5jb21tYW5kcyA9IHV0aWxzXHJcblx0XHQuZXh0ZW5kKHRydWUsIHt9LCAodXNlck9wdGlvbnMuY29tbWFuZHMgfHwgZGVmYXVsdENvbW1hbmRzKSk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9wdGlvbnMgZm9yIHRoaXMgZWRpdG9yIGluc3RhbmNlXHJcblx0ICogQG5hbWUgb3B0c1xyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHR2YXIgb3B0aW9ucyA9IGJhc2Uub3B0cyA9IHV0aWxzLmV4dGVuZChcclxuXHRcdHRydWUsIHt9LCBkZWZhdWx0T3B0aW9ucywgdXNlck9wdGlvbnNcclxuXHQpO1xyXG5cclxuXHQvLyBEb24ndCBkZWVwIGV4dGVuZCBlbW90aWNvbnMgKGZpeGVzICM1NjUpXHJcblx0YmFzZS5vcHRzLmVtb3RpY29ucyA9IHVzZXJPcHRpb25zLmVtb3RpY29ucyB8fCBkZWZhdWx0T3B0aW9ucy5lbW90aWNvbnM7XHJcblxyXG5cdGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzKSkge1xyXG5cdFx0b3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscyA9IFtdO1xyXG5cdH1cclxuXHRvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzLnB1c2goJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLycpO1xyXG5cclxuXHQvLyBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIERPTVB1cmlmeSBmb3IgZWFjaCBlZGl0b3IgaW5zdGFuY2Ugc28gY2FuXHJcblx0Ly8gaGF2ZSBkaWZmZXJlbnQgYWxsb3dlZCBpZnJhbWUgVVJMc1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXHJcblx0dmFyIGRvbVB1cmlmeSA9IERPTVB1cmlmeSgpO1xyXG5cclxuXHQvLyBBbGxvdyBpZnJhbWVzIGZvciB0aGluZ3MgbGlrZSBZb3VUdWJlLCBzZWU6XHJcblx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvaXNzdWVzLzM0MCNpc3N1ZWNvbW1lbnQtNjcwNzU4OTgwXHJcblx0ZG9tUHVyaWZ5LmFkZEhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBmdW5jdGlvbiAobm9kZSwgZGF0YSkge1xyXG5cdFx0dmFyIGFsbG93ZWRVcmxzID0gb3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscztcclxuXHJcblx0XHRpZiAoZGF0YS50YWdOYW1lID09PSAnaWZyYW1lJykge1xyXG5cdFx0XHR2YXIgc3JjID0gZG9tLmF0dHIobm9kZSwgJ3NyYycpIHx8ICcnO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGxvd2VkVXJscy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHZhciB1cmwgPSBhbGxvd2VkVXJsc1tpXTtcclxuXHJcblx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHVybCkgJiYgc3JjLnN1YnN0cigwLCB1cmwubGVuZ3RoKSA9PT0gdXJsKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBIYW5kbGUgcmVnZXhcclxuXHRcdFx0XHRpZiAodXJsLnRlc3QgJiYgdXJsLnRlc3Qoc3JjKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTm8gbWF0Y2ggc28gcmVtb3ZlXHJcblx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdC8vIENvbnZlcnQgdGFyZ2V0IGF0dHJpYnV0ZSBpbnRvIGRhdGEtc2NlLXRhcmdldCBhdHRyaWJ1dGVzIHNvIFhIVE1MIGZvcm1hdFxyXG5cdC8vIGNhbiBhbGxvdyB0aGVtXHJcblx0ZG9tUHVyaWZ5LmFkZEhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGlmICgndGFyZ2V0JyBpbiBub2RlKSB7XHJcblx0XHRcdGRvbS5hdHRyKG5vZGUsICdkYXRhLXNjZS10YXJnZXQnLCBkb20uYXR0cihub2RlLCAndGFyZ2V0JykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5yZW1vdmVBdHRyKG5vZGUsICd0YXJnZXQnKTtcclxuXHR9KTtcclxuXHJcblx0LyoqXHJcblx0ICogU2FuaXRpemUgSFRNTCB0byBhdm9pZCBYU1NcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcblx0ICogQHJldHVybiB7c3RyaW5nfSBodG1sXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBzYW5pdGl6ZShodG1sKSB7XHJcblx0XHRjb25zdCBhbGxvd2VkVGFncyA9IFsnaWZyYW1lJ10uY29uY2F0KG9wdGlvbnMuYWxsb3dlZFRhZ3MpO1xyXG5cdFx0Y29uc3QgYWxsb3dlZEF0dHJzID0gWydhbGxvd2Z1bGxzY3JlZW4nLCAnZnJhbWVib3JkZXInLCAndGFyZ2V0J11cclxuXHRcdFx0LmNvbmNhdChvcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRyZXR1cm4gZG9tUHVyaWZ5LnNhbml0aXplKGh0bWwsIHtcclxuXHRcdFx0QUREX1RBR1M6IGFsbG93ZWRUYWdzLFxyXG5cdFx0XHRBRERfQVRUUjogYWxsb3dlZEF0dHJzXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGVkaXRvciBpZnJhbWUgYW5kIHRleHRhcmVhXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0b3JpZ2luYWwuX3NjZWRpdG9yID0gYmFzZTtcclxuXHJcblx0XHQvLyBMb2FkIGxvY2FsZVxyXG5cdFx0aWYgKG9wdGlvbnMubG9jYWxlICYmIG9wdGlvbnMubG9jYWxlICE9PSAnZW4nKSB7XHJcblx0XHRcdGluaXRMb2NhbGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRlZGl0b3JDb250YWluZXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1jb250YWluZXInXHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20uaW5zZXJ0QmVmb3JlKGVkaXRvckNvbnRhaW5lciwgb3JpZ2luYWwpO1xyXG5cdFx0ZG9tLmNzcyhlZGl0b3JDb250YWluZXIsICd6LWluZGV4Jywgb3B0aW9ucy56SW5kZXgpO1xyXG5cclxuXHRcdGlzUmVxdWlyZWQgPSBvcmlnaW5hbC5yZXF1aXJlZDtcclxuXHRcdG9yaWdpbmFsLnJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG5cdFx0dmFyIEZvcm1hdEN0b3IgPSBTQ0VkaXRvci5mb3JtYXRzW29wdGlvbnMuZm9ybWF0XTtcclxuXHRcdGZvcm1hdCA9IEZvcm1hdEN0b3IgPyBuZXcgRm9ybWF0Q3RvcigpIDoge307XHJcblx0XHQvKlxyXG5cdFx0ICogUGx1Z2lucyBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIHRoZSBmb3JtYXR0ZXJzIHNpbmNlXHJcblx0XHQgKiB0aGV5IG1heSB3aXNoIHRvIGFkZCBvciBjaGFuZ2UgZm9ybWF0dGluZyBoYW5kbGVycyBhbmRcclxuXHRcdCAqIHNpbmNlIHRoZSBiYmNvZGUgZm9ybWF0IGNhY2hlcyBpdHMgaGFuZGxlcnMsXHJcblx0XHQgKiBzdWNoIGNoYW5nZXMgbXVzdCBiZSBkb25lIGZpcnN0LlxyXG5cdFx0ICovXHJcblx0XHRwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoYmFzZSk7XHJcblx0XHQob3B0aW9ucy5wbHVnaW5zIHx8ICcnKS5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xyXG5cdFx0XHRwbHVnaW5NYW5hZ2VyLnJlZ2lzdGVyKHBsdWdpbi50cmltKCkpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoJ2luaXQnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRmb3JtYXQuaW5pdC5jYWxsKGJhc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNyZWF0ZSB0aGUgZWRpdG9yXHJcblx0XHRpbml0RW1vdGljb25zKCk7XHJcblx0XHRpbml0VG9vbEJhcigpO1xyXG5cdFx0aW5pdEVkaXRvcigpO1xyXG5cdFx0aW5pdE9wdGlvbnMoKTtcclxuXHRcdGluaXRFdmVudHMoKTtcclxuXHJcblx0XHQvLyBmb3JjZSBpbnRvIHNvdXJjZSBtb2RlIGlmIGlzIGEgYnJvd3NlciB0aGF0IGNhbid0IGhhbmRsZVxyXG5cdFx0Ly8gZnVsbCBlZGl0aW5nXHJcblx0XHRpZiAoIWJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkKSB7XHJcblx0XHRcdGJhc2UudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHR2YXIgbG9hZGVkID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRkb20ub2ZmKGdsb2JhbFdpbiwgJ2xvYWQnLCBsb2FkZWQpO1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0YXV0b2ZvY3VzKCEhb3B0aW9ucy5hdXRvZm9jdXNFbmQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhdXRvRXhwYW5kKCk7XHJcblx0XHRcdGFwcGVuZE5ld0xpbmUoKTtcclxuXHRcdFx0Ly8gVE9ETzogdXNlIGVkaXRvciBkb2MgYW5kIHdpbmRvdz9cclxuXHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdyZWFkeScpO1xyXG5cdFx0XHRpZiAoJ29uUmVhZHknIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdGZvcm1hdC5vblJlYWR5LmNhbGwoYmFzZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRkb20ub24oZ2xvYmFsV2luLCAnbG9hZCcsIGxvYWRlZCk7XHJcblx0XHRpZiAoZ2xvYmFsRG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0bG9hZGVkKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdCB0aGUgbG9jYWxlIHZhcmlhYmxlIHdpdGggdGhlIHNwZWNpZmllZCBsb2NhbGUgaWYgcG9zc2libGVcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdGluaXRMb2NhbGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbGFuZztcclxuXHJcblx0XHRsb2NhbGUgPSBTQ0VkaXRvci5sb2NhbGVbb3B0aW9ucy5sb2NhbGVdO1xyXG5cclxuXHRcdGlmICghbG9jYWxlKSB7XHJcblx0XHRcdGxhbmcgICA9IG9wdGlvbnMubG9jYWxlLnNwbGl0KCctJyk7XHJcblx0XHRcdGxvY2FsZSA9IFNDRWRpdG9yLmxvY2FsZVtsYW5nWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBMb2NhbGUgRGF0ZVRpbWUgZm9ybWF0IG92ZXJyaWRlcyBhbnkgc3BlY2lmaWVkIGluIHRoZSBvcHRpb25zXHJcblx0XHRpZiAobG9jYWxlICYmIGxvY2FsZS5kYXRlRm9ybWF0KSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0ZUZvcm1hdCA9IGxvY2FsZS5kYXRlRm9ybWF0O1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGVkaXRvciBpZnJhbWUgYW5kIHRleHRhcmVhXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRpbml0RWRpdG9yID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0c291cmNlRWRpdG9yICA9IGRvbS5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG5cdFx0d3lzaXd5Z0VkaXRvciA9IGRvbS5jcmVhdGVFbGVtZW50KCdpZnJhbWUnLCB7XHJcblx0XHRcdGZyYW1lYm9yZGVyOiAwLFxyXG5cdFx0XHRhbGxvd2Z1bGxzY3JlZW46IHRydWVcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qXHJcblx0XHQgKiBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgcmlnaHQgYWZ0ZXIgdGhleSBhcmUgY3JlYXRlZCBiZWNhdXNlLFxyXG5cdFx0ICogZm9yIGFueSByZWFzb24sIHRoZSB1c2VyIG1heSBub3Qgd2FudCB0aGUgdmFsdWUgdG8gYmUgdGlua2VyZWRcclxuXHRcdCAqIGJ5IGFueSBmaWx0ZXJzLlxyXG5cdFx0ICovXHJcblx0XHRpZiAob3B0aW9ucy5zdGFydEluU291cmNlTW9kZSkge1xyXG5cdFx0XHRkb20uYWRkQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZSh3eXNpd3lnRWRpdG9yKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZShzb3VyY2VFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghb3B0aW9ucy5zcGVsbGNoZWNrKSB7XHJcblx0XHRcdGRvbS5hdHRyKGVkaXRvckNvbnRhaW5lciwgJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZ2xvYmFsV2luLmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6Jykge1xyXG5cdFx0XHRkb20uYXR0cih3eXNpd3lnRWRpdG9yLCAnc3JjJywgJ2Fib3V0OmJsYW5rJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBlZGl0b3IgdG8gdGhlIGNvbnRhaW5lclxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgd3lzaXd5Z0VkaXRvcik7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBzb3VyY2VFZGl0b3IpO1xyXG5cclxuXHRcdC8vIFRPRE86IG1ha2UgdGhpcyBvcHRpb25hbCBzb21laG93XHJcblx0XHRiYXNlLmRpbWVuc2lvbnMoXHJcblx0XHRcdG9wdGlvbnMud2lkdGggfHwgZG9tLndpZHRoKG9yaWdpbmFsKSxcclxuXHRcdFx0b3B0aW9ucy5oZWlnaHQgfHwgZG9tLmhlaWdodChvcmlnaW5hbClcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gQWRkIGlvcyB0byBIVE1MIHNvIGNhbiBhcHBseSBDU1MgZml4IHRvIG9ubHkgaXRcclxuXHRcdHZhciBjbGFzc05hbWUgPSBicm93c2VyLmlvcyA/ICcgaW9zJyA6ICcnO1xyXG5cclxuXHRcdHd5c2l3eWdEb2N1bWVudCA9IHd5c2l3eWdFZGl0b3IuY29udGVudERvY3VtZW50O1xyXG5cdFx0d3lzaXd5Z0RvY3VtZW50Lm9wZW4oKTtcclxuXHRcdHd5c2l3eWdEb2N1bWVudC53cml0ZShfdG1wbCgnaHRtbCcsIHtcclxuXHRcdFx0YXR0cnM6ICcgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiJyxcclxuXHRcdFx0c3BlbGxjaGVjazogb3B0aW9ucy5zcGVsbGNoZWNrID8gJycgOiAnc3BlbGxjaGVjaz1cImZhbHNlXCInLFxyXG5cdFx0XHRjaGFyc2V0OiBvcHRpb25zLmNoYXJzZXQsXHJcblx0XHRcdHN0eWxlOiBvcHRpb25zLnN0eWxlXHJcblx0XHR9KSk7XHJcblx0XHR3eXNpd3lnRG9jdW1lbnQuY2xvc2UoKTtcclxuXHJcblx0XHR3eXNpd3lnQm9keSA9IHd5c2l3eWdEb2N1bWVudC5ib2R5O1xyXG5cdFx0d3lzaXd5Z1dpbmRvdyA9IHd5c2l3eWdFZGl0b3IuY29udGVudFdpbmRvdztcclxuXHJcblx0XHRiYXNlLnJlYWRPbmx5KCEhb3B0aW9ucy5yZWFkT25seSk7XHJcblxyXG5cdFx0Ly8gaWZyYW1lIG92ZXJmbG93IGZpeCBmb3IgaU9TXHJcblx0XHRpZiAoYnJvd3Nlci5pb3MpIHtcclxuXHRcdFx0ZG9tLmhlaWdodCh3eXNpd3lnQm9keSwgJzEwMCUnKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBiYXNlLmZvY3VzKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGFiSW5kZXggPSBkb20uYXR0cihvcmlnaW5hbCwgJ3RhYmluZGV4Jyk7XHJcblx0XHRkb20uYXR0cihzb3VyY2VFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHRcdGRvbS5hdHRyKHd5c2l3eWdFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHJcblx0XHRyYW5nZUhlbHBlciA9IG5ldyBSYW5nZUhlbHBlcih3eXNpd3lnV2luZG93LCBudWxsLCBzYW5pdGl6ZSk7XHJcblxyXG5cdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRkb20uaGlkZShvcmlnaW5hbCk7XHJcblx0XHRiYXNlLnZhbChvcmlnaW5hbC52YWx1ZSk7XHJcblxyXG5cdFx0dmFyIHBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fFxyXG5cdFx0XHRkb20uYXR0cihvcmlnaW5hbCwgJ3BsYWNlaG9sZGVyJyk7XHJcblxyXG5cdFx0aWYgKHBsYWNlaG9sZGVyKSB7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG5cdFx0XHRkb20uYXR0cih3eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpc2VzIG9wdGlvbnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRPcHRpb25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gYXV0by11cGRhdGUgb3JpZ2luYWwgdGV4dGJveCBvbiBibHVyIGlmIG9wdGlvbiBzZXQgdG8gdHJ1ZVxyXG5cdFx0aWYgKG9wdGlvbnMuYXV0b1VwZGF0ZSkge1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdibHVyJywgYXV0b1VwZGF0ZSk7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdibHVyJywgYXV0b1VwZGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMucnRsID09PSBudWxsKSB7XHJcblx0XHRcdG9wdGlvbnMucnRsID0gZG9tLmNzcyhzb3VyY2VFZGl0b3IsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCc7XHJcblx0XHR9XHJcblxyXG5cdFx0YmFzZS5ydGwoISFvcHRpb25zLnJ0bCk7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuYXV0b0V4cGFuZCkge1xyXG5cdFx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB3aGVuIGltYWdlcyAob3IgYW55dGhpbmcgZWxzZSkgbG9hZHNcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnbG9hZCcsIGF1dG9FeHBhbmQsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnaW5wdXQga2V5dXAnLCBhdXRvRXhwYW5kKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5yZXNpemVFbmFibGVkKSB7XHJcblx0XHRcdGluaXRSZXNpemUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXR0cihlZGl0b3JDb250YWluZXIsICdpZCcsIG9wdGlvbnMuaWQpO1xyXG5cdFx0YmFzZS5lbW90aWNvbnMob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXNlcyBldmVudHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZm9ybSA9IG9yaWdpbmFsLmZvcm07XHJcblx0XHR2YXIgY29tcG9zaXRpb25FdmVudHMgPSAnY29tcG9zaXRpb25zdGFydCBjb21wb3NpdGlvbmVuZCc7XHJcblx0XHR2YXIgZXZlbnRzVG9Gb3J3YXJkID1cclxuXHRcdFx0J2tleWRvd24ga2V5dXAga2V5cHJlc3MgZm9jdXMgYmx1ciBjb250ZXh0bWVudSBpbnB1dCc7XHJcblx0XHR2YXIgY2hlY2tTZWxlY3Rpb25FdmVudHMgPSAnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHd5c2l3eWdEb2N1bWVudCA/XHJcblx0XHRcdCdzZWxlY3Rpb25jaGFuZ2UnIDpcclxuXHRcdFx0J2tleXVwIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgbW91c2V1cCB0b3VjaGVuZCBjbGljayc7XHJcblxyXG5cdFx0ZG9tLm9uKGdsb2JhbERvYywgJ2NsaWNrJywgaGFuZGxlRG9jdW1lbnRDbGljayk7XHJcblxyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdGRvbS5vbihmb3JtLCAnc3VibWl0JywgYmFzZS51cGRhdGVPcmlnaW5hbCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vbih3aW5kb3csICdwYWdlaGlkZScsIGJhc2UudXBkYXRlT3JpZ2luYWwpO1xyXG5cdFx0ZG9tLm9uKHdpbmRvdywgJ3BhZ2VzaG93JywgaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgaGFuZGxlS2V5UHJlc3MpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5ZG93bicsIGhhbmRsZUJhY2tTcGFjZSk7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIGFwcGVuZE5ld0xpbmUpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCB2YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksICdwYXN0ZScsIGhhbmRsZVBhc3RlRXZ0KTtcclxuXHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2N1dCBjb3B5JywgaGFuZGxlQ3V0Q29weUV2dCk7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksIGNvbXBvc2l0aW9uRXZlbnRzLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRkb20ub24od3lzaXd5Z0JvZHksIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCBldmVudHNUb0ZvcndhcmQsIGhhbmRsZUV2ZW50KTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNDb21wYXQgJiYgZ2xvYmFsV2luLmdldFNlbGVjdGlvbikge1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIGVtb3RpY29uc0NoZWNrV2hpdGVzcGFjZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCFiYXNlLnZhbCgpKSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnZm9jdXMnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyh3eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24oc291cmNlRWRpdG9yLCAnYmx1cicsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0ZG9tLm9uKHNvdXJjZUVkaXRvciwgJ2tleXVwJywgdmFsdWVDaGFuZ2VkS2V5VXApO1xyXG5cdFx0ZG9tLm9uKHNvdXJjZUVkaXRvciwgJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGNvbXBvc2l0aW9uRXZlbnRzLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRkb20ub24oc291cmNlRWRpdG9yLCBldmVudHNUb0ZvcndhcmQsIGhhbmRsZUV2ZW50KTtcclxuXHJcblx0XHRkb20ub24od3lzaXd5Z0RvY3VtZW50LCAnbW91c2Vkb3duJywgaGFuZGxlTW91c2VEb3duKTtcclxuXHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0ZG9tLm9uKHd5c2l3eWdEb2N1bWVudCwgJ2tleXVwJywgYXBwZW5kTmV3TGluZSk7XHJcblxyXG5cdFx0ZG9tLm9uKGVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnLCBjaGVja05vZGVDaGFuZ2VkKTtcclxuXHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgdXBkYXRlQWN0aXZlQnV0dG9ucyk7XHJcblx0XHQvLyBDdXN0b20gZXZlbnRzIHRvIGZvcndhcmRcclxuXHRcdGRvbS5vbihcclxuXHRcdFx0ZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlZCB2YWx1ZWNoYW5nZWQgbm9kZWNoYW5nZWQgcGFzdGVyYXcgcGFzdGUnLFxyXG5cdFx0XHRoYW5kbGVFdmVudFxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSB0b29sYmFyIGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBjb250YWluZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRUb29sQmFyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyXHRncm91cCxcclxuXHRcdFx0Y29tbWFuZHMgPSBiYXNlLmNvbW1hbmRzLFxyXG5cdFx0XHRleGNsdWRlICA9IChvcHRpb25zLnRvb2xiYXJFeGNsdWRlIHx8ICcnKS5zcGxpdCgnLCcpLFxyXG5cdFx0XHRncm91cHMgICA9IG9wdGlvbnMudG9vbGJhci5zcGxpdCgnfCcpO1xyXG5cclxuXHRcdHRvb2xiYXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dW5zZWxlY3RhYmxlOiAnb24nXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5pY29ucyBpbiBTQ0VkaXRvci5pY29ucykge1xyXG5cdFx0XHRpY29ucyA9IG5ldyBTQ0VkaXRvci5pY29uc1tvcHRpb25zLmljb25zXSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHV0aWxzLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiAoXywgbWVudUl0ZW1zKSB7XHJcblx0XHRcdGdyb3VwID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1ncm91cCdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR1dGlscy5lYWNoKG1lbnVJdGVtcy5zcGxpdCgnLCcpLCBmdW5jdGlvbiAoXywgY29tbWFuZE5hbWUpIHtcclxuXHRcdFx0XHR2YXJcdGJ1dHRvbiwgc2hvcnRjdXQsXHJcblx0XHRcdFx0XHRjb21tYW5kICA9IGNvbW1hbmRzW2NvbW1hbmROYW1lXTtcclxuXHJcblx0XHRcdFx0Ly8gVGhlIGNvbW1hbmROYW1lIG11c3QgYmUgYSB2YWxpZCBjb21tYW5kIGFuZCBub3QgZXhjbHVkZWRcclxuXHRcdFx0XHRpZiAoIWNvbW1hbmQgfHwgZXhjbHVkZS5pbmRleE9mKGNvbW1hbmROYW1lKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzaG9ydGN1dCA9IGNvbW1hbmQuc2hvcnRjdXQ7XHJcblx0XHRcdFx0YnV0dG9uICAgPSBfdG1wbCgndG9vbGJhckJ1dHRvbicsIHtcclxuXHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0ZGlzcE5hbWU6IGJhc2UuXyhjb21tYW5kLm5hbWUgfHxcclxuXHRcdFx0XHRcdFx0XHRjb21tYW5kLnRvb2x0aXAgfHwgY29tbWFuZE5hbWUpXHJcblx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0aWYgKGljb25zICYmIGljb25zLmNyZWF0ZSkge1xyXG5cdFx0XHRcdFx0dmFyIGljb24gPSBpY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShpY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpLFxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRidXR0b24uX3NjZVR4dE1vZGUgPSAhIWNvbW1hbmQudHh0RXhlYztcclxuXHRcdFx0XHRidXR0b24uX3NjZVd5c2l3eWdNb2RlID0gISFjb21tYW5kLmV4ZWM7XHJcblx0XHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJywgIWNvbW1hbmQuZXhlYyk7XHJcblx0XHRcdFx0ZG9tLm9uKGJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdGlmICghZG9tLmhhc0NsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJykpIHtcclxuXHRcdFx0XHRcdFx0aGFuZGxlQ29tbWFuZChidXR0b24sIGNvbW1hbmQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvLyBQcmV2ZW50IGVkaXRvciBsb3NpbmcgZm9jdXMgd2hlbiBidXR0b24gY2xpY2tlZFxyXG5cdFx0XHRcdGRvbS5vbihidXR0b24sICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmIChjb21tYW5kLnRvb2x0aXApIHtcclxuXHRcdFx0XHRcdGRvbS5hdHRyKGJ1dHRvbiwgJ3RpdGxlJyxcclxuXHRcdFx0XHRcdFx0YmFzZS5fKGNvbW1hbmQudG9vbHRpcCkgK1xyXG5cdFx0XHRcdFx0XHRcdChzaG9ydGN1dCA/ICcgKCcgKyBzaG9ydGN1dCArICcpJyA6ICcnKVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChzaG9ydGN1dCkge1xyXG5cdFx0XHRcdFx0YmFzZS5hZGRTaG9ydGN1dChzaG9ydGN1dCwgY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGNvbW1hbmQuc3RhdGUpIHtcclxuXHRcdFx0XHRcdGJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0XHRzdGF0ZTogY29tbWFuZC5zdGF0ZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0Ly8gZXhlYyBzdHJpbmcgY29tbWFuZHMgY2FuIGJlIHBhc3NlZCB0byBxdWVyeUNvbW1hbmRTdGF0ZVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY29tbWFuZC5leGVjKSkge1xyXG5cdFx0XHRcdFx0YnRuU3RhdGVIYW5kbGVycy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0bmFtZTogY29tbWFuZE5hbWUsXHJcblx0XHRcdFx0XHRcdHN0YXRlOiBjb21tYW5kLmV4ZWNcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGdyb3VwLCBidXR0b24pO1xyXG5cdFx0XHRcdHRvb2xiYXJCdXR0b25zW2NvbW1hbmROYW1lXSA9IGJ1dHRvbjtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBFeGNsdWRlIGVtcHR5IGdyb3Vwc1xyXG5cdFx0XHRpZiAoZ3JvdXAuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0b29sYmFyLCBncm91cCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFwcGVuZCB0aGUgdG9vbGJhciB0byB0aGUgdG9vbGJhckNvbnRhaW5lciBvcHRpb24gaWYgZ2l2ZW5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZChvcHRpb25zLnRvb2xiYXJDb250YWluZXIgfHwgZWRpdG9yQ29udGFpbmVyLCB0b29sYmFyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSByZXNpemVyLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aW5pdFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhclx0bWluSGVpZ2h0LCBtYXhIZWlnaHQsIG1pbldpZHRoLCBtYXhXaWR0aCxcclxuXHRcdFx0bW91c2VNb3ZlRnVuYywgbW91c2VVcEZ1bmMsXHJcblx0XHRcdGdyaXAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1ncmlwJ1xyXG5cdFx0XHR9KSxcclxuXHRcdFx0Ly8gQ292ZXIgaXMgdXNlZCB0byBjb3ZlciB0aGUgZWRpdG9yIGlmcmFtZSBzbyBkb2N1bWVudFxyXG5cdFx0XHQvLyBzdGlsbCBnZXRzIG1vdXNlIG1vdmUgZXZlbnRzXHJcblx0XHRcdGNvdmVyICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdzY2VkaXRvci1yZXNpemUtY292ZXInXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRtb3ZlRXZlbnRzICA9ICd0b3VjaG1vdmUgbW91c2Vtb3ZlJyxcclxuXHRcdFx0ZW5kRXZlbnRzICAgPSAndG91Y2hjYW5jZWwgdG91Y2hlbmQgbW91c2V1cCcsXHJcblx0XHRcdHN0YXJ0WCAgICAgID0gMCxcclxuXHRcdFx0c3RhcnRZICAgICAgPSAwLFxyXG5cdFx0XHRuZXdYICAgICAgICA9IDAsXHJcblx0XHRcdG5ld1kgICAgICAgID0gMCxcclxuXHRcdFx0c3RhcnRXaWR0aCAgPSAwLFxyXG5cdFx0XHRzdGFydEhlaWdodCA9IDAsXHJcblx0XHRcdG9yaWdXaWR0aCAgID0gZG9tLndpZHRoKGVkaXRvckNvbnRhaW5lciksXHJcblx0XHRcdG9yaWdIZWlnaHQgID0gZG9tLmhlaWdodChlZGl0b3JDb250YWluZXIpLFxyXG5cdFx0XHRpc0RyYWdnaW5nICA9IGZhbHNlLFxyXG5cdFx0XHRydGwgICAgICAgICA9IGJhc2UucnRsKCk7XHJcblxyXG5cdFx0bWluSGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgb3JpZ0hlaWdodCAvIDEuNTtcclxuXHRcdG1heEhlaWdodCA9IG9wdGlvbnMucmVzaXplTWF4SGVpZ2h0IHx8IG9yaWdIZWlnaHQgKiAyLjU7XHJcblx0XHRtaW5XaWR0aCAgPSBvcHRpb25zLnJlc2l6ZU1pbldpZHRoICB8fCBvcmlnV2lkdGggIC8gMS4yNTtcclxuXHRcdG1heFdpZHRoICA9IG9wdGlvbnMucmVzaXplTWF4V2lkdGggIHx8IG9yaWdXaWR0aCAgKiAxLjI1O1xyXG5cclxuXHRcdG1vdXNlTW92ZUZ1bmMgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHQvLyBpT1MgdXNlcyB3aW5kb3cuZXZlbnRcclxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcclxuXHRcdFx0XHRlICAgID0gZ2xvYmFsV2luLmV2ZW50O1xyXG5cdFx0XHRcdG5ld1ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0XHRcdG5ld1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5ld1ggPSBlLnBhZ2VYO1xyXG5cdFx0XHRcdG5ld1kgPSBlLnBhZ2VZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXJcdG5ld0hlaWdodCA9IHN0YXJ0SGVpZ2h0ICsgKG5ld1kgLSBzdGFydFkpLFxyXG5cdFx0XHRcdG5ld1dpZHRoICA9IHJ0bCA/XHJcblx0XHRcdFx0XHRzdGFydFdpZHRoIC0gKG5ld1ggLSBzdGFydFgpIDpcclxuXHRcdFx0XHRcdHN0YXJ0V2lkdGggKyAobmV3WCAtIHN0YXJ0WCk7XHJcblxyXG5cdFx0XHRpZiAobWF4V2lkdGggPiAwICYmIG5ld1dpZHRoID4gbWF4V2lkdGgpIHtcclxuXHRcdFx0XHRuZXdXaWR0aCA9IG1heFdpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtaW5XaWR0aCA+IDAgJiYgbmV3V2lkdGggPCBtaW5XaWR0aCkge1xyXG5cdFx0XHRcdG5ld1dpZHRoID0gbWluV2lkdGg7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFvcHRpb25zLnJlc2l6ZVdpZHRoKSB7XHJcblx0XHRcdFx0bmV3V2lkdGggPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG1heEhlaWdodCA+IDAgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtaW5IZWlnaHQgPiAwICYmIG5ld0hlaWdodCA8IG1pbkhlaWdodCkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IG1pbkhlaWdodDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIW9wdGlvbnMucmVzaXplSGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChuZXdXaWR0aCB8fCBuZXdIZWlnaHQpIHtcclxuXHRcdFx0XHRiYXNlLmRpbWVuc2lvbnMobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0bW91c2VVcEZ1bmMgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRpZiAoIWlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdGRvbS5oaWRlKGNvdmVyKTtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XHJcblx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0ZG9tLm9mZihnbG9iYWxEb2MsIGVuZEV2ZW50cywgbW91c2VVcEZ1bmMpO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoaWNvbnMgJiYgaWNvbnMuY3JlYXRlKSB7XHJcblx0XHRcdHZhciBpY29uID0gaWNvbnMuY3JlYXRlKCdncmlwJyk7XHJcblx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGdyaXAsIGljb24pO1xyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhncmlwLCAnaGFzLWljb24nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIGdyaXApO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgY292ZXIpO1xyXG5cdFx0ZG9tLmhpZGUoY292ZXIpO1xyXG5cclxuXHRcdGRvbS5vbihncmlwLCAndG91Y2hzdGFydCBtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHQvLyBpT1MgdXNlcyB3aW5kb3cuZXZlbnRcclxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcblx0XHRcdFx0ZSAgICAgID0gZ2xvYmFsV2luLmV2ZW50O1xyXG5cdFx0XHRcdHN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRzdGFydFkgPSBlLnRvdWNoZXNbMF0ucGFnZVk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c3RhcnRYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRzdGFydFkgPSBlLnBhZ2VZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdGFydFdpZHRoICA9IGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xyXG5cdFx0XHRzdGFydEhlaWdodCA9IGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdFx0aXNEcmFnZ2luZyAgPSB0cnVlO1xyXG5cclxuXHRcdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XHJcblx0XHRcdGRvbS5zaG93KGNvdmVyKTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbW91c2VNb3ZlRnVuYyk7XHJcblx0XHRcdGRvbS5vbihnbG9iYWxEb2MsIGVuZEV2ZW50cywgbW91c2VVcEZ1bmMpO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUHJlZml4ZXMgYW5kIHByZWxvYWRzIHRoZSBlbW90aWNvbiBpbWFnZXNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGluaXRFbW90aWNvbnMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXJcdGVtb3RpY29ucyA9IG9wdGlvbnMuZW1vdGljb25zO1xyXG5cdFx0dmFyIHJvb3QgICAgICA9IG9wdGlvbnMuZW1vdGljb25zUm9vdCB8fCAnJztcclxuXHJcblx0XHRpZiAoZW1vdGljb25zKSB7XHJcblx0XHRcdGFsbEVtb3RpY29ucyA9IHV0aWxzLmV4dGVuZChcclxuXHRcdFx0XHR7fSwgZW1vdGljb25zLm1vcmUsIGVtb3RpY29ucy5kcm9wZG93biwgZW1vdGljb25zLmhpZGRlblxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCB1cmwpIHtcclxuXHRcdFx0YWxsRW1vdGljb25zW2tleV0gPSBfdG1wbCgnZW1vdGljb24nLCB7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0Ly8gUHJlZml4IGVtb3RpY29uIHJvb3QgdG8gZW1vdGljb24gdXJsc1xyXG5cdFx0XHRcdHVybDogcm9vdCArICh1cmwudXJsIHx8IHVybCksXHJcblx0XHRcdFx0dG9vbHRpcDogdXJsLnRvb2x0aXAgfHwga2V5XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUHJlbG9hZCB0aGUgZW1vdGljb25cclxuXHRcdFx0aWYgKG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCkge1xyXG5cdFx0XHRcdHByZUxvYWRDYWNoZS5wdXNoKGRvbS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRzcmM6IHJvb3QgKyAodXJsLnVybCB8fCB1cmwpXHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBdXRvZm9jdXMgdGhlIGVkaXRvclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0YXV0b2ZvY3VzID0gZnVuY3Rpb24gKGZvY3VzRW5kKSB7XHJcblx0XHR2YXJcdHJhbmdlLCB0eHRQb3MsXHJcblx0XHRcdG5vZGUgPSB3eXNpd3lnQm9keS5maXJzdENoaWxkO1xyXG5cclxuXHRcdC8vIENhbid0IGZvY3VzIGludmlzaWJsZSBlbGVtZW50c1xyXG5cdFx0aWYgKCFkb20uaXNWaXNpYmxlKGVkaXRvckNvbnRhaW5lcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChiYXNlLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0eHRQb3MgPSBmb2N1c0VuZCA/IHNvdXJjZUVkaXRvci52YWx1ZS5sZW5ndGggOiAwO1xyXG5cclxuXHRcdFx0c291cmNlRWRpdG9yLnNldFNlbGVjdGlvblJhbmdlKHR4dFBvcywgdHh0UG9zKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ucmVtb3ZlV2hpdGVTcGFjZSh3eXNpd3lnQm9keSk7XHJcblxyXG5cdFx0aWYgKGZvY3VzRW5kKSB7XHJcblx0XHRcdGlmICghKG5vZGUgPSB3eXNpd3lnQm9keS5sYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0bm9kZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKG5vZGUubGFzdENoaWxkKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUubGFzdENoaWxkO1xyXG5cclxuXHRcdFx0XHQvLyBTaG91bGQgcGxhY2UgdGhlIGN1cnNvciBiZWZvcmUgdGhlIGxhc3QgPGJyPlxyXG5cdFx0XHRcdGlmIChkb20uaXMobm9kZSwgJ2JyJykgJiYgbm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZSA9IHd5c2l3eWdEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRcdGlmICghZG9tLmNhbkhhdmVDaGlsZHJlbihub2RlKSkge1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShub2RlKTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0QWZ0ZXIobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZS5jb2xsYXBzZSghZm9jdXNFbmQpO1xyXG5cdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2UocmFuZ2UpO1xyXG5cdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlO1xyXG5cclxuXHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHR3eXNpd3lnQm9keS5zY3JvbGxUb3AgPSB3eXNpd3lnQm9keS5zY3JvbGxIZWlnaHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0YmFzZS5mb2N1cygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHlcclxuXHQgKlxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSByZWFkT25seVxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seVxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSByZWFkT25seVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSByZWFkT25seV4yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiYXNlLnJlYWRPbmx5ID0gZnVuY3Rpb24gKHJlYWRPbmx5KSB7XHJcblx0XHRpZiAodHlwZW9mIHJlYWRPbmx5ICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuICFzb3VyY2VFZGl0b3IucmVhZG9ubHk7XHJcblx0XHR9XHJcblxyXG5cdFx0d3lzaXd5Z0JvZHkuY29udGVudEVkaXRhYmxlID0gIXJlYWRPbmx5O1xyXG5cdFx0c291cmNlRWRpdG9yLnJlYWRvbmx5ID0gIXJlYWRPbmx5O1xyXG5cclxuXHRcdHVwZGF0ZVRvb2xCYXIocmVhZE9ubHkpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBSVEwgbW9kZVxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIHJ0bFxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIFJUTCBtb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBydGxeMlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0YmFzZS5ydGwgPSBmdW5jdGlvbiAocnRsKSB7XHJcblx0XHR2YXIgZGlyID0gcnRsID8gJ3J0bCcgOiAnbHRyJztcclxuXHJcblx0XHRpZiAodHlwZW9mIHJ0bCAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdHJldHVybiBkb20uYXR0cihzb3VyY2VFZGl0b3IsICdkaXInKSA9PT0gJ3J0bCc7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmF0dHIod3lzaXd5Z0JvZHksICdkaXInLCBkaXIpO1xyXG5cdFx0ZG9tLmF0dHIoc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcclxuXHJcblx0XHRkb20ucmVtb3ZlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAncnRsJyk7XHJcblx0XHRkb20ucmVtb3ZlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnbHRyJyk7XHJcblx0XHRkb20uYWRkQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBkaXIpO1xyXG5cclxuXHRcdGlmIChpY29ucyAmJiBpY29ucy5ydGwpIHtcclxuXHRcdFx0aWNvbnMucnRsKHJ0bCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJhc2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdG9vbGJhciB0byBkaXNhYmxlL2VuYWJsZSB0aGUgYXBwcm9wcmlhdGUgYnV0dG9uc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dXBkYXRlVG9vbEJhciA9IGZ1bmN0aW9uIChkaXNhYmxlKSB7XHJcblx0XHR2YXIgbW9kZSA9IGJhc2UuaW5Tb3VyY2VNb2RlKCkgPyAnX3NjZVR4dE1vZGUnIDogJ19zY2VXeXNpd3lnTW9kZSc7XHJcblxyXG5cdFx0dXRpbHMuZWFjaCh0b29sYmFyQnV0dG9ucywgZnVuY3Rpb24gKF8sIGJ1dHRvbikge1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCBkaXNhYmxlIHx8ICFidXR0b25bbW9kZV0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgd2lkdGggb2YgdGhlIGVkaXRvciBpbiBwaXhlbHNcclxuXHQgKlxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSB3aWR0aFxyXG5cdCAqIEByZXR1cm4ge251bWJlcn1cclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggV2lkdGggaW4gcGl4ZWxzXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIHdpZHRoXjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHdpZHRoIG9mIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIFRoZSBzYXZlV2lkdGggc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIHdpZHRoLiBUaGUgc3RvcmVkIHdpZHRoIGNhbiBiZVxyXG5cdCAqIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tIG1heGltaXplZCBzdGF0ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSAgICAgd2lkdGggICAgICAgICAgICBXaWR0aCBpbiBwaXhlbHNcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZVdpZHRoPXRydWVdIElmIHRvIHN0b3JlIHRoZSB3aWR0aFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSB3aWR0aF4zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiYXNlLndpZHRoID0gZnVuY3Rpb24gKHdpZHRoLCBzYXZlV2lkdGgpIHtcclxuXHRcdGlmICghd2lkdGggJiYgd2lkdGggIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2UuZGltZW5zaW9ucyh3aWR0aCwgbnVsbCwgc2F2ZVdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIHdpZHRoIGFuZCBoZWlnaHRcclxuXHQgKiB3aGljaCBhcmUgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGVkaXRvciBpbiBweC5cclxuXHQgKlxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBkaW1lbnNpb25zXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIDxwPlNldHMgdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGVkaXRvci48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiB3aWR0aCBvciBoZWlnaHQgaXMgbm90IG51bWVyaWMgaXQgaXMgaWdub3JlZC48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn1cdHdpZHRoXHRXaWR0aCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfVx0aGVpZ2h0XHRIZWlnaHQgaW4gcHhcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgZGltZW5zaW9uc14yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiA8cD5TZXRzIHRoZSB3aWR0aCBhbmQvb3IgaGVpZ2h0IG9mIHRoZSBlZGl0b3IuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgd2lkdGggb3IgaGVpZ2h0IGlzIG5vdCBudW1lcmljIGl0IGlzIGlnbm9yZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHNhdmUgYXJndW1lbnQgc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIG5ldyBzaXplcy5cclxuXHQgKiBUaGUgc2F2ZWQgc2l6ZXMgY2FuIGJlIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tXHJcblx0ICogbWF4aW1pemVkIHN0YXRlLiBUaGlzIHNob3VsZCBub3JtYWxseSBiZSBsZWZ0IGFzIHRydWUuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdHdpZHRoXHRcdFdpZHRoIGluIHB4XHJcblx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdGhlaWdodFx0XHRIZWlnaHQgaW4gcHhcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZT10cnVlXVx0SWYgdG8gc3RvcmUgdGhlIG5ldyBzaXplc1xyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBkaW1lbnNpb25zXjNcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGJhc2UuZGltZW5zaW9ucyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBzYXZlKSB7XHJcblx0XHQvLyBzZXQgdW5kZWZpbmVkIHdpZHRoL2hlaWdodCB0byBib29sZWFuIGZhbHNlXHJcblx0XHR3aWR0aCAgPSAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSA/IGZhbHNlIDogd2lkdGg7XHJcblx0XHRoZWlnaHQgPSAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApID8gZmFsc2UgOiBoZWlnaHQ7XHJcblxyXG5cdFx0aWYgKHdpZHRoID09PSBmYWxzZSAmJiBoZWlnaHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiB7IHdpZHRoOiBiYXNlLndpZHRoKCksIGhlaWdodDogYmFzZS5oZWlnaHQoKSB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh3aWR0aCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyLCB3aWR0aCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhlaWdodCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyLCBoZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yIGluIHB4XHJcblx0ICpcclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgaGVpZ2h0XHJcblx0ICogQHJldHVybiB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBoZWlnaHReMlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXHJcblx0ICpcclxuXHQgKiBUaGUgc3RvcmVkIGhlaWdodCBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2VcclxuXHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBoZWlnaHReM1xyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0YmFzZS5oZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0LCBzYXZlSGVpZ2h0KSB7XHJcblx0XHRpZiAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRiYXNlLmRpbWVuc2lvbnMobnVsbCwgaGVpZ2h0LCBzYXZlSGVpZ2h0KTtcclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIG1heGltaXplXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBtYXhpbWl6ZSBJZiB0byBtYXhpbWlzZSB0aGUgZWRpdG9yXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIG1heGltaXplXjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGJhc2UubWF4aW1pemUgPSBmdW5jdGlvbiAobWF4aW1pemUpIHtcclxuXHRcdHZhciBtYXhpbWl6ZVNpemUgPSAnc2NlZGl0b3ItbWF4aW1pemUnO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1VuZGVmaW5lZChtYXhpbWl6ZSkpIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyhlZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWF4aW1pemUgPSAhIW1heGltaXplO1xyXG5cclxuXHRcdGlmIChtYXhpbWl6ZSkge1xyXG5cdFx0XHRtYXhpbWl6ZVNjcm9sbFBvc2l0aW9uID0gZ2xvYmFsV2luLnBhZ2VZT2Zmc2V0O1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS50b2dnbGVDbGFzcyhnbG9iYWxEb2MuZG9jdW1lbnRFbGVtZW50LCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdGRvbS50b2dnbGVDbGFzcyhnbG9iYWxEb2MuYm9keSwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdGJhc2Uud2lkdGgobWF4aW1pemUgPyAnMTAwJScgOiBvcHRpb25zLndpZHRoLCBmYWxzZSk7XHJcblx0XHRiYXNlLmhlaWdodChtYXhpbWl6ZSA/ICcxMDAlJyA6IG9wdGlvbnMuaGVpZ2h0LCBmYWxzZSk7XHJcblxyXG5cdFx0aWYgKCFtYXhpbWl6ZSkge1xyXG5cdFx0XHRnbG9iYWxXaW4uc2Nyb2xsVG8oMCwgbWF4aW1pemVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0YXV0b0V4cGFuZCgpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdGF1dG9FeHBhbmQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAob3B0aW9ucy5hdXRvRXhwYW5kICYmICFhdXRvRXhwYW5kVGhyb3R0bGUpIHtcclxuXHRcdFx0YXV0b0V4cGFuZFRocm90dGxlID0gc2V0VGltZW91dChiYXNlLmV4cGFuZFRvQ29udGVudCwgMjAwKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeHBhbmRzIG9yIHNocmlua3MgdGhlIGVkaXRvcnMgaGVpZ2h0IHRvIHRoZSBoZWlnaHQgb2YgaXQncyBjb250ZW50XHJcblx0ICpcclxuXHQgKiBVbmxlc3MgaWdub3JlTWF4SGVpZ2h0IGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbm90IGV4cGFuZFxyXG5cdCAqIGhpZ2hlciB0aGFuIHRoZSBtYXhIZWlnaHQgb3B0aW9uLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlTWF4SGVpZ2h0PWZhbHNlXVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGV4cGFuZFRvQ29udGVudFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2VlICNyZXNpemVUb0NvbnRlbnRcclxuXHQgKi9cclxuXHRiYXNlLmV4cGFuZFRvQ29udGVudCA9IGZ1bmN0aW9uIChpZ25vcmVNYXhIZWlnaHQpIHtcclxuXHRcdGlmIChiYXNlLm1heGltaXplKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsZWFyVGltZW91dChhdXRvRXhwYW5kVGhyb3R0bGUpO1xyXG5cdFx0YXV0b0V4cGFuZFRocm90dGxlID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCFhdXRvRXhwYW5kQm91bmRzKSB7XHJcblx0XHRcdHZhciBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZU1pbkhlaWdodCB8fCBvcHRpb25zLmhlaWdodCB8fFxyXG5cdFx0XHRcdGRvbS5oZWlnaHQob3JpZ2luYWwpO1xyXG5cclxuXHRcdFx0YXV0b0V4cGFuZEJvdW5kcyA9IHtcclxuXHRcdFx0XHRtaW46IGhlaWdodCxcclxuXHRcdFx0XHRtYXg6IG9wdGlvbnMucmVzaXplTWF4SGVpZ2h0IHx8IChoZWlnaHQgKiAyKVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciByYW5nZSA9IGdsb2JhbERvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHR2YXIgcmVjdCA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0dmFyIGN1cnJlbnQgPSB3eXNpd3lnRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDE7XHJcblx0XHR2YXIgc3BhY2VOZWVkZWQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wO1xyXG5cdFx0dmFyIG5ld0hlaWdodCA9IGJhc2UuaGVpZ2h0KCkgKyAxICsgKHNwYWNlTmVlZGVkIC0gY3VycmVudCk7XHJcblxyXG5cdFx0aWYgKCFpZ25vcmVNYXhIZWlnaHQgJiYgYXV0b0V4cGFuZEJvdW5kcy5tYXggIT09IC0xKSB7XHJcblx0XHRcdG5ld0hlaWdodCA9IE1hdGgubWluKG5ld0hlaWdodCwgYXV0b0V4cGFuZEJvdW5kcy5tYXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2UuaGVpZ2h0KE1hdGguY2VpbChNYXRoLm1heChuZXdIZWlnaHQsIGF1dG9FeHBhbmRCb3VuZHMubWluKSkpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoZSBlZGl0b3IsIHJlbW92aW5nIGFsbCBlbGVtZW50cyBhbmRcclxuXHQgKiBldmVudCBoYW5kbGVycy5cclxuXHQgKlxyXG5cdCAqIExlYXZlcyBvbmx5IHRoZSBvcmlnaW5hbCB0ZXh0YXJlYS5cclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGRlc3Ryb3lcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gRG9uJ3QgZGVzdHJveSBpZiB0aGUgZWRpdG9yIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkXHJcblx0XHRpZiAoIXBsdWdpbk1hbmFnZXIpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBsdWdpbk1hbmFnZXIuZGVzdHJveSgpO1xyXG5cclxuXHRcdHJhbmdlSGVscGVyICAgPSBudWxsO1xyXG5cdFx0cGx1Z2luTWFuYWdlciA9IG51bGw7XHJcblxyXG5cdFx0aWYgKGRyb3Bkb3duKSB7XHJcblx0XHRcdGRvbS5yZW1vdmUoZHJvcGRvd24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCAnY2xpY2snLCBoYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHR2YXIgZm9ybSA9IG9yaWdpbmFsLmZvcm07XHJcblx0XHRpZiAoZm9ybSkge1xyXG5cdFx0XHRkb20ub2ZmKGZvcm0sICdyZXNldCcsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdGRvbS5vZmYoZm9ybSwgJ3N1Ym1pdCcsIGJhc2UudXBkYXRlT3JpZ2luYWwsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub2ZmKHdpbmRvdywgJ3BhZ2VoaWRlJywgYmFzZS51cGRhdGVPcmlnaW5hbCk7XHJcblx0XHRkb20ub2ZmKHdpbmRvdywgJ3BhZ2VzaG93JywgaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5yZW1vdmUoc291cmNlRWRpdG9yKTtcclxuXHRcdGRvbS5yZW1vdmUodG9vbGJhcik7XHJcblx0XHRkb20ucmVtb3ZlKGVkaXRvckNvbnRhaW5lcik7XHJcblxyXG5cdFx0ZGVsZXRlIG9yaWdpbmFsLl9zY2VkaXRvcjtcclxuXHRcdGRvbS5zaG93KG9yaWdpbmFsKTtcclxuXHJcblx0XHRvcmlnaW5hbC5yZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZW51IGl0ZW0gZHJvcCBkb3duXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW0gVGhlIGJ1dHRvbiB0byBhbGlnbiB0aGUgZHJvcGRvd24gd2l0aFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgICAgICAgICBVc2VkIGZvciBzdHlsaW5nIHRoZSBkcm9wZG93biwgd2lsbCBiZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGNsYXNzIHNjZWRpdG9yLW5hbWVcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udGVudCAgVGhlIEhUTUwgY29udGVudCBvZiB0aGUgZHJvcGRvd25cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjcmVhdGVEcm9wRG93blxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmNyZWF0ZURyb3BEb3duID0gZnVuY3Rpb24gKG1lbnVJdGVtLCBuYW1lLCBjb250ZW50KSB7XHJcblx0XHQvLyBmaXJzdCBjbGljayBmb3IgY3JlYXRlIHNlY29uZCBjbGljayBmb3IgY2xvc2VcclxuXHRcdHZhclx0ZHJvcERvd25Dc3MsXHJcblx0XHRcdGRyb3BEb3duQ2xhc3MgPSAnc2NlZGl0b3ItJyArIG5hbWU7XHJcblxyXG5cdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblxyXG5cdFx0Ly8gT25seSBjbG9zZSB0aGUgZHJvcGRvd24gaWYgaXQgd2FzIGFscmVhZHkgb3BlblxyXG5cdFx0aWYgKGRyb3Bkb3duICYmIGRvbS5oYXNDbGFzcyhkcm9wZG93biwgZHJvcERvd25DbGFzcykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRyb3BEb3duQ3NzID0gdXRpbHMuZXh0ZW5kKHtcclxuXHRcdFx0dG9wOiBtZW51SXRlbS5vZmZzZXRUb3AsXHJcblx0XHRcdGxlZnQ6IG1lbnVJdGVtLm9mZnNldExlZnQsXHJcblx0XHRcdG1hcmdpblRvcDogbWVudUl0ZW0uY2xpZW50SGVpZ2h0XHJcblx0XHR9LCBvcHRpb25zLmRyb3BEb3duQ3NzKTtcclxuXHJcblx0XHRkcm9wZG93biA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLWRyb3Bkb3duICcgKyBkcm9wRG93bkNsYXNzXHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20uY3NzKGRyb3Bkb3duLCBkcm9wRG93bkNzcyk7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQoZHJvcGRvd24sIGNvbnRlbnQpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgZHJvcGRvd24pO1xyXG5cdFx0ZG9tLm9uKGRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdC8vIHN0b3AgY2xpY2tzIHdpdGhpbiB0aGUgZHJvcGRvd24gZnJvbSBiZWluZyBoYW5kbGVkXHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoZHJvcGRvd24pIHtcclxuXHRcdFx0dmFyIGZpcnN0ID0gZG9tLmZpbmQoZHJvcGRvd24sICdpbnB1dCx0ZXh0YXJlYScpWzBdO1xyXG5cdFx0XHRpZiAoZmlyc3QpIHtcclxuXHRcdFx0XHRmaXJzdC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkgZG9jdW1lbnQgY2xpY2sgYW5kIGNsb3NlcyB0aGUgZHJvcGRvd24gaWYgb3BlblxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlRG9jdW1lbnRDbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvLyBpZ25vcmUgcmlnaHQgY2xpY2tzXHJcblx0XHRpZiAoZS53aGljaCAhPT0gMyAmJiBkcm9wZG93biAmJiAhZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdGF1dG9VcGRhdGUoKTtcclxuXHJcblx0XHRcdGJhc2UuY2xvc2VEcm9wRG93bigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjdXQgJiBjb3B5IGV2ZW50c1xyXG5cdCAqXHJcblx0ICogQnkgZGVmYXVsdCBicm93c2VycyBhbHNvIGNvcHkgaW5oZXJpdGVkIHN0eWxpbmcgZnJvbSB0aGUgc3R5bGVzaGVldCBhbmRcclxuXHQgKiBicm93c2VyIGRlZmF1bHQgc3R5bGluZyB3aGljaCBpcyB1bm5lY2Vzc2FyeS5cclxuXHQgKlxyXG5cdCAqIFRoaXMgd2lsbCBpZ25vcmUgaW5oZXJpdGVkIHN0eWxlcyBhbmQgb25seSBjb3B5IGlubGluZSBzdHlsaW5nLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlQ3V0Q29weUV2dCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgcmFuZ2UgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0dmFyIGNvbnRhaW5lciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0dmFyIGZpcnN0UGFyZW50O1xyXG5cclxuXHRcdFx0Ly8gQ29weSBhbGwgaW5saW5lIHBhcmVudCBub2RlcyB1cCB0byB0aGUgZmlyc3QgYmxvY2sgcGFyZW50IHNvIGNhblxyXG5cdFx0XHQvLyBjb3B5IGlubGluZSBzdHlsZXNcclxuXHRcdFx0dmFyIHBhcmVudCA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xyXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0aWYgKHBhcmVudC5ub2RlVHlwZSA9PT0gZG9tLkVMRU1FTlRfTk9ERSkge1xyXG5cdFx0XHRcdFx0dmFyIGNsb25lID0gcGFyZW50LmNsb25lTm9kZSgpO1xyXG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjbG9uZSwgY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250YWluZXIsIGNsb25lKTtcclxuXHRcdFx0XHRcdGZpcnN0UGFyZW50ID0gZmlyc3RQYXJlbnQgfHwgY2xvbmU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZmlyc3RQYXJlbnQgfHwgY29udGFpbmVyLCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG5cdFx0XHRkb20ucmVtb3ZlV2hpdGVTcGFjZShjb250YWluZXIpO1xyXG5cclxuXHRcdFx0ZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvaHRtbCcsIGNvbnRhaW5lci5pbm5lckhUTUwpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogUmVmYWN0b3IgaW50byBwcml2YXRlIHNoYXJlZCBtb2R1bGUgd2l0aCBwbGFpbnRleHQgcGx1Z2luXHJcblx0XHRcdC8vIGlubmVyVGV4dCBhZGRzIHR3byBuZXdsaW5lcyBhZnRlciA8cD4gdGFncyBzbyBjb252ZXJ0IHRoZW0gdG9cclxuXHRcdFx0Ly8gPGRpdj4gdGFnc1xyXG5cdFx0XHR1dGlscy5lYWNoKGRvbS5maW5kKGNvbnRhaW5lciwgJ3AnKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xyXG5cdFx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChlbG0sICdkaXYnKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdC8vIFJlbW92ZSBjb2xsYXBzZWQgPGJyPiB0YWdzIGFzIGlubmVyVGV4dCBjb252ZXJ0cyB0aGVtIHRvIG5ld2xpbmVzXHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAnYnInKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xyXG5cdFx0XHRcdGlmICghZWxtLm5leHRTaWJsaW5nIHx8ICFkb20uaXNJbmxpbmUoZWxtLm5leHRTaWJsaW5nLCB0cnVlKSkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShlbG0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyByYW5nZS50b1N0cmluZygpIGRvZXNuJ3QgaW5jbHVkZSBuZXdsaW5lcyBzbyBjYW4ndCB1c2UgdGhhdC5cclxuXHRcdFx0Ly8gc2VsZWN0aW9uLnRvU3RyaW5nKCkgc2VlbXMgdG8gdXNlIHRoZSBzYW1lIG1ldGhvZCBhcyBpbm5lclRleHRcclxuXHRcdFx0Ly8gYnV0IG5lZWRzIHRvIGJlIG5vcm1hbGlzZWQgZmlyc3Qgc28gdXNpbmcgY29udGFpbmVyLmlubmVyVGV4dFxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIGNvbnRhaW5lcik7XHJcblx0XHRcdGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L3BsYWluJywgY29udGFpbmVyLmlubmVyVGV4dCk7XHJcblx0XHRcdGRvbS5yZW1vdmUoY29udGFpbmVyKTtcclxuXHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICdjdXQnKSB7XHJcblx0XHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBwYXN0ZSBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlUGFzdGVFdnQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIGVkaXRhYmxlID0gd3lzaXd5Z0JvZHk7XHJcblx0XHR2YXIgY2xpcGJvYXJkID0gZS5jbGlwYm9hcmREYXRhO1xyXG5cdFx0dmFyIGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChmaWxlKSB7XHJcblx0XHRcdHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRoYW5kbGVQYXN0ZURhdGEoe1xyXG5cdFx0XHRcdFx0aHRtbDogJzxpbWcgc3JjPVwiJyArIGUudGFyZ2V0LnJlc3VsdCArICdcIiAvPidcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE1vZGVybiBicm93c2VycyB3aXRoIGNsaXBib2FyZCBBUEkgLSBldmVyeXRoaW5nIG90aGVyIHRoYW4gX3ZlcnlfXHJcblx0XHQvLyBvbGQgYW5kcm9pZCB3ZWIgdmlld3MgYW5kIFVDIGJyb3dzZXIgd2hpY2ggZG9lc24ndCBzdXBwb3J0IHRoZVxyXG5cdFx0Ly8gcGFzdGUgZXZlbnQgYXQgYWxsLlxyXG5cdFx0aWYgKGNsaXBib2FyZCkge1xyXG5cdFx0XHR2YXIgZGF0YSA9IHt9O1xyXG5cdFx0XHR2YXIgdHlwZXMgPSBjbGlwYm9hcmQudHlwZXM7XHJcblx0XHRcdHZhciBpdGVtcyA9IGNsaXBib2FyZC5pdGVtcztcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHQvLyBXb3JkIHNvbWV0aW1lcyBhZGRzIGNvcGllZCB0ZXh0IGFzIGFuIGltYWdlIHNvIGlmIEhUTUxcclxuXHRcdFx0XHQvLyBleGlzdHMgcHJlZmVyIHRoYXQgb3ZlciBpbWFnZXNcclxuXHRcdFx0XHRpZiAodHlwZXMuaW5kZXhPZigndGV4dC9odG1sJykgPCAwKSB7XHJcblx0XHRcdFx0XHQvLyBOb3JtYWxpc2UgaW1hZ2UgcGFzdGluZyB0byBwYXN0ZSBhcyBhIGRhdGEtdXJpXHJcblx0XHRcdFx0XHRpZiAoZ2xvYmFsV2luLkZpbGVSZWFkZXIgJiYgaXRlbXMgJiZcclxuXHRcdFx0XHRcdFx0SU1BR0VfTUlNRV9SRUdFWC50ZXN0KGl0ZW1zW2ldLnR5cGUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBsb2FkSW1hZ2UoY2xpcGJvYXJkLml0ZW1zW2ldLmdldEFzRmlsZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRhdGFbdHlwZXNbaV1dID0gY2xpcGJvYXJkLmdldERhdGEodHlwZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIENhbGwgcGx1Z2lucyBoZXJlIHdpdGggZmlsZT9cclxuXHRcdFx0ZGF0YS50ZXh0ID0gZGF0YVsndGV4dC9wbGFpbiddO1xyXG5cdFx0XHRkYXRhLmh0bWwgPSBzYW5pdGl6ZShkYXRhWyd0ZXh0L2h0bWwnXSk7XHJcblxyXG5cdFx0XHRoYW5kbGVQYXN0ZURhdGEoZGF0YSk7XHJcblx0XHQvLyBJZiBjb250ZW50c0ZyYWdtZW50IGV4aXN0cyB0aGVuIHdlIGFyZSBhbHJlYWR5IHdhaXRpbmcgZm9yIGFcclxuXHRcdC8vIHByZXZpb3VzIHBhc3RlIHNvIGxldCB0aGUgaGFuZGxlciBmb3IgdGhhdCBoYW5kbGUgdGhpcyBvbmUgdG9vXHJcblx0XHR9IGVsc2UgaWYgKCFwYXN0ZUNvbnRlbnRGcmFnbWVudCkge1xyXG5cdFx0XHQvLyBTYXZlIHRoZSBzY3JvbGwgcG9zaXRpb24gc28gY2FuIGJlIHJlc3RvcmVkXHJcblx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCA9IGVkaXRhYmxlLnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cclxuXHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBnbG9iYWxEb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHR3aGlsZSAoZWRpdGFibGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChwYXN0ZUNvbnRlbnRGcmFnbWVudCwgZWRpdGFibGUuZmlyc3RDaGlsZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBodG1sID0gZWRpdGFibGUuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdGFibGUsIHBhc3RlQ29udGVudEZyYWdtZW50KTtcclxuXHRcdFx0XHRlZGl0YWJsZS5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcblx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdGhhbmRsZVBhc3RlRGF0YSh7IGh0bWw6IHNhbml0aXplKGh0bWwpIH0pO1xyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBwYXN0ZWQgZGF0YSwgZmlsdGVycyBpdCBhbmQgdGhlbiBpbnNlcnRzIGl0LlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRoYW5kbGVQYXN0ZURhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0dmFyIHBhc3RlQXJlYSA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHJcblx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlUmF3JywgZGF0YSk7XHJcblx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdwYXN0ZXJhdycsIGRhdGEpO1xyXG5cclxuXHRcdGlmIChkYXRhLmh0bWwpIHtcclxuXHRcdFx0Ly8gU2FuaXRpemUgYWdhaW4gaW4gY2FzZSBwbHVnaW5zIG1vZGlmaWVkIHRoZSBIVE1MXHJcblx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBzYW5pdGl6ZShkYXRhLmh0bWwpO1xyXG5cclxuXHRcdFx0Ly8gZml4IGFueSBpbnZhbGlkIG5lc3RpbmdcclxuXHRcdFx0ZG9tLmZpeE5lc3RpbmcocGFzdGVBcmVhKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBlc2NhcGUuZW50aXRpZXMoZGF0YS50ZXh0IHx8ICcnKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcGFzdGUgPSB7XHJcblx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRwYXN0ZS52YWwgPSBmb3JtYXRcclxuXHRcdFx0XHQuZnJhZ21lbnRUb1NvdXJjZShwYXN0ZS52YWwsIHd5c2l3eWdEb2N1bWVudCwgY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGUnLCBwYXN0ZSk7XHJcblx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0cGFzdGUudmFsID0gZm9ybWF0XHJcblx0XHRcdFx0LmZyYWdtZW50VG9IdG1sKHBhc3RlLnZhbCwgY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGVIdG1sJywgcGFzdGUpO1xyXG5cclxuXHRcdHZhciBwYXJlbnQgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblx0XHRiYXNlLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKHBhc3RlLnZhbCwgbnVsbCwgdHJ1ZSk7XHJcblx0XHRkb20ubWVyZ2UocGFyZW50KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDbG9zZXMgYW55IGN1cnJlbnRseSBvcGVuIGRyb3AgZG93blxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbZm9jdXM9ZmFsc2VdIElmIHRvIGZvY3VzIHRoZSBlZGl0b3JcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgY2xvc2luZyB0aGUgZHJvcCBkb3duXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY2xvc2VEcm9wRG93blxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmNsb3NlRHJvcERvd24gPSBmdW5jdGlvbiAoZm9jdXMpIHtcclxuXHRcdGlmIChkcm9wZG93bikge1xyXG5cdFx0XHRkb20ucmVtb3ZlKGRyb3Bkb3duKTtcclxuXHRcdFx0ZHJvcGRvd24gPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChmb2N1cyA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRiYXNlLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEluc2VydHMgSFRNTCBpbnRvIFdZU0lXWUcgZWRpdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgZW5kSHRtbCBpcyBzcGVjaWZpZWQsIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkXHJcblx0ICogYmV0d2VlbiBodG1sIGFuZCBlbmRIdG1sLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IGh0bWxcclxuXHQgKiBhbmQgZW5kSHRtbCB3aWxsIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kSHRtbD1udWxsXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW292ZXJyaWRlQ29kZUJsb2NraW5nPWZhbHNlXSBJZiB0byBpbnNlcnQgdGhlIGh0bWxcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50byBjb2RlIHRhZ3MsIGJ5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgY29kZSB0YWdzIG9ubHlcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCB0ZXh0LlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwgPSBmdW5jdGlvbiAoXHJcblx0XHRodG1sLCBlbmRIdG1sLCBvdmVycmlkZUNvZGVCbG9ja2luZ1xyXG5cdCkge1xyXG5cdFx0dmFyXHRtYXJrZXIsIHNjcm9sbFRvcCwgc2Nyb2xsVG8sXHJcblx0XHRcdGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQod3lzaXd5Z0VkaXRvcik7XHJcblxyXG5cdFx0YmFzZS5mb2N1cygpO1xyXG5cclxuXHRcdC8vIFRPRE86IFRoaXMgY29kZSB0YWcgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSBhbmRcclxuXHRcdC8vIHNob3VsZCBtYXliZSBjb252ZXJ0IHRoZSBIVE1MIGludG8gdGV4dCBpbnN0ZWFkXHJcblx0XHQvLyBEb24ndCBhcHBseSB0byBjb2RlIGVsZW1lbnRzXHJcblx0XHRpZiAoIW92ZXJyaWRlQ29kZUJsb2NraW5nICYmIGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEluc2VydCB0aGUgSFRNTCBhbmQgc2F2ZSB0aGUgcmFuZ2Ugc28gdGhlIGVkaXRvciBjYW4gYmUgc2Nyb2xsZWRcclxuXHRcdC8vIHRvIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvbi4gQWxzbyBhbGxvd3MgZW1vdGljb25zIHRvIGJlIHJlcGxhY2VkXHJcblx0XHQvLyB3aXRob3V0IGFmZmVjdGluZyB0aGUgY3Vyc29yIHBvc2l0aW9uXHJcblx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKGh0bWwsIGVuZEh0bWwpO1xyXG5cdFx0cmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblxyXG5cdFx0Ly8gRml4IGFueSBpbnZhbGlkIG5lc3RpbmcsIGUuZy4gaWYgYSBxdW90ZSBvciBvdGhlciBibG9jayBpcyBpbnNlcnRlZFxyXG5cdFx0Ly8gaW50byBhIHBhcmFncmFwaFxyXG5cdFx0ZG9tLmZpeE5lc3Rpbmcod3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdHdyYXBJbmxpbmVzKHd5c2l3eWdCb2R5LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdC8vIFNjcm9sbCB0aGUgZWRpdG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvblxyXG5cdFx0bWFya2VyICAgPSBkb20uZmluZCh3eXNpd3lnQm9keSwgJyNzY2VkaXRvci1lbmQtbWFya2VyJylbMF07XHJcblx0XHRkb20uc2hvdyhtYXJrZXIpO1xyXG5cdFx0c2Nyb2xsVG9wID0gd3lzaXd5Z0JvZHkuc2Nyb2xsVG9wO1xyXG5cdFx0c2Nyb2xsVG8gID0gKGRvbS5nZXRPZmZzZXQobWFya2VyKS50b3AgK1xyXG5cdFx0XHQobWFya2VyLm9mZnNldEhlaWdodCAqIDEuNSkpIC0gZWRpdG9ySGVpZ2h0O1xyXG5cdFx0ZG9tLmhpZGUobWFya2VyKTtcclxuXHJcblx0XHQvLyBPbmx5IHNjcm9sbCBpZiBtYXJrZXIgaXNuJ3QgYWxyZWFkeSB2aXNpYmxlXHJcblx0XHRpZiAoc2Nyb2xsVG8gPiBzY3JvbGxUb3AgfHwgc2Nyb2xsVG8gKyBlZGl0b3JIZWlnaHQgPCBzY3JvbGxUb3ApIHtcclxuXHRcdFx0d3lzaXd5Z0JvZHkuc2Nyb2xsVG9wID0gc2Nyb2xsVG87XHJcblx0XHR9XHJcblxyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XHJcblx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHJcblx0XHQvLyBBZGQgYSBuZXcgbGluZSBhZnRlciB0aGUgbGFzdCBibG9jayBlbGVtZW50XHJcblx0XHQvLyBzbyBjYW4gYWx3YXlzIGFkZCB0ZXh0IGFmdGVyIGl0XHJcblx0XHRhcHBlbmROZXdMaW5lKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBleGNlcHQgaXQgd2lsbCBjb252ZXJ0IGFueSBIVE1MXHJcblx0ICogaW50byB0ZXh0IGJlZm9yZSBpbnNlcnRpbmcgaXQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0XHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dCwgZW5kVGV4dCkge1xyXG5cdFx0YmFzZS53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcclxuXHRcdFx0ZXNjYXBlLmVudGl0aWVzKHRleHQpLCBlc2NhcGUuZW50aXRpZXMoZW5kVGV4dClcclxuXHRcdCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5zZXJ0cyB0ZXh0IGludG8gdGhlIFdZU0lXWUcgb3Igc291cmNlIGVkaXRvciBkZXBlbmRpbmcgb24gd2hpY2hcclxuXHQgKiBtb2RlIHRoZSBlZGl0b3IgaXMgaW4uXHJcblx0ICpcclxuXHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBpbnNlcnRUZXh0XHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UuaW5zZXJ0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBlbmRUZXh0KSB7XHJcblx0XHRpZiAoYmFzZS5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRiYXNlLnNvdXJjZUVkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRiYXNlLnd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQsIGVuZFRleHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgYnV0IGluc2VydHMgdGV4dCBpbnRvIHRoZVxyXG5cdCAqIHNvdXJjZSBtb2RlIGVkaXRvciBpbnN0ZWFkLlxyXG5cdCAqXHJcblx0ICogSWYgZW5kVGV4dCBpcyBzcGVjaWZpZWQgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWQgYmV0d2VlblxyXG5cdCAqIHRleHQgYW5kIGVuZFRleHQuIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQgdGV4dCBhbmQgZW5kVGV4dCB3aWxsXHJcblx0ICoganVzdCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHQgKlxyXG5cdCAqIFRoZSBjdXJzb3Igd2lsbCBiZSBwbGFjZWQgYWZ0ZXIgdGhlIHRleHQgcGFyYW0uIElmIGVuZFRleHQgaXNcclxuXHQgKiBzcGVjaWZpZWQgdGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBiZWZvcmUgZW5kVGV4dCwgc28gcGFzc2luZzo8YnIgLz5cclxuXHQgKlxyXG5cdCAqICdbYl0nLCAnWy9iXSdcclxuXHQgKlxyXG5cdCAqIFdvdWxkIGNhdXNlIHRoZSBjdXJzb3IgdG8gYmUgcGxhY2VkOjxiciAvPlxyXG5cdCAqXHJcblx0ICogW2JdU2VsZWN0ZWQgdGV4dHxbL2JdXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNvdXJjZUVkaXRvckluc2VydFRleHRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0ID0gZnVuY3Rpb24gKHRleHQsIGVuZFRleHQpIHtcclxuXHRcdHZhciBzY3JvbGxUb3AsIGN1cnJlbnRWYWx1ZSxcclxuXHRcdFx0c3RhcnRQb3MgPSBzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQsXHJcblx0XHRcdGVuZFBvcyAgID0gc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZDtcclxuXHJcblx0XHRzY3JvbGxUb3AgPSBzb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wO1xyXG5cdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHRjdXJyZW50VmFsdWUgPSBzb3VyY2VFZGl0b3IudmFsdWU7XHJcblxyXG5cdFx0aWYgKGVuZFRleHQpIHtcclxuXHRcdFx0dGV4dCArPSBjdXJyZW50VmFsdWUuc3Vic3RyaW5nKHN0YXJ0UG9zLCBlbmRQb3MpICsgZW5kVGV4dDtcclxuXHRcdH1cclxuXHJcblx0XHRzb3VyY2VFZGl0b3IudmFsdWUgPSBjdXJyZW50VmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArXHJcblx0XHRcdHRleHQgK1xyXG5cdFx0XHRjdXJyZW50VmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcblxyXG5cdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gKHN0YXJ0UG9zICsgdGV4dC5sZW5ndGgpIC1cclxuXHRcdFx0KGVuZFRleHQgPyBlbmRUZXh0Lmxlbmd0aCA6IDApO1xyXG5cdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZCA9IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydDtcclxuXHJcblx0XHRzb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhlIHJhbmdlSGVscGVyIGNsYXNzXHJcblx0ICogZm9yIHRoZSBlZGl0b3IuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtSYW5nZUhlbHBlcn1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBnZXRSYW5nZUhlbHBlclxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldFJhbmdlSGVscGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHJhbmdlSGVscGVyO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgc291cmNlIGVkaXRvciBjYXJldCBwb3NpdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcG9zaXRpb25dXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjVcclxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JDYXJldFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnNvdXJjZUVkaXRvckNhcmV0ID0gZnVuY3Rpb24gKHBvc2l0aW9uKSB7XHJcblx0XHRzb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gcG9zaXRpb24uc3RhcnQ7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmQgPSBwb3NpdGlvbi5lbmQ7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGFydDogc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIHRoZSBlZGl0b3IgaXMgaW4gV1lTSVdZRyBtb2RlIGl0IHdpbGwgcmV0dXJuIHRoZSBmaWx0ZXJlZFxyXG5cdCAqIEhUTUwgZnJvbSBpdCAoY29udmVydGVkIHRvIEJCQ29kZSBpZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpbikuXHJcblx0ICogSXQgaXQncyBpbiBTb3VyY2UgTW9kZSBpdCB3aWxsIHJldHVybiB0aGUgdW5maWx0ZXJlZCBjb250ZW50c1xyXG5cdCAqIG9mIHRoZSBzb3VyY2UgZWRpdG9yIChpZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpbiB0aGlzIHdpbGwgYmVcclxuXHQgKiBCQkNvZGUgYWdhaW4pLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHZhbFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZWRpdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgZmlsdGVyIHNldCB0cnVlIHRoZSB2YWwgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyXHJcblx0ICogZnVuY3Rpb24uIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luIGl0IHdpbGwgcGFzcyB0aGUgdmFsIHRvXHJcblx0ICogdGhlIEJCQ29kZSBmaWx0ZXIgdG8gY29udmVydCBhbnkgQkJDb2RlIGludG8gSFRNTC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWxcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHZhbF4yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UudmFsID0gZnVuY3Rpb24gKHZhbCwgZmlsdGVyKSB7XHJcblx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcclxuXHRcdFx0cmV0dXJuIGJhc2UuaW5Tb3VyY2VNb2RlKCkgP1xyXG5cdFx0XHRcdGJhc2UuZ2V0U291cmNlRWRpdG9yVmFsdWUoZmFsc2UpIDpcclxuXHRcdFx0XHRiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZShmaWx0ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghYmFzZS5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHR2YWwgPSBmb3JtYXQudG9IdG1sKHZhbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGJhc2Uuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRiYXNlLnNldFNvdXJjZUVkaXRvclZhbHVlKHZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJhc2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5zZXJ0cyBIVE1ML0JCQ29kZSBpbnRvIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIElmIGVuZCBpcyBzdXBwbGllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogc3RhcnQgYW5kIGVuZC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBzdGFydCBhbmQgZW5kXHJcblx0ICogd2lsbCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHQgKlxyXG5cdCAqIElmIHRoZSBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIHRydWUsIHRoZSBIVE1ML0JCQ29kZSB3aWxsIGJlXHJcblx0ICogcGFzc2VkIHRocm91Z2ggYW55IHBsdWdpbiBmaWx0ZXJzLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIHRoaXMgd2lsbCBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmQ9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtjb252ZXJ0RW1vdGljb25zPXRydWVdIElmIHRvIGNvbnZlcnQgZW1vdGljb25zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBpbnNlcnRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogSW5zZXJ0cyBIVE1ML0JCQ29kZSBpbnRvIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIElmIGVuZCBpcyBzdXBwbGllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogc3RhcnQgYW5kIGVuZC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBzdGFydCBhbmQgZW5kXHJcblx0ICogd2lsbCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHQgKlxyXG5cdCAqIElmIHRoZSBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIHRydWUsIHRoZSBIVE1ML0JCQ29kZSB3aWxsIGJlXHJcblx0ICogcGFzc2VkIHRocm91Z2ggYW55IHBsdWdpbiBmaWx0ZXJzLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIHRoaXMgd2lsbCBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxyXG5cdCAqXHJcblx0ICogSWYgdGhlIGFsbG93TWl4ZWQgcGFyYW0gaXMgc2V0IHRvIHRydWUsIEhUTUwgYW55IHdpbGwgbm90IGJlXHJcblx0ICogZXNjYXBlZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmQ9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtjb252ZXJ0RW1vdGljb25zPXRydWVdIElmIHRvIGNvbnZlcnQgZW1vdGljb25zXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbYWxsb3dNaXhlZD1mYWxzZV1cclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluc2VydF4yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcblx0YmFzZS5pbnNlcnQgPSBmdW5jdGlvbiAoXHJcblx0XHRzdGFydCwgZW5kLCBmaWx0ZXIsIGNvbnZlcnRFbW90aWNvbnMsIGFsbG93TWl4ZWRcclxuXHQpIHtcclxuXHRcdGlmIChiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdGJhc2Uuc291cmNlRWRpdG9ySW5zZXJ0VGV4dChzdGFydCwgZW5kKTtcclxuXHRcdFx0cmV0dXJuIGJhc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBzZWxlY3Rpb24gYmV0d2VlbiBzdGFydCBhbmQgZW5kXHJcblx0XHRpZiAoZW5kKSB7XHJcblx0XHRcdHZhclx0aHRtbCA9IHJhbmdlSGVscGVyLnNlbGVjdGVkSHRtbCgpO1xyXG5cclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdGh0bWwgPSBmb3JtYXRcclxuXHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKGh0bWwsIHd5c2l3eWdEb2N1bWVudCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdGFydCArPSBodG1sICsgZW5kO1xyXG5cdFx0fVxyXG5cdFx0Ly8gVE9ETzogVGhpcyBmaWx0ZXIgc2hvdWxkIGFsbG93IGVtcHR5IHRhZ3MgYXMgaXQncyBpbnNlcnRpbmcuXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb0h0bWwnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRzdGFydCA9IGZvcm1hdC5mcmFnbWVudFRvSHRtbChzdGFydCwgY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgYW55IGVzY2FwZWQgSFRNTCBiYWNrIGludG8gSFRNTCBpZiBtaXhlZCBpcyBhbGxvd2VkXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiBhbGxvd01peGVkID09PSB0cnVlKSB7XHJcblx0XHRcdHN0YXJ0ID0gc3RhcnQucmVwbGFjZSgvJmx0Oy9nLCAnPCcpXHJcblx0XHRcdFx0LnJlcGxhY2UoLyZndDsvZywgJz4nKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoc3RhcnQpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBIVE1MIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogSWYgdXNpbmcgYSBwbHVnaW4gdGhhdCBmaWx0ZXJzIHRoZSBIdCBNbCBsaWtlIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogaXQgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlsdGVyaW5nIChCQkNvZGUpIHVubGVzcyB0aGVcclxuXHQgKiBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIGZhbHNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGdldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcclxuXHRcdHZhclx0aHRtbDtcclxuXHRcdC8vIENyZWF0ZSBhIHRtcCBub2RlIHRvIHN0b3JlIGNvbnRlbnRzIHNvIGl0IGNhbiBiZSBtb2RpZmllZFxyXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgYW55dGhpbmcgZWxzZS5cclxuXHRcdHZhciB0bXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHd5c2l3eWdCb2R5LmNoaWxkTm9kZXM7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0bXAsIGNoaWxkTm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIHRtcCk7XHJcblx0XHRkb20uZml4TmVzdGluZyh0bXApO1xyXG5cdFx0ZG9tLnJlbW92ZSh0bXApO1xyXG5cclxuXHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xyXG5cclxuXHRcdC8vIGZpbHRlciB0aGUgSFRNTCBhbmQgRE9NIHRocm91Z2ggYW55IHBsdWdpbnNcclxuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXQsICd0b1NvdXJjZScpKSB7XHJcblx0XHRcdGh0bWwgPSBmb3JtYXQudG9Tb3VyY2UoaHRtbCwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaHRtbDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Qm9keVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldEJvZHkgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gd3lzaXd5Z0JvZHk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgV1lTSVdZRyBlZGl0b3JzIGNvbnRhaW5lciBhcmVhICh3aG9sZSBpRnJhbWUpLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Q29udGVudEFyZWFDb250YWluZXJcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0YmFzZS5nZXRDb250ZW50QXJlYUNvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB3eXNpd3lnRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0ICpcclxuXHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIHRleHQgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyB3aGljaCBpcyBCQkNvZGUgdG9cclxuXHQgKiBIVE1MIHNvIGl0IHdpbGwgcmV0dXJuIEhUTUwuIElmIGZpbHRlciBpcyBzZXQgdG8gZmFsc2UgaXQgd2lsbFxyXG5cdCAqIGp1c3QgcmV0dXJuIHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIGVkaXRvciAoQkJDb2RlKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjBcclxuXHQgKiBAbmFtZSBnZXRTb3VyY2VFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmdldFNvdXJjZUVkaXRvclZhbHVlID0gZnVuY3Rpb24gKGZpbHRlcikge1xyXG5cdFx0dmFyIHZhbCA9IHNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0dmFsID0gZm9ybWF0LnRvSHRtbCh2YWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWw7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgV1lTSVdZRyBIVE1MIGVkaXRvciB2YWx1ZS4gU2hvdWxkIG9ubHkgYmUgdGhlIEhUTUxcclxuXHQgKiBjb250YWluZWQgd2l0aGluIHRoZSBib2R5IHRhZ3NcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnNldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG5cdFx0aWYgKCF2YWx1ZSkge1xyXG5cdFx0XHR2YWx1ZSA9ICc8cD48YnIgLz48L3A+JztcclxuXHRcdH1cclxuXHJcblx0XHR3eXNpd3lnQm9keS5pbm5lckhUTUwgPSBzYW5pdGl6ZSh2YWx1ZSk7XHJcblx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblxyXG5cdFx0YXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0YXV0b0V4cGFuZCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBzZXRTb3VyY2VFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnNldFNvdXJjZUVkaXRvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcblx0XHRzb3VyY2VFZGl0b3IudmFsdWUgPSB2YWx1ZTtcclxuXHJcblx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdGV4dGFyZWEgdGhhdCB0aGUgZWRpdG9yIGlzIHJlcGxhY2luZ1xyXG5cdCAqIHdpdGggdGhlIHZhbHVlIGN1cnJlbnRseSBpbnNpZGUgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHVwZGF0ZU9yaWdpbmFsXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UudXBkYXRlT3JpZ2luYWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRvcmlnaW5hbC52YWx1ZSA9IGJhc2UudmFsKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgYW55IGVtb3RpY29uIGNvZGVzIGluIHRoZSBwYXNzZWQgSFRNTFxyXG5cdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRyZXBsYWNlRW1vdGljb25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCkge1xyXG5cdFx0XHRlbW90aWNvbnNcclxuXHRcdFx0XHQucmVwbGFjZSh3eXNpd3lnQm9keSwgYWxsRW1vdGljb25zLCBvcHRpb25zLmVtb3RpY29uc0NvbXBhdCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2UgY29kZSBtb2RlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluU291cmNlTW9kZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmluU291cmNlTW9kZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb20uaGFzQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGJvb2xlYW5cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBzb3VyY2VNb2RlXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdC8qKlxyXG5cdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlTW9kZV4yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2Uuc291cmNlTW9kZSA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuXHRcdHZhciBpblNvdXJjZU1vZGUgPSBiYXNlLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgZW5hYmxlICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuIGluU291cmNlTW9kZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoKGluU291cmNlTW9kZSAmJiAhZW5hYmxlKSB8fCAoIWluU291cmNlTW9kZSAmJiBlbmFibGUpKSB7XHJcblx0XHRcdGJhc2UudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaGVzIGJldHdlZW4gdGhlIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2Rlc1xyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgdG9nZ2xlU291cmNlTW9kZVxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLnRvZ2dsZVNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaXNJblNvdXJjZU1vZGUgPSBiYXNlLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdC8vIGRvbid0IGFsbG93IHN3aXRjaGluZyB0byBXWVNJV1lHIGlmIGRvZXNuJ3Qgc3VwcG9ydCBpdFxyXG5cdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCAmJiBpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0cmFuZ2VIZWxwZXIuY2xlYXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHRjdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcclxuXHRcdGJhc2UuYmx1cigpO1xyXG5cclxuXHRcdGlmIChpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRiYXNlLnNldFd5c2l3eWdFZGl0b3JWYWx1ZShiYXNlLmdldFNvdXJjZUVkaXRvclZhbHVlKCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0YmFzZS5zZXRTb3VyY2VFZGl0b3JWYWx1ZShiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20udG9nZ2xlKHNvdXJjZUVkaXRvcik7XHJcblx0XHRkb20udG9nZ2xlKHd5c2l3eWdFZGl0b3IpO1xyXG5cclxuXHRcdGRvbS50b2dnbGVDbGFzcyhlZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScsIGlzSW5Tb3VyY2VNb2RlKTtcclxuXHRcdGRvbS50b2dnbGVDbGFzcyhlZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJywgIWlzSW5Tb3VyY2VNb2RlKTtcclxuXHJcblx0XHR1cGRhdGVUb29sQmFyKCk7XHJcblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgc2VsZWN0ZWQgdGV4dCBvZiB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdHJldHVybiBzb3VyY2VFZGl0b3IudmFsdWUuc3Vic3RyaW5nKFxyXG5cdFx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQsXHJcblx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgcGFzc2VkIGNvbW1hbmRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGhhbmRsZUNvbW1hbmQgPSBmdW5jdGlvbiAoY2FsbGVyLCBjbWQpIHtcclxuXHRcdC8vIGNoZWNrIGlmIGluIHRleHQgbW9kZSBhbmQgaGFuZGxlIHRleHQgY29tbWFuZHNcclxuXHRcdGlmIChiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdGlmIChjbWQudHh0RXhlYykge1xyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNtZC50eHRFeGVjKSkge1xyXG5cdFx0XHRcdFx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0LmFwcGx5KGJhc2UsIGNtZC50eHRFeGVjKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y21kLnR4dEV4ZWMuY2FsbChiYXNlLCBjYWxsZXIsIHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY21kLmV4ZWMpIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oY21kLmV4ZWMpKSB7XHJcblx0XHRcdFx0Y21kLmV4ZWMuY2FsbChiYXNlLCBjYWxsZXIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGJhc2UuZXhlY0NvbW1hbmQoXHJcblx0XHRcdFx0XHRjbWQuZXhlYyxcclxuXHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjbWQsICdleGVjUGFyYW0nKSA/IGNtZC5leGVjUGFyYW0gOiBudWxsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IFtwYXJhbV1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBleGVjQ29tbWFuZFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmV4ZWNDb21tYW5kID0gZnVuY3Rpb24gKGNvbW1hbmQsIHBhcmFtKSB7XHJcblx0XHR2YXJcdGV4ZWN1dGVkICAgID0gZmFsc2UsXHJcblx0XHRcdGNvbW1hbmRPYmogID0gYmFzZS5jb21tYW5kc1tjb21tYW5kXTtcclxuXHJcblx0XHRiYXNlLmZvY3VzKCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogbWFrZSBjb25maWd1cmFibGVcclxuXHRcdC8vIGRvbid0IGFwcGx5IGFueSBjb21tYW5kcyB0byBjb2RlIGVsZW1lbnRzXHJcblx0XHRpZiAoZG9tLmNsb3Nlc3QocmFuZ2VIZWxwZXIucGFyZW50Tm9kZSgpLCAnY29kZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRleGVjdXRlZCA9IHd5c2l3eWdEb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgcGFyYW0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdC8vIHNob3cgZXJyb3IgaWYgZXhlY3V0aW9uIGZhaWxlZCBhbmQgYW4gZXJyb3IgbWVzc2FnZSBleGlzdHNcclxuXHRcdGlmICghZXhlY3V0ZWQgJiYgY29tbWFuZE9iaiAmJiBjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkge1xyXG5cdFx0XHRhbGVydChiYXNlLl8oY29tbWFuZE9iai5lcnJvck1lc3NhZ2UpKTtcclxuXHRcdH1cclxuXHJcblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBoYXMgY2hhbmdlZCBhbmQgdHJpZ2dlcnNcclxuXHQgKiB0aGUgc2VsZWN0aW9uY2hhbmdlZCBldmVudCBpZiBpdCBoYXMuXHJcblx0ICpcclxuXHQgKiBJbiBicm93c2VycyBvdGhlciB0aGF0IGRvbid0IHN1cHBvcnQgc2VsZWN0aW9uY2hhbmdlIGV2ZW50IGl0IHdpbGwgY2hlY2tcclxuXHQgKiBhdCBtb3N0IG9uY2UgZXZlcnkgMTAwbXMuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRjaGVja1NlbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRmdW5jdGlvbiBjaGVjaygpIHtcclxuXHRcdFx0Ly8gRG9uJ3QgY3JlYXRlIG5ldyBzZWxlY3Rpb24gaWYgdGhlcmUgaXNuJ3Qgb25lIChsaWtlIGFmdGVyXHJcblx0XHRcdC8vIGJsdXIgZXZlbnQgaW4gaU9TKVxyXG5cdFx0XHRpZiAod3lzaXd5Z1dpbmRvdy5nZXRTZWxlY3Rpb24oKSAmJlxyXG5cdFx0XHRcdHd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkucmFuZ2VDb3VudCA8PSAwKSB7XHJcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IG51bGw7XHJcblx0XHRcdC8vIHJhbmdlSGVscGVyIGNvdWxkIGJlIG51bGwgaWYgZWRpdG9yIHdhcyBkZXN0cm95ZWRcclxuXHRcdFx0Ly8gYmVmb3JlIHRoZSB0aW1lb3V0IGhhZCBmaW5pc2hlZFxyXG5cdFx0XHR9IGVsc2UgaWYgKHJhbmdlSGVscGVyICYmICFyYW5nZUhlbHBlci5jb21wYXJlKGN1cnJlbnRTZWxlY3Rpb24pKSB7XHJcblx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgdGhlIHNlbGVjdGlvbiBpcyBpbiBhbiBpbmxpbmUgd3JhcCBpdCBpbiBhIGJsb2NrLlxyXG5cdFx0XHRcdC8vIEZpeGVzICMzMzFcclxuXHRcdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uLmNvbGxhcHNlZCkge1xyXG5cdFx0XHRcdFx0dmFyIHBhcmVudCA9IGN1cnJlbnRTZWxlY3Rpb24uc3RhcnRDb250YWluZXI7XHJcblx0XHRcdFx0XHR2YXIgb2Zmc2V0ID0gY3VycmVudFNlbGVjdGlvbi5zdGFydE9mZnNldDtcclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0aWYgKG9mZnNldCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcclxuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LmNoaWxkTm9kZXNbb2Zmc2V0XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR3aGlsZSAocGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSB3eXNpd3lnQm9keSkge1xyXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAocGFyZW50ICYmIGRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0XHR3cmFwSW5saW5lcyh3eXNpd3lnQm9keSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpc1NlbGVjdGlvbkNoZWNrUGVuZGluZyA9IHRydWU7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBsaW1pdCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnRzIHRoZSBTZWxlY3Rpb24gQVBJXHJcblx0XHRpZiAoJ29uc2VsZWN0aW9uY2hhbmdlJyBpbiB3eXNpd3lnRG9jdW1lbnQpIHtcclxuXHRcdFx0Y2hlY2soKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNldFRpbWVvdXQoY2hlY2ssIDEwMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IG5vZGUgaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXHJcblx0ICogdGhlIG5vZGVjaGFuZ2VkIGV2ZW50IGlmIGl0IGhhc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0Y2hlY2tOb2RlQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vIGNoZWNrIGlmIG5vZGUgaGFzIGNoYW5nZWRcclxuXHRcdHZhclx0b2xkTm9kZSxcclxuXHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHJcblx0XHRpZiAoY3VycmVudE5vZGUgIT09IG5vZGUpIHtcclxuXHRcdFx0b2xkTm9kZSAgICAgICAgICA9IGN1cnJlbnROb2RlO1xyXG5cdFx0XHRjdXJyZW50Tm9kZSAgICAgID0gbm9kZTtcclxuXHRcdFx0Y3VycmVudEJsb2NrTm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdub2RlY2hhbmdlZCcsIHtcclxuXHRcdFx0XHRvbGROb2RlOiBvbGROb2RlLFxyXG5cdFx0XHRcdG5ld05vZGU6IGN1cnJlbnROb2RlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBzZWxlY3Rpb24vY2FyZXQgaW5cclxuXHQgKiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBXaWxsIGJlIG51bGwgaW4gc291cmNlTW9kZSBvciBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHs/Tm9kZX1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjdXJyZW50Tm9kZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRiYXNlLmN1cnJlbnROb2RlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGN1cnJlbnROb2RlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIG5vZGUgdGhhdCBjb250YWlucyB0aGVcclxuXHQgKiBzZWxlY3Rpb24vY2FyZXQgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7P05vZGV9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY3VycmVudEJsb2NrTm9kZVxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRiYXNlLmN1cnJlbnRCbG9ja05vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gY3VycmVudEJsb2NrTm9kZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIGlmIGJ1dHRvbnMgYXJlIGFjdGl2ZSBvciBub3RcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0dmFyIGFjdGl2ZUNsYXNzID0gJ2FjdGl2ZSc7XHJcblx0XHR2YXIgZG9jICAgICAgICAgPSB3eXNpd3lnRG9jdW1lbnQ7XHJcblx0XHR2YXIgaXNTb3VyY2UgICAgPSBiYXNlLnNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRpZiAoYmFzZS5yZWFkT25seSgpKSB7XHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQodG9vbGJhciwgYWN0aXZlQ2xhc3MpLCBmdW5jdGlvbiAoXywgbWVudUl0ZW0pIHtcclxuXHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MobWVudUl0ZW0sIGFjdGl2ZUNsYXNzKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWlzU291cmNlKSB7XHJcblx0XHRcdHBhcmVudCAgICAgPSByYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblx0XHRcdGZpcnN0QmxvY2sgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KHBhcmVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBidG5TdGF0ZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdHZhciBzdGF0ZSAgICAgID0gMDtcclxuXHRcdFx0dmFyIGJ0biAgICAgICAgPSB0b29sYmFyQnV0dG9uc1tidG5TdGF0ZUhhbmRsZXJzW2pdLm5hbWVdO1xyXG5cdFx0XHR2YXIgc3RhdGVGbiAgICA9IGJ0blN0YXRlSGFuZGxlcnNbal0uc3RhdGU7XHJcblx0XHRcdHZhciBpc0Rpc2FibGVkID0gKGlzU291cmNlICYmICFidG4uX3NjZVR4dE1vZGUpIHx8XHJcblx0XHRcdFx0XHRcdCghaXNTb3VyY2UgJiYgIWJ0bi5fc2NlV3lzaXd5Z01vZGUpO1xyXG5cclxuXHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XHJcblx0XHRcdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtZGVwdGhcclxuXHRcdFx0XHRcdFx0aWYgKHN0YXRlID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRTdGF0ZShzdGF0ZUZuKSA/IDEgOiAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0Rpc2FibGVkKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBzdGF0ZUZuLmNhbGwoYmFzZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCB8fCBzdGF0ZSA8IDApO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCBhY3RpdmVDbGFzcywgc3RhdGUgPiAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaWNvbnMgJiYgaWNvbnMudXBkYXRlKSB7XHJcblx0XHRcdGljb25zLnVwZGF0ZShpc1NvdXJjZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGFueSBrZXkgcHJlc3MgaW4gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGhhbmRsZUtleVByZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vIEZGIGJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTAxNDk2XHJcblx0XHRpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRiYXNlLmNsb3NlRHJvcERvd24oKTtcclxuXHJcblx0XHQvLyAxMyA9IGVudGVyIGtleVxyXG5cdFx0aWYgKGUud2hpY2ggPT09IDEzKSB7XHJcblx0XHRcdHZhciBMSVNUX1RBR1MgPSAnbGksdWwsb2wnO1xyXG5cclxuXHRcdFx0Ly8gXCJGaXhcIiAoY2x1ZGdlKSBmb3IgYmxvY2tsZXZlbCBlbGVtZW50cyBiZWluZyBkdXBsaWNhdGVkIGluIHNvbWVcclxuXHRcdFx0Ly8gYnJvd3NlcnMgd2hlbiBlbnRlciBpcyBwcmVzc2VkIGluc3RlYWQgb2YgaW5zZXJ0aW5nIGEgbmV3bGluZVxyXG5cdFx0XHRpZiAoIWRvbS5pcyhjdXJyZW50QmxvY2tOb2RlLCBMSVNUX1RBR1MpICYmXHJcblx0XHRcdFx0ZG9tLmhhc1N0eWxpbmcoY3VycmVudEJsb2NrTm9kZSkpIHtcclxuXHJcblx0XHRcdFx0dmFyIGJyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2JyJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIuaW5zZXJ0Tm9kZShicik7XHJcblxyXG5cdFx0XHRcdC8vIExhc3QgPGJyPiBvZiBhIGJsb2NrIHdpbGwgYmUgY29sbGFwc2VkICBzbyBuZWVkIHRvIG1ha2Ugc3VyZVxyXG5cdFx0XHRcdC8vIHRoZSA8YnI+IHRoYXQgd2FzIGluc2VydGVkIGlzbid0IHRoZSBsYXN0IG5vZGUgb2YgYSBibG9jay5cclxuXHRcdFx0XHR2YXIgcGFyZW50ICA9IGJyLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0dmFyIGxhc3RDaGlsZCA9IHBhcmVudC5sYXN0Q2hpbGQ7XHJcblxyXG5cdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxyXG5cdFx0XHRcdGlmIChsYXN0Q2hpbGQgJiYgbGFzdENoaWxkLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFICYmXHJcblx0XHRcdFx0XHRsYXN0Q2hpbGQubm9kZVZhbHVlID09PSAnJykge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0bGFzdENoaWxkID0gcGFyZW50Lmxhc3RDaGlsZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgQlIgb2YgYSBibG9jayBhbmQgdGhlIHByZXZpb3VzXHJcblx0XHRcdFx0Ly8gc2libGluZyBpcyBpbmxpbmUgdGhlbiB3aWxsIG5lZWQgYW4gZXh0cmEgQlIuIFRoaXNcclxuXHRcdFx0XHQvLyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgbGFzdCBCUiBvZiBhIGJsb2NrIHdpbGwgYmVcclxuXHRcdFx0XHQvLyBjb2xsYXBzZWQuIEZpeGVzIGlzc3VlICMyNDhcclxuXHRcdFx0XHRpZiAoIWRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpICYmIGxhc3RDaGlsZCA9PT0gYnIgJiZcclxuXHRcdFx0XHRcdGRvbS5pc0lubGluZShici5wcmV2aW91c1NpYmxpbmcpKSB7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKCc8YnI+Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBzdXJlIHRoYXQgaWYgdGhlcmUgaXMgYSBjb2RlIG9yIHF1b3RlIHRhZyBhdCB0aGVcclxuXHQgKiBlbmQgb2YgdGhlIGVkaXRvciwgdGhhdCB0aGVyZSBpcyBhIG5ldyBsaW5lIGFmdGVyIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgdGhlcmUgd2Fzbid0IGEgbmV3IGxpbmUgYXQgdGhlIGVuZCB5b3Ugd291bGRuJ3QgYmUgYWJsZVxyXG5cdCAqIHRvIGVudGVyIGFueSB0ZXh0IGFmdGVyIGEgY29kZS9xdW90ZSB0YWdcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0YXBwZW5kTmV3TGluZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vIENoZWNrIGFsbCBub2RlcyBpbiByZXZlcnNlIHVudGlsIGVpdGhlciBhZGQgYSBuZXcgbGluZVxyXG5cdFx0Ly8gb3IgcmVhY2ggYSBub24tZW1wdHkgdGV4dG5vZGUgb3IgQlIgYXQgd2hpY2ggcG9pbnQgY2FuXHJcblx0XHQvLyBzdG9wIGNoZWNraW5nLlxyXG5cdFx0ZG9tLnJUcmF2ZXJzZSh3eXNpd3lnQm9keSwgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdFx0Ly8gTGFzdCBibG9jaywgYWRkIG5ldyBsaW5lIGFmdGVyIGlmIGhhcyBzdHlsaW5nXHJcblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmXHJcblx0XHRcdFx0IS9pbmxpbmUvLnRlc3QoZG9tLmNzcyhub2RlLCAnZGlzcGxheScpKSkge1xyXG5cclxuXHRcdFx0XHQvLyBBZGQgbGluZSBicmVhayBhZnRlciBpZiBoYXMgc3R5bGluZ1xyXG5cdFx0XHRcdGlmICghZG9tLmlzKG5vZGUsICcuc2NlZGl0b3ItbmxmJykgJiYgZG9tLmhhc1N0eWxpbmcobm9kZSkpIHtcclxuXHRcdFx0XHRcdHZhciBwYXJhZ3JhcGggPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdFx0cGFyYWdyYXBoLmNsYXNzTmFtZSA9ICdzY2VkaXRvci1ubGYnO1xyXG5cdFx0XHRcdFx0cGFyYWdyYXBoLmlubmVySFRNTCA9ICc8YnIgLz4nO1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBwYXJhZ3JhcGgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTGFzdCBub24tZW1wdHkgdGV4dCBub2RlIG9yIGxpbmUgYnJlYWsuXHJcblx0XHRcdC8vIE5vIG5lZWQgdG8gYWRkIGxpbmUtYnJlYWsgYWZ0ZXIgdGhlbVxyXG5cdFx0XHRpZiAoKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIS9eXFxzKiQvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB8fFxyXG5cdFx0XHRcdGRvbS5pcyhub2RlLCAnYnInKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBmb3JtIHJlc2V0IGV2ZW50XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRoYW5kbGVGb3JtUmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRiYXNlLnZhbChvcmlnaW5hbC52YWx1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkgbW91c2Vkb3duIHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlTW91c2VEb3duID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVHJhbnNsYXRlcyB0aGUgc3RyaW5nIGludG8gdGhlIGxvY2FsZSBsYW5ndWFnZS5cclxuXHQgKlxyXG5cdCAqIFJlcGxhY2VzIGFueSB7MH0sIHsxfSwgezJ9LCBlY3QuIHdpdGggdGhlIHBhcmFtcyBwcm92aWRlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuXHQgKiBAcGFyYW0gey4uLlN0cmluZ30gYXJnc1xyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBfXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdGJhc2UuXyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhclx0dW5kZWYsXHJcblx0XHRcdGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG5cdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGVbYXJnc1swXV0pIHtcclxuXHRcdFx0YXJnc1swXSA9IGxvY2FsZVthcmdzWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXJnc1swXS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgZnVuY3Rpb24gKHN0ciwgcDEpIHtcclxuXHRcdFx0cmV0dXJuIGFyZ3NbcDEgLSAwICsgMV0gIT09IHVuZGVmID9cclxuXHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcclxuXHRcdFx0XHQneycgKyBwMSArICd9JztcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBhc3NlcyBldmVudHMgb24gdG8gYW55IGhhbmRsZXJzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRoYW5kbGVFdmVudCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAocGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHQvLyBTZW5kIGV2ZW50IHRvIGFsbCBwbHVnaW5zXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbChlLnR5cGUgKyAnRXZlbnQnLCBlLCBiYXNlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBjb252ZXJ0IHRoZSBldmVudCBpbnRvIGEgY3VzdG9tIGV2ZW50IHRvIHNlbmRcclxuXHRcdHZhciBuYW1lID0gKGUudGFyZ2V0ID09PSBzb3VyY2VFZGl0b3IgPyAnc2Nlc3JjJyA6ICdzY2V3eXMnKSArIGUudHlwZTtcclxuXHJcblx0XHRpZiAoZXZlbnRIYW5kbGVyc1tuYW1lXSkge1xyXG5cdFx0XHRldmVudEhhbmRsZXJzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XHJcblx0XHRcdFx0Zm4uY2FsbChiYXNlLCBlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgYSBoYW5kbGVyIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnRzXHJcblx0ICpcclxuXHQgKiBUaGlzIGZ1bmN0aW9uIG9ubHkgYmluZHMgdG8gYSBsaW1pdGVkIGxpc3Qgb2ZcclxuXHQgKiBzdXBwb3J0ZWQgZXZlbnRzLlxyXG5cdCAqXHJcblx0ICogVGhlIHN1cHBvcnRlZCBldmVudHMgYXJlOlxyXG5cdCAqXHJcblx0ICogKiBrZXl1cFxyXG5cdCAqICoga2V5ZG93blxyXG5cdCAqICogS2V5cHJlc3NcclxuXHQgKiAqIGJsdXJcclxuXHQgKiAqIGZvY3VzXHJcblx0ICogKiBpbnB1dFxyXG5cdCAqICogbm9kZWNoYW5nZWQgLSBXaGVuIHRoZSBjdXJyZW50IG5vZGUgY29udGFpbmluZ1xyXG5cdCAqIFx0XHR0aGUgc2VsZWN0aW9uIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlXHJcblx0ICogKiBjb250ZXh0bWVudVxyXG5cdCAqICogc2VsZWN0aW9uY2hhbmdlZFxyXG5cdCAqICogdmFsdWVjaGFuZ2VkXHJcblx0ICpcclxuXHQgKlxyXG5cdCAqIFRoZSBldmVudHMgcGFyYW0gc2hvdWxkIGJlIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50KHMpXHJcblx0ICogdG8gYmluZCB0aGlzIGhhbmRsZXIgdG8uIElmIG11bHRpcGxlLCB0aGV5IHNob3VsZCBiZSBzZXBhcmF0ZWRcclxuXHQgKiBieSBzcGFjZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW50c1xyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGJpbmRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0YmFzZS5iaW5kID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdGV2ZW50cyA9IGV2ZW50cy5zcGxpdCgnICcpO1xyXG5cclxuXHRcdHZhciBpICA9IGV2ZW50cy5sZW5ndGg7XHJcblx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0dmFyIHd5c0V2ZW50ID0gJ3NjZXd5cycgKyBldmVudHNbaV07XHJcblx0XHRcdFx0dmFyIHNyY0V2ZW50ID0gJ3NjZXNyYycgKyBldmVudHNbaV07XHJcblx0XHRcdFx0Ly8gVXNlIGN1c3RvbSBldmVudHMgdG8gYWxsb3cgcGFzc2luZyB0aGUgaW5zdGFuY2UgYXMgdGhlXHJcblx0XHRcdFx0Ly8gMm5kIGFyZ3VtZW50LlxyXG5cdFx0XHRcdC8vIEFsc28gYWxsb3dzIHVuYmluZGluZyB3aXRob3V0IHVuYmluZGluZyB0aGUgZWRpdG9ycyBvd25cclxuXHRcdFx0XHQvLyBldmVudCBoYW5kbGVycy5cclxuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XHJcblx0XHRcdFx0XHRldmVudEhhbmRsZXJzW3d5c0V2ZW50XSA9IGV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdIHx8IFtdO1xyXG5cdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0gPSBldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdLnB1c2goaGFuZGxlcik7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBTdGFydCBzZW5kaW5nIHZhbHVlIGNoYW5nZWQgZXZlbnRzXHJcblx0XHRcdFx0aWYgKGV2ZW50c1tpXSA9PT0gJ3ZhbHVlY2hhbmdlZCcpIHtcclxuXHRcdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQuaGFzSGFuZGxlciA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJhc2U7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVW5iaW5kcyBhbiBldmVudCB0aGF0IHdhcyBib3VuZCB1c2luZyBiaW5kKCkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IGV2ZW50c1xyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSB1bmJpbmRpbmcgdGhpc1xyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgZnJvbSB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBpZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB1bmJpbmRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQHNlZSBiaW5kXHJcblx0ICovXHJcblx0YmFzZS51bmJpbmQgPSBmdW5jdGlvbiAoZXZlbnRzLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0ZXZlbnRzID0gZXZlbnRzLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0dmFyIGkgID0gZXZlbnRzLmxlbmd0aDtcclxuXHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1snc2Nld3lzJyArIGV2ZW50c1tpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1snc2Nlc3JjJyArIGV2ZW50c1tpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJsdXJzIHRoZSBlZGl0b3JzIGlucHV0IGFyZWFcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgYmx1clxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS4zLjZcclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgZWRpdG9ycyBibHVyIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBibHVyXjJcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0YmFzZS5ibHVyID0gZnVuY3Rpb24gKGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKSB7XHJcblx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHRiYXNlLmJpbmQoJ2JsdXInLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCFiYXNlLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR3eXNpd3lnQm9keS5ibHVyKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzb3VyY2VFZGl0b3IuYmx1cigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZvY3VzZXMgdGhlIGVkaXRvcnMgaW5wdXQgYXJlYVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBmb2N1c1xyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHQvKipcclxuXHQgKiBBZGRzIGFuIGV2ZW50IGhhbmRsZXIgdG8gdGhlIGZvY3VzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBmb2N1c14yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdGJhc2UuZm9jdXMgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdGJhc2UuYmluZCgnZm9jdXMnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9IGVsc2UgaWYgKCFiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdC8vIEFscmVhZHkgaGFzIGZvY3VzIHNvIGRvIG5vdGhpbmdcclxuXHRcdFx0aWYgKGRvbS5maW5kKHd5c2l3eWdEb2N1bWVudCwgJzpmb2N1cycpLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNvbnRhaW5lcjtcclxuXHRcdFx0dmFyIHJuZyA9IHJhbmdlSGVscGVyLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdC8vIEZpeCBGRiBidWcgd2hlcmUgaXQgc2hvd3MgdGhlIGN1cnNvciBpbiB0aGUgd3JvbmcgcGxhY2VcclxuXHRcdFx0Ly8gaWYgdGhlIGVkaXRvciBoYXNuJ3QgaGFkIGZvY3VzIGJlZm9yZS4gU2VlIGlzc3VlICMzOTNcclxuXHRcdFx0aWYgKCFjdXJyZW50U2VsZWN0aW9uKSB7XHJcblx0XHRcdFx0YXV0b2ZvY3VzKHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcclxuXHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcclxuXHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdGlmIChybmcgJiYgcm5nLmVuZE9mZnNldCA9PT0gMSAmJiBybmcuY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0Y29udGFpbmVyID0gcm5nLmVuZENvbnRhaW5lcjtcclxuXHJcblx0XHRcdFx0aWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcclxuXHRcdFx0XHRcdGRvbS5pcyhjb250YWluZXIuZmlyc3RDaGlsZCwgJ2JyJykpIHtcclxuXHRcdFx0XHRcdHJuZy5zZXRTdGFydEJlZm9yZShjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5zZWxlY3RSYW5nZShybmcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d3lzaXd5Z1dpbmRvdy5mb2N1cygpO1xyXG5cdFx0XHR3eXNpd3lnQm9keS5mb2N1cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgZG93biBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5RG93blxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRiYXNlLmtleURvd24gPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdHJldHVybiBiYXNlLmJpbmQoJ2tleWRvd24nLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBwcmVzcyBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5UHJlc3NcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0YmFzZS5rZXlQcmVzcyA9IGZ1bmN0aW9uIChoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0cmV0dXJuIGJhc2VcclxuXHRcdFx0LmJpbmQoJ2tleXByZXNzJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgdXAgZXZlbnRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGtleVVwXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdGJhc2Uua2V5VXAgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdHJldHVybiBiYXNlLmJpbmQoJ2tleXVwJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIG5vZGVDaGFuZ2VkXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdGJhc2Uubm9kZUNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG5cdFx0cmV0dXJuIGJhc2UuYmluZCgnbm9kZWNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHNlbGVjdGlvbiBjaGFuZ2VkIGV2ZW50XHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRiYXNlLnNlbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG5cdFx0cmV0dXJuIGJhc2UuYmluZCgnc2VsZWN0aW9uY2hhbmdlZCcsIGhhbmRsZXIsIGZhbHNlLCB0cnVlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgdmFsdWUgY2hhbmdlZCBldmVudFxyXG5cdCAqXHJcblx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgY3VycmVudCBlZGl0b3IgdmFsdWUgY2hhbmdlcy5cclxuXHQgKlxyXG5cdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdCAqIDEuNSBzZWNzIGFmdGVyIHRleHQgaXMgdHlwZWQuIElmIGEgc3BhY2UgaXMgdHlwZWQgaXQgd2lsbFxyXG5cdCAqIGNhdXNlIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZlxyXG5cdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC41XHJcblx0ICovXHJcblx0YmFzZS52YWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdHJldHVybiBiYXNlXHJcblx0XHRcdC5iaW5kKCd2YWx1ZWNoYW5nZWQnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW1vdGljb25zIGtleXByZXNzIGhhbmRsZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGVtb3RpY29uc0tleVByZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhclx0cmVwbGFjZWRFbW90aWNvbixcclxuXHRcdFx0Y2FjaGVQb3MgICAgICAgPSAwLFxyXG5cdFx0XHRlbW90aWNvbnNDYWNoZSA9IGJhc2UuZW1vdGljb25zQ2FjaGUsXHJcblx0XHRcdGN1ckNoYXIgICAgICAgID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBNYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0aWYgKGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghZW1vdGljb25zQ2FjaGUpIHtcclxuXHRcdFx0ZW1vdGljb25zQ2FjaGUgPSBbXTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCBodG1sKSB7XHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbY2FjaGVQb3MrK10gPSBba2V5LCBodG1sXTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlbW90aWNvbnNDYWNoZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0YmFzZS5lbW90aWNvbnNDYWNoZSA9IGVtb3RpY29uc0NhY2hlO1xyXG5cdFx0XHRiYXNlLmxvbmdlc3RFbW90aWNvbkNvZGUgPVxyXG5cdFx0XHRcdGVtb3RpY29uc0NhY2hlW2Vtb3RpY29uc0NhY2hlLmxlbmd0aCAtIDFdWzBdLmxlbmd0aDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlZEVtb3RpY29uID0gcmFuZ2VIZWxwZXIucmVwbGFjZUtleXdvcmQoXHJcblx0XHRcdGJhc2UuZW1vdGljb25zQ2FjaGUsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdGJhc2UubG9uZ2VzdEVtb3RpY29uQ29kZSxcclxuXHRcdFx0b3B0aW9ucy5lbW90aWNvbnNDb21wYXQsXHJcblx0XHRcdGN1ckNoYXJcclxuXHRcdCk7XHJcblxyXG5cdFx0aWYgKHJlcGxhY2VkRW1vdGljb24pIHtcclxuXHRcdFx0aWYgKCFvcHRpb25zLmVtb3RpY29uc0NvbXBhdCB8fCAhL15cXHMkLy50ZXN0KGN1ckNoYXIpKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgc3VyZSBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0ZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0ZW1vdGljb25zLmNoZWNrV2hpdGVzcGFjZShjdXJyZW50QmxvY2tOb2RlLCByYW5nZUhlbHBlcik7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyBpZiBlbW90aWNvbnMgYXJlIGN1cnJlbnRseSBlbmFibGVkXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBlbW90aWNvbnNcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4yXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcy9kaXNhYmxlcyBlbW90aWNvbnNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBlbW90aWNvbnNeMlxyXG5cdCAqIEBtZW1iZXJPZiBTQ0VkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjJcclxuXHQgKi9cclxuXHRiYXNlLmVtb3RpY29ucyA9IGZ1bmN0aW9uIChlbmFibGUpIHtcclxuXHRcdGlmICghZW5hYmxlICYmIGVuYWJsZSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuIG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZDtcclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zLmVtb3RpY29uc0VuYWJsZWQgPSBlbmFibGU7XHJcblxyXG5cdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIGVtb3RpY29uc0tleVByZXNzKTtcclxuXHJcblx0XHRcdGlmICghYmFzZS5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0cmVwbGFjZUVtb3RpY29ucygpO1xyXG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIGVtb3RpY29ucyA9XHJcblx0XHRcdFx0ZG9tLmZpbmQod3lzaXd5Z0JvZHksICdpbWdbZGF0YS1zY2VkaXRvci1lbW90aWNvbl0nKTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoXywgaW1nKSB7XHJcblx0XHRcdFx0dmFyIHRleHQgPSBkb20uZGF0YShpbWcsICdzY2VkaXRvci1lbW90aWNvbicpO1xyXG5cdFx0XHRcdHZhciB0ZXh0Tm9kZSA9IHd5c2l3eWdEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxuXHRcdFx0XHRpbWcucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIGltZyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9mZih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgZW1vdGljb25zS2V5UHJlc3MpO1xyXG5cclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgV1lTSVdZRyBlZGl0b3JzIGlubGluZSBDU1NcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjc3NcclxuXHQgKiBAbWVtYmVyT2YgU0NFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjc3NcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc14yXHJcblx0ICogQG1lbWJlck9mIFNDRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqL1xyXG5cdGJhc2UuY3NzID0gZnVuY3Rpb24gKGNzcykge1xyXG5cdFx0aWYgKCFpbmxpbmVDc3MpIHtcclxuXHRcdFx0aW5saW5lQ3NzID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywge1xyXG5cdFx0XHRcdGlkOiAnaW5saW5lJ1xyXG5cdFx0XHR9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdEb2N1bWVudC5oZWFkLCBpbmxpbmVDc3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdXRpbHMuaXNTdHJpbmcoY3NzKSkge1xyXG5cdFx0XHRyZXR1cm4gaW5saW5lQ3NzLnN0eWxlU2hlZXQgP1xyXG5cdFx0XHRcdGlubGluZUNzcy5zdHlsZVNoZWV0LmNzc1RleHQgOiBpbmxpbmVDc3MuaW5uZXJIVE1MO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChpbmxpbmVDc3Muc3R5bGVTaGVldCkge1xyXG5cdFx0XHRpbmxpbmVDc3Muc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmFzZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBrZXlkb3duIGV2ZW50LCB1c2VkIGZvciBzaG9ydGN1dHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdGhhbmRsZUtleURvd24gPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyXHRzaG9ydGN1dCAgID0gW10sXHJcblx0XHRcdFNISUZUX0tFWVMgPSB7XHJcblx0XHRcdFx0J2AnOiAnficsXHJcblx0XHRcdFx0JzEnOiAnIScsXHJcblx0XHRcdFx0JzInOiAnQCcsXHJcblx0XHRcdFx0JzMnOiAnIycsXHJcblx0XHRcdFx0JzQnOiAnJCcsXHJcblx0XHRcdFx0JzUnOiAnJScsXHJcblx0XHRcdFx0JzYnOiAnXicsXHJcblx0XHRcdFx0JzcnOiAnJicsXHJcblx0XHRcdFx0JzgnOiAnKicsXHJcblx0XHRcdFx0JzknOiAnKCcsXHJcblx0XHRcdFx0JzAnOiAnKScsXHJcblx0XHRcdFx0Jy0nOiAnXycsXHJcblx0XHRcdFx0Jz0nOiAnKycsXHJcblx0XHRcdFx0JzsnOiAnOiAnLFxyXG5cdFx0XHRcdCdcXCcnOiAnXCInLFxyXG5cdFx0XHRcdCcsJzogJzwnLFxyXG5cdFx0XHRcdCcuJzogJz4nLFxyXG5cdFx0XHRcdCcvJzogJz8nLFxyXG5cdFx0XHRcdCdcXFxcJzogJ3wnLFxyXG5cdFx0XHRcdCdbJzogJ3snLFxyXG5cdFx0XHRcdCddJzogJ30nXHJcblx0XHRcdH0sXHJcblx0XHRcdFNQRUNJQUxfS0VZUyA9IHtcclxuXHRcdFx0XHQ4OiAnYmFja3NwYWNlJyxcclxuXHRcdFx0XHQ5OiAndGFiJyxcclxuXHRcdFx0XHQxMzogJ2VudGVyJyxcclxuXHRcdFx0XHQxOTogJ3BhdXNlJyxcclxuXHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcclxuXHRcdFx0XHQyNzogJ2VzYycsXHJcblx0XHRcdFx0MzI6ICdzcGFjZScsXHJcblx0XHRcdFx0MzM6ICdwYWdldXAnLFxyXG5cdFx0XHRcdDM0OiAncGFnZWRvd24nLFxyXG5cdFx0XHRcdDM1OiAnZW5kJyxcclxuXHRcdFx0XHQzNjogJ2hvbWUnLFxyXG5cdFx0XHRcdDM3OiAnbGVmdCcsXHJcblx0XHRcdFx0Mzg6ICd1cCcsXHJcblx0XHRcdFx0Mzk6ICdyaWdodCcsXHJcblx0XHRcdFx0NDA6ICdkb3duJyxcclxuXHRcdFx0XHQ0NTogJ2luc2VydCcsXHJcblx0XHRcdFx0NDY6ICdkZWwnLFxyXG5cdFx0XHRcdDkxOiAnd2luJyxcclxuXHRcdFx0XHQ5MjogJ3dpbicsXHJcblx0XHRcdFx0OTM6ICdzZWxlY3QnLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOScsXHJcblx0XHRcdFx0MTA2OiAnKicsXHJcblx0XHRcdFx0MTA3OiAnKycsXHJcblx0XHRcdFx0MTA5OiAnLScsXHJcblx0XHRcdFx0MTEwOiAnLicsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0MTEyOiAnZjEnLFxyXG5cdFx0XHRcdDExMzogJ2YyJyxcclxuXHRcdFx0XHQxMTQ6ICdmMycsXHJcblx0XHRcdFx0MTE1OiAnZjQnLFxyXG5cdFx0XHRcdDExNjogJ2Y1JyxcclxuXHRcdFx0XHQxMTc6ICdmNicsXHJcblx0XHRcdFx0MTE4OiAnZjcnLFxyXG5cdFx0XHRcdDExOTogJ2Y4JyxcclxuXHRcdFx0XHQxMjA6ICdmOScsXHJcblx0XHRcdFx0MTIxOiAnZjEwJyxcclxuXHRcdFx0XHQxMjI6ICdmMTEnLFxyXG5cdFx0XHRcdDEyMzogJ2YxMicsXHJcblx0XHRcdFx0MTQ0OiAnbnVtbG9jaycsXHJcblx0XHRcdFx0MTQ1OiAnc2Nyb2xsbG9jaycsXHJcblx0XHRcdFx0MTg2OiAnOycsXHJcblx0XHRcdFx0MTg3OiAnPScsXHJcblx0XHRcdFx0MTg4OiAnLCcsXHJcblx0XHRcdFx0MTg5OiAnLScsXHJcblx0XHRcdFx0MTkwOiAnLicsXHJcblx0XHRcdFx0MTkxOiAnLycsXHJcblx0XHRcdFx0MTkyOiAnYCcsXHJcblx0XHRcdFx0MjE5OiAnWycsXHJcblx0XHRcdFx0MjIwOiAnXFxcXCcsXHJcblx0XHRcdFx0MjIxOiAnXScsXHJcblx0XHRcdFx0MjIyOiAnXFwnJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHROVU1QQURfU0hJRlRfS0VZUyA9IHtcclxuXHRcdFx0XHQxMDk6ICctJyxcclxuXHRcdFx0XHQxMTA6ICdkZWwnLFxyXG5cdFx0XHRcdDExMTogJy8nLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOSdcclxuXHRcdFx0fSxcclxuXHRcdFx0d2hpY2ggICAgID0gZS53aGljaCxcclxuXHRcdFx0Y2hhcmFjdGVyID0gU1BFQ0lBTF9LRVlTW3doaWNoXSB8fFxyXG5cdFx0XHRcdFN0cmluZy5mcm9tQ2hhckNvZGUod2hpY2gpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcclxuXHRcdFx0c2hvcnRjdXQucHVzaCgnY3RybCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLmFsdEtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdhbHQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZS5zaGlmdEtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdzaGlmdCcpO1xyXG5cclxuXHRcdFx0aWYgKE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXSkge1xyXG5cdFx0XHRcdGNoYXJhY3RlciA9IE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXTtcclxuXHRcdFx0fSBlbHNlIGlmIChTSElGVF9LRVlTW2NoYXJhY3Rlcl0pIHtcclxuXHRcdFx0XHRjaGFyYWN0ZXIgPSBTSElGVF9LRVlTW2NoYXJhY3Rlcl07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTaGlmdCBpcyAxNiwgY3RybCBpcyAxNyBhbmQgYWx0IGlzIDE4XHJcblx0XHRpZiAoY2hhcmFjdGVyICYmICh3aGljaCA8IDE2IHx8IHdoaWNoID4gMTgpKSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goY2hhcmFjdGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG9ydGN1dCA9IHNob3J0Y3V0LmpvaW4oJysnKTtcclxuXHRcdGlmIChzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XSAmJlxyXG5cdFx0XHRzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XS5jYWxsKGJhc2UpID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBzaG9ydGN1dCBoYW5kbGVyIHRvIHRoZSBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgIHNob3J0Y3V0XHJcblx0ICogQHBhcmFtICB7U3RyaW5nfEZ1bmN0aW9ufSBjbWRcclxuXHQgKiBAcmV0dXJuIHtzY2VkaXRvcn1cclxuXHQgKi9cclxuXHRiYXNlLmFkZFNob3J0Y3V0ID0gZnVuY3Rpb24gKHNob3J0Y3V0LCBjbWQpIHtcclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoY21kKSkge1xyXG5cdFx0XHRzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRoYW5kbGVDb21tYW5kKHRvb2xiYXJCdXR0b25zW2NtZF0sIGJhc2UuY29tbWFuZHNbY21kXSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdID0gY21kO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBzaG9ydGN1dCBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBzaG9ydGN1dFxyXG5cdCAqIEByZXR1cm4ge3NjZWRpdG9yfVxyXG5cdCAqL1xyXG5cdGJhc2UucmVtb3ZlU2hvcnRjdXQgPSBmdW5jdGlvbiAoc2hvcnRjdXQpIHtcclxuXHRcdGRlbGV0ZSBzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0LnRvTG93ZXJDYXNlKCldO1xyXG5cclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGJhY2tzcGFjZSBrZXkgcHJlc3NcclxuXHQgKlxyXG5cdCAqIFdpbGwgcmVtb3ZlIGJsb2NrIHN0eWxpbmcgbGlrZSBxdW90ZXMvY29kZSBlY3QgaWYgYXQgdGhlIHN0YXJ0LlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0aGFuZGxlQmFja1NwYWNlID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhclx0bm9kZSwgb2Zmc2V0LCByYW5nZSwgcGFyZW50O1xyXG5cclxuXHRcdC8vIDggaXMgdGhlIGJhY2tzcGFjZSBrZXlcclxuXHRcdGlmIChvcHRpb25zLmRpc2FibGVCbG9ja1JlbW92ZSB8fCBlLndoaWNoICE9PSA4IHx8XHJcblx0XHRcdCEocmFuZ2UgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCkpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlICAgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcclxuXHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cclxuXHRcdGlmIChvZmZzZXQgIT09IDAgfHwgIShwYXJlbnQgPSBjdXJyZW50U3R5bGVkQmxvY2tOb2RlKCkpIHx8XHJcblx0XHRcdGRvbS5pcyhwYXJlbnQsICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlIChub2RlICE9PSBwYXJlbnQpIHtcclxuXHRcdFx0d2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHQvLyBFdmVyeXRoaW5nIGJ1dCBlbXB0eSB0ZXh0IG5vZGVzIGJlZm9yZSB0aGUgY3Vyc29yXHJcblx0XHRcdFx0Ly8gc2hvdWxkIHByZXZlbnQgdGhlIHN0eWxlIGZyb20gYmVpbmcgcmVtb3ZlZFxyXG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFIHx8IG5vZGUubm9kZVZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRoZSBiYWNrc3BhY2Ugd2FzIHByZXNzZWQgYXQgdGhlIHN0YXJ0IG9mXHJcblx0XHQvLyB0aGUgY29udGFpbmVyIHNvIGNsZWFyIHRoZSBzdHlsZVxyXG5cdFx0YmFzZS5jbGVhckJsb2NrRm9ybWF0dGluZyhwYXJlbnQpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IHN0eWxlZCBibG9jayBub2RlIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvclxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqL1xyXG5cdGN1cnJlbnRTdHlsZWRCbG9ja05vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgYmxvY2sgPSBjdXJyZW50QmxvY2tOb2RlO1xyXG5cclxuXHRcdHdoaWxlICghZG9tLmhhc1N0eWxpbmcoYmxvY2spIHx8IGRvbS5pc0lubGluZShibG9jaywgdHJ1ZSkpIHtcclxuXHRcdFx0aWYgKCEoYmxvY2sgPSBibG9jay5wYXJlbnROb2RlKSB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmxvY2s7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xlYXJzIHRoZSBmb3JtYXR0aW5nIG9mIHRoZSBwYXNzZWQgYmxvY2sgZWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIElmIGJsb2NrIGlzIGZhbHNlLCBpZiB3aWxsIGNsZWFyIHRoZSBzdHlsaW5nIG9mIHRoZSBmaXJzdFxyXG5cdCAqIGJsb2NrIGxldmVsIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgY3Vyc29yLlxyXG5cdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBibG9ja1xyXG5cdCAqIEBzaW5jZSAxLjQuNFxyXG5cdCAqL1xyXG5cdGJhc2UuY2xlYXJCbG9ja0Zvcm1hdHRpbmcgPSBmdW5jdGlvbiAoYmxvY2spIHtcclxuXHRcdGJsb2NrID0gYmxvY2sgfHwgY3VycmVudFN0eWxlZEJsb2NrTm9kZSgpO1xyXG5cclxuXHRcdGlmICghYmxvY2sgfHwgZG9tLmlzKGJsb2NrLCAnYm9keScpKSB7XHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cclxuXHRcdGJsb2NrLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuXHRcdGRvbS5hdHRyKGJsb2NrLCAnc3R5bGUnLCAnJyk7XHJcblxyXG5cdFx0aWYgKCFkb20uaXMoYmxvY2ssICdwLGRpdix0ZCcpKSB7XHJcblx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChibG9jaywgJ3AnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdHJldHVybiBiYXNlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyaWdnZXJzIHRoZSB2YWx1ZUNoYW5nZWQgc2lnbmFsIGlmIHRoZXJlIGlzXHJcblx0ICogYSBwbHVnaW4gdGhhdCBoYW5kbGVzIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgcmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCkgaGFzIGFscmVhZHkgYmVlblxyXG5cdCAqIGNhbGxlZCwgdGhlbiBzYXZlUmFuZ2Ugc2hvdWxkIGJlIHNldCB0byBmYWxzZVxyXG5cdCAqIHRvIHByZXZlbnQgdGhlIHJhbmdlIGJlaW5nIHNhdmVkIHR3aWNlLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBzYXZlUmFuZ2UgSWYgdG8gY2FsbCByYW5nZUhlbHBlci5zYXZlUmFuZ2UoKS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHRyaWdnZXJWYWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoc2F2ZVJhbmdlKSB7XHJcblx0XHRpZiAoIXBsdWdpbk1hbmFnZXIgfHxcclxuXHRcdFx0KCFwbHVnaW5NYW5hZ2VyLmhhc0hhbmRsZXIoJ3ZhbHVlY2hhbmdlZEV2ZW50JykgJiZcclxuXHRcdFx0XHQhdHJpZ2dlclZhbHVlQ2hhbmdlZC5oYXNIYW5kbGVyKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyXHRjdXJyZW50SHRtbCxcclxuXHRcdFx0c291cmNlTW9kZSAgID0gYmFzZS5zb3VyY2VNb2RlKCksXHJcblx0XHRcdGhhc1NlbGVjdGlvbiA9ICFzb3VyY2VNb2RlICYmIHJhbmdlSGVscGVyLmhhc1NlbGVjdGlvbigpO1xyXG5cclxuXHRcdC8vIENvbXBvc2l0aW9uIGVuZCBpc24ndCBndWFyYW50ZWVkIHRvIGZpcmUgYnV0IG11c3QgaGF2ZVxyXG5cdFx0Ly8gZW5kZWQgd2hlbiB0cmlnZ2VyVmFsdWVDaGFuZ2VkKCkgaXMgY2FsbGVkIHNvIHJlc2V0IGl0XHJcblx0XHRpc0NvbXBvc2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgc2NlZGl0b3Itc3RhcnQtbWFya2VyXHJcblx0XHQvLyBpcyBwcmVzZW50IGFzIHRoZSByYW5nZSBpcyBhbHJlYWR5IHNhdmVkXHJcblx0XHRzYXZlUmFuZ2UgPSBzYXZlUmFuZ2UgIT09IGZhbHNlICYmXHJcblx0XHRcdCF3eXNpd3lnRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjZWRpdG9yLXN0YXJ0LW1hcmtlcicpO1xyXG5cclxuXHRcdC8vIENsZWFyIGFueSBjdXJyZW50IHRpbWVvdXQgYXMgaXQncyBub3cgYmVlbiB0cmlnZ2VyZWRcclxuXHRcdGlmICh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKTtcclxuXHRcdFx0dmFsdWVDaGFuZ2VkS2V5VXBUaW1lciA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoYXNTZWxlY3Rpb24gJiYgc2F2ZVJhbmdlKSB7XHJcblx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN1cnJlbnRIdG1sID0gc291cmNlTW9kZSA/IHNvdXJjZUVkaXRvci52YWx1ZSA6IHd5c2l3eWdCb2R5LmlubmVySFRNTDtcclxuXHJcblx0XHQvLyBPbmx5IHRyaWdnZXIgaWYgc29tZXRoaW5nIGhhcyBhY3R1YWxseSBjaGFuZ2VkLlxyXG5cdFx0aWYgKGN1cnJlbnRIdG1sICE9PSB0cmlnZ2VyVmFsdWVDaGFuZ2VkLmxhc3RWYWwpIHtcclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZC5sYXN0VmFsID0gY3VycmVudEh0bWw7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICd2YWx1ZWNoYW5nZWQnLCB7XHJcblx0XHRcdFx0cmF3VmFsdWU6IHNvdXJjZU1vZGUgPyBiYXNlLnZhbCgpIDogY3VycmVudEh0bWxcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhhc1NlbGVjdGlvbiAmJiBzYXZlUmFuZ2UpIHtcclxuXHRcdFx0cmFuZ2VIZWxwZXIucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBibHVyIGV2ZW50XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHR2YWx1ZUNoYW5nZWRCbHVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHZhbHVlQ2hhbmdlZEtleVVwVGltZXIpIHtcclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBrZXlwcmVzcyBldmVudFxyXG5cdCAqIEBwYXJhbSAge0V2ZW50fSBlIFRoZSBrZXlwcmVzcyBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0dmFsdWVDaGFuZ2VkS2V5VXAgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHdoaWNoICAgICAgICAgPSBlLndoaWNoLFxyXG5cdFx0XHRsYXN0Q2hhciAgICAgID0gdmFsdWVDaGFuZ2VkS2V5VXAubGFzdENoYXIsXHJcblx0XHRcdGxhc3RXYXNTcGFjZSAgPSAobGFzdENoYXIgPT09IDEzIHx8IGxhc3RDaGFyID09PSAzMiksXHJcblx0XHRcdGxhc3RXYXNEZWxldGUgPSAobGFzdENoYXIgPT09IDggfHwgbGFzdENoYXIgPT09IDQ2KTtcclxuXHJcblx0XHR2YWx1ZUNoYW5nZWRLZXlVcC5sYXN0Q2hhciA9IHdoaWNoO1xyXG5cclxuXHRcdGlmIChpc0NvbXBvc2luZykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gMTMgPSByZXR1cm4gJiAzMiA9IHNwYWNlXHJcblx0XHRpZiAod2hpY2ggPT09IDEzIHx8IHdoaWNoID09PSAzMikge1xyXG5cdFx0XHRpZiAoIWxhc3RXYXNTcGFjZSkge1xyXG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdC8vIDggPSBiYWNrc3BhY2UgJiA0NiA9IGRlbFxyXG5cdFx0fSBlbHNlIGlmICh3aGljaCA9PT0gOCB8fCB3aGljaCA9PT0gNDYpIHtcclxuXHRcdFx0aWYgKCFsYXN0V2FzRGVsZXRlKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCkge1xyXG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0ID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHByZXZpb3VzIHRpbWVvdXQgYW5kIHNldCBhIG5ldyBvbmUuXHJcblx0XHRjbGVhclRpbWVvdXQodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XHJcblxyXG5cdFx0Ly8gVHJpZ2dlciB0aGUgZXZlbnQgMS41cyBhZnRlciB0aGUgbGFzdCBrZXlwcmVzcyBpZiBzcGFjZVxyXG5cdFx0Ly8gaXNuJ3QgcHJlc3NlZC4gVGhpcyBtaWdodCBuZWVkIHRvIGJlIGxvd2VyZWQsIHdpbGwgbmVlZFxyXG5cdFx0Ly8gdG8gbG9vayBpbnRvIHdoYXQgdGhlIHNsb3dlc3QgYXZlcmFnZSBDaGFycyBQZXIgTWluIGlzLlxyXG5cdFx0dmFsdWVDaGFuZ2VkS2V5VXBUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCAxNTAwKTtcclxuXHR9O1xyXG5cclxuXHRoYW5kbGVDb21wb3NpdGlvbiA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpc0NvbXBvc2luZyA9IC9zdGFydC9pLnRlc3QoZS50eXBlKTtcclxuXHJcblx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRhdXRvVXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0YmFzZS51cGRhdGVPcmlnaW5hbCgpO1xyXG5cdH07XHJcblxyXG5cdC8vIHJ1biB0aGUgaW5pdGlhbGl6ZXJcclxuXHRpbml0KCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTWFwIGNvbnRhaW5pbmcgdGhlIGxvYWRlZCBTQ0VkaXRvciBsb2NhbGVzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBuYW1lIGxvY2FsZVxyXG4gKiBAbWVtYmVyT2Ygc2NlZGl0b3JcclxuICovXHJcblNDRWRpdG9yLmxvY2FsZSA9IHt9O1xyXG5cclxuU0NFZGl0b3IuZm9ybWF0cyA9IHt9O1xyXG5TQ0VkaXRvci5pY29ucyA9IHt9O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGF0aWMgY29tbWFuZCBoZWxwZXIgY2xhc3NcclxuICogQGNsYXNzIGNvbW1hbmRcclxuICogQG5hbWUgc2NlZGl0b3IuY29tbWFuZFxyXG4gKi9cclxuU0NFZGl0b3IuY29tbWFuZCA9XHJcbi8qKiBAbGVuZHMgc2NlZGl0b3IuY29tbWFuZCAqL1xyXG57XHJcblx0LyoqXHJcblx0ICogR2V0cyBhIGNvbW1hbmRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0ICogQHJldHVybiB7T2JqZWN0fG51bGx9XHJcblx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdCAqL1xyXG5cdGdldDogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHJldHVybiBkZWZhdWx0Q29tbWFuZHNbbmFtZV0gfHwgbnVsbDtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiA8cD5BZGRzIGEgY29tbWFuZCB0byB0aGUgZWRpdG9yIG9yIHVwZGF0ZXMgYW4gZXhpc3RpbmdcclxuXHQgKiBjb21tYW5kIGlmIGEgY29tbWFuZCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbHJlYWR5IGV4aXN0cy48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5PbmNlIGEgY29tbWFuZCBpcyBhZGQgaXQgY2FuIGJlIGluY2x1ZGVkIGluIHRoZSB0b29sYmFyIGJ5XHJcblx0ICogYWRkaW5nIGl0J3MgbmFtZSB0byB0aGUgdG9vbGJhciBvcHRpb24gaW4gdGhlIGNvbnN0cnVjdG9yLiBJdFxyXG5cdCAqIGNhbiBhbHNvIGJlIGV4ZWN1dGVkIG1hbnVhbGx5IGJ5IGNhbGxpbmdcclxuXHQgKiB7QGxpbmsgc2NlZGl0b3IuZXhlY0NvbW1hbmR9PC9wPlxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBTQ0VkaXRvci5jb21tYW5kLnNldChcImhlbGxvXCIsXHJcblx0ICoge1xyXG5cdCAqICAgICBleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0ICogICAgICAgICBhbGVydChcIkhlbGxvIFdvcmxkIVwiKTtcclxuXHQgKiAgICAgfVxyXG5cdCAqIH0pO1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gY21kXHJcblx0ICogQHJldHVybiB7dGhpc3xmYWxzZX0gUmV0dXJucyBmYWxzZSBpZiBuYW1lIG9yIGNtZCBpcyBmYWxzZVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRzZXQ6IGZ1bmN0aW9uIChuYW1lLCBjbWQpIHtcclxuXHRcdGlmICghbmFtZSB8fCAhY21kKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBtZXJnZSBhbnkgZXhpc3RpbmcgY29tbWFuZCBwcm9wZXJ0aWVzXHJcblx0XHRjbWQgPSB1dGlscy5leHRlbmQoZGVmYXVsdENvbW1hbmRzW25hbWVdIHx8IHt9LCBjbWQpO1xyXG5cclxuXHRcdGNtZC5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFNDRWRpdG9yLmNvbW1hbmQucmVtb3ZlKG5hbWUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRkZWZhdWx0Q29tbWFuZHNbbmFtZV0gPSBjbWQ7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgY29tbWFuZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRyZW1vdmU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRpZiAoZGVmYXVsdENvbW1hbmRzW25hbWVdKSB7XHJcblx0XHRcdGRlbGV0ZSBkZWZhdWx0Q29tbWFuZHNbbmFtZV07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG59O1xyXG4iLCJ2YXIgcGx1Z2lucyA9IHt9O1xuXG4vKipcbiAqIFBsdWdpbiBNYW5hZ2VyIGNsYXNzXG4gKiBAY2xhc3MgUGx1Z2luTWFuYWdlclxuICogQG5hbWUgUGx1Z2luTWFuYWdlclxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbHVnaW5NYW5hZ2VyKHRoaXNPYmopIHtcblx0LyoqXG5cdCAqIEFsaWFzIG9mIHRoaXNcblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuXHR2YXIgYmFzZSA9IHRoaXM7XG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbCBjdXJyZW50bHkgcmVnaXN0ZXJlZCBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciByZWdpc3RlcmVkUGx1Z2lucyA9IFtdO1xuXG5cblx0LyoqXG5cdCAqIENoYW5nZXMgYSBzaWduYWxzIG5hbWUgZnJvbSBcIm5hbWVcIiBpbnRvIFwic2lnbmFsTmFtZVwiLlxuXHQgKlxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHR2YXIgZm9ybWF0U2lnbmFsTmFtZSA9IGZ1bmN0aW9uIChzaWduYWwpIHtcblx0XHRyZXR1cm4gJ3NpZ25hbCcgKyBzaWduYWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzaWduYWwuc2xpY2UoMSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGxzIGhhbmRsZXJzIGZvciBhIHNpZ25hbFxuXHQgKlxuXHQgKiBAc2VlIGNhbGwoKVxuXHQgKiBAc2VlIGNhbGxPbmx5Rmlyc3QoKVxuXHQgKiBAcGFyYW0gIHtBcnJheX0gICBhcmdzXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IHJldHVybkF0Rmlyc3Rcblx0ICogQHJldHVybiB7Kn1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHZhciBjYWxsSGFuZGxlcnMgPSBmdW5jdGlvbiAoYXJncywgcmV0dXJuQXRGaXJzdCkge1xuXHRcdGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3MpO1xuXG5cdFx0dmFyXHRpZHgsIHJldCxcblx0XHRcdHNpZ25hbCA9IGZvcm1hdFNpZ25hbE5hbWUoYXJncy5zaGlmdCgpKTtcblxuXHRcdGZvciAoaWR4ID0gMDsgaWR4IDwgcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoOyBpZHgrKykge1xuXHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpZHhdKSB7XG5cdFx0XHRcdHJldCA9IHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF1bc2lnbmFsXS5hcHBseSh0aGlzT2JqLCBhcmdzKTtcblxuXHRcdFx0XHRpZiAocmV0dXJuQXRGaXJzdCkge1xuXHRcdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIENhbGxzIGFsbCBoYW5kbGVycyBmb3IgdGhlIHBhc3NlZCBzaWduYWxcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcblx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBjYWxsXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5jYWxsID0gZnVuY3Rpb24gKCkge1xuXHRcdGNhbGxIYW5kbGVycyhhcmd1bWVudHMsIGZhbHNlKTtcblx0fTtcblxuXHQvKipcblx0ICogQ2FsbHMgdGhlIGZpcnN0IGhhbmRsZXIgZm9yIGEgc2lnbmFsLCBhbmQgcmV0dXJucyB0aGVcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcblx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXG5cdCAqIEByZXR1cm4geyp9IFRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgaGFuZGxlclxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY2FsbE9ubHlGaXJzdFxuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY2FsbE9ubHlGaXJzdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gY2FsbEhhbmRsZXJzKGFyZ3VtZW50cywgdHJ1ZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiBhIHNpZ25hbCBoYXMgYSBoYW5kbGVyXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gc2lnbmFsXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBoYXNIYW5kbGVyXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5oYXNIYW5kbGVyID0gZnVuY3Rpb24gKHNpZ25hbCkge1xuXHRcdHZhciBpICA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcblx0XHRzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKHNpZ25hbCk7XG5cblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRpZiAoc2lnbmFsIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIHRoZSBwbHVnaW4gZXhpc3RzIGluIHBsdWdpbnNcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGV4aXN0c1xuXHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZXhpc3RzID0gZnVuY3Rpb24gKHBsdWdpbikge1xuXHRcdGlmIChwbHVnaW4gaW4gcGx1Z2lucykge1xuXHRcdFx0cGx1Z2luID0gcGx1Z2luc1twbHVnaW5dO1xuXG5cdFx0XHRyZXR1cm4gdHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHR0eXBlb2YgcGx1Z2luLnByb3RvdHlwZSA9PT0gJ29iamVjdCc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBwbHVnaW4gaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpc1JlZ2lzdGVyZWRcblx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmlzUmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblx0XHRpZiAoYmFzZS5leGlzdHMocGx1Z2luKSkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKGlkeC0tKSB7XG5cdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1tpZHhdIGluc3RhbmNlb2YgcGx1Z2luc1twbHVnaW5dKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVycyBhIHBsdWdpbiB0byByZWNlaXZlIHNpZ25hbHNcblx0ICpcblx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlZ2lzdGVyXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcblx0XHRpZiAoIWJhc2UuZXhpc3RzKHBsdWdpbikgfHwgYmFzZS5pc1JlZ2lzdGVyZWQocGx1Z2luKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHBsdWdpbiA9IG5ldyBwbHVnaW5zW3BsdWdpbl0oKTtcblx0XHRyZWdpc3RlcmVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XG5cblx0XHRpZiAoJ2luaXQnIGluIHBsdWdpbikge1xuXHRcdFx0cGx1Z2luLmluaXQuY2FsbCh0aGlzT2JqKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHQvKipcblx0ICogRGVyZWdpc3RlcnMgYSBwbHVnaW4uXG5cdCAqXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBkZXJlZ2lzdGVyXG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5kZXJlZ2lzdGVyID0gZnVuY3Rpb24gKHBsdWdpbikge1xuXHRcdHZhclx0cmVtb3ZlZFBsdWdpbixcblx0XHRcdHBsdWdpbklkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aCxcblx0XHRcdHJlbW92ZWQgICA9IGZhbHNlO1xuXG5cdFx0aWYgKCFiYXNlLmlzUmVnaXN0ZXJlZChwbHVnaW4pKSB7XG5cdFx0XHRyZXR1cm4gcmVtb3ZlZDtcblx0XHR9XG5cblx0XHR3aGlsZSAocGx1Z2luSWR4LS0pIHtcblx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1twbHVnaW5JZHhdIGluc3RhbmNlb2YgcGx1Z2luc1twbHVnaW5dKSB7XG5cdFx0XHRcdHJlbW92ZWRQbHVnaW4gPSByZWdpc3RlcmVkUGx1Z2lucy5zcGxpY2UocGx1Z2luSWR4LCAxKVswXTtcblx0XHRcdFx0cmVtb3ZlZCAgICAgICA9IHRydWU7XG5cblx0XHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZW1vdmVkUGx1Z2luKSB7XG5cdFx0XHRcdFx0cmVtb3ZlZFBsdWdpbi5kZXN0cm95LmNhbGwodGhpc09iaik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVtb3ZlZDtcblx0fTtcblxuXHQvKipcblx0ICogQ2xlYXJzIGFsbCBwbHVnaW5zIGFuZCByZW1vdmVzIHRoZSBvd25lciByZWZlcmVuY2UuXG5cdCAqXG5cdCAqIENhbGxpbmcgYW55IGZ1bmN0aW9ucyBvbiB0aGlzIG9iamVjdCBhZnRlciBjYWxsaW5nXG5cdCAqIGRlc3Ryb3kgd2lsbCBjYXVzZSBhIEpTIGVycm9yLlxuXHQgKlxuXHQgKiBAbmFtZSBkZXN0cm95XG5cdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBpID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xuXG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZWdpc3RlcmVkUGx1Z2luc1tpXSkge1xuXHRcdFx0XHRyZWdpc3RlcmVkUGx1Z2luc1tpXS5kZXN0cm95LmNhbGwodGhpc09iaik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmVnaXN0ZXJlZFBsdWdpbnMgPSBbXTtcblx0XHR0aGlzT2JqICAgID0gbnVsbDtcblx0fTtcbn1cblxuUGx1Z2luTWFuYWdlci5wbHVnaW5zID0gcGx1Z2lucztcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuXG5cbi8qKlxuICogR2V0cyB0aGUgdGV4dCwgc3RhcnQvZW5kIG5vZGUgYW5kIG9mZnNldCBmb3JcbiAqIGxlbmd0aCBjaGFycyBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBwYXNzZWQgbm9kZVxuICogYXQgdGhlIHNwZWNpZmllZCBvZmZzZXQuXG4gKlxuICogQHBhcmFtICB7Tm9kZX0gIG5vZGVcbiAqIEBwYXJhbSAge251bWJlcn0gIG9mZnNldFxuICogQHBhcmFtICB7Ym9vbGVhbn0gaXNMZWZ0XG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBsZW5ndGhcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBvdXRlclRleHQgPSBmdW5jdGlvbiAocmFuZ2UsIGlzTGVmdCwgbGVuZ3RoKSB7XG5cdHZhciBub2RlVmFsdWUsIHJlbWFpbmluZywgc3RhcnQsIGVuZCwgbm9kZSxcblx0XHR0ZXh0ID0gJycsXG5cdFx0bmV4dCA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLFxuXHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXG5cdC8vIEhhbmRsZSBjYXNlcyB3aGVyZSBub2RlIGlzIGEgcGFyYWdyYXBoIGFuZCBvZmZzZXRcblx0Ly8gcmVmZXJzIHRvIHRoZSBpbmRleCBvZiBhIHRleHQgbm9kZS5cblx0Ly8gMyA9IHRleHQgbm9kZVxuXHRpZiAobmV4dCAmJiBuZXh0Lm5vZGVUeXBlICE9PSAzKSB7XG5cdFx0bmV4dCA9IG5leHQuY2hpbGROb2Rlc1tvZmZzZXRdO1xuXHRcdG9mZnNldCA9IDA7XG5cdH1cblxuXHRzdGFydCA9IGVuZCA9IG9mZnNldDtcblxuXHR3aGlsZSAobGVuZ3RoID4gdGV4dC5sZW5ndGggJiYgbmV4dCAmJiBuZXh0Lm5vZGVUeXBlID09PSAzKSB7XG5cdFx0bm9kZVZhbHVlID0gbmV4dC5ub2RlVmFsdWU7XG5cdFx0cmVtYWluaW5nID0gbGVuZ3RoIC0gdGV4dC5sZW5ndGg7XG5cblx0XHQvLyBJZiBub3QgdGhlIGZpcnN0IG5vZGUsIHN0YXJ0IGFuZCBlbmQgc2hvdWxkIGJlIGF0IHRoZWlyXG5cdFx0Ly8gbWF4IHZhbHVlcyBhcyB3aWxsIGJlIHVwZGF0ZWQgd2hlbiBnZXR0aW5nIHRoZSB0ZXh0XG5cdFx0aWYgKG5vZGUpIHtcblx0XHRcdGVuZCA9IG5vZGVWYWx1ZS5sZW5ndGg7XG5cdFx0XHRzdGFydCA9IDA7XG5cdFx0fVxuXG5cdFx0bm9kZSA9IG5leHQ7XG5cblx0XHRpZiAoaXNMZWZ0KSB7XG5cdFx0XHRzdGFydCA9IE1hdGgubWF4KGVuZCAtIHJlbWFpbmluZywgMCk7XG5cdFx0XHRvZmZzZXQgPSBzdGFydDtcblxuXHRcdFx0dGV4dCA9IG5vZGVWYWx1ZS5zdWJzdHIoc3RhcnQsIGVuZCAtIHN0YXJ0KSArIHRleHQ7XG5cdFx0XHRuZXh0ID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVuZCA9IE1hdGgubWluKHJlbWFpbmluZywgbm9kZVZhbHVlLmxlbmd0aCk7XG5cdFx0XHRvZmZzZXQgPSBzdGFydCArIGVuZDtcblxuXHRcdFx0dGV4dCArPSBub2RlVmFsdWUuc3Vic3RyKHN0YXJ0LCBlbmQpO1xuXHRcdFx0bmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRub2RlOiBub2RlIHx8IG5leHQsXG5cdFx0b2Zmc2V0OiBvZmZzZXQsXG5cdFx0dGV4dDogdGV4dFxuXHR9O1xufTtcblxuLyoqXG4gKiBSYW5nZSBoZWxwZXJcbiAqXG4gKiBAY2xhc3MgUmFuZ2VIZWxwZXJcbiAqIEBuYW1lIFJhbmdlSGVscGVyXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJhbmdlSGVscGVyKHdpbiwgZCwgc2FuaXRpemUpIHtcblx0dmFyXHRfY3JlYXRlTWFya2VyLCBfcHJlcGFyZUlucHV0LFxuXHRcdGRvYyAgICAgICAgICA9IGQgfHwgd2luLmNvbnRlbnREb2N1bWVudCB8fCB3aW4uZG9jdW1lbnQsXG5cdFx0c3RhcnRNYXJrZXIgID0gJ3NjZWRpdG9yLXN0YXJ0LW1hcmtlcicsXG5cdFx0ZW5kTWFya2VyICAgID0gJ3NjZWRpdG9yLWVuZC1tYXJrZXInLFxuXHRcdGJhc2UgICAgICAgICA9IHRoaXM7XG5cblx0LyoqXG5cdCAqIEluc2VydHMgSFRNTCBpbnRvIHRoZSBjdXJyZW50IHJhbmdlIHJlcGxhY2luZyBhbnkgc2VsZWN0ZWRcblx0ICogdGV4dC5cblx0ICpcblx0ICogSWYgZW5kSFRNTCBpcyBzcGVjaWZpZWQgdGhlIHNlbGVjdGVkIGNvbnRlbnRzIHdpbGwgYmUgcHV0IGJldHdlZW5cblx0ICogaHRtbCBhbmQgZW5kSFRNTC4gSWYgdGhlcmUgaXMgbm90aGluZyBzZWxlY3RlZCBodG1sIGFuZCBlbmRIVE1MIGFyZVxuXHQgKiBqdXN0IGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEhUTUxdXG5cdCAqIEByZXR1cm4gRmFsc2Ugb24gZmFpbFxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaW5zZXJ0SFRNTFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmluc2VydEhUTUwgPSBmdW5jdGlvbiAoaHRtbCwgZW5kSFRNTCkge1xuXHRcdHZhclx0bm9kZSwgZGl2LFxuXHRcdFx0cmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKTtcblxuXHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoZW5kSFRNTCkge1xuXHRcdFx0aHRtbCArPSBiYXNlLnNlbGVjdGVkSHRtbCgpICsgZW5kSFRNTDtcblx0XHR9XG5cblx0XHRkaXYgICAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcblx0XHRub2RlICAgICAgICAgID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRkaXYuaW5uZXJIVE1MID0gc2FuaXRpemUoaHRtbCk7XG5cblx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChub2RlLCBkaXYuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0YmFzZS5pbnNlcnROb2RlKG5vZGUpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBQcmVwYXJlcyBIVE1MIHRvIGJlIGluc2VydGVkIGJ5IGFkZGluZyBhIHplcm8gd2lkdGggc3BhY2Vcblx0ICogaWYgdGhlIGxhc3QgY2hpbGQgaXMgZW1wdHkgYW5kIGFkZGluZyB0aGUgcmFuZ2Ugc3RhcnQvZW5kXG5cdCAqIG1hcmtlcnMgdG8gdGhlIGxhc3QgY2hpbGQuXG5cdCAqXG5cdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBub2RlXG5cdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbZW5kTm9kZV1cblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gW3JldHVybkh0bWxdXG5cdCAqIEByZXR1cm4ge05vZGV8c3RyaW5nfVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0X3ByZXBhcmVJbnB1dCA9IGZ1bmN0aW9uIChub2RlLCBlbmROb2RlLCByZXR1cm5IdG1sKSB7XG5cdFx0dmFyIGxhc3RDaGlsZCxcblx0XHRcdGZyYWcgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG5cdFx0aWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKGVuZE5vZGUpIHtcblx0XHRcdFx0bm9kZSArPSBiYXNlLnNlbGVjdGVkSHRtbCgpICsgZW5kTm9kZTtcblx0XHRcdH1cblxuXHRcdFx0ZnJhZyA9IGRvbS5wYXJzZUhUTUwobm9kZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBub2RlKTtcblxuXHRcdFx0aWYgKGVuZE5vZGUpIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGJhc2Uuc2VsZWN0ZWRSYW5nZSgpLmV4dHJhY3RDb250ZW50cygpKTtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGVuZE5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghKGxhc3RDaGlsZCA9IGZyYWcubGFzdENoaWxkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHdoaWxlICghZG9tLmlzSW5saW5lKGxhc3RDaGlsZC5sYXN0Q2hpbGQsIHRydWUpKSB7XG5cdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQubGFzdENoaWxkO1xuXHRcdH1cblxuXHRcdGlmIChkb20uY2FuSGF2ZUNoaWxkcmVuKGxhc3RDaGlsZCkpIHtcblx0XHRcdC8vIFdlYmtpdCB3b24ndCBhbGxvdyB0aGUgY3Vyc29yIHRvIGJlIHBsYWNlZCBpbnNpZGUgYW5cblx0XHRcdC8vIGVtcHR5IHRhZywgc28gYWRkIGEgemVybyB3aWR0aCBzcGFjZSB0byBpdC5cblx0XHRcdGlmICghbGFzdENoaWxkLmxhc3RDaGlsZCkge1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnXFx1MjAwQicpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGFzdENoaWxkID0gZnJhZztcblx0XHR9XG5cblx0XHRiYXNlLnJlbW92ZU1hcmtlcnMoKTtcblxuXHRcdC8vIEFwcGVuZCBtYXJrcyB0byBsYXN0IGNoaWxkIHNvIHdoZW4gcmVzdG9yZWQgY3Vyc29yIHdpbGwgYmUgaW5cblx0XHQvLyB0aGUgcmlnaHQgcGxhY2Vcblx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCBfY3JlYXRlTWFya2VyKHN0YXJ0TWFya2VyKSk7XG5cdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpKTtcblxuXHRcdGlmIChyZXR1cm5IdG1sKSB7XG5cdFx0XHR2YXIgZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgZnJhZyk7XG5cblx0XHRcdHJldHVybiBkaXYuaW5uZXJIVE1MO1xuXHRcdH1cblxuXHRcdHJldHVybiBmcmFnO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBUaGUgc2FtZSBhcyBpbnNlcnRIVE1MIGV4Y2VwdCB3aXRoIERPTSBub2RlcyBpbnN0ZWFkXG5cdCAqXG5cdCAqIDxzdHJvbmc+V2FybmluZzo8L3N0cm9uZz4gdGhlIG5vZGVzIG11c3QgYmVsb25nIHRvIHRoZVxuXHQgKiBkb2N1bWVudCB0aGV5IGFyZSBiZWluZyBpbnNlcnRlZCBpbnRvLiBTb21lIGJyb3dzZXJzXG5cdCAqIHdpbGwgdGhyb3cgZXhjZXB0aW9ucyBpZiB0aGV5IGRvbid0LlxuXHQgKlxuXHQgKiBSZXR1cm5zIGJvb2xlYW4gZmFsc2Ugb24gZmFpbFxuXHQgKlxuXHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0ICogQHBhcmFtIHtOb2RlfSBlbmROb2RlXG5cdCAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIGluc2VydE5vZGVcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5pbnNlcnROb2RlID0gZnVuY3Rpb24gKG5vZGUsIGVuZE5vZGUpIHtcblx0XHR2YXJcdGZpcnN0LCBsYXN0LFxuXHRcdFx0aW5wdXQgID0gX3ByZXBhcmVJbnB1dChub2RlLCBlbmROb2RlKSxcblx0XHRcdHJhbmdlICA9IGJhc2Uuc2VsZWN0ZWRSYW5nZSgpLFxuXHRcdFx0cGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIsXG5cdFx0XHRlbXB0eU5vZGVzID0gW107XG5cblx0XHRpZiAoIWlucHV0KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlSWZFbXB0eShub2RlKSB7XG5cdFx0XHQvLyBPbmx5IHJlbW92ZSBlbXB0eSBub2RlIGlmIGl0IHdhc24ndCBhbHJlYWR5IGVtcHR5XG5cdFx0XHRpZiAobm9kZSAmJiBkb20uaXNFbXB0eShub2RlKSAmJiBlbXB0eU5vZGVzLmluZGV4T2Yobm9kZSkgPCAwKSB7XG5cdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHJhbmdlLnN0YXJ0Q29udGFpbmVyICE9PSByYW5nZS5lbmRDb250YWluZXIpIHtcblx0XHRcdHV0aWxzLmVhY2gocGFyZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChfLCBub2RlKSB7XG5cdFx0XHRcdGlmIChkb20uaXNFbXB0eShub2RlKSkge1xuXHRcdFx0XHRcdGVtcHR5Tm9kZXMucHVzaChub2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGZpcnN0ID0gaW5wdXQuZmlyc3RDaGlsZDtcblx0XHRcdGxhc3QgPSBpbnB1dC5sYXN0Q2hpbGQ7XG5cdFx0fVxuXG5cdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcblxuXHRcdC8vIEZGIGFsbG93cyA8YnIgLz4gdG8gYmUgc2VsZWN0ZWQgYnV0IGluc2VydGluZyBhIG5vZGVcblx0XHQvLyBpbnRvIDxiciAvPiB3aWxsIGNhdXNlIGl0IG5vdCB0byBiZSBkaXNwbGF5ZWQgc28gbXVzdFxuXHRcdC8vIGluc2VydCBiZWZvcmUgdGhlIDxiciAvPiBpbiBGRi5cblx0XHQvLyAzID0gVGV4dE5vZGVcblx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMyAmJiAhZG9tLmNhbkhhdmVDaGlsZHJlbihwYXJlbnQpKSB7XG5cdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGlucHV0LCBwYXJlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyYW5nZS5pbnNlcnROb2RlKGlucHV0KTtcblxuXHRcdFx0Ly8gSWYgYSBub2RlIHdhcyBzcGxpdCBvciBpdHMgY29udGVudHMgZGVsZXRlZCwgcmVtb3ZlIGFueSByZXN1bHRpbmdcblx0XHRcdC8vIGVtcHR5IHRhZ3MuIEZvciBleGFtcGxlOlxuXHRcdFx0Ly8gPHA+fHRlc3Q8L3A+PGRpdj50ZXN0fDwvZGl2PlxuXHRcdFx0Ly8gV2hlbiBkZWxldGVDb250ZW50cyBjb3VsZCBiZWNvbWU6XG5cdFx0XHQvLyA8cD48L3A+fDxkaXY+PC9kaXY+XG5cdFx0XHQvLyBTbyByZW1vdmUgdGhlIGVtcHR5IG9uZXNcblx0XHRcdHJlbW92ZUlmRW1wdHkoZmlyc3QgJiYgZmlyc3QucHJldmlvdXNTaWJsaW5nKTtcblx0XHRcdHJlbW92ZUlmRW1wdHkobGFzdCAmJiBsYXN0Lm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0XHRiYXNlLnJlc3RvcmVSYW5nZSgpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIHNlbGVjdGVkIFJhbmdlXG5cdCAqXG5cdCAqIEByZXR1cm4ge1JhbmdlfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY2xvbmVTZWxlY3RlZFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLmNsb25lU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdHJldHVybiByYW5nZS5jbG9uZVJhbmdlKCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBzZWxlY3RlZCBSYW5nZVxuXHQgKlxuXHQgKiBAcmV0dXJuIHtSYW5nZX1cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdGVkUmFuZ2Vcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5zZWxlY3RlZFJhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0cmFuZ2UsIGZpcnN0Q2hpbGQsXG5cdFx0XHRzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHRpZiAoIXNlbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFdoZW4gY3JlYXRpbmcgYSBuZXcgcmFuZ2UsIHNldCB0aGUgc3RhcnQgdG8gdGhlIGZpcnN0IGNoaWxkXG5cdFx0Ly8gZWxlbWVudCBvZiB0aGUgYm9keSBlbGVtZW50IHRvIGF2b2lkIGVycm9ycyBpbiBGRi5cblx0XHRpZiAoc2VsLnJhbmdlQ291bnQgPD0gMCkge1xuXHRcdFx0Zmlyc3RDaGlsZCA9IGRvYy5ib2R5O1xuXHRcdFx0d2hpbGUgKGZpcnN0Q2hpbGQuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRmaXJzdENoaWxkID0gZmlyc3RDaGlsZC5maXJzdENoaWxkO1xuXHRcdFx0fVxuXG5cdFx0XHRyYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuXHRcdFx0Ly8gTXVzdCBiZSBzZXRTdGFydEJlZm9yZSBvdGhlcndpc2UgaXQgY2FuIGNhdXNlIGluZmluaXRlXG5cdFx0XHQvLyBsb29wcyB3aXRoIGxpc3RzIGluIFdlYktpdC4gU2VlIGlzc3VlIDQ0MlxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoZmlyc3RDaGlsZCk7XG5cblx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XG5cdFx0fVxuXG5cdFx0aWYgKHNlbC5yYW5nZUNvdW50ID4gMCkge1xuXHRcdFx0cmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmFuZ2U7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgaWYgdGhlcmUgaXMgY3VycmVudGx5IGEgc2VsZWN0aW9uXG5cdCAqXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBoYXNTZWxlY3Rpb25cblx0ICogQHNpbmNlIDEuNC40XG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuaGFzU2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0c2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXG5cdFx0cmV0dXJuIHNlbCAmJiBzZWwucmFuZ2VDb3VudCA+IDA7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBIVE1MXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdGVkSHRtbFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNlbGVjdGVkSHRtbCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXJcdGRpdixcblx0XHRcdHJhbmdlID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xuXG5cdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcblx0XHR9XG5cblx0XHRyZXR1cm4gJyc7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHBhcmVudCBub2RlIG9mIHRoZSBzZWxlY3RlZCBjb250ZW50cyBpbiB0aGUgcmFuZ2Vcblx0ICpcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBwYXJlbnROb2RlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UucGFyZW50Tm9kZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgcmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKTtcblxuXHRcdGlmIChyYW5nZSkge1xuXHRcdFx0cmV0dXJuIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogR2V0cyB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBzZWxlY3RlZFxuXHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXG5cdCAqXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHQvKipcblx0ICogR2V0cyB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBzZWxlY3RlZFxuXHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7Tm9kZX0gW25dIFRoZSBlbGVtZW50IHRvIGdldCB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IGZyb21cblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBnZXRGaXJzdEJsb2NrUGFyZW50XjJcblx0ICogQHNpbmNlIDEuNC4xXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZ2V0Rmlyc3RCbG9ja1BhcmVudCA9IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0dmFyIGZ1bmMgPSBmdW5jdGlvbiAoZWxtKSB7XG5cdFx0XHRpZiAoIWRvbS5pc0lubGluZShlbG0sIHRydWUpKSB7XG5cdFx0XHRcdHJldHVybiBlbG07XG5cdFx0XHR9XG5cblx0XHRcdGVsbSA9IGVsbSA/IGVsbS5wYXJlbnROb2RlIDogbnVsbDtcblxuXHRcdFx0cmV0dXJuIGVsbSA/IGZ1bmMoZWxtKSA6IGVsbTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmMobm9kZSB8fCBiYXNlLnBhcmVudE5vZGUoKSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEluc2VydHMgYSBub2RlIGF0IGVpdGhlciB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHQgKlxuXHQgKiBAcGFyYW0ge0Jvb2x9IHN0YXJ0XG5cdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgaW5zZXJ0Tm9kZUF0XG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuaW5zZXJ0Tm9kZUF0ID0gZnVuY3Rpb24gKHN0YXJ0LCBub2RlKSB7XG5cdFx0dmFyXHRjdXJyZW50UmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKSxcblx0XHRcdHJhbmdlICAgICAgICA9IGJhc2UuY2xvbmVTZWxlY3RlZCgpO1xuXG5cdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJhbmdlLmNvbGxhcHNlKHN0YXJ0KTtcblx0XHRyYW5nZS5pbnNlcnROb2RlKG5vZGUpO1xuXG5cdFx0Ly8gUmVzZWxlY3QgdGhlIGN1cnJlbnQgcmFuZ2UuXG5cdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBDaHJvbWUgbG9zaW5nIHRoZSBzZWxlY3Rpb24uIElzc3VlIzgyXG5cdFx0YmFzZS5zZWxlY3RSYW5nZShjdXJyZW50UmFuZ2UpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbWFya2VyIG5vZGVcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXG5cdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdF9jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRiYXNlLnJlbW92ZU1hcmtlcihpZCk7XG5cblx0XHR2YXIgbWFya2VyICA9IGRvbS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xuXHRcdFx0aWQ6IGlkLFxuXHRcdFx0Y2xhc3NOYW1lOiAnc2NlZGl0b3Itc2VsZWN0aW9uIHNjZWRpdG9yLWlnbm9yZScsXG5cdFx0XHRzdHlsZTogJ2Rpc3BsYXk6bm9uZTtsaW5lLWhlaWdodDowJ1xuXHRcdH0sIGRvYyk7XG5cblx0XHRtYXJrZXIuaW5uZXJIVE1MID0gJyAnO1xuXG5cdFx0cmV0dXJuIG1hcmtlcjtcblx0fTtcblxuXHQvKipcblx0ICogSW5zZXJ0cyBzdGFydC9lbmQgbWFya2VycyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdCAqIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHJlc3RvcmVSYW5nZSB0byByZS1zZWxlY3QgdGhlXG5cdCAqIHJhbmdlLlxuXHQgKlxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBpbnNlcnRNYXJrZXJzXG5cdCAqL1xuXHRiYXNlLmluc2VydE1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyXHRjdXJyZW50UmFuZ2UgPSBiYXNlLnNlbGVjdGVkUmFuZ2UoKTtcblx0XHR2YXIgc3RhcnROb2RlID0gX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcik7XG5cblx0XHRiYXNlLnJlbW92ZU1hcmtlcnMoKTtcblx0XHRiYXNlLmluc2VydE5vZGVBdCh0cnVlLCBzdGFydE5vZGUpO1xuXG5cdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBlbmQgbWFya2VyIHNvbWV0aW1lcyBiZWluZyBwbGFjZWQgYmVmb3JlXG5cdFx0Ly8gdGhlIHN0YXJ0IG1hcmtlciB3aGVuIHRoZSByYW5nZSBpcyBjb2xsYXBzZWQuXG5cdFx0aWYgKGN1cnJlbnRSYW5nZSAmJiBjdXJyZW50UmFuZ2UuY29sbGFwc2VkKSB7XG5cdFx0XHRzdGFydE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG5cdFx0XHRcdF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSwgc3RhcnROb2RlLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YmFzZS5pbnNlcnROb2RlQXQoZmFsc2UsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSBtYXJrZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElEXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuXHQgKiBAcmV0dXJuIHtOb2RlfVxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgZ2V0TWFya2VyXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZ2V0TWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0cmV0dXJuIGRvYy5nZXRFbGVtZW50QnlJZChpZCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgdGhlIG1hcmtlciB3aXRoIHRoZSBzcGVjaWZpZWQgSURcblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSByZW1vdmVNYXJrZXJcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHR2YXIgbWFya2VyID0gYmFzZS5nZXRNYXJrZXIoaWQpO1xuXG5cdFx0aWYgKG1hcmtlcikge1xuXHRcdFx0ZG9tLnJlbW92ZShtYXJrZXIpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogUmVtb3ZlcyB0aGUgc3RhcnQvZW5kIG1hcmtlcnNcblx0ICpcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHJlbW92ZU1hcmtlcnNcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuXHRcdGJhc2UucmVtb3ZlTWFya2VyKHN0YXJ0TWFya2VyKTtcblx0XHRiYXNlLnJlbW92ZU1hcmtlcihlbmRNYXJrZXIpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBTYXZlcyB0aGUgY3VycmVudCByYW5nZSBsb2NhdGlvbi4gQWxpYXMgb2YgaW5zZXJ0TWFya2VycygpXG5cdCAqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBzYXZlUmFnZVxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNhdmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRiYXNlLmluc2VydE1hcmtlcnMoKTtcblx0fTtcblxuXHQvKipcblx0ICogU2VsZWN0IHRoZSBzcGVjaWZpZWQgcmFuZ2Vcblx0ICpcblx0ICogQHBhcmFtIHtSYW5nZX0gcmFuZ2Vcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdFJhbmdlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2Uuc2VsZWN0UmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcblx0XHR2YXIgbGFzdENoaWxkO1xuXHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cdFx0dmFyIGNvbnRhaW5lciA9IHJhbmdlLmVuZENvbnRhaW5lcjtcblxuXHRcdC8vIENoZWNrIGlmIGN1cnNvciBpcyBzZXQgYWZ0ZXIgYSBCUiB3aGVuIHRoZSBCUiBpcyB0aGUgb25seVxuXHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXG5cdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXG5cdFx0aWYgKHJhbmdlLmNvbGxhcHNlZCAmJiBjb250YWluZXIgJiZcblx0XHRcdCFkb20uaXNJbmxpbmUoY29udGFpbmVyLCB0cnVlKSkge1xuXG5cdFx0XHRsYXN0Q2hpbGQgPSBjb250YWluZXIubGFzdENoaWxkO1xuXHRcdFx0d2hpbGUgKGxhc3RDaGlsZCAmJiBkb20uaXMobGFzdENoaWxkLCAnLnNjZWRpdG9yLWlnbm9yZScpKSB7XG5cdFx0XHRcdGxhc3RDaGlsZCA9IGxhc3RDaGlsZC5wcmV2aW91c1NpYmxpbmc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb20uaXMobGFzdENoaWxkLCAnYnInKSkge1xuXHRcdFx0XHR2YXIgcm5nID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cdFx0XHRcdHJuZy5zZXRFbmRBZnRlcihsYXN0Q2hpbGQpO1xuXHRcdFx0XHRybmcuY29sbGFwc2UoZmFsc2UpO1xuXG5cdFx0XHRcdGlmIChiYXNlLmNvbXBhcmUocmFuZ2UsIHJuZykpIHtcblx0XHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShsYXN0Q2hpbGQpO1xuXHRcdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHNlbCkge1xuXHRcdFx0YmFzZS5jbGVhcigpO1xuXHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlc3RvcmVzIHRoZSBsYXN0IHJhbmdlIHNhdmVkIGJ5IHNhdmVSYW5nZSgpIG9yIGluc2VydE1hcmtlcnMoKVxuXHQgKlxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgcmVzdG9yZVJhbmdlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UucmVzdG9yZVJhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhclx0aXNDb2xsYXBzZWQsXG5cdFx0XHRyYW5nZSA9IGJhc2Uuc2VsZWN0ZWRSYW5nZSgpLFxuXHRcdFx0c3RhcnQgPSBiYXNlLmdldE1hcmtlcihzdGFydE1hcmtlciksXG5cdFx0XHRlbmQgICA9IGJhc2UuZ2V0TWFya2VyKGVuZE1hcmtlcik7XG5cblx0XHRpZiAoIXN0YXJ0IHx8ICFlbmQgfHwgIXJhbmdlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aXNDb2xsYXBzZWQgPSBzdGFydC5uZXh0U2libGluZyA9PT0gZW5kO1xuXG5cdFx0cmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcblx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShzdGFydCk7XG5cdFx0cmFuZ2Uuc2V0RW5kQWZ0ZXIoZW5kKTtcblxuXHRcdGlmIChpc0NvbGxhcHNlZCkge1xuXHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0fVxuXG5cdFx0YmFzZS5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdFx0YmFzZS5yZW1vdmVNYXJrZXJzKCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFNlbGVjdHMgdGhlIHRleHQgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSByaWdodFxuXHQgKiBAc2luY2UgMS40LjNcblx0ICogQGZ1bmN0aW9uXG5cdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHRiYXNlLnNlbGVjdE91dGVyVGV4dCA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuXHRcdHZhciBzdGFydCwgZW5kLFxuXHRcdFx0cmFuZ2UgPSBiYXNlLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyYW5nZS5jb2xsYXBzZShmYWxzZSk7XG5cblx0XHRzdGFydCA9IG91dGVyVGV4dChyYW5nZSwgdHJ1ZSwgbGVmdCk7XG5cdFx0ZW5kID0gb3V0ZXJUZXh0KHJhbmdlLCBmYWxzZSwgcmlnaHQpO1xuXG5cdFx0cmFuZ2Uuc2V0U3RhcnQoc3RhcnQubm9kZSwgc3RhcnQub2Zmc2V0KTtcblx0XHRyYW5nZS5zZXRFbmQoZW5kLm5vZGUsIGVuZC5vZmZzZXQpO1xuXG5cdFx0YmFzZS5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEdldHMgdGhlIHRleHQgbGVmdCBvciByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0ICpcblx0ICogQHBhcmFtIHtib29sZWFufSBiZWZvcmVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAqIEBzaW5jZSAxLjQuM1xuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuZ2V0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGJlZm9yZSwgbGVuZ3RoKSB7XG5cdFx0dmFyXHRyYW5nZSA9IGJhc2UuY2xvbmVTZWxlY3RlZCgpO1xuXG5cdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdHJhbmdlLmNvbGxhcHNlKCFiZWZvcmUpO1xuXG5cdFx0cmV0dXJuIG91dGVyVGV4dChyYW5nZSwgYmVmb3JlLCBsZW5ndGgpLnRleHQ7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlcGxhY2VzIGtleXdvcmRzIHdpdGggdmFsdWVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IGNhcmV0IHBvc2l0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXl9ICAga2V5d29yZHNcblx0ICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQWZ0ZXIgICAgICBJZiB0byBpbmNsdWRlIHRoZSB0ZXh0IGFmdGVyIHRoZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgY2FyZXQgcG9zaXRpb24gb3IganVzdFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgYmVmb3JlXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0ga2V5d29yZHNTb3J0ZWQgICAgSWYgdGhlIGtleXdvcmRzIGFycmF5IGlzIHByZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCBzaG9ydGVzdCB0byBsb25nZXN0XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSAgbG9uZ2VzdEtleXdvcmQgICAgTGVuZ3RoIG9mIHRoZSBsb25nZXN0IGtleXdvcmRcblx0ICogQHBhcmFtIHtib29sZWFufSByZXF1aXJlV2hpdGVzcGFjZSBJZiB0aGUga2V5IG11c3QgYmUgc3Vycm91bmRlZFxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IHdoaXRlc3BhY2Vcblx0ICogQHBhcmFtIHtzdHJpbmd9ICBrZXlwcmVzc0NoYXIgICAgICBJZiB0aGlzIGlzIGJlaW5nIGNhbGxlZCBmcm9tXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBrZXlwcmVzcyBldmVudCwgdGhpcyBzaG91bGQgYmVcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQgdG8gdGhlIHByZXNzZWQgY2hhcmFjdGVyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSByZXBsYWNlS2V5d29yZFxuXHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdCAqL1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xuXHRiYXNlLnJlcGxhY2VLZXl3b3JkID0gZnVuY3Rpb24gKFxuXHRcdGtleXdvcmRzLFxuXHRcdGluY2x1ZGVBZnRlcixcblx0XHRrZXl3b3Jkc1NvcnRlZCxcblx0XHRsb25nZXN0S2V5d29yZCxcblx0XHRyZXF1aXJlV2hpdGVzcGFjZSxcblx0XHRrZXlwcmVzc0NoYXJcblx0KSB7XG5cdFx0aWYgKCFrZXl3b3Jkc1NvcnRlZCkge1xuXHRcdFx0a2V5d29yZHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHZhciBvdXRlclRleHQsIG1hdGNoLCBtYXRjaFBvcywgc3RhcnRJbmRleCxcblx0XHRcdGxlZnRMZW4sIGNoYXJzTGVmdCwga2V5d29yZCwga2V5d29yZExlbixcblx0XHRcdHdoaXRlc3BhY2VSZWdleCA9ICcoXnxbXFxcXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0pJyxcblx0XHRcdGtleXdvcmRJZHggICAgICA9IGtleXdvcmRzLmxlbmd0aCxcblx0XHRcdHdoaXRlc3BhY2VMZW4gICA9IHJlcXVpcmVXaGl0ZXNwYWNlID8gMSA6IDAsXG5cdFx0XHRtYXhLZXlMZW4gICAgICAgPSBsb25nZXN0S2V5d29yZCB8fFxuXHRcdFx0XHRrZXl3b3Jkc1trZXl3b3JkSWR4IC0gMV1bMF0ubGVuZ3RoO1xuXG5cdFx0aWYgKHJlcXVpcmVXaGl0ZXNwYWNlKSB7XG5cdFx0XHRtYXhLZXlMZW4rKztcblx0XHR9XG5cblx0XHRrZXlwcmVzc0NoYXIgPSBrZXlwcmVzc0NoYXIgfHwgJyc7XG5cdFx0b3V0ZXJUZXh0ICAgID0gYmFzZS5nZXRPdXRlclRleHQodHJ1ZSwgbWF4S2V5TGVuKTtcblx0XHRsZWZ0TGVuICAgICAgPSBvdXRlclRleHQubGVuZ3RoO1xuXHRcdG91dGVyVGV4dCAgICs9IGtleXByZXNzQ2hhcjtcblxuXHRcdGlmIChpbmNsdWRlQWZ0ZXIpIHtcblx0XHRcdG91dGVyVGV4dCArPSBiYXNlLmdldE91dGVyVGV4dChmYWxzZSwgbWF4S2V5TGVuKTtcblx0XHR9XG5cblx0XHR3aGlsZSAoa2V5d29yZElkeC0tKSB7XG5cdFx0XHRrZXl3b3JkICAgID0ga2V5d29yZHNba2V5d29yZElkeF1bMF07XG5cdFx0XHRrZXl3b3JkTGVuID0ga2V5d29yZC5sZW5ndGg7XG5cdFx0XHRzdGFydEluZGV4ID0gTWF0aC5tYXgoMCwgbGVmdExlbiAtIGtleXdvcmRMZW4gLSB3aGl0ZXNwYWNlTGVuKTtcblx0XHRcdG1hdGNoUG9zICAgPSAtMTtcblxuXHRcdFx0aWYgKHJlcXVpcmVXaGl0ZXNwYWNlKSB7XG5cdFx0XHRcdG1hdGNoID0gb3V0ZXJUZXh0XG5cdFx0XHRcdFx0LnN1YnN0cihzdGFydEluZGV4KVxuXHRcdFx0XHRcdC5tYXRjaChuZXcgUmVnRXhwKHdoaXRlc3BhY2VSZWdleCArXG5cdFx0XHRcdFx0XHRlc2NhcGUucmVnZXgoa2V5d29yZCkgKyB3aGl0ZXNwYWNlUmVnZXgpKTtcblxuXHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHQvLyBBZGQgdGhlIGxlbmd0aCBvZiB0aGUgdGV4dCB0aGF0IHdhcyByZW1vdmVkIGJ5XG5cdFx0XHRcdFx0Ly8gc3Vic3RyKCkgYW5kIGFsc28gYWRkIDEgZm9yIHRoZSB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0bWF0Y2hQb3MgPSBtYXRjaC5pbmRleCArIHN0YXJ0SW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1hdGNoUG9zID0gb3V0ZXJUZXh0LmluZGV4T2Yoa2V5d29yZCwgc3RhcnRJbmRleCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtYXRjaFBvcyA+IC0xKSB7XG5cdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgbWF0Y2ggaXMgYmV0d2VlbiBiZWZvcmUgYW5kXG5cdFx0XHRcdC8vIGFmdGVyLCBub3QganVzdCBlbnRpcmVseSBpbiBvbmUgc2lkZSBvciB0aGUgb3RoZXJcblx0XHRcdFx0aWYgKG1hdGNoUG9zIDw9IGxlZnRMZW4gJiZcblx0XHRcdFx0XHRtYXRjaFBvcyArIGtleXdvcmRMZW4gKyB3aGl0ZXNwYWNlTGVuID49IGxlZnRMZW4pIHtcblx0XHRcdFx0XHRjaGFyc0xlZnQgPSBsZWZ0TGVuIC0gbWF0Y2hQb3M7XG5cblx0XHRcdFx0XHQvLyBJZiB0aGUga2V5cHJlc3MgY2hhciBpcyB3aGl0ZSBzcGFjZSB0aGVuIGl0IHNob3VsZFxuXHRcdFx0XHRcdC8vIG5vdCBiZSByZXBsYWNlZCwgb25seSBjaGFycyB0aGF0IGFyZSBwYXJ0IG9mIHRoZVxuXHRcdFx0XHRcdC8vIGtleSBzaG91bGQgYmUgcmVwbGFjZWQuXG5cdFx0XHRcdFx0YmFzZS5zZWxlY3RPdXRlclRleHQoXG5cdFx0XHRcdFx0XHRjaGFyc0xlZnQsXG5cdFx0XHRcdFx0XHRrZXl3b3JkTGVuIC0gY2hhcnNMZWZ0IC1cblx0XHRcdFx0XHRcdFx0KC9eXFxTLy50ZXN0KGtleXByZXNzQ2hhcikgPyAxIDogMClcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0YmFzZS5pbnNlcnRIVE1MKGtleXdvcmRzW2tleXdvcmRJZHhdWzFdKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHQvKipcblx0ICogQ29tcGFyZXMgdHdvIHJhbmdlcy5cblx0ICpcblx0ICogSWYgcmFuZ2VCIGlzIHVuZGVmaW5lZCBpdCB3aWxsIGJlIHNldCB0b1xuXHQgKiB0aGUgY3VycmVudCBzZWxlY3RlZCByYW5nZVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtSYW5nZX0gcm5nQVxuXHQgKiBAcGFyYW0gIHtSYW5nZX0gW3JuZ0JdXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAqIEBmdW5jdGlvblxuXHQgKiBAbmFtZSBjb21wYXJlXG5cdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0ICovXG5cdGJhc2UuY29tcGFyZSA9IGZ1bmN0aW9uIChybmdBLCBybmdCKSB7XG5cdFx0aWYgKCFybmdCKSB7XG5cdFx0XHRybmdCID0gYmFzZS5zZWxlY3RlZFJhbmdlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCFybmdBIHx8ICFybmdCKSB7XG5cdFx0XHRyZXR1cm4gIXJuZ0EgJiYgIXJuZ0I7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJuZ0EuY29tcGFyZUJvdW5kYXJ5UG9pbnRzKFJhbmdlLkVORF9UT19FTkQsIHJuZ0IpID09PSAwICYmXG5cdFx0XHRybmdBLmNvbXBhcmVCb3VuZGFyeVBvaW50cyhSYW5nZS5TVEFSVF9UT19TVEFSVCwgcm5nQikgPT09IDA7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYW55IGN1cnJlbnQgc2VsZWN0aW9uXG5cdCAqXG5cdCAqIEBzaW5jZSAxLjQuNlxuXHQgKiBAZnVuY3Rpb25cblx0ICogQG5hbWUgY2xlYXJcblx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHQgKi9cblx0YmFzZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXG5cdFx0aWYgKHNlbCkge1xuXHRcdFx0aWYgKHNlbC5yZW1vdmVBbGxSYW5nZXMpIHtcblx0XHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRcdFx0fSBlbHNlIGlmIChzZWwuZW1wdHkpIHtcblx0XHRcdFx0c2VsLmVtcHR5KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuIiwidmFyIFVTRVJfQUdFTlQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4vKipcbiAqIERldGVjdHMgaWYgdGhlIGJyb3dzZXIgaXMgaU9TXG4gKlxuICogTmVlZGVkIHRvIGZpeCBpT1Mgc3BlY2lmaWMgYnVnc1xuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaW9zXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpb3MgPSAvaVBob25lfGlQb2R8aVBhZHwgd29zYnJvd3NlclxcLy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cbi8qKlxuICogSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgV1lTSVdZRyBlZGl0aW5nIChlLmcuIG9sZGVyIG1vYmlsZSBicm93c2VycykuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBpc1d5c2l3eWdTdXBwb3J0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNXeXNpd3lnU3VwcG9ydGVkID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyXHRtYXRjaCwgaXNVbnN1cHBvcnRlZDtcblxuXHQvLyBJRSBpcyB0aGUgb25seSBicm93c2VyIHRvIHN1cHBvcnQgZG9jdW1lbnRNb2RlXG5cdHZhciBpZSA9ICEhd2luZG93LmRvY3VtZW50LmRvY3VtZW50TW9kZTtcblx0dmFyIGxlZ2FjeUVkZ2UgPSAnLW1zLWltZS1hbGlnbicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG5cblx0Ly8gQ2hlY2sgaWYgdGhlIGNvbnRlbnRFZGl0YWJsZSBhdHRyaWJ1dGUgaXMgc3VwcG9ydGVkXG5cdGlmICghKCdjb250ZW50RWRpdGFibGUnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgfHxcblx0XHRkaXYuY29udGVudEVkaXRhYmxlICE9PSAndHJ1ZScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBJIHRoaW5rIGJsYWNrYmVycnkgc3VwcG9ydHMgY29udGVudEVkaXRhYmxlIG9yIHdpbGwgYXQgbGVhc3Rcblx0Ly8gZ2l2ZSBhIHZhbGlkIHZhbHVlIGZvciB0aGUgY29udGVudEVkaXRhYmxlIGRldGVjdGlvbiBhYm92ZVxuXHQvLyBzbyBpdCBpc24ndCBpbmNsdWRlZCBpbiB0aGUgYmVsb3cgdGVzdHMuXG5cblx0Ly8gSSBoYXRlIGhhdmluZyB0byBkbyBVQSBzbmlmZmluZyBidXQgc29tZSBtb2JpbGUgYnJvd3NlcnMgc2F5IHRoZXlcblx0Ly8gc3VwcG9ydCBjb250ZW50ZWRpYWJsZSB3aGVuIGl0IGlzbid0IHVzYWJsZSwgaS5lLiB5b3UgY2FuJ3QgZW50ZXJcblx0Ly8gdGV4dC5cblx0Ly8gVGhpcyBpcyB0aGUgb25seSB3YXkgSSBjYW4gdGhpbmsgb2YgdG8gZGV0ZWN0IHRoZW0gd2hpY2ggaXMgYWxzbyBob3dcblx0Ly8gZXZlcnkgb3RoZXIgZWRpdG9yIEkndmUgc2VlbiBkZWFscyB3aXRoIHRoaXMgaXNzdWUuXG5cblx0Ly8gRXhjbHVkZSBPcGVyYSBtb2JpbGUgYW5kIG1pbmlcblx0aXNVbnN1cHBvcnRlZCA9IC9PcGVyYSBNb2JpfE9wZXJhIE1pbmkvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG5cdGlmICgvQW5kcm9pZC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblxuXHRcdGlmICgvU2FmYXJpLy50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgNTM0KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdFx0XHQvLyBUaGlzIGFsc28gbWF0Y2hlcyBDaHJvbWUgd2hpY2ggc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZSB0b29cblx0XHRcdG1hdGNoID0gL1NhZmFyaVxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRcdGlzVW5zdXBwb3J0ZWQgPSAoIW1hdGNoIHx8ICFtYXRjaFsxXSA/IHRydWUgOiBtYXRjaFsxXSA8IDUzNCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBBbWF6b24gU2lsayBzdXBwb3J0cyBpdCwgb2xkZXIgdmVyc2lvbnMgZGlkbid0XG5cdC8vIEFzIGl0IHVzZXMgd2Via2l0IGxpa2UgQW5kcm9pZCwgYXNzdW1lIGl0J3MgdGhlIHNhbWUgYW5kIHN0YXJ0ZWRcblx0Ly8gd29ya2luZyBhdCB2ZXJzaW9ucyA+PSA1MzRcblx0aWYgKC8gU2lsa1xcLy9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRtYXRjaCA9IC9BcHBsZVdlYktpdFxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHR9XG5cblx0Ly8gaU9TIDUrIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGVcblx0aWYgKGlvcykge1xuXHRcdC8vIEJsb2NrIGFueSB2ZXJzaW9uIDw9IDRfeChfeClcblx0XHRpc1Vuc3VwcG9ydGVkID0gL09TIFswLTRdKF9cXGQpKyBsaWtlIE1hYy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cdH1cblxuXHQvLyBGaXJlZm94IGRvZXMgc3VwcG9ydCBXWVNJV1lHIG9uIG1vYmlsZXMgc28gb3ZlcnJpZGVcblx0Ly8gYW55IHByZXZpb3VzIHZhbHVlIGlmIHVzaW5nIEZGXG5cdGlmICgvRmlyZWZveC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHRpZiAoL09uZUJyb3dzZXIvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gVUNCcm93c2VyIHdvcmtzIGJ1dCBkb2Vzbid0IGdpdmUgYSB1bmlxdWUgdXNlciBhZ2VudFxuXHRpZiAobmF2aWdhdG9yLnZlbmRvciA9PT0gJ1VDV0VCJykge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElFIGFuZCBsZWdhY3kgZWRnZSBhcmUgbm90IHN1cHBvcnRlZCBhbnkgbW9yZVxuXHRpZiAoaWUgfHwgbGVnYWN5RWRnZSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSB0cnVlO1xuXHR9XG5cblx0cmV0dXJuICFpc1Vuc3VwcG9ydGVkO1xufSgpKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuaW1wb3J0IF90bXBsIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcblxuLyoqXG4gKiBGaXhlcyBhIGJ1ZyBpbiBGRiB3aGVyZSBpdCBzb21ldGltZXMgd3JhcHNcbiAqIG5ldyBsaW5lcyBpbiB0aGVpciBvd24gbGlzdCBpdGVtLlxuICogU2VlIGlzc3VlICMzNTlcbiAqL1xuZnVuY3Rpb24gZml4RmlyZWZveExpc3RCdWcoZWRpdG9yKSB7XG5cdC8vIE9ubHkgYXBwbHkgdG8gRmlyZWZveCBhcyB3aWxsIGJyZWFrIG90aGVyIGJyb3dzZXJzLlxuXHRpZiAoJ21vekhpZGRlbicgaW4gZG9jdW1lbnQpIHtcblx0XHR2YXIgbm9kZSA9IGVkaXRvci5nZXRCb2R5KCk7XG5cdFx0dmFyIG5leHQ7XG5cblx0XHR3aGlsZSAobm9kZSkge1xuXHRcdFx0bmV4dCA9IG5vZGU7XG5cblx0XHRcdGlmIChuZXh0LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0bmV4dCA9IG5leHQuZmlyc3RDaGlsZDtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0d2hpbGUgKG5leHQgJiYgIW5leHQubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5wYXJlbnROb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5uZXh0U2libGluZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAvW1xcblxcclxcdF0rLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkge1xuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBpZiBuZXdsaW5lcyBhcmUgY29sbGFwc2VkXG5cdFx0XHRcdGlmICghL15wcmUvLnRlc3QoZG9tLmNzcyhub2RlLnBhcmVudE5vZGUsICd3aGl0ZVNwYWNlJykpKSB7XG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbmV4dDtcblx0XHR9XG5cdH1cbn1cblxuXG4vKipcbiAqIE1hcCBvZiBhbGwgdGhlIGNvbW1hbmRzIGZvciBFbWxFZGl0b3JcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAbmFtZSBjb21tYW5kc1xuICovXG52YXIgZGVmYXVsdENtZHMgPSB7XG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJvbGRcblx0Ym9sZDoge1xuXHRcdGV4ZWM6ICdib2xkJyxcblx0XHR0b29sdGlwOiAnQm9sZCcsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0InXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEl0YWxpY1xuXHRpdGFsaWM6IHtcblx0XHRleGVjOiAnaXRhbGljJyxcblx0XHR0b29sdGlwOiAnSXRhbGljJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrSSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogVW5kZXJsaW5lXG5cdHVuZGVybGluZToge1xuXHRcdGV4ZWM6ICd1bmRlcmxpbmUnLFxuXHRcdHRvb2x0aXA6ICdVbmRlcmxpbmUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtVJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdHJpa2V0aHJvdWdoXG5cdHN0cmlrZToge1xuXHRcdGV4ZWM6ICdzdHJpa2V0aHJvdWdoJyxcblx0XHR0b29sdGlwOiAnU3RyaWtldGhyb3VnaCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogU3Vic2NyaXB0XG5cdHN1YnNjcmlwdDoge1xuXHRcdGV4ZWM6ICdzdWJzY3JpcHQnLFxuXHRcdHRvb2x0aXA6ICdTdWJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1cGVyc2NyaXB0XG5cdHN1cGVyc2NyaXB0OiB7XG5cdFx0ZXhlYzogJ3N1cGVyc2NyaXB0Jyxcblx0XHR0b29sdGlwOiAnU3VwZXJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGVmdFxuXHRsZWZ0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otbGVmdFxuXHRcdFx0XHRyZXR1cm4gL2xlZnQvLnRlc3QoYWxpZ24pIHx8XG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdzdGFydCcgOiAnZW5kJyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRleGVjOiAnanVzdGlmeWxlZnQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiBsZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDZW50cmVcblx0Y2VudGVyOiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnljZW50ZXInLFxuXHRcdHRvb2x0aXA6ICdDZW50ZXInXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJpZ2h0XG5cdHJpZ2h0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otcmlnaHRcblx0XHRcdFx0cmV0dXJuIC9yaWdodC8udGVzdChhbGlnbikgfHxcblx0XHRcdFx0XHRhbGlnbiA9PT0gKGlzTHRyID8gJ2VuZCcgOiAnc3RhcnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGV4ZWM6ICdqdXN0aWZ5cmlnaHQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiByaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogSnVzdGlmeVxuXHRqdXN0aWZ5OiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnlmdWxsJyxcblx0XHR0b29sdGlwOiAnSnVzdGlmeSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBGb250XG5cdGZvbnQ6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2ZvbnQnKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLm9wdHMuZm9udHMuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChmb250KSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZm9udE9wdCcsIHtcblx0XHRcdFx0XHRmb250OiBmb250XG5cdFx0XHRcdH0sIHRydWUpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udC1waWNrZXInLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5mb250Ll9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGZvbnROYW1lKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udG5hbWUnLCBmb250TmFtZSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IE5hbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNpemVcblx0c2l6ZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnc2l6ZScpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSA3OyBpKyspIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdzaXplT3B0Jywge1xuXHRcdFx0XHRcdHNpemU6IGlcblx0XHRcdFx0fSwgdHJ1ZSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udHNpemUtcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuc2l6ZS5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250U2l6ZSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRzaXplJywgZm9udFNpemUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBTaXplJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2xvdXJcblx0Y29sb3I6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0aHRtbCAgICA9ICcnLFxuXHRcdFx0XHRjbWQgICAgID0gZGVmYXVsdENtZHMuY29sb3I7XG5cblx0XHRcdGlmICghY21kLl9odG1sQ2FjaGUpIHtcblx0XHRcdFx0ZWRpdG9yLm9wdHMuY29sb3JzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XG5cdFx0XHRcdFx0aHRtbCArPSAnPGRpdiBjbGFzcz1cInNjZWRpdG9yLWNvbG9yLWNvbHVtblwiPic7XG5cblx0XHRcdFx0XHRjb2x1bW4uc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChjb2xvcikge1xuXHRcdFx0XHRcdFx0aHRtbCArPVxuXHRcdFx0XHRcdFx0XHQnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNjZWRpdG9yLWNvbG9yLW9wdGlvblwiJyArXG5cdFx0XHRcdFx0XHRcdCcgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnICsgY29sb3IgKyAnXCInICtcblx0XHRcdFx0XHRcdFx0JyBkYXRhLWNvbG9yPVwiJyArIGNvbG9yICsgJ1wiPjwvYT4nO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aHRtbCArPSAnPC9kaXY+Jztcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Y21kLl9odG1sQ2FjaGUgPSBodG1sO1xuXHRcdFx0fVxuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgZG9tLnBhcnNlSFRNTChjbWQuX2h0bWxDYWNoZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnY29sb3InKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2NvbG9yLXBpY2tlcicsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmNvbG9yLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGNvbG9yKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9yZWNvbG9yJywgY29sb3IpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBDb2xvcidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUmVtb3ZlIEZvcm1hdFxuXHRyZW1vdmVmb3JtYXQ6IHtcblx0XHRleGVjOiAncmVtb3ZlZm9ybWF0Jyxcblx0XHR0b29sdGlwOiAnUmVtb3ZlIEZvcm1hdHRpbmcnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogQ3V0XG5cdGN1dDoge1xuXHRcdGV4ZWM6ICdjdXQnLFxuXHRcdHRvb2x0aXA6ICdDdXQnLFxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY3V0IGNvbW1hbmQuICcgK1xuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLVgnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvcHlcblx0Y29weToge1xuXHRcdGV4ZWM6ICdjb3B5Jyxcblx0XHR0b29sdGlwOiAnQ29weScsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjb3B5IGNvbW1hbmQuICcgK1xuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLUMnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlXG5cdHBhc3RlOiB7XG5cdFx0ZXhlYzogJ3Bhc3RlJyxcblx0XHR0b29sdGlwOiAnUGFzdGUnLFxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgcGFzdGUgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtVidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGUgVGV4dFxuXHRwYXN0ZXRleHQ6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdHZhbCxcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0ZWRpdG9yICA9IHRoaXM7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgncGFzdGV0ZXh0Jywge1xuXHRcdFx0XHRsYWJlbDogZWRpdG9yLl8oXG5cdFx0XHRcdFx0J1Bhc3RlIHlvdXIgdGV4dCBpbnNpZGUgdGhlIGZvbGxvd2luZyBib3g6J1xuXHRcdFx0XHQpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YWwgPSBkb20uZmluZChjb250ZW50LCAnI3R4dCcpWzBdLnZhbHVlO1xuXG5cdFx0XHRcdGlmICh2YWwpIHtcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydFRleHQodmFsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ3Bhc3RldGV4dCcsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1Bhc3RlIFRleHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJ1bGxldCBMaXN0XG5cdGJ1bGxldGxpc3Q6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcblx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ2luc2VydHVub3JkZXJlZGxpc3QnKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdCdWxsZXQgbGlzdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogT3JkZXJlZCBMaXN0XG5cdG9yZGVyZWRsaXN0OiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0Zml4RmlyZWZveExpc3RCdWcodGhpcyk7XG5cdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdpbnNlcnRvcmRlcmVkbGlzdCcpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ051bWJlcmVkIGxpc3QnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEluZGVudFxuXHRpbmRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudCwgZmlyc3RCbG9jaykge1xuXHRcdFx0Ly8gT25seSB3b3JrcyB3aXRoIGxpc3RzLCBmb3Igbm93XG5cdFx0XHR2YXJcdHJhbmdlLCBzdGFydFBhcmVudCwgZW5kUGFyZW50O1xuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICdsaScpKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIHdob2xlIGxpc3QgaXMgc2VsZWN0ZWQsIHRoZW4gdGhpcyBtdXN0IGJlXG5cdFx0XHRcdC8vIGludmFsaWRhdGVkIGJlY2F1c2UgdGhlIGJyb3dzZXIgd2lsbCBwbGFjZSBhXG5cdFx0XHRcdC8vIDxibG9ja3F1b3RlPiB0aGVyZVxuXHRcdFx0XHRyYW5nZSA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdFx0c3RhcnRQYXJlbnQgPSByYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xuXHRcdFx0XHRlbmRQYXJlbnQgICA9IHJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnROb2RlO1xuXG5cdFx0XHRcdC8vIFRPRE86IGNvdWxkIHVzZSBub2RlVHlwZSBmb3IgdGhpcz9cblx0XHRcdFx0Ly8gTWF5YmUganVzdCBjaGVjayB0aGUgZmlyc3RCbG9jayBjb250YWlucyBib3RoIHRoZSBzdGFydFxuXHRcdFx0XHQvL2FuZCBlbmQgY29udGFpbmVyc1xuXG5cdFx0XHRcdC8vIFNlbGVjdCB0aGUgdGFnLCBub3QgdGhlIHRleHROb2RlXG5cdFx0XHRcdC8vICh0aGF0J3Mgd2h5IHRoZSBwYXJlbnROb2RlKVxuXHRcdFx0XHRpZiAoc3RhcnRQYXJlbnQgIT09XG5cdFx0XHRcdFx0c3RhcnRQYXJlbnQucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCB8fFxuXHRcdFx0XHRcdC8vIHdvcmsgYXJvdW5kIGEgYnVnIGluIEZGXG5cdFx0XHRcdFx0KGRvbS5pcyhlbmRQYXJlbnQsICdsaScpICYmIGVuZFBhcmVudCAhPT1cblx0XHRcdFx0XHRcdGVuZFBhcmVudC5wYXJlbnROb2RlLmxhc3RFbGVtZW50Q2hpbGQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdGJsb2NrID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0Ly8gQW4gaW5kZW50IHN5c3RlbSBpcyBxdWl0ZSBjb21wbGljYXRlZCBhcyB0aGVyZSBhcmUgbG9hZHNcblx0XHRcdC8vIG9mIGNvbXBsaWNhdGlvbnMgYW5kIGlzc3VlcyBhcm91bmQgaG93IHRvIGluZGVudCB0ZXh0XG5cdFx0XHQvLyBBcyBkZWZhdWx0LCBsZXQncyBqdXN0IHN0YXkgd2l0aCBpbmRlbnRpbmcgdGhlIGxpc3RzLFxuXHRcdFx0Ly8gYXQgbGVhc3QsIGZvciBub3cuXG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdpbmRlbnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdBZGQgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBPdXRkZW50XG5cdG91dGRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudHMsIGZpcnN0QmxvY2spIHtcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdChmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpID8gMCA6IC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRibG9jayA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnb3V0ZGVudCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1JlbW92ZSBvbmUgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRhYmxlXG5cdHRhYmxlOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcyxcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd0YWJsZScsIHtcblx0XHRcdFx0cm93czogZWRpdG9yLl8oJ1Jvd3M6JyksXG5cdFx0XHRcdGNvbHM6IGVkaXRvci5fKCdDb2xzOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXJcdHJvd3MgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNyb3dzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGNvbHMgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNjb2xzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGh0bWwgPSAnPHRhYmxlPic7XG5cblx0XHRcdFx0aWYgKHJvd3MgPiAwICYmIGNvbHMgPiAwKSB7XG5cdFx0XHRcdFx0aHRtbCArPSBBcnJheShyb3dzICsgMSkuam9pbihcblx0XHRcdFx0XHRcdCc8dHI+JyArXG5cdFx0XHRcdFx0XHRcdEFycmF5KGNvbHMgKyAxKS5qb2luKFxuXHRcdFx0XHRcdFx0XHRcdCc8dGQ+PGJyIC8+PC90ZD4nXG5cdFx0XHRcdFx0XHRcdCkgK1xuXHRcdFx0XHRcdFx0JzwvdHI+J1xuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRodG1sICs9ICc8L3RhYmxlPic7XG5cblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoaHRtbCk7XG5cdFx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydHRhYmxlJywgY29udGVudCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgdGFibGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogSG9yaXpvbnRhbCBSdWxlXG5cdGhvcml6b250YWxydWxlOiB7XG5cdFx0ZXhlYzogJ2luc2VydGhvcml6b250YWxydWxlJyxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgaG9yaXpvbnRhbCBydWxlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvZGVcblx0Y29kZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdCc8Y29kZT4nLFxuXHRcdFx0XHQnPGJyIC8+PC9jb2RlPidcblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnQ29kZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBJbWFnZVxuXHRpbWFnZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBzZWxlY3RlZCwgY2IpIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdpbWFnZScsIHtcblx0XHRcdFx0dXJsOiBlZGl0b3IuXygnVVJMOicpLFxuXHRcdFx0XHR3aWR0aDogZWRpdG9yLl8oJ1dpZHRoIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGhlaWdodDogZWRpdG9yLl8oJ0hlaWdodCAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cblx0XHRcdHZhclx0dXJsSW5wdXQgPSBkb20uZmluZChjb250ZW50LCAnI2ltYWdlJylbMF07XG5cblx0XHRcdHVybElucHV0LnZhbHVlID0gc2VsZWN0ZWQ7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICh1cmxJbnB1dC52YWx1ZSkge1xuXHRcdFx0XHRcdGNiKFxuXHRcdFx0XHRcdFx0dXJsSW5wdXQudmFsdWUsXG5cdFx0XHRcdFx0XHRkb20uZmluZChjb250ZW50LCAnI3dpZHRoJylbMF0udmFsdWUsXG5cdFx0XHRcdFx0XHRkb20uZmluZChjb250ZW50LCAnI2hlaWdodCcpWzBdLnZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGltYWdlJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5pbWFnZS5fZHJvcERvd24oXG5cdFx0XHRcdGVkaXRvcixcblx0XHRcdFx0Y2FsbGVyLFxuXHRcdFx0XHQnJyxcblx0XHRcdFx0ZnVuY3Rpb24gKHVybCwgd2lkdGgsIGhlaWdodCkge1xuXHRcdFx0XHRcdHZhciBhdHRycyAgPSAnJztcblxuXHRcdFx0XHRcdGlmICh3aWR0aCkge1xuXHRcdFx0XHRcdFx0YXR0cnMgKz0gJyB3aWR0aD1cIicgKyBwYXJzZUludCh3aWR0aCwgMTApICsgJ1wiJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIGhlaWdodD1cIicgKyBwYXJzZUludChoZWlnaHQsIDEwKSArICdcIic7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YXR0cnMgKz0gJyBzcmM9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCInO1xuXG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHRcdFx0JzxpbWcnICsgYXR0cnMgKyAnIC8+J1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGltYWdlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEUtbWFpbFxuXHRlbWFpbDoge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYikge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2VtYWlsJywge1xuXHRcdFx0XHRsYWJlbDogZWRpdG9yLl8oJ0UtbWFpbDonKSxcblx0XHRcdFx0ZGVzYzogZWRpdG9yLl8oJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciBlbWFpbCA9IGRvbS5maW5kKGNvbnRlbnQsICcjZW1haWwnKVswXS52YWx1ZTtcblxuXHRcdFx0XHRpZiAoZW1haWwpIHtcblx0XHRcdFx0XHRjYihlbWFpbCwgZG9tLmZpbmQoY29udGVudCwgJyNkZXMnKVswXS52YWx1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRlbWFpbCcsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuZW1haWwuX2Ryb3BEb3duKFxuXHRcdFx0XHRlZGl0b3IsXG5cdFx0XHRcdGNhbGxlcixcblx0XHRcdFx0ZnVuY3Rpb24gKGVtYWlsLCB0ZXh0KSB7XG5cdFx0XHRcdFx0aWYgKCFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSB8fCB0ZXh0KSB7XG5cdFx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArXG5cdFx0XHRcdFx0XHRcdCdtYWlsdG86JyArIGVzY2FwZS5lbnRpdGllcyhlbWFpbCkgKyAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKCh0ZXh0IHx8IGVtYWlsKSkgK1xuXHRcdFx0XHRcdFx0XHQnPC9hPidcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsICdtYWlsdG86JyArIGVtYWlsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGVtYWlsJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IExpbmtcblx0bGluazoge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYikge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnbGluaycsIHtcblx0XHRcdFx0dXJsOiBlZGl0b3IuXygnVVJMOicpLFxuXHRcdFx0XHRkZXNjOiBlZGl0b3IuXygnRGVzY3JpcHRpb24gKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aW5zOiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0dmFyIGxpbmtJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjbGluaycpWzBdO1xuXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRVcmwoZSkge1xuXHRcdFx0XHRpZiAobGlua0lucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2IobGlua0lucHV0LnZhbHVlLCBkb20uZmluZChjb250ZW50LCAnI2RlcycpWzBdLnZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGluc2VydFVybCk7XG5cdFx0XHRkb20ub24oY29udGVudCwgJ2tleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Ly8gMTMgPSBlbnRlciBrZXlcblx0XHRcdFx0aWYgKGUud2hpY2ggPT09IDEzICYmIGxpbmtJbnB1dC52YWx1ZSkge1xuXHRcdFx0XHRcdGluc2VydFVybChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgZG9tLkVWRU5UX0NBUFRVUkUpO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmxpbmsuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAodXJsLCB0ZXh0KSB7XG5cdFx0XHRcdGlmICh0ZXh0IHx8ICFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSkge1xuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArIGVzY2FwZS5lbnRpdGllcyh1cmwpICsgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCB8fCB1cmwpICtcblx0XHRcdFx0XHRcdCc8L2E+J1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgdXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgbGluaydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBVbmxpbmtcblx0dW5saW5rOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdCh0aGlzLmN1cnJlbnROb2RlKCksICdhJykgPyAwIDogLTE7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYW5jaG9yID0gZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50Tm9kZSgpLCAnYScpO1xuXG5cdFx0XHRpZiAoYW5jaG9yKSB7XG5cdFx0XHRcdHdoaWxlIChhbmNob3IuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoYW5jaG9yLmZpcnN0Q2hpbGQsIGFuY2hvcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkb20ucmVtb3ZlKGFuY2hvcik7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnVW5saW5rJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUXVvdGVcblx0cXVvdGU6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyLCBodG1sLCBhdXRob3IpIHtcblx0XHRcdHZhclx0YmVmb3JlID0gJzxibG9ja3F1b3RlPicsXG5cdFx0XHRcdGVuZCAgICA9ICc8L2Jsb2NrcXVvdGU+JztcblxuXHRcdFx0Ly8gaWYgdGhlcmUgaXMgSFRNTCBwYXNzZWQgc2V0IGVuZCB0byBudWxsIHNvIGFueSBzZWxlY3RlZFxuXHRcdFx0Ly8gdGV4dCBpcyByZXBsYWNlZFxuXHRcdFx0aWYgKGh0bWwpIHtcblx0XHRcdFx0YXV0aG9yID0gKGF1dGhvciA/ICc8Y2l0ZT4nICtcblx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoYXV0aG9yKSArXG5cdFx0XHRcdCc8L2NpdGU+JyA6ICcnKTtcblx0XHRcdFx0YmVmb3JlID0gYmVmb3JlICsgYXV0aG9yICsgaHRtbCArIGVuZDtcblx0XHRcdFx0ZW5kICAgID0gbnVsbDtcblx0XHRcdC8vIGlmIG5vdCBhZGQgYSBuZXdsaW5lIHRvIHRoZSBlbmQgb2YgdGhlIGluc2VydGVkIHF1b3RlXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSA9PT0gJycpIHtcblx0XHRcdFx0ZW5kID0gJzxiciAvPicgKyBlbmQ7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoYmVmb3JlLCBlbmQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFF1b3RlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEVtb3RpY29uc1xuXHRlbW90aWNvbjoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHR2YXIgY3JlYXRlQ29udGVudCA9IGZ1bmN0aW9uIChpbmNsdWRlTW9yZSkge1xuXHRcdFx0XHR2YXJcdG1vcmVMaW5rLFxuXHRcdFx0XHRcdG9wdHMgICAgICAgICAgICA9IGVkaXRvci5vcHRzLFxuXHRcdFx0XHRcdGVtb3RpY29uc1Jvb3QgICA9IG9wdHMuZW1vdGljb25zUm9vdCB8fCAnJyxcblx0XHRcdFx0XHRlbW90aWNvbnNDb21wYXQgPSBvcHRzLmVtb3RpY29uc0NvbXBhdCxcblx0XHRcdFx0XHRyYW5nZUhlbHBlciAgICAgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcblx0XHRcdFx0XHRzdGFydFNwYWNlICAgICAgPSBlbW90aWNvbnNDb21wYXQgJiZcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dCh0cnVlLCAxKSAhPT0gJyAnID8gJyAnIDogJycsXG5cdFx0XHRcdFx0ZW5kU3BhY2UgICAgICAgID0gZW1vdGljb25zQ29tcGF0ICYmXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5nZXRPdXRlclRleHQoZmFsc2UsIDEpICE9PSAnICcgPyAnICcgOiAnJyxcblx0XHRcdFx0XHRjb250ZW50ICAgICAgICAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdFx0bGluZSAgICAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRcdHBlckxpbmUgICAgICAgICA9IDAsXG5cdFx0XHRcdFx0ZW1vdGljb25zICAgICAgID0gdXRpbHMuZXh0ZW5kKFxuXHRcdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0XHRvcHRzLmVtb3RpY29ucy5kcm9wZG93bixcblx0XHRcdFx0XHRcdGluY2x1ZGVNb3JlID8gb3B0cy5lbW90aWNvbnMubW9yZSA6IHt9XG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XG5cblx0XHRcdFx0cGVyTGluZSA9IE1hdGguc3FydChPYmplY3Qua2V5cyhlbW90aWNvbnMpLmxlbmd0aCk7XG5cblx0XHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdpbWcnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGVkaXRvci5pbnNlcnQoc3RhcnRTcGFjZSArIGRvbS5hdHRyKHRoaXMsICdhbHQnKSArIGVuZFNwYWNlLFxuXHRcdFx0XHRcdFx0bnVsbCwgZmFsc2UpLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoY29kZSwgZW1vdGljb24pIHtcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobGluZSwgZG9tLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcblx0XHRcdFx0XHRcdHNyYzogZW1vdGljb25zUm9vdCArIChlbW90aWNvbi51cmwgfHwgZW1vdGljb24pLFxuXHRcdFx0XHRcdFx0YWx0OiBjb2RlLFxuXHRcdFx0XHRcdFx0dGl0bGU6IGVtb3RpY29uLnRvb2x0aXAgfHwgY29kZVxuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRcdGlmIChsaW5lLmNoaWxkcmVuLmxlbmd0aCA+PSBwZXJMaW5lKSB7XG5cdFx0XHRcdFx0XHRsaW5lID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGxpbmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKCFpbmNsdWRlTW9yZSAmJiBvcHRzLmVtb3RpY29ucy5tb3JlKSB7XG5cdFx0XHRcdFx0bW9yZUxpbmsgPSBkb20uY3JlYXRlRWxlbWVudCgnYScsIHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ3NjZWRpdG9yLW1vcmUnXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobW9yZUxpbmssXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlZGl0b3IuXygnTW9yZScpKSk7XG5cblx0XHRcdFx0XHRkb20ub24obW9yZUxpbmssICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oXG5cdFx0XHRcdFx0XHRcdGNhbGxlciwgJ21vcmUtZW1vdGljb25zJywgY3JlYXRlQ29udGVudCh0cnVlKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIG1vcmVMaW5rKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2Vtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQoZmFsc2UpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdGRlZmF1bHRDbWRzLmVtb3RpY29uLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBlbW90aWNvbidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBZb3VUdWJlXG5cdHlvdXR1YmU6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd5b3V0dWJlTWVudScsIHtcblx0XHRcdFx0bGFiZWw6IGVkaXRvci5fKCdWaWRlbyBVUkw6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBkb20uZmluZChjb250ZW50LCAnI2xpbmsnKVswXS52YWx1ZTtcblx0XHRcdFx0dmFyIGlkTWF0Y2ggPSB2YWwubWF0Y2goLyg/OnY9fHZcXC98ZW1iZWRcXC98eW91dHUuYmVcXC8pPyhbYS16QS1aMC05Xy1dezExfSkvKTtcblx0XHRcdFx0dmFyIHRpbWVNYXRjaCA9IHZhbC5tYXRjaCgvWyZ8P10oPzpzdGFyKT90PSgoXFxkK1tobXNdPyl7MSwzfSkvKTtcblx0XHRcdFx0dmFyIHRpbWUgPSAwO1xuXG5cdFx0XHRcdGlmICh0aW1lTWF0Y2gpIHtcblx0XHRcdFx0XHR1dGlscy5lYWNoKHRpbWVNYXRjaFsxXS5zcGxpdCgvW2htc10vKSwgZnVuY3Rpb24gKGksIHZhbCkge1xuXHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0dGltZSA9ICh0aW1lICogNjApICsgTnVtYmVyKHZhbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWRNYXRjaCAmJiAvXlthLXpBLVowLTlfLV17MTF9JC8udGVzdChpZE1hdGNoWzFdKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKGlkTWF0Y2hbMV0sIHRpbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGJ0bikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLnlvdXR1YmUuX2Ryb3BEb3duKGVkaXRvciwgYnRuLCBmdW5jdGlvbiAoaWQsIHRpbWUpIHtcblx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKF90bXBsKCd5b3V0dWJlJywge1xuXHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFlvdVR1YmUgdmlkZW8nXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRGF0ZVxuXHRkYXRlOiB7XG5cdFx0X2RhdGU6IGZ1bmN0aW9uIChlZGl0b3IpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHR5ZWFyICA9IG5vdy5nZXRZZWFyKCksXG5cdFx0XHRcdG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxLFxuXHRcdFx0XHRkYXkgICA9IG5vdy5nZXREYXRlKCk7XG5cblx0XHRcdGlmICh5ZWFyIDwgMjAwMCkge1xuXHRcdFx0XHR5ZWFyID0gMTkwMCArIHllYXI7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtb250aCA8IDEwKSB7XG5cdFx0XHRcdG1vbnRoID0gJzAnICsgbW9udGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXkgPCAxMCkge1xuXHRcdFx0XHRkYXkgPSAnMCcgKyBkYXk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlZGl0b3Iub3B0cy5kYXRlRm9ybWF0XG5cdFx0XHRcdC5yZXBsYWNlKC95ZWFyL2ksIHllYXIpXG5cdFx0XHRcdC5yZXBsYWNlKC9tb250aC9pLCBtb250aClcblx0XHRcdFx0LnJlcGxhY2UoL2RheS9pLCBkYXkpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IGRhdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVGltZVxuXHR0aW1lOiB7XG5cdFx0X3RpbWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRob3VycyA9IG5vdy5nZXRIb3VycygpLFxuXHRcdFx0XHRtaW5zICA9IG5vdy5nZXRNaW51dGVzKCksXG5cdFx0XHRcdHNlY3MgID0gbm93LmdldFNlY29uZHMoKTtcblxuXHRcdFx0aWYgKGhvdXJzIDwgMTApIHtcblx0XHRcdFx0aG91cnMgPSAnMCcgKyBob3Vycztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1pbnMgPCAxMCkge1xuXHRcdFx0XHRtaW5zID0gJzAnICsgbWlucztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNlY3MgPCAxMCkge1xuXHRcdFx0XHRzZWNzID0gJzAnICsgc2Vjcztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGhvdXJzICsgJzonICsgbWlucyArICc6JyArIHNlY3M7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IHRpbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBMdHJcblx0bHRyOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ2x0cic7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSAgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJyA/ICcnIDogJ2x0cic7XG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTGVmdC10by1SaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBSdGxcblx0cnRsOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblxuXHRcdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHRvZ2dsZVZhbHVlID0gZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJykgPT09ICdydGwnID8gJycgOiAncnRsJztcblx0XHRcdGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicsIHRvZ2dsZVZhbHVlKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdSaWdodC10by1MZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUHJpbnRcblx0cHJpbnQ6IHtcblx0XHRleGVjOiAncHJpbnQnLFxuXHRcdHRvb2x0aXA6ICdQcmludCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBNYXhpbWl6ZVxuXHRtYXhpbWl6ZToge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5tYXhpbWl6ZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5tYXhpbWl6ZSghdGhpcy5tYXhpbWl6ZSgpKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTWF4aW1pemUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtNJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNvdXJjZVxuXHRzb3VyY2U6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlTW9kZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdWaWV3IHNvdXJjZScsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K1MnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgY29tbWFuZHMgYWJvdmUgY2FuIGJlIHJlbW92ZWRcblx0Ly8gd2l0aG91dCBoYXZpbmcgdG8gcmVtb3ZlIHRoZSAsIGFmdGVyIHRoZSBsYXN0IG9uZS5cblx0Ly8gTmVlZGVkIGZvciBJRS5cblx0aWdub3JlOiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdENtZHM7XG4iLCJpbXBvcnQgeyBhdHRyIH0gZnJvbSAnLi9kb20uanMnO1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBmb3IgRW1sRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcblx0LyoqXG5cdCAqIFRvb2xiYXIgYnV0dG9ucyBvcmRlciBhbmQgZ3JvdXBzLiBTaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZFxuXHQgKiBoYXZlIGEgYmFyIHwgdG8gc2VwYXJhdGUgZ3JvdXBzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0b29sYmFyOiAnYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZSxzdWJzY3JpcHQsc3VwZXJzY3JpcHR8JyArXG5cdFx0J2xlZnQsY2VudGVyLHJpZ2h0LGp1c3RpZnl8Zm9udCxzaXplLGNvbG9yLHJlbW92ZWZvcm1hdHwnICtcblx0XHQnY3V0LGNvcHkscGFzdGV0ZXh0fGJ1bGxldGxpc3Qsb3JkZXJlZGxpc3QsaW5kZW50LG91dGRlbnR8JyArXG5cdFx0J3RhYmxlfGNvZGUscXVvdGV8aG9yaXpvbnRhbHJ1bGUsaW1hZ2UsZW1haWwsbGluayx1bmxpbmt8JyArXG5cdFx0J2Vtb3RpY29uLHlvdXR1YmUsZGF0ZSx0aW1lfGx0cixydGx8cHJpbnQsbWF4aW1pemUsc291cmNlJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY29tbWFuZHMgdG8gZXhjbHVkZXMgZnJvbSB0aGUgdG9vbGJhclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhckV4Y2x1ZGU6IG51bGwsXG5cblx0LyoqXG5cdCAqIFN0eWxlc2hlZXQgdG8gaW5jbHVkZSBpbiB0aGUgV1lTSVdZRyBlZGl0b3IuIFRoaXMgaXMgd2hhdCB3aWxsIHN0eWxlXG5cdCAqIHRoZSBXWVNJV1lHIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzdHlsZTogJ2pxdWVyeS5zY2VkaXRvci5kZWZhdWx0LmNzcycsXG5cblx0LyoqXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGZvbnRzIGZvciB0aGUgZm9udCBzZWxlY3RvclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Zm9udHM6ICdBcmlhbCxBcmlhbCBCbGFjayxDb21pYyBTYW5zIE1TLENvdXJpZXIgTmV3LEdlb3JnaWEsSW1wYWN0LCcgK1xuXHRcdCdTYW5zLXNlcmlmLFNlcmlmLFRpbWVzIE5ldyBSb21hbixUcmVidWNoZXQgTVMsVmVyZGFuYScsXG5cblx0LyoqXG5cdCAqIENvbG9ycyBzaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZCBoYXZlIGEgYmFyIHwgdG8gc2lnbmFsIGEgbmV3XG5cdCAqIGNvbHVtbi5cblx0ICpcblx0ICogSWYgbnVsbCB0aGUgY29sb3JzIHdpbGwgYmUgYXV0byBnZW5lcmF0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjb2xvcnM6ICcjMDAwMDAwLCM0NEI4RkYsIzFFOTJGNywjMDA3NEQ5LCMwMDVEQzIsIzAwMzY5QiwjYjNkNWY0fCcgK1xuXHRcdFx0JyM0NDQ0NDQsI0MzRkZGRiwjOURGOUZGLCM3RkRCRkYsIzY4QzRFOCwjNDE5REMxLCNkOWY0ZmZ8JyArXG5cdFx0XHQnIzY2NjY2NiwjNzJGRjg0LCM0Q0VBNUUsIzJFQ0M0MCwjMTdCNTI5LCMwMDhFMDIsI2MwZjBjNnwnICtcblx0XHRcdCcjODg4ODg4LCNGRkZGNDQsI0ZGRkExRSwjRkZEQzAwLCNFOEM1MDAsI0MxOUUwMCwjZmZmNWIzfCcgK1xuXHRcdFx0JyNhYWFhYWEsI0ZGQzk1RiwjRkZBMzM5LCNGRjg1MUIsI0U4NkUwNCwjQzE0NzAwLCNmZmRiYmJ8JyArXG5cdFx0XHQnI2NjY2NjYywjRkY4NTdBLCNGRjVGNTQsI0ZGNDEzNiwjRTgyQTFGLCNDMTAzMDAsI2ZmYzZjM3wnICtcblx0XHRcdCcjZWVlZWVlLCNGRjU2RkYsI0ZGMzBEQywjRjAxMkJFLCNEOTAwQTcsI0IyMDA4MCwjZmJiOGVjfCcgK1xuXHRcdFx0JyNmZmZmZmYsI0Y1NTFGRiwjQ0YyQkU3LCNCMTBEQzksIzlBMDBCMiwjOUEwMEIyLCNlOGI2ZWYnLFxuXG5cdC8qKlxuXHQgKiBUaGUgbG9jYWxlIHRvIHVzZS5cblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGxvY2FsZTogYXR0cihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsICdsYW5nJykgfHwgJ2VuJyxcblxuXHQvKipcblx0ICogVGhlIENoYXJzZXQgdG8gdXNlXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRjaGFyc2V0OiAndXRmLTgnLFxuXG5cdC8qKlxuXHQgKiBDb21wYXRpYmlsaXR5IG1vZGUgZm9yIGVtb3RpY29ucy5cblx0ICpcblx0ICogSGVscHMgaWYgeW91IGhhdmUgZW1vdGljb25zIHN1Y2ggYXMgOi8gd2hpY2ggd291bGQgcHV0IGFuIGVtb3RpY29uXG5cdCAqIGluc2lkZSBodHRwOi8vXG5cdCAqXG5cdCAqIFRoaXMgbW9kZSByZXF1aXJlcyBlbW90aWNvbnMgdG8gYmUgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlIG9yIGVuZCBvZlxuXHQgKiBsaW5lIGNoYXJzLiBUaGlzIG1vZGUgaGFzIGxpbWl0ZWQgQXMgWW91IFR5cGUgZW1vdGljb24gY29udmVyc2lvblxuXHQgKiBzdXBwb3J0LiBJdCB3aWxsIG5vdCByZXBsYWNlIEFZVCBmb3IgZW5kIG9mIGxpbmUgY2hhcnMsIG9ubHlcblx0ICogZW1vdGljb25zIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZS4gVGhleSB3aWxsIHN0aWxsIGJlIHJlcGxhY2VkXG5cdCAqIGNvcnJlY3RseSB3aGVuIGxvYWRlZCBqdXN0IG5vdCBBWVQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZW1vdGljb25zQ29tcGF0OiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIGVtb3RpY29ucy4gQ2FuIGJlIGNoYW5nZXMgYXQgcnVudGltZSB1c2luZyB0aGVcblx0ICogZW1vdGljb25zKCkgbWV0aG9kLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICogQHNpbmNlIDEuNC4yXG5cdCAqL1xuXHRlbW90aWNvbnNFbmFibGVkOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBFbW90aWNvbiByb290IFVSTFxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0ZW1vdGljb25zUm9vdDogJycsXG5cdGVtb3RpY29uczoge1xuXHRcdGRyb3Bkb3duOiB7XG5cdFx0XHQnOiknOiAnZW1vdGljb25zL3NtaWxlLnBuZycsXG5cdFx0XHQnOmFuZ2VsOic6ICdlbW90aWNvbnMvYW5nZWwucG5nJyxcblx0XHRcdCc6YW5ncnk6JzogJ2Vtb3RpY29ucy9hbmdyeS5wbmcnLFxuXHRcdFx0JzgtKSc6ICdlbW90aWNvbnMvY29vbC5wbmcnLFxuXHRcdFx0JzpcXCcoJzogJ2Vtb3RpY29ucy9jd3kucG5nJyxcblx0XHRcdCc6ZXJtbTonOiAnZW1vdGljb25zL2VybW0ucG5nJyxcblx0XHRcdCc6RCc6ICdlbW90aWNvbnMvZ3Jpbi5wbmcnLFxuXHRcdFx0JzwzJzogJ2Vtb3RpY29ucy9oZWFydC5wbmcnLFxuXHRcdFx0JzooJzogJ2Vtb3RpY29ucy9zYWQucG5nJyxcblx0XHRcdCc6Tyc6ICdlbW90aWNvbnMvc2hvY2tlZC5wbmcnLFxuXHRcdFx0JzpQJzogJ2Vtb3RpY29ucy90b25ndWUucG5nJyxcblx0XHRcdCc7KSc6ICdlbW90aWNvbnMvd2luay5wbmcnXG5cdFx0fSxcblx0XHRtb3JlOiB7XG5cdFx0XHQnOmFsaWVuOic6ICdlbW90aWNvbnMvYWxpZW4ucG5nJyxcblx0XHRcdCc6Ymxpbms6JzogJ2Vtb3RpY29ucy9ibGluay5wbmcnLFxuXHRcdFx0JzpibHVzaDonOiAnZW1vdGljb25zL2JsdXNoLnBuZycsXG5cdFx0XHQnOmNoZWVyZnVsOic6ICdlbW90aWNvbnMvY2hlZXJmdWwucG5nJyxcblx0XHRcdCc6ZGV2aWw6JzogJ2Vtb3RpY29ucy9kZXZpbC5wbmcnLFxuXHRcdFx0JzpkaXp6eTonOiAnZW1vdGljb25zL2Rpenp5LnBuZycsXG5cdFx0XHQnOmdldGxvc3Q6JzogJ2Vtb3RpY29ucy9nZXRsb3N0LnBuZycsXG5cdFx0XHQnOmhhcHB5Oic6ICdlbW90aWNvbnMvaGFwcHkucG5nJyxcblx0XHRcdCc6a2lzc2luZzonOiAnZW1vdGljb25zL2tpc3NpbmcucG5nJyxcblx0XHRcdCc6bmluamE6JzogJ2Vtb3RpY29ucy9uaW5qYS5wbmcnLFxuXHRcdFx0JzpwaW5jaDonOiAnZW1vdGljb25zL3BpbmNoLnBuZycsXG5cdFx0XHQnOnBvdXR5Oic6ICdlbW90aWNvbnMvcG91dHkucG5nJyxcblx0XHRcdCc6c2ljazonOiAnZW1vdGljb25zL3NpY2sucG5nJyxcblx0XHRcdCc6c2lkZXdheXM6JzogJ2Vtb3RpY29ucy9zaWRld2F5cy5wbmcnLFxuXHRcdFx0JzpzaWxseTonOiAnZW1vdGljb25zL3NpbGx5LnBuZycsXG5cdFx0XHQnOnNsZWVwaW5nOic6ICdlbW90aWNvbnMvc2xlZXBpbmcucG5nJyxcblx0XHRcdCc6dW5zdXJlOic6ICdlbW90aWNvbnMvdW5zdXJlLnBuZycsXG5cdFx0XHQnOndvb3Q6JzogJ2Vtb3RpY29ucy93MDB0LnBuZycsXG5cdFx0XHQnOndhc3NhdDonOiAnZW1vdGljb25zL3dhc3NhdC5wbmcnXG5cdFx0fSxcblx0XHRoaWRkZW46IHtcblx0XHRcdCc6d2hpc3RsaW5nOic6ICdlbW90aWNvbnMvd2hpc3RsaW5nLnBuZycsXG5cdFx0XHQnOmxvdmU6JzogJ2Vtb3RpY29ucy93dWIucG5nJ1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogV2lkdGggb2YgdGhlIGVkaXRvci4gU2V0IHRvIG51bGwgZm9yIGF1dG9tYXRpYyB3aXRoXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0d2lkdGg6IG51bGwsXG5cblx0LyoqXG5cdCAqIEhlaWdodCBvZiB0aGUgZWRpdG9yIGluY2x1ZGluZyB0b29sYmFyLiBTZXQgdG8gbnVsbCBmb3IgYXV0b21hdGljXG5cdCAqIGhlaWdodFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdGhlaWdodDogbnVsbCxcblxuXHQvKipcblx0ICogSWYgdG8gYWxsb3cgdGhlIGVkaXRvciB0byBiZSByZXNpemVkXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cmVzaXplRW5hYmxlZDogdHJ1ZSxcblxuXHQvKipcblx0ICogTWluIHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGhhbGYgdGV4dGFyZWEgd2lkdGggb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1pbldpZHRoOiBudWxsLFxuXHQvKipcblx0ICogTWluIHJlc2l6ZSB0byBoZWlnaHQsIHNldCB0byBudWxsIGZvciBoYWxmIHRleHRhcmVhIGhlaWdodCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWluSGVpZ2h0OiBudWxsLFxuXHQvKipcblx0ICogTWF4IHJlc2l6ZSB0byBoZWlnaHQsIHNldCB0byBudWxsIGZvciBkb3VibGUgdGV4dGFyZWEgaGVpZ2h0IG9yIC0xXG5cdCAqIGZvciB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNYXhIZWlnaHQ6IG51bGwsXG5cdC8qKlxuXHQgKiBNYXggcmVzaXplIHRvIHdpZHRoLCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNYXhXaWR0aDogbnVsbCxcblx0LyoqXG5cdCAqIElmIHJlc2l6aW5nIGJ5IGhlaWdodCBpcyBlbmFibGVkXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cmVzaXplSGVpZ2h0OiB0cnVlLFxuXHQvKipcblx0ICogSWYgcmVzaXppbmcgYnkgd2lkdGggaXMgZW5hYmxlZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZVdpZHRoOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBEYXRlIGZvcm1hdCwgd2lsbCBiZSBvdmVycmlkZGVuIGlmIGxvY2FsZSBzcGVjaWZpZXMgb25lLlxuXHQgKlxuXHQgKiBUaGUgd29yZHMgeWVhciwgbW9udGggYW5kIGRheSB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIHVzZXJzIGN1cnJlbnRcblx0ICogeWVhciwgbW9udGggYW5kIGRheS5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGRhdGVGb3JtYXQ6ICd5ZWFyLW1vbnRoLWRheScsXG5cblx0LyoqXG5cdCAqIEVsZW1lbnQgdG8gaW5zZXQgdGhlIHRvb2xiYXIgaW50by5cblx0ICpcblx0ICogQHR5cGUge0hUTUxFbGVtZW50fVxuXHQgKi9cblx0dG9vbGJhckNvbnRhaW5lcjogbnVsbCxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIHBhc3RlIGZpbHRlcmluZy4gVGhpcyBpcyBjdXJyZW50bHkgZXhwZXJpbWVudGFsLCBwbGVhc2Vcblx0ICogcmVwb3J0IGFueSBpc3N1ZXMuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZW5hYmxlUGFzdGVGaWx0ZXJpbmc6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBjb21wbGV0ZWx5IGRpc2FibGUgcGFzdGluZyBpbnRvIHRoZSBlZGl0b3Jcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRkaXNhYmxlUGFzdGluZzogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRoZSBlZGl0b3IgaXMgcmVhZCBvbmx5LlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlYWRPbmx5OiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gc2V0IHRoZSBlZGl0b3IgdG8gcmlnaHQtdG8tbGVmdCBtb2RlLlxuXHQgKlxuXHQgKiBJZiBzZXQgdG8gbnVsbCB0aGUgZGlyZWN0aW9uIHdpbGwgYmUgYXV0b21hdGljYWxseSBkZXRlY3RlZC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRydGw6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGZvY3VzIHRoZSBlZGl0b3Igb24gcGFnZSBsb2FkXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b2ZvY3VzOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIHRvIHRoZSBlbmQgb2YgdGhlIGNvbnRlbnRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvZm9jdXNFbmQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZXhwYW5kIHRoZSBlZGl0b3IgdG8gZml4IHRoZSBjb250ZW50XG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b0V4cGFuZDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gdXBkYXRlIG9yaWdpbmFsIHRleHRib3ggb24gYmx1clxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9VcGRhdGU6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBlbmFibGUgdGhlIGJyb3dzZXJzIGJ1aWx0IGluIHNwZWxsIGNoZWNrZXJcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzcGVsbGNoZWNrOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBydW4gdGhlIHNvdXJjZSBlZGl0b3Igd2hlbiB0aGVyZSBpcyBubyBXWVNJV1lHIHN1cHBvcnQuIE9ubHlcblx0ICogcmVhbGx5IGFwcGxpZXMgdG8gbW9iaWxlIE9TJ3MuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cnVuV2l0aG91dFd5c2l3eWdTdXBwb3J0OiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gbG9hZCB0aGUgZWRpdG9yIGluIHNvdXJjZSBtb2RlIGFuZCBzdGlsbCBhbGxvdyBzd2l0Y2hpbmdcblx0ICogYmV0d2VlbiBXWVNJV1lHIGFuZCBzb3VyY2UgbW9kZVxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHN0YXJ0SW5Tb3VyY2VNb2RlOiBmYWxzZSxcblxuXHQvKipcblx0ICogT3B0aW9uYWwgSUQgdG8gZ2l2ZSB0aGUgZWRpdG9yLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0aWQ6IG51bGwsXG5cblx0LyoqXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIHBsdWdpbnNcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHBsdWdpbnM6ICcnLFxuXG5cdC8qKlxuXHQgKiB6LWluZGV4IHRvIHNldCB0aGUgZWRpdG9yIGNvbnRhaW5lciB0by4gTmVlZGVkIGZvciBqUXVlcnkgVUkgZGlhbG9nLlxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHpJbmRleDogbnVsbCxcblxuXHQvKipcblx0ICogSWYgdG8gdHJpbSB0aGUgQkJDb2RlLiBSZW1vdmVzIGFueSBzcGFjZXMgYXQgdGhlIHN0YXJ0IGFuZCBlbmQgb2YgdGhlXG5cdCAqIEJCQ29kZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YmJjb2RlVHJpbTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGRpc2FibGUgcmVtb3ZpbmcgYmxvY2sgbGV2ZWwgZWxlbWVudHMgYnkgcHJlc3NpbmcgYmFja3NwYWNlIGF0XG5cdCAqIHRoZSBzdGFydCBvZiB0aGVtXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZGlzYWJsZUJsb2NrUmVtb3ZlOiBmYWxzZSxcblxuXHQvKipcblx0ICogQXJyYXkgb2YgYWxsb3dlZCBVUkwgKHNob3VsZCBiZSBlaXRoZXIgc3RyaW5ncyBvciByZWdleCkgZm9yIGlmcmFtZXMuXG5cdCAqXG5cdCAqIElmIGl0J3MgYSBzdHJpbmcgdGhlbiBpZnJhbWVzIHdoZXJlIHRoZSBzdGFydCBvZiB0aGUgc3JjIG1hdGNoZXMgdGhlXG5cdCAqIHNwZWNpZmllZCBzdHJpbmcgd2lsbCBiZSBhbGxvd2VkLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGEgcmVnZXggdGhlbiBpZnJhbWVzIHdoZXJlIHRoZSBzcmMgbWF0Y2hlcyB0aGUgcmVnZXggd2lsbCBiZVxuXHQgKiBhbGxvd2VkLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkSWZyYW1lVXJsczogW10sXG5cblx0LyoqXG5cdCAqIEJCQ29kZSBwYXJzZXIgb3B0aW9ucywgb25seSBhcHBsaWVzIGlmIHVzaW5nIHRoZSBlZGl0b3IgaW4gQkJDb2RlXG5cdCAqIG1vZGUuXG5cdCAqXG5cdCAqIFNlZSBFbWxFZGl0b3IuQkJDb2RlUGFyc2VyLmRlZmF1bHRzIGZvciBsaXN0IG9mIHZhbGlkIG9wdGlvbnNcblx0ICpcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdHBhcnNlck9wdGlvbnM6IHsgfSxcblxuXHQvKipcblx0ICogQ1NTIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0aGUgdG8gZHJvcGRvd24gbWVudSAoZWcuIHotaW5kZXgpXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRkcm9wRG93bkNzczogeyB9LFxuXG5cdC8qKlxuXHQgKiBBbiBhcnJheSBvZiB0YWdzIHRoYXQgYXJlIGFsbG93ZWQgaW4gdGhlIGVkaXRvciBjb250ZW50LlxuXHQgKiBJZiBhIHRhZyBpcyBub3QgbGlzdGVkIGhlcmUsIGl0IHdpbGwgYmUgcmVtb3ZlZCB3aGVuIHRoZSBjb250ZW50IGlzXG5cdCAqIHNhbml0aXplZC5cblx0ICpcblx0ICogMSBUYWcgaXMgYWxyZWFkeSBhZGRlZCBieSBkZWZhdWx0OiBbJ2lmcmFtZSddLiBObyBuZWVkIHRvIGFkZCB0aGlzXG5cdCAqIGZ1cnRoZXIuXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICovXG5cdGFsbG93ZWRUYWdzOiBbXSxcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgYXR0cmlidXRlcyB0aGF0IGFyZSBhbGxvd2VkIG9uIHRhZ3MgaW4gdGhlIGVkaXRvciBjb250ZW50LlxuXHQgKiBJZiBhbiBhdHRyaWJ1dGUgaXMgbm90IGxpc3RlZCBoZXJlLCBpdCB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGUgY29udGVudFxuXHQgKiBpcyBzYW5pdGl6ZWQuXG5cdCAqXG5cdCAqIDMgQXR0cmlidXRlcyBhcmUgYWxyZWFkeSBhZGRlZCBieSBkZWZhdWx0OlxuXHQgKiBcdFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddLlxuXHQgKiBObyBuZWVkIHRvIGFkZCB0aGVzZSBmdXJ0aGVyLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkQXR0cmlidXRlczogW11cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRPcHRpb25zO1xuIiwiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcblxyXG4vKipcclxuICogQ2FjaGUgb2YgY2FtZWxDYXNlIENTUyBwcm9wZXJ0eSBuYW1lc1xyXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cclxuICovXHJcbnZhciBjc3NQcm9wZXJ0eU5hbWVDYWNoZSA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgZWxlbWVudCBub2Rlc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IHZhciBFTEVNRU5UX05PREUgPSAxO1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgdGV4dCBub2Rlc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IHZhciBURVhUX05PREUgPSAzO1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgY29tbWVudCBub2Rlc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IHZhciBDT01NRU5UX05PREUgPSA4O1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBkb2N1bWVudCBub2Rlc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IHZhciBET0NVTUVOVF9OT0RFID0gOTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGRvY3VtZW50IGZyYWdtZW50c1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IHZhciBET0NVTUVOVF9GUkFHTUVOVF9OT0RFID0gMTE7XHJcblxyXG5mdW5jdGlvbiB0b0Zsb2F0KHZhbHVlKSB7XHJcblx0dmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuXHJcblx0cmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlc1xyXG4gKlxyXG4gKiBXaWxsIGNyZWF0ZSBpdCBpbiB0aGUgY3VycmVudCBkb2N1bWVudCB1bmxlc3MgY29udGV4dFxyXG4gKiBpcyBzcGVjaWZpZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gdGFnXHJcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59IFthdHRyaWJ1dGVzXVxyXG4gKiBAcGFyYW0geyFEb2N1bWVudH0gW2NvbnRleHRdXHJcbiAqIEByZXR1cm5zIHshSFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGF0dHJpYnV0ZXMsIGNvbnRleHQpIHtcclxuXHR2YXIgbm9kZSA9IChjb250ZXh0IHx8IGRvY3VtZW50KS5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG5cdHV0aWxzLmVhY2goYXR0cmlidXRlcyB8fCB7fSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHRcdGlmIChrZXkgPT09ICdzdHlsZScpIHtcclxuXHRcdFx0bm9kZS5zdHlsZS5jc3NUZXh0ID0gdmFsdWU7XHJcblx0XHR9IGVsc2UgaWYgKGtleSBpbiBub2RlKSB7XHJcblx0XHRcdG5vZGVba2V5XSA9IHZhbHVlO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBub2RlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiBwYXJlbnRzIHRoYXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3JcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEByZXR1cm5zIHtBcnJheTxIVE1MRWxlbWVudD59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyZW50cyhub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciBwYXJlbnRzID0gW107XHJcblx0dmFyIHBhcmVudCA9IG5vZGUgfHwge307XHJcblxyXG5cdHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpICYmICEvKDl8MTEpLy50ZXN0KHBhcmVudC5ub2RlVHlwZSkpIHtcclxuXHRcdGlmICghc2VsZWN0b3IgfHwgaXMocGFyZW50LCBzZWxlY3RvcikpIHtcclxuXHRcdFx0cGFyZW50cy5wdXNoKHBhcmVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcGFyZW50cztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIGZpcnN0IHBhcmVudCBub2RlIHRoYXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3JcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyZW50KG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0dmFyIHBhcmVudCA9IG5vZGUgfHwge307XHJcblxyXG5cdHdoaWxlICgocGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUpICYmICEvKDl8MTEpLy50ZXN0KHBhcmVudC5ub2RlVHlwZSkpIHtcclxuXHRcdGlmICghc2VsZWN0b3IgfHwgaXMocGFyZW50LCBzZWxlY3RvcikpIHtcclxuXHRcdFx0cmV0dXJuIHBhcmVudDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgdGhlIHBhc3NlZCBub2RlIGFuZCBhbGwgcGFyZW50cyBhbmRcclxuICogcmV0dXJucyB0aGUgZmlyc3QgbWF0Y2hpbmcgbm9kZSBpZiBhbnkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0cmV0dXJuIGlzKG5vZGUsIHNlbGVjdG9yKSA/IG5vZGUgOiBwYXJlbnQobm9kZSwgc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIHRoZSBET01cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUobm9kZSkge1xyXG5cdGlmIChub2RlLnBhcmVudE5vZGUpIHtcclxuXHRcdG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBcHBlbmRzIGNoaWxkIHRvIHBhcmVudCBub2RlXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBjaGlsZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENoaWxkKG5vZGUsIGNoaWxkKSB7XHJcblx0bm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBhbnkgY2hpbGQgbm9kZXMgdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3JcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Tm9kZUxpc3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogRm9yIG9uKCkgYW5kIG9mZigpIGlmIHRvIGFkZC9yZW1vdmUgdGhlIGV2ZW50XHJcbiAqIHRvIHRoZSBjYXB0dXJlIHBoYXNlXHJcbiAqXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBFVkVOVF9DQVBUVVJFID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcclxuICogdG8gdGhlIGJ1YmJsZSBwaGFzZVxyXG4gKlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgRVZFTlRfQlVCQkxFID0gZmFsc2U7XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEV2ZW50cyBzaG91bGQgYmUgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudHMuXHJcbiAqXHJcbiAqIElmIHNlbGVjdG9yIGlzIHNwZWNpZmllZCB0aGUgaGFuZGxlciB3aWxsIG9ubHkgYmVcclxuICogY2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRhcmdldCBtYXRjaGVzIHRoZSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gZm5cclxuICogQHBhcmFtIHtib29sZWFufSBbY2FwdHVyZT1mYWxzZV1cclxuICogQHNlZSBvZmYoKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIG9uKG5vZGUsIGV2ZW50cywgc2VsZWN0b3IsIGZuLCBjYXB0dXJlKSB7XHJcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHZhciBoYW5kbGVyO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcclxuXHRcdFx0aGFuZGxlciA9IGZuWydfc2NlLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXSB8fCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdFx0XHR3aGlsZSAodGFyZ2V0ICYmIHRhcmdldCAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdFx0aWYgKGlzKHRhcmdldCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdFx0XHRcdGZuLmNhbGwodGFyZ2V0LCBlKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGZuWydfc2NlLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXSA9IGhhbmRsZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XHJcblx0XHRcdGNhcHR1cmUgPSBmbjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUgfHwgZmFsc2UpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50c1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCl9IGZuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhcHR1cmU9ZmFsc2VdXHJcbiAqIEBzZWUgb24oKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIG9mZihub2RlLCBldmVudHMsIHNlbGVjdG9yLCBmbiwgY2FwdHVyZSkge1xyXG5cdGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHR2YXIgaGFuZGxlcjtcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoc2VsZWN0b3IpKSB7XHJcblx0XHRcdGhhbmRsZXIgPSBmblsnX3NjZS1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XHJcblx0XHRcdGNhcHR1cmUgPSBmbjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUgfHwgZmFsc2UpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSWYgb25seSBhdHRyIHBhcmFtIGlzIHNwZWNpZmllZCBpdCB3aWxsIGdldFxyXG4gKiB0aGUgdmFsdWUgb2YgdGhlIGF0dHIgcGFyYW0uXHJcbiAqXHJcbiAqIElmIHZhbHVlIGlzIHNwZWNpZmllZCBidXQgbnVsbCB0aGUgYXR0cmlidXRlXHJcbiAqIHdpbGwgYmUgcmVtb3ZlZCBvdGhlcndpc2UgdGhlIGF0dHIgdmFsdWUgd2lsbFxyXG4gKiBiZSBzZXQgdG8gdGhlIHBhc3NlZCB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBhdHRyXHJcbiAqIEBwYXJhbSB7P3N0cmluZ30gW3ZhbHVlXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dHIobm9kZSwgYXR0ciwgdmFsdWUpIHtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcclxuXHRcdHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShhdHRyKTtcclxuXHR9XHJcblxyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXEsIG5vLWVxLW51bGxcclxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xyXG5cdFx0cmVtb3ZlQXR0cihub2RlLCBhdHRyKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0bm9kZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBhdHRyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXR0cihub2RlLCBhdHRyKSB7XHJcblx0bm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBwYXNzZWQgZWxlbWVudHMgZGlzcGxheSB0byBub25lXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGlkZShub2RlKSB7XHJcblx0Y3NzKG5vZGUsICdkaXNwbGF5JywgJ25vbmUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHBhc3NlZCBlbGVtZW50cyBkaXNwbGF5IHRvIGRlZmF1bHRcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93KG5vZGUpIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGFuIGVsZW1lbnRzIHZpc2liaWxpdHlcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUobm9kZSkge1xyXG5cdGlmIChpc1Zpc2libGUobm9kZSkpIHtcclxuXHRcdGhpZGUobm9kZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHNob3cobm9kZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBhIGNvbXB1dGVkIENTUyB2YWx1ZXMgb3Igc2V0cyBhbiBpbmxpbmUgQ1NTIHZhbHVlXHJcbiAqXHJcbiAqIFJ1bGVzIHNob3VsZCBiZSBpbiBjYW1lbENhc2UgZm9ybWF0IGFuZCBub3RcclxuICogaHlwaGVuYXRlZCBsaWtlIENTUyBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFPYmplY3R8c3RyaW5nfSBydWxlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gW3ZhbHVlXVxyXG4gKiBAcmV0dXJuIHtzdHJpbmd8bnVtYmVyfHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjc3Mobm9kZSwgcnVsZSwgdmFsdWUpIHtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhydWxlKSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMSA/IGdldENvbXB1dGVkU3R5bGUobm9kZSlbcnVsZV0gOiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHV0aWxzLmVhY2gocnVsZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0Y3NzKG5vZGUsIGtleSwgdmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIGlzTmFOIHJldHVybnMgZmFsc2UgZm9yIG51bGwsIGZhbHNlIGFuZCBlbXB0eSBzdHJpbmdzXHJcblx0XHQvLyBzbyBuZWVkIHRvIGNoZWNrIGl0J3MgdHJ1dGh5IG9yIDBcclxuXHRcdHZhciBpc051bWVyaWMgPSAodmFsdWUgfHwgdmFsdWUgPT09IDApICYmICFpc05hTih2YWx1ZSk7XHJcblx0XHRub2RlLnN0eWxlW3J1bGVdID0gaXNOdW1lcmljID8gdmFsdWUgKyAncHgnIDogdmFsdWU7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldHMgb3Igc2V0cyB0aGUgZGF0YSBhdHRyaWJ1dGVzIG9uIGEgbm9kZVxyXG4gKlxyXG4gKiBVbmxpa2UgdGhlIGpRdWVyeSB2ZXJzaW9uIHRoaXMgb25seSBzdG9yZXMgZGF0YVxyXG4gKiBpbiB0aGUgRE9NIGF0dHJpYnV0ZXMgd2hpY2ggbWVhbnMgb25seSBzdHJpbmdzXHJcbiAqIGNhbiBiZSBzdG9yZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV1cclxuICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkYXRhKG5vZGUsIGtleSwgdmFsdWUpIHtcclxuXHR2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuXHJcblx0aWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0aWYgKGFyZ3NMZW5ndGggPT09IDEpIHtcclxuXHRcdFx0dXRpbHMuZWFjaChub2RlLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfLCBhdHRyKSB7XHJcblx0XHRcdFx0aWYgKC9eZGF0YS0vaS50ZXN0KGF0dHIubmFtZSkpIHtcclxuXHRcdFx0XHRcdGRhdGFbYXR0ci5uYW1lLnN1YnN0cig1KV0gPSBhdHRyLnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMikge1xyXG5cdFx0XHRyZXR1cm4gYXR0cihub2RlLCAnZGF0YS0nICsga2V5KTtcclxuXHRcdH1cclxuXHJcblx0XHRhdHRyKG5vZGUsICdkYXRhLScgKyBrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBub2RlIG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXMobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG5cdGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0cmVzdWx0ID0gKG5vZGUubWF0Y2hlcyB8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XHJcblx0XHRcdG5vZGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yKS5jYWxsKG5vZGUsIHNlbGVjdG9yKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIG5vZGUgY29udGFpbnMgY2hpbGQgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gKlxyXG4gKiBUaGlzIGRpZmZlcnMgZnJvbSB0aGUgRE9NIGNvbnRhaW5zKCkgbWV0aG9kIGluIHRoYXRcclxuICogaWYgbm9kZSBhbmQgY2hpbGQgYXJlIGVxdWFsIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMobm9kZSwgY2hpbGQpIHtcclxuXHRyZXR1cm4gbm9kZSAhPT0gY2hpbGQgJiYgbm9kZS5jb250YWlucyAmJiBub2RlLmNvbnRhaW5zKGNoaWxkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7P0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXZpb3VzRWxlbWVudFNpYmxpbmcobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcHJldiA9IG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcblx0aWYgKHNlbGVjdG9yICYmIHByZXYpIHtcclxuXHRcdHJldHVybiBpcyhwcmV2LCBzZWxlY3RvcikgPyBwcmV2IDogbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwcmV2O1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0geyFOb2RlfSByZWZOb2RlXHJcbiAqIEByZXR1cm5zIHtOb2RlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKSB7XHJcblx0cmV0dXJuIHJlZk5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJucyB7IUFycmF5LjxzdHJpbmc+fVxyXG4gKi9cclxuZnVuY3Rpb24gY2xhc3Nlcyhub2RlKSB7XHJcblx0cmV0dXJuIG5vZGUuY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcclxuXHRyZXR1cm4gaXMobm9kZSwgJy4nICsgY2xhc3NOYW1lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcclxuXHR2YXIgY2xhc3NMaXN0ID0gY2xhc3Nlcyhub2RlKTtcclxuXHJcblx0aWYgKGNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKSB7XHJcblx0XHRjbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xyXG5cdHZhciBjbGFzc0xpc3QgPSBjbGFzc2VzKG5vZGUpO1xyXG5cclxuXHR1dGlscy5hcnJheVJlbW92ZShjbGFzc0xpc3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdG5vZGUuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oJyAnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgYSBjbGFzcyBvbiBub2RlLlxyXG4gKlxyXG4gKiBJZiBzdGF0ZSBpcyBzcGVjaWZpZWQgYW5kIGlzIHRydXRoeSBpdCB3aWxsIGFkZFxyXG4gKiB0aGUgY2xhc3MuXHJcbiAqXHJcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgZmFsc2V5IGl0IHdpbGwgcmVtb3ZlXHJcbiAqIHRoZSBjbGFzcy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N0YXRlXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSwgc3RhdGUpIHtcclxuXHRzdGF0ZSA9IHV0aWxzLmlzVW5kZWZpbmVkKHN0YXRlKSA/ICFoYXNDbGFzcyhub2RlLCBjbGFzc05hbWUpIDogc3RhdGU7XHJcblxyXG5cdGlmIChzdGF0ZSkge1xyXG5cdFx0YWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIHdpZHRoIG9mIHRoZSBwYXNzZWQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgobm9kZSwgdmFsdWUpIHtcclxuXHRpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHR2YXIgY3MgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdMZWZ0KSArIHRvRmxvYXQoY3MucGFkZGluZ1JpZ2h0KTtcclxuXHRcdHZhciBib3JkZXIgPSB0b0Zsb2F0KGNzLmJvcmRlckxlZnRXaWR0aCkgKyB0b0Zsb2F0KGNzLmJvcmRlclJpZ2h0V2lkdGgpO1xyXG5cclxuXHRcdHJldHVybiBub2RlLm9mZnNldFdpZHRoIC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnd2lkdGgnLCB2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGhlaWdodCBvZiB0aGUgcGFzc2VkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChub2RlLCB2YWx1ZSkge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ1RvcCkgKyB0b0Zsb2F0KGNzLnBhZGRpbmdCb3R0b20pO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyVG9wV2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJCb3R0b21XaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0SGVpZ2h0IC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnaGVpZ2h0JywgdmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZ2dlcnMgYSBjdXN0b20gZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kXHJcbiAqIHNldHMgdGhlIGRldGFpbCBwcm9wZXJ0eSB0byB0aGUgZGF0YSBvYmplY3QgcGFzc2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXIobm9kZSwgZXZlbnROYW1lLCBkYXRhKSB7XHJcblx0dmFyIGV2ZW50O1xyXG5cclxuXHRpZiAodXRpbHMuaXNGdW5jdGlvbih3aW5kb3cuQ3VzdG9tRXZlbnQpKSB7XHJcblx0XHRldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcclxuXHRcdFx0ZGV0YWlsOiBkYXRhXHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZXZlbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblx0XHRldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Zpc2libGUobm9kZSkge1xyXG5cdHJldHVybiAhIW5vZGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IENTUyBwcm9wZXJ0eSBuYW1lcyBpbnRvIGNhbWVsIGNhc2VcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gY2FtZWxDYXNlKHN0cmluZykge1xyXG5cdHJldHVybiBzdHJpbmdcclxuXHRcdC5yZXBsYWNlKC9eLW1zLS8sICdtcy0nKVxyXG5cdFx0LnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAobWF0Y2gsIGNoYXIpIHtcclxuXHRcdFx0cmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKTtcclxuXHRcdH0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIExvb3AgYWxsIGNoaWxkIG5vZGVzIG9mIHRoZSBwYXNzZWQgbm9kZVxyXG4gKlxyXG4gKiBUaGUgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCAxIHBhcmFtZXRlciBiZWluZyB0aGUgbm9kZS5cclxuICogSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UgdGhlIGxvb3Agd2lsbCBiZSBleGl0ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBmdW5jICAgICAgICAgICBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2l0aCBldmVyeVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgbm9kZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGlubmVybW9zdEZpcnN0ICBJZiB0aGUgaW5uZXJtb3N0IG5vZGUgc2hvdWxkIGJlIHBhc3NlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIGZ1bmN0aW9uIGJlZm9yZSBpdCdzIHBhcmVudHMuXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IHNpYmxpbmdzT25seSAgICBJZiB0byBvbmx5IHRyYXZlcnNlIHRoZSBub2RlcyBzaWJsaW5nc1xyXG4gKiBAcGFyYW0gIHtib29sZWFufSBbcmV2ZXJzZT1mYWxzZV0gSWYgdG8gdHJhdmVyc2UgdGhlIG5vZGVzIGluIHJldmVyc2VcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCByZXZlcnNlKSB7XHJcblx0bm9kZSA9IHJldmVyc2UgPyBub2RlLmxhc3RDaGlsZCA6IG5vZGUuZmlyc3RDaGlsZDtcclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdHZhciBuZXh0ID0gcmV2ZXJzZSA/IG5vZGUucHJldmlvdXNTaWJsaW5nIDogbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRpZiAoXHJcblx0XHRcdCghaW5uZXJtb3N0Rmlyc3QgJiYgZnVuYyhub2RlKSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdCghc2libGluZ3NPbmx5ICYmIHRyYXZlcnNlKFxyXG5cdFx0XHRcdG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHJldmVyc2VcclxuXHRcdFx0KSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdChpbm5lcm1vc3RGaXJzdCAmJiBmdW5jKG5vZGUpID09PSBmYWxzZSlcclxuXHRcdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHQ7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogTGlrZSB0cmF2ZXJzZSBidXQgbG9vcHMgaW4gcmV2ZXJzZVxyXG4gKiBAc2VlIHRyYXZlcnNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gclRyYXZlcnNlKG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHkpIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBIVE1MIGludG8gYSBkb2N1bWVudCBmcmFnbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG4gKiBAcGFyYW0ge0RvY3VtZW50fSBbY29udGV4dF1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwsIGNvbnRleHQpIHtcclxuXHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuXHJcblx0dmFyXHRyZXQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHR2YXIgdG1wID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGNvbnRleHQpO1xyXG5cclxuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcblx0d2hpbGUgKHRtcC5maXJzdENoaWxkKSB7XHJcblx0XHRhcHBlbmRDaGlsZChyZXQsIHRtcC5maXJzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYW55IHN0eWxpbmcuXHJcbiAqXHJcbiAqIEl0IGhhcyBzdHlsaW5nIGlmIGl0IGlzIG5vdCBhIHBsYWluIDxkaXY+IG9yIDxwPiBvclxyXG4gKiBpZiBpdCBoYXMgYSBjbGFzcywgc3R5bGUgYXR0cmlidXRlIG9yIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGluZyhub2RlKSB7XHJcblx0cmV0dXJuIG5vZGUgJiYgKCFpcyhub2RlLCAncCxkaXYnKSB8fCBub2RlLmNsYXNzTmFtZSB8fFxyXG5cdFx0YXR0cihub2RlLCAnc3R5bGUnKSB8fCAhdXRpbHMuaXNFbXB0eU9iamVjdChkYXRhKG5vZGUpKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBlbGVtZW50IGZyb20gb25lIHR5cGUgdG8gYW5vdGhlci5cclxuICpcclxuICogRm9yIGV4YW1wbGUgaXQgY2FuIGNvbnZlcnQgdGhlIGVsZW1lbnQgPGI+IHRvIDxzdHJvbmc+XHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICB0b1RhZ05hbWVcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqIEBzaW5jZSAxLjQuNFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRFbGVtZW50KGVsZW1lbnQsIHRvVGFnTmFtZSkge1xyXG5cdHZhciBuZXdFbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0b1RhZ05hbWUsIHt9LCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpO1xyXG5cclxuXHR1dGlscy5lYWNoKGVsZW1lbnQuYXR0cmlidXRlcywgZnVuY3Rpb24gKF8sIGF0dHJpYnV0ZSkge1xyXG5cdFx0Ly8gU29tZSBicm93c2VycyBwYXJzZSBpbnZhbGlkIGF0dHJpYnV0ZXMgbmFtZXMgbGlrZVxyXG5cdFx0Ly8gJ3NpemVcIjInIHdoaWNoIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIHNldCwganVzdFxyXG5cdFx0Ly8gaWdub3JlIHRoZXNlLlxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YXR0cihuZXdFbGVtZW50LCBhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7IC8qIGVtcHR5ICovIH1cclxuXHR9KTtcclxuXHJcblx0d2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0YXBwZW5kQ2hpbGQobmV3RWxlbWVudCwgZWxlbWVudC5maXJzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdGVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3RWxlbWVudCwgZWxlbWVudCk7XHJcblxyXG5cdHJldHVybiBuZXdFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBibG9jayBsZXZlbCBlbGVtZW50cyBzZXBhcmF0ZWQgYnkgYmFycyAofClcclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCB2YXIgYmxvY2tMZXZlbExpc3QgPSAnfGJvZHl8aHJ8cHxkaXZ8aDF8aDJ8aDN8aDR8aDV8aDZ8YWRkcmVzc3xwcmV8JyArXHJcblx0J2Zvcm18dGFibGV8dGJvZHl8dGhlYWR8dGZvb3R8dGh8dHJ8dGR8bGl8b2x8dWx8YmxvY2txdW90ZXxjZW50ZXJ8JyArXHJcblx0J2RldGFpbHN8c2VjdGlvbnxhcnRpY2xlfGFzaWRlfG5hdnxtYWlufGhlYWRlcnxoZ3JvdXB8Zm9vdGVyfGZpZWxkc2V0fCcgK1xyXG5cdCdkbHxkdHxkZHxmaWd1cmV8ZmlnY2FwdGlvbnwnO1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBkbyBub3QgYWxsb3cgY2hpbGRyZW4gc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2FuSGF2ZUNoaWxkcmVuKG5vZGUpIHtcclxuXHQvLyAxICA9IEVsZW1lbnRcclxuXHQvLyA5ICA9IERvY3VtZW50XHJcblx0Ly8gMTEgPSBEb2N1bWVudCBGcmFnbWVudFxyXG5cdGlmICghLzExP3w5Ly50ZXN0KG5vZGUubm9kZVR5cGUpKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvLyBMaXN0IG9mIGVtcHR5IEhUTUwgdGFncyBzZXBhcmF0ZWQgYnkgYmFyICh8KSBjaGFyYWN0ZXIuXHJcblx0Ly8gU291cmNlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNC9pbmRleC9lbGVtZW50cy5odG1sXHJcblx0Ly8gU291cmNlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCN2b2lkLWVsZW1lbnRzXHJcblx0cmV0dXJuICgnfGlmcmFtZXxhcmVhfGJhc2V8YmFzZWZvbnR8YnJ8Y29sfGZyYW1lfGhyfGltZ3xpbnB1dHx3YnInICtcclxuXHRcdCd8aXNpbmRleHxsaW5rfG1ldGF8cGFyYW18Y29tbWFuZHxlbWJlZHxrZXlnZW58c291cmNlfHRyYWNrfCcgK1xyXG5cdFx0J29iamVjdHwnKS5pbmRleE9mKCd8JyArIG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSArICd8JykgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaXMgaW5saW5lXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbmNsdWRlQ29kZUFzQmxvY2s9ZmFsc2VdXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNJbmxpbmUoZWxtLCBpbmNsdWRlQ29kZUFzQmxvY2spIHtcclxuXHR2YXIgdGFnTmFtZSxcclxuXHRcdG5vZGVUeXBlID0gKGVsbSB8fCB7fSkubm9kZVR5cGUgfHwgVEVYVF9OT0RFO1xyXG5cclxuXHRpZiAobm9kZVR5cGUgIT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0cmV0dXJuIG5vZGVUeXBlID09PSBURVhUX05PREU7XHJcblx0fVxyXG5cclxuXHR0YWdOYW1lID0gZWxtLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0aWYgKHRhZ05hbWUgPT09ICdjb2RlJykge1xyXG5cdFx0cmV0dXJuICFpbmNsdWRlQ29kZUFzQmxvY2s7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYmxvY2tMZXZlbExpc3QuaW5kZXhPZignfCcgKyB0YWdOYW1lICsgJ3wnKSA8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb3B5IHRoZSBDU1MgZnJvbSAxIG5vZGUgdG8gYW5vdGhlci5cclxuICpcclxuICogT25seSBjb3BpZXMgQ1NTIGRlZmluZWQgb24gdGhlIGVsZW1lbnQgZS5nLiBzdHlsZSBhdHRyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBmcm9tXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvXHJcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjEuMFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlDU1MoZnJvbSwgdG8pIHtcclxuXHRpZiAodG8uc3R5bGUgJiYgZnJvbS5zdHlsZSkge1xyXG5cdFx0dG8uc3R5bGUuY3NzVGV4dCA9IGZyb20uc3R5bGUuY3NzVGV4dCArIHRvLnN0eWxlLmNzc1RleHQ7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgRE9NIG5vZGUgaXMgZW1wdHlcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkobm9kZSkge1xyXG5cdGlmIChub2RlLmxhc3RDaGlsZCAmJiBpc0VtcHR5KG5vZGUubGFzdENoaWxkKSkge1xyXG5cdFx0cmVtb3ZlKG5vZGUubGFzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzID8gIW5vZGUubm9kZVZhbHVlIDpcclxuXHRcdChjYW5IYXZlQ2hpbGRyZW4obm9kZSkgJiYgIW5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpO1xyXG59XHJcblxyXG4vKipcclxuICogRml4ZXMgYmxvY2sgbGV2ZWwgZWxlbWVudHMgaW5zaWRlIGluIGlubGluZSBlbGVtZW50cy5cclxuICpcclxuICogQWxzbyBmaXhlcyBpbnZhbGlkIGxpc3QgbmVzdGluZyBieSBwbGFjaW5nIG5lc3RlZCBsaXN0c1xyXG4gKiBpbnNpZGUgdGhlIHByZXZpb3VzIGxpIHRhZyBvciB3cmFwcGluZyB0aGVtIGluIGFuIGxpIHRhZy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeE5lc3Rpbmcobm9kZSkge1xyXG5cdHRyYXZlcnNlKG5vZGUsIGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHR2YXIgbGlzdCA9ICd1bCxvbCcsXHJcblx0XHRcdGlzQmxvY2sgPSAhaXNJbmxpbmUobm9kZSwgdHJ1ZSkgJiYgbm9kZS5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFLFxyXG5cdFx0XHRwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblxyXG5cdFx0Ly8gQW55IGJsb2NrbGV2ZWwgZWxlbWVudCBpbnNpZGUgYW4gaW5saW5lIGVsZW1lbnQgbmVlZHMgZml4aW5nLlxyXG5cdFx0Ly8gQWxzbyA8cD4gdGFncyB0aGF0IGNvbnRhaW4gYmxvY2tzIHNob3VsZCBiZSBmaXhlZFxyXG5cdFx0aWYgKGlzQmxvY2sgJiYgKGlzSW5saW5lKHBhcmVudCwgdHJ1ZSkgfHwgcGFyZW50LnRhZ05hbWUgPT09ICdQJykpIHtcclxuXHRcdFx0Ly8gRmluZCB0aGUgbGFzdCBpbmxpbmUgcGFyZW50IG5vZGVcclxuXHRcdFx0dmFyXHRsYXN0SW5saW5lUGFyZW50ID0gbm9kZTtcclxuXHRcdFx0d2hpbGUgKGlzSW5saW5lKGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZSwgdHJ1ZSkgfHxcclxuXHRcdFx0XHRsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGUudGFnTmFtZSA9PT0gJ1AnKSB7XHJcblx0XHRcdFx0bGFzdElubGluZVBhcmVudCA9IGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGJlZm9yZSA9IGV4dHJhY3RDb250ZW50cyhsYXN0SW5saW5lUGFyZW50LCBub2RlKTtcclxuXHRcdFx0dmFyIG1pZGRsZSA9IG5vZGU7XHJcblxyXG5cdFx0XHQvLyBDbG9uZSBpbmxpbmUgc3R5bGluZyBhbmQgYXBwbHkgaXQgdG8gdGhlIGJsb2NrcyBjaGlsZHJlblxyXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdFx0XHRcdHZhciBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKTtcclxuXHRcdFx0XHRcdHdoaWxlIChtaWRkbGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjbG9uZSwgbWlkZGxlLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGFwcGVuZENoaWxkKG1pZGRsZSwgY2xvbmUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aW5zZXJ0QmVmb3JlKG1pZGRsZSwgbGFzdElubGluZVBhcmVudCk7XHJcblx0XHRcdGlmICghaXNFbXB0eShiZWZvcmUpKSB7XHJcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGJlZm9yZSwgbWlkZGxlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaXNFbXB0eShsYXN0SW5saW5lUGFyZW50KSkge1xyXG5cdFx0XHRcdHJlbW92ZShsYXN0SW5saW5lUGFyZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEZpeCBpbnZhbGlkIG5lc3RlZCBsaXN0cyB3aGljaCBzaG91bGQgYmUgd3JhcHBlZCBpbiBhbiBsaSB0YWdcclxuXHRcdGlmIChpc0Jsb2NrICYmIGlzKG5vZGUsIGxpc3QpICYmIGlzKG5vZGUucGFyZW50Tm9kZSwgbGlzdCkpIHtcclxuXHRcdFx0dmFyIGxpID0gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlLCAnbGknKTtcclxuXHJcblx0XHRcdGlmICghbGkpIHtcclxuXHRcdFx0XHRsaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGxpLCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YXBwZW5kQ2hpbGQobGksIG5vZGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgdGhlIGNvbW1vbiBwYXJlbnQgb2YgdHdvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMVxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTJcclxuICogQHJldHVybiB7P0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21tb25BbmNlc3Rvcihub2RlMSwgbm9kZTIpIHtcclxuXHR3aGlsZSAoKG5vZGUxID0gbm9kZTEucGFyZW50Tm9kZSkpIHtcclxuXHRcdGlmIChjb250YWlucyhub2RlMSwgbm9kZTIpKSB7XHJcblx0XHRcdHJldHVybiBub2RlMTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9Ob2RlfVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmV2aW91cz1mYWxzZV1cclxuICogQHJldHVybnMgez9Ob2RlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNpYmxpbmcobm9kZSwgcHJldmlvdXMpIHtcclxuXHRpZiAoIW5vZGUpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChwcmV2aW91cyA/IG5vZGUucHJldmlvdXNTaWJsaW5nIDogbm9kZS5uZXh0U2libGluZykgfHxcclxuXHRcdGdldFNpYmxpbmcobm9kZS5wYXJlbnROb2RlLCBwcmV2aW91cyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHVudXNlZCB3aGl0ZXNwYWNlIGZyb20gdGhlIHJvb3QgYW5kIGFsbCBpdCdzIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gcm9vdFxyXG4gKiBAc2luY2UgMS40LjNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVXaGl0ZVNwYWNlKHJvb3QpIHtcclxuXHR2YXJcdG5vZGVWYWx1ZSwgbm9kZVR5cGUsIG5leHQsIHByZXZpb3VzLCBwcmV2aW91c1NpYmxpbmcsXHJcblx0XHRuZXh0Tm9kZSwgdHJpbVN0YXJ0LFxyXG5cdFx0Y3NzV2hpdGVTcGFjZSA9IGNzcyhyb290LCAnd2hpdGVTcGFjZScpLFxyXG5cdFx0Ly8gUHJlc2VydmUgbmV3bGluZXMgaWYgaXMgcHJlLWxpbmVcclxuXHRcdHByZXNlcnZlTmV3TGluZXMgPSAvbGluZSQvaS50ZXN0KGNzc1doaXRlU3BhY2UpLFxyXG5cdFx0bm9kZSA9IHJvb3QuZmlyc3RDaGlsZDtcclxuXHJcblx0Ly8gU2tpcCBwcmUgJiBwcmUtd3JhcCB3aXRoIGFueSB2ZW5kb3IgcHJlZml4XHJcblx0aWYgKC9wcmUoLXdyYXApPyQvaS50ZXN0KGNzc1doaXRlU3BhY2UpKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0bmV4dE5vZGUgID0gbm9kZS5uZXh0U2libGluZztcclxuXHRcdG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xyXG5cdFx0bm9kZVR5cGUgID0gbm9kZS5ub2RlVHlwZTtcclxuXHJcblx0XHRpZiAobm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSAmJiBub2RlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0cmVtb3ZlV2hpdGVTcGFjZShub2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobm9kZVR5cGUgPT09IFRFWFRfTk9ERSkge1xyXG5cdFx0XHRuZXh0ICAgICAgPSBnZXRTaWJsaW5nKG5vZGUpO1xyXG5cdFx0XHRwcmV2aW91cyAgPSBnZXRTaWJsaW5nKG5vZGUsIHRydWUpO1xyXG5cdFx0XHR0cmltU3RhcnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdHdoaWxlIChoYXNDbGFzcyhwcmV2aW91cywgJ3NjZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0cHJldmlvdXMgPSBnZXRTaWJsaW5nKHByZXZpb3VzLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgc2libGluZyBpc24ndCBpbmxpbmUgb3IgaXMgYSB0ZXh0bm9kZSB0aGF0XHJcblx0XHRcdC8vIGVuZHMgaW4gd2hpdGVzcGFjZSwgdGltZSB0aGUgc3RhcnQgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoaXNJbmxpbmUobm9kZSkgJiYgcHJldmlvdXMpIHtcclxuXHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91cztcclxuXHJcblx0XHRcdFx0d2hpbGUgKHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQ7XHJcblxyXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzU2libGluZywgJ3NjZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IGdldFNpYmxpbmcocHJldmlvdXNTaWJsaW5nLCB0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRyaW1TdGFydCA9IHByZXZpb3VzU2libGluZy5ub2RlVHlwZSA9PT0gVEVYVF9OT0RFID9cclxuXHRcdFx0XHRcdC9bXFx0XFxuXFxyIF0kLy50ZXN0KHByZXZpb3VzU2libGluZy5ub2RlVmFsdWUpIDpcclxuXHRcdFx0XHRcdCFpc0lubGluZShwcmV2aW91c1NpYmxpbmcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDbGVhciB6ZXJvIHdpZHRoIHNwYWNlc1xyXG5cdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZSgvXFx1MjAwQi9nLCAnJyk7XHJcblxyXG5cdFx0XHQvLyBTdHJpcCBsZWFkaW5nIHdoaXRlc3BhY2VcclxuXHRcdFx0aWYgKCFwcmV2aW91cyB8fCAhaXNJbmxpbmUocHJldmlvdXMpIHx8IHRyaW1TdGFydCkge1xyXG5cdFx0XHRcdG5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9eW1xcdCBdKy8gOiAvXltcXHRcXG5cXHIgXSsvLFxyXG5cdFx0XHRcdFx0JydcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTdHJpcCB0cmFpbGluZyB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmICghbmV4dCB8fCAhaXNJbmxpbmUobmV4dCkpIHtcclxuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvW1xcdCBdKyQvIDogL1tcXHRcXG5cXHIgXSskLyxcclxuXHRcdFx0XHRcdCcnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IHRleHQgbm9kZXNcclxuXHRcdFx0aWYgKCFub2RlVmFsdWUubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVtb3ZlKG5vZGUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5vZGUubm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSsvZyA6IC9bXFx0XFxuXFxyIF0rL2csXHJcblx0XHRcdFx0XHQnICdcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHROb2RlO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGFsbCB0aGUgbm9kZXMgYmV0d2VlbiB0aGUgc3RhcnQgYW5kIGVuZCBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGFydE5vZGVcdFRoZSBub2RlIHRvIHN0YXJ0IGV4dHJhY3RpbmcgYXRcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZW5kTm9kZVx0XHRUaGUgbm9kZSB0byBzdG9wIGV4dHJhY3RpbmcgYXRcclxuICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q29udGVudHMoc3RhcnROb2RlLCBlbmROb2RlKSB7XHJcblx0dmFyIHJhbmdlID0gc3RhcnROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHJcblx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoc3RhcnROb2RlKTtcclxuXHRyYW5nZS5zZXRFbmRBZnRlcihlbmROb2RlKTtcclxuXHJcblx0cmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgb2Zmc2V0IHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBsZWZ0IGFuZCB0b3AgcHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChub2RlKSB7XHJcblx0dmFyXHRsZWZ0ID0gMCxcclxuXHRcdHRvcCA9IDA7XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHRsZWZ0ICs9IG5vZGUub2Zmc2V0TGVmdDtcclxuXHRcdHRvcCAgKz0gbm9kZS5vZmZzZXRUb3A7XHJcblx0XHRub2RlICA9IG5vZGUub2Zmc2V0UGFyZW50O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGxlZnQ6IGxlZnQsXHJcblx0XHR0b3A6IHRvcFxyXG5cdH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhIENTUyBwcm9wZXJ0eSBmcm9tIHRoZSBlbGVtZW50cyBzdHlsZSBhdHRyaWJ1dGVcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByb3BlcnR5XHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZShlbG0sIHByb3BlcnR5KSB7XHJcblx0dmFyXHRzdHlsZVZhbHVlLFxyXG5cdFx0ZWxtU3R5bGUgPSBlbG0uc3R5bGU7XHJcblxyXG5cdGlmICghY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldKSB7XHJcblx0XHRjc3NQcm9wZXJ0eU5hbWVDYWNoZVtwcm9wZXJ0eV0gPSBjYW1lbENhc2UocHJvcGVydHkpO1xyXG5cdH1cclxuXHJcblx0cHJvcGVydHkgICA9IGNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XTtcclxuXHRzdHlsZVZhbHVlID0gZWxtU3R5bGVbcHJvcGVydHldO1xyXG5cclxuXHQvLyBBZGQgYW4gZXhjZXB0aW9uIGZvciB0ZXh0LWFsaWduXHJcblx0aWYgKCd0ZXh0QWxpZ24nID09PSBwcm9wZXJ0eSkge1xyXG5cdFx0c3R5bGVWYWx1ZSA9IHN0eWxlVmFsdWUgfHwgY3NzKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRcdGlmIChjc3MoZWxtLnBhcmVudE5vZGUsIHByb3BlcnR5KSA9PT0gc3R5bGVWYWx1ZSB8fFxyXG5cdFx0XHRjc3MoZWxtLCAnZGlzcGxheScpICE9PSAnYmxvY2snIHx8IGlzKGVsbSwgJ2hyLHRoJykpIHtcclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0eWxlVmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiBhbiBlbGVtZW50IGhhcyBhIHN0eWxlLlxyXG4gKlxyXG4gKiBJZiB2YWx1ZXMgYXJlIHNwZWNpZmllZCBpdCB3aWxsIGNoZWNrIHRoYXQgdGhlIHN0eWxlcyB2YWx1ZVxyXG4gKiBtYXRjaGVzIG9uZSBvZiB0aGUgdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHBhcmFtICB7c3RyaW5nfSBwcm9wZXJ0eVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd8YXJyYXl9IFt2YWx1ZXNdXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGUoZWxtLCBwcm9wZXJ0eSwgdmFsdWVzKSB7XHJcblx0dmFyIHN0eWxlVmFsdWUgPSBnZXRTdHlsZShlbG0sIHByb3BlcnR5KTtcclxuXHJcblx0aWYgKCFzdHlsZVZhbHVlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gIXZhbHVlcyB8fCBzdHlsZVZhbHVlID09PSB2YWx1ZXMgfHxcclxuXHRcdChBcnJheS5pc0FycmF5KHZhbHVlcykgJiYgdmFsdWVzLmluZGV4T2Yoc3R5bGVWYWx1ZSkgPiAtMSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCBub2RlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBpbmxpbmUgc3R5bGVzIGFuZCBhbGwgdGhlXHJcbiAqIGlubGluZSBzdHlsZXMgaGF2ZSBtYXRjaGluZyB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUFcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBzdHlsZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcclxuXHR2YXIgaSA9IG5vZGVBLnN0eWxlLmxlbmd0aDtcclxuXHRpZiAoaSAhPT0gbm9kZUIuc3R5bGUubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGVBLnN0eWxlW2ldO1xyXG5cdFx0aWYgKG5vZGVBLnN0eWxlW3Byb3BdICE9PSBub2RlQi5zdHlsZVtwcm9wXSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGF0dHJpYnV0ZXMgYW5kIGFsbCB0aGVcclxuICogYXR0cmlidXRlIHZhbHVlcyBtYXRjaFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGF0dHJpYnV0ZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcclxuXHR2YXIgaSA9IG5vZGVBLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlQS5hdHRyaWJ1dGVzW2ldO1xyXG5cdFx0dmFyIG5vdE1hdGNoZXMgPSBwcm9wLm5hbWUgPT09ICdzdHlsZScgP1xyXG5cdFx0XHQhc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSA6XHJcblx0XHRcdHByb3AudmFsdWUgIT09IGF0dHIobm9kZUIsIHByb3AubmFtZSk7XHJcblxyXG5cdFx0aWYgKG5vdE1hdGNoZXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGVsZW1lbnQgcGxhY2luZyBpdHMgY2hpbGRyZW4gaW4gaXRzIHBsYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKSB7XHJcblx0d2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0aW5zZXJ0QmVmb3JlKG5vZGUuZmlyc3RDaGlsZCwgbm9kZSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUobm9kZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZXMgaW5saW5lIHN0eWxlcyBhbmQgdGFncyB3aXRoIHBhcmVudHMgd2hlcmUgcG9zc2libGVcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBzaW5jZSAzLjEuMFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKG5vZGUpIHtcclxuXHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lO1xyXG5cdHZhciBtZXJnZVRhZ3MgPSAvQnxTVFJPTkd8RU18U1BBTnxGT05ULztcclxuXHJcblx0Ly8gTWVyZ2UgY2hpbGRyZW4gKGluIHJldmVyc2UgYXMgY2hpbGRyZW4gY2FuIGJlIHJlbW92ZWQpXHJcblx0dmFyIGkgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdG1lcmdlKG5vZGUuY2hpbGROb2Rlc1tpXSk7XHJcblx0fVxyXG5cclxuXHQvLyBTaG91bGQgb25seSBtZXJnZSBpbmxpbmUgdGFncyBhbmQgc2hvdWxkIG5vdCBtZXJnZSA8YnI+IHRhZ3NcclxuXHRpZiAoIWlzSW5saW5lKG5vZGUpIHx8IHRhZ05hbWUgPT09ICdCUicpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIFJlbW92ZSBhbnkgaW5saW5lIHN0eWxlcyB0aGF0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGVcclxuXHRpID0gbm9kZS5zdHlsZS5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlLnN0eWxlW2ldO1xyXG5cdFx0aWYgKGNzcyhwYXJlbnQsIHByb3ApID09PSBjc3Mobm9kZSwgcHJvcCkpIHtcclxuXHRcdFx0bm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIENhbiBvbmx5IHJlbW92ZSAvIG1lcmdlIHRhZ3MgaWYgbm8gaW5saW5lIHN0eWxpbmcgbGVmdC5cclxuXHQvLyBJZiB0aGVyZSBpcyBhbnkgaW5saW5lIHN0eWxlIGxlZnQgdGhlbiBpdCBtZWFucyBpdCBhdCBsZWFzdCBwYXJ0aWFsbHlcclxuXHQvLyBkb2Vzbid0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGUgc28gbXVzdCBzdGF5XHJcblx0aWYgKCFub2RlLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmVtb3ZlQXR0cihub2RlLCAnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBSZW1vdmUgZm9udCBhdHRyaWJ1dGVzIGlmIG1hdGNoIHBhcmVudFxyXG5cdFx0aWYgKHRhZ05hbWUgPT09ICdGT05UJykge1xyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSA9PT1cclxuXHRcdFx0XHRjc3MocGFyZW50LCAnZm9udEZhbWlseScpLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdmYWNlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2NvbG9yJykgPT09IGNzcyhwYXJlbnQsICdjb2xvcicpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQXR0cihub2RlLCAnY29sb3InKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnZm9udFNpemUnKSA9PT0gY3NzKHBhcmVudCwgJ2ZvbnRTaXplJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdzaXplJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTcGFucyBhbmQgZm9udCB0YWdzIHdpdGggbm8gYXR0cmlidXRlcyBjYW4gYmUgc2FmZWx5IHJlbW92ZWRcclxuXHRcdGlmICghbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCAmJiAvU1BBTnxGT05ULy50ZXN0KHRhZ05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdH0gZWxzZSBpZiAobWVyZ2VUYWdzLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0dmFyIGlzQm9sZCA9IC9CfFNUUk9ORy8udGVzdCh0YWdOYW1lKTtcclxuXHRcdFx0dmFyIGlzSXRhbGljID0gdGFnTmFtZSA9PT0gJ0VNJztcclxuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50KSAmJlxyXG5cdFx0XHRcdCghaXNCb2xkIHx8IC9ib2xkfDcwMC9pLnRlc3QoY3NzKHBhcmVudCwgJ2ZvbnRXZWlnaHQnKSkpICYmXHJcblx0XHRcdFx0KCFpc0l0YWxpYyB8fCBjc3MocGFyZW50LCAnZm9udFN0eWxlJykgPT09ICdpdGFsaWMnKSkge1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgaWYgcGFyZW50IG1hdGNoXHJcblx0XHRcdFx0aWYgKChwYXJlbnQudGFnTmFtZSA9PT0gdGFnTmFtZSB8fFxyXG5cdFx0XHRcdFx0KGlzQm9sZCAmJiAvQnxTVFJPTkcvLnRlc3QocGFyZW50LnRhZ05hbWUpKSkgJiZcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNNYXRjaChwYXJlbnQsIG5vZGUpKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBNZXJnZSBzaWJsaW5ncyBpZiBhdHRyaWJ1dGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlcywgbWF0Y2hcclxuXHR2YXIgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0aWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09PSB0YWdOYW1lICYmIGF0dHJpYnV0ZXNNYXRjaChuZXh0LCBub2RlKSkge1xyXG5cdFx0YXBwZW5kQ2hpbGQobm9kZSwgbmV4dCk7XHJcblx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obmV4dCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGFsbCBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBhbmRcbiAqIHJlcGxhY2VzIGFueSB0aGF0IGFyZW4ndCB3aXRoIHdpdGggdGhlaXIgZW1vdGljb24gY29kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3JhbmdlSGVscGVyfSByYW5nZUhlbHBlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2hpdGVzcGFjZShub2RlLCByYW5nZUhlbHBlcikge1xuXHR2YXIgbm9uZVdzUmVnZXggPSAvW15cXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0rLztcblx0dmFyIGVtb3RpY29ucyA9IG5vZGUgJiYgZG9tLmZpbmQobm9kZSwgJ2ltZ1tkYXRhLXNjZWRpdG9yLWVtb3RpY29uXScpO1xuXG5cdGlmICghbm9kZSB8fCAhZW1vdGljb25zLmxlbmd0aCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW1vdGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGVtb3RpY29uID0gZW1vdGljb25zW2ldO1xuXHRcdHZhciBwYXJlbnQgPSBlbW90aWNvbi5wYXJlbnROb2RlO1xuXHRcdHZhciBwcmV2ID0gZW1vdGljb24ucHJldmlvdXNTaWJsaW5nO1xuXHRcdHZhciBuZXh0ID0gZW1vdGljb24ubmV4dFNpYmxpbmc7XG5cblx0XHRpZiAoKCFwcmV2IHx8ICFub25lV3NSZWdleC50ZXN0KHByZXYubm9kZVZhbHVlLnNsaWNlKC0xKSkpICYmXG5cdFx0XHQoIW5leHQgfHwgIW5vbmVXc1JlZ2V4LnRlc3QoKG5leHQubm9kZVZhbHVlIHx8ICcnKVswXSkpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR2YXIgcmFuZ2UgPSByYW5nZUhlbHBlci5jbG9uZVNlbGVjdGVkKCk7XG5cdFx0dmFyIHJhbmdlU3RhcnQgPSAtMTtcblx0XHR2YXIgcmFuZ2VTdGFydENvbnRhaW5lciA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuXHRcdHZhciBwcmV2aW91c1RleHQgPSAocHJldiAmJiBwcmV2Lm5vZGVWYWx1ZSkgfHwgJyc7XG5cblx0XHRwcmV2aW91c1RleHQgKz0gZG9tLmRhdGEoZW1vdGljb24sICdzY2VkaXRvci1lbW90aWNvbicpO1xuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBhZnRlciB0aGUgcmVtb3ZlZCBlbW90aWNvbiwgYWRkXG5cdFx0Ly8gdGhlIGxlbmd0aCBvZiB0aGUgbmV3bHkgYWRkZWQgdGV4dCB0byBpdFxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBuZXh0KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcHJldmlvdXNUZXh0Lmxlbmd0aCArIHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgc2V0IGJlZm9yZSB0aGUgbmV4dCBub2RlLCBzZXQgaXQgdG9cblx0XHQvLyB0aGUgZW5kIG9mIHRoZSBuZXcgdGV4dCBub2RlXG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IG5vZGUgJiZcblx0XHRcdG5vZGUuY2hpbGROb2Rlc1tyYW5nZS5zdGFydE9mZnNldF0gPT09IG5leHQpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSBwcmV2aW91c1RleHQubGVuZ3RoO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgc2V0IGJlZm9yZSB0aGUgcmVtb3ZlZCBlbW90aWNvbixcblx0XHQvLyBqdXN0IGtlZXAgaXQgYXQgdGhhdCBwb3NpdGlvblxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBwcmV2KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0aWYgKCFuZXh0IHx8IG5leHQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcblx0XHRcdG5leHQgPSBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuXHRcdFx0XHRwYXJlbnQub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyksIG5leHRcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0bmV4dC5pbnNlcnREYXRhKDAsIHByZXZpb3VzVGV4dCk7XG5cdFx0ZG9tLnJlbW92ZShlbW90aWNvbik7XG5cdFx0aWYgKHByZXYpIHtcblx0XHRcdGRvbS5yZW1vdmUocHJldik7XG5cdFx0fVxuXG5cdFx0Ly8gTmVlZCB0byB1cGRhdGUgdGhlIHJhbmdlIHN0YXJ0aW5nIHBvc2l0aW9uIGlmIGl0J3MgYmVlbiBtb2RpZmllZFxuXHRcdGlmIChyYW5nZVN0YXJ0ID4gLTEpIHtcblx0XHRcdHJhbmdlLnNldFN0YXJ0KG5leHQsIHJhbmdlU3RhcnQpO1xuXHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0XHRyYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogUmVwbGFjZXMgYW55IGVtb3RpY29ucyBpbnNpZGUgdGhlIHJvb3Qgbm9kZSB3aXRoIGltYWdlcy5cbiAqXG4gKiBlbW90aWNvbnMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5IGlzIHRoZSBlbW90aWNvblxuICogY29kZSBhbmQgdGhlIHZhbHVlIGlzIHRoZSBIVE1MIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByb290XG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZz59IGVtb3RpY29uc1xuICogQHBhcmFtIHtib29sZWFufSBlbW90aWNvbnNDb21wYXRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKHJvb3QsIGVtb3RpY29ucywgZW1vdGljb25zQ29tcGF0KSB7XG5cdHZhclx0ZG9jICAgICAgICAgICA9IHJvb3Qub3duZXJEb2N1bWVudDtcblx0dmFyIHNwYWNlICAgICAgICAgPSAnKF58XFxcXHN8XFx4QTB8XFx1MjAwMnxcXHUyMDAzfFxcdTIwMDl8JCknO1xuXHR2YXIgZW1vdGljb25Db2RlcyA9IFtdO1xuXHR2YXIgZW1vdGljb25SZWdleCA9IHt9O1xuXG5cdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxuXHRpZiAoZG9tLnBhcmVudChyb290LCAnY29kZScpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbW90aWNvblJlZ2V4W2tleV0gPSBuZXcgUmVnRXhwKHNwYWNlICsgZXNjYXBlLnJlZ2V4KGtleSkgKyBzcGFjZSk7XG5cdFx0ZW1vdGljb25Db2Rlcy5wdXNoKGtleSk7XG5cdH0pO1xuXG5cdC8vIFNvcnQga2V5cyBsb25nZXN0IHRvIHNob3J0ZXN0IHNvIHRoYXQgbG9uZ2VyIGtleXNcblx0Ly8gdGFrZSBwcmVjZWRlbmNlIChhdm9pZHMgYnVncyB3aXRoIHNob3J0ZXIga2V5cyBwYXJ0aWFsbHlcblx0Ly8gbWF0Y2hpbmcgbG9uZ2VyIG9uZXMpXG5cdGVtb3RpY29uQ29kZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuXHR9KTtcblxuXHQoZnVuY3Rpb24gY29udmVydChub2RlKSB7XG5cdFx0bm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcblxuXHRcdHdoaWxlIChub2RlKSB7XG5cdFx0XHQvLyBUT0RPOiBNYWtlIHRoaXMgdGFnIGNvbmZpZ3VyYWJsZS5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmICFkb20uaXMobm9kZSwgJ2NvZGUnKSkge1xuXHRcdFx0XHRjb252ZXJ0KG5vZGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RpY29uQ29kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgdGV4dCAgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR2YXIga2V5ICAgPSBlbW90aWNvbkNvZGVzW2ldO1xuXHRcdFx0XHRcdHZhciBpbmRleCA9IGVtb3RpY29uc0NvbXBhdCA/XG5cdFx0XHRcdFx0XHR0ZXh0LnNlYXJjaChlbW90aWNvblJlZ2V4W2tleV0pIDpcblx0XHRcdFx0XHRcdHRleHQuaW5kZXhPZihrZXkpO1xuXG5cdFx0XHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0XHRcdC8vIFdoZW4gZW1vdGljb25zQ29tcGF0IGlzIGVuYWJsZWQgdGhpcyB3aWxsIGJlIHRoZVxuXHRcdFx0XHRcdFx0Ly8gcG9zaXRpb24gYWZ0ZXIgYW55IHdoaXRlIHNwYWNlXG5cdFx0XHRcdFx0XHR2YXIgc3RhcnRJbmRleCA9IHRleHQuaW5kZXhPZihrZXksIGluZGV4KTtcblx0XHRcdFx0XHRcdHZhciBmcmFnbWVudCAgID0gZG9tLnBhcnNlSFRNTChlbW90aWNvbnNba2V5XSwgZG9jKTtcblx0XHRcdFx0XHRcdHZhciBhZnRlciAgICAgID0gdGV4dC5zdWJzdHIoc3RhcnRJbmRleCArIGtleS5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoYWZ0ZXIpKTtcblxuXHRcdFx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSB0ZXh0LnN1YnN0cigwLCBzdGFydEluZGV4KTtcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50Tm9kZVxuXHRcdFx0XHRcdFx0XHQuaW5zZXJ0QmVmb3JlKGZyYWdtZW50LCBub2RlLm5leHRTaWJsaW5nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHR9KHJvb3QpKTtcbn1cbiIsIi8vIE11c3Qgc3RhcnQgd2l0aCBhIHZhbGlkIHNjaGVtZVxuLy8gXHRcdF5cbi8vIFNjaGVtZXMgdGhhdCBhcmUgY29uc2lkZXJlZCBzYWZlXG4vLyBcdFx0KGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fFxuLy8gUmVsYXRpdmUgc2NoZW1lcyAoLy86KSBhcmUgY29uc2lkZXJlZCBzYWZlXG4vLyBcdFx0KFxcXFwvXFxcXC8pfFxuLy8gSW1hZ2UgZGF0YSBVUkkncyBhcmUgY29uc2lkZXJlZCBzYWZlXG4vLyBcdFx0ZGF0YTppbWFnZVxcXFwvKHBuZ3xibXB8Z2lmfHA/anBlP2cpO1xudmFyIFZBTElEX1NDSEVNRV9SRUdFWCA9XG5cdC9eKGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fChcXC9cXC8pfGRhdGE6aW1hZ2VcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7L2k7XG5cbi8qKlxuICogRXNjYXBlcyBhIHN0cmluZyBzbyBpdCdzIHNhZmUgdG8gdXNlIGluIHJlZ2V4XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnZXgoc3RyKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZSgvKFstLiorP149IToke30oKXxbXFxdL1xcXFxdKS9nLCAnXFxcXCQxJyk7XG59XG5cbi8qKlxuICogRXNjYXBlcyBhbGwgSFRNTCBlbnRpdGllcyBpbiBhIHN0cmluZ1xuICpcbiAqIElmIG5vUXVvdGVzIGlzIHNldCB0byBmYWxzZSwgYWxsIHNpbmdsZSBhbmQgZG91YmxlXG4gKiBxdW90ZXMgd2lsbCBhbHNvIGJlIGVzY2FwZWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtub1F1b3Rlcz10cnVlXVxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHNpbmNlIDEuNC4xXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbnRpdGllcyhzdHIsIG5vUXVvdGVzKSB7XG5cdGlmICghc3RyKSB7XG5cdFx0cmV0dXJuIHN0cjtcblx0fVxuXG5cdHZhciByZXBsYWNlbWVudHMgPSB7XG5cdFx0JyYnOiAnJmFtcDsnLFxuXHRcdCc8JzogJyZsdDsnLFxuXHRcdCc+JzogJyZndDsnLFxuXHRcdCcgICc6ICcmbmJzcDsgJyxcblx0XHQnXFxyXFxuJzogJzxiciAvPicsXG5cdFx0J1xccic6ICc8YnIgLz4nLFxuXHRcdCdcXG4nOiAnPGJyIC8+J1xuXHR9O1xuXG5cdGlmIChub1F1b3RlcyAhPT0gZmFsc2UpIHtcblx0XHRyZXBsYWNlbWVudHNbJ1wiJ10gID0gJyYjMzQ7Jztcblx0XHRyZXBsYWNlbWVudHNbJ1xcJyddID0gJyYjMzk7Jztcblx0XHRyZXBsYWNlbWVudHNbJ2AnXSAgPSAnJiM5NjsnO1xuXHR9XG5cblx0c3RyID0gc3RyLnJlcGxhY2UoLyB7Mn18XFxyXFxufFsmPD5cXHJcXG4nXCJgXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcblx0XHRyZXR1cm4gcmVwbGFjZW1lbnRzW21hdGNoXSB8fCBtYXRjaDtcblx0fSk7XG5cblx0cmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBFc2NhcGUgVVJJIHNjaGVtZS5cbiAqXG4gKiBBcHBlbmRzIHRoZSBjdXJyZW50IFVSTCB0byBhIHVybCBpZiBpdCBoYXMgYSBzY2hlbWUgdGhhdCBpcyBub3Q6XG4gKlxuICogaHR0cFxuICogaHR0cHNcbiAqIHNmdHBcbiAqIGZ0cFxuICogbWFpbHRvXG4gKiBzcG90aWZ5XG4gKiBza3lwZVxuICogc3NoXG4gKiB0ZWFtc3BlYWtcbiAqIHRlbFxuICogLy9cbiAqIGRhdGE6aW1hZ2UvKHBuZ3xqcGVnfGpwZ3xwanBlZ3xibXB8Z2lmKTtcbiAqXG4gKiAqKklNUE9SVEFOVCoqOiBUaGlzIGRvZXMgbm90IGVzY2FwZSBhbnkgSFRNTCBpbiBhIHVybCwgZm9yXG4gKiB0aGF0IHVzZSB0aGUgZXNjYXBlLmVudGl0aWVzKCkgbWV0aG9kLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKiBAc2luY2UgMS40LjVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVyaVNjaGVtZSh1cmwpIHtcblx0dmFyXHRwYXRoLFxuXHRcdC8vIElmIHRoZXJlIGlzIGEgOiBiZWZvcmUgYSAvIHRoZW4gaXQgaGFzIGEgc2NoZW1lXG5cdFx0aGFzU2NoZW1lID0gL15bXi9dKjovaSxcblx0XHRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcblxuXHQvLyBIYXMgbm8gc2NoZW1lIG9yIGEgdmFsaWQgc2NoZW1lXG5cdGlmICgoIXVybCB8fCAhaGFzU2NoZW1lLnRlc3QodXJsKSkgfHwgVkFMSURfU0NIRU1FX1JFR0VYLnRlc3QodXJsKSkge1xuXHRcdHJldHVybiB1cmw7XG5cdH1cblxuXHRwYXRoID0gbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcblx0cGF0aC5wb3AoKTtcblxuXHRyZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICtcblx0XHRsb2NhdGlvbi5ob3N0ICtcblx0XHRwYXRoLmpvaW4oJy8nKSArICcvJyArXG5cdFx0dXJsO1xufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5cblxuLyoqXG4gKiBIVE1MIHRlbXBsYXRlcyB1c2VkIGJ5IHRoZSBlZGl0b3IgYW5kIGRlZmF1bHQgY29tbWFuZHNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgX3RlbXBsYXRlcyA9IHtcblx0aHRtbDpcblx0XHQnPCFET0NUWVBFIGh0bWw+JyArXG5cdFx0JzxodG1se2F0dHJzfT4nICtcblx0XHRcdCc8aGVhZD4nICtcblx0XHRcdFx0JzxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiAnICtcblx0XHRcdFx0XHQnY29udGVudD1cInRleHQvaHRtbDtjaGFyc2V0PXtjaGFyc2V0fVwiIC8+JyArXG5cdFx0XHRcdCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIntzdHlsZX1cIiAvPicgK1xuXHRcdFx0JzwvaGVhZD4nICtcblx0XHRcdCc8Ym9keSBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIge3NwZWxsY2hlY2t9PjxwPjwvcD48L2JvZHk+JyArXG5cdFx0JzwvaHRtbD4nLFxuXG5cdHRvb2xiYXJCdXR0b246ICc8YSBjbGFzcz1cInNjZWRpdG9yLWJ1dHRvbiBzY2VkaXRvci1idXR0b24te25hbWV9XCIgJyArXG5cdFx0J2RhdGEtc2NlZGl0b3ItY29tbWFuZD1cIntuYW1lfVwiIHVuc2VsZWN0YWJsZT1cIm9uXCI+JyArXG5cdFx0JzxkaXYgdW5zZWxlY3RhYmxlPVwib25cIj57ZGlzcE5hbWV9PC9kaXY+PC9hPicsXG5cblx0ZW1vdGljb246ICc8aW1nIHNyYz1cInt1cmx9XCIgZGF0YS1zY2VkaXRvci1lbW90aWNvbj1cIntrZXl9XCIgJyArXG5cdFx0J2FsdD1cIntrZXl9XCIgdGl0bGU9XCJ7dG9vbHRpcH1cIiAvPicsXG5cblx0Zm9udE9wdDogJzxhIGNsYXNzPVwic2NlZGl0b3ItZm9udC1vcHRpb25cIiBocmVmPVwiI1wiICcgK1xuXHRcdCdkYXRhLWZvbnQ9XCJ7Zm9udH1cIj48Zm9udCBmYWNlPVwie2ZvbnR9XCI+e2ZvbnR9PC9mb250PjwvYT4nLFxuXG5cdHNpemVPcHQ6ICc8YSBjbGFzcz1cInNjZWRpdG9yLWZvbnRzaXplLW9wdGlvblwiIGRhdGEtc2l6ZT1cIntzaXplfVwiICcgK1xuXHRcdCdocmVmPVwiI1wiPjxmb250IHNpemU9XCJ7c2l6ZX1cIj57c2l6ZX08L2ZvbnQ+PC9hPicsXG5cblx0cGFzdGV0ZXh0OlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJ0eHRcIj57bGFiZWx9PC9sYWJlbD4gJyArXG5cdFx0XHQnPHRleHRhcmVhIGNvbHM9XCIyMFwiIHJvd3M9XCI3XCIgaWQ9XCJ0eHRcIj48L3RleHRhcmVhPjwvZGl2PicgK1xuXHRcdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xuXHRcdCc8L2Rpdj4nLFxuXG5cdHRhYmxlOlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJyb3dzXCI+e3Jvd3N9PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiAnICtcblx0XHRcdCdpZD1cInJvd3NcIiB2YWx1ZT1cIjJcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJjb2xzXCI+e2NvbHN9PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiAnICtcblx0XHRcdCdpZD1cImNvbHNcIiB2YWx1ZT1cIjJcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCInICtcblx0XHRcdCcgLz48L2Rpdj4nLFxuXG5cdGltYWdlOlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJpbWFnZVwiPnt1cmx9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpbWFnZVwiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJ3aWR0aFwiPnt3aWR0aH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIndpZHRoXCIgc2l6ZT1cIjJcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJoZWlnaHRcIj57aGVpZ2h0fTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaGVpZ2h0XCIgc2l6ZT1cIjJcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcblx0XHRcdCc8L2Rpdj4nLFxuXG5cdGVtYWlsOlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJlbWFpbFwiPntsYWJlbH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImVtYWlsXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZGVzXCI+e2Rlc2N9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcblx0XHRcdCc8L2Rpdj4nLFxuXG5cdGxpbms6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImxpbmtcIj57dXJsfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlua1wiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJkZXNcIj57ZGVzY308L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc31cIiAvPjwvZGl2PicsXG5cblx0eW91dHViZU1lbnU6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImxpbmtcIj57bGFiZWx9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xuXHRcdFx0JzwvZGl2PicsXG5cblx0eW91dHViZTpcblx0XHQnPGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjMxNVwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbiAnICtcblx0XHQnc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQve2lkfT93bW9kZT1vcGFxdWUmc3RhcnQ9e3RpbWV9XCIgJyArXG5cdFx0J2RhdGEteW91dHViZS1pZD1cIntpZH1cIj48L2lmcmFtZT4nXG59O1xuXG4vKipcbiAqIFJlcGxhY2VzIGFueSBwYXJhbXMgaW4gYSB0ZW1wbGF0ZSB3aXRoIHRoZSBwYXNzZWQgcGFyYW1zLlxuICpcbiAqIElmIGNyZWF0ZUh0bWwgaXMgcGFzc2VkIGl0IHdpbGwgcmV0dXJuIGEgRG9jdW1lbnRGcmFnbWVudFxuICogY29udGFpbmluZyB0aGUgcGFyc2VkIHRlbXBsYXRlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NyZWF0ZUh0bWxdXG4gKiBAcmV0dXJucyB7c3RyaW5nfERvY3VtZW50RnJhZ21lbnR9XG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmFtZSwgcGFyYW1zLCBjcmVhdGVIdG1sKSB7XG5cdHZhciB0ZW1wbGF0ZSA9IF90ZW1wbGF0ZXNbbmFtZV07XG5cblx0T2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0dGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFxuXHRcdFx0bmV3IFJlZ0V4cChlc2NhcGUucmVnZXgoJ3snICsgbmFtZSArICd9JyksICdnJyksIHBhcmFtc1tuYW1lXVxuXHRcdCk7XG5cdH0pO1xuXG5cdGlmIChjcmVhdGVIdG1sKSB7XG5cdFx0dGVtcGxhdGUgPSBkb20ucGFyc2VIVE1MKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJldHVybiB0ZW1wbGF0ZTtcbn1cbiIsIi8qKlxuICogQ2hlY2sgaWYgdGhlIHBhc3NlZCBhcmd1bWVudCBpcyB0aGVcbiAqIHRoZSBwYXNzZWQgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHsqfSBhcmdcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1R5cGVvZih0eXBlLCBhcmcpIHtcblx0cmV0dXJuIHR5cGVvZiBhcmcgPT09IHR5cGU7XG59XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzU3RyaW5nID0gaXNUeXBlb2YuYmluZChudWxsLCAnc3RyaW5nJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzVW5kZWZpbmVkID0gaXNUeXBlb2YuYmluZChudWxsLCAndW5kZWZpbmVkJyk7XG5cbi8qKlxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzRnVuY3Rpb24gPSBpc1R5cGVvZi5iaW5kKG51bGwsICdmdW5jdGlvbicpO1xuXG4vKipcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpc051bWJlciA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ251bWJlcicpO1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGFuIG9iamVjdCBoYXMgbm8ga2V5c1xuICpcbiAqIEBwYXJhbSB7IU9iamVjdH0gb2JqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlPYmplY3Qob2JqKSB7XG5cdHJldHVybiAhT2JqZWN0LmtleXMob2JqKS5sZW5ndGg7XG59XG5cbi8qKlxuICogRXh0ZW5kcyB0aGUgZmlyc3Qgb2JqZWN0IHdpdGggYW55IGV4dHJhIG9iamVjdHMgcGFzc2VkXG4gKlxuICogSWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGJvb2xlYW4gYW5kIHNldCB0byB0cnVlXG4gKiBpdCB3aWxsIGV4dGVuZCBjaGlsZCBhcnJheXMgYW5kIG9iamVjdHMgcmVjdXJzaXZlbHkuXG4gKlxuICogQHBhcmFtIHshT2JqZWN0fGJvb2xlYW59IHRhcmdldEFyZ1xuICogQHBhcmFtIHsuLi5PYmplY3R9IHNvdXJjZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHRhcmdldEFyZywgc291cmNlQXJnKSB7XG5cdHZhciBpc1RhcmdldEJvb2xlYW4gPSB0YXJnZXRBcmcgPT09ICEhdGFyZ2V0QXJnO1xuXHR2YXIgaSAgICAgID0gaXNUYXJnZXRCb29sZWFuID8gMiA6IDE7XG5cdHZhciB0YXJnZXQgPSBpc1RhcmdldEJvb2xlYW4gPyBzb3VyY2VBcmcgOiB0YXJnZXRBcmc7XG5cdHZhciBpc0RlZXAgPSBpc1RhcmdldEJvb2xlYW4gPyB0YXJnZXRBcmcgOiBmYWxzZTtcblxuXHRmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuXHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0XHRPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpID09PSBPYmplY3QucHJvdG90eXBlO1xuXHR9XG5cblx0Zm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0Ly8gQ29weSBhbGwgcHJvcGVydGllcyBmb3IgalF1ZXJ5IGNvbXBhdGliaWxpdHlcblx0XHQvKiBlc2xpbnQgZ3VhcmQtZm9yLWluOiBvZmYgKi9cblx0XHRmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG5cdFx0XHR2YXIgdGFyZ2V0VmFsdWUgPSB0YXJnZXRba2V5XTtcblx0XHRcdHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHQvLyBTa2lwIHVuZGVmaW5lZCB2YWx1ZXMgdG8gbWF0Y2ggalF1ZXJ5XG5cdFx0XHRpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTa2lwIHNwZWNpYWwga2V5cyB0byBwcmV2ZW50IHByb3RvdHlwZSBwb2xsdXRpb25cblx0XHRcdGlmIChrZXkgPT09ICdfX3Byb3RvX18nIHx8IGtleSA9PT0gJ2NvbnN0cnVjdG9yJykge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGlzVmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSk7XG5cdFx0XHR2YXIgaXNWYWx1ZUFycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG5cblx0XHRcdGlmIChpc0RlZXAgJiYgKGlzVmFsdWVPYmplY3QgfHwgaXNWYWx1ZUFycmF5KSkge1xuXHRcdFx0XHQvLyBDYW4gb25seSBtZXJnZSBpZiB0YXJnZXQgdHlwZSBtYXRjaGVzIG90aGVyd2lzZSBjcmVhdGVcblx0XHRcdFx0Ly8gbmV3IHRhcmdldCB0byBtZXJnZSBpbnRvXG5cdFx0XHRcdHZhciBpc1NhbWVUeXBlID0gaXNPYmplY3QodGFyZ2V0VmFsdWUpID09PSBpc1ZhbHVlT2JqZWN0ICYmXG5cdFx0XHRcdFx0QXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkgPT09IGlzVmFsdWVBcnJheTtcblxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGV4dGVuZChcblx0XHRcdFx0XHR0cnVlLFxuXHRcdFx0XHRcdGlzU2FtZVR5cGUgPyB0YXJnZXRWYWx1ZSA6IChpc1ZhbHVlQXJyYXkgPyBbXSA6IHt9KSxcblx0XHRcdFx0XHR2YWx1ZVxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBwYXNzZWQgYXJyYXlcbiAqXG4gKiBAcGFyYW0geyFBcnJheX0gYXJyXG4gKiBAcGFyYW0geyp9IGl0ZW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgaXRlbSkge1xuXHR2YXIgaSA9IGFyci5pbmRleE9mKGl0ZW0pO1xuXG5cdGlmIChpID4gLTEpIHtcblx0XHRhcnIuc3BsaWNlKGksIDEpO1xuXHR9XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBhbiBhcnJheSBvciBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyFPYmplY3R8QXJyYXl9IG9ialxuICogQHBhcmFtIHtmdW5jdGlvbigqLCAqKX0gZm5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVhY2gob2JqLCBmbikge1xuXHRpZiAoQXJyYXkuaXNBcnJheShvYmopIHx8ICdsZW5ndGgnIGluIG9iaiAmJiBpc051bWJlcihvYmoubGVuZ3RoKSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRmbihpLCBvYmpbaV0pO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0Zm4oa2V5LCBvYmpba2V5XSk7XG5cdFx0fSk7XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1sRWRpdG9yIGZyb20gJy4vbGliL0VtbEVkaXRvci5qcyc7XG5pbXBvcnQgUGx1Z2luTWFuYWdlciBmcm9tICcuL2xpYi9QbHVnaW5NYW5hZ2VyLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2xpYi9lc2NhcGUuanMnO1xuaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2xpYi9icm93c2VyLmpzJztcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2xpYi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi9saWIvdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2xpYi9kZWZhdWx0Q29tbWFuZHMuanMnO1xuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vbGliL2RlZmF1bHRPcHRpb25zLmpzJztcbmltcG9ydCAnLi90aGVtZXMvc3F1YXJlLmxlc3MnO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG5cdGludGVyZmFjZSBXaW5kb3cge1xuXHRcdGVtbEVkaXRvcjogSUVkaXRvcjtcblx0fVxufVxuXG5pbnRlcmZhY2UgSUVkaXRvciB7XG5cdGNvbW1hbmQ6IE9iamVjdDtcblx0bG9jYWxlOiBPYmplY3Q7XG5cdGljb25zOiBPYmplY3Q7XG5cdGZvcm1hdHM6IE9iamVjdDtcblx0Y29tbWFuZHM6IE9iamVjdDtcblx0ZGVmYXVsdE9wdGlvbnM6IE9iamVjdDtcblx0aW9zOiBib29sZWFuO1xuXHRpc1d5c2l3eWdTdXBwb3J0ZWQ6IGJvb2xlYW47XG5cdHJlZ2V4RXNjYXBlKHN0cjogc3RyaW5nKTogc3RyaW5nO1xuXHRlc2NhcGVFbnRpdGllcyhzdHI6IHN0cmluZywgbm9RdW90ZXM6IGJvb2xlYW4gfCBudWxsKTogc3RyaW5nO1xuXHRlc2NhcGVVcmlTY2hlbWUodXJsOiBzdHJpbmcpOiBzdHJpbmc7XG5cdGRvbTogT2JqZWN0O1xuXHR1dGlsczogT2JqZWN0O1xuXHRwbHVnaW5zOiBPYmplY3Q7XG5cdGNyZWF0ZSh0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCwgb3B0aW9uczogT2JqZWN0KTogdm9pZDtcblx0aW5zdGFuY2UodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiBJRWRpdG9yO1xufVxuXG53aW5kb3cuZW1sRWRpdG9yID0ge1xuXHRjb21tYW5kOiBFbWxFZGl0b3IuY29tbWFuZCxcblx0bG9jYWxlOiBFbWxFZGl0b3IubG9jYWxlLFxuXHRpY29uczogRW1sRWRpdG9yLmljb25zLFxuXHRmb3JtYXRzOiBFbWxFZGl0b3IuZm9ybWF0cyxcblxuXHRjb21tYW5kczogZGVmYXVsdENvbW1hbmRzLFxuXHRkZWZhdWx0T3B0aW9uczogZGVmYXVsdE9wdGlvbnMsXG5cdGlvczogYnJvd3Nlci5pb3MsXG5cdGlzV3lzaXd5Z1N1cHBvcnRlZDogYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQsXG5cdHJlZ2V4RXNjYXBlOiBlc2NhcGUucmVnZXgsXG5cdGVzY2FwZUVudGl0aWVzOiBlc2NhcGUuZW50aXRpZXMsXG5cdGVzY2FwZVVyaVNjaGVtZTogZXNjYXBlLnVyaVNjaGVtZSxcblxuXHRkb206IHtcblx0XHRjc3M6IGRvbS5jc3MsXG5cdFx0YXR0cjogZG9tLmF0dHIsXG5cdFx0cmVtb3ZlQXR0cjogZG9tLnJlbW92ZUF0dHIsXG5cdFx0aXM6IGRvbS5pcyxcblx0XHRjbG9zZXN0OiBkb20uY2xvc2VzdCxcblx0XHR3aWR0aDogZG9tLndpZHRoLFxuXHRcdGhlaWdodDogZG9tLmhlaWdodCxcblx0XHR0cmF2ZXJzZTogZG9tLnRyYXZlcnNlLFxuXHRcdHJUcmF2ZXJzZTogZG9tLnJUcmF2ZXJzZSxcblx0XHRwYXJzZUhUTUw6IGRvbS5wYXJzZUhUTUwsXG5cdFx0aGFzU3R5bGluZzogZG9tLmhhc1N0eWxpbmcsXG5cdFx0Y29udmVydEVsZW1lbnQ6IGRvbS5jb252ZXJ0RWxlbWVudCxcblx0XHRibG9ja0xldmVsTGlzdDogZG9tLmJsb2NrTGV2ZWxMaXN0LFxuXHRcdGNhbkhhdmVDaGlsZHJlbjogZG9tLmNhbkhhdmVDaGlsZHJlbixcblx0XHRpc0lubGluZTogZG9tLmlzSW5saW5lLFxuXHRcdGNvcHlDU1M6IGRvbS5jb3B5Q1NTLFxuXHRcdGZpeE5lc3Rpbmc6IGRvbS5maXhOZXN0aW5nLFxuXHRcdGZpbmRDb21tb25BbmNlc3RvcjogZG9tLmZpbmRDb21tb25BbmNlc3Rvcixcblx0XHRnZXRTaWJsaW5nOiBkb20uZ2V0U2libGluZyxcblx0XHRyZW1vdmVXaGl0ZVNwYWNlOiBkb20ucmVtb3ZlV2hpdGVTcGFjZSxcblx0XHRleHRyYWN0Q29udGVudHM6IGRvbS5leHRyYWN0Q29udGVudHMsXG5cdFx0Z2V0T2Zmc2V0OiBkb20uZ2V0T2Zmc2V0LFxuXHRcdGdldFN0eWxlOiBkb20uZ2V0U3R5bGUsXG5cdFx0aGFzU3R5bGU6IGRvbS5oYXNTdHlsZVxuXHR9LFxuXG5cdHV0aWxzOiB7XG5cdFx0ZWFjaDogdXRpbHMuZWFjaCxcblx0XHRpc0VtcHR5T2JqZWN0OiB1dGlscy5pc0VtcHR5T2JqZWN0LFxuXHRcdGV4dGVuZDogdXRpbHMuZXh0ZW5kXG5cdH0sXG5cblx0cGx1Z2luczogUGx1Z2luTWFuYWdlci5wbHVnaW5zLFxuXG5cdGNyZWF0ZTogZnVuY3Rpb24gKHRleHRhcmVhOiBhbnksIG9wdGlvbnM6IGFueSkge1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0Ly8gRG9uJ3QgYWxsb3cgdGhlIGVkaXRvciB0byBiZSBpbml0aWFsaXNlZFxuXHRcdC8vIG9uIGl0J3Mgb3duIHNvdXJjZSBlZGl0b3Jcblx0XHRpZiAoZG9tLnBhcmVudCh0ZXh0YXJlYSwgJy5zY2VkaXRvci1jb250YWluZXInKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydCB8fCBicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCkge1xuXHRcdFx0Lyplc2xpbnQgbm8tbmV3OiBvZmYqL1xuXHRcdFx0KG5ldyBFbWxFZGl0b3IodGV4dGFyZWEsIG9wdGlvbnMpKTtcblx0XHR9XG5cdH0sXG5cblx0aW5zdGFuY2U6IGZ1bmN0aW9uICh0ZXh0YXJlYTogYW55KSB7XG5cdFx0cmV0dXJuIHRleHRhcmVhLl9zY2VkaXRvcjtcblx0fVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==