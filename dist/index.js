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
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultCommands.js */ "./src/lib/defaultCommands.js");
/* harmony import */ var _pluginManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluginManager */ "./src/lib/pluginManager.ts");
/* harmony import */ var _rangeHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rangeHelper */ "./src/lib/rangeHelper.ts");
/* harmony import */ var _templates_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./templates.js */ "./src/lib/templates.js");
/* harmony import */ var _escape_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./escape.js */ "./src/lib/escape.js");
/* harmony import */ var _browser_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./browser.js */ "./src/lib/browser.js");
/* harmony import */ var _emoticons_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./emoticons.js */ "./src/lib/emoticons.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_10__);











var globalWin = window;
var globalDoc = document;
var IMAGE_MIME_REGEX = /^image\/(p?jpe?g|gif|png|bmp)$/i;
/**
 * Wrap inlines that are in the root in paragraphs.
 *
 * @param {HTMLBodyElement} body
 * @param {Document} doc
 * @private
 */
function wrapInlines(body, doc) {
    let wrapper;
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.traverse(body, function (node) {
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(node, true)) {
            // Ignore text nodes unless they contain non-whitespace chars as
            // whitespace will be collapsed.
            // Ignore emleditor-ignore elements unless wrapping siblings
            // Should still wrap both if wrapping siblings.
            if (wrapper || node.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE ?
                /\S/.test(node.nodeValue) : !_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, '.emleditor-ignore')) {
                if (!wrapper) {
                    wrapper = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(wrapper, node);
                }
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wrapper, node);
            }
        }
        else {
            wrapper = null;
        }
    }, false, true);
}
/**
 * EmlEditor - A lightweight WYSIWYG editor
 *
 * @param {HTMLTextAreaElement} textarea The textarea to be converted
 * @param {Object} userOptions
 * @class EmlEditor
 * @name EmlEditor
 */
class EmlEditor {
    constructor(textarea, userOptions) {
        let emlEditor = this;
        /**
         * Editor format like BBCode or HTML
         */
        let format;
        /**
         * The div which contains the editor and toolbar
         *
         * @type {HTMLDivElement}
         * @private
         */
        let editorContainer;
        /**
         * Map of events handlers bound to this instance.
         *
         * @type {Object}
         * @private
         */
        let eventHandlers = {};
        /**
         * The editors toolbar
         *
         * @type {HTMLDivElement}
         * @private
         */
        let toolbar;
        /**
         * The editors iframe which should be in design mode
         *
         * @type {HTMLIFrameElement}
         * @private
         */
        let wysiwygEditor;
        /**
         * The editors window
         *
         * @type {Window}
         * @private
         */
        let wysiwygWindow;
        /**
         * The WYSIWYG editors body element
         *
         * @type {HTMLBodyElement}
         * @private
         */
        let wysiwygBody;
        /**
         * The WYSIWYG editors document
         *
         * @type {Document}
         * @private
         */
        let wysiwygDocument;
        /**
         * The editors textarea for viewing source
         *
         * @type {HTMLTextAreaElement}
         * @private
         */
        let sourceEditor;
        /**
         * The current dropdown
         *
         * @type {HTMLDivElement}
         * @private
         */
        let dropdown;
        /**
         * If the user is currently composing text via IME
         * @type {boolean}
         */
        let isComposing;
        /**
         * Timer for valueChanged key handler
         * @type {number}
         */
        let valueChangedKeyUpTimer;
        /**
         * The editors locale
         *
         * @private
         */
        let locale;
        /**
         * Stores a cache of preloaded images
         *
         * @private
         * @type {Array.<HTMLImageElement>}
         */
        let preLoadCache = (Array);
        /**
         * The editors rangeHelper instance
         *
         * @type {RangeHelper}
         * @private
         */
        let rangeHelper;
        /**
         * An array of button state handlers
         *
         * @type {Array.<Object>}
         * @private
         */
        let btnStateHandlers = [];
        /**
         * Plugin manager instance
         *
         * @type {PluginManager}
         * @private
         */
        let pluginManager;
        /**
         * The current node containing the selection/caret
         *
         * @type {Node}
         * @private
         */
        let currentNode;
        /**
         * The first block level parent of the current node
         *
         * @type {node}
         * @private
         */
        let currentBlockNode;
        /**
         * The current node selection/caret
         *
         * @type {Object}
         * @private
         */
        let currentSelection;
        /**
         * Used to make sure only 1 selection changed
         * check is called every 100ms.
         *
         * Helps improve performance as it is checked a lot.
         *
         * @type {boolean}
         * @private
         */
        let isSelectionCheckPending;
        /**
         * If content is required (equivalent to the HTML5 required attribute)
         *
         * @type {boolean}
         * @private
         */
        let isRequired;
        /**
         * The inline CSS style element. Will be undefined
         * until css() is called for the first time.
         *
         * @type {HTMLStyleElement}
         * @private
         */
        let inlineCss;
        /**
         * Object containing a list of shortcut handlers
         *
         * @type {Object}
         * @private
         */
        let shortcutHandlers = {};
        /**
         * The min and max heights that autoExpand should stay within
         *
         * @type {Object}
         * @private
         */
        let autoExpandBounds;
        /**
         * Timeout for the autoExpand function to throttle calls
         *
         * @private
         */
        let autoExpandThrottle;
        /**
         * Cache of the current toolbar buttons
         *
         * @type {Object}
         * @private
         */
        let toolbarButtons = [];
        /**
         * Last scroll position before maximizing so
         * it can be restored when finished.
         *
         * @type {number}
         * @private
         */
        let maximizeScrollPosition;
        /**
         * Stores the contents while a paste is taking place.
         *
         * Needed to support browsers that lack clipboard API support.
         *
         * @type {?DocumentFragment}
         * @private
         */
        let pasteContentFragment;
        /**
         * All the emoticons from dropdown, more and hidden combined
         * and with the emoticons root set
         *
         * @type {!Object<string, string>}
         * @private
         */
        let allEmoticons = {};
        /**
         * Current icon set if any
         *
         * @type {?Object}
         * @private
         */
        let icons;
        /**
         * Private functions
         * @private
         */
        let init, replaceEmoticons, handleCommand, initEditor, initEvents, initLocale, initToolBar, initOptions, initResize, initEmoticons;
        let handlePasteEvt, handleCutCopyEvt, handlePasteData, handleKeyDown, handleBackSpace, handleKeyPress, handleFormReset, handleMouseDown, handleComposition;
        let handleEvent, handleDocumentClick, updateActiveButtons, sourceEditorSelectedText, appendNewLine, checkSelectionChanged, checkNodeChanged, autofocus, emoticonsKeyPress;
        let emoticonsCheckWhitespace, currentStyledBlockNode, triggerValueChanged, valueChangedBlur, valueChangedKeyUp, autoUpdate, autoExpand;
        /**
         * All the commands supported by the editor
         * @name commands
         * @memberOf EmlEditor.prototype
         */
        emlEditor.commands = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, (userOptions.commands || _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
        /**
         * Options for this editor instance
         * @name opts
         * @memberOf EmlEditor.prototype
         */
        let options = emlEditor.opts = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"], userOptions);
        // Don't deep extend emoticons (fixes #565)
        emlEditor.opts.emoticons = userOptions.emoticons || _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"].emoticons;
        if (!Array.isArray(options.allowedIframeUrls)) {
            options.allowedIframeUrls = [];
        }
        options.allowedIframeUrls.push('https://www.youtube-nocookie.com/embed/');
        // Create new instance of DOMPurify for each editor instance so can
        // have different allowed iframe URLs
        // eslint-disable-next-line new-cap
        let domPurify = dompurify__WEBPACK_IMPORTED_MODULE_10___default()();
        // Allow iframes for things like YouTube, see:
        // https://github.com/cure53/DOMPurify/issues/340#issuecomment-670758980
        domPurify.addHook('uponSanitizeElement', function (node, data) {
            let allowedUrls = options.allowedIframeUrls;
            if (data.tagName === 'iframe') {
                let src = _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'src') || '';
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(node);
            }
        });
        // Convert target attribute into data-eml-target attributes so XHTML format
        // can allow them
        domPurify.addHook('afterSanitizeAttributes', function (node) {
            if ('target' in node) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'data-eml-target', _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'target'));
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
         * Switches between the WYSIWYG and source modes
         *
         * @function
         * @name toggleSourceMode
         * @since 1.4.0
         * @memberOf EmlEditor.prototype
         */
        emlEditor.toggleSourceMode = function () {
            let isInSourceMode = emlEditor.inSourceMode();
            // don't allow switching to WYSIWYG if doesn't support it
            if (!_browser_js__WEBPACK_IMPORTED_MODULE_8__.isWysiwygSupported && isInSourceMode) {
                return;
            }
            if (!isInSourceMode) {
                rangeHelper.saveRange();
                rangeHelper.clear();
            }
            currentSelection = null;
            emlEditor.blur();
            if (isInSourceMode) {
                emlEditor.setWysiwygEditorValue(emlEditor.getSourceEditorValue());
            }
            else {
                emlEditor.setSourceEditorValue(emlEditor.getWysiwygEditorValue());
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggle(sourceEditor);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggle(wysiwygEditor);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(editorContainer, 'wysiwygMode', isInSourceMode);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(editorContainer, 'sourceMode', !isInSourceMode);
            updateToolBar();
            updateActiveButtons();
        };
        /**
        * If the editor is in source code mode
        *
        * @return {boolean}
        * @function
        * @name inSourceMode
        * @memberOf EmlEditor.prototype
        */
        emlEditor.inSourceMode = function () {
            return _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(editorContainer, 'sourceMode');
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
        emlEditor.blur = function (handler, excludeWysiwyg, excludeSource) {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                emlEditor.bind('blur', handler, excludeWysiwyg, excludeSource);
            }
            else if (!emlEditor.sourceMode()) {
                wysiwygBody.blur();
            }
            else {
                sourceEditor.blur();
            }
            return emlEditor;
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
        emlEditor.setWysiwygEditorValue = function (value) {
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.setSourceEditorValue = function (value) {
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.updateOriginal = function () {
            textarea.value = emlEditor.val();
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.getSourceEditorValue = function (filter) {
            let val = sourceEditor.value;
            if (filter !== false && 'toHtml' in format) {
                val = format.toHtml(val);
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
        emlEditor.dimensions = function (width, height, save) {
            // set undefined width/height to boolean false
            width = (!width && width !== 0) ? false : width;
            height = (!height && height !== 0) ? false : height;
            if (width === false && height === false) {
                return { width: emlEditor.width(), height: emlEditor.height() };
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
        emlEditor.readOnly = function (readOnly) {
            if (typeof readOnly !== 'boolean') {
                return !sourceEditor.readOnly;
            }
            wysiwygBody.contentEditable = (!readOnly).toString();
            sourceEditor.readOnly = !readOnly;
            updateToolBar(readOnly);
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
        emlEditor.focus = function (handler, excludeWysiwyg, excludeSource) {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                emlEditor.bind('focus', handler, excludeWysiwyg, excludeSource);
            }
            else if (!emlEditor.inSourceMode()) {
                // Already has focus so do nothing
                if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(wysiwygDocument, ':focus').length) {
                    return;
                }
                let container;
                let rng = rangeHelper.selectedRange();
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
            }
            else {
                sourceEditor.focus();
            }
            updateActiveButtons();
            return this;
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
        emlEditor.val = function (val, filter = true) {
            if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(val)) {
                return emlEditor.inSourceMode() ?
                    emlEditor.getSourceEditorValue(false) :
                    emlEditor.getWysiwygEditorValue(filter);
            }
            if (!emlEditor.inSourceMode()) {
                if (filter !== false && 'toHtml' in format) {
                    val = format.toHtml(val);
                }
                emlEditor.setWysiwygEditorValue(val);
            }
            else {
                emlEditor.setSourceEditorValue(val);
            }
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
        emlEditor.expandToContent = function (ignoreMaxHeight) {
            if (emlEditor.maximize()) {
                return;
            }
            clearTimeout(autoExpandThrottle);
            autoExpandThrottle = false;
            if (!autoExpandBounds) {
                let height = options.resizeMinHeight || options.height ||
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(textarea);
                autoExpandBounds = {
                    min: height,
                    max: options.resizeMaxHeight || (height * 2)
                };
            }
            let range = globalDoc.createRange();
            range.selectNodeContents(wysiwygBody);
            let rect = range.getBoundingClientRect();
            let current = wysiwygDocument.documentElement.clientHeight - 1;
            let spaceNeeded = rect.bottom - rect.top;
            let newHeight = emlEditor.height() + 1 + (spaceNeeded - current);
            if (!ignoreMaxHeight && autoExpandBounds.max !== -1) {
                newHeight = Math.min(newHeight, autoExpandBounds.max);
            }
            emlEditor.height(Math.ceil(Math.max(newHeight, autoExpandBounds.min)));
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
        emlEditor.rtl = function (rtl) {
            let dir = rtl ? 'rtl' : 'ltr';
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
        emlEditor.emoticons = function (enable) {
            if (!enable && enable !== false) {
                return options.emoticonsEnabled;
            }
            options.emoticonsEnabled = enable;
            if (enable) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keypress', null, emoticonsKeyPress);
                if (!emlEditor.sourceMode()) {
                    rangeHelper.saveRange();
                    replaceEmoticons();
                    triggerValueChanged(false);
                    rangeHelper.restoreRange();
                }
            }
            else {
                let emoticons = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(wysiwygBody, 'img[data-emleditor-emoticon]');
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, function (_, img) {
                    let text = _dom_js__WEBPACK_IMPORTED_MODULE_0__.data(img, 'emleditor-emoticon');
                    let textNode = wysiwygDocument.createTextNode(text);
                    img.parentNode.replaceChild(textNode, img);
                });
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(wysiwygBody, 'keypress', null, emoticonsKeyPress);
                triggerValueChanged();
            }
            return this;
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
        emlEditor.sourceMode = function (enable) {
            let inSourceMode = emlEditor.inSourceMode();
            if (typeof enable !== 'boolean') {
                return inSourceMode;
            }
            if ((inSourceMode && !enable) || (!inSourceMode && enable)) {
                emlEditor.toggleSourceMode();
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
        emlEditor.width = function (width, saveWidth) {
            if (!width && width !== 0) {
                return _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer);
            }
            emlEditor.dimensions(width, null, saveWidth);
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
        emlEditor.height = function (height, saveHeight) {
            if (!height && height !== 0) {
                return _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer);
            }
            emlEditor.dimensions(null, height, saveHeight);
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
        emlEditor.createDropDown = function (menuItem, name, content) {
            // first click for create second click for close
            let dropDownCss, dropDownClass = 'emleditor-' + name;
            emlEditor.closeDropDown();
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
                className: 'emleditor-dropdown ' + dropDownClass
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(dropdown, dropDownCss);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(dropdown, content);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, dropdown);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(dropdown, 'click focusin', null, function (e) {
                // stop clicks within the dropdown from being handled
                e.stopPropagation();
            });
            if (dropdown) {
                let first = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(dropdown, 'input,textarea')[0];
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
        emlEditor.maximize = function (maximize) {
            let maximizeSize = 'emleditor-maximize';
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isUndefined(maximize)) {
                return _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(editorContainer, maximizeSize);
            }
            maximize = !!maximize;
            if (maximize) {
                maximizeScrollPosition = globalWin.scrollY;
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.documentElement, maximizeSize, maximize);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.body, maximizeSize, maximize);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(editorContainer, maximizeSize, maximize);
            emlEditor.width(maximize ? '100%' : options.width, false);
            emlEditor.height(maximize ? '100%' : options.height, false);
            if (!maximize) {
                globalWin.scrollTo(0, maximizeScrollPosition);
            }
            autoExpand();
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
        emlEditor.destroy = function () {
            // Don't destroy if the editor has already been destroyed
            if (!pluginManager) {
                return;
            }
            pluginManager.destroy();
            rangeHelper = null;
            pluginManager = null;
            if (dropdown) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(dropdown);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, 'click', null, handleDocumentClick);
            let form = textarea.form;
            if (form) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'reset', null, handleFormReset);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'submit', null, emlEditor.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pagehide', null, emlEditor.updateOriginal);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pageshow', null, handleFormReset);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(sourceEditor);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(toolbar);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(editorContainer);
            delete textarea._emleditor;
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.show(textarea);
            textarea.required = isRequired;
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
        emlEditor.closeDropDown = function (focus) {
            if (dropdown) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(dropdown);
                dropdown = null;
            }
            if (focus === true) {
                emlEditor.focus();
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
        emlEditor.wysiwygEditorInsertHtml = function (html, endHtml, overrideCodeBlocking) {
            let marker, scrollTop, scrollTo, editorHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(wysiwygEditor);
            emlEditor.focus();
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
            marker = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(wysiwygBody, '#emleditor-end-marker')[0];
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.show(marker);
            scrollTop = wysiwygBody.scrollTop;
            scrollTo = (_dom_js__WEBPACK_IMPORTED_MODULE_0__.getOffset(marker).top +
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.wysiwygEditorInsertText = function (text, endText) {
            emlEditor.wysiwygEditorInsertHtml(_escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(text), _escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(endText));
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
        emlEditor.insertText = function (text, endText) {
            if (emlEditor.inSourceMode()) {
                emlEditor.sourceEditorInsertText(text, endText);
            }
            else {
                emlEditor.wysiwygEditorInsertText(text, endText);
            }
            return this;
        };
        /**
         * Gets the pasted data, filters it and then inserts it.
         * @param {Object} data
         * @private
         */
        handlePasteData = (data) => {
            let pasteArea = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, wysiwygDocument);
            pluginManager.call('pasteRaw', data);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(editorContainer, 'pasteraw', data);
            if (data.html) {
                // Sanitize again in case plugins modified the HTML
                pasteArea.innerHTML = sanitize(data.html);
                // fix any invalid nesting
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.fixNesting(pasteArea);
            }
            else {
                pasteArea.innerHTML = _escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(data.text || '');
            }
            let paste = {
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
            let parent = rangeHelper.getFirstBlockParent();
            emlEditor.wysiwygEditorInsertHtml(paste.val, null, true);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.merge(parent);
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
        emlEditor.sourceEditorInsertText = function (text, endText) {
            let scrollTop, currentValue, startPos = sourceEditor.selectionStart, endPos = sourceEditor.selectionEnd;
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.getRangeHelper = function () {
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.sourceEditorCaret = function (position) {
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
        // eslint-disable-next-line max-params
        emlEditor.insert = function (start, end, filter, convertEmoticons, allowMixed) {
            if (emlEditor.inSourceMode()) {
                emlEditor.sourceEditorInsertText(start, end);
                return this;
            }
            // Add the selection between start and end
            if (end) {
                let html = rangeHelper.selectedHtml();
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
            emlEditor.wysiwygEditorInsertHtml(start);
            return this;
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.getWysiwygEditorValue = function (filter) {
            let html;
            // Create a tmp node to store contents so it can be modified
            // without affecting anything else.
            let tmp = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, wysiwygDocument);
            let childNodes = wysiwygBody.childNodes;
            for (let i = 0; i < childNodes.length; i++) {
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
         * @memberOf EmlEditor.prototype
         */
        emlEditor.getBody = function () {
            return wysiwygBody;
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
        emlEditor.getContentAreaContainer = function () {
            return wysiwygEditor;
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
        emlEditor.execCommand = function (command, param) {
            let executed = false, commandObj = emlEditor.commands[command];
            emlEditor.focus();
            // TODO: make configurable
            // don't apply any commands to code elements
            if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(rangeHelper.parentNode(), 'code')) {
                return;
            }
            try {
                executed = wysiwygDocument.execCommand(command, false, param);
            }
            catch (ex) { /* empty */ }
            // show error if execution failed and an error message exists
            if (!executed && commandObj && commandObj.errorMessage) {
                alert(emlEditor.translate(commandObj.errorMessage));
            }
            updateActiveButtons();
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
        emlEditor.currentNode = function () {
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
         * @memberOf EmlEditor.prototype
         * @since 1.4.4
         */
        emlEditor.currentBlockNode = function () {
            return currentBlockNode;
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
        emlEditor.translate = function (...args) {
            let undef;
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
        emlEditor.bind = function (events, handler, excludeWysiwyg, excludeSource) {
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
                        eventHandlers[wysEvent] = eventHandlers[wysEvent] || [];
                        eventHandlers[wysEvent].push(handler);
                    }
                    if (!excludeSource) {
                        eventHandlers[srcEvent] = eventHandlers[srcEvent] || [];
                        eventHandlers[srcEvent].push(handler);
                    }
                    // Start sending value changed events
                    if (eventsArr[i] === 'valuechanged') {
                        triggerValueChanged.hasHandler = true;
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
        emlEditor.unbind = function (events, handler, excludeWysiwyg, excludeSource) {
            let eventsArr = events.split(' ');
            let i = eventsArr.length;
            while (i--) {
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                    if (!excludeWysiwyg) {
                        _utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(eventHandlers['emlwys' + eventsArr[i]] || [], handler);
                    }
                    if (!excludeSource) {
                        _utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(eventHandlers['emlsrc' + eventsArr[i]] || [], handler);
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
        emlEditor.keyDown = function (handler, excludeWysiwyg, excludeSource) {
            return emlEditor.bind('keydown', handler, excludeWysiwyg, excludeSource);
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
        emlEditor.keyPress = function (handler, excludeWysiwyg, excludeSource) {
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
        emlEditor.keyUp = function (handler, excludeWysiwyg, excludeSource) {
            return emlEditor.bind('keyup', handler, excludeWysiwyg, excludeSource);
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
        emlEditor.nodeChanged = function (handler) {
            return emlEditor.bind('nodechanged', handler, false, true);
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
        emlEditor.selectionChanged = function (handler) {
            return emlEditor.bind('selectionchanged', handler, false, true);
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
        emlEditor.valueChanged = function (handler, excludeWysiwyg, excludeSource) {
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
        emlEditor.css = function (css) {
            if (!inlineCss) {
                inlineCss = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('style', {
                    id: 'inline'
                }, wysiwygDocument);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(wysiwygDocument.head, inlineCss);
            }
            if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(css)) {
                return inlineCss.sheet ?
                    inlineCss.innerText : inlineCss.innerHTML;
            }
            if (inlineCss.sheet) {
                inlineCss.innerText = css;
            }
            else {
                inlineCss.innerHTML = css;
            }
            return this;
        };
        /**
         * Removes a shortcut handler
         * @param  {string} shortcut
         * @return {EmlEditor}
         */
        emlEditor.removeShortcut = function (shortcut) {
            delete shortcutHandlers[shortcut.toLowerCase()];
            return this;
        };
        /**
         * Adds a shortcut handler to the editor
         * @param  {string}          shortcut
         * @param  {String|Function} cmd
         * @return {emleditor}
         */
        emlEditor.addShortcut = function (shortcut, cmd) {
            shortcut = shortcut.toLowerCase();
            let shortcutKey = shortcut;
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(cmd)) {
                let strCmd = cmd;
                shortcutHandlers[shortcutKey] = function () {
                    handleCommand(toolbarButtons[strCmd], emlEditor.commands[strCmd]);
                    return false;
                };
            }
            else {
                shortcutHandlers[shortcutKey] = cmd;
            }
            return this;
        };
        /**
         * Clears the formatting of the passed block element.
         *
         * If block is false, if will clear the styling of the first
         * block level element that contains the cursor.
         * @param  {HTMLElement} block
         * @since 1.4.4
         */
        emlEditor.clearBlockFormatting = function (block) {
            block = block || currentStyledBlockNode();
            if (!block || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'body')) {
                return this;
            }
            rangeHelper.saveRange();
            block.className = '';
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(block, 'style', '');
            if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'p,div,td')) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.convertElement(block, 'p');
            }
            rangeHelper.restoreRange();
            return this;
        };
        /******************************************
         * Creates the editor iframe and textarea
         * @private
         */
        init = () => {
            textarea._emleditor = this;
            // Load locale
            if (options.locale && options.locale !== 'en') {
                initLocale();
            }
            editorContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-container',
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(editorContainer, textarea);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(editorContainer, 'z-index', options.zIndex);
            isRequired = textarea.required;
            textarea.required = false;
            let FormatCtor = EmlEditor.formats[options.format];
            format = FormatCtor ? new FormatCtor() : {};
            /*
             * Plugins should be initialized before the formatters since
             * they may wish to add or change formatting handlers and
             * since the bbcode format caches its handlers,
             * such changes must be done first.
             */
            pluginManager = new _pluginManager__WEBPACK_IMPORTED_MODULE_4__.PluginManager(this);
            (options.plugins || '').split(',').forEach(function (plugin) {
                pluginManager.register(plugin.trim());
            });
            if ('init' in format) {
                format.init.call(this);
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
                emlEditor.toggleSourceMode();
            }
            updateActiveButtons();
            let loaded = function () {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalWin, 'load', null, loaded);
                if (options.autofocus) {
                    autofocus(!!options.autofocusEnd);
                }
                autoExpand();
                appendNewLine();
                // TODO: use editor doc and window?
                pluginManager.call('ready');
                if ('onReady' in format) {
                    format.onReady.call(this);
                }
            };
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalWin, 'load', null, loaded);
            if (globalDoc.readyState === 'complete') {
                loaded();
            }
        };
        /**
         * Init the locale variable with the specified locale if possible
         * @private
         * @return void
         */
        initLocale = () => {
            let lang;
            locale = EmlEditor.locale[options.locale];
            if (!locale) {
                lang = options.locale.split('-');
                locale = EmlEditor.locale[lang[0]];
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
        initEditor = () => {
            sourceEditor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('textarea', null);
            wysiwygEditor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('iframe', {
                frameborder: "0",
                allowfullscreen: "true"
            });
            /*
             * This needs to be done right after they are created because,
             * for any reason, the user may not want the value to be tinkered
             * by any filters.
             */
            if (options.startInSourceMode) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(editorContainer, 'sourceMode');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(wysiwygEditor);
            }
            else {
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
            emlEditor.dimensions(options.width || _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(textarea), options.height || _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(textarea));
            // Add ios to HTML so can apply CSS fix to only it
            let className = _browser_js__WEBPACK_IMPORTED_MODULE_8__.ios ? ' ios' : '';
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
            emlEditor.readOnly(!!options.readOnly);
            // iframe overflow fix for iOS
            if (_browser_js__WEBPACK_IMPORTED_MODULE_8__.ios) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(wysiwygBody, '100%');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'touchend', null, emlEditor.focus);
            }
            let tabIndex = _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(textarea, 'tabindex');
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(sourceEditor, 'tabindex', tabIndex);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygEditor, 'tabindex', tabIndex);
            rangeHelper = new _rangeHelper__WEBPACK_IMPORTED_MODULE_5__.RangeHelper(wysiwygWindow, null, sanitize);
            // load any textarea value into the editor
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(textarea);
            emlEditor.val(textarea.value);
            let placeholder = options.placeholder ||
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(textarea, 'placeholder');
            if (placeholder) {
                sourceEditor.placeholder = placeholder;
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygBody, 'placeholder', placeholder);
            }
        };
        /**
         * Initialises options
         * @private
         */
        initOptions = () => {
            // auto-update original textbox on blur if option set to true
            if (options.autoUpdate) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'blur', null, autoUpdate);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'blur', null, autoUpdate);
            }
            if (options.rtl === null) {
                options.rtl = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(sourceEditor, 'direction') === 'rtl';
            }
            emlEditor.rtl(!!options.rtl);
            if (options.autoExpand) {
                // Need to update when images (or anything else) loads
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'load', null, autoExpand, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'input keyup', null, autoExpand);
            }
            if (options.resizeEnabled) {
                initResize();
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(editorContainer, 'id', options.id);
            emlEditor.emoticons(options.emoticonsEnabled);
        };
        /**
         * Initialises events
         * @private
         */
        initEvents = () => {
            let form = textarea.form;
            let compositionEvents = 'compositionstart compositionend';
            let eventsToForward = 'keydown keyup keypress focus blur contextmenu input';
            let checkSelectionEvents = 'onselectionchange' in wysiwygDocument ?
                'selectionchange' :
                'keyup focus blur contextmenu mouseup touchend click';
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, 'click', null, handleDocumentClick);
            if (form) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(form, 'reset', null, handleFormReset);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(form, 'submit', null, emlEditor.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pagehide', null, emlEditor.updateOriginal);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pageshow', null, handleFormReset);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keypress', null, handleKeyPress);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keydown', null, handleKeyDown);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keydown', null, handleBackSpace);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keyup', null, appendNewLine);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'blur', null, valueChangedBlur);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keyup', null, valueChangedKeyUp);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'paste', null, handlePasteEvt);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'cut copy', null, handleCutCopyEvt);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, compositionEvents, null, handleComposition);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, checkSelectionEvents, null, checkSelectionChanged);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, eventsToForward, null, handleEvent);
            if (options.emoticonsCompat && globalWin.getSelection) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keyup', null, emoticonsCheckWhitespace);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'blur', null, function () {
                if (!emlEditor.val()) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(wysiwygBody, 'placeholder');
                }
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'focus', null, function () {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(wysiwygBody, 'placeholder');
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'blur', null, valueChangedBlur);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'keyup', null, valueChangedKeyUp);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, 'keydown', null, handleKeyDown);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, compositionEvents, null, handleComposition);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(sourceEditor, eventsToForward, null, handleEvent);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygDocument, 'mousedown', null, handleMouseDown);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygDocument, checkSelectionEvents, null, checkSelectionChanged);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygDocument, 'keyup', null, appendNewLine);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(editorContainer, 'selectionchanged', null, checkNodeChanged);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(editorContainer, 'selectionchanged', null, updateActiveButtons);
            // Custom events to forward
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(editorContainer, 'selectionchanged valuechanged nodechanged pasteraw paste', null, handleEvent);
        };
        /**
         * Creates the toolbar and appends it to the container
         * @private
         */
        initToolBar = () => {
            let editor = this;
            let group;
            let commands = editor.commands;
            let exclude = (options.toolbarExclude || '').split(',');
            let groups = options.toolbar.split('|');
            toolbar = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-toolbar',
                unselectable: 'on'
            });
            if (options.icons in EmlEditor.icons) {
                icons = new EmlEditor.icons[options.icons]();
            }
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(groups, function (_, menuItems) {
                group = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                    className: 'emleditor-group'
                });
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(menuItems.split(','), function (_, commandName) {
                    let button, shortcut, command = commands[commandName];
                    // The commandName must be a valid command and not excluded
                    if (!command || exclude.indexOf(commandName) > -1) {
                        return;
                    }
                    shortcut = command.shortcut;
                    button = (0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('toolbarButton', {
                        name: commandName,
                        dispName: editor.translate(command.name ||
                            command.tooltip || commandName)
                    }, true).firstChild;
                    if (icons && icons.create) {
                        let icon = icons.create(commandName);
                        if (icon) {
                            _dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(icons.create(commandName), button.firstChild);
                            _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(button, 'has-icon');
                        }
                    }
                    button._emlTxtMode = !!command.txtExec;
                    button._emlWysiwygMode = !!command.exec;
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', !command.exec);
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(button, 'click', null, function (e) {
                        if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(button, 'disabled')) {
                            handleCommand(button, command);
                        }
                        updateActiveButtons();
                        e.preventDefault();
                    });
                    // Prevent editor losing focus when button clicked
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(button, 'mousedown', null, function (e) {
                        editor.closeDropDown();
                        e.preventDefault();
                    });
                    if (command.tooltip) {
                        _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(button, 'title', editor.translate(command.tooltip) +
                            (shortcut ? ' (' + shortcut + ')' : ''));
                    }
                    if (shortcut) {
                        editor.addShortcut(shortcut, commandName);
                    }
                    if (command.state) {
                        btnStateHandlers.push({
                            name: commandName,
                            state: command.state
                        });
                        // exec string commands can be passed to queryCommandState
                    }
                    else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(command.exec)) {
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
        initResize = () => {
            let minHeight, maxHeight, minWidth, maxWidth, mouseMoveFunc, mouseUpFunc, grip = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-grip'
            }), 
            // Cover is used to cover the editor iframe so document
            // still gets mouse move events
            cover = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-resize-cover'
            }), moveEvents = 'touchmove mousemove', endEvents = 'touchcancel touchend mouseup', startX = 0, startY = 0, newX = 0, newY = 0, startWidth = 0, startHeight = 0, origWidth = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer), origHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer), isDragging = false, rtl = emlEditor.rtl();
            minHeight = options.resizeMinHeight || origHeight / 1.5;
            maxHeight = options.resizeMaxHeight || origHeight * 2.5;
            minWidth = options.resizeMinWidth || origWidth / 1.25;
            maxWidth = options.resizeMaxWidth || origWidth * 1.25;
            mouseMoveFunc = function (e) {
                // iOS uses window.event
                if (e.type === 'touchmove') {
                    e = globalWin.event;
                    newX = e.changedTouches[0].pageX;
                    newY = e.changedTouches[0].pageY;
                }
                else {
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
                if (!options.resizeWidth) {
                    newWidth = undefined;
                }
                if (maxHeight > 0 && newHeight > maxHeight) {
                    newHeight = maxHeight;
                }
                if (minHeight > 0 && newHeight < minHeight) {
                    newHeight = minHeight;
                }
                if (!options.resizeHeight) {
                    newHeight = undefined;
                }
                if (newWidth || newHeight) {
                    emlEditor.dimensions(newWidth, newHeight);
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, moveEvents, null, mouseMoveFunc);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, endEvents, null, mouseUpFunc);
                e.preventDefault();
            };
            if (icons && icons.create) {
                let icon = icons.create('grip');
                if (icon) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(grip, icon);
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(grip, 'has-icon');
                }
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, grip);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editorContainer, cover);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(cover);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(grip, 'touchstart mousedown', null, function (e) {
                // iOS uses window.event
                if (e.type === 'touchstart') {
                    e = globalWin.event;
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                }
                else {
                    startX = e.pageX;
                    startY = e.pageY;
                }
                startWidth = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer);
                startHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer);
                isDragging = true;
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(editorContainer, 'resizing');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.show(cover);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, moveEvents, null, mouseMoveFunc);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, endEvents, null, mouseUpFunc);
                e.preventDefault();
            });
        };
        /**
         * Prefixes and preloads the emoticon images
         * @private
         */
        initEmoticons = () => {
            let emoticons = options.emoticons;
            let root = options.emoticonsRoot || '';
            if (emoticons) {
                allEmoticons = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend({}, emoticons.more, emoticons.dropdown, emoticons.hidden);
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
        autofocus = (focusEnd) => {
            let range, txtPos, node = wysiwygBody.firstChild;
            // Can't focus invisible elements
            if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isVisible(editorContainer)) {
                return;
            }
            if (emlEditor.sourceMode()) {
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
            }
            else {
                range.selectNodeContents(node);
            }
            range.collapse(!focusEnd);
            rangeHelper.selectRange(range);
            currentSelection = range;
            if (focusEnd) {
                wysiwygBody.scrollTop = wysiwygBody.scrollHeight;
            }
            emlEditor.focus();
        };
        /**
         * Updates the toolbar to disable/enable the appropriate buttons
         * @private
         */
        let updateToolBar = (disable) => {
            let mode = emlEditor.inSourceMode() ? '_emlTxtMode' : '_emlWysiwygMode';
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(toolbarButtons, function (_, button) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', disable || !button[mode]);
            });
        };
        autoExpand = () => {
            if (options.autoExpand && !autoExpandThrottle) {
                autoExpandThrottle = setTimeout(emlEditor.expandToContent, 200);
            }
        };
        /**
         * Handles any document click and closes the dropdown if open
         * @private
         */
        handleDocumentClick = (e) => {
            // ignore right clicks
            if (e.which !== 3 && dropdown && !e.defaultPrevented) {
                autoUpdate();
                emlEditor.closeDropDown();
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
            let range = rangeHelper.selectedRange();
            if (range) {
                let container = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, wysiwygDocument);
                let firstParent;
                // Copy all inline parent nodes up to the first block parent so can
                // copy inline styles
                let parent = range.commonAncestorContainer;
                while (parent && _dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true)) {
                    if (parent.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE) {
                        let clone = parent.cloneNode();
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
                // range.toString() doesn't include newlines so can't use emlEditor.
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
        handlePasteEvt = (e) => {
            let editable = wysiwygBody;
            let clipboard = e.clipboardData;
            let loadImage = function (file) {
                let reader = new FileReader();
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
                data.html = sanitize(data['text/html']);
                handlePasteData(data);
                // If contentsFragment exists then we are already waiting for a
                // previous paste so let the handler for that handle this one too
            }
            else if (!pasteContentFragment) {
                // Save the scroll position so can be restored
                // when contents is restored
                let scrollTop = editable.scrollTop;
                rangeHelper.saveRange();
                pasteContentFragment = globalDoc.createDocumentFragment();
                while (editable.firstChild) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(pasteContentFragment, editable.firstChild);
                }
                setTimeout(function () {
                    let html = editable.innerHTML;
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
         * Replaces any emoticon codes in the passed HTML
         * with their emoticon images
         * @private
         */
        replaceEmoticons = () => {
            if (options.emoticonsEnabled) {
                _emoticons_js__WEBPACK_IMPORTED_MODULE_9__.replace(wysiwygBody, allEmoticons, options.emoticonsCompat);
            }
        };
        /**
         * Gets the selected text of the source editor
         * @return {string}
         * @private
         */
        sourceEditorSelectedText = () => {
            sourceEditor.focus();
            return sourceEditor.value.substring(sourceEditor.selectionStart, sourceEditor.selectionEnd);
        };
        /**
         * Handles the passed command
         * @private
         */
        handleCommand = (caller, cmd) => {
            // check if in text mode and handle text commands
            if (emlEditor.inSourceMode()) {
                if (cmd.txtExec) {
                    if (Array.isArray(cmd.txtExec)) {
                        emlEditor.sourceEditorInsertText.apply(this, cmd.txtExec);
                    }
                    else {
                        cmd.txtExec.call(this, caller, sourceEditorSelectedText());
                    }
                }
            }
            else if (cmd.exec) {
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(cmd.exec)) {
                    cmd.exec.call(this, caller);
                }
                else {
                    emlEditor.execCommand(cmd.exec, Object.prototype.hasOwnProperty.call(cmd, 'execParam') ? cmd.execParam : null);
                }
            }
        };
        /**
         * Checks if the current selection has changed and triggers
         * the selectionchanged event if it has.
         *
         * In browsers other that don't support selectionchange event it will check
         * at most once every 100ms.
         * @private
         */
        checkSelectionChanged = () => {
            function check() {
                // Don't create new selection if there isn't one (like after
                // blur event in iOS)
                if (wysiwygWindow.getSelection() &&
                    wysiwygWindow.getSelection().rangeCount <= 0) {
                    currentSelection = null;
                    // rangeHelper could be null if editor was destroyed
                    // before the timeout had finished
                }
                else if (rangeHelper && !rangeHelper.compare(currentSelection)) {
                    currentSelection = rangeHelper.cloneSelected();
                    // If the selection is in an inline wrap it in a block.
                    // Fixes #331
                    if (currentSelection && currentSelection.collapsed) {
                        let parent = currentSelection.startContainer;
                        let offset = currentSelection.startOffset;
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
            }
            else {
                setTimeout(check, 100);
            }
        };
        /**
         * Checks if the current node has changed and triggers
         * the nodechanged event if it has
         * @private
         */
        checkNodeChanged = () => {
            // check if node has changed
            let oldNode, node = rangeHelper.parentNode();
            if (currentNode !== node) {
                oldNode = currentNode;
                currentNode = node;
                currentBlockNode = rangeHelper.getFirstBlockParent(node);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(editorContainer, 'nodechanged', {
                    oldNode: oldNode,
                    newNode: currentNode
                });
            }
        };
        /**
         * Updates if buttons are active or not
         * @private
         */
        updateActiveButtons = () => {
            let firstBlock, parent;
            let activeClass = 'active';
            let doc = wysiwygDocument;
            let isSource = emlEditor.sourceMode();
            if (emlEditor.readOnly()) {
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(toolbar, activeClass), function (_, menuItem) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(menuItem, activeClass);
                });
                return;
            }
            if (!isSource) {
                parent = rangeHelper.parentNode();
                firstBlock = rangeHelper.getFirstBlockParent(parent);
            }
            for (let j = 0; j < btnStateHandlers.length; j++) {
                let state = 0;
                let btn = toolbarButtons[btnStateHandlers[j].name];
                let stateFn = btnStateHandlers[j].state;
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
        handleKeyPress = (e) => {
            // FF bug: https://bugzilla.mozilla.org/show_bug.cgi?id=501496
            if (e.defaultPrevented) {
                return;
            }
            emlEditor.closeDropDown();
            // 13 = enter key
            if (e.which === 13) {
                let LIST_TAGS = 'li,ul,ol';
                // "Fix" (cludge) for blocklevel elements being duplicated in some
                // browsers when enter is pressed instead of inserting a newline
                if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(currentBlockNode, LIST_TAGS) &&
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(currentBlockNode)) {
                    let br = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('br', {}, wysiwygDocument);
                    rangeHelper.insertNode(br);
                    // Last <br> of a block will be collapsed  so need to make sure
                    // the <br> that was inserted isn't the last node of a block.
                    let parent = br.parentNode;
                    let lastChild = parent.lastChild;
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
        appendNewLine = () => {
            // Check all nodes in reverse until either add a new line
            // or reach a non-empty textnode or BR at which point can
            // stop checking.
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.rTraverse(wysiwygBody, function (node) {
                // Last block, add new line after if has styling
                if (node.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE &&
                    !/inline/.test(_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'display'))) {
                    // Add line break after if has styling
                    if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, '.emleditor-nlf') && _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(node)) {
                        let paragraph = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, wysiwygDocument);
                        paragraph.className = 'emleditor-nlf';
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
        handleFormReset = () => {
            emlEditor.val(textarea.value);
        };
        /**
         * Handles any mousedown press in the WYSIWYG editor
         * @private
         */
        handleMouseDown = () => {
            emlEditor.closeDropDown();
        };
        /**
         * Passes events on to any handlers
         * @private
         * @return void
         */
        handleEvent = (e) => {
            if (pluginManager) {
                // Send event to all plugins
                pluginManager.call(e.type + 'Event', e, this);
            }
            // convert the event into a custom event to send
            let name = (e.target === sourceEditor ? 'emlsrc' : 'emlwys') + e.type;
            if (eventHandlers[name]) {
                eventHandlers[name].forEach(function (fn) {
                    fn.call(this, e);
                });
            }
        };
        /**
         * Emoticons keypress handler
         * @private
         */
        emoticonsKeyPress = (e) => {
            let replacedEmoticon, cachePos = 0, emoticonsCache = emlEditor.emoticonsCache, curChar = String.fromCharCode(e.which);
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
                emlEditor.emoticonsCache = emoticonsCache;
                emlEditor.longestEmoticonCode =
                    emoticonsCache[emoticonsCache.length - 1][0].length;
            }
            replacedEmoticon = rangeHelper.replaceKeyword(emlEditor.emoticonsCache, true, true, emlEditor.longestEmoticonCode, options.emoticonsCompat, curChar);
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
        emoticonsCheckWhitespace = () => {
            _emoticons_js__WEBPACK_IMPORTED_MODULE_9__.checkWhitespace(currentBlockNode, rangeHelper);
        };
        /**
         * Handles the keydown event, used for shortcuts
         * @private
         */
        handleKeyDown = function (e) {
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
            if (shortcutHandlers[shortcut] &&
                shortcutHandlers[shortcut].call(this) === false) {
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
        handleBackSpace = (e) => {
            let node, offset, range, parent;
            // 8 is the backspace key
            if (options.disableBlockRemove || e.which !== 8 ||
                !(range = rangeHelper.selectedRange())) {
                return;
            }
            node = range.startContainer;
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
            emlEditor.clearBlockFormatting(parent);
            e.preventDefault();
        };
        /**
         * Gets the first styled block node that contains the cursor
         * @return {HTMLElement}
         */
        currentStyledBlockNode = () => {
            let block = currentBlockNode;
            while (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(block) || _dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(block, true)) {
                if (!(block = block.parentNode) || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'body')) {
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
        triggerValueChanged = (saveRange) => {
            if (!pluginManager ||
                (!pluginManager.hasHandler('valuechangedEvent') &&
                    !triggerValueChanged.hasHandler)) {
                return;
            }
            let currentHtml, sourceMode = emlEditor.sourceMode(), hasSelection = !sourceMode && rangeHelper.hasSelection();
            // Composition end isn't guaranteed to fire but must have
            // ended when triggerValueChanged() is called so reset it
            isComposing = false;
            // Don't need to save the range if emleditor-start-marker
            // is present as the range is already saved
            saveRange = saveRange !== false &&
                !wysiwygDocument.getElementById('emleditor-start-marker');
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
                    rawValue: sourceMode ? emlEditor.val() : currentHtml
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
        valueChangedBlur = () => {
            if (valueChangedKeyUpTimer) {
                triggerValueChanged();
            }
        };
        /**
         * Should be called whenever there is a keypress event
         * @param  {Event} e The keypress event
         * @private
         */
        valueChangedKeyUp = (e) => {
            let which = e.which, lastChar = valueChangedKeyUp.lastChar, lastWasSpace = (lastChar === 13 || lastChar === 32), lastWasDelete = (lastChar === 8 || lastChar === 46);
            valueChangedKeyUp.lastChar = which;
            if (isComposing) {
                return;
            }
            // 13 = return & 32 = space
            if (which === 13 || which === 32) {
                if (!lastWasSpace) {
                    triggerValueChanged();
                }
                else {
                    valueChangedKeyUp.triggerNext = true;
                }
                // 8 = backspace & 46 = del
            }
            else if (which === 8 || which === 46) {
                if (!lastWasDelete) {
                    triggerValueChanged();
                }
                else {
                    valueChangedKeyUp.triggerNext = true;
                }
            }
            else if (valueChangedKeyUp.triggerNext) {
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
        handleComposition = (e) => {
            isComposing = /start/i.test(e.type);
            if (!isComposing) {
                triggerValueChanged();
            }
        };
        autoUpdate = function () {
            emlEditor.updateOriginal();
        };
        // run the initializer
        init();
    }
}
// Static
EmlEditor.locale = {};
EmlEditor.formats = {};
EmlEditor.icons = {};
EmlEditor.command = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmlEditor);
/**
 * Static command helper class
 * @class command
 * @name emleditor.command
 */
EmlEditor.command =
    /** @lends emleditor.command */
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
        set: function (name, cmd) {
            if (!name || !cmd) {
                return false;
            }
            // merge any existing command properties
            cmd = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(_defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name] || {}, cmd);
            cmd.remove = function () {
                EmlEditor.command.remove(name);
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
            div = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, doc);
            node = doc.createDocumentFragment();
            div.innerHTML = sanitize(html);
            while (div.firstChild) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(node, div.firstChild);
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
                if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(elm, true)) {
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(marker);
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
                !_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(container, true)) {
                lastChild = container.lastChild;
                while (lastChild && _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(lastChild, '.emleditor-ignore')) {
                    lastChild = lastChild.previousSibling;
                }
                if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(lastChild, 'br')) {
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
                frag = _dom_js__WEBPACK_IMPORTED_MODULE_0__.parseHTML(node);
            }
            else {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, node);
                if (endNode) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(frag, this.selectedRange().extractContents());
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
            }
            else {
                lastChild = frag;
            }
            this.removeMarkers();
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
         * Creates a marker node
         *
         * @param {string} id
         * @return {HTMLSpanElement}
         * @private
         */
        _createMarker = (id) => {
            this.removeMarker(id);
            var marker = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('span', {
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
						className: 'emleditor-more'
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
 * @param {!Node | HTMLElement | Window} node
 * @param {string} events
 * @param {string} [selector]
 * @param {function(...any)} fn
 * @param {boolean} [capture=false]
 * @see off()
 */
// eslint-disable-next-line max-params
function on(node, events, selector, fn, capture) {
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
 * @param {!Node | HTMLElement | Window} node
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
			handler = fn['_eml-event-' + event + selector];
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
 * @param {any} node
 * @param {any} rule
 * @param {any} [value]
 * @return {any}
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
 * @param {?HTMLElement | ChildNode} node
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
 * @param {HTMLElement | any} elm
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
	var emoticons = node && _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(node, 'img[data-emleditor-emoticon]');

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

		previousText += _dom_js__WEBPACK_IMPORTED_MODULE_0__.data(emoticon, 'emleditor-emoticon');

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
/* harmony export */   "default": () => (/* binding */ templates)
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
/* harmony import */ var _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/emlEditor */ "./src/lib/emlEditor.ts");
/* harmony import */ var _lib_pluginManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/pluginManager */ "./src/lib/pluginManager.ts");
/* harmony import */ var _lib_escape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/escape.js */ "./src/lib/escape.js");
/* harmony import */ var _lib_browser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/browser.js */ "./src/lib/browser.js");
/* harmony import */ var _lib_dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/dom.js */ "./src/lib/dom.js");
/* harmony import */ var _lib_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/utils.js */ "./src/lib/utils.js");
/* harmony import */ var _lib_defaultCommands_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/defaultCommands.js */ "./src/lib/defaultCommands.js");
/* harmony import */ var _lib_defaultOptions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _themes_square_less__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./themes/square.less */ "./src/themes/square.less");









window.emlEditor = {
    command: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].command,
    locale: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].locale,
    icons: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].icons,
    formats: _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"].formats,
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
    plugins: _lib_pluginManager__WEBPACK_IMPORTED_MODULE_1__.PluginManager.plugins,
    create: function (textarea, options) {
        options = options || {};
        // Don't allow the editor to be initialised
        // on it's own source editor
        if (_lib_dom_js__WEBPACK_IMPORTED_MODULE_4__.parent(textarea, '.emleditor-container')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFB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Z0JBQ1IsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLEtB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QUNBLFVBQVU7QUFDVjtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9GRDtBQUNnQztBQUNJO0FBQ0U7QUFDSDs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQix3Q0FBTztBQUM1QixLQUFLLDJDQUFVO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFD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QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbjhCSzs7QUFFaEM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTLDZDQUFJOztBQUViO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7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QkFBc0IsQ0FBQyxFQUFFLENBQUM7WUFDbEQsT0FBTztRQUNSLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyx3QkFBd0IsSUFBSSwrREFBMEIsRUFBRSxDQUFDO1lBQ3BFLENBQUMsSUFBSSxzREFBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDRixDQUFDO0lBRUQsUUFBUSxFQUFFLFVBQVUsUUFBYTtRQUNoQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDNUIsQ0FBQztDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9ub2RlX21vZHVsZXMvZG9tcHVyaWZ5L2Rpc3QvcHVyaWZ5LmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy90aGVtZXMvc3F1YXJlLmxlc3M/ZGRjNiIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2VtbEVkaXRvci50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3BsdWdpbk1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9yYW5nZUhlbHBlci50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0Q29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0T3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2RvbS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Vtb3RpY29ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3RlbXBsYXRlcy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBsaWNlbnNlIERPTVB1cmlmeSAzLjAuOSB8IChjKSBDdXJlNTMgYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyB8IFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgbGljZW5zZSAyLjAgYW5kIE1vemlsbGEgUHVibGljIExpY2Vuc2UgMi4wIHwgZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2Jsb2IvMy4wLjkvTElDRU5TRSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGNvbnN0IHtcbiAgICBlbnRyaWVzLFxuICAgIHNldFByb3RvdHlwZU9mLFxuICAgIGlzRnJvemVuLFxuICAgIGdldFByb3RvdHlwZU9mLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvclxuICB9ID0gT2JqZWN0O1xuICBsZXQge1xuICAgIGZyZWV6ZSxcbiAgICBzZWFsLFxuICAgIGNyZWF0ZVxuICB9ID0gT2JqZWN0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbiAgbGV0IHtcbiAgICBhcHBseSxcbiAgICBjb25zdHJ1Y3RcbiAgfSA9IHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBSZWZsZWN0O1xuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghc2VhbCkge1xuICAgIHNlYWwgPSBmdW5jdGlvbiBzZWFsKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFhcHBseSkge1xuICAgIGFwcGx5ID0gZnVuY3Rpb24gYXBwbHkoZnVuLCB0aGlzVmFsdWUsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmdW4uYXBwbHkodGhpc1ZhbHVlLCBhcmdzKTtcbiAgICB9O1xuICB9XG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgRnVuYyguLi5hcmdzKTtcbiAgICB9O1xuICB9XG4gIGNvbnN0IGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuICBjb25zdCBhcnJheVBvcCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnBvcCk7XG4gIGNvbnN0IGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICBjb25zdCBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIGNvbnN0IHN0cmluZ1RvU3RyaW5nID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nKTtcbiAgY29uc3Qgc3RyaW5nTWF0Y2ggPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUubWF0Y2gpO1xuICBjb25zdCBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICBjb25zdCBzdHJpbmdJbmRleE9mID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLmluZGV4T2YpO1xuICBjb25zdCBzdHJpbmdUcmltID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRyaW0pO1xuICBjb25zdCBvYmplY3RIYXNPd25Qcm9wZXJ0eSA9IHVuYXBwbHkoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gIGNvbnN0IHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG4gIGNvbnN0IHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCB0aGlzQXJnIGFuZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uc3RydWN0KGZ1bmMsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIHByb3BlcnRpZXMgdG8gYSBsb29rdXAgdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldCAtIFRoZSBzZXQgdG8gd2hpY2ggZWxlbWVudHMgd2lsbCBiZSBhZGRlZC5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgY29udGFpbmluZyBlbGVtZW50cyB0byBiZSBhZGRlZCB0byB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm1DYXNlRnVuYyAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgY2FzZSBvZiBlYWNoIGVsZW1lbnQgYmVmb3JlIGFkZGluZyB0byB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgbW9kaWZpZWQgc2V0IHdpdGggYWRkZWQgZWxlbWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRUb1NldChzZXQsIGFycmF5KSB7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBzdHJpbmdUb0xvd2VyQ2FzZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG4gICAgbGV0IGwgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgbGV0IGVsZW1lbnQgPSBhcnJheVtsXTtcbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgbGNFbGVtZW50ID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSBsY0VsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFtlbGVtZW50XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW4gdXAgYW4gYXJyYXkgdG8gaGFyZGVuIGFnYWluc3QgQ1NQUFxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBiZSBjbGVhbmVkLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBjbGVhbmVkIHZlcnNpb24gb2YgdGhlIGFycmF5XG4gICAqL1xuICBmdW5jdGlvbiBjbGVhbkFycmF5KGFycmF5KSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkoYXJyYXksIGluZGV4KTtcbiAgICAgIGlmICghaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGFycmF5W2luZGV4XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBjbG9uZWQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgbmV3IG9iamVjdCB0aGF0IGNvcGllcyB0aGUgb3JpZ2luYWwuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSBjcmVhdGUobnVsbCk7XG4gICAgZm9yIChjb25zdCBbcHJvcGVydHksIHZhbHVlXSBvZiBlbnRyaWVzKG9iamVjdCkpIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgaWYgKGlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xlYW5BcnJheSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsb25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhdXRvbWF0aWNhbGx5IGNoZWNrcyBpZiB0aGUgcHJvcCBpcyBmdW5jdGlvbiBvciBnZXR0ZXIgYW5kIGJlaGF2ZXMgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGxvb2sgdXAgdGhlIGdldHRlciBmdW5jdGlvbiBpbiBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCAtIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB3aGljaCB0byBmaW5kIHRoZSBnZXR0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGdldHRlciBmdW5jdGlvbiBmb3VuZCBpbiB0aGUgcHJvdG90eXBlIGNoYWluIG9yIGEgZmFsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBsb29rdXBHZXR0ZXIob2JqZWN0LCBwcm9wKSB7XG4gICAgd2hpbGUgKG9iamVjdCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3ApO1xuICAgICAgaWYgKGRlc2MpIHtcbiAgICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy5nZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmYWxsYmFja1ZhbHVlO1xuICB9XG5cbiAgY29uc3QgaHRtbCQxID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpYWxvZycsICdkaXInLCAnZGl2JywgJ2RsJywgJ2R0JywgJ2VsZW1lbnQnLCAnZW0nLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9udCcsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2ltZycsICdpbnB1dCcsICdpbnMnLCAna2JkJywgJ2xhYmVsJywgJ2xlZ2VuZCcsICdsaScsICdtYWluJywgJ21hcCcsICdtYXJrJywgJ21hcnF1ZWUnLCAnbWVudScsICdtZW51aXRlbScsICdtZXRlcicsICduYXYnLCAnbm9icicsICdvbCcsICdvcHRncm91cCcsICdvcHRpb24nLCAnb3V0cHV0JywgJ3AnLCAncGljdHVyZScsICdwcmUnLCAncHJvZ3Jlc3MnLCAncScsICdycCcsICdydCcsICdydWJ5JywgJ3MnLCAnc2FtcCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzaGFkb3cnLCAnc21hbGwnLCAnc291cmNlJywgJ3NwYWNlcicsICdzcGFuJywgJ3N0cmlrZScsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RlbXBsYXRlJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndHInLCAndHJhY2snLCAndHQnLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJ10pO1xuXG4gIC8vIFNWR1xuICBjb25zdCBzdmckMSA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwcGF0aCcsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmaWx0ZXInLCAnZm9udCcsICdnJywgJ2dseXBoJywgJ2dseXBocmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsZ3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N0eWxlJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0cGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJywgJ3ZpZXcnLCAndmtlcm4nXSk7XG4gIGNvbnN0IHN2Z0ZpbHRlcnMgPSBmcmVlemUoWydmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLCAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJywgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRHJvcFNoYWRvdycsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnXSk7XG5cbiAgLy8gTGlzdCBvZiBTVkcgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWxsb3dlZCBieSBkZWZhdWx0LlxuICAvLyBXZSBzdGlsbCBuZWVkIHRvIGtub3cgdGhlbSBzbyB0aGF0IHdlIGNhbiBkbyBuYW1lc3BhY2VcbiAgLy8gY2hlY2tzIHByb3Blcmx5IGluIGNhc2Ugb25lIHdhbnRzIHRvIGFkZCB0aGVtIHRvXG4gIC8vIGFsbG93LWxpc3QuXG4gIGNvbnN0IHN2Z0Rpc2FsbG93ZWQgPSBmcmVlemUoWydhbmltYXRlJywgJ2NvbG9yLXByb2ZpbGUnLCAnY3Vyc29yJywgJ2Rpc2NhcmQnLCAnZm9udC1mYWNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGF0Y2gnLCAnaGF0Y2hwYXRoJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21pc3NpbmctZ2x5cGgnLCAnc2NyaXB0JywgJ3NldCcsICdzb2xpZGNvbG9yJywgJ3Vua25vd24nLCAndXNlJ10pO1xuICBjb25zdCBtYXRoTWwkMSA9IGZyZWV6ZShbJ21hdGgnLCAnbWVuY2xvc2UnLCAnbWVycm9yJywgJ21mZW5jZWQnLCAnbWZyYWMnLCAnbWdseXBoJywgJ21pJywgJ21sYWJlbGVkdHInLCAnbW11bHRpc2NyaXB0cycsICdtbicsICdtbycsICdtb3ZlcicsICdtcGFkZGVkJywgJ21waGFudG9tJywgJ21yb290JywgJ21yb3cnLCAnbXMnLCAnbXNwYWNlJywgJ21zcXJ0JywgJ21zdHlsZScsICdtc3ViJywgJ21zdXAnLCAnbXN1YnN1cCcsICdtdGFibGUnLCAnbXRkJywgJ210ZXh0JywgJ210cicsICdtdW5kZXInLCAnbXVuZGVyb3ZlcicsICdtcHJlc2NyaXB0cyddKTtcblxuICAvLyBTaW1pbGFybHkgdG8gU1ZHLCB3ZSB3YW50IHRvIGtub3cgYWxsIE1hdGhNTCBlbGVtZW50cyxcbiAgLy8gZXZlbiB0aG9zZSB0aGF0IHdlIGRpc2FsbG93IGJ5IGRlZmF1bHQuXG4gIGNvbnN0IG1hdGhNbERpc2FsbG93ZWQgPSBmcmVlemUoWydtYWN0aW9uJywgJ21hbGlnbmdyb3VwJywgJ21hbGlnbm1hcmsnLCAnbWxvbmdkaXYnLCAnbXNjYXJyaWVzJywgJ21zY2FycnknLCAnbXNncm91cCcsICdtc3RhY2snLCAnbXNsaW5lJywgJ21zcm93JywgJ3NlbWFudGljcycsICdhbm5vdGF0aW9uJywgJ2Fubm90YXRpb24teG1sJywgJ21wcmVzY3JpcHRzJywgJ25vbmUnXSk7XG4gIGNvbnN0IHRleHQgPSBmcmVlemUoWycjdGV4dCddKTtcblxuICBjb25zdCBodG1sID0gZnJlZXplKFsnYWNjZXB0JywgJ2FjdGlvbicsICdhbGlnbicsICdhbHQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9waWN0dXJlaW5waWN0dXJlJywgJ2F1dG9wbGF5JywgJ2JhY2tncm91bmQnLCAnYmdjb2xvcicsICdib3JkZXInLCAnY2FwdHVyZScsICdjZWxscGFkZGluZycsICdjZWxsc3BhY2luZycsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3MnLCAnY2xlYXInLCAnY29sb3InLCAnY29scycsICdjb2xzcGFuJywgJ2NvbnRyb2xzJywgJ2NvbnRyb2xzbGlzdCcsICdjb29yZHMnLCAnY3Jvc3NvcmlnaW4nLCAnZGF0ZXRpbWUnLCAnZGVjb2RpbmcnLCAnZGVmYXVsdCcsICdkaXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZXBpY3R1cmVpbnBpY3R1cmUnLCAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsICdlbmN0eXBlJywgJ2VudGVya2V5aGludCcsICdmYWNlJywgJ2ZvcicsICdoZWFkZXJzJywgJ2hlaWdodCcsICdoaWRkZW4nLCAnaGlnaCcsICdocmVmJywgJ2hyZWZsYW5nJywgJ2lkJywgJ2lucHV0bW9kZScsICdpbnRlZ3JpdHknLCAnaXNtYXAnLCAna2luZCcsICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9hZGluZycsICdsb29wJywgJ2xvdycsICdtYXgnLCAnbWF4bGVuZ3RoJywgJ21lZGlhJywgJ21ldGhvZCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ211bHRpcGxlJywgJ211dGVkJywgJ25hbWUnLCAnbm9uY2UnLCAnbm9zaGFkZScsICdub3ZhbGlkYXRlJywgJ25vd3JhcCcsICdvcGVuJywgJ29wdGltdW0nLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcmNsYW5nJywgJ3N0YXJ0JywgJ3NyYycsICdzcmNzZXQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmluZGV4JywgJ3RpdGxlJywgJ3RyYW5zbGF0ZScsICd0eXBlJywgJ3VzZW1hcCcsICd2YWxpZ24nLCAndmFsdWUnLCAnd2lkdGgnLCAneG1sbnMnLCAnc2xvdCddKTtcbiAgY29uc3Qgc3ZnID0gZnJlZXplKFsnYWNjZW50LWhlaWdodCcsICdhY2N1bXVsYXRlJywgJ2FkZGl0aXZlJywgJ2FsaWdubWVudC1iYXNlbGluZScsICdhc2NlbnQnLCAnYXR0cmlidXRlbmFtZScsICdhdHRyaWJ1dGV0eXBlJywgJ2F6aW11dGgnLCAnYmFzZWZyZXF1ZW5jeScsICdiYXNlbGluZS1zaGlmdCcsICdiZWdpbicsICdiaWFzJywgJ2J5JywgJ2NsYXNzJywgJ2NsaXAnLCAnY2xpcHBhdGh1bml0cycsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NvbG9yJywgJ2NvbG9yLWludGVycG9sYXRpb24nLCAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJywgJ2NvbG9yLXByb2ZpbGUnLCAnY29sb3ItcmVuZGVyaW5nJywgJ2N4JywgJ2N5JywgJ2QnLCAnZHgnLCAnZHknLCAnZGlmZnVzZWNvbnN0YW50JywgJ2RpcmVjdGlvbicsICdkaXNwbGF5JywgJ2Rpdmlzb3InLCAnZHVyJywgJ2VkZ2Vtb2RlJywgJ2VsZXZhdGlvbicsICdlbmQnLCAnZmlsbCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2ZpbHRlcicsICdmaWx0ZXJ1bml0cycsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvbnQtZmFtaWx5JywgJ2ZvbnQtc2l6ZScsICdmb250LXNpemUtYWRqdXN0JywgJ2ZvbnQtc3RyZXRjaCcsICdmb250LXN0eWxlJywgJ2ZvbnQtdmFyaWFudCcsICdmb250LXdlaWdodCcsICdmeCcsICdmeScsICdnMScsICdnMicsICdnbHlwaC1uYW1lJywgJ2dseXBocmVmJywgJ2dyYWRpZW50dW5pdHMnLCAnZ3JhZGllbnR0cmFuc2Zvcm0nLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2luJywgJ2luMicsICdrJywgJ2sxJywgJ2syJywgJ2szJywgJ2s0JywgJ2tlcm5pbmcnLCAna2V5cG9pbnRzJywgJ2tleXNwbGluZXMnLCAna2V5dGltZXMnLCAnbGFuZycsICdsZW5ndGhhZGp1c3QnLCAnbGV0dGVyLXNwYWNpbmcnLCAna2VybmVsbWF0cml4JywgJ2tlcm5lbHVuaXRsZW5ndGgnLCAnbGlnaHRpbmctY29sb3InLCAnbG9jYWwnLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdtYXJrZXJoZWlnaHQnLCAnbWFya2VydW5pdHMnLCAnbWFya2Vyd2lkdGgnLCAnbWFza2NvbnRlbnR1bml0cycsICdtYXNrdW5pdHMnLCAnbWF4JywgJ21hc2snLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21vZGUnLCAnbWluJywgJ25hbWUnLCAnbnVtb2N0YXZlcycsICdvZmZzZXQnLCAnb3BlcmF0b3InLCAnb3BhY2l0eScsICdvcmRlcicsICdvcmllbnQnLCAnb3JpZW50YXRpb24nLCAnb3JpZ2luJywgJ292ZXJmbG93JywgJ3BhaW50LW9yZGVyJywgJ3BhdGgnLCAncGF0aGxlbmd0aCcsICdwYXR0ZXJuY29udGVudHVuaXRzJywgJ3BhdHRlcm50cmFuc2Zvcm0nLCAncGF0dGVybnVuaXRzJywgJ3BvaW50cycsICdwcmVzZXJ2ZWFscGhhJywgJ3ByZXNlcnZlYXNwZWN0cmF0aW8nLCAncHJpbWl0aXZldW5pdHMnLCAncicsICdyeCcsICdyeScsICdyYWRpdXMnLCAncmVmeCcsICdyZWZ5JywgJ3JlcGVhdGNvdW50JywgJ3JlcGVhdGR1cicsICdyZXN0YXJ0JywgJ3Jlc3VsdCcsICdyb3RhdGUnLCAnc2NhbGUnLCAnc2VlZCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3BlY3VsYXJjb25zdGFudCcsICdzcGVjdWxhcmV4cG9uZW50JywgJ3NwcmVhZG1ldGhvZCcsICdzdGFydG9mZnNldCcsICdzdGRkZXZpYXRpb24nLCAnc3RpdGNodGlsZXMnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlJywgJ3N0cm9rZS13aWR0aCcsICdzdHlsZScsICdzdXJmYWNlc2NhbGUnLCAnc3lzdGVtbGFuZ3VhZ2UnLCAndGFiaW5kZXgnLCAndGFyZ2V0eCcsICd0YXJnZXR5JywgJ3RyYW5zZm9ybScsICd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RleHQtYW5jaG9yJywgJ3RleHQtZGVjb3JhdGlvbicsICd0ZXh0LXJlbmRlcmluZycsICd0ZXh0bGVuZ3RoJywgJ3R5cGUnLCAndTEnLCAndTInLCAndW5pY29kZScsICd2YWx1ZXMnLCAndmlld2JveCcsICd2aXNpYmlsaXR5JywgJ3ZlcnNpb24nLCAndmVydC1hZHYteScsICd2ZXJ0LW9yaWdpbi14JywgJ3ZlcnQtb3JpZ2luLXknLCAnd2lkdGgnLCAnd29yZC1zcGFjaW5nJywgJ3dyYXAnLCAnd3JpdGluZy1tb2RlJywgJ3hjaGFubmVsc2VsZWN0b3InLCAneWNoYW5uZWxzZWxlY3RvcicsICd4JywgJ3gxJywgJ3gyJywgJ3htbG5zJywgJ3knLCAneTEnLCAneTInLCAneicsICd6b29tYW5kcGFuJ10pO1xuICBjb25zdCBtYXRoTWwgPSBmcmVlemUoWydhY2NlbnQnLCAnYWNjZW50dW5kZXInLCAnYWxpZ24nLCAnYmV2ZWxsZWQnLCAnY2xvc2UnLCAnY29sdW1uc2FsaWduJywgJ2NvbHVtbmxpbmVzJywgJ2NvbHVtbnNwYW4nLCAnZGVub21hbGlnbicsICdkZXB0aCcsICdkaXInLCAnZGlzcGxheScsICdkaXNwbGF5c3R5bGUnLCAnZW5jb2RpbmcnLCAnZmVuY2UnLCAnZnJhbWUnLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnbGFyZ2VvcCcsICdsZW5ndGgnLCAnbGluZXRoaWNrbmVzcycsICdsc3BhY2UnLCAnbHF1b3RlJywgJ21hdGhiYWNrZ3JvdW5kJywgJ21hdGhjb2xvcicsICdtYXRoc2l6ZScsICdtYXRodmFyaWFudCcsICdtYXhzaXplJywgJ21pbnNpemUnLCAnbW92YWJsZWxpbWl0cycsICdub3RhdGlvbicsICdudW1hbGlnbicsICdvcGVuJywgJ3Jvd2FsaWduJywgJ3Jvd2xpbmVzJywgJ3Jvd3NwYWNpbmcnLCAncm93c3BhbicsICdyc3BhY2UnLCAncnF1b3RlJywgJ3NjcmlwdGxldmVsJywgJ3NjcmlwdG1pbnNpemUnLCAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLCAnc2VsZWN0aW9uJywgJ3NlcGFyYXRvcicsICdzZXBhcmF0b3JzJywgJ3N0cmV0Y2h5JywgJ3N1YnNjcmlwdHNoaWZ0JywgJ3N1cHNjcmlwdHNoaWZ0JywgJ3N5bW1ldHJpYycsICd2b2Zmc2V0JywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuICBjb25zdCB4bWwgPSBmcmVlemUoWyd4bGluazpocmVmJywgJ3htbDppZCcsICd4bGluazp0aXRsZScsICd4bWw6c3BhY2UnLCAneG1sbnM6eGxpbmsnXSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG4gIGNvbnN0IE1VU1RBQ0hFX0VYUFIgPSBzZWFsKC9cXHtcXHtbXFx3XFxXXSp8W1xcd1xcV10qXFx9XFx9L2dtKTsgLy8gU3BlY2lmeSB0ZW1wbGF0ZSBkZXRlY3Rpb24gcmVnZXggZm9yIFNBRkVfRk9SX1RFTVBMQVRFUyBtb2RlXG4gIGNvbnN0IEVSQl9FWFBSID0gc2VhbCgvPCVbXFx3XFxXXSp8W1xcd1xcV10qJT4vZ20pO1xuICBjb25zdCBUTVBMSVRfRVhQUiA9IHNlYWwoL1xcJHtbXFx3XFxXXSp9L2dtKTtcbiAgY29uc3QgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IElTX0FMTE9XRURfVVJJID0gc2VhbCgvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHApOnxbXmEtel18W2EteisuXFwtXSsoPzpbXmEteisuXFwtOl18JCkpL2kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICApO1xuXG4gIGNvbnN0IElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICBjb25zdCBBVFRSX1dISVRFU1BBQ0UgPSBzZWFsKC9bXFx1MDAwMC1cXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMC1cXHUyMDI5XFx1MjA1RlxcdTMwMDBdL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICk7XG5cbiAgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuXG4gIHZhciBFWFBSRVNTSU9OUyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgTVVTVEFDSEVfRVhQUjogTVVTVEFDSEVfRVhQUixcbiAgICBFUkJfRVhQUjogRVJCX0VYUFIsXG4gICAgVE1QTElUX0VYUFI6IFRNUExJVF9FWFBSLFxuICAgIERBVEFfQVRUUjogREFUQV9BVFRSLFxuICAgIEFSSUFfQVRUUjogQVJJQV9BVFRSLFxuICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSxcbiAgICBJU19TQ1JJUFRfT1JfREFUQTogSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgQVRUUl9XSElURVNQQUNFOiBBVFRSX1dISVRFU1BBQ0UsXG4gICAgRE9DVFlQRV9OQU1FOiBET0NUWVBFX05BTUVcbiAgfSk7XG5cbiAgY29uc3QgZ2V0R2xvYmFsID0gZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3c7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBEb24ndCBleHBvcnQgdGhpcyBmdW5jdGlvbiBvdXRzaWRlIHRoaXMgbW9kdWxlIVxuICAgKiBAcGFyYW0ge1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gcHVyaWZ5SG9zdEVsZW1lbnQgVGhlIFNjcmlwdCBlbGVtZW50IHVzZWQgdG8gbG9hZCBET01QdXJpZnkgKHRvIGRldGVybWluZSBwb2xpY3kgbmFtZSBzdWZmaXgpLlxuICAgKiBAcmV0dXJuIHtUcnVzdGVkVHlwZVBvbGljeX0gVGhlIHBvbGljeSBjcmVhdGVkIChvciBudWxsLCBpZiBUcnVzdGVkIFR5cGVzXG4gICAqIGFyZSBub3Qgc3VwcG9ydGVkIG9yIGNyZWF0aW5nIHRoZSBwb2xpY3kgZmFpbGVkKS5cbiAgICovXG4gIGNvbnN0IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgcHVyaWZ5SG9zdEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIHRydXN0ZWRUeXBlcyAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxuICAgIC8vIGJ5IGFkZGluZyBhIGRhdGEtdHQtcG9saWN5LXN1ZmZpeCB0byB0aGUgc2NyaXB0IGVsZW1lbnQgd2l0aCB0aGUgRE9NUHVyaWZ5LlxuICAgIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cbiAgICBsZXQgc3VmZml4ID0gbnVsbDtcbiAgICBjb25zdCBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAocHVyaWZ5SG9zdEVsZW1lbnQgJiYgcHVyaWZ5SG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICAgIHN1ZmZpeCA9IHB1cmlmeUhvc3RFbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cbiAgICBjb25zdCBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICAgIGNyZWF0ZUhUTUwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTY3JpcHRVUkwoc2NyaXB0VXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHNjcmlwdFVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xuICAgICAgLy8gYWxyZWFkeSBydW4pLiBTa2lwIGNyZWF0aW5nIHRoZSBwb2xpY3ksIGFzIHRoaXMgd2lsbCBvbmx5IGNhdXNlIGVycm9yc1xuICAgICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIGxldCB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuICAgIGNvbnN0IERPTVB1cmlmeSA9IHJvb3QgPT4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuXG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBsYWJlbCwgZXhwb3NlZCBmb3IgZWFzaWVyIGNoZWNrc1xuICAgICAqIGlmIERPTVB1cmlmeSBpcyB1cCB0byBkYXRlIG9yIG5vdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS52ZXJzaW9uID0gJzMuMC45JztcblxuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGVsZW1lbnRzIHRoYXQgRE9NUHVyaWZ5IHJlbW92ZWQgZHVyaW5nIHNhbml0YXRpb24uXG4gICAgICogRW1wdHkgaWYgbm90aGluZyB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuICAgIGlmICghd2luZG93IHx8ICF3aW5kb3cuZG9jdW1lbnQgfHwgd2luZG93LmRvY3VtZW50Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgICAvLyBOb3QgcnVubmluZyBpbiBhIGJyb3dzZXIsIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IHlvdSBjYW4gcGFzcyB5b3VyIG93biBXaW5kb3dcbiAgICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG4gICAgbGV0IHtcbiAgICAgIGRvY3VtZW50XG4gICAgfSA9IHdpbmRvdztcbiAgICBjb25zdCBvcmlnaW5hbERvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgY3VycmVudFNjcmlwdCA9IG9yaWdpbmFsRG9jdW1lbnQuY3VycmVudFNjcmlwdDtcbiAgICBjb25zdCB7XG4gICAgICBEb2N1bWVudEZyYWdtZW50LFxuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICAgIE5vZGUsXG4gICAgICBFbGVtZW50LFxuICAgICAgTm9kZUZpbHRlcixcbiAgICAgIE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAgfHwgd2luZG93Lk1vek5hbWVkQXR0ck1hcCxcbiAgICAgIEhUTUxGb3JtRWxlbWVudCxcbiAgICAgIERPTVBhcnNlcixcbiAgICAgIHRydXN0ZWRUeXBlc1xuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IEVsZW1lbnQucHJvdG90eXBlO1xuICAgIGNvbnN0IGNsb25lTm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2xvbmVOb2RlJyk7XG4gICAgY29uc3QgZ2V0TmV4dFNpYmxpbmcgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ25leHRTaWJsaW5nJyk7XG4gICAgY29uc3QgZ2V0Q2hpbGROb2RlcyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGROb2RlcycpO1xuICAgIGNvbnN0IGdldFBhcmVudE5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ3BhcmVudE5vZGUnKTtcblxuICAgIC8vIEFzIHBlciBpc3N1ZSAjNDcsIHRoZSB3ZWItY29tcG9uZW50cyByZWdpc3RyeSBpcyBpbmhlcml0ZWQgYnkgYVxuICAgIC8vIG5ldyBkb2N1bWVudCBjcmVhdGVkIHZpYSBjcmVhdGVIVE1MRG9jdW1lbnQuIEFzIHBlciB0aGUgc3BlY1xuICAgIC8vIChodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjcmVhdGluZy1hbmQtcGFzc2luZy1yZWdpc3RyaWVzKVxuICAgIC8vIGEgbmV3IGVtcHR5IHJlZ2lzdHJ5IGlzIHVzZWQgd2hlbiBjcmVhdGluZyBhIHRlbXBsYXRlIGNvbnRlbnRzIG93bmVyXG4gICAgLy8gZG9jdW1lbnQsIHNvIHdlIHVzZSB0aGF0IGFzIG91ciBwYXJlbnQgZG9jdW1lbnQgdG8gZW5zdXJlIG5vdGhpbmdcbiAgICAvLyBpcyBpbmhlcml0ZWQuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCB0cnVzdGVkVHlwZXNQb2xpY3k7XG4gICAgbGV0IGVtcHR5SFRNTCA9ICcnO1xuICAgIGNvbnN0IHtcbiAgICAgIGltcGxlbWVudGF0aW9uLFxuICAgICAgY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgfSA9IGRvY3VtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGltcG9ydE5vZGVcbiAgICB9ID0gb3JpZ2luYWxEb2N1bWVudDtcbiAgICBsZXQgaG9va3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZW50cmllcyA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZ2V0UGFyZW50Tm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpbXBsZW1lbnRhdGlvbiAmJiBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7XG4gICAgICBNVVNUQUNIRV9FWFBSLFxuICAgICAgRVJCX0VYUFIsXG4gICAgICBUTVBMSVRfRVhQUixcbiAgICAgIERBVEFfQVRUUixcbiAgICAgIEFSSUFfQVRUUixcbiAgICAgIElTX1NDUklQVF9PUl9EQVRBLFxuICAgICAgQVRUUl9XSElURVNQQUNFXG4gICAgfSA9IEVYUFJFU1NJT05TO1xuICAgIGxldCB7XG4gICAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkkkMVxuICAgIH0gPSBFWFBSRVNTSU9OUztcblxuICAgIC8qKlxuICAgICAqIFdlIGNvbnNpZGVyIHRoZSBlbGVtZW50cyBhbmQgYXR0cmlidXRlcyBiZWxvdyB0byBiZSBzYWZlLiBJZGVhbGx5XG4gICAgICogZG9uJ3QgYWRkIGFueSBuZXcgb25lcyBidXQgZmVlbCBmcmVlIHRvIHJlbW92ZSB1bndhbnRlZCBvbmVzLlxuICAgICAqL1xuXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwkMSwgLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLm1hdGhNbCQxLCAuLi50ZXh0XSk7XG5cbiAgICAvKiBBbGxvd2VkIGF0dHJpYnV0ZSBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX0FUVFIgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9BVFRSID0gYWRkVG9TZXQoe30sIFsuLi5odG1sLCAuLi5zdmcsIC4uLm1hdGhNbCwgLi4ueG1sXSk7XG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBob3cgRE9NUFVyaWZ5IHNob3VsZCBoYW5kbGUgY3VzdG9tIGVsZW1lbnRzIGFuZCB0aGVpciBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cy5cbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSB0YWdOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGN1c3RvbSBlbGVtZW50cylcbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSBhdHRyaWJ1dGVOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGF0dHJpYnV0ZXMgbm90IG9uIHRoZSBhbGxvdyBsaXN0KVxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIGFsbG93IGN1c3RvbSBlbGVtZW50cyBkZXJpdmVkIGZyb20gYnVpbHQtaW5zIGlmIHRoZXkgcGFzcyBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2suIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAgICovXG4gICAgbGV0IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gT2JqZWN0LnNlYWwoY3JlYXRlKG51bGwsIHtcbiAgICAgIHRhZ05hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIGxldCBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIGxldCBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgc2VsZi1jbG9zaW5nIHRhZ3MgaW4gYXR0cmlidXRlcyBhcmUgYWxsb3dlZC5cbiAgICAgKiBVc3VhbGx5IHJlbW92ZWQgZHVlIHRvIGEgbVhTUyBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgbGV0IEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IHRydWU7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICBsZXQgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgbGV0IFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICBsZXQgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICBsZXQgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgbGV0IFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICBsZXQgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIGxldCBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzP1xuICAgICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBKUyB2YXJpYWJsZXMsIG1pdGlnYXRpbmcgYXR0YWNrcyB0aGF0IGFidXNlIHRoZSBIVE1ML0RPTSBzcGVjIHJ1bGVzLlxuICAgICAqXG4gICAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcbiAgICAgKiAgIC0gTmFtZWQgQWNjZXNzIG9uIFdpbmRvdyAowqc3LjMuMylcbiAgICAgKiAgIC0gRE9NIFRyZWUgQWNjZXNzb3JzICjCpzMuMS41KVxuICAgICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXG4gICAgICogICAtIElmcmFtZSBzcmNkb2MgLyBOZXN0ZWQgV2luZG93UHJveGllcyAowqc0LjguNSlcbiAgICAgKiAgIC0gSFRNTENvbGxlY3Rpb24gKMKnNC4yLjEwLjIpXG4gICAgICpcbiAgICAgKiBOYW1lc3BhY2UgaXNvbGF0aW9uIGlzIGltcGxlbWVudGVkIGJ5IHByZWZpeGluZyBgaWRgIGFuZCBgbmFtZWAgYXR0cmlidXRlc1xuICAgICAqIHdpdGggYSBjb25zdGFudCBzdHJpbmcsIGkuZS4sIGB1c2VyLWNvbnRlbnQtYFxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGZhbHNlO1xuICAgIGNvbnN0IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCA9ICd1c2VyLWNvbnRlbnQtJztcblxuICAgIC8qIEtlZXAgZWxlbWVudCBjb250ZW50IHdoZW4gcmVtb3ZpbmcgZWxlbWVudD8gKi9cbiAgICBsZXQgS0VFUF9DT05URU5UID0gdHJ1ZTtcblxuICAgIC8qIElmIGEgYE5vZGVgIGlzIHBhc3NlZCB0byBzYW5pdGl6ZSgpLCB0aGVuIHBlcmZvcm1zIHNhbml0aXphdGlvbiBpbi1wbGFjZSBpbnN0ZWFkXG4gICAgICogb2YgaW1wb3J0aW5nIGl0IGludG8gYSBuZXcgRG9jdW1lbnQgYW5kIHJldHVybmluZyBhIHNhbml0aXplZCBjb3B5ICovXG4gICAgbGV0IElOX1BMQUNFID0gZmFsc2U7XG5cbiAgICAvKiBBbGxvdyB1c2FnZSBvZiBwcm9maWxlcyBsaWtlIGh0bWwsIHN2ZyBhbmQgbWF0aE1sICovXG4gICAgbGV0IFVTRV9QUk9GSUxFUyA9IHt9O1xuXG4gICAgLyogVGFncyB0byBpZ25vcmUgY29udGVudCBvZiB3aGVuIEtFRVBfQ09OVEVOVCBpcyB0cnVlICovXG4gICAgbGV0IEZPUkJJRF9DT05URU5UUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9GT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCcsICdhdWRpbycsICdjb2xncm91cCcsICdkZXNjJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGVhZCcsICdpZnJhbWUnLCAnbWF0aCcsICdtaScsICdtbicsICdtbycsICdtcycsICdtdGV4dCcsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ25vc2NyaXB0JywgJ3BsYWludGV4dCcsICdzY3JpcHQnLCAnc3R5bGUnLCAnc3ZnJywgJ3RlbXBsYXRlJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3ZpZGVvJywgJ3htcCddKTtcblxuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICAgIGxldCBEQVRBX1VSSV9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0RBVEFfVVJJX1RBR1MgPSBhZGRUb1NldCh7fSwgWydhdWRpbycsICd2aWRlbycsICdpbWcnLCAnc291cmNlJywgJ2ltYWdlJywgJ3RyYWNrJ10pO1xuXG4gICAgLyogQXR0cmlidXRlcyBzYWZlIGZvciB2YWx1ZXMgbGlrZSBcImphdmFzY3JpcHQ6XCIgKi9cbiAgICBsZXQgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncm9sZScsICdzdW1tYXJ5JywgJ3RpdGxlJywgJ3ZhbHVlJywgJ3N0eWxlJywgJ3htbG5zJ10pO1xuICAgIGNvbnN0IE1BVEhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XG4gICAgY29uc3QgU1ZHX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgY29uc3QgSFRNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG4gICAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXG4gICAgbGV0IE5BTUVTUEFDRSA9IEhUTUxfTkFNRVNQQUNFO1xuICAgIGxldCBJU19FTVBUWV9JTlBVVCA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3dlZCBYSFRNTCtYTUwgbmFtZXNwYWNlcyAqL1xuICAgIGxldCBBTExPV0VEX05BTUVTUEFDRVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTID0gYWRkVG9TZXQoe30sIFtNQVRITUxfTkFNRVNQQUNFLCBTVkdfTkFNRVNQQUNFLCBIVE1MX05BTUVTUEFDRV0sIHN0cmluZ1RvU3RyaW5nKTtcblxuICAgIC8qIFBhcnNpbmcgb2Ygc3RyaWN0IFhIVE1MIGRvY3VtZW50cyAqL1xuICAgIGxldCBQQVJTRVJfTUVESUFfVFlQRSA9IG51bGw7XG4gICAgY29uc3QgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyA9IFsnYXBwbGljYXRpb24veGh0bWwreG1sJywgJ3RleHQvaHRtbCddO1xuICAgIGNvbnN0IERFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUgPSAndGV4dC9odG1sJztcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBudWxsO1xuXG4gICAgLyogS2VlcCBhIHJlZmVyZW5jZSB0byBjb25maWcgdG8gcGFzcyB0byBob29rcyAqL1xuICAgIGxldCBDT05GSUcgPSBudWxsO1xuXG4gICAgLyogSWRlYWxseSwgZG8gbm90IHRvdWNoIGFueXRoaW5nIGJlbG93IHRoaXMgbGluZSAqL1xuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGNvbnN0IGlzUmVnZXhPckZ1bmN0aW9uID0gZnVuY3Rpb24gaXNSZWdleE9yRnVuY3Rpb24odGVzdFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGVzdFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHRlc3RWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfcGFyc2VDb25maWcgPSBmdW5jdGlvbiBfcGFyc2VDb25maWcoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIGlmIChDT05GSUcgJiYgQ09ORklHID09PSBjZmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSB0YW1wZXJpbmcgKi9cbiAgICAgIGlmICghY2ZnIHx8IHR5cGVvZiBjZmcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNmZyA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXG4gICAgICBjZmcgPSBjbG9uZShjZmcpO1xuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTLmluZGV4T2YoY2ZnLlBBUlNFUl9NRURJQV9UWVBFKSA9PT0gLTEgPyBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogY2ZnLlBBUlNFUl9NRURJQV9UWVBFO1xuXG4gICAgICAvLyBIVE1MIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgYXJlIG5vdCBjYXNlLXNlbnNpdGl2ZSwgY29udmVydGluZyB0byBsb3dlcmNhc2UuIEtlZXBpbmcgWEhUTUwgYXMgaXMuXG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyA9IFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyA/IHN0cmluZ1RvU3RyaW5nIDogc3RyaW5nVG9Mb3dlckNhc2U7XG5cbiAgICAgIC8qIFNldCBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIEFMTE9XRURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfVEFHUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9UQUdTO1xuICAgICAgQUxMT1dFRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9BVFRSJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX0FUVFI7XG4gICAgICBBTExPV0VEX05BTUVTUEFDRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX05BTUVTUEFDRVMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9OQU1FU1BBQ0VTLCBzdHJpbmdUb1N0cmluZykgOiBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUztcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfVVJJX1NBRkVfQVRUUicpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX1VSSV9TQUZFX0FUVFIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTO1xuICAgICAgREFUQV9VUklfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9EQVRBX1VSSV9UQUdTJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfREFUQV9VUklfVEFHUyxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgICBGT1JCSURfQ09OVEVOVFMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQ09OVEVOVFMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICAgIEZPUkJJRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgRk9SQklEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XG4gICAgICBVU0VfUFJPRklMRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdVU0VfUFJPRklMRVMnKSA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSBjZmcuQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBjZmcuUkVUVVJOX1RSVVNURURfVFlQRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgRk9SQ0VfQk9EWSA9IGNmZy5GT1JDRV9CT0RZIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQU5JVElaRV9ET00gPSBjZmcuU0FOSVRJWkVfRE9NICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGNmZy5TQU5JVElaRV9OQU1FRF9QUk9QUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJDEgPSBjZmcuQUxMT1dFRF9VUklfUkVHRVhQIHx8IElTX0FMTE9XRURfVVJJO1xuICAgICAgTkFNRVNQQUNFID0gY2ZnLk5BTUVTUEFDRSB8fCBIVE1MX05BTUVTUEFDRTtcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM7XG4gICAgICB9XG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFBhcnNlIHByb2ZpbGUgaW5mbyAqL1xuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xuICAgICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgdGV4dCk7XG4gICAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLmh0bWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGh0bWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBodG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmdGaWx0ZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmdGaWx0ZXJzKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgY2ZnLkFERF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgIGlmIChGT1JCSURfQ09OVEVOVFMgPT09IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgICAgRk9SQklEX0NPTlRFTlRTID0gY2xvbmUoRk9SQklEX0NPTlRFTlRTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChGT1JCSURfQ09OVEVOVFMsIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkICN0ZXh0IGluIGNhc2UgS0VFUF9DT05URU5UIGlzIHNldCB0byB0cnVlICovXG4gICAgICBpZiAoS0VFUF9DT05URU5UKSB7XG4gICAgICAgIEFMTE9XRURfVEFHU1snI3RleHQnXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsnaHRtbCcsICdoZWFkJywgJ2JvZHknXSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCB0Ym9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSB0YWJsZXMgYXJlIHBlcm1pdHRlZCwgc2VlICMyODYsICMzNjUgKi9cbiAgICAgIGlmIChBTExPV0VEX1RBR1MudGFibGUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ3Rib2R5J10pO1xuICAgICAgICBkZWxldGUgRk9SQklEX1RBR1MudGJvZHk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZUhUTUwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlSFRNTFwiIGhvb2suJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlU2NyaXB0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZVNjcmlwdFVSTFwiIGhvb2suJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdmVyd3JpdGUgZXhpc3RpbmcgVHJ1c3RlZFR5cGVzIHBvbGljeS5cbiAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZO1xuXG4gICAgICAgIC8vIFNpZ24gbG9jYWwgdmFyaWFibGVzIHJlcXVpcmVkIGJ5IGBzYW5pdGl6ZWAuXG4gICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVuaW5pdGlhbGl6ZWQgcG9saWN5LCBhdHRlbXB0IHRvIGluaXRpYWxpemUgdGhlIGludGVybmFsIGRvbXB1cmlmeSBwb2xpY3kuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBjdXJyZW50U2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGNyZWF0aW5nIHRoZSBpbnRlcm5hbCBwb2xpY3kgc3VjY2VlZGVkIHNpZ24gaW50ZXJuYWwgdmFyaWFibGVzLlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ICE9PSBudWxsICYmIHR5cGVvZiBlbXB0eUhUTUwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAgIC8vIE5vdCBhdmFpbGFibGUgaW4gSUU4LCBTYWZhcmkgNSwgZXRjLlxuICAgICAgaWYgKGZyZWV6ZSkge1xuICAgICAgICBmcmVlemUoY2ZnKTtcbiAgICAgIH1cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuICAgIGNvbnN0IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ21pJywgJ21vJywgJ21uJywgJ21zJywgJ210ZXh0J10pO1xuICAgIGNvbnN0IEhUTUxfSU5URUdSQVRJT05fUE9JTlRTID0gYWRkVG9TZXQoe30sIFsnZm9yZWlnbm9iamVjdCcsICdkZXNjJywgJ3RpdGxlJywgJ2Fubm90YXRpb24teG1sJ10pO1xuXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBhcmUgYWxsb3dlZCBpbiBib3RoIFNWRyBhbmQgSFRNTFxuICAgIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxuICAgIC8vIHNvIHRoYXQgdGhleSBkb24ndCBnZXQgZXJyb25lb3VzbHkgZGVsZXRlZCBmcm9tXG4gICAgLy8gSFRNTCBuYW1lc3BhY2UuXG4gICAgY29uc3QgQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyA9IGFkZFRvU2V0KHt9LCBbJ3RpdGxlJywgJ3N0eWxlJywgJ2ZvbnQnLCAnYScsICdzY3JpcHQnXSk7XG5cbiAgICAvKiBLZWVwIHRyYWNrIG9mIGFsbCBwb3NzaWJsZSBTVkcgYW5kIE1hdGhNTCB0YWdzXG4gICAgICogc28gdGhhdCB3ZSBjYW4gcGVyZm9ybSB0aGUgbmFtZXNwYWNlIGNoZWNrc1xuICAgICAqIGNvcnJlY3RseS4gKi9cbiAgICBjb25zdCBBTExfU1ZHX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5zdmdEaXNhbGxvd2VkXSk7XG4gICAgY29uc3QgQUxMX01BVEhNTF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5tYXRoTWwkMSwgLi4ubWF0aE1sRGlzYWxsb3dlZF0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBhIERPTSBlbGVtZW50IHdob3NlIG5hbWVzcGFjZSBpcyBiZWluZyBjaGVja2VkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgICAqICBuYW1lc3BhY2UgdGhhdCBhIHNwZWMtY29tcGxpYW50IHBhcnNlciB3b3VsZCBuZXZlclxuICAgICAqICByZXR1cm4uIFJldHVybiB0cnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgICAvLyBJbiBKU0RPTSwgaWYgd2UncmUgaW5zaWRlIHNoYWRvdyBET00sIHRoZW4gcGFyZW50Tm9kZVxuICAgICAgLy8gY2FuIGJlIG51bGwuIFdlIGp1c3Qgc2ltdWxhdGUgcGFyZW50IGluIHRoaXMgY2FzZS5cbiAgICAgIGlmICghcGFyZW50IHx8ICFwYXJlbnQudGFnTmFtZSkge1xuICAgICAgICBwYXJlbnQgPSB7XG4gICAgICAgICAgbmFtZXNwYWNlVVJJOiBOQU1FU1BBQ0UsXG4gICAgICAgICAgdGFnTmFtZTogJ3RlbXBsYXRlJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY29uc3QgdGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKGVsZW1lbnQudGFnTmFtZSk7XG4gICAgICBjb25zdCBwYXJlbnRUYWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UocGFyZW50LnRhZ05hbWUpO1xuICAgICAgaWYgKCFBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gU1ZHXG4gICAgICAgIC8vIGlzIHZpYSA8c3ZnPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2Zyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gTWF0aE1MIHRvIFNWRyBpcyB2aWFgXG4gICAgICAgIC8vIHN2ZyBpZiBwYXJlbnQgaXMgZWl0aGVyIDxhbm5vdGF0aW9uLXhtbD4gb3IgTWF0aE1MXG4gICAgICAgIC8vIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJyAmJiAocGFyZW50VGFnTmFtZSA9PT0gJ2Fubm90YXRpb24teG1sJyB8fCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIFNWR1xuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIFNWRyBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIE1hdGhNTFxuICAgICAgICAvLyBpcyB2aWEgPG1hdGg+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIE1hdGhNTCBpcyB2aWFcbiAgICAgICAgLy8gPG1hdGg+IGFuZCBIVE1MIGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCcgJiYgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gTWF0aE1MXG4gICAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gTWF0aE1MIG5hbWVzcGFjZS5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBIVE1MIGlzIHZpYVxuICAgICAgICAvLyBIVE1MIGludGVncmF0aW9uIHBvaW50cywgYW5kIGZyb20gTWF0aE1MIHRvIEhUTUxcbiAgICAgICAgLy8gaXMgdmlhIE1hdGhNTCB0ZXh0IGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSAmJiAhSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UgJiYgIU1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGRpc2FsbG93IHRhZ3MgdGhhdCBhcmUgc3BlY2lmaWMgZm9yIE1hdGhNTFxuICAgICAgICAvLyBvciBTVkcgYW5kIHNob3VsZCBuZXZlciBhcHBlYXIgaW4gSFRNTCBuYW1lc3BhY2VcbiAgICAgICAgcmV0dXJuICFBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0gJiYgKENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFNbdGFnTmFtZV0gfHwgIUFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBYSFRNTCBhbmQgWE1MIGRvY3VtZW50cyB0aGF0IHN1cHBvcnQgY3VzdG9tIG5hbWVzcGFjZXNcbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvZGUgc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXMgcGxhY2UgKHRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgc29tZWhvdyBnb3QgbmFtZXNwYWNlIHRoYXQgaXMgbm90XG4gICAgICAvLyBIVE1MLCBTVkcsIE1hdGhNTCBvciBhbGxvd2VkIHZpYSBBTExPV0VEX05BTUVTUEFDRVMpLlxuICAgICAgLy8gUmV0dXJuIGZhbHNlIGp1c3QgaW4gY2FzZS5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2ZvcmNlUmVtb3ZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfZm9yY2VSZW1vdmUgPSBmdW5jdGlvbiBfZm9yY2VSZW1vdmUobm9kZSkge1xuICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgIGVsZW1lbnQ6IG5vZGVcbiAgICAgIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLXJlbW92ZVxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIG5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbnVsbCxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICAgIC8vIFdlIHZvaWQgYXR0cmlidXRlIHZhbHVlcyBmb3IgdW5yZW1vdmFibGUgXCJpc1wiXCIgYXR0cmlidXRlc1xuICAgICAgaWYgKG5hbWUgPT09ICdpcycgJiYgIUFMTE9XRURfQVRUUltuYW1lXSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTSB8fCBSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF9mb3JjZVJlbW92ZShub2RlKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaW5pdERvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGRpcnR5IGEgc3RyaW5nIG9mIGRpcnR5IG1hcmt1cFxuICAgICAqIEByZXR1cm4ge0RvY3VtZW50fSBhIERPTSwgZmlsbGVkIHdpdGggdGhlIGRpcnR5IG1hcmt1cFxuICAgICAqL1xuICAgIGNvbnN0IF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICBsZXQgZG9jID0gbnVsbDtcbiAgICAgIGxldCBsZWFkaW5nV2hpdGVzcGFjZSA9IG51bGw7XG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gc3RyaW5nTWF0Y2goZGlydHksIC9eW1xcclxcblxcdCBdKy8pO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXTtcbiAgICAgIH1cbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBSb290IG9mIFhIVE1MIGRvYyBtdXN0IGNvbnRhaW4geG1sbnMgZGVjbGFyYXRpb24gKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIveGh0bWwxL25vcm1hdGl2ZS5odG1sI3N0cmljdClcbiAgICAgICAgZGlydHkgPSAnPGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+PGhlYWQ+PC9oZWFkPjxib2R5PicgKyBkaXJ0eSArICc8L2JvZHk+PC9odG1sPic7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qXG4gICAgICAgKiBVc2UgdGhlIERPTVBhcnNlciBBUEkgYnkgZGVmYXVsdCwgZmFsbGJhY2sgbGF0ZXIgaWYgbmVlZHMgYmVcbiAgICAgICAqIERPTVBhcnNlciBub3Qgd29yayBmb3Igc3ZnIHdoZW4gaGFzIG11bHRpcGxlIHJvb3QgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgUEFSU0VSX01FRElBX1RZUEUpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBVc2UgY3JlYXRlSFRNTERvY3VtZW50IGluIGNhc2UgRE9NUGFyc2VyIGlzIG5vdCBhdmFpbGFibGUgKi9cbiAgICAgIGlmICghZG9jIHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGRvYyA9IGltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KE5BTUVTUEFDRSwgJ3RlbXBsYXRlJywgbnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBJU19FTVBUWV9JTlBVVCA/IGVtcHR5SFRNTCA6IGRpcnR5UGF5bG9hZDtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIC8vIFN5bnRheCBlcnJvciBpZiBkaXJ0eVBheWxvYWQgaXMgaW52YWxpZCB4bWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLCBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gV0hPTEVfRE9DVU1FTlQgPyBkb2MuZG9jdW1lbnRFbGVtZW50IDogYm9keTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE5vZGVJdGVyYXRvciBvYmplY3QgdGhhdCB5b3UgY2FuIHVzZSB0byB0cmF2ZXJzZSBmaWx0ZXJlZCBsaXN0cyBvZiBub2RlcyBvciBlbGVtZW50cyBpbiBhIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IG9yIG5vZGUgdG8gc3RhcnQgdHJhdmVyc2luZyBvbi5cbiAgICAgKiBAcmV0dXJuIHtOb2RlSXRlcmF0b3J9IFRoZSBjcmVhdGVkIE5vZGVJdGVyYXRvclxuICAgICAqL1xuICAgIGNvbnN0IF9jcmVhdGVOb2RlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChyb290Lm93bmVyRG9jdW1lbnQgfHwgcm9vdCwgcm9vdCxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNDbG9iYmVyZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGVsbSBlbGVtZW50IHRvIGNoZWNrIGZvciBjbG9iYmVyaW5nIGF0dGFja3NcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Nsb2JiZXJlZCA9IGZ1bmN0aW9uIF9pc0Nsb2JiZXJlZChlbG0pIHtcbiAgICAgIHJldHVybiBlbG0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgJiYgKHR5cGVvZiBlbG0ubm9kZU5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQ2hpbGQgIT09ICdmdW5jdGlvbicgfHwgIShlbG0uYXR0cmlidXRlcyBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCkgfHwgdHlwZW9mIGVsbS5yZW1vdmVBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5zZXRBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5uYW1lc3BhY2VVUkkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0uaW5zZXJ0QmVmb3JlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uaGFzQ2hpbGROb2RlcyAhPT0gJ2Z1bmN0aW9uJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBET00gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG9iamVjdCBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2lzTm9kZSA9IGZ1bmN0aW9uIF9pc05vZGUob2JqZWN0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIE5vZGUgPT09ICdmdW5jdGlvbicgJiYgb2JqZWN0IGluc3RhbmNlb2YgTm9kZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2V4ZWN1dGVIb29rXG4gICAgICogRXhlY3V0ZSB1c2VyIGNvbmZpZ3VyYWJsZSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSBub2RlIHRvIHdvcmsgb24gd2l0aCB0aGUgaG9va1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGhvb2sgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGNvbnN0IF9leGVjdXRlSG9vayA9IGZ1bmN0aW9uIF9leGVjdXRlSG9vayhlbnRyeVBvaW50LCBjdXJyZW50Tm9kZSwgZGF0YSkge1xuICAgICAgaWYgKCFob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcnJheUZvckVhY2goaG9va3NbZW50cnlQb2ludF0sIGhvb2sgPT4ge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSB7XG4gICAgICBsZXQgY29udGVudCA9IG51bGw7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBOb3cgbGV0J3MgY2hlY2sgdGhlIGVsZW1lbnQncyB0eXBlIGFuZCBuYW1lICovXG4gICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG4gICAgICBpZiAoY3VycmVudE5vZGUuaGFzQ2hpbGROb2RlcygpICYmICFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBlbGVtZW50IGlmIGFueXRoaW5nIGZvcmJpZHMgaXRzIHByZXNlbmNlICovXG4gICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGEgY3VzdG9tIGVsZW1lbnQgdG8gaGFuZGxlICovXG4gICAgICAgIGlmICghRk9SQklEX1RBR1NbdGFnTmFtZV0gJiYgX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpKSB7XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh0YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEtlZXAgY29udGVudCBleGNlcHQgZm9yIGJhZC1saXN0ZWQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKEtFRVBfQ09OVEVOVCAmJiAhRk9SQklEX0NPTlRFTlRTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IGdldENoaWxkTm9kZXMoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICAgICAgaWYgKGNoaWxkTm9kZXMgJiYgcGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb3VudCA9IGNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNoaWxkQ291bnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUoY2hpbGROb2Rlc1tpXSwgdHJ1ZSksIGdldE5leHRTaWJsaW5nKGN1cnJlbnROb2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3aGV0aGVyIGVsZW1lbnQgaGFzIGEgdmFsaWQgbmFtZXNwYWNlICovXG4gICAgICBpZiAoY3VycmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmICFfY2hlY2tWYWxpZE5hbWVzcGFjZShjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE1ha2Ugc3VyZSB0aGF0IG9sZGVyIGJyb3dzZXJzIGRvbid0IGdldCBmYWxsYmFjay10YWcgbVhTUyAqL1xuICAgICAgaWYgKCh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8IHRhZ05hbWUgPT09ICdub2VtYmVkJyB8fCB0YWdOYW1lID09PSAnbm9mcmFtZXMnKSAmJiByZWdFeHBUZXN0KC88XFwvbm8oc2NyaXB0fGVtYmVkfGZyYW1lcykvaSwgY3VycmVudE5vZGUuaW5uZXJIVE1MKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZWxlbWVudCBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLyogR2V0IHRoZSBlbGVtZW50J3MgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBleHByLCAnICcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnRleHRDb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgICBlbGVtZW50OiBjdXJyZW50Tm9kZS5jbG9uZU5vZGUoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnJlbnROb2RlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIGNvbnN0IF9pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpIHtcbiAgICAgIC8qIE1ha2Ugc3VyZSBhdHRyaWJ1dGUgY2Fubm90IGNsb2JiZXIgKi9cbiAgICAgIGlmIChTQU5JVElaRV9ET00gJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykgJiYgKHZhbHVlIGluIGRvY3VtZW50IHx8IHZhbHVlIGluIGZvcm1FbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcbiAgICAgICAgICBYTUwtY29tcGF0aWJsZSAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN4bWwtY29tcGF0aWJsZSBhbmQgaHR0cDovL3d3dy53My5vcmcvVFIveG1sLyNkMGU4MDQpXG4gICAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuICAgICAgaWYgKEFMTE9XX0RBVEFfQVRUUiAmJiAhRk9SQklEX0FUVFJbbGNOYW1lXSAmJiByZWdFeHBUZXN0KERBVEFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoIUFMTE9XRURfQVRUUltsY05hbWVdIHx8IEZPUkJJRF9BVFRSW2xjTmFtZV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBGaXJzdCBjb25kaXRpb24gZG9lcyBhIHZlcnkgYmFzaWMgY2hlY2sgaWYgYSkgaXQncyBiYXNpY2FsbHkgYSB2YWxpZCBjdXN0b20gZWxlbWVudCB0YWduYW1lIEFORFxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAvLyBhbmQgYykgaWYgdGhlIGF0dHJpYnV0ZSBuYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrXG4gICAgICAgIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudChsY1RhZykgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgbGNUYWcpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayhsY1RhZykpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2ssIGxjTmFtZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKGxjTmFtZSkpIHx8XG4gICAgICAgIC8vIEFsdGVybmF0aXZlLCBzZWNvbmQgY29uZGl0aW9uIGNoZWNrcyBpZiBpdCdzIGFuIGBpc2AtYXR0cmlidXRlLCBBTkRcbiAgICAgICAgLy8gdGhlIHZhbHVlIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIGxjTmFtZSA9PT0gJ2lzJyAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdmFsdWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh2YWx1ZSkpKSA7IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBDaGVjayB2YWx1ZSBpcyBzYWZlLiBGaXJzdCwgaXMgYXR0ciBpbmVydD8gSWYgc28sIGlzIHNhZmUgKi9cbiAgICAgIH0gZWxzZSBpZiAoVVJJX1NBRkVfQVRUUklCVVRFU1tsY05hbWVdKSA7IGVsc2UgaWYgKHJlZ0V4cFRlc3QoSVNfQUxMT1dFRF9VUkkkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpKSA7IGVsc2UgaWYgKChsY05hbWUgPT09ICdzcmMnIHx8IGxjTmFtZSA9PT0gJ3hsaW5rOmhyZWYnIHx8IGxjTmFtZSA9PT0gJ2hyZWYnKSAmJiBsY1RhZyAhPT0gJ3NjcmlwdCcgJiYgc3RyaW5nSW5kZXhPZih2YWx1ZSwgJ2RhdGE6JykgPT09IDAgJiYgREFUQV9VUklfVEFHU1tsY1RhZ10pIDsgZWxzZSBpZiAoQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgJiYgIXJlZ0V4cFRlc3QoSVNfU0NSSVBUX09SX0RBVEEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudFxuICAgICAqIGNoZWNrcyBpZiBhdCBsZWFzdCBvbmUgZGFzaCBpcyBpbmNsdWRlZCBpbiB0YWdOYW1lLCBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGNoYXJcbiAgICAgKiBmb3IgbW9yZSBzb3BoaXN0aWNhdGVkIGNoZWNraW5nIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3ZhbGlkYXRlLWVsZW1lbnQtbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgbmFtZSBvZiB0aGUgdGFnIG9mIHRoZSBub2RlIHRvIHNhbml0aXplXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIG5hbWUgbWVldHMgdGhlIGJhc2ljIGNyaXRlcmlhIGZvciBhIGN1c3RvbSBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgY29uc3QgX2lzQmFzaWNDdXN0b21FbGVtZW50ID0gZnVuY3Rpb24gX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiB0YWdOYW1lICE9PSAnYW5ub3RhdGlvbi14bWwnICYmIHRhZ05hbWUuaW5kZXhPZignLScpID4gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXR0cmlidXRlc1xuICAgICAgfSA9IGN1cnJlbnROb2RlO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG4gICAgICBpZiAoIWF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaG9va0V2ZW50ID0ge1xuICAgICAgICBhdHRyTmFtZTogJycsXG4gICAgICAgIGF0dHJWYWx1ZTogJycsXG4gICAgICAgIGtlZXBBdHRyOiB0cnVlLFxuICAgICAgICBhbGxvd2VkQXR0cmlidXRlczogQUxMT1dFRF9BVFRSXG4gICAgICB9O1xuICAgICAgbGV0IGwgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcblxuICAgICAgLyogR28gYmFja3dhcmRzIG92ZXIgYWxsIGF0dHJpYnV0ZXM7IHNhZmVseSByZW1vdmUgYmFkIG9uZXMgKi9cbiAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIG5hbWVzcGFjZVVSSSxcbiAgICAgICAgICB2YWx1ZTogYXR0clZhbHVlXG4gICAgICAgIH0gPSBhdHRyO1xuICAgICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhuYW1lKTtcbiAgICAgICAgbGV0IHZhbHVlID0gbmFtZSA9PT0gJ3ZhbHVlJyA/IGF0dHJWYWx1ZSA6IHN0cmluZ1RyaW0oYXR0clZhbHVlKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmICghQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICYmIHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSBhdHRyaWJ1dGUgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBleHByLCAnICcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSXMgYHZhbHVlYCB2YWxpZCBmb3IgdGhpcyBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGNvbnN0IGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuICAgICAgICBpZiAoIV9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICAgKiBQcmVmaXggaWQgYW5kIG5hbWUgYXR0cmlidXRlcyB3aXRoIGB1c2VyLWNvbnRlbnQtYFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKFNBTklUSVpFX05BTUVEX1BST1BTICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGlzIHZhbHVlXG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAvLyBQcmVmaXggdGhlIHZhbHVlIGFuZCBsYXRlciByZS1jcmVhdGUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW5pdGl6ZWQgdmFsdWVcbiAgICAgICAgICB2YWx1ZSA9IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCArIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlIFRydXN0ZWQgVHlwZXMgKi9cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSA7IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZShsY1RhZywgbGNOYW1lKSkge1xuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkSFRNTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRTY3JpcHRVUkwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZVNjcmlwdFVSTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGludmFsaWQgZGF0YS0qIGF0dHJpYnV0ZSBzZXQgYnkgdHJ5LWNhdGNoaW5nIGl0ICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIEZhbGxiYWNrIHRvIHNldEF0dHJpYnV0ZSgpIGZvciBicm93c2VyLXVucmVjb2duaXplZCBuYW1lc3BhY2VzIGUuZy4gXCJ4LXNjaGVtYVwiLiAqL1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZVNoYWRvd0RPTSA9IGZ1bmN0aW9uIF9zYW5pdGl6ZVNoYWRvd0RPTShmcmFnbWVudCkge1xuICAgICAgbGV0IHNoYWRvd05vZGUgPSBudWxsO1xuICAgICAgY29uc3Qgc2hhZG93SXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICAgIHdoaWxlIChzaGFkb3dOb2RlID0gc2hhZG93SXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplU2hhZG93Tm9kZScsIHNoYWRvd05vZGUsIG51bGwpO1xuXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhzaGFkb3dOb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRGVlcCBzaGFkb3cgRE9NIGRldGVjdGVkICovXG4gICAgICAgIGlmIChzaGFkb3dOb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKHNoYWRvd05vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhzaGFkb3dOb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTYW5pdGl6ZVxuICAgICAqIFB1YmxpYyBtZXRob2QgcHJvdmlkaW5nIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlfSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5KSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGxldCBib2R5ID0gbnVsbDtcbiAgICAgIGxldCBpbXBvcnRlZE5vZGUgPSBudWxsO1xuICAgICAgbGV0IGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgIGxldCByZXR1cm5Ob2RlID0gbnVsbDtcbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXG4gICAgICAgIHRoZSB1c2VyIGhhcyByZXF1ZXN0ZWQgYSBET00gb2JqZWN0IHJhdGhlciB0aGFuIGEgc3RyaW5nICovXG4gICAgICBJU19FTVBUWV9JTlBVVCA9ICFkaXJ0eTtcbiAgICAgIGlmIChJU19FTVBUWV9JTlBVVCkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGlydHkgPSBkaXJ0eS50b1N0cmluZygpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ2RpcnR5IGlzIG5vdCBhIHN0cmluZywgYWJvcnRpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCd0b1N0cmluZyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBkaXJ0eSBIVE1MIGlmIERPTVB1cmlmeSBjYW5ub3QgcnVuICovXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFzc2lnbiBjb25maWcgdmFycyAqL1xuICAgICAgaWYgKCFTRVRfQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgfVxuXG4gICAgICAvKiBDbGVhbiB1cCByZW1vdmVkIGVsZW1lbnRzICovXG4gICAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gICAgICAvKiBDaGVjayBpZiBkaXJ0eSBpcyBjb3JyZWN0bHkgdHlwZWQgZm9yIElOX1BMQUNFICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIC8qIERvIHNvbWUgZWFybHkgcHJlLXNhbml0aXphdGlvbiB0byBhdm9pZCB1bnNhZmUgcm9vdCBub2RlcyAqL1xuICAgICAgICBpZiAoZGlydHkubm9kZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZGlydHkubm9kZU5hbWUpO1xuICAgICAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3Jvb3Qgbm9kZSBpcyBmb3JiaWRkZW4gYW5kIGNhbm5vdCBiZSBzYW5pdGl6ZWQgaW4tcGxhY2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlydHkgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxuICAgICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KCc8IS0tLS0+Jyk7XG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgIC8qIE5vZGUgaXMgYWxyZWFkeSBhIGJvZHksIHVzZSBhcyBpcyAqL1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogUkVUVVJOX1RSVVNURURfVFlQRSA/IGVtcHR5SFRNTCA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgY29uc3Qgbm9kZUl0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2hhZG93IERPTSBkZXRlY3RlZCwgc2FuaXRpemUgaXQgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKGN1cnJlbnROb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoY3VycmVudE5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBJZiB3ZSBzYW5pdGl6ZWQgYGRpcnR5YCBpbi1wbGFjZSwgcmV0dXJuIGl0LiAqL1xuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIHNhbml0aXplZCBzdHJpbmcgb3IgRE9NICovXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBjcmVhdGVEb2N1bWVudEZyYWdtZW50LmNhbGwoYm9keS5vd25lckRvY3VtZW50KTtcbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgICByZXR1cm5Ob2RlLmFwcGVuZENoaWxkKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIuc2hhZG93cm9vdCB8fCBBTExPV0VEX0FUVFIuc2hhZG93cm9vdG1vZGUpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybk5vZGU7XG4gICAgICB9XG4gICAgICBsZXQgc2VyaWFsaXplZEhUTUwgPSBXSE9MRV9ET0NVTUVOVCA/IGJvZHkub3V0ZXJIVE1MIDogYm9keS5pbm5lckhUTUw7XG5cbiAgICAgIC8qIFNlcmlhbGl6ZSBkb2N0eXBlIGlmIGFsbG93ZWQgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCAmJiBBTExPV0VEX1RBR1NbJyFkb2N0eXBlJ10gJiYgYm9keS5vd25lckRvY3VtZW50ICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgJiYgcmVnRXhwVGVzdChET0NUWVBFX05BTUUsIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gJzwhRE9DVFlQRSAnICsgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSArICc+XFxuJyArIHNlcmlhbGl6ZWRIVE1MO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChzZXJpYWxpemVkSFRNTCkgOiBzZXJpYWxpemVkSFRNTDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBzZXQgdGhlIGNvbmZpZ3VyYXRpb24gb25jZVxuICAgICAqIHNldENvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS5zZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XG4gICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZEhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGFkZCBET01QdXJpZnkgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rRnVuY3Rpb24gZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5hZGRIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQsIGhvb2tGdW5jdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBob29rRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmVtb3ZlZChwb3BwZWQpIGhvb2tcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9va3MgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2tzID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICBob29rc1tlbnRyeVBvaW50XSA9IFtdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVBbGxIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3NcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IHt9O1xuICAgIH07XG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuICB2YXIgcHVyaWZ5ID0gY3JlYXRlRE9NUHVyaWZ5KCk7XG5cbiAgcmV0dXJuIHB1cmlmeTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVyaWZ5LmpzLm1hcFxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zLmpzJztcclxuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2RlZmF1bHRDb21tYW5kcy5qcyc7XHJcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuL3BsdWdpbk1hbmFnZXInO1xyXG5pbXBvcnQgeyBSYW5nZUhlbHBlciB9IGZyb20gJy4vcmFuZ2VIZWxwZXInO1xyXG5pbXBvcnQgdGVtcGxhdGVzIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2Jyb3dzZXIuanMnO1xyXG5pbXBvcnQgKiBhcyBlbW90aWNvbnMgZnJvbSAnLi9lbW90aWNvbnMuanMnO1xyXG5pbXBvcnQgRE9NUHVyaWZ5IGZyb20gJ2RvbXB1cmlmeSc7XHJcblxyXG52YXIgZ2xvYmFsV2luID0gd2luZG93O1xyXG52YXIgZ2xvYmFsRG9jID0gZG9jdW1lbnQ7XHJcblxyXG52YXIgSU1BR0VfTUlNRV9SRUdFWCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblxyXG4vKipcclxuICogV3JhcCBpbmxpbmVzIHRoYXQgYXJlIGluIHRoZSByb290IGluIHBhcmFncmFwaHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcElubGluZXMoYm9keTogSFRNTEJvZHlFbGVtZW50LCBkb2M6IERvY3VtZW50KSB7XHJcblx0bGV0IHdyYXBwZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRkb20udHJhdmVyc2UoYm9keSwgZnVuY3Rpb24gKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRpZiAoZG9tLmlzSW5saW5lKG5vZGUsIHRydWUpKSB7XHJcblx0XHRcdC8vIElnbm9yZSB0ZXh0IG5vZGVzIHVubGVzcyB0aGV5IGNvbnRhaW4gbm9uLXdoaXRlc3BhY2UgY2hhcnMgYXNcclxuXHRcdFx0Ly8gd2hpdGVzcGFjZSB3aWxsIGJlIGNvbGxhcHNlZC5cclxuXHRcdFx0Ly8gSWdub3JlIGVtbGVkaXRvci1pZ25vcmUgZWxlbWVudHMgdW5sZXNzIHdyYXBwaW5nIHNpYmxpbmdzXHJcblx0XHRcdC8vIFNob3VsZCBzdGlsbCB3cmFwIGJvdGggaWYgd3JhcHBpbmcgc2libGluZ3MuXHJcblx0XHRcdGlmICh3cmFwcGVyIHx8IG5vZGUubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgP1xyXG5cdFx0XHRcdC9cXFMvLnRlc3Qobm9kZS5ub2RlVmFsdWUpIDogIWRvbS5pcyhub2RlLCAnLmVtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdGlmICghd3JhcHBlcikge1xyXG5cdFx0XHRcdFx0d3JhcHBlciA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XHJcblx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIG5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHdyYXBwZXIsIG5vZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR3cmFwcGVyID0gbnVsbDtcclxuXHRcdH1cclxuXHR9LCBmYWxzZSwgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbWxFZGl0b3IgLSBBIGxpZ2h0d2VpZ2h0IFdZU0lXWUcgZWRpdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTFRleHRBcmVhRWxlbWVudH0gdGV4dGFyZWEgVGhlIHRleHRhcmVhIHRvIGJlIGNvbnZlcnRlZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlck9wdGlvbnNcclxuICogQGNsYXNzIEVtbEVkaXRvclxyXG4gKiBAbmFtZSBFbWxFZGl0b3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtbEVkaXRvciB7XHJcblxyXG5cdGNvbW1hbmRzOiBhbnk7XHJcblx0b3B0czogYW55O1xyXG5cdHRvZ2dsZVNvdXJjZU1vZGU6ICgpID0+IHZvaWQ7XHJcblx0bG9uZ2VzdEVtb3RpY29uQ29kZTogbnVtYmVyO1xyXG5cdGluU291cmNlTW9kZTogKCkgPT4gYm9vbGVhbjtcclxuXHRibHVyOiAoaGFuZGxlcj86IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5Zz86IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0c2V0V3lzaXd5Z0VkaXRvclZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuXHRzZXRTb3VyY2VFZGl0b3JWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcblx0dXBkYXRlT3JpZ2luYWw6ICgpID0+IHZvaWQ7XHJcblx0Z2V0U291cmNlRWRpdG9yVmFsdWU6IChmaWx0ZXI/OiBib29sZWFuKSA9PiBzdHJpbmc7XHJcblx0ZGltZW5zaW9uczogKHdpZHRoPzogYW55LCBoZWlnaHQ/OiBhbnksIHNhdmU/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0cmVhZE9ubHk6IChyZWFkT25seT86IGFueSkgPT4gYW55O1xyXG5cdGZvY3VzOiAoaGFuZGxlcj86IGFueSwgZXhjbHVkZVd5c2l3eWc/OiBib29sZWFuLCBleGNsdWRlU291cmNlPzogYm9vbGVhbikgPT4gYW55O1xyXG5cdHZhbDogKHZhbD86IHN0cmluZywgZmlsdGVyPzogYm9vbGVhbikgPT4gYW55O1xyXG5cdGV4cGFuZFRvQ29udGVudDogKGlnbm9yZU1heEhlaWdodDogYm9vbGVhbikgPT4gdm9pZDtcclxuXHRydGw6IChydGw/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0ZW1vdGljb25zOiAoZW5hYmxlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0c291cmNlTW9kZTogKGVuYWJsZT86IGJvb2xlYW4pID0+IGFueTtcclxuXHR3aWR0aDogKHdpZHRoPzogbnVtYmVyLCBzYXZlV2lkdGg/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0aGVpZ2h0OiAoaGVpZ2h0PzogbnVtYmVyLCBzYXZlSGVpZ2h0PzogYm9vbGVhbikgPT4gYW55O1xyXG5cdGNyZWF0ZURyb3BEb3duOiAobWVudUl0ZW06IEhUTUxFbGVtZW50LCBuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IEhUTUxFbGVtZW50KSA9PiB2b2lkO1xyXG5cdG1heGltaXplOiAobWF4aW1pemU/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0ZGVzdHJveTogKCkgPT4gdm9pZDtcclxuXHRjbG9zZURyb3BEb3duOiAoZm9jdXM/OiBib29sZWFuKSA9PiB2b2lkO1xyXG5cdHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sOiAoaHRtbDogc3RyaW5nLCBlbmRIdG1sPzogc3RyaW5nLCBvdmVycmlkZUNvZGVCbG9ja2luZz86IGJvb2xlYW4pID0+IHZvaWQ7XHJcblx0d3lzaXd5Z0VkaXRvckluc2VydFRleHQ6ICh0ZXh0OiBzdHJpbmcsIGVuZFRleHQ6IHN0cmluZykgPT4gdm9pZDtcclxuXHRpbnNlcnRUZXh0OiAodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpID0+IGFueTtcclxuXHRzb3VyY2VFZGl0b3JJbnNlcnRUZXh0OiAodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpID0+IHZvaWQ7XHJcblx0Z2V0UmFuZ2VIZWxwZXI6ICgpID0+IFJhbmdlSGVscGVyO1xyXG5cdHNvdXJjZUVkaXRvckNhcmV0OiAocG9zaXRpb246IGFueSkgPT4gYW55O1xyXG5cdGluc2VydDogKHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nLCBmaWx0ZXI6IGJvb2xlYW4sIGNvbnZlcnRFbW90aWNvbnM6IGJvb2xlYW4sIGFsbG93TWl4ZWQ6IGJvb2xlYW4pID0+IGFueTtcclxuXHRnZXRXeXNpd3lnRWRpdG9yVmFsdWU6IChmaWx0ZXI/OiBib29sZWFuKSA9PiBzdHJpbmc7XHJcblx0Z2V0Qm9keTogKCkgPT4gSFRNTEJvZHlFbGVtZW50O1xyXG5cdGdldENvbnRlbnRBcmVhQ29udGFpbmVyOiAoKSA9PiBIVE1MRWxlbWVudDtcclxuXHRleGVjQ29tbWFuZDogKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IHN0cmluZyB8IGJvb2xlYW4pID0+IHZvaWQ7XHJcblx0Y3VycmVudE5vZGU6ICgpID0+IGFueTtcclxuXHRjdXJyZW50QmxvY2tOb2RlOiAoKSA9PiBhbnk7XHJcblx0YmluZDogKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pID0+IGFueTtcclxuXHR1bmJpbmQ6IChldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0a2V5RG93bjogKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbikgPT4gYW55O1xyXG5cdGtleVByZXNzOiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0a2V5VXA6IChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pID0+IGFueTtcclxuXHRub2RlQ2hhbmdlZDogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnk7XHJcblx0c2VsZWN0aW9uQ2hhbmdlZDogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnk7XHJcblx0dmFsdWVDaGFuZ2VkOiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0Y3NzOiAoY3NzOiBzdHJpbmcpID0+IGFueTtcclxuXHRyZW1vdmVTaG9ydGN1dDogKHNob3J0Y3V0OiBzdHJpbmcpID0+IGFueTtcclxuXHRlbW90aWNvbnNDYWNoZTogYW55O1xyXG5cdGFkZFNob3J0Y3V0OiAoc2hvcnRjdXQ6IHN0cmluZywgY21kOiBzdHJpbmcgfCBGdW5jdGlvbikgPT4gYW55O1xyXG5cdGNsZWFyQmxvY2tGb3JtYXR0aW5nOiAoYmxvY2s6IEhUTUxFbGVtZW50KSA9PiBhbnk7XHJcblx0dHJhbnNsYXRlOiAoLi4uYXJnczogYW55KSA9PiBzdHJpbmc7XHJcblxyXG5cdC8vIFN0YXRpY1xyXG5cdHN0YXRpYyBsb2NhbGU6IGFueSA9IHt9O1xyXG5cdHN0YXRpYyBmb3JtYXRzOiBhbnkgPSB7fTtcclxuXHRzdGF0aWMgaWNvbnM6IGFueSA9IHt9O1xyXG5cdHN0YXRpYyBjb21tYW5kOiBhbnkgPSB7fTtcclxuXHJcblx0Y29uc3RydWN0b3IodGV4dGFyZWE6IGFueSwgdXNlck9wdGlvbnM6IGFueSkge1xyXG5cclxuXHRcdGxldCBlbWxFZGl0b3IgPSB0aGlzO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRWRpdG9yIGZvcm1hdCBsaWtlIEJCQ29kZSBvciBIVE1MXHJcblx0XHQgKi9cclxuXHRcdGxldCBmb3JtYXQ6IGFueTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBkaXYgd2hpY2ggY29udGFpbnMgdGhlIGVkaXRvciBhbmQgdG9vbGJhclxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBlZGl0b3JDb250YWluZXI6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogTWFwIG9mIGV2ZW50cyBoYW5kbGVycyBib3VuZCB0byB0aGlzIGluc3RhbmNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgZXZlbnRIYW5kbGVyczogYW55ID0ge307XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyB0b29sYmFyXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHRvb2xiYXI6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVkaXRvcnMgaWZyYW1lIHdoaWNoIHNob3VsZCBiZSBpbiBkZXNpZ24gbW9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCB3eXNpd3lnRWRpdG9yOiBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZGl0b3JzIHdpbmRvd1xyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtXaW5kb3d9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgd3lzaXd5Z1dpbmRvdzogV2luZG93O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIFdZU0lXWUcgZWRpdG9ycyBib2R5IGVsZW1lbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7SFRNTEJvZHlFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHd5c2l3eWdCb2R5OiBIVE1MQm9keUVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGRvY3VtZW50XHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0RvY3VtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHd5c2l3eWdEb2N1bWVudDogRG9jdW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyB0ZXh0YXJlYSBmb3Igdmlld2luZyBzb3VyY2VcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7SFRNTFRleHRBcmVhRWxlbWVudH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBzb3VyY2VFZGl0b3I6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY3VycmVudCBkcm9wZG93blxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBkcm9wZG93bjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJZiB0aGUgdXNlciBpcyBjdXJyZW50bHkgY29tcG9zaW5nIHRleHQgdmlhIElNRVxyXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0XHQgKi9cclxuXHRcdGxldCBpc0NvbXBvc2luZzogYm9vbGVhbjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRpbWVyIGZvciB2YWx1ZUNoYW5nZWQga2V5IGhhbmRsZXJcclxuXHRcdCAqIEB0eXBlIHtudW1iZXJ9XHJcblx0XHQgKi9cclxuXHRcdGxldCB2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyOiBhbnk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyBsb2NhbGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgbG9jYWxlOiBhbnk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdG9yZXMgYSBjYWNoZSBvZiBwcmVsb2FkZWQgaW1hZ2VzXHJcblx0XHQgKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEB0eXBlIHtBcnJheS48SFRNTEltYWdlRWxlbWVudD59XHJcblx0XHQgKi9cclxuXHRcdGxldCBwcmVMb2FkQ2FjaGU6IGFueSA9IEFycmF5PEhUTUxJbWFnZUVsZW1lbnQ+O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVkaXRvcnMgcmFuZ2VIZWxwZXIgaW5zdGFuY2VcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UmFuZ2VIZWxwZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgcmFuZ2VIZWxwZXI6IFJhbmdlSGVscGVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQW4gYXJyYXkgb2YgYnV0dG9uIHN0YXRlIGhhbmRsZXJzXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0FycmF5LjxPYmplY3Q+fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGJ0blN0YXRlSGFuZGxlcnM6IGFueSA9IFtdO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUGx1Z2luIG1hbmFnZXIgaW5zdGFuY2VcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7UGx1Z2luTWFuYWdlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGN1cnJlbnQgbm9kZSBjb250YWluaW5nIHRoZSBzZWxlY3Rpb24vY2FyZXRcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Tm9kZX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBjdXJyZW50Tm9kZTogTm9kZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIGN1cnJlbnQgbm9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtub2RlfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGN1cnJlbnRCbG9ja05vZGU6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGN1cnJlbnQgbm9kZSBzZWxlY3Rpb24vY2FyZXRcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGN1cnJlbnRTZWxlY3Rpb246IGFueTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFVzZWQgdG8gbWFrZSBzdXJlIG9ubHkgMSBzZWxlY3Rpb24gY2hhbmdlZFxyXG5cdFx0ICogY2hlY2sgaXMgY2FsbGVkIGV2ZXJ5IDEwMG1zLlxyXG5cdFx0ICpcclxuXHRcdCAqIEhlbHBzIGltcHJvdmUgcGVyZm9ybWFuY2UgYXMgaXQgaXMgY2hlY2tlZCBhIGxvdC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBpc1NlbGVjdGlvbkNoZWNrUGVuZGluZzogYm9vbGVhbjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIElmIGNvbnRlbnQgaXMgcmVxdWlyZWQgKGVxdWl2YWxlbnQgdG8gdGhlIEhUTUw1IHJlcXVpcmVkIGF0dHJpYnV0ZSlcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBpc1JlcXVpcmVkOiBib29sZWFuO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGlubGluZSBDU1Mgc3R5bGUgZWxlbWVudC4gV2lsbCBiZSB1bmRlZmluZWRcclxuXHRcdCAqIHVudGlsIGNzcygpIGlzIGNhbGxlZCBmb3IgdGhlIGZpcnN0IHRpbWUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxTdHlsZUVsZW1lbnR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgaW5saW5lQ3NzOiBIVE1MU3R5bGVFbGVtZW50O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogT2JqZWN0IGNvbnRhaW5pbmcgYSBsaXN0IG9mIHNob3J0Y3V0IGhhbmRsZXJzXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBzaG9ydGN1dEhhbmRsZXJzOiBhbnkgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBtaW4gYW5kIG1heCBoZWlnaHRzIHRoYXQgYXV0b0V4cGFuZCBzaG91bGQgc3RheSB3aXRoaW5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGF1dG9FeHBhbmRCb3VuZHM6IGFueTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRpbWVvdXQgZm9yIHRoZSBhdXRvRXhwYW5kIGZ1bmN0aW9uIHRvIHRocm90dGxlIGNhbGxzXHJcblx0XHQgKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGF1dG9FeHBhbmRUaHJvdHRsZTogYW55O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2FjaGUgb2YgdGhlIGN1cnJlbnQgdG9vbGJhciBidXR0b25zXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCB0b29sYmFyQnV0dG9uczogYW55ID0gW107XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBMYXN0IHNjcm9sbCBwb3NpdGlvbiBiZWZvcmUgbWF4aW1pemluZyBzb1xyXG5cdFx0ICogaXQgY2FuIGJlIHJlc3RvcmVkIHdoZW4gZmluaXNoZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge251bWJlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBtYXhpbWl6ZVNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdG9yZXMgdGhlIGNvbnRlbnRzIHdoaWxlIGEgcGFzdGUgaXMgdGFraW5nIHBsYWNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIE5lZWRlZCB0byBzdXBwb3J0IGJyb3dzZXJzIHRoYXQgbGFjayBjbGlwYm9hcmQgQVBJIHN1cHBvcnQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUgez9Eb2N1bWVudEZyYWdtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHBhc3RlQ29udGVudEZyYWdtZW50OiBhbnk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbGwgdGhlIGVtb3RpY29ucyBmcm9tIGRyb3Bkb3duLCBtb3JlIGFuZCBoaWRkZW4gY29tYmluZWRcclxuXHRcdCAqIGFuZCB3aXRoIHRoZSBlbW90aWNvbnMgcm9vdCBzZXRcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgYWxsRW1vdGljb25zOiBhbnkgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEN1cnJlbnQgaWNvbiBzZXQgaWYgYW55XHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUgez9PYmplY3R9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgaWNvbnM6IGFueSB8IG51bGw7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBQcml2YXRlIGZ1bmN0aW9uc1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGluaXQ6IGFueSwgcmVwbGFjZUVtb3RpY29uczogYW55LCBoYW5kbGVDb21tYW5kOiBhbnksIGluaXRFZGl0b3I6IGFueSwgaW5pdEV2ZW50czogYW55LCBpbml0TG9jYWxlOiBhbnksIGluaXRUb29sQmFyOiBhbnksIGluaXRPcHRpb25zOiBhbnksIGluaXRSZXNpemU6IGFueSwgaW5pdEVtb3RpY29uczogYW55O1xyXG5cdFx0bGV0IGhhbmRsZVBhc3RlRXZ0OiBhbnksIGhhbmRsZUN1dENvcHlFdnQ6IGFueSwgaGFuZGxlUGFzdGVEYXRhOiBhbnksIGhhbmRsZUtleURvd246IGFueSwgaGFuZGxlQmFja1NwYWNlOiBhbnksIGhhbmRsZUtleVByZXNzOiBhbnksIGhhbmRsZUZvcm1SZXNldDogYW55LCBoYW5kbGVNb3VzZURvd246IGFueSwgaGFuZGxlQ29tcG9zaXRpb246IGFueTtcclxuXHRcdGxldCBoYW5kbGVFdmVudDogYW55LCBoYW5kbGVEb2N1bWVudENsaWNrOiBhbnksIHVwZGF0ZUFjdGl2ZUJ1dHRvbnM6IGFueSwgc291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0OiBhbnksIGFwcGVuZE5ld0xpbmU6IGFueSwgY2hlY2tTZWxlY3Rpb25DaGFuZ2VkOiBhbnksIGNoZWNrTm9kZUNoYW5nZWQ6IGFueSwgYXV0b2ZvY3VzOiBhbnksIGVtb3RpY29uc0tleVByZXNzOiBhbnk7XHJcblx0XHRsZXQgZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlOiBhbnksIGN1cnJlbnRTdHlsZWRCbG9ja05vZGU6IGFueSwgdHJpZ2dlclZhbHVlQ2hhbmdlZDogYW55LCB2YWx1ZUNoYW5nZWRCbHVyOiBhbnksIHZhbHVlQ2hhbmdlZEtleVVwOiBhbnksIGF1dG9VcGRhdGU6IGFueSwgYXV0b0V4cGFuZDogYW55O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWxsIHRoZSBjb21tYW5kcyBzdXBwb3J0ZWQgYnkgdGhlIGVkaXRvclxyXG5cdFx0ICogQG5hbWUgY29tbWFuZHNcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5jb21tYW5kcyA9IHV0aWxzXHJcblx0XHRcdC5leHRlbmQodHJ1ZSwge30sICh1c2VyT3B0aW9ucy5jb21tYW5kcyB8fCBkZWZhdWx0Q29tbWFuZHMpKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE9wdGlvbnMgZm9yIHRoaXMgZWRpdG9yIGluc3RhbmNlXHJcblx0XHQgKiBAbmFtZSBvcHRzXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgb3B0aW9uczogYW55ID0gZW1sRWRpdG9yLm9wdHMgPSB1dGlscy5leHRlbmQoXHJcblx0XHRcdHRydWUsIHt9LCAoZGVmYXVsdE9wdGlvbnMgYXMgYW55KSwgdXNlck9wdGlvbnNcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgZGVlcCBleHRlbmQgZW1vdGljb25zIChmaXhlcyAjNTY1KVxyXG5cdFx0ZW1sRWRpdG9yLm9wdHMuZW1vdGljb25zID0gdXNlck9wdGlvbnMuZW1vdGljb25zIHx8IChkZWZhdWx0T3B0aW9ucyBhcyBhbnkpLmVtb3RpY29ucztcclxuXHJcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkob3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscykpIHtcclxuXHRcdFx0b3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscyA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0b3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscy5wdXNoKCdodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC8nKTtcclxuXHJcblx0XHQvLyBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIERPTVB1cmlmeSBmb3IgZWFjaCBlZGl0b3IgaW5zdGFuY2Ugc28gY2FuXHJcblx0XHQvLyBoYXZlIGRpZmZlcmVudCBhbGxvd2VkIGlmcmFtZSBVUkxzXHJcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbmV3LWNhcFxyXG5cdFx0bGV0IGRvbVB1cmlmeSA9IERPTVB1cmlmeSgpO1xyXG5cclxuXHRcdC8vIEFsbG93IGlmcmFtZXMgZm9yIHRoaW5ncyBsaWtlIFlvdVR1YmUsIHNlZTpcclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2lzc3Vlcy8zNDAjaXNzdWVjb21tZW50LTY3MDc1ODk4MFxyXG5cdFx0ZG9tUHVyaWZ5LmFkZEhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBmdW5jdGlvbiAobm9kZTogSFRNTEVsZW1lbnQsIGRhdGE6IGFueSkge1xyXG5cdFx0XHRsZXQgYWxsb3dlZFVybHMgPSBvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEudGFnTmFtZSA9PT0gJ2lmcmFtZScpIHtcclxuXHRcdFx0XHRsZXQgc3JjID0gZG9tLmF0dHIobm9kZSwgJ3NyYycpIHx8ICcnO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFsbG93ZWRVcmxzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsZXQgdXJsID0gYWxsb3dlZFVybHNbaV07XHJcblxyXG5cdFx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHVybCkgJiYgc3JjLnN1YnN0cigwLCB1cmwubGVuZ3RoKSA9PT0gdXJsKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgcmVnZXhcclxuXHRcdFx0XHRcdGlmICh1cmwudGVzdCAmJiB1cmwudGVzdChzcmMpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIE5vIG1hdGNoIHNvIHJlbW92ZVxyXG5cdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENvbnZlcnQgdGFyZ2V0IGF0dHJpYnV0ZSBpbnRvIGRhdGEtZW1sLXRhcmdldCBhdHRyaWJ1dGVzIHNvIFhIVE1MIGZvcm1hdFxyXG5cdFx0Ly8gY2FuIGFsbG93IHRoZW1cclxuXHRcdGRvbVB1cmlmeS5hZGRIb29rKCdhZnRlclNhbml0aXplQXR0cmlidXRlcycsIGZ1bmN0aW9uIChub2RlOiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHRpZiAoJ3RhcmdldCcgaW4gbm9kZSkge1xyXG5cdFx0XHRcdGRvbS5hdHRyKG5vZGUsICdkYXRhLWVtbC10YXJnZXQnLCBkb20uYXR0cihub2RlLCAndGFyZ2V0JykpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ucmVtb3ZlQXR0cihub2RlLCAndGFyZ2V0Jyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNhbml0aXplIEhUTUwgdG8gYXZvaWQgWFNTXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ30gaHRtbFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0ZnVuY3Rpb24gc2FuaXRpemUoaHRtbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0Y29uc3QgYWxsb3dlZFRhZ3MgPSBbJ2lmcmFtZSddLmNvbmNhdChvcHRpb25zLmFsbG93ZWRUYWdzKTtcclxuXHRcdFx0Y29uc3QgYWxsb3dlZEF0dHJzID0gWydhbGxvd2Z1bGxzY3JlZW4nLCAnZnJhbWVib3JkZXInLCAndGFyZ2V0J11cclxuXHRcdFx0XHQuY29uY2F0KG9wdGlvbnMuYWxsb3dlZEF0dHJpYnV0ZXMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRvbVB1cmlmeS5zYW5pdGl6ZShodG1sLCB7XHJcblx0XHRcdFx0QUREX1RBR1M6IGFsbG93ZWRUYWdzLFxyXG5cdFx0XHRcdEFERF9BVFRSOiBhbGxvd2VkQXR0cnNcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHRoZSBXWVNJV1lHIGFuZCBzb3VyY2UgbW9kZXNcclxuXHRcdCAqXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHRvZ2dsZVNvdXJjZU1vZGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLnRvZ2dsZVNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBpc0luU291cmNlTW9kZSA9IGVtbEVkaXRvci5pblNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRcdC8vIGRvbid0IGFsbG93IHN3aXRjaGluZyB0byBXWVNJV1lHIGlmIGRvZXNuJ3Qgc3VwcG9ydCBpdFxyXG5cdFx0XHRpZiAoIWJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkICYmIGlzSW5Tb3VyY2VNb2RlKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWlzSW5Tb3VyY2VNb2RlKSB7XHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIuY2xlYXIoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IG51bGw7XHJcblx0XHRcdGVtbEVkaXRvci5ibHVyKCk7XHJcblxyXG5cdFx0XHRpZiAoaXNJblNvdXJjZU1vZGUpIHtcclxuXHRcdFx0XHRlbWxFZGl0b3Iuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKGVtbEVkaXRvci5nZXRTb3VyY2VFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbWxFZGl0b3Iuc2V0U291cmNlRWRpdG9yVmFsdWUoZW1sRWRpdG9yLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZShzb3VyY2VFZGl0b3IpO1xyXG5cdFx0XHRkb20udG9nZ2xlKHd5c2l3eWdFZGl0b3IpO1xyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3d5c2l3eWdNb2RlJywgaXNJblNvdXJjZU1vZGUpO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScsICFpc0luU291cmNlTW9kZSk7XHJcblxyXG5cdFx0XHR1cGRhdGVUb29sQmFyKCk7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIElmIHRoZSBlZGl0b3IgaXMgaW4gc291cmNlIGNvZGUgbW9kZVxyXG5cdFx0KlxyXG5cdFx0KiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0KiBAZnVuY3Rpb25cclxuXHRcdCogQG5hbWUgaW5Tb3VyY2VNb2RlXHJcblx0XHQqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQqL1xyXG5cdFx0ZW1sRWRpdG9yLmluU291cmNlTW9kZSA9IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyhlZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGVkaXRvcnMgYmx1ciBldmVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgYmx1cl4yXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5ibHVyID0gZnVuY3Rpb24gKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0ZW1sRWRpdG9yLmJpbmQoJ2JsdXInLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoIWVtbEVkaXRvci5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHR3eXNpd3lnQm9keS5ibHVyKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c291cmNlRWRpdG9yLmJsdXIoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGVtbEVkaXRvcjtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSBXWVNJV1lHIEhUTUwgZWRpdG9yIHZhbHVlLiBTaG91bGQgb25seSBiZSB0aGUgSFRNTFxyXG5cdFx0ICogY29udGFpbmVkIHdpdGhpbiB0aGUgYm9keSB0YWdzXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLnNldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XHJcblx0XHRcdGlmICghdmFsdWUpIHtcclxuXHRcdFx0XHR2YWx1ZSA9ICc8cD48YnIgLz48L3A+JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d3lzaXd5Z0JvZHkuaW5uZXJIVE1MID0gc2FuaXRpemUodmFsdWUpO1xyXG5cdFx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblxyXG5cdFx0XHRhcHBlbmROZXdMaW5lKCk7XHJcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0YXV0b0V4cGFuZCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNldFNvdXJjZUVkaXRvclZhbHVlXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3Iuc2V0U291cmNlRWRpdG9yVmFsdWUgPSBmdW5jdGlvbiAodmFsdWU6IHN0cmluZykge1xyXG5cdFx0XHRzb3VyY2VFZGl0b3IudmFsdWUgPSB2YWx1ZTtcclxuXHJcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBVcGRhdGVzIHRoZSB0ZXh0YXJlYSB0aGF0IHRoZSBlZGl0b3IgaXMgcmVwbGFjaW5nXHJcblx0XHQgKiB3aXRoIHRoZSB2YWx1ZSBjdXJyZW50bHkgaW5zaWRlIHRoZSBlZGl0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSB1cGRhdGVPcmlnaW5hbFxyXG5cdFx0ICogQHNpbmNlIDEuNC4wXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IudXBkYXRlT3JpZ2luYWwgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRleHRhcmVhLnZhbHVlID0gZW1sRWRpdG9yLnZhbCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdXNpbmcgYSBwbHVnaW4gdGhhdCBmaWx0ZXJzIHRoZSB0ZXh0IGxpa2UgdGhlIEJCQ29kZSBwbHVnaW5cclxuXHRcdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyB3aGljaCBpcyBCQkNvZGUgdG9cclxuXHRcdCAqIEhUTUwgc28gaXQgd2lsbCByZXR1cm4gSFRNTC4gSWYgZmlsdGVyIGlzIHNldCB0byBmYWxzZSBpdCB3aWxsXHJcblx0XHQgKiBqdXN0IHJldHVybiB0aGUgY29udGVudHMgb2YgdGhlIHNvdXJjZSBlZGl0b3IgKEJCQ29kZSkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuMFxyXG5cdFx0ICogQG5hbWUgZ2V0U291cmNlRWRpdG9yVmFsdWVcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5nZXRTb3VyY2VFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uIChmaWx0ZXI6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG5cdFx0XHRsZXQgdmFsID0gc291cmNlRWRpdG9yLnZhbHVlO1xyXG5cclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ3RvSHRtbCcgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0dmFsID0gZm9ybWF0LnRvSHRtbCh2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB2YWw7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogPHA+U2V0cyB0aGUgd2lkdGggYW5kL29yIGhlaWdodCBvZiB0aGUgZWRpdG9yLjwvcD5cclxuXHRcdCAqXHJcblx0XHQgKiA8cD5JZiB3aWR0aCBvciBoZWlnaHQgaXMgbm90IG51bWVyaWMgaXQgaXMgaWdub3JlZC48L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogPHA+VGhlIHNhdmUgYXJndW1lbnQgc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIG5ldyBzaXplcy5cclxuXHRcdCAqIFRoZSBzYXZlZCBzaXplcyBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2UgcmVzdG9yaW5nIGZyb21cclxuXHRcdCAqIG1heGltaXplZCBzdGF0ZS4gVGhpcyBzaG91bGQgbm9ybWFsbHkgYmUgbGVmdCBhcyB0cnVlLjwvcD5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn1cdFx0d2lkdGhcdFx0V2lkdGggaW4gcHhcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfVx0XHRoZWlnaHRcdFx0SGVpZ2h0IGluIHB4XHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZT10cnVlXVx0SWYgdG8gc3RvcmUgdGhlIG5ldyBzaXplc1xyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSBkaW1lbnNpb25zXjNcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5kaW1lbnNpb25zID0gZnVuY3Rpb24gKHdpZHRoPzogYW55LCBoZWlnaHQ/OiBhbnksIHNhdmU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0Ly8gc2V0IHVuZGVmaW5lZCB3aWR0aC9oZWlnaHQgdG8gYm9vbGVhbiBmYWxzZVxyXG5cdFx0XHR3aWR0aCA9ICghd2lkdGggJiYgd2lkdGggIT09IDApID8gZmFsc2UgOiB3aWR0aDtcclxuXHRcdFx0aGVpZ2h0ID0gKCFoZWlnaHQgJiYgaGVpZ2h0ICE9PSAwKSA/IGZhbHNlIDogaGVpZ2h0O1xyXG5cclxuXHRcdFx0aWYgKHdpZHRoID09PSBmYWxzZSAmJiBoZWlnaHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHsgd2lkdGg6IGVtbEVkaXRvci53aWR0aCgpLCBoZWlnaHQ6IGVtbEVkaXRvci5oZWlnaHQoKSB9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAod2lkdGggIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLndpZHRoID0gd2lkdGg7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyLCB3aWR0aCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChoZWlnaHQgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRvcHRpb25zLmhlaWdodCA9IGhlaWdodDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyLCBoZWlnaHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgcmVhZCBvbmx5XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHthbnl9IHJlYWRPbmx5XHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIHJlYWRPbmx5XjJcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5yZWFkT25seSA9IGZ1bmN0aW9uIChyZWFkT25seT86IGFueSk6IGFueSB7XHJcblx0XHRcdGlmICh0eXBlb2YgcmVhZE9ubHkgIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdHJldHVybiAhc291cmNlRWRpdG9yLnJlYWRPbmx5O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3eXNpd3lnQm9keS5jb250ZW50RWRpdGFibGUgPSAoIXJlYWRPbmx5KS50b1N0cmluZygpO1xyXG5cdFx0XHRzb3VyY2VFZGl0b3IucmVhZE9ubHkgPSAhcmVhZE9ubHk7XHJcblxyXG5cdFx0XHR1cGRhdGVUb29sQmFyKHJlYWRPbmx5KTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYW4gZXZlbnQgaGFuZGxlciB0byB0aGUgZm9jdXMgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbiB8IGFueX0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGZvY3VzXjJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmZvY3VzID0gZnVuY3Rpb24gKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0ZW1sRWRpdG9yLmJpbmQoJ2ZvY3VzJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCFlbWxFZGl0b3IuaW5Tb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHQvLyBBbHJlYWR5IGhhcyBmb2N1cyBzbyBkbyBub3RoaW5nXHJcblx0XHRcdFx0aWYgKGRvbS5maW5kKHd5c2l3eWdEb2N1bWVudCwgJzpmb2N1cycpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IGNvbnRhaW5lcjtcclxuXHRcdFx0XHRsZXQgcm5nID0gcmFuZ2VIZWxwZXIuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0XHQvLyBGaXggRkYgYnVnIHdoZXJlIGl0IHNob3dzIHRoZSBjdXJzb3IgaW4gdGhlIHdyb25nIHBsYWNlXHJcblx0XHRcdFx0Ly8gaWYgdGhlIGVkaXRvciBoYXNuJ3QgaGFkIGZvY3VzIGJlZm9yZS4gU2VlIGlzc3VlICMzOTNcclxuXHRcdFx0XHRpZiAoIWN1cnJlbnRTZWxlY3Rpb24pIHtcclxuXHRcdFx0XHRcdGF1dG9mb2N1cyh0cnVlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGlmIGN1cnNvciBpcyBzZXQgYWZ0ZXIgYSBCUiB3aGVuIHRoZSBCUiBpcyB0aGUgb25seVxyXG5cdFx0XHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXHJcblx0XHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdFx0aWYgKHJuZyAmJiBybmcuZW5kT2Zmc2V0ID09PSAxICYmIHJuZy5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRcdGNvbnRhaW5lciA9IHJuZy5lbmRDb250YWluZXI7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcclxuXHRcdFx0XHRcdFx0ZG9tLmlzKGNvbnRhaW5lci5maXJzdENoaWxkLCAnYnInKSkge1xyXG5cdFx0XHRcdFx0XHRybmcuc2V0U3RhcnRCZWZvcmUoY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJuZyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR3eXNpd3lnV2luZG93LmZvY3VzKCk7XHJcblx0XHRcdFx0d3lzaXd5Z0JvZHkuZm9jdXMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIGVkaXRvci5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiBmaWx0ZXIgc2V0IHRydWUgdGhlIHZhbCB3aWxsIGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBmaWx0ZXJcclxuXHRcdCAqIGZ1bmN0aW9uLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpbiBpdCB3aWxsIHBhc3MgdGhlIHZhbCB0b1xyXG5cdFx0ICogdGhlIEJCQ29kZSBmaWx0ZXIgdG8gY29udmVydCBhbnkgQkJDb2RlIGludG8gSFRNTC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZyB8IHVuZGVmaW5lZCB8IG51bGx9IHZhbFxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHZhbF4yXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IudmFsID0gZnVuY3Rpb24gKHZhbD86IHN0cmluZywgZmlsdGVyOiBib29sZWFuID0gdHJ1ZSk6IGFueSB7XHJcblx0XHRcdGlmICghdXRpbHMuaXNTdHJpbmcodmFsKSkge1xyXG5cdFx0XHRcdHJldHVybiBlbWxFZGl0b3IuaW5Tb3VyY2VNb2RlKCkgP1xyXG5cdFx0XHRcdFx0ZW1sRWRpdG9yLmdldFNvdXJjZUVkaXRvclZhbHVlKGZhbHNlKSA6XHJcblx0XHRcdFx0XHRlbWxFZGl0b3IuZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghZW1sRWRpdG9yLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ3RvSHRtbCcgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0XHR2YWwgPSBmb3JtYXQudG9IdG1sKHZhbCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlbWxFZGl0b3Iuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZW1sRWRpdG9yLnNldFNvdXJjZUVkaXRvclZhbHVlKHZhbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEV4cGFuZHMgb3Igc2hyaW5rcyB0aGUgZWRpdG9ycyBoZWlnaHQgdG8gdGhlIGhlaWdodCBvZiBpdCdzIGNvbnRlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBVbmxlc3MgaWdub3JlTWF4SGVpZ2h0IGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbm90IGV4cGFuZFxyXG5cdFx0ICogaGlnaGVyIHRoYW4gdGhlIG1heEhlaWdodCBvcHRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtpZ25vcmVNYXhIZWlnaHQ9ZmFsc2VdXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGV4cGFuZFRvQ29udGVudFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzZWUgI3Jlc2l6ZVRvQ29udGVudFxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IuZXhwYW5kVG9Db250ZW50ID0gZnVuY3Rpb24gKGlnbm9yZU1heEhlaWdodDogYm9vbGVhbikge1xyXG5cdFx0XHRpZiAoZW1sRWRpdG9yLm1heGltaXplKCkpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNsZWFyVGltZW91dChhdXRvRXhwYW5kVGhyb3R0bGUpO1xyXG5cdFx0XHRhdXRvRXhwYW5kVGhyb3R0bGUgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmICghYXV0b0V4cGFuZEJvdW5kcykge1xyXG5cdFx0XHRcdGxldCBoZWlnaHQgPSBvcHRpb25zLnJlc2l6ZU1pbkhlaWdodCB8fCBvcHRpb25zLmhlaWdodCB8fFxyXG5cdFx0XHRcdFx0ZG9tLmhlaWdodCh0ZXh0YXJlYSk7XHJcblxyXG5cdFx0XHRcdGF1dG9FeHBhbmRCb3VuZHMgPSB7XHJcblx0XHRcdFx0XHRtaW46IGhlaWdodCxcclxuXHRcdFx0XHRcdG1heDogb3B0aW9ucy5yZXNpemVNYXhIZWlnaHQgfHwgKGhlaWdodCAqIDIpXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHJhbmdlID0gZ2xvYmFsRG9jLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh3eXNpd3lnQm9keSk7XHJcblxyXG5cdFx0XHRsZXQgcmVjdCA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRsZXQgY3VycmVudCA9IHd5c2l3eWdEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMTtcclxuXHRcdFx0bGV0IHNwYWNlTmVlZGVkID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcDtcclxuXHRcdFx0bGV0IG5ld0hlaWdodCA9IGVtbEVkaXRvci5oZWlnaHQoKSArIDEgKyAoc3BhY2VOZWVkZWQgLSBjdXJyZW50KTtcclxuXHJcblx0XHRcdGlmICghaWdub3JlTWF4SGVpZ2h0ICYmIGF1dG9FeHBhbmRCb3VuZHMubWF4ICE9PSAtMSkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IE1hdGgubWluKG5ld0hlaWdodCwgYXV0b0V4cGFuZEJvdW5kcy5tYXgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbWxFZGl0b3IuaGVpZ2h0KE1hdGguY2VpbChNYXRoLm1heChuZXdIZWlnaHQsIGF1dG9FeHBhbmRCb3VuZHMubWluKSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBSVEwgbW9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gcnRsXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIHJ0bF4yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IucnRsID0gZnVuY3Rpb24gKHJ0bD86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRsZXQgZGlyID0gcnRsID8gJ3J0bCcgOiAnbHRyJztcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgcnRsICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRyZXR1cm4gZG9tLmF0dHIoc291cmNlRWRpdG9yLCAnZGlyJykgPT09ICdydGwnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uYXR0cih3eXNpd3lnQm9keSwgJ2RpcicsIGRpcik7XHJcblx0XHRcdGRvbS5hdHRyKHNvdXJjZUVkaXRvciwgJ2RpcicsIGRpcik7XHJcblxyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAncnRsJyk7XHJcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyhlZGl0b3JDb250YWluZXIsICdsdHInKTtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgZGlyKTtcclxuXHJcblx0XHRcdGlmIChpY29ucyAmJiBpY29ucy5ydGwpIHtcclxuXHRcdFx0XHRpY29ucy5ydGwocnRsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRW5hYmxlcy9kaXNhYmxlcyBlbW90aWNvbnNcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZW1vdGljb25zXjJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjJcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmVtb3RpY29ucyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRpZiAoIWVuYWJsZSAmJiBlbmFibGUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5lbW90aWNvbnNFbmFibGVkID0gZW5hYmxlO1xyXG5cclxuXHRcdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgbnVsbCwgZW1vdGljb25zS2V5UHJlc3MpO1xyXG5cclxuXHRcdFx0XHRpZiAoIWVtbEVkaXRvci5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cclxuXHRcdFx0XHRcdHJlcGxhY2VFbW90aWNvbnMoKTtcclxuXHRcdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRcdHJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgZW1vdGljb25zID0gZG9tLmZpbmQod3lzaXd5Z0JvZHksICdpbWdbZGF0YS1lbWxlZGl0b3ItZW1vdGljb25dJyk7XHJcblxyXG5cdFx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoXywgaW1nKSB7XHJcblx0XHRcdFx0XHRsZXQgdGV4dDogYW55ID0gZG9tLmRhdGEoaW1nLCAnZW1sZWRpdG9yLWVtb3RpY29uJyk7XHJcblx0XHRcdFx0XHRsZXQgdGV4dE5vZGUgPSB3eXNpd3lnRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XHJcblx0XHRcdFx0XHRpbWcucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIGltZyk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGRvbS5vZmYod3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIG51bGwsIGVtb3RpY29uc0tleVByZXNzKTtcclxuXHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgaW4gc291cmNlTW9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzb3VyY2VNb2RlXjJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5zb3VyY2VNb2RlID0gZnVuY3Rpb24gKGVuYWJsZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRsZXQgaW5Tb3VyY2VNb2RlID0gZW1sRWRpdG9yLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlbmFibGUgIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdHJldHVybiBpblNvdXJjZU1vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgoaW5Tb3VyY2VNb2RlICYmICFlbmFibGUpIHx8ICghaW5Tb3VyY2VNb2RlICYmIGVuYWJsZSkpIHtcclxuXHRcdFx0XHRlbWxFZGl0b3IudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgdGhlIHdpZHRoIG9mIHRoZSBlZGl0b3JcclxuXHRcdCAqXHJcblx0XHQgKiBUaGUgc2F2ZVdpZHRoIHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSB3aWR0aC4gVGhlIHN0b3JlZCB3aWR0aCBjYW4gYmVcclxuXHRcdCAqIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tIG1heGltaXplZCBzdGF0ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gICAgIHdpZHRoICAgICAgICAgICAgV2lkdGggaW4gcGl4ZWxzXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZVdpZHRoPXRydWVdIElmIHRvIHN0b3JlIHRoZSB3aWR0aFxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSB3aWR0aF4zXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3Iud2lkdGggPSBmdW5jdGlvbiAod2lkdGg6IG51bWJlciwgc2F2ZVdpZHRoOiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0aWYgKCF3aWR0aCAmJiB3aWR0aCAhPT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZW1sRWRpdG9yLmRpbWVuc2lvbnMod2lkdGgsIG51bGwsIHNhdmVXaWR0aCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIHN0b3JlZCBoZWlnaHQgY2FuIGJlIHVzZWQgZm9yIHRoaW5ncyBsaWtlXHJcblx0XHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBIZWlnaHQgaW4gcHhcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSBoZWlnaHReM1xyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQ/OiBudW1iZXIsIHNhdmVIZWlnaHQ/OiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0aWYgKCFoZWlnaHQgJiYgaGVpZ2h0ICE9PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZW1sRWRpdG9yLmRpbWVuc2lvbnMobnVsbCwgaGVpZ2h0LCBzYXZlSGVpZ2h0KTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgYSBtZW51IGl0ZW0gZHJvcCBkb3duXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG1lbnVJdGVtIFRoZSBidXR0b24gdG8gYWxpZ24gdGhlIGRyb3Bkb3duIHdpdGhcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgICAgICAgICBVc2VkIGZvciBzdHlsaW5nIHRoZSBkcm9wZG93biwgd2lsbCBiZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgY2xhc3MgZW1sZWRpdG9yLW5hbWVcclxuXHRcdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250ZW50ICBUaGUgSFRNTCBjb250ZW50IG9mIHRoZSBkcm9wZG93blxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjcmVhdGVEcm9wRG93blxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmNyZWF0ZURyb3BEb3duID0gZnVuY3Rpb24gKG1lbnVJdGVtOiBIVE1MRWxlbWVudCwgbmFtZTogc3RyaW5nLCBjb250ZW50OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0XHQvLyBmaXJzdCBjbGljayBmb3IgY3JlYXRlIHNlY29uZCBjbGljayBmb3IgY2xvc2VcclxuXHRcdFx0bGV0IGRyb3BEb3duQ3NzLCBkcm9wRG93bkNsYXNzID0gJ2VtbGVkaXRvci0nICsgbmFtZTtcclxuXHJcblx0XHRcdGVtbEVkaXRvci5jbG9zZURyb3BEb3duKCk7XHJcblxyXG5cdFx0XHQvLyBPbmx5IGNsb3NlIHRoZSBkcm9wZG93biBpZiBpdCB3YXMgYWxyZWFkeSBvcGVuXHJcblx0XHRcdGlmIChkcm9wZG93biAmJiBkb20uaGFzQ2xhc3MoZHJvcGRvd24sIGRyb3BEb3duQ2xhc3MpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkcm9wRG93bkNzcyA9IHV0aWxzLmV4dGVuZCh7XHJcblx0XHRcdFx0dG9wOiBtZW51SXRlbS5vZmZzZXRUb3AsXHJcblx0XHRcdFx0bGVmdDogbWVudUl0ZW0ub2Zmc2V0TGVmdCxcclxuXHRcdFx0XHRtYXJnaW5Ub3A6IG1lbnVJdGVtLmNsaWVudEhlaWdodFxyXG5cdFx0XHR9LCBvcHRpb25zLmRyb3BEb3duQ3NzKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItZHJvcGRvd24gJyArIGRyb3BEb3duQ2xhc3NcclxuXHRcdFx0fSkgYXMgYW55O1xyXG5cclxuXHRcdFx0ZG9tLmNzcyhkcm9wZG93biwgZHJvcERvd25Dc3MpO1xyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZHJvcGRvd24sIGNvbnRlbnQpO1xyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBkcm9wZG93bik7XHJcblx0XHRcdGRvbS5vbihkcm9wZG93biwgJ2NsaWNrIGZvY3VzaW4nLCBudWxsLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdC8vIHN0b3AgY2xpY2tzIHdpdGhpbiB0aGUgZHJvcGRvd24gZnJvbSBiZWluZyBoYW5kbGVkXHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAoZHJvcGRvd24pIHtcclxuXHRcdFx0XHRsZXQgZmlyc3QgPSBkb20uZmluZChkcm9wZG93biwgJ2lucHV0LHRleHRhcmVhJylbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0aWYgKGZpcnN0KSB7XHJcblx0XHRcdFx0XHRmaXJzdC5mb2N1cygpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBtYXhpbWlzZWQgb3Igbm90XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBtYXhpbWl6ZSBJZiB0byBtYXhpbWlzZSB0aGUgZWRpdG9yXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIG1heGltaXplXjJcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5tYXhpbWl6ZSA9IGZ1bmN0aW9uIChtYXhpbWl6ZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRsZXQgbWF4aW1pemVTaXplID0gJ2VtbGVkaXRvci1tYXhpbWl6ZSc7XHJcblxyXG5cdFx0XHRpZiAodXRpbHMuaXNVbmRlZmluZWQobWF4aW1pemUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyhlZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1heGltaXplID0gISFtYXhpbWl6ZTtcclxuXHJcblx0XHRcdGlmIChtYXhpbWl6ZSkge1xyXG5cdFx0XHRcdG1heGltaXplU2Nyb2xsUG9zaXRpb24gPSBnbG9iYWxXaW4uc2Nyb2xsWTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGdsb2JhbERvYy5kb2N1bWVudEVsZW1lbnQsIG1heGltaXplU2l6ZSwgbWF4aW1pemUpO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmJvZHksIG1heGltaXplU2l6ZSwgbWF4aW1pemUpO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdFx0ZW1sRWRpdG9yLndpZHRoKG1heGltaXplID8gJzEwMCUnIDogb3B0aW9ucy53aWR0aCwgZmFsc2UpO1xyXG5cdFx0XHRlbWxFZGl0b3IuaGVpZ2h0KG1heGltaXplID8gJzEwMCUnIDogb3B0aW9ucy5oZWlnaHQsIGZhbHNlKTtcclxuXHJcblx0XHRcdGlmICghbWF4aW1pemUpIHtcclxuXHRcdFx0XHRnbG9iYWxXaW4uc2Nyb2xsVG8oMCwgbWF4aW1pemVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGF1dG9FeHBhbmQoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlc3Ryb3lzIHRoZSBlZGl0b3IsIHJlbW92aW5nIGFsbCBlbGVtZW50cyBhbmRcclxuXHRcdCAqIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0ICpcclxuXHRcdCAqIExlYXZlcyBvbmx5IHRoZSBvcmlnaW5hbCB0ZXh0YXJlYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGRlc3Ryb3lcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQvLyBEb24ndCBkZXN0cm95IGlmIHRoZSBlZGl0b3IgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcclxuXHRcdFx0aWYgKCFwbHVnaW5NYW5hZ2VyKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwbHVnaW5NYW5hZ2VyLmRlc3Ryb3koKTtcclxuXHJcblx0XHRcdHJhbmdlSGVscGVyID0gbnVsbDtcclxuXHRcdFx0cGx1Z2luTWFuYWdlciA9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAoZHJvcGRvd24pIHtcclxuXHRcdFx0XHRkb20ucmVtb3ZlKGRyb3Bkb3duKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLm9mZihnbG9iYWxEb2MsICdjbGljaycsIG51bGwsIGhhbmRsZURvY3VtZW50Q2xpY2spO1xyXG5cclxuXHRcdFx0bGV0IGZvcm0gPSB0ZXh0YXJlYS5mb3JtO1xyXG5cdFx0XHRpZiAoZm9ybSkge1xyXG5cdFx0XHRcdGRvbS5vZmYoZm9ybSwgJ3Jlc2V0JywgbnVsbCwgaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdFx0XHRkb20ub2ZmKGZvcm0sICdzdWJtaXQnLCBudWxsLCBlbWxFZGl0b3IudXBkYXRlT3JpZ2luYWwsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLm9mZih3aW5kb3csICdwYWdlaGlkZScsIG51bGwsIGVtbEVkaXRvci51cGRhdGVPcmlnaW5hbCk7XHJcblx0XHRcdGRvbS5vZmYod2luZG93LCAncGFnZXNob3cnLCBudWxsLCBoYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0XHRkb20ucmVtb3ZlKHNvdXJjZUVkaXRvcik7XHJcblx0XHRcdGRvbS5yZW1vdmUodG9vbGJhcik7XHJcblx0XHRcdGRvbS5yZW1vdmUoZWRpdG9yQ29udGFpbmVyKTtcclxuXHJcblx0XHRcdGRlbGV0ZSB0ZXh0YXJlYS5fZW1sZWRpdG9yO1xyXG5cdFx0XHRkb20uc2hvdyh0ZXh0YXJlYSk7XHJcblxyXG5cdFx0XHR0ZXh0YXJlYS5yZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xvc2VzIGFueSBjdXJyZW50bHkgb3BlbiBkcm9wIGRvd25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb2N1cz1mYWxzZV0gSWYgdG8gZm9jdXMgdGhlIGVkaXRvclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGNsb3NpbmcgdGhlIGRyb3AgZG93blxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjbG9zZURyb3BEb3duXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IuY2xvc2VEcm9wRG93biA9IGZ1bmN0aW9uIChmb2N1cz86IGJvb2xlYW4pIHtcclxuXHRcdFx0aWYgKGRyb3Bkb3duKSB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZShkcm9wZG93bik7XHJcblx0XHRcdFx0ZHJvcGRvd24gPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZm9jdXMgPT09IHRydWUpIHtcclxuXHRcdFx0XHRlbWxFZGl0b3IuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgSFRNTCBpbnRvIFdZU0lXWUcgZWRpdG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGVuZEh0bWwgaXMgc3BlY2lmaWVkLCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZFxyXG5cdFx0ICogYmV0d2VlbiBodG1sIGFuZCBlbmRIdG1sLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IGh0bWxcclxuXHRcdCAqIGFuZCBlbmRIdG1sIHdpbGwganVzdCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRIdG1sPW51bGxdXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvdmVycmlkZUNvZGVCbG9ja2luZz1mYWxzZV0gSWYgdG8gaW5zZXJ0IHRoZSBodG1sXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50byBjb2RlIHRhZ3MsIGJ5XHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCBjb2RlIHRhZ3Mgb25seVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgdGV4dC5cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgd3lzaXd5Z0VkaXRvckluc2VydEh0bWxcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCA9IGZ1bmN0aW9uIChodG1sOiBzdHJpbmcsIGVuZEh0bWw/OiBzdHJpbmcsIG92ZXJyaWRlQ29kZUJsb2NraW5nPzogYm9vbGVhbikge1xyXG5cdFx0XHRsZXQgbWFya2VyOiBhbnksIHNjcm9sbFRvcCwgc2Nyb2xsVG8sIGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQod3lzaXd5Z0VkaXRvcik7XHJcblxyXG5cdFx0XHRlbWxFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRcdC8vIFRPRE86IFRoaXMgY29kZSB0YWcgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSBhbmRcclxuXHRcdFx0Ly8gc2hvdWxkIG1heWJlIGNvbnZlcnQgdGhlIEhUTUwgaW50byB0ZXh0IGluc3RlYWRcclxuXHRcdFx0Ly8gRG9uJ3QgYXBwbHkgdG8gY29kZSBlbGVtZW50c1xyXG5cdFx0XHRpZiAoIW92ZXJyaWRlQ29kZUJsb2NraW5nICYmIGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEluc2VydCB0aGUgSFRNTCBhbmQgc2F2ZSB0aGUgcmFuZ2Ugc28gdGhlIGVkaXRvciBjYW4gYmUgc2Nyb2xsZWRcclxuXHRcdFx0Ly8gdG8gdGhlIGVuZCBvZiB0aGUgc2VsZWN0aW9uLiBBbHNvIGFsbG93cyBlbW90aWNvbnMgdG8gYmUgcmVwbGFjZWRcclxuXHRcdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgdGhlIGN1cnNvciBwb3NpdGlvblxyXG5cdFx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKGh0bWwsIGVuZEh0bWwpO1xyXG5cdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0cmVwbGFjZUVtb3RpY29ucygpO1xyXG5cclxuXHRcdFx0Ly8gRml4IGFueSBpbnZhbGlkIG5lc3RpbmcsIGUuZy4gaWYgYSBxdW90ZSBvciBvdGhlciBibG9jayBpcyBpbnNlcnRlZFxyXG5cdFx0XHQvLyBpbnRvIGEgcGFyYWdyYXBoXHJcblx0XHRcdGRvbS5maXhOZXN0aW5nKHd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHRcdHdyYXBJbmxpbmVzKHd5c2l3eWdCb2R5LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdFx0Ly8gU2Nyb2xsIHRoZSBlZGl0b3IgYWZ0ZXIgdGhlIGVuZCBvZiB0aGUgc2VsZWN0aW9uXHJcblx0XHRcdG1hcmtlciA9IGRvbS5maW5kKHd5c2l3eWdCb2R5LCAnI2VtbGVkaXRvci1lbmQtbWFya2VyJylbMF07XHJcblx0XHRcdGRvbS5zaG93KG1hcmtlcik7XHJcblx0XHRcdHNjcm9sbFRvcCA9IHd5c2l3eWdCb2R5LnNjcm9sbFRvcDtcclxuXHRcdFx0c2Nyb2xsVG8gPSAoKGRvbS5nZXRPZmZzZXQobWFya2VyKSBhcyBhbnkpLnRvcCArXHJcblx0XHRcdFx0KG1hcmtlci5vZmZzZXRIZWlnaHQgKiAxLjUpKSAtIGVkaXRvckhlaWdodDtcclxuXHRcdFx0ZG9tLmhpZGUobWFya2VyKTtcclxuXHJcblx0XHRcdC8vIE9ubHkgc2Nyb2xsIGlmIG1hcmtlciBpc24ndCBhbHJlYWR5IHZpc2libGVcclxuXHRcdFx0aWYgKHNjcm9sbFRvID4gc2Nyb2xsVG9wIHx8IHNjcm9sbFRvICsgZWRpdG9ySGVpZ2h0IDwgc2Nyb2xsVG9wKSB7XHJcblx0XHRcdFx0d3lzaXd5Z0JvZHkuc2Nyb2xsVG9wID0gc2Nyb2xsVG87XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoZmFsc2UpO1xyXG5cdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHJcblx0XHRcdC8vIEFkZCBhIG5ldyBsaW5lIGFmdGVyIHRoZSBsYXN0IGJsb2NrIGVsZW1lbnRcclxuXHRcdFx0Ly8gc28gY2FuIGFsd2F5cyBhZGQgdGV4dCBhZnRlciBpdFxyXG5cdFx0XHRhcHBlbmROZXdMaW5lKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBleGNlcHQgaXQgd2lsbCBjb252ZXJ0IGFueSBIVE1MXHJcblx0XHQgKiBpbnRvIHRleHQgYmVmb3JlIGluc2VydGluZyBpdC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRUZXh0PW51bGxdXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0XHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpIHtcclxuXHRcdFx0ZW1sRWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRcdGVzY2FwZS5lbnRpdGllcyh0ZXh0KSwgZXNjYXBlLmVudGl0aWVzKGVuZFRleHQpXHJcblx0XHRcdCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyB0ZXh0IGludG8gdGhlIFdZU0lXWUcgb3Igc291cmNlIGVkaXRvciBkZXBlbmRpbmcgb24gd2hpY2hcclxuXHRcdCAqIG1vZGUgdGhlIGVkaXRvciBpcyBpbi5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0XHQgKiB0ZXh0IGFuZCBlbmRUZXh0LiBJZiBubyB0ZXh0IGlzIHNlbGVjdGVkIHRleHQgYW5kIGVuZFRleHQgd2lsbFxyXG5cdFx0ICoganVzdCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRUZXh0PW51bGxdXHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaW5zZXJ0VGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0XHRpZiAoZW1sRWRpdG9yLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0ZW1sRWRpdG9yLnNvdXJjZUVkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZW1sRWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQsIGVuZFRleHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBwYXN0ZWQgZGF0YSwgZmlsdGVycyBpdCBhbmQgdGhlbiBpbnNlcnRzIGl0LlxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZVBhc3RlRGF0YSA9IChkYXRhOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IHBhc3RlQXJlYSA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGVSYXcnLCBkYXRhKTtcclxuXHRcdFx0ZG9tLnRyaWdnZXIoZWRpdG9yQ29udGFpbmVyLCAncGFzdGVyYXcnLCBkYXRhKTtcclxuXHJcblx0XHRcdGlmIChkYXRhLmh0bWwpIHtcclxuXHRcdFx0XHQvLyBTYW5pdGl6ZSBhZ2FpbiBpbiBjYXNlIHBsdWdpbnMgbW9kaWZpZWQgdGhlIEhUTUxcclxuXHRcdFx0XHRwYXN0ZUFyZWEuaW5uZXJIVE1MID0gc2FuaXRpemUoZGF0YS5odG1sKTtcclxuXHJcblx0XHRcdFx0Ly8gZml4IGFueSBpbnZhbGlkIG5lc3RpbmdcclxuXHRcdFx0XHRkb20uZml4TmVzdGluZyhwYXN0ZUFyZWEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBlc2NhcGUuZW50aXRpZXMoZGF0YS50ZXh0IHx8ICcnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHBhc3RlOiBhbnkgPSB7XHJcblx0XHRcdFx0dmFsOiBwYXN0ZUFyZWEuaW5uZXJIVE1MXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdHBhc3RlLnZhbCA9IGZvcm1hdFxyXG5cdFx0XHRcdFx0LmZyYWdtZW50VG9Tb3VyY2UocGFzdGUudmFsLCB3eXNpd3lnRG9jdW1lbnQsIGN1cnJlbnROb2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZScsIHBhc3RlKTtcclxuXHRcdFx0ZG9tLnRyaWdnZXIoZWRpdG9yQ29udGFpbmVyLCAncGFzdGUnLCBwYXN0ZSk7XHJcblxyXG5cdFx0XHRpZiAoJ2ZyYWdtZW50VG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHRwYXN0ZS52YWwgPSBmb3JtYXRcclxuXHRcdFx0XHRcdC5mcmFnbWVudFRvSHRtbChwYXN0ZS52YWwsIGN1cnJlbnROb2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZUh0bWwnLCBwYXN0ZSk7XHJcblxyXG5cdFx0XHRsZXQgcGFyZW50ID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cdFx0XHRlbWxFZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwocGFzdGUudmFsLCBudWxsLCB0cnVlKTtcclxuXHRcdFx0ZG9tLm1lcmdlKHBhcmVudCk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgYnV0IGluc2VydHMgdGV4dCBpbnRvIHRoZVxyXG5cdFx0ICogc291cmNlIG1vZGUgZWRpdG9yIGluc3RlYWQuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kVGV4dCBpcyBzcGVjaWZpZWQgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWQgYmV0d2VlblxyXG5cdFx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHRcdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBhZnRlciB0aGUgdGV4dCBwYXJhbS4gSWYgZW5kVGV4dCBpc1xyXG5cdFx0ICogc3BlY2lmaWVkIHRoZSBjdXJzb3Igd2lsbCBiZSBwbGFjZWQgYmVmb3JlIGVuZFRleHQsIHNvIHBhc3Npbmc6PGJyIC8+XHJcblx0XHQgKlxyXG5cdFx0ICogJ1tiXScsICdbL2JdJ1xyXG5cdFx0ICpcclxuXHRcdCAqIFdvdWxkIGNhdXNlIHRoZSBjdXJzb3IgdG8gYmUgcGxhY2VkOjxiciAvPlxyXG5cdFx0ICpcclxuXHRcdCAqIFtiXVNlbGVjdGVkIHRleHR8Wy9iXVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHRcdCAqIEBzaW5jZSAxLjQuMFxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JJbnNlcnRUZXh0XHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3Iuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcsIGVuZFRleHQ6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0XHRsZXQgc2Nyb2xsVG9wLCBjdXJyZW50VmFsdWUsIHN0YXJ0UG9zID0gc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LCBlbmRQb3MgPSBzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kO1xyXG5cclxuXHRcdFx0c2Nyb2xsVG9wID0gc291cmNlRWRpdG9yLnNjcm9sbFRvcDtcclxuXHRcdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHRcdGN1cnJlbnRWYWx1ZSA9IHNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRcdGlmIChlbmRUZXh0KSB7XHJcblx0XHRcdFx0dGV4dCArPSBjdXJyZW50VmFsdWUuc3Vic3RyaW5nKHN0YXJ0UG9zLCBlbmRQb3MpICsgZW5kVGV4dDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c291cmNlRWRpdG9yLnZhbHVlID0gY3VycmVudFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgK1xyXG5cdFx0XHRcdHRleHQgK1xyXG5cdFx0XHRcdGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBjdXJyZW50VmFsdWUubGVuZ3RoKTtcclxuXHJcblx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCA9IChzdGFydFBvcyArIHRleHQubGVuZ3RoKSAtXHJcblx0XHRcdFx0KGVuZFRleHQgPyBlbmRUZXh0Lmxlbmd0aCA6IDApO1xyXG5cdFx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0O1xyXG5cclxuXHRcdFx0c291cmNlRWRpdG9yLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuXHRcdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhlIHJhbmdlSGVscGVyIGNsYXNzXHJcblx0XHQgKiBmb3IgdGhlIGVkaXRvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtSYW5nZUhlbHBlcn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0UmFuZ2VIZWxwZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5nZXRSYW5nZUhlbHBlciA9IGZ1bmN0aW9uICgpOiBSYW5nZUhlbHBlciB7XHJcblx0XHRcdHJldHVybiByYW5nZUhlbHBlcjtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyBvciBzZXRzIHRoZSBzb3VyY2UgZWRpdG9yIGNhcmV0IHBvc2l0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBbcG9zaXRpb25dXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAc2luY2UgMS40LjVcclxuXHRcdCAqIEBuYW1lIHNvdXJjZUVkaXRvckNhcmV0XHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3Iuc291cmNlRWRpdG9yQ2FyZXQgPSBmdW5jdGlvbiAocG9zaXRpb246IGFueSk6IGFueSB7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0aWYgKHBvc2l0aW9uKSB7XHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gcG9zaXRpb24uc3RhcnQ7XHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZCA9IHBvc2l0aW9uLmVuZDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c3RhcnQ6IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCxcclxuXHRcdFx0XHRlbmQ6IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblxyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgSFRNTC9CQkNvZGUgaW50byB0aGUgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kIGlzIHN1cHBsaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHRcdCAqIHN0YXJ0IGFuZCBlbmQuIElmIHRoZXJlIGlzIG5vIHNlbGVjdGVkIHRleHQgc3RhcnQgYW5kIGVuZFxyXG5cdFx0ICogd2lsbCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB0aGUgZmlsdGVyIHBhcmFtIGlzIHNldCB0byB0cnVlLCB0aGUgSFRNTC9CQkNvZGUgd2lsbCBiZVxyXG5cdFx0ICogcGFzc2VkIHRocm91Z2ggYW55IHBsdWdpbiBmaWx0ZXJzLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdFx0ICogdGhpcyB3aWxsIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdGhlIGFsbG93TWl4ZWQgcGFyYW0gaXMgc2V0IHRvIHRydWUsIEhUTUwgYW55IHdpbGwgbm90IGJlXHJcblx0XHQgKiBlc2NhcGVkXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0XHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZD1udWxsXVxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtjb252ZXJ0RW1vdGljb25zPXRydWVdIElmIHRvIGNvbnZlcnQgZW1vdGljb25zXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxvd01peGVkPWZhbHNlXVxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnReMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuXHRcdGVtbEVkaXRvci5pbnNlcnQgPSBmdW5jdGlvbiAoXHJcblx0XHRcdHN0YXJ0OiBzdHJpbmcsIGVuZDogc3RyaW5nLCBmaWx0ZXI6IGJvb2xlYW4sIGNvbnZlcnRFbW90aWNvbnM6IGJvb2xlYW4sIGFsbG93TWl4ZWQ6IGJvb2xlYW5cclxuXHRcdCk6IGFueSB7XHJcblx0XHRcdGlmIChlbWxFZGl0b3IuaW5Tb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHRlbWxFZGl0b3Iuc291cmNlRWRpdG9ySW5zZXJ0VGV4dChzdGFydCwgZW5kKTtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBzZWxlY3Rpb24gYmV0d2VlbiBzdGFydCBhbmQgZW5kXHJcblx0XHRcdGlmIChlbmQpIHtcclxuXHRcdFx0XHRsZXQgaHRtbCA9IHJhbmdlSGVscGVyLnNlbGVjdGVkSHRtbCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb1NvdXJjZScgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0XHRodG1sID0gZm9ybWF0XHJcblx0XHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKGh0bWwsIHd5c2l3eWdEb2N1bWVudCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c3RhcnQgKz0gaHRtbCArIGVuZDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBUT0RPOiBUaGlzIGZpbHRlciBzaG91bGQgYWxsb3cgZW1wdHkgdGFncyBhcyBpdCdzIGluc2VydGluZy5cclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHRzdGFydCA9IGZvcm1hdC5mcmFnbWVudFRvSHRtbChzdGFydCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDb252ZXJ0IGFueSBlc2NhcGVkIEhUTUwgYmFjayBpbnRvIEhUTUwgaWYgbWl4ZWQgaXMgYWxsb3dlZFxyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiBhbGxvd01peGVkID09PSB0cnVlKSB7XHJcblx0XHRcdFx0c3RhcnQgPSBzdGFydC5yZXBsYWNlKC8mbHQ7L2csICc8JylcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbWxFZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoc3RhcnQpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBIVE1MIHZhbHVlLlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIHVzaW5nIGEgcGx1Z2luIHRoYXQgZmlsdGVycyB0aGUgSHQgTWwgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdFx0ICogaXQgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlsdGVyaW5nIChCQkNvZGUpIHVubGVzcyB0aGVcclxuXHRcdCAqIGZpbHRlciBwYXJhbSBpcyBzZXQgdG8gZmFsc2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGdldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uIChmaWx0ZXI6IGJvb2xlYW4pOiBzdHJpbmcge1xyXG5cdFx0XHRsZXQgaHRtbDtcclxuXHRcdFx0Ly8gQ3JlYXRlIGEgdG1wIG5vZGUgdG8gc3RvcmUgY29udGVudHMgc28gaXQgY2FuIGJlIG1vZGlmaWVkXHJcblx0XHRcdC8vIHdpdGhvdXQgYWZmZWN0aW5nIGFueXRoaW5nIGVsc2UuXHJcblx0XHRcdGxldCB0bXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdGxldCBjaGlsZE5vZGVzID0gd3lzaXd5Z0JvZHkuY2hpbGROb2RlcztcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0bXAsIGNoaWxkTm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCB0bXApO1xyXG5cdFx0XHRkb20uZml4TmVzdGluZyh0bXApO1xyXG5cdFx0XHRkb20ucmVtb3ZlKHRtcCk7XHJcblxyXG5cdFx0XHRodG1sID0gdG1wLmlubmVySFRNTDtcclxuXHJcblx0XHRcdC8vIGZpbHRlciB0aGUgSFRNTCBhbmQgRE9NIHRocm91Z2ggYW55IHBsdWdpbnNcclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZvcm1hdCwgJ3RvU291cmNlJykpIHtcclxuXHRcdFx0XHRodG1sID0gZm9ybWF0LnRvU291cmNlKGh0bWwsIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBodG1sO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAc2luY2UgMS40LjNcclxuXHRcdCAqIEBuYW1lIGdldEJvZHlcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5nZXRCb2R5ID0gZnVuY3Rpb24gKCk6IEhUTUxCb2R5RWxlbWVudCB7XHJcblx0XHRcdHJldHVybiB3eXNpd3lnQm9keTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcnMgY29udGFpbmVyIGFyZWEgKHdob2xlIGlGcmFtZSkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICogQG5hbWUgZ2V0Q29udGVudEFyZWFDb250YWluZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5nZXRDb250ZW50QXJlYUNvbnRhaW5lciA9IGZ1bmN0aW9uICgpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRcdHJldHVybiB3eXNpd3lnRWRpdG9yO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbW1hbmRcclxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IFtwYXJhbV1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZXhlY0NvbW1hbmRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5leGVjQ29tbWFuZCA9IGZ1bmN0aW9uIChjb21tYW5kOiBzdHJpbmcsIHBhcmFtOiBhbnkpOiB2b2lkIHtcclxuXHRcdFx0bGV0IGV4ZWN1dGVkID0gZmFsc2UsIGNvbW1hbmRPYmogPSBlbWxFZGl0b3IuY29tbWFuZHNbY29tbWFuZF07XHJcblxyXG5cdFx0XHRlbWxFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRcdC8vIFRPRE86IG1ha2UgY29uZmlndXJhYmxlXHJcblx0XHRcdC8vIGRvbid0IGFwcGx5IGFueSBjb21tYW5kcyB0byBjb2RlIGVsZW1lbnRzXHJcblx0XHRcdGlmIChkb20uY2xvc2VzdChyYW5nZUhlbHBlci5wYXJlbnROb2RlKCksICdjb2RlJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0ZXhlY3V0ZWQgPSB3eXNpd3lnRG9jdW1lbnQuZXhlY0NvbW1hbmQoY29tbWFuZCwgZmFsc2UsIHBhcmFtKTtcclxuXHRcdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdFx0Ly8gc2hvdyBlcnJvciBpZiBleGVjdXRpb24gZmFpbGVkIGFuZCBhbiBlcnJvciBtZXNzYWdlIGV4aXN0c1xyXG5cdFx0XHRpZiAoIWV4ZWN1dGVkICYmIGNvbW1hbmRPYmogJiYgY29tbWFuZE9iai5lcnJvck1lc3NhZ2UpIHtcclxuXHRcdFx0XHRhbGVydChlbWxFZGl0b3IudHJhbnNsYXRlKGNvbW1hbmRPYmouZXJyb3JNZXNzYWdlKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBjdXJyZW50IG5vZGUgdGhhdCBjb250YWlucyB0aGUgc2VsZWN0aW9uL2NhcmV0IGluXHJcblx0XHQgKiBXWVNJV1lHIG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gez9Ob2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjdXJyZW50Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmN1cnJlbnROb2RlID0gZnVuY3Rpb24gKCk6IGFueSB7XHJcblx0XHRcdHJldHVybiBjdXJyZW50Tm9kZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgZmlyc3QgYmxvY2sgbGV2ZWwgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZVxyXG5cdFx0ICogc2VsZWN0aW9uL2NhcmV0IGluIFdZU0lXWUcgbW9kZS5cclxuXHRcdCAqXHJcblx0XHQgKiBXaWxsIGJlIG51bGwgaW4gc291cmNlTW9kZSBvciBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7P05vZGV9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGN1cnJlbnRCbG9ja05vZGVcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjRcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmN1cnJlbnRCbG9ja05vZGUgPSBmdW5jdGlvbiAoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRCbG9ja05vZGU7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVHJhbnNsYXRlcyB0aGUgc3RyaW5nIGludG8gdGhlIGxvY2FsZSBsYW5ndWFnZS5cclxuXHRcdCAqXHJcblx0XHQgKiBSZXBsYWNlcyBhbnkgezB9LCB7MX0sIHsyfSwgZWN0LiB3aXRoIHRoZSBwYXJhbXMgcHJvdmlkZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG5cdFx0ICogQHBhcmFtIHsuLi5TdHJpbmd9IGFyZ3NcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgX1xyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0XHRsZXQgdW5kZWY6IGFueTtcclxuXHJcblx0XHRcdGlmIChsb2NhbGUgJiYgbG9jYWxlW2FyZ3NbMF1dKSB7XHJcblx0XHRcdFx0YXJnc1swXSA9IGxvY2FsZVthcmdzWzBdXTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGFyZ3NbMF0ucmVwbGFjZSgvXFx7KFxcZCspXFx9L2csIGZ1bmN0aW9uIChzdHI/OiBhbnksIHAxPzogYW55KSB7XHJcblx0XHRcdFx0cmV0dXJuIGFyZ3NbcDEgLSAwICsgMV0gIT09IHVuZGVmID9cclxuXHRcdFx0XHRcdGFyZ3NbcDEgLSAwICsgMV0gOlxyXG5cdFx0XHRcdFx0J3snICsgcDEgKyAnfSc7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEJpbmRzIGEgaGFuZGxlciB0byB0aGUgc3BlY2lmaWVkIGV2ZW50c1xyXG5cdFx0ICpcclxuXHRcdCAqIFRoaXMgZnVuY3Rpb24gb25seSBiaW5kcyB0byBhIGxpbWl0ZWQgbGlzdCBvZlxyXG5cdFx0ICogc3VwcG9ydGVkIGV2ZW50cy5cclxuXHRcdCAqXHJcblx0XHQgKiBUaGUgc3VwcG9ydGVkIGV2ZW50cyBhcmU6XHJcblx0XHQgKlxyXG5cdFx0ICogKiBrZXl1cFxyXG5cdFx0ICogKiBrZXlkb3duXHJcblx0XHQgKiAqIEtleXByZXNzXHJcblx0XHQgKiAqIGJsdXJcclxuXHRcdCAqICogZm9jdXNcclxuXHRcdCAqICogaW5wdXRcclxuXHRcdCAqICogbm9kZWNoYW5nZWQgLSBXaGVuIHRoZSBjdXJyZW50IG5vZGUgY29udGFpbmluZ1xyXG5cdFx0ICogXHRcdHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGVcclxuXHRcdCAqICogY29udGV4dG1lbnVcclxuXHRcdCAqICogc2VsZWN0aW9uY2hhbmdlZFxyXG5cdFx0ICogKiB2YWx1ZWNoYW5nZWRcclxuXHRcdCAqXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIGV2ZW50cyBwYXJhbSBzaG91bGQgYmUgYSBzdHJpbmcgY29udGFpbmluZyB0aGUgZXZlbnQocylcclxuXHRcdCAqIHRvIGJpbmQgdGhpcyBoYW5kbGVyIHRvLiBJZiBtdWx0aXBsZSwgdGhleSBzaG91bGQgYmUgc2VwYXJhdGVkXHJcblx0XHQgKiBieSBzcGFjZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBldmVudHNcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7RW1sRWRpdG9yfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBiaW5kXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5iaW5kID0gZnVuY3Rpb24gKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRsZXQgZXZlbnRzQXJyID0gZXZlbnRzLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRsZXQgaSA9IGV2ZW50c0Fyci5sZW5ndGg7XHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHRcdFx0bGV0IHd5c0V2ZW50ID0gJ2VtbHd5cycgKyBldmVudHNBcnJbaV07XHJcblx0XHRcdFx0XHRsZXQgc3JjRXZlbnQgPSAnZW1sc3JjJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHRcdC8vIFVzZSBjdXN0b20gZXZlbnRzIHRvIGFsbG93IHBhc3NpbmcgdGhlIGluc3RhbmNlIGFzIHRoZVxyXG5cdFx0XHRcdFx0Ly8gMm5kIGFyZ3VtZW50LlxyXG5cdFx0XHRcdFx0Ly8gQWxzbyBhbGxvd3MgdW5iaW5kaW5nIHdpdGhvdXQgdW5iaW5kaW5nIHRoZSBlZGl0b3JzIG93blxyXG5cdFx0XHRcdFx0Ly8gZXZlbnQgaGFuZGxlcnMuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdID0gZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gfHwgW107XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdLnB1c2goaGFuZGxlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdID0gZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0gfHwgW107XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdLnB1c2goaGFuZGxlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gU3RhcnQgc2VuZGluZyB2YWx1ZSBjaGFuZ2VkIGV2ZW50c1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50c0FycltpXSA9PT0gJ3ZhbHVlY2hhbmdlZCcpIHtcclxuXHRcdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZC5oYXNIYW5kbGVyID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFVuYmluZHMgYW4gZXZlbnQgdGhhdCB3YXMgYm91bmQgdXNpbmcgYmluZCgpLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSB1bmJpbmRpbmcgdGhpc1xyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSB1bmJpbmRpbmcgdGhpc1xyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSB1bmJpbmRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBzZWUgYmluZFxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRsZXQgZXZlbnRzQXJyID0gZXZlbnRzLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRsZXQgaSA9IGV2ZW50c0Fyci5sZW5ndGg7XHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlV3lzaXd5Zykge1xyXG5cdFx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0XHRldmVudEhhbmRsZXJzWydlbWx3eXMnICsgZXZlbnRzQXJyW2ldXSB8fCBbXSwgaGFuZGxlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHRcdHV0aWxzLmFycmF5UmVtb3ZlKFxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbJ2VtbHNyYycgKyBldmVudHNBcnJbaV1dIHx8IFtdLCBoYW5kbGVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgZG93biBldmVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUga2V5RG93blxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3Iua2V5RG93biA9IGZ1bmN0aW9uIChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gZW1sRWRpdG9yLmJpbmQoJ2tleWRvd24nLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBwcmVzcyBldmVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUga2V5UHJlc3NcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLmtleVByZXNzID0gZnVuY3Rpb24gKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHRcdFx0LmJpbmQoJ2tleXByZXNzJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgdXAgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGtleVVwXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5rZXlVcCA9IGZ1bmN0aW9uIChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gZW1sRWRpdG9yLmJpbmQoJ2tleXVwJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgbm9kZSBjaGFuZ2VkIGV2ZW50LlxyXG5cdFx0ICpcclxuXHRcdCAqIEhhcHBlbnMgd2hlbmV2ZXIgdGhlIG5vZGUgY29udGFpbmluZyB0aGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0XHQgKiBjaGFuZ2VzIGluIFdZU0lXWUcgbW9kZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgbm9kZUNoYW5nZWRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLm5vZGVDaGFuZ2VkID0gZnVuY3Rpb24gKGhhbmRsZXI6IEZ1bmN0aW9uKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIGVtbEVkaXRvci5iaW5kKCdub2RlY2hhbmdlZCcsIGhhbmRsZXIsIGZhbHNlLCB0cnVlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgc2VsZWN0aW9uIGNoYW5nZWQgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdGlvbkNoYW5nZWRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLnNlbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gZW1sRWRpdG9yLmJpbmQoJ3NlbGVjdGlvbmNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHZhbHVlIGNoYW5nZWQgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBjdXJyZW50IGVkaXRvciB2YWx1ZSBjaGFuZ2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdFx0ICogMS41IHNlY3MgYWZ0ZXIgdGV4dCBpcyB0eXBlZC4gSWYgYSBzcGFjZSBpcyB0eXBlZCBpdCB3aWxsXHJcblx0XHQgKiBjYXVzZSB0aGUgZXZlbnQgdG8gYmUgdHJpZ2dlcmVkIGltbWVkaWF0ZWx5IGluc3RlYWQgb2ZcclxuXHRcdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjVcclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLnZhbHVlQ2hhbmdlZCA9IGZ1bmN0aW9uIChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHRcdC5iaW5kKCd2YWx1ZWNoYW5nZWQnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgY3VycmVudCBXWVNJV1lHIGVkaXRvcnMgaW5saW5lIENTU1xyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY3NzXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKi9cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gY3NzXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjc3NeMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IuY3NzID0gZnVuY3Rpb24gKGNzczogc3RyaW5nKTogYW55IHtcclxuXHRcdFx0aWYgKCFpbmxpbmVDc3MpIHtcclxuXHRcdFx0XHRpbmxpbmVDc3MgPSBkb20uY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7XHJcblx0XHRcdFx0XHRpZDogJ2lubGluZSdcclxuXHRcdFx0XHR9LCB3eXNpd3lnRG9jdW1lbnQpIGFzIEhUTUxTdHlsZUVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3eXNpd3lnRG9jdW1lbnQuaGVhZCwgaW5saW5lQ3NzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCF1dGlscy5pc1N0cmluZyhjc3MpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGlubGluZUNzcy5zaGVldCA/XHJcblx0XHRcdFx0XHRpbmxpbmVDc3MuaW5uZXJUZXh0IDogaW5saW5lQ3NzLmlubmVySFRNTDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGlubGluZUNzcy5zaGVldCkge1xyXG5cdFx0XHRcdGlubGluZUNzcy5pbm5lclRleHQgPSBjc3M7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlcyBhIHNob3J0Y3V0IGhhbmRsZXJcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gc2hvcnRjdXRcclxuXHRcdCAqIEByZXR1cm4ge0VtbEVkaXRvcn1cclxuXHRcdCAqL1xyXG5cdFx0ZW1sRWRpdG9yLnJlbW92ZVNob3J0Y3V0ID0gZnVuY3Rpb24gKHNob3J0Y3V0OiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0XHRkZWxldGUgc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBzaG9ydGN1dCBoYW5kbGVyIHRvIHRoZSBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgc2hvcnRjdXRcclxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gY21kXHJcblx0XHQgKiBAcmV0dXJuIHtlbWxlZGl0b3J9XHJcblx0XHQgKi9cclxuXHRcdGVtbEVkaXRvci5hZGRTaG9ydGN1dCA9IGZ1bmN0aW9uIChzaG9ydGN1dDogc3RyaW5nLCBjbWQ6IHN0cmluZyB8IEZ1bmN0aW9uKTogYW55IHtcclxuXHRcdFx0c2hvcnRjdXQgPSBzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXHJcblx0XHRcdGxldCBzaG9ydGN1dEtleSA9IHNob3J0Y3V0IGFzIGtleW9mIHR5cGVvZiBzaG9ydGN1dEhhbmRsZXJzO1xyXG5cclxuXHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKGNtZCkpIHtcclxuXHRcdFx0XHRsZXQgc3RyQ21kID0gY21kIGFzIHN0cmluZztcclxuXHRcdFx0XHRzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0S2V5XSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGhhbmRsZUNvbW1hbmQodG9vbGJhckJ1dHRvbnNbc3RyQ21kXSwgZW1sRWRpdG9yLmNvbW1hbmRzW3N0ckNtZF0pO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRLZXldID0gY21kO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhcnMgdGhlIGZvcm1hdHRpbmcgb2YgdGhlIHBhc3NlZCBibG9jayBlbGVtZW50LlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGJsb2NrIGlzIGZhbHNlLCBpZiB3aWxsIGNsZWFyIHRoZSBzdHlsaW5nIG9mIHRoZSBmaXJzdFxyXG5cdFx0ICogYmxvY2sgbGV2ZWwgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBjdXJzb3IuXHJcblx0XHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gYmxvY2tcclxuXHRcdCAqIEBzaW5jZSAxLjQuNFxyXG5cdFx0ICovXHJcblx0XHRlbWxFZGl0b3IuY2xlYXJCbG9ja0Zvcm1hdHRpbmcgPSBmdW5jdGlvbiAoYmxvY2s6IEhUTUxFbGVtZW50KTogYW55IHtcclxuXHRcdFx0YmxvY2sgPSBibG9jayB8fCBjdXJyZW50U3R5bGVkQmxvY2tOb2RlKCk7XHJcblxyXG5cdFx0XHRpZiAoIWJsb2NrIHx8IGRvbS5pcyhibG9jaywgJ2JvZHknKSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdGJsb2NrLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuXHRcdFx0ZG9tLmF0dHIoYmxvY2ssICdzdHlsZScsICcnKTtcclxuXHJcblx0XHRcdGlmICghZG9tLmlzKGJsb2NrLCAncCxkaXYsdGQnKSkge1xyXG5cdFx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChibG9jaywgJ3AnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdCA9ICgpID0+IHtcclxuXHRcdFx0dGV4dGFyZWEuX2VtbGVkaXRvciA9IHRoaXM7XHJcblxyXG5cdFx0XHQvLyBMb2FkIGxvY2FsZVxyXG5cdFx0XHRpZiAob3B0aW9ucy5sb2NhbGUgJiYgb3B0aW9ucy5sb2NhbGUgIT09ICdlbicpIHtcclxuXHRcdFx0XHRpbml0TG9jYWxlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVkaXRvckNvbnRhaW5lciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWNvbnRhaW5lcicsXHJcblx0XHRcdH0pIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdFx0ZG9tLmluc2VydEJlZm9yZShlZGl0b3JDb250YWluZXIsIHRleHRhcmVhKTtcclxuXHRcdFx0ZG9tLmNzcyhlZGl0b3JDb250YWluZXIsICd6LWluZGV4Jywgb3B0aW9ucy56SW5kZXgpO1xyXG5cclxuXHRcdFx0aXNSZXF1aXJlZCA9IHRleHRhcmVhLnJlcXVpcmVkO1xyXG5cdFx0XHR0ZXh0YXJlYS5yZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0bGV0IEZvcm1hdEN0b3IgPSBFbWxFZGl0b3IuZm9ybWF0c1tvcHRpb25zLmZvcm1hdF07XHJcblx0XHRcdGZvcm1hdCA9IEZvcm1hdEN0b3IgPyBuZXcgRm9ybWF0Q3RvcigpIDoge307XHJcblx0XHRcdC8qXHJcblx0XHRcdCAqIFBsdWdpbnMgc2hvdWxkIGJlIGluaXRpYWxpemVkIGJlZm9yZSB0aGUgZm9ybWF0dGVycyBzaW5jZVxyXG5cdFx0XHQgKiB0aGV5IG1heSB3aXNoIHRvIGFkZCBvciBjaGFuZ2UgZm9ybWF0dGluZyBoYW5kbGVycyBhbmRcclxuXHRcdFx0ICogc2luY2UgdGhlIGJiY29kZSBmb3JtYXQgY2FjaGVzIGl0cyBoYW5kbGVycyxcclxuXHRcdFx0ICogc3VjaCBjaGFuZ2VzIG11c3QgYmUgZG9uZSBmaXJzdC5cclxuXHRcdFx0ICovXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIgPSBuZXcgUGx1Z2luTWFuYWdlcih0aGlzKTtcclxuXHRcdFx0KG9wdGlvbnMucGx1Z2lucyB8fCAnJykuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW46IGFueSkge1xyXG5cdFx0XHRcdHBsdWdpbk1hbmFnZXIucmVnaXN0ZXIocGx1Z2luLnRyaW0oKSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoJ2luaXQnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdChmb3JtYXQgYXMgYW55KS5pbml0LmNhbGwodGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGNyZWF0ZSB0aGUgZWRpdG9yXHJcblx0XHRcdGluaXRFbW90aWNvbnMoKTtcclxuXHRcdFx0aW5pdFRvb2xCYXIoKTtcclxuXHRcdFx0aW5pdEVkaXRvcigpO1xyXG5cdFx0XHRpbml0T3B0aW9ucygpO1xyXG5cdFx0XHRpbml0RXZlbnRzKCk7XHJcblxyXG5cdFx0XHQvLyBmb3JjZSBpbnRvIHNvdXJjZSBtb2RlIGlmIGlzIGEgYnJvd3NlciB0aGF0IGNhbid0IGhhbmRsZVxyXG5cdFx0XHQvLyBmdWxsIGVkaXRpbmdcclxuXHRcdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCkge1xyXG5cdFx0XHRcdGVtbEVkaXRvci50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHRcdGxldCBsb2FkZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZG9tLm9mZihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0XHRhdXRvZm9jdXMoISFvcHRpb25zLmF1dG9mb2N1c0VuZCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhdXRvRXhwYW5kKCk7XHJcblx0XHRcdFx0YXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0XHRcdC8vIFRPRE86IHVzZSBlZGl0b3IgZG9jIGFuZCB3aW5kb3c/XHJcblx0XHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdyZWFkeScpO1xyXG5cdFx0XHRcdGlmICgnb25SZWFkeScgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0XHRmb3JtYXQub25SZWFkeS5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbFdpbiwgJ2xvYWQnLCBudWxsLCBsb2FkZWQpO1xyXG5cdFx0XHRpZiAoZ2xvYmFsRG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0XHRsb2FkZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluaXQgdGhlIGxvY2FsZSB2YXJpYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbG9jYWxlIGlmIHBvc3NpYmxlXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHJldHVybiB2b2lkXHJcblx0XHQgKi9cclxuXHRcdGluaXRMb2NhbGUgPSAoKSA9PiB7XHJcblx0XHRcdGxldCBsYW5nO1xyXG5cclxuXHRcdFx0bG9jYWxlID0gRW1sRWRpdG9yLmxvY2FsZVtvcHRpb25zLmxvY2FsZV07XHJcblxyXG5cdFx0XHRpZiAoIWxvY2FsZSkge1xyXG5cdFx0XHRcdGxhbmcgPSBvcHRpb25zLmxvY2FsZS5zcGxpdCgnLScpO1xyXG5cdFx0XHRcdGxvY2FsZSA9IEVtbEVkaXRvci5sb2NhbGVbbGFuZ1swXV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExvY2FsZSBEYXRlVGltZSBmb3JtYXQgb3ZlcnJpZGVzIGFueSBzcGVjaWZpZWQgaW4gdGhlIG9wdGlvbnNcclxuXHRcdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGUuZGF0ZUZvcm1hdCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZGF0ZUZvcm1hdCA9IGxvY2FsZS5kYXRlRm9ybWF0O1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGlmcmFtZSBhbmQgdGV4dGFyZWFcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGluaXRFZGl0b3IgPSAoKSA9PiB7XHJcblx0XHRcdHNvdXJjZUVkaXRvciA9IGRvbS5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScsIG51bGwpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblx0XHRcdHd5c2l3eWdFZGl0b3IgPSBkb20uY3JlYXRlRWxlbWVudCgnaWZyYW1lJywge1xyXG5cdFx0XHRcdGZyYW1lYm9yZGVyOiBcIjBcIixcclxuXHRcdFx0XHRhbGxvd2Z1bGxzY3JlZW46IFwidHJ1ZVwiXHJcblx0XHRcdH0pIGFzIEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuXHRcdFx0LypcclxuXHRcdFx0ICogVGhpcyBuZWVkcyB0byBiZSBkb25lIHJpZ2h0IGFmdGVyIHRoZXkgYXJlIGNyZWF0ZWQgYmVjYXVzZSxcclxuXHRcdFx0ICogZm9yIGFueSByZWFzb24sIHRoZSB1c2VyIG1heSBub3Qgd2FudCB0aGUgdmFsdWUgdG8gYmUgdGlua2VyZWRcclxuXHRcdFx0ICogYnkgYW55IGZpbHRlcnMuXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zdGFydEluU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJyk7XHJcblx0XHRcdFx0ZG9tLmhpZGUod3lzaXd5Z0VkaXRvcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3d5c2l3eWdNb2RlJyk7XHJcblx0XHRcdFx0ZG9tLmhpZGUoc291cmNlRWRpdG9yKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFvcHRpb25zLnNwZWxsY2hlY2spIHtcclxuXHRcdFx0XHRkb20uYXR0cihlZGl0b3JDb250YWluZXIsICdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChnbG9iYWxXaW4ubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonKSB7XHJcblx0XHRcdFx0ZG9tLmF0dHIod3lzaXd5Z0VkaXRvciwgJ3NyYycsICdhYm91dDpibGFuaycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIGVkaXRvciB0byB0aGUgY29udGFpbmVyXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIHd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBzb3VyY2VFZGl0b3IpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogbWFrZSB0aGlzIG9wdGlvbmFsIHNvbWVob3dcclxuXHRcdFx0ZW1sRWRpdG9yLmRpbWVuc2lvbnMoXHJcblx0XHRcdFx0b3B0aW9ucy53aWR0aCB8fCBkb20ud2lkdGgodGV4dGFyZWEpLFxyXG5cdFx0XHRcdG9wdGlvbnMuaGVpZ2h0IHx8IGRvbS5oZWlnaHQodGV4dGFyZWEpXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHQvLyBBZGQgaW9zIHRvIEhUTUwgc28gY2FuIGFwcGx5IENTUyBmaXggdG8gb25seSBpdFxyXG5cdFx0XHRsZXQgY2xhc3NOYW1lID0gYnJvd3Nlci5pb3MgPyAnIGlvcycgOiAnJztcclxuXHJcblx0XHRcdHd5c2l3eWdEb2N1bWVudCA9IHd5c2l3eWdFZGl0b3IuY29udGVudERvY3VtZW50O1xyXG5cdFx0XHR3eXNpd3lnRG9jdW1lbnQub3BlbigpO1xyXG5cdFx0XHR3eXNpd3lnRG9jdW1lbnQud3JpdGUodGVtcGxhdGVzKCdodG1sJywge1xyXG5cdFx0XHRcdGF0dHJzOiAnIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIicsXHJcblx0XHRcdFx0c3BlbGxjaGVjazogb3B0aW9ucy5zcGVsbGNoZWNrID8gJycgOiAnc3BlbGxjaGVjaz1cImZhbHNlXCInLFxyXG5cdFx0XHRcdGNoYXJzZXQ6IG9wdGlvbnMuY2hhcnNldCxcclxuXHRcdFx0XHRzdHlsZTogb3B0aW9ucy5zdHlsZVxyXG5cdFx0XHR9KSk7XHJcblx0XHRcdHd5c2l3eWdEb2N1bWVudC5jbG9zZSgpO1xyXG5cclxuXHRcdFx0d3lzaXd5Z0JvZHkgPSB3eXNpd3lnRG9jdW1lbnQuYm9keSBhcyBIVE1MQm9keUVsZW1lbnQ7XHJcblx0XHRcdHd5c2l3eWdXaW5kb3cgPSB3eXNpd3lnRWRpdG9yLmNvbnRlbnRXaW5kb3c7XHJcblxyXG5cdFx0XHRlbWxFZGl0b3IucmVhZE9ubHkoISFvcHRpb25zLnJlYWRPbmx5KTtcclxuXHJcblx0XHRcdC8vIGlmcmFtZSBvdmVyZmxvdyBmaXggZm9yIGlPU1xyXG5cdFx0XHRpZiAoYnJvd3Nlci5pb3MpIHtcclxuXHRcdFx0XHRkb20uaGVpZ2h0KHd5c2l3eWdCb2R5LCAnMTAwJScpO1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ3RvdWNoZW5kJywgbnVsbCwgZW1sRWRpdG9yLmZvY3VzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhYkluZGV4ID0gZG9tLmF0dHIodGV4dGFyZWEsICd0YWJpbmRleCcpO1xyXG5cdFx0XHRkb20uYXR0cihzb3VyY2VFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHRcdFx0ZG9tLmF0dHIod3lzaXd5Z0VkaXRvciwgJ3RhYmluZGV4JywgdGFiSW5kZXgpO1xyXG5cclxuXHRcdFx0cmFuZ2VIZWxwZXIgPSBuZXcgUmFuZ2VIZWxwZXIod3lzaXd5Z1dpbmRvdywgbnVsbCwgc2FuaXRpemUpO1xyXG5cclxuXHRcdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRcdGRvbS5oaWRlKHRleHRhcmVhKTtcclxuXHRcdFx0ZW1sRWRpdG9yLnZhbCh0ZXh0YXJlYS52YWx1ZSk7XHJcblxyXG5cdFx0XHRsZXQgcGxhY2Vob2xkZXIgPSBvcHRpb25zLnBsYWNlaG9sZGVyIHx8XHJcblx0XHRcdFx0ZG9tLmF0dHIodGV4dGFyZWEsICdwbGFjZWhvbGRlcicpO1xyXG5cclxuXHRcdFx0aWYgKHBsYWNlaG9sZGVyKSB7XHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XHJcblx0XHRcdFx0ZG9tLmF0dHIod3lzaXd5Z0JvZHksICdwbGFjZWhvbGRlcicsIHBsYWNlaG9sZGVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluaXRpYWxpc2VzIG9wdGlvbnNcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGluaXRPcHRpb25zID0gKCkgPT4ge1xyXG5cdFx0XHQvLyBhdXRvLXVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXIgaWYgb3B0aW9uIHNldCB0byB0cnVlXHJcblx0XHRcdGlmIChvcHRpb25zLmF1dG9VcGRhdGUpIHtcclxuXHRcdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgYXV0b1VwZGF0ZSk7XHJcblx0XHRcdFx0ZG9tLm9uKHNvdXJjZUVkaXRvciwgJ2JsdXInLCBudWxsLCBhdXRvVXBkYXRlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMucnRsID09PSBudWxsKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5ydGwgPSBkb20uY3NzKHNvdXJjZUVkaXRvciwgJ2RpcmVjdGlvbicpID09PSAncnRsJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZW1sRWRpdG9yLnJ0bCghIW9wdGlvbnMucnRsKTtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLmF1dG9FeHBhbmQpIHtcclxuXHRcdFx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB3aGVuIGltYWdlcyAob3IgYW55dGhpbmcgZWxzZSkgbG9hZHNcclxuXHRcdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdsb2FkJywgbnVsbCwgYXV0b0V4cGFuZCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2lucHV0IGtleXVwJywgbnVsbCwgYXV0b0V4cGFuZCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvcHRpb25zLnJlc2l6ZUVuYWJsZWQpIHtcclxuXHRcdFx0XHRpbml0UmVzaXplKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hdHRyKGVkaXRvckNvbnRhaW5lciwgJ2lkJywgb3B0aW9ucy5pZCk7XHJcblx0XHRcdGVtbEVkaXRvci5lbW90aWNvbnMob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbml0aWFsaXNlcyBldmVudHNcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGluaXRFdmVudHMgPSAoKSA9PiB7XHJcblx0XHRcdGxldCBmb3JtID0gdGV4dGFyZWEuZm9ybTtcclxuXHRcdFx0bGV0IGNvbXBvc2l0aW9uRXZlbnRzID0gJ2NvbXBvc2l0aW9uc3RhcnQgY29tcG9zaXRpb25lbmQnO1xyXG5cdFx0XHRsZXQgZXZlbnRzVG9Gb3J3YXJkID0gJ2tleWRvd24ga2V5dXAga2V5cHJlc3MgZm9jdXMgYmx1ciBjb250ZXh0bWVudSBpbnB1dCc7XHJcblx0XHRcdGxldCBjaGVja1NlbGVjdGlvbkV2ZW50cyA9ICdvbnNlbGVjdGlvbmNoYW5nZScgaW4gd3lzaXd5Z0RvY3VtZW50ID9cclxuXHRcdFx0XHQnc2VsZWN0aW9uY2hhbmdlJyA6XHJcblx0XHRcdFx0J2tleXVwIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgbW91c2V1cCB0b3VjaGVuZCBjbGljayc7XHJcblxyXG5cdFx0XHRkb20ub24oZ2xvYmFsRG9jLCAnY2xpY2snLCBudWxsLCBoYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHRcdGlmIChmb3JtKSB7XHJcblx0XHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIG51bGwsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdFx0ZG9tLm9uKGZvcm0sICdzdWJtaXQnLCBudWxsLCBlbWxFZGl0b3IudXBkYXRlT3JpZ2luYWwsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLm9uKHdpbmRvdywgJ3BhZ2VoaWRlJywgbnVsbCwgZW1sRWRpdG9yLnVwZGF0ZU9yaWdpbmFsKTtcclxuXHRcdFx0ZG9tLm9uKHdpbmRvdywgJ3BhZ2VzaG93JywgbnVsbCwgaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBudWxsLCBoYW5kbGVLZXlQcmVzcyk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleWRvd24nLCBudWxsLCBoYW5kbGVLZXlEb3duKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5ZG93bicsIG51bGwsIGhhbmRsZUJhY2tTcGFjZSk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXVwJywgbnVsbCwgYXBwZW5kTmV3TGluZSk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2JsdXInLCBudWxsLCB2YWx1ZUNoYW5nZWRCbHVyKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCB2YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ3Bhc3RlJywgbnVsbCwgaGFuZGxlUGFzdGVFdnQpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdjdXQgY29weScsIG51bGwsIGhhbmRsZUN1dENvcHlFdnQpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksIGNvbXBvc2l0aW9uRXZlbnRzLCBudWxsLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgY2hlY2tTZWxlY3Rpb25FdmVudHMsIG51bGwsIGNoZWNrU2VsZWN0aW9uQ2hhbmdlZCk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgZXZlbnRzVG9Gb3J3YXJkLCBudWxsLCBoYW5kbGVFdmVudCk7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNDb21wYXQgJiYgZ2xvYmFsV2luLmdldFNlbGVjdGlvbikge1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXVwJywgbnVsbCwgZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRpZiAoIWVtbEVkaXRvci52YWwoKSkge1xyXG5cdFx0XHRcdFx0ZG9tLmFkZENsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnZm9jdXMnLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRkb20ub24oc291cmNlRWRpdG9yLCAnYmx1cicsIG51bGwsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0XHRkb20ub24oc291cmNlRWRpdG9yLCAna2V5dXAnLCBudWxsLCB2YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdrZXlkb3duJywgbnVsbCwgaGFuZGxlS2V5RG93bik7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGNvbXBvc2l0aW9uRXZlbnRzLCBudWxsLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGV2ZW50c1RvRm9yd2FyZCwgbnVsbCwgaGFuZGxlRXZlbnQpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdEb2N1bWVudCwgJ21vdXNlZG93bicsIG51bGwsIGhhbmRsZU1vdXNlRG93bik7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBudWxsLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0RvY3VtZW50LCAna2V5dXAnLCBudWxsLCBhcHBlbmROZXdMaW5lKTtcclxuXHJcblx0XHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgY2hlY2tOb2RlQ2hhbmdlZCk7XHJcblx0XHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgdXBkYXRlQWN0aXZlQnV0dG9ucyk7XHJcblx0XHRcdC8vIEN1c3RvbSBldmVudHMgdG8gZm9yd2FyZFxyXG5cdFx0XHRkb20ub24oXHJcblx0XHRcdFx0ZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHRcdCdzZWxlY3Rpb25jaGFuZ2VkIHZhbHVlY2hhbmdlZCBub2RlY2hhbmdlZCBwYXN0ZXJhdyBwYXN0ZScsXHJcblx0XHRcdFx0bnVsbCxcclxuXHRcdFx0XHRoYW5kbGVFdmVudFxyXG5cdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgdGhlIHRvb2xiYXIgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIGNvbnRhaW5lclxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdFRvb2xCYXIgPSAoKSA9PiB7XHJcblx0XHRcdGxldCBlZGl0b3I6IGFueSA9IHRoaXM7XHJcblx0XHRcdGxldCBncm91cDogYW55O1xyXG5cdFx0XHRsZXQgY29tbWFuZHMgPSBlZGl0b3IuY29tbWFuZHM7XHJcblx0XHRcdGxldCBleGNsdWRlID0gKG9wdGlvbnMudG9vbGJhckV4Y2x1ZGUgfHwgJycpLnNwbGl0KCcsJyk7XHJcblx0XHRcdGxldCBncm91cHMgPSBvcHRpb25zLnRvb2xiYXIuc3BsaXQoJ3wnKTtcclxuXHJcblx0XHRcdHRvb2xiYXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0XHR1bnNlbGVjdGFibGU6ICdvbidcclxuXHRcdFx0fSkgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5pY29ucyBpbiBFbWxFZGl0b3IuaWNvbnMpIHtcclxuXHRcdFx0XHRpY29ucyA9IG5ldyBFbWxFZGl0b3IuaWNvbnNbb3B0aW9ucy5pY29uc10oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dXRpbHMuZWFjaChncm91cHMsIGZ1bmN0aW9uIChfLCBtZW51SXRlbXMpIHtcclxuXHRcdFx0XHRncm91cCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItZ3JvdXAnXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHV0aWxzLmVhY2gobWVudUl0ZW1zLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChfLCBjb21tYW5kTmFtZSkge1xyXG5cdFx0XHRcdFx0bGV0IGJ1dHRvbjogYW55LCBzaG9ydGN1dCwgY29tbWFuZCA9IGNvbW1hbmRzW2NvbW1hbmROYW1lXTtcclxuXHJcblx0XHRcdFx0XHQvLyBUaGUgY29tbWFuZE5hbWUgbXVzdCBiZSBhIHZhbGlkIGNvbW1hbmQgYW5kIG5vdCBleGNsdWRlZFxyXG5cdFx0XHRcdFx0aWYgKCFjb21tYW5kIHx8IGV4Y2x1ZGUuaW5kZXhPZihjb21tYW5kTmFtZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0c2hvcnRjdXQgPSBjb21tYW5kLnNob3J0Y3V0O1xyXG5cdFx0XHRcdFx0YnV0dG9uID0gdGVtcGxhdGVzKCd0b29sYmFyQnV0dG9uJywge1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0ZGlzcE5hbWU6IGVkaXRvci50cmFuc2xhdGUoY29tbWFuZC5uYW1lIHx8XHJcblx0XHRcdFx0XHRcdFx0Y29tbWFuZC50b29sdGlwIHx8IGNvbW1hbmROYW1lKVxyXG5cdFx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0XHRpZiAoaWNvbnMgJiYgaWNvbnMuY3JlYXRlKSB7XHJcblx0XHRcdFx0XHRcdGxldCBpY29uID0gaWNvbnMuY3JlYXRlKGNvbW1hbmROYW1lKTtcclxuXHRcdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGljb25zLmNyZWF0ZShjb21tYW5kTmFtZSksXHJcblx0XHRcdFx0XHRcdFx0XHRidXR0b24uZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidXR0b24uX2VtbFR4dE1vZGUgPSAhIWNvbW1hbmQudHh0RXhlYztcclxuXHRcdFx0XHRcdGJ1dHRvbi5fZW1sV3lzaXd5Z01vZGUgPSAhIWNvbW1hbmQuZXhlYztcclxuXHRcdFx0XHRcdGRvbS50b2dnbGVDbGFzcyhidXR0b24sICdkaXNhYmxlZCcsICFjb21tYW5kLmV4ZWMpO1xyXG5cdFx0XHRcdFx0ZG9tLm9uKGJ1dHRvbiwgJ2NsaWNrJywgbnVsbCwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCFkb20uaGFzQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZUNvbW1hbmQoYnV0dG9uLCBjb21tYW5kKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdC8vIFByZXZlbnQgZWRpdG9yIGxvc2luZyBmb2N1cyB3aGVuIGJ1dHRvbiBjbGlja2VkXHJcblx0XHRcdFx0XHRkb20ub24oYnV0dG9uLCAnbW91c2Vkb3duJywgbnVsbCwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24oKTtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbW1hbmQudG9vbHRpcCkge1xyXG5cdFx0XHRcdFx0XHRkb20uYXR0cihidXR0b24sICd0aXRsZScsXHJcblx0XHRcdFx0XHRcdFx0ZWRpdG9yLnRyYW5zbGF0ZShjb21tYW5kLnRvb2x0aXApICtcclxuXHRcdFx0XHRcdFx0XHQoc2hvcnRjdXQgPyAnICgnICsgc2hvcnRjdXQgKyAnKScgOiAnJylcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoc2hvcnRjdXQpIHtcclxuXHRcdFx0XHRcdFx0ZWRpdG9yLmFkZFNob3J0Y3V0KHNob3J0Y3V0LCBjb21tYW5kTmFtZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbW1hbmQuc3RhdGUpIHtcclxuXHRcdFx0XHRcdFx0YnRuU3RhdGVIYW5kbGVycy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZTogY29tbWFuZC5zdGF0ZVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0Ly8gZXhlYyBzdHJpbmcgY29tbWFuZHMgY2FuIGJlIHBhc3NlZCB0byBxdWVyeUNvbW1hbmRTdGF0ZVxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh1dGlscy5pc1N0cmluZyhjb21tYW5kLmV4ZWMpKSB7XHJcblx0XHRcdFx0XHRcdGJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTogY29tbWFuZE5hbWUsXHJcblx0XHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuZXhlY1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZ3JvdXAsIGJ1dHRvbik7XHJcblx0XHRcdFx0XHR0b29sYmFyQnV0dG9uc1tjb21tYW5kTmFtZV0gPSBidXR0b247XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vIEV4Y2x1ZGUgZW1wdHkgZ3JvdXBzXHJcblx0XHRcdFx0aWYgKGdyb3VwLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0b29sYmFyLCBncm91cCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIEFwcGVuZCB0aGUgdG9vbGJhciB0byB0aGUgdG9vbGJhckNvbnRhaW5lciBvcHRpb24gaWYgZ2l2ZW5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKG9wdGlvbnMudG9vbGJhckNvbnRhaW5lciB8fCBlZGl0b3JDb250YWluZXIsIHRvb2xiYXIpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgdGhlIHJlc2l6ZXIuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRpbml0UmVzaXplID0gKCkgPT4ge1xyXG5cdFx0XHRsZXQgbWluSGVpZ2h0OiBhbnksIG1heEhlaWdodDogYW55LCBtaW5XaWR0aDogYW55LCBtYXhXaWR0aDogYW55LCBtb3VzZU1vdmVGdW5jOiBhbnksIG1vdXNlVXBGdW5jOiBhbnksIGdyaXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1ncmlwJ1xyXG5cdFx0XHR9KSxcclxuXHRcdFx0XHQvLyBDb3ZlciBpcyB1c2VkIHRvIGNvdmVyIHRoZSBlZGl0b3IgaWZyYW1lIHNvIGRvY3VtZW50XHJcblx0XHRcdFx0Ly8gc3RpbGwgZ2V0cyBtb3VzZSBtb3ZlIGV2ZW50c1xyXG5cdFx0XHRcdGNvdmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1yZXNpemUtY292ZXInXHJcblx0XHRcdFx0fSksIG1vdmVFdmVudHMgPSAndG91Y2htb3ZlIG1vdXNlbW92ZScsIGVuZEV2ZW50cyA9ICd0b3VjaGNhbmNlbCB0b3VjaGVuZCBtb3VzZXVwJywgc3RhcnRYID0gMCwgc3RhcnRZID0gMCwgbmV3WCA9IDAsIG5ld1kgPSAwLCBzdGFydFdpZHRoID0gMCwgc3RhcnRIZWlnaHQgPSAwLCBvcmlnV2lkdGggPSBkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyKSwgb3JpZ0hlaWdodCA9IGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKSwgaXNEcmFnZ2luZyA9IGZhbHNlLCBydGwgPSBlbWxFZGl0b3IucnRsKCk7XHJcblxyXG5cdFx0XHRtaW5IZWlnaHQgPSBvcHRpb25zLnJlc2l6ZU1pbkhlaWdodCB8fCBvcmlnSGVpZ2h0IC8gMS41O1xyXG5cdFx0XHRtYXhIZWlnaHQgPSBvcHRpb25zLnJlc2l6ZU1heEhlaWdodCB8fCBvcmlnSGVpZ2h0ICogMi41O1xyXG5cdFx0XHRtaW5XaWR0aCA9IG9wdGlvbnMucmVzaXplTWluV2lkdGggfHwgb3JpZ1dpZHRoIC8gMS4yNTtcclxuXHRcdFx0bWF4V2lkdGggPSBvcHRpb25zLnJlc2l6ZU1heFdpZHRoIHx8IG9yaWdXaWR0aCAqIDEuMjU7XHJcblxyXG5cdFx0XHRtb3VzZU1vdmVGdW5jID0gZnVuY3Rpb24gKGU6IGFueSkge1xyXG5cdFx0XHRcdC8vIGlPUyB1c2VzIHdpbmRvdy5ldmVudFxyXG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcblx0XHRcdFx0XHRlID0gZ2xvYmFsV2luLmV2ZW50O1xyXG5cdFx0XHRcdFx0bmV3WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0XHRuZXdZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bmV3WCA9IGUucGFnZVg7XHJcblx0XHRcdFx0XHRuZXdZID0gZS5wYWdlWTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGxldCBuZXdIZWlnaHQgPSBzdGFydEhlaWdodCArIChuZXdZIC0gc3RhcnRZKSwgbmV3V2lkdGggPSBydGwgP1xyXG5cdFx0XHRcdFx0c3RhcnRXaWR0aCAtIChuZXdYIC0gc3RhcnRYKSA6XHJcblx0XHRcdFx0XHRzdGFydFdpZHRoICsgKG5ld1ggLSBzdGFydFgpO1xyXG5cclxuXHRcdFx0XHRpZiAobWF4V2lkdGggPiAwICYmIG5ld1dpZHRoID4gbWF4V2lkdGgpIHtcclxuXHRcdFx0XHRcdG5ld1dpZHRoID0gbWF4V2lkdGg7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtaW5XaWR0aCA+IDAgJiYgbmV3V2lkdGggPCBtaW5XaWR0aCkge1xyXG5cdFx0XHRcdFx0bmV3V2lkdGggPSBtaW5XaWR0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLnJlc2l6ZVdpZHRoKSB7XHJcblx0XHRcdFx0XHRuZXdXaWR0aCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChtYXhIZWlnaHQgPiAwICYmIG5ld0hlaWdodCA+IG1heEhlaWdodCkge1xyXG5cdFx0XHRcdFx0bmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAobWluSGVpZ2h0ID4gMCAmJiBuZXdIZWlnaHQgPCBtaW5IZWlnaHQpIHtcclxuXHRcdFx0XHRcdG5ld0hlaWdodCA9IG1pbkhlaWdodDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLnJlc2l6ZUhlaWdodCkge1xyXG5cdFx0XHRcdFx0bmV3SGVpZ2h0ID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG5ld1dpZHRoIHx8IG5ld0hlaWdodCkge1xyXG5cdFx0XHRcdFx0ZW1sRWRpdG9yLmRpbWVuc2lvbnMobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRtb3VzZVVwRnVuYyA9IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuXHRcdFx0XHRpZiAoIWlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0ZG9tLmhpZGUoY292ZXIpO1xyXG5cdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhlZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgZW5kRXZlbnRzLCBudWxsLCBtb3VzZVVwRnVuYyk7XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmIChpY29ucyAmJiBpY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0XHRsZXQgaWNvbiA9IGljb25zLmNyZWF0ZSgnZ3JpcCcpO1xyXG5cdFx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZ3JpcCwgaWNvbik7XHJcblx0XHRcdFx0XHRkb20uYWRkQ2xhc3MoZ3JpcCwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBncmlwKTtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgY292ZXIpO1xyXG5cdFx0XHRkb20uaGlkZShjb3Zlcik7XHJcblxyXG5cdFx0XHRkb20ub24oZ3JpcCwgJ3RvdWNoc3RhcnQgbW91c2Vkb3duJywgbnVsbCwgZnVuY3Rpb24gKGU6IGFueSkge1xyXG5cdFx0XHRcdC8vIGlPUyB1c2VzIHdpbmRvdy5ldmVudFxyXG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG5cdFx0XHRcdFx0ZSA9IGdsb2JhbFdpbi5ldmVudDtcclxuXHRcdFx0XHRcdHN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRcdHN0YXJ0WSA9IGUudG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3RhcnRYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRcdHN0YXJ0WSA9IGUucGFnZVk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzdGFydFdpZHRoID0gZG9tLndpZHRoKGVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdFx0c3RhcnRIZWlnaHQgPSBkb20uaGVpZ2h0KGVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdFx0aXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRcdGRvbS5zaG93KGNvdmVyKTtcclxuXHRcdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG51bGwsIG1vdXNlVXBGdW5jKTtcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBQcmVmaXhlcyBhbmQgcHJlbG9hZHMgdGhlIGVtb3RpY29uIGltYWdlc1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdEVtb3RpY29ucyA9ICgpID0+IHtcclxuXHRcdFx0bGV0IGVtb3RpY29ucyA9IG9wdGlvbnMuZW1vdGljb25zO1xyXG5cdFx0XHRsZXQgcm9vdCA9IG9wdGlvbnMuZW1vdGljb25zUm9vdCB8fCAnJztcclxuXHJcblx0XHRcdGlmIChlbW90aWNvbnMpIHtcclxuXHRcdFx0XHRhbGxFbW90aWNvbnMgPSB1dGlscy5leHRlbmQoXHJcblx0XHRcdFx0XHR7fSwgZW1vdGljb25zLm1vcmUsIGVtb3RpY29ucy5kcm9wZG93biwgZW1vdGljb25zLmhpZGRlblxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCB1cmwpIHtcclxuXHRcdFx0XHRhbGxFbW90aWNvbnNba2V5XSA9IHRlbXBsYXRlcygnZW1vdGljb24nLCB7XHJcblx0XHRcdFx0XHRrZXk6IGtleSxcclxuXHRcdFx0XHRcdC8vIFByZWZpeCBlbW90aWNvbiByb290IHRvIGVtb3RpY29uIHVybHNcclxuXHRcdFx0XHRcdHVybDogcm9vdCArICh1cmwudXJsIHx8IHVybCksXHJcblx0XHRcdFx0XHR0b29sdGlwOiB1cmwudG9vbHRpcCB8fCBrZXlcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly8gUHJlbG9hZCB0aGUgZW1vdGljb25cclxuXHRcdFx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0XHRwcmVMb2FkQ2FjaGUucHVzaChkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRzcmM6IHJvb3QgKyAodXJsLnVybCB8fCB1cmwpXHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBdXRvZm9jdXMgdGhlIGVkaXRvclxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0YXV0b2ZvY3VzID0gKGZvY3VzRW5kOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IHJhbmdlLCB0eHRQb3MsIG5vZGUgPSB3eXNpd3lnQm9keS5maXJzdENoaWxkO1xyXG5cclxuXHRcdFx0Ly8gQ2FuJ3QgZm9jdXMgaW52aXNpYmxlIGVsZW1lbnRzXHJcblx0XHRcdGlmICghZG9tLmlzVmlzaWJsZShlZGl0b3JDb250YWluZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZW1sRWRpdG9yLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRcdHR4dFBvcyA9IGZvY3VzRW5kID8gc291cmNlRWRpdG9yLnZhbHVlLmxlbmd0aCA6IDA7XHJcblxyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5zZXRTZWxlY3Rpb25SYW5nZSh0eHRQb3MsIHR4dFBvcyk7XHJcblxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnJlbW92ZVdoaXRlU3BhY2Uod3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdFx0aWYgKGZvY3VzRW5kKSB7XHJcblx0XHRcdFx0aWYgKCEobm9kZSA9IHd5c2l3eWdCb2R5Lmxhc3RDaGlsZCkpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBub2RlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHdoaWxlIChub2RlLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUubGFzdENoaWxkO1xyXG5cclxuXHRcdFx0XHRcdC8vIFNob3VsZCBwbGFjZSB0aGUgY3Vyc29yIGJlZm9yZSB0aGUgbGFzdCA8YnI+XHJcblx0XHRcdFx0XHRpZiAoZG9tLmlzKG5vZGUsICdicicpICYmIG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRcdG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlID0gd3lzaXd5Z0RvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcblxyXG5cdFx0XHRpZiAoIWRvbS5jYW5IYXZlQ2hpbGRyZW4obm9kZSkpIHtcclxuXHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShub2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKGZvY3VzRW5kKSB7XHJcblx0XHRcdFx0XHRyYW5nZS5zZXRTdGFydEFmdGVyKG5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyYW5nZS5zZWxlY3ROb2RlQ29udGVudHMobm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKCFmb2N1c0VuZCk7XHJcblx0XHRcdHJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlO1xyXG5cclxuXHRcdFx0aWYgKGZvY3VzRW5kKSB7XHJcblx0XHRcdFx0d3lzaXd5Z0JvZHkuc2Nyb2xsVG9wID0gd3lzaXd5Z0JvZHkuc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbWxFZGl0b3IuZm9jdXMoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBVcGRhdGVzIHRoZSB0b29sYmFyIHRvIGRpc2FibGUvZW5hYmxlIHRoZSBhcHByb3ByaWF0ZSBidXR0b25zXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgdXBkYXRlVG9vbEJhciA9IChkaXNhYmxlPzogYm9vbGVhbik6IHZvaWQgPT4ge1xyXG5cdFx0XHRsZXQgbW9kZSA9IGVtbEVkaXRvci5pblNvdXJjZU1vZGUoKSA/ICdfZW1sVHh0TW9kZScgOiAnX2VtbFd5c2l3eWdNb2RlJztcclxuXHJcblx0XHRcdHV0aWxzLmVhY2godG9vbGJhckJ1dHRvbnMsIGZ1bmN0aW9uIChfLCBidXR0b24pIHtcclxuXHRcdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCBkaXNhYmxlIHx8ICFidXR0b25bbW9kZV0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0YXV0b0V4cGFuZCA9ICgpID0+IHtcclxuXHRcdFx0aWYgKG9wdGlvbnMuYXV0b0V4cGFuZCAmJiAhYXV0b0V4cGFuZFRocm90dGxlKSB7XHJcblx0XHRcdFx0YXV0b0V4cGFuZFRocm90dGxlID0gc2V0VGltZW91dChlbWxFZGl0b3IuZXhwYW5kVG9Db250ZW50LCAyMDApO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyBhbnkgZG9jdW1lbnQgY2xpY2sgYW5kIGNsb3NlcyB0aGUgZHJvcGRvd24gaWYgb3BlblxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlRG9jdW1lbnRDbGljayA9IChlOiBhbnkpID0+IHtcclxuXHRcdFx0Ly8gaWdub3JlIHJpZ2h0IGNsaWNrc1xyXG5cdFx0XHRpZiAoZS53aGljaCAhPT0gMyAmJiBkcm9wZG93biAmJiAhZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdFx0YXV0b1VwZGF0ZSgpO1xyXG5cclxuXHRcdFx0XHRlbWxFZGl0b3IuY2xvc2VEcm9wRG93bigpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyB0aGUgV1lTSVdZRyBlZGl0b3JzIGN1dCAmIGNvcHkgZXZlbnRzXHJcblx0XHQgKlxyXG5cdFx0ICogQnkgZGVmYXVsdCBicm93c2VycyBhbHNvIGNvcHkgaW5oZXJpdGVkIHN0eWxpbmcgZnJvbSB0aGUgc3R5bGVzaGVldCBhbmRcclxuXHRcdCAqIGJyb3dzZXIgZGVmYXVsdCBzdHlsaW5nIHdoaWNoIGlzIHVubmVjZXNzYXJ5LlxyXG5cdFx0ICpcclxuXHRcdCAqIFRoaXMgd2lsbCBpZ25vcmUgaW5oZXJpdGVkIHN0eWxlcyBhbmQgb25seSBjb3B5IGlubGluZSBzdHlsaW5nLlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlQ3V0Q29weUV2dCA9IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuXHRcdFx0bGV0IHJhbmdlID0gcmFuZ2VIZWxwZXIuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cdFx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0XHRsZXQgY29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdGxldCBmaXJzdFBhcmVudDtcclxuXHJcblx0XHRcdFx0Ly8gQ29weSBhbGwgaW5saW5lIHBhcmVudCBub2RlcyB1cCB0byB0aGUgZmlyc3QgYmxvY2sgcGFyZW50IHNvIGNhblxyXG5cdFx0XHRcdC8vIGNvcHkgaW5saW5lIHN0eWxlc1xyXG5cdFx0XHRcdGxldCBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0XHR3aGlsZSAocGFyZW50ICYmIGRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRcdFx0XHRcdGxldCBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNsb25lLCBjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250YWluZXIsIGNsb25lKTtcclxuXHRcdFx0XHRcdFx0Zmlyc3RQYXJlbnQgPSBmaXJzdFBhcmVudCB8fCBjbG9uZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZpcnN0UGFyZW50IHx8IGNvbnRhaW5lciwgcmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuXHRcdFx0XHRkb20ucmVtb3ZlV2hpdGVTcGFjZShjb250YWluZXIpO1xyXG5cclxuXHRcdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9odG1sJywgY29udGFpbmVyLmlubmVySFRNTCk7XHJcblxyXG5cdFx0XHRcdC8vIFRPRE86IFJlZmFjdG9yIGludG8gcHJpdmF0ZSBzaGFyZWQgbW9kdWxlIHdpdGggcGxhaW50ZXh0IHBsdWdpblxyXG5cdFx0XHRcdC8vIGlubmVyVGV4dCBhZGRzIHR3byBuZXdsaW5lcyBhZnRlciA8cD4gdGFncyBzbyBjb252ZXJ0IHRoZW0gdG9cclxuXHRcdFx0XHQvLyA8ZGl2PiB0YWdzXHJcblx0XHRcdFx0dXRpbHMuZWFjaChkb20uZmluZChjb250YWluZXIsICdwJyksIGZ1bmN0aW9uIChfLCBlbG0pIHtcclxuXHRcdFx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChlbG0sICdkaXYnKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvLyBSZW1vdmUgY29sbGFwc2VkIDxicj4gdGFncyBhcyBpbm5lclRleHQgY29udmVydHMgdGhlbSB0byBuZXdsaW5lc1xyXG5cdFx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAnYnInKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xyXG5cdFx0XHRcdFx0aWYgKCFlbG0ubmV4dFNpYmxpbmcgfHwgIWRvbS5pc0lubGluZShlbG0ubmV4dFNpYmxpbmcsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRcdGRvbS5yZW1vdmUoZWxtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly8gcmFuZ2UudG9TdHJpbmcoKSBkb2Vzbid0IGluY2x1ZGUgbmV3bGluZXMgc28gY2FuJ3QgdXNlIGVtbEVkaXRvci5cclxuXHRcdFx0XHQvLyBzZWxlY3Rpb24udG9TdHJpbmcoKSBzZWVtcyB0byB1c2UgdGhlIHNhbWUgbWV0aG9kIGFzIGlubmVyVGV4dFxyXG5cdFx0XHRcdC8vIGJ1dCBuZWVkcyB0byBiZSBub3JtYWxpc2VkIGZpcnN0IHNvIHVzaW5nIGNvbnRhaW5lci5pbm5lclRleHRcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIGNvbnRhaW5lcik7XHJcblx0XHRcdFx0ZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCBjb250YWluZXIuaW5uZXJUZXh0KTtcclxuXHRcdFx0XHRkb20ucmVtb3ZlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdjdXQnKSB7XHJcblx0XHRcdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyB0aGUgV1lTSVdZRyBlZGl0b3JzIHBhc3RlIGV2ZW50XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVQYXN0ZUV2dCA9IChlOiBDbGlwYm9hcmRFdmVudCkgPT4ge1xyXG5cdFx0XHRsZXQgZWRpdGFibGUgPSB3eXNpd3lnQm9keTtcclxuXHRcdFx0bGV0IGNsaXBib2FyZCA9IGUuY2xpcGJvYXJkRGF0YTtcclxuXHRcdFx0bGV0IGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChmaWxlOiBhbnkpIHtcclxuXHRcdFx0XHRsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdGhhbmRsZVBhc3RlRGF0YSh7XHJcblx0XHRcdFx0XHRcdGh0bWw6ICc8aW1nIHNyYz1cIicgKyBlLnRhcmdldC5yZXN1bHQgKyAnXCIgLz4nXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gTW9kZXJuIGJyb3dzZXJzIHdpdGggY2xpcGJvYXJkIEFQSSAtIGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiBfdmVyeV9cclxuXHRcdFx0Ly8gb2xkIGFuZHJvaWQgd2ViIHZpZXdzIGFuZCBVQyBicm93c2VyIHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCB0aGVcclxuXHRcdFx0Ly8gcGFzdGUgZXZlbnQgYXQgYWxsLlxyXG5cdFx0XHRpZiAoY2xpcGJvYXJkKSB7XHJcblx0XHRcdFx0bGV0IGRhdGE6IGFueSA9IFtdO1xyXG5cdFx0XHRcdGxldCB0eXBlcyA9IGNsaXBib2FyZC50eXBlcztcclxuXHRcdFx0XHRsZXQgaXRlbXMgPSBjbGlwYm9hcmQuaXRlbXM7XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0Ly8gV29yZCBzb21ldGltZXMgYWRkcyBjb3BpZWQgdGV4dCBhcyBhbiBpbWFnZSBzbyBpZiBIVE1MXHJcblx0XHRcdFx0XHQvLyBleGlzdHMgcHJlZmVyIHRoYXQgb3ZlciBpbWFnZXNcclxuXHRcdFx0XHRcdGlmICh0eXBlcy5pbmRleE9mKCd0ZXh0L2h0bWwnKSA8IDApIHtcclxuXHRcdFx0XHRcdFx0Ly8gTm9ybWFsaXNlIGltYWdlIHBhc3RpbmcgdG8gcGFzdGUgYXMgYSBkYXRhLXVyaVxyXG5cdFx0XHRcdFx0XHRpZiAoZ2xvYmFsV2luLkZpbGVSZWFkZXIgJiYgaXRlbXMgJiZcclxuXHRcdFx0XHRcdFx0XHRJTUFHRV9NSU1FX1JFR0VYLnRlc3QoaXRlbXNbaV0udHlwZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbG9hZEltYWdlKGNsaXBib2FyZC5pdGVtc1tpXS5nZXRBc0ZpbGUoKSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGRhdGFbdHlwZXNbaV1dID0gY2xpcGJvYXJkLmdldERhdGEodHlwZXNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBDYWxsIHBsdWdpbnMgaGVyZSB3aXRoIGZpbGU/XHJcblx0XHRcdFx0ZGF0YS50ZXh0ID0gZGF0YVsndGV4dC9wbGFpbiddO1xyXG5cdFx0XHRcdGRhdGEuaHRtbCA9IHNhbml0aXplKGRhdGFbJ3RleHQvaHRtbCddKTtcclxuXHJcblx0XHRcdFx0aGFuZGxlUGFzdGVEYXRhKGRhdGEpO1xyXG5cdFx0XHRcdC8vIElmIGNvbnRlbnRzRnJhZ21lbnQgZXhpc3RzIHRoZW4gd2UgYXJlIGFscmVhZHkgd2FpdGluZyBmb3IgYVxyXG5cdFx0XHRcdC8vIHByZXZpb3VzIHBhc3RlIHNvIGxldCB0aGUgaGFuZGxlciBmb3IgdGhhdCBoYW5kbGUgdGhpcyBvbmUgdG9vXHJcblx0XHRcdH0gZWxzZSBpZiAoIXBhc3RlQ29udGVudEZyYWdtZW50KSB7XHJcblx0XHRcdFx0Ly8gU2F2ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIHNvIGNhbiBiZSByZXN0b3JlZFxyXG5cdFx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0XHRsZXQgc2Nyb2xsVG9wID0gZWRpdGFibGUuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBnbG9iYWxEb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHRcdHdoaWxlIChlZGl0YWJsZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQocGFzdGVDb250ZW50RnJhZ21lbnQsIGVkaXRhYmxlLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRsZXQgaHRtbCA9IGVkaXRhYmxlLmlubmVySFRNTDtcclxuXHJcblx0XHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0YWJsZSwgcGFzdGVDb250ZW50RnJhZ21lbnQpO1xyXG5cdFx0XHRcdFx0ZWRpdGFibGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0XHRoYW5kbGVQYXN0ZURhdGEoeyBodG1sOiBzYW5pdGl6ZShodG1sKSB9KTtcclxuXHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlcGxhY2VzIGFueSBlbW90aWNvbiBjb2RlcyBpbiB0aGUgcGFzc2VkIEhUTUxcclxuXHRcdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRyZXBsYWNlRW1vdGljb25zID0gKCkgPT4ge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0ZW1vdGljb25zXHJcblx0XHRcdFx0XHQucmVwbGFjZSh3eXNpd3lnQm9keSwgYWxsRW1vdGljb25zLCBvcHRpb25zLmVtb3RpY29uc0NvbXBhdCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgc2VsZWN0ZWQgdGV4dCBvZiB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0c291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0ID0gKCk6IHN0cmluZyA9PiB7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNvdXJjZUVkaXRvci52YWx1ZS5zdWJzdHJpbmcoXHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIHRoZSBwYXNzZWQgY29tbWFuZFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlQ29tbWFuZCA9IChjYWxsZXI6IGFueSwgY21kOiBhbnkpID0+IHtcclxuXHRcdFx0Ly8gY2hlY2sgaWYgaW4gdGV4dCBtb2RlIGFuZCBoYW5kbGUgdGV4dCBjb21tYW5kc1xyXG5cdFx0XHRpZiAoZW1sRWRpdG9yLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0aWYgKGNtZC50eHRFeGVjKSB7XHJcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjbWQudHh0RXhlYykpIHtcclxuXHRcdFx0XHRcdFx0ZW1sRWRpdG9yLnNvdXJjZUVkaXRvckluc2VydFRleHQuYXBwbHkodGhpcywgY21kLnR4dEV4ZWMpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0Y21kLnR4dEV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIsIHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoY21kLmV4ZWMpIHtcclxuXHRcdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihjbWQuZXhlYykpIHtcclxuXHRcdFx0XHRcdGNtZC5leGVjLmNhbGwodGhpcywgY2FsbGVyKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0ZW1sRWRpdG9yLmV4ZWNDb21tYW5kKFxyXG5cdFx0XHRcdFx0XHRjbWQuZXhlYyxcclxuXHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNtZCwgJ2V4ZWNQYXJhbScpID8gY21kLmV4ZWNQYXJhbSA6IG51bGxcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXHJcblx0XHQgKiB0aGUgc2VsZWN0aW9uY2hhbmdlZCBldmVudCBpZiBpdCBoYXMuXHJcblx0XHQgKlxyXG5cdFx0ICogSW4gYnJvd3NlcnMgb3RoZXIgdGhhdCBkb24ndCBzdXBwb3J0IHNlbGVjdGlvbmNoYW5nZSBldmVudCBpdCB3aWxsIGNoZWNrXHJcblx0XHQgKiBhdCBtb3N0IG9uY2UgZXZlcnkgMTAwbXMuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRjaGVja1NlbGVjdGlvbkNoYW5nZWQgPSAoKSA9PiB7XHJcblx0XHRcdGZ1bmN0aW9uIGNoZWNrKCkge1xyXG5cdFx0XHRcdC8vIERvbid0IGNyZWF0ZSBuZXcgc2VsZWN0aW9uIGlmIHRoZXJlIGlzbid0IG9uZSAobGlrZSBhZnRlclxyXG5cdFx0XHRcdC8vIGJsdXIgZXZlbnQgaW4gaU9TKVxyXG5cdFx0XHRcdGlmICh3eXNpd3lnV2luZG93LmdldFNlbGVjdGlvbigpICYmXHJcblx0XHRcdFx0XHR3eXNpd3lnV2luZG93LmdldFNlbGVjdGlvbigpLnJhbmdlQ291bnQgPD0gMCkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IG51bGw7XHJcblx0XHRcdFx0XHQvLyByYW5nZUhlbHBlciBjb3VsZCBiZSBudWxsIGlmIGVkaXRvciB3YXMgZGVzdHJveWVkXHJcblx0XHRcdFx0XHQvLyBiZWZvcmUgdGhlIHRpbWVvdXQgaGFkIGZpbmlzaGVkXHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZUhlbHBlciAmJiAhcmFuZ2VIZWxwZXIuY29tcGFyZShjdXJyZW50U2VsZWN0aW9uKSkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdFx0XHQvLyBJZiB0aGUgc2VsZWN0aW9uIGlzIGluIGFuIGlubGluZSB3cmFwIGl0IGluIGEgYmxvY2suXHJcblx0XHRcdFx0XHQvLyBGaXhlcyAjMzMxXHJcblx0XHRcdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uLmNvbGxhcHNlZCkge1xyXG5cdFx0XHRcdFx0XHRsZXQgcGFyZW50ID0gY3VycmVudFNlbGVjdGlvbi5zdGFydENvbnRhaW5lcjtcclxuXHRcdFx0XHRcdFx0bGV0IG9mZnNldCA9IGN1cnJlbnRTZWxlY3Rpb24uc3RhcnRPZmZzZXQ7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0XHRpZiAob2Zmc2V0ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xyXG5cdFx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5jaGlsZE5vZGVzW29mZnNldF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHdoaWxlIChwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgIT09IHd5c2l3eWdCb2R5KSB7XHJcblx0XHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0XHR3cmFwSW5saW5lcyh3eXNpd3lnQm9keSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpc1NlbGVjdGlvbkNoZWNrUGVuZGluZykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXNTZWxlY3Rpb25DaGVja1BlbmRpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgbmVlZCB0byBsaW1pdCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnRzIHRoZSBTZWxlY3Rpb24gQVBJXHJcblx0XHRcdGlmICgnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHd5c2l3eWdEb2N1bWVudCkge1xyXG5cdFx0XHRcdGNoZWNrKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChjaGVjaywgMTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBub2RlIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdFx0ICogdGhlIG5vZGVjaGFuZ2VkIGV2ZW50IGlmIGl0IGhhc1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0Y2hlY2tOb2RlQ2hhbmdlZCA9ICgpID0+IHtcclxuXHRcdFx0Ly8gY2hlY2sgaWYgbm9kZSBoYXMgY2hhbmdlZFxyXG5cdFx0XHRsZXQgb2xkTm9kZSwgbm9kZSA9IHJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50Tm9kZSAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdG9sZE5vZGUgPSBjdXJyZW50Tm9kZTtcclxuXHRcdFx0XHRjdXJyZW50Tm9kZSA9IG5vZGU7XHJcblx0XHRcdFx0Y3VycmVudEJsb2NrTm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ25vZGVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdFx0b2xkTm9kZTogb2xkTm9kZSxcclxuXHRcdFx0XHRcdG5ld05vZGU6IGN1cnJlbnROb2RlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVXBkYXRlcyBpZiBidXR0b25zIGFyZSBhY3RpdmUgb3Igbm90XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zID0gKCkgPT4ge1xyXG5cdFx0XHRsZXQgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0XHRsZXQgYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcclxuXHRcdFx0bGV0IGRvYyA9IHd5c2l3eWdEb2N1bWVudDtcclxuXHRcdFx0bGV0IGlzU291cmNlID0gZW1sRWRpdG9yLnNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRcdGlmIChlbWxFZGl0b3IucmVhZE9ubHkoKSkge1xyXG5cdFx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQodG9vbGJhciwgYWN0aXZlQ2xhc3MpLCBmdW5jdGlvbiAoXywgbWVudUl0ZW0pIHtcclxuXHRcdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhtZW51SXRlbSwgYWN0aXZlQ2xhc3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRcdHBhcmVudCA9IHJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHRcdFx0XHRmaXJzdEJsb2NrID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudChwYXJlbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGJ0blN0YXRlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRsZXQgc3RhdGUgPSAwO1xyXG5cdFx0XHRcdGxldCBidG4gPSB0b29sYmFyQnV0dG9uc1tidG5TdGF0ZUhhbmRsZXJzW2pdLm5hbWVdO1xyXG5cdFx0XHRcdGxldCBzdGF0ZUZuID0gYnRuU3RhdGVIYW5kbGVyc1tqXS5zdGF0ZTtcclxuXHRcdFx0XHRsZXQgaXNEaXNhYmxlZCA9IChpc1NvdXJjZSAmJiAhYnRuLl9lbWxUeHRNb2RlKSB8fFxyXG5cdFx0XHRcdFx0KCFpc1NvdXJjZSAmJiAhYnRuLl9lbWxXeXNpd3lnTW9kZSk7XHJcblxyXG5cdFx0XHRcdGlmICh1dGlscy5pc1N0cmluZyhzdGF0ZUZuKSkge1xyXG5cdFx0XHRcdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdHN0YXRlID0gZG9jLnF1ZXJ5Q29tbWFuZEVuYWJsZWQoc3RhdGVGbikgPyAwIDogLTE7XHJcblxyXG5cdFx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtZGVwdGhcclxuXHRcdFx0XHRcdFx0XHRpZiAoc3RhdGUgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kU3RhdGUoc3RhdGVGbikgPyAxIDogMDtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGV4KSB7IC8qIGVtcHR5ICovIH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2UgaWYgKCFpc0Rpc2FibGVkKSB7XHJcblx0XHRcdFx0XHRzdGF0ZSA9IHN0YXRlRm4uY2FsbCh0aGlzLCBwYXJlbnQsIGZpcnN0QmxvY2spO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCB8fCBzdGF0ZSA8IDApO1xyXG5cdFx0XHRcdGRvbS50b2dnbGVDbGFzcyhidG4sIGFjdGl2ZUNsYXNzLCBzdGF0ZSA+IDApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaWNvbnMgJiYgaWNvbnMudXBkYXRlKSB7XHJcblx0XHRcdFx0aWNvbnMudXBkYXRlKGlzU291cmNlLCBwYXJlbnQsIGZpcnN0QmxvY2spO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyBhbnkga2V5IHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZUtleVByZXNzID0gKGU6IGFueSkgPT4ge1xyXG5cdFx0XHQvLyBGRiBidWc6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTUwMTQ5NlxyXG5cdFx0XHRpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRlbWxFZGl0b3IuY2xvc2VEcm9wRG93bigpO1xyXG5cclxuXHRcdFx0Ly8gMTMgPSBlbnRlciBrZXlcclxuXHRcdFx0aWYgKGUud2hpY2ggPT09IDEzKSB7XHJcblx0XHRcdFx0bGV0IExJU1RfVEFHUyA9ICdsaSx1bCxvbCc7XHJcblxyXG5cdFx0XHRcdC8vIFwiRml4XCIgKGNsdWRnZSkgZm9yIGJsb2NrbGV2ZWwgZWxlbWVudHMgYmVpbmcgZHVwbGljYXRlZCBpbiBzb21lXHJcblx0XHRcdFx0Ly8gYnJvd3NlcnMgd2hlbiBlbnRlciBpcyBwcmVzc2VkIGluc3RlYWQgb2YgaW5zZXJ0aW5nIGEgbmV3bGluZVxyXG5cdFx0XHRcdGlmICghZG9tLmlzKGN1cnJlbnRCbG9ja05vZGUsIExJU1RfVEFHUykgJiZcclxuXHRcdFx0XHRcdGRvbS5oYXNTdHlsaW5nKGN1cnJlbnRCbG9ja05vZGUpKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGJyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2JyJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnROb2RlKGJyKTtcclxuXHJcblx0XHRcdFx0XHQvLyBMYXN0IDxicj4gb2YgYSBibG9jayB3aWxsIGJlIGNvbGxhcHNlZCAgc28gbmVlZCB0byBtYWtlIHN1cmVcclxuXHRcdFx0XHRcdC8vIHRoZSA8YnI+IHRoYXQgd2FzIGluc2VydGVkIGlzbid0IHRoZSBsYXN0IG5vZGUgb2YgYSBibG9jay5cclxuXHRcdFx0XHRcdGxldCBwYXJlbnQgPSBici5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0bGV0IGxhc3RDaGlsZCA9IHBhcmVudC5sYXN0Q2hpbGQgYXMgYW55O1xyXG5cclxuXHRcdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxyXG5cdFx0XHRcdFx0aWYgKGxhc3RDaGlsZCAmJiBsYXN0Q2hpbGQubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgJiZcclxuXHRcdFx0XHRcdFx0bGFzdENoaWxkLm5vZGVWYWx1ZSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdENoaWxkO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgQlIgb2YgYSBibG9jayBhbmQgdGhlIHByZXZpb3VzXHJcblx0XHRcdFx0XHQvLyBzaWJsaW5nIGlzIGlubGluZSB0aGVuIHdpbGwgbmVlZCBhbiBleHRyYSBCUi4gVGhpc1xyXG5cdFx0XHRcdFx0Ly8gaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGxhc3QgQlIgb2YgYSBibG9jayB3aWxsIGJlXHJcblx0XHRcdFx0XHQvLyBjb2xsYXBzZWQuIEZpeGVzIGlzc3VlICMyNDhcclxuXHRcdFx0XHRcdGlmICghZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkgJiYgbGFzdENoaWxkID09PSBiciAmJlxyXG5cdFx0XHRcdFx0XHRkb20uaXNJbmxpbmUoYnIucHJldmlvdXNTaWJsaW5nKSkge1xyXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKCc8YnI+Jyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE1ha2VzIHN1cmUgdGhhdCBpZiB0aGVyZSBpcyBhIGNvZGUgb3IgcXVvdGUgdGFnIGF0IHRoZVxyXG5cdFx0ICogZW5kIG9mIHRoZSBlZGl0b3IsIHRoYXQgdGhlcmUgaXMgYSBuZXcgbGluZSBhZnRlciBpdC5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB0aGVyZSB3YXNuJ3QgYSBuZXcgbGluZSBhdCB0aGUgZW5kIHlvdSB3b3VsZG4ndCBiZSBhYmxlXHJcblx0XHQgKiB0byBlbnRlciBhbnkgdGV4dCBhZnRlciBhIGNvZGUvcXVvdGUgdGFnXHJcblx0XHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0YXBwZW5kTmV3TGluZSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Ly8gQ2hlY2sgYWxsIG5vZGVzIGluIHJldmVyc2UgdW50aWwgZWl0aGVyIGFkZCBhIG5ldyBsaW5lXHJcblx0XHRcdC8vIG9yIHJlYWNoIGEgbm9uLWVtcHR5IHRleHRub2RlIG9yIEJSIGF0IHdoaWNoIHBvaW50IGNhblxyXG5cdFx0XHQvLyBzdG9wIGNoZWNraW5nLlxyXG5cdFx0XHRkb20uclRyYXZlcnNlKHd5c2l3eWdCb2R5LCBmdW5jdGlvbiAobm9kZTogYW55KSB7XHJcblx0XHRcdFx0Ly8gTGFzdCBibG9jaywgYWRkIG5ldyBsaW5lIGFmdGVyIGlmIGhhcyBzdHlsaW5nXHJcblx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiZcclxuXHRcdFx0XHRcdCEvaW5saW5lLy50ZXN0KGRvbS5jc3Mobm9kZSwgJ2Rpc3BsYXknKSkpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBBZGQgbGluZSBicmVhayBhZnRlciBpZiBoYXMgc3R5bGluZ1xyXG5cdFx0XHRcdFx0aWYgKCFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItbmxmJykgJiYgZG9tLmhhc1N0eWxpbmcobm9kZSkpIHtcclxuXHRcdFx0XHRcdFx0bGV0IHBhcmFncmFwaCA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRcdHBhcmFncmFwaC5jbGFzc05hbWUgPSAnZW1sZWRpdG9yLW5sZic7XHJcblx0XHRcdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSAnPGJyIC8+JztcclxuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBwYXJhZ3JhcGgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBMYXN0IG5vbi1lbXB0eSB0ZXh0IG5vZGUgb3IgbGluZSBicmVhay5cclxuXHRcdFx0XHQvLyBObyBuZWVkIHRvIGFkZCBsaW5lLWJyZWFrIGFmdGVyIHRoZW1cclxuXHRcdFx0XHRpZiAoKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIS9eXFxzKiQvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB8fFxyXG5cdFx0XHRcdFx0ZG9tLmlzKG5vZGUsICdicicpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIGZvcm0gcmVzZXQgZXZlbnRcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZUZvcm1SZXNldCA9ICgpID0+IHtcclxuXHRcdFx0ZW1sRWRpdG9yLnZhbCh0ZXh0YXJlYS52YWx1ZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyBhbnkgbW91c2Vkb3duIHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlTW91c2VEb3duID0gKCkgPT4ge1xyXG5cdFx0XHRlbWxFZGl0b3IuY2xvc2VEcm9wRG93bigpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFBhc3NlcyBldmVudHMgb24gdG8gYW55IGhhbmRsZXJzXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHJldHVybiB2b2lkXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZUV2ZW50ID0gKGU6IGFueSkgPT4ge1xyXG5cdFx0XHRpZiAocGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHRcdC8vIFNlbmQgZXZlbnQgdG8gYWxsIHBsdWdpbnNcclxuXHRcdFx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoZS50eXBlICsgJ0V2ZW50JywgZSwgdGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGNvbnZlcnQgdGhlIGV2ZW50IGludG8gYSBjdXN0b20gZXZlbnQgdG8gc2VuZFxyXG5cdFx0XHRsZXQgbmFtZSA9IChlLnRhcmdldCA9PT0gc291cmNlRWRpdG9yID8gJ2VtbHNyYycgOiAnZW1sd3lzJykgKyBlLnR5cGUgYXMga2V5b2YgdHlwZW9mIGV2ZW50SGFuZGxlcnM7XHJcblxyXG5cdFx0XHRpZiAoZXZlbnRIYW5kbGVyc1tuYW1lXSkge1xyXG5cdFx0XHRcdGV2ZW50SGFuZGxlcnNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm46IGFueSkge1xyXG5cdFx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEVtb3RpY29ucyBrZXlwcmVzcyBoYW5kbGVyXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRlbW90aWNvbnNLZXlQcmVzcyA9IChlOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IHJlcGxhY2VkRW1vdGljb24sIGNhY2hlUG9zID0gMCwgZW1vdGljb25zQ2FjaGUgPSBlbWxFZGl0b3IuZW1vdGljb25zQ2FjaGUsIGN1ckNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogTWFrZSBjb25maWd1cmFibGVcclxuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghZW1vdGljb25zQ2FjaGUpIHtcclxuXHRcdFx0XHRlbW90aWNvbnNDYWNoZSA9IFtdO1xyXG5cclxuXHRcdFx0XHR1dGlscy5lYWNoKGFsbEVtb3RpY29ucywgZnVuY3Rpb24gKGtleSwgaHRtbCkge1xyXG5cdFx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbY2FjaGVQb3MrK10gPSBba2V5LCBodG1sXTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGUuc29ydChmdW5jdGlvbiAoYTogYW55LCBiOiBhbnkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBhWzBdLmxlbmd0aCAtIGJbMF0ubGVuZ3RoO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRlbWxFZGl0b3IuZW1vdGljb25zQ2FjaGUgPSBlbW90aWNvbnNDYWNoZTtcclxuXHRcdFx0XHRlbWxFZGl0b3IubG9uZ2VzdEVtb3RpY29uQ29kZSA9XHJcblx0XHRcdFx0XHRlbW90aWNvbnNDYWNoZVtlbW90aWNvbnNDYWNoZS5sZW5ndGggLSAxXVswXS5sZW5ndGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlcGxhY2VkRW1vdGljb24gPSByYW5nZUhlbHBlci5yZXBsYWNlS2V5d29yZChcclxuXHRcdFx0XHRlbWxFZGl0b3IuZW1vdGljb25zQ2FjaGUsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdGVtbEVkaXRvci5sb25nZXN0RW1vdGljb25Db2RlLFxyXG5cdFx0XHRcdG9wdGlvbnMuZW1vdGljb25zQ29tcGF0LFxyXG5cdFx0XHRcdGN1ckNoYXJcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdGlmIChyZXBsYWNlZEVtb3RpY29uKSB7XHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLmVtb3RpY29uc0NvbXBhdCB8fCAhL15cXHMkLy50ZXN0KGN1ckNoYXIpKSB7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogTWFrZXMgc3VyZSBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlID0gKCkgPT4ge1xyXG5cdFx0XHRlbW90aWNvbnMuY2hlY2tXaGl0ZXNwYWNlKGN1cnJlbnRCbG9ja05vZGUsIHJhbmdlSGVscGVyKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyB0aGUga2V5ZG93biBldmVudCwgdXNlZCBmb3Igc2hvcnRjdXRzXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVLZXlEb3duID0gZnVuY3Rpb24gKGU6IGFueSkge1xyXG5cdFx0XHRsZXQgc2hvcnRjdXQ6IGFueSA9IFtdLFxyXG5cclxuXHRcdFx0XHRTSElGVF9LRVlTOiBhbnkgPSB7XHJcblx0XHRcdFx0XHQnYCc6ICd+JyxcclxuXHRcdFx0XHRcdCcxJzogJyEnLFxyXG5cdFx0XHRcdFx0JzInOiAnQCcsXHJcblx0XHRcdFx0XHQnMyc6ICcjJyxcclxuXHRcdFx0XHRcdCc0JzogJyQnLFxyXG5cdFx0XHRcdFx0JzUnOiAnJScsXHJcblx0XHRcdFx0XHQnNic6ICdeJyxcclxuXHRcdFx0XHRcdCc3JzogJyYnLFxyXG5cdFx0XHRcdFx0JzgnOiAnKicsXHJcblx0XHRcdFx0XHQnOSc6ICcoJyxcclxuXHRcdFx0XHRcdCcwJzogJyknLFxyXG5cdFx0XHRcdFx0Jy0nOiAnXycsXHJcblx0XHRcdFx0XHQnPSc6ICcrJyxcclxuXHRcdFx0XHRcdCc7JzogJzogJyxcclxuXHRcdFx0XHRcdCdcXCcnOiAnXCInLFxyXG5cdFx0XHRcdFx0JywnOiAnPCcsXHJcblx0XHRcdFx0XHQnLic6ICc+JyxcclxuXHRcdFx0XHRcdCcvJzogJz8nLFxyXG5cdFx0XHRcdFx0J1xcXFwnOiAnfCcsXHJcblx0XHRcdFx0XHQnWyc6ICd7JyxcclxuXHRcdFx0XHRcdCddJzogJ30nXHJcblx0XHRcdFx0fSwgU1BFQ0lBTF9LRVlTOiBhbnkgPSB7XHJcblx0XHRcdFx0XHQ4OiAnYmFja3NwYWNlJyxcclxuXHRcdFx0XHRcdDk6ICd0YWInLFxyXG5cdFx0XHRcdFx0MTM6ICdlbnRlcicsXHJcblx0XHRcdFx0XHQxOTogJ3BhdXNlJyxcclxuXHRcdFx0XHRcdDIwOiAnY2Fwc2xvY2snLFxyXG5cdFx0XHRcdFx0Mjc6ICdlc2MnLFxyXG5cdFx0XHRcdFx0MzI6ICdzcGFjZScsXHJcblx0XHRcdFx0XHQzMzogJ3BhZ2V1cCcsXHJcblx0XHRcdFx0XHQzNDogJ3BhZ2Vkb3duJyxcclxuXHRcdFx0XHRcdDM1OiAnZW5kJyxcclxuXHRcdFx0XHRcdDM2OiAnaG9tZScsXHJcblx0XHRcdFx0XHQzNzogJ2xlZnQnLFxyXG5cdFx0XHRcdFx0Mzg6ICd1cCcsXHJcblx0XHRcdFx0XHQzOTogJ3JpZ2h0JyxcclxuXHRcdFx0XHRcdDQwOiAnZG93bicsXHJcblx0XHRcdFx0XHQ0NTogJ2luc2VydCcsXHJcblx0XHRcdFx0XHQ0NjogJ2RlbCcsXHJcblx0XHRcdFx0XHQ5MTogJ3dpbicsXHJcblx0XHRcdFx0XHQ5MjogJ3dpbicsXHJcblx0XHRcdFx0XHQ5MzogJ3NlbGVjdCcsXHJcblx0XHRcdFx0XHQ5NjogJzAnLFxyXG5cdFx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHRcdDk4OiAnMicsXHJcblx0XHRcdFx0XHQ5OTogJzMnLFxyXG5cdFx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0XHQxMDE6ICc1JyxcclxuXHRcdFx0XHRcdDEwMjogJzYnLFxyXG5cdFx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0XHQxMDQ6ICc4JyxcclxuXHRcdFx0XHRcdDEwNTogJzknLFxyXG5cdFx0XHRcdFx0MTA2OiAnKicsXHJcblx0XHRcdFx0XHQxMDc6ICcrJyxcclxuXHRcdFx0XHRcdDEwOTogJy0nLFxyXG5cdFx0XHRcdFx0MTEwOiAnLicsXHJcblx0XHRcdFx0XHQxMTE6ICcvJyxcclxuXHRcdFx0XHRcdDExMjogJ2YxJyxcclxuXHRcdFx0XHRcdDExMzogJ2YyJyxcclxuXHRcdFx0XHRcdDExNDogJ2YzJyxcclxuXHRcdFx0XHRcdDExNTogJ2Y0JyxcclxuXHRcdFx0XHRcdDExNjogJ2Y1JyxcclxuXHRcdFx0XHRcdDExNzogJ2Y2JyxcclxuXHRcdFx0XHRcdDExODogJ2Y3JyxcclxuXHRcdFx0XHRcdDExOTogJ2Y4JyxcclxuXHRcdFx0XHRcdDEyMDogJ2Y5JyxcclxuXHRcdFx0XHRcdDEyMTogJ2YxMCcsXHJcblx0XHRcdFx0XHQxMjI6ICdmMTEnLFxyXG5cdFx0XHRcdFx0MTIzOiAnZjEyJyxcclxuXHRcdFx0XHRcdDE0NDogJ251bWxvY2snLFxyXG5cdFx0XHRcdFx0MTQ1OiAnc2Nyb2xsbG9jaycsXHJcblx0XHRcdFx0XHQxODY6ICc7JyxcclxuXHRcdFx0XHRcdDE4NzogJz0nLFxyXG5cdFx0XHRcdFx0MTg4OiAnLCcsXHJcblx0XHRcdFx0XHQxODk6ICctJyxcclxuXHRcdFx0XHRcdDE5MDogJy4nLFxyXG5cdFx0XHRcdFx0MTkxOiAnLycsXHJcblx0XHRcdFx0XHQxOTI6ICdgJyxcclxuXHRcdFx0XHRcdDIxOTogJ1snLFxyXG5cdFx0XHRcdFx0MjIwOiAnXFxcXCcsXHJcblx0XHRcdFx0XHQyMjE6ICddJyxcclxuXHRcdFx0XHRcdDIyMjogJ1xcJydcclxuXHRcdFx0XHR9LCBOVU1QQURfU0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdFx0MTA5OiAnLScsXHJcblx0XHRcdFx0XHQxMTA6ICdkZWwnLFxyXG5cdFx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0XHQ5NjogJzAnLFxyXG5cdFx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHRcdDk4OiAnMicsXHJcblx0XHRcdFx0XHQ5OTogJzMnLFxyXG5cdFx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0XHQxMDE6ICc1JyxcclxuXHRcdFx0XHRcdDEwMjogJzYnLFxyXG5cdFx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0XHQxMDQ6ICc4JyxcclxuXHRcdFx0XHRcdDEwNTogJzknXHJcblx0XHRcdFx0fSwgd2hpY2ggPSBlLndoaWNoLCBjaGFyYWN0ZXIgPSBTUEVDSUFMX0tFWVNbd2hpY2hdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUod2hpY2gpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xyXG5cdFx0XHRcdHNob3J0Y3V0LnB1c2goJ2N0cmwnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGUuYWx0S2V5KSB7XHJcblx0XHRcdFx0c2hvcnRjdXQucHVzaCgnYWx0Jyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlLnNoaWZ0S2V5KSB7XHJcblx0XHRcdFx0c2hvcnRjdXQucHVzaCgnc2hpZnQnKTtcclxuXHJcblx0XHRcdFx0aWYgKE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXSkge1xyXG5cdFx0XHRcdFx0Y2hhcmFjdGVyID0gTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoU0hJRlRfS0VZU1tjaGFyYWN0ZXJdKSB7XHJcblx0XHRcdFx0XHRjaGFyYWN0ZXIgPSBTSElGVF9LRVlTW2NoYXJhY3Rlcl07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTaGlmdCBpcyAxNiwgY3RybCBpcyAxNyBhbmQgYWx0IGlzIDE4XHJcblx0XHRcdGlmIChjaGFyYWN0ZXIgJiYgKHdoaWNoIDwgMTYgfHwgd2hpY2ggPiAxOCkpIHtcclxuXHRcdFx0XHRzaG9ydGN1dC5wdXNoKGNoYXJhY3Rlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQuam9pbignKycpO1xyXG5cdFx0XHRpZiAoc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0gJiZcclxuXHRcdFx0XHRzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XS5jYWxsKHRoaXMpID09PSBmYWxzZSkge1xyXG5cclxuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEhhbmRsZXMgdGhlIGJhY2tzcGFjZSBrZXkgcHJlc3NcclxuXHRcdCAqXHJcblx0XHQgKiBXaWxsIHJlbW92ZSBibG9jayBzdHlsaW5nIGxpa2UgcXVvdGVzL2NvZGUgZWN0IGlmIGF0IHRoZSBzdGFydC5cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZUJhY2tTcGFjZSA9IChlOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IG5vZGUsIG9mZnNldCwgcmFuZ2UsIHBhcmVudDtcclxuXHJcblx0XHRcdC8vIDggaXMgdGhlIGJhY2tzcGFjZSBrZXlcclxuXHRcdFx0aWYgKG9wdGlvbnMuZGlzYWJsZUJsb2NrUmVtb3ZlIHx8IGUud2hpY2ggIT09IDggfHxcclxuXHRcdFx0XHQhKHJhbmdlID0gcmFuZ2VIZWxwZXIuc2VsZWN0ZWRSYW5nZSgpKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xyXG5cdFx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcclxuXHJcblx0XHRcdGlmIChvZmZzZXQgIT09IDAgfHwgIShwYXJlbnQgPSBjdXJyZW50U3R5bGVkQmxvY2tOb2RlKCkpIHx8XHJcblx0XHRcdFx0ZG9tLmlzKHBhcmVudCwgJ2JvZHknKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKG5vZGUgIT09IHBhcmVudCkge1xyXG5cdFx0XHRcdHdoaWxlIChub2RlLnByZXZpb3VzU2libGluZykge1xyXG5cdFx0XHRcdFx0bm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHRcdC8vIEV2ZXJ5dGhpbmcgYnV0IGVtcHR5IHRleHQgbm9kZXMgYmVmb3JlIHRoZSBjdXJzb3JcclxuXHRcdFx0XHRcdC8vIHNob3VsZCBwcmV2ZW50IHRoZSBzdHlsZSBmcm9tIGJlaW5nIHJlbW92ZWRcclxuXHRcdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFIHx8IG5vZGUubm9kZVZhbHVlKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBUaGUgYmFja3NwYWNlIHdhcyBwcmVzc2VkIGF0IHRoZSBzdGFydCBvZlxyXG5cdFx0XHQvLyB0aGUgY29udGFpbmVyIHNvIGNsZWFyIHRoZSBzdHlsZVxyXG5cdFx0XHRlbWxFZGl0b3IuY2xlYXJCbG9ja0Zvcm1hdHRpbmcocGFyZW50KTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IHN0eWxlZCBibG9jayBub2RlIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvclxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKi9cclxuXHRcdGN1cnJlbnRTdHlsZWRCbG9ja05vZGUgPSAoKTogSFRNTEVsZW1lbnQgPT4ge1xyXG5cdFx0XHRsZXQgYmxvY2s6IGFueSA9IGN1cnJlbnRCbG9ja05vZGU7XHJcblxyXG5cdFx0XHR3aGlsZSAoIWRvbS5oYXNTdHlsaW5nKGJsb2NrKSB8fCBkb20uaXNJbmxpbmUoYmxvY2ssIHRydWUpKSB7XHJcblx0XHRcdFx0aWYgKCEoYmxvY2sgPSBibG9jay5wYXJlbnROb2RlKSB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBibG9jaztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUcmlnZ2VycyB0aGUgdmFsdWVDaGFuZ2VkIHNpZ25hbCBpZiB0aGVyZSBpc1xyXG5cdFx0ICogYSBwbHVnaW4gdGhhdCBoYW5kbGVzIGl0LlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpIGhhcyBhbHJlYWR5IGJlZW5cclxuXHRcdCAqIGNhbGxlZCwgdGhlbiBzYXZlUmFuZ2Ugc2hvdWxkIGJlIHNldCB0byBmYWxzZVxyXG5cdFx0ICogdG8gcHJldmVudCB0aGUgcmFuZ2UgYmVpbmcgc2F2ZWQgdHdpY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuNC41XHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNhdmVSYW5nZSBJZiB0byBjYWxsIHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpLlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCA9IChzYXZlUmFuZ2U6IGJvb2xlYW4pID0+IHtcclxuXHRcdFx0aWYgKCFwbHVnaW5NYW5hZ2VyIHx8XHJcblx0XHRcdFx0KCFwbHVnaW5NYW5hZ2VyLmhhc0hhbmRsZXIoJ3ZhbHVlY2hhbmdlZEV2ZW50JykgJiZcclxuXHRcdFx0XHRcdCF0cmlnZ2VyVmFsdWVDaGFuZ2VkLmhhc0hhbmRsZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgY3VycmVudEh0bWwsIHNvdXJjZU1vZGUgPSBlbWxFZGl0b3Iuc291cmNlTW9kZSgpLCBoYXNTZWxlY3Rpb24gPSAhc291cmNlTW9kZSAmJiByYW5nZUhlbHBlci5oYXNTZWxlY3Rpb24oKTtcclxuXHJcblx0XHRcdC8vIENvbXBvc2l0aW9uIGVuZCBpc24ndCBndWFyYW50ZWVkIHRvIGZpcmUgYnV0IG11c3QgaGF2ZVxyXG5cdFx0XHQvLyBlbmRlZCB3aGVuIHRyaWdnZXJWYWx1ZUNoYW5nZWQoKSBpcyBjYWxsZWQgc28gcmVzZXQgaXRcclxuXHRcdFx0aXNDb21wb3NpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgZW1sZWRpdG9yLXN0YXJ0LW1hcmtlclxyXG5cdFx0XHQvLyBpcyBwcmVzZW50IGFzIHRoZSByYW5nZSBpcyBhbHJlYWR5IHNhdmVkXHJcblx0XHRcdHNhdmVSYW5nZSA9IHNhdmVSYW5nZSAhPT0gZmFsc2UgJiZcclxuXHRcdFx0XHQhd3lzaXd5Z0RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWxlZGl0b3Itc3RhcnQtbWFya2VyJyk7XHJcblxyXG5cdFx0XHQvLyBDbGVhciBhbnkgY3VycmVudCB0aW1lb3V0IGFzIGl0J3Mgbm93IGJlZW4gdHJpZ2dlcmVkXHJcblx0XHRcdGlmICh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHZhbHVlQ2hhbmdlZEtleVVwVGltZXIpO1xyXG5cdFx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwVGltZXIgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGhhc1NlbGVjdGlvbiAmJiBzYXZlUmFuZ2UpIHtcclxuXHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y3VycmVudEh0bWwgPSBzb3VyY2VNb2RlID8gc291cmNlRWRpdG9yLnZhbHVlIDogd3lzaXd5Z0JvZHkuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0Ly8gT25seSB0cmlnZ2VyIGlmIHNvbWV0aGluZyBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cclxuXHRcdFx0aWYgKGN1cnJlbnRIdG1sICE9PSB0cmlnZ2VyVmFsdWVDaGFuZ2VkLmxhc3RWYWwpIHtcclxuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkLmxhc3RWYWwgPSBjdXJyZW50SHRtbDtcclxuXHJcblx0XHRcdFx0ZG9tLnRyaWdnZXIoZWRpdG9yQ29udGFpbmVyLCAndmFsdWVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdFx0cmF3VmFsdWU6IHNvdXJjZU1vZGUgPyBlbWxFZGl0b3IudmFsKCkgOiBjdXJyZW50SHRtbFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xyXG5cdFx0XHRcdHJhbmdlSGVscGVyLnJlbW92ZU1hcmtlcnMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBibHVyIGV2ZW50XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YWx1ZUNoYW5nZWRCbHVyID0gKCkgPT4ge1xyXG5cdFx0XHRpZiAodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcikge1xyXG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBrZXlwcmVzcyBldmVudFxyXG5cdFx0ICogQHBhcmFtICB7RXZlbnR9IGUgVGhlIGtleXByZXNzIGV2ZW50XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YWx1ZUNoYW5nZWRLZXlVcCA9IChlOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IHdoaWNoID0gZS53aGljaCwgbGFzdENoYXIgPSB2YWx1ZUNoYW5nZWRLZXlVcC5sYXN0Q2hhciwgbGFzdFdhc1NwYWNlID0gKGxhc3RDaGFyID09PSAxMyB8fCBsYXN0Q2hhciA9PT0gMzIpLCBsYXN0V2FzRGVsZXRlID0gKGxhc3RDaGFyID09PSA4IHx8IGxhc3RDaGFyID09PSA0Nik7XHJcblxyXG5cdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC5sYXN0Q2hhciA9IHdoaWNoO1xyXG5cclxuXHRcdFx0aWYgKGlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyAxMyA9IHJldHVybiAmIDMyID0gc3BhY2VcclxuXHRcdFx0aWYgKHdoaWNoID09PSAxMyB8fCB3aGljaCA9PT0gMzIpIHtcclxuXHRcdFx0XHRpZiAoIWxhc3RXYXNTcGFjZSkge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIDggPSBiYWNrc3BhY2UgJiA0NiA9IGRlbFxyXG5cdFx0XHR9IGVsc2UgaWYgKHdoaWNoID09PSA4IHx8IHdoaWNoID09PSA0Nikge1xyXG5cdFx0XHRcdGlmICghbGFzdFdhc0RlbGV0ZSkge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0KSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENsZWFyIHRoZSBwcmV2aW91cyB0aW1lb3V0IGFuZCBzZXQgYSBuZXcgb25lLlxyXG5cdFx0XHRjbGVhclRpbWVvdXQodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XHJcblxyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBldmVudCAxLjVzIGFmdGVyIHRoZSBsYXN0IGtleXByZXNzIGlmIHNwYWNlXHJcblx0XHRcdC8vIGlzbid0IHByZXNzZWQuIFRoaXMgbWlnaHQgbmVlZCB0byBiZSBsb3dlcmVkLCB3aWxsIG5lZWRcclxuXHRcdFx0Ly8gdG8gbG9vayBpbnRvIHdoYXQgdGhlIHNsb3dlc3QgYXZlcmFnZSBDaGFycyBQZXIgTWluIGlzLlxyXG5cdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKCFpc0NvbXBvc2luZykge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMTUwMCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGhhbmRsZUNvbXBvc2l0aW9uID0gKGU6IGFueSkgPT4ge1xyXG5cdFx0XHRpc0NvbXBvc2luZyA9IC9zdGFydC9pLnRlc3QoZS50eXBlKTtcclxuXHJcblx0XHRcdGlmICghaXNDb21wb3NpbmcpIHtcclxuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0YXV0b1VwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZW1sRWRpdG9yLnVwZGF0ZU9yaWdpbmFsKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIHJ1biB0aGUgaW5pdGlhbGl6ZXJcclxuXHRcdGluaXQoKTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFN0YXRpYyBjb21tYW5kIGhlbHBlciBjbGFzc1xyXG4gKiBAY2xhc3MgY29tbWFuZFxyXG4gKiBAbmFtZSBlbWxlZGl0b3IuY29tbWFuZFxyXG4gKi9cclxuRW1sRWRpdG9yLmNvbW1hbmQgPVxyXG4vKiogQGxlbmRzIGVtbGVkaXRvci5jb21tYW5kICovXHJcbntcclxuXHQvKipcclxuXHQgKiBHZXRzIGEgY29tbWFuZFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHQgKiBAcmV0dXJuIHtPYmplY3R8bnVsbH1cclxuXHQgKiBAc2luY2UgdjEuMy41XHJcblx0ICovXHJcblx0Z2V0OiBmdW5jdGlvbiAobmFtZToga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcyk6IG9iamVjdCB8IG51bGwge1xyXG5cdFx0cmV0dXJuIGRlZmF1bHRDb21tYW5kc1tuYW1lXSB8fCBudWxsO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIDxwPkFkZHMgYSBjb21tYW5kIHRvIHRoZSBlZGl0b3Igb3IgdXBkYXRlcyBhbiBleGlzdGluZ1xyXG5cdCAqIGNvbW1hbmQgaWYgYSBjb21tYW5kIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFscmVhZHkgZXhpc3RzLjwvcD5cclxuXHQgKlxyXG5cdCAqIDxwPk9uY2UgYSBjb21tYW5kIGlzIGFkZCBpdCBjYW4gYmUgaW5jbHVkZWQgaW4gdGhlIHRvb2xiYXIgYnlcclxuXHQgKiBhZGRpbmcgaXQncyBuYW1lIHRvIHRoZSB0b29sYmFyIG9wdGlvbiBpbiB0aGUgY29uc3RydWN0b3IuIEl0XHJcblx0ICogY2FuIGFsc28gYmUgZXhlY3V0ZWQgbWFudWFsbHkgYnkgY2FsbGluZ1xyXG5cdCAqIHtAbGluayBlbWxlZGl0b3IuZXhlY0NvbW1hbmR9PC9wPlxyXG5cdCAqXHJcblx0ICogQGV4YW1wbGVcclxuXHQgKiBFbWxFZGl0b3IuY29tbWFuZC5zZXQoXCJoZWxsb1wiLFxyXG5cdCAqIHtcclxuXHQgKiAgICAgZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdCAqICAgICAgICAgYWxlcnQoXCJIZWxsbyBXb3JsZCFcIik7XHJcblx0ICogICAgIH1cclxuXHQgKiB9KTtcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGNtZFxyXG5cdCAqIEByZXR1cm4ge3RoaXN8ZmFsc2V9IFJldHVybnMgZmFsc2UgaWYgbmFtZSBvciBjbWQgaXMgZmFsc2VcclxuXHQgKiBAc2luY2UgdjEuMy41XHJcblx0ICovXHJcblx0c2V0OiBmdW5jdGlvbiAobmFtZToga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcywgY21kOiBhbnkpOiBhbnkgfCBmYWxzZSB7XHJcblx0XHRpZiAoIW5hbWUgfHwgIWNtZCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gbWVyZ2UgYW55IGV4aXN0aW5nIGNvbW1hbmQgcHJvcGVydGllc1xyXG5cdFx0Y21kID0gdXRpbHMuZXh0ZW5kKGRlZmF1bHRDb21tYW5kc1tuYW1lXSB8fCB7fSwgY21kKTtcclxuXHJcblx0XHRjbWQucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRFbWxFZGl0b3IuY29tbWFuZC5yZW1vdmUobmFtZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGRlZmF1bHRDb21tYW5kc1tuYW1lXSA9IGNtZDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBjb21tYW5kXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdCAqL1xyXG5cdHJlbW92ZTogZnVuY3Rpb24gKG5hbWU6IGtleW9mIHR5cGVvZiBkZWZhdWx0Q29tbWFuZHMpOiBhbnkge1xyXG5cdFx0aWYgKGRlZmF1bHRDb21tYW5kc1tuYW1lXSkge1xyXG5cdFx0XHRkZWxldGUgZGVmYXVsdENvbW1hbmRzW25hbWVdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufTtcclxuIiwiZXhwb3J0IGNsYXNzIFBsdWdpbk1hbmFnZXIge1xyXG5cclxuXHJcblx0Y29uc3RydWN0b3IodGhpc09iajogYW55KSB7XHJcblxyXG5cdFx0UGx1Z2luTWFuYWdlci5wbHVnaW5zID0ge307XHJcblx0XHQvKipcclxuXHRcdCAqIEFycmF5IG9mIGFsbCBjdXJyZW50bHkgcmVnaXN0ZXJlZCBwbHVnaW5zXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0FycmF5fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHJlZ2lzdGVyZWRQbHVnaW5zOiBhbnlbXSA9IFtdO1xyXG5cclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGFuZ2VzIGEgc2lnbmFscyBuYW1lIGZyb20gXCJuYW1lXCIgaW50byBcInNpZ25hbE5hbWVcIi5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGZvcm1hdFNpZ25hbE5hbWUgPSBmdW5jdGlvbiAoc2lnbmFsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0XHRyZXR1cm4gJ3NpZ25hbCcgKyBzaWduYWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzaWduYWwuc2xpY2UoMSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2FsbHMgaGFuZGxlcnMgZm9yIGEgc2lnbmFsXHJcblx0XHQgKlxyXG5cdFx0ICogQHNlZSBjYWxsKClcclxuXHRcdCAqIEBzZWUgY2FsbE9ubHlGaXJzdCgpXHJcblx0XHQgKiBAcGFyYW0gIHtBcnJheX0gICBhcmdzXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSByZXR1cm5BdEZpcnN0XHJcblx0XHQgKiBAcmV0dXJuIHsqfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGNhbGxIYW5kbGVycyA9IGZ1bmN0aW9uIChhcmdzOiBJQXJndW1lbnRzLCByZXR1cm5BdEZpcnN0OiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0YXJncyA9IFtdLnNsaWNlLmNhbGwoYXJncyk7XHJcblxyXG5cdFx0XHR2YXIgaWR4LCByZXQsIHNpZ25hbCA9IGZvcm1hdFNpZ25hbE5hbWUoQXJyYXkuZnJvbShhcmdzKS5zaGlmdCgpKTtcclxuXHJcblx0XHRcdGZvciAoaWR4ID0gMDsgaWR4IDwgcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoOyBpZHgrKykge1xyXG5cdFx0XHRcdGlmIChzaWduYWwgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaWR4XSkge1xyXG5cdFx0XHRcdFx0cmV0ID0gcmVnaXN0ZXJlZFBsdWdpbnNbaWR4XVtzaWduYWxdLmFwcGx5KHRoaXNPYmosIGFyZ3MpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChyZXR1cm5BdEZpcnN0KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2FsbHMgYWxsIGhhbmRsZXJzIGZvciB0aGUgcGFzc2VkIHNpZ25hbFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gICAgc2lnbmFsXHJcblx0XHQgKiBAcGFyYW0gIHsuLi5zdHJpbmd9IGFyZ3NcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY2FsbFxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2FsbCA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnkpOiB2b2lkIHtcclxuXHRcdFx0Y2FsbEhhbmRsZXJzKGFyZ3MsIGZhbHNlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDYWxscyB0aGUgZmlyc3QgaGFuZGxlciBmb3IgYSBzaWduYWwsIGFuZCByZXR1cm5zIHRoZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gICAgc2lnbmFsXHJcblx0XHQgKiBAcGFyYW0gIHsuLi5zdHJpbmd9IGFyZ3NcclxuXHRcdCAqIEByZXR1cm4geyp9IFRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgaGFuZGxlclxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjYWxsT25seUZpcnN0XHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jYWxsT25seUZpcnN0ID0gZnVuY3Rpb24gKCk6IGFueSB7XHJcblx0XHRcdHJldHVybiBjYWxsSGFuZGxlcnMoYXJndW1lbnRzLCB0cnVlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGVja3MgaWYgYSBzaWduYWwgaGFzIGEgaGFuZGxlclxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gc2lnbmFsXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBoYXNIYW5kbGVyXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5oYXNIYW5kbGVyID0gZnVuY3Rpb24gKHNpZ25hbDogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciBpID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xyXG5cdFx0XHRzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKHNpZ25hbCk7XHJcblxyXG5cdFx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpXSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2hlY2tzIGlmIHRoZSBwbHVnaW4gZXhpc3RzIGluIHBsdWdpbnNcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHBsdWdpblxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZXhpc3RzXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5leGlzdHMgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHBsdWdpbiBpbiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnMpIHtcclxuXHRcdFx0XHRsZXQgcGx1Z2luT2JqOiB7fSA9IFBsdWdpbk1hbmFnZXIucGx1Z2luc1twbHVnaW4gYXMga2V5b2YgdHlwZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc107XHJcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBwbHVnaW5PYmogPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHBsdWdpbk9iai5wcm90b3R5cGUgPT09ICdvYmplY3QnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2hlY2tzIGlmIHRoZSBwYXNzZWQgcGx1Z2luIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpc1JlZ2lzdGVyZWRcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmlzUmVnaXN0ZXJlZCA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAodGhpcy5leGlzdHMocGx1Z2luKSkge1xyXG5cdFx0XHRcdHZhciBpZHggPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdHdoaWxlIChpZHgtLSkge1xyXG5cdFx0XHRcdFx0aWYgKHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF0gaW5zdGFuY2VvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlZ2lzdGVycyBhIHBsdWdpbiB0byByZWNlaXZlIHNpZ25hbHNcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHBsdWdpblxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcmVnaXN0ZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnJlZ2lzdGVyID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICghdGhpcy5leGlzdHMocGx1Z2luKSB8fCB0aGlzLmlzUmVnaXN0ZXJlZChwbHVnaW4pKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgcGx1Z2luT2JqID0gbmV3IHRoaXMucGx1Z2luc1twbHVnaW5dKCk7XHJcblx0XHRcdHJlZ2lzdGVyZWRQbHVnaW5zLnB1c2gocGx1Z2luKTtcclxuXHJcblx0XHRcdGlmICgnaW5pdCcgaW4gdGhpcy5wbHVnaW4pIHtcclxuXHRcdFx0XHRwbHVnaW5PYmouaW5pdC5jYWxsKHRoaXNPYmopO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZXJlZ2lzdGVycyBhIHBsdWdpbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHBsdWdpblxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZGVyZWdpc3RlclxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZGVyZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgcmVtb3ZlZFBsdWdpbiwgcGx1Z2luSWR4ID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoLCByZW1vdmVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXMuaXNSZWdpc3RlcmVkKHBsdWdpbikpIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVtb3ZlZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKHBsdWdpbklkeC0tKSB7XHJcblx0XHRcdFx0aWYgKHJlZ2lzdGVyZWRQbHVnaW5zW3BsdWdpbklkeF0gaW5zdGFuY2VvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVkUGx1Z2luID0gcmVnaXN0ZXJlZFBsdWdpbnMuc3BsaWNlKHBsdWdpbklkeCwgMSlbMF07XHJcblx0XHRcdFx0XHRyZW1vdmVkID0gdHJ1ZTtcclxuXHJcblx0XHRcdFx0XHRpZiAoJ2Rlc3Ryb3knIGluIHJlbW92ZWRQbHVnaW4pIHtcclxuXHRcdFx0XHRcdFx0cmVtb3ZlZFBsdWdpbi5kZXN0cm95LmNhbGwodGhpc09iaik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVtb3ZlZDtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhcnMgYWxsIHBsdWdpbnMgYW5kIHJlbW92ZXMgdGhlIG93bmVyIHJlZmVyZW5jZS5cclxuXHRcdCAqXHJcblx0XHQgKiBDYWxsaW5nIGFueSBmdW5jdGlvbnMgb24gdGhpcyBvYmplY3QgYWZ0ZXIgY2FsbGluZ1xyXG5cdFx0ICogZGVzdHJveSB3aWxsIGNhdXNlIGEgSlMgZXJyb3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQG5hbWUgZGVzdHJveVxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGkgPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XHJcblxyXG5cdFx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZWdpc3RlcmVkUGx1Z2luc1tpXSkge1xyXG5cdFx0XHRcdFx0cmVnaXN0ZXJlZFBsdWdpbnNbaV0uZGVzdHJveS5jYWxsKHRoaXNPYmopO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVnaXN0ZXJlZFBsdWdpbnMgPSBbXTtcclxuXHRcdFx0dGhpc09iaiA9IG51bGw7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIHBsdWdpbnM6IHt9O1xyXG5cdGNhbGw6ICguLi5hcmc6IGFueSkgPT4gdm9pZDtcclxuXHRjYWxsT25seUZpcnN0OiAoKSA9PiBhbnk7XHJcblx0aGFzSGFuZGxlcjogKHNpZ25hbDogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdGV4aXN0czogKHBsdWdpbjogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdGlzUmVnaXN0ZXJlZDogKHBsdWdpbjogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdHJlZ2lzdGVyOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0ZGVyZWdpc3RlcjogKHBsdWdpbjogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdGRlc3Ryb3k6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXHJcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB0ZXh0LCBzdGFydC9lbmQgbm9kZSBhbmQgb2Zmc2V0IGZvclxyXG4gKiBsZW5ndGggY2hhcnMgbGVmdCBvciByaWdodCBvZiB0aGUgcGFzc2VkIG5vZGVcclxuICogYXQgdGhlIHNwZWNpZmllZCBvZmZzZXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAge05vZGV9ICBub2RlXHJcbiAqIEBwYXJhbSAge251bWJlcn0gIG9mZnNldFxyXG4gKiBAcGFyYW0gIHtib29sZWFufSBpc0xlZnRcclxuICogQHBhcmFtICB7bnVtYmVyfSAgbGVuZ3RoXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZhciBvdXRlclRleHQgPSBmdW5jdGlvbiAocmFuZ2U6IGFueSwgaXNMZWZ0OiBib29sZWFuLCBsZW5ndGg6IG51bWJlcik6IGFueSB7XHJcblx0dmFyIG5vZGVWYWx1ZSwgcmVtYWluaW5nLCBzdGFydCwgZW5kLCBub2RlLFxyXG5cdFx0dGV4dCA9ICcnLFxyXG5cdFx0bmV4dCA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLFxyXG5cdFx0b2Zmc2V0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XHJcblxyXG5cdC8vIEhhbmRsZSBjYXNlcyB3aGVyZSBub2RlIGlzIGEgcGFyYWdyYXBoIGFuZCBvZmZzZXRcclxuXHQvLyByZWZlcnMgdG8gdGhlIGluZGV4IG9mIGEgdGV4dCBub2RlLlxyXG5cdC8vIDMgPSB0ZXh0IG5vZGVcclxuXHRpZiAobmV4dCAmJiBuZXh0Lm5vZGVUeXBlICE9PSAzKSB7XHJcblx0XHRuZXh0ID0gbmV4dC5jaGlsZE5vZGVzW29mZnNldF07XHJcblx0XHRvZmZzZXQgPSAwO1xyXG5cdH1cclxuXHJcblx0c3RhcnQgPSBlbmQgPSBvZmZzZXQ7XHJcblxyXG5cdHdoaWxlIChsZW5ndGggPiB0ZXh0Lmxlbmd0aCAmJiBuZXh0ICYmIG5leHQubm9kZVR5cGUgPT09IDMpIHtcclxuXHRcdG5vZGVWYWx1ZSA9IG5leHQubm9kZVZhbHVlO1xyXG5cdFx0cmVtYWluaW5nID0gbGVuZ3RoIC0gdGV4dC5sZW5ndGg7XHJcblxyXG5cdFx0Ly8gSWYgbm90IHRoZSBmaXJzdCBub2RlLCBzdGFydCBhbmQgZW5kIHNob3VsZCBiZSBhdCB0aGVpclxyXG5cdFx0Ly8gbWF4IHZhbHVlcyBhcyB3aWxsIGJlIHVwZGF0ZWQgd2hlbiBnZXR0aW5nIHRoZSB0ZXh0XHJcblx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRlbmQgPSBub2RlVmFsdWUubGVuZ3RoO1xyXG5cdFx0XHRzdGFydCA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHQ7XHJcblxyXG5cdFx0aWYgKGlzTGVmdCkge1xyXG5cdFx0XHRzdGFydCA9IE1hdGgubWF4KGVuZCAtIHJlbWFpbmluZywgMCk7XHJcblx0XHRcdG9mZnNldCA9IHN0YXJ0O1xyXG5cclxuXHRcdFx0dGV4dCA9IG5vZGVWYWx1ZS5zdWJzdHIoc3RhcnQsIGVuZCAtIHN0YXJ0KSArIHRleHQ7XHJcblx0XHRcdG5leHQgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVuZCA9IE1hdGgubWluKHJlbWFpbmluZywgbm9kZVZhbHVlLmxlbmd0aCk7XHJcblx0XHRcdG9mZnNldCA9IHN0YXJ0ICsgZW5kO1xyXG5cclxuXHRcdFx0dGV4dCArPSBub2RlVmFsdWUuc3Vic3RyKHN0YXJ0LCBlbmQpO1xyXG5cdFx0XHRuZXh0ID0gbm9kZS5uZXh0U2libGluZztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRub2RlOiBub2RlIHx8IG5leHQsXHJcblx0XHRvZmZzZXQ6IG9mZnNldCxcclxuXHRcdHRleHQ6IHRleHRcclxuXHR9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJhbmdlIGhlbHBlclxyXG4gKlxyXG4gKiBAY2xhc3MgUmFuZ2VIZWxwZXJcclxuICogQG5hbWUgUmFuZ2VIZWxwZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBSYW5nZUhlbHBlciB7XHJcblxyXG5cdGluc2VydEhUTUw6IChodG1sOiBzdHJpbmcsIGVuZEhUTUw/OiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0aW5zZXJ0Tm9kZTogKG5vZGU/OiBhbnksIGVuZE5vZGU/OiBhbnkpID0+IGZhbHNlIHwgdW5kZWZpbmVkO1xyXG5cdGNsb25lU2VsZWN0ZWQ6ICgpID0+IFJhbmdlO1xyXG5cdHNlbGVjdGVkUmFuZ2U6ICgpID0+IFJhbmdlO1xyXG5cdGhhc1NlbGVjdGlvbjogKCkgPT4gYm9vbGVhbjtcclxuXHRzZWxlY3RlZEh0bWw6ICgpID0+IHN0cmluZztcclxuXHRwYXJlbnROb2RlOiAoKSA9PiBIVE1MRWxlbWVudDtcclxuXHRnZXRGaXJzdEJsb2NrUGFyZW50OiAobm9kZT86IGFueSkgPT4gYW55O1xyXG5cdGluc2VydE5vZGVBdDogKHN0YXJ0OiBhbnksIG5vZGU6IGFueSkgPT4gYm9vbGVhbjtcclxuXHRpbnNlcnRNYXJrZXJzOiAoKSA9PiB2b2lkO1xyXG5cdGdldE1hcmtlcjogKGlkOiBhbnkpID0+IGFueTtcclxuXHRyZW1vdmVNYXJrZXI6IChpZDogYW55KSA9PiB2b2lkO1xyXG5cdHJlbW92ZU1hcmtlcnM6ICgpID0+IHZvaWQ7XHJcblx0c2F2ZVJhbmdlOiAoKSA9PiB2b2lkO1xyXG5cdHNlbGVjdFJhbmdlOiAocmFuZ2U6IGFueSkgPT4gdm9pZDtcclxuXHRyZXN0b3JlUmFuZ2U6ICgpID0+IGJvb2xlYW47XHJcblx0c2VsZWN0T3V0ZXJUZXh0OiAobGVmdDogYW55LCByaWdodDogYW55KSA9PiBib29sZWFuO1xyXG5cdGdldE91dGVyVGV4dDogKGJlZm9yZTogYW55LCBsZW5ndGg6IGFueSkgPT4gYW55O1xyXG5cdHJlcGxhY2VLZXl3b3JkOiAoa2V5d29yZHM6IGFueSwgaW5jbHVkZUFmdGVyOiBhbnksIGtleXdvcmRzU29ydGVkOiBhbnksIGxvbmdlc3RLZXl3b3JkOiBhbnksIHJlcXVpcmVXaGl0ZXNwYWNlOiBhbnksIGtleXByZXNzQ2hhcjogYW55KSA9PiBib29sZWFuO1xyXG5cdGNvbXBhcmU6IChybmdBPzogYW55LCBybmdCPzogYW55KSA9PiBib29sZWFuO1xyXG5cdGNsZWFyOiAoKSA9PiB2b2lkO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih3aW46IGFueSwgZDogbnVsbCwgc2FuaXRpemU6IHsgKGh0bWw6IHN0cmluZyk6IHN0cmluZzsgKGFyZzA6IGFueSk6IHN0cmluZzsgfSkge1xyXG5cdFx0bGV0IF9jcmVhdGVNYXJrZXI6IGFueTtcclxuXHRcdGxldCBfcHJlcGFyZUlucHV0OiBhbnk7XHJcblx0XHRsZXQgZG9jOiBhbnkgPSBkIHx8IHdpbi5jb250ZW50RG9jdW1lbnQgfHwgd2luLmRvY3VtZW50O1xyXG5cdFx0bGV0IHN0YXJ0TWFya2VyOiBzdHJpbmcgPSAnZW1sZWRpdG9yLXN0YXJ0LW1hcmtlcic7XHJcblx0XHRsZXQgZW5kTWFya2VyOiBzdHJpbmcgPSAnZW1sZWRpdG9yLWVuZC1tYXJrZXInO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBIVE1MIGludG8gdGhlIGN1cnJlbnQgcmFuZ2UgcmVwbGFjaW5nIGFueSBzZWxlY3RlZFxyXG5cdFx0ICogdGV4dC5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiBlbmRIVE1MIGlzIHNwZWNpZmllZCB0aGUgc2VsZWN0ZWQgY29udGVudHMgd2lsbCBiZSBwdXQgYmV0d2VlblxyXG5cdFx0ICogaHRtbCBhbmQgZW5kSFRNTC4gSWYgdGhlcmUgaXMgbm90aGluZyBzZWxlY3RlZCBodG1sIGFuZCBlbmRIVE1MIGFyZVxyXG5cdFx0ICoganVzdCBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRIVE1MXVxyXG5cdFx0ICogQHJldHVybiBGYWxzZSBvbiBmYWlsXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydEhUTUxcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pbnNlcnRIVE1MID0gZnVuY3Rpb24gKGh0bWw6IHN0cmluZywgZW5kSFRNTD86IHN0cmluZykge1xyXG5cdFx0XHR2YXIgbm9kZSwgZGl2LCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKCFyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGVuZEhUTUwpIHtcclxuXHRcdFx0XHRodG1sICs9IHRoaXMuc2VsZWN0ZWRIdG1sKCkgKyBlbmRIVE1MO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkaXYgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCBkb2MpO1xyXG5cdFx0XHRub2RlID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHRcdFx0ZGl2LmlubmVySFRNTCA9IHNhbml0aXplKGh0bWwpO1xyXG5cclxuXHRcdFx0d2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKG5vZGUsIGRpdi5maXJzdENoaWxkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5pbnNlcnROb2RlKG5vZGUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCogUmVtb3ZlcyB0aGUgc3RhcnQvZW5kIG1hcmtlcnNcclxuXHRcdCpcclxuXHRcdCogQGZ1bmN0aW9uXHJcblx0XHQqIEBuYW1lIHJlbW92ZU1hcmtlcnNcclxuXHRcdCogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0Ki9cclxuXHRcdHRoaXMucmVtb3ZlTWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoc3RhcnRNYXJrZXIpO1xyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcihlbmRNYXJrZXIpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBzYW1lIGFzIGluc2VydEhUTUwgZXhjZXB0IHdpdGggRE9NIG5vZGVzIGluc3RlYWRcclxuXHRcdCAqXHJcblx0XHQgKiA8c3Ryb25nPldhcm5pbmc6PC9zdHJvbmc+IHRoZSBub2RlcyBtdXN0IGJlbG9uZyB0byB0aGVcclxuXHRcdCAqIGRvY3VtZW50IHRoZXkgYXJlIGJlaW5nIGluc2VydGVkIGludG8uIFNvbWUgYnJvd3NlcnNcclxuXHRcdCAqIHdpbGwgdGhyb3cgZXhjZXB0aW9ucyBpZiB0aGV5IGRvbid0LlxyXG5cdFx0ICpcclxuXHRcdCAqIFJldHVybnMgYm9vbGVhbiBmYWxzZSBvbiBmYWlsXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBub2RlXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IGVuZE5vZGVcclxuXHRcdCAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaW5zZXJ0Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmluc2VydE5vZGUgPSBmdW5jdGlvbiAobm9kZT86IE5vZGUsIGVuZE5vZGU/OiBOb2RlKTogZmFsc2UgfCB1bmRlZmluZWQge1xyXG5cdFx0XHRsZXQgZmlyc3QsIGxhc3QsIGlucHV0ID0gX3ByZXBhcmVJbnB1dChub2RlLCBlbmROb2RlKSwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKSwgcGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcblx0XHRcdGxldCBlbXB0eU5vZGVzOiBhbnkgPSBbXTtcclxuXHJcblx0XHRcdGlmICghaW5wdXQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZ1bmN0aW9uIHJlbW92ZUlmRW1wdHkobm9kZTogYW55KSB7XHJcblx0XHRcdFx0Ly8gT25seSByZW1vdmUgZW1wdHkgbm9kZSBpZiBpdCB3YXNuJ3QgYWxyZWFkeSBlbXB0eVxyXG5cdFx0XHRcdGlmIChub2RlICYmIGRvbS5pc0VtcHR5KG5vZGUpICYmIGVtcHR5Tm9kZXMuaW5kZXhPZihub2RlKSA8IDApIHtcclxuXHRcdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAocmFuZ2Uuc3RhcnRDb250YWluZXIgIT09IHJhbmdlLmVuZENvbnRhaW5lcikge1xyXG5cdFx0XHRcdHV0aWxzLmVhY2gocGFyZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChfLCBub2RlKSB7XHJcblx0XHRcdFx0XHRpZiAoZG9tLmlzRW1wdHkobm9kZSkpIHtcclxuXHRcdFx0XHRcdFx0ZW1wdHlOb2Rlcy5wdXNoKG5vZGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRmaXJzdCA9IGlucHV0LmZpcnN0Q2hpbGQ7XHJcblx0XHRcdFx0bGFzdCA9IGlucHV0Lmxhc3RDaGlsZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuXHJcblx0XHRcdC8vIEZGIGFsbG93cyA8YnIgLz4gdG8gYmUgc2VsZWN0ZWQgYnV0IGluc2VydGluZyBhIG5vZGVcclxuXHRcdFx0Ly8gaW50byA8YnIgLz4gd2lsbCBjYXVzZSBpdCBub3QgdG8gYmUgZGlzcGxheWVkIHNvIG11c3RcclxuXHRcdFx0Ly8gaW5zZXJ0IGJlZm9yZSB0aGUgPGJyIC8+IGluIEZGLlxyXG5cdFx0XHQvLyAzID0gVGV4dE5vZGVcclxuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDMgJiYgIWRvbS5jYW5IYXZlQ2hpbGRyZW4ocGFyZW50KSkge1xyXG5cdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoaW5wdXQsIHBhcmVudCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmFuZ2UuaW5zZXJ0Tm9kZShpbnB1dCk7XHJcblxyXG5cdFx0XHRcdC8vIElmIGEgbm9kZSB3YXMgc3BsaXQgb3IgaXRzIGNvbnRlbnRzIGRlbGV0ZWQsIHJlbW92ZSBhbnkgcmVzdWx0aW5nXHJcblx0XHRcdFx0Ly8gZW1wdHkgdGFncy4gRm9yIGV4YW1wbGU6XHJcblx0XHRcdFx0Ly8gPHA+fHRlc3Q8L3A+PGRpdj50ZXN0fDwvZGl2PlxyXG5cdFx0XHRcdC8vIFdoZW4gZGVsZXRlQ29udGVudHMgY291bGQgYmVjb21lOlxyXG5cdFx0XHRcdC8vIDxwPjwvcD58PGRpdj48L2Rpdj5cclxuXHRcdFx0XHQvLyBTbyByZW1vdmUgdGhlIGVtcHR5IG9uZXNcclxuXHRcdFx0XHRyZW1vdmVJZkVtcHR5KGZpcnN0ICYmIGZpcnN0LnByZXZpb3VzU2libGluZyk7XHJcblx0XHRcdFx0cmVtb3ZlSWZFbXB0eShsYXN0ICYmIGxhc3QubmV4dFNpYmxpbmcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlc3RvcmVSYW5nZSgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsb25lcyB0aGUgc2VsZWN0ZWQgUmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtSYW5nZX1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY2xvbmVTZWxlY3RlZFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNsb25lU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKTogUmFuZ2Uge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiByYW5nZS5jbG9uZVJhbmdlKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBzZWxlY3RlZCBSYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge1JhbmdlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RlZFJhbmdlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc2VsZWN0ZWRSYW5nZSA9IGZ1bmN0aW9uICgpOiBSYW5nZSB7XHJcblx0XHRcdHZhciByYW5nZSwgZmlyc3RDaGlsZCwgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKCFzZWwpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFdoZW4gY3JlYXRpbmcgYSBuZXcgcmFuZ2UsIHNldCB0aGUgc3RhcnQgdG8gdGhlIGZpcnN0IGNoaWxkXHJcblx0XHRcdC8vIGVsZW1lbnQgb2YgdGhlIGJvZHkgZWxlbWVudCB0byBhdm9pZCBlcnJvcnMgaW4gRkYuXHJcblx0XHRcdGlmIChzZWwucmFuZ2VDb3VudCA8PSAwKSB7XHJcblx0XHRcdFx0Zmlyc3RDaGlsZCA9IGRvYy5ib2R5O1xyXG5cdFx0XHRcdHdoaWxlIChmaXJzdENoaWxkLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGZpcnN0Q2hpbGQgPSBmaXJzdENoaWxkLmZpcnN0Q2hpbGQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRyYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRcdC8vIE11c3QgYmUgc2V0U3RhcnRCZWZvcmUgb3RoZXJ3aXNlIGl0IGNhbiBjYXVzZSBpbmZpbml0ZVxyXG5cdFx0XHRcdC8vIGxvb3BzIHdpdGggbGlzdHMgaW4gV2ViS2l0LiBTZWUgaXNzdWUgNDQyXHJcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoZmlyc3RDaGlsZCk7XHJcblxyXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWwucmFuZ2VDb3VudCA+IDApIHtcclxuXHRcdFx0XHRyYW5nZSA9IHNlbC5nZXRSYW5nZUF0KDApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmFuZ2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBoYXNTZWxlY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuNFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmhhc1NlbGVjdGlvbiA9IGZ1bmN0aW9uICgpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIHNlbCA9IHdpbi5nZXRTZWxlY3Rpb24oKTtcclxuXHJcblx0XHRcdHJldHVybiBzZWwgJiYgc2VsLnJhbmdlQ291bnQgPiAwO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBIVE1MXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RlZEh0bWxcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zZWxlY3RlZEh0bWwgPSBmdW5jdGlvbiAoKTogc3RyaW5nIHtcclxuXHRcdFx0dmFyIGRpdiwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgcmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBwYXJlbnQgbm9kZSBvZiB0aGUgc2VsZWN0ZWQgY29udGVudHMgaW4gdGhlIHJhbmdlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHBhcmVudE5vZGVcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5wYXJlbnROb2RlID0gZnVuY3Rpb24gKCk6IEhUTUxFbGVtZW50IHtcclxuXHRcdFx0dmFyIHJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXHJcblx0XHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGdldEZpcnN0QmxvY2tQYXJlbnRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXHJcblx0XHQgKiBjb250ZW50cyBvZiB0aGUgcmFuZ2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBbbl0gVGhlIGVsZW1lbnQgdG8gZ2V0IHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgZnJvbVxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGdldEZpcnN0QmxvY2tQYXJlbnReMlxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZ2V0Rmlyc3RCbG9ja1BhcmVudCA9IGZ1bmN0aW9uIChub2RlPzogYW55KTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHR2YXIgZnVuYyA9IGZ1bmN0aW9uIChlbG06IGFueSk6IGFueSB7XHJcblx0XHRcdFx0aWYgKCFkb20uaXNJbmxpbmUoZWxtLCB0cnVlKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGVsbTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsbSA9IGVsbSA/IGVsbS5wYXJlbnROb2RlIDogbnVsbDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGVsbSA/IGZ1bmMoZWxtKSA6IGVsbTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiBmdW5jKG5vZGUgfHwgdGhpcy5wYXJlbnROb2RlKCkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgYSBub2RlIGF0IGVpdGhlciB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7Qm9vbH0gc3RhcnRcclxuXHRcdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnROb2RlQXRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pbnNlcnROb2RlQXQgPSBmdW5jdGlvbiAoc3RhcnQ6IGJvb2xlYW4sIG5vZGU6IE5vZGUpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRSYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCByYW5nZSA9IHRoaXMuY2xvbmVTZWxlY3RlZCgpO1xyXG5cclxuXHRcdFx0aWYgKCFyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFuZ2UuY29sbGFwc2Uoc3RhcnQpO1xyXG5cdFx0XHRyYW5nZS5pbnNlcnROb2RlKG5vZGUpO1xyXG5cclxuXHRcdFx0Ly8gUmVzZWxlY3QgdGhlIGN1cnJlbnQgcmFuZ2UuXHJcblx0XHRcdC8vIEZpeGVzIGlzc3VlIHdpdGggQ2hyb21lIGxvc2luZyB0aGUgc2VsZWN0aW9uLiBJc3N1ZSM4MlxyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKGN1cnJlbnRSYW5nZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBzdGFydC9lbmQgbWFya2VycyBmb3IgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKiB3aGljaCBjYW4gYmUgdXNlZCBieSByZXN0b3JlUmFuZ2UgdG8gcmUtc2VsZWN0IHRoZVxyXG5cdFx0ICogcmFuZ2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnRNYXJrZXJzXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0TWFya2VycyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGN1cnJlbnRSYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cdFx0XHR2YXIgc3RhcnROb2RlID0gX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcik7XHJcblxyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcnMoKTtcclxuXHRcdFx0dGhpcy5pbnNlcnROb2RlQXQodHJ1ZSwgc3RhcnROb2RlKTtcclxuXHJcblx0XHRcdC8vIEZpeGVzIGlzc3VlIHdpdGggZW5kIG1hcmtlciBzb21ldGltZXMgYmVpbmcgcGxhY2VkIGJlZm9yZVxyXG5cdFx0XHQvLyB0aGUgc3RhcnQgbWFya2VyIHdoZW4gdGhlIHJhbmdlIGlzIGNvbGxhcHNlZC5cclxuXHRcdFx0aWYgKGN1cnJlbnRSYW5nZSAmJiBjdXJyZW50UmFuZ2UuY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0c3RhcnROb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxyXG5cdFx0XHRcdFx0X2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpLCBzdGFydE5vZGUubmV4dFNpYmxpbmcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuaW5zZXJ0Tm9kZUF0KGZhbHNlLCBfY3JlYXRlTWFya2VyKGVuZE1hcmtlcikpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQHJldHVybiB7Tm9kZX1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0TWFya2VyXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZ2V0TWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XHJcblx0XHRcdHJldHVybiBkb2MuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZXMgdGhlIG1hcmtlciB3aXRoIHRoZSBzcGVjaWZpZWQgSURcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcmVtb3ZlTWFya2VyXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XHJcblx0XHRcdHZhciBtYXJrZXIgPSB0aGlzLmdldE1hcmtlcihpZCk7XHJcblxyXG5cdFx0XHRpZiAobWFya2VyKSB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZShtYXJrZXIpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2F2ZXMgdGhlIGN1cnJlbnQgcmFuZ2UgbG9jYXRpb24uIEFsaWFzIG9mIGluc2VydE1hcmtlcnMoKVxyXG5cdFx0ICpcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2F2ZVJhZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zYXZlUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuaW5zZXJ0TWFya2VycygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNlbGVjdCB0aGUgc3BlY2lmaWVkIHJhbmdlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtSYW5nZX0gcmFuZ2VcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2VsZWN0UmFuZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zZWxlY3RSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xyXG5cdFx0XHR2YXIgbGFzdENoaWxkO1xyXG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cdFx0XHR2YXIgY29udGFpbmVyID0gcmFuZ2UuZW5kQ29udGFpbmVyO1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgY3Vyc29yIGlzIHNldCBhZnRlciBhIEJSIHdoZW4gdGhlIEJSIGlzIHRoZSBvbmx5XHJcblx0XHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXHJcblx0XHRcdC8vIHRvIG9jY3VyIHdoZW4gc29tZXRoaW5nIGlzIHR5cGVkLiBTZWUgaXNzdWUgIzMyMVxyXG5cdFx0XHRpZiAocmFuZ2UuY29sbGFwc2VkICYmIGNvbnRhaW5lciAmJlxyXG5cdFx0XHRcdCFkb20uaXNJbmxpbmUoY29udGFpbmVyLCB0cnVlKSkge1xyXG5cclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBjb250YWluZXIubGFzdENoaWxkO1xyXG5cdFx0XHRcdHdoaWxlIChsYXN0Q2hpbGQgJiYgZG9tLmlzKGxhc3RDaGlsZCwgJy5lbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRcdGxhc3RDaGlsZCA9IGxhc3RDaGlsZC5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoZG9tLmlzKGxhc3RDaGlsZCwgJ2JyJykpIHtcclxuXHRcdFx0XHRcdHZhciBybmcgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdHJuZy5zZXRFbmRBZnRlcihsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0cm5nLmNvbGxhcHNlKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0XHRpZiAodGhpcy5jb21wYXJlKHJhbmdlLCBybmcpKSB7XHJcblx0XHRcdFx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKGxhc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbCkge1xyXG5cdFx0XHRcdHRoaXMuY2xlYXIoKTtcclxuXHRcdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVzdG9yZXMgdGhlIGxhc3QgcmFuZ2Ugc2F2ZWQgYnkgc2F2ZVJhbmdlKCkgb3IgaW5zZXJ0TWFya2VycygpXHJcblx0XHQgKlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZXN0b3JlUmFuZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZXN0b3JlUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpc0NvbGxhcHNlZCwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKSwgc3RhcnQgPSB0aGlzLmdldE1hcmtlcihzdGFydE1hcmtlciksIGVuZCA9IHRoaXMuZ2V0TWFya2VyKGVuZE1hcmtlcik7XHJcblxyXG5cdFx0XHRpZiAoIXN0YXJ0IHx8ICFlbmQgfHwgIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpc0NvbGxhcHNlZCA9IHN0YXJ0Lm5leHRTaWJsaW5nID09PSBlbmQ7XHJcblxyXG5cdFx0XHRyYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShzdGFydCk7XHJcblx0XHRcdHJhbmdlLnNldEVuZEFmdGVyKGVuZCk7XHJcblxyXG5cdFx0XHRpZiAoaXNDb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zZWxlY3RSYW5nZShyYW5nZSk7XHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNlbGVjdHMgdGhlIHRleHQgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGxlZnRcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSByaWdodFxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdE91dGVyVGV4dCA9IGZ1bmN0aW9uIChsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIpIHtcclxuXHRcdFx0bGV0IHN0YXJ0OiBhbnksIGVuZDogYW55LCByYW5nZTogYW55ID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcblxyXG5cdFx0XHRzdGFydCA9IG91dGVyVGV4dChyYW5nZSwgdHJ1ZSwgbGVmdCk7XHJcblx0XHRcdGVuZCA9IG91dGVyVGV4dChyYW5nZSwgZmFsc2UsIHJpZ2h0KTtcclxuXHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0KHN0YXJ0Lm5vZGUsIHN0YXJ0Lm9mZnNldCk7XHJcblx0XHRcdHJhbmdlLnNldEVuZChlbmQubm9kZSwgZW5kLm9mZnNldCk7XHJcblxyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKHJhbmdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSB0ZXh0IGxlZnQgb3IgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBiZWZvcmVcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RPdXRlclRleHRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRPdXRlclRleHQgPSBmdW5jdGlvbiAoYmVmb3JlLCBsZW5ndGgpIHtcclxuXHRcdFx0dmFyIHJhbmdlID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZSghYmVmb3JlKTtcclxuXHJcblx0XHRcdHJldHVybiBvdXRlclRleHQocmFuZ2UsIGJlZm9yZSwgbGVuZ3RoKS50ZXh0O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlcGxhY2VzIGtleXdvcmRzIHdpdGggdmFsdWVzIGJhc2VkIG9uIHRoZSBjdXJyZW50IGNhcmV0IHBvc2l0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtBcnJheX0gICBrZXl3b3Jkc1xyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBpbmNsdWRlQWZ0ZXIgICAgICBJZiB0byBpbmNsdWRlIHRoZSB0ZXh0IGFmdGVyIHRoZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50IGNhcmV0IHBvc2l0aW9uIG9yIGp1c3RcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCBiZWZvcmVcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0ga2V5d29yZHNTb3J0ZWQgICAgSWYgdGhlIGtleXdvcmRzIGFycmF5IGlzIHByZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgc2hvcnRlc3QgdG8gbG9uZ2VzdFxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9ICBsb25nZXN0S2V5d29yZCAgICBMZW5ndGggb2YgdGhlIGxvbmdlc3Qga2V5d29yZFxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSByZXF1aXJlV2hpdGVzcGFjZSBJZiB0aGUga2V5IG11c3QgYmUgc3Vycm91bmRlZFxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieSB3aGl0ZXNwYWNlXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gIGtleXByZXNzQ2hhciAgICAgIElmIHRoaXMgaXMgYmVpbmcgY2FsbGVkIGZyb21cclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBrZXlwcmVzcyBldmVudCwgdGhpcyBzaG91bGQgYmVcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0IHRvIHRoZSBwcmVzc2VkIGNoYXJhY3RlclxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcmVwbGFjZUtleXdvcmRcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuXHRcdHRoaXMucmVwbGFjZUtleXdvcmQgPSBmdW5jdGlvbiAoXHJcblx0XHRcdGtleXdvcmRzLFxyXG5cdFx0XHRpbmNsdWRlQWZ0ZXIsXHJcblx0XHRcdGtleXdvcmRzU29ydGVkLFxyXG5cdFx0XHRsb25nZXN0S2V5d29yZCxcclxuXHRcdFx0cmVxdWlyZVdoaXRlc3BhY2UsXHJcblx0XHRcdGtleXByZXNzQ2hhclxyXG5cdFx0KSB7XHJcblx0XHRcdGlmICgha2V5d29yZHNTb3J0ZWQpIHtcclxuXHRcdFx0XHRrZXl3b3Jkcy5zb3J0KGZ1bmN0aW9uIChhOiBhbnksIGI6IGFueSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBvdXRlclRleHQsIG1hdGNoLCBtYXRjaFBvcywgc3RhcnRJbmRleCwgbGVmdExlbiwgY2hhcnNMZWZ0LCBrZXl3b3JkLCBrZXl3b3JkTGVuLCB3aGl0ZXNwYWNlUmVnZXggPSAnKF58W1xcXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKScsIGtleXdvcmRJZHggPSBrZXl3b3Jkcy5sZW5ndGgsIHdoaXRlc3BhY2VMZW4gPSByZXF1aXJlV2hpdGVzcGFjZSA/IDEgOiAwLCBtYXhLZXlMZW4gPSBsb25nZXN0S2V5d29yZCB8fFxyXG5cdFx0XHRcdGtleXdvcmRzW2tleXdvcmRJZHggLSAxXVswXS5sZW5ndGg7XHJcblxyXG5cdFx0XHRpZiAocmVxdWlyZVdoaXRlc3BhY2UpIHtcclxuXHRcdFx0XHRtYXhLZXlMZW4rKztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0a2V5cHJlc3NDaGFyID0ga2V5cHJlc3NDaGFyIHx8ICcnO1xyXG5cdFx0XHRvdXRlclRleHQgPSB0aGlzLmdldE91dGVyVGV4dCh0cnVlLCBtYXhLZXlMZW4pO1xyXG5cdFx0XHRsZWZ0TGVuID0gb3V0ZXJUZXh0Lmxlbmd0aDtcclxuXHRcdFx0b3V0ZXJUZXh0ICs9IGtleXByZXNzQ2hhcjtcclxuXHJcblx0XHRcdGlmIChpbmNsdWRlQWZ0ZXIpIHtcclxuXHRcdFx0XHRvdXRlclRleHQgKz0gdGhpcy5nZXRPdXRlclRleHQoZmFsc2UsIG1heEtleUxlbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChrZXl3b3JkSWR4LS0pIHtcclxuXHRcdFx0XHRrZXl3b3JkID0ga2V5d29yZHNba2V5d29yZElkeF1bMF07XHJcblx0XHRcdFx0a2V5d29yZExlbiA9IGtleXdvcmQubGVuZ3RoO1xyXG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBNYXRoLm1heCgwLCBsZWZ0TGVuIC0ga2V5d29yZExlbiAtIHdoaXRlc3BhY2VMZW4pO1xyXG5cdFx0XHRcdG1hdGNoUG9zID0gLTE7XHJcblxyXG5cdFx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xyXG5cdFx0XHRcdFx0bWF0Y2ggPSBvdXRlclRleHRcclxuXHRcdFx0XHRcdFx0LnN1YnN0cihzdGFydEluZGV4KVxyXG5cdFx0XHRcdFx0XHQubWF0Y2gobmV3IFJlZ0V4cCh3aGl0ZXNwYWNlUmVnZXggK1xyXG5cdFx0XHRcdFx0XHRcdGVzY2FwZS5yZWdleChrZXl3b3JkKSArIHdoaXRlc3BhY2VSZWdleCkpO1xyXG5cclxuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xyXG5cdFx0XHRcdFx0XHQvLyBBZGQgdGhlIGxlbmd0aCBvZiB0aGUgdGV4dCB0aGF0IHdhcyByZW1vdmVkIGJ5XHJcblx0XHRcdFx0XHRcdC8vIHN1YnN0cigpIGFuZCBhbHNvIGFkZCAxIGZvciB0aGUgd2hpdGVzcGFjZVxyXG5cdFx0XHRcdFx0XHRtYXRjaFBvcyA9IG1hdGNoLmluZGV4ICsgc3RhcnRJbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bWF0Y2hQb3MgPSBvdXRlclRleHQuaW5kZXhPZihrZXl3b3JkLCBzdGFydEluZGV4KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChtYXRjaFBvcyA+IC0xKSB7XHJcblx0XHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhlIG1hdGNoIGlzIGJldHdlZW4gYmVmb3JlIGFuZFxyXG5cdFx0XHRcdFx0Ly8gYWZ0ZXIsIG5vdCBqdXN0IGVudGlyZWx5IGluIG9uZSBzaWRlIG9yIHRoZSBvdGhlclxyXG5cdFx0XHRcdFx0aWYgKG1hdGNoUG9zIDw9IGxlZnRMZW4gJiZcclxuXHRcdFx0XHRcdFx0bWF0Y2hQb3MgKyBrZXl3b3JkTGVuICsgd2hpdGVzcGFjZUxlbiA+PSBsZWZ0TGVuKSB7XHJcblx0XHRcdFx0XHRcdGNoYXJzTGVmdCA9IGxlZnRMZW4gLSBtYXRjaFBvcztcclxuXHJcblx0XHRcdFx0XHRcdC8vIElmIHRoZSBrZXlwcmVzcyBjaGFyIGlzIHdoaXRlIHNwYWNlIHRoZW4gaXQgc2hvdWxkXHJcblx0XHRcdFx0XHRcdC8vIG5vdCBiZSByZXBsYWNlZCwgb25seSBjaGFycyB0aGF0IGFyZSBwYXJ0IG9mIHRoZVxyXG5cdFx0XHRcdFx0XHQvLyBrZXkgc2hvdWxkIGJlIHJlcGxhY2VkLlxyXG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdE91dGVyVGV4dChcclxuXHRcdFx0XHRcdFx0XHRjaGFyc0xlZnQsXHJcblx0XHRcdFx0XHRcdFx0a2V5d29yZExlbiAtIGNoYXJzTGVmdCAtXHJcblx0XHRcdFx0XHRcdFx0KC9eXFxTLy50ZXN0KGtleXByZXNzQ2hhcikgPyAxIDogMClcclxuXHRcdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0XHRcdHRoaXMuaW5zZXJ0SFRNTChrZXl3b3Jkc1trZXl3b3JkSWR4XVsxXSk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENvbXBhcmVzIHR3byByYW5nZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgcmFuZ2VCIGlzIHVuZGVmaW5lZCBpdCB3aWxsIGJlIHNldCB0b1xyXG5cdFx0ICogdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtSYW5nZX0gcm5nQVxyXG5cdFx0ICogQHBhcmFtICB7UmFuZ2V9IFtybmdCXVxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY29tcGFyZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNvbXBhcmUgPSBmdW5jdGlvbiAocm5nQT86IFJhbmdlLCBybmdCPzogUmFuZ2UpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKCFybmdCKSB7XHJcblx0XHRcdFx0cm5nQiA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXJuZ0EgfHwgIXJuZ0IpIHtcclxuXHRcdFx0XHRyZXR1cm4gIXJuZ0EgJiYgIXJuZ0I7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBybmdBLmNvbXBhcmVCb3VuZGFyeVBvaW50cyhSYW5nZS5FTkRfVE9fRU5ELCBybmdCKSA9PT0gMCAmJlxyXG5cdFx0XHRcdHJuZ0EuY29tcGFyZUJvdW5kYXJ5UG9pbnRzKFJhbmdlLlNUQVJUX1RPX1NUQVJULCBybmdCKSA9PT0gMDtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmVzIGFueSBjdXJyZW50IHNlbGVjdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEBzaW5jZSAxLjQuNlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjbGVhclxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdFx0aWYgKHNlbCkge1xyXG5cdFx0XHRcdGlmIChzZWwucmVtb3ZlQWxsUmFuZ2VzKSB7XHJcblx0XHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChzZWwuZW1wdHkpIHtcclxuXHRcdFx0XHRcdHNlbC5lbXB0eSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFByZXBhcmVzIEhUTUwgdG8gYmUgaW5zZXJ0ZWQgYnkgYWRkaW5nIGEgemVybyB3aWR0aCBzcGFjZVxyXG5cdFx0ICogaWYgdGhlIGxhc3QgY2hpbGQgaXMgZW1wdHkgYW5kIGFkZGluZyB0aGUgcmFuZ2Ugc3RhcnQvZW5kXHJcblx0XHQgKiBtYXJrZXJzIHRvIHRoZSBsYXN0IGNoaWxkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBub2RlXHJcblx0XHQgKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW2VuZE5vZGVdXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBbcmV0dXJuSHRtbF1cclxuXHRcdCAqIEByZXR1cm4ge05vZGV8c3RyaW5nfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0X3ByZXBhcmVJbnB1dCA9IChub2RlOiBOb2RlIHwgc3RyaW5nLCBlbmROb2RlOiBOb2RlIHwgc3RyaW5nLCByZXR1cm5IdG1sOiBib29sZWFuKTogTm9kZSB8IHN0cmluZyA9PiB7XHJcblx0XHRcdHZhciBsYXN0Q2hpbGQsIGZyYWcgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdGlmIChlbmROb2RlKSB7XHJcblx0XHRcdFx0XHRub2RlICs9IHRoaXMuc2VsZWN0ZWRIdG1sKCkgKyBlbmROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZnJhZyA9IGRvbS5wYXJzZUhUTUwobm9kZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIG5vZGUpO1xyXG5cclxuXHRcdFx0XHRpZiAoZW5kTm9kZSkge1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIHRoaXMuc2VsZWN0ZWRSYW5nZSgpLmV4dHJhY3RDb250ZW50cygpKTtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBlbmROb2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKGxhc3RDaGlsZCA9IGZyYWcubGFzdENoaWxkKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKCFkb20uaXNJbmxpbmUobGFzdENoaWxkLmxhc3RDaGlsZCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQubGFzdENoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZG9tLmNhbkhhdmVDaGlsZHJlbihsYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0Ly8gV2Via2l0IHdvbid0IGFsbG93IHRoZSBjdXJzb3IgdG8gYmUgcGxhY2VkIGluc2lkZSBhblxyXG5cdFx0XHRcdC8vIGVtcHR5IHRhZywgc28gYWRkIGEgemVybyB3aWR0aCBzcGFjZSB0byBpdC5cclxuXHRcdFx0XHRpZiAoIWxhc3RDaGlsZC5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdcXHUyMDBCJykpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBmcmFnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcnMoKTtcclxuXHJcblx0XHRcdC8vIEFwcGVuZCBtYXJrcyB0byBsYXN0IGNoaWxkIHNvIHdoZW4gcmVzdG9yZWQgY3Vyc29yIHdpbGwgYmUgaW5cclxuXHRcdFx0Ly8gdGhlIHJpZ2h0IHBsYWNlXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIF9jcmVhdGVNYXJrZXIoc3RhcnRNYXJrZXIpKTtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpKTtcclxuXHJcblx0XHRcdGlmIChyZXR1cm5IdG1sKSB7XHJcblx0XHRcdFx0dmFyIGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCBmcmFnKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmcmFnO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgYSBtYXJrZXIgbm9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0X2NyZWF0ZU1hcmtlciA9IChpZDogc3RyaW5nKTogSFRNTFNwYW5FbGVtZW50ID0+IHtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoaWQpO1xyXG5cclxuXHRcdFx0dmFyIG1hcmtlciA9IGRvbS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdGlkOiBpZCxcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3Itc2VsZWN0aW9uIGVtbGVkaXRvci1pZ25vcmUnLFxyXG5cdFx0XHRcdHN0eWxlOiAnZGlzcGxheTpub25lO2xpbmUtaGVpZ2h0OjAnXHJcblx0XHRcdH0sIGRvYyk7XHJcblxyXG5cdFx0XHRtYXJrZXIuaW5uZXJIVE1MID0gJyAnO1xyXG5cclxuXHRcdFx0cmV0dXJuIG1hcmtlcjtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsInZhciBVU0VSX0FHRU5UID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuLyoqXG4gKiBEZXRlY3RzIGlmIHRoZSBicm93c2VyIGlzIGlPU1xuICpcbiAqIE5lZWRlZCB0byBmaXggaU9TIHNwZWNpZmljIGJ1Z3NcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIGlvc1xuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaW9zID0gL2lQaG9uZXxpUG9kfGlQYWR8IHdvc2Jyb3dzZXJcXC8vaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG4vKipcbiAqIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFdZU0lXWUcgZWRpdGluZyAoZS5nLiBvbGRlciBtb2JpbGUgYnJvd3NlcnMpLlxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaXNXeXNpd3lnU3VwcG9ydGVkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzV3lzaXd5Z1N1cHBvcnRlZCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhclx0bWF0Y2gsIGlzVW5zdXBwb3J0ZWQ7XG5cblx0Ly8gSUUgaXMgdGhlIG9ubHkgYnJvd3NlciB0byBzdXBwb3J0IGRvY3VtZW50TW9kZVxuXHR2YXIgaWUgPSAhIXdpbmRvdy5kb2N1bWVudC5kb2N1bWVudE1vZGU7XG5cdHZhciBsZWdhY3lFZGdlID0gJy1tcy1pbWUtYWxpZ24nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpdi5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuXG5cdC8vIENoZWNrIGlmIHRoZSBjb250ZW50RWRpdGFibGUgYXR0cmlidXRlIGlzIHN1cHBvcnRlZFxuXHRpZiAoISgnY29udGVudEVkaXRhYmxlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHx8XG5cdFx0ZGl2LmNvbnRlbnRFZGl0YWJsZSAhPT0gJ3RydWUnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gSSB0aGluayBibGFja2JlcnJ5IHN1cHBvcnRzIGNvbnRlbnRFZGl0YWJsZSBvciB3aWxsIGF0IGxlYXN0XG5cdC8vIGdpdmUgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIGNvbnRlbnRFZGl0YWJsZSBkZXRlY3Rpb24gYWJvdmVcblx0Ly8gc28gaXQgaXNuJ3QgaW5jbHVkZWQgaW4gdGhlIGJlbG93IHRlc3RzLlxuXG5cdC8vIEkgaGF0ZSBoYXZpbmcgdG8gZG8gVUEgc25pZmZpbmcgYnV0IHNvbWUgbW9iaWxlIGJyb3dzZXJzIHNheSB0aGV5XG5cdC8vIHN1cHBvcnQgY29udGVudGVkaWFibGUgd2hlbiBpdCBpc24ndCB1c2FibGUsIGkuZS4geW91IGNhbid0IGVudGVyXG5cdC8vIHRleHQuXG5cdC8vIFRoaXMgaXMgdGhlIG9ubHkgd2F5IEkgY2FuIHRoaW5rIG9mIHRvIGRldGVjdCB0aGVtIHdoaWNoIGlzIGFsc28gaG93XG5cdC8vIGV2ZXJ5IG90aGVyIGVkaXRvciBJJ3ZlIHNlZW4gZGVhbHMgd2l0aCB0aGlzIGlzc3VlLlxuXG5cdC8vIEV4Y2x1ZGUgT3BlcmEgbW9iaWxlIGFuZCBtaW5pXG5cdGlzVW5zdXBwb3J0ZWQgPSAvT3BlcmEgTW9iaXxPcGVyYSBNaW5pL2kudGVzdChVU0VSX0FHRU5UKTtcblxuXHRpZiAoL0FuZHJvaWQvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IHRydWU7XG5cblx0XHRpZiAoL1NhZmFyaS8udGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdFx0Ly8gQW5kcm9pZCBicm93c2VyIDUzNCsgc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZVxuXHRcdFx0Ly8gVGhpcyBhbHNvIG1hdGNoZXMgQ2hyb21lIHdoaWNoIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGUgdG9vXG5cdFx0XHRtYXRjaCA9IC9TYWZhcmlcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgQW1hem9uIFNpbGsgc3VwcG9ydHMgaXQsIG9sZGVyIHZlcnNpb25zIGRpZG4ndFxuXHQvLyBBcyBpdCB1c2VzIHdlYmtpdCBsaWtlIEFuZHJvaWQsIGFzc3VtZSBpdCdzIHRoZSBzYW1lIGFuZCBzdGFydGVkXG5cdC8vIHdvcmtpbmcgYXQgdmVyc2lvbnMgPj0gNTM0XG5cdGlmICgvIFNpbGtcXC8vaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0bWF0Y2ggPSAvQXBwbGVXZWJLaXRcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0aXNVbnN1cHBvcnRlZCA9ICghbWF0Y2ggfHwgIW1hdGNoWzFdID8gdHJ1ZSA6IG1hdGNoWzFdIDwgNTM0KTtcblx0fVxuXG5cdC8vIGlPUyA1KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdGlmIChpb3MpIHtcblx0XHQvLyBCbG9jayBhbnkgdmVyc2lvbiA8PSA0X3goX3gpXG5cdFx0aXNVbnN1cHBvcnRlZCA9IC9PUyBbMC00XShfXFxkKSsgbGlrZSBNYWMvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXHR9XG5cblx0Ly8gRmlyZWZveCBkb2VzIHN1cHBvcnQgV1lTSVdZRyBvbiBtb2JpbGVzIHNvIG92ZXJyaWRlXG5cdC8vIGFueSBwcmV2aW91cyB2YWx1ZSBpZiB1c2luZyBGRlxuXHRpZiAoL0ZpcmVmb3gvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0aWYgKC9PbmVCcm93c2VyL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIFVDQnJvd3NlciB3b3JrcyBidXQgZG9lc24ndCBnaXZlIGEgdW5pcXVlIHVzZXIgYWdlbnRcblx0aWYgKG5hdmlnYXRvci52ZW5kb3IgPT09ICdVQ1dFQicpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHQvLyBJRSBhbmQgbGVnYWN5IGVkZ2UgYXJlIG5vdCBzdXBwb3J0ZWQgYW55IG1vcmVcblx0aWYgKGllIHx8IGxlZ2FjeUVkZ2UpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiAhaXNVbnN1cHBvcnRlZDtcbn0oKSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcbmltcG9ydCBfdG1wbCBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XG5cbi8qKlxuICogRml4ZXMgYSBidWcgaW4gRkYgd2hlcmUgaXQgc29tZXRpbWVzIHdyYXBzXG4gKiBuZXcgbGluZXMgaW4gdGhlaXIgb3duIGxpc3QgaXRlbS5cbiAqIFNlZSBpc3N1ZSAjMzU5XG4gKi9cbmZ1bmN0aW9uIGZpeEZpcmVmb3hMaXN0QnVnKGVkaXRvcikge1xuXHQvLyBPbmx5IGFwcGx5IHRvIEZpcmVmb3ggYXMgd2lsbCBicmVhayBvdGhlciBicm93c2Vycy5cblx0aWYgKCdtb3pIaWRkZW4nIGluIGRvY3VtZW50KSB7XG5cdFx0dmFyIG5vZGUgPSBlZGl0b3IuZ2V0Qm9keSgpO1xuXHRcdHZhciBuZXh0O1xuXG5cdFx0d2hpbGUgKG5vZGUpIHtcblx0XHRcdG5leHQgPSBub2RlO1xuXG5cdFx0XHRpZiAobmV4dC5maXJzdENoaWxkKSB7XG5cdFx0XHRcdG5leHQgPSBuZXh0LmZpcnN0Q2hpbGQ7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHdoaWxlIChuZXh0ICYmICFuZXh0Lm5leHRTaWJsaW5nKSB7XG5cdFx0XHRcdFx0bmV4dCA9IG5leHQucGFyZW50Tm9kZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChuZXh0KSB7XG5cdFx0XHRcdFx0bmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgL1tcXG5cXHJcXHRdKy8udGVzdChub2RlLm5vZGVWYWx1ZSkpIHtcblx0XHRcdFx0Ly8gT25seSByZW1vdmUgaWYgbmV3bGluZXMgYXJlIGNvbGxhcHNlZFxuXHRcdFx0XHRpZiAoIS9ecHJlLy50ZXN0KGRvbS5jc3Mobm9kZS5wYXJlbnROb2RlLCAnd2hpdGVTcGFjZScpKSkge1xuXHRcdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bm9kZSA9IG5leHQ7XG5cdFx0fVxuXHR9XG59XG5cblxuLyoqXG4gKiBNYXAgb2YgYWxsIHRoZSBjb21tYW5kcyBmb3IgRW1sRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQG5hbWUgY29tbWFuZHNcbiAqL1xudmFyIGRlZmF1bHRDbWRzID0ge1xuXHQvLyBTVEFSVF9DT01NQU5EOiBCb2xkXG5cdGJvbGQ6IHtcblx0XHRleGVjOiAnYm9sZCcsXG5cdFx0dG9vbHRpcDogJ0JvbGQnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtCJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBJdGFsaWNcblx0aXRhbGljOiB7XG5cdFx0ZXhlYzogJ2l0YWxpYycsXG5cdFx0dG9vbHRpcDogJ0l0YWxpYycsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0knXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVuZGVybGluZVxuXHR1bmRlcmxpbmU6IHtcblx0XHRleGVjOiAndW5kZXJsaW5lJyxcblx0XHR0b29sdGlwOiAnVW5kZXJsaW5lJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrVSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogU3RyaWtldGhyb3VnaFxuXHRzdHJpa2U6IHtcblx0XHRleGVjOiAnc3RyaWtldGhyb3VnaCcsXG5cdFx0dG9vbHRpcDogJ1N0cmlrZXRocm91Z2gnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1YnNjcmlwdFxuXHRzdWJzY3JpcHQ6IHtcblx0XHRleGVjOiAnc3Vic2NyaXB0Jyxcblx0XHR0b29sdGlwOiAnU3Vic2NyaXB0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdXBlcnNjcmlwdFxuXHRzdXBlcnNjcmlwdDoge1xuXHRcdGV4ZWM6ICdzdXBlcnNjcmlwdCcsXG5cdFx0dG9vbHRpcDogJ1N1cGVyc2NyaXB0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IExlZnRcblx0bGVmdDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMykge1xuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZSkge1xuXHRcdFx0XHR2YXIgaXNMdHIgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cic7XG5cdFx0XHRcdHZhciBhbGlnbiA9IGRvbS5jc3Mobm9kZSwgJ3RleHRBbGlnbicpO1xuXG5cdFx0XHRcdC8vIENhbiBiZSAtbW96LWxlZnRcblx0XHRcdFx0cmV0dXJuIC9sZWZ0Ly50ZXN0KGFsaWduKSB8fFxuXHRcdFx0XHRcdGFsaWduID09PSAoaXNMdHIgPyAnc3RhcnQnIDogJ2VuZCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZXhlYzogJ2p1c3RpZnlsZWZ0Jyxcblx0XHR0b29sdGlwOiAnQWxpZ24gbGVmdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQ2VudHJlXG5cdGNlbnRlcjoge1xuXHRcdGV4ZWM6ICdqdXN0aWZ5Y2VudGVyJyxcblx0XHR0b29sdGlwOiAnQ2VudGVyJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBSaWdodFxuXHRyaWdodDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gMykge1xuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZSkge1xuXHRcdFx0XHR2YXIgaXNMdHIgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cic7XG5cdFx0XHRcdHZhciBhbGlnbiA9IGRvbS5jc3Mobm9kZSwgJ3RleHRBbGlnbicpO1xuXG5cdFx0XHRcdC8vIENhbiBiZSAtbW96LXJpZ2h0XG5cdFx0XHRcdHJldHVybiAvcmlnaHQvLnRlc3QoYWxpZ24pIHx8XG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdlbmQnIDogJ3N0YXJ0Jyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRleGVjOiAnanVzdGlmeXJpZ2h0Jyxcblx0XHR0b29sdGlwOiAnQWxpZ24gcmlnaHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEp1c3RpZnlcblx0anVzdGlmeToge1xuXHRcdGV4ZWM6ICdqdXN0aWZ5ZnVsbCcsXG5cdFx0dG9vbHRpcDogJ0p1c3RpZnknXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRm9udFxuXHRmb250OiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGRvbS5kYXRhKHRoaXMsICdmb250JykpO1xuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5vcHRzLmZvbnRzLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoZm9udCkge1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2ZvbnRPcHQnLCB7XG5cdFx0XHRcdFx0Zm9udDogZm9udFxuXHRcdFx0XHR9LCB0cnVlKSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2ZvbnQtcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuZm9udC5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250TmFtZSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRuYW1lJywgZm9udE5hbWUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBOYW1lJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTaXplXG5cdHNpemU6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ3NpemUnKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gNzsgaSsrKSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnc2l6ZU9wdCcsIHtcblx0XHRcdFx0XHRzaXplOiBpXG5cdFx0XHRcdH0sIHRydWUpKTtcblx0XHRcdH1cblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2ZvbnRzaXplLXBpY2tlcicsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLnNpemUuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoZm9udFNpemUpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb250c2l6ZScsIGZvbnRTaXplKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0ZvbnQgU2l6ZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29sb3VyXG5cdGNvbG9yOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdGh0bWwgICAgPSAnJyxcblx0XHRcdFx0Y21kICAgICA9IGRlZmF1bHRDbWRzLmNvbG9yO1xuXG5cdFx0XHRpZiAoIWNtZC5faHRtbENhY2hlKSB7XG5cdFx0XHRcdGVkaXRvci5vcHRzLmNvbG9ycy5zcGxpdCgnfCcpLmZvckVhY2goZnVuY3Rpb24gKGNvbHVtbikge1xuXHRcdFx0XHRcdGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJlbWxlZGl0b3ItY29sb3ItY29sdW1uXCI+JztcblxuXHRcdFx0XHRcdGNvbHVtbi5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKGNvbG9yKSB7XG5cdFx0XHRcdFx0XHRodG1sICs9XG5cdFx0XHRcdFx0XHRcdCc8YSBocmVmPVwiI1wiIGNsYXNzPVwiZW1sZWRpdG9yLWNvbG9yLW9wdGlvblwiJyArXG5cdFx0XHRcdFx0XHRcdCcgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAnICsgY29sb3IgKyAnXCInICtcblx0XHRcdFx0XHRcdFx0JyBkYXRhLWNvbG9yPVwiJyArIGNvbG9yICsgJ1wiPjwvYT4nO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aHRtbCArPSAnPC9kaXY+Jztcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Y21kLl9odG1sQ2FjaGUgPSBodG1sO1xuXHRcdFx0fVxuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgZG9tLnBhcnNlSFRNTChjbWQuX2h0bWxDYWNoZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnY29sb3InKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2NvbG9yLXBpY2tlcicsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmNvbG9yLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGNvbG9yKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9yZWNvbG9yJywgY29sb3IpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBDb2xvcidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUmVtb3ZlIEZvcm1hdFxuXHRyZW1vdmVmb3JtYXQ6IHtcblx0XHRleGVjOiAncmVtb3ZlZm9ybWF0Jyxcblx0XHR0b29sdGlwOiAnUmVtb3ZlIEZvcm1hdHRpbmcnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogQ3V0XG5cdGN1dDoge1xuXHRcdGV4ZWM6ICdjdXQnLFxuXHRcdHRvb2x0aXA6ICdDdXQnLFxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY3V0IGNvbW1hbmQuICcgK1xuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLVgnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvcHlcblx0Y29weToge1xuXHRcdGV4ZWM6ICdjb3B5Jyxcblx0XHR0b29sdGlwOiAnQ29weScsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjb3B5IGNvbW1hbmQuICcgK1xuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLUMnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlXG5cdHBhc3RlOiB7XG5cdFx0ZXhlYzogJ3Bhc3RlJyxcblx0XHR0b29sdGlwOiAnUGFzdGUnLFxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgcGFzdGUgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtVidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGUgVGV4dFxuXHRwYXN0ZXRleHQ6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdHZhbCxcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0ZWRpdG9yICA9IHRoaXM7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgncGFzdGV0ZXh0Jywge1xuXHRcdFx0XHRsYWJlbDogZWRpdG9yLl8oXG5cdFx0XHRcdFx0J1Bhc3RlIHlvdXIgdGV4dCBpbnNpZGUgdGhlIGZvbGxvd2luZyBib3g6J1xuXHRcdFx0XHQpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YWwgPSBkb20uZmluZChjb250ZW50LCAnI3R4dCcpWzBdLnZhbHVlO1xuXG5cdFx0XHRcdGlmICh2YWwpIHtcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydFRleHQodmFsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ3Bhc3RldGV4dCcsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1Bhc3RlIFRleHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJ1bGxldCBMaXN0XG5cdGJ1bGxldGxpc3Q6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcblx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ2luc2VydHVub3JkZXJlZGxpc3QnKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdCdWxsZXQgbGlzdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogT3JkZXJlZCBMaXN0XG5cdG9yZGVyZWRsaXN0OiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0Zml4RmlyZWZveExpc3RCdWcodGhpcyk7XG5cdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdpbnNlcnRvcmRlcmVkbGlzdCcpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ051bWJlcmVkIGxpc3QnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEluZGVudFxuXHRpbmRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudCwgZmlyc3RCbG9jaykge1xuXHRcdFx0Ly8gT25seSB3b3JrcyB3aXRoIGxpc3RzLCBmb3Igbm93XG5cdFx0XHR2YXJcdHJhbmdlLCBzdGFydFBhcmVudCwgZW5kUGFyZW50O1xuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICdsaScpKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIHdob2xlIGxpc3QgaXMgc2VsZWN0ZWQsIHRoZW4gdGhpcyBtdXN0IGJlXG5cdFx0XHRcdC8vIGludmFsaWRhdGVkIGJlY2F1c2UgdGhlIGJyb3dzZXIgd2lsbCBwbGFjZSBhXG5cdFx0XHRcdC8vIDxibG9ja3F1b3RlPiB0aGVyZVxuXHRcdFx0XHRyYW5nZSA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdFx0c3RhcnRQYXJlbnQgPSByYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xuXHRcdFx0XHRlbmRQYXJlbnQgICA9IHJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnROb2RlO1xuXG5cdFx0XHRcdC8vIFRPRE86IGNvdWxkIHVzZSBub2RlVHlwZSBmb3IgdGhpcz9cblx0XHRcdFx0Ly8gTWF5YmUganVzdCBjaGVjayB0aGUgZmlyc3RCbG9jayBjb250YWlucyBib3RoIHRoZSBzdGFydFxuXHRcdFx0XHQvL2FuZCBlbmQgY29udGFpbmVyc1xuXG5cdFx0XHRcdC8vIFNlbGVjdCB0aGUgdGFnLCBub3QgdGhlIHRleHROb2RlXG5cdFx0XHRcdC8vICh0aGF0J3Mgd2h5IHRoZSBwYXJlbnROb2RlKVxuXHRcdFx0XHRpZiAoc3RhcnRQYXJlbnQgIT09XG5cdFx0XHRcdFx0c3RhcnRQYXJlbnQucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCB8fFxuXHRcdFx0XHRcdC8vIHdvcmsgYXJvdW5kIGEgYnVnIGluIEZGXG5cdFx0XHRcdFx0KGRvbS5pcyhlbmRQYXJlbnQsICdsaScpICYmIGVuZFBhcmVudCAhPT1cblx0XHRcdFx0XHRcdGVuZFBhcmVudC5wYXJlbnROb2RlLmxhc3RFbGVtZW50Q2hpbGQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdGJsb2NrID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0Ly8gQW4gaW5kZW50IHN5c3RlbSBpcyBxdWl0ZSBjb21wbGljYXRlZCBhcyB0aGVyZSBhcmUgbG9hZHNcblx0XHRcdC8vIG9mIGNvbXBsaWNhdGlvbnMgYW5kIGlzc3VlcyBhcm91bmQgaG93IHRvIGluZGVudCB0ZXh0XG5cdFx0XHQvLyBBcyBkZWZhdWx0LCBsZXQncyBqdXN0IHN0YXkgd2l0aCBpbmRlbnRpbmcgdGhlIGxpc3RzLFxuXHRcdFx0Ly8gYXQgbGVhc3QsIGZvciBub3cuXG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdpbmRlbnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdBZGQgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBPdXRkZW50XG5cdG91dGRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudHMsIGZpcnN0QmxvY2spIHtcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdChmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpID8gMCA6IC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRibG9jayA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnb3V0ZGVudCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1JlbW92ZSBvbmUgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRhYmxlXG5cdHRhYmxlOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcyxcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd0YWJsZScsIHtcblx0XHRcdFx0cm93czogZWRpdG9yLl8oJ1Jvd3M6JyksXG5cdFx0XHRcdGNvbHM6IGVkaXRvci5fKCdDb2xzOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXJcdHJvd3MgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNyb3dzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGNvbHMgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNjb2xzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGh0bWwgPSAnPHRhYmxlPic7XG5cblx0XHRcdFx0aWYgKHJvd3MgPiAwICYmIGNvbHMgPiAwKSB7XG5cdFx0XHRcdFx0aHRtbCArPSBBcnJheShyb3dzICsgMSkuam9pbihcblx0XHRcdFx0XHRcdCc8dHI+JyArXG5cdFx0XHRcdFx0XHRcdEFycmF5KGNvbHMgKyAxKS5qb2luKFxuXHRcdFx0XHRcdFx0XHRcdCc8dGQ+PGJyIC8+PC90ZD4nXG5cdFx0XHRcdFx0XHRcdCkgK1xuXHRcdFx0XHRcdFx0JzwvdHI+J1xuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRodG1sICs9ICc8L3RhYmxlPic7XG5cblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoaHRtbCk7XG5cdFx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydHRhYmxlJywgY29udGVudCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgdGFibGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogSG9yaXpvbnRhbCBSdWxlXG5cdGhvcml6b250YWxydWxlOiB7XG5cdFx0ZXhlYzogJ2luc2VydGhvcml6b250YWxydWxlJyxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgaG9yaXpvbnRhbCBydWxlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvZGVcblx0Y29kZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdCc8Y29kZT4nLFxuXHRcdFx0XHQnPGJyIC8+PC9jb2RlPidcblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnQ29kZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBJbWFnZVxuXHRpbWFnZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBzZWxlY3RlZCwgY2IpIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdpbWFnZScsIHtcblx0XHRcdFx0dXJsOiBlZGl0b3IuXygnVVJMOicpLFxuXHRcdFx0XHR3aWR0aDogZWRpdG9yLl8oJ1dpZHRoIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGhlaWdodDogZWRpdG9yLl8oJ0hlaWdodCAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cblx0XHRcdHZhclx0dXJsSW5wdXQgPSBkb20uZmluZChjb250ZW50LCAnI2ltYWdlJylbMF07XG5cblx0XHRcdHVybElucHV0LnZhbHVlID0gc2VsZWN0ZWQ7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmICh1cmxJbnB1dC52YWx1ZSkge1xuXHRcdFx0XHRcdGNiKFxuXHRcdFx0XHRcdFx0dXJsSW5wdXQudmFsdWUsXG5cdFx0XHRcdFx0XHRkb20uZmluZChjb250ZW50LCAnI3dpZHRoJylbMF0udmFsdWUsXG5cdFx0XHRcdFx0XHRkb20uZmluZChjb250ZW50LCAnI2hlaWdodCcpWzBdLnZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGltYWdlJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5pbWFnZS5fZHJvcERvd24oXG5cdFx0XHRcdGVkaXRvcixcblx0XHRcdFx0Y2FsbGVyLFxuXHRcdFx0XHQnJyxcblx0XHRcdFx0ZnVuY3Rpb24gKHVybCwgd2lkdGgsIGhlaWdodCkge1xuXHRcdFx0XHRcdHZhciBhdHRycyAgPSAnJztcblxuXHRcdFx0XHRcdGlmICh3aWR0aCkge1xuXHRcdFx0XHRcdFx0YXR0cnMgKz0gJyB3aWR0aD1cIicgKyBwYXJzZUludCh3aWR0aCwgMTApICsgJ1wiJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIGhlaWdodD1cIicgKyBwYXJzZUludChoZWlnaHQsIDEwKSArICdcIic7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YXR0cnMgKz0gJyBzcmM9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCInO1xuXG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHRcdFx0JzxpbWcnICsgYXR0cnMgKyAnIC8+J1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGltYWdlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEUtbWFpbFxuXHRlbWFpbDoge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYikge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2VtYWlsJywge1xuXHRcdFx0XHRsYWJlbDogZWRpdG9yLl8oJ0UtbWFpbDonKSxcblx0XHRcdFx0ZGVzYzogZWRpdG9yLl8oJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciBlbWFpbCA9IGRvbS5maW5kKGNvbnRlbnQsICcjZW1haWwnKVswXS52YWx1ZTtcblxuXHRcdFx0XHRpZiAoZW1haWwpIHtcblx0XHRcdFx0XHRjYihlbWFpbCwgZG9tLmZpbmQoY29udGVudCwgJyNkZXMnKVswXS52YWx1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRlbWFpbCcsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuZW1haWwuX2Ryb3BEb3duKFxuXHRcdFx0XHRlZGl0b3IsXG5cdFx0XHRcdGNhbGxlcixcblx0XHRcdFx0ZnVuY3Rpb24gKGVtYWlsLCB0ZXh0KSB7XG5cdFx0XHRcdFx0aWYgKCFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSB8fCB0ZXh0KSB7XG5cdFx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArXG5cdFx0XHRcdFx0XHRcdCdtYWlsdG86JyArIGVzY2FwZS5lbnRpdGllcyhlbWFpbCkgKyAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKCh0ZXh0IHx8IGVtYWlsKSkgK1xuXHRcdFx0XHRcdFx0XHQnPC9hPidcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsICdtYWlsdG86JyArIGVtYWlsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGVtYWlsJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IExpbmtcblx0bGluazoge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYikge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnbGluaycsIHtcblx0XHRcdFx0dXJsOiBlZGl0b3IuXygnVVJMOicpLFxuXHRcdFx0XHRkZXNjOiBlZGl0b3IuXygnRGVzY3JpcHRpb24gKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aW5zOiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0dmFyIGxpbmtJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjbGluaycpWzBdO1xuXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRVcmwoZSkge1xuXHRcdFx0XHRpZiAobGlua0lucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2IobGlua0lucHV0LnZhbHVlLCBkb20uZmluZChjb250ZW50LCAnI2RlcycpWzBdLnZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGluc2VydFVybCk7XG5cdFx0XHRkb20ub24oY29udGVudCwgJ2tleXByZXNzJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Ly8gMTMgPSBlbnRlciBrZXlcblx0XHRcdFx0aWYgKGUud2hpY2ggPT09IDEzICYmIGxpbmtJbnB1dC52YWx1ZSkge1xuXHRcdFx0XHRcdGluc2VydFVybChlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSwgZG9tLkVWRU5UX0NBUFRVUkUpO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmxpbmsuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAodXJsLCB0ZXh0KSB7XG5cdFx0XHRcdGlmICh0ZXh0IHx8ICFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSkge1xuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArIGVzY2FwZS5lbnRpdGllcyh1cmwpICsgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCB8fCB1cmwpICtcblx0XHRcdFx0XHRcdCc8L2E+J1xuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgdXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgbGluaydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBVbmxpbmtcblx0dW5saW5rOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdCh0aGlzLmN1cnJlbnROb2RlKCksICdhJykgPyAwIDogLTE7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYW5jaG9yID0gZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50Tm9kZSgpLCAnYScpO1xuXG5cdFx0XHRpZiAoYW5jaG9yKSB7XG5cdFx0XHRcdHdoaWxlIChhbmNob3IuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoYW5jaG9yLmZpcnN0Q2hpbGQsIGFuY2hvcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkb20ucmVtb3ZlKGFuY2hvcik7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnVW5saW5rJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUXVvdGVcblx0cXVvdGU6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyLCBodG1sLCBhdXRob3IpIHtcblx0XHRcdHZhclx0YmVmb3JlID0gJzxibG9ja3F1b3RlPicsXG5cdFx0XHRcdGVuZCAgICA9ICc8L2Jsb2NrcXVvdGU+JztcblxuXHRcdFx0Ly8gaWYgdGhlcmUgaXMgSFRNTCBwYXNzZWQgc2V0IGVuZCB0byBudWxsIHNvIGFueSBzZWxlY3RlZFxuXHRcdFx0Ly8gdGV4dCBpcyByZXBsYWNlZFxuXHRcdFx0aWYgKGh0bWwpIHtcblx0XHRcdFx0YXV0aG9yID0gKGF1dGhvciA/ICc8Y2l0ZT4nICtcblx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoYXV0aG9yKSArXG5cdFx0XHRcdCc8L2NpdGU+JyA6ICcnKTtcblx0XHRcdFx0YmVmb3JlID0gYmVmb3JlICsgYXV0aG9yICsgaHRtbCArIGVuZDtcblx0XHRcdFx0ZW5kICAgID0gbnVsbDtcblx0XHRcdC8vIGlmIG5vdCBhZGQgYSBuZXdsaW5lIHRvIHRoZSBlbmQgb2YgdGhlIGluc2VydGVkIHF1b3RlXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSA9PT0gJycpIHtcblx0XHRcdFx0ZW5kID0gJzxiciAvPicgKyBlbmQ7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoYmVmb3JlLCBlbmQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFF1b3RlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEVtb3RpY29uc1xuXHRlbW90aWNvbjoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHR2YXIgY3JlYXRlQ29udGVudCA9IGZ1bmN0aW9uIChpbmNsdWRlTW9yZSkge1xuXHRcdFx0XHR2YXJcdG1vcmVMaW5rLFxuXHRcdFx0XHRcdG9wdHMgICAgICAgICAgICA9IGVkaXRvci5vcHRzLFxuXHRcdFx0XHRcdGVtb3RpY29uc1Jvb3QgICA9IG9wdHMuZW1vdGljb25zUm9vdCB8fCAnJyxcblx0XHRcdFx0XHRlbW90aWNvbnNDb21wYXQgPSBvcHRzLmVtb3RpY29uc0NvbXBhdCxcblx0XHRcdFx0XHRyYW5nZUhlbHBlciAgICAgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcblx0XHRcdFx0XHRzdGFydFNwYWNlICAgICAgPSBlbW90aWNvbnNDb21wYXQgJiZcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dCh0cnVlLCAxKSAhPT0gJyAnID8gJyAnIDogJycsXG5cdFx0XHRcdFx0ZW5kU3BhY2UgICAgICAgID0gZW1vdGljb25zQ29tcGF0ICYmXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5nZXRPdXRlclRleHQoZmFsc2UsIDEpICE9PSAnICcgPyAnICcgOiAnJyxcblx0XHRcdFx0XHRjb250ZW50ICAgICAgICAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdFx0bGluZSAgICAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRcdHBlckxpbmUgICAgICAgICA9IDAsXG5cdFx0XHRcdFx0ZW1vdGljb25zICAgICAgID0gdXRpbHMuZXh0ZW5kKFxuXHRcdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0XHRvcHRzLmVtb3RpY29ucy5kcm9wZG93bixcblx0XHRcdFx0XHRcdGluY2x1ZGVNb3JlID8gb3B0cy5lbW90aWNvbnMubW9yZSA6IHt9XG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XG5cblx0XHRcdFx0cGVyTGluZSA9IE1hdGguc3FydChPYmplY3Qua2V5cyhlbW90aWNvbnMpLmxlbmd0aCk7XG5cblx0XHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdpbWcnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGVkaXRvci5pbnNlcnQoc3RhcnRTcGFjZSArIGRvbS5hdHRyKHRoaXMsICdhbHQnKSArIGVuZFNwYWNlLFxuXHRcdFx0XHRcdFx0bnVsbCwgZmFsc2UpLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoY29kZSwgZW1vdGljb24pIHtcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobGluZSwgZG9tLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcblx0XHRcdFx0XHRcdHNyYzogZW1vdGljb25zUm9vdCArIChlbW90aWNvbi51cmwgfHwgZW1vdGljb24pLFxuXHRcdFx0XHRcdFx0YWx0OiBjb2RlLFxuXHRcdFx0XHRcdFx0dGl0bGU6IGVtb3RpY29uLnRvb2x0aXAgfHwgY29kZVxuXHRcdFx0XHRcdH0pKTtcblxuXHRcdFx0XHRcdGlmIChsaW5lLmNoaWxkcmVuLmxlbmd0aCA+PSBwZXJMaW5lKSB7XG5cdFx0XHRcdFx0XHRsaW5lID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGxpbmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKCFpbmNsdWRlTW9yZSAmJiBvcHRzLmVtb3RpY29ucy5tb3JlKSB7XG5cdFx0XHRcdFx0bW9yZUxpbmsgPSBkb20uY3JlYXRlRWxlbWVudCgnYScsIHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1tb3JlJ1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKG1vcmVMaW5rLFxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZWRpdG9yLl8oJ01vcmUnKSkpO1xuXG5cdFx0XHRcdFx0ZG9tLm9uKG1vcmVMaW5rLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKFxuXHRcdFx0XHRcdFx0XHRjYWxsZXIsICdtb3JlLWVtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQodHJ1ZSlcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBtb3JlTGluayk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH07XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdlbW90aWNvbnMnLCBjcmVhdGVDb250ZW50KGZhbHNlKSk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHRkZWZhdWx0Q21kcy5lbW90aWNvbi5leGVjLmNhbGwodGhpcywgY2FsbGVyKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1vdGljb24nXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogWW91VHViZVxuXHR5b3V0dWJlOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgneW91dHViZU1lbnUnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IuXygnVmlkZW8gVVJMOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXIgdmFsID0gZG9tLmZpbmQoY29udGVudCwgJyNsaW5rJylbMF0udmFsdWU7XG5cdFx0XHRcdHZhciBpZE1hdGNoID0gdmFsLm1hdGNoKC8oPzp2PXx2XFwvfGVtYmVkXFwvfHlvdXR1LmJlXFwvKT8oW2EtekEtWjAtOV8tXXsxMX0pLyk7XG5cdFx0XHRcdHZhciB0aW1lTWF0Y2ggPSB2YWwubWF0Y2goL1smfD9dKD86c3Rhcik/dD0oKFxcZCtbaG1zXT8pezEsM30pLyk7XG5cdFx0XHRcdHZhciB0aW1lID0gMDtcblxuXHRcdFx0XHRpZiAodGltZU1hdGNoKSB7XG5cdFx0XHRcdFx0dXRpbHMuZWFjaCh0aW1lTWF0Y2hbMV0uc3BsaXQoL1tobXNdLyksIGZ1bmN0aW9uIChpLCB2YWwpIHtcblx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWUgPSAodGltZSAqIDYwKSArIE51bWJlcih2YWwpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlkTWF0Y2ggJiYgL15bYS16QS1aMC05Xy1dezExfSQvLnRlc3QoaWRNYXRjaFsxXSkpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhpZE1hdGNoWzFdLCB0aW1lKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGxpbmsnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChidG4pIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy55b3V0dWJlLl9kcm9wRG93bihlZGl0b3IsIGJ0biwgZnVuY3Rpb24gKGlkLCB0aW1lKSB7XG5cdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChfdG1wbCgneW91dHViZScsIHtcblx0XHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdFx0dGltZTogdGltZVxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBZb3VUdWJlIHZpZGVvJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IERhdGVcblx0ZGF0ZToge1xuXHRcdF9kYXRlOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG5cdFx0XHR2YXJcdG5vdyAgID0gbmV3IERhdGUoKSxcblx0XHRcdFx0eWVhciAgPSBub3cuZ2V0WWVhcigpLFxuXHRcdFx0XHRtb250aCA9IG5vdy5nZXRNb250aCgpICsgMSxcblx0XHRcdFx0ZGF5ICAgPSBub3cuZ2V0RGF0ZSgpO1xuXG5cdFx0XHRpZiAoeWVhciA8IDIwMDApIHtcblx0XHRcdFx0eWVhciA9IDE5MDAgKyB5ZWFyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobW9udGggPCAxMCkge1xuXHRcdFx0XHRtb250aCA9ICcwJyArIG1vbnRoO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZGF5IDwgMTApIHtcblx0XHRcdFx0ZGF5ID0gJzAnICsgZGF5O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZWRpdG9yLm9wdHMuZGF0ZUZvcm1hdFxuXHRcdFx0XHQucmVwbGFjZSgveWVhci9pLCB5ZWFyKVxuXHRcdFx0XHQucmVwbGFjZSgvbW9udGgvaSwgbW9udGgpXG5cdFx0XHRcdC5yZXBsYWNlKC9kYXkvaSwgZGF5KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy5kYXRlLl9kYXRlKHRoaXMpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy5kYXRlLl9kYXRlKHRoaXMpKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgY3VycmVudCBkYXRlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRpbWVcblx0dGltZToge1xuXHRcdF90aW1lOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdG5vdyAgID0gbmV3IERhdGUoKSxcblx0XHRcdFx0aG91cnMgPSBub3cuZ2V0SG91cnMoKSxcblx0XHRcdFx0bWlucyAgPSBub3cuZ2V0TWludXRlcygpLFxuXHRcdFx0XHRzZWNzICA9IG5vdy5nZXRTZWNvbmRzKCk7XG5cblx0XHRcdGlmIChob3VycyA8IDEwKSB7XG5cdFx0XHRcdGhvdXJzID0gJzAnICsgaG91cnM7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtaW5zIDwgMTApIHtcblx0XHRcdFx0bWlucyA9ICcwJyArIG1pbnM7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzZWNzIDwgMTApIHtcblx0XHRcdFx0c2VjcyA9ICcwJyArIHNlY3M7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBob3VycyArICc6JyArIG1pbnMgKyAnOicgKyBzZWNzO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLnRpbWUuX3RpbWUoKSk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgY3VycmVudCB0aW1lJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTHRyXG5cdGx0cjoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50cywgZmlyc3RCbG9jaykge1xuXHRcdFx0cmV0dXJuIGZpcnN0QmxvY2sgJiYgZmlyc3RCbG9jay5zdHlsZS5kaXJlY3Rpb24gPT09ICdsdHInO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRlZGl0b3IgPSB0aGlzLFxuXHRcdFx0XHRyYW5nZUhlbHBlciA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCAncCcpO1xuXG5cdFx0XHRcdG5vZGUgID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRcdGlmICghbm9kZSB8fCBkb20uaXMobm9kZSwgJ2JvZHknKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdG9nZ2xlVmFsdWUgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cicgPyAnJyA6ICdsdHInO1xuXHRcdFx0ZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJywgdG9nZ2xlVmFsdWUpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0xlZnQtdG8tUmlnaHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUnRsXG5cdHJ0bDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50cywgZmlyc3RCbG9jaykge1xuXHRcdFx0cmV0dXJuIGZpcnN0QmxvY2sgJiYgZmlyc3RCbG9jay5zdHlsZS5kaXJlY3Rpb24gPT09ICdydGwnO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRlZGl0b3IgPSB0aGlzLFxuXHRcdFx0XHRyYW5nZUhlbHBlciA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCAncCcpO1xuXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAncnRsJyA/ICcnIDogJ3J0bCc7XG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnUmlnaHQtdG8tTGVmdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFByaW50XG5cdHByaW50OiB7XG5cdFx0ZXhlYzogJ3ByaW50Jyxcblx0XHR0b29sdGlwOiAnUHJpbnQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTWF4aW1pemVcblx0bWF4aW1pemU6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMubWF4aW1pemUoKTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLm1heGltaXplKCF0aGlzLm1heGltaXplKCkpO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ01heGltaXplJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrU2hpZnQrTSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBTb3VyY2Vcblx0c291cmNlOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLnNvdXJjZU1vZGUoKTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMudG9nZ2xlU291cmNlTW9kZSgpO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnVmlldyBzb3VyY2UnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtTJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIHRoaXMgaXMgaGVyZSBzbyB0aGF0IGNvbW1hbmRzIGFib3ZlIGNhbiBiZSByZW1vdmVkXG5cdC8vIHdpdGhvdXQgaGF2aW5nIHRvIHJlbW92ZSB0aGUgLCBhZnRlciB0aGUgbGFzdCBvbmUuXG5cdC8vIE5lZWRlZCBmb3IgSUUuXG5cdGlnbm9yZToge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRDbWRzO1xuIiwiaW1wb3J0IHsgYXR0ciB9IGZyb20gJy4vZG9tLmpzJztcblxuLyoqXG4gKiBEZWZhdWx0IG9wdGlvbnMgZm9yIEVtbEVkaXRvclxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG5cdC8qKlxuXHQgKiBUb29sYmFyIGJ1dHRvbnMgb3JkZXIgYW5kIGdyb3Vwcy4gU2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmRcblx0ICogaGF2ZSBhIGJhciB8IHRvIHNlcGFyYXRlIGdyb3Vwc1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhcjogJ2JvbGQsaXRhbGljLHVuZGVybGluZSxzdHJpa2Usc3Vic2NyaXB0LHN1cGVyc2NyaXB0fCcgK1xuXHRcdCdsZWZ0LGNlbnRlcixyaWdodCxqdXN0aWZ5fGZvbnQsc2l6ZSxjb2xvcixyZW1vdmVmb3JtYXR8JyArXG5cdFx0J2N1dCxjb3B5LHBhc3RldGV4dHxidWxsZXRsaXN0LG9yZGVyZWRsaXN0LGluZGVudCxvdXRkZW50fCcgK1xuXHRcdCd0YWJsZXxjb2RlLHF1b3RlfGhvcml6b250YWxydWxlLGltYWdlLGVtYWlsLGxpbmssdW5saW5rfCcgK1xuXHRcdCdlbW90aWNvbix5b3V0dWJlLGRhdGUsdGltZXxsdHIscnRsfHByaW50LG1heGltaXplLHNvdXJjZScsXG5cblx0LyoqXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGNvbW1hbmRzIHRvIGV4Y2x1ZGVzIGZyb20gdGhlIHRvb2xiYXJcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHRvb2xiYXJFeGNsdWRlOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBTdHlsZXNoZWV0IHRvIGluY2x1ZGUgaW4gdGhlIFdZU0lXWUcgZWRpdG9yLiBUaGlzIGlzIHdoYXQgd2lsbCBzdHlsZVxuXHQgKiB0aGUgV1lTSVdZRyBlbGVtZW50c1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c3R5bGU6ICdqcXVlcnkuZW1sZWRpdG9yLmRlZmF1bHQuY3NzJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgZm9udHMgZm9yIHRoZSBmb250IHNlbGVjdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRmb250czogJ0FyaWFsLEFyaWFsIEJsYWNrLENvbWljIFNhbnMgTVMsQ291cmllciBOZXcsR2VvcmdpYSxJbXBhY3QsJyArXG5cdFx0J1NhbnMtc2VyaWYsU2VyaWYsVGltZXMgTmV3IFJvbWFuLFRyZWJ1Y2hldCBNUyxWZXJkYW5hJyxcblxuXHQvKipcblx0ICogQ29sb3JzIHNob3VsZCBiZSBjb21tYSBzZXBhcmF0ZWQgYW5kIGhhdmUgYSBiYXIgfCB0byBzaWduYWwgYSBuZXdcblx0ICogY29sdW1uLlxuXHQgKlxuXHQgKiBJZiBudWxsIHRoZSBjb2xvcnMgd2lsbCBiZSBhdXRvIGdlbmVyYXRlZC5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGNvbG9yczogJyMwMDAwMDAsIzQ0QjhGRiwjMUU5MkY3LCMwMDc0RDksIzAwNURDMiwjMDAzNjlCLCNiM2Q1ZjR8JyArXG5cdFx0XHQnIzQ0NDQ0NCwjQzNGRkZGLCM5REY5RkYsIzdGREJGRiwjNjhDNEU4LCM0MTlEQzEsI2Q5ZjRmZnwnICtcblx0XHRcdCcjNjY2NjY2LCM3MkZGODQsIzRDRUE1RSwjMkVDQzQwLCMxN0I1MjksIzAwOEUwMiwjYzBmMGM2fCcgK1xuXHRcdFx0JyM4ODg4ODgsI0ZGRkY0NCwjRkZGQTFFLCNGRkRDMDAsI0U4QzUwMCwjQzE5RTAwLCNmZmY1YjN8JyArXG5cdFx0XHQnI2FhYWFhYSwjRkZDOTVGLCNGRkEzMzksI0ZGODUxQiwjRTg2RTA0LCNDMTQ3MDAsI2ZmZGJiYnwnICtcblx0XHRcdCcjY2NjY2NjLCNGRjg1N0EsI0ZGNUY1NCwjRkY0MTM2LCNFODJBMUYsI0MxMDMwMCwjZmZjNmMzfCcgK1xuXHRcdFx0JyNlZWVlZWUsI0ZGNTZGRiwjRkYzMERDLCNGMDEyQkUsI0Q5MDBBNywjQjIwMDgwLCNmYmI4ZWN8JyArXG5cdFx0XHQnI2ZmZmZmZiwjRjU1MUZGLCNDRjJCRTcsI0IxMERDOSwjOUEwMEIyLCM5QTAwQjIsI2U4YjZlZicsXG5cblx0LyoqXG5cdCAqIFRoZSBsb2NhbGUgdG8gdXNlLlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0bG9jYWxlOiBhdHRyKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ2xhbmcnKSB8fCAnZW4nLFxuXG5cdC8qKlxuXHQgKiBUaGUgQ2hhcnNldCB0byB1c2Vcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGNoYXJzZXQ6ICd1dGYtOCcsXG5cblx0LyoqXG5cdCAqIENvbXBhdGliaWxpdHkgbW9kZSBmb3IgZW1vdGljb25zLlxuXHQgKlxuXHQgKiBIZWxwcyBpZiB5b3UgaGF2ZSBlbW90aWNvbnMgc3VjaCBhcyA6LyB3aGljaCB3b3VsZCBwdXQgYW4gZW1vdGljb25cblx0ICogaW5zaWRlIGh0dHA6Ly9cblx0ICpcblx0ICogVGhpcyBtb2RlIHJlcXVpcmVzIGVtb3RpY29ucyB0byBiZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2Ugb3IgZW5kIG9mXG5cdCAqIGxpbmUgY2hhcnMuIFRoaXMgbW9kZSBoYXMgbGltaXRlZCBBcyBZb3UgVHlwZSBlbW90aWNvbiBjb252ZXJzaW9uXG5cdCAqIHN1cHBvcnQuIEl0IHdpbGwgbm90IHJlcGxhY2UgQVlUIGZvciBlbmQgb2YgbGluZSBjaGFycywgb25seVxuXHQgKiBlbW90aWNvbnMgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlLiBUaGV5IHdpbGwgc3RpbGwgYmUgcmVwbGFjZWRcblx0ICogY29ycmVjdGx5IHdoZW4gbG9hZGVkIGp1c3Qgbm90IEFZVC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRlbW90aWNvbnNDb21wYXQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBlbmFibGUgZW1vdGljb25zLiBDYW4gYmUgY2hhbmdlcyBhdCBydW50aW1lIHVzaW5nIHRoZVxuXHQgKiBlbW90aWNvbnMoKSBtZXRob2QuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKiBAc2luY2UgMS40LjJcblx0ICovXG5cdGVtb3RpY29uc0VuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIEVtb3RpY29uIHJvb3QgVVJMXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRlbW90aWNvbnNSb290OiAnJyxcblx0ZW1vdGljb25zOiB7XG5cdFx0ZHJvcGRvd246IHtcblx0XHRcdCc6KSc6ICdlbW90aWNvbnMvc21pbGUucG5nJyxcblx0XHRcdCc6YW5nZWw6JzogJ2Vtb3RpY29ucy9hbmdlbC5wbmcnLFxuXHRcdFx0JzphbmdyeTonOiAnZW1vdGljb25zL2FuZ3J5LnBuZycsXG5cdFx0XHQnOC0pJzogJ2Vtb3RpY29ucy9jb29sLnBuZycsXG5cdFx0XHQnOlxcJygnOiAnZW1vdGljb25zL2N3eS5wbmcnLFxuXHRcdFx0Jzplcm1tOic6ICdlbW90aWNvbnMvZXJtbS5wbmcnLFxuXHRcdFx0JzpEJzogJ2Vtb3RpY29ucy9ncmluLnBuZycsXG5cdFx0XHQnPDMnOiAnZW1vdGljb25zL2hlYXJ0LnBuZycsXG5cdFx0XHQnOignOiAnZW1vdGljb25zL3NhZC5wbmcnLFxuXHRcdFx0JzpPJzogJ2Vtb3RpY29ucy9zaG9ja2VkLnBuZycsXG5cdFx0XHQnOlAnOiAnZW1vdGljb25zL3Rvbmd1ZS5wbmcnLFxuXHRcdFx0JzspJzogJ2Vtb3RpY29ucy93aW5rLnBuZydcblx0XHR9LFxuXHRcdG1vcmU6IHtcblx0XHRcdCc6YWxpZW46JzogJ2Vtb3RpY29ucy9hbGllbi5wbmcnLFxuXHRcdFx0JzpibGluazonOiAnZW1vdGljb25zL2JsaW5rLnBuZycsXG5cdFx0XHQnOmJsdXNoOic6ICdlbW90aWNvbnMvYmx1c2gucG5nJyxcblx0XHRcdCc6Y2hlZXJmdWw6JzogJ2Vtb3RpY29ucy9jaGVlcmZ1bC5wbmcnLFxuXHRcdFx0JzpkZXZpbDonOiAnZW1vdGljb25zL2RldmlsLnBuZycsXG5cdFx0XHQnOmRpenp5Oic6ICdlbW90aWNvbnMvZGl6enkucG5nJyxcblx0XHRcdCc6Z2V0bG9zdDonOiAnZW1vdGljb25zL2dldGxvc3QucG5nJyxcblx0XHRcdCc6aGFwcHk6JzogJ2Vtb3RpY29ucy9oYXBweS5wbmcnLFxuXHRcdFx0JzpraXNzaW5nOic6ICdlbW90aWNvbnMva2lzc2luZy5wbmcnLFxuXHRcdFx0JzpuaW5qYTonOiAnZW1vdGljb25zL25pbmphLnBuZycsXG5cdFx0XHQnOnBpbmNoOic6ICdlbW90aWNvbnMvcGluY2gucG5nJyxcblx0XHRcdCc6cG91dHk6JzogJ2Vtb3RpY29ucy9wb3V0eS5wbmcnLFxuXHRcdFx0JzpzaWNrOic6ICdlbW90aWNvbnMvc2ljay5wbmcnLFxuXHRcdFx0JzpzaWRld2F5czonOiAnZW1vdGljb25zL3NpZGV3YXlzLnBuZycsXG5cdFx0XHQnOnNpbGx5Oic6ICdlbW90aWNvbnMvc2lsbHkucG5nJyxcblx0XHRcdCc6c2xlZXBpbmc6JzogJ2Vtb3RpY29ucy9zbGVlcGluZy5wbmcnLFxuXHRcdFx0Jzp1bnN1cmU6JzogJ2Vtb3RpY29ucy91bnN1cmUucG5nJyxcblx0XHRcdCc6d29vdDonOiAnZW1vdGljb25zL3cwMHQucG5nJyxcblx0XHRcdCc6d2Fzc2F0Oic6ICdlbW90aWNvbnMvd2Fzc2F0LnBuZydcblx0XHR9LFxuXHRcdGhpZGRlbjoge1xuXHRcdFx0Jzp3aGlzdGxpbmc6JzogJ2Vtb3RpY29ucy93aGlzdGxpbmcucG5nJyxcblx0XHRcdCc6bG92ZTonOiAnZW1vdGljb25zL3d1Yi5wbmcnXG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBXaWR0aCBvZiB0aGUgZWRpdG9yLiBTZXQgdG8gbnVsbCBmb3IgYXV0b21hdGljIHdpdGhcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR3aWR0aDogbnVsbCxcblxuXHQvKipcblx0ICogSGVpZ2h0IG9mIHRoZSBlZGl0b3IgaW5jbHVkaW5nIHRvb2xiYXIuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWNcblx0ICogaGVpZ2h0XG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0aGVpZ2h0OiBudWxsLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhbGxvdyB0aGUgZWRpdG9yIHRvIGJlIHJlc2l6ZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVFbmFibGVkOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBNaW4gcmVzaXplIHRvIHdpZHRoLCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWluV2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBNaW4gcmVzaXplIHRvIGhlaWdodCwgc2V0IHRvIG51bGwgZm9yIGhhbGYgdGV4dGFyZWEgaGVpZ2h0IG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5IZWlnaHQ6IG51bGwsXG5cdC8qKlxuXHQgKiBNYXggcmVzaXplIHRvIGhlaWdodCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSBoZWlnaHQgb3IgLTFcblx0ICogZm9yIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1heEhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBkb3VibGUgdGV4dGFyZWEgd2lkdGggb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1heFdpZHRoOiBudWxsLFxuXHQvKipcblx0ICogSWYgcmVzaXppbmcgYnkgaGVpZ2h0IGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVIZWlnaHQ6IHRydWUsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSB3aWR0aCBpcyBlbmFibGVkXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cmVzaXplV2lkdGg6IHRydWUsXG5cblx0LyoqXG5cdCAqIERhdGUgZm9ybWF0LCB3aWxsIGJlIG92ZXJyaWRkZW4gaWYgbG9jYWxlIHNwZWNpZmllcyBvbmUuXG5cdCAqXG5cdCAqIFRoZSB3b3JkcyB5ZWFyLCBtb250aCBhbmQgZGF5IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgdXNlcnMgY3VycmVudFxuXHQgKiB5ZWFyLCBtb250aCBhbmQgZGF5LlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0ZGF0ZUZvcm1hdDogJ3llYXItbW9udGgtZGF5JyxcblxuXHQvKipcblx0ICogRWxlbWVudCB0byBpbnNldCB0aGUgdG9vbGJhciBpbnRvLlxuXHQgKlxuXHQgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG5cdCAqL1xuXHR0b29sYmFyQ29udGFpbmVyOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBlbmFibGUgcGFzdGUgZmlsdGVyaW5nLiBUaGlzIGlzIGN1cnJlbnRseSBleHBlcmltZW50YWwsIHBsZWFzZVxuXHQgKiByZXBvcnQgYW55IGlzc3Vlcy5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRlbmFibGVQYXN0ZUZpbHRlcmluZzogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGNvbXBsZXRlbHkgZGlzYWJsZSBwYXN0aW5nIGludG8gdGhlIGVkaXRvclxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVQYXN0aW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHkuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cmVhZE9ubHk6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBzZXQgdGhlIGVkaXRvciB0byByaWdodC10by1sZWZ0IG1vZGUuXG5cdCAqXG5cdCAqIElmIHNldCB0byBudWxsIHRoZSBkaXJlY3Rpb24gd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGRldGVjdGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ0bDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciBvbiBwYWdlIGxvYWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvZm9jdXM6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGZvY3VzIHRoZSBlZGl0b3IgdG8gdGhlIGVuZCBvZiB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1c0VuZDogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBleHBhbmQgdGhlIGVkaXRvciB0byBmaXggdGhlIGNvbnRlbnRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvRXhwYW5kOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byB1cGRhdGUgb3JpZ2luYWwgdGV4dGJveCBvbiBibHVyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b1VwZGF0ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSB0aGUgYnJvd3NlcnMgYnVpbHQgaW4gc3BlbGwgY2hlY2tlclxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHNwZWxsY2hlY2s6IHRydWUsXG5cblx0LyoqXG5cdCAqIElmIHRvIHJ1biB0aGUgc291cmNlIGVkaXRvciB3aGVuIHRoZXJlIGlzIG5vIFdZU0lXWUcgc3VwcG9ydC4gT25seVxuXHQgKiByZWFsbHkgYXBwbGllcyB0byBtb2JpbGUgT1Mncy5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRydW5XaXRob3V0V3lzaXd5Z1N1cHBvcnQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBsb2FkIHRoZSBlZGl0b3IgaW4gc291cmNlIG1vZGUgYW5kIHN0aWxsIGFsbG93IHN3aXRjaGluZ1xuXHQgKiBiZXR3ZWVuIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2RlXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3RhcnRJblNvdXJjZU1vZGU6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBPcHRpb25hbCBJRCB0byBnaXZlIHRoZSBlZGl0b3IuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRpZDogbnVsbCxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgcGx1Z2luc1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cGx1Z2luczogJycsXG5cblx0LyoqXG5cdCAqIHotaW5kZXggdG8gc2V0IHRoZSBlZGl0b3IgY29udGFpbmVyIHRvLiBOZWVkZWQgZm9yIGpRdWVyeSBVSSBkaWFsb2cuXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0ekluZGV4OiBudWxsLFxuXG5cdC8qKlxuXHQgKiBJZiB0byB0cmltIHRoZSBCQkNvZGUuIFJlbW92ZXMgYW55IHNwYWNlcyBhdCB0aGUgc3RhcnQgYW5kIGVuZCBvZiB0aGVcblx0ICogQkJDb2RlIHN0cmluZy5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRiYmNvZGVUcmltOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZGlzYWJsZSByZW1vdmluZyBibG9jayBsZXZlbCBlbGVtZW50cyBieSBwcmVzc2luZyBiYWNrc3BhY2UgYXRcblx0ICogdGhlIHN0YXJ0IG9mIHRoZW1cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRkaXNhYmxlQmxvY2tSZW1vdmU6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBBcnJheSBvZiBhbGxvd2VkIFVSTCAoc2hvdWxkIGJlIGVpdGhlciBzdHJpbmdzIG9yIHJlZ2V4KSBmb3IgaWZyYW1lcy5cblx0ICpcblx0ICogSWYgaXQncyBhIHN0cmluZyB0aGVuIGlmcmFtZXMgd2hlcmUgdGhlIHN0YXJ0IG9mIHRoZSBzcmMgbWF0Y2hlcyB0aGVcblx0ICogc3BlY2lmaWVkIHN0cmluZyB3aWxsIGJlIGFsbG93ZWQuXG5cdCAqXG5cdCAqIElmIGl0J3MgYSByZWdleCB0aGVuIGlmcmFtZXMgd2hlcmUgdGhlIHNyYyBtYXRjaGVzIHRoZSByZWdleCB3aWxsIGJlXG5cdCAqIGFsbG93ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICovXG5cdGFsbG93ZWRJZnJhbWVVcmxzOiBbXSxcblxuXHQvKipcblx0ICogQkJDb2RlIHBhcnNlciBvcHRpb25zLCBvbmx5IGFwcGxpZXMgaWYgdXNpbmcgdGhlIGVkaXRvciBpbiBCQkNvZGVcblx0ICogbW9kZS5cblx0ICpcblx0ICogU2VlIEVtbEVkaXRvci5CQkNvZGVQYXJzZXIuZGVmYXVsdHMgZm9yIGxpc3Qgb2YgdmFsaWQgb3B0aW9uc1xuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0cGFyc2VyT3B0aW9uczogeyB9LFxuXG5cdC8qKlxuXHQgKiBDU1MgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSB0byBkcm9wZG93biBtZW51IChlZy4gei1pbmRleClcblx0ICpcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdGRyb3BEb3duQ3NzOiB7IH0sXG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIHRhZ3MgdGhhdCBhcmUgYWxsb3dlZCBpbiB0aGUgZWRpdG9yIGNvbnRlbnQuXG5cdCAqIElmIGEgdGFnIGlzIG5vdCBsaXN0ZWQgaGVyZSwgaXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIGNvbnRlbnQgaXNcblx0ICogc2FuaXRpemVkLlxuXHQgKlxuXHQgKiAxIFRhZyBpcyBhbHJlYWR5IGFkZGVkIGJ5IGRlZmF1bHQ6IFsnaWZyYW1lJ10uIE5vIG5lZWQgdG8gYWRkIHRoaXNcblx0ICogZnVydGhlci5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZFRhZ3M6IFtdLFxuXG5cdC8qKlxuXHQgKiBBbiBhcnJheSBvZiBhdHRyaWJ1dGVzIHRoYXQgYXJlIGFsbG93ZWQgb24gdGFncyBpbiB0aGUgZWRpdG9yIGNvbnRlbnQuXG5cdCAqIElmIGFuIGF0dHJpYnV0ZSBpcyBub3QgbGlzdGVkIGhlcmUsIGl0IHdpbGwgYmUgcmVtb3ZlZCB3aGVuIHRoZSBjb250ZW50XG5cdCAqIGlzIHNhbml0aXplZC5cblx0ICpcblx0ICogMyBBdHRyaWJ1dGVzIGFyZSBhbHJlYWR5IGFkZGVkIGJ5IGRlZmF1bHQ6XG5cdCAqIFx0WydhbGxvd2Z1bGxzY3JlZW4nLCAnZnJhbWVib3JkZXInLCAndGFyZ2V0J10uXG5cdCAqIE5vIG5lZWQgdG8gYWRkIHRoZXNlIGZ1cnRoZXIuXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICovXG5cdGFsbG93ZWRBdHRyaWJ1dGVzOiBbXVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdE9wdGlvbnM7XG4iLCJpbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBDYWNoZSBvZiBjYW1lbENhc2UgQ1NTIHByb3BlcnR5IG5hbWVzXHJcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxyXG4gKi9cclxudmFyIGNzc1Byb3BlcnR5TmFtZUNhY2hlID0ge307XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBlbGVtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIEVMRU1FTlRfTk9ERSA9IDE7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciB0ZXh0IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIFRFWFRfTk9ERSA9IDM7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBjb21tZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIENPTU1FTlRfTk9ERSA9IDg7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGRvY3VtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIERPQ1VNRU5UX05PREUgPSA5O1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgZG9jdW1lbnQgZnJhZ21lbnRzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgdmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPSAxMTtcclxuXHJcbmZ1bmN0aW9uIHRvRmxvYXQodmFsdWUpIHtcclxuXHR2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG5cclxuXHRyZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBlbGVtZW50IHdpdGggdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVzXHJcbiAqXHJcbiAqIFdpbGwgY3JlYXRlIGl0IGluIHRoZSBjdXJyZW50IGRvY3VtZW50IHVubGVzcyBjb250ZXh0XHJcbiAqIGlzIHNwZWNpZmllZC5cclxuICpcclxuICogQHBhcmFtIHshc3RyaW5nfSB0YWdcclxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgc3RyaW5nPn0gW2F0dHJpYnV0ZXNdXHJcbiAqIEBwYXJhbSB7IURvY3VtZW50fSBbY29udGV4dF1cclxuICogQHJldHVybnMgeyFIVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgYXR0cmlidXRlcywgY29udGV4dCkge1xyXG5cdHZhciBub2RlID0gKGNvbnRleHQgfHwgZG9jdW1lbnQpLmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcblx0dXRpbHMuZWFjaChhdHRyaWJ1dGVzIHx8IHt9LCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKGtleSA9PT0gJ3N0eWxlJykge1xyXG5cdFx0XHRub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZTtcclxuXHRcdH0gZWxzZSBpZiAoa2V5IGluIG5vZGUpIHtcclxuXHRcdFx0bm9kZVtrZXldID0gdmFsdWU7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIG5vZGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIHBhcmVudHMgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMge0FycmF5PEhUTUxFbGVtZW50Pn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJlbnRzKG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0dmFyIHBhcmVudHMgPSBbXTtcclxuXHR2YXIgcGFyZW50ID0gbm9kZSB8fCB7fTtcclxuXHJcblx0d2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgIS8oOXwxMSkvLnRlc3QocGFyZW50Lm5vZGVUeXBlKSkge1xyXG5cdFx0aWYgKCFzZWxlY3RvciB8fCBpcyhwYXJlbnQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRwYXJlbnRzLnB1c2gocGFyZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJlbnRzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgZmlyc3QgcGFyZW50IG5vZGUgdGhhdCBtYXRjaGVzIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMge0hUTUxFbGVtZW50fHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJlbnQobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcGFyZW50ID0gbm9kZSB8fCB7fTtcclxuXHJcblx0d2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSkgJiYgIS8oOXwxMSkvLnRlc3QocGFyZW50Lm5vZGVUeXBlKSkge1xyXG5cdFx0aWYgKCFzZWxlY3RvciB8fCBpcyhwYXJlbnQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyB0aGUgcGFzc2VkIG5vZGUgYW5kIGFsbCBwYXJlbnRzIGFuZFxyXG4gKiByZXR1cm5zIHRoZSBmaXJzdCBtYXRjaGluZyBub2RlIGlmIGFueS5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3Qobm9kZSwgc2VsZWN0b3IpIHtcclxuXHRyZXR1cm4gaXMobm9kZSwgc2VsZWN0b3IpID8gbm9kZSA6IHBhcmVudChub2RlLCBzZWxlY3Rvcik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gdGhlIERPTVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZShub2RlKSB7XHJcblx0aWYgKG5vZGUucGFyZW50Tm9kZSkge1xyXG5cdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFwcGVuZHMgY2hpbGQgdG8gcGFyZW50IG5vZGVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7Tm9kZSB8IEhUTUxFbGVtZW50IHwgc3RyaW5nIHwgbnVsbCB9IGNoaWxkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpIHtcclxuXHRub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIGFueSBjaGlsZCBub2RlcyB0aGF0IG1hdGNoIHRoZSBzZWxlY3RvclxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudCB8IERvY3VtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybnMge05vZGVMaXN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQobm9kZSwgc2VsZWN0b3IpIHtcclxuXHRyZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZvciBvbigpIGFuZCBvZmYoKSBpZiB0byBhZGQvcmVtb3ZlIHRoZSBldmVudFxyXG4gKiB0byB0aGUgY2FwdHVyZSBwaGFzZVxyXG4gKlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgRVZFTlRfQ0FQVFVSRSA9IHRydWU7XHJcblxyXG4vKipcclxuICogRm9yIG9uKCkgYW5kIG9mZigpIGlmIHRvIGFkZC9yZW1vdmUgdGhlIGV2ZW50XHJcbiAqIHRvIHRoZSBidWJibGUgcGhhc2VcclxuICpcclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIEVWRU5UX0JVQkJMRSA9IGZhbHNlO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRzLlxyXG4gKlxyXG4gKiBFdmVudHMgc2hvdWxkIGJlIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnRzLlxyXG4gKlxyXG4gKiBJZiBzZWxlY3RvciBpcyBzcGVjaWZpZWQgdGhlIGhhbmRsZXIgd2lsbCBvbmx5IGJlXHJcbiAqIGNhbGxlZCB3aGVuIHRoZSBldmVudCB0YXJnZXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGUgfCBIVE1MRWxlbWVudCB8IFdpbmRvd30gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4uYW55KX0gZm5cclxuICogQHBhcmFtIHtib29sZWFufSBbY2FwdHVyZT1mYWxzZV1cclxuICogQHNlZSBvZmYoKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIG9uKG5vZGUsIGV2ZW50cywgc2VsZWN0b3IsIGZuLCBjYXB0dXJlKSB7XHJcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHZhciBoYW5kbGVyO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcclxuXHRcdFx0aGFuZGxlciA9IGZuWydfZW1sLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXSB8fCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdFx0XHR3aGlsZSAodGFyZ2V0ICYmIHRhcmdldCAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdFx0aWYgKGlzKHRhcmdldCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdFx0XHRcdGZuLmNhbGwodGFyZ2V0LCBlKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGZuWydfZW1sLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXSA9IGhhbmRsZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XHJcblx0XHRcdGNhcHR1cmUgPSBmbjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUgfHwgZmFsc2UpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGUgfCBIVE1MRWxlbWVudCB8IFdpbmRvd30gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gZm5cclxuICogQHBhcmFtIHtib29sZWFufSBbY2FwdHVyZT1mYWxzZV1cclxuICogQHNlZSBvbigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb2ZmKG5vZGUsIGV2ZW50cywgc2VsZWN0b3IsIGZuLCBjYXB0dXJlKSB7XHJcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHZhciBoYW5kbGVyO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcclxuXHRcdFx0aGFuZGxlciA9IGZuWydfZW1sLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZXIgPSBzZWxlY3RvcjtcclxuXHRcdFx0Y2FwdHVyZSA9IGZuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSB8fCBmYWxzZSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJZiBvbmx5IGF0dHIgcGFyYW0gaXMgc3BlY2lmaWVkIGl0IHdpbGwgZ2V0XHJcbiAqIHRoZSB2YWx1ZSBvZiB0aGUgYXR0ciBwYXJhbS5cclxuICpcclxuICogSWYgdmFsdWUgaXMgc3BlY2lmaWVkIGJ1dCBudWxsIHRoZSBhdHRyaWJ1dGVcclxuICogd2lsbCBiZSByZW1vdmVkIG90aGVyd2lzZSB0aGUgYXR0ciB2YWx1ZSB3aWxsXHJcbiAqIGJlIHNldCB0byB0aGUgcGFzc2VkIHZhbHVlLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGF0dHJcclxuICogQHBhcmFtIHs/c3RyaW5nfSBbdmFsdWVdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyLCB2YWx1ZSkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0cmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG5cdH1cclxuXHJcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcSwgbm8tZXEtbnVsbFxyXG5cdGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcblx0XHRyZW1vdmVBdHRyKG5vZGUsIGF0dHIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRub2RlLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGF0dHJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBdHRyKG5vZGUsIGF0dHIpIHtcclxuXHRub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHBhc3NlZCBlbGVtZW50cyBkaXNwbGF5IHRvIG5vbmVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRlKG5vZGUpIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gZGVmYXVsdFxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3cobm9kZSkge1xyXG5cdGNzcyhub2RlLCAnZGlzcGxheScsICcnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgYW4gZWxlbWVudHMgdmlzaWJpbGl0eVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZShub2RlKSB7XHJcblx0aWYgKGlzVmlzaWJsZShub2RlKSkge1xyXG5cdFx0aGlkZShub2RlKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c2hvdyhub2RlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIGEgY29tcHV0ZWQgQ1NTIHZhbHVlcyBvciBzZXRzIGFuIGlubGluZSBDU1MgdmFsdWVcclxuICpcclxuICogUnVsZXMgc2hvdWxkIGJlIGluIGNhbWVsQ2FzZSBmb3JtYXQgYW5kIG5vdFxyXG4gKiBoeXBoZW5hdGVkIGxpa2UgQ1NTIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7YW55fSBub2RlXHJcbiAqIEBwYXJhbSB7YW55fSBydWxlXHJcbiAqIEBwYXJhbSB7YW55fSBbdmFsdWVdXHJcbiAqIEByZXR1cm4ge2FueX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjc3Mobm9kZSwgcnVsZSwgdmFsdWUpIHtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhydWxlKSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMSA/IGdldENvbXB1dGVkU3R5bGUobm9kZSlbcnVsZV0gOiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdHV0aWxzLmVhY2gocnVsZSwgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuXHRcdFx0Y3NzKG5vZGUsIGtleSwgdmFsdWUpO1xyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIGlzTmFOIHJldHVybnMgZmFsc2UgZm9yIG51bGwsIGZhbHNlIGFuZCBlbXB0eSBzdHJpbmdzXHJcblx0XHQvLyBzbyBuZWVkIHRvIGNoZWNrIGl0J3MgdHJ1dGh5IG9yIDBcclxuXHRcdHZhciBpc051bWVyaWMgPSAodmFsdWUgfHwgdmFsdWUgPT09IDApICYmICFpc05hTih2YWx1ZSk7XHJcblx0XHRub2RlLnN0eWxlW3J1bGVdID0gaXNOdW1lcmljID8gdmFsdWUgKyAncHgnIDogdmFsdWU7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldHMgb3Igc2V0cyB0aGUgZGF0YSBhdHRyaWJ1dGVzIG9uIGEgbm9kZVxyXG4gKlxyXG4gKiBVbmxpa2UgdGhlIGpRdWVyeSB2ZXJzaW9uIHRoaXMgb25seSBzdG9yZXMgZGF0YVxyXG4gKiBpbiB0aGUgRE9NIGF0dHJpYnV0ZXMgd2hpY2ggbWVhbnMgb25seSBzdHJpbmdzXHJcbiAqIGNhbiBiZSBzdG9yZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV1cclxuICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybiB7T2JqZWN0fHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkYXRhKG5vZGUsIGtleSwgdmFsdWUpIHtcclxuXHR2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcblx0dmFyIGRhdGEgPSB7fTtcclxuXHJcblx0aWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0aWYgKGFyZ3NMZW5ndGggPT09IDEpIHtcclxuXHRcdFx0dXRpbHMuZWFjaChub2RlLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfLCBhdHRyKSB7XHJcblx0XHRcdFx0aWYgKC9eZGF0YS0vaS50ZXN0KGF0dHIubmFtZSkpIHtcclxuXHRcdFx0XHRcdGRhdGFbYXR0ci5uYW1lLnN1YnN0cig1KV0gPSBhdHRyLnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMikge1xyXG5cdFx0XHRyZXR1cm4gYXR0cihub2RlLCAnZGF0YS0nICsga2V5KTtcclxuXHRcdH1cclxuXHJcblx0XHRhdHRyKG5vZGUsICdkYXRhLScgKyBrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBub2RlIG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudCB8IENoaWxkTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXMobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG5cdGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0cmVzdWx0ID0gKG5vZGUubWF0Y2hlcyB8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XHJcblx0XHRcdG5vZGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yKS5jYWxsKG5vZGUsIHNlbGVjdG9yKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIG5vZGUgY29udGFpbnMgY2hpbGQgb3RoZXJ3aXNlIGZhbHNlLlxyXG4gKlxyXG4gKiBUaGlzIGRpZmZlcnMgZnJvbSB0aGUgRE9NIGNvbnRhaW5zKCkgbWV0aG9kIGluIHRoYXRcclxuICogaWYgbm9kZSBhbmQgY2hpbGQgYXJlIGVxdWFsIHRoaXMgd2lsbCByZXR1cm4gZmFsc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY2hpbGRcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udGFpbnMobm9kZSwgY2hpbGQpIHtcclxuXHRyZXR1cm4gbm9kZSAhPT0gY2hpbGQgJiYgbm9kZS5jb250YWlucyAmJiBub2RlLmNvbnRhaW5zKGNoaWxkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7P0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXZpb3VzRWxlbWVudFNpYmxpbmcobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcHJldiA9IG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZztcclxuXHJcblx0aWYgKHNlbGVjdG9yICYmIHByZXYpIHtcclxuXHRcdHJldHVybiBpcyhwcmV2LCBzZWxlY3RvcikgPyBwcmV2IDogbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwcmV2O1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0geyFOb2RlfSByZWZOb2RlXHJcbiAqIEByZXR1cm5zIHtOb2RlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKSB7XHJcblx0cmV0dXJuIHJlZk5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJucyB7IUFycmF5LjxzdHJpbmc+fVxyXG4gKi9cclxuZnVuY3Rpb24gY2xhc3Nlcyhub2RlKSB7XHJcblx0cmV0dXJuIG5vZGUuY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcclxuXHRyZXR1cm4gaXMobm9kZSwgJy4nICsgY2xhc3NOYW1lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcclxuXHR2YXIgY2xhc3NMaXN0ID0gY2xhc3Nlcyhub2RlKTtcclxuXHJcblx0aWYgKGNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKSB7XHJcblx0XHRjbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xyXG5cdHZhciBjbGFzc0xpc3QgPSBjbGFzc2VzKG5vZGUpO1xyXG5cclxuXHR1dGlscy5hcnJheVJlbW92ZShjbGFzc0xpc3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdG5vZGUuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oJyAnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgYSBjbGFzcyBvbiBub2RlLlxyXG4gKlxyXG4gKiBJZiBzdGF0ZSBpcyBzcGVjaWZpZWQgYW5kIGlzIHRydXRoeSBpdCB3aWxsIGFkZFxyXG4gKiB0aGUgY2xhc3MuXHJcbiAqXHJcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgZmFsc2V5IGl0IHdpbGwgcmVtb3ZlXHJcbiAqIHRoZSBjbGFzcy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N0YXRlXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSwgc3RhdGUpIHtcclxuXHRzdGF0ZSA9IHV0aWxzLmlzVW5kZWZpbmVkKHN0YXRlKSA/ICFoYXNDbGFzcyhub2RlLCBjbGFzc05hbWUpIDogc3RhdGU7XHJcblxyXG5cdGlmIChzdGF0ZSkge1xyXG5cdFx0YWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIHdpZHRoIG9mIHRoZSBwYXNzZWQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gd2lkdGgobm9kZSwgdmFsdWUpIHtcclxuXHRpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHR2YXIgY3MgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdMZWZ0KSArIHRvRmxvYXQoY3MucGFkZGluZ1JpZ2h0KTtcclxuXHRcdHZhciBib3JkZXIgPSB0b0Zsb2F0KGNzLmJvcmRlckxlZnRXaWR0aCkgKyB0b0Zsb2F0KGNzLmJvcmRlclJpZ2h0V2lkdGgpO1xyXG5cclxuXHRcdHJldHVybiBub2RlLm9mZnNldFdpZHRoIC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnd2lkdGgnLCB2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGhlaWdodCBvZiB0aGUgcGFzc2VkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhlaWdodChub2RlLCB2YWx1ZSkge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ1RvcCkgKyB0b0Zsb2F0KGNzLnBhZGRpbmdCb3R0b20pO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyVG9wV2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJCb3R0b21XaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0SGVpZ2h0IC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnaGVpZ2h0JywgdmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZ2dlcnMgYSBjdXN0b20gZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kXHJcbiAqIHNldHMgdGhlIGRldGFpbCBwcm9wZXJ0eSB0byB0aGUgZGF0YSBvYmplY3QgcGFzc2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXIobm9kZSwgZXZlbnROYW1lLCBkYXRhKSB7XHJcblx0dmFyIGV2ZW50O1xyXG5cclxuXHRpZiAodXRpbHMuaXNGdW5jdGlvbih3aW5kb3cuQ3VzdG9tRXZlbnQpKSB7XHJcblx0XHRldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcclxuXHRcdFx0ZGV0YWlsOiBkYXRhXHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZXZlbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblx0XHRldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Zpc2libGUobm9kZSkge1xyXG5cdHJldHVybiAhIW5vZGUuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0IENTUyBwcm9wZXJ0eSBuYW1lcyBpbnRvIGNhbWVsIGNhc2VcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gY2FtZWxDYXNlKHN0cmluZykge1xyXG5cdHJldHVybiBzdHJpbmdcclxuXHRcdC5yZXBsYWNlKC9eLW1zLS8sICdtcy0nKVxyXG5cdFx0LnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAobWF0Y2gsIGNoYXIpIHtcclxuXHRcdFx0cmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKTtcclxuXHRcdH0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIExvb3AgYWxsIGNoaWxkIG5vZGVzIG9mIHRoZSBwYXNzZWQgbm9kZVxyXG4gKlxyXG4gKiBUaGUgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCAxIHBhcmFtZXRlciBiZWluZyB0aGUgbm9kZS5cclxuICogSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UgdGhlIGxvb3Agd2lsbCBiZSBleGl0ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBmdW5jICAgICAgICAgICBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2l0aCBldmVyeVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgbm9kZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGlubmVybW9zdEZpcnN0ICBJZiB0aGUgaW5uZXJtb3N0IG5vZGUgc2hvdWxkIGJlIHBhc3NlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIGZ1bmN0aW9uIGJlZm9yZSBpdCdzIHBhcmVudHMuXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IHNpYmxpbmdzT25seSAgICBJZiB0byBvbmx5IHRyYXZlcnNlIHRoZSBub2RlcyBzaWJsaW5nc1xyXG4gKiBAcGFyYW0gIHtib29sZWFufSBbcmV2ZXJzZT1mYWxzZV0gSWYgdG8gdHJhdmVyc2UgdGhlIG5vZGVzIGluIHJldmVyc2VcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCByZXZlcnNlKSB7XHJcblx0bm9kZSA9IHJldmVyc2UgPyBub2RlLmxhc3RDaGlsZCA6IG5vZGUuZmlyc3RDaGlsZDtcclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdHZhciBuZXh0ID0gcmV2ZXJzZSA/IG5vZGUucHJldmlvdXNTaWJsaW5nIDogbm9kZS5uZXh0U2libGluZztcclxuXHJcblx0XHRpZiAoXHJcblx0XHRcdCghaW5uZXJtb3N0Rmlyc3QgJiYgZnVuYyhub2RlKSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdCghc2libGluZ3NPbmx5ICYmIHRyYXZlcnNlKFxyXG5cdFx0XHRcdG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHJldmVyc2VcclxuXHRcdFx0KSA9PT0gZmFsc2UpIHx8XHJcblx0XHRcdChpbm5lcm1vc3RGaXJzdCAmJiBmdW5jKG5vZGUpID09PSBmYWxzZSlcclxuXHRcdCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHQ7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogTGlrZSB0cmF2ZXJzZSBidXQgbG9vcHMgaW4gcmV2ZXJzZVxyXG4gKiBAc2VlIHRyYXZlcnNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gclRyYXZlcnNlKG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHkpIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBIVE1MIGludG8gYSBkb2N1bWVudCBmcmFnbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG4gKiBAcGFyYW0ge0RvY3VtZW50fSBbY29udGV4dF1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwsIGNvbnRleHQpIHtcclxuXHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcclxuXHJcblx0dmFyXHRyZXQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHR2YXIgdG1wID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGNvbnRleHQpO1xyXG5cclxuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcblx0d2hpbGUgKHRtcC5maXJzdENoaWxkKSB7XHJcblx0XHRhcHBlbmRDaGlsZChyZXQsIHRtcC5maXJzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYW55IHN0eWxpbmcuXHJcbiAqXHJcbiAqIEl0IGhhcyBzdHlsaW5nIGlmIGl0IGlzIG5vdCBhIHBsYWluIDxkaXY+IG9yIDxwPiBvclxyXG4gKiBpZiBpdCBoYXMgYSBjbGFzcywgc3R5bGUgYXR0cmlidXRlIG9yIGRhdGEuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGluZyhub2RlKSB7XHJcblx0cmV0dXJuIG5vZGUgJiYgKCFpcyhub2RlLCAncCxkaXYnKSB8fCBub2RlLmNsYXNzTmFtZSB8fFxyXG5cdFx0YXR0cihub2RlLCAnc3R5bGUnKSB8fCAhdXRpbHMuaXNFbXB0eU9iamVjdChkYXRhKG5vZGUpKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhbiBlbGVtZW50IGZyb20gb25lIHR5cGUgdG8gYW5vdGhlci5cclxuICpcclxuICogRm9yIGV4YW1wbGUgaXQgY2FuIGNvbnZlcnQgdGhlIGVsZW1lbnQgPGI+IHRvIDxzdHJvbmc+XHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAqIEBwYXJhbSAge3N0cmluZ30gICAgICB0b1RhZ05hbWVcclxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcbiAqIEBzaW5jZSAxLjQuNFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRFbGVtZW50KGVsZW1lbnQsIHRvVGFnTmFtZSkge1xyXG5cdHZhciBuZXdFbGVtZW50ID0gY3JlYXRlRWxlbWVudCh0b1RhZ05hbWUsIHt9LCBlbGVtZW50Lm93bmVyRG9jdW1lbnQpO1xyXG5cclxuXHR1dGlscy5lYWNoKGVsZW1lbnQuYXR0cmlidXRlcywgZnVuY3Rpb24gKF8sIGF0dHJpYnV0ZSkge1xyXG5cdFx0Ly8gU29tZSBicm93c2VycyBwYXJzZSBpbnZhbGlkIGF0dHJpYnV0ZXMgbmFtZXMgbGlrZVxyXG5cdFx0Ly8gJ3NpemVcIjInIHdoaWNoIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIHNldCwganVzdFxyXG5cdFx0Ly8gaWdub3JlIHRoZXNlLlxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0YXR0cihuZXdFbGVtZW50LCBhdHRyaWJ1dGUubmFtZSwgYXR0cmlidXRlLnZhbHVlKTtcclxuXHRcdH0gY2F0Y2ggKGV4KSB7IC8qIGVtcHR5ICovIH1cclxuXHR9KTtcclxuXHJcblx0d2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0YXBwZW5kQ2hpbGQobmV3RWxlbWVudCwgZWxlbWVudC5maXJzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdGVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3RWxlbWVudCwgZWxlbWVudCk7XHJcblxyXG5cdHJldHVybiBuZXdFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBibG9jayBsZXZlbCBlbGVtZW50cyBzZXBhcmF0ZWQgYnkgYmFycyAofClcclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCB2YXIgYmxvY2tMZXZlbExpc3QgPSAnfGJvZHl8aHJ8cHxkaXZ8aDF8aDJ8aDN8aDR8aDV8aDZ8YWRkcmVzc3xwcmV8JyArXHJcblx0J2Zvcm18dGFibGV8dGJvZHl8dGhlYWR8dGZvb3R8dGh8dHJ8dGR8bGl8b2x8dWx8YmxvY2txdW90ZXxjZW50ZXJ8JyArXHJcblx0J2RldGFpbHN8c2VjdGlvbnxhcnRpY2xlfGFzaWRlfG5hdnxtYWlufGhlYWRlcnxoZ3JvdXB8Zm9vdGVyfGZpZWxkc2V0fCcgK1xyXG5cdCdkbHxkdHxkZHxmaWd1cmV8ZmlnY2FwdGlvbnwnO1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBkbyBub3QgYWxsb3cgY2hpbGRyZW4gc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2FuSGF2ZUNoaWxkcmVuKG5vZGUpIHtcclxuXHQvLyAxICA9IEVsZW1lbnRcclxuXHQvLyA5ICA9IERvY3VtZW50XHJcblx0Ly8gMTEgPSBEb2N1bWVudCBGcmFnbWVudFxyXG5cdGlmICghLzExP3w5Ly50ZXN0KG5vZGUubm9kZVR5cGUpKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvLyBMaXN0IG9mIGVtcHR5IEhUTUwgdGFncyBzZXBhcmF0ZWQgYnkgYmFyICh8KSBjaGFyYWN0ZXIuXHJcblx0Ly8gU291cmNlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNC9pbmRleC9lbGVtZW50cy5odG1sXHJcblx0Ly8gU291cmNlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCN2b2lkLWVsZW1lbnRzXHJcblx0cmV0dXJuICgnfGlmcmFtZXxhcmVhfGJhc2V8YmFzZWZvbnR8YnJ8Y29sfGZyYW1lfGhyfGltZ3xpbnB1dHx3YnInICtcclxuXHRcdCd8aXNpbmRleHxsaW5rfG1ldGF8cGFyYW18Y29tbWFuZHxlbWJlZHxrZXlnZW58c291cmNlfHRyYWNrfCcgK1xyXG5cdFx0J29iamVjdHwnKS5pbmRleE9mKCd8JyArIG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSArICd8JykgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaXMgaW5saW5lXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCBhbnl9IGVsbVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbmNsdWRlQ29kZUFzQmxvY2s9ZmFsc2VdXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNJbmxpbmUoZWxtLCBpbmNsdWRlQ29kZUFzQmxvY2spIHtcclxuXHR2YXIgdGFnTmFtZSxcclxuXHRcdG5vZGVUeXBlID0gKGVsbSB8fCB7fSkubm9kZVR5cGUgfHwgVEVYVF9OT0RFO1xyXG5cclxuXHRpZiAobm9kZVR5cGUgIT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0cmV0dXJuIG5vZGVUeXBlID09PSBURVhUX05PREU7XHJcblx0fVxyXG5cclxuXHR0YWdOYW1lID0gZWxtLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0aWYgKHRhZ05hbWUgPT09ICdjb2RlJykge1xyXG5cdFx0cmV0dXJuICFpbmNsdWRlQ29kZUFzQmxvY2s7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gYmxvY2tMZXZlbExpc3QuaW5kZXhPZignfCcgKyB0YWdOYW1lICsgJ3wnKSA8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb3B5IHRoZSBDU1MgZnJvbSAxIG5vZGUgdG8gYW5vdGhlci5cclxuICpcclxuICogT25seSBjb3BpZXMgQ1NTIGRlZmluZWQgb24gdGhlIGVsZW1lbnQgZS5nLiBzdHlsZSBhdHRyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBmcm9tXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvXHJcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjEuMFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlDU1MoZnJvbSwgdG8pIHtcclxuXHRpZiAodG8uc3R5bGUgJiYgZnJvbS5zdHlsZSkge1xyXG5cdFx0dG8uc3R5bGUuY3NzVGV4dCA9IGZyb20uc3R5bGUuY3NzVGV4dCArIHRvLnN0eWxlLmNzc1RleHQ7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgRE9NIG5vZGUgaXMgZW1wdHlcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkobm9kZSkge1xyXG5cdGlmIChub2RlLmxhc3RDaGlsZCAmJiBpc0VtcHR5KG5vZGUubGFzdENoaWxkKSkge1xyXG5cdFx0cmVtb3ZlKG5vZGUubGFzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzID8gIW5vZGUubm9kZVZhbHVlIDpcclxuXHRcdChjYW5IYXZlQ2hpbGRyZW4obm9kZSkgJiYgIW5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpO1xyXG59XHJcblxyXG4vKipcclxuICogRml4ZXMgYmxvY2sgbGV2ZWwgZWxlbWVudHMgaW5zaWRlIGluIGlubGluZSBlbGVtZW50cy5cclxuICpcclxuICogQWxzbyBmaXhlcyBpbnZhbGlkIGxpc3QgbmVzdGluZyBieSBwbGFjaW5nIG5lc3RlZCBsaXN0c1xyXG4gKiBpbnNpZGUgdGhlIHByZXZpb3VzIGxpIHRhZyBvciB3cmFwcGluZyB0aGVtIGluIGFuIGxpIHRhZy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeE5lc3Rpbmcobm9kZSkge1xyXG5cdHRyYXZlcnNlKG5vZGUsIGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHR2YXIgbGlzdCA9ICd1bCxvbCcsXHJcblx0XHRcdGlzQmxvY2sgPSAhaXNJbmxpbmUobm9kZSwgdHJ1ZSkgJiYgbm9kZS5ub2RlVHlwZSAhPT0gQ09NTUVOVF9OT0RFLFxyXG5cdFx0XHRwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblxyXG5cdFx0Ly8gQW55IGJsb2NrbGV2ZWwgZWxlbWVudCBpbnNpZGUgYW4gaW5saW5lIGVsZW1lbnQgbmVlZHMgZml4aW5nLlxyXG5cdFx0Ly8gQWxzbyA8cD4gdGFncyB0aGF0IGNvbnRhaW4gYmxvY2tzIHNob3VsZCBiZSBmaXhlZFxyXG5cdFx0aWYgKGlzQmxvY2sgJiYgKGlzSW5saW5lKHBhcmVudCwgdHJ1ZSkgfHwgcGFyZW50LnRhZ05hbWUgPT09ICdQJykpIHtcclxuXHRcdFx0Ly8gRmluZCB0aGUgbGFzdCBpbmxpbmUgcGFyZW50IG5vZGVcclxuXHRcdFx0dmFyXHRsYXN0SW5saW5lUGFyZW50ID0gbm9kZTtcclxuXHRcdFx0d2hpbGUgKGlzSW5saW5lKGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZSwgdHJ1ZSkgfHxcclxuXHRcdFx0XHRsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGUudGFnTmFtZSA9PT0gJ1AnKSB7XHJcblx0XHRcdFx0bGFzdElubGluZVBhcmVudCA9IGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGJlZm9yZSA9IGV4dHJhY3RDb250ZW50cyhsYXN0SW5saW5lUGFyZW50LCBub2RlKTtcclxuXHRcdFx0dmFyIG1pZGRsZSA9IG5vZGU7XHJcblxyXG5cdFx0XHQvLyBDbG9uZSBpbmxpbmUgc3R5bGluZyBhbmQgYXBwbHkgaXQgdG8gdGhlIGJsb2NrcyBjaGlsZHJlblxyXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdFx0XHRcdHZhciBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKTtcclxuXHRcdFx0XHRcdHdoaWxlIChtaWRkbGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0XHRhcHBlbmRDaGlsZChjbG9uZSwgbWlkZGxlLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGFwcGVuZENoaWxkKG1pZGRsZSwgY2xvbmUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aW5zZXJ0QmVmb3JlKG1pZGRsZSwgbGFzdElubGluZVBhcmVudCk7XHJcblx0XHRcdGlmICghaXNFbXB0eShiZWZvcmUpKSB7XHJcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGJlZm9yZSwgbWlkZGxlKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaXNFbXB0eShsYXN0SW5saW5lUGFyZW50KSkge1xyXG5cdFx0XHRcdHJlbW92ZShsYXN0SW5saW5lUGFyZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEZpeCBpbnZhbGlkIG5lc3RlZCBsaXN0cyB3aGljaCBzaG91bGQgYmUgd3JhcHBlZCBpbiBhbiBsaSB0YWdcclxuXHRcdGlmIChpc0Jsb2NrICYmIGlzKG5vZGUsIGxpc3QpICYmIGlzKG5vZGUucGFyZW50Tm9kZSwgbGlzdCkpIHtcclxuXHRcdFx0dmFyIGxpID0gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlLCAnbGknKTtcclxuXHJcblx0XHRcdGlmICghbGkpIHtcclxuXHRcdFx0XHRsaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGxpLCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YXBwZW5kQ2hpbGQobGksIG5vZGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgdGhlIGNvbW1vbiBwYXJlbnQgb2YgdHdvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMVxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTJcclxuICogQHJldHVybiB7P0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21tb25BbmNlc3Rvcihub2RlMSwgbm9kZTIpIHtcclxuXHR3aGlsZSAoKG5vZGUxID0gbm9kZTEucGFyZW50Tm9kZSkpIHtcclxuXHRcdGlmIChjb250YWlucyhub2RlMSwgbm9kZTIpKSB7XHJcblx0XHRcdHJldHVybiBub2RlMTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9Ob2RlfVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmV2aW91cz1mYWxzZV1cclxuICogQHJldHVybnMgez9Ob2RlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNpYmxpbmcobm9kZSwgcHJldmlvdXMpIHtcclxuXHRpZiAoIW5vZGUpIHtcclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIChwcmV2aW91cyA/IG5vZGUucHJldmlvdXNTaWJsaW5nIDogbm9kZS5uZXh0U2libGluZykgfHxcclxuXHRcdGdldFNpYmxpbmcobm9kZS5wYXJlbnROb2RlLCBwcmV2aW91cyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHVudXNlZCB3aGl0ZXNwYWNlIGZyb20gdGhlIHJvb3QgYW5kIGFsbCBpdCdzIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gcm9vdFxyXG4gKiBAc2luY2UgMS40LjNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVXaGl0ZVNwYWNlKHJvb3QpIHtcclxuXHR2YXJcdG5vZGVWYWx1ZSwgbm9kZVR5cGUsIG5leHQsIHByZXZpb3VzLCBwcmV2aW91c1NpYmxpbmcsXHJcblx0XHRuZXh0Tm9kZSwgdHJpbVN0YXJ0LFxyXG5cdFx0Y3NzV2hpdGVTcGFjZSA9IGNzcyhyb290LCAnd2hpdGVTcGFjZScpLFxyXG5cdFx0Ly8gUHJlc2VydmUgbmV3bGluZXMgaWYgaXMgcHJlLWxpbmVcclxuXHRcdHByZXNlcnZlTmV3TGluZXMgPSAvbGluZSQvaS50ZXN0KGNzc1doaXRlU3BhY2UpLFxyXG5cdFx0bm9kZSA9IHJvb3QuZmlyc3RDaGlsZDtcclxuXHJcblx0Ly8gU2tpcCBwcmUgJiBwcmUtd3JhcCB3aXRoIGFueSB2ZW5kb3IgcHJlZml4XHJcblx0aWYgKC9wcmUoLXdyYXApPyQvaS50ZXN0KGNzc1doaXRlU3BhY2UpKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0bmV4dE5vZGUgID0gbm9kZS5uZXh0U2libGluZztcclxuXHRcdG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xyXG5cdFx0bm9kZVR5cGUgID0gbm9kZS5ub2RlVHlwZTtcclxuXHJcblx0XHRpZiAobm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSAmJiBub2RlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0cmVtb3ZlV2hpdGVTcGFjZShub2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobm9kZVR5cGUgPT09IFRFWFRfTk9ERSkge1xyXG5cdFx0XHRuZXh0ICAgICAgPSBnZXRTaWJsaW5nKG5vZGUpO1xyXG5cdFx0XHRwcmV2aW91cyAgPSBnZXRTaWJsaW5nKG5vZGUsIHRydWUpO1xyXG5cdFx0XHR0cmltU3RhcnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdHdoaWxlIChoYXNDbGFzcyhwcmV2aW91cywgJ2VtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdHByZXZpb3VzID0gZ2V0U2libGluZyhwcmV2aW91cywgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIElmIHByZXZpb3VzIHNpYmxpbmcgaXNuJ3QgaW5saW5lIG9yIGlzIGEgdGV4dG5vZGUgdGhhdFxyXG5cdFx0XHQvLyBlbmRzIGluIHdoaXRlc3BhY2UsIHRpbWUgdGhlIHN0YXJ0IHdoaXRlc3BhY2VcclxuXHRcdFx0aWYgKGlzSW5saW5lKG5vZGUpICYmIHByZXZpb3VzKSB7XHJcblx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXM7XHJcblxyXG5cdFx0XHRcdHdoaWxlIChwcmV2aW91c1NpYmxpbmcubGFzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91c1NpYmxpbmcubGFzdENoaWxkO1xyXG5cclxuXHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtZGVwdGhcclxuXHRcdFx0XHRcdHdoaWxlIChoYXNDbGFzcyhwcmV2aW91c1NpYmxpbmcsICdlbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gZ2V0U2libGluZyhwcmV2aW91c1NpYmxpbmcsIHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dHJpbVN0YXJ0ID0gcHJldmlvdXNTaWJsaW5nLm5vZGVUeXBlID09PSBURVhUX05PREUgP1xyXG5cdFx0XHRcdFx0L1tcXHRcXG5cXHIgXSQvLnRlc3QocHJldmlvdXNTaWJsaW5nLm5vZGVWYWx1ZSkgOlxyXG5cdFx0XHRcdFx0IWlzSW5saW5lKHByZXZpb3VzU2libGluZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENsZWFyIHplcm8gd2lkdGggc3BhY2VzXHJcblx0XHRcdG5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKC9cXHUyMDBCL2csICcnKTtcclxuXHJcblx0XHRcdC8vIFN0cmlwIGxlYWRpbmcgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoIXByZXZpb3VzIHx8ICFpc0lubGluZShwcmV2aW91cykgfHwgdHJpbVN0YXJ0KSB7XHJcblx0XHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL15bXFx0IF0rLyA6IC9eW1xcdFxcblxcciBdKy8sXHJcblx0XHRcdFx0XHQnJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFN0cmlwIHRyYWlsaW5nIHdoaXRlc3BhY2VcclxuXHRcdFx0aWYgKCFuZXh0IHx8ICFpc0lubGluZShuZXh0KSkge1xyXG5cdFx0XHRcdG5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9bXFx0IF0rJC8gOiAvW1xcdFxcblxcciBdKyQvLFxyXG5cdFx0XHRcdFx0JydcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZW1vdmUgZW1wdHkgdGV4dCBub2Rlc1xyXG5cdFx0XHRpZiAoIW5vZGVWYWx1ZS5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZW1vdmUobm9kZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvW1xcdCBdKy9nIDogL1tcXHRcXG5cXHIgXSsvZyxcclxuXHRcdFx0XHRcdCcgJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gbmV4dE5vZGU7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogRXh0cmFjdHMgYWxsIHRoZSBub2RlcyBiZXR3ZWVuIHRoZSBzdGFydCBhbmQgZW5kIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHN0YXJ0Tm9kZVx0VGhlIG5vZGUgdG8gc3RhcnQgZXh0cmFjdGluZyBhdFxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbmROb2RlXHRcdFRoZSBub2RlIHRvIHN0b3AgZXh0cmFjdGluZyBhdFxyXG4gKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RDb250ZW50cyhzdGFydE5vZGUsIGVuZE5vZGUpIHtcclxuXHR2YXIgcmFuZ2UgPSBzdGFydE5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRyYW5nZS5zZXRTdGFydEJlZm9yZShzdGFydE5vZGUpO1xyXG5cdHJhbmdlLnNldEVuZEFmdGVyKGVuZE5vZGUpO1xyXG5cclxuXHRyZXR1cm4gcmFuZ2UuZXh0cmFjdENvbnRlbnRzKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBvZmZzZXQgcG9zaXRpb24gb2YgYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGxlZnQgYW5kIHRvcCBwcm9wZXJ0aWVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2Zmc2V0KG5vZGUpIHtcclxuXHR2YXJcdGxlZnQgPSAwLFxyXG5cdFx0dG9wID0gMDtcclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdGxlZnQgKz0gbm9kZS5vZmZzZXRMZWZ0O1xyXG5cdFx0dG9wICArPSBub2RlLm9mZnNldFRvcDtcclxuXHRcdG5vZGUgID0gbm9kZS5vZmZzZXRQYXJlbnQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bGVmdDogbGVmdCxcclxuXHRcdHRvcDogdG9wXHJcblx0fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGEgQ1NTIHByb3BlcnR5IGZyb20gdGhlIGVsZW1lbnRzIHN0eWxlIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlKGVsbSwgcHJvcGVydHkpIHtcclxuXHR2YXJcdHN0eWxlVmFsdWUsXHJcblx0XHRlbG1TdHlsZSA9IGVsbS5zdHlsZTtcclxuXHJcblx0aWYgKCFjc3NQcm9wZXJ0eU5hbWVDYWNoZVtwcm9wZXJ0eV0pIHtcclxuXHRcdGNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSA9IGNhbWVsQ2FzZShwcm9wZXJ0eSk7XHJcblx0fVxyXG5cclxuXHRwcm9wZXJ0eSAgID0gY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldO1xyXG5cdHN0eWxlVmFsdWUgPSBlbG1TdHlsZVtwcm9wZXJ0eV07XHJcblxyXG5cdC8vIEFkZCBhbiBleGNlcHRpb24gZm9yIHRleHQtYWxpZ25cclxuXHRpZiAoJ3RleHRBbGlnbicgPT09IHByb3BlcnR5KSB7XHJcblx0XHRzdHlsZVZhbHVlID0gc3R5bGVWYWx1ZSB8fCBjc3MoZWxtLCBwcm9wZXJ0eSk7XHJcblxyXG5cdFx0aWYgKGNzcyhlbG0ucGFyZW50Tm9kZSwgcHJvcGVydHkpID09PSBzdHlsZVZhbHVlIHx8XHJcblx0XHRcdGNzcyhlbG0sICdkaXNwbGF5JykgIT09ICdibG9jaycgfHwgaXMoZWxtLCAnaHIsdGgnKSkge1xyXG5cdFx0XHRyZXR1cm4gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3R5bGVWYWx1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIGFuIGVsZW1lbnQgaGFzIGEgc3R5bGUuXHJcbiAqXHJcbiAqIElmIHZhbHVlcyBhcmUgc3BlY2lmaWVkIGl0IHdpbGwgY2hlY2sgdGhhdCB0aGUgc3R5bGVzIHZhbHVlXHJcbiAqIG1hdGNoZXMgb25lIG9mIHRoZSB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByb3BlcnR5XHJcbiAqIEBwYXJhbSAge3N0cmluZ3xhcnJheX0gW3ZhbHVlc11cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsZShlbG0sIHByb3BlcnR5LCB2YWx1ZXMpIHtcclxuXHR2YXIgc3R5bGVWYWx1ZSA9IGdldFN0eWxlKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRpZiAoIXN0eWxlVmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAhdmFsdWVzIHx8IHN0eWxlVmFsdWUgPT09IHZhbHVlcyB8fFxyXG5cdFx0KEFycmF5LmlzQXJyYXkodmFsdWVzKSAmJiB2YWx1ZXMuaW5kZXhPZihzdHlsZVZhbHVlKSA+IC0xKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGlubGluZSBzdHlsZXMgYW5kIGFsbCB0aGVcclxuICogaW5saW5lIHN0eWxlcyBoYXZlIG1hdGNoaW5nIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIHN0eWxlc01hdGNoKG5vZGVBLCBub2RlQikge1xyXG5cdHZhciBpID0gbm9kZUEuc3R5bGUubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5zdHlsZS5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdHZhciBwcm9wID0gbm9kZUEuc3R5bGVbaV07XHJcblx0XHRpZiAobm9kZUEuc3R5bGVbcHJvcF0gIT09IG5vZGVCLnN0eWxlW3Byb3BdKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGJvdGggbm9kZXMgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgYXR0cmlidXRlcyBhbmQgYWxsIHRoZVxyXG4gKiBhdHRyaWJ1dGUgdmFsdWVzIG1hdGNoXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVBXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVCXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gYXR0cmlidXRlc01hdGNoKG5vZGVBLCBub2RlQikge1xyXG5cdHZhciBpID0gbm9kZUEuYXR0cmlidXRlcy5sZW5ndGg7XHJcblx0aWYgKGkgIT09IG5vZGVCLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGVBLmF0dHJpYnV0ZXNbaV07XHJcblx0XHR2YXIgbm90TWF0Y2hlcyA9IHByb3AubmFtZSA9PT0gJ3N0eWxlJyA/XHJcblx0XHRcdCFzdHlsZXNNYXRjaChub2RlQSwgbm9kZUIpIDpcclxuXHRcdFx0cHJvcC52YWx1ZSAhPT0gYXR0cihub2RlQiwgcHJvcC5uYW1lKTtcclxuXHJcblx0XHRpZiAobm90TWF0Y2hlcykge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZWxlbWVudCBwbGFjaW5nIGl0cyBjaGlsZHJlbiBpbiBpdHMgcGxhY2VcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZnVuY3Rpb24gcmVtb3ZlS2VlcENoaWxkcmVuKG5vZGUpIHtcclxuXHR3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XHJcblx0XHRpbnNlcnRCZWZvcmUobm9kZS5maXJzdENoaWxkLCBub2RlKTtcclxuXHR9XHJcblxyXG5cdHJlbW92ZShub2RlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1lcmdlcyBpbmxpbmUgc3R5bGVzIGFuZCB0YWdzIHdpdGggcGFyZW50cyB3aGVyZSBwb3NzaWJsZVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHNpbmNlIDMuMS4wXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2Uobm9kZSkge1xyXG5cdGlmIChub2RlLm5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XHJcblx0dmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWU7XHJcblx0dmFyIG1lcmdlVGFncyA9IC9CfFNUUk9OR3xFTXxTUEFOfEZPTlQvO1xyXG5cclxuXHQvLyBNZXJnZSBjaGlsZHJlbiAoaW4gcmV2ZXJzZSBhcyBjaGlsZHJlbiBjYW4gYmUgcmVtb3ZlZClcclxuXHR2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0bWVyZ2Uobm9kZS5jaGlsZE5vZGVzW2ldKTtcclxuXHR9XHJcblxyXG5cdC8vIFNob3VsZCBvbmx5IG1lcmdlIGlubGluZSB0YWdzIGFuZCBzaG91bGQgbm90IG1lcmdlIDxicj4gdGFnc1xyXG5cdGlmICghaXNJbmxpbmUobm9kZSkgfHwgdGFnTmFtZSA9PT0gJ0JSJykge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gUmVtb3ZlIGFueSBpbmxpbmUgc3R5bGVzIHRoYXQgbWF0Y2ggdGhlIHBhcmVudCBzdHlsZVxyXG5cdGkgPSBub2RlLnN0eWxlLmxlbmd0aDtcclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGUuc3R5bGVbaV07XHJcblx0XHRpZiAoY3NzKHBhcmVudCwgcHJvcCkgPT09IGNzcyhub2RlLCBwcm9wKSkge1xyXG5cdFx0XHRub2RlLnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3ApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gQ2FuIG9ubHkgcmVtb3ZlIC8gbWVyZ2UgdGFncyBpZiBubyBpbmxpbmUgc3R5bGluZyBsZWZ0LlxyXG5cdC8vIElmIHRoZXJlIGlzIGFueSBpbmxpbmUgc3R5bGUgbGVmdCB0aGVuIGl0IG1lYW5zIGl0IGF0IGxlYXN0IHBhcnRpYWxseVxyXG5cdC8vIGRvZXNuJ3QgbWF0Y2ggdGhlIHBhcmVudCBzdHlsZSBzbyBtdXN0IHN0YXlcclxuXHRpZiAoIW5vZGUuc3R5bGUubGVuZ3RoKSB7XHJcblx0XHRyZW1vdmVBdHRyKG5vZGUsICdzdHlsZScpO1xyXG5cclxuXHRcdC8vIFJlbW92ZSBmb250IGF0dHJpYnV0ZXMgaWYgbWF0Y2ggcGFyZW50XHJcblx0XHRpZiAodGFnTmFtZSA9PT0gJ0ZPTlQnKSB7XHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2ZvbnRGYW1pbHknKS50b0xvd2VyQ2FzZSgpID09PVxyXG5cdFx0XHRcdGNzcyhwYXJlbnQsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ2ZhY2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnY29sb3InKSA9PT0gY3NzKHBhcmVudCwgJ2NvbG9yJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdjb2xvcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250U2l6ZScpID09PSBjc3MocGFyZW50LCAnZm9udFNpemUnKSkge1xyXG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ3NpemUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNwYW5zIGFuZCBmb250IHRhZ3Mgd2l0aCBubyBhdHRyaWJ1dGVzIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZFxyXG5cdFx0aWYgKCFub2RlLmF0dHJpYnV0ZXMubGVuZ3RoICYmIC9TUEFOfEZPTlQvLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlS2VlcENoaWxkcmVuKG5vZGUpO1xyXG5cdFx0fSBlbHNlIGlmIChtZXJnZVRhZ3MudGVzdCh0YWdOYW1lKSkge1xyXG5cdFx0XHR2YXIgaXNCb2xkID0gL0J8U1RST05HLy50ZXN0KHRhZ05hbWUpO1xyXG5cdFx0XHR2YXIgaXNJdGFsaWMgPSB0YWdOYW1lID09PSAnRU0nO1xyXG5cclxuXHRcdFx0d2hpbGUgKHBhcmVudCAmJiBpc0lubGluZShwYXJlbnQpICYmXHJcblx0XHRcdFx0KCFpc0JvbGQgfHwgL2JvbGR8NzAwL2kudGVzdChjc3MocGFyZW50LCAnZm9udFdlaWdodCcpKSkgJiZcclxuXHRcdFx0XHQoIWlzSXRhbGljIHx8IGNzcyhwYXJlbnQsICdmb250U3R5bGUnKSA9PT0gJ2l0YWxpYycpKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBpZiBwYXJlbnQgbWF0Y2hcclxuXHRcdFx0XHRpZiAoKHBhcmVudC50YWdOYW1lID09PSB0YWdOYW1lIHx8XHJcblx0XHRcdFx0XHQoaXNCb2xkICYmIC9CfFNUUk9ORy8udGVzdChwYXJlbnQudGFnTmFtZSkpKSAmJlxyXG5cdFx0XHRcdFx0YXR0cmlidXRlc01hdGNoKHBhcmVudCwgbm9kZSkpIHtcclxuXHRcdFx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIE1lcmdlIHNpYmxpbmdzIGlmIGF0dHJpYnV0ZXMsIGluY2x1ZGluZyBpbmxpbmUgc3R5bGVzLCBtYXRjaFxyXG5cdHZhciBuZXh0ID0gbm9kZS5uZXh0U2libGluZztcclxuXHRpZiAobmV4dCAmJiBuZXh0LnRhZ05hbWUgPT09IHRhZ05hbWUgJiYgYXR0cmlidXRlc01hdGNoKG5leHQsIG5vZGUpKSB7XHJcblx0XHRhcHBlbmRDaGlsZChub2RlLCBuZXh0KTtcclxuXHRcdHJlbW92ZUtlZXBDaGlsZHJlbihuZXh0KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcblxuLyoqXG4gKiBDaGVja3MgYWxsIGVtb3RpY29ucyBhcmUgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlIGFuZFxuICogcmVwbGFjZXMgYW55IHRoYXQgYXJlbid0IHdpdGggd2l0aCB0aGVpciBlbW90aWNvbiBjb2RlLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcbiAqIEBwYXJhbSB7cmFuZ2VIZWxwZXJ9IHJhbmdlSGVscGVyXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tXaGl0ZXNwYWNlKG5vZGUsIHJhbmdlSGVscGVyKSB7XG5cdHZhciBub25lV3NSZWdleCA9IC9bXlxcc1xceEEwXFx1MjAwMlxcdTIwMDNcXHUyMDA5XSsvO1xuXHR2YXIgZW1vdGljb25zID0gbm9kZSAmJiBkb20uZmluZChub2RlLCAnaW1nW2RhdGEtZW1sZWRpdG9yLWVtb3RpY29uXScpO1xuXG5cdGlmICghbm9kZSB8fCAhZW1vdGljb25zLmxlbmd0aCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZW1vdGljb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGVtb3RpY29uID0gZW1vdGljb25zW2ldO1xuXHRcdHZhciBwYXJlbnQgPSBlbW90aWNvbi5wYXJlbnROb2RlO1xuXHRcdHZhciBwcmV2ID0gZW1vdGljb24ucHJldmlvdXNTaWJsaW5nO1xuXHRcdHZhciBuZXh0ID0gZW1vdGljb24ubmV4dFNpYmxpbmc7XG5cblx0XHRpZiAoKCFwcmV2IHx8ICFub25lV3NSZWdleC50ZXN0KHByZXYubm9kZVZhbHVlLnNsaWNlKC0xKSkpICYmXG5cdFx0XHQoIW5leHQgfHwgIW5vbmVXc1JlZ2V4LnRlc3QoKG5leHQubm9kZVZhbHVlIHx8ICcnKVswXSkpKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR2YXIgcmFuZ2UgPSByYW5nZUhlbHBlci5jbG9uZVNlbGVjdGVkKCk7XG5cdFx0dmFyIHJhbmdlU3RhcnQgPSAtMTtcblx0XHR2YXIgcmFuZ2VTdGFydENvbnRhaW5lciA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuXHRcdHZhciBwcmV2aW91c1RleHQgPSAocHJldiAmJiBwcmV2Lm5vZGVWYWx1ZSkgfHwgJyc7XG5cblx0XHRwcmV2aW91c1RleHQgKz0gZG9tLmRhdGEoZW1vdGljb24sICdlbWxlZGl0b3ItZW1vdGljb24nKTtcblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgYWZ0ZXIgdGhlIHJlbW92ZWQgZW1vdGljb24sIGFkZFxuXHRcdC8vIHRoZSBsZW5ndGggb2YgdGhlIG5ld2x5IGFkZGVkIHRleHQgdG8gaXRcblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gbmV4dCkge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHByZXZpb3VzVGV4dC5sZW5ndGggKyByYW5nZS5zdGFydE9mZnNldDtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIHNldCBiZWZvcmUgdGhlIG5leHQgbm9kZSwgc2V0IGl0IHRvXG5cdFx0Ly8gdGhlIGVuZCBvZiB0aGUgbmV3IHRleHQgbm9kZVxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBub2RlICYmXG5cdFx0XHRub2RlLmNoaWxkTm9kZXNbcmFuZ2Uuc3RhcnRPZmZzZXRdID09PSBuZXh0KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcHJldmlvdXNUZXh0Lmxlbmd0aDtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIHNldCBiZWZvcmUgdGhlIHJlbW92ZWQgZW1vdGljb24sXG5cdFx0Ly8ganVzdCBrZWVwIGl0IGF0IHRoYXQgcG9zaXRpb25cblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gcHJldikge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXHRcdH1cblxuXHRcdGlmICghbmV4dCB8fCBuZXh0Lm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFKSB7XG5cdFx0XHRuZXh0ID0gcGFyZW50Lmluc2VydEJlZm9yZShcblx0XHRcdFx0cGFyZW50Lm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpLCBuZXh0XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdG5leHQuaW5zZXJ0RGF0YSgwLCBwcmV2aW91c1RleHQpO1xuXHRcdGRvbS5yZW1vdmUoZW1vdGljb24pO1xuXHRcdGlmIChwcmV2KSB7XG5cdFx0XHRkb20ucmVtb3ZlKHByZXYpO1xuXHRcdH1cblxuXHRcdC8vIE5lZWQgdG8gdXBkYXRlIHRoZSByYW5nZSBzdGFydGluZyBwb3NpdGlvbiBpZiBpdCdzIGJlZW4gbW9kaWZpZWRcblx0XHRpZiAocmFuZ2VTdGFydCA+IC0xKSB7XG5cdFx0XHRyYW5nZS5zZXRTdGFydChuZXh0LCByYW5nZVN0YXJ0KTtcblx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuXHRcdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFJlcGxhY2VzIGFueSBlbW90aWNvbnMgaW5zaWRlIHRoZSByb290IG5vZGUgd2l0aCBpbWFnZXMuXG4gKlxuICogZW1vdGljb25zIHNob3VsZCBiZSBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleSBpcyB0aGUgZW1vdGljb25cbiAqIGNvZGUgYW5kIHRoZSB2YWx1ZSBpcyB0aGUgSFRNTCB0byByZXBsYWNlIGl0IHdpdGguXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcm9vdFxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBlbW90aWNvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZW1vdGljb25zQ29tcGF0XG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShyb290LCBlbW90aWNvbnMsIGVtb3RpY29uc0NvbXBhdCkge1xuXHR2YXJcdGRvYyAgICAgICAgICAgPSByb290Lm93bmVyRG9jdW1lbnQ7XG5cdHZhciBzcGFjZSAgICAgICAgID0gJyhefFxcXFxzfFxceEEwfFxcdTIwMDJ8XFx1MjAwM3xcXHUyMDA5fCQpJztcblx0dmFyIGVtb3RpY29uQ29kZXMgPSBbXTtcblx0dmFyIGVtb3RpY29uUmVnZXggPSB7fTtcblxuXHQvLyBUT0RPOiBNYWtlIHRoaXMgdGFnIGNvbmZpZ3VyYWJsZS5cblx0aWYgKGRvbS5wYXJlbnQocm9vdCwgJ2NvZGUnKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHV0aWxzLmVhY2goZW1vdGljb25zLCBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZW1vdGljb25SZWdleFtrZXldID0gbmV3IFJlZ0V4cChzcGFjZSArIGVzY2FwZS5yZWdleChrZXkpICsgc3BhY2UpO1xuXHRcdGVtb3RpY29uQ29kZXMucHVzaChrZXkpO1xuXHR9KTtcblxuXHQvLyBTb3J0IGtleXMgbG9uZ2VzdCB0byBzaG9ydGVzdCBzbyB0aGF0IGxvbmdlciBrZXlzXG5cdC8vIHRha2UgcHJlY2VkZW5jZSAoYXZvaWRzIGJ1Z3Mgd2l0aCBzaG9ydGVyIGtleXMgcGFydGlhbGx5XG5cdC8vIG1hdGNoaW5nIGxvbmdlciBvbmVzKVxuXHRlbW90aWNvbkNvZGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRyZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcblx0fSk7XG5cblx0KGZ1bmN0aW9uIGNvbnZlcnQobm9kZSkge1xuXHRcdG5vZGUgPSBub2RlLmZpcnN0Q2hpbGQ7XG5cblx0XHR3aGlsZSAobm9kZSkge1xuXHRcdFx0Ly8gVE9ETzogTWFrZSB0aGlzIHRhZyBjb25maWd1cmFibGUuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLkVMRU1FTlRfTk9ERSAmJiAhZG9tLmlzKG5vZGUsICdjb2RlJykpIHtcblx0XHRcdFx0Y29udmVydChub2RlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbW90aWNvbkNvZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dmFyIHRleHQgID0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0dmFyIGtleSAgID0gZW1vdGljb25Db2Rlc1tpXTtcblx0XHRcdFx0XHR2YXIgaW5kZXggPSBlbW90aWNvbnNDb21wYXQgP1xuXHRcdFx0XHRcdFx0dGV4dC5zZWFyY2goZW1vdGljb25SZWdleFtrZXldKSA6XG5cdFx0XHRcdFx0XHR0ZXh0LmluZGV4T2Yoa2V5KTtcblxuXHRcdFx0XHRcdGlmIChpbmRleCA+IC0xKSB7XG5cdFx0XHRcdFx0XHQvLyBXaGVuIGVtb3RpY29uc0NvbXBhdCBpcyBlbmFibGVkIHRoaXMgd2lsbCBiZSB0aGVcblx0XHRcdFx0XHRcdC8vIHBvc2l0aW9uIGFmdGVyIGFueSB3aGl0ZSBzcGFjZVxuXHRcdFx0XHRcdFx0dmFyIHN0YXJ0SW5kZXggPSB0ZXh0LmluZGV4T2Yoa2V5LCBpbmRleCk7XG5cdFx0XHRcdFx0XHR2YXIgZnJhZ21lbnQgICA9IGRvbS5wYXJzZUhUTUwoZW1vdGljb25zW2tleV0sIGRvYyk7XG5cdFx0XHRcdFx0XHR2YXIgYWZ0ZXIgICAgICA9IHRleHQuc3Vic3RyKHN0YXJ0SW5kZXggKyBrZXkubGVuZ3RoKTtcblxuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKGFmdGVyKSk7XG5cblx0XHRcdFx0XHRcdG5vZGUubm9kZVZhbHVlID0gdGV4dC5zdWJzdHIoMCwgc3RhcnRJbmRleCk7XG5cdFx0XHRcdFx0XHRub2RlLnBhcmVudE5vZGVcblx0XHRcdFx0XHRcdFx0Lmluc2VydEJlZm9yZShmcmFnbWVudCwgbm9kZS5uZXh0U2libGluZyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG5vZGUgPSBub2RlLm5leHRTaWJsaW5nO1xuXHRcdH1cblx0fShyb290KSk7XG59XG4iLCIvLyBNdXN0IHN0YXJ0IHdpdGggYSB2YWxpZCBzY2hlbWVcclxuLy8gXHRcdF5cclxuLy8gU2NoZW1lcyB0aGF0IGFyZSBjb25zaWRlcmVkIHNhZmVcclxuLy8gXHRcdChodHRwcz98cz9mdHB8bWFpbHRvfHNwb3RpZnl8c2t5cGV8c3NofHRlYW1zcGVha3x0ZWwpOnxcclxuLy8gUmVsYXRpdmUgc2NoZW1lcyAoLy86KSBhcmUgY29uc2lkZXJlZCBzYWZlXHJcbi8vIFx0XHQoXFxcXC9cXFxcLyl8XHJcbi8vIEltYWdlIGRhdGEgVVJJJ3MgYXJlIGNvbnNpZGVyZWQgc2FmZVxyXG4vLyBcdFx0ZGF0YTppbWFnZVxcXFwvKHBuZ3xibXB8Z2lmfHA/anBlP2cpO1xyXG52YXIgVkFMSURfU0NIRU1FX1JFR0VYID1cclxuXHQvXihodHRwcz98cz9mdHB8bWFpbHRvfHNwb3RpZnl8c2t5cGV8c3NofHRlYW1zcGVha3x0ZWwpOnwoXFwvXFwvKXxkYXRhOmltYWdlXFwvKHBuZ3xibXB8Z2lmfHA/anBlP2cpOy9pO1xyXG5cclxuLyoqXHJcbiAqIEVzY2FwZXMgYSBzdHJpbmcgc28gaXQncyBzYWZlIHRvIHVzZSBpbiByZWdleFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZWdleChzdHIpIHtcclxuXHRyZXR1cm4gc3RyLnJlcGxhY2UoLyhbLS4qKz9ePSE6JHt9KCl8W1xcXS9cXFxcXSkvZywgJ1xcXFwkMScpO1xyXG59XHJcblxyXG4vKipcclxuICogRXNjYXBlcyBhbGwgSFRNTCBlbnRpdGllcyBpbiBhIHN0cmluZ1xyXG4gKlxyXG4gKiBJZiBub1F1b3RlcyBpcyBzZXQgdG8gZmFsc2UsIGFsbCBzaW5nbGUgYW5kIGRvdWJsZVxyXG4gKiBxdW90ZXMgd2lsbCBhbHNvIGJlIGVzY2FwZWRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtub1F1b3Rlcz10cnVlXVxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqIEBzaW5jZSAxLjQuMVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVudGl0aWVzKHN0ciwgbm9RdW90ZXMpIHtcclxuXHRpZiAoIXN0cikge1xyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9XHJcblxyXG5cdHZhciByZXBsYWNlbWVudHMgPSB7XHJcblx0XHQnJic6ICcmYW1wOycsXHJcblx0XHQnPCc6ICcmbHQ7JyxcclxuXHRcdCc+JzogJyZndDsnLFxyXG5cdFx0JyAgJzogJyZuYnNwOyAnLFxyXG5cdFx0J1xcclxcbic6ICc8YnIgLz4nLFxyXG5cdFx0J1xccic6ICc8YnIgLz4nLFxyXG5cdFx0J1xcbic6ICc8YnIgLz4nXHJcblx0fTtcclxuXHJcblx0aWYgKG5vUXVvdGVzICE9PSBmYWxzZSkge1xyXG5cdFx0cmVwbGFjZW1lbnRzWydcIiddICA9ICcmIzM0Oyc7XHJcblx0XHRyZXBsYWNlbWVudHNbJ1xcJyddID0gJyYjMzk7JztcclxuXHRcdHJlcGxhY2VtZW50c1snYCddICA9ICcmIzk2Oyc7XHJcblx0fVxyXG5cclxuXHRzdHIgPSBzdHIucmVwbGFjZSgvIHsyfXxcXHJcXG58WyY8PlxcclxcbidcImBdL2csIGZ1bmN0aW9uIChtYXRjaCkge1xyXG5cdFx0cmV0dXJuIHJlcGxhY2VtZW50c1ttYXRjaF0gfHwgbWF0Y2g7XHJcblx0fSk7XHJcblxyXG5cdHJldHVybiBzdHI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFc2NhcGUgVVJJIHNjaGVtZS5cclxuICpcclxuICogQXBwZW5kcyB0aGUgY3VycmVudCBVUkwgdG8gYSB1cmwgaWYgaXQgaGFzIGEgc2NoZW1lIHRoYXQgaXMgbm90OlxyXG4gKlxyXG4gKiBodHRwXHJcbiAqIGh0dHBzXHJcbiAqIHNmdHBcclxuICogZnRwXHJcbiAqIG1haWx0b1xyXG4gKiBzcG90aWZ5XHJcbiAqIHNreXBlXHJcbiAqIHNzaFxyXG4gKiB0ZWFtc3BlYWtcclxuICogdGVsXHJcbiAqIC8vXHJcbiAqIGRhdGE6aW1hZ2UvKHBuZ3xqcGVnfGpwZ3xwanBlZ3xibXB8Z2lmKTtcclxuICpcclxuICogKipJTVBPUlRBTlQqKjogVGhpcyBkb2VzIG5vdCBlc2NhcGUgYW55IEhUTUwgaW4gYSB1cmwsIGZvclxyXG4gKiB0aGF0IHVzZSB0aGUgZXNjYXBlLmVudGl0aWVzKCkgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybFxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqIEBzaW5jZSAxLjQuNVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVyaVNjaGVtZSh1cmwpIHtcclxuXHR2YXJcdHBhdGgsXHJcblx0XHQvLyBJZiB0aGVyZSBpcyBhIDogYmVmb3JlIGEgLyB0aGVuIGl0IGhhcyBhIHNjaGVtZVxyXG5cdFx0aGFzU2NoZW1lID0gL15bXi9dKjovaSxcclxuXHRcdGxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uO1xyXG5cclxuXHQvLyBIYXMgbm8gc2NoZW1lIG9yIGEgdmFsaWQgc2NoZW1lXHJcblx0aWYgKCghdXJsIHx8ICFoYXNTY2hlbWUudGVzdCh1cmwpKSB8fCBWQUxJRF9TQ0hFTUVfUkVHRVgudGVzdCh1cmwpKSB7XHJcblx0XHRyZXR1cm4gdXJsO1xyXG5cdH1cclxuXHJcblx0cGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XHJcblx0cGF0aC5wb3AoKTtcclxuXHJcblx0cmV0dXJuIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArXHJcblx0XHRsb2NhdGlvbi5ob3N0ICtcclxuXHRcdHBhdGguam9pbignLycpICsgJy8nICtcclxuXHRcdHVybDtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBIVE1MIHRlbXBsYXRlcyB1c2VkIGJ5IHRoZSBlZGl0b3IgYW5kIGRlZmF1bHQgY29tbWFuZHNcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZhciBfdGVtcGxhdGVzID0ge1xyXG5cdGh0bWw6XHJcblx0XHQnPCFET0NUWVBFIGh0bWw+JyArXHJcblx0XHQnPGh0bWx7YXR0cnN9PicgK1xyXG5cdFx0XHQnPGhlYWQ+JyArXHJcblx0XHRcdFx0JzxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiAnICtcclxuXHRcdFx0XHRcdCdjb250ZW50PVwidGV4dC9odG1sO2NoYXJzZXQ9e2NoYXJzZXR9XCIgLz4nICtcclxuXHRcdFx0XHQnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJ7c3R5bGV9XCIgLz4nICtcclxuXHRcdFx0JzwvaGVhZD4nICtcclxuXHRcdFx0Jzxib2R5IGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiB7c3BlbGxjaGVja30+PHA+PC9wPjwvYm9keT4nICtcclxuXHRcdCc8L2h0bWw+JyxcclxuXHJcblx0dG9vbGJhckJ1dHRvbjogJzxhIGNsYXNzPVwiZW1sZWRpdG9yLWJ1dHRvbiBlbWxlZGl0b3ItYnV0dG9uLXtuYW1lfVwiICcgK1xyXG5cdFx0J2RhdGEtZW1sZWRpdG9yLWNvbW1hbmQ9XCJ7bmFtZX1cIiB1bnNlbGVjdGFibGU9XCJvblwiPicgK1xyXG5cdFx0JzxkaXYgdW5zZWxlY3RhYmxlPVwib25cIj57ZGlzcE5hbWV9PC9kaXY+PC9hPicsXHJcblxyXG5cdGVtb3RpY29uOiAnPGltZyBzcmM9XCJ7dXJsfVwiIGRhdGEtZW1sZWRpdG9yLWVtb3RpY29uPVwie2tleX1cIiAnICtcclxuXHRcdCdhbHQ9XCJ7a2V5fVwiIHRpdGxlPVwie3Rvb2x0aXB9XCIgLz4nLFxyXG5cclxuXHRmb250T3B0OiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItZm9udC1vcHRpb25cIiBocmVmPVwiI1wiICcgK1xyXG5cdFx0J2RhdGEtZm9udD1cIntmb250fVwiPjxmb250IGZhY2U9XCJ7Zm9udH1cIj57Zm9udH08L2ZvbnQ+PC9hPicsXHJcblxyXG5cdHNpemVPcHQ6ICc8YSBjbGFzcz1cImVtbGVkaXRvci1mb250c2l6ZS1vcHRpb25cIiBkYXRhLXNpemU9XCJ7c2l6ZX1cIiAnICtcclxuXHRcdCdocmVmPVwiI1wiPjxmb250IHNpemU9XCJ7c2l6ZX1cIj57c2l6ZX08L2ZvbnQ+PC9hPicsXHJcblxyXG5cdHBhc3RldGV4dDpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJ0eHRcIj57bGFiZWx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8dGV4dGFyZWEgY29scz1cIjIwXCIgcm93cz1cIjdcIiBpZD1cInR4dFwiPjwvdGV4dGFyZWE+PC9kaXY+JyArXHJcblx0XHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcclxuXHRcdCc8L2Rpdj4nLFxyXG5cclxuXHR0YWJsZTpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJyb3dzXCI+e3Jvd3N9PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiAnICtcclxuXHRcdFx0J2lkPVwicm93c1wiIHZhbHVlPVwiMlwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiY29sc1wiPntjb2xzfTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgJyArXHJcblx0XHRcdCdpZD1cImNvbHNcIiB2YWx1ZT1cIjJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIicgK1xyXG5cdFx0XHQnIC8+PC9kaXY+JyxcclxuXHJcblx0aW1hZ2U6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiaW1hZ2VcIj57dXJsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJpbWFnZVwiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cIndpZHRoXCI+e3dpZHRofTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ3aWR0aFwiIHNpemU9XCIyXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJoZWlnaHRcIj57aGVpZ2h0fTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJoZWlnaHRcIiBzaXplPVwiMlwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXHJcblx0XHRcdCc8L2Rpdj4nLFxyXG5cclxuXHRlbWFpbDpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJlbWFpbFwiPntsYWJlbH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZW1haWxcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImRlc1wiPntkZXNjfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xyXG5cdFx0XHQnPC9kaXY+JyxcclxuXHJcblx0bGluazpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJsaW5rXCI+e3VybH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlua1wiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImRlc1wiPntkZXNjfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc31cIiAvPjwvZGl2PicsXHJcblxyXG5cdHlvdXR1YmVNZW51OlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImxpbmtcIj57bGFiZWx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpbmtcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcclxuXHRcdFx0JzwvZGl2PicsXHJcblxyXG5cdHlvdXR1YmU6XHJcblx0XHQnPGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjMxNVwiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93ZnVsbHNjcmVlbiAnICtcclxuXHRcdCdzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC97aWR9P3dtb2RlPW9wYXF1ZSZzdGFydD17dGltZX1cIiAnICtcclxuXHRcdCdkYXRhLXlvdXR1YmUtaWQ9XCJ7aWR9XCI+PC9pZnJhbWU+J1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2VzIGFueSBwYXJhbXMgaW4gYSB0ZW1wbGF0ZSB3aXRoIHRoZSBwYXNzZWQgcGFyYW1zLlxyXG4gKlxyXG4gKiBJZiBjcmVhdGVIdG1sIGlzIHBhc3NlZCBpdCB3aWxsIHJldHVybiBhIERvY3VtZW50RnJhZ21lbnRcclxuICogY29udGFpbmluZyB0aGUgcGFyc2VkIHRlbXBsYXRlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3BhcmFtc11cclxuICogQHBhcmFtIHtib29sZWFufSBbY3JlYXRlSHRtbF1cclxuICogQHJldHVybnMge2FueX1cclxuICogQHByaXZhdGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRlbXBsYXRlcyAobmFtZSwgcGFyYW1zLCBjcmVhdGVIdG1sKSB7XHJcblx0dmFyIHRlbXBsYXRlID0gX3RlbXBsYXRlc1tuYW1lXTtcclxuXHJcblx0T2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHR0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoXHJcblx0XHRcdG5ldyBSZWdFeHAoZXNjYXBlLnJlZ2V4KCd7JyArIG5hbWUgKyAnfScpLCAnZycpLCBwYXJhbXNbbmFtZV1cclxuXHRcdCk7XHJcblx0fSk7XHJcblxyXG5cdGlmIChjcmVhdGVIdG1sKSB7XHJcblx0XHR0ZW1wbGF0ZSA9IGRvbS5wYXJzZUhUTUwodGVtcGxhdGUpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRlbXBsYXRlO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHRoZVxyXG4gKiB0aGUgcGFzc2VkIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7Kn0gYXJnXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNUeXBlb2YodHlwZSwgYXJnKSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhcmcgPT09IHR5cGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzU3RyaW5nID0gaXNUeXBlb2YuYmluZChudWxsLCAnc3RyaW5nJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc1VuZGVmaW5lZCA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ3VuZGVmaW5lZCcpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNGdW5jdGlvbiA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ2Z1bmN0aW9uJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc051bWJlciA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ251bWJlcicpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gb2JqZWN0IGhhcyBubyBrZXlzXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdH0gb2JqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlPYmplY3Qob2JqKSB7XHJcblx0cmV0dXJuICFPYmplY3Qua2V5cyhvYmopLmxlbmd0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dGVuZHMgdGhlIGZpcnN0IG9iamVjdCB3aXRoIGFueSBleHRyYSBvYmplY3RzIHBhc3NlZFxyXG4gKlxyXG4gKiBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYm9vbGVhbiBhbmQgc2V0IHRvIHRydWVcclxuICogaXQgd2lsbCBleHRlbmQgY2hpbGQgYXJyYXlzIGFuZCBvYmplY3RzIHJlY3Vyc2l2ZWx5LlxyXG4gKlxyXG4gKiBAcGFyYW0geyFPYmplY3R8Ym9vbGVhbn0gdGFyZ2V0QXJnXHJcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXRBcmcsIHNvdXJjZUFyZykge1xyXG5cdHZhciBpc1RhcmdldEJvb2xlYW4gPSB0YXJnZXRBcmcgPT09ICEhdGFyZ2V0QXJnO1xyXG5cdHZhciBpICAgICAgPSBpc1RhcmdldEJvb2xlYW4gPyAyIDogMTtcclxuXHR2YXIgdGFyZ2V0ID0gaXNUYXJnZXRCb29sZWFuID8gc291cmNlQXJnIDogdGFyZ2V0QXJnO1xyXG5cdHZhciBpc0RlZXAgPSBpc1RhcmdldEJvb2xlYW4gPyB0YXJnZXRBcmcgOiBmYWxzZTtcclxuXHJcblx0ZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXHJcblx0XHRcdE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSkgPT09IE9iamVjdC5wcm90b3R5cGU7XHJcblx0fVxyXG5cclxuXHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuXHJcblx0XHQvLyBDb3B5IGFsbCBwcm9wZXJ0aWVzIGZvciBqUXVlcnkgY29tcGF0aWJpbGl0eVxyXG5cdFx0LyogZXNsaW50IGd1YXJkLWZvci1pbjogb2ZmICovXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XHJcblx0XHRcdHZhciB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldO1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcclxuXHJcblx0XHRcdC8vIFNraXAgdW5kZWZpbmVkIHZhbHVlcyB0byBtYXRjaCBqUXVlcnlcclxuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTa2lwIHNwZWNpYWwga2V5cyB0byBwcmV2ZW50IHByb3RvdHlwZSBwb2xsdXRpb25cclxuXHRcdFx0aWYgKGtleSA9PT0gJ19fcHJvdG9fXycgfHwga2V5ID09PSAnY29uc3RydWN0b3InKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBpc1ZhbHVlT2JqZWN0ID0gaXNPYmplY3QodmFsdWUpO1xyXG5cdFx0XHR2YXIgaXNWYWx1ZUFycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcblxyXG5cdFx0XHRpZiAoaXNEZWVwICYmIChpc1ZhbHVlT2JqZWN0IHx8IGlzVmFsdWVBcnJheSkpIHtcclxuXHRcdFx0XHQvLyBDYW4gb25seSBtZXJnZSBpZiB0YXJnZXQgdHlwZSBtYXRjaGVzIG90aGVyd2lzZSBjcmVhdGVcclxuXHRcdFx0XHQvLyBuZXcgdGFyZ2V0IHRvIG1lcmdlIGludG9cclxuXHRcdFx0XHR2YXIgaXNTYW1lVHlwZSA9IGlzT2JqZWN0KHRhcmdldFZhbHVlKSA9PT0gaXNWYWx1ZU9iamVjdCAmJlxyXG5cdFx0XHRcdFx0QXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkgPT09IGlzVmFsdWVBcnJheTtcclxuXHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBleHRlbmQoXHJcblx0XHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdFx0aXNTYW1lVHlwZSA/IHRhcmdldFZhbHVlIDogKGlzVmFsdWVBcnJheSA/IFtdIDoge30pLFxyXG5cdFx0XHRcdFx0dmFsdWVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgcGFzc2VkIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7IUFycmF5fSBhcnJcclxuICogQHBhcmFtIHsqfSBpdGVtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyLCBpdGVtKSB7XHJcblx0dmFyIGkgPSBhcnIuaW5kZXhPZihpdGVtKTtcclxuXHJcblx0aWYgKGkgPiAtMSkge1xyXG5cdFx0YXJyLnNwbGljZShpLCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlcyBvdmVyIGFuIGFycmF5IG9yIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0geyFPYmplY3R8QXJyYXl9IG9ialxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosICopfSBmblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVhY2gob2JqLCBmbikge1xyXG5cdGlmIChBcnJheS5pc0FycmF5KG9iaikgfHwgJ2xlbmd0aCcgaW4gb2JqICYmIGlzTnVtYmVyKG9iai5sZW5ndGgpKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRmbihpLCBvYmpbaV0pO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG5cdFx0XHRmbihrZXksIG9ialtrZXldKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEVtbEVkaXRvciBmcm9tICcuL2xpYi9lbWxFZGl0b3InO1xyXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi9saWIvcGx1Z2luTWFuYWdlcic7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2xpYi9lc2NhcGUuanMnO1xyXG5pbXBvcnQgKiBhcyBicm93c2VyIGZyb20gJy4vbGliL2Jyb3dzZXIuanMnO1xyXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9saWIvZG9tLmpzJztcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi9saWIvdXRpbHMuanMnO1xyXG5pbXBvcnQgZGVmYXVsdENvbW1hbmRzIGZyb20gJy4vbGliL2RlZmF1bHRDb21tYW5kcy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2xpYi9kZWZhdWx0T3B0aW9ucy5qcyc7XHJcbmltcG9ydCAnLi90aGVtZXMvc3F1YXJlLmxlc3MnO1xyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG5cdGludGVyZmFjZSBXaW5kb3cge1xyXG5cdFx0ZW1sRWRpdG9yOiBJRWRpdG9yO1xyXG5cdH1cclxufVxyXG5cclxuaW50ZXJmYWNlIElFZGl0b3Ige1xyXG5cdGNvbW1hbmQ6IE9iamVjdDtcclxuXHRsb2NhbGU6IE9iamVjdDtcclxuXHRpY29uczogT2JqZWN0O1xyXG5cdGZvcm1hdHM6IE9iamVjdDtcclxuXHRjb21tYW5kczogT2JqZWN0O1xyXG5cdGRlZmF1bHRPcHRpb25zOiBPYmplY3Q7XHJcblx0aW9zOiBib29sZWFuO1xyXG5cdGlzV3lzaXd5Z1N1cHBvcnRlZDogYm9vbGVhbjtcclxuXHRyZWdleEVzY2FwZShzdHI6IHN0cmluZyk6IHN0cmluZztcclxuXHRlc2NhcGVFbnRpdGllcyhzdHI6IHN0cmluZywgbm9RdW90ZXM6IGJvb2xlYW4gfCBudWxsKTogc3RyaW5nO1xyXG5cdGVzY2FwZVVyaVNjaGVtZSh1cmw6IHN0cmluZyk6IHN0cmluZztcclxuXHRkb206IE9iamVjdDtcclxuXHR1dGlsczogT2JqZWN0O1xyXG5cdHBsdWdpbnM6IE9iamVjdDtcclxuXHRjcmVhdGUodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIG9wdGlvbnM6IE9iamVjdCk6IHZvaWQ7XHJcblx0aW5zdGFuY2UodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQpOiBJRWRpdG9yO1xyXG59XHJcblxyXG53aW5kb3cuZW1sRWRpdG9yID0ge1xyXG5cdGNvbW1hbmQ6IEVtbEVkaXRvci5jb21tYW5kLFxyXG5cdGxvY2FsZTogRW1sRWRpdG9yLmxvY2FsZSxcclxuXHRpY29uczogRW1sRWRpdG9yLmljb25zLFxyXG5cdGZvcm1hdHM6IEVtbEVkaXRvci5mb3JtYXRzLFxyXG5cclxuXHRjb21tYW5kczogZGVmYXVsdENvbW1hbmRzLFxyXG5cdGRlZmF1bHRPcHRpb25zOiBkZWZhdWx0T3B0aW9ucyxcclxuXHRpb3M6IGJyb3dzZXIuaW9zLFxyXG5cdGlzV3lzaXd5Z1N1cHBvcnRlZDogYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQsXHJcblx0cmVnZXhFc2NhcGU6IGVzY2FwZS5yZWdleCxcclxuXHRlc2NhcGVFbnRpdGllczogZXNjYXBlLmVudGl0aWVzLFxyXG5cdGVzY2FwZVVyaVNjaGVtZTogZXNjYXBlLnVyaVNjaGVtZSxcclxuXHJcblx0ZG9tOiB7XHJcblx0XHRjc3M6IGRvbS5jc3MsXHJcblx0XHRhdHRyOiBkb20uYXR0cixcclxuXHRcdHJlbW92ZUF0dHI6IGRvbS5yZW1vdmVBdHRyLFxyXG5cdFx0aXM6IGRvbS5pcyxcclxuXHRcdGNsb3Nlc3Q6IGRvbS5jbG9zZXN0LFxyXG5cdFx0d2lkdGg6IGRvbS53aWR0aCxcclxuXHRcdGhlaWdodDogZG9tLmhlaWdodCxcclxuXHRcdHRyYXZlcnNlOiBkb20udHJhdmVyc2UsXHJcblx0XHRyVHJhdmVyc2U6IGRvbS5yVHJhdmVyc2UsXHJcblx0XHRwYXJzZUhUTUw6IGRvbS5wYXJzZUhUTUwsXHJcblx0XHRoYXNTdHlsaW5nOiBkb20uaGFzU3R5bGluZyxcclxuXHRcdGNvbnZlcnRFbGVtZW50OiBkb20uY29udmVydEVsZW1lbnQsXHJcblx0XHRibG9ja0xldmVsTGlzdDogZG9tLmJsb2NrTGV2ZWxMaXN0LFxyXG5cdFx0Y2FuSGF2ZUNoaWxkcmVuOiBkb20uY2FuSGF2ZUNoaWxkcmVuLFxyXG5cdFx0aXNJbmxpbmU6IGRvbS5pc0lubGluZSxcclxuXHRcdGNvcHlDU1M6IGRvbS5jb3B5Q1NTLFxyXG5cdFx0Zml4TmVzdGluZzogZG9tLmZpeE5lc3RpbmcsXHJcblx0XHRmaW5kQ29tbW9uQW5jZXN0b3I6IGRvbS5maW5kQ29tbW9uQW5jZXN0b3IsXHJcblx0XHRnZXRTaWJsaW5nOiBkb20uZ2V0U2libGluZyxcclxuXHRcdHJlbW92ZVdoaXRlU3BhY2U6IGRvbS5yZW1vdmVXaGl0ZVNwYWNlLFxyXG5cdFx0ZXh0cmFjdENvbnRlbnRzOiBkb20uZXh0cmFjdENvbnRlbnRzLFxyXG5cdFx0Z2V0T2Zmc2V0OiBkb20uZ2V0T2Zmc2V0LFxyXG5cdFx0Z2V0U3R5bGU6IGRvbS5nZXRTdHlsZSxcclxuXHRcdGhhc1N0eWxlOiBkb20uaGFzU3R5bGVcclxuXHR9LFxyXG5cclxuXHR1dGlsczoge1xyXG5cdFx0ZWFjaDogdXRpbHMuZWFjaCxcclxuXHRcdGlzRW1wdHlPYmplY3Q6IHV0aWxzLmlzRW1wdHlPYmplY3QsXHJcblx0XHRleHRlbmQ6IHV0aWxzLmV4dGVuZFxyXG5cdH0sXHJcblxyXG5cdHBsdWdpbnM6IFBsdWdpbk1hbmFnZXIucGx1Z2lucyxcclxuXHJcblx0Y3JlYXRlOiBmdW5jdGlvbiAodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xyXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG5cdFx0Ly8gRG9uJ3QgYWxsb3cgdGhlIGVkaXRvciB0byBiZSBpbml0aWFsaXNlZFxyXG5cdFx0Ly8gb24gaXQncyBvd24gc291cmNlIGVkaXRvclxyXG5cdFx0aWYgKGRvbS5wYXJlbnQodGV4dGFyZWEsICcuZW1sZWRpdG9yLWNvbnRhaW5lcicpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5ydW5XaXRob3V0V3lzaXd5Z1N1cHBvcnQgfHwgYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcclxuXHRcdFx0KG5ldyBFbWxFZGl0b3IodGV4dGFyZWEsIG9wdGlvbnMpKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRpbnN0YW5jZTogZnVuY3Rpb24gKHRleHRhcmVhOiBhbnkpIHtcclxuXHRcdHJldHVybiB0ZXh0YXJlYS5fZW1sZWRpdG9yO1xyXG5cdH1cclxufTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9