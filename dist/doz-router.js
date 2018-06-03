// [DOZ-ROUTER]  Build version: 0.0.0  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DozRouter", [], factory);
	else if(typeof exports === 'object')
		exports["DozRouter"] = factory();
	else
		root["DozRouter"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(2),
    REGEX = _require.REGEX,
    PATH = _require.PATH;

var queryToObject = __webpack_require__(3);
var clearPath = __webpack_require__(4);

module.exports = {
    props: {
        hash: '#',
        classActiveLink: 'router-link-active',
        linkAttr: 'router-link',
        mode: 'hash',
        /**
         * Base root, works only in "history" mode
         */
        root: '/'
    },
    autoCreateChildren: false,

    //custom properties
    $_currentView: null,
    $_currentPath: null,
    $_routes: [],
    $_paramMap: {},
    $_param: {},
    $_routeNotFound: '',
    $_query: {},
    $_queryRaw: '',
    $_link: {},

    /**
     * Remove current view
     */
    $removeView: function $removeView() {
        if (this.$_currentView) {
            this.$_currentView.destroy();
            this.$_currentView = null;
        }
    },


    /**
     * Set current view
     * @param view {string} component string
     */
    $setView: function $setView(view) {
        this.$removeView();
        this.$_currentView = this.mount(view);
    },


    /**
     * Get query url
     * @param property {string} property name
     * @returns {*}
     */
    $query: function $query(property) {
        return this.$_query[property];
    },


    /**
     * Get param url
     * @param property {string} property name
     * @returns {*}
     */
    $param: function $param(property) {
        return this.$_param[property];
    },


    /**
     * Navigate route
     * @param path {string} path to navigate
     * @param [params] {object} optional params
     * @returns {boolean}
     */
    $navigate: function $navigate(path, params) {
        var _this = this;

        var found = false;
        path = path || window.location.hash.slice(this.props.hash.length);
        var pathPart = path.split('?');
        path = clearPath(pathPart[0]);
        this.$_queryRaw = pathPart[1] || '';

        for (var i = 0; i < this.$_routes.length; i++) {
            var route = this.$_routes[i];
            var re = new RegExp('^' + route.path + '$');
            var match = path.match(re);

            if (match) {
                found = true;

                if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                    this.$_param = Object.assign({}, params);
                } else {
                    (function () {
                        var param = _this.$_paramMap[route.path];
                        _this.$_query = queryToObject(_this.$_queryRaw);
                        match.slice(1).forEach(function (value, i) {
                            _this.$_param[param[i]] = value;
                        });
                    })();
                }

                this.$_currentPath = path;
                this.$setView(route.view);

                break;
            }
        }

        if (!found) {
            this.$_currentPath = null;
            this.$setView(this.$_routeNotFound);
        }

        this.$activeLink();

        return found;
    },


    /**
     * Active current link
     */
    $activeLink: function $activeLink() {
        var _this2 = this;

        Object.keys(this.$_link).forEach(function (link) {
            _this2.$_link[link].forEach(function (el) {
                if (link === _this2.$_currentPath) el.classList.add(_this2.props.classActiveLink);else el.classList.remove(_this2.props.classActiveLink);
            });
        });
    },


    /**
     * Add a new route
     * @param route {string} route path
     * @param view {string} component string
     */
    $add: function $add(route, view) {
        if (route === PATH.NOT_FOUND) {
            this.$_routeNotFound = view;
        } else {
            var param = [];
            var path = clearPath(route);
            path = path.replace(/:(\w+)/g, function (match, capture) {
                param.push(capture);
                return '([\\w-]+)';
            });
            this.$_paramMap[path] = param;
            this.$_routes.push({ path: path, view: view });
        }
    },


    /**
     * Remove a route
     * @param path {string} route path
     */
    $remove: function $remove(path) {
        for (var i = 0; i < this.$_routes.length; i++) {
            var route = this.$_routes[i];
            if (route.path === clearPath(path)) {
                this.$_routes.splice(i, 1);
            }
        }
    },


    /**
     * Bind all link to routing controller
     */
    $bindLink: function $bindLink() {
        var _this3 = this;

        this.$_link = {};
        document.querySelectorAll('[' + this.props.linkAttr + ']').forEach(function (el) {
            var path = el.pathname || el.href;

            if (_this3.props.mode === 'history') {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    var _path = path + el.search;
                    history.pushState(_path, null, _this3.props.root + _path);
                    _this3.$navigate(_path);
                });
            } else {
                el.href = _this3.props.hash + path + el.search;
            }
            var pathPart = path.split('?');
            path = clearPath(pathPart[0]);
            if (typeof _this3.$_link[path] === 'undefined') {
                _this3.$_link[path] = [el];
            } else {
                _this3.$_link[path].push(el);
            }
        });
    },
    onAppReady: function onAppReady() {
        var _this4 = this;

        this.rawChildren.forEach(function (view) {
            var route = view.match(REGEX.ROUTE);
            if (route) {
                _this4.$add(route[1], view);
            }
        });

        this.$bindLink();
        window.addEventListener('popstate', function (e) {
            _this4.$navigate(e.state);
        });
        window.addEventListener('hashchange', function () {
            return _this4.$navigate();
        });
        window.addEventListener('DOMContentLoaded', function () {
            return _this4.$navigate();
        });
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    REGEX: {
        ROUTE: /d:route(?:\s+)?=(?:\s+)?"(.*)"/
    },
    PATH: {
        NOT_FOUND: '*'
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (query) {
    if (query) return JSON.parse('{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === '' ? value : decodeURIComponent(value);
    });else return {};
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (path) {
    return path.toString().replace(/\/+$/, '').replace(/^\//, '');
};

/***/ })
/******/ ]);
}); 