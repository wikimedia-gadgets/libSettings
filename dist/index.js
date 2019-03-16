/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./test/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./modules/Option.js":
/*!***************************!*\
  !*** ./modules/Option.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/** Represents an option.\n * @abstract\n * @param {Object} config\n * @property {string} config.name Name of option. (required)\n * @property {*} config.defaultValue (required)\n * @property {string} config.label Text displayed in settings. (required)\n * @property {string} config.helptip Help text shown in settings.\n * @property {Array} config.possibleValues Either [ <value>, .. ] or\n *  [ [ <InternalValue>, <ValueDisplayedInSettings> ], .. ].\n *  Value is validated against possibleValues.\n * @param {string} type Type of option. Should be same as name of extending class minus\n *  Option at the end (e.g \"Color\" for \"ColorOption\" class)\n * @param {...string} basetypes Type(s) to validate against (Defined by extending classes).\n*/\n\nvar Option = function () {\n\tfunction Option(config, type) {\n\t\t_classCallCheck(this, Option);\n\n\t\tthis.name = config.name;\n\t\tthis.defaultValue = config.defaultValue;\n\t\tthis.values = config.values;\n\t\tthis.label = config.label;\n\t\tthis.helptip = config.helptip;\n\t\tthis.type = type;\n\t\tthis.FieldLayout = true;\n\t\tthis.helpInline =  true || false; /* TODO would want to be able to set all helpinline for a panel or entire settings window\n                                               (e.g for twinkle would want to set all helpinline to true (probably don't want to mix types for at-least a panel - make it an optionsConfig preference for each panel and for the whole optionsConfig )) */\n\t}\n\n\t_createClass(Option, [{\n\t\tkey: \"reset\",\n\t\tvalue: function reset() {\n\t\t\tthis.customValue = undefined;\n\t\t}\n\n\t\t/**\n   * CreateUI.\n   * @return {OO.ui.element}\n   * //TODO could also be a  mw.widget..how generic can the UI element returned be\n   * prolly create a standard for what functions must be defined by output?\n   * i.e, must satisfy certain portions of OO.ui.element to work\n   * before we can't build the settings menu with it?\n   */\n\n\t}, {\n\t\tkey: \"UI\",\n\t\tvalue: function UI() {\n\t\t\treturn mw.log.error(\"UI not defined by extending class \" + this.type + \"Option.\");\n\t\t}\n\t}, {\n\t\tkey: \"getUIvalue\",\n\t\tvalue: function getUIvalue() {\n\t\t\treturn mw.log.error(\"getUIvalue not defined by extending class \" + this.type + \"Option.\");\n\t\t}\n\n\t\t/**\n   * Return only custom values of option from UI. (called when saving settings. )\n   * @return {*} value\n   */\n\n\t}, {\n\t\tkey: \"getCustomUIValue\",\n\t\tvalue: function getCustomUIValue() {\n\t\t\tvar UIValue = this.getUIvalue();\n\t\t\tif (UIValue !== this.defaultValue) {\n\t\t\t\treturn UIValue;\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: \"value\",\n\t\tget: function get() {\n\t\t\tif (this.customValue !== undefined) {\n\t\t\t\treturn this.customValue;\n\t\t\t} else {\n\t\t\t\treturn this.defaultValue;\n\t\t\t}\n\t\t}\n\t}]);\n\n\treturn Option;\n}();\n\nexports.default = Option;\n\n//# sourceURL=webpack:///./modules/Option.js?");

/***/ }),

/***/ "./modules/Options/BooleanOption.js":
/*!******************************************!*\
  !*** ./modules/Options/BooleanOption.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Option2 = __webpack_require__(/*! Option.js */ \"./modules/Option.js\");\n\nvar _Option3 = _interopRequireDefault(_Option2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @extends Option\n */\nvar BooleanOption = function (_Option) {\n\t_inherits(BooleanOption, _Option);\n\n\tfunction BooleanOption(config) {\n\t\t_classCallCheck(this, BooleanOption);\n\n\t\treturn _possibleConstructorReturn(this, (BooleanOption.__proto__ || Object.getPrototypeOf(BooleanOption)).call(this, config, 'Boolean', ['boolean']));\n\t}\n\n\t_createClass(BooleanOption, [{\n\t\tkey: 'UI',\n\t\tvalue: function UI() {\n\t\t\tthis.checkbox = new OO.ui.CheckboxInputWidget({\n\t\t\t\tname: this.name,\n\t\t\t\tselected: this.value\n\t\t\t});\n\n\t\t\treturn new OO.ui.FieldLayout(this.checkbox, {\n\t\t\t\thelp: this.helptip,\n\t\t\t\tlabel: this.label,\n\t\t\t\thelpInline: this.helpInline,\n\t\t\t\talign: 'inline'\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'getUIvalue',\n\t\tvalue: function getUIvalue() {\n\t\t\treturn this.checkbox.isSelected();\n\t\t}\n\t}]);\n\n\treturn BooleanOption;\n}(_Option3.default);\n\nexports.default = BooleanOption;\n\n//# sourceURL=webpack:///./modules/Options/BooleanOption.js?");

/***/ }),

/***/ "./modules/Options/DateOption.js":
/*!***************************************!*\
  !*** ./modules/Options/DateOption.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Option2 = __webpack_require__(/*! Option.js */ \"./modules/Option.js\");\n\nvar _Option3 = _interopRequireDefault(_Option2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Use mw.widgets.DateInputWidget\n * @extends Option\n */\nvar DateOption = function (_Option) {\n  _inherits(DateOption, _Option);\n\n  function DateOption(config) {\n    _classCallCheck(this, DateOption);\n\n    return _possibleConstructorReturn(this, (DateOption.__proto__ || Object.getPrototypeOf(DateOption)).call(this, config, 'Date', 'Date'));\n  }\n\n  return DateOption;\n}(_Option3.default);\n\nexports.default = DateOption;\n\n//# sourceURL=webpack:///./modules/Options/DateOption.js?");

/***/ }),

/***/ "./modules/Options/NumberOption.js":
/*!*****************************************!*\
  !*** ./modules/Options/NumberOption.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Option2 = __webpack_require__(/*! Option.js */ \"./modules/Option.js\");\n\nvar _Option3 = _interopRequireDefault(_Option2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @extends Option\n */\nvar NumberOption = function (_Option) {\n\t_inherits(NumberOption, _Option);\n\n\tfunction NumberOption(config) {\n\t\t_classCallCheck(this, NumberOption);\n\n\t\treturn _possibleConstructorReturn(this, (NumberOption.__proto__ || Object.getPrototypeOf(NumberOption)).call(this, config, 'Number'));\n\t}\n\n\t_createClass(NumberOption, [{\n\t\tkey: 'UI',\n\t\tvalue: function UI() {\n\t\t\tthis.numberInput = new OO.ui.NumberInputWidget({\n\t\t\t\tname: this.name,\n\t\t\t\ttext: this.label,\n\t\t\t\tinput: { value: this.value },\n\t\t\t\tmin: this.values.min,\n\t\t\t\tmax: this.values.max\n\t\t\t});\n\n\t\t\treturn new OO.ui.FieldLayout(this.numberInput, {\n\t\t\t\thelp: this.helptip,\n\t\t\t\thelpInline: this.helpInline,\n\t\t\t\talign: 'inline'\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'getUIvalue',\n\t\tvalue: function getUIvalue() {\n\t\t\treturn this.numberInput.getValue();\n\t\t}\n\t}]);\n\n\treturn NumberOption;\n}(_Option3.default);\n\nexports.default = NumberOption;\n\n//# sourceURL=webpack:///./modules/Options/NumberOption.js?");

/***/ }),

/***/ "./modules/Settings.js":
/*!*****************************!*\
  !*** ./modules/Settings.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _SettingsDialog = __webpack_require__(/*! SettingsDialog.js */ \"./modules/SettingsDialog.js\");\n\nvar _SettingsDialog2 = _interopRequireDefault(_SettingsDialog);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * @param {Array.<Object>} optionsConfig\n * @property {string} optionsConfig[].title Header of particular set of preferences\n * @property {(boolean|Function)} [optionsConfig[].show] Boolean or function that returns a\n * Boolean. Can use anonymous function when a variable is only loaded after the settings is loaded.\n * @property {(boolean|Function)} [optionsConfig[].collapsed] Whether the settings should be\n *  collapsed (e.g, if it is rarely used \"Advanced\" settings).\n * @property {...libSettings.Option} optionsConfig[].preferences Array of Option objects.\n * @param {Object} settingsConfig\n * @property {string} settingsConfig.scriptName\n * @property {string} [settingsConfig.optionName = scriptName] optionName is the name under which\n * the options are stored using API:Options.( \"userjs-\" is prepended to this ).\n * @property {string} settingsConfig.size Same as https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.Window-static-property-size\n * @property {number} settingsConfig.title\n * @property {string} [settingsConfig.customSaveFailMessage]\n *\n*/\n\nvar Settings = function () {\n\tfunction Settings(optionsConfig, settingsConfig) {\n\t\t_classCallCheck(this, Settings);\n\n\t\t// optionsConfig\n\t\tthis.optionsConfig = optionsConfig;\n\t\t/* this.defaultOptions = {};\n  this.runOverOptionsConfig( ( option ) => {\n  \tthis.defaultOptions[ option.name ] = option.defaultValue;\n  } );*/\n\t\tthis.scriptName = settingsConfig.scriptName;\n\t\tthis.optionName = 'userjs-' + (settingsConfig.optionName || settingsConfig.scriptName);\n\t\tthis.size = settingsConfig.size;\n\t\tthis.title = settingsConfig.title || 'Settings';\n\t\tthis.saveMessage = 'Settings for ' + this.scriptName + ' successfully saved.';\n\t\tthis.saveFailMessage = settingsConfig.customSaveFailMessage || 'Could not save settings for ' + this.scriptName + '.';\n\t}\n\n\t/* Traverse through optionsConfig and get the requested value from the key,\n  * returning as a pair of option name and that value.\n  * settings menu\n  * @function\n  * @return {Object} */\n\n\n\t_createClass(Settings, [{\n\t\tkey: 'runOverOptionsConfig',\n\t\tvalue: function runOverOptionsConfig(func) {\n\t\t\tthis.optionsConfig.forEach(function (element) {\n\t\t\t\telement.preferences.forEach(function (option) {\n\t\t\t\t\tfunc(option);\n\t\t\t\t});\n\t\t\t});\n\t\t}\n\n\t\t/** Get settings\n   * @func\n   * @return {Object} { [optionName]: [optionValue],...}\n  */\n\n\t}, {\n\t\tkey: 'get',\n\t\tvalue: function get() {\n\t\t\tvar _this = this;\n\n\t\t\tif (!this.options) {\n\t\t\t\tthis.optionsText = mw.user.options.get(this.optionName);\n\t\t\t\tthis.userOptions = JSON.parse(this.optionsText);\n\t\t\t\t// transfer userOptions to optionsConfig\n\t\t\t\tthis.runOverOptionsConfig(function (option) {\n\t\t\t\t\tvar userOption = _this.userOptions[option.name];\n\t\t\t\t\tif (userOption !== undefined) {\n\t\t\t\t\t\toption.customValue = userOption;\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\t// Then retrieve it, along with default Option as necessary\n\t\t\t\tthis.options = {};\n\t\t\t\tthis.runOverOptionsConfig(function (option) {\n\t\t\t\t\t_this.options[option.name] = option.value;\n\t\t\t\t});\n\t\t\t}\n\t\t\treturn this.options;\n\t\t}\n\n\t\t/** Save settings\n   * Only saves unique settings, i.e settings that are different from the default\n   * @returns {Promise}\n   */\n\n\t}, {\n\t\tkey: 'save',\n\t\tvalue: function save() {\n\t\t\tvar _this2 = this;\n\n\t\t\treturn mw.loader.using('mediawiki.api').then(function () {\n\t\t\t\t_this2.API = new mw.Api({\n\t\t\t\t\tajax: {\n\t\t\t\t\t\theaders: {\n\t\t\t\t\t\t\t'Api-User-Agent': 'Script ' + _this2.scriptName + ' using libSettings.'\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t\t_this2.newUserOptions = {};\n\t\t\t\t_this2.runOverOptionsConfig(function (option) {\n\t\t\t\t\t_this2.newUserOptions[option.name] = option.getCustomUIValue();\n\t\t\t\t});\n\t\t\t\treturn _this2.API.saveOption(_this2.optionName, JSON.stringify(_this2.newUserOptions));\n\t\t\t});\n\t\t}\n\t}, {\n\t\tkey: 'reset',\n\t\tvalue: function reset() {\n\t\t\tthis.runOverOptionsConfig(function (option) {\n\t\t\t\treturn option.reset();\n\t\t\t});\n\t\t\tthis.options = undefined;\n\t\t}\n\t}, {\n\t\tkey: 'displayMain',\n\t\tvalue: function displayMain() {\n\t\t\tvar SettingsDialog = (0, _SettingsDialog2.default)();\n\t\t\t// Make the window.\n\t\t\tvar settingsDialog = new SettingsDialog({\n\t\t\t\tsize: this.size\n\t\t\t}, this);\n\n\t\t\t// Create and append a window manager\n\t\t\tvar windowManager = new OO.ui.WindowManager();\n\n\t\t\t// eslint-disable-next-line jquery/no-global-selector\n\t\t\t$('body').append(windowManager.$element);\n\n\t\t\twindowManager.addWindows([settingsDialog]);\n\t\t\twindowManager.openWindow(settingsDialog);\n\t\t\treturn settingsDialog;\n\t\t}\n\t}, {\n\t\tkey: 'display',\n\t\tvalue: function display() {\n\t\t\tvar _this3 = this;\n\n\t\t\tthis.get();\n\t\t\tmw.loader.using(['oojs-ui-core', 'oojs-ui-widgets', 'oojs-ui-windows']).then(function () {\n\t\t\t\treturn _this3.displayMain();\n\t\t\t});\n\t\t}\n\t}]);\n\n\treturn Settings;\n}();\n\nexports.default = Settings;\n\n//# sourceURL=webpack:///./modules/Settings.js?");

/***/ }),

/***/ "./modules/SettingsDialog.js":
/*!***********************************!*\
  !*** ./modules/SettingsDialog.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nexports.default = wrapSettingsDialog;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction wrapSettingsDialog() {\n\tvar SettingsDialog = function (_OO$ui$ProcessDialog) {\n\t\t_inherits(SettingsDialog, _OO$ui$ProcessDialog);\n\n\t\tfunction SettingsDialog(config, self) {\n\t\t\t_classCallCheck(this, SettingsDialog);\n\n\t\t\tvar _this = _possibleConstructorReturn(this, (SettingsDialog.__proto__ || Object.getPrototypeOf(SettingsDialog)).call(this, config));\n\n\t\t\t_this.settings = self;\n\t\t\tSettingsDialog.static.name = 'settingsDialog';\n\t\t\tSettingsDialog.static.title = _this.settings.title;\n\t\t\tSettingsDialog.static.actions = [{ action: 'save', label: 'Save settings', flags: ['primary', 'progressive'] }, { label: 'Cancel', flags: ['safe', 'destructive'] }, { action: 'reset', label: 'Show defaults' }];\n\t\t\treturn _this;\n\t\t}\n\n\t\t_createClass(SettingsDialog, [{\n\t\t\tkey: 'genInternalUI',\n\t\t\tvalue: function genInternalUI() {\n\t\t\t\tvar pages = [];\n\t\t\t\tvar internalUI = void 0;\n\n\t\t\t\tvar onePage = this.settings.optionsConfig.length === 1;\n\t\t\t\tthis.settings.optionsConfig.forEach(function (element) {\n\t\t\t\t\tvar Temp = function Temp(name, config) {\n\t\t\t\t\t\tvar _this2 = this;\n\n\t\t\t\t\t\tTemp.super.call(this, name, config);\n\t\t\t\t\t\telement.preferences.forEach(function (option) {\n\t\t\t\t\t\t\t_this2.$element.append(option.UI().$element);\n\t\t\t\t\t\t});\n\t\t\t\t\t};\n\n\t\t\t\t\tOO.inheritClass(Temp, OO.ui.PageLayout);\n\t\t\t\t\tTemp.prototype.setupOutlineItem = function () {\n\t\t\t\t\t\tthis.outlineItem.setLabel(element.title);\n\t\t\t\t\t};\n\n\t\t\t\t\tvar temp = new Temp(element.title, { padded: onePage });\n\t\t\t\t\tpages.push(temp);\n\t\t\t\t});\n\n\t\t\t\tif (!onePage) {\n\t\t\t\t\tinternalUI = new OO.ui.BookletLayout({\n\t\t\t\t\t\toutlined: true\n\t\t\t\t\t});\n\n\t\t\t\t\tinternalUI.addPages(pages);\n\t\t\t\t} else {\n\t\t\t\t\tinternalUI = pages[0];\n\t\t\t\t}\n\n\t\t\t\treturn internalUI;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'initialize',\n\t\t\tvalue: function initialize() {\n\t\t\t\t_get(SettingsDialog.prototype.__proto__ || Object.getPrototypeOf(SettingsDialog.prototype), 'initialize', this).call(this);\n\t\t\t\tthis.content = this.genInternalUI();\n\t\t\t\tthis.$body.append(this.content.$element);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'getActionProcess',\n\t\t\tvalue: function getActionProcess(action) {\n\t\t\t\tvar _this3 = this;\n\n\t\t\t\tif (action === 'save') {\n\t\t\t\t\treturn new OO.ui.Process(function () {\n\t\t\t\t\t\tvar promise = _this3.settings.save();\n\t\t\t\t\t\t_this3.pushPending();\n\t\t\t\t\t\t_this3.close(promise);\n\t\t\t\t\t\tpromise.then(function () {\n\t\t\t\t\t\t\tmw.notify(_this3.settings.saveMessage);\n\t\t\t\t\t\t}, function () {\n\t\t\t\t\t\t\tmw.notify(_this3.settings.saveFailMessage);\n\t\t\t\t\t\t});\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\t/* Disable show defaults button if user settings are default;\n    ** have another button next to show default to 'show your current saved settings' (which is disabled if haven't modified yet )\n    */\n\t\t\t\tif (action === 'reset') {\n\t\t\t\t\treturn new OO.ui.Process(function () {\n\t\t\t\t\t\t_this3.settings.reset();\n\t\t\t\t\t\tvar currentPageName = _this3.content.getCurrentPageName();\n\t\t\t\t\t\t_this3.content = _this3.genInternalUI();\n\t\t\t\t\t\tif (currentPageName) {\n\t\t\t\t\t\t\t_this3.content.setPage(currentPageName);\n\t\t\t\t\t\t}\n\t\t\t\t\t\t_this3.$body.html(_this3.content.$element);\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\treturn _get(SettingsDialog.prototype.__proto__ || Object.getPrototypeOf(SettingsDialog.prototype), 'getActionProcess', this).call(this, action);\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'getHoldProcess',\n\t\t\tvalue: function getHoldProcess(data) {\n\t\t\t\tvar _this4 = this;\n\n\t\t\t\tvar process = _get(SettingsDialog.prototype.__proto__ || Object.getPrototypeOf(SettingsDialog.prototype), 'getHoldProcess', this).call(this, data);\n\t\t\t\tif (data) {\n\t\t\t\t\tprocess.next(data);\n\t\t\t\t\tprocess.next(function () {\n\t\t\t\t\t\treturn _this4.popPending();\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t\treturn process;\n\t\t\t}\n\t\t}, {\n\t\t\tkey: 'getBodyHeight',\n\t\t\tvalue: function getBodyHeight() {\n\t\t\t\treturn this.content.$element.outerHeight(900); // TEMP, need to figure out how to properly make window size\n\t\t\t}\n\t\t}]);\n\n\t\treturn SettingsDialog;\n\t}(OO.ui.ProcessDialog);\n\n\treturn SettingsDialog;\n}\n\n//# sourceURL=webpack:///./modules/SettingsDialog.js?");

/***/ }),

/***/ "./modules/index.js":
/*!**************************!*\
  !*** ./modules/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _Option = __webpack_require__(/*! Option.js */ \"./modules/Option.js\");\n\nvar _Option2 = _interopRequireDefault(_Option);\n\nvar _Settings = __webpack_require__(/*! Settings.js */ \"./modules/Settings.js\");\n\nvar _Settings2 = _interopRequireDefault(_Settings);\n\nvar _BooleanOption = __webpack_require__(/*! Options/BooleanOption.js */ \"./modules/Options/BooleanOption.js\");\n\nvar _BooleanOption2 = _interopRequireDefault(_BooleanOption);\n\nvar _DateOption = __webpack_require__(/*! Options/DateOption.js */ \"./modules/Options/DateOption.js\");\n\nvar _DateOption2 = _interopRequireDefault(_DateOption);\n\nvar _NumberOption = __webpack_require__(/*! Options/NumberOption.js */ \"./modules/Options/NumberOption.js\");\n\nvar _NumberOption2 = _interopRequireDefault(_NumberOption);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmw.libs.libSettings = {};\nmw.libs.libSettings.Option = _Option2.default;\nmw.libs.libSettings.Settings = _Settings2.default;\nmw.libs.libSettings.BooleanOption = _BooleanOption2.default;\nmw.libs.libSettings.DateOption = _DateOption2.default;\nmw.libs.libSettings.NumberOption = _NumberOption2.default;\n\n//# sourceURL=webpack:///./modules/index.js?");

/***/ }),

/***/ "./test/test.js":
/*!**********************!*\
  !*** ./test/test.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n__webpack_require__(/*! ../modules/index.js */ \"./modules/index.js\");\n\nvar BooleanOption = mw.libs.libSettings.BooleanOption;\nvar NumberOption = mw.libs.libSettings.NumberOption;\n// const DropdownOption = mw.libs.libSettings.DropdownOption;\nvar optionsConfig = [{\n\ttitle: 'Main',\n\tpreferences: [new NumberOption({\n\t\tname: 'InputWidth',\n\t\tlabel: 'Width of editing input',\n\t\thelptip: 'foooooo',\n\t\tdefaultValue: 35,\n\t\tvalues: {\n\t\t\tmin: 20,\n\t\t\tmax: 1000\n\t\t}\n\t}), new BooleanOption({\n\t\tname: 'AddToRedirect',\n\t\tlabel: 'Allow additions to redirects',\n\t\thelptip: 'When checked, redirects will have ',\n\t\tdefaultValue: true\n\t}), new BooleanOption({\n\t\tname: 'AddWikidata',\n\t\tlabel: 'Upload to wikidata when adding a short description.',\n\t\thelptip: 'When checked.. ',\n\t\tdefaultValue: true\n\t}) /* ,\n    new DropdownOption( {\n    name: 'SaveWikidata',\n    label: 'Save changes to Wikidata',\n    helptip: 'foooooo',\n    defaultValue: 'add',\n    values: [\n    [ 'add', 'Only on additions (default)' ],\n    [ 'all', 'On all changes' ],\n    [ 'never', 'Never' ]\n    ]\n    } )*/\n\t]\n}, /*\n   {\n   title: 'Semi-automated options',\n   show: HasAWBAccess\n   },\n   */\n{\n\ttitle: 'Advanced',\n\tpreferences: [new BooleanOption({\n\t\tname: 'ClashFix',\n\t\tlabel: 'Disable css used to prevent content jump.',\n\t\thelptip: \"You'd want to this if you have another script that clashes with this one, such as User:Yair_rand/WikidataInfo.js.\",\n\t\tdefaultValue: false\n\t})]\n}];\n\nvar settingsConfig = {\n\tscriptName: 'test',\n\tsize: 'larger'\n};\n\nvar settings = new mw.libs.libSettings.Settings(optionsConfig, settingsConfig);\nsettings.display();\nwindow.settings = settings;\n\n//# sourceURL=webpack:///./test/test.js?");

/***/ })

/******/ });