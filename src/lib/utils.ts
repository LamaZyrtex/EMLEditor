/**
 * Check if the passed argument is the
 * the passed type.
 *
 * @param {string} type
 * @param {*} arg
 * @returns {boolean}
 */
function isTypeof(type: string, arg: any): boolean {
	return typeof arg === type;
}

/**
 * @type {function(*): boolean}
 */
export var isString: (arg0: any) => boolean = isTypeof.bind(null, 'string');

/**
 * @type {function(*): boolean}
 */
export var isUndefined: (arg0: any) => boolean = isTypeof.bind(null, 'undefined');

/**
 * @type {function(*): boolean}
 */
export var isFunction: (arg0: any) => boolean = isTypeof.bind(null, 'function');

/**
 * @type {function(*): boolean}
 */
export var isNumber: (arg0: any) => boolean = isTypeof.bind(null, 'number');


/**
 * Returns true if an object has no keys
 *
 * @param {!Object} obj
 * @returns {boolean}
 */
export function isEmptyObject(obj: {}): boolean {
	return !Object.keys(obj).length;
}

/**
 * Extends the first object with any extra objects passed
 *
 * If the first argument is boolean and set to true
 * it will extend child arrays and objects recursively.
 *
 * @param {!Object|boolean} targetArg
 * @param {...Object} sourceArgs
 * @return {Object}
 */
export function extend(targetArg: any, ...sourceArgs: {}[]) {
	var isTargetBoolean = targetArg === !!targetArg;
	var i = isTargetBoolean ? 2 : 1;
	var target = isTargetBoolean ? sourceArgs : targetArg;
	var isDeep = isTargetBoolean ? targetArg : false;

	function isObject(value: {}) {
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
export function arrayRemove<T>(arr: Array<T>, item: T) {
	var i = arr.indexOf(item);

	if (i > -1) {
		arr.splice(i, 1);
	}
}

/**
 * Iterates over an array
 *
 * @param {|Array} obj
 * @param {function(*, *)} fn
 */
export function eachInArray<T>(arr: Array<T>, fn: (arg0: any, arg1: any) => any) {
	if (Array.isArray(arr) && (arr)?.length > 0) {
		for (var i = 0; i < arr.length; i++) {
			fn(i, arr[i]);
		}
	}
}

/**
 * Iterates over an object
 *
 * @param {!Object} obj
 * @param {function(*, *)} fn
 */
export function eachInObject(obj: any, fn: (arg0: any, arg1: any) => any) {
	{
		Object.keys(obj).forEach(function (key) {
			fn(key, obj[key as keyof typeof obj]);
		});
	}
}

