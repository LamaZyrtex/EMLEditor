export class PluginManager {


	constructor(thisObj: any) {

		PluginManager.plugins = {};
		/**
		 * Array of all currently registered plugins
		 *
		 * @type {Array}
		 * @private
		 */
		var registeredPlugins: any[] = [];



		/**
		 * Changes a signals name from "name" into "signalName".
		 *
		 * @param  {string} signal
		 * @return {string}
		 * @private
		 */
		var formatSignalName = function (signal: string): string {
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
		var callHandlers = function (args: IArguments, returnAtFirst: boolean): any {
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
		this.call = function (...args: any): void {
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
		this.callOnlyFirst = function (): any {
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
		this.hasHandler = function (signal: string): boolean {
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
		this.exists = function (plugin: string): boolean {
			if (plugin in PluginManager.plugins) {
				let pluginObj: {} = PluginManager.plugins[plugin as keyof typeof PluginManager.plugins];
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
		this.isRegistered = function (plugin: string): boolean {
			if (this.exists(plugin)) {
				var idx = registeredPlugins.length;

				while (idx--) {
					if (registeredPlugins[idx] instanceof PluginManager.plugins[plugin as keyof typeof PluginManager.plugins]) {
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
		this.register = function (plugin: string): boolean {
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
		this.deregister = function (plugin: string): boolean {
			var removedPlugin, pluginIdx = registeredPlugins.length, removed = false;

			if (!this.isRegistered(plugin)) {
				return removed;
			}

			while (pluginIdx--) {
				if (registeredPlugins[pluginIdx] instanceof PluginManager.plugins[plugin as keyof typeof PluginManager.plugins]) {
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

	static plugins: {};
	call: (...arg: any) => void;
	callOnlyFirst: () => any;
	hasHandler: (signal: string) => boolean;
	exists: (plugin: string) => boolean;
	isRegistered: (plugin: string) => boolean;
	register: (plugin: string) => boolean;
	deregister: (plugin: string) => boolean;
	destroy: () => void;
}

