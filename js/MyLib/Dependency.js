/**
 * dependency manager class
 * reads configuration from dependencyConfiguration.js
 * provide other class names for other class definitions
 * used for different manager or mapper or other classes
 *
 * also it skips globally accessible variables / objects
 *
 * example dependency for class "MyLib_Foobar":
 * the name of the dependency is "foobar"
 * it is shared
 * the instantiated object is an object of the class "MyLib_Foobar"
 *
 * foobar: {
        shared:  true,
        className: 'MyLib_Foobar'
    }

 * if a class shall not be shared, if you need a fresh instance, provide shared = false
 * example for PewPew:
 * if you request the dependency for getting dependency "pewpew", a fresh instance is provided every time
 * pewpew: {
        shared:  false,
        className: 'MyLib_PewPew'
    }
 */
var MyLib_Dependency = Class({
	/**
	 * currently loaded configuration
	 */
	configuration: {},

	/**
	 * instantiated objects
	 */
	instances: {},

	__construct: function () {
		this.init();
	},

	/**
	 * check if the requested dependency is configured
	 *
	 * @param dependency {string}
	 * @returns {boolean}
	 */
	hasDependencyConfigured: function(dependency){
		return 'undefined' !== typeof this.configuration[dependency];
	},

	/**
	 * get the instance for the given dependency
	 *
	 * @param dependency {string}
	 * @returns {*}
	 */
	get: function(dependency){
		if(!this.configuration[dependency]){
			if(!this.instances[dependency]){
				throw 'unable to get dependency ' + dependency;
			}
			return this.instances[dependency];
		}

		this.loadFileIfNeeded(this.configuration[dependency].className);

		if('undefined' !== this.configuration[dependency].shared && true === this.configuration[dependency].shared){
			if(!this.instances[dependency]){
				this.instances[dependency] = eval('new ' + this.configuration[dependency].className + '();');
			}
			return this.instances[dependency];
		}

		return eval('new ' + this.configuration[dependency].className + '();');
	},

	getClassName: function(dependency){
		this.loadFileIfNeeded(this.configuration[dependency].className);
		return eval('' + this.configuration[dependency].className);
	},

	/**
	 * @param className {string}
	 * @returns {MyLib_Dependency}
	 */
	loadFileIfNeeded: function(className){
		var type = eval('typeof ' + className);
		if('function' === type){
			return this;
		}

		/**
		 * what happens here?
		 *
		 * usually the resources are always injected in resources.js
		 * but most of them are not needed.
		 *
		 * all classes are named like MyLib_Model_User and lying under /js/MyLib/Model/User.js
		 * so if the class MyLib_Model_User is not found, try to load /js/MyLib/Model/User.js
		 */
		var url = 'js/' + className.replace(new RegExp('_', 'g'), '/') + '.js';
		var ajaxCall = new XMLHttpRequest();
		ajaxCall.open('GET', url, false);
		ajaxCall.send('');

		var scriptElement = document.createElement('script');
		scriptElement.type = "text/javascript";
		scriptElement.text = ajaxCall.responseText;
		document.getElementsByTagName('head')[0].appendChild(scriptElement);

		return this;
	},

	/**
	 * set dependencies on the fly
	 * used for modules, plugins
	 *
	 * @param dependency {string}
	 * @param className {string}
	 * @param shared {boolean}
	 *
	 * @returns {MyLib_Dependency}
	 */
	setDependency: function(dependency, className, shared){
		this.configuration[dependency] = {
			className: className,
			shared: shared || false
		};

		return this;
	},

	/**
	 * set an instance for a dependency
	 *
	 * @param dependency {string}
	 * @param instance {*}
	 * @returns {MyLib_Dependency}
	 */
	setInstance: function(dependency, instance){
		this.instances[dependency] = instance;

		return this;
	},

	/**
	 * initialize the configuration
	 */
	init: function(){
		this.configuration = dependencyConfiguration;
	},

	/** @returns {MyLib_PewPew} */
	getPewPew: function(){
		return this.get('pewpew');
	},

	/** @returns {MyLib_Foobar} */
	getFoobar: function(){
		return this.get('foobar');
	}
});
