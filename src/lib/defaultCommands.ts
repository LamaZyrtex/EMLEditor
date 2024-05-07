
import * as dom from './dom';
import * as utils from './utils';
import * as escape from './escape';
import * as templates from './templates';
import EmlEditor from './emlEditor';


/**
 * Map of all the commands for EmlEditor
 * @type {Object}
 * @name commands
 */
let defaultCommands: any = {

	fixFirefoxListBug: (editor: EmlEditor) => {
		// Only apply to Firefox as will break other browsers.
		if ('mozHidden' in document) {
			let node = editor.getBody() as HTMLElement;
			let next;

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
					if (!/^pre/.test(dom.css(node.parentNode as HTMLElement, 'whiteSpace'))) {
						dom.remove(node);
					}
				}

				node = next as any;
			}
		}
	},

	// START_COMMAND: Bold
	bold: {
		exec: 'bold',
		tooltip: 'Bold',
		shortcut: 'Ctrl+B'
	},

	// START_COMMAND: Italic
	italic: {
		exec: 'italic',
		tooltip: 'Italic',
		shortcut: 'Ctrl+I'
	},

	// START_COMMAND: Underline
	underline: {
		exec: 'underline',
		tooltip: 'Underline',
		shortcut: 'Ctrl+U'
	},

	// START_COMMAND: Strikethrough
	strike: {
		exec: 'strikethrough',
		tooltip: 'Strikethrough'
	},

	// START_COMMAND: Subscript
	subscript: {
		exec: 'subscript',
		tooltip: 'Subscript'
	},

	// START_COMMAND: Superscript
	superscript: {
		exec: 'superscript',
		tooltip: 'Superscript'
	},


	// START_COMMAND: Left
	left: {
		state: (node: HTMLElement) => {
			if (node && node.nodeType === 3) {
				node = node.parentNode as HTMLElement;
			}

			if (node) {
				let isLtr = dom.css(node, 'direction') === 'ltr';
				let align = dom.css(node, 'textAlign');

				// Can be -moz-left
				return /left/.test(align) ||
					align === (isLtr ? 'start' : 'end');
			}
		},
		exec: 'justifyleft',
		tooltip: 'Align left'
	},

	// START_COMMAND: Centre
	center: {
		exec: 'justifycenter',
		tooltip: 'Center'
	},

	// START_COMMAND: Right
	right: {
		state: (node: HTMLElement) => {
			if (node && node.nodeType === 3) {
				node = node.parentNode as HTMLElement;
			}

			if (node) {
				let isLtr = dom.css(node, 'direction') === 'ltr';
				let align = dom.css(node, 'textAlign');

				// Can be -moz-right
				return /right/.test(align) ||
					align === (isLtr ? 'end' : 'start');
			}
		},
		exec: 'justifyright',
		tooltip: 'Align right'
	},

	// START_COMMAND: Justify
	justify: {
		exec: 'justifyfull',
		tooltip: 'Justify'
	},


	// START_COMMAND: Font
	font: {
		_dropDown: function (editor: EmlEditor, caller: HTMLElement, callback: (str: string) => any) {
			var content = dom.createElement('div');

			dom.on(content, 'click', 'a', function (e: Event) {
				callback(dom.data(this, 'font'));
				editor.closeDropDown(true);
				e.preventDefault();
			});

			editor.editorOptions.fonts.split(',').forEach(function (font: any) {
				dom.appendChild(content, templates.getTemplate('fontOpt', { font: font }));
			});

			editor.createDropDown(caller, 'font-picker', content);
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance as EmlEditor;

			defaultCommands.font._dropDown(editor, caller, (fontName: string) => {
				editor.execCommand('fontname', fontName);
			});
		},
		tooltip: 'Font Name'
	},

	// START_COMMAND: Size
	size: {
		_dropDown: function (editor: EmlEditor, caller: HTMLElement, callback: (str: string) => any) {
			var content = dom.createElement('div');

			dom.on(content, 'click', 'a', function (e: Event) {
				callback(dom.data(this, 'size'));
				editor.closeDropDown(true);
				e.preventDefault();
			});

			for (var i = 1; i <= 7; i++) {
				dom.appendChild(content, templates.getTemplate('sizeOpt', {
					size: i
				}));
			}

			editor.createDropDown(caller, 'fontsize-picker', content);
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;

			defaultCommands.size._dropDown(editor, caller, (fontSize: string) => {
				editor.execCommand('fontsize', fontSize);
			});
		},
		tooltip: 'Font Size'
	},

	// START_COMMAND: Colour
	color: {
		_dropDown: function (editor: EmlEditor, caller: HTMLElement, callback: (str: string) => any) {
			var content = dom.createElement('div');
			var html = '';
			var cmd = defaultCommands.color;

			if (!cmd._htmlCache) {
				editor.editorOptions.colors.split('|').forEach(function (column: string) {
					html += '<div class="emleditor-color-column">';

					column.split(',').forEach(function (color: string) {
						html +=
							'<a href="#" class="emleditor-color-option"' +
							' style="background-color: ' + color + '"' +
							' data-color="' + color + '"></a>';
					});

					html += '</div>';
				});

				cmd._htmlCache = html;
			}

			dom.appendChild(content, dom.parseHTML(cmd._htmlCache));

			dom.on(content, 'click', 'a', function (e: Event) {
				callback(dom.data(this, 'color'));
				editor.closeDropDown(true);
				e.preventDefault();
			});

			editor.createDropDown(caller, 'color-picker', content);
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;

			defaultCommands.color._dropDown(editor, caller, function (color: string) {
				editor.execCommand('forecolor', color);
			});
		},
		tooltip: 'Font Color'
	},

	// START_COMMAND: Remove Format
	removeformat: {
		exec: 'removeformat',
		tooltip: 'Remove Formatting'
	},


	// START_COMMAND: Cut
	cut: {
		exec: 'cut',
		tooltip: 'Cut',
		errorMessage: 'Your browser does not allow the cut command. ' +
			'Please use the keyboard shortcut Ctrl/Cmd-X'
	},

	// START_COMMAND: Copy
	copy: {
		exec: 'copy',
		tooltip: 'Copy',
		errorMessage: 'Your browser does not allow the copy command. ' +
			'Please use the keyboard shortcut Ctrl/Cmd-C'
	},

	// START_COMMAND: Paste
	paste: {
		exec: 'paste',
		tooltip: 'Paste',
		errorMessage: 'Your browser does not allow the paste command. ' +
			'Please use the keyboard shortcut Ctrl/Cmd-V'
	},

	// START_COMMAND: Paste Text
	pastetext: {
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let val: string;
			let content = dom.createElement('div');
			let editor = editorInstance;

			dom.appendChild(content, templates.getTemplate('pastetext', {
				label: editor.translate(
					'Paste your text inside the following box:'
				),
				insert: editor.translate('Insert')
			}));

			dom.on(content, 'click', '.button', function (e: Event) {
				val = (dom.find(content, '#txt')[0] as HTMLTextAreaElement).value;

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

	// START_COMMAND: Bullet List
	bulletlist: {
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			defaultCommands.fixFirefoxListBug(editorInstance);
			editorInstance.execCommand('insertunorderedlist');
		},
		tooltip: 'Bullet list'
	},

	// START_COMMAND: Ordered List
	orderedlist: {
		exec: (caller?: HTMLElement, editorInstance?: EmlEditor) => {
			defaultCommands.fixFirefoxListBug(editorInstance);
			editorInstance.execCommand('insertorderedlist');
		},
		tooltip: 'Numbered list'
	},

	// START_COMMAND: Indent
	indent: {
		state: function (parent: any, firstBlock: HTMLElement) {
			// Only works with lists, for now
			let range, startParent, endParent;

			if (dom.is(firstBlock, 'li')) {
				return 0;
			}

			if (dom.is(firstBlock, 'ul,ol,menu')) {
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
					(dom.is(endParent, 'li') && endParent !==
						endParent.parentNode.lastElementChild)) {
					return 0;
				}
			}

			return -1;
		},
		exec: (caller?: HTMLElement, editorInstance?: EmlEditor) => {
			let editor = editorInstance;
			let block = editor.getRangeHelper().getFirstBlockParent();

			editor.focus();

			// An indent system is quite complicated as there are loads
			// of complications and issues around how to indent text
			// As default, let's just stay with indenting the lists,
			// at least, for now.
			if (dom.closest(block, 'ul,ol,menu')) {
				editor.execCommand('indent', undefined);
			}
		},
		tooltip: 'Add indent'
	},

	// START_COMMAND: Outdent
	outdent: {
		state: function (parents: any, firstBlock: HTMLElement) {
			return dom.closest(firstBlock, 'ul,ol,menu') ? 0 : -1;
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let block = editorInstance.getRangeHelper().getFirstBlockParent();
			if (dom.closest(block, 'ul,ol,menu')) {
				editorInstance.execCommand('outdent', undefined);
			}
		},
		tooltip: 'Remove one indent'
	},


	// START_COMMAND: Table
	table: {
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;
			let content = dom.createElement('div');

			dom.appendChild(content, templates.getTemplate('table', {
				rows: editor.translate('Rows:'),
				cols: editor.translate('Cols:'),
				insert: editor.translate('Insert')
			}));

			dom.on(content, 'click', '.button', function (e: Event) {
				let rows = Number((dom.find(content, '#rows')[0] as HTMLTextAreaElement).value),
					cols = Number((dom.find(content, '#cols')[0] as HTMLTextAreaElement).value),
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


	// START_COMMAND: Horizontal Rule
	horizontalrule: {
		exec: 'inserthorizontalrule',
		tooltip: 'Insert a horizontal rule'
	},


	// START_COMMAND: Code
	code: {
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			editorInstance.wysiwygEditorInsertHtml(
				'<code>',
				'<br /></code>'
			);
		},
		tooltip: 'Code'
	},


	// START_COMMAND: Image
	image: {
		_dropDown: function (editor: EmlEditor, caller: HTMLElement, selected: any, callback: (inputVal: string, widthVal: string, heightVal: string) => void) {
			let content = dom.createElement('div');

			dom.appendChild(content, templates.getTemplate('image', {
				url: editor.translate('URL:'),
				width: editor.translate('Width (optional):'),
				height: editor.translate('Height (optional):'),
				insert: editor.translate('Insert')
			}));


			let urlInput = dom.find(content, '#image')[0] as HTMLInputElement;

			urlInput.value = selected;

			dom.on(content, 'click', '.button', function (e: Event) {
				if (urlInput.value) {
					callback(
						urlInput.value,
						(dom.find(content, '#width')[0] as HTMLInputElement).value,
						(dom.find(content, '#height')[0] as HTMLInputElement).value
					);
				}

				editor.closeDropDown(true);
				e.preventDefault();
			});

			editor.createDropDown(caller, 'insertimage', content);
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;

			defaultCommands.image._dropDown(
				editor,
				caller,
				'',
				function (url: string, width?: string, height?: string) {
					let attrs = '';

					if (width) {
						attrs += ' width="' + parseInt(width, 10) + '"';
					}

					if (height) {
						attrs += ' height="' + parseInt(height, 10) + '"';
					}

					attrs += ' src="' + escape.entities(url) + '"';

					editor.wysiwygEditorInsertHtml(
						'<img' + attrs + ' />'
					);
				}
			);
		},
		tooltip: 'Insert an image'
	},


	// START_COMMAND: E-mail
	email: {
		_dropDown: function (editor: EmlEditor, caller: HTMLElement, callback: (email: string, des: string) => void) {
			let content = dom.createElement('div');

			dom.appendChild(content, templates.getTemplate('email', {
				label: editor.translate('E-mail:'),
				desc: editor.translate('Description (optional):'),
				insert: editor.translate('Insert')
			}));

			dom.on(content, 'click', '.button', function (e: Event) {
				let email: string = (dom.find(content, '#email')[0] as HTMLInputElement).value;

				if (email) {
					callback(email, (dom.find(content, '#des')[0] as HTMLInputElement).value);
				}

				editor.closeDropDown(true);
				e.preventDefault();
			});

			editor.createDropDown(caller, 'insertemail', content);
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;

			defaultCommands.email._dropDown(
				editor,
				caller,
				function (email: string, text: string) {
					if (!editor.getRangeHelper().selectedHtml() || text) {
						editor.wysiwygEditorInsertHtml(
							'<a href="' +
							'mailto:' + escape.entities(email) + '">' +
							escape.entities((text || email)) +
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


	// START_COMMAND: Link
	link: {
		_dropDown: function (editor: EmlEditor, caller: HTMLElement, callback: (link: string, val: string) => void) {
			let content = dom.createElement('div');

			dom.appendChild(content, templates.getTemplate('link', {
				url: editor.translate('URL:'),
				desc: editor.translate('Description (optional):'),
				ins: editor.translate('Insert')
			}));

			let linkInput = dom.find(content, '#link')[0] as HTMLInputElement;
			let desInput = dom.find(content, '#des')[0] as HTMLInputElement;

			function insertUrl(e: Event) {
				if (linkInput.value) {
					callback(linkInput.value, desInput.value);
				}

				editor.closeDropDown(true);
				e.preventDefault();
			}

			dom.on(content, 'click', '.button', insertUrl);
			dom.on(content, 'keypress', null, function (e: KeyboardEvent) {
				// 13 = enter key
				if (e.which === 13 && linkInput.value) {
					insertUrl(e);
				}
			}, dom.EVENT_CAPTURE);

			editor.createDropDown(caller, 'insertlink', content);
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;

			defaultCommands.link._dropDown(editor, caller, function (url: string, text: string) {
				if (text || !editor.getRangeHelper().selectedHtml()) {
					editor.wysiwygEditorInsertHtml(
						'<a href="' + escape.entities(url) + '">' +
						escape.entities(text || url) +
						'</a>'
					);
				} else {
					editor.execCommand('createlink', url);
				}
			});
		},
		tooltip: 'Insert a link'
	},


	// START_COMMAND: Unlink
	unlink: {
		state: function () {
			return dom.closest(this.CurrentNode(), 'a') ? 0 : -1;
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let anchor = dom.closest(editorInstance.CurrentNode(), 'a');

			if (anchor) {
				while (anchor.firstChild) {
					dom.insertBefore(anchor.firstChild as HTMLElement, anchor);
				}

				dom.remove(anchor);
			}
		},
		tooltip: 'Unlink'
	},



	// START_COMMAND: Quote
	quote: {
		exec: (caller: HTMLElement, editorInstance?: EmlEditor, html?: string, author?: string) => {
			let before = '<blockquote>';
			let end = '</blockquote>';

			// if there is HTML passed set end to null so any selected
			// text is replaced
			if (html) {
				author = (author ? '<cite>' +
					escape.entities(author) +
					'</cite>' : '');
				before = before + author + html + end;
				end = null;
				// if not add a newline to the end of the inserted quote
			} else if (editorInstance.getRangeHelper().selectedHtml() === '') {
				end = '<br />' + end;
			}

			editorInstance.wysiwygEditorInsertHtml(before, end);
		},
		tooltip: 'Insert a Quote'
	},


	// START_COMMAND: Emoticons
	emoticon: {
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;

			let createContent = function (includeMore: boolean) {
				let moreLink,
					opts = editor.editorOptions,
					emoticonsRoot = opts.emoticonsRoot || '',
					emoticonsCompat = opts.emoticonsCompat,
					rangeHelper = editor.getRangeHelper(),
					startSpace = emoticonsCompat &&
						rangeHelper.getOuterText(true, 1) !== ' ' ? ' ' : '',
					endSpace = emoticonsCompat &&
						rangeHelper.getOuterText(false, 1) !== ' ' ? ' ' : '',
					content = dom.createElement('div'),
					line = dom.createElement('div'),
					perLine = 0,
					emoticons = utils.extend(
						{},
						opts.emoticons.dropdown,
						includeMore ? opts.emoticons.more : {}
					);

				dom.appendChild(content, line);

				perLine = Math.sqrt(Object.keys(emoticons).length);

				dom.on(content, 'click', 'img', function (e: Event) {
					editor.insert(startSpace + dom.attr(this, 'alt') + endSpace, null, false).closeDropDown(true);

					e.preventDefault();
				});

				utils.eachInObject(emoticons, function (code, emoticon) {
					dom.appendChild(line, dom.createElement('img', {
						src: emoticonsRoot + (emoticon.url || emoticon),
						alt: code,
						title: emoticon.tooltip || code
					}));

					if (line.children.length >= perLine) {
						line = dom.createElement('div');
						dom.appendChild(content, line);
					}
				});

				if (!includeMore && opts.emoticons.more) {
					moreLink = dom.createElement('a', {
						className: 'emleditor-more'
					});

					dom.appendChild(moreLink,
						document.createTextNode(editor.translate('More')));

					dom.on(moreLink, 'click', null, function (e: Event) {
						editor.createDropDown(
							caller, 'more-emoticons', createContent(true)
						);

						e.preventDefault();
					});

					dom.appendChild(content, moreLink);
				}

				return content;
			};

			editor.createDropDown(caller, 'emoticons', createContent(false));
		},
		txtExec: function (caller: HTMLElement) {
			defaultCommands.emoticon.exec.call(this, caller);
		},
		tooltip: 'Insert an emoticon'
	},


	// START_COMMAND: YouTube
	youtube: {
		_dropDown: function (editor: EmlEditor, caller: HTMLElement, callback: (match: any, time: number) => void) {
			let content = dom.createElement('div');

			dom.appendChild(content, templates.getTemplate('youtubeMenu', {
				label: editor.translate('Video URL:'),
				insert: editor.translate('Insert')
			}));

			dom.on(content, 'click', '.button', function (e: Event) {
				let val = (dom.find(content, '#link')[0] as HTMLInputElement).value;
				let idMatch = val.match(/(?:v=|v\/|embed\/|youtu.be\/)?([a-zA-Z0-9_-]{11})/);
				let timeMatch = val.match(/[&|?](?:star)?t=((\d+[hms]?){1,3})/);
				let time = 0;

				if (timeMatch) {
					utils.eachInArray(timeMatch[1].split(/[hms]/), function (i, val) {
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
		exec: function (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) {
			let editor = editorInstance;

			defaultCommands.youtube._dropDown(editor, caller, function (id: any, time: any) {
				editor.wysiwygEditorInsertHtml(templates.getTemplateAsString('youtube', {
					id: id,
					time: time
				}));
			});
		},
		tooltip: 'Insert a YouTube video'
	},


	// START_COMMAND: Date
	date: {
		_date: function (editor: EmlEditor) {
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
		exec: function (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) {
			editorInstance.insertText(defaultCommands.date._date(editorInstance));
		},
		txtExec: function () {
			this.insertText(defaultCommands.date._date(this));
		},
		tooltip: 'Insert current date'
	},


	// START_COMMAND: Time
	time: {
		_time: function () {
			let now = new Date(),
				hours = now.getHours(),
				mins = now.getMinutes(),
				secs = now.getSeconds();
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
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			editorInstance.insertText(defaultCommands.time._time());
		},
		txtExec: function () {
			this.insertText(defaultCommands.time._time());
		},
		tooltip: 'Insert current time'
	},



	// START_COMMAND: Ltr
	ltr: {
		state: function (parents: any, firstBlock: HTMLElement) {
			return firstBlock && firstBlock.style.direction === 'ltr';
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;
			let rangeHelper = editor.getRangeHelper();
			let node = rangeHelper.getFirstBlockParent();

			editor.focus();

			if (!node || dom.is(node, 'body')) {
				editor.execCommand('formatBlock', 'p');

				node = rangeHelper.getFirstBlockParent();

				if (!node || dom.is(node, 'body')) {
					return;
				}
			}

			let toggleValue = dom.css(node, 'direction') === 'ltr' ? '' : 'ltr';
			dom.css(node, 'direction', toggleValue);
		},
		tooltip: 'Left-to-Right'
	},


	// START_COMMAND: Rtl
	rtl: {
		state: function (parents: any, firstBlock: HTMLElement) {
			return firstBlock && firstBlock.style.direction === 'rtl';
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			let editor = editorInstance;
			let rangeHelper = editor.getRangeHelper();
			let node = rangeHelper.getFirstBlockParent();

			editor.focus();

			if (!node || dom.is(node, 'body')) {
				editor.execCommand('formatBlock', 'p');

				node = rangeHelper.getFirstBlockParent();

				if (!node || dom.is(node, 'body')) {
					return;
				}
			}

			let toggleValue = dom.css(node, 'direction') === 'rtl' ? '' : 'rtl';
			dom.css(node, 'direction', toggleValue);
		},
		tooltip: 'Right-to-Left'
	},



	// START_COMMAND: Print
	print: {
		exec: 'print',
		tooltip: 'Print'
	},


	// START_COMMAND: Maximize
	maximize: {
		state: function () {
			return this.maximize();
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			editorInstance.maximize(!editorInstance.maximize());
			editorInstance.focus();
		},
		txtExec: function () {
			this.maximize(!this.maximize());
			this.focus();
		},
		tooltip: 'Maximize',
		shortcut: 'Ctrl+Shift+M'
	},


	// START_COMMAND: Source
	source: {
		state: function () {
			return this.sourceMode();
		},
		exec: (caller: HTMLElement = undefined, editorInstance: EmlEditor = undefined) => {
			editorInstance.toggleSourceMode();
			editorInstance.focus();
		},
		txtExec: function () {
			this.toggleSourceMode();
			this.focus();
		},
		tooltip: 'View source',
		shortcut: 'Ctrl+Shift+S'
	},


	// this is here so that commands above can be removed
	// without having to remove the , after the last one.
	// Needed for IE.
	ignore: {}
};

export default defaultCommands;
