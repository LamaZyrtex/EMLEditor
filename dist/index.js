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
        this.commands = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, (userOptions.commands || _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
        /**
         * Options for this editor instance
         * @name opts
         * @memberOf EmlEditor.prototype
         */
        let options = this.opts = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"], userOptions);
        // Don't deep extend emoticons (fixes #565)
        this.opts.emoticons = userOptions.emoticons || _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__["default"].emoticons;
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
         * Switches between the WYSIWYG and source modes
         *
         * @function
         * @name toggleSourceMode
         * @since 1.4.0
         * @memberOf EmlEditor.prototype
         */
        this.toggleSourceMode = function () {
            let isInSourceMode = this.inSourceMode();
            // don't allow switching to WYSIWYG if doesn't support it
            if (!_browser_js__WEBPACK_IMPORTED_MODULE_8__.isWysiwygSupported && isInSourceMode) {
                return;
            }
            if (!isInSourceMode) {
                rangeHelper.saveRange();
                rangeHelper.clear();
            }
            currentSelection = null;
            this.blur();
            if (isInSourceMode) {
                this.setWysiwygEditorValue(this.getSourceEditorValue());
            }
            else {
                this.setSourceEditorValue(this.getWysiwygEditorValue());
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
        this.inSourceMode = function () {
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
        this.blur = function (handler, excludeWysiwyg, excludeSource) {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                this.bind('blur', handler, excludeWysiwyg, excludeSource);
            }
            else if (!this.sourceMode()) {
                wysiwygBody.blur();
            }
            else {
                sourceEditor.blur();
            }
            return this;
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
        this.setWysiwygEditorValue = function (value) {
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
        this.setSourceEditorValue = function (value) {
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
        this.updateOriginal = function () {
            textarea.value = this.val();
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
        this.getSourceEditorValue = function (filter) {
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
        this.dimensions = function (width, height, save) {
            // set undefined width/height to boolean false
            width = (!width && width !== 0) ? false : width;
            height = (!height && height !== 0) ? false : height;
            if (width === false && height === false) {
                return { width: this.width(), height: this.height() };
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
        this.readOnly = function (readOnly) {
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
        this.focus = function (handler, excludeWysiwyg, excludeSource) {
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                this.bind('focus', handler, excludeWysiwyg, excludeSource);
            }
            else if (!this.inSourceMode()) {
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
        this.val = function (val, filter = true) {
            if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(val)) {
                return this.inSourceMode() ?
                    this.getSourceEditorValue(false) :
                    this.getWysiwygEditorValue(filter);
            }
            if (!this.inSourceMode()) {
                if (filter !== false && 'toHtml' in format) {
                    val = format.toHtml(val);
                }
                this.setWysiwygEditorValue(val);
            }
            else {
                this.setSourceEditorValue(val);
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
        this.expandToContent = function (ignoreMaxHeight) {
            if (this.maximize()) {
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
            let newHeight = this.height() + 1 + (spaceNeeded - current);
            if (!ignoreMaxHeight && autoExpandBounds.max !== -1) {
                newHeight = Math.min(newHeight, autoExpandBounds.max);
            }
            this.height(Math.ceil(Math.max(newHeight, autoExpandBounds.min)));
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
        this.rtl = function (rtl) {
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
        this.emoticons = function (enable) {
            if (!enable && enable !== false) {
                return options.emoticonsEnabled;
            }
            options.emoticonsEnabled = enable;
            if (enable) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'keypress', null, emoticonsKeyPress);
                if (!this.sourceMode()) {
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
        this.sourceMode = function (enable) {
            let inSourceMode = this.inSourceMode();
            if (typeof enable !== 'boolean') {
                return inSourceMode;
            }
            if ((inSourceMode && !enable) || (!inSourceMode && enable)) {
                this.toggleSourceMode();
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
        this.width = function (width, saveWidth) {
            if (!width && width !== 0) {
                return _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer);
            }
            this.dimensions(width, null, saveWidth);
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
        this.height = function (height, saveHeight) {
            if (!height && height !== 0) {
                return _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer);
            }
            this.dimensions(null, height, saveHeight);
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
        this.createDropDown = function (menuItem, name, content) {
            // first click for create second click for close
            let dropDownCss, dropDownClass = 'emleditor-' + name;
            this.closeDropDown();
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
        this.maximize = function (maximize) {
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
            this.width(maximize ? '100%' : options.width, false);
            this.height(maximize ? '100%' : options.height, false);
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
        this.destroy = function () {
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'submit', null, this.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pagehide', null, this.updateOriginal);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pageshow', null, handleFormReset);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(sourceEditor);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(toolbar);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(editorContainer);
            delete textarea._sceditor;
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
        this.closeDropDown = function (focus) {
            if (dropdown) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(dropdown);
                dropdown = null;
            }
            if (focus === true) {
                this.focus();
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
        this.wysiwygEditorInsertHtml = function (html, endHtml, overrideCodeBlocking) {
            let marker, scrollTop, scrollTo, editorHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(wysiwygEditor);
            this.focus();
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
        this.wysiwygEditorInsertText = function (text, endText) {
            this.wysiwygEditorInsertHtml(_escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(text), _escape_js__WEBPACK_IMPORTED_MODULE_7__.entities(endText));
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
        this.insertText = function (text, endText) {
            if (this.inSourceMode()) {
                this.sourceEditorInsertText(text, endText);
            }
            else {
                this.wysiwygEditorInsertText(text, endText);
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
            this.wysiwygEditorInsertHtml(paste.val, null, true);
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
        this.sourceEditorInsertText = function (text, endText) {
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
        this.getRangeHelper = function () {
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
        this.sourceEditorCaret = function (position) {
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
        this.insert = function (start, end, filter, convertEmoticons, allowMixed) {
            if (this.inSourceMode()) {
                this.sourceEditorInsertText(start, end);
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
            this.wysiwygEditorInsertHtml(start);
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
        this.getWysiwygEditorValue = function (filter) {
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
        this.getBody = function () {
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
        this.getContentAreaContainer = function () {
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
        this.execCommand = function (command, param) {
            let executed = false, commandObj = this.commands[command];
            this.focus();
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
                alert(this._(commandObj.errorMessage));
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
        this.currentNode = function () {
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
        this.currentBlockNode = function () {
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
        this._ = function () {
            let undef, args = arguments;
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
        this.bind = function (events, handler, excludeWysiwyg, excludeSource) {
            let eventsArr = events.split(' ');
            let i = eventsArr.length;
            while (i--) {
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                    let wysEvent = 'scewys' + eventsArr[i];
                    let srcEvent = 'scesrc' + eventsArr[i];
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
        this.unbind = function (events, handler, excludeWysiwyg, excludeSource) {
            let eventsArr = events.split(' ');
            let i = eventsArr.length;
            while (i--) {
                if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isFunction(handler)) {
                    if (!excludeWysiwyg) {
                        _utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(eventHandlers['scewys' + eventsArr[i]] || [], handler);
                    }
                    if (!excludeSource) {
                        _utils_js__WEBPACK_IMPORTED_MODULE_1__.arrayRemove(eventHandlers['scesrc' + eventsArr[i]] || [], handler);
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
        this.keyDown = function (handler, excludeWysiwyg, excludeSource) {
            return this.bind('keydown', handler, excludeWysiwyg, excludeSource);
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
        this.keyPress = function (handler, excludeWysiwyg, excludeSource) {
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
        this.keyUp = function (handler, excludeWysiwyg, excludeSource) {
            return this.bind('keyup', handler, excludeWysiwyg, excludeSource);
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
        this.nodeChanged = function (handler) {
            return this.bind('nodechanged', handler, false, true);
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
        this.selectionChanged = function (handler) {
            return this.bind('selectionchanged', handler, false, true);
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
        this.valueChanged = function (handler, excludeWysiwyg, excludeSource) {
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
        this.css = function (css) {
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
        this.removeShortcut = function (shortcut) {
            delete shortcutHandlers[shortcut.toLowerCase()];
            return this;
        };
        /**
         * Adds a shortcut handler to the editor
         * @param  {string}          shortcut
         * @param  {String|Function} cmd
         * @return {emleditor}
         */
        this.addShortcut = function (shortcut, cmd) {
            shortcut = shortcut.toLowerCase();
            let shortcutKey = shortcut;
            if (_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString(cmd)) {
                let strCmd = cmd;
                shortcutHandlers[shortcutKey] = function () {
                    handleCommand(toolbarButtons[strCmd], this.commands[strCmd]);
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
        this.clearBlockFormatting = function (block) {
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
            textarea._sceditor = this;
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
                this.toggleSourceMode();
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
            this.dimensions(options.width || _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(textarea), options.height || _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(textarea));
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
            this.readOnly(!!options.readOnly);
            // iframe overflow fix for iOS
            if (_browser_js__WEBPACK_IMPORTED_MODULE_8__.ios) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(wysiwygBody, '100%');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'touchend', null, this.focus);
            }
            let tabIndex = _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(textarea, 'tabindex');
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(sourceEditor, 'tabindex', tabIndex);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygEditor, 'tabindex', tabIndex);
            rangeHelper = new _rangeHelper__WEBPACK_IMPORTED_MODULE_5__.RangeHelper(wysiwygWindow, null, sanitize);
            // load any textarea value into the editor
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(textarea);
            this.val(textarea.value);
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
            this.rtl(!!options.rtl);
            if (options.autoExpand) {
                // Need to update when images (or anything else) loads
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'load', null, autoExpand, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(wysiwygBody, 'input keyup', null, autoExpand);
            }
            if (options.resizeEnabled) {
                initResize();
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(editorContainer, 'id', options.id);
            this.emoticons(options.emoticonsEnabled);
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(form, 'submit', null, this.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pagehide', null, this.updateOriginal);
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
                if (!this.val()) {
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
            let group, commands = this.commands, exclude = (options.toolbarExclude || '').split(','), groups = options.toolbar.split('|');
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
                        dispName: this._(command.name ||
                            command.tooltip || commandName)
                    }, true).firstChild;
                    if (icons && icons.create) {
                        let icon = icons.create(commandName);
                        if (icon) {
                            _dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(icons.create(commandName), button.firstChild);
                            _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(button, 'has-icon');
                        }
                    }
                    button._sceTxtMode = !!command.txtExec;
                    button._sceWysiwygMode = !!command.exec;
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
                        this.closeDropDown();
                        e.preventDefault();
                    });
                    if (command.tooltip) {
                        _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(button, 'title', this._(command.tooltip) +
                            (shortcut ? ' (' + shortcut + ')' : ''));
                    }
                    if (shortcut) {
                        this.addShortcut(shortcut, commandName);
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
            }), moveEvents = 'touchmove mousemove', endEvents = 'touchcancel touchend mouseup', startX = 0, startY = 0, newX = 0, newY = 0, startWidth = 0, startHeight = 0, origWidth = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer), origHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer), isDragging = false, rtl = this.rtl();
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
                    this.dimensions(newWidth, newHeight);
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
            if (this.sourceMode()) {
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
            this.focus();
        };
        /**
         * Updates the toolbar to disable/enable the appropriate buttons
         * @private
         */
        let updateToolBar = (disable) => {
            let mode = this.inSourceMode() ? '_sceTxtMode' : '_sceWysiwygMode';
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(toolbarButtons, function (_, button) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', disable || !button[mode]);
            });
        };
        autoExpand = () => {
            if (options.autoExpand && !autoExpandThrottle) {
                autoExpandThrottle = setTimeout(this.expandToContent, 200);
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
            if (this.inSourceMode()) {
                if (cmd.txtExec) {
                    if (Array.isArray(cmd.txtExec)) {
                        this.sourceEditorInsertText.apply(this, cmd.txtExec);
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
                    this.execCommand(cmd.exec, Object.prototype.hasOwnProperty.call(cmd, 'execParam') ? cmd.execParam : null);
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
            let isSource = this.sourceMode();
            if (this.readOnly()) {
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
                let isDisabled = (isSource && !btn._sceTxtMode) ||
                    (!isSource && !btn._sceWysiwygMode);
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
            this.closeDropDown();
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
            this.val(textarea.value);
        };
        /**
         * Handles any mousedown press in the WYSIWYG editor
         * @private
         */
        handleMouseDown = () => {
            this.closeDropDown();
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
            let name = (e.target === sourceEditor ? 'scesrc' : 'scewys') + e.type;
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
            let replacedEmoticon, cachePos = 0, emoticonsCache = this.emoticonsCache, curChar = String.fromCharCode(e.which);
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
                this.emoticonsCache = emoticonsCache;
                this.longestEmoticonCode =
                    emoticonsCache[emoticonsCache.length - 1][0].length;
            }
            replacedEmoticon = rangeHelper.replaceKeyword(this.emoticonsCache, true, true, this.longestEmoticonCode, options.emoticonsCompat, curChar);
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
            this.clearBlockFormatting(parent);
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
            let currentHtml, sourceMode = this.sourceMode(), hasSelection = !sourceMode && rangeHelper.hasSelection();
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
                    rawValue: sourceMode ? this.val() : currentHtml
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
            this.updateOriginal();
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
            /*eslint no-new: off*/
            (new _lib_emlEditor__WEBPACK_IMPORTED_MODULE_0__["default"](textarea, options));
        }
    },
    instance: function (textarea) {
        return textarea._sceditor;
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixNQUFNO0FBQ3ZCLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUMsc0ZBQXNGLDZEQUE2RDtBQUNuSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVUQUF1VDtBQUN2VDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdDQUF3QyxvRkFBb0Ysb0tBQW9LLGlIQUFpSDtBQUN6WjtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVIsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFB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QUFPO2dCQUNYLEVBQUUsRUFBRSxRQUFRO2dCQUNaLEVBQUUsRUFBRSxVQUFVO2dCQUNkLEVBQUUsRUFBRSxLQUFLO2dCQUNULEVBQUUsRUFBRSxNQUFNO2dCQUNWLEVBQUUsRUFBRSxNQUFNO2dCQUNWLEVBQUUsRUFBRSxJQUFJO2dCQUNSLEVBQUUsRUFBRSxPQUFPO2dCQUNYLEVBQUUsRUFBRSxNQUFNO2dCQUNWLEVBQUUsRUFBRSxRQUFRO2dCQUNaLEVBQUUsRUFBRSxLQUFLO2dCQUNULEVBQUUsRUFBRSxLQUFLO2dCQUNULEVBQUUsRUFBRSxLQUFLO2dCQUNULEVBQUUsRUFBRSxRQUFRO2dCQUNaLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxLQUFLO2dCQUNWLEdBQUcsRUFBRSxLQUFLO2dCQUNWLEdBQUcsRUFBRSxLQUFLO2dCQUNWLEdBQUcsRUFBRSxTQUFTO2dCQUNkLEdBQUcsRUFBRSxZQUFZO2dCQUNqQixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsSUFBSTtnQkFDVCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsSUFBSTthQUNULEVBQUUsaUJBQWlCLEdBQVE7Z0JBQzNCLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxLQUFLO2dCQUNWLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEVBQUUsRUFBRSxHQUFHO2dCQUNQLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2FBQ1IsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7WUFFakcsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDNUIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBRUQsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBRUQsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FB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R0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ244Qks7O0FBRWhDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUyw2Q0FBSTs7QUFFYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksYUFBYTtBQUN6QixZQUFZLFFBQVE7QUFDcEIsWUFBWSxjQUFjO0FBQzFCLFlBQVk7QUFDWjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGFBQWE7QUFDeEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUM7SUFDRixDQUFDO0lBRUQsUUFBUSxFQUFFLFVBQVUsUUFBYTtRQUNoQyxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDM0IsQ0FBQztDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9ub2RlX21vZHVsZXMvZG9tcHVyaWZ5L2Rpc3QvcHVyaWZ5LmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy90aGVtZXMvc3F1YXJlLmxlc3M/ZGRjNiIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2VtbEVkaXRvci50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3BsdWdpbk1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9yYW5nZUhlbHBlci50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0Q29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0T3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2RvbS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Vtb3RpY29ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3RlbXBsYXRlcy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBsaWNlbnNlIERPTVB1cmlmeSAzLjAuOSB8IChjKSBDdXJlNTMgYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyB8IFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgbGljZW5zZSAyLjAgYW5kIE1vemlsbGEgUHVibGljIExpY2Vuc2UgMi4wIHwgZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2Jsb2IvMy4wLjkvTElDRU5TRSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGNvbnN0IHtcbiAgICBlbnRyaWVzLFxuICAgIHNldFByb3RvdHlwZU9mLFxuICAgIGlzRnJvemVuLFxuICAgIGdldFByb3RvdHlwZU9mLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvclxuICB9ID0gT2JqZWN0O1xuICBsZXQge1xuICAgIGZyZWV6ZSxcbiAgICBzZWFsLFxuICAgIGNyZWF0ZVxuICB9ID0gT2JqZWN0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbiAgbGV0IHtcbiAgICBhcHBseSxcbiAgICBjb25zdHJ1Y3RcbiAgfSA9IHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBSZWZsZWN0O1xuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghc2VhbCkge1xuICAgIHNlYWwgPSBmdW5jdGlvbiBzZWFsKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFhcHBseSkge1xuICAgIGFwcGx5ID0gZnVuY3Rpb24gYXBwbHkoZnVuLCB0aGlzVmFsdWUsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmdW4uYXBwbHkodGhpc1ZhbHVlLCBhcmdzKTtcbiAgICB9O1xuICB9XG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgRnVuYyguLi5hcmdzKTtcbiAgICB9O1xuICB9XG4gIGNvbnN0IGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuICBjb25zdCBhcnJheVBvcCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnBvcCk7XG4gIGNvbnN0IGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICBjb25zdCBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIGNvbnN0IHN0cmluZ1RvU3RyaW5nID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nKTtcbiAgY29uc3Qgc3RyaW5nTWF0Y2ggPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUubWF0Y2gpO1xuICBjb25zdCBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICBjb25zdCBzdHJpbmdJbmRleE9mID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLmluZGV4T2YpO1xuICBjb25zdCBzdHJpbmdUcmltID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRyaW0pO1xuICBjb25zdCBvYmplY3RIYXNPd25Qcm9wZXJ0eSA9IHVuYXBwbHkoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gIGNvbnN0IHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG4gIGNvbnN0IHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCB0aGlzQXJnIGFuZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uc3RydWN0KGZ1bmMsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIHByb3BlcnRpZXMgdG8gYSBsb29rdXAgdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldCAtIFRoZSBzZXQgdG8gd2hpY2ggZWxlbWVudHMgd2lsbCBiZSBhZGRlZC5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgY29udGFpbmluZyBlbGVtZW50cyB0byBiZSBhZGRlZCB0byB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm1DYXNlRnVuYyAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgY2FzZSBvZiBlYWNoIGVsZW1lbnQgYmVmb3JlIGFkZGluZyB0byB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgbW9kaWZpZWQgc2V0IHdpdGggYWRkZWQgZWxlbWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRUb1NldChzZXQsIGFycmF5KSB7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBzdHJpbmdUb0xvd2VyQ2FzZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG4gICAgbGV0IGwgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgbGV0IGVsZW1lbnQgPSBhcnJheVtsXTtcbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgbGNFbGVtZW50ID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSBsY0VsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFtlbGVtZW50XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW4gdXAgYW4gYXJyYXkgdG8gaGFyZGVuIGFnYWluc3QgQ1NQUFxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBiZSBjbGVhbmVkLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBjbGVhbmVkIHZlcnNpb24gb2YgdGhlIGFycmF5XG4gICAqL1xuICBmdW5jdGlvbiBjbGVhbkFycmF5KGFycmF5KSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkoYXJyYXksIGluZGV4KTtcbiAgICAgIGlmICghaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGFycmF5W2luZGV4XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBjbG9uZWQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgbmV3IG9iamVjdCB0aGF0IGNvcGllcyB0aGUgb3JpZ2luYWwuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSBjcmVhdGUobnVsbCk7XG4gICAgZm9yIChjb25zdCBbcHJvcGVydHksIHZhbHVlXSBvZiBlbnRyaWVzKG9iamVjdCkpIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgaWYgKGlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xlYW5BcnJheSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsb25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhdXRvbWF0aWNhbGx5IGNoZWNrcyBpZiB0aGUgcHJvcCBpcyBmdW5jdGlvbiBvciBnZXR0ZXIgYW5kIGJlaGF2ZXMgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGxvb2sgdXAgdGhlIGdldHRlciBmdW5jdGlvbiBpbiBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCAtIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB3aGljaCB0byBmaW5kIHRoZSBnZXR0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGdldHRlciBmdW5jdGlvbiBmb3VuZCBpbiB0aGUgcHJvdG90eXBlIGNoYWluIG9yIGEgZmFsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBsb29rdXBHZXR0ZXIob2JqZWN0LCBwcm9wKSB7XG4gICAgd2hpbGUgKG9iamVjdCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3ApO1xuICAgICAgaWYgKGRlc2MpIHtcbiAgICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy5nZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmYWxsYmFja1ZhbHVlO1xuICB9XG5cbiAgY29uc3QgaHRtbCQxID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpYWxvZycsICdkaXInLCAnZGl2JywgJ2RsJywgJ2R0JywgJ2VsZW1lbnQnLCAnZW0nLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9udCcsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2ltZycsICdpbnB1dCcsICdpbnMnLCAna2JkJywgJ2xhYmVsJywgJ2xlZ2VuZCcsICdsaScsICdtYWluJywgJ21hcCcsICdtYXJrJywgJ21hcnF1ZWUnLCAnbWVudScsICdtZW51aXRlbScsICdtZXRlcicsICduYXYnLCAnbm9icicsICdvbCcsICdvcHRncm91cCcsICdvcHRpb24nLCAnb3V0cHV0JywgJ3AnLCAncGljdHVyZScsICdwcmUnLCAncHJvZ3Jlc3MnLCAncScsICdycCcsICdydCcsICdydWJ5JywgJ3MnLCAnc2FtcCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzaGFkb3cnLCAnc21hbGwnLCAnc291cmNlJywgJ3NwYWNlcicsICdzcGFuJywgJ3N0cmlrZScsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RlbXBsYXRlJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndHInLCAndHJhY2snLCAndHQnLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJ10pO1xuXG4gIC8vIFNWR1xuICBjb25zdCBzdmckMSA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwcGF0aCcsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmaWx0ZXInLCAnZm9udCcsICdnJywgJ2dseXBoJywgJ2dseXBocmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsZ3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N0eWxlJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0cGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJywgJ3ZpZXcnLCAndmtlcm4nXSk7XG4gIGNvbnN0IHN2Z0ZpbHRlcnMgPSBmcmVlemUoWydmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLCAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJywgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRHJvcFNoYWRvdycsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnXSk7XG5cbiAgLy8gTGlzdCBvZiBTVkcgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWxsb3dlZCBieSBkZWZhdWx0LlxuICAvLyBXZSBzdGlsbCBuZWVkIHRvIGtub3cgdGhlbSBzbyB0aGF0IHdlIGNhbiBkbyBuYW1lc3BhY2VcbiAgLy8gY2hlY2tzIHByb3Blcmx5IGluIGNhc2Ugb25lIHdhbnRzIHRvIGFkZCB0aGVtIHRvXG4gIC8vIGFsbG93LWxpc3QuXG4gIGNvbnN0IHN2Z0Rpc2FsbG93ZWQgPSBmcmVlemUoWydhbmltYXRlJywgJ2NvbG9yLXByb2ZpbGUnLCAnY3Vyc29yJywgJ2Rpc2NhcmQnLCAnZm9udC1mYWNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGF0Y2gnLCAnaGF0Y2hwYXRoJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21pc3NpbmctZ2x5cGgnLCAnc2NyaXB0JywgJ3NldCcsICdzb2xpZGNvbG9yJywgJ3Vua25vd24nLCAndXNlJ10pO1xuICBjb25zdCBtYXRoTWwkMSA9IGZyZWV6ZShbJ21hdGgnLCAnbWVuY2xvc2UnLCAnbWVycm9yJywgJ21mZW5jZWQnLCAnbWZyYWMnLCAnbWdseXBoJywgJ21pJywgJ21sYWJlbGVkdHInLCAnbW11bHRpc2NyaXB0cycsICdtbicsICdtbycsICdtb3ZlcicsICdtcGFkZGVkJywgJ21waGFudG9tJywgJ21yb290JywgJ21yb3cnLCAnbXMnLCAnbXNwYWNlJywgJ21zcXJ0JywgJ21zdHlsZScsICdtc3ViJywgJ21zdXAnLCAnbXN1YnN1cCcsICdtdGFibGUnLCAnbXRkJywgJ210ZXh0JywgJ210cicsICdtdW5kZXInLCAnbXVuZGVyb3ZlcicsICdtcHJlc2NyaXB0cyddKTtcblxuICAvLyBTaW1pbGFybHkgdG8gU1ZHLCB3ZSB3YW50IHRvIGtub3cgYWxsIE1hdGhNTCBlbGVtZW50cyxcbiAgLy8gZXZlbiB0aG9zZSB0aGF0IHdlIGRpc2FsbG93IGJ5IGRlZmF1bHQuXG4gIGNvbnN0IG1hdGhNbERpc2FsbG93ZWQgPSBmcmVlemUoWydtYWN0aW9uJywgJ21hbGlnbmdyb3VwJywgJ21hbGlnbm1hcmsnLCAnbWxvbmdkaXYnLCAnbXNjYXJyaWVzJywgJ21zY2FycnknLCAnbXNncm91cCcsICdtc3RhY2snLCAnbXNsaW5lJywgJ21zcm93JywgJ3NlbWFudGljcycsICdhbm5vdGF0aW9uJywgJ2Fubm90YXRpb24teG1sJywgJ21wcmVzY3JpcHRzJywgJ25vbmUnXSk7XG4gIGNvbnN0IHRleHQgPSBmcmVlemUoWycjdGV4dCddKTtcblxuICBjb25zdCBodG1sID0gZnJlZXplKFsnYWNjZXB0JywgJ2FjdGlvbicsICdhbGlnbicsICdhbHQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9waWN0dXJlaW5waWN0dXJlJywgJ2F1dG9wbGF5JywgJ2JhY2tncm91bmQnLCAnYmdjb2xvcicsICdib3JkZXInLCAnY2FwdHVyZScsICdjZWxscGFkZGluZycsICdjZWxsc3BhY2luZycsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3MnLCAnY2xlYXInLCAnY29sb3InLCAnY29scycsICdjb2xzcGFuJywgJ2NvbnRyb2xzJywgJ2NvbnRyb2xzbGlzdCcsICdjb29yZHMnLCAnY3Jvc3NvcmlnaW4nLCAnZGF0ZXRpbWUnLCAnZGVjb2RpbmcnLCAnZGVmYXVsdCcsICdkaXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZXBpY3R1cmVpbnBpY3R1cmUnLCAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsICdlbmN0eXBlJywgJ2VudGVya2V5aGludCcsICdmYWNlJywgJ2ZvcicsICdoZWFkZXJzJywgJ2hlaWdodCcsICdoaWRkZW4nLCAnaGlnaCcsICdocmVmJywgJ2hyZWZsYW5nJywgJ2lkJywgJ2lucHV0bW9kZScsICdpbnRlZ3JpdHknLCAnaXNtYXAnLCAna2luZCcsICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9hZGluZycsICdsb29wJywgJ2xvdycsICdtYXgnLCAnbWF4bGVuZ3RoJywgJ21lZGlhJywgJ21ldGhvZCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ211bHRpcGxlJywgJ211dGVkJywgJ25hbWUnLCAnbm9uY2UnLCAnbm9zaGFkZScsICdub3ZhbGlkYXRlJywgJ25vd3JhcCcsICdvcGVuJywgJ29wdGltdW0nLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcmNsYW5nJywgJ3N0YXJ0JywgJ3NyYycsICdzcmNzZXQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmluZGV4JywgJ3RpdGxlJywgJ3RyYW5zbGF0ZScsICd0eXBlJywgJ3VzZW1hcCcsICd2YWxpZ24nLCAndmFsdWUnLCAnd2lkdGgnLCAneG1sbnMnLCAnc2xvdCddKTtcbiAgY29uc3Qgc3ZnID0gZnJlZXplKFsnYWNjZW50LWhlaWdodCcsICdhY2N1bXVsYXRlJywgJ2FkZGl0aXZlJywgJ2FsaWdubWVudC1iYXNlbGluZScsICdhc2NlbnQnLCAnYXR0cmlidXRlbmFtZScsICdhdHRyaWJ1dGV0eXBlJywgJ2F6aW11dGgnLCAnYmFzZWZyZXF1ZW5jeScsICdiYXNlbGluZS1zaGlmdCcsICdiZWdpbicsICdiaWFzJywgJ2J5JywgJ2NsYXNzJywgJ2NsaXAnLCAnY2xpcHBhdGh1bml0cycsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NvbG9yJywgJ2NvbG9yLWludGVycG9sYXRpb24nLCAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJywgJ2NvbG9yLXByb2ZpbGUnLCAnY29sb3ItcmVuZGVyaW5nJywgJ2N4JywgJ2N5JywgJ2QnLCAnZHgnLCAnZHknLCAnZGlmZnVzZWNvbnN0YW50JywgJ2RpcmVjdGlvbicsICdkaXNwbGF5JywgJ2Rpdmlzb3InLCAnZHVyJywgJ2VkZ2Vtb2RlJywgJ2VsZXZhdGlvbicsICdlbmQnLCAnZmlsbCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2ZpbHRlcicsICdmaWx0ZXJ1bml0cycsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvbnQtZmFtaWx5JywgJ2ZvbnQtc2l6ZScsICdmb250LXNpemUtYWRqdXN0JywgJ2ZvbnQtc3RyZXRjaCcsICdmb250LXN0eWxlJywgJ2ZvbnQtdmFyaWFudCcsICdmb250LXdlaWdodCcsICdmeCcsICdmeScsICdnMScsICdnMicsICdnbHlwaC1uYW1lJywgJ2dseXBocmVmJywgJ2dyYWRpZW50dW5pdHMnLCAnZ3JhZGllbnR0cmFuc2Zvcm0nLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2luJywgJ2luMicsICdrJywgJ2sxJywgJ2syJywgJ2szJywgJ2s0JywgJ2tlcm5pbmcnLCAna2V5cG9pbnRzJywgJ2tleXNwbGluZXMnLCAna2V5dGltZXMnLCAnbGFuZycsICdsZW5ndGhhZGp1c3QnLCAnbGV0dGVyLXNwYWNpbmcnLCAna2VybmVsbWF0cml4JywgJ2tlcm5lbHVuaXRsZW5ndGgnLCAnbGlnaHRpbmctY29sb3InLCAnbG9jYWwnLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdtYXJrZXJoZWlnaHQnLCAnbWFya2VydW5pdHMnLCAnbWFya2Vyd2lkdGgnLCAnbWFza2NvbnRlbnR1bml0cycsICdtYXNrdW5pdHMnLCAnbWF4JywgJ21hc2snLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21vZGUnLCAnbWluJywgJ25hbWUnLCAnbnVtb2N0YXZlcycsICdvZmZzZXQnLCAnb3BlcmF0b3InLCAnb3BhY2l0eScsICdvcmRlcicsICdvcmllbnQnLCAnb3JpZW50YXRpb24nLCAnb3JpZ2luJywgJ292ZXJmbG93JywgJ3BhaW50LW9yZGVyJywgJ3BhdGgnLCAncGF0aGxlbmd0aCcsICdwYXR0ZXJuY29udGVudHVuaXRzJywgJ3BhdHRlcm50cmFuc2Zvcm0nLCAncGF0dGVybnVuaXRzJywgJ3BvaW50cycsICdwcmVzZXJ2ZWFscGhhJywgJ3ByZXNlcnZlYXNwZWN0cmF0aW8nLCAncHJpbWl0aXZldW5pdHMnLCAncicsICdyeCcsICdyeScsICdyYWRpdXMnLCAncmVmeCcsICdyZWZ5JywgJ3JlcGVhdGNvdW50JywgJ3JlcGVhdGR1cicsICdyZXN0YXJ0JywgJ3Jlc3VsdCcsICdyb3RhdGUnLCAnc2NhbGUnLCAnc2VlZCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3BlY3VsYXJjb25zdGFudCcsICdzcGVjdWxhcmV4cG9uZW50JywgJ3NwcmVhZG1ldGhvZCcsICdzdGFydG9mZnNldCcsICdzdGRkZXZpYXRpb24nLCAnc3RpdGNodGlsZXMnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlJywgJ3N0cm9rZS13aWR0aCcsICdzdHlsZScsICdzdXJmYWNlc2NhbGUnLCAnc3lzdGVtbGFuZ3VhZ2UnLCAndGFiaW5kZXgnLCAndGFyZ2V0eCcsICd0YXJnZXR5JywgJ3RyYW5zZm9ybScsICd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RleHQtYW5jaG9yJywgJ3RleHQtZGVjb3JhdGlvbicsICd0ZXh0LXJlbmRlcmluZycsICd0ZXh0bGVuZ3RoJywgJ3R5cGUnLCAndTEnLCAndTInLCAndW5pY29kZScsICd2YWx1ZXMnLCAndmlld2JveCcsICd2aXNpYmlsaXR5JywgJ3ZlcnNpb24nLCAndmVydC1hZHYteScsICd2ZXJ0LW9yaWdpbi14JywgJ3ZlcnQtb3JpZ2luLXknLCAnd2lkdGgnLCAnd29yZC1zcGFjaW5nJywgJ3dyYXAnLCAnd3JpdGluZy1tb2RlJywgJ3hjaGFubmVsc2VsZWN0b3InLCAneWNoYW5uZWxzZWxlY3RvcicsICd4JywgJ3gxJywgJ3gyJywgJ3htbG5zJywgJ3knLCAneTEnLCAneTInLCAneicsICd6b29tYW5kcGFuJ10pO1xuICBjb25zdCBtYXRoTWwgPSBmcmVlemUoWydhY2NlbnQnLCAnYWNjZW50dW5kZXInLCAnYWxpZ24nLCAnYmV2ZWxsZWQnLCAnY2xvc2UnLCAnY29sdW1uc2FsaWduJywgJ2NvbHVtbmxpbmVzJywgJ2NvbHVtbnNwYW4nLCAnZGVub21hbGlnbicsICdkZXB0aCcsICdkaXInLCAnZGlzcGxheScsICdkaXNwbGF5c3R5bGUnLCAnZW5jb2RpbmcnLCAnZmVuY2UnLCAnZnJhbWUnLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnbGFyZ2VvcCcsICdsZW5ndGgnLCAnbGluZXRoaWNrbmVzcycsICdsc3BhY2UnLCAnbHF1b3RlJywgJ21hdGhiYWNrZ3JvdW5kJywgJ21hdGhjb2xvcicsICdtYXRoc2l6ZScsICdtYXRodmFyaWFudCcsICdtYXhzaXplJywgJ21pbnNpemUnLCAnbW92YWJsZWxpbWl0cycsICdub3RhdGlvbicsICdudW1hbGlnbicsICdvcGVuJywgJ3Jvd2FsaWduJywgJ3Jvd2xpbmVzJywgJ3Jvd3NwYWNpbmcnLCAncm93c3BhbicsICdyc3BhY2UnLCAncnF1b3RlJywgJ3NjcmlwdGxldmVsJywgJ3NjcmlwdG1pbnNpemUnLCAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLCAnc2VsZWN0aW9uJywgJ3NlcGFyYXRvcicsICdzZXBhcmF0b3JzJywgJ3N0cmV0Y2h5JywgJ3N1YnNjcmlwdHNoaWZ0JywgJ3N1cHNjcmlwdHNoaWZ0JywgJ3N5bW1ldHJpYycsICd2b2Zmc2V0JywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuICBjb25zdCB4bWwgPSBmcmVlemUoWyd4bGluazpocmVmJywgJ3htbDppZCcsICd4bGluazp0aXRsZScsICd4bWw6c3BhY2UnLCAneG1sbnM6eGxpbmsnXSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG4gIGNvbnN0IE1VU1RBQ0hFX0VYUFIgPSBzZWFsKC9cXHtcXHtbXFx3XFxXXSp8W1xcd1xcV10qXFx9XFx9L2dtKTsgLy8gU3BlY2lmeSB0ZW1wbGF0ZSBkZXRlY3Rpb24gcmVnZXggZm9yIFNBRkVfRk9SX1RFTVBMQVRFUyBtb2RlXG4gIGNvbnN0IEVSQl9FWFBSID0gc2VhbCgvPCVbXFx3XFxXXSp8W1xcd1xcV10qJT4vZ20pO1xuICBjb25zdCBUTVBMSVRfRVhQUiA9IHNlYWwoL1xcJHtbXFx3XFxXXSp9L2dtKTtcbiAgY29uc3QgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IElTX0FMTE9XRURfVVJJID0gc2VhbCgvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHApOnxbXmEtel18W2EteisuXFwtXSsoPzpbXmEteisuXFwtOl18JCkpL2kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICApO1xuXG4gIGNvbnN0IElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICBjb25zdCBBVFRSX1dISVRFU1BBQ0UgPSBzZWFsKC9bXFx1MDAwMC1cXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMC1cXHUyMDI5XFx1MjA1RlxcdTMwMDBdL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICk7XG5cbiAgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuXG4gIHZhciBFWFBSRVNTSU9OUyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgTVVTVEFDSEVfRVhQUjogTVVTVEFDSEVfRVhQUixcbiAgICBFUkJfRVhQUjogRVJCX0VYUFIsXG4gICAgVE1QTElUX0VYUFI6IFRNUExJVF9FWFBSLFxuICAgIERBVEFfQVRUUjogREFUQV9BVFRSLFxuICAgIEFSSUFfQVRUUjogQVJJQV9BVFRSLFxuICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSxcbiAgICBJU19TQ1JJUFRfT1JfREFUQTogSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgQVRUUl9XSElURVNQQUNFOiBBVFRSX1dISVRFU1BBQ0UsXG4gICAgRE9DVFlQRV9OQU1FOiBET0NUWVBFX05BTUVcbiAgfSk7XG5cbiAgY29uc3QgZ2V0R2xvYmFsID0gZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3c7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBEb24ndCBleHBvcnQgdGhpcyBmdW5jdGlvbiBvdXRzaWRlIHRoaXMgbW9kdWxlIVxuICAgKiBAcGFyYW0ge1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gcHVyaWZ5SG9zdEVsZW1lbnQgVGhlIFNjcmlwdCBlbGVtZW50IHVzZWQgdG8gbG9hZCBET01QdXJpZnkgKHRvIGRldGVybWluZSBwb2xpY3kgbmFtZSBzdWZmaXgpLlxuICAgKiBAcmV0dXJuIHtUcnVzdGVkVHlwZVBvbGljeX0gVGhlIHBvbGljeSBjcmVhdGVkIChvciBudWxsLCBpZiBUcnVzdGVkIFR5cGVzXG4gICAqIGFyZSBub3Qgc3VwcG9ydGVkIG9yIGNyZWF0aW5nIHRoZSBwb2xpY3kgZmFpbGVkKS5cbiAgICovXG4gIGNvbnN0IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgcHVyaWZ5SG9zdEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIHRydXN0ZWRUeXBlcyAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxuICAgIC8vIGJ5IGFkZGluZyBhIGRhdGEtdHQtcG9saWN5LXN1ZmZpeCB0byB0aGUgc2NyaXB0IGVsZW1lbnQgd2l0aCB0aGUgRE9NUHVyaWZ5LlxuICAgIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cbiAgICBsZXQgc3VmZml4ID0gbnVsbDtcbiAgICBjb25zdCBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAocHVyaWZ5SG9zdEVsZW1lbnQgJiYgcHVyaWZ5SG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICAgIHN1ZmZpeCA9IHB1cmlmeUhvc3RFbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cbiAgICBjb25zdCBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICAgIGNyZWF0ZUhUTUwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTY3JpcHRVUkwoc2NyaXB0VXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHNjcmlwdFVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xuICAgICAgLy8gYWxyZWFkeSBydW4pLiBTa2lwIGNyZWF0aW5nIHRoZSBwb2xpY3ksIGFzIHRoaXMgd2lsbCBvbmx5IGNhdXNlIGVycm9yc1xuICAgICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIGxldCB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuICAgIGNvbnN0IERPTVB1cmlmeSA9IHJvb3QgPT4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuXG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBsYWJlbCwgZXhwb3NlZCBmb3IgZWFzaWVyIGNoZWNrc1xuICAgICAqIGlmIERPTVB1cmlmeSBpcyB1cCB0byBkYXRlIG9yIG5vdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS52ZXJzaW9uID0gJzMuMC45JztcblxuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGVsZW1lbnRzIHRoYXQgRE9NUHVyaWZ5IHJlbW92ZWQgZHVyaW5nIHNhbml0YXRpb24uXG4gICAgICogRW1wdHkgaWYgbm90aGluZyB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuICAgIGlmICghd2luZG93IHx8ICF3aW5kb3cuZG9jdW1lbnQgfHwgd2luZG93LmRvY3VtZW50Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgICAvLyBOb3QgcnVubmluZyBpbiBhIGJyb3dzZXIsIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IHlvdSBjYW4gcGFzcyB5b3VyIG93biBXaW5kb3dcbiAgICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG4gICAgbGV0IHtcbiAgICAgIGRvY3VtZW50XG4gICAgfSA9IHdpbmRvdztcbiAgICBjb25zdCBvcmlnaW5hbERvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgY3VycmVudFNjcmlwdCA9IG9yaWdpbmFsRG9jdW1lbnQuY3VycmVudFNjcmlwdDtcbiAgICBjb25zdCB7XG4gICAgICBEb2N1bWVudEZyYWdtZW50LFxuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICAgIE5vZGUsXG4gICAgICBFbGVtZW50LFxuICAgICAgTm9kZUZpbHRlcixcbiAgICAgIE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAgfHwgd2luZG93Lk1vek5hbWVkQXR0ck1hcCxcbiAgICAgIEhUTUxGb3JtRWxlbWVudCxcbiAgICAgIERPTVBhcnNlcixcbiAgICAgIHRydXN0ZWRUeXBlc1xuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IEVsZW1lbnQucHJvdG90eXBlO1xuICAgIGNvbnN0IGNsb25lTm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2xvbmVOb2RlJyk7XG4gICAgY29uc3QgZ2V0TmV4dFNpYmxpbmcgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ25leHRTaWJsaW5nJyk7XG4gICAgY29uc3QgZ2V0Q2hpbGROb2RlcyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGROb2RlcycpO1xuICAgIGNvbnN0IGdldFBhcmVudE5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ3BhcmVudE5vZGUnKTtcblxuICAgIC8vIEFzIHBlciBpc3N1ZSAjNDcsIHRoZSB3ZWItY29tcG9uZW50cyByZWdpc3RyeSBpcyBpbmhlcml0ZWQgYnkgYVxuICAgIC8vIG5ldyBkb2N1bWVudCBjcmVhdGVkIHZpYSBjcmVhdGVIVE1MRG9jdW1lbnQuIEFzIHBlciB0aGUgc3BlY1xuICAgIC8vIChodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjcmVhdGluZy1hbmQtcGFzc2luZy1yZWdpc3RyaWVzKVxuICAgIC8vIGEgbmV3IGVtcHR5IHJlZ2lzdHJ5IGlzIHVzZWQgd2hlbiBjcmVhdGluZyBhIHRlbXBsYXRlIGNvbnRlbnRzIG93bmVyXG4gICAgLy8gZG9jdW1lbnQsIHNvIHdlIHVzZSB0aGF0IGFzIG91ciBwYXJlbnQgZG9jdW1lbnQgdG8gZW5zdXJlIG5vdGhpbmdcbiAgICAvLyBpcyBpbmhlcml0ZWQuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCB0cnVzdGVkVHlwZXNQb2xpY3k7XG4gICAgbGV0IGVtcHR5SFRNTCA9ICcnO1xuICAgIGNvbnN0IHtcbiAgICAgIGltcGxlbWVudGF0aW9uLFxuICAgICAgY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgfSA9IGRvY3VtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGltcG9ydE5vZGVcbiAgICB9ID0gb3JpZ2luYWxEb2N1bWVudDtcbiAgICBsZXQgaG9va3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZW50cmllcyA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZ2V0UGFyZW50Tm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpbXBsZW1lbnRhdGlvbiAmJiBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7XG4gICAgICBNVVNUQUNIRV9FWFBSLFxuICAgICAgRVJCX0VYUFIsXG4gICAgICBUTVBMSVRfRVhQUixcbiAgICAgIERBVEFfQVRUUixcbiAgICAgIEFSSUFfQVRUUixcbiAgICAgIElTX1NDUklQVF9PUl9EQVRBLFxuICAgICAgQVRUUl9XSElURVNQQUNFXG4gICAgfSA9IEVYUFJFU1NJT05TO1xuICAgIGxldCB7XG4gICAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkkkMVxuICAgIH0gPSBFWFBSRVNTSU9OUztcblxuICAgIC8qKlxuICAgICAqIFdlIGNvbnNpZGVyIHRoZSBlbGVtZW50cyBhbmQgYXR0cmlidXRlcyBiZWxvdyB0byBiZSBzYWZlLiBJZGVhbGx5XG4gICAgICogZG9uJ3QgYWRkIGFueSBuZXcgb25lcyBidXQgZmVlbCBmcmVlIHRvIHJlbW92ZSB1bndhbnRlZCBvbmVzLlxuICAgICAqL1xuXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwkMSwgLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLm1hdGhNbCQxLCAuLi50ZXh0XSk7XG5cbiAgICAvKiBBbGxvd2VkIGF0dHJpYnV0ZSBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX0FUVFIgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9BVFRSID0gYWRkVG9TZXQoe30sIFsuLi5odG1sLCAuLi5zdmcsIC4uLm1hdGhNbCwgLi4ueG1sXSk7XG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBob3cgRE9NUFVyaWZ5IHNob3VsZCBoYW5kbGUgY3VzdG9tIGVsZW1lbnRzIGFuZCB0aGVpciBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cy5cbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSB0YWdOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGN1c3RvbSBlbGVtZW50cylcbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSBhdHRyaWJ1dGVOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGF0dHJpYnV0ZXMgbm90IG9uIHRoZSBhbGxvdyBsaXN0KVxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIGFsbG93IGN1c3RvbSBlbGVtZW50cyBkZXJpdmVkIGZyb20gYnVpbHQtaW5zIGlmIHRoZXkgcGFzcyBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2suIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAgICovXG4gICAgbGV0IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gT2JqZWN0LnNlYWwoY3JlYXRlKG51bGwsIHtcbiAgICAgIHRhZ05hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIGxldCBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIGxldCBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgc2VsZi1jbG9zaW5nIHRhZ3MgaW4gYXR0cmlidXRlcyBhcmUgYWxsb3dlZC5cbiAgICAgKiBVc3VhbGx5IHJlbW92ZWQgZHVlIHRvIGEgbVhTUyBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgbGV0IEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IHRydWU7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICBsZXQgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgbGV0IFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICBsZXQgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICBsZXQgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgbGV0IFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICBsZXQgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIGxldCBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzP1xuICAgICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBKUyB2YXJpYWJsZXMsIG1pdGlnYXRpbmcgYXR0YWNrcyB0aGF0IGFidXNlIHRoZSBIVE1ML0RPTSBzcGVjIHJ1bGVzLlxuICAgICAqXG4gICAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcbiAgICAgKiAgIC0gTmFtZWQgQWNjZXNzIG9uIFdpbmRvdyAowqc3LjMuMylcbiAgICAgKiAgIC0gRE9NIFRyZWUgQWNjZXNzb3JzICjCpzMuMS41KVxuICAgICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXG4gICAgICogICAtIElmcmFtZSBzcmNkb2MgLyBOZXN0ZWQgV2luZG93UHJveGllcyAowqc0LjguNSlcbiAgICAgKiAgIC0gSFRNTENvbGxlY3Rpb24gKMKnNC4yLjEwLjIpXG4gICAgICpcbiAgICAgKiBOYW1lc3BhY2UgaXNvbGF0aW9uIGlzIGltcGxlbWVudGVkIGJ5IHByZWZpeGluZyBgaWRgIGFuZCBgbmFtZWAgYXR0cmlidXRlc1xuICAgICAqIHdpdGggYSBjb25zdGFudCBzdHJpbmcsIGkuZS4sIGB1c2VyLWNvbnRlbnQtYFxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGZhbHNlO1xuICAgIGNvbnN0IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCA9ICd1c2VyLWNvbnRlbnQtJztcblxuICAgIC8qIEtlZXAgZWxlbWVudCBjb250ZW50IHdoZW4gcmVtb3ZpbmcgZWxlbWVudD8gKi9cbiAgICBsZXQgS0VFUF9DT05URU5UID0gdHJ1ZTtcblxuICAgIC8qIElmIGEgYE5vZGVgIGlzIHBhc3NlZCB0byBzYW5pdGl6ZSgpLCB0aGVuIHBlcmZvcm1zIHNhbml0aXphdGlvbiBpbi1wbGFjZSBpbnN0ZWFkXG4gICAgICogb2YgaW1wb3J0aW5nIGl0IGludG8gYSBuZXcgRG9jdW1lbnQgYW5kIHJldHVybmluZyBhIHNhbml0aXplZCBjb3B5ICovXG4gICAgbGV0IElOX1BMQUNFID0gZmFsc2U7XG5cbiAgICAvKiBBbGxvdyB1c2FnZSBvZiBwcm9maWxlcyBsaWtlIGh0bWwsIHN2ZyBhbmQgbWF0aE1sICovXG4gICAgbGV0IFVTRV9QUk9GSUxFUyA9IHt9O1xuXG4gICAgLyogVGFncyB0byBpZ25vcmUgY29udGVudCBvZiB3aGVuIEtFRVBfQ09OVEVOVCBpcyB0cnVlICovXG4gICAgbGV0IEZPUkJJRF9DT05URU5UUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9GT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCcsICdhdWRpbycsICdjb2xncm91cCcsICdkZXNjJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGVhZCcsICdpZnJhbWUnLCAnbWF0aCcsICdtaScsICdtbicsICdtbycsICdtcycsICdtdGV4dCcsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ25vc2NyaXB0JywgJ3BsYWludGV4dCcsICdzY3JpcHQnLCAnc3R5bGUnLCAnc3ZnJywgJ3RlbXBsYXRlJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3ZpZGVvJywgJ3htcCddKTtcblxuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICAgIGxldCBEQVRBX1VSSV9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0RBVEFfVVJJX1RBR1MgPSBhZGRUb1NldCh7fSwgWydhdWRpbycsICd2aWRlbycsICdpbWcnLCAnc291cmNlJywgJ2ltYWdlJywgJ3RyYWNrJ10pO1xuXG4gICAgLyogQXR0cmlidXRlcyBzYWZlIGZvciB2YWx1ZXMgbGlrZSBcImphdmFzY3JpcHQ6XCIgKi9cbiAgICBsZXQgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncm9sZScsICdzdW1tYXJ5JywgJ3RpdGxlJywgJ3ZhbHVlJywgJ3N0eWxlJywgJ3htbG5zJ10pO1xuICAgIGNvbnN0IE1BVEhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XG4gICAgY29uc3QgU1ZHX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgY29uc3QgSFRNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG4gICAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXG4gICAgbGV0IE5BTUVTUEFDRSA9IEhUTUxfTkFNRVNQQUNFO1xuICAgIGxldCBJU19FTVBUWV9JTlBVVCA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3dlZCBYSFRNTCtYTUwgbmFtZXNwYWNlcyAqL1xuICAgIGxldCBBTExPV0VEX05BTUVTUEFDRVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTID0gYWRkVG9TZXQoe30sIFtNQVRITUxfTkFNRVNQQUNFLCBTVkdfTkFNRVNQQUNFLCBIVE1MX05BTUVTUEFDRV0sIHN0cmluZ1RvU3RyaW5nKTtcblxuICAgIC8qIFBhcnNpbmcgb2Ygc3RyaWN0IFhIVE1MIGRvY3VtZW50cyAqL1xuICAgIGxldCBQQVJTRVJfTUVESUFfVFlQRSA9IG51bGw7XG4gICAgY29uc3QgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyA9IFsnYXBwbGljYXRpb24veGh0bWwreG1sJywgJ3RleHQvaHRtbCddO1xuICAgIGNvbnN0IERFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUgPSAndGV4dC9odG1sJztcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBudWxsO1xuXG4gICAgLyogS2VlcCBhIHJlZmVyZW5jZSB0byBjb25maWcgdG8gcGFzcyB0byBob29rcyAqL1xuICAgIGxldCBDT05GSUcgPSBudWxsO1xuXG4gICAgLyogSWRlYWxseSwgZG8gbm90IHRvdWNoIGFueXRoaW5nIGJlbG93IHRoaXMgbGluZSAqL1xuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGNvbnN0IGlzUmVnZXhPckZ1bmN0aW9uID0gZnVuY3Rpb24gaXNSZWdleE9yRnVuY3Rpb24odGVzdFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGVzdFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHRlc3RWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfcGFyc2VDb25maWcgPSBmdW5jdGlvbiBfcGFyc2VDb25maWcoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIGlmIChDT05GSUcgJiYgQ09ORklHID09PSBjZmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSB0YW1wZXJpbmcgKi9cbiAgICAgIGlmICghY2ZnIHx8IHR5cGVvZiBjZmcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNmZyA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXG4gICAgICBjZmcgPSBjbG9uZShjZmcpO1xuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTLmluZGV4T2YoY2ZnLlBBUlNFUl9NRURJQV9UWVBFKSA9PT0gLTEgPyBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogY2ZnLlBBUlNFUl9NRURJQV9UWVBFO1xuXG4gICAgICAvLyBIVE1MIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgYXJlIG5vdCBjYXNlLXNlbnNpdGl2ZSwgY29udmVydGluZyB0byBsb3dlcmNhc2UuIEtlZXBpbmcgWEhUTUwgYXMgaXMuXG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyA9IFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyA/IHN0cmluZ1RvU3RyaW5nIDogc3RyaW5nVG9Mb3dlckNhc2U7XG5cbiAgICAgIC8qIFNldCBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIEFMTE9XRURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfVEFHUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9UQUdTO1xuICAgICAgQUxMT1dFRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9BVFRSJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX0FUVFI7XG4gICAgICBBTExPV0VEX05BTUVTUEFDRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX05BTUVTUEFDRVMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9OQU1FU1BBQ0VTLCBzdHJpbmdUb1N0cmluZykgOiBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUztcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfVVJJX1NBRkVfQVRUUicpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX1VSSV9TQUZFX0FUVFIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTO1xuICAgICAgREFUQV9VUklfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9EQVRBX1VSSV9UQUdTJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfREFUQV9VUklfVEFHUyxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgICBGT1JCSURfQ09OVEVOVFMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQ09OVEVOVFMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICAgIEZPUkJJRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgRk9SQklEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XG4gICAgICBVU0VfUFJPRklMRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdVU0VfUFJPRklMRVMnKSA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSBjZmcuQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBjZmcuUkVUVVJOX1RSVVNURURfVFlQRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgRk9SQ0VfQk9EWSA9IGNmZy5GT1JDRV9CT0RZIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQU5JVElaRV9ET00gPSBjZmcuU0FOSVRJWkVfRE9NICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGNmZy5TQU5JVElaRV9OQU1FRF9QUk9QUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJDEgPSBjZmcuQUxMT1dFRF9VUklfUkVHRVhQIHx8IElTX0FMTE9XRURfVVJJO1xuICAgICAgTkFNRVNQQUNFID0gY2ZnLk5BTUVTUEFDRSB8fCBIVE1MX05BTUVTUEFDRTtcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM7XG4gICAgICB9XG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFBhcnNlIHByb2ZpbGUgaW5mbyAqL1xuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xuICAgICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgdGV4dCk7XG4gICAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLmh0bWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGh0bWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBodG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmdGaWx0ZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmdGaWx0ZXJzKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgY2ZnLkFERF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgIGlmIChGT1JCSURfQ09OVEVOVFMgPT09IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgICAgRk9SQklEX0NPTlRFTlRTID0gY2xvbmUoRk9SQklEX0NPTlRFTlRTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChGT1JCSURfQ09OVEVOVFMsIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkICN0ZXh0IGluIGNhc2UgS0VFUF9DT05URU5UIGlzIHNldCB0byB0cnVlICovXG4gICAgICBpZiAoS0VFUF9DT05URU5UKSB7XG4gICAgICAgIEFMTE9XRURfVEFHU1snI3RleHQnXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsnaHRtbCcsICdoZWFkJywgJ2JvZHknXSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCB0Ym9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSB0YWJsZXMgYXJlIHBlcm1pdHRlZCwgc2VlICMyODYsICMzNjUgKi9cbiAgICAgIGlmIChBTExPV0VEX1RBR1MudGFibGUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ3Rib2R5J10pO1xuICAgICAgICBkZWxldGUgRk9SQklEX1RBR1MudGJvZHk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZUhUTUwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlSFRNTFwiIGhvb2suJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlU2NyaXB0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZVNjcmlwdFVSTFwiIGhvb2suJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdmVyd3JpdGUgZXhpc3RpbmcgVHJ1c3RlZFR5cGVzIHBvbGljeS5cbiAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZO1xuXG4gICAgICAgIC8vIFNpZ24gbG9jYWwgdmFyaWFibGVzIHJlcXVpcmVkIGJ5IGBzYW5pdGl6ZWAuXG4gICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVuaW5pdGlhbGl6ZWQgcG9saWN5LCBhdHRlbXB0IHRvIGluaXRpYWxpemUgdGhlIGludGVybmFsIGRvbXB1cmlmeSBwb2xpY3kuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBjdXJyZW50U2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGNyZWF0aW5nIHRoZSBpbnRlcm5hbCBwb2xpY3kgc3VjY2VlZGVkIHNpZ24gaW50ZXJuYWwgdmFyaWFibGVzLlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ICE9PSBudWxsICYmIHR5cGVvZiBlbXB0eUhUTUwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAgIC8vIE5vdCBhdmFpbGFibGUgaW4gSUU4LCBTYWZhcmkgNSwgZXRjLlxuICAgICAgaWYgKGZyZWV6ZSkge1xuICAgICAgICBmcmVlemUoY2ZnKTtcbiAgICAgIH1cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuICAgIGNvbnN0IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ21pJywgJ21vJywgJ21uJywgJ21zJywgJ210ZXh0J10pO1xuICAgIGNvbnN0IEhUTUxfSU5URUdSQVRJT05fUE9JTlRTID0gYWRkVG9TZXQoe30sIFsnZm9yZWlnbm9iamVjdCcsICdkZXNjJywgJ3RpdGxlJywgJ2Fubm90YXRpb24teG1sJ10pO1xuXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBhcmUgYWxsb3dlZCBpbiBib3RoIFNWRyBhbmQgSFRNTFxuICAgIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxuICAgIC8vIHNvIHRoYXQgdGhleSBkb24ndCBnZXQgZXJyb25lb3VzbHkgZGVsZXRlZCBmcm9tXG4gICAgLy8gSFRNTCBuYW1lc3BhY2UuXG4gICAgY29uc3QgQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyA9IGFkZFRvU2V0KHt9LCBbJ3RpdGxlJywgJ3N0eWxlJywgJ2ZvbnQnLCAnYScsICdzY3JpcHQnXSk7XG5cbiAgICAvKiBLZWVwIHRyYWNrIG9mIGFsbCBwb3NzaWJsZSBTVkcgYW5kIE1hdGhNTCB0YWdzXG4gICAgICogc28gdGhhdCB3ZSBjYW4gcGVyZm9ybSB0aGUgbmFtZXNwYWNlIGNoZWNrc1xuICAgICAqIGNvcnJlY3RseS4gKi9cbiAgICBjb25zdCBBTExfU1ZHX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5zdmdEaXNhbGxvd2VkXSk7XG4gICAgY29uc3QgQUxMX01BVEhNTF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5tYXRoTWwkMSwgLi4ubWF0aE1sRGlzYWxsb3dlZF0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBhIERPTSBlbGVtZW50IHdob3NlIG5hbWVzcGFjZSBpcyBiZWluZyBjaGVja2VkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgICAqICBuYW1lc3BhY2UgdGhhdCBhIHNwZWMtY29tcGxpYW50IHBhcnNlciB3b3VsZCBuZXZlclxuICAgICAqICByZXR1cm4uIFJldHVybiB0cnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgICAvLyBJbiBKU0RPTSwgaWYgd2UncmUgaW5zaWRlIHNoYWRvdyBET00sIHRoZW4gcGFyZW50Tm9kZVxuICAgICAgLy8gY2FuIGJlIG51bGwuIFdlIGp1c3Qgc2ltdWxhdGUgcGFyZW50IGluIHRoaXMgY2FzZS5cbiAgICAgIGlmICghcGFyZW50IHx8ICFwYXJlbnQudGFnTmFtZSkge1xuICAgICAgICBwYXJlbnQgPSB7XG4gICAgICAgICAgbmFtZXNwYWNlVVJJOiBOQU1FU1BBQ0UsXG4gICAgICAgICAgdGFnTmFtZTogJ3RlbXBsYXRlJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY29uc3QgdGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKGVsZW1lbnQudGFnTmFtZSk7XG4gICAgICBjb25zdCBwYXJlbnRUYWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UocGFyZW50LnRhZ05hbWUpO1xuICAgICAgaWYgKCFBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gU1ZHXG4gICAgICAgIC8vIGlzIHZpYSA8c3ZnPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2Zyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gTWF0aE1MIHRvIFNWRyBpcyB2aWFgXG4gICAgICAgIC8vIHN2ZyBpZiBwYXJlbnQgaXMgZWl0aGVyIDxhbm5vdGF0aW9uLXhtbD4gb3IgTWF0aE1MXG4gICAgICAgIC8vIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJyAmJiAocGFyZW50VGFnTmFtZSA9PT0gJ2Fubm90YXRpb24teG1sJyB8fCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIFNWR1xuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIFNWRyBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIE1hdGhNTFxuICAgICAgICAvLyBpcyB2aWEgPG1hdGg+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIE1hdGhNTCBpcyB2aWFcbiAgICAgICAgLy8gPG1hdGg+IGFuZCBIVE1MIGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCcgJiYgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gTWF0aE1MXG4gICAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gTWF0aE1MIG5hbWVzcGFjZS5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBIVE1MIGlzIHZpYVxuICAgICAgICAvLyBIVE1MIGludGVncmF0aW9uIHBvaW50cywgYW5kIGZyb20gTWF0aE1MIHRvIEhUTUxcbiAgICAgICAgLy8gaXMgdmlhIE1hdGhNTCB0ZXh0IGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSAmJiAhSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UgJiYgIU1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGRpc2FsbG93IHRhZ3MgdGhhdCBhcmUgc3BlY2lmaWMgZm9yIE1hdGhNTFxuICAgICAgICAvLyBvciBTVkcgYW5kIHNob3VsZCBuZXZlciBhcHBlYXIgaW4gSFRNTCBuYW1lc3BhY2VcbiAgICAgICAgcmV0dXJuICFBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0gJiYgKENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFNbdGFnTmFtZV0gfHwgIUFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBYSFRNTCBhbmQgWE1MIGRvY3VtZW50cyB0aGF0IHN1cHBvcnQgY3VzdG9tIG5hbWVzcGFjZXNcbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvZGUgc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXMgcGxhY2UgKHRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgc29tZWhvdyBnb3QgbmFtZXNwYWNlIHRoYXQgaXMgbm90XG4gICAgICAvLyBIVE1MLCBTVkcsIE1hdGhNTCBvciBhbGxvd2VkIHZpYSBBTExPV0VEX05BTUVTUEFDRVMpLlxuICAgICAgLy8gUmV0dXJuIGZhbHNlIGp1c3QgaW4gY2FzZS5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2ZvcmNlUmVtb3ZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfZm9yY2VSZW1vdmUgPSBmdW5jdGlvbiBfZm9yY2VSZW1vdmUobm9kZSkge1xuICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgIGVsZW1lbnQ6IG5vZGVcbiAgICAgIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLXJlbW92ZVxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIG5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbnVsbCxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICAgIC8vIFdlIHZvaWQgYXR0cmlidXRlIHZhbHVlcyBmb3IgdW5yZW1vdmFibGUgXCJpc1wiXCIgYXR0cmlidXRlc1xuICAgICAgaWYgKG5hbWUgPT09ICdpcycgJiYgIUFMTE9XRURfQVRUUltuYW1lXSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTSB8fCBSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF9mb3JjZVJlbW92ZShub2RlKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaW5pdERvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGRpcnR5IGEgc3RyaW5nIG9mIGRpcnR5IG1hcmt1cFxuICAgICAqIEByZXR1cm4ge0RvY3VtZW50fSBhIERPTSwgZmlsbGVkIHdpdGggdGhlIGRpcnR5IG1hcmt1cFxuICAgICAqL1xuICAgIGNvbnN0IF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICBsZXQgZG9jID0gbnVsbDtcbiAgICAgIGxldCBsZWFkaW5nV2hpdGVzcGFjZSA9IG51bGw7XG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gc3RyaW5nTWF0Y2goZGlydHksIC9eW1xcclxcblxcdCBdKy8pO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXTtcbiAgICAgIH1cbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBSb290IG9mIFhIVE1MIGRvYyBtdXN0IGNvbnRhaW4geG1sbnMgZGVjbGFyYXRpb24gKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIveGh0bWwxL25vcm1hdGl2ZS5odG1sI3N0cmljdClcbiAgICAgICAgZGlydHkgPSAnPGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+PGhlYWQ+PC9oZWFkPjxib2R5PicgKyBkaXJ0eSArICc8L2JvZHk+PC9odG1sPic7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qXG4gICAgICAgKiBVc2UgdGhlIERPTVBhcnNlciBBUEkgYnkgZGVmYXVsdCwgZmFsbGJhY2sgbGF0ZXIgaWYgbmVlZHMgYmVcbiAgICAgICAqIERPTVBhcnNlciBub3Qgd29yayBmb3Igc3ZnIHdoZW4gaGFzIG11bHRpcGxlIHJvb3QgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgUEFSU0VSX01FRElBX1RZUEUpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBVc2UgY3JlYXRlSFRNTERvY3VtZW50IGluIGNhc2UgRE9NUGFyc2VyIGlzIG5vdCBhdmFpbGFibGUgKi9cbiAgICAgIGlmICghZG9jIHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGRvYyA9IGltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KE5BTUVTUEFDRSwgJ3RlbXBsYXRlJywgbnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBJU19FTVBUWV9JTlBVVCA/IGVtcHR5SFRNTCA6IGRpcnR5UGF5bG9hZDtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIC8vIFN5bnRheCBlcnJvciBpZiBkaXJ0eVBheWxvYWQgaXMgaW52YWxpZCB4bWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLCBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gV0hPTEVfRE9DVU1FTlQgPyBkb2MuZG9jdW1lbnRFbGVtZW50IDogYm9keTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE5vZGVJdGVyYXRvciBvYmplY3QgdGhhdCB5b3UgY2FuIHVzZSB0byB0cmF2ZXJzZSBmaWx0ZXJlZCBsaXN0cyBvZiBub2RlcyBvciBlbGVtZW50cyBpbiBhIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IG9yIG5vZGUgdG8gc3RhcnQgdHJhdmVyc2luZyBvbi5cbiAgICAgKiBAcmV0dXJuIHtOb2RlSXRlcmF0b3J9IFRoZSBjcmVhdGVkIE5vZGVJdGVyYXRvclxuICAgICAqL1xuICAgIGNvbnN0IF9jcmVhdGVOb2RlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChyb290Lm93bmVyRG9jdW1lbnQgfHwgcm9vdCwgcm9vdCxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNDbG9iYmVyZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGVsbSBlbGVtZW50IHRvIGNoZWNrIGZvciBjbG9iYmVyaW5nIGF0dGFja3NcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Nsb2JiZXJlZCA9IGZ1bmN0aW9uIF9pc0Nsb2JiZXJlZChlbG0pIHtcbiAgICAgIHJldHVybiBlbG0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgJiYgKHR5cGVvZiBlbG0ubm9kZU5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQ2hpbGQgIT09ICdmdW5jdGlvbicgfHwgIShlbG0uYXR0cmlidXRlcyBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCkgfHwgdHlwZW9mIGVsbS5yZW1vdmVBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5zZXRBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5uYW1lc3BhY2VVUkkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0uaW5zZXJ0QmVmb3JlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uaGFzQ2hpbGROb2RlcyAhPT0gJ2Z1bmN0aW9uJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBET00gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG9iamVjdCBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2lzTm9kZSA9IGZ1bmN0aW9uIF9pc05vZGUob2JqZWN0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIE5vZGUgPT09ICdmdW5jdGlvbicgJiYgb2JqZWN0IGluc3RhbmNlb2YgTm9kZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2V4ZWN1dGVIb29rXG4gICAgICogRXhlY3V0ZSB1c2VyIGNvbmZpZ3VyYWJsZSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSBub2RlIHRvIHdvcmsgb24gd2l0aCB0aGUgaG9va1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGhvb2sgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGNvbnN0IF9leGVjdXRlSG9vayA9IGZ1bmN0aW9uIF9leGVjdXRlSG9vayhlbnRyeVBvaW50LCBjdXJyZW50Tm9kZSwgZGF0YSkge1xuICAgICAgaWYgKCFob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcnJheUZvckVhY2goaG9va3NbZW50cnlQb2ludF0sIGhvb2sgPT4ge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSB7XG4gICAgICBsZXQgY29udGVudCA9IG51bGw7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBOb3cgbGV0J3MgY2hlY2sgdGhlIGVsZW1lbnQncyB0eXBlIGFuZCBuYW1lICovXG4gICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG4gICAgICBpZiAoY3VycmVudE5vZGUuaGFzQ2hpbGROb2RlcygpICYmICFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBlbGVtZW50IGlmIGFueXRoaW5nIGZvcmJpZHMgaXRzIHByZXNlbmNlICovXG4gICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGEgY3VzdG9tIGVsZW1lbnQgdG8gaGFuZGxlICovXG4gICAgICAgIGlmICghRk9SQklEX1RBR1NbdGFnTmFtZV0gJiYgX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpKSB7XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh0YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEtlZXAgY29udGVudCBleGNlcHQgZm9yIGJhZC1saXN0ZWQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKEtFRVBfQ09OVEVOVCAmJiAhRk9SQklEX0NPTlRFTlRTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IGdldENoaWxkTm9kZXMoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICAgICAgaWYgKGNoaWxkTm9kZXMgJiYgcGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb3VudCA9IGNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNoaWxkQ291bnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUoY2hpbGROb2Rlc1tpXSwgdHJ1ZSksIGdldE5leHRTaWJsaW5nKGN1cnJlbnROb2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3aGV0aGVyIGVsZW1lbnQgaGFzIGEgdmFsaWQgbmFtZXNwYWNlICovXG4gICAgICBpZiAoY3VycmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmICFfY2hlY2tWYWxpZE5hbWVzcGFjZShjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE1ha2Ugc3VyZSB0aGF0IG9sZGVyIGJyb3dzZXJzIGRvbid0IGdldCBmYWxsYmFjay10YWcgbVhTUyAqL1xuICAgICAgaWYgKCh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8IHRhZ05hbWUgPT09ICdub2VtYmVkJyB8fCB0YWdOYW1lID09PSAnbm9mcmFtZXMnKSAmJiByZWdFeHBUZXN0KC88XFwvbm8oc2NyaXB0fGVtYmVkfGZyYW1lcykvaSwgY3VycmVudE5vZGUuaW5uZXJIVE1MKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZWxlbWVudCBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLyogR2V0IHRoZSBlbGVtZW50J3MgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBleHByLCAnICcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnRleHRDb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgICBlbGVtZW50OiBjdXJyZW50Tm9kZS5jbG9uZU5vZGUoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnJlbnROb2RlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIGNvbnN0IF9pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpIHtcbiAgICAgIC8qIE1ha2Ugc3VyZSBhdHRyaWJ1dGUgY2Fubm90IGNsb2JiZXIgKi9cbiAgICAgIGlmIChTQU5JVElaRV9ET00gJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykgJiYgKHZhbHVlIGluIGRvY3VtZW50IHx8IHZhbHVlIGluIGZvcm1FbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcbiAgICAgICAgICBYTUwtY29tcGF0aWJsZSAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN4bWwtY29tcGF0aWJsZSBhbmQgaHR0cDovL3d3dy53My5vcmcvVFIveG1sLyNkMGU4MDQpXG4gICAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuICAgICAgaWYgKEFMTE9XX0RBVEFfQVRUUiAmJiAhRk9SQklEX0FUVFJbbGNOYW1lXSAmJiByZWdFeHBUZXN0KERBVEFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoIUFMTE9XRURfQVRUUltsY05hbWVdIHx8IEZPUkJJRF9BVFRSW2xjTmFtZV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBGaXJzdCBjb25kaXRpb24gZG9lcyBhIHZlcnkgYmFzaWMgY2hlY2sgaWYgYSkgaXQncyBiYXNpY2FsbHkgYSB2YWxpZCBjdXN0b20gZWxlbWVudCB0YWduYW1lIEFORFxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAvLyBhbmQgYykgaWYgdGhlIGF0dHJpYnV0ZSBuYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrXG4gICAgICAgIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudChsY1RhZykgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgbGNUYWcpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayhsY1RhZykpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2ssIGxjTmFtZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKGxjTmFtZSkpIHx8XG4gICAgICAgIC8vIEFsdGVybmF0aXZlLCBzZWNvbmQgY29uZGl0aW9uIGNoZWNrcyBpZiBpdCdzIGFuIGBpc2AtYXR0cmlidXRlLCBBTkRcbiAgICAgICAgLy8gdGhlIHZhbHVlIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIGxjTmFtZSA9PT0gJ2lzJyAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdmFsdWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh2YWx1ZSkpKSA7IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBDaGVjayB2YWx1ZSBpcyBzYWZlLiBGaXJzdCwgaXMgYXR0ciBpbmVydD8gSWYgc28sIGlzIHNhZmUgKi9cbiAgICAgIH0gZWxzZSBpZiAoVVJJX1NBRkVfQVRUUklCVVRFU1tsY05hbWVdKSA7IGVsc2UgaWYgKHJlZ0V4cFRlc3QoSVNfQUxMT1dFRF9VUkkkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpKSA7IGVsc2UgaWYgKChsY05hbWUgPT09ICdzcmMnIHx8IGxjTmFtZSA9PT0gJ3hsaW5rOmhyZWYnIHx8IGxjTmFtZSA9PT0gJ2hyZWYnKSAmJiBsY1RhZyAhPT0gJ3NjcmlwdCcgJiYgc3RyaW5nSW5kZXhPZih2YWx1ZSwgJ2RhdGE6JykgPT09IDAgJiYgREFUQV9VUklfVEFHU1tsY1RhZ10pIDsgZWxzZSBpZiAoQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgJiYgIXJlZ0V4cFRlc3QoSVNfU0NSSVBUX09SX0RBVEEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudFxuICAgICAqIGNoZWNrcyBpZiBhdCBsZWFzdCBvbmUgZGFzaCBpcyBpbmNsdWRlZCBpbiB0YWdOYW1lLCBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGNoYXJcbiAgICAgKiBmb3IgbW9yZSBzb3BoaXN0aWNhdGVkIGNoZWNraW5nIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3ZhbGlkYXRlLWVsZW1lbnQtbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgbmFtZSBvZiB0aGUgdGFnIG9mIHRoZSBub2RlIHRvIHNhbml0aXplXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIG5hbWUgbWVldHMgdGhlIGJhc2ljIGNyaXRlcmlhIGZvciBhIGN1c3RvbSBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgY29uc3QgX2lzQmFzaWNDdXN0b21FbGVtZW50ID0gZnVuY3Rpb24gX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiB0YWdOYW1lICE9PSAnYW5ub3RhdGlvbi14bWwnICYmIHRhZ05hbWUuaW5kZXhPZignLScpID4gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXR0cmlidXRlc1xuICAgICAgfSA9IGN1cnJlbnROb2RlO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG4gICAgICBpZiAoIWF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaG9va0V2ZW50ID0ge1xuICAgICAgICBhdHRyTmFtZTogJycsXG4gICAgICAgIGF0dHJWYWx1ZTogJycsXG4gICAgICAgIGtlZXBBdHRyOiB0cnVlLFxuICAgICAgICBhbGxvd2VkQXR0cmlidXRlczogQUxMT1dFRF9BVFRSXG4gICAgICB9O1xuICAgICAgbGV0IGwgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcblxuICAgICAgLyogR28gYmFja3dhcmRzIG92ZXIgYWxsIGF0dHJpYnV0ZXM7IHNhZmVseSByZW1vdmUgYmFkIG9uZXMgKi9cbiAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIG5hbWVzcGFjZVVSSSxcbiAgICAgICAgICB2YWx1ZTogYXR0clZhbHVlXG4gICAgICAgIH0gPSBhdHRyO1xuICAgICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhuYW1lKTtcbiAgICAgICAgbGV0IHZhbHVlID0gbmFtZSA9PT0gJ3ZhbHVlJyA/IGF0dHJWYWx1ZSA6IHN0cmluZ1RyaW0oYXR0clZhbHVlKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmICghQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICYmIHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSBhdHRyaWJ1dGUgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBleHByLCAnICcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSXMgYHZhbHVlYCB2YWxpZCBmb3IgdGhpcyBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGNvbnN0IGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuICAgICAgICBpZiAoIV9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICAgKiBQcmVmaXggaWQgYW5kIG5hbWUgYXR0cmlidXRlcyB3aXRoIGB1c2VyLWNvbnRlbnQtYFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKFNBTklUSVpFX05BTUVEX1BST1BTICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGlzIHZhbHVlXG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAvLyBQcmVmaXggdGhlIHZhbHVlIGFuZCBsYXRlciByZS1jcmVhdGUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW5pdGl6ZWQgdmFsdWVcbiAgICAgICAgICB2YWx1ZSA9IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCArIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlIFRydXN0ZWQgVHlwZXMgKi9cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSA7IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZShsY1RhZywgbGNOYW1lKSkge1xuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkSFRNTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRTY3JpcHRVUkwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZVNjcmlwdFVSTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGludmFsaWQgZGF0YS0qIGF0dHJpYnV0ZSBzZXQgYnkgdHJ5LWNhdGNoaW5nIGl0ICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIEZhbGxiYWNrIHRvIHNldEF0dHJpYnV0ZSgpIGZvciBicm93c2VyLXVucmVjb2duaXplZCBuYW1lc3BhY2VzIGUuZy4gXCJ4LXNjaGVtYVwiLiAqL1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZVNoYWRvd0RPTSA9IGZ1bmN0aW9uIF9zYW5pdGl6ZVNoYWRvd0RPTShmcmFnbWVudCkge1xuICAgICAgbGV0IHNoYWRvd05vZGUgPSBudWxsO1xuICAgICAgY29uc3Qgc2hhZG93SXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICAgIHdoaWxlIChzaGFkb3dOb2RlID0gc2hhZG93SXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplU2hhZG93Tm9kZScsIHNoYWRvd05vZGUsIG51bGwpO1xuXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhzaGFkb3dOb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRGVlcCBzaGFkb3cgRE9NIGRldGVjdGVkICovXG4gICAgICAgIGlmIChzaGFkb3dOb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKHNoYWRvd05vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhzaGFkb3dOb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTYW5pdGl6ZVxuICAgICAqIFB1YmxpYyBtZXRob2QgcHJvdmlkaW5nIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlfSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5KSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGxldCBib2R5ID0gbnVsbDtcbiAgICAgIGxldCBpbXBvcnRlZE5vZGUgPSBudWxsO1xuICAgICAgbGV0IGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgIGxldCByZXR1cm5Ob2RlID0gbnVsbDtcbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXG4gICAgICAgIHRoZSB1c2VyIGhhcyByZXF1ZXN0ZWQgYSBET00gb2JqZWN0IHJhdGhlciB0aGFuIGEgc3RyaW5nICovXG4gICAgICBJU19FTVBUWV9JTlBVVCA9ICFkaXJ0eTtcbiAgICAgIGlmIChJU19FTVBUWV9JTlBVVCkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGlydHkgPSBkaXJ0eS50b1N0cmluZygpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ2RpcnR5IGlzIG5vdCBhIHN0cmluZywgYWJvcnRpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCd0b1N0cmluZyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBkaXJ0eSBIVE1MIGlmIERPTVB1cmlmeSBjYW5ub3QgcnVuICovXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFzc2lnbiBjb25maWcgdmFycyAqL1xuICAgICAgaWYgKCFTRVRfQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgfVxuXG4gICAgICAvKiBDbGVhbiB1cCByZW1vdmVkIGVsZW1lbnRzICovXG4gICAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gICAgICAvKiBDaGVjayBpZiBkaXJ0eSBpcyBjb3JyZWN0bHkgdHlwZWQgZm9yIElOX1BMQUNFICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIC8qIERvIHNvbWUgZWFybHkgcHJlLXNhbml0aXphdGlvbiB0byBhdm9pZCB1bnNhZmUgcm9vdCBub2RlcyAqL1xuICAgICAgICBpZiAoZGlydHkubm9kZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZGlydHkubm9kZU5hbWUpO1xuICAgICAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3Jvb3Qgbm9kZSBpcyBmb3JiaWRkZW4gYW5kIGNhbm5vdCBiZSBzYW5pdGl6ZWQgaW4tcGxhY2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlydHkgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxuICAgICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KCc8IS0tLS0+Jyk7XG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgIC8qIE5vZGUgaXMgYWxyZWFkeSBhIGJvZHksIHVzZSBhcyBpcyAqL1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogUkVUVVJOX1RSVVNURURfVFlQRSA/IGVtcHR5SFRNTCA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgY29uc3Qgbm9kZUl0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2hhZG93IERPTSBkZXRlY3RlZCwgc2FuaXRpemUgaXQgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKGN1cnJlbnROb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoY3VycmVudE5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBJZiB3ZSBzYW5pdGl6ZWQgYGRpcnR5YCBpbi1wbGFjZSwgcmV0dXJuIGl0LiAqL1xuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIHNhbml0aXplZCBzdHJpbmcgb3IgRE9NICovXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBjcmVhdGVEb2N1bWVudEZyYWdtZW50LmNhbGwoYm9keS5vd25lckRvY3VtZW50KTtcbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgICByZXR1cm5Ob2RlLmFwcGVuZENoaWxkKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIuc2hhZG93cm9vdCB8fCBBTExPV0VEX0FUVFIuc2hhZG93cm9vdG1vZGUpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybk5vZGU7XG4gICAgICB9XG4gICAgICBsZXQgc2VyaWFsaXplZEhUTUwgPSBXSE9MRV9ET0NVTUVOVCA/IGJvZHkub3V0ZXJIVE1MIDogYm9keS5pbm5lckhUTUw7XG5cbiAgICAgIC8qIFNlcmlhbGl6ZSBkb2N0eXBlIGlmIGFsbG93ZWQgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCAmJiBBTExPV0VEX1RBR1NbJyFkb2N0eXBlJ10gJiYgYm9keS5vd25lckRvY3VtZW50ICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgJiYgcmVnRXhwVGVzdChET0NUWVBFX05BTUUsIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gJzwhRE9DVFlQRSAnICsgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSArICc+XFxuJyArIHNlcmlhbGl6ZWRIVE1MO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChzZXJpYWxpemVkSFRNTCkgOiBzZXJpYWxpemVkSFRNTDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBzZXQgdGhlIGNvbmZpZ3VyYXRpb24gb25jZVxuICAgICAqIHNldENvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS5zZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XG4gICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZEhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGFkZCBET01QdXJpZnkgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rRnVuY3Rpb24gZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5hZGRIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQsIGhvb2tGdW5jdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBob29rRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmVtb3ZlZChwb3BwZWQpIGhvb2tcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9va3MgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2tzID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICBob29rc1tlbnRyeVBvaW50XSA9IFtdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVBbGxIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3NcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IHt9O1xuICAgIH07XG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuICB2YXIgcHVyaWZ5ID0gY3JlYXRlRE9NUHVyaWZ5KCk7XG5cbiAgcmV0dXJuIHB1cmlmeTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVyaWZ5LmpzLm1hcFxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zLmpzJztcclxuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2RlZmF1bHRDb21tYW5kcy5qcyc7XHJcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuL3BsdWdpbk1hbmFnZXInO1xyXG5pbXBvcnQgeyBSYW5nZUhlbHBlciB9IGZyb20gJy4vcmFuZ2VIZWxwZXInO1xyXG5pbXBvcnQgdGVtcGxhdGVzIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2Jyb3dzZXIuanMnO1xyXG5pbXBvcnQgKiBhcyBlbW90aWNvbnMgZnJvbSAnLi9lbW90aWNvbnMuanMnO1xyXG5pbXBvcnQgRE9NUHVyaWZ5IGZyb20gJ2RvbXB1cmlmeSc7XHJcblxyXG52YXIgZ2xvYmFsV2luID0gd2luZG93O1xyXG52YXIgZ2xvYmFsRG9jID0gZG9jdW1lbnQ7XHJcblxyXG52YXIgSU1BR0VfTUlNRV9SRUdFWCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblxyXG4vKipcclxuICogV3JhcCBpbmxpbmVzIHRoYXQgYXJlIGluIHRoZSByb290IGluIHBhcmFncmFwaHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcElubGluZXMoYm9keTogSFRNTEJvZHlFbGVtZW50LCBkb2M6IERvY3VtZW50KSB7XHJcblx0bGV0IHdyYXBwZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRkb20udHJhdmVyc2UoYm9keSwgZnVuY3Rpb24gKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRpZiAoZG9tLmlzSW5saW5lKG5vZGUsIHRydWUpKSB7XHJcblx0XHRcdC8vIElnbm9yZSB0ZXh0IG5vZGVzIHVubGVzcyB0aGV5IGNvbnRhaW4gbm9uLXdoaXRlc3BhY2UgY2hhcnMgYXNcclxuXHRcdFx0Ly8gd2hpdGVzcGFjZSB3aWxsIGJlIGNvbGxhcHNlZC5cclxuXHRcdFx0Ly8gSWdub3JlIGVtbGVkaXRvci1pZ25vcmUgZWxlbWVudHMgdW5sZXNzIHdyYXBwaW5nIHNpYmxpbmdzXHJcblx0XHRcdC8vIFNob3VsZCBzdGlsbCB3cmFwIGJvdGggaWYgd3JhcHBpbmcgc2libGluZ3MuXHJcblx0XHRcdGlmICh3cmFwcGVyIHx8IG5vZGUubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgP1xyXG5cdFx0XHRcdC9cXFMvLnRlc3Qobm9kZS5ub2RlVmFsdWUpIDogIWRvbS5pcyhub2RlLCAnLmVtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdGlmICghd3JhcHBlcikge1xyXG5cdFx0XHRcdFx0d3JhcHBlciA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XHJcblx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIG5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHdyYXBwZXIsIG5vZGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR3cmFwcGVyID0gbnVsbDtcclxuXHRcdH1cclxuXHR9LCBmYWxzZSwgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFbWxFZGl0b3IgLSBBIGxpZ2h0d2VpZ2h0IFdZU0lXWUcgZWRpdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTFRleHRBcmVhRWxlbWVudH0gdGV4dGFyZWEgVGhlIHRleHRhcmVhIHRvIGJlIGNvbnZlcnRlZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gdXNlck9wdGlvbnNcclxuICogQGNsYXNzIEVtbEVkaXRvclxyXG4gKiBAbmFtZSBFbWxFZGl0b3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtbEVkaXRvciB7XHJcblxyXG5cdGNvbW1hbmRzOiBhbnk7XHJcblx0b3B0czogYW55O1xyXG5cdHRvZ2dsZVNvdXJjZU1vZGU6ICgpID0+IHZvaWQ7XHJcblx0bG9uZ2VzdEVtb3RpY29uQ29kZTogbnVtYmVyO1xyXG5cdGluU291cmNlTW9kZTogKCkgPT4gYm9vbGVhbjtcclxuXHRibHVyOiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0c2V0V3lzaXd5Z0VkaXRvclZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuXHRzZXRTb3VyY2VFZGl0b3JWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcblx0dXBkYXRlT3JpZ2luYWw6ICgpID0+IHZvaWQ7XHJcblx0Z2V0U291cmNlRWRpdG9yVmFsdWU6IChmaWx0ZXI6IGJvb2xlYW4pID0+IHN0cmluZztcclxuXHRkaW1lbnNpb25zOiAod2lkdGg/OiBhbnksIGhlaWdodD86IGFueSwgc2F2ZT86IGJvb2xlYW4pID0+IGFueTtcclxuXHRyZWFkT25seTogKHJlYWRPbmx5PzogYW55KSA9PiBhbnk7XHJcblx0Zm9jdXM6IChoYW5kbGVyPzogYW55LCBleGNsdWRlV3lzaXd5Zz86IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0dmFsOiAodmFsPzogc3RyaW5nLCBmaWx0ZXI/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0ZXhwYW5kVG9Db250ZW50OiAoaWdub3JlTWF4SGVpZ2h0OiBib29sZWFuKSA9PiB2b2lkO1xyXG5cdHJ0bDogKHJ0bD86IGJvb2xlYW4pID0+IGFueTtcclxuXHRlbW90aWNvbnM6IChlbmFibGU6IGJvb2xlYW4pID0+IGFueTtcclxuXHRzb3VyY2VNb2RlOiAoZW5hYmxlPzogYm9vbGVhbikgPT4gYW55O1xyXG5cdHdpZHRoOiAod2lkdGg6IG51bWJlciwgc2F2ZVdpZHRoOiBib29sZWFuKSA9PiBhbnk7XHJcblx0aGVpZ2h0OiAoaGVpZ2h0OiBudW1iZXIsIHNhdmVIZWlnaHQ6IGJvb2xlYW4pID0+IGFueTtcclxuXHRjcmVhdGVEcm9wRG93bjogKG1lbnVJdGVtOiBIVE1MRWxlbWVudCwgbmFtZTogc3RyaW5nLCBjb250ZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcclxuXHRtYXhpbWl6ZTogKG1heGltaXplOiBib29sZWFuKSA9PiBhbnk7XHJcblx0ZGVzdHJveTogKCkgPT4gdm9pZDtcclxuXHRjbG9zZURyb3BEb3duOiAoZm9jdXM/OiBib29sZWFuKSA9PiB2b2lkO1xyXG5cdHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sOiAoaHRtbDogc3RyaW5nLCBlbmRIdG1sOiBzdHJpbmcsIG92ZXJyaWRlQ29kZUJsb2NraW5nOiBib29sZWFuKSA9PiB2b2lkO1xyXG5cdHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0OiAodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpID0+IHZvaWQ7XHJcblx0aW5zZXJ0VGV4dDogKHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKSA9PiBhbnk7XHJcblx0c291cmNlRWRpdG9ySW5zZXJ0VGV4dDogKHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKSA9PiB2b2lkO1xyXG5cdGdldFJhbmdlSGVscGVyOiAoKSA9PiBSYW5nZUhlbHBlcjtcclxuXHRzb3VyY2VFZGl0b3JDYXJldDogKHBvc2l0aW9uOiBhbnkpID0+IGFueTtcclxuXHRpbnNlcnQ6IChzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZywgZmlsdGVyOiBib29sZWFuLCBjb252ZXJ0RW1vdGljb25zOiBib29sZWFuLCBhbGxvd01peGVkOiBib29sZWFuKSA9PiBhbnk7XHJcblx0Z2V0V3lzaXd5Z0VkaXRvclZhbHVlOiAoZmlsdGVyOiBib29sZWFuKSA9PiBzdHJpbmc7XHJcblx0Z2V0Qm9keTogKCkgPT4gSFRNTEJvZHlFbGVtZW50O1xyXG5cdGdldENvbnRlbnRBcmVhQ29udGFpbmVyOiAoKSA9PiBIVE1MRWxlbWVudDtcclxuXHRleGVjQ29tbWFuZDogKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IHN0cmluZyB8IGJvb2xlYW4pID0+IHZvaWQ7XHJcblx0Y3VycmVudE5vZGU6ICgpID0+IGFueTtcclxuXHRjdXJyZW50QmxvY2tOb2RlOiAoKSA9PiBhbnk7XHJcblx0YmluZDogKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pID0+IGFueTtcclxuXHR1bmJpbmQ6IChldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0a2V5RG93bjogKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbikgPT4gYW55O1xyXG5cdGtleVByZXNzOiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0a2V5VXA6IChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pID0+IGFueTtcclxuXHRub2RlQ2hhbmdlZDogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnk7XHJcblx0c2VsZWN0aW9uQ2hhbmdlZDogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnk7XHJcblx0dmFsdWVDaGFuZ2VkOiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0Y3NzOiAoY3NzOiBzdHJpbmcpID0+IGFueTtcclxuXHRyZW1vdmVTaG9ydGN1dDogKHNob3J0Y3V0OiBzdHJpbmcpID0+IGFueTtcclxuXHRlbW90aWNvbnNDYWNoZTogYW55O1xyXG5cdGFkZFNob3J0Y3V0OiAoc2hvcnRjdXQ6IHN0cmluZywgY21kOiBzdHJpbmcgfCBGdW5jdGlvbikgPT4gYW55O1xyXG5cdGNsZWFyQmxvY2tGb3JtYXR0aW5nOiAoYmxvY2s6IEhUTUxFbGVtZW50KSA9PiBhbnk7XHJcblxyXG5cdF86ICgpID0+IHN0cmluZztcclxuXHJcblx0Ly8gU3RhdGljXHJcblx0c3RhdGljIGxvY2FsZTogYW55ID0ge307XHJcblx0c3RhdGljIGZvcm1hdHM6IGFueSA9IHt9O1xyXG5cdHN0YXRpYyBpY29uczogYW55ID0ge307XHJcblx0c3RhdGljIGNvbW1hbmQ6IGFueSA9IHt9O1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih0ZXh0YXJlYTogYW55LCB1c2VyT3B0aW9uczogYW55KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFZGl0b3IgZm9ybWF0IGxpa2UgQkJDb2RlIG9yIEhUTUxcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGZvcm1hdDogYW55O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGRpdiB3aGljaCBjb250YWlucyB0aGUgZWRpdG9yIGFuZCB0b29sYmFyXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGVkaXRvckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBNYXAgb2YgZXZlbnRzIGhhbmRsZXJzIGJvdW5kIHRvIHRoaXMgaW5zdGFuY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBldmVudEhhbmRsZXJzOiBhbnkgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZGl0b3JzIHRvb2xiYXJcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgdG9vbGJhcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyBpZnJhbWUgd2hpY2ggc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHd5c2l3eWdFZGl0b3I6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGVkaXRvcnMgd2luZG93XHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1dpbmRvd31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCB3eXNpd3lnV2luZG93OiBXaW5kb3c7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGJvZHkgZWxlbWVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MQm9keUVsZW1lbnR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgd3lzaXd5Z0JvZHk6IEhUTUxCb2R5RWxlbWVudDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBXWVNJV1lHIGVkaXRvcnMgZG9jdW1lbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7RG9jdW1lbnR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgd3lzaXd5Z0RvY3VtZW50OiBEb2N1bWVudDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZGl0b3JzIHRleHRhcmVhIGZvciB2aWV3aW5nIHNvdXJjZVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MVGV4dEFyZWFFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHNvdXJjZUVkaXRvcjogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjdXJyZW50IGRyb3Bkb3duXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGRyb3Bkb3duOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIElmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBjb21wb3NpbmcgdGV4dCB2aWEgSU1FXHJcblx0XHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHRcdCAqL1xyXG5cdFx0bGV0IGlzQ29tcG9zaW5nOiBib29sZWFuO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGltZXIgZm9yIHZhbHVlQ2hhbmdlZCBrZXkgaGFuZGxlclxyXG5cdFx0ICogQHR5cGUge251bWJlcn1cclxuXHRcdCAqL1xyXG5cdFx0bGV0IHZhbHVlQ2hhbmdlZEtleVVwVGltZXI6IGFueTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZGl0b3JzIGxvY2FsZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBsb2NhbGU6IGFueTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFN0b3JlcyBhIGNhY2hlIG9mIHByZWxvYWRlZCBpbWFnZXNcclxuXHRcdCAqXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHR5cGUge0FycmF5LjxIVE1MSW1hZ2VFbGVtZW50Pn1cclxuXHRcdCAqL1xyXG5cdFx0bGV0IHByZUxvYWRDYWNoZTogYW55ID0gQXJyYXk8SFRNTEltYWdlRWxlbWVudD47XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyByYW5nZUhlbHBlciBpbnN0YW5jZVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtSYW5nZUhlbHBlcn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCByYW5nZUhlbHBlcjogUmFuZ2VIZWxwZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbiBhcnJheSBvZiBidXR0b24gc3RhdGUgaGFuZGxlcnNcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7QXJyYXkuPE9iamVjdD59XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgYnRuU3RhdGVIYW5kbGVyczogYW55ID0gW107XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBQbHVnaW4gbWFuYWdlciBpbnN0YW5jZVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtQbHVnaW5NYW5hZ2VyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtOb2RlfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGN1cnJlbnROb2RlOiBOb2RlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgY3VycmVudCBub2RlXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge25vZGV9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgY3VycmVudEJsb2NrTm9kZTogSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgY3VycmVudCBub2RlIHNlbGVjdGlvbi9jYXJldFxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgY3VycmVudFNlbGVjdGlvbjogYW55O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVXNlZCB0byBtYWtlIHN1cmUgb25seSAxIHNlbGVjdGlvbiBjaGFuZ2VkXHJcblx0XHQgKiBjaGVjayBpcyBjYWxsZWQgZXZlcnkgMTAwbXMuXHJcblx0XHQgKlxyXG5cdFx0ICogSGVscHMgaW1wcm92ZSBwZXJmb3JtYW5jZSBhcyBpdCBpcyBjaGVja2VkIGEgbG90LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nOiBib29sZWFuO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSWYgY29udGVudCBpcyByZXF1aXJlZCAoZXF1aXZhbGVudCB0byB0aGUgSFRNTDUgcmVxdWlyZWQgYXR0cmlidXRlKVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IGlzUmVxdWlyZWQ6IGJvb2xlYW47XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgaW5saW5lIENTUyBzdHlsZSBlbGVtZW50LiBXaWxsIGJlIHVuZGVmaW5lZFxyXG5cdFx0ICogdW50aWwgY3NzKCkgaXMgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7SFRNTFN0eWxlRWxlbWVudH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBpbmxpbmVDc3M6IEhUTUxTdHlsZUVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBPYmplY3QgY29udGFpbmluZyBhIGxpc3Qgb2Ygc2hvcnRjdXQgaGFuZGxlcnNcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHNob3J0Y3V0SGFuZGxlcnM6IGFueSA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG1pbiBhbmQgbWF4IGhlaWdodHMgdGhhdCBhdXRvRXhwYW5kIHNob3VsZCBzdGF5IHdpdGhpblxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgYXV0b0V4cGFuZEJvdW5kczogYW55O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGltZW91dCBmb3IgdGhlIGF1dG9FeHBhbmQgZnVuY3Rpb24gdG8gdGhyb3R0bGUgY2FsbHNcclxuXHRcdCAqXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgYXV0b0V4cGFuZFRocm90dGxlOiBhbnk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDYWNoZSBvZiB0aGUgY3VycmVudCB0b29sYmFyIGJ1dHRvbnNcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IHRvb2xiYXJCdXR0b25zOiBhbnkgPSBbXTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIExhc3Qgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSBtYXhpbWl6aW5nIHNvXHJcblx0XHQgKiBpdCBjYW4gYmUgcmVzdG9yZWQgd2hlbiBmaW5pc2hlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0bGV0IG1heGltaXplU2Nyb2xsUG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFN0b3JlcyB0aGUgY29udGVudHMgd2hpbGUgYSBwYXN0ZSBpcyB0YWtpbmcgcGxhY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogTmVlZGVkIHRvIHN1cHBvcnQgYnJvd3NlcnMgdGhhdCBsYWNrIGNsaXBib2FyZCBBUEkgc3VwcG9ydC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7P0RvY3VtZW50RnJhZ21lbnR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgcGFzdGVDb250ZW50RnJhZ21lbnQ6IGFueTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFsbCB0aGUgZW1vdGljb25zIGZyb20gZHJvcGRvd24sIG1vcmUgYW5kIGhpZGRlbiBjb21iaW5lZFxyXG5cdFx0ICogYW5kIHdpdGggdGhlIGVtb3RpY29ucyByb290IHNldFxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHshT2JqZWN0PHN0cmluZywgc3RyaW5nPn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBhbGxFbW90aWNvbnM6IGFueSA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3VycmVudCBpY29uIHNldCBpZiBhbnlcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7P09iamVjdH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCBpY29uczogYW55IHwgbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFByaXZhdGUgZnVuY3Rpb25zXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgaW5pdDogYW55LCByZXBsYWNlRW1vdGljb25zOiBhbnksIGhhbmRsZUNvbW1hbmQ6IGFueSwgaW5pdEVkaXRvcjogYW55LCBpbml0RXZlbnRzOiBhbnksIGluaXRMb2NhbGU6IGFueSwgaW5pdFRvb2xCYXI6IGFueSwgaW5pdE9wdGlvbnM6IGFueSwgaW5pdFJlc2l6ZTogYW55LCBpbml0RW1vdGljb25zOiBhbnk7XHJcblx0XHRsZXQgaGFuZGxlUGFzdGVFdnQ6IGFueSwgaGFuZGxlQ3V0Q29weUV2dDogYW55LCBoYW5kbGVQYXN0ZURhdGE6IGFueSwgaGFuZGxlS2V5RG93bjogYW55LCBoYW5kbGVCYWNrU3BhY2U6IGFueSwgaGFuZGxlS2V5UHJlc3M6IGFueSwgaGFuZGxlRm9ybVJlc2V0OiBhbnksIGhhbmRsZU1vdXNlRG93bjogYW55LCBoYW5kbGVDb21wb3NpdGlvbjogYW55O1xyXG5cdFx0bGV0IGhhbmRsZUV2ZW50OiBhbnksIGhhbmRsZURvY3VtZW50Q2xpY2s6IGFueSwgdXBkYXRlQWN0aXZlQnV0dG9uczogYW55LCBzb3VyY2VFZGl0b3JTZWxlY3RlZFRleHQ6IGFueSwgYXBwZW5kTmV3TGluZTogYW55LCBjaGVja1NlbGVjdGlvbkNoYW5nZWQ6IGFueSwgY2hlY2tOb2RlQ2hhbmdlZDogYW55LCBhdXRvZm9jdXM6IGFueSwgZW1vdGljb25zS2V5UHJlc3M6IGFueTtcclxuXHRcdGxldCBlbW90aWNvbnNDaGVja1doaXRlc3BhY2U6IGFueSwgY3VycmVudFN0eWxlZEJsb2NrTm9kZTogYW55LCB0cmlnZ2VyVmFsdWVDaGFuZ2VkOiBhbnksIHZhbHVlQ2hhbmdlZEJsdXI6IGFueSwgdmFsdWVDaGFuZ2VkS2V5VXA6IGFueSwgYXV0b1VwZGF0ZTogYW55LCBhdXRvRXhwYW5kOiBhbnk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbGwgdGhlIGNvbW1hbmRzIHN1cHBvcnRlZCBieSB0aGUgZWRpdG9yXHJcblx0XHQgKiBAbmFtZSBjb21tYW5kc1xyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jb21tYW5kcyA9IHV0aWxzXHJcblx0XHRcdC5leHRlbmQodHJ1ZSwge30sICh1c2VyT3B0aW9ucy5jb21tYW5kcyB8fCBkZWZhdWx0Q29tbWFuZHMpKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE9wdGlvbnMgZm9yIHRoaXMgZWRpdG9yIGluc3RhbmNlXHJcblx0XHQgKiBAbmFtZSBvcHRzXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRsZXQgb3B0aW9uczogYW55ID0gdGhpcy5vcHRzID0gdXRpbHMuZXh0ZW5kKFxyXG5cdFx0XHR0cnVlLCB7fSwgKGRlZmF1bHRPcHRpb25zIGFzIGFueSksIHVzZXJPcHRpb25zXHJcblx0XHQpO1xyXG5cclxuXHRcdC8vIERvbid0IGRlZXAgZXh0ZW5kIGVtb3RpY29ucyAoZml4ZXMgIzU2NSlcclxuXHRcdHRoaXMub3B0cy5lbW90aWNvbnMgPSB1c2VyT3B0aW9ucy5lbW90aWNvbnMgfHwgKGRlZmF1bHRPcHRpb25zIGFzIGFueSkuZW1vdGljb25zO1xyXG5cclxuXHRcdGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzKSkge1xyXG5cdFx0XHRvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzID0gW107XHJcblx0XHR9XHJcblx0XHRvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzLnB1c2goJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLycpO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5IGZvciBlYWNoIGVkaXRvciBpbnN0YW5jZSBzbyBjYW5cclxuXHRcdC8vIGhhdmUgZGlmZmVyZW50IGFsbG93ZWQgaWZyYW1lIFVSTHNcclxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXHJcblx0XHRsZXQgZG9tUHVyaWZ5ID0gRE9NUHVyaWZ5KCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgaWZyYW1lcyBmb3IgdGhpbmdzIGxpa2UgWW91VHViZSwgc2VlOlxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvaXNzdWVzLzM0MCNpc3N1ZWNvbW1lbnQtNjcwNzU4OTgwXHJcblx0XHRkb21QdXJpZnkuYWRkSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIGZ1bmN0aW9uIChub2RlOiBIVE1MRWxlbWVudCwgZGF0YTogYW55KSB7XHJcblx0XHRcdGxldCBhbGxvd2VkVXJscyA9IG9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHM7XHJcblxyXG5cdFx0XHRpZiAoZGF0YS50YWdOYW1lID09PSAnaWZyYW1lJykge1xyXG5cdFx0XHRcdGxldCBzcmMgPSBkb20uYXR0cihub2RlLCAnc3JjJykgfHwgJyc7XHJcblxyXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWxsb3dlZFVybHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGxldCB1cmwgPSBhbGxvd2VkVXJsc1tpXTtcclxuXHJcblx0XHRcdFx0XHRpZiAodXRpbHMuaXNTdHJpbmcodXJsKSAmJiBzcmMuc3Vic3RyKDAsIHVybC5sZW5ndGgpID09PSB1cmwpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIEhhbmRsZSByZWdleFxyXG5cdFx0XHRcdFx0aWYgKHVybC50ZXN0ICYmIHVybC50ZXN0KHNyYykpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gTm8gbWF0Y2ggc28gcmVtb3ZlXHJcblx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQ29udmVydCB0YXJnZXQgYXR0cmlidXRlIGludG8gZGF0YS1zY2UtdGFyZ2V0IGF0dHJpYnV0ZXMgc28gWEhUTUwgZm9ybWF0XHJcblx0XHQvLyBjYW4gYWxsb3cgdGhlbVxyXG5cdFx0ZG9tUHVyaWZ5LmFkZEhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgZnVuY3Rpb24gKG5vZGU6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRcdGlmICgndGFyZ2V0JyBpbiBub2RlKSB7XHJcblx0XHRcdFx0ZG9tLmF0dHIobm9kZSwgJ2RhdGEtc2NlLXRhcmdldCcsIGRvbS5hdHRyKG5vZGUsICd0YXJnZXQnKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5yZW1vdmVBdHRyKG5vZGUsICd0YXJnZXQnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2FuaXRpemUgSFRNTCB0byBhdm9pZCBYU1NcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfSBodG1sXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRmdW5jdGlvbiBzYW5pdGl6ZShodG1sOiBIVE1MRWxlbWVudCB8IE5vZGUgfCBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0XHRjb25zdCBhbGxvd2VkVGFncyA9IFsnaWZyYW1lJ10uY29uY2F0KG9wdGlvbnMuYWxsb3dlZFRhZ3MpO1xyXG5cdFx0XHRjb25zdCBhbGxvd2VkQXR0cnMgPSBbJ2FsbG93ZnVsbHNjcmVlbicsICdmcmFtZWJvcmRlcicsICd0YXJnZXQnXVxyXG5cdFx0XHRcdC5jb25jYXQob3B0aW9ucy5hbGxvd2VkQXR0cmlidXRlcyk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZG9tUHVyaWZ5LnNhbml0aXplKGh0bWwsIHtcclxuXHRcdFx0XHRBRERfVEFHUzogYWxsb3dlZFRhZ3MsXHJcblx0XHRcdFx0QUREX0FUVFI6IGFsbG93ZWRBdHRyc1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFN3aXRjaGVzIGJldHdlZW4gdGhlIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2Rlc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgdG9nZ2xlU291cmNlTW9kZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4wXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBpc0luU291cmNlTW9kZSA9IHRoaXMuaW5Tb3VyY2VNb2RlKCk7XHJcblxyXG5cdFx0XHQvLyBkb24ndCBhbGxvdyBzd2l0Y2hpbmcgdG8gV1lTSVdZRyBpZiBkb2Vzbid0IHN1cHBvcnQgaXRcclxuXHRcdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCAmJiBpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHRcdHJhbmdlSGVscGVyLmNsZWFyKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBudWxsO1xyXG5cdFx0XHR0aGlzLmJsdXIoKTtcclxuXHJcblx0XHRcdGlmIChpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdHRoaXMuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHRoaXMuZ2V0U291cmNlRWRpdG9yVmFsdWUoKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRTb3VyY2VFZGl0b3JWYWx1ZSh0aGlzLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZShzb3VyY2VFZGl0b3IpO1xyXG5cdFx0XHRkb20udG9nZ2xlKHd5c2l3eWdFZGl0b3IpO1xyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3d5c2l3eWdNb2RlJywgaXNJblNvdXJjZU1vZGUpO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScsICFpc0luU291cmNlTW9kZSk7XHJcblxyXG5cdFx0XHR1cGRhdGVUb29sQmFyKCk7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQqIElmIHRoZSBlZGl0b3IgaXMgaW4gc291cmNlIGNvZGUgbW9kZVxyXG5cdFx0KlxyXG5cdFx0KiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0KiBAZnVuY3Rpb25cclxuXHRcdCogQG5hbWUgaW5Tb3VyY2VNb2RlXHJcblx0XHQqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5pblNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoKTogYm9vbGVhbiB7XHJcblx0XHRcdHJldHVybiBkb20uaGFzQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBlZGl0b3JzIGJsdXIgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGJsdXJeMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmJsdXIgPSBmdW5jdGlvbiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHR0aGlzLmJpbmQoJ2JsdXInLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoIXRoaXMuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0d3lzaXd5Z0JvZHkuYmx1cigpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5ibHVyKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgdGhlIFdZU0lXWUcgSFRNTCBlZGl0b3IgdmFsdWUuIFNob3VsZCBvbmx5IGJlIHRoZSBIVE1MXHJcblx0XHQgKiBjb250YWluZWQgd2l0aGluIHRoZSBib2R5IHRhZ3NcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2V0V3lzaXd5Z0VkaXRvclZhbHVlXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XHJcblx0XHRcdGlmICghdmFsdWUpIHtcclxuXHRcdFx0XHR2YWx1ZSA9ICc8cD48YnIgLz48L3A+JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d3lzaXd5Z0JvZHkuaW5uZXJIVE1MID0gc2FuaXRpemUodmFsdWUpO1xyXG5cdFx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblxyXG5cdFx0XHRhcHBlbmROZXdMaW5lKCk7XHJcblx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0YXV0b0V4cGFuZCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNldFNvdXJjZUVkaXRvclZhbHVlXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNldFNvdXJjZUVkaXRvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuXHRcdFx0c291cmNlRWRpdG9yLnZhbHVlID0gdmFsdWU7XHJcblxyXG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVXBkYXRlcyB0aGUgdGV4dGFyZWEgdGhhdCB0aGUgZWRpdG9yIGlzIHJlcGxhY2luZ1xyXG5cdFx0ICogd2l0aCB0aGUgdmFsdWUgY3VycmVudGx5IGluc2lkZSB0aGUgZWRpdG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgdXBkYXRlT3JpZ2luYWxcclxuXHRcdCAqIEBzaW5jZSAxLjQuMFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy51cGRhdGVPcmlnaW5hbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGV4dGFyZWEudmFsdWUgPSB0aGlzLnZhbCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdXNpbmcgYSBwbHVnaW4gdGhhdCBmaWx0ZXJzIHRoZSB0ZXh0IGxpa2UgdGhlIEJCQ29kZSBwbHVnaW5cclxuXHRcdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyB3aGljaCBpcyBCQkNvZGUgdG9cclxuXHRcdCAqIEhUTUwgc28gaXQgd2lsbCByZXR1cm4gSFRNTC4gSWYgZmlsdGVyIGlzIHNldCB0byBmYWxzZSBpdCB3aWxsXHJcblx0XHQgKiBqdXN0IHJldHVybiB0aGUgY29udGVudHMgb2YgdGhlIHNvdXJjZSBlZGl0b3IgKEJCQ29kZSkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuMFxyXG5cdFx0ICogQG5hbWUgZ2V0U291cmNlRWRpdG9yVmFsdWVcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZ2V0U291cmNlRWRpdG9yVmFsdWUgPSBmdW5jdGlvbiAoZmlsdGVyOiBib29sZWFuKTogc3RyaW5nIHtcclxuXHRcdFx0bGV0IHZhbCA9IHNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICd0b0h0bWwnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdHZhbCA9IGZvcm1hdC50b0h0bWwodmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIDxwPlNldHMgdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGVkaXRvci48L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogPHA+SWYgd2lkdGggb3IgaGVpZ2h0IGlzIG5vdCBudW1lcmljIGl0IGlzIGlnbm9yZWQuPC9wPlxyXG5cdFx0ICpcclxuXHRcdCAqIDxwPlRoZSBzYXZlIGFyZ3VtZW50IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBuZXcgc2l6ZXMuXHJcblx0XHQgKiBUaGUgc2F2ZWQgc2l6ZXMgY2FuIGJlIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tXHJcblx0XHQgKiBtYXhpbWl6ZWQgc3RhdGUuIFRoaXMgc2hvdWxkIG5vcm1hbGx5IGJlIGxlZnQgYXMgdHJ1ZS48L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdHdpZHRoXHRcdFdpZHRoIGluIHB4XHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn1cdFx0aGVpZ2h0XHRcdEhlaWdodCBpbiBweFxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufVx0W3NhdmU9dHJ1ZV1cdElmIHRvIHN0b3JlIHRoZSBuZXcgc2l6ZXNcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQG5hbWUgZGltZW5zaW9uc14zXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmRpbWVuc2lvbnMgPSBmdW5jdGlvbiAod2lkdGg/OiBhbnksIGhlaWdodD86IGFueSwgc2F2ZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHQvLyBzZXQgdW5kZWZpbmVkIHdpZHRoL2hlaWdodCB0byBib29sZWFuIGZhbHNlXHJcblx0XHRcdHdpZHRoID0gKCF3aWR0aCAmJiB3aWR0aCAhPT0gMCkgPyBmYWxzZSA6IHdpZHRoO1xyXG5cdFx0XHRoZWlnaHQgPSAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApID8gZmFsc2UgOiBoZWlnaHQ7XHJcblxyXG5cdFx0XHRpZiAod2lkdGggPT09IGZhbHNlICYmIGhlaWdodCA9PT0gZmFsc2UpIHtcclxuXHRcdFx0XHRyZXR1cm4geyB3aWR0aDogdGhpcy53aWR0aCgpLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0KCkgfTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHdpZHRoICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdGlmIChzYXZlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLndpZHRoKGVkaXRvckNvbnRhaW5lciwgd2lkdGgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaGVpZ2h0ICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdGlmIChzYXZlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20uaGVpZ2h0KGVkaXRvckNvbnRhaW5lciwgaGVpZ2h0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7YW55fSByZWFkT25seVxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSByZWFkT25seV4yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnJlYWRPbmx5ID0gZnVuY3Rpb24gKHJlYWRPbmx5PzogYW55KTogYW55IHtcclxuXHRcdFx0aWYgKHR5cGVvZiByZWFkT25seSAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdFx0cmV0dXJuICFzb3VyY2VFZGl0b3IucmVhZE9ubHk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHd5c2l3eWdCb2R5LmNvbnRlbnRFZGl0YWJsZSA9ICghcmVhZE9ubHkpLnRvU3RyaW5nKCk7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5yZWFkT25seSA9ICFyZWFkT25seTtcclxuXHJcblx0XHRcdHVwZGF0ZVRvb2xCYXIocmVhZE9ubHkpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhbiBldmVudCBoYW5kbGVyIHRvIHRoZSBmb2N1cyBldmVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9uIHwgYW55fSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZm9jdXNeMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmZvY3VzID0gZnVuY3Rpb24gKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0dGhpcy5iaW5kKCdmb2N1cycsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHRcdFx0fSBlbHNlIGlmICghdGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRcdC8vIEFscmVhZHkgaGFzIGZvY3VzIHNvIGRvIG5vdGhpbmdcclxuXHRcdFx0XHRpZiAoZG9tLmZpbmQod3lzaXd5Z0RvY3VtZW50LCAnOmZvY3VzJykubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRsZXQgY29udGFpbmVyO1xyXG5cdFx0XHRcdGxldCBybmcgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdC8vIEZpeCBGRiBidWcgd2hlcmUgaXQgc2hvd3MgdGhlIGN1cnNvciBpbiB0aGUgd3JvbmcgcGxhY2VcclxuXHRcdFx0XHQvLyBpZiB0aGUgZWRpdG9yIGhhc24ndCBoYWQgZm9jdXMgYmVmb3JlLiBTZWUgaXNzdWUgIzM5M1xyXG5cdFx0XHRcdGlmICghY3VycmVudFNlbGVjdGlvbikge1xyXG5cdFx0XHRcdFx0YXV0b2ZvY3VzKHRydWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgY3Vyc29yIGlzIHNldCBhZnRlciBhIEJSIHdoZW4gdGhlIEJSIGlzIHRoZSBvbmx5XHJcblx0XHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcclxuXHRcdFx0XHQvLyB0byBvY2N1ciB3aGVuIHNvbWV0aGluZyBpcyB0eXBlZC4gU2VlIGlzc3VlICMzMjFcclxuXHRcdFx0XHRpZiAocm5nICYmIHJuZy5lbmRPZmZzZXQgPT09IDEgJiYgcm5nLmNvbGxhcHNlZCkge1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyID0gcm5nLmVuZENvbnRhaW5lcjtcclxuXHJcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSAmJlxyXG5cdFx0XHRcdFx0XHRkb20uaXMoY29udGFpbmVyLmZpcnN0Q2hpbGQsICdicicpKSB7XHJcblx0XHRcdFx0XHRcdHJuZy5zZXRTdGFydEJlZm9yZShjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRcdHJuZy5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2Uocm5nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHd5c2l3eWdXaW5kb3cuZm9jdXMoKTtcclxuXHRcdFx0XHR3eXNpd3lnQm9keS5mb2N1cygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZWRpdG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGZpbHRlciBzZXQgdHJ1ZSB0aGUgdmFsIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGZpbHRlclxyXG5cdFx0ICogZnVuY3Rpb24uIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luIGl0IHdpbGwgcGFzcyB0aGUgdmFsIHRvXHJcblx0XHQgKiB0aGUgQkJDb2RlIGZpbHRlciB0byBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gdmFsXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgdmFsXjJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMudmFsID0gZnVuY3Rpb24gKHZhbD86IHN0cmluZywgZmlsdGVyOiBib29sZWFuID0gdHJ1ZSk6IGFueSB7XHJcblx0XHRcdGlmICghdXRpbHMuaXNTdHJpbmcodmFsKSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmluU291cmNlTW9kZSgpID9cclxuXHRcdFx0XHRcdHRoaXMuZ2V0U291cmNlRWRpdG9yVmFsdWUoZmFsc2UpIDpcclxuXHRcdFx0XHRcdHRoaXMuZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghdGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICd0b0h0bWwnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdFx0dmFsID0gZm9ybWF0LnRvSHRtbCh2YWwpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zZXRXeXNpd3lnRWRpdG9yVmFsdWUodmFsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldFNvdXJjZUVkaXRvclZhbHVlKHZhbCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEV4cGFuZHMgb3Igc2hyaW5rcyB0aGUgZWRpdG9ycyBoZWlnaHQgdG8gdGhlIGhlaWdodCBvZiBpdCdzIGNvbnRlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBVbmxlc3MgaWdub3JlTWF4SGVpZ2h0IGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbm90IGV4cGFuZFxyXG5cdFx0ICogaGlnaGVyIHRoYW4gdGhlIG1heEhlaWdodCBvcHRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtpZ25vcmVNYXhIZWlnaHQ9ZmFsc2VdXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGV4cGFuZFRvQ29udGVudFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzZWUgI3Jlc2l6ZVRvQ29udGVudFxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmV4cGFuZFRvQ29udGVudCA9IGZ1bmN0aW9uIChpZ25vcmVNYXhIZWlnaHQ6IGJvb2xlYW4pIHtcclxuXHRcdFx0aWYgKHRoaXMubWF4aW1pemUoKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y2xlYXJUaW1lb3V0KGF1dG9FeHBhbmRUaHJvdHRsZSk7XHJcblx0XHRcdGF1dG9FeHBhbmRUaHJvdHRsZSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKCFhdXRvRXhwYW5kQm91bmRzKSB7XHJcblx0XHRcdFx0bGV0IGhlaWdodCA9IG9wdGlvbnMucmVzaXplTWluSGVpZ2h0IHx8IG9wdGlvbnMuaGVpZ2h0IHx8XHJcblx0XHRcdFx0XHRkb20uaGVpZ2h0KHRleHRhcmVhKTtcclxuXHJcblx0XHRcdFx0YXV0b0V4cGFuZEJvdW5kcyA9IHtcclxuXHRcdFx0XHRcdG1pbjogaGVpZ2h0LFxyXG5cdFx0XHRcdFx0bWF4OiBvcHRpb25zLnJlc2l6ZU1heEhlaWdodCB8fCAoaGVpZ2h0ICogMilcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgcmFuZ2UgPSBnbG9iYWxEb2MuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHRcdGxldCByZWN0ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdGxldCBjdXJyZW50ID0gd3lzaXd5Z0RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSAxO1xyXG5cdFx0XHRsZXQgc3BhY2VOZWVkZWQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wO1xyXG5cdFx0XHRsZXQgbmV3SGVpZ2h0ID0gdGhpcy5oZWlnaHQoKSArIDEgKyAoc3BhY2VOZWVkZWQgLSBjdXJyZW50KTtcclxuXHJcblx0XHRcdGlmICghaWdub3JlTWF4SGVpZ2h0ICYmIGF1dG9FeHBhbmRCb3VuZHMubWF4ICE9PSAtMSkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IE1hdGgubWluKG5ld0hlaWdodCwgYXV0b0V4cGFuZEJvdW5kcy5tYXgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmhlaWdodChNYXRoLmNlaWwoTWF0aC5tYXgobmV3SGVpZ2h0LCBhdXRvRXhwYW5kQm91bmRzLm1pbikpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgaW4gUlRMIG1vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSBydGxeMlxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5ydGwgPSBmdW5jdGlvbiAocnRsPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGxldCBkaXIgPSBydGwgPyAncnRsJyA6ICdsdHInO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBydGwgIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdHJldHVybiBkb20uYXR0cihzb3VyY2VFZGl0b3IsICdkaXInKSA9PT0gJ3J0bCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hdHRyKHd5c2l3eWdCb2R5LCAnZGlyJywgZGlyKTtcclxuXHRcdFx0ZG9tLmF0dHIoc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcclxuXHJcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyhlZGl0b3JDb250YWluZXIsICdydGwnKTtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ2x0cicpO1xyXG5cdFx0XHRkb20uYWRkQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBkaXIpO1xyXG5cclxuXHRcdFx0aWYgKGljb25zICYmIGljb25zLnJ0bCkge1xyXG5cdFx0XHRcdGljb25zLnJ0bChydGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFbmFibGVzL2Rpc2FibGVzIGVtb3RpY29uc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBlbW90aWNvbnNeMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMlxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmVtb3RpY29ucyA9IGZ1bmN0aW9uIChlbmFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRpZiAoIWVuYWJsZSAmJiBlbmFibGUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5lbW90aWNvbnNFbmFibGVkID0gZW5hYmxlO1xyXG5cclxuXHRcdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgbnVsbCwgZW1vdGljb25zS2V5UHJlc3MpO1xyXG5cclxuXHRcdFx0XHRpZiAoIXRoaXMuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblx0XHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bGV0IGVtb3RpY29ucyA9IGRvbS5maW5kKHd5c2l3eWdCb2R5LCAnaW1nW2RhdGEtZW1sZWRpdG9yLWVtb3RpY29uXScpO1xyXG5cclxuXHRcdFx0XHR1dGlscy5lYWNoKGVtb3RpY29ucywgZnVuY3Rpb24gKF8sIGltZykge1xyXG5cdFx0XHRcdFx0bGV0IHRleHQ6IGFueSA9IGRvbS5kYXRhKGltZywgJ2VtbGVkaXRvci1lbW90aWNvbicpO1xyXG5cdFx0XHRcdFx0bGV0IHRleHROb2RlID0gd3lzaXd5Z0RvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xyXG5cdFx0XHRcdFx0aW1nLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRleHROb2RlLCBpbWcpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRkb20ub2ZmKHd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBudWxsLCBlbW90aWNvbnNLZXlQcmVzcyk7XHJcblxyXG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIHNvdXJjZU1vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc291cmNlTW9kZV4yXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoZW5hYmxlPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGxldCBpblNvdXJjZU1vZGUgPSB0aGlzLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBlbmFibGUgIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdHJldHVybiBpblNvdXJjZU1vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICgoaW5Tb3VyY2VNb2RlICYmICFlbmFibGUpIHx8ICghaW5Tb3VyY2VNb2RlICYmIGVuYWJsZSkpIHtcclxuXHRcdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIHNhdmVXaWR0aCBzcGVjaWZpZXMgaWYgdG8gc2F2ZSB0aGUgd2lkdGguIFRoZSBzdG9yZWQgd2lkdGggY2FuIGJlXHJcblx0XHQgKiB1c2VkIGZvciB0aGluZ3MgbGlrZSByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9ICAgICB3aWR0aCAgICAgICAgICAgIFdpZHRoIGluIHBpeGVsc1xyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufVx0W3NhdmVXaWR0aD10cnVlXSBJZiB0byBzdG9yZSB0aGUgd2lkdGhcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQG5hbWUgd2lkdGheM1xyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy53aWR0aCA9IGZ1bmN0aW9uICh3aWR0aDogbnVtYmVyLCBzYXZlV2lkdGg6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRpZiAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmRpbWVuc2lvbnMod2lkdGgsIG51bGwsIHNhdmVXaWR0aCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIHN0b3JlZCBoZWlnaHQgY2FuIGJlIHVzZWQgZm9yIHRoaW5ncyBsaWtlXHJcblx0XHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBIZWlnaHQgaW4gcHhcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSBoZWlnaHReM1xyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBmdW5jdGlvbiAoaGVpZ2h0OiBudW1iZXIsIHNhdmVIZWlnaHQ6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRpZiAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gZG9tLmhlaWdodChlZGl0b3JDb250YWluZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmRpbWVuc2lvbnMobnVsbCwgaGVpZ2h0LCBzYXZlSGVpZ2h0KTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgYSBtZW51IGl0ZW0gZHJvcCBkb3duXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG1lbnVJdGVtIFRoZSBidXR0b24gdG8gYWxpZ24gdGhlIGRyb3Bkb3duIHdpdGhcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgICAgICAgICBVc2VkIGZvciBzdHlsaW5nIHRoZSBkcm9wZG93biwgd2lsbCBiZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgY2xhc3MgZW1sZWRpdG9yLW5hbWVcclxuXHRcdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250ZW50ICBUaGUgSFRNTCBjb250ZW50IG9mIHRoZSBkcm9wZG93blxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjcmVhdGVEcm9wRG93blxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jcmVhdGVEcm9wRG93biA9IGZ1bmN0aW9uIChtZW51SXRlbTogSFRNTEVsZW1lbnQsIG5hbWU6IHN0cmluZywgY29udGVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdFx0Ly8gZmlyc3QgY2xpY2sgZm9yIGNyZWF0ZSBzZWNvbmQgY2xpY2sgZm9yIGNsb3NlXHJcblx0XHRcdGxldCBkcm9wRG93bkNzcywgZHJvcERvd25DbGFzcyA9ICdlbWxlZGl0b3ItJyArIG5hbWU7XHJcblxyXG5cdFx0XHR0aGlzLmNsb3NlRHJvcERvd24oKTtcclxuXHJcblx0XHRcdC8vIE9ubHkgY2xvc2UgdGhlIGRyb3Bkb3duIGlmIGl0IHdhcyBhbHJlYWR5IG9wZW5cclxuXHRcdFx0aWYgKGRyb3Bkb3duICYmIGRvbS5oYXNDbGFzcyhkcm9wZG93biwgZHJvcERvd25DbGFzcykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRyb3BEb3duQ3NzID0gdXRpbHMuZXh0ZW5kKHtcclxuXHRcdFx0XHR0b3A6IG1lbnVJdGVtLm9mZnNldFRvcCxcclxuXHRcdFx0XHRsZWZ0OiBtZW51SXRlbS5vZmZzZXRMZWZ0LFxyXG5cdFx0XHRcdG1hcmdpblRvcDogbWVudUl0ZW0uY2xpZW50SGVpZ2h0XHJcblx0XHRcdH0sIG9wdGlvbnMuZHJvcERvd25Dc3MpO1xyXG5cclxuXHRcdFx0ZHJvcGRvd24gPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1kcm9wZG93biAnICsgZHJvcERvd25DbGFzc1xyXG5cdFx0XHR9KSBhcyBhbnk7XHJcblxyXG5cdFx0XHRkb20uY3NzKGRyb3Bkb3duLCBkcm9wRG93bkNzcyk7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChkcm9wZG93biwgY29udGVudCk7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIGRyb3Bkb3duKTtcclxuXHRcdFx0ZG9tLm9uKGRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIG51bGwsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0Ly8gc3RvcCBjbGlja3Mgd2l0aGluIHRoZSBkcm9wZG93biBmcm9tIGJlaW5nIGhhbmRsZWRcclxuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChkcm9wZG93bikge1xyXG5cdFx0XHRcdGxldCBmaXJzdCA9IGRvbS5maW5kKGRyb3Bkb3duLCAnaW5wdXQsdGV4dGFyZWEnKVswXSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRpZiAoZmlyc3QpIHtcclxuXHRcdFx0XHRcdGZpcnN0LmZvY3VzKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIG1heGltaXNlZCBvciBub3RcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IG1heGltaXplIElmIHRvIG1heGltaXNlIHRoZSBlZGl0b3JcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQG5hbWUgbWF4aW1pemVeMlxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5tYXhpbWl6ZSA9IGZ1bmN0aW9uIChtYXhpbWl6ZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGxldCBtYXhpbWl6ZVNpemUgPSAnZW1sZWRpdG9yLW1heGltaXplJztcclxuXHJcblx0XHRcdGlmICh1dGlscy5pc1VuZGVmaW5lZChtYXhpbWl6ZSkpIHtcclxuXHRcdFx0XHRyZXR1cm4gZG9tLmhhc0NsYXNzKGVkaXRvckNvbnRhaW5lciwgbWF4aW1pemVTaXplKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bWF4aW1pemUgPSAhIW1heGltaXplO1xyXG5cclxuXHRcdFx0aWYgKG1heGltaXplKSB7XHJcblx0XHRcdFx0bWF4aW1pemVTY3JvbGxQb3NpdGlvbiA9IGdsb2JhbFdpbi5zY3JvbGxZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmRvY3VtZW50RWxlbWVudCwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRcdGRvbS50b2dnbGVDbGFzcyhnbG9iYWxEb2MuYm9keSwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRcdGRvbS50b2dnbGVDbGFzcyhlZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSwgbWF4aW1pemUpO1xyXG5cdFx0XHR0aGlzLndpZHRoKG1heGltaXplID8gJzEwMCUnIDogb3B0aW9ucy53aWR0aCwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmhlaWdodChtYXhpbWl6ZSA/ICcxMDAlJyA6IG9wdGlvbnMuaGVpZ2h0LCBmYWxzZSk7XHJcblxyXG5cdFx0XHRpZiAoIW1heGltaXplKSB7XHJcblx0XHRcdFx0Z2xvYmFsV2luLnNjcm9sbFRvKDAsIG1heGltaXplU2Nyb2xsUG9zaXRpb24pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhdXRvRXhwYW5kKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBEZXN0cm95cyB0aGUgZWRpdG9yLCByZW1vdmluZyBhbGwgZWxlbWVudHMgYW5kXHJcblx0XHQgKiBldmVudCBoYW5kbGVycy5cclxuXHRcdCAqXHJcblx0XHQgKiBMZWF2ZXMgb25seSB0aGUgb3JpZ2luYWwgdGV4dGFyZWEuXHJcblx0XHQgKlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBkZXN0cm95XHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdC8vIERvbid0IGRlc3Ryb3kgaWYgdGhlIGVkaXRvciBoYXMgYWxyZWFkeSBiZWVuIGRlc3Ryb3llZFxyXG5cdFx0XHRpZiAoIXBsdWdpbk1hbmFnZXIpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIuZGVzdHJveSgpO1xyXG5cclxuXHRcdFx0cmFuZ2VIZWxwZXIgPSBudWxsO1xyXG5cdFx0XHRwbHVnaW5NYW5hZ2VyID0gbnVsbDtcclxuXHJcblx0XHRcdGlmIChkcm9wZG93bikge1xyXG5cdFx0XHRcdGRvbS5yZW1vdmUoZHJvcGRvd24pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgJ2NsaWNrJywgbnVsbCwgaGFuZGxlRG9jdW1lbnRDbGljayk7XHJcblxyXG5cdFx0XHRsZXQgZm9ybSA9IHRleHRhcmVhLmZvcm07XHJcblx0XHRcdGlmIChmb3JtKSB7XHJcblx0XHRcdFx0ZG9tLm9mZihmb3JtLCAncmVzZXQnLCBudWxsLCBoYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0XHRcdGRvbS5vZmYoZm9ybSwgJ3N1Ym1pdCcsIG51bGwsIHRoaXMudXBkYXRlT3JpZ2luYWwsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLm9mZih3aW5kb3csICdwYWdlaGlkZScsIG51bGwsIHRoaXMudXBkYXRlT3JpZ2luYWwpO1xyXG5cdFx0XHRkb20ub2ZmKHdpbmRvdywgJ3BhZ2VzaG93JywgbnVsbCwgaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdFx0ZG9tLnJlbW92ZShzb3VyY2VFZGl0b3IpO1xyXG5cdFx0XHRkb20ucmVtb3ZlKHRvb2xiYXIpO1xyXG5cdFx0XHRkb20ucmVtb3ZlKGVkaXRvckNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRkZWxldGUgdGV4dGFyZWEuX3NjZWRpdG9yO1xyXG5cdFx0XHRkb20uc2hvdyh0ZXh0YXJlYSk7XHJcblxyXG5cdFx0XHR0ZXh0YXJlYS5yZXF1aXJlZCA9IGlzUmVxdWlyZWQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xvc2VzIGFueSBjdXJyZW50bHkgb3BlbiBkcm9wIGRvd25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb2N1cz1mYWxzZV0gSWYgdG8gZm9jdXMgdGhlIGVkaXRvclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGNsb3NpbmcgdGhlIGRyb3AgZG93blxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjbG9zZURyb3BEb3duXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNsb3NlRHJvcERvd24gPSBmdW5jdGlvbiAoZm9jdXM/OiBib29sZWFuKSB7XHJcblx0XHRcdGlmIChkcm9wZG93bikge1xyXG5cdFx0XHRcdGRvbS5yZW1vdmUoZHJvcGRvd24pO1xyXG5cdFx0XHRcdGRyb3Bkb3duID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGZvY3VzID09PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBIVE1MIGludG8gV1lTSVdZRyBlZGl0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kSHRtbCBpcyBzcGVjaWZpZWQsIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkXHJcblx0XHQgKiBiZXR3ZWVuIGh0bWwgYW5kIGVuZEh0bWwuIElmIHRoZXJlIGlzIG5vIHNlbGVjdGVkIHRleHQgaHRtbFxyXG5cdFx0ICogYW5kIGVuZEh0bWwgd2lsbCBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEh0bWw9bnVsbF1cclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW292ZXJyaWRlQ29kZUJsb2NraW5nPWZhbHNlXSBJZiB0byBpbnNlcnQgdGhlIGh0bWxcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRvIGNvZGUgdGFncywgYnlcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGNvZGUgdGFncyBvbmx5XHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCB0ZXh0LlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCA9IGZ1bmN0aW9uIChodG1sOiBzdHJpbmcsIGVuZEh0bWw6IHN0cmluZywgb3ZlcnJpZGVDb2RlQmxvY2tpbmc6IGJvb2xlYW4pIHtcclxuXHRcdFx0bGV0IG1hcmtlcjogYW55LCBzY3JvbGxUb3AsIHNjcm9sbFRvLCBlZGl0b3JIZWlnaHQgPSBkb20uaGVpZ2h0KHd5c2l3eWdFZGl0b3IpO1xyXG5cclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogVGhpcyBjb2RlIHRhZyBzaG91bGQgYmUgY29uZmlndXJhYmxlIGFuZFxyXG5cdFx0XHQvLyBzaG91bGQgbWF5YmUgY29udmVydCB0aGUgSFRNTCBpbnRvIHRleHQgaW5zdGVhZFxyXG5cdFx0XHQvLyBEb24ndCBhcHBseSB0byBjb2RlIGVsZW1lbnRzXHJcblx0XHRcdGlmICghb3ZlcnJpZGVDb2RlQmxvY2tpbmcgJiYgZG9tLmNsb3Nlc3QoY3VycmVudEJsb2NrTm9kZSwgJ2NvZGUnKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSW5zZXJ0IHRoZSBIVE1MIGFuZCBzYXZlIHRoZSByYW5nZSBzbyB0aGUgZWRpdG9yIGNhbiBiZSBzY3JvbGxlZFxyXG5cdFx0XHQvLyB0byB0aGUgZW5kIG9mIHRoZSBzZWxlY3Rpb24uIEFsc28gYWxsb3dzIGVtb3RpY29ucyB0byBiZSByZXBsYWNlZFxyXG5cdFx0XHQvLyB3aXRob3V0IGFmZmVjdGluZyB0aGUgY3Vyc29yIHBvc2l0aW9uXHJcblx0XHRcdHJhbmdlSGVscGVyLmluc2VydEhUTUwoaHRtbCwgZW5kSHRtbCk7XHJcblx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblxyXG5cdFx0XHQvLyBGaXggYW55IGludmFsaWQgbmVzdGluZywgZS5nLiBpZiBhIHF1b3RlIG9yIG90aGVyIGJsb2NrIGlzIGluc2VydGVkXHJcblx0XHRcdC8vIGludG8gYSBwYXJhZ3JhcGhcclxuXHRcdFx0ZG9tLmZpeE5lc3Rpbmcod3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdFx0d3JhcElubGluZXMod3lzaXd5Z0JvZHksIHd5c2l3eWdEb2N1bWVudCk7XHJcblxyXG5cdFx0XHQvLyBTY3JvbGwgdGhlIGVkaXRvciBhZnRlciB0aGUgZW5kIG9mIHRoZSBzZWxlY3Rpb25cclxuXHRcdFx0bWFya2VyID0gZG9tLmZpbmQod3lzaXd5Z0JvZHksICcjZW1sZWRpdG9yLWVuZC1tYXJrZXInKVswXTtcclxuXHRcdFx0ZG9tLnNob3cobWFya2VyKTtcclxuXHRcdFx0c2Nyb2xsVG9wID0gd3lzaXd5Z0JvZHkuc2Nyb2xsVG9wO1xyXG5cdFx0XHRzY3JvbGxUbyA9ICgoZG9tLmdldE9mZnNldChtYXJrZXIpIGFzIGFueSkudG9wICtcclxuXHRcdFx0XHQobWFya2VyLm9mZnNldEhlaWdodCAqIDEuNSkpIC0gZWRpdG9ySGVpZ2h0O1xyXG5cdFx0XHRkb20uaGlkZShtYXJrZXIpO1xyXG5cclxuXHRcdFx0Ly8gT25seSBzY3JvbGwgaWYgbWFya2VyIGlzbid0IGFscmVhZHkgdmlzaWJsZVxyXG5cdFx0XHRpZiAoc2Nyb2xsVG8gPiBzY3JvbGxUb3AgfHwgc2Nyb2xsVG8gKyBlZGl0b3JIZWlnaHQgPCBzY3JvbGxUb3ApIHtcclxuXHRcdFx0XHR3eXNpd3lnQm9keS5zY3JvbGxUb3AgPSBzY3JvbGxUbztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XHJcblx0XHRcdHJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cclxuXHRcdFx0Ly8gQWRkIGEgbmV3IGxpbmUgYWZ0ZXIgdGhlIGxhc3QgYmxvY2sgZWxlbWVudFxyXG5cdFx0XHQvLyBzbyBjYW4gYWx3YXlzIGFkZCB0ZXh0IGFmdGVyIGl0XHJcblx0XHRcdGFwcGVuZE5ld0xpbmUoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBMaWtlIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sIGV4Y2VwdCBpdCB3aWxsIGNvbnZlcnQgYW55IEhUTUxcclxuXHRcdCAqIGludG8gdGV4dCBiZWZvcmUgaW5zZXJ0aW5nIGl0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgd3lzaXd5Z0VkaXRvckluc2VydFRleHRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpIHtcclxuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcclxuXHRcdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCksIGVzY2FwZS5lbnRpdGllcyhlbmRUZXh0KVxyXG5cdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgdGV4dCBpbnRvIHRoZSBXWVNJV1lHIG9yIHNvdXJjZSBlZGl0b3IgZGVwZW5kaW5nIG9uIHdoaWNoXHJcblx0XHQgKiBtb2RlIHRoZSBlZGl0b3IgaXMgaW4uXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kVGV4dCBpcyBzcGVjaWZpZWQgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWQgYmV0d2VlblxyXG5cdFx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHRcdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydFRleHRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0OiBzdHJpbmcsIGVuZFRleHQ6IHN0cmluZyk6IGFueSB7XHJcblx0XHRcdGlmICh0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0dGhpcy5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0KHRleHQsIGVuZFRleHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHBhc3RlZCBkYXRhLCBmaWx0ZXJzIGl0IGFuZCB0aGVuIGluc2VydHMgaXQuXHJcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlUGFzdGVEYXRhID0gKGRhdGE6IGFueSkgPT4ge1xyXG5cdFx0XHRsZXQgcGFzdGVBcmVhID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZVJhdycsIGRhdGEpO1xyXG5cdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdwYXN0ZXJhdycsIGRhdGEpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEuaHRtbCkge1xyXG5cdFx0XHRcdC8vIFNhbml0aXplIGFnYWluIGluIGNhc2UgcGx1Z2lucyBtb2RpZmllZCB0aGUgSFRNTFxyXG5cdFx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBzYW5pdGl6ZShkYXRhLmh0bWwpO1xyXG5cclxuXHRcdFx0XHQvLyBmaXggYW55IGludmFsaWQgbmVzdGluZ1xyXG5cdFx0XHRcdGRvbS5maXhOZXN0aW5nKHBhc3RlQXJlYSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cGFzdGVBcmVhLmlubmVySFRNTCA9IGVzY2FwZS5lbnRpdGllcyhkYXRhLnRleHQgfHwgJycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgcGFzdGU6IGFueSA9IHtcclxuXHRcdFx0XHR2YWw6IHBhc3RlQXJlYS5pbm5lckhUTUxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmICgnZnJhZ21lbnRUb1NvdXJjZScgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0cGFzdGUudmFsID0gZm9ybWF0XHJcblx0XHRcdFx0XHQuZnJhZ21lbnRUb1NvdXJjZShwYXN0ZS52YWwsIHd5c2l3eWdEb2N1bWVudCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlJywgcGFzdGUpO1xyXG5cdFx0XHRkb20udHJpZ2dlcihlZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcclxuXHJcblx0XHRcdGlmICgnZnJhZ21lbnRUb0h0bWwnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdHBhc3RlLnZhbCA9IGZvcm1hdFxyXG5cdFx0XHRcdFx0LmZyYWdtZW50VG9IdG1sKHBhc3RlLnZhbCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlSHRtbCcsIHBhc3RlKTtcclxuXHJcblx0XHRcdGxldCBwYXJlbnQgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwocGFzdGUudmFsLCBudWxsLCB0cnVlKTtcclxuXHRcdFx0ZG9tLm1lcmdlKHBhcmVudCk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgYnV0IGluc2VydHMgdGV4dCBpbnRvIHRoZVxyXG5cdFx0ICogc291cmNlIG1vZGUgZWRpdG9yIGluc3RlYWQuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kVGV4dCBpcyBzcGVjaWZpZWQgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWQgYmV0d2VlblxyXG5cdFx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHRcdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBhZnRlciB0aGUgdGV4dCBwYXJhbS4gSWYgZW5kVGV4dCBpc1xyXG5cdFx0ICogc3BlY2lmaWVkIHRoZSBjdXJzb3Igd2lsbCBiZSBwbGFjZWQgYmVmb3JlIGVuZFRleHQsIHNvIHBhc3Npbmc6PGJyIC8+XHJcblx0XHQgKlxyXG5cdFx0ICogJ1tiXScsICdbL2JdJ1xyXG5cdFx0ICpcclxuXHRcdCAqIFdvdWxkIGNhdXNlIHRoZSBjdXJzb3IgdG8gYmUgcGxhY2VkOjxiciAvPlxyXG5cdFx0ICpcclxuXHRcdCAqIFtiXVNlbGVjdGVkIHRleHR8Wy9iXVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHRcdCAqIEBzaW5jZSAxLjQuMFxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JJbnNlcnRUZXh0XHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNvdXJjZUVkaXRvckluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFx0bGV0IHNjcm9sbFRvcCwgY3VycmVudFZhbHVlLCBzdGFydFBvcyA9IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCwgZW5kUG9zID0gc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZDtcclxuXHJcblx0XHRcdHNjcm9sbFRvcCA9IHNvdXJjZUVkaXRvci5zY3JvbGxUb3A7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cdFx0XHRjdXJyZW50VmFsdWUgPSBzb3VyY2VFZGl0b3IudmFsdWU7XHJcblxyXG5cdFx0XHRpZiAoZW5kVGV4dCkge1xyXG5cdFx0XHRcdHRleHQgKz0gY3VycmVudFZhbHVlLnN1YnN0cmluZyhzdGFydFBvcywgZW5kUG9zKSArIGVuZFRleHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNvdXJjZUVkaXRvci52YWx1ZSA9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICtcclxuXHRcdFx0XHR0ZXh0ICtcclxuXHRcdFx0XHRjdXJyZW50VmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcblxyXG5cdFx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQgPSAoc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aCkgLVxyXG5cdFx0XHRcdChlbmRUZXh0ID8gZW5kVGV4dC5sZW5ndGggOiAwKTtcclxuXHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZCA9IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydDtcclxuXHJcblx0XHRcdHNvdXJjZUVkaXRvci5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBjdXJyZW50IGluc3RhbmNlIG9mIHRoZSByYW5nZUhlbHBlciBjbGFzc1xyXG5cdFx0ICogZm9yIHRoZSBlZGl0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7UmFuZ2VIZWxwZXJ9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGdldFJhbmdlSGVscGVyXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmdldFJhbmdlSGVscGVyID0gZnVuY3Rpb24gKCk6IFJhbmdlSGVscGVyIHtcclxuXHRcdFx0cmV0dXJuIHJhbmdlSGVscGVyO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIG9yIHNldHMgdGhlIHNvdXJjZSBlZGl0b3IgY2FyZXQgcG9zaXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IFtwb3NpdGlvbl1cclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuNVxyXG5cdFx0ICogQG5hbWUgc291cmNlRWRpdG9yQ2FyZXRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yQ2FyZXQgPSBmdW5jdGlvbiAocG9zaXRpb246IGFueSk6IGFueSB7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0aWYgKHBvc2l0aW9uKSB7XHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gcG9zaXRpb24uc3RhcnQ7XHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZCA9IHBvc2l0aW9uLmVuZDtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0c3RhcnQ6IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCxcclxuXHRcdFx0XHRlbmQ6IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblxyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgSFRNTC9CQkNvZGUgaW50byB0aGUgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kIGlzIHN1cHBsaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHRcdCAqIHN0YXJ0IGFuZCBlbmQuIElmIHRoZXJlIGlzIG5vIHNlbGVjdGVkIHRleHQgc3RhcnQgYW5kIGVuZFxyXG5cdFx0ICogd2lsbCBiZSBjb25jYXRlbmF0ZSB0b2dldGhlci5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB0aGUgZmlsdGVyIHBhcmFtIGlzIHNldCB0byB0cnVlLCB0aGUgSFRNTC9CQkNvZGUgd2lsbCBiZVxyXG5cdFx0ICogcGFzc2VkIHRocm91Z2ggYW55IHBsdWdpbiBmaWx0ZXJzLiBJZiB1c2luZyB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdFx0ICogdGhpcyB3aWxsIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdGhlIGFsbG93TWl4ZWQgcGFyYW0gaXMgc2V0IHRvIHRydWUsIEhUTUwgYW55IHdpbGwgbm90IGJlXHJcblx0XHQgKiBlc2NhcGVkXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0XHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZD1udWxsXVxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtjb252ZXJ0RW1vdGljb25zPXRydWVdIElmIHRvIGNvbnZlcnQgZW1vdGljb25zXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxvd01peGVkPWZhbHNlXVxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnReMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuXHRcdHRoaXMuaW5zZXJ0ID0gZnVuY3Rpb24gKFxyXG5cdFx0XHRzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZywgZmlsdGVyOiBib29sZWFuLCBjb252ZXJ0RW1vdGljb25zOiBib29sZWFuLCBhbGxvd01peGVkOiBib29sZWFuXHJcblx0XHQpOiBhbnkge1xyXG5cdFx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dChzdGFydCwgZW5kKTtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQWRkIHRoZSBzZWxlY3Rpb24gYmV0d2VlbiBzdGFydCBhbmQgZW5kXHJcblx0XHRcdGlmIChlbmQpIHtcclxuXHRcdFx0XHRsZXQgaHRtbCA9IHJhbmdlSGVscGVyLnNlbGVjdGVkSHRtbCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb1NvdXJjZScgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0XHRodG1sID0gZm9ybWF0XHJcblx0XHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKGh0bWwsIHd5c2l3eWdEb2N1bWVudCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c3RhcnQgKz0gaHRtbCArIGVuZDtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBUT0RPOiBUaGlzIGZpbHRlciBzaG91bGQgYWxsb3cgZW1wdHkgdGFncyBhcyBpdCdzIGluc2VydGluZy5cclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHRzdGFydCA9IGZvcm1hdC5mcmFnbWVudFRvSHRtbChzdGFydCwgY3VycmVudE5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDb252ZXJ0IGFueSBlc2NhcGVkIEhUTUwgYmFjayBpbnRvIEhUTUwgaWYgbWl4ZWQgaXMgYWxsb3dlZFxyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiBhbGxvd01peGVkID09PSB0cnVlKSB7XHJcblx0XHRcdFx0c3RhcnQgPSBzdGFydC5yZXBsYWNlKC8mbHQ7L2csICc8JylcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcclxuXHRcdFx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKHN0YXJ0KTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcnMgSFRNTCB2YWx1ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIEh0IE1sIGxpa2UgdGhlIEJCQ29kZSBwbHVnaW5cclxuXHRcdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyAoQkJDb2RlKSB1bmxlc3MgdGhlXHJcblx0XHQgKiBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIGZhbHNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBnZXRXeXNpd3lnRWRpdG9yVmFsdWVcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZ2V0V3lzaXd5Z0VkaXRvclZhbHVlID0gZnVuY3Rpb24gKGZpbHRlcjogYm9vbGVhbik6IHN0cmluZyB7XHJcblx0XHRcdGxldCBodG1sO1xyXG5cdFx0XHQvLyBDcmVhdGUgYSB0bXAgbm9kZSB0byBzdG9yZSBjb250ZW50cyBzbyBpdCBjYW4gYmUgbW9kaWZpZWRcclxuXHRcdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgYW55dGhpbmcgZWxzZS5cclxuXHRcdFx0bGV0IHRtcCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0bGV0IGNoaWxkTm9kZXMgPSB3eXNpd3lnQm9keS5jaGlsZE5vZGVzO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRtcCwgY2hpbGROb2Rlc1tpXS5jbG9uZU5vZGUodHJ1ZSkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIHRtcCk7XHJcblx0XHRcdGRvbS5maXhOZXN0aW5nKHRtcCk7XHJcblx0XHRcdGRvbS5yZW1vdmUodG1wKTtcclxuXHJcblx0XHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0Ly8gZmlsdGVyIHRoZSBIVE1MIGFuZCBET00gdGhyb3VnaCBhbnkgcGx1Z2luc1xyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZm9ybWF0LCAndG9Tb3VyY2UnKSkge1xyXG5cdFx0XHRcdGh0bWwgPSBmb3JtYXQudG9Tb3VyY2UoaHRtbCwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGh0bWw7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9yJ3MgaUZyYW1lIEJvZHkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICogQG5hbWUgZ2V0Qm9keVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRCb2R5ID0gZnVuY3Rpb24gKCk6IEhUTUxCb2R5RWxlbWVudCB7XHJcblx0XHRcdHJldHVybiB3eXNpd3lnQm9keTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcnMgY29udGFpbmVyIGFyZWEgKHdob2xlIGlGcmFtZSkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICogQG5hbWUgZ2V0Q29udGVudEFyZWFDb250YWluZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZ2V0Q29udGVudEFyZWFDb250YWluZXIgPSBmdW5jdGlvbiAoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHRyZXR1cm4gd3lzaXd5Z0VkaXRvcjtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRXhlY3V0ZXMgYSBjb21tYW5kIG9uIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjb21tYW5kXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ3xCb29sZWFufSBbcGFyYW1dXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGV4ZWNDb21tYW5kXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmV4ZWNDb21tYW5kID0gZnVuY3Rpb24gKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IGFueSk6IHZvaWQge1xyXG5cdFx0XHRsZXQgZXhlY3V0ZWQgPSBmYWxzZSwgY29tbWFuZE9iaiA9IHRoaXMuY29tbWFuZHNbY29tbWFuZF07XHJcblxyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblxyXG5cdFx0XHQvLyBUT0RPOiBtYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0XHQvLyBkb24ndCBhcHBseSBhbnkgY29tbWFuZHMgdG8gY29kZSBlbGVtZW50c1xyXG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QocmFuZ2VIZWxwZXIucGFyZW50Tm9kZSgpLCAnY29kZScpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGV4ZWN1dGVkID0gd3lzaXd5Z0RvY3VtZW50LmV4ZWNDb21tYW5kKGNvbW1hbmQsIGZhbHNlLCBwYXJhbSk7XHJcblx0XHRcdH0gY2F0Y2ggKGV4KSB7IC8qIGVtcHR5ICovIH1cclxuXHJcblx0XHRcdC8vIHNob3cgZXJyb3IgaWYgZXhlY3V0aW9uIGZhaWxlZCBhbmQgYW4gZXJyb3IgbWVzc2FnZSBleGlzdHNcclxuXHRcdFx0aWYgKCFleGVjdXRlZCAmJiBjb21tYW5kT2JqICYmIGNvbW1hbmRPYmouZXJyb3JNZXNzYWdlKSB7XHJcblx0XHRcdFx0YWxlcnQodGhpcy5fKGNvbW1hbmRPYmouZXJyb3JNZXNzYWdlKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBjdXJyZW50IG5vZGUgdGhhdCBjb250YWlucyB0aGUgc2VsZWN0aW9uL2NhcmV0IGluXHJcblx0XHQgKiBXWVNJV1lHIG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gez9Ob2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjdXJyZW50Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jdXJyZW50Tm9kZSA9IGZ1bmN0aW9uICgpOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudE5vZGU7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIG5vZGUgdGhhdCBjb250YWlucyB0aGVcclxuXHRcdCAqIHNlbGVjdGlvbi9jYXJldCBpbiBXWVNJV1lHIG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gez9Ob2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjdXJyZW50QmxvY2tOb2RlXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC40XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY3VycmVudEJsb2NrTm9kZSA9IGZ1bmN0aW9uICgpOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gY3VycmVudEJsb2NrTm9kZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUcmFuc2xhdGVzIHRoZSBzdHJpbmcgaW50byB0aGUgbG9jYWxlIGxhbmd1YWdlLlxyXG5cdFx0ICpcclxuXHRcdCAqIFJlcGxhY2VzIGFueSB7MH0sIHsxfSwgezJ9LCBlY3QuIHdpdGggdGhlIHBhcmFtcyBwcm92aWRlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcblx0XHQgKiBAcGFyYW0gey4uLlN0cmluZ30gYXJnc1xyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBfXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl8gPSBmdW5jdGlvbiAoKTogc3RyaW5nIHtcclxuXHRcdFx0bGV0IHVuZGVmOiBhbnksIGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG5cdFx0XHRpZiAobG9jYWxlICYmIGxvY2FsZVthcmdzWzBdXSkge1xyXG5cdFx0XHRcdGFyZ3NbMF0gPSBsb2NhbGVbYXJnc1swXV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhcmdzWzBdLnJlcGxhY2UoL1xceyhcXGQrKVxcfS9nLCBmdW5jdGlvbiAoc3RyPzogYW55LCBwMT86IGFueSkge1xyXG5cdFx0XHRcdHJldHVybiBhcmdzW3AxIC0gMCArIDFdICE9PSB1bmRlZiA/XHJcblx0XHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcclxuXHRcdFx0XHRcdCd7JyArIHAxICsgJ30nO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBCaW5kcyBhIGhhbmRsZXIgdG8gdGhlIHNwZWNpZmllZCBldmVudHNcclxuXHRcdCAqXHJcblx0XHQgKiBUaGlzIGZ1bmN0aW9uIG9ubHkgYmluZHMgdG8gYSBsaW1pdGVkIGxpc3Qgb2ZcclxuXHRcdCAqIHN1cHBvcnRlZCBldmVudHMuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIHN1cHBvcnRlZCBldmVudHMgYXJlOlxyXG5cdFx0ICpcclxuXHRcdCAqICoga2V5dXBcclxuXHRcdCAqICoga2V5ZG93blxyXG5cdFx0ICogKiBLZXlwcmVzc1xyXG5cdFx0ICogKiBibHVyXHJcblx0XHQgKiAqIGZvY3VzXHJcblx0XHQgKiAqIGlucHV0XHJcblx0XHQgKiAqIG5vZGVjaGFuZ2VkIC0gV2hlbiB0aGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmdcclxuXHRcdCAqIFx0XHR0aGUgc2VsZWN0aW9uIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlXHJcblx0XHQgKiAqIGNvbnRleHRtZW51XHJcblx0XHQgKiAqIHNlbGVjdGlvbmNoYW5nZWRcclxuXHRcdCAqICogdmFsdWVjaGFuZ2VkXHJcblx0XHQgKlxyXG5cdFx0ICpcclxuXHRcdCAqIFRoZSBldmVudHMgcGFyYW0gc2hvdWxkIGJlIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50KHMpXHJcblx0XHQgKiB0byBiaW5kIHRoaXMgaGFuZGxlciB0by4gSWYgbXVsdGlwbGUsIHRoZXkgc2hvdWxkIGJlIHNlcGFyYXRlZFxyXG5cdFx0ICogYnkgc3BhY2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge0VtbEVkaXRvcn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgYmluZFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmJpbmQgPSBmdW5jdGlvbiAoZXZlbnRzOiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGxldCBldmVudHNBcnIgPSBldmVudHMuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRcdGxldCBpID0gZXZlbnRzQXJyLmxlbmd0aDtcclxuXHRcdFx0d2hpbGUgKGktLSkge1xyXG5cdFx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0XHRsZXQgd3lzRXZlbnQgPSAnc2Nld3lzJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHRcdGxldCBzcmNFdmVudCA9ICdzY2VzcmMnICsgZXZlbnRzQXJyW2ldO1xyXG5cdFx0XHRcdFx0Ly8gVXNlIGN1c3RvbSBldmVudHMgdG8gYWxsb3cgcGFzc2luZyB0aGUgaW5zdGFuY2UgYXMgdGhlXHJcblx0XHRcdFx0XHQvLyAybmQgYXJndW1lbnQuXHJcblx0XHRcdFx0XHQvLyBBbHNvIGFsbG93cyB1bmJpbmRpbmcgd2l0aG91dCB1bmJpbmRpbmcgdGhlIGVkaXRvcnMgb3duXHJcblx0XHRcdFx0XHQvLyBldmVudCBoYW5kbGVycy5cclxuXHRcdFx0XHRcdGlmICghZXhjbHVkZVd5c2l3eWcpIHtcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gPSBldmVudEhhbmRsZXJzW3d5c0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0gPSBldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBTdGFydCBzZW5kaW5nIHZhbHVlIGNoYW5nZWQgZXZlbnRzXHJcblx0XHRcdFx0XHRpZiAoZXZlbnRzQXJyW2ldID09PSAndmFsdWVjaGFuZ2VkJykge1xyXG5cdFx0XHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkLmhhc0hhbmRsZXIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVW5iaW5kcyBhbiBldmVudCB0aGF0IHdhcyBib3VuZCB1c2luZyBiaW5kKCkuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBldmVudHNcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyIGZyb20gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBpZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyIGZyb20gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHVuYmluZFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICogQHNlZSBiaW5kXHJcblx0XHQgKi9cclxuXHRcdHRoaXMudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRsZXQgZXZlbnRzQXJyID0gZXZlbnRzLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHRsZXQgaSA9IGV2ZW50c0Fyci5sZW5ndGg7XHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlV3lzaXd5Zykge1xyXG5cdFx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0XHRldmVudEhhbmRsZXJzWydzY2V3eXMnICsgZXZlbnRzQXJyW2ldXSB8fCBbXSwgaGFuZGxlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHRcdHV0aWxzLmFycmF5UmVtb3ZlKFxyXG5cdFx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbJ3NjZXNyYycgKyBldmVudHNBcnJbaV1dIHx8IFtdLCBoYW5kbGVyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgZG93biBldmVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUga2V5RG93blxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmtleURvd24gPSBmdW5jdGlvbiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5ZG93bicsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUga2V5IHByZXNzIGV2ZW50XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBrZXlQcmVzc1xyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmtleVByZXNzID0gZnVuY3Rpb24gKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdHJldHVybiB0aGlzXHJcblx0XHRcdFx0LmJpbmQoJ2tleXByZXNzJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgdXAgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGtleVVwXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKi9cclxuXHRcdHRoaXMua2V5VXAgPSBmdW5jdGlvbiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5dXAnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXHJcblx0XHQgKlxyXG5cdFx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgbm9kZSBjb250YWluaW5nIHRoZSBzZWxlY3Rpb24vY2FyZXRcclxuXHRcdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBub2RlQ2hhbmdlZFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm5vZGVDaGFuZ2VkID0gZnVuY3Rpb24gKGhhbmRsZXI6IEZ1bmN0aW9uKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYmluZCgnbm9kZWNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHNlbGVjdGlvbiBjaGFuZ2VkIGV2ZW50XHJcblx0XHQgKlxyXG5cdFx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgc2VsZWN0aW9uIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3Rpb25DaGFuZ2VkXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc2VsZWN0aW9uQ2hhbmdlZCA9IGZ1bmN0aW9uIChoYW5kbGVyOiBGdW5jdGlvbik6IGFueSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmJpbmQoJ3NlbGVjdGlvbmNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHZhbHVlIGNoYW5nZWQgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBjdXJyZW50IGVkaXRvciB2YWx1ZSBjaGFuZ2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdFx0ICogMS41IHNlY3MgYWZ0ZXIgdGV4dCBpcyB0eXBlZC4gSWYgYSBzcGFjZSBpcyB0eXBlZCBpdCB3aWxsXHJcblx0XHQgKiBjYXVzZSB0aGUgZXZlbnQgdG8gYmUgdHJpZ2dlcmVkIGltbWVkaWF0ZWx5IGluc3RlYWQgb2ZcclxuXHRcdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy52YWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIHRoaXNcclxuXHRcdFx0XHQuYmluZCgndmFsdWVjaGFuZ2VkJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGN1cnJlbnQgV1lTSVdZRyBlZGl0b3JzIGlubGluZSBDU1NcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNzc1xyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgaW5saW5lIENTUyBmb3IgdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNzc1xyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY3NzXjJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjNcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jc3MgPSBmdW5jdGlvbiAoY3NzOiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0XHRpZiAoIWlubGluZUNzcykge1xyXG5cdFx0XHRcdGlubGluZUNzcyA9IGRvbS5jcmVhdGVFbGVtZW50KCdzdHlsZScsIHtcclxuXHRcdFx0XHRcdGlkOiAnaW5saW5lJ1xyXG5cdFx0XHRcdH0sIHd5c2l3eWdEb2N1bWVudCkgYXMgSFRNTFN0eWxlRWxlbWVudDtcclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdEb2N1bWVudC5oZWFkLCBpbmxpbmVDc3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKGNzcykpIHtcclxuXHRcdFx0XHRyZXR1cm4gaW5saW5lQ3NzLnNoZWV0ID9cclxuXHRcdFx0XHRcdGlubGluZUNzcy5pbm5lclRleHQgOiBpbmxpbmVDc3MuaW5uZXJIVE1MO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaW5saW5lQ3NzLnNoZWV0KSB7XHJcblx0XHRcdFx0aW5saW5lQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpbmxpbmVDc3MuaW5uZXJIVE1MID0gY3NzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmVzIGEgc2hvcnRjdXQgaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBzaG9ydGN1dFxyXG5cdFx0ICogQHJldHVybiB7RW1sRWRpdG9yfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnJlbW92ZVNob3J0Y3V0ID0gZnVuY3Rpb24gKHNob3J0Y3V0OiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0XHRkZWxldGUgc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBzaG9ydGN1dCBoYW5kbGVyIHRvIHRoZSBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgc2hvcnRjdXRcclxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gY21kXHJcblx0XHQgKiBAcmV0dXJuIHtlbWxlZGl0b3J9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuYWRkU2hvcnRjdXQgPSBmdW5jdGlvbiAoc2hvcnRjdXQ6IHN0cmluZywgY21kOiBzdHJpbmcgfCBGdW5jdGlvbik6IGFueSB7XHJcblx0XHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKVxyXG5cdFx0XHRsZXQgc2hvcnRjdXRLZXkgPSBzaG9ydGN1dCBhcyBrZXlvZiB0eXBlb2Ygc2hvcnRjdXRIYW5kbGVycztcclxuXHJcblx0XHRcdGlmICh1dGlscy5pc1N0cmluZyhjbWQpKSB7XHJcblx0XHRcdFx0bGV0IHN0ckNtZCA9IGNtZCBhcyBzdHJpbmc7XHJcblx0XHRcdFx0c2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dEtleV0gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRoYW5kbGVDb21tYW5kKHRvb2xiYXJCdXR0b25zW3N0ckNtZF0sIHRoaXMuY29tbWFuZHNbc3RyQ21kXSk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dEtleV0gPSBjbWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFycyB0aGUgZm9ybWF0dGluZyBvZiB0aGUgcGFzc2VkIGJsb2NrIGVsZW1lbnQuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgYmxvY2sgaXMgZmFsc2UsIGlmIHdpbGwgY2xlYXIgdGhlIHN0eWxpbmcgb2YgdGhlIGZpcnN0XHJcblx0XHQgKiBibG9jayBsZXZlbCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGN1cnNvci5cclxuXHRcdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBibG9ja1xyXG5cdFx0ICogQHNpbmNlIDEuNC40XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2xlYXJCbG9ja0Zvcm1hdHRpbmcgPSBmdW5jdGlvbiAoYmxvY2s6IEhUTUxFbGVtZW50KTogYW55IHtcclxuXHRcdFx0YmxvY2sgPSBibG9jayB8fCBjdXJyZW50U3R5bGVkQmxvY2tOb2RlKCk7XHJcblxyXG5cdFx0XHRpZiAoIWJsb2NrIHx8IGRvbS5pcyhibG9jaywgJ2JvZHknKSkge1xyXG5cdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdGJsb2NrLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuXHRcdFx0ZG9tLmF0dHIoYmxvY2ssICdzdHlsZScsICcnKTtcclxuXHJcblx0XHRcdGlmICghZG9tLmlzKGJsb2NrLCAncCxkaXYsdGQnKSkge1xyXG5cdFx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChibG9jaywgJ3AnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0XHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdCA9ICgpID0+IHtcclxuXHRcdFx0dGV4dGFyZWEuX3NjZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdC8vIExvYWQgbG9jYWxlXHJcblx0XHRcdGlmIChvcHRpb25zLmxvY2FsZSAmJiBvcHRpb25zLmxvY2FsZSAhPT0gJ2VuJykge1xyXG5cdFx0XHRcdGluaXRMb2NhbGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWRpdG9yQ29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItY29udGFpbmVyJyxcclxuXHRcdFx0fSkgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGVkaXRvckNvbnRhaW5lciwgdGV4dGFyZWEpO1xyXG5cdFx0XHRkb20uY3NzKGVkaXRvckNvbnRhaW5lciwgJ3otaW5kZXgnLCBvcHRpb25zLnpJbmRleCk7XHJcblxyXG5cdFx0XHRpc1JlcXVpcmVkID0gdGV4dGFyZWEucmVxdWlyZWQ7XHJcblx0XHRcdHRleHRhcmVhLnJlcXVpcmVkID0gZmFsc2U7XHJcblxyXG5cdFx0XHRsZXQgRm9ybWF0Q3RvciA9IEVtbEVkaXRvci5mb3JtYXRzW29wdGlvbnMuZm9ybWF0XTtcclxuXHRcdFx0Zm9ybWF0ID0gRm9ybWF0Q3RvciA/IG5ldyBGb3JtYXRDdG9yKCkgOiB7fTtcclxuXHRcdFx0LypcclxuXHRcdFx0ICogUGx1Z2lucyBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIHRoZSBmb3JtYXR0ZXJzIHNpbmNlXHJcblx0XHRcdCAqIHRoZXkgbWF5IHdpc2ggdG8gYWRkIG9yIGNoYW5nZSBmb3JtYXR0aW5nIGhhbmRsZXJzIGFuZFxyXG5cdFx0XHQgKiBzaW5jZSB0aGUgYmJjb2RlIGZvcm1hdCBjYWNoZXMgaXRzIGhhbmRsZXJzLFxyXG5cdFx0XHQgKiBzdWNoIGNoYW5nZXMgbXVzdCBiZSBkb25lIGZpcnN0LlxyXG5cdFx0XHQgKi9cclxuXHRcdFx0cGx1Z2luTWFuYWdlciA9IG5ldyBQbHVnaW5NYW5hZ2VyKHRoaXMpO1xyXG5cdFx0XHQob3B0aW9ucy5wbHVnaW5zIHx8ICcnKS5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbjogYW55KSB7XHJcblx0XHRcdFx0cGx1Z2luTWFuYWdlci5yZWdpc3RlcihwbHVnaW4udHJpbSgpKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICgnaW5pdCcgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0KGZvcm1hdCBhcyBhbnkpLmluaXQuY2FsbCh0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBlZGl0b3JcclxuXHRcdFx0aW5pdEVtb3RpY29ucygpO1xyXG5cdFx0XHRpbml0VG9vbEJhcigpO1xyXG5cdFx0XHRpbml0RWRpdG9yKCk7XHJcblx0XHRcdGluaXRPcHRpb25zKCk7XHJcblx0XHRcdGluaXRFdmVudHMoKTtcclxuXHJcblx0XHRcdC8vIGZvcmNlIGludG8gc291cmNlIG1vZGUgaWYgaXMgYSBicm93c2VyIHRoYXQgY2FuJ3QgaGFuZGxlXHJcblx0XHRcdC8vIGZ1bGwgZWRpdGluZ1xyXG5cdFx0XHRpZiAoIWJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkKSB7XHJcblx0XHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHRcdGxldCBsb2FkZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZG9tLm9mZihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0XHRhdXRvZm9jdXMoISFvcHRpb25zLmF1dG9mb2N1c0VuZCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhdXRvRXhwYW5kKCk7XHJcblx0XHRcdFx0YXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0XHRcdC8vIFRPRE86IHVzZSBlZGl0b3IgZG9jIGFuZCB3aW5kb3c/XHJcblx0XHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdyZWFkeScpO1xyXG5cdFx0XHRcdGlmICgnb25SZWFkeScgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0XHRmb3JtYXQub25SZWFkeS5jYWxsKHRoaXMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbFdpbiwgJ2xvYWQnLCBudWxsLCBsb2FkZWQpO1xyXG5cdFx0XHRpZiAoZ2xvYmFsRG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0XHRsb2FkZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluaXQgdGhlIGxvY2FsZSB2YXJpYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbG9jYWxlIGlmIHBvc3NpYmxlXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHJldHVybiB2b2lkXHJcblx0XHQgKi9cclxuXHRcdGluaXRMb2NhbGUgPSAoKSA9PiB7XHJcblx0XHRcdGxldCBsYW5nO1xyXG5cclxuXHRcdFx0bG9jYWxlID0gRW1sRWRpdG9yLmxvY2FsZVtvcHRpb25zLmxvY2FsZV07XHJcblxyXG5cdFx0XHRpZiAoIWxvY2FsZSkge1xyXG5cdFx0XHRcdGxhbmcgPSBvcHRpb25zLmxvY2FsZS5zcGxpdCgnLScpO1xyXG5cdFx0XHRcdGxvY2FsZSA9IEVtbEVkaXRvci5sb2NhbGVbbGFuZ1swXV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExvY2FsZSBEYXRlVGltZSBmb3JtYXQgb3ZlcnJpZGVzIGFueSBzcGVjaWZpZWQgaW4gdGhlIG9wdGlvbnNcclxuXHRcdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGUuZGF0ZUZvcm1hdCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZGF0ZUZvcm1hdCA9IGxvY2FsZS5kYXRlRm9ybWF0O1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGlmcmFtZSBhbmQgdGV4dGFyZWFcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGluaXRFZGl0b3IgPSAoKSA9PiB7XHJcblx0XHRcdHNvdXJjZUVkaXRvciA9IGRvbS5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScsIG51bGwpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblx0XHRcdHd5c2l3eWdFZGl0b3IgPSBkb20uY3JlYXRlRWxlbWVudCgnaWZyYW1lJywge1xyXG5cdFx0XHRcdGZyYW1lYm9yZGVyOiBcIjBcIixcclxuXHRcdFx0XHRhbGxvd2Z1bGxzY3JlZW46IFwidHJ1ZVwiXHJcblx0XHRcdH0pIGFzIEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuXHRcdFx0LypcclxuXHRcdFx0ICogVGhpcyBuZWVkcyB0byBiZSBkb25lIHJpZ2h0IGFmdGVyIHRoZXkgYXJlIGNyZWF0ZWQgYmVjYXVzZSxcclxuXHRcdFx0ICogZm9yIGFueSByZWFzb24sIHRoZSB1c2VyIG1heSBub3Qgd2FudCB0aGUgdmFsdWUgdG8gYmUgdGlua2VyZWRcclxuXHRcdFx0ICogYnkgYW55IGZpbHRlcnMuXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRpZiAob3B0aW9ucy5zdGFydEluU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJyk7XHJcblx0XHRcdFx0ZG9tLmhpZGUod3lzaXd5Z0VkaXRvcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3d5c2l3eWdNb2RlJyk7XHJcblx0XHRcdFx0ZG9tLmhpZGUoc291cmNlRWRpdG9yKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFvcHRpb25zLnNwZWxsY2hlY2spIHtcclxuXHRcdFx0XHRkb20uYXR0cihlZGl0b3JDb250YWluZXIsICdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChnbG9iYWxXaW4ubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonKSB7XHJcblx0XHRcdFx0ZG9tLmF0dHIod3lzaXd5Z0VkaXRvciwgJ3NyYycsICdhYm91dDpibGFuaycpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIGVkaXRvciB0byB0aGUgY29udGFpbmVyXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIHd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBzb3VyY2VFZGl0b3IpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogbWFrZSB0aGlzIG9wdGlvbmFsIHNvbWVob3dcclxuXHRcdFx0dGhpcy5kaW1lbnNpb25zKFxyXG5cdFx0XHRcdG9wdGlvbnMud2lkdGggfHwgZG9tLndpZHRoKHRleHRhcmVhKSxcclxuXHRcdFx0XHRvcHRpb25zLmhlaWdodCB8fCBkb20uaGVpZ2h0KHRleHRhcmVhKVxyXG5cdFx0XHQpO1xyXG5cclxuXHRcdFx0Ly8gQWRkIGlvcyB0byBIVE1MIHNvIGNhbiBhcHBseSBDU1MgZml4IHRvIG9ubHkgaXRcclxuXHRcdFx0bGV0IGNsYXNzTmFtZSA9IGJyb3dzZXIuaW9zID8gJyBpb3MnIDogJyc7XHJcblxyXG5cdFx0XHR3eXNpd3lnRG9jdW1lbnQgPSB3eXNpd3lnRWRpdG9yLmNvbnRlbnREb2N1bWVudDtcclxuXHRcdFx0d3lzaXd5Z0RvY3VtZW50Lm9wZW4oKTtcclxuXHRcdFx0d3lzaXd5Z0RvY3VtZW50LndyaXRlKHRlbXBsYXRlcygnaHRtbCcsIHtcclxuXHRcdFx0XHRhdHRyczogJyBjbGFzcz1cIicgKyBjbGFzc05hbWUgKyAnXCInLFxyXG5cdFx0XHRcdHNwZWxsY2hlY2s6IG9wdGlvbnMuc3BlbGxjaGVjayA/ICcnIDogJ3NwZWxsY2hlY2s9XCJmYWxzZVwiJyxcclxuXHRcdFx0XHRjaGFyc2V0OiBvcHRpb25zLmNoYXJzZXQsXHJcblx0XHRcdFx0c3R5bGU6IG9wdGlvbnMuc3R5bGVcclxuXHRcdFx0fSkpO1xyXG5cdFx0XHR3eXNpd3lnRG9jdW1lbnQuY2xvc2UoKTtcclxuXHJcblx0XHRcdHd5c2l3eWdCb2R5ID0gd3lzaXd5Z0RvY3VtZW50LmJvZHkgYXMgSFRNTEJvZHlFbGVtZW50O1xyXG5cdFx0XHR3eXNpd3lnV2luZG93ID0gd3lzaXd5Z0VkaXRvci5jb250ZW50V2luZG93O1xyXG5cclxuXHRcdFx0dGhpcy5yZWFkT25seSghIW9wdGlvbnMucmVhZE9ubHkpO1xyXG5cclxuXHRcdFx0Ly8gaWZyYW1lIG92ZXJmbG93IGZpeCBmb3IgaU9TXHJcblx0XHRcdGlmIChicm93c2VyLmlvcykge1xyXG5cdFx0XHRcdGRvbS5oZWlnaHQod3lzaXd5Z0JvZHksICcxMDAlJyk7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBudWxsLCB0aGlzLmZvY3VzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHRhYkluZGV4ID0gZG9tLmF0dHIodGV4dGFyZWEsICd0YWJpbmRleCcpO1xyXG5cdFx0XHRkb20uYXR0cihzb3VyY2VFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHRcdFx0ZG9tLmF0dHIod3lzaXd5Z0VkaXRvciwgJ3RhYmluZGV4JywgdGFiSW5kZXgpO1xyXG5cclxuXHRcdFx0cmFuZ2VIZWxwZXIgPSBuZXcgUmFuZ2VIZWxwZXIod3lzaXd5Z1dpbmRvdywgbnVsbCwgc2FuaXRpemUpO1xyXG5cclxuXHRcdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRcdGRvbS5oaWRlKHRleHRhcmVhKTtcclxuXHRcdFx0dGhpcy52YWwodGV4dGFyZWEudmFsdWUpO1xyXG5cclxuXHRcdFx0bGV0IHBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fFxyXG5cdFx0XHRcdGRvbS5hdHRyKHRleHRhcmVhLCAncGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRcdGlmIChwbGFjZWhvbGRlcikge1xyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG5cdFx0XHRcdGRvbS5hdHRyKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbml0aWFsaXNlcyBvcHRpb25zXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRpbml0T3B0aW9ucyA9ICgpID0+IHtcclxuXHRcdFx0Ly8gYXV0by11cGRhdGUgb3JpZ2luYWwgdGV4dGJveCBvbiBibHVyIGlmIG9wdGlvbiBzZXQgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAob3B0aW9ucy5hdXRvVXBkYXRlKSB7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIG51bGwsIGF1dG9VcGRhdGUpO1xyXG5cdFx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdibHVyJywgbnVsbCwgYXV0b1VwZGF0ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvcHRpb25zLnJ0bCA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdG9wdGlvbnMucnRsID0gZG9tLmNzcyhzb3VyY2VFZGl0b3IsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucnRsKCEhb3B0aW9ucy5ydGwpO1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMuYXV0b0V4cGFuZCkge1xyXG5cdFx0XHRcdC8vIE5lZWQgdG8gdXBkYXRlIHdoZW4gaW1hZ2VzIChvciBhbnl0aGluZyBlbHNlKSBsb2Fkc1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2xvYWQnLCBudWxsLCBhdXRvRXhwYW5kLCBkb20uRVZFTlRfQ0FQVFVSRSk7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnaW5wdXQga2V5dXAnLCBudWxsLCBhdXRvRXhwYW5kKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMucmVzaXplRW5hYmxlZCkge1xyXG5cdFx0XHRcdGluaXRSZXNpemUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLmF0dHIoZWRpdG9yQ29udGFpbmVyLCAnaWQnLCBvcHRpb25zLmlkKTtcclxuXHRcdFx0dGhpcy5lbW90aWNvbnMob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbml0aWFsaXNlcyBldmVudHNcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGluaXRFdmVudHMgPSAoKSA9PiB7XHJcblx0XHRcdGxldCBmb3JtID0gdGV4dGFyZWEuZm9ybTtcclxuXHRcdFx0bGV0IGNvbXBvc2l0aW9uRXZlbnRzID0gJ2NvbXBvc2l0aW9uc3RhcnQgY29tcG9zaXRpb25lbmQnO1xyXG5cdFx0XHRsZXQgZXZlbnRzVG9Gb3J3YXJkID0gJ2tleWRvd24ga2V5dXAga2V5cHJlc3MgZm9jdXMgYmx1ciBjb250ZXh0bWVudSBpbnB1dCc7XHJcblx0XHRcdGxldCBjaGVja1NlbGVjdGlvbkV2ZW50cyA9ICdvbnNlbGVjdGlvbmNoYW5nZScgaW4gd3lzaXd5Z0RvY3VtZW50ID9cclxuXHRcdFx0XHQnc2VsZWN0aW9uY2hhbmdlJyA6XHJcblx0XHRcdFx0J2tleXVwIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgbW91c2V1cCB0b3VjaGVuZCBjbGljayc7XHJcblxyXG5cdFx0XHRkb20ub24oZ2xvYmFsRG9jLCAnY2xpY2snLCBudWxsLCBoYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHRcdGlmIChmb3JtKSB7XHJcblx0XHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIG51bGwsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdFx0ZG9tLm9uKGZvcm0sICdzdWJtaXQnLCBudWxsLCB0aGlzLnVwZGF0ZU9yaWdpbmFsLCBkb20uRVZFTlRfQ0FQVFVSRSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5vbih3aW5kb3csICdwYWdlaGlkZScsIG51bGwsIHRoaXMudXBkYXRlT3JpZ2luYWwpO1xyXG5cdFx0XHRkb20ub24od2luZG93LCAncGFnZXNob3cnLCBudWxsLCBoYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIG51bGwsIGhhbmRsZUtleVByZXNzKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5ZG93bicsIG51bGwsIGhhbmRsZUtleURvd24pO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXlkb3duJywgbnVsbCwgaGFuZGxlQmFja1NwYWNlKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCBhcHBlbmROZXdMaW5lKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIG51bGwsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIG51bGwsIHZhbHVlQ2hhbmdlZEtleVVwKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAncGFzdGUnLCBudWxsLCBoYW5kbGVQYXN0ZUV2dCk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2N1dCBjb3B5JywgbnVsbCwgaGFuZGxlQ3V0Q29weUV2dCk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgY29tcG9zaXRpb25FdmVudHMsIG51bGwsIGhhbmRsZUNvbXBvc2l0aW9uKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCBjaGVja1NlbGVjdGlvbkV2ZW50cywgbnVsbCwgY2hlY2tTZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCBldmVudHNUb0ZvcndhcmQsIG51bGwsIGhhbmRsZUV2ZW50KTtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLmVtb3RpY29uc0NvbXBhdCAmJiBnbG9iYWxXaW4uZ2V0U2VsZWN0aW9uKSB7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCBlbW90aWNvbnNDaGVja1doaXRlc3BhY2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmICghdGhpcy52YWwoKSkge1xyXG5cdFx0XHRcdFx0ZG9tLmFkZENsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnZm9jdXMnLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRkb20ub24oc291cmNlRWRpdG9yLCAnYmx1cicsIG51bGwsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0XHRkb20ub24oc291cmNlRWRpdG9yLCAna2V5dXAnLCBudWxsLCB2YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdrZXlkb3duJywgbnVsbCwgaGFuZGxlS2V5RG93bik7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGNvbXBvc2l0aW9uRXZlbnRzLCBudWxsLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGV2ZW50c1RvRm9yd2FyZCwgbnVsbCwgaGFuZGxlRXZlbnQpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdEb2N1bWVudCwgJ21vdXNlZG93bicsIG51bGwsIGhhbmRsZU1vdXNlRG93bik7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBudWxsLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0RvY3VtZW50LCAna2V5dXAnLCBudWxsLCBhcHBlbmROZXdMaW5lKTtcclxuXHJcblx0XHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgY2hlY2tOb2RlQ2hhbmdlZCk7XHJcblx0XHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgdXBkYXRlQWN0aXZlQnV0dG9ucyk7XHJcblx0XHRcdC8vIEN1c3RvbSBldmVudHMgdG8gZm9yd2FyZFxyXG5cdFx0XHRkb20ub24oXHJcblx0XHRcdFx0ZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHRcdCdzZWxlY3Rpb25jaGFuZ2VkIHZhbHVlY2hhbmdlZCBub2RlY2hhbmdlZCBwYXN0ZXJhdyBwYXN0ZScsXHJcblx0XHRcdFx0bnVsbCxcclxuXHRcdFx0XHRoYW5kbGVFdmVudFxyXG5cdFx0XHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgdGhlIHRvb2xiYXIgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIGNvbnRhaW5lclxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdFRvb2xCYXIgPSAoKSA9PiB7XHJcblx0XHRcdGxldCBncm91cDogYW55LCBjb21tYW5kcyA9IHRoaXMuY29tbWFuZHMsIGV4Y2x1ZGUgPSAob3B0aW9ucy50b29sYmFyRXhjbHVkZSB8fCAnJykuc3BsaXQoJywnKSwgZ3JvdXBzID0gb3B0aW9ucy50b29sYmFyLnNwbGl0KCd8Jyk7XHJcblxyXG5cdFx0XHR0b29sYmFyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItdG9vbGJhcicsXHJcblx0XHRcdFx0dW5zZWxlY3RhYmxlOiAnb24nXHJcblx0XHRcdH0pIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMuaWNvbnMgaW4gRW1sRWRpdG9yLmljb25zKSB7XHJcblx0XHRcdFx0aWNvbnMgPSBuZXcgRW1sRWRpdG9yLmljb25zW29wdGlvbnMuaWNvbnNdKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHV0aWxzLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiAoXywgbWVudUl0ZW1zKSB7XHJcblx0XHRcdFx0Z3JvdXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWdyb3VwJ1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR1dGlscy5lYWNoKG1lbnVJdGVtcy5zcGxpdCgnLCcpLCBmdW5jdGlvbiAoXywgY29tbWFuZE5hbWUpIHtcclxuXHRcdFx0XHRcdGxldCBidXR0b246IGFueSwgc2hvcnRjdXQsIGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kTmFtZV07XHJcblxyXG5cdFx0XHRcdFx0Ly8gVGhlIGNvbW1hbmROYW1lIG11c3QgYmUgYSB2YWxpZCBjb21tYW5kIGFuZCBub3QgZXhjbHVkZWRcclxuXHRcdFx0XHRcdGlmICghY29tbWFuZCB8fCBleGNsdWRlLmluZGV4T2YoY29tbWFuZE5hbWUpID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHNob3J0Y3V0ID0gY29tbWFuZC5zaG9ydGN1dDtcclxuXHRcdFx0XHRcdGJ1dHRvbiA9IHRlbXBsYXRlcygndG9vbGJhckJ1dHRvbicsIHtcclxuXHRcdFx0XHRcdFx0bmFtZTogY29tbWFuZE5hbWUsXHJcblx0XHRcdFx0XHRcdGRpc3BOYW1lOiB0aGlzLl8oY29tbWFuZC5uYW1lIHx8XHJcblx0XHRcdFx0XHRcdFx0Y29tbWFuZC50b29sdGlwIHx8IGNvbW1hbmROYW1lKVxyXG5cdFx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0XHRpZiAoaWNvbnMgJiYgaWNvbnMuY3JlYXRlKSB7XHJcblx0XHRcdFx0XHRcdGxldCBpY29uID0gaWNvbnMuY3JlYXRlKGNvbW1hbmROYW1lKTtcclxuXHRcdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGljb25zLmNyZWF0ZShjb21tYW5kTmFtZSksXHJcblx0XHRcdFx0XHRcdFx0XHRidXR0b24uZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRidXR0b24uX3NjZVR4dE1vZGUgPSAhIWNvbW1hbmQudHh0RXhlYztcclxuXHRcdFx0XHRcdGJ1dHRvbi5fc2NlV3lzaXd5Z01vZGUgPSAhIWNvbW1hbmQuZXhlYztcclxuXHRcdFx0XHRcdGRvbS50b2dnbGVDbGFzcyhidXR0b24sICdkaXNhYmxlZCcsICFjb21tYW5kLmV4ZWMpO1xyXG5cdFx0XHRcdFx0ZG9tLm9uKGJ1dHRvbiwgJ2NsaWNrJywgbnVsbCwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCFkb20uaGFzQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZUNvbW1hbmQoYnV0dG9uLCBjb21tYW5kKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdC8vIFByZXZlbnQgZWRpdG9yIGxvc2luZyBmb2N1cyB3aGVuIGJ1dHRvbiBjbGlja2VkXHJcblx0XHRcdFx0XHRkb20ub24oYnV0dG9uLCAnbW91c2Vkb3duJywgbnVsbCwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jbG9zZURyb3BEb3duKCk7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGlmIChjb21tYW5kLnRvb2x0aXApIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmF0dHIoYnV0dG9uLCAndGl0bGUnLFxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuXyhjb21tYW5kLnRvb2x0aXApICtcclxuXHRcdFx0XHRcdFx0XHQoc2hvcnRjdXQgPyAnICgnICsgc2hvcnRjdXQgKyAnKScgOiAnJylcclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoc2hvcnRjdXQpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hZGRTaG9ydGN1dChzaG9ydGN1dCwgY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChjb21tYW5kLnN0YXRlKSB7XHJcblx0XHRcdFx0XHRcdGJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTogY29tbWFuZE5hbWUsXHJcblx0XHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuc3RhdGVcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdC8vIGV4ZWMgc3RyaW5nIGNvbW1hbmRzIGNhbiBiZSBwYXNzZWQgdG8gcXVlcnlDb21tYW5kU3RhdGVcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY29tbWFuZC5leGVjKSkge1xyXG5cdFx0XHRcdFx0XHRidG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlOiBjb21tYW5kLmV4ZWNcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGdyb3VwLCBidXR0b24pO1xyXG5cdFx0XHRcdFx0dG9vbGJhckJ1dHRvbnNbY29tbWFuZE5hbWVdID0gYnV0dG9uO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvLyBFeGNsdWRlIGVtcHR5IGdyb3Vwc1xyXG5cdFx0XHRcdGlmIChncm91cC5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodG9vbGJhciwgZ3JvdXApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBBcHBlbmQgdGhlIHRvb2xiYXIgdG8gdGhlIHRvb2xiYXJDb250YWluZXIgb3B0aW9uIGlmIGdpdmVuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChvcHRpb25zLnRvb2xiYXJDb250YWluZXIgfHwgZWRpdG9yQ29udGFpbmVyLCB0b29sYmFyKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDcmVhdGVzIHRoZSByZXNpemVyLlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdFJlc2l6ZSA9ICgpID0+IHtcclxuXHRcdFx0bGV0IG1pbkhlaWdodDogYW55LCBtYXhIZWlnaHQ6IGFueSwgbWluV2lkdGg6IGFueSwgbWF4V2lkdGg6IGFueSwgbW91c2VNb3ZlRnVuYzogYW55LCBtb3VzZVVwRnVuYzogYW55LCBncmlwID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItZ3JpcCdcclxuXHRcdFx0fSksXHJcblx0XHRcdFx0Ly8gQ292ZXIgaXMgdXNlZCB0byBjb3ZlciB0aGUgZWRpdG9yIGlmcmFtZSBzbyBkb2N1bWVudFxyXG5cdFx0XHRcdC8vIHN0aWxsIGdldHMgbW91c2UgbW92ZSBldmVudHNcclxuXHRcdFx0XHRjb3ZlciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItcmVzaXplLWNvdmVyJ1xyXG5cdFx0XHRcdH0pLCBtb3ZlRXZlbnRzID0gJ3RvdWNobW92ZSBtb3VzZW1vdmUnLCBlbmRFdmVudHMgPSAndG91Y2hjYW5jZWwgdG91Y2hlbmQgbW91c2V1cCcsIHN0YXJ0WCA9IDAsIHN0YXJ0WSA9IDAsIG5ld1ggPSAwLCBuZXdZID0gMCwgc3RhcnRXaWR0aCA9IDAsIHN0YXJ0SGVpZ2h0ID0gMCwgb3JpZ1dpZHRoID0gZG9tLndpZHRoKGVkaXRvckNvbnRhaW5lciksIG9yaWdIZWlnaHQgPSBkb20uaGVpZ2h0KGVkaXRvckNvbnRhaW5lciksIGlzRHJhZ2dpbmcgPSBmYWxzZSwgcnRsID0gdGhpcy5ydGwoKTtcclxuXHJcblx0XHRcdG1pbkhlaWdodCA9IG9wdGlvbnMucmVzaXplTWluSGVpZ2h0IHx8IG9yaWdIZWlnaHQgLyAxLjU7XHJcblx0XHRcdG1heEhlaWdodCA9IG9wdGlvbnMucmVzaXplTWF4SGVpZ2h0IHx8IG9yaWdIZWlnaHQgKiAyLjU7XHJcblx0XHRcdG1pbldpZHRoID0gb3B0aW9ucy5yZXNpemVNaW5XaWR0aCB8fCBvcmlnV2lkdGggLyAxLjI1O1xyXG5cdFx0XHRtYXhXaWR0aCA9IG9wdGlvbnMucmVzaXplTWF4V2lkdGggfHwgb3JpZ1dpZHRoICogMS4yNTtcclxuXHJcblx0XHRcdG1vdXNlTW92ZUZ1bmMgPSBmdW5jdGlvbiAoZTogYW55KSB7XHJcblx0XHRcdFx0Ly8gaU9TIHVzZXMgd2luZG93LmV2ZW50XHJcblx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcclxuXHRcdFx0XHRcdGUgPSBnbG9iYWxXaW4uZXZlbnQ7XHJcblx0XHRcdFx0XHRuZXdYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRcdG5ld1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRuZXdYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRcdG5ld1kgPSBlLnBhZ2VZO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IG5ld0hlaWdodCA9IHN0YXJ0SGVpZ2h0ICsgKG5ld1kgLSBzdGFydFkpLCBuZXdXaWR0aCA9IHJ0bCA/XHJcblx0XHRcdFx0XHRzdGFydFdpZHRoIC0gKG5ld1ggLSBzdGFydFgpIDpcclxuXHRcdFx0XHRcdHN0YXJ0V2lkdGggKyAobmV3WCAtIHN0YXJ0WCk7XHJcblxyXG5cdFx0XHRcdGlmIChtYXhXaWR0aCA+IDAgJiYgbmV3V2lkdGggPiBtYXhXaWR0aCkge1xyXG5cdFx0XHRcdFx0bmV3V2lkdGggPSBtYXhXaWR0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1pbldpZHRoID4gMCAmJiBuZXdXaWR0aCA8IG1pbldpZHRoKSB7XHJcblx0XHRcdFx0XHRuZXdXaWR0aCA9IG1pbldpZHRoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzaXplV2lkdGgpIHtcclxuXHRcdFx0XHRcdG5ld1dpZHRoID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG1heEhlaWdodCA+IDAgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRuZXdIZWlnaHQgPSBtYXhIZWlnaHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChtaW5IZWlnaHQgPiAwICYmIG5ld0hlaWdodCA8IG1pbkhlaWdodCkge1xyXG5cdFx0XHRcdFx0bmV3SGVpZ2h0ID0gbWluSGVpZ2h0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzaXplSGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRuZXdIZWlnaHQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAobmV3V2lkdGggfHwgbmV3SGVpZ2h0KSB7XHJcblx0XHRcdFx0XHR0aGlzLmRpbWVuc2lvbnMobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRtb3VzZVVwRnVuYyA9IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuXHRcdFx0XHRpZiAoIWlzRHJhZ2dpbmcpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0ZG9tLmhpZGUoY292ZXIpO1xyXG5cdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhlZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgZW5kRXZlbnRzLCBudWxsLCBtb3VzZVVwRnVuYyk7XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmIChpY29ucyAmJiBpY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0XHRsZXQgaWNvbiA9IGljb25zLmNyZWF0ZSgnZ3JpcCcpO1xyXG5cdFx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZ3JpcCwgaWNvbik7XHJcblx0XHRcdFx0XHRkb20uYWRkQ2xhc3MoZ3JpcCwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBncmlwKTtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgY292ZXIpO1xyXG5cdFx0XHRkb20uaGlkZShjb3Zlcik7XHJcblxyXG5cdFx0XHRkb20ub24oZ3JpcCwgJ3RvdWNoc3RhcnQgbW91c2Vkb3duJywgbnVsbCwgZnVuY3Rpb24gKGU6IGFueSkge1xyXG5cdFx0XHRcdC8vIGlPUyB1c2VzIHdpbmRvdy5ldmVudFxyXG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG5cdFx0XHRcdFx0ZSA9IGdsb2JhbFdpbi5ldmVudDtcclxuXHRcdFx0XHRcdHN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRcdHN0YXJ0WSA9IGUudG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3RhcnRYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRcdHN0YXJ0WSA9IGUucGFnZVk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzdGFydFdpZHRoID0gZG9tLndpZHRoKGVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdFx0c3RhcnRIZWlnaHQgPSBkb20uaGVpZ2h0KGVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdFx0aXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRcdGRvbS5zaG93KGNvdmVyKTtcclxuXHRcdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG51bGwsIG1vdXNlVXBGdW5jKTtcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBQcmVmaXhlcyBhbmQgcHJlbG9hZHMgdGhlIGVtb3RpY29uIGltYWdlc1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdEVtb3RpY29ucyA9ICgpID0+IHtcclxuXHRcdFx0bGV0IGVtb3RpY29ucyA9IG9wdGlvbnMuZW1vdGljb25zO1xyXG5cdFx0XHRsZXQgcm9vdCA9IG9wdGlvbnMuZW1vdGljb25zUm9vdCB8fCAnJztcclxuXHJcblx0XHRcdGlmIChlbW90aWNvbnMpIHtcclxuXHRcdFx0XHRhbGxFbW90aWNvbnMgPSB1dGlscy5leHRlbmQoXHJcblx0XHRcdFx0XHR7fSwgZW1vdGljb25zLm1vcmUsIGVtb3RpY29ucy5kcm9wZG93biwgZW1vdGljb25zLmhpZGRlblxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCB1cmwpIHtcclxuXHRcdFx0XHRhbGxFbW90aWNvbnNba2V5XSA9IHRlbXBsYXRlcygnZW1vdGljb24nLCB7XHJcblx0XHRcdFx0XHRrZXk6IGtleSxcclxuXHRcdFx0XHRcdC8vIFByZWZpeCBlbW90aWNvbiByb290IHRvIGVtb3RpY29uIHVybHNcclxuXHRcdFx0XHRcdHVybDogcm9vdCArICh1cmwudXJsIHx8IHVybCksXHJcblx0XHRcdFx0XHR0b29sdGlwOiB1cmwudG9vbHRpcCB8fCBrZXlcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly8gUHJlbG9hZCB0aGUgZW1vdGljb25cclxuXHRcdFx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0XHRwcmVMb2FkQ2FjaGUucHVzaChkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0XHRzcmM6IHJvb3QgKyAodXJsLnVybCB8fCB1cmwpXHJcblx0XHRcdFx0XHR9KSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBdXRvZm9jdXMgdGhlIGVkaXRvclxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0YXV0b2ZvY3VzID0gKGZvY3VzRW5kOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IHJhbmdlLCB0eHRQb3MsIG5vZGUgPSB3eXNpd3lnQm9keS5maXJzdENoaWxkO1xyXG5cclxuXHRcdFx0Ly8gQ2FuJ3QgZm9jdXMgaW52aXNpYmxlIGVsZW1lbnRzXHJcblx0XHRcdGlmICghZG9tLmlzVmlzaWJsZShlZGl0b3JDb250YWluZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHR0eHRQb3MgPSBmb2N1c0VuZCA/IHNvdXJjZUVkaXRvci52YWx1ZS5sZW5ndGggOiAwO1xyXG5cclxuXHRcdFx0XHRzb3VyY2VFZGl0b3Iuc2V0U2VsZWN0aW9uUmFuZ2UodHh0UG9zLCB0eHRQb3MpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKHd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdGlmICghKG5vZGUgPSB3eXNpd3lnQm9keS5sYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0XHRub2RlID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3eXNpd3lnQm9keSwgbm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR3aGlsZSAobm9kZS5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLmxhc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0XHQvLyBTaG91bGQgcGxhY2UgdGhlIGN1cnNvciBiZWZvcmUgdGhlIGxhc3QgPGJyPlxyXG5cdFx0XHRcdFx0aWYgKGRvbS5pcyhub2RlLCAnYnInKSAmJiBub2RlLnByZXZpb3VzU2libGluZykge1xyXG5cdFx0XHRcdFx0XHRub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZSA9IHd5c2l3eWdEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKCFkb20uY2FuSGF2ZUNoaWxkcmVuKG5vZGUpKSB7XHJcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUobm9kZSk7XHJcblxyXG5cdFx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRBZnRlcihub2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZSghZm9jdXNFbmQpO1xyXG5cdFx0XHRyYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSByYW5nZTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdHd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHd5c2l3eWdCb2R5LnNjcm9sbEhlaWdodDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFVwZGF0ZXMgdGhlIHRvb2xiYXIgdG8gZGlzYWJsZS9lbmFibGUgdGhlIGFwcHJvcHJpYXRlIGJ1dHRvbnNcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGxldCB1cGRhdGVUb29sQmFyID0gKGRpc2FibGU/OiBib29sZWFuKTogdm9pZCA9PiB7XHJcblx0XHRcdGxldCBtb2RlID0gdGhpcy5pblNvdXJjZU1vZGUoKSA/ICdfc2NlVHh0TW9kZScgOiAnX3NjZVd5c2l3eWdNb2RlJztcclxuXHJcblx0XHRcdHV0aWxzLmVhY2godG9vbGJhckJ1dHRvbnMsIGZ1bmN0aW9uIChfLCBidXR0b24pIHtcclxuXHRcdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCBkaXNhYmxlIHx8ICFidXR0b25bbW9kZV0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0YXV0b0V4cGFuZCA9ICgpID0+IHtcclxuXHRcdFx0aWYgKG9wdGlvbnMuYXV0b0V4cGFuZCAmJiAhYXV0b0V4cGFuZFRocm90dGxlKSB7XHJcblx0XHRcdFx0YXV0b0V4cGFuZFRocm90dGxlID0gc2V0VGltZW91dCh0aGlzLmV4cGFuZFRvQ29udGVudCwgMjAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEhhbmRsZXMgYW55IGRvY3VtZW50IGNsaWNrIGFuZCBjbG9zZXMgdGhlIGRyb3Bkb3duIGlmIG9wZW5cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZURvY3VtZW50Q2xpY2sgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdC8vIGlnbm9yZSByaWdodCBjbGlja3NcclxuXHRcdFx0aWYgKGUud2hpY2ggIT09IDMgJiYgZHJvcGRvd24gJiYgIWUuZGVmYXVsdFByZXZlbnRlZCkge1xyXG5cdFx0XHRcdGF1dG9VcGRhdGUoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5jbG9zZURyb3BEb3duKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgY3V0ICYgY29weSBldmVudHNcclxuXHRcdCAqXHJcblx0XHQgKiBCeSBkZWZhdWx0IGJyb3dzZXJzIGFsc28gY29weSBpbmhlcml0ZWQgc3R5bGluZyBmcm9tIHRoZSBzdHlsZXNoZWV0IGFuZFxyXG5cdFx0ICogYnJvd3NlciBkZWZhdWx0IHN0eWxpbmcgd2hpY2ggaXMgdW5uZWNlc3NhcnkuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhpcyB3aWxsIGlnbm9yZSBpbmhlcml0ZWQgc3R5bGVzIGFuZCBvbmx5IGNvcHkgaW5saW5lIHN0eWxpbmcuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVDdXRDb3B5RXZ0ID0gZnVuY3Rpb24gKGU6IGFueSkge1xyXG5cdFx0XHRsZXQgcmFuZ2UgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdGxldCBjb250YWluZXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0bGV0IGZpcnN0UGFyZW50O1xyXG5cclxuXHRcdFx0XHQvLyBDb3B5IGFsbCBpbmxpbmUgcGFyZW50IG5vZGVzIHVwIHRvIHRoZSBmaXJzdCBibG9jayBwYXJlbnQgc28gY2FuXHJcblx0XHRcdFx0Ly8gY29weSBpbmxpbmUgc3R5bGVzXHJcblx0XHRcdFx0bGV0IHBhcmVudCA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xyXG5cdFx0XHRcdHdoaWxlIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdGlmIChwYXJlbnQubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUpIHtcclxuXHRcdFx0XHRcdFx0bGV0IGNsb25lID0gcGFyZW50LmNsb25lTm9kZSgpIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY2xvbmUsIGNvbnRhaW5lci5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRhaW5lciwgY2xvbmUpO1xyXG5cdFx0XHRcdFx0XHRmaXJzdFBhcmVudCA9IGZpcnN0UGFyZW50IHx8IGNsb25lO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZmlyc3RQYXJlbnQgfHwgY29udGFpbmVyLCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG5cdFx0XHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRcdGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L2h0bWwnLCBjb250YWluZXIuaW5uZXJIVE1MKTtcclxuXHJcblx0XHRcdFx0Ly8gVE9ETzogUmVmYWN0b3IgaW50byBwcml2YXRlIHNoYXJlZCBtb2R1bGUgd2l0aCBwbGFpbnRleHQgcGx1Z2luXHJcblx0XHRcdFx0Ly8gaW5uZXJUZXh0IGFkZHMgdHdvIG5ld2xpbmVzIGFmdGVyIDxwPiB0YWdzIHNvIGNvbnZlcnQgdGhlbSB0b1xyXG5cdFx0XHRcdC8vIDxkaXY+IHRhZ3NcclxuXHRcdFx0XHR1dGlscy5lYWNoKGRvbS5maW5kKGNvbnRhaW5lciwgJ3AnKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xyXG5cdFx0XHRcdFx0ZG9tLmNvbnZlcnRFbGVtZW50KGVsbSwgJ2RpdicpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdC8vIFJlbW92ZSBjb2xsYXBzZWQgPGJyPiB0YWdzIGFzIGlubmVyVGV4dCBjb252ZXJ0cyB0aGVtIHRvIG5ld2xpbmVzXHJcblx0XHRcdFx0dXRpbHMuZWFjaChkb20uZmluZChjb250YWluZXIsICdicicpLCBmdW5jdGlvbiAoXywgZWxtKSB7XHJcblx0XHRcdFx0XHRpZiAoIWVsbS5uZXh0U2libGluZyB8fCAhZG9tLmlzSW5saW5lKGVsbS5uZXh0U2libGluZywgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0ZG9tLnJlbW92ZShlbG0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvLyByYW5nZS50b1N0cmluZygpIGRvZXNuJ3QgaW5jbHVkZSBuZXdsaW5lcyBzbyBjYW4ndCB1c2UgdGhhdC5cclxuXHRcdFx0XHQvLyBzZWxlY3Rpb24udG9TdHJpbmcoKSBzZWVtcyB0byB1c2UgdGhlIHNhbWUgbWV0aG9kIGFzIGlubmVyVGV4dFxyXG5cdFx0XHRcdC8vIGJ1dCBuZWVkcyB0byBiZSBub3JtYWxpc2VkIGZpcnN0IHNvIHVzaW5nIGNvbnRhaW5lci5pbm5lclRleHRcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3lzaXd5Z0JvZHksIGNvbnRhaW5lcik7XHJcblx0XHRcdFx0ZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCBjb250YWluZXIuaW5uZXJUZXh0KTtcclxuXHRcdFx0XHRkb20ucmVtb3ZlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICdjdXQnKSB7XHJcblx0XHRcdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyB0aGUgV1lTSVdZRyBlZGl0b3JzIHBhc3RlIGV2ZW50XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVQYXN0ZUV2dCA9IChlOiBDbGlwYm9hcmRFdmVudCkgPT4ge1xyXG5cdFx0XHRsZXQgZWRpdGFibGUgPSB3eXNpd3lnQm9keTtcclxuXHRcdFx0bGV0IGNsaXBib2FyZCA9IGUuY2xpcGJvYXJkRGF0YTtcclxuXHRcdFx0bGV0IGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChmaWxlOiBhbnkpIHtcclxuXHRcdFx0XHRsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0XHRyZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdGhhbmRsZVBhc3RlRGF0YSh7XHJcblx0XHRcdFx0XHRcdGh0bWw6ICc8aW1nIHNyYz1cIicgKyBlLnRhcmdldC5yZXN1bHQgKyAnXCIgLz4nXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly8gTW9kZXJuIGJyb3dzZXJzIHdpdGggY2xpcGJvYXJkIEFQSSAtIGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiBfdmVyeV9cclxuXHRcdFx0Ly8gb2xkIGFuZHJvaWQgd2ViIHZpZXdzIGFuZCBVQyBicm93c2VyIHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCB0aGVcclxuXHRcdFx0Ly8gcGFzdGUgZXZlbnQgYXQgYWxsLlxyXG5cdFx0XHRpZiAoY2xpcGJvYXJkKSB7XHJcblx0XHRcdFx0bGV0IGRhdGE6IGFueSA9IFtdO1xyXG5cdFx0XHRcdGxldCB0eXBlcyA9IGNsaXBib2FyZC50eXBlcztcclxuXHRcdFx0XHRsZXQgaXRlbXMgPSBjbGlwYm9hcmQuaXRlbXM7XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0Ly8gV29yZCBzb21ldGltZXMgYWRkcyBjb3BpZWQgdGV4dCBhcyBhbiBpbWFnZSBzbyBpZiBIVE1MXHJcblx0XHRcdFx0XHQvLyBleGlzdHMgcHJlZmVyIHRoYXQgb3ZlciBpbWFnZXNcclxuXHRcdFx0XHRcdGlmICh0eXBlcy5pbmRleE9mKCd0ZXh0L2h0bWwnKSA8IDApIHtcclxuXHRcdFx0XHRcdFx0Ly8gTm9ybWFsaXNlIGltYWdlIHBhc3RpbmcgdG8gcGFzdGUgYXMgYSBkYXRhLXVyaVxyXG5cdFx0XHRcdFx0XHRpZiAoZ2xvYmFsV2luLkZpbGVSZWFkZXIgJiYgaXRlbXMgJiZcclxuXHRcdFx0XHRcdFx0XHRJTUFHRV9NSU1FX1JFR0VYLnRlc3QoaXRlbXNbaV0udHlwZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbG9hZEltYWdlKGNsaXBib2FyZC5pdGVtc1tpXS5nZXRBc0ZpbGUoKSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGRhdGFbdHlwZXNbaV1dID0gY2xpcGJvYXJkLmdldERhdGEodHlwZXNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBDYWxsIHBsdWdpbnMgaGVyZSB3aXRoIGZpbGU/XHJcblx0XHRcdFx0ZGF0YS50ZXh0ID0gZGF0YVsndGV4dC9wbGFpbiddO1xyXG5cdFx0XHRcdGRhdGEuaHRtbCA9IHNhbml0aXplKGRhdGFbJ3RleHQvaHRtbCddKTtcclxuXHJcblx0XHRcdFx0aGFuZGxlUGFzdGVEYXRhKGRhdGEpO1xyXG5cdFx0XHRcdC8vIElmIGNvbnRlbnRzRnJhZ21lbnQgZXhpc3RzIHRoZW4gd2UgYXJlIGFscmVhZHkgd2FpdGluZyBmb3IgYVxyXG5cdFx0XHRcdC8vIHByZXZpb3VzIHBhc3RlIHNvIGxldCB0aGUgaGFuZGxlciBmb3IgdGhhdCBoYW5kbGUgdGhpcyBvbmUgdG9vXHJcblx0XHRcdH0gZWxzZSBpZiAoIXBhc3RlQ29udGVudEZyYWdtZW50KSB7XHJcblx0XHRcdFx0Ly8gU2F2ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIHNvIGNhbiBiZSByZXN0b3JlZFxyXG5cdFx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0XHRsZXQgc2Nyb2xsVG9wID0gZWRpdGFibGUuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBnbG9iYWxEb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHRcdHdoaWxlIChlZGl0YWJsZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQocGFzdGVDb250ZW50RnJhZ21lbnQsIGVkaXRhYmxlLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRsZXQgaHRtbCA9IGVkaXRhYmxlLmlubmVySFRNTDtcclxuXHJcblx0XHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0YWJsZSwgcGFzdGVDb250ZW50RnJhZ21lbnQpO1xyXG5cdFx0XHRcdFx0ZWRpdGFibGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0XHRoYW5kbGVQYXN0ZURhdGEoeyBodG1sOiBzYW5pdGl6ZShodG1sKSB9KTtcclxuXHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlcGxhY2VzIGFueSBlbW90aWNvbiBjb2RlcyBpbiB0aGUgcGFzc2VkIEhUTUxcclxuXHRcdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRyZXBsYWNlRW1vdGljb25zID0gKCkgPT4ge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0ZW1vdGljb25zXHJcblx0XHRcdFx0XHQucmVwbGFjZSh3eXNpd3lnQm9keSwgYWxsRW1vdGljb25zLCBvcHRpb25zLmVtb3RpY29uc0NvbXBhdCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgc2VsZWN0ZWQgdGV4dCBvZiB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0c291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0ID0gKCk6IHN0cmluZyA9PiB7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNvdXJjZUVkaXRvci52YWx1ZS5zdWJzdHJpbmcoXHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIHRoZSBwYXNzZWQgY29tbWFuZFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlQ29tbWFuZCA9IChjYWxsZXI6IGFueSwgY21kOiBhbnkpID0+IHtcclxuXHRcdFx0Ly8gY2hlY2sgaWYgaW4gdGV4dCBtb2RlIGFuZCBoYW5kbGUgdGV4dCBjb21tYW5kc1xyXG5cdFx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRcdGlmIChjbWQudHh0RXhlYykge1xyXG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoY21kLnR4dEV4ZWMpKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dC5hcHBseSh0aGlzLCBjbWQudHh0RXhlYyk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjbWQudHh0RXhlYy5jYWxsKHRoaXMsIGNhbGxlciwgc291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0KCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmIChjbWQuZXhlYykge1xyXG5cdFx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGNtZC5leGVjKSkge1xyXG5cdFx0XHRcdFx0Y21kLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmV4ZWNDb21tYW5kKFxyXG5cdFx0XHRcdFx0XHRjbWQuZXhlYyxcclxuXHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNtZCwgJ2V4ZWNQYXJhbScpID8gY21kLmV4ZWNQYXJhbSA6IG51bGxcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXHJcblx0XHQgKiB0aGUgc2VsZWN0aW9uY2hhbmdlZCBldmVudCBpZiBpdCBoYXMuXHJcblx0XHQgKlxyXG5cdFx0ICogSW4gYnJvd3NlcnMgb3RoZXIgdGhhdCBkb24ndCBzdXBwb3J0IHNlbGVjdGlvbmNoYW5nZSBldmVudCBpdCB3aWxsIGNoZWNrXHJcblx0XHQgKiBhdCBtb3N0IG9uY2UgZXZlcnkgMTAwbXMuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRjaGVja1NlbGVjdGlvbkNoYW5nZWQgPSAoKSA9PiB7XHJcblx0XHRcdGZ1bmN0aW9uIGNoZWNrKCkge1xyXG5cdFx0XHRcdC8vIERvbid0IGNyZWF0ZSBuZXcgc2VsZWN0aW9uIGlmIHRoZXJlIGlzbid0IG9uZSAobGlrZSBhZnRlclxyXG5cdFx0XHRcdC8vIGJsdXIgZXZlbnQgaW4gaU9TKVxyXG5cdFx0XHRcdGlmICh3eXNpd3lnV2luZG93LmdldFNlbGVjdGlvbigpICYmXHJcblx0XHRcdFx0XHR3eXNpd3lnV2luZG93LmdldFNlbGVjdGlvbigpLnJhbmdlQ291bnQgPD0gMCkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IG51bGw7XHJcblx0XHRcdFx0XHQvLyByYW5nZUhlbHBlciBjb3VsZCBiZSBudWxsIGlmIGVkaXRvciB3YXMgZGVzdHJveWVkXHJcblx0XHRcdFx0XHQvLyBiZWZvcmUgdGhlIHRpbWVvdXQgaGFkIGZpbmlzaGVkXHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZUhlbHBlciAmJiAhcmFuZ2VIZWxwZXIuY29tcGFyZShjdXJyZW50U2VsZWN0aW9uKSkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdFx0XHQvLyBJZiB0aGUgc2VsZWN0aW9uIGlzIGluIGFuIGlubGluZSB3cmFwIGl0IGluIGEgYmxvY2suXHJcblx0XHRcdFx0XHQvLyBGaXhlcyAjMzMxXHJcblx0XHRcdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uLmNvbGxhcHNlZCkge1xyXG5cdFx0XHRcdFx0XHRsZXQgcGFyZW50ID0gY3VycmVudFNlbGVjdGlvbi5zdGFydENvbnRhaW5lcjtcclxuXHRcdFx0XHRcdFx0bGV0IG9mZnNldCA9IGN1cnJlbnRTZWxlY3Rpb24uc3RhcnRPZmZzZXQ7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0XHRpZiAob2Zmc2V0ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xyXG5cdFx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5jaGlsZE5vZGVzW29mZnNldF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHdoaWxlIChwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgIT09IHd5c2l3eWdCb2R5KSB7XHJcblx0XHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0XHR3cmFwSW5saW5lcyh3eXNpd3lnQm9keSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpc1NlbGVjdGlvbkNoZWNrUGVuZGluZykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXNTZWxlY3Rpb25DaGVja1BlbmRpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgbmVlZCB0byBsaW1pdCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnRzIHRoZSBTZWxlY3Rpb24gQVBJXHJcblx0XHRcdGlmICgnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHd5c2l3eWdEb2N1bWVudCkge1xyXG5cdFx0XHRcdGNoZWNrKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChjaGVjaywgMTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBub2RlIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdFx0ICogdGhlIG5vZGVjaGFuZ2VkIGV2ZW50IGlmIGl0IGhhc1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0Y2hlY2tOb2RlQ2hhbmdlZCA9ICgpID0+IHtcclxuXHRcdFx0Ly8gY2hlY2sgaWYgbm9kZSBoYXMgY2hhbmdlZFxyXG5cdFx0XHRsZXQgb2xkTm9kZSwgbm9kZSA9IHJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50Tm9kZSAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdG9sZE5vZGUgPSBjdXJyZW50Tm9kZTtcclxuXHRcdFx0XHRjdXJyZW50Tm9kZSA9IG5vZGU7XHJcblx0XHRcdFx0Y3VycmVudEJsb2NrTm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ25vZGVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdFx0b2xkTm9kZTogb2xkTm9kZSxcclxuXHRcdFx0XHRcdG5ld05vZGU6IGN1cnJlbnROb2RlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVXBkYXRlcyBpZiBidXR0b25zIGFyZSBhY3RpdmUgb3Igbm90XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zID0gKCkgPT4ge1xyXG5cdFx0XHRsZXQgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0XHRsZXQgYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcclxuXHRcdFx0bGV0IGRvYyA9IHd5c2l3eWdEb2N1bWVudDtcclxuXHRcdFx0bGV0IGlzU291cmNlID0gdGhpcy5zb3VyY2VNb2RlKCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5yZWFkT25seSgpKSB7XHJcblx0XHRcdFx0dXRpbHMuZWFjaChkb20uZmluZCh0b29sYmFyLCBhY3RpdmVDbGFzcyksIGZ1bmN0aW9uIChfLCBtZW51SXRlbSkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKG1lbnVJdGVtLCBhY3RpdmVDbGFzcyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWlzU291cmNlKSB7XHJcblx0XHRcdFx0cGFyZW50ID0gcmFuZ2VIZWxwZXIucGFyZW50Tm9kZSgpO1xyXG5cdFx0XHRcdGZpcnN0QmxvY2sgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgYnRuU3RhdGVIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGxldCBzdGF0ZSA9IDA7XHJcblx0XHRcdFx0bGV0IGJ0biA9IHRvb2xiYXJCdXR0b25zW2J0blN0YXRlSGFuZGxlcnNbal0ubmFtZV07XHJcblx0XHRcdFx0bGV0IHN0YXRlRm4gPSBidG5TdGF0ZUhhbmRsZXJzW2pdLnN0YXRlO1xyXG5cdFx0XHRcdGxldCBpc0Rpc2FibGVkID0gKGlzU291cmNlICYmICFidG4uX3NjZVR4dE1vZGUpIHx8XHJcblx0XHRcdFx0XHQoIWlzU291cmNlICYmICFidG4uX3NjZVd5c2l3eWdNb2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XHJcblx0XHRcdFx0XHRpZiAoIWlzU291cmNlKSB7XHJcblx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0XHRcdGlmIChzdGF0ZSA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRTdGF0ZShzdGF0ZUZuKSA/IDEgOiAwO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIWlzRGlzYWJsZWQpIHtcclxuXHRcdFx0XHRcdHN0YXRlID0gc3RhdGVGbi5jYWxsKHRoaXMsIHBhcmVudCwgZmlyc3RCbG9jayk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkIHx8IHN0YXRlIDwgMCk7XHJcblx0XHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgYWN0aXZlQ2xhc3MsIHN0YXRlID4gMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpY29ucyAmJiBpY29ucy51cGRhdGUpIHtcclxuXHRcdFx0XHRpY29ucy51cGRhdGUoaXNTb3VyY2UsIHBhcmVudCwgZmlyc3RCbG9jayk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIGFueSBrZXkgcHJlc3MgaW4gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlS2V5UHJlc3MgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdC8vIEZGIGJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTAxNDk2XHJcblx0XHRcdGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuY2xvc2VEcm9wRG93bigpO1xyXG5cclxuXHRcdFx0Ly8gMTMgPSBlbnRlciBrZXlcclxuXHRcdFx0aWYgKGUud2hpY2ggPT09IDEzKSB7XHJcblx0XHRcdFx0bGV0IExJU1RfVEFHUyA9ICdsaSx1bCxvbCc7XHJcblxyXG5cdFx0XHRcdC8vIFwiRml4XCIgKGNsdWRnZSkgZm9yIGJsb2NrbGV2ZWwgZWxlbWVudHMgYmVpbmcgZHVwbGljYXRlZCBpbiBzb21lXHJcblx0XHRcdFx0Ly8gYnJvd3NlcnMgd2hlbiBlbnRlciBpcyBwcmVzc2VkIGluc3RlYWQgb2YgaW5zZXJ0aW5nIGEgbmV3bGluZVxyXG5cdFx0XHRcdGlmICghZG9tLmlzKGN1cnJlbnRCbG9ja05vZGUsIExJU1RfVEFHUykgJiZcclxuXHRcdFx0XHRcdGRvbS5oYXNTdHlsaW5nKGN1cnJlbnRCbG9ja05vZGUpKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGJyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2JyJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnROb2RlKGJyKTtcclxuXHJcblx0XHRcdFx0XHQvLyBMYXN0IDxicj4gb2YgYSBibG9jayB3aWxsIGJlIGNvbGxhcHNlZCAgc28gbmVlZCB0byBtYWtlIHN1cmVcclxuXHRcdFx0XHRcdC8vIHRoZSA8YnI+IHRoYXQgd2FzIGluc2VydGVkIGlzbid0IHRoZSBsYXN0IG5vZGUgb2YgYSBibG9jay5cclxuXHRcdFx0XHRcdGxldCBwYXJlbnQgPSBici5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0bGV0IGxhc3RDaGlsZCA9IHBhcmVudC5sYXN0Q2hpbGQgYXMgYW55O1xyXG5cclxuXHRcdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxyXG5cdFx0XHRcdFx0aWYgKGxhc3RDaGlsZCAmJiBsYXN0Q2hpbGQubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgJiZcclxuXHRcdFx0XHRcdFx0bGFzdENoaWxkLm5vZGVWYWx1ZSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdENoaWxkO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgQlIgb2YgYSBibG9jayBhbmQgdGhlIHByZXZpb3VzXHJcblx0XHRcdFx0XHQvLyBzaWJsaW5nIGlzIGlubGluZSB0aGVuIHdpbGwgbmVlZCBhbiBleHRyYSBCUi4gVGhpc1xyXG5cdFx0XHRcdFx0Ly8gaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGxhc3QgQlIgb2YgYSBibG9jayB3aWxsIGJlXHJcblx0XHRcdFx0XHQvLyBjb2xsYXBzZWQuIEZpeGVzIGlzc3VlICMyNDhcclxuXHRcdFx0XHRcdGlmICghZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkgJiYgbGFzdENoaWxkID09PSBiciAmJlxyXG5cdFx0XHRcdFx0XHRkb20uaXNJbmxpbmUoYnIucHJldmlvdXNTaWJsaW5nKSkge1xyXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKCc8YnI+Jyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE1ha2VzIHN1cmUgdGhhdCBpZiB0aGVyZSBpcyBhIGNvZGUgb3IgcXVvdGUgdGFnIGF0IHRoZVxyXG5cdFx0ICogZW5kIG9mIHRoZSBlZGl0b3IsIHRoYXQgdGhlcmUgaXMgYSBuZXcgbGluZSBhZnRlciBpdC5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB0aGVyZSB3YXNuJ3QgYSBuZXcgbGluZSBhdCB0aGUgZW5kIHlvdSB3b3VsZG4ndCBiZSBhYmxlXHJcblx0XHQgKiB0byBlbnRlciBhbnkgdGV4dCBhZnRlciBhIGNvZGUvcXVvdGUgdGFnXHJcblx0XHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0YXBwZW5kTmV3TGluZSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdFx0Ly8gQ2hlY2sgYWxsIG5vZGVzIGluIHJldmVyc2UgdW50aWwgZWl0aGVyIGFkZCBhIG5ldyBsaW5lXHJcblx0XHRcdC8vIG9yIHJlYWNoIGEgbm9uLWVtcHR5IHRleHRub2RlIG9yIEJSIGF0IHdoaWNoIHBvaW50IGNhblxyXG5cdFx0XHQvLyBzdG9wIGNoZWNraW5nLlxyXG5cdFx0XHRkb20uclRyYXZlcnNlKHd5c2l3eWdCb2R5LCBmdW5jdGlvbiAobm9kZTogYW55KSB7XHJcblx0XHRcdFx0Ly8gTGFzdCBibG9jaywgYWRkIG5ldyBsaW5lIGFmdGVyIGlmIGhhcyBzdHlsaW5nXHJcblx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiZcclxuXHRcdFx0XHRcdCEvaW5saW5lLy50ZXN0KGRvbS5jc3Mobm9kZSwgJ2Rpc3BsYXknKSkpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBBZGQgbGluZSBicmVhayBhZnRlciBpZiBoYXMgc3R5bGluZ1xyXG5cdFx0XHRcdFx0aWYgKCFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItbmxmJykgJiYgZG9tLmhhc1N0eWxpbmcobm9kZSkpIHtcclxuXHRcdFx0XHRcdFx0bGV0IHBhcmFncmFwaCA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRcdHBhcmFncmFwaC5jbGFzc05hbWUgPSAnZW1sZWRpdG9yLW5sZic7XHJcblx0XHRcdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSAnPGJyIC8+JztcclxuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBwYXJhZ3JhcGgpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBMYXN0IG5vbi1lbXB0eSB0ZXh0IG5vZGUgb3IgbGluZSBicmVhay5cclxuXHRcdFx0XHQvLyBObyBuZWVkIHRvIGFkZCBsaW5lLWJyZWFrIGFmdGVyIHRoZW1cclxuXHRcdFx0XHRpZiAoKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIS9eXFxzKiQvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB8fFxyXG5cdFx0XHRcdFx0ZG9tLmlzKG5vZGUsICdicicpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIGZvcm0gcmVzZXQgZXZlbnRcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZUZvcm1SZXNldCA9ICgpID0+IHtcclxuXHRcdFx0dGhpcy52YWwodGV4dGFyZWEudmFsdWUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEhhbmRsZXMgYW55IG1vdXNlZG93biBwcmVzcyBpbiB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcclxuXHRcdFx0dGhpcy5jbG9zZURyb3BEb3duKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUGFzc2VzIGV2ZW50cyBvbiB0byBhbnkgaGFuZGxlcnNcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKiBAcmV0dXJuIHZvaWRcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlRXZlbnQgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdGlmIChwbHVnaW5NYW5hZ2VyKSB7XHJcblx0XHRcdFx0Ly8gU2VuZCBldmVudCB0byBhbGwgcGx1Z2luc1xyXG5cdFx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbChlLnR5cGUgKyAnRXZlbnQnLCBlLCB0aGlzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gY29udmVydCB0aGUgZXZlbnQgaW50byBhIGN1c3RvbSBldmVudCB0byBzZW5kXHJcblx0XHRcdGxldCBuYW1lID0gKGUudGFyZ2V0ID09PSBzb3VyY2VFZGl0b3IgPyAnc2Nlc3JjJyA6ICdzY2V3eXMnKSArIGUudHlwZSBhcyBrZXlvZiB0eXBlb2YgZXZlbnRIYW5kbGVycztcclxuXHJcblx0XHRcdGlmIChldmVudEhhbmRsZXJzW25hbWVdKSB7XHJcblx0XHRcdFx0ZXZlbnRIYW5kbGVyc1tuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChmbjogYW55KSB7XHJcblx0XHRcdFx0XHRmbi5jYWxsKHRoaXMsIGUpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRW1vdGljb25zIGtleXByZXNzIGhhbmRsZXJcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGVtb3RpY29uc0tleVByZXNzID0gKGU6IGFueSkgPT4ge1xyXG5cdFx0XHRsZXQgcmVwbGFjZWRFbW90aWNvbiwgY2FjaGVQb3MgPSAwLCBlbW90aWNvbnNDYWNoZSA9IHRoaXMuZW1vdGljb25zQ2FjaGUsIGN1ckNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogTWFrZSBjb25maWd1cmFibGVcclxuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghZW1vdGljb25zQ2FjaGUpIHtcclxuXHRcdFx0XHRlbW90aWNvbnNDYWNoZSA9IFtdO1xyXG5cclxuXHRcdFx0XHR1dGlscy5lYWNoKGFsbEVtb3RpY29ucywgZnVuY3Rpb24gKGtleSwgaHRtbCkge1xyXG5cdFx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbY2FjaGVQb3MrK10gPSBba2V5LCBodG1sXTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGUuc29ydChmdW5jdGlvbiAoYTogYW55LCBiOiBhbnkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBhWzBdLmxlbmd0aCAtIGJbMF0ubGVuZ3RoO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLmVtb3RpY29uc0NhY2hlID0gZW1vdGljb25zQ2FjaGU7XHJcblx0XHRcdFx0dGhpcy5sb25nZXN0RW1vdGljb25Db2RlID1cclxuXHRcdFx0XHRcdGVtb3RpY29uc0NhY2hlW2Vtb3RpY29uc0NhY2hlLmxlbmd0aCAtIDFdWzBdLmxlbmd0aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmVwbGFjZWRFbW90aWNvbiA9IHJhbmdlSGVscGVyLnJlcGxhY2VLZXl3b3JkKFxyXG5cdFx0XHRcdHRoaXMuZW1vdGljb25zQ2FjaGUsXHJcblx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdHRoaXMubG9uZ2VzdEVtb3RpY29uQ29kZSxcclxuXHRcdFx0XHRvcHRpb25zLmVtb3RpY29uc0NvbXBhdCxcclxuXHRcdFx0XHRjdXJDaGFyXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHRpZiAocmVwbGFjZWRFbW90aWNvbikge1xyXG5cdFx0XHRcdGlmICghb3B0aW9ucy5lbW90aWNvbnNDb21wYXQgfHwgIS9eXFxzJC8udGVzdChjdXJDaGFyKSkge1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE1ha2VzIHN1cmUgZW1vdGljb25zIGFyZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2VcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGVtb3RpY29uc0NoZWNrV2hpdGVzcGFjZSA9ICgpID0+IHtcclxuXHRcdFx0ZW1vdGljb25zLmNoZWNrV2hpdGVzcGFjZShjdXJyZW50QmxvY2tOb2RlLCByYW5nZUhlbHBlcik7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEhhbmRsZXMgdGhlIGtleWRvd24gZXZlbnQsIHVzZWQgZm9yIHNob3J0Y3V0c1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChlOiBhbnkpIHtcclxuXHRcdFx0bGV0IHNob3J0Y3V0OiBhbnkgPSBbXSxcclxuXHJcblx0XHRcdFx0U0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdFx0J2AnOiAnficsXHJcblx0XHRcdFx0XHQnMSc6ICchJyxcclxuXHRcdFx0XHRcdCcyJzogJ0AnLFxyXG5cdFx0XHRcdFx0JzMnOiAnIycsXHJcblx0XHRcdFx0XHQnNCc6ICckJyxcclxuXHRcdFx0XHRcdCc1JzogJyUnLFxyXG5cdFx0XHRcdFx0JzYnOiAnXicsXHJcblx0XHRcdFx0XHQnNyc6ICcmJyxcclxuXHRcdFx0XHRcdCc4JzogJyonLFxyXG5cdFx0XHRcdFx0JzknOiAnKCcsXHJcblx0XHRcdFx0XHQnMCc6ICcpJyxcclxuXHRcdFx0XHRcdCctJzogJ18nLFxyXG5cdFx0XHRcdFx0Jz0nOiAnKycsXHJcblx0XHRcdFx0XHQnOyc6ICc6ICcsXHJcblx0XHRcdFx0XHQnXFwnJzogJ1wiJyxcclxuXHRcdFx0XHRcdCcsJzogJzwnLFxyXG5cdFx0XHRcdFx0Jy4nOiAnPicsXHJcblx0XHRcdFx0XHQnLyc6ICc/JyxcclxuXHRcdFx0XHRcdCdcXFxcJzogJ3wnLFxyXG5cdFx0XHRcdFx0J1snOiAneycsXHJcblx0XHRcdFx0XHQnXSc6ICd9J1xyXG5cdFx0XHRcdH0sIFNQRUNJQUxfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdFx0ODogJ2JhY2tzcGFjZScsXHJcblx0XHRcdFx0XHQ5OiAndGFiJyxcclxuXHRcdFx0XHRcdDEzOiAnZW50ZXInLFxyXG5cdFx0XHRcdFx0MTk6ICdwYXVzZScsXHJcblx0XHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcclxuXHRcdFx0XHRcdDI3OiAnZXNjJyxcclxuXHRcdFx0XHRcdDMyOiAnc3BhY2UnLFxyXG5cdFx0XHRcdFx0MzM6ICdwYWdldXAnLFxyXG5cdFx0XHRcdFx0MzQ6ICdwYWdlZG93bicsXHJcblx0XHRcdFx0XHQzNTogJ2VuZCcsXHJcblx0XHRcdFx0XHQzNjogJ2hvbWUnLFxyXG5cdFx0XHRcdFx0Mzc6ICdsZWZ0JyxcclxuXHRcdFx0XHRcdDM4OiAndXAnLFxyXG5cdFx0XHRcdFx0Mzk6ICdyaWdodCcsXHJcblx0XHRcdFx0XHQ0MDogJ2Rvd24nLFxyXG5cdFx0XHRcdFx0NDU6ICdpbnNlcnQnLFxyXG5cdFx0XHRcdFx0NDY6ICdkZWwnLFxyXG5cdFx0XHRcdFx0OTE6ICd3aW4nLFxyXG5cdFx0XHRcdFx0OTI6ICd3aW4nLFxyXG5cdFx0XHRcdFx0OTM6ICdzZWxlY3QnLFxyXG5cdFx0XHRcdFx0OTY6ICcwJyxcclxuXHRcdFx0XHRcdDk3OiAnMScsXHJcblx0XHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdFx0OTk6ICczJyxcclxuXHRcdFx0XHRcdDEwMDogJzQnLFxyXG5cdFx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0XHQxMDI6ICc2JyxcclxuXHRcdFx0XHRcdDEwMzogJzcnLFxyXG5cdFx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0XHQxMDU6ICc5JyxcclxuXHRcdFx0XHRcdDEwNjogJyonLFxyXG5cdFx0XHRcdFx0MTA3OiAnKycsXHJcblx0XHRcdFx0XHQxMDk6ICctJyxcclxuXHRcdFx0XHRcdDExMDogJy4nLFxyXG5cdFx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0XHQxMTI6ICdmMScsXHJcblx0XHRcdFx0XHQxMTM6ICdmMicsXHJcblx0XHRcdFx0XHQxMTQ6ICdmMycsXHJcblx0XHRcdFx0XHQxMTU6ICdmNCcsXHJcblx0XHRcdFx0XHQxMTY6ICdmNScsXHJcblx0XHRcdFx0XHQxMTc6ICdmNicsXHJcblx0XHRcdFx0XHQxMTg6ICdmNycsXHJcblx0XHRcdFx0XHQxMTk6ICdmOCcsXHJcblx0XHRcdFx0XHQxMjA6ICdmOScsXHJcblx0XHRcdFx0XHQxMjE6ICdmMTAnLFxyXG5cdFx0XHRcdFx0MTIyOiAnZjExJyxcclxuXHRcdFx0XHRcdDEyMzogJ2YxMicsXHJcblx0XHRcdFx0XHQxNDQ6ICdudW1sb2NrJyxcclxuXHRcdFx0XHRcdDE0NTogJ3Njcm9sbGxvY2snLFxyXG5cdFx0XHRcdFx0MTg2OiAnOycsXHJcblx0XHRcdFx0XHQxODc6ICc9JyxcclxuXHRcdFx0XHRcdDE4ODogJywnLFxyXG5cdFx0XHRcdFx0MTg5OiAnLScsXHJcblx0XHRcdFx0XHQxOTA6ICcuJyxcclxuXHRcdFx0XHRcdDE5MTogJy8nLFxyXG5cdFx0XHRcdFx0MTkyOiAnYCcsXHJcblx0XHRcdFx0XHQyMTk6ICdbJyxcclxuXHRcdFx0XHRcdDIyMDogJ1xcXFwnLFxyXG5cdFx0XHRcdFx0MjIxOiAnXScsXHJcblx0XHRcdFx0XHQyMjI6ICdcXCcnXHJcblx0XHRcdFx0fSwgTlVNUEFEX1NISUZUX0tFWVM6IGFueSA9IHtcclxuXHRcdFx0XHRcdDEwOTogJy0nLFxyXG5cdFx0XHRcdFx0MTEwOiAnZGVsJyxcclxuXHRcdFx0XHRcdDExMTogJy8nLFxyXG5cdFx0XHRcdFx0OTY6ICcwJyxcclxuXHRcdFx0XHRcdDk3OiAnMScsXHJcblx0XHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdFx0OTk6ICczJyxcclxuXHRcdFx0XHRcdDEwMDogJzQnLFxyXG5cdFx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0XHQxMDI6ICc2JyxcclxuXHRcdFx0XHRcdDEwMzogJzcnLFxyXG5cdFx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0XHQxMDU6ICc5J1xyXG5cdFx0XHRcdH0sIHdoaWNoID0gZS53aGljaCwgY2hhcmFjdGVyID0gU1BFQ0lBTF9LRVlTW3doaWNoXSB8fCBTdHJpbmcuZnJvbUNoYXJDb2RlKHdoaWNoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdFx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcclxuXHRcdFx0XHRzaG9ydGN1dC5wdXNoKCdjdHJsJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlLmFsdEtleSkge1xyXG5cdFx0XHRcdHNob3J0Y3V0LnB1c2goJ2FsdCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZS5zaGlmdEtleSkge1xyXG5cdFx0XHRcdHNob3J0Y3V0LnB1c2goJ3NoaWZ0Jyk7XHJcblxyXG5cdFx0XHRcdGlmIChOVU1QQURfU0hJRlRfS0VZU1t3aGljaF0pIHtcclxuXHRcdFx0XHRcdGNoYXJhY3RlciA9IE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKFNISUZUX0tFWVNbY2hhcmFjdGVyXSkge1xyXG5cdFx0XHRcdFx0Y2hhcmFjdGVyID0gU0hJRlRfS0VZU1tjaGFyYWN0ZXJdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2hpZnQgaXMgMTYsIGN0cmwgaXMgMTcgYW5kIGFsdCBpcyAxOFxyXG5cdFx0XHRpZiAoY2hhcmFjdGVyICYmICh3aGljaCA8IDE2IHx8IHdoaWNoID4gMTgpKSB7XHJcblx0XHRcdFx0c2hvcnRjdXQucHVzaChjaGFyYWN0ZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzaG9ydGN1dCA9IHNob3J0Y3V0LmpvaW4oJysnKTtcclxuXHRcdFx0aWYgKHNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdICYmXHJcblx0XHRcdFx0c2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0uY2FsbCh0aGlzKSA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIHRoZSBiYWNrc3BhY2Uga2V5IHByZXNzXHJcblx0XHQgKlxyXG5cdFx0ICogV2lsbCByZW1vdmUgYmxvY2sgc3R5bGluZyBsaWtlIHF1b3Rlcy9jb2RlIGVjdCBpZiBhdCB0aGUgc3RhcnQuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVCYWNrU3BhY2UgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdGxldCBub2RlLCBvZmZzZXQsIHJhbmdlLCBwYXJlbnQ7XHJcblxyXG5cdFx0XHQvLyA4IGlzIHRoZSBiYWNrc3BhY2Uga2V5XHJcblx0XHRcdGlmIChvcHRpb25zLmRpc2FibGVCbG9ja1JlbW92ZSB8fCBlLndoaWNoICE9PSA4IHx8XHJcblx0XHRcdFx0IShyYW5nZSA9IHJhbmdlSGVscGVyLnNlbGVjdGVkUmFuZ2UoKSkpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcclxuXHRcdFx0b2Zmc2V0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XHJcblxyXG5cdFx0XHRpZiAob2Zmc2V0ICE9PSAwIHx8ICEocGFyZW50ID0gY3VycmVudFN0eWxlZEJsb2NrTm9kZSgpKSB8fFxyXG5cdFx0XHRcdGRvbS5pcyhwYXJlbnQsICdib2R5JykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChub2RlICE9PSBwYXJlbnQpIHtcclxuXHRcdFx0XHR3aGlsZSAobm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuXHJcblx0XHRcdFx0XHQvLyBFdmVyeXRoaW5nIGJ1dCBlbXB0eSB0ZXh0IG5vZGVzIGJlZm9yZSB0aGUgY3Vyc29yXHJcblx0XHRcdFx0XHQvLyBzaG91bGQgcHJldmVudCB0aGUgc3R5bGUgZnJvbSBiZWluZyByZW1vdmVkXHJcblx0XHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSB8fCBub2RlLm5vZGVWYWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVGhlIGJhY2tzcGFjZSB3YXMgcHJlc3NlZCBhdCB0aGUgc3RhcnQgb2ZcclxuXHRcdFx0Ly8gdGhlIGNvbnRhaW5lciBzbyBjbGVhciB0aGUgc3R5bGVcclxuXHRcdFx0dGhpcy5jbGVhckJsb2NrRm9ybWF0dGluZyhwYXJlbnQpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgZmlyc3Qgc3R5bGVkIGJsb2NrIG5vZGUgdGhhdCBjb250YWlucyB0aGUgY3Vyc29yXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqL1xyXG5cdFx0Y3VycmVudFN0eWxlZEJsb2NrTm9kZSA9ICgpOiBIVE1MRWxlbWVudCA9PiB7XHJcblx0XHRcdGxldCBibG9jazogYW55ID0gY3VycmVudEJsb2NrTm9kZTtcclxuXHJcblx0XHRcdHdoaWxlICghZG9tLmhhc1N0eWxpbmcoYmxvY2spIHx8IGRvbS5pc0lubGluZShibG9jaywgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAoIShibG9jayA9IGJsb2NrLnBhcmVudE5vZGUpIHx8IGRvbS5pcyhibG9jaywgJ2JvZHknKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGJsb2NrO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRyaWdnZXJzIHRoZSB2YWx1ZUNoYW5nZWQgc2lnbmFsIGlmIHRoZXJlIGlzXHJcblx0XHQgKiBhIHBsdWdpbiB0aGF0IGhhbmRsZXMgaXQuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgcmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCkgaGFzIGFscmVhZHkgYmVlblxyXG5cdFx0ICogY2FsbGVkLCB0aGVuIHNhdmVSYW5nZSBzaG91bGQgYmUgc2V0IHRvIGZhbHNlXHJcblx0XHQgKiB0byBwcmV2ZW50IHRoZSByYW5nZSBiZWluZyBzYXZlZCB0d2ljZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAc2luY2UgMS40LjVcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2F2ZVJhbmdlIElmIHRvIGNhbGwgcmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCkuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkID0gKHNhdmVSYW5nZTogYm9vbGVhbikgPT4ge1xyXG5cdFx0XHRpZiAoIXBsdWdpbk1hbmFnZXIgfHxcclxuXHRcdFx0XHQoIXBsdWdpbk1hbmFnZXIuaGFzSGFuZGxlcigndmFsdWVjaGFuZ2VkRXZlbnQnKSAmJlxyXG5cdFx0XHRcdFx0IXRyaWdnZXJWYWx1ZUNoYW5nZWQuaGFzSGFuZGxlcikpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBjdXJyZW50SHRtbCwgc291cmNlTW9kZSA9IHRoaXMuc291cmNlTW9kZSgpLCBoYXNTZWxlY3Rpb24gPSAhc291cmNlTW9kZSAmJiByYW5nZUhlbHBlci5oYXNTZWxlY3Rpb24oKTtcclxuXHJcblx0XHRcdC8vIENvbXBvc2l0aW9uIGVuZCBpc24ndCBndWFyYW50ZWVkIHRvIGZpcmUgYnV0IG11c3QgaGF2ZVxyXG5cdFx0XHQvLyBlbmRlZCB3aGVuIHRyaWdnZXJWYWx1ZUNoYW5nZWQoKSBpcyBjYWxsZWQgc28gcmVzZXQgaXRcclxuXHRcdFx0aXNDb21wb3NpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgZW1sZWRpdG9yLXN0YXJ0LW1hcmtlclxyXG5cdFx0XHQvLyBpcyBwcmVzZW50IGFzIHRoZSByYW5nZSBpcyBhbHJlYWR5IHNhdmVkXHJcblx0XHRcdHNhdmVSYW5nZSA9IHNhdmVSYW5nZSAhPT0gZmFsc2UgJiZcclxuXHRcdFx0XHQhd3lzaXd5Z0RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbWxlZGl0b3Itc3RhcnQtbWFya2VyJyk7XHJcblxyXG5cdFx0XHQvLyBDbGVhciBhbnkgY3VycmVudCB0aW1lb3V0IGFzIGl0J3Mgbm93IGJlZW4gdHJpZ2dlcmVkXHJcblx0XHRcdGlmICh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHZhbHVlQ2hhbmdlZEtleVVwVGltZXIpO1xyXG5cdFx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwVGltZXIgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGhhc1NlbGVjdGlvbiAmJiBzYXZlUmFuZ2UpIHtcclxuXHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y3VycmVudEh0bWwgPSBzb3VyY2VNb2RlID8gc291cmNlRWRpdG9yLnZhbHVlIDogd3lzaXd5Z0JvZHkuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0Ly8gT25seSB0cmlnZ2VyIGlmIHNvbWV0aGluZyBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cclxuXHRcdFx0aWYgKGN1cnJlbnRIdG1sICE9PSB0cmlnZ2VyVmFsdWVDaGFuZ2VkLmxhc3RWYWwpIHtcclxuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkLmxhc3RWYWwgPSBjdXJyZW50SHRtbDtcclxuXHJcblx0XHRcdFx0ZG9tLnRyaWdnZXIoZWRpdG9yQ29udGFpbmVyLCAndmFsdWVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdFx0cmF3VmFsdWU6IHNvdXJjZU1vZGUgPyB0aGlzLnZhbCgpIDogY3VycmVudEh0bWxcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGhhc1NlbGVjdGlvbiAmJiBzYXZlUmFuZ2UpIHtcclxuXHRcdFx0XHRyYW5nZUhlbHBlci5yZW1vdmVNYXJrZXJzKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEgYmx1ciBldmVudFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFsdWVDaGFuZ2VkQmx1ciA9ICgpID0+IHtcclxuXHRcdFx0aWYgKHZhbHVlQ2hhbmdlZEtleVVwVGltZXIpIHtcclxuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEga2V5cHJlc3MgZXZlbnRcclxuXHRcdCAqIEBwYXJhbSAge0V2ZW50fSBlIFRoZSBrZXlwcmVzcyBldmVudFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFsdWVDaGFuZ2VkS2V5VXAgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdGxldCB3aGljaCA9IGUud2hpY2gsIGxhc3RDaGFyID0gdmFsdWVDaGFuZ2VkS2V5VXAubGFzdENoYXIsIGxhc3RXYXNTcGFjZSA9IChsYXN0Q2hhciA9PT0gMTMgfHwgbGFzdENoYXIgPT09IDMyKSwgbGFzdFdhc0RlbGV0ZSA9IChsYXN0Q2hhciA9PT0gOCB8fCBsYXN0Q2hhciA9PT0gNDYpO1xyXG5cclxuXHRcdFx0dmFsdWVDaGFuZ2VkS2V5VXAubGFzdENoYXIgPSB3aGljaDtcclxuXHJcblx0XHRcdGlmIChpc0NvbXBvc2luZykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gMTMgPSByZXR1cm4gJiAzMiA9IHNwYWNlXHJcblx0XHRcdGlmICh3aGljaCA9PT0gMTMgfHwgd2hpY2ggPT09IDMyKSB7XHJcblx0XHRcdFx0aWYgKCFsYXN0V2FzU3BhY2UpIHtcclxuXHRcdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFsdWVDaGFuZ2VkS2V5VXAudHJpZ2dlck5leHQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyA4ID0gYmFja3NwYWNlICYgNDYgPSBkZWxcclxuXHRcdFx0fSBlbHNlIGlmICh3aGljaCA9PT0gOCB8fCB3aGljaCA9PT0gNDYpIHtcclxuXHRcdFx0XHRpZiAoIWxhc3RXYXNEZWxldGUpIHtcclxuXHRcdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dmFsdWVDaGFuZ2VkS2V5VXAudHJpZ2dlck5leHQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIGlmICh2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCkge1xyXG5cdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDbGVhciB0aGUgcHJldmlvdXMgdGltZW91dCBhbmQgc2V0IGEgbmV3IG9uZS5cclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHZhbHVlQ2hhbmdlZEtleVVwVGltZXIpO1xyXG5cclxuXHRcdFx0Ly8gVHJpZ2dlciB0aGUgZXZlbnQgMS41cyBhZnRlciB0aGUgbGFzdCBrZXlwcmVzcyBpZiBzcGFjZVxyXG5cdFx0XHQvLyBpc24ndCBwcmVzc2VkLiBUaGlzIG1pZ2h0IG5lZWQgdG8gYmUgbG93ZXJlZCwgd2lsbCBuZWVkXHJcblx0XHRcdC8vIHRvIGxvb2sgaW50byB3aGF0IHRoZSBzbG93ZXN0IGF2ZXJhZ2UgQ2hhcnMgUGVyIE1pbiBpcy5cclxuXHRcdFx0dmFsdWVDaGFuZ2VkS2V5VXBUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmICghaXNDb21wb3NpbmcpIHtcclxuXHRcdFx0XHRcdHRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIDE1MDApO1xyXG5cdFx0fTtcclxuXHJcblx0XHRoYW5kbGVDb21wb3NpdGlvbiA9IChlOiBhbnkpID0+IHtcclxuXHRcdFx0aXNDb21wb3NpbmcgPSAvc3RhcnQvaS50ZXN0KGUudHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGF1dG9VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMudXBkYXRlT3JpZ2luYWwoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gcnVuIHRoZSBpbml0aWFsaXplclxyXG5cdFx0aW5pdCgpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogU3RhdGljIGNvbW1hbmQgaGVscGVyIGNsYXNzXHJcbiAqIEBjbGFzcyBjb21tYW5kXHJcbiAqIEBuYW1lIGVtbGVkaXRvci5jb21tYW5kXHJcbiAqL1xyXG5FbWxFZGl0b3IuY29tbWFuZCA9XHJcbi8qKiBAbGVuZHMgZW1sZWRpdG9yLmNvbW1hbmQgKi9cclxue1xyXG5cdC8qKlxyXG5cdCAqIEdldHMgYSBjb21tYW5kXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdCAqIEByZXR1cm4ge09iamVjdHxudWxsfVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRnZXQ6IGZ1bmN0aW9uIChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzKTogb2JqZWN0IHwgbnVsbCB7XHJcblx0XHRyZXR1cm4gZGVmYXVsdENvbW1hbmRzW25hbWVdIHx8IG51bGw7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogPHA+QWRkcyBhIGNvbW1hbmQgdG8gdGhlIGVkaXRvciBvciB1cGRhdGVzIGFuIGV4aXN0aW5nXHJcblx0ICogY29tbWFuZCBpZiBhIGNvbW1hbmQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYWxyZWFkeSBleGlzdHMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+T25jZSBhIGNvbW1hbmQgaXMgYWRkIGl0IGNhbiBiZSBpbmNsdWRlZCBpbiB0aGUgdG9vbGJhciBieVxyXG5cdCAqIGFkZGluZyBpdCdzIG5hbWUgdG8gdGhlIHRvb2xiYXIgb3B0aW9uIGluIHRoZSBjb25zdHJ1Y3Rvci4gSXRcclxuXHQgKiBjYW4gYWxzbyBiZSBleGVjdXRlZCBtYW51YWxseSBieSBjYWxsaW5nXHJcblx0ICoge0BsaW5rIGVtbGVkaXRvci5leGVjQ29tbWFuZH08L3A+XHJcblx0ICpcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIEVtbEVkaXRvci5jb21tYW5kLnNldChcImhlbGxvXCIsXHJcblx0ICoge1xyXG5cdCAqICAgICBleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0ICogICAgICAgICBhbGVydChcIkhlbGxvIFdvcmxkIVwiKTtcclxuXHQgKiAgICAgfVxyXG5cdCAqIH0pO1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gY21kXHJcblx0ICogQHJldHVybiB7dGhpc3xmYWxzZX0gUmV0dXJucyBmYWxzZSBpZiBuYW1lIG9yIGNtZCBpcyBmYWxzZVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRzZXQ6IGZ1bmN0aW9uIChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzLCBjbWQ6IGFueSk6IGFueSB8IGZhbHNlIHtcclxuXHRcdGlmICghbmFtZSB8fCAhY21kKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBtZXJnZSBhbnkgZXhpc3RpbmcgY29tbWFuZCBwcm9wZXJ0aWVzXHJcblx0XHRjbWQgPSB1dGlscy5leHRlbmQoZGVmYXVsdENvbW1hbmRzW25hbWVdIHx8IHt9LCBjbWQpO1xyXG5cclxuXHRcdGNtZC5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdEVtbEVkaXRvci5jb21tYW5kLnJlbW92ZShuYW1lKTtcclxuXHRcdH07XHJcblxyXG5cdFx0ZGVmYXVsdENvbW1hbmRzW25hbWVdID0gY21kO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIGNvbW1hbmRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAc2luY2UgdjEuMy41XHJcblx0ICovXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiAobmFtZToga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcyk6IGFueSB7XHJcblx0XHRpZiAoZGVmYXVsdENvbW1hbmRzW25hbWVdKSB7XHJcblx0XHRcdGRlbGV0ZSBkZWZhdWx0Q29tbWFuZHNbbmFtZV07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG59O1xyXG4iLCJleHBvcnQgY2xhc3MgUGx1Z2luTWFuYWdlciB7XG5cblxuXHRjb25zdHJ1Y3Rvcih0aGlzT2JqOiBhbnkpIHtcblxuXHRcdFBsdWdpbk1hbmFnZXIucGx1Z2lucyA9IHt9O1xuXHRcdC8qKlxuXHRcdCAqIEFycmF5IG9mIGFsbCBjdXJyZW50bHkgcmVnaXN0ZXJlZCBwbHVnaW5zXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgcmVnaXN0ZXJlZFBsdWdpbnM6IGFueVtdID0gW107XG5cblxuXG5cdFx0LyoqXG5cdFx0ICogQ2hhbmdlcyBhIHNpZ25hbHMgbmFtZSBmcm9tIFwibmFtZVwiIGludG8gXCJzaWduYWxOYW1lXCIuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBmb3JtYXRTaWduYWxOYW1lID0gZnVuY3Rpb24gKHNpZ25hbDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRcdHJldHVybiAnc2lnbmFsJyArIHNpZ25hbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHNpZ25hbC5zbGljZSgxKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2FsbHMgaGFuZGxlcnMgZm9yIGEgc2lnbmFsXG5cdFx0ICpcblx0XHQgKiBAc2VlIGNhbGwoKVxuXHRcdCAqIEBzZWUgY2FsbE9ubHlGaXJzdCgpXG5cdFx0ICogQHBhcmFtICB7QXJyYXl9ICAgYXJnc1xuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IHJldHVybkF0Rmlyc3Rcblx0XHQgKiBAcmV0dXJuIHsqfVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIGNhbGxIYW5kbGVycyA9IGZ1bmN0aW9uIChhcmdzOiBJQXJndW1lbnRzLCByZXR1cm5BdEZpcnN0OiBib29sZWFuKTogYW55IHtcblx0XHRcdGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3MpO1xuXG5cdFx0XHR2YXIgaWR4LCByZXQsIHNpZ25hbCA9IGZvcm1hdFNpZ25hbE5hbWUoQXJyYXkuZnJvbShhcmdzKS5zaGlmdCgpKTtcblxuXHRcdFx0Zm9yIChpZHggPSAwOyBpZHggPCByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7IGlkeCsrKSB7XG5cdFx0XHRcdGlmIChzaWduYWwgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaWR4XSkge1xuXHRcdFx0XHRcdHJldCA9IHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF1bc2lnbmFsXS5hcHBseSh0aGlzT2JqLCBhcmdzKTtcblxuXHRcdFx0XHRcdGlmIChyZXR1cm5BdEZpcnN0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDYWxscyBhbGwgaGFuZGxlcnMgZm9yIHRoZSBwYXNzZWQgc2lnbmFsXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIHNpZ25hbFxuXHRcdCAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJnc1xuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGNhbGxcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmNhbGwgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55KTogdm9pZCB7XG5cdFx0XHRjYWxsSGFuZGxlcnMoYXJncywgZmFsc2UpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDYWxscyB0aGUgZmlyc3QgaGFuZGxlciBmb3IgYSBzaWduYWwsIGFuZCByZXR1cm5zIHRoZVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcblx0XHQgKiBAcGFyYW0gIHsuLi5zdHJpbmd9IGFyZ3Ncblx0XHQgKiBAcmV0dXJuIHsqfSBUaGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIGhhbmRsZXJcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBjYWxsT25seUZpcnN0XG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5jYWxsT25seUZpcnN0ID0gZnVuY3Rpb24gKCk6IGFueSB7XG5cdFx0XHRyZXR1cm4gY2FsbEhhbmRsZXJzKGFyZ3VtZW50cywgdHJ1ZSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoZWNrcyBpZiBhIHNpZ25hbCBoYXMgYSBoYW5kbGVyXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgaGFzSGFuZGxlclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChzaWduYWw6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0dmFyIGkgPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XG5cdFx0XHRzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKHNpZ25hbCk7XG5cblx0XHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpXSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2tzIGlmIHRoZSBwbHVnaW4gZXhpc3RzIGluIHBsdWdpbnNcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBleGlzdHNcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmV4aXN0cyA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0aWYgKHBsdWdpbiBpbiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnMpIHtcblx0XHRcdFx0bGV0IHBsdWdpbk9iajoge30gPSBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdO1xuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHBsdWdpbk9iaiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcGx1Z2luT2JqLnByb3RvdHlwZSA9PT0gJ29iamVjdCc7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2tzIGlmIHRoZSBwYXNzZWQgcGx1Z2luIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGlzUmVnaXN0ZXJlZFxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuaXNSZWdpc3RlcmVkID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0XHRpZiAodGhpcy5leGlzdHMocGx1Z2luKSkge1xuXHRcdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xuXG5cdFx0XHRcdHdoaWxlIChpZHgtLSkge1xuXHRcdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1tpZHhdIGluc3RhbmNlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVnaXN0ZXJzIGEgcGx1Z2luIHRvIHJlY2VpdmUgc2lnbmFsc1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIHJlZ2lzdGVyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5yZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0aWYgKCF0aGlzLmV4aXN0cyhwbHVnaW4pIHx8IHRoaXMuaXNSZWdpc3RlcmVkKHBsdWdpbikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgcGx1Z2luT2JqID0gbmV3IHRoaXMucGx1Z2luc1twbHVnaW5dKCk7XG5cdFx0XHRyZWdpc3RlcmVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XG5cblx0XHRcdGlmICgnaW5pdCcgaW4gdGhpcy5wbHVnaW4pIHtcblx0XHRcdFx0cGx1Z2luT2JqLmluaXQuY2FsbCh0aGlzT2JqKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIERlcmVnaXN0ZXJzIGEgcGx1Z2luLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGRlcmVnaXN0ZXJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmRlcmVnaXN0ZXIgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRcdHZhciByZW1vdmVkUGx1Z2luLCBwbHVnaW5JZHggPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGgsIHJlbW92ZWQgPSBmYWxzZTtcblxuXHRcdFx0aWYgKCF0aGlzLmlzUmVnaXN0ZXJlZChwbHVnaW4pKSB7XG5cdFx0XHRcdHJldHVybiByZW1vdmVkO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAocGx1Z2luSWR4LS0pIHtcblx0XHRcdFx0aWYgKHJlZ2lzdGVyZWRQbHVnaW5zW3BsdWdpbklkeF0gaW5zdGFuY2VvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdKSB7XG5cdFx0XHRcdFx0cmVtb3ZlZFBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLnNwbGljZShwbHVnaW5JZHgsIDEpWzBdO1xuXHRcdFx0XHRcdHJlbW92ZWQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZW1vdmVkUGx1Z2luKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVkUGx1Z2luLmRlc3Ryb3kuY2FsbCh0aGlzT2JqKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlbW92ZWQ7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENsZWFycyBhbGwgcGx1Z2lucyBhbmQgcmVtb3ZlcyB0aGUgb3duZXIgcmVmZXJlbmNlLlxuXHRcdCAqXG5cdFx0ICogQ2FsbGluZyBhbnkgZnVuY3Rpb25zIG9uIHRoaXMgb2JqZWN0IGFmdGVyIGNhbGxpbmdcblx0XHQgKiBkZXN0cm95IHdpbGwgY2F1c2UgYSBKUyBlcnJvci5cblx0XHQgKlxuXHRcdCAqIEBuYW1lIGRlc3Ryb3lcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaSA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRpZiAoJ2Rlc3Ryb3knIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XG5cdFx0XHRcdFx0cmVnaXN0ZXJlZFBsdWdpbnNbaV0uZGVzdHJveS5jYWxsKHRoaXNPYmopO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlZ2lzdGVyZWRQbHVnaW5zID0gW107XG5cdFx0XHR0aGlzT2JqID0gbnVsbDtcblx0XHR9O1xuXHR9XG5cblx0c3RhdGljIHBsdWdpbnM6IHt9O1xuXHRjYWxsOiAoLi4uYXJnOiBhbnkpID0+IHZvaWQ7XG5cdGNhbGxPbmx5Rmlyc3Q6ICgpID0+IGFueTtcblx0aGFzSGFuZGxlcjogKHNpZ25hbDogc3RyaW5nKSA9PiBib29sZWFuO1xuXHRleGlzdHM6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcblx0aXNSZWdpc3RlcmVkOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cdHJlZ2lzdGVyOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cdGRlcmVnaXN0ZXI6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcblx0ZGVzdHJveTogKCkgPT4gdm9pZDtcbn1cblxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMgKi9cbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5cblxuLyoqXG4gKiBHZXRzIHRoZSB0ZXh0LCBzdGFydC9lbmQgbm9kZSBhbmQgb2Zmc2V0IGZvclxuICogbGVuZ3RoIGNoYXJzIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHBhc3NlZCBub2RlXG4gKiBhdCB0aGUgc3BlY2lmaWVkIG9mZnNldC5cbiAqXG4gKiBAcGFyYW0gIHtOb2RlfSAgbm9kZVxuICogQHBhcmFtICB7bnVtYmVyfSAgb2Zmc2V0XG4gKiBAcGFyYW0gIHtib29sZWFufSBpc0xlZnRcbiAqIEBwYXJhbSAge251bWJlcn0gIGxlbmd0aFxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIG91dGVyVGV4dCA9IGZ1bmN0aW9uIChyYW5nZTogYW55LCBpc0xlZnQ6IGJvb2xlYW4sIGxlbmd0aDogbnVtYmVyKTogYW55IHtcblx0dmFyIG5vZGVWYWx1ZSwgcmVtYWluaW5nLCBzdGFydCwgZW5kLCBub2RlLFxuXHRcdHRleHQgPSAnJyxcblx0XHRuZXh0ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIsXG5cdFx0b2Zmc2V0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cblx0Ly8gSGFuZGxlIGNhc2VzIHdoZXJlIG5vZGUgaXMgYSBwYXJhZ3JhcGggYW5kIG9mZnNldFxuXHQvLyByZWZlcnMgdG8gdGhlIGluZGV4IG9mIGEgdGV4dCBub2RlLlxuXHQvLyAzID0gdGV4dCBub2RlXG5cdGlmIChuZXh0ICYmIG5leHQubm9kZVR5cGUgIT09IDMpIHtcblx0XHRuZXh0ID0gbmV4dC5jaGlsZE5vZGVzW29mZnNldF07XG5cdFx0b2Zmc2V0ID0gMDtcblx0fVxuXG5cdHN0YXJ0ID0gZW5kID0gb2Zmc2V0O1xuXG5cdHdoaWxlIChsZW5ndGggPiB0ZXh0Lmxlbmd0aCAmJiBuZXh0ICYmIG5leHQubm9kZVR5cGUgPT09IDMpIHtcblx0XHRub2RlVmFsdWUgPSBuZXh0Lm5vZGVWYWx1ZTtcblx0XHRyZW1haW5pbmcgPSBsZW5ndGggLSB0ZXh0Lmxlbmd0aDtcblxuXHRcdC8vIElmIG5vdCB0aGUgZmlyc3Qgbm9kZSwgc3RhcnQgYW5kIGVuZCBzaG91bGQgYmUgYXQgdGhlaXJcblx0XHQvLyBtYXggdmFsdWVzIGFzIHdpbGwgYmUgdXBkYXRlZCB3aGVuIGdldHRpbmcgdGhlIHRleHRcblx0XHRpZiAobm9kZSkge1xuXHRcdFx0ZW5kID0gbm9kZVZhbHVlLmxlbmd0aDtcblx0XHRcdHN0YXJ0ID0gMDtcblx0XHR9XG5cblx0XHRub2RlID0gbmV4dDtcblxuXHRcdGlmIChpc0xlZnQpIHtcblx0XHRcdHN0YXJ0ID0gTWF0aC5tYXgoZW5kIC0gcmVtYWluaW5nLCAwKTtcblx0XHRcdG9mZnNldCA9IHN0YXJ0O1xuXG5cdFx0XHR0ZXh0ID0gbm9kZVZhbHVlLnN1YnN0cihzdGFydCwgZW5kIC0gc3RhcnQpICsgdGV4dDtcblx0XHRcdG5leHQgPSBub2RlLnByZXZpb3VzU2libGluZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZW5kID0gTWF0aC5taW4ocmVtYWluaW5nLCBub2RlVmFsdWUubGVuZ3RoKTtcblx0XHRcdG9mZnNldCA9IHN0YXJ0ICsgZW5kO1xuXG5cdFx0XHR0ZXh0ICs9IG5vZGVWYWx1ZS5zdWJzdHIoc3RhcnQsIGVuZCk7XG5cdFx0XHRuZXh0ID0gbm9kZS5uZXh0U2libGluZztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG5vZGU6IG5vZGUgfHwgbmV4dCxcblx0XHRvZmZzZXQ6IG9mZnNldCxcblx0XHR0ZXh0OiB0ZXh0XG5cdH07XG59O1xuXG4vKipcbiAqIFJhbmdlIGhlbHBlclxuICpcbiAqIEBjbGFzcyBSYW5nZUhlbHBlclxuICogQG5hbWUgUmFuZ2VIZWxwZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFJhbmdlSGVscGVyIHtcblxuXHRpbnNlcnRIVE1MOiAoaHRtbDogc3RyaW5nLCBlbmRIVE1MPzogc3RyaW5nKSA9PiBib29sZWFuO1xuXHRpbnNlcnROb2RlOiAobm9kZT86IGFueSwgZW5kTm9kZT86IGFueSkgPT4gZmFsc2UgfCB1bmRlZmluZWQ7XG5cdGNsb25lU2VsZWN0ZWQ6ICgpID0+IFJhbmdlO1xuXHRzZWxlY3RlZFJhbmdlOiAoKSA9PiBSYW5nZTtcblx0aGFzU2VsZWN0aW9uOiAoKSA9PiBib29sZWFuO1xuXHRzZWxlY3RlZEh0bWw6ICgpID0+IHN0cmluZztcblx0cGFyZW50Tm9kZTogKCkgPT4gSFRNTEVsZW1lbnQ7XG5cdGdldEZpcnN0QmxvY2tQYXJlbnQ6IChub2RlPzogYW55KSA9PiBhbnk7XG5cdGluc2VydE5vZGVBdDogKHN0YXJ0OiBhbnksIG5vZGU6IGFueSkgPT4gYm9vbGVhbjtcblx0aW5zZXJ0TWFya2VyczogKCkgPT4gdm9pZDtcblx0Z2V0TWFya2VyOiAoaWQ6IGFueSkgPT4gYW55O1xuXHRyZW1vdmVNYXJrZXI6IChpZDogYW55KSA9PiB2b2lkO1xuXHRyZW1vdmVNYXJrZXJzOiAoKSA9PiB2b2lkO1xuXHRzYXZlUmFuZ2U6ICgpID0+IHZvaWQ7XG5cdHNlbGVjdFJhbmdlOiAocmFuZ2U6IGFueSkgPT4gdm9pZDtcblx0cmVzdG9yZVJhbmdlOiAoKSA9PiBib29sZWFuO1xuXHRzZWxlY3RPdXRlclRleHQ6IChsZWZ0OiBhbnksIHJpZ2h0OiBhbnkpID0+IGJvb2xlYW47XG5cdGdldE91dGVyVGV4dDogKGJlZm9yZTogYW55LCBsZW5ndGg6IGFueSkgPT4gYW55O1xuXHRyZXBsYWNlS2V5d29yZDogKGtleXdvcmRzOiBhbnksIGluY2x1ZGVBZnRlcjogYW55LCBrZXl3b3Jkc1NvcnRlZDogYW55LCBsb25nZXN0S2V5d29yZDogYW55LCByZXF1aXJlV2hpdGVzcGFjZTogYW55LCBrZXlwcmVzc0NoYXI6IGFueSkgPT4gYm9vbGVhbjtcblx0Y29tcGFyZTogKHJuZ0E/OiBhbnksIHJuZ0I/OiBhbnkpID0+IGJvb2xlYW47XG5cdGNsZWFyOiAoKSA9PiB2b2lkO1xuXG5cdGNvbnN0cnVjdG9yKHdpbjogYW55LCBkOiBudWxsLCBzYW5pdGl6ZTogeyAoaHRtbDogc3RyaW5nKTogc3RyaW5nOyAoYXJnMDogYW55KTogc3RyaW5nOyB9KSB7XG5cdFx0bGV0IF9jcmVhdGVNYXJrZXI6IGFueTtcblx0XHRsZXQgX3ByZXBhcmVJbnB1dDogYW55O1xuXHRcdGxldCBkb2M6IGFueSA9IGQgfHwgd2luLmNvbnRlbnREb2N1bWVudCB8fCB3aW4uZG9jdW1lbnQ7XG5cdFx0bGV0IHN0YXJ0TWFya2VyOiBzdHJpbmcgPSAnZW1sZWRpdG9yLXN0YXJ0LW1hcmtlcic7XG5cdFx0bGV0IGVuZE1hcmtlcjogc3RyaW5nID0gJ2VtbGVkaXRvci1lbmQtbWFya2VyJztcblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydHMgSFRNTCBpbnRvIHRoZSBjdXJyZW50IHJhbmdlIHJlcGxhY2luZyBhbnkgc2VsZWN0ZWRcblx0XHQgKiB0ZXh0LlxuXHRcdCAqXG5cdFx0ICogSWYgZW5kSFRNTCBpcyBzcGVjaWZpZWQgdGhlIHNlbGVjdGVkIGNvbnRlbnRzIHdpbGwgYmUgcHV0IGJldHdlZW5cblx0XHQgKiBodG1sIGFuZCBlbmRIVE1MLiBJZiB0aGVyZSBpcyBub3RoaW5nIHNlbGVjdGVkIGh0bWwgYW5kIGVuZEhUTUwgYXJlXG5cdFx0ICoganVzdCBjb25jYXRlbmF0ZSB0b2dldGhlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRIVE1MXVxuXHRcdCAqIEByZXR1cm4gRmFsc2Ugb24gZmFpbFxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGluc2VydEhUTUxcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5pbnNlcnRIVE1MID0gZnVuY3Rpb24gKGh0bWw6IHN0cmluZywgZW5kSFRNTD86IHN0cmluZykge1xuXHRcdFx0dmFyIG5vZGUsIGRpdiwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcblxuXHRcdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlbmRIVE1MKSB7XG5cdFx0XHRcdGh0bWwgKz0gdGhpcy5zZWxlY3RlZEh0bWwoKSArIGVuZEhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XG5cdFx0XHRub2RlID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSBzYW5pdGl6ZShodG1sKTtcblxuXHRcdFx0d2hpbGUgKGRpdi5maXJzdENoaWxkKSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChub2RlLCBkaXYuZmlyc3RDaGlsZCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaW5zZXJ0Tm9kZShub2RlKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0KiBSZW1vdmVzIHRoZSBzdGFydC9lbmQgbWFya2Vyc1xuXHRcdCpcblx0XHQqIEBmdW5jdGlvblxuXHRcdCogQG5hbWUgcmVtb3ZlTWFya2Vyc1xuXHRcdCogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCovXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoc3RhcnRNYXJrZXIpO1xuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoZW5kTWFya2VyKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIHNhbWUgYXMgaW5zZXJ0SFRNTCBleGNlcHQgd2l0aCBET00gbm9kZXMgaW5zdGVhZFxuXHRcdCAqXG5cdFx0ICogPHN0cm9uZz5XYXJuaW5nOjwvc3Ryb25nPiB0aGUgbm9kZXMgbXVzdCBiZWxvbmcgdG8gdGhlXG5cdFx0ICogZG9jdW1lbnQgdGhleSBhcmUgYmVpbmcgaW5zZXJ0ZWQgaW50by4gU29tZSBicm93c2Vyc1xuXHRcdCAqIHdpbGwgdGhyb3cgZXhjZXB0aW9ucyBpZiB0aGV5IGRvbid0LlxuXHRcdCAqXG5cdFx0ICogUmV0dXJucyBib29sZWFuIGZhbHNlIG9uIGZhaWxcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuXHRcdCAqIEBwYXJhbSB7Tm9kZX0gZW5kTm9kZVxuXHRcdCAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBpbnNlcnROb2RlXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuaW5zZXJ0Tm9kZSA9IGZ1bmN0aW9uIChub2RlPzogTm9kZSwgZW5kTm9kZT86IE5vZGUpOiBmYWxzZSB8IHVuZGVmaW5lZCB7XG5cdFx0XHRsZXQgZmlyc3QsIGxhc3QsIGlucHV0ID0gX3ByZXBhcmVJbnB1dChub2RlLCBlbmROb2RlKSwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKSwgcGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG5cdFx0XHRsZXQgZW1wdHlOb2RlczogYW55ID0gW107XG5cblx0XHRcdGlmICghaW5wdXQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiByZW1vdmVJZkVtcHR5KG5vZGU6IGFueSkge1xuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBlbXB0eSBub2RlIGlmIGl0IHdhc24ndCBhbHJlYWR5IGVtcHR5XG5cdFx0XHRcdGlmIChub2RlICYmIGRvbS5pc0VtcHR5KG5vZGUpICYmIGVtcHR5Tm9kZXMuaW5kZXhPZihub2RlKSA8IDApIHtcblx0XHRcdFx0XHRkb20ucmVtb3ZlKG5vZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyYW5nZS5zdGFydENvbnRhaW5lciAhPT0gcmFuZ2UuZW5kQ29udGFpbmVyKSB7XG5cdFx0XHRcdHV0aWxzLmVhY2gocGFyZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChfLCBub2RlKSB7XG5cdFx0XHRcdFx0aWYgKGRvbS5pc0VtcHR5KG5vZGUpKSB7XG5cdFx0XHRcdFx0XHRlbXB0eU5vZGVzLnB1c2gobm9kZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmaXJzdCA9IGlucHV0LmZpcnN0Q2hpbGQ7XG5cdFx0XHRcdGxhc3QgPSBpbnB1dC5sYXN0Q2hpbGQ7XG5cdFx0XHR9XG5cblx0XHRcdHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG5cblx0XHRcdC8vIEZGIGFsbG93cyA8YnIgLz4gdG8gYmUgc2VsZWN0ZWQgYnV0IGluc2VydGluZyBhIG5vZGVcblx0XHRcdC8vIGludG8gPGJyIC8+IHdpbGwgY2F1c2UgaXQgbm90IHRvIGJlIGRpc3BsYXllZCBzbyBtdXN0XG5cdFx0XHQvLyBpbnNlcnQgYmVmb3JlIHRoZSA8YnIgLz4gaW4gRkYuXG5cdFx0XHQvLyAzID0gVGV4dE5vZGVcblx0XHRcdGlmIChwYXJlbnQgJiYgcGFyZW50Lm5vZGVUeXBlICE9PSAzICYmICFkb20uY2FuSGF2ZUNoaWxkcmVuKHBhcmVudCkpIHtcblx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShpbnB1dCwgcGFyZW50KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJhbmdlLmluc2VydE5vZGUoaW5wdXQpO1xuXG5cdFx0XHRcdC8vIElmIGEgbm9kZSB3YXMgc3BsaXQgb3IgaXRzIGNvbnRlbnRzIGRlbGV0ZWQsIHJlbW92ZSBhbnkgcmVzdWx0aW5nXG5cdFx0XHRcdC8vIGVtcHR5IHRhZ3MuIEZvciBleGFtcGxlOlxuXHRcdFx0XHQvLyA8cD58dGVzdDwvcD48ZGl2PnRlc3R8PC9kaXY+XG5cdFx0XHRcdC8vIFdoZW4gZGVsZXRlQ29udGVudHMgY291bGQgYmVjb21lOlxuXHRcdFx0XHQvLyA8cD48L3A+fDxkaXY+PC9kaXY+XG5cdFx0XHRcdC8vIFNvIHJlbW92ZSB0aGUgZW1wdHkgb25lc1xuXHRcdFx0XHRyZW1vdmVJZkVtcHR5KGZpcnN0ICYmIGZpcnN0LnByZXZpb3VzU2libGluZyk7XG5cdFx0XHRcdHJlbW92ZUlmRW1wdHkobGFzdCAmJiBsYXN0Lm5leHRTaWJsaW5nKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5yZXN0b3JlUmFuZ2UoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2xvbmVzIHRoZSBzZWxlY3RlZCBSYW5nZVxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7UmFuZ2V9XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgY2xvbmVTZWxlY3RlZFxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmNsb25lU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKTogUmFuZ2Uge1xuXHRcdFx0dmFyIHJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdGlmIChyYW5nZSkge1xuXHRcdFx0XHRyZXR1cm4gcmFuZ2UuY2xvbmVSYW5nZSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSBzZWxlY3RlZCBSYW5nZVxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7UmFuZ2V9XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgc2VsZWN0ZWRSYW5nZVxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLnNlbGVjdGVkUmFuZ2UgPSBmdW5jdGlvbiAoKTogUmFuZ2Uge1xuXHRcdFx0dmFyIHJhbmdlLCBmaXJzdENoaWxkLCBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHRcdGlmICghc2VsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2hlbiBjcmVhdGluZyBhIG5ldyByYW5nZSwgc2V0IHRoZSBzdGFydCB0byB0aGUgZmlyc3QgY2hpbGRcblx0XHRcdC8vIGVsZW1lbnQgb2YgdGhlIGJvZHkgZWxlbWVudCB0byBhdm9pZCBlcnJvcnMgaW4gRkYuXG5cdFx0XHRpZiAoc2VsLnJhbmdlQ291bnQgPD0gMCkge1xuXHRcdFx0XHRmaXJzdENoaWxkID0gZG9jLmJvZHk7XG5cdFx0XHRcdHdoaWxlIChmaXJzdENoaWxkLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRmaXJzdENoaWxkID0gZmlyc3RDaGlsZC5maXJzdENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcblx0XHRcdFx0Ly8gTXVzdCBiZSBzZXRTdGFydEJlZm9yZSBvdGhlcndpc2UgaXQgY2FuIGNhdXNlIGluZmluaXRlXG5cdFx0XHRcdC8vIGxvb3BzIHdpdGggbGlzdHMgaW4gV2ViS2l0LiBTZWUgaXNzdWUgNDQyXG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKGZpcnN0Q2hpbGQpO1xuXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzZWwucmFuZ2VDb3VudCA+IDApIHtcblx0XHRcdFx0cmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJhbmdlO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGlvblxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBoYXNTZWxlY3Rpb25cblx0XHQgKiBAc2luY2UgMS40LjRcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5oYXNTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKTogYm9vbGVhbiB7XG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXG5cdFx0XHRyZXR1cm4gc2VsICYmIHNlbC5yYW5nZUNvdW50ID4gMDtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogR2V0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIEhUTUxcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBzZWxlY3RlZEh0bWxcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5zZWxlY3RlZEh0bWwgPSBmdW5jdGlvbiAoKTogc3RyaW5nIHtcblx0XHRcdHZhciBkaXYsIHJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdGlmIChyYW5nZSkge1xuXHRcdFx0XHRkaXYgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCBkb2MpO1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xuXG5cdFx0XHRcdHJldHVybiBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEdldHMgdGhlIHBhcmVudCBub2RlIG9mIHRoZSBzZWxlY3RlZCBjb250ZW50cyBpbiB0aGUgcmFuZ2Vcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIHBhcmVudE5vZGVcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5wYXJlbnROb2RlID0gZnVuY3Rpb24gKCk6IEhUTUxFbGVtZW50IHtcblx0XHRcdHZhciByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xuXG5cdFx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXG5cdFx0ICogY29udGVudHMgb2YgdGhlIHJhbmdlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudFxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXG5cdFx0ICogY29udGVudHMgb2YgdGhlIHJhbmdlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBbbl0gVGhlIGVsZW1lbnQgdG8gZ2V0IHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgZnJvbVxuXHRcdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGdldEZpcnN0QmxvY2tQYXJlbnReMlxuXHRcdCAqIEBzaW5jZSAxLjQuMVxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmdldEZpcnN0QmxvY2tQYXJlbnQgPSBmdW5jdGlvbiAobm9kZT86IGFueSk6IEhUTUxFbGVtZW50IHtcblx0XHRcdHZhciBmdW5jID0gZnVuY3Rpb24gKGVsbTogYW55KTogYW55IHtcblx0XHRcdFx0aWYgKCFkb20uaXNJbmxpbmUoZWxtLCB0cnVlKSkge1xuXHRcdFx0XHRcdHJldHVybiBlbG07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbG0gPSBlbG0gPyBlbG0ucGFyZW50Tm9kZSA6IG51bGw7XG5cblx0XHRcdFx0cmV0dXJuIGVsbSA/IGZ1bmMoZWxtKSA6IGVsbTtcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBmdW5jKG5vZGUgfHwgdGhpcy5wYXJlbnROb2RlKCkpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBJbnNlcnRzIGEgbm9kZSBhdCBlaXRoZXIgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Qm9vbH0gc3RhcnRcblx0XHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBpbnNlcnROb2RlQXRcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5pbnNlcnROb2RlQXQgPSBmdW5jdGlvbiAoc3RhcnQ6IGJvb2xlYW4sIG5vZGU6IE5vZGUpIHtcblx0XHRcdHZhciBjdXJyZW50UmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKSwgcmFuZ2UgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHJhbmdlLmNvbGxhcHNlKHN0YXJ0KTtcblx0XHRcdHJhbmdlLmluc2VydE5vZGUobm9kZSk7XG5cblx0XHRcdC8vIFJlc2VsZWN0IHRoZSBjdXJyZW50IHJhbmdlLlxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBDaHJvbWUgbG9zaW5nIHRoZSBzZWxlY3Rpb24uIElzc3VlIzgyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKGN1cnJlbnRSYW5nZSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydHMgc3RhcnQvZW5kIG1hcmtlcnMgZm9yIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdCAqIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHJlc3RvcmVSYW5nZSB0byByZS1zZWxlY3QgdGhlXG5cdFx0ICogcmFuZ2UuXG5cdFx0ICpcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgaW5zZXJ0TWFya2Vyc1xuXHRcdCAqL1xuXHRcdHRoaXMuaW5zZXJ0TWFya2VycyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjdXJyZW50UmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcblx0XHRcdHZhciBzdGFydE5vZGUgPSBfY3JlYXRlTWFya2VyKHN0YXJ0TWFya2VyKTtcblxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXJzKCk7XG5cdFx0XHR0aGlzLmluc2VydE5vZGVBdCh0cnVlLCBzdGFydE5vZGUpO1xuXG5cdFx0XHQvLyBGaXhlcyBpc3N1ZSB3aXRoIGVuZCBtYXJrZXIgc29tZXRpbWVzIGJlaW5nIHBsYWNlZCBiZWZvcmVcblx0XHRcdC8vIHRoZSBzdGFydCBtYXJrZXIgd2hlbiB0aGUgcmFuZ2UgaXMgY29sbGFwc2VkLlxuXHRcdFx0aWYgKGN1cnJlbnRSYW5nZSAmJiBjdXJyZW50UmFuZ2UuY29sbGFwc2VkKSB7XG5cdFx0XHRcdHN0YXJ0Tm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShcblx0XHRcdFx0XHRfY3JlYXRlTWFya2VyKGVuZE1hcmtlciksIHN0YXJ0Tm9kZS5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmluc2VydE5vZGVBdChmYWxzZSwgX2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogR2V0cyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXG5cdFx0ICogQHJldHVybiB7Tm9kZX1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBnZXRNYXJrZXJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5nZXRNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHJldHVybiBkb2MuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmVzIHRoZSBtYXJrZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElEXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWRcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSByZW1vdmVNYXJrZXJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHZhciBtYXJrZXIgPSB0aGlzLmdldE1hcmtlcihpZCk7XG5cblx0XHRcdGlmIChtYXJrZXIpIHtcblx0XHRcdFx0ZG9tLnJlbW92ZShtYXJrZXIpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTYXZlcyB0aGUgY3VycmVudCByYW5nZSBsb2NhdGlvbi4gQWxpYXMgb2YgaW5zZXJ0TWFya2VycygpXG5cdFx0ICpcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBzYXZlUmFnZVxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLnNhdmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0TWFya2VycygpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBTZWxlY3QgdGhlIHNwZWNpZmllZCByYW5nZVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtSYW5nZX0gcmFuZ2Vcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBzZWxlY3RSYW5nZVxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLnNlbGVjdFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XG5cdFx0XHR2YXIgbGFzdENoaWxkO1xuXHRcdFx0dmFyIHNlbCA9IHdpbi5nZXRTZWxlY3Rpb24oKTtcblx0XHRcdHZhciBjb250YWluZXIgPSByYW5nZS5lbmRDb250YWluZXI7XG5cblx0XHRcdC8vIENoZWNrIGlmIGN1cnNvciBpcyBzZXQgYWZ0ZXIgYSBCUiB3aGVuIHRoZSBCUiBpcyB0aGUgb25seVxuXHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcblx0XHRcdC8vIHRvIG9jY3VyIHdoZW4gc29tZXRoaW5nIGlzIHR5cGVkLiBTZWUgaXNzdWUgIzMyMVxuXHRcdFx0aWYgKHJhbmdlLmNvbGxhcHNlZCAmJiBjb250YWluZXIgJiZcblx0XHRcdFx0IWRvbS5pc0lubGluZShjb250YWluZXIsIHRydWUpKSB7XG5cblx0XHRcdFx0bGFzdENoaWxkID0gY29udGFpbmVyLmxhc3RDaGlsZDtcblx0XHRcdFx0d2hpbGUgKGxhc3RDaGlsZCAmJiBkb20uaXMobGFzdENoaWxkLCAnLmVtbGVkaXRvci1pZ25vcmUnKSkge1xuXHRcdFx0XHRcdGxhc3RDaGlsZCA9IGxhc3RDaGlsZC5wcmV2aW91c1NpYmxpbmc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZG9tLmlzKGxhc3RDaGlsZCwgJ2JyJykpIHtcblx0XHRcdFx0XHR2YXIgcm5nID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cdFx0XHRcdFx0cm5nLnNldEVuZEFmdGVyKGxhc3RDaGlsZCk7XG5cdFx0XHRcdFx0cm5nLmNvbGxhcHNlKGZhbHNlKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbXBhcmUocmFuZ2UsIHJuZykpIHtcblx0XHRcdFx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKGxhc3RDaGlsZCk7XG5cdFx0XHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHNlbCkge1xuXHRcdFx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlc3RvcmVzIHRoZSBsYXN0IHJhbmdlIHNhdmVkIGJ5IHNhdmVSYW5nZSgpIG9yIGluc2VydE1hcmtlcnMoKVxuXHRcdCAqXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgcmVzdG9yZVJhbmdlXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMucmVzdG9yZVJhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGlzQ29sbGFwc2VkLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBzdGFydCA9IHRoaXMuZ2V0TWFya2VyKHN0YXJ0TWFya2VyKSwgZW5kID0gdGhpcy5nZXRNYXJrZXIoZW5kTWFya2VyKTtcblxuXHRcdFx0aWYgKCFzdGFydCB8fCAhZW5kIHx8ICFyYW5nZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlzQ29sbGFwc2VkID0gc3RhcnQubmV4dFNpYmxpbmcgPT09IGVuZDtcblxuXHRcdFx0cmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcblx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKHN0YXJ0KTtcblx0XHRcdHJhbmdlLnNldEVuZEFmdGVyKGVuZCk7XG5cblx0XHRcdGlmIChpc0NvbGxhcHNlZCkge1xuXHRcdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcnMoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogU2VsZWN0cyB0aGUgdGV4dCBsZWZ0IGFuZCByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0XG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0XG5cdFx0ICogQHNpbmNlIDEuNC4zXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlcikge1xuXHRcdFx0bGV0IHN0YXJ0OiBhbnksIGVuZDogYW55LCByYW5nZTogYW55ID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XG5cblx0XHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShmYWxzZSk7XG5cblx0XHRcdHN0YXJ0ID0gb3V0ZXJUZXh0KHJhbmdlLCB0cnVlLCBsZWZ0KTtcblx0XHRcdGVuZCA9IG91dGVyVGV4dChyYW5nZSwgZmFsc2UsIHJpZ2h0KTtcblxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQoc3RhcnQubm9kZSwgc3RhcnQub2Zmc2V0KTtcblx0XHRcdHJhbmdlLnNldEVuZChlbmQubm9kZSwgZW5kLm9mZnNldCk7XG5cblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSB0ZXh0IGxlZnQgb3IgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGJlZm9yZVxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICogQHNpbmNlIDEuNC4zXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGJlZm9yZSwgbGVuZ3RoKSB7XG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9XG5cblx0XHRcdHJhbmdlLmNvbGxhcHNlKCFiZWZvcmUpO1xuXG5cdFx0XHRyZXR1cm4gb3V0ZXJUZXh0KHJhbmdlLCBiZWZvcmUsIGxlbmd0aCkudGV4dDtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVwbGFjZXMga2V5d29yZHMgd2l0aCB2YWx1ZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgY2FyZXQgcG9zaXRpb25cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9ICAga2V5d29yZHNcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBZnRlciAgICAgIElmIHRvIGluY2x1ZGUgdGhlIHRleHQgYWZ0ZXIgdGhlXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50IGNhcmV0IHBvc2l0aW9uIG9yIGp1c3Rcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgYmVmb3JlXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBrZXl3b3Jkc1NvcnRlZCAgICBJZiB0aGUga2V5d29yZHMgYXJyYXkgaXMgcHJlXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgc2hvcnRlc3QgdG8gbG9uZ2VzdFxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSAgbG9uZ2VzdEtleXdvcmQgICAgTGVuZ3RoIG9mIHRoZSBsb25nZXN0IGtleXdvcmRcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcXVpcmVXaGl0ZXNwYWNlIElmIHRoZSBrZXkgbXVzdCBiZSBzdXJyb3VuZGVkXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieSB3aGl0ZXNwYWNlXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9ICBrZXlwcmVzc0NoYXIgICAgICBJZiB0aGlzIGlzIGJlaW5nIGNhbGxlZCBmcm9tXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGtleXByZXNzIGV2ZW50LCB0aGlzIHNob3VsZCBiZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0IHRvIHRoZSBwcmVzc2VkIGNoYXJhY3RlclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgcmVwbGFjZUtleXdvcmRcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcblx0XHR0aGlzLnJlcGxhY2VLZXl3b3JkID0gZnVuY3Rpb24gKFxuXHRcdFx0a2V5d29yZHMsXG5cdFx0XHRpbmNsdWRlQWZ0ZXIsXG5cdFx0XHRrZXl3b3Jkc1NvcnRlZCxcblx0XHRcdGxvbmdlc3RLZXl3b3JkLFxuXHRcdFx0cmVxdWlyZVdoaXRlc3BhY2UsXG5cdFx0XHRrZXlwcmVzc0NoYXJcblx0XHQpIHtcblx0XHRcdGlmICgha2V5d29yZHNTb3J0ZWQpIHtcblx0XHRcdFx0a2V5d29yZHMuc29ydChmdW5jdGlvbiAoYTogYW55LCBiOiBhbnkpIHtcblx0XHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvdXRlclRleHQsIG1hdGNoLCBtYXRjaFBvcywgc3RhcnRJbmRleCwgbGVmdExlbiwgY2hhcnNMZWZ0LCBrZXl3b3JkLCBrZXl3b3JkTGVuLCB3aGl0ZXNwYWNlUmVnZXggPSAnKF58W1xcXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKScsIGtleXdvcmRJZHggPSBrZXl3b3Jkcy5sZW5ndGgsIHdoaXRlc3BhY2VMZW4gPSByZXF1aXJlV2hpdGVzcGFjZSA/IDEgOiAwLCBtYXhLZXlMZW4gPSBsb25nZXN0S2V5d29yZCB8fFxuXHRcdFx0XHRrZXl3b3Jkc1trZXl3b3JkSWR4IC0gMV1bMF0ubGVuZ3RoO1xuXG5cdFx0XHRpZiAocmVxdWlyZVdoaXRlc3BhY2UpIHtcblx0XHRcdFx0bWF4S2V5TGVuKys7XG5cdFx0XHR9XG5cblx0XHRcdGtleXByZXNzQ2hhciA9IGtleXByZXNzQ2hhciB8fCAnJztcblx0XHRcdG91dGVyVGV4dCA9IHRoaXMuZ2V0T3V0ZXJUZXh0KHRydWUsIG1heEtleUxlbik7XG5cdFx0XHRsZWZ0TGVuID0gb3V0ZXJUZXh0Lmxlbmd0aDtcblx0XHRcdG91dGVyVGV4dCArPSBrZXlwcmVzc0NoYXI7XG5cblx0XHRcdGlmIChpbmNsdWRlQWZ0ZXIpIHtcblx0XHRcdFx0b3V0ZXJUZXh0ICs9IHRoaXMuZ2V0T3V0ZXJUZXh0KGZhbHNlLCBtYXhLZXlMZW4pO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAoa2V5d29yZElkeC0tKSB7XG5cdFx0XHRcdGtleXdvcmQgPSBrZXl3b3Jkc1trZXl3b3JkSWR4XVswXTtcblx0XHRcdFx0a2V5d29yZExlbiA9IGtleXdvcmQubGVuZ3RoO1xuXHRcdFx0XHRzdGFydEluZGV4ID0gTWF0aC5tYXgoMCwgbGVmdExlbiAtIGtleXdvcmRMZW4gLSB3aGl0ZXNwYWNlTGVuKTtcblx0XHRcdFx0bWF0Y2hQb3MgPSAtMTtcblxuXHRcdFx0XHRpZiAocmVxdWlyZVdoaXRlc3BhY2UpIHtcblx0XHRcdFx0XHRtYXRjaCA9IG91dGVyVGV4dFxuXHRcdFx0XHRcdFx0LnN1YnN0cihzdGFydEluZGV4KVxuXHRcdFx0XHRcdFx0Lm1hdGNoKG5ldyBSZWdFeHAod2hpdGVzcGFjZVJlZ2V4ICtcblx0XHRcdFx0XHRcdFx0ZXNjYXBlLnJlZ2V4KGtleXdvcmQpICsgd2hpdGVzcGFjZVJlZ2V4KSk7XG5cblx0XHRcdFx0XHRpZiAobWF0Y2gpIHtcblx0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGVuZ3RoIG9mIHRoZSB0ZXh0IHRoYXQgd2FzIHJlbW92ZWQgYnlcblx0XHRcdFx0XHRcdC8vIHN1YnN0cigpIGFuZCBhbHNvIGFkZCAxIGZvciB0aGUgd2hpdGVzcGFjZVxuXHRcdFx0XHRcdFx0bWF0Y2hQb3MgPSBtYXRjaC5pbmRleCArIHN0YXJ0SW5kZXggKyBtYXRjaFsxXS5sZW5ndGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG1hdGNoUG9zID0gb3V0ZXJUZXh0LmluZGV4T2Yoa2V5d29yZCwgc3RhcnRJbmRleCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAobWF0Y2hQb3MgPiAtMSkge1xuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgbWF0Y2ggaXMgYmV0d2VlbiBiZWZvcmUgYW5kXG5cdFx0XHRcdFx0Ly8gYWZ0ZXIsIG5vdCBqdXN0IGVudGlyZWx5IGluIG9uZSBzaWRlIG9yIHRoZSBvdGhlclxuXHRcdFx0XHRcdGlmIChtYXRjaFBvcyA8PSBsZWZ0TGVuICYmXG5cdFx0XHRcdFx0XHRtYXRjaFBvcyArIGtleXdvcmRMZW4gKyB3aGl0ZXNwYWNlTGVuID49IGxlZnRMZW4pIHtcblx0XHRcdFx0XHRcdGNoYXJzTGVmdCA9IGxlZnRMZW4gLSBtYXRjaFBvcztcblxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGtleXByZXNzIGNoYXIgaXMgd2hpdGUgc3BhY2UgdGhlbiBpdCBzaG91bGRcblx0XHRcdFx0XHRcdC8vIG5vdCBiZSByZXBsYWNlZCwgb25seSBjaGFycyB0aGF0IGFyZSBwYXJ0IG9mIHRoZVxuXHRcdFx0XHRcdFx0Ly8ga2V5IHNob3VsZCBiZSByZXBsYWNlZC5cblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0KFxuXHRcdFx0XHRcdFx0XHRjaGFyc0xlZnQsXG5cdFx0XHRcdFx0XHRcdGtleXdvcmRMZW4gLSBjaGFyc0xlZnQgLVxuXHRcdFx0XHRcdFx0XHQoL15cXFMvLnRlc3Qoa2V5cHJlc3NDaGFyKSA/IDEgOiAwKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0dGhpcy5pbnNlcnRIVE1MKGtleXdvcmRzW2tleXdvcmRJZHhdWzFdKTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENvbXBhcmVzIHR3byByYW5nZXMuXG5cdFx0ICpcblx0XHQgKiBJZiByYW5nZUIgaXMgdW5kZWZpbmVkIGl0IHdpbGwgYmUgc2V0IHRvXG5cdFx0ICogdGhlIGN1cnJlbnQgc2VsZWN0ZWQgcmFuZ2Vcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge1JhbmdlfSBybmdBXG5cdFx0ICogQHBhcmFtICB7UmFuZ2V9IFtybmdCXVxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgY29tcGFyZVxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmNvbXBhcmUgPSBmdW5jdGlvbiAocm5nQT86IFJhbmdlLCBybmdCPzogUmFuZ2UpOiBib29sZWFuIHtcblx0XHRcdGlmICghcm5nQikge1xuXHRcdFx0XHRybmdCID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghcm5nQSB8fCAhcm5nQikge1xuXHRcdFx0XHRyZXR1cm4gIXJuZ0EgJiYgIXJuZ0I7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBybmdBLmNvbXBhcmVCb3VuZGFyeVBvaW50cyhSYW5nZS5FTkRfVE9fRU5ELCBybmdCKSA9PT0gMCAmJlxuXHRcdFx0XHRybmdBLmNvbXBhcmVCb3VuZGFyeVBvaW50cyhSYW5nZS5TVEFSVF9UT19TVEFSVCwgcm5nQikgPT09IDA7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFJlbW92ZXMgYW55IGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0ICpcblx0XHQgKiBAc2luY2UgMS40LjZcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBjbGVhclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHNlbCA9IHdpbi5nZXRTZWxlY3Rpb24oKTtcblxuXHRcdFx0aWYgKHNlbCkge1xuXHRcdFx0XHRpZiAoc2VsLnJlbW92ZUFsbFJhbmdlcykge1xuXHRcdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzZWwuZW1wdHkpIHtcblx0XHRcdFx0XHRzZWwuZW1wdHkoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBQcmVwYXJlcyBIVE1MIHRvIGJlIGluc2VydGVkIGJ5IGFkZGluZyBhIHplcm8gd2lkdGggc3BhY2Vcblx0XHQgKiBpZiB0aGUgbGFzdCBjaGlsZCBpcyBlbXB0eSBhbmQgYWRkaW5nIHRoZSByYW5nZSBzdGFydC9lbmRcblx0XHQgKiBtYXJrZXJzIHRvIHRoZSBsYXN0IGNoaWxkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IG5vZGVcblx0XHQgKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gW2VuZE5vZGVdXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gW3JldHVybkh0bWxdXG5cdFx0ICogQHJldHVybiB7Tm9kZXxzdHJpbmd9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfcHJlcGFyZUlucHV0ID0gKG5vZGU6IE5vZGUgfCBzdHJpbmcsIGVuZE5vZGU6IE5vZGUgfCBzdHJpbmcsIHJldHVybkh0bWw6IGJvb2xlYW4pOiBOb2RlIHwgc3RyaW5nID0+IHtcblx0XHRcdHZhciBsYXN0Q2hpbGQsIGZyYWcgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG5cdFx0XHRpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGlmIChlbmROb2RlKSB7XG5cdFx0XHRcdFx0bm9kZSArPSB0aGlzLnNlbGVjdGVkSHRtbCgpICsgZW5kTm9kZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZyYWcgPSBkb20ucGFyc2VIVE1MKG5vZGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIG5vZGUpO1xuXG5cdFx0XHRcdGlmIChlbmROb2RlKSB7XG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIHRoaXMuc2VsZWN0ZWRSYW5nZSgpLmV4dHJhY3RDb250ZW50cygpKTtcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgZW5kTm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCEobGFzdENoaWxkID0gZnJhZy5sYXN0Q2hpbGQpKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0d2hpbGUgKCFkb20uaXNJbmxpbmUobGFzdENoaWxkLmxhc3RDaGlsZCwgdHJ1ZSkpIHtcblx0XHRcdFx0bGFzdENoaWxkID0gbGFzdENoaWxkLmxhc3RDaGlsZDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRvbS5jYW5IYXZlQ2hpbGRyZW4obGFzdENoaWxkKSkge1xuXHRcdFx0XHQvLyBXZWJraXQgd29uJ3QgYWxsb3cgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQgaW5zaWRlIGFuXG5cdFx0XHRcdC8vIGVtcHR5IHRhZywgc28gYWRkIGEgemVybyB3aWR0aCBzcGFjZSB0byBpdC5cblx0XHRcdFx0aWYgKCFsYXN0Q2hpbGQubGFzdENoaWxkKSB7XG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1xcdTIwMEInKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxhc3RDaGlsZCA9IGZyYWc7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xuXG5cdFx0XHQvLyBBcHBlbmQgbWFya3MgdG8gbGFzdCBjaGlsZCBzbyB3aGVuIHJlc3RvcmVkIGN1cnNvciB3aWxsIGJlIGluXG5cdFx0XHQvLyB0aGUgcmlnaHQgcGxhY2Vcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIF9jcmVhdGVNYXJrZXIoc3RhcnRNYXJrZXIpKTtcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XG5cblx0XHRcdGlmIChyZXR1cm5IdG1sKSB7XG5cdFx0XHRcdHZhciBkaXYgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChkaXYsIGZyYWcpO1xuXG5cdFx0XHRcdHJldHVybiBkaXYuaW5uZXJIVE1MO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZnJhZztcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhIG1hcmtlciBub2RlXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWRcblx0XHQgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHRfY3JlYXRlTWFya2VyID0gKGlkOiBzdHJpbmcpOiBIVE1MU3BhbkVsZW1lbnQgPT4ge1xuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoaWQpO1xuXG5cdFx0XHR2YXIgbWFya2VyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XG5cdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLXNlbGVjdGlvbiBlbWxlZGl0b3ItaWdub3JlJyxcblx0XHRcdFx0c3R5bGU6ICdkaXNwbGF5Om5vbmU7bGluZS1oZWlnaHQ6MCdcblx0XHRcdH0sIGRvYyk7XG5cblx0XHRcdG1hcmtlci5pbm5lckhUTUwgPSAnICc7XG5cblx0XHRcdHJldHVybiBtYXJrZXI7XG5cdFx0fTtcblx0fVxufVxuIiwidmFyIFVTRVJfQUdFTlQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4vKipcbiAqIERldGVjdHMgaWYgdGhlIGJyb3dzZXIgaXMgaU9TXG4gKlxuICogTmVlZGVkIHRvIGZpeCBpT1Mgc3BlY2lmaWMgYnVnc1xuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaW9zXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpb3MgPSAvaVBob25lfGlQb2R8aVBhZHwgd29zYnJvd3NlclxcLy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cbi8qKlxuICogSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgV1lTSVdZRyBlZGl0aW5nIChlLmcuIG9sZGVyIG1vYmlsZSBicm93c2VycykuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBpc1d5c2l3eWdTdXBwb3J0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNXeXNpd3lnU3VwcG9ydGVkID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyXHRtYXRjaCwgaXNVbnN1cHBvcnRlZDtcblxuXHQvLyBJRSBpcyB0aGUgb25seSBicm93c2VyIHRvIHN1cHBvcnQgZG9jdW1lbnRNb2RlXG5cdHZhciBpZSA9ICEhd2luZG93LmRvY3VtZW50LmRvY3VtZW50TW9kZTtcblx0dmFyIGxlZ2FjeUVkZ2UgPSAnLW1zLWltZS1hbGlnbicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG5cblx0Ly8gQ2hlY2sgaWYgdGhlIGNvbnRlbnRFZGl0YWJsZSBhdHRyaWJ1dGUgaXMgc3VwcG9ydGVkXG5cdGlmICghKCdjb250ZW50RWRpdGFibGUnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgfHxcblx0XHRkaXYuY29udGVudEVkaXRhYmxlICE9PSAndHJ1ZScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBJIHRoaW5rIGJsYWNrYmVycnkgc3VwcG9ydHMgY29udGVudEVkaXRhYmxlIG9yIHdpbGwgYXQgbGVhc3Rcblx0Ly8gZ2l2ZSBhIHZhbGlkIHZhbHVlIGZvciB0aGUgY29udGVudEVkaXRhYmxlIGRldGVjdGlvbiBhYm92ZVxuXHQvLyBzbyBpdCBpc24ndCBpbmNsdWRlZCBpbiB0aGUgYmVsb3cgdGVzdHMuXG5cblx0Ly8gSSBoYXRlIGhhdmluZyB0byBkbyBVQSBzbmlmZmluZyBidXQgc29tZSBtb2JpbGUgYnJvd3NlcnMgc2F5IHRoZXlcblx0Ly8gc3VwcG9ydCBjb250ZW50ZWRpYWJsZSB3aGVuIGl0IGlzbid0IHVzYWJsZSwgaS5lLiB5b3UgY2FuJ3QgZW50ZXJcblx0Ly8gdGV4dC5cblx0Ly8gVGhpcyBpcyB0aGUgb25seSB3YXkgSSBjYW4gdGhpbmsgb2YgdG8gZGV0ZWN0IHRoZW0gd2hpY2ggaXMgYWxzbyBob3dcblx0Ly8gZXZlcnkgb3RoZXIgZWRpdG9yIEkndmUgc2VlbiBkZWFscyB3aXRoIHRoaXMgaXNzdWUuXG5cblx0Ly8gRXhjbHVkZSBPcGVyYSBtb2JpbGUgYW5kIG1pbmlcblx0aXNVbnN1cHBvcnRlZCA9IC9PcGVyYSBNb2JpfE9wZXJhIE1pbmkvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG5cdGlmICgvQW5kcm9pZC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblxuXHRcdGlmICgvU2FmYXJpLy50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgNTM0KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdFx0XHQvLyBUaGlzIGFsc28gbWF0Y2hlcyBDaHJvbWUgd2hpY2ggc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZSB0b29cblx0XHRcdG1hdGNoID0gL1NhZmFyaVxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRcdGlzVW5zdXBwb3J0ZWQgPSAoIW1hdGNoIHx8ICFtYXRjaFsxXSA/IHRydWUgOiBtYXRjaFsxXSA8IDUzNCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBBbWF6b24gU2lsayBzdXBwb3J0cyBpdCwgb2xkZXIgdmVyc2lvbnMgZGlkbid0XG5cdC8vIEFzIGl0IHVzZXMgd2Via2l0IGxpa2UgQW5kcm9pZCwgYXNzdW1lIGl0J3MgdGhlIHNhbWUgYW5kIHN0YXJ0ZWRcblx0Ly8gd29ya2luZyBhdCB2ZXJzaW9ucyA+PSA1MzRcblx0aWYgKC8gU2lsa1xcLy9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRtYXRjaCA9IC9BcHBsZVdlYktpdFxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHR9XG5cblx0Ly8gaU9TIDUrIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGVcblx0aWYgKGlvcykge1xuXHRcdC8vIEJsb2NrIGFueSB2ZXJzaW9uIDw9IDRfeChfeClcblx0XHRpc1Vuc3VwcG9ydGVkID0gL09TIFswLTRdKF9cXGQpKyBsaWtlIE1hYy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cdH1cblxuXHQvLyBGaXJlZm94IGRvZXMgc3VwcG9ydCBXWVNJV1lHIG9uIG1vYmlsZXMgc28gb3ZlcnJpZGVcblx0Ly8gYW55IHByZXZpb3VzIHZhbHVlIGlmIHVzaW5nIEZGXG5cdGlmICgvRmlyZWZveC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHRpZiAoL09uZUJyb3dzZXIvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gVUNCcm93c2VyIHdvcmtzIGJ1dCBkb2Vzbid0IGdpdmUgYSB1bmlxdWUgdXNlciBhZ2VudFxuXHRpZiAobmF2aWdhdG9yLnZlbmRvciA9PT0gJ1VDV0VCJykge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElFIGFuZCBsZWdhY3kgZWRnZSBhcmUgbm90IHN1cHBvcnRlZCBhbnkgbW9yZVxuXHRpZiAoaWUgfHwgbGVnYWN5RWRnZSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSB0cnVlO1xuXHR9XG5cblx0cmV0dXJuICFpc1Vuc3VwcG9ydGVkO1xufSgpKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuaW1wb3J0IF90bXBsIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcblxuLyoqXG4gKiBGaXhlcyBhIGJ1ZyBpbiBGRiB3aGVyZSBpdCBzb21ldGltZXMgd3JhcHNcbiAqIG5ldyBsaW5lcyBpbiB0aGVpciBvd24gbGlzdCBpdGVtLlxuICogU2VlIGlzc3VlICMzNTlcbiAqL1xuZnVuY3Rpb24gZml4RmlyZWZveExpc3RCdWcoZWRpdG9yKSB7XG5cdC8vIE9ubHkgYXBwbHkgdG8gRmlyZWZveCBhcyB3aWxsIGJyZWFrIG90aGVyIGJyb3dzZXJzLlxuXHRpZiAoJ21vekhpZGRlbicgaW4gZG9jdW1lbnQpIHtcblx0XHR2YXIgbm9kZSA9IGVkaXRvci5nZXRCb2R5KCk7XG5cdFx0dmFyIG5leHQ7XG5cblx0XHR3aGlsZSAobm9kZSkge1xuXHRcdFx0bmV4dCA9IG5vZGU7XG5cblx0XHRcdGlmIChuZXh0LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0bmV4dCA9IG5leHQuZmlyc3RDaGlsZDtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0d2hpbGUgKG5leHQgJiYgIW5leHQubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5wYXJlbnROb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5uZXh0U2libGluZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAvW1xcblxcclxcdF0rLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkge1xuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBpZiBuZXdsaW5lcyBhcmUgY29sbGFwc2VkXG5cdFx0XHRcdGlmICghL15wcmUvLnRlc3QoZG9tLmNzcyhub2RlLnBhcmVudE5vZGUsICd3aGl0ZVNwYWNlJykpKSB7XG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbmV4dDtcblx0XHR9XG5cdH1cbn1cblxuXG4vKipcbiAqIE1hcCBvZiBhbGwgdGhlIGNvbW1hbmRzIGZvciBFbWxFZGl0b3JcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAbmFtZSBjb21tYW5kc1xuICovXG52YXIgZGVmYXVsdENtZHMgPSB7XG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJvbGRcblx0Ym9sZDoge1xuXHRcdGV4ZWM6ICdib2xkJyxcblx0XHR0b29sdGlwOiAnQm9sZCcsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0InXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEl0YWxpY1xuXHRpdGFsaWM6IHtcblx0XHRleGVjOiAnaXRhbGljJyxcblx0XHR0b29sdGlwOiAnSXRhbGljJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrSSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogVW5kZXJsaW5lXG5cdHVuZGVybGluZToge1xuXHRcdGV4ZWM6ICd1bmRlcmxpbmUnLFxuXHRcdHRvb2x0aXA6ICdVbmRlcmxpbmUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtVJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdHJpa2V0aHJvdWdoXG5cdHN0cmlrZToge1xuXHRcdGV4ZWM6ICdzdHJpa2V0aHJvdWdoJyxcblx0XHR0b29sdGlwOiAnU3RyaWtldGhyb3VnaCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogU3Vic2NyaXB0XG5cdHN1YnNjcmlwdDoge1xuXHRcdGV4ZWM6ICdzdWJzY3JpcHQnLFxuXHRcdHRvb2x0aXA6ICdTdWJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1cGVyc2NyaXB0XG5cdHN1cGVyc2NyaXB0OiB7XG5cdFx0ZXhlYzogJ3N1cGVyc2NyaXB0Jyxcblx0XHR0b29sdGlwOiAnU3VwZXJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGVmdFxuXHRsZWZ0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otbGVmdFxuXHRcdFx0XHRyZXR1cm4gL2xlZnQvLnRlc3QoYWxpZ24pIHx8XG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdzdGFydCcgOiAnZW5kJyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRleGVjOiAnanVzdGlmeWxlZnQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiBsZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDZW50cmVcblx0Y2VudGVyOiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnljZW50ZXInLFxuXHRcdHRvb2x0aXA6ICdDZW50ZXInXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJpZ2h0XG5cdHJpZ2h0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otcmlnaHRcblx0XHRcdFx0cmV0dXJuIC9yaWdodC8udGVzdChhbGlnbikgfHxcblx0XHRcdFx0XHRhbGlnbiA9PT0gKGlzTHRyID8gJ2VuZCcgOiAnc3RhcnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGV4ZWM6ICdqdXN0aWZ5cmlnaHQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiByaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogSnVzdGlmeVxuXHRqdXN0aWZ5OiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnlmdWxsJyxcblx0XHR0b29sdGlwOiAnSnVzdGlmeSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBGb250XG5cdGZvbnQ6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2ZvbnQnKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLm9wdHMuZm9udHMuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChmb250KSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZm9udE9wdCcsIHtcblx0XHRcdFx0XHRmb250OiBmb250XG5cdFx0XHRcdH0sIHRydWUpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udC1waWNrZXInLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5mb250Ll9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGZvbnROYW1lKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udG5hbWUnLCBmb250TmFtZSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IE5hbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNpemVcblx0c2l6ZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnc2l6ZScpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSA3OyBpKyspIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdzaXplT3B0Jywge1xuXHRcdFx0XHRcdHNpemU6IGlcblx0XHRcdFx0fSwgdHJ1ZSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udHNpemUtcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuc2l6ZS5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250U2l6ZSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRzaXplJywgZm9udFNpemUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBTaXplJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2xvdXJcblx0Y29sb3I6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0aHRtbCAgICA9ICcnLFxuXHRcdFx0XHRjbWQgICAgID0gZGVmYXVsdENtZHMuY29sb3I7XG5cblx0XHRcdGlmICghY21kLl9odG1sQ2FjaGUpIHtcblx0XHRcdFx0ZWRpdG9yLm9wdHMuY29sb3JzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XG5cdFx0XHRcdFx0aHRtbCArPSAnPGRpdiBjbGFzcz1cImVtbGVkaXRvci1jb2xvci1jb2x1bW5cIj4nO1xuXG5cdFx0XHRcdFx0Y29sdW1uLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRcdFx0XHRcdGh0bWwgKz1cblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJlbWxlZGl0b3ItY29sb3Itb3B0aW9uXCInICtcblx0XHRcdFx0XHRcdFx0JyBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcgKyBjb2xvciArICdcIicgK1xuXHRcdFx0XHRcdFx0XHQnIGRhdGEtY29sb3I9XCInICsgY29sb3IgKyAnXCI+PC9hPic7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRodG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjbWQuX2h0bWxDYWNoZSA9IGh0bWw7XG5cdFx0XHR9XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBkb20ucGFyc2VIVE1MKGNtZC5faHRtbENhY2hlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGRvbS5kYXRhKHRoaXMsICdjb2xvcicpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnY29sb3ItcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuY29sb3IuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JlY29sb3InLCBjb2xvcik7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IENvbG9yJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBSZW1vdmUgRm9ybWF0XG5cdHJlbW92ZWZvcm1hdDoge1xuXHRcdGV4ZWM6ICdyZW1vdmVmb3JtYXQnLFxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgRm9ybWF0dGluZydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBDdXRcblx0Y3V0OiB7XG5cdFx0ZXhlYzogJ2N1dCcsXG5cdFx0dG9vbHRpcDogJ0N1dCcsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjdXQgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtWCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29weVxuXHRjb3B5OiB7XG5cdFx0ZXhlYzogJ2NvcHknLFxuXHRcdHRvb2x0aXA6ICdDb3B5Jyxcblx0XHRlcnJvck1lc3NhZ2U6ICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgYWxsb3cgdGhlIGNvcHkgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtQydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGVcblx0cGFzdGU6IHtcblx0XHRleGVjOiAncGFzdGUnLFxuXHRcdHRvb2x0aXA6ICdQYXN0ZScsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBwYXN0ZSBjb21tYW5kLiAnICtcblx0XHRcdCdQbGVhc2UgdXNlIHRoZSBrZXlib2FyZCBzaG9ydGN1dCBDdHJsL0NtZC1WJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBQYXN0ZSBUZXh0XG5cdHBhc3RldGV4dDoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0dmFsLFxuXHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRlZGl0b3IgID0gdGhpcztcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdwYXN0ZXRleHQnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IuXyhcblx0XHRcdFx0XHQnUGFzdGUgeW91ciB0ZXh0IGluc2lkZSB0aGUgZm9sbG93aW5nIGJveDonXG5cdFx0XHRcdCksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhbCA9IGRvbS5maW5kKGNvbnRlbnQsICcjdHh0JylbMF0udmFsdWU7XG5cblx0XHRcdFx0aWYgKHZhbCkge1xuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dCh2YWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAncGFzdGV0ZXh0JywgY29udGVudCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnUGFzdGUgVGV4dCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQnVsbGV0IExpc3Rcblx0YnVsbGV0bGlzdDoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZpeEZpcmVmb3hMaXN0QnVnKHRoaXMpO1xuXHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnaW5zZXJ0dW5vcmRlcmVkbGlzdCcpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0J1bGxldCBsaXN0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBPcmRlcmVkIExpc3Rcblx0b3JkZXJlZGxpc3Q6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcblx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ2luc2VydG9yZGVyZWRsaXN0Jyk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTnVtYmVyZWQgbGlzdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogSW5kZW50XG5cdGluZGVudDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50LCBmaXJzdEJsb2NrKSB7XG5cdFx0XHQvLyBPbmx5IHdvcmtzIHdpdGggbGlzdHMsIGZvciBub3dcblx0XHRcdHZhclx0cmFuZ2UsIHN0YXJ0UGFyZW50LCBlbmRQYXJlbnQ7XG5cblx0XHRcdGlmIChkb20uaXMoZmlyc3RCbG9jaywgJ2xpJykpIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb20uaXMoZmlyc3RCbG9jaywgJ3VsLG9sLG1lbnUnKSkge1xuXHRcdFx0XHQvLyBpZiB0aGUgd2hvbGUgbGlzdCBpcyBzZWxlY3RlZCwgdGhlbiB0aGlzIG11c3QgYmVcblx0XHRcdFx0Ly8gaW52YWxpZGF0ZWQgYmVjYXVzZSB0aGUgYnJvd3NlciB3aWxsIHBsYWNlIGFcblx0XHRcdFx0Ly8gPGJsb2NrcXVvdGU+IHRoZXJlXG5cdFx0XHRcdHJhbmdlID0gdGhpcy5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkUmFuZ2UoKTtcblxuXHRcdFx0XHRzdGFydFBhcmVudCA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLnBhcmVudE5vZGU7XG5cdFx0XHRcdGVuZFBhcmVudCAgID0gcmFuZ2UuZW5kQ29udGFpbmVyLnBhcmVudE5vZGU7XG5cblx0XHRcdFx0Ly8gVE9ETzogY291bGQgdXNlIG5vZGVUeXBlIGZvciB0aGlzP1xuXHRcdFx0XHQvLyBNYXliZSBqdXN0IGNoZWNrIHRoZSBmaXJzdEJsb2NrIGNvbnRhaW5zIGJvdGggdGhlIHN0YXJ0XG5cdFx0XHRcdC8vYW5kIGVuZCBjb250YWluZXJzXG5cblx0XHRcdFx0Ly8gU2VsZWN0IHRoZSB0YWcsIG5vdCB0aGUgdGV4dE5vZGVcblx0XHRcdFx0Ly8gKHRoYXQncyB3aHkgdGhlIHBhcmVudE5vZGUpXG5cdFx0XHRcdGlmIChzdGFydFBhcmVudCAhPT1cblx0XHRcdFx0XHRzdGFydFBhcmVudC5wYXJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkIHx8XG5cdFx0XHRcdFx0Ly8gd29yayBhcm91bmQgYSBidWcgaW4gRkZcblx0XHRcdFx0XHQoZG9tLmlzKGVuZFBhcmVudCwgJ2xpJykgJiYgZW5kUGFyZW50ICE9PVxuXHRcdFx0XHRcdFx0ZW5kUGFyZW50LnBhcmVudE5vZGUubGFzdEVsZW1lbnRDaGlsZCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcyxcblx0XHRcdFx0YmxvY2sgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHQvLyBBbiBpbmRlbnQgc3lzdGVtIGlzIHF1aXRlIGNvbXBsaWNhdGVkIGFzIHRoZXJlIGFyZSBsb2Fkc1xuXHRcdFx0Ly8gb2YgY29tcGxpY2F0aW9ucyBhbmQgaXNzdWVzIGFyb3VuZCBob3cgdG8gaW5kZW50IHRleHRcblx0XHRcdC8vIEFzIGRlZmF1bHQsIGxldCdzIGp1c3Qgc3RheSB3aXRoIGluZGVudGluZyB0aGUgbGlzdHMsXG5cdFx0XHQvLyBhdCBsZWFzdCwgZm9yIG5vdy5cblx0XHRcdGlmIChkb20uY2xvc2VzdChibG9jaywgJ3VsLG9sLG1lbnUnKSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2luZGVudCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0FkZCBpbmRlbnQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IE91dGRlbnRcblx0b3V0ZGVudDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50cywgZmlyc3RCbG9jaykge1xuXHRcdFx0cmV0dXJuIGRvbS5jbG9zZXN0KGZpcnN0QmxvY2ssICd1bCxvbCxtZW51JykgPyAwIDogLTE7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGJsb2NrID0gdGhpcy5nZXRSYW5nZUhlbHBlcigpLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblx0XHRcdGlmIChkb20uY2xvc2VzdChibG9jaywgJ3VsLG9sLG1lbnUnKSkge1xuXHRcdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdvdXRkZW50Jyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnUmVtb3ZlIG9uZSBpbmRlbnQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVGFibGVcblx0dGFibGU6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzLFxuXHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3RhYmxlJywge1xuXHRcdFx0XHRyb3dzOiBlZGl0b3IuXygnUm93czonKSxcblx0XHRcdFx0Y29sczogZWRpdG9yLl8oJ0NvbHM6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhclx0cm93cyA9IE51bWJlcihkb20uZmluZChjb250ZW50LCAnI3Jvd3MnKVswXS52YWx1ZSksXG5cdFx0XHRcdFx0Y29scyA9IE51bWJlcihkb20uZmluZChjb250ZW50LCAnI2NvbHMnKVswXS52YWx1ZSksXG5cdFx0XHRcdFx0aHRtbCA9ICc8dGFibGU+JztcblxuXHRcdFx0XHRpZiAocm93cyA+IDAgJiYgY29scyA+IDApIHtcblx0XHRcdFx0XHRodG1sICs9IEFycmF5KHJvd3MgKyAxKS5qb2luKFxuXHRcdFx0XHRcdFx0Jzx0cj4nICtcblx0XHRcdFx0XHRcdFx0QXJyYXkoY29scyArIDEpLmpvaW4oXG5cdFx0XHRcdFx0XHRcdFx0Jzx0ZD48YnIgLz48L3RkPidcblx0XHRcdFx0XHRcdFx0KSArXG5cdFx0XHRcdFx0XHQnPC90cj4nXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGh0bWwgKz0gJzwvdGFibGU+JztcblxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChodG1sKTtcblx0XHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0dGFibGUnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSB0YWJsZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBIb3Jpem9udGFsIFJ1bGVcblx0aG9yaXpvbnRhbHJ1bGU6IHtcblx0XHRleGVjOiAnaW5zZXJ0aG9yaXpvbnRhbHJ1bGUnLFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBob3Jpem9udGFsIHJ1bGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogQ29kZVxuXHRjb2RlOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0Jzxjb2RlPicsXG5cdFx0XHRcdCc8YnIgLz48L2NvZGU+J1xuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdDb2RlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEltYWdlXG5cdGltYWdlOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIHNlbGVjdGVkLCBjYikge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2ltYWdlJywge1xuXHRcdFx0XHR1cmw6IGVkaXRvci5fKCdVUkw6JyksXG5cdFx0XHRcdHdpZHRoOiBlZGl0b3IuXygnV2lkdGggKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aGVpZ2h0OiBlZGl0b3IuXygnSGVpZ2h0IChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblxuXHRcdFx0dmFyXHR1cmxJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjaW1hZ2UnKVswXTtcblxuXHRcdFx0dXJsSW5wdXQudmFsdWUgPSBzZWxlY3RlZDtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKHVybElucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2IoXG5cdFx0XHRcdFx0XHR1cmxJbnB1dC52YWx1ZSxcblx0XHRcdFx0XHRcdGRvbS5maW5kKGNvbnRlbnQsICcjd2lkdGgnKVswXS52YWx1ZSxcblx0XHRcdFx0XHRcdGRvbS5maW5kKGNvbnRlbnQsICcjaGVpZ2h0JylbMF0udmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0aW1hZ2UnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0ZWRpdG9yICA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmltYWdlLl9kcm9wRG93bihcblx0XHRcdFx0ZWRpdG9yLFxuXHRcdFx0XHRjYWxsZXIsXG5cdFx0XHRcdCcnLFxuXHRcdFx0XHRmdW5jdGlvbiAodXJsLCB3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0XHRcdFx0dmFyIGF0dHJzICA9ICcnO1xuXG5cdFx0XHRcdFx0aWYgKHdpZHRoKSB7XG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIHdpZHRoPVwiJyArIHBhcnNlSW50KHdpZHRoLCAxMCkgKyAnXCInO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChoZWlnaHQpIHtcblx0XHRcdFx0XHRcdGF0dHJzICs9ICcgaGVpZ2h0PVwiJyArIHBhcnNlSW50KGhlaWdodCwgMTApICsgJ1wiJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhdHRycyArPSAnIHNyYz1cIicgKyBlc2NhcGUuZW50aXRpZXModXJsKSArICdcIic7XG5cblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdFx0XHQnPGltZycgKyBhdHRycyArICcgLz4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gaW1hZ2UnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRS1tYWlsXG5cdGVtYWlsOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZW1haWwnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IuXygnRS1tYWlsOicpLFxuXHRcdFx0XHRkZXNjOiBlZGl0b3IuXygnRGVzY3JpcHRpb24gKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyIGVtYWlsID0gZG9tLmZpbmQoY29udGVudCwgJyNlbWFpbCcpWzBdLnZhbHVlO1xuXG5cdFx0XHRcdGlmIChlbWFpbCkge1xuXHRcdFx0XHRcdGNiKGVtYWlsLCBkb20uZmluZChjb250ZW50LCAnI2RlcycpWzBdLnZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGVtYWlsJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5lbWFpbC5fZHJvcERvd24oXG5cdFx0XHRcdGVkaXRvcixcblx0XHRcdFx0Y2FsbGVyLFxuXHRcdFx0XHRmdW5jdGlvbiAoZW1haWwsIHRleHQpIHtcblx0XHRcdFx0XHRpZiAoIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpIHx8IHRleHQpIHtcblx0XHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICtcblx0XHRcdFx0XHRcdFx0J21haWx0bzonICsgZXNjYXBlLmVudGl0aWVzKGVtYWlsKSArICdcIj4nICtcblx0XHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoKHRleHQgfHwgZW1haWwpKSArXG5cdFx0XHRcdFx0XHRcdCc8L2E+J1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgJ21haWx0bzonICsgZW1haWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1haWwnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGlua1xuXHRsaW5rOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdsaW5rJywge1xuXHRcdFx0XHR1cmw6IGVkaXRvci5fKCdVUkw6JyksXG5cdFx0XHRcdGRlc2M6IGVkaXRvci5fKCdEZXNjcmlwdGlvbiAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRpbnM6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHR2YXIgbGlua0lucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNsaW5rJylbMF07XG5cblx0XHRcdGZ1bmN0aW9uIGluc2VydFVybChlKSB7XG5cdFx0XHRcdGlmIChsaW5rSW5wdXQudmFsdWUpIHtcblx0XHRcdFx0XHRjYihsaW5rSW5wdXQudmFsdWUsIGRvbS5maW5kKGNvbnRlbnQsICcjZGVzJylbMF0udmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgaW5zZXJ0VXJsKTtcblx0XHRcdGRvbS5vbihjb250ZW50LCAna2V5cHJlc3MnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyAxMyA9IGVudGVyIGtleVxuXHRcdFx0XHRpZiAoZS53aGljaCA9PT0gMTMgJiYgbGlua0lucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0aW5zZXJ0VXJsKGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBkb20uRVZFTlRfQ0FQVFVSRSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRsaW5rJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMubGluay5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uICh1cmwsIHRleHQpIHtcblx0XHRcdFx0aWYgKHRleHQgfHwgIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyh0ZXh0IHx8IHVybCkgK1xuXHRcdFx0XHRcdFx0JzwvYT4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2NyZWF0ZWxpbmsnLCB1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBsaW5rJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVubGlua1xuXHR1bmxpbms6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGRvbS5jbG9zZXN0KHRoaXMuY3VycmVudE5vZGUoKSwgJ2EnKSA/IDAgOiAtMTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBhbmNob3IgPSBkb20uY2xvc2VzdCh0aGlzLmN1cnJlbnROb2RlKCksICdhJyk7XG5cblx0XHRcdGlmIChhbmNob3IpIHtcblx0XHRcdFx0d2hpbGUgKGFuY2hvci5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShhbmNob3IuZmlyc3RDaGlsZCwgYW5jaG9yKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvbS5yZW1vdmUoYW5jaG9yKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdVbmxpbmsnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBRdW90ZVxuXHRxdW90ZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIsIGh0bWwsIGF1dGhvcikge1xuXHRcdFx0dmFyXHRiZWZvcmUgPSAnPGJsb2NrcXVvdGU+Jyxcblx0XHRcdFx0ZW5kICAgID0gJzwvYmxvY2txdW90ZT4nO1xuXG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBIVE1MIHBhc3NlZCBzZXQgZW5kIHRvIG51bGwgc28gYW55IHNlbGVjdGVkXG5cdFx0XHQvLyB0ZXh0IGlzIHJlcGxhY2VkXG5cdFx0XHRpZiAoaHRtbCkge1xuXHRcdFx0XHRhdXRob3IgPSAoYXV0aG9yID8gJzxjaXRlPicgK1xuXHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyhhdXRob3IpICtcblx0XHRcdFx0JzwvY2l0ZT4nIDogJycpO1xuXHRcdFx0XHRiZWZvcmUgPSBiZWZvcmUgKyBhdXRob3IgKyBodG1sICsgZW5kO1xuXHRcdFx0XHRlbmQgICAgPSBudWxsO1xuXHRcdFx0Ly8gaWYgbm90IGFkZCBhIG5ld2xpbmUgdG8gdGhlIGVuZCBvZiB0aGUgaW5zZXJ0ZWQgcXVvdGVcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpID09PSAnJykge1xuXHRcdFx0XHRlbmQgPSAnPGJyIC8+JyArIGVuZDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChiZWZvcmUsIGVuZCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgUXVvdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRW1vdGljb25zXG5cdGVtb3RpY29uOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdHZhciBjcmVhdGVDb250ZW50ID0gZnVuY3Rpb24gKGluY2x1ZGVNb3JlKSB7XG5cdFx0XHRcdHZhclx0bW9yZUxpbmssXG5cdFx0XHRcdFx0b3B0cyAgICAgICAgICAgID0gZWRpdG9yLm9wdHMsXG5cdFx0XHRcdFx0ZW1vdGljb25zUm9vdCAgID0gb3B0cy5lbW90aWNvbnNSb290IHx8ICcnLFxuXHRcdFx0XHRcdGVtb3RpY29uc0NvbXBhdCA9IG9wdHMuZW1vdGljb25zQ29tcGF0LFxuXHRcdFx0XHRcdHJhbmdlSGVscGVyICAgICA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxuXHRcdFx0XHRcdHN0YXJ0U3BhY2UgICAgICA9IGVtb3RpY29uc0NvbXBhdCAmJlxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIuZ2V0T3V0ZXJUZXh0KHRydWUsIDEpICE9PSAnICcgPyAnICcgOiAnJyxcblx0XHRcdFx0XHRlbmRTcGFjZSAgICAgICAgPSBlbW90aWNvbnNDb21wYXQgJiZcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dChmYWxzZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxuXHRcdFx0XHRcdGNvbnRlbnQgICAgICAgICA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0XHRsaW5lICAgICAgICAgICAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdFx0cGVyTGluZSAgICAgICAgID0gMCxcblx0XHRcdFx0XHRlbW90aWNvbnMgICAgICAgPSB1dGlscy5leHRlbmQoXG5cdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdG9wdHMuZW1vdGljb25zLmRyb3Bkb3duLFxuXHRcdFx0XHRcdFx0aW5jbHVkZU1vcmUgPyBvcHRzLmVtb3RpY29ucy5tb3JlIDoge31cblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBsaW5lKTtcblxuXHRcdFx0XHRwZXJMaW5lID0gTWF0aC5zcXJ0KE9iamVjdC5rZXlzKGVtb3RpY29ucykubGVuZ3RoKTtcblxuXHRcdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2ltZycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLmluc2VydChzdGFydFNwYWNlICsgZG9tLmF0dHIodGhpcywgJ2FsdCcpICsgZW5kU3BhY2UsXG5cdFx0XHRcdFx0XHRudWxsLCBmYWxzZSkuY2xvc2VEcm9wRG93bih0cnVlKTtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChjb2RlLCBlbW90aWNvbikge1xuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChsaW5lLCBkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xuXHRcdFx0XHRcdFx0c3JjOiBlbW90aWNvbnNSb290ICsgKGVtb3RpY29uLnVybCB8fCBlbW90aWNvbiksXG5cdFx0XHRcdFx0XHRhbHQ6IGNvZGUsXG5cdFx0XHRcdFx0XHR0aXRsZTogZW1vdGljb24udG9vbHRpcCB8fCBjb2RlXG5cdFx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdFx0aWYgKGxpbmUuY2hpbGRyZW4ubGVuZ3RoID49IHBlckxpbmUpIHtcblx0XHRcdFx0XHRcdGxpbmUgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoIWluY2x1ZGVNb3JlICYmIG9wdHMuZW1vdGljb25zLm1vcmUpIHtcblx0XHRcdFx0XHRtb3JlTGluayA9IGRvbS5jcmVhdGVFbGVtZW50KCdhJywge1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLW1vcmUnXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobW9yZUxpbmssXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlZGl0b3IuXygnTW9yZScpKSk7XG5cblx0XHRcdFx0XHRkb20ub24obW9yZUxpbmssICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oXG5cdFx0XHRcdFx0XHRcdGNhbGxlciwgJ21vcmUtZW1vdGljb25zJywgY3JlYXRlQ29udGVudCh0cnVlKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIG1vcmVMaW5rKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2Vtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQoZmFsc2UpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdGRlZmF1bHRDbWRzLmVtb3RpY29uLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBlbW90aWNvbidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBZb3VUdWJlXG5cdHlvdXR1YmU6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd5b3V0dWJlTWVudScsIHtcblx0XHRcdFx0bGFiZWw6IGVkaXRvci5fKCdWaWRlbyBVUkw6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBkb20uZmluZChjb250ZW50LCAnI2xpbmsnKVswXS52YWx1ZTtcblx0XHRcdFx0dmFyIGlkTWF0Y2ggPSB2YWwubWF0Y2goLyg/OnY9fHZcXC98ZW1iZWRcXC98eW91dHUuYmVcXC8pPyhbYS16QS1aMC05Xy1dezExfSkvKTtcblx0XHRcdFx0dmFyIHRpbWVNYXRjaCA9IHZhbC5tYXRjaCgvWyZ8P10oPzpzdGFyKT90PSgoXFxkK1tobXNdPyl7MSwzfSkvKTtcblx0XHRcdFx0dmFyIHRpbWUgPSAwO1xuXG5cdFx0XHRcdGlmICh0aW1lTWF0Y2gpIHtcblx0XHRcdFx0XHR1dGlscy5lYWNoKHRpbWVNYXRjaFsxXS5zcGxpdCgvW2htc10vKSwgZnVuY3Rpb24gKGksIHZhbCkge1xuXHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0dGltZSA9ICh0aW1lICogNjApICsgTnVtYmVyKHZhbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWRNYXRjaCAmJiAvXlthLXpBLVowLTlfLV17MTF9JC8udGVzdChpZE1hdGNoWzFdKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKGlkTWF0Y2hbMV0sIHRpbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGJ0bikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLnlvdXR1YmUuX2Ryb3BEb3duKGVkaXRvciwgYnRuLCBmdW5jdGlvbiAoaWQsIHRpbWUpIHtcblx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKF90bXBsKCd5b3V0dWJlJywge1xuXHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFlvdVR1YmUgdmlkZW8nXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRGF0ZVxuXHRkYXRlOiB7XG5cdFx0X2RhdGU6IGZ1bmN0aW9uIChlZGl0b3IpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHR5ZWFyICA9IG5vdy5nZXRZZWFyKCksXG5cdFx0XHRcdG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxLFxuXHRcdFx0XHRkYXkgICA9IG5vdy5nZXREYXRlKCk7XG5cblx0XHRcdGlmICh5ZWFyIDwgMjAwMCkge1xuXHRcdFx0XHR5ZWFyID0gMTkwMCArIHllYXI7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtb250aCA8IDEwKSB7XG5cdFx0XHRcdG1vbnRoID0gJzAnICsgbW9udGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXkgPCAxMCkge1xuXHRcdFx0XHRkYXkgPSAnMCcgKyBkYXk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlZGl0b3Iub3B0cy5kYXRlRm9ybWF0XG5cdFx0XHRcdC5yZXBsYWNlKC95ZWFyL2ksIHllYXIpXG5cdFx0XHRcdC5yZXBsYWNlKC9tb250aC9pLCBtb250aClcblx0XHRcdFx0LnJlcGxhY2UoL2RheS9pLCBkYXkpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IGRhdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVGltZVxuXHR0aW1lOiB7XG5cdFx0X3RpbWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRob3VycyA9IG5vdy5nZXRIb3VycygpLFxuXHRcdFx0XHRtaW5zICA9IG5vdy5nZXRNaW51dGVzKCksXG5cdFx0XHRcdHNlY3MgID0gbm93LmdldFNlY29uZHMoKTtcblxuXHRcdFx0aWYgKGhvdXJzIDwgMTApIHtcblx0XHRcdFx0aG91cnMgPSAnMCcgKyBob3Vycztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1pbnMgPCAxMCkge1xuXHRcdFx0XHRtaW5zID0gJzAnICsgbWlucztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNlY3MgPCAxMCkge1xuXHRcdFx0XHRzZWNzID0gJzAnICsgc2Vjcztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGhvdXJzICsgJzonICsgbWlucyArICc6JyArIHNlY3M7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IHRpbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBMdHJcblx0bHRyOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ2x0cic7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSAgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJyA/ICcnIDogJ2x0cic7XG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTGVmdC10by1SaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBSdGxcblx0cnRsOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblxuXHRcdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHRvZ2dsZVZhbHVlID0gZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJykgPT09ICdydGwnID8gJycgOiAncnRsJztcblx0XHRcdGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicsIHRvZ2dsZVZhbHVlKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdSaWdodC10by1MZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUHJpbnRcblx0cHJpbnQ6IHtcblx0XHRleGVjOiAncHJpbnQnLFxuXHRcdHRvb2x0aXA6ICdQcmludCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBNYXhpbWl6ZVxuXHRtYXhpbWl6ZToge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5tYXhpbWl6ZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5tYXhpbWl6ZSghdGhpcy5tYXhpbWl6ZSgpKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTWF4aW1pemUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtNJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNvdXJjZVxuXHRzb3VyY2U6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlTW9kZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdWaWV3IHNvdXJjZScsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K1MnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgY29tbWFuZHMgYWJvdmUgY2FuIGJlIHJlbW92ZWRcblx0Ly8gd2l0aG91dCBoYXZpbmcgdG8gcmVtb3ZlIHRoZSAsIGFmdGVyIHRoZSBsYXN0IG9uZS5cblx0Ly8gTmVlZGVkIGZvciBJRS5cblx0aWdub3JlOiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdENtZHM7XG4iLCJpbXBvcnQgeyBhdHRyIH0gZnJvbSAnLi9kb20uanMnO1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBmb3IgRW1sRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcblx0LyoqXG5cdCAqIFRvb2xiYXIgYnV0dG9ucyBvcmRlciBhbmQgZ3JvdXBzLiBTaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZFxuXHQgKiBoYXZlIGEgYmFyIHwgdG8gc2VwYXJhdGUgZ3JvdXBzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0b29sYmFyOiAnYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZSxzdWJzY3JpcHQsc3VwZXJzY3JpcHR8JyArXG5cdFx0J2xlZnQsY2VudGVyLHJpZ2h0LGp1c3RpZnl8Zm9udCxzaXplLGNvbG9yLHJlbW92ZWZvcm1hdHwnICtcblx0XHQnY3V0LGNvcHkscGFzdGV0ZXh0fGJ1bGxldGxpc3Qsb3JkZXJlZGxpc3QsaW5kZW50LG91dGRlbnR8JyArXG5cdFx0J3RhYmxlfGNvZGUscXVvdGV8aG9yaXpvbnRhbHJ1bGUsaW1hZ2UsZW1haWwsbGluayx1bmxpbmt8JyArXG5cdFx0J2Vtb3RpY29uLHlvdXR1YmUsZGF0ZSx0aW1lfGx0cixydGx8cHJpbnQsbWF4aW1pemUsc291cmNlJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY29tbWFuZHMgdG8gZXhjbHVkZXMgZnJvbSB0aGUgdG9vbGJhclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhckV4Y2x1ZGU6IG51bGwsXG5cblx0LyoqXG5cdCAqIFN0eWxlc2hlZXQgdG8gaW5jbHVkZSBpbiB0aGUgV1lTSVdZRyBlZGl0b3IuIFRoaXMgaXMgd2hhdCB3aWxsIHN0eWxlXG5cdCAqIHRoZSBXWVNJV1lHIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzdHlsZTogJ2pxdWVyeS5lbWxlZGl0b3IuZGVmYXVsdC5jc3MnLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBmb250cyBmb3IgdGhlIGZvbnQgc2VsZWN0b3Jcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGZvbnRzOiAnQXJpYWwsQXJpYWwgQmxhY2ssQ29taWMgU2FucyBNUyxDb3VyaWVyIE5ldyxHZW9yZ2lhLEltcGFjdCwnICtcblx0XHQnU2Fucy1zZXJpZixTZXJpZixUaW1lcyBOZXcgUm9tYW4sVHJlYnVjaGV0IE1TLFZlcmRhbmEnLFxuXG5cdC8qKlxuXHQgKiBDb2xvcnMgc2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmQgaGF2ZSBhIGJhciB8IHRvIHNpZ25hbCBhIG5ld1xuXHQgKiBjb2x1bW4uXG5cdCAqXG5cdCAqIElmIG51bGwgdGhlIGNvbG9ycyB3aWxsIGJlIGF1dG8gZ2VuZXJhdGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y29sb3JzOiAnIzAwMDAwMCwjNDRCOEZGLCMxRTkyRjcsIzAwNzREOSwjMDA1REMyLCMwMDM2OUIsI2IzZDVmNHwnICtcblx0XHRcdCcjNDQ0NDQ0LCNDM0ZGRkYsIzlERjlGRiwjN0ZEQkZGLCM2OEM0RTgsIzQxOURDMSwjZDlmNGZmfCcgK1xuXHRcdFx0JyM2NjY2NjYsIzcyRkY4NCwjNENFQTVFLCMyRUNDNDAsIzE3QjUyOSwjMDA4RTAyLCNjMGYwYzZ8JyArXG5cdFx0XHQnIzg4ODg4OCwjRkZGRjQ0LCNGRkZBMUUsI0ZGREMwMCwjRThDNTAwLCNDMTlFMDAsI2ZmZjViM3wnICtcblx0XHRcdCcjYWFhYWFhLCNGRkM5NUYsI0ZGQTMzOSwjRkY4NTFCLCNFODZFMDQsI0MxNDcwMCwjZmZkYmJifCcgK1xuXHRcdFx0JyNjY2NjY2MsI0ZGODU3QSwjRkY1RjU0LCNGRjQxMzYsI0U4MkExRiwjQzEwMzAwLCNmZmM2YzN8JyArXG5cdFx0XHQnI2VlZWVlZSwjRkY1NkZGLCNGRjMwREMsI0YwMTJCRSwjRDkwMEE3LCNCMjAwODAsI2ZiYjhlY3wnICtcblx0XHRcdCcjZmZmZmZmLCNGNTUxRkYsI0NGMkJFNywjQjEwREM5LCM5QTAwQjIsIzlBMDBCMiwjZThiNmVmJyxcblxuXHQvKipcblx0ICogVGhlIGxvY2FsZSB0byB1c2UuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRsb2NhbGU6IGF0dHIoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbGFuZycpIHx8ICdlbicsXG5cblx0LyoqXG5cdCAqIFRoZSBDaGFyc2V0IHRvIHVzZVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y2hhcnNldDogJ3V0Zi04JyxcblxuXHQvKipcblx0ICogQ29tcGF0aWJpbGl0eSBtb2RlIGZvciBlbW90aWNvbnMuXG5cdCAqXG5cdCAqIEhlbHBzIGlmIHlvdSBoYXZlIGVtb3RpY29ucyBzdWNoIGFzIDovIHdoaWNoIHdvdWxkIHB1dCBhbiBlbW90aWNvblxuXHQgKiBpbnNpZGUgaHR0cDovL1xuXHQgKlxuXHQgKiBUaGlzIG1vZGUgcmVxdWlyZXMgZW1vdGljb25zIHRvIGJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBvciBlbmQgb2Zcblx0ICogbGluZSBjaGFycy4gVGhpcyBtb2RlIGhhcyBsaW1pdGVkIEFzIFlvdSBUeXBlIGVtb3RpY29uIGNvbnZlcnNpb25cblx0ICogc3VwcG9ydC4gSXQgd2lsbCBub3QgcmVwbGFjZSBBWVQgZm9yIGVuZCBvZiBsaW5lIGNoYXJzLCBvbmx5XG5cdCAqIGVtb3RpY29ucyBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UuIFRoZXkgd2lsbCBzdGlsbCBiZSByZXBsYWNlZFxuXHQgKiBjb3JyZWN0bHkgd2hlbiBsb2FkZWQganVzdCBub3QgQVlULlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVtb3RpY29uc0NvbXBhdDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBlbW90aWNvbnMuIENhbiBiZSBjaGFuZ2VzIGF0IHJ1bnRpbWUgdXNpbmcgdGhlXG5cdCAqIGVtb3RpY29ucygpIG1ldGhvZC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqIEBzaW5jZSAxLjQuMlxuXHQgKi9cblx0ZW1vdGljb25zRW5hYmxlZDogdHJ1ZSxcblxuXHQvKipcblx0ICogRW1vdGljb24gcm9vdCBVUkxcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGVtb3RpY29uc1Jvb3Q6ICcnLFxuXHRlbW90aWNvbnM6IHtcblx0XHRkcm9wZG93bjoge1xuXHRcdFx0JzopJzogJ2Vtb3RpY29ucy9zbWlsZS5wbmcnLFxuXHRcdFx0JzphbmdlbDonOiAnZW1vdGljb25zL2FuZ2VsLnBuZycsXG5cdFx0XHQnOmFuZ3J5Oic6ICdlbW90aWNvbnMvYW5ncnkucG5nJyxcblx0XHRcdCc4LSknOiAnZW1vdGljb25zL2Nvb2wucG5nJyxcblx0XHRcdCc6XFwnKCc6ICdlbW90aWNvbnMvY3d5LnBuZycsXG5cdFx0XHQnOmVybW06JzogJ2Vtb3RpY29ucy9lcm1tLnBuZycsXG5cdFx0XHQnOkQnOiAnZW1vdGljb25zL2dyaW4ucG5nJyxcblx0XHRcdCc8Myc6ICdlbW90aWNvbnMvaGVhcnQucG5nJyxcblx0XHRcdCc6KCc6ICdlbW90aWNvbnMvc2FkLnBuZycsXG5cdFx0XHQnOk8nOiAnZW1vdGljb25zL3Nob2NrZWQucG5nJyxcblx0XHRcdCc6UCc6ICdlbW90aWNvbnMvdG9uZ3VlLnBuZycsXG5cdFx0XHQnOyknOiAnZW1vdGljb25zL3dpbmsucG5nJ1xuXHRcdH0sXG5cdFx0bW9yZToge1xuXHRcdFx0JzphbGllbjonOiAnZW1vdGljb25zL2FsaWVuLnBuZycsXG5cdFx0XHQnOmJsaW5rOic6ICdlbW90aWNvbnMvYmxpbmsucG5nJyxcblx0XHRcdCc6Ymx1c2g6JzogJ2Vtb3RpY29ucy9ibHVzaC5wbmcnLFxuXHRcdFx0JzpjaGVlcmZ1bDonOiAnZW1vdGljb25zL2NoZWVyZnVsLnBuZycsXG5cdFx0XHQnOmRldmlsOic6ICdlbW90aWNvbnMvZGV2aWwucG5nJyxcblx0XHRcdCc6ZGl6enk6JzogJ2Vtb3RpY29ucy9kaXp6eS5wbmcnLFxuXHRcdFx0JzpnZXRsb3N0Oic6ICdlbW90aWNvbnMvZ2V0bG9zdC5wbmcnLFxuXHRcdFx0JzpoYXBweTonOiAnZW1vdGljb25zL2hhcHB5LnBuZycsXG5cdFx0XHQnOmtpc3Npbmc6JzogJ2Vtb3RpY29ucy9raXNzaW5nLnBuZycsXG5cdFx0XHQnOm5pbmphOic6ICdlbW90aWNvbnMvbmluamEucG5nJyxcblx0XHRcdCc6cGluY2g6JzogJ2Vtb3RpY29ucy9waW5jaC5wbmcnLFxuXHRcdFx0Jzpwb3V0eTonOiAnZW1vdGljb25zL3BvdXR5LnBuZycsXG5cdFx0XHQnOnNpY2s6JzogJ2Vtb3RpY29ucy9zaWNrLnBuZycsXG5cdFx0XHQnOnNpZGV3YXlzOic6ICdlbW90aWNvbnMvc2lkZXdheXMucG5nJyxcblx0XHRcdCc6c2lsbHk6JzogJ2Vtb3RpY29ucy9zaWxseS5wbmcnLFxuXHRcdFx0JzpzbGVlcGluZzonOiAnZW1vdGljb25zL3NsZWVwaW5nLnBuZycsXG5cdFx0XHQnOnVuc3VyZTonOiAnZW1vdGljb25zL3Vuc3VyZS5wbmcnLFxuXHRcdFx0Jzp3b290Oic6ICdlbW90aWNvbnMvdzAwdC5wbmcnLFxuXHRcdFx0Jzp3YXNzYXQ6JzogJ2Vtb3RpY29ucy93YXNzYXQucG5nJ1xuXHRcdH0sXG5cdFx0aGlkZGVuOiB7XG5cdFx0XHQnOndoaXN0bGluZzonOiAnZW1vdGljb25zL3doaXN0bGluZy5wbmcnLFxuXHRcdFx0Jzpsb3ZlOic6ICdlbW90aWNvbnMvd3ViLnBuZydcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFdpZHRoIG9mIHRoZSBlZGl0b3IuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWMgd2l0aFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHdpZHRoOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBIZWlnaHQgb2YgdGhlIGVkaXRvciBpbmNsdWRpbmcgdG9vbGJhci4gU2V0IHRvIG51bGwgZm9yIGF1dG9tYXRpY1xuXHQgKiBoZWlnaHRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRoZWlnaHQ6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgcmVzaXplZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUVuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBoYWxmIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5XaWR0aDogbnVsbCxcblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSBoZWlnaHQgb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1pbkhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIGhlaWdodCBvciAtMVxuXHQgKiBmb3IgdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4SGVpZ2h0OiBudWxsLFxuXHQvKipcblx0ICogTWF4IHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4V2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSBoZWlnaHQgaXMgZW5hYmxlZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUhlaWdodDogdHJ1ZSxcblx0LyoqXG5cdCAqIElmIHJlc2l6aW5nIGJ5IHdpZHRoIGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVXaWR0aDogdHJ1ZSxcblxuXHQvKipcblx0ICogRGF0ZSBmb3JtYXQsIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBsb2NhbGUgc3BlY2lmaWVzIG9uZS5cblx0ICpcblx0ICogVGhlIHdvcmRzIHllYXIsIG1vbnRoIGFuZCBkYXkgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB1c2VycyBjdXJyZW50XG5cdCAqIHllYXIsIG1vbnRoIGFuZCBkYXkuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkYXRlRm9ybWF0OiAneWVhci1tb250aC1kYXknLFxuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGluc2V0IHRoZSB0b29sYmFyIGludG8uXG5cdCAqXG5cdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdHRvb2xiYXJDb250YWluZXI6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBwYXN0ZSBmaWx0ZXJpbmcuIFRoaXMgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbCwgcGxlYXNlXG5cdCAqIHJlcG9ydCBhbnkgaXNzdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVuYWJsZVBhc3RlRmlsdGVyaW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gY29tcGxldGVseSBkaXNhYmxlIHBhc3RpbmcgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZGlzYWJsZVBhc3Rpbmc6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZWFkT25seTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIHNldCB0aGUgZWRpdG9yIHRvIHJpZ2h0LXRvLWxlZnQgbW9kZS5cblx0ICpcblx0ICogSWYgc2V0IHRvIG51bGwgdGhlIGRpcmVjdGlvbiB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cnRsOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIG9uIHBhZ2UgbG9hZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1czogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciB0byB0aGUgZW5kIG9mIHRoZSBjb250ZW50XG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b2ZvY3VzRW5kOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGV4cGFuZCB0aGUgZWRpdG9yIHRvIGZpeCB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9FeHBhbmQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIHVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXJcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvVXBkYXRlOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIHRoZSBicm93c2VycyBidWlsdCBpbiBzcGVsbCBjaGVja2VyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3BlbGxjaGVjazogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gcnVuIHRoZSBzb3VyY2UgZWRpdG9yIHdoZW4gdGhlcmUgaXMgbm8gV1lTSVdZRyBzdXBwb3J0LiBPbmx5XG5cdCAqIHJlYWxseSBhcHBsaWVzIHRvIG1vYmlsZSBPUydzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGxvYWQgdGhlIGVkaXRvciBpbiBzb3VyY2UgbW9kZSBhbmQgc3RpbGwgYWxsb3cgc3dpdGNoaW5nXG5cdCAqIGJldHdlZW4gV1lTSVdZRyBhbmQgc291cmNlIG1vZGVcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzdGFydEluU291cmNlTW9kZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIElEIHRvIGdpdmUgdGhlIGVkaXRvci5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGlkOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVnaW5zOiAnJyxcblxuXHQvKipcblx0ICogei1pbmRleCB0byBzZXQgdGhlIGVkaXRvciBjb250YWluZXIgdG8uIE5lZWRlZCBmb3IgalF1ZXJ5IFVJIGRpYWxvZy5cblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR6SW5kZXg6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIHRyaW0gdGhlIEJCQ29kZS4gUmVtb3ZlcyBhbnkgc3BhY2VzIGF0IHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZVxuXHQgKiBCQkNvZGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGJiY29kZVRyaW06IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBkaXNhYmxlIHJlbW92aW5nIGJsb2NrIGxldmVsIGVsZW1lbnRzIGJ5IHByZXNzaW5nIGJhY2tzcGFjZSBhdFxuXHQgKiB0aGUgc3RhcnQgb2YgdGhlbVxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVCbG9ja1JlbW92ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbG93ZWQgVVJMIChzaG91bGQgYmUgZWl0aGVyIHN0cmluZ3Mgb3IgcmVnZXgpIGZvciBpZnJhbWVzLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGEgc3RyaW5nIHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3RhcnQgb2YgdGhlIHNyYyBtYXRjaGVzIHRoZVxuXHQgKiBzcGVjaWZpZWQgc3RyaW5nIHdpbGwgYmUgYWxsb3dlZC5cblx0ICpcblx0ICogSWYgaXQncyBhIHJlZ2V4IHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3JjIG1hdGNoZXMgdGhlIHJlZ2V4IHdpbGwgYmVcblx0ICogYWxsb3dlZC5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZElmcmFtZVVybHM6IFtdLFxuXG5cdC8qKlxuXHQgKiBCQkNvZGUgcGFyc2VyIG9wdGlvbnMsIG9ubHkgYXBwbGllcyBpZiB1c2luZyB0aGUgZWRpdG9yIGluIEJCQ29kZVxuXHQgKiBtb2RlLlxuXHQgKlxuXHQgKiBTZWUgRW1sRWRpdG9yLkJCQ29kZVBhcnNlci5kZWZhdWx0cyBmb3IgbGlzdCBvZiB2YWxpZCBvcHRpb25zXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRwYXJzZXJPcHRpb25zOiB7IH0sXG5cblx0LyoqXG5cdCAqIENTUyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRvIGRyb3Bkb3duIG1lbnUgKGVnLiB6LWluZGV4KVxuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0ZHJvcERvd25Dc3M6IHsgfSxcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgdGFncyB0aGF0IGFyZSBhbGxvd2VkIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYSB0YWcgaXMgbm90IGxpc3RlZCBoZXJlLCBpdCB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGUgY29udGVudCBpc1xuXHQgKiBzYW5pdGl6ZWQuXG5cdCAqXG5cdCAqIDEgVGFnIGlzIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDogWydpZnJhbWUnXS4gTm8gbmVlZCB0byBhZGQgdGhpc1xuXHQgKiBmdXJ0aGVyLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkVGFnczogW10sXG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIGF0dHJpYnV0ZXMgdGhhdCBhcmUgYWxsb3dlZCBvbiB0YWdzIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYW4gYXR0cmlidXRlIGlzIG5vdCBsaXN0ZWQgaGVyZSwgaXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIGNvbnRlbnRcblx0ICogaXMgc2FuaXRpemVkLlxuXHQgKlxuXHQgKiAzIEF0dHJpYnV0ZXMgYXJlIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDpcblx0ICogXHRbJ2FsbG93ZnVsbHNjcmVlbicsICdmcmFtZWJvcmRlcicsICd0YXJnZXQnXS5cblx0ICogTm8gbmVlZCB0byBhZGQgdGhlc2UgZnVydGhlci5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZEF0dHJpYnV0ZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0T3B0aW9ucztcbiIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5cclxuLyoqXHJcbiAqIENhY2hlIG9mIGNhbWVsQ2FzZSBDU1MgcHJvcGVydHkgbmFtZXNcclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XHJcbiAqL1xyXG52YXIgY3NzUHJvcGVydHlOYW1lQ2FjaGUgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGVsZW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRUxFTUVOVF9OT0RFID0gMTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIHRleHQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgVEVYVF9OT0RFID0gMztcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGNvbW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgQ09NTUVOVF9OT0RFID0gODtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgZG9jdW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRE9DVU1FTlRfTk9ERSA9IDk7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBkb2N1bWVudCBmcmFnbWVudHNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xyXG5cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG5cdHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcblxyXG5cdHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyB2YWx1ZSA6IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcclxuICpcclxuICogV2lsbCBjcmVhdGUgaXQgaW4gdGhlIGN1cnJlbnQgZG9jdW1lbnQgdW5sZXNzIGNvbnRleHRcclxuICogaXMgc3BlY2lmaWVkLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHRhZ1xyXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBbYXR0cmlidXRlc11cclxuICogQHBhcmFtIHshRG9jdW1lbnR9IFtjb250ZXh0XVxyXG4gKiBAcmV0dXJucyB7IUhUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJ1dGVzLCBjb250ZXh0KSB7XHJcblx0dmFyIG5vZGUgPSAoY29udGV4dCB8fCBkb2N1bWVudCkuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuXHR1dGlscy5lYWNoKGF0dHJpYnV0ZXMgfHwge30sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoa2V5ID09PSAnc3R5bGUnKSB7XHJcblx0XHRcdG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlO1xyXG5cdFx0fSBlbHNlIGlmIChrZXkgaW4gbm9kZSkge1xyXG5cdFx0XHRub2RlW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gbm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgcGFyZW50cyB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7QXJyYXk8SFRNTEVsZW1lbnQ+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudHMobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcGFyZW50cyA9IFtdO1xyXG5cdHZhciBwYXJlbnQgPSBub2RlIHx8IHt9O1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSAmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHBhcmVudHMucHVzaChwYXJlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmVudHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmaXJzdCBwYXJlbnQgbm9kZSB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciBwYXJlbnQgPSBub2RlIHx8IHt9O1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSAmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHJldHVybiBwYXJlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIHRoZSBwYXNzZWQgbm9kZSBhbmQgYWxsIHBhcmVudHMgYW5kXHJcbiAqIHJldHVybnMgdGhlIGZpcnN0IG1hdGNoaW5nIG5vZGUgaWYgYW55LlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHJldHVybiBpcyhub2RlLCBzZWxlY3RvcikgPyBub2RlIDogcGFyZW50KG5vZGUsIHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSB0aGUgRE9NXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcclxuXHRpZiAobm9kZS5wYXJlbnROb2RlKSB7XHJcblx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQXBwZW5kcyBjaGlsZCB0byBwYXJlbnQgbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnR9IG5vZGVcclxuICogQHBhcmFtIHtOb2RlIHwgSFRNTEVsZW1lbnQgfCBzdHJpbmcgfCBudWxsIH0gY2hpbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xyXG5cdG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgYW55IGNoaWxkIG5vZGVzIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50IHwgRG9jdW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Tm9kZUxpc3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogRm9yIG9uKCkgYW5kIG9mZigpIGlmIHRvIGFkZC9yZW1vdmUgdGhlIGV2ZW50XHJcbiAqIHRvIHRoZSBjYXB0dXJlIHBoYXNlXHJcbiAqXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBFVkVOVF9DQVBUVVJFID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcclxuICogdG8gdGhlIGJ1YmJsZSBwaGFzZVxyXG4gKlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgRVZFTlRfQlVCQkxFID0gZmFsc2U7XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEV2ZW50cyBzaG91bGQgYmUgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudHMuXHJcbiAqXHJcbiAqIElmIHNlbGVjdG9yIGlzIHNwZWNpZmllZCB0aGUgaGFuZGxlciB3aWxsIG9ubHkgYmVcclxuICogY2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRhcmdldCBtYXRjaGVzIHRoZSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHshTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbiguLi5hbnkpfSBmblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9mZigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb24obm9kZSwgZXZlbnRzLCBzZWxlY3RvciwgZm4sIGNhcHR1cmUpIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRoYW5kbGVyID0gZm5bJ19zY2UtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdIHx8IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cdFx0XHRcdHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBub2RlKSB7XHJcblx0XHRcdFx0XHRpZiAoaXModGFyZ2V0LCBzZWxlY3RvcikpIHtcclxuXHRcdFx0XHRcdFx0Zm4uY2FsbCh0YXJnZXQsIGUpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Zm5bJ19zY2UtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdID0gaGFuZGxlcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZXIgPSBzZWxlY3RvcjtcclxuXHRcdFx0Y2FwdHVyZSA9IGZuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY2FwdHVyZSB8fCBmYWxzZSk7XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50cy5cclxuICpcclxuICogQHBhcmFtIHshTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBmblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9uKClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiBvZmYobm9kZSwgZXZlbnRzLCBzZWxlY3RvciwgZm4sIGNhcHR1cmUpIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRoYW5kbGVyID0gZm5bJ19zY2UtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xyXG5cdFx0XHRjYXB0dXJlID0gZm47XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlIHx8IGZhbHNlKTtcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIG9ubHkgYXR0ciBwYXJhbSBpcyBzcGVjaWZpZWQgaXQgd2lsbCBnZXRcclxuICogdGhlIHZhbHVlIG9mIHRoZSBhdHRyIHBhcmFtLlxyXG4gKlxyXG4gKiBJZiB2YWx1ZSBpcyBzcGVjaWZpZWQgYnV0IG51bGwgdGhlIGF0dHJpYnV0ZVxyXG4gKiB3aWxsIGJlIHJlbW92ZWQgb3RoZXJ3aXNlIHRoZSBhdHRyIHZhbHVlIHdpbGxcclxuICogYmUgc2V0IHRvIHRoZSBwYXNzZWQgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKiBAcGFyYW0gez9zdHJpbmd9IFt2YWx1ZV1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHIsIHZhbHVlKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XHJcblx0XHRyZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcblx0fVxyXG5cclxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxLCBuby1lcS1udWxsXHJcblx0aWYgKHZhbHVlID09IG51bGwpIHtcclxuXHRcdHJlbW92ZUF0dHIobm9kZSwgYXR0cik7XHJcblx0fSBlbHNlIHtcclxuXHRcdG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHIobm9kZSwgYXR0cikge1xyXG5cdG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gbm9uZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGUobm9kZSkge1xyXG5cdGNzcyhub2RlLCAnZGlzcGxheScsICdub25lJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBwYXNzZWQgZWxlbWVudHMgZGlzcGxheSB0byBkZWZhdWx0XHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2hvdyhub2RlKSB7XHJcblx0Y3NzKG5vZGUsICdkaXNwbGF5JywgJycpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhbiBlbGVtZW50cyB2aXNpYmlsaXR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKG5vZGUpIHtcclxuXHRpZiAoaXNWaXNpYmxlKG5vZGUpKSB7XHJcblx0XHRoaWRlKG5vZGUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzaG93KG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgYSBjb21wdXRlZCBDU1MgdmFsdWVzIG9yIHNldHMgYW4gaW5saW5lIENTUyB2YWx1ZVxyXG4gKlxyXG4gKiBSdWxlcyBzaG91bGQgYmUgaW4gY2FtZWxDYXNlIGZvcm1hdCBhbmQgbm90XHJcbiAqIGh5cGhlbmF0ZWQgbGlrZSBDU1MgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHthbnl9IG5vZGVcclxuICogQHBhcmFtIHthbnl9IHJ1bGVcclxuICogQHBhcmFtIHthbnl9IFt2YWx1ZV1cclxuICogQHJldHVybiB7YW55fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNzcyhub2RlLCBydWxlLCB2YWx1ZSkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHJ1bGUpKSB7XHJcblx0XHRcdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxID8gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKVtydWxlXSA6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dXRpbHMuZWFjaChydWxlLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRjc3Mobm9kZSwga2V5LCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gaXNOYU4gcmV0dXJucyBmYWxzZSBmb3IgbnVsbCwgZmFsc2UgYW5kIGVtcHR5IHN0cmluZ3NcclxuXHRcdC8vIHNvIG5lZWQgdG8gY2hlY2sgaXQncyB0cnV0aHkgb3IgMFxyXG5cdFx0dmFyIGlzTnVtZXJpYyA9ICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkgJiYgIWlzTmFOKHZhbHVlKTtcclxuXHRcdG5vZGUuc3R5bGVbcnVsZV0gPSBpc051bWVyaWMgPyB2YWx1ZSArICdweCcgOiB2YWx1ZTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSBkYXRhIGF0dHJpYnV0ZXMgb24gYSBub2RlXHJcbiAqXHJcbiAqIFVubGlrZSB0aGUgalF1ZXJ5IHZlcnNpb24gdGhpcyBvbmx5IHN0b3JlcyBkYXRhXHJcbiAqIGluIHRoZSBET00gYXR0cmlidXRlcyB3aGljaCBtZWFucyBvbmx5IHN0cmluZ3NcclxuICogY2FuIGJlIHN0b3JlZC5cclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ZhbHVlXVxyXG4gKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGEobm9kZSwga2V5LCB2YWx1ZSkge1xyXG5cdHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcclxuXHR2YXIgZGF0YSA9IHt9O1xyXG5cclxuXHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHR1dGlscy5lYWNoKG5vZGUuYXR0cmlidXRlcywgZnVuY3Rpb24gKF8sIGF0dHIpIHtcclxuXHRcdFx0XHRpZiAoL15kYXRhLS9pLnRlc3QoYXR0ci5uYW1lKSkge1xyXG5cdFx0XHRcdFx0ZGF0YVthdHRyLm5hbWUuc3Vic3RyKDUpXSA9IGF0dHIudmFsdWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAyKSB7XHJcblx0XHRcdHJldHVybiBhdHRyKG5vZGUsICdkYXRhLScgKyBrZXkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGF0dHIobm9kZSwgJ2RhdGEtJyArIGtleSwgU3RyaW5nKHZhbHVlKSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIG5vZGUgbWF0Y2hlcyB0aGUgZ2l2ZW4gc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50IHwgQ2hpbGROb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpcyhub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciByZXN1bHQgPSBmYWxzZTtcclxuXHJcblx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXN1bHQgPSAobm9kZS5tYXRjaGVzIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3IgfHxcclxuXHRcdFx0bm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgc2VsZWN0b3IpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgbm9kZSBjb250YWlucyBjaGlsZCBvdGhlcndpc2UgZmFsc2UuXHJcbiAqXHJcbiAqIFRoaXMgZGlmZmVycyBmcm9tIHRoZSBET00gY29udGFpbnMoKSBtZXRob2QgaW4gdGhhdFxyXG4gKiBpZiBub2RlIGFuZCBjaGlsZCBhcmUgZXF1YWwgdGhpcyB3aWxsIHJldHVybiBmYWxzZS5cclxuICpcclxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjaGlsZFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb250YWlucyhub2RlLCBjaGlsZCkge1xyXG5cdHJldHVybiBub2RlICE9PSBjaGlsZCAmJiBub2RlLmNvbnRhaW5zICYmIG5vZGUuY29udGFpbnMoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEByZXR1cm5zIHs/SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciBwcmV2ID0gbm9kZS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xyXG5cclxuXHRpZiAoc2VsZWN0b3IgJiYgcHJldikge1xyXG5cdFx0cmV0dXJuIGlzKHByZXYsIHNlbGVjdG9yKSA/IHByZXYgOiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHByZXY7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7IU5vZGV9IHJlZk5vZGVcclxuICogQHJldHVybnMge05vZGV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZk5vZGUpIHtcclxuXHRyZXR1cm4gcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPHN0cmluZz59XHJcbiAqL1xyXG5mdW5jdGlvbiBjbGFzc2VzKG5vZGUpIHtcclxuXHRyZXR1cm4gbm9kZS5jbGFzc05hbWUudHJpbSgpLnNwbGl0KC9cXHMrLyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xyXG5cdHJldHVybiBpcyhub2RlLCAnLicgKyBjbGFzc05hbWUpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSkge1xyXG5cdHZhciBjbGFzc0xpc3QgPSBjbGFzc2VzKG5vZGUpO1xyXG5cclxuXHRpZiAoY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcclxuXHRcdGNsYXNzTGlzdC5wdXNoKGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHRub2RlLmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKCcgJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSB7XHJcblx0dmFyIGNsYXNzTGlzdCA9IGNsYXNzZXMobm9kZSk7XHJcblxyXG5cdHV0aWxzLmFycmF5UmVtb3ZlKGNsYXNzTGlzdCwgY2xhc3NOYW1lKTtcclxuXHJcblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhIGNsYXNzIG9uIG5vZGUuXHJcbiAqXHJcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgdHJ1dGh5IGl0IHdpbGwgYWRkXHJcbiAqIHRoZSBjbGFzcy5cclxuICpcclxuICogSWYgc3RhdGUgaXMgc3BlY2lmaWVkIGFuZCBpcyBmYWxzZXkgaXQgd2lsbCByZW1vdmVcclxuICogdGhlIGNsYXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICogQHBhcmFtIHtib29sZWFufSBbc3RhdGVdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xhc3Mobm9kZSwgY2xhc3NOYW1lLCBzdGF0ZSkge1xyXG5cdHN0YXRlID0gdXRpbHMuaXNVbmRlZmluZWQoc3RhdGUpID8gIWhhc0NsYXNzKG5vZGUsIGNsYXNzTmFtZSkgOiBzdGF0ZTtcclxuXHJcblx0aWYgKHN0YXRlKSB7XHJcblx0XHRhZGRDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgb3Igc2V0cyB0aGUgd2lkdGggb2YgdGhlIHBhc3NlZCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW3ZhbHVlXVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB3aWR0aChub2RlLCB2YWx1ZSkge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ0xlZnQpICsgdG9GbG9hdChjcy5wYWRkaW5nUmlnaHQpO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyTGVmdFdpZHRoKSArIHRvRmxvYXQoY3MuYm9yZGVyUmlnaHRXaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0V2lkdGggLSBwYWRkaW5nIC0gYm9yZGVyO1xyXG5cdH1cclxuXHJcblx0Y3NzKG5vZGUsICd3aWR0aCcsIHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgb3Igc2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBwYXNzZWQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0KG5vZGUsIHZhbHVlKSB7XHJcblx0aWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG5cdFx0dmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuXHRcdHZhciBwYWRkaW5nID0gdG9GbG9hdChjcy5wYWRkaW5nVG9wKSArIHRvRmxvYXQoY3MucGFkZGluZ0JvdHRvbSk7XHJcblx0XHR2YXIgYm9yZGVyID0gdG9GbG9hdChjcy5ib3JkZXJUb3BXaWR0aCkgKyB0b0Zsb2F0KGNzLmJvcmRlckJvdHRvbVdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gbm9kZS5vZmZzZXRIZWlnaHQgLSBwYWRkaW5nIC0gYm9yZGVyO1xyXG5cdH1cclxuXHJcblx0Y3NzKG5vZGUsICdoZWlnaHQnLCB2YWx1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VycyBhIGN1c3RvbSBldmVudCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbmRcclxuICogc2V0cyB0aGUgZGV0YWlsIHByb3BlcnR5IHRvIHRoZSBkYXRhIG9iamVjdCBwYXNzZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJpZ2dlcihub2RlLCBldmVudE5hbWUsIGRhdGEpIHtcclxuXHR2YXIgZXZlbnQ7XHJcblxyXG5cdGlmICh1dGlscy5pc0Z1bmN0aW9uKHdpbmRvdy5DdXN0b21FdmVudCkpIHtcclxuXHRcdGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge1xyXG5cdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0XHRjYW5jZWxhYmxlOiB0cnVlLFxyXG5cdFx0XHRkZXRhaWw6IGRhdGFcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRldmVudCA9IG5vZGUub3duZXJEb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuXHRcdGV2ZW50LmluaXRDdXN0b21FdmVudChldmVudE5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xyXG5cdH1cclxuXHJcblx0bm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgaWYgYSBub2RlIGlzIHZpc2libGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmlzaWJsZShub2RlKSB7XHJcblx0cmV0dXJuICEhbm9kZS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnQgQ1NTIHByb3BlcnR5IG5hbWVzIGludG8gY2FtZWwgY2FzZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBjYW1lbENhc2Uoc3RyaW5nKSB7XHJcblx0cmV0dXJuIHN0cmluZ1xyXG5cdFx0LnJlcGxhY2UoL14tbXMtLywgJ21zLScpXHJcblx0XHQucmVwbGFjZSgvLShcXHcpL2csIGZ1bmN0aW9uIChtYXRjaCwgY2hhcikge1xyXG5cdFx0XHRyZXR1cm4gY2hhci50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0fSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTG9vcCBhbGwgY2hpbGQgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlXHJcbiAqXHJcbiAqIFRoZSBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IDEgcGFyYW1ldGVyIGJlaW5nIHRoZSBub2RlLlxyXG4gKiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBmYWxzZSB0aGUgbG9vcCB3aWxsIGJlIGV4aXRlZC5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtICB7ZnVuY3Rpb259IGZ1bmMgICAgICAgICAgIENhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCB3aXRoIGV2ZXJ5XHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCBub2RlIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gaW5uZXJtb3N0Rmlyc3QgIElmIHRoZSBpbm5lcm1vc3Qgbm9kZSBzaG91bGQgYmUgcGFzc2VkXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgZnVuY3Rpb24gYmVmb3JlIGl0J3MgcGFyZW50cy5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gc2libGluZ3NPbmx5ICAgIElmIHRvIG9ubHkgdHJhdmVyc2UgdGhlIG5vZGVzIHNpYmxpbmdzXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXZlcnNlPWZhbHNlXSBJZiB0byB0cmF2ZXJzZSB0aGUgbm9kZXMgaW4gcmV2ZXJzZVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHJldmVyc2UpIHtcclxuXHRub2RlID0gcmV2ZXJzZSA/IG5vZGUubGFzdENoaWxkIDogbm9kZS5maXJzdENoaWxkO1xyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0dmFyIG5leHQgPSByZXZlcnNlID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nO1xyXG5cclxuXHRcdGlmIChcclxuXHRcdFx0KCFpbm5lcm1vc3RGaXJzdCAmJiBmdW5jKG5vZGUpID09PSBmYWxzZSkgfHxcclxuXHRcdFx0KCFzaWJsaW5nc09ubHkgJiYgdHJhdmVyc2UoXHJcblx0XHRcdFx0bm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSwgcmV2ZXJzZVxyXG5cdFx0XHQpID09PSBmYWxzZSkgfHxcclxuXHRcdFx0KGlubmVybW9zdEZpcnN0ICYmIGZ1bmMobm9kZSkgPT09IGZhbHNlKVxyXG5cdFx0KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gbmV4dDtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaWtlIHRyYXZlcnNlIGJ1dCBsb29wcyBpbiByZXZlcnNlXHJcbiAqIEBzZWUgdHJhdmVyc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByVHJhdmVyc2Uobm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSkge1xyXG5cdHRyYXZlcnNlKG5vZGUsIGZ1bmMsIGlubmVybW9zdEZpcnN0LCBzaWJsaW5nc09ubHksIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogUGFyc2VzIEhUTUwgaW50byBhIGRvY3VtZW50IGZyYWdtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IFtjb250ZXh0XVxyXG4gKiBAc2luY2UgMS40LjRcclxuICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCwgY29udGV4dCkge1xyXG5cdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xyXG5cclxuXHR2YXJcdHJldCA9IGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdHZhciB0bXAgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgY29udGV4dCk7XHJcblxyXG5cdHRtcC5pbm5lckhUTUwgPSBodG1sO1xyXG5cclxuXHR3aGlsZSAodG1wLmZpcnN0Q2hpbGQpIHtcclxuXHRcdGFwcGVuZENoaWxkKHJldCwgdG1wLmZpcnN0Q2hpbGQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhbnkgc3R5bGluZy5cclxuICpcclxuICogSXQgaGFzIHN0eWxpbmcgaWYgaXQgaXMgbm90IGEgcGxhaW4gPGRpdj4gb3IgPHA+IG9yXHJcbiAqIGlmIGl0IGhhcyBhIGNsYXNzLCBzdHlsZSBhdHRyaWJ1dGUgb3IgZGF0YS5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgMS40LjRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNTdHlsaW5nKG5vZGUpIHtcclxuXHRyZXR1cm4gbm9kZSAmJiAoIWlzKG5vZGUsICdwLGRpdicpIHx8IG5vZGUuY2xhc3NOYW1lIHx8XHJcblx0XHRhdHRyKG5vZGUsICdzdHlsZScpIHx8ICF1dGlscy5pc0VtcHR5T2JqZWN0KGRhdGEobm9kZSkpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGFuIGVsZW1lbnQgZnJvbSBvbmUgdHlwZSB0byBhbm90aGVyLlxyXG4gKlxyXG4gKiBGb3IgZXhhbXBsZSBpdCBjYW4gY29udmVydCB0aGUgZWxlbWVudCA8Yj4gdG8gPHN0cm9uZz5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICogQHBhcmFtICB7c3RyaW5nfSAgICAgIHRvVGFnTmFtZVxyXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydEVsZW1lbnQoZWxlbWVudCwgdG9UYWdOYW1lKSB7XHJcblx0dmFyIG5ld0VsZW1lbnQgPSBjcmVhdGVFbGVtZW50KHRvVGFnTmFtZSwge30sIGVsZW1lbnQub3duZXJEb2N1bWVudCk7XHJcblxyXG5cdHV0aWxzLmVhY2goZWxlbWVudC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoXywgYXR0cmlidXRlKSB7XHJcblx0XHQvLyBTb21lIGJyb3dzZXJzIHBhcnNlIGludmFsaWQgYXR0cmlidXRlcyBuYW1lcyBsaWtlXHJcblx0XHQvLyAnc2l6ZVwiMicgd2hpY2ggdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gc2V0LCBqdXN0XHJcblx0XHQvLyBpZ25vcmUgdGhlc2UuXHJcblx0XHR0cnkge1xyXG5cdFx0XHRhdHRyKG5ld0VsZW1lbnQsIGF0dHJpYnV0ZS5uYW1lLCBhdHRyaWJ1dGUudmFsdWUpO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cdH0pO1xyXG5cclxuXHR3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRhcHBlbmRDaGlsZChuZXdFbGVtZW50LCBlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdH1cclxuXHJcblx0ZWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdFbGVtZW50LCBlbGVtZW50KTtcclxuXHJcblx0cmV0dXJuIG5ld0VsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIGJsb2NrIGxldmVsIGVsZW1lbnRzIHNlcGFyYXRlZCBieSBiYXJzICh8KVxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IHZhciBibG9ja0xldmVsTGlzdCA9ICd8Ym9keXxocnxwfGRpdnxoMXxoMnxoM3xoNHxoNXxoNnxhZGRyZXNzfHByZXwnICtcclxuXHQnZm9ybXx0YWJsZXx0Ym9keXx0aGVhZHx0Zm9vdHx0aHx0cnx0ZHxsaXxvbHx1bHxibG9ja3F1b3RlfGNlbnRlcnwnICtcclxuXHQnZGV0YWlsc3xzZWN0aW9ufGFydGljbGV8YXNpZGV8bmF2fG1haW58aGVhZGVyfGhncm91cHxmb290ZXJ8ZmllbGRzZXR8JyArXHJcblx0J2RsfGR0fGRkfGZpZ3VyZXxmaWdjYXB0aW9ufCc7XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBlbGVtZW50cyB0aGF0IGRvIG5vdCBhbGxvdyBjaGlsZHJlbiBzZXBhcmF0ZWQgYnkgYmFycyAofClcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqIEBzaW5jZSAgMS40LjVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYW5IYXZlQ2hpbGRyZW4obm9kZSkge1xyXG5cdC8vIDEgID0gRWxlbWVudFxyXG5cdC8vIDkgID0gRG9jdW1lbnRcclxuXHQvLyAxMSA9IERvY3VtZW50IEZyYWdtZW50XHJcblx0aWYgKCEvMTE/fDkvLnRlc3Qobm9kZS5ub2RlVHlwZSkpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8vIExpc3Qgb2YgZW1wdHkgSFRNTCB0YWdzIHNlcGFyYXRlZCBieSBiYXIgKHwpIGNoYXJhY3Rlci5cclxuXHQvLyBTb3VyY2U6IGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L2luZGV4L2VsZW1lbnRzLmh0bWxcclxuXHQvLyBTb3VyY2U6IGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI3ZvaWQtZWxlbWVudHNcclxuXHRyZXR1cm4gKCd8aWZyYW1lfGFyZWF8YmFzZXxiYXNlZm9udHxicnxjb2x8ZnJhbWV8aHJ8aW1nfGlucHV0fHdicicgK1xyXG5cdFx0J3xpc2luZGV4fGxpbmt8bWV0YXxwYXJhbXxjb21tYW5kfGVtYmVkfGtleWdlbnxzb3VyY2V8dHJhY2t8JyArXHJcblx0XHQnb2JqZWN0fCcpLmluZGV4T2YoJ3wnICsgbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICsgJ3wnKSA8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gZWxlbWVudCBpcyBpbmxpbmVcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IGFueX0gZWxtXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luY2x1ZGVDb2RlQXNCbG9jaz1mYWxzZV1cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0lubGluZShlbG0sIGluY2x1ZGVDb2RlQXNCbG9jaykge1xyXG5cdHZhciB0YWdOYW1lLFxyXG5cdFx0bm9kZVR5cGUgPSAoZWxtIHx8IHt9KS5ub2RlVHlwZSB8fCBURVhUX05PREU7XHJcblxyXG5cdGlmIChub2RlVHlwZSAhPT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXR1cm4gbm9kZVR5cGUgPT09IFRFWFRfTk9ERTtcclxuXHR9XHJcblxyXG5cdHRhZ05hbWUgPSBlbG0udGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRpZiAodGFnTmFtZSA9PT0gJ2NvZGUnKSB7XHJcblx0XHRyZXR1cm4gIWluY2x1ZGVDb2RlQXNCbG9jaztcclxuXHR9XHJcblxyXG5cdHJldHVybiBibG9ja0xldmVsTGlzdC5pbmRleE9mKCd8JyArIHRhZ05hbWUgKyAnfCcpIDwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvcHkgdGhlIENTUyBmcm9tIDEgbm9kZSB0byBhbm90aGVyLlxyXG4gKlxyXG4gKiBPbmx5IGNvcGllcyBDU1MgZGVmaW5lZCBvbiB0aGUgZWxlbWVudCBlLmcuIHN0eWxlIGF0dHIuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGZyb21cclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdG9cclxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjMuMS4wXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29weUNTUyhmcm9tLCB0bykge1xyXG5cdGlmICh0by5zdHlsZSAmJiBmcm9tLnN0eWxlKSB7XHJcblx0XHR0by5zdHlsZS5jc3NUZXh0ID0gZnJvbS5zdHlsZS5jc3NUZXh0ICsgdG8uc3R5bGUuY3NzVGV4dDtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBET00gbm9kZSBpcyBlbXB0eVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eShub2RlKSB7XHJcblx0aWYgKG5vZGUubGFzdENoaWxkICYmIGlzRW1wdHkobm9kZS5sYXN0Q2hpbGQpKSB7XHJcblx0XHRyZW1vdmUobm9kZS5sYXN0Q2hpbGQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDMgPyAhbm9kZS5ub2RlVmFsdWUgOlxyXG5cdFx0KGNhbkhhdmVDaGlsZHJlbihub2RlKSAmJiAhbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaXhlcyBibG9jayBsZXZlbCBlbGVtZW50cyBpbnNpZGUgaW4gaW5saW5lIGVsZW1lbnRzLlxyXG4gKlxyXG4gKiBBbHNvIGZpeGVzIGludmFsaWQgbGlzdCBuZXN0aW5nIGJ5IHBsYWNpbmcgbmVzdGVkIGxpc3RzXHJcbiAqIGluc2lkZSB0aGUgcHJldmlvdXMgbGkgdGFnIG9yIHdyYXBwaW5nIHRoZW0gaW4gYW4gbGkgdGFnLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZml4TmVzdGluZyhub2RlKSB7XHJcblx0dHJhdmVyc2Uobm9kZSwgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdHZhciBsaXN0ID0gJ3VsLG9sJyxcclxuXHRcdFx0aXNCbG9jayA9ICFpc0lubGluZShub2RlLCB0cnVlKSAmJiBub2RlLm5vZGVUeXBlICE9PSBDT01NRU5UX05PREUsXHJcblx0XHRcdHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHJcblx0XHQvLyBBbnkgYmxvY2tsZXZlbCBlbGVtZW50IGluc2lkZSBhbiBpbmxpbmUgZWxlbWVudCBuZWVkcyBmaXhpbmcuXHJcblx0XHQvLyBBbHNvIDxwPiB0YWdzIHRoYXQgY29udGFpbiBibG9ja3Mgc2hvdWxkIGJlIGZpeGVkXHJcblx0XHRpZiAoaXNCbG9jayAmJiAoaXNJbmxpbmUocGFyZW50LCB0cnVlKSB8fCBwYXJlbnQudGFnTmFtZSA9PT0gJ1AnKSkge1xyXG5cdFx0XHQvLyBGaW5kIHRoZSBsYXN0IGlubGluZSBwYXJlbnQgbm9kZVxyXG5cdFx0XHR2YXJcdGxhc3RJbmxpbmVQYXJlbnQgPSBub2RlO1xyXG5cdFx0XHR3aGlsZSAoaXNJbmxpbmUobGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlLCB0cnVlKSB8fFxyXG5cdFx0XHRcdGxhc3RJbmxpbmVQYXJlbnQucGFyZW50Tm9kZS50YWdOYW1lID09PSAnUCcpIHtcclxuXHRcdFx0XHRsYXN0SW5saW5lUGFyZW50ID0gbGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgYmVmb3JlID0gZXh0cmFjdENvbnRlbnRzKGxhc3RJbmxpbmVQYXJlbnQsIG5vZGUpO1xyXG5cdFx0XHR2YXIgbWlkZGxlID0gbm9kZTtcclxuXHJcblx0XHRcdC8vIENsb25lIGlubGluZSBzdHlsaW5nIGFuZCBhcHBseSBpdCB0byB0aGUgYmxvY2tzIGNoaWxkcmVuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50LCB0cnVlKSkge1xyXG5cdFx0XHRcdGlmIChwYXJlbnQubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0XHRcdFx0dmFyIGNsb25lID0gcGFyZW50LmNsb25lTm9kZSgpO1xyXG5cdFx0XHRcdFx0d2hpbGUgKG1pZGRsZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRcdGFwcGVuZENoaWxkKGNsb25lLCBtaWRkbGUuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0YXBwZW5kQ2hpbGQobWlkZGxlLCBjbG9uZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpbnNlcnRCZWZvcmUobWlkZGxlLCBsYXN0SW5saW5lUGFyZW50KTtcclxuXHRcdFx0aWYgKCFpc0VtcHR5KGJlZm9yZSkpIHtcclxuXHRcdFx0XHRpbnNlcnRCZWZvcmUoYmVmb3JlLCBtaWRkbGUpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChpc0VtcHR5KGxhc3RJbmxpbmVQYXJlbnQpKSB7XHJcblx0XHRcdFx0cmVtb3ZlKGxhc3RJbmxpbmVQYXJlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRml4IGludmFsaWQgbmVzdGVkIGxpc3RzIHdoaWNoIHNob3VsZCBiZSB3cmFwcGVkIGluIGFuIGxpIHRhZ1xyXG5cdFx0aWYgKGlzQmxvY2sgJiYgaXMobm9kZSwgbGlzdCkgJiYgaXMobm9kZS5wYXJlbnROb2RlLCBsaXN0KSkge1xyXG5cdFx0XHR2YXIgbGkgPSBwcmV2aW91c0VsZW1lbnRTaWJsaW5nKG5vZGUsICdsaScpO1xyXG5cclxuXHRcdFx0aWYgKCFsaSkge1xyXG5cdFx0XHRcdGxpID0gY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0XHRpbnNlcnRCZWZvcmUobGksIG5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRhcHBlbmRDaGlsZChsaSwgbm9kZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyB0aGUgY29tbW9uIHBhcmVudCBvZiB0d28gbm9kZXNcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGUxXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMlxyXG4gKiBAcmV0dXJuIHs/SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZENvbW1vbkFuY2VzdG9yKG5vZGUxLCBub2RlMikge1xyXG5cdHdoaWxlICgobm9kZTEgPSBub2RlMS5wYXJlbnROb2RlKSkge1xyXG5cdFx0aWYgKGNvbnRhaW5zKG5vZGUxLCBub2RlMikpIHtcclxuXHRcdFx0cmV0dXJuIG5vZGUxO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7P05vZGV9XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZXZpb3VzPWZhbHNlXVxyXG4gKiBAcmV0dXJucyB7P05vZGV9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2libGluZyhub2RlLCBwcmV2aW91cykge1xyXG5cdGlmICghbm9kZSkge1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gKHByZXZpb3VzID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nKSB8fFxyXG5cdFx0Z2V0U2libGluZyhub2RlLnBhcmVudE5vZGUsIHByZXZpb3VzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdW51c2VkIHdoaXRlc3BhY2UgZnJvbSB0aGUgcm9vdCBhbmQgYWxsIGl0J3MgY2hpbGRyZW4uXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSByb290XHJcbiAqIEBzaW5jZSAxLjQuM1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVdoaXRlU3BhY2Uocm9vdCkge1xyXG5cdHZhclx0bm9kZVZhbHVlLCBub2RlVHlwZSwgbmV4dCwgcHJldmlvdXMsIHByZXZpb3VzU2libGluZyxcclxuXHRcdG5leHROb2RlLCB0cmltU3RhcnQsXHJcblx0XHRjc3NXaGl0ZVNwYWNlID0gY3NzKHJvb3QsICd3aGl0ZVNwYWNlJyksXHJcblx0XHQvLyBQcmVzZXJ2ZSBuZXdsaW5lcyBpZiBpcyBwcmUtbGluZVxyXG5cdFx0cHJlc2VydmVOZXdMaW5lcyA9IC9saW5lJC9pLnRlc3QoY3NzV2hpdGVTcGFjZSksXHJcblx0XHRub2RlID0gcm9vdC5maXJzdENoaWxkO1xyXG5cclxuXHQvLyBTa2lwIHByZSAmIHByZS13cmFwIHdpdGggYW55IHZlbmRvciBwcmVmaXhcclxuXHRpZiAoL3ByZSgtd3JhcCk/JC9pLnRlc3QoY3NzV2hpdGVTcGFjZSkpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHRuZXh0Tm9kZSAgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cdFx0bm9kZVZhbHVlID0gbm9kZS5ub2RlVmFsdWU7XHJcblx0XHRub2RlVHlwZSAgPSBub2RlLm5vZGVUeXBlO1xyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFICYmIG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRyZW1vdmVXaGl0ZVNwYWNlKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gVEVYVF9OT0RFKSB7XHJcblx0XHRcdG5leHQgICAgICA9IGdldFNpYmxpbmcobm9kZSk7XHJcblx0XHRcdHByZXZpb3VzICA9IGdldFNpYmxpbmcobm9kZSwgdHJ1ZSk7XHJcblx0XHRcdHRyaW1TdGFydCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzLCAnZW1sZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0cHJldmlvdXMgPSBnZXRTaWJsaW5nKHByZXZpb3VzLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgc2libGluZyBpc24ndCBpbmxpbmUgb3IgaXMgYSB0ZXh0bm9kZSB0aGF0XHJcblx0XHRcdC8vIGVuZHMgaW4gd2hpdGVzcGFjZSwgdGltZSB0aGUgc3RhcnQgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoaXNJbmxpbmUobm9kZSkgJiYgcHJldmlvdXMpIHtcclxuXHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91cztcclxuXHJcblx0XHRcdFx0d2hpbGUgKHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQ7XHJcblxyXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzU2libGluZywgJ2VtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBnZXRTaWJsaW5nKHByZXZpb3VzU2libGluZywgdHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0cmltU3RhcnQgPSBwcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgPT09IFRFWFRfTk9ERSA/XHJcblx0XHRcdFx0XHQvW1xcdFxcblxcciBdJC8udGVzdChwcmV2aW91c1NpYmxpbmcubm9kZVZhbHVlKSA6XHJcblx0XHRcdFx0XHQhaXNJbmxpbmUocHJldmlvdXNTaWJsaW5nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2xlYXIgemVybyB3aWR0aCBzcGFjZXNcclxuXHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoL1xcdTIwMEIvZywgJycpO1xyXG5cclxuXHRcdFx0Ly8gU3RyaXAgbGVhZGluZyB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmICghcHJldmlvdXMgfHwgIWlzSW5saW5lKHByZXZpb3VzKSB8fCB0cmltU3RhcnQpIHtcclxuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvXltcXHQgXSsvIDogL15bXFx0XFxuXFxyIF0rLyxcclxuXHRcdFx0XHRcdCcnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU3RyaXAgdHJhaWxpbmcgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoIW5leHQgfHwgIWlzSW5saW5lKG5leHQpKSB7XHJcblx0XHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSskLyA6IC9bXFx0XFxuXFxyIF0rJC8sXHJcblx0XHRcdFx0XHQnJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBlbXB0eSB0ZXh0IG5vZGVzXHJcblx0XHRcdGlmICghbm9kZVZhbHVlLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlbW92ZShub2RlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9bXFx0IF0rL2cgOiAvW1xcdFxcblxcciBdKy9nLFxyXG5cdFx0XHRcdFx0JyAnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0Tm9kZTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbGwgdGhlIG5vZGVzIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RhcnROb2RlXHRUaGUgbm9kZSB0byBzdGFydCBleHRyYWN0aW5nIGF0XHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVuZE5vZGVcdFx0VGhlIG5vZGUgdG8gc3RvcCBleHRyYWN0aW5nIGF0XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRzKHN0YXJ0Tm9kZSwgZW5kTm9kZSkge1xyXG5cdHZhciByYW5nZSA9IHN0YXJ0Tm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcblxyXG5cdHJhbmdlLnNldFN0YXJ0QmVmb3JlKHN0YXJ0Tm9kZSk7XHJcblx0cmFuZ2Uuc2V0RW5kQWZ0ZXIoZW5kTm9kZSk7XHJcblxyXG5cdHJldHVybiByYW5nZS5leHRyYWN0Q29udGVudHMoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIG9mZnNldCBwb3NpdGlvbiBvZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggbGVmdCBhbmQgdG9wIHByb3BlcnRpZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPZmZzZXQobm9kZSkge1xyXG5cdHZhclx0bGVmdCA9IDAsXHJcblx0XHR0b3AgPSAwO1xyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0bGVmdCArPSBub2RlLm9mZnNldExlZnQ7XHJcblx0XHR0b3AgICs9IG5vZGUub2Zmc2V0VG9wO1xyXG5cdFx0bm9kZSAgPSBub2RlLm9mZnNldFBhcmVudDtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRsZWZ0OiBsZWZ0LFxyXG5cdFx0dG9wOiB0b3BcclxuXHR9O1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgdmFsdWUgb2YgYSBDU1MgcHJvcGVydHkgZnJvbSB0aGUgZWxlbWVudHMgc3R5bGUgYXR0cmlidXRlXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHBhcmFtICB7c3RyaW5nfSBwcm9wZXJ0eVxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3R5bGUoZWxtLCBwcm9wZXJ0eSkge1xyXG5cdHZhclx0c3R5bGVWYWx1ZSxcclxuXHRcdGVsbVN0eWxlID0gZWxtLnN0eWxlO1xyXG5cclxuXHRpZiAoIWNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSkge1xyXG5cdFx0Y3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldID0gY2FtZWxDYXNlKHByb3BlcnR5KTtcclxuXHR9XHJcblxyXG5cdHByb3BlcnR5ICAgPSBjc3NQcm9wZXJ0eU5hbWVDYWNoZVtwcm9wZXJ0eV07XHJcblx0c3R5bGVWYWx1ZSA9IGVsbVN0eWxlW3Byb3BlcnR5XTtcclxuXHJcblx0Ly8gQWRkIGFuIGV4Y2VwdGlvbiBmb3IgdGV4dC1hbGlnblxyXG5cdGlmICgndGV4dEFsaWduJyA9PT0gcHJvcGVydHkpIHtcclxuXHRcdHN0eWxlVmFsdWUgPSBzdHlsZVZhbHVlIHx8IGNzcyhlbG0sIHByb3BlcnR5KTtcclxuXHJcblx0XHRpZiAoY3NzKGVsbS5wYXJlbnROb2RlLCBwcm9wZXJ0eSkgPT09IHN0eWxlVmFsdWUgfHxcclxuXHRcdFx0Y3NzKGVsbSwgJ2Rpc3BsYXknKSAhPT0gJ2Jsb2NrJyB8fCBpcyhlbG0sICdocix0aCcpKSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBzdHlsZVZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgYW4gZWxlbWVudCBoYXMgYSBzdHlsZS5cclxuICpcclxuICogSWYgdmFsdWVzIGFyZSBzcGVjaWZpZWQgaXQgd2lsbCBjaGVjayB0aGF0IHRoZSBzdHlsZXMgdmFsdWVcclxuICogbWF0Y2hlcyBvbmUgb2YgdGhlIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSBbdmFsdWVzXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxlKGVsbSwgcHJvcGVydHksIHZhbHVlcykge1xyXG5cdHZhciBzdHlsZVZhbHVlID0gZ2V0U3R5bGUoZWxtLCBwcm9wZXJ0eSk7XHJcblxyXG5cdGlmICghc3R5bGVWYWx1ZSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuICF2YWx1ZXMgfHwgc3R5bGVWYWx1ZSA9PT0gdmFsdWVzIHx8XHJcblx0XHQoQXJyYXkuaXNBcnJheSh2YWx1ZXMpICYmIHZhbHVlcy5pbmRleE9mKHN0eWxlVmFsdWUpID4gLTEpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGJvdGggbm9kZXMgaGF2ZSB0aGUgc2FtZSBudW1iZXIgb2YgaW5saW5lIHN0eWxlcyBhbmQgYWxsIHRoZVxyXG4gKiBpbmxpbmUgc3R5bGVzIGhhdmUgbWF0Y2hpbmcgdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVBXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVCXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSB7XHJcblx0dmFyIGkgPSBub2RlQS5zdHlsZS5sZW5ndGg7XHJcblx0aWYgKGkgIT09IG5vZGVCLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlQS5zdHlsZVtpXTtcclxuXHRcdGlmIChub2RlQS5zdHlsZVtwcm9wXSAhPT0gbm9kZUIuc3R5bGVbcHJvcF0pIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCBub2RlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBhdHRyaWJ1dGVzIGFuZCBhbGwgdGhlXHJcbiAqIGF0dHJpYnV0ZSB2YWx1ZXMgbWF0Y2hcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUFcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBhdHRyaWJ1dGVzTWF0Y2gobm9kZUEsIG5vZGVCKSB7XHJcblx0dmFyIGkgPSBub2RlQS5hdHRyaWJ1dGVzLmxlbmd0aDtcclxuXHRpZiAoaSAhPT0gbm9kZUIuYXR0cmlidXRlcy5sZW5ndGgpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdHZhciBwcm9wID0gbm9kZUEuYXR0cmlidXRlc1tpXTtcclxuXHRcdHZhciBub3RNYXRjaGVzID0gcHJvcC5uYW1lID09PSAnc3R5bGUnID9cclxuXHRcdFx0IXN0eWxlc01hdGNoKG5vZGVBLCBub2RlQikgOlxyXG5cdFx0XHRwcm9wLnZhbHVlICE9PSBhdHRyKG5vZGVCLCBwcm9wLm5hbWUpO1xyXG5cclxuXHRcdGlmIChub3RNYXRjaGVzKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0cnVlO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBlbGVtZW50IHBsYWNpbmcgaXRzIGNoaWxkcmVuIGluIGl0cyBwbGFjZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5mdW5jdGlvbiByZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSkge1xyXG5cdHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdGluc2VydEJlZm9yZShub2RlLmZpcnN0Q2hpbGQsIG5vZGUpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKG5vZGUpO1xyXG59XHJcblxyXG4vKipcclxuICogTWVyZ2VzIGlubGluZSBzdHlsZXMgYW5kIHRhZ3Mgd2l0aCBwYXJlbnRzIHdoZXJlIHBvc3NpYmxlXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAc2luY2UgMy4xLjBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZShub2RlKSB7XHJcblx0aWYgKG5vZGUubm9kZVR5cGUgIT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0dmFyIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHR2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZTtcclxuXHR2YXIgbWVyZ2VUYWdzID0gL0J8U1RST05HfEVNfFNQQU58Rk9OVC87XHJcblxyXG5cdC8vIE1lcmdlIGNoaWxkcmVuIChpbiByZXZlcnNlIGFzIGNoaWxkcmVuIGNhbiBiZSByZW1vdmVkKVxyXG5cdHZhciBpID0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aDtcclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHRtZXJnZShub2RlLmNoaWxkTm9kZXNbaV0pO1xyXG5cdH1cclxuXHJcblx0Ly8gU2hvdWxkIG9ubHkgbWVyZ2UgaW5saW5lIHRhZ3MgYW5kIHNob3VsZCBub3QgbWVyZ2UgPGJyPiB0YWdzXHJcblx0aWYgKCFpc0lubGluZShub2RlKSB8fCB0YWdOYW1lID09PSAnQlInKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHQvLyBSZW1vdmUgYW55IGlubGluZSBzdHlsZXMgdGhhdCBtYXRjaCB0aGUgcGFyZW50IHN0eWxlXHJcblx0aSA9IG5vZGUuc3R5bGUubGVuZ3RoO1xyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdHZhciBwcm9wID0gbm9kZS5zdHlsZVtpXTtcclxuXHRcdGlmIChjc3MocGFyZW50LCBwcm9wKSA9PT0gY3NzKG5vZGUsIHByb3ApKSB7XHJcblx0XHRcdG5vZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBDYW4gb25seSByZW1vdmUgLyBtZXJnZSB0YWdzIGlmIG5vIGlubGluZSBzdHlsaW5nIGxlZnQuXHJcblx0Ly8gSWYgdGhlcmUgaXMgYW55IGlubGluZSBzdHlsZSBsZWZ0IHRoZW4gaXQgbWVhbnMgaXQgYXQgbGVhc3QgcGFydGlhbGx5XHJcblx0Ly8gZG9lc24ndCBtYXRjaCB0aGUgcGFyZW50IHN0eWxlIHNvIG11c3Qgc3RheVxyXG5cdGlmICghbm9kZS5zdHlsZS5sZW5ndGgpIHtcclxuXHRcdHJlbW92ZUF0dHIobm9kZSwgJ3N0eWxlJyk7XHJcblxyXG5cdFx0Ly8gUmVtb3ZlIGZvbnQgYXR0cmlidXRlcyBpZiBtYXRjaCBwYXJlbnRcclxuXHRcdGlmICh0YWdOYW1lID09PSAnRk9OVCcpIHtcclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnZm9udEZhbWlseScpLnRvTG93ZXJDYXNlKCkgPT09XHJcblx0XHRcdFx0Y3NzKHBhcmVudCwgJ2ZvbnRGYW1pbHknKS50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQXR0cihub2RlLCAnZmFjZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdjb2xvcicpID09PSBjc3MocGFyZW50LCAnY29sb3InKSkge1xyXG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ2NvbG9yJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2ZvbnRTaXplJykgPT09IGNzcyhwYXJlbnQsICdmb250U2l6ZScpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQXR0cihub2RlLCAnc2l6ZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU3BhbnMgYW5kIGZvbnQgdGFncyB3aXRoIG5vIGF0dHJpYnV0ZXMgY2FuIGJlIHNhZmVseSByZW1vdmVkXHJcblx0XHRpZiAoIW5vZGUuYXR0cmlidXRlcy5sZW5ndGggJiYgL1NQQU58Rk9OVC8udGVzdCh0YWdOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSk7XHJcblx0XHR9IGVsc2UgaWYgKG1lcmdlVGFncy50ZXN0KHRhZ05hbWUpKSB7XHJcblx0XHRcdHZhciBpc0JvbGQgPSAvQnxTVFJPTkcvLnRlc3QodGFnTmFtZSk7XHJcblx0XHRcdHZhciBpc0l0YWxpYyA9IHRhZ05hbWUgPT09ICdFTSc7XHJcblxyXG5cdFx0XHR3aGlsZSAocGFyZW50ICYmIGlzSW5saW5lKHBhcmVudCkgJiZcclxuXHRcdFx0XHQoIWlzQm9sZCB8fCAvYm9sZHw3MDAvaS50ZXN0KGNzcyhwYXJlbnQsICdmb250V2VpZ2h0JykpKSAmJlxyXG5cdFx0XHRcdCghaXNJdGFsaWMgfHwgY3NzKHBhcmVudCwgJ2ZvbnRTdHlsZScpID09PSAnaXRhbGljJykpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmVtb3ZlIGlmIHBhcmVudCBtYXRjaFxyXG5cdFx0XHRcdGlmICgocGFyZW50LnRhZ05hbWUgPT09IHRhZ05hbWUgfHxcclxuXHRcdFx0XHRcdChpc0JvbGQgJiYgL0J8U1RST05HLy50ZXN0KHBhcmVudC50YWdOYW1lKSkpICYmXHJcblx0XHRcdFx0XHRhdHRyaWJ1dGVzTWF0Y2gocGFyZW50LCBub2RlKSkge1xyXG5cdFx0XHRcdFx0cmVtb3ZlS2VlcENoaWxkcmVuKG5vZGUpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gTWVyZ2Ugc2libGluZ3MgaWYgYXR0cmlidXRlcywgaW5jbHVkaW5nIGlubGluZSBzdHlsZXMsIG1hdGNoXHJcblx0dmFyIG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cdGlmIChuZXh0ICYmIG5leHQudGFnTmFtZSA9PT0gdGFnTmFtZSAmJiBhdHRyaWJ1dGVzTWF0Y2gobmV4dCwgbm9kZSkpIHtcclxuXHRcdGFwcGVuZENoaWxkKG5vZGUsIG5leHQpO1xyXG5cdFx0cmVtb3ZlS2VlcENoaWxkcmVuKG5leHQpO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuXG4vKipcbiAqIENoZWNrcyBhbGwgZW1vdGljb25zIGFyZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UgYW5kXG4gKiByZXBsYWNlcyBhbnkgdGhhdCBhcmVuJ3Qgd2l0aCB3aXRoIHRoZWlyIGVtb3RpY29uIGNvZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtyYW5nZUhlbHBlcn0gcmFuZ2VIZWxwZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1doaXRlc3BhY2Uobm9kZSwgcmFuZ2VIZWxwZXIpIHtcblx0dmFyIG5vbmVXc1JlZ2V4ID0gL1teXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKy87XG5cdHZhciBlbW90aWNvbnMgPSBub2RlICYmIGRvbS5maW5kKG5vZGUsICdpbWdbZGF0YS1lbWxlZGl0b3ItZW1vdGljb25dJyk7XG5cblx0aWYgKCFub2RlIHx8ICFlbW90aWNvbnMubGVuZ3RoKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbW90aWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZW1vdGljb24gPSBlbW90aWNvbnNbaV07XG5cdFx0dmFyIHBhcmVudCA9IGVtb3RpY29uLnBhcmVudE5vZGU7XG5cdFx0dmFyIHByZXYgPSBlbW90aWNvbi5wcmV2aW91c1NpYmxpbmc7XG5cdFx0dmFyIG5leHQgPSBlbW90aWNvbi5uZXh0U2libGluZztcblxuXHRcdGlmICgoIXByZXYgfHwgIW5vbmVXc1JlZ2V4LnRlc3QocHJldi5ub2RlVmFsdWUuc2xpY2UoLTEpKSkgJiZcblx0XHRcdCghbmV4dCB8fCAhbm9uZVdzUmVnZXgudGVzdCgobmV4dC5ub2RlVmFsdWUgfHwgJycpWzBdKSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciByYW5nZSA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcblx0XHR2YXIgcmFuZ2VTdGFydCA9IC0xO1xuXHRcdHZhciByYW5nZVN0YXJ0Q29udGFpbmVyID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG5cdFx0dmFyIHByZXZpb3VzVGV4dCA9IChwcmV2ICYmIHByZXYubm9kZVZhbHVlKSB8fCAnJztcblxuXHRcdHByZXZpb3VzVGV4dCArPSBkb20uZGF0YShlbW90aWNvbiwgJ2VtbGVkaXRvci1lbW90aWNvbicpO1xuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBhZnRlciB0aGUgcmVtb3ZlZCBlbW90aWNvbiwgYWRkXG5cdFx0Ly8gdGhlIGxlbmd0aCBvZiB0aGUgbmV3bHkgYWRkZWQgdGV4dCB0byBpdFxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBuZXh0KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcHJldmlvdXNUZXh0Lmxlbmd0aCArIHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgc2V0IGJlZm9yZSB0aGUgbmV4dCBub2RlLCBzZXQgaXQgdG9cblx0XHQvLyB0aGUgZW5kIG9mIHRoZSBuZXcgdGV4dCBub2RlXG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IG5vZGUgJiZcblx0XHRcdG5vZGUuY2hpbGROb2Rlc1tyYW5nZS5zdGFydE9mZnNldF0gPT09IG5leHQpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSBwcmV2aW91c1RleHQubGVuZ3RoO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgc2V0IGJlZm9yZSB0aGUgcmVtb3ZlZCBlbW90aWNvbixcblx0XHQvLyBqdXN0IGtlZXAgaXQgYXQgdGhhdCBwb3NpdGlvblxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBwcmV2KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0aWYgKCFuZXh0IHx8IG5leHQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcblx0XHRcdG5leHQgPSBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuXHRcdFx0XHRwYXJlbnQub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyksIG5leHRcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0bmV4dC5pbnNlcnREYXRhKDAsIHByZXZpb3VzVGV4dCk7XG5cdFx0ZG9tLnJlbW92ZShlbW90aWNvbik7XG5cdFx0aWYgKHByZXYpIHtcblx0XHRcdGRvbS5yZW1vdmUocHJldik7XG5cdFx0fVxuXG5cdFx0Ly8gTmVlZCB0byB1cGRhdGUgdGhlIHJhbmdlIHN0YXJ0aW5nIHBvc2l0aW9uIGlmIGl0J3MgYmVlbiBtb2RpZmllZFxuXHRcdGlmIChyYW5nZVN0YXJ0ID4gLTEpIHtcblx0XHRcdHJhbmdlLnNldFN0YXJ0KG5leHQsIHJhbmdlU3RhcnQpO1xuXHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0XHRyYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogUmVwbGFjZXMgYW55IGVtb3RpY29ucyBpbnNpZGUgdGhlIHJvb3Qgbm9kZSB3aXRoIGltYWdlcy5cbiAqXG4gKiBlbW90aWNvbnMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5IGlzIHRoZSBlbW90aWNvblxuICogY29kZSBhbmQgdGhlIHZhbHVlIGlzIHRoZSBIVE1MIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByb290XG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZz59IGVtb3RpY29uc1xuICogQHBhcmFtIHtib29sZWFufSBlbW90aWNvbnNDb21wYXRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKHJvb3QsIGVtb3RpY29ucywgZW1vdGljb25zQ29tcGF0KSB7XG5cdHZhclx0ZG9jICAgICAgICAgICA9IHJvb3Qub3duZXJEb2N1bWVudDtcblx0dmFyIHNwYWNlICAgICAgICAgPSAnKF58XFxcXHN8XFx4QTB8XFx1MjAwMnxcXHUyMDAzfFxcdTIwMDl8JCknO1xuXHR2YXIgZW1vdGljb25Db2RlcyA9IFtdO1xuXHR2YXIgZW1vdGljb25SZWdleCA9IHt9O1xuXG5cdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxuXHRpZiAoZG9tLnBhcmVudChyb290LCAnY29kZScpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbW90aWNvblJlZ2V4W2tleV0gPSBuZXcgUmVnRXhwKHNwYWNlICsgZXNjYXBlLnJlZ2V4KGtleSkgKyBzcGFjZSk7XG5cdFx0ZW1vdGljb25Db2Rlcy5wdXNoKGtleSk7XG5cdH0pO1xuXG5cdC8vIFNvcnQga2V5cyBsb25nZXN0IHRvIHNob3J0ZXN0IHNvIHRoYXQgbG9uZ2VyIGtleXNcblx0Ly8gdGFrZSBwcmVjZWRlbmNlIChhdm9pZHMgYnVncyB3aXRoIHNob3J0ZXIga2V5cyBwYXJ0aWFsbHlcblx0Ly8gbWF0Y2hpbmcgbG9uZ2VyIG9uZXMpXG5cdGVtb3RpY29uQ29kZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuXHR9KTtcblxuXHQoZnVuY3Rpb24gY29udmVydChub2RlKSB7XG5cdFx0bm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcblxuXHRcdHdoaWxlIChub2RlKSB7XG5cdFx0XHQvLyBUT0RPOiBNYWtlIHRoaXMgdGFnIGNvbmZpZ3VyYWJsZS5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmICFkb20uaXMobm9kZSwgJ2NvZGUnKSkge1xuXHRcdFx0XHRjb252ZXJ0KG5vZGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RpY29uQ29kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgdGV4dCAgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR2YXIga2V5ICAgPSBlbW90aWNvbkNvZGVzW2ldO1xuXHRcdFx0XHRcdHZhciBpbmRleCA9IGVtb3RpY29uc0NvbXBhdCA/XG5cdFx0XHRcdFx0XHR0ZXh0LnNlYXJjaChlbW90aWNvblJlZ2V4W2tleV0pIDpcblx0XHRcdFx0XHRcdHRleHQuaW5kZXhPZihrZXkpO1xuXG5cdFx0XHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0XHRcdC8vIFdoZW4gZW1vdGljb25zQ29tcGF0IGlzIGVuYWJsZWQgdGhpcyB3aWxsIGJlIHRoZVxuXHRcdFx0XHRcdFx0Ly8gcG9zaXRpb24gYWZ0ZXIgYW55IHdoaXRlIHNwYWNlXG5cdFx0XHRcdFx0XHR2YXIgc3RhcnRJbmRleCA9IHRleHQuaW5kZXhPZihrZXksIGluZGV4KTtcblx0XHRcdFx0XHRcdHZhciBmcmFnbWVudCAgID0gZG9tLnBhcnNlSFRNTChlbW90aWNvbnNba2V5XSwgZG9jKTtcblx0XHRcdFx0XHRcdHZhciBhZnRlciAgICAgID0gdGV4dC5zdWJzdHIoc3RhcnRJbmRleCArIGtleS5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoYWZ0ZXIpKTtcblxuXHRcdFx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSB0ZXh0LnN1YnN0cigwLCBzdGFydEluZGV4KTtcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50Tm9kZVxuXHRcdFx0XHRcdFx0XHQuaW5zZXJ0QmVmb3JlKGZyYWdtZW50LCBub2RlLm5leHRTaWJsaW5nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHR9KHJvb3QpKTtcbn1cbiIsIi8vIE11c3Qgc3RhcnQgd2l0aCBhIHZhbGlkIHNjaGVtZVxyXG4vLyBcdFx0XlxyXG4vLyBTY2hlbWVzIHRoYXQgYXJlIGNvbnNpZGVyZWQgc2FmZVxyXG4vLyBcdFx0KGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fFxyXG4vLyBSZWxhdGl2ZSBzY2hlbWVzICgvLzopIGFyZSBjb25zaWRlcmVkIHNhZmVcclxuLy8gXHRcdChcXFxcL1xcXFwvKXxcclxuLy8gSW1hZ2UgZGF0YSBVUkkncyBhcmUgY29uc2lkZXJlZCBzYWZlXHJcbi8vIFx0XHRkYXRhOmltYWdlXFxcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7XHJcbnZhciBWQUxJRF9TQ0hFTUVfUkVHRVggPVxyXG5cdC9eKGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fChcXC9cXC8pfGRhdGE6aW1hZ2VcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7L2k7XHJcblxyXG4vKipcclxuICogRXNjYXBlcyBhIHN0cmluZyBzbyBpdCdzIHNhZmUgdG8gdXNlIGluIHJlZ2V4XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2V4KHN0cikge1xyXG5cdHJldHVybiBzdHIucmVwbGFjZSgvKFstLiorP149IToke30oKXxbXFxdL1xcXFxdKS9nLCAnXFxcXCQxJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGFsbCBIVE1MIGVudGl0aWVzIGluIGEgc3RyaW5nXHJcbiAqXHJcbiAqIElmIG5vUXVvdGVzIGlzIHNldCB0byBmYWxzZSwgYWxsIHNpbmdsZSBhbmQgZG91YmxlXHJcbiAqIHF1b3RlcyB3aWxsIGFsc28gYmUgZXNjYXBlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25vUXVvdGVzPXRydWVdXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogQHNpbmNlIDEuNC4xXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW50aXRpZXMoc3RyLCBub1F1b3Rlcykge1xyXG5cdGlmICghc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0dmFyIHJlcGxhY2VtZW50cyA9IHtcclxuXHRcdCcmJzogJyZhbXA7JyxcclxuXHRcdCc8JzogJyZsdDsnLFxyXG5cdFx0Jz4nOiAnJmd0OycsXHJcblx0XHQnICAnOiAnJm5ic3A7ICcsXHJcblx0XHQnXFxyXFxuJzogJzxiciAvPicsXHJcblx0XHQnXFxyJzogJzxiciAvPicsXHJcblx0XHQnXFxuJzogJzxiciAvPidcclxuXHR9O1xyXG5cclxuXHRpZiAobm9RdW90ZXMgIT09IGZhbHNlKSB7XHJcblx0XHRyZXBsYWNlbWVudHNbJ1wiJ10gID0gJyYjMzQ7JztcclxuXHRcdHJlcGxhY2VtZW50c1snXFwnJ10gPSAnJiMzOTsnO1xyXG5cdFx0cmVwbGFjZW1lbnRzWydgJ10gID0gJyYjOTY7JztcclxuXHR9XHJcblxyXG5cdHN0ciA9IHN0ci5yZXBsYWNlKC8gezJ9fFxcclxcbnxbJjw+XFxyXFxuJ1wiYF0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XHJcblx0XHRyZXR1cm4gcmVwbGFjZW1lbnRzW21hdGNoXSB8fCBtYXRjaDtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZSBVUkkgc2NoZW1lLlxyXG4gKlxyXG4gKiBBcHBlbmRzIHRoZSBjdXJyZW50IFVSTCB0byBhIHVybCBpZiBpdCBoYXMgYSBzY2hlbWUgdGhhdCBpcyBub3Q6XHJcbiAqXHJcbiAqIGh0dHBcclxuICogaHR0cHNcclxuICogc2Z0cFxyXG4gKiBmdHBcclxuICogbWFpbHRvXHJcbiAqIHNwb3RpZnlcclxuICogc2t5cGVcclxuICogc3NoXHJcbiAqIHRlYW1zcGVha1xyXG4gKiB0ZWxcclxuICogLy9cclxuICogZGF0YTppbWFnZS8ocG5nfGpwZWd8anBnfHBqcGVnfGJtcHxnaWYpO1xyXG4gKlxyXG4gKiAqKklNUE9SVEFOVCoqOiBUaGlzIGRvZXMgbm90IGVzY2FwZSBhbnkgSFRNTCBpbiBhIHVybCwgZm9yXHJcbiAqIHRoYXQgdXNlIHRoZSBlc2NhcGUuZW50aXRpZXMoKSBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogQHNpbmNlIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXJpU2NoZW1lKHVybCkge1xyXG5cdHZhclx0cGF0aCxcclxuXHRcdC8vIElmIHRoZXJlIGlzIGEgOiBiZWZvcmUgYSAvIHRoZW4gaXQgaGFzIGEgc2NoZW1lXHJcblx0XHRoYXNTY2hlbWUgPSAvXlteL10qOi9pLFxyXG5cdFx0bG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblxyXG5cdC8vIEhhcyBubyBzY2hlbWUgb3IgYSB2YWxpZCBzY2hlbWVcclxuXHRpZiAoKCF1cmwgfHwgIWhhc1NjaGVtZS50ZXN0KHVybCkpIHx8IFZBTElEX1NDSEVNRV9SRUdFWC50ZXN0KHVybCkpIHtcclxuXHRcdHJldHVybiB1cmw7XHJcblx0fVxyXG5cclxuXHRwYXRoID0gbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcclxuXHRwYXRoLnBvcCgpO1xyXG5cclxuXHRyZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICtcclxuXHRcdGxvY2F0aW9uLmhvc3QgK1xyXG5cdFx0cGF0aC5qb2luKCcvJykgKyAnLycgK1xyXG5cdFx0dXJsO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuXG5cbi8qKlxuICogSFRNTCB0ZW1wbGF0ZXMgdXNlZCBieSB0aGUgZWRpdG9yIGFuZCBkZWZhdWx0IGNvbW1hbmRzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIF90ZW1wbGF0ZXMgPSB7XG5cdGh0bWw6XG5cdFx0JzwhRE9DVFlQRSBodG1sPicgK1xuXHRcdCc8aHRtbHthdHRyc30+JyArXG5cdFx0XHQnPGhlYWQ+JyArXG5cdFx0XHRcdCc8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgJyArXG5cdFx0XHRcdFx0J2NvbnRlbnQ9XCJ0ZXh0L2h0bWw7Y2hhcnNldD17Y2hhcnNldH1cIiAvPicgK1xuXHRcdFx0XHQnPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIHR5cGU9XCJ0ZXh0L2Nzc1wiIGhyZWY9XCJ7c3R5bGV9XCIgLz4nICtcblx0XHRcdCc8L2hlYWQ+JyArXG5cdFx0XHQnPGJvZHkgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiIHtzcGVsbGNoZWNrfT48cD48L3A+PC9ib2R5PicgK1xuXHRcdCc8L2h0bWw+JyxcblxuXHR0b29sYmFyQnV0dG9uOiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItYnV0dG9uIGVtbGVkaXRvci1idXR0b24te25hbWV9XCIgJyArXG5cdFx0J2RhdGEtZW1sZWRpdG9yLWNvbW1hbmQ9XCJ7bmFtZX1cIiB1bnNlbGVjdGFibGU9XCJvblwiPicgK1xuXHRcdCc8ZGl2IHVuc2VsZWN0YWJsZT1cIm9uXCI+e2Rpc3BOYW1lfTwvZGl2PjwvYT4nLFxuXG5cdGVtb3RpY29uOiAnPGltZyBzcmM9XCJ7dXJsfVwiIGRhdGEtZW1sZWRpdG9yLWVtb3RpY29uPVwie2tleX1cIiAnICtcblx0XHQnYWx0PVwie2tleX1cIiB0aXRsZT1cInt0b29sdGlwfVwiIC8+JyxcblxuXHRmb250T3B0OiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItZm9udC1vcHRpb25cIiBocmVmPVwiI1wiICcgK1xuXHRcdCdkYXRhLWZvbnQ9XCJ7Zm9udH1cIj48Zm9udCBmYWNlPVwie2ZvbnR9XCI+e2ZvbnR9PC9mb250PjwvYT4nLFxuXG5cdHNpemVPcHQ6ICc8YSBjbGFzcz1cImVtbGVkaXRvci1mb250c2l6ZS1vcHRpb25cIiBkYXRhLXNpemU9XCJ7c2l6ZX1cIiAnICtcblx0XHQnaHJlZj1cIiNcIj48Zm9udCBzaXplPVwie3NpemV9XCI+e3NpemV9PC9mb250PjwvYT4nLFxuXG5cdHBhc3RldGV4dDpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwidHh0XCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xuXHRcdFx0Jzx0ZXh0YXJlYSBjb2xzPVwiMjBcIiByb3dzPVwiN1wiIGlkPVwidHh0XCI+PC90ZXh0YXJlYT48L2Rpdj4nICtcblx0XHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcblx0XHQnPC9kaXY+JyxcblxuXHR0YWJsZTpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwicm93c1wiPntyb3dzfTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgJyArXG5cdFx0XHQnaWQ9XCJyb3dzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiY29sc1wiPntjb2xzfTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgJyArXG5cdFx0XHQnaWQ9XCJjb2xzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiJyArXG5cdFx0XHQnIC8+PC9kaXY+JyxcblxuXHRpbWFnZTpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiaW1hZ2VcIj57dXJsfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaW1hZ2VcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwid2lkdGhcIj57d2lkdGh9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ3aWR0aFwiIHNpemU9XCIyXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiaGVpZ2h0XCI+e2hlaWdodH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImhlaWdodFwiIHNpemU9XCIyXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0XHQnPC9kaXY+JyxcblxuXHRlbWFpbDpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZW1haWxcIj57bGFiZWx9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWFpbFwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImRlc1wiPntkZXNjfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0XHQnPC9kaXY+JyxcblxuXHRsaW5rOlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJsaW5rXCI+e3VybH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpbmtcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZGVzXCI+e2Rlc2N9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXNcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnN9XCIgLz48L2Rpdj4nLFxuXG5cdHlvdXR1YmVNZW51OlxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJsaW5rXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlua1wiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcblx0XHRcdCc8L2Rpdj4nLFxuXG5cdHlvdXR1YmU6XG5cdFx0JzxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4gJyArXG5cdFx0J3NyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL3tpZH0/d21vZGU9b3BhcXVlJnN0YXJ0PXt0aW1lfVwiICcgK1xuXHRcdCdkYXRhLXlvdXR1YmUtaWQ9XCJ7aWR9XCI+PC9pZnJhbWU+J1xufTtcblxuLyoqXG4gKiBSZXBsYWNlcyBhbnkgcGFyYW1zIGluIGEgdGVtcGxhdGUgd2l0aCB0aGUgcGFzc2VkIHBhcmFtcy5cbiAqXG4gKiBJZiBjcmVhdGVIdG1sIGlzIHBhc3NlZCBpdCB3aWxsIHJldHVybiBhIERvY3VtZW50RnJhZ21lbnRcbiAqIGNvbnRhaW5pbmcgdGhlIHBhcnNlZCB0ZW1wbGF0ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjcmVhdGVIdG1sXVxuICogQHJldHVybnMge2FueX1cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRlbXBsYXRlcyAobmFtZSwgcGFyYW1zLCBjcmVhdGVIdG1sKSB7XG5cdHZhciB0ZW1wbGF0ZSA9IF90ZW1wbGF0ZXNbbmFtZV07XG5cblx0T2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0dGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFxuXHRcdFx0bmV3IFJlZ0V4cChlc2NhcGUucmVnZXgoJ3snICsgbmFtZSArICd9JyksICdnJyksIHBhcmFtc1tuYW1lXVxuXHRcdCk7XG5cdH0pO1xuXG5cdGlmIChjcmVhdGVIdG1sKSB7XG5cdFx0dGVtcGxhdGUgPSBkb20ucGFyc2VIVE1MKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJldHVybiB0ZW1wbGF0ZTtcbn1cbiIsIi8qKlxyXG4gKiBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHRoZVxyXG4gKiB0aGUgcGFzc2VkIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXHJcbiAqIEBwYXJhbSB7Kn0gYXJnXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZnVuY3Rpb24gaXNUeXBlb2YodHlwZSwgYXJnKSB7XHJcblx0cmV0dXJuIHR5cGVvZiBhcmcgPT09IHR5cGU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzU3RyaW5nID0gaXNUeXBlb2YuYmluZChudWxsLCAnc3RyaW5nJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc1VuZGVmaW5lZCA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ3VuZGVmaW5lZCcpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNGdW5jdGlvbiA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ2Z1bmN0aW9uJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc051bWJlciA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ251bWJlcicpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYW4gb2JqZWN0IGhhcyBubyBrZXlzXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdH0gb2JqXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlPYmplY3Qob2JqKSB7XHJcblx0cmV0dXJuICFPYmplY3Qua2V5cyhvYmopLmxlbmd0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dGVuZHMgdGhlIGZpcnN0IG9iamVjdCB3aXRoIGFueSBleHRyYSBvYmplY3RzIHBhc3NlZFxyXG4gKlxyXG4gKiBJZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYm9vbGVhbiBhbmQgc2V0IHRvIHRydWVcclxuICogaXQgd2lsbCBleHRlbmQgY2hpbGQgYXJyYXlzIGFuZCBvYmplY3RzIHJlY3Vyc2l2ZWx5LlxyXG4gKlxyXG4gKiBAcGFyYW0geyFPYmplY3R8Ym9vbGVhbn0gdGFyZ2V0QXJnXHJcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXRBcmcsIHNvdXJjZUFyZykge1xyXG5cdHZhciBpc1RhcmdldEJvb2xlYW4gPSB0YXJnZXRBcmcgPT09ICEhdGFyZ2V0QXJnO1xyXG5cdHZhciBpICAgICAgPSBpc1RhcmdldEJvb2xlYW4gPyAyIDogMTtcclxuXHR2YXIgdGFyZ2V0ID0gaXNUYXJnZXRCb29sZWFuID8gc291cmNlQXJnIDogdGFyZ2V0QXJnO1xyXG5cdHZhciBpc0RlZXAgPSBpc1RhcmdldEJvb2xlYW4gPyB0YXJnZXRBcmcgOiBmYWxzZTtcclxuXHJcblx0ZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcclxuXHRcdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXHJcblx0XHRcdE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSkgPT09IE9iamVjdC5wcm90b3R5cGU7XHJcblx0fVxyXG5cclxuXHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcclxuXHJcblx0XHQvLyBDb3B5IGFsbCBwcm9wZXJ0aWVzIGZvciBqUXVlcnkgY29tcGF0aWJpbGl0eVxyXG5cdFx0LyogZXNsaW50IGd1YXJkLWZvci1pbjogb2ZmICovXHJcblx0XHRmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XHJcblx0XHRcdHZhciB0YXJnZXRWYWx1ZSA9IHRhcmdldFtrZXldO1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcclxuXHJcblx0XHRcdC8vIFNraXAgdW5kZWZpbmVkIHZhbHVlcyB0byBtYXRjaCBqUXVlcnlcclxuXHRcdFx0aWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTa2lwIHNwZWNpYWwga2V5cyB0byBwcmV2ZW50IHByb3RvdHlwZSBwb2xsdXRpb25cclxuXHRcdFx0aWYgKGtleSA9PT0gJ19fcHJvdG9fXycgfHwga2V5ID09PSAnY29uc3RydWN0b3InKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBpc1ZhbHVlT2JqZWN0ID0gaXNPYmplY3QodmFsdWUpO1xyXG5cdFx0XHR2YXIgaXNWYWx1ZUFycmF5ID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcblxyXG5cdFx0XHRpZiAoaXNEZWVwICYmIChpc1ZhbHVlT2JqZWN0IHx8IGlzVmFsdWVBcnJheSkpIHtcclxuXHRcdFx0XHQvLyBDYW4gb25seSBtZXJnZSBpZiB0YXJnZXQgdHlwZSBtYXRjaGVzIG90aGVyd2lzZSBjcmVhdGVcclxuXHRcdFx0XHQvLyBuZXcgdGFyZ2V0IHRvIG1lcmdlIGludG9cclxuXHRcdFx0XHR2YXIgaXNTYW1lVHlwZSA9IGlzT2JqZWN0KHRhcmdldFZhbHVlKSA9PT0gaXNWYWx1ZU9iamVjdCAmJlxyXG5cdFx0XHRcdFx0QXJyYXkuaXNBcnJheSh0YXJnZXRWYWx1ZSkgPT09IGlzVmFsdWVBcnJheTtcclxuXHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBleHRlbmQoXHJcblx0XHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdFx0aXNTYW1lVHlwZSA/IHRhcmdldFZhbHVlIDogKGlzVmFsdWVBcnJheSA/IFtdIDoge30pLFxyXG5cdFx0XHRcdFx0dmFsdWVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB0YXJnZXQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSB0aGUgcGFzc2VkIGFycmF5XHJcbiAqXHJcbiAqIEBwYXJhbSB7IUFycmF5fSBhcnJcclxuICogQHBhcmFtIHsqfSBpdGVtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyLCBpdGVtKSB7XHJcblx0dmFyIGkgPSBhcnIuaW5kZXhPZihpdGVtKTtcclxuXHJcblx0aWYgKGkgPiAtMSkge1xyXG5cdFx0YXJyLnNwbGljZShpLCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJdGVyYXRlcyBvdmVyIGFuIGFycmF5IG9yIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0geyFPYmplY3R8QXJyYXl9IG9ialxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosICopfSBmblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGVhY2gob2JqLCBmbikge1xyXG5cdGlmIChBcnJheS5pc0FycmF5KG9iaikgfHwgJ2xlbmd0aCcgaW4gb2JqICYmIGlzTnVtYmVyKG9iai5sZW5ndGgpKSB7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRmbihpLCBvYmpbaV0pO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xyXG5cdFx0XHRmbihrZXksIG9ialtrZXldKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEVtbEVkaXRvciBmcm9tICcuL2xpYi9lbWxFZGl0b3InO1xuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4vbGliL3BsdWdpbk1hbmFnZXInO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vbGliL2VzY2FwZS5qcyc7XG5pbXBvcnQgKiBhcyBicm93c2VyIGZyb20gJy4vbGliL2Jyb3dzZXIuanMnO1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vbGliL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2xpYi91dGlscy5qcyc7XG5pbXBvcnQgZGVmYXVsdENvbW1hbmRzIGZyb20gJy4vbGliL2RlZmF1bHRDb21tYW5kcy5qcyc7XG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9saWIvZGVmYXVsdE9wdGlvbnMuanMnO1xuaW1wb3J0ICcuL3RoZW1lcy9zcXVhcmUubGVzcyc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcblx0aW50ZXJmYWNlIFdpbmRvdyB7XG5cdFx0ZW1sRWRpdG9yOiBJRWRpdG9yO1xuXHR9XG59XG5cbmludGVyZmFjZSBJRWRpdG9yIHtcblx0Y29tbWFuZDogT2JqZWN0O1xuXHRsb2NhbGU6IE9iamVjdDtcblx0aWNvbnM6IE9iamVjdDtcblx0Zm9ybWF0czogT2JqZWN0O1xuXHRjb21tYW5kczogT2JqZWN0O1xuXHRkZWZhdWx0T3B0aW9uczogT2JqZWN0O1xuXHRpb3M6IGJvb2xlYW47XG5cdGlzV3lzaXd5Z1N1cHBvcnRlZDogYm9vbGVhbjtcblx0cmVnZXhFc2NhcGUoc3RyOiBzdHJpbmcpOiBzdHJpbmc7XG5cdGVzY2FwZUVudGl0aWVzKHN0cjogc3RyaW5nLCBub1F1b3RlczogYm9vbGVhbiB8IG51bGwpOiBzdHJpbmc7XG5cdGVzY2FwZVVyaVNjaGVtZSh1cmw6IHN0cmluZyk6IHN0cmluZztcblx0ZG9tOiBPYmplY3Q7XG5cdHV0aWxzOiBPYmplY3Q7XG5cdHBsdWdpbnM6IE9iamVjdDtcblx0Y3JlYXRlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBvcHRpb25zOiBPYmplY3QpOiB2b2lkO1xuXHRpbnN0YW5jZSh0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCk6IElFZGl0b3I7XG59XG5cbndpbmRvdy5lbWxFZGl0b3IgPSB7XG5cdGNvbW1hbmQ6IEVtbEVkaXRvci5jb21tYW5kLFxuXHRsb2NhbGU6IEVtbEVkaXRvci5sb2NhbGUsXG5cdGljb25zOiBFbWxFZGl0b3IuaWNvbnMsXG5cdGZvcm1hdHM6IEVtbEVkaXRvci5mb3JtYXRzLFxuXG5cdGNvbW1hbmRzOiBkZWZhdWx0Q29tbWFuZHMsXG5cdGRlZmF1bHRPcHRpb25zOiBkZWZhdWx0T3B0aW9ucyxcblx0aW9zOiBicm93c2VyLmlvcyxcblx0aXNXeXNpd3lnU3VwcG9ydGVkOiBicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCxcblx0cmVnZXhFc2NhcGU6IGVzY2FwZS5yZWdleCxcblx0ZXNjYXBlRW50aXRpZXM6IGVzY2FwZS5lbnRpdGllcyxcblx0ZXNjYXBlVXJpU2NoZW1lOiBlc2NhcGUudXJpU2NoZW1lLFxuXG5cdGRvbToge1xuXHRcdGNzczogZG9tLmNzcyxcblx0XHRhdHRyOiBkb20uYXR0cixcblx0XHRyZW1vdmVBdHRyOiBkb20ucmVtb3ZlQXR0cixcblx0XHRpczogZG9tLmlzLFxuXHRcdGNsb3Nlc3Q6IGRvbS5jbG9zZXN0LFxuXHRcdHdpZHRoOiBkb20ud2lkdGgsXG5cdFx0aGVpZ2h0OiBkb20uaGVpZ2h0LFxuXHRcdHRyYXZlcnNlOiBkb20udHJhdmVyc2UsXG5cdFx0clRyYXZlcnNlOiBkb20uclRyYXZlcnNlLFxuXHRcdHBhcnNlSFRNTDogZG9tLnBhcnNlSFRNTCxcblx0XHRoYXNTdHlsaW5nOiBkb20uaGFzU3R5bGluZyxcblx0XHRjb252ZXJ0RWxlbWVudDogZG9tLmNvbnZlcnRFbGVtZW50LFxuXHRcdGJsb2NrTGV2ZWxMaXN0OiBkb20uYmxvY2tMZXZlbExpc3QsXG5cdFx0Y2FuSGF2ZUNoaWxkcmVuOiBkb20uY2FuSGF2ZUNoaWxkcmVuLFxuXHRcdGlzSW5saW5lOiBkb20uaXNJbmxpbmUsXG5cdFx0Y29weUNTUzogZG9tLmNvcHlDU1MsXG5cdFx0Zml4TmVzdGluZzogZG9tLmZpeE5lc3RpbmcsXG5cdFx0ZmluZENvbW1vbkFuY2VzdG9yOiBkb20uZmluZENvbW1vbkFuY2VzdG9yLFxuXHRcdGdldFNpYmxpbmc6IGRvbS5nZXRTaWJsaW5nLFxuXHRcdHJlbW92ZVdoaXRlU3BhY2U6IGRvbS5yZW1vdmVXaGl0ZVNwYWNlLFxuXHRcdGV4dHJhY3RDb250ZW50czogZG9tLmV4dHJhY3RDb250ZW50cyxcblx0XHRnZXRPZmZzZXQ6IGRvbS5nZXRPZmZzZXQsXG5cdFx0Z2V0U3R5bGU6IGRvbS5nZXRTdHlsZSxcblx0XHRoYXNTdHlsZTogZG9tLmhhc1N0eWxlXG5cdH0sXG5cblx0dXRpbHM6IHtcblx0XHRlYWNoOiB1dGlscy5lYWNoLFxuXHRcdGlzRW1wdHlPYmplY3Q6IHV0aWxzLmlzRW1wdHlPYmplY3QsXG5cdFx0ZXh0ZW5kOiB1dGlscy5leHRlbmRcblx0fSxcblxuXHRwbHVnaW5zOiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnMsXG5cblx0Y3JlYXRlOiBmdW5jdGlvbiAodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIG9wdGlvbnM6IGFueSkge1xuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0Ly8gRG9uJ3QgYWxsb3cgdGhlIGVkaXRvciB0byBiZSBpbml0aWFsaXNlZFxuXHRcdC8vIG9uIGl0J3Mgb3duIHNvdXJjZSBlZGl0b3Jcblx0XHRpZiAoZG9tLnBhcmVudCh0ZXh0YXJlYSwgJy5lbWxlZGl0b3ItY29udGFpbmVyJykpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5ydW5XaXRob3V0V3lzaXd5Z1N1cHBvcnQgfHwgYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcblx0XHRcdC8qZXNsaW50IG5vLW5ldzogb2ZmKi9cblx0XHRcdChuZXcgRW1sRWRpdG9yKHRleHRhcmVhLCBvcHRpb25zKSk7XG5cdFx0fVxuXHR9LFxuXG5cdGluc3RhbmNlOiBmdW5jdGlvbiAodGV4dGFyZWE6IGFueSkge1xuXHRcdHJldHVybiB0ZXh0YXJlYS5fc2NlZGl0b3I7XG5cdH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=