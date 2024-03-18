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
var PluginManager = /** @class */ (function () {
    function PluginManager(thisObj) {
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
        this.call = function () {
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
                var pluginObj = PluginManager.plugins[plugin];
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
            var pluginObj = new this.plugins[plugin]();
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
    return PluginManager;
}());



/***/ }),

/***/ "./src/lib/EmlEditor.js":
/*!******************************!*\
  !*** ./src/lib/EmlEditor.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EmlEditor)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/lib/dom.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/lib/utils.js");
/* harmony import */ var _defaultOptions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultOptions.js */ "./src/lib/defaultOptions.js");
/* harmony import */ var _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultCommands.js */ "./src/lib/defaultCommands.js");
/* harmony import */ var _pluginManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluginManager */ "./src/lib/pluginManager.ts");
/* harmony import */ var _rangeHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rangeHelper.js */ "./src/lib/rangeHelper.js");
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
		} else {
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
		var init, replaceEmoticons, handleCommand, initEditor, initLocale, initToolBar, initOptions, initEvents, initResize, initEmoticons, handlePasteEvt, handleCutCopyEvt, handlePasteData, handleKeyDown, handleBackSpace, handleKeyPress, handleFormReset, handleMouseDown, handleComposition, handleEvent, handleDocumentClick, updateToolBar, updateActiveButtons, sourceEditorSelectedText, appendNewLine, checkSelectionChanged, checkNodeChanged, autofocus, emoticonsKeyPress, emoticonsCheckWhitespace, currentStyledBlockNode, triggerValueChanged, valueChangedBlur, valueChangedKeyUp, autoUpdate, autoExpand;

		/**
		 * All the commands supported by the editor
		 * @name commands
		 * @memberOf EmlEditor.prototype
		 */
		base.commands = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, (userOptions.commands || _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"]));

		/**
		 * Options for this editor instance
		 * @name opts
		 * @memberOf EmlEditor.prototype
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
			textarea._sceditor = base;

			// Load locale
			if (options.locale && options.locale !== 'en') {
				initLocale();
			}

			editorContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
				className: 'emleditor-container'
			});

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(editorContainer, textarea);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(editorContainer, 'z-index', options.zIndex);

			isRequired = textarea.required;
			textarea.required = false;

			var FormatCtor = EmlEditor.formats[options.format];
			format = FormatCtor ? new FormatCtor() : {};
			/*
			 * Plugins should be initialized before the formatters since
			 * they may wish to add or change formatting handlers and
			 * since the bbcode format caches its handlers,
			 * such changes must be done first.
			 */
			pluginManager = new _pluginManager__WEBPACK_IMPORTED_MODULE_4__.PluginManager(base);
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
		initEditor = function () {
			sourceEditor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('textarea');
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
				options.width || _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(textarea),
				options.height || _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(textarea)
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

			var tabIndex = _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(textarea, 'tabindex');
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(sourceEditor, 'tabindex', tabIndex);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(wysiwygEditor, 'tabindex', tabIndex);

			rangeHelper = new _rangeHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"](wysiwygWindow, null, sanitize);

			// load any textarea value into the editor
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(textarea);
			base.val(textarea.value);

			var placeholder = options.placeholder ||
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
		function initEvents() {
			var form = textarea.form;
			var compositionEvents = 'compositionstart compositionend';
			var eventsToForward = 'keydown keyup keypress focus blur contextmenu input';
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
			var group, commands = base.commands, exclude = (options.toolbarExclude || '').split(','), groups = options.toolbar.split('|');

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
					var button, shortcut, command = commands[commandName];

					// The commandName must be a valid command and not excluded
					if (!command || exclude.indexOf(commandName) > -1) {
						return;
					}

					shortcut = command.shortcut;
					button = (0,_templates_js__WEBPACK_IMPORTED_MODULE_6__["default"])('toolbarButton', {
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
			var minHeight, maxHeight, minWidth, maxWidth, mouseMoveFunc, mouseUpFunc, grip = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
				className: 'emleditor-grip'
			}),
				// Cover is used to cover the editor iframe so document
				// still gets mouse move events
				cover = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
					className: 'emleditor-resize-cover'
				}), moveEvents = 'touchmove mousemove', endEvents = 'touchcancel touchend mouseup', startX = 0, startY = 0, newX = 0, newY = 0, startWidth = 0, startHeight = 0, origWidth = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer), origHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer), isDragging = false, rtl = base.rtl();

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
				} else {
					newX = e.pageX;
					newY = e.pageY;
				}

				var newHeight = startHeight + (newY - startY), newWidth = rtl ?
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
					e = globalWin.event;
					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
				} else {
					startX = e.pageX;
					startY = e.pageY;
				}

				startWidth = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(editorContainer);
				startHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(editorContainer);
				isDragging = true;

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
			var emoticons = options.emoticons;
			var root = options.emoticonsRoot || '';

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
			var range, txtPos, node = wysiwygBody.firstChild;

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
		 * @memberOf EmlEditor.prototype
		 * @name readOnly
		 * @return {boolean}
		 */
		/**
		 * Sets if the editor is read only
		 *
		 * @param {boolean} readOnly
		 * @since 1.3.5
		 * @function
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 * @name rtl
		 * @return {boolean}
		 */
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
		 * @memberOf EmlEditor.prototype
		 * @name width
		 * @return {number}
		 */
		/**
		 * Sets the width of the editor
		 *
		 * @param {number} width Width in pixels
		 * @since 1.3.5
		 * @function
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 * @name dimensions^3
		 * @return {this}
		 */
		base.dimensions = function (width, height, save) {
			// set undefined width/height to boolean false
			width = (!width && width !== 0) ? false : width;
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
		 * @memberOf EmlEditor.prototype
		 * @name height
		 * @return {number}
		 */
		/**
		 * Sets the height of the editor
		 *
		 * @param {number} height Height in px
		 * @since 1.3.5
		 * @function
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 * @name maximize
		 * @return {boolean}
		 */
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
		base.maximize = function (maximize) {
			var maximizeSize = 'emleditor-maximize';

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
		 * @memberOf EmlEditor.prototype
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
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.height(textarea);

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
		 * @memberOf EmlEditor.prototype
		 */
		base.destroy = function () {
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

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, 'click', handleDocumentClick);

			var form = textarea.form;
			if (form) {
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'reset', handleFormReset);
				_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'submit', base.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
			}

			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pagehide', base.updateOriginal);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pageshow', handleFormReset);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(sourceEditor);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(toolbar);
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(editorContainer);

			delete textarea._sceditor;
			_dom_js__WEBPACK_IMPORTED_MODULE_0__.show(textarea);

			textarea.required = isRequired;
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
		base.createDropDown = function (menuItem, name, content) {
			// first click for create second click for close
			var dropDownCss, dropDownClass = 'emleditor-' + name;

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
				className: 'emleditor-dropdown ' + dropDownClass
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 */
		base.wysiwygEditorInsertHtml = function (
			html, endHtml, overrideCodeBlocking
		) {
			var marker, scrollTop, scrollTo, editorHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(wysiwygEditor);

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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 */
		base.sourceEditorInsertText = function (text, endText) {
			var scrollTop, currentValue, startPos = sourceEditor.selectionStart, endPos = sourceEditor.selectionEnd;

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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
				var html = rangeHelper.selectedHtml();

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
		 * @memberOf EmlEditor.prototype
		 */
		base.getWysiwygEditorValue = function (filter) {
			var html;
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 */
		base.updateOriginal = function () {
			textarea.value = base.val();
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 */
		/**
		 * Sets if the editor is in sourceMode
		 *
		 * @param {boolean} enable
		 * @return {this}
		 * @function
		 * @name sourceMode^2
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
		 */
		base.execCommand = function (command, param) {
			var executed = false, commandObj = base.commands[command];

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
			var oldNode, node = rangeHelper.parentNode();

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
		 * @memberOf EmlEditor.prototype
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
			var doc = wysiwygDocument;
			var isSource = base.sourceMode();

			if (base.readOnly()) {
				_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(toolbar, activeClass), function (_, menuItem) {
					_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(menuItem, activeClass);
				});
				return;
			}

			if (!isSource) {
				parent = rangeHelper.parentNode();
				firstBlock = rangeHelper.getFirstBlockParent(parent);
			}

			for (var j = 0; j < btnStateHandlers.length; j++) {
				var state = 0;
				var btn = toolbarButtons[btnStateHandlers[j].name];
				var stateFn = btnStateHandlers[j].state;
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
					var parent = br.parentNode;
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
					if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, '.emleditor-nlf') && _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(node)) {
						var paragraph = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, wysiwygDocument);
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
		handleFormReset = function () {
			base.val(textarea.value);
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
		 * @memberOf EmlEditor.prototype
		 */
		base._ = function () {
			var undef, args = arguments;

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
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 */
		base.bind = function (events, handler, excludeWysiwyg, excludeSource) {
			events = events.split(' ');

			var i = events.length;
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
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.1
		 * @see bind
		 */
		base.unbind = function (events, handler, excludeWysiwyg, excludeSource) {
			events = events.split(' ');

			var i = events.length;
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
		 * @memberOf EmlEditor.prototype
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
			var replacedEmoticon, cachePos = 0, emoticonsCache = base.emoticonsCache, curChar = String.fromCharCode(e.which);

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
		 * @memberOf EmlEditor.prototype
		 * @since 1.4.2
		 */
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
				var emoticons = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(wysiwygBody, 'img[data-emleditor-emoticon]');

				_utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, function (_, img) {
					var text = _dom_js__WEBPACK_IMPORTED_MODULE_0__.data(img, 'emleditor-emoticon');
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
			var shortcut = [], SHIFT_KEYS = {
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
			}, which = e.which, character = SPECIAL_KEYS[which] ||
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
		 * @return {emleditor}
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
		 * @return {emleditor}
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
			var node, offset, range, parent;

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

			var currentHtml, sourceMode = base.sourceMode(), hasSelection = !sourceMode && rangeHelper.hasSelection();

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
			var which = e.which, lastChar = valueChangedKeyUp.lastChar, lastWasSpace = (lastChar === 13 || lastChar === 32), lastWasDelete = (lastChar === 8 || lastChar === 46);

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
}


/**
 * Map containing the loaded EmlEditor locales
 * @type {Object}
 * @name locale
 * @memberOf emleditor
 */
EmlEditor.locale = {};

EmlEditor.formats = {};
EmlEditor.icons = {};


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

/***/ "./src/lib/rangeHelper.js":
/*!********************************!*\
  !*** ./src/lib/rangeHelper.js ***!
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
class RangeHelper {
	constructor(win, d, sanitize) {
		var _createMarker, _prepareInput, doc = d || win.contentDocument || win.document, startMarker = 'emleditor-start-marker', endMarker = 'emleditor-end-marker';

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
			var lastChild, frag = doc.createDocumentFragment();

			if (typeof node === 'string') {
				if (endNode) {
					node += this.selectedHtml() + endNode;
				}

				frag = _dom_js__WEBPACK_IMPORTED_MODULE_0__.parseHTML(node);
			} else {
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
			} else {
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
			var first, last, input = _prepareInput(node, endNode), range = this.selectedRange(), parent = range.commonAncestorContainer, emptyNodes = [];

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
		 * Creates a marker node
		 *
		 * @param {string} id
		 * @return {HTMLSpanElement}
		 * @private
		 */
		_createMarker = function (id) {
			this.removeMarker(id);

			var marker = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('span', {
				id: id,
				className: 'emleditor-selection emleditor-ignore',
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
		this.removeMarkers = function () {
			this.removeMarker(startMarker);
			this.removeMarker(endMarker);
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
			var start, end, range = this.cloneSelected();

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
				} else if (sel.empty) {
					sel.empty();
				}
			}
		};
	}
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
/* harmony import */ var _lib_pluginManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/pluginManager */ "./src/lib/pluginManager.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsU0FBUztBQUN0QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrQ0FBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsU0FBUztBQUN0QixhQUFhLFNBQVM7QUFDdEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsU0FBUztBQUN0QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsVUFBVTtBQUN4QixjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxVQUFVO0FBQ3hCLGNBQWMsU0FBUztBQUN2QjtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsVUFBVTtBQUN4QixjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxVQUFVO0FBQ3hCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxVQUFVO0FBQ3hCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsVUFBVTtBQUN4QixjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjLFNBQVM7QUFDdkI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw0Q0FBVztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDJDQUFVO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUcsMERBQXlCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFDdEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1Q0FBTTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxvQkFBb0IseUNBQVE7QUFDNUI7QUFDQSxJQUFJLDJDQUFVO0FBQ2QsZ0JBQWdCLHlDQUFRO0FBQ3hCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLHdDQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isa0RBQWlCO0FBQ2pDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSSxnREFBZTtBQUNuQjtBQUNBO0FBQ0EsUUFBUSwrQ0FBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxXQUFXO0FBQ1gsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTywrQ0FBYztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVDQUFNO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDhDQUFhO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLCtDQUFjLFdBQVcsNkNBQVk7QUFDaEQsdUNBQXVDLHVDQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsYUFBYTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHVDQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyx5Q0FBUTtBQUNYO0FBQ0EsUUFBUSx1Q0FBTTtBQUNkLElBQUksbURBQWtCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDRDQUFXO0FBQ2Y7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTLDJEQUFlO0FBQ3hCLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyw0QkFBNEI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFFBQVE7QUFDcEIsWUFBWSxRQUFRO0FBQ3BCLGFBQWEsWUFBWTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2Q0FBWSxDQUFDLDJEQUFlLFlBQVk7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkRBQWU7QUFDakI7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMkRBQWU7QUFDckIsVUFBVSwyREFBZTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQy84R0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ087QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRkQ7QUFDZ0M7QUFDSTtBQUNFO0FBQ0g7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsd0NBQU87QUFDNUIsS0FBSywyQ0FBVTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQix3Q0FBTztBQUN2QixnQkFBZ0Isd0NBQU87O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQix3Q0FBTztBQUN2QixnQkFBZ0Isd0NBQU87O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0RBQWlCOztBQUVsQyxHQUFHLHVDQUFNO0FBQ1QsYUFBYSx5Q0FBUTtBQUNyQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLElBQUksZ0RBQWUsVUFBVSx5REFBSztBQUNsQztBQUNBLEtBQUs7QUFDTCxJQUFJOztBQUVKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0RBQWlCOztBQUVsQyxHQUFHLHVDQUFNO0FBQ1QsYUFBYSx5Q0FBUTtBQUNyQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSixtQkFBbUIsUUFBUTtBQUMzQixJQUFJLGdEQUFlLFVBQVUseURBQUs7QUFDbEM7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrREFBaUI7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUEsR0FBRyxnREFBZSxVQUFVLDhDQUFhOztBQUV6QyxHQUFHLHVDQUFNO0FBQ1QsYUFBYSx5Q0FBUTtBQUNyQjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGtEQUFpQjtBQUMvQjs7QUFFQSxHQUFHLGdEQUFlLFVBQVUseURBQUs7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKLEdBQUcsdUNBQU07QUFDVCxVQUFVLHlDQUFROztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyx1Q0FBTTtBQUNiO0FBQ0E7O0FBRUEsT0FBTyx1Q0FBTTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHVDQUFNO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyw0Q0FBVztBQUNsQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSw0Q0FBVztBQUNyQixHQUFHO0FBQ0g7QUFDQTtBQUNBLE9BQU8sNENBQVc7QUFDbEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsa0RBQWlCOztBQUUvQixHQUFHLGdEQUFlLFVBQVUseURBQUs7QUFDakM7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSixHQUFHLHVDQUFNO0FBQ1Qsc0JBQXNCLHlDQUFRO0FBQzlCLG1CQUFtQix5Q0FBUTtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0RBQWlCOztBQUVsQyxHQUFHLGdEQUFlLFVBQVUseURBQUs7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOzs7QUFHSixrQkFBa0IseUNBQVE7O0FBRTFCOztBQUVBLEdBQUcsdUNBQU07QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFNLHlDQUFRO0FBQ2QsTUFBTSx5Q0FBUTtBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUIsZ0RBQWU7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtEQUFpQjs7QUFFbEMsR0FBRyxnREFBZSxVQUFVLHlEQUFLO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUosR0FBRyx1Q0FBTTtBQUNULGdCQUFnQix5Q0FBUTs7QUFFeEI7QUFDQSxlQUFlLHlDQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0RBQWU7QUFDbEMsUUFBUSxnREFBZTtBQUN2QjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrREFBaUI7O0FBRWxDLEdBQUcsZ0RBQWUsVUFBVSx5REFBSztBQUNqQztBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKLG1CQUFtQix5Q0FBUTs7QUFFM0I7QUFDQTtBQUNBLHlCQUF5Qix5Q0FBUTtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyx1Q0FBTTtBQUNULEdBQUcsdUNBQU07QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksRUFBRSxrREFBaUI7O0FBRXZCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdEQUFlO0FBQ25DLE9BQU8sZ0RBQWU7QUFDdEI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDRDQUFXO0FBQ3JCLEdBQUc7QUFDSDtBQUNBLGdCQUFnQiw0Q0FBVzs7QUFFM0I7QUFDQTtBQUNBLEtBQUssaURBQWdCO0FBQ3JCOztBQUVBLElBQUksMkNBQVU7QUFDZDtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssZ0RBQWU7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrREFBaUI7QUFDeEMsdUJBQXVCLGtEQUFpQjtBQUN4QztBQUNBLHVCQUF1Qiw2Q0FBWTtBQUNuQyxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBLElBQUksZ0RBQWU7O0FBRW5COztBQUVBLElBQUksdUNBQU07QUFDVixnQ0FBZ0MseUNBQVE7QUFDeEM7O0FBRUE7QUFDQSxLQUFLOztBQUVMLElBQUksMkNBQVU7QUFDZCxLQUFLLGdEQUFlLE9BQU8sa0RBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQSxhQUFhLGtEQUFpQjtBQUM5QixNQUFNLGdEQUFlO0FBQ3JCO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLGdCQUFnQixrREFBaUI7QUFDakM7QUFDQSxNQUFNOztBQUVOLEtBQUssZ0RBQWU7QUFDcEI7O0FBRUEsS0FBSyx1Q0FBTTtBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07O0FBRU4sS0FBSyxnREFBZTtBQUNwQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtEQUFpQjs7QUFFbEMsR0FBRyxnREFBZSxVQUFVLHlEQUFLO0FBQ2pDO0FBQ0E7QUFDQSxJQUFJOztBQUVKLEdBQUcsdUNBQU07QUFDVCxjQUFjLHlDQUFRO0FBQ3RCLDBFQUEwRSxHQUFHO0FBQzdFLDREQUE0RCxJQUFJO0FBQ2hFOztBQUVBO0FBQ0EsS0FBSywyQ0FBVTtBQUNmO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQSxtQ0FBbUMsR0FBRztBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMseURBQUs7QUFDeEM7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQix1Q0FBTTtBQUN0Qjs7QUFFQTs7QUFFQSxpQkFBaUIsdUNBQU07QUFDdkI7QUFDQTtBQUNBOztBQUVBLHFCQUFxQix3Q0FBTztBQUM1QixHQUFHLHdDQUFPO0FBQ1YsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQix1Q0FBTTtBQUN0Qjs7QUFFQTs7QUFFQSxpQkFBaUIsdUNBQU07QUFDdkI7QUFDQTtBQUNBOztBQUVBLHFCQUFxQix3Q0FBTztBQUM1QixHQUFHLHdDQUFPO0FBQ1YsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ244Qks7O0FBRWhDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUyw2Q0FBSTs7QUFFYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxtQkFBbUI7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL1lNO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RUQsUUFBUSxFQUFFLFVBQVUsUUFBYTtRQUNoQyxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7SUFDM0IsQ0FBQztDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9ub2RlX21vZHVsZXMvZG9tcHVyaWZ5L2Rpc3QvcHVyaWZ5LmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy90aGVtZXMvc3F1YXJlLmxlc3M/ZGRjNiIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3BsdWdpbk1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9FbWxFZGl0b3IuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdENvbW1hbmRzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kb20uanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lbW90aWNvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9yYW5nZUhlbHBlci5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3RlbXBsYXRlcy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBsaWNlbnNlIERPTVB1cmlmeSAzLjAuOSB8IChjKSBDdXJlNTMgYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyB8IFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgbGljZW5zZSAyLjAgYW5kIE1vemlsbGEgUHVibGljIExpY2Vuc2UgMi4wIHwgZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2Jsb2IvMy4wLjkvTElDRU5TRSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGNvbnN0IHtcbiAgICBlbnRyaWVzLFxuICAgIHNldFByb3RvdHlwZU9mLFxuICAgIGlzRnJvemVuLFxuICAgIGdldFByb3RvdHlwZU9mLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvclxuICB9ID0gT2JqZWN0O1xuICBsZXQge1xuICAgIGZyZWV6ZSxcbiAgICBzZWFsLFxuICAgIGNyZWF0ZVxuICB9ID0gT2JqZWN0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbiAgbGV0IHtcbiAgICBhcHBseSxcbiAgICBjb25zdHJ1Y3RcbiAgfSA9IHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBSZWZsZWN0O1xuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghc2VhbCkge1xuICAgIHNlYWwgPSBmdW5jdGlvbiBzZWFsKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFhcHBseSkge1xuICAgIGFwcGx5ID0gZnVuY3Rpb24gYXBwbHkoZnVuLCB0aGlzVmFsdWUsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmdW4uYXBwbHkodGhpc1ZhbHVlLCBhcmdzKTtcbiAgICB9O1xuICB9XG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgRnVuYyguLi5hcmdzKTtcbiAgICB9O1xuICB9XG4gIGNvbnN0IGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuICBjb25zdCBhcnJheVBvcCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnBvcCk7XG4gIGNvbnN0IGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICBjb25zdCBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIGNvbnN0IHN0cmluZ1RvU3RyaW5nID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nKTtcbiAgY29uc3Qgc3RyaW5nTWF0Y2ggPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUubWF0Y2gpO1xuICBjb25zdCBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICBjb25zdCBzdHJpbmdJbmRleE9mID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLmluZGV4T2YpO1xuICBjb25zdCBzdHJpbmdUcmltID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRyaW0pO1xuICBjb25zdCBvYmplY3RIYXNPd25Qcm9wZXJ0eSA9IHVuYXBwbHkoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gIGNvbnN0IHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG4gIGNvbnN0IHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCB0aGlzQXJnIGFuZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uc3RydWN0KGZ1bmMsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIHByb3BlcnRpZXMgdG8gYSBsb29rdXAgdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldCAtIFRoZSBzZXQgdG8gd2hpY2ggZWxlbWVudHMgd2lsbCBiZSBhZGRlZC5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgY29udGFpbmluZyBlbGVtZW50cyB0byBiZSBhZGRlZCB0byB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm1DYXNlRnVuYyAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgY2FzZSBvZiBlYWNoIGVsZW1lbnQgYmVmb3JlIGFkZGluZyB0byB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgbW9kaWZpZWQgc2V0IHdpdGggYWRkZWQgZWxlbWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRUb1NldChzZXQsIGFycmF5KSB7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBzdHJpbmdUb0xvd2VyQ2FzZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG4gICAgbGV0IGwgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgbGV0IGVsZW1lbnQgPSBhcnJheVtsXTtcbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgbGNFbGVtZW50ID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSBsY0VsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFtlbGVtZW50XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW4gdXAgYW4gYXJyYXkgdG8gaGFyZGVuIGFnYWluc3QgQ1NQUFxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBiZSBjbGVhbmVkLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBjbGVhbmVkIHZlcnNpb24gb2YgdGhlIGFycmF5XG4gICAqL1xuICBmdW5jdGlvbiBjbGVhbkFycmF5KGFycmF5KSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkoYXJyYXksIGluZGV4KTtcbiAgICAgIGlmICghaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGFycmF5W2luZGV4XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBjbG9uZWQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgbmV3IG9iamVjdCB0aGF0IGNvcGllcyB0aGUgb3JpZ2luYWwuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSBjcmVhdGUobnVsbCk7XG4gICAgZm9yIChjb25zdCBbcHJvcGVydHksIHZhbHVlXSBvZiBlbnRyaWVzKG9iamVjdCkpIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgaWYgKGlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xlYW5BcnJheSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsb25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhdXRvbWF0aWNhbGx5IGNoZWNrcyBpZiB0aGUgcHJvcCBpcyBmdW5jdGlvbiBvciBnZXR0ZXIgYW5kIGJlaGF2ZXMgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGxvb2sgdXAgdGhlIGdldHRlciBmdW5jdGlvbiBpbiBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCAtIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB3aGljaCB0byBmaW5kIHRoZSBnZXR0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGdldHRlciBmdW5jdGlvbiBmb3VuZCBpbiB0aGUgcHJvdG90eXBlIGNoYWluIG9yIGEgZmFsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBsb29rdXBHZXR0ZXIob2JqZWN0LCBwcm9wKSB7XG4gICAgd2hpbGUgKG9iamVjdCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3ApO1xuICAgICAgaWYgKGRlc2MpIHtcbiAgICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy5nZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmYWxsYmFja1ZhbHVlO1xuICB9XG5cbiAgY29uc3QgaHRtbCQxID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpYWxvZycsICdkaXInLCAnZGl2JywgJ2RsJywgJ2R0JywgJ2VsZW1lbnQnLCAnZW0nLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9udCcsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2ltZycsICdpbnB1dCcsICdpbnMnLCAna2JkJywgJ2xhYmVsJywgJ2xlZ2VuZCcsICdsaScsICdtYWluJywgJ21hcCcsICdtYXJrJywgJ21hcnF1ZWUnLCAnbWVudScsICdtZW51aXRlbScsICdtZXRlcicsICduYXYnLCAnbm9icicsICdvbCcsICdvcHRncm91cCcsICdvcHRpb24nLCAnb3V0cHV0JywgJ3AnLCAncGljdHVyZScsICdwcmUnLCAncHJvZ3Jlc3MnLCAncScsICdycCcsICdydCcsICdydWJ5JywgJ3MnLCAnc2FtcCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzaGFkb3cnLCAnc21hbGwnLCAnc291cmNlJywgJ3NwYWNlcicsICdzcGFuJywgJ3N0cmlrZScsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RlbXBsYXRlJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndHInLCAndHJhY2snLCAndHQnLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJ10pO1xuXG4gIC8vIFNWR1xuICBjb25zdCBzdmckMSA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwcGF0aCcsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmaWx0ZXInLCAnZm9udCcsICdnJywgJ2dseXBoJywgJ2dseXBocmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsZ3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N0eWxlJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0cGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJywgJ3ZpZXcnLCAndmtlcm4nXSk7XG4gIGNvbnN0IHN2Z0ZpbHRlcnMgPSBmcmVlemUoWydmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLCAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJywgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRHJvcFNoYWRvdycsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnXSk7XG5cbiAgLy8gTGlzdCBvZiBTVkcgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWxsb3dlZCBieSBkZWZhdWx0LlxuICAvLyBXZSBzdGlsbCBuZWVkIHRvIGtub3cgdGhlbSBzbyB0aGF0IHdlIGNhbiBkbyBuYW1lc3BhY2VcbiAgLy8gY2hlY2tzIHByb3Blcmx5IGluIGNhc2Ugb25lIHdhbnRzIHRvIGFkZCB0aGVtIHRvXG4gIC8vIGFsbG93LWxpc3QuXG4gIGNvbnN0IHN2Z0Rpc2FsbG93ZWQgPSBmcmVlemUoWydhbmltYXRlJywgJ2NvbG9yLXByb2ZpbGUnLCAnY3Vyc29yJywgJ2Rpc2NhcmQnLCAnZm9udC1mYWNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGF0Y2gnLCAnaGF0Y2hwYXRoJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21pc3NpbmctZ2x5cGgnLCAnc2NyaXB0JywgJ3NldCcsICdzb2xpZGNvbG9yJywgJ3Vua25vd24nLCAndXNlJ10pO1xuICBjb25zdCBtYXRoTWwkMSA9IGZyZWV6ZShbJ21hdGgnLCAnbWVuY2xvc2UnLCAnbWVycm9yJywgJ21mZW5jZWQnLCAnbWZyYWMnLCAnbWdseXBoJywgJ21pJywgJ21sYWJlbGVkdHInLCAnbW11bHRpc2NyaXB0cycsICdtbicsICdtbycsICdtb3ZlcicsICdtcGFkZGVkJywgJ21waGFudG9tJywgJ21yb290JywgJ21yb3cnLCAnbXMnLCAnbXNwYWNlJywgJ21zcXJ0JywgJ21zdHlsZScsICdtc3ViJywgJ21zdXAnLCAnbXN1YnN1cCcsICdtdGFibGUnLCAnbXRkJywgJ210ZXh0JywgJ210cicsICdtdW5kZXInLCAnbXVuZGVyb3ZlcicsICdtcHJlc2NyaXB0cyddKTtcblxuICAvLyBTaW1pbGFybHkgdG8gU1ZHLCB3ZSB3YW50IHRvIGtub3cgYWxsIE1hdGhNTCBlbGVtZW50cyxcbiAgLy8gZXZlbiB0aG9zZSB0aGF0IHdlIGRpc2FsbG93IGJ5IGRlZmF1bHQuXG4gIGNvbnN0IG1hdGhNbERpc2FsbG93ZWQgPSBmcmVlemUoWydtYWN0aW9uJywgJ21hbGlnbmdyb3VwJywgJ21hbGlnbm1hcmsnLCAnbWxvbmdkaXYnLCAnbXNjYXJyaWVzJywgJ21zY2FycnknLCAnbXNncm91cCcsICdtc3RhY2snLCAnbXNsaW5lJywgJ21zcm93JywgJ3NlbWFudGljcycsICdhbm5vdGF0aW9uJywgJ2Fubm90YXRpb24teG1sJywgJ21wcmVzY3JpcHRzJywgJ25vbmUnXSk7XG4gIGNvbnN0IHRleHQgPSBmcmVlemUoWycjdGV4dCddKTtcblxuICBjb25zdCBodG1sID0gZnJlZXplKFsnYWNjZXB0JywgJ2FjdGlvbicsICdhbGlnbicsICdhbHQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9waWN0dXJlaW5waWN0dXJlJywgJ2F1dG9wbGF5JywgJ2JhY2tncm91bmQnLCAnYmdjb2xvcicsICdib3JkZXInLCAnY2FwdHVyZScsICdjZWxscGFkZGluZycsICdjZWxsc3BhY2luZycsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3MnLCAnY2xlYXInLCAnY29sb3InLCAnY29scycsICdjb2xzcGFuJywgJ2NvbnRyb2xzJywgJ2NvbnRyb2xzbGlzdCcsICdjb29yZHMnLCAnY3Jvc3NvcmlnaW4nLCAnZGF0ZXRpbWUnLCAnZGVjb2RpbmcnLCAnZGVmYXVsdCcsICdkaXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZXBpY3R1cmVpbnBpY3R1cmUnLCAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsICdlbmN0eXBlJywgJ2VudGVya2V5aGludCcsICdmYWNlJywgJ2ZvcicsICdoZWFkZXJzJywgJ2hlaWdodCcsICdoaWRkZW4nLCAnaGlnaCcsICdocmVmJywgJ2hyZWZsYW5nJywgJ2lkJywgJ2lucHV0bW9kZScsICdpbnRlZ3JpdHknLCAnaXNtYXAnLCAna2luZCcsICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9hZGluZycsICdsb29wJywgJ2xvdycsICdtYXgnLCAnbWF4bGVuZ3RoJywgJ21lZGlhJywgJ21ldGhvZCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ211bHRpcGxlJywgJ211dGVkJywgJ25hbWUnLCAnbm9uY2UnLCAnbm9zaGFkZScsICdub3ZhbGlkYXRlJywgJ25vd3JhcCcsICdvcGVuJywgJ29wdGltdW0nLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcmNsYW5nJywgJ3N0YXJ0JywgJ3NyYycsICdzcmNzZXQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmluZGV4JywgJ3RpdGxlJywgJ3RyYW5zbGF0ZScsICd0eXBlJywgJ3VzZW1hcCcsICd2YWxpZ24nLCAndmFsdWUnLCAnd2lkdGgnLCAneG1sbnMnLCAnc2xvdCddKTtcbiAgY29uc3Qgc3ZnID0gZnJlZXplKFsnYWNjZW50LWhlaWdodCcsICdhY2N1bXVsYXRlJywgJ2FkZGl0aXZlJywgJ2FsaWdubWVudC1iYXNlbGluZScsICdhc2NlbnQnLCAnYXR0cmlidXRlbmFtZScsICdhdHRyaWJ1dGV0eXBlJywgJ2F6aW11dGgnLCAnYmFzZWZyZXF1ZW5jeScsICdiYXNlbGluZS1zaGlmdCcsICdiZWdpbicsICdiaWFzJywgJ2J5JywgJ2NsYXNzJywgJ2NsaXAnLCAnY2xpcHBhdGh1bml0cycsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NvbG9yJywgJ2NvbG9yLWludGVycG9sYXRpb24nLCAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJywgJ2NvbG9yLXByb2ZpbGUnLCAnY29sb3ItcmVuZGVyaW5nJywgJ2N4JywgJ2N5JywgJ2QnLCAnZHgnLCAnZHknLCAnZGlmZnVzZWNvbnN0YW50JywgJ2RpcmVjdGlvbicsICdkaXNwbGF5JywgJ2Rpdmlzb3InLCAnZHVyJywgJ2VkZ2Vtb2RlJywgJ2VsZXZhdGlvbicsICdlbmQnLCAnZmlsbCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2ZpbHRlcicsICdmaWx0ZXJ1bml0cycsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvbnQtZmFtaWx5JywgJ2ZvbnQtc2l6ZScsICdmb250LXNpemUtYWRqdXN0JywgJ2ZvbnQtc3RyZXRjaCcsICdmb250LXN0eWxlJywgJ2ZvbnQtdmFyaWFudCcsICdmb250LXdlaWdodCcsICdmeCcsICdmeScsICdnMScsICdnMicsICdnbHlwaC1uYW1lJywgJ2dseXBocmVmJywgJ2dyYWRpZW50dW5pdHMnLCAnZ3JhZGllbnR0cmFuc2Zvcm0nLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2luJywgJ2luMicsICdrJywgJ2sxJywgJ2syJywgJ2szJywgJ2s0JywgJ2tlcm5pbmcnLCAna2V5cG9pbnRzJywgJ2tleXNwbGluZXMnLCAna2V5dGltZXMnLCAnbGFuZycsICdsZW5ndGhhZGp1c3QnLCAnbGV0dGVyLXNwYWNpbmcnLCAna2VybmVsbWF0cml4JywgJ2tlcm5lbHVuaXRsZW5ndGgnLCAnbGlnaHRpbmctY29sb3InLCAnbG9jYWwnLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdtYXJrZXJoZWlnaHQnLCAnbWFya2VydW5pdHMnLCAnbWFya2Vyd2lkdGgnLCAnbWFza2NvbnRlbnR1bml0cycsICdtYXNrdW5pdHMnLCAnbWF4JywgJ21hc2snLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21vZGUnLCAnbWluJywgJ25hbWUnLCAnbnVtb2N0YXZlcycsICdvZmZzZXQnLCAnb3BlcmF0b3InLCAnb3BhY2l0eScsICdvcmRlcicsICdvcmllbnQnLCAnb3JpZW50YXRpb24nLCAnb3JpZ2luJywgJ292ZXJmbG93JywgJ3BhaW50LW9yZGVyJywgJ3BhdGgnLCAncGF0aGxlbmd0aCcsICdwYXR0ZXJuY29udGVudHVuaXRzJywgJ3BhdHRlcm50cmFuc2Zvcm0nLCAncGF0dGVybnVuaXRzJywgJ3BvaW50cycsICdwcmVzZXJ2ZWFscGhhJywgJ3ByZXNlcnZlYXNwZWN0cmF0aW8nLCAncHJpbWl0aXZldW5pdHMnLCAncicsICdyeCcsICdyeScsICdyYWRpdXMnLCAncmVmeCcsICdyZWZ5JywgJ3JlcGVhdGNvdW50JywgJ3JlcGVhdGR1cicsICdyZXN0YXJ0JywgJ3Jlc3VsdCcsICdyb3RhdGUnLCAnc2NhbGUnLCAnc2VlZCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3BlY3VsYXJjb25zdGFudCcsICdzcGVjdWxhcmV4cG9uZW50JywgJ3NwcmVhZG1ldGhvZCcsICdzdGFydG9mZnNldCcsICdzdGRkZXZpYXRpb24nLCAnc3RpdGNodGlsZXMnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlJywgJ3N0cm9rZS13aWR0aCcsICdzdHlsZScsICdzdXJmYWNlc2NhbGUnLCAnc3lzdGVtbGFuZ3VhZ2UnLCAndGFiaW5kZXgnLCAndGFyZ2V0eCcsICd0YXJnZXR5JywgJ3RyYW5zZm9ybScsICd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RleHQtYW5jaG9yJywgJ3RleHQtZGVjb3JhdGlvbicsICd0ZXh0LXJlbmRlcmluZycsICd0ZXh0bGVuZ3RoJywgJ3R5cGUnLCAndTEnLCAndTInLCAndW5pY29kZScsICd2YWx1ZXMnLCAndmlld2JveCcsICd2aXNpYmlsaXR5JywgJ3ZlcnNpb24nLCAndmVydC1hZHYteScsICd2ZXJ0LW9yaWdpbi14JywgJ3ZlcnQtb3JpZ2luLXknLCAnd2lkdGgnLCAnd29yZC1zcGFjaW5nJywgJ3dyYXAnLCAnd3JpdGluZy1tb2RlJywgJ3hjaGFubmVsc2VsZWN0b3InLCAneWNoYW5uZWxzZWxlY3RvcicsICd4JywgJ3gxJywgJ3gyJywgJ3htbG5zJywgJ3knLCAneTEnLCAneTInLCAneicsICd6b29tYW5kcGFuJ10pO1xuICBjb25zdCBtYXRoTWwgPSBmcmVlemUoWydhY2NlbnQnLCAnYWNjZW50dW5kZXInLCAnYWxpZ24nLCAnYmV2ZWxsZWQnLCAnY2xvc2UnLCAnY29sdW1uc2FsaWduJywgJ2NvbHVtbmxpbmVzJywgJ2NvbHVtbnNwYW4nLCAnZGVub21hbGlnbicsICdkZXB0aCcsICdkaXInLCAnZGlzcGxheScsICdkaXNwbGF5c3R5bGUnLCAnZW5jb2RpbmcnLCAnZmVuY2UnLCAnZnJhbWUnLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnbGFyZ2VvcCcsICdsZW5ndGgnLCAnbGluZXRoaWNrbmVzcycsICdsc3BhY2UnLCAnbHF1b3RlJywgJ21hdGhiYWNrZ3JvdW5kJywgJ21hdGhjb2xvcicsICdtYXRoc2l6ZScsICdtYXRodmFyaWFudCcsICdtYXhzaXplJywgJ21pbnNpemUnLCAnbW92YWJsZWxpbWl0cycsICdub3RhdGlvbicsICdudW1hbGlnbicsICdvcGVuJywgJ3Jvd2FsaWduJywgJ3Jvd2xpbmVzJywgJ3Jvd3NwYWNpbmcnLCAncm93c3BhbicsICdyc3BhY2UnLCAncnF1b3RlJywgJ3NjcmlwdGxldmVsJywgJ3NjcmlwdG1pbnNpemUnLCAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLCAnc2VsZWN0aW9uJywgJ3NlcGFyYXRvcicsICdzZXBhcmF0b3JzJywgJ3N0cmV0Y2h5JywgJ3N1YnNjcmlwdHNoaWZ0JywgJ3N1cHNjcmlwdHNoaWZ0JywgJ3N5bW1ldHJpYycsICd2b2Zmc2V0JywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuICBjb25zdCB4bWwgPSBmcmVlemUoWyd4bGluazpocmVmJywgJ3htbDppZCcsICd4bGluazp0aXRsZScsICd4bWw6c3BhY2UnLCAneG1sbnM6eGxpbmsnXSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG4gIGNvbnN0IE1VU1RBQ0hFX0VYUFIgPSBzZWFsKC9cXHtcXHtbXFx3XFxXXSp8W1xcd1xcV10qXFx9XFx9L2dtKTsgLy8gU3BlY2lmeSB0ZW1wbGF0ZSBkZXRlY3Rpb24gcmVnZXggZm9yIFNBRkVfRk9SX1RFTVBMQVRFUyBtb2RlXG4gIGNvbnN0IEVSQl9FWFBSID0gc2VhbCgvPCVbXFx3XFxXXSp8W1xcd1xcV10qJT4vZ20pO1xuICBjb25zdCBUTVBMSVRfRVhQUiA9IHNlYWwoL1xcJHtbXFx3XFxXXSp9L2dtKTtcbiAgY29uc3QgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IElTX0FMTE9XRURfVVJJID0gc2VhbCgvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHApOnxbXmEtel18W2EteisuXFwtXSsoPzpbXmEteisuXFwtOl18JCkpL2kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICApO1xuXG4gIGNvbnN0IElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICBjb25zdCBBVFRSX1dISVRFU1BBQ0UgPSBzZWFsKC9bXFx1MDAwMC1cXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMC1cXHUyMDI5XFx1MjA1RlxcdTMwMDBdL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICk7XG5cbiAgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuXG4gIHZhciBFWFBSRVNTSU9OUyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgTVVTVEFDSEVfRVhQUjogTVVTVEFDSEVfRVhQUixcbiAgICBFUkJfRVhQUjogRVJCX0VYUFIsXG4gICAgVE1QTElUX0VYUFI6IFRNUExJVF9FWFBSLFxuICAgIERBVEFfQVRUUjogREFUQV9BVFRSLFxuICAgIEFSSUFfQVRUUjogQVJJQV9BVFRSLFxuICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSxcbiAgICBJU19TQ1JJUFRfT1JfREFUQTogSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgQVRUUl9XSElURVNQQUNFOiBBVFRSX1dISVRFU1BBQ0UsXG4gICAgRE9DVFlQRV9OQU1FOiBET0NUWVBFX05BTUVcbiAgfSk7XG5cbiAgY29uc3QgZ2V0R2xvYmFsID0gZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3c7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBEb24ndCBleHBvcnQgdGhpcyBmdW5jdGlvbiBvdXRzaWRlIHRoaXMgbW9kdWxlIVxuICAgKiBAcGFyYW0ge1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gcHVyaWZ5SG9zdEVsZW1lbnQgVGhlIFNjcmlwdCBlbGVtZW50IHVzZWQgdG8gbG9hZCBET01QdXJpZnkgKHRvIGRldGVybWluZSBwb2xpY3kgbmFtZSBzdWZmaXgpLlxuICAgKiBAcmV0dXJuIHtUcnVzdGVkVHlwZVBvbGljeX0gVGhlIHBvbGljeSBjcmVhdGVkIChvciBudWxsLCBpZiBUcnVzdGVkIFR5cGVzXG4gICAqIGFyZSBub3Qgc3VwcG9ydGVkIG9yIGNyZWF0aW5nIHRoZSBwb2xpY3kgZmFpbGVkKS5cbiAgICovXG4gIGNvbnN0IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgcHVyaWZ5SG9zdEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIHRydXN0ZWRUeXBlcyAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxuICAgIC8vIGJ5IGFkZGluZyBhIGRhdGEtdHQtcG9saWN5LXN1ZmZpeCB0byB0aGUgc2NyaXB0IGVsZW1lbnQgd2l0aCB0aGUgRE9NUHVyaWZ5LlxuICAgIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cbiAgICBsZXQgc3VmZml4ID0gbnVsbDtcbiAgICBjb25zdCBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAocHVyaWZ5SG9zdEVsZW1lbnQgJiYgcHVyaWZ5SG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICAgIHN1ZmZpeCA9IHB1cmlmeUhvc3RFbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cbiAgICBjb25zdCBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICAgIGNyZWF0ZUhUTUwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTY3JpcHRVUkwoc2NyaXB0VXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHNjcmlwdFVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xuICAgICAgLy8gYWxyZWFkeSBydW4pLiBTa2lwIGNyZWF0aW5nIHRoZSBwb2xpY3ksIGFzIHRoaXMgd2lsbCBvbmx5IGNhdXNlIGVycm9yc1xuICAgICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIGxldCB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuICAgIGNvbnN0IERPTVB1cmlmeSA9IHJvb3QgPT4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuXG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBsYWJlbCwgZXhwb3NlZCBmb3IgZWFzaWVyIGNoZWNrc1xuICAgICAqIGlmIERPTVB1cmlmeSBpcyB1cCB0byBkYXRlIG9yIG5vdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS52ZXJzaW9uID0gJzMuMC45JztcblxuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGVsZW1lbnRzIHRoYXQgRE9NUHVyaWZ5IHJlbW92ZWQgZHVyaW5nIHNhbml0YXRpb24uXG4gICAgICogRW1wdHkgaWYgbm90aGluZyB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuICAgIGlmICghd2luZG93IHx8ICF3aW5kb3cuZG9jdW1lbnQgfHwgd2luZG93LmRvY3VtZW50Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgICAvLyBOb3QgcnVubmluZyBpbiBhIGJyb3dzZXIsIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IHlvdSBjYW4gcGFzcyB5b3VyIG93biBXaW5kb3dcbiAgICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG4gICAgbGV0IHtcbiAgICAgIGRvY3VtZW50XG4gICAgfSA9IHdpbmRvdztcbiAgICBjb25zdCBvcmlnaW5hbERvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgY3VycmVudFNjcmlwdCA9IG9yaWdpbmFsRG9jdW1lbnQuY3VycmVudFNjcmlwdDtcbiAgICBjb25zdCB7XG4gICAgICBEb2N1bWVudEZyYWdtZW50LFxuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICAgIE5vZGUsXG4gICAgICBFbGVtZW50LFxuICAgICAgTm9kZUZpbHRlcixcbiAgICAgIE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAgfHwgd2luZG93Lk1vek5hbWVkQXR0ck1hcCxcbiAgICAgIEhUTUxGb3JtRWxlbWVudCxcbiAgICAgIERPTVBhcnNlcixcbiAgICAgIHRydXN0ZWRUeXBlc1xuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IEVsZW1lbnQucHJvdG90eXBlO1xuICAgIGNvbnN0IGNsb25lTm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2xvbmVOb2RlJyk7XG4gICAgY29uc3QgZ2V0TmV4dFNpYmxpbmcgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ25leHRTaWJsaW5nJyk7XG4gICAgY29uc3QgZ2V0Q2hpbGROb2RlcyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGROb2RlcycpO1xuICAgIGNvbnN0IGdldFBhcmVudE5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ3BhcmVudE5vZGUnKTtcblxuICAgIC8vIEFzIHBlciBpc3N1ZSAjNDcsIHRoZSB3ZWItY29tcG9uZW50cyByZWdpc3RyeSBpcyBpbmhlcml0ZWQgYnkgYVxuICAgIC8vIG5ldyBkb2N1bWVudCBjcmVhdGVkIHZpYSBjcmVhdGVIVE1MRG9jdW1lbnQuIEFzIHBlciB0aGUgc3BlY1xuICAgIC8vIChodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjcmVhdGluZy1hbmQtcGFzc2luZy1yZWdpc3RyaWVzKVxuICAgIC8vIGEgbmV3IGVtcHR5IHJlZ2lzdHJ5IGlzIHVzZWQgd2hlbiBjcmVhdGluZyBhIHRlbXBsYXRlIGNvbnRlbnRzIG93bmVyXG4gICAgLy8gZG9jdW1lbnQsIHNvIHdlIHVzZSB0aGF0IGFzIG91ciBwYXJlbnQgZG9jdW1lbnQgdG8gZW5zdXJlIG5vdGhpbmdcbiAgICAvLyBpcyBpbmhlcml0ZWQuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCB0cnVzdGVkVHlwZXNQb2xpY3k7XG4gICAgbGV0IGVtcHR5SFRNTCA9ICcnO1xuICAgIGNvbnN0IHtcbiAgICAgIGltcGxlbWVudGF0aW9uLFxuICAgICAgY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgfSA9IGRvY3VtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGltcG9ydE5vZGVcbiAgICB9ID0gb3JpZ2luYWxEb2N1bWVudDtcbiAgICBsZXQgaG9va3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZW50cmllcyA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZ2V0UGFyZW50Tm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpbXBsZW1lbnRhdGlvbiAmJiBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7XG4gICAgICBNVVNUQUNIRV9FWFBSLFxuICAgICAgRVJCX0VYUFIsXG4gICAgICBUTVBMSVRfRVhQUixcbiAgICAgIERBVEFfQVRUUixcbiAgICAgIEFSSUFfQVRUUixcbiAgICAgIElTX1NDUklQVF9PUl9EQVRBLFxuICAgICAgQVRUUl9XSElURVNQQUNFXG4gICAgfSA9IEVYUFJFU1NJT05TO1xuICAgIGxldCB7XG4gICAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkkkMVxuICAgIH0gPSBFWFBSRVNTSU9OUztcblxuICAgIC8qKlxuICAgICAqIFdlIGNvbnNpZGVyIHRoZSBlbGVtZW50cyBhbmQgYXR0cmlidXRlcyBiZWxvdyB0byBiZSBzYWZlLiBJZGVhbGx5XG4gICAgICogZG9uJ3QgYWRkIGFueSBuZXcgb25lcyBidXQgZmVlbCBmcmVlIHRvIHJlbW92ZSB1bndhbnRlZCBvbmVzLlxuICAgICAqL1xuXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwkMSwgLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLm1hdGhNbCQxLCAuLi50ZXh0XSk7XG5cbiAgICAvKiBBbGxvd2VkIGF0dHJpYnV0ZSBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX0FUVFIgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9BVFRSID0gYWRkVG9TZXQoe30sIFsuLi5odG1sLCAuLi5zdmcsIC4uLm1hdGhNbCwgLi4ueG1sXSk7XG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBob3cgRE9NUFVyaWZ5IHNob3VsZCBoYW5kbGUgY3VzdG9tIGVsZW1lbnRzIGFuZCB0aGVpciBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cy5cbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSB0YWdOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGN1c3RvbSBlbGVtZW50cylcbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSBhdHRyaWJ1dGVOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGF0dHJpYnV0ZXMgbm90IG9uIHRoZSBhbGxvdyBsaXN0KVxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIGFsbG93IGN1c3RvbSBlbGVtZW50cyBkZXJpdmVkIGZyb20gYnVpbHQtaW5zIGlmIHRoZXkgcGFzcyBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2suIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAgICovXG4gICAgbGV0IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gT2JqZWN0LnNlYWwoY3JlYXRlKG51bGwsIHtcbiAgICAgIHRhZ05hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIGxldCBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIGxldCBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgc2VsZi1jbG9zaW5nIHRhZ3MgaW4gYXR0cmlidXRlcyBhcmUgYWxsb3dlZC5cbiAgICAgKiBVc3VhbGx5IHJlbW92ZWQgZHVlIHRvIGEgbVhTUyBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgbGV0IEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IHRydWU7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICBsZXQgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgbGV0IFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICBsZXQgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICBsZXQgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgbGV0IFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICBsZXQgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIGxldCBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzP1xuICAgICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBKUyB2YXJpYWJsZXMsIG1pdGlnYXRpbmcgYXR0YWNrcyB0aGF0IGFidXNlIHRoZSBIVE1ML0RPTSBzcGVjIHJ1bGVzLlxuICAgICAqXG4gICAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcbiAgICAgKiAgIC0gTmFtZWQgQWNjZXNzIG9uIFdpbmRvdyAowqc3LjMuMylcbiAgICAgKiAgIC0gRE9NIFRyZWUgQWNjZXNzb3JzICjCpzMuMS41KVxuICAgICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXG4gICAgICogICAtIElmcmFtZSBzcmNkb2MgLyBOZXN0ZWQgV2luZG93UHJveGllcyAowqc0LjguNSlcbiAgICAgKiAgIC0gSFRNTENvbGxlY3Rpb24gKMKnNC4yLjEwLjIpXG4gICAgICpcbiAgICAgKiBOYW1lc3BhY2UgaXNvbGF0aW9uIGlzIGltcGxlbWVudGVkIGJ5IHByZWZpeGluZyBgaWRgIGFuZCBgbmFtZWAgYXR0cmlidXRlc1xuICAgICAqIHdpdGggYSBjb25zdGFudCBzdHJpbmcsIGkuZS4sIGB1c2VyLWNvbnRlbnQtYFxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGZhbHNlO1xuICAgIGNvbnN0IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCA9ICd1c2VyLWNvbnRlbnQtJztcblxuICAgIC8qIEtlZXAgZWxlbWVudCBjb250ZW50IHdoZW4gcmVtb3ZpbmcgZWxlbWVudD8gKi9cbiAgICBsZXQgS0VFUF9DT05URU5UID0gdHJ1ZTtcblxuICAgIC8qIElmIGEgYE5vZGVgIGlzIHBhc3NlZCB0byBzYW5pdGl6ZSgpLCB0aGVuIHBlcmZvcm1zIHNhbml0aXphdGlvbiBpbi1wbGFjZSBpbnN0ZWFkXG4gICAgICogb2YgaW1wb3J0aW5nIGl0IGludG8gYSBuZXcgRG9jdW1lbnQgYW5kIHJldHVybmluZyBhIHNhbml0aXplZCBjb3B5ICovXG4gICAgbGV0IElOX1BMQUNFID0gZmFsc2U7XG5cbiAgICAvKiBBbGxvdyB1c2FnZSBvZiBwcm9maWxlcyBsaWtlIGh0bWwsIHN2ZyBhbmQgbWF0aE1sICovXG4gICAgbGV0IFVTRV9QUk9GSUxFUyA9IHt9O1xuXG4gICAgLyogVGFncyB0byBpZ25vcmUgY29udGVudCBvZiB3aGVuIEtFRVBfQ09OVEVOVCBpcyB0cnVlICovXG4gICAgbGV0IEZPUkJJRF9DT05URU5UUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9GT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCcsICdhdWRpbycsICdjb2xncm91cCcsICdkZXNjJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGVhZCcsICdpZnJhbWUnLCAnbWF0aCcsICdtaScsICdtbicsICdtbycsICdtcycsICdtdGV4dCcsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ25vc2NyaXB0JywgJ3BsYWludGV4dCcsICdzY3JpcHQnLCAnc3R5bGUnLCAnc3ZnJywgJ3RlbXBsYXRlJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3ZpZGVvJywgJ3htcCddKTtcblxuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICAgIGxldCBEQVRBX1VSSV9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0RBVEFfVVJJX1RBR1MgPSBhZGRUb1NldCh7fSwgWydhdWRpbycsICd2aWRlbycsICdpbWcnLCAnc291cmNlJywgJ2ltYWdlJywgJ3RyYWNrJ10pO1xuXG4gICAgLyogQXR0cmlidXRlcyBzYWZlIGZvciB2YWx1ZXMgbGlrZSBcImphdmFzY3JpcHQ6XCIgKi9cbiAgICBsZXQgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncm9sZScsICdzdW1tYXJ5JywgJ3RpdGxlJywgJ3ZhbHVlJywgJ3N0eWxlJywgJ3htbG5zJ10pO1xuICAgIGNvbnN0IE1BVEhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XG4gICAgY29uc3QgU1ZHX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgY29uc3QgSFRNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG4gICAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXG4gICAgbGV0IE5BTUVTUEFDRSA9IEhUTUxfTkFNRVNQQUNFO1xuICAgIGxldCBJU19FTVBUWV9JTlBVVCA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3dlZCBYSFRNTCtYTUwgbmFtZXNwYWNlcyAqL1xuICAgIGxldCBBTExPV0VEX05BTUVTUEFDRVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTID0gYWRkVG9TZXQoe30sIFtNQVRITUxfTkFNRVNQQUNFLCBTVkdfTkFNRVNQQUNFLCBIVE1MX05BTUVTUEFDRV0sIHN0cmluZ1RvU3RyaW5nKTtcblxuICAgIC8qIFBhcnNpbmcgb2Ygc3RyaWN0IFhIVE1MIGRvY3VtZW50cyAqL1xuICAgIGxldCBQQVJTRVJfTUVESUFfVFlQRSA9IG51bGw7XG4gICAgY29uc3QgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyA9IFsnYXBwbGljYXRpb24veGh0bWwreG1sJywgJ3RleHQvaHRtbCddO1xuICAgIGNvbnN0IERFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUgPSAndGV4dC9odG1sJztcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBudWxsO1xuXG4gICAgLyogS2VlcCBhIHJlZmVyZW5jZSB0byBjb25maWcgdG8gcGFzcyB0byBob29rcyAqL1xuICAgIGxldCBDT05GSUcgPSBudWxsO1xuXG4gICAgLyogSWRlYWxseSwgZG8gbm90IHRvdWNoIGFueXRoaW5nIGJlbG93IHRoaXMgbGluZSAqL1xuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGNvbnN0IGlzUmVnZXhPckZ1bmN0aW9uID0gZnVuY3Rpb24gaXNSZWdleE9yRnVuY3Rpb24odGVzdFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGVzdFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHRlc3RWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfcGFyc2VDb25maWcgPSBmdW5jdGlvbiBfcGFyc2VDb25maWcoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIGlmIChDT05GSUcgJiYgQ09ORklHID09PSBjZmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSB0YW1wZXJpbmcgKi9cbiAgICAgIGlmICghY2ZnIHx8IHR5cGVvZiBjZmcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNmZyA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXG4gICAgICBjZmcgPSBjbG9uZShjZmcpO1xuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTLmluZGV4T2YoY2ZnLlBBUlNFUl9NRURJQV9UWVBFKSA9PT0gLTEgPyBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogY2ZnLlBBUlNFUl9NRURJQV9UWVBFO1xuXG4gICAgICAvLyBIVE1MIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgYXJlIG5vdCBjYXNlLXNlbnNpdGl2ZSwgY29udmVydGluZyB0byBsb3dlcmNhc2UuIEtlZXBpbmcgWEhUTUwgYXMgaXMuXG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyA9IFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyA/IHN0cmluZ1RvU3RyaW5nIDogc3RyaW5nVG9Mb3dlckNhc2U7XG5cbiAgICAgIC8qIFNldCBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIEFMTE9XRURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfVEFHUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9UQUdTO1xuICAgICAgQUxMT1dFRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9BVFRSJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX0FUVFI7XG4gICAgICBBTExPV0VEX05BTUVTUEFDRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX05BTUVTUEFDRVMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9OQU1FU1BBQ0VTLCBzdHJpbmdUb1N0cmluZykgOiBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUztcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfVVJJX1NBRkVfQVRUUicpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX1VSSV9TQUZFX0FUVFIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTO1xuICAgICAgREFUQV9VUklfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9EQVRBX1VSSV9UQUdTJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfREFUQV9VUklfVEFHUyxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgICBGT1JCSURfQ09OVEVOVFMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQ09OVEVOVFMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICAgIEZPUkJJRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgRk9SQklEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XG4gICAgICBVU0VfUFJPRklMRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdVU0VfUFJPRklMRVMnKSA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSBjZmcuQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBjZmcuUkVUVVJOX1RSVVNURURfVFlQRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgRk9SQ0VfQk9EWSA9IGNmZy5GT1JDRV9CT0RZIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQU5JVElaRV9ET00gPSBjZmcuU0FOSVRJWkVfRE9NICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGNmZy5TQU5JVElaRV9OQU1FRF9QUk9QUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJDEgPSBjZmcuQUxMT1dFRF9VUklfUkVHRVhQIHx8IElTX0FMTE9XRURfVVJJO1xuICAgICAgTkFNRVNQQUNFID0gY2ZnLk5BTUVTUEFDRSB8fCBIVE1MX05BTUVTUEFDRTtcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM7XG4gICAgICB9XG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFBhcnNlIHByb2ZpbGUgaW5mbyAqL1xuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xuICAgICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgdGV4dCk7XG4gICAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLmh0bWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGh0bWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBodG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmdGaWx0ZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmdGaWx0ZXJzKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgY2ZnLkFERF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgIGlmIChGT1JCSURfQ09OVEVOVFMgPT09IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgICAgRk9SQklEX0NPTlRFTlRTID0gY2xvbmUoRk9SQklEX0NPTlRFTlRTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChGT1JCSURfQ09OVEVOVFMsIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkICN0ZXh0IGluIGNhc2UgS0VFUF9DT05URU5UIGlzIHNldCB0byB0cnVlICovXG4gICAgICBpZiAoS0VFUF9DT05URU5UKSB7XG4gICAgICAgIEFMTE9XRURfVEFHU1snI3RleHQnXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsnaHRtbCcsICdoZWFkJywgJ2JvZHknXSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCB0Ym9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSB0YWJsZXMgYXJlIHBlcm1pdHRlZCwgc2VlICMyODYsICMzNjUgKi9cbiAgICAgIGlmIChBTExPV0VEX1RBR1MudGFibGUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ3Rib2R5J10pO1xuICAgICAgICBkZWxldGUgRk9SQklEX1RBR1MudGJvZHk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZUhUTUwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlSFRNTFwiIGhvb2suJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlU2NyaXB0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZVNjcmlwdFVSTFwiIGhvb2suJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdmVyd3JpdGUgZXhpc3RpbmcgVHJ1c3RlZFR5cGVzIHBvbGljeS5cbiAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZO1xuXG4gICAgICAgIC8vIFNpZ24gbG9jYWwgdmFyaWFibGVzIHJlcXVpcmVkIGJ5IGBzYW5pdGl6ZWAuXG4gICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVuaW5pdGlhbGl6ZWQgcG9saWN5LCBhdHRlbXB0IHRvIGluaXRpYWxpemUgdGhlIGludGVybmFsIGRvbXB1cmlmeSBwb2xpY3kuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBjdXJyZW50U2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGNyZWF0aW5nIHRoZSBpbnRlcm5hbCBwb2xpY3kgc3VjY2VlZGVkIHNpZ24gaW50ZXJuYWwgdmFyaWFibGVzLlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ICE9PSBudWxsICYmIHR5cGVvZiBlbXB0eUhUTUwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAgIC8vIE5vdCBhdmFpbGFibGUgaW4gSUU4LCBTYWZhcmkgNSwgZXRjLlxuICAgICAgaWYgKGZyZWV6ZSkge1xuICAgICAgICBmcmVlemUoY2ZnKTtcbiAgICAgIH1cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuICAgIGNvbnN0IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ21pJywgJ21vJywgJ21uJywgJ21zJywgJ210ZXh0J10pO1xuICAgIGNvbnN0IEhUTUxfSU5URUdSQVRJT05fUE9JTlRTID0gYWRkVG9TZXQoe30sIFsnZm9yZWlnbm9iamVjdCcsICdkZXNjJywgJ3RpdGxlJywgJ2Fubm90YXRpb24teG1sJ10pO1xuXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBhcmUgYWxsb3dlZCBpbiBib3RoIFNWRyBhbmQgSFRNTFxuICAgIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxuICAgIC8vIHNvIHRoYXQgdGhleSBkb24ndCBnZXQgZXJyb25lb3VzbHkgZGVsZXRlZCBmcm9tXG4gICAgLy8gSFRNTCBuYW1lc3BhY2UuXG4gICAgY29uc3QgQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyA9IGFkZFRvU2V0KHt9LCBbJ3RpdGxlJywgJ3N0eWxlJywgJ2ZvbnQnLCAnYScsICdzY3JpcHQnXSk7XG5cbiAgICAvKiBLZWVwIHRyYWNrIG9mIGFsbCBwb3NzaWJsZSBTVkcgYW5kIE1hdGhNTCB0YWdzXG4gICAgICogc28gdGhhdCB3ZSBjYW4gcGVyZm9ybSB0aGUgbmFtZXNwYWNlIGNoZWNrc1xuICAgICAqIGNvcnJlY3RseS4gKi9cbiAgICBjb25zdCBBTExfU1ZHX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5zdmdEaXNhbGxvd2VkXSk7XG4gICAgY29uc3QgQUxMX01BVEhNTF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5tYXRoTWwkMSwgLi4ubWF0aE1sRGlzYWxsb3dlZF0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBhIERPTSBlbGVtZW50IHdob3NlIG5hbWVzcGFjZSBpcyBiZWluZyBjaGVja2VkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgICAqICBuYW1lc3BhY2UgdGhhdCBhIHNwZWMtY29tcGxpYW50IHBhcnNlciB3b3VsZCBuZXZlclxuICAgICAqICByZXR1cm4uIFJldHVybiB0cnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgICAvLyBJbiBKU0RPTSwgaWYgd2UncmUgaW5zaWRlIHNoYWRvdyBET00sIHRoZW4gcGFyZW50Tm9kZVxuICAgICAgLy8gY2FuIGJlIG51bGwuIFdlIGp1c3Qgc2ltdWxhdGUgcGFyZW50IGluIHRoaXMgY2FzZS5cbiAgICAgIGlmICghcGFyZW50IHx8ICFwYXJlbnQudGFnTmFtZSkge1xuICAgICAgICBwYXJlbnQgPSB7XG4gICAgICAgICAgbmFtZXNwYWNlVVJJOiBOQU1FU1BBQ0UsXG4gICAgICAgICAgdGFnTmFtZTogJ3RlbXBsYXRlJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY29uc3QgdGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKGVsZW1lbnQudGFnTmFtZSk7XG4gICAgICBjb25zdCBwYXJlbnRUYWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UocGFyZW50LnRhZ05hbWUpO1xuICAgICAgaWYgKCFBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gU1ZHXG4gICAgICAgIC8vIGlzIHZpYSA8c3ZnPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2Zyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gTWF0aE1MIHRvIFNWRyBpcyB2aWFgXG4gICAgICAgIC8vIHN2ZyBpZiBwYXJlbnQgaXMgZWl0aGVyIDxhbm5vdGF0aW9uLXhtbD4gb3IgTWF0aE1MXG4gICAgICAgIC8vIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJyAmJiAocGFyZW50VGFnTmFtZSA9PT0gJ2Fubm90YXRpb24teG1sJyB8fCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIFNWR1xuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIFNWRyBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIE1hdGhNTFxuICAgICAgICAvLyBpcyB2aWEgPG1hdGg+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIE1hdGhNTCBpcyB2aWFcbiAgICAgICAgLy8gPG1hdGg+IGFuZCBIVE1MIGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCcgJiYgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gTWF0aE1MXG4gICAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gTWF0aE1MIG5hbWVzcGFjZS5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBIVE1MIGlzIHZpYVxuICAgICAgICAvLyBIVE1MIGludGVncmF0aW9uIHBvaW50cywgYW5kIGZyb20gTWF0aE1MIHRvIEhUTUxcbiAgICAgICAgLy8gaXMgdmlhIE1hdGhNTCB0ZXh0IGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSAmJiAhSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UgJiYgIU1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGRpc2FsbG93IHRhZ3MgdGhhdCBhcmUgc3BlY2lmaWMgZm9yIE1hdGhNTFxuICAgICAgICAvLyBvciBTVkcgYW5kIHNob3VsZCBuZXZlciBhcHBlYXIgaW4gSFRNTCBuYW1lc3BhY2VcbiAgICAgICAgcmV0dXJuICFBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0gJiYgKENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFNbdGFnTmFtZV0gfHwgIUFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBYSFRNTCBhbmQgWE1MIGRvY3VtZW50cyB0aGF0IHN1cHBvcnQgY3VzdG9tIG5hbWVzcGFjZXNcbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvZGUgc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXMgcGxhY2UgKHRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgc29tZWhvdyBnb3QgbmFtZXNwYWNlIHRoYXQgaXMgbm90XG4gICAgICAvLyBIVE1MLCBTVkcsIE1hdGhNTCBvciBhbGxvd2VkIHZpYSBBTExPV0VEX05BTUVTUEFDRVMpLlxuICAgICAgLy8gUmV0dXJuIGZhbHNlIGp1c3QgaW4gY2FzZS5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2ZvcmNlUmVtb3ZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfZm9yY2VSZW1vdmUgPSBmdW5jdGlvbiBfZm9yY2VSZW1vdmUobm9kZSkge1xuICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgIGVsZW1lbnQ6IG5vZGVcbiAgICAgIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLXJlbW92ZVxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIG5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbnVsbCxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICAgIC8vIFdlIHZvaWQgYXR0cmlidXRlIHZhbHVlcyBmb3IgdW5yZW1vdmFibGUgXCJpc1wiXCIgYXR0cmlidXRlc1xuICAgICAgaWYgKG5hbWUgPT09ICdpcycgJiYgIUFMTE9XRURfQVRUUltuYW1lXSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTSB8fCBSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF9mb3JjZVJlbW92ZShub2RlKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaW5pdERvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGRpcnR5IGEgc3RyaW5nIG9mIGRpcnR5IG1hcmt1cFxuICAgICAqIEByZXR1cm4ge0RvY3VtZW50fSBhIERPTSwgZmlsbGVkIHdpdGggdGhlIGRpcnR5IG1hcmt1cFxuICAgICAqL1xuICAgIGNvbnN0IF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICBsZXQgZG9jID0gbnVsbDtcbiAgICAgIGxldCBsZWFkaW5nV2hpdGVzcGFjZSA9IG51bGw7XG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gc3RyaW5nTWF0Y2goZGlydHksIC9eW1xcclxcblxcdCBdKy8pO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXTtcbiAgICAgIH1cbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBSb290IG9mIFhIVE1MIGRvYyBtdXN0IGNvbnRhaW4geG1sbnMgZGVjbGFyYXRpb24gKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIveGh0bWwxL25vcm1hdGl2ZS5odG1sI3N0cmljdClcbiAgICAgICAgZGlydHkgPSAnPGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+PGhlYWQ+PC9oZWFkPjxib2R5PicgKyBkaXJ0eSArICc8L2JvZHk+PC9odG1sPic7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qXG4gICAgICAgKiBVc2UgdGhlIERPTVBhcnNlciBBUEkgYnkgZGVmYXVsdCwgZmFsbGJhY2sgbGF0ZXIgaWYgbmVlZHMgYmVcbiAgICAgICAqIERPTVBhcnNlciBub3Qgd29yayBmb3Igc3ZnIHdoZW4gaGFzIG11bHRpcGxlIHJvb3QgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgUEFSU0VSX01FRElBX1RZUEUpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBVc2UgY3JlYXRlSFRNTERvY3VtZW50IGluIGNhc2UgRE9NUGFyc2VyIGlzIG5vdCBhdmFpbGFibGUgKi9cbiAgICAgIGlmICghZG9jIHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGRvYyA9IGltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KE5BTUVTUEFDRSwgJ3RlbXBsYXRlJywgbnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBJU19FTVBUWV9JTlBVVCA/IGVtcHR5SFRNTCA6IGRpcnR5UGF5bG9hZDtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIC8vIFN5bnRheCBlcnJvciBpZiBkaXJ0eVBheWxvYWQgaXMgaW52YWxpZCB4bWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLCBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gV0hPTEVfRE9DVU1FTlQgPyBkb2MuZG9jdW1lbnRFbGVtZW50IDogYm9keTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE5vZGVJdGVyYXRvciBvYmplY3QgdGhhdCB5b3UgY2FuIHVzZSB0byB0cmF2ZXJzZSBmaWx0ZXJlZCBsaXN0cyBvZiBub2RlcyBvciBlbGVtZW50cyBpbiBhIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IG9yIG5vZGUgdG8gc3RhcnQgdHJhdmVyc2luZyBvbi5cbiAgICAgKiBAcmV0dXJuIHtOb2RlSXRlcmF0b3J9IFRoZSBjcmVhdGVkIE5vZGVJdGVyYXRvclxuICAgICAqL1xuICAgIGNvbnN0IF9jcmVhdGVOb2RlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChyb290Lm93bmVyRG9jdW1lbnQgfHwgcm9vdCwgcm9vdCxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNDbG9iYmVyZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGVsbSBlbGVtZW50IHRvIGNoZWNrIGZvciBjbG9iYmVyaW5nIGF0dGFja3NcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Nsb2JiZXJlZCA9IGZ1bmN0aW9uIF9pc0Nsb2JiZXJlZChlbG0pIHtcbiAgICAgIHJldHVybiBlbG0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgJiYgKHR5cGVvZiBlbG0ubm9kZU5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQ2hpbGQgIT09ICdmdW5jdGlvbicgfHwgIShlbG0uYXR0cmlidXRlcyBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCkgfHwgdHlwZW9mIGVsbS5yZW1vdmVBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5zZXRBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5uYW1lc3BhY2VVUkkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0uaW5zZXJ0QmVmb3JlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uaGFzQ2hpbGROb2RlcyAhPT0gJ2Z1bmN0aW9uJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBET00gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG9iamVjdCBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2lzTm9kZSA9IGZ1bmN0aW9uIF9pc05vZGUob2JqZWN0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIE5vZGUgPT09ICdmdW5jdGlvbicgJiYgb2JqZWN0IGluc3RhbmNlb2YgTm9kZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2V4ZWN1dGVIb29rXG4gICAgICogRXhlY3V0ZSB1c2VyIGNvbmZpZ3VyYWJsZSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSBub2RlIHRvIHdvcmsgb24gd2l0aCB0aGUgaG9va1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGhvb2sgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGNvbnN0IF9leGVjdXRlSG9vayA9IGZ1bmN0aW9uIF9leGVjdXRlSG9vayhlbnRyeVBvaW50LCBjdXJyZW50Tm9kZSwgZGF0YSkge1xuICAgICAgaWYgKCFob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcnJheUZvckVhY2goaG9va3NbZW50cnlQb2ludF0sIGhvb2sgPT4ge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSB7XG4gICAgICBsZXQgY29udGVudCA9IG51bGw7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBOb3cgbGV0J3MgY2hlY2sgdGhlIGVsZW1lbnQncyB0eXBlIGFuZCBuYW1lICovXG4gICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG4gICAgICBpZiAoY3VycmVudE5vZGUuaGFzQ2hpbGROb2RlcygpICYmICFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBlbGVtZW50IGlmIGFueXRoaW5nIGZvcmJpZHMgaXRzIHByZXNlbmNlICovXG4gICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGEgY3VzdG9tIGVsZW1lbnQgdG8gaGFuZGxlICovXG4gICAgICAgIGlmICghRk9SQklEX1RBR1NbdGFnTmFtZV0gJiYgX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpKSB7XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh0YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEtlZXAgY29udGVudCBleGNlcHQgZm9yIGJhZC1saXN0ZWQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKEtFRVBfQ09OVEVOVCAmJiAhRk9SQklEX0NPTlRFTlRTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IGdldENoaWxkTm9kZXMoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICAgICAgaWYgKGNoaWxkTm9kZXMgJiYgcGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb3VudCA9IGNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNoaWxkQ291bnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUoY2hpbGROb2Rlc1tpXSwgdHJ1ZSksIGdldE5leHRTaWJsaW5nKGN1cnJlbnROb2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3aGV0aGVyIGVsZW1lbnQgaGFzIGEgdmFsaWQgbmFtZXNwYWNlICovXG4gICAgICBpZiAoY3VycmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmICFfY2hlY2tWYWxpZE5hbWVzcGFjZShjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE1ha2Ugc3VyZSB0aGF0IG9sZGVyIGJyb3dzZXJzIGRvbid0IGdldCBmYWxsYmFjay10YWcgbVhTUyAqL1xuICAgICAgaWYgKCh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8IHRhZ05hbWUgPT09ICdub2VtYmVkJyB8fCB0YWdOYW1lID09PSAnbm9mcmFtZXMnKSAmJiByZWdFeHBUZXN0KC88XFwvbm8oc2NyaXB0fGVtYmVkfGZyYW1lcykvaSwgY3VycmVudE5vZGUuaW5uZXJIVE1MKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZWxlbWVudCBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLyogR2V0IHRoZSBlbGVtZW50J3MgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBleHByLCAnICcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnRleHRDb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgICBlbGVtZW50OiBjdXJyZW50Tm9kZS5jbG9uZU5vZGUoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnJlbnROb2RlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIGNvbnN0IF9pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpIHtcbiAgICAgIC8qIE1ha2Ugc3VyZSBhdHRyaWJ1dGUgY2Fubm90IGNsb2JiZXIgKi9cbiAgICAgIGlmIChTQU5JVElaRV9ET00gJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykgJiYgKHZhbHVlIGluIGRvY3VtZW50IHx8IHZhbHVlIGluIGZvcm1FbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcbiAgICAgICAgICBYTUwtY29tcGF0aWJsZSAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN4bWwtY29tcGF0aWJsZSBhbmQgaHR0cDovL3d3dy53My5vcmcvVFIveG1sLyNkMGU4MDQpXG4gICAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuICAgICAgaWYgKEFMTE9XX0RBVEFfQVRUUiAmJiAhRk9SQklEX0FUVFJbbGNOYW1lXSAmJiByZWdFeHBUZXN0KERBVEFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoIUFMTE9XRURfQVRUUltsY05hbWVdIHx8IEZPUkJJRF9BVFRSW2xjTmFtZV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBGaXJzdCBjb25kaXRpb24gZG9lcyBhIHZlcnkgYmFzaWMgY2hlY2sgaWYgYSkgaXQncyBiYXNpY2FsbHkgYSB2YWxpZCBjdXN0b20gZWxlbWVudCB0YWduYW1lIEFORFxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAvLyBhbmQgYykgaWYgdGhlIGF0dHJpYnV0ZSBuYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrXG4gICAgICAgIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudChsY1RhZykgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgbGNUYWcpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayhsY1RhZykpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2ssIGxjTmFtZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKGxjTmFtZSkpIHx8XG4gICAgICAgIC8vIEFsdGVybmF0aXZlLCBzZWNvbmQgY29uZGl0aW9uIGNoZWNrcyBpZiBpdCdzIGFuIGBpc2AtYXR0cmlidXRlLCBBTkRcbiAgICAgICAgLy8gdGhlIHZhbHVlIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIGxjTmFtZSA9PT0gJ2lzJyAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdmFsdWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh2YWx1ZSkpKSA7IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBDaGVjayB2YWx1ZSBpcyBzYWZlLiBGaXJzdCwgaXMgYXR0ciBpbmVydD8gSWYgc28sIGlzIHNhZmUgKi9cbiAgICAgIH0gZWxzZSBpZiAoVVJJX1NBRkVfQVRUUklCVVRFU1tsY05hbWVdKSA7IGVsc2UgaWYgKHJlZ0V4cFRlc3QoSVNfQUxMT1dFRF9VUkkkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpKSA7IGVsc2UgaWYgKChsY05hbWUgPT09ICdzcmMnIHx8IGxjTmFtZSA9PT0gJ3hsaW5rOmhyZWYnIHx8IGxjTmFtZSA9PT0gJ2hyZWYnKSAmJiBsY1RhZyAhPT0gJ3NjcmlwdCcgJiYgc3RyaW5nSW5kZXhPZih2YWx1ZSwgJ2RhdGE6JykgPT09IDAgJiYgREFUQV9VUklfVEFHU1tsY1RhZ10pIDsgZWxzZSBpZiAoQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgJiYgIXJlZ0V4cFRlc3QoSVNfU0NSSVBUX09SX0RBVEEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudFxuICAgICAqIGNoZWNrcyBpZiBhdCBsZWFzdCBvbmUgZGFzaCBpcyBpbmNsdWRlZCBpbiB0YWdOYW1lLCBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGNoYXJcbiAgICAgKiBmb3IgbW9yZSBzb3BoaXN0aWNhdGVkIGNoZWNraW5nIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3ZhbGlkYXRlLWVsZW1lbnQtbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgbmFtZSBvZiB0aGUgdGFnIG9mIHRoZSBub2RlIHRvIHNhbml0aXplXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIG5hbWUgbWVldHMgdGhlIGJhc2ljIGNyaXRlcmlhIGZvciBhIGN1c3RvbSBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgY29uc3QgX2lzQmFzaWNDdXN0b21FbGVtZW50ID0gZnVuY3Rpb24gX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiB0YWdOYW1lICE9PSAnYW5ub3RhdGlvbi14bWwnICYmIHRhZ05hbWUuaW5kZXhPZignLScpID4gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXR0cmlidXRlc1xuICAgICAgfSA9IGN1cnJlbnROb2RlO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG4gICAgICBpZiAoIWF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaG9va0V2ZW50ID0ge1xuICAgICAgICBhdHRyTmFtZTogJycsXG4gICAgICAgIGF0dHJWYWx1ZTogJycsXG4gICAgICAgIGtlZXBBdHRyOiB0cnVlLFxuICAgICAgICBhbGxvd2VkQXR0cmlidXRlczogQUxMT1dFRF9BVFRSXG4gICAgICB9O1xuICAgICAgbGV0IGwgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcblxuICAgICAgLyogR28gYmFja3dhcmRzIG92ZXIgYWxsIGF0dHJpYnV0ZXM7IHNhZmVseSByZW1vdmUgYmFkIG9uZXMgKi9cbiAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIG5hbWVzcGFjZVVSSSxcbiAgICAgICAgICB2YWx1ZTogYXR0clZhbHVlXG4gICAgICAgIH0gPSBhdHRyO1xuICAgICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhuYW1lKTtcbiAgICAgICAgbGV0IHZhbHVlID0gbmFtZSA9PT0gJ3ZhbHVlJyA/IGF0dHJWYWx1ZSA6IHN0cmluZ1RyaW0oYXR0clZhbHVlKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmICghQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICYmIHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSBhdHRyaWJ1dGUgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBleHByLCAnICcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSXMgYHZhbHVlYCB2YWxpZCBmb3IgdGhpcyBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGNvbnN0IGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuICAgICAgICBpZiAoIV9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICAgKiBQcmVmaXggaWQgYW5kIG5hbWUgYXR0cmlidXRlcyB3aXRoIGB1c2VyLWNvbnRlbnQtYFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKFNBTklUSVpFX05BTUVEX1BST1BTICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGlzIHZhbHVlXG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAvLyBQcmVmaXggdGhlIHZhbHVlIGFuZCBsYXRlciByZS1jcmVhdGUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW5pdGl6ZWQgdmFsdWVcbiAgICAgICAgICB2YWx1ZSA9IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCArIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlIFRydXN0ZWQgVHlwZXMgKi9cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSA7IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZShsY1RhZywgbGNOYW1lKSkge1xuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkSFRNTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRTY3JpcHRVUkwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZVNjcmlwdFVSTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGludmFsaWQgZGF0YS0qIGF0dHJpYnV0ZSBzZXQgYnkgdHJ5LWNhdGNoaW5nIGl0ICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIEZhbGxiYWNrIHRvIHNldEF0dHJpYnV0ZSgpIGZvciBicm93c2VyLXVucmVjb2duaXplZCBuYW1lc3BhY2VzIGUuZy4gXCJ4LXNjaGVtYVwiLiAqL1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZVNoYWRvd0RPTSA9IGZ1bmN0aW9uIF9zYW5pdGl6ZVNoYWRvd0RPTShmcmFnbWVudCkge1xuICAgICAgbGV0IHNoYWRvd05vZGUgPSBudWxsO1xuICAgICAgY29uc3Qgc2hhZG93SXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICAgIHdoaWxlIChzaGFkb3dOb2RlID0gc2hhZG93SXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplU2hhZG93Tm9kZScsIHNoYWRvd05vZGUsIG51bGwpO1xuXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhzaGFkb3dOb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRGVlcCBzaGFkb3cgRE9NIGRldGVjdGVkICovXG4gICAgICAgIGlmIChzaGFkb3dOb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKHNoYWRvd05vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhzaGFkb3dOb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTYW5pdGl6ZVxuICAgICAqIFB1YmxpYyBtZXRob2QgcHJvdmlkaW5nIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlfSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5KSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGxldCBib2R5ID0gbnVsbDtcbiAgICAgIGxldCBpbXBvcnRlZE5vZGUgPSBudWxsO1xuICAgICAgbGV0IGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgIGxldCByZXR1cm5Ob2RlID0gbnVsbDtcbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXG4gICAgICAgIHRoZSB1c2VyIGhhcyByZXF1ZXN0ZWQgYSBET00gb2JqZWN0IHJhdGhlciB0aGFuIGEgc3RyaW5nICovXG4gICAgICBJU19FTVBUWV9JTlBVVCA9ICFkaXJ0eTtcbiAgICAgIGlmIChJU19FTVBUWV9JTlBVVCkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGlydHkgPSBkaXJ0eS50b1N0cmluZygpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ2RpcnR5IGlzIG5vdCBhIHN0cmluZywgYWJvcnRpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCd0b1N0cmluZyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBkaXJ0eSBIVE1MIGlmIERPTVB1cmlmeSBjYW5ub3QgcnVuICovXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFzc2lnbiBjb25maWcgdmFycyAqL1xuICAgICAgaWYgKCFTRVRfQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgfVxuXG4gICAgICAvKiBDbGVhbiB1cCByZW1vdmVkIGVsZW1lbnRzICovXG4gICAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gICAgICAvKiBDaGVjayBpZiBkaXJ0eSBpcyBjb3JyZWN0bHkgdHlwZWQgZm9yIElOX1BMQUNFICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIC8qIERvIHNvbWUgZWFybHkgcHJlLXNhbml0aXphdGlvbiB0byBhdm9pZCB1bnNhZmUgcm9vdCBub2RlcyAqL1xuICAgICAgICBpZiAoZGlydHkubm9kZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZGlydHkubm9kZU5hbWUpO1xuICAgICAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3Jvb3Qgbm9kZSBpcyBmb3JiaWRkZW4gYW5kIGNhbm5vdCBiZSBzYW5pdGl6ZWQgaW4tcGxhY2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlydHkgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxuICAgICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KCc8IS0tLS0+Jyk7XG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgIC8qIE5vZGUgaXMgYWxyZWFkeSBhIGJvZHksIHVzZSBhcyBpcyAqL1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogUkVUVVJOX1RSVVNURURfVFlQRSA/IGVtcHR5SFRNTCA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgY29uc3Qgbm9kZUl0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2hhZG93IERPTSBkZXRlY3RlZCwgc2FuaXRpemUgaXQgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKGN1cnJlbnROb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoY3VycmVudE5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBJZiB3ZSBzYW5pdGl6ZWQgYGRpcnR5YCBpbi1wbGFjZSwgcmV0dXJuIGl0LiAqL1xuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIHNhbml0aXplZCBzdHJpbmcgb3IgRE9NICovXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBjcmVhdGVEb2N1bWVudEZyYWdtZW50LmNhbGwoYm9keS5vd25lckRvY3VtZW50KTtcbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgICByZXR1cm5Ob2RlLmFwcGVuZENoaWxkKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIuc2hhZG93cm9vdCB8fCBBTExPV0VEX0FUVFIuc2hhZG93cm9vdG1vZGUpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybk5vZGU7XG4gICAgICB9XG4gICAgICBsZXQgc2VyaWFsaXplZEhUTUwgPSBXSE9MRV9ET0NVTUVOVCA/IGJvZHkub3V0ZXJIVE1MIDogYm9keS5pbm5lckhUTUw7XG5cbiAgICAgIC8qIFNlcmlhbGl6ZSBkb2N0eXBlIGlmIGFsbG93ZWQgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCAmJiBBTExPV0VEX1RBR1NbJyFkb2N0eXBlJ10gJiYgYm9keS5vd25lckRvY3VtZW50ICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgJiYgcmVnRXhwVGVzdChET0NUWVBFX05BTUUsIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gJzwhRE9DVFlQRSAnICsgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSArICc+XFxuJyArIHNlcmlhbGl6ZWRIVE1MO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChzZXJpYWxpemVkSFRNTCkgOiBzZXJpYWxpemVkSFRNTDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBzZXQgdGhlIGNvbmZpZ3VyYXRpb24gb25jZVxuICAgICAqIHNldENvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS5zZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XG4gICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZEhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGFkZCBET01QdXJpZnkgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rRnVuY3Rpb24gZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5hZGRIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQsIGhvb2tGdW5jdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBob29rRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmVtb3ZlZChwb3BwZWQpIGhvb2tcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9va3MgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2tzID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICBob29rc1tlbnRyeVBvaW50XSA9IFtdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVBbGxIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3NcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IHt9O1xuICAgIH07XG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuICB2YXIgcHVyaWZ5ID0gY3JlYXRlRE9NUHVyaWZ5KCk7XG5cbiAgcmV0dXJuIHB1cmlmeTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVyaWZ5LmpzLm1hcFxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiZXhwb3J0IGNsYXNzIFBsdWdpbk1hbmFnZXIge1xuXG5cblx0Y29uc3RydWN0b3IodGhpc09iajogYW55KSB7XG5cblx0XHRQbHVnaW5NYW5hZ2VyLnBsdWdpbnMgPSB7fTtcblx0XHQvKipcblx0XHQgKiBBcnJheSBvZiBhbGwgY3VycmVudGx5IHJlZ2lzdGVyZWQgcGx1Z2luc1xuXHRcdCAqXG5cdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dmFyIHJlZ2lzdGVyZWRQbHVnaW5zOiBhbnlbXSA9IFtdO1xuXG5cblxuXHRcdC8qKlxuXHRcdCAqIENoYW5nZXMgYSBzaWduYWxzIG5hbWUgZnJvbSBcIm5hbWVcIiBpbnRvIFwic2lnbmFsTmFtZVwiLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBzaWduYWxcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICogQHByaXZhdGVcblx0XHQgKi9cblx0XHR2YXIgZm9ybWF0U2lnbmFsTmFtZSA9IGZ1bmN0aW9uIChzaWduYWw6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0XHRyZXR1cm4gJ3NpZ25hbCcgKyBzaWduYWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzaWduYWwuc2xpY2UoMSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENhbGxzIGhhbmRsZXJzIGZvciBhIHNpZ25hbFxuXHRcdCAqXG5cdFx0ICogQHNlZSBjYWxsKClcblx0XHQgKiBAc2VlIGNhbGxPbmx5Rmlyc3QoKVxuXHRcdCAqIEBwYXJhbSAge0FycmF5fSAgIGFyZ3Ncblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSByZXR1cm5BdEZpcnN0XG5cdFx0ICogQHJldHVybiB7Kn1cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHZhciBjYWxsSGFuZGxlcnMgPSBmdW5jdGlvbiAoYXJnczogSUFyZ3VtZW50cywgcmV0dXJuQXRGaXJzdDogYm9vbGVhbik6IGFueSB7XG5cdFx0XHRhcmdzID0gW10uc2xpY2UuY2FsbChhcmdzKTtcblxuXHRcdFx0dmFyIGlkeCwgcmV0LCBzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKEFycmF5LmZyb20oYXJncykuc2hpZnQoKSk7XG5cblx0XHRcdGZvciAoaWR4ID0gMDsgaWR4IDwgcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoOyBpZHgrKykge1xuXHRcdFx0XHRpZiAoc2lnbmFsIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF0pIHtcblx0XHRcdFx0XHRyZXQgPSByZWdpc3RlcmVkUGx1Z2luc1tpZHhdW3NpZ25hbF0uYXBwbHkodGhpc09iaiwgYXJncyk7XG5cblx0XHRcdFx0XHRpZiAocmV0dXJuQXRGaXJzdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2FsbHMgYWxsIGhhbmRsZXJzIGZvciB0aGUgcGFzc2VkIHNpZ25hbFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcblx0XHQgKiBAcGFyYW0gIHsuLi5zdHJpbmd9IGFyZ3Ncblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBjYWxsXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5jYWxsID0gZnVuY3Rpb24gKCk6IHZvaWQge1xuXHRcdFx0Y2FsbEhhbmRsZXJzKGFyZ3VtZW50cywgZmFsc2UpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDYWxscyB0aGUgZmlyc3QgaGFuZGxlciBmb3IgYSBzaWduYWwsIGFuZCByZXR1cm5zIHRoZVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcblx0XHQgKiBAcGFyYW0gIHsuLi5zdHJpbmd9IGFyZ3Ncblx0XHQgKiBAcmV0dXJuIHsqfSBUaGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIGhhbmRsZXJcblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBjYWxsT25seUZpcnN0XG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5jYWxsT25seUZpcnN0ID0gZnVuY3Rpb24gKCk6IGFueSB7XG5cdFx0XHRyZXR1cm4gY2FsbEhhbmRsZXJzKGFyZ3VtZW50cywgdHJ1ZSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENoZWNrcyBpZiBhIHNpZ25hbCBoYXMgYSBoYW5kbGVyXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgaGFzSGFuZGxlclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChzaWduYWw6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0dmFyIGkgPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XG5cdFx0XHRzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKHNpZ25hbCk7XG5cblx0XHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpXSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2tzIGlmIHRoZSBwbHVnaW4gZXhpc3RzIGluIHBsdWdpbnNcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBleGlzdHNcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmV4aXN0cyA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0aWYgKHBsdWdpbiBpbiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnMpIHtcblx0XHRcdFx0bGV0IHBsdWdpbk9iajoge30gPSBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdO1xuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHBsdWdpbk9iaiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcGx1Z2luT2JqLnByb3RvdHlwZSA9PT0gJ29iamVjdCc7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ2hlY2tzIGlmIHRoZSBwYXNzZWQgcGx1Z2luIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGlzUmVnaXN0ZXJlZFxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuaXNSZWdpc3RlcmVkID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0XHRpZiAodGhpcy5leGlzdHMocGx1Z2luKSkge1xuXHRcdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xuXG5cdFx0XHRcdHdoaWxlIChpZHgtLSkge1xuXHRcdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1tpZHhdIGluc3RhbmNlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVnaXN0ZXJzIGEgcGx1Z2luIHRvIHJlY2VpdmUgc2lnbmFsc1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIHJlZ2lzdGVyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5yZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0aWYgKCF0aGlzLmV4aXN0cyhwbHVnaW4pIHx8IHRoaXMuaXNSZWdpc3RlcmVkKHBsdWdpbikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgcGx1Z2luT2JqID0gbmV3IHRoaXMucGx1Z2luc1twbHVnaW5dKCk7XG5cdFx0XHRyZWdpc3RlcmVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XG5cblx0XHRcdGlmICgnaW5pdCcgaW4gdGhpcy5wbHVnaW4pIHtcblx0XHRcdFx0cGx1Z2luT2JqLmluaXQuY2FsbCh0aGlzT2JqKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIERlcmVnaXN0ZXJzIGEgcGx1Z2luLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGRlcmVnaXN0ZXJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmRlcmVnaXN0ZXIgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRcdHZhciByZW1vdmVkUGx1Z2luLCBwbHVnaW5JZHggPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGgsIHJlbW92ZWQgPSBmYWxzZTtcblxuXHRcdFx0aWYgKCF0aGlzLmlzUmVnaXN0ZXJlZChwbHVnaW4pKSB7XG5cdFx0XHRcdHJldHVybiByZW1vdmVkO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAocGx1Z2luSWR4LS0pIHtcblx0XHRcdFx0aWYgKHJlZ2lzdGVyZWRQbHVnaW5zW3BsdWdpbklkeF0gaW5zdGFuY2VvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdKSB7XG5cdFx0XHRcdFx0cmVtb3ZlZFBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLnNwbGljZShwbHVnaW5JZHgsIDEpWzBdO1xuXHRcdFx0XHRcdHJlbW92ZWQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZW1vdmVkUGx1Z2luKSB7XG5cdFx0XHRcdFx0XHRyZW1vdmVkUGx1Z2luLmRlc3Ryb3kuY2FsbCh0aGlzT2JqKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlbW92ZWQ7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENsZWFycyBhbGwgcGx1Z2lucyBhbmQgcmVtb3ZlcyB0aGUgb3duZXIgcmVmZXJlbmNlLlxuXHRcdCAqXG5cdFx0ICogQ2FsbGluZyBhbnkgZnVuY3Rpb25zIG9uIHRoaXMgb2JqZWN0IGFmdGVyIGNhbGxpbmdcblx0XHQgKiBkZXN0cm95IHdpbGwgY2F1c2UgYSBKUyBlcnJvci5cblx0XHQgKlxuXHRcdCAqIEBuYW1lIGRlc3Ryb3lcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgaSA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcblxuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRpZiAoJ2Rlc3Ryb3knIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XG5cdFx0XHRcdFx0cmVnaXN0ZXJlZFBsdWdpbnNbaV0uZGVzdHJveS5jYWxsKHRoaXNPYmopO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlZ2lzdGVyZWRQbHVnaW5zID0gW107XG5cdFx0XHR0aGlzT2JqID0gbnVsbDtcblx0XHR9O1xuXHR9XG5cblx0c3RhdGljIHBsdWdpbnM6IHt9O1xuXHRjYWxsOiAoKSA9PiB2b2lkO1xuXHRjYWxsT25seUZpcnN0OiAoKSA9PiBhbnk7XG5cdGhhc0hhbmRsZXI6IChzaWduYWw6IHN0cmluZykgPT4gYm9vbGVhbjtcblx0ZXhpc3RzOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cdGlzUmVnaXN0ZXJlZDogKHBsdWdpbjogc3RyaW5nKSA9PiBib29sZWFuO1xuXHRyZWdpc3RlcjogKHBsdWdpbjogc3RyaW5nKSA9PiBib29sZWFuO1xuXHRkZXJlZ2lzdGVyOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XG5cdGRlc3Ryb3k6ICgpID0+IHZvaWQ7XG59Iiwi77u/aW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zLmpzJztcclxuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2RlZmF1bHRDb21tYW5kcy5qcyc7XHJcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuL3BsdWdpbk1hbmFnZXInO1xyXG5pbXBvcnQgUmFuZ2VIZWxwZXIgZnJvbSAnLi9yYW5nZUhlbHBlci5qcyc7XHJcbmltcG9ydCBfdG1wbCBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZW1vdGljb25zIGZyb20gJy4vZW1vdGljb25zLmpzJztcclxuaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknO1xyXG5cclxudmFyIGdsb2JhbFdpbiAgPSB3aW5kb3c7XHJcbnZhciBnbG9iYWxEb2MgID0gZG9jdW1lbnQ7XHJcblxyXG52YXIgSU1BR0VfTUlNRV9SRUdFWCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblxyXG4vKipcclxuICogV3JhcCBpbmxpbmVzIHRoYXQgYXJlIGluIHRoZSByb290IGluIHBhcmFncmFwaHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvY1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZnVuY3Rpb24gd3JhcElubGluZXMoYm9keSwgZG9jKSB7XHJcblx0dmFyIHdyYXBwZXI7XHJcblxyXG5cdGRvbS50cmF2ZXJzZShib2R5LCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKGRvbS5pc0lubGluZShub2RlLCB0cnVlKSkge1xyXG5cdFx0XHQvLyBJZ25vcmUgdGV4dCBub2RlcyB1bmxlc3MgdGhleSBjb250YWluIG5vbi13aGl0ZXNwYWNlIGNoYXJzIGFzXHJcblx0XHRcdC8vIHdoaXRlc3BhY2Ugd2lsbCBiZSBjb2xsYXBzZWQuXHJcblx0XHRcdC8vIElnbm9yZSBlbWxlZGl0b3ItaWdub3JlIGVsZW1lbnRzIHVubGVzcyB3cmFwcGluZyBzaWJsaW5nc1xyXG5cdFx0XHQvLyBTaG91bGQgc3RpbGwgd3JhcCBib3RoIGlmIHdyYXBwaW5nIHNpYmxpbmdzLlxyXG5cdFx0XHRpZiAod3JhcHBlciB8fCBub2RlLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFID9cclxuXHRcdFx0XHQvXFxTLy50ZXN0KG5vZGUubm9kZVZhbHVlKSA6ICFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRpZiAoIXdyYXBwZXIpIHtcclxuXHRcdFx0XHRcdHdyYXBwZXIgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCBkb2MpO1xyXG5cdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZSh3cmFwcGVyLCBub2RlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3cmFwcGVyLCBub2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0d3JhcHBlciA9IG51bGw7XHJcblx0XHR9XHJcblx0fSwgZmFsc2UsIHRydWUpO1xyXG59XHJcblxyXG4vKipcclxuICogRW1sRWRpdG9yIC0gQSBsaWdodHdlaWdodCBXWVNJV1lHIGVkaXRvclxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxUZXh0QXJlYUVsZW1lbnR9IHRleHRhcmVhIFRoZSB0ZXh0YXJlYSB0byBiZSBjb252ZXJ0ZWRcclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJPcHRpb25zXHJcbiAqIEBjbGFzcyBFbWxFZGl0b3JcclxuICogQG5hbWUgRW1sRWRpdG9yXHJcbiAqL1xyXG4vKipcclxuICogRW1sRWRpdG9yIC0gQSBsaWdodHdlaWdodCBXWVNJV1lHIGVkaXRvclxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxUZXh0QXJlYUVsZW1lbnR9IHRleHRhcmVhIFRoZSB0ZXh0YXJlYSB0byBiZSBjb252ZXJ0ZWRcclxuICogQHBhcmFtIHtPYmplY3R9IHVzZXJPcHRpb25zXHJcbiAqIEBjbGFzcyBFbWxFZGl0b3JcclxuICogQG5hbWUgRW1sRWRpdG9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWxFZGl0b3Ige1xyXG5cdGNvbnN0cnVjdG9yKHRleHRhcmVhLCB1c2VyT3B0aW9ucykge1xyXG5cdFx0LyoqXHJcblx0XHQgKiBBbGlhcyBvZiB0aGlzXHJcblx0XHQgKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXHJcblx0XHR2YXIgYmFzZSA9IHRoaXM7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFZGl0b3IgZm9ybWF0IGxpa2UgQkJDb2RlIG9yIEhUTUxcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGZvcm1hdDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBkaXYgd2hpY2ggY29udGFpbnMgdGhlIGVkaXRvciBhbmQgdG9vbGJhclxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBlZGl0b3JDb250YWluZXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBNYXAgb2YgZXZlbnRzIGhhbmRsZXJzIGJvdW5kIHRvIHRoaXMgaW5zdGFuY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge09iamVjdH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBldmVudEhhbmRsZXJzID0ge307XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyB0b29sYmFyXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHRvb2xiYXI7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyBpZnJhbWUgd2hpY2ggc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxJRnJhbWVFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHd5c2l3eWdFZGl0b3I7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZWRpdG9ycyB3aW5kb3dcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7V2luZG93fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHd5c2l3eWdXaW5kb3c7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGJvZHkgZWxlbWVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MQm9keUVsZW1lbnR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgd3lzaXd5Z0JvZHk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGRvY3VtZW50XHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0RvY3VtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHd5c2l3eWdEb2N1bWVudDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZGl0b3JzIHRleHRhcmVhIGZvciB2aWV3aW5nIHNvdXJjZVxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MVGV4dEFyZWFFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHNvdXJjZUVkaXRvcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjdXJyZW50IGRyb3Bkb3duXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGRyb3Bkb3duO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGNvbXBvc2luZyB0ZXh0IHZpYSBJTUVcclxuXHRcdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdFx0ICovXHJcblx0XHR2YXIgaXNDb21wb3Npbmc7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaW1lciBmb3IgdmFsdWVDaGFuZ2VkIGtleSBoYW5kbGVyXHJcblx0XHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdFx0ICovXHJcblx0XHR2YXIgdmFsdWVDaGFuZ2VkS2V5VXBUaW1lcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZGl0b3JzIGxvY2FsZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBsb2NhbGU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdG9yZXMgYSBjYWNoZSBvZiBwcmVsb2FkZWQgaW1hZ2VzXHJcblx0XHQgKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqIEB0eXBlIHtBcnJheS48SFRNTEltYWdlRWxlbWVudD59XHJcblx0XHQgKi9cclxuXHRcdHZhciBwcmVMb2FkQ2FjaGUgPSBbXTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBlZGl0b3JzIHJhbmdlSGVscGVyIGluc3RhbmNlXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1JhbmdlSGVscGVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHJhbmdlSGVscGVyO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQW4gYXJyYXkgb2YgYnV0dG9uIHN0YXRlIGhhbmRsZXJzXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge0FycmF5LjxPYmplY3Q+fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGJ0blN0YXRlSGFuZGxlcnMgPSBbXTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFBsdWdpbiBtYW5hZ2VyIGluc3RhbmNlXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge1BsdWdpbk1hbmFnZXJ9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgcGx1Z2luTWFuYWdlcjtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjdXJyZW50IG5vZGUgY29udGFpbmluZyB0aGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge05vZGV9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgY3VycmVudE5vZGU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBjdXJyZW50IG5vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7bm9kZX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBjdXJyZW50QmxvY2tOb2RlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGN1cnJlbnQgbm9kZSBzZWxlY3Rpb24vY2FyZXRcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGN1cnJlbnRTZWxlY3Rpb247XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBVc2VkIHRvIG1ha2Ugc3VyZSBvbmx5IDEgc2VsZWN0aW9uIGNoYW5nZWRcclxuXHRcdCAqIGNoZWNrIGlzIGNhbGxlZCBldmVyeSAxMDBtcy5cclxuXHRcdCAqXHJcblx0XHQgKiBIZWxwcyBpbXByb3ZlIHBlcmZvcm1hbmNlIGFzIGl0IGlzIGNoZWNrZWQgYSBsb3QuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgaXNTZWxlY3Rpb25DaGVja1BlbmRpbmc7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJZiBjb250ZW50IGlzIHJlcXVpcmVkIChlcXVpdmFsZW50IHRvIHRoZSBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUpXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgaXNSZXF1aXJlZDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBpbmxpbmUgQ1NTIHN0eWxlIGVsZW1lbnQuIFdpbGwgYmUgdW5kZWZpbmVkXHJcblx0XHQgKiB1bnRpbCBjc3MoKSBpcyBjYWxsZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtIVE1MU3R5bGVFbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGlubGluZUNzcztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE9iamVjdCBjb250YWluaW5nIGEgbGlzdCBvZiBzaG9ydGN1dCBoYW5kbGVyc1xyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgc2hvcnRjdXRIYW5kbGVycyA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG1pbiBhbmQgbWF4IGhlaWdodHMgdGhhdCBhdXRvRXhwYW5kIHNob3VsZCBzdGF5IHdpdGhpblxyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgYXV0b0V4cGFuZEJvdW5kcztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRpbWVvdXQgZm9yIHRoZSBhdXRvRXhwYW5kIGZ1bmN0aW9uIHRvIHRocm90dGxlIGNhbGxzXHJcblx0XHQgKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGF1dG9FeHBhbmRUaHJvdHRsZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENhY2hlIG9mIHRoZSBjdXJyZW50IHRvb2xiYXIgYnV0dG9uc1xyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgdG9vbGJhckJ1dHRvbnMgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIExhc3Qgc2Nyb2xsIHBvc2l0aW9uIGJlZm9yZSBtYXhpbWl6aW5nIHNvXHJcblx0XHQgKiBpdCBjYW4gYmUgcmVzdG9yZWQgd2hlbiBmaW5pc2hlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIG1heGltaXplU2Nyb2xsUG9zaXRpb247XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTdG9yZXMgdGhlIGNvbnRlbnRzIHdoaWxlIGEgcGFzdGUgaXMgdGFraW5nIHBsYWNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIE5lZWRlZCB0byBzdXBwb3J0IGJyb3dzZXJzIHRoYXQgbGFjayBjbGlwYm9hcmQgQVBJIHN1cHBvcnQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUgez9Eb2N1bWVudEZyYWdtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIHBhc3RlQ29udGVudEZyYWdtZW50O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWxsIHRoZSBlbW90aWNvbnMgZnJvbSBkcm9wZG93biwgbW9yZSBhbmQgaGlkZGVuIGNvbWJpbmVkXHJcblx0XHQgKiBhbmQgd2l0aCB0aGUgZW1vdGljb25zIHJvb3Qgc2V0XHJcblx0XHQgKlxyXG5cdFx0ICogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dmFyIGFsbEVtb3RpY29ucyA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3VycmVudCBpY29uIHNldCBpZiBhbnlcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7P09iamVjdH1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBpY29ucztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFByaXZhdGUgZnVuY3Rpb25zXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgaW5pdCwgcmVwbGFjZUVtb3RpY29ucywgaGFuZGxlQ29tbWFuZCwgaW5pdEVkaXRvciwgaW5pdExvY2FsZSwgaW5pdFRvb2xCYXIsIGluaXRPcHRpb25zLCBpbml0RXZlbnRzLCBpbml0UmVzaXplLCBpbml0RW1vdGljb25zLCBoYW5kbGVQYXN0ZUV2dCwgaGFuZGxlQ3V0Q29weUV2dCwgaGFuZGxlUGFzdGVEYXRhLCBoYW5kbGVLZXlEb3duLCBoYW5kbGVCYWNrU3BhY2UsIGhhbmRsZUtleVByZXNzLCBoYW5kbGVGb3JtUmVzZXQsIGhhbmRsZU1vdXNlRG93biwgaGFuZGxlQ29tcG9zaXRpb24sIGhhbmRsZUV2ZW50LCBoYW5kbGVEb2N1bWVudENsaWNrLCB1cGRhdGVUb29sQmFyLCB1cGRhdGVBY3RpdmVCdXR0b25zLCBzb3VyY2VFZGl0b3JTZWxlY3RlZFRleHQsIGFwcGVuZE5ld0xpbmUsIGNoZWNrU2VsZWN0aW9uQ2hhbmdlZCwgY2hlY2tOb2RlQ2hhbmdlZCwgYXV0b2ZvY3VzLCBlbW90aWNvbnNLZXlQcmVzcywgZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlLCBjdXJyZW50U3R5bGVkQmxvY2tOb2RlLCB0cmlnZ2VyVmFsdWVDaGFuZ2VkLCB2YWx1ZUNoYW5nZWRCbHVyLCB2YWx1ZUNoYW5nZWRLZXlVcCwgYXV0b1VwZGF0ZSwgYXV0b0V4cGFuZDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFsbCB0aGUgY29tbWFuZHMgc3VwcG9ydGVkIGJ5IHRoZSBlZGl0b3JcclxuXHRcdCAqIEBuYW1lIGNvbW1hbmRzXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmNvbW1hbmRzID0gdXRpbHNcclxuXHRcdFx0LmV4dGVuZCh0cnVlLCB7fSwgKHVzZXJPcHRpb25zLmNvbW1hbmRzIHx8IGRlZmF1bHRDb21tYW5kcykpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogT3B0aW9ucyBmb3IgdGhpcyBlZGl0b3IgaW5zdGFuY2VcclxuXHRcdCAqIEBuYW1lIG9wdHNcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHZhciBvcHRpb25zID0gYmFzZS5vcHRzID0gdXRpbHMuZXh0ZW5kKFxyXG5cdFx0XHR0cnVlLCB7fSwgZGVmYXVsdE9wdGlvbnMsIHVzZXJPcHRpb25zXHJcblx0XHQpO1xyXG5cclxuXHRcdC8vIERvbid0IGRlZXAgZXh0ZW5kIGVtb3RpY29ucyAoZml4ZXMgIzU2NSlcclxuXHRcdGJhc2Uub3B0cy5lbW90aWNvbnMgPSB1c2VyT3B0aW9ucy5lbW90aWNvbnMgfHwgZGVmYXVsdE9wdGlvbnMuZW1vdGljb25zO1xyXG5cclxuXHRcdGlmICghQXJyYXkuaXNBcnJheShvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzKSkge1xyXG5cdFx0XHRvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzID0gW107XHJcblx0XHR9XHJcblx0XHRvcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzLnB1c2goJ2h0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkLycpO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgRE9NUHVyaWZ5IGZvciBlYWNoIGVkaXRvciBpbnN0YW5jZSBzbyBjYW5cclxuXHRcdC8vIGhhdmUgZGlmZmVyZW50IGFsbG93ZWQgaWZyYW1lIFVSTHNcclxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuZXctY2FwXHJcblx0XHR2YXIgZG9tUHVyaWZ5ID0gRE9NUHVyaWZ5KCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgaWZyYW1lcyBmb3IgdGhpbmdzIGxpa2UgWW91VHViZSwgc2VlOlxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvaXNzdWVzLzM0MCNpc3N1ZWNvbW1lbnQtNjcwNzU4OTgwXHJcblx0XHRkb21QdXJpZnkuYWRkSG9vaygndXBvblNhbml0aXplRWxlbWVudCcsIGZ1bmN0aW9uIChub2RlLCBkYXRhKSB7XHJcblx0XHRcdHZhciBhbGxvd2VkVXJscyA9IG9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHM7XHJcblxyXG5cdFx0XHRpZiAoZGF0YS50YWdOYW1lID09PSAnaWZyYW1lJykge1xyXG5cdFx0XHRcdHZhciBzcmMgPSBkb20uYXR0cihub2RlLCAnc3JjJykgfHwgJyc7XHJcblxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYWxsb3dlZFVybHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdHZhciB1cmwgPSBhbGxvd2VkVXJsc1tpXTtcclxuXHJcblx0XHRcdFx0XHRpZiAodXRpbHMuaXNTdHJpbmcodXJsKSAmJiBzcmMuc3Vic3RyKDAsIHVybC5sZW5ndGgpID09PSB1cmwpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIEhhbmRsZSByZWdleFxyXG5cdFx0XHRcdFx0aWYgKHVybC50ZXN0ICYmIHVybC50ZXN0KHNyYykpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gTm8gbWF0Y2ggc28gcmVtb3ZlXHJcblx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQ29udmVydCB0YXJnZXQgYXR0cmlidXRlIGludG8gZGF0YS1zY2UtdGFyZ2V0IGF0dHJpYnV0ZXMgc28gWEhUTUwgZm9ybWF0XHJcblx0XHQvLyBjYW4gYWxsb3cgdGhlbVxyXG5cdFx0ZG9tUHVyaWZ5LmFkZEhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdFx0aWYgKCd0YXJnZXQnIGluIG5vZGUpIHtcclxuXHRcdFx0XHRkb20uYXR0cihub2RlLCAnZGF0YS1zY2UtdGFyZ2V0JywgZG9tLmF0dHIobm9kZSwgJ3RhcmdldCcpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnJlbW92ZUF0dHIobm9kZSwgJ3RhcmdldCcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTYW5pdGl6ZSBIVE1MIHRvIGF2b2lkIFhTU1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9IGh0bWxcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIHNhbml0aXplKGh0bWwpIHtcclxuXHRcdFx0Y29uc3QgYWxsb3dlZFRhZ3MgPSBbJ2lmcmFtZSddLmNvbmNhdChvcHRpb25zLmFsbG93ZWRUYWdzKTtcclxuXHRcdFx0Y29uc3QgYWxsb3dlZEF0dHJzID0gWydhbGxvd2Z1bGxzY3JlZW4nLCAnZnJhbWVib3JkZXInLCAndGFyZ2V0J11cclxuXHRcdFx0XHQuY29uY2F0KG9wdGlvbnMuYWxsb3dlZEF0dHJpYnV0ZXMpO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRvbVB1cmlmeS5zYW5pdGl6ZShodG1sLCB7XHJcblx0XHRcdFx0QUREX1RBR1M6IGFsbG93ZWRUYWdzLFxyXG5cdFx0XHRcdEFERF9BVFRSOiBhbGxvd2VkQXR0cnNcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGV4dGFyZWEuX3NjZWRpdG9yID0gYmFzZTtcclxuXHJcblx0XHRcdC8vIExvYWQgbG9jYWxlXHJcblx0XHRcdGlmIChvcHRpb25zLmxvY2FsZSAmJiBvcHRpb25zLmxvY2FsZSAhPT0gJ2VuJykge1xyXG5cdFx0XHRcdGluaXRMb2NhbGUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWRpdG9yQ29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItY29udGFpbmVyJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoZWRpdG9yQ29udGFpbmVyLCB0ZXh0YXJlYSk7XHJcblx0XHRcdGRvbS5jc3MoZWRpdG9yQ29udGFpbmVyLCAnei1pbmRleCcsIG9wdGlvbnMuekluZGV4KTtcclxuXHJcblx0XHRcdGlzUmVxdWlyZWQgPSB0ZXh0YXJlYS5yZXF1aXJlZDtcclxuXHRcdFx0dGV4dGFyZWEucmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdHZhciBGb3JtYXRDdG9yID0gRW1sRWRpdG9yLmZvcm1hdHNbb3B0aW9ucy5mb3JtYXRdO1xyXG5cdFx0XHRmb3JtYXQgPSBGb3JtYXRDdG9yID8gbmV3IEZvcm1hdEN0b3IoKSA6IHt9O1xyXG5cdFx0XHQvKlxyXG5cdFx0XHQgKiBQbHVnaW5zIHNob3VsZCBiZSBpbml0aWFsaXplZCBiZWZvcmUgdGhlIGZvcm1hdHRlcnMgc2luY2VcclxuXHRcdFx0ICogdGhleSBtYXkgd2lzaCB0byBhZGQgb3IgY2hhbmdlIGZvcm1hdHRpbmcgaGFuZGxlcnMgYW5kXHJcblx0XHRcdCAqIHNpbmNlIHRoZSBiYmNvZGUgZm9ybWF0IGNhY2hlcyBpdHMgaGFuZGxlcnMsXHJcblx0XHRcdCAqIHN1Y2ggY2hhbmdlcyBtdXN0IGJlIGRvbmUgZmlyc3QuXHJcblx0XHRcdCAqL1xyXG5cdFx0XHRwbHVnaW5NYW5hZ2VyID0gbmV3IFBsdWdpbk1hbmFnZXIoYmFzZSk7XHJcblx0XHRcdChvcHRpb25zLnBsdWdpbnMgfHwgJycpLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XHJcblx0XHRcdFx0cGx1Z2luTWFuYWdlci5yZWdpc3RlcihwbHVnaW4udHJpbSgpKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmICgnaW5pdCcgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0Zm9ybWF0LmluaXQuY2FsbChiYXNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBlZGl0b3JcclxuXHRcdFx0aW5pdEVtb3RpY29ucygpO1xyXG5cdFx0XHRpbml0VG9vbEJhcigpO1xyXG5cdFx0XHRpbml0RWRpdG9yKCk7XHJcblx0XHRcdGluaXRPcHRpb25zKCk7XHJcblx0XHRcdGluaXRFdmVudHMoKTtcclxuXHJcblx0XHRcdC8vIGZvcmNlIGludG8gc291cmNlIG1vZGUgaWYgaXMgYSBicm93c2VyIHRoYXQgY2FuJ3QgaGFuZGxlXHJcblx0XHRcdC8vIGZ1bGwgZWRpdGluZ1xyXG5cdFx0XHRpZiAoIWJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkKSB7XHJcblx0XHRcdFx0YmFzZS50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHRcdHZhciBsb2FkZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZG9tLm9mZihnbG9iYWxXaW4sICdsb2FkJywgbG9hZGVkKTtcclxuXHJcblx0XHRcdFx0aWYgKG9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0XHRhdXRvZm9jdXMoISFvcHRpb25zLmF1dG9mb2N1c0VuZCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRhdXRvRXhwYW5kKCk7XHJcblx0XHRcdFx0YXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0XHRcdC8vIFRPRE86IHVzZSBlZGl0b3IgZG9jIGFuZCB3aW5kb3c/XHJcblx0XHRcdFx0cGx1Z2luTWFuYWdlci5jYWxsKCdyZWFkeScpO1xyXG5cdFx0XHRcdGlmICgnb25SZWFkeScgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0XHRmb3JtYXQub25SZWFkeS5jYWxsKGJhc2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbFdpbiwgJ2xvYWQnLCBsb2FkZWQpO1xyXG5cdFx0XHRpZiAoZ2xvYmFsRG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuXHRcdFx0XHRsb2FkZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluaXQgdGhlIGxvY2FsZSB2YXJpYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbG9jYWxlIGlmIHBvc3NpYmxlXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICogQHJldHVybiB2b2lkXHJcblx0XHQgKi9cclxuXHRcdGluaXRMb2NhbGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBsYW5nO1xyXG5cclxuXHRcdFx0bG9jYWxlID0gRW1sRWRpdG9yLmxvY2FsZVtvcHRpb25zLmxvY2FsZV07XHJcblxyXG5cdFx0XHRpZiAoIWxvY2FsZSkge1xyXG5cdFx0XHRcdGxhbmcgPSBvcHRpb25zLmxvY2FsZS5zcGxpdCgnLScpO1xyXG5cdFx0XHRcdGxvY2FsZSA9IEVtbEVkaXRvci5sb2NhbGVbbGFuZ1swXV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExvY2FsZSBEYXRlVGltZSBmb3JtYXQgb3ZlcnJpZGVzIGFueSBzcGVjaWZpZWQgaW4gdGhlIG9wdGlvbnNcclxuXHRcdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGUuZGF0ZUZvcm1hdCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuZGF0ZUZvcm1hdCA9IGxvY2FsZS5kYXRlRm9ybWF0O1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGlmcmFtZSBhbmQgdGV4dGFyZWFcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGluaXRFZGl0b3IgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNvdXJjZUVkaXRvciA9IGRvbS5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xyXG5cdFx0XHR3eXNpd3lnRWRpdG9yID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScsIHtcclxuXHRcdFx0XHRmcmFtZWJvcmRlcjogMCxcclxuXHRcdFx0XHRhbGxvd2Z1bGxzY3JlZW46IHRydWVcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvKlxyXG5cdFx0XHQgKiBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgcmlnaHQgYWZ0ZXIgdGhleSBhcmUgY3JlYXRlZCBiZWNhdXNlLFxyXG5cdFx0XHQgKiBmb3IgYW55IHJlYXNvbiwgdGhlIHVzZXIgbWF5IG5vdCB3YW50IHRoZSB2YWx1ZSB0byBiZSB0aW5rZXJlZFxyXG5cdFx0XHQgKiBieSBhbnkgZmlsdGVycy5cclxuXHRcdFx0ICovXHJcblx0XHRcdGlmIChvcHRpb25zLnN0YXJ0SW5Tb3VyY2VNb2RlKSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3NvdXJjZU1vZGUnKTtcclxuXHRcdFx0XHRkb20uaGlkZSh3eXNpd3lnRWRpdG9yKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkb20uYWRkQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnd3lzaXd5Z01vZGUnKTtcclxuXHRcdFx0XHRkb20uaGlkZShzb3VyY2VFZGl0b3IpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIW9wdGlvbnMuc3BlbGxjaGVjaykge1xyXG5cdFx0XHRcdGRvbS5hdHRyKGVkaXRvckNvbnRhaW5lciwgJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGdsb2JhbFdpbi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcclxuXHRcdFx0XHRkb20uYXR0cih3eXNpd3lnRWRpdG9yLCAnc3JjJywgJ2Fib3V0OmJsYW5rJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEFkZCB0aGUgZWRpdG9yIHRvIHRoZSBjb250YWluZXJcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGVkaXRvckNvbnRhaW5lciwgd3lzaXd5Z0VkaXRvcik7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIHNvdXJjZUVkaXRvcik7XHJcblxyXG5cdFx0XHQvLyBUT0RPOiBtYWtlIHRoaXMgb3B0aW9uYWwgc29tZWhvd1xyXG5cdFx0XHRiYXNlLmRpbWVuc2lvbnMoXHJcblx0XHRcdFx0b3B0aW9ucy53aWR0aCB8fCBkb20ud2lkdGgodGV4dGFyZWEpLFxyXG5cdFx0XHRcdG9wdGlvbnMuaGVpZ2h0IHx8IGRvbS5oZWlnaHQodGV4dGFyZWEpXHJcblx0XHRcdCk7XHJcblxyXG5cdFx0XHQvLyBBZGQgaW9zIHRvIEhUTUwgc28gY2FuIGFwcGx5IENTUyBmaXggdG8gb25seSBpdFxyXG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gYnJvd3Nlci5pb3MgPyAnIGlvcycgOiAnJztcclxuXHJcblx0XHRcdHd5c2l3eWdEb2N1bWVudCA9IHd5c2l3eWdFZGl0b3IuY29udGVudERvY3VtZW50O1xyXG5cdFx0XHR3eXNpd3lnRG9jdW1lbnQub3BlbigpO1xyXG5cdFx0XHR3eXNpd3lnRG9jdW1lbnQud3JpdGUoX3RtcGwoJ2h0bWwnLCB7XHJcblx0XHRcdFx0YXR0cnM6ICcgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiJyxcclxuXHRcdFx0XHRzcGVsbGNoZWNrOiBvcHRpb25zLnNwZWxsY2hlY2sgPyAnJyA6ICdzcGVsbGNoZWNrPVwiZmFsc2VcIicsXHJcblx0XHRcdFx0Y2hhcnNldDogb3B0aW9ucy5jaGFyc2V0LFxyXG5cdFx0XHRcdHN0eWxlOiBvcHRpb25zLnN0eWxlXHJcblx0XHRcdH0pKTtcclxuXHRcdFx0d3lzaXd5Z0RvY3VtZW50LmNsb3NlKCk7XHJcblxyXG5cdFx0XHR3eXNpd3lnQm9keSA9IHd5c2l3eWdEb2N1bWVudC5ib2R5O1xyXG5cdFx0XHR3eXNpd3lnV2luZG93ID0gd3lzaXd5Z0VkaXRvci5jb250ZW50V2luZG93O1xyXG5cclxuXHRcdFx0YmFzZS5yZWFkT25seSghIW9wdGlvbnMucmVhZE9ubHkpO1xyXG5cclxuXHRcdFx0Ly8gaWZyYW1lIG92ZXJmbG93IGZpeCBmb3IgaU9TXHJcblx0XHRcdGlmIChicm93c2VyLmlvcykge1xyXG5cdFx0XHRcdGRvbS5oZWlnaHQod3lzaXd5Z0JvZHksICcxMDAlJyk7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBiYXNlLmZvY3VzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRhYkluZGV4ID0gZG9tLmF0dHIodGV4dGFyZWEsICd0YWJpbmRleCcpO1xyXG5cdFx0XHRkb20uYXR0cihzb3VyY2VFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHRcdFx0ZG9tLmF0dHIod3lzaXd5Z0VkaXRvciwgJ3RhYmluZGV4JywgdGFiSW5kZXgpO1xyXG5cclxuXHRcdFx0cmFuZ2VIZWxwZXIgPSBuZXcgUmFuZ2VIZWxwZXIod3lzaXd5Z1dpbmRvdywgbnVsbCwgc2FuaXRpemUpO1xyXG5cclxuXHRcdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRcdGRvbS5oaWRlKHRleHRhcmVhKTtcclxuXHRcdFx0YmFzZS52YWwodGV4dGFyZWEudmFsdWUpO1xyXG5cclxuXHRcdFx0dmFyIHBsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fFxyXG5cdFx0XHRcdGRvbS5hdHRyKHRleHRhcmVhLCAncGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRcdGlmIChwbGFjZWhvbGRlcikge1xyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG5cdFx0XHRcdGRvbS5hdHRyKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbml0aWFsaXNlcyBvcHRpb25zXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRpbml0T3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gYXV0by11cGRhdGUgb3JpZ2luYWwgdGV4dGJveCBvbiBibHVyIGlmIG9wdGlvbiBzZXQgdG8gdHJ1ZVxyXG5cdFx0XHRpZiAob3B0aW9ucy5hdXRvVXBkYXRlKSB7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIGF1dG9VcGRhdGUpO1xyXG5cdFx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdibHVyJywgYXV0b1VwZGF0ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChvcHRpb25zLnJ0bCA9PT0gbnVsbCkge1xyXG5cdFx0XHRcdG9wdGlvbnMucnRsID0gZG9tLmNzcyhzb3VyY2VFZGl0b3IsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGJhc2UucnRsKCEhb3B0aW9ucy5ydGwpO1xyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMuYXV0b0V4cGFuZCkge1xyXG5cdFx0XHRcdC8vIE5lZWQgdG8gdXBkYXRlIHdoZW4gaW1hZ2VzIChvciBhbnl0aGluZyBlbHNlKSBsb2Fkc1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2xvYWQnLCBhdXRvRXhwYW5kLCBkb20uRVZFTlRfQ0FQVFVSRSk7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnaW5wdXQga2V5dXAnLCBhdXRvRXhwYW5kKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG9wdGlvbnMucmVzaXplRW5hYmxlZCkge1xyXG5cdFx0XHRcdGluaXRSZXNpemUoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLmF0dHIoZWRpdG9yQ29udGFpbmVyLCAnaWQnLCBvcHRpb25zLmlkKTtcclxuXHRcdFx0YmFzZS5lbW90aWNvbnMob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbml0aWFsaXNlcyBldmVudHNcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGZ1bmN0aW9uIGluaXRFdmVudHMoKSB7XHJcblx0XHRcdHZhciBmb3JtID0gdGV4dGFyZWEuZm9ybTtcclxuXHRcdFx0dmFyIGNvbXBvc2l0aW9uRXZlbnRzID0gJ2NvbXBvc2l0aW9uc3RhcnQgY29tcG9zaXRpb25lbmQnO1xyXG5cdFx0XHR2YXIgZXZlbnRzVG9Gb3J3YXJkID0gJ2tleWRvd24ga2V5dXAga2V5cHJlc3MgZm9jdXMgYmx1ciBjb250ZXh0bWVudSBpbnB1dCc7XHJcblx0XHRcdHZhciBjaGVja1NlbGVjdGlvbkV2ZW50cyA9ICdvbnNlbGVjdGlvbmNoYW5nZScgaW4gd3lzaXd5Z0RvY3VtZW50ID9cclxuXHRcdFx0XHQnc2VsZWN0aW9uY2hhbmdlJyA6XHJcblx0XHRcdFx0J2tleXVwIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgbW91c2V1cCB0b3VjaGVuZCBjbGljayc7XHJcblxyXG5cdFx0XHRkb20ub24oZ2xvYmFsRG9jLCAnY2xpY2snLCBoYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHRcdGlmIChmb3JtKSB7XHJcblx0XHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdFx0ZG9tLm9uKGZvcm0sICdzdWJtaXQnLCBiYXNlLnVwZGF0ZU9yaWdpbmFsLCBkb20uRVZFTlRfQ0FQVFVSRSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5vbih3aW5kb3csICdwYWdlaGlkZScsIGJhc2UudXBkYXRlT3JpZ2luYWwpO1xyXG5cdFx0XHRkb20ub24od2luZG93LCAncGFnZXNob3cnLCBoYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIGhhbmRsZUtleVByZXNzKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5ZG93bicsIGhhbmRsZUtleURvd24pO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXlkb3duJywgaGFuZGxlQmFja1NwYWNlKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCBhcHBlbmROZXdMaW5lKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnYmx1cicsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdrZXl1cCcsIHZhbHVlQ2hhbmdlZEtleVVwKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAncGFzdGUnLCBoYW5kbGVQYXN0ZUV2dCk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2N1dCBjb3B5JywgaGFuZGxlQ3V0Q29weUV2dCk7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgY29tcG9zaXRpb25FdmVudHMsIGhhbmRsZUNvbXBvc2l0aW9uKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCBjaGVja1NlbGVjdGlvbkV2ZW50cywgY2hlY2tTZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCBldmVudHNUb0ZvcndhcmQsIGhhbmRsZUV2ZW50KTtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLmVtb3RpY29uc0NvbXBhdCAmJiBnbG9iYWxXaW4uZ2V0U2VsZWN0aW9uKSB7XHJcblx0XHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAna2V5dXAnLCBlbW90aWNvbnNDaGVja1doaXRlc3BhY2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ub24od3lzaXd5Z0JvZHksICdibHVyJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGlmICghYmFzZS52YWwoKSkge1xyXG5cdFx0XHRcdFx0ZG9tLmFkZENsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdCb2R5LCAnZm9jdXMnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRkb20ub24oc291cmNlRWRpdG9yLCAnYmx1cicsIHZhbHVlQ2hhbmdlZEJsdXIpO1xyXG5cdFx0XHRkb20ub24oc291cmNlRWRpdG9yLCAna2V5dXAnLCB2YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsICdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGNvbXBvc2l0aW9uRXZlbnRzLCBoYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRcdGRvbS5vbihzb3VyY2VFZGl0b3IsIGV2ZW50c1RvRm9yd2FyZCwgaGFuZGxlRXZlbnQpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKHd5c2l3eWdEb2N1bWVudCwgJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlRG93bik7XHJcblx0XHRcdGRvbS5vbih3eXNpd3lnRG9jdW1lbnQsIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBjaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0XHRkb20ub24od3lzaXd5Z0RvY3VtZW50LCAna2V5dXAnLCBhcHBlbmROZXdMaW5lKTtcclxuXHJcblx0XHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgY2hlY2tOb2RlQ2hhbmdlZCk7XHJcblx0XHRcdGRvbS5vbihlZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgdXBkYXRlQWN0aXZlQnV0dG9ucyk7XHJcblx0XHRcdC8vIEN1c3RvbSBldmVudHMgdG8gZm9yd2FyZFxyXG5cdFx0XHRkb20ub24oXHJcblx0XHRcdFx0ZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHRcdCdzZWxlY3Rpb25jaGFuZ2VkIHZhbHVlY2hhbmdlZCBub2RlY2hhbmdlZCBwYXN0ZXJhdyBwYXN0ZScsXHJcblx0XHRcdFx0aGFuZGxlRXZlbnRcclxuXHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDcmVhdGVzIHRoZSB0b29sYmFyIGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBjb250YWluZXJcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdGluaXRUb29sQmFyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgZ3JvdXAsIGNvbW1hbmRzID0gYmFzZS5jb21tYW5kcywgZXhjbHVkZSA9IChvcHRpb25zLnRvb2xiYXJFeGNsdWRlIHx8ICcnKS5zcGxpdCgnLCcpLCBncm91cHMgPSBvcHRpb25zLnRvb2xiYXIuc3BsaXQoJ3wnKTtcclxuXHJcblx0XHRcdHRvb2xiYXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0XHR1bnNlbGVjdGFibGU6ICdvbidcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5pY29ucyBpbiBFbWxFZGl0b3IuaWNvbnMpIHtcclxuXHRcdFx0XHRpY29ucyA9IG5ldyBFbWxFZGl0b3IuaWNvbnNbb3B0aW9ucy5pY29uc10oKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dXRpbHMuZWFjaChncm91cHMsIGZ1bmN0aW9uIChfLCBtZW51SXRlbXMpIHtcclxuXHRcdFx0XHRncm91cCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItZ3JvdXAnXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHV0aWxzLmVhY2gobWVudUl0ZW1zLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChfLCBjb21tYW5kTmFtZSkge1xyXG5cdFx0XHRcdFx0dmFyIGJ1dHRvbiwgc2hvcnRjdXQsIGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kTmFtZV07XHJcblxyXG5cdFx0XHRcdFx0Ly8gVGhlIGNvbW1hbmROYW1lIG11c3QgYmUgYSB2YWxpZCBjb21tYW5kIGFuZCBub3QgZXhjbHVkZWRcclxuXHRcdFx0XHRcdGlmICghY29tbWFuZCB8fCBleGNsdWRlLmluZGV4T2YoY29tbWFuZE5hbWUpID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHNob3J0Y3V0ID0gY29tbWFuZC5zaG9ydGN1dDtcclxuXHRcdFx0XHRcdGJ1dHRvbiA9IF90bXBsKCd0b29sYmFyQnV0dG9uJywge1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0ZGlzcE5hbWU6IGJhc2UuXyhjb21tYW5kLm5hbWUgfHxcclxuXHRcdFx0XHRcdFx0XHRjb21tYW5kLnRvb2x0aXAgfHwgY29tbWFuZE5hbWUpXHJcblx0XHRcdFx0XHR9LCB0cnVlKS5maXJzdENoaWxkO1xyXG5cclxuXHRcdFx0XHRcdGlmIChpY29ucyAmJiBpY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0XHRcdFx0dmFyIGljb24gPSBpY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdFx0XHRpZiAoaWNvbikge1xyXG5cdFx0XHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUoaWNvbnMuY3JlYXRlKGNvbW1hbmROYW1lKSxcclxuXHRcdFx0XHRcdFx0XHRcdGJ1dHRvbi5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0XHRkb20uYWRkQ2xhc3MoYnV0dG9uLCAnaGFzLWljb24nKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJ1dHRvbi5fc2NlVHh0TW9kZSA9ICEhY29tbWFuZC50eHRFeGVjO1xyXG5cdFx0XHRcdFx0YnV0dG9uLl9zY2VXeXNpd3lnTW9kZSA9ICEhY29tbWFuZC5leGVjO1xyXG5cdFx0XHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJywgIWNvbW1hbmQuZXhlYyk7XHJcblx0XHRcdFx0XHRkb20ub24oYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIWRvbS5oYXNDbGFzcyhidXR0b24sICdkaXNhYmxlZCcpKSB7XHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlQ29tbWFuZChidXR0b24sIGNvbW1hbmQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHR1cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gUHJldmVudCBlZGl0b3IgbG9zaW5nIGZvY3VzIHdoZW4gYnV0dG9uIGNsaWNrZWRcclxuXHRcdFx0XHRcdGRvbS5vbihidXR0b24sICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0XHRiYXNlLmNsb3NlRHJvcERvd24oKTtcclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbW1hbmQudG9vbHRpcCkge1xyXG5cdFx0XHRcdFx0XHRkb20uYXR0cihidXR0b24sICd0aXRsZScsXHJcblx0XHRcdFx0XHRcdFx0YmFzZS5fKGNvbW1hbmQudG9vbHRpcCkgK1xyXG5cdFx0XHRcdFx0XHRcdChzaG9ydGN1dCA/ICcgKCcgKyBzaG9ydGN1dCArICcpJyA6ICcnKVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChzaG9ydGN1dCkge1xyXG5cdFx0XHRcdFx0XHRiYXNlLmFkZFNob3J0Y3V0KHNob3J0Y3V0LCBjb21tYW5kTmFtZSk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbW1hbmQuc3RhdGUpIHtcclxuXHRcdFx0XHRcdFx0YnRuU3RhdGVIYW5kbGVycy5wdXNoKHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZTogY29tbWFuZC5zdGF0ZVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0Ly8gZXhlYyBzdHJpbmcgY29tbWFuZHMgY2FuIGJlIHBhc3NlZCB0byBxdWVyeUNvbW1hbmRTdGF0ZVxyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh1dGlscy5pc1N0cmluZyhjb21tYW5kLmV4ZWMpKSB7XHJcblx0XHRcdFx0XHRcdGJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTogY29tbWFuZE5hbWUsXHJcblx0XHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuZXhlY1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZ3JvdXAsIGJ1dHRvbik7XHJcblx0XHRcdFx0XHR0b29sYmFyQnV0dG9uc1tjb21tYW5kTmFtZV0gPSBidXR0b247XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdC8vIEV4Y2x1ZGUgZW1wdHkgZ3JvdXBzXHJcblx0XHRcdFx0aWYgKGdyb3VwLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0b29sYmFyLCBncm91cCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIEFwcGVuZCB0aGUgdG9vbGJhciB0byB0aGUgdG9vbGJhckNvbnRhaW5lciBvcHRpb24gaWYgZ2l2ZW5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKG9wdGlvbnMudG9vbGJhckNvbnRhaW5lciB8fCBlZGl0b3JDb250YWluZXIsIHRvb2xiYXIpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgdGhlIHJlc2l6ZXIuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRpbml0UmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgbWluSGVpZ2h0LCBtYXhIZWlnaHQsIG1pbldpZHRoLCBtYXhXaWR0aCwgbW91c2VNb3ZlRnVuYywgbW91c2VVcEZ1bmMsIGdyaXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1ncmlwJ1xyXG5cdFx0XHR9KSxcclxuXHRcdFx0XHQvLyBDb3ZlciBpcyB1c2VkIHRvIGNvdmVyIHRoZSBlZGl0b3IgaWZyYW1lIHNvIGRvY3VtZW50XHJcblx0XHRcdFx0Ly8gc3RpbGwgZ2V0cyBtb3VzZSBtb3ZlIGV2ZW50c1xyXG5cdFx0XHRcdGNvdmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1yZXNpemUtY292ZXInXHJcblx0XHRcdFx0fSksIG1vdmVFdmVudHMgPSAndG91Y2htb3ZlIG1vdXNlbW92ZScsIGVuZEV2ZW50cyA9ICd0b3VjaGNhbmNlbCB0b3VjaGVuZCBtb3VzZXVwJywgc3RhcnRYID0gMCwgc3RhcnRZID0gMCwgbmV3WCA9IDAsIG5ld1kgPSAwLCBzdGFydFdpZHRoID0gMCwgc3RhcnRIZWlnaHQgPSAwLCBvcmlnV2lkdGggPSBkb20ud2lkdGgoZWRpdG9yQ29udGFpbmVyKSwgb3JpZ0hlaWdodCA9IGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKSwgaXNEcmFnZ2luZyA9IGZhbHNlLCBydGwgPSBiYXNlLnJ0bCgpO1xyXG5cclxuXHRcdFx0bWluSGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgb3JpZ0hlaWdodCAvIDEuNTtcclxuXHRcdFx0bWF4SGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVNYXhIZWlnaHQgfHwgb3JpZ0hlaWdodCAqIDIuNTtcclxuXHRcdFx0bWluV2lkdGggPSBvcHRpb25zLnJlc2l6ZU1pbldpZHRoIHx8IG9yaWdXaWR0aCAvIDEuMjU7XHJcblx0XHRcdG1heFdpZHRoID0gb3B0aW9ucy5yZXNpemVNYXhXaWR0aCB8fCBvcmlnV2lkdGggKiAxLjI1O1xyXG5cclxuXHRcdFx0bW91c2VNb3ZlRnVuYyA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0Ly8gaU9TIHVzZXMgd2luZG93LmV2ZW50XHJcblx0XHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcclxuXHRcdFx0XHRcdGUgPSBnbG9iYWxXaW4uZXZlbnQ7XHJcblx0XHRcdFx0XHRuZXdYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRcdG5ld1kgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRuZXdYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRcdG5ld1kgPSBlLnBhZ2VZO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIG5ld0hlaWdodCA9IHN0YXJ0SGVpZ2h0ICsgKG5ld1kgLSBzdGFydFkpLCBuZXdXaWR0aCA9IHJ0bCA/XHJcblx0XHRcdFx0XHRzdGFydFdpZHRoIC0gKG5ld1ggLSBzdGFydFgpIDpcclxuXHRcdFx0XHRcdHN0YXJ0V2lkdGggKyAobmV3WCAtIHN0YXJ0WCk7XHJcblxyXG5cdFx0XHRcdGlmIChtYXhXaWR0aCA+IDAgJiYgbmV3V2lkdGggPiBtYXhXaWR0aCkge1xyXG5cdFx0XHRcdFx0bmV3V2lkdGggPSBtYXhXaWR0aDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1pbldpZHRoID4gMCAmJiBuZXdXaWR0aCA8IG1pbldpZHRoKSB7XHJcblx0XHRcdFx0XHRuZXdXaWR0aCA9IG1pbldpZHRoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoIW9wdGlvbnMucmVzaXplV2lkdGgpIHtcclxuXHRcdFx0XHRcdG5ld1dpZHRoID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAobWF4SGVpZ2h0ID4gMCAmJiBuZXdIZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuXHRcdFx0XHRcdG5ld0hlaWdodCA9IG1heEhlaWdodDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKG1pbkhlaWdodCA+IDAgJiYgbmV3SGVpZ2h0IDwgbWluSGVpZ2h0KSB7XHJcblx0XHRcdFx0XHRuZXdIZWlnaHQgPSBtaW5IZWlnaHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICghb3B0aW9ucy5yZXNpemVIZWlnaHQpIHtcclxuXHRcdFx0XHRcdG5ld0hlaWdodCA9IGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG5ld1dpZHRoIHx8IG5ld0hlaWdodCkge1xyXG5cdFx0XHRcdFx0YmFzZS5kaW1lbnNpb25zKG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0bW91c2VVcEZ1bmMgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdGlmICghaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRkb20uaGlkZShjb3Zlcik7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XHJcblx0XHRcdFx0ZG9tLm9mZihnbG9iYWxEb2MsIG1vdmVFdmVudHMsIG1vdXNlTW92ZUZ1bmMpO1xyXG5cdFx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG1vdXNlVXBGdW5jKTtcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKGljb25zICYmIGljb25zLmNyZWF0ZSkge1xyXG5cdFx0XHRcdHZhciBpY29uID0gaWNvbnMuY3JlYXRlKCdncmlwJyk7XHJcblx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChncmlwLCBpY29uKTtcclxuXHRcdFx0XHRcdGRvbS5hZGRDbGFzcyhncmlwLCAnaGFzLWljb24nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIGdyaXApO1xyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdG9yQ29udGFpbmVyLCBjb3Zlcik7XHJcblx0XHRcdGRvbS5oaWRlKGNvdmVyKTtcclxuXHJcblx0XHRcdGRvbS5vbihncmlwLCAndG91Y2hzdGFydCBtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdC8vIGlPUyB1c2VzIHdpbmRvdy5ldmVudFxyXG5cdFx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG5cdFx0XHRcdFx0ZSA9IGdsb2JhbFdpbi5ldmVudDtcclxuXHRcdFx0XHRcdHN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRcdHN0YXJ0WSA9IGUudG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3RhcnRYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRcdHN0YXJ0WSA9IGUucGFnZVk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzdGFydFdpZHRoID0gZG9tLndpZHRoKGVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdFx0c3RhcnRIZWlnaHQgPSBkb20uaGVpZ2h0KGVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdFx0aXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhlZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRcdGRvbS5zaG93KGNvdmVyKTtcclxuXHRcdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG1vdXNlVXBGdW5jKTtcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBQcmVmaXhlcyBhbmQgcHJlbG9hZHMgdGhlIGVtb3RpY29uIGltYWdlc1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aW5pdEVtb3RpY29ucyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGVtb3RpY29ucyA9IG9wdGlvbnMuZW1vdGljb25zO1xyXG5cdFx0XHR2YXIgcm9vdCA9IG9wdGlvbnMuZW1vdGljb25zUm9vdCB8fCAnJztcclxuXHJcblx0XHRcdGlmIChlbW90aWNvbnMpIHtcclxuXHRcdFx0XHRhbGxFbW90aWNvbnMgPSB1dGlscy5leHRlbmQoXHJcblx0XHRcdFx0XHR7fSwgZW1vdGljb25zLm1vcmUsIGVtb3RpY29ucy5kcm9wZG93biwgZW1vdGljb25zLmhpZGRlblxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHV0aWxzLmVhY2goYWxsRW1vdGljb25zLCBmdW5jdGlvbiAoa2V5LCB1cmwpIHtcclxuXHRcdFx0XHRhbGxFbW90aWNvbnNba2V5XSA9IF90bXBsKCdlbW90aWNvbicsIHtcclxuXHRcdFx0XHRcdGtleToga2V5LFxyXG5cdFx0XHRcdFx0Ly8gUHJlZml4IGVtb3RpY29uIHJvb3QgdG8gZW1vdGljb24gdXJsc1xyXG5cdFx0XHRcdFx0dXJsOiByb290ICsgKHVybC51cmwgfHwgdXJsKSxcclxuXHRcdFx0XHRcdHRvb2x0aXA6IHVybC50b29sdGlwIHx8IGtleVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvLyBQcmVsb2FkIHRoZSBlbW90aWNvblxyXG5cdFx0XHRcdGlmIChvcHRpb25zLmVtb3RpY29uc0VuYWJsZWQpIHtcclxuXHRcdFx0XHRcdHByZUxvYWRDYWNoZS5wdXNoKGRvbS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRcdHNyYzogcm9vdCArICh1cmwudXJsIHx8IHVybClcclxuXHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEF1dG9mb2N1cyB0aGUgZWRpdG9yXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRhdXRvZm9jdXMgPSBmdW5jdGlvbiAoZm9jdXNFbmQpIHtcclxuXHRcdFx0dmFyIHJhbmdlLCB0eHRQb3MsIG5vZGUgPSB3eXNpd3lnQm9keS5maXJzdENoaWxkO1xyXG5cclxuXHRcdFx0Ly8gQ2FuJ3QgZm9jdXMgaW52aXNpYmxlIGVsZW1lbnRzXHJcblx0XHRcdGlmICghZG9tLmlzVmlzaWJsZShlZGl0b3JDb250YWluZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoYmFzZS5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHR0eHRQb3MgPSBmb2N1c0VuZCA/IHNvdXJjZUVkaXRvci52YWx1ZS5sZW5ndGggOiAwO1xyXG5cclxuXHRcdFx0XHRzb3VyY2VFZGl0b3Iuc2V0U2VsZWN0aW9uUmFuZ2UodHh0UG9zLCB0eHRQb3MpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKHd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdGlmICghKG5vZGUgPSB3eXNpd3lnQm9keS5sYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0XHRub2RlID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3eXNpd3lnQm9keSwgbm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR3aGlsZSAobm9kZS5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLmxhc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0XHQvLyBTaG91bGQgcGxhY2UgdGhlIGN1cnNvciBiZWZvcmUgdGhlIGxhc3QgPGJyPlxyXG5cdFx0XHRcdFx0aWYgKGRvbS5pcyhub2RlLCAnYnInKSAmJiBub2RlLnByZXZpb3VzU2libGluZykge1xyXG5cdFx0XHRcdFx0XHRub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZSA9IHd5c2l3eWdEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKCFkb20uY2FuSGF2ZUNoaWxkcmVuKG5vZGUpKSB7XHJcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUobm9kZSk7XHJcblxyXG5cdFx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRBZnRlcihub2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZSghZm9jdXNFbmQpO1xyXG5cdFx0XHRyYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSByYW5nZTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdHd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHd5c2l3eWdCb2R5LnNjcm9sbEhlaWdodDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YmFzZS5mb2N1cygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgaWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHlcclxuXHRcdCAqXHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIHJlYWRPbmx5XHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHlcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJlYWRPbmx5XHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIHJlYWRPbmx5XjJcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKi9cclxuXHRcdGJhc2UucmVhZE9ubHkgPSBmdW5jdGlvbiAocmVhZE9ubHkpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiByZWFkT25seSAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdFx0cmV0dXJuICFzb3VyY2VFZGl0b3IucmVhZG9ubHk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHd5c2l3eWdCb2R5LmNvbnRlbnRFZGl0YWJsZSA9ICFyZWFkT25seTtcclxuXHRcdFx0c291cmNlRWRpdG9yLnJlYWRvbmx5ID0gIXJlYWRPbmx5O1xyXG5cclxuXHRcdFx0dXBkYXRlVG9vbEJhcihyZWFkT25seSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGlmIHRoZSBlZGl0b3IgaXMgaW4gUlRMIG1vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIHJ0bFxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqL1xyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgaW4gUlRMIG1vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSBydGxeMlxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5ydGwgPSBmdW5jdGlvbiAocnRsKSB7XHJcblx0XHRcdHZhciBkaXIgPSBydGwgPyAncnRsJyA6ICdsdHInO1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBydGwgIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRcdHJldHVybiBkb20uYXR0cihzb3VyY2VFZGl0b3IsICdkaXInKSA9PT0gJ3J0bCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hdHRyKHd5c2l3eWdCb2R5LCAnZGlyJywgZGlyKTtcclxuXHRcdFx0ZG9tLmF0dHIoc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcclxuXHJcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyhlZGl0b3JDb250YWluZXIsICdydGwnKTtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ2x0cicpO1xyXG5cdFx0XHRkb20uYWRkQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCBkaXIpO1xyXG5cclxuXHRcdFx0aWYgKGljb25zICYmIGljb25zLnJ0bCkge1xyXG5cdFx0XHRcdGljb25zLnJ0bChydGwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBVcGRhdGVzIHRoZSB0b29sYmFyIHRvIGRpc2FibGUvZW5hYmxlIHRoZSBhcHByb3ByaWF0ZSBidXR0b25zXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR1cGRhdGVUb29sQmFyID0gZnVuY3Rpb24gKGRpc2FibGUpIHtcclxuXHRcdFx0dmFyIG1vZGUgPSBiYXNlLmluU291cmNlTW9kZSgpID8gJ19zY2VUeHRNb2RlJyA6ICdfc2NlV3lzaXd5Z01vZGUnO1xyXG5cclxuXHRcdFx0dXRpbHMuZWFjaCh0b29sYmFyQnV0dG9ucywgZnVuY3Rpb24gKF8sIGJ1dHRvbikge1xyXG5cdFx0XHRcdGRvbS50b2dnbGVDbGFzcyhidXR0b24sICdkaXNhYmxlZCcsIGRpc2FibGUgfHwgIWJ1dHRvblttb2RlXSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHdpZHRoIG9mIHRoZSBlZGl0b3IgaW4gcGl4ZWxzXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSB3aWR0aFxyXG5cdFx0ICogQHJldHVybiB7bnVtYmVyfVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgdGhlIHdpZHRoIG9mIHRoZSBlZGl0b3JcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggV2lkdGggaW4gcGl4ZWxzXHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIHdpZHRoXjJcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKi9cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyB0aGUgd2lkdGggb2YgdGhlIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIFRoZSBzYXZlV2lkdGggc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIHdpZHRoLiBUaGUgc3RvcmVkIHdpZHRoIGNhbiBiZVxyXG5cdFx0ICogdXNlZCBmb3IgdGhpbmdzIGxpa2UgcmVzdG9yaW5nIGZyb20gbWF4aW1pemVkIHN0YXRlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSAgICAgd2lkdGggICAgICAgICAgICBXaWR0aCBpbiBwaXhlbHNcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn1cdFtzYXZlV2lkdGg9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIHdpZHRoXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIHdpZHRoXjNcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKi9cclxuXHRcdGJhc2Uud2lkdGggPSBmdW5jdGlvbiAod2lkdGgsIHNhdmVXaWR0aCkge1xyXG5cdFx0XHRpZiAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvbS53aWR0aChlZGl0b3JDb250YWluZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRiYXNlLmRpbWVuc2lvbnMod2lkdGgsIG51bGwsIHNhdmVXaWR0aCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIHdpZHRoIGFuZCBoZWlnaHRcclxuXHRcdCAqIHdoaWNoIGFyZSB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgZWRpdG9yIGluIHB4LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQG5hbWUgZGltZW5zaW9uc1xyXG5cdFx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIDxwPlNldHMgdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGVkaXRvci48L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogPHA+SWYgd2lkdGggb3IgaGVpZ2h0IGlzIG5vdCBudW1lcmljIGl0IGlzIGlnbm9yZWQuPC9wPlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfVx0d2lkdGhcdFdpZHRoIGluIHB4XHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn1cdGhlaWdodFx0SGVpZ2h0IGluIHB4XHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIGRpbWVuc2lvbnNeMlxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0LyoqXHJcblx0XHQgKiA8cD5TZXRzIHRoZSB3aWR0aCBhbmQvb3IgaGVpZ2h0IG9mIHRoZSBlZGl0b3IuPC9wPlxyXG5cdFx0ICpcclxuXHRcdCAqIDxwPklmIHdpZHRoIG9yIGhlaWdodCBpcyBub3QgbnVtZXJpYyBpdCBpcyBpZ25vcmVkLjwvcD5cclxuXHRcdCAqXHJcblx0XHQgKiA8cD5UaGUgc2F2ZSBhcmd1bWVudCBzcGVjaWZpZXMgaWYgdG8gc2F2ZSB0aGUgbmV3IHNpemVzLlxyXG5cdFx0ICogVGhlIHNhdmVkIHNpemVzIGNhbiBiZSB1c2VkIGZvciB0aGluZ3MgbGlrZSByZXN0b3JpbmcgZnJvbVxyXG5cdFx0ICogbWF4aW1pemVkIHN0YXRlLiBUaGlzIHNob3VsZCBub3JtYWxseSBiZSBsZWZ0IGFzIHRydWUuPC9wPlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfVx0XHR3aWR0aFx0XHRXaWR0aCBpbiBweFxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdGhlaWdodFx0XHRIZWlnaHQgaW4gcHhcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn1cdFtzYXZlPXRydWVdXHRJZiB0byBzdG9yZSB0aGUgbmV3IHNpemVzXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIGRpbWVuc2lvbnNeM1xyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5kaW1lbnNpb25zID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHNhdmUpIHtcclxuXHRcdFx0Ly8gc2V0IHVuZGVmaW5lZCB3aWR0aC9oZWlnaHQgdG8gYm9vbGVhbiBmYWxzZVxyXG5cdFx0XHR3aWR0aCA9ICghd2lkdGggJiYgd2lkdGggIT09IDApID8gZmFsc2UgOiB3aWR0aDtcclxuXHRcdFx0aGVpZ2h0ID0gKCFoZWlnaHQgJiYgaGVpZ2h0ICE9PSAwKSA/IGZhbHNlIDogaGVpZ2h0O1xyXG5cclxuXHRcdFx0aWYgKHdpZHRoID09PSBmYWxzZSAmJiBoZWlnaHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHsgd2lkdGg6IGJhc2Uud2lkdGgoKSwgaGVpZ2h0OiBiYXNlLmhlaWdodCgpIH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh3aWR0aCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRpZiAoc2F2ZSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRvbS53aWR0aChlZGl0b3JDb250YWluZXIsIHdpZHRoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGhlaWdodCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRpZiAoc2F2ZSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHRcdG9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLmhlaWdodChlZGl0b3JDb250YWluZXIsIGhlaWdodCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yIGluIHB4XHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAbmFtZSBoZWlnaHRcclxuXHRcdCAqIEByZXR1cm4ge251bWJlcn1cclxuXHRcdCAqL1xyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgSGVpZ2h0IGluIHB4XHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIGhlaWdodF4yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgdGhlIGhlaWdodCBvZiB0aGUgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIHNhdmVIZWlnaHQgc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIGhlaWdodC5cclxuXHRcdCAqXHJcblx0XHQgKiBUaGUgc3RvcmVkIGhlaWdodCBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2VcclxuXHRcdCAqIHJlc3RvcmluZyBmcm9tIG1heGltaXplZCBzdGF0ZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbc2F2ZUhlaWdodD10cnVlXSBJZiB0byBzdG9yZSB0aGUgaGVpZ2h0XHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBuYW1lIGhlaWdodF4zXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmhlaWdodCA9IGZ1bmN0aW9uIChoZWlnaHQsIHNhdmVIZWlnaHQpIHtcclxuXHRcdFx0aWYgKCFoZWlnaHQgJiYgaGVpZ2h0ICE9PSAwKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQoZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YmFzZS5kaW1lbnNpb25zKG51bGwsIGhlaWdodCwgc2F2ZUhlaWdodCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdFx0ICpcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQG5hbWUgbWF4aW1pemVcclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKi9cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIG1heGltaXNlZCBvciBub3RcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IG1heGltaXplIElmIHRvIG1heGltaXNlIHRoZSBlZGl0b3JcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQG5hbWUgbWF4aW1pemVeMlxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5tYXhpbWl6ZSA9IGZ1bmN0aW9uIChtYXhpbWl6ZSkge1xyXG5cdFx0XHR2YXIgbWF4aW1pemVTaXplID0gJ2VtbGVkaXRvci1tYXhpbWl6ZSc7XHJcblxyXG5cdFx0XHRpZiAodXRpbHMuaXNVbmRlZmluZWQobWF4aW1pemUpKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvbS5oYXNDbGFzcyhlZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1heGltaXplID0gISFtYXhpbWl6ZTtcclxuXHJcblx0XHRcdGlmIChtYXhpbWl6ZSkge1xyXG5cdFx0XHRcdG1heGltaXplU2Nyb2xsUG9zaXRpb24gPSBnbG9iYWxXaW4ucGFnZVlPZmZzZXQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS50b2dnbGVDbGFzcyhnbG9iYWxEb2MuZG9jdW1lbnRFbGVtZW50LCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGdsb2JhbERvYy5ib2R5LCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRcdGJhc2Uud2lkdGgobWF4aW1pemUgPyAnMTAwJScgOiBvcHRpb25zLndpZHRoLCBmYWxzZSk7XHJcblx0XHRcdGJhc2UuaGVpZ2h0KG1heGltaXplID8gJzEwMCUnIDogb3B0aW9ucy5oZWlnaHQsIGZhbHNlKTtcclxuXHJcblx0XHRcdGlmICghbWF4aW1pemUpIHtcclxuXHRcdFx0XHRnbG9iYWxXaW4uc2Nyb2xsVG8oMCwgbWF4aW1pemVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGF1dG9FeHBhbmQoKTtcclxuXHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHRhdXRvRXhwYW5kID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5hdXRvRXhwYW5kICYmICFhdXRvRXhwYW5kVGhyb3R0bGUpIHtcclxuXHRcdFx0XHRhdXRvRXhwYW5kVGhyb3R0bGUgPSBzZXRUaW1lb3V0KGJhc2UuZXhwYW5kVG9Db250ZW50LCAyMDApO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRXhwYW5kcyBvciBzaHJpbmtzIHRoZSBlZGl0b3JzIGhlaWdodCB0byB0aGUgaGVpZ2h0IG9mIGl0J3MgY29udGVudFxyXG5cdFx0ICpcclxuXHRcdCAqIFVubGVzcyBpZ25vcmVNYXhIZWlnaHQgaXMgc2V0IHRvIHRydWUgaXQgd2lsbCBub3QgZXhwYW5kXHJcblx0XHQgKiBoaWdoZXIgdGhhbiB0aGUgbWF4SGVpZ2h0IG9wdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lnbm9yZU1heEhlaWdodD1mYWxzZV1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZXhwYW5kVG9Db250ZW50XHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNlZSAjcmVzaXplVG9Db250ZW50XHJcblx0XHQgKi9cclxuXHRcdGJhc2UuZXhwYW5kVG9Db250ZW50ID0gZnVuY3Rpb24gKGlnbm9yZU1heEhlaWdodCkge1xyXG5cdFx0XHRpZiAoYmFzZS5tYXhpbWl6ZSgpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjbGVhclRpbWVvdXQoYXV0b0V4cGFuZFRocm90dGxlKTtcclxuXHRcdFx0YXV0b0V4cGFuZFRocm90dGxlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZiAoIWF1dG9FeHBhbmRCb3VuZHMpIHtcclxuXHRcdFx0XHR2YXIgaGVpZ2h0ID0gb3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgb3B0aW9ucy5oZWlnaHQgfHxcclxuXHRcdFx0XHRcdGRvbS5oZWlnaHQodGV4dGFyZWEpO1xyXG5cclxuXHRcdFx0XHRhdXRvRXhwYW5kQm91bmRzID0ge1xyXG5cdFx0XHRcdFx0bWluOiBoZWlnaHQsXHJcblx0XHRcdFx0XHRtYXg6IG9wdGlvbnMucmVzaXplTWF4SGVpZ2h0IHx8IChoZWlnaHQgKiAyKVxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciByYW5nZSA9IGdsb2JhbERvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRyYW5nZS5zZWxlY3ROb2RlQ29udGVudHMod3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdFx0dmFyIHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0dmFyIGN1cnJlbnQgPSB3eXNpd3lnRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDE7XHJcblx0XHRcdHZhciBzcGFjZU5lZWRlZCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7XHJcblx0XHRcdHZhciBuZXdIZWlnaHQgPSBiYXNlLmhlaWdodCgpICsgMSArIChzcGFjZU5lZWRlZCAtIGN1cnJlbnQpO1xyXG5cclxuXHRcdFx0aWYgKCFpZ25vcmVNYXhIZWlnaHQgJiYgYXV0b0V4cGFuZEJvdW5kcy5tYXggIT09IC0xKSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gTWF0aC5taW4obmV3SGVpZ2h0LCBhdXRvRXhwYW5kQm91bmRzLm1heCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGJhc2UuaGVpZ2h0KE1hdGguY2VpbChNYXRoLm1heChuZXdIZWlnaHQsIGF1dG9FeHBhbmRCb3VuZHMubWluKSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlc3Ryb3lzIHRoZSBlZGl0b3IsIHJlbW92aW5nIGFsbCBlbGVtZW50cyBhbmRcclxuXHRcdCAqIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0ICpcclxuXHRcdCAqIExlYXZlcyBvbmx5IHRoZSBvcmlnaW5hbCB0ZXh0YXJlYS5cclxuXHRcdCAqXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGRlc3Ryb3lcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2UuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gRG9uJ3QgZGVzdHJveSBpZiB0aGUgZWRpdG9yIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkXHJcblx0XHRcdGlmICghcGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cGx1Z2luTWFuYWdlci5kZXN0cm95KCk7XHJcblxyXG5cdFx0XHRyYW5nZUhlbHBlciA9IG51bGw7XHJcblx0XHRcdHBsdWdpbk1hbmFnZXIgPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKGRyb3Bkb3duKSB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZShkcm9wZG93bik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCAnY2xpY2snLCBoYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHRcdHZhciBmb3JtID0gdGV4dGFyZWEuZm9ybTtcclxuXHRcdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0XHRkb20ub2ZmKGZvcm0sICdyZXNldCcsIGhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdFx0ZG9tLm9mZihmb3JtLCAnc3VibWl0JywgYmFzZS51cGRhdGVPcmlnaW5hbCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ub2ZmKHdpbmRvdywgJ3BhZ2VoaWRlJywgYmFzZS51cGRhdGVPcmlnaW5hbCk7XHJcblx0XHRcdGRvbS5vZmYod2luZG93LCAncGFnZXNob3cnLCBoYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0XHRkb20ucmVtb3ZlKHNvdXJjZUVkaXRvcik7XHJcblx0XHRcdGRvbS5yZW1vdmUodG9vbGJhcik7XHJcblx0XHRcdGRvbS5yZW1vdmUoZWRpdG9yQ29udGFpbmVyKTtcclxuXHJcblx0XHRcdGRlbGV0ZSB0ZXh0YXJlYS5fc2NlZGl0b3I7XHJcblx0XHRcdGRvbS5zaG93KHRleHRhcmVhKTtcclxuXHJcblx0XHRcdHRleHRhcmVhLnJlcXVpcmVkID0gaXNSZXF1aXJlZDtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyBhIG1lbnUgaXRlbSBkcm9wIGRvd25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW0gVGhlIGJ1dHRvbiB0byBhbGlnbiB0aGUgZHJvcGRvd24gd2l0aFxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBuYW1lICAgICAgICAgIFVzZWQgZm9yIHN0eWxpbmcgdGhlIGRyb3Bkb3duLCB3aWxsIGJlXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBjbGFzcyBlbWxlZGl0b3ItbmFtZVxyXG5cdFx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRlbnQgIFRoZSBIVE1MIGNvbnRlbnQgb2YgdGhlIGRyb3Bkb3duXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNyZWF0ZURyb3BEb3duXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmNyZWF0ZURyb3BEb3duID0gZnVuY3Rpb24gKG1lbnVJdGVtLCBuYW1lLCBjb250ZW50KSB7XHJcblx0XHRcdC8vIGZpcnN0IGNsaWNrIGZvciBjcmVhdGUgc2Vjb25kIGNsaWNrIGZvciBjbG9zZVxyXG5cdFx0XHR2YXIgZHJvcERvd25Dc3MsIGRyb3BEb3duQ2xhc3MgPSAnZW1sZWRpdG9yLScgKyBuYW1lO1xyXG5cclxuXHRcdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblxyXG5cdFx0XHQvLyBPbmx5IGNsb3NlIHRoZSBkcm9wZG93biBpZiBpdCB3YXMgYWxyZWFkeSBvcGVuXHJcblx0XHRcdGlmIChkcm9wZG93biAmJiBkb20uaGFzQ2xhc3MoZHJvcGRvd24sIGRyb3BEb3duQ2xhc3MpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkcm9wRG93bkNzcyA9IHV0aWxzLmV4dGVuZCh7XHJcblx0XHRcdFx0dG9wOiBtZW51SXRlbS5vZmZzZXRUb3AsXHJcblx0XHRcdFx0bGVmdDogbWVudUl0ZW0ub2Zmc2V0TGVmdCxcclxuXHRcdFx0XHRtYXJnaW5Ub3A6IG1lbnVJdGVtLmNsaWVudEhlaWdodFxyXG5cdFx0XHR9LCBvcHRpb25zLmRyb3BEb3duQ3NzKTtcclxuXHJcblx0XHRcdGRyb3Bkb3duID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItZHJvcGRvd24gJyArIGRyb3BEb3duQ2xhc3NcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRkb20uY3NzKGRyb3Bkb3duLCBkcm9wRG93bkNzcyk7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChkcm9wZG93biwgY29udGVudCk7XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0b3JDb250YWluZXIsIGRyb3Bkb3duKTtcclxuXHRcdFx0ZG9tLm9uKGRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0Ly8gc3RvcCBjbGlja3Mgd2l0aGluIHRoZSBkcm9wZG93biBmcm9tIGJlaW5nIGhhbmRsZWRcclxuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGlmIChkcm9wZG93bikge1xyXG5cdFx0XHRcdHZhciBmaXJzdCA9IGRvbS5maW5kKGRyb3Bkb3duLCAnaW5wdXQsdGV4dGFyZWEnKVswXTtcclxuXHRcdFx0XHRpZiAoZmlyc3QpIHtcclxuXHRcdFx0XHRcdGZpcnN0LmZvY3VzKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyBhbnkgZG9jdW1lbnQgY2xpY2sgYW5kIGNsb3NlcyB0aGUgZHJvcGRvd24gaWYgb3BlblxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlRG9jdW1lbnRDbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdC8vIGlnbm9yZSByaWdodCBjbGlja3NcclxuXHRcdFx0aWYgKGUud2hpY2ggIT09IDMgJiYgZHJvcGRvd24gJiYgIWUuZGVmYXVsdFByZXZlbnRlZCkge1xyXG5cdFx0XHRcdGF1dG9VcGRhdGUoKTtcclxuXHJcblx0XHRcdFx0YmFzZS5jbG9zZURyb3BEb3duKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgY3V0ICYgY29weSBldmVudHNcclxuXHRcdCAqXHJcblx0XHQgKiBCeSBkZWZhdWx0IGJyb3dzZXJzIGFsc28gY29weSBpbmhlcml0ZWQgc3R5bGluZyBmcm9tIHRoZSBzdHlsZXNoZWV0IGFuZFxyXG5cdFx0ICogYnJvd3NlciBkZWZhdWx0IHN0eWxpbmcgd2hpY2ggaXMgdW5uZWNlc3NhcnkuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhpcyB3aWxsIGlnbm9yZSBpbmhlcml0ZWQgc3R5bGVzIGFuZCBvbmx5IGNvcHkgaW5saW5lIHN0eWxpbmcuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVDdXRDb3B5RXZ0ID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHJhbmdlID0gcmFuZ2VIZWxwZXIuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cdFx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0XHR2YXIgY29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdHZhciBmaXJzdFBhcmVudDtcclxuXHJcblx0XHRcdFx0Ly8gQ29weSBhbGwgaW5saW5lIHBhcmVudCBub2RlcyB1cCB0byB0aGUgZmlyc3QgYmxvY2sgcGFyZW50IHNvIGNhblxyXG5cdFx0XHRcdC8vIGNvcHkgaW5saW5lIHN0eWxlc1xyXG5cdFx0XHRcdHZhciBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0XHR3aGlsZSAocGFyZW50ICYmIGRvbS5pc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRcdFx0XHRcdHZhciBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKTtcclxuXHRcdFx0XHRcdFx0aWYgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNsb25lLCBjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250YWluZXIsIGNsb25lKTtcclxuXHRcdFx0XHRcdFx0Zmlyc3RQYXJlbnQgPSBmaXJzdFBhcmVudCB8fCBjbG9uZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZpcnN0UGFyZW50IHx8IGNvbnRhaW5lciwgcmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuXHRcdFx0XHRkb20ucmVtb3ZlV2hpdGVTcGFjZShjb250YWluZXIpO1xyXG5cclxuXHRcdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9odG1sJywgY29udGFpbmVyLmlubmVySFRNTCk7XHJcblxyXG5cdFx0XHRcdC8vIFRPRE86IFJlZmFjdG9yIGludG8gcHJpdmF0ZSBzaGFyZWQgbW9kdWxlIHdpdGggcGxhaW50ZXh0IHBsdWdpblxyXG5cdFx0XHRcdC8vIGlubmVyVGV4dCBhZGRzIHR3byBuZXdsaW5lcyBhZnRlciA8cD4gdGFncyBzbyBjb252ZXJ0IHRoZW0gdG9cclxuXHRcdFx0XHQvLyA8ZGl2PiB0YWdzXHJcblx0XHRcdFx0dXRpbHMuZWFjaChkb20uZmluZChjb250YWluZXIsICdwJyksIGZ1bmN0aW9uIChfLCBlbG0pIHtcclxuXHRcdFx0XHRcdGRvbS5jb252ZXJ0RWxlbWVudChlbG0sICdkaXYnKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvLyBSZW1vdmUgY29sbGFwc2VkIDxicj4gdGFncyBhcyBpbm5lclRleHQgY29udmVydHMgdGhlbSB0byBuZXdsaW5lc1xyXG5cdFx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAnYnInKSwgZnVuY3Rpb24gKF8sIGVsbSkge1xyXG5cdFx0XHRcdFx0aWYgKCFlbG0ubmV4dFNpYmxpbmcgfHwgIWRvbS5pc0lubGluZShlbG0ubmV4dFNpYmxpbmcsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRcdGRvbS5yZW1vdmUoZWxtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly8gcmFuZ2UudG9TdHJpbmcoKSBkb2Vzbid0IGluY2x1ZGUgbmV3bGluZXMgc28gY2FuJ3QgdXNlIHRoYXQuXHJcblx0XHRcdFx0Ly8gc2VsZWN0aW9uLnRvU3RyaW5nKCkgc2VlbXMgdG8gdXNlIHRoZSBzYW1lIG1ldGhvZCBhcyBpbm5lclRleHRcclxuXHRcdFx0XHQvLyBidXQgbmVlZHMgdG8gYmUgbm9ybWFsaXNlZCBmaXJzdCBzbyB1c2luZyBjb250YWluZXIuaW5uZXJUZXh0XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdCb2R5LCBjb250YWluZXIpO1xyXG5cdFx0XHRcdGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L3BsYWluJywgY29udGFpbmVyLmlubmVyVGV4dCk7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZShjb250YWluZXIpO1xyXG5cclxuXHRcdFx0XHRpZiAoZS50eXBlID09PSAnY3V0Jykge1xyXG5cdFx0XHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBwYXN0ZSBldmVudFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlUGFzdGVFdnQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgZWRpdGFibGUgPSB3eXNpd3lnQm9keTtcclxuXHRcdFx0dmFyIGNsaXBib2FyZCA9IGUuY2xpcGJvYXJkRGF0YTtcclxuXHRcdFx0dmFyIGxvYWRJbWFnZSA9IGZ1bmN0aW9uIChmaWxlKSB7XHJcblx0XHRcdFx0dmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHRcdFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0XHRoYW5kbGVQYXN0ZURhdGEoe1xyXG5cdFx0XHRcdFx0XHRodG1sOiAnPGltZyBzcmM9XCInICsgZS50YXJnZXQucmVzdWx0ICsgJ1wiIC8+J1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIE1vZGVybiBicm93c2VycyB3aXRoIGNsaXBib2FyZCBBUEkgLSBldmVyeXRoaW5nIG90aGVyIHRoYW4gX3ZlcnlfXHJcblx0XHRcdC8vIG9sZCBhbmRyb2lkIHdlYiB2aWV3cyBhbmQgVUMgYnJvd3NlciB3aGljaCBkb2Vzbid0IHN1cHBvcnQgdGhlXHJcblx0XHRcdC8vIHBhc3RlIGV2ZW50IGF0IGFsbC5cclxuXHRcdFx0aWYgKGNsaXBib2FyZCkge1xyXG5cdFx0XHRcdHZhciBkYXRhID0ge307XHJcblx0XHRcdFx0dmFyIHR5cGVzID0gY2xpcGJvYXJkLnR5cGVzO1xyXG5cdFx0XHRcdHZhciBpdGVtcyA9IGNsaXBib2FyZC5pdGVtcztcclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHQvLyBXb3JkIHNvbWV0aW1lcyBhZGRzIGNvcGllZCB0ZXh0IGFzIGFuIGltYWdlIHNvIGlmIEhUTUxcclxuXHRcdFx0XHRcdC8vIGV4aXN0cyBwcmVmZXIgdGhhdCBvdmVyIGltYWdlc1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVzLmluZGV4T2YoJ3RleHQvaHRtbCcpIDwgMCkge1xyXG5cdFx0XHRcdFx0XHQvLyBOb3JtYWxpc2UgaW1hZ2UgcGFzdGluZyB0byBwYXN0ZSBhcyBhIGRhdGEtdXJpXHJcblx0XHRcdFx0XHRcdGlmIChnbG9iYWxXaW4uRmlsZVJlYWRlciAmJiBpdGVtcyAmJlxyXG5cdFx0XHRcdFx0XHRcdElNQUdFX01JTUVfUkVHRVgudGVzdChpdGVtc1tpXS50eXBlKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBsb2FkSW1hZ2UoY2xpcGJvYXJkLml0ZW1zW2ldLmdldEFzRmlsZSgpKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRhdGFbdHlwZXNbaV1dID0gY2xpcGJvYXJkLmdldERhdGEodHlwZXNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBDYWxsIHBsdWdpbnMgaGVyZSB3aXRoIGZpbGU/XHJcblx0XHRcdFx0ZGF0YS50ZXh0ID0gZGF0YVsndGV4dC9wbGFpbiddO1xyXG5cdFx0XHRcdGRhdGEuaHRtbCA9IHNhbml0aXplKGRhdGFbJ3RleHQvaHRtbCddKTtcclxuXHJcblx0XHRcdFx0aGFuZGxlUGFzdGVEYXRhKGRhdGEpO1xyXG5cdFx0XHRcdC8vIElmIGNvbnRlbnRzRnJhZ21lbnQgZXhpc3RzIHRoZW4gd2UgYXJlIGFscmVhZHkgd2FpdGluZyBmb3IgYVxyXG5cdFx0XHRcdC8vIHByZXZpb3VzIHBhc3RlIHNvIGxldCB0aGUgaGFuZGxlciBmb3IgdGhhdCBoYW5kbGUgdGhpcyBvbmUgdG9vXHJcblx0XHRcdH0gZWxzZSBpZiAoIXBhc3RlQ29udGVudEZyYWdtZW50KSB7XHJcblx0XHRcdFx0Ly8gU2F2ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIHNvIGNhbiBiZSByZXN0b3JlZFxyXG5cdFx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0XHR2YXIgc2Nyb2xsVG9wID0gZWRpdGFibGUuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBnbG9iYWxEb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHRcdHdoaWxlIChlZGl0YWJsZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQocGFzdGVDb250ZW50RnJhZ21lbnQsIGVkaXRhYmxlLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHR2YXIgaHRtbCA9IGVkaXRhYmxlLmlubmVySFRNTDtcclxuXHJcblx0XHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0YWJsZSwgcGFzdGVDb250ZW50RnJhZ21lbnQpO1xyXG5cdFx0XHRcdFx0ZWRpdGFibGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0XHRcdFx0cGFzdGVDb250ZW50RnJhZ21lbnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0XHRoYW5kbGVQYXN0ZURhdGEoeyBodG1sOiBzYW5pdGl6ZShodG1sKSB9KTtcclxuXHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHBhc3RlZCBkYXRhLCBmaWx0ZXJzIGl0IGFuZCB0aGVuIGluc2VydHMgaXQuXHJcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlUGFzdGVEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdFx0dmFyIHBhc3RlQXJlYSA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGVSYXcnLCBkYXRhKTtcclxuXHRcdFx0ZG9tLnRyaWdnZXIoZWRpdG9yQ29udGFpbmVyLCAncGFzdGVyYXcnLCBkYXRhKTtcclxuXHJcblx0XHRcdGlmIChkYXRhLmh0bWwpIHtcclxuXHRcdFx0XHQvLyBTYW5pdGl6ZSBhZ2FpbiBpbiBjYXNlIHBsdWdpbnMgbW9kaWZpZWQgdGhlIEhUTUxcclxuXHRcdFx0XHRwYXN0ZUFyZWEuaW5uZXJIVE1MID0gc2FuaXRpemUoZGF0YS5odG1sKTtcclxuXHJcblx0XHRcdFx0Ly8gZml4IGFueSBpbnZhbGlkIG5lc3RpbmdcclxuXHRcdFx0XHRkb20uZml4TmVzdGluZyhwYXN0ZUFyZWEpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHBhc3RlQXJlYS5pbm5lckhUTUwgPSBlc2NhcGUuZW50aXRpZXMoZGF0YS50ZXh0IHx8ICcnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHBhc3RlID0ge1xyXG5cdFx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKCdmcmFnbWVudFRvU291cmNlJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHRwYXN0ZS52YWwgPSBmb3JtYXRcclxuXHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKHBhc3RlLnZhbCwgd3lzaXd5Z0RvY3VtZW50LCBjdXJyZW50Tm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGUnLCBwYXN0ZSk7XHJcblx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ3Bhc3RlJywgcGFzdGUpO1xyXG5cclxuXHRcdFx0aWYgKCdmcmFnbWVudFRvSHRtbCcgaW4gZm9ybWF0KSB7XHJcblx0XHRcdFx0cGFzdGUudmFsID0gZm9ybWF0XHJcblx0XHRcdFx0XHQuZnJhZ21lbnRUb0h0bWwocGFzdGUudmFsLCBjdXJyZW50Tm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBsdWdpbk1hbmFnZXIuY2FsbCgncGFzdGVIdG1sJywgcGFzdGUpO1xyXG5cclxuXHRcdFx0dmFyIHBhcmVudCA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHRcdFx0YmFzZS53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChwYXN0ZS52YWwsIG51bGwsIHRydWUpO1xyXG5cdFx0XHRkb20ubWVyZ2UocGFyZW50KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbG9zZXMgYW55IGN1cnJlbnRseSBvcGVuIGRyb3AgZG93blxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvY3VzPWZhbHNlXSBJZiB0byBmb2N1cyB0aGUgZWRpdG9yXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgY2xvc2luZyB0aGUgZHJvcCBkb3duXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNsb3NlRHJvcERvd25cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2UuY2xvc2VEcm9wRG93biA9IGZ1bmN0aW9uIChmb2N1cykge1xyXG5cdFx0XHRpZiAoZHJvcGRvd24pIHtcclxuXHRcdFx0XHRkb20ucmVtb3ZlKGRyb3Bkb3duKTtcclxuXHRcdFx0XHRkcm9wZG93biA9IG51bGw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChmb2N1cyA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRcdGJhc2UuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIEhUTUwgaW50byBXWVNJV1lHIGVkaXRvci5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiBlbmRIdG1sIGlzIHNwZWNpZmllZCwgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWRcclxuXHRcdCAqIGJldHdlZW4gaHRtbCBhbmQgZW5kSHRtbC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBodG1sXHJcblx0XHQgKiBhbmQgZW5kSHRtbCB3aWxsIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kSHRtbD1udWxsXVxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbb3ZlcnJpZGVDb2RlQmxvY2tpbmc9ZmFsc2VdIElmIHRvIGluc2VydCB0aGUgaHRtbFxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludG8gY29kZSB0YWdzLCBieVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQgY29kZSB0YWdzIG9ubHlcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0IHRleHQuXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sID0gZnVuY3Rpb24gKFxyXG5cdFx0XHRodG1sLCBlbmRIdG1sLCBvdmVycmlkZUNvZGVCbG9ja2luZ1xyXG5cdFx0KSB7XHJcblx0XHRcdHZhciBtYXJrZXIsIHNjcm9sbFRvcCwgc2Nyb2xsVG8sIGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQod3lzaXd5Z0VkaXRvcik7XHJcblxyXG5cdFx0XHRiYXNlLmZvY3VzKCk7XHJcblxyXG5cdFx0XHQvLyBUT0RPOiBUaGlzIGNvZGUgdGFnIHNob3VsZCBiZSBjb25maWd1cmFibGUgYW5kXHJcblx0XHRcdC8vIHNob3VsZCBtYXliZSBjb252ZXJ0IHRoZSBIVE1MIGludG8gdGV4dCBpbnN0ZWFkXHJcblx0XHRcdC8vIERvbid0IGFwcGx5IHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdFx0aWYgKCFvdmVycmlkZUNvZGVCbG9ja2luZyAmJiBkb20uY2xvc2VzdChjdXJyZW50QmxvY2tOb2RlLCAnY29kZScpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJbnNlcnQgdGhlIEhUTUwgYW5kIHNhdmUgdGhlIHJhbmdlIHNvIHRoZSBlZGl0b3IgY2FuIGJlIHNjcm9sbGVkXHJcblx0XHRcdC8vIHRvIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvbi4gQWxzbyBhbGxvd3MgZW1vdGljb25zIHRvIGJlIHJlcGxhY2VkXHJcblx0XHRcdC8vIHdpdGhvdXQgYWZmZWN0aW5nIHRoZSBjdXJzb3IgcG9zaXRpb25cclxuXHRcdFx0cmFuZ2VIZWxwZXIuaW5zZXJ0SFRNTChodG1sLCBlbmRIdG1sKTtcclxuXHRcdFx0cmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblx0XHRcdHJlcGxhY2VFbW90aWNvbnMoKTtcclxuXHJcblx0XHRcdC8vIEZpeCBhbnkgaW52YWxpZCBuZXN0aW5nLCBlLmcuIGlmIGEgcXVvdGUgb3Igb3RoZXIgYmxvY2sgaXMgaW5zZXJ0ZWRcclxuXHRcdFx0Ly8gaW50byBhIHBhcmFncmFwaFxyXG5cdFx0XHRkb20uZml4TmVzdGluZyh3eXNpd3lnQm9keSk7XHJcblxyXG5cdFx0XHR3cmFwSW5saW5lcyh3eXNpd3lnQm9keSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHJcblx0XHRcdC8vIFNjcm9sbCB0aGUgZWRpdG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvblxyXG5cdFx0XHRtYXJrZXIgPSBkb20uZmluZCh3eXNpd3lnQm9keSwgJyNlbWxlZGl0b3ItZW5kLW1hcmtlcicpWzBdO1xyXG5cdFx0XHRkb20uc2hvdyhtYXJrZXIpO1xyXG5cdFx0XHRzY3JvbGxUb3AgPSB3eXNpd3lnQm9keS5zY3JvbGxUb3A7XHJcblx0XHRcdHNjcm9sbFRvID0gKGRvbS5nZXRPZmZzZXQobWFya2VyKS50b3AgK1xyXG5cdFx0XHRcdChtYXJrZXIub2Zmc2V0SGVpZ2h0ICogMS41KSkgLSBlZGl0b3JIZWlnaHQ7XHJcblx0XHRcdGRvbS5oaWRlKG1hcmtlcik7XHJcblxyXG5cdFx0XHQvLyBPbmx5IHNjcm9sbCBpZiBtYXJrZXIgaXNuJ3QgYWxyZWFkeSB2aXNpYmxlXHJcblx0XHRcdGlmIChzY3JvbGxUbyA+IHNjcm9sbFRvcCB8fCBzY3JvbGxUbyArIGVkaXRvckhlaWdodCA8IHNjcm9sbFRvcCkge1xyXG5cdFx0XHRcdHd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHNjcm9sbFRvO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKGZhbHNlKTtcclxuXHRcdFx0cmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblxyXG5cdFx0XHQvLyBBZGQgYSBuZXcgbGluZSBhZnRlciB0aGUgbGFzdCBibG9jayBlbGVtZW50XHJcblx0XHRcdC8vIHNvIGNhbiBhbHdheXMgYWRkIHRleHQgYWZ0ZXIgaXRcclxuXHRcdFx0YXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgZXhjZXB0IGl0IHdpbGwgY29udmVydCBhbnkgSFRNTFxyXG5cdFx0ICogaW50byB0ZXh0IGJlZm9yZSBpbnNlcnRpbmcgaXQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS53eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0LCBlbmRUZXh0KSB7XHJcblx0XHRcdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXHJcblx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKHRleHQpLCBlc2NhcGUuZW50aXRpZXMoZW5kVGV4dClcclxuXHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIHRleHQgaW50byB0aGUgV1lTSVdZRyBvciBzb3VyY2UgZWRpdG9yIGRlcGVuZGluZyBvbiB3aGljaFxyXG5cdFx0ICogbW9kZSB0aGUgZWRpdG9yIGlzIGluLlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGVuZFRleHQgaXMgc3BlY2lmaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHRcdCAqIHRleHQgYW5kIGVuZFRleHQuIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQgdGV4dCBhbmQgZW5kVGV4dCB3aWxsXHJcblx0XHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHRcdCAqIEBzaW5jZSAxLjMuNVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnRUZXh0XHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmluc2VydFRleHQgPSBmdW5jdGlvbiAodGV4dCwgZW5kVGV4dCkge1xyXG5cdFx0XHRpZiAoYmFzZS5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRcdGJhc2Uuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCh0ZXh0LCBlbmRUZXh0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRiYXNlLnd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQsIGVuZFRleHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBMaWtlIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sIGJ1dCBpbnNlcnRzIHRleHQgaW50byB0aGVcclxuXHRcdCAqIHNvdXJjZSBtb2RlIGVkaXRvciBpbnN0ZWFkLlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGVuZFRleHQgaXMgc3BlY2lmaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHRcdCAqIHRleHQgYW5kIGVuZFRleHQuIElmIG5vIHRleHQgaXMgc2VsZWN0ZWQgdGV4dCBhbmQgZW5kVGV4dCB3aWxsXHJcblx0XHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIFRoZSBjdXJzb3Igd2lsbCBiZSBwbGFjZWQgYWZ0ZXIgdGhlIHRleHQgcGFyYW0uIElmIGVuZFRleHQgaXNcclxuXHRcdCAqIHNwZWNpZmllZCB0aGUgY3Vyc29yIHdpbGwgYmUgcGxhY2VkIGJlZm9yZSBlbmRUZXh0LCBzbyBwYXNzaW5nOjxiciAvPlxyXG5cdFx0ICpcclxuXHRcdCAqICdbYl0nLCAnWy9iXSdcclxuXHRcdCAqXHJcblx0XHQgKiBXb3VsZCBjYXVzZSB0aGUgY3Vyc29yIHRvIGJlIHBsYWNlZDo8YnIgLz5cclxuXHRcdCAqXHJcblx0XHQgKiBbYl1TZWxlY3RlZCB0ZXh0fFsvYl1cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRUZXh0PW51bGxdXHJcblx0XHQgKiBAc2luY2UgMS40LjBcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc291cmNlRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0ID0gZnVuY3Rpb24gKHRleHQsIGVuZFRleHQpIHtcclxuXHRcdFx0dmFyIHNjcm9sbFRvcCwgY3VycmVudFZhbHVlLCBzdGFydFBvcyA9IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCwgZW5kUG9zID0gc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZDtcclxuXHJcblx0XHRcdHNjcm9sbFRvcCA9IHNvdXJjZUVkaXRvci5zY3JvbGxUb3A7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cdFx0XHRjdXJyZW50VmFsdWUgPSBzb3VyY2VFZGl0b3IudmFsdWU7XHJcblxyXG5cdFx0XHRpZiAoZW5kVGV4dCkge1xyXG5cdFx0XHRcdHRleHQgKz0gY3VycmVudFZhbHVlLnN1YnN0cmluZyhzdGFydFBvcywgZW5kUG9zKSArIGVuZFRleHQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNvdXJjZUVkaXRvci52YWx1ZSA9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICtcclxuXHRcdFx0XHR0ZXh0ICtcclxuXHRcdFx0XHRjdXJyZW50VmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgY3VycmVudFZhbHVlLmxlbmd0aCk7XHJcblxyXG5cdFx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQgPSAoc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aCkgLVxyXG5cdFx0XHRcdChlbmRUZXh0ID8gZW5kVGV4dC5sZW5ndGggOiAwKTtcclxuXHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZCA9IHNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydDtcclxuXHJcblx0XHRcdHNvdXJjZUVkaXRvci5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGN1cnJlbnQgaW5zdGFuY2Ugb2YgdGhlIHJhbmdlSGVscGVyIGNsYXNzXHJcblx0XHQgKiBmb3IgdGhlIGVkaXRvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtSYW5nZUhlbHBlcn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0UmFuZ2VIZWxwZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2UuZ2V0UmFuZ2VIZWxwZXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiByYW5nZUhlbHBlcjtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIG9yIHNldHMgdGhlIHNvdXJjZSBlZGl0b3IgY2FyZXQgcG9zaXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IFtwb3NpdGlvbl1cclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBzaW5jZSAxLjQuNVxyXG5cdFx0ICogQG5hbWUgc291cmNlRWRpdG9yQ2FyZXRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2Uuc291cmNlRWRpdG9yQ2FyZXQgPSBmdW5jdGlvbiAocG9zaXRpb24pIHtcclxuXHRcdFx0c291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQgPSBwb3NpdGlvbi5zdGFydDtcclxuXHRcdFx0XHRzb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gcG9zaXRpb24uZW5kO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRzdGFydDogc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRcdGVuZDogc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZFxyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHZhbHVlIG9mIHRoZSBlZGl0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdGhlIGVkaXRvciBpcyBpbiBXWVNJV1lHIG1vZGUgaXQgd2lsbCByZXR1cm4gdGhlIGZpbHRlcmVkXHJcblx0XHQgKiBIVE1MIGZyb20gaXQgKGNvbnZlcnRlZCB0byBCQkNvZGUgaWYgdXNpbmcgdGhlIEJCQ29kZSBwbHVnaW4pLlxyXG5cdFx0ICogSXQgaXQncyBpbiBTb3VyY2UgTW9kZSBpdCB3aWxsIHJldHVybiB0aGUgdW5maWx0ZXJlZCBjb250ZW50c1xyXG5cdFx0ICogb2YgdGhlIHNvdXJjZSBlZGl0b3IgKGlmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luIHRoaXMgd2lsbCBiZVxyXG5cdFx0ICogQkJDb2RlIGFnYWluKS5cclxuXHRcdCAqXHJcblx0XHQgKiBAc2luY2UgMS4zLjVcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgdmFsXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgdGhlIHZhbHVlIG9mIHRoZSBlZGl0b3IuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZmlsdGVyIHNldCB0cnVlIHRoZSB2YWwgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyXHJcblx0XHQgKiBmdW5jdGlvbi4gSWYgdXNpbmcgdGhlIEJCQ29kZSBwbHVnaW4gaXQgd2lsbCBwYXNzIHRoZSB2YWwgdG9cclxuXHRcdCAqIHRoZSBCQkNvZGUgZmlsdGVyIHRvIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbFxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQHNpbmNlIDEuMy41XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHZhbF4yXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLnZhbCA9IGZ1bmN0aW9uICh2YWwsIGZpbHRlcikge1xyXG5cdFx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbCkpIHtcclxuXHRcdFx0XHRyZXR1cm4gYmFzZS5pblNvdXJjZU1vZGUoKSA/XHJcblx0XHRcdFx0XHRiYXNlLmdldFNvdXJjZUVkaXRvclZhbHVlKGZhbHNlKSA6XHJcblx0XHRcdFx0XHRiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZShmaWx0ZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWJhc2UuaW5Tb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAndG9IdG1sJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHRcdHZhbCA9IGZvcm1hdC50b0h0bWwodmFsKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJhc2Uuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHZhbCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YmFzZS5zZXRTb3VyY2VFZGl0b3JWYWx1ZSh2YWwpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIEhUTUwvQkJDb2RlIGludG8gdGhlIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGVuZCBpcyBzdXBwbGllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0XHQgKiBzdGFydCBhbmQgZW5kLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IHN0YXJ0IGFuZCBlbmRcclxuXHRcdCAqIHdpbGwgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdGhlIGZpbHRlciBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgdGhlIEhUTUwvQkJDb2RlIHdpbGwgYmVcclxuXHRcdCAqIHBhc3NlZCB0aHJvdWdoIGFueSBwbHVnaW4gZmlsdGVycy4gSWYgdXNpbmcgdGhlIEJCQ29kZSBwbHVnaW5cclxuXHRcdCAqIHRoaXMgd2lsbCBjb252ZXJ0IGFueSBCQkNvZGUgaW50byBIVE1MLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBzdGFydFxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmQ9bnVsbF1cclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBbY29udmVydEVtb3RpY29ucz10cnVlXSBJZiB0byBjb252ZXJ0IGVtb3RpY29uc1xyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBzaW5jZSAxLjMuNVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBIVE1ML0JCQ29kZSBpbnRvIHRoZSBlZGl0b3JcclxuXHRcdCAqXHJcblx0XHQgKiBJZiBlbmQgaXMgc3VwcGxpZWQgYW55IHNlbGVjdGVkIHRleHQgd2lsbCBiZSBwbGFjZWQgYmV0d2VlblxyXG5cdFx0ICogc3RhcnQgYW5kIGVuZC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBzdGFydCBhbmQgZW5kXHJcblx0XHQgKiB3aWxsIGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIHRoZSBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIHRydWUsIHRoZSBIVE1ML0JCQ29kZSB3aWxsIGJlXHJcblx0XHQgKiBwYXNzZWQgdGhyb3VnaCBhbnkgcGx1Z2luIGZpbHRlcnMuIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0XHQgKiB0aGlzIHdpbGwgY29udmVydCBhbnkgQkJDb2RlIGludG8gSFRNTC5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB0aGUgYWxsb3dNaXhlZCBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgSFRNTCBhbnkgd2lsbCBub3QgYmVcclxuXHRcdCAqIGVzY2FwZWRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kPW51bGxdXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnZlcnRFbW90aWNvbnM9dHJ1ZV0gSWYgdG8gY29udmVydCBlbW90aWNvbnNcclxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2FsbG93TWl4ZWQ9ZmFsc2VdXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydF4yXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5cdFx0YmFzZS5pbnNlcnQgPSBmdW5jdGlvbiAoXHJcblx0XHRcdHN0YXJ0LCBlbmQsIGZpbHRlciwgY29udmVydEVtb3RpY29ucywgYWxsb3dNaXhlZFxyXG5cdFx0KSB7XHJcblx0XHRcdGlmIChiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0KHN0YXJ0LCBlbmQpO1xyXG5cdFx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBBZGQgdGhlIHNlbGVjdGlvbiBiZXR3ZWVuIHN0YXJ0IGFuZCBlbmRcclxuXHRcdFx0aWYgKGVuZCkge1xyXG5cdFx0XHRcdHZhciBodG1sID0gcmFuZ2VIZWxwZXIuc2VsZWN0ZWRIdG1sKCk7XHJcblxyXG5cdFx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICdmcmFnbWVudFRvU291cmNlJyBpbiBmb3JtYXQpIHtcclxuXHRcdFx0XHRcdGh0bWwgPSBmb3JtYXRcclxuXHRcdFx0XHRcdFx0LmZyYWdtZW50VG9Tb3VyY2UoaHRtbCwgd3lzaXd5Z0RvY3VtZW50LCBjdXJyZW50Tm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzdGFydCArPSBodG1sICsgZW5kO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIFRPRE86IFRoaXMgZmlsdGVyIHNob3VsZCBhbGxvdyBlbXB0eSB0YWdzIGFzIGl0J3MgaW5zZXJ0aW5nLlxyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb0h0bWwnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdHN0YXJ0ID0gZm9ybWF0LmZyYWdtZW50VG9IdG1sKHN0YXJ0LCBjdXJyZW50Tm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENvbnZlcnQgYW55IGVzY2FwZWQgSFRNTCBiYWNrIGludG8gSFRNTCBpZiBtaXhlZCBpcyBhbGxvd2VkXHJcblx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIGFsbG93TWl4ZWQgPT09IHRydWUpIHtcclxuXHRcdFx0XHRzdGFydCA9IHN0YXJ0LnJlcGxhY2UoLyZsdDsvZywgJzwnKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoLyZndDsvZywgJz4nKVxyXG5cdFx0XHRcdFx0LnJlcGxhY2UoLyZhbXA7L2csICcmJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGJhc2Uud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoc3RhcnQpO1xyXG5cclxuXHRcdFx0cmV0dXJuIGJhc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgV1lTSVdZRyBlZGl0b3JzIEhUTUwgdmFsdWUuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdXNpbmcgYSBwbHVnaW4gdGhhdCBmaWx0ZXJzIHRoZSBIdCBNbCBsaWtlIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0XHQgKiBpdCB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBmaWx0ZXJpbmcgKEJCQ29kZSkgdW5sZXNzIHRoZVxyXG5cdFx0ICogZmlsdGVyIHBhcmFtIGlzIHNldCB0byBmYWxzZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0V3lzaXd5Z0VkaXRvclZhbHVlXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcclxuXHRcdFx0dmFyIGh0bWw7XHJcblx0XHRcdC8vIENyZWF0ZSBhIHRtcCBub2RlIHRvIHN0b3JlIGNvbnRlbnRzIHNvIGl0IGNhbiBiZSBtb2RpZmllZFxyXG5cdFx0XHQvLyB3aXRob3V0IGFmZmVjdGluZyBhbnl0aGluZyBlbHNlLlxyXG5cdFx0XHR2YXIgdG1wID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHR2YXIgY2hpbGROb2RlcyA9IHd5c2l3eWdCb2R5LmNoaWxkTm9kZXM7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodG1wLCBjaGlsZE5vZGVzW2ldLmNsb25lTm9kZSh0cnVlKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3eXNpd3lnQm9keSwgdG1wKTtcclxuXHRcdFx0ZG9tLmZpeE5lc3RpbmcodG1wKTtcclxuXHRcdFx0ZG9tLnJlbW92ZSh0bXApO1xyXG5cclxuXHRcdFx0aHRtbCA9IHRtcC5pbm5lckhUTUw7XHJcblxyXG5cdFx0XHQvLyBmaWx0ZXIgdGhlIEhUTUwgYW5kIERPTSB0aHJvdWdoIGFueSBwbHVnaW5zXHJcblx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXQsICd0b1NvdXJjZScpKSB7XHJcblx0XHRcdFx0aHRtbCA9IGZvcm1hdC50b1NvdXJjZShodG1sLCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gaHRtbDtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAc2luY2UgMS40LjNcclxuXHRcdCAqIEBuYW1lIGdldEJvZHlcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2UuZ2V0Qm9keSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHd5c2l3eWdCb2R5O1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjb250YWluZXIgYXJlYSAod2hvbGUgaUZyYW1lKS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKiBAbmFtZSBnZXRDb250ZW50QXJlYUNvbnRhaW5lclxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5nZXRDb250ZW50QXJlYUNvbnRhaW5lciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHd5c2l3eWdFZGl0b3I7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgdGV4dCBlZGl0b3IgdmFsdWVcclxuXHRcdCAqXHJcblx0XHQgKiBJZiB1c2luZyBhIHBsdWdpbiB0aGF0IGZpbHRlcnMgdGhlIHRleHQgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdFx0ICogaXQgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlsdGVyaW5nIHdoaWNoIGlzIEJCQ29kZSB0b1xyXG5cdFx0ICogSFRNTCBzbyBpdCB3aWxsIHJldHVybiBIVE1MLiBJZiBmaWx0ZXIgaXMgc2V0IHRvIGZhbHNlIGl0IHdpbGxcclxuXHRcdCAqIGp1c3QgcmV0dXJuIHRoZSBjb250ZW50cyBvZiB0aGUgc291cmNlIGVkaXRvciAoQkJDb2RlKS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQHNpbmNlIDEuNC4wXHJcblx0XHQgKiBAbmFtZSBnZXRTb3VyY2VFZGl0b3JWYWx1ZVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5nZXRTb3VyY2VFZGl0b3JWYWx1ZSA9IGZ1bmN0aW9uIChmaWx0ZXIpIHtcclxuXHRcdFx0dmFyIHZhbCA9IHNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICd0b0h0bWwnIGluIGZvcm1hdCkge1xyXG5cdFx0XHRcdHZhbCA9IGZvcm1hdC50b0h0bWwodmFsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbDtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTZXRzIHRoZSBXWVNJV1lHIEhUTUwgZWRpdG9yIHZhbHVlLiBTaG91bGQgb25seSBiZSB0aGUgSFRNTFxyXG5cdFx0ICogY29udGFpbmVkIHdpdGhpbiB0aGUgYm9keSB0YWdzXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5zZXRXeXNpd3lnRWRpdG9yVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0aWYgKCF2YWx1ZSkge1xyXG5cdFx0XHRcdHZhbHVlID0gJzxwPjxiciAvPjwvcD4nO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3eXNpd3lnQm9keS5pbm5lckhUTUwgPSBzYW5pdGl6ZSh2YWx1ZSk7XHJcblx0XHRcdHJlcGxhY2VFbW90aWNvbnMoKTtcclxuXHJcblx0XHRcdGFwcGVuZE5ld0xpbmUoKTtcclxuXHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRhdXRvRXhwYW5kKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2V0cyB0aGUgdGV4dCBlZGl0b3IgdmFsdWVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2V0U291cmNlRWRpdG9yVmFsdWVcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2Uuc2V0U291cmNlRWRpdG9yVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0c291cmNlRWRpdG9yLnZhbHVlID0gdmFsdWU7XHJcblxyXG5cdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVXBkYXRlcyB0aGUgdGV4dGFyZWEgdGhhdCB0aGUgZWRpdG9yIGlzIHJlcGxhY2luZ1xyXG5cdFx0ICogd2l0aCB0aGUgdmFsdWUgY3VycmVudGx5IGluc2lkZSB0aGUgZWRpdG9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgdXBkYXRlT3JpZ2luYWxcclxuXHRcdCAqIEBzaW5jZSAxLjQuMFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS51cGRhdGVPcmlnaW5hbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGV4dGFyZWEudmFsdWUgPSBiYXNlLnZhbCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlcGxhY2VzIGFueSBlbW90aWNvbiBjb2RlcyBpbiB0aGUgcGFzc2VkIEhUTUxcclxuXHRcdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRyZXBsYWNlRW1vdGljb25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAob3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0ZW1vdGljb25zXHJcblx0XHRcdFx0XHQucmVwbGFjZSh3eXNpd3lnQm9keSwgYWxsRW1vdGljb25zLCBvcHRpb25zLmVtb3RpY29uc0NvbXBhdCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJZiB0aGUgZWRpdG9yIGlzIGluIHNvdXJjZSBjb2RlIG1vZGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpblNvdXJjZU1vZGVcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2UuaW5Tb3VyY2VNb2RlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLmhhc0NsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3NvdXJjZU1vZGUnKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGlmIHRoZSBlZGl0b3IgaXMgaW4gc291cmNlTW9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gYm9vbGVhblxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzb3VyY2VNb2RlXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBlbmFibGVcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNvdXJjZU1vZGVeMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5zb3VyY2VNb2RlID0gZnVuY3Rpb24gKGVuYWJsZSkge1xyXG5cdFx0XHR2YXIgaW5Tb3VyY2VNb2RlID0gYmFzZS5pblNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2YgZW5hYmxlICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0XHRyZXR1cm4gaW5Tb3VyY2VNb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoKGluU291cmNlTW9kZSAmJiAhZW5hYmxlKSB8fCAoIWluU291cmNlTW9kZSAmJiBlbmFibGUpKSB7XHJcblx0XHRcdFx0YmFzZS50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFN3aXRjaGVzIGJldHdlZW4gdGhlIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2Rlc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgdG9nZ2xlU291cmNlTW9kZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4wXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLnRvZ2dsZVNvdXJjZU1vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpc0luU291cmNlTW9kZSA9IGJhc2UuaW5Tb3VyY2VNb2RlKCk7XHJcblxyXG5cdFx0XHQvLyBkb24ndCBhbGxvdyBzd2l0Y2hpbmcgdG8gV1lTSVdZRyBpZiBkb2Vzbid0IHN1cHBvcnQgaXRcclxuXHRcdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCAmJiBpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCFpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHRcdHJhbmdlSGVscGVyLmNsZWFyKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGN1cnJlbnRTZWxlY3Rpb24gPSBudWxsO1xyXG5cdFx0XHRiYXNlLmJsdXIoKTtcclxuXHJcblx0XHRcdGlmIChpc0luU291cmNlTW9kZSkge1xyXG5cdFx0XHRcdGJhc2Uuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKGJhc2UuZ2V0U291cmNlRWRpdG9yVmFsdWUoKSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0YmFzZS5zZXRTb3VyY2VFZGl0b3JWYWx1ZShiYXNlLmdldFd5c2l3eWdFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZShzb3VyY2VFZGl0b3IpO1xyXG5cdFx0XHRkb20udG9nZ2xlKHd5c2l3eWdFZGl0b3IpO1xyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGVkaXRvckNvbnRhaW5lciwgJ3d5c2l3eWdNb2RlJywgaXNJblNvdXJjZU1vZGUpO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScsICFpc0luU291cmNlTW9kZSk7XHJcblxyXG5cdFx0XHR1cGRhdGVUb29sQmFyKCk7XHJcblx0XHRcdHVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBzZWxlY3RlZCB0ZXh0IG9mIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRzb3VyY2VFZGl0b3JTZWxlY3RlZFRleHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNvdXJjZUVkaXRvci52YWx1ZS5zdWJzdHJpbmcoXHJcblx0XHRcdFx0c291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIHRoZSBwYXNzZWQgY29tbWFuZFxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlQ29tbWFuZCA9IGZ1bmN0aW9uIChjYWxsZXIsIGNtZCkge1xyXG5cdFx0XHQvLyBjaGVjayBpZiBpbiB0ZXh0IG1vZGUgYW5kIGhhbmRsZSB0ZXh0IGNvbW1hbmRzXHJcblx0XHRcdGlmIChiYXNlLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0aWYgKGNtZC50eHRFeGVjKSB7XHJcblx0XHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjbWQudHh0RXhlYykpIHtcclxuXHRcdFx0XHRcdFx0YmFzZS5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0LmFwcGx5KGJhc2UsIGNtZC50eHRFeGVjKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNtZC50eHRFeGVjLmNhbGwoYmFzZSwgY2FsbGVyLCBzb3VyY2VFZGl0b3JTZWxlY3RlZFRleHQoKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKGNtZC5leGVjKSB7XHJcblx0XHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oY21kLmV4ZWMpKSB7XHJcblx0XHRcdFx0XHRjbWQuZXhlYy5jYWxsKGJhc2UsIGNhbGxlcik7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGJhc2UuZXhlY0NvbW1hbmQoXHJcblx0XHRcdFx0XHRcdGNtZC5leGVjLFxyXG5cdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY21kLCAnZXhlY1BhcmFtJykgPyBjbWQuZXhlY1BhcmFtIDogbnVsbFxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRXhlY3V0ZXMgYSBjb21tYW5kIG9uIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBjb21tYW5kXHJcblx0XHQgKiBAcGFyYW0ge1N0cmluZ3xCb29sZWFufSBbcGFyYW1dXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGV4ZWNDb21tYW5kXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmV4ZWNDb21tYW5kID0gZnVuY3Rpb24gKGNvbW1hbmQsIHBhcmFtKSB7XHJcblx0XHRcdHZhciBleGVjdXRlZCA9IGZhbHNlLCBjb21tYW5kT2JqID0gYmFzZS5jb21tYW5kc1tjb21tYW5kXTtcclxuXHJcblx0XHRcdGJhc2UuZm9jdXMoKTtcclxuXHJcblx0XHRcdC8vIFRPRE86IG1ha2UgY29uZmlndXJhYmxlXHJcblx0XHRcdC8vIGRvbid0IGFwcGx5IGFueSBjb21tYW5kcyB0byBjb2RlIGVsZW1lbnRzXHJcblx0XHRcdGlmIChkb20uY2xvc2VzdChyYW5nZUhlbHBlci5wYXJlbnROb2RlKCksICdjb2RlJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0ZXhlY3V0ZWQgPSB3eXNpd3lnRG9jdW1lbnQuZXhlY0NvbW1hbmQoY29tbWFuZCwgZmFsc2UsIHBhcmFtKTtcclxuXHRcdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdFx0Ly8gc2hvdyBlcnJvciBpZiBleGVjdXRpb24gZmFpbGVkIGFuZCBhbiBlcnJvciBtZXNzYWdlIGV4aXN0c1xyXG5cdFx0XHRpZiAoIWV4ZWN1dGVkICYmIGNvbW1hbmRPYmogJiYgY29tbWFuZE9iai5lcnJvck1lc3NhZ2UpIHtcclxuXHRcdFx0XHRhbGVydChiYXNlLl8oY29tbWFuZE9iai5lcnJvck1lc3NhZ2UpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXHJcblx0XHQgKiB0aGUgc2VsZWN0aW9uY2hhbmdlZCBldmVudCBpZiBpdCBoYXMuXHJcblx0XHQgKlxyXG5cdFx0ICogSW4gYnJvd3NlcnMgb3RoZXIgdGhhdCBkb24ndCBzdXBwb3J0IHNlbGVjdGlvbmNoYW5nZSBldmVudCBpdCB3aWxsIGNoZWNrXHJcblx0XHQgKiBhdCBtb3N0IG9uY2UgZXZlcnkgMTAwbXMuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRjaGVja1NlbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGZ1bmN0aW9uIGNoZWNrKCkge1xyXG5cdFx0XHRcdC8vIERvbid0IGNyZWF0ZSBuZXcgc2VsZWN0aW9uIGlmIHRoZXJlIGlzbid0IG9uZSAobGlrZSBhZnRlclxyXG5cdFx0XHRcdC8vIGJsdXIgZXZlbnQgaW4gaU9TKVxyXG5cdFx0XHRcdGlmICh3eXNpd3lnV2luZG93LmdldFNlbGVjdGlvbigpICYmXHJcblx0XHRcdFx0XHR3eXNpd3lnV2luZG93LmdldFNlbGVjdGlvbigpLnJhbmdlQ291bnQgPD0gMCkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IG51bGw7XHJcblx0XHRcdFx0XHQvLyByYW5nZUhlbHBlciBjb3VsZCBiZSBudWxsIGlmIGVkaXRvciB3YXMgZGVzdHJveWVkXHJcblx0XHRcdFx0XHQvLyBiZWZvcmUgdGhlIHRpbWVvdXQgaGFkIGZpbmlzaGVkXHJcblx0XHRcdFx0fSBlbHNlIGlmIChyYW5nZUhlbHBlciAmJiAhcmFuZ2VIZWxwZXIuY29tcGFyZShjdXJyZW50U2VsZWN0aW9uKSkge1xyXG5cdFx0XHRcdFx0Y3VycmVudFNlbGVjdGlvbiA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdFx0XHQvLyBJZiB0aGUgc2VsZWN0aW9uIGlzIGluIGFuIGlubGluZSB3cmFwIGl0IGluIGEgYmxvY2suXHJcblx0XHRcdFx0XHQvLyBGaXhlcyAjMzMxXHJcblx0XHRcdFx0XHRpZiAoY3VycmVudFNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uLmNvbGxhcHNlZCkge1xyXG5cdFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gY3VycmVudFNlbGVjdGlvbi5zdGFydENvbnRhaW5lcjtcclxuXHRcdFx0XHRcdFx0dmFyIG9mZnNldCA9IGN1cnJlbnRTZWxlY3Rpb24uc3RhcnRPZmZzZXQ7XHJcblxyXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0XHRpZiAob2Zmc2V0ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xyXG5cdFx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5jaGlsZE5vZGVzW29mZnNldF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHdoaWxlIChwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgIT09IHd5c2l3eWdCb2R5KSB7XHJcblx0XHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0XHR3cmFwSW5saW5lcyh3eXNpd3lnQm9keSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpc1NlbGVjdGlvbkNoZWNrUGVuZGluZykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXNTZWxlY3Rpb25DaGVja1BlbmRpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0Ly8gRG9uJ3QgbmVlZCB0byBsaW1pdCBjaGVja2luZyBpZiBicm93c2VyIHN1cHBvcnRzIHRoZSBTZWxlY3Rpb24gQVBJXHJcblx0XHRcdGlmICgnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHd5c2l3eWdEb2N1bWVudCkge1xyXG5cdFx0XHRcdGNoZWNrKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2V0VGltZW91dChjaGVjaywgMTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBub2RlIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdFx0ICogdGhlIG5vZGVjaGFuZ2VkIGV2ZW50IGlmIGl0IGhhc1xyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0Y2hlY2tOb2RlQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gY2hlY2sgaWYgbm9kZSBoYXMgY2hhbmdlZFxyXG5cdFx0XHR2YXIgb2xkTm9kZSwgbm9kZSA9IHJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHJcblx0XHRcdGlmIChjdXJyZW50Tm9kZSAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdG9sZE5vZGUgPSBjdXJyZW50Tm9kZTtcclxuXHRcdFx0XHRjdXJyZW50Tm9kZSA9IG5vZGU7XHJcblx0XHRcdFx0Y3VycmVudEJsb2NrTm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ25vZGVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdFx0b2xkTm9kZTogb2xkTm9kZSxcclxuXHRcdFx0XHRcdG5ld05vZGU6IGN1cnJlbnROb2RlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBjdXJyZW50IG5vZGUgdGhhdCBjb250YWlucyB0aGUgc2VsZWN0aW9uL2NhcmV0IGluXHJcblx0XHQgKiBXWVNJV1lHIG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gez9Ob2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjdXJyZW50Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5jdXJyZW50Tm9kZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnROb2RlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIG5vZGUgdGhhdCBjb250YWlucyB0aGVcclxuXHRcdCAqIHNlbGVjdGlvbi9jYXJldCBpbiBXWVNJV1lHIG1vZGUuXHJcblx0XHQgKlxyXG5cdFx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gez9Ob2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjdXJyZW50QmxvY2tOb2RlXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC40XHJcblx0XHQgKi9cclxuXHRcdGJhc2UuY3VycmVudEJsb2NrTm9kZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGN1cnJlbnRCbG9ja05vZGU7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVXBkYXRlcyBpZiBidXR0b25zIGFyZSBhY3RpdmUgb3Igbm90XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR1cGRhdGVBY3RpdmVCdXR0b25zID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0XHR2YXIgYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcclxuXHRcdFx0dmFyIGRvYyA9IHd5c2l3eWdEb2N1bWVudDtcclxuXHRcdFx0dmFyIGlzU291cmNlID0gYmFzZS5zb3VyY2VNb2RlKCk7XHJcblxyXG5cdFx0XHRpZiAoYmFzZS5yZWFkT25seSgpKSB7XHJcblx0XHRcdFx0dXRpbHMuZWFjaChkb20uZmluZCh0b29sYmFyLCBhY3RpdmVDbGFzcyksIGZ1bmN0aW9uIChfLCBtZW51SXRlbSkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKG1lbnVJdGVtLCBhY3RpdmVDbGFzcyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIWlzU291cmNlKSB7XHJcblx0XHRcdFx0cGFyZW50ID0gcmFuZ2VIZWxwZXIucGFyZW50Tm9kZSgpO1xyXG5cdFx0XHRcdGZpcnN0QmxvY2sgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KHBhcmVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgYnRuU3RhdGVIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHZhciBzdGF0ZSA9IDA7XHJcblx0XHRcdFx0dmFyIGJ0biA9IHRvb2xiYXJCdXR0b25zW2J0blN0YXRlSGFuZGxlcnNbal0ubmFtZV07XHJcblx0XHRcdFx0dmFyIHN0YXRlRm4gPSBidG5TdGF0ZUhhbmRsZXJzW2pdLnN0YXRlO1xyXG5cdFx0XHRcdHZhciBpc0Rpc2FibGVkID0gKGlzU291cmNlICYmICFidG4uX3NjZVR4dE1vZGUpIHx8XHJcblx0XHRcdFx0XHQoIWlzU291cmNlICYmICFidG4uX3NjZVd5c2l3eWdNb2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XHJcblx0XHRcdFx0XHRpZiAoIWlzU291cmNlKSB7XHJcblx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcclxuXHJcblx0XHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0XHRcdGlmIChzdGF0ZSA+IC0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRTdGF0ZShzdGF0ZUZuKSA/IDEgOiAwO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIWlzRGlzYWJsZWQpIHtcclxuXHRcdFx0XHRcdHN0YXRlID0gc3RhdGVGbi5jYWxsKGJhc2UsIHBhcmVudCwgZmlyc3RCbG9jayk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkIHx8IHN0YXRlIDwgMCk7XHJcblx0XHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgYWN0aXZlQ2xhc3MsIHN0YXRlID4gMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpY29ucyAmJiBpY29ucy51cGRhdGUpIHtcclxuXHRcdFx0XHRpY29ucy51cGRhdGUoaXNTb3VyY2UsIHBhcmVudCwgZmlyc3RCbG9jayk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIGFueSBrZXkgcHJlc3MgaW4gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlS2V5UHJlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHQvLyBGRiBidWc6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTUwMTQ5NlxyXG5cdFx0XHRpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRiYXNlLmNsb3NlRHJvcERvd24oKTtcclxuXHJcblx0XHRcdC8vIDEzID0gZW50ZXIga2V5XHJcblx0XHRcdGlmIChlLndoaWNoID09PSAxMykge1xyXG5cdFx0XHRcdHZhciBMSVNUX1RBR1MgPSAnbGksdWwsb2wnO1xyXG5cclxuXHRcdFx0XHQvLyBcIkZpeFwiIChjbHVkZ2UpIGZvciBibG9ja2xldmVsIGVsZW1lbnRzIGJlaW5nIGR1cGxpY2F0ZWQgaW4gc29tZVxyXG5cdFx0XHRcdC8vIGJyb3dzZXJzIHdoZW4gZW50ZXIgaXMgcHJlc3NlZCBpbnN0ZWFkIG9mIGluc2VydGluZyBhIG5ld2xpbmVcclxuXHRcdFx0XHRpZiAoIWRvbS5pcyhjdXJyZW50QmxvY2tOb2RlLCBMSVNUX1RBR1MpICYmXHJcblx0XHRcdFx0XHRkb20uaGFzU3R5bGluZyhjdXJyZW50QmxvY2tOb2RlKSkge1xyXG5cclxuXHRcdFx0XHRcdHZhciBiciA9IGRvbS5jcmVhdGVFbGVtZW50KCdicicsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdFx0cmFuZ2VIZWxwZXIuaW5zZXJ0Tm9kZShicik7XHJcblxyXG5cdFx0XHRcdFx0Ly8gTGFzdCA8YnI+IG9mIGEgYmxvY2sgd2lsbCBiZSBjb2xsYXBzZWQgIHNvIG5lZWQgdG8gbWFrZSBzdXJlXHJcblx0XHRcdFx0XHQvLyB0aGUgPGJyPiB0aGF0IHdhcyBpbnNlcnRlZCBpc24ndCB0aGUgbGFzdCBub2RlIG9mIGEgYmxvY2suXHJcblx0XHRcdFx0XHR2YXIgcGFyZW50ID0gYnIucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRcdHZhciBsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdENoaWxkO1xyXG5cclxuXHRcdFx0XHRcdC8vIFNvbWV0aW1lcyBhbiBlbXB0eSBuZXh0IG5vZGUgaXMgY3JlYXRlZCBhZnRlciB0aGUgPGJyPlxyXG5cdFx0XHRcdFx0aWYgKGxhc3RDaGlsZCAmJiBsYXN0Q2hpbGQubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgJiZcclxuXHRcdFx0XHRcdFx0bGFzdENoaWxkLm5vZGVWYWx1ZSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdFx0ZG9tLnJlbW92ZShsYXN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdENoaWxkO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdC8vIElmIHRoaXMgaXMgdGhlIGxhc3QgQlIgb2YgYSBibG9jayBhbmQgdGhlIHByZXZpb3VzXHJcblx0XHRcdFx0XHQvLyBzaWJsaW5nIGlzIGlubGluZSB0aGVuIHdpbGwgbmVlZCBhbiBleHRyYSBCUi4gVGhpc1xyXG5cdFx0XHRcdFx0Ly8gaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGxhc3QgQlIgb2YgYSBibG9jayB3aWxsIGJlXHJcblx0XHRcdFx0XHQvLyBjb2xsYXBzZWQuIEZpeGVzIGlzc3VlICMyNDhcclxuXHRcdFx0XHRcdGlmICghZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkgJiYgbGFzdENoaWxkID09PSBiciAmJlxyXG5cdFx0XHRcdFx0XHRkb20uaXNJbmxpbmUoYnIucHJldmlvdXNTaWJsaW5nKSkge1xyXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5pbnNlcnRIVE1MKCc8YnI+Jyk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIE1ha2VzIHN1cmUgdGhhdCBpZiB0aGVyZSBpcyBhIGNvZGUgb3IgcXVvdGUgdGFnIGF0IHRoZVxyXG5cdFx0ICogZW5kIG9mIHRoZSBlZGl0b3IsIHRoYXQgdGhlcmUgaXMgYSBuZXcgbGluZSBhZnRlciBpdC5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB0aGVyZSB3YXNuJ3QgYSBuZXcgbGluZSBhdCB0aGUgZW5kIHlvdSB3b3VsZG4ndCBiZSBhYmxlXHJcblx0XHQgKiB0byBlbnRlciBhbnkgdGV4dCBhZnRlciBhIGNvZGUvcXVvdGUgdGFnXHJcblx0XHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0YXBwZW5kTmV3TGluZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Ly8gQ2hlY2sgYWxsIG5vZGVzIGluIHJldmVyc2UgdW50aWwgZWl0aGVyIGFkZCBhIG5ldyBsaW5lXHJcblx0XHRcdC8vIG9yIHJlYWNoIGEgbm9uLWVtcHR5IHRleHRub2RlIG9yIEJSIGF0IHdoaWNoIHBvaW50IGNhblxyXG5cdFx0XHQvLyBzdG9wIGNoZWNraW5nLlxyXG5cdFx0XHRkb20uclRyYXZlcnNlKHd5c2l3eWdCb2R5LCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0XHRcdC8vIExhc3QgYmxvY2ssIGFkZCBuZXcgbGluZSBhZnRlciBpZiBoYXMgc3R5bGluZ1xyXG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmXHJcblx0XHRcdFx0XHQhL2lubGluZS8udGVzdChkb20uY3NzKG5vZGUsICdkaXNwbGF5JykpKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQWRkIGxpbmUgYnJlYWsgYWZ0ZXIgaWYgaGFzIHN0eWxpbmdcclxuXHRcdFx0XHRcdGlmICghZG9tLmlzKG5vZGUsICcuZW1sZWRpdG9yLW5sZicpICYmIGRvbS5oYXNTdHlsaW5nKG5vZGUpKSB7XHJcblx0XHRcdFx0XHRcdHZhciBwYXJhZ3JhcGggPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCB3eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdFx0XHRwYXJhZ3JhcGguY2xhc3NOYW1lID0gJ2VtbGVkaXRvci1ubGYnO1xyXG5cdFx0XHRcdFx0XHRwYXJhZ3JhcGguaW5uZXJIVE1MID0gJzxiciAvPic7XHJcblx0XHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3eXNpd3lnQm9keSwgcGFyYWdyYXBoKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gTGFzdCBub24tZW1wdHkgdGV4dCBub2RlIG9yIGxpbmUgYnJlYWsuXHJcblx0XHRcdFx0Ly8gTm8gbmVlZCB0byBhZGQgbGluZS1icmVhayBhZnRlciB0aGVtXHJcblx0XHRcdFx0aWYgKChub2RlLm5vZGVUeXBlID09PSAzICYmICEvXlxccyokLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkgfHxcclxuXHRcdFx0XHRcdGRvbS5pcyhub2RlLCAnYnInKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyBmb3JtIHJlc2V0IGV2ZW50XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVGb3JtUmVzZXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGJhc2UudmFsKHRleHRhcmVhLnZhbHVlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIGFueSBtb3VzZWRvd24gcHJlc3MgaW4gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGJhc2UuY2xvc2VEcm9wRG93bigpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRyYW5zbGF0ZXMgdGhlIHN0cmluZyBpbnRvIHRoZSBsb2NhbGUgbGFuZ3VhZ2UuXHJcblx0XHQgKlxyXG5cdFx0ICogUmVwbGFjZXMgYW55IHswfSwgezF9LCB7Mn0sIGVjdC4gd2l0aCB0aGUgcGFyYW1zIHByb3ZpZGVkLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuXHRcdCAqIEBwYXJhbSB7Li4uU3RyaW5nfSBhcmdzXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIF9cclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdGJhc2UuXyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIHVuZGVmLCBhcmdzID0gYXJndW1lbnRzO1xyXG5cclxuXHRcdFx0aWYgKGxvY2FsZSAmJiBsb2NhbGVbYXJnc1swXV0pIHtcclxuXHRcdFx0XHRhcmdzWzBdID0gbG9jYWxlW2FyZ3NbMF1dO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYXJnc1swXS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgZnVuY3Rpb24gKHN0ciwgcDEpIHtcclxuXHRcdFx0XHRyZXR1cm4gYXJnc1twMSAtIDAgKyAxXSAhPT0gdW5kZWYgP1xyXG5cdFx0XHRcdFx0YXJnc1twMSAtIDAgKyAxXSA6XHJcblx0XHRcdFx0XHQneycgKyBwMSArICd9JztcclxuXHRcdFx0fSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUGFzc2VzIGV2ZW50cyBvbiB0byBhbnkgaGFuZGxlcnNcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKiBAcmV0dXJuIHZvaWRcclxuXHRcdCAqL1xyXG5cdFx0aGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRpZiAocGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHRcdC8vIFNlbmQgZXZlbnQgdG8gYWxsIHBsdWdpbnNcclxuXHRcdFx0XHRwbHVnaW5NYW5hZ2VyLmNhbGwoZS50eXBlICsgJ0V2ZW50JywgZSwgYmFzZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGNvbnZlcnQgdGhlIGV2ZW50IGludG8gYSBjdXN0b20gZXZlbnQgdG8gc2VuZFxyXG5cdFx0XHR2YXIgbmFtZSA9IChlLnRhcmdldCA9PT0gc291cmNlRWRpdG9yID8gJ3NjZXNyYycgOiAnc2Nld3lzJykgKyBlLnR5cGU7XHJcblxyXG5cdFx0XHRpZiAoZXZlbnRIYW5kbGVyc1tuYW1lXSkge1xyXG5cdFx0XHRcdGV2ZW50SGFuZGxlcnNbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcclxuXHRcdFx0XHRcdGZuLmNhbGwoYmFzZSwgZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBCaW5kcyBhIGhhbmRsZXIgdG8gdGhlIHNwZWNpZmllZCBldmVudHNcclxuXHRcdCAqXHJcblx0XHQgKiBUaGlzIGZ1bmN0aW9uIG9ubHkgYmluZHMgdG8gYSBsaW1pdGVkIGxpc3Qgb2ZcclxuXHRcdCAqIHN1cHBvcnRlZCBldmVudHMuXHJcblx0XHQgKlxyXG5cdFx0ICogVGhlIHN1cHBvcnRlZCBldmVudHMgYXJlOlxyXG5cdFx0ICpcclxuXHRcdCAqICoga2V5dXBcclxuXHRcdCAqICoga2V5ZG93blxyXG5cdFx0ICogKiBLZXlwcmVzc1xyXG5cdFx0ICogKiBibHVyXHJcblx0XHQgKiAqIGZvY3VzXHJcblx0XHQgKiAqIGlucHV0XHJcblx0XHQgKiAqIG5vZGVjaGFuZ2VkIC0gV2hlbiB0aGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmdcclxuXHRcdCAqIFx0XHR0aGUgc2VsZWN0aW9uIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlXHJcblx0XHQgKiAqIGNvbnRleHRtZW51XHJcblx0XHQgKiAqIHNlbGVjdGlvbmNoYW5nZWRcclxuXHRcdCAqICogdmFsdWVjaGFuZ2VkXHJcblx0XHQgKlxyXG5cdFx0ICpcclxuXHRcdCAqIFRoZSBldmVudHMgcGFyYW0gc2hvdWxkIGJlIGEgc3RyaW5nIGNvbnRhaW5pbmcgdGhlIGV2ZW50KHMpXHJcblx0XHQgKiB0byBiaW5kIHRoaXMgaGFuZGxlciB0by4gSWYgbXVsdGlwbGUsIHRoZXkgc2hvdWxkIGJlIHNlcGFyYXRlZFxyXG5cdFx0ICogYnkgc3BhY2VzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGJpbmRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5iaW5kID0gZnVuY3Rpb24gKGV2ZW50cywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdFx0ZXZlbnRzID0gZXZlbnRzLnNwbGl0KCcgJyk7XHJcblxyXG5cdFx0XHR2YXIgaSA9IGV2ZW50cy5sZW5ndGg7XHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHRcdFx0dmFyIHd5c0V2ZW50ID0gJ3NjZXd5cycgKyBldmVudHNbaV07XHJcblx0XHRcdFx0XHR2YXIgc3JjRXZlbnQgPSAnc2Nlc3JjJyArIGV2ZW50c1tpXTtcclxuXHRcdFx0XHRcdC8vIFVzZSBjdXN0b20gZXZlbnRzIHRvIGFsbG93IHBhc3NpbmcgdGhlIGluc3RhbmNlIGFzIHRoZVxyXG5cdFx0XHRcdFx0Ly8gMm5kIGFyZ3VtZW50LlxyXG5cdFx0XHRcdFx0Ly8gQWxzbyBhbGxvd3MgdW5iaW5kaW5nIHdpdGhvdXQgdW5iaW5kaW5nIHRoZSBlZGl0b3JzIG93blxyXG5cdFx0XHRcdFx0Ly8gZXZlbnQgaGFuZGxlcnMuXHJcblx0XHRcdFx0XHRpZiAoIWV4Y2x1ZGVXeXNpd3lnKSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdID0gZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gfHwgW107XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdLnB1c2goaGFuZGxlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdID0gZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0gfHwgW107XHJcblx0XHRcdFx0XHRcdGV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdLnB1c2goaGFuZGxlcik7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0Ly8gU3RhcnQgc2VuZGluZyB2YWx1ZSBjaGFuZ2VkIGV2ZW50c1xyXG5cdFx0XHRcdFx0aWYgKGV2ZW50c1tpXSA9PT0gJ3ZhbHVlY2hhbmdlZCcpIHtcclxuXHRcdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZC5oYXNIYW5kbGVyID0gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFVuYmluZHMgYW4gZXZlbnQgdGhhdCB3YXMgYm91bmQgdXNpbmcgYmluZCgpLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSB1bmJpbmRpbmcgdGhpc1xyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSB1bmJpbmRpbmcgdGhpc1xyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSB1bmJpbmRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBzZWUgYmluZFxyXG5cdFx0ICovXHJcblx0XHRiYXNlLnVuYmluZCA9IGZ1bmN0aW9uIChldmVudHMsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdGV2ZW50cyA9IGV2ZW50cy5zcGxpdCgnICcpO1xyXG5cclxuXHRcdFx0dmFyIGkgPSBldmVudHMubGVuZ3RoO1xyXG5cdFx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRcdGlmICghZXhjbHVkZVd5c2l3eWcpIHtcclxuXHRcdFx0XHRcdFx0dXRpbHMuYXJyYXlSZW1vdmUoXHJcblx0XHRcdFx0XHRcdFx0ZXZlbnRIYW5kbGVyc1snc2Nld3lzJyArIGV2ZW50c1tpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmICghZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0XHRldmVudEhhbmRsZXJzWydzY2VzcmMnICsgZXZlbnRzW2ldXSB8fCBbXSwgaGFuZGxlcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBCbHVycyB0aGUgZWRpdG9ycyBpbnB1dCBhcmVhXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgYmx1clxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjMuNlxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBlZGl0b3JzIGJsdXIgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGJsdXJeMlxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmJsdXIgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRiYXNlLmJpbmQoJ2JsdXInLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoIWJhc2Uuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0d3lzaXd5Z0JvZHkuYmx1cigpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHNvdXJjZUVkaXRvci5ibHVyKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEZvY3VzZXMgdGhlIGVkaXRvcnMgaW5wdXQgYXJlYVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGZvY3VzXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYW4gZXZlbnQgaGFuZGxlciB0byB0aGUgZm9jdXMgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGZvY3VzXjJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5mb2N1cyA9IGZ1bmN0aW9uIChoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHRcdGJhc2UuYmluZCgnZm9jdXMnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoIWJhc2UuaW5Tb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHQvLyBBbHJlYWR5IGhhcyBmb2N1cyBzbyBkbyBub3RoaW5nXHJcblx0XHRcdFx0aWYgKGRvbS5maW5kKHd5c2l3eWdEb2N1bWVudCwgJzpmb2N1cycpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIGNvbnRhaW5lcjtcclxuXHRcdFx0XHR2YXIgcm5nID0gcmFuZ2VIZWxwZXIuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0XHQvLyBGaXggRkYgYnVnIHdoZXJlIGl0IHNob3dzIHRoZSBjdXJzb3IgaW4gdGhlIHdyb25nIHBsYWNlXHJcblx0XHRcdFx0Ly8gaWYgdGhlIGVkaXRvciBoYXNuJ3QgaGFkIGZvY3VzIGJlZm9yZS4gU2VlIGlzc3VlICMzOTNcclxuXHRcdFx0XHRpZiAoIWN1cnJlbnRTZWxlY3Rpb24pIHtcclxuXHRcdFx0XHRcdGF1dG9mb2N1cyh0cnVlKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGlmIGN1cnNvciBpcyBzZXQgYWZ0ZXIgYSBCUiB3aGVuIHRoZSBCUiBpcyB0aGUgb25seVxyXG5cdFx0XHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXHJcblx0XHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdFx0aWYgKHJuZyAmJiBybmcuZW5kT2Zmc2V0ID09PSAxICYmIHJuZy5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRcdGNvbnRhaW5lciA9IHJuZy5lbmRDb250YWluZXI7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcclxuXHRcdFx0XHRcdFx0ZG9tLmlzKGNvbnRhaW5lci5maXJzdENoaWxkLCAnYnInKSkge1xyXG5cdFx0XHRcdFx0XHRybmcuc2V0U3RhcnRCZWZvcmUoY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJuZyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR3eXNpd3lnV2luZG93LmZvY3VzKCk7XHJcblx0XHRcdFx0d3lzaXd5Z0JvZHkuZm9jdXMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cclxuXHRcdFx0cmV0dXJuIGJhc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBkb3duIGV2ZW50XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBrZXlEb3duXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKi9cclxuXHRcdGJhc2Uua2V5RG93biA9IGZ1bmN0aW9uIChoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0XHRyZXR1cm4gYmFzZS5iaW5kKCdrZXlkb3duJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBrZXkgcHJlc3MgZXZlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGtleVByZXNzXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4xXHJcblx0XHQgKi9cclxuXHRcdGJhc2Uua2V5UHJlc3MgPSBmdW5jdGlvbiAoaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpIHtcclxuXHRcdFx0cmV0dXJuIGJhc2VcclxuXHRcdFx0XHQuYmluZCgna2V5cHJlc3MnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSB1cCBldmVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUga2V5VXBcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5rZXlVcCA9IGZ1bmN0aW9uIChoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSkge1xyXG5cdFx0XHRyZXR1cm4gYmFzZS5iaW5kKCdrZXl1cCcsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgbm9kZSBjaGFuZ2VkIGV2ZW50LlxyXG5cdFx0ICpcclxuXHRcdCAqIEhhcHBlbnMgd2hlbmV2ZXIgdGhlIG5vZGUgY29udGFpbmluZyB0aGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0XHQgKiBjaGFuZ2VzIGluIFdZU0lXWUcgbW9kZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgbm9kZUNoYW5nZWRcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5ub2RlQ2hhbmdlZCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcblx0XHRcdHJldHVybiBiYXNlLmJpbmQoJ25vZGVjaGFuZ2VkJywgaGFuZGxlciwgZmFsc2UsIHRydWUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBzZWxlY3Rpb24gY2hhbmdlZCBldmVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEhhcHBlbnMgd2hlbmV2ZXIgdGhlIHNlbGVjdGlvbiBjaGFuZ2VzIGluIFdZU0lXWUcgbW9kZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMVxyXG5cdFx0ICovXHJcblx0XHRiYXNlLnNlbGVjdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xyXG5cdFx0XHRyZXR1cm4gYmFzZS5iaW5kKCdzZWxlY3Rpb25jaGFuZ2VkJywgaGFuZGxlciwgZmFsc2UsIHRydWUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSB2YWx1ZSBjaGFuZ2VkIGV2ZW50XHJcblx0XHQgKlxyXG5cdFx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgY3VycmVudCBlZGl0b3IgdmFsdWUgY2hhbmdlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBXaGVuZXZlciBhbnl0aGluZyBpcyBpbnNlcnRlZCwgdGhlIHZhbHVlIGNoYW5nZWQgb3JcclxuXHRcdCAqIDEuNSBzZWNzIGFmdGVyIHRleHQgaXMgdHlwZWQuIElmIGEgc3BhY2UgaXMgdHlwZWQgaXQgd2lsbFxyXG5cdFx0ICogY2F1c2UgdGhlIGV2ZW50IHRvIGJlIHRyaWdnZXJlZCBpbW1lZGlhdGVseSBpbnN0ZWFkIG9mXHJcblx0XHQgKiBhZnRlciAxLjUgc2Vjb25kc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgdmFsdWVDaGFuZ2VkXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC41XHJcblx0XHQgKi9cclxuXHRcdGJhc2UudmFsdWVDaGFuZ2VkID0gZnVuY3Rpb24gKGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdHJldHVybiBiYXNlXHJcblx0XHRcdFx0LmJpbmQoJ3ZhbHVlY2hhbmdlZCcsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFbW90aWNvbnMga2V5cHJlc3MgaGFuZGxlclxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1vdGljb25zS2V5UHJlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgcmVwbGFjZWRFbW90aWNvbiwgY2FjaGVQb3MgPSAwLCBlbW90aWNvbnNDYWNoZSA9IGJhc2UuZW1vdGljb25zQ2FjaGUsIGN1ckNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xyXG5cclxuXHRcdFx0Ly8gVE9ETzogTWFrZSBjb25maWd1cmFibGVcclxuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghZW1vdGljb25zQ2FjaGUpIHtcclxuXHRcdFx0XHRlbW90aWNvbnNDYWNoZSA9IFtdO1xyXG5cclxuXHRcdFx0XHR1dGlscy5lYWNoKGFsbEVtb3RpY29ucywgZnVuY3Rpb24gKGtleSwgaHRtbCkge1xyXG5cdFx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbY2FjaGVQb3MrK10gPSBba2V5LCBodG1sXTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGUuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGJhc2UuZW1vdGljb25zQ2FjaGUgPSBlbW90aWNvbnNDYWNoZTtcclxuXHRcdFx0XHRiYXNlLmxvbmdlc3RFbW90aWNvbkNvZGUgPVxyXG5cdFx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbZW1vdGljb25zQ2FjaGUubGVuZ3RoIC0gMV1bMF0ubGVuZ3RoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXBsYWNlZEVtb3RpY29uID0gcmFuZ2VIZWxwZXIucmVwbGFjZUtleXdvcmQoXHJcblx0XHRcdFx0YmFzZS5lbW90aWNvbnNDYWNoZSxcclxuXHRcdFx0XHR0cnVlLFxyXG5cdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0YmFzZS5sb25nZXN0RW1vdGljb25Db2RlLFxyXG5cdFx0XHRcdG9wdGlvbnMuZW1vdGljb25zQ29tcGF0LFxyXG5cdFx0XHRcdGN1ckNoYXJcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdGlmIChyZXBsYWNlZEVtb3RpY29uKSB7XHJcblx0XHRcdFx0aWYgKCFvcHRpb25zLmVtb3RpY29uc0NvbXBhdCB8fCAhL15cXHMkLy50ZXN0KGN1ckNoYXIpKSB7XHJcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogTWFrZXMgc3VyZSBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0ZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRlbW90aWNvbnMuY2hlY2tXaGl0ZXNwYWNlKGN1cnJlbnRCbG9ja05vZGUsIHJhbmdlSGVscGVyKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGlmIGVtb3RpY29ucyBhcmUgY3VycmVudGx5IGVuYWJsZWRcclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGVtb3RpY29uc1xyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuMlxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIEVuYWJsZXMvZGlzYWJsZXMgZW1vdGljb25zXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBlbmFibGVcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGVtb3RpY29uc14yXHJcblx0XHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdFx0ICogQHNpbmNlIDEuNC4yXHJcblx0XHQgKi9cclxuXHRcdGJhc2UuZW1vdGljb25zID0gZnVuY3Rpb24gKGVuYWJsZSkge1xyXG5cdFx0XHRpZiAoIWVuYWJsZSAmJiBlbmFibGUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0cmV0dXJuIG9wdGlvbnMuZW1vdGljb25zRW5hYmxlZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0b3B0aW9ucy5lbW90aWNvbnNFbmFibGVkID0gZW5hYmxlO1xyXG5cclxuXHRcdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRcdGRvbS5vbih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgZW1vdGljb25zS2V5UHJlc3MpO1xyXG5cclxuXHRcdFx0XHRpZiAoIWJhc2Uuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0XHRyZXBsYWNlRW1vdGljb25zKCk7XHJcblx0XHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFyIGVtb3RpY29ucyA9IGRvbS5maW5kKHd5c2l3eWdCb2R5LCAnaW1nW2RhdGEtZW1sZWRpdG9yLWVtb3RpY29uXScpO1xyXG5cclxuXHRcdFx0XHR1dGlscy5lYWNoKGVtb3RpY29ucywgZnVuY3Rpb24gKF8sIGltZykge1xyXG5cdFx0XHRcdFx0dmFyIHRleHQgPSBkb20uZGF0YShpbWcsICdlbWxlZGl0b3ItZW1vdGljb24nKTtcclxuXHRcdFx0XHRcdHZhciB0ZXh0Tm9kZSA9IHd5c2l3eWdEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxuXHRcdFx0XHRcdGltZy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgaW1nKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0ZG9tLm9mZih3eXNpd3lnQm9keSwgJ2tleXByZXNzJywgZW1vdGljb25zS2V5UHJlc3MpO1xyXG5cclxuXHRcdFx0XHR0cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGN1cnJlbnQgV1lTSVdZRyBlZGl0b3JzIGlubGluZSBDU1NcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNzc1xyXG5cdFx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHRcdCAqIEBzaW5jZSAxLjQuM1xyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIFNldHMgaW5saW5lIENTUyBmb3IgdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGNzc1xyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY3NzXjJcclxuXHRcdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0XHQgKiBAc2luY2UgMS40LjNcclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5jc3MgPSBmdW5jdGlvbiAoY3NzKSB7XHJcblx0XHRcdGlmICghaW5saW5lQ3NzKSB7XHJcblx0XHRcdFx0aW5saW5lQ3NzID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywge1xyXG5cdFx0XHRcdFx0aWQ6ICdpbmxpbmUnXHJcblx0XHRcdFx0fSwgd3lzaXd5Z0RvY3VtZW50KTtcclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKHd5c2l3eWdEb2N1bWVudC5oZWFkLCBpbmxpbmVDc3MpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKGNzcykpIHtcclxuXHRcdFx0XHRyZXR1cm4gaW5saW5lQ3NzLnN0eWxlU2hlZXQgP1xyXG5cdFx0XHRcdFx0aW5saW5lQ3NzLnN0eWxlU2hlZXQuY3NzVGV4dCA6IGlubGluZUNzcy5pbm5lckhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpbmxpbmVDc3Muc3R5bGVTaGVldCkge1xyXG5cdFx0XHRcdGlubGluZUNzcy5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGJhc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSGFuZGxlcyB0aGUga2V5ZG93biBldmVudCwgdXNlZCBmb3Igc2hvcnRjdXRzXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVLZXlEb3duID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHNob3J0Y3V0ID0gW10sIFNISUZUX0tFWVMgPSB7XHJcblx0XHRcdFx0J2AnOiAnficsXHJcblx0XHRcdFx0JzEnOiAnIScsXHJcblx0XHRcdFx0JzInOiAnQCcsXHJcblx0XHRcdFx0JzMnOiAnIycsXHJcblx0XHRcdFx0JzQnOiAnJCcsXHJcblx0XHRcdFx0JzUnOiAnJScsXHJcblx0XHRcdFx0JzYnOiAnXicsXHJcblx0XHRcdFx0JzcnOiAnJicsXHJcblx0XHRcdFx0JzgnOiAnKicsXHJcblx0XHRcdFx0JzknOiAnKCcsXHJcblx0XHRcdFx0JzAnOiAnKScsXHJcblx0XHRcdFx0Jy0nOiAnXycsXHJcblx0XHRcdFx0Jz0nOiAnKycsXHJcblx0XHRcdFx0JzsnOiAnOiAnLFxyXG5cdFx0XHRcdCdcXCcnOiAnXCInLFxyXG5cdFx0XHRcdCcsJzogJzwnLFxyXG5cdFx0XHRcdCcuJzogJz4nLFxyXG5cdFx0XHRcdCcvJzogJz8nLFxyXG5cdFx0XHRcdCdcXFxcJzogJ3wnLFxyXG5cdFx0XHRcdCdbJzogJ3snLFxyXG5cdFx0XHRcdCddJzogJ30nXHJcblx0XHRcdH0sIFNQRUNJQUxfS0VZUyA9IHtcclxuXHRcdFx0XHQ4OiAnYmFja3NwYWNlJyxcclxuXHRcdFx0XHQ5OiAndGFiJyxcclxuXHRcdFx0XHQxMzogJ2VudGVyJyxcclxuXHRcdFx0XHQxOTogJ3BhdXNlJyxcclxuXHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcclxuXHRcdFx0XHQyNzogJ2VzYycsXHJcblx0XHRcdFx0MzI6ICdzcGFjZScsXHJcblx0XHRcdFx0MzM6ICdwYWdldXAnLFxyXG5cdFx0XHRcdDM0OiAncGFnZWRvd24nLFxyXG5cdFx0XHRcdDM1OiAnZW5kJyxcclxuXHRcdFx0XHQzNjogJ2hvbWUnLFxyXG5cdFx0XHRcdDM3OiAnbGVmdCcsXHJcblx0XHRcdFx0Mzg6ICd1cCcsXHJcblx0XHRcdFx0Mzk6ICdyaWdodCcsXHJcblx0XHRcdFx0NDA6ICdkb3duJyxcclxuXHRcdFx0XHQ0NTogJ2luc2VydCcsXHJcblx0XHRcdFx0NDY6ICdkZWwnLFxyXG5cdFx0XHRcdDkxOiAnd2luJyxcclxuXHRcdFx0XHQ5MjogJ3dpbicsXHJcblx0XHRcdFx0OTM6ICdzZWxlY3QnLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOScsXHJcblx0XHRcdFx0MTA2OiAnKicsXHJcblx0XHRcdFx0MTA3OiAnKycsXHJcblx0XHRcdFx0MTA5OiAnLScsXHJcblx0XHRcdFx0MTEwOiAnLicsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0MTEyOiAnZjEnLFxyXG5cdFx0XHRcdDExMzogJ2YyJyxcclxuXHRcdFx0XHQxMTQ6ICdmMycsXHJcblx0XHRcdFx0MTE1OiAnZjQnLFxyXG5cdFx0XHRcdDExNjogJ2Y1JyxcclxuXHRcdFx0XHQxMTc6ICdmNicsXHJcblx0XHRcdFx0MTE4OiAnZjcnLFxyXG5cdFx0XHRcdDExOTogJ2Y4JyxcclxuXHRcdFx0XHQxMjA6ICdmOScsXHJcblx0XHRcdFx0MTIxOiAnZjEwJyxcclxuXHRcdFx0XHQxMjI6ICdmMTEnLFxyXG5cdFx0XHRcdDEyMzogJ2YxMicsXHJcblx0XHRcdFx0MTQ0OiAnbnVtbG9jaycsXHJcblx0XHRcdFx0MTQ1OiAnc2Nyb2xsbG9jaycsXHJcblx0XHRcdFx0MTg2OiAnOycsXHJcblx0XHRcdFx0MTg3OiAnPScsXHJcblx0XHRcdFx0MTg4OiAnLCcsXHJcblx0XHRcdFx0MTg5OiAnLScsXHJcblx0XHRcdFx0MTkwOiAnLicsXHJcblx0XHRcdFx0MTkxOiAnLycsXHJcblx0XHRcdFx0MTkyOiAnYCcsXHJcblx0XHRcdFx0MjE5OiAnWycsXHJcblx0XHRcdFx0MjIwOiAnXFxcXCcsXHJcblx0XHRcdFx0MjIxOiAnXScsXHJcblx0XHRcdFx0MjIyOiAnXFwnJ1xyXG5cdFx0XHR9LCBOVU1QQURfU0hJRlRfS0VZUyA9IHtcclxuXHRcdFx0XHQxMDk6ICctJyxcclxuXHRcdFx0XHQxMTA6ICdkZWwnLFxyXG5cdFx0XHRcdDExMTogJy8nLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOSdcclxuXHRcdFx0fSwgd2hpY2ggPSBlLndoaWNoLCBjaGFyYWN0ZXIgPSBTUEVDSUFMX0tFWVNbd2hpY2hdIHx8XHJcblx0XHRcdFx0U3RyaW5nLmZyb21DaGFyQ29kZSh3aGljaCkudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRcdGlmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XHJcblx0XHRcdFx0c2hvcnRjdXQucHVzaCgnY3RybCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZS5hbHRLZXkpIHtcclxuXHRcdFx0XHRzaG9ydGN1dC5wdXNoKCdhbHQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGUuc2hpZnRLZXkpIHtcclxuXHRcdFx0XHRzaG9ydGN1dC5wdXNoKCdzaGlmdCcpO1xyXG5cclxuXHRcdFx0XHRpZiAoTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdKSB7XHJcblx0XHRcdFx0XHRjaGFyYWN0ZXIgPSBOVU1QQURfU0hJRlRfS0VZU1t3aGljaF07XHJcblx0XHRcdFx0fSBlbHNlIGlmIChTSElGVF9LRVlTW2NoYXJhY3Rlcl0pIHtcclxuXHRcdFx0XHRcdGNoYXJhY3RlciA9IFNISUZUX0tFWVNbY2hhcmFjdGVyXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNoaWZ0IGlzIDE2LCBjdHJsIGlzIDE3IGFuZCBhbHQgaXMgMThcclxuXHRcdFx0aWYgKGNoYXJhY3RlciAmJiAod2hpY2ggPCAxNiB8fCB3aGljaCA+IDE4KSkge1xyXG5cdFx0XHRcdHNob3J0Y3V0LnB1c2goY2hhcmFjdGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2hvcnRjdXQgPSBzaG9ydGN1dC5qb2luKCcrJyk7XHJcblx0XHRcdGlmIChzaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XSAmJlxyXG5cdFx0XHRcdHNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdLmNhbGwoYmFzZSkgPT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIHNob3J0Y3V0IGhhbmRsZXIgdG8gdGhlIGVkaXRvclxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICBzaG9ydGN1dFxyXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfEZ1bmN0aW9ufSBjbWRcclxuXHRcdCAqIEByZXR1cm4ge2VtbGVkaXRvcn1cclxuXHRcdCAqL1xyXG5cdFx0YmFzZS5hZGRTaG9ydGN1dCA9IGZ1bmN0aW9uIChzaG9ydGN1dCwgY21kKSB7XHJcblx0XHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRcdGlmICh1dGlscy5pc1N0cmluZyhjbWQpKSB7XHJcblx0XHRcdFx0c2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0gPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHRoYW5kbGVDb21tYW5kKHRvb2xiYXJCdXR0b25zW2NtZF0sIGJhc2UuY29tbWFuZHNbY21kXSk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0c2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0gPSBjbWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBiYXNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZXMgYSBzaG9ydGN1dCBoYW5kbGVyXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNob3J0Y3V0XHJcblx0XHQgKiBAcmV0dXJuIHtlbWxlZGl0b3J9XHJcblx0XHQgKi9cclxuXHRcdGJhc2UucmVtb3ZlU2hvcnRjdXQgPSBmdW5jdGlvbiAoc2hvcnRjdXQpIHtcclxuXHRcdFx0ZGVsZXRlIHNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXQudG9Mb3dlckNhc2UoKV07XHJcblxyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBIYW5kbGVzIHRoZSBiYWNrc3BhY2Uga2V5IHByZXNzXHJcblx0XHQgKlxyXG5cdFx0ICogV2lsbCByZW1vdmUgYmxvY2sgc3R5bGluZyBsaWtlIHF1b3Rlcy9jb2RlIGVjdCBpZiBhdCB0aGUgc3RhcnQuXHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRoYW5kbGVCYWNrU3BhY2UgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgbm9kZSwgb2Zmc2V0LCByYW5nZSwgcGFyZW50O1xyXG5cclxuXHRcdFx0Ly8gOCBpcyB0aGUgYmFja3NwYWNlIGtleVxyXG5cdFx0XHRpZiAob3B0aW9ucy5kaXNhYmxlQmxvY2tSZW1vdmUgfHwgZS53aGljaCAhPT0gOCB8fFxyXG5cdFx0XHRcdCEocmFuZ2UgPSByYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCkpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRub2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XHJcblx0XHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cclxuXHRcdFx0aWYgKG9mZnNldCAhPT0gMCB8fCAhKHBhcmVudCA9IGN1cnJlbnRTdHlsZWRCbG9ja05vZGUoKSkgfHxcclxuXHRcdFx0XHRkb20uaXMocGFyZW50LCAnYm9keScpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3aGlsZSAobm9kZSAhPT0gcGFyZW50KSB7XHJcblx0XHRcdFx0d2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcblxyXG5cdFx0XHRcdFx0Ly8gRXZlcnl0aGluZyBidXQgZW1wdHkgdGV4dCBub2RlcyBiZWZvcmUgdGhlIGN1cnNvclxyXG5cdFx0XHRcdFx0Ly8gc2hvdWxkIHByZXZlbnQgdGhlIHN0eWxlIGZyb20gYmVpbmcgcmVtb3ZlZFxyXG5cdFx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUgfHwgbm9kZS5ub2RlVmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCEobm9kZSA9IG5vZGUucGFyZW50Tm9kZSkpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFRoZSBiYWNrc3BhY2Ugd2FzIHByZXNzZWQgYXQgdGhlIHN0YXJ0IG9mXHJcblx0XHRcdC8vIHRoZSBjb250YWluZXIgc28gY2xlYXIgdGhlIHN0eWxlXHJcblx0XHRcdGJhc2UuY2xlYXJCbG9ja0Zvcm1hdHRpbmcocGFyZW50KTtcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IHN0eWxlZCBibG9jayBub2RlIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvclxyXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKi9cclxuXHRcdGN1cnJlbnRTdHlsZWRCbG9ja05vZGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBibG9jayA9IGN1cnJlbnRCbG9ja05vZGU7XHJcblxyXG5cdFx0XHR3aGlsZSAoIWRvbS5oYXNTdHlsaW5nKGJsb2NrKSB8fCBkb20uaXNJbmxpbmUoYmxvY2ssIHRydWUpKSB7XHJcblx0XHRcdFx0aWYgKCEoYmxvY2sgPSBibG9jay5wYXJlbnROb2RlKSB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBibG9jaztcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDbGVhcnMgdGhlIGZvcm1hdHRpbmcgb2YgdGhlIHBhc3NlZCBibG9jayBlbGVtZW50LlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGJsb2NrIGlzIGZhbHNlLCBpZiB3aWxsIGNsZWFyIHRoZSBzdHlsaW5nIG9mIHRoZSBmaXJzdFxyXG5cdFx0ICogYmxvY2sgbGV2ZWwgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBjdXJzb3IuXHJcblx0XHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gYmxvY2tcclxuXHRcdCAqIEBzaW5jZSAxLjQuNFxyXG5cdFx0ICovXHJcblx0XHRiYXNlLmNsZWFyQmxvY2tGb3JtYXR0aW5nID0gZnVuY3Rpb24gKGJsb2NrKSB7XHJcblx0XHRcdGJsb2NrID0gYmxvY2sgfHwgY3VycmVudFN0eWxlZEJsb2NrTm9kZSgpO1xyXG5cclxuXHRcdFx0aWYgKCFibG9jayB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblxyXG5cdFx0XHRibG9jay5jbGFzc05hbWUgPSAnJztcclxuXHJcblx0XHRcdGRvbS5hdHRyKGJsb2NrLCAnc3R5bGUnLCAnJyk7XHJcblxyXG5cdFx0XHRpZiAoIWRvbS5pcyhibG9jaywgJ3AsZGl2LHRkJykpIHtcclxuXHRcdFx0XHRkb20uY29udmVydEVsZW1lbnQoYmxvY2ssICdwJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cdFx0XHRyZXR1cm4gYmFzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUcmlnZ2VycyB0aGUgdmFsdWVDaGFuZ2VkIHNpZ25hbCBpZiB0aGVyZSBpc1xyXG5cdFx0ICogYSBwbHVnaW4gdGhhdCBoYW5kbGVzIGl0LlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpIGhhcyBhbHJlYWR5IGJlZW5cclxuXHRcdCAqIGNhbGxlZCwgdGhlbiBzYXZlUmFuZ2Ugc2hvdWxkIGJlIHNldCB0byBmYWxzZVxyXG5cdFx0ICogdG8gcHJldmVudCB0aGUgcmFuZ2UgYmVpbmcgc2F2ZWQgdHdpY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuNC41XHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNhdmVSYW5nZSBJZiB0byBjYWxsIHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpLlxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCA9IGZ1bmN0aW9uIChzYXZlUmFuZ2UpIHtcclxuXHRcdFx0aWYgKCFwbHVnaW5NYW5hZ2VyIHx8XHJcblx0XHRcdFx0KCFwbHVnaW5NYW5hZ2VyLmhhc0hhbmRsZXIoJ3ZhbHVlY2hhbmdlZEV2ZW50JykgJiZcclxuXHRcdFx0XHRcdCF0cmlnZ2VyVmFsdWVDaGFuZ2VkLmhhc0hhbmRsZXIpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgY3VycmVudEh0bWwsIHNvdXJjZU1vZGUgPSBiYXNlLnNvdXJjZU1vZGUoKSwgaGFzU2VsZWN0aW9uID0gIXNvdXJjZU1vZGUgJiYgcmFuZ2VIZWxwZXIuaGFzU2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHQvLyBDb21wb3NpdGlvbiBlbmQgaXNuJ3QgZ3VhcmFudGVlZCB0byBmaXJlIGJ1dCBtdXN0IGhhdmVcclxuXHRcdFx0Ly8gZW5kZWQgd2hlbiB0cmlnZ2VyVmFsdWVDaGFuZ2VkKCkgaXMgY2FsbGVkIHNvIHJlc2V0IGl0XHJcblx0XHRcdGlzQ29tcG9zaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvLyBEb24ndCBuZWVkIHRvIHNhdmUgdGhlIHJhbmdlIGlmIGVtbGVkaXRvci1zdGFydC1tYXJrZXJcclxuXHRcdFx0Ly8gaXMgcHJlc2VudCBhcyB0aGUgcmFuZ2UgaXMgYWxyZWFkeSBzYXZlZFxyXG5cdFx0XHRzYXZlUmFuZ2UgPSBzYXZlUmFuZ2UgIT09IGZhbHNlICYmXHJcblx0XHRcdFx0IXd5c2l3eWdEb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1sZWRpdG9yLXN0YXJ0LW1hcmtlcicpO1xyXG5cclxuXHRcdFx0Ly8gQ2xlYXIgYW55IGN1cnJlbnQgdGltZW91dCBhcyBpdCdzIG5vdyBiZWVuIHRyaWdnZXJlZFxyXG5cdFx0XHRpZiAodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcikge1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dCh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKTtcclxuXHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChoYXNTZWxlY3Rpb24gJiYgc2F2ZVJhbmdlKSB7XHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGN1cnJlbnRIdG1sID0gc291cmNlTW9kZSA/IHNvdXJjZUVkaXRvci52YWx1ZSA6IHd5c2l3eWdCb2R5LmlubmVySFRNTDtcclxuXHJcblx0XHRcdC8vIE9ubHkgdHJpZ2dlciBpZiBzb21ldGhpbmcgaGFzIGFjdHVhbGx5IGNoYW5nZWQuXHJcblx0XHRcdGlmIChjdXJyZW50SHRtbCAhPT0gdHJpZ2dlclZhbHVlQ2hhbmdlZC5sYXN0VmFsKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZC5sYXN0VmFsID0gY3VycmVudEh0bWw7XHJcblxyXG5cdFx0XHRcdGRvbS50cmlnZ2VyKGVkaXRvckNvbnRhaW5lciwgJ3ZhbHVlY2hhbmdlZCcsIHtcclxuXHRcdFx0XHRcdHJhd1ZhbHVlOiBzb3VyY2VNb2RlID8gYmFzZS52YWwoKSA6IGN1cnJlbnRIdG1sXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChoYXNTZWxlY3Rpb24gJiYgc2F2ZVJhbmdlKSB7XHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGVyZSBpcyBhIGJsdXIgZXZlbnRcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhbHVlQ2hhbmdlZEJsdXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2hvdWxkIGJlIGNhbGxlZCB3aGVuZXZlciB0aGVyZSBpcyBhIGtleXByZXNzIGV2ZW50XHJcblx0XHQgKiBAcGFyYW0gIHtFdmVudH0gZSBUaGUga2V5cHJlc3MgZXZlbnRcclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhbHVlQ2hhbmdlZEtleVVwID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHdoaWNoID0gZS53aGljaCwgbGFzdENoYXIgPSB2YWx1ZUNoYW5nZWRLZXlVcC5sYXN0Q2hhciwgbGFzdFdhc1NwYWNlID0gKGxhc3RDaGFyID09PSAxMyB8fCBsYXN0Q2hhciA9PT0gMzIpLCBsYXN0V2FzRGVsZXRlID0gKGxhc3RDaGFyID09PSA4IHx8IGxhc3RDaGFyID09PSA0Nik7XHJcblxyXG5cdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC5sYXN0Q2hhciA9IHdoaWNoO1xyXG5cclxuXHRcdFx0aWYgKGlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyAxMyA9IHJldHVybiAmIDMyID0gc3BhY2VcclxuXHRcdFx0aWYgKHdoaWNoID09PSAxMyB8fCB3aGljaCA9PT0gMzIpIHtcclxuXHRcdFx0XHRpZiAoIWxhc3RXYXNTcGFjZSkge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIDggPSBiYWNrc3BhY2UgJiA0NiA9IGRlbFxyXG5cdFx0XHR9IGVsc2UgaWYgKHdoaWNoID09PSA4IHx8IHdoaWNoID09PSA0Nikge1xyXG5cdFx0XHRcdGlmICghbGFzdFdhc0RlbGV0ZSkge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcC50cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0KSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdHZhbHVlQ2hhbmdlZEtleVVwLnRyaWdnZXJOZXh0ID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENsZWFyIHRoZSBwcmV2aW91cyB0aW1lb3V0IGFuZCBzZXQgYSBuZXcgb25lLlxyXG5cdFx0XHRjbGVhclRpbWVvdXQodmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XHJcblxyXG5cdFx0XHQvLyBUcmlnZ2VyIHRoZSBldmVudCAxLjVzIGFmdGVyIHRoZSBsYXN0IGtleXByZXNzIGlmIHNwYWNlXHJcblx0XHRcdC8vIGlzbid0IHByZXNzZWQuIFRoaXMgbWlnaHQgbmVlZCB0byBiZSBsb3dlcmVkLCB3aWxsIG5lZWRcclxuXHRcdFx0Ly8gdG8gbG9vayBpbnRvIHdoYXQgdGhlIHNsb3dlc3QgYXZlcmFnZSBDaGFycyBQZXIgTWluIGlzLlxyXG5cdFx0XHR2YWx1ZUNoYW5nZWRLZXlVcFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0aWYgKCFpc0NvbXBvc2luZykge1xyXG5cdFx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgMTUwMCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdGhhbmRsZUNvbXBvc2l0aW9uID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0aXNDb21wb3NpbmcgPSAvc3RhcnQvaS50ZXN0KGUudHlwZSk7XHJcblxyXG5cdFx0XHRpZiAoIWlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdFx0dHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdGF1dG9VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGJhc2UudXBkYXRlT3JpZ2luYWwoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gcnVuIHRoZSBpbml0aWFsaXplclxyXG5cdFx0aW5pdCgpO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBNYXAgY29udGFpbmluZyB0aGUgbG9hZGVkIEVtbEVkaXRvciBsb2NhbGVzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBuYW1lIGxvY2FsZVxyXG4gKiBAbWVtYmVyT2YgZW1sZWRpdG9yXHJcbiAqL1xyXG5FbWxFZGl0b3IubG9jYWxlID0ge307XHJcblxyXG5FbWxFZGl0b3IuZm9ybWF0cyA9IHt9O1xyXG5FbWxFZGl0b3IuaWNvbnMgPSB7fTtcclxuXHJcblxyXG4vKipcclxuICogU3RhdGljIGNvbW1hbmQgaGVscGVyIGNsYXNzXHJcbiAqIEBjbGFzcyBjb21tYW5kXHJcbiAqIEBuYW1lIGVtbGVkaXRvci5jb21tYW5kXHJcbiAqL1xyXG5FbWxFZGl0b3IuY29tbWFuZCA9XHJcbi8qKiBAbGVuZHMgZW1sZWRpdG9yLmNvbW1hbmQgKi9cclxue1xyXG5cdC8qKlxyXG5cdCAqIEdldHMgYSBjb21tYW5kXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdCAqIEByZXR1cm4ge09iamVjdHxudWxsfVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRnZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRyZXR1cm4gZGVmYXVsdENvbW1hbmRzW25hbWVdIHx8IG51bGw7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogPHA+QWRkcyBhIGNvbW1hbmQgdG8gdGhlIGVkaXRvciBvciB1cGRhdGVzIGFuIGV4aXN0aW5nXHJcblx0ICogY29tbWFuZCBpZiBhIGNvbW1hbmQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYWxyZWFkeSBleGlzdHMuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+T25jZSBhIGNvbW1hbmQgaXMgYWRkIGl0IGNhbiBiZSBpbmNsdWRlZCBpbiB0aGUgdG9vbGJhciBieVxyXG5cdCAqIGFkZGluZyBpdCdzIG5hbWUgdG8gdGhlIHRvb2xiYXIgb3B0aW9uIGluIHRoZSBjb25zdHJ1Y3Rvci4gSXRcclxuXHQgKiBjYW4gYWxzbyBiZSBleGVjdXRlZCBtYW51YWxseSBieSBjYWxsaW5nXHJcblx0ICoge0BsaW5rIGVtbGVkaXRvci5leGVjQ29tbWFuZH08L3A+XHJcblx0ICpcclxuXHQgKiBAZXhhbXBsZVxyXG5cdCAqIEVtbEVkaXRvci5jb21tYW5kLnNldChcImhlbGxvXCIsXHJcblx0ICoge1xyXG5cdCAqICAgICBleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0ICogICAgICAgICBhbGVydChcIkhlbGxvIFdvcmxkIVwiKTtcclxuXHQgKiAgICAgfVxyXG5cdCAqIH0pO1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gY21kXHJcblx0ICogQHJldHVybiB7dGhpc3xmYWxzZX0gUmV0dXJucyBmYWxzZSBpZiBuYW1lIG9yIGNtZCBpcyBmYWxzZVxyXG5cdCAqIEBzaW5jZSB2MS4zLjVcclxuXHQgKi9cclxuXHRzZXQ6IGZ1bmN0aW9uIChuYW1lLCBjbWQpIHtcclxuXHRcdGlmICghbmFtZSB8fCAhY21kKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBtZXJnZSBhbnkgZXhpc3RpbmcgY29tbWFuZCBwcm9wZXJ0aWVzXHJcblx0XHRjbWQgPSB1dGlscy5leHRlbmQoZGVmYXVsdENvbW1hbmRzW25hbWVdIHx8IHt9LCBjbWQpO1xyXG5cclxuXHRcdGNtZC5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdEVtbEVkaXRvci5jb21tYW5kLnJlbW92ZShuYW1lKTtcclxuXHRcdH07XHJcblxyXG5cdFx0ZGVmYXVsdENvbW1hbmRzW25hbWVdID0gY21kO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIGNvbW1hbmRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAc2luY2UgdjEuMy41XHJcblx0ICovXHJcblx0cmVtb3ZlOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0aWYgKGRlZmF1bHRDb21tYW5kc1tuYW1lXSkge1xyXG5cdFx0XHRkZWxldGUgZGVmYXVsdENvbW1hbmRzW25hbWVdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufTtcclxuIiwidmFyIFVTRVJfQUdFTlQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4vKipcbiAqIERldGVjdHMgaWYgdGhlIGJyb3dzZXIgaXMgaU9TXG4gKlxuICogTmVlZGVkIHRvIGZpeCBpT1Mgc3BlY2lmaWMgYnVnc1xuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaW9zXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpb3MgPSAvaVBob25lfGlQb2R8aVBhZHwgd29zYnJvd3NlclxcLy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cbi8qKlxuICogSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgV1lTSVdZRyBlZGl0aW5nIChlLmcuIG9sZGVyIG1vYmlsZSBicm93c2VycykuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBpc1d5c2l3eWdTdXBwb3J0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNXeXNpd3lnU3VwcG9ydGVkID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyXHRtYXRjaCwgaXNVbnN1cHBvcnRlZDtcblxuXHQvLyBJRSBpcyB0aGUgb25seSBicm93c2VyIHRvIHN1cHBvcnQgZG9jdW1lbnRNb2RlXG5cdHZhciBpZSA9ICEhd2luZG93LmRvY3VtZW50LmRvY3VtZW50TW9kZTtcblx0dmFyIGxlZ2FjeUVkZ2UgPSAnLW1zLWltZS1hbGlnbicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG5cblx0Ly8gQ2hlY2sgaWYgdGhlIGNvbnRlbnRFZGl0YWJsZSBhdHRyaWJ1dGUgaXMgc3VwcG9ydGVkXG5cdGlmICghKCdjb250ZW50RWRpdGFibGUnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgfHxcblx0XHRkaXYuY29udGVudEVkaXRhYmxlICE9PSAndHJ1ZScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBJIHRoaW5rIGJsYWNrYmVycnkgc3VwcG9ydHMgY29udGVudEVkaXRhYmxlIG9yIHdpbGwgYXQgbGVhc3Rcblx0Ly8gZ2l2ZSBhIHZhbGlkIHZhbHVlIGZvciB0aGUgY29udGVudEVkaXRhYmxlIGRldGVjdGlvbiBhYm92ZVxuXHQvLyBzbyBpdCBpc24ndCBpbmNsdWRlZCBpbiB0aGUgYmVsb3cgdGVzdHMuXG5cblx0Ly8gSSBoYXRlIGhhdmluZyB0byBkbyBVQSBzbmlmZmluZyBidXQgc29tZSBtb2JpbGUgYnJvd3NlcnMgc2F5IHRoZXlcblx0Ly8gc3VwcG9ydCBjb250ZW50ZWRpYWJsZSB3aGVuIGl0IGlzbid0IHVzYWJsZSwgaS5lLiB5b3UgY2FuJ3QgZW50ZXJcblx0Ly8gdGV4dC5cblx0Ly8gVGhpcyBpcyB0aGUgb25seSB3YXkgSSBjYW4gdGhpbmsgb2YgdG8gZGV0ZWN0IHRoZW0gd2hpY2ggaXMgYWxzbyBob3dcblx0Ly8gZXZlcnkgb3RoZXIgZWRpdG9yIEkndmUgc2VlbiBkZWFscyB3aXRoIHRoaXMgaXNzdWUuXG5cblx0Ly8gRXhjbHVkZSBPcGVyYSBtb2JpbGUgYW5kIG1pbmlcblx0aXNVbnN1cHBvcnRlZCA9IC9PcGVyYSBNb2JpfE9wZXJhIE1pbmkvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG5cdGlmICgvQW5kcm9pZC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblxuXHRcdGlmICgvU2FmYXJpLy50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgNTM0KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdFx0XHQvLyBUaGlzIGFsc28gbWF0Y2hlcyBDaHJvbWUgd2hpY2ggc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZSB0b29cblx0XHRcdG1hdGNoID0gL1NhZmFyaVxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRcdGlzVW5zdXBwb3J0ZWQgPSAoIW1hdGNoIHx8ICFtYXRjaFsxXSA/IHRydWUgOiBtYXRjaFsxXSA8IDUzNCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBBbWF6b24gU2lsayBzdXBwb3J0cyBpdCwgb2xkZXIgdmVyc2lvbnMgZGlkbid0XG5cdC8vIEFzIGl0IHVzZXMgd2Via2l0IGxpa2UgQW5kcm9pZCwgYXNzdW1lIGl0J3MgdGhlIHNhbWUgYW5kIHN0YXJ0ZWRcblx0Ly8gd29ya2luZyBhdCB2ZXJzaW9ucyA+PSA1MzRcblx0aWYgKC8gU2lsa1xcLy9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRtYXRjaCA9IC9BcHBsZVdlYktpdFxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHR9XG5cblx0Ly8gaU9TIDUrIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGVcblx0aWYgKGlvcykge1xuXHRcdC8vIEJsb2NrIGFueSB2ZXJzaW9uIDw9IDRfeChfeClcblx0XHRpc1Vuc3VwcG9ydGVkID0gL09TIFswLTRdKF9cXGQpKyBsaWtlIE1hYy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cdH1cblxuXHQvLyBGaXJlZm94IGRvZXMgc3VwcG9ydCBXWVNJV1lHIG9uIG1vYmlsZXMgc28gb3ZlcnJpZGVcblx0Ly8gYW55IHByZXZpb3VzIHZhbHVlIGlmIHVzaW5nIEZGXG5cdGlmICgvRmlyZWZveC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHRpZiAoL09uZUJyb3dzZXIvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gVUNCcm93c2VyIHdvcmtzIGJ1dCBkb2Vzbid0IGdpdmUgYSB1bmlxdWUgdXNlciBhZ2VudFxuXHRpZiAobmF2aWdhdG9yLnZlbmRvciA9PT0gJ1VDV0VCJykge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElFIGFuZCBsZWdhY3kgZWRnZSBhcmUgbm90IHN1cHBvcnRlZCBhbnkgbW9yZVxuXHRpZiAoaWUgfHwgbGVnYWN5RWRnZSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSB0cnVlO1xuXHR9XG5cblx0cmV0dXJuICFpc1Vuc3VwcG9ydGVkO1xufSgpKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuaW1wb3J0IF90bXBsIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcblxuLyoqXG4gKiBGaXhlcyBhIGJ1ZyBpbiBGRiB3aGVyZSBpdCBzb21ldGltZXMgd3JhcHNcbiAqIG5ldyBsaW5lcyBpbiB0aGVpciBvd24gbGlzdCBpdGVtLlxuICogU2VlIGlzc3VlICMzNTlcbiAqL1xuZnVuY3Rpb24gZml4RmlyZWZveExpc3RCdWcoZWRpdG9yKSB7XG5cdC8vIE9ubHkgYXBwbHkgdG8gRmlyZWZveCBhcyB3aWxsIGJyZWFrIG90aGVyIGJyb3dzZXJzLlxuXHRpZiAoJ21vekhpZGRlbicgaW4gZG9jdW1lbnQpIHtcblx0XHR2YXIgbm9kZSA9IGVkaXRvci5nZXRCb2R5KCk7XG5cdFx0dmFyIG5leHQ7XG5cblx0XHR3aGlsZSAobm9kZSkge1xuXHRcdFx0bmV4dCA9IG5vZGU7XG5cblx0XHRcdGlmIChuZXh0LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0bmV4dCA9IG5leHQuZmlyc3RDaGlsZDtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0d2hpbGUgKG5leHQgJiYgIW5leHQubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5wYXJlbnROb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5uZXh0U2libGluZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAvW1xcblxcclxcdF0rLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkge1xuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBpZiBuZXdsaW5lcyBhcmUgY29sbGFwc2VkXG5cdFx0XHRcdGlmICghL15wcmUvLnRlc3QoZG9tLmNzcyhub2RlLnBhcmVudE5vZGUsICd3aGl0ZVNwYWNlJykpKSB7XG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbmV4dDtcblx0XHR9XG5cdH1cbn1cblxuXG4vKipcbiAqIE1hcCBvZiBhbGwgdGhlIGNvbW1hbmRzIGZvciBFbWxFZGl0b3JcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAbmFtZSBjb21tYW5kc1xuICovXG52YXIgZGVmYXVsdENtZHMgPSB7XG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJvbGRcblx0Ym9sZDoge1xuXHRcdGV4ZWM6ICdib2xkJyxcblx0XHR0b29sdGlwOiAnQm9sZCcsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0InXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEl0YWxpY1xuXHRpdGFsaWM6IHtcblx0XHRleGVjOiAnaXRhbGljJyxcblx0XHR0b29sdGlwOiAnSXRhbGljJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrSSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogVW5kZXJsaW5lXG5cdHVuZGVybGluZToge1xuXHRcdGV4ZWM6ICd1bmRlcmxpbmUnLFxuXHRcdHRvb2x0aXA6ICdVbmRlcmxpbmUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtVJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdHJpa2V0aHJvdWdoXG5cdHN0cmlrZToge1xuXHRcdGV4ZWM6ICdzdHJpa2V0aHJvdWdoJyxcblx0XHR0b29sdGlwOiAnU3RyaWtldGhyb3VnaCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogU3Vic2NyaXB0XG5cdHN1YnNjcmlwdDoge1xuXHRcdGV4ZWM6ICdzdWJzY3JpcHQnLFxuXHRcdHRvb2x0aXA6ICdTdWJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1cGVyc2NyaXB0XG5cdHN1cGVyc2NyaXB0OiB7XG5cdFx0ZXhlYzogJ3N1cGVyc2NyaXB0Jyxcblx0XHR0b29sdGlwOiAnU3VwZXJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGVmdFxuXHRsZWZ0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otbGVmdFxuXHRcdFx0XHRyZXR1cm4gL2xlZnQvLnRlc3QoYWxpZ24pIHx8XG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdzdGFydCcgOiAnZW5kJyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRleGVjOiAnanVzdGlmeWxlZnQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiBsZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDZW50cmVcblx0Y2VudGVyOiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnljZW50ZXInLFxuXHRcdHRvb2x0aXA6ICdDZW50ZXInXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJpZ2h0XG5cdHJpZ2h0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otcmlnaHRcblx0XHRcdFx0cmV0dXJuIC9yaWdodC8udGVzdChhbGlnbikgfHxcblx0XHRcdFx0XHRhbGlnbiA9PT0gKGlzTHRyID8gJ2VuZCcgOiAnc3RhcnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGV4ZWM6ICdqdXN0aWZ5cmlnaHQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiByaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogSnVzdGlmeVxuXHRqdXN0aWZ5OiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnlmdWxsJyxcblx0XHR0b29sdGlwOiAnSnVzdGlmeSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBGb250XG5cdGZvbnQ6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2ZvbnQnKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLm9wdHMuZm9udHMuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChmb250KSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZm9udE9wdCcsIHtcblx0XHRcdFx0XHRmb250OiBmb250XG5cdFx0XHRcdH0sIHRydWUpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udC1waWNrZXInLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5mb250Ll9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGZvbnROYW1lKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udG5hbWUnLCBmb250TmFtZSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IE5hbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNpemVcblx0c2l6ZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnc2l6ZScpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSA3OyBpKyspIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdzaXplT3B0Jywge1xuXHRcdFx0XHRcdHNpemU6IGlcblx0XHRcdFx0fSwgdHJ1ZSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udHNpemUtcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuc2l6ZS5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250U2l6ZSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRzaXplJywgZm9udFNpemUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBTaXplJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2xvdXJcblx0Y29sb3I6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0aHRtbCAgICA9ICcnLFxuXHRcdFx0XHRjbWQgICAgID0gZGVmYXVsdENtZHMuY29sb3I7XG5cblx0XHRcdGlmICghY21kLl9odG1sQ2FjaGUpIHtcblx0XHRcdFx0ZWRpdG9yLm9wdHMuY29sb3JzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XG5cdFx0XHRcdFx0aHRtbCArPSAnPGRpdiBjbGFzcz1cImVtbGVkaXRvci1jb2xvci1jb2x1bW5cIj4nO1xuXG5cdFx0XHRcdFx0Y29sdW1uLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRcdFx0XHRcdGh0bWwgKz1cblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJlbWxlZGl0b3ItY29sb3Itb3B0aW9uXCInICtcblx0XHRcdFx0XHRcdFx0JyBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcgKyBjb2xvciArICdcIicgK1xuXHRcdFx0XHRcdFx0XHQnIGRhdGEtY29sb3I9XCInICsgY29sb3IgKyAnXCI+PC9hPic7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRodG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjbWQuX2h0bWxDYWNoZSA9IGh0bWw7XG5cdFx0XHR9XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBkb20ucGFyc2VIVE1MKGNtZC5faHRtbENhY2hlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGRvbS5kYXRhKHRoaXMsICdjb2xvcicpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnY29sb3ItcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuY29sb3IuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JlY29sb3InLCBjb2xvcik7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IENvbG9yJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBSZW1vdmUgRm9ybWF0XG5cdHJlbW92ZWZvcm1hdDoge1xuXHRcdGV4ZWM6ICdyZW1vdmVmb3JtYXQnLFxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgRm9ybWF0dGluZydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBDdXRcblx0Y3V0OiB7XG5cdFx0ZXhlYzogJ2N1dCcsXG5cdFx0dG9vbHRpcDogJ0N1dCcsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjdXQgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtWCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29weVxuXHRjb3B5OiB7XG5cdFx0ZXhlYzogJ2NvcHknLFxuXHRcdHRvb2x0aXA6ICdDb3B5Jyxcblx0XHRlcnJvck1lc3NhZ2U6ICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgYWxsb3cgdGhlIGNvcHkgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtQydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGVcblx0cGFzdGU6IHtcblx0XHRleGVjOiAncGFzdGUnLFxuXHRcdHRvb2x0aXA6ICdQYXN0ZScsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBwYXN0ZSBjb21tYW5kLiAnICtcblx0XHRcdCdQbGVhc2UgdXNlIHRoZSBrZXlib2FyZCBzaG9ydGN1dCBDdHJsL0NtZC1WJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBQYXN0ZSBUZXh0XG5cdHBhc3RldGV4dDoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0dmFsLFxuXHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRlZGl0b3IgID0gdGhpcztcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdwYXN0ZXRleHQnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IuXyhcblx0XHRcdFx0XHQnUGFzdGUgeW91ciB0ZXh0IGluc2lkZSB0aGUgZm9sbG93aW5nIGJveDonXG5cdFx0XHRcdCksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhbCA9IGRvbS5maW5kKGNvbnRlbnQsICcjdHh0JylbMF0udmFsdWU7XG5cblx0XHRcdFx0aWYgKHZhbCkge1xuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dCh2YWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAncGFzdGV0ZXh0JywgY29udGVudCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnUGFzdGUgVGV4dCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQnVsbGV0IExpc3Rcblx0YnVsbGV0bGlzdDoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGZpeEZpcmVmb3hMaXN0QnVnKHRoaXMpO1xuXHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnaW5zZXJ0dW5vcmRlcmVkbGlzdCcpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0J1bGxldCBsaXN0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBPcmRlcmVkIExpc3Rcblx0b3JkZXJlZGxpc3Q6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcblx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ2luc2VydG9yZGVyZWRsaXN0Jyk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTnVtYmVyZWQgbGlzdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogSW5kZW50XG5cdGluZGVudDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50LCBmaXJzdEJsb2NrKSB7XG5cdFx0XHQvLyBPbmx5IHdvcmtzIHdpdGggbGlzdHMsIGZvciBub3dcblx0XHRcdHZhclx0cmFuZ2UsIHN0YXJ0UGFyZW50LCBlbmRQYXJlbnQ7XG5cblx0XHRcdGlmIChkb20uaXMoZmlyc3RCbG9jaywgJ2xpJykpIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb20uaXMoZmlyc3RCbG9jaywgJ3VsLG9sLG1lbnUnKSkge1xuXHRcdFx0XHQvLyBpZiB0aGUgd2hvbGUgbGlzdCBpcyBzZWxlY3RlZCwgdGhlbiB0aGlzIG11c3QgYmVcblx0XHRcdFx0Ly8gaW52YWxpZGF0ZWQgYmVjYXVzZSB0aGUgYnJvd3NlciB3aWxsIHBsYWNlIGFcblx0XHRcdFx0Ly8gPGJsb2NrcXVvdGU+IHRoZXJlXG5cdFx0XHRcdHJhbmdlID0gdGhpcy5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkUmFuZ2UoKTtcblxuXHRcdFx0XHRzdGFydFBhcmVudCA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyLnBhcmVudE5vZGU7XG5cdFx0XHRcdGVuZFBhcmVudCAgID0gcmFuZ2UuZW5kQ29udGFpbmVyLnBhcmVudE5vZGU7XG5cblx0XHRcdFx0Ly8gVE9ETzogY291bGQgdXNlIG5vZGVUeXBlIGZvciB0aGlzP1xuXHRcdFx0XHQvLyBNYXliZSBqdXN0IGNoZWNrIHRoZSBmaXJzdEJsb2NrIGNvbnRhaW5zIGJvdGggdGhlIHN0YXJ0XG5cdFx0XHRcdC8vYW5kIGVuZCBjb250YWluZXJzXG5cblx0XHRcdFx0Ly8gU2VsZWN0IHRoZSB0YWcsIG5vdCB0aGUgdGV4dE5vZGVcblx0XHRcdFx0Ly8gKHRoYXQncyB3aHkgdGhlIHBhcmVudE5vZGUpXG5cdFx0XHRcdGlmIChzdGFydFBhcmVudCAhPT1cblx0XHRcdFx0XHRzdGFydFBhcmVudC5wYXJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkIHx8XG5cdFx0XHRcdFx0Ly8gd29yayBhcm91bmQgYSBidWcgaW4gRkZcblx0XHRcdFx0XHQoZG9tLmlzKGVuZFBhcmVudCwgJ2xpJykgJiYgZW5kUGFyZW50ICE9PVxuXHRcdFx0XHRcdFx0ZW5kUGFyZW50LnBhcmVudE5vZGUubGFzdEVsZW1lbnRDaGlsZCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcyxcblx0XHRcdFx0YmxvY2sgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHQvLyBBbiBpbmRlbnQgc3lzdGVtIGlzIHF1aXRlIGNvbXBsaWNhdGVkIGFzIHRoZXJlIGFyZSBsb2Fkc1xuXHRcdFx0Ly8gb2YgY29tcGxpY2F0aW9ucyBhbmQgaXNzdWVzIGFyb3VuZCBob3cgdG8gaW5kZW50IHRleHRcblx0XHRcdC8vIEFzIGRlZmF1bHQsIGxldCdzIGp1c3Qgc3RheSB3aXRoIGluZGVudGluZyB0aGUgbGlzdHMsXG5cdFx0XHQvLyBhdCBsZWFzdCwgZm9yIG5vdy5cblx0XHRcdGlmIChkb20uY2xvc2VzdChibG9jaywgJ3VsLG9sLG1lbnUnKSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2luZGVudCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0FkZCBpbmRlbnQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IE91dGRlbnRcblx0b3V0ZGVudDoge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50cywgZmlyc3RCbG9jaykge1xuXHRcdFx0cmV0dXJuIGRvbS5jbG9zZXN0KGZpcnN0QmxvY2ssICd1bCxvbCxtZW51JykgPyAwIDogLTE7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGJsb2NrID0gdGhpcy5nZXRSYW5nZUhlbHBlcigpLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblx0XHRcdGlmIChkb20uY2xvc2VzdChibG9jaywgJ3VsLG9sLG1lbnUnKSkge1xuXHRcdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdvdXRkZW50Jyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnUmVtb3ZlIG9uZSBpbmRlbnQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVGFibGVcblx0dGFibGU6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzLFxuXHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3RhYmxlJywge1xuXHRcdFx0XHRyb3dzOiBlZGl0b3IuXygnUm93czonKSxcblx0XHRcdFx0Y29sczogZWRpdG9yLl8oJ0NvbHM6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhclx0cm93cyA9IE51bWJlcihkb20uZmluZChjb250ZW50LCAnI3Jvd3MnKVswXS52YWx1ZSksXG5cdFx0XHRcdFx0Y29scyA9IE51bWJlcihkb20uZmluZChjb250ZW50LCAnI2NvbHMnKVswXS52YWx1ZSksXG5cdFx0XHRcdFx0aHRtbCA9ICc8dGFibGU+JztcblxuXHRcdFx0XHRpZiAocm93cyA+IDAgJiYgY29scyA+IDApIHtcblx0XHRcdFx0XHRodG1sICs9IEFycmF5KHJvd3MgKyAxKS5qb2luKFxuXHRcdFx0XHRcdFx0Jzx0cj4nICtcblx0XHRcdFx0XHRcdFx0QXJyYXkoY29scyArIDEpLmpvaW4oXG5cdFx0XHRcdFx0XHRcdFx0Jzx0ZD48YnIgLz48L3RkPidcblx0XHRcdFx0XHRcdFx0KSArXG5cdFx0XHRcdFx0XHQnPC90cj4nXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGh0bWwgKz0gJzwvdGFibGU+JztcblxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChodG1sKTtcblx0XHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0dGFibGUnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSB0YWJsZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBIb3Jpem9udGFsIFJ1bGVcblx0aG9yaXpvbnRhbHJ1bGU6IHtcblx0XHRleGVjOiAnaW5zZXJ0aG9yaXpvbnRhbHJ1bGUnLFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBob3Jpem9udGFsIHJ1bGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogQ29kZVxuXHRjb2RlOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0Jzxjb2RlPicsXG5cdFx0XHRcdCc8YnIgLz48L2NvZGU+J1xuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdDb2RlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEltYWdlXG5cdGltYWdlOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIHNlbGVjdGVkLCBjYikge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2ltYWdlJywge1xuXHRcdFx0XHR1cmw6IGVkaXRvci5fKCdVUkw6JyksXG5cdFx0XHRcdHdpZHRoOiBlZGl0b3IuXygnV2lkdGggKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aGVpZ2h0OiBlZGl0b3IuXygnSGVpZ2h0IChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblxuXHRcdFx0dmFyXHR1cmxJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjaW1hZ2UnKVswXTtcblxuXHRcdFx0dXJsSW5wdXQudmFsdWUgPSBzZWxlY3RlZDtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKHVybElucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2IoXG5cdFx0XHRcdFx0XHR1cmxJbnB1dC52YWx1ZSxcblx0XHRcdFx0XHRcdGRvbS5maW5kKGNvbnRlbnQsICcjd2lkdGgnKVswXS52YWx1ZSxcblx0XHRcdFx0XHRcdGRvbS5maW5kKGNvbnRlbnQsICcjaGVpZ2h0JylbMF0udmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0aW1hZ2UnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0ZWRpdG9yICA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmltYWdlLl9kcm9wRG93bihcblx0XHRcdFx0ZWRpdG9yLFxuXHRcdFx0XHRjYWxsZXIsXG5cdFx0XHRcdCcnLFxuXHRcdFx0XHRmdW5jdGlvbiAodXJsLCB3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0XHRcdFx0dmFyIGF0dHJzICA9ICcnO1xuXG5cdFx0XHRcdFx0aWYgKHdpZHRoKSB7XG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIHdpZHRoPVwiJyArIHBhcnNlSW50KHdpZHRoLCAxMCkgKyAnXCInO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChoZWlnaHQpIHtcblx0XHRcdFx0XHRcdGF0dHJzICs9ICcgaGVpZ2h0PVwiJyArIHBhcnNlSW50KGhlaWdodCwgMTApICsgJ1wiJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhdHRycyArPSAnIHNyYz1cIicgKyBlc2NhcGUuZW50aXRpZXModXJsKSArICdcIic7XG5cblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdFx0XHQnPGltZycgKyBhdHRycyArICcgLz4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gaW1hZ2UnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRS1tYWlsXG5cdGVtYWlsOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZW1haWwnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IuXygnRS1tYWlsOicpLFxuXHRcdFx0XHRkZXNjOiBlZGl0b3IuXygnRGVzY3JpcHRpb24gKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IuXygnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyIGVtYWlsID0gZG9tLmZpbmQoY29udGVudCwgJyNlbWFpbCcpWzBdLnZhbHVlO1xuXG5cdFx0XHRcdGlmIChlbWFpbCkge1xuXHRcdFx0XHRcdGNiKGVtYWlsLCBkb20uZmluZChjb250ZW50LCAnI2RlcycpWzBdLnZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGVtYWlsJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5lbWFpbC5fZHJvcERvd24oXG5cdFx0XHRcdGVkaXRvcixcblx0XHRcdFx0Y2FsbGVyLFxuXHRcdFx0XHRmdW5jdGlvbiAoZW1haWwsIHRleHQpIHtcblx0XHRcdFx0XHRpZiAoIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpIHx8IHRleHQpIHtcblx0XHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICtcblx0XHRcdFx0XHRcdFx0J21haWx0bzonICsgZXNjYXBlLmVudGl0aWVzKGVtYWlsKSArICdcIj4nICtcblx0XHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoKHRleHQgfHwgZW1haWwpKSArXG5cdFx0XHRcdFx0XHRcdCc8L2E+J1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgJ21haWx0bzonICsgZW1haWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1haWwnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGlua1xuXHRsaW5rOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdsaW5rJywge1xuXHRcdFx0XHR1cmw6IGVkaXRvci5fKCdVUkw6JyksXG5cdFx0XHRcdGRlc2M6IGVkaXRvci5fKCdEZXNjcmlwdGlvbiAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRpbnM6IGVkaXRvci5fKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHR2YXIgbGlua0lucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNsaW5rJylbMF07XG5cblx0XHRcdGZ1bmN0aW9uIGluc2VydFVybChlKSB7XG5cdFx0XHRcdGlmIChsaW5rSW5wdXQudmFsdWUpIHtcblx0XHRcdFx0XHRjYihsaW5rSW5wdXQudmFsdWUsIGRvbS5maW5kKGNvbnRlbnQsICcjZGVzJylbMF0udmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgaW5zZXJ0VXJsKTtcblx0XHRcdGRvbS5vbihjb250ZW50LCAna2V5cHJlc3MnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyAxMyA9IGVudGVyIGtleVxuXHRcdFx0XHRpZiAoZS53aGljaCA9PT0gMTMgJiYgbGlua0lucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0aW5zZXJ0VXJsKGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBkb20uRVZFTlRfQ0FQVFVSRSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRsaW5rJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMubGluay5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uICh1cmwsIHRleHQpIHtcblx0XHRcdFx0aWYgKHRleHQgfHwgIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyh0ZXh0IHx8IHVybCkgK1xuXHRcdFx0XHRcdFx0JzwvYT4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2NyZWF0ZWxpbmsnLCB1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBsaW5rJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVubGlua1xuXHR1bmxpbms6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGRvbS5jbG9zZXN0KHRoaXMuY3VycmVudE5vZGUoKSwgJ2EnKSA/IDAgOiAtMTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBhbmNob3IgPSBkb20uY2xvc2VzdCh0aGlzLmN1cnJlbnROb2RlKCksICdhJyk7XG5cblx0XHRcdGlmIChhbmNob3IpIHtcblx0XHRcdFx0d2hpbGUgKGFuY2hvci5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShhbmNob3IuZmlyc3RDaGlsZCwgYW5jaG9yKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvbS5yZW1vdmUoYW5jaG9yKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdVbmxpbmsnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBRdW90ZVxuXHRxdW90ZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIsIGh0bWwsIGF1dGhvcikge1xuXHRcdFx0dmFyXHRiZWZvcmUgPSAnPGJsb2NrcXVvdGU+Jyxcblx0XHRcdFx0ZW5kICAgID0gJzwvYmxvY2txdW90ZT4nO1xuXG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBIVE1MIHBhc3NlZCBzZXQgZW5kIHRvIG51bGwgc28gYW55IHNlbGVjdGVkXG5cdFx0XHQvLyB0ZXh0IGlzIHJlcGxhY2VkXG5cdFx0XHRpZiAoaHRtbCkge1xuXHRcdFx0XHRhdXRob3IgPSAoYXV0aG9yID8gJzxjaXRlPicgK1xuXHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyhhdXRob3IpICtcblx0XHRcdFx0JzwvY2l0ZT4nIDogJycpO1xuXHRcdFx0XHRiZWZvcmUgPSBiZWZvcmUgKyBhdXRob3IgKyBodG1sICsgZW5kO1xuXHRcdFx0XHRlbmQgICAgPSBudWxsO1xuXHRcdFx0Ly8gaWYgbm90IGFkZCBhIG5ld2xpbmUgdG8gdGhlIGVuZCBvZiB0aGUgaW5zZXJ0ZWQgcXVvdGVcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpID09PSAnJykge1xuXHRcdFx0XHRlbmQgPSAnPGJyIC8+JyArIGVuZDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChiZWZvcmUsIGVuZCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgUXVvdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRW1vdGljb25zXG5cdGVtb3RpY29uOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdHZhciBjcmVhdGVDb250ZW50ID0gZnVuY3Rpb24gKGluY2x1ZGVNb3JlKSB7XG5cdFx0XHRcdHZhclx0bW9yZUxpbmssXG5cdFx0XHRcdFx0b3B0cyAgICAgICAgICAgID0gZWRpdG9yLm9wdHMsXG5cdFx0XHRcdFx0ZW1vdGljb25zUm9vdCAgID0gb3B0cy5lbW90aWNvbnNSb290IHx8ICcnLFxuXHRcdFx0XHRcdGVtb3RpY29uc0NvbXBhdCA9IG9wdHMuZW1vdGljb25zQ29tcGF0LFxuXHRcdFx0XHRcdHJhbmdlSGVscGVyICAgICA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxuXHRcdFx0XHRcdHN0YXJ0U3BhY2UgICAgICA9IGVtb3RpY29uc0NvbXBhdCAmJlxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIuZ2V0T3V0ZXJUZXh0KHRydWUsIDEpICE9PSAnICcgPyAnICcgOiAnJyxcblx0XHRcdFx0XHRlbmRTcGFjZSAgICAgICAgPSBlbW90aWNvbnNDb21wYXQgJiZcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dChmYWxzZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxuXHRcdFx0XHRcdGNvbnRlbnQgICAgICAgICA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0XHRsaW5lICAgICAgICAgICAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdFx0cGVyTGluZSAgICAgICAgID0gMCxcblx0XHRcdFx0XHRlbW90aWNvbnMgICAgICAgPSB1dGlscy5leHRlbmQoXG5cdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdG9wdHMuZW1vdGljb25zLmRyb3Bkb3duLFxuXHRcdFx0XHRcdFx0aW5jbHVkZU1vcmUgPyBvcHRzLmVtb3RpY29ucy5tb3JlIDoge31cblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBsaW5lKTtcblxuXHRcdFx0XHRwZXJMaW5lID0gTWF0aC5zcXJ0KE9iamVjdC5rZXlzKGVtb3RpY29ucykubGVuZ3RoKTtcblxuXHRcdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2ltZycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLmluc2VydChzdGFydFNwYWNlICsgZG9tLmF0dHIodGhpcywgJ2FsdCcpICsgZW5kU3BhY2UsXG5cdFx0XHRcdFx0XHRudWxsLCBmYWxzZSkuY2xvc2VEcm9wRG93bih0cnVlKTtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChjb2RlLCBlbW90aWNvbikge1xuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChsaW5lLCBkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xuXHRcdFx0XHRcdFx0c3JjOiBlbW90aWNvbnNSb290ICsgKGVtb3RpY29uLnVybCB8fCBlbW90aWNvbiksXG5cdFx0XHRcdFx0XHRhbHQ6IGNvZGUsXG5cdFx0XHRcdFx0XHR0aXRsZTogZW1vdGljb24udG9vbHRpcCB8fCBjb2RlXG5cdFx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdFx0aWYgKGxpbmUuY2hpbGRyZW4ubGVuZ3RoID49IHBlckxpbmUpIHtcblx0XHRcdFx0XHRcdGxpbmUgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoIWluY2x1ZGVNb3JlICYmIG9wdHMuZW1vdGljb25zLm1vcmUpIHtcblx0XHRcdFx0XHRtb3JlTGluayA9IGRvbS5jcmVhdGVFbGVtZW50KCdhJywge1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLW1vcmUnXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobW9yZUxpbmssXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlZGl0b3IuXygnTW9yZScpKSk7XG5cblx0XHRcdFx0XHRkb20ub24obW9yZUxpbmssICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oXG5cdFx0XHRcdFx0XHRcdGNhbGxlciwgJ21vcmUtZW1vdGljb25zJywgY3JlYXRlQ29udGVudCh0cnVlKVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIG1vcmVMaW5rKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2Vtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQoZmFsc2UpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdGRlZmF1bHRDbWRzLmVtb3RpY29uLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhbiBlbW90aWNvbidcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBZb3VUdWJlXG5cdHlvdXR1YmU6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd5b3V0dWJlTWVudScsIHtcblx0XHRcdFx0bGFiZWw6IGVkaXRvci5fKCdWaWRlbyBVUkw6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLl8oJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBkb20uZmluZChjb250ZW50LCAnI2xpbmsnKVswXS52YWx1ZTtcblx0XHRcdFx0dmFyIGlkTWF0Y2ggPSB2YWwubWF0Y2goLyg/OnY9fHZcXC98ZW1iZWRcXC98eW91dHUuYmVcXC8pPyhbYS16QS1aMC05Xy1dezExfSkvKTtcblx0XHRcdFx0dmFyIHRpbWVNYXRjaCA9IHZhbC5tYXRjaCgvWyZ8P10oPzpzdGFyKT90PSgoXFxkK1tobXNdPyl7MSwzfSkvKTtcblx0XHRcdFx0dmFyIHRpbWUgPSAwO1xuXG5cdFx0XHRcdGlmICh0aW1lTWF0Y2gpIHtcblx0XHRcdFx0XHR1dGlscy5lYWNoKHRpbWVNYXRjaFsxXS5zcGxpdCgvW2htc10vKSwgZnVuY3Rpb24gKGksIHZhbCkge1xuXHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0dGltZSA9ICh0aW1lICogNjApICsgTnVtYmVyKHZhbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWRNYXRjaCAmJiAvXlthLXpBLVowLTlfLV17MTF9JC8udGVzdChpZE1hdGNoWzFdKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKGlkTWF0Y2hbMV0sIHRpbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGJ0bikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLnlvdXR1YmUuX2Ryb3BEb3duKGVkaXRvciwgYnRuLCBmdW5jdGlvbiAoaWQsIHRpbWUpIHtcblx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKF90bXBsKCd5b3V0dWJlJywge1xuXHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFlvdVR1YmUgdmlkZW8nXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRGF0ZVxuXHRkYXRlOiB7XG5cdFx0X2RhdGU6IGZ1bmN0aW9uIChlZGl0b3IpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHR5ZWFyICA9IG5vdy5nZXRZZWFyKCksXG5cdFx0XHRcdG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxLFxuXHRcdFx0XHRkYXkgICA9IG5vdy5nZXREYXRlKCk7XG5cblx0XHRcdGlmICh5ZWFyIDwgMjAwMCkge1xuXHRcdFx0XHR5ZWFyID0gMTkwMCArIHllYXI7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtb250aCA8IDEwKSB7XG5cdFx0XHRcdG1vbnRoID0gJzAnICsgbW9udGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXkgPCAxMCkge1xuXHRcdFx0XHRkYXkgPSAnMCcgKyBkYXk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlZGl0b3Iub3B0cy5kYXRlRm9ybWF0XG5cdFx0XHRcdC5yZXBsYWNlKC95ZWFyL2ksIHllYXIpXG5cdFx0XHRcdC5yZXBsYWNlKC9tb250aC9pLCBtb250aClcblx0XHRcdFx0LnJlcGxhY2UoL2RheS9pLCBkYXkpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IGRhdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVGltZVxuXHR0aW1lOiB7XG5cdFx0X3RpbWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRob3VycyA9IG5vdy5nZXRIb3VycygpLFxuXHRcdFx0XHRtaW5zICA9IG5vdy5nZXRNaW51dGVzKCksXG5cdFx0XHRcdHNlY3MgID0gbm93LmdldFNlY29uZHMoKTtcblxuXHRcdFx0aWYgKGhvdXJzIDwgMTApIHtcblx0XHRcdFx0aG91cnMgPSAnMCcgKyBob3Vycztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1pbnMgPCAxMCkge1xuXHRcdFx0XHRtaW5zID0gJzAnICsgbWlucztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNlY3MgPCAxMCkge1xuXHRcdFx0XHRzZWNzID0gJzAnICsgc2Vjcztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGhvdXJzICsgJzonICsgbWlucyArICc6JyArIHNlY3M7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IHRpbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBMdHJcblx0bHRyOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ2x0cic7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSAgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJyA/ICcnIDogJ2x0cic7XG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTGVmdC10by1SaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBSdGxcblx0cnRsOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblxuXHRcdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHRvZ2dsZVZhbHVlID0gZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJykgPT09ICdydGwnID8gJycgOiAncnRsJztcblx0XHRcdGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicsIHRvZ2dsZVZhbHVlKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdSaWdodC10by1MZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUHJpbnRcblx0cHJpbnQ6IHtcblx0XHRleGVjOiAncHJpbnQnLFxuXHRcdHRvb2x0aXA6ICdQcmludCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBNYXhpbWl6ZVxuXHRtYXhpbWl6ZToge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5tYXhpbWl6ZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5tYXhpbWl6ZSghdGhpcy5tYXhpbWl6ZSgpKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTWF4aW1pemUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtNJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNvdXJjZVxuXHRzb3VyY2U6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlTW9kZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdWaWV3IHNvdXJjZScsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K1MnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgY29tbWFuZHMgYWJvdmUgY2FuIGJlIHJlbW92ZWRcblx0Ly8gd2l0aG91dCBoYXZpbmcgdG8gcmVtb3ZlIHRoZSAsIGFmdGVyIHRoZSBsYXN0IG9uZS5cblx0Ly8gTmVlZGVkIGZvciBJRS5cblx0aWdub3JlOiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdENtZHM7XG4iLCJpbXBvcnQgeyBhdHRyIH0gZnJvbSAnLi9kb20uanMnO1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBmb3IgRW1sRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcblx0LyoqXG5cdCAqIFRvb2xiYXIgYnV0dG9ucyBvcmRlciBhbmQgZ3JvdXBzLiBTaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZFxuXHQgKiBoYXZlIGEgYmFyIHwgdG8gc2VwYXJhdGUgZ3JvdXBzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0b29sYmFyOiAnYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZSxzdWJzY3JpcHQsc3VwZXJzY3JpcHR8JyArXG5cdFx0J2xlZnQsY2VudGVyLHJpZ2h0LGp1c3RpZnl8Zm9udCxzaXplLGNvbG9yLHJlbW92ZWZvcm1hdHwnICtcblx0XHQnY3V0LGNvcHkscGFzdGV0ZXh0fGJ1bGxldGxpc3Qsb3JkZXJlZGxpc3QsaW5kZW50LG91dGRlbnR8JyArXG5cdFx0J3RhYmxlfGNvZGUscXVvdGV8aG9yaXpvbnRhbHJ1bGUsaW1hZ2UsZW1haWwsbGluayx1bmxpbmt8JyArXG5cdFx0J2Vtb3RpY29uLHlvdXR1YmUsZGF0ZSx0aW1lfGx0cixydGx8cHJpbnQsbWF4aW1pemUsc291cmNlJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY29tbWFuZHMgdG8gZXhjbHVkZXMgZnJvbSB0aGUgdG9vbGJhclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhckV4Y2x1ZGU6IG51bGwsXG5cblx0LyoqXG5cdCAqIFN0eWxlc2hlZXQgdG8gaW5jbHVkZSBpbiB0aGUgV1lTSVdZRyBlZGl0b3IuIFRoaXMgaXMgd2hhdCB3aWxsIHN0eWxlXG5cdCAqIHRoZSBXWVNJV1lHIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzdHlsZTogJ2pxdWVyeS5lbWxlZGl0b3IuZGVmYXVsdC5jc3MnLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBmb250cyBmb3IgdGhlIGZvbnQgc2VsZWN0b3Jcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGZvbnRzOiAnQXJpYWwsQXJpYWwgQmxhY2ssQ29taWMgU2FucyBNUyxDb3VyaWVyIE5ldyxHZW9yZ2lhLEltcGFjdCwnICtcblx0XHQnU2Fucy1zZXJpZixTZXJpZixUaW1lcyBOZXcgUm9tYW4sVHJlYnVjaGV0IE1TLFZlcmRhbmEnLFxuXG5cdC8qKlxuXHQgKiBDb2xvcnMgc2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmQgaGF2ZSBhIGJhciB8IHRvIHNpZ25hbCBhIG5ld1xuXHQgKiBjb2x1bW4uXG5cdCAqXG5cdCAqIElmIG51bGwgdGhlIGNvbG9ycyB3aWxsIGJlIGF1dG8gZ2VuZXJhdGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y29sb3JzOiAnIzAwMDAwMCwjNDRCOEZGLCMxRTkyRjcsIzAwNzREOSwjMDA1REMyLCMwMDM2OUIsI2IzZDVmNHwnICtcblx0XHRcdCcjNDQ0NDQ0LCNDM0ZGRkYsIzlERjlGRiwjN0ZEQkZGLCM2OEM0RTgsIzQxOURDMSwjZDlmNGZmfCcgK1xuXHRcdFx0JyM2NjY2NjYsIzcyRkY4NCwjNENFQTVFLCMyRUNDNDAsIzE3QjUyOSwjMDA4RTAyLCNjMGYwYzZ8JyArXG5cdFx0XHQnIzg4ODg4OCwjRkZGRjQ0LCNGRkZBMUUsI0ZGREMwMCwjRThDNTAwLCNDMTlFMDAsI2ZmZjViM3wnICtcblx0XHRcdCcjYWFhYWFhLCNGRkM5NUYsI0ZGQTMzOSwjRkY4NTFCLCNFODZFMDQsI0MxNDcwMCwjZmZkYmJifCcgK1xuXHRcdFx0JyNjY2NjY2MsI0ZGODU3QSwjRkY1RjU0LCNGRjQxMzYsI0U4MkExRiwjQzEwMzAwLCNmZmM2YzN8JyArXG5cdFx0XHQnI2VlZWVlZSwjRkY1NkZGLCNGRjMwREMsI0YwMTJCRSwjRDkwMEE3LCNCMjAwODAsI2ZiYjhlY3wnICtcblx0XHRcdCcjZmZmZmZmLCNGNTUxRkYsI0NGMkJFNywjQjEwREM5LCM5QTAwQjIsIzlBMDBCMiwjZThiNmVmJyxcblxuXHQvKipcblx0ICogVGhlIGxvY2FsZSB0byB1c2UuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRsb2NhbGU6IGF0dHIoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbGFuZycpIHx8ICdlbicsXG5cblx0LyoqXG5cdCAqIFRoZSBDaGFyc2V0IHRvIHVzZVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y2hhcnNldDogJ3V0Zi04JyxcblxuXHQvKipcblx0ICogQ29tcGF0aWJpbGl0eSBtb2RlIGZvciBlbW90aWNvbnMuXG5cdCAqXG5cdCAqIEhlbHBzIGlmIHlvdSBoYXZlIGVtb3RpY29ucyBzdWNoIGFzIDovIHdoaWNoIHdvdWxkIHB1dCBhbiBlbW90aWNvblxuXHQgKiBpbnNpZGUgaHR0cDovL1xuXHQgKlxuXHQgKiBUaGlzIG1vZGUgcmVxdWlyZXMgZW1vdGljb25zIHRvIGJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBvciBlbmQgb2Zcblx0ICogbGluZSBjaGFycy4gVGhpcyBtb2RlIGhhcyBsaW1pdGVkIEFzIFlvdSBUeXBlIGVtb3RpY29uIGNvbnZlcnNpb25cblx0ICogc3VwcG9ydC4gSXQgd2lsbCBub3QgcmVwbGFjZSBBWVQgZm9yIGVuZCBvZiBsaW5lIGNoYXJzLCBvbmx5XG5cdCAqIGVtb3RpY29ucyBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UuIFRoZXkgd2lsbCBzdGlsbCBiZSByZXBsYWNlZFxuXHQgKiBjb3JyZWN0bHkgd2hlbiBsb2FkZWQganVzdCBub3QgQVlULlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVtb3RpY29uc0NvbXBhdDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBlbW90aWNvbnMuIENhbiBiZSBjaGFuZ2VzIGF0IHJ1bnRpbWUgdXNpbmcgdGhlXG5cdCAqIGVtb3RpY29ucygpIG1ldGhvZC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqIEBzaW5jZSAxLjQuMlxuXHQgKi9cblx0ZW1vdGljb25zRW5hYmxlZDogdHJ1ZSxcblxuXHQvKipcblx0ICogRW1vdGljb24gcm9vdCBVUkxcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGVtb3RpY29uc1Jvb3Q6ICcnLFxuXHRlbW90aWNvbnM6IHtcblx0XHRkcm9wZG93bjoge1xuXHRcdFx0JzopJzogJ2Vtb3RpY29ucy9zbWlsZS5wbmcnLFxuXHRcdFx0JzphbmdlbDonOiAnZW1vdGljb25zL2FuZ2VsLnBuZycsXG5cdFx0XHQnOmFuZ3J5Oic6ICdlbW90aWNvbnMvYW5ncnkucG5nJyxcblx0XHRcdCc4LSknOiAnZW1vdGljb25zL2Nvb2wucG5nJyxcblx0XHRcdCc6XFwnKCc6ICdlbW90aWNvbnMvY3d5LnBuZycsXG5cdFx0XHQnOmVybW06JzogJ2Vtb3RpY29ucy9lcm1tLnBuZycsXG5cdFx0XHQnOkQnOiAnZW1vdGljb25zL2dyaW4ucG5nJyxcblx0XHRcdCc8Myc6ICdlbW90aWNvbnMvaGVhcnQucG5nJyxcblx0XHRcdCc6KCc6ICdlbW90aWNvbnMvc2FkLnBuZycsXG5cdFx0XHQnOk8nOiAnZW1vdGljb25zL3Nob2NrZWQucG5nJyxcblx0XHRcdCc6UCc6ICdlbW90aWNvbnMvdG9uZ3VlLnBuZycsXG5cdFx0XHQnOyknOiAnZW1vdGljb25zL3dpbmsucG5nJ1xuXHRcdH0sXG5cdFx0bW9yZToge1xuXHRcdFx0JzphbGllbjonOiAnZW1vdGljb25zL2FsaWVuLnBuZycsXG5cdFx0XHQnOmJsaW5rOic6ICdlbW90aWNvbnMvYmxpbmsucG5nJyxcblx0XHRcdCc6Ymx1c2g6JzogJ2Vtb3RpY29ucy9ibHVzaC5wbmcnLFxuXHRcdFx0JzpjaGVlcmZ1bDonOiAnZW1vdGljb25zL2NoZWVyZnVsLnBuZycsXG5cdFx0XHQnOmRldmlsOic6ICdlbW90aWNvbnMvZGV2aWwucG5nJyxcblx0XHRcdCc6ZGl6enk6JzogJ2Vtb3RpY29ucy9kaXp6eS5wbmcnLFxuXHRcdFx0JzpnZXRsb3N0Oic6ICdlbW90aWNvbnMvZ2V0bG9zdC5wbmcnLFxuXHRcdFx0JzpoYXBweTonOiAnZW1vdGljb25zL2hhcHB5LnBuZycsXG5cdFx0XHQnOmtpc3Npbmc6JzogJ2Vtb3RpY29ucy9raXNzaW5nLnBuZycsXG5cdFx0XHQnOm5pbmphOic6ICdlbW90aWNvbnMvbmluamEucG5nJyxcblx0XHRcdCc6cGluY2g6JzogJ2Vtb3RpY29ucy9waW5jaC5wbmcnLFxuXHRcdFx0Jzpwb3V0eTonOiAnZW1vdGljb25zL3BvdXR5LnBuZycsXG5cdFx0XHQnOnNpY2s6JzogJ2Vtb3RpY29ucy9zaWNrLnBuZycsXG5cdFx0XHQnOnNpZGV3YXlzOic6ICdlbW90aWNvbnMvc2lkZXdheXMucG5nJyxcblx0XHRcdCc6c2lsbHk6JzogJ2Vtb3RpY29ucy9zaWxseS5wbmcnLFxuXHRcdFx0JzpzbGVlcGluZzonOiAnZW1vdGljb25zL3NsZWVwaW5nLnBuZycsXG5cdFx0XHQnOnVuc3VyZTonOiAnZW1vdGljb25zL3Vuc3VyZS5wbmcnLFxuXHRcdFx0Jzp3b290Oic6ICdlbW90aWNvbnMvdzAwdC5wbmcnLFxuXHRcdFx0Jzp3YXNzYXQ6JzogJ2Vtb3RpY29ucy93YXNzYXQucG5nJ1xuXHRcdH0sXG5cdFx0aGlkZGVuOiB7XG5cdFx0XHQnOndoaXN0bGluZzonOiAnZW1vdGljb25zL3doaXN0bGluZy5wbmcnLFxuXHRcdFx0Jzpsb3ZlOic6ICdlbW90aWNvbnMvd3ViLnBuZydcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFdpZHRoIG9mIHRoZSBlZGl0b3IuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWMgd2l0aFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHdpZHRoOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBIZWlnaHQgb2YgdGhlIGVkaXRvciBpbmNsdWRpbmcgdG9vbGJhci4gU2V0IHRvIG51bGwgZm9yIGF1dG9tYXRpY1xuXHQgKiBoZWlnaHRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRoZWlnaHQ6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgcmVzaXplZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUVuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBoYWxmIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5XaWR0aDogbnVsbCxcblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSBoZWlnaHQgb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1pbkhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIGhlaWdodCBvciAtMVxuXHQgKiBmb3IgdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4SGVpZ2h0OiBudWxsLFxuXHQvKipcblx0ICogTWF4IHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4V2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSBoZWlnaHQgaXMgZW5hYmxlZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUhlaWdodDogdHJ1ZSxcblx0LyoqXG5cdCAqIElmIHJlc2l6aW5nIGJ5IHdpZHRoIGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVXaWR0aDogdHJ1ZSxcblxuXHQvKipcblx0ICogRGF0ZSBmb3JtYXQsIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBsb2NhbGUgc3BlY2lmaWVzIG9uZS5cblx0ICpcblx0ICogVGhlIHdvcmRzIHllYXIsIG1vbnRoIGFuZCBkYXkgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB1c2VycyBjdXJyZW50XG5cdCAqIHllYXIsIG1vbnRoIGFuZCBkYXkuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkYXRlRm9ybWF0OiAneWVhci1tb250aC1kYXknLFxuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGluc2V0IHRoZSB0b29sYmFyIGludG8uXG5cdCAqXG5cdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdHRvb2xiYXJDb250YWluZXI6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBwYXN0ZSBmaWx0ZXJpbmcuIFRoaXMgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbCwgcGxlYXNlXG5cdCAqIHJlcG9ydCBhbnkgaXNzdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVuYWJsZVBhc3RlRmlsdGVyaW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gY29tcGxldGVseSBkaXNhYmxlIHBhc3RpbmcgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZGlzYWJsZVBhc3Rpbmc6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZWFkT25seTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIHNldCB0aGUgZWRpdG9yIHRvIHJpZ2h0LXRvLWxlZnQgbW9kZS5cblx0ICpcblx0ICogSWYgc2V0IHRvIG51bGwgdGhlIGRpcmVjdGlvbiB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cnRsOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIG9uIHBhZ2UgbG9hZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1czogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciB0byB0aGUgZW5kIG9mIHRoZSBjb250ZW50XG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b2ZvY3VzRW5kOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGV4cGFuZCB0aGUgZWRpdG9yIHRvIGZpeCB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9FeHBhbmQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIHVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXJcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvVXBkYXRlOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIHRoZSBicm93c2VycyBidWlsdCBpbiBzcGVsbCBjaGVja2VyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3BlbGxjaGVjazogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gcnVuIHRoZSBzb3VyY2UgZWRpdG9yIHdoZW4gdGhlcmUgaXMgbm8gV1lTSVdZRyBzdXBwb3J0LiBPbmx5XG5cdCAqIHJlYWxseSBhcHBsaWVzIHRvIG1vYmlsZSBPUydzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGxvYWQgdGhlIGVkaXRvciBpbiBzb3VyY2UgbW9kZSBhbmQgc3RpbGwgYWxsb3cgc3dpdGNoaW5nXG5cdCAqIGJldHdlZW4gV1lTSVdZRyBhbmQgc291cmNlIG1vZGVcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzdGFydEluU291cmNlTW9kZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIElEIHRvIGdpdmUgdGhlIGVkaXRvci5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGlkOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVnaW5zOiAnJyxcblxuXHQvKipcblx0ICogei1pbmRleCB0byBzZXQgdGhlIGVkaXRvciBjb250YWluZXIgdG8uIE5lZWRlZCBmb3IgalF1ZXJ5IFVJIGRpYWxvZy5cblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR6SW5kZXg6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIHRyaW0gdGhlIEJCQ29kZS4gUmVtb3ZlcyBhbnkgc3BhY2VzIGF0IHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZVxuXHQgKiBCQkNvZGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGJiY29kZVRyaW06IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBkaXNhYmxlIHJlbW92aW5nIGJsb2NrIGxldmVsIGVsZW1lbnRzIGJ5IHByZXNzaW5nIGJhY2tzcGFjZSBhdFxuXHQgKiB0aGUgc3RhcnQgb2YgdGhlbVxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVCbG9ja1JlbW92ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbG93ZWQgVVJMIChzaG91bGQgYmUgZWl0aGVyIHN0cmluZ3Mgb3IgcmVnZXgpIGZvciBpZnJhbWVzLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGEgc3RyaW5nIHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3RhcnQgb2YgdGhlIHNyYyBtYXRjaGVzIHRoZVxuXHQgKiBzcGVjaWZpZWQgc3RyaW5nIHdpbGwgYmUgYWxsb3dlZC5cblx0ICpcblx0ICogSWYgaXQncyBhIHJlZ2V4IHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3JjIG1hdGNoZXMgdGhlIHJlZ2V4IHdpbGwgYmVcblx0ICogYWxsb3dlZC5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZElmcmFtZVVybHM6IFtdLFxuXG5cdC8qKlxuXHQgKiBCQkNvZGUgcGFyc2VyIG9wdGlvbnMsIG9ubHkgYXBwbGllcyBpZiB1c2luZyB0aGUgZWRpdG9yIGluIEJCQ29kZVxuXHQgKiBtb2RlLlxuXHQgKlxuXHQgKiBTZWUgRW1sRWRpdG9yLkJCQ29kZVBhcnNlci5kZWZhdWx0cyBmb3IgbGlzdCBvZiB2YWxpZCBvcHRpb25zXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRwYXJzZXJPcHRpb25zOiB7IH0sXG5cblx0LyoqXG5cdCAqIENTUyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRvIGRyb3Bkb3duIG1lbnUgKGVnLiB6LWluZGV4KVxuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0ZHJvcERvd25Dc3M6IHsgfSxcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgdGFncyB0aGF0IGFyZSBhbGxvd2VkIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYSB0YWcgaXMgbm90IGxpc3RlZCBoZXJlLCBpdCB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGUgY29udGVudCBpc1xuXHQgKiBzYW5pdGl6ZWQuXG5cdCAqXG5cdCAqIDEgVGFnIGlzIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDogWydpZnJhbWUnXS4gTm8gbmVlZCB0byBhZGQgdGhpc1xuXHQgKiBmdXJ0aGVyLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkVGFnczogW10sXG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIGF0dHJpYnV0ZXMgdGhhdCBhcmUgYWxsb3dlZCBvbiB0YWdzIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYW4gYXR0cmlidXRlIGlzIG5vdCBsaXN0ZWQgaGVyZSwgaXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIGNvbnRlbnRcblx0ICogaXMgc2FuaXRpemVkLlxuXHQgKlxuXHQgKiAzIEF0dHJpYnV0ZXMgYXJlIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDpcblx0ICogXHRbJ2FsbG93ZnVsbHNjcmVlbicsICdmcmFtZWJvcmRlcicsICd0YXJnZXQnXS5cblx0ICogTm8gbmVlZCB0byBhZGQgdGhlc2UgZnVydGhlci5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZEF0dHJpYnV0ZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0T3B0aW9ucztcbiIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5cclxuLyoqXHJcbiAqIENhY2hlIG9mIGNhbWVsQ2FzZSBDU1MgcHJvcGVydHkgbmFtZXNcclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XHJcbiAqL1xyXG52YXIgY3NzUHJvcGVydHlOYW1lQ2FjaGUgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGVsZW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRUxFTUVOVF9OT0RFID0gMTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIHRleHQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgVEVYVF9OT0RFID0gMztcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGNvbW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgQ09NTUVOVF9OT0RFID0gODtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgZG9jdW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRE9DVU1FTlRfTk9ERSA9IDk7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBkb2N1bWVudCBmcmFnbWVudHNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xyXG5cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG5cdHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcblxyXG5cdHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyB2YWx1ZSA6IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcclxuICpcclxuICogV2lsbCBjcmVhdGUgaXQgaW4gdGhlIGN1cnJlbnQgZG9jdW1lbnQgdW5sZXNzIGNvbnRleHRcclxuICogaXMgc3BlY2lmaWVkLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHRhZ1xyXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBbYXR0cmlidXRlc11cclxuICogQHBhcmFtIHshRG9jdW1lbnR9IFtjb250ZXh0XVxyXG4gKiBAcmV0dXJucyB7IUhUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJ1dGVzLCBjb250ZXh0KSB7XHJcblx0dmFyIG5vZGUgPSAoY29udGV4dCB8fCBkb2N1bWVudCkuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuXHR1dGlscy5lYWNoKGF0dHJpYnV0ZXMgfHwge30sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoa2V5ID09PSAnc3R5bGUnKSB7XHJcblx0XHRcdG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlO1xyXG5cdFx0fSBlbHNlIGlmIChrZXkgaW4gbm9kZSkge1xyXG5cdFx0XHRub2RlW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gbm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgcGFyZW50cyB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7QXJyYXk8SFRNTEVsZW1lbnQ+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudHMobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcGFyZW50cyA9IFtdO1xyXG5cdHZhciBwYXJlbnQgPSBub2RlIHx8IHt9O1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSAmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHBhcmVudHMucHVzaChwYXJlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmVudHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmaXJzdCBwYXJlbnQgbm9kZSB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciBwYXJlbnQgPSBub2RlIHx8IHt9O1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSAmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHJldHVybiBwYXJlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIHRoZSBwYXNzZWQgbm9kZSBhbmQgYWxsIHBhcmVudHMgYW5kXHJcbiAqIHJldHVybnMgdGhlIGZpcnN0IG1hdGNoaW5nIG5vZGUgaWYgYW55LlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHJldHVybiBpcyhub2RlLCBzZWxlY3RvcikgPyBub2RlIDogcGFyZW50KG5vZGUsIHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSB0aGUgRE9NXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcclxuXHRpZiAobm9kZS5wYXJlbnROb2RlKSB7XHJcblx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQXBwZW5kcyBjaGlsZCB0byBwYXJlbnQgbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gY2hpbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xyXG5cdG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgYW55IGNoaWxkIG5vZGVzIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybnMge05vZGVMaXN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQobm9kZSwgc2VsZWN0b3IpIHtcclxuXHRyZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZvciBvbigpIGFuZCBvZmYoKSBpZiB0byBhZGQvcmVtb3ZlIHRoZSBldmVudFxyXG4gKiB0byB0aGUgY2FwdHVyZSBwaGFzZVxyXG4gKlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgRVZFTlRfQ0FQVFVSRSA9IHRydWU7XHJcblxyXG4vKipcclxuICogRm9yIG9uKCkgYW5kIG9mZigpIGlmIHRvIGFkZC9yZW1vdmUgdGhlIGV2ZW50XHJcbiAqIHRvIHRoZSBidWJibGUgcGhhc2VcclxuICpcclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIEVWRU5UX0JVQkJMRSA9IGZhbHNlO1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRzLlxyXG4gKlxyXG4gKiBFdmVudHMgc2hvdWxkIGJlIGEgc3BhY2Ugc2VwYXJhdGVkIGxpc3Qgb2YgZXZlbnRzLlxyXG4gKlxyXG4gKiBJZiBzZWxlY3RvciBpcyBzcGVjaWZpZWQgdGhlIGhhbmRsZXIgd2lsbCBvbmx5IGJlXHJcbiAqIGNhbGxlZCB3aGVuIHRoZSBldmVudCB0YXJnZXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50c1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCl9IGZuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhcHR1cmU9ZmFsc2VdXHJcbiAqIEBzZWUgb2ZmKClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihub2RlLCBldmVudHMsIHNlbGVjdG9yLCBmbiwgY2FwdHVyZSkge1xyXG5cdGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHR2YXIgaGFuZGxlcjtcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoc2VsZWN0b3IpKSB7XHJcblx0XHRcdGhhbmRsZXIgPSBmblsnX3NjZS1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl0gfHwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblx0XHRcdFx0d2hpbGUgKHRhcmdldCAmJiB0YXJnZXQgIT09IG5vZGUpIHtcclxuXHRcdFx0XHRcdGlmIChpcyh0YXJnZXQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRcdFx0XHRmbi5jYWxsKHRhcmdldCwgZSk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRmblsnX3NjZS1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl0gPSBoYW5kbGVyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xyXG5cdFx0XHRjYXB0dXJlID0gZm47XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlIHx8IGZhbHNlKTtcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRzLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbihPYmplY3QpfSBmblxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9uKClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiBvZmYobm9kZSwgZXZlbnRzLCBzZWxlY3RvciwgZm4sIGNhcHR1cmUpIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRoYW5kbGVyID0gZm5bJ19zY2UtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xyXG5cdFx0XHRjYXB0dXJlID0gZm47XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlIHx8IGZhbHNlKTtcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIG9ubHkgYXR0ciBwYXJhbSBpcyBzcGVjaWZpZWQgaXQgd2lsbCBnZXRcclxuICogdGhlIHZhbHVlIG9mIHRoZSBhdHRyIHBhcmFtLlxyXG4gKlxyXG4gKiBJZiB2YWx1ZSBpcyBzcGVjaWZpZWQgYnV0IG51bGwgdGhlIGF0dHJpYnV0ZVxyXG4gKiB3aWxsIGJlIHJlbW92ZWQgb3RoZXJ3aXNlIHRoZSBhdHRyIHZhbHVlIHdpbGxcclxuICogYmUgc2V0IHRvIHRoZSBwYXNzZWQgdmFsdWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKiBAcGFyYW0gez9zdHJpbmd9IFt2YWx1ZV1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhdHRyKG5vZGUsIGF0dHIsIHZhbHVlKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XHJcblx0XHRyZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcblx0fVxyXG5cclxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxLCBuby1lcS1udWxsXHJcblx0aWYgKHZhbHVlID09IG51bGwpIHtcclxuXHRcdHJlbW92ZUF0dHIobm9kZSwgYXR0cik7XHJcblx0fSBlbHNlIHtcclxuXHRcdG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHIobm9kZSwgYXR0cikge1xyXG5cdG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gbm9uZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGUobm9kZSkge1xyXG5cdGNzcyhub2RlLCAnZGlzcGxheScsICdub25lJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBwYXNzZWQgZWxlbWVudHMgZGlzcGxheSB0byBkZWZhdWx0XHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2hvdyhub2RlKSB7XHJcblx0Y3NzKG5vZGUsICdkaXNwbGF5JywgJycpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhbiBlbGVtZW50cyB2aXNpYmlsaXR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKG5vZGUpIHtcclxuXHRpZiAoaXNWaXNpYmxlKG5vZGUpKSB7XHJcblx0XHRoaWRlKG5vZGUpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzaG93KG5vZGUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgYSBjb21wdXRlZCBDU1MgdmFsdWVzIG9yIHNldHMgYW4gaW5saW5lIENTUyB2YWx1ZVxyXG4gKlxyXG4gKiBSdWxlcyBzaG91bGQgYmUgaW4gY2FtZWxDYXNlIGZvcm1hdCBhbmQgbm90XHJcbiAqIGh5cGhlbmF0ZWQgbGlrZSBDU1MgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshT2JqZWN0fHN0cmluZ30gcnVsZVxyXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IFt2YWx1ZV1cclxuICogQHJldHVybiB7c3RyaW5nfG51bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3NzKG5vZGUsIHJ1bGUsIHZhbHVlKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcocnVsZSkpIHtcclxuXHRcdFx0cmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgPyBnZXRDb21wdXRlZFN0eWxlKG5vZGUpW3J1bGVdIDogbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKHJ1bGUsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdGNzcyhub2RlLCBrZXksIHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBpc05hTiByZXR1cm5zIGZhbHNlIGZvciBudWxsLCBmYWxzZSBhbmQgZW1wdHkgc3RyaW5nc1xyXG5cdFx0Ly8gc28gbmVlZCB0byBjaGVjayBpdCdzIHRydXRoeSBvciAwXHJcblx0XHR2YXIgaXNOdW1lcmljID0gKHZhbHVlIHx8IHZhbHVlID09PSAwKSAmJiAhaXNOYU4odmFsdWUpO1xyXG5cdFx0bm9kZS5zdHlsZVtydWxlXSA9IGlzTnVtZXJpYyA/IHZhbHVlICsgJ3B4JyA6IHZhbHVlO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGRhdGEgYXR0cmlidXRlcyBvbiBhIG5vZGVcclxuICpcclxuICogVW5saWtlIHRoZSBqUXVlcnkgdmVyc2lvbiB0aGlzIG9ubHkgc3RvcmVzIGRhdGFcclxuICogaW4gdGhlIERPTSBhdHRyaWJ1dGVzIHdoaWNoIG1lYW5zIG9ubHkgc3RyaW5nc1xyXG4gKiBjYW4gYmUgc3RvcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGF0YShub2RlLCBrZXksIHZhbHVlKSB7XHJcblx0dmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG5cdHZhciBkYXRhID0ge307XHJcblxyXG5cdGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHV0aWxzLmVhY2gobm9kZS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoXywgYXR0cikge1xyXG5cdFx0XHRcdGlmICgvXmRhdGEtL2kudGVzdChhdHRyLm5hbWUpKSB7XHJcblx0XHRcdFx0XHRkYXRhW2F0dHIubmFtZS5zdWJzdHIoNSldID0gYXR0ci52YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZ3NMZW5ndGggPT09IDIpIHtcclxuXHRcdFx0cmV0dXJuIGF0dHIobm9kZSwgJ2RhdGEtJyArIGtleSk7XHJcblx0XHR9XHJcblxyXG5cdFx0YXR0cihub2RlLCAnZGF0YS0nICsga2V5LCBTdHJpbmcodmFsdWUpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgbm9kZSBtYXRjaGVzIHRoZSBnaXZlbiBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzKG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0dmFyIHJlc3VsdCA9IGZhbHNlO1xyXG5cclxuXHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJlc3VsdCA9IChub2RlLm1hdGNoZXMgfHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvciB8fFxyXG5cdFx0XHRub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBub2RlIGNvbnRhaW5zIGNoaWxkIG90aGVyd2lzZSBmYWxzZS5cclxuICpcclxuICogVGhpcyBkaWZmZXJzIGZyb20gdGhlIERPTSBjb250YWlucygpIG1ldGhvZCBpbiB0aGF0XHJcbiAqIGlmIG5vZGUgYW5kIGNoaWxkIGFyZSBlcXVhbCB0aGlzIHdpbGwgcmV0dXJuIGZhbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKG5vZGUsIGNoaWxkKSB7XHJcblx0cmV0dXJuIG5vZGUgIT09IGNoaWxkICYmIG5vZGUuY29udGFpbnMgJiYgbm9kZS5jb250YWlucyhjaGlsZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMgez9IVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0VsZW1lbnRTaWJsaW5nKG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0dmFyIHByZXYgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG5cdGlmIChzZWxlY3RvciAmJiBwcmV2KSB7XHJcblx0XHRyZXR1cm4gaXMocHJldiwgc2VsZWN0b3IpID8gcHJldiA6IG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcHJldjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHshTm9kZX0gcmVmTm9kZVxyXG4gKiBAcmV0dXJucyB7Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSkge1xyXG5cdHJldHVybiByZWZOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZk5vZGUpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybnMgeyFBcnJheS48c3RyaW5nPn1cclxuICovXHJcbmZ1bmN0aW9uIGNsYXNzZXMobm9kZSkge1xyXG5cdHJldHVybiBub2RlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSB7XHJcblx0cmV0dXJuIGlzKG5vZGUsICcuJyArIGNsYXNzTmFtZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSB7XHJcblx0dmFyIGNsYXNzTGlzdCA9IGNsYXNzZXMobm9kZSk7XHJcblxyXG5cdGlmIChjbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpIDwgMCkge1xyXG5cdFx0Y2xhc3NMaXN0LnB1c2goY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdG5vZGUuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oJyAnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcclxuXHR2YXIgY2xhc3NMaXN0ID0gY2xhc3Nlcyhub2RlKTtcclxuXHJcblx0dXRpbHMuYXJyYXlSZW1vdmUoY2xhc3NMaXN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRub2RlLmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKCcgJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGEgY2xhc3Mgb24gbm9kZS5cclxuICpcclxuICogSWYgc3RhdGUgaXMgc3BlY2lmaWVkIGFuZCBpcyB0cnV0aHkgaXQgd2lsbCBhZGRcclxuICogdGhlIGNsYXNzLlxyXG4gKlxyXG4gKiBJZiBzdGF0ZSBpcyBzcGVjaWZpZWQgYW5kIGlzIGZhbHNleSBpdCB3aWxsIHJlbW92ZVxyXG4gKiB0aGUgY2xhc3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzdGF0ZV1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyhub2RlLCBjbGFzc05hbWUsIHN0YXRlKSB7XHJcblx0c3RhdGUgPSB1dGlscy5pc1VuZGVmaW5lZChzdGF0ZSkgPyAhaGFzQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSA6IHN0YXRlO1xyXG5cclxuXHRpZiAoc3RhdGUpIHtcclxuXHRcdGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSB3aWR0aCBvZiB0aGUgcGFzc2VkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKG5vZGUsIHZhbHVlKSB7XHJcblx0aWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG5cdFx0dmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuXHRcdHZhciBwYWRkaW5nID0gdG9GbG9hdChjcy5wYWRkaW5nTGVmdCkgKyB0b0Zsb2F0KGNzLnBhZGRpbmdSaWdodCk7XHJcblx0XHR2YXIgYm9yZGVyID0gdG9GbG9hdChjcy5ib3JkZXJMZWZ0V2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJSaWdodFdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gbm9kZS5vZmZzZXRXaWR0aCAtIHBhZGRpbmcgLSBib3JkZXI7XHJcblx0fVxyXG5cclxuXHRjc3Mobm9kZSwgJ3dpZHRoJywgdmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSBoZWlnaHQgb2YgdGhlIHBhc3NlZCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW3ZhbHVlXVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQobm9kZSwgdmFsdWUpIHtcclxuXHRpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHR2YXIgY3MgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdUb3ApICsgdG9GbG9hdChjcy5wYWRkaW5nQm90dG9tKTtcclxuXHRcdHZhciBib3JkZXIgPSB0b0Zsb2F0KGNzLmJvcmRlclRvcFdpZHRoKSArIHRvRmxvYXQoY3MuYm9yZGVyQm90dG9tV2lkdGgpO1xyXG5cclxuXHRcdHJldHVybiBub2RlLm9mZnNldEhlaWdodCAtIHBhZGRpbmcgLSBib3JkZXI7XHJcblx0fVxyXG5cclxuXHRjc3Mobm9kZSwgJ2hlaWdodCcsIHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXJzIGEgY3VzdG9tIGV2ZW50IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZFxyXG4gKiBzZXRzIHRoZSBkZXRhaWwgcHJvcGVydHkgdG8gdGhlIGRhdGEgb2JqZWN0IHBhc3NlZC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyKG5vZGUsIGV2ZW50TmFtZSwgZGF0YSkge1xyXG5cdHZhciBldmVudDtcclxuXHJcblx0aWYgKHV0aWxzLmlzRnVuY3Rpb24od2luZG93LkN1c3RvbUV2ZW50KSkge1xyXG5cdFx0ZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7XHJcblx0XHRcdGJ1YmJsZXM6IHRydWUsXHJcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXHJcblx0XHRcdGRldGFpbDogZGF0YVxyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGV2ZW50ID0gbm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG5cdFx0ZXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBpZiBhIG5vZGUgaXMgdmlzaWJsZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH1cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNWaXNpYmxlKG5vZGUpIHtcclxuXHRyZXR1cm4gISFub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBDU1MgcHJvcGVydHkgbmFtZXMgaW50byBjYW1lbCBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHJpbmcpIHtcclxuXHRyZXR1cm4gc3RyaW5nXHJcblx0XHQucmVwbGFjZSgvXi1tcy0vLCAnbXMtJylcclxuXHRcdC5yZXBsYWNlKC8tKFxcdykvZywgZnVuY3Rpb24gKG1hdGNoLCBjaGFyKSB7XHJcblx0XHRcdHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCk7XHJcblx0XHR9KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBMb29wIGFsbCBjaGlsZCBub2RlcyBvZiB0aGUgcGFzc2VkIG5vZGVcclxuICpcclxuICogVGhlIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgMSBwYXJhbWV0ZXIgYmVpbmcgdGhlIG5vZGUuXHJcbiAqIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIGZhbHNlIHRoZSBsb29wIHdpbGwgYmUgZXhpdGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZnVuYyAgICAgICAgICAgQ2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdpdGggZXZlcnlcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkIG5vZGUgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxyXG4gKiBAcGFyYW0gIHtib29sZWFufSBpbm5lcm1vc3RGaXJzdCAgSWYgdGhlIGlubmVybW9zdCBub2RlIHNob3VsZCBiZSBwYXNzZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBmdW5jdGlvbiBiZWZvcmUgaXQncyBwYXJlbnRzLlxyXG4gKiBAcGFyYW0gIHtib29sZWFufSBzaWJsaW5nc09ubHkgICAgSWYgdG8gb25seSB0cmF2ZXJzZSB0aGUgbm9kZXMgc2libGluZ3NcclxuICogQHBhcmFtICB7Ym9vbGVhbn0gW3JldmVyc2U9ZmFsc2VdIElmIHRvIHRyYXZlcnNlIHRoZSBub2RlcyBpbiByZXZlcnNlXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2Uobm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSwgcmV2ZXJzZSkge1xyXG5cdG5vZGUgPSByZXZlcnNlID8gbm9kZS5sYXN0Q2hpbGQgOiBub2RlLmZpcnN0Q2hpbGQ7XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHR2YXIgbmV4dCA9IHJldmVyc2UgPyBub2RlLnByZXZpb3VzU2libGluZyA6IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQoIWlubmVybW9zdEZpcnN0ICYmIGZ1bmMobm9kZSkgPT09IGZhbHNlKSB8fFxyXG5cdFx0XHQoIXNpYmxpbmdzT25seSAmJiB0cmF2ZXJzZShcclxuXHRcdFx0XHRub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCByZXZlcnNlXHJcblx0XHRcdCkgPT09IGZhbHNlKSB8fFxyXG5cdFx0XHQoaW5uZXJtb3N0Rmlyc3QgJiYgZnVuYyhub2RlKSA9PT0gZmFsc2UpXHJcblx0XHQpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0O1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIExpa2UgdHJhdmVyc2UgYnV0IGxvb3BzIGluIHJldmVyc2VcclxuICogQHNlZSB0cmF2ZXJzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJUcmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5KSB7XHJcblx0dHJhdmVyc2Uobm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSwgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgSFRNTCBpbnRvIGEgZG9jdW1lbnQgZnJhZ21lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuICogQHBhcmFtIHtEb2N1bWVudH0gW2NvbnRleHRdXHJcbiAqIEBzaW5jZSAxLjQuNFxyXG4gKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSFRNTChodG1sLCBjb250ZXh0KSB7XHJcblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblxyXG5cdHZhclx0cmV0ID0gY29udGV4dC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblx0dmFyIHRtcCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjb250ZXh0KTtcclxuXHJcblx0dG1wLmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG5cdHdoaWxlICh0bXAuZmlyc3RDaGlsZCkge1xyXG5cdFx0YXBwZW5kQ2hpbGQocmV0LCB0bXAuZmlyc3RDaGlsZCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmV0O1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGFueSBzdHlsaW5nLlxyXG4gKlxyXG4gKiBJdCBoYXMgc3R5bGluZyBpZiBpdCBpcyBub3QgYSBwbGFpbiA8ZGl2PiBvciA8cD4gb3JcclxuICogaWYgaXQgaGFzIGEgY2xhc3MsIHN0eWxlIGF0dHJpYnV0ZSBvciBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqIEBzaW5jZSAxLjQuNFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxpbmcobm9kZSkge1xyXG5cdHJldHVybiBub2RlICYmICghaXMobm9kZSwgJ3AsZGl2JykgfHwgbm9kZS5jbGFzc05hbWUgfHxcclxuXHRcdGF0dHIobm9kZSwgJ3N0eWxlJykgfHwgIXV0aWxzLmlzRW1wdHlPYmplY3QoZGF0YShub2RlKSkpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gZWxlbWVudCBmcm9tIG9uZSB0eXBlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIEZvciBleGFtcGxlIGl0IGNhbiBjb252ZXJ0IHRoZSBlbGVtZW50IDxiPiB0byA8c3Ryb25nPlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgdG9UYWdOYW1lXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKiBAc2luY2UgMS40LjRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RWxlbWVudChlbGVtZW50LCB0b1RhZ05hbWUpIHtcclxuXHR2YXIgbmV3RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQodG9UYWdOYW1lLCB7fSwgZWxlbWVudC5vd25lckRvY3VtZW50KTtcclxuXHJcblx0dXRpbHMuZWFjaChlbGVtZW50LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfLCBhdHRyaWJ1dGUpIHtcclxuXHRcdC8vIFNvbWUgYnJvd3NlcnMgcGFyc2UgaW52YWxpZCBhdHRyaWJ1dGVzIG5hbWVzIGxpa2VcclxuXHRcdC8vICdzaXplXCIyJyB3aGljaCB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBzZXQsIGp1c3RcclxuXHRcdC8vIGlnbm9yZSB0aGVzZS5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGF0dHIobmV3RWxlbWVudCwgYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XHJcblx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0fSk7XHJcblxyXG5cdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdGFwcGVuZENoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0fVxyXG5cclxuXHRlbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQpO1xyXG5cclxuXHRyZXR1cm4gbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgYmxvY2sgbGV2ZWwgZWxlbWVudHMgc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgdmFyIGJsb2NrTGV2ZWxMaXN0ID0gJ3xib2R5fGhyfHB8ZGl2fGgxfGgyfGgzfGg0fGg1fGg2fGFkZHJlc3N8cHJlfCcgK1xyXG5cdCdmb3JtfHRhYmxlfHRib2R5fHRoZWFkfHRmb290fHRofHRyfHRkfGxpfG9sfHVsfGJsb2NrcXVvdGV8Y2VudGVyfCcgK1xyXG5cdCdkZXRhaWxzfHNlY3Rpb258YXJ0aWNsZXxhc2lkZXxuYXZ8bWFpbnxoZWFkZXJ8aGdyb3VwfGZvb3RlcnxmaWVsZHNldHwnICtcclxuXHQnZGx8ZHR8ZGR8ZmlndXJlfGZpZ2NhcHRpb258JztcclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIGVsZW1lbnRzIHRoYXQgZG8gbm90IGFsbG93IGNoaWxkcmVuIHNlcGFyYXRlZCBieSBiYXJzICh8KVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogQHNpbmNlICAxLjQuNVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbkhhdmVDaGlsZHJlbihub2RlKSB7XHJcblx0Ly8gMSAgPSBFbGVtZW50XHJcblx0Ly8gOSAgPSBEb2N1bWVudFxyXG5cdC8vIDExID0gRG9jdW1lbnQgRnJhZ21lbnRcclxuXHRpZiAoIS8xMT98OS8udGVzdChub2RlLm5vZGVUeXBlKSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8gTGlzdCBvZiBlbXB0eSBIVE1MIHRhZ3Mgc2VwYXJhdGVkIGJ5IGJhciAofCkgY2hhcmFjdGVyLlxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvaW5kZXgvZWxlbWVudHMuaHRtbFxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xyXG5cdHJldHVybiAoJ3xpZnJhbWV8YXJlYXxiYXNlfGJhc2Vmb250fGJyfGNvbHxmcmFtZXxocnxpbWd8aW5wdXR8d2JyJyArXHJcblx0XHQnfGlzaW5kZXh8bGlua3xtZXRhfHBhcmFtfGNvbW1hbmR8ZW1iZWR8a2V5Z2VufHNvdXJjZXx0cmFja3wnICtcclxuXHRcdCdvYmplY3R8JykuaW5kZXhPZignfCcgKyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnfCcpIDwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGlzIGlubGluZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZUNvZGVBc0Jsb2NrPWZhbHNlXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5saW5lKGVsbSwgaW5jbHVkZUNvZGVBc0Jsb2NrKSB7XHJcblx0dmFyIHRhZ05hbWUsXHJcblx0XHRub2RlVHlwZSA9IChlbG0gfHwge30pLm5vZGVUeXBlIHx8IFRFWFRfTk9ERTtcclxuXHJcblx0aWYgKG5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybiBub2RlVHlwZSA9PT0gVEVYVF9OT0RFO1xyXG5cdH1cclxuXHJcblx0dGFnTmFtZSA9IGVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdGlmICh0YWdOYW1lID09PSAnY29kZScpIHtcclxuXHRcdHJldHVybiAhaW5jbHVkZUNvZGVBc0Jsb2NrO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGJsb2NrTGV2ZWxMaXN0LmluZGV4T2YoJ3wnICsgdGFnTmFtZSArICd8JykgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0aGUgQ1NTIGZyb20gMSBub2RlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIE9ubHkgY29waWVzIENTUyBkZWZpbmVkIG9uIHRoZSBlbGVtZW50IGUuZy4gc3R5bGUgYXR0ci5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZnJvbVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b1xyXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4xLjBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q1NTKGZyb20sIHRvKSB7XHJcblx0aWYgKHRvLnN0eWxlICYmIGZyb20uc3R5bGUpIHtcclxuXHRcdHRvLnN0eWxlLmNzc1RleHQgPSBmcm9tLnN0eWxlLmNzc1RleHQgKyB0by5zdHlsZS5jc3NUZXh0O1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIERPTSBub2RlIGlzIGVtcHR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG5vZGUpIHtcclxuXHRpZiAobm9kZS5sYXN0Q2hpbGQgJiYgaXNFbXB0eShub2RlLmxhc3RDaGlsZCkpIHtcclxuXHRcdHJlbW92ZShub2RlLmxhc3RDaGlsZCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMyA/ICFub2RlLm5vZGVWYWx1ZSA6XHJcblx0XHQoY2FuSGF2ZUNoaWxkcmVuKG5vZGUpICYmICFub2RlLmNoaWxkTm9kZXMubGVuZ3RoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpeGVzIGJsb2NrIGxldmVsIGVsZW1lbnRzIGluc2lkZSBpbiBpbmxpbmUgZWxlbWVudHMuXHJcbiAqXHJcbiAqIEFsc28gZml4ZXMgaW52YWxpZCBsaXN0IG5lc3RpbmcgYnkgcGxhY2luZyBuZXN0ZWQgbGlzdHNcclxuICogaW5zaWRlIHRoZSBwcmV2aW91cyBsaSB0YWcgb3Igd3JhcHBpbmcgdGhlbSBpbiBhbiBsaSB0YWcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhOZXN0aW5nKG5vZGUpIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0dmFyIGxpc3QgPSAndWwsb2wnLFxyXG5cdFx0XHRpc0Jsb2NrID0gIWlzSW5saW5lKG5vZGUsIHRydWUpICYmIG5vZGUubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSxcclxuXHRcdFx0cGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cclxuXHRcdC8vIEFueSBibG9ja2xldmVsIGVsZW1lbnQgaW5zaWRlIGFuIGlubGluZSBlbGVtZW50IG5lZWRzIGZpeGluZy5cclxuXHRcdC8vIEFsc28gPHA+IHRhZ3MgdGhhdCBjb250YWluIGJsb2NrcyBzaG91bGQgYmUgZml4ZWRcclxuXHRcdGlmIChpc0Jsb2NrICYmIChpc0lubGluZShwYXJlbnQsIHRydWUpIHx8IHBhcmVudC50YWdOYW1lID09PSAnUCcpKSB7XHJcblx0XHRcdC8vIEZpbmQgdGhlIGxhc3QgaW5saW5lIHBhcmVudCBub2RlXHJcblx0XHRcdHZhclx0bGFzdElubGluZVBhcmVudCA9IG5vZGU7XHJcblx0XHRcdHdoaWxlIChpc0lubGluZShsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGUsIHRydWUpIHx8XHJcblx0XHRcdFx0bGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlLnRhZ05hbWUgPT09ICdQJykge1xyXG5cdFx0XHRcdGxhc3RJbmxpbmVQYXJlbnQgPSBsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBiZWZvcmUgPSBleHRyYWN0Q29udGVudHMobGFzdElubGluZVBhcmVudCwgbm9kZSk7XHJcblx0XHRcdHZhciBtaWRkbGUgPSBub2RlO1xyXG5cclxuXHRcdFx0Ly8gQ2xvbmUgaW5saW5lIHN0eWxpbmcgYW5kIGFwcGx5IGl0IHRvIHRoZSBibG9ja3MgY2hpbGRyZW5cclxuXHRcdFx0d2hpbGUgKHBhcmVudCAmJiBpc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0aWYgKHBhcmVudC5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRcdFx0XHR2YXIgY2xvbmUgPSBwYXJlbnQuY2xvbmVOb2RlKCk7XHJcblx0XHRcdFx0XHR3aGlsZSAobWlkZGxlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdFx0YXBwZW5kQ2hpbGQoY2xvbmUsIG1pZGRsZS5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhcHBlbmRDaGlsZChtaWRkbGUsIGNsb25lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGluc2VydEJlZm9yZShtaWRkbGUsIGxhc3RJbmxpbmVQYXJlbnQpO1xyXG5cdFx0XHRpZiAoIWlzRW1wdHkoYmVmb3JlKSkge1xyXG5cdFx0XHRcdGluc2VydEJlZm9yZShiZWZvcmUsIG1pZGRsZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGlzRW1wdHkobGFzdElubGluZVBhcmVudCkpIHtcclxuXHRcdFx0XHRyZW1vdmUobGFzdElubGluZVBhcmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBGaXggaW52YWxpZCBuZXN0ZWQgbGlzdHMgd2hpY2ggc2hvdWxkIGJlIHdyYXBwZWQgaW4gYW4gbGkgdGFnXHJcblx0XHRpZiAoaXNCbG9jayAmJiBpcyhub2RlLCBsaXN0KSAmJiBpcyhub2RlLnBhcmVudE5vZGUsIGxpc3QpKSB7XHJcblx0XHRcdHZhciBsaSA9IHByZXZpb3VzRWxlbWVudFNpYmxpbmcobm9kZSwgJ2xpJyk7XHJcblxyXG5cdFx0XHRpZiAoIWxpKSB7XHJcblx0XHRcdFx0bGkgPSBjcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHRcdGluc2VydEJlZm9yZShsaSwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFwcGVuZENoaWxkKGxpLCBub2RlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIHRoZSBjb21tb24gcGFyZW50IG9mIHR3byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTFcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGUyXHJcbiAqIEByZXR1cm4gez9IVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ29tbW9uQW5jZXN0b3Iobm9kZTEsIG5vZGUyKSB7XHJcblx0d2hpbGUgKChub2RlMSA9IG5vZGUxLnBhcmVudE5vZGUpKSB7XHJcblx0XHRpZiAoY29udGFpbnMobm9kZTEsIG5vZGUyKSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZTE7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/Tm9kZX1cclxuICogQHBhcmFtIHtib29sZWFufSBbcHJldmlvdXM9ZmFsc2VdXHJcbiAqIEByZXR1cm5zIHs/Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaWJsaW5nKG5vZGUsIHByZXZpb3VzKSB7XHJcblx0aWYgKCFub2RlKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAocHJldmlvdXMgPyBub2RlLnByZXZpb3VzU2libGluZyA6IG5vZGUubmV4dFNpYmxpbmcpIHx8XHJcblx0XHRnZXRTaWJsaW5nKG5vZGUucGFyZW50Tm9kZSwgcHJldmlvdXMpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB1bnVzZWQgd2hpdGVzcGFjZSBmcm9tIHRoZSByb290IGFuZCBhbGwgaXQncyBjaGlsZHJlbi5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IHJvb3RcclxuICogQHNpbmNlIDEuNC4zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlV2hpdGVTcGFjZShyb290KSB7XHJcblx0dmFyXHRub2RlVmFsdWUsIG5vZGVUeXBlLCBuZXh0LCBwcmV2aW91cywgcHJldmlvdXNTaWJsaW5nLFxyXG5cdFx0bmV4dE5vZGUsIHRyaW1TdGFydCxcclxuXHRcdGNzc1doaXRlU3BhY2UgPSBjc3Mocm9vdCwgJ3doaXRlU3BhY2UnKSxcclxuXHRcdC8vIFByZXNlcnZlIG5ld2xpbmVzIGlmIGlzIHByZS1saW5lXHJcblx0XHRwcmVzZXJ2ZU5ld0xpbmVzID0gL2xpbmUkL2kudGVzdChjc3NXaGl0ZVNwYWNlKSxcclxuXHRcdG5vZGUgPSByb290LmZpcnN0Q2hpbGQ7XHJcblxyXG5cdC8vIFNraXAgcHJlICYgcHJlLXdyYXAgd2l0aCBhbnkgdmVuZG9yIHByZWZpeFxyXG5cdGlmICgvcHJlKC13cmFwKT8kL2kudGVzdChjc3NXaGl0ZVNwYWNlKSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdG5leHROb2RlICA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0XHRub2RlVmFsdWUgPSBub2RlLm5vZGVWYWx1ZTtcclxuXHRcdG5vZGVUeXBlICA9IG5vZGUubm9kZVR5cGU7XHJcblxyXG5cdFx0aWYgKG5vZGVUeXBlID09PSBFTEVNRU5UX05PREUgJiYgbm9kZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdHJlbW92ZVdoaXRlU3BhY2Uobm9kZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5vZGVUeXBlID09PSBURVhUX05PREUpIHtcclxuXHRcdFx0bmV4dCAgICAgID0gZ2V0U2libGluZyhub2RlKTtcclxuXHRcdFx0cHJldmlvdXMgID0gZ2V0U2libGluZyhub2RlLCB0cnVlKTtcclxuXHRcdFx0dHJpbVN0YXJ0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHR3aGlsZSAoaGFzQ2xhc3MocHJldmlvdXMsICdlbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRwcmV2aW91cyA9IGdldFNpYmxpbmcocHJldmlvdXMsIHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiBwcmV2aW91cyBzaWJsaW5nIGlzbid0IGlubGluZSBvciBpcyBhIHRleHRub2RlIHRoYXRcclxuXHRcdFx0Ly8gZW5kcyBpbiB3aGl0ZXNwYWNlLCB0aW1lIHRoZSBzdGFydCB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmIChpc0lubGluZShub2RlKSAmJiBwcmV2aW91cykge1xyXG5cdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAocHJldmlvdXNTaWJsaW5nLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLmxhc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWRlcHRoXHJcblx0XHRcdFx0XHR3aGlsZSAoaGFzQ2xhc3MocHJldmlvdXNTaWJsaW5nLCAnZW1sZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IGdldFNpYmxpbmcocHJldmlvdXNTaWJsaW5nLCB0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRyaW1TdGFydCA9IHByZXZpb3VzU2libGluZy5ub2RlVHlwZSA9PT0gVEVYVF9OT0RFID9cclxuXHRcdFx0XHRcdC9bXFx0XFxuXFxyIF0kLy50ZXN0KHByZXZpb3VzU2libGluZy5ub2RlVmFsdWUpIDpcclxuXHRcdFx0XHRcdCFpc0lubGluZShwcmV2aW91c1NpYmxpbmcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDbGVhciB6ZXJvIHdpZHRoIHNwYWNlc1xyXG5cdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZSgvXFx1MjAwQi9nLCAnJyk7XHJcblxyXG5cdFx0XHQvLyBTdHJpcCBsZWFkaW5nIHdoaXRlc3BhY2VcclxuXHRcdFx0aWYgKCFwcmV2aW91cyB8fCAhaXNJbmxpbmUocHJldmlvdXMpIHx8IHRyaW1TdGFydCkge1xyXG5cdFx0XHRcdG5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9eW1xcdCBdKy8gOiAvXltcXHRcXG5cXHIgXSsvLFxyXG5cdFx0XHRcdFx0JydcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTdHJpcCB0cmFpbGluZyB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmICghbmV4dCB8fCAhaXNJbmxpbmUobmV4dCkpIHtcclxuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvW1xcdCBdKyQvIDogL1tcXHRcXG5cXHIgXSskLyxcclxuXHRcdFx0XHRcdCcnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IHRleHQgbm9kZXNcclxuXHRcdFx0aWYgKCFub2RlVmFsdWUubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVtb3ZlKG5vZGUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5vZGUubm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSsvZyA6IC9bXFx0XFxuXFxyIF0rL2csXHJcblx0XHRcdFx0XHQnICdcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHROb2RlO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGFsbCB0aGUgbm9kZXMgYmV0d2VlbiB0aGUgc3RhcnQgYW5kIGVuZCBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGFydE5vZGVcdFRoZSBub2RlIHRvIHN0YXJ0IGV4dHJhY3RpbmcgYXRcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZW5kTm9kZVx0XHRUaGUgbm9kZSB0byBzdG9wIGV4dHJhY3RpbmcgYXRcclxuICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q29udGVudHMoc3RhcnROb2RlLCBlbmROb2RlKSB7XHJcblx0dmFyIHJhbmdlID0gc3RhcnROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHJcblx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoc3RhcnROb2RlKTtcclxuXHRyYW5nZS5zZXRFbmRBZnRlcihlbmROb2RlKTtcclxuXHJcblx0cmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgb2Zmc2V0IHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBsZWZ0IGFuZCB0b3AgcHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChub2RlKSB7XHJcblx0dmFyXHRsZWZ0ID0gMCxcclxuXHRcdHRvcCA9IDA7XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHRsZWZ0ICs9IG5vZGUub2Zmc2V0TGVmdDtcclxuXHRcdHRvcCAgKz0gbm9kZS5vZmZzZXRUb3A7XHJcblx0XHRub2RlICA9IG5vZGUub2Zmc2V0UGFyZW50O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGxlZnQ6IGxlZnQsXHJcblx0XHR0b3A6IHRvcFxyXG5cdH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhIENTUyBwcm9wZXJ0eSBmcm9tIHRoZSBlbGVtZW50cyBzdHlsZSBhdHRyaWJ1dGVcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByb3BlcnR5XHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZShlbG0sIHByb3BlcnR5KSB7XHJcblx0dmFyXHRzdHlsZVZhbHVlLFxyXG5cdFx0ZWxtU3R5bGUgPSBlbG0uc3R5bGU7XHJcblxyXG5cdGlmICghY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldKSB7XHJcblx0XHRjc3NQcm9wZXJ0eU5hbWVDYWNoZVtwcm9wZXJ0eV0gPSBjYW1lbENhc2UocHJvcGVydHkpO1xyXG5cdH1cclxuXHJcblx0cHJvcGVydHkgICA9IGNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XTtcclxuXHRzdHlsZVZhbHVlID0gZWxtU3R5bGVbcHJvcGVydHldO1xyXG5cclxuXHQvLyBBZGQgYW4gZXhjZXB0aW9uIGZvciB0ZXh0LWFsaWduXHJcblx0aWYgKCd0ZXh0QWxpZ24nID09PSBwcm9wZXJ0eSkge1xyXG5cdFx0c3R5bGVWYWx1ZSA9IHN0eWxlVmFsdWUgfHwgY3NzKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRcdGlmIChjc3MoZWxtLnBhcmVudE5vZGUsIHByb3BlcnR5KSA9PT0gc3R5bGVWYWx1ZSB8fFxyXG5cdFx0XHRjc3MoZWxtLCAnZGlzcGxheScpICE9PSAnYmxvY2snIHx8IGlzKGVsbSwgJ2hyLHRoJykpIHtcclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0eWxlVmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiBhbiBlbGVtZW50IGhhcyBhIHN0eWxlLlxyXG4gKlxyXG4gKiBJZiB2YWx1ZXMgYXJlIHNwZWNpZmllZCBpdCB3aWxsIGNoZWNrIHRoYXQgdGhlIHN0eWxlcyB2YWx1ZVxyXG4gKiBtYXRjaGVzIG9uZSBvZiB0aGUgdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHBhcmFtICB7c3RyaW5nfSBwcm9wZXJ0eVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd8YXJyYXl9IFt2YWx1ZXNdXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGUoZWxtLCBwcm9wZXJ0eSwgdmFsdWVzKSB7XHJcblx0dmFyIHN0eWxlVmFsdWUgPSBnZXRTdHlsZShlbG0sIHByb3BlcnR5KTtcclxuXHJcblx0aWYgKCFzdHlsZVZhbHVlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gIXZhbHVlcyB8fCBzdHlsZVZhbHVlID09PSB2YWx1ZXMgfHxcclxuXHRcdChBcnJheS5pc0FycmF5KHZhbHVlcykgJiYgdmFsdWVzLmluZGV4T2Yoc3R5bGVWYWx1ZSkgPiAtMSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCBub2RlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBpbmxpbmUgc3R5bGVzIGFuZCBhbGwgdGhlXHJcbiAqIGlubGluZSBzdHlsZXMgaGF2ZSBtYXRjaGluZyB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUFcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBzdHlsZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcclxuXHR2YXIgaSA9IG5vZGVBLnN0eWxlLmxlbmd0aDtcclxuXHRpZiAoaSAhPT0gbm9kZUIuc3R5bGUubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGVBLnN0eWxlW2ldO1xyXG5cdFx0aWYgKG5vZGVBLnN0eWxlW3Byb3BdICE9PSBub2RlQi5zdHlsZVtwcm9wXSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGF0dHJpYnV0ZXMgYW5kIGFsbCB0aGVcclxuICogYXR0cmlidXRlIHZhbHVlcyBtYXRjaFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGF0dHJpYnV0ZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcclxuXHR2YXIgaSA9IG5vZGVBLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlQS5hdHRyaWJ1dGVzW2ldO1xyXG5cdFx0dmFyIG5vdE1hdGNoZXMgPSBwcm9wLm5hbWUgPT09ICdzdHlsZScgP1xyXG5cdFx0XHQhc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSA6XHJcblx0XHRcdHByb3AudmFsdWUgIT09IGF0dHIobm9kZUIsIHByb3AubmFtZSk7XHJcblxyXG5cdFx0aWYgKG5vdE1hdGNoZXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGVsZW1lbnQgcGxhY2luZyBpdHMgY2hpbGRyZW4gaW4gaXRzIHBsYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKSB7XHJcblx0d2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0aW5zZXJ0QmVmb3JlKG5vZGUuZmlyc3RDaGlsZCwgbm9kZSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUobm9kZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZXMgaW5saW5lIHN0eWxlcyBhbmQgdGFncyB3aXRoIHBhcmVudHMgd2hlcmUgcG9zc2libGVcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBzaW5jZSAzLjEuMFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKG5vZGUpIHtcclxuXHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lO1xyXG5cdHZhciBtZXJnZVRhZ3MgPSAvQnxTVFJPTkd8RU18U1BBTnxGT05ULztcclxuXHJcblx0Ly8gTWVyZ2UgY2hpbGRyZW4gKGluIHJldmVyc2UgYXMgY2hpbGRyZW4gY2FuIGJlIHJlbW92ZWQpXHJcblx0dmFyIGkgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdG1lcmdlKG5vZGUuY2hpbGROb2Rlc1tpXSk7XHJcblx0fVxyXG5cclxuXHQvLyBTaG91bGQgb25seSBtZXJnZSBpbmxpbmUgdGFncyBhbmQgc2hvdWxkIG5vdCBtZXJnZSA8YnI+IHRhZ3NcclxuXHRpZiAoIWlzSW5saW5lKG5vZGUpIHx8IHRhZ05hbWUgPT09ICdCUicpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIFJlbW92ZSBhbnkgaW5saW5lIHN0eWxlcyB0aGF0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGVcclxuXHRpID0gbm9kZS5zdHlsZS5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlLnN0eWxlW2ldO1xyXG5cdFx0aWYgKGNzcyhwYXJlbnQsIHByb3ApID09PSBjc3Mobm9kZSwgcHJvcCkpIHtcclxuXHRcdFx0bm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIENhbiBvbmx5IHJlbW92ZSAvIG1lcmdlIHRhZ3MgaWYgbm8gaW5saW5lIHN0eWxpbmcgbGVmdC5cclxuXHQvLyBJZiB0aGVyZSBpcyBhbnkgaW5saW5lIHN0eWxlIGxlZnQgdGhlbiBpdCBtZWFucyBpdCBhdCBsZWFzdCBwYXJ0aWFsbHlcclxuXHQvLyBkb2Vzbid0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGUgc28gbXVzdCBzdGF5XHJcblx0aWYgKCFub2RlLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmVtb3ZlQXR0cihub2RlLCAnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBSZW1vdmUgZm9udCBhdHRyaWJ1dGVzIGlmIG1hdGNoIHBhcmVudFxyXG5cdFx0aWYgKHRhZ05hbWUgPT09ICdGT05UJykge1xyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSA9PT1cclxuXHRcdFx0XHRjc3MocGFyZW50LCAnZm9udEZhbWlseScpLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdmYWNlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2NvbG9yJykgPT09IGNzcyhwYXJlbnQsICdjb2xvcicpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQXR0cihub2RlLCAnY29sb3InKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnZm9udFNpemUnKSA9PT0gY3NzKHBhcmVudCwgJ2ZvbnRTaXplJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdzaXplJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTcGFucyBhbmQgZm9udCB0YWdzIHdpdGggbm8gYXR0cmlidXRlcyBjYW4gYmUgc2FmZWx5IHJlbW92ZWRcclxuXHRcdGlmICghbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCAmJiAvU1BBTnxGT05ULy50ZXN0KHRhZ05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdH0gZWxzZSBpZiAobWVyZ2VUYWdzLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0dmFyIGlzQm9sZCA9IC9CfFNUUk9ORy8udGVzdCh0YWdOYW1lKTtcclxuXHRcdFx0dmFyIGlzSXRhbGljID0gdGFnTmFtZSA9PT0gJ0VNJztcclxuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50KSAmJlxyXG5cdFx0XHRcdCghaXNCb2xkIHx8IC9ib2xkfDcwMC9pLnRlc3QoY3NzKHBhcmVudCwgJ2ZvbnRXZWlnaHQnKSkpICYmXHJcblx0XHRcdFx0KCFpc0l0YWxpYyB8fCBjc3MocGFyZW50LCAnZm9udFN0eWxlJykgPT09ICdpdGFsaWMnKSkge1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgaWYgcGFyZW50IG1hdGNoXHJcblx0XHRcdFx0aWYgKChwYXJlbnQudGFnTmFtZSA9PT0gdGFnTmFtZSB8fFxyXG5cdFx0XHRcdFx0KGlzQm9sZCAmJiAvQnxTVFJPTkcvLnRlc3QocGFyZW50LnRhZ05hbWUpKSkgJiZcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNNYXRjaChwYXJlbnQsIG5vZGUpKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBNZXJnZSBzaWJsaW5ncyBpZiBhdHRyaWJ1dGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlcywgbWF0Y2hcclxuXHR2YXIgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0aWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09PSB0YWdOYW1lICYmIGF0dHJpYnV0ZXNNYXRjaChuZXh0LCBub2RlKSkge1xyXG5cdFx0YXBwZW5kQ2hpbGQobm9kZSwgbmV4dCk7XHJcblx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obmV4dCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGFsbCBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBhbmRcbiAqIHJlcGxhY2VzIGFueSB0aGF0IGFyZW4ndCB3aXRoIHdpdGggdGhlaXIgZW1vdGljb24gY29kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3JhbmdlSGVscGVyfSByYW5nZUhlbHBlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2hpdGVzcGFjZShub2RlLCByYW5nZUhlbHBlcikge1xuXHR2YXIgbm9uZVdzUmVnZXggPSAvW15cXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0rLztcblx0dmFyIGVtb3RpY29ucyA9IG5vZGUgJiYgZG9tLmZpbmQobm9kZSwgJ2ltZ1tkYXRhLWVtbGVkaXRvci1lbW90aWNvbl0nKTtcblxuXHRpZiAoIW5vZGUgfHwgIWVtb3RpY29ucy5sZW5ndGgpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBlbW90aWNvbiA9IGVtb3RpY29uc1tpXTtcblx0XHR2YXIgcGFyZW50ID0gZW1vdGljb24ucGFyZW50Tm9kZTtcblx0XHR2YXIgcHJldiA9IGVtb3RpY29uLnByZXZpb3VzU2libGluZztcblx0XHR2YXIgbmV4dCA9IGVtb3RpY29uLm5leHRTaWJsaW5nO1xuXG5cdFx0aWYgKCghcHJldiB8fCAhbm9uZVdzUmVnZXgudGVzdChwcmV2Lm5vZGVWYWx1ZS5zbGljZSgtMSkpKSAmJlxuXHRcdFx0KCFuZXh0IHx8ICFub25lV3NSZWdleC50ZXN0KChuZXh0Lm5vZGVWYWx1ZSB8fCAnJylbMF0pKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFyIHJhbmdlID0gcmFuZ2VIZWxwZXIuY2xvbmVTZWxlY3RlZCgpO1xuXHRcdHZhciByYW5nZVN0YXJ0ID0gLTE7XG5cdFx0dmFyIHJhbmdlU3RhcnRDb250YWluZXIgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcblx0XHR2YXIgcHJldmlvdXNUZXh0ID0gKHByZXYgJiYgcHJldi5ub2RlVmFsdWUpIHx8ICcnO1xuXG5cdFx0cHJldmlvdXNUZXh0ICs9IGRvbS5kYXRhKGVtb3RpY29uLCAnZW1sZWRpdG9yLWVtb3RpY29uJyk7XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIGFmdGVyIHRoZSByZW1vdmVkIGVtb3RpY29uLCBhZGRcblx0XHQvLyB0aGUgbGVuZ3RoIG9mIHRoZSBuZXdseSBhZGRlZCB0ZXh0IHRvIGl0XG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IG5leHQpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSBwcmV2aW91c1RleHQubGVuZ3RoICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSBuZXh0IG5vZGUsIHNldCBpdCB0b1xuXHRcdC8vIHRoZSBlbmQgb2YgdGhlIG5ldyB0ZXh0IG5vZGVcblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gbm9kZSAmJlxuXHRcdFx0bm9kZS5jaGlsZE5vZGVzW3JhbmdlLnN0YXJ0T2Zmc2V0XSA9PT0gbmV4dCkge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHByZXZpb3VzVGV4dC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSByZW1vdmVkIGVtb3RpY29uLFxuXHRcdC8vIGp1c3Qga2VlcCBpdCBhdCB0aGF0IHBvc2l0aW9uXG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IHByZXYpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSByYW5nZS5zdGFydE9mZnNldDtcblx0XHR9XG5cblx0XHRpZiAoIW5leHQgfHwgbmV4dC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xuXHRcdFx0bmV4dCA9IHBhcmVudC5pbnNlcnRCZWZvcmUoXG5cdFx0XHRcdHBhcmVudC5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSwgbmV4dFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRuZXh0Lmluc2VydERhdGEoMCwgcHJldmlvdXNUZXh0KTtcblx0XHRkb20ucmVtb3ZlKGVtb3RpY29uKTtcblx0XHRpZiAocHJldikge1xuXHRcdFx0ZG9tLnJlbW92ZShwcmV2KTtcblx0XHR9XG5cblx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB0aGUgcmFuZ2Ugc3RhcnRpbmcgcG9zaXRpb24gaWYgaXQncyBiZWVuIG1vZGlmaWVkXG5cdFx0aWYgKHJhbmdlU3RhcnQgPiAtMSkge1xuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQobmV4dCwgcmFuZ2VTdGFydCk7XG5cdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcblx0XHRcdHJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJhbmdlKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBSZXBsYWNlcyBhbnkgZW1vdGljb25zIGluc2lkZSB0aGUgcm9vdCBub2RlIHdpdGggaW1hZ2VzLlxuICpcbiAqIGVtb3RpY29ucyBzaG91bGQgYmUgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXkgaXMgdGhlIGVtb3RpY29uXG4gKiBjb2RlIGFuZCB0aGUgdmFsdWUgaXMgdGhlIEhUTUwgdG8gcmVwbGFjZSBpdCB3aXRoLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3RcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gZW1vdGljb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVtb3RpY29uc0NvbXBhdFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2Uocm9vdCwgZW1vdGljb25zLCBlbW90aWNvbnNDb21wYXQpIHtcblx0dmFyXHRkb2MgICAgICAgICAgID0gcm9vdC5vd25lckRvY3VtZW50O1xuXHR2YXIgc3BhY2UgICAgICAgICA9ICcoXnxcXFxcc3xcXHhBMHxcXHUyMDAyfFxcdTIwMDN8XFx1MjAwOXwkKSc7XG5cdHZhciBlbW90aWNvbkNvZGVzID0gW107XG5cdHZhciBlbW90aWNvblJlZ2V4ID0ge307XG5cblx0Ly8gVE9ETzogTWFrZSB0aGlzIHRhZyBjb25maWd1cmFibGUuXG5cdGlmIChkb20ucGFyZW50KHJvb3QsICdjb2RlJykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR1dGlscy5lYWNoKGVtb3RpY29ucywgZnVuY3Rpb24gKGtleSkge1xuXHRcdGVtb3RpY29uUmVnZXhba2V5XSA9IG5ldyBSZWdFeHAoc3BhY2UgKyBlc2NhcGUucmVnZXgoa2V5KSArIHNwYWNlKTtcblx0XHRlbW90aWNvbkNvZGVzLnB1c2goa2V5KTtcblx0fSk7XG5cblx0Ly8gU29ydCBrZXlzIGxvbmdlc3QgdG8gc2hvcnRlc3Qgc28gdGhhdCBsb25nZXIga2V5c1xuXHQvLyB0YWtlIHByZWNlZGVuY2UgKGF2b2lkcyBidWdzIHdpdGggc2hvcnRlciBrZXlzIHBhcnRpYWxseVxuXHQvLyBtYXRjaGluZyBsb25nZXIgb25lcylcblx0ZW1vdGljb25Db2Rlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0cmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG5cdH0pO1xuXG5cdChmdW5jdGlvbiBjb252ZXJ0KG5vZGUpIHtcblx0XHRub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG5cdFx0d2hpbGUgKG5vZGUpIHtcblx0XHRcdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiYgIWRvbS5pcyhub2RlLCAnY29kZScpKSB7XG5cdFx0XHRcdGNvbnZlcnQobm9kZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW1vdGljb25Db2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciB0ZXh0ICA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHZhciBrZXkgICA9IGVtb3RpY29uQ29kZXNbaV07XG5cdFx0XHRcdFx0dmFyIGluZGV4ID0gZW1vdGljb25zQ29tcGF0ID9cblx0XHRcdFx0XHRcdHRleHQuc2VhcmNoKGVtb3RpY29uUmVnZXhba2V5XSkgOlxuXHRcdFx0XHRcdFx0dGV4dC5pbmRleE9mKGtleSk7XG5cblx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gV2hlbiBlbW90aWNvbnNDb21wYXQgaXMgZW5hYmxlZCB0aGlzIHdpbGwgYmUgdGhlXG5cdFx0XHRcdFx0XHQvLyBwb3NpdGlvbiBhZnRlciBhbnkgd2hpdGUgc3BhY2Vcblx0XHRcdFx0XHRcdHZhciBzdGFydEluZGV4ID0gdGV4dC5pbmRleE9mKGtleSwgaW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIGZyYWdtZW50ICAgPSBkb20ucGFyc2VIVE1MKGVtb3RpY29uc1trZXldLCBkb2MpO1xuXHRcdFx0XHRcdFx0dmFyIGFmdGVyICAgICAgPSB0ZXh0LnN1YnN0cihzdGFydEluZGV4ICsga2V5Lmxlbmd0aCk7XG5cblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShhZnRlcikpO1xuXG5cdFx0XHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IHRleHQuc3Vic3RyKDAsIHN0YXJ0SW5kZXgpO1xuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnROb2RlXG5cdFx0XHRcdFx0XHRcdC5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIG5vZGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbm9kZS5uZXh0U2libGluZztcblx0XHR9XG5cdH0ocm9vdCkpO1xufVxuIiwiLy8gTXVzdCBzdGFydCB3aXRoIGEgdmFsaWQgc2NoZW1lXHJcbi8vIFx0XHReXHJcbi8vIFNjaGVtZXMgdGhhdCBhcmUgY29uc2lkZXJlZCBzYWZlXHJcbi8vIFx0XHQoaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8XHJcbi8vIFJlbGF0aXZlIHNjaGVtZXMgKC8vOikgYXJlIGNvbnNpZGVyZWQgc2FmZVxyXG4vLyBcdFx0KFxcXFwvXFxcXC8pfFxyXG4vLyBJbWFnZSBkYXRhIFVSSSdzIGFyZSBjb25zaWRlcmVkIHNhZmVcclxuLy8gXHRcdGRhdGE6aW1hZ2VcXFxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTtcclxudmFyIFZBTElEX1NDSEVNRV9SRUdFWCA9XHJcblx0L14oaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8KFxcL1xcLyl8ZGF0YTppbWFnZVxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTsvaTtcclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGEgc3RyaW5nIHNvIGl0J3Mgc2FmZSB0byB1c2UgaW4gcmVnZXhcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVnZXgoc3RyKSB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oWy0uKis/Xj0hOiR7fSgpfFtcXF0vXFxcXF0pL2csICdcXFxcJDEnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZXMgYWxsIEhUTUwgZW50aXRpZXMgaW4gYSBzdHJpbmdcclxuICpcclxuICogSWYgbm9RdW90ZXMgaXMgc2V0IHRvIGZhbHNlLCBhbGwgc2luZ2xlIGFuZCBkb3VibGVcclxuICogcXVvdGVzIHdpbGwgYWxzbyBiZSBlc2NhcGVkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtib29sZWFufSBbbm9RdW90ZXM9dHJ1ZV1cclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiBAc2luY2UgMS40LjFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnRpdGllcyhzdHIsIG5vUXVvdGVzKSB7XHJcblx0aWYgKCFzdHIpIHtcclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG5cclxuXHR2YXIgcmVwbGFjZW1lbnRzID0ge1xyXG5cdFx0JyYnOiAnJmFtcDsnLFxyXG5cdFx0JzwnOiAnJmx0OycsXHJcblx0XHQnPic6ICcmZ3Q7JyxcclxuXHRcdCcgICc6ICcmbmJzcDsgJyxcclxuXHRcdCdcXHJcXG4nOiAnPGJyIC8+JyxcclxuXHRcdCdcXHInOiAnPGJyIC8+JyxcclxuXHRcdCdcXG4nOiAnPGJyIC8+J1xyXG5cdH07XHJcblxyXG5cdGlmIChub1F1b3RlcyAhPT0gZmFsc2UpIHtcclxuXHRcdHJlcGxhY2VtZW50c1snXCInXSAgPSAnJiMzNDsnO1xyXG5cdFx0cmVwbGFjZW1lbnRzWydcXCcnXSA9ICcmIzM5Oyc7XHJcblx0XHRyZXBsYWNlbWVudHNbJ2AnXSAgPSAnJiM5NjsnO1xyXG5cdH1cclxuXHJcblx0c3RyID0gc3RyLnJlcGxhY2UoLyB7Mn18XFxyXFxufFsmPD5cXHJcXG4nXCJgXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcclxuXHRcdHJldHVybiByZXBsYWNlbWVudHNbbWF0Y2hdIHx8IG1hdGNoO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gc3RyO1xyXG59XHJcblxyXG4vKipcclxuICogRXNjYXBlIFVSSSBzY2hlbWUuXHJcbiAqXHJcbiAqIEFwcGVuZHMgdGhlIGN1cnJlbnQgVVJMIHRvIGEgdXJsIGlmIGl0IGhhcyBhIHNjaGVtZSB0aGF0IGlzIG5vdDpcclxuICpcclxuICogaHR0cFxyXG4gKiBodHRwc1xyXG4gKiBzZnRwXHJcbiAqIGZ0cFxyXG4gKiBtYWlsdG9cclxuICogc3BvdGlmeVxyXG4gKiBza3lwZVxyXG4gKiBzc2hcclxuICogdGVhbXNwZWFrXHJcbiAqIHRlbFxyXG4gKiAvL1xyXG4gKiBkYXRhOmltYWdlLyhwbmd8anBlZ3xqcGd8cGpwZWd8Ym1wfGdpZik7XHJcbiAqXHJcbiAqICoqSU1QT1JUQU5UKio6IFRoaXMgZG9lcyBub3QgZXNjYXBlIGFueSBIVE1MIGluIGEgdXJsLCBmb3JcclxuICogdGhhdCB1c2UgdGhlIGVzY2FwZS5lbnRpdGllcygpIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiBAc2luY2UgMS40LjVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmlTY2hlbWUodXJsKSB7XHJcblx0dmFyXHRwYXRoLFxyXG5cdFx0Ly8gSWYgdGhlcmUgaXMgYSA6IGJlZm9yZSBhIC8gdGhlbiBpdCBoYXMgYSBzY2hlbWVcclxuXHRcdGhhc1NjaGVtZSA9IC9eW14vXSo6L2ksXHJcblx0XHRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcclxuXHJcblx0Ly8gSGFzIG5vIHNjaGVtZSBvciBhIHZhbGlkIHNjaGVtZVxyXG5cdGlmICgoIXVybCB8fCAhaGFzU2NoZW1lLnRlc3QodXJsKSkgfHwgVkFMSURfU0NIRU1FX1JFR0VYLnRlc3QodXJsKSkge1xyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcblxyXG5cdHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xyXG5cdHBhdGgucG9wKCk7XHJcblxyXG5cdHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgK1xyXG5cdFx0bG9jYXRpb24uaG9zdCArXHJcblx0XHRwYXRoLmpvaW4oJy8nKSArICcvJyArXHJcblx0XHR1cmw7XHJcbn1cclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMgKi9cbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5cblxuLyoqXG4gKiBHZXRzIHRoZSB0ZXh0LCBzdGFydC9lbmQgbm9kZSBhbmQgb2Zmc2V0IGZvclxuICogbGVuZ3RoIGNoYXJzIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHBhc3NlZCBub2RlXG4gKiBhdCB0aGUgc3BlY2lmaWVkIG9mZnNldC5cbiAqXG4gKiBAcGFyYW0gIHtOb2RlfSAgbm9kZVxuICogQHBhcmFtICB7bnVtYmVyfSAgb2Zmc2V0XG4gKiBAcGFyYW0gIHtib29sZWFufSBpc0xlZnRcbiAqIEBwYXJhbSAge251bWJlcn0gIGxlbmd0aFxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIG91dGVyVGV4dCA9IGZ1bmN0aW9uIChyYW5nZSwgaXNMZWZ0LCBsZW5ndGgpIHtcblx0dmFyIG5vZGVWYWx1ZSwgcmVtYWluaW5nLCBzdGFydCwgZW5kLCBub2RlLFxuXHRcdHRleHQgPSAnJyxcblx0XHRuZXh0ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIsXG5cdFx0b2Zmc2V0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cblx0Ly8gSGFuZGxlIGNhc2VzIHdoZXJlIG5vZGUgaXMgYSBwYXJhZ3JhcGggYW5kIG9mZnNldFxuXHQvLyByZWZlcnMgdG8gdGhlIGluZGV4IG9mIGEgdGV4dCBub2RlLlxuXHQvLyAzID0gdGV4dCBub2RlXG5cdGlmIChuZXh0ICYmIG5leHQubm9kZVR5cGUgIT09IDMpIHtcblx0XHRuZXh0ID0gbmV4dC5jaGlsZE5vZGVzW29mZnNldF07XG5cdFx0b2Zmc2V0ID0gMDtcblx0fVxuXG5cdHN0YXJ0ID0gZW5kID0gb2Zmc2V0O1xuXG5cdHdoaWxlIChsZW5ndGggPiB0ZXh0Lmxlbmd0aCAmJiBuZXh0ICYmIG5leHQubm9kZVR5cGUgPT09IDMpIHtcblx0XHRub2RlVmFsdWUgPSBuZXh0Lm5vZGVWYWx1ZTtcblx0XHRyZW1haW5pbmcgPSBsZW5ndGggLSB0ZXh0Lmxlbmd0aDtcblxuXHRcdC8vIElmIG5vdCB0aGUgZmlyc3Qgbm9kZSwgc3RhcnQgYW5kIGVuZCBzaG91bGQgYmUgYXQgdGhlaXJcblx0XHQvLyBtYXggdmFsdWVzIGFzIHdpbGwgYmUgdXBkYXRlZCB3aGVuIGdldHRpbmcgdGhlIHRleHRcblx0XHRpZiAobm9kZSkge1xuXHRcdFx0ZW5kID0gbm9kZVZhbHVlLmxlbmd0aDtcblx0XHRcdHN0YXJ0ID0gMDtcblx0XHR9XG5cblx0XHRub2RlID0gbmV4dDtcblxuXHRcdGlmIChpc0xlZnQpIHtcblx0XHRcdHN0YXJ0ID0gTWF0aC5tYXgoZW5kIC0gcmVtYWluaW5nLCAwKTtcblx0XHRcdG9mZnNldCA9IHN0YXJ0O1xuXG5cdFx0XHR0ZXh0ID0gbm9kZVZhbHVlLnN1YnN0cihzdGFydCwgZW5kIC0gc3RhcnQpICsgdGV4dDtcblx0XHRcdG5leHQgPSBub2RlLnByZXZpb3VzU2libGluZztcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZW5kID0gTWF0aC5taW4ocmVtYWluaW5nLCBub2RlVmFsdWUubGVuZ3RoKTtcblx0XHRcdG9mZnNldCA9IHN0YXJ0ICsgZW5kO1xuXG5cdFx0XHR0ZXh0ICs9IG5vZGVWYWx1ZS5zdWJzdHIoc3RhcnQsIGVuZCk7XG5cdFx0XHRuZXh0ID0gbm9kZS5uZXh0U2libGluZztcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG5vZGU6IG5vZGUgfHwgbmV4dCxcblx0XHRvZmZzZXQ6IG9mZnNldCxcblx0XHR0ZXh0OiB0ZXh0XG5cdH07XG59O1xuXG4vKipcbiAqIFJhbmdlIGhlbHBlclxuICpcbiAqIEBjbGFzcyBSYW5nZUhlbHBlclxuICogQG5hbWUgUmFuZ2VIZWxwZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFJhbmdlSGVscGVyIHtcblx0Y29uc3RydWN0b3Iod2luLCBkLCBzYW5pdGl6ZSkge1xuXHRcdHZhciBfY3JlYXRlTWFya2VyLCBfcHJlcGFyZUlucHV0LCBkb2MgPSBkIHx8IHdpbi5jb250ZW50RG9jdW1lbnQgfHwgd2luLmRvY3VtZW50LCBzdGFydE1hcmtlciA9ICdlbWxlZGl0b3Itc3RhcnQtbWFya2VyJywgZW5kTWFya2VyID0gJ2VtbGVkaXRvci1lbmQtbWFya2VyJztcblxuXHRcdC8qKlxuXHRcdCAqIEluc2VydHMgSFRNTCBpbnRvIHRoZSBjdXJyZW50IHJhbmdlIHJlcGxhY2luZyBhbnkgc2VsZWN0ZWRcblx0XHQgKiB0ZXh0LlxuXHRcdCAqXG5cdFx0ICogSWYgZW5kSFRNTCBpcyBzcGVjaWZpZWQgdGhlIHNlbGVjdGVkIGNvbnRlbnRzIHdpbGwgYmUgcHV0IGJldHdlZW5cblx0XHQgKiBodG1sIGFuZCBlbmRIVE1MLiBJZiB0aGVyZSBpcyBub3RoaW5nIHNlbGVjdGVkIGh0bWwgYW5kIGVuZEhUTUwgYXJlXG5cdFx0ICoganVzdCBjb25jYXRlbmF0ZSB0b2dldGhlci5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRIVE1MXVxuXHRcdCAqIEByZXR1cm4gRmFsc2Ugb24gZmFpbFxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGluc2VydEhUTUxcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5pbnNlcnRIVE1MID0gZnVuY3Rpb24gKGh0bWwsIGVuZEhUTUwpIHtcblx0XHRcdHZhciBub2RlLCBkaXYsIHJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZW5kSFRNTCkge1xuXHRcdFx0XHRodG1sICs9IHRoaXMuc2VsZWN0ZWRIdG1sKCkgKyBlbmRIVE1MO1xuXHRcdFx0fVxuXG5cdFx0XHRkaXYgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCBkb2MpO1xuXHRcdFx0bm9kZSA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gc2FuaXRpemUoaHRtbCk7XG5cblx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobm9kZSwgZGl2LmZpcnN0Q2hpbGQpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmluc2VydE5vZGUobm9kZSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFByZXBhcmVzIEhUTUwgdG8gYmUgaW5zZXJ0ZWQgYnkgYWRkaW5nIGEgemVybyB3aWR0aCBzcGFjZVxuXHRcdCAqIGlmIHRoZSBsYXN0IGNoaWxkIGlzIGVtcHR5IGFuZCBhZGRpbmcgdGhlIHJhbmdlIHN0YXJ0L2VuZFxuXHRcdCAqIG1hcmtlcnMgdG8gdGhlIGxhc3QgY2hpbGQuXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gIHtOb2RlfHN0cmluZ30gbm9kZVxuXHRcdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbZW5kTm9kZV1cblx0XHQgKiBAcGFyYW0gIHtib29sZWFufSBbcmV0dXJuSHRtbF1cblx0XHQgKiBAcmV0dXJuIHtOb2RlfHN0cmluZ31cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9wcmVwYXJlSW5wdXQgPSBmdW5jdGlvbiAobm9kZSwgZW5kTm9kZSwgcmV0dXJuSHRtbCkge1xuXHRcdFx0dmFyIGxhc3RDaGlsZCwgZnJhZyA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cblx0XHRcdGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0aWYgKGVuZE5vZGUpIHtcblx0XHRcdFx0XHRub2RlICs9IHRoaXMuc2VsZWN0ZWRIdG1sKCkgKyBlbmROb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZnJhZyA9IGRvbS5wYXJzZUhUTUwobm9kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgbm9kZSk7XG5cblx0XHRcdFx0aWYgKGVuZE5vZGUpIHtcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgdGhpcy5zZWxlY3RlZFJhbmdlKCkuZXh0cmFjdENvbnRlbnRzKCkpO1xuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBlbmROb2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIShsYXN0Q2hpbGQgPSBmcmFnLmxhc3RDaGlsZCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAoIWRvbS5pc0lubGluZShsYXN0Q2hpbGQubGFzdENoaWxkLCB0cnVlKSkge1xuXHRcdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQubGFzdENoaWxkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG9tLmNhbkhhdmVDaGlsZHJlbihsYXN0Q2hpbGQpKSB7XG5cdFx0XHRcdC8vIFdlYmtpdCB3b24ndCBhbGxvdyB0aGUgY3Vyc29yIHRvIGJlIHBsYWNlZCBpbnNpZGUgYW5cblx0XHRcdFx0Ly8gZW1wdHkgdGFnLCBzbyBhZGQgYSB6ZXJvIHdpZHRoIHNwYWNlIHRvIGl0LlxuXHRcdFx0XHRpZiAoIWxhc3RDaGlsZC5sYXN0Q2hpbGQpIHtcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnXFx1MjAwQicpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGFzdENoaWxkID0gZnJhZztcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXJzKCk7XG5cblx0XHRcdC8vIEFwcGVuZCBtYXJrcyB0byBsYXN0IGNoaWxkIHNvIHdoZW4gcmVzdG9yZWQgY3Vyc29yIHdpbGwgYmUgaW5cblx0XHRcdC8vIHRoZSByaWdodCBwbGFjZVxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcikpO1xuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpKTtcblxuXHRcdFx0aWYgKHJldHVybkh0bWwpIHtcblx0XHRcdFx0dmFyIGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgZnJhZyk7XG5cblx0XHRcdFx0cmV0dXJuIGRpdi5pbm5lckhUTUw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmcmFnO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBUaGUgc2FtZSBhcyBpbnNlcnRIVE1MIGV4Y2VwdCB3aXRoIERPTSBub2RlcyBpbnN0ZWFkXG5cdFx0ICpcblx0XHQgKiA8c3Ryb25nPldhcm5pbmc6PC9zdHJvbmc+IHRoZSBub2RlcyBtdXN0IGJlbG9uZyB0byB0aGVcblx0XHQgKiBkb2N1bWVudCB0aGV5IGFyZSBiZWluZyBpbnNlcnRlZCBpbnRvLiBTb21lIGJyb3dzZXJzXG5cdFx0ICogd2lsbCB0aHJvdyBleGNlcHRpb25zIGlmIHRoZXkgZG9uJ3QuXG5cdFx0ICpcblx0XHQgKiBSZXR1cm5zIGJvb2xlYW4gZmFsc2Ugb24gZmFpbFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBlbmROb2RlXG5cdFx0ICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGluc2VydE5vZGVcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5pbnNlcnROb2RlID0gZnVuY3Rpb24gKG5vZGUsIGVuZE5vZGUpIHtcblx0XHRcdHZhciBmaXJzdCwgbGFzdCwgaW5wdXQgPSBfcHJlcGFyZUlucHV0KG5vZGUsIGVuZE5vZGUpLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lciwgZW1wdHlOb2RlcyA9IFtdO1xuXG5cdFx0XHRpZiAoIWlucHV0KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlSWZFbXB0eShub2RlKSB7XG5cdFx0XHRcdC8vIE9ubHkgcmVtb3ZlIGVtcHR5IG5vZGUgaWYgaXQgd2Fzbid0IGFscmVhZHkgZW1wdHlcblx0XHRcdFx0aWYgKG5vZGUgJiYgZG9tLmlzRW1wdHkobm9kZSkgJiYgZW1wdHlOb2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkge1xuXHRcdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHJhbmdlLnN0YXJ0Q29udGFpbmVyICE9PSByYW5nZS5lbmRDb250YWluZXIpIHtcblx0XHRcdFx0dXRpbHMuZWFjaChwYXJlbnQuY2hpbGROb2RlcywgZnVuY3Rpb24gKF8sIG5vZGUpIHtcblx0XHRcdFx0XHRpZiAoZG9tLmlzRW1wdHkobm9kZSkpIHtcblx0XHRcdFx0XHRcdGVtcHR5Tm9kZXMucHVzaChub2RlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZpcnN0ID0gaW5wdXQuZmlyc3RDaGlsZDtcblx0XHRcdFx0bGFzdCA9IGlucHV0Lmxhc3RDaGlsZDtcblx0XHRcdH1cblxuXHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcblxuXHRcdFx0Ly8gRkYgYWxsb3dzIDxiciAvPiB0byBiZSBzZWxlY3RlZCBidXQgaW5zZXJ0aW5nIGEgbm9kZVxuXHRcdFx0Ly8gaW50byA8YnIgLz4gd2lsbCBjYXVzZSBpdCBub3QgdG8gYmUgZGlzcGxheWVkIHNvIG11c3Rcblx0XHRcdC8vIGluc2VydCBiZWZvcmUgdGhlIDxiciAvPiBpbiBGRi5cblx0XHRcdC8vIDMgPSBUZXh0Tm9kZVxuXHRcdFx0aWYgKHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDMgJiYgIWRvbS5jYW5IYXZlQ2hpbGRyZW4ocGFyZW50KSkge1xuXHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGlucHV0LCBwYXJlbnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmFuZ2UuaW5zZXJ0Tm9kZShpbnB1dCk7XG5cblx0XHRcdFx0Ly8gSWYgYSBub2RlIHdhcyBzcGxpdCBvciBpdHMgY29udGVudHMgZGVsZXRlZCwgcmVtb3ZlIGFueSByZXN1bHRpbmdcblx0XHRcdFx0Ly8gZW1wdHkgdGFncy4gRm9yIGV4YW1wbGU6XG5cdFx0XHRcdC8vIDxwPnx0ZXN0PC9wPjxkaXY+dGVzdHw8L2Rpdj5cblx0XHRcdFx0Ly8gV2hlbiBkZWxldGVDb250ZW50cyBjb3VsZCBiZWNvbWU6XG5cdFx0XHRcdC8vIDxwPjwvcD58PGRpdj48L2Rpdj5cblx0XHRcdFx0Ly8gU28gcmVtb3ZlIHRoZSBlbXB0eSBvbmVzXG5cdFx0XHRcdHJlbW92ZUlmRW1wdHkoZmlyc3QgJiYgZmlyc3QucHJldmlvdXNTaWJsaW5nKTtcblx0XHRcdFx0cmVtb3ZlSWZFbXB0eShsYXN0ICYmIGxhc3QubmV4dFNpYmxpbmcpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnJlc3RvcmVSYW5nZSgpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDbG9uZXMgdGhlIHNlbGVjdGVkIFJhbmdlXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtSYW5nZX1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBjbG9uZVNlbGVjdGVkXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuY2xvbmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xuXG5cdFx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIHJhbmdlLmNsb25lUmFuZ2UoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogR2V0cyB0aGUgc2VsZWN0ZWQgUmFuZ2Vcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge1JhbmdlfVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIHNlbGVjdGVkUmFuZ2Vcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5zZWxlY3RlZFJhbmdlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHJhbmdlLCBmaXJzdENoaWxkLCBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHRcdGlmICghc2VsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gV2hlbiBjcmVhdGluZyBhIG5ldyByYW5nZSwgc2V0IHRoZSBzdGFydCB0byB0aGUgZmlyc3QgY2hpbGRcblx0XHRcdC8vIGVsZW1lbnQgb2YgdGhlIGJvZHkgZWxlbWVudCB0byBhdm9pZCBlcnJvcnMgaW4gRkYuXG5cdFx0XHRpZiAoc2VsLnJhbmdlQ291bnQgPD0gMCkge1xuXHRcdFx0XHRmaXJzdENoaWxkID0gZG9jLmJvZHk7XG5cdFx0XHRcdHdoaWxlIChmaXJzdENoaWxkLmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0XHRmaXJzdENoaWxkID0gZmlyc3RDaGlsZC5maXJzdENoaWxkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcblx0XHRcdFx0Ly8gTXVzdCBiZSBzZXRTdGFydEJlZm9yZSBvdGhlcndpc2UgaXQgY2FuIGNhdXNlIGluZmluaXRlXG5cdFx0XHRcdC8vIGxvb3BzIHdpdGggbGlzdHMgaW4gV2ViS2l0LiBTZWUgaXNzdWUgNDQyXG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKGZpcnN0Q2hpbGQpO1xuXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzZWwucmFuZ2VDb3VudCA+IDApIHtcblx0XHRcdFx0cmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJhbmdlO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGlvblxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBoYXNTZWxlY3Rpb25cblx0XHQgKiBAc2luY2UgMS40LjRcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5oYXNTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xuXG5cdFx0XHRyZXR1cm4gc2VsICYmIHNlbC5yYW5nZUNvdW50ID4gMDtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogR2V0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIEhUTUxcblx0XHQgKlxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBzZWxlY3RlZEh0bWxcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5zZWxlY3RlZEh0bWwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZGl2LCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xuXG5cdFx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdFx0ZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGRpdiwgcmFuZ2UuY2xvbmVDb250ZW50cygpKTtcblxuXHRcdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSBwYXJlbnQgbm9kZSBvZiB0aGUgc2VsZWN0ZWQgY29udGVudHMgaW4gdGhlIHJhbmdlXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBwYXJlbnROb2RlXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMucGFyZW50Tm9kZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xuXG5cdFx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXG5cdFx0ICogY29udGVudHMgb2YgdGhlIHJhbmdlLlxuXHRcdCAqXG5cdFx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudFxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgb2YgdGhlIHNlbGVjdGVkXG5cdFx0ICogY29udGVudHMgb2YgdGhlIHJhbmdlLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBbbl0gVGhlIGVsZW1lbnQgdG8gZ2V0IHRoZSBmaXJzdCBibG9jayBsZXZlbCBwYXJlbnQgZnJvbVxuXHRcdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGdldEZpcnN0QmxvY2tQYXJlbnReMlxuXHRcdCAqIEBzaW5jZSAxLjQuMVxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLmdldEZpcnN0QmxvY2tQYXJlbnQgPSBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0dmFyIGZ1bmMgPSBmdW5jdGlvbiAoZWxtKSB7XG5cdFx0XHRcdGlmICghZG9tLmlzSW5saW5lKGVsbSwgdHJ1ZSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZWxtO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWxtID0gZWxtID8gZWxtLnBhcmVudE5vZGUgOiBudWxsO1xuXG5cdFx0XHRcdHJldHVybiBlbG0gPyBmdW5jKGVsbSkgOiBlbG07XG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gZnVuYyhub2RlIHx8IHRoaXMucGFyZW50Tm9kZSgpKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogSW5zZXJ0cyBhIG5vZGUgYXQgZWl0aGVyIHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge0Jvb2x9IHN0YXJ0XG5cdFx0ICogQHBhcmFtIHtOb2RlfSBub2RlXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgaW5zZXJ0Tm9kZUF0XG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuaW5zZXJ0Tm9kZUF0ID0gZnVuY3Rpb24gKHN0YXJ0LCBub2RlKSB7XG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCksIHJhbmdlID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XG5cblx0XHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShzdGFydCk7XG5cdFx0XHRyYW5nZS5pbnNlcnROb2RlKG5vZGUpO1xuXG5cdFx0XHQvLyBSZXNlbGVjdCB0aGUgY3VycmVudCByYW5nZS5cblx0XHRcdC8vIEZpeGVzIGlzc3VlIHdpdGggQ2hyb21lIGxvc2luZyB0aGUgc2VsZWN0aW9uLiBJc3N1ZSM4MlxuXHRcdFx0dGhpcy5zZWxlY3RSYW5nZShjdXJyZW50UmFuZ2UpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGEgbWFya2VyIG5vZGVcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuXHRcdCAqIEByZXR1cm4ge0hUTUxTcGFuRWxlbWVudH1cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VyKGlkKTtcblxuXHRcdFx0dmFyIG1hcmtlciA9IGRvbS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xuXHRcdFx0XHRpZDogaWQsXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1zZWxlY3Rpb24gZW1sZWRpdG9yLWlnbm9yZScsXG5cdFx0XHRcdHN0eWxlOiAnZGlzcGxheTpub25lO2xpbmUtaGVpZ2h0OjAnXG5cdFx0XHR9LCBkb2MpO1xuXG5cdFx0XHRtYXJrZXIuaW5uZXJIVE1MID0gJyAnO1xuXG5cdFx0XHRyZXR1cm4gbWFya2VyO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBJbnNlcnRzIHN0YXJ0L2VuZCBtYXJrZXJzIGZvciB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHQgKiB3aGljaCBjYW4gYmUgdXNlZCBieSByZXN0b3JlUmFuZ2UgdG8gcmUtc2VsZWN0IHRoZVxuXHRcdCAqIHJhbmdlLlxuXHRcdCAqXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIGluc2VydE1hcmtlcnNcblx0XHQgKi9cblx0XHR0aGlzLmluc2VydE1hcmtlcnMgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XG5cdFx0XHR2YXIgc3RhcnROb2RlID0gX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcik7XG5cblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xuXHRcdFx0dGhpcy5pbnNlcnROb2RlQXQodHJ1ZSwgc3RhcnROb2RlKTtcblxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBlbmQgbWFya2VyIHNvbWV0aW1lcyBiZWluZyBwbGFjZWQgYmVmb3JlXG5cdFx0XHQvLyB0aGUgc3RhcnQgbWFya2VyIHdoZW4gdGhlIHJhbmdlIGlzIGNvbGxhcHNlZC5cblx0XHRcdGlmIChjdXJyZW50UmFuZ2UgJiYgY3VycmVudFJhbmdlLmNvbGxhcHNlZCkge1xuXHRcdFx0XHRzdGFydE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG5cdFx0XHRcdFx0X2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpLCBzdGFydE5vZGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5pbnNlcnROb2RlQXQoZmFsc2UsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEdldHMgdGhlIG1hcmtlciB3aXRoIHRoZSBzcGVjaWZpZWQgSURcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuXHRcdCAqIEByZXR1cm4ge05vZGV9XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgZ2V0TWFya2VyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0TWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHRyZXR1cm4gZG9jLmdldEVsZW1lbnRCeUlkKGlkKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlcyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgcmVtb3ZlTWFya2VyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMucmVtb3ZlTWFya2VyID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0XHR2YXIgbWFya2VyID0gdGhpcy5nZXRNYXJrZXIoaWQpO1xuXG5cdFx0XHRpZiAobWFya2VyKSB7XG5cdFx0XHRcdGRvbS5yZW1vdmUobWFya2VyKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVtb3ZlcyB0aGUgc3RhcnQvZW5kIG1hcmtlcnNcblx0XHQgKlxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIHJlbW92ZU1hcmtlcnNcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoc3RhcnRNYXJrZXIpO1xuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoZW5kTWFya2VyKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogU2F2ZXMgdGhlIGN1cnJlbnQgcmFuZ2UgbG9jYXRpb24uIEFsaWFzIG9mIGluc2VydE1hcmtlcnMoKVxuXHRcdCAqXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgc2F2ZVJhZ2Vcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5zYXZlUmFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydE1hcmtlcnMoKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogU2VsZWN0IHRoZSBzcGVjaWZpZWQgcmFuZ2Vcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7UmFuZ2V9IHJhbmdlXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgc2VsZWN0UmFuZ2Vcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5zZWxlY3RSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuXHRcdFx0dmFyIGxhc3RDaGlsZDtcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cdFx0XHR2YXIgY29udGFpbmVyID0gcmFuZ2UuZW5kQ29udGFpbmVyO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcblx0XHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXG5cdFx0XHQvLyB0byBvY2N1ciB3aGVuIHNvbWV0aGluZyBpcyB0eXBlZC4gU2VlIGlzc3VlICMzMjFcblx0XHRcdGlmIChyYW5nZS5jb2xsYXBzZWQgJiYgY29udGFpbmVyICYmXG5cdFx0XHRcdCFkb20uaXNJbmxpbmUoY29udGFpbmVyLCB0cnVlKSkge1xuXG5cdFx0XHRcdGxhc3RDaGlsZCA9IGNvbnRhaW5lci5sYXN0Q2hpbGQ7XG5cdFx0XHRcdHdoaWxlIChsYXN0Q2hpbGQgJiYgZG9tLmlzKGxhc3RDaGlsZCwgJy5lbWxlZGl0b3ItaWdub3JlJykpIHtcblx0XHRcdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQucHJldmlvdXNTaWJsaW5nO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGRvbS5pcyhsYXN0Q2hpbGQsICdicicpKSB7XG5cdFx0XHRcdFx0dmFyIHJuZyA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuXHRcdFx0XHRcdHJuZy5zZXRFbmRBZnRlcihsYXN0Q2hpbGQpO1xuXHRcdFx0XHRcdHJuZy5jb2xsYXBzZShmYWxzZSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5jb21wYXJlKHJhbmdlLCBybmcpKSB7XG5cdFx0XHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShsYXN0Q2hpbGQpO1xuXHRcdFx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzZWwpIHtcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xuXHRcdFx0XHRzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZXN0b3JlcyB0aGUgbGFzdCByYW5nZSBzYXZlZCBieSBzYXZlUmFuZ2UoKSBvciBpbnNlcnRNYXJrZXJzKClcblx0XHQgKlxuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIHJlc3RvcmVSYW5nZVxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLnJlc3RvcmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBpc0NvbGxhcHNlZCwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKSwgc3RhcnQgPSB0aGlzLmdldE1hcmtlcihzdGFydE1hcmtlciksIGVuZCA9IHRoaXMuZ2V0TWFya2VyKGVuZE1hcmtlcik7XG5cblx0XHRcdGlmICghc3RhcnQgfHwgIWVuZCB8fCAhcmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpc0NvbGxhcHNlZCA9IHN0YXJ0Lm5leHRTaWJsaW5nID09PSBlbmQ7XG5cblx0XHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShzdGFydCk7XG5cdFx0XHRyYW5nZS5zZXRFbmRBZnRlcihlbmQpO1xuXG5cdFx0XHRpZiAoaXNDb2xsYXBzZWQpIHtcblx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXJzKCk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIFNlbGVjdHMgdGhlIHRleHQgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gbGVmdFxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSByaWdodFxuXHRcdCAqIEBzaW5jZSAxLjQuM1xuXHRcdCAqIEBmdW5jdGlvblxuXHRcdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcblx0XHQgKi9cblx0XHR0aGlzLnNlbGVjdE91dGVyVGV4dCA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuXHRcdFx0dmFyIHN0YXJ0LCBlbmQsIHJhbmdlID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XG5cblx0XHRcdGlmICghcmFuZ2UpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShmYWxzZSk7XG5cblx0XHRcdHN0YXJ0ID0gb3V0ZXJUZXh0KHJhbmdlLCB0cnVlLCBsZWZ0KTtcblx0XHRcdGVuZCA9IG91dGVyVGV4dChyYW5nZSwgZmFsc2UsIHJpZ2h0KTtcblxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQoc3RhcnQubm9kZSwgc3RhcnQub2Zmc2V0KTtcblx0XHRcdHJhbmdlLnNldEVuZChlbmQubm9kZSwgZW5kLm9mZnNldCk7XG5cblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UocmFuZ2UpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIHRoZSB0ZXh0IGxlZnQgb3IgcmlnaHQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGJlZm9yZVxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdFx0ICogQHNpbmNlIDEuNC4zXG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGJlZm9yZSwgbGVuZ3RoKSB7XG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcblxuXHRcdFx0aWYgKCFyYW5nZSkge1xuXHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9XG5cblx0XHRcdHJhbmdlLmNvbGxhcHNlKCFiZWZvcmUpO1xuXG5cdFx0XHRyZXR1cm4gb3V0ZXJUZXh0KHJhbmdlLCBiZWZvcmUsIGxlbmd0aCkudGV4dDtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogUmVwbGFjZXMga2V5d29yZHMgd2l0aCB2YWx1ZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgY2FyZXQgcG9zaXRpb25cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7QXJyYXl9ICAga2V5d29yZHNcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBZnRlciAgICAgIElmIHRvIGluY2x1ZGUgdGhlIHRleHQgYWZ0ZXIgdGhlXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50IGNhcmV0IHBvc2l0aW9uIG9yIGp1c3Rcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgYmVmb3JlXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBrZXl3b3Jkc1NvcnRlZCAgICBJZiB0aGUga2V5d29yZHMgYXJyYXkgaXMgcHJlXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0ZWQgc2hvcnRlc3QgdG8gbG9uZ2VzdFxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyfSAgbG9uZ2VzdEtleXdvcmQgICAgTGVuZ3RoIG9mIHRoZSBsb25nZXN0IGtleXdvcmRcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcXVpcmVXaGl0ZXNwYWNlIElmIHRoZSBrZXkgbXVzdCBiZSBzdXJyb3VuZGVkXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBieSB3aGl0ZXNwYWNlXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9ICBrZXlwcmVzc0NoYXIgICAgICBJZiB0aGlzIGlzIGJlaW5nIGNhbGxlZCBmcm9tXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGtleXByZXNzIGV2ZW50LCB0aGlzIHNob3VsZCBiZVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0IHRvIHRoZSBwcmVzc2VkIGNoYXJhY3RlclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgcmVwbGFjZUtleXdvcmRcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcblx0XHR0aGlzLnJlcGxhY2VLZXl3b3JkID0gZnVuY3Rpb24gKFxuXHRcdFx0a2V5d29yZHMsXG5cdFx0XHRpbmNsdWRlQWZ0ZXIsXG5cdFx0XHRrZXl3b3Jkc1NvcnRlZCxcblx0XHRcdGxvbmdlc3RLZXl3b3JkLFxuXHRcdFx0cmVxdWlyZVdoaXRlc3BhY2UsXG5cdFx0XHRrZXlwcmVzc0NoYXJcblx0XHQpIHtcblx0XHRcdGlmICgha2V5d29yZHNTb3J0ZWQpIHtcblx0XHRcdFx0a2V5d29yZHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0XHRcdHJldHVybiBhWzBdLmxlbmd0aCAtIGJbMF0ubGVuZ3RoO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG91dGVyVGV4dCwgbWF0Y2gsIG1hdGNoUG9zLCBzdGFydEluZGV4LCBsZWZ0TGVuLCBjaGFyc0xlZnQsIGtleXdvcmQsIGtleXdvcmRMZW4sIHdoaXRlc3BhY2VSZWdleCA9ICcoXnxbXFxcXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0pJywga2V5d29yZElkeCA9IGtleXdvcmRzLmxlbmd0aCwgd2hpdGVzcGFjZUxlbiA9IHJlcXVpcmVXaGl0ZXNwYWNlID8gMSA6IDAsIG1heEtleUxlbiA9IGxvbmdlc3RLZXl3b3JkIHx8XG5cdFx0XHRcdGtleXdvcmRzW2tleXdvcmRJZHggLSAxXVswXS5sZW5ndGg7XG5cblx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xuXHRcdFx0XHRtYXhLZXlMZW4rKztcblx0XHRcdH1cblxuXHRcdFx0a2V5cHJlc3NDaGFyID0ga2V5cHJlc3NDaGFyIHx8ICcnO1xuXHRcdFx0b3V0ZXJUZXh0ID0gdGhpcy5nZXRPdXRlclRleHQodHJ1ZSwgbWF4S2V5TGVuKTtcblx0XHRcdGxlZnRMZW4gPSBvdXRlclRleHQubGVuZ3RoO1xuXHRcdFx0b3V0ZXJUZXh0ICs9IGtleXByZXNzQ2hhcjtcblxuXHRcdFx0aWYgKGluY2x1ZGVBZnRlcikge1xuXHRcdFx0XHRvdXRlclRleHQgKz0gdGhpcy5nZXRPdXRlclRleHQoZmFsc2UsIG1heEtleUxlbik7XG5cdFx0XHR9XG5cblx0XHRcdHdoaWxlIChrZXl3b3JkSWR4LS0pIHtcblx0XHRcdFx0a2V5d29yZCA9IGtleXdvcmRzW2tleXdvcmRJZHhdWzBdO1xuXHRcdFx0XHRrZXl3b3JkTGVuID0ga2V5d29yZC5sZW5ndGg7XG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBNYXRoLm1heCgwLCBsZWZ0TGVuIC0ga2V5d29yZExlbiAtIHdoaXRlc3BhY2VMZW4pO1xuXHRcdFx0XHRtYXRjaFBvcyA9IC0xO1xuXG5cdFx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xuXHRcdFx0XHRcdG1hdGNoID0gb3V0ZXJUZXh0XG5cdFx0XHRcdFx0XHQuc3Vic3RyKHN0YXJ0SW5kZXgpXG5cdFx0XHRcdFx0XHQubWF0Y2gobmV3IFJlZ0V4cCh3aGl0ZXNwYWNlUmVnZXggK1xuXHRcdFx0XHRcdFx0XHRlc2NhcGUucmVnZXgoa2V5d29yZCkgKyB3aGl0ZXNwYWNlUmVnZXgpKTtcblxuXHRcdFx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRcdFx0Ly8gQWRkIHRoZSBsZW5ndGggb2YgdGhlIHRleHQgdGhhdCB3YXMgcmVtb3ZlZCBieVxuXHRcdFx0XHRcdFx0Ly8gc3Vic3RyKCkgYW5kIGFsc28gYWRkIDEgZm9yIHRoZSB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0XHRtYXRjaFBvcyA9IG1hdGNoLmluZGV4ICsgc3RhcnRJbmRleCArIG1hdGNoWzFdLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bWF0Y2hQb3MgPSBvdXRlclRleHQuaW5kZXhPZihrZXl3b3JkLCBzdGFydEluZGV4KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChtYXRjaFBvcyA+IC0xKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSBtYXRjaCBpcyBiZXR3ZWVuIGJlZm9yZSBhbmRcblx0XHRcdFx0XHQvLyBhZnRlciwgbm90IGp1c3QgZW50aXJlbHkgaW4gb25lIHNpZGUgb3IgdGhlIG90aGVyXG5cdFx0XHRcdFx0aWYgKG1hdGNoUG9zIDw9IGxlZnRMZW4gJiZcblx0XHRcdFx0XHRcdG1hdGNoUG9zICsga2V5d29yZExlbiArIHdoaXRlc3BhY2VMZW4gPj0gbGVmdExlbikge1xuXHRcdFx0XHRcdFx0Y2hhcnNMZWZ0ID0gbGVmdExlbiAtIG1hdGNoUG9zO1xuXG5cdFx0XHRcdFx0XHQvLyBJZiB0aGUga2V5cHJlc3MgY2hhciBpcyB3aGl0ZSBzcGFjZSB0aGVuIGl0IHNob3VsZFxuXHRcdFx0XHRcdFx0Ly8gbm90IGJlIHJlcGxhY2VkLCBvbmx5IGNoYXJzIHRoYXQgYXJlIHBhcnQgb2YgdGhlXG5cdFx0XHRcdFx0XHQvLyBrZXkgc2hvdWxkIGJlIHJlcGxhY2VkLlxuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3RPdXRlclRleHQoXG5cdFx0XHRcdFx0XHRcdGNoYXJzTGVmdCxcblx0XHRcdFx0XHRcdFx0a2V5d29yZExlbiAtIGNoYXJzTGVmdCAtXG5cdFx0XHRcdFx0XHRcdCgvXlxcUy8udGVzdChrZXlwcmVzc0NoYXIpID8gMSA6IDApXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmluc2VydEhUTUwoa2V5d29yZHNba2V5d29yZElkeF1bMV0pO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogQ29tcGFyZXMgdHdvIHJhbmdlcy5cblx0XHQgKlxuXHRcdCAqIElmIHJhbmdlQiBpcyB1bmRlZmluZWQgaXQgd2lsbCBiZSBzZXQgdG9cblx0XHQgKiB0aGUgY3VycmVudCBzZWxlY3RlZCByYW5nZVxuXHRcdCAqXG5cdFx0ICogQHBhcmFtICB7UmFuZ2V9IHJuZ0Fcblx0XHQgKiBAcGFyYW0gIHtSYW5nZX0gW3JuZ0JdXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cblx0XHQgKiBAZnVuY3Rpb25cblx0XHQgKiBAbmFtZSBjb21wYXJlXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxuXHRcdCAqL1xuXHRcdHRoaXMuY29tcGFyZSA9IGZ1bmN0aW9uIChybmdBLCBybmdCKSB7XG5cdFx0XHRpZiAoIXJuZ0IpIHtcblx0XHRcdFx0cm5nQiA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIXJuZ0EgfHwgIXJuZ0IpIHtcblx0XHRcdFx0cmV0dXJuICFybmdBICYmICFybmdCO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gcm5nQS5jb21wYXJlQm91bmRhcnlQb2ludHMoUmFuZ2UuRU5EX1RPX0VORCwgcm5nQikgPT09IDAgJiZcblx0XHRcdFx0cm5nQS5jb21wYXJlQm91bmRhcnlQb2ludHMoUmFuZ2UuU1RBUlRfVE9fU1RBUlQsIHJuZ0IpID09PSAwO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZW1vdmVzIGFueSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdCAqXG5cdFx0ICogQHNpbmNlIDEuNC42XG5cdFx0ICogQGZ1bmN0aW9uXG5cdFx0ICogQG5hbWUgY2xlYXJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXG5cdFx0ICovXG5cdFx0dGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XG5cblx0XHRcdGlmIChzZWwpIHtcblx0XHRcdFx0aWYgKHNlbC5yZW1vdmVBbGxSYW5nZXMpIHtcblx0XHRcdFx0XHRzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoc2VsLmVtcHR5KSB7XG5cdFx0XHRcdFx0c2VsLmVtcHR5KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9XG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcblxuXG4vKipcbiAqIEhUTUwgdGVtcGxhdGVzIHVzZWQgYnkgdGhlIGVkaXRvciBhbmQgZGVmYXVsdCBjb21tYW5kc1xuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBfdGVtcGxhdGVzID0ge1xuXHRodG1sOlxuXHRcdCc8IURPQ1RZUEUgaHRtbD4nICtcblx0XHQnPGh0bWx7YXR0cnN9PicgK1xuXHRcdFx0JzxoZWFkPicgK1xuXHRcdFx0XHQnPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiICcgK1xuXHRcdFx0XHRcdCdjb250ZW50PVwidGV4dC9odG1sO2NoYXJzZXQ9e2NoYXJzZXR9XCIgLz4nICtcblx0XHRcdFx0JzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwie3N0eWxlfVwiIC8+JyArXG5cdFx0XHQnPC9oZWFkPicgK1xuXHRcdFx0Jzxib2R5IGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiB7c3BlbGxjaGVja30+PHA+PC9wPjwvYm9keT4nICtcblx0XHQnPC9odG1sPicsXG5cblx0dG9vbGJhckJ1dHRvbjogJzxhIGNsYXNzPVwiZW1sZWRpdG9yLWJ1dHRvbiBlbWxlZGl0b3ItYnV0dG9uLXtuYW1lfVwiICcgK1xuXHRcdCdkYXRhLWVtbGVkaXRvci1jb21tYW5kPVwie25hbWV9XCIgdW5zZWxlY3RhYmxlPVwib25cIj4nICtcblx0XHQnPGRpdiB1bnNlbGVjdGFibGU9XCJvblwiPntkaXNwTmFtZX08L2Rpdj48L2E+JyxcblxuXHRlbW90aWNvbjogJzxpbWcgc3JjPVwie3VybH1cIiBkYXRhLWVtbGVkaXRvci1lbW90aWNvbj1cIntrZXl9XCIgJyArXG5cdFx0J2FsdD1cIntrZXl9XCIgdGl0bGU9XCJ7dG9vbHRpcH1cIiAvPicsXG5cblx0Zm9udE9wdDogJzxhIGNsYXNzPVwiZW1sZWRpdG9yLWZvbnQtb3B0aW9uXCIgaHJlZj1cIiNcIiAnICtcblx0XHQnZGF0YS1mb250PVwie2ZvbnR9XCI+PGZvbnQgZmFjZT1cIntmb250fVwiPntmb250fTwvZm9udD48L2E+JyxcblxuXHRzaXplT3B0OiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItZm9udHNpemUtb3B0aW9uXCIgZGF0YS1zaXplPVwie3NpemV9XCIgJyArXG5cdFx0J2hyZWY9XCIjXCI+PGZvbnQgc2l6ZT1cIntzaXplfVwiPntzaXplfTwvZm9udD48L2E+JyxcblxuXHRwYXN0ZXRleHQ6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInR4dFwiPntsYWJlbH08L2xhYmVsPiAnICtcblx0XHRcdCc8dGV4dGFyZWEgY29scz1cIjIwXCIgcm93cz1cIjdcIiBpZD1cInR4dFwiPjwvdGV4dGFyZWE+PC9kaXY+JyArXG5cdFx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0JzwvZGl2PicsXG5cblx0dGFibGU6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInJvd3NcIj57cm93c308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xuXHRcdFx0J2lkPVwicm93c1wiIHZhbHVlPVwiMlwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImNvbHNcIj57Y29sc308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xuXHRcdFx0J2lkPVwiY29sc1wiIHZhbHVlPVwiMlwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIicgK1xuXHRcdFx0JyAvPjwvZGl2PicsXG5cblx0aW1hZ2U6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImltYWdlXCI+e3VybH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImltYWdlXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cIndpZHRoXCI+e3dpZHRofTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwid2lkdGhcIiBzaXplPVwiMlwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImhlaWdodFwiPntoZWlnaHR9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJoZWlnaHRcIiBzaXplPVwiMlwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xuXHRcdFx0JzwvZGl2PicsXG5cblx0ZW1haWw6XG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImVtYWlsXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZW1haWxcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJkZXNcIj57ZGVzY308L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xuXHRcdFx0JzwvZGl2PicsXG5cblx0bGluazpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPnt1cmx9PC9sYWJlbD4gJyArXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImRlc1wiPntkZXNjfTwvbGFiZWw+ICcgK1xuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zfVwiIC8+PC9kaXY+JyxcblxuXHR5b3V0dWJlTWVudTpcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPntsYWJlbH08L2xhYmVsPiAnICtcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpbmtcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXG5cdFx0XHQnPC9kaXY+JyxcblxuXHR5b3V0dWJlOlxuXHRcdCc8aWZyYW1lIHdpZHRoPVwiNTYwXCIgaGVpZ2h0PVwiMzE1XCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuICcgK1xuXHRcdCdzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC97aWR9P3dtb2RlPW9wYXF1ZSZzdGFydD17dGltZX1cIiAnICtcblx0XHQnZGF0YS15b3V0dWJlLWlkPVwie2lkfVwiPjwvaWZyYW1lPidcbn07XG5cbi8qKlxuICogUmVwbGFjZXMgYW55IHBhcmFtcyBpbiBhIHRlbXBsYXRlIHdpdGggdGhlIHBhc3NlZCBwYXJhbXMuXG4gKlxuICogSWYgY3JlYXRlSHRtbCBpcyBwYXNzZWQgaXQgd2lsbCByZXR1cm4gYSBEb2N1bWVudEZyYWdtZW50XG4gKiBjb250YWluaW5nIHRoZSBwYXJzZWQgdGVtcGxhdGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxuICogQHBhcmFtIHtib29sZWFufSBbY3JlYXRlSHRtbF1cbiAqIEByZXR1cm5zIHtzdHJpbmd8RG9jdW1lbnRGcmFnbWVudH1cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChuYW1lLCBwYXJhbXMsIGNyZWF0ZUh0bWwpIHtcblx0dmFyIHRlbXBsYXRlID0gX3RlbXBsYXRlc1tuYW1lXTtcblxuXHRPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcblx0XHR0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoXG5cdFx0XHRuZXcgUmVnRXhwKGVzY2FwZS5yZWdleCgneycgKyBuYW1lICsgJ30nKSwgJ2cnKSwgcGFyYW1zW25hbWVdXG5cdFx0KTtcblx0fSk7XG5cblx0aWYgKGNyZWF0ZUh0bWwpIHtcblx0XHR0ZW1wbGF0ZSA9IGRvbS5wYXJzZUhUTUwodGVtcGxhdGUpO1xuXHR9XG5cblx0cmV0dXJuIHRlbXBsYXRlO1xufVxuIiwiLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgdGhlXHJcbiAqIHRoZSBwYXNzZWQgdHlwZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHsqfSBhcmdcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc1R5cGVvZih0eXBlLCBhcmcpIHtcclxuXHRyZXR1cm4gdHlwZW9mIGFyZyA9PT0gdHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNTdHJpbmcgPSBpc1R5cGVvZi5iaW5kKG51bGwsICdzdHJpbmcnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzVW5kZWZpbmVkID0gaXNUeXBlb2YuYmluZChudWxsLCAndW5kZWZpbmVkJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc0Z1bmN0aW9uID0gaXNUeXBlb2YuYmluZChudWxsLCAnZnVuY3Rpb24nKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzTnVtYmVyID0gaXNUeXBlb2YuYmluZChudWxsLCAnbnVtYmVyJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBvYmplY3QgaGFzIG5vIGtleXNcclxuICpcclxuICogQHBhcmFtIHshT2JqZWN0fSBvYmpcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmopIHtcclxuXHRyZXR1cm4gIU9iamVjdC5rZXlzKG9iaikubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogRXh0ZW5kcyB0aGUgZmlyc3Qgb2JqZWN0IHdpdGggYW55IGV4dHJhIG9iamVjdHMgcGFzc2VkXHJcbiAqXHJcbiAqIElmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBib29sZWFuIGFuZCBzZXQgdG8gdHJ1ZVxyXG4gKiBpdCB3aWxsIGV4dGVuZCBjaGlsZCBhcnJheXMgYW5kIG9iamVjdHMgcmVjdXJzaXZlbHkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdHxib29sZWFufSB0YXJnZXRBcmdcclxuICogQHBhcmFtIHsuLi5PYmplY3R9IHNvdXJjZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHRhcmdldEFyZywgc291cmNlQXJnKSB7XHJcblx0dmFyIGlzVGFyZ2V0Qm9vbGVhbiA9IHRhcmdldEFyZyA9PT0gISF0YXJnZXRBcmc7XHJcblx0dmFyIGkgICAgICA9IGlzVGFyZ2V0Qm9vbGVhbiA/IDIgOiAxO1xyXG5cdHZhciB0YXJnZXQgPSBpc1RhcmdldEJvb2xlYW4gPyBzb3VyY2VBcmcgOiB0YXJnZXRBcmc7XHJcblx0dmFyIGlzRGVlcCA9IGlzVGFyZ2V0Qm9vbGVhbiA/IHRhcmdldEFyZyA6IGZhbHNlO1xyXG5cclxuXHRmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcclxuXHRcdFx0T2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcclxuXHR9XHJcblxyXG5cdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xyXG5cclxuXHRcdC8vIENvcHkgYWxsIHByb3BlcnRpZXMgZm9yIGpRdWVyeSBjb21wYXRpYmlsaXR5XHJcblx0XHQvKiBlc2xpbnQgZ3VhcmQtZm9yLWluOiBvZmYgKi9cclxuXHRcdGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuXHRcdFx0dmFyIHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XHJcblx0XHRcdHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdFx0Ly8gU2tpcCB1bmRlZmluZWQgdmFsdWVzIHRvIG1hdGNoIGpRdWVyeVxyXG5cdFx0XHRpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNraXAgc3BlY2lhbCBrZXlzIHRvIHByZXZlbnQgcHJvdG90eXBlIHBvbGx1dGlvblxyXG5cdFx0XHRpZiAoa2V5ID09PSAnX19wcm90b19fJyB8fCBrZXkgPT09ICdjb25zdHJ1Y3RvcicpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGlzVmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSk7XHJcblx0XHRcdHZhciBpc1ZhbHVlQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcclxuXHJcblx0XHRcdGlmIChpc0RlZXAgJiYgKGlzVmFsdWVPYmplY3QgfHwgaXNWYWx1ZUFycmF5KSkge1xyXG5cdFx0XHRcdC8vIENhbiBvbmx5IG1lcmdlIGlmIHRhcmdldCB0eXBlIG1hdGNoZXMgb3RoZXJ3aXNlIGNyZWF0ZVxyXG5cdFx0XHRcdC8vIG5ldyB0YXJnZXQgdG8gbWVyZ2UgaW50b1xyXG5cdFx0XHRcdHZhciBpc1NhbWVUeXBlID0gaXNPYmplY3QodGFyZ2V0VmFsdWUpID09PSBpc1ZhbHVlT2JqZWN0ICYmXHJcblx0XHRcdFx0XHRBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSA9PT0gaXNWYWx1ZUFycmF5O1xyXG5cclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGV4dGVuZChcclxuXHRcdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0XHRpc1NhbWVUeXBlID8gdGFyZ2V0VmFsdWUgOiAoaXNWYWx1ZUFycmF5ID8gW10gOiB7fSksXHJcblx0XHRcdFx0XHR2YWx1ZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBwYXNzZWQgYXJyYXlcclxuICpcclxuICogQHBhcmFtIHshQXJyYXl9IGFyclxyXG4gKiBAcGFyYW0geyp9IGl0ZW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIGl0ZW0pIHtcclxuXHR2YXIgaSA9IGFyci5pbmRleE9mKGl0ZW0pO1xyXG5cclxuXHRpZiAoaSA+IC0xKSB7XHJcblx0XHRhcnIuc3BsaWNlKGksIDEpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGVzIG92ZXIgYW4gYXJyYXkgb3Igb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdHxBcnJheX0gb2JqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgKil9IGZuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZWFjaChvYmosIGZuKSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSB8fCAnbGVuZ3RoJyBpbiBvYmogJiYgaXNOdW1iZXIob2JqLmxlbmd0aCkpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGZuKGksIG9ialtpXSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRcdGZuKGtleSwgb2JqW2tleV0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1sRWRpdG9yIGZyb20gJy4vbGliL0VtbEVkaXRvci5qcyc7XG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi9saWIvcGx1Z2luTWFuYWdlcic7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9saWIvZXNjYXBlLmpzJztcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9saWIvYnJvd3Nlci5qcyc7XG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9saWIvZG9tLmpzJztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vbGliL3V0aWxzLmpzJztcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9saWIvZGVmYXVsdENvbW1hbmRzLmpzJztcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2xpYi9kZWZhdWx0T3B0aW9ucy5qcyc7XG5pbXBvcnQgJy4vdGhlbWVzL3NxdWFyZS5sZXNzJztcblxuZGVjbGFyZSBnbG9iYWwge1xuXHRpbnRlcmZhY2UgV2luZG93IHtcblx0XHRlbWxFZGl0b3I6IElFZGl0b3I7XG5cdH1cbn1cblxuaW50ZXJmYWNlIElFZGl0b3Ige1xuXHRjb21tYW5kOiBPYmplY3Q7XG5cdGxvY2FsZTogT2JqZWN0O1xuXHRpY29uczogT2JqZWN0O1xuXHRmb3JtYXRzOiBPYmplY3Q7XG5cdGNvbW1hbmRzOiBPYmplY3Q7XG5cdGRlZmF1bHRPcHRpb25zOiBPYmplY3Q7XG5cdGlvczogYm9vbGVhbjtcblx0aXNXeXNpd3lnU3VwcG9ydGVkOiBib29sZWFuO1xuXHRyZWdleEVzY2FwZShzdHI6IHN0cmluZyk6IHN0cmluZztcblx0ZXNjYXBlRW50aXRpZXMoc3RyOiBzdHJpbmcsIG5vUXVvdGVzOiBib29sZWFuIHwgbnVsbCk6IHN0cmluZztcblx0ZXNjYXBlVXJpU2NoZW1lKHVybDogc3RyaW5nKTogc3RyaW5nO1xuXHRkb206IE9iamVjdDtcblx0dXRpbHM6IE9iamVjdDtcblx0cGx1Z2luczogT2JqZWN0O1xuXHRjcmVhdGUodGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQsIG9wdGlvbnM6IE9iamVjdCk6IHZvaWQ7XG5cdGluc3RhbmNlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50KTogSUVkaXRvcjtcbn1cblxud2luZG93LmVtbEVkaXRvciA9IHtcblx0Y29tbWFuZDogRW1sRWRpdG9yLmNvbW1hbmQsXG5cdGxvY2FsZTogRW1sRWRpdG9yLmxvY2FsZSxcblx0aWNvbnM6IEVtbEVkaXRvci5pY29ucyxcblx0Zm9ybWF0czogRW1sRWRpdG9yLmZvcm1hdHMsXG5cblx0Y29tbWFuZHM6IGRlZmF1bHRDb21tYW5kcyxcblx0ZGVmYXVsdE9wdGlvbnM6IGRlZmF1bHRPcHRpb25zLFxuXHRpb3M6IGJyb3dzZXIuaW9zLFxuXHRpc1d5c2l3eWdTdXBwb3J0ZWQ6IGJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkLFxuXHRyZWdleEVzY2FwZTogZXNjYXBlLnJlZ2V4LFxuXHRlc2NhcGVFbnRpdGllczogZXNjYXBlLmVudGl0aWVzLFxuXHRlc2NhcGVVcmlTY2hlbWU6IGVzY2FwZS51cmlTY2hlbWUsXG5cblx0ZG9tOiB7XG5cdFx0Y3NzOiBkb20uY3NzLFxuXHRcdGF0dHI6IGRvbS5hdHRyLFxuXHRcdHJlbW92ZUF0dHI6IGRvbS5yZW1vdmVBdHRyLFxuXHRcdGlzOiBkb20uaXMsXG5cdFx0Y2xvc2VzdDogZG9tLmNsb3Nlc3QsXG5cdFx0d2lkdGg6IGRvbS53aWR0aCxcblx0XHRoZWlnaHQ6IGRvbS5oZWlnaHQsXG5cdFx0dHJhdmVyc2U6IGRvbS50cmF2ZXJzZSxcblx0XHRyVHJhdmVyc2U6IGRvbS5yVHJhdmVyc2UsXG5cdFx0cGFyc2VIVE1MOiBkb20ucGFyc2VIVE1MLFxuXHRcdGhhc1N0eWxpbmc6IGRvbS5oYXNTdHlsaW5nLFxuXHRcdGNvbnZlcnRFbGVtZW50OiBkb20uY29udmVydEVsZW1lbnQsXG5cdFx0YmxvY2tMZXZlbExpc3Q6IGRvbS5ibG9ja0xldmVsTGlzdCxcblx0XHRjYW5IYXZlQ2hpbGRyZW46IGRvbS5jYW5IYXZlQ2hpbGRyZW4sXG5cdFx0aXNJbmxpbmU6IGRvbS5pc0lubGluZSxcblx0XHRjb3B5Q1NTOiBkb20uY29weUNTUyxcblx0XHRmaXhOZXN0aW5nOiBkb20uZml4TmVzdGluZyxcblx0XHRmaW5kQ29tbW9uQW5jZXN0b3I6IGRvbS5maW5kQ29tbW9uQW5jZXN0b3IsXG5cdFx0Z2V0U2libGluZzogZG9tLmdldFNpYmxpbmcsXG5cdFx0cmVtb3ZlV2hpdGVTcGFjZTogZG9tLnJlbW92ZVdoaXRlU3BhY2UsXG5cdFx0ZXh0cmFjdENvbnRlbnRzOiBkb20uZXh0cmFjdENvbnRlbnRzLFxuXHRcdGdldE9mZnNldDogZG9tLmdldE9mZnNldCxcblx0XHRnZXRTdHlsZTogZG9tLmdldFN0eWxlLFxuXHRcdGhhc1N0eWxlOiBkb20uaGFzU3R5bGVcblx0fSxcblxuXHR1dGlsczoge1xuXHRcdGVhY2g6IHV0aWxzLmVhY2gsXG5cdFx0aXNFbXB0eU9iamVjdDogdXRpbHMuaXNFbXB0eU9iamVjdCxcblx0XHRleHRlbmQ6IHV0aWxzLmV4dGVuZFxuXHR9LFxuXG5cdHBsdWdpbnM6IFBsdWdpbk1hbmFnZXIucGx1Z2lucyxcblxuXHRjcmVhdGU6IGZ1bmN0aW9uICh0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCwgb3B0aW9uczogYW55KSB7XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHQvLyBEb24ndCBhbGxvdyB0aGUgZWRpdG9yIHRvIGJlIGluaXRpYWxpc2VkXG5cdFx0Ly8gb24gaXQncyBvd24gc291cmNlIGVkaXRvclxuXHRcdGlmIChkb20ucGFyZW50KHRleHRhcmVhLCAnLmVtbGVkaXRvci1jb250YWluZXInKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChvcHRpb25zLnJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydCB8fCBicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCkge1xuXHRcdFx0Lyplc2xpbnQgbm8tbmV3OiBvZmYqL1xuXHRcdFx0KG5ldyBFbWxFZGl0b3IodGV4dGFyZWEsIG9wdGlvbnMpKTtcblx0XHR9XG5cdH0sXG5cblx0aW5zdGFuY2U6IGZ1bmN0aW9uICh0ZXh0YXJlYTogYW55KSB7XG5cdFx0cmV0dXJuIHRleHRhcmVhLl9zY2VkaXRvcjtcblx0fVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==