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
var _a;











var globalWin = window;
var globalDoc = document;
/**
 * EmlEditor - YAE! Yet Another Editor
 * @class EmlEditor
 * @name EmlEditor
 */
class EmlEditor {
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
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggle(this.sourceEditor);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggle(this.wysiwygEditor);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(this.editorContainer, 'wysiwygMode', isInSourceMode);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(this.editorContainer, 'sourceMode', !isInSourceMode);
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
        return _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(this.editorContainer, 'sourceMode');
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
     * Updates the textarea that the editor is replacing
     * with the value currently inside the editor.
     *
     * @function
     * @name updateOriginal
     * @since 1.4.0
     * @memberOf EmlEditor.prototype
     */
    updateOriginal() {
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer, width);
        }
        if (height !== false) {
            if (save !== false) {
                this.options.height = height;
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer, height);
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
            if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(this.wysiwygDocument, ':focus').length) {
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
                if (container && container.childNodes.length === 1 &&
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(container.firstChild, 'br')) {
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.textarea);
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
            return _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.sourceEditor, 'dir') === 'rtl';
        }
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygBody, 'dir', dir);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.sourceEditor, 'dir', dir);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(this.editorContainer, 'rtl');
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(this.editorContainer, 'ltr');
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, dir);
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keypress', null, thisEditor.emoticonsKeyPress);
            if (!thisEditor.sourceMode()) {
                thisEditor.rangeHelper.saveRange();
                thisEditor.replaceEmoticons();
                thisEditor.triggerValueChanged(false);
                thisEditor.rangeHelper.restoreRange();
            }
        }
        else {
            let emoticons = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(thisEditor.wysiwygBody, 'img[data-emleditor-emoticon]');
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(emoticons, (_, img) => {
                let text = _dom_js__WEBPACK_IMPORTED_MODULE_0__.data(img, 'emleditor-emoticon');
                let textNode = thisEditor.wysiwygDocument.createTextNode(text);
                img.parentNode.replaceChild(textNode, img);
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(thisEditor.wysiwygBody, 'keypress', null, thisEditor.emoticonsKeyPress);
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
            return _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer);
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
            return _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer);
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
        if (thisEditor.dropdown && _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(thisEditor.dropdown, dropDownClass)) {
            return;
        }
        dropDownCss = _utils_js__WEBPACK_IMPORTED_MODULE_1__.extend({
            top: menuItem.offsetTop,
            left: menuItem.offsetLeft,
            marginTop: menuItem.clientHeight
        }, thisEditor.options.dropDownCss);
        thisEditor.dropdown = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
            className: 'emleditor-dropdown ' + dropDownClass
        });
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(thisEditor.dropdown, dropDownCss);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.dropdown, content);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.editorContainer, thisEditor.dropdown);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.dropdown, 'click focusin', null, (e) => {
            // stop clicks within the dropdown from being handled
            e.stopPropagation();
        });
        if (thisEditor.dropdown) {
            let first = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(thisEditor.dropdown, 'input,textarea')[0];
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
            return _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(this.editorContainer, maximizeSize);
        }
        maximize = !!maximize;
        if (maximize) {
            this.maximizeScrollPosition = globalWin.scrollY;
        }
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.documentElement, maximizeSize, maximize);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(globalDoc.body, maximizeSize, maximize);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(this.editorContainer, maximizeSize, maximize);
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(this.dropdown);
        }
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, 'click', null, this.handleDocumentClick);
        let form = this.textarea.form;
        if (form) {
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'reset', null, this.handleFormReset);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(form, 'submit', null, this.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
        }
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pagehide', null, this.updateOriginal);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(window, 'pageshow', null, this.handleFormReset);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(this.sourceEditor);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(this.toolbar);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(this.editorContainer);
        delete this.textarea._emleditor;
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.show(this.textarea);
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(this.dropdown);
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
        let marker, scrollTop, scrollTo, editorHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.wysiwygEditor);
        this.focus();
        // TODO: This code tag should be configurable and
        // should maybe convert the HTML into text instead
        // Don't apply to code elements
        if (!overrideCodeBlocking && _dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(this.currentBlockNode, 'code')) {
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
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.fixNesting(this.wysiwygBody);
        this.wrapInlines(this.wysiwygBody, this.wysiwygDocument);
        // Scroll the editor after the end of the selection
        marker = _dom_js__WEBPACK_IMPORTED_MODULE_0__.find(this.wysiwygBody, '#emleditor-end-marker')[0];
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.show(marker);
        scrollTop = this.wysiwygBody.scrollTop;
        scrollTo = (_dom_js__WEBPACK_IMPORTED_MODULE_0__.getOffset(marker).top +
            (marker.offsetHeight * 1.5)) - editorHeight;
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(marker);
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
    // eslint-disable-next-line max-params
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
        let tmp = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, this.wysiwygDocument);
        let childNodes = this.wysiwygBody.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(tmp, childNodes[i].cloneNode(true));
        }
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, tmp);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.fixNesting(tmp);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(tmp);
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
        if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(this.rangeHelper.parentNode(), 'code')) {
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
            this.inlineCss = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('style', {
                id: 'inline'
            }, this.wysiwygDocument);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygDocument.head, this.inlineCss);
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
        if (!block || _dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'body')) {
            return this;
        }
        this.rangeHelper.saveRange();
        block.className = '';
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(block, 'style', '');
        if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(block, 'p,div,td')) {
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.convertElement(block, 'p');
        }
        this.rangeHelper.restoreRange();
        return this;
    }
    ;
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
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(this.toolbar, activeClass), (_, menuItem) => {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(menuItem, activeClass);
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(btn, 'disabled', isDisabled || state < 0);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(btn, activeClass, state > 0);
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', disable || !button[mode]);
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'nodechanged', {
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
            thisEditor.editorContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-container',
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(thisEditor.editorContainer, thisEditor.textarea);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(thisEditor.editorContainer, 'z-index', thisEditor.options.zIndex);
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalWin, 'load', null, loaded);
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
            this.sourceEditor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('textarea', null);
            this.wysiwygEditor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('iframe', {
                frameborder: "0",
                allowfullscreen: "true"
            });
            /*
                * This needs to be done right after they are created because,
                * for any reason, the user may not want the value to be tinkered
                * by any filters.
                */
            if (this.options.startInSourceMode) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, 'sourceMode');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(this.wysiwygEditor);
            }
            else {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, 'wysiwygMode');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(this.sourceEditor);
            }
            if (!this.options.spellcheck) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.editorContainer, 'spellcheck', 'false');
            }
            if (globalWin.location.protocol === 'https:') {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygEditor, 'src', 'about:blank');
            }
            // Add the editor to the container
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, this.wysiwygEditor);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, this.sourceEditor);
            // TODO: make this optional somehow
            this.dimensions(this.options.width || _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(this.textarea), this.options.height || _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.textarea));
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.wysiwygBody, '100%');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'touchend', null, this.focus);
            }
            let tabIndex = _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.textarea, 'tabindex');
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.sourceEditor, 'tabindex', tabIndex);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygEditor, 'tabindex', tabIndex);
            this.rangeHelper = new _rangeHelper__WEBPACK_IMPORTED_MODULE_5__.RangeHelper(this.wysiwygWindow, null, this.sanitize);
            // load any textarea value into the editor
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(this.textarea);
            this.val(this.textarea.value);
            let placeholder = this.options.placeholder ||
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.textarea, 'placeholder');
            if (placeholder) {
                this.sourceEditor.placeholder = placeholder;
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.wysiwygBody, 'placeholder', placeholder);
            }
        };
        /**
         * Initialises options
         * @private
         */
        this.initOptions = () => {
            // auto-update original textbox on blur if option set to true
            if (this.options.autoUpdate) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'blur', null, this.autoUpdate);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(this.sourceEditor, 'blur', null, this.autoUpdate);
            }
            if (this.options.rtl === null) {
                this.options.rtl = _dom_js__WEBPACK_IMPORTED_MODULE_0__.css(this.sourceEditor, 'direction') === 'rtl';
            }
            this.rtl(!!this.options.rtl);
            if (this.options.autoExpand) {
                // Need to update when images (or anything else) loads
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'load', null, this.autoExpand, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(this.wysiwygBody, 'input keyup', null, this.autoExpand);
            }
            if (this.options.resizeEnabled) {
                this.initResize();
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(this.editorContainer, 'id', this.options.id);
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(globalDoc, 'click', null, thisEditor.handleDocumentClick);
            if (form) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(form, 'reset', null, thisEditor.handleFormReset);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(form, 'submit', null, thisEditor.updateOriginal, _dom_js__WEBPACK_IMPORTED_MODULE_0__.EVENT_CAPTURE);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pagehide', null, thisEditor.updateOriginal);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(window, 'pageshow', null, thisEditor.handleFormReset);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keypress', null, thisEditor.handleKeyPress);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keydown', null, thisEditor.handleKeyDown);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keydown', null, thisEditor.handleBackSpace);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.appendNewLine);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'blur', null, thisEditor.valueChangedBlur);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.valueChangedKeyUp);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'paste', null, thisEditor.handlePasteEvt);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'cut copy', null, thisEditor.handleCutCopyEvt);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, compositionEvents, null, thisEditor.handleComposition);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, checkSelectionEvents, null, thisEditor.checkSelectionChanged);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, eventsToForward, null, thisEditor.handleEvent);
            if (thisEditor.options.emoticonsCompat && globalWin.getSelection) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'keyup', null, thisEditor.emoticonsCheckWhitespace);
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'blur', null, () => {
                if (!thisEditor.val()) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(thisEditor.wysiwygBody, 'placeholder');
                }
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygBody, 'focus', null, () => {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(thisEditor.wysiwygBody, 'placeholder');
            });
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, 'blur', null, thisEditor.valueChangedBlur);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, 'keyup', null, thisEditor.valueChangedKeyUp);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, 'keydown', null, thisEditor.handleKeyDown);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, compositionEvents, null, thisEditor.handleComposition);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.sourceEditor, eventsToForward, null, thisEditor.handleEvent);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygDocument, 'mousedown', null, thisEditor.handleMouseDown);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygDocument, checkSelectionEvents, null, thisEditor.checkSelectionChanged);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.wysiwygDocument, 'keyup', null, thisEditor.appendNewLine);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.editorContainer, 'selectionchanged', null, thisEditor.checkNodeChanged);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.editorContainer, 'selectionchanged', null, thisEditor.updateActiveButtons);
            // Custom events to forward
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(thisEditor.editorContainer, 'selectionchanged valuechanged nodechanged pasteraw paste', null, thisEditor.handleEvent);
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
            thisEditor.toolbar = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-toolbar',
                unselectable: 'on'
            });
            if (thisEditor.options.icons in _a.icons) {
                thisEditor.icons = new _a.icons[thisEditor.options.icons]();
            }
            _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(groups, (_, menuItems) => {
                group = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
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
                            _dom_js__WEBPACK_IMPORTED_MODULE_0__.insertBefore(thisEditor.icons.create(commandName), button.firstChild);
                            _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(button, 'has-icon');
                        }
                    }
                    button._emlTxtMode = !!command.txtExec;
                    button._emlWysiwygMode = !!command.exec;
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleClass(button, 'disabled', !command.exec);
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(button, 'click', null, (e) => {
                        if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.hasClass(button, 'disabled')) {
                            thisEditor.handleCommand(button, command);
                        }
                        thisEditor.updateActiveButtons();
                        e.preventDefault();
                    });
                    // Prevent editor losing focus when button clicked
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(button, 'mousedown', null, (e) => {
                        thisEditor.closeDropDown();
                        e.preventDefault();
                    });
                    if (command.tooltip) {
                        _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(button, 'title', thisEditor.translate(command.tooltip) +
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
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(group, button);
                    thisEditor.toolbarButtons[commandName] = button;
                });
                // Exclude empty groups
                if (group.firstChild) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.toolbar, group);
                }
            });
            // Append the toolbar to the toolbarContainer option if given
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(thisEditor.options.toolbarContainer || thisEditor.editorContainer, thisEditor.toolbar);
        };
        /**
         * Creates the resizer.
         * @private
         */
        this.initResize = () => {
            let minHeight, maxHeight, minWidth, maxWidth, mouseMoveFunc, mouseUpFunc, grip = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-grip'
            }), 
            // Cover is used to cover the editor iframe so document
            // still gets mouse move events
            cover = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {
                className: 'emleditor-resize-cover'
            }), moveEvents = 'touchmove mousemove', endEvents = 'touchcancel touchend mouseup', startX = 0, startY = 0, newX = 0, newY = 0, startWidth = 0, startHeight = 0, origWidth = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer), origHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer), isDragging = false, rtl = this.rtl();
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(cover);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeClass(this.editorContainer, 'resizing');
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, moveEvents, null, mouseMoveFunc);
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.off(globalDoc, endEvents, null, mouseUpFunc);
                e.preventDefault();
            };
            if (this.icons && this.icons.create) {
                let icon = this.icons.create('grip');
                if (icon) {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(grip, icon);
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(grip, 'has-icon');
                }
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, grip);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.editorContainer, cover);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.hide(cover);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.on(grip, 'touchstart mousedown', null, (e) => {
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
                startWidth = _dom_js__WEBPACK_IMPORTED_MODULE_0__.width(this.editorContainer);
                startHeight = _dom_js__WEBPACK_IMPORTED_MODULE_0__.height(this.editorContainer);
                isDragging = true;
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.addClass(this.editorContainer, 'resizing');
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
                    thisEditor.preLoadCache.push(_dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('img', {
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
            let range, txtPos, node = this.wysiwygBody.firstChild;
            // Can't focus invisible elements
            if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.isVisible(this.editorContainer)) {
                return;
            }
            if (this.sourceMode()) {
                txtPos = focusEnd ? this.sourceEditor.value.length : 0;
                this.sourceEditor.setSelectionRange(txtPos, txtPos);
                return;
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeWhiteSpace(this.wysiwygBody);
            if (focusEnd) {
                if (!(node = this.wysiwygBody.lastChild)) {
                    node = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, this.wysiwygDocument);
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, node);
                }
                while (node.lastChild) {
                    node = node.lastChild;
                    // Should place the cursor before the last <br>
                    if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, 'br') && node.previousSibling) {
                        node = node.previousSibling;
                    }
                }
            }
            range = this.wysiwygDocument.createRange();
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
                let container = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, this.wysiwygDocument);
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
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(container, 'p'), (_, elm) => {
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.convertElement(elm, 'div');
                });
                // Remove collapsed <br> tags as innerText converts them to newlines
                _utils_js__WEBPACK_IMPORTED_MODULE_1__.each(_dom_js__WEBPACK_IMPORTED_MODULE_0__.find(container, 'br'), (_, elm) => {
                    if (!elm.nextSibling || !_dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(elm.nextSibling, true)) {
                        _dom_js__WEBPACK_IMPORTED_MODULE_0__.remove(elm);
                    }
                });
                // range.toString() doesn't include newlines so can't use this.
                // selection.toString() seems to use the same method as innerText
                // but needs to be normalised first so using container.innerText
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, container);
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
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.pasteContentFragment, editable.firstChild);
                }
                setTimeout(() => {
                    let html = editable.innerHTML;
                    editable.innerHTML = '';
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(editable, this.pasteContentFragment);
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.traverse(body, (node) => {
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
                        if (offset && parent.nodeType !== _dom_js__WEBPACK_IMPORTED_MODULE_0__.TEXT_NODE) {
                            parent = parent.childNodes[offset];
                        }
                        while (parent && parent.parentNode !== thisEditor.wysiwygBody) {
                            parent = parent.parentNode;
                        }
                        if (parent && _dom_js__WEBPACK_IMPORTED_MODULE_0__.isInline(parent, true)) {
                            thisEditor.rangeHelper.saveRange();
                            thisEditor.wrapInlines(thisEditor.wysiwygBody, thisEditor.wysiwygDocument);
                            thisEditor.rangeHelper.restoreRange();
                        }
                    }
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(thisEditor.editorContainer, 'selectionchanged');
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
                if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(this.currentBlockNode, LIST_TAGS) &&
                    _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(this.currentBlockNode)) {
                    let br = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('br', {}, this.wysiwygDocument);
                    this.rangeHelper.insertNode(br);
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.rTraverse(this.wysiwygBody, (node) => {
                // Last block, add new line after if has styling
                if (node.nodeType === _dom_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_NODE &&
                    !/inline/.test(_dom_js__WEBPACK_IMPORTED_MODULE_0__.css(node, 'display'))) {
                    // Add line break after if has styling
                    if (!_dom_js__WEBPACK_IMPORTED_MODULE_0__.is(node, '.emleditor-nlf') && _dom_js__WEBPACK_IMPORTED_MODULE_0__.hasStyling(node)) {
                        let paragraph = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('p', {}, this.wysiwygDocument);
                        paragraph.className = 'emleditor-nlf';
                        paragraph.innerHTML = '<br />';
                        _dom_js__WEBPACK_IMPORTED_MODULE_0__.appendChild(this.wysiwygBody, paragraph);
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
            if (_dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(this.currentBlockNode, 'code')) {
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
        this.currentStyledBlockNode = () => {
            let block = this.currentBlockNode;
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
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'valuechanged', {
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
            this.updateOriginal();
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
            let pasteArea = _dom_js__WEBPACK_IMPORTED_MODULE_0__.createElement('div', {}, this.wysiwygDocument);
            this.pluginManager.call('pasteRaw', data);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'pasteraw', data);
            if (data.html) {
                // Sanitize again in case plugins modified the HTML
                pasteArea.innerHTML = this.sanitize(data.html);
                // fix any invalid nesting
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.fixNesting(pasteArea);
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
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.trigger(this.editorContainer, 'paste', paste);
            if ('fragmentToHtml' in this.format) {
                paste.val = this.format
                    .fragmentToHtml(paste.val, this.currentNode);
            }
            this.pluginManager.call('pasteHtml', paste);
            let parent = this.rangeHelper.getFirstBlockParent();
            this.wysiwygEditorInsertHtml(paste.val, null, true);
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.merge(parent);
        };
        this.textarea = textarea;
        //--> ?	this.userOptions = utils.extend(true, {}, (userOptions.commands || defaultCommands));
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
        this.domPurify.addHook('afterSanitizeAttributes', (node) => {
            if ('target' in node) {
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'data-eml-target', _dom_js__WEBPACK_IMPORTED_MODULE_0__.attr(node, 'target'));
            }
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.removeAttr(node, 'target');
        });
        // run the initializer
        this.init();
    }
}
_a = EmlEditor;
/*
public blur: (handler?: Function, excludeWysiwyg?: boolean, excludeSource?: boolean) => any;
public setWysiwygEditorValue: (value: string) => void;
public setSourceEditorValue: (value: string) => void;
public updateOriginal: () => void;
public getSourceEditorValue: (filter?: boolean) => string;
public dimensions: (width?: any, height?: any, save?: boolean) => any;
public readOnly: (readOnly?: any) => any;
public focus: (handler?: any, excludeWysiwyg?: boolean, excludeSource?: boolean) => any;
public val: (val?: string, filter?: boolean) => any;
public expandToContent: (ignoreMaxHeight: boolean) => void;
public rtl: (rtl?: boolean) => any;
public emoticons: (enable: boolean) => any;
public sourceMode: (enable?: boolean) => any;
public width: (width?: number, saveWidth?: boolean) => any;
public height: (height?: number, saveHeight?: boolean) => any;
public createDropDown: (menuItem: HTMLElement, name: string, content: HTMLElement) => void;
public maximize: (maximize?: boolean) => any;
public destroy: () => void;
public closeDropDown: (focus?: boolean) => void;
public wysiwygEditorInsertHtml: (html: string, endHtml?: string, overrideCodeBlocking?: boolean) => void;
public wysiwygEditorInsertText: (text: string, endText: string) => void;
public insertText: (text: string, endText: string) => any;
public sourceEditorInsertText: (text: string, endText: string) => void;
public getRangeHelper: () => RangeHelper;
public sourceEditorCaret: (position: any) => any;
public insert: (start: string, end: string, filter: boolean, convertEmoticons: boolean, allowMixed: boolean) => any;
public getWysiwygEditorValue: (filter?: boolean) => string;
public getBody: () => HTMLBodyElement;
public getContentAreaContainer: () => HTMLElement;
public execCommand: (command: string, param: string | boolean) => void;
public bind: (events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
public unbind: (events: string, handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
public keyDown: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
public keyPress: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
public keyUp: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
public nodeChanged: (handler: Function) => any;
public selectionChanged: (handler: Function) => any;
public valueChanged: (handler: Function, excludeWysiwyg: boolean, excludeSource: boolean) => any;
public css: (css: string) => any;
public removeShortcut: (shortcut: string) => any;
public addShortcut: (shortcut: string, cmd: string | Function) => any;
public clearBlockFormatting: (block: HTMLElement) => any;
public translate: (...args: any) => string;
*/
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
				label: editor.translate(
					'Paste your text inside the following box:'
				),
				insert: editor.translate('Insert')
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
				rows: editor.translate('Rows:'),
				cols: editor.translate('Cols:'),
				insert: editor.translate('Insert')
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
				url: editor.translate('URL:'),
				width: editor.translate('Width (optional):'),
				height: editor.translate('Height (optional):'),
				insert: editor.translate('Insert')
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
				label: editor.translate('E-mail:'),
				desc: editor.translate('Description (optional):'),
				insert: editor.translate('Insert')
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
				url: editor.translate('URL:'),
				desc: editor.translate('Description (optional):'),
				ins: editor.translate('Insert')
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
			return _dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(this.CurrentNode(), 'a') ? 0 : -1;
		},
		exec: function () {
			var anchor = _dom_js__WEBPACK_IMPORTED_MODULE_0__.closest(this.CurrentNode(), 'a');

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
						document.createTextNode(editor.translate('More')));

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
				label: editor.translate('Video URL:'),
				insert: editor.translate('Insert')
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
 * @param {function(...any)}
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
function off(node, events, selector, fn, capture) {
	events.split(' ').forEach(function (event) {
		var handler;

		if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString(selector)) {
			handler = fn['_eml-event-' + event + selector];
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
    create: (textarea, options) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0EsNENBQTRDOztBQUU1QztBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QyxrQkFBa0Isc0JBQXNCO0FBQ3hDLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixNQUFNO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLE1BQU07QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLFNBQVM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QixnQkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFBQVE7QUFDeEIsZ0JBQWdCLFFB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RSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLFVBQVU7Z0JBQ2QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsRUFBRSxFQUFFLE9BQU87Z0JBQ1gsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLFFBQVE7Z0JBQ1osRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxJQUFJO2dCQUNULEdBQUcsRUFBRSxHQUFHO2dCQUNSLEdBQUcsRUFBRSxJQUFJO2FBQ1QsRUFBRSxpQkFBaUIsR0FBUTtnQkFDM0IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsRUFBRSxFQUFFLEdBQUc7Z0JBQ1AsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsR0FBRyxFQUFFLEdBQUc7YUFDUixFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVqRyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFFRCxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUM7WUFFRCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFdkIsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUM5QixTQUFTLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLENBQUM7cUJBQU0sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztvQkFDbEMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztZQUNGLENBQUM7WUFFRCx3Q0FBd0M7WUFDeEMsSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFCLENBQUM7WUFFRCxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QixJQUFJLFVBQVUsQ0FBQyxnQkFBZ0I7Z0JBQzlCLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7Z0JBQ3JDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUM7Z0JBRW5FLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7Ozs7V0FLRztRQUNLLG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQVEsRUFBRTtZQUMxQyxJQUFJLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztZQUVoQyx5QkFBeUI7WUFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsT0FBTztZQUNSLENBQUM7WUFFRCxJQUFJLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUM1QixNQUFNLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUUzQixJQUFJLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDNUQsdUNBQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDekIsT0FBTztZQUNSLENBQUM7WUFFRCxPQUFPLElBQUksS0FBSyxNQUFNLEVBQUUsQ0FBQztnQkFDeEIsT0FBTyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO29CQUU1QixvREFBb0Q7b0JBQ3BELDhDQUE4QztvQkFDOUMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLDhDQUFhLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUN2RCxPQUFPO29CQUNSLENBQUM7Z0JBQ0YsQ0FBQztnQkFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQy9CLE9BQU87Z0JBQ1IsQ0FBQztZQUNGLENBQUM7WUFFRCw0Q0FBNEM7WUFDNUMsbUNBQW1DO1lBQ25DLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBRUY7OztXQUdHO1FBQ0ssMkJBQXNCLEdBQUcsR0FBZ0IsRUFBRTtZQUNsRCxJQUFJLEtBQUssR0FBUSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFFdkMsT0FBTyxDQUFDLCtDQUFjLENBQUMsS0FBSyxDQUFDLElBQUksNkNBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSx1Q0FBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO29CQUMxRCxPQUFPO2dCQUNSLENBQUM7WUFDRixDQUFDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7Ozs7V0FXRztRQUNLLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsd0JBQW1CLEdBQUcsQ0FBQyxTQUFtQixFQUFPLEVBQUU7WUFFMUQsSUFBSSxPQUFlLENBQUM7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7b0JBQ25ELENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLE9BQU87WUFDUixDQUFDO1lBRUQsSUFBSSxXQUFXLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxZQUFZLEdBQUcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUUvRyx5REFBeUQ7WUFDekQseURBQXlEO1lBQ3pELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBRXpCLHlEQUF5RDtZQUN6RCwyQ0FBMkM7WUFDM0MsU0FBUyxHQUFHLFNBQVMsS0FBSyxLQUFLO2dCQUM5QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFFaEUsdURBQXVEO1lBQ3ZELElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQ2pDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztZQUNyQyxDQUFDO1lBRUQsSUFBSSxZQUFZLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDOUIsQ0FBQztZQUVELFdBQVcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUVoRixrREFBa0Q7WUFDbEQsSUFBSSxXQUFXLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQzdCLE9BQU8sR0FBRyxXQUFXLENBQUM7Z0JBRXRCLDRDQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUU7b0JBQ2pELFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVztpQkFDL0MsQ0FBQyxDQUFDO1lBQ0osQ0FBQztZQUVELElBQUksWUFBWSxJQUFJLFNBQVMsRUFBRSxDQUFDO2dCQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ2xDLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7O1dBR0c7UUFDSyxxQkFBZ0IsR0FBRyxHQUFTLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDNUIsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7O1dBSUc7UUFDSyxzQkFBaUIsR0FBRyxDQUFDLENBQU0sRUFBTyxFQUFFO1lBQzNDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3BCLElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQztZQUMxQixJQUFJLFdBQW9CLENBQUM7WUFDekIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxRQUFRLEtBQUssRUFBRSxJQUFJLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLGFBQWEsR0FBRyxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksUUFBUSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRXhELElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUM1QixPQUFPO1lBQ1IsQ0FBQztZQUVELDJCQUEyQjtZQUMzQixJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ25CLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUNsQyxDQUFDO3FCQUFNLENBQUM7b0JBQ1AsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDcEIsQ0FBQztnQkFDRCwyQkFBMkI7WUFDNUIsQ0FBQztpQkFBTSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3BCLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUNsQyxDQUFDO3FCQUFNLENBQUM7b0JBQ1AsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDcEIsQ0FBQztZQUNGLENBQUM7aUJBQU0sSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDeEIsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQ2pDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDckIsQ0FBQztZQUVELGdEQUFnRDtZQUNoRCxZQUFZLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFaEQsMERBQTBEO1lBQzFELDBEQUEwRDtZQUMxRCwwREFBMEQ7WUFDMUQsVUFBVSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzdCLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2dCQUNsQyxDQUFDO1lBQ0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDO1FBRU0sc0JBQWlCLEdBQUcsQ0FBQyxDQUFNLEVBQVEsRUFBRTtZQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzVCLENBQUM7UUFDRixDQUFDLENBQUM7UUFFTSxlQUFVLEdBQUcsR0FBUyxFQUFFO1lBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUM7UUFTRjs7Ozs7O1dBTUc7UUFDSyxhQUFRLEdBQUcsQ0FBQyxJQUFpQyxFQUFVLEVBQUU7WUFDaEUsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRSxNQUFNLFlBQVksR0FBRyxDQUFDLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFekMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BDLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUUsWUFBWTthQUN0QixDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNLLG9CQUFlLEdBQUcsQ0FBQyxJQUFTLEVBQVEsRUFBRTtZQUM3QyxJQUFJLFNBQVMsR0FBRyxrREFBaUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVuRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDMUMsNENBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVwRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZixtREFBbUQ7Z0JBQ25ELFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRS9DLDBCQUEwQjtnQkFDMUIsK0NBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQixDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsU0FBUyxDQUFDLFNBQVMsR0FBRyxnREFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUVELElBQUksS0FBSyxHQUFRO2dCQUNoQixHQUFHLEVBQUUsU0FBUyxDQUFDLFNBQVM7YUFDeEIsQ0FBQztZQUVGLElBQUksa0JBQWtCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN2QyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNO3FCQUNyQixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsNENBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVsRCxJQUFJLGdCQUFnQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDckMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTTtxQkFDckIsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFNUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRCwwQ0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQztRQXlIRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6Qiw2RkFBNkY7UUFFN0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLDZDQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRywwREFBc0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNqRyxJQUFJLENBQUMsUUFBUSxHQUFHLDZDQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUksMkRBQWUsQ0FBQyxDQUFDLENBQUM7UUFFbEYsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLElBQUssMERBQXNCLENBQUMsU0FBUyxDQUFDO1FBRTFGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1FBRS9FLG1FQUFtRTtRQUNuRSxxQ0FBcUM7UUFDckMsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsaURBQVMsRUFBRSxDQUFDO1FBRTdCLDhDQUE4QztRQUM5Qyx3RUFBd0U7UUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFpQixFQUFFLElBQVMsRUFBRSxFQUFFO1lBQzlFLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFFakQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUMvQixJQUFJLEdBQUcsR0FBRyx5Q0FBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRXRDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzdDLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFekIsSUFBSSwrQ0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQzt3QkFDOUQsT0FBTztvQkFDUixDQUFDO29CQUVELGVBQWU7b0JBQ2YsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDL0IsT0FBTztvQkFDUixDQUFDO2dCQUNGLENBQUM7Z0JBRUQscUJBQXFCO2dCQUNyQiwyQ0FBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILDJFQUEyRTtRQUMzRSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxJQUFpQixFQUFFLEVBQUU7WUFDdkUsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ3RCLHlDQUFRLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLHlDQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0QsQ0FBQztZQUVELCtDQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7OztBQWhMRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE0Q0U7QUFFRixTQUFTO0FBQ0ssZ0JBQU0sR0FBUSxFQUFFLENBQUM7QUFDakIsaUJBQU8sR0FBUSxFQUFFLENBQUM7QUFDbEIsZUFBSyxHQUFRLEVBQUUsQ0FBQztBQUNoQixpQkFBTyxHQUFRO0lBQzVCOzs7Ozs7T0FNRztJQUNILEdBQUcsRUFBRSxDQUFDLENBQStCLEVBQWlCLEVBQUU7UUFDdkQsT0FBTywyREFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUNILEdBQUcsRUFBRSxDQUFDLElBQWtDLEVBQUUsR0FBUSxFQUFlLEVBQUU7UUFDbEUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELHdDQUF3QztRQUN4QyxHQUFHLEdBQUcsNkNBQVksQ0FBQywyREFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVyRCxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNqQixFQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUM7UUFFRiwyREFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM1QixPQUFPLEVBQUksQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLEVBQUUsQ0FBQyxJQUFrQyxFQUFPLEVBQUU7UUFDbkQsSUFBSSwyREFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDM0IsT0FBTywyREFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFFRCxPQUFPLEVBQUksQ0FBQztJQUNiLENBQUM7Q0FHRCxDQUFDO2lFQS93R2tCLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQnZCLE1BQU0sYUFBYTtJQUd6QixZQUFZLE9BQVk7UUFFdkIsYUFBYSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDM0I7Ozs7O1dBS0c7UUFDSCxJQUFJLGlCQUFpQixHQUFVLEVBQUUsQ0FBQztRQUlsQzs7Ozs7O1dBTUc7UUFDSCxJQUFJLGdCQUFnQixHQUFHLFVBQVUsTUFBYztZQUM5QyxPQUFPLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxZQUFZLEdBQUcsVUFBVSxJQUFnQixFQUFFLGFBQXNCO1lBQ3BFLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUzQixJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUVsRSxLQUFLLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUNyRCxJQUFJLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUN0QyxHQUFHLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFMUQsSUFBSSxhQUFhLEVBQUUsQ0FBQzt3QkFDbkIsT0FBTyxHQUFHLENBQUM7b0JBQ1osQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLEdBQUcsSUFBUztZQUNqQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUVGOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDcEIsT0FBTyxZQUFZLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQztRQUVGOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLE1BQWM7WUFDekMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVsQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ1osSUFBSSxNQUFNLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDcEMsT0FBTyxJQUFJLENBQUM7Z0JBQ2IsQ0FBQztZQUNGLENBQUM7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQztRQUVGOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLE1BQWM7WUFDckMsSUFBSSxNQUFNLElBQUksYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQyxJQUFJLFNBQVMsR0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQTRDLENBQUMsQ0FBQztnQkFDeEYsT0FBTyxPQUFPLFNBQVMsS0FBSyxVQUFVLElBQUksT0FBTyxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsQ0FBQztZQUNuRixDQUFDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7V0FRRztRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxNQUFjO1lBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUN6QixJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7Z0JBRW5DLE9BQU8sR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDZCxJQUFJLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxZQUFZLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBNEMsQ0FBQyxFQUFFLENBQUM7d0JBQzNHLE9BQU8sSUFBSSxDQUFDO29CQUNiLENBQUM7Z0JBQ0YsQ0FBQztZQUNGLENBQUM7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNkLENBQUMsQ0FBQztRQUVGOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLE1BQWM7WUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUN2RCxPQUFPLEtBQUssQ0FBQztZQUNkLENBQUM7WUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUMzQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0IsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDYixDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7V0FRRztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxNQUFjO1lBQ3pDLElBQUksYUFBYSxFQUFFLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUV6RSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNoQyxPQUFPLE9BQU8sQ0FBQztZQUNoQixDQUFDO1lBRUQsT0FBTyxTQUFTLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxZQUFZLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBNEMsQ0FBQyxFQUFFLENBQUM7b0JBQ2pILGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUVmLElBQUksU0FBUyxJQUFJLGFBQWEsRUFBRSxDQUFDO3dCQUNoQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztZQUVELE9BQU8sT0FBTyxDQUFDO1FBQ2hCLENBQUMsQ0FBQztRQUVGOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNkLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUVqQyxPQUFPLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ1osSUFBSSxTQUFTLElBQUksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDdkMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztZQUNGLENBQUM7WUFFRCxpQkFBaUIsR0FBRyxFQUFFLENBQUM7WUFDdkIsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSCxDQUFDO0NBV0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyT0QscURBQXFEO0FBQ3JCO0FBQ007QUFDRjtBQUdwQzs7Ozs7Ozs7Ozs7R0FXRztBQUNILElBQUksU0FBUyxHQUFHLFVBQVUsS0FBVSxFQUFFLE1BQWUsRUFBRSxNQUFjO0lBQ3BFLElBQUksU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFDekMsSUFBSSxHQUFHLEVBQUUsRUFDVCxJQUFJLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFDM0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7SUFFNUIsb0RBQW9EO0lBQ3BELHNDQUFzQztJQUN0QyxnQkFBZ0I7SUFDaEIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELEtBQUssR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBRXJCLE9BQU8sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDNUQsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0IsU0FBUyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWpDLDBEQUEwRDtRQUMxRCxzREFBc0Q7UUFDdEQsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNWLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVaLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFZixJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNuRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM3QixDQUFDO2FBQU0sQ0FBQztZQUNQLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7WUFFckIsSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3pCLENBQUM7SUFDRixDQUFDO0lBRUQsT0FBTztRQUNOLElBQUksRUFBRSxJQUFJLElBQUksSUFBSTtRQUNsQixNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1YsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0ksTUFBTSxXQUFXO0lBd0J2QixZQUFZLEdBQVEsRUFBRSxDQUFPLEVBQUUsUUFBMEQ7UUFDeEYsSUFBSSxhQUFrQixDQUFDO1FBQ3ZCLElBQUksYUFBa0IsQ0FBQztRQUN2QixJQUFJLEdBQUcsR0FBUSxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3hELElBQUksV0FBVyxHQUFXLHdCQUF3QixDQUFDO1FBQ25ELElBQUksU0FBUyxHQUFXLHNCQUFzQixDQUFDO1FBRS9DOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQVksRUFBRSxPQUFnQjtZQUN6RCxJQUFJLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUU1QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxLQUFLLENBQUM7WUFDZCxDQUFDO1lBRUQsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDYixJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQztZQUN2QyxDQUFDO1lBRUQsR0FBRyxHQUFHLGtEQUFpQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3BDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRS9CLE9BQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN2QixnREFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBRUY7Ozs7OztVQU1FO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQVcsRUFBRSxPQUFjO1lBQ3RELElBQUksS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsdUJBQXVCLENBQUM7WUFDNUgsSUFBSSxVQUFVLEdBQVEsRUFBRSxDQUFDO1lBRXpCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDWixPQUFPLEtBQUssQ0FBQztZQUNkLENBQUM7WUFFRCxTQUFTLGFBQWEsQ0FBQyxJQUFTO2dCQUMvQixvREFBb0Q7Z0JBQ3BELElBQUksSUFBSSxJQUFJLDRDQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDL0QsMkNBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztZQUNGLENBQUM7WUFFRCxJQUFJLEtBQUssQ0FBQyxjQUFjLEtBQUssS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNqRCwyQ0FBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLEVBQUUsSUFBSTtvQkFDOUMsSUFBSSw0Q0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ3ZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQ3pCLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3hCLENBQUM7WUFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFdkIsdURBQXVEO1lBQ3ZELHdEQUF3RDtZQUN4RCxrQ0FBa0M7WUFDbEMsZUFBZTtZQUNmLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsb0RBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDckUsaURBQWdCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLENBQUM7aUJBQU0sQ0FBQztnQkFDUCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV4QixvRUFBb0U7Z0JBQ3BFLDJCQUEyQjtnQkFDM0IsK0JBQStCO2dCQUMvQixvQ0FBb0M7Z0JBQ3BDLHNCQUFzQjtnQkFDdEIsMkJBQTJCO2dCQUMzQixhQUFhLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDOUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekMsQ0FBQztZQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUM7UUFFRjs7Ozs7OztXQU9HO1FBQ0gsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNwQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFakMsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDWCxPQUFPLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMzQixDQUFDO1FBQ0YsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7V0FPRztRQUNILElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDcEIsSUFBSSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFaEQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNWLE9BQU87WUFDUixDQUFDO1lBRUQsOERBQThEO1lBQzlELHFEQUFxRDtZQUNyRCxJQUFJLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ3pCLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUN0QixPQUFPLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDOUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BDLENBQUM7Z0JBRUQsS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDMUIseURBQXlEO2dCQUN6RCw0Q0FBNEM7Z0JBQzVDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRWpDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUVELElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7O1dBUUc7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ25CLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUU3QixPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUM7UUFFRjs7Ozs7OztXQU9HO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRztZQUNuQixJQUFJLEdBQUcsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXRDLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1gsR0FBRyxHQUFHLGtEQUFpQixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLGdEQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO2dCQUU1QyxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUM7WUFDdEIsQ0FBQztZQUVELE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7V0FPRztRQUNILElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRWpDLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1gsT0FBTyxLQUFLLENBQUMsdUJBQXVCLENBQUM7WUFDdEMsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7Ozs7OztXQVFHO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLElBQVU7WUFDOUMsSUFBSSxJQUFJLEdBQUcsVUFBVSxHQUFRO2dCQUM1QixJQUFJLENBQUMsNkNBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDOUIsT0FBTyxHQUFHLENBQUM7Z0JBQ1osQ0FBQztnQkFFRCxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBRWxDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUM5QixDQUFDLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7O1dBUUc7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsS0FBYyxFQUFFLElBQVU7WUFDdkQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFdEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNaLE9BQU8sS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2Qiw4QkFBOEI7WUFDOUIseURBQXlEO1lBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7O1dBUUc7UUFDSCxJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ3BCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN4QyxJQUFJLFNBQVMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRW5DLDREQUE0RDtZQUM1RCxnREFBZ0Q7WUFDaEQsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUM1QyxTQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FDaEMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLEVBQUU7WUFDNUIsT0FBTyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQztRQUVGOzs7Ozs7O1dBT0c7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsRUFBRTtZQUMvQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWhDLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ1osMkNBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQixDQUFDO1FBQ0YsQ0FBQyxDQUFDO1FBRUY7Ozs7OztXQU1HO1FBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7V0FPRztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxLQUFLO1lBQ2pDLElBQUksU0FBUyxDQUFDO1lBQ2QsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7WUFFbkMsNERBQTREO1lBQzVELDJEQUEyRDtZQUMzRCxtREFBbUQ7WUFDbkQsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLFNBQVM7Z0JBQy9CLENBQUMsNkNBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFFakMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLE9BQU8sU0FBUyxJQUFJLHVDQUFNLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztvQkFDNUQsU0FBUyxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsSUFBSSx1Q0FBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO29CQUM3QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzVCLEdBQUcsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzNCLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXBCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDOUIsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDaEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEIsQ0FBQztnQkFDRixDQUFDO1lBQ0YsQ0FBQztZQUVELElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNGLENBQUMsQ0FBQztRQUVGOzs7Ozs7V0FNRztRQUNILElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDbkIsSUFBSSxXQUFXLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVwSCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzlCLE9BQU8sS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUVELFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxLQUFLLEdBQUcsQ0FBQztZQUV4QyxLQUFLLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV2QixJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUNqQixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUM7WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsSUFBWSxFQUFFLEtBQWE7WUFDM0QsSUFBSSxLQUFVLEVBQUUsR0FBUSxFQUFFLEtBQUssR0FBUSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFNUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNaLE9BQU8sS0FBSyxDQUFDO1lBQ2QsQ0FBQztZQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEIsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVyQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLE1BQU0sRUFBRSxNQUFNO1lBQzNDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVqQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ1osT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDO1lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhCLE9BQU8sU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzlDLENBQUMsQ0FBQztRQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBbUJHO1FBQ0gsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFDckIsUUFBUSxFQUNSLFlBQVksRUFDWixjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixZQUFZO1lBRVosSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBTSxFQUFFLENBQU07b0JBQ3JDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNKLENBQUM7WUFFRCxJQUFJLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZUFBZSxHQUFHLGlDQUFpQyxFQUFFLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLGFBQWEsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLGNBQWM7Z0JBQzVPLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBRXBDLElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFDdkIsU0FBUyxFQUFFLENBQUM7WUFDYixDQUFDO1lBRUQsWUFBWSxHQUFHLFlBQVksSUFBSSxFQUFFLENBQUM7WUFDbEMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQzNCLFNBQVMsSUFBSSxZQUFZLENBQUM7WUFFMUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDbEIsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFFRCxPQUFPLFVBQVUsRUFBRSxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUM1QixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQztnQkFDL0QsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUVkLElBQUksaUJBQWlCLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxHQUFHLFNBQVM7eUJBQ2YsTUFBTSxDQUFDLFVBQVUsQ0FBQzt5QkFDbEIsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLGVBQWU7d0JBQ2hDLDZDQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFFNUMsSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFDWCxpREFBaUQ7d0JBQ2pELDZDQUE2Qzt3QkFDN0MsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQ3ZELENBQUM7Z0JBQ0YsQ0FBQztxQkFBTSxDQUFDO29CQUNQLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDbkQsQ0FBQztnQkFFRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNuQiw0Q0FBNEM7b0JBQzVDLG9EQUFvRDtvQkFDcEQsSUFBSSxRQUFRLElBQUksT0FBTzt3QkFDdEIsUUFBUSxHQUFHLFVBQVUsR0FBRyxhQUFhLElBQUksT0FBTyxFQUFFLENBQUM7d0JBQ25ELFNBQVMsR0FBRyxPQUFPLEdBQUcsUUFBUSxDQUFDO3dCQUUvQixxREFBcUQ7d0JBQ3JELG1EQUFtRDt3QkFDbkQsMEJBQTBCO3dCQUMxQixJQUFJLENBQUMsZUFBZSxDQUNuQixTQUFTLEVBQ1QsVUFBVSxHQUFHLFNBQVM7NEJBQ3RCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEMsQ0FBQzt3QkFFRixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QyxPQUFPLElBQUksQ0FBQztvQkFDYixDQUFDO2dCQUNGLENBQUM7WUFDRixDQUFDO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsSUFBWSxFQUFFLElBQVk7WUFDbEQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUVELElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztZQUN2QixDQUFDO1lBRUQsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUM5RCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDO1FBRUY7Ozs7Ozs7V0FPRztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFN0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDVCxJQUFJLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDekIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixDQUFDO3FCQUFNLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN0QixHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsQ0FBQztZQUNGLENBQUM7UUFDRixDQUFDLENBQUM7UUFFRjs7Ozs7Ozs7OztXQVVHO1FBQ0gsYUFBYSxHQUFHLENBQUMsSUFBbUIsRUFBRSxPQUFzQixFQUFFLFVBQW1CLEVBQWlCLEVBQUU7WUFDbkcsSUFBSSxTQUFTLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBRW5ELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQzlCLElBQUksT0FBTyxFQUFFLENBQUM7b0JBQ2IsSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBRUQsSUFBSSxHQUFHLDhDQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQztpQkFBTSxDQUFDO2dCQUNQLGdEQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUU1QixJQUFJLE9BQU8sRUFBRSxDQUFDO29CQUNiLGdEQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxnREFBZSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztZQUNGLENBQUM7WUFFRCxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25DLE9BQU87WUFDUixDQUFDO1lBRUQsT0FBTyxDQUFDLDZDQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNqRCxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztZQUNqQyxDQUFDO1lBRUQsSUFBSSxvREFBbUIsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2dCQUNwQyx1REFBdUQ7Z0JBQ3ZELDhDQUE4QztnQkFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDMUIsZ0RBQWUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDO1lBQ0YsQ0FBQztpQkFBTSxDQUFDO2dCQUNQLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQztZQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixnRUFBZ0U7WUFDaEUsa0JBQWtCO1lBQ2xCLGdEQUFlLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELGdEQUFlLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBRXJELElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksR0FBRyxHQUFHLGtEQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxnREFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFM0IsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDO1lBQ3RCLENBQUM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNiLENBQUMsQ0FBQztRQUVGOzs7Ozs7V0FNRztRQUNILGFBQWEsR0FBRyxDQUFDLEVBQVUsRUFBbUIsRUFBRTtZQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXRCLElBQUksTUFBTSxHQUFHLGtEQUFpQixDQUFDLE1BQU0sRUFBRTtnQkFDdEMsRUFBRSxFQUFFLEVBQUU7Z0JBQ04sU0FBUyxFQUFFLHNDQUFzQztnQkFDakQsS0FBSyxFQUFFLDRCQUE0QjthQUNuQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRVIsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFFdkIsT0FBTyxNQUFNLENBQUM7UUFDZixDQUFDLENBQUM7SUFDSCxDQUFDO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaHlCRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9GRDtBQUNnQztBQUNJO0FBQ0U7QUFDSDs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQix3Q0FBTztBQUM1QixLQUFLLDJDQUFVO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7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QUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbjhCSzs7QUFFaEM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTLDZDQUFJOztBQUViO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FB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c0JBQXNCLENBQUMsRUFBRSxDQUFDO1lBQ2xELE9BQU87UUFDUixDQUFDO1FBRUQsSUFBSSxPQUFPLENBQUMsd0JBQXdCLElBQUksK0RBQTBCLEVBQUUsQ0FBQztZQUNwRSxDQUFDLElBQUksc0RBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0YsQ0FBQztJQUVELFFBQVEsRUFBRSxVQUFVLFFBQWE7UUFDaEMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzVCLENBQUM7Q0FDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vbm9kZV9tb2R1bGVzL2RvbXB1cmlmeS9kaXN0L3B1cmlmeS5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3IvLi9zcmMvdGhlbWVzL3NxdWFyZS5sZXNzP2RkYzYiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lbWxFZGl0b3IudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9wbHVnaW5NYW5hZ2VyLnRzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvcmFuZ2VIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdENvbW1hbmRzLmpzIiwid2VicGFjazovL2VtbGVkaXRvci8uL3NyYy9saWIvZGVmYXVsdE9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9kb20uanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lbW90aWNvbnMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi9lc2NhcGUuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi90ZW1wbGF0ZXMuanMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9lbWxlZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2VtbGVkaXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZW1sZWRpdG9yLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISBAbGljZW5zZSBET01QdXJpZnkgMy4wLjkgfCAoYykgQ3VyZTUzIGFuZCBvdGhlciBjb250cmlidXRvcnMgfCBSZWxlYXNlZCB1bmRlciB0aGUgQXBhY2hlIGxpY2Vuc2UgMi4wIGFuZCBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlIDIuMCB8IGdpdGh1Yi5jb20vY3VyZTUzL0RPTVB1cmlmeS9ibG9iLzMuMC45L0xJQ0VOU0UgKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwuRE9NUHVyaWZ5ID0gZmFjdG9yeSgpKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICBjb25zdCB7XG4gICAgZW50cmllcyxcbiAgICBzZXRQcm90b3R5cGVPZixcbiAgICBpc0Zyb3plbixcbiAgICBnZXRQcm90b3R5cGVPZixcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcbiAgfSA9IE9iamVjdDtcbiAgbGV0IHtcbiAgICBmcmVlemUsXG4gICAgc2VhbCxcbiAgICBjcmVhdGVcbiAgfSA9IE9iamVjdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXG4gIGxldCB7XG4gICAgYXBwbHksXG4gICAgY29uc3RydWN0XG4gIH0gPSB0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgUmVmbGVjdDtcbiAgaWYgKCFmcmVlemUpIHtcbiAgICBmcmVlemUgPSBmdW5jdGlvbiBmcmVlemUoeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbiAgfVxuICBpZiAoIXNlYWwpIHtcbiAgICBzZWFsID0gZnVuY3Rpb24gc2VhbCh4KSB7XG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG4gIGlmICghYXBwbHkpIHtcbiAgICBhcHBseSA9IGZ1bmN0aW9uIGFwcGx5KGZ1biwgdGhpc1ZhbHVlLCBhcmdzKSB7XG4gICAgICByZXR1cm4gZnVuLmFwcGx5KHRoaXNWYWx1ZSwgYXJncyk7XG4gICAgfTtcbiAgfVxuICBpZiAoIWNvbnN0cnVjdCkge1xuICAgIGNvbnN0cnVjdCA9IGZ1bmN0aW9uIGNvbnN0cnVjdChGdW5jLCBhcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IEZ1bmMoLi4uYXJncyk7XG4gICAgfTtcbiAgfVxuICBjb25zdCBhcnJheUZvckVhY2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5mb3JFYWNoKTtcbiAgY29uc3QgYXJyYXlQb3AgPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wb3ApO1xuICBjb25zdCBhcnJheVB1c2ggPSB1bmFwcGx5KEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbiAgY29uc3Qgc3RyaW5nVG9Mb3dlckNhc2UgPSB1bmFwcGx5KFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2UpO1xuICBjb25zdCBzdHJpbmdUb1N0cmluZyA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyk7XG4gIGNvbnN0IHN0cmluZ01hdGNoID0gdW5hcHBseShTdHJpbmcucHJvdG90eXBlLm1hdGNoKTtcbiAgY29uc3Qgc3RyaW5nUmVwbGFjZSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbiAgY29uc3Qgc3RyaW5nSW5kZXhPZiA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mKTtcbiAgY29uc3Qgc3RyaW5nVHJpbSA9IHVuYXBwbHkoU3RyaW5nLnByb3RvdHlwZS50cmltKTtcbiAgY29uc3Qgb2JqZWN0SGFzT3duUHJvcGVydHkgPSB1bmFwcGx5KE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuICBjb25zdCByZWdFeHBUZXN0ID0gdW5hcHBseShSZWdFeHAucHJvdG90eXBlLnRlc3QpO1xuICBjb25zdCB0eXBlRXJyb3JDcmVhdGUgPSB1bmNvbnN0cnVjdChUeXBlRXJyb3IpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQgY2FsbHMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdpdGggYSBzcGVjaWZpZWQgdGhpc0FyZyBhbmQgYXJndW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIHdyYXBwZWQgYW5kIGNhbGxlZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB0aGF0IGNhbGxzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIGEgc3BlY2lmaWVkIHRoaXNBcmcgYW5kIGFyZ3VtZW50cy5cbiAgICovXG4gIGZ1bmN0aW9uIHVuYXBwbHkoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGhpc0FyZykge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZnVuY3Rpb24gdGhhdCBjb25zdHJ1Y3RzIGFuIGluc3RhbmNlIG9mIHRoZSBnaXZlbiBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBUaGUgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZCBhbmQgY2FsbGVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHRoYXQgY29uc3RydWN0cyBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gY29uc3RydWN0b3IgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gdW5jb25zdHJ1Y3QoZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnN0cnVjdChmdW5jLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBwcm9wZXJ0aWVzIHRvIGEgbG9va3VwIHRhYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgLSBUaGUgc2V0IHRvIHdoaWNoIGVsZW1lbnRzIHdpbGwgYmUgYWRkZWQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gVGhlIGFycmF5IGNvbnRhaW5pbmcgZWxlbWVudHMgdG8gYmUgYWRkZWQgdG8gdGhlIHNldC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtQ2FzZUZ1bmMgLSBBbiBvcHRpb25hbCBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIGNhc2Ugb2YgZWFjaCBlbGVtZW50IGJlZm9yZSBhZGRpbmcgdG8gdGhlIHNldC5cbiAgICogQHJldHVybnMge09iamVjdH0gVGhlIG1vZGlmaWVkIHNldCB3aXRoIGFkZGVkIGVsZW1lbnRzLlxuICAgKi9cbiAgZnVuY3Rpb24gYWRkVG9TZXQoc2V0LCBhcnJheSkge1xuICAgIGxldCB0cmFuc2Zvcm1DYXNlRnVuYyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogc3RyaW5nVG9Mb3dlckNhc2U7XG4gICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAvLyBNYWtlICdpbicgYW5kIHRydXRoeSBjaGVja3MgbGlrZSBCb29sZWFuKHNldC5jb25zdHJ1Y3RvcilcbiAgICAgIC8vIGluZGVwZW5kZW50IG9mIGFueSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gT2JqZWN0LnByb3RvdHlwZS5cbiAgICAgIC8vIFByZXZlbnQgcHJvdG90eXBlIHNldHRlcnMgZnJvbSBpbnRlcmNlcHRpbmcgc2V0IGFzIGEgdGhpcyB2YWx1ZS5cbiAgICAgIHNldFByb3RvdHlwZU9mKHNldCwgbnVsbCk7XG4gICAgfVxuICAgIGxldCBsID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgIGxldCBlbGVtZW50ID0gYXJyYXlbbF07XG4gICAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IGxjRWxlbWVudCA9IHRyYW5zZm9ybUNhc2VGdW5jKGVsZW1lbnQpO1xuICAgICAgICBpZiAobGNFbGVtZW50ICE9PSBlbGVtZW50KSB7XG4gICAgICAgICAgLy8gQ29uZmlnIHByZXNldHMgKGUuZy4gdGFncy5qcywgYXR0cnMuanMpIGFyZSBpbW11dGFibGUuXG4gICAgICAgICAgaWYgKCFpc0Zyb3plbihhcnJheSkpIHtcbiAgICAgICAgICAgIGFycmF5W2xdID0gbGNFbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbGVtZW50ID0gbGNFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXRbZWxlbWVudF0gPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuIHVwIGFuIGFycmF5IHRvIGhhcmRlbiBhZ2FpbnN0IENTUFBcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBUaGUgYXJyYXkgdG8gYmUgY2xlYW5lZC5cbiAgICogQHJldHVybnMge0FycmF5fSBUaGUgY2xlYW5lZCB2ZXJzaW9uIG9mIHRoZSBhcnJheVxuICAgKi9cbiAgZnVuY3Rpb24gY2xlYW5BcnJheShhcnJheSkge1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGlzUHJvcGVydHlFeGlzdCA9IG9iamVjdEhhc093blByb3BlcnR5KGFycmF5LCBpbmRleCk7XG4gICAgICBpZiAoIWlzUHJvcGVydHlFeGlzdCkge1xuICAgICAgICBhcnJheVtpbmRleF0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogU2hhbGxvdyBjbG9uZSBhbiBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCAtIFRoZSBvYmplY3QgdG8gYmUgY2xvbmVkLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIG5ldyBvYmplY3QgdGhhdCBjb3BpZXMgdGhlIG9yaWdpbmFsLlxuICAgKi9cbiAgZnVuY3Rpb24gY2xvbmUob2JqZWN0KSB7XG4gICAgY29uc3QgbmV3T2JqZWN0ID0gY3JlYXRlKG51bGwpO1xuICAgIGZvciAoY29uc3QgW3Byb3BlcnR5LCB2YWx1ZV0gb2YgZW50cmllcyhvYmplY3QpKSB7XG4gICAgICBjb25zdCBpc1Byb3BlcnR5RXhpc3QgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5KTtcbiAgICAgIGlmIChpc1Byb3BlcnR5RXhpc3QpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IGNsZWFuQXJyYXkodmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuICAgICAgICAgIG5ld09iamVjdFtwcm9wZXJ0eV0gPSBjbG9uZSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3T2JqZWN0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXdPYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXV0b21hdGljYWxseSBjaGVja3MgaWYgdGhlIHByb3AgaXMgZnVuY3Rpb24gb3IgZ2V0dGVyIGFuZCBiZWhhdmVzIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gVGhlIG9iamVjdCB0byBsb29rIHVwIHRoZSBnZXR0ZXIgZnVuY3Rpb24gaW4gaXRzIHByb3RvdHlwZSBjaGFpbi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgLSBUaGUgcHJvcGVydHkgbmFtZSBmb3Igd2hpY2ggdG8gZmluZCB0aGUgZ2V0dGVyIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFRoZSBnZXR0ZXIgZnVuY3Rpb24gZm91bmQgaW4gdGhlIHByb3RvdHlwZSBjaGFpbiBvciBhIGZhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbG9va3VwR2V0dGVyKG9iamVjdCwgcHJvcCkge1xuICAgIHdoaWxlIChvYmplY3QgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRlc2MgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcbiAgICAgIGlmIChkZXNjKSB7XG4gICAgICAgIGlmIChkZXNjLmdldCkge1xuICAgICAgICAgIHJldHVybiB1bmFwcGx5KGRlc2MuZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRlc2MudmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdW5hcHBseShkZXNjLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmFsbGJhY2tWYWx1ZSgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGh0bWwkMSA9IGZyZWV6ZShbJ2EnLCAnYWJicicsICdhY3JvbnltJywgJ2FkZHJlc3MnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2F1ZGlvJywgJ2InLCAnYmRpJywgJ2JkbycsICdiaWcnLCAnYmxpbmsnLCAnYmxvY2txdW90ZScsICdib2R5JywgJ2JyJywgJ2J1dHRvbicsICdjYW52YXMnLCAnY2FwdGlvbicsICdjZW50ZXInLCAnY2l0ZScsICdjb2RlJywgJ2NvbCcsICdjb2xncm91cCcsICdjb250ZW50JywgJ2RhdGEnLCAnZGF0YWxpc3QnLCAnZGQnLCAnZGVjb3JhdG9yJywgJ2RlbCcsICdkZXRhaWxzJywgJ2RmbicsICdkaWFsb2cnLCAnZGlyJywgJ2RpdicsICdkbCcsICdkdCcsICdlbGVtZW50JywgJ2VtJywgJ2ZpZWxkc2V0JywgJ2ZpZ2NhcHRpb24nLCAnZmlndXJlJywgJ2ZvbnQnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaScsICdpbWcnLCAnaW5wdXQnLCAnaW5zJywgJ2tiZCcsICdsYWJlbCcsICdsZWdlbmQnLCAnbGknLCAnbWFpbicsICdtYXAnLCAnbWFyaycsICdtYXJxdWVlJywgJ21lbnUnLCAnbWVudWl0ZW0nLCAnbWV0ZXInLCAnbmF2JywgJ25vYnInLCAnb2wnLCAnb3B0Z3JvdXAnLCAnb3B0aW9uJywgJ291dHB1dCcsICdwJywgJ3BpY3R1cmUnLCAncHJlJywgJ3Byb2dyZXNzJywgJ3EnLCAncnAnLCAncnQnLCAncnVieScsICdzJywgJ3NhbXAnLCAnc2VjdGlvbicsICdzZWxlY3QnLCAnc2hhZG93JywgJ3NtYWxsJywgJ3NvdXJjZScsICdzcGFjZXInLCAnc3BhbicsICdzdHJpa2UnLCAnc3Ryb25nJywgJ3N0eWxlJywgJ3N1YicsICdzdW1tYXJ5JywgJ3N1cCcsICd0YWJsZScsICd0Ym9keScsICd0ZCcsICd0ZW1wbGF0ZScsICd0ZXh0YXJlYScsICd0Zm9vdCcsICd0aCcsICd0aGVhZCcsICd0aW1lJywgJ3RyJywgJ3RyYWNrJywgJ3R0JywgJ3UnLCAndWwnLCAndmFyJywgJ3ZpZGVvJywgJ3diciddKTtcblxuICAvLyBTVkdcbiAgY29uc3Qgc3ZnJDEgPSBmcmVlemUoWydzdmcnLCAnYScsICdhbHRnbHlwaCcsICdhbHRnbHlwaGRlZicsICdhbHRnbHlwaGl0ZW0nLCAnYW5pbWF0ZWNvbG9yJywgJ2FuaW1hdGVtb3Rpb24nLCAnYW5pbWF0ZXRyYW5zZm9ybScsICdjaXJjbGUnLCAnY2xpcHBhdGgnLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZycsICdnbHlwaCcsICdnbHlwaHJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJywgJ2xpbmVhcmdyYWRpZW50JywgJ21hcmtlcicsICdtYXNrJywgJ21ldGFkYXRhJywgJ21wYXRoJywgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbGdyYWRpZW50JywgJ3JlY3QnLCAnc3RvcCcsICdzdHlsZScsICdzd2l0Y2gnLCAnc3ltYm9sJywgJ3RleHQnLCAndGV4dHBhdGgnLCAndGl0bGUnLCAndHJlZicsICd0c3BhbicsICd2aWV3JywgJ3ZrZXJuJ10pO1xuICBjb25zdCBzdmdGaWx0ZXJzID0gZnJlZXplKFsnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZURyb3BTaGFkb3cnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJ10pO1xuXG4gIC8vIExpc3Qgb2YgU1ZHIGVsZW1lbnRzIHRoYXQgYXJlIGRpc2FsbG93ZWQgYnkgZGVmYXVsdC5cbiAgLy8gV2Ugc3RpbGwgbmVlZCB0byBrbm93IHRoZW0gc28gdGhhdCB3ZSBjYW4gZG8gbmFtZXNwYWNlXG4gIC8vIGNoZWNrcyBwcm9wZXJseSBpbiBjYXNlIG9uZSB3YW50cyB0byBhZGQgdGhlbSB0b1xuICAvLyBhbGxvdy1saXN0LlxuICBjb25zdCBzdmdEaXNhbGxvd2VkID0gZnJlZXplKFsnYW5pbWF0ZScsICdjb2xvci1wcm9maWxlJywgJ2N1cnNvcicsICdkaXNjYXJkJywgJ2ZvbnQtZmFjZScsICdmb250LWZhY2UtZm9ybWF0JywgJ2ZvbnQtZmFjZS1uYW1lJywgJ2ZvbnQtZmFjZS1zcmMnLCAnZm9udC1mYWNlLXVyaScsICdmb3JlaWdub2JqZWN0JywgJ2hhdGNoJywgJ2hhdGNocGF0aCcsICdtZXNoJywgJ21lc2hncmFkaWVudCcsICdtZXNocGF0Y2gnLCAnbWVzaHJvdycsICdtaXNzaW5nLWdseXBoJywgJ3NjcmlwdCcsICdzZXQnLCAnc29saWRjb2xvcicsICd1bmtub3duJywgJ3VzZSddKTtcbiAgY29uc3QgbWF0aE1sJDEgPSBmcmVlemUoWydtYXRoJywgJ21lbmNsb3NlJywgJ21lcnJvcicsICdtZmVuY2VkJywgJ21mcmFjJywgJ21nbHlwaCcsICdtaScsICdtbGFiZWxlZHRyJywgJ21tdWx0aXNjcmlwdHMnLCAnbW4nLCAnbW8nLCAnbW92ZXInLCAnbXBhZGRlZCcsICdtcGhhbnRvbScsICdtcm9vdCcsICdtcm93JywgJ21zJywgJ21zcGFjZScsICdtc3FydCcsICdtc3R5bGUnLCAnbXN1YicsICdtc3VwJywgJ21zdWJzdXAnLCAnbXRhYmxlJywgJ210ZCcsICdtdGV4dCcsICdtdHInLCAnbXVuZGVyJywgJ211bmRlcm92ZXInLCAnbXByZXNjcmlwdHMnXSk7XG5cbiAgLy8gU2ltaWxhcmx5IHRvIFNWRywgd2Ugd2FudCB0byBrbm93IGFsbCBNYXRoTUwgZWxlbWVudHMsXG4gIC8vIGV2ZW4gdGhvc2UgdGhhdCB3ZSBkaXNhbGxvdyBieSBkZWZhdWx0LlxuICBjb25zdCBtYXRoTWxEaXNhbGxvd2VkID0gZnJlZXplKFsnbWFjdGlvbicsICdtYWxpZ25ncm91cCcsICdtYWxpZ25tYXJrJywgJ21sb25nZGl2JywgJ21zY2FycmllcycsICdtc2NhcnJ5JywgJ21zZ3JvdXAnLCAnbXN0YWNrJywgJ21zbGluZScsICdtc3JvdycsICdzZW1hbnRpY3MnLCAnYW5ub3RhdGlvbicsICdhbm5vdGF0aW9uLXhtbCcsICdtcHJlc2NyaXB0cycsICdub25lJ10pO1xuICBjb25zdCB0ZXh0ID0gZnJlZXplKFsnI3RleHQnXSk7XG5cbiAgY29uc3QgaHRtbCA9IGZyZWV6ZShbJ2FjY2VwdCcsICdhY3Rpb24nLCAnYWxpZ24nLCAnYWx0JywgJ2F1dG9jYXBpdGFsaXplJywgJ2F1dG9jb21wbGV0ZScsICdhdXRvcGljdHVyZWlucGljdHVyZScsICdhdXRvcGxheScsICdiYWNrZ3JvdW5kJywgJ2JnY29sb3InLCAnYm9yZGVyJywgJ2NhcHR1cmUnLCAnY2VsbHBhZGRpbmcnLCAnY2VsbHNwYWNpbmcnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzJywgJ2NsZWFyJywgJ2NvbG9yJywgJ2NvbHMnLCAnY29sc3BhbicsICdjb250cm9scycsICdjb250cm9sc2xpc3QnLCAnY29vcmRzJywgJ2Nyb3Nzb3JpZ2luJywgJ2RhdGV0aW1lJywgJ2RlY29kaW5nJywgJ2RlZmF1bHQnLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJywgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLCAnZW5jdHlwZScsICdlbnRlcmtleWhpbnQnLCAnZmFjZScsICdmb3InLCAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmbGFuZycsICdpZCcsICdpbnB1dG1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzbWFwJywgJ2tpbmQnLCAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvYWRpbmcnLCAnbG9vcCcsICdsb3cnLCAnbWF4JywgJ21heGxlbmd0aCcsICdtZWRpYScsICdtZXRob2QnLCAnbWluJywgJ21pbmxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsICduYW1lJywgJ25vbmNlJywgJ25vc2hhZGUnLCAnbm92YWxpZGF0ZScsICdub3dyYXAnLCAnb3BlbicsICdvcHRpbXVtJywgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncGxheXNpbmxpbmUnLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHViZGF0ZScsICdyYWRpb2dyb3VwJywgJ3JlYWRvbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXYnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dzJywgJ3Jvd3NwYW4nLCAnc3BlbGxjaGVjaycsICdzY29wZScsICdzZWxlY3RlZCcsICdzaGFwZScsICdzaXplJywgJ3NpemVzJywgJ3NwYW4nLCAnc3JjbGFuZycsICdzdGFydCcsICdzcmMnLCAnc3Jjc2V0JywgJ3N0ZXAnLCAnc3R5bGUnLCAnc3VtbWFyeScsICd0YWJpbmRleCcsICd0aXRsZScsICd0cmFuc2xhdGUnLCAndHlwZScsICd1c2VtYXAnLCAndmFsaWduJywgJ3ZhbHVlJywgJ3dpZHRoJywgJ3htbG5zJywgJ3Nsb3QnXSk7XG4gIGNvbnN0IHN2ZyA9IGZyZWV6ZShbJ2FjY2VudC1oZWlnaHQnLCAnYWNjdW11bGF0ZScsICdhZGRpdGl2ZScsICdhbGlnbm1lbnQtYmFzZWxpbmUnLCAnYXNjZW50JywgJ2F0dHJpYnV0ZW5hbWUnLCAnYXR0cmlidXRldHlwZScsICdhemltdXRoJywgJ2Jhc2VmcmVxdWVuY3knLCAnYmFzZWxpbmUtc2hpZnQnLCAnYmVnaW4nLCAnYmlhcycsICdieScsICdjbGFzcycsICdjbGlwJywgJ2NsaXBwYXRodW5pdHMnLCAnY2xpcC1wYXRoJywgJ2NsaXAtcnVsZScsICdjb2xvcicsICdjb2xvci1pbnRlcnBvbGF0aW9uJywgJ2NvbG9yLWludGVycG9sYXRpb24tZmlsdGVycycsICdjb2xvci1wcm9maWxlJywgJ2NvbG9yLXJlbmRlcmluZycsICdjeCcsICdjeScsICdkJywgJ2R4JywgJ2R5JywgJ2RpZmZ1c2Vjb25zdGFudCcsICdkaXJlY3Rpb24nLCAnZGlzcGxheScsICdkaXZpc29yJywgJ2R1cicsICdlZGdlbW9kZScsICdlbGV2YXRpb24nLCAnZW5kJywgJ2ZpbGwnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmaWx0ZXInLCAnZmlsdGVydW5pdHMnLCAnZmxvb2QtY29sb3InLCAnZmxvb2Qtb3BhY2l0eScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZngnLCAnZnknLCAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaHJlZicsICdncmFkaWVudHVuaXRzJywgJ2dyYWRpZW50dHJhbnNmb3JtJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2ltYWdlLXJlbmRlcmluZycsICdpbicsICdpbjInLCAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuaW5nJywgJ2tleXBvaW50cycsICdrZXlzcGxpbmVzJywgJ2tleXRpbWVzJywgJ2xhbmcnLCAnbGVuZ3RoYWRqdXN0JywgJ2xldHRlci1zcGFjaW5nJywgJ2tlcm5lbG1hdHJpeCcsICdrZXJuZWx1bml0bGVuZ3RoJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ2xvY2FsJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnbWFya2VyaGVpZ2h0JywgJ21hcmtlcnVuaXRzJywgJ21hcmtlcndpZHRoJywgJ21hc2tjb250ZW50dW5pdHMnLCAnbWFza3VuaXRzJywgJ21heCcsICdtYXNrJywgJ21lZGlhJywgJ21ldGhvZCcsICdtb2RlJywgJ21pbicsICduYW1lJywgJ251bW9jdGF2ZXMnLCAnb2Zmc2V0JywgJ29wZXJhdG9yJywgJ29wYWNpdHknLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdwYWludC1vcmRlcicsICdwYXRoJywgJ3BhdGhsZW5ndGgnLCAncGF0dGVybmNvbnRlbnR1bml0cycsICdwYXR0ZXJudHJhbnNmb3JtJywgJ3BhdHRlcm51bml0cycsICdwb2ludHMnLCAncHJlc2VydmVhbHBoYScsICdwcmVzZXJ2ZWFzcGVjdHJhdGlvJywgJ3ByaW1pdGl2ZXVuaXRzJywgJ3InLCAncngnLCAncnknLCAncmFkaXVzJywgJ3JlZngnLCAncmVmeScsICdyZXBlYXRjb3VudCcsICdyZXBlYXRkdXInLCAncmVzdGFydCcsICdyZXN1bHQnLCAncm90YXRlJywgJ3NjYWxlJywgJ3NlZWQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3NwZWN1bGFyY29uc3RhbnQnLCAnc3BlY3VsYXJleHBvbmVudCcsICdzcHJlYWRtZXRob2QnLCAnc3RhcnRvZmZzZXQnLCAnc3RkZGV2aWF0aW9uJywgJ3N0aXRjaHRpbGVzJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cm9rZS1kYXNoYXJyYXknLCAnc3Ryb2tlLWRhc2hvZmZzZXQnLCAnc3Ryb2tlLWxpbmVjYXAnLCAnc3Ryb2tlLWxpbmVqb2luJywgJ3N0cm9rZS1taXRlcmxpbWl0JywgJ3N0cm9rZS1vcGFjaXR5JywgJ3N0cm9rZScsICdzdHJva2Utd2lkdGgnLCAnc3R5bGUnLCAnc3VyZmFjZXNjYWxlJywgJ3N5c3RlbWxhbmd1YWdlJywgJ3RhYmluZGV4JywgJ3RhcmdldHgnLCAndGFyZ2V0eScsICd0cmFuc2Zvcm0nLCAndHJhbnNmb3JtLW9yaWdpbicsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dGxlbmd0aCcsICd0eXBlJywgJ3UxJywgJ3UyJywgJ3VuaWNvZGUnLCAndmFsdWVzJywgJ3ZpZXdib3gnLCAndmlzaWJpbGl0eScsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3dpZHRoJywgJ3dvcmQtc3BhY2luZycsICd3cmFwJywgJ3dyaXRpbmctbW9kZScsICd4Y2hhbm5lbHNlbGVjdG9yJywgJ3ljaGFubmVsc2VsZWN0b3InLCAneCcsICd4MScsICd4MicsICd4bWxucycsICd5JywgJ3kxJywgJ3kyJywgJ3onLCAnem9vbWFuZHBhbiddKTtcbiAgY29uc3QgbWF0aE1sID0gZnJlZXplKFsnYWNjZW50JywgJ2FjY2VudHVuZGVyJywgJ2FsaWduJywgJ2JldmVsbGVkJywgJ2Nsb3NlJywgJ2NvbHVtbnNhbGlnbicsICdjb2x1bW5saW5lcycsICdjb2x1bW5zcGFuJywgJ2Rlbm9tYWxpZ24nLCAnZGVwdGgnLCAnZGlyJywgJ2Rpc3BsYXknLCAnZGlzcGxheXN0eWxlJywgJ2VuY29kaW5nJywgJ2ZlbmNlJywgJ2ZyYW1lJywgJ2hlaWdodCcsICdocmVmJywgJ2lkJywgJ2xhcmdlb3AnLCAnbGVuZ3RoJywgJ2xpbmV0aGlja25lc3MnLCAnbHNwYWNlJywgJ2xxdW90ZScsICdtYXRoYmFja2dyb3VuZCcsICdtYXRoY29sb3InLCAnbWF0aHNpemUnLCAnbWF0aHZhcmlhbnQnLCAnbWF4c2l6ZScsICdtaW5zaXplJywgJ21vdmFibGVsaW1pdHMnLCAnbm90YXRpb24nLCAnbnVtYWxpZ24nLCAnb3BlbicsICdyb3dhbGlnbicsICdyb3dsaW5lcycsICdyb3dzcGFjaW5nJywgJ3Jvd3NwYW4nLCAncnNwYWNlJywgJ3JxdW90ZScsICdzY3JpcHRsZXZlbCcsICdzY3JpcHRtaW5zaXplJywgJ3NjcmlwdHNpemVtdWx0aXBsaWVyJywgJ3NlbGVjdGlvbicsICdzZXBhcmF0b3InLCAnc2VwYXJhdG9ycycsICdzdHJldGNoeScsICdzdWJzY3JpcHRzaGlmdCcsICdzdXBzY3JpcHRzaGlmdCcsICdzeW1tZXRyaWMnLCAndm9mZnNldCcsICd3aWR0aCcsICd4bWxucyddKTtcbiAgY29uc3QgeG1sID0gZnJlZXplKFsneGxpbms6aHJlZicsICd4bWw6aWQnLCAneGxpbms6dGl0bGUnLCAneG1sOnNwYWNlJywgJ3htbG5zOnhsaW5rJ10pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL2JldHRlci1yZWdleFxuICBjb25zdCBNVVNUQUNIRV9FWFBSID0gc2VhbCgvXFx7XFx7W1xcd1xcV10qfFtcXHdcXFddKlxcfVxcfS9nbSk7IC8vIFNwZWNpZnkgdGVtcGxhdGUgZGV0ZWN0aW9uIHJlZ2V4IGZvciBTQUZFX0ZPUl9URU1QTEFURVMgbW9kZVxuICBjb25zdCBFUkJfRVhQUiA9IHNlYWwoLzwlW1xcd1xcV10qfFtcXHdcXFddKiU+L2dtKTtcbiAgY29uc3QgVE1QTElUX0VYUFIgPSBzZWFsKC9cXCR7W1xcd1xcV10qfS9nbSk7XG4gIGNvbnN0IERBVEFfQVRUUiA9IHNlYWwoL15kYXRhLVtcXC1cXHcuXFx1MDBCNy1cXHVGRkZGXS8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG4gIGNvbnN0IEFSSUFfQVRUUiA9IHNlYWwoL15hcmlhLVtcXC1cXHddKyQvKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuICBjb25zdCBJU19BTExPV0VEX1VSSSA9IHNlYWwoL14oPzooPzooPzpmfGh0KXRwcz98bWFpbHRvfHRlbHxjYWxsdG98c21zfGNpZHx4bXBwKTp8W15hLXpdfFthLXorLlxcLV0rKD86W15hLXorLlxcLTpdfCQpKS9pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGVcbiAgKTtcblxuICBjb25zdCBJU19TQ1JJUFRfT1JfREFUQSA9IHNlYWwoL14oPzpcXHcrc2NyaXB0fGRhdGEpOi9pKTtcbiAgY29uc3QgQVRUUl9XSElURVNQQUNFID0gc2VhbCgvW1xcdTAwMDAtXFx1MDAyMFxcdTAwQTBcXHUxNjgwXFx1MTgwRVxcdTIwMDAtXFx1MjAyOVxcdTIwNUZcXHUzMDAwXS9nIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29udHJvbC1yZWdleFxuICApO1xuXG4gIGNvbnN0IERPQ1RZUEVfTkFNRSA9IHNlYWwoL15odG1sJC9pKTtcblxuICB2YXIgRVhQUkVTU0lPTlMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIE1VU1RBQ0hFX0VYUFI6IE1VU1RBQ0hFX0VYUFIsXG4gICAgRVJCX0VYUFI6IEVSQl9FWFBSLFxuICAgIFRNUExJVF9FWFBSOiBUTVBMSVRfRVhQUixcbiAgICBEQVRBX0FUVFI6IERBVEFfQVRUUixcbiAgICBBUklBX0FUVFI6IEFSSUFfQVRUUixcbiAgICBJU19BTExPV0VEX1VSSTogSVNfQUxMT1dFRF9VUkksXG4gICAgSVNfU0NSSVBUX09SX0RBVEE6IElTX1NDUklQVF9PUl9EQVRBLFxuICAgIEFUVFJfV0hJVEVTUEFDRTogQVRUUl9XSElURVNQQUNFLFxuICAgIERPQ1RZUEVfTkFNRTogRE9DVFlQRV9OQU1FXG4gIH0pO1xuXG4gIGNvbnN0IGdldEdsb2JhbCA9IGZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogd2luZG93O1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbm8tb3AgcG9saWN5IGZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogRG9uJ3QgZXhwb3J0IHRoaXMgZnVuY3Rpb24gb3V0c2lkZSB0aGlzIG1vZHVsZSFcbiAgICogQHBhcmFtIHtUcnVzdGVkVHlwZVBvbGljeUZhY3Rvcnl9IHRydXN0ZWRUeXBlcyBUaGUgcG9saWN5IGZhY3RvcnkuXG4gICAqIEBwYXJhbSB7SFRNTFNjcmlwdEVsZW1lbnR9IHB1cmlmeUhvc3RFbGVtZW50IFRoZSBTY3JpcHQgZWxlbWVudCB1c2VkIHRvIGxvYWQgRE9NUHVyaWZ5ICh0byBkZXRlcm1pbmUgcG9saWN5IG5hbWUgc3VmZml4KS5cbiAgICogQHJldHVybiB7VHJ1c3RlZFR5cGVQb2xpY3l9IFRoZSBwb2xpY3kgY3JlYXRlZCAob3IgbnVsbCwgaWYgVHJ1c3RlZCBUeXBlc1xuICAgKiBhcmUgbm90IHN1cHBvcnRlZCBvciBjcmVhdGluZyB0aGUgcG9saWN5IGZhaWxlZCkuXG4gICAqL1xuICBjb25zdCBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5ID0gZnVuY3Rpb24gX2NyZWF0ZVRydXN0ZWRUeXBlc1BvbGljeSh0cnVzdGVkVHlwZXMsIHB1cmlmeUhvc3RFbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiB0cnVzdGVkVHlwZXMgIT09ICdvYmplY3QnIHx8IHR5cGVvZiB0cnVzdGVkVHlwZXMuY3JlYXRlUG9saWN5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBBbGxvdyB0aGUgY2FsbGVycyB0byBjb250cm9sIHRoZSB1bmlxdWUgcG9saWN5IG5hbWVcbiAgICAvLyBieSBhZGRpbmcgYSBkYXRhLXR0LXBvbGljeS1zdWZmaXggdG8gdGhlIHNjcmlwdCBlbGVtZW50IHdpdGggdGhlIERPTVB1cmlmeS5cbiAgICAvLyBQb2xpY3kgY3JlYXRpb24gd2l0aCBkdXBsaWNhdGUgbmFtZXMgdGhyb3dzIGluIFRydXN0ZWQgVHlwZXMuXG4gICAgbGV0IHN1ZmZpeCA9IG51bGw7XG4gICAgY29uc3QgQVRUUl9OQU1FID0gJ2RhdGEtdHQtcG9saWN5LXN1ZmZpeCc7XG4gICAgaWYgKHB1cmlmeUhvc3RFbGVtZW50ICYmIHB1cmlmeUhvc3RFbGVtZW50Lmhhc0F0dHJpYnV0ZShBVFRSX05BTUUpKSB7XG4gICAgICBzdWZmaXggPSBwdXJpZnlIb3N0RWxlbWVudC5nZXRBdHRyaWJ1dGUoQVRUUl9OQU1FKTtcbiAgICB9XG4gICAgY29uc3QgcG9saWN5TmFtZSA9ICdkb21wdXJpZnknICsgKHN1ZmZpeCA/ICcjJyArIHN1ZmZpeCA6ICcnKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3kocG9saWN5TmFtZSwge1xuICAgICAgICBjcmVhdGVIVE1MKGh0bWwpIHtcbiAgICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlU2NyaXB0VVJMKHNjcmlwdFVybCkge1xuICAgICAgICAgIHJldHVybiBzY3JpcHRVcmw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgIC8vIFBvbGljeSBjcmVhdGlvbiBmYWlsZWQgKG1vc3QgbGlrZWx5IGFub3RoZXIgRE9NUHVyaWZ5IHNjcmlwdCBoYXNcbiAgICAgIC8vIGFscmVhZHkgcnVuKS4gU2tpcCBjcmVhdGluZyB0aGUgcG9saWN5LCBhcyB0aGlzIHdpbGwgb25seSBjYXVzZSBlcnJvcnNcbiAgICAgIC8vIGlmIFRUIGFyZSBlbmZvcmNlZC5cbiAgICAgIGNvbnNvbGUud2FybignVHJ1c3RlZFR5cGVzIHBvbGljeSAnICsgcG9saWN5TmFtZSArICcgY291bGQgbm90IGJlIGNyZWF0ZWQuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH07XG4gIGZ1bmN0aW9uIGNyZWF0ZURPTVB1cmlmeSgpIHtcbiAgICBsZXQgd2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBnZXRHbG9iYWwoKTtcbiAgICBjb25zdCBET01QdXJpZnkgPSByb290ID0+IGNyZWF0ZURPTVB1cmlmeShyb290KTtcblxuICAgIC8qKlxuICAgICAqIFZlcnNpb24gbGFiZWwsIGV4cG9zZWQgZm9yIGVhc2llciBjaGVja3NcbiAgICAgKiBpZiBET01QdXJpZnkgaXMgdXAgdG8gZGF0ZSBvciBub3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkudmVyc2lvbiA9ICczLjAuOSc7XG5cbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBlbGVtZW50cyB0aGF0IERPTVB1cmlmeSByZW1vdmVkIGR1cmluZyBzYW5pdGF0aW9uLlxuICAgICAqIEVtcHR5IGlmIG5vdGhpbmcgd2FzIHJlbW92ZWQuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcbiAgICBpZiAoIXdpbmRvdyB8fCAhd2luZG93LmRvY3VtZW50IHx8IHdpbmRvdy5kb2N1bWVudC5ub2RlVHlwZSAhPT0gOSkge1xuICAgICAgLy8gTm90IHJ1bm5pbmcgaW4gYSBicm93c2VyLCBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgLy8gc28gdGhhdCB5b3UgY2FuIHBhc3MgeW91ciBvd24gV2luZG93XG4gICAgICBET01QdXJpZnkuaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBET01QdXJpZnk7XG4gICAgfVxuICAgIGxldCB7XG4gICAgICBkb2N1bWVudFxuICAgIH0gPSB3aW5kb3c7XG4gICAgY29uc3Qgb3JpZ2luYWxEb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGN1cnJlbnRTY3JpcHQgPSBvcmlnaW5hbERvY3VtZW50LmN1cnJlbnRTY3JpcHQ7XG4gICAgY29uc3Qge1xuICAgICAgRG9jdW1lbnRGcmFnbWVudCxcbiAgICAgIEhUTUxUZW1wbGF0ZUVsZW1lbnQsXG4gICAgICBOb2RlLFxuICAgICAgRWxlbWVudCxcbiAgICAgIE5vZGVGaWx0ZXIsXG4gICAgICBOYW1lZE5vZGVNYXAgPSB3aW5kb3cuTmFtZWROb2RlTWFwIHx8IHdpbmRvdy5Nb3pOYW1lZEF0dHJNYXAsXG4gICAgICBIVE1MRm9ybUVsZW1lbnQsXG4gICAgICBET01QYXJzZXIsXG4gICAgICB0cnVzdGVkVHlwZXNcbiAgICB9ID0gd2luZG93O1xuICAgIGNvbnN0IEVsZW1lbnRQcm90b3R5cGUgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICBjb25zdCBjbG9uZU5vZGUgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2Nsb25lTm9kZScpO1xuICAgIGNvbnN0IGdldE5leHRTaWJsaW5nID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICduZXh0U2libGluZycpO1xuICAgIGNvbnN0IGdldENoaWxkTm9kZXMgPSBsb29rdXBHZXR0ZXIoRWxlbWVudFByb3RvdHlwZSwgJ2NoaWxkTm9kZXMnKTtcbiAgICBjb25zdCBnZXRQYXJlbnROb2RlID0gbG9va3VwR2V0dGVyKEVsZW1lbnRQcm90b3R5cGUsICdwYXJlbnROb2RlJyk7XG5cbiAgICAvLyBBcyBwZXIgaXNzdWUgIzQ3LCB0aGUgd2ViLWNvbXBvbmVudHMgcmVnaXN0cnkgaXMgaW5oZXJpdGVkIGJ5IGFcbiAgICAvLyBuZXcgZG9jdW1lbnQgY3JlYXRlZCB2aWEgY3JlYXRlSFRNTERvY3VtZW50LiBBcyBwZXIgdGhlIHNwZWNcbiAgICAvLyAoaHR0cDovL3czYy5naXRodWIuaW8vd2ViY29tcG9uZW50cy9zcGVjL2N1c3RvbS8jY3JlYXRpbmctYW5kLXBhc3NpbmctcmVnaXN0cmllcylcbiAgICAvLyBhIG5ldyBlbXB0eSByZWdpc3RyeSBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgYSB0ZW1wbGF0ZSBjb250ZW50cyBvd25lclxuICAgIC8vIGRvY3VtZW50LCBzbyB3ZSB1c2UgdGhhdCBhcyBvdXIgcGFyZW50IGRvY3VtZW50IHRvIGVuc3VyZSBub3RoaW5nXG4gICAgLy8gaXMgaW5oZXJpdGVkLlxuICAgIGlmICh0eXBlb2YgSFRNTFRlbXBsYXRlRWxlbWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgICAgaWYgKHRlbXBsYXRlLmNvbnRlbnQgJiYgdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICAgIGRvY3VtZW50ID0gdGVtcGxhdGUuY29udGVudC5vd25lckRvY3VtZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgdHJ1c3RlZFR5cGVzUG9saWN5O1xuICAgIGxldCBlbXB0eUhUTUwgPSAnJztcbiAgICBjb25zdCB7XG4gICAgICBpbXBsZW1lbnRhdGlvbixcbiAgICAgIGNyZWF0ZU5vZGVJdGVyYXRvcixcbiAgICAgIGNyZWF0ZURvY3VtZW50RnJhZ21lbnQsXG4gICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZVxuICAgIH0gPSBkb2N1bWVudDtcbiAgICBjb25zdCB7XG4gICAgICBpbXBvcnROb2RlXG4gICAgfSA9IG9yaWdpbmFsRG9jdW1lbnQ7XG4gICAgbGV0IGhvb2tzID0ge307XG5cbiAgICAvKipcbiAgICAgKiBFeHBvc2Ugd2hldGhlciB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgcnVubmluZyB0aGUgZnVsbCBET01QdXJpZnkuXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LmlzU3VwcG9ydGVkID0gdHlwZW9mIGVudHJpZXMgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGdldFBhcmVudE5vZGUgPT09ICdmdW5jdGlvbicgJiYgaW1wbGVtZW50YXRpb24gJiYgaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50ICE9PSB1bmRlZmluZWQ7XG4gICAgY29uc3Qge1xuICAgICAgTVVTVEFDSEVfRVhQUixcbiAgICAgIEVSQl9FWFBSLFxuICAgICAgVE1QTElUX0VYUFIsXG4gICAgICBEQVRBX0FUVFIsXG4gICAgICBBUklBX0FUVFIsXG4gICAgICBJU19TQ1JJUFRfT1JfREFUQSxcbiAgICAgIEFUVFJfV0hJVEVTUEFDRVxuICAgIH0gPSBFWFBSRVNTSU9OUztcbiAgICBsZXQge1xuICAgICAgSVNfQUxMT1dFRF9VUkk6IElTX0FMTE9XRURfVVJJJDFcbiAgICB9ID0gRVhQUkVTU0lPTlM7XG5cbiAgICAvKipcbiAgICAgKiBXZSBjb25zaWRlciB0aGUgZWxlbWVudHMgYW5kIGF0dHJpYnV0ZXMgYmVsb3cgdG8gYmUgc2FmZS4gSWRlYWxseVxuICAgICAqIGRvbid0IGFkZCBhbnkgbmV3IG9uZXMgYnV0IGZlZWwgZnJlZSB0byByZW1vdmUgdW53YW50ZWQgb25lcy5cbiAgICAgKi9cblxuICAgIC8qIGFsbG93ZWQgZWxlbWVudCBuYW1lcyAqL1xuICAgIGxldCBBTExPV0VEX1RBR1MgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5odG1sJDEsIC4uLnN2ZyQxLCAuLi5zdmdGaWx0ZXJzLCAuLi5tYXRoTWwkMSwgLi4udGV4dF0pO1xuXG4gICAgLyogQWxsb3dlZCBhdHRyaWJ1dGUgbmFtZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9BVFRSID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfQVRUUiA9IGFkZFRvU2V0KHt9LCBbLi4uaHRtbCwgLi4uc3ZnLCAuLi5tYXRoTWwsIC4uLnhtbF0pO1xuXG4gICAgLypcbiAgICAgKiBDb25maWd1cmUgaG93IERPTVBVcmlmeSBzaG91bGQgaGFuZGxlIGN1c3RvbSBlbGVtZW50cyBhbmQgdGhlaXIgYXR0cmlidXRlcyBhcyB3ZWxsIGFzIGN1c3RvbWl6ZWQgYnVpbHQtaW4gZWxlbWVudHMuXG4gICAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gdGFnTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBjdXN0b20gZWxlbWVudHMpXG4gICAgICogQHByb3BlcnR5IHtSZWdFeHB8RnVuY3Rpb258bnVsbH0gYXR0cmlidXRlTmFtZUNoZWNrIG9uZSBvZiBbbnVsbCwgcmVnZXhQYXR0ZXJuLCBwcmVkaWNhdGVdLiBEZWZhdWx0OiBgbnVsbGAgKGRpc2FsbG93IGFueSBhdHRyaWJ1dGVzIG5vdCBvbiB0aGUgYWxsb3cgbGlzdClcbiAgICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50cyBhbGxvdyBjdXN0b20gZWxlbWVudHMgZGVyaXZlZCBmcm9tIGJ1aWx0LWlucyBpZiB0aGV5IHBhc3MgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrLiBEZWZhdWx0OiBgZmFsc2VgLlxuICAgICAqL1xuICAgIGxldCBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IE9iamVjdC5zZWFsKGNyZWF0ZShudWxsLCB7XG4gICAgICB0YWdOYW1lQ2hlY2s6IHtcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBudWxsXG4gICAgICB9LFxuICAgICAgYXR0cmlidXRlTmFtZUNoZWNrOiB7XG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSxcbiAgICAgIGFsbG93Q3VzdG9taXplZEJ1aWx0SW5FbGVtZW50czoge1xuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9XG4gICAgfSkpO1xuXG4gICAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gdGFncyAob3ZlcnJpZGVzIEFMTE9XRURfVEFHUy9BRERfVEFHUykgKi9cbiAgICBsZXQgRk9SQklEX1RBR1MgPSBudWxsO1xuXG4gICAgLyogRXhwbGljaXRseSBmb3JiaWRkZW4gYXR0cmlidXRlcyAob3ZlcnJpZGVzIEFMTE9XRURfQVRUUi9BRERfQVRUUikgKi9cbiAgICBsZXQgRk9SQklEX0FUVFIgPSBudWxsO1xuXG4gICAgLyogRGVjaWRlIGlmIEFSSUEgYXR0cmlidXRlcyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19BUklBX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogRGVjaWRlIGlmIGN1c3RvbSBkYXRhIGF0dHJpYnV0ZXMgYXJlIG9rYXkgKi9cbiAgICBsZXQgQUxMT1dfREFUQV9BVFRSID0gdHJ1ZTtcblxuICAgIC8qIERlY2lkZSBpZiB1bmtub3duIHByb3RvY29scyBhcmUgb2theSAqL1xuICAgIGxldCBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIHNlbGYtY2xvc2luZyB0YWdzIGluIGF0dHJpYnV0ZXMgYXJlIGFsbG93ZWQuXG4gICAgICogVXN1YWxseSByZW1vdmVkIGR1ZSB0byBhIG1YU1MgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuICAgIGxldCBBTExPV19TRUxGX0NMT1NFX0lOX0FUVFIgPSB0cnVlO1xuXG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBzYWZlIGZvciBjb21tb24gdGVtcGxhdGUgZW5naW5lcy5cbiAgICAgKiBUaGlzIG1lYW5zLCBET01QdXJpZnkgcmVtb3ZlcyBkYXRhIGF0dHJpYnV0ZXMsIG11c3RhY2hlcyBhbmQgRVJCXG4gICAgICovXG4gICAgbGV0IFNBRkVfRk9SX1RFTVBMQVRFUyA9IGZhbHNlO1xuXG4gICAgLyogRGVjaWRlIGlmIGRvY3VtZW50IHdpdGggPGh0bWw+Li4uIHNob3VsZCBiZSByZXR1cm5lZCAqL1xuICAgIGxldCBXSE9MRV9ET0NVTUVOVCA9IGZhbHNlO1xuXG4gICAgLyogVHJhY2sgd2hldGhlciBjb25maWcgaXMgYWxyZWFkeSBzZXQgb24gdGhpcyBpbnN0YW5jZSBvZiBET01QdXJpZnkuICovXG4gICAgbGV0IFNFVF9DT05GSUcgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhbGwgZWxlbWVudHMgKGUuZy4gc3R5bGUsIHNjcmlwdCkgbXVzdCBiZSBjaGlsZHJlbiBvZlxuICAgICAqIGRvY3VtZW50LmJvZHkuIEJ5IGRlZmF1bHQsIGJyb3dzZXJzIG1pZ2h0IG1vdmUgdGhlbSB0byBkb2N1bWVudC5oZWFkICovXG4gICAgbGV0IEZPUkNFX0JPRFkgPSBmYWxzZTtcblxuICAgIC8qIERlY2lkZSBpZiBhIERPTSBgSFRNTEJvZHlFbGVtZW50YCBzaG91bGQgYmUgcmV0dXJuZWQsIGluc3RlYWQgb2YgYSBodG1sXG4gICAgICogc3RyaW5nIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpLlxuICAgICAqIElmIGBXSE9MRV9ET0NVTUVOVGAgaXMgZW5hYmxlZCBhIGBIVE1MSHRtbEVsZW1lbnRgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZFxuICAgICAqL1xuICAgIGxldCBSRVRVUk5fRE9NID0gZmFsc2U7XG5cbiAgICAvKiBEZWNpZGUgaWYgYSBET00gYERvY3VtZW50RnJhZ21lbnRgIHNob3VsZCBiZSByZXR1cm5lZCwgaW5zdGVhZCBvZiBhIGh0bWxcbiAgICAgKiBzdHJpbmcgIChvciBhIFRydXN0ZWRIVE1MIG9iamVjdCBpZiBUcnVzdGVkIFR5cGVzIGFyZSBzdXBwb3J0ZWQpICovXG4gICAgbGV0IFJFVFVSTl9ET01fRlJBR01FTlQgPSBmYWxzZTtcblxuICAgIC8qIFRyeSB0byByZXR1cm4gYSBUcnVzdGVkIFR5cGUgb2JqZWN0IGluc3RlYWQgb2YgYSBzdHJpbmcsIHJldHVybiBhIHN0cmluZyBpblxuICAgICAqIGNhc2UgVHJ1c3RlZCBUeXBlcyBhcmUgbm90IHN1cHBvcnRlZCAgKi9cbiAgICBsZXQgUkVUVVJOX1RSVVNURURfVFlQRSA9IGZhbHNlO1xuXG4gICAgLyogT3V0cHV0IHNob3VsZCBiZSBmcmVlIGZyb20gRE9NIGNsb2JiZXJpbmcgYXR0YWNrcz9cbiAgICAgKiBUaGlzIHNhbml0aXplcyBtYXJrdXBzIG5hbWVkIHdpdGggY29sbGlkaW5nLCBjbG9iYmVyYWJsZSBidWlsdC1pbiBET00gQVBJcy5cbiAgICAgKi9cbiAgICBsZXQgU0FOSVRJWkVfRE9NID0gdHJ1ZTtcblxuICAgIC8qIEFjaGlldmUgZnVsbCBET00gQ2xvYmJlcmluZyBwcm90ZWN0aW9uIGJ5IGlzb2xhdGluZyB0aGUgbmFtZXNwYWNlIG9mIG5hbWVkXG4gICAgICogcHJvcGVydGllcyBhbmQgSlMgdmFyaWFibGVzLCBtaXRpZ2F0aW5nIGF0dGFja3MgdGhhdCBhYnVzZSB0aGUgSFRNTC9ET00gc3BlYyBydWxlcy5cbiAgICAgKlxuICAgICAqIEhUTUwvRE9NIHNwZWMgcnVsZXMgdGhhdCBlbmFibGUgRE9NIENsb2JiZXJpbmc6XG4gICAgICogICAtIE5hbWVkIEFjY2VzcyBvbiBXaW5kb3cgKMKnNy4zLjMpXG4gICAgICogICAtIERPTSBUcmVlIEFjY2Vzc29ycyAowqczLjEuNSlcbiAgICAgKiAgIC0gRm9ybSBFbGVtZW50IFBhcmVudC1DaGlsZCBSZWxhdGlvbnMgKMKnNC4xMC4zKVxuICAgICAqICAgLSBJZnJhbWUgc3JjZG9jIC8gTmVzdGVkIFdpbmRvd1Byb3hpZXMgKMKnNC44LjUpXG4gICAgICogICAtIEhUTUxDb2xsZWN0aW9uICjCpzQuMi4xMC4yKVxuICAgICAqXG4gICAgICogTmFtZXNwYWNlIGlzb2xhdGlvbiBpcyBpbXBsZW1lbnRlZCBieSBwcmVmaXhpbmcgYGlkYCBhbmQgYG5hbWVgIGF0dHJpYnV0ZXNcbiAgICAgKiB3aXRoIGEgY29uc3RhbnQgc3RyaW5nLCBpLmUuLCBgdXNlci1jb250ZW50LWBcbiAgICAgKi9cbiAgICBsZXQgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBmYWxzZTtcbiAgICBjb25zdCBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggPSAndXNlci1jb250ZW50LSc7XG5cbiAgICAvKiBLZWVwIGVsZW1lbnQgY29udGVudCB3aGVuIHJlbW92aW5nIGVsZW1lbnQ/ICovXG4gICAgbGV0IEtFRVBfQ09OVEVOVCA9IHRydWU7XG5cbiAgICAvKiBJZiBhIGBOb2RlYCBpcyBwYXNzZWQgdG8gc2FuaXRpemUoKSwgdGhlbiBwZXJmb3JtcyBzYW5pdGl6YXRpb24gaW4tcGxhY2UgaW5zdGVhZFxuICAgICAqIG9mIGltcG9ydGluZyBpdCBpbnRvIGEgbmV3IERvY3VtZW50IGFuZCByZXR1cm5pbmcgYSBzYW5pdGl6ZWQgY29weSAqL1xuICAgIGxldCBJTl9QTEFDRSA9IGZhbHNlO1xuXG4gICAgLyogQWxsb3cgdXNhZ2Ugb2YgcHJvZmlsZXMgbGlrZSBodG1sLCBzdmcgYW5kIG1hdGhNbCAqL1xuICAgIGxldCBVU0VfUFJPRklMRVMgPSB7fTtcblxuICAgIC8qIFRhZ3MgdG8gaWdub3JlIGNvbnRlbnQgb2Ygd2hlbiBLRUVQX0NPTlRFTlQgaXMgdHJ1ZSAqL1xuICAgIGxldCBGT1JCSURfQ09OVEVOVFMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfRk9SQklEX0NPTlRFTlRTID0gYWRkVG9TZXQoe30sIFsnYW5ub3RhdGlvbi14bWwnLCAnYXVkaW8nLCAnY29sZ3JvdXAnLCAnZGVzYycsICdmb3JlaWdub2JqZWN0JywgJ2hlYWQnLCAnaWZyYW1lJywgJ21hdGgnLCAnbWknLCAnbW4nLCAnbW8nLCAnbXMnLCAnbXRleHQnLCAnbm9lbWJlZCcsICdub2ZyYW1lcycsICdub3NjcmlwdCcsICdwbGFpbnRleHQnLCAnc2NyaXB0JywgJ3N0eWxlJywgJ3N2ZycsICd0ZW1wbGF0ZScsICd0aGVhZCcsICd0aXRsZScsICd2aWRlbycsICd4bXAnXSk7XG5cbiAgICAvKiBUYWdzIHRoYXQgYXJlIHNhZmUgZm9yIGRhdGE6IFVSSXMgKi9cbiAgICBsZXQgREFUQV9VUklfVEFHUyA9IG51bGw7XG4gICAgY29uc3QgREVGQVVMVF9EQVRBX1VSSV9UQUdTID0gYWRkVG9TZXQoe30sIFsnYXVkaW8nLCAndmlkZW8nLCAnaW1nJywgJ3NvdXJjZScsICdpbWFnZScsICd0cmFjayddKTtcblxuICAgIC8qIEF0dHJpYnV0ZXMgc2FmZSBmb3IgdmFsdWVzIGxpa2UgXCJqYXZhc2NyaXB0OlwiICovXG4gICAgbGV0IFVSSV9TQUZFX0FUVFJJQlVURVMgPSBudWxsO1xuICAgIGNvbnN0IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyA9IGFkZFRvU2V0KHt9LCBbJ2FsdCcsICdjbGFzcycsICdmb3InLCAnaWQnLCAnbGFiZWwnLCAnbmFtZScsICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3JvbGUnLCAnc3VtbWFyeScsICd0aXRsZScsICd2YWx1ZScsICdzdHlsZScsICd4bWxucyddKTtcbiAgICBjb25zdCBNQVRITUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnO1xuICAgIGNvbnN0IFNWR19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICAgIGNvbnN0IEhUTUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuICAgIC8qIERvY3VtZW50IG5hbWVzcGFjZSAqL1xuICAgIGxldCBOQU1FU1BBQ0UgPSBIVE1MX05BTUVTUEFDRTtcbiAgICBsZXQgSVNfRU1QVFlfSU5QVVQgPSBmYWxzZTtcblxuICAgIC8qIEFsbG93ZWQgWEhUTUwrWE1MIG5hbWVzcGFjZXMgKi9cbiAgICBsZXQgQUxMT1dFRF9OQU1FU1BBQ0VTID0gbnVsbDtcbiAgICBjb25zdCBERUZBVUxUX0FMTE9XRURfTkFNRVNQQUNFUyA9IGFkZFRvU2V0KHt9LCBbTUFUSE1MX05BTUVTUEFDRSwgU1ZHX05BTUVTUEFDRSwgSFRNTF9OQU1FU1BBQ0VdLCBzdHJpbmdUb1N0cmluZyk7XG5cbiAgICAvKiBQYXJzaW5nIG9mIHN0cmljdCBYSFRNTCBkb2N1bWVudHMgKi9cbiAgICBsZXQgUEFSU0VSX01FRElBX1RZUEUgPSBudWxsO1xuICAgIGNvbnN0IFNVUFBPUlRFRF9QQVJTRVJfTUVESUFfVFlQRVMgPSBbJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcsICd0ZXh0L2h0bWwnXTtcbiAgICBjb25zdCBERUZBVUxUX1BBUlNFUl9NRURJQV9UWVBFID0gJ3RleHQvaHRtbCc7XG4gICAgbGV0IHRyYW5zZm9ybUNhc2VGdW5jID0gbnVsbDtcblxuICAgIC8qIEtlZXAgYSByZWZlcmVuY2UgdG8gY29uZmlnIHRvIHBhc3MgdG8gaG9va3MgKi9cbiAgICBsZXQgQ09ORklHID0gbnVsbDtcblxuICAgIC8qIElkZWFsbHksIGRvIG5vdCB0b3VjaCBhbnl0aGluZyBiZWxvdyB0aGlzIGxpbmUgKi9cbiAgICAvKiBfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fICovXG5cbiAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBjb25zdCBpc1JlZ2V4T3JGdW5jdGlvbiA9IGZ1bmN0aW9uIGlzUmVnZXhPckZ1bmN0aW9uKHRlc3RWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRlc3RWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCB0ZXN0VmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3BhcnNlQ29uZmlnXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGNmZyBvcHRpb25hbCBjb25maWcgbGl0ZXJhbFxuICAgICAqL1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG4gICAgY29uc3QgX3BhcnNlQ29uZmlnID0gZnVuY3Rpb24gX3BhcnNlQ29uZmlnKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBpZiAoQ09ORklHICYmIENPTkZJRyA9PT0gY2ZnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gdGFtcGVyaW5nICovXG4gICAgICBpZiAoIWNmZyB8fCB0eXBlb2YgY2ZnICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBjZmcgPSB7fTtcbiAgICAgIH1cblxuICAgICAgLyogU2hpZWxkIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZyb20gcHJvdG90eXBlIHBvbGx1dGlvbiAqL1xuICAgICAgY2ZnID0gY2xvbmUoY2ZnKTtcbiAgICAgIFBBUlNFUl9NRURJQV9UWVBFID1cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1pbmNsdWRlc1xuICAgICAgU1VQUE9SVEVEX1BBUlNFUl9NRURJQV9UWVBFUy5pbmRleE9mKGNmZy5QQVJTRVJfTUVESUFfVFlQRSkgPT09IC0xID8gREVGQVVMVF9QQVJTRVJfTUVESUFfVFlQRSA6IGNmZy5QQVJTRVJfTUVESUFfVFlQRTtcblxuICAgICAgLy8gSFRNTCB0YWdzIGFuZCBhdHRyaWJ1dGVzIGFyZSBub3QgY2FzZS1zZW5zaXRpdmUsIGNvbnZlcnRpbmcgdG8gbG93ZXJjYXNlLiBLZWVwaW5nIFhIVE1MIGFzIGlzLlxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgPSBQQVJTRVJfTUVESUFfVFlQRSA9PT0gJ2FwcGxpY2F0aW9uL3hodG1sK3htbCcgPyBzdHJpbmdUb1N0cmluZyA6IHN0cmluZ1RvTG93ZXJDYXNlO1xuXG4gICAgICAvKiBTZXQgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgICBBTExPV0VEX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBTExPV0VEX1RBR1MnKSA/IGFkZFRvU2V0KHt9LCBjZmcuQUxMT1dFRF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiBERUZBVUxUX0FMTE9XRURfVEFHUztcbiAgICAgIEFMTE9XRURfQVRUUiA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0FMTE9XRURfQVRUUicpID8gYWRkVG9TZXQoe30sIGNmZy5BTExPV0VEX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IERFRkFVTFRfQUxMT1dFRF9BVFRSO1xuICAgICAgQUxMT1dFRF9OQU1FU1BBQ0VTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUxMT1dFRF9OQU1FU1BBQ0VTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkFMTE9XRURfTkFNRVNQQUNFUywgc3RyaW5nVG9TdHJpbmcpIDogREVGQVVMVF9BTExPV0VEX05BTUVTUEFDRVM7XG4gICAgICBVUklfU0FGRV9BVFRSSUJVVEVTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnQUREX1VSSV9TQUZFX0FUVFInKSA/IGFkZFRvU2V0KGNsb25lKERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUyksXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgY2ZnLkFERF9VUklfU0FGRV9BVFRSLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIHRyYW5zZm9ybUNhc2VGdW5jIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICApIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICA6IERFRkFVTFRfVVJJX1NBRkVfQVRUUklCVVRFUztcbiAgICAgIERBVEFfVVJJX1RBR1MgPSBvYmplY3RIYXNPd25Qcm9wZXJ0eShjZmcsICdBRERfREFUQV9VUklfVEFHUycpID8gYWRkVG9TZXQoY2xvbmUoREVGQVVMVF9EQVRBX1VSSV9UQUdTKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW5kZW50XG4gICAgICBjZmcuQUREX0RBVEFfVVJJX1RBR1MsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGluZGVudFxuICAgICAgdHJhbnNmb3JtQ2FzZUZ1bmMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgICkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbmRlbnRcbiAgICAgIDogREVGQVVMVF9EQVRBX1VSSV9UQUdTO1xuICAgICAgRk9SQklEX0NPTlRFTlRTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0NPTlRFTlRTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9DT05URU5UUywgdHJhbnNmb3JtQ2FzZUZ1bmMpIDogREVGQVVMVF9GT1JCSURfQ09OVEVOVFM7XG4gICAgICBGT1JCSURfVEFHUyA9IG9iamVjdEhhc093blByb3BlcnR5KGNmZywgJ0ZPUkJJRF9UQUdTJykgPyBhZGRUb1NldCh7fSwgY2ZnLkZPUkJJRF9UQUdTLCB0cmFuc2Zvcm1DYXNlRnVuYykgOiB7fTtcbiAgICAgIEZPUkJJRF9BVFRSID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnRk9SQklEX0FUVFInKSA/IGFkZFRvU2V0KHt9LCBjZmcuRk9SQklEX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKSA6IHt9O1xuICAgICAgVVNFX1BST0ZJTEVTID0gb2JqZWN0SGFzT3duUHJvcGVydHkoY2ZnLCAnVVNFX1BST0ZJTEVTJykgPyBjZmcuVVNFX1BST0ZJTEVTIDogZmFsc2U7XG4gICAgICBBTExPV19BUklBX0FUVFIgPSBjZmcuQUxMT1dfQVJJQV9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBBTExPV19EQVRBX0FUVFIgPSBjZmcuQUxMT1dfREFUQV9BVFRSICE9PSBmYWxzZTsgLy8gRGVmYXVsdCB0cnVlXG4gICAgICBBTExPV19VTktOT1dOX1BST1RPQ09MUyA9IGNmZy5BTExPV19VTktOT1dOX1BST1RPQ09MUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgQUxMT1dfU0VMRl9DTE9TRV9JTl9BVFRSID0gY2ZnLkFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgU0FGRV9GT1JfVEVNUExBVEVTID0gY2ZnLlNBRkVfRk9SX1RFTVBMQVRFUyB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgV0hPTEVfRE9DVU1FTlQgPSBjZmcuV0hPTEVfRE9DVU1FTlQgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIFJFVFVSTl9ET00gPSBjZmcuUkVUVVJOX0RPTSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgUkVUVVJOX0RPTV9GUkFHTUVOVCA9IGNmZy5SRVRVUk5fRE9NX0ZSQUdNRU5UIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBSRVRVUk5fVFJVU1RFRF9UWVBFID0gY2ZnLlJFVFVSTl9UUlVTVEVEX1RZUEUgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEZPUkNFX0JPRFkgPSBjZmcuRk9SQ0VfQk9EWSB8fCBmYWxzZTsgLy8gRGVmYXVsdCBmYWxzZVxuICAgICAgU0FOSVRJWkVfRE9NID0gY2ZnLlNBTklUSVpFX0RPTSAhPT0gZmFsc2U7IC8vIERlZmF1bHQgdHJ1ZVxuICAgICAgU0FOSVRJWkVfTkFNRURfUFJPUFMgPSBjZmcuU0FOSVRJWkVfTkFNRURfUFJPUFMgfHwgZmFsc2U7IC8vIERlZmF1bHQgZmFsc2VcbiAgICAgIEtFRVBfQ09OVEVOVCA9IGNmZy5LRUVQX0NPTlRFTlQgIT09IGZhbHNlOyAvLyBEZWZhdWx0IHRydWVcbiAgICAgIElOX1BMQUNFID0gY2ZnLklOX1BMQUNFIHx8IGZhbHNlOyAvLyBEZWZhdWx0IGZhbHNlXG4gICAgICBJU19BTExPV0VEX1VSSSQxID0gY2ZnLkFMTE9XRURfVVJJX1JFR0VYUCB8fCBJU19BTExPV0VEX1VSSTtcbiAgICAgIE5BTUVTUEFDRSA9IGNmZy5OQU1FU1BBQ0UgfHwgSFRNTF9OQU1FU1BBQ0U7XG4gICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORyA9IGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORyB8fCB7fTtcbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaykpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcudGFnTmFtZUNoZWNrID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVjaztcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgaXNSZWdleE9yRnVuY3Rpb24oY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaykpIHtcbiAgICAgICAgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrID0gY2ZnLkNVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjaztcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcgJiYgdHlwZW9mIGNmZy5DVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPT09ICdib29sZWFuJykge1xuICAgICAgICBDVVNUT01fRUxFTUVOVF9IQU5ETElORy5hbGxvd0N1c3RvbWl6ZWRCdWlsdEluRWxlbWVudHMgPSBjZmcuQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzO1xuICAgICAgfVxuICAgICAgaWYgKFNBRkVfRk9SX1RFTVBMQVRFUykge1xuICAgICAgICBBTExPV19EQVRBX0FUVFIgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChSRVRVUk5fRE9NX0ZSQUdNRU5UKSB7XG4gICAgICAgIFJFVFVSTl9ET00gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBQYXJzZSBwcm9maWxlIGluZm8gKi9cbiAgICAgIGlmIChVU0VfUFJPRklMRVMpIHtcbiAgICAgICAgQUxMT1dFRF9UQUdTID0gYWRkVG9TZXQoe30sIHRleHQpO1xuICAgICAgICBBTExPV0VEX0FUVFIgPSBbXTtcbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5odG1sID09PSB0cnVlKSB7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBodG1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgaHRtbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFVTRV9QUk9GSUxFUy5zdmcgPT09IHRydWUpIHtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIHN2ZyQxKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHN2Zyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCB4bWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChVU0VfUFJPRklMRVMuc3ZnRmlsdGVycyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgc3ZnRmlsdGVycyk7XG4gICAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBzdmcpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgeG1sKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVVNFX1BST0ZJTEVTLm1hdGhNbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgbWF0aE1sJDEpO1xuICAgICAgICAgIGFkZFRvU2V0KEFMTE9XRURfQVRUUiwgbWF0aE1sKTtcbiAgICAgICAgICBhZGRUb1NldChBTExPV0VEX0FUVFIsIHhtbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogTWVyZ2UgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJzICovXG4gICAgICBpZiAoY2ZnLkFERF9UQUdTKSB7XG4gICAgICAgIGlmIChBTExPV0VEX1RBR1MgPT09IERFRkFVTFRfQUxMT1dFRF9UQUdTKSB7XG4gICAgICAgICAgQUxMT1dFRF9UQUdTID0gY2xvbmUoQUxMT1dFRF9UQUdTKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRUb1NldChBTExPV0VEX1RBR1MsIGNmZy5BRERfVEFHUywgdHJhbnNmb3JtQ2FzZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5BRERfQVRUUikge1xuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSID09PSBERUZBVUxUX0FMTE9XRURfQVRUUikge1xuICAgICAgICAgIEFMTE9XRURfQVRUUiA9IGNsb25lKEFMTE9XRURfQVRUUik7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9BVFRSLCBjZmcuQUREX0FUVFIsIHRyYW5zZm9ybUNhc2VGdW5jKTtcbiAgICAgIH1cbiAgICAgIGlmIChjZmcuQUREX1VSSV9TQUZFX0FUVFIpIHtcbiAgICAgICAgYWRkVG9TZXQoVVJJX1NBRkVfQVRUUklCVVRFUywgY2ZnLkFERF9VUklfU0FGRV9BVFRSLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG4gICAgICBpZiAoY2ZnLkZPUkJJRF9DT05URU5UUykge1xuICAgICAgICBpZiAoRk9SQklEX0NPTlRFTlRTID09PSBERUZBVUxUX0ZPUkJJRF9DT05URU5UUykge1xuICAgICAgICAgIEZPUkJJRF9DT05URU5UUyA9IGNsb25lKEZPUkJJRF9DT05URU5UUyk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkVG9TZXQoRk9SQklEX0NPTlRFTlRTLCBjZmcuRk9SQklEX0NPTlRFTlRTLCB0cmFuc2Zvcm1DYXNlRnVuYyk7XG4gICAgICB9XG5cbiAgICAgIC8qIEFkZCAjdGV4dCBpbiBjYXNlIEtFRVBfQ09OVEVOVCBpcyBzZXQgdG8gdHJ1ZSAqL1xuICAgICAgaWYgKEtFRVBfQ09OVEVOVCkge1xuICAgICAgICBBTExPV0VEX1RBR1NbJyN0ZXh0J10gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgaHRtbCwgaGVhZCBhbmQgYm9keSB0byBBTExPV0VEX1RBR1MgaW4gY2FzZSBXSE9MRV9ET0NVTUVOVCBpcyB0cnVlICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQpIHtcbiAgICAgICAgYWRkVG9TZXQoQUxMT1dFRF9UQUdTLCBbJ2h0bWwnLCAnaGVhZCcsICdib2R5J10pO1xuICAgICAgfVxuXG4gICAgICAvKiBBZGQgdGJvZHkgdG8gQUxMT1dFRF9UQUdTIGluIGNhc2UgdGFibGVzIGFyZSBwZXJtaXR0ZWQsIHNlZSAjMjg2LCAjMzY1ICovXG4gICAgICBpZiAoQUxMT1dFRF9UQUdTLnRhYmxlKSB7XG4gICAgICAgIGFkZFRvU2V0KEFMTE9XRURfVEFHUywgWyd0Ym9keSddKTtcbiAgICAgICAgZGVsZXRlIEZPUkJJRF9UQUdTLnRib2R5O1xuICAgICAgfVxuICAgICAgaWYgKGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWSkge1xuICAgICAgICBpZiAodHlwZW9mIGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWS5jcmVhdGVIVE1MICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdUUlVTVEVEX1RZUEVTX1BPTElDWSBjb25maWd1cmF0aW9uIG9wdGlvbiBtdXN0IHByb3ZpZGUgYSBcImNyZWF0ZUhUTUxcIiBob29rLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgY2ZnLlRSVVNURURfVFlQRVNfUE9MSUNZLmNyZWF0ZVNjcmlwdFVSTCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgnVFJVU1RFRF9UWVBFU19QT0xJQ1kgY29uZmlndXJhdGlvbiBvcHRpb24gbXVzdCBwcm92aWRlIGEgXCJjcmVhdGVTY3JpcHRVUkxcIiBob29rLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3ZlcndyaXRlIGV4aXN0aW5nIFRydXN0ZWRUeXBlcyBwb2xpY3kuXG4gICAgICAgIHRydXN0ZWRUeXBlc1BvbGljeSA9IGNmZy5UUlVTVEVEX1RZUEVTX1BPTElDWTtcblxuICAgICAgICAvLyBTaWduIGxvY2FsIHZhcmlhYmxlcyByZXF1aXJlZCBieSBgc2FuaXRpemVgLlxuICAgICAgICBlbXB0eUhUTUwgPSB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTCgnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVbmluaXRpYWxpemVkIHBvbGljeSwgYXR0ZW1wdCB0byBpbml0aWFsaXplIHRoZSBpbnRlcm5hbCBkb21wdXJpZnkgcG9saWN5LlxuICAgICAgICBpZiAodHJ1c3RlZFR5cGVzUG9saWN5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0cnVzdGVkVHlwZXNQb2xpY3kgPSBfY3JlYXRlVHJ1c3RlZFR5cGVzUG9saWN5KHRydXN0ZWRUeXBlcywgY3VycmVudFNjcmlwdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjcmVhdGluZyB0aGUgaW50ZXJuYWwgcG9saWN5IHN1Y2NlZWRlZCBzaWduIGludGVybmFsIHZhcmlhYmxlcy5cbiAgICAgICAgaWYgKHRydXN0ZWRUeXBlc1BvbGljeSAhPT0gbnVsbCAmJiB0eXBlb2YgZW1wdHlIVE1MID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGVtcHR5SFRNTCA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVIVE1MKCcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBQcmV2ZW50IGZ1cnRoZXIgbWFuaXB1bGF0aW9uIG9mIGNvbmZpZ3VyYXRpb24uXG4gICAgICAvLyBOb3QgYXZhaWxhYmxlIGluIElFOCwgU2FmYXJpIDUsIGV0Yy5cbiAgICAgIGlmIChmcmVlemUpIHtcbiAgICAgICAgZnJlZXplKGNmZyk7XG4gICAgICB9XG4gICAgICBDT05GSUcgPSBjZmc7XG4gICAgfTtcbiAgICBjb25zdCBNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFMgPSBhZGRUb1NldCh7fSwgWydtaScsICdtbycsICdtbicsICdtcycsICdtdGV4dCddKTtcbiAgICBjb25zdCBIVE1MX0lOVEVHUkFUSU9OX1BPSU5UUyA9IGFkZFRvU2V0KHt9LCBbJ2ZvcmVpZ25vYmplY3QnLCAnZGVzYycsICd0aXRsZScsICdhbm5vdGF0aW9uLXhtbCddKTtcblxuICAgIC8vIENlcnRhaW4gZWxlbWVudHMgYXJlIGFsbG93ZWQgaW4gYm90aCBTVkcgYW5kIEhUTUxcbiAgICAvLyBuYW1lc3BhY2UuIFdlIG5lZWQgdG8gc3BlY2lmeSB0aGVtIGV4cGxpY2l0bHlcbiAgICAvLyBzbyB0aGF0IHRoZXkgZG9uJ3QgZ2V0IGVycm9uZW91c2x5IGRlbGV0ZWQgZnJvbVxuICAgIC8vIEhUTUwgbmFtZXNwYWNlLlxuICAgIGNvbnN0IENPTU1PTl9TVkdfQU5EX0hUTUxfRUxFTUVOVFMgPSBhZGRUb1NldCh7fSwgWyd0aXRsZScsICdzdHlsZScsICdmb250JywgJ2EnLCAnc2NyaXB0J10pO1xuXG4gICAgLyogS2VlcCB0cmFjayBvZiBhbGwgcG9zc2libGUgU1ZHIGFuZCBNYXRoTUwgdGFnc1xuICAgICAqIHNvIHRoYXQgd2UgY2FuIHBlcmZvcm0gdGhlIG5hbWVzcGFjZSBjaGVja3NcbiAgICAgKiBjb3JyZWN0bHkuICovXG4gICAgY29uc3QgQUxMX1NWR19UQUdTID0gYWRkVG9TZXQoe30sIFsuLi5zdmckMSwgLi4uc3ZnRmlsdGVycywgLi4uc3ZnRGlzYWxsb3dlZF0pO1xuICAgIGNvbnN0IEFMTF9NQVRITUxfVEFHUyA9IGFkZFRvU2V0KHt9LCBbLi4ubWF0aE1sJDEsIC4uLm1hdGhNbERpc2FsbG93ZWRdKTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQgYSBET00gZWxlbWVudCB3aG9zZSBuYW1lc3BhY2UgaXMgYmVpbmcgY2hlY2tlZFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm4gZmFsc2UgaWYgdGhlIGVsZW1lbnQgaGFzIGFcbiAgICAgKiAgbmFtZXNwYWNlIHRoYXQgYSBzcGVjLWNvbXBsaWFudCBwYXJzZXIgd291bGQgbmV2ZXJcbiAgICAgKiAgcmV0dXJuLiBSZXR1cm4gdHJ1ZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgY29uc3QgX2NoZWNrVmFsaWROYW1lc3BhY2UgPSBmdW5jdGlvbiBfY2hlY2tWYWxpZE5hbWVzcGFjZShlbGVtZW50KSB7XG4gICAgICBsZXQgcGFyZW50ID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcblxuICAgICAgLy8gSW4gSlNET00sIGlmIHdlJ3JlIGluc2lkZSBzaGFkb3cgRE9NLCB0aGVuIHBhcmVudE5vZGVcbiAgICAgIC8vIGNhbiBiZSBudWxsLiBXZSBqdXN0IHNpbXVsYXRlIHBhcmVudCBpbiB0aGlzIGNhc2UuXG4gICAgICBpZiAoIXBhcmVudCB8fCAhcGFyZW50LnRhZ05hbWUpIHtcbiAgICAgICAgcGFyZW50ID0ge1xuICAgICAgICAgIG5hbWVzcGFjZVVSSTogTkFNRVNQQUNFLFxuICAgICAgICAgIHRhZ05hbWU6ICd0ZW1wbGF0ZSdcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBzdHJpbmdUb0xvd2VyQ2FzZShlbGVtZW50LnRhZ05hbWUpO1xuICAgICAgY29uc3QgcGFyZW50VGFnTmFtZSA9IHN0cmluZ1RvTG93ZXJDYXNlKHBhcmVudC50YWdOYW1lKTtcbiAgICAgIGlmICghQUxMT1dFRF9OQU1FU1BBQ0VTW2VsZW1lbnQubmFtZXNwYWNlVVJJXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIEhUTUwgbmFtZXNwYWNlIHRvIFNWR1xuICAgICAgICAvLyBpcyB2aWEgPHN2Zz4uIElmIGl0IGhhcHBlbnMgdmlhIGFueSBvdGhlciB0YWcsIHRoZW5cbiAgICAgICAgLy8gaXQgc2hvdWxkIGJlIGtpbGxlZC5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgICAgcmV0dXJuIHRhZ05hbWUgPT09ICdzdmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIE1hdGhNTCB0byBTVkcgaXMgdmlhYFxuICAgICAgICAvLyBzdmcgaWYgcGFyZW50IGlzIGVpdGhlciA8YW5ub3RhdGlvbi14bWw+IG9yIE1hdGhNTFxuICAgICAgICAvLyB0ZXh0IGludGVncmF0aW9uIHBvaW50cy5cbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IE1BVEhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ3N2ZycgJiYgKHBhcmVudFRhZ05hbWUgPT09ICdhbm5vdGF0aW9uLXhtbCcgfHwgTUFUSE1MX1RFWFRfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG9ubHkgYWxsb3cgZWxlbWVudHMgdGhhdCBhcmUgZGVmaW5lZCBpbiBTVkdcbiAgICAgICAgLy8gc3BlYy4gQWxsIG90aGVycyBhcmUgZGlzYWxsb3dlZCBpbiBTVkcgbmFtZXNwYWNlLlxuICAgICAgICByZXR1cm4gQm9vbGVhbihBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuICAgICAgaWYgKGVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBIVE1MIG5hbWVzcGFjZSB0byBNYXRoTUxcbiAgICAgICAgLy8gaXMgdmlhIDxtYXRoPi4gSWYgaXQgaGFwcGVucyB2aWEgYW55IG90aGVyIHRhZywgdGhlblxuICAgICAgICAvLyBpdCBzaG91bGQgYmUga2lsbGVkLlxuICAgICAgICBpZiAocGFyZW50Lm5hbWVzcGFjZVVSSSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHN3aXRjaCBmcm9tIFNWRyB0byBNYXRoTUwgaXMgdmlhXG4gICAgICAgIC8vIDxtYXRoPiBhbmQgSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UpIHtcbiAgICAgICAgICByZXR1cm4gdGFnTmFtZSA9PT0gJ21hdGgnICYmIEhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2Ugb25seSBhbGxvdyBlbGVtZW50cyB0aGF0IGFyZSBkZWZpbmVkIGluIE1hdGhNTFxuICAgICAgICAvLyBzcGVjLiBBbGwgb3RoZXJzIGFyZSBkaXNhbGxvd2VkIGluIE1hdGhNTCBuYW1lc3BhY2UuXG4gICAgICAgIHJldHVybiBCb29sZWFuKEFMTF9NQVRITUxfVEFHU1t0YWdOYW1lXSk7XG4gICAgICB9XG4gICAgICBpZiAoZWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBzd2l0Y2ggZnJvbSBTVkcgdG8gSFRNTCBpcyB2aWFcbiAgICAgICAgLy8gSFRNTCBpbnRlZ3JhdGlvbiBwb2ludHMsIGFuZCBmcm9tIE1hdGhNTCB0byBIVE1MXG4gICAgICAgIC8vIGlzIHZpYSBNYXRoTUwgdGV4dCBpbnRlZ3JhdGlvbiBwb2ludHNcbiAgICAgICAgaWYgKHBhcmVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0UgJiYgIUhUTUxfSU5URUdSQVRJT05fUE9JTlRTW3BhcmVudFRhZ05hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQubmFtZXNwYWNlVVJJID09PSBNQVRITUxfTkFNRVNQQUNFICYmICFNQVRITUxfVEVYVF9JTlRFR1JBVElPTl9QT0lOVFNbcGFyZW50VGFnTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBkaXNhbGxvdyB0YWdzIHRoYXQgYXJlIHNwZWNpZmljIGZvciBNYXRoTUxcbiAgICAgICAgLy8gb3IgU1ZHIGFuZCBzaG91bGQgbmV2ZXIgYXBwZWFyIGluIEhUTUwgbmFtZXNwYWNlXG4gICAgICAgIHJldHVybiAhQUxMX01BVEhNTF9UQUdTW3RhZ05hbWVdICYmIChDT01NT05fU1ZHX0FORF9IVE1MX0VMRU1FTlRTW3RhZ05hbWVdIHx8ICFBTExfU1ZHX1RBR1NbdGFnTmFtZV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBGb3IgWEhUTUwgYW5kIFhNTCBkb2N1bWVudHMgdGhhdCBzdXBwb3J0IGN1c3RvbSBuYW1lc3BhY2VzXG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIEFMTE9XRURfTkFNRVNQQUNFU1tlbGVtZW50Lm5hbWVzcGFjZVVSSV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb2RlIHNob3VsZCBuZXZlciByZWFjaCB0aGlzIHBsYWNlICh0aGlzIG1lYW5zXG4gICAgICAvLyB0aGF0IHRoZSBlbGVtZW50IHNvbWVob3cgZ290IG5hbWVzcGFjZSB0aGF0IGlzIG5vdFxuICAgICAgLy8gSFRNTCwgU1ZHLCBNYXRoTUwgb3IgYWxsb3dlZCB2aWEgQUxMT1dFRF9OQU1FU1BBQ0VTKS5cbiAgICAgIC8vIFJldHVybiBmYWxzZSBqdXN0IGluIGNhc2UuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9mb3JjZVJlbW92ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBhIERPTSBub2RlXG4gICAgICovXG4gICAgY29uc3QgX2ZvcmNlUmVtb3ZlID0gZnVuY3Rpb24gX2ZvcmNlUmVtb3ZlKG5vZGUpIHtcbiAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICBlbGVtZW50OiBub2RlXG4gICAgICB9KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSB1bmljb3JuL3ByZWZlci1kb20tbm9kZS1yZW1vdmVcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBub2RlLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfcmVtb3ZlQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgYW4gQXR0cmlidXRlIG5hbWVcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIGEgRE9NIG5vZGVcbiAgICAgKi9cbiAgICBjb25zdCBfcmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX3JlbW92ZUF0dHJpYnV0ZShuYW1lLCBub2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShuYW1lKSxcbiAgICAgICAgICBmcm9tOiBub2RlXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBhcnJheVB1c2goRE9NUHVyaWZ5LnJlbW92ZWQsIHtcbiAgICAgICAgICBhdHRyaWJ1dGU6IG51bGwsXG4gICAgICAgICAgZnJvbTogbm9kZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuXG4gICAgICAvLyBXZSB2b2lkIGF0dHJpYnV0ZSB2YWx1ZXMgZm9yIHVucmVtb3ZhYmxlIFwiaXNcIlwiIGF0dHJpYnV0ZXNcbiAgICAgIGlmIChuYW1lID09PSAnaXMnICYmICFBTExPV0VEX0FUVFJbbmFtZV0pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET00gfHwgUkVUVVJOX0RPTV9GUkFHTUVOVCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBfZm9yY2VSZW1vdmUobm9kZSk7XG4gICAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICAgIH0gY2F0Y2ggKF8pIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2luaXREb2N1bWVudFxuICAgICAqXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBkaXJ0eSBhIHN0cmluZyBvZiBkaXJ0eSBtYXJrdXBcbiAgICAgKiBAcmV0dXJuIHtEb2N1bWVudH0gYSBET00sIGZpbGxlZCB3aXRoIHRoZSBkaXJ0eSBtYXJrdXBcbiAgICAgKi9cbiAgICBjb25zdCBfaW5pdERvY3VtZW50ID0gZnVuY3Rpb24gX2luaXREb2N1bWVudChkaXJ0eSkge1xuICAgICAgLyogQ3JlYXRlIGEgSFRNTCBkb2N1bWVudCAqL1xuICAgICAgbGV0IGRvYyA9IG51bGw7XG4gICAgICBsZXQgbGVhZGluZ1doaXRlc3BhY2UgPSBudWxsO1xuICAgICAgaWYgKEZPUkNFX0JPRFkpIHtcbiAgICAgICAgZGlydHkgPSAnPHJlbW92ZT48L3JlbW92ZT4nICsgZGlydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBJZiBGT1JDRV9CT0RZIGlzbid0IHVzZWQsIGxlYWRpbmcgd2hpdGVzcGFjZSBuZWVkcyB0byBiZSBwcmVzZXJ2ZWQgbWFudWFsbHkgKi9cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IHN0cmluZ01hdGNoKGRpcnR5LCAvXltcXHJcXG5cXHQgXSsvKTtcbiAgICAgICAgbGVhZGluZ1doaXRlc3BhY2UgPSBtYXRjaGVzICYmIG1hdGNoZXNbMF07XG4gICAgICB9XG4gICAgICBpZiAoUEFSU0VSX01FRElBX1RZUEUgPT09ICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnICYmIE5BTUVTUEFDRSA9PT0gSFRNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgLy8gUm9vdCBvZiBYSFRNTCBkb2MgbXVzdCBjb250YWluIHhtbG5zIGRlY2xhcmF0aW9uIChzZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL3hodG1sMS9ub3JtYXRpdmUuaHRtbCNzdHJpY3QpXG4gICAgICAgIGRpcnR5ID0gJzxodG1sIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiPjxoZWFkPjwvaGVhZD48Ym9keT4nICsgZGlydHkgKyAnPC9ib2R5PjwvaHRtbD4nO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlydHlQYXlsb2FkID0gdHJ1c3RlZFR5cGVzUG9saWN5ID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoZGlydHkpIDogZGlydHk7XG4gICAgICAvKlxuICAgICAgICogVXNlIHRoZSBET01QYXJzZXIgQVBJIGJ5IGRlZmF1bHQsIGZhbGxiYWNrIGxhdGVyIGlmIG5lZWRzIGJlXG4gICAgICAgKiBET01QYXJzZXIgbm90IHdvcmsgZm9yIHN2ZyB3aGVuIGhhcyBtdWx0aXBsZSByb290IGVsZW1lbnQuXG4gICAgICAgKi9cbiAgICAgIGlmIChOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhkaXJ0eVBheWxvYWQsIFBBUlNFUl9NRURJQV9UWVBFKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH1cblxuICAgICAgLyogVXNlIGNyZWF0ZUhUTUxEb2N1bWVudCBpbiBjYXNlIERPTVBhcnNlciBpcyBub3QgYXZhaWxhYmxlICovXG4gICAgICBpZiAoIWRvYyB8fCAhZG9jLmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICBkb2MgPSBpbXBsZW1lbnRhdGlvbi5jcmVhdGVEb2N1bWVudChOQU1FU1BBQ0UsICd0ZW1wbGF0ZScsIG51bGwpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRvYy5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gSVNfRU1QVFlfSU5QVVQgPyBlbXB0eUhUTUwgOiBkaXJ0eVBheWxvYWQ7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICAvLyBTeW50YXggZXJyb3IgaWYgZGlydHlQYXlsb2FkIGlzIGludmFsaWQgeG1sXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGJvZHkgPSBkb2MuYm9keSB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgaWYgKGRpcnR5ICYmIGxlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICAgIGJvZHkuaW5zZXJ0QmVmb3JlKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGxlYWRpbmdXaGl0ZXNwYWNlKSwgYm9keS5jaGlsZE5vZGVzWzBdIHx8IG51bGwpO1xuICAgICAgfVxuXG4gICAgICAvKiBXb3JrIG9uIHdob2xlIGRvY3VtZW50IG9yIGp1c3QgaXRzIGJvZHkgKi9cbiAgICAgIGlmIChOQU1FU1BBQ0UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5VGFnTmFtZS5jYWxsKGRvYywgV0hPTEVfRE9DVU1FTlQgPyAnaHRtbCcgOiAnYm9keScpWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFdIT0xFX0RPQ1VNRU5UID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGJvZHk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBOb2RlSXRlcmF0b3Igb2JqZWN0IHRoYXQgeW91IGNhbiB1c2UgdG8gdHJhdmVyc2UgZmlsdGVyZWQgbGlzdHMgb2Ygbm9kZXMgb3IgZWxlbWVudHMgaW4gYSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IHJvb3QgVGhlIHJvb3QgZWxlbWVudCBvciBub2RlIHRvIHN0YXJ0IHRyYXZlcnNpbmcgb24uXG4gICAgICogQHJldHVybiB7Tm9kZUl0ZXJhdG9yfSBUaGUgY3JlYXRlZCBOb2RlSXRlcmF0b3JcbiAgICAgKi9cbiAgICBjb25zdCBfY3JlYXRlTm9kZUl0ZXJhdG9yID0gZnVuY3Rpb24gX2NyZWF0ZU5vZGVJdGVyYXRvcihyb290KSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm9kZUl0ZXJhdG9yLmNhbGwocm9vdC5vd25lckRvY3VtZW50IHx8IHJvb3QsIHJvb3QsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQgfCBOb2RlRmlsdGVyLlNIT1dfQ09NTUVOVCB8IE5vZGVGaWx0ZXIuU0hPV19URVhULCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX2lzQ2xvYmJlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBlbG0gZWxlbWVudCB0byBjaGVjayBmb3IgY2xvYmJlcmluZyBhdHRhY2tzXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBjbG9iYmVyZWQsIGZhbHNlIGlmIHNhZmVcbiAgICAgKi9cbiAgICBjb25zdCBfaXNDbG9iYmVyZWQgPSBmdW5jdGlvbiBfaXNDbG9iYmVyZWQoZWxtKSB7XG4gICAgICByZXR1cm4gZWxtIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50ICYmICh0eXBlb2YgZWxtLm5vZGVOYW1lICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnRleHRDb250ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLnJlbW92ZUNoaWxkICE9PSAnZnVuY3Rpb24nIHx8ICEoZWxtLmF0dHJpYnV0ZXMgaW5zdGFuY2VvZiBOYW1lZE5vZGVNYXApIHx8IHR5cGVvZiBlbG0ucmVtb3ZlQXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0uc2V0QXR0cmlidXRlICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBlbG0ubmFtZXNwYWNlVVJJICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxtLmluc2VydEJlZm9yZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZWxtLmhhc0NoaWxkTm9kZXMgIT09ICdmdW5jdGlvbicpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGEgRE9NIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBvYmplY3Qgb2JqZWN0IHRvIGNoZWNrIHdoZXRoZXIgaXQncyBhIERPTSBub2RlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpcyBvYmplY3QgaXMgYSBET00gbm9kZVxuICAgICAqL1xuICAgIGNvbnN0IF9pc05vZGUgPSBmdW5jdGlvbiBfaXNOb2RlKG9iamVjdCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBOb2RlID09PSAnZnVuY3Rpb24nICYmIG9iamVjdCBpbnN0YW5jZW9mIE5vZGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9leGVjdXRlSG9va1xuICAgICAqIEV4ZWN1dGUgdXNlciBjb25maWd1cmFibGUgaG9va3NcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCAgTmFtZSBvZiB0aGUgaG9vaydzIGVudHJ5IHBvaW50XG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgbm9kZSB0byB3b3JrIG9uIHdpdGggdGhlIGhvb2tcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgYWRkaXRpb25hbCBob29rIHBhcmFtZXRlcnNcbiAgICAgKi9cbiAgICBjb25zdCBfZXhlY3V0ZUhvb2sgPSBmdW5jdGlvbiBfZXhlY3V0ZUhvb2soZW50cnlQb2ludCwgY3VycmVudE5vZGUsIGRhdGEpIHtcbiAgICAgIGlmICghaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXJyYXlGb3JFYWNoKGhvb2tzW2VudHJ5UG9pbnRdLCBob29rID0+IHtcbiAgICAgICAgaG9vay5jYWxsKERPTVB1cmlmeSwgY3VycmVudE5vZGUsIGRhdGEsIENPTkZJRyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplRWxlbWVudHNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IG5vZGVOYW1lXG4gICAgICogQHByb3RlY3QgdGV4dENvbnRlbnRcbiAgICAgKiBAcHJvdGVjdCByZW1vdmVDaGlsZFxuICAgICAqXG4gICAgICogQHBhcmFtICAge05vZGV9IGN1cnJlbnROb2RlIHRvIGNoZWNrIGZvciBwZXJtaXNzaW9uIHRvIGV4aXN0XG4gICAgICogQHJldHVybiAge0Jvb2xlYW59IHRydWUgaWYgbm9kZSB3YXMga2lsbGVkLCBmYWxzZSBpZiBsZWZ0IGFsaXZlXG4gICAgICovXG4gICAgY29uc3QgX3Nhbml0aXplRWxlbWVudHMgPSBmdW5jdGlvbiBfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkge1xuICAgICAgbGV0IGNvbnRlbnQgPSBudWxsO1xuXG4gICAgICAvKiBFeGVjdXRlIGEgaG9vayBpZiBwcmVzZW50ICovXG4gICAgICBfZXhlY3V0ZUhvb2soJ2JlZm9yZVNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG5cbiAgICAgIC8qIENoZWNrIGlmIGVsZW1lbnQgaXMgY2xvYmJlcmVkIG9yIGNhbiBjbG9iYmVyICovXG4gICAgICBpZiAoX2lzQ2xvYmJlcmVkKGN1cnJlbnROb2RlKSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogTm93IGxldCdzIGNoZWNrIHRoZSBlbGVtZW50J3MgdHlwZSBhbmQgbmFtZSAqL1xuICAgICAgY29uc3QgdGFnTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGN1cnJlbnROb2RlLm5vZGVOYW1lKTtcblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCd1cG9uU2FuaXRpemVFbGVtZW50JywgY3VycmVudE5vZGUsIHtcbiAgICAgICAgdGFnTmFtZSxcbiAgICAgICAgYWxsb3dlZFRhZ3M6IEFMTE9XRURfVEFHU1xuICAgICAgfSk7XG5cbiAgICAgIC8qIERldGVjdCBtWFNTIGF0dGVtcHRzIGFidXNpbmcgbmFtZXNwYWNlIGNvbmZ1c2lvbiAqL1xuICAgICAgaWYgKGN1cnJlbnROb2RlLmhhc0NoaWxkTm9kZXMoKSAmJiAhX2lzTm9kZShjdXJyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCkgJiYgcmVnRXhwVGVzdCgvPFsvXFx3XS9nLCBjdXJyZW50Tm9kZS5pbm5lckhUTUwpICYmIHJlZ0V4cFRlc3QoLzxbL1xcd10vZywgY3VycmVudE5vZGUudGV4dENvbnRlbnQpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZWxlbWVudCBpZiBhbnl0aGluZyBmb3JiaWRzIGl0cyBwcmVzZW5jZSAqL1xuICAgICAgaWYgKCFBTExPV0VEX1RBR1NbdGFnTmFtZV0gfHwgRk9SQklEX1RBR1NbdGFnTmFtZV0pIHtcbiAgICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhIGN1c3RvbSBlbGVtZW50IHRvIGhhbmRsZSAqL1xuICAgICAgICBpZiAoIUZPUkJJRF9UQUdTW3RhZ05hbWVdICYmIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSkge1xuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHRhZ05hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodGFnTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBLZWVwIGNvbnRlbnQgZXhjZXB0IGZvciBiYWQtbGlzdGVkIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChLRUVQX0NPTlRFTlQgJiYgIUZPUkJJRF9DT05URU5UU1t0YWdOYW1lXSkge1xuICAgICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGN1cnJlbnROb2RlKSB8fCBjdXJyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTm9kZXMgPSBnZXRDaGlsZE5vZGVzKGN1cnJlbnROb2RlKSB8fCBjdXJyZW50Tm9kZS5jaGlsZE5vZGVzO1xuICAgICAgICAgIGlmIChjaGlsZE5vZGVzICYmIHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkQ291bnQgPSBjaGlsZE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaGlsZENvdW50IC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY2xvbmVOb2RlKGNoaWxkTm9kZXNbaV0sIHRydWUpLCBnZXROZXh0U2libGluZyhjdXJyZW50Tm9kZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfZm9yY2VSZW1vdmUoY3VycmVudE5vZGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLyogQ2hlY2sgd2hldGhlciBlbGVtZW50IGhhcyBhIHZhbGlkIG5hbWVzcGFjZSAqL1xuICAgICAgaWYgKGN1cnJlbnROb2RlIGluc3RhbmNlb2YgRWxlbWVudCAmJiAhX2NoZWNrVmFsaWROYW1lc3BhY2UoY3VycmVudE5vZGUpKSB7XG4gICAgICAgIF9mb3JjZVJlbW92ZShjdXJyZW50Tm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvKiBNYWtlIHN1cmUgdGhhdCBvbGRlciBicm93c2VycyBkb24ndCBnZXQgZmFsbGJhY2stdGFnIG1YU1MgKi9cbiAgICAgIGlmICgodGFnTmFtZSA9PT0gJ25vc2NyaXB0JyB8fCB0YWdOYW1lID09PSAnbm9lbWJlZCcgfHwgdGFnTmFtZSA9PT0gJ25vZnJhbWVzJykgJiYgcmVnRXhwVGVzdCgvPFxcL25vKHNjcmlwdHxlbWJlZHxmcmFtZXMpL2ksIGN1cnJlbnROb2RlLmlubmVySFRNTCkpIHtcbiAgICAgICAgX2ZvcmNlUmVtb3ZlKGN1cnJlbnROb2RlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8qIFNhbml0aXplIGVsZW1lbnQgY29udGVudCB0byBiZSB0ZW1wbGF0ZS1zYWZlICovXG4gICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTICYmIGN1cnJlbnROb2RlLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICAgIC8qIEdldCB0aGUgZWxlbWVudCdzIHRleHQgY29udGVudCAqL1xuICAgICAgICBjb250ZW50ID0gY3VycmVudE5vZGUudGV4dENvbnRlbnQ7XG4gICAgICAgIGFycmF5Rm9yRWFjaChbTVVTVEFDSEVfRVhQUiwgRVJCX0VYUFIsIFRNUExJVF9FWFBSXSwgZXhwciA9PiB7XG4gICAgICAgICAgY29udGVudCA9IHN0cmluZ1JlcGxhY2UoY29udGVudCwgZXhwciwgJyAnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS50ZXh0Q29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICAgIGFycmF5UHVzaChET01QdXJpZnkucmVtb3ZlZCwge1xuICAgICAgICAgICAgZWxlbWVudDogY3VycmVudE5vZGUuY2xvbmVOb2RlKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjdXJyZW50Tm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplRWxlbWVudHMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9pc1ZhbGlkQXR0cmlidXRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGxjVGFnIExvd2VyY2FzZSB0YWcgbmFtZSBvZiBjb250YWluaW5nIGVsZW1lbnQuXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBsY05hbWUgTG93ZXJjYXNlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgQXR0cmlidXRlIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIHZhbGlkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbiAgICBjb25zdCBfaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9pc1ZhbGlkQXR0cmlidXRlKGxjVGFnLCBsY05hbWUsIHZhbHVlKSB7XG4gICAgICAvKiBNYWtlIHN1cmUgYXR0cmlidXRlIGNhbm5vdCBjbG9iYmVyICovXG4gICAgICBpZiAoU0FOSVRJWkVfRE9NICYmIChsY05hbWUgPT09ICdpZCcgfHwgbGNOYW1lID09PSAnbmFtZScpICYmICh2YWx1ZSBpbiBkb2N1bWVudCB8fCB2YWx1ZSBpbiBmb3JtRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvKiBBbGxvdyB2YWxpZCBkYXRhLSogYXR0cmlidXRlczogQXQgbGVhc3Qgb25lIGNoYXJhY3RlciBhZnRlciBcIi1cIlxuICAgICAgICAgIChodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9kb20uaHRtbCNlbWJlZGRpbmctY3VzdG9tLW5vbi12aXNpYmxlLWRhdGEtd2l0aC10aGUtZGF0YS0qLWF0dHJpYnV0ZXMpXG4gICAgICAgICAgWE1MLWNvbXBhdGlibGUgKGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjeG1sLWNvbXBhdGlibGUgYW5kIGh0dHA6Ly93d3cudzMub3JnL1RSL3htbC8jZDBlODA0KVxuICAgICAgICAgIFdlIGRvbid0IG5lZWQgdG8gY2hlY2sgdGhlIHZhbHVlOyBpdCdzIGFsd2F5cyBVUkkgc2FmZS4gKi9cbiAgICAgIGlmIChBTExPV19EQVRBX0FUVFIgJiYgIUZPUkJJRF9BVFRSW2xjTmFtZV0gJiYgcmVnRXhwVGVzdChEQVRBX0FUVFIsIGxjTmFtZSkpIDsgZWxzZSBpZiAoQUxMT1dfQVJJQV9BVFRSICYmIHJlZ0V4cFRlc3QoQVJJQV9BVFRSLCBsY05hbWUpKSA7IGVsc2UgaWYgKCFBTExPV0VEX0FUVFJbbGNOYW1lXSB8fCBGT1JCSURfQVRUUltsY05hbWVdKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgLy8gRmlyc3QgY29uZGl0aW9uIGRvZXMgYSB2ZXJ5IGJhc2ljIGNoZWNrIGlmIGEpIGl0J3MgYmFzaWNhbGx5IGEgdmFsaWQgY3VzdG9tIGVsZW1lbnQgdGFnbmFtZSBBTkRcbiAgICAgICAgLy8gYikgaWYgdGhlIHRhZ05hbWUgcGFzc2VzIHdoYXRldmVyIHRoZSB1c2VyIGhhcyBjb25maWd1cmVkIGZvciBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2tcbiAgICAgICAgLy8gYW5kIGMpIGlmIHRoZSBhdHRyaWJ1dGUgbmFtZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVja1xuICAgICAgICBfaXNCYXNpY0N1c3RvbUVsZW1lbnQobGNUYWcpICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIGxjVGFnKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sobGNUYWcpKSAmJiAoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrIGluc3RhbmNlb2YgUmVnRXhwICYmIHJlZ0V4cFRlc3QoQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYXR0cmlidXRlTmFtZUNoZWNrLCBsY05hbWUpIHx8IENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayBpbnN0YW5jZW9mIEZ1bmN0aW9uICYmIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLmF0dHJpYnV0ZU5hbWVDaGVjayhsY05hbWUpKSB8fFxuICAgICAgICAvLyBBbHRlcm5hdGl2ZSwgc2Vjb25kIGNvbmRpdGlvbiBjaGVja3MgaWYgaXQncyBhbiBgaXNgLWF0dHJpYnV0ZSwgQU5EXG4gICAgICAgIC8vIHRoZSB2YWx1ZSBwYXNzZXMgd2hhdGV2ZXIgdGhlIHVzZXIgaGFzIGNvbmZpZ3VyZWQgZm9yIENVU1RPTV9FTEVNRU5UX0hBTkRMSU5HLnRhZ05hbWVDaGVja1xuICAgICAgICBsY05hbWUgPT09ICdpcycgJiYgQ1VTVE9NX0VMRU1FTlRfSEFORExJTkcuYWxsb3dDdXN0b21pemVkQnVpbHRJbkVsZW1lbnRzICYmIChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcmVnRXhwVGVzdChDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2ssIHZhbHVlKSB8fCBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBDVVNUT01fRUxFTUVOVF9IQU5ETElORy50YWdOYW1lQ2hlY2sodmFsdWUpKSkgOyBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyogQ2hlY2sgdmFsdWUgaXMgc2FmZS4gRmlyc3QsIGlzIGF0dHIgaW5lcnQ/IElmIHNvLCBpcyBzYWZlICovXG4gICAgICB9IGVsc2UgaWYgKFVSSV9TQUZFX0FUVFJJQlVURVNbbGNOYW1lXSkgOyBlbHNlIGlmIChyZWdFeHBUZXN0KElTX0FMTE9XRURfVVJJJDEsIHN0cmluZ1JlcGxhY2UodmFsdWUsIEFUVFJfV0hJVEVTUEFDRSwgJycpKSkgOyBlbHNlIGlmICgobGNOYW1lID09PSAnc3JjJyB8fCBsY05hbWUgPT09ICd4bGluazpocmVmJyB8fCBsY05hbWUgPT09ICdocmVmJykgJiYgbGNUYWcgIT09ICdzY3JpcHQnICYmIHN0cmluZ0luZGV4T2YodmFsdWUsICdkYXRhOicpID09PSAwICYmIERBVEFfVVJJX1RBR1NbbGNUYWddKSA7IGVsc2UgaWYgKEFMTE9XX1VOS05PV05fUFJPVE9DT0xTICYmICFyZWdFeHBUZXN0KElTX1NDUklQVF9PUl9EQVRBLCBzdHJpbmdSZXBsYWNlKHZhbHVlLCBBVFRSX1dISVRFU1BBQ0UsICcnKSkpIDsgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBfaXNCYXNpY0N1c3RvbUVsZW1lbnRcbiAgICAgKiBjaGVja3MgaWYgYXQgbGVhc3Qgb25lIGRhc2ggaXMgaW5jbHVkZWQgaW4gdGFnTmFtZSwgYW5kIGl0J3Mgbm90IHRoZSBmaXJzdCBjaGFyXG4gICAgICogZm9yIG1vcmUgc29waGlzdGljYXRlZCBjaGVja2luZyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy92YWxpZGF0ZS1lbGVtZW50LW5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdOYW1lIG5hbWUgb2YgdGhlIHRhZyBvZiB0aGUgbm9kZSB0byBzYW5pdGl6ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBuYW1lIG1lZXRzIHRoZSBiYXNpYyBjcml0ZXJpYSBmb3IgYSBjdXN0b20gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIGNvbnN0IF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCA9IGZ1bmN0aW9uIF9pc0Jhc2ljQ3VzdG9tRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgICByZXR1cm4gdGFnTmFtZSAhPT0gJ2Fubm90YXRpb24teG1sJyAmJiB0YWdOYW1lLmluZGV4T2YoJy0nKSA+IDA7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIF9zYW5pdGl6ZUF0dHJpYnV0ZXNcbiAgICAgKlxuICAgICAqIEBwcm90ZWN0IGF0dHJpYnV0ZXNcbiAgICAgKiBAcHJvdGVjdCBub2RlTmFtZVxuICAgICAqIEBwcm90ZWN0IHJlbW92ZUF0dHJpYnV0ZVxuICAgICAqIEBwcm90ZWN0IHNldEF0dHJpYnV0ZVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gY3VycmVudE5vZGUgdG8gc2FuaXRpemVcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVBdHRyaWJ1dGVzID0gZnVuY3Rpb24gX3Nhbml0aXplQXR0cmlidXRlcyhjdXJyZW50Tm9kZSkge1xuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdiZWZvcmVTYW5pdGl6ZUF0dHJpYnV0ZXMnLCBjdXJyZW50Tm9kZSwgbnVsbCk7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGF0dHJpYnV0ZXNcbiAgICAgIH0gPSBjdXJyZW50Tm9kZTtcblxuICAgICAgLyogQ2hlY2sgaWYgd2UgaGF2ZSBhdHRyaWJ1dGVzOyBpZiBub3Qgd2UgbWlnaHQgaGF2ZSBhIHRleHQgbm9kZSAqL1xuICAgICAgaWYgKCFhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGhvb2tFdmVudCA9IHtcbiAgICAgICAgYXR0ck5hbWU6ICcnLFxuICAgICAgICBhdHRyVmFsdWU6ICcnLFxuICAgICAgICBrZWVwQXR0cjogdHJ1ZSxcbiAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXM6IEFMTE9XRURfQVRUUlxuICAgICAgfTtcbiAgICAgIGxldCBsID0gYXR0cmlidXRlcy5sZW5ndGg7XG5cbiAgICAgIC8qIEdvIGJhY2t3YXJkcyBvdmVyIGFsbCBhdHRyaWJ1dGVzOyBzYWZlbHkgcmVtb3ZlIGJhZCBvbmVzICovXG4gICAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIGNvbnN0IGF0dHIgPSBhdHRyaWJ1dGVzW2xdO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBuYW1lc3BhY2VVUkksXG4gICAgICAgICAgdmFsdWU6IGF0dHJWYWx1ZVxuICAgICAgICB9ID0gYXR0cjtcbiAgICAgICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMobmFtZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5hbWUgPT09ICd2YWx1ZScgPyBhdHRyVmFsdWUgOiBzdHJpbmdUcmltKGF0dHJWYWx1ZSk7XG5cbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgICBob29rRXZlbnQuYXR0ck5hbWUgPSBsY05hbWU7XG4gICAgICAgIGhvb2tFdmVudC5hdHRyVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaG9va0V2ZW50LmtlZXBBdHRyID0gdHJ1ZTtcbiAgICAgICAgaG9va0V2ZW50LmZvcmNlS2VlcEF0dHIgPSB1bmRlZmluZWQ7IC8vIEFsbG93cyBkZXZlbG9wZXJzIHRvIHNlZSB0aGlzIGlzIGEgcHJvcGVydHkgdGhleSBjYW4gc2V0XG4gICAgICAgIF9leGVjdXRlSG9vaygndXBvblNhbml0aXplQXR0cmlidXRlJywgY3VycmVudE5vZGUsIGhvb2tFdmVudCk7XG4gICAgICAgIHZhbHVlID0gaG9va0V2ZW50LmF0dHJWYWx1ZTtcbiAgICAgICAgLyogRGlkIHRoZSBob29rcyBhcHByb3ZlIG9mIHRoZSBhdHRyaWJ1dGU/ICovXG4gICAgICAgIGlmIChob29rRXZlbnQuZm9yY2VLZWVwQXR0cikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogUmVtb3ZlIGF0dHJpYnV0ZSAqL1xuICAgICAgICBfcmVtb3ZlQXR0cmlidXRlKG5hbWUsIGN1cnJlbnROb2RlKTtcblxuICAgICAgICAvKiBEaWQgdGhlIGhvb2tzIGFwcHJvdmUgb2YgdGhlIGF0dHJpYnV0ZT8gKi9cbiAgICAgICAgaWYgKCFob29rRXZlbnQua2VlcEF0dHIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFdvcmsgYXJvdW5kIGEgc2VjdXJpdHkgaXNzdWUgaW4galF1ZXJ5IDMuMCAqL1xuICAgICAgICBpZiAoIUFMTE9XX1NFTEZfQ0xPU0VfSU5fQVRUUiAmJiByZWdFeHBUZXN0KC9cXC8+L2ksIHZhbHVlKSkge1xuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2FuaXRpemUgYXR0cmlidXRlIGNvbnRlbnQgdG8gYmUgdGVtcGxhdGUtc2FmZSAqL1xuICAgICAgICBpZiAoU0FGRV9GT1JfVEVNUExBVEVTKSB7XG4gICAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICAgIHZhbHVlID0gc3RyaW5nUmVwbGFjZSh2YWx1ZSwgZXhwciwgJyAnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIElzIGB2YWx1ZWAgdmFsaWQgZm9yIHRoaXMgYXR0cmlidXRlPyAqL1xuICAgICAgICBjb25zdCBsY1RhZyA9IHRyYW5zZm9ybUNhc2VGdW5jKGN1cnJlbnROb2RlLm5vZGVOYW1lKTtcbiAgICAgICAgaWYgKCFfaXNWYWxpZEF0dHJpYnV0ZShsY1RhZywgbGNOYW1lLCB2YWx1ZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEZ1bGwgRE9NIENsb2JiZXJpbmcgcHJvdGVjdGlvbiB2aWEgbmFtZXNwYWNlIGlzb2xhdGlvbixcbiAgICAgICAgICogUHJlZml4IGlkIGFuZCBuYW1lIGF0dHJpYnV0ZXMgd2l0aCBgdXNlci1jb250ZW50LWBcbiAgICAgICAgICovXG4gICAgICAgIGlmIChTQU5JVElaRV9OQU1FRF9QUk9QUyAmJiAobGNOYW1lID09PSAnaWQnIHx8IGxjTmFtZSA9PT0gJ25hbWUnKSkge1xuICAgICAgICAgIC8vIFJlbW92ZSB0aGUgYXR0cmlidXRlIHdpdGggdGhpcyB2YWx1ZVxuICAgICAgICAgIF9yZW1vdmVBdHRyaWJ1dGUobmFtZSwgY3VycmVudE5vZGUpO1xuXG4gICAgICAgICAgLy8gUHJlZml4IHRoZSB2YWx1ZSBhbmQgbGF0ZXIgcmUtY3JlYXRlIHRoZSBhdHRyaWJ1dGUgd2l0aCB0aGUgc2FuaXRpemVkIHZhbHVlXG4gICAgICAgICAgdmFsdWUgPSBTQU5JVElaRV9OQU1FRF9QUk9QU19QUkVGSVggKyB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBhdHRyaWJ1dGVzIHRoYXQgcmVxdWlyZSBUcnVzdGVkIFR5cGVzICovXG4gICAgICAgIGlmICh0cnVzdGVkVHlwZXNQb2xpY3kgJiYgdHlwZW9mIHRydXN0ZWRUeXBlcyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHRydXN0ZWRUeXBlcy5nZXRBdHRyaWJ1dGVUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKG5hbWVzcGFjZVVSSSkgOyBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHJ1c3RlZFR5cGVzLmdldEF0dHJpYnV0ZVR5cGUobGNUYWcsIGxjTmFtZSkpIHtcbiAgICAgICAgICAgICAgY2FzZSAnVHJ1c3RlZEhUTUwnOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXNlICdUcnVzdGVkU2NyaXB0VVJMJzpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRydXN0ZWRUeXBlc1BvbGljeS5jcmVhdGVTY3JpcHRVUkwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEhhbmRsZSBpbnZhbGlkIGRhdGEtKiBhdHRyaWJ1dGUgc2V0IGJ5IHRyeS1jYXRjaGluZyBpdCAqL1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKiBGYWxsYmFjayB0byBzZXRBdHRyaWJ1dGUoKSBmb3IgYnJvd3Nlci11bnJlY29nbml6ZWQgbmFtZXNwYWNlcyBlLmcuIFwieC1zY2hlbWFcIi4gKi9cbiAgICAgICAgICAgIGN1cnJlbnROb2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFycmF5UG9wKERPTVB1cmlmeS5yZW1vdmVkKTtcbiAgICAgICAgfSBjYXRjaCAoXykge31cbiAgICAgIH1cblxuICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgX2V4ZWN1dGVIb29rKCdhZnRlclNhbml0aXplQXR0cmlidXRlcycsIGN1cnJlbnROb2RlLCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogX3Nhbml0aXplU2hhZG93RE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudCB0byBpdGVyYXRlIG92ZXIgcmVjdXJzaXZlbHlcbiAgICAgKi9cbiAgICBjb25zdCBfc2FuaXRpemVTaGFkb3dET00gPSBmdW5jdGlvbiBfc2FuaXRpemVTaGFkb3dET00oZnJhZ21lbnQpIHtcbiAgICAgIGxldCBzaGFkb3dOb2RlID0gbnVsbDtcbiAgICAgIGNvbnN0IHNoYWRvd0l0ZXJhdG9yID0gX2NyZWF0ZU5vZGVJdGVyYXRvcihmcmFnbWVudCk7XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYmVmb3JlU2FuaXRpemVTaGFkb3dET00nLCBmcmFnbWVudCwgbnVsbCk7XG4gICAgICB3aGlsZSAoc2hhZG93Tm9kZSA9IHNoYWRvd0l0ZXJhdG9yLm5leHROb2RlKCkpIHtcbiAgICAgICAgLyogRXhlY3V0ZSBhIGhvb2sgaWYgcHJlc2VudCAqL1xuICAgICAgICBfZXhlY3V0ZUhvb2soJ3Vwb25TYW5pdGl6ZVNoYWRvd05vZGUnLCBzaGFkb3dOb2RlLCBudWxsKTtcblxuICAgICAgICAvKiBTYW5pdGl6ZSB0YWdzIGFuZCBlbGVtZW50cyAqL1xuICAgICAgICBpZiAoX3Nhbml0aXplRWxlbWVudHMoc2hhZG93Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIERlZXAgc2hhZG93IERPTSBkZXRlY3RlZCAqL1xuICAgICAgICBpZiAoc2hhZG93Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShzaGFkb3dOb2RlLmNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogQ2hlY2sgYXR0cmlidXRlcywgc2FuaXRpemUgaWYgbmVjZXNzYXJ5ICovXG4gICAgICAgIF9zYW5pdGl6ZUF0dHJpYnV0ZXMoc2hhZG93Tm9kZSk7XG4gICAgICB9XG5cbiAgICAgIC8qIEV4ZWN1dGUgYSBob29rIGlmIHByZXNlbnQgKi9cbiAgICAgIF9leGVjdXRlSG9vaygnYWZ0ZXJTYW5pdGl6ZVNoYWRvd0RPTScsIGZyYWdtZW50LCBudWxsKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2FuaXRpemVcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHByb3ZpZGluZyBjb3JlIHNhbml0YXRpb24gZnVuY3Rpb25hbGl0eVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZX0gZGlydHkgc3RyaW5nIG9yIERPTSBub2RlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNmZyBvYmplY3RcbiAgICAgKi9cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICAgIERPTVB1cmlmeS5zYW5pdGl6ZSA9IGZ1bmN0aW9uIChkaXJ0eSkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBsZXQgYm9keSA9IG51bGw7XG4gICAgICBsZXQgaW1wb3J0ZWROb2RlID0gbnVsbDtcbiAgICAgIGxldCBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICBsZXQgcmV0dXJuTm9kZSA9IG51bGw7XG4gICAgICAvKiBNYWtlIHN1cmUgd2UgaGF2ZSBhIHN0cmluZyB0byBzYW5pdGl6ZS5cbiAgICAgICAgRE8gTk9UIHJldHVybiBlYXJseSwgYXMgdGhpcyB3aWxsIHJldHVybiB0aGUgd3JvbmcgdHlwZSBpZlxuICAgICAgICB0aGUgdXNlciBoYXMgcmVxdWVzdGVkIGEgRE9NIG9iamVjdCByYXRoZXIgdGhhbiBhIHN0cmluZyAqL1xuICAgICAgSVNfRU1QVFlfSU5QVVQgPSAhZGlydHk7XG4gICAgICBpZiAoSVNfRU1QVFlfSU5QVVQpIHtcbiAgICAgICAgZGlydHkgPSAnPCEtLT4nO1xuICAgICAgfVxuXG4gICAgICAvKiBTdHJpbmdpZnksIGluIGNhc2UgZGlydHkgaXMgYW4gb2JqZWN0ICovXG4gICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJyAmJiAhX2lzTm9kZShkaXJ0eSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkaXJ0eS50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGRpcnR5ID0gZGlydHkudG9TdHJpbmcoKTtcbiAgICAgICAgICBpZiAodHlwZW9mIGRpcnR5ICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdkaXJ0eSBpcyBub3QgYSBzdHJpbmcsIGFib3J0aW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IHR5cGVFcnJvckNyZWF0ZSgndG9TdHJpbmcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBSZXR1cm4gZGlydHkgSFRNTCBpZiBET01QdXJpZnkgY2Fubm90IHJ1biAqL1xuICAgICAgaWYgKCFET01QdXJpZnkuaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGRpcnR5O1xuICAgICAgfVxuXG4gICAgICAvKiBBc3NpZ24gY29uZmlnIHZhcnMgKi9cbiAgICAgIGlmICghU0VUX0NPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIH1cblxuICAgICAgLyogQ2xlYW4gdXAgcmVtb3ZlZCBlbGVtZW50cyAqL1xuICAgICAgRE9NUHVyaWZ5LnJlbW92ZWQgPSBbXTtcblxuICAgICAgLyogQ2hlY2sgaWYgZGlydHkgaXMgY29ycmVjdGx5IHR5cGVkIGZvciBJTl9QTEFDRSAqL1xuICAgICAgaWYgKHR5cGVvZiBkaXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgSU5fUExBQ0UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICAvKiBEbyBzb21lIGVhcmx5IHByZS1zYW5pdGl6YXRpb24gdG8gYXZvaWQgdW5zYWZlIHJvb3Qgbm9kZXMgKi9cbiAgICAgICAgaWYgKGRpcnR5Lm5vZGVOYW1lKSB7XG4gICAgICAgICAgY29uc3QgdGFnTmFtZSA9IHRyYW5zZm9ybUNhc2VGdW5jKGRpcnR5Lm5vZGVOYW1lKTtcbiAgICAgICAgICBpZiAoIUFMTE9XRURfVEFHU1t0YWdOYW1lXSB8fCBGT1JCSURfVEFHU1t0YWdOYW1lXSkge1xuICAgICAgICAgICAgdGhyb3cgdHlwZUVycm9yQ3JlYXRlKCdyb290IG5vZGUgaXMgZm9yYmlkZGVuIGFuZCBjYW5ub3QgYmUgc2FuaXRpemVkIGluLXBsYWNlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRpcnR5IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAvKiBJZiBkaXJ0eSBpcyBhIERPTSBlbGVtZW50LCBhcHBlbmQgdG8gYW4gZW1wdHkgZG9jdW1lbnQgdG8gYXZvaWRcbiAgICAgICAgICAgZWxlbWVudHMgYmVpbmcgc3RyaXBwZWQgYnkgdGhlIHBhcnNlciAqL1xuICAgICAgICBib2R5ID0gX2luaXREb2N1bWVudCgnPCEtLS0tPicpO1xuICAgICAgICBpbXBvcnRlZE5vZGUgPSBib2R5Lm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkaXJ0eSwgdHJ1ZSk7XG4gICAgICAgIGlmIChpbXBvcnRlZE5vZGUubm9kZVR5cGUgPT09IDEgJiYgaW1wb3J0ZWROb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAvKiBOb2RlIGlzIGFscmVhZHkgYSBib2R5LCB1c2UgYXMgaXMgKi9cbiAgICAgICAgICBib2R5ID0gaW1wb3J0ZWROb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGltcG9ydGVkTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgYm9keSA9IGltcG9ydGVkTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9wcmVmZXItZG9tLW5vZGUtYXBwZW5kXG4gICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChpbXBvcnRlZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBFeGl0IGRpcmVjdGx5IGlmIHdlIGhhdmUgbm90aGluZyB0byBkbyAqL1xuICAgICAgICBpZiAoIVJFVFVSTl9ET00gJiYgIVNBRkVfRk9SX1RFTVBMQVRFUyAmJiAhV0hPTEVfRE9DVU1FTlQgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWluY2x1ZGVzXG4gICAgICAgIGRpcnR5LmluZGV4T2YoJzwnKSA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1c3RlZFR5cGVzUG9saWN5ICYmIFJFVFVSTl9UUlVTVEVEX1RZUEUgPyB0cnVzdGVkVHlwZXNQb2xpY3kuY3JlYXRlSFRNTChkaXJ0eSkgOiBkaXJ0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIEluaXRpYWxpemUgdGhlIGRvY3VtZW50IHRvIHdvcmsgb24gKi9cbiAgICAgICAgYm9keSA9IF9pbml0RG9jdW1lbnQoZGlydHkpO1xuXG4gICAgICAgIC8qIENoZWNrIHdlIGhhdmUgYSBET00gbm9kZSBmcm9tIHRoZSBkYXRhICovXG4gICAgICAgIGlmICghYm9keSkge1xuICAgICAgICAgIHJldHVybiBSRVRVUk5fRE9NID8gbnVsbCA6IFJFVFVSTl9UUlVTVEVEX1RZUEUgPyBlbXB0eUhUTUwgOiAnJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKiBSZW1vdmUgZmlyc3QgZWxlbWVudCBub2RlIChvdXJzKSBpZiBGT1JDRV9CT0RZIGlzIHNldCAqL1xuICAgICAgaWYgKGJvZHkgJiYgRk9SQ0VfQk9EWSkge1xuICAgICAgICBfZm9yY2VSZW1vdmUoYm9keS5maXJzdENoaWxkKTtcbiAgICAgIH1cblxuICAgICAgLyogR2V0IG5vZGUgaXRlcmF0b3IgKi9cbiAgICAgIGNvbnN0IG5vZGVJdGVyYXRvciA9IF9jcmVhdGVOb2RlSXRlcmF0b3IoSU5fUExBQ0UgPyBkaXJ0eSA6IGJvZHkpO1xuXG4gICAgICAvKiBOb3cgc3RhcnQgaXRlcmF0aW5nIG92ZXIgdGhlIGNyZWF0ZWQgZG9jdW1lbnQgKi9cbiAgICAgIHdoaWxlIChjdXJyZW50Tm9kZSA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSB7XG4gICAgICAgIC8qIFNhbml0aXplIHRhZ3MgYW5kIGVsZW1lbnRzICovXG4gICAgICAgIGlmIChfc2FuaXRpemVFbGVtZW50cyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNoYWRvdyBET00gZGV0ZWN0ZWQsIHNhbml0aXplIGl0ICovXG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5jb250ZW50IGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIF9zYW5pdGl6ZVNoYWRvd0RPTShjdXJyZW50Tm9kZS5jb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIENoZWNrIGF0dHJpYnV0ZXMsIHNhbml0aXplIGlmIG5lY2Vzc2FyeSAqL1xuICAgICAgICBfc2FuaXRpemVBdHRyaWJ1dGVzKGN1cnJlbnROb2RlKTtcbiAgICAgIH1cblxuICAgICAgLyogSWYgd2Ugc2FuaXRpemVkIGBkaXJ0eWAgaW4tcGxhY2UsIHJldHVybiBpdC4gKi9cbiAgICAgIGlmIChJTl9QTEFDRSkge1xuICAgICAgICByZXR1cm4gZGlydHk7XG4gICAgICB9XG5cbiAgICAgIC8qIFJldHVybiBzYW5pdGl6ZWQgc3RyaW5nIG9yIERPTSAqL1xuICAgICAgaWYgKFJFVFVSTl9ET00pIHtcbiAgICAgICAgaWYgKFJFVFVSTl9ET01fRlJBR01FTlQpIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gY3JlYXRlRG9jdW1lbnRGcmFnbWVudC5jYWxsKGJvZHkub3duZXJEb2N1bWVudCk7XG4gICAgICAgICAgd2hpbGUgKGJvZHkuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWRvbS1ub2RlLWFwcGVuZFxuICAgICAgICAgICAgcmV0dXJuTm9kZS5hcHBlbmRDaGlsZChib2R5LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm5Ob2RlID0gYm9keTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3QgfHwgQUxMT1dFRF9BVFRSLnNoYWRvd3Jvb3Rtb2RlKSB7XG4gICAgICAgICAgLypcbiAgICAgICAgICAgIEFkb3B0Tm9kZSgpIGlzIG5vdCB1c2VkIGJlY2F1c2UgaW50ZXJuYWwgc3RhdGUgaXMgbm90IHJlc2V0XG4gICAgICAgICAgICAoZS5nLiB0aGUgcGFzdCBuYW1lcyBtYXAgb2YgYSBIVE1MRm9ybUVsZW1lbnQpLCB0aGlzIGlzIHNhZmVcbiAgICAgICAgICAgIGluIHRoZW9yeSBidXQgd2Ugd291bGQgcmF0aGVyIG5vdCByaXNrIGFub3RoZXIgYXR0YWNrIHZlY3Rvci5cbiAgICAgICAgICAgIFRoZSBzdGF0ZSB0aGF0IGlzIGNsb25lZCBieSBpbXBvcnROb2RlKCkgaXMgZXhwbGljaXRseSBkZWZpbmVkXG4gICAgICAgICAgICBieSB0aGUgc3BlY3MuXG4gICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm5Ob2RlID0gaW1wb3J0Tm9kZS5jYWxsKG9yaWdpbmFsRG9jdW1lbnQsIHJldHVybk5vZGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5Ob2RlO1xuICAgICAgfVxuICAgICAgbGV0IHNlcmlhbGl6ZWRIVE1MID0gV0hPTEVfRE9DVU1FTlQgPyBib2R5Lm91dGVySFRNTCA6IGJvZHkuaW5uZXJIVE1MO1xuXG4gICAgICAvKiBTZXJpYWxpemUgZG9jdHlwZSBpZiBhbGxvd2VkICovXG4gICAgICBpZiAoV0hPTEVfRE9DVU1FTlQgJiYgQUxMT1dFRF9UQUdTWychZG9jdHlwZSddICYmIGJvZHkub3duZXJEb2N1bWVudCAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZSAmJiBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lICYmIHJlZ0V4cFRlc3QoRE9DVFlQRV9OQU1FLCBib2R5Lm93bmVyRG9jdW1lbnQuZG9jdHlwZS5uYW1lKSkge1xuICAgICAgICBzZXJpYWxpemVkSFRNTCA9ICc8IURPQ1RZUEUgJyArIGJvZHkub3duZXJEb2N1bWVudC5kb2N0eXBlLm5hbWUgKyAnPlxcbicgKyBzZXJpYWxpemVkSFRNTDtcbiAgICAgIH1cblxuICAgICAgLyogU2FuaXRpemUgZmluYWwgc3RyaW5nIHRlbXBsYXRlLXNhZmUgKi9cbiAgICAgIGlmIChTQUZFX0ZPUl9URU1QTEFURVMpIHtcbiAgICAgICAgYXJyYXlGb3JFYWNoKFtNVVNUQUNIRV9FWFBSLCBFUkJfRVhQUiwgVE1QTElUX0VYUFJdLCBleHByID0+IHtcbiAgICAgICAgICBzZXJpYWxpemVkSFRNTCA9IHN0cmluZ1JlcGxhY2Uoc2VyaWFsaXplZEhUTUwsIGV4cHIsICcgJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydXN0ZWRUeXBlc1BvbGljeSAmJiBSRVRVUk5fVFJVU1RFRF9UWVBFID8gdHJ1c3RlZFR5cGVzUG9saWN5LmNyZWF0ZUhUTUwoc2VyaWFsaXplZEhUTUwpIDogc2VyaWFsaXplZEhUTUw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBtZXRob2QgdG8gc2V0IHRoZSBjb25maWd1cmF0aW9uIG9uY2VcbiAgICAgKiBzZXRDb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgKi9cbiAgICBET01QdXJpZnkuc2V0Q29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNmZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICBfcGFyc2VDb25maWcoY2ZnKTtcbiAgICAgIFNFVF9DT05GSUcgPSB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSB0aGUgY29uZmlndXJhdGlvblxuICAgICAqIGNsZWFyQ29uZmlnXG4gICAgICpcbiAgICAgKi9cbiAgICBET01QdXJpZnkuY2xlYXJDb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBDT05GSUcgPSBudWxsO1xuICAgICAgU0VUX0NPTkZJRyA9IGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNoZWNrIGlmIGFuIGF0dHJpYnV0ZSB2YWx1ZSBpcyB2YWxpZC5cbiAgICAgKiBVc2VzIGxhc3Qgc2V0IGNvbmZpZywgaWYgYW55LiBPdGhlcndpc2UsIHVzZXMgY29uZmlnIGRlZmF1bHRzLlxuICAgICAqIGlzVmFsaWRBdHRyaWJ1dGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdGFnIFRhZyBuYW1lIG9mIGNvbnRhaW5pbmcgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGF0dHIgQXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWx1ZSBBdHRyaWJ1dGUgdmFsdWUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgdmFsaWQuIE90aGVyd2lzZSwgcmV0dXJucyBmYWxzZS5cbiAgICAgKi9cbiAgICBET01QdXJpZnkuaXNWYWxpZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICh0YWcsIGF0dHIsIHZhbHVlKSB7XG4gICAgICAvKiBJbml0aWFsaXplIHNoYXJlZCBjb25maWcgdmFycyBpZiBuZWNlc3NhcnkuICovXG4gICAgICBpZiAoIUNPTkZJRykge1xuICAgICAgICBfcGFyc2VDb25maWcoe30pO1xuICAgICAgfVxuICAgICAgY29uc3QgbGNUYWcgPSB0cmFuc2Zvcm1DYXNlRnVuYyh0YWcpO1xuICAgICAgY29uc3QgbGNOYW1lID0gdHJhbnNmb3JtQ2FzZUZ1bmMoYXR0cik7XG4gICAgICByZXR1cm4gX2lzVmFsaWRBdHRyaWJ1dGUobGNUYWcsIGxjTmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGRIb29rXG4gICAgICogUHVibGljIG1ldGhvZCB0byBhZGQgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gYWRkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaG9va0Z1bmN0aW9uIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKi9cbiAgICBET01QdXJpZnkuYWRkSG9vayA9IGZ1bmN0aW9uIChlbnRyeVBvaW50LCBob29rRnVuY3Rpb24pIHtcbiAgICAgIGlmICh0eXBlb2YgaG9va0Z1bmN0aW9uICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhvb2tzW2VudHJ5UG9pbnRdID0gaG9va3NbZW50cnlQb2ludF0gfHwgW107XG4gICAgICBhcnJheVB1c2goaG9va3NbZW50cnlQb2ludF0sIGhvb2tGdW5jdGlvbik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhIERPTVB1cmlmeSBob29rIGF0IGEgZ2l2ZW4gZW50cnlQb2ludFxuICAgICAqIChwb3BzIGl0IGZyb20gdGhlIHN0YWNrIG9mIGhvb2tzIGlmIG1vcmUgYXJlIHByZXNlbnQpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2sgdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IHJlbW92ZWQocG9wcGVkKSBob29rXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUhvb2sgPSBmdW5jdGlvbiAoZW50cnlQb2ludCkge1xuICAgICAgaWYgKGhvb2tzW2VudHJ5UG9pbnRdKSB7XG4gICAgICAgIHJldHVybiBhcnJheVBvcChob29rc1tlbnRyeVBvaW50XSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZUhvb2tzXG4gICAgICogUHVibGljIG1ldGhvZCB0byByZW1vdmUgYWxsIERPTVB1cmlmeSBob29rcyBhdCBhIGdpdmVuIGVudHJ5UG9pbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZW50cnlQb2ludCBlbnRyeSBwb2ludCBmb3IgdGhlIGhvb2tzIHRvIHJlbW92ZVxuICAgICAqL1xuICAgIERPTVB1cmlmeS5yZW1vdmVIb29rcyA9IGZ1bmN0aW9uIChlbnRyeVBvaW50KSB7XG4gICAgICBpZiAoaG9va3NbZW50cnlQb2ludF0pIHtcbiAgICAgICAgaG9va3NbZW50cnlQb2ludF0gPSBbXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlQWxsSG9va3NcbiAgICAgKiBQdWJsaWMgbWV0aG9kIHRvIHJlbW92ZSBhbGwgRE9NUHVyaWZ5IGhvb2tzXG4gICAgICovXG4gICAgRE9NUHVyaWZ5LnJlbW92ZUFsbEhvb2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgaG9va3MgPSB7fTtcbiAgICB9O1xuICAgIHJldHVybiBET01QdXJpZnk7XG4gIH1cbiAgdmFyIHB1cmlmeSA9IGNyZWF0ZURPTVB1cmlmeSgpO1xuXG4gIHJldHVybiBwdXJpZnk7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXB1cmlmeS5qcy5tYXBcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9kZWZhdWx0T3B0aW9ucy5qcyc7XHJcbmltcG9ydCBkZWZhdWx0Q29tbWFuZHMgZnJvbSAnLi9kZWZhdWx0Q29tbWFuZHMuanMnO1xyXG5pbXBvcnQgeyBQbHVnaW5NYW5hZ2VyIH0gZnJvbSAnLi9wbHVnaW5NYW5hZ2VyJztcclxuaW1wb3J0IHsgUmFuZ2VIZWxwZXIgfSBmcm9tICcuL3JhbmdlSGVscGVyJztcclxuaW1wb3J0IHRlbXBsYXRlcyBmcm9tICcuL3RlbXBsYXRlcy5qcyc7XHJcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XHJcbmltcG9ydCAqIGFzIGJyb3dzZXIgZnJvbSAnLi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZW1vdGljb25zIGZyb20gJy4vZW1vdGljb25zLmpzJztcclxuaW1wb3J0IERPTVB1cmlmeSBmcm9tICdkb21wdXJpZnknO1xyXG5cclxudmFyIGdsb2JhbFdpbiA9IHdpbmRvdztcclxudmFyIGdsb2JhbERvYyA9IGRvY3VtZW50O1xyXG5cclxuLyoqXHJcbiAqIEVtbEVkaXRvciAtIFlBRSEgWWV0IEFub3RoZXIgRWRpdG9yXHJcbiAqIEBjbGFzcyBFbWxFZGl0b3JcclxuICogQG5hbWUgRW1sRWRpdG9yXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWxFZGl0b3Ige1xyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogUHVibGljIG1lbWJlcnNcclxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHRwdWJsaWMgdXNlck9wdGlvbnM6IGFueTtcclxuXHRwdWJsaWMgZWRpdG9yT3B0aW9uczogYW55O1xyXG5cdHB1YmxpYyB0ZXh0YXJlYTogYW55O1xyXG5cdHB1YmxpYyBjb21tYW5kczogYW55O1xyXG5cdHB1YmxpYyBsb25nZXN0RW1vdGljb25Db2RlOiBudW1iZXI7XHJcblx0cHVibGljIGVtb3RpY29uc0NhY2hlOiBhbnk7XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBTd2l0Y2hlcyBiZXR3ZWVuIHRoZSBXWVNJV1lHIGFuZCBzb3VyY2UgbW9kZXNcclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHRvZ2dsZVNvdXJjZU1vZGVcclxuXHQgKiBAc2luY2UgMS40LjBcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB0b2dnbGVTb3VyY2VNb2RlKCk6IHZvaWQge1xyXG5cdFx0bGV0IGlzSW5Tb3VyY2VNb2RlID0gdGhpcy5pblNvdXJjZU1vZGUoKTtcclxuXHJcblx0XHQvLyBkb24ndCBhbGxvdyBzd2l0Y2hpbmcgdG8gV1lTSVdZRyBpZiBkb2Vzbid0IHN1cHBvcnQgaXRcclxuXHRcdGlmICghYnJvd3Nlci5pc1d5c2l3eWdTdXBwb3J0ZWQgJiYgaXNJblNvdXJjZU1vZGUpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghaXNJblNvdXJjZU1vZGUpIHtcclxuXHRcdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdFx0dGhpcy5yYW5nZUhlbHBlci5jbGVhcigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3VycmVudFNlbGVjdGlvbiA9IG51bGw7XHJcblx0XHR0aGlzLmJsdXIoKTtcclxuXHJcblx0XHRpZiAoaXNJblNvdXJjZU1vZGUpIHtcclxuXHRcdFx0dGhpcy5zZXRXeXNpd3lnRWRpdG9yVmFsdWUodGhpcy5nZXRTb3VyY2VFZGl0b3JWYWx1ZSgpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2V0U291cmNlRWRpdG9yVmFsdWUodGhpcy5nZXRXeXNpd3lnRWRpdG9yVmFsdWUoKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLnRvZ2dsZSh0aGlzLnNvdXJjZUVkaXRvcik7XHJcblx0XHRkb20udG9nZ2xlKHRoaXMud3lzaXd5Z0VkaXRvcik7XHJcblxyXG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnd3lzaXd5Z01vZGUnLCBpc0luU291cmNlTW9kZSk7XHJcblx0XHRkb20udG9nZ2xlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJywgIWlzSW5Tb3VyY2VNb2RlKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVRvb2xCYXIoKTtcclxuXHRcdHRoaXMudXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCogSWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2UgY29kZSBtb2RlXHJcblx0KlxyXG5cdCogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQqIEBmdW5jdGlvblxyXG5cdCogQG5hbWUgaW5Tb3VyY2VNb2RlXHJcblx0KiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCovXHJcblx0cHVibGljIGluU291cmNlTW9kZSgpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiBkb20uaGFzQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBub2RlIHRoYXQgY29udGFpbnMgdGhlIHNlbGVjdGlvbi9jYXJldCBpblxyXG5cdCAqIFdZU0lXWUcgbW9kZS5cclxuXHQgKlxyXG5cdCAqIFdpbGwgYmUgbnVsbCBpbiBzb3VyY2VNb2RlIG9yIGlmIHRoZXJlIGlzIG5vIHNlbGVjdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gez9Ob2RlfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGN1cnJlbnROb2RlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgQ3VycmVudE5vZGUoKTogYW55IHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnROb2RlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIG5vZGUgdGhhdCBjb250YWlucyB0aGVcclxuXHQgKiBzZWxlY3Rpb24vY2FyZXQgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogV2lsbCBiZSBudWxsIGluIHNvdXJjZU1vZGUgb3IgaWYgdGhlcmUgaXMgbm8gc2VsZWN0aW9uLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7P05vZGV9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgQ3VycmVudEJsb2NrTm9kZVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC40XHJcblx0ICovXHJcblx0cHVibGljIEN1cnJlbnRCbG9ja05vZGUoKTogYW55IHtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRCbG9ja05vZGU7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGVkaXRvcnMgYmx1ciBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBpZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgYmx1cl4yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMgYmx1cihoYW5kbGVyPzogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnPzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZT86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0dGhpcy5iaW5kKCdibHVyJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0fSBlbHNlIGlmICghdGhpcy5zb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0dGhpcy53eXNpd3lnQm9keS5ibHVyKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5ibHVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgdGV4dCBlZGl0b3IgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNldFNvdXJjZUVkaXRvclZhbHVlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgc2V0U291cmNlRWRpdG9yVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IudmFsdWUgPSB2YWx1ZTtcclxuXHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZXMgdGhlIHRleHRhcmVhIHRoYXQgdGhlIGVkaXRvciBpcyByZXBsYWNpbmdcclxuXHQgKiB3aXRoIHRoZSB2YWx1ZSBjdXJyZW50bHkgaW5zaWRlIHRoZSBlZGl0b3IuXHJcblx0ICpcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB1cGRhdGVPcmlnaW5hbFxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHVwZGF0ZU9yaWdpbmFsKCkge1xyXG5cdFx0dGhpcy50ZXh0YXJlYS52YWx1ZSA9IHRoaXMudmFsKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgV1lTSVdZRyBIVE1MIGVkaXRvciB2YWx1ZS4gU2hvdWxkIG9ubHkgYmUgdGhlIEhUTUxcclxuXHQgKiBjb250YWluZWQgd2l0aGluIHRoZSBib2R5IHRhZ3NcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHNldFd5c2l3eWdFZGl0b3JWYWx1ZVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNldFd5c2l3eWdFZGl0b3JWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcblx0XHRpZiAoIXZhbHVlKSB7XHJcblx0XHRcdHZhbHVlID0gJzxwPjxiciAvPjwvcD4nO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMud3lzaXd5Z0JvZHkuaW5uZXJIVE1MID0gdGhpcy5zYW5pdGl6ZSh2YWx1ZSk7XHJcblx0XHR0aGlzLnJlcGxhY2VFbW90aWNvbnMoKTtcclxuXHRcdHRoaXMuYXBwZW5kTmV3TGluZSgpO1xyXG5cdFx0dGhpcy50cmlnZ2VyVmFsdWVDaGFuZ2VkKCk7XHJcblx0XHR0aGlzLmF1dG9FeHBhbmQoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSB0ZXh0IGVkaXRvciB2YWx1ZVxyXG5cdCAqXHJcblx0ICogSWYgdXNpbmcgYSBwbHVnaW4gdGhhdCBmaWx0ZXJzIHRoZSB0ZXh0IGxpa2UgdGhlIEJCQ29kZSBwbHVnaW5cclxuXHQgKiBpdCB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBmaWx0ZXJpbmcgd2hpY2ggaXMgQkJDb2RlIHRvXHJcblx0ICogSFRNTCBzbyBpdCB3aWxsIHJldHVybiBIVE1MLiBJZiBmaWx0ZXIgaXMgc2V0IHRvIGZhbHNlIGl0IHdpbGxcclxuXHQgKiBqdXN0IHJldHVybiB0aGUgY29udGVudHMgb2YgdGhlIHNvdXJjZSBlZGl0b3IgKEJCQ29kZSkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gez9ib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBzaW5jZSAxLjQuMFxyXG5cdCAqIEBuYW1lIGdldFNvdXJjZUVkaXRvclZhbHVlXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0U291cmNlRWRpdG9yVmFsdWUoZmlsdGVyPzogYm9vbGVhbik6IHN0cmluZyB7XHJcblx0XHRsZXQgdmFsID0gdGhpcy5zb3VyY2VFZGl0b3IudmFsdWU7XHJcblxyXG5cdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ3RvSHRtbCcgaW4gdGhpcy5mb3JtYXQpIHtcclxuXHRcdFx0dmFsID0gdGhpcy5mb3JtYXQudG9IdG1sKHZhbCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdmFsO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIDxwPlNldHMgdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGVkaXRvci48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5JZiB3aWR0aCBvciBoZWlnaHQgaXMgbm90IG51bWVyaWMgaXQgaXMgaWdub3JlZC48L3A+XHJcblx0ICpcclxuXHQgKiA8cD5UaGUgc2F2ZSBhcmd1bWVudCBzcGVjaWZpZXMgaWYgdG8gc2F2ZSB0aGUgbmV3IHNpemVzLlxyXG5cdCAqIFRoZSBzYXZlZCBzaXplcyBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2UgcmVzdG9yaW5nIGZyb21cclxuXHQgKiBtYXhpbWl6ZWQgc3RhdGUuIFRoaXMgc2hvdWxkIG5vcm1hbGx5IGJlIGxlZnQgYXMgdHJ1ZS48L3A+XHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn1cdFx0d2lkdGhcdFx0V2lkdGggaW4gcHhcclxuXHQgKiBAcGFyYW0ge251bWJlcn1cdFx0aGVpZ2h0XHRcdEhlaWdodCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn1cdFtzYXZlPXRydWVdXHRJZiB0byBzdG9yZSB0aGUgbmV3IHNpemVzXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSBkaW1lbnNpb25zXjNcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkaW1lbnNpb25zKHdpZHRoPzogYW55LCBoZWlnaHQ/OiBhbnksIHNhdmU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdC8vIHNldCB1bmRlZmluZWQgd2lkdGgvaGVpZ2h0IHRvIGJvb2xlYW4gZmFsc2VcclxuXHRcdHdpZHRoID0gKCF3aWR0aCAmJiB3aWR0aCAhPT0gMCkgPyBmYWxzZSA6IHdpZHRoO1xyXG5cdFx0aGVpZ2h0ID0gKCFoZWlnaHQgJiYgaGVpZ2h0ICE9PSAwKSA/IGZhbHNlIDogaGVpZ2h0O1xyXG5cclxuXHRcdGlmICh3aWR0aCA9PT0gZmFsc2UgJiYgaGVpZ2h0ID09PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm4geyB3aWR0aDogdGhpcy53aWR0aCgpLCBoZWlnaHQ6IHRoaXMuaGVpZ2h0KCkgfTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2lkdGggIT09IGZhbHNlKSB7XHJcblx0XHRcdGlmIChzYXZlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRcdHRoaXMub3B0aW9ucy53aWR0aCA9IHdpZHRoO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20ud2lkdGgodGhpcy5lZGl0b3JDb250YWluZXIsIHdpZHRoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaGVpZ2h0ICE9PSBmYWxzZSkge1xyXG5cdFx0XHRpZiAoc2F2ZSAhPT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLm9wdGlvbnMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20uaGVpZ2h0KHRoaXMuZWRpdG9yQ29udGFpbmVyLCBoZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyByZWFkIG9ubHlcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7YW55fSByZWFkT25seVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgcmVhZE9ubHleMlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0cHVibGljIHJlYWRPbmx5KHJlYWRPbmx5PzogYW55KTogYW55IHtcclxuXHRcdGlmICh0eXBlb2YgcmVhZE9ubHkgIT09ICdib29sZWFuJykge1xyXG5cdFx0XHRyZXR1cm4gIXRoaXMuc291cmNlRWRpdG9yLnJlYWRPbmx5O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMud3lzaXd5Z0JvZHkuY29udGVudEVkaXRhYmxlID0gKCFyZWFkT25seSkudG9TdHJpbmcoKTtcclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnJlYWRPbmx5ID0gIXJlYWRPbmx5O1xyXG5cclxuXHRcdHRoaXMudXBkYXRlVG9vbEJhcihyZWFkT25seSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhbiBldmVudCBoYW5kbGVyIHRvIHRoZSBmb2N1cyBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb24gfCBhbnl9IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBpZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgZm9jdXNeMlxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIGZvY3VzKGhhbmRsZXI/OiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc/OiBib29sZWFuLCBleGNsdWRlU291cmNlPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihoYW5kbGVyKSkge1xyXG5cdFx0XHR0aGlzLmJpbmQoJ2ZvY3VzJywgaGFuZGxlciwgZXhjbHVkZVd5c2l3eWcsIGV4Y2x1ZGVTb3VyY2UpO1xyXG5cdFx0fSBlbHNlIGlmICghdGhpcy5pblNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHQvLyBBbHJlYWR5IGhhcyBmb2N1cyBzbyBkbyBub3RoaW5nXHJcblx0XHRcdGlmIChkb20uZmluZCh0aGlzLnd5c2l3eWdEb2N1bWVudCwgJzpmb2N1cycpLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IGNvbnRhaW5lcjtcclxuXHRcdFx0bGV0IHJuZyA9IHRoaXMucmFuZ2VIZWxwZXIuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0Ly8gRml4IEZGIGJ1ZyB3aGVyZSBpdCBzaG93cyB0aGUgY3Vyc29yIGluIHRoZSB3cm9uZyBwbGFjZVxyXG5cdFx0XHQvLyBpZiB0aGUgZWRpdG9yIGhhc24ndCBoYWQgZm9jdXMgYmVmb3JlLiBTZWUgaXNzdWUgIzM5M1xyXG5cdFx0XHRpZiAoIXRoaXMuY3VycmVudFNlbGVjdGlvbikge1xyXG5cdFx0XHRcdHRoaXMuYXV0b2ZvY3VzKHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcclxuXHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcclxuXHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdGlmIChybmcgJiYgcm5nLmVuZE9mZnNldCA9PT0gMSAmJiBybmcuY29sbGFwc2VkKSB7XHJcblx0XHRcdFx0Y29udGFpbmVyID0gcm5nLmVuZENvbnRhaW5lcjtcclxuXHJcblx0XHRcdFx0aWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY2hpbGROb2Rlcy5sZW5ndGggPT09IDEgJiZcclxuXHRcdFx0XHRcdGRvbS5pcyhjb250YWluZXIuZmlyc3RDaGlsZCwgJ2JyJykpIHtcclxuXHRcdFx0XHRcdHJuZy5zZXRTdGFydEJlZm9yZShjb250YWluZXIuZmlyc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLnJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJuZyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnd5c2l3eWdXaW5kb3cuZm9jdXMoKTtcclxuXHRcdFx0dGhpcy53eXNpd3lnQm9keS5mb2N1cygpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgZWRpdG9yLlxyXG5cdCAqXHJcblx0ICogSWYgZmlsdGVyIHNldCB0cnVlIHRoZSB2YWwgd2lsbCBiZSBwYXNzZWQgdGhyb3VnaCB0aGUgZmlsdGVyXHJcblx0ICogZnVuY3Rpb24uIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luIGl0IHdpbGwgcGFzcyB0aGUgdmFsIHRvXHJcblx0ICogdGhlIEJCQ29kZSBmaWx0ZXIgdG8gY29udmVydCBhbnkgQkJDb2RlIGludG8gSFRNTC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbH0gdmFsXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbZmlsdGVyPXRydWVdXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAc2luY2UgMS4zLjVcclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWxeMlxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHZhbCh2YWw/OiBzdHJpbmcsIGZpbHRlcjogYm9vbGVhbiA9IHRydWUpOiBhbnkge1xyXG5cdFx0aWYgKCF1dGlscy5pc1N0cmluZyh2YWwpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmluU291cmNlTW9kZSgpID9cclxuXHRcdFx0XHR0aGlzLmdldFNvdXJjZUVkaXRvclZhbHVlKGZhbHNlKSA6XHJcblx0XHRcdFx0dGhpcy5nZXRXeXNpd3lnRWRpdG9yVmFsdWUoZmlsdGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuaW5Tb3VyY2VNb2RlKCkpIHtcclxuXHRcdFx0aWYgKGZpbHRlciAhPT0gZmFsc2UgJiYgJ3RvSHRtbCcgaW4gdGhpcy5mb3JtYXQpIHtcclxuXHRcdFx0XHR2YWwgPSB0aGlzLmZvcm1hdC50b0h0bWwodmFsKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5zZXRXeXNpd3lnRWRpdG9yVmFsdWUodmFsKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2V0U291cmNlRWRpdG9yVmFsdWUodmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeHBhbmRzIG9yIHNocmlua3MgdGhlIGVkaXRvcnMgaGVpZ2h0IHRvIHRoZSBoZWlnaHQgb2YgaXQncyBjb250ZW50XHJcblx0ICpcclxuXHQgKiBVbmxlc3MgaWdub3JlTWF4SGVpZ2h0IGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbm90IGV4cGFuZFxyXG5cdCAqIGhpZ2hlciB0aGFuIHRoZSBtYXhIZWlnaHQgb3B0aW9uLlxyXG5cdCAqXHJcblx0ICogQHNpbmNlIDEuMy41XHJcblx0ICogQHBhcmFtIHtib29sZWFufSBbaWdub3JlTWF4SGVpZ2h0PWZhbHNlXVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGV4cGFuZFRvQ29udGVudFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNlZSAjcmVzaXplVG9Db250ZW50XHJcblx0ICovXHJcblx0cHVibGljIGV4cGFuZFRvQ29udGVudChpZ25vcmVNYXhIZWlnaHQ6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLm1heGltaXplKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSk7XHJcblx0XHR0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICghdGhpcy5hdXRvRXhwYW5kQm91bmRzKSB7XHJcblx0XHRcdGxldCBoZWlnaHQgPSB0aGlzLm9wdGlvbnMucmVzaXplTWluSGVpZ2h0IHx8IHRoaXMub3B0aW9ucy5oZWlnaHQgfHxcclxuXHRcdFx0XHRkb20uaGVpZ2h0KHRoaXMudGV4dGFyZWEpO1xyXG5cclxuXHRcdFx0dGhpcy5hdXRvRXhwYW5kQm91bmRzID0ge1xyXG5cdFx0XHRcdG1pbjogaGVpZ2h0LFxyXG5cdFx0XHRcdG1heDogdGhpcy5vcHRpb25zLnJlc2l6ZU1heEhlaWdodCB8fCAoaGVpZ2h0ICogMilcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmFuZ2UgPSBnbG9iYWxEb2MuY3JlYXRlUmFuZ2UoKTtcclxuXHRcdHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0aGlzLnd5c2l3eWdCb2R5KTtcclxuXHJcblx0XHRsZXQgcmVjdCA9IHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0bGV0IGN1cnJlbnQgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMTtcclxuXHRcdGxldCBzcGFjZU5lZWRlZCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3A7XHJcblx0XHRsZXQgbmV3SGVpZ2h0ID0gdGhpcy5oZWlnaHQoKSArIDEgKyAoc3BhY2VOZWVkZWQgLSBjdXJyZW50KTtcclxuXHJcblx0XHRpZiAoIWlnbm9yZU1heEhlaWdodCAmJiB0aGlzLmF1dG9FeHBhbmRCb3VuZHMubWF4ICE9PSAtMSkge1xyXG5cdFx0XHRuZXdIZWlnaHQgPSBNYXRoLm1pbihuZXdIZWlnaHQsIHRoaXMuYXV0b0V4cGFuZEJvdW5kcy5tYXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuaGVpZ2h0KE1hdGguY2VpbChNYXRoLm1heChuZXdIZWlnaHQsIHRoaXMuYXV0b0V4cGFuZEJvdW5kcy5taW4pKSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIGluIFJUTCBtb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJ0bFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgcnRsXjJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBydGwocnRsPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRsZXQgZGlyID0gcnRsID8gJ3J0bCcgOiAnbHRyJztcclxuXHJcblx0XHRpZiAodHlwZW9mIHJ0bCAhPT0gJ2Jvb2xlYW4nKSB7XHJcblx0XHRcdHJldHVybiBkb20uYXR0cih0aGlzLnNvdXJjZUVkaXRvciwgJ2RpcicpID09PSAncnRsJztcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdCb2R5LCAnZGlyJywgZGlyKTtcclxuXHRcdGRvbS5hdHRyKHRoaXMuc291cmNlRWRpdG9yLCAnZGlyJywgZGlyKTtcclxuXHJcblx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdydGwnKTtcclxuXHRcdGRvbS5yZW1vdmVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ2x0cicpO1xyXG5cdFx0ZG9tLmFkZENsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBkaXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLmljb25zICYmIHRoaXMuaWNvbnMucnRsKSB7XHJcblx0XHRcdHRoaXMuaWNvbnMucnRsKHJ0bCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5hYmxlcy9kaXNhYmxlcyBlbW90aWNvbnNcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZW5hYmxlXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBlbW90aWNvbnNeMlxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4yXHJcblx0ICovXHJcblx0cHVibGljIGVtb3RpY29ucyhlbmFibGU6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0aWYgKCFlbmFibGUgJiYgZW5hYmxlICE9PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQ7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc0VkaXRvci5vcHRpb25zLmVtb3RpY29uc0VuYWJsZWQgPSBlbmFibGU7XHJcblxyXG5cdFx0aWYgKGVuYWJsZSkge1xyXG5cdFx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXByZXNzJywgbnVsbCwgdGhpc0VkaXRvci5lbW90aWNvbnNLZXlQcmVzcyk7XHJcblxyXG5cdFx0XHRpZiAoIXRoaXNFZGl0b3Iuc291cmNlTW9kZSgpKSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0dGhpc0VkaXRvci5yZXBsYWNlRW1vdGljb25zKCk7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50cmlnZ2VyVmFsdWVDaGFuZ2VkKGZhbHNlKTtcclxuXHJcblx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGV0IGVtb3RpY29ucyA9IGRvbS5maW5kKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdpbWdbZGF0YS1lbWxlZGl0b3ItZW1vdGljb25dJyk7XHJcblxyXG5cdFx0XHR1dGlscy5lYWNoKGVtb3RpY29ucywgKF8sIGltZykgPT4ge1xyXG5cdFx0XHRcdGxldCB0ZXh0OiBhbnkgPSBkb20uZGF0YShpbWcsICdlbWxlZGl0b3ItZW1vdGljb24nKTtcclxuXHRcdFx0XHRsZXQgdGV4dE5vZGUgPSB0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcclxuXHRcdFx0XHRpbWcucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dE5vZGUsIGltZyk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0ZG9tLm9mZih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBudWxsLCB0aGlzRWRpdG9yLmVtb3RpY29uc0tleVByZXNzKTtcclxuXHJcblx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgaWYgdGhlIGVkaXRvciBpcyBpbiBzb3VyY2VNb2RlXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVuYWJsZVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlTW9kZV4yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgc291cmNlTW9kZShlbmFibGU/OiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBpblNvdXJjZU1vZGUgPSB0aGlzLmluU291cmNlTW9kZSgpO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgZW5hYmxlICE9PSAnYm9vbGVhbicpIHtcclxuXHRcdFx0cmV0dXJuIGluU291cmNlTW9kZTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoKGluU291cmNlTW9kZSAmJiAhZW5hYmxlKSB8fCAoIWluU291cmNlTW9kZSAmJiBlbmFibGUpKSB7XHJcblx0XHRcdHRoaXMudG9nZ2xlU291cmNlTW9kZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgd2lkdGggb2YgdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogVGhlIHNhdmVXaWR0aCBzcGVjaWZpZXMgaWYgdG8gc2F2ZSB0aGUgd2lkdGguIFRoZSBzdG9yZWQgd2lkdGggY2FuIGJlXHJcblx0ICogdXNlZCBmb3IgdGhpbmdzIGxpa2UgcmVzdG9yaW5nIGZyb20gbWF4aW1pemVkIHN0YXRlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9ICAgICB3aWR0aCAgICAgICAgICAgIFdpZHRoIGluIHBpeGVsc1xyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn1cdFtzYXZlV2lkdGg9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIHdpZHRoXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAbmFtZSB3aWR0aF4zXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRwdWJsaWMgd2lkdGgod2lkdGg/OiBudW1iZXIsIHNhdmVXaWR0aD86IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0aWYgKCF3aWR0aCAmJiB3aWR0aCAhPT0gMCkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLndpZHRoKHRoaXMuZWRpdG9yQ29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmRpbWVuc2lvbnMod2lkdGgsIG51bGwsIHNhdmVXaWR0aCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgaGVpZ2h0IG9mIHRoZSBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIFRoZSBzYXZlSGVpZ2h0IHNwZWNpZmllcyBpZiB0byBzYXZlIHRoZSBoZWlnaHQuXHJcblx0ICpcclxuXHQgKiBUaGUgc3RvcmVkIGhlaWdodCBjYW4gYmUgdXNlZCBmb3IgdGhpbmdzIGxpa2VcclxuXHQgKiByZXN0b3JpbmcgZnJvbSBtYXhpbWl6ZWQgc3RhdGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBpbiBweFxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NhdmVIZWlnaHQ9dHJ1ZV0gSWYgdG8gc3RvcmUgdGhlIGhlaWdodFxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgaGVpZ2h0XjNcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBoZWlnaHQoaGVpZ2h0PzogbnVtYmVyLCBzYXZlSGVpZ2h0PzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRpZiAoIWhlaWdodCAmJiBoZWlnaHQgIT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGRvbS5oZWlnaHQodGhpcy5lZGl0b3JDb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZGltZW5zaW9ucyhudWxsLCBoZWlnaHQsIHNhdmVIZWlnaHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBtZW51IGl0ZW0gZHJvcCBkb3duXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbWVudUl0ZW0gVGhlIGJ1dHRvbiB0byBhbGlnbiB0aGUgZHJvcGRvd24gd2l0aFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAgICAgICAgICBVc2VkIGZvciBzdHlsaW5nIHRoZSBkcm9wZG93biwgd2lsbCBiZVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGNsYXNzIGVtbGVkaXRvci1uYW1lXHJcblx0ICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRlbnQgIFRoZSBIVE1MIGNvbnRlbnQgb2YgdGhlIGRyb3Bkb3duXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgY3JlYXRlRHJvcERvd25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjcmVhdGVEcm9wRG93bihtZW51SXRlbTogSFRNTEVsZW1lbnQsIG5hbWU6IHN0cmluZywgY29udGVudDogSFRNTEVsZW1lbnQpIHtcclxuXHRcdC8vIGZpcnN0IGNsaWNrIGZvciBjcmVhdGUgc2Vjb25kIGNsaWNrIGZvciBjbG9zZVxyXG5cdFx0bGV0IGRyb3BEb3duQ3NzLCBkcm9wRG93bkNsYXNzID0gJ2VtbGVkaXRvci0nICsgbmFtZTtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHRoaXNFZGl0b3IuY2xvc2VEcm9wRG93bigpO1xyXG5cclxuXHRcdC8vIE9ubHkgY2xvc2UgdGhlIGRyb3Bkb3duIGlmIGl0IHdhcyBhbHJlYWR5IG9wZW5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmRyb3Bkb3duICYmIGRvbS5oYXNDbGFzcyh0aGlzRWRpdG9yLmRyb3Bkb3duLCBkcm9wRG93bkNsYXNzKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0ZHJvcERvd25Dc3MgPSB1dGlscy5leHRlbmQoe1xyXG5cdFx0XHR0b3A6IG1lbnVJdGVtLm9mZnNldFRvcCxcclxuXHRcdFx0bGVmdDogbWVudUl0ZW0ub2Zmc2V0TGVmdCxcclxuXHRcdFx0bWFyZ2luVG9wOiBtZW51SXRlbS5jbGllbnRIZWlnaHRcclxuXHRcdH0sIHRoaXNFZGl0b3Iub3B0aW9ucy5kcm9wRG93bkNzcyk7XHJcblxyXG5cdFx0dGhpc0VkaXRvci5kcm9wZG93biA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1kcm9wZG93biAnICsgZHJvcERvd25DbGFzc1xyXG5cdFx0fSkgYXMgYW55O1xyXG5cclxuXHRcdGRvbS5jc3ModGhpc0VkaXRvci5kcm9wZG93biwgZHJvcERvd25Dc3MpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXNFZGl0b3IuZHJvcGRvd24sIGNvbnRlbnQpO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCB0aGlzRWRpdG9yLmRyb3Bkb3duKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLmRyb3Bkb3duLCAnY2xpY2sgZm9jdXNpbicsIG51bGwsIChlOiBhbnkpID0+IHtcclxuXHRcdFx0Ly8gc3RvcCBjbGlja3Mgd2l0aGluIHRoZSBkcm9wZG93biBmcm9tIGJlaW5nIGhhbmRsZWRcclxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLmRyb3Bkb3duKSB7XHJcblx0XHRcdGxldCBmaXJzdCA9IGRvbS5maW5kKHRoaXNFZGl0b3IuZHJvcGRvd24sICdpbnB1dCx0ZXh0YXJlYScpWzBdIGFzIEhUTUxFbGVtZW50O1xyXG5cdFx0XHRpZiAoZmlyc3QpIHtcclxuXHRcdFx0XHRmaXJzdC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBpZiB0aGUgZWRpdG9yIGlzIG1heGltaXNlZCBvciBub3RcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gbWF4aW1pemUgSWYgdG8gbWF4aW1pc2UgdGhlIGVkaXRvclxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQG5hbWUgbWF4aW1pemVeMlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0cHVibGljIG1heGltaXplKG1heGltaXplPzogYm9vbGVhbik6IGFueSB7XHJcblx0XHRsZXQgbWF4aW1pemVTaXplID0gJ2VtbGVkaXRvci1tYXhpbWl6ZSc7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzVW5kZWZpbmVkKG1heGltaXplKSkge1xyXG5cdFx0XHRyZXR1cm4gZG9tLmhhc0NsYXNzKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBtYXhpbWl6ZVNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1heGltaXplID0gISFtYXhpbWl6ZTtcclxuXHJcblx0XHRpZiAobWF4aW1pemUpIHtcclxuXHRcdFx0dGhpcy5tYXhpbWl6ZVNjcm9sbFBvc2l0aW9uID0gZ2xvYmFsV2luLnNjcm9sbFk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKGdsb2JhbERvYy5kb2N1bWVudEVsZW1lbnQsIG1heGltaXplU2l6ZSwgbWF4aW1pemUpO1xyXG5cdFx0ZG9tLnRvZ2dsZUNsYXNzKGdsb2JhbERvYy5ib2R5LCBtYXhpbWl6ZVNpemUsIG1heGltaXplKTtcclxuXHRcdGRvbS50b2dnbGVDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgbWF4aW1pemVTaXplLCBtYXhpbWl6ZSk7XHJcblx0XHR0aGlzLndpZHRoKG1heGltaXplID8gJzEwMCUnIDogdGhpcy5vcHRpb25zLndpZHRoLCBmYWxzZSk7XHJcblx0XHR0aGlzLmhlaWdodChtYXhpbWl6ZSA/ICcxMDAlJyA6IHRoaXMub3B0aW9ucy5oZWlnaHQsIGZhbHNlKTtcclxuXHJcblx0XHRpZiAoIW1heGltaXplKSB7XHJcblx0XHRcdGdsb2JhbFdpbi5zY3JvbGxUbygwLCB0aGlzLm1heGltaXplU2Nyb2xsUG9zaXRpb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYXV0b0V4cGFuZCgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoZSBlZGl0b3IsIHJlbW92aW5nIGFsbCBlbGVtZW50cyBhbmRcclxuXHQgKiBldmVudCBoYW5kbGVycy5cclxuXHQgKlxyXG5cdCAqIExlYXZlcyBvbmx5IHRoZSBvcmlnaW5hbCB0ZXh0YXJlYS5cclxuXHQgKlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGRlc3Ryb3lcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBkZXN0cm95KCkge1xyXG5cdFx0Ly8gRG9uJ3QgZGVzdHJveSBpZiB0aGUgZWRpdG9yIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkXHJcblx0XHRpZiAoIXRoaXMucGx1Z2luTWFuYWdlcikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmRlc3Ryb3koKTtcclxuXHJcblx0XHR0aGlzLnJhbmdlSGVscGVyID0gbnVsbDtcclxuXHRcdHRoaXMucGx1Z2luTWFuYWdlciA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHRoaXMuZHJvcGRvd24pIHtcclxuXHRcdFx0ZG9tLnJlbW92ZSh0aGlzLmRyb3Bkb3duKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub2ZmKGdsb2JhbERvYywgJ2NsaWNrJywgbnVsbCwgdGhpcy5oYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHRsZXQgZm9ybSA9IHRoaXMudGV4dGFyZWEuZm9ybTtcclxuXHRcdGlmIChmb3JtKSB7XHJcblx0XHRcdGRvbS5vZmYoZm9ybSwgJ3Jlc2V0JywgbnVsbCwgdGhpcy5oYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0XHRkb20ub2ZmKGZvcm0sICdzdWJtaXQnLCBudWxsLCB0aGlzLnVwZGF0ZU9yaWdpbmFsLCBkb20uRVZFTlRfQ0FQVFVSRSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLm9mZih3aW5kb3csICdwYWdlaGlkZScsIG51bGwsIHRoaXMudXBkYXRlT3JpZ2luYWwpO1xyXG5cdFx0ZG9tLm9mZih3aW5kb3csICdwYWdlc2hvdycsIG51bGwsIHRoaXMuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5yZW1vdmUodGhpcy5zb3VyY2VFZGl0b3IpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLnRvb2xiYXIpO1xyXG5cdFx0ZG9tLnJlbW92ZSh0aGlzLmVkaXRvckNvbnRhaW5lcik7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMudGV4dGFyZWEuX2VtbGVkaXRvcjtcclxuXHRcdGRvbS5zaG93KHRoaXMudGV4dGFyZWEpO1xyXG5cclxuXHRcdHRoaXMudGV4dGFyZWEucmVxdWlyZWQgPSB0aGlzLmlzUmVxdWlyZWQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2xvc2VzIGFueSBjdXJyZW50bHkgb3BlbiBkcm9wIGRvd25cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZvY3VzPWZhbHNlXSBJZiB0byBmb2N1cyB0aGUgZWRpdG9yXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyIGNsb3NpbmcgdGhlIGRyb3AgZG93blxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNsb3NlRHJvcERvd25cclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBjbG9zZURyb3BEb3duKGZvY3VzPzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMuZHJvcGRvd24pIHtcclxuXHRcdFx0ZG9tLnJlbW92ZSh0aGlzLmRyb3Bkb3duKTtcclxuXHRcdFx0dGhpcy5kcm9wZG93biA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGZvY3VzID09PSB0cnVlKSB7XHJcblx0XHRcdHRoaXMuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwgaW50byBXWVNJV1lHIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIElmIGVuZEh0bWwgaXMgc3BlY2lmaWVkLCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZFxyXG5cdCAqIGJldHdlZW4gaHRtbCBhbmQgZW5kSHRtbC4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0ZWQgdGV4dCBodG1sXHJcblx0ICogYW5kIGVuZEh0bWwgd2lsbCBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEh0bWw9bnVsbF1cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvdmVycmlkZUNvZGVCbG9ja2luZz1mYWxzZV0gSWYgdG8gaW5zZXJ0IHRoZSBodG1sXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludG8gY29kZSB0YWdzLCBieVxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGNvZGUgdGFncyBvbmx5XHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgdGV4dC5cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKGh0bWw6IHN0cmluZywgZW5kSHRtbD86IHN0cmluZywgb3ZlcnJpZGVDb2RlQmxvY2tpbmc/OiBib29sZWFuKSB7XHJcblx0XHRsZXQgbWFya2VyOiBhbnksIHNjcm9sbFRvcCwgc2Nyb2xsVG8sIGVkaXRvckhlaWdodCA9IGRvbS5oZWlnaHQodGhpcy53eXNpd3lnRWRpdG9yKTtcclxuXHJcblx0XHR0aGlzLmZvY3VzKCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogVGhpcyBjb2RlIHRhZyBzaG91bGQgYmUgY29uZmlndXJhYmxlIGFuZFxyXG5cdFx0Ly8gc2hvdWxkIG1heWJlIGNvbnZlcnQgdGhlIEhUTUwgaW50byB0ZXh0IGluc3RlYWRcclxuXHRcdC8vIERvbid0IGFwcGx5IHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmICghb3ZlcnJpZGVDb2RlQmxvY2tpbmcgJiYgZG9tLmNsb3Nlc3QodGhpcy5jdXJyZW50QmxvY2tOb2RlLCAnY29kZScpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJbnNlcnQgdGhlIEhUTUwgYW5kIHNhdmUgdGhlIHJhbmdlIHNvIHRoZSBlZGl0b3IgY2FuIGJlIHNjcm9sbGVkXHJcblx0XHQvLyB0byB0aGUgZW5kIG9mIHRoZSBzZWxlY3Rpb24uIEFsc28gYWxsb3dzIGVtb3RpY29ucyB0byBiZSByZXBsYWNlZFxyXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgdGhlIGN1cnNvciBwb3NpdGlvblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5pbnNlcnRIVE1MKGh0bWwsIGVuZEh0bWwpO1xyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHRcdHRoaXMucmVwbGFjZUVtb3RpY29ucygpO1xyXG5cclxuXHRcdC8vIEZpeCBhbnkgaW52YWxpZCBuZXN0aW5nLCBlLmcuIGlmIGEgcXVvdGUgb3Igb3RoZXIgYmxvY2sgaXMgaW5zZXJ0ZWRcclxuXHRcdC8vIGludG8gYSBwYXJhZ3JhcGhcclxuXHRcdGRvbS5maXhOZXN0aW5nKHRoaXMud3lzaXd5Z0JvZHkpO1xyXG5cclxuXHRcdHRoaXMud3JhcElubGluZXModGhpcy53eXNpd3lnQm9keSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cclxuXHRcdC8vIFNjcm9sbCB0aGUgZWRpdG9yIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHNlbGVjdGlvblxyXG5cdFx0bWFya2VyID0gZG9tLmZpbmQodGhpcy53eXNpd3lnQm9keSwgJyNlbWxlZGl0b3ItZW5kLW1hcmtlcicpWzBdO1xyXG5cdFx0ZG9tLnNob3cobWFya2VyKTtcclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMud3lzaXd5Z0JvZHkuc2Nyb2xsVG9wO1xyXG5cdFx0c2Nyb2xsVG8gPSAoKGRvbS5nZXRPZmZzZXQobWFya2VyKSBhcyBhbnkpLnRvcCArXHJcblx0XHRcdChtYXJrZXIub2Zmc2V0SGVpZ2h0ICogMS41KSkgLSBlZGl0b3JIZWlnaHQ7XHJcblx0XHRkb20uaGlkZShtYXJrZXIpO1xyXG5cclxuXHRcdC8vIE9ubHkgc2Nyb2xsIGlmIG1hcmtlciBpc24ndCBhbHJlYWR5IHZpc2libGVcclxuXHRcdGlmIChzY3JvbGxUbyA+IHNjcm9sbFRvcCB8fCBzY3JvbGxUbyArIGVkaXRvckhlaWdodCA8IHNjcm9sbFRvcCkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHNjcm9sbFRvO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZChmYWxzZSk7XHJcblx0XHR0aGlzLnJhbmdlSGVscGVyLnJlc3RvcmVSYW5nZSgpO1xyXG5cclxuXHRcdC8vIEFkZCBhIG5ldyBsaW5lIGFmdGVyIHRoZSBsYXN0IGJsb2NrIGVsZW1lbnRcclxuXHRcdC8vIHNvIGNhbiBhbHdheXMgYWRkIHRleHQgYWZ0ZXIgaXRcclxuXHRcdHRoaXMuYXBwZW5kTmV3TGluZSgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExpa2Ugd3lzaXd5Z0VkaXRvckluc2VydEh0bWwgZXhjZXB0IGl0IHdpbGwgY29udmVydCBhbnkgSFRNTFxyXG5cdCAqIGludG8gdGV4dCBiZWZvcmUgaW5zZXJ0aW5nIGl0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZFRleHQ9bnVsbF1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB3eXNpd3lnRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHd5c2l3eWdFZGl0b3JJbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogdm9pZCB7XHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxyXG5cdFx0XHRlc2NhcGUuZW50aXRpZXModGV4dCksIGVzY2FwZS5lbnRpdGllcyhlbmRUZXh0KVxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIHRleHQgaW50byB0aGUgV1lTSVdZRyBvciBzb3VyY2UgZWRpdG9yIGRlcGVuZGluZyBvbiB3aGljaFxyXG5cdCAqIG1vZGUgdGhlIGVkaXRvciBpcyBpbi5cclxuXHQgKlxyXG5cdCAqIElmIGVuZFRleHQgaXMgc3BlY2lmaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiB0ZXh0IGFuZCBlbmRUZXh0LiBJZiBubyB0ZXh0IGlzIHNlbGVjdGVkIHRleHQgYW5kIGVuZFRleHQgd2lsbFxyXG5cdCAqIGp1c3QgYmUgY29uY2F0ZW5hdGUgdG9nZXRoZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBbZW5kVGV4dD1udWxsXVxyXG5cdCAqIEBzaW5jZSAxLjMuNVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGluc2VydFRleHRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBpbnNlcnRUZXh0KHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICh0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dCh0ZXh0LCBlbmRUZXh0KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydFRleHQodGV4dCwgZW5kVGV4dCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTGlrZSB3eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbCBidXQgaW5zZXJ0cyB0ZXh0IGludG8gdGhlXHJcblx0ICogc291cmNlIG1vZGUgZWRpdG9yIGluc3RlYWQuXHJcblx0ICpcclxuXHQgKiBJZiBlbmRUZXh0IGlzIHNwZWNpZmllZCBhbnkgc2VsZWN0ZWQgdGV4dCB3aWxsIGJlIHBsYWNlZCBiZXR3ZWVuXHJcblx0ICogdGV4dCBhbmQgZW5kVGV4dC4gSWYgbm8gdGV4dCBpcyBzZWxlY3RlZCB0ZXh0IGFuZCBlbmRUZXh0IHdpbGxcclxuXHQgKiBqdXN0IGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogVGhlIGN1cnNvciB3aWxsIGJlIHBsYWNlZCBhZnRlciB0aGUgdGV4dCBwYXJhbS4gSWYgZW5kVGV4dCBpc1xyXG5cdCAqIHNwZWNpZmllZCB0aGUgY3Vyc29yIHdpbGwgYmUgcGxhY2VkIGJlZm9yZSBlbmRUZXh0LCBzbyBwYXNzaW5nOjxiciAvPlxyXG5cdCAqXHJcblx0ICogJ1tiXScsICdbL2JdJ1xyXG5cdCAqXHJcblx0ICogV291bGQgY2F1c2UgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQ6PGJyIC8+XHJcblx0ICpcclxuXHQgKiBbYl1TZWxlY3RlZCB0ZXh0fFsvYl1cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IFtlbmRUZXh0PW51bGxdXHJcblx0ICogQHNpbmNlIDEuNC4wXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc291cmNlRWRpdG9ySW5zZXJ0VGV4dFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckluc2VydFRleHQodGV4dDogc3RyaW5nLCBlbmRUZXh0OiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGxldCBzY3JvbGxUb3AsIGN1cnJlbnRWYWx1ZSwgc3RhcnRQb3MgPSB0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25TdGFydCwgZW5kUG9zID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kO1xyXG5cclxuXHRcdHNjcm9sbFRvcCA9IHRoaXMuc291cmNlRWRpdG9yLnNjcm9sbFRvcDtcclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLmZvY3VzKCk7XHJcblx0XHRjdXJyZW50VmFsdWUgPSB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZTtcclxuXHJcblx0XHRpZiAoZW5kVGV4dCkge1xyXG5cdFx0XHR0ZXh0ICs9IGN1cnJlbnRWYWx1ZS5zdWJzdHJpbmcoc3RhcnRQb3MsIGVuZFBvcykgKyBlbmRUZXh0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnZhbHVlID0gY3VycmVudFZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgK1xyXG5cdFx0XHR0ZXh0ICtcclxuXHRcdFx0Y3VycmVudFZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIGN1cnJlbnRWYWx1ZS5sZW5ndGgpO1xyXG5cclxuXHRcdHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0ID0gKHN0YXJ0UG9zICsgdGV4dC5sZW5ndGgpIC1cclxuXHRcdFx0KGVuZFRleHQgPyBlbmRUZXh0Lmxlbmd0aCA6IDApO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gdGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQ7XHJcblxyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHR0aGlzLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHR9O1xyXG5cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGUgcmFuZ2VIZWxwZXIgY2xhc3NcclxuXHQgKiBmb3IgdGhlIGVkaXRvci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge1JhbmdlSGVscGVyfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGdldFJhbmdlSGVscGVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0UmFuZ2VIZWxwZXIoKTogUmFuZ2VIZWxwZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMucmFuZ2VIZWxwZXI7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgb3Igc2V0cyB0aGUgc291cmNlIGVkaXRvciBjYXJldCBwb3NpdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbcG9zaXRpb25dXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAc2luY2UgMS40LjVcclxuXHQgKiBAbmFtZSBzb3VyY2VFZGl0b3JDYXJldFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHNvdXJjZUVkaXRvckNhcmV0KHBvc2l0aW9uOiBhbnkpOiBhbnkge1xyXG5cdFx0dGhpcy5zb3VyY2VFZGl0b3IuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uU3RhcnQgPSBwb3NpdGlvbi5zdGFydDtcclxuXHRcdFx0dGhpcy5zb3VyY2VFZGl0b3Iuc2VsZWN0aW9uRW5kID0gcG9zaXRpb24uZW5kO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHRlbmQ6IHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvbkVuZFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnNlcnRzIEhUTUwvQkJDb2RlIGludG8gdGhlIGVkaXRvclxyXG5cdCAqXHJcblx0ICogSWYgZW5kIGlzIHN1cHBsaWVkIGFueSBzZWxlY3RlZCB0ZXh0IHdpbGwgYmUgcGxhY2VkIGJldHdlZW5cclxuXHQgKiBzdGFydCBhbmQgZW5kLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RlZCB0ZXh0IHN0YXJ0IGFuZCBlbmRcclxuXHQgKiB3aWxsIGJlIGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdCAqXHJcblx0ICogSWYgdGhlIGZpbHRlciBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgdGhlIEhUTUwvQkJDb2RlIHdpbGwgYmVcclxuXHQgKiBwYXNzZWQgdGhyb3VnaCBhbnkgcGx1Z2luIGZpbHRlcnMuIElmIHVzaW5nIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogdGhpcyB3aWxsIGNvbnZlcnQgYW55IEJCQ29kZSBpbnRvIEhUTUwuXHJcblx0ICpcclxuXHQgKiBJZiB0aGUgYWxsb3dNaXhlZCBwYXJhbSBpcyBzZXQgdG8gdHJ1ZSwgSFRNTCBhbnkgd2lsbCBub3QgYmVcclxuXHQgKiBlc2NhcGVkXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZD1udWxsXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbnZlcnRFbW90aWNvbnM9dHJ1ZV0gSWYgdG8gY29udmVydCBlbW90aWNvbnNcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxvd01peGVkPWZhbHNlXVxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgaW5zZXJ0XjJcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtcGFyYW1zXHJcblx0cHVibGljIGluc2VydChzdGFydDogc3RyaW5nLCBlbmQ6IHN0cmluZywgZmlsdGVyOiBib29sZWFuLCBjb252ZXJ0RW1vdGljb25zOiBib29sZWFuLCBhbGxvd01peGVkOiBib29sZWFuXHJcblx0KTogYW55IHtcclxuXHRcdGlmICh0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9ySW5zZXJ0VGV4dChzdGFydCwgZW5kKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWRkIHRoZSBzZWxlY3Rpb24gYmV0d2VlbiBzdGFydCBhbmQgZW5kXHJcblx0XHRpZiAoZW5kKSB7XHJcblx0XHRcdGxldCBodG1sID0gdGhpcy5yYW5nZUhlbHBlci5zZWxlY3RlZEh0bWwoKTtcclxuXHJcblx0XHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmICdmcmFnbWVudFRvU291cmNlJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRcdGh0bWwgPSB0aGlzLmZvcm1hdFxyXG5cdFx0XHRcdFx0LmZyYWdtZW50VG9Tb3VyY2UoaHRtbCwgdGhpcy53eXNpd3lnRG9jdW1lbnQsIHRoaXMuY3VycmVudE5vZGUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzdGFydCArPSBodG1sICsgZW5kO1xyXG5cdFx0fVxyXG5cdFx0Ly8gVE9ETzogVGhpcyBmaWx0ZXIgc2hvdWxkIGFsbG93IGVtcHR5IHRhZ3MgYXMgaXQncyBpbnNlcnRpbmcuXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiAnZnJhZ21lbnRUb0h0bWwnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdHN0YXJ0ID0gdGhpcy5mb3JtYXQuZnJhZ21lbnRUb0h0bWwoc3RhcnQsIHRoaXMuY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgYW55IGVzY2FwZWQgSFRNTCBiYWNrIGludG8gSFRNTCBpZiBtaXhlZCBpcyBhbGxvd2VkXHJcblx0XHRpZiAoZmlsdGVyICE9PSBmYWxzZSAmJiBhbGxvd01peGVkID09PSB0cnVlKSB7XHJcblx0XHRcdHN0YXJ0ID0gc3RhcnQucmVwbGFjZSgvJmx0Oy9nLCAnPCcpXHJcblx0XHRcdFx0LnJlcGxhY2UoLyZndDsvZywgJz4nKVxyXG5cdFx0XHRcdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoc3RhcnQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBIVE1MIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogSWYgdXNpbmcgYSBwbHVnaW4gdGhhdCBmaWx0ZXJzIHRoZSBIdCBNbCBsaWtlIHRoZSBCQkNvZGUgcGx1Z2luXHJcblx0ICogaXQgd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgZmlsdGVyaW5nIChCQkNvZGUpIHVubGVzcyB0aGVcclxuXHQgKiBmaWx0ZXIgcGFyYW0gaXMgc2V0IHRvIGZhbHNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHs/Ym9vbGVhbn0gW2ZpbHRlcj10cnVlXVxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBnZXRXeXNpd3lnRWRpdG9yVmFsdWVcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBnZXRXeXNpd3lnRWRpdG9yVmFsdWUoZmlsdGVyPzogYm9vbGVhbik6IHN0cmluZyB7XHJcblx0XHRsZXQgaHRtbDtcclxuXHRcdC8vIENyZWF0ZSBhIHRtcCBub2RlIHRvIHN0b3JlIGNvbnRlbnRzIHNvIGl0IGNhbiBiZSBtb2RpZmllZFxyXG5cdFx0Ly8gd2l0aG91dCBhZmZlY3RpbmcgYW55dGhpbmcgZWxzZS5cclxuXHRcdGxldCB0bXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge30sIHRoaXMud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdGxldCBjaGlsZE5vZGVzID0gdGhpcy53eXNpd3lnQm9keS5jaGlsZE5vZGVzO1xyXG5cclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQodG1wLCBjaGlsZE5vZGVzW2ldLmNsb25lTm9kZSh0cnVlKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0JvZHksIHRtcCk7XHJcblx0XHRkb20uZml4TmVzdGluZyh0bXApO1xyXG5cdFx0ZG9tLnJlbW92ZSh0bXApO1xyXG5cclxuXHRcdGh0bWwgPSB0bXAuaW5uZXJIVE1MO1xyXG5cclxuXHRcdC8vIGZpbHRlciB0aGUgSFRNTCBhbmQgRE9NIHRocm91Z2ggYW55IHBsdWdpbnNcclxuXHRcdGlmIChmaWx0ZXIgIT09IGZhbHNlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmZvcm1hdCwgJ3RvU291cmNlJykpIHtcclxuXHRcdFx0aHRtbCA9IHRoaXMuZm9ybWF0LnRvU291cmNlKGh0bWwsIHRoaXMud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaHRtbDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBHZXRzIHRoZSBXWVNJV1lHIGVkaXRvcidzIGlGcmFtZSBCb2R5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICogQG5hbWUgZ2V0Qm9keVxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGdldEJvZHkoKTogSFRNTEJvZHlFbGVtZW50IHtcclxuXHRcdHJldHVybiB0aGlzLnd5c2l3eWdCb2R5O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldHMgdGhlIFdZU0lXWUcgZWRpdG9ycyBjb250YWluZXIgYXJlYSAod2hvbGUgaUZyYW1lKS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBzaW5jZSAxLjQuM1xyXG5cdCAqIEBuYW1lIGdldENvbnRlbnRBcmVhQ29udGFpbmVyXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKi9cclxuXHRwdWJsaWMgZ2V0Q29udGVudEFyZWFDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0cmV0dXJuIHRoaXMud3lzaXd5Z0VkaXRvcjtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFeGVjdXRlcyBhIGNvbW1hbmQgb24gdGhlIFdZU0lXWUcgZWRpdG9yXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZFxyXG5cdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IFtwYXJhbV1cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBleGVjQ29tbWFuZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IGFueSk6IHZvaWQge1xyXG5cdFx0bGV0IGV4ZWN1dGVkID0gZmFsc2UsIGNvbW1hbmRPYmogPSB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdO1xyXG5cclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHJcblx0XHQvLyBUT0RPOiBtYWtlIGNvbmZpZ3VyYWJsZVxyXG5cdFx0Ly8gZG9uJ3QgYXBwbHkgYW55IGNvbW1hbmRzIHRvIGNvZGUgZWxlbWVudHNcclxuXHRcdGlmIChkb20uY2xvc2VzdCh0aGlzLnJhbmdlSGVscGVyLnBhcmVudE5vZGUoKSwgJ2NvZGUnKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZXhlY3V0ZWQgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgcGFyYW0pO1xyXG5cdFx0fSBjYXRjaCAoZXgpIHsgLyogZW1wdHkgKi8gfVxyXG5cclxuXHRcdC8vIHNob3cgZXJyb3IgaWYgZXhlY3V0aW9uIGZhaWxlZCBhbmQgYW4gZXJyb3IgbWVzc2FnZSBleGlzdHNcclxuXHRcdGlmICghZXhlY3V0ZWQgJiYgY29tbWFuZE9iaiAmJiBjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkge1xyXG5cdFx0XHRhbGVydCh0aGlzLnRyYW5zbGF0ZShjb21tYW5kT2JqLmVycm9yTWVzc2FnZSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudXBkYXRlQWN0aXZlQnV0dG9ucygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zbGF0ZXMgdGhlIHN0cmluZyBpbnRvIHRoZSBsb2NhbGUgbGFuZ3VhZ2UuXHJcblx0ICpcclxuXHQgKiBSZXBsYWNlcyBhbnkgezB9LCB7MX0sIHsyfSwgZWN0LiB3aXRoIHRoZSBwYXJhbXMgcHJvdmlkZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcblx0ICogQHBhcmFtIHsuLi5TdHJpbmd9IGFyZ3NcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgX1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICovXHJcblx0cHVibGljIHRyYW5zbGF0ZSguLi5hcmdzOiBhbnkpOiBzdHJpbmcge1xyXG5cdFx0bGV0IHVuZGVmOiBhbnk7XHJcblxyXG5cdFx0aWYgKHRoaXMubG9jYWxlICYmIHRoaXMubG9jYWxlW2FyZ3NbMF1dKSB7XHJcblx0XHRcdGFyZ3NbMF0gPSB0aGlzLmxvY2FsZVthcmdzWzBdXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYXJnc1swXS5yZXBsYWNlKC9cXHsoXFxkKylcXH0vZywgKHN0cj86IGFueSwgcDE/OiBhbnkpID0+IHtcclxuXHRcdFx0cmV0dXJuIGFyZ3NbcDEgLSAwICsgMV0gIT09IHVuZGVmID9cclxuXHRcdFx0XHRhcmdzW3AxIC0gMCArIDFdIDpcclxuXHRcdFx0XHQneycgKyBwMSArICd9JztcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJpbmRzIGEgaGFuZGxlciB0byB0aGUgc3BlY2lmaWVkIGV2ZW50c1xyXG5cdCAqXHJcblx0ICogVGhpcyBmdW5jdGlvbiBvbmx5IGJpbmRzIHRvIGEgbGltaXRlZCBsaXN0IG9mXHJcblx0ICogc3VwcG9ydGVkIGV2ZW50cy5cclxuXHQgKlxyXG5cdCAqIFRoZSBzdXBwb3J0ZWQgZXZlbnRzIGFyZTpcclxuXHQgKlxyXG5cdCAqICoga2V5dXBcclxuXHQgKiAqIGtleWRvd25cclxuXHQgKiAqIEtleXByZXNzXHJcblx0ICogKiBibHVyXHJcblx0ICogKiBmb2N1c1xyXG5cdCAqICogaW5wdXRcclxuXHQgKiAqIG5vZGVjaGFuZ2VkIC0gV2hlbiB0aGUgY3VycmVudCBub2RlIGNvbnRhaW5pbmdcclxuXHQgKiBcdFx0dGhlIHNlbGVjdGlvbiBjaGFuZ2VzIGluIFdZU0lXWUcgbW9kZVxyXG5cdCAqICogY29udGV4dG1lbnVcclxuXHQgKiAqIHNlbGVjdGlvbmNoYW5nZWRcclxuXHQgKiAqIHZhbHVlY2hhbmdlZFxyXG5cdCAqXHJcblx0ICpcclxuXHQgKiBUaGUgZXZlbnRzIHBhcmFtIHNob3VsZCBiZSBhIHN0cmluZyBjb250YWluaW5nIHRoZSBldmVudChzKVxyXG5cdCAqIHRvIGJpbmQgdGhpcyBoYW5kbGVyIHRvLiBJZiBtdWx0aXBsZSwgdGhleSBzaG91bGQgYmUgc2VwYXJhdGVkXHJcblx0ICogYnkgc3BhY2VzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSBldmVudHNcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7RW1sRWRpdG9yfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGJpbmRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBiaW5kKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0bGV0IGV2ZW50c0FyciA9IGV2ZW50cy5zcGxpdCgnICcpO1xyXG5cclxuXHRcdGxldCBpID0gZXZlbnRzQXJyLmxlbmd0aDtcclxuXHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0aWYgKHV0aWxzLmlzRnVuY3Rpb24oaGFuZGxlcikpIHtcclxuXHRcdFx0XHRsZXQgd3lzRXZlbnQgPSAnZW1sd3lzJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHRsZXQgc3JjRXZlbnQgPSAnZW1sc3JjJyArIGV2ZW50c0FycltpXTtcclxuXHRcdFx0XHQvLyBVc2UgY3VzdG9tIGV2ZW50cyB0byBhbGxvdyBwYXNzaW5nIHRoZSBpbnN0YW5jZSBhcyB0aGVcclxuXHRcdFx0XHQvLyAybmQgYXJndW1lbnQuXHJcblx0XHRcdFx0Ly8gQWxzbyBhbGxvd3MgdW5iaW5kaW5nIHdpdGhvdXQgdW5iaW5kaW5nIHRoZSBlZGl0b3JzIG93blxyXG5cdFx0XHRcdC8vIGV2ZW50IGhhbmRsZXJzLlxyXG5cdFx0XHRcdGlmICghZXhjbHVkZVd5c2l3eWcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1t3eXNFdmVudF0gPSB0aGlzLmV2ZW50SGFuZGxlcnNbd3lzRXZlbnRdIHx8IFtdO1xyXG5cdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzW3d5c0V2ZW50XS5wdXNoKGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmV2ZW50SGFuZGxlcnNbc3JjRXZlbnRdID0gdGhpcy5ldmVudEhhbmRsZXJzW3NyY0V2ZW50XSB8fCBbXTtcclxuXHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1tzcmNFdmVudF0ucHVzaChoYW5kbGVyKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFN0YXJ0IHNlbmRpbmcgdmFsdWUgY2hhbmdlZCBldmVudHNcclxuXHRcdFx0XHRpZiAoZXZlbnRzQXJyW2ldID09PSAndmFsdWVjaGFuZ2VkJykge1xyXG5cdFx0XHRcdFx0dGhpcy5oYXNIYW5kbGVyID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBVbmJpbmRzIGFuIGV2ZW50IHRoYXQgd2FzIGJvdW5kIHVzaW5nIGJpbmQoKS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gZXZlbnRzXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIHVuYmluZGluZyB0aGlzXHJcblx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlciBmcm9tIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIGlmIHRvIGV4Y2x1ZGUgdW5iaW5kaW5nIHRoaXNcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyIGZyb20gdGhlIHNvdXJjZSBlZGl0b3JcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIHVuYmluZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICogQHNlZSBiaW5kXHJcblx0ICovXHJcblx0cHVibGljIHVuYmluZChldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdGxldCBldmVudHNBcnIgPSBldmVudHMuc3BsaXQoJyAnKTtcclxuXHJcblx0XHRsZXQgaSA9IGV2ZW50c0Fyci5sZW5ndGg7XHJcblx0XHR3aGlsZSAoaS0tKSB7XHJcblx0XHRcdGlmICh1dGlscy5pc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XHJcblx0XHRcdFx0aWYgKCFleGNsdWRlV3lzaXd5Zykge1xyXG5cdFx0XHRcdFx0dXRpbHMuYXJyYXlSZW1vdmUoXHJcblx0XHRcdFx0XHRcdHRoaXMuZXZlbnRIYW5kbGVyc1snZW1sd3lzJyArIGV2ZW50c0FycltpXV0gfHwgW10sIGhhbmRsZXIpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCFleGNsdWRlU291cmNlKSB7XHJcblx0XHRcdFx0XHR1dGlscy5hcnJheVJlbW92ZShcclxuXHRcdFx0XHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzWydlbWxzcmMnICsgZXZlbnRzQXJyW2ldXSB8fCBbXSwgaGFuZGxlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSBkb3duIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlEb3duXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMga2V5RG93bihoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5ZG93bicsIGhhbmRsZXIsIGV4Y2x1ZGVXeXNpd3lnLCBleGNsdWRlU291cmNlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUga2V5IHByZXNzIGV2ZW50XHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSBrZXlQcmVzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIGtleVByZXNzKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbik6IGFueSB7XHJcblx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHQuYmluZCgna2V5cHJlc3MnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIGtleSB1cCBldmVudFxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlV3lzaXd5ZyBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSBleGNsdWRlU291cmNlICBJZiB0byBleGNsdWRlIGFkZGluZyB0aGlzIGhhbmRsZXJcclxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUga2V5VXBcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuMVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBrZXlVcChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgna2V5dXAnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBoYW5kbGVyIHRvIHRoZSBub2RlIGNoYW5nZWQgZXZlbnQuXHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHNlbGVjdGlvbi9jYXJldFxyXG5cdCAqIGNoYW5nZXMgaW4gV1lTSVdZRyBtb2RlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIG5vZGVDaGFuZ2VkXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjFcclxuXHQgKi9cclxuXHRwdWJsaWMgbm9kZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnbm9kZWNoYW5nZWQnLCBoYW5kbGVyLCBmYWxzZSwgdHJ1ZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGhhbmRsZXIgdG8gdGhlIHNlbGVjdGlvbiBjaGFuZ2VkIGV2ZW50XHJcblx0ICpcclxuXHQgKiBIYXBwZW5zIHdoZW5ldmVyIHRoZSBzZWxlY3Rpb24gY2hhbmdlcyBpbiBXWVNJV1lHIG1vZGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQG5hbWUgc2VsZWN0aW9uQ2hhbmdlZFxyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4xXHJcblx0ICovXHJcblx0cHVibGljIHNlbGVjdGlvbkNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24pOiBhbnkge1xyXG5cdFx0cmV0dXJuIHRoaXMuYmluZCgnc2VsZWN0aW9uY2hhbmdlZCcsIGhhbmRsZXIsIGZhbHNlLCB0cnVlKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgaGFuZGxlciB0byB0aGUgdmFsdWUgY2hhbmdlZCBldmVudFxyXG5cdCAqXHJcblx0ICogSGFwcGVucyB3aGVuZXZlciB0aGUgY3VycmVudCBlZGl0b3IgdmFsdWUgY2hhbmdlcy5cclxuXHQgKlxyXG5cdCAqIFdoZW5ldmVyIGFueXRoaW5nIGlzIGluc2VydGVkLCB0aGUgdmFsdWUgY2hhbmdlZCBvclxyXG5cdCAqIDEuNSBzZWNzIGFmdGVyIHRleHQgaXMgdHlwZWQuIElmIGEgc3BhY2UgaXMgdHlwZWQgaXQgd2lsbFxyXG5cdCAqIGNhdXNlIHRoZSBldmVudCB0byBiZSB0cmlnZ2VyZWQgaW1tZWRpYXRlbHkgaW5zdGVhZCBvZlxyXG5cdCAqIGFmdGVyIDEuNSBzZWNvbmRzXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVXeXNpd3lnIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59IGV4Y2x1ZGVTb3VyY2UgIElmIHRvIGV4Y2x1ZGUgYWRkaW5nIHRoaXMgaGFuZGxlclxyXG5cdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBzb3VyY2UgZWRpdG9yXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAbmFtZSB2YWx1ZUNoYW5nZWRcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqIEBzaW5jZSAxLjQuNVxyXG5cdCAqL1xyXG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQoaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKTogYW55IHtcclxuXHRcdHJldHVybiB0aGlzXHJcblx0XHRcdC5iaW5kKCd2YWx1ZWNoYW5nZWQnLCBoYW5kbGVyLCBleGNsdWRlV3lzaXd5ZywgZXhjbHVkZVNvdXJjZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgY3VycmVudCBXWVNJV1lHIGVkaXRvcnMgaW5saW5lIENTU1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc1xyXG5cdCAqIEBtZW1iZXJPZiBFbWxFZGl0b3IucHJvdG90eXBlXHJcblx0ICogQHNpbmNlIDEuNC4zXHJcblx0ICovXHJcblx0LyoqXHJcblx0ICogU2V0cyBpbmxpbmUgQ1NTIGZvciB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjc3NcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqIEBuYW1lIGNzc14yXHJcblx0ICogQG1lbWJlck9mIEVtbEVkaXRvci5wcm90b3R5cGVcclxuXHQgKiBAc2luY2UgMS40LjNcclxuXHQgKi9cclxuXHRwdWJsaWMgY3NzKGNzczogc3RyaW5nKTogYW55IHtcclxuXHRcdGlmICghdGhpcy5pbmxpbmVDc3MpIHtcclxuXHRcdFx0dGhpcy5pbmxpbmVDc3MgPSBkb20uY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7XHJcblx0XHRcdFx0aWQ6ICdpbmxpbmUnXHJcblx0XHRcdH0sIHRoaXMud3lzaXd5Z0RvY3VtZW50KSBhcyBIVE1MU3R5bGVFbGVtZW50O1xyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0RvY3VtZW50LmhlYWQsIHRoaXMuaW5saW5lQ3NzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXV0aWxzLmlzU3RyaW5nKGNzcykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuaW5saW5lQ3NzLnNoZWV0ID9cclxuXHRcdFx0XHR0aGlzLmlubGluZUNzcy5pbm5lclRleHQgOiB0aGlzLmlubGluZUNzcy5pbm5lckhUTUw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMuaW5saW5lQ3NzLnNoZWV0KSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVyVGV4dCA9IGNzcztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuaW5saW5lQ3NzLmlubmVySFRNTCA9IGNzcztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgc2hvcnRjdXQgaGFuZGxlclxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gc2hvcnRjdXRcclxuXHQgKiBAcmV0dXJuIHtFbWxFZGl0b3J9XHJcblx0ICovXHJcblx0cHVibGljIHJlbW92ZVNob3J0Y3V0KHNob3J0Y3V0OiBzdHJpbmcpOiBhbnkge1xyXG5cdFx0ZGVsZXRlIHRoaXMuc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dC50b0xvd2VyQ2FzZSgpXTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgc2hvcnRjdXQgaGFuZGxlciB0byB0aGUgZWRpdG9yXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICBzaG9ydGN1dFxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ3xGdW5jdGlvbn0gY21kXHJcblx0ICogQHJldHVybiB7ZW1sZWRpdG9yfVxyXG5cdCAqL1xyXG5cdHB1YmxpYyBhZGRTaG9ydGN1dChzaG9ydGN1dDogc3RyaW5nLCBjbWQ6IHN0cmluZyB8IEZ1bmN0aW9uKTogYW55IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQudG9Mb3dlckNhc2UoKVxyXG5cdFx0bGV0IHNob3J0Y3V0S2V5ID0gc2hvcnRjdXQgYXMga2V5b2YgdHlwZW9mIHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVycztcclxuXHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcoY21kKSkge1xyXG5cdFx0XHRsZXQgc3RyQ21kID0gY21kIGFzIHN0cmluZztcclxuXHRcdFx0dGhpc0VkaXRvci5zaG9ydGN1dEhhbmRsZXJzW3Nob3J0Y3V0S2V5XSA9ICgpID0+IHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUNvbW1hbmQodGhpc0VkaXRvci50b29sYmFyQnV0dG9uc1tzdHJDbWRdLCB0aGlzRWRpdG9yLmNvbW1hbmRzW3N0ckNtZF0pO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRLZXldID0gY21kO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzRWRpdG9yO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGUgZm9ybWF0dGluZyBvZiB0aGUgcGFzc2VkIGJsb2NrIGVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBJZiBibG9jayBpcyBmYWxzZSwgaWYgd2lsbCBjbGVhciB0aGUgc3R5bGluZyBvZiB0aGUgZmlyc3RcclxuXHQgKiBibG9jayBsZXZlbCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGN1cnNvci5cclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gYmxvY2tcclxuXHQgKiBAc2luY2UgMS40LjRcclxuXHQgKi9cclxuXHRwdWJsaWMgY2xlYXJCbG9ja0Zvcm1hdHRpbmcoYmxvY2s6IEhUTUxFbGVtZW50KTogYW55IHtcclxuXHRcdGJsb2NrID0gYmxvY2sgfHwgdGhpcy5jdXJyZW50U3R5bGVkQmxvY2tOb2RlKCk7XHJcblxyXG5cdFx0aWYgKCFibG9jayB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRibG9jay5jbGFzc05hbWUgPSAnJztcclxuXHJcblx0XHRkb20uYXR0cihibG9jaywgJ3N0eWxlJywgJycpO1xyXG5cclxuXHRcdGlmICghZG9tLmlzKGJsb2NrLCAncCxkaXYsdGQnKSkge1xyXG5cdFx0XHRkb20uY29udmVydEVsZW1lbnQoYmxvY2ssICdwJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH07XHJcblxyXG5cclxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblx0ICogUHJpdmF0ZSBtZW1iZXJzXHJcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcblx0LyoqXHJcblx0ICogRE9NUHVyaWZ5XHJcblx0ICovXHJcblx0cHJpdmF0ZSBkb21QdXJpZnk6IERPTVB1cmlmeS5ET01QdXJpZnlJXHJcblxyXG5cdC8qKlxyXG5cdCAqIEVkaXRvciBmb3JtYXQgbGlrZSBCQkNvZGUgb3IgSFRNTFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZm9ybWF0OiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1hcCBvZiBldmVudHMgaGFuZGxlcnMgYm91bmQgdG8gdGhpcyBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGV2ZW50SGFuZGxlcnM6IGFueSA9IHt9O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZWRpdG9ycyB3aW5kb3dcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtXaW5kb3d9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHd5c2l3eWdXaW5kb3c6IFdpbmRvdztcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFdZU0lXWUcgZWRpdG9ycyBib2R5IGVsZW1lbnRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MQm9keUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHd5c2l3eWdCb2R5OiBIVE1MQm9keUVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBjdXJyZW50IGRyb3Bkb3duXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGRyb3Bkb3duOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGNvbXBvc2luZyB0ZXh0IHZpYSBJTUVcclxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRwcml2YXRlIGlzQ29tcG9zaW5nOiBib29sZWFuO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaW1lciBmb3IgdmFsdWVDaGFuZ2VkIGtleSBoYW5kbGVyXHJcblx0ICogQHR5cGUge251bWJlcn1cclxuXHQgKi9cclxuXHRwcml2YXRlIHZhbHVlQ2hhbmdlZEtleVVwVGltZXI6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVkaXRvcnMgbG9jYWxlXHJcblx0ICpcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgbG9jYWxlOiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3JlcyBhIGNhY2hlIG9mIHByZWxvYWRlZCBpbWFnZXNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogQHR5cGUge0FycmF5LjxIVE1MSW1hZ2VFbGVtZW50Pn1cclxuXHQgKi9cclxuXHRwcml2YXRlIHByZUxvYWRDYWNoZTogYW55ID0gQXJyYXk8SFRNTEltYWdlRWxlbWVudD47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBsdWdpbiBtYW5hZ2VyIGluc3RhbmNlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7UGx1Z2luTWFuYWdlcn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcGx1Z2luTWFuYWdlcjogUGx1Z2luTWFuYWdlcjtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgbm9kZSBjb250YWluaW5nIHRoZSBzZWxlY3Rpb24vY2FyZXRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtOb2RlfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50Tm9kZTogTm9kZTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgY3VycmVudCBub2RlXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7bm9kZX1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgY3VycmVudEJsb2NrTm9kZTogSFRNTEVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFVzZWQgdG8gbWFrZSBzdXJlIG9ubHkgMSBzZWxlY3Rpb24gY2hhbmdlZFxyXG5cdCAqIGNoZWNrIGlzIGNhbGxlZCBldmVyeSAxMDBtcy5cclxuXHQgKlxyXG5cdCAqIEhlbHBzIGltcHJvdmUgcGVyZm9ybWFuY2UgYXMgaXQgaXMgY2hlY2tlZCBhIGxvdC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtib29sZWFufVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpc1NlbGVjdGlvbkNoZWNrUGVuZGluZzogYm9vbGVhbjtcclxuXHJcblx0LyoqXHJcblx0ICogSWYgY29udGVudCBpcyByZXF1aXJlZCAoZXF1aXZhbGVudCB0byB0aGUgSFRNTDUgcmVxdWlyZWQgYXR0cmlidXRlKVxyXG5cdCAqXHJcblx0ICogQHR5cGUge2Jvb2xlYW59XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGlzUmVxdWlyZWQ6IGJvb2xlYW47XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBpbmxpbmUgQ1NTIHN0eWxlIGVsZW1lbnQuIFdpbGwgYmUgdW5kZWZpbmVkXHJcblx0ICogdW50aWwgY3NzKCkgaXMgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZS5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MU3R5bGVFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbmxpbmVDc3M6IEhUTUxTdHlsZUVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIE9iamVjdCBjb250YWluaW5nIGEgbGlzdCBvZiBzaG9ydGN1dCBoYW5kbGVyc1xyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2hvcnRjdXRIYW5kbGVyczogYW55ID0ge307XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtaW4gYW5kIG1heCBoZWlnaHRzIHRoYXQgYXV0b0V4cGFuZCBzaG91bGQgc3RheSB3aXRoaW5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGF1dG9FeHBhbmRCb3VuZHM6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogVGltZW91dCBmb3IgdGhlIGF1dG9FeHBhbmQgZnVuY3Rpb24gdG8gdGhyb3R0bGUgY2FsbHNcclxuXHQgKlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhdXRvRXhwYW5kVGhyb3R0bGU6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogTGFzdCBzY3JvbGwgcG9zaXRpb24gYmVmb3JlIG1heGltaXppbmcgc29cclxuXHQgKiBpdCBjYW4gYmUgcmVzdG9yZWQgd2hlbiBmaW5pc2hlZC5cclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtudW1iZXJ9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIG1heGltaXplU2Nyb2xsUG9zaXRpb246IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogU3RvcmVzIHRoZSBjb250ZW50cyB3aGlsZSBhIHBhc3RlIGlzIHRha2luZyBwbGFjZS5cclxuXHQgKlxyXG5cdCAqIE5lZWRlZCB0byBzdXBwb3J0IGJyb3dzZXJzIHRoYXQgbGFjayBjbGlwYm9hcmQgQVBJIHN1cHBvcnQuXHJcblx0ICpcclxuXHQgKiBAdHlwZSB7P0RvY3VtZW50RnJhZ21lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHBhc3RlQ29udGVudEZyYWdtZW50OiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsbCB0aGUgZW1vdGljb25zIGZyb20gZHJvcGRvd24sIG1vcmUgYW5kIGhpZGRlbiBjb21iaW5lZFxyXG5cdCAqIGFuZCB3aXRoIHRoZSBlbW90aWNvbnMgcm9vdCBzZXRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHshT2JqZWN0PHN0cmluZywgc3RyaW5nPn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgYWxsRW1vdGljb25zOiBhbnkgPSB7fTtcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIEN1cnJlbnQgaWNvbiBzZXQgaWYgYW55XHJcblx0ICpcclxuXHQgKiBAdHlwZSB7P09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaWNvbnM6IGFueSB8IG51bGw7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFuIGFycmF5IG9mIGJ1dHRvbiBzdGF0ZSBoYW5kbGVyc1xyXG5cdCAqXHJcblx0ICogQHR5cGUge0FycmF5LjxPYmplY3Q+fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBidG5TdGF0ZUhhbmRsZXJzOiBhbnkgPSBbXTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVkaXRvcnMgdG9vbGJhclxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB0b29sYmFyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFdZU0lXWUcgZWRpdG9ycyBkb2N1bWVudFxyXG5cdCAqXHJcblx0ICogQHR5cGUge0RvY3VtZW50fVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB3eXNpd3lnRG9jdW1lbnQ6IERvY3VtZW50O1xyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIGlmIGJ1dHRvbnMgYXJlIGFjdGl2ZSBvciBub3RcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdXBkYXRlQWN0aXZlQnV0dG9ucyA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCBmaXJzdEJsb2NrLCBwYXJlbnQ7XHJcblx0XHRsZXQgYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcclxuXHRcdGxldCBkb2MgPSB0aGlzLnd5c2l3eWdEb2N1bWVudDtcclxuXHRcdGxldCBpc1NvdXJjZSA9IHRoaXMuc291cmNlTW9kZSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLnJlYWRPbmx5KCkpIHtcclxuXHRcdFx0dXRpbHMuZWFjaChkb20uZmluZCh0aGlzLnRvb2xiYXIsIGFjdGl2ZUNsYXNzKSwgKF8sIG1lbnVJdGVtKSA9PiB7XHJcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKG1lbnVJdGVtLCBhY3RpdmVDbGFzcyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFpc1NvdXJjZSkge1xyXG5cdFx0XHRwYXJlbnQgPSB0aGlzLnJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHRcdFx0Zmlyc3RCbG9jayA9IHRoaXMucmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudChwYXJlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5idG5TdGF0ZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdGxldCBzdGF0ZSA9IDA7XHJcblx0XHRcdGxldCBidG4gPSB0aGlzLnRvb2xiYXJCdXR0b25zW3RoaXMuYnRuU3RhdGVIYW5kbGVyc1tqXS5uYW1lXTtcclxuXHRcdFx0bGV0IHN0YXRlRm4gPSB0aGlzLmJ0blN0YXRlSGFuZGxlcnNbal0uc3RhdGU7XHJcblx0XHRcdGxldCBpc0Rpc2FibGVkID0gKGlzU291cmNlICYmICFidG4uX2VtbFR4dE1vZGUpIHx8XHJcblx0XHRcdFx0KCFpc1NvdXJjZSAmJiAhYnRuLl9lbWxXeXNpd3lnTW9kZSk7XHJcblxyXG5cdFx0XHRpZiAodXRpbHMuaXNTdHJpbmcoc3RhdGVGbikpIHtcclxuXHRcdFx0XHRpZiAoIWlzU291cmNlKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRzdGF0ZSA9IGRvYy5xdWVyeUNvbW1hbmRFbmFibGVkKHN0YXRlRm4pID8gMCA6IC0xO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1kZXB0aFxyXG5cdFx0XHRcdFx0XHRpZiAoc3RhdGUgPiAtMSkge1xyXG5cdFx0XHRcdFx0XHRcdHN0YXRlID0gZG9jLnF1ZXJ5Q29tbWFuZFN0YXRlKHN0YXRlRm4pID8gMSA6IDA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGV4KSB7IC8qIGVtcHR5ICovIH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoIWlzRGlzYWJsZWQpIHtcclxuXHRcdFx0XHRzdGF0ZSA9IHN0YXRlRm4uY2FsbCh0aGlzLCBwYXJlbnQsIGZpcnN0QmxvY2spO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRkb20udG9nZ2xlQ2xhc3MoYnRuLCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkIHx8IHN0YXRlIDwgMCk7XHJcblx0XHRcdGRvbS50b2dnbGVDbGFzcyhidG4sIGFjdGl2ZUNsYXNzLCBzdGF0ZSA+IDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLmljb25zICYmIHRoaXMuaWNvbnMudXBkYXRlKSB7XHJcblx0XHRcdHRoaXMuaWNvbnMudXBkYXRlKGlzU291cmNlLCBwYXJlbnQsIGZpcnN0QmxvY2spO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhY2hlIG9mIHRoZSBjdXJyZW50IHRvb2xiYXIgYnV0dG9uc1xyXG5cdCAqXHJcblx0ICogQHR5cGUge09iamVjdH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgdG9vbGJhckJ1dHRvbnM6IGFueSA9IFtdO1xyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGVzIHRoZSB0b29sYmFyIHRvIGRpc2FibGUvZW5hYmxlIHRoZSBhcHByb3ByaWF0ZSBidXR0b25zXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHVwZGF0ZVRvb2xCYXIgPSAoZGlzYWJsZT86IGJvb2xlYW4pOiB2b2lkID0+IHtcclxuXHRcdGxldCBtb2RlID0gdGhpcy5pblNvdXJjZU1vZGUoKSA/ICdfZW1sVHh0TW9kZScgOiAnX2VtbFd5c2l3eWdNb2RlJztcclxuXHJcblx0XHR1dGlscy5lYWNoKHRoaXMudG9vbGJhckJ1dHRvbnMsIChfLCBidXR0b24pID0+IHtcclxuXHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJywgZGlzYWJsZSB8fCAhYnV0dG9uW21vZGVdKTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIGlmcmFtZSB3aGljaCBzaG91bGQgYmUgaW4gZGVzaWduIG1vZGVcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MSUZyYW1lRWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3lzaXd5Z0VkaXRvcjogSFRNTElGcmFtZUVsZW1lbnQ7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBlZGl0b3JzIHRleHRhcmVhIGZvciB2aWV3aW5nIHNvdXJjZVxyXG5cdCAqXHJcblx0ICogQHR5cGUge0hUTUxUZXh0QXJlYUVsZW1lbnR9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHNvdXJjZUVkaXRvcjogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGN1cnJlbnQgbm9kZSBzZWxlY3Rpb24vY2FyZXRcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtPYmplY3R9XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGN1cnJlbnRTZWxlY3Rpb246IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIGVkaXRvcnMgcmFuZ2VIZWxwZXIgaW5zdGFuY2VcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtSYW5nZUhlbHBlcn1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmFuZ2VIZWxwZXI6IFJhbmdlSGVscGVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZGl2IHdoaWNoIGNvbnRhaW5zIHRoZSBlZGl0b3IgYW5kIHRvb2xiYXJcclxuXHQgKlxyXG5cdCAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgZWRpdG9yQ29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IG5vZGUgaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXHJcblx0ICogdGhlIG5vZGVjaGFuZ2VkIGV2ZW50IGlmIGl0IGhhc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjaGVja05vZGVDaGFuZ2VkID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0Ly8gY2hlY2sgaWYgbm9kZSBoYXMgY2hhbmdlZFxyXG5cdFx0bGV0IG9sZE5vZGUsIG5vZGUgPSB0aGlzLnJhbmdlSGVscGVyLnBhcmVudE5vZGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5jdXJyZW50Tm9kZSAhPT0gbm9kZSkge1xyXG5cdFx0XHRvbGROb2RlID0gdGhpcy5jdXJyZW50Tm9kZTtcclxuXHRcdFx0dGhpcy5jdXJyZW50Tm9kZSA9IG5vZGU7XHJcblx0XHRcdHRoaXMuY3VycmVudEJsb2NrTm9kZSA9IHRoaXMucmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudChub2RlKTtcclxuXHJcblx0XHRcdGRvbS50cmlnZ2VyKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAnbm9kZWNoYW5nZWQnLCB7XHJcblx0XHRcdFx0b2xkTm9kZTogb2xkTm9kZSxcclxuXHRcdFx0XHRuZXdOb2RlOiB0aGlzLmN1cnJlbnROb2RlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHQgKiBDcmVhdGVzIHRoZSBlZGl0b3IgaWZyYW1lIGFuZCB0ZXh0YXJlYVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0ID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0dGhpcy50ZXh0YXJlYS5fZW1sZWRpdG9yID0gdGhpcztcclxuXHJcblxyXG5cdFx0Ly8gTG9hZCBsb2NhbGVcclxuXHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMubG9jYWxlICYmIHRoaXNFZGl0b3Iub3B0aW9ucy5sb2NhbGUgIT09ICdlbicpIHtcclxuXHRcdFx0dGhpc0VkaXRvci5pbml0TG9jYWxlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItY29udGFpbmVyJyxcclxuXHRcdH0pIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuXHRcdGRvbS5pbnNlcnRCZWZvcmUodGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsIHRoaXNFZGl0b3IudGV4dGFyZWEpO1xyXG5cdFx0ZG9tLmNzcyh0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgJ3otaW5kZXgnLCB0aGlzRWRpdG9yLm9wdGlvbnMuekluZGV4KTtcclxuXHJcblx0XHR0aGlzRWRpdG9yLmlzUmVxdWlyZWQgPSB0aGlzRWRpdG9yLnRleHRhcmVhLnJlcXVpcmVkO1xyXG5cdFx0dGhpc0VkaXRvci50ZXh0YXJlYS5yZXF1aXJlZCA9IGZhbHNlO1xyXG5cclxuXHRcdGxldCBGb3JtYXRDdG9yID0gRW1sRWRpdG9yLmZvcm1hdHNbdGhpc0VkaXRvci5vcHRpb25zLmZvcm1hdF07XHJcblx0XHR0aGlzRWRpdG9yLmZvcm1hdCA9IEZvcm1hdEN0b3IgPyBuZXcgRm9ybWF0Q3RvcigpIDoge307XHJcblx0XHQvKlxyXG5cdFx0XHQqIFBsdWdpbnMgc2hvdWxkIGJlIGluaXRpYWxpemVkIGJlZm9yZSB0aGUgZm9ybWF0dGVycyBzaW5jZVxyXG5cdFx0XHQqIHRoZXkgbWF5IHdpc2ggdG8gYWRkIG9yIGNoYW5nZSBmb3JtYXR0aW5nIGhhbmRsZXJzIGFuZFxyXG5cdFx0XHQqIHNpbmNlIHRoZSBiYmNvZGUgZm9ybWF0IGNhY2hlcyBpdHMgaGFuZGxlcnMsXHJcblx0XHRcdCogc3VjaCBjaGFuZ2VzIG11c3QgYmUgZG9uZSBmaXJzdC5cclxuXHRcdFx0Ki9cclxuXHRcdHRoaXNFZGl0b3IucGx1Z2luTWFuYWdlciA9IG5ldyBQbHVnaW5NYW5hZ2VyKHRoaXNFZGl0b3IpO1xyXG5cdFx0KHRoaXNFZGl0b3Iub3B0aW9ucy5wbHVnaW5zIHx8ICcnKS5zcGxpdCgnLCcpLmZvckVhY2goKHBsdWdpbjogYW55KSA9PiB7XHJcblx0XHRcdHRoaXNFZGl0b3IucGx1Z2luTWFuYWdlci5yZWdpc3RlcihwbHVnaW4udHJpbSgpKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKCdpbml0JyBpbiB0aGlzRWRpdG9yLmZvcm1hdCkge1xyXG5cdFx0XHQodGhpc0VkaXRvci5mb3JtYXQgYXMgYW55KS5pbml0LmNhbGwodGhpc0VkaXRvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBZQUUhXHJcblx0XHR0aGlzRWRpdG9yLmluaXRFbW90aWNvbnMoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdFRvb2xCYXIoKTtcclxuXHRcdHRoaXNFZGl0b3IuaW5pdEVkaXRvcigpO1xyXG5cdFx0dGhpc0VkaXRvci5pbml0T3B0aW9ucygpO1xyXG5cdFx0dGhpc0VkaXRvci5pbml0RXZlbnRzKCk7XHJcblxyXG5cdFx0Ly8gZm9yY2UgaW50byBzb3VyY2UgbW9kZSBpZiBpcyBhIGJyb3dzZXIgdGhhdCBjYW4ndCBoYW5kbGVcclxuXHRcdC8vIGZ1bGwgZWRpdGluZ1xyXG5cdFx0aWYgKCFicm93c2VyLmlzV3lzaXd5Z1N1cHBvcnRlZCkge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnRvZ2dsZVNvdXJjZU1vZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzRWRpdG9yLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHJcblx0XHRsZXQgbG9hZGVkID0gKCkgPT4ge1xyXG5cdFx0XHRkb20ub2ZmKGdsb2JhbFdpbiwgJ2xvYWQnLCBudWxsLCBsb2FkZWQpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXNFZGl0b3Iub3B0aW9ucy5hdXRvZm9jdXMpIHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLmF1dG9mb2N1cyghIXRoaXNFZGl0b3Iub3B0aW9ucy5hdXRvZm9jdXNFbmQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzRWRpdG9yLmF1dG9FeHBhbmQoKTtcclxuXHRcdFx0dGhpc0VkaXRvci5hcHBlbmROZXdMaW5lKCk7XHJcblx0XHRcdC8vIFRPRE86IHVzZSBlZGl0b3IgZG9jIGFuZCB3aW5kb3c/XHJcblx0XHRcdHRoaXNFZGl0b3IucGx1Z2luTWFuYWdlci5jYWxsKCdyZWFkeScpO1xyXG5cdFx0XHRpZiAoJ29uUmVhZHknIGluIHRoaXNFZGl0b3IuZm9ybWF0KSB7XHJcblx0XHRcdFx0dGhpc0VkaXRvci5mb3JtYXQub25SZWFkeS5jYWxsKHRoaXNFZGl0b3IpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0ZG9tLm9uKGdsb2JhbFdpbiwgJ2xvYWQnLCBudWxsLCBsb2FkZWQpO1xyXG5cdFx0aWYgKGdsb2JhbERvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XHJcblx0XHRcdGxvYWRlZCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXQgdGhlIGxvY2FsZSB2YXJpYWJsZSB3aXRoIHRoZSBzcGVjaWZpZWQgbG9jYWxlIGlmIHBvc3NpYmxlXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcmV0dXJuIHZvaWRcclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRMb2NhbGUgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgbGFuZyA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHR0aGlzLmxvY2FsZSA9IEVtbEVkaXRvci5sb2NhbGVbdGhpcy5vcHRpb25zLmxvY2FsZV07XHJcblxyXG5cdFx0aWYgKCF0aGlzLmxvY2FsZSkge1xyXG5cdFx0XHRsYW5nID0gdGhpcy5vcHRpb25zLmxvY2FsZS5zcGxpdCgnLScpO1xyXG5cdFx0XHR0aGlzLmxvY2FsZSA9IEVtbEVkaXRvci5sb2NhbGVbbGFuZ1swXV07XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTG9jYWxlIERhdGVUaW1lIGZvcm1hdCBvdmVycmlkZXMgYW55IHNwZWNpZmllZCBpbiB0aGUgb3B0aW9uc1xyXG5cdFx0aWYgKHRoaXMubG9jYWxlICYmIHRoaXMubG9jYWxlLmRhdGVGb3JtYXQpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLmRhdGVGb3JtYXQgPSB0aGlzLmxvY2FsZS5kYXRlRm9ybWF0O1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgdGhlIGVkaXRvciBpZnJhbWUgYW5kIHRleHRhcmVhXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGluaXRFZGl0b3IgPSAoKTogdm9pZCA9PiB7XHJcblx0XHR0aGlzLnNvdXJjZUVkaXRvciA9IGRvbS5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScsIG51bGwpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcblx0XHR0aGlzLnd5c2l3eWdFZGl0b3IgPSBkb20uY3JlYXRlRWxlbWVudCgnaWZyYW1lJywge1xyXG5cdFx0XHRmcmFtZWJvcmRlcjogXCIwXCIsXHJcblx0XHRcdGFsbG93ZnVsbHNjcmVlbjogXCJ0cnVlXCJcclxuXHRcdH0pIGFzIEhUTUxJRnJhbWVFbGVtZW50O1xyXG5cclxuXHRcdC8qXHJcblx0XHRcdCogVGhpcyBuZWVkcyB0byBiZSBkb25lIHJpZ2h0IGFmdGVyIHRoZXkgYXJlIGNyZWF0ZWQgYmVjYXVzZSxcclxuXHRcdFx0KiBmb3IgYW55IHJlYXNvbiwgdGhlIHVzZXIgbWF5IG5vdCB3YW50IHRoZSB2YWx1ZSB0byBiZSB0aW5rZXJlZFxyXG5cdFx0XHQqIGJ5IGFueSBmaWx0ZXJzLlxyXG5cdFx0XHQqL1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5zdGFydEluU291cmNlTW9kZSkge1xyXG5cdFx0XHRkb20uYWRkQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdzb3VyY2VNb2RlJyk7XHJcblx0XHRcdGRvbS5oaWRlKHRoaXMud3lzaXd5Z0VkaXRvcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb20uYWRkQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICd3eXNpd3lnTW9kZScpO1xyXG5cdFx0XHRkb20uaGlkZSh0aGlzLnNvdXJjZUVkaXRvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMuc3BlbGxjaGVjaykge1xyXG5cdFx0XHRkb20uYXR0cih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZ2xvYmFsV2luLmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6Jykge1xyXG5cdFx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdFZGl0b3IsICdzcmMnLCAnYWJvdXQ6YmxhbmsnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgdGhlIGVkaXRvciB0byB0aGUgY29udGFpbmVyXHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5lZGl0b3JDb250YWluZXIsIHRoaXMud3lzaXd5Z0VkaXRvcik7XHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5lZGl0b3JDb250YWluZXIsIHRoaXMuc291cmNlRWRpdG9yKTtcclxuXHJcblx0XHQvLyBUT0RPOiBtYWtlIHRoaXMgb3B0aW9uYWwgc29tZWhvd1xyXG5cdFx0dGhpcy5kaW1lbnNpb25zKFxyXG5cdFx0XHR0aGlzLm9wdGlvbnMud2lkdGggfHwgZG9tLndpZHRoKHRoaXMudGV4dGFyZWEpLFxyXG5cdFx0XHR0aGlzLm9wdGlvbnMuaGVpZ2h0IHx8IGRvbS5oZWlnaHQodGhpcy50ZXh0YXJlYSlcclxuXHRcdCk7XHJcblxyXG5cdFx0Ly8gQWRkIGlvcyB0byBIVE1MIHNvIGNhbiBhcHBseSBDU1MgZml4IHRvIG9ubHkgaXRcclxuXHRcdGxldCBjbGFzc05hbWUgPSBicm93c2VyLmlvcyA/ICcgaW9zJyA6ICcnO1xyXG5cclxuXHRcdHRoaXMud3lzaXd5Z0RvY3VtZW50ID0gdGhpcy53eXNpd3lnRWRpdG9yLmNvbnRlbnREb2N1bWVudDtcclxuXHRcdHRoaXMud3lzaXd5Z0RvY3VtZW50Lm9wZW4oKTtcclxuXHRcdHRoaXMud3lzaXd5Z0RvY3VtZW50LndyaXRlKHRlbXBsYXRlcygnaHRtbCcsIHtcclxuXHRcdFx0YXR0cnM6ICcgY2xhc3M9XCInICsgY2xhc3NOYW1lICsgJ1wiJyxcclxuXHRcdFx0c3BlbGxjaGVjazogdGhpcy5vcHRpb25zLnNwZWxsY2hlY2sgPyAnJyA6ICdzcGVsbGNoZWNrPVwiZmFsc2VcIicsXHJcblx0XHRcdGNoYXJzZXQ6IHRoaXMub3B0aW9ucy5jaGFyc2V0LFxyXG5cdFx0XHRzdHlsZTogdGhpcy5vcHRpb25zLnN0eWxlXHJcblx0XHR9KSk7XHJcblx0XHR0aGlzLnd5c2l3eWdEb2N1bWVudC5jbG9zZSgpO1xyXG5cclxuXHRcdHRoaXMud3lzaXd5Z0JvZHkgPSB0aGlzLnd5c2l3eWdEb2N1bWVudC5ib2R5IGFzIEhUTUxCb2R5RWxlbWVudDtcclxuXHRcdHRoaXMud3lzaXd5Z1dpbmRvdyA9IHRoaXMud3lzaXd5Z0VkaXRvci5jb250ZW50V2luZG93O1xyXG5cclxuXHRcdHRoaXMucmVhZE9ubHkoISF0aGlzLm9wdGlvbnMucmVhZE9ubHkpO1xyXG5cclxuXHRcdC8vIGlmcmFtZSBvdmVyZmxvdyBmaXggZm9yIGlPU1xyXG5cdFx0aWYgKGJyb3dzZXIuaW9zKSB7XHJcblx0XHRcdGRvbS5oZWlnaHQodGhpcy53eXNpd3lnQm9keSwgJzEwMCUnKTtcclxuXHRcdFx0ZG9tLm9uKHRoaXMud3lzaXd5Z0JvZHksICd0b3VjaGVuZCcsIG51bGwsIHRoaXMuZm9jdXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0YWJJbmRleCA9IGRvbS5hdHRyKHRoaXMudGV4dGFyZWEsICd0YWJpbmRleCcpO1xyXG5cdFx0ZG9tLmF0dHIodGhpcy5zb3VyY2VFZGl0b3IsICd0YWJpbmRleCcsIHRhYkluZGV4KTtcclxuXHRcdGRvbS5hdHRyKHRoaXMud3lzaXd5Z0VkaXRvciwgJ3RhYmluZGV4JywgdGFiSW5kZXgpO1xyXG5cclxuXHRcdHRoaXMucmFuZ2VIZWxwZXIgPSBuZXcgUmFuZ2VIZWxwZXIodGhpcy53eXNpd3lnV2luZG93LCBudWxsLCB0aGlzLnNhbml0aXplKTtcclxuXHJcblx0XHQvLyBsb2FkIGFueSB0ZXh0YXJlYSB2YWx1ZSBpbnRvIHRoZSBlZGl0b3JcclxuXHRcdGRvbS5oaWRlKHRoaXMudGV4dGFyZWEpO1xyXG5cdFx0dGhpcy52YWwodGhpcy50ZXh0YXJlYS52YWx1ZSk7XHJcblxyXG5cdFx0bGV0IHBsYWNlaG9sZGVyID0gdGhpcy5vcHRpb25zLnBsYWNlaG9sZGVyIHx8XHJcblx0XHRcdGRvbS5hdHRyKHRoaXMudGV4dGFyZWEsICdwbGFjZWhvbGRlcicpO1xyXG5cclxuXHRcdGlmIChwbGFjZWhvbGRlcikge1xyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xyXG5cdFx0XHRkb20uYXR0cih0aGlzLnd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSW5pdGlhbGlzZXMgb3B0aW9uc1xyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0T3B0aW9ucyA9ICgpOiB2b2lkID0+IHtcclxuXHRcdC8vIGF1dG8tdXBkYXRlIG9yaWdpbmFsIHRleHRib3ggb24gYmx1ciBpZiBvcHRpb24gc2V0IHRvIHRydWVcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b1VwZGF0ZSkge1xyXG5cdFx0XHRkb20ub24odGhpcy53eXNpd3lnQm9keSwgJ2JsdXInLCBudWxsLCB0aGlzLmF1dG9VcGRhdGUpO1xyXG5cdFx0XHRkb20ub24odGhpcy5zb3VyY2VFZGl0b3IsICdibHVyJywgbnVsbCwgdGhpcy5hdXRvVXBkYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnJ0bCA9PT0gbnVsbCkge1xyXG5cdFx0XHR0aGlzLm9wdGlvbnMucnRsID0gZG9tLmNzcyh0aGlzLnNvdXJjZUVkaXRvciwgJ2RpcmVjdGlvbicpID09PSAncnRsJztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJ0bCghIXRoaXMub3B0aW9ucy5ydGwpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYXV0b0V4cGFuZCkge1xyXG5cdFx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB3aGVuIGltYWdlcyAob3IgYW55dGhpbmcgZWxzZSkgbG9hZHNcclxuXHRcdFx0ZG9tLm9uKHRoaXMud3lzaXd5Z0JvZHksICdsb2FkJywgbnVsbCwgdGhpcy5hdXRvRXhwYW5kLCBkb20uRVZFTlRfQ0FQVFVSRSk7XHJcblx0XHRcdGRvbS5vbih0aGlzLnd5c2l3eWdCb2R5LCAnaW5wdXQga2V5dXAnLCBudWxsLCB0aGlzLmF1dG9FeHBhbmQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMucmVzaXplRW5hYmxlZCkge1xyXG5cdFx0XHR0aGlzLmluaXRSZXNpemUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXR0cih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ2lkJywgdGhpcy5vcHRpb25zLmlkKTtcclxuXHRcdHRoaXMuZW1vdGljb25zKHRoaXMub3B0aW9ucy5lbW90aWNvbnNFbmFibGVkKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXNlcyBldmVudHNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdEV2ZW50cyA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdGxldCBmb3JtID0gdGhpc0VkaXRvci50ZXh0YXJlYS5mb3JtO1xyXG5cdFx0bGV0IGNvbXBvc2l0aW9uRXZlbnRzID0gJ2NvbXBvc2l0aW9uc3RhcnQgY29tcG9zaXRpb25lbmQnO1xyXG5cdFx0bGV0IGV2ZW50c1RvRm9yd2FyZCA9ICdrZXlkb3duIGtleXVwIGtleXByZXNzIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgaW5wdXQnO1xyXG5cdFx0bGV0IGNoZWNrU2VsZWN0aW9uRXZlbnRzID0gJ29uc2VsZWN0aW9uY2hhbmdlJyBpbiB0aGlzRWRpdG9yLnd5c2l3eWdEb2N1bWVudCA/XHJcblx0XHRcdCdzZWxlY3Rpb25jaGFuZ2UnIDpcclxuXHRcdFx0J2tleXVwIGZvY3VzIGJsdXIgY29udGV4dG1lbnUgbW91c2V1cCB0b3VjaGVuZCBjbGljayc7XHJcblxyXG5cdFx0ZG9tLm9uKGdsb2JhbERvYywgJ2NsaWNrJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVEb2N1bWVudENsaWNrKTtcclxuXHJcblx0XHRpZiAoZm9ybSkge1xyXG5cdFx0XHRkb20ub24oZm9ybSwgJ3Jlc2V0JywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVGb3JtUmVzZXQpO1xyXG5cdFx0XHRkb20ub24oZm9ybSwgJ3N1Ym1pdCcsIG51bGwsIHRoaXNFZGl0b3IudXBkYXRlT3JpZ2luYWwsIGRvbS5FVkVOVF9DQVBUVVJFKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub24od2luZG93LCAncGFnZWhpZGUnLCBudWxsLCB0aGlzRWRpdG9yLnVwZGF0ZU9yaWdpbmFsKTtcclxuXHRcdGRvbS5vbih3aW5kb3csICdwYWdlc2hvdycsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRm9ybVJlc2V0KTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5cHJlc3MnLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUtleVByZXNzKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAna2V5ZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlS2V5RG93bik7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleWRvd24nLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUJhY2tTcGFjZSk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci5hcHBlbmROZXdMaW5lKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAnYmx1cicsIG51bGwsIHRoaXNFZGl0b3IudmFsdWVDaGFuZ2VkQmx1cik7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2tleXVwJywgbnVsbCwgdGhpc0VkaXRvci52YWx1ZUNoYW5nZWRLZXlVcCk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ3Bhc3RlJywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVQYXN0ZUV2dCk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2N1dCBjb3B5JywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVDdXRDb3B5RXZ0KTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCBjb21wb3NpdGlvbkV2ZW50cywgbnVsbCwgdGhpc0VkaXRvci5oYW5kbGVDb21wb3NpdGlvbik7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgY2hlY2tTZWxlY3Rpb25FdmVudHMsIG51bGwsIHRoaXNFZGl0b3IuY2hlY2tTZWxlY3Rpb25DaGFuZ2VkKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCBldmVudHNUb0ZvcndhcmQsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlRXZlbnQpO1xyXG5cclxuXHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuZW1vdGljb25zQ29tcGF0ICYmIGdsb2JhbFdpbi5nZXRTZWxlY3Rpb24pIHtcclxuXHRcdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdrZXl1cCcsIG51bGwsIHRoaXNFZGl0b3IuZW1vdGljb25zQ2hlY2tXaGl0ZXNwYWNlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnQm9keSwgJ2JsdXInLCBudWxsLCAoKSA9PiB7XHJcblx0XHRcdGlmICghdGhpc0VkaXRvci52YWwoKSkge1xyXG5cdFx0XHRcdGRvbS5hZGRDbGFzcyh0aGlzRWRpdG9yLnd5c2l3eWdCb2R5LCAncGxhY2Vob2xkZXInKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdmb2N1cycsIG51bGwsICgpID0+IHtcclxuXHRcdFx0ZG9tLnJlbW92ZUNsYXNzKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksICdwbGFjZWhvbGRlcicpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iuc291cmNlRWRpdG9yLCAnYmx1cicsIG51bGwsIHRoaXNFZGl0b3IudmFsdWVDaGFuZ2VkQmx1cik7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsICdrZXl1cCcsIG51bGwsIHRoaXNFZGl0b3IudmFsdWVDaGFuZ2VkS2V5VXApO1xyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3Iuc291cmNlRWRpdG9yLCAna2V5ZG93bicsIG51bGwsIHRoaXNFZGl0b3IuaGFuZGxlS2V5RG93bik7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci5zb3VyY2VFZGl0b3IsIGNvbXBvc2l0aW9uRXZlbnRzLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUNvbXBvc2l0aW9uKTtcclxuXHRcdGRvbS5vbih0aGlzRWRpdG9yLnNvdXJjZUVkaXRvciwgZXZlbnRzVG9Gb3J3YXJkLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZUV2ZW50KTtcclxuXHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnRG9jdW1lbnQsICdtb3VzZWRvd24nLCBudWxsLCB0aGlzRWRpdG9yLmhhbmRsZU1vdXNlRG93bik7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnRG9jdW1lbnQsIGNoZWNrU2VsZWN0aW9uRXZlbnRzLCBudWxsLCB0aGlzRWRpdG9yLmNoZWNrU2VsZWN0aW9uQ2hhbmdlZCk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci53eXNpd3lnRG9jdW1lbnQsICdrZXl1cCcsIG51bGwsIHRoaXNFZGl0b3IuYXBwZW5kTmV3TGluZSk7XHJcblxyXG5cdFx0ZG9tLm9uKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCAnc2VsZWN0aW9uY2hhbmdlZCcsIG51bGwsIHRoaXNFZGl0b3IuY2hlY2tOb2RlQ2hhbmdlZCk7XHJcblx0XHRkb20ub24odGhpc0VkaXRvci5lZGl0b3JDb250YWluZXIsICdzZWxlY3Rpb25jaGFuZ2VkJywgbnVsbCwgdGhpc0VkaXRvci51cGRhdGVBY3RpdmVCdXR0b25zKTtcclxuXHRcdC8vIEN1c3RvbSBldmVudHMgdG8gZm9yd2FyZFxyXG5cdFx0ZG9tLm9uKFxyXG5cdFx0XHR0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lcixcclxuXHRcdFx0J3NlbGVjdGlvbmNoYW5nZWQgdmFsdWVjaGFuZ2VkIG5vZGVjaGFuZ2VkIHBhc3RlcmF3IHBhc3RlJyxcclxuXHRcdFx0bnVsbCxcclxuXHRcdFx0dGhpc0VkaXRvci5oYW5kbGVFdmVudFxyXG5cdFx0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSB0b29sYmFyIGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBjb250YWluZXJcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdFRvb2xCYXIgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvcjogYW55ID0gdGhpcztcclxuXHRcdGxldCBncm91cDogYW55O1xyXG5cdFx0bGV0IGNvbW1hbmRzID0gdGhpc0VkaXRvci5jb21tYW5kcztcclxuXHRcdGxldCBleGNsdWRlID0gKHRoaXNFZGl0b3Iub3B0aW9ucy50b29sYmFyRXhjbHVkZSB8fCAnJykuc3BsaXQoJywnKTtcclxuXHRcdGxldCBncm91cHMgPSB0aGlzRWRpdG9yLm9wdGlvbnMudG9vbGJhci5zcGxpdCgnfCcpO1xyXG5cclxuXHRcdHRoaXNFZGl0b3IudG9vbGJhciA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcblx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci10b29sYmFyJyxcclxuXHRcdFx0dW5zZWxlY3RhYmxlOiAnb24nXHJcblx0XHR9KSBhcyBIVE1MRGl2RWxlbWVudDtcclxuXHJcblx0XHRpZiAodGhpc0VkaXRvci5vcHRpb25zLmljb25zIGluIEVtbEVkaXRvci5pY29ucykge1xyXG5cdFx0XHR0aGlzRWRpdG9yLmljb25zID0gbmV3IEVtbEVkaXRvci5pY29uc1t0aGlzRWRpdG9yLm9wdGlvbnMuaWNvbnNdKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dXRpbHMuZWFjaChncm91cHMsIChfLCBtZW51SXRlbXMpID0+IHtcclxuXHRcdFx0Z3JvdXAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1ncm91cCdcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR1dGlscy5lYWNoKG1lbnVJdGVtcy5zcGxpdCgnLCcpLCAoXywgY29tbWFuZE5hbWUpID0+IHtcclxuXHRcdFx0XHRsZXQgYnV0dG9uOiBhbnksIHNob3J0Y3V0LCBjb21tYW5kID0gY29tbWFuZHNbY29tbWFuZE5hbWVdO1xyXG5cclxuXHRcdFx0XHQvLyBUaGUgY29tbWFuZE5hbWUgbXVzdCBiZSBhIHZhbGlkIGNvbW1hbmQgYW5kIG5vdCBleGNsdWRlZFxyXG5cdFx0XHRcdGlmICghY29tbWFuZCB8fCBleGNsdWRlLmluZGV4T2YoY29tbWFuZE5hbWUpID4gLTEpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHNob3J0Y3V0ID0gY29tbWFuZC5zaG9ydGN1dDtcclxuXHRcdFx0XHRidXR0b24gPSB0ZW1wbGF0ZXMoJ3Rvb2xiYXJCdXR0b24nLCB7XHJcblx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdGRpc3BOYW1lOiB0aGlzRWRpdG9yLnRyYW5zbGF0ZShjb21tYW5kLm5hbWUgfHxcclxuXHRcdFx0XHRcdFx0Y29tbWFuZC50b29sdGlwIHx8IGNvbW1hbmROYW1lKVxyXG5cdFx0XHRcdH0sIHRydWUpLmZpcnN0Q2hpbGQ7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzRWRpdG9yLmljb25zICYmIHRoaXNFZGl0b3IuaWNvbnMuY3JlYXRlKSB7XHJcblx0XHRcdFx0XHRsZXQgaWNvbiA9IHRoaXNFZGl0b3IuaWNvbnMuY3JlYXRlKGNvbW1hbmROYW1lKTtcclxuXHRcdFx0XHRcdGlmIChpY29uKSB7XHJcblx0XHRcdFx0XHRcdGRvbS5pbnNlcnRCZWZvcmUodGhpc0VkaXRvci5pY29ucy5jcmVhdGUoY29tbWFuZE5hbWUpLFxyXG5cdFx0XHRcdFx0XHRcdGJ1dHRvbi5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKGJ1dHRvbiwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRidXR0b24uX2VtbFR4dE1vZGUgPSAhIWNvbW1hbmQudHh0RXhlYztcclxuXHRcdFx0XHRidXR0b24uX2VtbFd5c2l3eWdNb2RlID0gISFjb21tYW5kLmV4ZWM7XHJcblx0XHRcdFx0ZG9tLnRvZ2dsZUNsYXNzKGJ1dHRvbiwgJ2Rpc2FibGVkJywgIWNvbW1hbmQuZXhlYyk7XHJcblx0XHRcdFx0ZG9tLm9uKGJ1dHRvbiwgJ2NsaWNrJywgbnVsbCwgKGU6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCFkb20uaGFzQ2xhc3MoYnV0dG9uLCAnZGlzYWJsZWQnKSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzRWRpdG9yLmhhbmRsZUNvbW1hbmQoYnV0dG9uLCBjb21tYW5kKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLnVwZGF0ZUFjdGl2ZUJ1dHRvbnMoKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHQvLyBQcmV2ZW50IGVkaXRvciBsb3NpbmcgZm9jdXMgd2hlbiBidXR0b24gY2xpY2tlZFxyXG5cdFx0XHRcdGRvbS5vbihidXR0b24sICdtb3VzZWRvd24nLCBudWxsLCAoZTogYW55KSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmNsb3NlRHJvcERvd24oKTtcclxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0aWYgKGNvbW1hbmQudG9vbHRpcCkge1xyXG5cdFx0XHRcdFx0ZG9tLmF0dHIoYnV0dG9uLCAndGl0bGUnLFxyXG5cdFx0XHRcdFx0XHR0aGlzRWRpdG9yLnRyYW5zbGF0ZShjb21tYW5kLnRvb2x0aXApICtcclxuXHRcdFx0XHRcdFx0KHNob3J0Y3V0ID8gJyAoJyArIHNob3J0Y3V0ICsgJyknIDogJycpXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNob3J0Y3V0KSB7XHJcblx0XHRcdFx0XHR0aGlzRWRpdG9yLmFkZFNob3J0Y3V0KHNob3J0Y3V0LCBjb21tYW5kTmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoY29tbWFuZC5zdGF0ZSkge1xyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci5idG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuc3RhdGVcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0Ly8gZXhlYyBzdHJpbmcgY29tbWFuZHMgY2FuIGJlIHBhc3NlZCB0byBxdWVyeUNvbW1hbmRTdGF0ZVxyXG5cdFx0XHRcdH0gZWxzZSBpZiAodXRpbHMuaXNTdHJpbmcoY29tbWFuZC5leGVjKSkge1xyXG5cdFx0XHRcdFx0dGhpc0VkaXRvci5idG5TdGF0ZUhhbmRsZXJzLnB1c2goe1xyXG5cdFx0XHRcdFx0XHRuYW1lOiBjb21tYW5kTmFtZSxcclxuXHRcdFx0XHRcdFx0c3RhdGU6IGNvbW1hbmQuZXhlY1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZ3JvdXAsIGJ1dHRvbik7XHJcblx0XHRcdFx0dGhpc0VkaXRvci50b29sYmFyQnV0dG9uc1tjb21tYW5kTmFtZV0gPSBidXR0b247XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gRXhjbHVkZSBlbXB0eSBncm91cHNcclxuXHRcdFx0aWYgKGdyb3VwLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQodGhpc0VkaXRvci50b29sYmFyLCBncm91cCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFwcGVuZCB0aGUgdG9vbGJhciB0byB0aGUgdG9vbGJhckNvbnRhaW5lciBvcHRpb24gaWYgZ2l2ZW5cclxuXHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzRWRpdG9yLm9wdGlvbnMudG9vbGJhckNvbnRhaW5lciB8fCB0aGlzRWRpdG9yLmVkaXRvckNvbnRhaW5lciwgdGhpc0VkaXRvci50b29sYmFyKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSByZXNpemVyLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBpbml0UmVzaXplID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IG1pbkhlaWdodDogYW55LCBtYXhIZWlnaHQ6IGFueSwgbWluV2lkdGg6IGFueSwgbWF4V2lkdGg6IGFueSwgbW91c2VNb3ZlRnVuYzogYW55LCBtb3VzZVVwRnVuYzogYW55LCBncmlwID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLWdyaXAnXHJcblx0XHR9KSxcclxuXHRcdFx0Ly8gQ292ZXIgaXMgdXNlZCB0byBjb3ZlciB0aGUgZWRpdG9yIGlmcmFtZSBzbyBkb2N1bWVudFxyXG5cdFx0XHQvLyBzdGlsbCBnZXRzIG1vdXNlIG1vdmUgZXZlbnRzXHJcblx0XHRcdGNvdmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuXHRcdFx0XHRjbGFzc05hbWU6ICdlbWxlZGl0b3ItcmVzaXplLWNvdmVyJ1xyXG5cdFx0XHR9KSwgbW92ZUV2ZW50cyA9ICd0b3VjaG1vdmUgbW91c2Vtb3ZlJywgZW5kRXZlbnRzID0gJ3RvdWNoY2FuY2VsIHRvdWNoZW5kIG1vdXNldXAnLCBzdGFydFggPSAwLCBzdGFydFkgPSAwLCBuZXdYID0gMCwgbmV3WSA9IDAsIHN0YXJ0V2lkdGggPSAwLCBzdGFydEhlaWdodCA9IDAsIG9yaWdXaWR0aCA9IGRvbS53aWR0aCh0aGlzLmVkaXRvckNvbnRhaW5lciksIG9yaWdIZWlnaHQgPSBkb20uaGVpZ2h0KHRoaXMuZWRpdG9yQ29udGFpbmVyKSwgaXNEcmFnZ2luZyA9IGZhbHNlLCBydGwgPSB0aGlzLnJ0bCgpO1xyXG5cclxuXHRcdG1pbkhlaWdodCA9IHRoaXMub3B0aW9ucy5yZXNpemVNaW5IZWlnaHQgfHwgb3JpZ0hlaWdodCAvIDEuNTtcclxuXHRcdG1heEhlaWdodCA9IHRoaXMub3B0aW9ucy5yZXNpemVNYXhIZWlnaHQgfHwgb3JpZ0hlaWdodCAqIDIuNTtcclxuXHRcdG1pbldpZHRoID0gdGhpcy5vcHRpb25zLnJlc2l6ZU1pbldpZHRoIHx8IG9yaWdXaWR0aCAvIDEuMjU7XHJcblx0XHRtYXhXaWR0aCA9IHRoaXMub3B0aW9ucy5yZXNpemVNYXhXaWR0aCB8fCBvcmlnV2lkdGggKiAxLjI1O1xyXG5cclxuXHRcdG1vdXNlTW92ZUZ1bmMgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdC8vIGlPUyB1c2VzIHdpbmRvdy5ldmVudFxyXG5cdFx0XHRpZiAoZS50eXBlID09PSAndG91Y2htb3ZlJykge1xyXG5cdFx0XHRcdGUgPSBnbG9iYWxXaW4uZXZlbnQ7XHJcblx0XHRcdFx0bmV3WCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XHJcblx0XHRcdFx0bmV3WSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0bmV3WCA9IGUucGFnZVg7XHJcblx0XHRcdFx0bmV3WSA9IGUucGFnZVk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBuZXdIZWlnaHQgPSBzdGFydEhlaWdodCArIChuZXdZIC0gc3RhcnRZKSwgbmV3V2lkdGggPSBydGwgP1xyXG5cdFx0XHRcdHN0YXJ0V2lkdGggLSAobmV3WCAtIHN0YXJ0WCkgOlxyXG5cdFx0XHRcdHN0YXJ0V2lkdGggKyAobmV3WCAtIHN0YXJ0WCk7XHJcblxyXG5cdFx0XHRpZiAobWF4V2lkdGggPiAwICYmIG5ld1dpZHRoID4gbWF4V2lkdGgpIHtcclxuXHRcdFx0XHRuZXdXaWR0aCA9IG1heFdpZHRoO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtaW5XaWR0aCA+IDAgJiYgbmV3V2lkdGggPCBtaW5XaWR0aCkge1xyXG5cdFx0XHRcdG5ld1dpZHRoID0gbWluV2lkdGg7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCF0aGlzLm9wdGlvbnMucmVzaXplV2lkdGgpIHtcclxuXHRcdFx0XHRuZXdXaWR0aCA9IHVuZGVmaW5lZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKG1heEhlaWdodCA+IDAgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcblx0XHRcdFx0bmV3SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChtaW5IZWlnaHQgPiAwICYmIG5ld0hlaWdodCA8IG1pbkhlaWdodCkge1xyXG5cdFx0XHRcdG5ld0hlaWdodCA9IG1pbkhlaWdodDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIXRoaXMub3B0aW9ucy5yZXNpemVIZWlnaHQpIHtcclxuXHRcdFx0XHRuZXdIZWlnaHQgPSB1bmRlZmluZWQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChuZXdXaWR0aCB8fCBuZXdIZWlnaHQpIHtcclxuXHRcdFx0XHR0aGlzLmRpbWVuc2lvbnMobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0bW91c2VVcEZ1bmMgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdGlmICghaXNEcmFnZ2luZykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aXNEcmFnZ2luZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0ZG9tLmhpZGUoY292ZXIpO1xyXG5cdFx0XHRkb20ucmVtb3ZlQ2xhc3ModGhpcy5lZGl0b3JDb250YWluZXIsICdyZXNpemluZycpO1xyXG5cdFx0XHRkb20ub2ZmKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbnVsbCwgbW91c2VNb3ZlRnVuYyk7XHJcblx0XHRcdGRvbS5vZmYoZ2xvYmFsRG9jLCBlbmRFdmVudHMsIG51bGwsIG1vdXNlVXBGdW5jKTtcclxuXHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMuaWNvbnMgJiYgdGhpcy5pY29ucy5jcmVhdGUpIHtcclxuXHRcdFx0bGV0IGljb24gPSB0aGlzLmljb25zLmNyZWF0ZSgnZ3JpcCcpO1xyXG5cdFx0XHRpZiAoaWNvbikge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChncmlwLCBpY29uKTtcclxuXHRcdFx0XHRkb20uYWRkQ2xhc3MoZ3JpcCwgJ2hhcy1pY29uJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRkb20uYXBwZW5kQ2hpbGQodGhpcy5lZGl0b3JDb250YWluZXIsIGdyaXApO1xyXG5cdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9yQ29udGFpbmVyLCBjb3Zlcik7XHJcblx0XHRkb20uaGlkZShjb3Zlcik7XHJcblxyXG5cdFx0ZG9tLm9uKGdyaXAsICd0b3VjaHN0YXJ0IG1vdXNlZG93bicsIG51bGwsIChlOiBhbnkpID0+IHtcclxuXHRcdFx0Ly8gaU9TIHVzZXMgd2luZG93LmV2ZW50XHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xyXG5cdFx0XHRcdGUgPSBnbG9iYWxXaW4uZXZlbnQ7XHJcblx0XHRcdFx0c3RhcnRYID0gZS50b3VjaGVzWzBdLnBhZ2VYO1xyXG5cdFx0XHRcdHN0YXJ0WSA9IGUudG91Y2hlc1swXS5wYWdlWTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzdGFydFggPSBlLnBhZ2VYO1xyXG5cdFx0XHRcdHN0YXJ0WSA9IGUucGFnZVk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHN0YXJ0V2lkdGggPSBkb20ud2lkdGgodGhpcy5lZGl0b3JDb250YWluZXIpO1xyXG5cdFx0XHRzdGFydEhlaWdodCA9IGRvbS5oZWlnaHQodGhpcy5lZGl0b3JDb250YWluZXIpO1xyXG5cdFx0XHRpc0RyYWdnaW5nID0gdHJ1ZTtcclxuXHJcblx0XHRcdGRvbS5hZGRDbGFzcyh0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3Jlc2l6aW5nJyk7XHJcblx0XHRcdGRvbS5zaG93KGNvdmVyKTtcclxuXHRcdFx0ZG9tLm9uKGdsb2JhbERvYywgbW92ZUV2ZW50cywgbnVsbCwgbW91c2VNb3ZlRnVuYyk7XHJcblx0XHRcdGRvbS5vbihnbG9iYWxEb2MsIGVuZEV2ZW50cywgbnVsbCwgbW91c2VVcEZ1bmMpO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUHJlZml4ZXMgYW5kIHByZWxvYWRzIHRoZSBlbW90aWNvbiBpbWFnZXNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaW5pdEVtb3RpY29ucyA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGxldCB0aGlzRWRpdG9yID0gdGhpcztcclxuXHRcdGxldCBlbW90aWNvbnMgPSB0aGlzLm9wdGlvbnMuZW1vdGljb25zO1xyXG5cdFx0bGV0IHJvb3QgPSB0aGlzLm9wdGlvbnMuZW1vdGljb25zUm9vdCB8fCAnJztcclxuXHJcblx0XHRpZiAoZW1vdGljb25zKSB7XHJcblx0XHRcdHRoaXMuYWxsRW1vdGljb25zID0gdXRpbHMuZXh0ZW5kKFxyXG5cdFx0XHRcdHt9LCBlbW90aWNvbnMubW9yZSwgZW1vdGljb25zLmRyb3Bkb3duLCBlbW90aWNvbnMuaGlkZGVuXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dXRpbHMuZWFjaCh0aGlzLmFsbEVtb3RpY29ucywgKGtleSwgdXJsKSA9PiB7XHJcblx0XHRcdHRoaXNFZGl0b3IuYWxsRW1vdGljb25zW2tleV0gPSB0ZW1wbGF0ZXMoJ2Vtb3RpY29uJywge1xyXG5cdFx0XHRcdGtleToga2V5LFxyXG5cdFx0XHRcdC8vIFByZWZpeCBlbW90aWNvbiByb290IHRvIGVtb3RpY29uIHVybHNcclxuXHRcdFx0XHR1cmw6IHJvb3QgKyAodXJsLnVybCB8fCB1cmwpLFxyXG5cdFx0XHRcdHRvb2x0aXA6IHVybC50b29sdGlwIHx8IGtleVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdC8vIFByZWxvYWQgdGhlIGVtb3RpY29uXHJcblx0XHRcdGlmICh0aGlzRWRpdG9yLm9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCkge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IucHJlTG9hZENhY2hlLnB1c2goZG9tLmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHtcclxuXHRcdFx0XHRcdHNyYzogcm9vdCArICh1cmwudXJsIHx8IHVybClcclxuXHRcdFx0XHR9KSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEF1dG9mb2N1cyB0aGUgZWRpdG9yXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGF1dG9mb2N1cyA9IChmb2N1c0VuZDogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgcmFuZ2UsIHR4dFBvcywgbm9kZSA9IHRoaXMud3lzaXd5Z0JvZHkuZmlyc3RDaGlsZDtcclxuXHJcblx0XHQvLyBDYW4ndCBmb2N1cyBpbnZpc2libGUgZWxlbWVudHNcclxuXHRcdGlmICghZG9tLmlzVmlzaWJsZSh0aGlzLmVkaXRvckNvbnRhaW5lcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLnNvdXJjZU1vZGUoKSkge1xyXG5cdFx0XHR0eHRQb3MgPSBmb2N1c0VuZCA/IHRoaXMuc291cmNlRWRpdG9yLnZhbHVlLmxlbmd0aCA6IDA7XHJcblxyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5zZXRTZWxlY3Rpb25SYW5nZSh0eHRQb3MsIHR4dFBvcyk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0ZG9tLnJlbW92ZVdoaXRlU3BhY2UodGhpcy53eXNpd3lnQm9keSk7XHJcblxyXG5cdFx0aWYgKGZvY3VzRW5kKSB7XHJcblx0XHRcdGlmICghKG5vZGUgPSB0aGlzLnd5c2l3eWdCb2R5Lmxhc3RDaGlsZCkpIHtcclxuXHRcdFx0XHRub2RlID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzLnd5c2l3eWdCb2R5LCBub2RlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKG5vZGUubGFzdENoaWxkKSB7XHJcblx0XHRcdFx0bm9kZSA9IG5vZGUubGFzdENoaWxkO1xyXG5cclxuXHRcdFx0XHQvLyBTaG91bGQgcGxhY2UgdGhlIGN1cnNvciBiZWZvcmUgdGhlIGxhc3QgPGJyPlxyXG5cdFx0XHRcdGlmIChkb20uaXMobm9kZSwgJ2JyJykgJiYgbm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcclxuXHRcdFx0XHRcdG5vZGUgPSBub2RlLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyYW5nZSA9IHRoaXMud3lzaXd5Z0RvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcblxyXG5cdFx0aWYgKCFkb20uY2FuSGF2ZUNoaWxkcmVuKG5vZGUpKSB7XHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKG5vZGUpO1xyXG5cclxuXHRcdFx0aWYgKGZvY3VzRW5kKSB7XHJcblx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRBZnRlcihub2RlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKG5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJhbmdlLmNvbGxhcHNlKCFmb2N1c0VuZCk7XHJcblx0XHR0aGlzLnJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJhbmdlKTtcclxuXHRcdHRoaXMuY3VycmVudFNlbGVjdGlvbiA9IHJhbmdlO1xyXG5cclxuXHRcdGlmIChmb2N1c0VuZCkge1xyXG5cdFx0XHR0aGlzLnd5c2l3eWdCb2R5LnNjcm9sbFRvcCA9IHRoaXMud3lzaXd5Z0JvZHkuc2Nyb2xsSGVpZ2h0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZm9jdXMoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBdXRvZXhwYW5kXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhdXRvRXhwYW5kID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvRXhwYW5kICYmICF0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSkge1xyXG5cdFx0XHR0aGlzLmF1dG9FeHBhbmRUaHJvdHRsZSA9IHNldFRpbWVvdXQodGhpcy5leHBhbmRUb0NvbnRlbnQsIDIwMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkgZG9jdW1lbnQgY2xpY2sgYW5kIGNsb3NlcyB0aGUgZHJvcGRvd24gaWYgb3BlblxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVEb2N1bWVudENsaWNrID0gKGU6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0Ly8gaWdub3JlIHJpZ2h0IGNsaWNrc1xyXG5cdFx0aWYgKGUud2hpY2ggIT09IDMgJiYgdGhpcy5kcm9wZG93biAmJiAhZS5kZWZhdWx0UHJldmVudGVkKSB7XHJcblx0XHRcdHRoaXMuYXV0b1VwZGF0ZSgpO1xyXG5cclxuXHRcdFx0dGhpcy5jbG9zZURyb3BEb3duKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgV1lTSVdZRyBlZGl0b3JzIGN1dCAmIGNvcHkgZXZlbnRzXHJcblx0ICpcclxuXHQgKiBCeSBkZWZhdWx0IGJyb3dzZXJzIGFsc28gY29weSBpbmhlcml0ZWQgc3R5bGluZyBmcm9tIHRoZSBzdHlsZXNoZWV0IGFuZFxyXG5cdCAqIGJyb3dzZXIgZGVmYXVsdCBzdHlsaW5nIHdoaWNoIGlzIHVubmVjZXNzYXJ5LlxyXG5cdCAqXHJcblx0ICogVGhpcyB3aWxsIGlnbm9yZSBpbmhlcml0ZWQgc3R5bGVzIGFuZCBvbmx5IGNvcHkgaW5saW5lIHN0eWxpbmcuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUN1dENvcHlFdnQgPSAoZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgcmFuZ2UgPSB0aGlzLnJhbmdlSGVscGVyLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRsZXQgY29udGFpbmVyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblx0XHRcdGxldCBmaXJzdFBhcmVudDtcclxuXHJcblx0XHRcdC8vIENvcHkgYWxsIGlubGluZSBwYXJlbnQgbm9kZXMgdXAgdG8gdGhlIGZpcnN0IGJsb2NrIHBhcmVudCBzbyBjYW5cclxuXHRcdFx0Ly8gY29weSBpbmxpbmUgc3R5bGVzXHJcblx0XHRcdGxldCBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0d2hpbGUgKHBhcmVudCAmJiBkb20uaXNJbmxpbmUocGFyZW50LCB0cnVlKSkge1xyXG5cdFx0XHRcdGlmIChwYXJlbnQubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUpIHtcclxuXHRcdFx0XHRcdGxldCBjbG9uZSA9IHBhcmVudC5jbG9uZU5vZGUoKSBhcyBIVE1MRWxlbWVudDtcclxuXHRcdFx0XHRcdGlmIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY2xvbmUsIGNvbnRhaW5lci5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGFpbmVyLCBjbG9uZSk7XHJcblx0XHRcdFx0XHRmaXJzdFBhcmVudCA9IGZpcnN0UGFyZW50IHx8IGNsb25lO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZpcnN0UGFyZW50IHx8IGNvbnRhaW5lciwgcmFuZ2UuY2xvbmVDb250ZW50cygpKTtcclxuXHRcdFx0ZG9tLnJlbW92ZVdoaXRlU3BhY2UoY29udGFpbmVyKTtcclxuXHJcblx0XHRcdGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L2h0bWwnLCBjb250YWluZXIuaW5uZXJIVE1MKTtcclxuXHJcblx0XHRcdC8vIFRPRE86IFJlZmFjdG9yIGludG8gcHJpdmF0ZSBzaGFyZWQgbW9kdWxlIHdpdGggcGxhaW50ZXh0IHBsdWdpblxyXG5cdFx0XHQvLyBpbm5lclRleHQgYWRkcyB0d28gbmV3bGluZXMgYWZ0ZXIgPHA+IHRhZ3Mgc28gY29udmVydCB0aGVtIHRvXHJcblx0XHRcdC8vIDxkaXY+IHRhZ3NcclxuXHRcdFx0dXRpbHMuZWFjaChkb20uZmluZChjb250YWluZXIsICdwJyksIChfLCBlbG0pID0+IHtcclxuXHRcdFx0XHRkb20uY29udmVydEVsZW1lbnQoZWxtLCAnZGl2Jyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHQvLyBSZW1vdmUgY29sbGFwc2VkIDxicj4gdGFncyBhcyBpbm5lclRleHQgY29udmVydHMgdGhlbSB0byBuZXdsaW5lc1xyXG5cdFx0XHR1dGlscy5lYWNoKGRvbS5maW5kKGNvbnRhaW5lciwgJ2JyJyksIChfLCBlbG0pID0+IHtcclxuXHRcdFx0XHRpZiAoIWVsbS5uZXh0U2libGluZyB8fCAhZG9tLmlzSW5saW5lKGVsbS5uZXh0U2libGluZywgdHJ1ZSkpIHtcclxuXHRcdFx0XHRcdGRvbS5yZW1vdmUoZWxtKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gcmFuZ2UudG9TdHJpbmcoKSBkb2Vzbid0IGluY2x1ZGUgbmV3bGluZXMgc28gY2FuJ3QgdXNlIHRoaXMuXHJcblx0XHRcdC8vIHNlbGVjdGlvbi50b1N0cmluZygpIHNlZW1zIHRvIHVzZSB0aGUgc2FtZSBtZXRob2QgYXMgaW5uZXJUZXh0XHJcblx0XHRcdC8vIGJ1dCBuZWVkcyB0byBiZSBub3JtYWxpc2VkIGZpcnN0IHNvIHVzaW5nIGNvbnRhaW5lci5pbm5lclRleHRcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKHRoaXMud3lzaXd5Z0JvZHksIGNvbnRhaW5lcik7XHJcblx0XHRcdGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L3BsYWluJywgY29udGFpbmVyLmlubmVyVGV4dCk7XHJcblx0XHRcdGRvbS5yZW1vdmUoY29udGFpbmVyKTtcclxuXHJcblx0XHRcdGlmIChlLnR5cGUgPT09ICdjdXQnKSB7XHJcblx0XHRcdFx0cmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgdGhlIFdZU0lXWUcgZWRpdG9ycyBwYXN0ZSBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVQYXN0ZUV2dCA9IChlOiBDbGlwYm9hcmRFdmVudCk6IHZvaWQgPT4ge1xyXG5cdFx0Y29uc3QgSU1BR0VfTUlNRV9SRUdFWDogUmVnRXhwID0gL15pbWFnZVxcLyhwP2pwZT9nfGdpZnxwbmd8Ym1wKSQvaTtcclxuXHRcdGxldCBlZGl0b3JDb250ZXh0ID0gdGhpcztcclxuXHRcdGxldCBlZGl0YWJsZSA9IGVkaXRvckNvbnRleHQud3lzaXd5Z0JvZHk7XHJcblx0XHRsZXQgY2xpcGJvYXJkID0gZS5jbGlwYm9hcmREYXRhO1xyXG5cdFx0bGV0IGxvYWRJbWFnZSA9IChmaWxlOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHRcdHJlYWRlci5vbmxvYWQgPSAoZTogYW55KSA9PiB7XHJcblx0XHRcdFx0ZWRpdG9yQ29udGV4dC5oYW5kbGVQYXN0ZURhdGEoe1xyXG5cdFx0XHRcdFx0aHRtbDogJzxpbWcgc3JjPVwiJyArIGUudGFyZ2V0LnJlc3VsdCArICdcIiAvPidcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE1vZGVybiBicm93c2VycyB3aXRoIGNsaXBib2FyZCBBUEkgLSBldmVyeXRoaW5nIG90aGVyIHRoYW4gX3ZlcnlfXHJcblx0XHQvLyBvbGQgYW5kcm9pZCB3ZWIgdmlld3MgYW5kIFVDIGJyb3dzZXIgd2hpY2ggZG9lc24ndCBzdXBwb3J0IHRoZVxyXG5cdFx0Ly8gcGFzdGUgZXZlbnQgYXQgYWxsLlxyXG5cdFx0aWYgKGNsaXBib2FyZCkge1xyXG5cdFx0XHRsZXQgZGF0YTogYW55ID0gW107XHJcblx0XHRcdGxldCB0eXBlcyA9IGNsaXBib2FyZC50eXBlcztcclxuXHRcdFx0bGV0IGl0ZW1zID0gY2xpcGJvYXJkLml0ZW1zO1xyXG5cclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdC8vIFdvcmQgc29tZXRpbWVzIGFkZHMgY29waWVkIHRleHQgYXMgYW4gaW1hZ2Ugc28gaWYgSFRNTFxyXG5cdFx0XHRcdC8vIGV4aXN0cyBwcmVmZXIgdGhhdCBvdmVyIGltYWdlc1xyXG5cdFx0XHRcdGlmICh0eXBlcy5pbmRleE9mKCd0ZXh0L2h0bWwnKSA8IDApIHtcclxuXHRcdFx0XHRcdC8vIE5vcm1hbGlzZSBpbWFnZSBwYXN0aW5nIHRvIHBhc3RlIGFzIGEgZGF0YS11cmlcclxuXHRcdFx0XHRcdGlmIChnbG9iYWxXaW4uRmlsZVJlYWRlciAmJiBpdGVtcyAmJlxyXG5cdFx0XHRcdFx0XHRJTUFHRV9NSU1FX1JFR0VYLnRlc3QoaXRlbXNbaV0udHlwZSkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGxvYWRJbWFnZShjbGlwYm9hcmQuaXRlbXNbaV0uZ2V0QXNGaWxlKCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkYXRhW3R5cGVzW2ldXSA9IGNsaXBib2FyZC5nZXREYXRhKHR5cGVzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBDYWxsIHBsdWdpbnMgaGVyZSB3aXRoIGZpbGU/XHJcblx0XHRcdGRhdGEudGV4dCA9IGRhdGFbJ3RleHQvcGxhaW4nXTtcclxuXHRcdFx0ZGF0YS5odG1sID0gdGhpcy5zYW5pdGl6ZShkYXRhWyd0ZXh0L2h0bWwnXSk7XHJcblxyXG5cdFx0XHR0aGlzLmhhbmRsZVBhc3RlRGF0YShkYXRhKTtcclxuXHRcdFx0Ly8gSWYgY29udGVudHNGcmFnbWVudCBleGlzdHMgdGhlbiB3ZSBhcmUgYWxyZWFkeSB3YWl0aW5nIGZvciBhXHJcblx0XHRcdC8vIHByZXZpb3VzIHBhc3RlIHNvIGxldCB0aGUgaGFuZGxlciBmb3IgdGhhdCBoYW5kbGUgdGhpcyBvbmUgdG9vXHJcblx0XHR9IGVsc2UgaWYgKCF0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50KSB7XHJcblx0XHRcdC8vIFNhdmUgdGhlIHNjcm9sbCBwb3NpdGlvbiBzbyBjYW4gYmUgcmVzdG9yZWRcclxuXHRcdFx0Ly8gd2hlbiBjb250ZW50cyBpcyByZXN0b3JlZFxyXG5cdFx0XHRsZXQgc2Nyb2xsVG9wID0gZWRpdGFibGUuc2Nyb2xsVG9wO1xyXG5cclxuXHRcdFx0dGhpcy5yYW5nZUhlbHBlci5zYXZlUmFuZ2UoKTtcclxuXHJcblx0XHRcdHRoaXMucGFzdGVDb250ZW50RnJhZ21lbnQgPSBnbG9iYWxEb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHR3aGlsZSAoZWRpdGFibGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzLnBhc3RlQ29udGVudEZyYWdtZW50LCBlZGl0YWJsZS5maXJzdENoaWxkKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0bGV0IGh0bWwgPSBlZGl0YWJsZS5pbm5lckhUTUw7XHJcblxyXG5cdFx0XHRcdGVkaXRhYmxlLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChlZGl0YWJsZSwgdGhpcy5wYXN0ZUNvbnRlbnRGcmFnbWVudCk7XHJcblx0XHRcdFx0ZWRpdGFibGUuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG5cdFx0XHRcdHRoaXMucGFzdGVDb250ZW50RnJhZ21lbnQgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0dGhpcy5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5oYW5kbGVQYXN0ZURhdGEoeyBodG1sOiB0aGlzLnNhbml0aXplKGh0bWwpIH0pO1xyXG5cdFx0XHR9LCAwKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXBsYWNlcyBhbnkgZW1vdGljb24gY29kZXMgaW4gdGhlIHBhc3NlZCBIVE1MXHJcblx0ICogd2l0aCB0aGVpciBlbW90aWNvbiBpbWFnZXNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgcmVwbGFjZUVtb3RpY29ucyA9ICgpOiB2b2lkID0+IHtcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuZW1vdGljb25zRW5hYmxlZCkge1xyXG5cdFx0XHRlbW90aWNvbnNcclxuXHRcdFx0XHQucmVwbGFjZSh0aGlzLnd5c2l3eWdCb2R5LCB0aGlzLmFsbEVtb3RpY29ucywgdGhpcy5vcHRpb25zLmVtb3RpY29uc0NvbXBhdCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgc2VsZWN0ZWQgdGV4dCBvZiB0aGUgc291cmNlIGVkaXRvclxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0ID0gKCk6IHN0cmluZyA9PiB7XHJcblx0XHR0aGlzLnNvdXJjZUVkaXRvci5mb2N1cygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnNvdXJjZUVkaXRvci52YWx1ZS5zdWJzdHJpbmcoXHJcblx0XHRcdHRoaXMuc291cmNlRWRpdG9yLnNlbGVjdGlvblN0YXJ0LFxyXG5cdFx0XHR0aGlzLnNvdXJjZUVkaXRvci5zZWxlY3Rpb25FbmRcclxuXHRcdCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUgcGFzc2VkIGNvbW1hbmRcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlQ29tbWFuZCA9IChjYWxsZXI6IGFueSwgY21kOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdC8vIGNoZWNrIGlmIGluIHRleHQgbW9kZSBhbmQgaGFuZGxlIHRleHQgY29tbWFuZHNcclxuXHRcdGlmICh0aGlzLmluU291cmNlTW9kZSgpKSB7XHJcblx0XHRcdGlmIChjbWQudHh0RXhlYykge1xyXG5cdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGNtZC50eHRFeGVjKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zb3VyY2VFZGl0b3JJbnNlcnRUZXh0LmFwcGx5KHRoaXMsIGNtZC50eHRFeGVjKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Y21kLnR4dEV4ZWMuY2FsbCh0aGlzLCBjYWxsZXIsIHRoaXMuc291cmNlRWRpdG9yU2VsZWN0ZWRUZXh0KCkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjbWQuZXhlYykge1xyXG5cdFx0XHRpZiAodXRpbHMuaXNGdW5jdGlvbihjbWQuZXhlYykpIHtcclxuXHRcdFx0XHRjbWQuZXhlYy5jYWxsKHRoaXMsIGNhbGxlcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5leGVjQ29tbWFuZChcclxuXHRcdFx0XHRcdGNtZC5leGVjLFxyXG5cdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNtZCwgJ2V4ZWNQYXJhbScpID8gY21kLmV4ZWNQYXJhbSA6IG51bGxcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdyYXAgaW5saW5lcyB0aGF0IGFyZSBpbiB0aGUgcm9vdCBpbiBwYXJhZ3JhcGhzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtIVE1MQm9keUVsZW1lbnR9IGJvZHlcclxuXHQgKiBAcGFyYW0ge0RvY3VtZW50fSBkb2NcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgd3JhcElubGluZXMgPSAoYm9keTogSFRNTEJvZHlFbGVtZW50LCBkb2M6IERvY3VtZW50KSA9PiB7XHJcblx0XHRsZXQgd3JhcHBlcjogSFRNTEVsZW1lbnQ7XHJcblxyXG5cdFx0ZG9tLnRyYXZlcnNlKGJvZHksIChub2RlOiBIVE1MRWxlbWVudCkgPT4ge1xyXG5cdFx0XHRpZiAoZG9tLmlzSW5saW5lKG5vZGUsIHRydWUpKSB7XHJcblx0XHRcdFx0Ly8gSWdub3JlIHRleHQgbm9kZXMgdW5sZXNzIHRoZXkgY29udGFpbiBub24td2hpdGVzcGFjZSBjaGFycyBhc1xyXG5cdFx0XHRcdC8vIHdoaXRlc3BhY2Ugd2lsbCBiZSBjb2xsYXBzZWQuXHJcblx0XHRcdFx0Ly8gSWdub3JlIGVtbGVkaXRvci1pZ25vcmUgZWxlbWVudHMgdW5sZXNzIHdyYXBwaW5nIHNpYmxpbmdzXHJcblx0XHRcdFx0Ly8gU2hvdWxkIHN0aWxsIHdyYXAgYm90aCBpZiB3cmFwcGluZyBzaWJsaW5ncy5cclxuXHRcdFx0XHRpZiAod3JhcHBlciB8fCBub2RlLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFID9cclxuXHRcdFx0XHRcdC9cXFMvLnRlc3Qobm9kZS5ub2RlVmFsdWUpIDogIWRvbS5pcyhub2RlLCAnLmVtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0aWYgKCF3cmFwcGVyKSB7XHJcblx0XHRcdFx0XHRcdHdyYXBwZXIgPSBkb20uY3JlYXRlRWxlbWVudCgncCcsIHt9LCBkb2MpO1xyXG5cdFx0XHRcdFx0XHRkb20uaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIG5vZGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh3cmFwcGVyLCBub2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0d3JhcHBlciA9IG51bGw7XHJcblx0XHRcdH1cclxuXHRcdH0sIGZhbHNlLCB0cnVlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBzZWxlY3Rpb24gaGFzIGNoYW5nZWQgYW5kIHRyaWdnZXJzXHJcblx0ICogdGhlIHNlbGVjdGlvbmNoYW5nZWQgZXZlbnQgaWYgaXQgaGFzLlxyXG5cdCAqXHJcblx0ICogSW4gYnJvd3NlcnMgb3RoZXIgdGhhdCBkb24ndCBzdXBwb3J0IHNlbGVjdGlvbmNoYW5nZSBldmVudCBpdCB3aWxsIGNoZWNrXHJcblx0ICogYXQgbW9zdCBvbmNlIGV2ZXJ5IDEwMG1zLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjaGVja1NlbGVjdGlvbkNoYW5nZWQgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgY2hlY2sgPSAoKSA9PiB7XHJcblx0XHRcdC8vIERvbid0IGNyZWF0ZSBuZXcgc2VsZWN0aW9uIGlmIHRoZXJlIGlzbid0IG9uZSAobGlrZSBhZnRlclxyXG5cdFx0XHQvLyBibHVyIGV2ZW50IGluIGlPUylcclxuXHRcdFx0aWYgKHRoaXNFZGl0b3Iud3lzaXd5Z1dpbmRvdy5nZXRTZWxlY3Rpb24oKSAmJlxyXG5cdFx0XHRcdHRoaXNFZGl0b3Iud3lzaXd5Z1dpbmRvdy5nZXRTZWxlY3Rpb24oKS5yYW5nZUNvdW50IDw9IDApIHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24gPSBudWxsO1xyXG5cdFx0XHRcdC8vIHJhbmdlSGVscGVyIGNvdWxkIGJlIG51bGwgaWYgZWRpdG9yIHdhcyBkZXN0cm95ZWRcclxuXHRcdFx0XHQvLyBiZWZvcmUgdGhlIHRpbWVvdXQgaGFkIGZpbmlzaGVkXHJcblx0XHRcdH0gZWxzZSBpZiAodGhpc0VkaXRvci5yYW5nZUhlbHBlciAmJiAhdGhpc0VkaXRvci5yYW5nZUhlbHBlci5jb21wYXJlKHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbikpIHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24gPSB0aGlzRWRpdG9yLnJhbmdlSGVscGVyLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgdGhlIHNlbGVjdGlvbiBpcyBpbiBhbiBpbmxpbmUgd3JhcCBpdCBpbiBhIGJsb2NrLlxyXG5cdFx0XHRcdC8vIEZpeGVzICMzMzFcclxuXHRcdFx0XHRpZiAodGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uICYmIHRoaXNFZGl0b3IuY3VycmVudFNlbGVjdGlvbi5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRcdGxldCBwYXJlbnQgPSB0aGlzRWRpdG9yLmN1cnJlbnRTZWxlY3Rpb24uc3RhcnRDb250YWluZXI7XHJcblx0XHRcdFx0XHRsZXQgb2Zmc2V0ID0gdGhpc0VkaXRvci5jdXJyZW50U2VsZWN0aW9uLnN0YXJ0T2Zmc2V0O1xyXG5cclxuXHRcdFx0XHRcdC8vIEhhbmRsZSBpZiBzZWxlY3Rpb24gaXMgcGxhY2VkIGJlZm9yZS9hZnRlciBhbiBlbGVtZW50XHJcblx0XHRcdFx0XHRpZiAob2Zmc2V0ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xyXG5cdFx0XHRcdFx0XHRwYXJlbnQgPSBwYXJlbnQuY2hpbGROb2Rlc1tvZmZzZXRdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHdoaWxlIChwYXJlbnQgJiYgcGFyZW50LnBhcmVudE5vZGUgIT09IHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHkpIHtcclxuXHRcdFx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKHBhcmVudCAmJiBkb20uaXNJbmxpbmUocGFyZW50LCB0cnVlKSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzRWRpdG9yLnJhbmdlSGVscGVyLnNhdmVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0XHR0aGlzRWRpdG9yLndyYXBJbmxpbmVzKHRoaXNFZGl0b3Iud3lzaXd5Z0JvZHksIHRoaXNFZGl0b3Iud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHRcdFx0dGhpc0VkaXRvci5yYW5nZUhlbHBlci5yZXN0b3JlUmFuZ2UoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGRvbS50cmlnZ2VyKHRoaXNFZGl0b3IuZWRpdG9yQ29udGFpbmVyLCAnc2VsZWN0aW9uY2hhbmdlZCcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzRWRpdG9yLmlzU2VsZWN0aW9uQ2hlY2tQZW5kaW5nID0gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXNFZGl0b3IuaXNTZWxlY3Rpb25DaGVja1BlbmRpbmcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNFZGl0b3IuaXNTZWxlY3Rpb25DaGVja1BlbmRpbmcgPSB0cnVlO1xyXG5cclxuXHRcdC8vIERvbid0IG5lZWQgdG8gbGltaXQgY2hlY2tpbmcgaWYgYnJvd3NlciBzdXBwb3J0cyB0aGUgU2VsZWN0aW9uIEFQSVxyXG5cdFx0aWYgKCdvbnNlbGVjdGlvbmNoYW5nZScgaW4gdGhpc0VkaXRvci53eXNpd3lnRG9jdW1lbnQpIHtcclxuXHRcdFx0Y2hlY2soKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHNldFRpbWVvdXQoY2hlY2ssIDEwMCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBhbnkga2V5IHByZXNzIGluIHRoZSBXWVNJV1lHIGVkaXRvclxyXG5cdCAqXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUtleVByZXNzID0gKGU6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0Ly8gRkYgYnVnOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01MDE0OTZcclxuXHRcdGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2xvc2VEcm9wRG93bigpO1xyXG5cclxuXHRcdC8vIDEzID0gZW50ZXIga2V5XHJcblx0XHRpZiAoZS53aGljaCA9PT0gMTMpIHtcclxuXHRcdFx0bGV0IExJU1RfVEFHUyA9ICdsaSx1bCxvbCc7XHJcblxyXG5cdFx0XHQvLyBcIkZpeFwiIChjbHVkZ2UpIGZvciBibG9ja2xldmVsIGVsZW1lbnRzIGJlaW5nIGR1cGxpY2F0ZWQgaW4gc29tZVxyXG5cdFx0XHQvLyBicm93c2VycyB3aGVuIGVudGVyIGlzIHByZXNzZWQgaW5zdGVhZCBvZiBpbnNlcnRpbmcgYSBuZXdsaW5lXHJcblx0XHRcdGlmICghZG9tLmlzKHRoaXMuY3VycmVudEJsb2NrTm9kZSwgTElTVF9UQUdTKSAmJlxyXG5cdFx0XHRcdGRvbS5oYXNTdHlsaW5nKHRoaXMuY3VycmVudEJsb2NrTm9kZSkpIHtcclxuXHJcblx0XHRcdFx0bGV0IGJyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2JyJywge30sIHRoaXMud3lzaXd5Z0RvY3VtZW50KTtcclxuXHRcdFx0XHR0aGlzLnJhbmdlSGVscGVyLmluc2VydE5vZGUoYnIpO1xyXG5cclxuXHRcdFx0XHQvLyBMYXN0IDxicj4gb2YgYSBibG9jayB3aWxsIGJlIGNvbGxhcHNlZCAgc28gbmVlZCB0byBtYWtlIHN1cmVcclxuXHRcdFx0XHQvLyB0aGUgPGJyPiB0aGF0IHdhcyBpbnNlcnRlZCBpc24ndCB0aGUgbGFzdCBub2RlIG9mIGEgYmxvY2suXHJcblx0XHRcdFx0bGV0IHBhcmVudCA9IGJyLnBhcmVudE5vZGU7XHJcblx0XHRcdFx0bGV0IGxhc3RDaGlsZCA9IHBhcmVudC5sYXN0Q2hpbGQgYXMgYW55O1xyXG5cclxuXHRcdFx0XHQvLyBTb21ldGltZXMgYW4gZW1wdHkgbmV4dCBub2RlIGlzIGNyZWF0ZWQgYWZ0ZXIgdGhlIDxicj5cclxuXHRcdFx0XHRpZiAobGFzdENoaWxkICYmIGxhc3RDaGlsZC5ub2RlVHlwZSA9PT0gZG9tLlRFWFRfTk9ERSAmJlxyXG5cdFx0XHRcdFx0bGFzdENoaWxkLm5vZGVWYWx1ZSA9PT0gJycpIHtcclxuXHRcdFx0XHRcdGRvbS5yZW1vdmUobGFzdENoaWxkKTtcclxuXHRcdFx0XHRcdGxhc3RDaGlsZCA9IHBhcmVudC5sYXN0Q2hpbGQ7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBJZiB0aGlzIGlzIHRoZSBsYXN0IEJSIG9mIGEgYmxvY2sgYW5kIHRoZSBwcmV2aW91c1xyXG5cdFx0XHRcdC8vIHNpYmxpbmcgaXMgaW5saW5lIHRoZW4gd2lsbCBuZWVkIGFuIGV4dHJhIEJSLiBUaGlzXHJcblx0XHRcdFx0Ly8gaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGxhc3QgQlIgb2YgYSBibG9jayB3aWxsIGJlXHJcblx0XHRcdFx0Ly8gY29sbGFwc2VkLiBGaXhlcyBpc3N1ZSAjMjQ4XHJcblx0XHRcdFx0aWYgKCFkb20uaXNJbmxpbmUocGFyZW50LCB0cnVlKSAmJiBsYXN0Q2hpbGQgPT09IGJyICYmXHJcblx0XHRcdFx0XHRkb20uaXNJbmxpbmUoYnIucHJldmlvdXNTaWJsaW5nKSkge1xyXG5cdFx0XHRcdFx0dGhpcy5yYW5nZUhlbHBlci5pbnNlcnRIVE1MKCc8YnI+Jyk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlcyBzdXJlIHRoYXQgaWYgdGhlcmUgaXMgYSBjb2RlIG9yIHF1b3RlIHRhZyBhdCB0aGVcclxuXHQgKiBlbmQgb2YgdGhlIGVkaXRvciwgdGhhdCB0aGVyZSBpcyBhIG5ldyBsaW5lIGFmdGVyIGl0LlxyXG5cdCAqXHJcblx0ICogSWYgdGhlcmUgd2Fzbid0IGEgbmV3IGxpbmUgYXQgdGhlIGVuZCB5b3Ugd291bGRuJ3QgYmUgYWJsZVxyXG5cdCAqIHRvIGVudGVyIGFueSB0ZXh0IGFmdGVyIGEgY29kZS9xdW90ZSB0YWdcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBhcHBlbmROZXdMaW5lID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0Ly8gQ2hlY2sgYWxsIG5vZGVzIGluIHJldmVyc2UgdW50aWwgZWl0aGVyIGFkZCBhIG5ldyBsaW5lXHJcblx0XHQvLyBvciByZWFjaCBhIG5vbi1lbXB0eSB0ZXh0bm9kZSBvciBCUiBhdCB3aGljaCBwb2ludCBjYW5cclxuXHRcdC8vIHN0b3AgY2hlY2tpbmcuXHJcblx0XHRkb20uclRyYXZlcnNlKHRoaXMud3lzaXd5Z0JvZHksIChub2RlOiBhbnkpID0+IHtcclxuXHRcdFx0Ly8gTGFzdCBibG9jaywgYWRkIG5ldyBsaW5lIGFmdGVyIGlmIGhhcyBzdHlsaW5nXHJcblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uRUxFTUVOVF9OT0RFICYmXHJcblx0XHRcdFx0IS9pbmxpbmUvLnRlc3QoZG9tLmNzcyhub2RlLCAnZGlzcGxheScpKSkge1xyXG5cclxuXHRcdFx0XHQvLyBBZGQgbGluZSBicmVhayBhZnRlciBpZiBoYXMgc3R5bGluZ1xyXG5cdFx0XHRcdGlmICghZG9tLmlzKG5vZGUsICcuZW1sZWRpdG9yLW5sZicpICYmIGRvbS5oYXNTdHlsaW5nKG5vZGUpKSB7XHJcblx0XHRcdFx0XHRsZXQgcGFyYWdyYXBoID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgdGhpcy53eXNpd3lnRG9jdW1lbnQpO1xyXG5cdFx0XHRcdFx0cGFyYWdyYXBoLmNsYXNzTmFtZSA9ICdlbWxlZGl0b3ItbmxmJztcclxuXHRcdFx0XHRcdHBhcmFncmFwaC5pbm5lckhUTUwgPSAnPGJyIC8+JztcclxuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZCh0aGlzLnd5c2l3eWdCb2R5LCBwYXJhZ3JhcGgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gTGFzdCBub24tZW1wdHkgdGV4dCBub2RlIG9yIGxpbmUgYnJlYWsuXHJcblx0XHRcdC8vIE5vIG5lZWQgdG8gYWRkIGxpbmUtYnJlYWsgYWZ0ZXIgdGhlbVxyXG5cdFx0XHRpZiAoKG5vZGUubm9kZVR5cGUgPT09IDMgJiYgIS9eXFxzKiQvLnRlc3Qobm9kZS5ub2RlVmFsdWUpKSB8fFxyXG5cdFx0XHRcdGRvbS5pcyhub2RlLCAnYnInKSkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyBmb3JtIHJlc2V0IGV2ZW50XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUZvcm1SZXNldCA9ICgpOiB2b2lkID0+IHtcclxuXHRcdHRoaXMudmFsKHRoaXMudGV4dGFyZWEudmFsdWUpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhhbmRsZXMgYW55IG1vdXNlZG93biBwcmVzcyBpbiB0aGUgV1lTSVdZRyBlZGl0b3JcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlTW91c2VEb3duID0gKCk6IHZvaWQgPT4ge1xyXG5cdFx0dGhpcy5jbG9zZURyb3BEb3duKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGFzc2VzIGV2ZW50cyBvbiB0byBhbnkgaGFuZGxlcnNcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIEByZXR1cm4gdm9pZFxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlRXZlbnQgPSAoZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRpZiAodGhpcy5wbHVnaW5NYW5hZ2VyKSB7XHJcblx0XHRcdC8vIFNlbmQgZXZlbnQgdG8gYWxsIHBsdWdpbnNcclxuXHRcdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoZS50eXBlICsgJ0V2ZW50JywgZSwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY29udmVydCB0aGUgZXZlbnQgaW50byBhIGN1c3RvbSBldmVudCB0byBzZW5kXHJcblx0XHRsZXQgbmFtZSA9IChlLnRhcmdldCA9PT0gdGhpcy5zb3VyY2VFZGl0b3IgPyAnZW1sc3JjJyA6ICdlbWx3eXMnKSArIGUudHlwZSBhcyBrZXlvZiB0eXBlb2YgdGhpcy5ldmVudEhhbmRsZXJzO1xyXG5cclxuXHRcdGlmICh0aGlzLmV2ZW50SGFuZGxlcnNbbmFtZV0pIHtcclxuXHRcdFx0dGhpcy5ldmVudEhhbmRsZXJzW25hbWVdLmZvckVhY2goKGZuOiBhbnkpID0+IHtcclxuXHRcdFx0XHRmbi5jYWxsKHRoaXMsIGUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBFbW90aWNvbnMga2V5cHJlc3MgaGFuZGxlclxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBlbW90aWNvbnNLZXlQcmVzcyA9IChlOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdGxldCByZXBsYWNlZEVtb3RpY29uLCBjYWNoZVBvcyA9IDAsIGVtb3RpY29uc0NhY2hlID0gdGhpcy5lbW90aWNvbnNDYWNoZSwgY3VyQ2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XHJcblxyXG5cdFx0Ly8gVE9ETzogTWFrZSBjb25maWd1cmFibGVcclxuXHRcdGlmIChkb20uY2xvc2VzdCh0aGlzLmN1cnJlbnRCbG9ja05vZGUsICdjb2RlJykpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghZW1vdGljb25zQ2FjaGUpIHtcclxuXHRcdFx0ZW1vdGljb25zQ2FjaGUgPSBbXTtcclxuXHJcblx0XHRcdHV0aWxzLmVhY2godGhpcy5hbGxFbW90aWNvbnMsIChrZXksIGh0bWwpID0+IHtcclxuXHRcdFx0XHRlbW90aWNvbnNDYWNoZVtjYWNoZVBvcysrXSA9IFtrZXksIGh0bWxdO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGVtb3RpY29uc0NhY2hlLnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGFbMF0ubGVuZ3RoIC0gYlswXS5sZW5ndGg7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0dGhpcy5lbW90aWNvbnNDYWNoZSA9IGVtb3RpY29uc0NhY2hlO1xyXG5cdFx0XHR0aGlzLmxvbmdlc3RFbW90aWNvbkNvZGUgPVxyXG5cdFx0XHRcdGVtb3RpY29uc0NhY2hlW2Vtb3RpY29uc0NhY2hlLmxlbmd0aCAtIDFdWzBdLmxlbmd0aDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXBsYWNlZEVtb3RpY29uID0gdGhpcy5yYW5nZUhlbHBlci5yZXBsYWNlS2V5d29yZChcclxuXHRcdFx0dGhpcy5lbW90aWNvbnNDYWNoZSxcclxuXHRcdFx0dHJ1ZSxcclxuXHRcdFx0dHJ1ZSxcclxuXHRcdFx0dGhpcy5sb25nZXN0RW1vdGljb25Db2RlLFxyXG5cdFx0XHR0aGlzLm9wdGlvbnMuZW1vdGljb25zQ29tcGF0LFxyXG5cdFx0XHRjdXJDaGFyXHJcblx0XHQpO1xyXG5cclxuXHRcdGlmIChyZXBsYWNlZEVtb3RpY29uKSB7XHJcblx0XHRcdGlmICghdGhpcy5vcHRpb25zLmVtb3RpY29uc0NvbXBhdCB8fCAhL15cXHMkLy50ZXN0KGN1ckNoYXIpKSB7XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFrZXMgc3VyZSBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBlbW90aWNvbnNDaGVja1doaXRlc3BhY2UgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRlbW90aWNvbnMuY2hlY2tXaGl0ZXNwYWNlKHRoaXMuY3VycmVudEJsb2NrTm9kZSwgdGhpcy5yYW5nZUhlbHBlcik7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGFuZGxlcyB0aGUga2V5ZG93biBldmVudCwgdXNlZCBmb3Igc2hvcnRjdXRzXHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIGhhbmRsZUtleURvd24gPSAoZTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgdGhpc0VkaXRvciA9IHRoaXM7XHJcblx0XHRsZXQgc2hvcnRjdXQ6IGFueSA9IFtdLFxyXG5cclxuXHRcdFx0U0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdCdgJzogJ34nLFxyXG5cdFx0XHRcdCcxJzogJyEnLFxyXG5cdFx0XHRcdCcyJzogJ0AnLFxyXG5cdFx0XHRcdCczJzogJyMnLFxyXG5cdFx0XHRcdCc0JzogJyQnLFxyXG5cdFx0XHRcdCc1JzogJyUnLFxyXG5cdFx0XHRcdCc2JzogJ14nLFxyXG5cdFx0XHRcdCc3JzogJyYnLFxyXG5cdFx0XHRcdCc4JzogJyonLFxyXG5cdFx0XHRcdCc5JzogJygnLFxyXG5cdFx0XHRcdCcwJzogJyknLFxyXG5cdFx0XHRcdCctJzogJ18nLFxyXG5cdFx0XHRcdCc9JzogJysnLFxyXG5cdFx0XHRcdCc7JzogJzogJyxcclxuXHRcdFx0XHQnXFwnJzogJ1wiJyxcclxuXHRcdFx0XHQnLCc6ICc8JyxcclxuXHRcdFx0XHQnLic6ICc+JyxcclxuXHRcdFx0XHQnLyc6ICc/JyxcclxuXHRcdFx0XHQnXFxcXCc6ICd8JyxcclxuXHRcdFx0XHQnWyc6ICd7JyxcclxuXHRcdFx0XHQnXSc6ICd9J1xyXG5cdFx0XHR9LCBTUEVDSUFMX0tFWVM6IGFueSA9IHtcclxuXHRcdFx0XHQ4OiAnYmFja3NwYWNlJyxcclxuXHRcdFx0XHQ5OiAndGFiJyxcclxuXHRcdFx0XHQxMzogJ2VudGVyJyxcclxuXHRcdFx0XHQxOTogJ3BhdXNlJyxcclxuXHRcdFx0XHQyMDogJ2NhcHNsb2NrJyxcclxuXHRcdFx0XHQyNzogJ2VzYycsXHJcblx0XHRcdFx0MzI6ICdzcGFjZScsXHJcblx0XHRcdFx0MzM6ICdwYWdldXAnLFxyXG5cdFx0XHRcdDM0OiAncGFnZWRvd24nLFxyXG5cdFx0XHRcdDM1OiAnZW5kJyxcclxuXHRcdFx0XHQzNjogJ2hvbWUnLFxyXG5cdFx0XHRcdDM3OiAnbGVmdCcsXHJcblx0XHRcdFx0Mzg6ICd1cCcsXHJcblx0XHRcdFx0Mzk6ICdyaWdodCcsXHJcblx0XHRcdFx0NDA6ICdkb3duJyxcclxuXHRcdFx0XHQ0NTogJ2luc2VydCcsXHJcblx0XHRcdFx0NDY6ICdkZWwnLFxyXG5cdFx0XHRcdDkxOiAnd2luJyxcclxuXHRcdFx0XHQ5MjogJ3dpbicsXHJcblx0XHRcdFx0OTM6ICdzZWxlY3QnLFxyXG5cdFx0XHRcdDk2OiAnMCcsXHJcblx0XHRcdFx0OTc6ICcxJyxcclxuXHRcdFx0XHQ5ODogJzInLFxyXG5cdFx0XHRcdDk5OiAnMycsXHJcblx0XHRcdFx0MTAwOiAnNCcsXHJcblx0XHRcdFx0MTAxOiAnNScsXHJcblx0XHRcdFx0MTAyOiAnNicsXHJcblx0XHRcdFx0MTAzOiAnNycsXHJcblx0XHRcdFx0MTA0OiAnOCcsXHJcblx0XHRcdFx0MTA1OiAnOScsXHJcblx0XHRcdFx0MTA2OiAnKicsXHJcblx0XHRcdFx0MTA3OiAnKycsXHJcblx0XHRcdFx0MTA5OiAnLScsXHJcblx0XHRcdFx0MTEwOiAnLicsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0MTEyOiAnZjEnLFxyXG5cdFx0XHRcdDExMzogJ2YyJyxcclxuXHRcdFx0XHQxMTQ6ICdmMycsXHJcblx0XHRcdFx0MTE1OiAnZjQnLFxyXG5cdFx0XHRcdDExNjogJ2Y1JyxcclxuXHRcdFx0XHQxMTc6ICdmNicsXHJcblx0XHRcdFx0MTE4OiAnZjcnLFxyXG5cdFx0XHRcdDExOTogJ2Y4JyxcclxuXHRcdFx0XHQxMjA6ICdmOScsXHJcblx0XHRcdFx0MTIxOiAnZjEwJyxcclxuXHRcdFx0XHQxMjI6ICdmMTEnLFxyXG5cdFx0XHRcdDEyMzogJ2YxMicsXHJcblx0XHRcdFx0MTQ0OiAnbnVtbG9jaycsXHJcblx0XHRcdFx0MTQ1OiAnc2Nyb2xsbG9jaycsXHJcblx0XHRcdFx0MTg2OiAnOycsXHJcblx0XHRcdFx0MTg3OiAnPScsXHJcblx0XHRcdFx0MTg4OiAnLCcsXHJcblx0XHRcdFx0MTg5OiAnLScsXHJcblx0XHRcdFx0MTkwOiAnLicsXHJcblx0XHRcdFx0MTkxOiAnLycsXHJcblx0XHRcdFx0MTkyOiAnYCcsXHJcblx0XHRcdFx0MjE5OiAnWycsXHJcblx0XHRcdFx0MjIwOiAnXFxcXCcsXHJcblx0XHRcdFx0MjIxOiAnXScsXHJcblx0XHRcdFx0MjIyOiAnXFwnJ1xyXG5cdFx0XHR9LCBOVU1QQURfU0hJRlRfS0VZUzogYW55ID0ge1xyXG5cdFx0XHRcdDEwOTogJy0nLFxyXG5cdFx0XHRcdDExMDogJ2RlbCcsXHJcblx0XHRcdFx0MTExOiAnLycsXHJcblx0XHRcdFx0OTY6ICcwJyxcclxuXHRcdFx0XHQ5NzogJzEnLFxyXG5cdFx0XHRcdDk4OiAnMicsXHJcblx0XHRcdFx0OTk6ICczJyxcclxuXHRcdFx0XHQxMDA6ICc0JyxcclxuXHRcdFx0XHQxMDE6ICc1JyxcclxuXHRcdFx0XHQxMDI6ICc2JyxcclxuXHRcdFx0XHQxMDM6ICc3JyxcclxuXHRcdFx0XHQxMDQ6ICc4JyxcclxuXHRcdFx0XHQxMDU6ICc5J1xyXG5cdFx0XHR9LCB3aGljaCA9IGUud2hpY2gsIGNoYXJhY3RlciA9IFNQRUNJQUxfS0VZU1t3aGljaF0gfHwgU3RyaW5nLmZyb21DaGFyQ29kZSh3aGljaCkudG9Mb3dlckNhc2UoKTtcclxuXHJcblx0XHRpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkge1xyXG5cdFx0XHRzaG9ydGN1dC5wdXNoKCdjdHJsJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGUuYWx0S2V5KSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goJ2FsdCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlLnNoaWZ0S2V5KSB7XHJcblx0XHRcdHNob3J0Y3V0LnB1c2goJ3NoaWZ0Jyk7XHJcblxyXG5cdFx0XHRpZiAoTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdKSB7XHJcblx0XHRcdFx0Y2hhcmFjdGVyID0gTlVNUEFEX1NISUZUX0tFWVNbd2hpY2hdO1xyXG5cdFx0XHR9IGVsc2UgaWYgKFNISUZUX0tFWVNbY2hhcmFjdGVyXSkge1xyXG5cdFx0XHRcdGNoYXJhY3RlciA9IFNISUZUX0tFWVNbY2hhcmFjdGVyXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNoaWZ0IGlzIDE2LCBjdHJsIGlzIDE3IGFuZCBhbHQgaXMgMThcclxuXHRcdGlmIChjaGFyYWN0ZXIgJiYgKHdoaWNoIDwgMTYgfHwgd2hpY2ggPiAxOCkpIHtcclxuXHRcdFx0c2hvcnRjdXQucHVzaChjaGFyYWN0ZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNob3J0Y3V0ID0gc2hvcnRjdXQuam9pbignKycpO1xyXG5cdFx0aWYgKHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVycyAmJlxyXG5cdFx0XHR0aGlzRWRpdG9yLnNob3J0Y3V0SGFuZGxlcnNbc2hvcnRjdXRdICYmXHJcblx0XHRcdHRoaXNFZGl0b3Iuc2hvcnRjdXRIYW5kbGVyc1tzaG9ydGN1dF0uY2FsbCh0aGlzRWRpdG9yKSA9PT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIYW5kbGVzIHRoZSBiYWNrc3BhY2Uga2V5IHByZXNzXHJcblx0ICpcclxuXHQgKiBXaWxsIHJlbW92ZSBibG9jayBzdHlsaW5nIGxpa2UgcXVvdGVzL2NvZGUgZWN0IGlmIGF0IHRoZSBzdGFydC5cclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgaGFuZGxlQmFja1NwYWNlID0gKGU6IGFueSk6IHZvaWQgPT4ge1xyXG5cdFx0bGV0IG5vZGUsIG9mZnNldCwgcmFuZ2UsIHBhcmVudDtcclxuXHJcblx0XHQvLyA4IGlzIHRoZSBiYWNrc3BhY2Uga2V5XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmRpc2FibGVCbG9ja1JlbW92ZSB8fCBlLndoaWNoICE9PSA4IHx8XHJcblx0XHRcdCEocmFuZ2UgPSB0aGlzLnJhbmdlSGVscGVyLnNlbGVjdGVkUmFuZ2UoKSkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcclxuXHRcdG9mZnNldCA9IHJhbmdlLnN0YXJ0T2Zmc2V0O1xyXG5cclxuXHRcdGlmIChvZmZzZXQgIT09IDAgfHwgIShwYXJlbnQgPSB0aGlzLmN1cnJlbnRTdHlsZWRCbG9ja05vZGUoKSkgfHxcclxuXHRcdFx0ZG9tLmlzKHBhcmVudCwgJ2JvZHknKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0d2hpbGUgKG5vZGUgIT09IHBhcmVudCkge1xyXG5cdFx0XHR3aGlsZSAobm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcclxuXHRcdFx0XHRub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XHJcblxyXG5cdFx0XHRcdC8vIEV2ZXJ5dGhpbmcgYnV0IGVtcHR5IHRleHQgbm9kZXMgYmVmb3JlIHRoZSBjdXJzb3JcclxuXHRcdFx0XHQvLyBzaG91bGQgcHJldmVudCB0aGUgc3R5bGUgZnJvbSBiZWluZyByZW1vdmVkXHJcblx0XHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgIT09IGRvbS5URVhUX05PREUgfHwgbm9kZS5ub2RlVmFsdWUpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVGhlIGJhY2tzcGFjZSB3YXMgcHJlc3NlZCBhdCB0aGUgc3RhcnQgb2ZcclxuXHRcdC8vIHRoZSBjb250YWluZXIgc28gY2xlYXIgdGhlIHN0eWxlXHJcblx0XHR0aGlzLmNsZWFyQmxvY2tGb3JtYXR0aW5nKHBhcmVudCk7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgZmlyc3Qgc3R5bGVkIGJsb2NrIG5vZGUgdGhhdCBjb250YWlucyB0aGUgY3Vyc29yXHJcblx0ICogQHJldHVybiB7SFRNTEVsZW1lbnR9XHJcblx0ICovXHJcblx0cHJpdmF0ZSBjdXJyZW50U3R5bGVkQmxvY2tOb2RlID0gKCk6IEhUTUxFbGVtZW50ID0+IHtcclxuXHRcdGxldCBibG9jazogYW55ID0gdGhpcy5jdXJyZW50QmxvY2tOb2RlO1xyXG5cclxuXHRcdHdoaWxlICghZG9tLmhhc1N0eWxpbmcoYmxvY2spIHx8IGRvbS5pc0lubGluZShibG9jaywgdHJ1ZSkpIHtcclxuXHRcdFx0aWYgKCEoYmxvY2sgPSBibG9jay5wYXJlbnROb2RlKSB8fCBkb20uaXMoYmxvY2ssICdib2R5JykpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gYmxvY2s7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVHJpZ2dlcnMgdGhlIHZhbHVlQ2hhbmdlZCBzaWduYWwgaWYgdGhlcmUgaXNcclxuXHQgKiBhIHBsdWdpbiB0aGF0IGhhbmRsZXMgaXQuXHJcblx0ICpcclxuXHQgKiBJZiByYW5nZUhlbHBlci5zYXZlUmFuZ2UoKSBoYXMgYWxyZWFkeSBiZWVuXHJcblx0ICogY2FsbGVkLCB0aGVuIHNhdmVSYW5nZSBzaG91bGQgYmUgc2V0IHRvIGZhbHNlXHJcblx0ICogdG8gcHJldmVudCB0aGUgcmFuZ2UgYmVpbmcgc2F2ZWQgdHdpY2UuXHJcblx0ICpcclxuXHQgKiBAc2luY2UgMS40LjVcclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHNhdmVSYW5nZSBJZiB0byBjYWxsIHJhbmdlSGVscGVyLnNhdmVSYW5nZSgpLlxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYXNIYW5kbGVyID0gZmFsc2U7XHJcblx0cHJpdmF0ZSB0cmlnZ2VyVmFsdWVDaGFuZ2VkID0gKHNhdmVSYW5nZT86IGJvb2xlYW4pOiBhbnkgPT4ge1xyXG5cclxuXHRcdGxldCBsYXN0VmFsOiBzdHJpbmc7XHJcblx0XHRpZiAoIXRoaXMucGx1Z2luTWFuYWdlciB8fFxyXG5cdFx0XHQoIXRoaXMucGx1Z2luTWFuYWdlci5oYXNIYW5kbGVyKCd2YWx1ZWNoYW5nZWRFdmVudCcpICYmXHJcblx0XHRcdFx0IXRoaXMuaGFzSGFuZGxlcikpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjdXJyZW50SHRtbCwgc291cmNlTW9kZSA9IHRoaXMuc291cmNlTW9kZSgpLCBoYXNTZWxlY3Rpb24gPSAhc291cmNlTW9kZSAmJiB0aGlzLnJhbmdlSGVscGVyLmhhc1NlbGVjdGlvbigpO1xyXG5cclxuXHRcdC8vIENvbXBvc2l0aW9uIGVuZCBpc24ndCBndWFyYW50ZWVkIHRvIGZpcmUgYnV0IG11c3QgaGF2ZVxyXG5cdFx0Ly8gZW5kZWQgd2hlbiB0cmlnZ2VyVmFsdWVDaGFuZ2VkKCkgaXMgY2FsbGVkIHNvIHJlc2V0IGl0XHJcblx0XHR0aGlzLmlzQ29tcG9zaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgbmVlZCB0byBzYXZlIHRoZSByYW5nZSBpZiBlbWxlZGl0b3Itc3RhcnQtbWFya2VyXHJcblx0XHQvLyBpcyBwcmVzZW50IGFzIHRoZSByYW5nZSBpcyBhbHJlYWR5IHNhdmVkXHJcblx0XHRzYXZlUmFuZ2UgPSBzYXZlUmFuZ2UgIT09IGZhbHNlICYmXHJcblx0XHRcdCF0aGlzLnd5c2l3eWdEb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW1sZWRpdG9yLXN0YXJ0LW1hcmtlcicpO1xyXG5cclxuXHRcdC8vIENsZWFyIGFueSBjdXJyZW50IHRpbWVvdXQgYXMgaXQncyBub3cgYmVlbiB0cmlnZ2VyZWRcclxuXHRcdGlmICh0aGlzLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIpIHtcclxuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMudmFsdWVDaGFuZ2VkS2V5VXBUaW1lcik7XHJcblx0XHRcdHRoaXMudmFsdWVDaGFuZ2VkS2V5VXBUaW1lciA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoYXNTZWxlY3Rpb24gJiYgc2F2ZVJhbmdlKSB7XHJcblx0XHRcdHRoaXMucmFuZ2VIZWxwZXIuc2F2ZVJhbmdlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y3VycmVudEh0bWwgPSBzb3VyY2VNb2RlID8gdGhpcy5zb3VyY2VFZGl0b3IudmFsdWUgOiB0aGlzLnd5c2l3eWdCb2R5LmlubmVySFRNTDtcclxuXHJcblx0XHQvLyBPbmx5IHRyaWdnZXIgaWYgc29tZXRoaW5nIGhhcyBhY3R1YWxseSBjaGFuZ2VkLlxyXG5cdFx0aWYgKGN1cnJlbnRIdG1sICE9PSBsYXN0VmFsKSB7XHJcblx0XHRcdGxhc3RWYWwgPSBjdXJyZW50SHRtbDtcclxuXHJcblx0XHRcdGRvbS50cmlnZ2VyKHRoaXMuZWRpdG9yQ29udGFpbmVyLCAndmFsdWVjaGFuZ2VkJywge1xyXG5cdFx0XHRcdHJhd1ZhbHVlOiBzb3VyY2VNb2RlID8gdGhpcy52YWwoKSA6IGN1cnJlbnRIdG1sXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChoYXNTZWxlY3Rpb24gJiYgc2F2ZVJhbmdlKSB7XHJcblx0XHRcdHRoaXMucmFuZ2VIZWxwZXIucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBibHVyIGV2ZW50XHJcblx0ICogQHByaXZhdGVcclxuXHQgKi9cclxuXHRwcml2YXRlIHZhbHVlQ2hhbmdlZEJsdXIgPSAoKTogdm9pZCA9PiB7XHJcblx0XHRpZiAodGhpcy52YWx1ZUNoYW5nZWRLZXlVcFRpbWVyKSB7XHJcblx0XHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNob3VsZCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlcmUgaXMgYSBrZXlwcmVzcyBldmVudFxyXG5cdCAqIEBwYXJhbSAge0V2ZW50fSBlIFRoZSBrZXlwcmVzcyBldmVudFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSB2YWx1ZUNoYW5nZWRLZXlVcCA9IChlOiBhbnkpOiBhbnkgPT4ge1xyXG5cdFx0bGV0IHRoaXNFZGl0b3IgPSB0aGlzO1xyXG5cdFx0bGV0IHdoaWNoID0gZS53aGljaDtcclxuXHRcdGxldCBsYXN0Q2hhcjogYW55ID0gd2hpY2g7XHJcblx0XHRsZXQgdHJpZ2dlck5leHQ6IGJvb2xlYW47XHJcblx0XHRsZXQgbGFzdFdhc1NwYWNlID0gKGxhc3RDaGFyID09PSAxMyB8fCBsYXN0Q2hhciA9PT0gMzIpO1xyXG5cdFx0bGV0IGxhc3RXYXNEZWxldGUgPSAobGFzdENoYXIgPT09IDggfHwgbGFzdENoYXIgPT09IDQ2KTtcclxuXHJcblx0XHRpZiAodGhpc0VkaXRvci5pc0NvbXBvc2luZykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gMTMgPSByZXR1cm4gJiAzMiA9IHNwYWNlXHJcblx0XHRpZiAod2hpY2ggPT09IDEzIHx8IHdoaWNoID09PSAzMikge1xyXG5cdFx0XHRpZiAoIWxhc3RXYXNTcGFjZSkge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRyaWdnZXJOZXh0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyA4ID0gYmFja3NwYWNlICYgNDYgPSBkZWxcclxuXHRcdH0gZWxzZSBpZiAod2hpY2ggPT09IDggfHwgd2hpY2ggPT09IDQ2KSB7XHJcblx0XHRcdGlmICghbGFzdFdhc0RlbGV0ZSkge1xyXG5cdFx0XHRcdHRoaXNFZGl0b3IudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRyaWdnZXJOZXh0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmICh0cmlnZ2VyTmV4dCkge1xyXG5cdFx0XHR0aGlzRWRpdG9yLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0dHJpZ2dlck5leHQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDbGVhciB0aGUgcHJldmlvdXMgdGltZW91dCBhbmQgc2V0IGEgbmV3IG9uZS5cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzRWRpdG9yLnZhbHVlQ2hhbmdlZEtleVVwVGltZXIpO1xyXG5cclxuXHRcdC8vIFRyaWdnZXIgdGhlIGV2ZW50IDEuNXMgYWZ0ZXIgdGhlIGxhc3Qga2V5cHJlc3MgaWYgc3BhY2VcclxuXHRcdC8vIGlzbid0IHByZXNzZWQuIFRoaXMgbWlnaHQgbmVlZCB0byBiZSBsb3dlcmVkLCB3aWxsIG5lZWRcclxuXHRcdC8vIHRvIGxvb2sgaW50byB3aGF0IHRoZSBzbG93ZXN0IGF2ZXJhZ2UgQ2hhcnMgUGVyIE1pbiBpcy5cclxuXHRcdHRoaXNFZGl0b3IudmFsdWVDaGFuZ2VkS2V5VXBUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRpZiAoIXRoaXNFZGl0b3IuaXNDb21wb3NpbmcpIHtcclxuXHRcdFx0XHR0aGlzRWRpdG9yLnRyaWdnZXJWYWx1ZUNoYW5nZWQoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMTUwMCk7XHJcblx0fTtcclxuXHJcblx0cHJpdmF0ZSBoYW5kbGVDb21wb3NpdGlvbiA9IChlOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdHRoaXMuaXNDb21wb3NpbmcgPSAvc3RhcnQvaS50ZXN0KGUudHlwZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmlzQ29tcG9zaW5nKSB7XHJcblx0XHRcdHRoaXMudHJpZ2dlclZhbHVlQ2hhbmdlZCgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHByaXZhdGUgYXV0b1VwZGF0ZSA9ICgpOiB2b2lkID0+IHtcclxuXHRcdHRoaXMudXBkYXRlT3JpZ2luYWwoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBPcHRpb25zIGZvciB0aGlzIGVkaXRvciBpbnN0YW5jZVxyXG5cdCAqIEBuYW1lIGVkaXRvck9wdGlvbnNcclxuXHQgKiBAbWVtYmVyT2YgRW1sRWRpdG9yLnByb3RvdHlwZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgb3B0aW9uczogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBTYW5pdGl6ZSBIVE1MIHRvIGF2b2lkIFhTU1xyXG5cdCAqXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9IGh0bWxcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqL1xyXG5cdHByaXZhdGUgc2FuaXRpemUgPSAoaHRtbDogSFRNTEVsZW1lbnQgfCBOb2RlIHwgc3RyaW5nKTogc3RyaW5nID0+IHtcclxuXHRcdGNvbnN0IGFsbG93ZWRUYWdzID0gWydpZnJhbWUnXS5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRUYWdzKTtcclxuXHRcdGNvbnN0IGFsbG93ZWRBdHRycyA9IFsnYWxsb3dmdWxsc2NyZWVuJywgJ2ZyYW1lYm9yZGVyJywgJ3RhcmdldCddXHJcblx0XHRcdC5jb25jYXQodGhpcy5vcHRpb25zLmFsbG93ZWRBdHRyaWJ1dGVzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5kb21QdXJpZnkuc2FuaXRpemUoaHRtbCwge1xyXG5cdFx0XHRBRERfVEFHUzogYWxsb3dlZFRhZ3MsXHJcblx0XHRcdEFERF9BVFRSOiBhbGxvd2VkQXR0cnNcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0cyB0aGUgcGFzdGVkIGRhdGEsIGZpbHRlcnMgaXQgYW5kIHRoZW4gaW5zZXJ0cyBpdC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICovXHJcblx0cHJpdmF0ZSBoYW5kbGVQYXN0ZURhdGEgPSAoZGF0YTogYW55KTogdm9pZCA9PiB7XHJcblx0XHRsZXQgcGFzdGVBcmVhID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCB0aGlzLnd5c2l3eWdEb2N1bWVudCk7XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlUmF3JywgZGF0YSk7XHJcblx0XHRkb20udHJpZ2dlcih0aGlzLmVkaXRvckNvbnRhaW5lciwgJ3Bhc3RlcmF3JywgZGF0YSk7XHJcblxyXG5cdFx0aWYgKGRhdGEuaHRtbCkge1xyXG5cdFx0XHQvLyBTYW5pdGl6ZSBhZ2FpbiBpbiBjYXNlIHBsdWdpbnMgbW9kaWZpZWQgdGhlIEhUTUxcclxuXHRcdFx0cGFzdGVBcmVhLmlubmVySFRNTCA9IHRoaXMuc2FuaXRpemUoZGF0YS5odG1sKTtcclxuXHJcblx0XHRcdC8vIGZpeCBhbnkgaW52YWxpZCBuZXN0aW5nXHJcblx0XHRcdGRvbS5maXhOZXN0aW5nKHBhc3RlQXJlYSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXN0ZUFyZWEuaW5uZXJIVE1MID0gZXNjYXBlLmVudGl0aWVzKGRhdGEudGV4dCB8fCAnJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHBhc3RlOiBhbnkgPSB7XHJcblx0XHRcdHZhbDogcGFzdGVBcmVhLmlubmVySFRNTFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9Tb3VyY2UnIGluIHRoaXMuZm9ybWF0KSB7XHJcblx0XHRcdHBhc3RlLnZhbCA9IHRoaXMuZm9ybWF0XHJcblx0XHRcdFx0LmZyYWdtZW50VG9Tb3VyY2UocGFzdGUudmFsLCB0aGlzLnd5c2l3eWdEb2N1bWVudCwgdGhpcy5jdXJyZW50Tm9kZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wbHVnaW5NYW5hZ2VyLmNhbGwoJ3Bhc3RlJywgcGFzdGUpO1xyXG5cdFx0ZG9tLnRyaWdnZXIodGhpcy5lZGl0b3JDb250YWluZXIsICdwYXN0ZScsIHBhc3RlKTtcclxuXHJcblx0XHRpZiAoJ2ZyYWdtZW50VG9IdG1sJyBpbiB0aGlzLmZvcm1hdCkge1xyXG5cdFx0XHRwYXN0ZS52YWwgPSB0aGlzLmZvcm1hdFxyXG5cdFx0XHRcdC5mcmFnbWVudFRvSHRtbChwYXN0ZS52YWwsIHRoaXMuY3VycmVudE5vZGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucGx1Z2luTWFuYWdlci5jYWxsKCdwYXN0ZUh0bWwnLCBwYXN0ZSk7XHJcblxyXG5cdFx0bGV0IHBhcmVudCA9IHRoaXMucmFuZ2VIZWxwZXIuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xyXG5cdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChwYXN0ZS52YWwsIG51bGwsIHRydWUpO1xyXG5cdFx0ZG9tLm1lcmdlKHBhcmVudCk7XHJcblx0fTtcclxuXHJcblx0LypcclxuXHRwdWJsaWMgYmx1cjogKGhhbmRsZXI/OiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc/OiBib29sZWFuLCBleGNsdWRlU291cmNlPzogYm9vbGVhbikgPT4gYW55O1xyXG5cdHB1YmxpYyBzZXRXeXNpd3lnRWRpdG9yVmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG5cdHB1YmxpYyBzZXRTb3VyY2VFZGl0b3JWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcblx0cHVibGljIHVwZGF0ZU9yaWdpbmFsOiAoKSA9PiB2b2lkO1xyXG5cdHB1YmxpYyBnZXRTb3VyY2VFZGl0b3JWYWx1ZTogKGZpbHRlcj86IGJvb2xlYW4pID0+IHN0cmluZztcclxuXHRwdWJsaWMgZGltZW5zaW9uczogKHdpZHRoPzogYW55LCBoZWlnaHQ/OiBhbnksIHNhdmU/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0cHVibGljIHJlYWRPbmx5OiAocmVhZE9ubHk/OiBhbnkpID0+IGFueTtcclxuXHRwdWJsaWMgZm9jdXM6IChoYW5kbGVyPzogYW55LCBleGNsdWRlV3lzaXd5Zz86IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0cHVibGljIHZhbDogKHZhbD86IHN0cmluZywgZmlsdGVyPzogYm9vbGVhbikgPT4gYW55O1xyXG5cdHB1YmxpYyBleHBhbmRUb0NvbnRlbnQ6IChpZ25vcmVNYXhIZWlnaHQ6IGJvb2xlYW4pID0+IHZvaWQ7XHJcblx0cHVibGljIHJ0bDogKHJ0bD86IGJvb2xlYW4pID0+IGFueTtcclxuXHRwdWJsaWMgZW1vdGljb25zOiAoZW5hYmxlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0cHVibGljIHNvdXJjZU1vZGU6IChlbmFibGU/OiBib29sZWFuKSA9PiBhbnk7XHJcblx0cHVibGljIHdpZHRoOiAod2lkdGg/OiBudW1iZXIsIHNhdmVXaWR0aD86IGJvb2xlYW4pID0+IGFueTtcclxuXHRwdWJsaWMgaGVpZ2h0OiAoaGVpZ2h0PzogbnVtYmVyLCBzYXZlSGVpZ2h0PzogYm9vbGVhbikgPT4gYW55O1xyXG5cdHB1YmxpYyBjcmVhdGVEcm9wRG93bjogKG1lbnVJdGVtOiBIVE1MRWxlbWVudCwgbmFtZTogc3RyaW5nLCBjb250ZW50OiBIVE1MRWxlbWVudCkgPT4gdm9pZDtcclxuXHRwdWJsaWMgbWF4aW1pemU6IChtYXhpbWl6ZT86IGJvb2xlYW4pID0+IGFueTtcclxuXHRwdWJsaWMgZGVzdHJveTogKCkgPT4gdm9pZDtcclxuXHRwdWJsaWMgY2xvc2VEcm9wRG93bjogKGZvY3VzPzogYm9vbGVhbikgPT4gdm9pZDtcclxuXHRwdWJsaWMgd3lzaXd5Z0VkaXRvckluc2VydEh0bWw6IChodG1sOiBzdHJpbmcsIGVuZEh0bWw/OiBzdHJpbmcsIG92ZXJyaWRlQ29kZUJsb2NraW5nPzogYm9vbGVhbikgPT4gdm9pZDtcclxuXHRwdWJsaWMgd3lzaXd5Z0VkaXRvckluc2VydFRleHQ6ICh0ZXh0OiBzdHJpbmcsIGVuZFRleHQ6IHN0cmluZykgPT4gdm9pZDtcclxuXHRwdWJsaWMgaW5zZXJ0VGV4dDogKHRleHQ6IHN0cmluZywgZW5kVGV4dDogc3RyaW5nKSA9PiBhbnk7XHJcblx0cHVibGljIHNvdXJjZUVkaXRvckluc2VydFRleHQ6ICh0ZXh0OiBzdHJpbmcsIGVuZFRleHQ6IHN0cmluZykgPT4gdm9pZDtcclxuXHRwdWJsaWMgZ2V0UmFuZ2VIZWxwZXI6ICgpID0+IFJhbmdlSGVscGVyO1xyXG5cdHB1YmxpYyBzb3VyY2VFZGl0b3JDYXJldDogKHBvc2l0aW9uOiBhbnkpID0+IGFueTtcclxuXHRwdWJsaWMgaW5zZXJ0OiAoc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcsIGZpbHRlcjogYm9vbGVhbiwgY29udmVydEVtb3RpY29uczogYm9vbGVhbiwgYWxsb3dNaXhlZDogYm9vbGVhbikgPT4gYW55O1xyXG5cdHB1YmxpYyBnZXRXeXNpd3lnRWRpdG9yVmFsdWU6IChmaWx0ZXI/OiBib29sZWFuKSA9PiBzdHJpbmc7XHJcblx0cHVibGljIGdldEJvZHk6ICgpID0+IEhUTUxCb2R5RWxlbWVudDtcclxuXHRwdWJsaWMgZ2V0Q29udGVudEFyZWFDb250YWluZXI6ICgpID0+IEhUTUxFbGVtZW50O1xyXG5cdHB1YmxpYyBleGVjQ29tbWFuZDogKGNvbW1hbmQ6IHN0cmluZywgcGFyYW06IHN0cmluZyB8IGJvb2xlYW4pID0+IHZvaWQ7XHJcblx0cHVibGljIGJpbmQ6IChldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24sIGV4Y2x1ZGVXeXNpd3lnOiBib29sZWFuLCBleGNsdWRlU291cmNlOiBib29sZWFuKSA9PiBhbnk7XHJcblx0cHVibGljIHVuYmluZDogKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pID0+IGFueTtcclxuXHRwdWJsaWMga2V5RG93bjogKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbikgPT4gYW55O1xyXG5cdHB1YmxpYyBrZXlQcmVzczogKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbikgPT4gYW55O1xyXG5cdHB1YmxpYyBrZXlVcDogKGhhbmRsZXI6IEZ1bmN0aW9uLCBleGNsdWRlV3lzaXd5ZzogYm9vbGVhbiwgZXhjbHVkZVNvdXJjZTogYm9vbGVhbikgPT4gYW55O1xyXG5cdHB1YmxpYyBub2RlQ2hhbmdlZDogKGhhbmRsZXI6IEZ1bmN0aW9uKSA9PiBhbnk7XHJcblx0cHVibGljIHNlbGVjdGlvbkNoYW5nZWQ6IChoYW5kbGVyOiBGdW5jdGlvbikgPT4gYW55O1xyXG5cdHB1YmxpYyB2YWx1ZUNoYW5nZWQ6IChoYW5kbGVyOiBGdW5jdGlvbiwgZXhjbHVkZVd5c2l3eWc6IGJvb2xlYW4sIGV4Y2x1ZGVTb3VyY2U6IGJvb2xlYW4pID0+IGFueTtcclxuXHRwdWJsaWMgY3NzOiAoY3NzOiBzdHJpbmcpID0+IGFueTtcclxuXHRwdWJsaWMgcmVtb3ZlU2hvcnRjdXQ6IChzaG9ydGN1dDogc3RyaW5nKSA9PiBhbnk7XHJcblx0cHVibGljIGFkZFNob3J0Y3V0OiAoc2hvcnRjdXQ6IHN0cmluZywgY21kOiBzdHJpbmcgfCBGdW5jdGlvbikgPT4gYW55O1xyXG5cdHB1YmxpYyBjbGVhckJsb2NrRm9ybWF0dGluZzogKGJsb2NrOiBIVE1MRWxlbWVudCkgPT4gYW55O1xyXG5cdHB1YmxpYyB0cmFuc2xhdGU6ICguLi5hcmdzOiBhbnkpID0+IHN0cmluZztcclxuXHQqL1xyXG5cclxuXHQvLyBTdGF0aWNcclxuXHRwdWJsaWMgc3RhdGljIGxvY2FsZTogYW55ID0ge307XHJcblx0cHVibGljIHN0YXRpYyBmb3JtYXRzOiBhbnkgPSB7fTtcclxuXHRwdWJsaWMgc3RhdGljIGljb25zOiBhbnkgPSB7fTtcclxuXHRwdWJsaWMgc3RhdGljIGNvbW1hbmQ6IGFueSA9IHtcclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyBhIGNvbW1hbmRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fG51bGx9XHJcblx0XHQgKiBAc2luY2UgdjEuMy41XHJcblx0XHQgKi9cclxuXHRcdGdldDogKG46IGtleW9mIHR5cGVvZiBkZWZhdWx0Q29tbWFuZHMpOiBvYmplY3QgfCBudWxsID0+IHtcclxuXHRcdFx0cmV0dXJuIGRlZmF1bHRDb21tYW5kc1tuXSB8fCBudWxsO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIDxwPkFkZHMgYSBjb21tYW5kIHRvIHRoZSBlZGl0b3Igb3IgdXBkYXRlcyBhbiBleGlzdGluZ1xyXG5cdFx0ICogY29tbWFuZCBpZiBhIGNvbW1hbmQgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUgYWxyZWFkeSBleGlzdHMuPC9wPlxyXG5cdFx0ICpcclxuXHRcdCAqIDxwPk9uY2UgYSBjb21tYW5kIGlzIGFkZCBpdCBjYW4gYmUgaW5jbHVkZWQgaW4gdGhlIHRvb2xiYXIgYnlcclxuXHRcdCAqIGFkZGluZyBpdCdzIG5hbWUgdG8gdGhlIHRvb2xiYXIgb3B0aW9uIGluIHRoZSBjb25zdHJ1Y3Rvci4gSXRcclxuXHRcdCAqIGNhbiBhbHNvIGJlIGV4ZWN1dGVkIG1hbnVhbGx5IGJ5IGNhbGxpbmdcclxuXHRcdCAqIHtAbGluayBlbWxlZGl0b3IuZXhlY0NvbW1hbmR9PC9wPlxyXG5cdFx0ICpcclxuXHRcdCAqIEBleGFtcGxlXHJcblx0XHQgKiBFbWxFZGl0b3IuY29tbWFuZC5zZXQoXCJoZWxsb1wiLFxyXG5cdFx0ICoge1xyXG5cdFx0ICogICAgIGV4ZWM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdCAqICAgICAgICAgYWxlcnQoXCJIZWxsbyBXb3JsZCFcIik7XHJcblx0XHQgKiAgICAgfVxyXG5cdFx0ICogfSk7XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBjbWRcclxuXHRcdCAqIEByZXR1cm4ge3RoaXN8ZmFsc2V9IFJldHVybnMgZmFsc2UgaWYgbmFtZSBvciBjbWQgaXMgZmFsc2VcclxuXHRcdCAqIEBzaW5jZSB2MS4zLjVcclxuXHRcdCAqL1xyXG5cdFx0c2V0OiAobmFtZToga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcywgY21kOiBhbnkpOiBhbnkgfCBmYWxzZSA9PiB7XHJcblx0XHRcdGlmICghbmFtZSB8fCAhY21kKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBtZXJnZSBhbnkgZXhpc3RpbmcgY29tbWFuZCBwcm9wZXJ0aWVzXHJcblx0XHRcdGNtZCA9IHV0aWxzLmV4dGVuZChkZWZhdWx0Q29tbWFuZHNbbmFtZV0gfHwge30sIGNtZCk7XHJcblxyXG5cdFx0XHRjbWQucmVtb3ZlID0gKCkgPT4ge1xyXG5cdFx0XHRcdEVtbEVkaXRvci5jb21tYW5kLnJlbW92ZShuYW1lKTtcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGRlZmF1bHRDb21tYW5kc1tuYW1lXSA9IGNtZDtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlcyBhIGNvbW1hbmRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG5cdFx0ICogQHJldHVybiB7dGhpc31cclxuXHRcdCAqIEBzaW5jZSB2MS4zLjVcclxuXHRcdCAqL1xyXG5cdFx0cmVtb3ZlOiAobmFtZToga2V5b2YgdHlwZW9mIGRlZmF1bHRDb21tYW5kcyk6IGFueSA9PiB7XHJcblx0XHRcdGlmIChkZWZhdWx0Q29tbWFuZHNbbmFtZV0pIHtcclxuXHRcdFx0XHRkZWxldGUgZGVmYXVsdENvbW1hbmRzW25hbWVdO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblxyXG5cdH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKHRleHRhcmVhOiBhbnksIHVzZXJPcHRpb25zOiBhbnkpIHtcclxuXHRcdHRoaXMudGV4dGFyZWEgPSB0ZXh0YXJlYTtcclxuXHRcdC8vLS0+ID9cdHRoaXMudXNlck9wdGlvbnMgPSB1dGlscy5leHRlbmQodHJ1ZSwge30sICh1c2VyT3B0aW9ucy5jb21tYW5kcyB8fCBkZWZhdWx0Q29tbWFuZHMpKTtcclxuXHJcblx0XHR0aGlzLm9wdGlvbnMgPSB0aGlzLmVkaXRvck9wdGlvbnMgPSB1dGlscy5leHRlbmQodHJ1ZSwge30sIChkZWZhdWx0T3B0aW9ucyBhcyBhbnkpLCB1c2VyT3B0aW9ucyk7XHJcblx0XHR0aGlzLmNvbW1hbmRzID0gdXRpbHMuZXh0ZW5kKHRydWUsIHt9LCAodXNlck9wdGlvbnMuY29tbWFuZHMgfHwgZGVmYXVsdENvbW1hbmRzKSk7XHJcblxyXG5cdFx0Ly8gRG9uJ3QgZGVlcCBleHRlbmQgZW1vdGljb25zIChmaXhlcyAjNTY1KVxyXG5cdFx0dGhpcy5lZGl0b3JPcHRpb25zLmVtb3RpY29ucyA9IHVzZXJPcHRpb25zLmVtb3RpY29ucyB8fCAoZGVmYXVsdE9wdGlvbnMgYXMgYW55KS5lbW90aWNvbnM7XHJcblxyXG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHRoaXMub3B0aW9ucy5hbGxvd2VkSWZyYW1lVXJscykpIHtcclxuXHRcdFx0dGhpcy5vcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzID0gW107XHJcblx0XHR9XHJcblx0XHR0aGlzLm9wdGlvbnMuYWxsb3dlZElmcmFtZVVybHMucHVzaCgnaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQvJyk7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBET01QdXJpZnkgZm9yIGVhY2ggZWRpdG9yIGluc3RhbmNlIHNvIGNhblxyXG5cdFx0Ly8gaGF2ZSBkaWZmZXJlbnQgYWxsb3dlZCBpZnJhbWUgVVJMc1xyXG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5ldy1jYXBcclxuXHRcdHRoaXMuZG9tUHVyaWZ5ID0gRE9NUHVyaWZ5KCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgaWZyYW1lcyBmb3IgdGhpbmdzIGxpa2UgWW91VHViZSwgc2VlOlxyXG5cdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2N1cmU1My9ET01QdXJpZnkvaXNzdWVzLzM0MCNpc3N1ZWNvbW1lbnQtNjcwNzU4OTgwXHJcblx0XHR0aGlzLmRvbVB1cmlmeS5hZGRIb29rKCd1cG9uU2FuaXRpemVFbGVtZW50JywgKG5vZGU6IEhUTUxFbGVtZW50LCBkYXRhOiBhbnkpID0+IHtcclxuXHRcdFx0bGV0IGFsbG93ZWRVcmxzID0gdGhpcy5vcHRpb25zLmFsbG93ZWRJZnJhbWVVcmxzO1xyXG5cclxuXHRcdFx0aWYgKGRhdGEudGFnTmFtZSA9PT0gJ2lmcmFtZScpIHtcclxuXHRcdFx0XHRsZXQgc3JjID0gZG9tLmF0dHIobm9kZSwgJ3NyYycpIHx8ICcnO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFsbG93ZWRVcmxzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRsZXQgdXJsID0gYWxsb3dlZFVybHNbaV07XHJcblxyXG5cdFx0XHRcdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHVybCkgJiYgc3JjLnN1YnN0cigwLCB1cmwubGVuZ3RoKSA9PT0gdXJsKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgcmVnZXhcclxuXHRcdFx0XHRcdGlmICh1cmwudGVzdCAmJiB1cmwudGVzdChzcmMpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIE5vIG1hdGNoIHNvIHJlbW92ZVxyXG5cdFx0XHRcdGRvbS5yZW1vdmUobm9kZSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENvbnZlcnQgdGFyZ2V0IGF0dHJpYnV0ZSBpbnRvIGRhdGEtZW1sLXRhcmdldCBhdHRyaWJ1dGVzIHNvIFhIVE1MIGZvcm1hdFxyXG5cdFx0Ly8gY2FuIGFsbG93IHRoZW1cclxuXHRcdHRoaXMuZG9tUHVyaWZ5LmFkZEhvb2soJ2FmdGVyU2FuaXRpemVBdHRyaWJ1dGVzJywgKG5vZGU6IEhUTUxFbGVtZW50KSA9PiB7XHJcblx0XHRcdGlmICgndGFyZ2V0JyBpbiBub2RlKSB7XHJcblx0XHRcdFx0ZG9tLmF0dHIobm9kZSwgJ2RhdGEtZW1sLXRhcmdldCcsIGRvbS5hdHRyKG5vZGUsICd0YXJnZXQnKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRvbS5yZW1vdmVBdHRyKG5vZGUsICd0YXJnZXQnKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIHJ1biB0aGUgaW5pdGlhbGl6ZXJcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUGx1Z2luTWFuYWdlciB7XHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcih0aGlzT2JqOiBhbnkpIHtcclxuXHJcblx0XHRQbHVnaW5NYW5hZ2VyLnBsdWdpbnMgPSB7fTtcclxuXHRcdC8qKlxyXG5cdFx0ICogQXJyYXkgb2YgYWxsIGN1cnJlbnRseSByZWdpc3RlcmVkIHBsdWdpbnNcclxuXHRcdCAqXHJcblx0XHQgKiBAdHlwZSB7QXJyYXl9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgcmVnaXN0ZXJlZFBsdWdpbnM6IGFueVtdID0gW107XHJcblxyXG5cclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoYW5nZXMgYSBzaWduYWxzIG5hbWUgZnJvbSBcIm5hbWVcIiBpbnRvIFwic2lnbmFsTmFtZVwiLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gc2lnbmFsXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgZm9ybWF0U2lnbmFsTmFtZSA9IGZ1bmN0aW9uIChzaWduYWw6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRcdHJldHVybiAnc2lnbmFsJyArIHNpZ25hbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHNpZ25hbC5zbGljZSgxKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDYWxscyBoYW5kbGVycyBmb3IgYSBzaWduYWxcclxuXHRcdCAqXHJcblx0XHQgKiBAc2VlIGNhbGwoKVxyXG5cdFx0ICogQHNlZSBjYWxsT25seUZpcnN0KClcclxuXHRcdCAqIEBwYXJhbSAge0FycmF5fSAgIGFyZ3NcclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IHJldHVybkF0Rmlyc3RcclxuXHRcdCAqIEByZXR1cm4geyp9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHR2YXIgY2FsbEhhbmRsZXJzID0gZnVuY3Rpb24gKGFyZ3M6IElBcmd1bWVudHMsIHJldHVybkF0Rmlyc3Q6IGJvb2xlYW4pOiBhbnkge1xyXG5cdFx0XHRhcmdzID0gW10uc2xpY2UuY2FsbChhcmdzKTtcclxuXHJcblx0XHRcdHZhciBpZHgsIHJldCwgc2lnbmFsID0gZm9ybWF0U2lnbmFsTmFtZShBcnJheS5mcm9tKGFyZ3MpLnNoaWZ0KCkpO1xyXG5cclxuXHRcdFx0Zm9yIChpZHggPSAwOyBpZHggPCByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7IGlkeCsrKSB7XHJcblx0XHRcdFx0aWYgKHNpZ25hbCBpbiByZWdpc3RlcmVkUGx1Z2luc1tpZHhdKSB7XHJcblx0XHRcdFx0XHRyZXQgPSByZWdpc3RlcmVkUGx1Z2luc1tpZHhdW3NpZ25hbF0uYXBwbHkodGhpc09iaiwgYXJncyk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHJldHVybkF0Rmlyc3QpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHJldDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDYWxscyBhbGwgaGFuZGxlcnMgZm9yIHRoZSBwYXNzZWQgc2lnbmFsXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcclxuXHRcdCAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJnc1xyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjYWxsXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jYWxsID0gZnVuY3Rpb24gKC4uLmFyZ3M6IGFueSk6IHZvaWQge1xyXG5cdFx0XHRjYWxsSGFuZGxlcnMoYXJncywgZmFsc2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENhbGxzIHRoZSBmaXJzdCBoYW5kbGVyIGZvciBhIHNpZ25hbCwgYW5kIHJldHVybnMgdGhlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBzaWduYWxcclxuXHRcdCAqIEBwYXJhbSAgey4uLnN0cmluZ30gYXJnc1xyXG5cdFx0ICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBoYW5kbGVyXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNhbGxPbmx5Rmlyc3RcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNhbGxPbmx5Rmlyc3QgPSBmdW5jdGlvbiAoKTogYW55IHtcclxuXHRcdFx0cmV0dXJuIGNhbGxIYW5kbGVycyhhcmd1bWVudHMsIHRydWUpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENoZWNrcyBpZiBhIHNpZ25hbCBoYXMgYSBoYW5kbGVyXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBzaWduYWxcclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGhhc0hhbmRsZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmhhc0hhbmRsZXIgPSBmdW5jdGlvbiAoc2lnbmFsOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0dmFyIGkgPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGg7XHJcblx0XHRcdHNpZ25hbCA9IGZvcm1hdFNpZ25hbE5hbWUoc2lnbmFsKTtcclxuXHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAoc2lnbmFsIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGVja3MgaWYgdGhlIHBsdWdpbiBleGlzdHMgaW4gcGx1Z2luc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBleGlzdHNcclxuXHRcdCAqIEBtZW1iZXJPZiBQbHVnaW5NYW5hZ2VyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmV4aXN0cyA9IGZ1bmN0aW9uIChwbHVnaW46IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAocGx1Z2luIGluIFBsdWdpbk1hbmFnZXIucGx1Z2lucykge1xyXG5cdFx0XHRcdGxldCBwbHVnaW5PYmo6IHt9ID0gUGx1Z2luTWFuYWdlci5wbHVnaW5zW3BsdWdpbiBhcyBrZXlvZiB0eXBlb2YgUGx1Z2luTWFuYWdlci5wbHVnaW5zXTtcclxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHBsdWdpbk9iaiA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcGx1Z2luT2JqLnByb3RvdHlwZSA9PT0gJ29iamVjdCc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBDaGVja3MgaWYgdGhlIHBhc3NlZCBwbHVnaW4gaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7c3RyaW5nfSBwbHVnaW5cclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGlzUmVnaXN0ZXJlZFxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaXNSZWdpc3RlcmVkID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdGlmICh0aGlzLmV4aXN0cyhwbHVnaW4pKSB7XHJcblx0XHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0d2hpbGUgKGlkeC0tKSB7XHJcblx0XHRcdFx0XHRpZiAocmVnaXN0ZXJlZFBsdWdpbnNbaWR4XSBpbnN0YW5jZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc1twbHVnaW4gYXMga2V5b2YgdHlwZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc10pIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVnaXN0ZXJzIGEgcGx1Z2luIHRvIHJlY2VpdmUgc2lnbmFsc1xyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZWdpc3RlclxyXG5cdFx0ICogQG1lbWJlck9mIFBsdWdpbk1hbmFnZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMucmVnaXN0ZXIgPSBmdW5jdGlvbiAocGx1Z2luOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdFx0aWYgKCF0aGlzLmV4aXN0cyhwbHVnaW4pIHx8IHRoaXMuaXNSZWdpc3RlcmVkKHBsdWdpbikpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBwbHVnaW5PYmogPSBuZXcgdGhpcy5wbHVnaW5zW3BsdWdpbl0oKTtcclxuXHRcdFx0cmVnaXN0ZXJlZFBsdWdpbnMucHVzaChwbHVnaW4pO1xyXG5cclxuXHRcdFx0aWYgKCdpbml0JyBpbiB0aGlzLnBsdWdpbikge1xyXG5cdFx0XHRcdHBsdWdpbk9iai5pbml0LmNhbGwodGhpc09iaik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIERlcmVnaXN0ZXJzIGEgcGx1Z2luLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge3N0cmluZ30gcGx1Z2luXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBkZXJlZ2lzdGVyXHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5kZXJlZ2lzdGVyID0gZnVuY3Rpb24gKHBsdWdpbjogc3RyaW5nKTogYm9vbGVhbiB7XHJcblx0XHRcdHZhciByZW1vdmVkUGx1Z2luLCBwbHVnaW5JZHggPSByZWdpc3RlcmVkUGx1Z2lucy5sZW5ndGgsIHJlbW92ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRcdGlmICghdGhpcy5pc1JlZ2lzdGVyZWQocGx1Z2luKSkge1xyXG5cdFx0XHRcdHJldHVybiByZW1vdmVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3aGlsZSAocGx1Z2luSWR4LS0pIHtcclxuXHRcdFx0XHRpZiAocmVnaXN0ZXJlZFBsdWdpbnNbcGx1Z2luSWR4XSBpbnN0YW5jZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc1twbHVnaW4gYXMga2V5b2YgdHlwZW9mIFBsdWdpbk1hbmFnZXIucGx1Z2luc10pIHtcclxuXHRcdFx0XHRcdHJlbW92ZWRQbHVnaW4gPSByZWdpc3RlcmVkUGx1Z2lucy5zcGxpY2UocGx1Z2luSWR4LCAxKVswXTtcclxuXHRcdFx0XHRcdHJlbW92ZWQgPSB0cnVlO1xyXG5cclxuXHRcdFx0XHRcdGlmICgnZGVzdHJveScgaW4gcmVtb3ZlZFBsdWdpbikge1xyXG5cdFx0XHRcdFx0XHRyZW1vdmVkUGx1Z2luLmRlc3Ryb3kuY2FsbCh0aGlzT2JqKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByZW1vdmVkO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIENsZWFycyBhbGwgcGx1Z2lucyBhbmQgcmVtb3ZlcyB0aGUgb3duZXIgcmVmZXJlbmNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIENhbGxpbmcgYW55IGZ1bmN0aW9ucyBvbiB0aGlzIG9iamVjdCBhZnRlciBjYWxsaW5nXHJcblx0XHQgKiBkZXN0cm95IHdpbGwgY2F1c2UgYSBKUyBlcnJvci5cclxuXHRcdCAqXHJcblx0XHQgKiBAbmFtZSBkZXN0cm95XHJcblx0XHQgKiBAbWVtYmVyT2YgUGx1Z2luTWFuYWdlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgaSA9IHJlZ2lzdGVyZWRQbHVnaW5zLmxlbmd0aDtcclxuXHJcblx0XHRcdHdoaWxlIChpLS0pIHtcclxuXHRcdFx0XHRpZiAoJ2Rlc3Ryb3knIGluIHJlZ2lzdGVyZWRQbHVnaW5zW2ldKSB7XHJcblx0XHRcdFx0XHRyZWdpc3RlcmVkUGx1Z2luc1tpXS5kZXN0cm95LmNhbGwodGhpc09iaik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZWdpc3RlcmVkUGx1Z2lucyA9IFtdO1xyXG5cdFx0XHR0aGlzT2JqID0gbnVsbDtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGx1Z2luczoge307XHJcblx0Y2FsbDogKC4uLmFyZzogYW55KSA9PiB2b2lkO1xyXG5cdGNhbGxPbmx5Rmlyc3Q6ICgpID0+IGFueTtcclxuXHRoYXNIYW5kbGVyOiAoc2lnbmFsOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0ZXhpc3RzOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0aXNSZWdpc3RlcmVkOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0cmVnaXN0ZXI6IChwbHVnaW46IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRkZXJlZ2lzdGVyOiAocGx1Z2luOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblx0ZGVzdHJveTogKCkgPT4gdm9pZDtcclxufVxyXG5cclxuIiwiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMgKi9cclxuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHRleHQsIHN0YXJ0L2VuZCBub2RlIGFuZCBvZmZzZXQgZm9yXHJcbiAqIGxlbmd0aCBjaGFycyBsZWZ0IG9yIHJpZ2h0IG9mIHRoZSBwYXNzZWQgbm9kZVxyXG4gKiBhdCB0aGUgc3BlY2lmaWVkIG9mZnNldC5cclxuICpcclxuICogQHBhcmFtICB7Tm9kZX0gIG5vZGVcclxuICogQHBhcmFtICB7bnVtYmVyfSAgb2Zmc2V0XHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGlzTGVmdFxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9ICBsZW5ndGhcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmFyIG91dGVyVGV4dCA9IGZ1bmN0aW9uIChyYW5nZTogYW55LCBpc0xlZnQ6IGJvb2xlYW4sIGxlbmd0aDogbnVtYmVyKTogYW55IHtcclxuXHR2YXIgbm9kZVZhbHVlLCByZW1haW5pbmcsIHN0YXJ0LCBlbmQsIG5vZGUsXHJcblx0XHR0ZXh0ID0gJycsXHJcblx0XHRuZXh0ID0gcmFuZ2Uuc3RhcnRDb250YWluZXIsXHJcblx0XHRvZmZzZXQgPSByYW5nZS5zdGFydE9mZnNldDtcclxuXHJcblx0Ly8gSGFuZGxlIGNhc2VzIHdoZXJlIG5vZGUgaXMgYSBwYXJhZ3JhcGggYW5kIG9mZnNldFxyXG5cdC8vIHJlZmVycyB0byB0aGUgaW5kZXggb2YgYSB0ZXh0IG5vZGUuXHJcblx0Ly8gMyA9IHRleHQgbm9kZVxyXG5cdGlmIChuZXh0ICYmIG5leHQubm9kZVR5cGUgIT09IDMpIHtcclxuXHRcdG5leHQgPSBuZXh0LmNoaWxkTm9kZXNbb2Zmc2V0XTtcclxuXHRcdG9mZnNldCA9IDA7XHJcblx0fVxyXG5cclxuXHRzdGFydCA9IGVuZCA9IG9mZnNldDtcclxuXHJcblx0d2hpbGUgKGxlbmd0aCA+IHRleHQubGVuZ3RoICYmIG5leHQgJiYgbmV4dC5ub2RlVHlwZSA9PT0gMykge1xyXG5cdFx0bm9kZVZhbHVlID0gbmV4dC5ub2RlVmFsdWU7XHJcblx0XHRyZW1haW5pbmcgPSBsZW5ndGggLSB0ZXh0Lmxlbmd0aDtcclxuXHJcblx0XHQvLyBJZiBub3QgdGhlIGZpcnN0IG5vZGUsIHN0YXJ0IGFuZCBlbmQgc2hvdWxkIGJlIGF0IHRoZWlyXHJcblx0XHQvLyBtYXggdmFsdWVzIGFzIHdpbGwgYmUgdXBkYXRlZCB3aGVuIGdldHRpbmcgdGhlIHRleHRcclxuXHRcdGlmIChub2RlKSB7XHJcblx0XHRcdGVuZCA9IG5vZGVWYWx1ZS5sZW5ndGg7XHJcblx0XHRcdHN0YXJ0ID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlID0gbmV4dDtcclxuXHJcblx0XHRpZiAoaXNMZWZ0KSB7XHJcblx0XHRcdHN0YXJ0ID0gTWF0aC5tYXgoZW5kIC0gcmVtYWluaW5nLCAwKTtcclxuXHRcdFx0b2Zmc2V0ID0gc3RhcnQ7XHJcblxyXG5cdFx0XHR0ZXh0ID0gbm9kZVZhbHVlLnN1YnN0cihzdGFydCwgZW5kIC0gc3RhcnQpICsgdGV4dDtcclxuXHRcdFx0bmV4dCA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZW5kID0gTWF0aC5taW4ocmVtYWluaW5nLCBub2RlVmFsdWUubGVuZ3RoKTtcclxuXHRcdFx0b2Zmc2V0ID0gc3RhcnQgKyBlbmQ7XHJcblxyXG5cdFx0XHR0ZXh0ICs9IG5vZGVWYWx1ZS5zdWJzdHIoc3RhcnQsIGVuZCk7XHJcblx0XHRcdG5leHQgPSBub2RlLm5leHRTaWJsaW5nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdG5vZGU6IG5vZGUgfHwgbmV4dCxcclxuXHRcdG9mZnNldDogb2Zmc2V0LFxyXG5cdFx0dGV4dDogdGV4dFxyXG5cdH07XHJcbn07XHJcblxyXG4vKipcclxuICogUmFuZ2UgaGVscGVyXHJcbiAqXHJcbiAqIEBjbGFzcyBSYW5nZUhlbHBlclxyXG4gKiBAbmFtZSBSYW5nZUhlbHBlclxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJhbmdlSGVscGVyIHtcclxuXHJcblx0aW5zZXJ0SFRNTDogKGh0bWw6IHN0cmluZywgZW5kSFRNTD86IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHRpbnNlcnROb2RlOiAobm9kZT86IGFueSwgZW5kTm9kZT86IGFueSkgPT4gZmFsc2UgfCB1bmRlZmluZWQ7XHJcblx0Y2xvbmVTZWxlY3RlZDogKCkgPT4gUmFuZ2U7XHJcblx0c2VsZWN0ZWRSYW5nZTogKCkgPT4gUmFuZ2U7XHJcblx0aGFzU2VsZWN0aW9uOiAoKSA9PiBib29sZWFuO1xyXG5cdHNlbGVjdGVkSHRtbDogKCkgPT4gc3RyaW5nO1xyXG5cdHBhcmVudE5vZGU6ICgpID0+IEhUTUxFbGVtZW50O1xyXG5cdGdldEZpcnN0QmxvY2tQYXJlbnQ6IChub2RlPzogYW55KSA9PiBhbnk7XHJcblx0aW5zZXJ0Tm9kZUF0OiAoc3RhcnQ6IGFueSwgbm9kZTogYW55KSA9PiBib29sZWFuO1xyXG5cdGluc2VydE1hcmtlcnM6ICgpID0+IHZvaWQ7XHJcblx0Z2V0TWFya2VyOiAoaWQ6IGFueSkgPT4gYW55O1xyXG5cdHJlbW92ZU1hcmtlcjogKGlkOiBhbnkpID0+IHZvaWQ7XHJcblx0cmVtb3ZlTWFya2VyczogKCkgPT4gdm9pZDtcclxuXHRzYXZlUmFuZ2U6ICgpID0+IHZvaWQ7XHJcblx0c2VsZWN0UmFuZ2U6IChyYW5nZTogYW55KSA9PiB2b2lkO1xyXG5cdHJlc3RvcmVSYW5nZTogKCkgPT4gYm9vbGVhbjtcclxuXHRzZWxlY3RPdXRlclRleHQ6IChsZWZ0OiBhbnksIHJpZ2h0OiBhbnkpID0+IGJvb2xlYW47XHJcblx0Z2V0T3V0ZXJUZXh0OiAoYmVmb3JlOiBhbnksIGxlbmd0aDogYW55KSA9PiBhbnk7XHJcblx0cmVwbGFjZUtleXdvcmQ6IChrZXl3b3JkczogYW55LCBpbmNsdWRlQWZ0ZXI6IGFueSwga2V5d29yZHNTb3J0ZWQ6IGFueSwgbG9uZ2VzdEtleXdvcmQ6IGFueSwgcmVxdWlyZVdoaXRlc3BhY2U6IGFueSwga2V5cHJlc3NDaGFyOiBhbnkpID0+IGJvb2xlYW47XHJcblx0Y29tcGFyZTogKHJuZ0E/OiBhbnksIHJuZ0I/OiBhbnkpID0+IGJvb2xlYW47XHJcblx0Y2xlYXI6ICgpID0+IHZvaWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHdpbjogYW55LCBkOiBudWxsLCBzYW5pdGl6ZTogeyAoaHRtbDogc3RyaW5nKTogc3RyaW5nOyAoYXJnMDogYW55KTogc3RyaW5nOyB9KSB7XHJcblx0XHRsZXQgX2NyZWF0ZU1hcmtlcjogYW55O1xyXG5cdFx0bGV0IF9wcmVwYXJlSW5wdXQ6IGFueTtcclxuXHRcdGxldCBkb2M6IGFueSA9IGQgfHwgd2luLmNvbnRlbnREb2N1bWVudCB8fCB3aW4uZG9jdW1lbnQ7XHJcblx0XHRsZXQgc3RhcnRNYXJrZXI6IHN0cmluZyA9ICdlbWxlZGl0b3Itc3RhcnQtbWFya2VyJztcclxuXHRcdGxldCBlbmRNYXJrZXI6IHN0cmluZyA9ICdlbWxlZGl0b3ItZW5kLW1hcmtlcic7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIEhUTUwgaW50byB0aGUgY3VycmVudCByYW5nZSByZXBsYWNpbmcgYW55IHNlbGVjdGVkXHJcblx0XHQgKiB0ZXh0LlxyXG5cdFx0ICpcclxuXHRcdCAqIElmIGVuZEhUTUwgaXMgc3BlY2lmaWVkIHRoZSBzZWxlY3RlZCBjb250ZW50cyB3aWxsIGJlIHB1dCBiZXR3ZWVuXHJcblx0XHQgKiBodG1sIGFuZCBlbmRIVE1MLiBJZiB0aGVyZSBpcyBub3RoaW5nIHNlbGVjdGVkIGh0bWwgYW5kIGVuZEhUTUwgYXJlXHJcblx0XHQgKiBqdXN0IGNvbmNhdGVuYXRlIHRvZ2V0aGVyLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXHJcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gW2VuZEhUTUxdXHJcblx0XHQgKiBAcmV0dXJuIEZhbHNlIG9uIGZhaWxcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgaW5zZXJ0SFRNTFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmluc2VydEhUTUwgPSBmdW5jdGlvbiAoaHRtbDogc3RyaW5nLCBlbmRIVE1MPzogc3RyaW5nKSB7XHJcblx0XHRcdHZhciBub2RlLCBkaXYsIHJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZW5kSFRNTCkge1xyXG5cdFx0XHRcdGh0bWwgKz0gdGhpcy5zZWxlY3RlZEh0bWwoKSArIGVuZEhUTUw7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KCdwJywge30sIGRvYyk7XHJcblx0XHRcdG5vZGUgPSBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gc2FuaXRpemUoaHRtbCk7XHJcblxyXG5cdFx0XHR3aGlsZSAoZGl2LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobm9kZSwgZGl2LmZpcnN0Q2hpbGQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmluc2VydE5vZGUobm9kZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0KiBSZW1vdmVzIHRoZSBzdGFydC9lbmQgbWFya2Vyc1xyXG5cdFx0KlxyXG5cdFx0KiBAZnVuY3Rpb25cclxuXHRcdCogQG5hbWUgcmVtb3ZlTWFya2Vyc1xyXG5cdFx0KiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQqL1xyXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcihzdGFydE1hcmtlcik7XHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VyKGVuZE1hcmtlcik7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHNhbWUgYXMgaW5zZXJ0SFRNTCBleGNlcHQgd2l0aCBET00gbm9kZXMgaW5zdGVhZFxyXG5cdFx0ICpcclxuXHRcdCAqIDxzdHJvbmc+V2FybmluZzo8L3N0cm9uZz4gdGhlIG5vZGVzIG11c3QgYmVsb25nIHRvIHRoZVxyXG5cdFx0ICogZG9jdW1lbnQgdGhleSBhcmUgYmVpbmcgaW5zZXJ0ZWQgaW50by4gU29tZSBicm93c2Vyc1xyXG5cdFx0ICogd2lsbCB0aHJvdyBleGNlcHRpb25zIGlmIHRoZXkgZG9uJ3QuXHJcblx0XHQgKlxyXG5cdFx0ICogUmV0dXJucyBib29sZWFuIGZhbHNlIG9uIGZhaWxcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuXHRcdCAqIEBwYXJhbSB7Tm9kZX0gZW5kTm9kZVxyXG5cdFx0ICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBpbnNlcnROb2RlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW5zZXJ0Tm9kZSA9IGZ1bmN0aW9uIChub2RlPzogTm9kZSwgZW5kTm9kZT86IE5vZGUpOiBmYWxzZSB8IHVuZGVmaW5lZCB7XHJcblx0XHRcdGxldCBmaXJzdCwgbGFzdCwgaW5wdXQgPSBfcHJlcGFyZUlucHV0KG5vZGUsIGVuZE5vZGUpLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBwYXJlbnQgPSByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0bGV0IGVtcHR5Tm9kZXM6IGFueSA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKCFpbnB1dCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gcmVtb3ZlSWZFbXB0eShub2RlOiBhbnkpIHtcclxuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBlbXB0eSBub2RlIGlmIGl0IHdhc24ndCBhbHJlYWR5IGVtcHR5XHJcblx0XHRcdFx0aWYgKG5vZGUgJiYgZG9tLmlzRW1wdHkobm9kZSkgJiYgZW1wdHlOb2Rlcy5pbmRleE9mKG5vZGUpIDwgMCkge1xyXG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChyYW5nZS5zdGFydENvbnRhaW5lciAhPT0gcmFuZ2UuZW5kQ29udGFpbmVyKSB7XHJcblx0XHRcdFx0dXRpbHMuZWFjaChwYXJlbnQuY2hpbGROb2RlcywgZnVuY3Rpb24gKF8sIG5vZGUpIHtcclxuXHRcdFx0XHRcdGlmIChkb20uaXNFbXB0eShub2RlKSkge1xyXG5cdFx0XHRcdFx0XHRlbXB0eU5vZGVzLnB1c2gobm9kZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGZpcnN0ID0gaW5wdXQuZmlyc3RDaGlsZDtcclxuXHRcdFx0XHRsYXN0ID0gaW5wdXQubGFzdENoaWxkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5kZWxldGVDb250ZW50cygpO1xyXG5cclxuXHRcdFx0Ly8gRkYgYWxsb3dzIDxiciAvPiB0byBiZSBzZWxlY3RlZCBidXQgaW5zZXJ0aW5nIGEgbm9kZVxyXG5cdFx0XHQvLyBpbnRvIDxiciAvPiB3aWxsIGNhdXNlIGl0IG5vdCB0byBiZSBkaXNwbGF5ZWQgc28gbXVzdFxyXG5cdFx0XHQvLyBpbnNlcnQgYmVmb3JlIHRoZSA8YnIgLz4gaW4gRkYuXHJcblx0XHRcdC8vIDMgPSBUZXh0Tm9kZVxyXG5cdFx0XHRpZiAocGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMyAmJiAhZG9tLmNhbkhhdmVDaGlsZHJlbihwYXJlbnQpKSB7XHJcblx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShpbnB1dCwgcGFyZW50KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyYW5nZS5pbnNlcnROb2RlKGlucHV0KTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgYSBub2RlIHdhcyBzcGxpdCBvciBpdHMgY29udGVudHMgZGVsZXRlZCwgcmVtb3ZlIGFueSByZXN1bHRpbmdcclxuXHRcdFx0XHQvLyBlbXB0eSB0YWdzLiBGb3IgZXhhbXBsZTpcclxuXHRcdFx0XHQvLyA8cD58dGVzdDwvcD48ZGl2PnRlc3R8PC9kaXY+XHJcblx0XHRcdFx0Ly8gV2hlbiBkZWxldGVDb250ZW50cyBjb3VsZCBiZWNvbWU6XHJcblx0XHRcdFx0Ly8gPHA+PC9wPnw8ZGl2PjwvZGl2PlxyXG5cdFx0XHRcdC8vIFNvIHJlbW92ZSB0aGUgZW1wdHkgb25lc1xyXG5cdFx0XHRcdHJlbW92ZUlmRW1wdHkoZmlyc3QgJiYgZmlyc3QucHJldmlvdXNTaWJsaW5nKTtcclxuXHRcdFx0XHRyZW1vdmVJZkVtcHR5KGxhc3QgJiYgbGFzdC5uZXh0U2libGluZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucmVzdG9yZVJhbmdlKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ2xvbmVzIHRoZSBzZWxlY3RlZCBSYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge1JhbmdlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjbG9uZVNlbGVjdGVkXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2xvbmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpOiBSYW5nZSB7XHJcblx0XHRcdHZhciByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKHJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJhbmdlLmNsb25lUmFuZ2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHNlbGVjdGVkIFJhbmdlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7UmFuZ2V9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdGVkUmFuZ2VcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zZWxlY3RlZFJhbmdlID0gZnVuY3Rpb24gKCk6IFJhbmdlIHtcclxuXHRcdFx0dmFyIHJhbmdlLCBmaXJzdENoaWxkLCBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAoIXNlbCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gV2hlbiBjcmVhdGluZyBhIG5ldyByYW5nZSwgc2V0IHRoZSBzdGFydCB0byB0aGUgZmlyc3QgY2hpbGRcclxuXHRcdFx0Ly8gZWxlbWVudCBvZiB0aGUgYm9keSBlbGVtZW50IHRvIGF2b2lkIGVycm9ycyBpbiBGRi5cclxuXHRcdFx0aWYgKHNlbC5yYW5nZUNvdW50IDw9IDApIHtcclxuXHRcdFx0XHRmaXJzdENoaWxkID0gZG9jLmJvZHk7XHJcblx0XHRcdFx0d2hpbGUgKGZpcnN0Q2hpbGQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0Zmlyc3RDaGlsZCA9IGZpcnN0Q2hpbGQuZmlyc3RDaGlsZDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdFx0Ly8gTXVzdCBiZSBzZXRTdGFydEJlZm9yZSBvdGhlcndpc2UgaXQgY2FuIGNhdXNlIGluZmluaXRlXHJcblx0XHRcdFx0Ly8gbG9vcHMgd2l0aCBsaXN0cyBpbiBXZWJLaXQuIFNlZSBpc3N1ZSA0NDJcclxuXHRcdFx0XHRyYW5nZS5zZXRTdGFydEJlZm9yZShmaXJzdENoaWxkKTtcclxuXHJcblx0XHRcdFx0c2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbC5yYW5nZUNvdW50ID4gMCkge1xyXG5cdFx0XHRcdHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiByYW5nZTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHNlbGVjdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGhhc1NlbGVjdGlvblxyXG5cdFx0ICogQHNpbmNlIDEuNC40XHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaGFzU2VsZWN0aW9uID0gZnVuY3Rpb24gKCk6IGJvb2xlYW4ge1xyXG5cdFx0XHR2YXIgc2VsID0gd2luLmdldFNlbGVjdGlvbigpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHNlbCAmJiBzZWwucmFuZ2VDb3VudCA+IDA7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogR2V0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIEhUTUxcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdGVkSHRtbFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdGVkSHRtbCA9IGZ1bmN0aW9uICgpOiBzdHJpbmcge1xyXG5cdFx0XHR2YXIgZGl2LCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpO1xyXG5cclxuXHRcdFx0aWYgKHJhbmdlKSB7XHJcblx0XHRcdFx0ZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3AnLCB7fSwgZG9jKTtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZGl2LCByYW5nZS5jbG9uZUNvbnRlbnRzKCkpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHBhcmVudCBub2RlIG9mIHRoZSBzZWxlY3RlZCBjb250ZW50cyBpbiB0aGUgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgcGFyZW50Tm9kZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnBhcmVudE5vZGUgPSBmdW5jdGlvbiAoKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLnNlbGVjdGVkUmFuZ2UoKTtcclxuXHJcblx0XHRcdGlmIChyYW5nZSkge1xyXG5cdFx0XHRcdHJldHVybiByYW5nZS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcclxuXHRcdCAqIGNvbnRlbnRzIG9mIHRoZSByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBvZiB0aGUgc2VsZWN0ZWRcclxuXHRcdCAqIGNvbnRlbnRzIG9mIHRoZSByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge05vZGV9IFtuXSBUaGUgZWxlbWVudCB0byBnZXQgdGhlIGZpcnN0IGJsb2NrIGxldmVsIHBhcmVudCBmcm9tXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgZ2V0Rmlyc3RCbG9ja1BhcmVudF4yXHJcblx0XHQgKiBAc2luY2UgMS40LjFcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRGaXJzdEJsb2NrUGFyZW50ID0gZnVuY3Rpb24gKG5vZGU/OiBhbnkpOiBIVE1MRWxlbWVudCB7XHJcblx0XHRcdHZhciBmdW5jID0gZnVuY3Rpb24gKGVsbTogYW55KTogYW55IHtcclxuXHRcdFx0XHRpZiAoIWRvbS5pc0lubGluZShlbG0sIHRydWUpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZWxtO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWxtID0gZWxtID8gZWxtLnBhcmVudE5vZGUgOiBudWxsO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZWxtID8gZnVuYyhlbG0pIDogZWxtO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmMobm9kZSB8fCB0aGlzLnBhcmVudE5vZGUoKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5zZXJ0cyBhIG5vZGUgYXQgZWl0aGVyIHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtCb29sfSBzdGFydFxyXG5cdFx0ICogQHBhcmFtIHtOb2RlfSBub2RlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydE5vZGVBdFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmluc2VydE5vZGVBdCA9IGZ1bmN0aW9uIChzdGFydDogYm9vbGVhbiwgbm9kZTogTm9kZSkge1xyXG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCksIHJhbmdlID0gdGhpcy5jbG9uZVNlbGVjdGVkKCk7XHJcblxyXG5cdFx0XHRpZiAoIXJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyYW5nZS5jb2xsYXBzZShzdGFydCk7XHJcblx0XHRcdHJhbmdlLmluc2VydE5vZGUobm9kZSk7XHJcblxyXG5cdFx0XHQvLyBSZXNlbGVjdCB0aGUgY3VycmVudCByYW5nZS5cclxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBDaHJvbWUgbG9zaW5nIHRoZSBzZWxlY3Rpb24uIElzc3VlIzgyXHJcblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UoY3VycmVudFJhbmdlKTtcclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbnNlcnRzIHN0YXJ0L2VuZCBtYXJrZXJzIGZvciB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqIHdoaWNoIGNhbiBiZSB1c2VkIGJ5IHJlc3RvcmVSYW5nZSB0byByZS1zZWxlY3QgdGhlXHJcblx0XHQgKiByYW5nZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGluc2VydE1hcmtlcnNcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5pbnNlcnRNYXJrZXJzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgY3VycmVudFJhbmdlID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRcdHZhciBzdGFydE5vZGUgPSBfY3JlYXRlTWFya2VyKHN0YXJ0TWFya2VyKTtcclxuXHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xyXG5cdFx0XHR0aGlzLmluc2VydE5vZGVBdCh0cnVlLCBzdGFydE5vZGUpO1xyXG5cclxuXHRcdFx0Ly8gRml4ZXMgaXNzdWUgd2l0aCBlbmQgbWFya2VyIHNvbWV0aW1lcyBiZWluZyBwbGFjZWQgYmVmb3JlXHJcblx0XHRcdC8vIHRoZSBzdGFydCBtYXJrZXIgd2hlbiB0aGUgcmFuZ2UgaXMgY29sbGFwc2VkLlxyXG5cdFx0XHRpZiAoY3VycmVudFJhbmdlICYmIGN1cnJlbnRSYW5nZS5jb2xsYXBzZWQpIHtcclxuXHRcdFx0XHRzdGFydE5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXHJcblx0XHRcdFx0XHRfY3JlYXRlTWFya2VyKGVuZE1hcmtlciksIHN0YXJ0Tm9kZS5uZXh0U2libGluZyk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pbnNlcnROb2RlQXQoZmFsc2UsIF9jcmVhdGVNYXJrZXIoZW5kTWFya2VyKSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBHZXRzIHRoZSBtYXJrZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElEXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcblx0XHQgKiBAcmV0dXJuIHtOb2RlfVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBnZXRNYXJrZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5nZXRNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0cmV0dXJuIGRvYy5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlcyB0aGUgbWFya2VyIHdpdGggdGhlIHNwZWNpZmllZCBJRFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZW1vdmVNYXJrZXJcclxuXHRcdCAqIEBtZW1iZXJPZiBSYW5nZUhlbHBlci5wcm90b3R5cGVcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0dmFyIG1hcmtlciA9IHRoaXMuZ2V0TWFya2VyKGlkKTtcclxuXHJcblx0XHRcdGlmIChtYXJrZXIpIHtcclxuXHRcdFx0XHRkb20ucmVtb3ZlKG1hcmtlcik7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBTYXZlcyB0aGUgY3VycmVudCByYW5nZSBsb2NhdGlvbi4gQWxpYXMgb2YgaW5zZXJ0TWFya2VycygpXHJcblx0XHQgKlxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzYXZlUmFnZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNhdmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpcy5pbnNlcnRNYXJrZXJzKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2VsZWN0IHRoZSBzcGVjaWZpZWQgcmFuZ2VcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge1JhbmdlfSByYW5nZVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBzZWxlY3RSYW5nZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnNlbGVjdFJhbmdlID0gZnVuY3Rpb24gKHJhbmdlKSB7XHJcblx0XHRcdHZhciBsYXN0Q2hpbGQ7XHJcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblx0XHRcdHZhciBjb250YWluZXIgPSByYW5nZS5lbmRDb250YWluZXI7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBjdXJzb3IgaXMgc2V0IGFmdGVyIGEgQlIgd2hlbiB0aGUgQlIgaXMgdGhlIG9ubHlcclxuXHRcdFx0Ly8gY2hpbGQgb2YgdGhlIHBhcmVudC4gSW4gRmlyZWZveCB0aGlzIGNhdXNlcyBhIGxpbmUgYnJlYWtcclxuXHRcdFx0Ly8gdG8gb2NjdXIgd2hlbiBzb21ldGhpbmcgaXMgdHlwZWQuIFNlZSBpc3N1ZSAjMzIxXHJcblx0XHRcdGlmIChyYW5nZS5jb2xsYXBzZWQgJiYgY29udGFpbmVyICYmXHJcblx0XHRcdFx0IWRvbS5pc0lubGluZShjb250YWluZXIsIHRydWUpKSB7XHJcblxyXG5cdFx0XHRcdGxhc3RDaGlsZCA9IGNvbnRhaW5lci5sYXN0Q2hpbGQ7XHJcblx0XHRcdFx0d2hpbGUgKGxhc3RDaGlsZCAmJiBkb20uaXMobGFzdENoaWxkLCAnLmVtbGVkaXRvci1pZ25vcmUnKSkge1xyXG5cdFx0XHRcdFx0bGFzdENoaWxkID0gbGFzdENoaWxkLnByZXZpb3VzU2libGluZztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChkb20uaXMobGFzdENoaWxkLCAnYnInKSkge1xyXG5cdFx0XHRcdFx0dmFyIHJuZyA9IGRvYy5jcmVhdGVSYW5nZSgpO1xyXG5cdFx0XHRcdFx0cm5nLnNldEVuZEFmdGVyKGxhc3RDaGlsZCk7XHJcblx0XHRcdFx0XHRybmcuY29sbGFwc2UoZmFsc2UpO1xyXG5cclxuXHRcdFx0XHRcdGlmICh0aGlzLmNvbXBhcmUocmFuZ2UsIHJuZykpIHtcclxuXHRcdFx0XHRcdFx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUobGFzdENoaWxkKTtcclxuXHRcdFx0XHRcdFx0cmFuZ2UuY29sbGFwc2UodHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoc2VsKSB7XHJcblx0XHRcdFx0dGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXN0b3JlcyB0aGUgbGFzdCByYW5nZSBzYXZlZCBieSBzYXZlUmFuZ2UoKSBvciBpbnNlcnRNYXJrZXJzKClcclxuXHRcdCAqXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHJlc3RvcmVSYW5nZVxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnJlc3RvcmVSYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIGlzQ29sbGFwc2VkLCByYW5nZSA9IHRoaXMuc2VsZWN0ZWRSYW5nZSgpLCBzdGFydCA9IHRoaXMuZ2V0TWFya2VyKHN0YXJ0TWFya2VyKSwgZW5kID0gdGhpcy5nZXRNYXJrZXIoZW5kTWFya2VyKTtcclxuXHJcblx0XHRcdGlmICghc3RhcnQgfHwgIWVuZCB8fCAhcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlzQ29sbGFwc2VkID0gc3RhcnQubmV4dFNpYmxpbmcgPT09IGVuZDtcclxuXHJcblx0XHRcdHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XHJcblx0XHRcdHJhbmdlLnNldFN0YXJ0QmVmb3JlKHN0YXJ0KTtcclxuXHRcdFx0cmFuZ2Uuc2V0RW5kQWZ0ZXIoZW5kKTtcclxuXHJcblx0XHRcdGlmIChpc0NvbGxhcHNlZCkge1xyXG5cdFx0XHRcdHJhbmdlLmNvbGxhcHNlKHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnNlbGVjdFJhbmdlKHJhbmdlKTtcclxuXHRcdFx0dGhpcy5yZW1vdmVNYXJrZXJzKCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogU2VsZWN0cyB0aGUgdGV4dCBsZWZ0IGFuZCByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gbGVmdFxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0XHJcblx0XHQgKiBAc2luY2UgMS40LjNcclxuXHRcdCAqIEBmdW5jdGlvblxyXG5cdFx0ICogQG5hbWUgc2VsZWN0T3V0ZXJUZXh0XHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0ID0gZnVuY3Rpb24gKGxlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlcikge1xyXG5cdFx0XHRsZXQgc3RhcnQ6IGFueSwgZW5kOiBhbnksIHJhbmdlOiBhbnkgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcclxuXHJcblx0XHRcdHN0YXJ0ID0gb3V0ZXJUZXh0KHJhbmdlLCB0cnVlLCBsZWZ0KTtcclxuXHRcdFx0ZW5kID0gb3V0ZXJUZXh0KHJhbmdlLCBmYWxzZSwgcmlnaHQpO1xyXG5cclxuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQoc3RhcnQubm9kZSwgc3RhcnQub2Zmc2V0KTtcclxuXHRcdFx0cmFuZ2Uuc2V0RW5kKGVuZC5ub2RlLCBlbmQub2Zmc2V0KTtcclxuXHJcblx0XHRcdHRoaXMuc2VsZWN0UmFuZ2UocmFuZ2UpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEdldHMgdGhlIHRleHQgbGVmdCBvciByaWdodCBvZiB0aGUgY3VycmVudCBzZWxlY3Rpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGJlZm9yZVxyXG5cdFx0ICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxyXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdFx0ICogQHNpbmNlIDEuNC4zXHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIHNlbGVjdE91dGVyVGV4dFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmdldE91dGVyVGV4dCA9IGZ1bmN0aW9uIChiZWZvcmUsIGxlbmd0aCkge1xyXG5cdFx0XHR2YXIgcmFuZ2UgPSB0aGlzLmNsb25lU2VsZWN0ZWQoKTtcclxuXHJcblx0XHRcdGlmICghcmFuZ2UpIHtcclxuXHRcdFx0XHRyZXR1cm4gJyc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJhbmdlLmNvbGxhcHNlKCFiZWZvcmUpO1xyXG5cclxuXHRcdFx0cmV0dXJuIG91dGVyVGV4dChyYW5nZSwgYmVmb3JlLCBsZW5ndGgpLnRleHQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVwbGFjZXMga2V5d29yZHMgd2l0aCB2YWx1ZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgY2FyZXQgcG9zaXRpb25cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0ge0FycmF5fSAgIGtleXdvcmRzXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBZnRlciAgICAgIElmIHRvIGluY2x1ZGUgdGhlIHRleHQgYWZ0ZXIgdGhlXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgY2FyZXQgcG9zaXRpb24gb3IganVzdFxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0IGJlZm9yZVxyXG5cdFx0ICogQHBhcmFtIHtib29sZWFufSBrZXl3b3Jkc1NvcnRlZCAgICBJZiB0aGUga2V5d29yZHMgYXJyYXkgaXMgcHJlXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCBzaG9ydGVzdCB0byBsb25nZXN0XHJcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gIGxvbmdlc3RLZXl3b3JkICAgIExlbmd0aCBvZiB0aGUgbG9uZ2VzdCBrZXl3b3JkXHJcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW59IHJlcXVpcmVXaGl0ZXNwYWNlIElmIHRoZSBrZXkgbXVzdCBiZSBzdXJyb3VuZGVkXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5IHdoaXRlc3BhY2VcclxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSAga2V5cHJlc3NDaGFyICAgICAgSWYgdGhpcyBpcyBiZWluZyBjYWxsZWQgZnJvbVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGtleXByZXNzIGV2ZW50LCB0aGlzIHNob3VsZCBiZVxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQgdG8gdGhlIHByZXNzZWQgY2hhcmFjdGVyXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSByZXBsYWNlS2V5d29yZFxyXG5cdFx0ICogQG1lbWJlck9mIFJhbmdlSGVscGVyLnByb3RvdHlwZVxyXG5cdFx0ICovXHJcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5cdFx0dGhpcy5yZXBsYWNlS2V5d29yZCA9IGZ1bmN0aW9uIChcclxuXHRcdFx0a2V5d29yZHMsXHJcblx0XHRcdGluY2x1ZGVBZnRlcixcclxuXHRcdFx0a2V5d29yZHNTb3J0ZWQsXHJcblx0XHRcdGxvbmdlc3RLZXl3b3JkLFxyXG5cdFx0XHRyZXF1aXJlV2hpdGVzcGFjZSxcclxuXHRcdFx0a2V5cHJlc3NDaGFyXHJcblx0XHQpIHtcclxuXHRcdFx0aWYgKCFrZXl3b3Jkc1NvcnRlZCkge1xyXG5cdFx0XHRcdGtleXdvcmRzLnNvcnQoZnVuY3Rpb24gKGE6IGFueSwgYjogYW55KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYVswXS5sZW5ndGggLSBiWzBdLmxlbmd0aDtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG91dGVyVGV4dCwgbWF0Y2gsIG1hdGNoUG9zLCBzdGFydEluZGV4LCBsZWZ0TGVuLCBjaGFyc0xlZnQsIGtleXdvcmQsIGtleXdvcmRMZW4sIHdoaXRlc3BhY2VSZWdleCA9ICcoXnxbXFxcXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0pJywga2V5d29yZElkeCA9IGtleXdvcmRzLmxlbmd0aCwgd2hpdGVzcGFjZUxlbiA9IHJlcXVpcmVXaGl0ZXNwYWNlID8gMSA6IDAsIG1heEtleUxlbiA9IGxvbmdlc3RLZXl3b3JkIHx8XHJcblx0XHRcdFx0a2V5d29yZHNba2V5d29yZElkeCAtIDFdWzBdLmxlbmd0aDtcclxuXHJcblx0XHRcdGlmIChyZXF1aXJlV2hpdGVzcGFjZSkge1xyXG5cdFx0XHRcdG1heEtleUxlbisrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRrZXlwcmVzc0NoYXIgPSBrZXlwcmVzc0NoYXIgfHwgJyc7XHJcblx0XHRcdG91dGVyVGV4dCA9IHRoaXMuZ2V0T3V0ZXJUZXh0KHRydWUsIG1heEtleUxlbik7XHJcblx0XHRcdGxlZnRMZW4gPSBvdXRlclRleHQubGVuZ3RoO1xyXG5cdFx0XHRvdXRlclRleHQgKz0ga2V5cHJlc3NDaGFyO1xyXG5cclxuXHRcdFx0aWYgKGluY2x1ZGVBZnRlcikge1xyXG5cdFx0XHRcdG91dGVyVGV4dCArPSB0aGlzLmdldE91dGVyVGV4dChmYWxzZSwgbWF4S2V5TGVuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0d2hpbGUgKGtleXdvcmRJZHgtLSkge1xyXG5cdFx0XHRcdGtleXdvcmQgPSBrZXl3b3Jkc1trZXl3b3JkSWR4XVswXTtcclxuXHRcdFx0XHRrZXl3b3JkTGVuID0ga2V5d29yZC5sZW5ndGg7XHJcblx0XHRcdFx0c3RhcnRJbmRleCA9IE1hdGgubWF4KDAsIGxlZnRMZW4gLSBrZXl3b3JkTGVuIC0gd2hpdGVzcGFjZUxlbik7XHJcblx0XHRcdFx0bWF0Y2hQb3MgPSAtMTtcclxuXHJcblx0XHRcdFx0aWYgKHJlcXVpcmVXaGl0ZXNwYWNlKSB7XHJcblx0XHRcdFx0XHRtYXRjaCA9IG91dGVyVGV4dFxyXG5cdFx0XHRcdFx0XHQuc3Vic3RyKHN0YXJ0SW5kZXgpXHJcblx0XHRcdFx0XHRcdC5tYXRjaChuZXcgUmVnRXhwKHdoaXRlc3BhY2VSZWdleCArXHJcblx0XHRcdFx0XHRcdFx0ZXNjYXBlLnJlZ2V4KGtleXdvcmQpICsgd2hpdGVzcGFjZVJlZ2V4KSk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKG1hdGNoKSB7XHJcblx0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGVuZ3RoIG9mIHRoZSB0ZXh0IHRoYXQgd2FzIHJlbW92ZWQgYnlcclxuXHRcdFx0XHRcdFx0Ly8gc3Vic3RyKCkgYW5kIGFsc28gYWRkIDEgZm9yIHRoZSB3aGl0ZXNwYWNlXHJcblx0XHRcdFx0XHRcdG1hdGNoUG9zID0gbWF0Y2guaW5kZXggKyBzdGFydEluZGV4ICsgbWF0Y2hbMV0ubGVuZ3RoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtYXRjaFBvcyA9IG91dGVyVGV4dC5pbmRleE9mKGtleXdvcmQsIHN0YXJ0SW5kZXgpO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKG1hdGNoUG9zID4gLTEpIHtcclxuXHRcdFx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgbWF0Y2ggaXMgYmV0d2VlbiBiZWZvcmUgYW5kXHJcblx0XHRcdFx0XHQvLyBhZnRlciwgbm90IGp1c3QgZW50aXJlbHkgaW4gb25lIHNpZGUgb3IgdGhlIG90aGVyXHJcblx0XHRcdFx0XHRpZiAobWF0Y2hQb3MgPD0gbGVmdExlbiAmJlxyXG5cdFx0XHRcdFx0XHRtYXRjaFBvcyArIGtleXdvcmRMZW4gKyB3aGl0ZXNwYWNlTGVuID49IGxlZnRMZW4pIHtcclxuXHRcdFx0XHRcdFx0Y2hhcnNMZWZ0ID0gbGVmdExlbiAtIG1hdGNoUG9zO1xyXG5cclxuXHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGtleXByZXNzIGNoYXIgaXMgd2hpdGUgc3BhY2UgdGhlbiBpdCBzaG91bGRcclxuXHRcdFx0XHRcdFx0Ly8gbm90IGJlIHJlcGxhY2VkLCBvbmx5IGNoYXJzIHRoYXQgYXJlIHBhcnQgb2YgdGhlXHJcblx0XHRcdFx0XHRcdC8vIGtleSBzaG91bGQgYmUgcmVwbGFjZWQuXHJcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0T3V0ZXJUZXh0KFxyXG5cdFx0XHRcdFx0XHRcdGNoYXJzTGVmdCxcclxuXHRcdFx0XHRcdFx0XHRrZXl3b3JkTGVuIC0gY2hhcnNMZWZ0IC1cclxuXHRcdFx0XHRcdFx0XHQoL15cXFMvLnRlc3Qoa2V5cHJlc3NDaGFyKSA/IDEgOiAwKVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cclxuXHRcdFx0XHRcdFx0dGhpcy5pbnNlcnRIVE1MKGtleXdvcmRzW2tleXdvcmRJZHhdWzFdKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ29tcGFyZXMgdHdvIHJhbmdlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiByYW5nZUIgaXMgdW5kZWZpbmVkIGl0IHdpbGwgYmUgc2V0IHRvXHJcblx0XHQgKiB0aGUgY3VycmVudCBzZWxlY3RlZCByYW5nZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge1JhbmdlfSBybmdBXHJcblx0XHQgKiBAcGFyYW0gIHtSYW5nZX0gW3JuZ0JdXHJcblx0XHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdFx0ICogQGZ1bmN0aW9uXHJcblx0XHQgKiBAbmFtZSBjb21wYXJlXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY29tcGFyZSA9IGZ1bmN0aW9uIChybmdBPzogUmFuZ2UsIHJuZ0I/OiBSYW5nZSk6IGJvb2xlYW4ge1xyXG5cdFx0XHRpZiAoIXJuZ0IpIHtcclxuXHRcdFx0XHRybmdCID0gdGhpcy5zZWxlY3RlZFJhbmdlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghcm5nQSB8fCAhcm5nQikge1xyXG5cdFx0XHRcdHJldHVybiAhcm5nQSAmJiAhcm5nQjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHJuZ0EuY29tcGFyZUJvdW5kYXJ5UG9pbnRzKFJhbmdlLkVORF9UT19FTkQsIHJuZ0IpID09PSAwICYmXHJcblx0XHRcdFx0cm5nQS5jb21wYXJlQm91bmRhcnlQb2ludHMoUmFuZ2UuU1RBUlRfVE9fU1RBUlQsIHJuZ0IpID09PSAwO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZXMgYW55IGN1cnJlbnQgc2VsZWN0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHNpbmNlIDEuNC42XHJcblx0XHQgKiBAZnVuY3Rpb25cclxuXHRcdCAqIEBuYW1lIGNsZWFyXHJcblx0XHQgKiBAbWVtYmVyT2YgUmFuZ2VIZWxwZXIucHJvdG90eXBlXHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBzZWwgPSB3aW4uZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0XHRpZiAoc2VsKSB7XHJcblx0XHRcdFx0aWYgKHNlbC5yZW1vdmVBbGxSYW5nZXMpIHtcclxuXHRcdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHNlbC5lbXB0eSkge1xyXG5cdFx0XHRcdFx0c2VsLmVtcHR5KCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUHJlcGFyZXMgSFRNTCB0byBiZSBpbnNlcnRlZCBieSBhZGRpbmcgYSB6ZXJvIHdpZHRoIHNwYWNlXHJcblx0XHQgKiBpZiB0aGUgbGFzdCBjaGlsZCBpcyBlbXB0eSBhbmQgYWRkaW5nIHRoZSByYW5nZSBzdGFydC9lbmRcclxuXHRcdCAqIG1hcmtlcnMgdG8gdGhlIGxhc3QgY2hpbGQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7Tm9kZXxzdHJpbmd9IG5vZGVcclxuXHRcdCAqIEBwYXJhbSAge05vZGV8c3RyaW5nfSBbZW5kTm9kZV1cclxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IFtyZXR1cm5IdG1sXVxyXG5cdFx0ICogQHJldHVybiB7Tm9kZXxzdHJpbmd9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRfcHJlcGFyZUlucHV0ID0gKG5vZGU6IE5vZGUgfCBzdHJpbmcsIGVuZE5vZGU6IE5vZGUgfCBzdHJpbmcsIHJldHVybkh0bWw6IGJvb2xlYW4pOiBOb2RlIHwgc3RyaW5nID0+IHtcclxuXHRcdFx0dmFyIGxhc3RDaGlsZCwgZnJhZyA9IGRvYy5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0aWYgKGVuZE5vZGUpIHtcclxuXHRcdFx0XHRcdG5vZGUgKz0gdGhpcy5zZWxlY3RlZEh0bWwoKSArIGVuZE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRmcmFnID0gZG9tLnBhcnNlSFRNTChub2RlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgbm9kZSk7XHJcblxyXG5cdFx0XHRcdGlmIChlbmROb2RlKSB7XHJcblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoZnJhZywgdGhpcy5zZWxlY3RlZFJhbmdlKCkuZXh0cmFjdENvbnRlbnRzKCkpO1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGZyYWcsIGVuZE5vZGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCEobGFzdENoaWxkID0gZnJhZy5sYXN0Q2hpbGQpKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR3aGlsZSAoIWRvbS5pc0lubGluZShsYXN0Q2hpbGQubGFzdENoaWxkLCB0cnVlKSkge1xyXG5cdFx0XHRcdGxhc3RDaGlsZCA9IGxhc3RDaGlsZC5sYXN0Q2hpbGQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkb20uY2FuSGF2ZUNoaWxkcmVuKGxhc3RDaGlsZCkpIHtcclxuXHRcdFx0XHQvLyBXZWJraXQgd29uJ3QgYWxsb3cgdGhlIGN1cnNvciB0byBiZSBwbGFjZWQgaW5zaWRlIGFuXHJcblx0XHRcdFx0Ly8gZW1wdHkgdGFnLCBzbyBhZGQgYSB6ZXJvIHdpZHRoIHNwYWNlIHRvIGl0LlxyXG5cdFx0XHRcdGlmICghbGFzdENoaWxkLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1xcdTIwMEInKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxhc3RDaGlsZCA9IGZyYWc7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucmVtb3ZlTWFya2VycygpO1xyXG5cclxuXHRcdFx0Ly8gQXBwZW5kIG1hcmtzIHRvIGxhc3QgY2hpbGQgc28gd2hlbiByZXN0b3JlZCBjdXJzb3Igd2lsbCBiZSBpblxyXG5cdFx0XHQvLyB0aGUgcmlnaHQgcGxhY2VcclxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGxhc3RDaGlsZCwgX2NyZWF0ZU1hcmtlcihzdGFydE1hcmtlcikpO1xyXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQobGFzdENoaWxkLCBfY3JlYXRlTWFya2VyKGVuZE1hcmtlcikpO1xyXG5cclxuXHRcdFx0aWYgKHJldHVybkh0bWwpIHtcclxuXHRcdFx0XHR2YXIgZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChkaXYsIGZyYWcpO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gZGl2LmlubmVySFRNTDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZyYWc7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQ3JlYXRlcyBhIG1hcmtlciBub2RlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcblx0XHQgKiBAcmV0dXJuIHtIVE1MU3BhbkVsZW1lbnR9XHJcblx0XHQgKiBAcHJpdmF0ZVxyXG5cdFx0ICovXHJcblx0XHRfY3JlYXRlTWFya2VyID0gKGlkOiBzdHJpbmcpOiBIVE1MU3BhbkVsZW1lbnQgPT4ge1xyXG5cdFx0XHR0aGlzLnJlbW92ZU1hcmtlcihpZCk7XHJcblxyXG5cdFx0XHR2YXIgbWFya2VyID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XHJcblx0XHRcdFx0aWQ6IGlkLFxyXG5cdFx0XHRcdGNsYXNzTmFtZTogJ2VtbGVkaXRvci1zZWxlY3Rpb24gZW1sZWRpdG9yLWlnbm9yZScsXHJcblx0XHRcdFx0c3R5bGU6ICdkaXNwbGF5Om5vbmU7bGluZS1oZWlnaHQ6MCdcclxuXHRcdFx0fSwgZG9jKTtcclxuXHJcblx0XHRcdG1hcmtlci5pbm5lckhUTUwgPSAnICc7XHJcblxyXG5cdFx0XHRyZXR1cm4gbWFya2VyO1xyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuIiwidmFyIFVTRVJfQUdFTlQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4vKipcbiAqIERldGVjdHMgaWYgdGhlIGJyb3dzZXIgaXMgaU9TXG4gKlxuICogTmVlZGVkIHRvIGZpeCBpT1Mgc3BlY2lmaWMgYnVnc1xuICpcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgaW9zXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IHZhciBpb3MgPSAvaVBob25lfGlQb2R8aVBhZHwgd29zYnJvd3NlclxcLy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cbi8qKlxuICogSWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgV1lTSVdZRyBlZGl0aW5nIChlLmcuIG9sZGVyIG1vYmlsZSBicm93c2VycykuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBpc1d5c2l3eWdTdXBwb3J0ZWRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCB2YXIgaXNXeXNpd3lnU3VwcG9ydGVkID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyXHRtYXRjaCwgaXNVbnN1cHBvcnRlZDtcblxuXHQvLyBJRSBpcyB0aGUgb25seSBicm93c2VyIHRvIHN1cHBvcnQgZG9jdW1lbnRNb2RlXG5cdHZhciBpZSA9ICEhd2luZG93LmRvY3VtZW50LmRvY3VtZW50TW9kZTtcblx0dmFyIGxlZ2FjeUVkZ2UgPSAnLW1zLWltZS1hbGlnbicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0ZGl2LmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG5cblx0Ly8gQ2hlY2sgaWYgdGhlIGNvbnRlbnRFZGl0YWJsZSBhdHRyaWJ1dGUgaXMgc3VwcG9ydGVkXG5cdGlmICghKCdjb250ZW50RWRpdGFibGUnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgfHxcblx0XHRkaXYuY29udGVudEVkaXRhYmxlICE9PSAndHJ1ZScpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBJIHRoaW5rIGJsYWNrYmVycnkgc3VwcG9ydHMgY29udGVudEVkaXRhYmxlIG9yIHdpbGwgYXQgbGVhc3Rcblx0Ly8gZ2l2ZSBhIHZhbGlkIHZhbHVlIGZvciB0aGUgY29udGVudEVkaXRhYmxlIGRldGVjdGlvbiBhYm92ZVxuXHQvLyBzbyBpdCBpc24ndCBpbmNsdWRlZCBpbiB0aGUgYmVsb3cgdGVzdHMuXG5cblx0Ly8gSSBoYXRlIGhhdmluZyB0byBkbyBVQSBzbmlmZmluZyBidXQgc29tZSBtb2JpbGUgYnJvd3NlcnMgc2F5IHRoZXlcblx0Ly8gc3VwcG9ydCBjb250ZW50ZWRpYWJsZSB3aGVuIGl0IGlzbid0IHVzYWJsZSwgaS5lLiB5b3UgY2FuJ3QgZW50ZXJcblx0Ly8gdGV4dC5cblx0Ly8gVGhpcyBpcyB0aGUgb25seSB3YXkgSSBjYW4gdGhpbmsgb2YgdG8gZGV0ZWN0IHRoZW0gd2hpY2ggaXMgYWxzbyBob3dcblx0Ly8gZXZlcnkgb3RoZXIgZWRpdG9yIEkndmUgc2VlbiBkZWFscyB3aXRoIHRoaXMgaXNzdWUuXG5cblx0Ly8gRXhjbHVkZSBPcGVyYSBtb2JpbGUgYW5kIG1pbmlcblx0aXNVbnN1cHBvcnRlZCA9IC9PcGVyYSBNb2JpfE9wZXJhIE1pbmkvaS50ZXN0KFVTRVJfQUdFTlQpO1xuXG5cdGlmICgvQW5kcm9pZC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcblxuXHRcdGlmICgvU2FmYXJpLy50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgNTM0KyBzdXBwb3J0cyBjb250ZW50IGVkaXRhYmxlXG5cdFx0XHQvLyBUaGlzIGFsc28gbWF0Y2hlcyBDaHJvbWUgd2hpY2ggc3VwcG9ydHMgY29udGVudCBlZGl0YWJsZSB0b29cblx0XHRcdG1hdGNoID0gL1NhZmFyaVxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRcdGlzVW5zdXBwb3J0ZWQgPSAoIW1hdGNoIHx8ICFtYXRjaFsxXSA/IHRydWUgOiBtYXRjaFsxXSA8IDUzNCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gVGhlIGN1cnJlbnQgdmVyc2lvbiBvZiBBbWF6b24gU2lsayBzdXBwb3J0cyBpdCwgb2xkZXIgdmVyc2lvbnMgZGlkbid0XG5cdC8vIEFzIGl0IHVzZXMgd2Via2l0IGxpa2UgQW5kcm9pZCwgYXNzdW1lIGl0J3MgdGhlIHNhbWUgYW5kIHN0YXJ0ZWRcblx0Ly8gd29ya2luZyBhdCB2ZXJzaW9ucyA+PSA1MzRcblx0aWYgKC8gU2lsa1xcLy9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRtYXRjaCA9IC9BcHBsZVdlYktpdFxcLyhcXGQrKS8uZXhlYyhVU0VSX0FHRU5UKTtcblx0XHRpc1Vuc3VwcG9ydGVkID0gKCFtYXRjaCB8fCAhbWF0Y2hbMV0gPyB0cnVlIDogbWF0Y2hbMV0gPCA1MzQpO1xuXHR9XG5cblx0Ly8gaU9TIDUrIHN1cHBvcnRzIGNvbnRlbnQgZWRpdGFibGVcblx0aWYgKGlvcykge1xuXHRcdC8vIEJsb2NrIGFueSB2ZXJzaW9uIDw9IDRfeChfeClcblx0XHRpc1Vuc3VwcG9ydGVkID0gL09TIFswLTRdKF9cXGQpKyBsaWtlIE1hYy9pLnRlc3QoVVNFUl9BR0VOVCk7XG5cdH1cblxuXHQvLyBGaXJlZm94IGRvZXMgc3VwcG9ydCBXWVNJV1lHIG9uIG1vYmlsZXMgc28gb3ZlcnJpZGVcblx0Ly8gYW55IHByZXZpb3VzIHZhbHVlIGlmIHVzaW5nIEZGXG5cdGlmICgvRmlyZWZveC9pLnRlc3QoVVNFUl9BR0VOVCkpIHtcblx0XHRpc1Vuc3VwcG9ydGVkID0gZmFsc2U7XG5cdH1cblxuXHRpZiAoL09uZUJyb3dzZXIvaS50ZXN0KFVTRVJfQUdFTlQpKSB7XG5cdFx0aXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuXHR9XG5cblx0Ly8gVUNCcm93c2VyIHdvcmtzIGJ1dCBkb2Vzbid0IGdpdmUgYSB1bmlxdWUgdXNlciBhZ2VudFxuXHRpZiAobmF2aWdhdG9yLnZlbmRvciA9PT0gJ1VDV0VCJykge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdC8vIElFIGFuZCBsZWdhY3kgZWRnZSBhcmUgbm90IHN1cHBvcnRlZCBhbnkgbW9yZVxuXHRpZiAoaWUgfHwgbGVnYWN5RWRnZSkge1xuXHRcdGlzVW5zdXBwb3J0ZWQgPSB0cnVlO1xuXHR9XG5cblx0cmV0dXJuICFpc1Vuc3VwcG9ydGVkO1xufSgpKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20uanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9lc2NhcGUuanMnO1xuaW1wb3J0IF90bXBsIGZyb20gJy4vdGVtcGxhdGVzLmpzJztcblxuLyoqXG4gKiBGaXhlcyBhIGJ1ZyBpbiBGRiB3aGVyZSBpdCBzb21ldGltZXMgd3JhcHNcbiAqIG5ldyBsaW5lcyBpbiB0aGVpciBvd24gbGlzdCBpdGVtLlxuICogU2VlIGlzc3VlICMzNTlcbiAqL1xuZnVuY3Rpb24gZml4RmlyZWZveExpc3RCdWcoZWRpdG9yKSB7XG5cdC8vIE9ubHkgYXBwbHkgdG8gRmlyZWZveCBhcyB3aWxsIGJyZWFrIG90aGVyIGJyb3dzZXJzLlxuXHRpZiAoJ21vekhpZGRlbicgaW4gZG9jdW1lbnQpIHtcblx0XHR2YXIgbm9kZSA9IGVkaXRvci5nZXRCb2R5KCk7XG5cdFx0dmFyIG5leHQ7XG5cblx0XHR3aGlsZSAobm9kZSkge1xuXHRcdFx0bmV4dCA9IG5vZGU7XG5cblx0XHRcdGlmIChuZXh0LmZpcnN0Q2hpbGQpIHtcblx0XHRcdFx0bmV4dCA9IG5leHQuZmlyc3RDaGlsZDtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0d2hpbGUgKG5leHQgJiYgIW5leHQubmV4dFNpYmxpbmcpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5wYXJlbnROb2RlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRuZXh0ID0gbmV4dC5uZXh0U2libGluZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gMyAmJiAvW1xcblxcclxcdF0rLy50ZXN0KG5vZGUubm9kZVZhbHVlKSkge1xuXHRcdFx0XHQvLyBPbmx5IHJlbW92ZSBpZiBuZXdsaW5lcyBhcmUgY29sbGFwc2VkXG5cdFx0XHRcdGlmICghL15wcmUvLnRlc3QoZG9tLmNzcyhub2RlLnBhcmVudE5vZGUsICd3aGl0ZVNwYWNlJykpKSB7XG5cdFx0XHRcdFx0ZG9tLnJlbW92ZShub2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbmV4dDtcblx0XHR9XG5cdH1cbn1cblxuXG4vKipcbiAqIE1hcCBvZiBhbGwgdGhlIGNvbW1hbmRzIGZvciBFbWxFZGl0b3JcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAbmFtZSBjb21tYW5kc1xuICovXG52YXIgZGVmYXVsdENtZHMgPSB7XG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJvbGRcblx0Ym9sZDoge1xuXHRcdGV4ZWM6ICdib2xkJyxcblx0XHR0b29sdGlwOiAnQm9sZCcsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK0InXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEl0YWxpY1xuXHRpdGFsaWM6IHtcblx0XHRleGVjOiAnaXRhbGljJyxcblx0XHR0b29sdGlwOiAnSXRhbGljJyxcblx0XHRzaG9ydGN1dDogJ0N0cmwrSSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogVW5kZXJsaW5lXG5cdHVuZGVybGluZToge1xuXHRcdGV4ZWM6ICd1bmRlcmxpbmUnLFxuXHRcdHRvb2x0aXA6ICdVbmRlcmxpbmUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtVJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBTdHJpa2V0aHJvdWdoXG5cdHN0cmlrZToge1xuXHRcdGV4ZWM6ICdzdHJpa2V0aHJvdWdoJyxcblx0XHR0b29sdGlwOiAnU3RyaWtldGhyb3VnaCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogU3Vic2NyaXB0XG5cdHN1YnNjcmlwdDoge1xuXHRcdGV4ZWM6ICdzdWJzY3JpcHQnLFxuXHRcdHRvb2x0aXA6ICdTdWJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFN1cGVyc2NyaXB0XG5cdHN1cGVyc2NyaXB0OiB7XG5cdFx0ZXhlYzogJ3N1cGVyc2NyaXB0Jyxcblx0XHR0b29sdGlwOiAnU3VwZXJzY3JpcHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGVmdFxuXHRsZWZ0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otbGVmdFxuXHRcdFx0XHRyZXR1cm4gL2xlZnQvLnRlc3QoYWxpZ24pIHx8XG5cdFx0XHRcdFx0YWxpZ24gPT09IChpc0x0ciA/ICdzdGFydCcgOiAnZW5kJyk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRleGVjOiAnanVzdGlmeWxlZnQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiBsZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDZW50cmVcblx0Y2VudGVyOiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnljZW50ZXInLFxuXHRcdHRvb2x0aXA6ICdDZW50ZXInXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFJpZ2h0XG5cdHJpZ2h0OiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlKSB7XG5cdFx0XHRcdHZhciBpc0x0ciA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJztcblx0XHRcdFx0dmFyIGFsaWduID0gZG9tLmNzcyhub2RlLCAndGV4dEFsaWduJyk7XG5cblx0XHRcdFx0Ly8gQ2FuIGJlIC1tb3otcmlnaHRcblx0XHRcdFx0cmV0dXJuIC9yaWdodC8udGVzdChhbGlnbikgfHxcblx0XHRcdFx0XHRhbGlnbiA9PT0gKGlzTHRyID8gJ2VuZCcgOiAnc3RhcnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGV4ZWM6ICdqdXN0aWZ5cmlnaHQnLFxuXHRcdHRvb2x0aXA6ICdBbGlnbiByaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogSnVzdGlmeVxuXHRqdXN0aWZ5OiB7XG5cdFx0ZXhlYzogJ2p1c3RpZnlmdWxsJyxcblx0XHR0b29sdGlwOiAnSnVzdGlmeSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBGb250XG5cdGZvbnQ6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y2FsbGJhY2soZG9tLmRhdGEodGhpcywgJ2ZvbnQnKSk7XG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLm9wdHMuZm9udHMuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChmb250KSB7XG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZm9udE9wdCcsIHtcblx0XHRcdFx0XHRmb250OiBmb250XG5cdFx0XHRcdH0sIHRydWUpKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udC1waWNrZXInLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhciBlZGl0b3IgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5mb250Ll9kcm9wRG93bihlZGl0b3IsIGNhbGxlciwgZnVuY3Rpb24gKGZvbnROYW1lKSB7XG5cdFx0XHRcdGVkaXRvci5leGVjQ29tbWFuZCgnZm9udG5hbWUnLCBmb250TmFtZSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IE5hbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNpemVcblx0c2l6ZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjYWxsYmFjayhkb20uZGF0YSh0aGlzLCAnc2l6ZScpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8PSA3OyBpKyspIHtcblx0XHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdzaXplT3B0Jywge1xuXHRcdFx0XHRcdHNpemU6IGlcblx0XHRcdFx0fSwgdHJ1ZSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZm9udHNpemUtcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuc2l6ZS5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uIChmb250U2l6ZSkge1xuXHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2ZvbnRzaXplJywgZm9udFNpemUpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnRm9udCBTaXplJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBDb2xvdXJcblx0Y29sb3I6IHtcblx0XHRfZHJvcERvd246IGZ1bmN0aW9uIChlZGl0b3IsIGNhbGxlciwgY2FsbGJhY2spIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0aHRtbCAgICA9ICcnLFxuXHRcdFx0XHRjbWQgICAgID0gZGVmYXVsdENtZHMuY29sb3I7XG5cblx0XHRcdGlmICghY21kLl9odG1sQ2FjaGUpIHtcblx0XHRcdFx0ZWRpdG9yLm9wdHMuY29sb3JzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAoY29sdW1uKSB7XG5cdFx0XHRcdFx0aHRtbCArPSAnPGRpdiBjbGFzcz1cImVtbGVkaXRvci1jb2xvci1jb2x1bW5cIj4nO1xuXG5cdFx0XHRcdFx0Y29sdW1uLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRcdFx0XHRcdGh0bWwgKz1cblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJlbWxlZGl0b3ItY29sb3Itb3B0aW9uXCInICtcblx0XHRcdFx0XHRcdFx0JyBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICcgKyBjb2xvciArICdcIicgK1xuXHRcdFx0XHRcdFx0XHQnIGRhdGEtY29sb3I9XCInICsgY29sb3IgKyAnXCI+PC9hPic7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRodG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRjbWQuX2h0bWxDYWNoZSA9IGh0bWw7XG5cdFx0XHR9XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBkb20ucGFyc2VIVE1MKGNtZC5faHRtbENhY2hlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnYScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGRvbS5kYXRhKHRoaXMsICdjb2xvcicpKTtcblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnY29sb3ItcGlja2VyJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMuY29sb3IuX2Ryb3BEb3duKGVkaXRvciwgY2FsbGVyLCBmdW5jdGlvbiAoY29sb3IpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JlY29sb3InLCBjb2xvcik7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdGb250IENvbG9yJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBSZW1vdmUgRm9ybWF0XG5cdHJlbW92ZWZvcm1hdDoge1xuXHRcdGV4ZWM6ICdyZW1vdmVmb3JtYXQnLFxuXHRcdHRvb2x0aXA6ICdSZW1vdmUgRm9ybWF0dGluZydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBDdXRcblx0Y3V0OiB7XG5cdFx0ZXhlYzogJ2N1dCcsXG5cdFx0dG9vbHRpcDogJ0N1dCcsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBjdXQgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtWCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogQ29weVxuXHRjb3B5OiB7XG5cdFx0ZXhlYzogJ2NvcHknLFxuXHRcdHRvb2x0aXA6ICdDb3B5Jyxcblx0XHRlcnJvck1lc3NhZ2U6ICdZb3VyIGJyb3dzZXIgZG9lcyBub3QgYWxsb3cgdGhlIGNvcHkgY29tbWFuZC4gJyArXG5cdFx0XHQnUGxlYXNlIHVzZSB0aGUga2V5Ym9hcmQgc2hvcnRjdXQgQ3RybC9DbWQtQydcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogUGFzdGVcblx0cGFzdGU6IHtcblx0XHRleGVjOiAncGFzdGUnLFxuXHRcdHRvb2x0aXA6ICdQYXN0ZScsXG5cdFx0ZXJyb3JNZXNzYWdlOiAnWW91ciBicm93c2VyIGRvZXMgbm90IGFsbG93IHRoZSBwYXN0ZSBjb21tYW5kLiAnICtcblx0XHRcdCdQbGVhc2UgdXNlIHRoZSBrZXlib2FyZCBzaG9ydGN1dCBDdHJsL0NtZC1WJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBQYXN0ZSBUZXh0XG5cdHBhc3RldGV4dDoge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0dmFsLFxuXHRcdFx0XHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0XHRlZGl0b3IgID0gdGhpcztcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdwYXN0ZXRleHQnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IudHJhbnNsYXRlKFxuXHRcdFx0XHRcdCdQYXN0ZSB5b3VyIHRleHQgaW5zaWRlIHRoZSBmb2xsb3dpbmcgYm94Oidcblx0XHRcdFx0KSxcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YWwgPSBkb20uZmluZChjb250ZW50LCAnI3R4dCcpWzBdLnZhbHVlO1xuXG5cdFx0XHRcdGlmICh2YWwpIHtcblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydFRleHQodmFsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ3Bhc3RldGV4dCcsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1Bhc3RlIFRleHQnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEJ1bGxldCBMaXN0XG5cdGJ1bGxldGxpc3Q6IHtcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRmaXhGaXJlZm94TGlzdEJ1Zyh0aGlzKTtcblx0XHRcdHRoaXMuZXhlY0NvbW1hbmQoJ2luc2VydHVub3JkZXJlZGxpc3QnKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdCdWxsZXQgbGlzdCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblx0Ly8gU1RBUlRfQ09NTUFORDogT3JkZXJlZCBMaXN0XG5cdG9yZGVyZWRsaXN0OiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0Zml4RmlyZWZveExpc3RCdWcodGhpcyk7XG5cdFx0XHR0aGlzLmV4ZWNDb21tYW5kKCdpbnNlcnRvcmRlcmVkbGlzdCcpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ051bWJlcmVkIGxpc3QnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IEluZGVudFxuXHRpbmRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudCwgZmlyc3RCbG9jaykge1xuXHRcdFx0Ly8gT25seSB3b3JrcyB3aXRoIGxpc3RzLCBmb3Igbm93XG5cdFx0XHR2YXJcdHJhbmdlLCBzdGFydFBhcmVudCwgZW5kUGFyZW50O1xuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICdsaScpKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG9tLmlzKGZpcnN0QmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIHdob2xlIGxpc3QgaXMgc2VsZWN0ZWQsIHRoZW4gdGhpcyBtdXN0IGJlXG5cdFx0XHRcdC8vIGludmFsaWRhdGVkIGJlY2F1c2UgdGhlIGJyb3dzZXIgd2lsbCBwbGFjZSBhXG5cdFx0XHRcdC8vIDxibG9ja3F1b3RlPiB0aGVyZVxuXHRcdFx0XHRyYW5nZSA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5zZWxlY3RlZFJhbmdlKCk7XG5cblx0XHRcdFx0c3RhcnRQYXJlbnQgPSByYW5nZS5zdGFydENvbnRhaW5lci5wYXJlbnROb2RlO1xuXHRcdFx0XHRlbmRQYXJlbnQgICA9IHJhbmdlLmVuZENvbnRhaW5lci5wYXJlbnROb2RlO1xuXG5cdFx0XHRcdC8vIFRPRE86IGNvdWxkIHVzZSBub2RlVHlwZSBmb3IgdGhpcz9cblx0XHRcdFx0Ly8gTWF5YmUganVzdCBjaGVjayB0aGUgZmlyc3RCbG9jayBjb250YWlucyBib3RoIHRoZSBzdGFydFxuXHRcdFx0XHQvL2FuZCBlbmQgY29udGFpbmVyc1xuXG5cdFx0XHRcdC8vIFNlbGVjdCB0aGUgdGFnLCBub3QgdGhlIHRleHROb2RlXG5cdFx0XHRcdC8vICh0aGF0J3Mgd2h5IHRoZSBwYXJlbnROb2RlKVxuXHRcdFx0XHRpZiAoc3RhcnRQYXJlbnQgIT09XG5cdFx0XHRcdFx0c3RhcnRQYXJlbnQucGFyZW50Tm9kZS5maXJzdEVsZW1lbnRDaGlsZCB8fFxuXHRcdFx0XHRcdC8vIHdvcmsgYXJvdW5kIGEgYnVnIGluIEZGXG5cdFx0XHRcdFx0KGRvbS5pcyhlbmRQYXJlbnQsICdsaScpICYmIGVuZFBhcmVudCAhPT1cblx0XHRcdFx0XHRcdGVuZFBhcmVudC5wYXJlbnROb2RlLmxhc3RFbGVtZW50Q2hpbGQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdGJsb2NrID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCkuZ2V0Rmlyc3RCbG9ja1BhcmVudCgpO1xuXG5cdFx0XHRlZGl0b3IuZm9jdXMoKTtcblxuXHRcdFx0Ly8gQW4gaW5kZW50IHN5c3RlbSBpcyBxdWl0ZSBjb21wbGljYXRlZCBhcyB0aGVyZSBhcmUgbG9hZHNcblx0XHRcdC8vIG9mIGNvbXBsaWNhdGlvbnMgYW5kIGlzc3VlcyBhcm91bmQgaG93IHRvIGluZGVudCB0ZXh0XG5cdFx0XHQvLyBBcyBkZWZhdWx0LCBsZXQncyBqdXN0IHN0YXkgd2l0aCBpbmRlbnRpbmcgdGhlIGxpc3RzLFxuXHRcdFx0Ly8gYXQgbGVhc3QsIGZvciBub3cuXG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdpbmRlbnQnKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdBZGQgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXHQvLyBTVEFSVF9DT01NQU5EOiBPdXRkZW50XG5cdG91dGRlbnQ6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKHBhcmVudHMsIGZpcnN0QmxvY2spIHtcblx0XHRcdHJldHVybiBkb20uY2xvc2VzdChmaXJzdEJsb2NrLCAndWwsb2wsbWVudScpID8gMCA6IC0xO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHRibG9jayA9IHRoaXMuZ2V0UmFuZ2VIZWxwZXIoKS5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cdFx0XHRpZiAoZG9tLmNsb3Nlc3QoYmxvY2ssICd1bCxvbCxtZW51JykpIHtcblx0XHRcdFx0dGhpcy5leGVjQ29tbWFuZCgnb3V0ZGVudCcpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ1JlbW92ZSBvbmUgaW5kZW50J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFRhYmxlXG5cdHRhYmxlOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyXHRlZGl0b3IgID0gdGhpcyxcblx0XHRcdFx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCd0YWJsZScsIHtcblx0XHRcdFx0cm93czogZWRpdG9yLnRyYW5zbGF0ZSgnUm93czonKSxcblx0XHRcdFx0Y29sczogZWRpdG9yLnRyYW5zbGF0ZSgnQ29sczonKSxcblx0XHRcdFx0aW5zZXJ0OiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJy5idXR0b24nLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHR2YXJcdHJvd3MgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNyb3dzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGNvbHMgPSBOdW1iZXIoZG9tLmZpbmQoY29udGVudCwgJyNjb2xzJylbMF0udmFsdWUpLFxuXHRcdFx0XHRcdGh0bWwgPSAnPHRhYmxlPic7XG5cblx0XHRcdFx0aWYgKHJvd3MgPiAwICYmIGNvbHMgPiAwKSB7XG5cdFx0XHRcdFx0aHRtbCArPSBBcnJheShyb3dzICsgMSkuam9pbihcblx0XHRcdFx0XHRcdCc8dHI+JyArXG5cdFx0XHRcdFx0XHRcdEFycmF5KGNvbHMgKyAxKS5qb2luKFxuXHRcdFx0XHRcdFx0XHRcdCc8dGQ+PGJyIC8+PC90ZD4nXG5cdFx0XHRcdFx0XHRcdCkgK1xuXHRcdFx0XHRcdFx0JzwvdHI+J1xuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRodG1sICs9ICc8L3RhYmxlPic7XG5cblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoaHRtbCk7XG5cdFx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydHRhYmxlJywgY29udGVudCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgdGFibGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogSG9yaXpvbnRhbCBSdWxlXG5cdGhvcml6b250YWxydWxlOiB7XG5cdFx0ZXhlYzogJ2luc2VydGhvcml6b250YWxydWxlJyxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgaG9yaXpvbnRhbCBydWxlJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IENvZGVcblx0Y29kZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdCc8Y29kZT4nLFxuXHRcdFx0XHQnPGJyIC8+PC9jb2RlPidcblx0XHRcdCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnQ29kZSdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBJbWFnZVxuXHRpbWFnZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBzZWxlY3RlZCwgY2IpIHtcblx0XHRcdHZhclx0Y29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdpbWFnZScsIHtcblx0XHRcdFx0dXJsOiBlZGl0b3IudHJhbnNsYXRlKCdVUkw6JyksXG5cdFx0XHRcdHdpZHRoOiBlZGl0b3IudHJhbnNsYXRlKCdXaWR0aCAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRoZWlnaHQ6IGVkaXRvci50cmFuc2xhdGUoJ0hlaWdodCAob3B0aW9uYWwpOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci50cmFuc2xhdGUoJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblxuXHRcdFx0dmFyXHR1cmxJbnB1dCA9IGRvbS5maW5kKGNvbnRlbnQsICcjaW1hZ2UnKVswXTtcblxuXHRcdFx0dXJsSW5wdXQudmFsdWUgPSBzZWxlY3RlZDtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKHVybElucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2IoXG5cdFx0XHRcdFx0XHR1cmxJbnB1dC52YWx1ZSxcblx0XHRcdFx0XHRcdGRvbS5maW5kKGNvbnRlbnQsICcjd2lkdGgnKVswXS52YWx1ZSxcblx0XHRcdFx0XHRcdGRvbS5maW5kKGNvbnRlbnQsICcjaGVpZ2h0JylbMF0udmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0aW1hZ2UnLCBjb250ZW50KTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIpIHtcblx0XHRcdHZhclx0ZWRpdG9yICA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLmltYWdlLl9kcm9wRG93bihcblx0XHRcdFx0ZWRpdG9yLFxuXHRcdFx0XHRjYWxsZXIsXG5cdFx0XHRcdCcnLFxuXHRcdFx0XHRmdW5jdGlvbiAodXJsLCB3aWR0aCwgaGVpZ2h0KSB7XG5cdFx0XHRcdFx0dmFyIGF0dHJzICA9ICcnO1xuXG5cdFx0XHRcdFx0aWYgKHdpZHRoKSB7XG5cdFx0XHRcdFx0XHRhdHRycyArPSAnIHdpZHRoPVwiJyArIHBhcnNlSW50KHdpZHRoLCAxMCkgKyAnXCInO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChoZWlnaHQpIHtcblx0XHRcdFx0XHRcdGF0dHJzICs9ICcgaGVpZ2h0PVwiJyArIHBhcnNlSW50KGhlaWdodCwgMTApICsgJ1wiJztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhdHRycyArPSAnIHNyYz1cIicgKyBlc2NhcGUuZW50aXRpZXModXJsKSArICdcIic7XG5cblx0XHRcdFx0XHRlZGl0b3Iud3lzaXd5Z0VkaXRvckluc2VydEh0bWwoXG5cdFx0XHRcdFx0XHQnPGltZycgKyBhdHRycyArICcgLz4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gaW1hZ2UnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRS1tYWlsXG5cdGVtYWlsOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XG5cdFx0XHR2YXJcdGNvbnRlbnQgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBfdG1wbCgnZW1haWwnLCB7XG5cdFx0XHRcdGxhYmVsOiBlZGl0b3IudHJhbnNsYXRlKCdFLW1haWw6JyksXG5cdFx0XHRcdGRlc2M6IGVkaXRvci50cmFuc2xhdGUoJ0Rlc2NyaXB0aW9uIChvcHRpb25hbCk6JyksXG5cdFx0XHRcdGluc2VydDogZWRpdG9yLnRyYW5zbGF0ZSgnSW5zZXJ0Jylcblx0XHRcdH0sIHRydWUpKTtcblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0dmFyIGVtYWlsID0gZG9tLmZpbmQoY29udGVudCwgJyNlbWFpbCcpWzBdLnZhbHVlO1xuXG5cdFx0XHRcdGlmIChlbWFpbCkge1xuXHRcdFx0XHRcdGNiKGVtYWlsLCBkb20uZmluZChjb250ZW50LCAnI2RlcycpWzBdLnZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVkaXRvci5jbG9zZURyb3BEb3duKHRydWUpO1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZWRpdG9yLmNyZWF0ZURyb3BEb3duKGNhbGxlciwgJ2luc2VydGVtYWlsJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXJcdGVkaXRvciAgPSB0aGlzO1xuXG5cdFx0XHRkZWZhdWx0Q21kcy5lbWFpbC5fZHJvcERvd24oXG5cdFx0XHRcdGVkaXRvcixcblx0XHRcdFx0Y2FsbGVyLFxuXHRcdFx0XHRmdW5jdGlvbiAoZW1haWwsIHRleHQpIHtcblx0XHRcdFx0XHRpZiAoIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpIHx8IHRleHQpIHtcblx0XHRcdFx0XHRcdGVkaXRvci53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChcblx0XHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICtcblx0XHRcdFx0XHRcdFx0J21haWx0bzonICsgZXNjYXBlLmVudGl0aWVzKGVtYWlsKSArICdcIj4nICtcblx0XHRcdFx0XHRcdFx0XHRlc2NhcGUuZW50aXRpZXMoKHRleHQgfHwgZW1haWwpKSArXG5cdFx0XHRcdFx0XHRcdCc8L2E+J1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdjcmVhdGVsaW5rJywgJ21haWx0bzonICsgZW1haWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYW4gZW1haWwnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogTGlua1xuXHRsaW5rOiB7XG5cdFx0X2Ryb3BEb3duOiBmdW5jdGlvbiAoZWRpdG9yLCBjYWxsZXIsIGNiKSB7XG5cdFx0XHR2YXIgY29udGVudCA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdFx0ZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQsIF90bXBsKCdsaW5rJywge1xuXHRcdFx0XHR1cmw6IGVkaXRvci50cmFuc2xhdGUoJ1VSTDonKSxcblx0XHRcdFx0ZGVzYzogZWRpdG9yLnRyYW5zbGF0ZSgnRGVzY3JpcHRpb24gKG9wdGlvbmFsKTonKSxcblx0XHRcdFx0aW5zOiBlZGl0b3IudHJhbnNsYXRlKCdJbnNlcnQnKVxuXHRcdFx0fSwgdHJ1ZSkpO1xuXG5cdFx0XHR2YXIgbGlua0lucHV0ID0gZG9tLmZpbmQoY29udGVudCwgJyNsaW5rJylbMF07XG5cblx0XHRcdGZ1bmN0aW9uIGluc2VydFVybChlKSB7XG5cdFx0XHRcdGlmIChsaW5rSW5wdXQudmFsdWUpIHtcblx0XHRcdFx0XHRjYihsaW5rSW5wdXQudmFsdWUsIGRvbS5maW5kKGNvbnRlbnQsICcjZGVzJylbMF0udmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblxuXHRcdFx0ZG9tLm9uKGNvbnRlbnQsICdjbGljaycsICcuYnV0dG9uJywgaW5zZXJ0VXJsKTtcblx0XHRcdGRvbS5vbihjb250ZW50LCAna2V5cHJlc3MnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyAxMyA9IGVudGVyIGtleVxuXHRcdFx0XHRpZiAoZS53aGljaCA9PT0gMTMgJiYgbGlua0lucHV0LnZhbHVlKSB7XG5cdFx0XHRcdFx0aW5zZXJ0VXJsKGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCBkb20uRVZFTlRfQ0FQVFVSRSk7XG5cblx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihjYWxsZXIsICdpbnNlcnRsaW5rJywgY29udGVudCk7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoY2FsbGVyKSB7XG5cdFx0XHR2YXIgZWRpdG9yID0gdGhpcztcblxuXHRcdFx0ZGVmYXVsdENtZHMubGluay5fZHJvcERvd24oZWRpdG9yLCBjYWxsZXIsIGZ1bmN0aW9uICh1cmwsIHRleHQpIHtcblx0XHRcdFx0aWYgKHRleHQgfHwgIWVkaXRvci5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKFxuXHRcdFx0XHRcdFx0JzxhIGhyZWY9XCInICsgZXNjYXBlLmVudGl0aWVzKHVybCkgKyAnXCI+JyArXG5cdFx0XHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyh0ZXh0IHx8IHVybCkgK1xuXHRcdFx0XHRcdFx0JzwvYT4nXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlZGl0b3IuZXhlY0NvbW1hbmQoJ2NyZWF0ZWxpbmsnLCB1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdJbnNlcnQgYSBsaW5rJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFVubGlua1xuXHR1bmxpbms6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGRvbS5jbG9zZXN0KHRoaXMuQ3VycmVudE5vZGUoKSwgJ2EnKSA/IDAgOiAtMTtcblx0XHR9LFxuXHRcdGV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBhbmNob3IgPSBkb20uY2xvc2VzdCh0aGlzLkN1cnJlbnROb2RlKCksICdhJyk7XG5cblx0XHRcdGlmIChhbmNob3IpIHtcblx0XHRcdFx0d2hpbGUgKGFuY2hvci5maXJzdENoaWxkKSB7XG5cdFx0XHRcdFx0ZG9tLmluc2VydEJlZm9yZShhbmNob3IuZmlyc3RDaGlsZCwgYW5jaG9yKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvbS5yZW1vdmUoYW5jaG9yKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdVbmxpbmsnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBRdW90ZVxuXHRxdW90ZToge1xuXHRcdGV4ZWM6IGZ1bmN0aW9uIChjYWxsZXIsIGh0bWwsIGF1dGhvcikge1xuXHRcdFx0dmFyXHRiZWZvcmUgPSAnPGJsb2NrcXVvdGU+Jyxcblx0XHRcdFx0ZW5kICAgID0gJzwvYmxvY2txdW90ZT4nO1xuXG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBIVE1MIHBhc3NlZCBzZXQgZW5kIHRvIG51bGwgc28gYW55IHNlbGVjdGVkXG5cdFx0XHQvLyB0ZXh0IGlzIHJlcGxhY2VkXG5cdFx0XHRpZiAoaHRtbCkge1xuXHRcdFx0XHRhdXRob3IgPSAoYXV0aG9yID8gJzxjaXRlPicgK1xuXHRcdFx0XHRcdGVzY2FwZS5lbnRpdGllcyhhdXRob3IpICtcblx0XHRcdFx0JzwvY2l0ZT4nIDogJycpO1xuXHRcdFx0XHRiZWZvcmUgPSBiZWZvcmUgKyBhdXRob3IgKyBodG1sICsgZW5kO1xuXHRcdFx0XHRlbmQgICAgPSBudWxsO1xuXHRcdFx0Ly8gaWYgbm90IGFkZCBhIG5ld2xpbmUgdG8gdGhlIGVuZCBvZiB0aGUgaW5zZXJ0ZWQgcXVvdGVcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5nZXRSYW5nZUhlbHBlcigpLnNlbGVjdGVkSHRtbCgpID09PSAnJykge1xuXHRcdFx0XHRlbmQgPSAnPGJyIC8+JyArIGVuZDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy53eXNpd3lnRWRpdG9ySW5zZXJ0SHRtbChiZWZvcmUsIGVuZCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGEgUXVvdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRW1vdGljb25zXG5cdGVtb3RpY29uOiB7XG5cdFx0ZXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdHZhciBjcmVhdGVDb250ZW50ID0gZnVuY3Rpb24gKGluY2x1ZGVNb3JlKSB7XG5cdFx0XHRcdHZhclx0bW9yZUxpbmssXG5cdFx0XHRcdFx0b3B0cyAgICAgICAgICAgID0gZWRpdG9yLm9wdHMsXG5cdFx0XHRcdFx0ZW1vdGljb25zUm9vdCAgID0gb3B0cy5lbW90aWNvbnNSb290IHx8ICcnLFxuXHRcdFx0XHRcdGVtb3RpY29uc0NvbXBhdCA9IG9wdHMuZW1vdGljb25zQ29tcGF0LFxuXHRcdFx0XHRcdHJhbmdlSGVscGVyICAgICA9IGVkaXRvci5nZXRSYW5nZUhlbHBlcigpLFxuXHRcdFx0XHRcdHN0YXJ0U3BhY2UgICAgICA9IGVtb3RpY29uc0NvbXBhdCAmJlxuXHRcdFx0XHRcdFx0cmFuZ2VIZWxwZXIuZ2V0T3V0ZXJUZXh0KHRydWUsIDEpICE9PSAnICcgPyAnICcgOiAnJyxcblx0XHRcdFx0XHRlbmRTcGFjZSAgICAgICAgPSBlbW90aWNvbnNDb21wYXQgJiZcblx0XHRcdFx0XHRcdHJhbmdlSGVscGVyLmdldE91dGVyVGV4dChmYWxzZSwgMSkgIT09ICcgJyA/ICcgJyA6ICcnLFxuXHRcdFx0XHRcdGNvbnRlbnQgICAgICAgICA9IGRvbS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdFx0XHRsaW5lICAgICAgICAgICAgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRcdFx0cGVyTGluZSAgICAgICAgID0gMCxcblx0XHRcdFx0XHRlbW90aWNvbnMgICAgICAgPSB1dGlscy5leHRlbmQoXG5cdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdG9wdHMuZW1vdGljb25zLmRyb3Bkb3duLFxuXHRcdFx0XHRcdFx0aW5jbHVkZU1vcmUgPyBvcHRzLmVtb3RpY29ucy5tb3JlIDoge31cblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChjb250ZW50LCBsaW5lKTtcblxuXHRcdFx0XHRwZXJMaW5lID0gTWF0aC5zcXJ0KE9iamVjdC5rZXlzKGVtb3RpY29ucykubGVuZ3RoKTtcblxuXHRcdFx0XHRkb20ub24oY29udGVudCwgJ2NsaWNrJywgJ2ltZycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0ZWRpdG9yLmluc2VydChzdGFydFNwYWNlICsgZG9tLmF0dHIodGhpcywgJ2FsdCcpICsgZW5kU3BhY2UsXG5cdFx0XHRcdFx0XHRudWxsLCBmYWxzZSkuY2xvc2VEcm9wRG93bih0cnVlKTtcblxuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dXRpbHMuZWFjaChlbW90aWNvbnMsIGZ1bmN0aW9uIChjb2RlLCBlbW90aWNvbikge1xuXHRcdFx0XHRcdGRvbS5hcHBlbmRDaGlsZChsaW5lLCBkb20uY3JlYXRlRWxlbWVudCgnaW1nJywge1xuXHRcdFx0XHRcdFx0c3JjOiBlbW90aWNvbnNSb290ICsgKGVtb3RpY29uLnVybCB8fCBlbW90aWNvbiksXG5cdFx0XHRcdFx0XHRhbHQ6IGNvZGUsXG5cdFx0XHRcdFx0XHR0aXRsZTogZW1vdGljb24udG9vbHRpcCB8fCBjb2RlXG5cdFx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdFx0aWYgKGxpbmUuY2hpbGRyZW4ubGVuZ3RoID49IHBlckxpbmUpIHtcblx0XHRcdFx0XHRcdGxpbmUgPSBkb20uY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbGluZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoIWluY2x1ZGVNb3JlICYmIG9wdHMuZW1vdGljb25zLm1vcmUpIHtcblx0XHRcdFx0XHRtb3JlTGluayA9IGRvbS5jcmVhdGVFbGVtZW50KCdhJywge1xuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnZW1sZWRpdG9yLW1vcmUnXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQobW9yZUxpbmssXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShlZGl0b3IudHJhbnNsYXRlKCdNb3JlJykpKTtcblxuXHRcdFx0XHRcdGRvbS5vbihtb3JlTGluaywgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGVkaXRvci5jcmVhdGVEcm9wRG93bihcblx0XHRcdFx0XHRcdFx0Y2FsbGVyLCAnbW9yZS1lbW90aWNvbnMnLCBjcmVhdGVDb250ZW50KHRydWUpXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgbW9yZUxpbmspO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdFx0XHR9O1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnZW1vdGljb25zJywgY3JlYXRlQ29udGVudChmYWxzZSkpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKGNhbGxlcikge1xuXHRcdFx0ZGVmYXVsdENtZHMuZW1vdGljb24uZXhlYy5jYWxsKHRoaXMsIGNhbGxlcik7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnSW5zZXJ0IGFuIGVtb3RpY29uJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFlvdVR1YmVcblx0eW91dHViZToge1xuXHRcdF9kcm9wRG93bjogZnVuY3Rpb24gKGVkaXRvciwgY2FsbGVyLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyXHRjb250ZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0XHRkb20uYXBwZW5kQ2hpbGQoY29udGVudCwgX3RtcGwoJ3lvdXR1YmVNZW51Jywge1xuXHRcdFx0XHRsYWJlbDogZWRpdG9yLnRyYW5zbGF0ZSgnVmlkZW8gVVJMOicpLFxuXHRcdFx0XHRpbnNlcnQ6IGVkaXRvci50cmFuc2xhdGUoJ0luc2VydCcpXG5cdFx0XHR9LCB0cnVlKSk7XG5cblx0XHRcdGRvbS5vbihjb250ZW50LCAnY2xpY2snLCAnLmJ1dHRvbicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdHZhciB2YWwgPSBkb20uZmluZChjb250ZW50LCAnI2xpbmsnKVswXS52YWx1ZTtcblx0XHRcdFx0dmFyIGlkTWF0Y2ggPSB2YWwubWF0Y2goLyg/OnY9fHZcXC98ZW1iZWRcXC98eW91dHUuYmVcXC8pPyhbYS16QS1aMC05Xy1dezExfSkvKTtcblx0XHRcdFx0dmFyIHRpbWVNYXRjaCA9IHZhbC5tYXRjaCgvWyZ8P10oPzpzdGFyKT90PSgoXFxkK1tobXNdPyl7MSwzfSkvKTtcblx0XHRcdFx0dmFyIHRpbWUgPSAwO1xuXG5cdFx0XHRcdGlmICh0aW1lTWF0Y2gpIHtcblx0XHRcdFx0XHR1dGlscy5lYWNoKHRpbWVNYXRjaFsxXS5zcGxpdCgvW2htc10vKSwgZnVuY3Rpb24gKGksIHZhbCkge1xuXHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gJycpIHtcblx0XHRcdFx0XHRcdFx0dGltZSA9ICh0aW1lICogNjApICsgTnVtYmVyKHZhbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoaWRNYXRjaCAmJiAvXlthLXpBLVowLTlfLV17MTF9JC8udGVzdChpZE1hdGNoWzFdKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrKGlkTWF0Y2hbMV0sIHRpbWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZWRpdG9yLmNsb3NlRHJvcERvd24odHJ1ZSk7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRlZGl0b3IuY3JlYXRlRHJvcERvd24oY2FsbGVyLCAnaW5zZXJ0bGluaycsIGNvbnRlbnQpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKGJ0bikge1xuXHRcdFx0dmFyIGVkaXRvciA9IHRoaXM7XG5cblx0XHRcdGRlZmF1bHRDbWRzLnlvdXR1YmUuX2Ryb3BEb3duKGVkaXRvciwgYnRuLCBmdW5jdGlvbiAoaWQsIHRpbWUpIHtcblx0XHRcdFx0ZWRpdG9yLnd5c2l3eWdFZGl0b3JJbnNlcnRIdG1sKF90bXBsKCd5b3V0dWJlJywge1xuXHRcdFx0XHRcdGlkOiBpZCxcblx0XHRcdFx0XHR0aW1lOiB0aW1lXG5cdFx0XHRcdH0pKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBhIFlvdVR1YmUgdmlkZW8nXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogRGF0ZVxuXHRkYXRlOiB7XG5cdFx0X2RhdGU6IGZ1bmN0aW9uIChlZGl0b3IpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHR5ZWFyICA9IG5vdy5nZXRZZWFyKCksXG5cdFx0XHRcdG1vbnRoID0gbm93LmdldE1vbnRoKCkgKyAxLFxuXHRcdFx0XHRkYXkgICA9IG5vdy5nZXREYXRlKCk7XG5cblx0XHRcdGlmICh5ZWFyIDwgMjAwMCkge1xuXHRcdFx0XHR5ZWFyID0gMTkwMCArIHllYXI7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtb250aCA8IDEwKSB7XG5cdFx0XHRcdG1vbnRoID0gJzAnICsgbW9udGg7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkYXkgPCAxMCkge1xuXHRcdFx0XHRkYXkgPSAnMCcgKyBkYXk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBlZGl0b3Iub3B0cy5kYXRlRm9ybWF0XG5cdFx0XHRcdC5yZXBsYWNlKC95ZWFyL2ksIHllYXIpXG5cdFx0XHRcdC5yZXBsYWNlKC9tb250aC9pLCBtb250aClcblx0XHRcdFx0LnJlcGxhY2UoL2RheS9pLCBkYXkpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dHh0RXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5pbnNlcnRUZXh0KGRlZmF1bHRDbWRzLmRhdGUuX2RhdGUodGhpcykpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IGRhdGUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogVGltZVxuXHR0aW1lOiB7XG5cdFx0X3RpbWU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhclx0bm93ICAgPSBuZXcgRGF0ZSgpLFxuXHRcdFx0XHRob3VycyA9IG5vdy5nZXRIb3VycygpLFxuXHRcdFx0XHRtaW5zICA9IG5vdy5nZXRNaW51dGVzKCksXG5cdFx0XHRcdHNlY3MgID0gbm93LmdldFNlY29uZHMoKTtcblxuXHRcdFx0aWYgKGhvdXJzIDwgMTApIHtcblx0XHRcdFx0aG91cnMgPSAnMCcgKyBob3Vycztcblx0XHRcdH1cblxuXHRcdFx0aWYgKG1pbnMgPCAxMCkge1xuXHRcdFx0XHRtaW5zID0gJzAnICsgbWlucztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNlY3MgPCAxMCkge1xuXHRcdFx0XHRzZWNzID0gJzAnICsgc2Vjcztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGhvdXJzICsgJzonICsgbWlucyArICc6JyArIHNlY3M7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmluc2VydFRleHQoZGVmYXVsdENtZHMudGltZS5fdGltZSgpKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dChkZWZhdWx0Q21kcy50aW1lLl90aW1lKCkpO1xuXHRcdH0sXG5cdFx0dG9vbHRpcDogJ0luc2VydCBjdXJyZW50IHRpbWUnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblxuXHQvLyBTVEFSVF9DT01NQU5EOiBMdHJcblx0bHRyOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ2x0cic7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSAgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdFx0aWYgKCFub2RlIHx8IGRvbS5pcyhub2RlLCAnYm9keScpKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0b2dnbGVWYWx1ZSA9IGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicpID09PSAnbHRyJyA/ICcnIDogJ2x0cic7XG5cdFx0XHRkb20uY3NzKG5vZGUsICdkaXJlY3Rpb24nLCB0b2dnbGVWYWx1ZSk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTGVmdC10by1SaWdodCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBSdGxcblx0cnRsOiB7XG5cdFx0c3RhdGU6IGZ1bmN0aW9uIChwYXJlbnRzLCBmaXJzdEJsb2NrKSB7XG5cdFx0XHRyZXR1cm4gZmlyc3RCbG9jayAmJiBmaXJzdEJsb2NrLnN0eWxlLmRpcmVjdGlvbiA9PT0gJ3J0bCc7XG5cdFx0fSxcblx0XHRleGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXJcdGVkaXRvciA9IHRoaXMsXG5cdFx0XHRcdHJhbmdlSGVscGVyID0gZWRpdG9yLmdldFJhbmdlSGVscGVyKCksXG5cdFx0XHRcdG5vZGUgPSByYW5nZUhlbHBlci5nZXRGaXJzdEJsb2NrUGFyZW50KCk7XG5cblx0XHRcdGVkaXRvci5mb2N1cygpO1xuXG5cdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0ZWRpdG9yLmV4ZWNDb21tYW5kKCdmb3JtYXRCbG9jaycsICdwJyk7XG5cblx0XHRcdFx0bm9kZSA9IHJhbmdlSGVscGVyLmdldEZpcnN0QmxvY2tQYXJlbnQoKTtcblxuXHRcdFx0XHRpZiAoIW5vZGUgfHwgZG9tLmlzKG5vZGUsICdib2R5JykpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIHRvZ2dsZVZhbHVlID0gZG9tLmNzcyhub2RlLCAnZGlyZWN0aW9uJykgPT09ICdydGwnID8gJycgOiAncnRsJztcblx0XHRcdGRvbS5jc3Mobm9kZSwgJ2RpcmVjdGlvbicsIHRvZ2dsZVZhbHVlKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdSaWdodC10by1MZWZ0J1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cblx0Ly8gU1RBUlRfQ09NTUFORDogUHJpbnRcblx0cHJpbnQ6IHtcblx0XHRleGVjOiAncHJpbnQnLFxuXHRcdHRvb2x0aXA6ICdQcmludCdcblx0fSxcblx0Ly8gRU5EX0NPTU1BTkRcblxuXHQvLyBTVEFSVF9DT01NQU5EOiBNYXhpbWl6ZVxuXHRtYXhpbWl6ZToge1xuXHRcdHN0YXRlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5tYXhpbWl6ZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5tYXhpbWl6ZSghdGhpcy5tYXhpbWl6ZSgpKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHR4dEV4ZWM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMubWF4aW1pemUoIXRoaXMubWF4aW1pemUoKSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0b29sdGlwOiAnTWF4aW1pemUnLFxuXHRcdHNob3J0Y3V0OiAnQ3RybCtTaGlmdCtNJ1xuXHR9LFxuXHQvLyBFTkRfQ09NTUFORFxuXG5cdC8vIFNUQVJUX0NPTU1BTkQ6IFNvdXJjZVxuXHRzb3VyY2U6IHtcblx0XHRzdGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuc291cmNlTW9kZSgpO1xuXHRcdH0sXG5cdFx0ZXhlYzogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy50b2dnbGVTb3VyY2VNb2RlKCk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fSxcblx0XHR0eHRFeGVjOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZVNvdXJjZU1vZGUoKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9LFxuXHRcdHRvb2x0aXA6ICdWaWV3IHNvdXJjZScsXG5cdFx0c2hvcnRjdXQ6ICdDdHJsK1NoaWZ0K1MnXG5cdH0sXG5cdC8vIEVORF9DT01NQU5EXG5cblx0Ly8gdGhpcyBpcyBoZXJlIHNvIHRoYXQgY29tbWFuZHMgYWJvdmUgY2FuIGJlIHJlbW92ZWRcblx0Ly8gd2l0aG91dCBoYXZpbmcgdG8gcmVtb3ZlIHRoZSAsIGFmdGVyIHRoZSBsYXN0IG9uZS5cblx0Ly8gTmVlZGVkIGZvciBJRS5cblx0aWdub3JlOiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdENtZHM7XG4iLCJpbXBvcnQgeyBhdHRyIH0gZnJvbSAnLi9kb20uanMnO1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBmb3IgRW1sRWRpdG9yXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcblx0LyoqXG5cdCAqIFRvb2xiYXIgYnV0dG9ucyBvcmRlciBhbmQgZ3JvdXBzLiBTaG91bGQgYmUgY29tbWEgc2VwYXJhdGVkIGFuZFxuXHQgKiBoYXZlIGEgYmFyIHwgdG8gc2VwYXJhdGUgZ3JvdXBzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHR0b29sYmFyOiAnYm9sZCxpdGFsaWMsdW5kZXJsaW5lLHN0cmlrZSxzdWJzY3JpcHQsc3VwZXJzY3JpcHR8JyArXG5cdFx0J2xlZnQsY2VudGVyLHJpZ2h0LGp1c3RpZnl8Zm9udCxzaXplLGNvbG9yLHJlbW92ZWZvcm1hdHwnICtcblx0XHQnY3V0LGNvcHkscGFzdGV0ZXh0fGJ1bGxldGxpc3Qsb3JkZXJlZGxpc3QsaW5kZW50LG91dGRlbnR8JyArXG5cdFx0J3RhYmxlfGNvZGUscXVvdGV8aG9yaXpvbnRhbHJ1bGUsaW1hZ2UsZW1haWwsbGluayx1bmxpbmt8JyArXG5cdFx0J2Vtb3RpY29uLHlvdXR1YmUsZGF0ZSx0aW1lfGx0cixydGx8cHJpbnQsbWF4aW1pemUsc291cmNlJyxcblxuXHQvKipcblx0ICogQ29tbWEgc2VwYXJhdGVkIGxpc3Qgb2YgY29tbWFuZHMgdG8gZXhjbHVkZXMgZnJvbSB0aGUgdG9vbGJhclxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0dG9vbGJhckV4Y2x1ZGU6IG51bGwsXG5cblx0LyoqXG5cdCAqIFN0eWxlc2hlZXQgdG8gaW5jbHVkZSBpbiB0aGUgV1lTSVdZRyBlZGl0b3IuIFRoaXMgaXMgd2hhdCB3aWxsIHN0eWxlXG5cdCAqIHRoZSBXWVNJV1lHIGVsZW1lbnRzXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRzdHlsZTogJ2pxdWVyeS5lbWxlZGl0b3IuZGVmYXVsdC5jc3MnLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBmb250cyBmb3IgdGhlIGZvbnQgc2VsZWN0b3Jcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGZvbnRzOiAnQXJpYWwsQXJpYWwgQmxhY2ssQ29taWMgU2FucyBNUyxDb3VyaWVyIE5ldyxHZW9yZ2lhLEltcGFjdCwnICtcblx0XHQnU2Fucy1zZXJpZixTZXJpZixUaW1lcyBOZXcgUm9tYW4sVHJlYnVjaGV0IE1TLFZlcmRhbmEnLFxuXG5cdC8qKlxuXHQgKiBDb2xvcnMgc2hvdWxkIGJlIGNvbW1hIHNlcGFyYXRlZCBhbmQgaGF2ZSBhIGJhciB8IHRvIHNpZ25hbCBhIG5ld1xuXHQgKiBjb2x1bW4uXG5cdCAqXG5cdCAqIElmIG51bGwgdGhlIGNvbG9ycyB3aWxsIGJlIGF1dG8gZ2VuZXJhdGVkLlxuXHQgKlxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y29sb3JzOiAnIzAwMDAwMCwjNDRCOEZGLCMxRTkyRjcsIzAwNzREOSwjMDA1REMyLCMwMDM2OUIsI2IzZDVmNHwnICtcblx0XHRcdCcjNDQ0NDQ0LCNDM0ZGRkYsIzlERjlGRiwjN0ZEQkZGLCM2OEM0RTgsIzQxOURDMSwjZDlmNGZmfCcgK1xuXHRcdFx0JyM2NjY2NjYsIzcyRkY4NCwjNENFQTVFLCMyRUNDNDAsIzE3QjUyOSwjMDA4RTAyLCNjMGYwYzZ8JyArXG5cdFx0XHQnIzg4ODg4OCwjRkZGRjQ0LCNGRkZBMUUsI0ZGREMwMCwjRThDNTAwLCNDMTlFMDAsI2ZmZjViM3wnICtcblx0XHRcdCcjYWFhYWFhLCNGRkM5NUYsI0ZGQTMzOSwjRkY4NTFCLCNFODZFMDQsI0MxNDcwMCwjZmZkYmJifCcgK1xuXHRcdFx0JyNjY2NjY2MsI0ZGODU3QSwjRkY1RjU0LCNGRjQxMzYsI0U4MkExRiwjQzEwMzAwLCNmZmM2YzN8JyArXG5cdFx0XHQnI2VlZWVlZSwjRkY1NkZGLCNGRjMwREMsI0YwMTJCRSwjRDkwMEE3LCNCMjAwODAsI2ZiYjhlY3wnICtcblx0XHRcdCcjZmZmZmZmLCNGNTUxRkYsI0NGMkJFNywjQjEwREM5LCM5QTAwQjIsIzlBMDBCMiwjZThiNmVmJyxcblxuXHQvKipcblx0ICogVGhlIGxvY2FsZSB0byB1c2UuXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRsb2NhbGU6IGF0dHIoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCAnbGFuZycpIHx8ICdlbicsXG5cblx0LyoqXG5cdCAqIFRoZSBDaGFyc2V0IHRvIHVzZVxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0Y2hhcnNldDogJ3V0Zi04JyxcblxuXHQvKipcblx0ICogQ29tcGF0aWJpbGl0eSBtb2RlIGZvciBlbW90aWNvbnMuXG5cdCAqXG5cdCAqIEhlbHBzIGlmIHlvdSBoYXZlIGVtb3RpY29ucyBzdWNoIGFzIDovIHdoaWNoIHdvdWxkIHB1dCBhbiBlbW90aWNvblxuXHQgKiBpbnNpZGUgaHR0cDovL1xuXHQgKlxuXHQgKiBUaGlzIG1vZGUgcmVxdWlyZXMgZW1vdGljb25zIHRvIGJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBvciBlbmQgb2Zcblx0ICogbGluZSBjaGFycy4gVGhpcyBtb2RlIGhhcyBsaW1pdGVkIEFzIFlvdSBUeXBlIGVtb3RpY29uIGNvbnZlcnNpb25cblx0ICogc3VwcG9ydC4gSXQgd2lsbCBub3QgcmVwbGFjZSBBWVQgZm9yIGVuZCBvZiBsaW5lIGNoYXJzLCBvbmx5XG5cdCAqIGVtb3RpY29ucyBzdXJyb3VuZGVkIGJ5IHdoaXRlc3BhY2UuIFRoZXkgd2lsbCBzdGlsbCBiZSByZXBsYWNlZFxuXHQgKiBjb3JyZWN0bHkgd2hlbiBsb2FkZWQganVzdCBub3QgQVlULlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVtb3RpY29uc0NvbXBhdDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBlbW90aWNvbnMuIENhbiBiZSBjaGFuZ2VzIGF0IHJ1bnRpbWUgdXNpbmcgdGhlXG5cdCAqIGVtb3RpY29ucygpIG1ldGhvZC5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqIEBzaW5jZSAxLjQuMlxuXHQgKi9cblx0ZW1vdGljb25zRW5hYmxlZDogdHJ1ZSxcblxuXHQvKipcblx0ICogRW1vdGljb24gcm9vdCBVUkxcblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGVtb3RpY29uc1Jvb3Q6ICcnLFxuXHRlbW90aWNvbnM6IHtcblx0XHRkcm9wZG93bjoge1xuXHRcdFx0JzopJzogJ2Vtb3RpY29ucy9zbWlsZS5wbmcnLFxuXHRcdFx0JzphbmdlbDonOiAnZW1vdGljb25zL2FuZ2VsLnBuZycsXG5cdFx0XHQnOmFuZ3J5Oic6ICdlbW90aWNvbnMvYW5ncnkucG5nJyxcblx0XHRcdCc4LSknOiAnZW1vdGljb25zL2Nvb2wucG5nJyxcblx0XHRcdCc6XFwnKCc6ICdlbW90aWNvbnMvY3d5LnBuZycsXG5cdFx0XHQnOmVybW06JzogJ2Vtb3RpY29ucy9lcm1tLnBuZycsXG5cdFx0XHQnOkQnOiAnZW1vdGljb25zL2dyaW4ucG5nJyxcblx0XHRcdCc8Myc6ICdlbW90aWNvbnMvaGVhcnQucG5nJyxcblx0XHRcdCc6KCc6ICdlbW90aWNvbnMvc2FkLnBuZycsXG5cdFx0XHQnOk8nOiAnZW1vdGljb25zL3Nob2NrZWQucG5nJyxcblx0XHRcdCc6UCc6ICdlbW90aWNvbnMvdG9uZ3VlLnBuZycsXG5cdFx0XHQnOyknOiAnZW1vdGljb25zL3dpbmsucG5nJ1xuXHRcdH0sXG5cdFx0bW9yZToge1xuXHRcdFx0JzphbGllbjonOiAnZW1vdGljb25zL2FsaWVuLnBuZycsXG5cdFx0XHQnOmJsaW5rOic6ICdlbW90aWNvbnMvYmxpbmsucG5nJyxcblx0XHRcdCc6Ymx1c2g6JzogJ2Vtb3RpY29ucy9ibHVzaC5wbmcnLFxuXHRcdFx0JzpjaGVlcmZ1bDonOiAnZW1vdGljb25zL2NoZWVyZnVsLnBuZycsXG5cdFx0XHQnOmRldmlsOic6ICdlbW90aWNvbnMvZGV2aWwucG5nJyxcblx0XHRcdCc6ZGl6enk6JzogJ2Vtb3RpY29ucy9kaXp6eS5wbmcnLFxuXHRcdFx0JzpnZXRsb3N0Oic6ICdlbW90aWNvbnMvZ2V0bG9zdC5wbmcnLFxuXHRcdFx0JzpoYXBweTonOiAnZW1vdGljb25zL2hhcHB5LnBuZycsXG5cdFx0XHQnOmtpc3Npbmc6JzogJ2Vtb3RpY29ucy9raXNzaW5nLnBuZycsXG5cdFx0XHQnOm5pbmphOic6ICdlbW90aWNvbnMvbmluamEucG5nJyxcblx0XHRcdCc6cGluY2g6JzogJ2Vtb3RpY29ucy9waW5jaC5wbmcnLFxuXHRcdFx0Jzpwb3V0eTonOiAnZW1vdGljb25zL3BvdXR5LnBuZycsXG5cdFx0XHQnOnNpY2s6JzogJ2Vtb3RpY29ucy9zaWNrLnBuZycsXG5cdFx0XHQnOnNpZGV3YXlzOic6ICdlbW90aWNvbnMvc2lkZXdheXMucG5nJyxcblx0XHRcdCc6c2lsbHk6JzogJ2Vtb3RpY29ucy9zaWxseS5wbmcnLFxuXHRcdFx0JzpzbGVlcGluZzonOiAnZW1vdGljb25zL3NsZWVwaW5nLnBuZycsXG5cdFx0XHQnOnVuc3VyZTonOiAnZW1vdGljb25zL3Vuc3VyZS5wbmcnLFxuXHRcdFx0Jzp3b290Oic6ICdlbW90aWNvbnMvdzAwdC5wbmcnLFxuXHRcdFx0Jzp3YXNzYXQ6JzogJ2Vtb3RpY29ucy93YXNzYXQucG5nJ1xuXHRcdH0sXG5cdFx0aGlkZGVuOiB7XG5cdFx0XHQnOndoaXN0bGluZzonOiAnZW1vdGljb25zL3doaXN0bGluZy5wbmcnLFxuXHRcdFx0Jzpsb3ZlOic6ICdlbW90aWNvbnMvd3ViLnBuZydcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIFdpZHRoIG9mIHRoZSBlZGl0b3IuIFNldCB0byBudWxsIGZvciBhdXRvbWF0aWMgd2l0aFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHdpZHRoOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBIZWlnaHQgb2YgdGhlIGVkaXRvciBpbmNsdWRpbmcgdG9vbGJhci4gU2V0IHRvIG51bGwgZm9yIGF1dG9tYXRpY1xuXHQgKiBoZWlnaHRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRoZWlnaHQ6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgcmVzaXplZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUVuYWJsZWQ6IHRydWUsXG5cblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gd2lkdGgsIHNldCB0byBudWxsIGZvciBoYWxmIHRleHRhcmVhIHdpZHRoIG9yIC0xIGZvclxuXHQgKiB1bmxpbWl0ZWRcblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHRyZXNpemVNaW5XaWR0aDogbnVsbCxcblx0LyoqXG5cdCAqIE1pbiByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgaGFsZiB0ZXh0YXJlYSBoZWlnaHQgb3IgLTEgZm9yXG5cdCAqIHVubGltaXRlZFxuXHQgKlxuXHQgKiBAdHlwZSB7P251bWJlcn1cblx0ICovXG5cdHJlc2l6ZU1pbkhlaWdodDogbnVsbCxcblx0LyoqXG5cdCAqIE1heCByZXNpemUgdG8gaGVpZ2h0LCBzZXQgdG8gbnVsbCBmb3IgZG91YmxlIHRleHRhcmVhIGhlaWdodCBvciAtMVxuXHQgKiBmb3IgdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4SGVpZ2h0OiBudWxsLFxuXHQvKipcblx0ICogTWF4IHJlc2l6ZSB0byB3aWR0aCwgc2V0IHRvIG51bGwgZm9yIGRvdWJsZSB0ZXh0YXJlYSB3aWR0aCBvciAtMSBmb3Jcblx0ICogdW5saW1pdGVkXG5cdCAqXG5cdCAqIEB0eXBlIHs/bnVtYmVyfVxuXHQgKi9cblx0cmVzaXplTWF4V2lkdGg6IG51bGwsXG5cdC8qKlxuXHQgKiBJZiByZXNpemluZyBieSBoZWlnaHQgaXMgZW5hYmxlZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJlc2l6ZUhlaWdodDogdHJ1ZSxcblx0LyoqXG5cdCAqIElmIHJlc2l6aW5nIGJ5IHdpZHRoIGlzIGVuYWJsZWRcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZXNpemVXaWR0aDogdHJ1ZSxcblxuXHQvKipcblx0ICogRGF0ZSBmb3JtYXQsIHdpbGwgYmUgb3ZlcnJpZGRlbiBpZiBsb2NhbGUgc3BlY2lmaWVzIG9uZS5cblx0ICpcblx0ICogVGhlIHdvcmRzIHllYXIsIG1vbnRoIGFuZCBkYXkgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSB1c2VycyBjdXJyZW50XG5cdCAqIHllYXIsIG1vbnRoIGFuZCBkYXkuXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRkYXRlRm9ybWF0OiAneWVhci1tb250aC1kYXknLFxuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGluc2V0IHRoZSB0b29sYmFyIGludG8uXG5cdCAqXG5cdCAqIEB0eXBlIHtIVE1MRWxlbWVudH1cblx0ICovXG5cdHRvb2xiYXJDb250YWluZXI6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIGVuYWJsZSBwYXN0ZSBmaWx0ZXJpbmcuIFRoaXMgaXMgY3VycmVudGx5IGV4cGVyaW1lbnRhbCwgcGxlYXNlXG5cdCAqIHJlcG9ydCBhbnkgaXNzdWVzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGVuYWJsZVBhc3RlRmlsdGVyaW5nOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gY29tcGxldGVseSBkaXNhYmxlIHBhc3RpbmcgaW50byB0aGUgZWRpdG9yXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0ZGlzYWJsZVBhc3Rpbmc6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0aGUgZWRpdG9yIGlzIHJlYWQgb25seS5cblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRyZWFkT25seTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIHNldCB0aGUgZWRpdG9yIHRvIHJpZ2h0LXRvLWxlZnQgbW9kZS5cblx0ICpcblx0ICogSWYgc2V0IHRvIG51bGwgdGhlIGRpcmVjdGlvbiB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGV0ZWN0ZWQuXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0cnRsOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gYXV0byBmb2N1cyB0aGUgZWRpdG9yIG9uIHBhZ2UgbG9hZFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9mb2N1czogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGF1dG8gZm9jdXMgdGhlIGVkaXRvciB0byB0aGUgZW5kIG9mIHRoZSBjb250ZW50XG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0YXV0b2ZvY3VzRW5kOiB0cnVlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIGV4cGFuZCB0aGUgZWRpdG9yIHRvIGZpeCB0aGUgY29udGVudFxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGF1dG9FeHBhbmQ6IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBhdXRvIHVwZGF0ZSBvcmlnaW5hbCB0ZXh0Ym94IG9uIGJsdXJcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRhdXRvVXBkYXRlOiBmYWxzZSxcblxuXHQvKipcblx0ICogSWYgdG8gZW5hYmxlIHRoZSBicm93c2VycyBidWlsdCBpbiBzcGVsbCBjaGVja2VyXG5cdCAqXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3BlbGxjaGVjazogdHJ1ZSxcblxuXHQvKipcblx0ICogSWYgdG8gcnVuIHRoZSBzb3VyY2UgZWRpdG9yIHdoZW4gdGhlcmUgaXMgbm8gV1lTSVdZRyBzdXBwb3J0LiBPbmx5XG5cdCAqIHJlYWxseSBhcHBsaWVzIHRvIG1vYmlsZSBPUydzLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHJ1bldpdGhvdXRXeXNpd3lnU3VwcG9ydDogZmFsc2UsXG5cblx0LyoqXG5cdCAqIElmIHRvIGxvYWQgdGhlIGVkaXRvciBpbiBzb3VyY2UgbW9kZSBhbmQgc3RpbGwgYWxsb3cgc3dpdGNoaW5nXG5cdCAqIGJldHdlZW4gV1lTSVdZRyBhbmQgc291cmNlIG1vZGVcblx0ICpcblx0ICogQHR5cGUge2Jvb2xlYW59XG5cdCAqL1xuXHRzdGFydEluU291cmNlTW9kZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIE9wdGlvbmFsIElEIHRvIGdpdmUgdGhlIGVkaXRvci5cblx0ICpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdGlkOiBudWxsLFxuXG5cdC8qKlxuXHQgKiBDb21tYSBzZXBhcmF0ZWQgbGlzdCBvZiBwbHVnaW5zXG5cdCAqXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRwbHVnaW5zOiAnJyxcblxuXHQvKipcblx0ICogei1pbmRleCB0byBzZXQgdGhlIGVkaXRvciBjb250YWluZXIgdG8uIE5lZWRlZCBmb3IgalF1ZXJ5IFVJIGRpYWxvZy5cblx0ICpcblx0ICogQHR5cGUgez9udW1iZXJ9XG5cdCAqL1xuXHR6SW5kZXg6IG51bGwsXG5cblx0LyoqXG5cdCAqIElmIHRvIHRyaW0gdGhlIEJCQ29kZS4gUmVtb3ZlcyBhbnkgc3BhY2VzIGF0IHRoZSBzdGFydCBhbmQgZW5kIG9mIHRoZVxuXHQgKiBCQkNvZGUgc3RyaW5nLlxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGJiY29kZVRyaW06IGZhbHNlLFxuXG5cdC8qKlxuXHQgKiBJZiB0byBkaXNhYmxlIHJlbW92aW5nIGJsb2NrIGxldmVsIGVsZW1lbnRzIGJ5IHByZXNzaW5nIGJhY2tzcGFjZSBhdFxuXHQgKiB0aGUgc3RhcnQgb2YgdGhlbVxuXHQgKlxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdGRpc2FibGVCbG9ja1JlbW92ZTogZmFsc2UsXG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIGFsbG93ZWQgVVJMIChzaG91bGQgYmUgZWl0aGVyIHN0cmluZ3Mgb3IgcmVnZXgpIGZvciBpZnJhbWVzLlxuXHQgKlxuXHQgKiBJZiBpdCdzIGEgc3RyaW5nIHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3RhcnQgb2YgdGhlIHNyYyBtYXRjaGVzIHRoZVxuXHQgKiBzcGVjaWZpZWQgc3RyaW5nIHdpbGwgYmUgYWxsb3dlZC5cblx0ICpcblx0ICogSWYgaXQncyBhIHJlZ2V4IHRoZW4gaWZyYW1lcyB3aGVyZSB0aGUgc3JjIG1hdGNoZXMgdGhlIHJlZ2V4IHdpbGwgYmVcblx0ICogYWxsb3dlZC5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZElmcmFtZVVybHM6IFtdLFxuXG5cdC8qKlxuXHQgKiBCQkNvZGUgcGFyc2VyIG9wdGlvbnMsIG9ubHkgYXBwbGllcyBpZiB1c2luZyB0aGUgZWRpdG9yIGluIEJCQ29kZVxuXHQgKiBtb2RlLlxuXHQgKlxuXHQgKiBTZWUgRW1sRWRpdG9yLkJCQ29kZVBhcnNlci5kZWZhdWx0cyBmb3IgbGlzdCBvZiB2YWxpZCBvcHRpb25zXG5cdCAqXG5cdCAqIEB0eXBlIHtPYmplY3R9XG5cdCAqL1xuXHRwYXJzZXJPcHRpb25zOiB7IH0sXG5cblx0LyoqXG5cdCAqIENTUyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRvIGRyb3Bkb3duIG1lbnUgKGVnLiB6LWluZGV4KVxuXHQgKlxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKi9cblx0ZHJvcERvd25Dc3M6IHsgfSxcblxuXHQvKipcblx0ICogQW4gYXJyYXkgb2YgdGFncyB0aGF0IGFyZSBhbGxvd2VkIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYSB0YWcgaXMgbm90IGxpc3RlZCBoZXJlLCBpdCB3aWxsIGJlIHJlbW92ZWQgd2hlbiB0aGUgY29udGVudCBpc1xuXHQgKiBzYW5pdGl6ZWQuXG5cdCAqXG5cdCAqIDEgVGFnIGlzIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDogWydpZnJhbWUnXS4gTm8gbmVlZCB0byBhZGQgdGhpc1xuXHQgKiBmdXJ0aGVyLlxuXHQgKlxuXHQgKiBAdHlwZSB7QXJyYXl9XG5cdCAqL1xuXHRhbGxvd2VkVGFnczogW10sXG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIGF0dHJpYnV0ZXMgdGhhdCBhcmUgYWxsb3dlZCBvbiB0YWdzIGluIHRoZSBlZGl0b3IgY29udGVudC5cblx0ICogSWYgYW4gYXR0cmlidXRlIGlzIG5vdCBsaXN0ZWQgaGVyZSwgaXQgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhlIGNvbnRlbnRcblx0ICogaXMgc2FuaXRpemVkLlxuXHQgKlxuXHQgKiAzIEF0dHJpYnV0ZXMgYXJlIGFscmVhZHkgYWRkZWQgYnkgZGVmYXVsdDpcblx0ICogXHRbJ2FsbG93ZnVsbHNjcmVlbicsICdmcmFtZWJvcmRlcicsICd0YXJnZXQnXS5cblx0ICogTm8gbmVlZCB0byBhZGQgdGhlc2UgZnVydGhlci5cblx0ICpcblx0ICogQHR5cGUge0FycmF5fVxuXHQgKi9cblx0YWxsb3dlZEF0dHJpYnV0ZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0T3B0aW9ucztcbiIsImltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xyXG5cclxuLyoqXHJcbiAqIENhY2hlIG9mIGNhbWVsQ2FzZSBDU1MgcHJvcGVydHkgbmFtZXNcclxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XHJcbiAqL1xyXG52YXIgY3NzUHJvcGVydHlOYW1lQ2FjaGUgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGVsZW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRUxFTUVOVF9OT0RFID0gMTtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIHRleHQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgVEVYVF9OT0RFID0gMztcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgY29uc3RhbnQgZm9yIGNvbW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgQ09NTUVOVF9OT0RFID0gODtcclxuXHJcbi8qKlxyXG4gKiBOb2RlIHR5cGUgZG9jdW1lbnQgbm9kZXNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRE9DVU1FTlRfTk9ERSA9IDk7XHJcblxyXG4vKipcclxuICogTm9kZSB0eXBlIGNvbnN0YW50IGZvciBkb2N1bWVudCBmcmFnbWVudHNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbmV4cG9ydCB2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xyXG5cclxuZnVuY3Rpb24gdG9GbG9hdCh2YWx1ZSkge1xyXG5cdHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcblxyXG5cdHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyB2YWx1ZSA6IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGVsZW1lbnQgd2l0aCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZXNcclxuICpcclxuICogV2lsbCBjcmVhdGUgaXQgaW4gdGhlIGN1cnJlbnQgZG9jdW1lbnQgdW5sZXNzIGNvbnRleHRcclxuICogaXMgc3BlY2lmaWVkLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHRhZ1xyXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBbYXR0cmlidXRlc11cclxuICogQHBhcmFtIHshRG9jdW1lbnR9IFtjb250ZXh0XVxyXG4gKiBAcmV0dXJucyB7IUhUTUxFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBhdHRyaWJ1dGVzLCBjb250ZXh0KSB7XHJcblx0dmFyIG5vZGUgPSAoY29udGV4dCB8fCBkb2N1bWVudCkuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuXHR1dGlscy5lYWNoKGF0dHJpYnV0ZXMgfHwge30sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRpZiAoa2V5ID09PSAnc3R5bGUnKSB7XHJcblx0XHRcdG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlO1xyXG5cdFx0fSBlbHNlIGlmIChrZXkgaW4gbm9kZSkge1xyXG5cdFx0XHRub2RlW2tleV0gPSB2YWx1ZTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gbm9kZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgcGFyZW50cyB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7QXJyYXk8SFRNTEVsZW1lbnQ+fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudHMobm9kZSwgc2VsZWN0b3IpIHtcclxuXHR2YXIgcGFyZW50cyA9IFtdO1xyXG5cdHZhciBwYXJlbnQgPSBub2RlIHx8IHt9O1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSAmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHBhcmVudHMucHVzaChwYXJlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmVudHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBmaXJzdCBwYXJlbnQgbm9kZSB0aGF0IG1hdGNoZXMgdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gW3NlbGVjdG9yXVxyXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcmVudChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHZhciBwYXJlbnQgPSBub2RlIHx8IHt9O1xyXG5cclxuXHR3aGlsZSAoKHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlKSAmJiAhLyg5fDExKS8udGVzdChwYXJlbnQubm9kZVR5cGUpKSB7XHJcblx0XHRpZiAoIXNlbGVjdG9yIHx8IGlzKHBhcmVudCwgc2VsZWN0b3IpKSB7XHJcblx0XHRcdHJldHVybiBwYXJlbnQ7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIHRoZSBwYXNzZWQgbm9kZSBhbmQgYWxsIHBhcmVudHMgYW5kXHJcbiAqIHJldHVybnMgdGhlIGZpcnN0IG1hdGNoaW5nIG5vZGUgaWYgYW55LlxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHJldHVybiBpcyhub2RlLCBzZWxlY3RvcikgPyBub2RlIDogcGFyZW50KG5vZGUsIHNlbGVjdG9yKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSB0aGUgRE9NXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlKG5vZGUpIHtcclxuXHRpZiAobm9kZS5wYXJlbnROb2RlKSB7XHJcblx0XHRub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQXBwZW5kcyBjaGlsZCB0byBwYXJlbnQgbm9kZVxyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudCB8IERvY3VtZW50RnJhZ21lbnR9IG5vZGVcclxuICogQHBhcmFtIHtOb2RlIHwgSFRNTEVsZW1lbnQgfCBzdHJpbmcgfCBudWxsIH0gY2hpbGRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRDaGlsZChub2RlLCBjaGlsZCkge1xyXG5cdG5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG59XHJcblxyXG4vKipcclxuICogRmluZHMgYW55IGNoaWxkIG5vZGVzIHRoYXQgbWF0Y2ggdGhlIHNlbGVjdG9yXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50IHwgRG9jdW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJucyB7Tm9kZUxpc3R9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZmluZChub2RlLCBzZWxlY3Rvcikge1xyXG5cdHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG59XHJcblxyXG4vKipcclxuICogRm9yIG9uKCkgYW5kIG9mZigpIGlmIHRvIGFkZC9yZW1vdmUgdGhlIGV2ZW50XHJcbiAqIHRvIHRoZSBjYXB0dXJlIHBoYXNlXHJcbiAqXHJcbiAqIEB0eXBlIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBFVkVOVF9DQVBUVVJFID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBGb3Igb24oKSBhbmQgb2ZmKCkgaWYgdG8gYWRkL3JlbW92ZSB0aGUgZXZlbnRcclxuICogdG8gdGhlIGJ1YmJsZSBwaGFzZVxyXG4gKlxyXG4gKiBAdHlwZSB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgRVZFTlRfQlVCQkxFID0gZmFsc2U7XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEV2ZW50cyBzaG91bGQgYmUgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudHMuXHJcbiAqXHJcbiAqIElmIHNlbGVjdG9yIGlzIHNwZWNpZmllZCB0aGUgaGFuZGxlciB3aWxsIG9ubHkgYmVcclxuICogY2FsbGVkIHdoZW4gdGhlIGV2ZW50IHRhcmdldCBtYXRjaGVzIHRoZSBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHshTm9kZSB8IEhUTUxFbGVtZW50IHwgV2luZG93fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudHNcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHBhcmFtIHtmdW5jdGlvbiguLi5hbnkpfVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtjYXB0dXJlPWZhbHNlXVxyXG4gKiBAc2VlIG9mZigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb24obm9kZSwgZXZlbnRzLCBzZWxlY3RvciwgZm4sIGNhcHR1cmUpIHtcclxuXHRldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0dmFyIGhhbmRsZXI7XHJcblxyXG5cdFx0aWYgKHV0aWxzLmlzU3RyaW5nKHNlbGVjdG9yKSkge1xyXG5cdFx0XHRoYW5kbGVyID0gZm5bJ19lbWwtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdIHx8IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cdFx0XHRcdHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBub2RlKSB7XHJcblx0XHRcdFx0XHRpZiAoaXModGFyZ2V0LCBzZWxlY3RvcikpIHtcclxuXHRcdFx0XHRcdFx0Zm4uY2FsbCh0YXJnZXQsIGUpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Zm5bJ19lbWwtZXZlbnQtJyArIGV2ZW50ICsgc2VsZWN0b3JdID0gaGFuZGxlcjtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZXIgPSBmbjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUgfHwgZmFsc2UpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lciBmb3IgdGhlIHNwZWNpZmllZCBldmVudHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IU5vZGUgfCBIVE1MRWxlbWVudCB8IFdpbmRvd30gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oT2JqZWN0KX0gZm5cclxuICogQHBhcmFtIHtib29sZWFufSBbY2FwdHVyZT1mYWxzZV1cclxuICogQHNlZSBvbigpXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gb2ZmKG5vZGUsIGV2ZW50cywgc2VsZWN0b3IsIGZuLCBjYXB0dXJlKSB7XHJcblx0ZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdHZhciBoYW5kbGVyO1xyXG5cclxuXHRcdGlmICh1dGlscy5pc1N0cmluZyhzZWxlY3RvcikpIHtcclxuXHRcdFx0aGFuZGxlciA9IGZuWydfZW1sLWV2ZW50LScgKyBldmVudCArIHNlbGVjdG9yXTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhhbmRsZXIgPSBmbjtcclxuXHRcdH1cclxuXHJcblx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIGNhcHR1cmUgfHwgZmFsc2UpO1xyXG5cdH0pO1xyXG59XHJcblxyXG4vKipcclxuICogSWYgb25seSBhdHRyIHBhcmFtIGlzIHNwZWNpZmllZCBpdCB3aWxsIGdldFxyXG4gKiB0aGUgdmFsdWUgb2YgdGhlIGF0dHIgcGFyYW0uXHJcbiAqXHJcbiAqIElmIHZhbHVlIGlzIHNwZWNpZmllZCBidXQgbnVsbCB0aGUgYXR0cmlidXRlXHJcbiAqIHdpbGwgYmUgcmVtb3ZlZCBvdGhlcndpc2UgdGhlIGF0dHIgdmFsdWUgd2lsbFxyXG4gKiBiZSBzZXQgdG8gdGhlIHBhc3NlZCB2YWx1ZS5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBhdHRyXHJcbiAqIEBwYXJhbSB7P3N0cmluZ30gW3ZhbHVlXVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGF0dHIobm9kZSwgYXR0ciwgdmFsdWUpIHtcclxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcclxuXHRcdHJldHVybiBub2RlLmdldEF0dHJpYnV0ZShhdHRyKTtcclxuXHR9XHJcblxyXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXEsIG5vLWVxLW51bGxcclxuXHRpZiAodmFsdWUgPT0gbnVsbCkge1xyXG5cdFx0cmVtb3ZlQXR0cihub2RlLCBhdHRyKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0bm9kZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGVcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHshc3RyaW5nfSBhdHRyXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXR0cihub2RlLCBhdHRyKSB7XHJcblx0bm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBwYXNzZWQgZWxlbWVudHMgZGlzcGxheSB0byBub25lXHJcbiAqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGlkZShub2RlKSB7XHJcblx0Y3NzKG5vZGUsICdkaXNwbGF5JywgJ25vbmUnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHBhc3NlZCBlbGVtZW50cyBkaXNwbGF5IHRvIGRlZmF1bHRcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93KG5vZGUpIHtcclxuXHRjc3Mobm9kZSwgJ2Rpc3BsYXknLCAnJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGFuIGVsZW1lbnRzIHZpc2liaWxpdHlcclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGUobm9kZSkge1xyXG5cdGlmIChpc1Zpc2libGUobm9kZSkpIHtcclxuXHRcdGhpZGUobm9kZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHNob3cobm9kZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBhIGNvbXB1dGVkIENTUyB2YWx1ZXMgb3Igc2V0cyBhbiBpbmxpbmUgQ1NTIHZhbHVlXHJcbiAqXHJcbiAqIFJ1bGVzIHNob3VsZCBiZSBpbiBjYW1lbENhc2UgZm9ybWF0IGFuZCBub3RcclxuICogaHlwaGVuYXRlZCBsaWtlIENTUyBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge2FueX0gbm9kZVxyXG4gKiBAcGFyYW0ge2FueX0gcnVsZVxyXG4gKiBAcGFyYW0ge2FueX0gW3ZhbHVlXVxyXG4gKiBAcmV0dXJuIHthbnl9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3NzKG5vZGUsIHJ1bGUsIHZhbHVlKSB7XHJcblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XHJcblx0XHRpZiAodXRpbHMuaXNTdHJpbmcocnVsZSkpIHtcclxuXHRcdFx0cmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IDEgPyBnZXRDb21wdXRlZFN0eWxlKG5vZGUpW3J1bGVdIDogbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHR1dGlscy5lYWNoKHJ1bGUsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcblx0XHRcdGNzcyhub2RlLCBrZXksIHZhbHVlKTtcclxuXHRcdH0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQvLyBpc05hTiByZXR1cm5zIGZhbHNlIGZvciBudWxsLCBmYWxzZSBhbmQgZW1wdHkgc3RyaW5nc1xyXG5cdFx0Ly8gc28gbmVlZCB0byBjaGVjayBpdCdzIHRydXRoeSBvciAwXHJcblx0XHR2YXIgaXNOdW1lcmljID0gKHZhbHVlIHx8IHZhbHVlID09PSAwKSAmJiAhaXNOYU4odmFsdWUpO1xyXG5cdFx0bm9kZS5zdHlsZVtydWxlXSA9IGlzTnVtZXJpYyA/IHZhbHVlICsgJ3B4JyA6IHZhbHVlO1xyXG5cdH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXRzIG9yIHNldHMgdGhlIGRhdGEgYXR0cmlidXRlcyBvbiBhIG5vZGVcclxuICpcclxuICogVW5saWtlIHRoZSBqUXVlcnkgdmVyc2lvbiB0aGlzIG9ubHkgc3RvcmVzIGRhdGFcclxuICogaW4gdGhlIERPTSBhdHRyaWJ1dGVzIHdoaWNoIG1lYW5zIG9ubHkgc3RyaW5nc1xyXG4gKiBjYW4gYmUgc3RvcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm4ge09iamVjdHx1bmRlZmluZWR9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGF0YShub2RlLCBrZXksIHZhbHVlKSB7XHJcblx0dmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG5cdHZhciBkYXRhID0ge307XHJcblxyXG5cdGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdGlmIChhcmdzTGVuZ3RoID09PSAxKSB7XHJcblx0XHRcdHV0aWxzLmVhY2gobm9kZS5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoXywgYXR0cikge1xyXG5cdFx0XHRcdGlmICgvXmRhdGEtL2kudGVzdChhdHRyLm5hbWUpKSB7XHJcblx0XHRcdFx0XHRkYXRhW2F0dHIubmFtZS5zdWJzdHIoNSldID0gYXR0ci52YWx1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0cmV0dXJuIGRhdGE7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGFyZ3NMZW5ndGggPT09IDIpIHtcclxuXHRcdFx0cmV0dXJuIGF0dHIobm9kZSwgJ2RhdGEtJyArIGtleSk7XHJcblx0XHR9XHJcblxyXG5cdFx0YXR0cihub2RlLCAnZGF0YS0nICsga2V5LCBTdHJpbmcodmFsdWUpKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgbm9kZSBtYXRjaGVzIHRoZSBnaXZlbiBzZWxlY3Rvci5cclxuICpcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnQgfCBDaGlsZE5vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzKG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0dmFyIHJlc3VsdCA9IGZhbHNlO1xyXG5cclxuXHRpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJlc3VsdCA9IChub2RlLm1hdGNoZXMgfHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvciB8fFxyXG5cdFx0XHRub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzZWxlY3Rvcik7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBub2RlIGNvbnRhaW5zIGNoaWxkIG90aGVyd2lzZSBmYWxzZS5cclxuICpcclxuICogVGhpcyBkaWZmZXJzIGZyb20gdGhlIERPTSBjb250YWlucygpIG1ldGhvZCBpbiB0aGF0XHJcbiAqIGlmIG5vZGUgYW5kIGNoaWxkIGFyZSBlcXVhbCB0aGlzIHdpbGwgcmV0dXJuIGZhbHNlLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNoaWxkXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zKG5vZGUsIGNoaWxkKSB7XHJcblx0cmV0dXJuIG5vZGUgIT09IGNoaWxkICYmIG5vZGUuY29udGFpbnMgJiYgbm9kZS5jb250YWlucyhjaGlsZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IFtzZWxlY3Rvcl1cclxuICogQHJldHVybnMgez9IVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmV2aW91c0VsZW1lbnRTaWJsaW5nKG5vZGUsIHNlbGVjdG9yKSB7XHJcblx0dmFyIHByZXYgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcblxyXG5cdGlmIChzZWxlY3RvciAmJiBwcmV2KSB7XHJcblx0XHRyZXR1cm4gaXMocHJldiwgc2VsZWN0b3IpID8gcHJldiA6IG51bGw7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcHJldjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcclxuICogQHBhcmFtIHshTm9kZX0gcmVmTm9kZVxyXG4gKiBAcmV0dXJucyB7Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSkge1xyXG5cdHJldHVybiByZWZOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZk5vZGUpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybnMgeyFBcnJheS48c3RyaW5nPn1cclxuICovXHJcbmZ1bmN0aW9uIGNsYXNzZXMobm9kZSkge1xyXG5cdHJldHVybiBub2RlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoL1xccysvKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7P0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSB7XHJcblx0cmV0dXJuIGlzKG5vZGUsICcuJyArIGNsYXNzTmFtZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSB7XHJcblx0dmFyIGNsYXNzTGlzdCA9IGNsYXNzZXMobm9kZSk7XHJcblxyXG5cdGlmIChjbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpIDwgMCkge1xyXG5cdFx0Y2xhc3NMaXN0LnB1c2goY2xhc3NOYW1lKTtcclxuXHR9XHJcblxyXG5cdG5vZGUuY2xhc3NOYW1lID0gY2xhc3NMaXN0LmpvaW4oJyAnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7IUhUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzcyhub2RlLCBjbGFzc05hbWUpIHtcclxuXHR2YXIgY2xhc3NMaXN0ID0gY2xhc3Nlcyhub2RlKTtcclxuXHJcblx0dXRpbHMuYXJyYXlSZW1vdmUoY2xhc3NMaXN0LCBjbGFzc05hbWUpO1xyXG5cclxuXHRub2RlLmNsYXNzTmFtZSA9IGNsYXNzTGlzdC5qb2luKCcgJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUb2dnbGVzIGEgY2xhc3Mgb24gbm9kZS5cclxuICpcclxuICogSWYgc3RhdGUgaXMgc3BlY2lmaWVkIGFuZCBpcyB0cnV0aHkgaXQgd2lsbCBhZGRcclxuICogdGhlIGNsYXNzLlxyXG4gKlxyXG4gKiBJZiBzdGF0ZSBpcyBzcGVjaWZpZWQgYW5kIGlzIGZhbHNleSBpdCB3aWxsIHJlbW92ZVxyXG4gKiB0aGUgY2xhc3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzdGF0ZV1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDbGFzcyhub2RlLCBjbGFzc05hbWUsIHN0YXRlKSB7XHJcblx0c3RhdGUgPSB1dGlscy5pc1VuZGVmaW5lZChzdGF0ZSkgPyAhaGFzQ2xhc3Mobm9kZSwgY2xhc3NOYW1lKSA6IHN0YXRlO1xyXG5cclxuXHRpZiAoc3RhdGUpIHtcclxuXHRcdGFkZENsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlbW92ZUNsYXNzKG5vZGUsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSB3aWR0aCBvZiB0aGUgcGFzc2VkIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfSBbdmFsdWVdXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoKG5vZGUsIHZhbHVlKSB7XHJcblx0aWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xyXG5cdFx0dmFyIGNzID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcclxuXHRcdHZhciBwYWRkaW5nID0gdG9GbG9hdChjcy5wYWRkaW5nTGVmdCkgKyB0b0Zsb2F0KGNzLnBhZGRpbmdSaWdodCk7XHJcblx0XHR2YXIgYm9yZGVyID0gdG9GbG9hdChjcy5ib3JkZXJMZWZ0V2lkdGgpICsgdG9GbG9hdChjcy5ib3JkZXJSaWdodFdpZHRoKTtcclxuXHJcblx0XHRyZXR1cm4gbm9kZS5vZmZzZXRXaWR0aCAtIHBhZGRpbmcgLSBib3JkZXI7XHJcblx0fVxyXG5cclxuXHRjc3Mobm9kZSwgJ3dpZHRoJywgdmFsdWUpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyBvciBzZXRzIHRoZSBoZWlnaHQgb2YgdGhlIHBhc3NlZCBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXHJcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gW3ZhbHVlXVxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfHVuZGVmaW5lZH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQobm9kZSwgdmFsdWUpIHtcclxuXHRpZiAodXRpbHMuaXNVbmRlZmluZWQodmFsdWUpKSB7XHJcblx0XHR2YXIgY3MgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG5cdFx0dmFyIHBhZGRpbmcgPSB0b0Zsb2F0KGNzLnBhZGRpbmdUb3ApICsgdG9GbG9hdChjcy5wYWRkaW5nQm90dG9tKTtcclxuXHRcdHZhciBib3JkZXIgPSB0b0Zsb2F0KGNzLmJvcmRlclRvcFdpZHRoKSArIHRvRmxvYXQoY3MuYm9yZGVyQm90dG9tV2lkdGgpO1xyXG5cclxuXHRcdHJldHVybiBub2RlLm9mZnNldEhlaWdodCAtIHBhZGRpbmcgLSBib3JkZXI7XHJcblx0fVxyXG5cclxuXHRjc3Mobm9kZSwgJ2hlaWdodCcsIHZhbHVlKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXJzIGEgY3VzdG9tIGV2ZW50IHdpdGggdGhlIHNwZWNpZmllZCBuYW1lIGFuZFxyXG4gKiBzZXRzIHRoZSBkZXRhaWwgcHJvcGVydHkgdG8gdGhlIGRhdGEgb2JqZWN0IHBhc3NlZC5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyKG5vZGUsIGV2ZW50TmFtZSwgZGF0YSkge1xyXG5cdHZhciBldmVudDtcclxuXHJcblx0aWYgKHV0aWxzLmlzRnVuY3Rpb24od2luZG93LkN1c3RvbUV2ZW50KSkge1xyXG5cdFx0ZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7XHJcblx0XHRcdGJ1YmJsZXM6IHRydWUsXHJcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXHJcblx0XHRcdGRldGFpbDogZGF0YVxyXG5cdFx0fSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGV2ZW50ID0gbm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xyXG5cdFx0ZXZlbnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XHJcblx0fVxyXG5cclxuXHRub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBpZiBhIG5vZGUgaXMgdmlzaWJsZS5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH1cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNWaXNpYmxlKG5vZGUpIHtcclxuXHRyZXR1cm4gISFub2RlLmdldENsaWVudFJlY3RzKCkubGVuZ3RoO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydCBDU1MgcHJvcGVydHkgbmFtZXMgaW50byBjYW1lbCBjYXNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHJpbmcpIHtcclxuXHRyZXR1cm4gc3RyaW5nXHJcblx0XHQucmVwbGFjZSgvXi1tcy0vLCAnbXMtJylcclxuXHRcdC5yZXBsYWNlKC8tKFxcdykvZywgZnVuY3Rpb24gKG1hdGNoLCBjaGFyKSB7XHJcblx0XHRcdHJldHVybiBjaGFyLnRvVXBwZXJDYXNlKCk7XHJcblx0XHR9KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBMb29wIGFsbCBjaGlsZCBub2RlcyBvZiB0aGUgcGFzc2VkIG5vZGVcclxuICpcclxuICogVGhlIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgMSBwYXJhbWV0ZXIgYmVpbmcgdGhlIG5vZGUuXHJcbiAqIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIGZhbHNlIHRoZSBsb29wIHdpbGwgYmUgZXhpdGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbm9kZVxyXG4gKiBAcGFyYW0gIHtmdW5jdGlvbn0gZnVuYyAgICAgICAgICAgQ2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIHdpdGggZXZlcnlcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkIG5vZGUgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LlxyXG4gKiBAcGFyYW0gIHtib29sZWFufSBpbm5lcm1vc3RGaXJzdCAgSWYgdGhlIGlubmVybW9zdCBub2RlIHNob3VsZCBiZSBwYXNzZWRcclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIHRoZSBmdW5jdGlvbiBiZWZvcmUgaXQncyBwYXJlbnRzLlxyXG4gKiBAcGFyYW0gIHtib29sZWFufSBzaWJsaW5nc09ubHkgICAgSWYgdG8gb25seSB0cmF2ZXJzZSB0aGUgbm9kZXMgc2libGluZ3NcclxuICogQHBhcmFtICB7Ym9vbGVhbn0gW3JldmVyc2U9ZmFsc2VdIElmIHRvIHRyYXZlcnNlIHRoZSBub2RlcyBpbiByZXZlcnNlXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LXBhcmFtc1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2Uobm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSwgcmV2ZXJzZSkge1xyXG5cdG5vZGUgPSByZXZlcnNlID8gbm9kZS5sYXN0Q2hpbGQgOiBub2RlLmZpcnN0Q2hpbGQ7XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHR2YXIgbmV4dCA9IHJldmVyc2UgPyBub2RlLnByZXZpb3VzU2libGluZyA6IG5vZGUubmV4dFNpYmxpbmc7XHJcblxyXG5cdFx0aWYgKFxyXG5cdFx0XHQoIWlubmVybW9zdEZpcnN0ICYmIGZ1bmMobm9kZSkgPT09IGZhbHNlKSB8fFxyXG5cdFx0XHQoIXNpYmxpbmdzT25seSAmJiB0cmF2ZXJzZShcclxuXHRcdFx0XHRub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5LCByZXZlcnNlXHJcblx0XHRcdCkgPT09IGZhbHNlKSB8fFxyXG5cdFx0XHQoaW5uZXJtb3N0Rmlyc3QgJiYgZnVuYyhub2RlKSA9PT0gZmFsc2UpXHJcblx0XHQpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdG5vZGUgPSBuZXh0O1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIExpa2UgdHJhdmVyc2UgYnV0IGxvb3BzIGluIHJldmVyc2VcclxuICogQHNlZSB0cmF2ZXJzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJUcmF2ZXJzZShub2RlLCBmdW5jLCBpbm5lcm1vc3RGaXJzdCwgc2libGluZ3NPbmx5KSB7XHJcblx0dHJhdmVyc2Uobm9kZSwgZnVuYywgaW5uZXJtb3N0Rmlyc3QsIHNpYmxpbmdzT25seSwgdHJ1ZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgSFRNTCBpbnRvIGEgZG9jdW1lbnQgZnJhZ21lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcclxuICogQHBhcmFtIHtEb2N1bWVudH0gW2NvbnRleHRdXHJcbiAqIEBzaW5jZSAxLjQuNFxyXG4gKiBAcmV0dXJuIHtEb2N1bWVudEZyYWdtZW50fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSFRNTChodG1sLCBjb250ZXh0KSB7XHJcblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblxyXG5cdHZhclx0cmV0ID0gY29udGV4dC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblx0dmFyIHRtcCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHt9LCBjb250ZXh0KTtcclxuXHJcblx0dG1wLmlubmVySFRNTCA9IGh0bWw7XHJcblxyXG5cdHdoaWxlICh0bXAuZmlyc3RDaGlsZCkge1xyXG5cdFx0YXBwZW5kQ2hpbGQocmV0LCB0bXAuZmlyc3RDaGlsZCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmV0O1xyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGFueSBzdHlsaW5nLlxyXG4gKlxyXG4gKiBJdCBoYXMgc3R5bGluZyBpZiBpdCBpcyBub3QgYSBwbGFpbiA8ZGl2PiBvciA8cD4gb3JcclxuICogaWYgaXQgaGFzIGEgY2xhc3MsIHN0eWxlIGF0dHJpYnV0ZSBvciBkYXRhLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxtXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqIEBzaW5jZSAxLjQuNFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc1N0eWxpbmcobm9kZSkge1xyXG5cdHJldHVybiBub2RlICYmICghaXMobm9kZSwgJ3AsZGl2JykgfHwgbm9kZS5jbGFzc05hbWUgfHxcclxuXHRcdGF0dHIobm9kZSwgJ3N0eWxlJykgfHwgIXV0aWxzLmlzRW1wdHlPYmplY3QoZGF0YShub2RlKSkpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYW4gZWxlbWVudCBmcm9tIG9uZSB0eXBlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIEZvciBleGFtcGxlIGl0IGNhbiBjb252ZXJ0IHRoZSBlbGVtZW50IDxiPiB0byA8c3Ryb25nPlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgdG9UYWdOYW1lXHJcbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG4gKiBAc2luY2UgMS40LjRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RWxlbWVudChlbGVtZW50LCB0b1RhZ05hbWUpIHtcclxuXHR2YXIgbmV3RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQodG9UYWdOYW1lLCB7fSwgZWxlbWVudC5vd25lckRvY3VtZW50KTtcclxuXHJcblx0dXRpbHMuZWFjaChlbGVtZW50LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChfLCBhdHRyaWJ1dGUpIHtcclxuXHRcdC8vIFNvbWUgYnJvd3NlcnMgcGFyc2UgaW52YWxpZCBhdHRyaWJ1dGVzIG5hbWVzIGxpa2VcclxuXHRcdC8vICdzaXplXCIyJyB3aGljaCB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBzZXQsIGp1c3RcclxuXHRcdC8vIGlnbm9yZSB0aGVzZS5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGF0dHIobmV3RWxlbWVudCwgYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XHJcblx0XHR9IGNhdGNoIChleCkgeyAvKiBlbXB0eSAqLyB9XHJcblx0fSk7XHJcblxyXG5cdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdGFwcGVuZENoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0fVxyXG5cclxuXHRlbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0VsZW1lbnQsIGVsZW1lbnQpO1xyXG5cclxuXHRyZXR1cm4gbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgYmxvY2sgbGV2ZWwgZWxlbWVudHMgc2VwYXJhdGVkIGJ5IGJhcnMgKHwpXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgdmFyIGJsb2NrTGV2ZWxMaXN0ID0gJ3xib2R5fGhyfHB8ZGl2fGgxfGgyfGgzfGg0fGg1fGg2fGFkZHJlc3N8cHJlfCcgK1xyXG5cdCdmb3JtfHRhYmxlfHRib2R5fHRoZWFkfHRmb290fHRofHRyfHRkfGxpfG9sfHVsfGJsb2NrcXVvdGV8Y2VudGVyfCcgK1xyXG5cdCdkZXRhaWxzfHNlY3Rpb258YXJ0aWNsZXxhc2lkZXxuYXZ8bWFpbnxoZWFkZXJ8aGdyb3VwfGZvb3RlcnxmaWVsZHNldHwnICtcclxuXHQnZGx8ZHR8ZGR8ZmlndXJlfGZpZ2NhcHRpb258JztcclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIGVsZW1lbnRzIHRoYXQgZG8gbm90IGFsbG93IGNoaWxkcmVuIHNlcGFyYXRlZCBieSBiYXJzICh8KVxyXG4gKlxyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogQHNpbmNlICAxLjQuNVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbkhhdmVDaGlsZHJlbihub2RlKSB7XHJcblx0Ly8gMSAgPSBFbGVtZW50XHJcblx0Ly8gOSAgPSBEb2N1bWVudFxyXG5cdC8vIDExID0gRG9jdW1lbnQgRnJhZ21lbnRcclxuXHRpZiAoIS8xMT98OS8udGVzdChub2RlLm5vZGVUeXBlKSkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0Ly8gTGlzdCBvZiBlbXB0eSBIVE1MIHRhZ3Mgc2VwYXJhdGVkIGJ5IGJhciAofCkgY2hhcmFjdGVyLlxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvaW5kZXgvZWxlbWVudHMuaHRtbFxyXG5cdC8vIFNvdXJjZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xyXG5cdHJldHVybiAoJ3xpZnJhbWV8YXJlYXxiYXNlfGJhc2Vmb250fGJyfGNvbHxmcmFtZXxocnxpbWd8aW5wdXR8d2JyJyArXHJcblx0XHQnfGlzaW5kZXh8bGlua3xtZXRhfHBhcmFtfGNvbW1hbmR8ZW1iZWR8a2V5Z2VufHNvdXJjZXx0cmFja3wnICtcclxuXHRcdCdvYmplY3R8JykuaW5kZXhPZignfCcgKyBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgKyAnfCcpIDwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGlzIGlubGluZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgYW55fSBlbG1cclxuICogQHBhcmFtIHtib29sZWFufSBbaW5jbHVkZUNvZGVBc0Jsb2NrPWZhbHNlXVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzSW5saW5lKGVsbSwgaW5jbHVkZUNvZGVBc0Jsb2NrKSB7XHJcblx0dmFyIHRhZ05hbWUsXHJcblx0XHRub2RlVHlwZSA9IChlbG0gfHwge30pLm5vZGVUeXBlIHx8IFRFWFRfTk9ERTtcclxuXHJcblx0aWYgKG5vZGVUeXBlICE9PSBFTEVNRU5UX05PREUpIHtcclxuXHRcdHJldHVybiBub2RlVHlwZSA9PT0gVEVYVF9OT0RFO1xyXG5cdH1cclxuXHJcblx0dGFnTmFtZSA9IGVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdGlmICh0YWdOYW1lID09PSAnY29kZScpIHtcclxuXHRcdHJldHVybiAhaW5jbHVkZUNvZGVBc0Jsb2NrO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGJsb2NrTGV2ZWxMaXN0LmluZGV4T2YoJ3wnICsgdGFnTmFtZSArICd8JykgPCAwO1xyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0aGUgQ1NTIGZyb20gMSBub2RlIHRvIGFub3RoZXIuXHJcbiAqXHJcbiAqIE9ubHkgY29waWVzIENTUyBkZWZpbmVkIG9uIHRoZSBlbGVtZW50IGUuZy4gc3R5bGUgYXR0ci5cclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZnJvbVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b1xyXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2My4xLjBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5Q1NTKGZyb20sIHRvKSB7XHJcblx0aWYgKHRvLnN0eWxlICYmIGZyb20uc3R5bGUpIHtcclxuXHRcdHRvLnN0eWxlLmNzc1RleHQgPSBmcm9tLnN0eWxlLmNzc1RleHQgKyB0by5zdHlsZS5jc3NUZXh0O1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhIERPTSBub2RlIGlzIGVtcHR5XHJcbiAqXHJcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG5vZGUpIHtcclxuXHRpZiAobm9kZS5sYXN0Q2hpbGQgJiYgaXNFbXB0eShub2RlLmxhc3RDaGlsZCkpIHtcclxuXHRcdHJlbW92ZShub2RlLmxhc3RDaGlsZCk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gMyA/ICFub2RlLm5vZGVWYWx1ZSA6XHJcblx0XHQoY2FuSGF2ZUNoaWxkcmVuKG5vZGUpICYmICFub2RlLmNoaWxkTm9kZXMubGVuZ3RoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpeGVzIGJsb2NrIGxldmVsIGVsZW1lbnRzIGluc2lkZSBpbiBpbmxpbmUgZWxlbWVudHMuXHJcbiAqXHJcbiAqIEFsc28gZml4ZXMgaW52YWxpZCBsaXN0IG5lc3RpbmcgYnkgcGxhY2luZyBuZXN0ZWQgbGlzdHNcclxuICogaW5zaWRlIHRoZSBwcmV2aW91cyBsaSB0YWcgb3Igd3JhcHBpbmcgdGhlbSBpbiBhbiBsaSB0YWcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXhOZXN0aW5nKG5vZGUpIHtcclxuXHR0cmF2ZXJzZShub2RlLCBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0dmFyIGxpc3QgPSAndWwsb2wnLFxyXG5cdFx0XHRpc0Jsb2NrID0gIWlzSW5saW5lKG5vZGUsIHRydWUpICYmIG5vZGUubm9kZVR5cGUgIT09IENPTU1FTlRfTk9ERSxcclxuXHRcdFx0cGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cclxuXHRcdC8vIEFueSBibG9ja2xldmVsIGVsZW1lbnQgaW5zaWRlIGFuIGlubGluZSBlbGVtZW50IG5lZWRzIGZpeGluZy5cclxuXHRcdC8vIEFsc28gPHA+IHRhZ3MgdGhhdCBjb250YWluIGJsb2NrcyBzaG91bGQgYmUgZml4ZWRcclxuXHRcdGlmIChpc0Jsb2NrICYmIChpc0lubGluZShwYXJlbnQsIHRydWUpIHx8IHBhcmVudC50YWdOYW1lID09PSAnUCcpKSB7XHJcblx0XHRcdC8vIEZpbmQgdGhlIGxhc3QgaW5saW5lIHBhcmVudCBub2RlXHJcblx0XHRcdHZhclx0bGFzdElubGluZVBhcmVudCA9IG5vZGU7XHJcblx0XHRcdHdoaWxlIChpc0lubGluZShsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGUsIHRydWUpIHx8XHJcblx0XHRcdFx0bGFzdElubGluZVBhcmVudC5wYXJlbnROb2RlLnRhZ05hbWUgPT09ICdQJykge1xyXG5cdFx0XHRcdGxhc3RJbmxpbmVQYXJlbnQgPSBsYXN0SW5saW5lUGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBiZWZvcmUgPSBleHRyYWN0Q29udGVudHMobGFzdElubGluZVBhcmVudCwgbm9kZSk7XHJcblx0XHRcdHZhciBtaWRkbGUgPSBub2RlO1xyXG5cclxuXHRcdFx0Ly8gQ2xvbmUgaW5saW5lIHN0eWxpbmcgYW5kIGFwcGx5IGl0IHRvIHRoZSBibG9ja3MgY2hpbGRyZW5cclxuXHRcdFx0d2hpbGUgKHBhcmVudCAmJiBpc0lubGluZShwYXJlbnQsIHRydWUpKSB7XHJcblx0XHRcdFx0aWYgKHBhcmVudC5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRcdFx0XHR2YXIgY2xvbmUgPSBwYXJlbnQuY2xvbmVOb2RlKCk7XHJcblx0XHRcdFx0XHR3aGlsZSAobWlkZGxlLmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0XHRcdFx0YXBwZW5kQ2hpbGQoY2xvbmUsIG1pZGRsZS5maXJzdENoaWxkKTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRhcHBlbmRDaGlsZChtaWRkbGUsIGNsb25lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGluc2VydEJlZm9yZShtaWRkbGUsIGxhc3RJbmxpbmVQYXJlbnQpO1xyXG5cdFx0XHRpZiAoIWlzRW1wdHkoYmVmb3JlKSkge1xyXG5cdFx0XHRcdGluc2VydEJlZm9yZShiZWZvcmUsIG1pZGRsZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGlzRW1wdHkobGFzdElubGluZVBhcmVudCkpIHtcclxuXHRcdFx0XHRyZW1vdmUobGFzdElubGluZVBhcmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBGaXggaW52YWxpZCBuZXN0ZWQgbGlzdHMgd2hpY2ggc2hvdWxkIGJlIHdyYXBwZWQgaW4gYW4gbGkgdGFnXHJcblx0XHRpZiAoaXNCbG9jayAmJiBpcyhub2RlLCBsaXN0KSAmJiBpcyhub2RlLnBhcmVudE5vZGUsIGxpc3QpKSB7XHJcblx0XHRcdHZhciBsaSA9IHByZXZpb3VzRWxlbWVudFNpYmxpbmcobm9kZSwgJ2xpJyk7XHJcblxyXG5cdFx0XHRpZiAoIWxpKSB7XHJcblx0XHRcdFx0bGkgPSBjcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cdFx0XHRcdGluc2VydEJlZm9yZShsaSwgbm9kZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGFwcGVuZENoaWxkKGxpLCBub2RlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZpbmRzIHRoZSBjb21tb24gcGFyZW50IG9mIHR3byBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0geyFIVE1MRWxlbWVudH0gbm9kZTFcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IG5vZGUyXHJcbiAqIEByZXR1cm4gez9IVE1MRWxlbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ29tbW9uQW5jZXN0b3Iobm9kZTEsIG5vZGUyKSB7XHJcblx0d2hpbGUgKChub2RlMSA9IG5vZGUxLnBhcmVudE5vZGUpKSB7XHJcblx0XHRpZiAoY29udGFpbnMobm9kZTEsIG5vZGUyKSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZTE7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHs/Tm9kZX1cclxuICogQHBhcmFtIHtib29sZWFufSBbcHJldmlvdXM9ZmFsc2VdXHJcbiAqIEByZXR1cm5zIHs/Tm9kZX1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTaWJsaW5nKG5vZGUsIHByZXZpb3VzKSB7XHJcblx0aWYgKCFub2RlKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiAocHJldmlvdXMgPyBub2RlLnByZXZpb3VzU2libGluZyA6IG5vZGUubmV4dFNpYmxpbmcpIHx8XHJcblx0XHRnZXRTaWJsaW5nKG5vZGUucGFyZW50Tm9kZSwgcHJldmlvdXMpO1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyB1bnVzZWQgd2hpdGVzcGFjZSBmcm9tIHRoZSByb290IGFuZCBhbGwgaXQncyBjaGlsZHJlbi5cclxuICpcclxuICogQHBhcmFtIHshSFRNTEVsZW1lbnR9IHJvb3RcclxuICogQHNpbmNlIDEuNC4zXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlV2hpdGVTcGFjZShyb290KSB7XHJcblx0dmFyXHRub2RlVmFsdWUsIG5vZGVUeXBlLCBuZXh0LCBwcmV2aW91cywgcHJldmlvdXNTaWJsaW5nLFxyXG5cdFx0bmV4dE5vZGUsIHRyaW1TdGFydCxcclxuXHRcdGNzc1doaXRlU3BhY2UgPSBjc3Mocm9vdCwgJ3doaXRlU3BhY2UnKSxcclxuXHRcdC8vIFByZXNlcnZlIG5ld2xpbmVzIGlmIGlzIHByZS1saW5lXHJcblx0XHRwcmVzZXJ2ZU5ld0xpbmVzID0gL2xpbmUkL2kudGVzdChjc3NXaGl0ZVNwYWNlKSxcclxuXHRcdG5vZGUgPSByb290LmZpcnN0Q2hpbGQ7XHJcblxyXG5cdC8vIFNraXAgcHJlICYgcHJlLXdyYXAgd2l0aCBhbnkgdmVuZG9yIHByZWZpeFxyXG5cdGlmICgvcHJlKC13cmFwKT8kL2kudGVzdChjc3NXaGl0ZVNwYWNlKSkge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKG5vZGUpIHtcclxuXHRcdG5leHROb2RlICA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0XHRub2RlVmFsdWUgPSBub2RlLm5vZGVWYWx1ZTtcclxuXHRcdG5vZGVUeXBlICA9IG5vZGUubm9kZVR5cGU7XHJcblxyXG5cdFx0aWYgKG5vZGVUeXBlID09PSBFTEVNRU5UX05PREUgJiYgbm9kZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdHJlbW92ZVdoaXRlU3BhY2Uobm9kZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG5vZGVUeXBlID09PSBURVhUX05PREUpIHtcclxuXHRcdFx0bmV4dCAgICAgID0gZ2V0U2libGluZyhub2RlKTtcclxuXHRcdFx0cHJldmlvdXMgID0gZ2V0U2libGluZyhub2RlLCB0cnVlKTtcclxuXHRcdFx0dHJpbVN0YXJ0ID0gZmFsc2U7XHJcblxyXG5cdFx0XHR3aGlsZSAoaGFzQ2xhc3MocHJldmlvdXMsICdlbWxlZGl0b3ItaWdub3JlJykpIHtcclxuXHRcdFx0XHRwcmV2aW91cyA9IGdldFNpYmxpbmcocHJldmlvdXMsIHRydWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJZiBwcmV2aW91cyBzaWJsaW5nIGlzbid0IGlubGluZSBvciBpcyBhIHRleHRub2RlIHRoYXRcclxuXHRcdFx0Ly8gZW5kcyBpbiB3aGl0ZXNwYWNlLCB0aW1lIHRoZSBzdGFydCB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmIChpc0lubGluZShub2RlKSAmJiBwcmV2aW91cykge1xyXG5cdFx0XHRcdHByZXZpb3VzU2libGluZyA9IHByZXZpb3VzO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAocHJldmlvdXNTaWJsaW5nLmxhc3RDaGlsZCkge1xyXG5cdFx0XHRcdFx0cHJldmlvdXNTaWJsaW5nID0gcHJldmlvdXNTaWJsaW5nLmxhc3RDaGlsZDtcclxuXHJcblx0XHRcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWRlcHRoXHJcblx0XHRcdFx0XHR3aGlsZSAoaGFzQ2xhc3MocHJldmlvdXNTaWJsaW5nLCAnZW1sZWRpdG9yLWlnbm9yZScpKSB7XHJcblx0XHRcdFx0XHRcdHByZXZpb3VzU2libGluZyA9IGdldFNpYmxpbmcocHJldmlvdXNTaWJsaW5nLCB0cnVlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRyaW1TdGFydCA9IHByZXZpb3VzU2libGluZy5ub2RlVHlwZSA9PT0gVEVYVF9OT0RFID9cclxuXHRcdFx0XHRcdC9bXFx0XFxuXFxyIF0kLy50ZXN0KHByZXZpb3VzU2libGluZy5ub2RlVmFsdWUpIDpcclxuXHRcdFx0XHRcdCFpc0lubGluZShwcmV2aW91c1NpYmxpbmcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDbGVhciB6ZXJvIHdpZHRoIHNwYWNlc1xyXG5cdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZSgvXFx1MjAwQi9nLCAnJyk7XHJcblxyXG5cdFx0XHQvLyBTdHJpcCBsZWFkaW5nIHdoaXRlc3BhY2VcclxuXHRcdFx0aWYgKCFwcmV2aW91cyB8fCAhaXNJbmxpbmUocHJldmlvdXMpIHx8IHRyaW1TdGFydCkge1xyXG5cdFx0XHRcdG5vZGVWYWx1ZSA9IG5vZGVWYWx1ZS5yZXBsYWNlKFxyXG5cdFx0XHRcdFx0cHJlc2VydmVOZXdMaW5lcyA/IC9eW1xcdCBdKy8gOiAvXltcXHRcXG5cXHIgXSsvLFxyXG5cdFx0XHRcdFx0JydcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTdHJpcCB0cmFpbGluZyB3aGl0ZXNwYWNlXHJcblx0XHRcdGlmICghbmV4dCB8fCAhaXNJbmxpbmUobmV4dCkpIHtcclxuXHRcdFx0XHRub2RlVmFsdWUgPSBub2RlVmFsdWUucmVwbGFjZShcclxuXHRcdFx0XHRcdHByZXNlcnZlTmV3TGluZXMgPyAvW1xcdCBdKyQvIDogL1tcXHRcXG5cXHIgXSskLyxcclxuXHRcdFx0XHRcdCcnXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gUmVtb3ZlIGVtcHR5IHRleHQgbm9kZXNcclxuXHRcdFx0aWYgKCFub2RlVmFsdWUubGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVtb3ZlKG5vZGUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG5vZGUubm9kZVZhbHVlID0gbm9kZVZhbHVlLnJlcGxhY2UoXHJcblx0XHRcdFx0XHRwcmVzZXJ2ZU5ld0xpbmVzID8gL1tcXHQgXSsvZyA6IC9bXFx0XFxuXFxyIF0rL2csXHJcblx0XHRcdFx0XHQnICdcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bm9kZSA9IG5leHROb2RlO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3RzIGFsbCB0aGUgbm9kZXMgYmV0d2VlbiB0aGUgc3RhcnQgYW5kIGVuZCBub2Rlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzdGFydE5vZGVcdFRoZSBub2RlIHRvIHN0YXJ0IGV4dHJhY3RpbmcgYXRcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZW5kTm9kZVx0XHRUaGUgbm9kZSB0byBzdG9wIGV4dHJhY3RpbmcgYXRcclxuICogQHJldHVybiB7RG9jdW1lbnRGcmFnbWVudH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0Q29udGVudHMoc3RhcnROb2RlLCBlbmROb2RlKSB7XHJcblx0dmFyIHJhbmdlID0gc3RhcnROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuXHJcblx0cmFuZ2Uuc2V0U3RhcnRCZWZvcmUoc3RhcnROb2RlKTtcclxuXHRyYW5nZS5zZXRFbmRBZnRlcihlbmROb2RlKTtcclxuXHJcblx0cmV0dXJuIHJhbmdlLmV4dHJhY3RDb250ZW50cygpO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgb2Zmc2V0IHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCBsZWZ0IGFuZCB0b3AgcHJvcGVydGllc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChub2RlKSB7XHJcblx0dmFyXHRsZWZ0ID0gMCxcclxuXHRcdHRvcCA9IDA7XHJcblxyXG5cdHdoaWxlIChub2RlKSB7XHJcblx0XHRsZWZ0ICs9IG5vZGUub2Zmc2V0TGVmdDtcclxuXHRcdHRvcCAgKz0gbm9kZS5vZmZzZXRUb3A7XHJcblx0XHRub2RlICA9IG5vZGUub2Zmc2V0UGFyZW50O1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGxlZnQ6IGxlZnQsXHJcblx0XHR0b3A6IHRvcFxyXG5cdH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhIENTUyBwcm9wZXJ0eSBmcm9tIHRoZSBlbGVtZW50cyBzdHlsZSBhdHRyaWJ1dGVcclxuICpcclxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGVsbVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHByb3BlcnR5XHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZShlbG0sIHByb3BlcnR5KSB7XHJcblx0dmFyXHRzdHlsZVZhbHVlLFxyXG5cdFx0ZWxtU3R5bGUgPSBlbG0uc3R5bGU7XHJcblxyXG5cdGlmICghY3NzUHJvcGVydHlOYW1lQ2FjaGVbcHJvcGVydHldKSB7XHJcblx0XHRjc3NQcm9wZXJ0eU5hbWVDYWNoZVtwcm9wZXJ0eV0gPSBjYW1lbENhc2UocHJvcGVydHkpO1xyXG5cdH1cclxuXHJcblx0cHJvcGVydHkgICA9IGNzc1Byb3BlcnR5TmFtZUNhY2hlW3Byb3BlcnR5XTtcclxuXHRzdHlsZVZhbHVlID0gZWxtU3R5bGVbcHJvcGVydHldO1xyXG5cclxuXHQvLyBBZGQgYW4gZXhjZXB0aW9uIGZvciB0ZXh0LWFsaWduXHJcblx0aWYgKCd0ZXh0QWxpZ24nID09PSBwcm9wZXJ0eSkge1xyXG5cdFx0c3R5bGVWYWx1ZSA9IHN0eWxlVmFsdWUgfHwgY3NzKGVsbSwgcHJvcGVydHkpO1xyXG5cclxuXHRcdGlmIChjc3MoZWxtLnBhcmVudE5vZGUsIHByb3BlcnR5KSA9PT0gc3R5bGVWYWx1ZSB8fFxyXG5cdFx0XHRjc3MoZWxtLCAnZGlzcGxheScpICE9PSAnYmxvY2snIHx8IGlzKGVsbSwgJ2hyLHRoJykpIHtcclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHN0eWxlVmFsdWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiBhbiBlbGVtZW50IGhhcyBhIHN0eWxlLlxyXG4gKlxyXG4gKiBJZiB2YWx1ZXMgYXJlIHNwZWNpZmllZCBpdCB3aWxsIGNoZWNrIHRoYXQgdGhlIHN0eWxlcyB2YWx1ZVxyXG4gKiBtYXRjaGVzIG9uZSBvZiB0aGUgdmFsdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBlbG1cclxuICogQHBhcmFtICB7c3RyaW5nfSBwcm9wZXJ0eVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd8YXJyYXl9IFt2YWx1ZXNdXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzU3R5bGUoZWxtLCBwcm9wZXJ0eSwgdmFsdWVzKSB7XHJcblx0dmFyIHN0eWxlVmFsdWUgPSBnZXRTdHlsZShlbG0sIHByb3BlcnR5KTtcclxuXHJcblx0aWYgKCFzdHlsZVZhbHVlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gIXZhbHVlcyB8fCBzdHlsZVZhbHVlID09PSB2YWx1ZXMgfHxcclxuXHRcdChBcnJheS5pc0FycmF5KHZhbHVlcykgJiYgdmFsdWVzLmluZGV4T2Yoc3R5bGVWYWx1ZSkgPiAtMSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgYm90aCBub2RlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBpbmxpbmUgc3R5bGVzIGFuZCBhbGwgdGhlXHJcbiAqIGlubGluZSBzdHlsZXMgaGF2ZSBtYXRjaGluZyB2YWx1ZXNcclxuICpcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUFcclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZUJcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5mdW5jdGlvbiBzdHlsZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcclxuXHR2YXIgaSA9IG5vZGVBLnN0eWxlLmxlbmd0aDtcclxuXHRpZiAoaSAhPT0gbm9kZUIuc3R5bGUubGVuZ3RoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHR3aGlsZSAoaS0tKSB7XHJcblx0XHR2YXIgcHJvcCA9IG5vZGVBLnN0eWxlW2ldO1xyXG5cdFx0aWYgKG5vZGVBLnN0eWxlW3Byb3BdICE9PSBub2RlQi5zdHlsZVtwcm9wXSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBib3RoIG5vZGVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIGF0dHJpYnV0ZXMgYW5kIGFsbCB0aGVcclxuICogYXR0cmlidXRlIHZhbHVlcyBtYXRjaFxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlQlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGF0dHJpYnV0ZXNNYXRjaChub2RlQSwgbm9kZUIpIHtcclxuXHR2YXIgaSA9IG5vZGVBLmF0dHJpYnV0ZXMubGVuZ3RoO1xyXG5cdGlmIChpICE9PSBub2RlQi5hdHRyaWJ1dGVzLmxlbmd0aCkge1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlQS5hdHRyaWJ1dGVzW2ldO1xyXG5cdFx0dmFyIG5vdE1hdGNoZXMgPSBwcm9wLm5hbWUgPT09ICdzdHlsZScgP1xyXG5cdFx0XHQhc3R5bGVzTWF0Y2gobm9kZUEsIG5vZGVCKSA6XHJcblx0XHRcdHByb3AudmFsdWUgIT09IGF0dHIobm9kZUIsIHByb3AubmFtZSk7XHJcblxyXG5cdFx0aWYgKG5vdE1hdGNoZXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGFuIGVsZW1lbnQgcGxhY2luZyBpdHMgY2hpbGRyZW4gaW4gaXRzIHBsYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGVcclxuICovXHJcbmZ1bmN0aW9uIHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKSB7XHJcblx0d2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0aW5zZXJ0QmVmb3JlKG5vZGUuZmlyc3RDaGlsZCwgbm9kZSk7XHJcblx0fVxyXG5cclxuXHRyZW1vdmUobm9kZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNZXJnZXMgaW5saW5lIHN0eWxlcyBhbmQgdGFncyB3aXRoIHBhcmVudHMgd2hlcmUgcG9zc2libGVcclxuICpcclxuICogQHBhcmFtIHtOb2RlfSBub2RlXHJcbiAqIEBzaW5jZSAzLjEuMFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlKG5vZGUpIHtcclxuXHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gRUxFTUVOVF9OT0RFKSB7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xyXG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lO1xyXG5cdHZhciBtZXJnZVRhZ3MgPSAvQnxTVFJPTkd8RU18U1BBTnxGT05ULztcclxuXHJcblx0Ly8gTWVyZ2UgY2hpbGRyZW4gKGluIHJldmVyc2UgYXMgY2hpbGRyZW4gY2FuIGJlIHJlbW92ZWQpXHJcblx0dmFyIGkgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG5cdHdoaWxlIChpLS0pIHtcclxuXHRcdG1lcmdlKG5vZGUuY2hpbGROb2Rlc1tpXSk7XHJcblx0fVxyXG5cclxuXHQvLyBTaG91bGQgb25seSBtZXJnZSBpbmxpbmUgdGFncyBhbmQgc2hvdWxkIG5vdCBtZXJnZSA8YnI+IHRhZ3NcclxuXHRpZiAoIWlzSW5saW5lKG5vZGUpIHx8IHRhZ05hbWUgPT09ICdCUicpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdC8vIFJlbW92ZSBhbnkgaW5saW5lIHN0eWxlcyB0aGF0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGVcclxuXHRpID0gbm9kZS5zdHlsZS5sZW5ndGg7XHJcblx0d2hpbGUgKGktLSkge1xyXG5cdFx0dmFyIHByb3AgPSBub2RlLnN0eWxlW2ldO1xyXG5cdFx0aWYgKGNzcyhwYXJlbnQsIHByb3ApID09PSBjc3Mobm9kZSwgcHJvcCkpIHtcclxuXHRcdFx0bm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIENhbiBvbmx5IHJlbW92ZSAvIG1lcmdlIHRhZ3MgaWYgbm8gaW5saW5lIHN0eWxpbmcgbGVmdC5cclxuXHQvLyBJZiB0aGVyZSBpcyBhbnkgaW5saW5lIHN0eWxlIGxlZnQgdGhlbiBpdCBtZWFucyBpdCBhdCBsZWFzdCBwYXJ0aWFsbHlcclxuXHQvLyBkb2Vzbid0IG1hdGNoIHRoZSBwYXJlbnQgc3R5bGUgc28gbXVzdCBzdGF5XHJcblx0aWYgKCFub2RlLnN0eWxlLmxlbmd0aCkge1xyXG5cdFx0cmVtb3ZlQXR0cihub2RlLCAnc3R5bGUnKTtcclxuXHJcblx0XHQvLyBSZW1vdmUgZm9udCBhdHRyaWJ1dGVzIGlmIG1hdGNoIHBhcmVudFxyXG5cdFx0aWYgKHRhZ05hbWUgPT09ICdGT05UJykge1xyXG5cdFx0XHRpZiAoY3NzKG5vZGUsICdmb250RmFtaWx5JykudG9Mb3dlckNhc2UoKSA9PT1cclxuXHRcdFx0XHRjc3MocGFyZW50LCAnZm9udEZhbWlseScpLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdmYWNlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjc3Mobm9kZSwgJ2NvbG9yJykgPT09IGNzcyhwYXJlbnQsICdjb2xvcicpKSB7XHJcblx0XHRcdFx0cmVtb3ZlQXR0cihub2RlLCAnY29sb3InKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGNzcyhub2RlLCAnZm9udFNpemUnKSA9PT0gY3NzKHBhcmVudCwgJ2ZvbnRTaXplJykpIHtcclxuXHRcdFx0XHRyZW1vdmVBdHRyKG5vZGUsICdzaXplJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBTcGFucyBhbmQgZm9udCB0YWdzIHdpdGggbm8gYXR0cmlidXRlcyBjYW4gYmUgc2FmZWx5IHJlbW92ZWRcclxuXHRcdGlmICghbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCAmJiAvU1BBTnxGT05ULy50ZXN0KHRhZ05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUtlZXBDaGlsZHJlbihub2RlKTtcclxuXHRcdH0gZWxzZSBpZiAobWVyZ2VUYWdzLnRlc3QodGFnTmFtZSkpIHtcclxuXHRcdFx0dmFyIGlzQm9sZCA9IC9CfFNUUk9ORy8udGVzdCh0YWdOYW1lKTtcclxuXHRcdFx0dmFyIGlzSXRhbGljID0gdGFnTmFtZSA9PT0gJ0VNJztcclxuXHJcblx0XHRcdHdoaWxlIChwYXJlbnQgJiYgaXNJbmxpbmUocGFyZW50KSAmJlxyXG5cdFx0XHRcdCghaXNCb2xkIHx8IC9ib2xkfDcwMC9pLnRlc3QoY3NzKHBhcmVudCwgJ2ZvbnRXZWlnaHQnKSkpICYmXHJcblx0XHRcdFx0KCFpc0l0YWxpYyB8fCBjc3MocGFyZW50LCAnZm9udFN0eWxlJykgPT09ICdpdGFsaWMnKSkge1xyXG5cclxuXHRcdFx0XHQvLyBSZW1vdmUgaWYgcGFyZW50IG1hdGNoXHJcblx0XHRcdFx0aWYgKChwYXJlbnQudGFnTmFtZSA9PT0gdGFnTmFtZSB8fFxyXG5cdFx0XHRcdFx0KGlzQm9sZCAmJiAvQnxTVFJPTkcvLnRlc3QocGFyZW50LnRhZ05hbWUpKSkgJiZcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZXNNYXRjaChwYXJlbnQsIG5vZGUpKSB7XHJcblx0XHRcdFx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obm9kZSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBNZXJnZSBzaWJsaW5ncyBpZiBhdHRyaWJ1dGVzLCBpbmNsdWRpbmcgaW5saW5lIHN0eWxlcywgbWF0Y2hcclxuXHR2YXIgbmV4dCA9IG5vZGUubmV4dFNpYmxpbmc7XHJcblx0aWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09PSB0YWdOYW1lICYmIGF0dHJpYnV0ZXNNYXRjaChuZXh0LCBub2RlKSkge1xyXG5cdFx0YXBwZW5kQ2hpbGQobm9kZSwgbmV4dCk7XHJcblx0XHRyZW1vdmVLZWVwQ2hpbGRyZW4obmV4dCk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS5qcyc7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIGVzY2FwZSBmcm9tICcuL2VzY2FwZS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGFsbCBlbW90aWNvbnMgYXJlIHN1cnJvdW5kZWQgYnkgd2hpdGVzcGFjZSBhbmRcbiAqIHJlcGxhY2VzIGFueSB0aGF0IGFyZW4ndCB3aXRoIHdpdGggdGhlaXIgZW1vdGljb24gY29kZS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge3JhbmdlSGVscGVyfSByYW5nZUhlbHBlclxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2hpdGVzcGFjZShub2RlLCByYW5nZUhlbHBlcikge1xuXHR2YXIgbm9uZVdzUmVnZXggPSAvW15cXHNcXHhBMFxcdTIwMDJcXHUyMDAzXFx1MjAwOV0rLztcblx0dmFyIGVtb3RpY29ucyA9IG5vZGUgJiYgZG9tLmZpbmQobm9kZSwgJ2ltZ1tkYXRhLWVtbGVkaXRvci1lbW90aWNvbl0nKTtcblxuXHRpZiAoIW5vZGUgfHwgIWVtb3RpY29ucy5sZW5ndGgpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGVtb3RpY29ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBlbW90aWNvbiA9IGVtb3RpY29uc1tpXTtcblx0XHR2YXIgcGFyZW50ID0gZW1vdGljb24ucGFyZW50Tm9kZTtcblx0XHR2YXIgcHJldiA9IGVtb3RpY29uLnByZXZpb3VzU2libGluZztcblx0XHR2YXIgbmV4dCA9IGVtb3RpY29uLm5leHRTaWJsaW5nO1xuXG5cdFx0aWYgKCghcHJldiB8fCAhbm9uZVdzUmVnZXgudGVzdChwcmV2Lm5vZGVWYWx1ZS5zbGljZSgtMSkpKSAmJlxuXHRcdFx0KCFuZXh0IHx8ICFub25lV3NSZWdleC50ZXN0KChuZXh0Lm5vZGVWYWx1ZSB8fCAnJylbMF0pKSkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dmFyIHJhbmdlID0gcmFuZ2VIZWxwZXIuY2xvbmVTZWxlY3RlZCgpO1xuXHRcdHZhciByYW5nZVN0YXJ0ID0gLTE7XG5cdFx0dmFyIHJhbmdlU3RhcnRDb250YWluZXIgPSByYW5nZS5zdGFydENvbnRhaW5lcjtcblx0XHR2YXIgcHJldmlvdXNUZXh0ID0gKHByZXYgJiYgcHJldi5ub2RlVmFsdWUpIHx8ICcnO1xuXG5cdFx0cHJldmlvdXNUZXh0ICs9IGRvbS5kYXRhKGVtb3RpY29uLCAnZW1sZWRpdG9yLWVtb3RpY29uJyk7XG5cblx0XHQvLyBJZiB0aGUgY3Vyc29yIGlzIGFmdGVyIHRoZSByZW1vdmVkIGVtb3RpY29uLCBhZGRcblx0XHQvLyB0aGUgbGVuZ3RoIG9mIHRoZSBuZXdseSBhZGRlZCB0ZXh0IHRvIGl0XG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IG5leHQpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSBwcmV2aW91c1RleHQubGVuZ3RoICsgcmFuZ2Uuc3RhcnRPZmZzZXQ7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSBuZXh0IG5vZGUsIHNldCBpdCB0b1xuXHRcdC8vIHRoZSBlbmQgb2YgdGhlIG5ldyB0ZXh0IG5vZGVcblx0XHRpZiAocmFuZ2VTdGFydENvbnRhaW5lciA9PT0gbm9kZSAmJlxuXHRcdFx0bm9kZS5jaGlsZE5vZGVzW3JhbmdlLnN0YXJ0T2Zmc2V0XSA9PT0gbmV4dCkge1xuXHRcdFx0cmFuZ2VTdGFydCA9IHByZXZpb3VzVGV4dC5sZW5ndGg7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIGN1cnNvciBpcyBzZXQgYmVmb3JlIHRoZSByZW1vdmVkIGVtb3RpY29uLFxuXHRcdC8vIGp1c3Qga2VlcCBpdCBhdCB0aGF0IHBvc2l0aW9uXG5cdFx0aWYgKHJhbmdlU3RhcnRDb250YWluZXIgPT09IHByZXYpIHtcblx0XHRcdHJhbmdlU3RhcnQgPSByYW5nZS5zdGFydE9mZnNldDtcblx0XHR9XG5cblx0XHRpZiAoIW5leHQgfHwgbmV4dC5ub2RlVHlwZSAhPT0gZG9tLlRFWFRfTk9ERSkge1xuXHRcdFx0bmV4dCA9IHBhcmVudC5pbnNlcnRCZWZvcmUoXG5cdFx0XHRcdHBhcmVudC5vd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSwgbmV4dFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRuZXh0Lmluc2VydERhdGEoMCwgcHJldmlvdXNUZXh0KTtcblx0XHRkb20ucmVtb3ZlKGVtb3RpY29uKTtcblx0XHRpZiAocHJldikge1xuXHRcdFx0ZG9tLnJlbW92ZShwcmV2KTtcblx0XHR9XG5cblx0XHQvLyBOZWVkIHRvIHVwZGF0ZSB0aGUgcmFuZ2Ugc3RhcnRpbmcgcG9zaXRpb24gaWYgaXQncyBiZWVuIG1vZGlmaWVkXG5cdFx0aWYgKHJhbmdlU3RhcnQgPiAtMSkge1xuXHRcdFx0cmFuZ2Uuc2V0U3RhcnQobmV4dCwgcmFuZ2VTdGFydCk7XG5cdFx0XHRyYW5nZS5jb2xsYXBzZSh0cnVlKTtcblx0XHRcdHJhbmdlSGVscGVyLnNlbGVjdFJhbmdlKHJhbmdlKTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBSZXBsYWNlcyBhbnkgZW1vdGljb25zIGluc2lkZSB0aGUgcm9vdCBub2RlIHdpdGggaW1hZ2VzLlxuICpcbiAqIGVtb3RpY29ucyBzaG91bGQgYmUgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXkgaXMgdGhlIGVtb3RpY29uXG4gKiBjb2RlIGFuZCB0aGUgdmFsdWUgaXMgdGhlIEhUTUwgdG8gcmVwbGFjZSBpdCB3aXRoLlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJvb3RcbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gZW1vdGljb25zXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGVtb3RpY29uc0NvbXBhdFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2Uocm9vdCwgZW1vdGljb25zLCBlbW90aWNvbnNDb21wYXQpIHtcblx0dmFyXHRkb2MgICAgICAgICAgID0gcm9vdC5vd25lckRvY3VtZW50O1xuXHR2YXIgc3BhY2UgICAgICAgICA9ICcoXnxcXFxcc3xcXHhBMHxcXHUyMDAyfFxcdTIwMDN8XFx1MjAwOXwkKSc7XG5cdHZhciBlbW90aWNvbkNvZGVzID0gW107XG5cdHZhciBlbW90aWNvblJlZ2V4ID0ge307XG5cblx0Ly8gVE9ETzogTWFrZSB0aGlzIHRhZyBjb25maWd1cmFibGUuXG5cdGlmIChkb20ucGFyZW50KHJvb3QsICdjb2RlJykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR1dGlscy5lYWNoKGVtb3RpY29ucywgZnVuY3Rpb24gKGtleSkge1xuXHRcdGVtb3RpY29uUmVnZXhba2V5XSA9IG5ldyBSZWdFeHAoc3BhY2UgKyBlc2NhcGUucmVnZXgoa2V5KSArIHNwYWNlKTtcblx0XHRlbW90aWNvbkNvZGVzLnB1c2goa2V5KTtcblx0fSk7XG5cblx0Ly8gU29ydCBrZXlzIGxvbmdlc3QgdG8gc2hvcnRlc3Qgc28gdGhhdCBsb25nZXIga2V5c1xuXHQvLyB0YWtlIHByZWNlZGVuY2UgKGF2b2lkcyBidWdzIHdpdGggc2hvcnRlciBrZXlzIHBhcnRpYWxseVxuXHQvLyBtYXRjaGluZyBsb25nZXIgb25lcylcblx0ZW1vdGljb25Db2Rlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0cmV0dXJuIGIubGVuZ3RoIC0gYS5sZW5ndGg7XG5cdH0pO1xuXG5cdChmdW5jdGlvbiBjb252ZXJ0KG5vZGUpIHtcblx0XHRub2RlID0gbm9kZS5maXJzdENoaWxkO1xuXG5cdFx0d2hpbGUgKG5vZGUpIHtcblx0XHRcdC8vIFRPRE86IE1ha2UgdGhpcyB0YWcgY29uZmlndXJhYmxlLlxuXHRcdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IGRvbS5FTEVNRU5UX05PREUgJiYgIWRvbS5pcyhub2RlLCAnY29kZScpKSB7XG5cdFx0XHRcdGNvbnZlcnQobm9kZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChub2RlLm5vZGVUeXBlID09PSBkb20uVEVYVF9OT0RFKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW1vdGljb25Db2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHZhciB0ZXh0ICA9IG5vZGUubm9kZVZhbHVlO1xuXHRcdFx0XHRcdHZhciBrZXkgICA9IGVtb3RpY29uQ29kZXNbaV07XG5cdFx0XHRcdFx0dmFyIGluZGV4ID0gZW1vdGljb25zQ29tcGF0ID9cblx0XHRcdFx0XHRcdHRleHQuc2VhcmNoKGVtb3RpY29uUmVnZXhba2V5XSkgOlxuXHRcdFx0XHRcdFx0dGV4dC5pbmRleE9mKGtleSk7XG5cblx0XHRcdFx0XHRpZiAoaW5kZXggPiAtMSkge1xuXHRcdFx0XHRcdFx0Ly8gV2hlbiBlbW90aWNvbnNDb21wYXQgaXMgZW5hYmxlZCB0aGlzIHdpbGwgYmUgdGhlXG5cdFx0XHRcdFx0XHQvLyBwb3NpdGlvbiBhZnRlciBhbnkgd2hpdGUgc3BhY2Vcblx0XHRcdFx0XHRcdHZhciBzdGFydEluZGV4ID0gdGV4dC5pbmRleE9mKGtleSwgaW5kZXgpO1xuXHRcdFx0XHRcdFx0dmFyIGZyYWdtZW50ICAgPSBkb20ucGFyc2VIVE1MKGVtb3RpY29uc1trZXldLCBkb2MpO1xuXHRcdFx0XHRcdFx0dmFyIGFmdGVyICAgICAgPSB0ZXh0LnN1YnN0cihzdGFydEluZGV4ICsga2V5Lmxlbmd0aCk7XG5cblx0XHRcdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShhZnRlcikpO1xuXG5cdFx0XHRcdFx0XHRub2RlLm5vZGVWYWx1ZSA9IHRleHQuc3Vic3RyKDAsIHN0YXJ0SW5kZXgpO1xuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnROb2RlXG5cdFx0XHRcdFx0XHRcdC5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIG5vZGUubmV4dFNpYmxpbmcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRub2RlID0gbm9kZS5uZXh0U2libGluZztcblx0XHR9XG5cdH0ocm9vdCkpO1xufVxuIiwiLy8gTXVzdCBzdGFydCB3aXRoIGEgdmFsaWQgc2NoZW1lXHJcbi8vIFx0XHReXHJcbi8vIFNjaGVtZXMgdGhhdCBhcmUgY29uc2lkZXJlZCBzYWZlXHJcbi8vIFx0XHQoaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8XHJcbi8vIFJlbGF0aXZlIHNjaGVtZXMgKC8vOikgYXJlIGNvbnNpZGVyZWQgc2FmZVxyXG4vLyBcdFx0KFxcXFwvXFxcXC8pfFxyXG4vLyBJbWFnZSBkYXRhIFVSSSdzIGFyZSBjb25zaWRlcmVkIHNhZmVcclxuLy8gXHRcdGRhdGE6aW1hZ2VcXFxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTtcclxudmFyIFZBTElEX1NDSEVNRV9SRUdFWCA9XHJcblx0L14oaHR0cHM/fHM/ZnRwfG1haWx0b3xzcG90aWZ5fHNreXBlfHNzaHx0ZWFtc3BlYWt8dGVsKTp8KFxcL1xcLyl8ZGF0YTppbWFnZVxcLyhwbmd8Ym1wfGdpZnxwP2pwZT9nKTsvaTtcclxuXHJcbi8qKlxyXG4gKiBFc2NhcGVzIGEgc3RyaW5nIHNvIGl0J3Mgc2FmZSB0byB1c2UgaW4gcmVnZXhcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVnZXgoc3RyKSB7XHJcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC8oWy0uKis/Xj0hOiR7fSgpfFtcXF0vXFxcXF0pL2csICdcXFxcJDEnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEVzY2FwZXMgYWxsIEhUTUwgZW50aXRpZXMgaW4gYSBzdHJpbmdcclxuICpcclxuICogSWYgbm9RdW90ZXMgaXMgc2V0IHRvIGZhbHNlLCBhbGwgc2luZ2xlIGFuZCBkb3VibGVcclxuICogcXVvdGVzIHdpbGwgYWxzbyBiZSBlc2NhcGVkXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcclxuICogQHBhcmFtIHtib29sZWFufSBbbm9RdW90ZXM9dHJ1ZV1cclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiBAc2luY2UgMS40LjFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlbnRpdGllcyhzdHIsIG5vUXVvdGVzKSB7XHJcblx0aWYgKCFzdHIpIHtcclxuXHRcdHJldHVybiBzdHI7XHJcblx0fVxyXG5cclxuXHR2YXIgcmVwbGFjZW1lbnRzID0ge1xyXG5cdFx0JyYnOiAnJmFtcDsnLFxyXG5cdFx0JzwnOiAnJmx0OycsXHJcblx0XHQnPic6ICcmZ3Q7JyxcclxuXHRcdCcgICc6ICcmbmJzcDsgJyxcclxuXHRcdCdcXHJcXG4nOiAnPGJyIC8+JyxcclxuXHRcdCdcXHInOiAnPGJyIC8+JyxcclxuXHRcdCdcXG4nOiAnPGJyIC8+J1xyXG5cdH07XHJcblxyXG5cdGlmIChub1F1b3RlcyAhPT0gZmFsc2UpIHtcclxuXHRcdHJlcGxhY2VtZW50c1snXCInXSAgPSAnJiMzNDsnO1xyXG5cdFx0cmVwbGFjZW1lbnRzWydcXCcnXSA9ICcmIzM5Oyc7XHJcblx0XHRyZXBsYWNlbWVudHNbJ2AnXSAgPSAnJiM5NjsnO1xyXG5cdH1cclxuXHJcblx0c3RyID0gc3RyLnJlcGxhY2UoLyB7Mn18XFxyXFxufFsmPD5cXHJcXG4nXCJgXS9nLCBmdW5jdGlvbiAobWF0Y2gpIHtcclxuXHRcdHJldHVybiByZXBsYWNlbWVudHNbbWF0Y2hdIHx8IG1hdGNoO1xyXG5cdH0pO1xyXG5cclxuXHRyZXR1cm4gc3RyO1xyXG59XHJcblxyXG4vKipcclxuICogRXNjYXBlIFVSSSBzY2hlbWUuXHJcbiAqXHJcbiAqIEFwcGVuZHMgdGhlIGN1cnJlbnQgVVJMIHRvIGEgdXJsIGlmIGl0IGhhcyBhIHNjaGVtZSB0aGF0IGlzIG5vdDpcclxuICpcclxuICogaHR0cFxyXG4gKiBodHRwc1xyXG4gKiBzZnRwXHJcbiAqIGZ0cFxyXG4gKiBtYWlsdG9cclxuICogc3BvdGlmeVxyXG4gKiBza3lwZVxyXG4gKiBzc2hcclxuICogdGVhbXNwZWFrXHJcbiAqIHRlbFxyXG4gKiAvL1xyXG4gKiBkYXRhOmltYWdlLyhwbmd8anBlZ3xqcGd8cGpwZWd8Ym1wfGdpZik7XHJcbiAqXHJcbiAqICoqSU1QT1JUQU5UKio6IFRoaXMgZG9lcyBub3QgZXNjYXBlIGFueSBIVE1MIGluIGEgdXJsLCBmb3JcclxuICogdGhhdCB1c2UgdGhlIGVzY2FwZS5lbnRpdGllcygpIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtICB7c3RyaW5nfSB1cmxcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiBAc2luY2UgMS40LjVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmlTY2hlbWUodXJsKSB7XHJcblx0dmFyXHRwYXRoLFxyXG5cdFx0Ly8gSWYgdGhlcmUgaXMgYSA6IGJlZm9yZSBhIC8gdGhlbiBpdCBoYXMgYSBzY2hlbWVcclxuXHRcdGhhc1NjaGVtZSA9IC9eW14vXSo6L2ksXHJcblx0XHRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbjtcclxuXHJcblx0Ly8gSGFzIG5vIHNjaGVtZSBvciBhIHZhbGlkIHNjaGVtZVxyXG5cdGlmICgoIXVybCB8fCAhaGFzU2NoZW1lLnRlc3QodXJsKSkgfHwgVkFMSURfU0NIRU1FX1JFR0VYLnRlc3QodXJsKSkge1xyXG5cdFx0cmV0dXJuIHVybDtcclxuXHR9XHJcblxyXG5cdHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xyXG5cdHBhdGgucG9wKCk7XHJcblxyXG5cdHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgK1xyXG5cdFx0bG9jYXRpb24uaG9zdCArXHJcblx0XHRwYXRoLmpvaW4oJy8nKSArICcvJyArXHJcblx0XHR1cmw7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tLmpzJztcclxuaW1wb3J0ICogYXMgZXNjYXBlIGZyb20gJy4vZXNjYXBlLmpzJztcclxuXHJcblxyXG4vKipcclxuICogSFRNTCB0ZW1wbGF0ZXMgdXNlZCBieSB0aGUgZWRpdG9yIGFuZCBkZWZhdWx0IGNvbW1hbmRzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52YXIgX3RlbXBsYXRlcyA9IHtcclxuXHRodG1sOlxyXG5cdFx0JzwhRE9DVFlQRSBodG1sPicgK1xyXG5cdFx0JzxodG1se2F0dHJzfT4nICtcclxuXHRcdFx0JzxoZWFkPicgK1xyXG5cdFx0XHRcdCc8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgJyArXHJcblx0XHRcdFx0XHQnY29udGVudD1cInRleHQvaHRtbDtjaGFyc2V0PXtjaGFyc2V0fVwiIC8+JyArXHJcblx0XHRcdFx0JzxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiB0eXBlPVwidGV4dC9jc3NcIiBocmVmPVwie3N0eWxlfVwiIC8+JyArXHJcblx0XHRcdCc8L2hlYWQ+JyArXHJcblx0XHRcdCc8Ym9keSBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCIge3NwZWxsY2hlY2t9PjxwPjwvcD48L2JvZHk+JyArXHJcblx0XHQnPC9odG1sPicsXHJcblxyXG5cdHRvb2xiYXJCdXR0b246ICc8YSBjbGFzcz1cImVtbGVkaXRvci1idXR0b24gZW1sZWRpdG9yLWJ1dHRvbi17bmFtZX1cIiAnICtcclxuXHRcdCdkYXRhLWVtbGVkaXRvci1jb21tYW5kPVwie25hbWV9XCIgdW5zZWxlY3RhYmxlPVwib25cIj4nICtcclxuXHRcdCc8ZGl2IHVuc2VsZWN0YWJsZT1cIm9uXCI+e2Rpc3BOYW1lfTwvZGl2PjwvYT4nLFxyXG5cclxuXHRlbW90aWNvbjogJzxpbWcgc3JjPVwie3VybH1cIiBkYXRhLWVtbGVkaXRvci1lbW90aWNvbj1cIntrZXl9XCIgJyArXHJcblx0XHQnYWx0PVwie2tleX1cIiB0aXRsZT1cInt0b29sdGlwfVwiIC8+JyxcclxuXHJcblx0Zm9udE9wdDogJzxhIGNsYXNzPVwiZW1sZWRpdG9yLWZvbnQtb3B0aW9uXCIgaHJlZj1cIiNcIiAnICtcclxuXHRcdCdkYXRhLWZvbnQ9XCJ7Zm9udH1cIj48Zm9udCBmYWNlPVwie2ZvbnR9XCI+e2ZvbnR9PC9mb250PjwvYT4nLFxyXG5cclxuXHRzaXplT3B0OiAnPGEgY2xhc3M9XCJlbWxlZGl0b3ItZm9udHNpemUtb3B0aW9uXCIgZGF0YS1zaXplPVwie3NpemV9XCIgJyArXHJcblx0XHQnaHJlZj1cIiNcIj48Zm9udCBzaXplPVwie3NpemV9XCI+e3NpemV9PC9mb250PjwvYT4nLFxyXG5cclxuXHRwYXN0ZXRleHQ6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwidHh0XCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPHRleHRhcmVhIGNvbHM9XCIyMFwiIHJvd3M9XCI3XCIgaWQ9XCJ0eHRcIj48L3RleHRhcmVhPjwvZGl2PicgK1xyXG5cdFx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXHJcblx0XHQnPC9kaXY+JyxcclxuXHJcblx0dGFibGU6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwicm93c1wiPntyb3dzfTwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgJyArXHJcblx0XHRcdCdpZD1cInJvd3NcIiB2YWx1ZT1cIjJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImNvbHNcIj57Y29sc308L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiICcgK1xyXG5cdFx0XHQnaWQ9XCJjb2xzXCIgdmFsdWU9XCIyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCInICtcclxuXHRcdFx0JyAvPjwvZGl2PicsXHJcblxyXG5cdGltYWdlOlxyXG5cdFx0JzxkaXY+PGxhYmVsIGZvcj1cImltYWdlXCI+e3VybH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaW1hZ2VcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJ3aWR0aFwiPnt3aWR0aH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwid2lkdGhcIiBzaXplPVwiMlwiIGRpcj1cImx0clwiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiaGVpZ2h0XCI+e2hlaWdodH08L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaGVpZ2h0XCIgc2l6ZT1cIjJcIiBkaXI9XCJsdHJcIiAvPjwvZGl2PicgK1xyXG5cdFx0JzxkaXY+PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ1dHRvblwiIHZhbHVlPVwie2luc2VydH1cIiAvPicgK1xyXG5cdFx0XHQnPC9kaXY+JyxcclxuXHJcblx0ZW1haWw6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwiZW1haWxcIj57bGFiZWx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImVtYWlsXCIgZGlyPVwibHRyXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJkZXNcIj57ZGVzY308L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnNlcnR9XCIgLz4nICtcclxuXHRcdFx0JzwvZGl2PicsXHJcblxyXG5cdGxpbms6XHJcblx0XHQnPGRpdj48bGFiZWwgZm9yPVwibGlua1wiPnt1cmx9PC9sYWJlbD4gJyArXHJcblx0XHRcdCc8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImxpbmtcIiBkaXI9XCJsdHJcIiBwbGFjZWhvbGRlcj1cImh0dHBzOi8vXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJkZXNcIj57ZGVzY308L2xhYmVsPiAnICtcclxuXHRcdFx0JzxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVzXCIgLz48L2Rpdj4nICtcclxuXHRcdCc8ZGl2PjxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidXR0b25cIiB2YWx1ZT1cIntpbnN9XCIgLz48L2Rpdj4nLFxyXG5cclxuXHR5b3V0dWJlTWVudTpcclxuXHRcdCc8ZGl2PjxsYWJlbCBmb3I9XCJsaW5rXCI+e2xhYmVsfTwvbGFiZWw+ICcgK1xyXG5cdFx0XHQnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJsaW5rXCIgZGlyPVwibHRyXCIgcGxhY2Vob2xkZXI9XCJodHRwczovL1wiIC8+PC9kaXY+JyArXHJcblx0XHQnPGRpdj48aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnV0dG9uXCIgdmFsdWU9XCJ7aW5zZXJ0fVwiIC8+JyArXHJcblx0XHRcdCc8L2Rpdj4nLFxyXG5cclxuXHR5b3V0dWJlOlxyXG5cdFx0JzxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4gJyArXHJcblx0XHQnc3JjPVwiaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb20vZW1iZWQve2lkfT93bW9kZT1vcGFxdWUmc3RhcnQ9e3RpbWV9XCIgJyArXHJcblx0XHQnZGF0YS15b3V0dWJlLWlkPVwie2lkfVwiPjwvaWZyYW1lPidcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlcyBhbnkgcGFyYW1zIGluIGEgdGVtcGxhdGUgd2l0aCB0aGUgcGFzc2VkIHBhcmFtcy5cclxuICpcclxuICogSWYgY3JlYXRlSHRtbCBpcyBwYXNzZWQgaXQgd2lsbCByZXR1cm4gYSBEb2N1bWVudEZyYWdtZW50XHJcbiAqIGNvbnRhaW5pbmcgdGhlIHBhcnNlZCB0ZW1wbGF0ZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtwYXJhbXNdXHJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NyZWF0ZUh0bWxdXHJcbiAqIEByZXR1cm5zIHthbnl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0ZW1wbGF0ZXMgKG5hbWUsIHBhcmFtcywgY3JlYXRlSHRtbCkge1xyXG5cdHZhciB0ZW1wbGF0ZSA9IF90ZW1wbGF0ZXNbbmFtZV07XHJcblxyXG5cdE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0dGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKFxyXG5cdFx0XHRuZXcgUmVnRXhwKGVzY2FwZS5yZWdleCgneycgKyBuYW1lICsgJ30nKSwgJ2cnKSwgcGFyYW1zW25hbWVdXHJcblx0XHQpO1xyXG5cdH0pO1xyXG5cclxuXHRpZiAoY3JlYXRlSHRtbCkge1xyXG5cdFx0dGVtcGxhdGUgPSBkb20ucGFyc2VIVE1MKHRlbXBsYXRlKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0ZW1wbGF0ZTtcclxufVxyXG4iLCIvKipcclxuICogQ2hlY2sgaWYgdGhlIHBhc3NlZCBhcmd1bWVudCBpcyB0aGVcclxuICogdGhlIHBhc3NlZCB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gKiBAcGFyYW0geyp9IGFyZ1xyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmZ1bmN0aW9uIGlzVHlwZW9mKHR5cGUsIGFyZykge1xyXG5cdHJldHVybiB0eXBlb2YgYXJnID09PSB0eXBlO1xyXG59XHJcblxyXG4vKipcclxuICogQHR5cGUge2Z1bmN0aW9uKCopOiBib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IHZhciBpc1N0cmluZyA9IGlzVHlwZW9mLmJpbmQobnVsbCwgJ3N0cmluZycpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNVbmRlZmluZWQgPSBpc1R5cGVvZi5iaW5kKG51bGwsICd1bmRlZmluZWQnKTtcclxuXHJcbi8qKlxyXG4gKiBAdHlwZSB7ZnVuY3Rpb24oKik6IGJvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgdmFyIGlzRnVuY3Rpb24gPSBpc1R5cGVvZi5iaW5kKG51bGwsICdmdW5jdGlvbicpO1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlIHtmdW5jdGlvbigqKTogYm9vbGVhbn1cclxuICovXHJcbmV4cG9ydCB2YXIgaXNOdW1iZXIgPSBpc1R5cGVvZi5iaW5kKG51bGwsICdudW1iZXInKTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIGFuIG9iamVjdCBoYXMgbm8ga2V5c1xyXG4gKlxyXG4gKiBAcGFyYW0geyFPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5T2JqZWN0KG9iaikge1xyXG5cdHJldHVybiAhT2JqZWN0LmtleXMob2JqKS5sZW5ndGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHRlbmRzIHRoZSBmaXJzdCBvYmplY3Qgd2l0aCBhbnkgZXh0cmEgb2JqZWN0cyBwYXNzZWRcclxuICpcclxuICogSWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGJvb2xlYW4gYW5kIHNldCB0byB0cnVlXHJcbiAqIGl0IHdpbGwgZXh0ZW5kIGNoaWxkIGFycmF5cyBhbmQgb2JqZWN0cyByZWN1cnNpdmVseS5cclxuICpcclxuICogQHBhcmFtIHshT2JqZWN0fGJvb2xlYW59IHRhcmdldEFyZ1xyXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQodGFyZ2V0QXJnLCBzb3VyY2VBcmcpIHtcclxuXHR2YXIgaXNUYXJnZXRCb29sZWFuID0gdGFyZ2V0QXJnID09PSAhIXRhcmdldEFyZztcclxuXHR2YXIgaSAgICAgID0gaXNUYXJnZXRCb29sZWFuID8gMiA6IDE7XHJcblx0dmFyIHRhcmdldCA9IGlzVGFyZ2V0Qm9vbGVhbiA/IHNvdXJjZUFyZyA6IHRhcmdldEFyZztcclxuXHR2YXIgaXNEZWVwID0gaXNUYXJnZXRCb29sZWFuID8gdGFyZ2V0QXJnIDogZmFsc2U7XHJcblxyXG5cdGZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxyXG5cdFx0XHRPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpID09PSBPYmplY3QucHJvdG90eXBlO1xyXG5cdH1cclxuXHJcblx0Zm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XHJcblxyXG5cdFx0Ly8gQ29weSBhbGwgcHJvcGVydGllcyBmb3IgalF1ZXJ5IGNvbXBhdGliaWxpdHlcclxuXHRcdC8qIGVzbGludCBndWFyZC1mb3ItaW46IG9mZiAqL1xyXG5cdFx0Zm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xyXG5cdFx0XHR2YXIgdGFyZ2V0VmFsdWUgPSB0YXJnZXRba2V5XTtcclxuXHRcdFx0dmFyIHZhbHVlID0gc291cmNlW2tleV07XHJcblxyXG5cdFx0XHQvLyBTa2lwIHVuZGVmaW5lZCB2YWx1ZXMgdG8gbWF0Y2ggalF1ZXJ5XHJcblx0XHRcdGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gU2tpcCBzcGVjaWFsIGtleXMgdG8gcHJldmVudCBwcm90b3R5cGUgcG9sbHV0aW9uXHJcblx0XHRcdGlmIChrZXkgPT09ICdfX3Byb3RvX18nIHx8IGtleSA9PT0gJ2NvbnN0cnVjdG9yJykge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaXNWYWx1ZU9iamVjdCA9IGlzT2JqZWN0KHZhbHVlKTtcclxuXHRcdFx0dmFyIGlzVmFsdWVBcnJheSA9IEFycmF5LmlzQXJyYXkodmFsdWUpO1xyXG5cclxuXHRcdFx0aWYgKGlzRGVlcCAmJiAoaXNWYWx1ZU9iamVjdCB8fCBpc1ZhbHVlQXJyYXkpKSB7XHJcblx0XHRcdFx0Ly8gQ2FuIG9ubHkgbWVyZ2UgaWYgdGFyZ2V0IHR5cGUgbWF0Y2hlcyBvdGhlcndpc2UgY3JlYXRlXHJcblx0XHRcdFx0Ly8gbmV3IHRhcmdldCB0byBtZXJnZSBpbnRvXHJcblx0XHRcdFx0dmFyIGlzU2FtZVR5cGUgPSBpc09iamVjdCh0YXJnZXRWYWx1ZSkgPT09IGlzVmFsdWVPYmplY3QgJiZcclxuXHRcdFx0XHRcdEFycmF5LmlzQXJyYXkodGFyZ2V0VmFsdWUpID09PSBpc1ZhbHVlQXJyYXk7XHJcblxyXG5cdFx0XHRcdHRhcmdldFtrZXldID0gZXh0ZW5kKFxyXG5cdFx0XHRcdFx0dHJ1ZSxcclxuXHRcdFx0XHRcdGlzU2FtZVR5cGUgPyB0YXJnZXRWYWx1ZSA6IChpc1ZhbHVlQXJyYXkgPyBbXSA6IHt9KSxcclxuXHRcdFx0XHRcdHZhbHVlXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gdGFyZ2V0O1xyXG59XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gdGhlIHBhc3NlZCBhcnJheVxyXG4gKlxyXG4gKiBAcGFyYW0geyFBcnJheX0gYXJyXHJcbiAqIEBwYXJhbSB7Kn0gaXRlbVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgaXRlbSkge1xyXG5cdHZhciBpID0gYXJyLmluZGV4T2YoaXRlbSk7XHJcblxyXG5cdGlmIChpID4gLTEpIHtcclxuXHRcdGFyci5zcGxpY2UoaSwgMSk7XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogSXRlcmF0ZXMgb3ZlciBhbiBhcnJheSBvciBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHshT2JqZWN0fEFycmF5fSBvYmpcclxuICogQHBhcmFtIHtmdW5jdGlvbigqLCAqKX0gZm5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlYWNoKG9iaiwgZm4pIHtcclxuXHRpZiAoQXJyYXkuaXNBcnJheShvYmopIHx8ICdsZW5ndGgnIGluIG9iaiAmJiBpc051bWJlcihvYmoubGVuZ3RoKSkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Zm4oaSwgb2JqW2ldKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuXHRcdFx0Zm4oa2V5LCBvYmpba2V5XSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBFbWxFZGl0b3IgZnJvbSAnLi9saWIvZW1sRWRpdG9yJztcclxuaW1wb3J0IHsgUGx1Z2luTWFuYWdlciB9IGZyb20gJy4vbGliL3BsdWdpbk1hbmFnZXInO1xyXG5pbXBvcnQgKiBhcyBlc2NhcGUgZnJvbSAnLi9saWIvZXNjYXBlLmpzJztcclxuaW1wb3J0ICogYXMgYnJvd3NlciBmcm9tICcuL2xpYi9icm93c2VyLmpzJztcclxuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vbGliL2RvbS5qcyc7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vbGliL3V0aWxzLmpzJztcclxuaW1wb3J0IGRlZmF1bHRDb21tYW5kcyBmcm9tICcuL2xpYi9kZWZhdWx0Q29tbWFuZHMuanMnO1xyXG5pbXBvcnQgZGVmYXVsdE9wdGlvbnMgZnJvbSAnLi9saWIvZGVmYXVsdE9wdGlvbnMuanMnO1xyXG5pbXBvcnQgJy4vdGhlbWVzL3NxdWFyZS5sZXNzJztcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuXHRpbnRlcmZhY2UgV2luZG93IHtcclxuXHRcdGVtbEVkaXRvcjogSUVkaXRvcjtcclxuXHR9XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRWRpdG9yIHtcclxuXHRjb21tYW5kOiBPYmplY3Q7XHJcblx0bG9jYWxlOiBPYmplY3Q7XHJcblx0aWNvbnM6IE9iamVjdDtcclxuXHRmb3JtYXRzOiBPYmplY3Q7XHJcblx0Y29tbWFuZHM6IE9iamVjdDtcclxuXHRkZWZhdWx0T3B0aW9uczogT2JqZWN0O1xyXG5cdGlvczogYm9vbGVhbjtcclxuXHRpc1d5c2l3eWdTdXBwb3J0ZWQ6IGJvb2xlYW47XHJcblx0cmVnZXhFc2NhcGUoc3RyOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0ZXNjYXBlRW50aXRpZXMoc3RyOiBzdHJpbmcsIG5vUXVvdGVzOiBib29sZWFuIHwgbnVsbCk6IHN0cmluZztcclxuXHRlc2NhcGVVcmlTY2hlbWUodXJsOiBzdHJpbmcpOiBzdHJpbmc7XHJcblx0ZG9tOiBPYmplY3Q7XHJcblx0dXRpbHM6IE9iamVjdDtcclxuXHRwbHVnaW5zOiBPYmplY3Q7XHJcblx0Y3JlYXRlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBvcHRpb25zOiBPYmplY3QpOiB2b2lkO1xyXG5cdGluc3RhbmNlKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50KTogSUVkaXRvcjtcclxufVxyXG5cclxud2luZG93LmVtbEVkaXRvciA9IHtcclxuXHRjb21tYW5kOiBFbWxFZGl0b3IuY29tbWFuZCxcclxuXHRsb2NhbGU6IEVtbEVkaXRvci5sb2NhbGUsXHJcblx0aWNvbnM6IEVtbEVkaXRvci5pY29ucyxcclxuXHRmb3JtYXRzOiBFbWxFZGl0b3IuZm9ybWF0cyxcclxuXHJcblx0Y29tbWFuZHM6IGRlZmF1bHRDb21tYW5kcyxcclxuXHRkZWZhdWx0T3B0aW9uczogZGVmYXVsdE9wdGlvbnMsXHJcblx0aW9zOiBicm93c2VyLmlvcyxcclxuXHRpc1d5c2l3eWdTdXBwb3J0ZWQ6IGJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkLFxyXG5cdHJlZ2V4RXNjYXBlOiBlc2NhcGUucmVnZXgsXHJcblx0ZXNjYXBlRW50aXRpZXM6IGVzY2FwZS5lbnRpdGllcyxcclxuXHRlc2NhcGVVcmlTY2hlbWU6IGVzY2FwZS51cmlTY2hlbWUsXHJcblxyXG5cdGRvbToge1xyXG5cdFx0Y3NzOiBkb20uY3NzLFxyXG5cdFx0YXR0cjogZG9tLmF0dHIsXHJcblx0XHRyZW1vdmVBdHRyOiBkb20ucmVtb3ZlQXR0cixcclxuXHRcdGlzOiBkb20uaXMsXHJcblx0XHRjbG9zZXN0OiBkb20uY2xvc2VzdCxcclxuXHRcdHdpZHRoOiBkb20ud2lkdGgsXHJcblx0XHRoZWlnaHQ6IGRvbS5oZWlnaHQsXHJcblx0XHR0cmF2ZXJzZTogZG9tLnRyYXZlcnNlLFxyXG5cdFx0clRyYXZlcnNlOiBkb20uclRyYXZlcnNlLFxyXG5cdFx0cGFyc2VIVE1MOiBkb20ucGFyc2VIVE1MLFxyXG5cdFx0aGFzU3R5bGluZzogZG9tLmhhc1N0eWxpbmcsXHJcblx0XHRjb252ZXJ0RWxlbWVudDogZG9tLmNvbnZlcnRFbGVtZW50LFxyXG5cdFx0YmxvY2tMZXZlbExpc3Q6IGRvbS5ibG9ja0xldmVsTGlzdCxcclxuXHRcdGNhbkhhdmVDaGlsZHJlbjogZG9tLmNhbkhhdmVDaGlsZHJlbixcclxuXHRcdGlzSW5saW5lOiBkb20uaXNJbmxpbmUsXHJcblx0XHRjb3B5Q1NTOiBkb20uY29weUNTUyxcclxuXHRcdGZpeE5lc3Rpbmc6IGRvbS5maXhOZXN0aW5nLFxyXG5cdFx0ZmluZENvbW1vbkFuY2VzdG9yOiBkb20uZmluZENvbW1vbkFuY2VzdG9yLFxyXG5cdFx0Z2V0U2libGluZzogZG9tLmdldFNpYmxpbmcsXHJcblx0XHRyZW1vdmVXaGl0ZVNwYWNlOiBkb20ucmVtb3ZlV2hpdGVTcGFjZSxcclxuXHRcdGV4dHJhY3RDb250ZW50czogZG9tLmV4dHJhY3RDb250ZW50cyxcclxuXHRcdGdldE9mZnNldDogZG9tLmdldE9mZnNldCxcclxuXHRcdGdldFN0eWxlOiBkb20uZ2V0U3R5bGUsXHJcblx0XHRoYXNTdHlsZTogZG9tLmhhc1N0eWxlXHJcblx0fSxcclxuXHJcblx0dXRpbHM6IHtcclxuXHRcdGVhY2g6IHV0aWxzLmVhY2gsXHJcblx0XHRpc0VtcHR5T2JqZWN0OiB1dGlscy5pc0VtcHR5T2JqZWN0LFxyXG5cdFx0ZXh0ZW5kOiB1dGlscy5leHRlbmRcclxuXHR9LFxyXG5cclxuXHRwbHVnaW5zOiBQbHVnaW5NYW5hZ2VyLnBsdWdpbnMsXHJcblxyXG5cdGNyZWF0ZTogKHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50LCBvcHRpb25zOiBhbnkpOiB2b2lkID0+IHtcclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHRcdC8vIERvbid0IGFsbG93IHRoZSBlZGl0b3IgdG8gYmUgaW5pdGlhbGlzZWRcclxuXHRcdC8vIG9uIGl0J3Mgb3duIHNvdXJjZSBlZGl0b3JcclxuXHRcdGlmIChkb20ucGFyZW50KHRleHRhcmVhLCAnLmVtbGVkaXRvci1jb250YWluZXInKSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMucnVuV2l0aG91dFd5c2l3eWdTdXBwb3J0IHx8IGJyb3dzZXIuaXNXeXNpd3lnU3VwcG9ydGVkKSB7XHJcblx0XHRcdChuZXcgRW1sRWRpdG9yKHRleHRhcmVhLCBvcHRpb25zKSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0aW5zdGFuY2U6IGZ1bmN0aW9uICh0ZXh0YXJlYTogYW55KSB7XHJcblx0XHRyZXR1cm4gdGV4dGFyZWEuX2VtbGVkaXRvcjtcclxuXHR9XHJcbn07XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==