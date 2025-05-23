/**
 * EmlEditor Paragraph Formatting Plugin
 * http://www.sceditor.com/
 *
 * Copyright (C) 2011-2013, Sam Clarke (samclarke.com)
 *
 * EmlEditor is licensed under the MIT license:
 *	http://www.opensource.org/licenses/mit-license.php
 *
 * @fileoverview EmlEditor Paragraph Formatting Plugin
 * @author Sam Clarke
 */
(function (emlEditor) {
	'use strict';

	emlEditor.plugins.format = function () {
		var base = this;

		/**
		 * Default tags
		 * @type {Object}
		 * @private
		 */
		var tags = {
			p: 'Paragraph',
			h1: 'Heading 1',
			h2: 'Heading 2',
			h3: 'Heading 3',
			h4: 'Heading 4',
			h5: 'Heading 5',
			h6: 'Heading 6',
			address: 'Address',
			pre: 'Preformatted Text'
		};

		/**
		 * Private functions
		 * @private
		 */
		var	insertTag,
			formatCmd;


		base.init = function () {
			var	opts  = this.opts,
				pOpts = opts.paragraphformat;

			// Don't enable if the BBCode plugin is enabled.
			if (opts.format && opts.format === 'bbcode') {
				return;
			}

			if (pOpts) {
				if (pOpts.tags) {
					tags = pOpts.tags;
				}

				if (pOpts.excludeTags) {
					pOpts.excludeTags.forEach(function (val) {
						delete tags[val];
					});
				}
			}

			if (!this.commands.format) {
				this.commands.format = {
					exec: formatCmd,
					txtExec: formatCmd,
					tooltip: 'Format Paragraph'
				};
			}

			if (opts.toolbar === emlEditor.defaultOptions.toolbar) {
				opts.toolbar = opts.toolbar.replace(',color,',
					',color,format,');
			}
		};

		/**
		 * Inserts the specified tag into the editor
		 *
		 * @param  {emlEditor} editor
		 * @param  {string} tag
		 * @private
		 */
		insertTag = function (editor, tag) {
			if (editor.sourceMode()) {
				editor.insert('<' + tag + '>', '</' + tag + '>');
			} else {
				editor.execCommand('formatblock', '<' + tag + '>');
			}

		};

		/**
		 * Function for the exec and txtExec properties
		 *
		 * @param  {node} caller
		 * @private
		 */
		formatCmd = function (caller) {
			var	editor   = this,
				content = document.createElement('div');

			emlEditor.utils.each(tags, function (tag, val) {
				var link = document.createElement('a');
				link.className = 'emleditor-option';
				link.textContent = val.name || val;
				link.addEventListener('click', function (e) {
					editor.closeDropDown(true);

					if (val.exec) {
						val.exec(editor);
					} else {
						insertTag(editor, tag);
					}

					e.preventDefault();
				});

				content.appendChild(link);
			});

			editor.createDropDown(caller, 'format', content);
		};
	};
})(emlEditor);
