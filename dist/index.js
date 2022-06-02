!function(){"use strict";var t={594:function(t){t.exports=JSON.parse('{"libSettings-settings-title":"Settings","libSettings-save-label":"Save settings","libSettings-cancel-label":"Cancel","libSettings-showDefaults-label":"Show defaults","libSettings-showCurrentSettings-label":"Show current settings","libSettings-save-success-message":"Settings for $1 successfully saved.","libSettings-save-fail-message":"Could not save settings for $1."}')}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function o(t,e){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},o(t,e)}function r(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=u(t);if(e){var r=u(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return i(this,n)}}function i(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(e)}function u(t){return u=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},u(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&o(t,e)}(s,OO.EventEmitter);var n,i,u,c=r(s);function s(t){var e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,s),(e=c.call(this)).name=t.name,e.defaultValue=t.defaultValue,e.label=t.label,e.type=t.type,e.UIconfig=t.UIconfig||{},e.help=t.help,e.hide=t.hide,e.helpInline=t.helpInline;var n=["libSettings-".concat(e.type,"Option")];if(e.UIconfig.classes=e.UIconfig.classes?e.UIconfig.classes.push(n):n,e.validInput=!0,e.propertyNameUI="value",void 0===e.name||void 0===e.defaultValue){var o=void 0===e.name?"name":"defaultValue";throw Error('[libSettings] "'.concat(o,'" of an Option is required to be defined but is not.'))}if(void 0===e.type)throw Error('[libSettings] "config.type" is required to be defined by classes that extend Option.');return e}return n=s,(i=[{key:"value",get:function(){return void 0!==this.customValue?this.customValue:this.defaultValue},set:function(t){this.customValue=t}},{key:"customUIValue",get:function(){var t;return(t=this.hasUI?this.UIvalue:this.value)!==this.defaultValue?t:void 0}},{key:"change",value:function(){this.emit("change")}},{key:"buildUI",value:function(){if(!this.hide)return this.hasUI=!0,this.UI(this[this.propertyNameUI])}},{key:"UIvalue",get:function(){return mw.log.error("Getter UIvalue not defined by extending class ".concat(this.type,"Option."))}},{key:"UI",value:function(){return mw.log.error("Function UI not defined by extending class ".concat(this.type,"Option."))}}])&&e(n.prototype,i),u&&e(n,u),Object.defineProperty(n,"prototype",{writable:!1}),s}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function a(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var o=l(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},f.apply(this,arguments)}function l(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=b(t)););return t}function p(t,e){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},p(t,e)}function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=b(t);if(e){var r=b(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return h(this,n)}}function h(t,e){if(e&&("object"===s(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function b(t){return b=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},b(t)}var v=function(){return function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&p(t,e)}(i,OO.ui.ProcessDialog);var e,n,o,r=y(i);function i(t,e,n){var o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(o=r.call(this,t)).optionsConfig=e,o.height=n,o}return e=i,(n=[{key:"setPropertyNameUI",value:function(t){this.optionsConfig.traverse((function(e){e.propertyNameUI=t}))}},{key:"genInternalUI",value:function(){var t,e=this.optionsConfig.getConfig(),n=1===e.filter((function(t){return!t.hide})).length,o=e.map((function(t){return t.buildUI(n)}));return o.filter((function(t){return t})),n?t=o[0]:(t=new OO.ui.BookletLayout({outlined:!0})).addPages(o),t}},{key:"setupUI",value:function(){this.content=this.genInternalUI(),this.$body.html(this.content.$element),this.changeHandler()}},{key:"changeHandler",value:function(){var t=!0,e=!1,n=!1;this.optionsConfig.traverse((function(o){if(o.hasUI){o.validInput||(t=!1);var r=o.UIvalue;r!==o.value&&(e=!0),r!==o.defaultValue&&(n=!0)}})),this.actions.setAbilities({save:t&&e,showDefault:n,showCurrentSettings:e})}},{key:"regenUI",value:function(){var t;this.content.getCurrentPageName&&(t=this.content.getCurrentPageName()),this.setupUI(),t&&this.content.setPage(t)}},{key:"getSetupProcess",value:function(){var t=this,e=f(b(i.prototype),"getSetupProcess",this).call(this);return e.next((function(){return t.setupUI()})),e}},{key:"getActionProcess",value:function(t){var e=this;return"save"===t?new OO.ui.Process((function(){e.emit("startSave"),e.actions.setAbilities({save:!1,showDefault:!1,showCurrentSettings:!1,cancel:!1}),e.pushPending()})):("cancel"===t&&this.close(),"showDefault"===t?new OO.ui.Process((function(){e.setPropertyNameUI("defaultValue"),e.regenUI()})):"showCurrentSettings"===t?new OO.ui.Process((function(){e.setPropertyNameUI("value"),e.regenUI()})):f(b(i.prototype),"getActionProcess",this).call(this,t))}},{key:"getBodyHeight",value:function(){return this.height||1*this.content.$element.outerWidth(!0)/1.61803398875}}])&&a(e.prototype,n),o&&a(e,o),Object.defineProperty(e,"prototype",{writable:!1}),i}()};function g(t){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},g(t)}function d(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function m(t,e){return m=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},m(t,e)}function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=S(t);if(e){var r=S(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return O(this,n)}}function O(t,e){if(e&&("object"===g(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function S(t){return S=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},S(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&m(t,e)}(i,OO.EventEmitter);var e,n,o,r=w(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),(e=r.call(this)).optionsConfig=t.optionsConfig,e.scriptName=t.scriptName,e.optionName="userjs-".concat(t.optionName||t.scriptName),e.size=t.size,e.title=t.title||mw.msg("libSettings-settings-title"),e.useUserOptions=void 0===t.useUserOptions||t.useUserOptions,e.notifyUponSave=void 0===t.notifyUponSave||t.notifyUponSave,e.reloadUponSave=void 0===t.reloadUponSave||t.reloadUponSave,e.userOptions=t.userOptions||{},e.optionsConfig.traverse((function(e){void 0===e.helpInline&&(e.helpInline=t.helpInline)})),e.height=t.height,e.saveLabel=t.saveLabel||mw.msg("libSettings-save-label"),e.cancelLabel=t.cancelLabel||mw.msg("libSettings-cancel-label"),e.showDefaultsLabel=t.showDefaultsLabel||mw.msg("libSettings-showDefaults-label"),e.showCurrentSettingsLabel=t.showCurrentSettingsLabel||mw.msg("libSettings-showCurrentSettings-label"),e.saveMessage=mw.msg("libSettings-save-success-message",e.scriptName),e.saveFailMessage=mw.msg("libSettings-save-fail-message",e.scriptName),e}return e=i,(n=[{key:"load",value:function(){this.optionsText=mw.user.options.get(this.optionName),this.userOptions=JSON.parse(this.optionsText)||{}}},{key:"get",value:function(){return this.options||(this.useUserOptions&&this.load(),this.optionsConfig.updateProperty("value",this.userOptions),this.options=this.optionsConfig.retrieveProperty("value")),this.options}},{key:"notifySave",value:function(t){this.notifyUponSave&&(t?(mw.notify(this.saveMessage),this.reloadUponSave&&window.location.reload()):mw.notify(this.saveFailMessage,{autoHide:!1}))}},{key:"save",value:function(){var t=this;return this.newUserOptions=this.optionsConfig.retrieveProperty("customUIValue"),this.useUserOptions?(this.API=new mw.Api({ajax:{headers:{"Api-User-Agent":"Script ".concat(this.scriptName," using libSettings ([[w:en:MediaWiki:Gadget-libSettings.js]]).")}}}),this.API.saveOption(this.optionName,JSON.stringify(this.newUserOptions)).then((function(){return t.notifySave(!0)}),(function(){return t.notifySave(!1)})).always((function(){t.emit("endSave")}))):this.newUserOptions}},{key:"displayMain",value:function(){var t=this;if(!this.windowManager){var e=v();e.static.name="settingsDialog",e.static.title=this.title,e.static.actions=[{action:"save",label:this.saveLabel,flags:["primary","progressive"]},{action:"cancel",label:this.cancelLabel,flags:["safe","destructive"]},{action:"showDefault",label:this.showDefaultsLabel}],Object.keys(this.userOptions).length>0&&e.static.actions.push({action:"showCurrentSettings",label:this.showCurrentSettingsLabel}),this.settingsDialog=new e({size:this.size,classes:["libSettings-SettingsDialog"]},this.optionsConfig,this.height),this.settingsDialog.connect(this,{startSave:"save"}),this.connect(this.settingsDialog,{endSave:"close"}),this.optionsConfig.traverse((function(e){e.connect(t.settingsDialog,{change:"changeHandler"})})),this.windowManager=new OO.ui.WindowManager,document.body.appendChild(this.windowManager.$element[0]),this.windowManager.addWindows([this.settingsDialog]),this.windowManager.on("closing",(function(){}))}return this.windowManager.openWindow(this.settingsDialog),this.windowManager}},{key:"display",value:function(){var t=this;return this.get(),mw.loader.using(["oojs-ui-core","oojs-ui-widgets","oojs-ui-windows"]).then((function(){return t.displayMain()}))}}])&&d(e.prototype,n),o&&d(e,o),Object.defineProperty(e,"prototype",{writable:!1}),i}();function P(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var j=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.config=e,this.options=this.depthCopyTraverse()}var e,n,o;return e=t,(n=[{key:"depthCopyTraverse",value:function(){var t={},e=function(e){t[e.name]=e};return this.config.forEach((function(t){t.traverse(e)})),t}},{key:"getConfig",value:function(){return this.config}},{key:"traverse",value:function(t){for(var e in this.options)t(this.options[e])}},{key:"retrieveProperty",value:function(t){var e={};for(var n in this.options){var o=this.options[n];e[n]=o[t]}return e}},{key:"updateProperty",value:function(t,e){for(var n in e){var o=e[n],r=this.options[n];r&&(r[t]=o)}}}])&&P(e.prototype,n),o&&P(e,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function U(t){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},U(t)}function _(t,e){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_(t,e)}function k(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=C(t);if(e){var r=C(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return R(this,n)}}function R(t,e){if(e&&("object"===U(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}function E(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function x(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function T(t,e,n){return e&&x(t.prototype,e),n&&x(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}var D=function(){function t(e){E(this,t),this.title=e.title,this.level=e.level,this.hide=e.hide,this.preferences=e.preferences,this.UIconfig=e.UIconfig||{}}return T(t,[{key:"traverse",value:function(t){this.preferences.forEach((function(e){"traverse"in Object.getPrototypeOf(e)?e.traverse((function(e){return t(e)})):t(e)}))}},{key:"buildUI",value:function(t){if(!this.hide)return this.hasUI=!0,this.UI(t)}},{key:"UI",value:function(t){this.UIconfig.padded=t,this.UIconfig.scrollable=!1;var e=this,n=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&_(t,e)}(o,OO.ui.PageLayout);var n=k(o);function o(){var t;return E(this,o),t=n.call(this,e.title,e.UIconfig),e.preferences.forEach((function(e){var n=e.buildUI();n&&t.$element.append(n.$element)})),t}return T(o,[{key:"setupOutlineItem",value:function(){this.outlineItem.setLabel(e.title),this.outlineItem.setLevel(e.level)}}]),o}();return new n}}]),t}();function N(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var L=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.header=e.header,this.hide=e.hide,this.options=e.options,this.UIconfig=e.UIconfig||{}}var e,n,o;return e=t,(n=[{key:"traverse",value:function(t){this.options.forEach((function(e){t(e)}))}},{key:"buildUI",value:function(){if(!this.hide)return this.hasUI=!0,this.UI()}},{key:"UI",value:function(){this.UIconfig.label=this.header;var t=new OO.ui.FieldsetLayout(this.UIconfig),e=this.options.map((function(t){return t.buildUI()}));return e=e.filter((function(t){return t})),t.addItems(e),t}}])&&N(e.prototype,n),o&&N(e,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function V(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function M(t,e){return M=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},M(t,e)}function A(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=$(t);if(e){var r=$(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return W(this,n)}}function W(t,e){if(e&&("object"===B(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function $(t){return $=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},$(t)}var F=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&M(t,e)}(i,t);var e,n,o,r=A(i);function i(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),t.type="Checkbox",r.call(this,t)}return e=i,(n=[{key:"UI",value:function(t){return this.UIconfig.name=this.name,this.UIconfig.selected=t,this.UIelement=new OO.ui.CheckboxInputWidget(this.UIconfig),this.UIelement.connect(this,{change:"change"}),new OO.ui.FieldLayout(this.UIelement,{help:this.help,label:this.label,helpInline:this.helpInline,align:"inline"})}},{key:"UIvalue",get:function(){return this.UIelement.isSelected()}}])&&V(e.prototype,n),o&&V(e,o),Object.defineProperty(e,"prototype",{writable:!1}),i}(c);function H(t){return H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},H(t)}function z(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function G(t,e){return G=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},G(t,e)}function J(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=K(t);if(e){var r=K(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return q(this,n)}}function q(t,e){if(e&&("object"===H(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function K(t){return K=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},K(t)}var Q=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&G(t,e)}(i,t);var e,n,o,r=J(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),t.type=t.type||"Text",(e=r.call(this,t)).widget="TextInputWidget",e}return e=i,(n=[{key:"validate",value:function(){var t=this;return this.UIelement.getValidity().then((function(){t.validInput=!0}),(function(){t.validInput=!1}))}},{key:"UI",value:function(t){var e=this;return this.UIconfig.name=this.name,this.UIconfig.value=t,this.UIelement=new OO.ui[this.widget](this.UIconfig),this.UIelement.connect(this,{change:function(){e.validate().then((function(){return e.change()}))}}),this.validate(),new OO.ui.FieldLayout(this.UIelement,{text:this.label,help:this.help,helpInline:this.helpInline,align:"top"})}},{key:"UIvalue",get:function(){return this.UIelement.getValue()}}])&&z(e.prototype,n),o&&z(e,o),Object.defineProperty(e,"prototype",{writable:!1}),i}(c);function X(t){return X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},X(t)}function Y(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function Z(){return Z="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var o=tt(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},Z.apply(this,arguments)}function tt(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=rt(t)););return t}function et(t,e){return et=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},et(t,e)}function nt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=rt(t);if(e){var r=rt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return ot(this,n)}}function ot(t,e){if(e&&("object"===X(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function rt(t){return rt=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},rt(t)}var it=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&et(t,e)}(i,t);var e,n,o,r=nt(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),t.type="Number",(e=r.call(this,t)).widget="NumberInputWidget",e}return e=i,(n=[{key:"UIvalue",get:function(){return Number(Z(rt(i.prototype),"UIvalue",this))}}])&&Y(e.prototype,n),o&&Y(e,o),Object.defineProperty(e,"prototype",{writable:!1}),i}(Q);function ut(t){return ut="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ut(t)}function ct(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function st(t,e){return st=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},st(t,e)}function at(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=lt(t);if(e){var r=lt(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return ft(this,n)}}function ft(t,e){if(e&&("object"===ut(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function lt(t){return lt=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},lt(t)}var pt=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&st(t,e)}(i,t);var e,n,o,r=at(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),t.type="Dropdown",(e=r.call(this,t)).values=t.values,e}return e=i,(n=[{key:"UI",value:function(t){var e=this;return this.UIconfig.name=this.name,this.UIconfig.options=this.values,this.UIconfig.options.some((function(n,o){if(n.data===t)return e.UIconfig.options.unshift(e.UIconfig.options.splice(o,1)[0]),!0})),this.UIelement=new OO.ui.DropdownInputWidget(this.UIconfig),this.UIelement.connect(this,{change:"change"}),new OO.ui.FieldLayout(this.UIelement,{text:this.label,help:this.help,helpInline:this.helpInline,align:"top"})}},{key:"UIvalue",get:function(){return this.UIelement.getValue()}}])&&ct(e.prototype,n),o&&ct(e,o),Object.defineProperty(e,"prototype",{writable:!1}),i}(c);mw.libs.libSettings={},mw.libs.libSettings.Option=c,mw.libs.libSettings.Settings=I,mw.libs.libSettings.OptionsConfig=j,mw.libs.libSettings.Page=D,mw.libs.libSettings.Group=L,mw.libs.libSettings.CheckboxOption=F,mw.libs.libSettings.TextOption=Q,mw.libs.libSettings.NumberOption=it,mw.libs.libSettings.DropdownOption=pt;var yt=n(594);mw.messages.set(yt),mw.util.addCSS(".libSettings-NumberOption {\n\tmax-width: 15em\n}")}()}();