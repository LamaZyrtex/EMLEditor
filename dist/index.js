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
    _utils_js__WEBPACK_IMPORTED_MODULE_0__.each(attributes || {}, function (key, value) {
        if (key == 'style') {
            htmlElement.style.cssText = value;
        }
        else if (htmlElement.nodeType == ELEMENT_NODE && key in htmlElement) {
            let attribute = htmlElement[key];
            attribute = value;
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
    }
    else {
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
    return refNode.parentNode.insertBefore(node, refNode);
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
    let tmpFirstChild = tmp.firstChild;
    while (tmpFirstChild) {
        appendChild(ret, tmpFirstChild);
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
        }
        catch (ex) { /* empty */ }
    });
    let elementFirstChild = element.firstChild;
    while (element.firstChild) {
        appendChild(newElement, elementFirstChild);
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
            let lastInlineParentNode = lastInlineParent.parentNode;
            while (isInline(lastInlineParentNode, true) ||
                lastInlineParentNode.tagName === 'P') {
                lastInlineParent = lastInlineParent.parentNode;
            }
            let before = extractContents(lastInlineParent, node);
            let middle = node;
            // Clone inline styling and apply it to the blocks children
            while (parent && isInline(parent, true)) {
                if (parent.nodeType === ELEMENT_NODE) {
                    let clone = parent.cloneNode();
                    let middleFirstChild = middle.firstChild;
                    while (middleFirstChild) {
                        appendChild(clone, middleFirstChild);
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
    let nodeFirstChild = node.firstChild;
    while (nodeFirstChild) {
        insertBefore(nodeFirstChild, node);
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
/* harmony import */ var _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defaultCommands.js */ "./src/lib/defaultCommands.js");
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
                    e = globalWin.event;
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                }
                else {
                    startX = e.pageX;
                    startY = e.pageY;
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
        this.commands = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(true, {}, (userOptions.commands || _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
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
        return _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][n] || null;
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
        cmd = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(_defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name] || {}, cmd);
        cmd.remove = () => {
            _a.command.remove(name);
        };
        _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name] = cmd;
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
        if (_defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name]) {
            delete _defaultCommands_js__WEBPACK_IMPORTED_MODULE_3__["default"][name];
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
			var	content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

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
			var	content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

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
			var	content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
				html    = '',
				cmd     = defaultCmds.color;

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
			var	val,
				content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
				editor  = this;

			_dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('pastetext', {
				label: editor.translate(
					'Paste your text inside the following box:'
				),
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
			var	range, startParent, endParent;

			if (_dom__WEBPACK_IMPORTED_MODULE_0__.is(firstBlock, 'li')) {
				return 0;
			}

			if (_dom__WEBPACK_IMPORTED_MODULE_0__.is(firstBlock, 'ul,ol,menu')) {
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
					(_dom__WEBPACK_IMPORTED_MODULE_0__.is(endParent, 'li') && endParent !==
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
			var	block = this.getRangeHelper().getFirstBlockParent();
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
			var	editor  = this,
				content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('table', {
				rows: editor.translate('Rows:'),
				cols: editor.translate('Cols:'),
				insert: editor.translate('Insert')
			}, true));

			_dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				var	rows = Number(_dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#rows')[0].value),
					cols = Number(_dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#cols')[0].value),
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
			var	content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('image', {
				url: editor.translate('URL:'),
				width: editor.translate('Width (optional):'),
				height: editor.translate('Height (optional):'),
				insert: editor.translate('Insert')
			}, true));


			var	urlInput = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#image')[0];

			urlInput.value = selected;

			_dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				if (urlInput.value) {
					cb(
						urlInput.value,
						_dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#width')[0].value,
						_dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#height')[0].value
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
			var	content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('email', {
				label: editor.translate('E-mail:'),
				desc: editor.translate('Description (optional):'),
				insert: editor.translate('Insert')
			}, true));

			_dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', function (e) {
				var email = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#email')[0].value;

				if (email) {
					cb(email, _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#des')[0].value);
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
			var content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

			_dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, (0,_templates_js__WEBPACK_IMPORTED_MODULE_3__["default"])('link', {
				url: editor.translate('URL:'),
				desc: editor.translate('Description (optional):'),
				ins: editor.translate('Insert')
			}, true));

			var linkInput = _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#link')[0];

			function insertUrl(e) {
				if (linkInput.value) {
					cb(linkInput.value, _dom__WEBPACK_IMPORTED_MODULE_0__.find(content, '#des')[0].value);
				}

				editor.closeDropDown(true);
				e.preventDefault();
			}

			_dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', '.button', insertUrl);
			_dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'keypress', null,  function (e) {
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
					opts            = editor.editorOptions,
					emoticonsRoot   = opts.emoticonsRoot || '',
					emoticonsCompat = opts.emoticonsCompat,
					rangeHelper     = editor.getRangeHelper(),
					startSpace      = emoticonsCompat &&
						rangeHelper.getOuterText(true, 1) !== ' ' ? ' ' : '',
					endSpace        = emoticonsCompat &&
						rangeHelper.getOuterText(false, 1) !== ' ' ? ' ' : '',
					content         = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
					line            = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div'),
					perLine         = 0,
					emoticons       = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend(
						{},
						opts.emoticons.dropdown,
						includeMore ? opts.emoticons.more : {}
					);

				_dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(content, line);

				perLine = Math.sqrt(Object.keys(emoticons).length);

				_dom__WEBPACK_IMPORTED_MODULE_0__.on(content, 'click', 'img', function (e) {
					editor.insert(startSpace + _dom__WEBPACK_IMPORTED_MODULE_0__.attr(this, 'alt') + endSpace,
						null, false).closeDropDown(true);

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

					_dom__WEBPACK_IMPORTED_MODULE_0__.appendChild(moreLink,
						document.createTextNode(editor.translate('More')));

					_dom__WEBPACK_IMPORTED_MODULE_0__.on(moreLink, 'click', null, function (e) {
						editor.createDropDown(
							caller, 'more-emoticons', createContent(true)
						);

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
			var	content = _dom__WEBPACK_IMPORTED_MODULE_0__.createElement('div');

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

			return editor.editorOptions.dateFormat
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

			if (!node || _dom__WEBPACK_IMPORTED_MODULE_0__.is(node, 'body')) {
				editor.execCommand('formatBlock', 'p');

				node  = rangeHelper.getFirstBlockParent();

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
			var	editor = this,
				rangeHelper = editor.getRangeHelper(),
				node = rangeHelper.getFirstBlockParent();

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
/* harmony import */ var _lib_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/dom */ "./src/lib/dom.ts");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUN2K0NBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQW9DO0FBRXBDOzs7R0FHRztBQUNILElBQUksb0JBQW9CLEdBQTZCLEVBQUUsQ0FBQztBQUV4RDs7OztHQUlHO0FBQ0ksTUFBTSxZQUFZLEdBQVcsQ0FBQyxDQUFDO0FBRXRDOzs7O0dBSUc7QUFDSSxNQUFNLFNBQVMsR0FBVyxDQUFDLENBQUM7QUFFbkM7Ozs7R0FJRztBQUNJLE1BQU0sWUFBWSxHQUFXLENBQUMsQ0FBQztBQUV0Qzs7OztHQUlHO0FBQ0ksTUFBTSxhQUFhLEdBQVcsQ0FBQyxDQUFDO0FBRXZDOzs7O0dBSUc7QUFDSSxNQUFNLHNCQUFzQixHQUFXLEVBQUUsQ0FBQztBQUVqRCxTQUFTLE9BQU8sQ0FBQyxLQUFVO0lBQzFCLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFMUIsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0ksU0FBUyxhQUFhLENBQUMsR0FBVyxFQUFFLFVBQXFDLEVBQUUsT0FBa0I7SUFDbkcsSUFBSSxXQUFXLEdBQUcsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTNELDJDQUFVLENBQUMsVUFBVSxJQUFJLEVBQUUsRUFBRSxVQUFVLEdBQXNCLEVBQUUsS0FBVTtRQUN4RSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNwQixXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFlLENBQUM7UUFDN0MsQ0FBQzthQUNJLElBQUksV0FBVyxDQUFDLFFBQVEsSUFBSSxZQUFZLElBQUksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ3JFLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ25CLENBQUM7YUFDSSxDQUFDO1lBQ0wsV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEMsQ0FBQztJQUNGLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUM7QUFDcEIsQ0FBQztBQUlEOzs7Ozs7R0FNRztBQUNJLFNBQVMsT0FBTyxDQUFDLElBQWlCLEVBQUUsUUFBZ0I7SUFDMUQsSUFBSSxPQUFPLEdBQUcsRUFBd0IsQ0FBQztJQUN2QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFFbEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBeUIsQ0FBQztXQUM5QyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0YsQ0FBQztJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSSxTQUFTLE1BQU0sQ0FBQyxJQUFpQixFQUFFLFFBQWdCO0lBQ3pELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztJQUVsQixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUF5QixDQUFDO1dBQzlDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUN2QyxPQUFPLE1BQU0sQ0FBQztRQUNmLENBQUM7SUFDRixDQUFDO0FBQ0YsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSSxTQUFTLE9BQU8sQ0FBQyxJQUFpQixFQUFFLFFBQWdCO0lBQzFELE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxNQUFNLENBQUMsSUFBaUI7SUFDdkMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLFNBQVMsV0FBVyxDQUFDLElBQW9DLEVBQUUsS0FBNEM7SUFDN0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxJQUFJLENBQUMsSUFBNEIsRUFBRSxRQUFnQjtJQUNsRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxJQUFJLGFBQWEsR0FBWSxJQUFJLENBQUM7QUFFekM7Ozs7O0dBS0c7QUFDSSxJQUFJLFlBQVksR0FBWSxLQUFLLENBQUM7QUFFekM7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxzQ0FBc0M7QUFDL0IsU0FBUyxFQUFFLENBQUMsSUFBMkQsRUFBRSxNQUFjLEVBQUUsUUFBZ0IsRUFBRSxFQUFPLEVBQUUsVUFBbUIsS0FBSztJQUNsSixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUs7UUFDeEMsSUFBSSxPQUFPLENBQUM7UUFFWixJQUFJLCtDQUFjLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUM5QixPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFNO2dCQUNqRSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUN0QixPQUFPLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ2xDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUMxQixFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsT0FBTztvQkFDUixDQUFDO29CQUVELE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUM1QixDQUFDO1lBQ0YsQ0FBQyxDQUFDO1lBRUYsRUFBRSxDQUFDLGFBQWEsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2hELENBQUM7YUFBTSxDQUFDO1lBQ1AsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsc0NBQXNDO0FBQy9CLFNBQVMsR0FBRyxDQUFDLElBQWlDLEVBQUUsTUFBYyxFQUFFLFFBQWdCLEVBQUUsRUFBeUIsRUFBRSxVQUFtQixLQUFLO0lBQzNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsS0FBSztRQUN4QyxJQUFJLE9BQU8sQ0FBQztRQUVaLElBQUksK0NBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUksR0FBRyxHQUFHLGFBQWEsR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDO1lBQzNDLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBc0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7YUFBTSxDQUFDO1lBQ1AsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7SUFDNUQsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSSxTQUFTLElBQUksQ0FBQyxJQUFpQixFQUFFLElBQVksRUFBRSxLQUFjO0lBQ25FLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELDhDQUE4QztJQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDWixVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7U0FBTSxDQUFDO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLFNBQVMsVUFBVSxDQUFDLElBQWlCLEVBQUUsSUFBWTtJQUN6RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxJQUFJLENBQUMsSUFBaUI7SUFDckMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLElBQUksQ0FBQyxJQUFTO0lBQzdCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxNQUFNLENBQUMsSUFBUztJQUMvQixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7U0FBTSxDQUFDO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztBQUNGLENBQUM7QUFFRDs7Ozs7Ozs7OztHQVVHO0FBQ0ksU0FBUyxHQUFHLENBQUMsSUFBUyxFQUFFLElBQVMsRUFBRSxLQUFXO0lBQ3BELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUMxQixJQUFJLCtDQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMxQixPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xFLENBQUM7UUFFRCwyQ0FBVSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRSxLQUFLO1lBQ3BDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDUCx3REFBd0Q7UUFDeEQsb0NBQW9DO1FBQ3BDLElBQUksU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3JELENBQUM7QUFDRixDQUFDO0FBR0Q7Ozs7Ozs7Ozs7O0dBV0c7QUFDSSxTQUFTLElBQUksQ0FBQyxJQUFTLEVBQUUsR0FBUyxFQUFFLEtBQVc7SUFDckQsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7SUFFbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQ3BDLElBQUksVUFBVSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RCLDJDQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJO2dCQUM1QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQy9CLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBc0IsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELElBQUksVUFBVSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0FBQ0YsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNJLFNBQVMsRUFBRSxDQUFDLElBQWlCLEVBQUUsUUFBZ0I7SUFDckQsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFLENBQUM7UUFDNUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQztBQUdEOzs7Ozs7Ozs7R0FTRztBQUNJLFNBQVMsUUFBUSxDQUFDLElBQVUsRUFBRSxLQUFrQjtJQUN0RCxPQUFPLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxzQkFBc0IsQ0FBQyxJQUFpQixFQUFFLFFBQWlCO0lBQzFFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxzQkFBcUMsQ0FBQztJQUV0RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxZQUFZLENBQUMsSUFBb0MsRUFBRSxPQUFnQjtJQUNsRixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxPQUFPLENBQUMsSUFBaUI7SUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsT0FBTyxRQUFRLENBQUM7QUFDakIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxJQUFpQixFQUFFLFNBQWlCO0lBQzVELE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVEOzs7R0FHRztBQUNJLFNBQVMsUUFBUSxDQUFDLElBQWlCLEVBQUUsU0FBaUI7SUFDNUQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUN0QyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVEOzs7R0FHRztBQUNJLFNBQVMsV0FBVyxDQUFDLElBQWlCLEVBQUUsU0FBaUI7SUFDL0QsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLGtEQUFpQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNJLFNBQVMsV0FBVyxDQUFDLElBQWlCLEVBQUUsU0FBaUIsRUFBRSxLQUFlO0lBQ2hGLEtBQUssR0FBRyxrREFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFFdEUsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNYLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0IsQ0FBQztTQUFNLENBQUM7UUFDUCxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxLQUFLLENBQUMsSUFBaUIsRUFBRSxLQUF1QjtJQUMvRCxJQUFJLGtEQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXhFLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzVDLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxNQUFNLENBQUMsSUFBaUIsRUFBRSxLQUF1QjtJQUNoRSxJQUFJLGtEQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDOUIsSUFBSSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXhFLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzdDLENBQUM7SUFFRCxHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNJLFNBQVMsT0FBTyxDQUFDLElBQWlCLEVBQUUsU0FBaUIsRUFBRSxJQUFVO0lBQ3ZFLElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxpREFBZ0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztRQUMxQyxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxJQUFJO1lBQ2IsVUFBVSxFQUFFLElBQUk7WUFDaEIsTUFBTSxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7SUFDSixDQUFDO1NBQU0sQ0FBQztRQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN0RCxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNJLFNBQVMsU0FBUyxDQUFDLElBQWlCO0lBQzFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDdkMsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBUyxTQUFTLENBQUMsR0FBVztJQUM3QixPQUFPLEdBQUc7U0FDUixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztTQUN2QixPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVUsS0FBSyxFQUFFLElBQUk7UUFDdkMsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBR0Q7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILHNDQUFzQztBQUMvQixTQUFTLFFBQVEsQ0FBQyxJQUFTLEVBQUUsSUFBZ0MsRUFBRSxjQUF3QixFQUFFLFlBQXNCLEVBQUUsVUFBbUIsS0FBSztJQUMvSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBRWxELE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFN0QsSUFDQyxDQUFDLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUM7WUFDekMsQ0FBQyxDQUFDLFlBQVksSUFBSSxRQUFRLENBQ3pCLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxPQUFPLENBQ2pELEtBQUssS0FBSyxDQUFDO1lBQ1osQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUN2QyxDQUFDO1lBQ0YsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNiLENBQUM7QUFDRixDQUFDO0FBRUQ7OztHQUdHO0FBQ0ksU0FBUyxTQUFTLENBQUMsSUFBUyxFQUFFLElBQTZCLEVBQUUsY0FBd0IsRUFBRSxZQUFzQjtJQUNuSCxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0ksU0FBUyxTQUFTLENBQUMsSUFBWSxFQUFFLE9BQWtCO0lBQ3pELE9BQU8sR0FBRyxPQUFPLElBQUksUUFBUSxDQUFDO0lBRTlCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQzNDLElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXJCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxVQUF5QjtJQUNqRCxPQUFPLGFBQWEsRUFBRSxDQUFDO1FBQ3RCLFdBQVcsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ1osQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNJLFNBQVMsVUFBVSxDQUFDLElBQWlCO0lBQzNDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTO1FBQ25ELElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxvREFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSSxTQUFTLGNBQWMsQ0FBQyxPQUFvQixFQUFFLFNBQWlCO0lBQ3JFLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVyRSwyQ0FBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsU0FBUztRQUNwRCxvREFBb0Q7UUFDcEQsbURBQW1EO1FBQ25ELGdCQUFnQjtRQUNoQixJQUFJLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxVQUF5QixDQUFDO0lBQzFELE9BQU8sT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLFdBQVcsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXJELE9BQU8sVUFBVSxDQUFDO0FBQ25CLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksSUFBSSxjQUFjLEdBQVcsK0NBQStDO0lBQ2xGLG1FQUFtRTtJQUNuRSx1RUFBdUU7SUFDdkUsNkJBQTZCLENBQUM7QUFFL0I7Ozs7OztHQU1HO0FBQ0ksU0FBUyxlQUFlLENBQUMsSUFBeUQ7SUFDeEYsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQix5QkFBeUI7SUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDN0MsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsMERBQTBEO0lBQzFELHlEQUF5RDtJQUN6RCwrREFBK0Q7SUFDL0QsT0FBTyxDQUFDLDBEQUEwRDtRQUNqRSw2REFBNkQ7UUFDN0QsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxRQUFRLENBQUMsR0FBc0IsRUFBRSxxQkFBOEIsS0FBSztJQUNuRixJQUFJLE9BQU8sRUFDVixRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQztJQUU5QyxJQUFJLFFBQVEsS0FBSyxZQUFZLEVBQUUsQ0FBQztRQUMvQixPQUFPLFFBQVEsS0FBSyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRXBDLElBQUksT0FBTyxLQUFLLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNJLFNBQVMsT0FBTyxDQUFDLElBQWlCLEVBQUUsRUFBZTtJQUN6RCxJQUFJLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQzFELENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxTQUFTLE9BQU8sQ0FBQyxJQUFvQztJQUMzRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBd0IsQ0FBQztJQUM5QyxJQUFJLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNJLFNBQVMsVUFBVSxDQUFDLElBQWlCO0lBQzNDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxJQUFJO1FBQzVCLElBQUksSUFBSSxHQUFHLE9BQU8sRUFDakIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFDakUsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUF5QixDQUFDO1FBRXpDLGdFQUFnRTtRQUNoRSxvREFBb0Q7UUFDcEQsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNuRSxtQ0FBbUM7WUFDbkMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFtQixDQUFDO1lBQzNDLElBQUksb0JBQW9CLEdBQUcsZ0JBQWdCLENBQUMsVUFBeUI7WUFDckUsT0FBTyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDO2dCQUMxQyxvQkFBb0IsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3ZDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFVBQXlCLENBQUM7WUFDL0QsQ0FBQztZQUVELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFJLE1BQU0sR0FBRyxJQUFtQixDQUFDO1lBRWpDLDJEQUEyRDtZQUMzRCxPQUFPLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3pDLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUUsQ0FBQztvQkFDdEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBaUIsQ0FBQztvQkFDOUMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBeUIsQ0FBQztvQkFDeEQsT0FBTyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUN6QixXQUFXLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLENBQUM7b0JBQ3RDLENBQUM7b0JBRUQsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztnQkFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQXlCLENBQUM7WUFDM0MsQ0FBQztZQUVELFlBQVksQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3RCLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUNELElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNGLENBQUM7UUFFRCxnRUFBZ0U7UUFDaEUsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQXlCLENBQUM7UUFDcEQsSUFBSSxPQUFPLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDM0QsSUFBSSxFQUFFLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTVDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDVCxFQUFFLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixZQUFZLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFFRCxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDRixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSSxTQUFTLGtCQUFrQixDQUFDLEtBQWtCLEVBQUUsS0FBa0I7SUFDeEUsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBeUIsQ0FBQyxFQUFFLENBQUM7UUFDbEQsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0YsQ0FBQztBQUNGLENBQUM7QUFFRDs7OztHQUlHO0FBQ0ksU0FBUyxVQUFVLENBQUMsSUFBa0IsRUFBRSxXQUFvQixLQUFLO0lBQ3ZFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELElBQUksT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxVQUF5QixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNILE9BQU8sT0FBc0IsQ0FBQztBQUMvQixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxTQUFTLGdCQUFnQixDQUFDLElBQWlCO0lBQ2pELElBQUksU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFDdkQsUUFBUSxFQUFFLFNBQVMsRUFDbkIsYUFBYSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDO0lBQ3ZDLG1DQUFtQztJQUNuQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUMvQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQXlCLENBQUM7SUFFdkMsNkNBQTZDO0lBQzdDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ3pDLE9BQU87SUFDUixDQUFDO0lBRUQsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNiLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBMEIsQ0FBQztRQUMzQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzQixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUV6QixJQUFJLFFBQVEsS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xELGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM1QixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFFbEIsT0FBTyxRQUFRLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztnQkFDL0MsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELHlEQUF5RDtZQUN6RCxnREFBZ0Q7WUFDaEQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2hDLGVBQWUsR0FBRyxRQUFRLENBQUM7Z0JBRTNCLE9BQU8sZUFBZSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNsQyxlQUFlLEdBQUcsZUFBZSxDQUFDLFNBQXdCLENBQUM7b0JBRTNELHFDQUFxQztvQkFDckMsT0FBTyxRQUFRLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDLEVBQUUsQ0FBQzt3QkFDdEQsZUFBZSxHQUFHLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3JELENBQUM7Z0JBQ0YsQ0FBQztnQkFFRCxTQUFTLEdBQUcsZUFBZSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQztvQkFDbkQsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDOUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUVELDBCQUEwQjtZQUMxQixTQUFTLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFN0MsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ25ELFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUM1QixnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQzVDLEVBQUUsQ0FDRixDQUFDO1lBQ0gsQ0FBQztZQUVELDRCQUE0QjtZQUM1QixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzlCLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUM1QixnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQzVDLEVBQUUsQ0FDRixDQUFDO1lBQ0gsQ0FBQztZQUVELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUNqQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQzVDLEdBQUcsQ0FDSCxDQUFDO1lBQ0gsQ0FBQztRQUNGLENBQUM7UUFFRCxJQUFJLEdBQUcsUUFBUSxDQUFDO0lBQ2pCLENBQUM7QUFDRixDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksU0FBUyxlQUFlLENBQUMsU0FBc0IsRUFBRSxPQUFvQjtJQUMzRSxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRWxELEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzQixPQUFPLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUNoQyxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSSxTQUFTLFNBQVMsQ0FBQyxJQUFpQjtJQUMxQyxJQUFJLElBQUksR0FBRyxDQUFDLEVBQ1gsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUVULE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN4QixHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN0QixJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQTJCLENBQUM7SUFDekMsQ0FBQztJQUVELE9BQU87UUFDTixJQUFJLEVBQUUsSUFBSTtRQUNWLEdBQUcsRUFBRSxHQUFHO0tBQ1IsQ0FBQztBQUNILENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSSxTQUFTLFFBQVEsQ0FBQyxHQUFnQixFQUFFLFFBQWdCO0lBQzFELElBQUksVUFBa0IsQ0FBQztJQUN2QixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBRXpCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ3JDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsUUFBUSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFakQsa0NBQWtDO0lBQ2xDLElBQUksV0FBVyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzlCLFVBQVUsR0FBRyxVQUFVLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU5QyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxLQUFLLFVBQVU7WUFDL0MsR0FBRyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsS0FBSyxPQUFPLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3RELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQztJQUNGLENBQUM7SUFFRCxPQUFPLFVBQVUsQ0FBQztBQUNuQixDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNJLFNBQVMsUUFBUSxDQUFDLEdBQWdCLEVBQUUsUUFBZ0IsRUFBRSxNQUE0QjtJQUN4RixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXpDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNqQixPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxPQUFPLENBQUMsTUFBTSxJQUFJLFVBQVUsS0FBSyxNQUFNO1FBQ3RDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFTLFdBQVcsQ0FBQyxLQUFrQixFQUFFLEtBQWtCO0lBQzFELElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNCLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQy9FLE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNGLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNiLENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBUyxlQUFlLENBQUMsS0FBa0IsRUFBRSxLQUFrQjtJQUM5RCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNoQyxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25DLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNaLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEIsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0YsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLGtCQUFrQixDQUFDLElBQWlCO0lBQzVDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxVQUE0QyxDQUFDO0lBQ3ZFLE9BQU8sY0FBYyxFQUFFLENBQUM7UUFDdkIsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0ksU0FBUyxLQUFLLENBQUMsSUFBaUI7SUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQ3BDLE9BQU87SUFDUixDQUFDO0lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQXlCLENBQUM7SUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMzQixJQUFJLFNBQVMsR0FBRyx1QkFBdUIsQ0FBQztJQUV4Qyx5REFBeUQ7SUFDekQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDL0IsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1osS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFnQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN6QyxPQUFPO0lBQ1IsQ0FBQztJQUVELHVEQUF1RDtJQUN2RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDdEIsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDRixDQUFDO0lBRUQsMERBQTBEO0lBQzFELHdFQUF3RTtJQUN4RSw4Q0FBOEM7SUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUxQix5Q0FBeUM7UUFDekMsSUFBSSxPQUFPLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDeEIsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRTtnQkFDeEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLENBQUM7WUFFRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO2dCQUNqRCxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFFRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUN2RCxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDRixDQUFDO1FBRUQsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDMUQsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQzthQUFNLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3BDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxLQUFLLElBQUksQ0FBQztZQUVoQyxPQUFPLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUNoQyxDQUFDLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLEtBQUssUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFFdkQseUJBQXlCO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxPQUFPO29CQUM5QixDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxlQUFlLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQ2hDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QixNQUFNO2dCQUNQLENBQUM7Z0JBRUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUF5QixDQUFDO1lBQzNDLENBQUM7UUFDRixDQUFDO0lBQ0YsQ0FBQztJQUVELCtEQUErRDtJQUMvRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBMEIsQ0FBQztJQUMzQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDckUsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyc0M0QjtBQUNPO0FBQ2E7QUFDRTtBQUNIO0FBQ0o7QUFDTDtBQUNEO0FBQ0U7QUFDSTtBQUNWO0FBRWxDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFFekI7Ozs7R0FJRztBQUNILE1BQXFCLFNBQVM7SUFHN0IsWUFBWSxRQUFhLEVBQUUsV0FBZ0I7UUFzaEQzQzs7Ozs7V0FLRztRQUNLLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBNkNoQzs7Ozs7V0FLRztRQUNLLGlCQUFZLEdBQVEsTUFBdUIsRUFBQztRQXNEcEQ7Ozs7O1dBS0c7UUFDSyxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFvQ25DOzs7Ozs7V0FNRztRQUNLLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBVS9COzs7OztXQUtHO1FBQ0sscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBa0JuQzs7O1dBR0c7UUFDSyx3QkFBbUIsR0FBRyxHQUFTLEVBQUU7WUFDeEMsSUFBSSxVQUFVLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1lBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUVqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUNyQiwyQ0FBVSxDQUFDLHNDQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRTtvQkFDL0QsNkNBQWUsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQ3hDLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDUixDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUM3QyxJQUFJLFVBQVUsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7b0JBQzlDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRXJDLElBQUksK0NBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO29CQUM3QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ2YsSUFBSSxDQUFDOzRCQUNKLEtBQUssR0FBRyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBRWxELHFDQUFxQzs0QkFDckMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQ0FDaEIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2hELENBQUM7d0JBQ0YsQ0FBQzt3QkFBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzdCLENBQUM7Z0JBQ0YsQ0FBQztxQkFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ3hCLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2hELENBQUM7Z0JBRUQsNkNBQWUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFVBQVUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELDZDQUFlLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7Ozs7V0FLRztRQUNLLG1CQUFjLEdBQVEsRUFBRSxDQUFDO1FBRWpDOzs7V0FHRztRQUNLLGtCQUFhLEdBQUcsQ0FBQyxPQUFpQixFQUFRLEVBQUU7WUFDbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1lBRW5FLDJDQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDN0MsNkNBQWUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBMENGOzs7O1dBSUc7UUFDSyxxQkFBZ0IsR0FBRyxHQUFTLEVBQUU7WUFDckMsNEJBQTRCO1lBQzVCLElBQUksT0FBTyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkUseUNBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsRUFBRTtvQkFDaEQsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVztpQkFDekIsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLFNBQUksR0FBRyxHQUFTLEVBQUU7WUFDekIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUdoQyxjQUFjO1lBQ2QsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDckUsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3pCLENBQUM7WUFFRCxVQUFVLENBQUMsZUFBZSxHQUFHLCtDQUFpQixDQUFDLEtBQUssRUFBRTtnQkFDckQsU0FBUyxFQUFFLHFCQUFxQjthQUNoQyxDQUFtQixDQUFDO1lBRXJCLDhDQUFnQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xFLHFDQUFPLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUxRSxVQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3JELFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUVyQyxJQUFJLFVBQVUsR0FBRyxFQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2RDs7Ozs7a0JBS0c7WUFDSCxVQUFVLENBQUMsYUFBYSxHQUFHLElBQUkseURBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTtnQkFDckUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLE1BQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hDLFVBQVUsQ0FBQyxNQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBRUQsa0JBQWtCO1lBQ2xCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQixVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hCLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QixVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFeEIsMkRBQTJEO1lBQzNELGVBQWU7WUFDZixJQUFJLENBQUMsMkRBQTBCLEVBQUUsQ0FBQztnQkFDakMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDL0IsQ0FBQztZQUVELFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRWpDLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDakIscUNBQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFekMsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNsQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQUVELFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDeEIsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMzQixtQ0FBbUM7Z0JBQ25DLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3BDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztZQUNGLENBQUMsQ0FBQztZQUNGLG9DQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEMsSUFBSSxTQUFTLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRSxDQUFDO2dCQUN6QyxNQUFNLEVBQUUsQ0FBQztZQUNWLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0ssZUFBVSxHQUFHLEdBQVMsRUFBRTtZQUMvQixJQUFJLElBQUksR0FBRyxTQUFTLENBQUM7WUFFckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFFRCxnRUFBZ0U7WUFDaEUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ2xELENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxlQUFVLEdBQUcsR0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsK0NBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBd0IsQ0FBQztZQUMvRSxJQUFJLENBQUMsYUFBYSxHQUFHLCtDQUFpQixDQUFDLFFBQVEsRUFBRTtnQkFDaEQsV0FBVyxFQUFFLEdBQUc7Z0JBQ2hCLGVBQWUsRUFBRSxNQUFNO2FBQ3ZCLENBQXNCLENBQUM7WUFFeEI7Ozs7a0JBSUc7WUFDSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDcEMsMENBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUNqRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5QixDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsMENBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNsRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzlCLHNDQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsQ0FBQztZQUVELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzlDLHNDQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUVELGtDQUFrQztZQUNsQyw2Q0FBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzFELDZDQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFekQsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxVQUFVLENBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksdUNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLHdDQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNoRCxDQUFDO1lBRUYsa0RBQWtEO1lBQ2xELElBQUksU0FBUyxHQUFHLDRDQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRTFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7WUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyx5REFBUyxDQUFDLE1BQU0sRUFBRTtnQkFDNUMsS0FBSyxFQUFFLFVBQVUsR0FBRyxTQUFTLEdBQUcsR0FBRztnQkFDbkMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtnQkFDL0QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSzthQUN6QixDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQXVCLENBQUM7WUFDaEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztZQUV0RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXZDLDhCQUE4QjtZQUM5QixJQUFJLDRDQUFXLEVBQUUsQ0FBQztnQkFDakIsd0NBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxvQ0FBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUVELElBQUksUUFBUSxHQUFHLHNDQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNuRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELHNDQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHFEQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTVFLDBDQUEwQztZQUMxQyxzQ0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2dCQUN6QyxzQ0FBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFeEMsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUM1QyxzQ0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxnQkFBVyxHQUFHLEdBQVMsRUFBRTtZQUNoQyw2REFBNkQ7WUFDN0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM3QixvQ0FBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3hELG9DQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcscUNBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxLQUFLLEtBQUssQ0FBQztZQUN0RSxDQUFDO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU3QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzdCLHNEQUFzRDtnQkFDdEQsb0NBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSwrQ0FBaUIsQ0FBQyxDQUFDO2dCQUMzRSxvQ0FBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ25CLENBQUM7WUFFRCxzQ0FBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssZUFBVSxHQUFHLEdBQVMsRUFBRTtZQUMvQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxpQkFBaUIsR0FBRyxpQ0FBaUMsQ0FBQztZQUMxRCxJQUFJLGVBQWUsR0FBRyxxREFBcUQsQ0FBQztZQUM1RSxJQUFJLG9CQUFvQixHQUFHLG1CQUFtQixJQUFJLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0UsaUJBQWlCLENBQUMsQ0FBQztnQkFDbkIscURBQXFELENBQUM7WUFFdkQsb0NBQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUVqRSxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNWLG9DQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN4RCxvQ0FBTSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSwrQ0FBaUIsQ0FBQyxDQUFDO1lBQzlFLENBQUM7WUFFRCxvQ0FBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlELG9DQUFNLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdELG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzVFLG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMxRSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM1RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN0RixvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzdGLG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU5RSxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbEUsb0NBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDcEYsQ0FBQztZQUVELG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO29CQUN2QiwwQ0FBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILG9DQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDbEQsNkNBQWUsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxDQUFDO1lBRUgsb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0Usb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDN0Usb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNFLG9DQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdkYsb0NBQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRS9FLG9DQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRixvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pHLG9DQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU1RSxvQ0FBTSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFGLG9DQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0YsMkJBQTJCO1lBQzNCLG9DQUFNLENBQ0wsVUFBVSxDQUFDLGVBQWUsRUFDMUIsMERBQTBELEVBQzFELElBQUksRUFDSixVQUFVLENBQUMsV0FBVyxDQUN0QixDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssZ0JBQVcsR0FBRyxHQUFTLEVBQUU7WUFDaEMsSUFBSSxVQUFVLEdBQVEsSUFBSSxDQUFDO1lBQzNCLElBQUksS0FBVSxDQUFDO1lBQ2YsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxJQUFJLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbkQsVUFBVSxDQUFDLE9BQU8sR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQzdDLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLFlBQVksRUFBRSxJQUFJO2FBQ2xCLENBQW1CLENBQUM7WUFFckIsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pELFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUNwRSxDQUFDO1lBRUQsMkNBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQ25DLEtBQUssR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hDLFNBQVMsRUFBRSxpQkFBaUI7aUJBQzVCLENBQUMsQ0FBQztnQkFFSCwyQ0FBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUU7b0JBQ25ELElBQUksTUFBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUUzRCwyREFBMkQ7b0JBQzNELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNuRCxPQUFPO29CQUNSLENBQUM7b0JBRUQsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQzVCLE1BQU0sR0FBRyx5REFBUyxDQUFDLGVBQWUsRUFBRTt3QkFDbkMsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLFFBQVEsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJOzRCQUMxQyxPQUFPLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQztxQkFDaEMsRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7b0JBRXBCLElBQUksVUFBVSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNqRCxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDaEQsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDViw4Q0FBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFDcEQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNwQiwwQ0FBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDbEMsQ0FBQztvQkFDRixDQUFDO29CQUVELE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ3ZDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3hDLDZDQUFlLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkQsb0NBQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO3dCQUN4QyxJQUFJLENBQUMsMENBQVksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQzs0QkFDdkMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzNDLENBQUM7d0JBRUQsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsa0RBQWtEO29CQUNsRCxvQ0FBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBTSxFQUFFLEVBQUU7d0JBQzVDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQzt3QkFDM0IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNwQixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDckIsc0NBQVEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUN2QixVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7NEJBQ3JDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ3ZDLENBQUM7b0JBQ0gsQ0FBQztvQkFFRCxJQUFJLFFBQVEsRUFBRSxDQUFDO3dCQUNkLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUMvQyxDQUFDO29CQUVELElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNuQixVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDOzRCQUNoQyxJQUFJLEVBQUUsV0FBVzs0QkFDakIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO3lCQUNwQixDQUFDLENBQUM7d0JBQ0gsMERBQTBEO29CQUMzRCxDQUFDO3lCQUFNLElBQUksK0NBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDekMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQzs0QkFDaEMsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSTt5QkFDbkIsQ0FBQyxDQUFDO29CQUNKLENBQUM7b0JBRUQsNkNBQWUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQy9CLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQztnQkFFSCx1QkFBdUI7Z0JBQ3ZCLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUN0Qiw2Q0FBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQzVDLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILDZEQUE2RDtZQUM3RCw2Q0FBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksVUFBVSxDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEcsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssZUFBVSxHQUFHLEdBQVMsRUFBRTtZQUMvQixJQUFJLFNBQWMsRUFBRSxTQUFjLEVBQUUsUUFBYSxFQUFFLFFBQWEsRUFBRSxhQUFrQixFQUFFLFdBQWdCLEVBQUUsSUFBSSxHQUFHLCtDQUFpQixDQUFDLEtBQUssRUFBRTtnQkFDdkksU0FBUyxFQUFFLGdCQUFnQjthQUMzQixDQUFDO1lBQ0QsdURBQXVEO1lBQ3ZELCtCQUErQjtZQUMvQixLQUFLLEdBQUcsK0NBQWlCLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxTQUFTLEVBQUUsd0JBQXdCO2FBQ25DLENBQUMsRUFBRSxVQUFVLEdBQUcscUJBQXFCLEVBQUUsU0FBUyxHQUFHLDhCQUE4QixFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyx1Q0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxVQUFVLEdBQUcsd0NBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsVUFBVSxHQUFHLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRW5TLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQzdELFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQzdELFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzNELFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBRTNELGFBQWEsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO2dCQUMxQix3QkFBd0I7Z0JBQ3hCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7b0JBQ3BCLElBQUksR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDakMsSUFBSSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNsQyxDQUFDO3FCQUFNLENBQUM7b0JBQ1AsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQ2YsSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQsSUFBSSxTQUFTLEdBQUcsV0FBVyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDOUQsVUFBVSxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLFVBQVUsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxRQUFRLEVBQUUsQ0FBQztvQkFDekMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDckIsQ0FBQztnQkFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLFFBQVEsRUFBRSxDQUFDO29CQUN6QyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUNyQixDQUFDO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUMvQixRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUN0QixDQUFDO2dCQUVELElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxTQUFTLEdBQUcsU0FBUyxFQUFFLENBQUM7b0JBQzVDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBQ0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxJQUFJLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztvQkFDNUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsQ0FBQztnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDaEMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsQ0FBQztnQkFFRCxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7Z0JBRUQsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUMsQ0FBQztZQUVGLFdBQVcsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO2dCQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7b0JBQ2pCLE9BQU87Z0JBQ1IsQ0FBQztnQkFFRCxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUVuQixzQ0FBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQiw2Q0FBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xELHFDQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3BELHFDQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRWpELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUM7WUFFRixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ1YsNkNBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzVCLDBDQUFZLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0YsQ0FBQztZQUVELDZDQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM1Qyw2Q0FBZSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDN0Msc0NBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVoQixvQ0FBTSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDckQsd0JBQXdCO2dCQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFLENBQUM7b0JBQzdCLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO29CQUNwQixNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7b0JBQzVCLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0IsQ0FBQztxQkFBTSxDQUFDO29CQUNQLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNqQixNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCxVQUFVLEdBQUcsdUNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdDLFdBQVcsR0FBRyx3Q0FBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDL0MsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFFbEIsMENBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQyxzQ0FBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixvQ0FBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuRCxvQ0FBTSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUVoRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxrQkFBYSxHQUFHLEdBQVMsRUFBRTtZQUNsQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDdkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDO1lBRTVDLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyw2Q0FBWSxDQUMvQixFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQ3hELENBQUM7WUFDSCxDQUFDO1lBRUQsMkNBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUMxQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLHlEQUFTLENBQUMsVUFBVSxFQUFFO29CQUNwRCxHQUFHLEVBQUUsR0FBRztvQkFDUix3Q0FBd0M7b0JBQ3hDLEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQztvQkFDNUIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRztpQkFDM0IsQ0FBQyxDQUFDO2dCQUVILHVCQUF1QjtnQkFDdkIsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3pDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLCtDQUFpQixDQUFDLEtBQUssRUFBRTt3QkFDckQsR0FBRyxFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO3FCQUM1QixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxjQUFTLEdBQUcsQ0FBQyxRQUFhLEVBQVEsRUFBRTtZQUMzQyxJQUFJLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDbEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUF5QixDQUFDO1lBRXRELGlDQUFpQztZQUNqQyxJQUFJLENBQUMsMkNBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsT0FBTztZQUNSLENBQUM7WUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO2dCQUN2QixNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRXBELE9BQU87WUFDUixDQUFDO1lBRUQsa0RBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXZDLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUF3QixDQUFDO2dCQUMxRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxHQUFHLCtDQUFpQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBZ0IsQ0FBQztvQkFDdkUsNkNBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN2QixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQXdCLENBQUM7b0JBRXJDLCtDQUErQztvQkFDL0MsSUFBSSxvQ0FBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7d0JBQ2hELElBQUksR0FBRyxJQUFJLENBQUMsZUFBOEIsQ0FBQztvQkFDNUMsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztZQUVELEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRTNDLElBQUksQ0FBQyxpREFBbUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNoQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUUzQixJQUFJLFFBQVEsRUFBRSxDQUFDO29CQUNkLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7WUFDRixDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUU5QixJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQzVELENBQUM7WUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRjs7V0FFRztRQUNLLGVBQVUsR0FBRyxHQUFTLEVBQUU7WUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN6RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakUsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLHdCQUFtQixHQUFHLENBQUMsQ0FBTSxFQUFRLEVBQUU7WUFDOUMsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUMzRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBRWxCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0QixDQUFDO1FBQ0YsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7O1dBUUc7UUFDSyxxQkFBZ0IsR0FBRyxDQUFDLENBQU0sRUFBUSxFQUFFO1lBQzNDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0MsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDWCxJQUFJLFNBQVMsR0FBRywrQ0FBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxXQUFXLENBQUM7Z0JBRWhCLG1FQUFtRTtnQkFDbkUscUJBQXFCO2dCQUNyQixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsdUJBQXVCLENBQUM7Z0JBQzNDLE9BQU8sTUFBTSxJQUFJLDBDQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzdDLElBQUksTUFBTSxDQUFDLFFBQVEsS0FBSyw4Q0FBZ0IsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxFQUFpQixDQUFDO3dCQUM5QyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQzs0QkFDMUIsNkNBQWUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFVBQXlCLENBQUMsQ0FBQzt3QkFDN0QsQ0FBQzt3QkFFRCw2Q0FBZSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDbEMsV0FBVyxHQUFHLFdBQVcsSUFBSSxLQUFLLENBQUM7b0JBQ3BDLENBQUM7b0JBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0JBQzVCLENBQUM7Z0JBRUQsNkNBQWUsQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRSxrREFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFaEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFMUQsa0VBQWtFO2dCQUNsRSxnRUFBZ0U7Z0JBQ2hFLGFBQWE7Z0JBQ2IsMkNBQVUsQ0FBQyxzQ0FBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDL0MsZ0RBQWtCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxvRUFBb0U7Z0JBQ3BFLDJDQUFVLENBQUMsc0NBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsMENBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzlELHdDQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsK0RBQStEO2dCQUMvRCxpRUFBaUU7Z0JBQ2pFLGdFQUFnRTtnQkFDaEUsNkNBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMzRCx3Q0FBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUV0QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLG1CQUFjLEdBQUcsQ0FBQyxDQUFpQixFQUFRLEVBQUU7WUFDcEQsTUFBTSxnQkFBZ0IsR0FBVyxpQ0FBaUMsQ0FBQztZQUNuRSxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQ2hDLElBQUksU0FBUyxHQUFHLENBQUMsSUFBUyxFQUFFLEVBQUU7Z0JBQzdCLElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRTtvQkFDMUIsYUFBYSxDQUFDLGVBQWUsQ0FBQzt3QkFDN0IsSUFBSSxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNO3FCQUM3QyxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDO1lBRUYsb0VBQW9FO1lBQ3BFLGlFQUFpRTtZQUNqRSxzQkFBc0I7WUFDdEIsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDZixJQUFJLElBQUksR0FBUSxFQUFFLENBQUM7Z0JBQ25CLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQzVCLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBRTVCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFFbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztvQkFDdkMseURBQXlEO29CQUN6RCxpQ0FBaUM7b0JBQ2pDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDcEMsaURBQWlEO3dCQUNqRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLElBQUksS0FBSzs0QkFDaEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUN2QyxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7d0JBQ2xELENBQUM7b0JBQ0YsQ0FBQztvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFDRCwrQkFBK0I7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBRTdDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLCtEQUErRDtnQkFDL0QsaUVBQWlFO1lBQ2xFLENBQUM7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUN2Qyw4Q0FBOEM7Z0JBQzlDLDRCQUE0QjtnQkFDNUIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQkFFbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUMvRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDNUIsNkNBQWUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLFVBQXlCLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNmLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7b0JBRTlCLFFBQVEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO29CQUN4Qiw2Q0FBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDckQsUUFBUSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7b0JBRWxDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBRWhDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0sscUJBQWdCLEdBQUcsR0FBUyxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNuQyxrREFDUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlFLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0ssNkJBQXdCLEdBQUcsR0FBVyxFQUFFO1lBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FDOUIsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLGtCQUFhLEdBQUcsQ0FBQyxNQUFXLEVBQUUsR0FBUSxFQUFRLEVBQUU7WUFDdkQsaURBQWlEO1lBQ2pELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7Z0JBQ3pCLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7d0JBQ2hDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEQsQ0FBQzt5QkFBTSxDQUFDO3dCQUNQLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsQ0FBQztvQkFDakUsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztpQkFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxpREFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QixDQUFDO3FCQUFNLENBQUM7b0JBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FDZixHQUFHLENBQUMsSUFBSSxFQUNSLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDN0UsQ0FBQztnQkFDSCxDQUFDO1lBQ0YsQ0FBQztRQUVGLENBQUMsQ0FBQztRQUVGOzs7Ozs7V0FNRztRQUNLLGdCQUFXLEdBQUcsQ0FBQyxJQUFxQixFQUFFLEdBQWEsRUFBRSxFQUFFO1lBQzlELElBQUksT0FBb0IsQ0FBQztZQUV6QiwwQ0FBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQWlCLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSwwQ0FBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM5QixnRUFBZ0U7b0JBQ2hFLGdDQUFnQztvQkFDaEMsNERBQTREO29CQUM1RCwrQ0FBK0M7b0JBQy9DLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssMkNBQWEsQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQ0FBTSxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDZCxPQUFPLEdBQUcsK0NBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQzs0QkFDMUMsOENBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNqQyxDQUFDO3dCQUVELDZDQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNoQyxDQUFDO2dCQUNGLENBQUM7cUJBQU0sQ0FBQztvQkFDUCxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0YsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQixDQUFDO1FBRUQ7Ozs7Ozs7V0FPRztRQUNLLDBCQUFxQixHQUFHLEdBQVMsRUFBRTtZQUMxQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxFQUFFO2dCQUNoQiw0REFBNEQ7Z0JBQzVELHFCQUFxQjtnQkFDckIsSUFBSSxVQUFVLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtvQkFDMUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQzFELFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQ25DLG9EQUFvRDtvQkFDcEQsa0NBQWtDO2dCQUNuQyxDQUFDO3FCQUFNLElBQUksVUFBVSxDQUFDLFdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7b0JBQ25HLFVBQVUsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUVyRSx1REFBdUQ7b0JBQ3ZELGFBQWE7b0JBQ2IsSUFBSSxVQUFVLENBQUMsZ0JBQWdCLElBQUksVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUMxRSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO3dCQUN4RCxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO3dCQUVyRCx3REFBd0Q7d0JBQ3hELElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssMkNBQWEsRUFBRSxDQUFDOzRCQUNqRCxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDcEMsQ0FBQzt3QkFFRCxPQUFPLE1BQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDL0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7d0JBQzVCLENBQUM7d0JBRUQsSUFBSSxNQUFNLElBQUksMENBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQzs0QkFDMUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs0QkFDbkMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQzs0QkFDM0UsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDdkMsQ0FBQztvQkFDRixDQUFDO29CQUVELHlDQUFXLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDO2dCQUVELFVBQVUsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7WUFDNUMsQ0FBQztZQUVELElBQUksVUFBVSxDQUFDLHVCQUF1QixFQUFFLENBQUM7Z0JBQ3hDLE9BQU87WUFDUixDQUFDO1lBRUQsVUFBVSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQztZQUUxQyxxRUFBcUU7WUFDckUsSUFBSSxtQkFBbUIsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZELEtBQUssRUFBRSxDQUFDO1lBQ1QsQ0FBQztpQkFBTSxDQUFDO2dCQUNQLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEIsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7O1dBSUc7UUFDSyxtQkFBYyxHQUFHLENBQUMsQ0FBTSxFQUFRLEVBQUU7WUFDekMsOERBQThEO1lBQzlELElBQUksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3hCLE9BQU87WUFDUixDQUFDO1lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQztnQkFFM0Isa0VBQWtFO2dCQUNsRSxnRUFBZ0U7Z0JBQ2hFLElBQUksQ0FBQyxvQ0FBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUM7b0JBQzVDLDRDQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztvQkFFeEMsSUFBSSxFQUFFLEdBQUcsK0NBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzNELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUVoQywrREFBK0Q7b0JBQy9ELDZEQUE2RDtvQkFDN0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDM0IsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQWdCLENBQUM7b0JBRXhDLHlEQUF5RDtvQkFDekQsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSywyQ0FBYTt3QkFDcEQsU0FBUyxDQUFDLFNBQVMsS0FBSyxFQUFFLEVBQUUsQ0FBQzt3QkFDN0Isd0NBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDdEIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7b0JBQzlCLENBQUM7b0JBRUQscURBQXFEO29CQUNyRCxxREFBcUQ7b0JBQ3JELG1EQUFtRDtvQkFDbkQsOEJBQThCO29CQUM5QixJQUFJLENBQUMsMENBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxLQUFLLEVBQUU7d0JBQ2xELDBDQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7d0JBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNyQyxDQUFDO29CQUVELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7V0FRRztRQUNLLGtCQUFhLEdBQUcsR0FBUyxFQUFFO1lBQ2xDLHlEQUF5RDtZQUN6RCx5REFBeUQ7WUFDekQsaUJBQWlCO1lBQ2pCLDJDQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUM3QyxnREFBZ0Q7Z0JBQ2hELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyw4Q0FBZ0I7b0JBQ3JDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxxQ0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBRTNDLHNDQUFzQztvQkFDdEMsSUFBSSxDQUFDLG9DQUFNLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLElBQUksNENBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUM3RCxJQUFJLFNBQVMsR0FBRywrQ0FBaUIsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDakUsU0FBUyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7d0JBQ3RDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO3dCQUMvQiw2Q0FBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7d0JBQzdDLE9BQU8sS0FBSyxDQUFDO29CQUNkLENBQUM7Z0JBQ0YsQ0FBQztnQkFFRCwwQ0FBMEM7Z0JBQzFDLHVDQUF1QztnQkFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3pELG9DQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7b0JBQ3JCLE9BQU8sS0FBSyxDQUFDO2dCQUNkLENBQUM7WUFDRixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLG9CQUFlLEdBQUcsR0FBUyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxvQkFBZSxHQUFHLEdBQVMsRUFBRTtZQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDO1FBRUY7Ozs7V0FJRztRQUNLLGdCQUFXLEdBQUcsQ0FBQyxDQUFNLEVBQVEsRUFBRTtZQUN0QyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsNEJBQTRCO2dCQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUVELGdEQUFnRDtZQUNoRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBdUMsQ0FBQztZQUU5RyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTtvQkFDNUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNLLHNCQUFpQixHQUFHLENBQUMsQ0FBTSxFQUFRLEVBQUU7WUFDNUMsSUFBSSxnQkFBZ0IsRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVqSCwwQkFBMEI7WUFDMUIsSUFBSSx5Q0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNoRCxPQUFPO1lBQ1IsQ0FBQztZQUVELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDckIsY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFFcEIsMkNBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO29CQUMzQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxDQUFNLEVBQUUsRUFBRTtvQkFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsbUJBQW1CO29CQUN2QixjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDdEQsQ0FBQztZQUVELGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUNqRCxJQUFJLENBQUMsY0FBYyxFQUNuQixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksQ0FBQyxtQkFBbUIsRUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQzVCLE9BQU8sQ0FDUCxDQUFDO1lBRUYsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQzVELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyw2QkFBd0IsR0FBRyxHQUFTLEVBQUU7WUFDN0MsMERBQXlCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxrQkFBYSxHQUFHLENBQUMsQ0FBTSxFQUFRLEVBQUU7WUFDeEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksUUFBUSxHQUFRLEVBQUUsRUFFckIsVUFBVSxHQUFRO2dCQUNqQixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsSUFBSTtnQkFDVCxJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsR0FBRztnQkFDVCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRzthQUNSLEVBQUUsWUFBWSxHQUFRO2dCQUN0QixDQUFDLEVBQUUsV0FBVztnQkFDZCxDQUFDLEVBQUUsS0FBSztnQkFDUixFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsVUFBVTtnQkFDZCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsUUFBUTtnQkFDWixFQUFFLEVBQUUsVUFBVTtnQkFDZCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsTUFBTTtnQkFDVixFQUFFLEVBQUUsTUFBTTtnQkFDVixFQUFFLEVBQUUsSUFBSTtnQkFDUixFQUFFLEVBQUUsT0FBTztnQkFDWCxFQUFFLEVBQUUsTUFBTTtnQkFDVixFQUFFLEVBQUUsUUFBUTtnQkFDWixFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsS0FBSztnQkFDVCxFQUFFLEVBQUUsUUFBUTtnQkFDWixFQUFFLEVBQUUsR0FBRztnQkFDUCxFQUFFLEVBQUUsR0FBRztnQkFDUCxFQUFFLEVBQUUsR0FBRztnQkFDUCxFQUFFLEVBQUUsR0FBRztnQkFDUCxHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVBQUUsR0FBRztnQkFDUixHQUFHLEVB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TyxNQUFNLENBQUM7UUFDZixDQUFDLENBQUM7SUFDSCxDQUFDO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcHlCRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9GRDtBQUM2QjtBQUNPO0FBQ0U7QUFDSDtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQ0FBTztBQUM1QixLQUFLLHdDQUFVO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtB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QUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG9DQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9DQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFDQUFPO0FBQzVCLEdBQUcscUNBQU87QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG9DQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9DQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFDQUFPO0FBQzVCLEdBQUcscUNBQU87QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbjhCRTs7QUFFN0I7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTLDBDQUFJOztBQUViO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFD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QUFNLEVBQUUsQ0FBQyxRQUE2QixFQUFFLE9BQVksRUFBUSxFQUFFO1FBQzdELE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO1FBRXhCLDJDQUEyQztRQUMzQyw0QkFBNEI7UUFDNUIsSUFBSSw0Q0FBVSxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQyxFQUFFLENBQUM7WUFDbEQsT0FBTztRQUNSLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyx3QkFBd0IsSUFBSSwrREFBMEIsRUFBRSxDQUFDO1lBQ3BFLENBQUMsSUFBSSxzREFBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7SUFDRixDQUFDO0lBRUQsUUFBUSxFQUFFLFVBQVUsUUFBYTtRQUNoQyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDNUIsQ0FBQztDQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9ub2RlX21vZHVsZXMvZG9tcHVyaWZ5L2Rpc3QvcHVyaWZ5LmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy90aGVtZXMvc3F1YXJlLmxlc3M/ZGRjNiIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2RvbS50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2VtbEVkaXRvci50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3BsdWdpbk1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9yYW5nZUhlbHBlci50cyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0Q29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kZWZhdWx0T3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2Vtb3RpY29ucy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3RlbXBsYXRlcy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIEBsaWNlbnNlIERPTVB1cmlmeSAzLjAuOSB8IChjKSBDdXJlNTMgYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyB8IFJlbGVhc2VkIHVuZGVyIHRoZSBBcGFjaGUgbGljZW5zZSAyLjAgYW5kIE1vemlsbGEgUHVibGljIExpY2Vuc2UgMi4wIHwgZ2l0aHViLmNvbS9jdXJlNTMvRE9NUHVyaWZ5L2Jsb2IvMy4wLjkvTElDRU5TRSAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5ET01QdXJpZnkgPSBmYWN0b3J5KCkpO1xufSkodGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGNvbnN0IHtcbiAgICBlbnRyaWVzLFxuICAgIHNldFByb3RvdHlwZU9mLFxuICAgIGlzRnJvemVuLFxuICAgIGdldFByb3RvdHlwZU9mLFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvclxuICB9ID0gT2JqZWN0O1xuICBsZXQge1xuICAgIGZyZWV6ZSxcbiAgICBzZWFsLFxuICAgIGNyZWF0ZVxuICB9ID0gT2JqZWN0OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby1tdXRhYmxlLWV4cG9ydHNcbiAgbGV0IHtcbiAgICBhcHBseSxcbiAgICBjb25zdHJ1Y3RcbiAgfSA9IHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBSZWZsZWN0O1xuICBpZiAoIWZyZWV6ZSkge1xuICAgIGZyZWV6ZSA9IGZ1bmN0aW9uIGZyZWV6ZSh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghc2VhbCkge1xuICAgIHNlYWwgPSBmdW5jdGlvbiBzZWFsKHgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cbiAgaWYgKCFhcHBseSkge1xuICAgIGFwcGx5ID0gZnVuY3Rpb24gYXBwbHkoZnVuLCB0aGlzVmFsdWUsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmdW4uYXBwbHkodGhpc1ZhbHVlLCBhcmdzKTtcbiAgICB9O1xuICB9XG4gIGlmICghY29uc3RydWN0KSB7XG4gICAgY29uc3RydWN0ID0gZnVuY3Rpb24gY29uc3RydWN0KEZ1bmMsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBuZXcgRnVuYyguLi5hcmdzKTtcbiAgICB9O1xuICB9XG4gIGNvbnN0IGFycmF5Rm9yRWFjaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLmZvckVhY2gpO1xuICBjb25zdCBhcnJheVBvcCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnBvcCk7XG4gIGNvbnN0IGFycmF5UHVzaCA9IHVuYXBwbHkoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICBjb25zdCBzdHJpbmdUb0xvd2VyQ2FzZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZSk7XG4gIGNvbnN0IHN0cmluZ1RvU3RyaW5nID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nKTtcbiAgY29uc3Qgc3RyaW5nTWF0Y2ggPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUubWF0Y2gpO1xuICBjb25zdCBzdHJpbmdSZXBsYWNlID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuICBjb25zdCBzdHJpbmdJbmRleE9mID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLmluZGV4T2YpO1xuICBjb25zdCBzdHJpbmdUcmltID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLnRyaW0pO1xuICBjb25zdCBvYmplY3RIYXNPd25Qcm9wZXJ0eSA9IHVuYXBwbHkoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4gIGNvbnN0IHJlZ0V4cFRlc3QgPSB1bmFwcGx5KFJlZ0V4cC5wcm90b3R5cGUudGVzdCk7XG4gIGNvbnN0IHR5cGVFcnJvckNyZWF0ZSA9IHVuY29uc3RydWN0KFR5cGVFcnJvcik7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjYWxscyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCBhIHNwZWNpZmllZCB0aGlzQXJnIGFuZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5hcHBseShmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0aGlzQXJnKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBmdW5jdGlvbiB0aGF0IGNvbnN0cnVjdHMgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBiZSB3cmFwcGVkIGFuZCBjYWxsZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiB1bmNvbnN0cnVjdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29uc3RydWN0KGZ1bmMsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQWRkIHByb3BlcnRpZXMgdG8gYSBsb29rdXAgdGFibGVcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldCAtIFRoZSBzZXQgdG8gd2hpY2ggZWxlbWVudHMgd2lsbCBiZSBhZGRlZC5cbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgY29udGFpbmluZyBlbGVtZW50cyB0byBiZSBhZGRlZCB0byB0aGUgc2V0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm1DYXNlRnVuYyAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIHRyYW5zZm9ybSB0aGUgY2FzZSBvZiBlYWNoIGVsZW1lbnQgYmVmb3JlIGFkZGluZyB0byB0aGUgc2V0LlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgbW9kaWZpZWQgc2V0IHdpdGggYWRkZWQgZWxlbWVudHMuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRUb1NldChzZXQsIGFycmF5KSB7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBzdHJpbmdUb0xvd2VyQ2FzZTtcbiAgICBpZiAoc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIC8vIE1ha2UgJ2luJyBhbmQgdHJ1dGh5IGNoZWNrcyBsaWtlIEJvb2xlYW4oc2V0LmNvbnN0cnVjdG9yKVxuICAgICAgLy8gaW5kZXBlbmRlbnQgb2YgYW55IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBPYmplY3QucHJvdG90eXBlLlxuICAgICAgLy8gUHJldmVudCBwcm90b3R5cGUgc2V0dGVycyBmcm9tIGludGVyY2VwdGluZyBzZXQgYXMgYSB0aGlzIHZhbHVlLlxuICAgICAgc2V0UHJvdG90eXBlT2Yoc2V0LCBudWxsKTtcbiAgICB9XG4gICAgbGV0IGwgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgbGV0IGVsZW1lbnQgPSBhcnJheVtsXTtcbiAgICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgbGNFbGVtZW50ID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZWxlbWVudCk7XG4gICAgICAgIGlmIChsY0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAvLyBDb25maWcgcHJlc2V0cyAoZS5nLiB0YWdzLmpzLCBhdHRycy5qcykgYXJlIGltbXV0YWJsZS5cbiAgICAgICAgICBpZiAoIWlzRnJvemVuKGFycmF5KSkge1xuICAgICAgICAgICAgYXJyYXlbbF0gPSBsY0VsZW1lbnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsZW1lbnQgPSBsY0VsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFtlbGVtZW50XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYW4gdXAgYW4gYXJyYXkgdG8gaGFyZGVuIGFnYWluc3QgQ1NQUFxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIFRoZSBhcnJheSB0byBiZSBjbGVhbmVkLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBjbGVhbmVkIHZlcnNpb24gb2YgdGhlIGFycmF5XG4gICAqL1xuICBmdW5jdGlvbiBjbGVhbkFycmF5KGFycmF5KSB7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgaXNQcm9wZXJ0eUV4aXN0ID0gb2JqZWN0SGFzT3duUHJvcGVydHkoYXJyYXksIGluZGV4KTtcbiAgICAgIGlmICghaXNQcm9wZXJ0eUV4aXN0KSB7XG4gICAgICAgIGFycmF5W2luZGV4XSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaGFsbG93IGNsb25lIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBiZSBjbG9uZWQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEEgbmV3IG9iamVjdCB0aGF0IGNvcGllcyB0aGUgb3JpZ2luYWwuXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZShvYmplY3QpIHtcbiAgICBjb25zdCBuZXdPYmplY3QgPSBjcmVhdGUobnVsbCk7XG4gICAgZm9yIChjb25zdCBbcHJvcGVydHksIHZhbHVlXSBvZiBlbnRyaWVzKG9iamVjdCkpIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KG9iamVjdCwgcHJvcGVydHkpO1xuICAgICAgaWYgKGlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gY2xlYW5BcnJheSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsb25lKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdPYmplY3RbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld09iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBhdXRvbWF0aWNhbGx5IGNoZWNrcyBpZiB0aGUgcHJvcCBpcyBmdW5jdGlvbiBvciBnZXR0ZXIgYW5kIGJlaGF2ZXMgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgLSBUaGUgb2JqZWN0IHRvIGxvb2sgdXAgdGhlIGdldHRlciBmdW5jdGlvbiBpbiBpdHMgcHJvdG90eXBlIGNoYWluLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCAtIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB3aGljaCB0byBmaW5kIHRoZSBnZXR0ZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gVGhlIGdldHRlciBmdW5jdGlvbiBmb3VuZCBpbiB0aGUgcHJvdG90eXBlIGNoYWluIG9yIGEgZmFsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBsb29rdXBHZXR0ZXIob2JqZWN0LCBwcm9wKSB7XG4gICAgd2hpbGUgKG9iamVjdCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGVzYyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3ApO1xuICAgICAgaWYgKGRlc2MpIHtcbiAgICAgICAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuIHVuYXBwbHkoZGVzYy5nZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGVzYy52YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBnZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmYWxsYmFja1ZhbHVlKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmYWxsYmFja1ZhbHVlO1xuICB9XG5cbiAgY29uc3QgaHRtbCQxID0gZnJlZXplKFsnYScsICdhYmJyJywgJ2Fjcm9ueW0nLCAnYWRkcmVzcycsICdhcmVhJywgJ2FydGljbGUnLCAnYXNpZGUnLCAnYXVkaW8nLCAnYicsICdiZGknLCAnYmRvJywgJ2JpZycsICdibGluaycsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhbnZhcycsICdjYXB0aW9uJywgJ2NlbnRlcicsICdjaXRlJywgJ2NvZGUnLCAnY29sJywgJ2NvbGdyb3VwJywgJ2NvbnRlbnQnLCAnZGF0YScsICdkYXRhbGlzdCcsICdkZCcsICdkZWNvcmF0b3InLCAnZGVsJywgJ2RldGFpbHMnLCAnZGZuJywgJ2RpYWxvZycsICdkaXInLCAnZGl2JywgJ2RsJywgJ2R0JywgJ2VsZW1lbnQnLCAnZW0nLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9udCcsICdmb290ZXInLCAnZm9ybScsICdoMScsICdoMicsICdoMycsICdoNCcsICdoNScsICdoNicsICdoZWFkJywgJ2hlYWRlcicsICdoZ3JvdXAnLCAnaHInLCAnaHRtbCcsICdpJywgJ2ltZycsICdpbnB1dCcsICdpbnMnLCAna2JkJywgJ2xhYmVsJywgJ2xlZ2VuZCcsICdsaScsICdtYWluJywgJ21hcCcsICdtYXJrJywgJ21hcnF1ZWUnLCAnbWVudScsICdtZW51aXRlbScsICdtZXRlcicsICduYXYnLCAnbm9icicsICdvbCcsICdvcHRncm91cCcsICdvcHRpb24nLCAnb3V0cHV0JywgJ3AnLCAncGljdHVyZScsICdwcmUnLCAncHJvZ3Jlc3MnLCAncScsICdycCcsICdydCcsICdydWJ5JywgJ3MnLCAnc2FtcCcsICdzZWN0aW9uJywgJ3NlbGVjdCcsICdzaGFkb3cnLCAnc21hbGwnLCAnc291cmNlJywgJ3NwYWNlcicsICdzcGFuJywgJ3N0cmlrZScsICdzdHJvbmcnLCAnc3R5bGUnLCAnc3ViJywgJ3N1bW1hcnknLCAnc3VwJywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RlbXBsYXRlJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpbWUnLCAndHInLCAndHJhY2snLCAndHQnLCAndScsICd1bCcsICd2YXInLCAndmlkZW8nLCAnd2JyJ10pO1xuXG4gIC8vIFNWR1xuICBjb25zdCBzdmckMSA9IGZyZWV6ZShbJ3N2ZycsICdhJywgJ2FsdGdseXBoJywgJ2FsdGdseXBoZGVmJywgJ2FsdGdseXBoaXRlbScsICdhbmltYXRlY29sb3InLCAnYW5pbWF0ZW1vdGlvbicsICdhbmltYXRldHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwcGF0aCcsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmaWx0ZXInLCAnZm9udCcsICdnJywgJ2dseXBoJywgJ2dseXBocmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbGluZWFyZ3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbXBhdGgnLCAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsZ3JhZGllbnQnLCAncmVjdCcsICdzdG9wJywgJ3N0eWxlJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0cGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJywgJ3ZpZXcnLCAndmtlcm4nXSk7XG4gIGNvbnN0IHN2Z0ZpbHRlcnMgPSBmcmVlemUoWydmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLCAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJywgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRHJvcFNoYWRvdycsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnXSk7XG5cbiAgLy8gTGlzdCBvZiBTVkcgZWxlbWVudHMgdGhhdCBhcmUgZGlzYWxsb3dlZCBieSBkZWZhdWx0LlxuICAvLyBXZSBzdGlsbCBuZWVkIHRvIGtub3cgdGhlbSBzbyB0aGF0IHdlIGNhbiBkbyBuYW1lc3BhY2VcbiAgLy8gY2hlY2tzIHByb3Blcmx5IGluIGNhc2Ugb25lIHdhbnRzIHRvIGFkZCB0aGVtIHRvXG4gIC8vIGFsbG93LWxpc3QuXG4gIGNvbnN0IHN2Z0Rpc2FsbG93ZWQgPSBmcmVlemUoWydhbmltYXRlJywgJ2NvbG9yLXByb2ZpbGUnLCAnY3Vyc29yJywgJ2Rpc2NhcmQnLCAnZm9udC1mYWNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGF0Y2gnLCAnaGF0Y2hwYXRoJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21pc3NpbmctZ2x5cGgnLCAnc2NyaXB0JywgJ3NldCcsICdzb2xpZGNvbG9yJywgJ3Vua25vd24nLCAndXNlJ10pO1xuICBjb25zdCBtYXRoTWwkMSA9IGZyZWV6ZShbJ21hdGgnLCAnbWVuY2xvc2UnLCAnbWVycm9yJywgJ21mZW5jZWQnLCAnbWZyYWMnLCAnbWdseXBoJywgJ21pJywgJ21sYWJlbGVkdHInLCAnbW11bHRpc2NyaXB0cycsICdtbicsICdtbycsICdtb3ZlcicsICdtcGFkZGVkJywgJ21waGFudG9tJywgJ21yb290JywgJ21yb3cnLCAnbXMnLCAnbXNwYWNlJywgJ21zcXJ0JywgJ21zdHlsZScsICdtc3ViJywgJ21zdXAnLCAnbXN1YnN1cCcsICdtdGFibGUnLCAnbXRkJywgJ210ZXh0JywgJ210cicsICdtdW5kZXInLCAnbXVuZGVyb3ZlcicsICdtcHJlc2NyaXB0cyddKTtcblxuICAvLyBTaW1pbGFybHkgdG8gU1ZHLCB3ZSB3YW50IHRvIGtub3cgYWxsIE1hdGhNTCBlbGVtZW50cyxcbiAgLy8gZXZlbiB0aG9zZSB0aGF0IHdlIGRpc2FsbG93IGJ5IGRlZmF1bHQuXG4gIGNvbnN0IG1hdGhNbERpc2FsbG93ZWQgPSBmcmVlemUoWydtYWN0aW9uJywgJ21hbGlnbmdyb3VwJywgJ21hbGlnbm1hcmsnLCAnbWxvbmdkaXYnLCAnbXNjYXJyaWVzJywgJ21zY2FycnknLCAnbXNncm91cCcsICdtc3RhY2snLCAnbXNsaW5lJywgJ21zcm93JywgJ3NlbWFudGljcycsICdhbm5vdGF0aW9uJywgJ2Fubm90YXRpb24teG1sJywgJ21wcmVzY3JpcHRzJywgJ25vbmUnXSk7XG4gIGNvbnN0IHRleHQgPSBmcmVlemUoWycjdGV4dCddKTtcblxuICBjb25zdCBodG1sID0gZnJlZXplKFsnYWNjZXB0JywgJ2FjdGlvbicsICdhbGlnbicsICdhbHQnLCAnYXV0b2NhcGl0YWxpemUnLCAnYXV0b2NvbXBsZXRlJywgJ2F1dG9waWN0dXJlaW5waWN0dXJlJywgJ2F1dG9wbGF5JywgJ2JhY2tncm91bmQnLCAnYmdjb2xvcicsICdib3JkZXInLCAnY2FwdHVyZScsICdjZWxscGFkZGluZycsICdjZWxsc3BhY2luZycsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3MnLCAnY2xlYXInLCAnY29sb3InLCAnY29scycsICdjb2xzcGFuJywgJ2NvbnRyb2xzJywgJ2NvbnRyb2xzbGlzdCcsICdjb29yZHMnLCAnY3Jvc3NvcmlnaW4nLCAnZGF0ZXRpbWUnLCAnZGVjb2RpbmcnLCAnZGVmYXVsdCcsICdkaXInLCAnZGlzYWJsZWQnLCAnZGlzYWJsZXBpY3R1cmVpbnBpY3R1cmUnLCAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsICdlbmN0eXBlJywgJ2VudGVya2V5aGludCcsICdmYWNlJywgJ2ZvcicsICdoZWFkZXJzJywgJ2hlaWdodCcsICdoaWRkZW4nLCAnaGlnaCcsICdocmVmJywgJ2hyZWZsYW5nJywgJ2lkJywgJ2lucHV0bW9kZScsICdpbnRlZ3JpdHknLCAnaXNtYXAnLCAna2luZCcsICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9hZGluZycsICdsb29wJywgJ2xvdycsICdtYXgnLCAnbWF4bGVuZ3RoJywgJ21lZGlhJywgJ21ldGhvZCcsICdtaW4nLCAnbWlubGVuZ3RoJywgJ211bHRpcGxlJywgJ211dGVkJywgJ25hbWUnLCAnbm9uY2UnLCAnbm9zaGFkZScsICdub3ZhbGlkYXRlJywgJ25vd3JhcCcsICdvcGVuJywgJ29wdGltdW0nLCAncGF0dGVybicsICdwbGFjZWhvbGRlcicsICdwbGF5c2lubGluZScsICdwb3N0ZXInLCAncHJlbG9hZCcsICdwdWJkYXRlJywgJ3JhZGlvZ3JvdXAnLCAncmVhZG9ubHknLCAncmVsJywgJ3JlcXVpcmVkJywgJ3JldicsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd3MnLCAncm93c3BhbicsICdzcGVsbGNoZWNrJywgJ3Njb3BlJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcmNsYW5nJywgJ3N0YXJ0JywgJ3NyYycsICdzcmNzZXQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmluZGV4JywgJ3RpdGxlJywgJ3RyYW5zbGF0ZScsICd0eXBlJywgJ3VzZW1hcCcsICd2YWxpZ24nLCAndmFsdWUnLCAnd2lkdGgnLCAneG1sbnMnLCAnc2xvdCddKTtcbiAgY29uc3Qgc3ZnID0gZnJlZXplKFsnYWNjZW50LWhlaWdodCcsICdhY2N1bXVsYXRlJywgJ2FkZGl0aXZlJywgJ2FsaWdubWVudC1iYXNlbGluZScsICdhc2NlbnQnLCAnYXR0cmlidXRlbmFtZScsICdhdHRyaWJ1dGV0eXBlJywgJ2F6aW11dGgnLCAnYmFzZWZyZXF1ZW5jeScsICdiYXNlbGluZS1zaGlmdCcsICdiZWdpbicsICdiaWFzJywgJ2J5JywgJ2NsYXNzJywgJ2NsaXAnLCAnY2xpcHBhdGh1bml0cycsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NvbG9yJywgJ2NvbG9yLWludGVycG9sYXRpb24nLCAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJywgJ2NvbG9yLXByb2ZpbGUnLCAnY29sb3ItcmVuZGVyaW5nJywgJ2N4JywgJ2N5JywgJ2QnLCAnZHgnLCAnZHknLCAnZGlmZnVzZWNvbnN0YW50JywgJ2RpcmVjdGlvbicsICdkaXNwbGF5JywgJ2Rpdmlzb3InLCAnZHVyJywgJ2VkZ2Vtb2RlJywgJ2VsZXZhdGlvbicsICdlbmQnLCAnZmlsbCcsICdmaWxsLW9wYWNpdHknLCAnZmlsbC1ydWxlJywgJ2ZpbHRlcicsICdmaWx0ZXJ1bml0cycsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvbnQtZmFtaWx5JywgJ2ZvbnQtc2l6ZScsICdmb250LXNpemUtYWRqdXN0JywgJ2ZvbnQtc3RyZXRjaCcsICdmb250LXN0eWxlJywgJ2ZvbnQtdmFyaWFudCcsICdmb250LXdlaWdodCcsICdmeCcsICdmeScsICdnMScsICdnMicsICdnbHlwaC1uYW1lJywgJ2dseXBocmVmJywgJ2dyYWRpZW50dW5pdHMnLCAnZ3JhZGllbnR0cmFuc2Zvcm0nLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2luJywgJ2luMicsICdrJywgJ2sxJywgJ2syJywgJ2szJywgJ2s0JywgJ2tlcm5pbmcnLCAna2V5cG9pbnRzJywgJ2tleXNwbGluZXMnLCAna2V5dGltZXMnLCAnbGFuZycsICdsZW5ndGhhZGp1c3QnLCAnbGV0dGVyLXNwYWNpbmcnLCAna2VybmVsbWF0cml4JywgJ2tlcm5lbHVuaXRsZW5ndGgnLCAnbGlnaHRpbmctY29sb3InLCAnbG9jYWwnLCAnbWFya2VyLWVuZCcsICdtYXJrZXItbWlkJywgJ21hcmtlci1zdGFydCcsICdtYXJrZXJoZWlnaHQnLCAnbWFya2VydW5pdHMnLCAnbWFya2Vyd2lkdGgnLCAnbWFza2NvbnRlbnR1bml0cycsICdtYXNrdW5pdHMnLCAnbWF4JywgJ21hc2snLCAnbWVkaWEnLCAnbWV0aG9kJywgJ21vZGUnLCAnbWluJywgJ25hbWUnLCAnbnVtb2N0YXZlcycsICdvZmZzZXQnLCAnb3BlcmF0b3InLCAnb3BhY2l0eScsICdvcmRlcicsICdvcmllbnQnLCAnb3JpZW50YXRpb24nLCAnb3JpZ2luJywgJ292ZXJmbG93JywgJ3BhaW50LW9yZGVyJywgJ3BhdGgnLCAncGF0aGxlbmd0aCcsICdwYXR0ZXJuY29udGVudHVuaXRzJywgJ3BhdHRlcm50cmFuc2Zvcm0nLCAncGF0dGVybnVuaXRzJywgJ3BvaW50cycsICdwcmVzZXJ2ZWFscGhhJywgJ3ByZXNlcnZlYXNwZWN0cmF0aW8nLCAncHJpbWl0aXZldW5pdHMnLCAncicsICdyeCcsICdyeScsICdyYWRpdXMnLCAncmVmeCcsICdyZWZ5JywgJ3JlcGVhdGNvdW50JywgJ3JlcGVhdGR1cicsICdyZXN0YXJ0JywgJ3Jlc3VsdCcsICdyb3RhdGUnLCAnc2NhbGUnLCAnc2VlZCcsICdzaGFwZS1yZW5kZXJpbmcnLCAnc3BlY3VsYXJjb25zdGFudCcsICdzcGVjdWxhcmV4cG9uZW50JywgJ3NwcmVhZG1ldGhvZCcsICdzdGFydG9mZnNldCcsICdzdGRkZXZpYXRpb24nLCAnc3RpdGNodGlsZXMnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlJywgJ3N0cm9rZS13aWR0aCcsICdzdHlsZScsICdzdXJmYWNlc2NhbGUnLCAnc3lzdGVtbGFuZ3VhZ2UnLCAndGFiaW5kZXgnLCAndGFyZ2V0eCcsICd0YXJnZXR5JywgJ3RyYW5zZm9ybScsICd0cmFuc2Zvcm0tb3JpZ2luJywgJ3RleHQtYW5jaG9yJywgJ3RleHQtZGVjb3JhdGlvbicsICd0ZXh0LXJlbmRlcmluZycsICd0ZXh0bGVuZ3RoJywgJ3R5cGUnLCAndTEnLCAndTInLCAndW5pY29kZScsICd2YWx1ZXMnLCAndmlld2JveCcsICd2aXNpYmlsaXR5JywgJ3ZlcnNpb24nLCAndmVydC1hZHYteScsICd2ZXJ0LW9yaWdpbi14JywgJ3ZlcnQtb3JpZ2luLXknLCAnd2lkdGgnLCAnd29yZC1zcGFjaW5nJywgJ3dyYXAnLCAnd3JpdGluZy1tb2RlJywgJ3hjaGFubmVsc2VsZWN0b3InLCAneWNoYW5uZWxzZWxlY3RvcicsICd4JywgJ3gxJywgJ3gyJywgJ3htbG5zJywgJ3knLCAneTEnLCAneTInLCAneicsICd6b29tYW5kcGFuJ10pO1xuICBjb25zdCBtYXRoTWwgPSBmcmVlemUoWydhY2NlbnQnLCAnYWNjZW50dW5kZXInLCAnYWxpZ24nLCAnYmV2ZWxsZWQnLCAnY2xvc2UnLCAnY29sdW1uc2FsaWduJywgJ2NvbHVtbmxpbmVzJywgJ2NvbHVtbnNwYW4nLCAnZGVub21hbGlnbicsICdkZXB0aCcsICdkaXInLCAnZGlzcGxheScsICdkaXNwbGF5c3R5bGUnLCAnZW5jb2RpbmcnLCAnZmVuY2UnLCAnZnJhbWUnLCAnaGVpZ2h0JywgJ2hyZWYnLCAnaWQnLCAnbGFyZ2VvcCcsICdsZW5ndGgnLCAnbGluZXRoaWNrbmVzcycsICdsc3BhY2UnLCAnbHF1b3RlJywgJ21hdGhiYWNrZ3JvdW5kJywgJ21hdGhjb2xvcicsICdtYXRoc2l6ZScsICdtYXRodmFyaWFudCcsICdtYXhzaXplJywgJ21pbnNpemUnLCAnbW92YWJsZWxpbWl0cycsICdub3RhdGlvbicsICdudW1hbGlnbicsICdvcGVuJywgJ3Jvd2FsaWduJywgJ3Jvd2xpbmVzJywgJ3Jvd3NwYWNpbmcnLCAncm93c3BhbicsICdyc3BhY2UnLCAncnF1b3RlJywgJ3NjcmlwdGxldmVsJywgJ3NjcmlwdG1pbnNpemUnLCAnc2NyaXB0c2l6ZW11bHRpcGxpZXInLCAnc2VsZWN0aW9uJywgJ3NlcGFyYXRvcicsICdzZXBhcmF0b3JzJywgJ3N0cmV0Y2h5JywgJ3N1YnNjcmlwdHNoaWZ0JywgJ3N1cHNjcmlwdHNoaWZ0JywgJ3N5bW1ldHJpYycsICd2b2Zmc2V0JywgJ3dpZHRoJywgJ3htbG5zJ10pO1xuICBjb25zdCB4bWwgPSBmcmVlemUoWyd4bGluazpocmVmJywgJ3htbDppZCcsICd4bGluazp0aXRsZScsICd4bWw6c3BhY2UnLCAneG1sbnM6eGxpbmsnXSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vYmV0dGVyLXJlZ2V4XG4gIGNvbnN0IE1VU1RBQ0hFX0VYUFIgPSBzZWFsKC9cXHtcXHtbXFx3XFxXXSp8W1xcd1xcV10qXFx9XFx9L2dtKTsgLy8gU3BlY2lmeSB0ZW1wbGF0ZSBkZXRlY3Rpb24gcmVnZXggZm9yIFNBRkVfRk9SX1RFTVBMQVRFUyBtb2RlXG4gIGNvbnN0IEVSQl9FWFBSID0gc2VhbCgvPCVbXFx3XFxXXSp8W1xcd1xcV10qJT4vZ20pO1xuICBjb25zdCBUTVBMSVRfRVhQUiA9IHNlYWwoL1xcJHtbXFx3XFxXXSp9L2dtKTtcbiAgY29uc3QgREFUQV9BVFRSID0gc2VhbCgvXmRhdGEtW1xcLVxcdy5cXHUwMEI3LVxcdUZGRkZdLyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgY29uc3QgQVJJQV9BVFRSID0gc2VhbCgvXmFyaWEtW1xcLVxcd10rJC8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IElTX0FMTE9XRURfVVJJID0gc2VhbCgvXig/Oig/Oig/OmZ8aHQpdHBzP3xtYWlsdG98dGVsfGNhbGx0b3xzbXN8Y2lkfHhtcHApOnxbXmEtel18W2EteisuXFwtXSsoPzpbXmEteisuXFwtOl18JCkpL2kgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICApO1xuXG4gIGNvbnN0IElTX1NDUklQVF9PUl9EQVRBID0gc2VhbCgvXig/OlxcdytzY3JpcHR8ZGF0YSk6L2kpO1xuICBjb25zdCBBVFRSX1dISVRFU1BBQ0UgPSBzZWFsKC9bXFx1MDAwMC1cXHUwMDIwXFx1MDBBMFxcdTE2ODBcXHUxODBFXFx1MjAwMC1cXHUyMDI5XFx1MjA1RlxcdTMwMDBdL2cgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb250cm9sLXJlZ2V4XG4gICk7XG5cbiAgY29uc3QgRE9DVFlQRV9OQU1FID0gc2VhbCgvXmh0bWwkL2kpO1xuXG4gIHZhciBFWFBSRVNTSU9OUyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgTVVTVEFDSEVfRVhQUjogTVVTVEFDSEVfRVhQUixcbiAgICBFUkJfRVhQUjogRVJCX0VYUFIsXG4gICAgVE1QTElUX0VYUFI6IFRNUExJVF9FWFBSLFxuICAgIERBVEFfQVRUUjogREFUQV9BVFRSLFxuICAgIEFSSUFfQVRUUjogQVJJQV9BVFRSLFxuICAgIElTX0FMTE9XRURfVVJJOiBJU19BTExPV0VEX1VSSSxcbiAgICBJU19TQ1JJUFRfT1JfREFUQTogSVNfU0NSSVBUX09SX0RBVEEsXG4gICAgQVRUUl9XSElURVNQQUNFOiBBVFRSX1dISVRFU1BBQ0UsXG4gICAgRE9DVFlQRV9OQU1FOiBET0NUWVBFX05BTUVcbiAgfSk7XG5cbiAgY29uc3QgZ2V0R2xvYmFsID0gZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB3aW5kb3c7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuby1vcCBwb2xpY3kgZm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBEb24ndCBleHBvcnQgdGhpcyBmdW5jdGlvbiBvdXRzaWRlIHRoaXMgbW9kdWxlIVxuICAgKiBAcGFyYW0ge1RydXN0ZWRUeXBlUG9saWN5RmFjdG9yeX0gdHJ1c3RlZFR5cGVzIFRoZSBwb2xpY3kgZmFjdG9yeS5cbiAgICogQHBhcmFtIHtIVE1MU2NyaXB0RWxlbWVudH0gcHVyaWZ5SG9zdEVsZW1lbnQgVGhlIFNjcmlwdCBlbGVtZW50IHVzZWQgdG8gbG9hZCBET01QdXJpZnkgKHRvIGRldGVybWluZSBwb2xpY3kgbmFtZSBzdWZmaXgpLlxuICAgKiBAcmV0dXJuIHtUcnVzdGVkVHlwZVBvbGljeX0gVGhlIHBvbGljeSBjcmVhdGVkIChvciBudWxsLCBpZiBUcnVzdGVkIFR5cGVzXG4gICAqIGFyZSBub3Qgc3VwcG9ydGVkIG9yIGNyZWF0aW5nIHRoZSBwb2xpY3kgZmFpbGVkKS5cbiAgICovXG4gIGNvbnN0IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kgPSBmdW5jdGlvbiBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgcHVyaWZ5SG9zdEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIHRydXN0ZWRUeXBlcyAhPT0gJ29iamVjdCcgfHwgdHlwZW9mIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIEFsbG93IHRoZSBjYWxsZXJzIHRvIGNvbnRyb2wgdGhlIHVuaXF1ZSBwb2xpY3kgbmFtZVxuICAgIC8vIGJ5IGFkZGluZyBhIGRhdGEtdHQtcG9saWN5LXN1ZmZpeCB0byB0aGUgc2NyaXB0IGVsZW1lbnQgd2l0aCB0aGUgRE9NUHVyaWZ5LlxuICAgIC8vIFBvbGljeSBjcmVhdGlvbiB3aXRoIGR1cGxpY2F0ZSBuYW1lcyB0aHJvd3MgaW4gVHJ1c3RlZCBUeXBlcy5cbiAgICBsZXQgc3VmZml4ID0gbnVsbDtcbiAgICBjb25zdCBBVFRSX05BTUUgPSAnZGF0YS10dC1wb2xpY3ktc3VmZml4JztcbiAgICBpZiAocHVyaWZ5SG9zdEVsZW1lbnQgJiYgcHVyaWZ5SG9zdEVsZW1lbnQuaGFzQXR0cmlidXRlKEFUVFJfTkFNRSkpIHtcbiAgICAgIHN1ZmZpeCA9IHB1cmlmeUhvc3RFbGVtZW50LmdldEF0dHJpYnV0ZShBVFRSX05BTUUpO1xuICAgIH1cbiAgICBjb25zdCBwb2xpY3lOYW1lID0gJ2RvbXB1cmlmeScgKyAoc3VmZml4ID8gJyMnICsgc3VmZml4IDogJycpO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzLmNyZWF0ZVBvbGljeShwb2xpY3lOYW1lLCB7XG4gICAgICAgIGNyZWF0ZUhUTUwoaHRtbCkge1xuICAgICAgICAgIHJldHVybiBodG1sO1xuICAgICAgICB9LFxuICAgICAgICBjcmVhdGVTY3JpcHRVUkwoc2NyaXB0VXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHNjcmlwdFVybDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgLy8gUG9saWN5IGNyZWF0aW9uIGZhaWxlZCAobW9zdCBsaWtlbHkgYW5vdGhlciBET01QdXJpZnkgc2NyaXB0IGhhc1xuICAgICAgLy8gYWxyZWFkeSBydW4pLiBTa2lwIGNyZWF0aW5nIHRoZSBwb2xpY3ksIGFzIHRoaXMgd2lsbCBvbmx5IGNhdXNlIGVycm9yc1xuICAgICAgLy8gaWYgVFQgYXJlIGVuZm9yY2VkLlxuICAgICAgY29uc29sZS53YXJuKCdUcnVzdGVkVHlwZXMgcG9saWN5ICcgKyBwb2xpY3lOYW1lICsgJyBjb3VsZCBub3QgYmUgY3JlYXRlZC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfTtcbiAgZnVuY3Rpb24gY3JlYXRlRE9NUHVyaWZ5KCkge1xuICAgIGxldCB3aW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGdldEdsb2JhbCgpO1xuICAgIGNvbnN0IERPTVB1cmlmeSA9IHJvb3QgPT4gY3JlYXRlRE9NUHVyaWZ5KHJvb3QpO1xuXG4gICAgLyoqXG4gICAgICogVmVyc2lvbiBsYWJlbCwgZXhwb3NlZCBmb3IgZWFzaWVyIGNoZWNrc1xuICAgICAqIGlmIERPTVB1cmlmeSBpcyB1cCB0byBkYXRlIG9yIG5vdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS52ZXJzaW9uID0gJzMuMC45JztcblxuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGVsZW1lbnRzIHRoYXQgRE9NUHVyaWZ5IHJlbW92ZWQgZHVyaW5nIHNhbml0YXRpb24uXG4gICAgICogRW1wdHkgaWYgbm90aGluZyB3YXMgcmVtb3ZlZC5cbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuICAgIGlmICghd2luZG93IHx8ICF3aW5kb3cuZG9jdW1lbnQgfHwgd2luZG93LmRvY3VtZW50Lm5vZGVUeXBlICE9PSA5KSB7XG4gICAgICAvLyBOb3QgcnVubmluZyBpbiBhIGJyb3dzZXIsIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAvLyBzbyB0aGF0IHlvdSBjYW4gcGFzcyB5b3VyIG93biBXaW5kb3dcbiAgICAgIERPTVB1cmlmeS5pc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgICB9XG4gICAgbGV0IHtcbiAgICAgIGRvY3VtZW50XG4gICAgfSA9IHdpbmRvdztcbiAgICBjb25zdCBvcmlnaW5hbERvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgY3VycmVudFNjcmlwdCA9IG9yaWdpbmFsRG9jdW1lbnQuY3VycmVudFNjcmlwdDtcbiAgICBjb25zdCB7XG4gICAgICBEb2N1bWVudEZyYWdtZW50LFxuICAgICAgSFRNTFRlbXBsYXRlRWxlbWVudCxcbiAgICAgIE5vZGUsXG4gICAgICBFbGVtZW50LFxuICAgICAgTm9kZUZpbHRlcixcbiAgICAgIE5hbWVkTm9kZU1hcCA9IHdpbmRvdy5OYW1lZE5vZGVNYXAgfHwgd2luZG93Lk1vek5hbWVkQXR0ck1hcCxcbiAgICAgIEhUTUxGb3JtRWxlbWVudCxcbiAgICAgIERPTVBhcnNlcixcbiAgICAgIHRydXN0ZWRUeXBlc1xuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3QgRWxlbWVudFByb3RvdHlwZSA9IEVsZW1lbnQucHJvdG90eXBlO1xuICAgIGNvbnN0IGNsb25lTm9kZSA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2xvbmVOb2RlJyk7XG4gICAgY29uc3QgZ2V0TmV4dFNpYmxpbmcgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ25leHRTaWJsaW5nJyk7XG4gICAgY29uc3QgZ2V0Q2hpbGROb2RlcyA9IGxvb2t1cEdldHRlcihFbGVtZW50UHJvdG90eXBlLCAnY2hpbGROb2RlcycpO1xuICAgIGNvbnN0IGdldFBhcmVudE5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ3BhcmVudE5vZGUnKTtcblxuICAgIC8vIEFzIHBlciBpc3N1ZSAjNDcsIHRoZSB3ZWItY29tcG9uZW50cyByZWdpc3RyeSBpcyBpbmhlcml0ZWQgYnkgYVxuICAgIC8vIG5ldyBkb2N1bWVudCBjcmVhdGVkIHZpYSBjcmVhdGVIVE1MRG9jdW1lbnQuIEFzIHBlciB0aGUgc3BlY1xuICAgIC8vIChodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJjb21wb25lbnRzL3NwZWMvY3VzdG9tLyNjcmVhdGluZy1hbmQtcGFzc2luZy1yZWdpc3RyaWVzKVxuICAgIC8vIGEgbmV3IGVtcHR5IHJlZ2lzdHJ5IGlzIHVzZWQgd2hlbiBjcmVhdGluZyBhIHRlbXBsYXRlIGNvbnRlbnRzIG93bmVyXG4gICAgLy8gZG9jdW1lbnQsIHNvIHdlIHVzZSB0aGF0IGFzIG91ciBwYXJlbnQgZG9jdW1lbnQgdG8gZW5zdXJlIG5vdGhpbmdcbiAgICAvLyBpcyBpbmhlcml0ZWQuXG4gICAgaWYgKHR5cGVvZiBIVE1MVGVtcGxhdGVFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICBpZiAodGVtcGxhdGUuY29udGVudCAmJiB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQgPSB0ZW1wbGF0ZS5jb250ZW50Lm93bmVyRG9jdW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCB0cnVzdGVkVHlwZXNQb2xpY3k7XG4gICAgbGV0IGVtcHR5SFRNTCA9ICcnO1xuICAgIGNvbnN0IHtcbiAgICAgIGltcGxlbWVudGF0aW9uLFxuICAgICAgY3JlYXRlTm9kZUl0ZXJhdG9yLFxuICAgICAgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lXG4gICAgfSA9IGRvY3VtZW50O1xuICAgIGNvbnN0IHtcbiAgICAgIGltcG9ydE5vZGVcbiAgICB9ID0gb3JpZ2luYWxEb2N1bWVudDtcbiAgICBsZXQgaG9va3MgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEV4cG9zZSB3aGV0aGVyIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBydW5uaW5nIHRoZSBmdWxsIERPTVB1cmlmeS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZW50cmllcyA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZ2V0UGFyZW50Tm9kZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpbXBsZW1lbnRhdGlvbiAmJiBpbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQgIT09IHVuZGVmaW5lZDtcbiAgICBjb25zdCB7XG4gICAgICBNVVNUQUNIRV9FWFBSLFxuICAgICAgRVJCX0VYUFIsXG4gICAgICBUTVBMSVRfRVhQUixcbiAgICAgIERBVEFfQVRUUixcbiAgICAgIEFSSUFfQVRUUixcbiAgICAgIElTX1NDUklQVF9PUl9EQVRBLFxuICAgICAgQVRUUl9XSElURVNQQUNFXG4gICAgfSA9IEVYUFJFU1NJT05TO1xuICAgIGxldCB7XG4gICAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkkkMVxuICAgIH0gPSBFWFBSRVNTSU9OUztcblxuICAgIC8qKlxuICAgICAqIFdlIGNvbnNpZGVyIHRoZSBlbGVtZW50cyBhbmQgYXR0cmlidXRlcyBiZWxvdyB0byBiZSBzYWZlLiBJZGVhbGx5XG4gICAgICogZG9uJ3QgYWRkIGFueSBuZXcgb25lcyBidXQgZmVlbCBmcmVlIHRvIHJlbW92ZSB1bndhbnRlZCBvbmVzLlxuICAgICAqL1xuXG4gICAgLyogYWxsb3dlZCBlbGVtZW50IG5hbWVzICovXG4gICAgbGV0IEFMTE9XRURfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9BTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLmh0bWwkMSwgLi4uc3ZnJDEsIC4uLnN2Z0ZpbHRlcnMsIC4uLm1hdGhNbCQxLCAuLi50ZXh0XSk7XG5cbiAgICAvKiBBbGxvd2VkIGF0dHJpYnV0ZSBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX0FUVFIgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9BVFRSID0gYWRkVG9TZXQoe30sIFsuLi5odG1sLCAuLi5zdmcsIC4uLm1hdGhNbCwgLi4ueG1sXSk7XG5cbiAgICAvKlxuICAgICAqIENvbmZpZ3VyZSBob3cgRE9NUFVyaWZ5IHNob3VsZCBoYW5kbGUgY3VzdG9tIGVsZW1lbnRzIGFuZCB0aGVpciBhdHRyaWJ1dGVzIGFzIHdlbGwgYXMgY3VzdG9taXplZCBidWlsdC1pbiBlbGVtZW50cy5cbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSB0YWdOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGN1c3RvbSBlbGVtZW50cylcbiAgICAgKiBAcHJvcGVydHkge1JlZ0V4cHxGdW5jdGlvbnxudWxsfSBhdHRyaWJ1dGVOYW1lQ2hlY2sgb25lIG9mIFtudWxsLCByZWdleFBhdHRlcm4sIHByZWRpY2F0ZV0uIERlZmF1bHQ6IGBudWxsYCAoZGlzYWxsb3cgYW55IGF0dHJpYnV0ZXMgbm90IG9uIHRoZSBhbGxvdyBsaXN0KVxuICAgICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzIGFsbG93IGN1c3RvbSBlbGVtZW50cyBkZXJpdmVkIGZyb20gYnVpbHQtaW5zIGlmIHRoZXkgcGFzcyBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2suIERlZmF1bHQ6IGBmYWxzZWAuXG4gICAgICovXG4gICAgbGV0IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gT2JqZWN0LnNlYWwoY3JlYXRlKG51bGwsIHtcbiAgICAgIHRhZ05hbWVDaGVjazoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiB0YWdzIChvdmVycmlkZXMgQUxMT1dFRF9UQUdTL0FERF9UQUdTKSAqL1xuICAgIGxldCBGT1JCSURfVEFHUyA9IG51bGw7XG5cbiAgICAvKiBFeHBsaWNpdGx5IGZvcmJpZGRlbiBhdHRyaWJ1dGVzIChvdmVycmlkZXMgQUxMT1dFRF9BVFRSL0FERF9BVFRSKSAqL1xuICAgIGxldCBGT1JCSURfQVRUUiA9IG51bGw7XG5cbiAgICAvKiBEZWNpZGUgaWYgQVJJQSBhdHRyaWJ1dGVzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX0FSSUFfQVRUUiA9IHRydWU7XG5cbiAgICAvKiBEZWNpZGUgaWYgY3VzdG9tIGRhdGEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19EQVRBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIHVua25vd24gcHJvdG9jb2xzIGFyZSBva2F5ICovXG4gICAgbGV0IEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgc2VsZi1jbG9zaW5nIHRhZ3MgaW4gYXR0cmlidXRlcyBhcmUgYWxsb3dlZC5cbiAgICAgKiBVc3VhbGx5IHJlbW92ZWQgZHVlIHRvIGEgbVhTUyBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgbGV0IEFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiA9IHRydWU7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIHNhZmUgZm9yIGNvbW1vbiB0ZW1wbGF0ZSBlbmdpbmVzLlxuICAgICAqIFRoaXMgbWVhbnMsIERPTVB1cmlmeSByZW1vdmVzIGRhdGEgYXR0cmlidXRlcywgbXVzdGFjaGVzIGFuZCBFUkJcbiAgICAgKi9cbiAgICBsZXQgU0FGRV9GT1JfVEVNUExBVEVTID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgZG9jdW1lbnQgd2l0aCA8aHRtbD4uLi4gc2hvdWxkIGJlIHJldHVybmVkICovXG4gICAgbGV0IFdIT0xFX0RPQ1VNRU5UID0gZmFsc2U7XG5cbiAgICAvKiBUcmFjayB3aGV0aGVyIGNvbmZpZyBpcyBhbHJlYWR5IHNldCBvbiB0aGlzIGluc3RhbmNlIG9mIERPTVB1cmlmeS4gKi9cbiAgICBsZXQgU0VUX0NPTkZJRyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGFsbCBlbGVtZW50cyAoZS5nLiBzdHlsZSwgc2NyaXB0KSBtdXN0IGJlIGNoaWxkcmVuIG9mXG4gICAgICogZG9jdW1lbnQuYm9keS4gQnkgZGVmYXVsdCwgYnJvd3NlcnMgbWlnaHQgbW92ZSB0aGVtIHRvIGRvY3VtZW50LmhlYWQgKi9cbiAgICBsZXQgRk9SQ0VfQk9EWSA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGEgRE9NIGBIVE1MQm9keUVsZW1lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkuXG4gICAgICogSWYgYFdIT0xFX0RPQ1VNRU5UYCBpcyBlbmFibGVkIGEgYEhUTUxIdG1sRWxlbWVudGAgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkXG4gICAgICovXG4gICAgbGV0IFJFVFVSTl9ET00gPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgRG9jdW1lbnRGcmFnbWVudGAgc2hvdWxkIGJlIHJldHVybmVkLCBpbnN0ZWFkIG9mIGEgaHRtbFxuICAgICAqIHN0cmluZyAgKG9yIGEgVHJ1c3RlZEhUTUwgb2JqZWN0IGlmIFRydXN0ZWQgVHlwZXMgYXJlIHN1cHBvcnRlZCkgKi9cbiAgICBsZXQgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJ5IHRvIHJldHVybiBhIFRydXN0ZWQgVHlwZSBvYmplY3QgaW5zdGVhZCBvZiBhIHN0cmluZywgcmV0dXJuIGEgc3RyaW5nIGluXG4gICAgICogY2FzZSBUcnVzdGVkIFR5cGVzIGFyZSBub3Qgc3VwcG9ydGVkICAqL1xuICAgIGxldCBSRVRVUk5fVFJVU1RFRF9UWVBFID0gZmFsc2U7XG5cbiAgICAvKiBPdXRwdXQgc2hvdWxkIGJlIGZyZWUgZnJvbSBET00gY2xvYmJlcmluZyBhdHRhY2tzP1xuICAgICAqIFRoaXMgc2FuaXRpemVzIG1hcmt1cHMgbmFtZWQgd2l0aCBjb2xsaWRpbmcsIGNsb2JiZXJhYmxlIGJ1aWx0LWluIERPTSBBUElzLlxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9ET00gPSB0cnVlO1xuXG4gICAgLyogQWNoaWV2ZSBmdWxsIERPTSBDbG9iYmVyaW5nIHByb3RlY3Rpb24gYnkgaXNvbGF0aW5nIHRoZSBuYW1lc3BhY2Ugb2YgbmFtZWRcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBKUyB2YXJpYWJsZXMsIG1pdGlnYXRpbmcgYXR0YWNrcyB0aGF0IGFidXNlIHRoZSBIVE1ML0RPTSBzcGVjIHJ1bGVzLlxuICAgICAqXG4gICAgICogSFRNTC9ET00gc3BlYyBydWxlcyB0aGF0IGVuYWJsZSBET00gQ2xvYmJlcmluZzpcbiAgICAgKiAgIC0gTmFtZWQgQWNjZXNzIG9uIFdpbmRvdyAowqc3LjMuMylcbiAgICAgKiAgIC0gRE9NIFRyZWUgQWNjZXNzb3JzICjCpzMuMS41KVxuICAgICAqICAgLSBGb3JtIEVsZW1lbnQgUGFyZW50LUNoaWxkIFJlbGF0aW9ucyAowqc0LjEwLjMpXG4gICAgICogICAtIElmcmFtZSBzcmNkb2MgLyBOZXN0ZWQgV2luZG93UHJveGllcyAowqc0LjguNSlcbiAgICAgKiAgIC0gSFRNTENvbGxlY3Rpb24gKMKnNC4yLjEwLjIpXG4gICAgICpcbiAgICAgKiBOYW1lc3BhY2UgaXNvbGF0aW9uIGlzIGltcGxlbWVudGVkIGJ5IHByZWZpeGluZyBgaWRgIGFuZCBgbmFtZWAgYXR0cmlidXRlc1xuICAgICAqIHdpdGggYSBjb25zdGFudCBzdHJpbmcsIGkuZS4sIGB1c2VyLWNvbnRlbnQtYFxuICAgICAqL1xuICAgIGxldCBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGZhbHNlO1xuICAgIGNvbnN0IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCA9ICd1c2VyLWNvbnRlbnQtJztcblxuICAgIC8qIEtlZXAgZWxlbWVudCBjb250ZW50IHdoZW4gcmVtb3ZpbmcgZWxlbWVudD8gKi9cbiAgICBsZXQgS0VFUF9DT05URU5UID0gdHJ1ZTtcblxuICAgIC8qIElmIGEgYE5vZGVgIGlzIHBhc3NlZCB0byBzYW5pdGl6ZSgpLCB0aGVuIHBlcmZvcm1zIHNhbml0aXphdGlvbiBpbi1wbGFjZSBpbnN0ZWFkXG4gICAgICogb2YgaW1wb3J0aW5nIGl0IGludG8gYSBuZXcgRG9jdW1lbnQgYW5kIHJldHVybmluZyBhIHNhbml0aXplZCBjb3B5ICovXG4gICAgbGV0IElOX1BMQUNFID0gZmFsc2U7XG5cbiAgICAvKiBBbGxvdyB1c2FnZSBvZiBwcm9maWxlcyBsaWtlIGh0bWwsIHN2ZyBhbmQgbWF0aE1sICovXG4gICAgbGV0IFVTRV9QUk9GSUxFUyA9IHt9O1xuXG4gICAgLyogVGFncyB0byBpZ25vcmUgY29udGVudCBvZiB3aGVuIEtFRVBfQ09OVEVOVCBpcyB0cnVlICovXG4gICAgbGV0IEZPUkJJRF9DT05URU5UUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9GT1JCSURfQ09OVEVOVFMgPSBhZGRUb1NldCh7fSwgWydhbm5vdGF0aW9uLXhtbCcsICdhdWRpbycsICdjb2xncm91cCcsICdkZXNjJywgJ2ZvcmVpZ25vYmplY3QnLCAnaGVhZCcsICdpZnJhbWUnLCAnbWF0aCcsICdtaScsICdtbicsICdtbycsICdtcycsICdtdGV4dCcsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ25vc2NyaXB0JywgJ3BsYWludGV4dCcsICdzY3JpcHQnLCAnc3R5bGUnLCAnc3ZnJywgJ3RlbXBsYXRlJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3ZpZGVvJywgJ3htcCddKTtcblxuICAgIC8qIFRhZ3MgdGhhdCBhcmUgc2FmZSBmb3IgZGF0YTogVVJJcyAqL1xuICAgIGxldCBEQVRBX1VSSV9UQUdTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0RBVEFfVVJJX1RBR1MgPSBhZGRUb1NldCh7fSwgWydhdWRpbycsICd2aWRlbycsICdpbWcnLCAnc291cmNlJywgJ2ltYWdlJywgJ3RyYWNrJ10pO1xuXG4gICAgLyogQXR0cmlidXRlcyBzYWZlIGZvciB2YWx1ZXMgbGlrZSBcImphdmFzY3JpcHQ6XCIgKi9cbiAgICBsZXQgVVJJX1NBRkVfQVRUUklCVVRFUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTID0gYWRkVG9TZXQoe30sIFsnYWx0JywgJ2NsYXNzJywgJ2ZvcicsICdpZCcsICdsYWJlbCcsICduYW1lJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncm9sZScsICdzdW1tYXJ5JywgJ3RpdGxlJywgJ3ZhbHVlJywgJ3N0eWxlJywgJ3htbG5zJ10pO1xuICAgIGNvbnN0IE1BVEhNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCc7XG4gICAgY29uc3QgU1ZHX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgY29uc3QgSFRNTF9OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG4gICAgLyogRG9jdW1lbnQgbmFtZXNwYWNlICovXG4gICAgbGV0IE5BTUVTUEFDRSA9IEhUTUxfTkFNRVNQQUNFO1xuICAgIGxldCBJU19FTVBUWV9JTlBVVCA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3dlZCBYSFRNTCtYTUwgbmFtZXNwYWNlcyAqL1xuICAgIGxldCBBTExPV0VEX05BTUVTUEFDRVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9OQU1FU1BBQ0VTID0gYWRkVG9TZXQoe30sIFtNQVRITUxfTkFNRVNQQUNFLCBTVkdfTkFNRVNQQUNFLCBIVE1MX05BTUVTUEFDRV0sIHN0cmluZ1RvU3RyaW5nKTtcblxuICAgIC8qIFBhcnNpbmcgb2Ygc3RyaWN0IFhIVE1MIGRvY3VtZW50cyAqL1xuICAgIGxldCBQQVJTRVJfTUVESUFfVFlQRSA9IG51bGw7XG4gICAgY29uc3QgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUyA9IFsnYXBwbGljYXRpb24veGh0bWwreG1sJywgJ3RleHQvaHRtbCddO1xuICAgIGNvbnN0IERFRkFVTFRfUEFSU0VSX01FRElBX1RZUEUgPSAndGV4dC9odG1sJztcbiAgICBsZXQgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBudWxsO1xuXG4gICAgLyogS2VlcCBhIHJlZmVyZW5jZSB0byBjb25maWcgdG8gcGFzcyB0byBob29rcyAqL1xuICAgIGxldCBDT05GSUcgPSBudWxsO1xuXG4gICAgLyogSWRlYWxseSwgZG8gbm90IHRvdWNoIGFueXRoaW5nIGJlbG93IHRoaXMgbGluZSAqL1xuICAgIC8qIF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18gKi9cblxuICAgIGNvbnN0IGZvcm1FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGNvbnN0IGlzUmVnZXhPckZ1bmN0aW9uID0gZnVuY3Rpb24gaXNSZWdleE9yRnVuY3Rpb24odGVzdFZhbHVlKSB7XG4gICAgICByZXR1cm4gdGVzdFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwIHx8IHRlc3RWYWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcGFyc2VDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gY2ZnIG9wdGlvbmFsIGNvbmZpZyBsaXRlcmFsXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfcGFyc2VDb25maWcgPSBmdW5jdGlvbiBfcGFyc2VDb25maWcoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIGlmIChDT05GSUcgJiYgQ09ORklHID09PSBjZmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSB0YW1wZXJpbmcgKi9cbiAgICAgIGlmICghY2ZnIHx8IHR5cGVvZiBjZmcgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNmZyA9IHt9O1xuICAgICAgfVxuXG4gICAgICAvKiBTaGllbGQgY29uZmlndXJhdGlvbiBvYmplY3QgZnJvbSBwcm90b3R5cGUgcG9sbHV0aW9uICovXG4gICAgICBjZmcgPSBjbG9uZShjZmcpO1xuICAgICAgUEFSU0VSX01FRElBX1RZUEUgPVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICBTVVBQT1JURURfUEFSU0VSX01FRElBX1RZUEVTLmluZGV4T2YoY2ZnLlBBUlNFUl9NRURJQV9UWVBFKSA9PT0gLTEgPyBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFIDogY2ZnLlBBUlNFUl9NRURJQV9UWVBFO1xuXG4gICAgICAvLyBIVE1MIHRhZ3MgYW5kIGF0dHJpYnV0ZXMgYXJlIG5vdCBjYXNlLXNlbnNpdGl2ZSwgY29udmVydGluZyB0byBsb3dlcmNhc2UuIEtlZXBpbmcgWEhUTUwgYXMgaXMuXG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyA9IFBBUlNFUl9NRURJQV9UWVBFID09PSAnYXBwbGljYXRpb24veGh0bWwreG1sJyA/IHN0cmluZ1RvU3RyaW5nIDogc3RyaW5nVG9Mb3dlckNhc2U7XG5cbiAgICAgIC8qIFNldCBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIEFMTE9XRURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfVEFHUycpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9UQUdTO1xuICAgICAgQUxMT1dFRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9BVFRSJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9BTExPV0VEX0FUVFI7XG4gICAgICBBTExPV0VEX05BTUVTUEFDRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX05BTUVTUEFDRVMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9OQU1FU1BBQ0VTLCBzdHJpbmdUb1N0cmluZykgOiBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUztcbiAgICAgIFVSSV9TQUZFX0FUVFJJQlVURVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfVVJJX1NBRkVfQVRUUicpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX1VSSV9TQUZFX0FUVFIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9VUklfU0FGRV9BVFRSSUJVVEVTO1xuICAgICAgREFUQV9VUklfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FERF9EQVRBX1VSSV9UQUdTJykgPyBhZGRUb1NldChjbG9uZShERUZBVUxUX0RBVEFfVVJJX1RBR1MpLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIGNmZy5BRERfREFUQV9VUklfVEFHUyxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICB0cmFuc2Zvcm1DYXNlRnVuYyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgOiBERUZBVUxUX0RBVEFfVVJJX1RBR1M7XG4gICAgICBGT1JCSURfQ09OVEVOVFMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQ09OVEVOVFMnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0ZPUkJJRF9DT05URU5UUztcbiAgICAgIEZPUkJJRF9UQUdTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX1RBR1MsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgRk9SQklEX0FUVFIgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdGT1JCSURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5GT1JCSURfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpIDoge307XG4gICAgICBVU0VfUFJPRklMRVMgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdVU0VfUFJPRklMRVMnKSA/IGNmZy5VU0VfUFJPRklMRVMgOiBmYWxzZTtcbiAgICAgIEFMTE9XX0FSSUFfQVRUUiA9IGNmZy5BTExPV19BUklBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGNmZy5BTExPV19EQVRBX0FUVFIgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIEFMTE9XX1VOS05PV05fUFJPVE9DT0xTID0gY2ZnLkFMTE9XX1VOS05PV05fUFJPVE9DT0xTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSBjZmcuQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQUZFX0ZPUl9URU1QTEFURVMgPSBjZmcuU0FGRV9GT1JfVEVNUExBVEVTIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBXSE9MRV9ET0NVTUVOVCA9IGNmZy5XSE9MRV9ET0NVTUVOVCB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTSA9IGNmZy5SRVRVUk5fRE9NIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fRE9NX0ZSQUdNRU5UID0gY2ZnLlJFVFVSTl9ET01fRlJBR01FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9UUlVTVEVEX1RZUEUgPSBjZmcuUkVUVVJOX1RSVVNURURfVFlQRSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgRk9SQ0VfQk9EWSA9IGNmZy5GT1JDRV9CT0RZIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBTQU5JVElaRV9ET00gPSBjZmcuU0FOSVRJWkVfRE9NICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBTQU5JVElaRV9OQU1FRF9QUk9QUyA9IGNmZy5TQU5JVElaRV9OQU1FRF9QUk9QUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgS0VFUF9DT05URU5UID0gY2ZnLktFRVBfQ09OVEVOVCAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgSU5fUExBQ0UgPSBjZmcuSU5fUExBQ0UgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIElTX0FMTE9XRURfVVJJJDEgPSBjZmcuQUxMT1dFRF9VUklfUkVHRVhQIHx8IElTX0FMTE9XRURfVVJJO1xuICAgICAgTkFNRVNQQUNFID0gY2ZnLk5BTUVTUEFDRSB8fCBIVE1MX05BTUVTUEFDRTtcbiAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HIHx8IHt9O1xuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiBpc1JlZ2V4T3JGdW5jdGlvbihjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKSkge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyAmJiB0eXBlb2YgY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHM7XG4gICAgICB9XG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgIEFMTE9XX0RBVEFfQVRUUiA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgUkVUVVJOX0RPTSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFBhcnNlIHByb2ZpbGUgaW5mbyAqL1xuICAgICAgaWYgKFVTRV9QUk9GSUxFUykge1xuICAgICAgICBBTExPV0VEX1RBR1MgPSBhZGRUb1NldCh7fSwgdGV4dCk7XG4gICAgICAgIEFMTE9XRURfQVRUUiA9IFtdO1xuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLmh0bWwgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGh0bWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBodG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgc3ZnKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmdGaWx0ZXJzID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBzdmdGaWx0ZXJzKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMubWF0aE1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBtYXRoTWwkMSk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBtYXRoTWwpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBNZXJnZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgKi9cbiAgICAgIGlmIChjZmcuQUREX1RBR1MpIHtcbiAgICAgICAgaWYgKEFMTE9XRURfVEFHUyA9PT0gREVGQVVMVF9BTExPV0VEX1RBR1MpIHtcbiAgICAgICAgICBBTExPV0VEX1RBR1MgPSBjbG9uZShBTExPV0VEX1RBR1MpO1xuICAgICAgICB9XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgY2ZnLkFERF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkFERF9BVFRSKSB7XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIgPT09IERFRkFVTFRfQUxMT1dFRF9BVFRSKSB7XG4gICAgICAgICAgQUxMT1dFRF9BVFRSID0gY2xvbmUoQUxMT1dFRF9BVFRSKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIGNmZy5BRERfQVRUUiwgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfVVJJX1NBRkVfQVRUUikge1xuICAgICAgICBhZGRUb1NldChVUklfU0FGRV9BVFRSSUJVVEVTLCBjZmcuQUREX1VSSV9TQUZFX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgIGlmIChGT1JCSURfQ09OVEVOVFMgPT09IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTKSB7XG4gICAgICAgICAgRk9SQklEX0NPTlRFTlRTID0gY2xvbmUoRk9SQklEX0NPTlRFTlRTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChGT1JCSURfQ09OVEVOVFMsIGNmZy5GT1JCSURfQ09OVEVOVFMsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cblxuICAgICAgLyogQWRkICN0ZXh0IGluIGNhc2UgS0VFUF9DT05URU5UIGlzIHNldCB0byB0cnVlICovXG4gICAgICBpZiAoS0VFUF9DT05URU5UKSB7XG4gICAgICAgIEFMTE9XRURfVEFHU1snI3RleHQnXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCBodG1sLCBoZWFkIGFuZCBib2R5IHRvIEFMTE9XRURfVEFHUyBpbiBjYXNlIFdIT0xFX0RPQ1VNRU5UIGlzIHRydWUgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCkge1xuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIFsnaHRtbCcsICdoZWFkJywgJ2JvZHknXSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCB0Ym9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSB0YWJsZXMgYXJlIHBlcm1pdHRlZCwgc2VlICMyODYsICMzNjUgKi9cbiAgICAgIGlmIChBTExPV0VEX1RBR1MudGFibGUpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ3Rib2R5J10pO1xuICAgICAgICBkZWxldGUgRk9SQklEX1RBR1MudGJvZHk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZUhUTUwgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ1RSVVNURURfVFlQRVNfUE9MSUNZIGNvbmZpZ3VyYXRpb24gb3B0aW9uIG11c3QgcHJvdmlkZSBhIFwiY3JlYXRlSFRNTFwiIGhvb2suJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjZmcuVFJVU1RFRF9UWVBFU19QT0xJQ1kuY3JlYXRlU2NyaXB0VVJMICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZVNjcmlwdFVSTFwiIGhvb2suJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdmVyd3JpdGUgZXhpc3RpbmcgVHJ1c3RlZFR5cGVzIHBvbGljeS5cbiAgICAgICAgdHJ1c3RlZFR5cGVzUG9saWN5ID0gY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZO1xuXG4gICAgICAgIC8vIFNpZ24gbG9jYWwgdmFyaWFibGVzIHJlcXVpcmVkIGJ5IGBzYW5pdGl6ZWAuXG4gICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVuaW5pdGlhbGl6ZWQgcG9saWN5LCBhdHRlbXB0IHRvIGluaXRpYWxpemUgdGhlIGludGVybmFsIGRvbXB1cmlmeSBwb2xpY3kuXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IF9jcmVhdGVUcnVzdGVkVHlwZXNQb2xpY3kodHJ1c3RlZFR5cGVzLCBjdXJyZW50U2NyaXB0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGNyZWF0aW5nIHRoZSBpbnRlcm5hbCBwb2xpY3kgc3VjY2VlZGVkIHNpZ24gaW50ZXJuYWwgdmFyaWFibGVzLlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ICE9PSBudWxsICYmIHR5cGVvZiBlbXB0eUhUTUwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZW1wdHlIVE1MID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoJycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXZlbnQgZnVydGhlciBtYW5pcHVsYXRpb24gb2YgY29uZmlndXJhdGlvbi5cbiAgICAgIC8vIE5vdCBhdmFpbGFibGUgaW4gSUU4LCBTYWZhcmkgNSwgZXRjLlxuICAgICAgaWYgKGZyZWV6ZSkge1xuICAgICAgICBmcmVlemUoY2ZnKTtcbiAgICAgIH1cbiAgICAgIENPTkZJRyA9IGNmZztcbiAgICB9O1xuICAgIGNvbnN0IE1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ21pJywgJ21vJywgJ21uJywgJ21zJywgJ210ZXh0J10pO1xuICAgIGNvbnN0IEhUTUxfSU5URUdSQVRJT05fUE9JTlRTID0gYWRkVG9TZXQoe30sIFsnZm9yZWlnbm9iamVjdCcsICdkZXNjJywgJ3RpdGxlJywgJ2Fubm90YXRpb24teG1sJ10pO1xuXG4gICAgLy8gQ2VydGFpbiBlbGVtZW50cyBhcmUgYWxsb3dlZCBpbiBib3RoIFNWRyBhbmQgSFRNTFxuICAgIC8vIG5hbWVzcGFjZS4gV2UgbmVlZCB0byBzcGVjaWZ5IHRoZW0gZXhwbGljaXRseVxuICAgIC8vIHNvIHRoYXQgdGhleSBkb24ndCBnZXQgZXJyb25lb3VzbHkgZGVsZXRlZCBmcm9tXG4gICAgLy8gSFRNTCBuYW1lc3BhY2UuXG4gICAgY29uc3QgQ09NTU9OX1NWR19BTkRfSFRNTF9FTEVNRU5UUyA9IGFkZFRvU2V0KHt9LCBbJ3RpdGxlJywgJ3N0eWxlJywgJ2ZvbnQnLCAnYScsICdzY3JpcHQnXSk7XG5cbiAgICAvKiBLZWVwIHRyYWNrIG9mIGFsbCBwb3NzaWJsZSBTVkcgYW5kIE1hdGhNTCB0YWdzXG4gICAgICogc28gdGhhdCB3ZSBjYW4gcGVyZm9ybSB0aGUgbmFtZXNwYWNlIGNoZWNrc1xuICAgICAqIGNvcnJlY3RseS4gKi9cbiAgICBjb25zdCBBTExfU1ZHX1RBR1MgPSBhZGRUb1NldCh7fSwgWy4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5zdmdEaXNhbGxvd2VkXSk7XG4gICAgY29uc3QgQUxMX01BVEhNTF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5tYXRoTWwkMSwgLi4ubWF0aE1sRGlzYWxsb3dlZF0pO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCBhIERPTSBlbGVtZW50IHdob3NlIG5hbWVzcGFjZSBpcyBiZWluZyBjaGVja2VkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCBoYXMgYVxuICAgICAqICBuYW1lc3BhY2UgdGhhdCBhIHNwZWMtY29tcGxpYW50IHBhcnNlciB3b3VsZCBuZXZlclxuICAgICAqICByZXR1cm4uIFJldHVybiB0cnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBjb25zdCBfY2hlY2tWYWxpZE5hbWVzcGFjZSA9IGZ1bmN0aW9uIF9jaGVja1ZhbGlkTmFtZXNwYWNlKGVsZW1lbnQpIHtcbiAgICAgIGxldCBwYXJlbnQgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuXG4gICAgICAvLyBJbiBKU0RPTSwgaWYgd2UncmUgaW5zaWRlIHNoYWRvdyBET00sIHRoZW4gcGFyZW50Tm9kZVxuICAgICAgLy8gY2FuIGJlIG51bGwuIFdlIGp1c3Qgc2ltdWxhdGUgcGFyZW50IGluIHRoaXMgY2FzZS5cbiAgICAgIGlmICghcGFyZW50IHx8ICFwYXJlbnQudGFnTmFtZSkge1xuICAgICAgICBwYXJlbnQgPSB7XG4gICAgICAgICAgbmFtZXNwYWNlVVJJOiBOQU1FU1BBQ0UsXG4gICAgICAgICAgdGFnTmFtZTogJ3RlbXBsYXRlJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY29uc3QgdGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKGVsZW1lbnQudGFnTmFtZSk7XG4gICAgICBjb25zdCBwYXJlbnRUYWdOYW1lID0gc3RyaW5nVG9Mb3dlckNhc2UocGFyZW50LnRhZ05hbWUpO1xuICAgICAgaWYgKCFBTExPV0VEX05BTUVTUEFDRVNbZWxlbWVudC5uYW1lc3BhY2VVUkldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gSFRNTCBuYW1lc3BhY2UgdG8gU1ZHXG4gICAgICAgIC8vIGlzIHZpYSA8c3ZnPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2Zyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gTWF0aE1MIHRvIFNWRyBpcyB2aWFgXG4gICAgICAgIC8vIHN2ZyBpZiBwYXJlbnQgaXMgZWl0aGVyIDxhbm5vdGF0aW9uLXhtbD4gb3IgTWF0aE1MXG4gICAgICAgIC8vIHRleHQgaW50ZWdyYXRpb24gcG9pbnRzLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gTUFUSE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnc3ZnJyAmJiAocGFyZW50VGFnTmFtZSA9PT0gJ2Fubm90YXRpb24teG1sJyB8fCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIFNWR1xuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIFNWRyBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIE1hdGhNTFxuICAgICAgICAvLyBpcyB2aWEgPG1hdGg+LiBJZiBpdCBoYXBwZW5zIHZpYSBhbnkgb3RoZXIgdGFnLCB0aGVuXG4gICAgICAgIC8vIGl0IHNob3VsZCBiZSBraWxsZWQuXG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gc3dpdGNoIGZyb20gU1ZHIHRvIE1hdGhNTCBpcyB2aWFcbiAgICAgICAgLy8gPG1hdGg+IGFuZCBIVE1MIGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSkge1xuICAgICAgICAgIHJldHVybiB0YWdOYW1lID09PSAnbWF0aCcgJiYgSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBvbmx5IGFsbG93IGVsZW1lbnRzIHRoYXQgYXJlIGRlZmluZWQgaW4gTWF0aE1MXG4gICAgICAgIC8vIHNwZWMuIEFsbCBvdGhlcnMgYXJlIGRpc2FsbG93ZWQgaW4gTWF0aE1MIG5hbWVzcGFjZS5cbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdKTtcbiAgICAgIH1cbiAgICAgIGlmIChlbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBIVE1MIGlzIHZpYVxuICAgICAgICAvLyBIVE1MIGludGVncmF0aW9uIHBvaW50cywgYW5kIGZyb20gTWF0aE1MIHRvIEhUTUxcbiAgICAgICAgLy8gaXMgdmlhIE1hdGhNTCB0ZXh0IGludGVncmF0aW9uIHBvaW50c1xuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRSAmJiAhSFRNTF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UgJiYgIU1BVEhNTF9URVhUX0lOVEVHUkFUSU9OX1BPSU5UU1twYXJlbnRUYWdOYW1lXSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGRpc2FsbG93IHRhZ3MgdGhhdCBhcmUgc3BlY2lmaWMgZm9yIE1hdGhNTFxuICAgICAgICAvLyBvciBTVkcgYW5kIHNob3VsZCBuZXZlciBhcHBlYXIgaW4gSFRNTCBuYW1lc3BhY2VcbiAgICAgICAgcmV0dXJuICFBTExfTUFUSE1MX1RBR1NbdGFnTmFtZV0gJiYgKENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFNbdGFnTmFtZV0gfHwgIUFMTF9TVkdfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEZvciBYSFRNTCBhbmQgWE1MIGRvY3VtZW50cyB0aGF0IHN1cHBvcnQgY3VzdG9tIG5hbWVzcGFjZXNcbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvZGUgc2hvdWxkIG5ldmVyIHJlYWNoIHRoaXMgcGxhY2UgKHRoaXMgbWVhbnNcbiAgICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgc29tZWhvdyBnb3QgbmFtZXNwYWNlIHRoYXQgaXMgbm90XG4gICAgICAvLyBIVE1MLCBTVkcsIE1hdGhNTCBvciBhbGxvd2VkIHZpYSBBTExPV0VEX05BTUVTUEFDRVMpLlxuICAgICAgLy8gUmV0dXJuIGZhbHNlIGp1c3QgaW4gY2FzZS5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2ZvcmNlUmVtb3ZlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfZm9yY2VSZW1vdmUgPSBmdW5jdGlvbiBfZm9yY2VSZW1vdmUobm9kZSkge1xuICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgIGVsZW1lbnQ6IG5vZGVcbiAgICAgIH0pO1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLXJlbW92ZVxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIG5vZGUucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9yZW1vdmVBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBhbiBBdHRyaWJ1dGUgbmFtZVxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIG5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpLFxuICAgICAgICAgIGZyb206IG5vZGVcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgIGF0dHJpYnV0ZTogbnVsbCxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG5cbiAgICAgIC8vIFdlIHZvaWQgYXR0cmlidXRlIHZhbHVlcyBmb3IgdW5yZW1vdmFibGUgXCJpc1wiXCIgYXR0cmlidXRlc1xuICAgICAgaWYgKG5hbWUgPT09ICdpcycgJiYgIUFMTE9XRURfQVRUUltuYW1lXSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTSB8fCBSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF9mb3JjZVJlbW92ZShub2RlKTtcbiAgICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaW5pdERvY3VtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGRpcnR5IGEgc3RyaW5nIG9mIGRpcnR5IG1hcmt1cFxuICAgICAqIEByZXR1cm4ge0RvY3VtZW50fSBhIERPTSwgZmlsbGVkIHdpdGggdGhlIGRpcnR5IG1hcmt1cFxuICAgICAqL1xuICAgIGNvbnN0IF9pbml0RG9jdW1lbnQgPSBmdW5jdGlvbiBfaW5pdERvY3VtZW50KGRpcnR5KSB7XG4gICAgICAvKiBDcmVhdGUgYSBIVE1MIGRvY3VtZW50ICovXG4gICAgICBsZXQgZG9jID0gbnVsbDtcbiAgICAgIGxldCBsZWFkaW5nV2hpdGVzcGFjZSA9IG51bGw7XG4gICAgICBpZiAoRk9SQ0VfQk9EWSkge1xuICAgICAgICBkaXJ0eSA9ICc8cmVtb3ZlPjwvcmVtb3ZlPicgKyBkaXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIElmIEZPUkNFX0JPRFkgaXNuJ3QgdXNlZCwgbGVhZGluZyB3aGl0ZXNwYWNlIG5lZWRzIHRvIGJlIHByZXNlcnZlZCBtYW51YWxseSAqL1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gc3RyaW5nTWF0Y2goZGlydHksIC9eW1xcclxcblxcdCBdKy8pO1xuICAgICAgICBsZWFkaW5nV2hpdGVzcGFjZSA9IG1hdGNoZXMgJiYgbWF0Y2hlc1swXTtcbiAgICAgIH1cbiAgICAgIGlmIChQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgJiYgTkFNRVNQQUNFID09PSBIVE1MX05BTUVTUEFDRSkge1xuICAgICAgICAvLyBSb290IG9mIFhIVE1MIGRvYyBtdXN0IGNvbnRhaW4geG1sbnMgZGVjbGFyYXRpb24gKHNlZSBodHRwczovL3d3dy53My5vcmcvVFIveGh0bWwxL25vcm1hdGl2ZS5odG1sI3N0cmljdClcbiAgICAgICAgZGlydHkgPSAnPGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+PGhlYWQ+PC9oZWFkPjxib2R5PicgKyBkaXJ0eSArICc8L2JvZHk+PC9odG1sPic7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXJ0eVBheWxvYWQgPSB0cnVzdGVkVHlwZXNQb2xpY3kgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgIC8qXG4gICAgICAgKiBVc2UgdGhlIERPTVBhcnNlciBBUEkgYnkgZGVmYXVsdCwgZmFsbGJhY2sgbGF0ZXIgaWYgbmVlZHMgYmVcbiAgICAgICAqIERPTVBhcnNlciBub3Qgd29yayBmb3Igc3ZnIHdoZW4gaGFzIG11bHRpcGxlIHJvb3QgZWxlbWVudC5cbiAgICAgICAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRpcnR5UGF5bG9hZCwgUEFSU0VSX01FRElBX1RZUEUpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBVc2UgY3JlYXRlSFRNTERvY3VtZW50IGluIGNhc2UgRE9NUGFyc2VyIGlzIG5vdCBhdmFpbGFibGUgKi9cbiAgICAgIGlmICghZG9jIHx8ICFkb2MuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgIGRvYyA9IGltcGxlbWVudGF0aW9uLmNyZWF0ZURvY3VtZW50KE5BTUVTUEFDRSwgJ3RlbXBsYXRlJywgbnVsbCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5pbm5lckhUTUwgPSBJU19FTVBUWV9JTlBVVCA/IGVtcHR5SFRNTCA6IGRpcnR5UGF5bG9hZDtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIC8vIFN5bnRheCBlcnJvciBpZiBkaXJ0eVBheWxvYWQgaXMgaW52YWxpZCB4bWxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBpZiAoZGlydHkgJiYgbGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobGVhZGluZ1doaXRlc3BhY2UpLCBib2R5LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICB9XG5cbiAgICAgIC8qIFdvcmsgb24gd2hvbGUgZG9jdW1lbnQgb3IganVzdCBpdHMgYm9keSAqL1xuICAgICAgaWYgKE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlUYWdOYW1lLmNhbGwoZG9jLCBXSE9MRV9ET0NVTUVOVCA/ICdodG1sJyA6ICdib2R5JylbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gV0hPTEVfRE9DVU1FTlQgPyBkb2MuZG9jdW1lbnRFbGVtZW50IDogYm9keTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIE5vZGVJdGVyYXRvciBvYmplY3QgdGhhdCB5b3UgY2FuIHVzZSB0byB0cmF2ZXJzZSBmaWx0ZXJlZCBsaXN0cyBvZiBub2RlcyBvciBlbGVtZW50cyBpbiBhIGRvY3VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IG9yIG5vZGUgdG8gc3RhcnQgdHJhdmVyc2luZyBvbi5cbiAgICAgKiBAcmV0dXJuIHtOb2RlSXRlcmF0b3J9IFRoZSBjcmVhdGVkIE5vZGVJdGVyYXRvclxuICAgICAqL1xuICAgIGNvbnN0IF9jcmVhdGVOb2RlSXRlcmF0b3IgPSBmdW5jdGlvbiBfY3JlYXRlTm9kZUl0ZXJhdG9yKHJvb3QpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOb2RlSXRlcmF0b3IuY2FsbChyb290Lm93bmVyRG9jdW1lbnQgfHwgcm9vdCwgcm9vdCxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19DT01NRU5UIHwgTm9kZUZpbHRlci5TSE9XX1RFWFQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNDbG9iYmVyZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IGVsbSBlbGVtZW50IHRvIGNoZWNrIGZvciBjbG9iYmVyaW5nIGF0dGFja3NcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGNsb2JiZXJlZCwgZmFsc2UgaWYgc2FmZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Nsb2JiZXJlZCA9IGZ1bmN0aW9uIF9pc0Nsb2JiZXJlZChlbG0pIHtcbiAgICAgIHJldHVybiBlbG0gaW5zdGFuY2VvZiBIVE1MRm9ybUVsZW1lbnQgJiYgKHR5cGVvZiBlbG0ubm9kZU5hbWUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0udGV4dENvbnRlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQ2hpbGQgIT09ICdmdW5jdGlvbicgfHwgIShlbG0uYXR0cmlidXRlcyBpbnN0YW5jZW9mIE5hbWVkTm9kZU1hcCkgfHwgdHlwZW9mIGVsbS5yZW1vdmVBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5zZXRBdHRyaWJ1dGUgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVsbS5uYW1lc3BhY2VVUkkgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbG0uaW5zZXJ0QmVmb3JlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uaGFzQ2hpbGROb2RlcyAhPT0gJ2Z1bmN0aW9uJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgYSBET00gbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG9iamVjdCBvYmplY3QgdG8gY2hlY2sgd2hldGhlciBpdCdzIGEgRE9NIG5vZGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlzIG9iamVjdCBpcyBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2lzTm9kZSA9IGZ1bmN0aW9uIF9pc05vZGUob2JqZWN0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIE5vZGUgPT09ICdmdW5jdGlvbicgJiYgb2JqZWN0IGluc3RhbmNlb2YgTm9kZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2V4ZWN1dGVIb29rXG4gICAgICogRXhlY3V0ZSB1c2VyIGNvbmZpZ3VyYWJsZSBob29rc1xuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50ICBOYW1lIG9mIHRoZSBob29rJ3MgZW50cnkgcG9pbnRcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSBub2RlIHRvIHdvcmsgb24gd2l0aCB0aGUgaG9va1xuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGhvb2sgcGFyYW1ldGVyc1xuICAgICAqL1xuICAgIGNvbnN0IF9leGVjdXRlSG9vayA9IGZ1bmN0aW9uIF9leGVjdXRlSG9vayhlbnRyeVBvaW50LCBjdXJyZW50Tm9kZSwgZGF0YSkge1xuICAgICAgaWYgKCFob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcnJheUZvckVhY2goaG9va3NbZW50cnlQb2ludF0sIGhvb2sgPT4ge1xuICAgICAgICBob29rLmNhbGwoRE9NUHVyaWZ5LCBjdXJyZW50Tm9kZSwgZGF0YSwgQ09ORklHKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVFbGVtZW50c1xuICAgICAqXG4gICAgICogQHByb3RlY3Qgbm9kZU5hbWVcbiAgICAgKiBAcHJvdGVjdCB0ZXh0Q29udGVudFxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUNoaWxkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gY2hlY2sgZm9yIHBlcm1pc3Npb24gdG8gZXhpc3RcbiAgICAgKiBAcmV0dXJuICB7Qm9vbGVhbn0gdHJ1ZSBpZiBub2RlIHdhcyBraWxsZWQsIGZhbHNlIGlmIGxlZnQgYWxpdmVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVFbGVtZW50cyA9IGZ1bmN0aW9uIF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSB7XG4gICAgICBsZXQgY29udGVudCA9IG51bGw7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcblxuICAgICAgLyogQ2hlY2sgaWYgZWxlbWVudCBpcyBjbG9iYmVyZWQgb3IgY2FuIGNsb2JiZXIgKi9cbiAgICAgIGlmIChfaXNDbG9iYmVyZWQoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBOb3cgbGV0J3MgY2hlY2sgdGhlIGVsZW1lbnQncyB0eXBlIGFuZCBuYW1lICovXG4gICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZUVsZW1lbnQnLCBjdXJyZW50Tm9kZSwge1xuICAgICAgICB0YWdOYW1lLFxuICAgICAgICBhbGxvd2VkVGFnczogQUxMT1dFRF9UQUdTXG4gICAgICB9KTtcblxuICAgICAgLyogRGV0ZWN0IG1YU1MgYXR0ZW1wdHMgYWJ1c2luZyBuYW1lc3BhY2UgY29uZnVzaW9uICovXG4gICAgICBpZiAoY3VycmVudE5vZGUuaGFzQ2hpbGROb2RlcygpICYmICFfaXNOb2RlKGN1cnJlbnROb2RlLmZpcnN0RWxlbWVudENoaWxkKSAmJiByZWdFeHBUZXN0KC88Wy9cXHddL2csIGN1cnJlbnROb2RlLmlubmVySFRNTCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBlbGVtZW50IGlmIGFueXRoaW5nIGZvcmJpZHMgaXRzIHByZXNlbmNlICovXG4gICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGEgY3VzdG9tIGVsZW1lbnQgdG8gaGFuZGxlICovXG4gICAgICAgIGlmICghRk9SQklEX1RBR1NbdGFnTmFtZV0gJiYgX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpKSB7XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh0YWdOYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEtlZXAgY29udGVudCBleGNlcHQgZm9yIGJhZC1saXN0ZWQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKEtFRVBfQ09OVEVOVCAmJiAhRk9SQklEX0NPTlRFTlRTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgY29uc3QgY2hpbGROb2RlcyA9IGdldENoaWxkTm9kZXMoY3VycmVudE5vZGUpIHx8IGN1cnJlbnROb2RlLmNoaWxkTm9kZXM7XG4gICAgICAgICAgaWYgKGNoaWxkTm9kZXMgJiYgcGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRDb3VudCA9IGNoaWxkTm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNoaWxkQ291bnQgLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjbG9uZU5vZGUoY2hpbGROb2Rlc1tpXSwgdHJ1ZSksIGdldE5leHRTaWJsaW5nKGN1cnJlbnROb2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBDaGVjayB3aGV0aGVyIGVsZW1lbnQgaGFzIGEgdmFsaWQgbmFtZXNwYWNlICovXG4gICAgICBpZiAoY3VycmVudE5vZGUgaW5zdGFuY2VvZiBFbGVtZW50ICYmICFfY2hlY2tWYWxpZE5hbWVzcGFjZShjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIE1ha2Ugc3VyZSB0aGF0IG9sZGVyIGJyb3dzZXJzIGRvbid0IGdldCBmYWxsYmFjay10YWcgbVhTUyAqL1xuICAgICAgaWYgKCh0YWdOYW1lID09PSAnbm9zY3JpcHQnIHx8IHRhZ05hbWUgPT09ICdub2VtYmVkJyB8fCB0YWdOYW1lID09PSAnbm9mcmFtZXMnKSAmJiByZWdFeHBUZXN0KC88XFwvbm8oc2NyaXB0fGVtYmVkfGZyYW1lcykvaSwgY3VycmVudE5vZGUuaW5uZXJIVE1MKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZWxlbWVudCBjb250ZW50IHRvIGJlIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMgJiYgY3VycmVudE5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgLyogR2V0IHRoZSBlbGVtZW50J3MgdGV4dCBjb250ZW50ICovXG4gICAgICAgIGNvbnRlbnQgPSBjdXJyZW50Tm9kZS50ZXh0Q29udGVudDtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBjb250ZW50ID0gc3RyaW5nUmVwbGFjZShjb250ZW50LCBleHByLCAnICcpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLnRleHRDb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgICAgYXJyYXlQdXNoKERPTVB1cmlmeS5yZW1vdmVkLCB7XG4gICAgICAgICAgICBlbGVtZW50OiBjdXJyZW50Tm9kZS5jbG9uZU5vZGUoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnJlbnROb2RlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVFbGVtZW50cycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbGNUYWcgTG93ZXJjYXNlIHRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjTmFtZSBMb3dlcmNhc2UgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIGNvbnN0IF9pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpIHtcbiAgICAgIC8qIE1ha2Ugc3VyZSBhdHRyaWJ1dGUgY2Fubm90IGNsb2JiZXIgKi9cbiAgICAgIGlmIChTQU5JVElaRV9ET00gJiYgKGxjTmFtZSA9PT0gJ2lkJyB8fCBsY05hbWUgPT09ICduYW1lJykgJiYgKHZhbHVlIGluIGRvY3VtZW50IHx8IHZhbHVlIGluIGZvcm1FbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8qIEFsbG93IHZhbGlkIGRhdGEtKiBhdHRyaWJ1dGVzOiBBdCBsZWFzdCBvbmUgY2hhcmFjdGVyIGFmdGVyIFwiLVwiXG4gICAgICAgICAgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2RvbS5odG1sI2VtYmVkZGluZy1jdXN0b20tbm9uLXZpc2libGUtZGF0YS13aXRoLXRoZS1kYXRhLSotYXR0cmlidXRlcylcbiAgICAgICAgICBYTUwtY29tcGF0aWJsZSAoaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCN4bWwtY29tcGF0aWJsZSBhbmQgaHR0cDovL3d3dy53My5vcmcvVFIveG1sLyNkMGU4MDQpXG4gICAgICAgICAgV2UgZG9uJ3QgbmVlZCB0byBjaGVjayB0aGUgdmFsdWU7IGl0J3MgYWx3YXlzIFVSSSBzYWZlLiAqL1xuICAgICAgaWYgKEFMTE9XX0RBVEFfQVRUUiAmJiAhRk9SQklEX0FUVFJbbGNOYW1lXSAmJiByZWdFeHBUZXN0KERBVEFfQVRUUiwgbGNOYW1lKSkgOyBlbHNlIGlmIChBTExPV19BUklBX0FUVFIgJiYgcmVnRXhwVGVzdChBUklBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoIUFMTE9XRURfQVRUUltsY05hbWVdIHx8IEZPUkJJRF9BVFRSW2xjTmFtZV0pIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAvLyBGaXJzdCBjb25kaXRpb24gZG9lcyBhIHZlcnkgYmFzaWMgY2hlY2sgaWYgYSkgaXQncyBiYXNpY2FsbHkgYSB2YWxpZCBjdXN0b20gZWxlbWVudCB0YWduYW1lIEFORFxuICAgICAgICAvLyBiKSBpZiB0aGUgdGFnTmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICAvLyBhbmQgYykgaWYgdGhlIGF0dHJpYnV0ZSBuYW1lIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrXG4gICAgICAgIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudChsY1RhZykgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgbGNUYWcpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayhsY1RhZykpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hdHRyaWJ1dGVOYW1lQ2hlY2ssIGxjTmFtZSkgfHwgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgRnVuY3Rpb24gJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrKGxjTmFtZSkpIHx8XG4gICAgICAgIC8vIEFsdGVybmF0aXZlLCBzZWNvbmQgY29uZGl0aW9uIGNoZWNrcyBpZiBpdCdzIGFuIGBpc2AtYXR0cmlidXRlLCBBTkRcbiAgICAgICAgLy8gdGhlIHZhbHVlIHBhc3NlcyB3aGF0ZXZlciB0aGUgdXNlciBoYXMgY29uZmlndXJlZCBmb3IgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrXG4gICAgICAgIGxjTmFtZSA9PT0gJ2lzJyAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgJiYgKENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByZWdFeHBUZXN0KENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaywgdmFsdWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjayh2YWx1ZSkpKSA7IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKiBDaGVjayB2YWx1ZSBpcyBzYWZlLiBGaXJzdCwgaXMgYXR0ciBpbmVydD8gSWYgc28sIGlzIHNhZmUgKi9cbiAgICAgIH0gZWxzZSBpZiAoVVJJX1NBRkVfQVRUUklCVVRFU1tsY05hbWVdKSA7IGVsc2UgaWYgKHJlZ0V4cFRlc3QoSVNfQUxMT1dFRF9VUkkkMSwgc3RyaW5nUmVwbGFjZSh2YWx1ZSwgQVRUUl9XSElURVNQQUNFLCAnJykpKSA7IGVsc2UgaWYgKChsY05hbWUgPT09ICdzcmMnIHx8IGxjTmFtZSA9PT0gJ3hsaW5rOmhyZWYnIHx8IGxjTmFtZSA9PT0gJ2hyZWYnKSAmJiBsY1RhZyAhPT0gJ3NjcmlwdCcgJiYgc3RyaW5nSW5kZXhPZih2YWx1ZSwgJ2RhdGE6JykgPT09IDAgJiYgREFUQV9VUklfVEFHU1tsY1RhZ10pIDsgZWxzZSBpZiAoQUxMT1dfVU5LTk9XTl9QUk9UT0NPTFMgJiYgIXJlZ0V4cFRlc3QoSVNfU0NSSVBUX09SX0RBVEEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudFxuICAgICAqIGNoZWNrcyBpZiBhdCBsZWFzdCBvbmUgZGFzaCBpcyBpbmNsdWRlZCBpbiB0YWdOYW1lLCBhbmQgaXQncyBub3QgdGhlIGZpcnN0IGNoYXJcbiAgICAgKiBmb3IgbW9yZSBzb3BoaXN0aWNhdGVkIGNoZWNraW5nIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3ZhbGlkYXRlLWVsZW1lbnQtbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhZ05hbWUgbmFtZSBvZiB0aGUgdGFnIG9mIHRoZSBub2RlIHRvIHNhbml0aXplXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIG5hbWUgbWVldHMgdGhlIGJhc2ljIGNyaXRlcmlhIGZvciBhIGN1c3RvbSBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgY29uc3QgX2lzQmFzaWNDdXN0b21FbGVtZW50ID0gZnVuY3Rpb24gX2lzQmFzaWNDdXN0b21FbGVtZW50KHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiB0YWdOYW1lICE9PSAnYW5ub3RhdGlvbi14bWwnICYmIHRhZ05hbWUuaW5kZXhPZignLScpID4gMDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplQXR0cmlidXRlc1xuICAgICAqXG4gICAgICogQHByb3RlY3QgYXR0cmlidXRlc1xuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgcmVtb3ZlQXR0cmlidXRlXG4gICAgICogQHByb3RlY3Qgc2V0QXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBjdXJyZW50Tm9kZSB0byBzYW5pdGl6ZVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZUF0dHJpYnV0ZXMgPSBmdW5jdGlvbiBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKSB7XG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXR0cmlidXRlc1xuICAgICAgfSA9IGN1cnJlbnROb2RlO1xuXG4gICAgICAvKiBDaGVjayBpZiB3ZSBoYXZlIGF0dHJpYnV0ZXM7IGlmIG5vdCB3ZSBtaWdodCBoYXZlIGEgdGV4dCBub2RlICovXG4gICAgICBpZiAoIWF0dHJpYnV0ZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaG9va0V2ZW50ID0ge1xuICAgICAgICBhdHRyTmFtZTogJycsXG4gICAgICAgIGF0dHJWYWx1ZTogJycsXG4gICAgICAgIGtlZXBBdHRyOiB0cnVlLFxuICAgICAgICBhbGxvd2VkQXR0cmlidXRlczogQUxMT1dFRF9BVFRSXG4gICAgICB9O1xuICAgICAgbGV0IGwgPSBhdHRyaWJ1dGVzLmxlbmd0aDtcblxuICAgICAgLyogR28gYmFja3dhcmRzIG92ZXIgYWxsIGF0dHJpYnV0ZXM7IHNhZmVseSByZW1vdmUgYmFkIG9uZXMgKi9cbiAgICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IGF0dHJpYnV0ZXNbbF07XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIG5hbWVzcGFjZVVSSSxcbiAgICAgICAgICB2YWx1ZTogYXR0clZhbHVlXG4gICAgICAgIH0gPSBhdHRyO1xuICAgICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhuYW1lKTtcbiAgICAgICAgbGV0IHZhbHVlID0gbmFtZSA9PT0gJ3ZhbHVlJyA/IGF0dHJWYWx1ZSA6IHN0cmluZ1RyaW0oYXR0clZhbHVlKTtcblxuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIGhvb2tFdmVudC5hdHRyTmFtZSA9IGxjTmFtZTtcbiAgICAgICAgaG9va0V2ZW50LmF0dHJWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBob29rRXZlbnQua2VlcEF0dHIgPSB0cnVlO1xuICAgICAgICBob29rRXZlbnQuZm9yY2VLZWVwQXR0ciA9IHVuZGVmaW5lZDsgLy8gQWxsb3dzIGRldmVsb3BlcnMgdG8gc2VlIHRoaXMgaXMgYSBwcm9wZXJ0eSB0aGV5IGNhbiBzZXRcbiAgICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVBdHRyaWJ1dGUnLCBjdXJyZW50Tm9kZSwgaG9va0V2ZW50KTtcbiAgICAgICAgdmFsdWUgPSBob29rRXZlbnQuYXR0clZhbHVlO1xuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKGhvb2tFdmVudC5mb3JjZUtlZXBBdHRyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBSZW1vdmUgYXR0cmlidXRlICovXG4gICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgIC8qIERpZCB0aGUgaG9va3MgYXBwcm92ZSBvZiB0aGUgYXR0cmlidXRlPyAqL1xuICAgICAgICBpZiAoIWhvb2tFdmVudC5rZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogV29yayBhcm91bmQgYSBzZWN1cml0eSBpc3N1ZSBpbiBqUXVlcnkgMy4wICovXG4gICAgICAgIGlmICghQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSICYmIHJlZ0V4cFRlc3QoL1xcLz4vaSwgdmFsdWUpKSB7XG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTYW5pdGl6ZSBhdHRyaWJ1dGUgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmdSZXBsYWNlKHZhbHVlLCBleHByLCAnICcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSXMgYHZhbHVlYCB2YWxpZCBmb3IgdGhpcyBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGNvbnN0IGxjVGFnID0gdHJhbnNmb3JtQ2FzZUZ1bmMoY3VycmVudE5vZGUubm9kZU5hbWUpO1xuICAgICAgICBpZiAoIV9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIHZpYSBuYW1lc3BhY2UgaXNvbGF0aW9uLFxuICAgICAgICAgKiBQcmVmaXggaWQgYW5kIG5hbWUgYXR0cmlidXRlcyB3aXRoIGB1c2VyLWNvbnRlbnQtYFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKFNBTklUSVpFX05BTUVEX1BST1BTICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGlzIHZhbHVlXG4gICAgICAgICAgX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAvLyBQcmVmaXggdGhlIHZhbHVlIGFuZCBsYXRlciByZS1jcmVhdGUgdGhlIGF0dHJpYnV0ZSB3aXRoIHRoZSBzYW5pdGl6ZWQgdmFsdWVcbiAgICAgICAgICB2YWx1ZSA9IFNBTklUSVpFX05BTUVEX1BST1BTX1BSRUZJWCArIHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGF0dHJpYnV0ZXMgdGhhdCByZXF1aXJlIFRydXN0ZWQgVHlwZXMgKi9cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAobmFtZXNwYWNlVVJJKSA7IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0cnVzdGVkVHlwZXMuZ2V0QXR0cmlidXRlVHlwZShsY1RhZywgbGNOYW1lKSkge1xuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkSFRNTCc6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhc2UgJ1RydXN0ZWRTY3JpcHRVUkwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZVNjcmlwdFVSTCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyogSGFuZGxlIGludmFsaWQgZGF0YS0qIGF0dHJpYnV0ZSBzZXQgYnkgdHJ5LWNhdGNoaW5nIGl0ICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qIEZhbGxiYWNrIHRvIHNldEF0dHJpYnV0ZSgpIGZvciBicm93c2VyLXVucmVjb2duaXplZCBuYW1lc3BhY2VzIGUuZy4gXCJ4LXNjaGVtYVwiLiAqL1xuICAgICAgICAgICAgY3VycmVudE5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYXJyYXlQb3AoRE9NUHVyaWZ5LnJlbW92ZWQpO1xuICAgICAgICB9IGNhdGNoIChfKSB7fVxuICAgICAgfVxuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgY3VycmVudE5vZGUsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfc2FuaXRpemVTaGFkb3dET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IHRvIGl0ZXJhdGUgb3ZlciByZWN1cnNpdmVseVxuICAgICAqL1xuICAgIGNvbnN0IF9zYW5pdGl6ZVNoYWRvd0RPTSA9IGZ1bmN0aW9uIF9zYW5pdGl6ZVNoYWRvd0RPTShmcmFnbWVudCkge1xuICAgICAgbGV0IHNoYWRvd05vZGUgPSBudWxsO1xuICAgICAgY29uc3Qgc2hhZG93SXRlcmF0b3IgPSBfY3JlYXRlTm9kZUl0ZXJhdG9yKGZyYWdtZW50KTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICAgIHdoaWxlIChzaGFkb3dOb2RlID0gc2hhZG93SXRlcmF0b3IubmV4dE5vZGUoKSkge1xuICAgICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplU2hhZG93Tm9kZScsIHNoYWRvd05vZGUsIG51bGwpO1xuXG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhzaGFkb3dOb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogRGVlcCBzaGFkb3cgRE9NIGRldGVjdGVkICovXG4gICAgICAgIGlmIChzaGFkb3dOb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKHNoYWRvd05vZGUuY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBDaGVjayBhdHRyaWJ1dGVzLCBzYW5pdGl6ZSBpZiBuZWNlc3NhcnkgKi9cbiAgICAgICAgX3Nhbml0aXplQXR0cmlidXRlcyhzaGFkb3dOb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplU2hhZG93RE9NJywgZnJhZ21lbnQsIG51bGwpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTYW5pdGl6ZVxuICAgICAqIFB1YmxpYyBtZXRob2QgcHJvdmlkaW5nIGNvcmUgc2FuaXRhdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlfSBkaXJ0eSBzdHJpbmcgb3IgRE9NIG5vZGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIG9iamVjdFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgRE9NUHVyaWZ5LnNhbml0aXplID0gZnVuY3Rpb24gKGRpcnR5KSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGxldCBib2R5ID0gbnVsbDtcbiAgICAgIGxldCBpbXBvcnRlZE5vZGUgPSBudWxsO1xuICAgICAgbGV0IGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgIGxldCByZXR1cm5Ob2RlID0gbnVsbDtcbiAgICAgIC8qIE1ha2Ugc3VyZSB3ZSBoYXZlIGEgc3RyaW5nIHRvIHNhbml0aXplLlxuICAgICAgICBETyBOT1QgcmV0dXJuIGVhcmx5LCBhcyB0aGlzIHdpbGwgcmV0dXJuIHRoZSB3cm9uZyB0eXBlIGlmXG4gICAgICAgIHRoZSB1c2VyIGhhcyByZXF1ZXN0ZWQgYSBET00gb2JqZWN0IHJhdGhlciB0aGFuIGEgc3RyaW5nICovXG4gICAgICBJU19FTVBUWV9JTlBVVCA9ICFkaXJ0eTtcbiAgICAgIGlmIChJU19FTVBUWV9JTlBVVCkge1xuICAgICAgICBkaXJ0eSA9ICc8IS0tPic7XG4gICAgICB9XG5cbiAgICAgIC8qIFN0cmluZ2lmeSwgaW4gY2FzZSBkaXJ0eSBpcyBhbiBvYmplY3QgKi9cbiAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnICYmICFfaXNOb2RlKGRpcnR5KSkge1xuICAgICAgICBpZiAodHlwZW9mIGRpcnR5LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgZGlydHkgPSBkaXJ0eS50b1N0cmluZygpO1xuICAgICAgICAgIGlmICh0eXBlb2YgZGlydHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ2RpcnR5IGlzIG5vdCBhIHN0cmluZywgYWJvcnRpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCd0b1N0cmluZyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBkaXJ0eSBIVE1MIGlmIERPTVB1cmlmeSBjYW5ub3QgcnVuICovXG4gICAgICBpZiAoIURPTVB1cmlmeS5pc1N1cHBvcnRlZCkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFzc2lnbiBjb25maWcgdmFycyAqL1xuICAgICAgaWYgKCFTRVRfQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgfVxuXG4gICAgICAvKiBDbGVhbiB1cCByZW1vdmVkIGVsZW1lbnRzICovXG4gICAgICBET01QdXJpZnkucmVtb3ZlZCA9IFtdO1xuXG4gICAgICAvKiBDaGVjayBpZiBkaXJ0eSBpcyBjb3JyZWN0bHkgdHlwZWQgZm9yIElOX1BMQUNFICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgICBJTl9QTEFDRSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIC8qIERvIHNvbWUgZWFybHkgcHJlLXNhbml0aXphdGlvbiB0byBhdm9pZCB1bnNhZmUgcm9vdCBub2RlcyAqL1xuICAgICAgICBpZiAoZGlydHkubm9kZU5hbWUpIHtcbiAgICAgICAgICBjb25zdCB0YWdOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoZGlydHkubm9kZU5hbWUpO1xuICAgICAgICAgIGlmICghQUxMT1dFRF9UQUdTW3RhZ05hbWVdIHx8IEZPUkJJRF9UQUdTW3RhZ05hbWVdKSB7XG4gICAgICAgICAgICB0aHJvdyB0eXBlRXJyb3JDcmVhdGUoJ3Jvb3Qgbm9kZSBpcyBmb3JiaWRkZW4gYW5kIGNhbm5vdCBiZSBzYW5pdGl6ZWQgaW4tcGxhY2UnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlydHkgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIC8qIElmIGRpcnR5IGlzIGEgRE9NIGVsZW1lbnQsIGFwcGVuZCB0byBhbiBlbXB0eSBkb2N1bWVudCB0byBhdm9pZFxuICAgICAgICAgICBlbGVtZW50cyBiZWluZyBzdHJpcHBlZCBieSB0aGUgcGFyc2VyICovXG4gICAgICAgIGJvZHkgPSBfaW5pdERvY3VtZW50KCc8IS0tLS0+Jyk7XG4gICAgICAgIGltcG9ydGVkTm9kZSA9IGJvZHkub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRpcnR5LCB0cnVlKTtcbiAgICAgICAgaWYgKGltcG9ydGVkTm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBpbXBvcnRlZE5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgIC8qIE5vZGUgaXMgYWxyZWFkeSBhIGJvZHksIHVzZSBhcyBpcyAqL1xuICAgICAgICAgIGJvZHkgPSBpbXBvcnRlZE5vZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1hcHBlbmRcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGltcG9ydGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIEV4aXQgZGlyZWN0bHkgaWYgd2UgaGF2ZSBub3RoaW5nIHRvIGRvICovXG4gICAgICAgIGlmICghUkVUVVJOX0RPTSAmJiAhU0FGRV9GT1JfVEVNUExBVEVTICYmICFXSE9MRV9ET0NVTUVOVCAmJlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItaW5jbHVkZXNcbiAgICAgICAgZGlydHkuaW5kZXhPZignPCcpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVzdGVkVHlwZXNQb2xpY3kgJiYgUkVUVVJOX1RSVVNURURfVFlQRSA/IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKGRpcnR5KSA6IGRpcnR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyogSW5pdGlhbGl6ZSB0aGUgZG9jdW1lbnQgdG8gd29yayBvbiAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudChkaXJ0eSk7XG5cbiAgICAgICAgLyogQ2hlY2sgd2UgaGF2ZSBhIERPTSBub2RlIGZyb20gdGhlIGRhdGEgKi9cbiAgICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgICAgcmV0dXJuIFJFVFVSTl9ET00gPyBudWxsIDogUkVUVVJOX1RSVVNURURfVFlQRSA/IGVtcHR5SFRNTCA6ICcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIFJlbW92ZSBmaXJzdCBlbGVtZW50IG5vZGUgKG91cnMpIGlmIEZPUkNFX0JPRFkgaXMgc2V0ICovXG4gICAgICBpZiAoYm9keSAmJiBGT1JDRV9CT0RZKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvKiBHZXQgbm9kZSBpdGVyYXRvciAqL1xuICAgICAgY29uc3Qgbm9kZUl0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihJTl9QTEFDRSA/IGRpcnR5IDogYm9keSk7XG5cbiAgICAgIC8qIE5vdyBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY3JlYXRlZCBkb2N1bWVudCAqL1xuICAgICAgd2hpbGUgKGN1cnJlbnROb2RlID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogU2FuaXRpemUgdGFncyBhbmQgZWxlbWVudHMgKi9cbiAgICAgICAgaWYgKF9zYW5pdGl6ZUVsZW1lbnRzKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2hhZG93IERPTSBkZXRlY3RlZCwgc2FuaXRpemUgaXQgKi9cbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNvbnRlbnQgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgX3Nhbml0aXplU2hhZG93RE9NKGN1cnJlbnROb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoY3VycmVudE5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKiBJZiB3ZSBzYW5pdGl6ZWQgYGRpcnR5YCBpbi1wbGFjZSwgcmV0dXJuIGl0LiAqL1xuICAgICAgaWYgKElOX1BMQUNFKSB7XG4gICAgICAgIHJldHVybiBkaXJ0eTtcbiAgICAgIH1cblxuICAgICAgLyogUmV0dXJuIHNhbml0aXplZCBzdHJpbmcgb3IgRE9NICovXG4gICAgICBpZiAoUkVUVVJOX0RPTSkge1xuICAgICAgICBpZiAoUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBjcmVhdGVEb2N1bWVudEZyYWdtZW50LmNhbGwoYm9keS5vd25lckRvY3VtZW50KTtcbiAgICAgICAgICB3aGlsZSAoYm9keS5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgICByZXR1cm5Ob2RlLmFwcGVuZENoaWxkKGJvZHkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybk5vZGUgPSBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChBTExPV0VEX0FUVFIuc2hhZG93cm9vdCB8fCBBTExPV0VEX0FUVFIuc2hhZG93cm9vdG1vZGUpIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAgQWRvcHROb2RlKCkgaXMgbm90IHVzZWQgYmVjYXVzZSBpbnRlcm5hbCBzdGF0ZSBpcyBub3QgcmVzZXRcbiAgICAgICAgICAgIChlLmcuIHRoZSBwYXN0IG5hbWVzIG1hcCBvZiBhIEhUTUxGb3JtRWxlbWVudCksIHRoaXMgaXMgc2FmZVxuICAgICAgICAgICAgaW4gdGhlb3J5IGJ1dCB3ZSB3b3VsZCByYXRoZXIgbm90IHJpc2sgYW5vdGhlciBhdHRhY2sgdmVjdG9yLlxuICAgICAgICAgICAgVGhlIHN0YXRlIHRoYXQgaXMgY2xvbmVkIGJ5IGltcG9ydE5vZGUoKSBpcyBleHBsaWNpdGx5IGRlZmluZWRcbiAgICAgICAgICAgIGJ5IHRoZSBzcGVjcy5cbiAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybk5vZGUgPSBpbXBvcnROb2RlLmNhbGwob3JpZ2luYWxEb2N1bWVudCwgcmV0dXJuTm9kZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybk5vZGU7XG4gICAgICB9XG4gICAgICBsZXQgc2VyaWFsaXplZEhUTUwgPSBXSE9MRV9ET0NVTUVOVCA/IGJvZHkub3V0ZXJIVE1MIDogYm9keS5pbm5lckhUTUw7XG5cbiAgICAgIC8qIFNlcmlhbGl6ZSBkb2N0eXBlIGlmIGFsbG93ZWQgKi9cbiAgICAgIGlmIChXSE9MRV9ET0NVTUVOVCAmJiBBTExPV0VEX1RBR1NbJyFkb2N0eXBlJ10gJiYgYm9keS5vd25lckRvY3VtZW50ICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlICYmIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgJiYgcmVnRXhwVGVzdChET0NUWVBFX05BTUUsIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUpKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gJzwhRE9DVFlQRSAnICsgYm9keS5vd25lckRvY3VtZW50LmRvY3R5cGUubmFtZSArICc+XFxuJyArIHNlcmlhbGl6ZWRIVE1MO1xuICAgICAgfVxuXG4gICAgICAvKiBTYW5pdGl6ZSBmaW5hbCBzdHJpbmcgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBhcnJheUZvckVhY2goW01VU1RBQ0hFX0VYUFIsIEVSQl9FWFBSLCBUTVBMSVRfRVhQUl0sIGV4cHIgPT4ge1xuICAgICAgICAgIHNlcmlhbGl6ZWRIVE1MID0gc3RyaW5nUmVwbGFjZShzZXJpYWxpemVkSFRNTCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChzZXJpYWxpemVkSFRNTCkgOiBzZXJpYWxpemVkSFRNTDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHVibGljIG1ldGhvZCB0byBzZXQgdGhlIGNvbmZpZ3VyYXRpb24gb25jZVxuICAgICAqIHNldENvbmZpZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgICAqL1xuICAgIERPTVB1cmlmeS5zZXRDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY2ZnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgIF9wYXJzZUNvbmZpZyhjZmcpO1xuICAgICAgU0VUX0NPTkZJRyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIHRoZSBjb25maWd1cmF0aW9uXG4gICAgICogY2xlYXJDb25maWdcbiAgICAgKlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5jbGVhckNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIENPTkZJRyA9IG51bGw7XG4gICAgICBTRVRfQ09ORklHID0gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gY2hlY2sgaWYgYW4gYXR0cmlidXRlIHZhbHVlIGlzIHZhbGlkLlxuICAgICAqIFVzZXMgbGFzdCBzZXQgY29uZmlnLCBpZiBhbnkuIE90aGVyd2lzZSwgdXNlcyBjb25maWcgZGVmYXVsdHMuXG4gICAgICogaXNWYWxpZEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB0YWcgVGFnIG5hbWUgb2YgY29udGFpbmluZyBlbGVtZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gYXR0ciBBdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbHVlIEF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyB2YWxpZC4gT3RoZXJ3aXNlLCByZXR1cm5zIGZhbHNlLlxuICAgICAqL1xuICAgIERPTVB1cmlmeS5pc1ZhbGlkQXR0cmlidXRlID0gZnVuY3Rpb24gKHRhZywgYXR0ciwgdmFsdWUpIHtcbiAgICAgIC8qIEluaXRpYWxpemUgc2hhcmVkIGNvbmZpZyB2YXJzIGlmIG5lY2Vzc2FyeS4gKi9cbiAgICAgIGlmICghQ09ORklHKSB7XG4gICAgICAgIF9wYXJzZUNvbmZpZyh7fSk7XG4gICAgICB9XG4gICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKHRhZyk7XG4gICAgICBjb25zdCBsY05hbWUgPSB0cmFuc2Zvcm1DYXNlRnVuYyhhdHRyKTtcbiAgICAgIHJldHVybiBfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZEhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGFkZCBET01QdXJpZnkgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byBhZGRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBob29rRnVuY3Rpb24gZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5hZGRIb29rID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQsIGhvb2tGdW5jdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBob29rRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBob29rc1tlbnRyeVBvaW50XSB8fCBbXTtcbiAgICAgIGFycmF5UHVzaChob29rc1tlbnRyeVBvaW50XSwgaG9va0Z1bmN0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGEgRE9NUHVyaWZ5IGhvb2sgYXQgYSBnaXZlbiBlbnRyeVBvaW50XG4gICAgICogKHBvcHMgaXQgZnJvbSB0aGUgc3RhY2sgb2YgaG9va3MgaWYgbW9yZSBhcmUgcHJlc2VudClcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9vayB0byByZW1vdmVcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gcmVtb3ZlZChwb3BwZWQpIGhvb2tcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuIGFycmF5UG9wKGhvb2tzW2VudHJ5UG9pbnRdKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBlbnRyeVBvaW50IGVudHJ5IHBvaW50IGZvciB0aGUgaG9va3MgdG8gcmVtb3ZlXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2tzID0gZnVuY3Rpb24gKGVudHJ5UG9pbnQpIHtcbiAgICAgIGlmIChob29rc1tlbnRyeVBvaW50XSkge1xuICAgICAgICBob29rc1tlbnRyeVBvaW50XSA9IFtdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVBbGxIb29rc1xuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gcmVtb3ZlIGFsbCBET01QdXJpZnkgaG9va3NcbiAgICAgKi9cbiAgICBET01QdXJpZnkucmVtb3ZlQWxsSG9va3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBob29rcyA9IHt9O1xuICAgIH07XG4gICAgcmV0dXJuIERPTVB1cmlmeTtcbiAgfVxuICB2YXIgcHVyaWZ5ID0gY3JlYXRlRE9NUHVyaWZ5KCk7XG5cbiAgcmV0dXJuIHB1cmlmeTtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHVyaWZ5LmpzLm1hcFxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcblxyXG4vKipcclxuICogQ2FjaGUgb2YgY2FtZWxDYXNlIENTUyBwcm9wZXJ0eSBuYW1lc1xyXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cclxuICovXHJcbmxldCBjc3NQcm9wZXJ0eU5hbWVDYWNoZTogeyBbczogc3RyaW5nXTogc3RyaW5nOyB9ID0ge307XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBlbGVtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRUxFTUVOVF9OT0RFOiBudW1iZXIgPSAxO1xyXG5cclxuLyoqXHJcbiAqIE5vZGUgdHlwZSBjb25zdGFudCBmb3IgdGV4dCBub2Rlc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRFWFRfTk9ERTogbnVtYmVyID0gMztcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGNvbW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCBjb25zdCBDT01NRU5UX05PREU6IG51bWJlciA9IDg7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGRvY3VtZW50IG5vZGVzXHJcbiAqXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgRE9DVU1FTlRfTk9ERTogbnVtYmVyID0gOTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGRvY3VtZW50IGZyYWdtZW50c1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IERPQ1VNRU5UX0ZSQUdNRU5UX05PREU6IG51bWJlciA9IDExO1xyXG5cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZTogYW55KSB7XHJcblx0dmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuXHJcblx0cmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZWxlbWVudCB3aXRoIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlc1xyXG4gKlxyXG4gKiBXaWxsIGNyZWF0ZSBpdCBpbiB0aGUgY3VycmVudCBkb2N1bWVudCB1bmxlc3MgY29udGV4dFxyXG4gKiBpcyBzcGVjaWZpZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gdGFnXHJcbiAqIEBwYXJhbSB7IU9iamVjdDxzdHJpbmcsIHN0cmluZz59IFthdHRyaWJ1dGVzXVxyXG4gKiBAcGFyYW0geyFEb2N1bWVudH0gW2NvbnRleHRdXHJcbiAqIEByZXR1cm5zIHshSFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWc6IHN0cmluZywgYXR0cmlidXRlcz86IHsgW3M6IHN0cmluZ106IHN0cmluZzsgfSwgY29udGV4dD86IERvY3VtZW50KTogSFRNTEVsZW1lbnQge1xyXG5cdGxldCBodG1sRWxlbWVudCA9IChjb250ZXh0IHx8IGRvY3VtZW50KS5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG5cdHV0aWxzLmVhY2goYXR0cmlidXRlcyB8fCB7fSwgZnVuY3Rpb24gKGtleToga2V5b2YgSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcclxuXHRcdGlmIChrZXkgPT0gJ3N0eWxlJykge1xyXG5cdFx0XHRodG1sRWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gdmFsdWUgYXMgc3RyaW5nO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZiAoaHRtbEVsZW1lbnQubm9kZVR5cGUgPT0gRUxFTUVOVF9OT0RFICYmIGtleSBpbiBodG1sRWxlbWVudCkge1xyXG5cdFx0XHRsZXQgYXR0cmlidXRlID0gaHRtbEVsZW1lbnRba2V5XTtcclxuXHRcdFx0YXR0cmlidXRlID0gdmFsdWU7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0aHRtbEVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gaHRtbEVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgcGFyZW50cyB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7QXJyYXk8SFRNTEVsZW1lbnQ+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudHMobm9kZTogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBBcnJheTxIVE1MRWxlbWVudD4ge1xyXG5cdHZhciBwYXJlbnRzID0gW10gYXMgQXJyYXk8SFRNTEVsZW1lbnQ+O1xyXG5cdHZhciBwYXJlbnQgPSBub2RlO1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KVxyXG5cdFx0JiYgIS8oOXwxMSkvLnRlc3QocGFyZW50Lm5vZGVUeXBlLnRvU3RyaW5nKCkpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHBhcmVudHMucHVzaChwYXJlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmVudHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmaXJzdCBwYXJlbnQgbm9kZSB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudChub2RlOiBIVE1MRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcclxuXHR2YXIgcGFyZW50ID0gbm9kZTtcclxuXHJcblx0d2hpbGUgKChwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudClcclxuXHRcdCYmICEvKDl8MTEpLy50ZXN0KHBhcmVudC5ub2RlVHlwZS50b1N0cmluZygpKSkge1xyXG5cdFx0aWYgKCFzZWxlY3RvciB8fCBpcyhwYXJlbnQsIHNlbGVjdG9yKSkge1xyXG5cdFx0XHRyZXR1cm4gcGFyZW50O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyB0aGUgcGFzc2VkIG5vZGUgYW5kIGFsbCBwYXJlbnRzIGFuZFxyXG4gKiByZXR1cm5zIHRoZSBmaXJzdCBtYXRjaGluZyBub2RlIGlmIGFueS5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3Qobm9kZTogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XHJcblx0cmV0dXJuIGlzKG5vZGUsIHNlbGVjdG9yKSA/IG5vZGUgOiBwYXJlbnQobm9kZSwgc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB0aGUgbm9kZSBmcm9tIHRoZSBET01cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuXHRpZiAobm9kZS5wYXJlbnROb2RlKSB7XHJcblx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQXBwZW5kcyBjaGlsZCB0byBwYXJlbnQgbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnR9IG5vZGVcclxuICogQHBhcmFtIHtOb2RlIHwgSFRNTEVsZW1lbnQgfCBzdHJpbmcgfCBudWxsIH0gY2hpbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQsIGNoaWxkOiBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQgfCBUZXh0KSB7XHJcblx0bm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGaW5kcyBhbnkgY2hpbGQgbm9kZXMgdGhhdCBtYXRjaCB0aGUgc2VsZWN0b3JcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnQgfCBEb2N1bWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtOb2RlTGlzdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kKG5vZGU6IEhUTUxFbGVtZW50IHwgRG9jdW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBOb2RlTGlzdCB7XHJcblx0cmV0dXJuIG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcclxuICogdG8gdGhlIGNhcHR1cmUgcGhhc2VcclxuICpcclxuICogQHR5cGUge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgbGV0IEVWRU5UX0NBUFRVUkU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIEZvciBvbigpIGFuZCBvZmYoKSBpZiB0byBhZGQvcmVtb3ZlIHRoZSBldmVudFxyXG4gKiB0byB0aGUgYnViYmxlIHBoYXNlXHJcbiAqXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGxldCBFVkVOVF9CVUJCTEU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50cy5cclxuICpcclxuICogRXZlbnRzIHNob3VsZCBiZSBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50cy5cclxuICpcclxuICogSWYgc2VsZWN0b3IgaXMgc3BlY2lmaWVkIHRoZSBoYW5kbGVyIHdpbGwgb25seSBiZVxyXG4gKiBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgdGFyZ2V0IG1hdGNoZXMgdGhlIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFOb2RlIHwgSFRNTEVsZW1lbnQgfCBXaW5kb3d9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50c1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKC4uLmFueSl9XHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhcHR1cmU9ZmFsc2VdXHJcbiAqIEBzZWUgb2ZmKClcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiBvbihub2RlOiAoV2luZG93ICYgdHlwZW9mIGdsb2JhbFRoaXMpIHwgRG9jdW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRzOiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcsIGZuOiBhbnksIGNhcHR1cmU6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cdGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcblx0XHR2YXIgaGFuZGxlcjtcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoc2VsZWN0b3IpKSB7XHJcblx0XHRcdGhhbmRsZXIgPSBmblsnX2VtbC1ldmVudC0nICsgZXZlbnQgKyBzZWxlY3Rvcl0gfHwgZnVuY3Rpb24gKGU6IGFueSkge1xyXG5cdFx0XHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuXHRcdFx0XHR3aGlsZSAodGFyZ2V0ICYmIHRhcmdldCAhPT0gbm9kZSkge1xyXG5cdFx0XHRcdFx0aWYgKGlzKHRhcmdldCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdFx0XHRcdGZuLmNhbGwodGFyZ2V0LCBlKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGZuWydfZW1sLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXSA9IGhhbmRsZXI7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoYW5kbGVyID0gZm47XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlIHx8IGZhbHNlKTtcclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRzLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFOb2RlIHwgSFRNTEVsZW1lbnQgfCBXaW5kb3d9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50c1xyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKE9iamVjdCl9IGZuXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhcHR1cmU9ZmFsc2VdXHJcbiAqIEBzZWUgb24oKVxyXG4gKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1wYXJhbXNcclxuZXhwb3J0IGZ1bmN0aW9uIG9mZihub2RlOiBOb2RlIHwgSFRNTEVsZW1lbnQgfCBXaW5kb3csIGV2ZW50czogc3RyaW5nLCBzZWxlY3Rvcjogc3RyaW5nLCBmbjogKGFyZzA6IG9iamVjdCkgPT4gYW55LCBjYXB0dXJlOiBib29sZWFuID0gZmFsc2UpIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRsZXQga2V5ID0gJ19lbWwtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3I7XHJcblx0XHRcdGhhbmRsZXIgPSBmbltrZXkgYXMga2V5b2YgdHlwZW9mIGZuXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZXIgPSBmbjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUgfHwgZmFsc2UpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSWYgb25seSBhdHRyIHBhcmFtIGlzIHNwZWNpZmllZCBpdCB3aWxsIGdldFxyXG4gKiB0aGUgdmFsdWUgb2YgdGhlIGF0dHIgcGFyYW0uXHJcbiAqXHJcbiAqIElmIHZhbHVlIGlzIHNwZWNpZmllZCBidXQgbnVsbCB0aGUgYXR0cmlidXRlXHJcbiAqIHdpbGwgYmUgcmVtb3ZlZCBvdGhlcndpc2UgdGhlIGF0dHIgdmFsdWUgd2lsbFxyXG4gKiBiZSBzZXQgdG8gdGhlIHBhc3NlZCB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBhdHRyXHJcbiAqIEBwYXJhbSB7P3N0cmluZ30gW3ZhbHVlXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dHIobm9kZTogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZywgdmFsdWU/OiBzdHJpbmcpOiBhbnkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0cmV0dXJuIG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG5cdH1cclxuXHJcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcSwgbm8tZXEtbnVsbFxyXG5cdGlmICghdmFsdWUpIHtcclxuXHRcdHJlbW92ZUF0dHIobm9kZSwgYXR0cik7XHJcblx0fSBlbHNlIHtcclxuXHRcdG5vZGUuc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gYXR0clxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHIobm9kZTogSFRNTEVsZW1lbnQsIGF0dHI6IHN0cmluZykge1xyXG5cdG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gbm9uZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGUobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgcGFzc2VkIGVsZW1lbnRzIGRpc3BsYXkgdG8gZGVmYXVsdFxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNob3cobm9kZTogYW55KSB7XHJcblx0Y3NzKG5vZGUsICdkaXNwbGF5JywgJycpO1xyXG59XHJcblxyXG4vKipcclxuICogVG9nZ2xlcyBhbiBlbGVtZW50cyB2aXNpYmlsaXR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKG5vZGU6IGFueSkge1xyXG5cdGlmIChpc1Zpc2libGUobm9kZSkpIHtcclxuXHRcdGhpZGUobm9kZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHNob3cobm9kZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBhIGNvbXB1dGVkIENTUyB2YWx1ZXMgb3Igc2V0cyBhbiBpbmxpbmUgQ1NTIHZhbHVlXHJcbiAqXHJcbiAqIFJ1bGVzIHNob3VsZCBiZSBpbiBjYW1lbENhc2UgZm9ybWF0IGFuZCBub3RcclxuICogaHlwaGVuYXRlZCBsaWtlIENTUyBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2FueX0gbm9kZVxyXG4gKiBAcGFyYW0ge2FueX0gcnVsZVxyXG4gKiBAcGFyYW0ge2FueX0gW3ZhbHVlXVxyXG4gKiBAcmV0dXJuIHthbnl9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3NzKG5vZGU6IGFueSwgcnVsZTogYW55LCB2YWx1ZT86IGFueSkge1xyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHJ1bGUpKSB7XHJcblx0XHRcdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAxID8gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKVtydWxlXSA6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dXRpbHMuZWFjaChydWxlLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0XHRjc3Mobm9kZSwga2V5LCB2YWx1ZSk7XHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gaXNOYU4gcmV0dXJucyBmYWxzZSBmb3IgbnVsbCwgZmFsc2UgYW5kIGVtcHR5IHN0cmluZ3NcclxuXHRcdC8vIHNvIG5lZWQgdG8gY2hlY2sgaXQncyB0cnV0aHkgb3IgMFxyXG5cdFx0dmFyIGlzTnVtZXJpYyA9ICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkgJiYgIWlzTmFOKHZhbHVlKTtcclxuXHRcdG5vZGUuc3R5bGVbcnVsZV0gPSBpc051bWVyaWMgPyB2YWx1ZSArICdweCcgOiB2YWx1ZTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSBkYXRhIGF0dHJpYnV0ZXMgb24gYSBub2RlXHJcbiAqXHJcbiAqIFVubGlrZSB0aGUgalF1ZXJ5IHZlcnNpb24gdGhpcyBvbmx5IHN0b3JlcyBkYXRhXHJcbiAqIGluIHRoZSBET00gYXR0cmlidXRlcyB3aGljaCBtZWFucyBvbmx5IHN0cmluZ3NcclxuICogY2FuIGJlIHN0b3JlZC5cclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3ZhbHVlXVxyXG4gKiBAcmV0dXJuIHtPYmplY3R8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGEobm9kZTogYW55LCBrZXk/OiBhbnksIHZhbHVlPzogYW55KTogb2JqZWN0IHwgdW5kZWZpbmVkIHtcclxuXHR2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XHJcblx0dmFyIGRhdGE6IGFueSA9IHt9O1xyXG5cclxuXHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHR1dGlscy5lYWNoKG5vZGUuYXR0cmlidXRlcywgZnVuY3Rpb24gKF8sIGF0dHIpIHtcclxuXHRcdFx0XHRpZiAoL15kYXRhLS9pLnRlc3QoYXR0ci5uYW1lKSkge1xyXG5cdFx0XHRcdFx0bGV0IGlkeCA9IGF0dHIubmFtZS5zdWJzdHIoNSkgYXMga2V5b2YgdHlwZW9mIGRhdGE7XHJcblx0XHRcdFx0XHRkYXRhW2lkeF0gPSBhdHRyLnZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoYXJnc0xlbmd0aCA9PT0gMikge1xyXG5cdFx0XHRyZXR1cm4gYXR0cihub2RlLCAnZGF0YS0nICsga2V5KTtcclxuXHRcdH1cclxuXHJcblx0XHRhdHRyKG5vZGUsICdkYXRhLScgKyBrZXksIFN0cmluZyh2YWx1ZSkpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBub2RlIG1hdGNoZXMgdGhlIGdpdmVuIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0gez9IVE1MRWxlbWVudCB8IENoaWxkTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXMobm9kZTogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHR2YXIgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG5cdGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0cmVzdWx0ID0gKG5vZGUubWF0Y2hlcykuY2FsbChub2RlLCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBub2RlIGNvbnRhaW5zIGNoaWxkIG90aGVyd2lzZSBmYWxzZS5cclxuICpcclxuICogVGhpcyBkaWZmZXJzIGZyb20gdGhlIERPTSBjb250YWlucygpIG1ldGhvZCBpbiB0aGF0XHJcbiAqIGlmIG5vZGUgYW5kIGNoaWxkIGFyZSBlcXVhbCB0aGlzIHdpbGwgcmV0dXJuIGZhbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKG5vZGU6IE5vZGUsIGNoaWxkOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG5cdHJldHVybiBub2RlICE9PSBjaGlsZCAmJiBub2RlLmNvbnRhaW5zICYmIG5vZGUuY29udGFpbnMoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEByZXR1cm5zIHs/SFRNTEVsZW1lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlOiBIVE1MRWxlbWVudCwgc2VsZWN0b3I/OiBzdHJpbmcpIHtcclxuXHR2YXIgcHJldiA9IG5vZGUucHJldmlvdXNFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0aWYgKHNlbGVjdG9yICYmIHByZXYpIHtcclxuXHRcdHJldHVybiBpcyhwcmV2LCBzZWxlY3RvcikgPyBwcmV2IDogbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiBwcmV2O1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxyXG4gKiBAcGFyYW0geyFOb2RlfSByZWZOb2RlXHJcbiAqIEByZXR1cm5zIHtOb2RlfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEJlZm9yZShub2RlOiBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQsIHJlZk5vZGU6IEVsZW1lbnQpIHtcclxuXHRyZXR1cm4gcmVmTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCByZWZOb2RlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEByZXR1cm5zIHshQXJyYXkuPHN0cmluZz59XHJcbiAqL1xyXG5mdW5jdGlvbiBjbGFzc2VzKG5vZGU6IEhUTUxFbGVtZW50KTogc3RyaW5nW10ge1xyXG5cdGNvbnN0IHJldFZhbHVlID0gbm9kZS5jbGFzc05hbWUudHJpbSgpLnNwbGl0KC9cXHMrLyk7XHJcblx0cmV0dXJuIHJldFZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhub2RlOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcclxuXHRyZXR1cm4gaXMobm9kZSwgJy4nICsgY2xhc3NOYW1lKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzcyhub2RlOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuXHR2YXIgY2xhc3NMaXN0ID0gY2xhc3Nlcyhub2RlKTtcclxuXHJcblx0aWYgKGNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKSB7XHJcblx0XHRjbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0bm9kZS5jbGFzc05hbWUgPSBjbGFzc0xpc3Quam9pbignICcpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKG5vZGU6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xyXG5cdHZhciBjbGFzc0xpc3QgPSBjbGFzc2VzKG5vZGUpO1xyXG5cclxuXHR1dGlscy5hcnJheVJlbW92ZShjbGFzc0xpc3QsIGNsYXNzTmFtZSk7XHJcblxyXG5cdG5vZGUuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oJyAnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZXMgYSBjbGFzcyBvbiBub2RlLlxyXG4gKlxyXG4gKiBJZiBzdGF0ZSBpcyBzcGVjaWZpZWQgYW5kIGlzIHRydXRoeSBpdCB3aWxsIGFkZFxyXG4gKiB0aGUgY2xhc3MuXHJcbiAqXHJcbiAqIElmIHN0YXRlIGlzIHNwZWNpZmllZCBhbmQgaXMgZmFsc2V5IGl0IHdpbGwgcmVtb3ZlXHJcbiAqIHRoZSBjbGFzcy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW3N0YXRlXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzKG5vZGU6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZywgc3RhdGU/OiBib29sZWFuKSB7XHJcblx0c3RhdGUgPSB1dGlscy5pc1VuZGVmaW5lZChzdGF0ZSkgPyAhaGFzQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSA6IHN0YXRlO1xyXG5cclxuXHRpZiAoc3RhdGUpIHtcclxuXHRcdGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSB3aWR0aCBvZiB0aGUgcGFzc2VkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKG5vZGU6IEhUTUxFbGVtZW50LCB2YWx1ZT86IG51bWJlciB8IHN0cmluZykge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ0xlZnQpICsgdG9GbG9hdChjcy5wYWRkaW5nUmlnaHQpO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyTGVmdFdpZHRoKSArIHRvRmxvYXQoY3MuYm9yZGVyUmlnaHRXaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0V2lkdGggLSBwYWRkaW5nIC0gYm9yZGVyO1xyXG5cdH1cclxuXHJcblx0Y3NzKG5vZGUsICd3aWR0aCcsIHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgb3Igc2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBwYXNzZWQgbm9kZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge251bWJlcnxzdHJpbmd9IFt2YWx1ZV1cclxuICogQHJldHVybnMge251bWJlcnx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGVpZ2h0KG5vZGU6IEhUTUxFbGVtZW50LCB2YWx1ZT86IG51bWJlciB8IHN0cmluZykge1xyXG5cdGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdHZhciBjcyA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XHJcblx0XHR2YXIgcGFkZGluZyA9IHRvRmxvYXQoY3MucGFkZGluZ1RvcCkgKyB0b0Zsb2F0KGNzLnBhZGRpbmdCb3R0b20pO1xyXG5cdFx0dmFyIGJvcmRlciA9IHRvRmxvYXQoY3MuYm9yZGVyVG9wV2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJCb3R0b21XaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIG5vZGUub2Zmc2V0SGVpZ2h0IC0gcGFkZGluZyAtIGJvcmRlcjtcclxuXHR9XHJcblxyXG5cdGNzcyhub2RlLCAnaGVpZ2h0JywgdmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogVHJpZ2dlcnMgYSBjdXN0b20gZXZlbnQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYW5kXHJcbiAqIHNldHMgdGhlIGRldGFpbCBwcm9wZXJ0eSB0byB0aGUgZGF0YSBvYmplY3QgcGFzc2VkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXIobm9kZTogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcblx0dmFyIGV2ZW50O1xyXG5cclxuXHRpZiAodXRpbHMuaXNGdW5jdGlvbih3aW5kb3cuQ3VzdG9tRXZlbnQpKSB7XHJcblx0XHRldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIHtcclxuXHRcdFx0YnViYmxlczogdHJ1ZSxcclxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZSxcclxuXHRcdFx0ZGV0YWlsOiBkYXRhXHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0ZXZlbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XHJcblx0XHRldmVudC5pbml0Q3VzdG9tRXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcclxuXHR9XHJcblxyXG5cdG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGlmIGEgbm9kZSBpcyB2aXNpYmxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Zpc2libGUobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuXHRyZXR1cm4gISFub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBDU1MgcHJvcGVydHkgbmFtZXMgaW50byBjYW1lbCBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHI6IHN0cmluZykge1xyXG5cdHJldHVybiBzdHJcclxuXHRcdC5yZXBsYWNlKC9eLW1zLS8sICdtcy0nKVxyXG5cdFx0LnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAobWF0Y2gsIGNoYXIpIHtcclxuXHRcdFx0cmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKTtcclxuXHRcdH0pO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIExvb3AgYWxsIGNoaWxkIG5vZGVzIG9mIHRoZSBwYXNzZWQgbm9kZVxyXG4gKlxyXG4gKiBUaGUgZnVuY3Rpb24gc2hvdWxkIGFjY2VwdCAxIHBhcmFtZXRlciBiZWluZyB0aGUgbm9kZS5cclxuICogSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgZmFsc2UgdGhlIGxvb3Agd2lsbCBiZSBleGl0ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBmdW5jICAgICAgICAgICBDYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgd2l0aCBldmVyeVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQgbm9kZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGlubmVybW9zdEZpcnN0ICBJZiB0aGUgaW5uZXJtb3N0IG5vZGUgc2hvdWxkIGJlIHBhc3NlZFxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIGZ1bmN0aW9uIGJlZm9yZSBpdCdzIHBhcmVudHMuXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IHNpYmxpbmdzT25seSAgICBJZiB0byBvbmx5IHRyYXZlcnNlIHRoZSBub2RlcyBzaWJsaW5nc1xyXG4gKiBAcGFyYW0gIHtib29sZWFufSBbcmV2ZXJzZT1mYWxzZV0gSWYgdG8gdHJhdmVyc2UgdGhlIG5vZGVzIGluIHJldmVyc2VcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZShub2RlOiBhbnksIGZ1bmM6IChub2RlOiBIVE1MRWxlbWVudCkgPT4gYW55LCBpbm5lcm1vc3RGaXJzdD86IGJvb2xlYW4sIHNpYmxpbmdzT25seT86IGJvb2xlYW4sIHJldmVyc2U6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cdG5vZGUgPSByZXZlcnNlID8gbm9kZS5sYXN0Q2hpbGQgOiBub2RlLmZpcnN0Q2hpbGQ7XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHR2YXIgbmV4dCA9IHJldmVyc2UgPyBub2RlLnByZXZpb3VzU2libGluZyA6IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQoIWlubmVybW9zdEZpcnN0ICYmIGZ1bmMobm9kZSkgPT09IGZhbHNlKSB8fFxyXG5cdFx0XHQoIXNpYmxpbmdzT25seSAmJiB0cmF2ZXJzZShcclxuXHRcdFx0XHRub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCByZXZlcnNlXHJcblx0XHRcdCkgPT09IGZhbHNlKSB8fFxyXG5cdFx0XHQoaW5uZXJtb3N0Rmlyc3QgJiYgZnVuYyhub2RlKSA9PT0gZmFsc2UpXHJcblx0XHQpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0O1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIExpa2UgdHJhdmVyc2UgYnV0IGxvb3BzIGluIHJldmVyc2VcclxuICogQHNlZSB0cmF2ZXJzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJUcmF2ZXJzZShub2RlOiBhbnksIGZ1bmM6IChub2RlOiBOb2RlKSA9PiBib29sZWFuLCBpbm5lcm1vc3RGaXJzdD86IGJvb2xlYW4sIHNpYmxpbmdzT25seT86IGJvb2xlYW4pIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCB0cnVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyBIVE1MIGludG8gYSBkb2N1bWVudCBmcmFnbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxyXG4gKiBAcGFyYW0ge0RvY3VtZW50fSBbY29udGV4dF1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWw6IHN0cmluZywgY29udGV4dD86IERvY3VtZW50KSB7XHJcblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblxyXG5cdHZhciByZXQgPSBjb250ZXh0LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHR2YXIgdG1wID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIGNvbnRleHQpO1xyXG5cclxuXHR0bXAuaW5uZXJIVE1MID0gaHRtbDtcclxuXHJcblx0bGV0IHRtcEZpcnN0Q2hpbGQgPSB0bXAuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudFxyXG5cdHdoaWxlICh0bXBGaXJzdENoaWxkKSB7XHJcblx0XHRhcHBlbmRDaGlsZChyZXQsIHRtcEZpcnN0Q2hpbGQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHJldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhbnkgc3R5bGluZy5cclxuICpcclxuICogSXQgaGFzIHN0eWxpbmcgaWYgaXQgaXMgbm90IGEgcGxhaW4gPGRpdj4gb3IgPHA+IG9yXHJcbiAqIGlmIGl0IGhhcyBhIGNsYXNzLCBzdHlsZSBhdHRyaWJ1dGUgb3IgZGF0YS5cclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogQHNpbmNlIDEuNC40XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGluZyhub2RlOiBIVE1MRWxlbWVudCkge1xyXG5cdHJldHVybiBub2RlICYmICghaXMobm9kZSwgJ3AsZGl2JykgfHwgbm9kZS5jbGFzc05hbWUgfHxcclxuXHRcdGF0dHIobm9kZSwgJ3N0eWxlJykgfHwgIXV0aWxzLmlzRW1wdHlPYmplY3QoZGF0YShub2RlKSkpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gZWxlbWVudCBmcm9tIG9uZSB0eXBlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIEZvciBleGFtcGxlIGl0IGNhbiBjb252ZXJ0IHRoZSBlbGVtZW50IDxiPiB0byA8c3Ryb25nPlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgdG9UYWdOYW1lXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKiBAc2luY2UgMS40LjRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCwgdG9UYWdOYW1lOiBzdHJpbmcpIHtcclxuXHR2YXIgbmV3RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQodG9UYWdOYW1lLCB7fSwgZWxlbWVudC5vd25lckRvY3VtZW50KTtcclxuXHJcblx0dXRpbHMuZWFjaChlbGVtZW50LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfLCBhdHRyaWJ1dGUpIHtcclxuXHRcdC8vIFNvbWUgYnJvd3NlcnMgcGFyc2UgaW52YWxpZCBhdHRyaWJ1dGVzIG5hbWVzIGxpa2VcclxuXHRcdC8vICdzaXplXCIyJyB3aGljaCB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBzZXQsIGp1c3RcclxuXHRcdC8vIGlnbm9yZSB0aGVzZS5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGF0dHIobmV3RWxlbWVudCwgYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XHJcblx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0fSk7XHJcblxyXG5cdGxldCBlbGVtZW50Rmlyc3RDaGlsZCA9IGVsZW1lbnQuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuXHR3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRhcHBlbmRDaGlsZChuZXdFbGVtZW50LCBlbGVtZW50Rmlyc3RDaGlsZCk7XHJcblx0fVxyXG5cclxuXHRlbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQpO1xyXG5cclxuXHRyZXR1cm4gbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgYmxvY2sgbGV2ZWwgZWxlbWVudHMgc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgdmFyIGJsb2NrTGV2ZWxMaXN0OiBzdHJpbmcgPSAnfGJvZHl8aHJ8cHxkaXZ8aDF8aDJ8aDN8aDR8aDV8aDZ8YWRkcmVzc3xwcmV8JyArXHJcblx0J2Zvcm18dGFibGV8dGJvZHl8dGhlYWR8dGZvb3R8dGh8dHJ8dGR8bGl8b2x8dWx8YmxvY2txdW90ZXxjZW50ZXJ8JyArXHJcblx0J2RldGFpbHN8c2VjdGlvbnxhcnRpY2xlfGFzaWRlfG5hdnxtYWlufGhlYWRlcnxoZ3JvdXB8Zm9vdGVyfGZpZWxkc2V0fCcgK1xyXG5cdCdkbHxkdHxkZHxmaWd1cmV8ZmlnY2FwdGlvbnwnO1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgZWxlbWVudHMgdGhhdCBkbyBub3QgYWxsb3cgY2hpbGRyZW4gc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiBAc2luY2UgIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2FuSGF2ZUNoaWxkcmVuKG5vZGU6IEVsZW1lbnQgfCBEb2N1bWVudCB8IERvY3VtZW50RnJhZ21lbnQgfCBIVE1MRWxlbWVudCkge1xyXG5cdC8vIDEgID0gRWxlbWVudFxyXG5cdC8vIDkgID0gRG9jdW1lbnRcclxuXHQvLyAxMSA9IERvY3VtZW50IEZyYWdtZW50XHJcblx0aWYgKCEvMTE/fDkvLnRlc3Qobm9kZS5ub2RlVHlwZS50b1N0cmluZygpKSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8gTGlzdCBvZiBlbXB0eSBIVE1MIHRhZ3Mgc2VwYXJhdGVkIGJ5IGJhciAofCkgY2hhcmFjdGVyLlxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvaW5kZXgvZWxlbWVudHMuaHRtbFxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xyXG5cdHJldHVybiAoJ3xpZnJhbWV8YXJlYXxiYXNlfGJhc2Vmb250fGJyfGNvbHxmcmFtZXxocnxpbWd8aW5wdXR8d2JyJyArXHJcblx0XHQnfGlzaW5kZXh8bGlua3xtZXRhfHBhcmFtfGNvbW1hbmR8ZW1iZWR8a2V5Z2VufHNvdXJjZXx0cmFja3wnICtcclxuXHRcdCdvYmplY3R8JykuaW5kZXhPZignfCcgKyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnfCcpIDwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGlzIGlubGluZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgYW55fSBlbG1cclxuICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZUNvZGVBc0Jsb2NrPWZhbHNlXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5saW5lKGVsbTogSFRNTEVsZW1lbnQgfCBhbnksIGluY2x1ZGVDb2RlQXNCbG9jazogYm9vbGVhbiA9IGZhbHNlKSB7XHJcblx0dmFyIHRhZ05hbWUsXHJcblx0XHRub2RlVHlwZSA9IChlbG0gfHwge30pLm5vZGVUeXBlIHx8IFRFWFRfTk9ERTtcclxuXHJcblx0aWYgKG5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybiBub2RlVHlwZSA9PT0gVEVYVF9OT0RFO1xyXG5cdH1cclxuXHJcblx0dGFnTmFtZSA9IGVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdGlmICh0YWdOYW1lID09PSAnY29kZScpIHtcclxuXHRcdHJldHVybiAhaW5jbHVkZUNvZGVBc0Jsb2NrO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGJsb2NrTGV2ZWxMaXN0LmluZGV4T2YoJ3wnICsgdGFnTmFtZSArICd8JykgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0aGUgQ1NTIGZyb20gMSBub2RlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIE9ubHkgY29waWVzIENTUyBkZWZpbmVkIG9uIHRoZSBlbGVtZW50IGUuZy4gc3R5bGUgYXR0ci5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZnJvbVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b1xyXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4xLjBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q1NTKGZyb206IEhUTUxFbGVtZW50LCB0bzogSFRNTEVsZW1lbnQpIHtcclxuXHRpZiAodG8uc3R5bGUgJiYgZnJvbS5zdHlsZSkge1xyXG5cdFx0dG8uc3R5bGUuY3NzVGV4dCA9IGZyb20uc3R5bGUuY3NzVGV4dCArIHRvLnN0eWxlLmNzc1RleHQ7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGEgRE9NIG5vZGUgaXMgZW1wdHlcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkobm9kZTogSFRNTEVsZW1lbnQgfCBEb2N1bWVudEZyYWdtZW50KTogYm9vbGVhbiB7XHJcblx0bGV0IGxhc3RDaGlsZCA9IG5vZGUubGFzdENoaWxkIGFzIEhUTUxFbGVtZW50O1xyXG5cdGlmIChsYXN0Q2hpbGQgJiYgaXNFbXB0eShsYXN0Q2hpbGQpKSB7XHJcblx0XHRyZW1vdmUobGFzdENoaWxkKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBub2RlLm5vZGVUeXBlID09PSAzID8gIW5vZGUubm9kZVZhbHVlIDpcclxuXHRcdChjYW5IYXZlQ2hpbGRyZW4obm9kZSkgJiYgIW5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpO1xyXG59XHJcblxyXG4vKipcclxuICogRml4ZXMgYmxvY2sgbGV2ZWwgZWxlbWVudHMgaW5zaWRlIGluIGlubGluZSBlbGVtZW50cy5cclxuICpcclxuICogQWxzbyBmaXhlcyBpbnZhbGlkIGxpc3QgbmVzdGluZyBieSBwbGFjaW5nIG5lc3RlZCBsaXN0c1xyXG4gKiBpbnNpZGUgdGhlIHByZXZpb3VzIGxpIHRhZyBvciB3cmFwcGluZyB0aGVtIGluIGFuIGxpIHRhZy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpeE5lc3Rpbmcobm9kZTogSFRNTEVsZW1lbnQpIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0bGV0IGxpc3QgPSAndWwsb2wnLFxyXG5cdFx0XHRpc0Jsb2NrID0gIWlzSW5saW5lKG5vZGUsIHRydWUpICYmIG5vZGUubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSxcclxuXHRcdFx0cGFyZW50ID0gbm9kZS5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdC8vIEFueSBibG9ja2xldmVsIGVsZW1lbnQgaW5zaWRlIGFuIGlubGluZSBlbGVtZW50IG5lZWRzIGZpeGluZy5cclxuXHRcdC8vIEFsc28gPHA+IHRhZ3MgdGhhdCBjb250YWluIGJsb2NrcyBzaG91bGQgYmUgZml4ZWRcclxuXHRcdGlmIChpc0Jsb2NrICYmIChpc0lubGluZShwYXJlbnQsIHRydWUpIHx8IHBhcmVudC50YWdOYW1lID09PSAnUCcpKSB7XHJcblx0XHRcdC8vIEZpbmQgdGhlIGxhc3QgaW5saW5lIHBhcmVudCBub2RlXHJcblx0XHRcdGxldCBsYXN0SW5saW5lUGFyZW50ID0gbm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0bGV0IGxhc3RJbmxpbmVQYXJlbnROb2RlID0gbGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50XHJcblx0XHRcdHdoaWxlIChpc0lubGluZShsYXN0SW5saW5lUGFyZW50Tm9kZSwgdHJ1ZSkgfHxcclxuXHRcdFx0XHRsYXN0SW5saW5lUGFyZW50Tm9kZS50YWdOYW1lID09PSAnUCcpIHtcclxuXHRcdFx0XHRsYXN0SW5saW5lUGFyZW50ID0gbGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgYmVmb3JlID0gZXh0cmFjdENvbnRlbnRzKGxhc3RJbmxpbmVQYXJlbnQsIG5vZGUpO1xyXG5cdFx0XHRsZXQgbWlkZGxlID0gbm9kZSBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRcdC8vIENsb25lIGlubGluZSBzdHlsaW5nIGFuZCBhcHBseSBpdCB0byB0aGUgYmxvY2tzIGNoaWxkcmVuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50LCB0cnVlKSkge1xyXG5cdFx0XHRcdGlmIChwYXJlbnQubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xyXG5cdFx0XHRcdFx0bGV0IGNsb25lID0gcGFyZW50LmNsb25lTm9kZSgpIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHRcdFx0bGV0IG1pZGRsZUZpcnN0Q2hpbGQgPSBtaWRkbGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRcdHdoaWxlIChtaWRkbGVGaXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRcdGFwcGVuZENoaWxkKGNsb25lLCBtaWRkbGVGaXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhcHBlbmRDaGlsZChtaWRkbGUsIGNsb25lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGluc2VydEJlZm9yZShtaWRkbGUsIGxhc3RJbmxpbmVQYXJlbnQpO1xyXG5cdFx0XHRpZiAoIWlzRW1wdHkoYmVmb3JlKSkge1xyXG5cdFx0XHRcdGluc2VydEJlZm9yZShiZWZvcmUsIG1pZGRsZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGlzRW1wdHkobGFzdElubGluZVBhcmVudCkpIHtcclxuXHRcdFx0XHRyZW1vdmUobGFzdElubGluZVBhcmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBGaXggaW52YWxpZCBuZXN0ZWQgbGlzdHMgd2hpY2ggc2hvdWxkIGJlIHdyYXBwZWQgaW4gYW4gbGkgdGFnXHJcblx0XHRsZXQgbm9kZVBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRpZiAoaXNCbG9jayAmJiBpcyhub2RlLCBsaXN0KSAmJiBpcyhub2RlUGFyZW50Tm9kZSwgbGlzdCkpIHtcclxuXHRcdFx0dmFyIGxpID0gcHJldmlvdXNFbGVtZW50U2libGluZyhub2RlLCAnbGknKTtcclxuXHJcblx0XHRcdGlmICghbGkpIHtcclxuXHRcdFx0XHRsaSA9IGNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKGxpLCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0YXBwZW5kQ2hpbGQobGksIG5vZGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgdGhlIGNvbW1vbiBwYXJlbnQgb2YgdHdvIG5vZGVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlMVxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTJcclxuICogQHJldHVybiB7P0hUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDb21tb25BbmNlc3Rvcihub2RlMTogSFRNTEVsZW1lbnQsIG5vZGUyOiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0d2hpbGUgKChub2RlMSA9IG5vZGUxLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpKSB7XHJcblx0XHRpZiAoY29udGFpbnMobm9kZTEsIG5vZGUyKSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZTE7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/Tm9kZX1cclxuICogQHBhcmFtIHtib29sZWFufSBbcHJldmlvdXM9ZmFsc2VdXHJcbiAqIEByZXR1cm5zIHs/Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaWJsaW5nKG5vZGU/OiBIVE1MRWxlbWVudCwgcHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XHJcblx0aWYgKCFub2RlKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdGxldCBzaWJsaW5nID0gKHByZXZpb3VzID8gbm9kZS5wcmV2aW91c1NpYmxpbmcgOiBub2RlLm5leHRTaWJsaW5nKSB8fCBnZXRTaWJsaW5nKG5vZGUucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudCwgcHJldmlvdXMpO1xyXG5cdHJldHVybiBzaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB1bnVzZWQgd2hpdGVzcGFjZSBmcm9tIHRoZSByb290IGFuZCBhbGwgaXQncyBjaGlsZHJlbi5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IHJvb3RcclxuICogQHNpbmNlIDEuNC4zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlV2hpdGVTcGFjZShyb290OiBIVE1MRWxlbWVudCkge1xyXG5cdHZhciBub2RlVmFsdWUsIG5vZGVUeXBlLCBuZXh0LCBwcmV2aW91cywgcHJldmlvdXNTaWJsaW5nLFxyXG5cdFx0bmV4dE5vZGUsIHRyaW1TdGFydCxcclxuXHRcdGNzc1doaXRlU3BhY2UgPSBjc3Mocm9vdCwgJ3doaXRlU3BhY2UnKSxcclxuXHRcdC8vIFByZXNlcnZlIG5ld2xpbmVzIGlmIGlzIHByZS1saW5lXHJcblx0XHRwcmVzZXJ2ZU5ld0xpbmVzID0gL2xpbmUkL2kudGVzdChjc3NXaGl0ZVNwYWNlKSxcclxuXHRcdG5vZGUgPSByb290LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdC8vIFNraXAgcHJlICYgcHJlLXdyYXAgd2l0aCBhbnkgdmVuZG9yIHByZWZpeFxyXG5cdGlmICgvcHJlKC13cmFwKT8kL2kudGVzdChjc3NXaGl0ZVNwYWNlKSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdG5leHROb2RlID0gbm9kZS5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHRcdG5vZGVWYWx1ZSA9IG5vZGUubm9kZVZhbHVlO1xyXG5cdFx0bm9kZVR5cGUgPSBub2RlLm5vZGVUeXBlO1xyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFICYmIG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRyZW1vdmVXaGl0ZVNwYWNlKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChub2RlVHlwZSA9PT0gVEVYVF9OT0RFKSB7XHJcblx0XHRcdG5leHQgPSBnZXRTaWJsaW5nKG5vZGUpO1xyXG5cdFx0XHRwcmV2aW91cyA9IGdldFNpYmxpbmcobm9kZSwgdHJ1ZSk7XHJcblx0XHRcdHRyaW1TdGFydCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzLCAnZW1sZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0cHJldmlvdXMgPSBnZXRTaWJsaW5nKHByZXZpb3VzLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgc2libGluZyBpc24ndCBpbmxpbmUgb3IgaXMgYSB0ZXh0bm9kZSB0aGF0XHJcblx0XHRcdC8vIGVuZHMgaW4gd2hpdGVzcGFjZSwgdGltZSB0aGUgc3RhcnQgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoaXNJbmxpbmUobm9kZSkgJiYgcHJldmlvdXMpIHtcclxuXHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBwcmV2aW91cztcclxuXHJcblx0XHRcdFx0d2hpbGUgKHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzU2libGluZy5sYXN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0d2hpbGUgKGhhc0NsYXNzKHByZXZpb3VzU2libGluZywgJ2VtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0XHRwcmV2aW91c1NpYmxpbmcgPSBnZXRTaWJsaW5nKHByZXZpb3VzU2libGluZywgdHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0cmltU3RhcnQgPSBwcmV2aW91c1NpYmxpbmcubm9kZVR5cGUgPT09IFRFWFRfTk9ERSA/XHJcblx0XHRcdFx0XHQvW1xcdFxcblxcciBdJC8udGVzdChwcmV2aW91c1NpYmxpbmcubm9kZVZhbHVlKSA6XHJcblx0XHRcdFx0XHQhaXNJbmxpbmUocHJldmlvdXNTaWJsaW5nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2xlYXIgemVybyB3aWR0aCBzcGFjZXNcclxuXHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoL1xcdTIwMEIvZywgJycpO1xyXG5cclxuXHRcdFx0Ly8gU3RyaXAgbGVhZGluZyB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmICghcHJldmlvdXMgfHwgIWlzSW5saW5lKHByZXZpb3VzKSB8fCB0cmltU3RhcnQpIHtcclxuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvXltcXHQgXSsvIDogL15bXFx0XFxuXFxyIF0rLyxcclxuXHRcdFx0XHRcdCcnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU3RyaXAgdHJhaWxpbmcgd2hpdGVzcGFjZVxyXG5cdFx0XHRpZiAoIW5leHQgfHwgIWlzSW5saW5lKG5leHQpKSB7XHJcblx0XHRcdFx0bm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSskLyA6IC9bXFx0XFxuXFxyIF0rJC8sXHJcblx0XHRcdFx0XHQnJ1xyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJlbW92ZSBlbXB0eSB0ZXh0IG5vZGVzXHJcblx0XHRcdGlmICghbm9kZVZhbHVlLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlbW92ZShub2RlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9bXFx0IF0rL2cgOiAvW1xcdFxcblxcciBdKy9nLFxyXG5cdFx0XHRcdFx0JyAnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0Tm9kZTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0cyBhbGwgdGhlIG5vZGVzIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQgbm9kZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc3RhcnROb2RlXHRUaGUgbm9kZSB0byBzdGFydCBleHRyYWN0aW5nIGF0XHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVuZE5vZGVcdFx0VGhlIG5vZGUgdG8gc3RvcCBleHRyYWN0aW5nIGF0XHJcbiAqIEByZXR1cm4ge0RvY3VtZW50RnJhZ21lbnR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdENvbnRlbnRzKHN0YXJ0Tm9kZTogSFRNTEVsZW1lbnQsIGVuZE5vZGU6IEhUTUxFbGVtZW50KTogRG9jdW1lbnRGcmFnbWVudCB7XHJcblx0dmFyIHJhbmdlID0gc3RhcnROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHJcblx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoc3RhcnROb2RlKTtcclxuXHRyYW5nZS5zZXRFbmRBZnRlcihlbmROb2RlKTtcclxuXHJcblx0cmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgb2Zmc2V0IHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBsZWZ0IGFuZCB0b3AgcHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChub2RlOiBIVE1MRWxlbWVudCk6IHsgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciB9IHtcclxuXHR2YXIgbGVmdCA9IDAsXHJcblx0XHR0b3AgPSAwO1xyXG5cclxuXHR3aGlsZSAobm9kZSkge1xyXG5cdFx0bGVmdCArPSBub2RlLm9mZnNldExlZnQ7XHJcblx0XHR0b3AgKz0gbm9kZS5vZmZzZXRUb3A7XHJcblx0XHRub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bGVmdDogbGVmdCxcclxuXHRcdHRvcDogdG9wXHJcblx0fTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGEgQ1NTIHByb3BlcnR5IGZyb20gdGhlIGVsZW1lbnRzIHN0eWxlIGF0dHJpYnV0ZVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdGxldCBzdHlsZVZhbHVlOiBzdHJpbmc7XHJcblx0bGV0IGVsbVN0eWxlID0gZWxtLnN0eWxlO1xyXG5cclxuXHRpZiAoIWNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XSkge1xyXG5cdFx0Y3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldID0gY2FtZWxDYXNlKHByb3BlcnR5KTtcclxuXHR9XHJcblxyXG5cdHByb3BlcnR5ID0gY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldO1xyXG5cdHN0eWxlVmFsdWUgPSBlbG1TdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcclxuXHJcblx0Ly8gQWRkIGFuIGV4Y2VwdGlvbiBmb3IgdGV4dC1hbGlnblxyXG5cdGlmICgndGV4dEFsaWduJyA9PT0gcHJvcGVydHkpIHtcclxuXHRcdHN0eWxlVmFsdWUgPSBzdHlsZVZhbHVlIHx8IGNzcyhlbG0sIHByb3BlcnR5KTtcclxuXHJcblx0XHRpZiAoY3NzKGVsbS5wYXJlbnROb2RlLCBwcm9wZXJ0eSkgPT09IHN0eWxlVmFsdWUgfHxcclxuXHRcdFx0Y3NzKGVsbSwgJ2Rpc3BsYXknKSAhPT0gJ2Jsb2NrJyB8fCBpcyhlbG0sICdocix0aCcpKSB7XHJcblx0XHRcdHJldHVybiAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBzdHlsZVZhbHVlO1xyXG59XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgYW4gZWxlbWVudCBoYXMgYSBzdHlsZS5cclxuICpcclxuICogSWYgdmFsdWVzIGFyZSBzcGVjaWZpZWQgaXQgd2lsbCBjaGVjayB0aGF0IHRoZSBzdHlsZXMgdmFsdWVcclxuICogbWF0Y2hlcyBvbmUgb2YgdGhlIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gcHJvcGVydHlcclxuICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSBbdmFsdWVzXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxlKGVsbTogSFRNTEVsZW1lbnQsIHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlcz86IHN0cmluZyB8IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuXHR2YXIgc3R5bGVWYWx1ZSA9IGdldFN0eWxlKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRpZiAoIXN0eWxlVmFsdWUpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHJldHVybiAhdmFsdWVzIHx8IHN0eWxlVmFsdWUgPT09IHZhbHVlcyB8fFxyXG5cdFx0KEFycmF5LmlzQXJyYXkodmFsdWVzKSAmJiB2YWx1ZXMuaW5kZXhPZihzdHlsZVZhbHVlKSA+IC0xKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGlubGluZSBzdHlsZXMgYW5kIGFsbCB0aGVcclxuICogaW5saW5lIHN0eWxlcyBoYXZlIG1hdGNoaW5nIHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIHN0eWxlc01hdGNoKG5vZGVBOiBIVE1MRWxlbWVudCwgbm9kZUI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcblx0dmFyIGkgPSBub2RlQS5zdHlsZS5sZW5ndGg7XHJcblx0aWYgKGkgIT09IG5vZGVCLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0bGV0IHByb3A6IHN0cmluZyA9IG5vZGVBLnN0eWxlW2ldO1xyXG5cdFx0aWYgKG5vZGVBLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkgIT09IG5vZGVCLnN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCBub2RlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBhdHRyaWJ1dGVzIGFuZCBhbGwgdGhlXHJcbiAqIGF0dHJpYnV0ZSB2YWx1ZXMgbWF0Y2hcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUFcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBhdHRyaWJ1dGVzTWF0Y2gobm9kZUE6IEhUTUxFbGVtZW50LCBub2RlQjogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuXHR2YXIgaSA9IG5vZGVBLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlQS5hdHRyaWJ1dGVzW2ldO1xyXG5cdFx0dmFyIG5vdE1hdGNoZXMgPSBwcm9wLm5hbWUgPT09ICdzdHlsZScgP1xyXG5cdFx0XHQhc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSA6XHJcblx0XHRcdHByb3AudmFsdWUgIT09IGF0dHIobm9kZUIsIHByb3AubmFtZSk7XHJcblxyXG5cdFx0aWYgKG5vdE1hdGNoZXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGVsZW1lbnQgcGxhY2luZyBpdHMgY2hpbGRyZW4gaW4gaXRzIHBsYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUtlZXBDaGlsZHJlbihub2RlOiBIVE1MRWxlbWVudCkge1xyXG5cdGxldCBub2RlRmlyc3RDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnQ7XHJcblx0d2hpbGUgKG5vZGVGaXJzdENoaWxkKSB7XHJcblx0XHRpbnNlcnRCZWZvcmUobm9kZUZpcnN0Q2hpbGQsIG5vZGUpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlKG5vZGUpO1xyXG59XHJcblxyXG4vKipcclxuICogTWVyZ2VzIGlubGluZSBzdHlsZXMgYW5kIHRhZ3Mgd2l0aCBwYXJlbnRzIHdoZXJlIHBvc3NpYmxlXHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAc2luY2UgMy4xLjBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtZXJnZShub2RlOiBIVE1MRWxlbWVudCkge1xyXG5cdGlmIChub2RlLm5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0dmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWU7XHJcblx0dmFyIG1lcmdlVGFncyA9IC9CfFNUUk9OR3xFTXxTUEFOfEZPTlQvO1xyXG5cclxuXHQvLyBNZXJnZSBjaGlsZHJlbiAoaW4gcmV2ZXJzZSBhcyBjaGlsZHJlbiBjYW4gYmUgcmVtb3ZlZClcclxuXHR2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0bWVyZ2Uobm9kZS5jaGlsZE5vZGVzW2ldIGFzIEhUTUxFbGVtZW50KTtcclxuXHR9XHJcblxyXG5cdC8vIFNob3VsZCBvbmx5IG1lcmdlIGlubGluZSB0YWdzIGFuZCBzaG91bGQgbm90IG1lcmdlIDxicj4gdGFnc1xyXG5cdGlmICghaXNJbmxpbmUobm9kZSkgfHwgdGFnTmFtZSA9PT0gJ0JSJykge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Ly8gUmVtb3ZlIGFueSBpbmxpbmUgc3R5bGVzIHRoYXQgbWF0Y2ggdGhlIHBhcmVudCBzdHlsZVxyXG5cdGkgPSBub2RlLnN0eWxlLmxlbmd0aDtcclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGUuc3R5bGVbaV07XHJcblx0XHRpZiAoY3NzKHBhcmVudCwgcHJvcCkgPT09IGNzcyhub2RlLCBwcm9wKSkge1xyXG5cdFx0XHRub2RlLnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3ApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gQ2FuIG9ubHkgcmVtb3ZlIC8gbWVyZ2UgdGFncyBpZiBubyBpbmxpbmUgc3R5bGluZyBsZWZ0LlxyXG5cdC8vIElmIHRoZXJlIGlzIGFueSBpbmxpbmUgc3R5bGUgbGVmdCB0aGVuIGl0IG1lYW5zIGl0IGF0IGxlYXN0IHBhcnRpYWxseVxyXG5cdC8vIGRvZXNuJ3QgbWF0Y2ggdGhlIHBhcmVudCBzdHlsZSBzbyBtdXN0IHN0YXlcclxuXHRpZiAoIW5vZGUuc3R5bGUubGVuZ3RoKSB7XHJcblx0XHRyZW1vdmVBdHRyKG5vZGUsICdzdHlsZScpO1xyXG5cclxuXHRcdC8vIFJlbW92ZSBmb250IGF0dHJpYnV0ZXMgaWYgbWF0Y2ggcGFyZW50XHJcblx0XHRpZiAodGFnTmFtZSA9PT0gJ0ZPTlQnKSB7XHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2ZvbnRGYW1pbHknKS50b0xvd2VyQ2FzZSgpID09PVxyXG5cdFx0XHRcdGNzcyhwYXJlbnQsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ2ZhY2UnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnY29sb3InKSA9PT0gY3NzKHBhcmVudCwgJ2NvbG9yJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdjb2xvcicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250U2l6ZScpID09PSBjc3MocGFyZW50LCAnZm9udFNpemUnKSkge1xyXG5cdFx0XHRcdHJlbW92ZUF0dHIobm9kZSwgJ3NpemUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNwYW5zIGFuZCBmb250IHRhZ3Mgd2l0aCBubyBhdHRyaWJ1dGVzIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZFxyXG5cdFx0aWYgKCFub2RlLmF0dHJpYnV0ZXMubGVuZ3RoICYmIC9TUEFOfEZPTlQvLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlS2VlcENoaWxkcmVuKG5vZGUpO1xyXG5cdFx0fSBlbHNlIGlmIChtZXJnZVRhZ3MudGVzdCh0YWdOYW1lKSkge1xyXG5cdFx0XHR2YXIgaXNCb2xkID0gL0J8U1RST05HLy50ZXN0KHRhZ05hbWUpO1xyXG5cdFx0XHR2YXIgaXNJdGFsaWMgPSB0YWdOYW1lID09PSAnRU0nO1xyXG5cclxuXHRcdFx0d2hpbGUgKHBhcmVudCAmJiBpc0lubGluZShwYXJlbnQpICYmXHJcblx0XHRcdFx0KCFpc0JvbGQgfHwgL2JvbGR8NzAwL2kudGVzdChjc3MocGFyZW50LCAnZm9udFdlaWdodCcpKSkgJiZcclxuXHRcdFx0XHQoIWlzSXRhbGljIHx8IGNzcyhwYXJlbnQsICdmb250U3R5bGUnKSA9PT0gJ2l0YWxpYycpKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJlbW92ZSBpZiBwYXJlbnQgbWF0Y2hcclxuXHRcdFx0XHRpZiAoKHBhcmVudC50YWdOYW1lID09PSB0YWdOYW1lIHx8XHJcblx0XHRcdFx0XHQoaXNCb2xkICYmIC9CfFNUUk9ORy8udGVzdChwYXJlbnQudGFnTmFtZSkpKSAmJlxyXG5cdFx0XHRcdFx0YXR0cmlidXRlc01hdGNoKHBhcmVudCwgbm9kZSkpIHtcclxuXHRcdFx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIE1lcmdlIHNpYmxpbmdzIGlmIGF0dHJpYnV0ZXMsIGluY2x1ZGluZyBpbmxpbmUgc3R5bGVzLCBtYXRjaFxyXG5cdHZhciBuZXh0ID0gbm9kZS5uZXh0U2libGluZyBhcyBIVE1MRWxlbWVudDtcclxuXHRpZiAobmV4dCAmJiBuZXh0LnRhZ05hbWUgPT09IHRhZ05hbWUgJiYgYXR0cmlidXRlc01hdGNoKG5leHQsIG5vZGUpKSB7XHJcblx0XHRhcHBlbmRDaGlsZChub2RlLCBuZXh0KTtcclxuXHRcdHJlbW92ZUtlZXBDaGlsZHJlbihuZXh0KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tJztcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0T3B0aW9ucyBmcm9tICcuL2RlZmF1bHRPcHRpb25zLmpzJztcclxuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2RlZmF1bHRDb21tYW5kcy5qcyc7XHJcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuL3BsdWdpbk1hbmFnZXInO1xyXG5pbXBvcnQgeyBSYW5nZUhlbHBlciB9IGZyb20gJy4vcmFuZ2VIZWxwZXInO1xyXG5pbXBvcnQgdGVtcGxhdGVzIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2Jyb3dzZXIuanMnO1xyXG5pbXBvcnQgKiBhcyBlbW90aWNvbnMgZnJvbSAnLi9lbW90aWNvbnMuanMnO1xyXG5pbXBvcnQgRE9NUHVyaWZ5IGZyb20gJ2RvbXB1cmlmeSc7XHJcblxyXG52YXIgZ2xvYmFsV2luID0gd2luZG93O1xyXG52YXIgZ2xvYmFsRG9jID0gZG9jdW1lbnQ7XHJcblxyXG4vKipcclxuICogRW1sRWRpdG9yIC0gWUFFISBZZXQgQW5vdGhlciBFZGl0b3JcclxuICogQGNsYXNzIEVtbEVkaXRvclxyXG4gKiBAbmFtZSBFbWxFZGl0b3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtbEVkaXRvciB7XHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcih0ZXh0YXJlYTogYW55LCB1c2VyT3B0aW9uczogYW55KSB7XHJcblx0XHR0aGlzLnRleHRhcmVhID0gdGV4dGFyZWE7XHJcblx0XHR0aGlzLm9wdGlvbnMgPSB0aGlzLmVkaXRvck9wdGlvbnMgPSB1dGlscy5leHRlbmQodHJ1ZSwge30sIChkZWZhdWx0T3B0aW9ucyBhcyBhbnkpLCB1c2VyT3B0aW9ucyk7XHJcblx0XHR0aGlzLmNvbW1hbmRzID0gdXRpbHMuZXh0ZW5kKHRydWUsIHt9LCAodXNlck9wdGlvbnMuY29tbWFuZHMgfHwgZGVmYXVsdENvbW1hbmRzKSk7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgZGVlcCBleHRlbmQgZW1vdGljb25zIChmaXhlcyAjNTY1KVxyXG5cdFx0dGhpcy5lZGl0b3JPcHRpb25zLmVtb3RpY29ucyA9IHVzZXJPcHRpb25zLmVtb3RpY29ucyB8fCAoZGVmYXVsdE9wdGlvbnMgYXMgYW55KS5lbW90aWNvbnM7XHJcblxyXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscykpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzID0gW107XHJcblx0XHR9XHJcblx0XHR0aGlzLm9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHMucHVzaCgnaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQvJyk7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBET01QdXJpZnkgZm9yIGVhY2ggZWRpdG9yIGluc3RhbmNlIHNvIGNhblxyXG5cdFx0Ly8gaGF2ZSBkaWZmZXJlbnQgYWxsb3dlZCBpZnJhbWUgVVJMc1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5ldy1jYXBcclxuXHRcdHRoaXMuZG9tUHVyaWZ5ID0gRE9NUHVyaWZ5KCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgaWZyYW1lcyBmb3IgdGhpbmdzIGxpa2UgWW91VHViZSwgc2VlOlxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvaXNzdWVzLzM0MCNpc3N1ZWNvbW1lbnQtNjcwNzU4OTgwXHJcblx0XHR0aGlzLmRvbVB1cmlmeS5hZGRIb29rKCd1cG9uU2FuaXRpemVFbGVtZW50JywgKG5vZGU6IEhUTUxFbGVtZW50LCBkYXRhOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IGFsbG93ZWRVcmxzID0gdGhpcy5vcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEudGFnTmFtZSA9PT0gJ2lmcmFtZScpIHtcclxuXHRcdFx0XHRsZXQgc3JjID0gZG9tLmF0dHIobm9kZSwgJ3NyYycpIHx8ICcnO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFsbG93ZWRVcmxzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsZXQgdXJsID0gYWxsb3dlZFVybHNbaV07XHJcblxyXG5cdFx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHVybCkgJiYgc3JjLnN1YnN0cigwLCB1cmwubGVuZ3RoKSA9PT0gdXJsKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgcmVnZXhcclxuXHRcdFx0XHRcdGlmICh1cmwudGVzdCAmJiB1cmwudGVzdChzcmMpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIE5vIG1hdGNoIHNvIHJlbW92ZVxyXG5cdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENvbnZlcnQgdGFyZ2V0IGF0dHJpYnV0ZSBpbnRvIGRhdGEtZW1sLXRhcmdldCBhdHRyaWJ1dGVzIHNvIFhIVE1MIGZvcm1hdFxyXG5cdFx0Ly8gY2FuIGFsbG93IHRoZW1cclxuXHRcdHRoaXMuZG9tUHVyaWZ5LmFkZEhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcblx0XHRcdGlmICgndGFyZ2V0JyBpbiBub2RlKSB7XHJcblx0XHRcdFx0ZG9tLmF0dHIobm9kZSwgJ2RhdGEtZW1sLXRhcmdldCcsIGRvbS5hdHRyKG5vZGUsICd0YXJnZXQnKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5yZW1vdmVBdHRyKG5vZGUsICd0YXJnZXQnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHJ1biB0aGUgaW5pdGlhbGl6ZXJcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAqIFB1YmxpYyBtZW1iZXJzXHJcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblx0Ly8jcmVnaW9uXHJcblx0cHVibGljIHVzZXJPcHRpb25zOiBhbnk7XHJcblx0cHVibGljIGVkaXRvck9wdGlvbnM6IGFueTtcclxuXHRwdWJsaWMgdGV4dGFyZWE6IGFueTtcclxuXHRwdWJsaWMgY29tbWFuZHM6IGFueTtcclxuXHRwdWJsaWMgbG9uZ2VzdEVtb3RpY29uQ29kZTogbnVtYmVyO1xyXG5cdHB1YmxpYyBlbW90aWNvbnNDYWNoZTogYW55O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoZXMgYmV0d2VlbiB0aGUgV1lTSVdZRyBhbmQgc291cmNlIG1vZGVzXHJcblx0ICpcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB0b2dnbGVTb3VyY2VNb2RlXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgdG9nZ2xlU291cmNlTW9kZSgpOiB2b2lkIHtcclxuXHRcdGxldCBpc0luU291cmNlTW9kZSA9IHRoaXMuaW5Tb3VyY2VNb2RlKCk7XHJcblxyXG5cdFx0Ly8gZG9uJ3QgYWxsb3cgc3dpdGNoaW5nIHRvIFdZU0lXWUcgaWYgZG9lc24ndCBzdXBwb3J0IGl0XHJcblx0XHRpZiAoIWJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkICYmIGlzSW5Tb3VyY2VNb2RlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWlzSW5Tb3VyY2VNb2RlKSB7XHJcblx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuY2xlYXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSBudWxsO1xyXG5cdFx0dGhpcy5ibHVyKCk7XHJcblxyXG5cdFx0aWYgKGlzSW5Tb3VyY2VNb2RlKSB7XHJcblx0XHRcdHRoaXMuc2V0V3lzaXd5Z0VkaXRvclZhbHVlKHRoaXMuZ2V0U291cmNlRWRpdG9yVmFsdWUoKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNldFNvdXJjZUVkaXRvclZhbHVlKHRoaXMuZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS50b2dnbGUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0ZG9tLnRvZ2dsZSh0aGlzLnd5c2l3eWdFZGl0b3IpO1xyXG5cclxuXHRcdGRvbS50b2dnbGVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3d5c2l3eWdNb2RlJywgaXNJblNvdXJjZU1vZGUpO1xyXG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScsICFpc0luU291cmNlTW9kZSk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVUb29sQmFyKCk7XHJcblx0XHR0aGlzLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQqIElmIHRoZSBlZGl0b3IgaXMgaW4gc291cmNlIGNvZGUgbW9kZVxyXG5cdCpcclxuXHQqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0KiBAZnVuY3Rpb25cclxuXHQqIEBuYW1lIGluU291cmNlTW9kZVxyXG5cdCogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQqL1xyXG5cdHB1YmxpYyBpblNvdXJjZU1vZGUoKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gZG9tLmhhc0NsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGN1cnJlbnQgbm9kZSB0aGF0IGNvbnRhaW5zIHRoZSBzZWxlY3Rpb24vY2FyZXQgaW5cclxuXHQgKiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBXaWxsIGJlIG51bGwgaW4gc291cmNlTW9kZSBvciBpZiB0aGVyZSBpcyBubyBzZWxlY3Rpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHs/Tm9kZX1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjdXJyZW50Tm9kZVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIEN1cnJlbnROb2RlKCk6IGFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Tm9kZTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBmaXJzdCBibG9jayBsZXZlbCBub2RlIHRoYXQgY29udGFpbnMgdGhlXHJcblx0ICogc2VsZWN0aW9uL2NhcmV0IGluIFdZU0lXWUcgbW9kZS5cclxuXHQgKlxyXG5cdCAqIFdpbGwgYmUgbnVsbCBpbiBzb3VyY2VNb2RlIG9yIGlmIHRoZXJlIGlzIG5vIHNlbGVjdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gez9Ob2RlfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIEN1cnJlbnRCbG9ja05vZGVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuNFxyXG5cdCAqL1xyXG5cdHB1YmxpYyBDdXJyZW50QmxvY2tOb2RlKCk6IGFueSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50QmxvY2tOb2RlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBlZGl0b3JzIGJsdXIgZXZlbnRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGJsdXJeMlxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIGJsdXIoaGFuZGxlcj86IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5Zz86IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdHRoaXMuYmluZCgnYmx1cicsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHRcdH0gZWxzZSBpZiAoIXRoaXMuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdHRoaXMud3lzaXd5Z0JvZHkuYmx1cigpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3IuYmx1cigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHRleHQgZWRpdG9yIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBzZXRTb3VyY2VFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNldFNvdXJjZUVkaXRvclZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnZhbHVlID0gdmFsdWU7XHJcblx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZWRpdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgZmlsdGVyIHNldCB0cnVlIHRoZSB2YWwgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyXHJcblx0ICogZnVuY3Rpb24uIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luIGl0IHdpbGwgcGFzcyB0aGUgdmFsIHRvXHJcblx0ICogdGhlIEJCQ29kZSBmaWx0ZXIgdG8gY29udmVydCBhbnkgQkJDb2RlIGludG8gSFRNTC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gdmFsXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWxeMlxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHZhbCh2YWw/OiBzdHJpbmcsIGZpbHRlcjogYm9vbGVhbiA9IHRydWUpOiBhbnkge1xyXG5cdFx0aWYgKCF1dGlscy5pc1N0cmluZyh2YWwpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmluU291cmNlTW9kZSgpID9cclxuXHRcdFx0XHR0aGlzLmdldFNvdXJjZUVkaXRvclZhbHVlKGZhbHNlKSA6XHJcblx0XHRcdFx0dGhpcy5nZXRXeXNpd3lnRWRpdG9yVmFsdWUoZmlsdGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaW5Tb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ3RvSHRtbCcgaW4gdGhpcy5mb3JtYXQpIHtcclxuXHRcdFx0XHR2YWwgPSB0aGlzLmZvcm1hdC50b0h0bWwodmFsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zZXRXeXNpd3lnRWRpdG9yVmFsdWUodmFsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2V0U291cmNlRWRpdG9yVmFsdWUodmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSB0ZXh0YXJlYSB0aGF0IHRoZSBlZGl0b3IgaXMgcmVwbGFjaW5nXHJcblx0ICogd2l0aCB0aGUgdmFsdWUgY3VycmVudGx5IGluc2lkZSB0aGUgZWRpdG9yLlxyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2V0VGV4dGFyZWFWYWx1ZVxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNldFRleHRhcmVhVmFsdWUoKSB7XHJcblx0XHQvL1RPRE9cclxuXHRcdHRoaXMudGV4dGFyZWEudmFsdWUgPSB0aGlzLnZhbCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIFdZU0lXWUcgSFRNTCBlZGl0b3IgdmFsdWUuIFNob3VsZCBvbmx5IGJlIHRoZSBIVE1MXHJcblx0ICogY29udGFpbmVkIHdpdGhpbiB0aGUgYm9keSB0YWdzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBzZXRXeXNpd3lnRWRpdG9yVmFsdWVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzZXRXeXNpd3lnRWRpdG9yVmFsdWUodmFsdWU6IHN0cmluZykge1xyXG5cdFx0aWYgKCF2YWx1ZSkge1xyXG5cdFx0XHR2YWx1ZSA9ICc8cD48YnIgLz48L3A+JztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnd5c2l3eWdCb2R5LmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUodmFsdWUpO1xyXG5cdFx0dGhpcy5yZXBsYWNlRW1vdGljb25zKCk7XHJcblx0XHR0aGlzLmFwcGVuZE5ld0xpbmUoKTtcclxuXHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0dGhpcy5hdXRvRXhwYW5kKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgdGV4dCBlZGl0b3IgdmFsdWVcclxuXHQgKlxyXG5cdCAqIElmIHVzaW5nIGEgcGx1Z2luIHRoYXQgZmlsdGVycyB0aGUgdGV4dCBsaWtlIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogaXQgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlsdGVyaW5nIHdoaWNoIGlzIEJCQ29kZSB0b1xyXG5cdCAqIEhUTUwgc28gaXQgd2lsbCByZXR1cm4gSFRNTC4gSWYgZmlsdGVyIGlzIHNldCB0byBmYWxzZSBpdCB3aWxsXHJcblx0ICoganVzdCByZXR1cm4gdGhlIGNvbnRlbnRzIG9mIHRoZSBzb3VyY2UgZWRpdG9yIChCQkNvZGUpLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHs/Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjBcclxuXHQgKiBAbmFtZSBnZXRTb3VyY2VFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGdldFNvdXJjZUVkaXRvclZhbHVlKGZpbHRlcj86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG5cdFx0bGV0IHZhbCA9IHRoaXMuc291cmNlRWRpdG9yLnZhbHVlO1xyXG5cclxuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICd0b0h0bWwnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdHZhbCA9IHRoaXMuZm9ybWF0LnRvSHRtbCh2YWwpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZhbDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiA8cD5TZXRzIHRoZSB3aWR0aCBhbmQvb3IgaGVpZ2h0IG9mIHRoZSBlZGl0b3IuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+SWYgd2lkdGggb3IgaGVpZ2h0IGlzIG5vdCBudW1lcmljIGl0IGlzIGlnbm9yZWQuPC9wPlxyXG5cdCAqXHJcblx0ICogPHA+VGhlIHNhdmUgYXJndW1lbnQgc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIG5ldyBzaXplcy5cclxuXHQgKiBUaGUgc2F2ZWQgc2l6ZXMgY2FuIGJlIHVzZWQgZm9yIHRoaW5ncyBsaWtlIHJlc3RvcmluZyBmcm9tXHJcblx0ICogbWF4aW1pemVkIHN0YXRlLiBUaGlzIHNob3VsZCBub3JtYWxseSBiZSBsZWZ0IGFzIHRydWUuPC9wPlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdHdpZHRoXHRcdFdpZHRoIGluIHB4XHJcblx0ICogQHBhcmFtIHtudW1iZXJ9XHRcdGhlaWdodFx0XHRIZWlnaHQgaW4gcHhcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59XHRbc2F2ZT10cnVlXVx0SWYgdG8gc3RvcmUgdGhlIG5ldyBzaXplc1xyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgZGltZW5zaW9uc14zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgZGltZW5zaW9ucyh3aWR0aD86IGFueSwgaGVpZ2h0PzogYW55LCBzYXZlPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHQvLyBzZXQgdW5kZWZpbmVkIHdpZHRoL2hlaWdodCB0byBib29sZWFuIGZhbHNlXHJcblx0XHR3aWR0aCA9ICghd2lkdGggJiYgd2lkdGggIT09IDApID8gZmFsc2UgOiB3aWR0aDtcclxuXHRcdGhlaWdodCA9ICghaGVpZ2h0ICYmIGhlaWdodCAhPT0gMCkgPyBmYWxzZSA6IGhlaWdodDtcclxuXHJcblx0XHRpZiAod2lkdGggPT09IGZhbHNlICYmIGhlaWdodCA9PT0gZmFsc2UpIHtcclxuXHRcdFx0cmV0dXJuIHsgd2lkdGg6IHRoaXMud2lkdGgoKSwgaGVpZ2h0OiB0aGlzLmhlaWdodCgpIH07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHdpZHRoICE9PSBmYWxzZSkge1xyXG5cdFx0XHRpZiAoc2F2ZSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLm9wdGlvbnMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLndpZHRoKHRoaXMuZWRpdG9yQ29udGFpbmVyLCB3aWR0aCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGhlaWdodCAhPT0gZmFsc2UpIHtcclxuXHRcdFx0aWYgKHNhdmUgIT09IGZhbHNlKSB7XHJcblx0XHRcdFx0dGhpcy5vcHRpb25zLmhlaWdodCA9IGhlaWdodDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLmhlaWdodCh0aGlzLmVkaXRvckNvbnRhaW5lciwgaGVpZ2h0KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgcmVhZCBvbmx5XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2FueX0gcmVhZE9ubHlcclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIHJlYWRPbmx5XjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyByZWFkT25seShyZWFkT25seT86IGFueSk6IGFueSB7XHJcblx0XHRpZiAodHlwZW9mIHJlYWRPbmx5ICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuICF0aGlzLnNvdXJjZUVkaXRvci5yZWFkT25seTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnd5c2l3eWdCb2R5LmNvbnRlbnRFZGl0YWJsZSA9ICghcmVhZE9ubHkpLnRvU3RyaW5nKCk7XHJcblx0XHR0aGlzLnNvdXJjZUVkaXRvci5yZWFkT25seSA9ICFyZWFkT25seTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVRvb2xCYXIocmVhZE9ubHkpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYW4gZXZlbnQgaGFuZGxlciB0byB0aGUgZm9jdXMgZXZlbnRcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0Z1bmN0aW9uIHwgYW55fSBoYW5kbGVyXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVd5c2l3eWcgSWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZXhjbHVkZVNvdXJjZSAgaWYgdG8gZXhjbHVkZSBhZGRpbmcgdGhpcyBoYW5kbGVyXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGZvY3VzXjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBmb2N1cyhoYW5kbGVyPzogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnPzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0dGhpcy5iaW5kKCdmb2N1cycsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHRcdH0gZWxzZSBpZiAoIXRoaXMuaW5Tb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0Ly8gQWxyZWFkeSBoYXMgZm9jdXMgc28gZG8gbm90aGluZ1xyXG5cdFx0XHRpZiAoZG9tLmZpbmQodGhpcy53eXNpd3lnRG9jdW1lbnQsICc6Zm9jdXMnKS5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBjb250YWluZXI7XHJcblx0XHRcdGxldCBybmcgPSB0aGlzLnJhbmdlSGVscGVyLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdC8vIEZpeCBGRiBidWcgd2hlcmUgaXQgc2hvd3MgdGhlIGN1cnNvciBpbiB0aGUgd3JvbmcgcGxhY2VcclxuXHRcdFx0Ly8gaWYgdGhlIGVkaXRvciBoYXNuJ3QgaGFkIGZvY3VzIGJlZm9yZS4gU2VlIGlzc3VlICMzOTNcclxuXHRcdFx0aWYgKCF0aGlzLmN1cnJlbnRTZWxlY3Rpb24pIHtcclxuXHRcdFx0XHR0aGlzLmF1dG9mb2N1cyh0cnVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgY3Vyc29yIGlzIHNldCBhZnRlciBhIEJSIHdoZW4gdGhlIEJSIGlzIHRoZSBvbmx5XHJcblx0XHRcdC8vIGNoaWxkIG9mIHRoZSBwYXJlbnQuIEluIEZpcmVmb3ggdGhpcyBjYXVzZXMgYSBsaW5lIGJyZWFrXHJcblx0XHRcdC8vIHRvIG9jY3VyIHdoZW4gc29tZXRoaW5nIGlzIHR5cGVkLiBTZWUgaXNzdWUgIzMyMVxyXG5cdFx0XHRpZiAocm5nICYmIHJuZy5lbmRPZmZzZXQgPT09IDEgJiYgcm5nLmNvbGxhcHNlZCkge1xyXG5cdFx0XHRcdGNvbnRhaW5lciA9IHJuZy5lbmRDb250YWluZXI7XHJcblxyXG5cdFx0XHRcdGlmIChjb250YWluZXIgJiYgY29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICYmIGRvbS5pcygoY29udGFpbmVyLmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQpLCAnYnInKSkge1xyXG5cdFx0XHRcdFx0cm5nLnNldFN0YXJ0QmVmb3JlKGNvbnRhaW5lci5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdHJuZy5jb2xsYXBzZSh0cnVlKTtcclxuXHRcdFx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuc2VsZWN0UmFuZ2Uocm5nKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMud3lzaXd5Z1dpbmRvdy5mb2N1cygpO1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LmZvY3VzKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEV4cGFuZHMgb3Igc2hyaW5rcyB0aGUgZWRpdG9ycyBoZWlnaHQgdG8gdGhlIGhlaWdodCBvZiBpdCdzIGNvbnRlbnRcclxuXHQgKlxyXG5cdCAqIFVubGVzcyBpZ25vcmVNYXhIZWlnaHQgaXMgc2V0IHRvIHRydWUgaXQgd2lsbCBub3QgZXhwYW5kXHJcblx0ICogaGlnaGVyIHRoYW4gdGhlIG1heEhlaWdodCBvcHRpb24uXHJcblx0ICpcclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtpZ25vcmVNYXhIZWlnaHQ9ZmFsc2VdXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZXhwYW5kVG9Db250ZW50XHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2VlICNyZXNpemVUb0NvbnRlbnRcclxuXHQgKi9cclxuXHRwdWJsaWMgZXhwYW5kVG9Db250ZW50KGlnbm9yZU1heEhlaWdodDogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMubWF4aW1pemUoKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuYXV0b0V4cGFuZFRocm90dGxlKTtcclxuXHRcdHRoaXMuYXV0b0V4cGFuZFRocm90dGxlID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmF1dG9FeHBhbmRCb3VuZHMpIHtcclxuXHRcdFx0bGV0IGhlaWdodCA9IHRoaXMub3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgdGhpcy5vcHRpb25zLmhlaWdodCB8fFxyXG5cdFx0XHRcdGRvbS5oZWlnaHQodGhpcy50ZXh0YXJlYSk7XHJcblxyXG5cdFx0XHR0aGlzLmF1dG9FeHBhbmRCb3VuZHMgPSB7XHJcblx0XHRcdFx0bWluOiBoZWlnaHQsXHJcblx0XHRcdFx0bWF4OiB0aGlzLm9wdGlvbnMucmVzaXplTWF4SGVpZ2h0IHx8IChoZWlnaHQgKiAyKVxyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCByYW5nZSA9IGdsb2JhbERvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdGxldCByZWN0ID0gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRsZXQgY3VycmVudCA9IHRoaXMud3lzaXd5Z0RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSAxO1xyXG5cdFx0bGV0IHNwYWNlTmVlZGVkID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcDtcclxuXHRcdGxldCBuZXdIZWlnaHQgPSB0aGlzLmhlaWdodCgpICsgMSArIChzcGFjZU5lZWRlZCAtIGN1cnJlbnQpO1xyXG5cclxuXHRcdGlmICghaWdub3JlTWF4SGVpZ2h0ICYmIHRoaXMuYXV0b0V4cGFuZEJvdW5kcy5tYXggIT09IC0xKSB7XHJcblx0XHRcdG5ld0hlaWdodCA9IE1hdGgubWluKG5ld0hlaWdodCwgdGhpcy5hdXRvRXhwYW5kQm91bmRzLm1heCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5oZWlnaHQoTWF0aC5jZWlsKE1hdGgubWF4KG5ld0hlaWdodCwgdGhpcy5hdXRvRXhwYW5kQm91bmRzLm1pbikpKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgaW4gUlRMIG1vZGVcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gcnRsXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBydGxeMlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0cHVibGljIHJ0bChydGw/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBkaXIgPSBydGwgPyAncnRsJyA6ICdsdHInO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgcnRsICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5hdHRyKHRoaXMuc291cmNlRWRpdG9yLCAnZGlyJykgPT09ICdydGwnO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5hdHRyKHRoaXMud3lzaXd5Z0JvZHksICdkaXInLCBkaXIpO1xyXG5cdFx0ZG9tLmF0dHIodGhpcy5zb3VyY2VFZGl0b3IsICdkaXInLCBkaXIpO1xyXG5cclxuXHRcdGRvbS5yZW1vdmVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3J0bCcpO1xyXG5cdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnbHRyJyk7XHJcblx0XHRkb20uYWRkQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsIGRpcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbnMgJiYgdGhpcy5pY29ucy5ydGwpIHtcclxuXHRcdFx0dGhpcy5pY29ucy5ydGwocnRsKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFbmFibGVzL2Rpc2FibGVzIGVtb3RpY29uc1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBlbmFibGVcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGVtb3RpY29uc14yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjJcclxuXHQgKi9cclxuXHRwdWJsaWMgZW1vdGljb25zKGVuYWJsZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRpZiAoIWVuYWJsZSAmJiBlbmFibGUgIT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnMuZW1vdGljb25zRW5hYmxlZDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzRWRpdG9yLm9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCA9IGVuYWJsZTtcclxuXHJcblx0XHRpZiAoZW5hYmxlKSB7XHJcblx0XHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBudWxsLCB0aGlzRWRpdG9yLmVtb3RpY29uc0tleVByZXNzKTtcclxuXHJcblx0XHRcdGlmICghdGhpc0VkaXRvci5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cclxuXHRcdFx0XHR0aGlzRWRpdG9yLnJlcGxhY2VFbW90aWNvbnMoKTtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnRyaWdnZXJWYWx1ZUNoYW5nZWQoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHR0aGlzRWRpdG9yLnJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgZW1vdGljb25zID0gZG9tLmZpbmQodGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2ltZ1tkYXRhLWVtbGVkaXRvci1lbW90aWNvbl0nKTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2goZW1vdGljb25zLCAoXywgaW1nKSA9PiB7XHJcblx0XHRcdFx0bGV0IHRleHQ6IGFueSA9IGRvbS5kYXRhKGltZywgJ2VtbGVkaXRvci1lbW90aWNvbicpO1xyXG5cdFx0XHRcdGxldCB0ZXh0Tm9kZSA9IHRoaXNFZGl0b3Iud3lzaXd5Z0RvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xyXG5cdFx0XHRcdGltZy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0ZXh0Tm9kZSwgaW1nKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRkb20ub2ZmKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIG51bGwsIHRoaXNFZGl0b3IuZW1vdGljb25zS2V5UHJlc3MpO1xyXG5cclxuXHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXNFZGl0b3I7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIHNvdXJjZU1vZGVcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBzb3VyY2VNb2RlXjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBzb3VyY2VNb2RlKGVuYWJsZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IGluU291cmNlTW9kZSA9IHRoaXMuaW5Tb3VyY2VNb2RlKCk7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBlbmFibGUgIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRyZXR1cm4gaW5Tb3VyY2VNb2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICgoaW5Tb3VyY2VNb2RlICYmICFlbmFibGUpIHx8ICghaW5Tb3VyY2VNb2RlICYmIGVuYWJsZSkpIHtcclxuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB3aWR0aCBvZiB0aGUgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBUaGUgc2F2ZVdpZHRoIHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSB3aWR0aC4gVGhlIHN0b3JlZCB3aWR0aCBjYW4gYmVcclxuXHQgKiB1c2VkIGZvciB0aGluZ3MgbGlrZSByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gICAgIHdpZHRoICAgICAgICAgICAgV2lkdGggaW4gcGl4ZWxzXHJcblx0ICogQHBhcmFtIHtib29sZWFufVx0W3NhdmVXaWR0aD10cnVlXSBJZiB0byBzdG9yZSB0aGUgd2lkdGhcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBuYW1lIHdpZHRoXjNcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB3aWR0aCh3aWR0aD86IG51bWJlciwgc2F2ZVdpZHRoPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAoIXdpZHRoICYmIHdpZHRoICE9PSAwKSB7XHJcblx0XHRcdHJldHVybiBkb20ud2lkdGgodGhpcy5lZGl0b3JDb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGltZW5zaW9ucyh3aWR0aCwgbnVsbCwgc2F2ZVdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBoZWlnaHQgb2YgdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogVGhlIHNhdmVIZWlnaHQgc3BlY2lmaWVzIGlmIHRvIHNhdmUgdGhlIGhlaWdodC5cclxuXHQgKlxyXG5cdCAqIFRoZSBzdG9yZWQgaGVpZ2h0IGNhbiBiZSB1c2VkIGZvciB0aGluZ3MgbGlrZVxyXG5cdCAqIHJlc3RvcmluZyBmcm9tIG1heGltaXplZCBzdGF0ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgSGVpZ2h0IGluIHB4XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbc2F2ZUhlaWdodD10cnVlXSBJZiB0byBzdG9yZSB0aGUgaGVpZ2h0XHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBoZWlnaHReM1xyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0cHVibGljIGhlaWdodChoZWlnaHQ/OiBudW1iZXIsIHNhdmVIZWlnaHQ/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGlmICghaGVpZ2h0ICYmIGhlaWdodCAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLmhlaWdodCh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5kaW1lbnNpb25zKG51bGwsIGhlaWdodCwgc2F2ZUhlaWdodCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG1lbnUgaXRlbSBkcm9wIGRvd25cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBtZW51SXRlbSBUaGUgYnV0dG9uIHRvIGFsaWduIHRoZSBkcm9wZG93biB3aXRoXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBuYW1lICAgICAgICAgIFVzZWQgZm9yIHN0eWxpbmcgdGhlIGRyb3Bkb3duLCB3aWxsIGJlXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgY2xhc3MgZW1sZWRpdG9yLW5hbWVcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udGVudCAgVGhlIEhUTUwgY29udGVudCBvZiB0aGUgZHJvcGRvd25cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBjcmVhdGVEcm9wRG93blxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGNyZWF0ZURyb3BEb3duKG1lbnVJdGVtOiBIVE1MRWxlbWVudCwgbmFtZTogc3RyaW5nLCBjb250ZW50OiBIVE1MRWxlbWVudCkge1xyXG5cdFx0Ly8gZmlyc3QgY2xpY2sgZm9yIGNyZWF0ZSBzZWNvbmQgY2xpY2sgZm9yIGNsb3NlXHJcblx0XHRsZXQgZHJvcERvd25Dc3MsIGRyb3BEb3duQ2xhc3MgPSAnZW1sZWRpdG9yLScgKyBuYW1lO1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0dGhpc0VkaXRvci5jbG9zZURyb3BEb3duKCk7XHJcblxyXG5cdFx0Ly8gT25seSBjbG9zZSB0aGUgZHJvcGRvd24gaWYgaXQgd2FzIGFscmVhZHkgb3BlblxyXG5cdFx0aWYgKHRoaXNFZGl0b3IuZHJvcGRvd24gJiYgZG9tLmhhc0NsYXNzKHRoaXNFZGl0b3IuZHJvcGRvd24sIGRyb3BEb3duQ2xhc3MpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRkcm9wRG93bkNzcyA9IHV0aWxzLmV4dGVuZCh7XHJcblx0XHRcdHRvcDogbWVudUl0ZW0ub2Zmc2V0VG9wLFxyXG5cdFx0XHRsZWZ0OiBtZW51SXRlbS5vZmZzZXRMZWZ0LFxyXG5cdFx0XHRtYXJnaW5Ub3A6IG1lbnVJdGVtLmNsaWVudEhlaWdodFxyXG5cdFx0fSwgdGhpc0VkaXRvci5vcHRpb25zLmRyb3BEb3duQ3NzKTtcclxuXHJcblx0XHR0aGlzRWRpdG9yLmRyb3Bkb3duID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWRyb3Bkb3duICcgKyBkcm9wRG93bkNsYXNzXHJcblx0XHR9KSBhcyBhbnk7XHJcblxyXG5cdFx0ZG9tLmNzcyh0aGlzRWRpdG9yLmRyb3Bkb3duLCBkcm9wRG93bkNzcyk7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpc0VkaXRvci5kcm9wZG93biwgY29udGVudCk7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsIHRoaXNFZGl0b3IuZHJvcGRvd24pO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3IuZHJvcGRvd24sICdjbGljayBmb2N1c2luJywgbnVsbCwgKGU6IGFueSkgPT4ge1xyXG5cdFx0XHQvLyBzdG9wIGNsaWNrcyB3aXRoaW4gdGhlIGRyb3Bkb3duIGZyb20gYmVpbmcgaGFuZGxlZFxyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3IuZHJvcGRvd24pIHtcclxuXHRcdFx0bGV0IGZpcnN0ID0gZG9tLmZpbmQodGhpc0VkaXRvci5kcm9wZG93biwgJ2lucHV0LHRleHRhcmVhJylbMF0gYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGlmIChmaXJzdCkge1xyXG5cdFx0XHRcdGZpcnN0LmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGlmIHRoZSBlZGl0b3IgaXMgbWF4aW1pc2VkIG9yIG5vdFxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBtYXhpbWl6ZSBJZiB0byBtYXhpbWlzZSB0aGUgZWRpdG9yXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBtYXhpbWl6ZV4yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgbWF4aW1pemUobWF4aW1pemU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBtYXhpbWl6ZVNpemUgPSAnZW1sZWRpdG9yLW1heGltaXplJztcclxuXHJcblx0XHRpZiAodXRpbHMuaXNVbmRlZmluZWQobWF4aW1pemUpKSB7XHJcblx0XHRcdHJldHVybiBkb20uaGFzQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsIG1heGltaXplU2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0bWF4aW1pemUgPSAhIW1heGltaXplO1xyXG5cclxuXHRcdGlmIChtYXhpbWl6ZSkge1xyXG5cdFx0XHR0aGlzLm1heGltaXplU2Nyb2xsUG9zaXRpb24gPSBnbG9iYWxXaW4uc2Nyb2xsWTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmRvY3VtZW50RWxlbWVudCwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHRkb20udG9nZ2xlQ2xhc3MoZ2xvYmFsRG9jLmJvZHksIG1heGltaXplU2l6ZSwgbWF4aW1pemUpO1xyXG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdHRoaXMud2lkdGgobWF4aW1pemUgPyAnMTAwJScgOiB0aGlzLm9wdGlvbnMud2lkdGgsIGZhbHNlKTtcclxuXHRcdHRoaXMuaGVpZ2h0KG1heGltaXplID8gJzEwMCUnIDogdGhpcy5vcHRpb25zLmhlaWdodCwgZmFsc2UpO1xyXG5cclxuXHRcdGlmICghbWF4aW1pemUpIHtcclxuXHRcdFx0Z2xvYmFsV2luLnNjcm9sbFRvKDAsIHRoaXMubWF4aW1pemVTY3JvbGxQb3NpdGlvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdXRvRXhwYW5kKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRGVzdHJveXMgdGhlIGVkaXRvciwgcmVtb3ZpbmcgYWxsIGVsZW1lbnRzIGFuZFxyXG5cdCAqIGV2ZW50IGhhbmRsZXJzLlxyXG5cdCAqXHJcblx0ICogTGVhdmVzIG9ubHkgdGhlIG9yaWdpbmFsIHRleHRhcmVhLlxyXG5cdCAqXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZGVzdHJveVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGRlc3Ryb3koKSB7XHJcblx0XHQvLyBEb24ndCBkZXN0cm95IGlmIHRoZSBlZGl0b3IgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcclxuXHRcdGlmICghdGhpcy5wbHVnaW5NYW5hZ2VyKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBsdWdpbk1hbmFnZXIuZGVzdHJveSgpO1xyXG5cclxuXHRcdHRoaXMucmFuZ2VIZWxwZXIgPSBudWxsO1xyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyID0gbnVsbDtcclxuXHJcblx0XHRpZiAodGhpcy5kcm9wZG93bikge1xyXG5cdFx0XHRkb20ucmVtb3ZlKHRoaXMuZHJvcGRvd24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCAnY2xpY2snLCBudWxsLCB0aGlzLmhhbmRsZURvY3VtZW50Q2xpY2spO1xyXG5cclxuXHRcdGxldCBmb3JtID0gdGhpcy50ZXh0YXJlYS5mb3JtO1xyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9mZihmb3JtLCAncmVzZXQnLCBudWxsLCB0aGlzLmhhbmRsZUZvcm1SZXNldCk7XHJcblx0XHRcdGRvbS5vZmYoZm9ybSwgJ3N1Ym1pdCcsIG51bGwsIHRoaXMuc2V0VGV4dGFyZWFWYWx1ZSwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vZmYod2luZG93LCAncGFnZWhpZGUnLCBudWxsLCB0aGlzLnNldFRleHRhcmVhVmFsdWUpO1xyXG5cdFx0ZG9tLm9mZih3aW5kb3csICdwYWdlc2hvdycsIG51bGwsIHRoaXMuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5yZW1vdmUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLnRvb2xiYXIpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMudGV4dGFyZWEuX2VtbGVkaXRvcjtcclxuXHRcdGRvbS5zaG93KHRoaXMudGV4dGFyZWEpO1xyXG5cclxuXHRcdHRoaXMudGV4dGFyZWEucmVxdWlyZWQgPSB0aGlzLmlzUmVxdWlyZWQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xvc2VzIGFueSBjdXJyZW50bHkgb3BlbiBkcm9wIGRvd25cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvY3VzPWZhbHNlXSBJZiB0byBmb2N1cyB0aGUgZWRpdG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGNsb3NpbmcgdGhlIGRyb3AgZG93blxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNsb3NlRHJvcERvd25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9zZURyb3BEb3duKGZvY3VzPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMuZHJvcGRvd24pIHtcclxuXHRcdFx0ZG9tLnJlbW92ZSh0aGlzLmRyb3Bkb3duKTtcclxuXHRcdFx0dGhpcy5kcm9wZG93biA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGZvY3VzID09PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwgaW50byBXWVNJV1lHIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIGVuZEh0bWwgaXMgc3BlY2lmaWVkLCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZFxyXG5cdCAqIGJldHdlZW4gaHRtbCBhbmQgZW5kSHRtbC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBodG1sXHJcblx0ICogYW5kIGVuZEh0bWwgd2lsbCBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEh0bWw9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvdmVycmlkZUNvZGVCbG9ja2luZz1mYWxzZV0gSWYgdG8gaW5zZXJ0IHRoZSBodG1sXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludG8gY29kZSB0YWdzLCBieVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGNvZGUgdGFncyBvbmx5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgdGV4dC5cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKGh0bWw6IHN0cmluZywgZW5kSHRtbD86IHN0cmluZywgb3ZlcnJpZGVDb2RlQmxvY2tpbmc/OiBib29sZWFuKSB7XHJcblx0XHRsZXQgbWFya2VyOiBhbnksIHNjcm9sbFRvcCwgc2Nyb2xsVG8sIGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQodGhpcy53eXNpd3lnRWRpdG9yKTtcclxuXHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogVGhpcyBjb2RlIHRhZyBzaG91bGQgYmUgY29uZmlndXJhYmxlIGFuZFxyXG5cdFx0Ly8gc2hvdWxkIG1heWJlIGNvbnZlcnQgdGhlIEhUTUwgaW50byB0ZXh0IGluc3RlYWRcclxuXHRcdC8vIERvbid0IGFwcGx5IHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmICghb3ZlcnJpZGVDb2RlQmxvY2tpbmcgJiYgZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50QmxvY2tOb2RlLCAnY29kZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJbnNlcnQgdGhlIEhUTUwgYW5kIHNhdmUgdGhlIHJhbmdlIHNvIHRoZSBlZGl0b3IgY2FuIGJlIHNjcm9sbGVkXHJcblx0XHQvLyB0byB0aGUgZW5kIG9mIHRoZSBzZWxlY3Rpb24uIEFsc28gYWxsb3dzIGVtb3RpY29ucyB0byBiZSByZXBsYWNlZFxyXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgdGhlIGN1cnNvciBwb3NpdGlvblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5pbnNlcnRIVE1MKGh0bWwsIGVuZEh0bWwpO1xyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdHRoaXMucmVwbGFjZUVtb3RpY29ucygpO1xyXG5cclxuXHRcdC8vIEZpeCBhbnkgaW52YWxpZCBuZXN0aW5nLCBlLmcuIGlmIGEgcXVvdGUgb3Igb3RoZXIgYmxvY2sgaXMgaW5zZXJ0ZWRcclxuXHRcdC8vIGludG8gYSBwYXJhZ3JhcGhcclxuXHRcdGRvbS5maXhOZXN0aW5nKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdHRoaXMud3JhcElubGluZXModGhpcy53eXNpd3lnQm9keSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdC8vIFNjcm9sbCB0aGUgZWRpdG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvblxyXG5cdFx0bWFya2VyID0gZG9tLmZpbmQodGhpcy53eXNpd3lnQm9keSwgJyNlbWxlZGl0b3ItZW5kLW1hcmtlcicpWzBdO1xyXG5cdFx0ZG9tLnNob3cobWFya2VyKTtcclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMud3lzaXd5Z0JvZHkuc2Nyb2xsVG9wO1xyXG5cdFx0c2Nyb2xsVG8gPSAoKGRvbS5nZXRPZmZzZXQobWFya2VyKSBhcyBhbnkpLnRvcCArXHJcblx0XHRcdChtYXJrZXIub2Zmc2V0SGVpZ2h0ICogMS41KSkgLSBlZGl0b3JIZWlnaHQ7XHJcblx0XHRkb20uaGlkZShtYXJrZXIpO1xyXG5cclxuXHRcdC8vIE9ubHkgc2Nyb2xsIGlmIG1hcmtlciBpc24ndCBhbHJlYWR5IHZpc2libGVcclxuXHRcdGlmIChzY3JvbGxUbyA+IHNjcm9sbFRvcCB8fCBzY3JvbGxUbyArIGVkaXRvckhlaWdodCA8IHNjcm9sbFRvcCkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHNjcm9sbFRvO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XHJcblx0XHR0aGlzLnJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cclxuXHRcdC8vIEFkZCBhIG5ldyBsaW5lIGFmdGVyIHRoZSBsYXN0IGJsb2NrIGVsZW1lbnRcclxuXHRcdC8vIHNvIGNhbiBhbHdheXMgYWRkIHRleHQgYWZ0ZXIgaXRcclxuXHRcdHRoaXMuYXBwZW5kTmV3TGluZSgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgZXhjZXB0IGl0IHdpbGwgY29udmVydCBhbnkgSFRNTFxyXG5cdCAqIGludG8gdGV4dCBiZWZvcmUgaW5zZXJ0aW5nIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCksIGVzY2FwZS5lbnRpdGllcyhlbmRUZXh0KVxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIHRleHQgaW50byB0aGUgV1lTSVdZRyBvciBzb3VyY2UgZWRpdG9yIGRlcGVuZGluZyBvbiB3aGljaFxyXG5cdCAqIG1vZGUgdGhlIGVkaXRvciBpcyBpbi5cclxuXHQgKlxyXG5cdCAqIElmIGVuZFRleHQgaXMgc3BlY2lmaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiB0ZXh0IGFuZCBlbmRUZXh0LiBJZiBubyB0ZXh0IGlzIHNlbGVjdGVkIHRleHQgYW5kIGVuZFRleHQgd2lsbFxyXG5cdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluc2VydFRleHRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICh0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCh0ZXh0LCBlbmRUZXh0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBidXQgaW5zZXJ0cyB0ZXh0IGludG8gdGhlXHJcblx0ICogc291cmNlIG1vZGUgZWRpdG9yIGluc3RlYWQuXHJcblx0ICpcclxuXHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogVGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBhZnRlciB0aGUgdGV4dCBwYXJhbS4gSWYgZW5kVGV4dCBpc1xyXG5cdCAqIHNwZWNpZmllZCB0aGUgY3Vyc29yIHdpbGwgYmUgcGxhY2VkIGJlZm9yZSBlbmRUZXh0LCBzbyBwYXNzaW5nOjxiciAvPlxyXG5cdCAqXHJcblx0ICogJ1tiXScsICdbL2JdJ1xyXG5cdCAqXHJcblx0ICogV291bGQgY2F1c2UgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQ6PGJyIC8+XHJcblx0ICpcclxuXHQgKiBbYl1TZWxlY3RlZCB0ZXh0fFsvYl1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRUZXh0PW51bGxdXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckluc2VydFRleHQodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGxldCBzY3JvbGxUb3AsIGN1cnJlbnRWYWx1ZSwgc3RhcnRQb3MgPSB0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCwgZW5kUG9zID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kO1xyXG5cclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMuc291cmNlRWRpdG9yLnNjcm9sbFRvcDtcclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHRjdXJyZW50VmFsdWUgPSB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZW5kVGV4dCkge1xyXG5cdFx0XHR0ZXh0ICs9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoc3RhcnRQb3MsIGVuZFBvcykgKyBlbmRUZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnZhbHVlID0gY3VycmVudFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgK1xyXG5cdFx0XHR0ZXh0ICtcclxuXHRcdFx0Y3VycmVudFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIGN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gKHN0YXJ0UG9zICsgdGV4dC5sZW5ndGgpIC1cclxuXHRcdFx0KGVuZFRleHQgPyBlbmRUZXh0Lmxlbmd0aCA6IDApO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQ7XHJcblxyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHR9O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGUgcmFuZ2VIZWxwZXIgY2xhc3NcclxuXHQgKiBmb3IgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge1JhbmdlSGVscGVyfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGdldFJhbmdlSGVscGVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmFuZ2VIZWxwZXIoKTogUmFuZ2VIZWxwZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMucmFuZ2VIZWxwZXI7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgc291cmNlIGVkaXRvciBjYXJldCBwb3NpdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcG9zaXRpb25dXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjVcclxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JDYXJldFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckNhcmV0KHBvc2l0aW9uOiBhbnkpOiBhbnkge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQgPSBwb3NpdGlvbi5zdGFydDtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gcG9zaXRpb24uZW5kO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwvQkJDb2RlIGludG8gdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogSWYgZW5kIGlzIHN1cHBsaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiBzdGFydCBhbmQgZW5kLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IHN0YXJ0IGFuZCBlbmRcclxuXHQgKiB3aWxsIGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogSWYgdGhlIGZpbHRlciBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgdGhlIEhUTUwvQkJDb2RlIHdpbGwgYmVcclxuXHQgKiBwYXNzZWQgdGhyb3VnaCBhbnkgcGx1Z2luIGZpbHRlcnMuIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogdGhpcyB3aWxsIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0ICpcclxuXHQgKiBJZiB0aGUgYWxsb3dNaXhlZCBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgSFRNTCBhbnkgd2lsbCBub3QgYmVcclxuXHQgKiBlc2NhcGVkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZD1udWxsXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnZlcnRFbW90aWNvbnM9dHJ1ZV0gSWYgdG8gY29udmVydCBlbW90aWNvbnNcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxvd01peGVkPWZhbHNlXVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgaW5zZXJ0XjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnNlcnQoc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcsIGZpbHRlcjogYm9vbGVhbiwgY29udmVydEVtb3RpY29uczogYm9vbGVhbiwgYWxsb3dNaXhlZDogYm9vbGVhblxyXG5cdCk6IGFueSB7XHJcblx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvckluc2VydFRleHQoc3RhcnQsIGVuZCk7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCB0aGUgc2VsZWN0aW9uIGJldHdlZW4gc3RhcnQgYW5kIGVuZFxyXG5cdFx0aWYgKGVuZCkge1xyXG5cdFx0XHRsZXQgaHRtbCA9IHRoaXMucmFuZ2VIZWxwZXIuc2VsZWN0ZWRIdG1sKCk7XHJcblxyXG5cdFx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb1NvdXJjZScgaW4gdGhpcy5mb3JtYXQpIHtcclxuXHRcdFx0XHRodG1sID0gdGhpcy5mb3JtYXRcclxuXHRcdFx0XHRcdC5mcmFnbWVudFRvU291cmNlKGh0bWwsIHRoaXMud3lzaXd5Z0RvY3VtZW50LCB0aGlzLmN1cnJlbnROb2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RhcnQgKz0gaHRtbCArIGVuZDtcclxuXHRcdH1cclxuXHRcdC8vIFRPRE86IFRoaXMgZmlsdGVyIHNob3VsZCBhbGxvdyBlbXB0eSB0YWdzIGFzIGl0J3MgaW5zZXJ0aW5nLlxyXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ2ZyYWdtZW50VG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRzdGFydCA9IHRoaXMuZm9ybWF0LmZyYWdtZW50VG9IdG1sKHN0YXJ0LCB0aGlzLmN1cnJlbnROb2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDb252ZXJ0IGFueSBlc2NhcGVkIEhUTUwgYmFjayBpbnRvIEhUTUwgaWYgbWl4ZWQgaXMgYWxsb3dlZFxyXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgYWxsb3dNaXhlZCA9PT0gdHJ1ZSkge1xyXG5cdFx0XHRzdGFydCA9IHN0YXJ0LnJlcGxhY2UoLyZsdDsvZywgJzwnKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcclxuXHRcdFx0XHQucmVwbGFjZSgvJmFtcDsvZywgJyYnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKHN0YXJ0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcnMgSFRNTCB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIElmIHVzaW5nIGEgcGx1Z2luIHRoYXQgZmlsdGVycyB0aGUgSHQgTWwgbGlrZSB0aGUgQkJDb2RlIHBsdWdpblxyXG5cdCAqIGl0IHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGZpbHRlcmluZyAoQkJDb2RlKSB1bmxlc3MgdGhlXHJcblx0ICogZmlsdGVyIHBhcmFtIGlzIHNldCB0byBmYWxzZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7P2Jvb2xlYW59IFtmaWx0ZXI9dHJ1ZV1cclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZ2V0V3lzaXd5Z0VkaXRvclZhbHVlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0V3lzaXd5Z0VkaXRvclZhbHVlKGZpbHRlcj86IGJvb2xlYW4pOiBzdHJpbmcge1xyXG5cdFx0bGV0IGh0bWw7XHJcblx0XHQvLyBDcmVhdGUgYSB0bXAgbm9kZSB0byBzdG9yZSBjb250ZW50cyBzbyBpdCBjYW4gYmUgbW9kaWZpZWRcclxuXHRcdC8vIHdpdGhvdXQgYWZmZWN0aW5nIGFueXRoaW5nIGVsc2UuXHJcblx0XHRsZXQgdG1wID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRsZXQgY2hpbGROb2RlcyA9IHRoaXMud3lzaXd5Z0JvZHkuY2hpbGROb2RlcztcclxuXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRtcCwgKGNoaWxkTm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0JvZHksIHRtcCk7XHJcblx0XHRkb20uZml4TmVzdGluZyh0bXApO1xyXG5cdFx0ZG9tLnJlbW92ZSh0bXApO1xyXG5cclxuXHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xyXG5cclxuXHRcdC8vIGZpbHRlciB0aGUgSFRNTCBhbmQgRE9NIHRocm91Z2ggYW55IHBsdWdpbnNcclxuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmZvcm1hdCwgJ3RvU291cmNlJykpIHtcclxuXHRcdFx0aHRtbCA9IHRoaXMuZm9ybWF0LnRvU291cmNlKGh0bWwsIHRoaXMud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaHRtbDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Qm9keVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGdldEJvZHkoKTogSFRNTEJvZHlFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLnd5c2l3eWdCb2R5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjb250YWluZXIgYXJlYSAod2hvbGUgaUZyYW1lKS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqIEBuYW1lIGdldENvbnRlbnRBcmVhQ29udGFpbmVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q29udGVudEFyZWFDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHRoaXMud3lzaXd5Z0VkaXRvcjtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IFtwYXJhbV1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBleGVjQ29tbWFuZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IGFueSk6IHZvaWQge1xyXG5cdFx0bGV0IGV4ZWN1dGVkID0gZmFsc2UsIGNvbW1hbmRPYmogPSB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdO1xyXG5cclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBtYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0Ly8gZG9uJ3QgYXBwbHkgYW55IGNvbW1hbmRzIHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmIChkb20uY2xvc2VzdCh0aGlzLnJhbmdlSGVscGVyLnBhcmVudE5vZGUoKSwgJ2NvZGUnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZXhlY3V0ZWQgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgcGFyYW0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdC8vIHNob3cgZXJyb3IgaWYgZXhlY3V0aW9uIGZhaWxlZCBhbmQgYW4gZXJyb3IgbWVzc2FnZSBleGlzdHNcclxuXHRcdGlmICghZXhlY3V0ZWQgJiYgY29tbWFuZE9iaiAmJiBjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkge1xyXG5cdFx0XHRhbGVydCh0aGlzLnRyYW5zbGF0ZShjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zbGF0ZXMgdGhlIHN0cmluZyBpbnRvIHRoZSBsb2NhbGUgbGFuZ3VhZ2UuXHJcblx0ICpcclxuXHQgKiBSZXBsYWNlcyBhbnkgezB9LCB7MX0sIHsyfSwgZWN0LiB3aXRoIHRoZSBwYXJhbXMgcHJvdmlkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcblx0ICogQHBhcmFtIHsuLi5TdHJpbmd9IGFyZ3NcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgX1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZSguLi5hcmdzOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHVuZGVmOiBhbnk7XHJcblxyXG5cdFx0aWYgKHRoaXMubG9jYWxlICYmIHRoaXMubG9jYWxlW2FyZ3NbMF1dKSB7XHJcblx0XHRcdGFyZ3NbMF0gPSB0aGlzLmxvY2FsZVthcmdzWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXJnc1swXS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKHN0cj86IGFueSwgcDE/OiBhbnkpID0+IHtcclxuXHRcdFx0cmV0dXJuIGFyZ3NbcDEgLSAwICsgMV0gIT09IHVuZGVmID9cclxuXHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcclxuXHRcdFx0XHQneycgKyBwMSArICd9JztcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGEgaGFuZGxlciB0byB0aGUgc3BlY2lmaWVkIGV2ZW50c1xyXG5cdCAqXHJcblx0ICogVGhpcyBmdW5jdGlvbiBvbmx5IGJpbmRzIHRvIGEgbGltaXRlZCBsaXN0IG9mXHJcblx0ICogc3VwcG9ydGVkIGV2ZW50cy5cclxuXHQgKlxyXG5cdCAqIFRoZSBzdXBwb3J0ZWQgZXZlbnRzIGFyZTpcclxuXHQgKlxyXG5cdCAqICoga2V5dXBcclxuXHQgKiAqIGtleWRvd25cclxuXHQgKiAqIEtleXByZXNzXHJcblx0ICogKiBibHVyXHJcblx0ICogKiBmb2N1c1xyXG5cdCAqICogaW5wdXRcclxuXHQgKiAqIG5vZGVjaGFuZ2VkIC0gV2hlbiB0aGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmdcclxuXHQgKiBcdFx0dGhlIHNlbGVjdGlvbiBjaGFuZ2VzIGluIFdZU0lXWUcgbW9kZVxyXG5cdCAqICogY29udGV4dG1lbnVcclxuXHQgKiAqIHNlbGVjdGlvbmNoYW5nZWRcclxuXHQgKiAqIHZhbHVlY2hhbmdlZFxyXG5cdCAqXHJcblx0ICpcclxuXHQgKiBUaGUgZXZlbnRzIHBhcmFtIHNob3VsZCBiZSBhIHN0cmluZyBjb250YWluaW5nIHRoZSBldmVudChzKVxyXG5cdCAqIHRvIGJpbmQgdGhpcyBoYW5kbGVyIHRvLiBJZiBtdWx0aXBsZSwgdGhleSBzaG91bGQgYmUgc2VwYXJhdGVkXHJcblx0ICogYnkgc3BhY2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBldmVudHNcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7RW1sRWRpdG9yfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGJpbmRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBiaW5kKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IGV2ZW50c0FyciA9IGV2ZW50cy5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGxldCBpID0gZXZlbnRzQXJyLmxlbmd0aDtcclxuXHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRsZXQgd3lzRXZlbnQgPSAnZW1sd3lzJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHRsZXQgc3JjRXZlbnQgPSAnZW1sc3JjJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHQvLyBVc2UgY3VzdG9tIGV2ZW50cyB0byBhbGxvdyBwYXNzaW5nIHRoZSBpbnN0YW5jZSBhcyB0aGVcclxuXHRcdFx0XHQvLyAybmQgYXJndW1lbnQuXHJcblx0XHRcdFx0Ly8gQWxzbyBhbGxvd3MgdW5iaW5kaW5nIHdpdGhvdXQgdW5iaW5kaW5nIHRoZSBlZGl0b3JzIG93blxyXG5cdFx0XHRcdC8vIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0XHRcdGlmICghZXhjbHVkZVd5c2l3eWcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gPSB0aGlzLmV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdIHx8IFtdO1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzW3d5c0V2ZW50XS5wdXNoKGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdID0gdGhpcy5ldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFN0YXJ0IHNlbmRpbmcgdmFsdWUgY2hhbmdlZCBldmVudHNcclxuXHRcdFx0XHRpZiAoZXZlbnRzQXJyW2ldID09PSAndmFsdWVjaGFuZ2VkJykge1xyXG5cdFx0XHRcdFx0dGhpcy5oYXNIYW5kbGVyID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBVbmJpbmRzIGFuIGV2ZW50IHRoYXQgd2FzIGJvdW5kIHVzaW5nIGJpbmQoKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgdW5iaW5kaW5nIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyIGZyb20gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHVuYmluZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQHNlZSBiaW5kXHJcblx0ICovXHJcblx0cHVibGljIHVuYmluZChldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBldmVudHNBcnIgPSBldmVudHMuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRsZXQgaSA9IGV2ZW50c0Fyci5sZW5ndGg7XHJcblx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0aWYgKCFleGNsdWRlV3lzaXd5Zykge1xyXG5cdFx0XHRcdFx0dXRpbHMuYXJyYXlSZW1vdmUoXHJcblx0XHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1snZW1sd3lzJyArIGV2ZW50c0FycltpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzWydlbWxzcmMnICsgZXZlbnRzQXJyW2ldXSB8fCBbXSwgaGFuZGxlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBkb3duIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlEb3duXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMga2V5RG93bihoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5ZG93bicsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUga2V5IHByZXNzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlQcmVzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIGtleVByZXNzKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHQuYmluZCgna2V5cHJlc3MnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSB1cCBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5VXBcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBrZXlVcChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5dXAnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIG5vZGVDaGFuZ2VkXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMgbm9kZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnbm9kZWNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHNlbGVjdGlvbiBjaGFuZ2VkIGV2ZW50XHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIHNlbGVjdGlvbkNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnc2VsZWN0aW9uY2hhbmdlZCcsIGhhbmRsZXIsIGZhbHNlLCB0cnVlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgdmFsdWUgY2hhbmdlZCBldmVudFxyXG5cdCAqXHJcblx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgY3VycmVudCBlZGl0b3IgdmFsdWUgY2hhbmdlcy5cclxuXHQgKlxyXG5cdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdCAqIDEuNSBzZWNzIGFmdGVyIHRleHQgaXMgdHlwZWQuIElmIGEgc3BhY2UgaXMgdHlwZWQgaXQgd2lsbFxyXG5cdCAqIGNhdXNlIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZlxyXG5cdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuNVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdHJldHVybiB0aGlzXHJcblx0XHRcdC5iaW5kKCd2YWx1ZWNoYW5nZWQnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBXWVNJV1lHIGVkaXRvcnMgaW5saW5lIENTU1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjc3NcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc14yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjNcclxuXHQgKi9cclxuXHRwdWJsaWMgY3NzKGNzczogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICghdGhpcy5pbmxpbmVDc3MpIHtcclxuXHRcdFx0dGhpcy5pbmxpbmVDc3MgPSBkb20uY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7XHJcblx0XHRcdFx0aWQ6ICdpbmxpbmUnXHJcblx0XHRcdH0sIHRoaXMud3lzaXd5Z0RvY3VtZW50KSBhcyBIVE1MU3R5bGVFbGVtZW50O1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0RvY3VtZW50LmhlYWQsIHRoaXMuaW5saW5lQ3NzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKGNzcykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5saW5lQ3NzLnNoZWV0ID9cclxuXHRcdFx0XHR0aGlzLmlubGluZUNzcy5pbm5lclRleHQgOiB0aGlzLmlubGluZUNzcy5pbm5lckhUTUw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5saW5lQ3NzLnNoZWV0KSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgc2hvcnRjdXQgaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gc2hvcnRjdXRcclxuXHQgKiBAcmV0dXJuIHtFbWxFZGl0b3J9XHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZVNob3J0Y3V0KHNob3J0Y3V0OiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0ZGVsZXRlIHRoaXMuc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgc2hvcnRjdXQgaGFuZGxlciB0byB0aGUgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICBzaG9ydGN1dFxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gY21kXHJcblx0ICogQHJldHVybiB7ZW1sZWRpdG9yfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRTaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nLCBjbWQ6IHN0cmluZyB8IEZ1bmN0aW9uKTogYW55IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKVxyXG5cdFx0bGV0IHNob3J0Y3V0S2V5ID0gc2hvcnRjdXQgYXMga2V5b2YgdHlwZW9mIHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVycztcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoY21kKSkge1xyXG5cdFx0XHRsZXQgc3RyQ21kID0gY21kIGFzIHN0cmluZztcclxuXHRcdFx0dGhpc0VkaXRvci5zaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0S2V5XSA9ICgpID0+IHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUNvbW1hbmQodGhpc0VkaXRvci50b29sYmFyQnV0dG9uc1tzdHJDbWRdLCB0aGlzRWRpdG9yLmNvbW1hbmRzW3N0ckNtZF0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRLZXldID0gY21kO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgZm9ybWF0dGluZyBvZiB0aGUgcGFzc2VkIGJsb2NrIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBJZiBibG9jayBpcyBmYWxzZSwgaWYgd2lsbCBjbGVhciB0aGUgc3R5bGluZyBvZiB0aGUgZmlyc3RcclxuXHQgKiBibG9jayBsZXZlbCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGN1cnNvci5cclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gYmxvY2tcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xlYXJCbG9ja0Zvcm1hdHRpbmcoYmxvY2s6IEhUTUxFbGVtZW50KTogYW55IHtcclxuXHRcdGJsb2NrID0gYmxvY2sgfHwgdGhpcy5jdXJyZW50U3R5bGVkQmxvY2tOb2RlKCk7XHJcblxyXG5cdFx0aWYgKCFibG9jayB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRibG9jay5jbGFzc05hbWUgPSAnJztcclxuXHJcblx0XHRkb20uYXR0cihibG9jaywgJ3N0eWxlJywgJycpO1xyXG5cclxuXHRcdGlmICghZG9tLmlzKGJsb2NrLCAncCxkaXYsdGQnKSkge1xyXG5cdFx0XHRkb20uY29udmVydEVsZW1lbnQoYmxvY2ssICdwJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8vI2VuZHJlZ2lvblxyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogUHVibGljIHN0YXRpY1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cdC8vIFN0YXRpY1xyXG5cdHB1YmxpYyBzdGF0aWMgbG9jYWxlOiBhbnkgPSB7fTtcclxuXHRwdWJsaWMgc3RhdGljIGZvcm1hdHM6IGFueSA9IHt9O1xyXG5cdHB1YmxpYyBzdGF0aWMgaWNvbnM6IGFueSA9IHt9O1xyXG5cdHB1YmxpYyBzdGF0aWMgY29tbWFuZDogYW55ID0ge1xyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGEgY29tbWFuZFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R8bnVsbH1cclxuXHRcdCAqIEBzaW5jZSB2MS4zLjVcclxuXHRcdCAqL1xyXG5cdFx0Z2V0OiAobjoga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcyk6IG9iamVjdCB8IG51bGwgPT4ge1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdENvbW1hbmRzW25dIHx8IG51bGw7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogPHA+QWRkcyBhIGNvbW1hbmQgdG8gdGhlIGVkaXRvciBvciB1cGRhdGVzIGFuIGV4aXN0aW5nXHJcblx0XHQgKiBjb21tYW5kIGlmIGEgY29tbWFuZCB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZSBhbHJlYWR5IGV4aXN0cy48L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogPHA+T25jZSBhIGNvbW1hbmQgaXMgYWRkIGl0IGNhbiBiZSBpbmNsdWRlZCBpbiB0aGUgdG9vbGJhciBieVxyXG5cdFx0ICogYWRkaW5nIGl0J3MgbmFtZSB0byB0aGUgdG9vbGJhciBvcHRpb24gaW4gdGhlIGNvbnN0cnVjdG9yLiBJdFxyXG5cdFx0ICogY2FuIGFsc28gYmUgZXhlY3V0ZWQgbWFudWFsbHkgYnkgY2FsbGluZ1xyXG5cdFx0ICoge0BsaW5rIGVtbGVkaXRvci5leGVjQ29tbWFuZH08L3A+XHJcblx0XHQgKlxyXG5cdFx0ICogQGV4YW1wbGVcclxuXHRcdCAqIEVtbEVkaXRvci5jb21tYW5kLnNldChcImhlbGxvXCIsXHJcblx0XHQgKiB7XHJcblx0XHQgKiAgICAgZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0ICogICAgICAgICBhbGVydChcIkhlbGxvIFdvcmxkIVwiKTtcclxuXHRcdCAqICAgICB9XHJcblx0XHQgKiB9KTtcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGNtZFxyXG5cdFx0ICogQHJldHVybiB7dGhpc3xmYWxzZX0gUmV0dXJucyBmYWxzZSBpZiBuYW1lIG9yIGNtZCBpcyBmYWxzZVxyXG5cdFx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdFx0ICovXHJcblx0XHRzZXQ6IChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzLCBjbWQ6IGFueSk6IGFueSB8IGZhbHNlID0+IHtcclxuXHRcdFx0aWYgKCFuYW1lIHx8ICFjbWQpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIG1lcmdlIGFueSBleGlzdGluZyBjb21tYW5kIHByb3BlcnRpZXNcclxuXHRcdFx0Y21kID0gdXRpbHMuZXh0ZW5kKGRlZmF1bHRDb21tYW5kc1tuYW1lXSB8fCB7fSwgY21kKTtcclxuXHJcblx0XHRcdGNtZC5yZW1vdmUgPSAoKSA9PiB7XHJcblx0XHRcdFx0RW1sRWRpdG9yLmNvbW1hbmQucmVtb3ZlKG5hbWUpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZGVmYXVsdENvbW1hbmRzW25hbWVdID0gY21kO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmVzIGEgY29tbWFuZFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcblx0XHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdFx0ICogQHNpbmNlIHYxLjMuNVxyXG5cdFx0ICovXHJcblx0XHRyZW1vdmU6IChuYW1lOiBrZXlvZiB0eXBlb2YgZGVmYXVsdENvbW1hbmRzKTogYW55ID0+IHtcclxuXHRcdFx0aWYgKGRlZmF1bHRDb21tYW5kc1tuYW1lXSkge1xyXG5cdFx0XHRcdGRlbGV0ZSBkZWZhdWx0Q29tbWFuZHNbbmFtZV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvLyNlbmRyZWdpb25cclxuXHJcblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cdCAqIFByaXZhdGUgbWVtYmVyc1xyXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5cdC8vI3JlZ2lvblxyXG5cclxuXHQvKipcclxuXHQgKiBET01QdXJpZnlcclxuXHQgKi9cclxuXHRwcml2YXRlIGRvbVB1cmlmeTogRE9NUHVyaWZ5LkRPTVB1cmlmeUlcclxuXHJcblx0LyoqXHJcblx0ICogRWRpdG9yIGZvcm1hdCBsaWtlIEJCQ29kZSBvciBIVE1MXHJcblx0ICovXHJcblx0cHJpdmF0ZSBmb3JtYXQ6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFwIG9mIGV2ZW50cyBoYW5kbGVycyBib3VuZCB0byB0aGlzIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZXZlbnRIYW5kbGVyczogYW55ID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHdpbmRvd1xyXG5cdCAqXHJcblx0ICogQHR5cGUge1dpbmRvd31cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z1dpbmRvdzogV2luZG93O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgV1lTSVdZRyBlZGl0b3JzIGJvZHkgZWxlbWVudFxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxCb2R5RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z0JvZHk6IEhUTUxCb2R5RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgZHJvcGRvd25cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZHJvcGRvd246IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiB0aGUgdXNlciBpcyBjdXJyZW50bHkgY29tcG9zaW5nIHRleHQgdmlhIElNRVxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNDb21wb3Npbmc6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRpbWVyIGZvciB2YWx1ZUNoYW5nZWQga2V5IGhhbmRsZXJcclxuXHQgKiBAdHlwZSB7bnVtYmVyfVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdmFsdWVDaGFuZ2VkS2V5VXBUaW1lcjogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBsb2NhbGVcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBsb2NhbGU6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcmVzIGEgY2FjaGUgb2YgcHJlbG9hZGVkIGltYWdlc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAdHlwZSB7QXJyYXkuPEhUTUxJbWFnZUVsZW1lbnQ+fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcHJlTG9hZENhY2hlOiBhbnkgPSBBcnJheTxIVE1MSW1hZ2VFbGVtZW50PjtcclxuXHJcblx0LyoqXHJcblx0ICogUGx1Z2luIG1hbmFnZXIgaW5zdGFuY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtQbHVnaW5NYW5hZ2VyfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqXHJcblx0ICogQHR5cGUge05vZGV9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGN1cnJlbnROb2RlOiBOb2RlO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZmlyc3QgYmxvY2sgbGV2ZWwgcGFyZW50IG9mIHRoZSBjdXJyZW50IG5vZGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtub2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50QmxvY2tOb2RlOiBIVE1MRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVXNlZCB0byBtYWtlIHN1cmUgb25seSAxIHNlbGVjdGlvbiBjaGFuZ2VkXHJcblx0ICogY2hlY2sgaXMgY2FsbGVkIGV2ZXJ5IDEwMG1zLlxyXG5cdCAqXHJcblx0ICogSGVscHMgaW1wcm92ZSBwZXJmb3JtYW5jZSBhcyBpdCBpcyBjaGVja2VkIGEgbG90LlxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBJZiBjb250ZW50IGlzIHJlcXVpcmVkIChlcXVpdmFsZW50IHRvIHRoZSBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUpXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaXNSZXF1aXJlZDogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGlubGluZSBDU1Mgc3R5bGUgZWxlbWVudC4gV2lsbCBiZSB1bmRlZmluZWRcclxuXHQgKiB1bnRpbCBjc3MoKSBpcyBjYWxsZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxTdHlsZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGlubGluZUNzczogSFRNTFN0eWxlRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogT2JqZWN0IGNvbnRhaW5pbmcgYSBsaXN0IG9mIHNob3J0Y3V0IGhhbmRsZXJzXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBzaG9ydGN1dEhhbmRsZXJzOiBhbnkgPSB7fTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1pbiBhbmQgbWF4IGhlaWdodHMgdGhhdCBhdXRvRXhwYW5kIHNob3VsZCBzdGF5IHdpdGhpblxyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b0V4cGFuZEJvdW5kczogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaW1lb3V0IGZvciB0aGUgYXV0b0V4cGFuZCBmdW5jdGlvbiB0byB0aHJvdHRsZSBjYWxsc1xyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGF1dG9FeHBhbmRUaHJvdHRsZTogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBMYXN0IHNjcm9sbCBwb3NpdGlvbiBiZWZvcmUgbWF4aW1pemluZyBzb1xyXG5cdCAqIGl0IGNhbiBiZSByZXN0b3JlZCB3aGVuIGZpbmlzaGVkLlxyXG5cdCAqXHJcblx0ICogQHR5cGUge251bWJlcn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbWF4aW1pemVTY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBTdG9yZXMgdGhlIGNvbnRlbnRzIHdoaWxlIGEgcGFzdGUgaXMgdGFraW5nIHBsYWNlLlxyXG5cdCAqXHJcblx0ICogTmVlZGVkIHRvIHN1cHBvcnQgYnJvd3NlcnMgdGhhdCBsYWNrIGNsaXBib2FyZCBBUEkgc3VwcG9ydC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHs/RG9jdW1lbnRGcmFnbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcGFzdGVDb250ZW50RnJhZ21lbnQ6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogQWxsIHRoZSBlbW90aWNvbnMgZnJvbSBkcm9wZG93biwgbW9yZSBhbmQgaGlkZGVuIGNvbWJpbmVkXHJcblx0ICogYW5kIHdpdGggdGhlIGVtb3RpY29ucyByb290IHNldFxyXG5cdCAqXHJcblx0ICogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhbGxFbW90aWNvbnM6IGFueSA9IHt9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDdXJyZW50IGljb24gc2V0IGlmIGFueVxyXG5cdCAqXHJcblx0ICogQHR5cGUgez9PYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGljb25zOiBhbnkgfCBudWxsO1xyXG5cclxuXHQvKipcclxuXHQgKiBBbiBhcnJheSBvZiBidXR0b24gc3RhdGUgaGFuZGxlcnNcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtBcnJheS48T2JqZWN0Pn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYnRuU3RhdGVIYW5kbGVyczogYW55ID0gW107XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHRvb2xiYXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdG9vbGJhcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBXWVNJV1lHIGVkaXRvcnMgZG9jdW1lbnRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtEb2N1bWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z0RvY3VtZW50OiBEb2N1bWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyBpZiBidXR0b25zIGFyZSBhY3RpdmUgb3Igbm90XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZUFjdGl2ZUJ1dHRvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgZmlyc3RCbG9jaywgcGFyZW50O1xyXG5cdFx0bGV0IGFjdGl2ZUNsYXNzID0gJ2FjdGl2ZSc7XHJcblx0XHRsZXQgZG9jID0gdGhpcy53eXNpd3lnRG9jdW1lbnQ7XHJcblx0XHRsZXQgaXNTb3VyY2UgPSB0aGlzLnNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5yZWFkT25seSgpKSB7XHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQodGhpcy50b29sYmFyLCBhY3RpdmVDbGFzcyksIChfLCBtZW51SXRlbSkgPT4ge1xyXG5cdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhtZW51SXRlbSwgYWN0aXZlQ2xhc3MpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghaXNTb3VyY2UpIHtcclxuXHRcdFx0cGFyZW50ID0gdGhpcy5yYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblx0XHRcdGZpcnN0QmxvY2sgPSB0aGlzLnJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQocGFyZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYnRuU3RhdGVIYW5kbGVycy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRsZXQgc3RhdGUgPSAwO1xyXG5cdFx0XHRsZXQgYnRuID0gdGhpcy50b29sYmFyQnV0dG9uc1t0aGlzLmJ0blN0YXRlSGFuZGxlcnNbal0ubmFtZV07XHJcblx0XHRcdGxldCBzdGF0ZUZuID0gdGhpcy5idG5TdGF0ZUhhbmRsZXJzW2pdLnN0YXRlO1xyXG5cdFx0XHRsZXQgaXNEaXNhYmxlZCA9IChpc1NvdXJjZSAmJiAhYnRuLl9lbWxUeHRNb2RlKSB8fFxyXG5cdFx0XHRcdCghaXNTb3VyY2UgJiYgIWJ0bi5fZW1sV3lzaXd5Z01vZGUpO1xyXG5cclxuXHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHN0YXRlRm4pKSB7XHJcblx0XHRcdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0c3RhdGUgPSBkb2MucXVlcnlDb21tYW5kRW5hYmxlZChzdGF0ZUZuKSA/IDAgOiAtMTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtZGVwdGhcclxuXHRcdFx0XHRcdFx0aWYgKHN0YXRlID4gLTEpIHtcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRTdGF0ZShzdGF0ZUZuKSA/IDEgOiAwO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0Rpc2FibGVkKSB7XHJcblx0XHRcdFx0c3RhdGUgPSBzdGF0ZUZuLmNhbGwodGhpcywgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ0biwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCB8fCBzdGF0ZSA8IDApO1xyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCBhY3RpdmVDbGFzcywgc3RhdGUgPiAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5pY29ucyAmJiB0aGlzLmljb25zLnVwZGF0ZSkge1xyXG5cdFx0XHR0aGlzLmljb25zLnVwZGF0ZShpc1NvdXJjZSwgcGFyZW50LCBmaXJzdEJsb2NrKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWNoZSBvZiB0aGUgY3VycmVudCB0b29sYmFyIGJ1dHRvbnNcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHRvb2xiYXJCdXR0b25zOiBhbnkgPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogVXBkYXRlcyB0aGUgdG9vbGJhciB0byBkaXNhYmxlL2VuYWJsZSB0aGUgYXBwcm9wcmlhdGUgYnV0dG9uc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB1cGRhdGVUb29sQmFyID0gKGRpc2FibGU/OiBib29sZWFuKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgbW9kZSA9IHRoaXMuaW5Tb3VyY2VNb2RlKCkgPyAnX2VtbFR4dE1vZGUnIDogJ19lbWxXeXNpd3lnTW9kZSc7XHJcblxyXG5cdFx0dXRpbHMuZWFjaCh0aGlzLnRvb2xiYXJCdXR0b25zLCAoXywgYnV0dG9uKSA9PiB7XHJcblx0XHRcdGRvbS50b2dnbGVDbGFzcyhidXR0b24sICdkaXNhYmxlZCcsIGRpc2FibGUgfHwgIWJ1dHRvblttb2RlXSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyBpZnJhbWUgd2hpY2ggc2hvdWxkIGJlIGluIGRlc2lnbiBtb2RlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTElGcmFtZUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHd5c2l3eWdFZGl0b3I6IEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyB0ZXh0YXJlYSBmb3Igdmlld2luZyBzb3VyY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MVGV4dEFyZWFFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBzb3VyY2VFZGl0b3I6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IG5vZGUgc2VsZWN0aW9uL2NhcmV0XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7T2JqZWN0fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50U2VsZWN0aW9uOiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHJhbmdlSGVscGVyIGluc3RhbmNlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UmFuZ2VIZWxwZXJ9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHJhbmdlSGVscGVyOiBSYW5nZUhlbHBlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGRpdiB3aGljaCBjb250YWlucyB0aGUgZWRpdG9yIGFuZCB0b29sYmFyXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGVkaXRvckNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBub2RlIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdCAqIHRoZSBub2RlY2hhbmdlZCBldmVudCBpZiBpdCBoYXNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tOb2RlQ2hhbmdlZCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdC8vIGNoZWNrIGlmIG5vZGUgaGFzIGNoYW5nZWRcclxuXHRcdGxldCBvbGROb2RlLCBub2RlID0gdGhpcy5yYW5nZUhlbHBlci5wYXJlbnROb2RlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuY3VycmVudE5vZGUgIT09IG5vZGUpIHtcclxuXHRcdFx0b2xkTm9kZSA9IHRoaXMuY3VycmVudE5vZGU7XHJcblx0XHRcdHRoaXMuY3VycmVudE5vZGUgPSBub2RlO1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRCbG9ja05vZGUgPSB0aGlzLnJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQobm9kZSk7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ25vZGVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdG9sZE5vZGU6IG9sZE5vZGUsXHJcblx0XHRcdFx0bmV3Tm9kZTogdGhpcy5jdXJyZW50Tm9kZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogQ3JlYXRlcyB0aGUgZWRpdG9yIGlmcmFtZSBhbmQgdGV4dGFyZWFcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHRoaXMudGV4dGFyZWEuX2VtbGVkaXRvciA9IHRoaXM7XHJcblxyXG5cclxuXHRcdC8vIExvYWQgbG9jYWxlXHJcblx0XHRpZiAodGhpc0VkaXRvci5vcHRpb25zLmxvY2FsZSAmJiB0aGlzRWRpdG9yLm9wdGlvbnMubG9jYWxlICE9PSAnZW4nKSB7XHJcblx0XHRcdHRoaXNFZGl0b3IuaW5pdExvY2FsZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWNvbnRhaW5lcicsXHJcblx0XHR9KSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0XHRkb20uaW5zZXJ0QmVmb3JlKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCB0aGlzRWRpdG9yLnRleHRhcmVhKTtcclxuXHRcdGRvbS5jc3ModGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsICd6LWluZGV4JywgdGhpc0VkaXRvci5vcHRpb25zLnpJbmRleCk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci5pc1JlcXVpcmVkID0gdGhpc0VkaXRvci50ZXh0YXJlYS5yZXF1aXJlZDtcclxuXHRcdHRoaXNFZGl0b3IudGV4dGFyZWEucmVxdWlyZWQgPSBmYWxzZTtcclxuXHJcblx0XHRsZXQgRm9ybWF0Q3RvciA9IEVtbEVkaXRvci5mb3JtYXRzW3RoaXNFZGl0b3Iub3B0aW9ucy5mb3JtYXRdO1xyXG5cdFx0dGhpc0VkaXRvci5mb3JtYXQgPSBGb3JtYXRDdG9yID8gbmV3IEZvcm1hdEN0b3IoKSA6IHt9O1xyXG5cdFx0LypcclxuXHRcdFx0KiBQbHVnaW5zIHNob3VsZCBiZSBpbml0aWFsaXplZCBiZWZvcmUgdGhlIGZvcm1hdHRlcnMgc2luY2VcclxuXHRcdFx0KiB0aGV5IG1heSB3aXNoIHRvIGFkZCBvciBjaGFuZ2UgZm9ybWF0dGluZyBoYW5kbGVycyBhbmRcclxuXHRcdFx0KiBzaW5jZSB0aGUgYmJjb2RlIGZvcm1hdCBjYWNoZXMgaXRzIGhhbmRsZXJzLFxyXG5cdFx0XHQqIHN1Y2ggY2hhbmdlcyBtdXN0IGJlIGRvbmUgZmlyc3QuXHJcblx0XHRcdCovXHJcblx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIgPSBuZXcgUGx1Z2luTWFuYWdlcih0aGlzRWRpdG9yKTtcclxuXHRcdCh0aGlzRWRpdG9yLm9wdGlvbnMucGx1Z2lucyB8fCAnJykuc3BsaXQoJywnKS5mb3JFYWNoKChwbHVnaW46IGFueSkgPT4ge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIucmVnaXN0ZXIocGx1Z2luLnRyaW0oKSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICgnaW5pdCcgaW4gdGhpc0VkaXRvci5mb3JtYXQpIHtcclxuXHRcdFx0KHRoaXNFZGl0b3IuZm9ybWF0IGFzIGFueSkuaW5pdC5jYWxsKHRoaXNFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENyZWF0ZSB0aGUgWUFFIVxyXG5cdFx0dGhpc0VkaXRvci5pbml0RW1vdGljb25zKCk7XHJcblx0XHR0aGlzRWRpdG9yLmluaXRUb29sQmFyKCk7XHJcblx0XHR0aGlzRWRpdG9yLmluaXRFZGl0b3IoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdE9wdGlvbnMoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdEV2ZW50cygpO1xyXG5cclxuXHRcdC8vIGZvcmNlIGludG8gc291cmNlIG1vZGUgaWYgaXMgYSBicm93c2VyIHRoYXQgY2FuJ3QgaGFuZGxlXHJcblx0XHQvLyBmdWxsIGVkaXRpbmdcclxuXHRcdGlmICghYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQpIHtcclxuXHRcdFx0dGhpc0VkaXRvci50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc0VkaXRvci51cGRhdGVBY3RpdmVCdXR0b25zKCk7XHJcblxyXG5cdFx0bGV0IGxvYWRlZCA9ICgpID0+IHtcclxuXHRcdFx0ZG9tLm9mZihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHJcblx0XHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuYXV0b2ZvY3VzKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5hdXRvZm9jdXMoISF0aGlzRWRpdG9yLm9wdGlvbnMuYXV0b2ZvY3VzRW5kKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc0VkaXRvci5hdXRvRXhwYW5kKCk7XHJcblx0XHRcdHRoaXNFZGl0b3IuYXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0XHQvLyBUT0RPOiB1c2UgZWRpdG9yIGRvYyBhbmQgd2luZG93P1xyXG5cdFx0XHR0aGlzRWRpdG9yLnBsdWdpbk1hbmFnZXIuY2FsbCgncmVhZHknKTtcclxuXHRcdFx0aWYgKCdvblJlYWR5JyBpbiB0aGlzRWRpdG9yLmZvcm1hdCkge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IuZm9ybWF0Lm9uUmVhZHkuY2FsbCh0aGlzRWRpdG9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGRvbS5vbihnbG9iYWxXaW4sICdsb2FkJywgbnVsbCwgbG9hZGVkKTtcclxuXHRcdGlmIChnbG9iYWxEb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xyXG5cdFx0XHRsb2FkZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0IHRoZSBsb2NhbGUgdmFyaWFibGUgd2l0aCB0aGUgc3BlY2lmaWVkIGxvY2FsZSBpZiBwb3NzaWJsZVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHJldHVybiB2b2lkXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0TG9jYWxlID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IGxhbmcgPSB1bmRlZmluZWQ7XHJcblxyXG5cdFx0dGhpcy5sb2NhbGUgPSBFbWxFZGl0b3IubG9jYWxlW3RoaXMub3B0aW9ucy5sb2NhbGVdO1xyXG5cclxuXHRcdGlmICghdGhpcy5sb2NhbGUpIHtcclxuXHRcdFx0bGFuZyA9IHRoaXMub3B0aW9ucy5sb2NhbGUuc3BsaXQoJy0nKTtcclxuXHRcdFx0dGhpcy5sb2NhbGUgPSBFbWxFZGl0b3IubG9jYWxlW2xhbmdbMF1dO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIExvY2FsZSBEYXRlVGltZSBmb3JtYXQgb3ZlcnJpZGVzIGFueSBzcGVjaWZpZWQgaW4gdGhlIG9wdGlvbnNcclxuXHRcdGlmICh0aGlzLmxvY2FsZSAmJiB0aGlzLmxvY2FsZS5kYXRlRm9ybWF0KSB7XHJcblx0XHRcdHRoaXMub3B0aW9ucy5kYXRlRm9ybWF0ID0gdGhpcy5sb2NhbGUuZGF0ZUZvcm1hdDtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0RWRpdG9yID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IgPSBkb20uY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnLCBudWxsKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9yID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScsIHtcclxuXHRcdFx0ZnJhbWVib3JkZXI6IFwiMFwiLFxyXG5cdFx0XHRhbGxvd2Z1bGxzY3JlZW46IFwidHJ1ZVwiXHJcblx0XHR9KSBhcyBIVE1MSUZyYW1lRWxlbWVudDtcclxuXHJcblx0XHQvKlxyXG5cdFx0XHQqIFRoaXMgbmVlZHMgdG8gYmUgZG9uZSByaWdodCBhZnRlciB0aGV5IGFyZSBjcmVhdGVkIGJlY2F1c2UsXHJcblx0XHRcdCogZm9yIGFueSByZWFzb24sIHRoZSB1c2VyIG1heSBub3Qgd2FudCB0aGUgdmFsdWUgdG8gYmUgdGlua2VyZWRcclxuXHRcdFx0KiBieSBhbnkgZmlsdGVycy5cclxuXHRcdFx0Ki9cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuc3RhcnRJblNvdXJjZU1vZGUpIHtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnc291cmNlTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLnd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnd3lzaXd5Z01vZGUnKTtcclxuXHRcdFx0ZG9tLmhpZGUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5vcHRpb25zLnNwZWxsY2hlY2spIHtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy5lZGl0b3JDb250YWluZXIsICdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGdsb2JhbFdpbi5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicpIHtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy53eXNpd3lnRWRpdG9yLCAnc3JjJywgJ2Fib3V0OmJsYW5rJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBlZGl0b3IgdG8gdGhlIGNvbnRhaW5lclxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCB0aGlzLnd5c2l3eWdFZGl0b3IpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCB0aGlzLnNvdXJjZUVkaXRvcik7XHJcblxyXG5cdFx0Ly8gVE9ETzogbWFrZSB0aGlzIG9wdGlvbmFsIHNvbWVob3dcclxuXHRcdHRoaXMuZGltZW5zaW9ucyhcclxuXHRcdFx0dGhpcy5vcHRpb25zLndpZHRoIHx8IGRvbS53aWR0aCh0aGlzLnRleHRhcmVhKSxcclxuXHRcdFx0dGhpcy5vcHRpb25zLmhlaWdodCB8fCBkb20uaGVpZ2h0KHRoaXMudGV4dGFyZWEpXHJcblx0XHQpO1xyXG5cclxuXHRcdC8vIEFkZCBpb3MgdG8gSFRNTCBzbyBjYW4gYXBwbHkgQ1NTIGZpeCB0byBvbmx5IGl0XHJcblx0XHRsZXQgY2xhc3NOYW1lID0gYnJvd3Nlci5pb3MgPyAnIGlvcycgOiAnJztcclxuXHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudCA9IHRoaXMud3lzaXd5Z0VkaXRvci5jb250ZW50RG9jdW1lbnQ7XHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudC5vcGVuKCk7XHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudC53cml0ZSh0ZW1wbGF0ZXMoJ2h0bWwnLCB7XHJcblx0XHRcdGF0dHJzOiAnIGNsYXNzPVwiJyArIGNsYXNzTmFtZSArICdcIicsXHJcblx0XHRcdHNwZWxsY2hlY2s6IHRoaXMub3B0aW9ucy5zcGVsbGNoZWNrID8gJycgOiAnc3BlbGxjaGVjaz1cImZhbHNlXCInLFxyXG5cdFx0XHRjaGFyc2V0OiB0aGlzLm9wdGlvbnMuY2hhcnNldCxcclxuXHRcdFx0c3R5bGU6IHRoaXMub3B0aW9ucy5zdHlsZVxyXG5cdFx0fSkpO1xyXG5cdFx0dGhpcy53eXNpd3lnRG9jdW1lbnQuY2xvc2UoKTtcclxuXHJcblx0XHR0aGlzLnd5c2l3eWdCb2R5ID0gdGhpcy53eXNpd3lnRG9jdW1lbnQuYm9keSBhcyBIVE1MQm9keUVsZW1lbnQ7XHJcblx0XHR0aGlzLnd5c2l3eWdXaW5kb3cgPSB0aGlzLnd5c2l3eWdFZGl0b3IuY29udGVudFdpbmRvdztcclxuXHJcblx0XHR0aGlzLnJlYWRPbmx5KCEhdGhpcy5vcHRpb25zLnJlYWRPbmx5KTtcclxuXHJcblx0XHQvLyBpZnJhbWUgb3ZlcmZsb3cgZml4IGZvciBpT1NcclxuXHRcdGlmIChicm93c2VyLmlvcykge1xyXG5cdFx0XHRkb20uaGVpZ2h0KHRoaXMud3lzaXd5Z0JvZHksICcxMDAlJyk7XHJcblx0XHRcdGRvbS5vbih0aGlzLnd5c2l3eWdCb2R5LCAndG91Y2hlbmQnLCBudWxsLCB0aGlzLmZvY3VzKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdGFiSW5kZXggPSBkb20uYXR0cih0aGlzLnRleHRhcmVhLCAndGFiaW5kZXgnKTtcclxuXHRcdGRvbS5hdHRyKHRoaXMuc291cmNlRWRpdG9yLCAndGFiaW5kZXgnLCB0YWJJbmRleCk7XHJcblx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHJcblx0XHR0aGlzLnJhbmdlSGVscGVyID0gbmV3IFJhbmdlSGVscGVyKHRoaXMud3lzaXd5Z1dpbmRvdywgbnVsbCwgdGhpcy5zYW5pdGl6ZSk7XHJcblxyXG5cdFx0Ly8gbG9hZCBhbnkgdGV4dGFyZWEgdmFsdWUgaW50byB0aGUgZWRpdG9yXHJcblx0XHRkb20uaGlkZSh0aGlzLnRleHRhcmVhKTtcclxuXHRcdHRoaXMudmFsKHRoaXMudGV4dGFyZWEudmFsdWUpO1xyXG5cclxuXHRcdGxldCBwbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucy5wbGFjZWhvbGRlciB8fFxyXG5cdFx0XHRkb20uYXR0cih0aGlzLnRleHRhcmVhLCAncGxhY2Vob2xkZXInKTtcclxuXHJcblx0XHRpZiAocGxhY2Vob2xkZXIpIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3IucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlcjtcclxuXHRcdFx0ZG9tLmF0dHIodGhpcy53eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJywgcGxhY2Vob2xkZXIpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpc2VzIG9wdGlvbnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdE9wdGlvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHQvLyBhdXRvLXVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXIgaWYgb3B0aW9uIHNldCB0byB0cnVlXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9VcGRhdGUpIHtcclxuXHRcdFx0ZG9tLm9uKHRoaXMud3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgdGhpcy5hdXRvVXBkYXRlKTtcclxuXHRcdFx0ZG9tLm9uKHRoaXMuc291cmNlRWRpdG9yLCAnYmx1cicsIG51bGwsIHRoaXMuYXV0b1VwZGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5ydGwgPT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLnJ0bCA9IGRvbS5jc3ModGhpcy5zb3VyY2VFZGl0b3IsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5ydGwoISF0aGlzLm9wdGlvbnMucnRsKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmF1dG9FeHBhbmQpIHtcclxuXHRcdFx0Ly8gTmVlZCB0byB1cGRhdGUgd2hlbiBpbWFnZXMgKG9yIGFueXRoaW5nIGVsc2UpIGxvYWRzXHJcblx0XHRcdGRvbS5vbih0aGlzLnd5c2l3eWdCb2R5LCAnbG9hZCcsIG51bGwsIHRoaXMuYXV0b0V4cGFuZCwgZG9tLkVWRU5UX0NBUFRVUkUpO1xyXG5cdFx0XHRkb20ub24odGhpcy53eXNpd3lnQm9keSwgJ2lucHV0IGtleXVwJywgbnVsbCwgdGhpcy5hdXRvRXhwYW5kKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnJlc2l6ZUVuYWJsZWQpIHtcclxuXHRcdFx0dGhpcy5pbml0UmVzaXplKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmF0dHIodGhpcy5lZGl0b3JDb250YWluZXIsICdpZCcsIHRoaXMub3B0aW9ucy5pZCk7XHJcblx0XHR0aGlzLmVtb3RpY29ucyh0aGlzLm9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGlzZXMgZXZlbnRzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRFdmVudHMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgZm9ybSA9IHRoaXNFZGl0b3IudGV4dGFyZWEuZm9ybTtcclxuXHRcdGxldCBjb21wb3NpdGlvbkV2ZW50cyA9ICdjb21wb3NpdGlvbnN0YXJ0IGNvbXBvc2l0aW9uZW5kJztcclxuXHRcdGxldCBldmVudHNUb0ZvcndhcmQgPSAna2V5ZG93biBrZXl1cCBrZXlwcmVzcyBmb2N1cyBibHVyIGNvbnRleHRtZW51IGlucHV0JztcclxuXHRcdGxldCBjaGVja1NlbGVjdGlvbkV2ZW50cyA9ICdvbnNlbGVjdGlvbmNoYW5nZScgaW4gdGhpc0VkaXRvci53eXNpd3lnRG9jdW1lbnQgP1xyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlJyA6XHJcblx0XHRcdCdrZXl1cCBmb2N1cyBibHVyIGNvbnRleHRtZW51IG1vdXNldXAgdG91Y2hlbmQgY2xpY2snO1xyXG5cclxuXHRcdGRvbS5vbihnbG9iYWxEb2MsICdjbGljaycsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRG9jdW1lbnRDbGljayk7XHJcblxyXG5cdFx0aWYgKGZvcm0pIHtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdyZXNldCcsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdFx0ZG9tLm9uKGZvcm0sICdzdWJtaXQnLCBudWxsLCB0aGlzRWRpdG9yLnNldFRleHRhcmVhVmFsdWUsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub24od2luZG93LCAncGFnZWhpZGUnLCBudWxsLCB0aGlzRWRpdG9yLnNldFRleHRhcmVhVmFsdWUpO1xyXG5cdFx0ZG9tLm9uKHdpbmRvdywgJ3BhZ2VzaG93JywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXlwcmVzcycsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlS2V5UHJlc3MpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXlkb3duJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5ZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlQmFja1NwYWNlKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCB0aGlzRWRpdG9yLmFwcGVuZE5ld0xpbmUpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdibHVyJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRCbHVyKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5dXAnLCBudWxsLCB0aGlzRWRpdG9yLnZhbHVlQ2hhbmdlZEtleVVwKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAncGFzdGUnLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZVBhc3RlRXZ0KTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAnY3V0IGNvcHknLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUN1dENvcHlFdnQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksIGNvbXBvc2l0aW9uRXZlbnRzLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUNvbXBvc2l0aW9uKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCBjaGVja1NlbGVjdGlvbkV2ZW50cywgbnVsbCwgdGhpc0VkaXRvci5jaGVja1NlbGVjdGlvbkNoYW5nZWQpO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksIGV2ZW50c1RvRm9yd2FyZCwgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVFdmVudCk7XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3Iub3B0aW9ucy5lbW90aWNvbnNDb21wYXQgJiYgZ2xvYmFsV2luLmdldFNlbGVjdGlvbikge1xyXG5cdFx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci5lbW90aWNvbnNDaGVja1doaXRlc3BhY2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAnYmx1cicsIG51bGwsICgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzRWRpdG9yLnZhbCgpKSB7XHJcblx0XHRcdFx0ZG9tLmFkZENsYXNzKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdwbGFjZWhvbGRlcicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2ZvY3VzJywgbnVsbCwgKCkgPT4ge1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ3BsYWNlaG9sZGVyJyk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsICdibHVyJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRCbHVyKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnNvdXJjZUVkaXRvciwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsICdrZXlkb3duJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVLZXlEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnNvdXJjZUVkaXRvciwgY29tcG9zaXRpb25FdmVudHMsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlQ29tcG9zaXRpb24pO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iuc291cmNlRWRpdG9yLCBldmVudHNUb0ZvcndhcmQsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRXZlbnQpO1xyXG5cclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgJ21vdXNlZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlTW91c2VEb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgY2hlY2tTZWxlY3Rpb25FdmVudHMsIG51bGwsIHRoaXNFZGl0b3IuY2hlY2tTZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci5hcHBlbmROZXdMaW5lKTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgdGhpc0VkaXRvci5jaGVja05vZGVDaGFuZ2VkKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnLCBudWxsLCB0aGlzRWRpdG9yLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMpO1xyXG5cdFx0Ly8gQ3VzdG9tIGV2ZW50cyB0byBmb3J3YXJkXHJcblx0XHRkb20ub24oXHJcblx0XHRcdHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLFxyXG5cdFx0XHQnc2VsZWN0aW9uY2hhbmdlZCB2YWx1ZWNoYW5nZWQgbm9kZWNoYW5nZWQgcGFzdGVyYXcgcGFzdGUnLFxyXG5cdFx0XHRudWxsLFxyXG5cdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUV2ZW50XHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHRvb2xiYXIgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIGNvbnRhaW5lclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0VG9vbEJhciA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yOiBhbnkgPSB0aGlzO1xyXG5cdFx0bGV0IGdyb3VwOiBhbnk7XHJcblx0XHRsZXQgY29tbWFuZHMgPSB0aGlzRWRpdG9yLmNvbW1hbmRzO1xyXG5cdFx0bGV0IGV4Y2x1ZGUgPSAodGhpc0VkaXRvci5vcHRpb25zLnRvb2xiYXJFeGNsdWRlIHx8ICcnKS5zcGxpdCgnLCcpO1xyXG5cdFx0bGV0IGdyb3VwcyA9IHRoaXNFZGl0b3Iub3B0aW9ucy50b29sYmFyLnNwbGl0KCd8Jyk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci50b29sYmFyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLXRvb2xiYXInLFxyXG5cdFx0XHR1bnNlbGVjdGFibGU6ICdvbidcclxuXHRcdH0pIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuaWNvbnMgaW4gRW1sRWRpdG9yLmljb25zKSB7XHJcblx0XHRcdHRoaXNFZGl0b3IuaWNvbnMgPSBuZXcgRW1sRWRpdG9yLmljb25zW3RoaXNFZGl0b3Iub3B0aW9ucy5pY29uc10oKTtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKGdyb3VwcywgKF8sIG1lbnVJdGVtcykgPT4ge1xyXG5cdFx0XHRncm91cCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWdyb3VwJ1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2gobWVudUl0ZW1zLnNwbGl0KCcsJyksIChfLCBjb21tYW5kTmFtZSkgPT4ge1xyXG5cdFx0XHRcdGxldCBidXR0b246IGFueSwgc2hvcnRjdXQsIGNvbW1hbmQgPSBjb21tYW5kc1tjb21tYW5kTmFtZV07XHJcblxyXG5cdFx0XHRcdC8vIFRoZSBjb21tYW5kTmFtZSBtdXN0IGJlIGEgdmFsaWQgY29tbWFuZCBhbmQgbm90IGV4Y2x1ZGVkXHJcblx0XHRcdFx0aWYgKCFjb21tYW5kIHx8IGV4Y2x1ZGUuaW5kZXhPZihjb21tYW5kTmFtZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0c2hvcnRjdXQgPSBjb21tYW5kLnNob3J0Y3V0O1xyXG5cdFx0XHRcdGJ1dHRvbiA9IHRlbXBsYXRlcygndG9vbGJhckJ1dHRvbicsIHtcclxuXHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0ZGlzcE5hbWU6IHRoaXNFZGl0b3IudHJhbnNsYXRlKGNvbW1hbmQubmFtZSB8fFxyXG5cdFx0XHRcdFx0XHRjb21tYW5kLnRvb2x0aXAgfHwgY29tbWFuZE5hbWUpXHJcblx0XHRcdFx0fSwgdHJ1ZSkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXNFZGl0b3IuaWNvbnMgJiYgdGhpc0VkaXRvci5pY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0XHRcdGxldCBpY29uID0gdGhpc0VkaXRvci5pY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpO1xyXG5cdFx0XHRcdFx0aWYgKGljb24pIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZSh0aGlzRWRpdG9yLmljb25zLmNyZWF0ZShjb21tYW5kTmFtZSksXHJcblx0XHRcdFx0XHRcdFx0YnV0dG9uLmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHRcdFx0XHRkb20uYWRkQ2xhc3MoYnV0dG9uLCAnaGFzLWljb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJ1dHRvbi5fZW1sVHh0TW9kZSA9ICEhY29tbWFuZC50eHRFeGVjO1xyXG5cdFx0XHRcdGJ1dHRvbi5fZW1sV3lzaXd5Z01vZGUgPSAhIWNvbW1hbmQuZXhlYztcclxuXHRcdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnLCAhY29tbWFuZC5leGVjKTtcclxuXHRcdFx0XHRkb20ub24oYnV0dG9uLCAnY2xpY2snLCBudWxsLCAoZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRpZiAoIWRvbS5oYXNDbGFzcyhidXR0b24sICdkaXNhYmxlZCcpKSB7XHJcblx0XHRcdFx0XHRcdHRoaXNFZGl0b3IuaGFuZGxlQ29tbWFuZChidXR0b24sIGNvbW1hbmQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHRoaXNFZGl0b3IudXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdC8vIFByZXZlbnQgZWRpdG9yIGxvc2luZyBmb2N1cyB3aGVuIGJ1dHRvbiBjbGlja2VkXHJcblx0XHRcdFx0ZG9tLm9uKGJ1dHRvbiwgJ21vdXNlZG93bicsIG51bGwsIChlOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdHRoaXNFZGl0b3IuY2xvc2VEcm9wRG93bigpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRpZiAoY29tbWFuZC50b29sdGlwKSB7XHJcblx0XHRcdFx0XHRkb20uYXR0cihidXR0b24sICd0aXRsZScsXHJcblx0XHRcdFx0XHRcdHRoaXNFZGl0b3IudHJhbnNsYXRlKGNvbW1hbmQudG9vbHRpcCkgK1xyXG5cdFx0XHRcdFx0XHQoc2hvcnRjdXQgPyAnICgnICsgc2hvcnRjdXQgKyAnKScgOiAnJylcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoc2hvcnRjdXQpIHtcclxuXHRcdFx0XHRcdHRoaXNFZGl0b3IuYWRkU2hvcnRjdXQoc2hvcnRjdXQsIGNvbW1hbmROYW1lKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChjb21tYW5kLnN0YXRlKSB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0XHRzdGF0ZTogY29tbWFuZC5zdGF0ZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHQvLyBleGVjIHN0cmluZyBjb21tYW5kcyBjYW4gYmUgcGFzc2VkIHRvIHF1ZXJ5Q29tbWFuZFN0YXRlXHJcblx0XHRcdFx0fSBlbHNlIGlmICh1dGlscy5pc1N0cmluZyhjb21tYW5kLmV4ZWMpKSB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmJ0blN0YXRlSGFuZGxlcnMucHVzaCh7XHJcblx0XHRcdFx0XHRcdG5hbWU6IGNvbW1hbmROYW1lLFxyXG5cdFx0XHRcdFx0XHRzdGF0ZTogY29tbWFuZC5leGVjXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChncm91cCwgYnV0dG9uKTtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnRvb2xiYXJCdXR0b25zW2NvbW1hbmROYW1lXSA9IGJ1dHRvbjtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHQvLyBFeGNsdWRlIGVtcHR5IGdyb3Vwc1xyXG5cdFx0XHRpZiAoZ3JvdXAuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzRWRpdG9yLnRvb2xiYXIsIGdyb3VwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQXBwZW5kIHRoZSB0b29sYmFyIHRvIHRoZSB0b29sYmFyQ29udGFpbmVyIG9wdGlvbiBpZiBnaXZlblxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXNFZGl0b3Iub3B0aW9ucy50b29sYmFyQ29udGFpbmVyIHx8IHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCB0aGlzRWRpdG9yLnRvb2xiYXIpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIHJlc2l6ZXIuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRSZXNpemUgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgbWluSGVpZ2h0OiBhbnksIG1heEhlaWdodDogYW55LCBtaW5XaWR0aDogYW55LCBtYXhXaWR0aDogYW55LCBtb3VzZU1vdmVGdW5jOiBhbnksIG1vdXNlVXBGdW5jOiBhbnksIGdyaXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItZ3JpcCdcclxuXHRcdH0pLFxyXG5cdFx0XHQvLyBDb3ZlciBpcyB1c2VkIHRvIGNvdmVyIHRoZSBlZGl0b3IgaWZyYW1lIHNvIGRvY3VtZW50XHJcblx0XHRcdC8vIHN0aWxsIGdldHMgbW91c2UgbW92ZSBldmVudHNcclxuXHRcdFx0Y292ZXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1yZXNpemUtY292ZXInXHJcblx0XHRcdH0pLCBtb3ZlRXZlbnRzID0gJ3RvdWNobW92ZSBtb3VzZW1vdmUnLCBlbmRFdmVudHMgPSAndG91Y2hjYW5jZWwgdG91Y2hlbmQgbW91c2V1cCcsIHN0YXJ0WCA9IDAsIHN0YXJ0WSA9IDAsIG5ld1ggPSAwLCBuZXdZID0gMCwgc3RhcnRXaWR0aCA9IDAsIHN0YXJ0SGVpZ2h0ID0gMCwgb3JpZ1dpZHRoID0gZG9tLndpZHRoKHRoaXMuZWRpdG9yQ29udGFpbmVyKSwgb3JpZ0hlaWdodCA9IGRvbS5oZWlnaHQodGhpcy5lZGl0b3JDb250YWluZXIpLCBpc0RyYWdnaW5nID0gZmFsc2UsIHJ0bCA9IHRoaXMucnRsKCk7XHJcblxyXG5cdFx0bWluSGVpZ2h0ID0gdGhpcy5vcHRpb25zLnJlc2l6ZU1pbkhlaWdodCB8fCBvcmlnSGVpZ2h0IC8gMS41O1xyXG5cdFx0bWF4SGVpZ2h0ID0gdGhpcy5vcHRpb25zLnJlc2l6ZU1heEhlaWdodCB8fCBvcmlnSGVpZ2h0ICogMi41O1xyXG5cdFx0bWluV2lkdGggPSB0aGlzLm9wdGlvbnMucmVzaXplTWluV2lkdGggfHwgb3JpZ1dpZHRoIC8gMS4yNTtcclxuXHRcdG1heFdpZHRoID0gdGhpcy5vcHRpb25zLnJlc2l6ZU1heFdpZHRoIHx8IG9yaWdXaWR0aCAqIDEuMjU7XHJcblxyXG5cdFx0bW91c2VNb3ZlRnVuYyA9IChlOiBhbnkpID0+IHtcclxuXHRcdFx0Ly8gaU9TIHVzZXMgd2luZG93LmV2ZW50XHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcblx0XHRcdFx0ZSA9IGdsb2JhbFdpbi5ldmVudDtcclxuXHRcdFx0XHRuZXdYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcclxuXHRcdFx0XHRuZXdZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRuZXdYID0gZS5wYWdlWDtcclxuXHRcdFx0XHRuZXdZID0gZS5wYWdlWTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG5ld0hlaWdodCA9IHN0YXJ0SGVpZ2h0ICsgKG5ld1kgLSBzdGFydFkpLCBuZXdXaWR0aCA9IHJ0bCA/XHJcblx0XHRcdFx0c3RhcnRXaWR0aCAtIChuZXdYIC0gc3RhcnRYKSA6XHJcblx0XHRcdFx0c3RhcnRXaWR0aCArIChuZXdYIC0gc3RhcnRYKTtcclxuXHJcblx0XHRcdGlmIChtYXhXaWR0aCA+IDAgJiYgbmV3V2lkdGggPiBtYXhXaWR0aCkge1xyXG5cdFx0XHRcdG5ld1dpZHRoID0gbWF4V2lkdGg7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG1pbldpZHRoID4gMCAmJiBuZXdXaWR0aCA8IG1pbldpZHRoKSB7XHJcblx0XHRcdFx0bmV3V2lkdGggPSBtaW5XaWR0aDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXRoaXMub3B0aW9ucy5yZXNpemVXaWR0aCkge1xyXG5cdFx0XHRcdG5ld1dpZHRoID0gdW5kZWZpbmVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobWF4SGVpZ2h0ID4gMCAmJiBuZXdIZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuXHRcdFx0XHRuZXdIZWlnaHQgPSBtYXhIZWlnaHQ7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKG1pbkhlaWdodCA+IDAgJiYgbmV3SGVpZ2h0IDwgbWluSGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gbWluSGVpZ2h0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLnJlc2l6ZUhlaWdodCkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG5ld1dpZHRoIHx8IG5ld0hlaWdodCkge1xyXG5cdFx0XHRcdHRoaXMuZGltZW5zaW9ucyhuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRtb3VzZVVwRnVuYyA9IChlOiBhbnkpID0+IHtcclxuXHRcdFx0aWYgKCFpc0RyYWdnaW5nKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpc0RyYWdnaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHRkb20uaGlkZShjb3Zlcik7XHJcblx0XHRcdGRvbS5yZW1vdmVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XHJcblx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0ZG9tLm9mZihnbG9iYWxEb2MsIGVuZEV2ZW50cywgbnVsbCwgbW91c2VVcEZ1bmMpO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAodGhpcy5pY29ucyAmJiB0aGlzLmljb25zLmNyZWF0ZSkge1xyXG5cdFx0XHRsZXQgaWNvbiA9IHRoaXMuaWNvbnMuY3JlYXRlKCdncmlwJyk7XHJcblx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGdyaXAsIGljb24pO1xyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhncmlwLCAnaGFzLWljb24nKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzLmVkaXRvckNvbnRhaW5lciwgZ3JpcCk7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5lZGl0b3JDb250YWluZXIsIGNvdmVyKTtcclxuXHRcdGRvbS5oaWRlKGNvdmVyKTtcclxuXHJcblx0XHRkb20ub24oZ3JpcCwgJ3RvdWNoc3RhcnQgbW91c2Vkb3duJywgbnVsbCwgKGU6IGFueSkgPT4ge1xyXG5cdFx0XHQvLyBpT1MgdXNlcyB3aW5kb3cuZXZlbnRcclxuXHRcdFx0aWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XHJcblx0XHRcdFx0ZSA9IGdsb2JhbFdpbi5ldmVudDtcclxuXHRcdFx0XHRzdGFydFggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0c3RhcnRZID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN0YXJ0WCA9IGUucGFnZVg7XHJcblx0XHRcdFx0c3RhcnRZID0gZS5wYWdlWTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c3RhcnRXaWR0aCA9IGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdHN0YXJ0SGVpZ2h0ID0gZG9tLmhlaWdodCh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblx0XHRcdGlzRHJhZ2dpbmcgPSB0cnVlO1xyXG5cclxuXHRcdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAncmVzaXppbmcnKTtcclxuXHRcdFx0ZG9tLnNob3coY292ZXIpO1xyXG5cdFx0XHRkb20ub24oZ2xvYmFsRG9jLCBtb3ZlRXZlbnRzLCBudWxsLCBtb3VzZU1vdmVGdW5jKTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbERvYywgZW5kRXZlbnRzLCBudWxsLCBtb3VzZVVwRnVuYyk7XHJcblxyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQcmVmaXhlcyBhbmQgcHJlbG9hZHMgdGhlIGVtb3RpY29uIGltYWdlc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0RW1vdGljb25zID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IGVtb3RpY29ucyA9IHRoaXMub3B0aW9ucy5lbW90aWNvbnM7XHJcblx0XHRsZXQgcm9vdCA9IHRoaXMub3B0aW9ucy5lbW90aWNvbnNSb290IHx8ICcnO1xyXG5cclxuXHRcdGlmIChlbW90aWNvbnMpIHtcclxuXHRcdFx0dGhpcy5hbGxFbW90aWNvbnMgPSB1dGlscy5leHRlbmQoXHJcblx0XHRcdFx0e30sIGVtb3RpY29ucy5tb3JlLCBlbW90aWNvbnMuZHJvcGRvd24sIGVtb3RpY29ucy5oaWRkZW5cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKHRoaXMuYWxsRW1vdGljb25zLCAoa2V5LCB1cmwpID0+IHtcclxuXHRcdFx0dGhpc0VkaXRvci5hbGxFbW90aWNvbnNba2V5XSA9IHRlbXBsYXRlcygnZW1vdGljb24nLCB7XHJcblx0XHRcdFx0a2V5OiBrZXksXHJcblx0XHRcdFx0Ly8gUHJlZml4IGVtb3RpY29uIHJvb3QgdG8gZW1vdGljb24gdXJsc1xyXG5cdFx0XHRcdHVybDogcm9vdCArICh1cmwudXJsIHx8IHVybCksXHJcblx0XHRcdFx0dG9vbHRpcDogdXJsLnRvb2x0aXAgfHwga2V5XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gUHJlbG9hZCB0aGUgZW1vdGljb25cclxuXHRcdFx0aWYgKHRoaXNFZGl0b3Iub3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5wcmVMb2FkQ2FjaGUucHVzaChkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xyXG5cdFx0XHRcdFx0c3JjOiByb290ICsgKHVybC51cmwgfHwgdXJsKVxyXG5cdFx0XHRcdH0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXV0b2ZvY3VzIHRoZSBlZGl0b3JcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b2ZvY3VzID0gKGZvY3VzRW5kOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGxldCByYW5nZSwgdHh0UG9zO1xyXG5cdFx0bGV0IG5vZGUgPSB0aGlzLnd5c2l3eWdCb2R5LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0Ly8gQ2FuJ3QgZm9jdXMgaW52aXNpYmxlIGVsZW1lbnRzXHJcblx0XHRpZiAoIWRvbS5pc1Zpc2libGUodGhpcy5lZGl0b3JDb250YWluZXIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0dHh0UG9zID0gZm9jdXNFbmQgPyB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZS5sZW5ndGggOiAwO1xyXG5cclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2V0U2VsZWN0aW9uUmFuZ2UodHh0UG9zLCB0eHRQb3MpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRsZXQgbGFzdENoaWxkID0gdGhpcy53eXNpd3lnQm9keS5sYXN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdGlmICghKG5vZGUgPSBsYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0bm9kZSA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHRoaXMud3lzaXd5Z0RvY3VtZW50KSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy53eXNpd3lnQm9keSwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChub2RlLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdG5vZGUgPSBub2RlLmxhc3RDaGlsZCBhcyBIVE1MRWxlbWVudDtcclxuXHJcblx0XHRcdFx0Ly8gU2hvdWxkIHBsYWNlIHRoZSBjdXJzb3IgYmVmb3JlIHRoZSBsYXN0IDxicj5cclxuXHRcdFx0XHRpZiAoZG9tLmlzKG5vZGUsICdicicpICYmIG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmFuZ2UgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG5cclxuXHRcdGlmICghZG9tLmNhbkhhdmVDaGlsZHJlbihub2RlKSkge1xyXG5cdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShub2RlKTtcclxuXHJcblx0XHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHRcdHJhbmdlLnNldFN0YXJ0QWZ0ZXIobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhub2RlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZS5jb2xsYXBzZSghZm9jdXNFbmQpO1xyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XHJcblx0XHR0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSByYW5nZTtcclxuXHJcblx0XHRpZiAoZm9jdXNFbmQpIHtcclxuXHRcdFx0dGhpcy53eXNpd3lnQm9keS5zY3JvbGxUb3AgPSB0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbEhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXV0b2V4cGFuZFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXV0b0V4cGFuZCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b0V4cGFuZCAmJiAhdGhpcy5hdXRvRXhwYW5kVGhyb3R0bGUpIHtcclxuXHRcdFx0dGhpcy5hdXRvRXhwYW5kVGhyb3R0bGUgPSBzZXRUaW1lb3V0KHRoaXMuZXhwYW5kVG9Db250ZW50LCAyMDApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYW55IGRvY3VtZW50IGNsaWNrIGFuZCBjbG9zZXMgdGhlIGRyb3Bkb3duIGlmIG9wZW5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlRG9jdW1lbnRDbGljayA9IChlOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdC8vIGlnbm9yZSByaWdodCBjbGlja3NcclxuXHRcdGlmIChlLndoaWNoICE9PSAzICYmIHRoaXMuZHJvcGRvd24gJiYgIWUuZGVmYXVsdFByZXZlbnRlZCkge1xyXG5cdFx0XHR0aGlzLmF1dG9VcGRhdGUoKTtcclxuXHJcblx0XHRcdHRoaXMuY2xvc2VEcm9wRG93bigpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjdXQgJiBjb3B5IGV2ZW50c1xyXG5cdCAqXHJcblx0ICogQnkgZGVmYXVsdCBicm93c2VycyBhbHNvIGNvcHkgaW5oZXJpdGVkIHN0eWxpbmcgZnJvbSB0aGUgc3R5bGVzaGVldCBhbmRcclxuXHQgKiBicm93c2VyIGRlZmF1bHQgc3R5bGluZyB3aGljaCBpcyB1bm5lY2Vzc2FyeS5cclxuXHQgKlxyXG5cdCAqIFRoaXMgd2lsbCBpZ25vcmUgaW5oZXJpdGVkIHN0eWxlcyBhbmQgb25seSBjb3B5IGlubGluZSBzdHlsaW5nLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVDdXRDb3B5RXZ0ID0gKGU6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHJhbmdlID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRpZiAocmFuZ2UpIHtcclxuXHRcdFx0bGV0IGNvbnRhaW5lciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7fSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRsZXQgZmlyc3RQYXJlbnQ7XHJcblxyXG5cdFx0XHQvLyBDb3B5IGFsbCBpbmxpbmUgcGFyZW50IG5vZGVzIHVwIHRvIHRoZSBmaXJzdCBibG9jayBwYXJlbnQgc28gY2FuXHJcblx0XHRcdC8vIGNvcHkgaW5saW5lIHN0eWxlc1xyXG5cdFx0XHRsZXQgcGFyZW50ID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRpZiAocGFyZW50Lm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRcdFx0XHRsZXQgY2xvbmUgPSBwYXJlbnQuY2xvbmVOb2RlKCkgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0XHRpZiAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNsb25lLCBjb250YWluZXIuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRhaW5lciwgY2xvbmUpO1xyXG5cdFx0XHRcdFx0Zmlyc3RQYXJlbnQgPSBmaXJzdFBhcmVudCB8fCBjbG9uZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChmaXJzdFBhcmVudCB8fCBjb250YWluZXIsIHJhbmdlLmNsb25lQ29udGVudHMoKSk7XHJcblx0XHRcdGRvbS5yZW1vdmVXaGl0ZVNwYWNlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9odG1sJywgY29udGFpbmVyLmlubmVySFRNTCk7XHJcblxyXG5cdFx0XHQvLyBUT0RPOiBSZWZhY3RvciBpbnRvIHByaXZhdGUgc2hhcmVkIG1vZHVsZSB3aXRoIHBsYWludGV4dCBwbHVnaW5cclxuXHRcdFx0Ly8gaW5uZXJUZXh0IGFkZHMgdHdvIG5ld2xpbmVzIGFmdGVyIDxwPiB0YWdzIHNvIGNvbnZlcnQgdGhlbSB0b1xyXG5cdFx0XHQvLyA8ZGl2PiB0YWdzXHJcblx0XHRcdHV0aWxzLmVhY2goZG9tLmZpbmQoY29udGFpbmVyLCAncCcpLCAoXywgZWxtKSA9PiB7XHJcblx0XHRcdFx0ZG9tLmNvbnZlcnRFbGVtZW50KGVsbSwgJ2RpdicpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8gUmVtb3ZlIGNvbGxhcHNlZCA8YnI+IHRhZ3MgYXMgaW5uZXJUZXh0IGNvbnZlcnRzIHRoZW0gdG8gbmV3bGluZXNcclxuXHRcdFx0dXRpbHMuZWFjaChkb20uZmluZChjb250YWluZXIsICdicicpLCAoXywgZWxtKSA9PiB7XHJcblx0XHRcdFx0aWYgKCFlbG0ubmV4dFNpYmxpbmcgfHwgIWRvbS5pc0lubGluZShlbG0ubmV4dFNpYmxpbmcsIHRydWUpKSB7XHJcblx0XHRcdFx0XHRkb20ucmVtb3ZlKGVsbSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIHJhbmdlLnRvU3RyaW5nKCkgZG9lc24ndCBpbmNsdWRlIG5ld2xpbmVzIHNvIGNhbid0IHVzZSB0aGlzLlxyXG5cdFx0XHQvLyBzZWxlY3Rpb24udG9TdHJpbmcoKSBzZWVtcyB0byB1c2UgdGhlIHNhbWUgbWV0aG9kIGFzIGlubmVyVGV4dFxyXG5cdFx0XHQvLyBidXQgbmVlZHMgdG8gYmUgbm9ybWFsaXNlZCBmaXJzdCBzbyB1c2luZyBjb250YWluZXIuaW5uZXJUZXh0XHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzLnd5c2l3eWdCb2R5LCBjb250YWluZXIpO1xyXG5cdFx0XHRlLmNsaXBib2FyZERhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIGNvbnRhaW5lci5pbm5lclRleHQpO1xyXG5cdFx0XHRkb20ucmVtb3ZlKGNvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRpZiAoZS50eXBlID09PSAnY3V0Jykge1xyXG5cdFx0XHRcdHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBXWVNJV1lHIGVkaXRvcnMgcGFzdGUgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlUGFzdGVFdnQgPSAoZTogQ2xpcGJvYXJkRXZlbnQpOiB2b2lkID0+IHtcclxuXHRcdGNvbnN0IElNQUdFX01JTUVfUkVHRVg6IFJlZ0V4cCA9IC9eaW1hZ2VcXC8ocD9qcGU/Z3xnaWZ8cG5nfGJtcCkkL2k7XHJcblx0XHRsZXQgZWRpdG9yQ29udGV4dCA9IHRoaXM7XHJcblx0XHRsZXQgZWRpdGFibGUgPSBlZGl0b3JDb250ZXh0Lnd5c2l3eWdCb2R5O1xyXG5cdFx0bGV0IGNsaXBib2FyZCA9IGUuY2xpcGJvYXJkRGF0YTtcclxuXHRcdGxldCBsb2FkSW1hZ2UgPSAoZmlsZTogYW55KSA9PiB7XHJcblx0XHRcdGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRyZWFkZXIub25sb2FkID0gKGU6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGVkaXRvckNvbnRleHQuaGFuZGxlUGFzdGVEYXRhKHtcclxuXHRcdFx0XHRcdGh0bWw6ICc8aW1nIHNyYz1cIicgKyBlLnRhcmdldC5yZXN1bHQgKyAnXCIgLz4nXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH07XHJcblx0XHRcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBNb2Rlcm4gYnJvd3NlcnMgd2l0aCBjbGlwYm9hcmQgQVBJIC0gZXZlcnl0aGluZyBvdGhlciB0aGFuIF92ZXJ5X1xyXG5cdFx0Ly8gb2xkIGFuZHJvaWQgd2ViIHZpZXdzIGFuZCBVQyBicm93c2VyIHdoaWNoIGRvZXNuJ3Qgc3VwcG9ydCB0aGVcclxuXHRcdC8vIHBhc3RlIGV2ZW50IGF0IGFsbC5cclxuXHRcdGlmIChjbGlwYm9hcmQpIHtcclxuXHRcdFx0bGV0IGRhdGE6IGFueSA9IFtdO1xyXG5cdFx0XHRsZXQgdHlwZXMgPSBjbGlwYm9hcmQudHlwZXM7XHJcblx0XHRcdGxldCBpdGVtcyA9IGNsaXBib2FyZC5pdGVtcztcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHQvLyBXb3JkIHNvbWV0aW1lcyBhZGRzIGNvcGllZCB0ZXh0IGFzIGFuIGltYWdlIHNvIGlmIEhUTUxcclxuXHRcdFx0XHQvLyBleGlzdHMgcHJlZmVyIHRoYXQgb3ZlciBpbWFnZXNcclxuXHRcdFx0XHRpZiAodHlwZXMuaW5kZXhPZigndGV4dC9odG1sJykgPCAwKSB7XHJcblx0XHRcdFx0XHQvLyBOb3JtYWxpc2UgaW1hZ2UgcGFzdGluZyB0byBwYXN0ZSBhcyBhIGRhdGEtdXJpXHJcblx0XHRcdFx0XHRpZiAoZ2xvYmFsV2luLkZpbGVSZWFkZXIgJiYgaXRlbXMgJiZcclxuXHRcdFx0XHRcdFx0SU1BR0VfTUlNRV9SRUdFWC50ZXN0KGl0ZW1zW2ldLnR5cGUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBsb2FkSW1hZ2UoY2xpcGJvYXJkLml0ZW1zW2ldLmdldEFzRmlsZSgpKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGF0YVt0eXBlc1tpXV0gPSBjbGlwYm9hcmQuZ2V0RGF0YSh0eXBlc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gQ2FsbCBwbHVnaW5zIGhlcmUgd2l0aCBmaWxlP1xyXG5cdFx0XHRkYXRhLnRleHQgPSBkYXRhWyd0ZXh0L3BsYWluJ107XHJcblx0XHRcdGRhdGEuaHRtbCA9IHRoaXMuc2FuaXRpemUoZGF0YVsndGV4dC9odG1sJ10pO1xyXG5cclxuXHRcdFx0dGhpcy5oYW5kbGVQYXN0ZURhdGEoZGF0YSk7XHJcblx0XHRcdC8vIElmIGNvbnRlbnRzRnJhZ21lbnQgZXhpc3RzIHRoZW4gd2UgYXJlIGFscmVhZHkgd2FpdGluZyBmb3IgYVxyXG5cdFx0XHQvLyBwcmV2aW91cyBwYXN0ZSBzbyBsZXQgdGhlIGhhbmRsZXIgZm9yIHRoYXQgaGFuZGxlIHRoaXMgb25lIHRvb1xyXG5cdFx0fSBlbHNlIGlmICghdGhpcy5wYXN0ZUNvbnRlbnRGcmFnbWVudCkge1xyXG5cdFx0XHQvLyBTYXZlIHRoZSBzY3JvbGwgcG9zaXRpb24gc28gY2FuIGJlIHJlc3RvcmVkXHJcblx0XHRcdC8vIHdoZW4gY29udGVudHMgaXMgcmVzdG9yZWRcclxuXHRcdFx0bGV0IHNjcm9sbFRvcCA9IGVkaXRhYmxlLnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblxyXG5cdFx0XHR0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50ID0gZ2xvYmFsRG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHRcdFx0d2hpbGUgKGVkaXRhYmxlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5wYXN0ZUNvbnRlbnRGcmFnbWVudCwgZWRpdGFibGUuZmlyc3RDaGlsZCBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGxldCBodG1sID0gZWRpdGFibGUuaW5uZXJIVE1MO1xyXG5cclxuXHRcdFx0XHRlZGl0YWJsZS5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZWRpdGFibGUsIHRoaXMucGFzdGVDb250ZW50RnJhZ21lbnQpO1xyXG5cdFx0XHRcdGVkaXRhYmxlLnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcclxuXHRcdFx0XHR0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdHRoaXMucmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdHRoaXMuaGFuZGxlUGFzdGVEYXRhKHsgaHRtbDogdGhpcy5zYW5pdGl6ZShodG1sKSB9KTtcclxuXHRcdFx0fSwgMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVwbGFjZXMgYW55IGVtb3RpY29uIGNvZGVzIGluIHRoZSBwYXNzZWQgSFRNTFxyXG5cdCAqIHdpdGggdGhlaXIgZW1vdGljb24gaW1hZ2VzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHJlcGxhY2VFbW90aWNvbnMgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQpIHtcclxuXHRcdFx0ZW1vdGljb25zXHJcblx0XHRcdFx0LnJlcGxhY2UodGhpcy53eXNpd3lnQm9keSwgdGhpcy5hbGxFbW90aWNvbnMsIHRoaXMub3B0aW9ucy5lbW90aWNvbnNDb21wYXQpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIHNlbGVjdGVkIHRleHQgb2YgdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zb3VyY2VFZGl0b3IudmFsdWUuc3Vic3RyaW5nKFxyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCxcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kXHJcblx0XHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIHBhc3NlZCBjb21tYW5kXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUNvbW1hbmQgPSAoY2FsbGVyOiBhbnksIGNtZDogYW55KTogdm9pZCA9PiB7XHJcblx0XHQvLyBjaGVjayBpZiBpbiB0ZXh0IG1vZGUgYW5kIGhhbmRsZSB0ZXh0IGNvbW1hbmRzXHJcblx0XHRpZiAodGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHRpZiAoY21kLnR4dEV4ZWMpIHtcclxuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShjbWQudHh0RXhlYykpIHtcclxuXHRcdFx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dC5hcHBseSh0aGlzLCBjbWQudHh0RXhlYyk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNtZC50eHRFeGVjLmNhbGwodGhpcywgY2FsbGVyLCB0aGlzLnNvdXJjZUVkaXRvclNlbGVjdGVkVGV4dCgpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY21kLmV4ZWMpIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oY21kLmV4ZWMpKSB7XHJcblx0XHRcdFx0Y21kLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoXHJcblx0XHRcdFx0XHRjbWQuZXhlYyxcclxuXHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjbWQsICdleGVjUGFyYW0nKSA/IGNtZC5leGVjUGFyYW0gOiBudWxsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBXcmFwIGlubGluZXMgdGhhdCBhcmUgaW4gdGhlIHJvb3QgaW4gcGFyYWdyYXBocy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7SFRNTEJvZHlFbGVtZW50fSBib2R5XHJcblx0ICogQHBhcmFtIHtEb2N1bWVudH0gZG9jXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHdyYXBJbmxpbmVzID0gKGJvZHk6IEhUTUxCb2R5RWxlbWVudCwgZG9jOiBEb2N1bWVudCkgPT4ge1xyXG5cdFx0bGV0IHdyYXBwZXI6IEhUTUxFbGVtZW50O1xyXG5cclxuXHRcdGRvbS50cmF2ZXJzZShib2R5LCAobm9kZTogSFRNTEVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKGRvbS5pc0lubGluZShub2RlLCB0cnVlKSkge1xyXG5cdFx0XHRcdC8vIElnbm9yZSB0ZXh0IG5vZGVzIHVubGVzcyB0aGV5IGNvbnRhaW4gbm9uLXdoaXRlc3BhY2UgY2hhcnMgYXNcclxuXHRcdFx0XHQvLyB3aGl0ZXNwYWNlIHdpbGwgYmUgY29sbGFwc2VkLlxyXG5cdFx0XHRcdC8vIElnbm9yZSBlbWxlZGl0b3ItaWdub3JlIGVsZW1lbnRzIHVubGVzcyB3cmFwcGluZyBzaWJsaW5nc1xyXG5cdFx0XHRcdC8vIFNob3VsZCBzdGlsbCB3cmFwIGJvdGggaWYgd3JhcHBpbmcgc2libGluZ3MuXHJcblx0XHRcdFx0aWYgKHdyYXBwZXIgfHwgbm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSA/XHJcblx0XHRcdFx0XHQvXFxTLy50ZXN0KG5vZGUubm9kZVZhbHVlKSA6ICFkb20uaXMobm9kZSwgJy5lbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRcdGlmICghd3JhcHBlcikge1xyXG5cdFx0XHRcdFx0XHR3cmFwcGVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZSh3cmFwcGVyLCBub2RlKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQod3JhcHBlciwgbm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHdyYXBwZXIgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9LCBmYWxzZSwgdHJ1ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGhhcyBjaGFuZ2VkIGFuZCB0cmlnZ2Vyc1xyXG5cdCAqIHRoZSBzZWxlY3Rpb25jaGFuZ2VkIGV2ZW50IGlmIGl0IGhhcy5cclxuXHQgKlxyXG5cdCAqIEluIGJyb3dzZXJzIG90aGVyIHRoYXQgZG9uJ3Qgc3VwcG9ydCBzZWxlY3Rpb25jaGFuZ2UgZXZlbnQgaXQgd2lsbCBjaGVja1xyXG5cdCAqIGF0IG1vc3Qgb25jZSBldmVyeSAxMDBtcy5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY2hlY2tTZWxlY3Rpb25DaGFuZ2VkID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IGNoZWNrID0gKCkgPT4ge1xyXG5cdFx0XHQvLyBEb24ndCBjcmVhdGUgbmV3IHNlbGVjdGlvbiBpZiB0aGVyZSBpc24ndCBvbmUgKGxpa2UgYWZ0ZXJcclxuXHRcdFx0Ly8gYmx1ciBldmVudCBpbiBpT1MpXHJcblx0XHRcdGlmICh0aGlzRWRpdG9yLnd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkgJiZcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnd5c2l3eWdXaW5kb3cuZ2V0U2VsZWN0aW9uKCkucmFuZ2VDb3VudCA8PSAwKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uID0gbnVsbDtcclxuXHRcdFx0XHQvLyByYW5nZUhlbHBlciBjb3VsZCBiZSBudWxsIGlmIGVkaXRvciB3YXMgZGVzdHJveWVkXHJcblx0XHRcdFx0Ly8gYmVmb3JlIHRoZSB0aW1lb3V0IGhhZCBmaW5pc2hlZFxyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXNFZGl0b3IucmFuZ2VIZWxwZXIgJiYgIXRoaXNFZGl0b3IucmFuZ2VIZWxwZXIuY29tcGFyZSh0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24pKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uID0gdGhpc0VkaXRvci5yYW5nZUhlbHBlci5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoZSBzZWxlY3Rpb24gaXMgaW4gYW4gaW5saW5lIHdyYXAgaXQgaW4gYSBibG9jay5cclxuXHRcdFx0XHQvLyBGaXhlcyAjMzMxXHJcblx0XHRcdFx0aWYgKHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbiAmJiB0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24uY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0XHRsZXQgcGFyZW50ID0gdGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uLnN0YXJ0Q29udGFpbmVyO1xyXG5cdFx0XHRcdFx0bGV0IG9mZnNldCA9IHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbi5zdGFydE9mZnNldDtcclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgaWYgc2VsZWN0aW9uIGlzIHBsYWNlZCBiZWZvcmUvYWZ0ZXIgYW4gZWxlbWVudFxyXG5cdFx0XHRcdFx0aWYgKG9mZnNldCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcclxuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LmNoaWxkTm9kZXNbb2Zmc2V0XTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR3aGlsZSAocGFyZW50ICYmIHBhcmVudC5wYXJlbnROb2RlICE9PSB0aGlzRWRpdG9yLnd5c2l3eWdCb2R5KSB7XHJcblx0XHRcdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci53cmFwSW5saW5lcyh0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCB0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0XHRcdHRoaXNFZGl0b3IucmFuZ2VIZWxwZXIucmVzdG9yZVJhbmdlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20udHJpZ2dlcih0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgJ3NlbGVjdGlvbmNoYW5nZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpc0VkaXRvci5pc1NlbGVjdGlvbkNoZWNrUGVuZGluZyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzRWRpdG9yLmlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBEb24ndCBuZWVkIHRvIGxpbWl0IGNoZWNraW5nIGlmIGJyb3dzZXIgc3VwcG9ydHMgdGhlIFNlbGVjdGlvbiBBUElcclxuXHRcdGlmICgnb25zZWxlY3Rpb25jaGFuZ2UnIGluIHRoaXNFZGl0b3Iud3lzaXd5Z0RvY3VtZW50KSB7XHJcblx0XHRcdGNoZWNrKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZXRUaW1lb3V0KGNoZWNrLCAxMDApO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYW55IGtleSBwcmVzcyBpbiB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVLZXlQcmVzcyA9IChlOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdC8vIEZGIGJ1ZzogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTAxNDk2XHJcblx0XHRpZiAoZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNsb3NlRHJvcERvd24oKTtcclxuXHJcblx0XHQvLyAxMyA9IGVudGVyIGtleVxyXG5cdFx0aWYgKGUud2hpY2ggPT09IDEzKSB7XHJcblx0XHRcdGxldCBMSVNUX1RBR1MgPSAnbGksdWwsb2wnO1xyXG5cclxuXHRcdFx0Ly8gXCJGaXhcIiAoY2x1ZGdlKSBmb3IgYmxvY2tsZXZlbCBlbGVtZW50cyBiZWluZyBkdXBsaWNhdGVkIGluIHNvbWVcclxuXHRcdFx0Ly8gYnJvd3NlcnMgd2hlbiBlbnRlciBpcyBwcmVzc2VkIGluc3RlYWQgb2YgaW5zZXJ0aW5nIGEgbmV3bGluZVxyXG5cdFx0XHRpZiAoIWRvbS5pcyh0aGlzLmN1cnJlbnRCbG9ja05vZGUsIExJU1RfVEFHUykgJiZcclxuXHRcdFx0XHRkb20uaGFzU3R5bGluZyh0aGlzLmN1cnJlbnRCbG9ja05vZGUpKSB7XHJcblxyXG5cdFx0XHRcdGxldCBiciA9IGRvbS5jcmVhdGVFbGVtZW50KCdicicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdFx0dGhpcy5yYW5nZUhlbHBlci5pbnNlcnROb2RlKGJyKTtcclxuXHJcblx0XHRcdFx0Ly8gTGFzdCA8YnI+IG9mIGEgYmxvY2sgd2lsbCBiZSBjb2xsYXBzZWQgIHNvIG5lZWQgdG8gbWFrZSBzdXJlXHJcblx0XHRcdFx0Ly8gdGhlIDxicj4gdGhhdCB3YXMgaW5zZXJ0ZWQgaXNuJ3QgdGhlIGxhc3Qgbm9kZSBvZiBhIGJsb2NrLlxyXG5cdFx0XHRcdGxldCBwYXJlbnQgPSBici5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdGxldCBsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdENoaWxkIGFzIGFueTtcclxuXHJcblx0XHRcdFx0Ly8gU29tZXRpbWVzIGFuIGVtcHR5IG5leHQgbm9kZSBpcyBjcmVhdGVkIGFmdGVyIHRoZSA8YnI+XHJcblx0XHRcdFx0aWYgKGxhc3RDaGlsZCAmJiBsYXN0Q2hpbGQubm9kZVR5cGUgPT09IGRvbS5URVhUX05PREUgJiZcclxuXHRcdFx0XHRcdGxhc3RDaGlsZC5ub2RlVmFsdWUgPT09ICcnKSB7XHJcblx0XHRcdFx0XHRkb20ucmVtb3ZlKGxhc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRsYXN0Q2hpbGQgPSBwYXJlbnQubGFzdENoaWxkO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gSWYgdGhpcyBpcyB0aGUgbGFzdCBCUiBvZiBhIGJsb2NrIGFuZCB0aGUgcHJldmlvdXNcclxuXHRcdFx0XHQvLyBzaWJsaW5nIGlzIGlubGluZSB0aGVuIHdpbGwgbmVlZCBhbiBleHRyYSBCUi4gVGhpc1xyXG5cdFx0XHRcdC8vIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBsYXN0IEJSIG9mIGEgYmxvY2sgd2lsbCBiZVxyXG5cdFx0XHRcdC8vIGNvbGxhcHNlZC4gRml4ZXMgaXNzdWUgIzI0OFxyXG5cdFx0XHRcdGlmICghZG9tLmlzSW5saW5lKHBhcmVudCwgdHJ1ZSkgJiYgbGFzdENoaWxkID09PSBiciAmJlxyXG5cdFx0XHRcdFx0ZG9tLmlzSW5saW5lKGJyLnByZXZpb3VzU2libGluZykpIHtcclxuXHRcdFx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuaW5zZXJ0SFRNTCgnPGJyPicpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgc3VyZSB0aGF0IGlmIHRoZXJlIGlzIGEgY29kZSBvciBxdW90ZSB0YWcgYXQgdGhlXHJcblx0ICogZW5kIG9mIHRoZSBlZGl0b3IsIHRoYXQgdGhlcmUgaXMgYSBuZXcgbGluZSBhZnRlciBpdC5cclxuXHQgKlxyXG5cdCAqIElmIHRoZXJlIHdhc24ndCBhIG5ldyBsaW5lIGF0IHRoZSBlbmQgeW91IHdvdWxkbid0IGJlIGFibGVcclxuXHQgKiB0byBlbnRlciBhbnkgdGV4dCBhZnRlciBhIGNvZGUvcXVvdGUgdGFnXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYXBwZW5kTmV3TGluZSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdC8vIENoZWNrIGFsbCBub2RlcyBpbiByZXZlcnNlIHVudGlsIGVpdGhlciBhZGQgYSBuZXcgbGluZVxyXG5cdFx0Ly8gb3IgcmVhY2ggYSBub24tZW1wdHkgdGV4dG5vZGUgb3IgQlIgYXQgd2hpY2ggcG9pbnQgY2FuXHJcblx0XHQvLyBzdG9wIGNoZWNraW5nLlxyXG5cdFx0ZG9tLnJUcmF2ZXJzZSh0aGlzLnd5c2l3eWdCb2R5LCAobm9kZTogYW55KSA9PiB7XHJcblx0XHRcdC8vIExhc3QgYmxvY2ssIGFkZCBuZXcgbGluZSBhZnRlciBpZiBoYXMgc3R5bGluZ1xyXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLkVMRU1FTlRfTk9ERSAmJlxyXG5cdFx0XHRcdCEvaW5saW5lLy50ZXN0KGRvbS5jc3Mobm9kZSwgJ2Rpc3BsYXknKSkpIHtcclxuXHJcblx0XHRcdFx0Ly8gQWRkIGxpbmUgYnJlYWsgYWZ0ZXIgaWYgaGFzIHN0eWxpbmdcclxuXHRcdFx0XHRpZiAoIWRvbS5pcyhub2RlLCAnLmVtbGVkaXRvci1ubGYnKSAmJiBkb20uaGFzU3R5bGluZyhub2RlKSkge1xyXG5cdFx0XHRcdFx0bGV0IHBhcmFncmFwaCA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIHRoaXMud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdHBhcmFncmFwaC5jbGFzc05hbWUgPSAnZW1sZWRpdG9yLW5sZic7XHJcblx0XHRcdFx0XHRwYXJhZ3JhcGguaW5uZXJIVE1MID0gJzxiciAvPic7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy53eXNpd3lnQm9keSwgcGFyYWdyYXBoKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIExhc3Qgbm9uLWVtcHR5IHRleHQgbm9kZSBvciBsaW5lIGJyZWFrLlxyXG5cdFx0XHQvLyBObyBuZWVkIHRvIGFkZCBsaW5lLWJyZWFrIGFmdGVyIHRoZW1cclxuXHRcdFx0aWYgKChub2RlLm5vZGVUeXBlID09PSAzICYmICEvXlxccyokLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkgfHxcclxuXHRcdFx0XHRkb20uaXMobm9kZSwgJ2JyJykpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgZm9ybSByZXNldCBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVGb3JtUmVzZXQgPSAoKTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLnZhbCh0aGlzLnRleHRhcmVhLnZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIGFueSBtb3VzZWRvd24gcHJlc3MgaW4gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZU1vdXNlRG93biA9ICgpOiB2b2lkID0+IHtcclxuXHRcdHRoaXMuY2xvc2VEcm9wRG93bigpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBhc3NlcyBldmVudHMgb24gdG8gYW55IGhhbmRsZXJzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUV2ZW50ID0gKGU6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0aWYgKHRoaXMucGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHQvLyBTZW5kIGV2ZW50IHRvIGFsbCBwbHVnaW5zXHJcblx0XHRcdHRoaXMucGx1Z2luTWFuYWdlci5jYWxsKGUudHlwZSArICdFdmVudCcsIGUsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNvbnZlcnQgdGhlIGV2ZW50IGludG8gYSBjdXN0b20gZXZlbnQgdG8gc2VuZFxyXG5cdFx0bGV0IG5hbWUgPSAoZS50YXJnZXQgPT09IHRoaXMuc291cmNlRWRpdG9yID8gJ2VtbHNyYycgOiAnZW1sd3lzJykgKyBlLnR5cGUgYXMga2V5b2YgdHlwZW9mIHRoaXMuZXZlbnRIYW5kbGVycztcclxuXHJcblx0XHRpZiAodGhpcy5ldmVudEhhbmRsZXJzW25hbWVdKSB7XHJcblx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1tuYW1lXS5mb3JFYWNoKChmbjogYW55KSA9PiB7XHJcblx0XHRcdFx0Zm4uY2FsbCh0aGlzLCBlKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW1vdGljb25zIGtleXByZXNzIGhhbmRsZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZW1vdGljb25zS2V5UHJlc3MgPSAoZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgcmVwbGFjZWRFbW90aWNvbiwgY2FjaGVQb3MgPSAwLCBlbW90aWNvbnNDYWNoZSA9IHRoaXMuZW1vdGljb25zQ2FjaGUsIGN1ckNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xyXG5cclxuXHRcdC8vIFRPRE86IE1ha2UgY29uZmlndXJhYmxlXHJcblx0XHRpZiAoZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50QmxvY2tOb2RlLCAnY29kZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWVtb3RpY29uc0NhY2hlKSB7XHJcblx0XHRcdGVtb3RpY29uc0NhY2hlID0gW107XHJcblxyXG5cdFx0XHR1dGlscy5lYWNoKHRoaXMuYWxsRW1vdGljb25zLCAoa2V5LCBodG1sKSA9PiB7XHJcblx0XHRcdFx0ZW1vdGljb25zQ2FjaGVbY2FjaGVQb3MrK10gPSBba2V5LCBodG1sXTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlbW90aWNvbnNDYWNoZS5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiBhWzBdLmxlbmd0aCAtIGJbMF0ubGVuZ3RoO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRoaXMuZW1vdGljb25zQ2FjaGUgPSBlbW90aWNvbnNDYWNoZTtcclxuXHRcdFx0dGhpcy5sb25nZXN0RW1vdGljb25Db2RlID1cclxuXHRcdFx0XHRlbW90aWNvbnNDYWNoZVtlbW90aWNvbnNDYWNoZS5sZW5ndGggLSAxXVswXS5sZW5ndGg7XHJcblx0XHR9XHJcblxyXG5cdFx0cmVwbGFjZWRFbW90aWNvbiA9IHRoaXMucmFuZ2VIZWxwZXIucmVwbGFjZUtleXdvcmQoXHJcblx0XHRcdHRoaXMuZW1vdGljb25zQ2FjaGUsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdHRydWUsXHJcblx0XHRcdHRoaXMubG9uZ2VzdEVtb3RpY29uQ29kZSxcclxuXHRcdFx0dGhpcy5vcHRpb25zLmVtb3RpY29uc0NvbXBhdCxcclxuXHRcdFx0Y3VyQ2hhclxyXG5cdFx0KTtcclxuXHJcblx0XHRpZiAocmVwbGFjZWRFbW90aWNvbikge1xyXG5cdFx0XHRpZiAoIXRoaXMub3B0aW9ucy5lbW90aWNvbnNDb21wYXQgfHwgIS9eXFxzJC8udGVzdChjdXJDaGFyKSkge1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2VzIHN1cmUgZW1vdGljb25zIGFyZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2VcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0ZW1vdGljb25zLmNoZWNrV2hpdGVzcGFjZSh0aGlzLmN1cnJlbnRCbG9ja05vZGUsIHRoaXMucmFuZ2VIZWxwZXIpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIGtleWRvd24gZXZlbnQsIHVzZWQgZm9yIHNob3J0Y3V0c1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVLZXlEb3duID0gKGU6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IHNob3J0Y3V0OiBhbnkgPSBbXSxcclxuXHJcblx0XHRcdFNISUZUX0tFWVM6IGFueSA9IHtcclxuXHRcdFx0XHQnYCc6ICd+JyxcclxuXHRcdFx0XHQnMSc6ICchJyxcclxuXHRcdFx0XHQnMic6ICdAJyxcclxuXHRcdFx0XHQnMyc6ICcjJyxcclxuXHRcdFx0XHQnNCc6ICckJyxcclxuXHRcdFx0XHQnNSc6ICclJyxcclxuXHRcdFx0XHQnNic6ICdeJyxcclxuXHRcdFx0XHQnNyc6ICcmJyxcclxuXHRcdFx0XHQnOCc6ICcqJyxcclxuXHRcdFx0XHQnOSc6ICcoJyxcclxuXHRcdFx0XHQnMCc6ICcpJyxcclxuXHRcdFx0XHQnLSc6ICdfJyxcclxuXHRcdFx0XHQnPSc6ICcrJyxcclxuXHRcdFx0XHQnOyc6ICc6ICcsXHJcblx0XHRcdFx0J1xcJyc6ICdcIicsXHJcblx0XHRcdFx0JywnOiAnPCcsXHJcblx0XHRcdFx0Jy4nOiAnPicsXHJcblx0XHRcdFx0Jy8nOiAnPycsXHJcblx0XHRcdFx0J1xcXFwnOiAnfCcsXHJcblx0XHRcdFx0J1snOiAneycsXHJcblx0XHRcdFx0J10nOiAnfSdcclxuXHRcdFx0fSwgU1BFQ0lBTF9LRVlTOiBhbnkgPSB7XHJcblx0XHRcdFx0ODogJ2JhY2tzcGFjZScsXHJcblx0XHRcdFx0OTogJ3RhYicsXHJcblx0XHRcdFx0MTM6ICdlbnRlcicsXHJcblx0XHRcdFx0MTk6ICdwYXVzZScsXHJcblx0XHRcdFx0MjA6ICdjYXBzbG9jaycsXHJcblx0XHRcdFx0Mjc6ICdlc2MnLFxyXG5cdFx0XHRcdDMyOiAnc3BhY2UnLFxyXG5cdFx0XHRcdDMzOiAncGFnZXVwJyxcclxuXHRcdFx0XHQzNDogJ3BhZ2Vkb3duJyxcclxuXHRcdFx0XHQzNTogJ2VuZCcsXHJcblx0XHRcdFx0MzY6ICdob21lJyxcclxuXHRcdFx0XHQzNzogJ2xlZnQnLFxyXG5cdFx0XHRcdDM4OiAndXAnLFxyXG5cdFx0XHRcdDM5OiAncmlnaHQnLFxyXG5cdFx0XHRcdDQwOiAnZG93bicsXHJcblx0XHRcdFx0NDU6ICdpbnNlcnQnLFxyXG5cdFx0XHRcdDQ2OiAnZGVsJyxcclxuXHRcdFx0XHQ5MTogJ3dpbicsXHJcblx0XHRcdFx0OTI6ICd3aW4nLFxyXG5cdFx0XHRcdDkzOiAnc2VsZWN0JyxcclxuXHRcdFx0XHQ5NjogJzAnLFxyXG5cdFx0XHRcdDk3OiAnMScsXHJcblx0XHRcdFx0OTg6ICcyJyxcclxuXHRcdFx0XHQ5OTogJzMnLFxyXG5cdFx0XHRcdDEwMDogJzQnLFxyXG5cdFx0XHRcdDEwMTogJzUnLFxyXG5cdFx0XHRcdDEwMjogJzYnLFxyXG5cdFx0XHRcdDEwMzogJzcnLFxyXG5cdFx0XHRcdDEwNDogJzgnLFxyXG5cdFx0XHRcdDEwNTogJzknLFxyXG5cdFx0XHRcdDEwNjogJyonLFxyXG5cdFx0XHRcdDEwNzogJysnLFxyXG5cdFx0XHRcdDEwOTogJy0nLFxyXG5cdFx0XHRcdDExMDogJy4nLFxyXG5cdFx0XHRcdDExMTogJy8nLFxyXG5cdFx0XHRcdDExMjogJ2YxJyxcclxuXHRcdFx0XHQxMTM6ICdmMicsXHJcblx0XHRcdFx0MTE0OiAnZjMnLFxyXG5cdFx0XHRcdDExNTogJ2Y0JyxcclxuXHRcdFx0XHQxMTY6ICdmNScsXHJcblx0XHRcdFx0MTE3OiAnZjYnLFxyXG5cdFx0XHRcdDExODogJ2Y3JyxcclxuXHRcdFx0XHQxMTk6ICdmOCcsXHJcblx0XHRcdFx0MTIwOiAnZjknLFxyXG5cdFx0XHRcdDEyMTogJ2YxMCcsXHJcblx0XHRcdFx0MTIyOiAnZjExJyxcclxuXHRcdFx0XHQxMjM6ICdmMTInLFxyXG5cdFx0XHRcdDE0NDogJ251bWxvY2snLFxyXG5cdFx0XHRcdDE0NTogJ3Njcm9sbGxvY2snLFxyXG5cdFx0XHRcdDE4NjogJzsnLFxyXG5cdFx0XHRcdDE4NzogJz0nLFxyXG5cdFx0XHRcdDE4ODogJywnLFxyXG5cdFx0XHRcdDE4OTogJy0nLFxyXG5cdFx0XHRcdDE5MDogJy4nLFxyXG5cdFx0XHRcdDE5MTogJy8nLFxyXG5cdFx0XHRcdDE5MjogJ2AnLFxyXG5cdFx0XHRcdDIxOTogJ1snLFxyXG5cdFx0XHRcdDIyMDogJ1xcXFwnLFxyXG5cdFx0XHRcdDIyMTogJ10nLFxyXG5cdFx0XHRcdDIyMjogJ1xcJydcclxuXHRcdFx0fSwgTlVNUEFEX1NISUZUX0tFWVM6IGFueSA9IHtcclxuXHRcdFx0XHQxMDk6ICctJyxcclxuXHRcdFx0XHQxMTA6ICdkZWwnLFxyXG5cdFx0XHRcdDExMTogJy8nLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOSdcclxuXHRcdFx0fSwgd2hpY2ggPSBlLndoaWNoLCBjaGFyYWN0ZXIgPSBTUEVDSUFMX0tFWVNbd2hpY2hdIHx8IFN0cmluZy5mcm9tQ2hhckNvZGUod2hpY2gpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0aWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHtcclxuXHRcdFx0c2hvcnRjdXQucHVzaCgnY3RybCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLmFsdEtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdhbHQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZS5zaGlmdEtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdzaGlmdCcpO1xyXG5cclxuXHRcdFx0aWYgKE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXSkge1xyXG5cdFx0XHRcdGNoYXJhY3RlciA9IE5VTVBBRF9TSElGVF9LRVlTW3doaWNoXTtcclxuXHRcdFx0fSBlbHNlIGlmIChTSElGVF9LRVlTW2NoYXJhY3Rlcl0pIHtcclxuXHRcdFx0XHRjaGFyYWN0ZXIgPSBTSElGVF9LRVlTW2NoYXJhY3Rlcl07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTaGlmdCBpcyAxNiwgY3RybCBpcyAxNyBhbmQgYWx0IGlzIDE4XHJcblx0XHRpZiAoY2hhcmFjdGVyICYmICh3aGljaCA8IDE2IHx8IHdoaWNoID4gMTgpKSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goY2hhcmFjdGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRzaG9ydGN1dCA9IHNob3J0Y3V0LmpvaW4oJysnKTtcclxuXHRcdGlmICh0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnMgJiZcclxuXHRcdFx0dGhpc0VkaXRvci5zaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0XSAmJlxyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdLmNhbGwodGhpc0VkaXRvcikgPT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgYmFja3NwYWNlIGtleSBwcmVzc1xyXG5cdCAqXHJcblx0ICogV2lsbCByZW1vdmUgYmxvY2sgc3R5bGluZyBsaWtlIHF1b3Rlcy9jb2RlIGVjdCBpZiBhdCB0aGUgc3RhcnQuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUJhY2tTcGFjZSA9IChlOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGxldCBub2RlLCBvZmZzZXQsIHJhbmdlLCBwYXJlbnQ7XHJcblxyXG5cdFx0Ly8gOCBpcyB0aGUgYmFja3NwYWNlIGtleVxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlQmxvY2tSZW1vdmUgfHwgZS53aGljaCAhPT0gOCB8fFxyXG5cdFx0XHQhKHJhbmdlID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZFJhbmdlKCkpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XHJcblx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcclxuXHJcblx0XHRpZiAob2Zmc2V0ICE9PSAwIHx8ICEocGFyZW50ID0gdGhpcy5jdXJyZW50U3R5bGVkQmxvY2tOb2RlKCkpIHx8XHJcblx0XHRcdGRvbS5pcyhwYXJlbnQsICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdoaWxlIChub2RlICE9PSBwYXJlbnQpIHtcclxuXHRcdFx0d2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cclxuXHRcdFx0XHQvLyBFdmVyeXRoaW5nIGJ1dCBlbXB0eSB0ZXh0IG5vZGVzIGJlZm9yZSB0aGUgY3Vyc29yXHJcblx0XHRcdFx0Ly8gc2hvdWxkIHByZXZlbnQgdGhlIHN0eWxlIGZyb20gYmVpbmcgcmVtb3ZlZFxyXG5cdFx0XHRcdGlmIChub2RlLm5vZGVUeXBlICE9PSBkb20uVEVYVF9OT0RFIHx8IG5vZGUubm9kZVZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRoZSBiYWNrc3BhY2Ugd2FzIHByZXNzZWQgYXQgdGhlIHN0YXJ0IG9mXHJcblx0XHQvLyB0aGUgY29udGFpbmVyIHNvIGNsZWFyIHRoZSBzdHlsZVxyXG5cdFx0dGhpcy5jbGVhckJsb2NrRm9ybWF0dGluZyhwYXJlbnQpO1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IHN0eWxlZCBibG9jayBub2RlIHRoYXQgY29udGFpbnMgdGhlIGN1cnNvclxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3VycmVudFN0eWxlZEJsb2NrTm9kZSA9ICgpOiBIVE1MRWxlbWVudCA9PiB7XHJcblx0XHRsZXQgYmxvY2s6IGFueSA9IHRoaXMuY3VycmVudEJsb2NrTm9kZTtcclxuXHJcblx0XHR3aGlsZSAoIWRvbS5oYXNTdHlsaW5nKGJsb2NrKSB8fCBkb20uaXNJbmxpbmUoYmxvY2ssIHRydWUpKSB7XHJcblx0XHRcdGlmICghKGJsb2NrID0gYmxvY2sucGFyZW50Tm9kZSkgfHwgZG9tLmlzKGJsb2NrLCAnYm9keScpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGJsb2NrO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyaWdnZXJzIHRoZSB2YWx1ZUNoYW5nZWQgc2lnbmFsIGlmIHRoZXJlIGlzXHJcblx0ICogYSBwbHVnaW4gdGhhdCBoYW5kbGVzIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgcmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCkgaGFzIGFscmVhZHkgYmVlblxyXG5cdCAqIGNhbGxlZCwgdGhlbiBzYXZlUmFuZ2Ugc2hvdWxkIGJlIHNldCB0byBmYWxzZVxyXG5cdCAqIHRvIHByZXZlbnQgdGhlIHJhbmdlIGJlaW5nIHNhdmVkIHR3aWNlLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuNC41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBzYXZlUmFuZ2UgSWYgdG8gY2FsbCByYW5nZUhlbHBlci5zYXZlUmFuZ2UoKS5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFzSGFuZGxlciA9IGZhbHNlO1xyXG5cdHByaXZhdGUgdHJpZ2dlclZhbHVlQ2hhbmdlZCA9IChzYXZlUmFuZ2U/OiBib29sZWFuKTogYW55ID0+IHtcclxuXHJcblx0XHRsZXQgbGFzdFZhbDogc3RyaW5nO1xyXG5cdFx0aWYgKCF0aGlzLnBsdWdpbk1hbmFnZXIgfHxcclxuXHRcdFx0KCF0aGlzLnBsdWdpbk1hbmFnZXIuaGFzSGFuZGxlcigndmFsdWVjaGFuZ2VkRXZlbnQnKSAmJlxyXG5cdFx0XHRcdCF0aGlzLmhhc0hhbmRsZXIpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY3VycmVudEh0bWwsIHNvdXJjZU1vZGUgPSB0aGlzLnNvdXJjZU1vZGUoKSwgaGFzU2VsZWN0aW9uID0gIXNvdXJjZU1vZGUgJiYgdGhpcy5yYW5nZUhlbHBlci5oYXNTZWxlY3Rpb24oKTtcclxuXHJcblx0XHQvLyBDb21wb3NpdGlvbiBlbmQgaXNuJ3QgZ3VhcmFudGVlZCB0byBmaXJlIGJ1dCBtdXN0IGhhdmVcclxuXHRcdC8vIGVuZGVkIHdoZW4gdHJpZ2dlclZhbHVlQ2hhbmdlZCgpIGlzIGNhbGxlZCBzbyByZXNldCBpdFxyXG5cdFx0dGhpcy5pc0NvbXBvc2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIERvbid0IG5lZWQgdG8gc2F2ZSB0aGUgcmFuZ2UgaWYgZW1sZWRpdG9yLXN0YXJ0LW1hcmtlclxyXG5cdFx0Ly8gaXMgcHJlc2VudCBhcyB0aGUgcmFuZ2UgaXMgYWxyZWFkeSBzYXZlZFxyXG5cdFx0c2F2ZVJhbmdlID0gc2F2ZVJhbmdlICE9PSBmYWxzZSAmJlxyXG5cdFx0XHQhdGhpcy53eXNpd3lnRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VtbGVkaXRvci1zdGFydC1tYXJrZXInKTtcclxuXHJcblx0XHQvLyBDbGVhciBhbnkgY3VycmVudCB0aW1lb3V0IGFzIGl0J3Mgbm93IGJlZW4gdHJpZ2dlcmVkXHJcblx0XHRpZiAodGhpcy52YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIpO1xyXG5cdFx0XHR0aGlzLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN1cnJlbnRIdG1sID0gc291cmNlTW9kZSA/IHRoaXMuc291cmNlRWRpdG9yLnZhbHVlIDogdGhpcy53eXNpd3lnQm9keS5pbm5lckhUTUw7XHJcblxyXG5cdFx0Ly8gT25seSB0cmlnZ2VyIGlmIHNvbWV0aGluZyBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cclxuXHRcdGlmIChjdXJyZW50SHRtbCAhPT0gbGFzdFZhbCkge1xyXG5cdFx0XHRsYXN0VmFsID0gY3VycmVudEh0bWw7XHJcblxyXG5cdFx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3ZhbHVlY2hhbmdlZCcsIHtcclxuXHRcdFx0XHRyYXdWYWx1ZTogc291cmNlTW9kZSA/IHRoaXMudmFsKCkgOiBjdXJyZW50SHRtbFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGFzU2VsZWN0aW9uICYmIHNhdmVSYW5nZSkge1xyXG5cdFx0XHR0aGlzLnJhbmdlSGVscGVyLnJlbW92ZU1hcmtlcnMoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEgYmx1ciBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB2YWx1ZUNoYW5nZWRCbHVyID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0aWYgKHRoaXMudmFsdWVDaGFuZ2VkS2V5VXBUaW1lcikge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTaG91bGQgYmUgY2FsbGVkIHdoZW5ldmVyIHRoZXJlIGlzIGEga2V5cHJlc3MgZXZlbnRcclxuXHQgKiBAcGFyYW0gIHtFdmVudH0gZSBUaGUga2V5cHJlc3MgZXZlbnRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdmFsdWVDaGFuZ2VkS2V5VXAgPSAoZTogYW55KTogYW55ID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdGxldCB3aGljaCA9IGUud2hpY2g7XHJcblx0XHRsZXQgbGFzdENoYXI6IGFueSA9IHdoaWNoO1xyXG5cdFx0bGV0IHRyaWdnZXJOZXh0OiBib29sZWFuO1xyXG5cdFx0bGV0IGxhc3RXYXNTcGFjZSA9IChsYXN0Q2hhciA9PT0gMTMgfHwgbGFzdENoYXIgPT09IDMyKTtcclxuXHRcdGxldCBsYXN0V2FzRGVsZXRlID0gKGxhc3RDaGFyID09PSA4IHx8IGxhc3RDaGFyID09PSA0Nik7XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3IuaXNDb21wb3NpbmcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIDEzID0gcmV0dXJuICYgMzIgPSBzcGFjZVxyXG5cdFx0aWYgKHdoaWNoID09PSAxMyB8fCB3aGljaCA9PT0gMzIpIHtcclxuXHRcdFx0aWYgKCFsYXN0V2FzU3BhY2UpIHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gOCA9IGJhY2tzcGFjZSAmIDQ2ID0gZGVsXHJcblx0XHR9IGVsc2UgaWYgKHdoaWNoID09PSA4IHx8IHdoaWNoID09PSA0Nikge1xyXG5cdFx0XHRpZiAoIWxhc3RXYXNEZWxldGUpIHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0cmlnZ2VyTmV4dCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAodHJpZ2dlck5leHQpIHtcclxuXHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdHRyaWdnZXJOZXh0ID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIHByZXZpb3VzIHRpbWVvdXQgYW5kIHNldCBhIG5ldyBvbmUuXHJcblx0XHRjbGVhclRpbWVvdXQodGhpc0VkaXRvci52YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKTtcclxuXHJcblx0XHQvLyBUcmlnZ2VyIHRoZSBldmVudCAxLjVzIGFmdGVyIHRoZSBsYXN0IGtleXByZXNzIGlmIHNwYWNlXHJcblx0XHQvLyBpc24ndCBwcmVzc2VkLiBUaGlzIG1pZ2h0IG5lZWQgdG8gYmUgbG93ZXJlZCwgd2lsbCBuZWVkXHJcblx0XHQvLyB0byBsb29rIGludG8gd2hhdCB0aGUgc2xvd2VzdCBhdmVyYWdlIENoYXJzIFBlciBNaW4gaXMuXHJcblx0XHR0aGlzRWRpdG9yLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0aWYgKCF0aGlzRWRpdG9yLmlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHRcdH1cclxuXHRcdH0sIDE1MDApO1xyXG5cdH07XHJcblxyXG5cdHByaXZhdGUgaGFuZGxlQ29tcG9zaXRpb24gPSAoZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLmlzQ29tcG9zaW5nID0gL3N0YXJ0L2kudGVzdChlLnR5cGUpO1xyXG5cclxuXHRcdGlmICghdGhpcy5pc0NvbXBvc2luZykge1xyXG5cdFx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRwcml2YXRlIGF1dG9VcGRhdGUgPSAoKTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLnNldFRleHRhcmVhVmFsdWUoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBPcHRpb25zIGZvciB0aGlzIGVkaXRvciBpbnN0YW5jZVxyXG5cdCAqIEBuYW1lIGVkaXRvck9wdGlvbnNcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb3B0aW9uczogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBTYW5pdGl6ZSBIVE1MIHRvIGF2b2lkIFhTU1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2FuaXRpemUgPSAoaHRtbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgc3RyaW5nKTogc3RyaW5nID0+IHtcclxuXHRcdGNvbnN0IGFsbG93ZWRUYWdzID0gWydpZnJhbWUnXS5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRUYWdzKTtcclxuXHRcdGNvbnN0IGFsbG93ZWRBdHRycyA9IFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddXHJcblx0XHRcdC5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kb21QdXJpZnkuc2FuaXRpemUoaHRtbCwge1xyXG5cdFx0XHRBRERfVEFHUzogYWxsb3dlZFRhZ3MsXHJcblx0XHRcdEFERF9BVFRSOiBhbGxvd2VkQXR0cnNcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgcGFzdGVkIGRhdGEsIGZpbHRlcnMgaXQgYW5kIHRoZW4gaW5zZXJ0cyBpdC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVQYXN0ZURhdGEgPSAoZGF0YTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgcGFzdGVBcmVhID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlUmF3JywgZGF0YSk7XHJcblx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3Bhc3RlcmF3JywgZGF0YSk7XHJcblxyXG5cdFx0aWYgKGRhdGEuaHRtbCkge1xyXG5cdFx0XHQvLyBTYW5pdGl6ZSBhZ2FpbiBpbiBjYXNlIHBsdWdpbnMgbW9kaWZpZWQgdGhlIEhUTUxcclxuXHRcdFx0cGFzdGVBcmVhLmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUoZGF0YS5odG1sKTtcclxuXHJcblx0XHRcdC8vIGZpeCBhbnkgaW52YWxpZCBuZXN0aW5nXHJcblx0XHRcdGRvbS5maXhOZXN0aW5nKHBhc3RlQXJlYSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXN0ZUFyZWEuaW5uZXJIVE1MID0gZXNjYXBlLmVudGl0aWVzKGRhdGEudGV4dCB8fCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBhc3RlOiBhbnkgPSB7XHJcblx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdHBhc3RlLnZhbCA9IHRoaXMuZm9ybWF0XHJcblx0XHRcdFx0LmZyYWdtZW50VG9Tb3VyY2UocGFzdGUudmFsLCB0aGlzLnd5c2l3eWdEb2N1bWVudCwgdGhpcy5jdXJyZW50Tm9kZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlJywgcGFzdGUpO1xyXG5cdFx0ZG9tLnRyaWdnZXIodGhpcy5lZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRwYXN0ZS52YWwgPSB0aGlzLmZvcm1hdFxyXG5cdFx0XHRcdC5mcmFnbWVudFRvSHRtbChwYXN0ZS52YWwsIHRoaXMuY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZUh0bWwnLCBwYXN0ZSk7XHJcblxyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMucmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChwYXN0ZS52YWwsIG51bGwsIHRydWUpO1xyXG5cdFx0ZG9tLm1lcmdlKHBhcmVudCk7XHJcblx0fTtcclxuXHJcblx0Ly8jZW5kcmVnaW9uXHJcblxyXG5cclxuXHJcblxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBQbHVnaW5NYW5hZ2VyIHtcclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKHRoaXNPYmo6IGFueSkge1xyXG5cclxuXHRcdFBsdWdpbk1hbmFnZXIucGx1Z2lucyA9IHt9O1xyXG5cdFx0LyoqXHJcblx0XHQgKiBBcnJheSBvZiBhbGwgY3VycmVudGx5IHJlZ2lzdGVyZWQgcGx1Z2luc1xyXG5cdFx0ICpcclxuXHRcdCAqIEB0eXBlIHtBcnJheX1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciByZWdpc3RlcmVkUGx1Z2luczogYW55W10gPSBbXTtcclxuXHJcblxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2hhbmdlcyBhIHNpZ25hbHMgbmFtZSBmcm9tIFwibmFtZVwiIGludG8gXCJzaWduYWxOYW1lXCIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBzaWduYWxcclxuXHRcdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBmb3JtYXRTaWduYWxOYW1lID0gZnVuY3Rpb24gKHNpZ25hbDogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdFx0cmV0dXJuICdzaWduYWwnICsgc2lnbmFsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc2lnbmFsLnNsaWNlKDEpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENhbGxzIGhhbmRsZXJzIGZvciBhIHNpZ25hbFxyXG5cdFx0ICpcclxuXHRcdCAqIEBzZWUgY2FsbCgpXHJcblx0XHQgKiBAc2VlIGNhbGxPbmx5Rmlyc3QoKVxyXG5cdFx0ICogQHBhcmFtICB7QXJyYXl9ICAgYXJnc1xyXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gcmV0dXJuQXRGaXJzdFxyXG5cdFx0ICogQHJldHVybiB7Kn1cclxuXHRcdCAqIEBwcml2YXRlXHJcblx0XHQgKi9cclxuXHRcdHZhciBjYWxsSGFuZGxlcnMgPSBmdW5jdGlvbiAoYXJnczogSUFyZ3VtZW50cywgcmV0dXJuQXRGaXJzdDogYm9vbGVhbik6IGFueSB7XHJcblx0XHRcdGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3MpO1xyXG5cclxuXHRcdFx0dmFyIGlkeCwgcmV0LCBzaWduYWwgPSBmb3JtYXRTaWduYWxOYW1lKEFycmF5LmZyb20oYXJncykuc2hpZnQoKSk7XHJcblxyXG5cdFx0XHRmb3IgKGlkeCA9IDA7IGlkeCA8IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDsgaWR4KyspIHtcclxuXHRcdFx0XHRpZiAoc2lnbmFsIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF0pIHtcclxuXHRcdFx0XHRcdHJldCA9IHJlZ2lzdGVyZWRQbHVnaW5zW2lkeF1bc2lnbmFsXS5hcHBseSh0aGlzT2JqLCBhcmdzKTtcclxuXHJcblx0XHRcdFx0XHRpZiAocmV0dXJuQXRGaXJzdCkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmV0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENhbGxzIGFsbCBoYW5kbGVycyBmb3IgdGhlIHBhc3NlZCBzaWduYWxcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIHNpZ25hbFxyXG5cdFx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNhbGxcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNhbGwgPSBmdW5jdGlvbiAoLi4uYXJnczogYW55KTogdm9pZCB7XHJcblx0XHRcdGNhbGxIYW5kbGVycyhhcmdzLCBmYWxzZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2FsbHMgdGhlIGZpcnN0IGhhbmRsZXIgZm9yIGEgc2lnbmFsLCBhbmQgcmV0dXJucyB0aGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIHNpZ25hbFxyXG5cdFx0ICogQHBhcmFtICB7Li4uc3RyaW5nfSBhcmdzXHJcblx0XHQgKiBAcmV0dXJuIHsqfSBUaGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIGhhbmRsZXJcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgY2FsbE9ubHlGaXJzdFxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2FsbE9ubHlGaXJzdCA9IGZ1bmN0aW9uICgpOiBhbnkge1xyXG5cdFx0XHRyZXR1cm4gY2FsbEhhbmRsZXJzKGFyZ3VtZW50cywgdHJ1ZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2hlY2tzIGlmIGEgc2lnbmFsIGhhcyBhIGhhbmRsZXJcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHNpZ25hbFxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaGFzSGFuZGxlclxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaGFzSGFuZGxlciA9IGZ1bmN0aW9uIChzaWduYWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgaSA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcclxuXHRcdFx0c2lnbmFsID0gZm9ybWF0U2lnbmFsTmFtZShzaWduYWwpO1xyXG5cclxuXHRcdFx0d2hpbGUgKGktLSkge1xyXG5cdFx0XHRcdGlmIChzaWduYWwgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaV0pIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgcGx1Z2luIGV4aXN0cyBpbiBwbHVnaW5zXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGV4aXN0c1xyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZXhpc3RzID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmIChwbHVnaW4gaW4gUGx1Z2luTWFuYWdlci5wbHVnaW5zKSB7XHJcblx0XHRcdFx0bGV0IHBsdWdpbk9iajoge30gPSBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNbcGx1Z2luIGFzIGtleW9mIHR5cGVvZiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnNdO1xyXG5cdFx0XHRcdHJldHVybiB0eXBlb2YgcGx1Z2luT2JqID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBwbHVnaW5PYmoucHJvdG90eXBlID09PSAnb2JqZWN0JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiB0aGUgcGFzc2VkIHBsdWdpbiBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtzdHJpbmd9IHBsdWdpblxyXG5cdFx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaXNSZWdpc3RlcmVkXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pc1JlZ2lzdGVyZWQgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKHRoaXMuZXhpc3RzKHBsdWdpbikpIHtcclxuXHRcdFx0XHR2YXIgaWR4ID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAoaWR4LS0pIHtcclxuXHRcdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1tpZHhdIGluc3RhbmNlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZWdpc3RlcnMgYSBwbHVnaW4gdG8gcmVjZWl2ZSBzaWduYWxzXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHJlZ2lzdGVyXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZWdpc3RlciA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoIXRoaXMuZXhpc3RzKHBsdWdpbikgfHwgdGhpcy5pc1JlZ2lzdGVyZWQocGx1Z2luKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHBsdWdpbk9iaiA9IG5ldyB0aGlzLnBsdWdpbnNbcGx1Z2luXSgpO1xyXG5cdFx0XHRyZWdpc3RlcmVkUGx1Z2lucy5wdXNoKHBsdWdpbik7XHJcblxyXG5cdFx0XHRpZiAoJ2luaXQnIGluIHRoaXMucGx1Z2luKSB7XHJcblx0XHRcdFx0cGx1Z2luT2JqLmluaXQuY2FsbCh0aGlzT2JqKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRGVyZWdpc3RlcnMgYSBwbHVnaW4uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGRlcmVnaXN0ZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmRlcmVnaXN0ZXIgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIHJlbW92ZWRQbHVnaW4sIHBsdWdpbklkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aCwgcmVtb3ZlZCA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYgKCF0aGlzLmlzUmVnaXN0ZXJlZChwbHVnaW4pKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlbW92ZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHdoaWxlIChwbHVnaW5JZHgtLSkge1xyXG5cdFx0XHRcdGlmIChyZWdpc3RlcmVkUGx1Z2luc1twbHVnaW5JZHhdIGluc3RhbmNlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXSkge1xyXG5cdFx0XHRcdFx0cmVtb3ZlZFBsdWdpbiA9IHJlZ2lzdGVyZWRQbHVnaW5zLnNwbGljZShwbHVnaW5JZHgsIDEpWzBdO1xyXG5cdFx0XHRcdFx0cmVtb3ZlZCA9IHRydWU7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCdkZXN0cm95JyBpbiByZW1vdmVkUGx1Z2luKSB7XHJcblx0XHRcdFx0XHRcdHJlbW92ZWRQbHVnaW4uZGVzdHJveS5jYWxsKHRoaXNPYmopO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJlbW92ZWQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xlYXJzIGFsbCBwbHVnaW5zIGFuZCByZW1vdmVzIHRoZSBvd25lciByZWZlcmVuY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQ2FsbGluZyBhbnkgZnVuY3Rpb25zIG9uIHRoaXMgb2JqZWN0IGFmdGVyIGNhbGxpbmdcclxuXHRcdCAqIGRlc3Ryb3kgd2lsbCBjYXVzZSBhIEpTIGVycm9yLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBuYW1lIGRlc3Ryb3lcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpID0gcmVnaXN0ZXJlZFBsdWdpbnMubGVuZ3RoO1xyXG5cclxuXHRcdFx0d2hpbGUgKGktLSkge1xyXG5cdFx0XHRcdGlmICgnZGVzdHJveScgaW4gcmVnaXN0ZXJlZFBsdWdpbnNbaV0pIHtcclxuXHRcdFx0XHRcdHJlZ2lzdGVyZWRQbHVnaW5zW2ldLmRlc3Ryb3kuY2FsbCh0aGlzT2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlZ2lzdGVyZWRQbHVnaW5zID0gW107XHJcblx0XHRcdHRoaXNPYmogPSBudWxsO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwbHVnaW5zOiB7fTtcclxuXHRjYWxsOiAoLi4uYXJnOiBhbnkpID0+IHZvaWQ7XHJcblx0Y2FsbE9ubHlGaXJzdDogKCkgPT4gYW55O1xyXG5cdGhhc0hhbmRsZXI6IChzaWduYWw6IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRleGlzdHM6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRpc1JlZ2lzdGVyZWQ6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRyZWdpc3RlcjogKHBsdWdpbjogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdGRlcmVnaXN0ZXI6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRkZXN0cm95OiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xyXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuXHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgdGV4dCwgc3RhcnQvZW5kIG5vZGUgYW5kIG9mZnNldCBmb3JcclxuICogbGVuZ3RoIGNoYXJzIGxlZnQgb3IgcmlnaHQgb2YgdGhlIHBhc3NlZCBub2RlXHJcbiAqIGF0IHRoZSBzcGVjaWZpZWQgb2Zmc2V0LlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtOb2RlfSAgbm9kZVxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBvZmZzZXRcclxuICogQHBhcmFtICB7Ym9vbGVhbn0gaXNMZWZ0XHJcbiAqIEBwYXJhbSAge251bWJlcn0gIGxlbmd0aFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52YXIgb3V0ZXJUZXh0ID0gZnVuY3Rpb24gKHJhbmdlOiBhbnksIGlzTGVmdDogYm9vbGVhbiwgbGVuZ3RoOiBudW1iZXIpOiBhbnkge1xyXG5cdHZhciBub2RlVmFsdWUsIHJlbWFpbmluZywgc3RhcnQsIGVuZCwgbm9kZSxcclxuXHRcdHRleHQgPSAnJyxcclxuXHRcdG5leHQgPSByYW5nZS5zdGFydENvbnRhaW5lcixcclxuXHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cclxuXHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgbm9kZSBpcyBhIHBhcmFncmFwaCBhbmQgb2Zmc2V0XHJcblx0Ly8gcmVmZXJzIHRvIHRoZSBpbmRleCBvZiBhIHRleHQgbm9kZS5cclxuXHQvLyAzID0gdGV4dCBub2RlXHJcblx0aWYgKG5leHQgJiYgbmV4dC5ub2RlVHlwZSAhPT0gMykge1xyXG5cdFx0bmV4dCA9IG5leHQuY2hpbGROb2Rlc1tvZmZzZXRdO1xyXG5cdFx0b2Zmc2V0ID0gMDtcclxuXHR9XHJcblxyXG5cdHN0YXJ0ID0gZW5kID0gb2Zmc2V0O1xyXG5cclxuXHR3aGlsZSAobGVuZ3RoID4gdGV4dC5sZW5ndGggJiYgbmV4dCAmJiBuZXh0Lm5vZGVUeXBlID09PSAzKSB7XHJcblx0XHRub2RlVmFsdWUgPSBuZXh0Lm5vZGVWYWx1ZTtcclxuXHRcdHJlbWFpbmluZyA9IGxlbmd0aCAtIHRleHQubGVuZ3RoO1xyXG5cclxuXHRcdC8vIElmIG5vdCB0aGUgZmlyc3Qgbm9kZSwgc3RhcnQgYW5kIGVuZCBzaG91bGQgYmUgYXQgdGhlaXJcclxuXHRcdC8vIG1heCB2YWx1ZXMgYXMgd2lsbCBiZSB1cGRhdGVkIHdoZW4gZ2V0dGluZyB0aGUgdGV4dFxyXG5cdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0ZW5kID0gbm9kZVZhbHVlLmxlbmd0aDtcclxuXHRcdFx0c3RhcnQgPSAwO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0O1xyXG5cclxuXHRcdGlmIChpc0xlZnQpIHtcclxuXHRcdFx0c3RhcnQgPSBNYXRoLm1heChlbmQgLSByZW1haW5pbmcsIDApO1xyXG5cdFx0XHRvZmZzZXQgPSBzdGFydDtcclxuXHJcblx0XHRcdHRleHQgPSBub2RlVmFsdWUuc3Vic3RyKHN0YXJ0LCBlbmQgLSBzdGFydCkgKyB0ZXh0O1xyXG5cdFx0XHRuZXh0ID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbmQgPSBNYXRoLm1pbihyZW1haW5pbmcsIG5vZGVWYWx1ZS5sZW5ndGgpO1xyXG5cdFx0XHRvZmZzZXQgPSBzdGFydCArIGVuZDtcclxuXHJcblx0XHRcdHRleHQgKz0gbm9kZVZhbHVlLnN1YnN0cihzdGFydCwgZW5kKTtcclxuXHRcdFx0bmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0bm9kZTogbm9kZSB8fCBuZXh0LFxyXG5cdFx0b2Zmc2V0OiBvZmZzZXQsXHJcblx0XHR0ZXh0OiB0ZXh0XHJcblx0fTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSYW5nZSBoZWxwZXJcclxuICpcclxuICogQGNsYXNzIFJhbmdlSGVscGVyXHJcbiAqIEBuYW1lIFJhbmdlSGVscGVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmFuZ2VIZWxwZXIge1xyXG5cclxuXHRpbnNlcnRIVE1MOiAoaHRtbDogc3RyaW5nLCBlbmRIVE1MPzogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cdGluc2VydE5vZGU6IChub2RlPzogYW55LCBlbmROb2RlPzogYW55KSA9PiBmYWxzZSB8IHVuZGVmaW5lZDtcclxuXHRjbG9uZVNlbGVjdGVkOiAoKSA9PiBSYW5nZTtcclxuXHRzZWxlY3RlZFJhbmdlOiAoKSA9PiBSYW5nZTtcclxuXHRoYXNTZWxlY3Rpb246ICgpID0+IGJvb2xlYW47XHJcblx0c2VsZWN0ZWRIdG1sOiAoKSA9PiBzdHJpbmc7XHJcblx0cGFyZW50Tm9kZTogKCkgPT4gSFRNTEVsZW1lbnQ7XHJcblx0Z2V0Rmlyc3RCbG9ja1BhcmVudDogKG5vZGU/OiBhbnkpID0+IGFueTtcclxuXHRpbnNlcnROb2RlQXQ6IChzdGFydDogYW55LCBub2RlOiBhbnkpID0+IGJvb2xlYW47XHJcblx0aW5zZXJ0TWFya2VyczogKCkgPT4gdm9pZDtcclxuXHRnZXRNYXJrZXI6IChpZDogYW55KSA9PiBhbnk7XHJcblx0cmVtb3ZlTWFya2VyOiAoaWQ6IGFueSkgPT4gdm9pZDtcclxuXHRyZW1vdmVNYXJrZXJzOiAoKSA9PiB2b2lkO1xyXG5cdHNhdmVSYW5nZTogKCkgPT4gdm9pZDtcclxuXHRzZWxlY3RSYW5nZTogKHJhbmdlOiBhbnkpID0+IHZvaWQ7XHJcblx0cmVzdG9yZVJhbmdlOiAoKSA9PiBib29sZWFuO1xyXG5cdHNlbGVjdE91dGVyVGV4dDogKGxlZnQ6IGFueSwgcmlnaHQ6IGFueSkgPT4gYm9vbGVhbjtcclxuXHRnZXRPdXRlclRleHQ6IChiZWZvcmU6IGFueSwgbGVuZ3RoOiBhbnkpID0+IGFueTtcclxuXHRyZXBsYWNlS2V5d29yZDogKGtleXdvcmRzOiBhbnksIGluY2x1ZGVBZnRlcjogYW55LCBrZXl3b3Jkc1NvcnRlZDogYW55LCBsb25nZXN0S2V5d29yZDogYW55LCByZXF1aXJlV2hpdGVzcGFjZTogYW55LCBrZXlwcmVzc0NoYXI6IGFueSkgPT4gYm9vbGVhbjtcclxuXHRjb21wYXJlOiAocm5nQT86IGFueSwgcm5nQj86IGFueSkgPT4gYm9vbGVhbjtcclxuXHRjbGVhcjogKCkgPT4gdm9pZDtcclxuXHJcblx0Y29uc3RydWN0b3Iod2luOiBhbnksIGQ6IG51bGwsIHNhbml0aXplOiB7IChodG1sOiBzdHJpbmcpOiBzdHJpbmc7IChhcmcwOiBhbnkpOiBzdHJpbmc7IH0pIHtcclxuXHRcdGxldCBfY3JlYXRlTWFya2VyOiBhbnk7XHJcblx0XHRsZXQgX3ByZXBhcmVJbnB1dDogYW55O1xyXG5cdFx0bGV0IGRvYzogYW55ID0gZCB8fCB3aW4uY29udGVudERvY3VtZW50IHx8IHdpbi5kb2N1bWVudDtcclxuXHRcdGxldCBzdGFydE1hcmtlcjogc3RyaW5nID0gJ2VtbGVkaXRvci1zdGFydC1tYXJrZXInO1xyXG5cdFx0bGV0IGVuZE1hcmtlcjogc3RyaW5nID0gJ2VtbGVkaXRvci1lbmQtbWFya2VyJztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEluc2VydHMgSFRNTCBpbnRvIHRoZSBjdXJyZW50IHJhbmdlIHJlcGxhY2luZyBhbnkgc2VsZWN0ZWRcclxuXHRcdCAqIHRleHQuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgZW5kSFRNTCBpcyBzcGVjaWZpZWQgdGhlIHNlbGVjdGVkIGNvbnRlbnRzIHdpbGwgYmUgcHV0IGJldHdlZW5cclxuXHRcdCAqIGh0bWwgYW5kIGVuZEhUTUwuIElmIHRoZXJlIGlzIG5vdGhpbmcgc2VsZWN0ZWQgaHRtbCBhbmQgZW5kSFRNTCBhcmVcclxuXHRcdCAqIGp1c3QgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kSFRNTF1cclxuXHRcdCAqIEByZXR1cm4gRmFsc2Ugb24gZmFpbFxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnRIVE1MXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0SFRNTCA9IGZ1bmN0aW9uIChodG1sOiBzdHJpbmcsIGVuZEhUTUw/OiBzdHJpbmcpIHtcclxuXHRcdFx0dmFyIG5vZGUsIGRpdiwgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlbmRIVE1MKSB7XHJcblx0XHRcdFx0aHRtbCArPSB0aGlzLnNlbGVjdGVkSHRtbCgpICsgZW5kSFRNTDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0bm9kZSA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblx0XHRcdGRpdi5pbm5lckhUTUwgPSBzYW5pdGl6ZShodG1sKTtcclxuXHJcblx0XHRcdHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGxldCBkaXZGaXJzdENoaWxkID0gZGl2LmZpcnN0Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKG5vZGUsIGRpdkZpcnN0Q2hpbGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmluc2VydE5vZGUobm9kZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0KiBSZW1vdmVzIHRoZSBzdGFydC9lbmQgbWFya2Vyc1xyXG5cdFx0KlxyXG5cdFx0KiBAZnVuY3Rpb25cclxuXHRcdCogQG5hbWUgcmVtb3ZlTWFya2Vyc1xyXG5cdFx0KiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcihzdGFydE1hcmtlcik7XHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VyKGVuZE1hcmtlcik7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNhbWUgYXMgaW5zZXJ0SFRNTCBleGNlcHQgd2l0aCBET00gbm9kZXMgaW5zdGVhZFxyXG5cdFx0ICpcclxuXHRcdCAqIDxzdHJvbmc+V2FybmluZzo8L3N0cm9uZz4gdGhlIG5vZGVzIG11c3QgYmVsb25nIHRvIHRoZVxyXG5cdFx0ICogZG9jdW1lbnQgdGhleSBhcmUgYmVpbmcgaW5zZXJ0ZWQgaW50by4gU29tZSBicm93c2Vyc1xyXG5cdFx0ICogd2lsbCB0aHJvdyBleGNlcHRpb25zIGlmIHRoZXkgZG9uJ3QuXHJcblx0XHQgKlxyXG5cdFx0ICogUmV0dXJucyBib29sZWFuIGZhbHNlIG9uIGZhaWxcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuXHRcdCAqIEBwYXJhbSB7Tm9kZX0gZW5kTm9kZVxyXG5cdFx0ICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnROb2RlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0Tm9kZSA9IGZ1bmN0aW9uIChub2RlPzogTm9kZSwgZW5kTm9kZT86IE5vZGUpOiBmYWxzZSB8IHVuZGVmaW5lZCB7XHJcblx0XHRcdGxldCBmaXJzdCwgbGFzdCwgaW5wdXQgPSBfcHJlcGFyZUlucHV0KG5vZGUsIGVuZE5vZGUpLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0bGV0IGVtcHR5Tm9kZXM6IGFueSA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKCFpbnB1dCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlSWZFbXB0eShub2RlOiBhbnkpIHtcclxuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBlbXB0eSBub2RlIGlmIGl0IHdhc24ndCBhbHJlYWR5IGVtcHR5XHJcblx0XHRcdFx0aWYgKG5vZGUgJiYgZG9tLmlzRW1wdHkobm9kZSkgJiYgZW1wdHlOb2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyYW5nZS5zdGFydENvbnRhaW5lciAhPT0gcmFuZ2UuZW5kQ29udGFpbmVyKSB7XHJcblx0XHRcdFx0dXRpbHMuZWFjaChwYXJlbnQuY2hpbGROb2RlcywgZnVuY3Rpb24gKF8sIG5vZGUpIHtcclxuXHRcdFx0XHRcdGlmIChkb20uaXNFbXB0eShub2RlKSkge1xyXG5cdFx0XHRcdFx0XHRlbXB0eU5vZGVzLnB1c2gobm9kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGZpcnN0ID0gaW5wdXQuZmlyc3RDaGlsZDtcclxuXHRcdFx0XHRsYXN0ID0gaW5wdXQubGFzdENoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xyXG5cclxuXHRcdFx0Ly8gRkYgYWxsb3dzIDxiciAvPiB0byBiZSBzZWxlY3RlZCBidXQgaW5zZXJ0aW5nIGEgbm9kZVxyXG5cdFx0XHQvLyBpbnRvIDxiciAvPiB3aWxsIGNhdXNlIGl0IG5vdCB0byBiZSBkaXNwbGF5ZWQgc28gbXVzdFxyXG5cdFx0XHQvLyBpbnNlcnQgYmVmb3JlIHRoZSA8YnIgLz4gaW4gRkYuXHJcblx0XHRcdC8vIDMgPSBUZXh0Tm9kZVxyXG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMyAmJiAhZG9tLmNhbkhhdmVDaGlsZHJlbihwYXJlbnQpKSB7XHJcblx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShpbnB1dCwgcGFyZW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyYW5nZS5pbnNlcnROb2RlKGlucHV0KTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgYSBub2RlIHdhcyBzcGxpdCBvciBpdHMgY29udGVudHMgZGVsZXRlZCwgcmVtb3ZlIGFueSByZXN1bHRpbmdcclxuXHRcdFx0XHQvLyBlbXB0eSB0YWdzLiBGb3IgZXhhbXBsZTpcclxuXHRcdFx0XHQvLyA8cD58dGVzdDwvcD48ZGl2PnRlc3R8PC9kaXY+XHJcblx0XHRcdFx0Ly8gV2hlbiBkZWxldGVDb250ZW50cyBjb3VsZCBiZWNvbWU6XHJcblx0XHRcdFx0Ly8gPHA+PC9wPnw8ZGl2PjwvZGl2PlxyXG5cdFx0XHRcdC8vIFNvIHJlbW92ZSB0aGUgZW1wdHkgb25lc1xyXG5cdFx0XHRcdHJlbW92ZUlmRW1wdHkoZmlyc3QgJiYgZmlyc3QucHJldmlvdXNTaWJsaW5nKTtcclxuXHRcdFx0XHRyZW1vdmVJZkVtcHR5KGxhc3QgJiYgbGFzdC5uZXh0U2libGluZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucmVzdG9yZVJhbmdlKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xvbmVzIHRoZSBzZWxlY3RlZCBSYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge1JhbmdlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjbG9uZVNlbGVjdGVkXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2xvbmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpOiBSYW5nZSB7XHJcblx0XHRcdHZhciByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKHJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJhbmdlLmNsb25lUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHNlbGVjdGVkIFJhbmdlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7UmFuZ2V9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdGVkUmFuZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zZWxlY3RlZFJhbmdlID0gZnVuY3Rpb24gKCk6IFJhbmdlIHtcclxuXHRcdFx0dmFyIHJhbmdlLCBmaXJzdENoaWxkLCBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAoIXNlbCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gV2hlbiBjcmVhdGluZyBhIG5ldyByYW5nZSwgc2V0IHRoZSBzdGFydCB0byB0aGUgZmlyc3QgY2hpbGRcclxuXHRcdFx0Ly8gZWxlbWVudCBvZiB0aGUgYm9keSBlbGVtZW50IHRvIGF2b2lkIGVycm9ycyBpbiBGRi5cclxuXHRcdFx0aWYgKHNlbC5yYW5nZUNvdW50IDw9IDApIHtcclxuXHRcdFx0XHRmaXJzdENoaWxkID0gZG9jLmJvZHk7XHJcblx0XHRcdFx0d2hpbGUgKGZpcnN0Q2hpbGQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0Zmlyc3RDaGlsZCA9IGZpcnN0Q2hpbGQuZmlyc3RDaGlsZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdFx0Ly8gTXVzdCBiZSBzZXRTdGFydEJlZm9yZSBvdGhlcndpc2UgaXQgY2FuIGNhdXNlIGluZmluaXRlXHJcblx0XHRcdFx0Ly8gbG9vcHMgd2l0aCBsaXN0cyBpbiBXZWJLaXQuIFNlZSBpc3N1ZSA0NDJcclxuXHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShmaXJzdENoaWxkKTtcclxuXHJcblx0XHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbC5yYW5nZUNvdW50ID4gMCkge1xyXG5cdFx0XHRcdHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByYW5nZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGhhc1NlbGVjdGlvblxyXG5cdFx0ICogQHNpbmNlIDEuNC40XHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaGFzU2VsZWN0aW9uID0gZnVuY3Rpb24gKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlbCAmJiBzZWwucmFuZ2VDb3VudCA+IDA7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIEhUTUxcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdGVkSHRtbFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdGVkSHRtbCA9IGZ1bmN0aW9uICgpOiBzdHJpbmcge1xyXG5cdFx0XHR2YXIgZGl2LCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKHJhbmdlKSB7XHJcblx0XHRcdFx0ZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHBhcmVudCBub2RlIG9mIHRoZSBzZWxlY3RlZCBjb250ZW50cyBpbiB0aGUgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcGFyZW50Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnBhcmVudE5vZGUgPSBmdW5jdGlvbiAoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcclxuXHRcdCAqIGNvbnRlbnRzIG9mIHRoZSByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcclxuXHRcdCAqIGNvbnRlbnRzIG9mIHRoZSByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IFtuXSBUaGUgZWxlbWVudCB0byBnZXQgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBmcm9tXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudF4yXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRGaXJzdEJsb2NrUGFyZW50ID0gZnVuY3Rpb24gKG5vZGU/OiBhbnkpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRcdHZhciBmdW5jID0gZnVuY3Rpb24gKGVsbTogYW55KTogYW55IHtcclxuXHRcdFx0XHRpZiAoIWRvbS5pc0lubGluZShlbG0sIHRydWUpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZWxtO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWxtID0gZWxtID8gZWxtLnBhcmVudE5vZGUgOiBudWxsO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZWxtID8gZnVuYyhlbG0pIDogZWxtO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmMobm9kZSB8fCB0aGlzLnBhcmVudE5vZGUoKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBhIG5vZGUgYXQgZWl0aGVyIHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtCb29sfSBzdGFydFxyXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBub2RlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydE5vZGVBdFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmluc2VydE5vZGVBdCA9IGZ1bmN0aW9uIChzdGFydDogYm9vbGVhbiwgbm9kZTogTm9kZSkge1xyXG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCksIHJhbmdlID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShzdGFydCk7XHJcblx0XHRcdHJhbmdlLmluc2VydE5vZGUobm9kZSk7XHJcblxyXG5cdFx0XHQvLyBSZXNlbGVjdCB0aGUgY3VycmVudCByYW5nZS5cclxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBDaHJvbWUgbG9zaW5nIHRoZSBzZWxlY3Rpb24uIElzc3VlIzgyXHJcblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UoY3VycmVudFJhbmdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIHN0YXJ0L2VuZCBtYXJrZXJzIGZvciB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHJlc3RvcmVSYW5nZSB0byByZS1zZWxlY3QgdGhlXHJcblx0XHQgKiByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydE1hcmtlcnNcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pbnNlcnRNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRcdHZhciBzdGFydE5vZGUgPSBfY3JlYXRlTWFya2VyKHN0YXJ0TWFya2VyKTtcclxuXHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0XHR0aGlzLmluc2VydE5vZGVBdCh0cnVlLCBzdGFydE5vZGUpO1xyXG5cclxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBlbmQgbWFya2VyIHNvbWV0aW1lcyBiZWluZyBwbGFjZWQgYmVmb3JlXHJcblx0XHRcdC8vIHRoZSBzdGFydCBtYXJrZXIgd2hlbiB0aGUgcmFuZ2UgaXMgY29sbGFwc2VkLlxyXG5cdFx0XHRpZiAoY3VycmVudFJhbmdlICYmIGN1cnJlbnRSYW5nZS5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRzdGFydE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXHJcblx0XHRcdFx0XHRfY3JlYXRlTWFya2VyKGVuZE1hcmtlciksIHN0YXJ0Tm9kZS5uZXh0U2libGluZyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pbnNlcnROb2RlQXQoZmFsc2UsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBtYXJrZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElEXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcblx0XHQgKiBAcmV0dXJuIHtOb2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBnZXRNYXJrZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0cmV0dXJuIGRvYy5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlcyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZW1vdmVNYXJrZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0dmFyIG1hcmtlciA9IHRoaXMuZ2V0TWFya2VyKGlkKTtcclxuXHJcblx0XHRcdGlmIChtYXJrZXIpIHtcclxuXHRcdFx0XHRkb20ucmVtb3ZlKG1hcmtlcik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTYXZlcyB0aGUgY3VycmVudCByYW5nZSBsb2NhdGlvbi4gQWxpYXMgb2YgaW5zZXJ0TWFya2VycygpXHJcblx0XHQgKlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzYXZlUmFnZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNhdmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5pbnNlcnRNYXJrZXJzKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2VsZWN0IHRoZSBzcGVjaWZpZWQgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge1JhbmdlfSByYW5nZVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RSYW5nZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XHJcblx0XHRcdHZhciBsYXN0Q2hpbGQ7XHJcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdHZhciBjb250YWluZXIgPSByYW5nZS5lbmRDb250YWluZXI7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcclxuXHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcclxuXHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdGlmIChyYW5nZS5jb2xsYXBzZWQgJiYgY29udGFpbmVyICYmXHJcblx0XHRcdFx0IWRvbS5pc0lubGluZShjb250YWluZXIsIHRydWUpKSB7XHJcblxyXG5cdFx0XHRcdGxhc3RDaGlsZCA9IGNvbnRhaW5lci5sYXN0Q2hpbGQ7XHJcblx0XHRcdFx0d2hpbGUgKGxhc3RDaGlsZCAmJiBkb20uaXMobGFzdENoaWxkLCAnLmVtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0bGFzdENoaWxkID0gbGFzdENoaWxkLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkb20uaXMobGFzdENoaWxkLCAnYnInKSkge1xyXG5cdFx0XHRcdFx0dmFyIHJuZyA9IGRvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0cm5nLnNldEVuZEFmdGVyKGxhc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbXBhcmUocmFuZ2UsIHJuZykpIHtcclxuXHRcdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUobGFzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsKSB7XHJcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXN0b3JlcyB0aGUgbGFzdCByYW5nZSBzYXZlZCBieSBzYXZlUmFuZ2UoKSBvciBpbnNlcnRNYXJrZXJzKClcclxuXHRcdCAqXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHJlc3RvcmVSYW5nZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnJlc3RvcmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGlzQ29sbGFwc2VkLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBzdGFydCA9IHRoaXMuZ2V0TWFya2VyKHN0YXJ0TWFya2VyKSwgZW5kID0gdGhpcy5nZXRNYXJrZXIoZW5kTWFya2VyKTtcclxuXHJcblx0XHRcdGlmICghc3RhcnQgfHwgIWVuZCB8fCAhcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlzQ29sbGFwc2VkID0gc3RhcnQubmV4dFNpYmxpbmcgPT09IGVuZDtcclxuXHJcblx0XHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKHN0YXJ0KTtcclxuXHRcdFx0cmFuZ2Uuc2V0RW5kQWZ0ZXIoZW5kKTtcclxuXHJcblx0XHRcdGlmIChpc0NvbGxhcHNlZCkge1xyXG5cdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXJzKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2VsZWN0cyB0aGUgdGV4dCBsZWZ0IGFuZCByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gbGVmdFxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0XHJcblx0XHQgKiBAc2luY2UgMS40LjNcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlcikge1xyXG5cdFx0XHRsZXQgc3RhcnQ6IGFueSwgZW5kOiBhbnksIHJhbmdlOiBhbnkgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcclxuXHJcblx0XHRcdHN0YXJ0ID0gb3V0ZXJUZXh0KHJhbmdlLCB0cnVlLCBsZWZ0KTtcclxuXHRcdFx0ZW5kID0gb3V0ZXJUZXh0KHJhbmdlLCBmYWxzZSwgcmlnaHQpO1xyXG5cclxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQoc3RhcnQubm9kZSwgc3RhcnQub2Zmc2V0KTtcclxuXHRcdFx0cmFuZ2Uuc2V0RW5kKGVuZC5ub2RlLCBlbmQub2Zmc2V0KTtcclxuXHJcblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UocmFuZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHRleHQgbGVmdCBvciByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGJlZm9yZVxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmdldE91dGVyVGV4dCA9IGZ1bmN0aW9uIChiZWZvcmUsIGxlbmd0aCkge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKCFiZWZvcmUpO1xyXG5cclxuXHRcdFx0cmV0dXJuIG91dGVyVGV4dChyYW5nZSwgYmVmb3JlLCBsZW5ndGgpLnRleHQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVwbGFjZXMga2V5d29yZHMgd2l0aCB2YWx1ZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgY2FyZXQgcG9zaXRpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge0FycmF5fSAgIGtleXdvcmRzXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBZnRlciAgICAgIElmIHRvIGluY2x1ZGUgdGhlIHRleHQgYWZ0ZXIgdGhlXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgY2FyZXQgcG9zaXRpb24gb3IganVzdFxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0IGJlZm9yZVxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBrZXl3b3Jkc1NvcnRlZCAgICBJZiB0aGUga2V5d29yZHMgYXJyYXkgaXMgcHJlXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCBzaG9ydGVzdCB0byBsb25nZXN0XHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gIGxvbmdlc3RLZXl3b3JkICAgIExlbmd0aCBvZiB0aGUgbG9uZ2VzdCBrZXl3b3JkXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcXVpcmVXaGl0ZXNwYWNlIElmIHRoZSBrZXkgbXVzdCBiZSBzdXJyb3VuZGVkXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IHdoaXRlc3BhY2VcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSAga2V5cHJlc3NDaGFyICAgICAgSWYgdGhpcyBpcyBiZWluZyBjYWxsZWQgZnJvbVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGtleXByZXNzIGV2ZW50LCB0aGlzIHNob3VsZCBiZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQgdG8gdGhlIHByZXNzZWQgY2hhcmFjdGVyXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZXBsYWNlS2V5d29yZFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5cdFx0dGhpcy5yZXBsYWNlS2V5d29yZCA9IGZ1bmN0aW9uIChcclxuXHRcdFx0a2V5d29yZHMsXHJcblx0XHRcdGluY2x1ZGVBZnRlcixcclxuXHRcdFx0a2V5d29yZHNTb3J0ZWQsXHJcblx0XHRcdGxvbmdlc3RLZXl3b3JkLFxyXG5cdFx0XHRyZXF1aXJlV2hpdGVzcGFjZSxcclxuXHRcdFx0a2V5cHJlc3NDaGFyXHJcblx0XHQpIHtcclxuXHRcdFx0aWYgKCFrZXl3b3Jkc1NvcnRlZCkge1xyXG5cdFx0XHRcdGtleXdvcmRzLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG91dGVyVGV4dCwgbWF0Y2gsIG1hdGNoUG9zLCBzdGFydEluZGV4LCBsZWZ0TGVuLCBjaGFyc0xlZnQsIGtleXdvcmQsIGtleXdvcmRMZW4sIHdoaXRlc3BhY2VSZWdleCA9ICcoXnxbXFxcXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0pJywga2V5d29yZElkeCA9IGtleXdvcmRzLmxlbmd0aCwgd2hpdGVzcGFjZUxlbiA9IHJlcXVpcmVXaGl0ZXNwYWNlID8gMSA6IDAsIG1heEtleUxlbiA9IGxvbmdlc3RLZXl3b3JkIHx8XHJcblx0XHRcdFx0a2V5d29yZHNba2V5d29yZElkeCAtIDFdWzBdLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xyXG5cdFx0XHRcdG1heEtleUxlbisrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRrZXlwcmVzc0NoYXIgPSBrZXlwcmVzc0NoYXIgfHwgJyc7XHJcblx0XHRcdG91dGVyVGV4dCA9IHRoaXMuZ2V0T3V0ZXJUZXh0KHRydWUsIG1heEtleUxlbik7XHJcblx0XHRcdGxlZnRMZW4gPSBvdXRlclRleHQubGVuZ3RoO1xyXG5cdFx0XHRvdXRlclRleHQgKz0ga2V5cHJlc3NDaGFyO1xyXG5cclxuXHRcdFx0aWYgKGluY2x1ZGVBZnRlcikge1xyXG5cdFx0XHRcdG91dGVyVGV4dCArPSB0aGlzLmdldE91dGVyVGV4dChmYWxzZSwgbWF4S2V5TGVuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKGtleXdvcmRJZHgtLSkge1xyXG5cdFx0XHRcdGtleXdvcmQgPSBrZXl3b3Jkc1trZXl3b3JkSWR4XVswXTtcclxuXHRcdFx0XHRrZXl3b3JkTGVuID0ga2V5d29yZC5sZW5ndGg7XHJcblx0XHRcdFx0c3RhcnRJbmRleCA9IE1hdGgubWF4KDAsIGxlZnRMZW4gLSBrZXl3b3JkTGVuIC0gd2hpdGVzcGFjZUxlbik7XHJcblx0XHRcdFx0bWF0Y2hQb3MgPSAtMTtcclxuXHJcblx0XHRcdFx0aWYgKHJlcXVpcmVXaGl0ZXNwYWNlKSB7XHJcblx0XHRcdFx0XHRtYXRjaCA9IG91dGVyVGV4dFxyXG5cdFx0XHRcdFx0XHQuc3Vic3RyKHN0YXJ0SW5kZXgpXHJcblx0XHRcdFx0XHRcdC5tYXRjaChuZXcgUmVnRXhwKHdoaXRlc3BhY2VSZWdleCArXHJcblx0XHRcdFx0XHRcdFx0ZXNjYXBlLnJlZ2V4KGtleXdvcmQpICsgd2hpdGVzcGFjZVJlZ2V4KSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1hdGNoKSB7XHJcblx0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGVuZ3RoIG9mIHRoZSB0ZXh0IHRoYXQgd2FzIHJlbW92ZWQgYnlcclxuXHRcdFx0XHRcdFx0Ly8gc3Vic3RyKCkgYW5kIGFsc28gYWRkIDEgZm9yIHRoZSB3aGl0ZXNwYWNlXHJcblx0XHRcdFx0XHRcdG1hdGNoUG9zID0gbWF0Y2guaW5kZXggKyBzdGFydEluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtYXRjaFBvcyA9IG91dGVyVGV4dC5pbmRleE9mKGtleXdvcmQsIHN0YXJ0SW5kZXgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG1hdGNoUG9zID4gLTEpIHtcclxuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgbWF0Y2ggaXMgYmV0d2VlbiBiZWZvcmUgYW5kXHJcblx0XHRcdFx0XHQvLyBhZnRlciwgbm90IGp1c3QgZW50aXJlbHkgaW4gb25lIHNpZGUgb3IgdGhlIG90aGVyXHJcblx0XHRcdFx0XHRpZiAobWF0Y2hQb3MgPD0gbGVmdExlbiAmJlxyXG5cdFx0XHRcdFx0XHRtYXRjaFBvcyArIGtleXdvcmRMZW4gKyB3aGl0ZXNwYWNlTGVuID49IGxlZnRMZW4pIHtcclxuXHRcdFx0XHRcdFx0Y2hhcnNMZWZ0ID0gbGVmdExlbiAtIG1hdGNoUG9zO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGtleXByZXNzIGNoYXIgaXMgd2hpdGUgc3BhY2UgdGhlbiBpdCBzaG91bGRcclxuXHRcdFx0XHRcdFx0Ly8gbm90IGJlIHJlcGxhY2VkLCBvbmx5IGNoYXJzIHRoYXQgYXJlIHBhcnQgb2YgdGhlXHJcblx0XHRcdFx0XHRcdC8vIGtleSBzaG91bGQgYmUgcmVwbGFjZWQuXHJcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0KFxyXG5cdFx0XHRcdFx0XHRcdGNoYXJzTGVmdCxcclxuXHRcdFx0XHRcdFx0XHRrZXl3b3JkTGVuIC0gY2hhcnNMZWZ0IC1cclxuXHRcdFx0XHRcdFx0XHQoL15cXFMvLnRlc3Qoa2V5cHJlc3NDaGFyKSA/IDEgOiAwKVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5pbnNlcnRIVE1MKGtleXdvcmRzW2tleXdvcmRJZHhdWzFdKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ29tcGFyZXMgdHdvIHJhbmdlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiByYW5nZUIgaXMgdW5kZWZpbmVkIGl0IHdpbGwgYmUgc2V0IHRvXHJcblx0XHQgKiB0aGUgY3VycmVudCBzZWxlY3RlZCByYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge1JhbmdlfSBybmdBXHJcblx0XHQgKiBAcGFyYW0gIHtSYW5nZX0gW3JuZ0JdXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjb21wYXJlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY29tcGFyZSA9IGZ1bmN0aW9uIChybmdBPzogUmFuZ2UsIHJuZ0I/OiBSYW5nZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoIXJuZ0IpIHtcclxuXHRcdFx0XHRybmdCID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghcm5nQSB8fCAhcm5nQikge1xyXG5cdFx0XHRcdHJldHVybiAhcm5nQSAmJiAhcm5nQjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJuZ0EuY29tcGFyZUJvdW5kYXJ5UG9pbnRzKFJhbmdlLkVORF9UT19FTkQsIHJuZ0IpID09PSAwICYmXHJcblx0XHRcdFx0cm5nQS5jb21wYXJlQm91bmRhcnlQb2ludHMoUmFuZ2UuU1RBUlRfVE9fU1RBUlQsIHJuZ0IpID09PSAwO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZXMgYW55IGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuNC42XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNsZWFyXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAoc2VsKSB7XHJcblx0XHRcdFx0aWYgKHNlbC5yZW1vdmVBbGxSYW5nZXMpIHtcclxuXHRcdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbC5lbXB0eSkge1xyXG5cdFx0XHRcdFx0c2VsLmVtcHR5KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUHJlcGFyZXMgSFRNTCB0byBiZSBpbnNlcnRlZCBieSBhZGRpbmcgYSB6ZXJvIHdpZHRoIHNwYWNlXHJcblx0XHQgKiBpZiB0aGUgbGFzdCBjaGlsZCBpcyBlbXB0eSBhbmQgYWRkaW5nIHRoZSByYW5nZSBzdGFydC9lbmRcclxuXHRcdCAqIG1hcmtlcnMgdG8gdGhlIGxhc3QgY2hpbGQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IG5vZGVcclxuXHRcdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbZW5kTm9kZV1cclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXR1cm5IdG1sXVxyXG5cdFx0ICogQHJldHVybiB7Tm9kZXxzdHJpbmd9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRfcHJlcGFyZUlucHV0ID0gKG5vZGU6IE5vZGUgfCBzdHJpbmcsIGVuZE5vZGU6IEhUTUxFbGVtZW50IHwgc3RyaW5nLCByZXR1cm5IdG1sPzogYm9vbGVhbik6IE5vZGUgfCBzdHJpbmcgPT4ge1xyXG5cdFx0XHR2YXIgbGFzdENoaWxkLCBmcmFnID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcblx0XHRcdGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRpZiAoZW5kTm9kZSkge1xyXG5cdFx0XHRcdFx0bm9kZSArPSB0aGlzLnNlbGVjdGVkSHRtbCgpICsgZW5kTm9kZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGZyYWcgPSBkb20ucGFyc2VIVE1MKG5vZGUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxldCBodG1sTm9kZSA9IG5vZGUgYXMgSFRNTEVsZW1lbnQ7XHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGh0bWxOb2RlKTtcclxuXHJcblx0XHRcdFx0aWYgKHR5cGVvZiBlbmROb2RlICE9PSAnc3RyaW5nJyAmJiBlbmROb2RlKSB7XHJcblx0XHRcdFx0XHRsZXQgZXh0cmFjdGVkID0gdGhpcy5zZWxlY3RlZFJhbmdlKCkuZXh0cmFjdENvbnRlbnRzKCk7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgZXh0cmFjdGVkKTtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChmcmFnLCBlbmROb2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKGxhc3RDaGlsZCA9IGZyYWcubGFzdENoaWxkKSkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKCFkb20uaXNJbmxpbmUobGFzdENoaWxkLmxhc3RDaGlsZCwgdHJ1ZSkpIHtcclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBsYXN0Q2hpbGQubGFzdENoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZG9tLmNhbkhhdmVDaGlsZHJlbihsYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0Ly8gV2Via2l0IHdvbid0IGFsbG93IHRoZSBjdXJzb3IgdG8gYmUgcGxhY2VkIGluc2lkZSBhblxyXG5cdFx0XHRcdC8vIGVtcHR5IHRhZywgc28gYWRkIGEgemVybyB3aWR0aCBzcGFjZSB0byBpdC5cclxuXHRcdFx0XHRpZiAoIWxhc3RDaGlsZC5sYXN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdGxldCB0eHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1xcdTIwMEInKTtcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIHR4dE5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsYXN0Q2hpbGQgPSBmcmFnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcnMoKTtcclxuXHJcblx0XHRcdC8vIEFwcGVuZCBtYXJrcyB0byBsYXN0IGNoaWxkIHNvIHdoZW4gcmVzdG9yZWQgY3Vyc29yIHdpbGwgYmUgaW5cclxuXHRcdFx0Ly8gdGhlIHJpZ2h0IHBsYWNlXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChsYXN0Q2hpbGQsIF9jcmVhdGVNYXJrZXIoc3RhcnRNYXJrZXIpKTtcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihlbmRNYXJrZXIpKTtcclxuXHJcblx0XHRcdGlmIChyZXR1cm5IdG1sKSB7XHJcblx0XHRcdFx0dmFyIGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCBmcmFnKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmcmFnO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENyZWF0ZXMgYSBtYXJrZXIgbm9kZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQHJldHVybiB7SFRNTFNwYW5FbGVtZW50fVxyXG5cdFx0ICogQHByaXZhdGVcclxuXHRcdCAqL1xyXG5cdFx0X2NyZWF0ZU1hcmtlciA9IChpZDogc3RyaW5nKTogSFRNTFNwYW5FbGVtZW50ID0+IHtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXIoaWQpO1xyXG5cclxuXHRcdFx0dmFyIG1hcmtlciA9IGRvbS5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xyXG5cdFx0XHRcdGlkOiBpZCxcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3Itc2VsZWN0aW9uIGVtbGVkaXRvci1pZ25vcmUnLFxyXG5cdFx0XHRcdHN0eWxlOiAnZGlzcGxheTpub25lO2xpbmUtaGVpZ2h0OjAnXHJcblx0XHRcdH0sIGRvYyk7XHJcblxyXG5cdFx0XHRtYXJrZXIuaW5uZXJIVE1MID0gJyAnO1xyXG5cclxuXHRcdFx0cmV0dXJuIG1hcmtlcjtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiIsInZhciBVU0VSX0FHRU5UID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuLyoqXG4gKiBEZXRlY3RzIGlmIHRoZSBicm93c2VyIGlzIGlPU1xuICpcbiAqIE5lZWRlZCB0byBmaXggaU9TIHNwZWNpZmljIGJ1Z3NcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIGlvc1xuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaW9zID0gL2lQaG9uZXxpUG9kfGlQYWR8IHdvc2Jyb3dzZXJcXC8vaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG4vKipcbiAqIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIFdZU0lXWUcgZWRpdGluZyAoZS5nLiBvbGRlciBtb2JpbGUgYnJvd3NlcnMpLlxuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaXNXeXNpd3lnU3VwcG9ydGVkXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgdmFyIGlzV3lzaXd5Z1N1cHBvcnRlZCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhclx0bWF0Y2gsIGlzVW5zdXBwb3J0ZWQ7XG5cblx0Ly8gSUUgaXMgdGhlIG9ubHkgYnJvd3NlciB0byBzdXBwb3J0IGRvY3VtZW50TW9kZVxuXHR2YXIgaWUgPSAhIXdpbmRvdy5kb2N1bWVudC5kb2N1bWVudE1vZGU7XG5cdHZhciBsZWdhY3lFZGdlID0gJy1tcy1pbWUtYWxpZ24nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuXHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGRpdi5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuXG5cdC8vIENoZWNrIGlmIHRoZSBjb250ZW50RWRpdGFibGUgYXR0cmlidXRlIGlzIHN1cHBvcnRlZFxuXHRpZiAoISgnY29udGVudEVkaXRhYmxlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHx8XG5cdFx0ZGl2LmNvbnRlbnRFZGl0YWJsZSAhPT0gJ3RydWUnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gSSB0aGluayBibGFja2JlcnJ5IHN1cHBvcnRzIGNvbnRlbnRFZGl0YWJsZSBvciB3aWxsIGF0IGxlYXN0XG5cdC8vIGdpdmUgYSB2YWxpZCB2YWx1ZSBmb3IgdGhlIGNvbnRlbnRFZGl0YWJsZSBkZXRlY3Rpb24gYWJvdmVcblx0Ly8gc28gaXQgaXNuJ3QgaW5jbHVkZWQgaW4gdGhlIGJlbG93IHRlc3RzLlxuXG5cdC8vIEkgaGF0ZSBoYXZpbmcgdG8gZG8gVUEgc25pZmZpbmcgYnV0IHNvbWUgbW9iaWxlIGJyb3dzZXJzIHNheSB0aGV5XG5cdC8vIHN1cHBvcnQgY29udGVudGVkaWFibGUgd2hlbiBpdCBpc24ndCB1c2FibGUsIGkuZS4geW91IGNhbid0IGVudGVyXG5cdC8vIHRleHQuXG5cdC8vIFRoaXMgaXMgdGhlIG9ubHkgd2F5IEkgY2FuIHRoaW5rIG9mIHRvIGRldGVjdCB0aGVtIHdoaWNoIGlzIGFsc28gaG93XG5cdC8vIGV2ZXJ5IG90aGVyIGVkaXRvciBJJ3ZlIHNlZW4gZGVhbHMgd2l0aCB0aGlzIGlzc3VlLlxuXG5cdC8vIEV4Y2x1ZGUgT3BlcmEgbW9iaWxlIGFuZCBtaW5pXG5cdGlzVW5zdXBwb3J0ZWQgPSAvT3BlcmEgTW9iaXxPcGVyYSBNaW5pL2kudGVzdChVU0VSX0FHRU5UKTtcblxuXHRpZiAoL0FuZHJvaWQvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IHRydWU7XG5cblx0XHRpZiAoL1NhZmFyaS8udGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdFx0Ly8gQW5kcm9pZCBicm93c2VyIDUzNCsgc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZVxuXHRcdFx0Ly8gVGhpcyBhbHNvIG1hdGNoZXMgQ2hyb21lIHdoaWNoIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGUgdG9vXG5cdFx0XHRtYXRjaCA9IC9TYWZhcmlcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgQW1hem9uIFNpbGsgc3VwcG9ydHMgaXQsIG9sZGVyIHZlcnNpb25zIGRpZG4ndFxuXHQvLyBBcyBpdCB1c2VzIHdlYmtpdCBsaWtlIEFuZHJvaWQsIGFzc3VtZSBpdCdzIHRoZSBzYW1lIGFuZCBzdGFydGVkXG5cdC8vIHdvcmtpbmcgYXQgdmVyc2lvbnMgPj0gNTM0XG5cdGlmICgvIFNpbGtcXC8vaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0bWF0Y2ggPSAvQXBwbGVXZWJLaXRcXC8oXFxkKykvLmV4ZWMoVVNFUl9BR0VOVCk7XG5cdFx0aXNVbnN1cHBvcnRlZCA9ICghbWF0Y2ggfHwgIW1hdGNoWzFdID8gdHJ1ZSA6IG1hdGNoWzFdIDwgNTM0KTtcblx0fVxuXG5cdC8vIGlPUyA1KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdGlmIChpb3MpIHtcblx0XHQvLyBCbG9jayBhbnkgdmVyc2lvbiA8PSA0X3goX3gpXG5cdFx0aXNVbnN1cHBvcnRlZCA9IC9PUyBbMC00XShfXFxkKSsgbGlrZSBNYWMvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXHR9XG5cblx0Ly8gRmlyZWZveCBkb2VzIHN1cHBvcnQgV1lTSVdZRyBvbiBtb2JpbGVzIHNvIG92ZXJyaWRlXG5cdC8vIGFueSBwcmV2aW91cyB2YWx1ZSBpZiB1c2luZyBGRlxuXHRpZiAoL0ZpcmVmb3gvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0aWYgKC9PbmVCcm93c2VyL2kudGVzdChVU0VSX0FHRU5UKSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIFVDQnJvd3NlciB3b3JrcyBidXQgZG9lc24ndCBnaXZlIGEgdW5pcXVlIHVzZXIgYWdlbnRcblx0aWYgKG5hdmlnYXRvci52ZW5kb3IgPT09ICdVQ1dFQicpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHQvLyBJRSBhbmQgbGVnYWN5IGVkZ2UgYXJlIG5vdCBzdXBwb3J0ZWQgYW55IG1vcmVcblx0aWYgKGllIHx8IGxlZ2FjeUVkZ2UpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiAhaXNVbnN1cHBvcnRlZDtcbn0oKSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xyXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20nO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuaW1wb3J0IF90bXBsIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcclxuXHJcbi8qKlxyXG4gKiBGaXhlcyBhIGJ1ZyBpbiBGRiB3aGVyZSBpdCBzb21ldGltZXMgd3JhcHNcclxuICogbmV3IGxpbmVzIGluIHRoZWlyIG93biBsaXN0IGl0ZW0uXHJcbiAqIFNlZSBpc3N1ZSAjMzU5XHJcbiAqL1xyXG5mdW5jdGlvbiBmaXhGaXJlZm94TGlzdEJ1ZyhlZGl0b3IpIHtcclxuXHQvLyBPbmx5IGFwcGx5IHRvIEZpcmVmb3ggYXMgd2lsbCBicmVhayBvdGhlciBicm93c2Vycy5cclxuXHRpZiAoJ21vekhpZGRlbicgaW4gZG9jdW1lbnQpIHtcclxuXHRcdHZhciBub2RlID0gZWRpdG9yLmdldEJvZHkoKTtcclxuXHRcdHZhciBuZXh0O1xyXG5cclxuXHRcdHdoaWxlIChub2RlKSB7XHJcblx0XHRcdG5leHQgPSBub2RlO1xyXG5cclxuXHRcdFx0aWYgKG5leHQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdG5leHQgPSBuZXh0LmZpcnN0Q2hpbGQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHdoaWxlIChuZXh0ICYmICFuZXh0Lm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG5leHQpIHtcclxuXHRcdFx0XHRcdG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgL1tcXG5cXHJcXHRdKy8udGVzdChub2RlLm5vZGVWYWx1ZSkpIHtcclxuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBpZiBuZXdsaW5lcyBhcmUgY29sbGFwc2VkXHJcblx0XHRcdFx0aWYgKCEvXnByZS8udGVzdChkb20uY3NzKG5vZGUucGFyZW50Tm9kZSwgJ3doaXRlU3BhY2UnKSkpIHtcclxuXHRcdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRub2RlID0gbmV4dDtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTWFwIG9mIGFsbCB0aGUgY29tbWFuZHMgZm9yIEVtbEVkaXRvclxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAbmFtZSBjb21tYW5kc1xyXG4gKi9cclxudmFyIGRlZmF1bHRDbWRzID0ge1xyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJvbGRcclxuXHRib2xkOiB7XHJcblx0XHRleGVjOiAnYm9sZCcsXHJcblx0XHR0b29sdGlwOiAnQm9sZCcsXHJcblx0XHRzaG9ydGN1dDogJ0N0cmwrQidcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSXRhbGljXHJcblx0aXRhbGljOiB7XHJcblx0XHRleGVjOiAnaXRhbGljJyxcclxuXHRcdHRvb2x0aXA6ICdJdGFsaWMnLFxyXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0knXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVuZGVybGluZVxyXG5cdHVuZGVybGluZToge1xyXG5cdFx0ZXhlYzogJ3VuZGVybGluZScsXHJcblx0XHR0b29sdGlwOiAnVW5kZXJsaW5lJyxcclxuXHRcdHNob3J0Y3V0OiAnQ3RybCtVJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdHJpa2V0aHJvdWdoXHJcblx0c3RyaWtlOiB7XHJcblx0XHRleGVjOiAnc3RyaWtldGhyb3VnaCcsXHJcblx0XHR0b29sdGlwOiAnU3RyaWtldGhyb3VnaCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogU3Vic2NyaXB0XHJcblx0c3Vic2NyaXB0OiB7XHJcblx0XHRleGVjOiAnc3Vic2NyaXB0JyxcclxuXHRcdHRvb2x0aXA6ICdTdWJzY3JpcHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1cGVyc2NyaXB0XHJcblx0c3VwZXJzY3JpcHQ6IHtcclxuXHRcdGV4ZWM6ICdzdXBlcnNjcmlwdCcsXHJcblx0XHR0b29sdGlwOiAnU3VwZXJzY3JpcHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBMZWZ0XHJcblx0bGVmdDoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHRcdGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUgPT09IDMpIHtcclxuXHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobm9kZSkge1xyXG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcclxuXHRcdFx0XHR2YXIgYWxpZ24gPSBkb20uY3NzKG5vZGUsICd0ZXh0QWxpZ24nKTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otbGVmdFxyXG5cdFx0XHRcdHJldHVybiAvbGVmdC8udGVzdChhbGlnbikgfHxcclxuXHRcdFx0XHRcdGFsaWduID09PSAoaXNMdHIgPyAnc3RhcnQnIDogJ2VuZCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogJ2p1c3RpZnlsZWZ0JyxcclxuXHRcdHRvb2x0aXA6ICdBbGlnbiBsZWZ0J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBDZW50cmVcclxuXHRjZW50ZXI6IHtcclxuXHRcdGV4ZWM6ICdqdXN0aWZ5Y2VudGVyJyxcclxuXHRcdHRvb2x0aXA6ICdDZW50ZXInXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJpZ2h0XHJcblx0cmlnaHQ6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG5vZGUpIHtcclxuXHRcdFx0XHR2YXIgaXNMdHIgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cic7XHJcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XHJcblxyXG5cdFx0XHRcdC8vIENhbiBiZSAtbW96LXJpZ2h0XHJcblx0XHRcdFx0cmV0dXJuIC9yaWdodC8udGVzdChhbGlnbikgfHxcclxuXHRcdFx0XHRcdGFsaWduID09PSAoaXNMdHIgPyAnZW5kJyA6ICdzdGFydCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogJ2p1c3RpZnlyaWdodCcsXHJcblx0XHR0b29sdGlwOiAnQWxpZ24gcmlnaHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEp1c3RpZnlcclxuXHRqdXN0aWZ5OiB7XHJcblx0XHRleGVjOiAnanVzdGlmeWZ1bGwnLFxyXG5cdFx0dG9vbHRpcDogJ0p1c3RpZnknXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBGb250XHJcblx0Zm9udDoge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XHJcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2ZvbnQnKSk7XHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5lZGl0b3JPcHRpb25zLmZvbnRzLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoZm9udCkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZm9udE9wdCcsIHtcclxuXHRcdFx0XHRcdGZvbnQ6IGZvbnRcclxuXHRcdFx0XHR9LCB0cnVlKSk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2ZvbnQtcGlja2VyJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmZvbnQuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoZm9udE5hbWUpIHtcclxuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRuYW1lJywgZm9udE5hbWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnRm9udCBOYW1lJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBTaXplXHJcblx0c2l6ZToge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XHJcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ3NpemUnKSk7XHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDw9IDc7IGkrKykge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnc2l6ZU9wdCcsIHtcclxuXHRcdFx0XHRcdHNpemU6IGlcclxuXHRcdFx0XHR9LCB0cnVlKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdmb250c2l6ZS1waWNrZXInLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xyXG5cclxuXHRcdFx0ZGVmYXVsdENtZHMuc2l6ZS5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250U2l6ZSkge1xyXG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udHNpemUnLCBmb250U2l6ZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdGb250IFNpemUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvbG91clxyXG5cdGNvbG9yOiB7XHJcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcclxuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdGh0bWwgICAgPSAnJyxcclxuXHRcdFx0XHRjbWQgICAgID0gZGVmYXVsdENtZHMuY29sb3I7XHJcblxyXG5cdFx0XHRpZiAoIWNtZC5faHRtbENhY2hlKSB7XHJcblx0XHRcdFx0ZWRpdG9yLmVkaXRvck9wdGlvbnMuY29sb3JzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XHJcblx0XHRcdFx0XHRodG1sICs9ICc8ZGl2IGNsYXNzPVwiZW1sZWRpdG9yLWNvbG9yLWNvbHVtblwiPic7XHJcblxyXG5cdFx0XHRcdFx0Y29sdW1uLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoY29sb3IpIHtcclxuXHRcdFx0XHRcdFx0aHRtbCArPVxyXG5cdFx0XHRcdFx0XHRcdCc8YSBocmVmPVwiI1wiIGNsYXNzPVwiZW1sZWRpdG9yLWNvbG9yLW9wdGlvblwiJyArXHJcblx0XHRcdFx0XHRcdFx0JyBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcgKyBjb2xvciArICdcIicgK1xyXG5cdFx0XHRcdFx0XHRcdCcgZGF0YS1jb2xvcj1cIicgKyBjb2xvciArICdcIj48L2E+JztcclxuXHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdGh0bWwgKz0gJzwvZGl2Pic7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGNtZC5faHRtbENhY2hlID0gaHRtbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGRvbS5wYXJzZUhUTUwoY21kLl9odG1sQ2FjaGUpKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2NvbG9yJykpO1xyXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnY29sb3ItcGlja2VyJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmNvbG9yLl9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGNvbG9yKSB7XHJcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JlY29sb3InLCBjb2xvcik7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdGb250IENvbG9yJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBSZW1vdmUgRm9ybWF0XHJcblx0cmVtb3ZlZm9ybWF0OiB7XHJcblx0XHRleGVjOiAncmVtb3ZlZm9ybWF0JyxcclxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgRm9ybWF0dGluZydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEN1dFxyXG5cdGN1dDoge1xyXG5cdFx0ZXhlYzogJ2N1dCcsXHJcblx0XHR0b29sdGlwOiAnQ3V0JyxcclxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY3V0IGNvbW1hbmQuICcgK1xyXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtWCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29weVxyXG5cdGNvcHk6IHtcclxuXHRcdGV4ZWM6ICdjb3B5JyxcclxuXHRcdHRvb2x0aXA6ICdDb3B5JyxcclxuXHRcdGVycm9yTWVzc2FnZTogJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBhbGxvdyB0aGUgY29weSBjb21tYW5kLiAnICtcclxuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLUMnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlXHJcblx0cGFzdGU6IHtcclxuXHRcdGV4ZWM6ICdwYXN0ZScsXHJcblx0XHR0b29sdGlwOiAnUGFzdGUnLFxyXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBwYXN0ZSBjb21tYW5kLiAnICtcclxuXHRcdFx0J1BsZWFzZSB1c2UgdGhlIGtleWJvYXJkIHNob3J0Y3V0IEN0cmwvQ21kLVYnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFBhc3RlIFRleHRcclxuXHRwYXN0ZXRleHQ6IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcclxuXHRcdFx0dmFyXHR2YWwsXHJcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuXHRcdFx0XHRlZGl0b3IgID0gdGhpcztcclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgncGFzdGV0ZXh0Jywge1xyXG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IudHJhbnNsYXRlKFxyXG5cdFx0XHRcdFx0J1Bhc3RlIHlvdXIgdGV4dCBpbnNpZGUgdGhlIGZvbGxvd2luZyBib3g6J1xyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdHZhbCA9IGRvbS5maW5kKGNvbnRlbnQsICcjdHh0JylbMF0udmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmICh2YWwpIHtcclxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dCh2YWwpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdwYXN0ZXRleHQnLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnUGFzdGUgVGV4dCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogQnVsbGV0IExpc3RcclxuXHRidWxsZXRsaXN0OiB7XHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGZpeEZpcmVmb3hMaXN0QnVnKHRoaXMpO1xyXG5cdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdpbnNlcnR1bm9yZGVyZWRsaXN0Jyk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0J1bGxldCBsaXN0J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBPcmRlcmVkIExpc3RcclxuXHRvcmRlcmVkbGlzdDoge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcclxuXHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnaW5zZXJ0b3JkZXJlZGxpc3QnKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnTnVtYmVyZWQgbGlzdCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSW5kZW50XHJcblx0aW5kZW50OiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudCwgZmlyc3RCbG9jaykge1xyXG5cdFx0XHQvLyBPbmx5IHdvcmtzIHdpdGggbGlzdHMsIGZvciBub3dcclxuXHRcdFx0dmFyXHRyYW5nZSwgc3RhcnRQYXJlbnQsIGVuZFBhcmVudDtcclxuXHJcblx0XHRcdGlmIChkb20uaXMoZmlyc3RCbG9jaywgJ2xpJykpIHtcclxuXHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGRvbS5pcyhmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpKSB7XHJcblx0XHRcdFx0Ly8gaWYgdGhlIHdob2xlIGxpc3QgaXMgc2VsZWN0ZWQsIHRoZW4gdGhpcyBtdXN0IGJlXHJcblx0XHRcdFx0Ly8gaW52YWxpZGF0ZWQgYmVjYXVzZSB0aGUgYnJvd3NlciB3aWxsIHBsYWNlIGFcclxuXHRcdFx0XHQvLyA8YmxvY2txdW90ZT4gdGhlcmVcclxuXHRcdFx0XHRyYW5nZSA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHRcdHN0YXJ0UGFyZW50ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRlbmRQYXJlbnQgICA9IHJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnROb2RlO1xyXG5cclxuXHRcdFx0XHQvLyBUT0RPOiBjb3VsZCB1c2Ugbm9kZVR5cGUgZm9yIHRoaXM/XHJcblx0XHRcdFx0Ly8gTWF5YmUganVzdCBjaGVjayB0aGUgZmlyc3RCbG9jayBjb250YWlucyBib3RoIHRoZSBzdGFydFxyXG5cdFx0XHRcdC8vYW5kIGVuZCBjb250YWluZXJzXHJcblxyXG5cdFx0XHRcdC8vIFNlbGVjdCB0aGUgdGFnLCBub3QgdGhlIHRleHROb2RlXHJcblx0XHRcdFx0Ly8gKHRoYXQncyB3aHkgdGhlIHBhcmVudE5vZGUpXHJcblx0XHRcdFx0aWYgKHN0YXJ0UGFyZW50ICE9PVxyXG5cdFx0XHRcdFx0c3RhcnRQYXJlbnQucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCB8fFxyXG5cdFx0XHRcdFx0Ly8gd29yayBhcm91bmQgYSBidWcgaW4gRkZcclxuXHRcdFx0XHRcdChkb20uaXMoZW5kUGFyZW50LCAnbGknKSAmJiBlbmRQYXJlbnQgIT09XHJcblx0XHRcdFx0XHRcdGVuZFBhcmVudC5wYXJlbnROb2RlLmxhc3RFbGVtZW50Q2hpbGQpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAtMTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzLFxyXG5cdFx0XHRcdGJsb2NrID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHQvLyBBbiBpbmRlbnQgc3lzdGVtIGlzIHF1aXRlIGNvbXBsaWNhdGVkIGFzIHRoZXJlIGFyZSBsb2Fkc1xyXG5cdFx0XHQvLyBvZiBjb21wbGljYXRpb25zIGFuZCBpc3N1ZXMgYXJvdW5kIGhvdyB0byBpbmRlbnQgdGV4dFxyXG5cdFx0XHQvLyBBcyBkZWZhdWx0LCBsZXQncyBqdXN0IHN0YXkgd2l0aCBpbmRlbnRpbmcgdGhlIGxpc3RzLFxyXG5cdFx0XHQvLyBhdCBsZWFzdCwgZm9yIG5vdy5cclxuXHRcdFx0aWYgKGRvbS5jbG9zZXN0KGJsb2NrLCAndWwsb2wsbWVudScpKSB7XHJcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdpbmRlbnQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdBZGQgaW5kZW50J1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHQvLyBTVEFSVF9DT01NQU5EOiBPdXRkZW50XHJcblx0b3V0ZGVudDoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XHJcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdChmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpID8gMCA6IC0xO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyXHRibG9jayA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblx0XHRcdGlmIChkb20uY2xvc2VzdChibG9jaywgJ3VsLG9sLG1lbnUnKSkge1xyXG5cdFx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ291dGRlbnQnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgb25lIGluZGVudCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRhYmxlXHJcblx0dGFibGU6IHtcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcclxuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcyxcclxuXHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd0YWJsZScsIHtcclxuXHRcdFx0XHRyb3dzOiBlZGl0b3IudHJhbnNsYXRlKCdSb3dzOicpLFxyXG5cdFx0XHRcdGNvbHM6IGVkaXRvci50cmFuc2xhdGUoJ0NvbHM6JyksXHJcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdHZhclx0cm93cyA9IE51bWJlcihkb20uZmluZChjb250ZW50LCAnI3Jvd3MnKVswXS52YWx1ZSksXHJcblx0XHRcdFx0XHRjb2xzID0gTnVtYmVyKGRvbS5maW5kKGNvbnRlbnQsICcjY29scycpWzBdLnZhbHVlKSxcclxuXHRcdFx0XHRcdGh0bWwgPSAnPHRhYmxlPic7XHJcblxyXG5cdFx0XHRcdGlmIChyb3dzID4gMCAmJiBjb2xzID4gMCkge1xyXG5cdFx0XHRcdFx0aHRtbCArPSBBcnJheShyb3dzICsgMSkuam9pbihcclxuXHRcdFx0XHRcdFx0Jzx0cj4nICtcclxuXHRcdFx0XHRcdFx0XHRBcnJheShjb2xzICsgMSkuam9pbihcclxuXHRcdFx0XHRcdFx0XHRcdCc8dGQ+PGJyIC8+PC90ZD4nXHJcblx0XHRcdFx0XHRcdFx0KSArXHJcblx0XHRcdFx0XHRcdCc8L3RyPidcclxuXHRcdFx0XHRcdCk7XHJcblxyXG5cdFx0XHRcdFx0aHRtbCArPSAnPC90YWJsZT4nO1xyXG5cclxuXHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChodG1sKTtcclxuXHRcdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0dGFibGUnLCBjb250ZW50KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgdGFibGUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBIb3Jpem9udGFsIFJ1bGVcclxuXHRob3Jpem9udGFscnVsZToge1xyXG5cdFx0ZXhlYzogJ2luc2VydGhvcml6b250YWxydWxlJyxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBob3Jpem9udGFsIHJ1bGUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2RlXHJcblx0Y29kZToge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRcdCc8Y29kZT4nLFxyXG5cdFx0XHRcdCc8YnIgLz48L2NvZGU+J1xyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdDb2RlJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogSW1hZ2VcclxuXHRpbWFnZToge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIHNlbGVjdGVkLCBjYikge1xyXG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ2ltYWdlJywge1xyXG5cdFx0XHRcdHVybDogZWRpdG9yLnRyYW5zbGF0ZSgnVVJMOicpLFxyXG5cdFx0XHRcdHdpZHRoOiBlZGl0b3IudHJhbnNsYXRlKCdXaWR0aCAob3B0aW9uYWwpOicpLFxyXG5cdFx0XHRcdGhlaWdodDogZWRpdG9yLnRyYW5zbGF0ZSgnSGVpZ2h0IChvcHRpb25hbCk6JyksXHJcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cclxuXHRcdFx0dmFyXHR1cmxJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjaW1hZ2UnKVswXTtcclxuXHJcblx0XHRcdHVybElucHV0LnZhbHVlID0gc2VsZWN0ZWQ7XHJcblxyXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdGlmICh1cmxJbnB1dC52YWx1ZSkge1xyXG5cdFx0XHRcdFx0Y2IoXHJcblx0XHRcdFx0XHRcdHVybElucHV0LnZhbHVlLFxyXG5cdFx0XHRcdFx0XHRkb20uZmluZChjb250ZW50LCAnI3dpZHRoJylbMF0udmFsdWUsXHJcblx0XHRcdFx0XHRcdGRvbS5maW5kKGNvbnRlbnQsICcjaGVpZ2h0JylbMF0udmFsdWVcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGltYWdlJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xyXG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzO1xyXG5cclxuXHRcdFx0ZGVmYXVsdENtZHMuaW1hZ2UuX2Ryb3BEb3duKFxyXG5cdFx0XHRcdGVkaXRvcixcclxuXHRcdFx0XHRjYWxsZXIsXHJcblx0XHRcdFx0JycsXHJcblx0XHRcdFx0ZnVuY3Rpb24gKHVybCwgd2lkdGgsIGhlaWdodCkge1xyXG5cdFx0XHRcdFx0dmFyIGF0dHJzICA9ICcnO1xyXG5cclxuXHRcdFx0XHRcdGlmICh3aWR0aCkge1xyXG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIHdpZHRoPVwiJyArIHBhcnNlSW50KHdpZHRoLCAxMCkgKyAnXCInO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChoZWlnaHQpIHtcclxuXHRcdFx0XHRcdFx0YXR0cnMgKz0gJyBoZWlnaHQ9XCInICsgcGFyc2VJbnQoaGVpZ2h0LCAxMCkgKyAnXCInO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGF0dHJzICs9ICcgc3JjPVwiJyArIGVzY2FwZS5lbnRpdGllcyh1cmwpICsgJ1wiJztcclxuXHJcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXHJcblx0XHRcdFx0XHRcdCc8aW1nJyArIGF0dHJzICsgJyAvPidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gaW1hZ2UnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBFLW1haWxcclxuXHRlbWFpbDoge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XHJcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZW1haWwnLCB7XHJcblx0XHRcdFx0bGFiZWw6IGVkaXRvci50cmFuc2xhdGUoJ0UtbWFpbDonKSxcclxuXHRcdFx0XHRkZXNjOiBlZGl0b3IudHJhbnNsYXRlKCdEZXNjcmlwdGlvbiAob3B0aW9uYWwpOicpLFxyXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0JylcclxuXHRcdFx0fSwgdHJ1ZSkpO1xyXG5cclxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHR2YXIgZW1haWwgPSBkb20uZmluZChjb250ZW50LCAnI2VtYWlsJylbMF0udmFsdWU7XHJcblxyXG5cdFx0XHRcdGlmIChlbWFpbCkge1xyXG5cdFx0XHRcdFx0Y2IoZW1haWwsIGRvbS5maW5kKGNvbnRlbnQsICcjZGVzJylbMF0udmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRlbWFpbCcsIGNvbnRlbnQpO1xyXG5cdFx0fSxcclxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcclxuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmVtYWlsLl9kcm9wRG93bihcclxuXHRcdFx0XHRlZGl0b3IsXHJcblx0XHRcdFx0Y2FsbGVyLFxyXG5cdFx0XHRcdGZ1bmN0aW9uIChlbWFpbCwgdGV4dCkge1xyXG5cdFx0XHRcdFx0aWYgKCFlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZEh0bWwoKSB8fCB0ZXh0KSB7XHJcblx0XHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcclxuXHRcdFx0XHRcdFx0XHQnPGEgaHJlZj1cIicgK1xyXG5cdFx0XHRcdFx0XHRcdCdtYWlsdG86JyArIGVzY2FwZS5lbnRpdGllcyhlbWFpbCkgKyAnXCI+JyArXHJcblx0XHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoKHRleHQgfHwgZW1haWwpKSArXHJcblx0XHRcdFx0XHRcdFx0JzwvYT4nXHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2NyZWF0ZWxpbmsnLCAnbWFpbHRvOicgKyBlbWFpbCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1haWwnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBMaW5rXHJcblx0bGluazoge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XHJcblx0XHRcdHZhciBjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdsaW5rJywge1xyXG5cdFx0XHRcdHVybDogZWRpdG9yLnRyYW5zbGF0ZSgnVVJMOicpLFxyXG5cdFx0XHRcdGRlc2M6IGVkaXRvci50cmFuc2xhdGUoJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXHJcblx0XHRcdFx0aW5zOiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxyXG5cdFx0XHR9LCB0cnVlKSk7XHJcblxyXG5cdFx0XHR2YXIgbGlua0lucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNsaW5rJylbMF07XHJcblxyXG5cdFx0XHRmdW5jdGlvbiBpbnNlcnRVcmwoZSkge1xyXG5cdFx0XHRcdGlmIChsaW5rSW5wdXQudmFsdWUpIHtcclxuXHRcdFx0XHRcdGNiKGxpbmtJbnB1dC52YWx1ZSwgZG9tLmZpbmQoY29udGVudCwgJyNkZXMnKVswXS52YWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlZGl0b3IuY2xvc2VEcm9wRG93bih0cnVlKTtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGluc2VydFVybCk7XHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAna2V5cHJlc3MnLCBudWxsLCAgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHQvLyAxMyA9IGVudGVyIGtleVxyXG5cdFx0XHRcdGlmIChlLndoaWNoID09PSAxMyAmJiBsaW5rSW5wdXQudmFsdWUpIHtcclxuXHRcdFx0XHRcdGluc2VydFVybChlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRsaW5rJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLmxpbmsuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAodXJsLCB0ZXh0KSB7XHJcblx0XHRcdFx0aWYgKHRleHQgfHwgIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpKSB7XHJcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXHJcblx0XHRcdFx0XHRcdCc8YSBocmVmPVwiJyArIGVzY2FwZS5lbnRpdGllcyh1cmwpICsgJ1wiPicgK1xyXG5cdFx0XHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyh0ZXh0IHx8IHVybCkgK1xyXG5cdFx0XHRcdFx0XHQnPC9hPidcclxuXHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsIHVybCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgbGluaydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVubGlua1xyXG5cdHVubGluazoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5jbG9zZXN0KHRoaXMuQ3VycmVudE5vZGUoKSwgJ2EnKSA/IDAgOiAtMTtcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBhbmNob3IgPSBkb20uY2xvc2VzdCh0aGlzLkN1cnJlbnROb2RlKCksICdhJyk7XHJcblxyXG5cdFx0XHRpZiAoYW5jaG9yKSB7XHJcblx0XHRcdFx0d2hpbGUgKGFuY2hvci5maXJzdENoaWxkKSB7XHJcblx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKGFuY2hvci5maXJzdENoaWxkLCBhbmNob3IpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZG9tLnJlbW92ZShhbmNob3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ1VubGluaydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBRdW90ZVxyXG5cdHF1b3RlOiB7XHJcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyLCBodG1sLCBhdXRob3IpIHtcclxuXHRcdFx0dmFyXHRiZWZvcmUgPSAnPGJsb2NrcXVvdGU+JyxcclxuXHRcdFx0XHRlbmQgICAgPSAnPC9ibG9ja3F1b3RlPic7XHJcblxyXG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBIVE1MIHBhc3NlZCBzZXQgZW5kIHRvIG51bGwgc28gYW55IHNlbGVjdGVkXHJcblx0XHRcdC8vIHRleHQgaXMgcmVwbGFjZWRcclxuXHRcdFx0aWYgKGh0bWwpIHtcclxuXHRcdFx0XHRhdXRob3IgPSAoYXV0aG9yID8gJzxjaXRlPicgK1xyXG5cdFx0XHRcdFx0ZXNjYXBlLmVudGl0aWVzKGF1dGhvcikgK1xyXG5cdFx0XHRcdCc8L2NpdGU+JyA6ICcnKTtcclxuXHRcdFx0XHRiZWZvcmUgPSBiZWZvcmUgKyBhdXRob3IgKyBodG1sICsgZW5kO1xyXG5cdFx0XHRcdGVuZCAgICA9IG51bGw7XHJcblx0XHRcdC8vIGlmIG5vdCBhZGQgYSBuZXdsaW5lIHRvIHRoZSBlbmQgb2YgdGhlIGluc2VydGVkIHF1b3RlXHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpID09PSAnJykge1xyXG5cdFx0XHRcdGVuZCA9ICc8YnIgLz4nICsgZW5kO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKGJlZm9yZSwgZW5kKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgUXVvdGUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBFbW90aWNvbnNcclxuXHRlbW90aWNvbjoge1xyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdHZhciBjcmVhdGVDb250ZW50ID0gZnVuY3Rpb24gKGluY2x1ZGVNb3JlKSB7XHJcblx0XHRcdFx0dmFyXHRtb3JlTGluayxcclxuXHRcdFx0XHRcdG9wdHMgICAgICAgICAgICA9IGVkaXRvci5lZGl0b3JPcHRpb25zLFxyXG5cdFx0XHRcdFx0ZW1vdGljb25zUm9vdCAgID0gb3B0cy5lbW90aWNvbnNSb290IHx8ICcnLFxyXG5cdFx0XHRcdFx0ZW1vdGljb25zQ29tcGF0ID0gb3B0cy5lbW90aWNvbnNDb21wYXQsXHJcblx0XHRcdFx0XHRyYW5nZUhlbHBlciAgICAgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcclxuXHRcdFx0XHRcdHN0YXJ0U3BhY2UgICAgICA9IGVtb3RpY29uc0NvbXBhdCAmJlxyXG5cdFx0XHRcdFx0XHRyYW5nZUhlbHBlci5nZXRPdXRlclRleHQodHJ1ZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxyXG5cdFx0XHRcdFx0ZW5kU3BhY2UgICAgICAgID0gZW1vdGljb25zQ29tcGF0ICYmXHJcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dChmYWxzZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxyXG5cdFx0XHRcdFx0Y29udGVudCAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0bGluZSAgICAgICAgICAgID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG5cdFx0XHRcdFx0cGVyTGluZSAgICAgICAgID0gMCxcclxuXHRcdFx0XHRcdGVtb3RpY29ucyAgICAgICA9IHV0aWxzLmV4dGVuZChcclxuXHRcdFx0XHRcdFx0e30sXHJcblx0XHRcdFx0XHRcdG9wdHMuZW1vdGljb25zLmRyb3Bkb3duLFxyXG5cdFx0XHRcdFx0XHRpbmNsdWRlTW9yZSA/IG9wdHMuZW1vdGljb25zLm1vcmUgOiB7fVxyXG5cdFx0XHRcdFx0KTtcclxuXHJcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIGxpbmUpO1xyXG5cclxuXHRcdFx0XHRwZXJMaW5lID0gTWF0aC5zcXJ0KE9iamVjdC5rZXlzKGVtb3RpY29ucykubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdpbWcnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0ZWRpdG9yLmluc2VydChzdGFydFNwYWNlICsgZG9tLmF0dHIodGhpcywgJ2FsdCcpICsgZW5kU3BhY2UsXHJcblx0XHRcdFx0XHRcdG51bGwsIGZhbHNlKS5jbG9zZURyb3BEb3duKHRydWUpO1xyXG5cclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChjb2RlLCBlbW90aWNvbikge1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxpbmUsIGRvbS5jcmVhdGVFbGVtZW50KCdpbWcnLCB7XHJcblx0XHRcdFx0XHRcdHNyYzogZW1vdGljb25zUm9vdCArIChlbW90aWNvbi51cmwgfHwgZW1vdGljb24pLFxyXG5cdFx0XHRcdFx0XHRhbHQ6IGNvZGUsXHJcblx0XHRcdFx0XHRcdHRpdGxlOiBlbW90aWNvbi50b29sdGlwIHx8IGNvZGVcclxuXHRcdFx0XHRcdH0pKTtcclxuXHJcblx0XHRcdFx0XHRpZiAobGluZS5jaGlsZHJlbi5sZW5ndGggPj0gcGVyTGluZSkge1xyXG5cdFx0XHRcdFx0XHRsaW5lID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGlmICghaW5jbHVkZU1vcmUgJiYgb3B0cy5lbW90aWNvbnMubW9yZSkge1xyXG5cdFx0XHRcdFx0bW9yZUxpbmsgPSBkb20uY3JlYXRlRWxlbWVudCgnYScsIHtcclxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLW1vcmUnXHJcblx0XHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobW9yZUxpbmssXHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGVkaXRvci50cmFuc2xhdGUoJ01vcmUnKSkpO1xyXG5cclxuXHRcdFx0XHRcdGRvbS5vbihtb3JlTGluaywgJ2NsaWNrJywgbnVsbCwgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKFxyXG5cdFx0XHRcdFx0XHRcdGNhbGxlciwgJ21vcmUtZW1vdGljb25zJywgY3JlYXRlQ29udGVudCh0cnVlKVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIG1vcmVMaW5rKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2Vtb3RpY29ucycsIGNyZWF0ZUNvbnRlbnQoZmFsc2UpKTtcclxuXHRcdH0sXHJcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XHJcblx0XHRcdGRlZmF1bHRDbWRzLmVtb3RpY29uLmV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1vdGljb24nXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBZb3VUdWJlXHJcblx0eW91dHViZToge1xyXG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNhbGxiYWNrKSB7XHJcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgneW91dHViZU1lbnUnLCB7XHJcblx0XHRcdFx0bGFiZWw6IGVkaXRvci50cmFuc2xhdGUoJ1ZpZGVvIFVSTDonKSxcclxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci50cmFuc2xhdGUoJ0luc2VydCcpXHJcblx0XHRcdH0sIHRydWUpKTtcclxuXHJcblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIHZhbCA9IGRvbS5maW5kKGNvbnRlbnQsICcjbGluaycpWzBdLnZhbHVlO1xyXG5cdFx0XHRcdHZhciBpZE1hdGNoID0gdmFsLm1hdGNoKC8oPzp2PXx2XFwvfGVtYmVkXFwvfHlvdXR1LmJlXFwvKT8oW2EtekEtWjAtOV8tXXsxMX0pLyk7XHJcblx0XHRcdFx0dmFyIHRpbWVNYXRjaCA9IHZhbC5tYXRjaCgvWyZ8P10oPzpzdGFyKT90PSgoXFxkK1tobXNdPyl7MSwzfSkvKTtcclxuXHRcdFx0XHR2YXIgdGltZSA9IDA7XHJcblxyXG5cdFx0XHRcdGlmICh0aW1lTWF0Y2gpIHtcclxuXHRcdFx0XHRcdHV0aWxzLmVhY2godGltZU1hdGNoWzFdLnNwbGl0KC9baG1zXS8pLCBmdW5jdGlvbiAoaSwgdmFsKSB7XHJcblx0XHRcdFx0XHRcdGlmICh2YWwgIT09ICcnKSB7XHJcblx0XHRcdFx0XHRcdFx0dGltZSA9ICh0aW1lICogNjApICsgTnVtYmVyKHZhbCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGlkTWF0Y2ggJiYgL15bYS16QS1aMC05Xy1dezExfSQvLnRlc3QoaWRNYXRjaFsxXSkpIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrKGlkTWF0Y2hbMV0sIHRpbWUpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRsaW5rJywgY29udGVudCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGJ0bikge1xyXG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcclxuXHJcblx0XHRcdGRlZmF1bHRDbWRzLnlvdXR1YmUuX2Ryb3BEb3duKGVkaXRvciwgYnRuLCBmdW5jdGlvbiAoaWQsIHRpbWUpIHtcclxuXHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoX3RtcGwoJ3lvdXR1YmUnLCB7XHJcblx0XHRcdFx0XHRpZDogaWQsXHJcblx0XHRcdFx0XHR0aW1lOiB0aW1lXHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgWW91VHViZSB2aWRlbydcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IERhdGVcclxuXHRkYXRlOiB7XHJcblx0XHRfZGF0ZTogZnVuY3Rpb24gKGVkaXRvcikge1xyXG5cdFx0XHR2YXJcdG5vdyAgID0gbmV3IERhdGUoKSxcclxuXHRcdFx0XHR5ZWFyICA9IG5vdy5nZXRZZWFyKCksXHJcblx0XHRcdFx0bW9udGggPSBub3cuZ2V0TW9udGgoKSArIDEsXHJcblx0XHRcdFx0ZGF5ICAgPSBub3cuZ2V0RGF0ZSgpO1xyXG5cclxuXHRcdFx0aWYgKHllYXIgPCAyMDAwKSB7XHJcblx0XHRcdFx0eWVhciA9IDE5MDAgKyB5ZWFyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobW9udGggPCAxMCkge1xyXG5cdFx0XHRcdG1vbnRoID0gJzAnICsgbW9udGg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkYXkgPCAxMCkge1xyXG5cdFx0XHRcdGRheSA9ICcwJyArIGRheTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGVkaXRvci5lZGl0b3JPcHRpb25zLmRhdGVGb3JtYXRcclxuXHRcdFx0XHQucmVwbGFjZSgveWVhci9pLCB5ZWFyKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC9tb250aC9pLCBtb250aClcclxuXHRcdFx0XHQucmVwbGFjZSgvZGF5L2ksIGRheSk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMuZGF0ZS5fZGF0ZSh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMuZGF0ZS5fZGF0ZSh0aGlzKSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IGRhdGUnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBUaW1lXHJcblx0dGltZToge1xyXG5cdFx0X3RpbWU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyXHRub3cgICA9IG5ldyBEYXRlKCksXHJcblx0XHRcdFx0aG91cnMgPSBub3cuZ2V0SG91cnMoKSxcclxuXHRcdFx0XHRtaW5zICA9IG5vdy5nZXRNaW51dGVzKCksXHJcblx0XHRcdFx0c2VjcyAgPSBub3cuZ2V0U2Vjb25kcygpO1xyXG5cclxuXHRcdFx0aWYgKGhvdXJzIDwgMTApIHtcclxuXHRcdFx0XHRob3VycyA9ICcwJyArIGhvdXJzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAobWlucyA8IDEwKSB7XHJcblx0XHRcdFx0bWlucyA9ICcwJyArIG1pbnM7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChzZWNzIDwgMTApIHtcclxuXHRcdFx0XHRzZWNzID0gJzAnICsgc2VjcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGhvdXJzICsgJzonICsgbWlucyArICc6JyArIHNlY3M7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcclxuXHRcdH0sXHJcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xyXG5cdFx0fSxcclxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgY3VycmVudCB0aW1lJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEx0clxyXG5cdGx0cjoge1xyXG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XHJcblx0XHRcdHJldHVybiBmaXJzdEJsb2NrICYmIGZpcnN0QmxvY2suc3R5bGUuZGlyZWN0aW9uID09PSAnbHRyJztcclxuXHRcdH0sXHJcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhclx0ZWRpdG9yID0gdGhpcyxcclxuXHRcdFx0XHRyYW5nZUhlbHBlciA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxyXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XHJcblxyXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRcdGlmICghbm9kZSB8fCBkb20uaXMobm9kZSwgJ2JvZHknKSkge1xyXG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCAncCcpO1xyXG5cclxuXHRcdFx0XHRub2RlICA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHJcblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdG9nZ2xlVmFsdWUgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ2x0cicgPyAnJyA6ICdsdHInO1xyXG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ0xlZnQtdG8tUmlnaHQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyBTVEFSVF9DT01NQU5EOiBSdGxcclxuXHRydGw6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAocGFyZW50cywgZmlyc3RCbG9jaykge1xyXG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXHJcblx0XHRcdFx0cmFuZ2VIZWxwZXIgPSBlZGl0b3IuZ2V0UmFuZ2VIZWxwZXIoKSxcclxuXHRcdFx0XHRub2RlID0gcmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cclxuXHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblxyXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcclxuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgJ3AnKTtcclxuXHJcblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcclxuXHJcblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdG9nZ2xlVmFsdWUgPSBkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcgPyAnJyA6ICdydGwnO1xyXG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ1JpZ2h0LXRvLUxlZnQnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogUHJpbnRcclxuXHRwcmludDoge1xyXG5cdFx0ZXhlYzogJ3ByaW50JyxcclxuXHRcdHRvb2x0aXA6ICdQcmludCdcclxuXHR9LFxyXG5cdC8vIEVORF9DT01NQU5EXHJcblxyXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IE1heGltaXplXHJcblx0bWF4aW1pemU6IHtcclxuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm1heGltaXplKCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLm1heGltaXplKCF0aGlzLm1heGltaXplKCkpO1xyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHR9LFxyXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLm1heGltaXplKCF0aGlzLm1heGltaXplKCkpO1xyXG5cdFx0XHR0aGlzLmZvY3VzKCk7XHJcblx0XHR9LFxyXG5cdFx0dG9vbHRpcDogJ01heGltaXplJyxcclxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtNJ1xyXG5cdH0sXHJcblx0Ly8gRU5EX0NPTU1BTkRcclxuXHJcblx0Ly8gU1RBUlRfQ09NTUFORDogU291cmNlXHJcblx0c291cmNlOiB7XHJcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zb3VyY2VNb2RlKCk7XHJcblx0XHR9LFxyXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcclxuXHRcdFx0dGhpcy5mb2N1cygpO1xyXG5cdFx0fSxcclxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH0sXHJcblx0XHR0b29sdGlwOiAnVmlldyBzb3VyY2UnLFxyXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K1MnXHJcblx0fSxcclxuXHQvLyBFTkRfQ09NTUFORFxyXG5cclxuXHQvLyB0aGlzIGlzIGhlcmUgc28gdGhhdCBjb21tYW5kcyBhYm92ZSBjYW4gYmUgcmVtb3ZlZFxyXG5cdC8vIHdpdGhvdXQgaGF2aW5nIHRvIHJlbW92ZSB0aGUgLCBhZnRlciB0aGUgbGFzdCBvbmUuXHJcblx0Ly8gTmVlZGVkIGZvciBJRS5cclxuXHRpZ25vcmU6IHt9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0Q21kcztcclxuIiwiaW1wb3J0IHsgYXR0ciB9IGZyb20gJy4vZG9tJztcblxuLyoqXG4gKiBEZWZhdWx0IG9wdGlvbnMgZm9yIEVtbEVkaXRvclxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG5cdC8qKlxuXHQgKiBUb29sYmFyIGJ1dHRvbnMgb3JkZXIgYW5kIGdyb3Vwcy4gU2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmRcblx0ICogaGF2ZSBhIGJhciB8IHRvIHNlcGFyYXRlIGdyb3Vwc1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhcjogJ2JvbGQsaXRhbGljLHVuZGVybGluZSxzdHJpa2Usc3Vic2NyaXB0LHN1cGVyc2NyaXB0fCcgK1xuXHRcdCdsZWZ0LGNlbnRlcixyaWdodCxqdXN0aWZ5fGZvbnQsc2l6ZSxjb2xvcixyZW1vdmVmb3JtYXR8JyArXG5cdFx0J2N1dCxjb3B5LHBhc3RldGV4dHxidWxsZXRsaXN0LG9yZGVyZWRsaXN0LGluZGVudCxvdXRkZW50fCcgK1xuXHRcdCd0YWJsZXxjb2RlLHF1b3RlfGhvcml6b250YWxydWxlLGltYWdlLGVtYWlsLGxpbmssdW5saW5rfCcgK1xuXHRcdCdlbW90aWNvbix5b3V0dWJlLGRhdGUsdGltZXxsdHIscnRsfHByaW50LG1heGltaXplLHNvdXJjZScsXG5cblx0LyoqXG5cdCAqIENvbW1hIHNlcGFyYXRlZCBsaXN0IG9mIGNvbW1hbmRzIHRvIGV4Y2x1ZGVzIGZyb20gdGhlIHRvb2xiYXJcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHRvb2xiYXJFeGNsdWRlOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBTdHlsZXNoZWV0IHRvIGluY2x1ZGUgaW4gdGhlIFdZU0lXWUcgZWRpdG9yLiBUaGlzIGlzIHdoYXQgd2lsbCBzdHlsZVxuXHQgKiB0aGUgV1lTSVdZRyBlbGVtZW50c1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c3R5bGU6ICdqcXVlcnkuZW1sZWRpdG9yLmRlZmF1bHQuY3NzJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgZm9udHMgZm9yIHRoZSBmb250IHNlbGVjdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRmb250czogJ0FyaWFsLEFyaWFsIEJsYWNrLENvbWljIFNhbnMgTVMsQ291cmllciBOZXcsR2VvcmdpYSxJbXBhY3QsJyArXG5cdFx0J1NhbnMtc2VyaWYsU2VyaWYsVGltZXMgTmV3IFJvbWFuLFRyZWJ1Y2hldCBNUyxWZXJkYW5hJyxcblxuXHQvKipcblx0ICogQ29sb3JzIHNob3VsZCBiZSBjb21tYSBzZXBhcmF0ZWQgYW5kIGhhdmUgYSBiYXIgfCB0byBzaWduYWwgYSBuZXdcblx0ICogY29sdW1uLlxuXHQgKlxuXHQgKiBJZiBudWxsIHRoZSBjb2xvcnMgd2lsbCBiZSBhdXRvIGdlbmVyYXRlZC5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGNvbG9yczogJyMwMDAwMDAsIzQ0QjhGRiwjMUU5MkY3LCMwMDc0RDksIzAwNURDMiwjMDAzNjlCLCNiM2Q1ZjR8JyArXG5cdFx0XHQnIzQ0NDQ0NCwjQzNGRkZGLCM5REY5RkYsIzdGREJGRiwjNjhDNEU4LCM0MTlEQzEsI2Q5ZjRmZnwnICtcblx0XHRcdCcjNjY2NjY2LCM3MkZGODQsIzRDRUE1RSwjMkVDQzQwLCMxN0I1MjksIzAwOEUwMiwjYzBmMGM2fCcgK1xuXHRcdFx0JyM4ODg4ODgsI0ZGRkY0NCwjRkZGQTFFLCNGRkRDMDAsI0U4QzUwMCwjQzE5RTAwLCNmZmY1YjN8JyArXG5cdFx0XHQnI2FhYWFhYSwjRkZDOTVGLCNGRkEzMzksI0ZGODUxQiwjRTg2RTA0LCNDMTQ3MDAsI2ZmZGJiYnwnICtcblx0XHRcdCcjY2NjY2NjLCNGRjg1N0EsI0ZGNUY1NCwjRkY0MTM2LCNFODJBMUYsI0MxMDMwMCwjZmZjNmMzfCcgK1xuXHRcdFx0JyNlZWVlZWUsI0ZGNTZGRiwjRkYzMERDLCNGMDEyQkUsI0Q5MDBBNywjQjIwMDgwLCNmYmI4ZWN8JyArXG5cdFx0XHQnI2ZmZmZmZiwjRjU1MUZGLCNDRjJCRTcsI0IxMERDOSwjOUEwMEIyLCM5QTAwQjIsI2U4YjZlZicsXG5cblx0LyoqXG5cdCAqIFRoZSBsb2NhbGUgdG8gdXNlLlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0bG9jYWxlOiBhdHRyKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgJ2xhbmcnKSB8fCAnZW4nLFxuXG5cdC8qKlxuXHQgKiBUaGUgQ2hhcnNldCB0byB1c2Vcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGNoYXJzZXQ6ICd1dGYtOCcsXG5cblx0LyoqXG5cdCAqIENvbXBhdGliaWxpdHkgbW9kZSBmb3IgZW1vdGljb25zLlxuXHQgKlxuXHQgKiBIZWxwcyBpZiB5b3UgaGF2ZSBlbW90aWNvbnMgc3VjaCBhcyA6LyB3aGljaCB3b3VsZCBwdXQgYW4gZW1vdGljb25cblx0ICogaW5zaWRlIGh0dHA6Ly9cblx0ICpcblx0ICogVGhpcyBtb2RlIHJlcXVpcmVzIGVtb3RpY29ucyB0byBiZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2Ugb3IgZW5kIG9mXG5cdCAqIGxpbmUgY2hhcnMuIFRoaXMgbW9kZSBoYXMgbGltaXRlZCBBcyBZb3UgVHlwZSBlbW90aWNvbiBjb252ZXJzaW9uXG5cdCAqIHN1cHBvcnQuIEl0IHdpbGwgbm90IHJlcGxhY2UgQVlUIGZvciBlbmQgb2YgbGluZSBjaGFycywgb25seVxuXHQgKiBlbW90aWNvbnMgc3Vycm91bmRlZCBieSB3aGl0ZXNwYWNlLiBUaGV5IHdpbGwgc3RpbGwgYmUgcmVwbGFjZWRcblx0ICogY29ycmVjdGx5IHdoZW4gbG9hZGVkIGp1c3Qgbm90IEFZVC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRlbW90aWNvbnNDb21wYXQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBlbmFibGUgZW1vdGljb25zLiBDYW4gYmUgY2hhbmdlcyBhdCBydW50aW1lIHVzaW5nIHRoZVxuXHQgKiBlbW90aWNvbnMoKSBtZXRob2QuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKiBAc2luY2UgMS40LjJcblx0ICovXG5cdGVtb3RpY29uc0VuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIEVtb3RpY29uIHJvb3QgVVJMXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRlbW90aWNvbnNSb290OiAnJyxcblx0ZW1vdGljb25zOiB7XG5cdFx0ZHJvcGRvd246IHtcblx0XHRcdCc6KSc6ICdlbW90aWNvbnMvc21pbGUucG5nJyxcblx0XHRcdCc6YW5nZWw6JzogJ2Vtb3RpY29ucy9hbmdlbC5wbmcnLFxuXHRcdFx0JzphbmdyeTonOiAnZW1vdGljb25zL2FuZ3J5LnBuZycsXG5cdFx0XHQnOC0pJzogJ2Vtb3RpY29ucy9jb29sLnBuZycsXG5cdFx0XHQnOlxcJygnOiAnZW1vdGljb25zL2N3eS5wbmcnLFxuXHRcdFx0Jzplcm1tOic6ICdlbW90aWNvbnMvZXJtbS5wbmcnLFxuXHRcdFx0JzpEJzogJ2Vtb3RpY29ucy9ncmluLnBuZycsXG5cdFx0XHQnPDMnOiAnZW1vdGljb25zL2hlYXJ0LnBuZycsXG5cdFx0XHQnOignOiAnZW1vdGljb25zL3NhZC5wbmcnLFxuXHRcdFx0JzpPJzogJ2Vtb3RpY29ucy9zaG9ja2VkLnBuZycsXG5cdFx0XHQnOlAnOiAnZW1vdGljb25zL3Rvbmd1ZS5wbmcnLFxuXHRcdFx0JzspJzogJ2Vtb3RpY29ucy93aW5rLnBuZydcblx0XHR9LFxuXHRcdG1vcmU6IHtcblx0XHRcdCc6YWxpZW46JzogJ2Vtb3RpY29ucy9hbGllbi5wbmcnLFxuXHRcdFx0JzpibGluazonOiAnZW1vdGljb25zL2JsaW5rLnBuZycsXG5cdFx0XHQnOmJsdXNoOic6ICdlbW90aWNvbnMvYmx1c2gucG5nJyxcblx0XHRcdCc6Y2hlZXJmdWw6JzogJ2Vtb3RpY29ucy9jaGVlcmZ1bC5wbmcnLFxuXHRcdFx0JzpkZXZpbDonOiAnZW1vdGljb25zL2RldmlsLnBuZycsXG5cdFx0XHQnOmRpenp5Oic6ICdlbW90aWNvbnMvZGl6enkucG5nJyxcblx0XHRcdCc6Z2V0bG9zdDonOiAnZW1vdGljb25zL2dldGxvc3QucG5nJyxcblx0XHRcdCc6aGFwcHk6JzogJ2Vtb3RpY29ucy9oYXBweS5wbmcnLFxuXHRcdFx0JzpraXNzaW5nOic6ICdlbW90aWNvbnMva2lzc2luZy5wbmcnLFxuXHRcdFx0JzpuaW5qYTonOiAnZW1vdGljb25zL25pbmphLnBuZycsXG5cdFx0XHQnOnBpbmNoOic6ICdlbW90aWNvbnMvcGluY2gucG5nJyxcblx0XHRcdCc6cG91dHk6JzogJ2Vtb3RpY29ucy9wb3V0eS5wbmcnLFxuXHRcdFx0JzpzaWNrOic6ICdlbW90aWNvbnMvc2ljay5wbmcnLFxuXHRcdFx0JzpzaWRld2F5czonOiAnZW1vdGljb25zL3NpZGV3YXlzLnBuZycsXG5cdFx0XHQnOnNpbGx5Oic6ICdlbW90aWNvbnMvc2lsbHkucG5nJyxcblx0XHRcdCc6c2xlZXBpbmc6JzogJ2Vtb3RpY29ucy9zbGVlcGluZy5wbmcnLFxuXHRcdFx0Jzp1bnN1cmU6JzogJ2Vtb3RpY29ucy91bnN1cmUucG5nJyxcblx0XHRcdCc6d29vdDonOiAnZW1vdGljb25zL3cwMHQucG5nJyxcblx0XHRcdCc6d2Fzc2F0Oic6ICdlbW90aWNvbnMvd2Fzc2F0LnBuZydcblx0XHR9LFxuXHRcdGhpZGRlbjoge1xuXHRcdFx0Jzp3aGlzdGxpbmc6JzogJ2Vtb3RpY29ucy93aGlzdGxpbmcucG5nJyxcblx0XHRcdCc6bG92ZTonOiAnZW1vdGljb25zL3d1Yi5wbmcnXG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBXaWR0aCBvZiB0aGUgZWRpdG9yLiBTZXQgdG8gbnVsbCBmb3IgYXV0b21hdGljIHdpdGhcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR3aWR0aDogbnVsbCxcblxuXHQvKipcblx0ICogSGVpZ2h0IG9mIHRoZSBlZGl0b3IgaW5jbHVkaW5nIHRvb2xiYXIuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWNcblx0ICogaGVpZ2h0XG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0aGVpZ2h0OiBudWxsLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhbGxvdyB0aGUgZWRpdG9yIHRvIGJlIHJlc2l6ZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVFbmFibGVkOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBNaW4gcmVzaXplIHRvIHdpZHRoLCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWluV2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBNaW4gcmVzaXplIHRvIGhlaWdodCwgc2V0IHRvIG51bGwgZm9yIGhhbGYgdGV4dGFyZWEgaGVpZ2h0IG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5IZWlnaHQ6IG51bGwsXG5cdC8qKlxuXHQgKiBNYXggcmVzaXplIHRvIGhlaWdodCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSBoZWlnaHQgb3IgLTFcblx0ICogZm9yIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1heEhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBkb3VibGUgdGV4dGFyZWEgd2lkdGggb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1heFdpZHRoOiBudWxsLFxuXHQvKipcblx0ICogSWYgcmVzaXppbmcgYnkgaGVpZ2h0IGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVIZWlnaHQ6IHRydWUsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSB3aWR0aCBpcyBlbmFibGVkXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cmVzaXplV2lkdGg6IHRydWUsXG5cblx0LyoqXG5cdCAqIERhdGUgZm9ybWF0LCB3aWxsIGJlIG92ZXJyaWRkZW4gaWYgbG9jYWxlIHNwZWNpZmllcyBvbmUuXG5cdCAqXG5cdCAqIFRoZSB3b3JkcyB5ZWFyLCBtb250aCBhbmQgZGF5IHdpbGwgYmUgcmVwbGFjZWQgd2l0aCB0aGUgdXNlcnMgY3VycmVudFxuXHQgKiB5ZWFyLCBtb250aCBhbmQgZGF5LlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0ZGF0ZUZvcm1hdDogJ3llYXItbW9udGgtZGF5JyxcblxuXHQvKipcblx0ICogRWxlbWVudCB0byBpbnNldCB0aGUgdG9vbGJhciBpbnRvLlxuXHQgKlxuXHQgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG5cdCAqL1xuXHR0b29sYmFyQ29udGFpbmVyOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBlbmFibGUgcGFzdGUgZmlsdGVyaW5nLiBUaGlzIGlzIGN1cnJlbnRseSBleHBlcmltZW50YWwsIHBsZWFzZVxuXHQgKiByZXBvcnQgYW55IGlzc3Vlcy5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRlbmFibGVQYXN0ZUZpbHRlcmluZzogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGNvbXBsZXRlbHkgZGlzYWJsZSBwYXN0aW5nIGludG8gdGhlIGVkaXRvclxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVQYXN0aW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHkuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cmVhZE9ubHk6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBzZXQgdGhlIGVkaXRvciB0byByaWdodC10by1sZWZ0IG1vZGUuXG5cdCAqXG5cdCAqIElmIHNldCB0byBudWxsIHRoZSBkaXJlY3Rpb24gd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGRldGVjdGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ0bDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciBvbiBwYWdlIGxvYWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvZm9jdXM6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGZvY3VzIHRoZSBlZGl0b3IgdG8gdGhlIGVuZCBvZiB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1c0VuZDogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBleHBhbmQgdGhlIGVkaXRvciB0byBmaXggdGhlIGNvbnRlbnRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvRXhwYW5kOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byB1cGRhdGUgb3JpZ2luYWwgdGV4dGJveCBvbiBibHVyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b1VwZGF0ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSB0aGUgYnJvd3NlcnMgYnVpbHQgaW4gc3BlbGwgY2hlY2tlclxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHNwZWxsY2hlY2s6IHRydWUsXG5cblx0LyoqXG5cdCAqIElmIHRvIHJ1biB0aGUgc291cmNlIGVkaXRvciB3aGVuIHRoZXJlIGlzIG5vIFdZU0lXWUcgc3VwcG9ydC4gT25seVxuXHQgKiByZWFsbHkgYXBwbGllcyB0byBtb2JpbGUgT1Mncy5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRydW5XaXRob3V0V3lzaXd5Z1N1cHBvcnQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBsb2FkIHRoZSBlZGl0b3IgaW4gc291cmNlIG1vZGUgYW5kIHN0aWxsIGFsbG93IHN3aXRjaGluZ1xuXHQgKiBiZXR3ZWVuIFdZU0lXWUcgYW5kIHNvdXJjZSBtb2RlXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3RhcnRJblNvdXJjZU1vZGU6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBPcHRpb25hbCBJRCB0byBnaXZlIHRoZSBlZGl0b3IuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRpZDogbnVsbCxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgcGx1Z2luc1xuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0cGx1Z2luczogJycsXG5cblx0LyoqXG5cdCAqIHotaW5kZXggdG8gc2V0IHRoZSBlZGl0b3IgY29udGFpbmVyIHRvLiBOZWVkZWQgZm9yIGpRdWVyeSBVSSBkaWFsb2cuXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0ekluZGV4OiBudWxsLFxuXG5cdC8qKlxuXHQgKiBJZiB0byB0cmltIHRoZSBCQkNvZGUuIFJlbW92ZXMgYW55IHNwYWNlcyBhdCB0aGUgc3RhcnQgYW5kIGVuZCBvZiB0aGVcblx0ICogQkJDb2RlIHN0cmluZy5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRiYmNvZGVUcmltOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZGlzYWJsZSByZW1vdmluZyBibG9jayBsZXZlbCBlbGVtZW50cyBieSBwcmVzc2luZyBiYWNrc3BhY2UgYXRcblx0ICogdGhlIHN0YXJ0IG9mIHRoZW1cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRkaXNhYmxlQmxvY2tSZW1vdmU6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBBcnJheSBvZiBhbGxvd2VkIFVSTCAoc2hvdWxkIGJlIGVpdGhlciBzdHJpbmdzIG9yIHJlZ2V4KSBmb3IgaWZyYW1lcy5cblx0ICpcblx0ICogSWYgaXQncyBhIHN0cmluZyB0aGVuIGlmcmFtZXMgd2hlcmUgdGhlIHN0YXJ0IG9mIHRoZSBzcmMgbWF0Y2hlcyB0aGVcblx0ICogc3BlY2lmaWVkIHN0cmluZyB3aWxsIGJlIGFsbG93ZWQuXG5cdCAqXG5cdCAqIElmIGl0J3MgYSByZWdleCB0aGVuIGlmcmFtZXMgd2hlcmUgdGhlIHNyYyBtYXRjaGVzIHRoZSByZWdleCB3aWxsIGJlXG5cdCAqIGFsbG93ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICovXG5cdGFsbG93ZWRJZnJhbWVVcmxzOiBbXSxcblxuXHQvKipcblx0ICogQkJDb2RlIHBhcnNlciBvcHRpb25zLCBvbmx5IGFwcGxpZXMgaWYgdXNpbmcgdGhlIGVkaXRvciBpbiBCQkNvZGVcblx0ICogbW9kZS5cblx0ICpcblx0ICogU2VlIEVtbEVkaXRvci5CQkNvZGVQYXJzZXIuZGVmYXVsdHMgZm9yIGxpc3Qgb2YgdmFsaWQgb3B0aW9uc1xuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0cGFyc2VyT3B0aW9uczogeyB9LFxuXG5cdC8qKlxuXHQgKiBDU1MgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSB0byBkcm9wZG93biBtZW51IChlZy4gei1pbmRleClcblx0ICpcblx0ICogQHR5cGUge09iamVjdH1cblx0ICovXG5cdGRyb3BEb3duQ3NzOiB7IH0sXG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIHRhZ3MgdGhhdCBhcmUgYWxsb3dlZCBpbiB0aGUgZWRpdG9yIGNvbnRlbnQuXG5cdCAqIElmIGEgdGFnIGlzIG5vdCBsaXN0ZWQgaGVyZSwgaXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIGNvbnRlbnQgaXNcblx0ICogc2FuaXRpemVkLlxuXHQgKlxuXHQgKiAxIFRhZyBpcyBhbHJlYWR5IGFkZGVkIGJ5IGRlZmF1bHQ6IFsnaWZyYW1lJ10uIE5vIG5lZWQgdG8gYWRkIHRoaXNcblx0ICogZnVydGhlci5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZFRhZ3M6IFtdLFxuXG5cdC8qKlxuXHQgKiBBbiBhcnJheSBvZiBhdHRyaWJ1dGVzIHRoYXQgYXJlIGFsbG93ZWQgb24gdGFncyBpbiB0aGUgZWRpdG9yIGNvbnRlbnQuXG5cdCAqIElmIGFuIGF0dHJpYnV0ZSBpcyBub3QgbGlzdGVkIGhlcmUsIGl0IHdpbGwgYmUgcmVtb3ZlZCB3aGVuIHRoZSBjb250ZW50XG5cdCAqIGlzIHNhbml0aXplZC5cblx0ICpcblx0ICogMyBBdHRyaWJ1dGVzIGFyZSBhbHJlYWR5IGFkZGVkIGJ5IGRlZmF1bHQ6XG5cdCAqIFx0WydhbGxvd2Z1bGxzY3JlZW4nLCAnZnJhbWVib3JkZXInLCAndGFyZ2V0J10uXG5cdCAqIE5vIG5lZWQgdG8gYWRkIHRoZXNlIGZ1cnRoZXIuXG5cdCAqXG5cdCAqIEB0eXBlIHtBcnJheX1cblx0ICovXG5cdGFsbG93ZWRBdHRyaWJ1dGVzOiBbXVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdE9wdGlvbnM7XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuXG4vKipcbiAqIENoZWNrcyBhbGwgZW1vdGljb25zIGFyZSBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UgYW5kXG4gKiByZXBsYWNlcyBhbnkgdGhhdCBhcmVuJ3Qgd2l0aCB3aXRoIHRoZWlyIGVtb3RpY29uIGNvZGUuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxuICogQHBhcmFtIHtyYW5nZUhlbHBlcn0gcmFuZ2VIZWxwZXJcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1doaXRlc3BhY2Uobm9kZSwgcmFuZ2VIZWxwZXIpIHtcblx0dmFyIG5vbmVXc1JlZ2V4ID0gL1teXFxzXFx4QTBcXHUyMDAyXFx1MjAwM1xcdTIwMDldKy87XG5cdHZhciBlbW90aWNvbnMgPSBub2RlICYmIGRvbS5maW5kKG5vZGUsICdpbWdbZGF0YS1lbWxlZGl0b3ItZW1vdGljb25dJyk7XG5cblx0aWYgKCFub2RlIHx8ICFlbW90aWNvbnMubGVuZ3RoKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbW90aWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgZW1vdGljb24gPSBlbW90aWNvbnNbaV07XG5cdFx0dmFyIHBhcmVudCA9IGVtb3RpY29uLnBhcmVudE5vZGU7XG5cdFx0dmFyIHByZXYgPSBlbW90aWNvbi5wcmV2aW91c1NpYmxpbmc7XG5cdFx0dmFyIG5leHQgPSBlbW90aWNvbi5uZXh0U2libGluZztcblxuXHRcdGlmICgoIXByZXYgfHwgIW5vbmVXc1JlZ2V4LnRlc3QocHJldi5ub2RlVmFsdWUuc2xpY2UoLTEpKSkgJiZcblx0XHRcdCghbmV4dCB8fCAhbm9uZVdzUmVnZXgudGVzdCgobmV4dC5ub2RlVmFsdWUgfHwgJycpWzBdKSkpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciByYW5nZSA9IHJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcblx0XHR2YXIgcmFuZ2VTdGFydCA9IC0xO1xuXHRcdHZhciByYW5nZVN0YXJ0Q29udGFpbmVyID0gcmFuZ2Uuc3RhcnRDb250YWluZXI7XG5cdFx0dmFyIHByZXZpb3VzVGV4dCA9IChwcmV2ICYmIHByZXYubm9kZVZhbHVlKSB8fCAnJztcblxuXHRcdHByZXZpb3VzVGV4dCArPSBkb20uZGF0YShlbW90aWNvbiwgJ2VtbGVkaXRvci1lbW90aWNvbicpO1xuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBhZnRlciB0aGUgcmVtb3ZlZCBlbW90aWNvbiwgYWRkXG5cdFx0Ly8gdGhlIGxlbmd0aCBvZiB0aGUgbmV3bHkgYWRkZWQgdGV4dCB0byBpdFxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBuZXh0KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcHJldmlvdXNUZXh0Lmxlbmd0aCArIHJhbmdlLnN0YXJ0T2Zmc2V0O1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgc2V0IGJlZm9yZSB0aGUgbmV4dCBub2RlLCBzZXQgaXQgdG9cblx0XHQvLyB0aGUgZW5kIG9mIHRoZSBuZXcgdGV4dCBub2RlXG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IG5vZGUgJiZcblx0XHRcdG5vZGUuY2hpbGROb2Rlc1tyYW5nZS5zdGFydE9mZnNldF0gPT09IG5leHQpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSBwcmV2aW91c1RleHQubGVuZ3RoO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBjdXJzb3IgaXMgc2V0IGJlZm9yZSB0aGUgcmVtb3ZlZCBlbW90aWNvbixcblx0XHQvLyBqdXN0IGtlZXAgaXQgYXQgdGhhdCBwb3NpdGlvblxuXHRcdGlmIChyYW5nZVN0YXJ0Q29udGFpbmVyID09PSBwcmV2KSB7XG5cdFx0XHRyYW5nZVN0YXJ0ID0gcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0aWYgKCFuZXh0IHx8IG5leHQubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUpIHtcblx0XHRcdG5leHQgPSBwYXJlbnQuaW5zZXJ0QmVmb3JlKFxuXHRcdFx0XHRwYXJlbnQub3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyksIG5leHRcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0bmV4dC5pbnNlcnREYXRhKDAsIHByZXZpb3VzVGV4dCk7XG5cdFx0ZG9tLnJlbW92ZShlbW90aWNvbik7XG5cdFx0aWYgKHByZXYpIHtcblx0XHRcdGRvbS5yZW1vdmUocHJldik7XG5cdFx0fVxuXG5cdFx0Ly8gTmVlZCB0byB1cGRhdGUgdGhlIHJhbmdlIHN0YXJ0aW5nIHBvc2l0aW9uIGlmIGl0J3MgYmVlbiBtb2RpZmllZFxuXHRcdGlmIChyYW5nZVN0YXJ0ID4gLTEpIHtcblx0XHRcdHJhbmdlLnNldFN0YXJ0KG5leHQsIHJhbmdlU3RhcnQpO1xuXHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0XHRyYW5nZUhlbHBlci5zZWxlY3RSYW5nZShyYW5nZSk7XG5cdFx0fVxuXHR9XG59XG5cbi8qKlxuICogUmVwbGFjZXMgYW55IGVtb3RpY29ucyBpbnNpZGUgdGhlIHJvb3Qgbm9kZSB3aXRoIGltYWdlcy5cbiAqXG4gKiBlbW90aWNvbnMgc2hvdWxkIGJlIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5IGlzIHRoZSBlbW90aWNvblxuICogY29kZSBhbmQgdGhlIHZhbHVlIGlzIHRoZSBIVE1MIHRvIHJlcGxhY2UgaXQgd2l0aC5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByb290XG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZz59IGVtb3RpY29uc1xuICogQHBhcmFtIHtib29sZWFufSBlbW90aWNvbnNDb21wYXRcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlKHJvb3QsIGVtb3RpY29ucywgZW1vdGljb25zQ29tcGF0KSB7XG5cdHZhclx0ZG9jICAgICAgICAgICA9IHJvb3Qub3duZXJEb2N1bWVudDtcblx0dmFyIHNwYWNlICAgICAgICAgPSAnKF58XFxcXHN8XFx4QTB8XFx1MjAwMnxcXHUyMDAzfFxcdTIwMDl8JCknO1xuXHR2YXIgZW1vdGljb25Db2RlcyA9IFtdO1xuXHR2YXIgZW1vdGljb25SZWdleCA9IHt9O1xuXG5cdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxuXHRpZiAoZG9tLnBhcmVudChyb290LCAnY29kZScpKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbW90aWNvblJlZ2V4W2tleV0gPSBuZXcgUmVnRXhwKHNwYWNlICsgZXNjYXBlLnJlZ2V4KGtleSkgKyBzcGFjZSk7XG5cdFx0ZW1vdGljb25Db2Rlcy5wdXNoKGtleSk7XG5cdH0pO1xuXG5cdC8vIFNvcnQga2V5cyBsb25nZXN0IHRvIHNob3J0ZXN0IHNvIHRoYXQgbG9uZ2VyIGtleXNcblx0Ly8gdGFrZSBwcmVjZWRlbmNlIChhdm9pZHMgYnVncyB3aXRoIHNob3J0ZXIga2V5cyBwYXJ0aWFsbHlcblx0Ly8gbWF0Y2hpbmcgbG9uZ2VyIG9uZXMpXG5cdGVtb3RpY29uQ29kZXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoO1xuXHR9KTtcblxuXHQoZnVuY3Rpb24gY29udmVydChub2RlKSB7XG5cdFx0bm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcblxuXHRcdHdoaWxlIChub2RlKSB7XG5cdFx0XHQvLyBUT0RPOiBNYWtlIHRoaXMgdGFnIGNvbmZpZ3VyYWJsZS5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmICFkb20uaXMobm9kZSwgJ2NvZGUnKSkge1xuXHRcdFx0XHRjb252ZXJ0KG5vZGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSkge1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RpY29uQ29kZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR2YXIgdGV4dCAgPSBub2RlLm5vZGVWYWx1ZTtcblx0XHRcdFx0XHR2YXIga2V5ICAgPSBlbW90aWNvbkNvZGVzW2ldO1xuXHRcdFx0XHRcdHZhciBpbmRleCA9IGVtb3RpY29uc0NvbXBhdCA/XG5cdFx0XHRcdFx0XHR0ZXh0LnNlYXJjaChlbW90aWNvblJlZ2V4W2tleV0pIDpcblx0XHRcdFx0XHRcdHRleHQuaW5kZXhPZihrZXkpO1xuXG5cdFx0XHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcblx0XHRcdFx0XHRcdC8vIFdoZW4gZW1vdGljb25zQ29tcGF0IGlzIGVuYWJsZWQgdGhpcyB3aWxsIGJlIHRoZVxuXHRcdFx0XHRcdFx0Ly8gcG9zaXRpb24gYWZ0ZXIgYW55IHdoaXRlIHNwYWNlXG5cdFx0XHRcdFx0XHR2YXIgc3RhcnRJbmRleCA9IHRleHQuaW5kZXhPZihrZXksIGluZGV4KTtcblx0XHRcdFx0XHRcdHZhciBmcmFnbWVudCAgID0gZG9tLnBhcnNlSFRNTChlbW90aWNvbnNba2V5XSwgZG9jKTtcblx0XHRcdFx0XHRcdHZhciBhZnRlciAgICAgID0gdGV4dC5zdWJzdHIoc3RhcnRJbmRleCArIGtleS5sZW5ndGgpO1xuXG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoYWZ0ZXIpKTtcblxuXHRcdFx0XHRcdFx0bm9kZS5ub2RlVmFsdWUgPSB0ZXh0LnN1YnN0cigwLCBzdGFydEluZGV4KTtcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50Tm9kZVxuXHRcdFx0XHRcdFx0XHQuaW5zZXJ0QmVmb3JlKGZyYWdtZW50LCBub2RlLm5leHRTaWJsaW5nKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG5cdFx0fVxuXHR9KHJvb3QpKTtcbn1cbiIsIi8vIE11c3Qgc3RhcnQgd2l0aCBhIHZhbGlkIHNjaGVtZVxyXG4vLyBcdFx0XlxyXG4vLyBTY2hlbWVzIHRoYXQgYXJlIGNvbnNpZGVyZWQgc2FmZVxyXG4vLyBcdFx0KGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fFxyXG4vLyBSZWxhdGl2ZSBzY2hlbWVzICgvLzopIGFyZSBjb25zaWRlcmVkIHNhZmVcclxuLy8gXHRcdChcXFxcL1xcXFwvKXxcclxuLy8gSW1hZ2UgZGF0YSBVUkkncyBhcmUgY29uc2lkZXJlZCBzYWZlXHJcbi8vIFx0XHRkYXRhOmltYWdlXFxcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7XHJcbnZhciBWQUxJRF9TQ0hFTUVfUkVHRVggPVxyXG5cdC9eKGh0dHBzP3xzP2Z0cHxtYWlsdG98c3BvdGlmeXxza3lwZXxzc2h8dGVhbXNwZWFrfHRlbCk6fChcXC9cXC8pfGRhdGE6aW1hZ2VcXC8ocG5nfGJtcHxnaWZ8cD9qcGU/Zyk7L2k7XHJcblxyXG4vKipcclxuICogRXNjYXBlcyBhIHN0cmluZyBzbyBpdCdzIHNhZmUgdG8gdXNlIGluIHJlZ2V4XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2V4KHN0cikge1xyXG5cdHJldHVybiBzdHIucmVwbGFjZSgvKFstLiorP149IToke30oKXxbXFxdL1xcXFxdKS9nLCAnXFxcXCQxJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGFsbCBIVE1MIGVudGl0aWVzIGluIGEgc3RyaW5nXHJcbiAqXHJcbiAqIElmIG5vUXVvdGVzIGlzIHNldCB0byBmYWxzZSwgYWxsIHNpbmdsZSBhbmQgZG91YmxlXHJcbiAqIHF1b3RlcyB3aWxsIGFsc28gYmUgZXNjYXBlZFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW25vUXVvdGVzPXRydWVdXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogQHNpbmNlIDEuNC4xXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZW50aXRpZXMoc3RyLCBub1F1b3Rlcykge1xyXG5cdGlmICghc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH1cclxuXHJcblx0dmFyIHJlcGxhY2VtZW50cyA9IHtcclxuXHRcdCcmJzogJyZhbXA7JyxcclxuXHRcdCc8JzogJyZsdDsnLFxyXG5cdFx0Jz4nOiAnJmd0OycsXHJcblx0XHQnICAnOiAnJm5ic3A7ICcsXHJcblx0XHQnXFxyXFxuJzogJzxiciAvPicsXHJcblx0XHQnXFxyJzogJzxiciAvPicsXHJcblx0XHQnXFxuJzogJzxiciAvPidcclxuXHR9O1xyXG5cclxuXHRpZiAobm9RdW90ZXMgIT09IGZhbHNlKSB7XHJcblx0XHRyZXBsYWNlbWVudHNbJ1wiJ10gID0gJyYjMzQ7JztcclxuXHRcdHJlcGxhY2VtZW50c1snXFwnJ10gPSAnJiMzOTsnO1xyXG5cdFx0cmVwbGFjZW1lbnRzWydgJ10gID0gJyYjOTY7JztcclxuXHR9XHJcblxyXG5cdHN0ciA9IHN0ci5yZXBsYWNlKC8gezJ9fFxcclxcbnxbJjw+XFxyXFxuJ1wiYF0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XHJcblx0XHRyZXR1cm4gcmVwbGFjZW1lbnRzW21hdGNoXSB8fCBtYXRjaDtcclxuXHR9KTtcclxuXHJcblx0cmV0dXJuIHN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZSBVUkkgc2NoZW1lLlxyXG4gKlxyXG4gKiBBcHBlbmRzIHRoZSBjdXJyZW50IFVSTCB0byBhIHVybCBpZiBpdCBoYXMgYSBzY2hlbWUgdGhhdCBpcyBub3Q6XHJcbiAqXHJcbiAqIGh0dHBcclxuICogaHR0cHNcclxuICogc2Z0cFxyXG4gKiBmdHBcclxuICogbWFpbHRvXHJcbiAqIHNwb3RpZnlcclxuICogc2t5cGVcclxuICogc3NoXHJcbiAqIHRlYW1zcGVha1xyXG4gKiB0ZWxcclxuICogLy9cclxuICogZGF0YTppbWFnZS8ocG5nfGpwZWd8anBnfHBqcGVnfGJtcHxnaWYpO1xyXG4gKlxyXG4gKiAqKklNUE9SVEFOVCoqOiBUaGlzIGRvZXMgbm90IGVzY2FwZSBhbnkgSFRNTCBpbiBhIHVybCwgZm9yXHJcbiAqIHRoYXQgdXNlIHRoZSBlc2NhcGUuZW50aXRpZXMoKSBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gdXJsXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogQHNpbmNlIDEuNC41XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXJpU2NoZW1lKHVybCkge1xyXG5cdHZhclx0cGF0aCxcclxuXHRcdC8vIElmIHRoZXJlIGlzIGEgOiBiZWZvcmUgYSAvIHRoZW4gaXQgaGFzIGEgc2NoZW1lXHJcblx0XHRoYXNTY2hlbWUgPSAvXlteL10qOi9pLFxyXG5cdFx0bG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcblxyXG5cdC8vIEhhcyBubyBzY2hlbWUgb3IgYSB2YWxpZCBzY2hlbWVcclxuXHRpZiAoKCF1cmwgfHwgIWhhc1NjaGVtZS50ZXN0KHVybCkpIHx8IFZBTElEX1NDSEVNRV9SRUdFWC50ZXN0KHVybCkpIHtcclxuXHRcdHJldHVybiB1cmw7XHJcblx0fVxyXG5cclxuXHRwYXRoID0gbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcclxuXHRwYXRoLnBvcCgpO1xyXG5cclxuXHRyZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICtcclxuXHRcdGxvY2F0aW9uLmhvc3QgK1xyXG5cdFx0cGF0aC5qb2luKCcvJykgKyAnLycgK1xyXG5cdFx0dXJsO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbSc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEhUTUwgdGVtcGxhdGVzIHVzZWQgYnkgdGhlIGVkaXRvciBhbmQgZGVmYXVsdCBjb21tYW5kc1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmFyIF90ZW1wbGF0ZXMgPSB7XHJcblx0aHRtbDpcclxuXHRcdCc8IURPQ1RZUEUgaHRtbD4nICtcclxuXHRcdCc8aHRtbHthdHRyc30+JyArXHJcblx0XHRcdCc8aGVhZD4nICtcclxuXHRcdFx0XHQnPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiICcgK1xyXG5cdFx0XHRcdFx0J2NvbnRlbnQ9XCJ0ZXh0L2h0bWw7Y2hhcnNldD17Y2hhcnNldH1cIiAvPicgK1xyXG5cdFx0XHRcdCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIntzdHlsZX1cIiAvPicgK1xyXG5cdFx0XHQnPC9oZWFkPicgK1xyXG5cdFx0XHQnPGJvZHkgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiIHtzcGVsbGNoZWNrfT48cD48L3A+PC9ib2R5PicgK1xyXG5cdFx0JzwvaHRtbD4nLFxyXG5cclxuXHR0b29sYmFyQnV0dG9uOiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItYnV0dG9uIGVtbGVkaXRvci1idXR0b24te25hbWV9XCIgJyArXHJcblx0XHQnZGF0YS1lbWxlZGl0b3ItY29tbWFuZD1cIntuYW1lfVwiIHVuc2VsZWN0YWJsZT1cIm9uXCI+JyArXHJcblx0XHQnPGRpdiB1bnNlbGVjdGFibGU9XCJvblwiPntkaXNwTmFtZX08L2Rpdj48L2E+JyxcclxuXHJcblx0ZW1vdGljb246ICc8aW1nIHNyYz1cInt1cmx9XCIgZGF0YS1lbWxlZGl0b3ItZW1vdGljb249XCJ7a2V5fVwiICcgK1xyXG5cdFx0J2FsdD1cIntrZXl9XCIgdGl0bGU9XCJ7dG9vbHRpcH1cIiAvPicsXHJcblxyXG5cdGZvbnRPcHQ6ICc8YSBjbGFzcz1cImVtbGVkaXRvci1mb250LW9wdGlvblwiIGhyZWY9XCIjXCIgJyArXHJcblx0XHQnZGF0YS1mb250PVwie2ZvbnR9XCI+PGZvbnQgZmFjZT1cIntmb250fVwiPntmb250fTwvZm9udD48L2E+JyxcclxuXHJcblx0c2l6ZU9wdDogJzxhIGNsYXNzPVwiZW1sZWRpdG9yLWZvbnRzaXplLW9wdGlvblwiIGRhdGEtc2l6ZT1cIntzaXplfVwiICcgK1xyXG5cdFx0J2hyZWY9XCIjXCI+PGZvbnQgc2l6ZT1cIntzaXplfVwiPntzaXplfTwvZm9udD48L2E+JyxcclxuXHJcblx0cGFzdGV0ZXh0OlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInR4dFwiPntsYWJlbH08L2xhYmVsPiAnICtcclxuXHRcdFx0Jzx0ZXh0YXJlYSBjb2xzPVwiMjBcIiByb3dzPVwiN1wiIGlkPVwidHh0XCI+PC90ZXh0YXJlYT48L2Rpdj4nICtcclxuXHRcdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xyXG5cdFx0JzwvZGl2PicsXHJcblxyXG5cdHRhYmxlOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cInJvd3NcIj57cm93c308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xyXG5cdFx0XHQnaWQ9XCJyb3dzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJjb2xzXCI+e2NvbHN9PC9sYWJlbD48aW5wdXQgdHlwZT1cInRleHRcIiAnICtcclxuXHRcdFx0J2lkPVwiY29sc1wiIHZhbHVlPVwiMlwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiJyArXHJcblx0XHRcdCcgLz48L2Rpdj4nLFxyXG5cclxuXHRpbWFnZTpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJpbWFnZVwiPnt1cmx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImltYWdlXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwid2lkdGhcIj57d2lkdGh9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIndpZHRoXCIgc2l6ZT1cIjJcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImhlaWdodFwiPntoZWlnaHR9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImhlaWdodFwiIHNpemU9XCIyXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcclxuXHRcdFx0JzwvZGl2PicsXHJcblxyXG5cdGVtYWlsOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImVtYWlsXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbWFpbFwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZGVzXCI+e2Rlc2N9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXHJcblx0XHRcdCc8L2Rpdj4nLFxyXG5cclxuXHRsaW5rOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImxpbmtcIj57dXJsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZGVzXCI+e2Rlc2N9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlc1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zfVwiIC8+PC9kaXY+JyxcclxuXHJcblx0eW91dHViZU1lbnU6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPntsYWJlbH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibGlua1wiIGRpcj1cImx0clwiIHBsYWNlaG9sZGVyPVwiaHR0cHM6Ly9cIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xyXG5cdFx0XHQnPC9kaXY+JyxcclxuXHJcblx0eW91dHViZTpcclxuXHRcdCc8aWZyYW1lIHdpZHRoPVwiNTYwXCIgaGVpZ2h0PVwiMzE1XCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3dmdWxsc2NyZWVuICcgK1xyXG5cdFx0J3NyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tL2VtYmVkL3tpZH0/d21vZGU9b3BhcXVlJnN0YXJ0PXt0aW1lfVwiICcgK1xyXG5cdFx0J2RhdGEteW91dHViZS1pZD1cIntpZH1cIj48L2lmcmFtZT4nXHJcbn07XHJcblxyXG4vKipcclxuICogUmVwbGFjZXMgYW55IHBhcmFtcyBpbiBhIHRlbXBsYXRlIHdpdGggdGhlIHBhc3NlZCBwYXJhbXMuXHJcbiAqXHJcbiAqIElmIGNyZWF0ZUh0bWwgaXMgcGFzc2VkIGl0IHdpbGwgcmV0dXJuIGEgRG9jdW1lbnRGcmFnbWVudFxyXG4gKiBjb250YWluaW5nIHRoZSBwYXJzZWQgdGVtcGxhdGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcGFyYW1zXVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjcmVhdGVIdG1sXVxyXG4gKiBAcmV0dXJucyB7YW55fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGVtcGxhdGVzIChuYW1lLCBwYXJhbXMsIGNyZWF0ZUh0bWwpIHtcclxuXHR2YXIgdGVtcGxhdGUgPSBfdGVtcGxhdGVzW25hbWVdO1xyXG5cclxuXHRPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShcclxuXHRcdFx0bmV3IFJlZ0V4cChlc2NhcGUucmVnZXgoJ3snICsgbmFtZSArICd9JyksICdnJyksIHBhcmFtc1tuYW1lXVxyXG5cdFx0KTtcclxuXHR9KTtcclxuXHJcblx0aWYgKGNyZWF0ZUh0bWwpIHtcclxuXHRcdHRlbXBsYXRlID0gZG9tLnBhcnNlSFRNTCh0ZW1wbGF0ZSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGVtcGxhdGU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgdGhlXHJcbiAqIHRoZSBwYXNzZWQgdHlwZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICogQHBhcmFtIHsqfSBhcmdcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBpc1R5cGVvZih0eXBlLCBhcmcpIHtcclxuXHRyZXR1cm4gdHlwZW9mIGFyZyA9PT0gdHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNTdHJpbmcgPSBpc1R5cGVvZi5iaW5kKG51bGwsICdzdHJpbmcnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzVW5kZWZpbmVkID0gaXNUeXBlb2YuYmluZChudWxsLCAndW5kZWZpbmVkJyk7XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc0Z1bmN0aW9uID0gaXNUeXBlb2YuYmluZChudWxsLCAnZnVuY3Rpb24nKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzTnVtYmVyID0gaXNUeXBlb2YuYmluZChudWxsLCAnbnVtYmVyJyk7XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBhbiBvYmplY3QgaGFzIG5vIGtleXNcclxuICpcclxuICogQHBhcmFtIHshT2JqZWN0fSBvYmpcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eU9iamVjdChvYmopIHtcclxuXHRyZXR1cm4gIU9iamVjdC5rZXlzKG9iaikubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogRXh0ZW5kcyB0aGUgZmlyc3Qgb2JqZWN0IHdpdGggYW55IGV4dHJhIG9iamVjdHMgcGFzc2VkXHJcbiAqXHJcbiAqIElmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBib29sZWFuIGFuZCBzZXQgdG8gdHJ1ZVxyXG4gKiBpdCB3aWxsIGV4dGVuZCBjaGlsZCBhcnJheXMgYW5kIG9iamVjdHMgcmVjdXJzaXZlbHkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdHxib29sZWFufSB0YXJnZXRBcmdcclxuICogQHBhcmFtIHsuLi5PYmplY3R9IHNvdXJjZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHRhcmdldEFyZywgc291cmNlQXJnKSB7XHJcblx0dmFyIGlzVGFyZ2V0Qm9vbGVhbiA9IHRhcmdldEFyZyA9PT0gISF0YXJnZXRBcmc7XHJcblx0dmFyIGkgICAgICA9IGlzVGFyZ2V0Qm9vbGVhbiA/IDIgOiAxO1xyXG5cdHZhciB0YXJnZXQgPSBpc1RhcmdldEJvb2xlYW4gPyBzb3VyY2VBcmcgOiB0YXJnZXRBcmc7XHJcblx0dmFyIGlzRGVlcCA9IGlzVGFyZ2V0Qm9vbGVhbiA/IHRhcmdldEFyZyA6IGZhbHNlO1xyXG5cclxuXHRmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xyXG5cdFx0cmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcclxuXHRcdFx0T2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcclxuXHR9XHJcblxyXG5cdGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xyXG5cclxuXHRcdC8vIENvcHkgYWxsIHByb3BlcnRpZXMgZm9yIGpRdWVyeSBjb21wYXRpYmlsaXR5XHJcblx0XHQvKiBlc2xpbnQgZ3VhcmQtZm9yLWluOiBvZmYgKi9cclxuXHRcdGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcclxuXHRcdFx0dmFyIHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XHJcblx0XHRcdHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xyXG5cclxuXHRcdFx0Ly8gU2tpcCB1bmRlZmluZWQgdmFsdWVzIHRvIG1hdGNoIGpRdWVyeVxyXG5cdFx0XHRpZiAoaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNraXAgc3BlY2lhbCBrZXlzIHRvIHByZXZlbnQgcHJvdG90eXBlIHBvbGx1dGlvblxyXG5cdFx0XHRpZiAoa2V5ID09PSAnX19wcm90b19fJyB8fCBrZXkgPT09ICdjb25zdHJ1Y3RvcicpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGlzVmFsdWVPYmplY3QgPSBpc09iamVjdCh2YWx1ZSk7XHJcblx0XHRcdHZhciBpc1ZhbHVlQXJyYXkgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcclxuXHJcblx0XHRcdGlmIChpc0RlZXAgJiYgKGlzVmFsdWVPYmplY3QgfHwgaXNWYWx1ZUFycmF5KSkge1xyXG5cdFx0XHRcdC8vIENhbiBvbmx5IG1lcmdlIGlmIHRhcmdldCB0eXBlIG1hdGNoZXMgb3RoZXJ3aXNlIGNyZWF0ZVxyXG5cdFx0XHRcdC8vIG5ldyB0YXJnZXQgdG8gbWVyZ2UgaW50b1xyXG5cdFx0XHRcdHZhciBpc1NhbWVUeXBlID0gaXNPYmplY3QodGFyZ2V0VmFsdWUpID09PSBpc1ZhbHVlT2JqZWN0ICYmXHJcblx0XHRcdFx0XHRBcnJheS5pc0FycmF5KHRhcmdldFZhbHVlKSA9PT0gaXNWYWx1ZUFycmF5O1xyXG5cclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IGV4dGVuZChcclxuXHRcdFx0XHRcdHRydWUsXHJcblx0XHRcdFx0XHRpc1NhbWVUeXBlID8gdGFyZ2V0VmFsdWUgOiAoaXNWYWx1ZUFycmF5ID8gW10gOiB7fSksXHJcblx0XHRcdFx0XHR2YWx1ZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRhcmdldDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIHRoZSBwYXNzZWQgYXJyYXlcclxuICpcclxuICogQHBhcmFtIHshQXJyYXl9IGFyclxyXG4gKiBAcGFyYW0geyp9IGl0ZW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIGl0ZW0pIHtcclxuXHR2YXIgaSA9IGFyci5pbmRleE9mKGl0ZW0pO1xyXG5cclxuXHRpZiAoaSA+IC0xKSB7XHJcblx0XHRhcnIuc3BsaWNlKGksIDEpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEl0ZXJhdGVzIG92ZXIgYW4gYXJyYXkgb3Igb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7IU9iamVjdHxBcnJheX0gb2JqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgKil9IGZuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZWFjaChvYmosIGZuKSB7XHJcblx0aWYgKEFycmF5LmlzQXJyYXkob2JqKSB8fCAnbGVuZ3RoJyBpbiBvYmogJiYgaXNOdW1iZXIob2JqLmxlbmd0aCkpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGZuKGksIG9ialtpXSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRcdGZuKGtleSwgb2JqW2tleV0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgRW1sRWRpdG9yIGZyb20gJy4vbGliL2VtbEVkaXRvcic7XHJcbmltcG9ydCB7IFBsdWdpbk1hbmFnZXIgfSBmcm9tICcuL2xpYi9wbHVnaW5NYW5hZ2VyJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vbGliL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9saWIvYnJvd3Nlci5qcyc7XHJcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2xpYi9kb20nO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2xpYi91dGlscy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9saWIvZGVmYXVsdENvbW1hbmRzLmpzJztcclxuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vbGliL2RlZmF1bHRPcHRpb25zLmpzJztcclxuaW1wb3J0ICcuL3RoZW1lcy9zcXVhcmUubGVzcyc7XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcblx0aW50ZXJmYWNlIFdpbmRvdyB7XHJcblx0XHRlbWxFZGl0b3I6IElFZGl0b3I7XHJcblx0fVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSUVkaXRvciB7XHJcblx0Y29tbWFuZDogT2JqZWN0O1xyXG5cdGxvY2FsZTogT2JqZWN0O1xyXG5cdGljb25zOiBPYmplY3Q7XHJcblx0Zm9ybWF0czogT2JqZWN0O1xyXG5cdGNvbW1hbmRzOiBPYmplY3Q7XHJcblx0ZGVmYXVsdE9wdGlvbnM6IE9iamVjdDtcclxuXHRpb3M6IGJvb2xlYW47XHJcblx0aXNXeXNpd3lnU3VwcG9ydGVkOiBib29sZWFuO1xyXG5cdHJlZ2V4RXNjYXBlKHN0cjogc3RyaW5nKTogc3RyaW5nO1xyXG5cdGVzY2FwZUVudGl0aWVzKHN0cjogc3RyaW5nLCBub1F1b3RlczogYm9vbGVhbiB8IG51bGwpOiBzdHJpbmc7XHJcblx0ZXNjYXBlVXJpU2NoZW1lKHVybDogc3RyaW5nKTogc3RyaW5nO1xyXG5cdGRvbTogT2JqZWN0O1xyXG5cdHV0aWxzOiBPYmplY3Q7XHJcblx0cGx1Z2luczogT2JqZWN0O1xyXG5cdGNyZWF0ZSh0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCwgb3B0aW9uczogT2JqZWN0KTogdm9pZDtcclxuXHRpbnN0YW5jZSh0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCk6IElFZGl0b3I7XHJcbn1cclxuXHJcbndpbmRvdy5lbWxFZGl0b3IgPSB7XHJcblx0Y29tbWFuZDogRW1sRWRpdG9yLmNvbW1hbmQsXHJcblx0bG9jYWxlOiBFbWxFZGl0b3IubG9jYWxlLFxyXG5cdGljb25zOiBFbWxFZGl0b3IuaWNvbnMsXHJcblx0Zm9ybWF0czogRW1sRWRpdG9yLmZvcm1hdHMsXHJcblxyXG5cdGNvbW1hbmRzOiBkZWZhdWx0Q29tbWFuZHMsXHJcblx0ZGVmYXVsdE9wdGlvbnM6IGRlZmF1bHRPcHRpb25zLFxyXG5cdGlvczogYnJvd3Nlci5pb3MsXHJcblx0aXNXeXNpd3lnU3VwcG9ydGVkOiBicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCxcclxuXHRyZWdleEVzY2FwZTogZXNjYXBlLnJlZ2V4LFxyXG5cdGVzY2FwZUVudGl0aWVzOiBlc2NhcGUuZW50aXRpZXMsXHJcblx0ZXNjYXBlVXJpU2NoZW1lOiBlc2NhcGUudXJpU2NoZW1lLFxyXG5cclxuXHRkb206IHtcclxuXHRcdGNzczogZG9tLmNzcyxcclxuXHRcdGF0dHI6IGRvbS5hdHRyLFxyXG5cdFx0cmVtb3ZlQXR0cjogZG9tLnJlbW92ZUF0dHIsXHJcblx0XHRpczogZG9tLmlzLFxyXG5cdFx0Y2xvc2VzdDogZG9tLmNsb3Nlc3QsXHJcblx0XHR3aWR0aDogZG9tLndpZHRoLFxyXG5cdFx0aGVpZ2h0OiBkb20uaGVpZ2h0LFxyXG5cdFx0dHJhdmVyc2U6IGRvbS50cmF2ZXJzZSxcclxuXHRcdHJUcmF2ZXJzZTogZG9tLnJUcmF2ZXJzZSxcclxuXHRcdHBhcnNlSFRNTDogZG9tLnBhcnNlSFRNTCxcclxuXHRcdGhhc1N0eWxpbmc6IGRvbS5oYXNTdHlsaW5nLFxyXG5cdFx0Y29udmVydEVsZW1lbnQ6IGRvbS5jb252ZXJ0RWxlbWVudCxcclxuXHRcdGJsb2NrTGV2ZWxMaXN0OiBkb20uYmxvY2tMZXZlbExpc3QsXHJcblx0XHRjYW5IYXZlQ2hpbGRyZW46IGRvbS5jYW5IYXZlQ2hpbGRyZW4sXHJcblx0XHRpc0lubGluZTogZG9tLmlzSW5saW5lLFxyXG5cdFx0Y29weUNTUzogZG9tLmNvcHlDU1MsXHJcblx0XHRmaXhOZXN0aW5nOiBkb20uZml4TmVzdGluZyxcclxuXHRcdGZpbmRDb21tb25BbmNlc3RvcjogZG9tLmZpbmRDb21tb25BbmNlc3RvcixcclxuXHRcdGdldFNpYmxpbmc6IGRvbS5nZXRTaWJsaW5nLFxyXG5cdFx0cmVtb3ZlV2hpdGVTcGFjZTogZG9tLnJlbW92ZVdoaXRlU3BhY2UsXHJcblx0XHRleHRyYWN0Q29udGVudHM6IGRvbS5leHRyYWN0Q29udGVudHMsXHJcblx0XHRnZXRPZmZzZXQ6IGRvbS5nZXRPZmZzZXQsXHJcblx0XHRnZXRTdHlsZTogZG9tLmdldFN0eWxlLFxyXG5cdFx0aGFzU3R5bGU6IGRvbS5oYXNTdHlsZVxyXG5cdH0sXHJcblxyXG5cdHV0aWxzOiB7XHJcblx0XHRlYWNoOiB1dGlscy5lYWNoLFxyXG5cdFx0aXNFbXB0eU9iamVjdDogdXRpbHMuaXNFbXB0eU9iamVjdCxcclxuXHRcdGV4dGVuZDogdXRpbHMuZXh0ZW5kXHJcblx0fSxcclxuXHJcblx0cGx1Z2luczogUGx1Z2luTWFuYWdlci5wbHVnaW5zLFxyXG5cclxuXHRjcmVhdGU6ICh0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCwgb3B0aW9uczogYW55KTogdm9pZCA9PiB7XHJcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcblx0XHQvLyBEb24ndCBhbGxvdyB0aGUgZWRpdG9yIHRvIGJlIGluaXRpYWxpc2VkXHJcblx0XHQvLyBvbiBpdCdzIG93biBzb3VyY2UgZWRpdG9yXHJcblx0XHRpZiAoZG9tLnBhcmVudCh0ZXh0YXJlYSwgJy5lbWxlZGl0b3ItY29udGFpbmVyJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLnJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydCB8fCBicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCkge1xyXG5cdFx0XHQobmV3IEVtbEVkaXRvcih0ZXh0YXJlYSwgb3B0aW9ucykpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGluc3RhbmNlOiBmdW5jdGlvbiAodGV4dGFyZWE6IGFueSkge1xyXG5cdFx0cmV0dXJuIHRleHRhcmVhLl9lbWxlZGl0b3I7XHJcblx0fVxyXG59O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=