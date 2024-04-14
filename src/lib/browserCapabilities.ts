export default class BrowserCapabilities {
	/**
	 * Is this an ios browser
	 */
	public static get isIos(): boolean {
		const USER_AGENT: string = navigator.userAgent;
		return /iPhone|iPod|iPad| wosbrowser\//i.test(USER_AGENT);;
	}

	/**
	 * Determine if wysiwyg is supported
	 */
	public static get isWysiwygSupported(): boolean {
		const USER_AGENT: string = navigator.userAgent;
		const ie = (/*@cc_on!@*/false);
		const legacyEdge = '-ms-ime-align' in document.documentElement.style;

		let match: RegExpExecArray
		let isUnsupported: boolean;
		let divElement = document.createElement('div');

		divElement.contentEditable = 'true';

		// Check if the contentEditable attribute is supported
		if (!('contentEditable' in document.documentElement) ||
			divElement.contentEditable !== 'true') {
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
				let match2 = match[1] as unknown;
				isUnsupported = (!match || !match2 ? true : match2 as number < 534);
			}
		}

		// The current version of Amazon Silk supports it, older versions didn't
		// As it uses webkit like Android, assume it's the same and started
		// working at versions >= 534
		if (/ Silk\//i.test(USER_AGENT)) {
			match = /AppleWebKit\/(\d+)/.exec(USER_AGENT);
			let match2 = match[1] as unknown;
			isUnsupported = (!match || !match2 ? true : match2 as number < 534);
		}

		// iOS 5+ supports content editable
		if (BrowserCapabilities.isIos) {
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
	}
}
