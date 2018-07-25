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
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DOMNodeCollection; });\nclass DOMNodeCollection {\n  constructor(array) {\n    this.array = array;\n  }\n\n  iterateThroughNodes(cb) {\n    const arr = this.array;\n    for(let i = 0; i < arr.length; i++) {\n      cb(arr[i]);\n    }\n  }\n\n  html(str) {\n    if (str === undefined) {\n      return this.array[0].innerHTML;\n    } else {\n        this.iterateThroughNodes(function(elem) {\n          elem.innerHTML = str;\n        });\n    }\n  }\n\n  empty() {\n    this.iterateThroughNodes(function(elem) {\n      elem.innerHTML = '';\n    });\n  }\n\n  append(arg) {\n    this.iterateThroughNodes(function(elem) {\n      if (typeof arg == 'string') {\n        elem.innerHTML = elem.innerHTML + arg;\n      }\n    });\n  }\n\n  attr(att) {\n      for(let i = 0; i < this.nodes.length; i++) {\n        let node = this.nodes[i];\n        node.attributes[Object.keys(att)[0]] = att[Object.keys(att)[0]];\n      }\n    }\n\n    addClass(name) {\n      for(let i = 0; i < this.nodes.length; i++) {\n        let node = this.nodes[i];\n        if(node.class === undefined){\n          node.class = name;\n        } else {\n          node.class += ' ' + name;\n        }\n      }\n    }\n\n    removeClass(name) {\n      for(let i = 0; i < this.nodes.length; i++) {\n        let node = this.nodes[i];\n        let classArr = node.class.split(' ');\n        if(classArr.includes(name)) {\n          let idx = classArr.indexOf(name);\n          classArr = classArr.slice(0, idx).concat(classArr.slice(idx+1));\n          node.class = classArr.join(\" \");\n        }\n      }\n    }\n\n    children() {\n      const childNodes = [];\n\n      for(let i = 0; i < this.nodes.length; i++) {\n        let node = this.nodes[i];\n        if (node.children.length === 0) {\n          childNodes.push(node);\n          continue;\n        }\n        childNodes.push(node.children);\n      }\n      return new DOMNodeCollection(childNodes);\n    }\n\n    parent() {\n      const parentNodes = [];\n      for(let i = 0; i < this.nodes.length; i++) {\n        let node = this.nodes[i];\n        if (node.parentElement.length === 0) {\n          parentNodes.push(node);\n          continue;\n        }\n        parentNodes.push(node.parentElement);\n      }\n      return new DOMNodeCollection(parentNodes);\n    }\n\n    find(selector) {\n      let selectedNodes = [];\n      const children = this.children();\n      let selectedItems;\n\n      for ( let i = 0; i < children.nodes.length; i++ ) {\n        let child = Array.from(children.nodes[i]);\n        selectedItems = child.filter(el => el.localName === selector);\n        selectedNodes = selectedNodes.concat(selectedItems);\n      }\n      return new DOMNodeCollection(selectedNodes);\n    }\n\n    remove() {\n      for(let i = 0; i < this.nodes.length; i++) {\n        let node = this.nodes[i];\n        node.outerHTML = \"\";\n      }\n      this.nodes = [];\n    }\n\n    on(type, callback) {\n      for ( let i = 0; i < this.nodes.length; i++ ) {\n        let node = this.nodes[i];\n        node.attributes[type] = callback;\n        const listener = node.addEventListener(type, callback);\n      }\n    }\n\n    off(type){\n      for ( let i = 0; i < this.nodes.length; i++ ) {\n        let node = this.nodes[i];\n        const callback = node.attributes[type];\n        const listener = node.removeEventListener(type, callback);\n      }\n    }\n\n  }\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom_node_collection */ \"./lib/dom_node_collection.js\");\n\n\nwindow.$m = function(arg){\n  if(arg instanceof Function) {\n    const funcArr = [];\n    funcArr.push(arg);\n    document.addEventListener(\"DOMContentLoaded\", function(){\n      for(let i = 0; i < funcArr.length; i++) {\n        funcArr[i]();\n      }\n     });\n  }\n  if (typeof arg === 'string') {\n    const newArg = [].slice.call(document.querySelectorAll(arg));\n    const dom = new _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newArg);\n    return dom;\n  }\n  if(arg instanceof HTMLElement) {\n    const newArg = [].slice.call(arg);\n    const dom = new _dom_node_collection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](newArg);\n    return dom;\n  }\n}\n\n$(() => {\n  $m.ajax({\n      type: 'GET',\n      url: \"http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b\",\n      success(data) {\n        console.log(\"We have your weather!\");\n        console.log(data);\n      },\n      error() {\n        console.error(\"An error occurred.\");\n      },\n   });\n});\n\nwindow.$m.ajax = function(options) {\n  const defaults = {\n   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n   method: \"GET\",\n   url: \"\",\n   success: () => {},\n   error: () => {},\n   data: {},\n  };\n\n  const keys = Object.keys(options);\n  for (let i = 0; i < keys.length; i++) {\n    defaults[keys[i]] = options[keys[i]];\n  }\n\n  const xhr = new XMLHttpRequest();\n\n  xhr.open(defaults.method, defaults.url);\n\n\n  xhr.onload = function (response) {\n    defaults.success(JSON.parse(this.response));\n  };\n\n  const optionalData = defaults.data;\n  xhr.send(optionalData);\n\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });