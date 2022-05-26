"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.NodeModulesPolyfillPlugin = void 0;
var escape_string_regexp_1 = require("escape-string-regexp");
var fs_1 = require("fs");
var path_1 = require("path");
var polyfills_1 = require("./polyfills");
// import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve'
var NAME = 'node-modules-polyfills';
var NAMESPACE = NAME;
function removeEndingSlash(importee) {
    if (importee && importee.slice(-1) === '/') {
        importee = importee.slice(0, -1);
    }
    return importee;
}
function NodeModulesPolyfillPlugin(options) {
    if (options === void 0) { options = {}; }
    var _a = options.namespace, namespace = _a === void 0 ? NAMESPACE : _a, _b = options.name, name = _b === void 0 ? NAME : _b;
    if (namespace.endsWith('commonjs')) {
        throw new Error("namespace ".concat(namespace, " must not end with commonjs"));
    }
    // this namespace is needed to make ES modules expose their default export to require: require('assert') will give you import('assert').default
    var commonjsNamespace = namespace + '-commonjs';
    var polyfilledBuiltins = (0, polyfills_1.builtinsPolyfills)();
    var polyfilledBuiltinsNames = __spreadArray([], polyfilledBuiltins.keys(), true);
    return {
        name: name,
        setup: function setup(_a) {
            var _b;
            var onLoad = _a.onLoad, onResolve = _a.onResolve, initialOptions = _a.initialOptions;
            // polyfills contain global keyword, it must be defined
            if ((initialOptions === null || initialOptions === void 0 ? void 0 : initialOptions.define) && !((_b = initialOptions.define) === null || _b === void 0 ? void 0 : _b.global)) {
                initialOptions.define['global'] = 'globalThis';
            }
            else if (!(initialOptions === null || initialOptions === void 0 ? void 0 : initialOptions.define)) {
                initialOptions.define = { global: 'globalThis' };
            }
            // TODO these polyfill module cannot import anything, is that ok?
            function loader(args) {
                return __awaiter(this, void 0, void 0, function () {
                    var isCommonjs, resolved, contents, resolveDir, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                isCommonjs = args.namespace.endsWith('commonjs');
                                resolved = polyfilledBuiltins.get(removeEndingSlash(args.path));
                                return [4 /*yield*/, fs_1["default"].promises.readFile(resolved)];
                            case 1: return [4 /*yield*/, (_a.sent()).toString()];
                            case 2:
                                contents = _a.sent();
                                resolveDir = path_1["default"].dirname(resolved);
                                if (isCommonjs) {
                                    return [2 /*return*/, {
                                            loader: 'js',
                                            contents: commonJsTemplate({
                                                importPath: args.path
                                            }),
                                            resolveDir: resolveDir
                                        }];
                                }
                                return [2 /*return*/, {
                                        loader: 'js',
                                        contents: contents,
                                        resolveDir: resolveDir
                                    }];
                            case 3:
                                e_1 = _a.sent();
                                console.error('node-modules-polyfill', e_1);
                                return [2 /*return*/, {
                                        contents: "export {}",
                                        loader: 'js'
                                    }];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            }
            onLoad({ filter: /.*/, namespace: namespace }, loader);
            onLoad({ filter: /.*/, namespace: commonjsNamespace }, loader);
            var filter = new RegExp(polyfilledBuiltinsNames.map(escape_string_regexp_1["default"]).join('|'));
            function resolver(args) {
                return __awaiter(this, void 0, void 0, function () {
                    var ignoreRequire, isCommonjs;
                    return __generator(this, function (_a) {
                        ignoreRequire = args.namespace === commonjsNamespace;
                        if (!polyfilledBuiltins.has(args.path)) {
                            return [2 /*return*/];
                        }
                        isCommonjs = !ignoreRequire && args.kind === 'require-call';
                        return [2 /*return*/, {
                                namespace: isCommonjs ? commonjsNamespace : namespace,
                                path: args.path
                            }];
                    });
                });
            }
            onResolve({ filter: filter }, resolver);
            // onResolve({ filter: /.*/, namespace }, resolver)
        }
    };
}
exports.NodeModulesPolyfillPlugin = NodeModulesPolyfillPlugin;
function commonJsTemplate(_a) {
    var importPath = _a.importPath;
    return "\nconst polyfill = require('".concat(importPath, "')\n\nif (polyfill && polyfill.default) {\n    module.exports = polyfill.default\n    for (let k in polyfill) {\n        module.exports[k] = polyfill[k]\n    }\n} else if (polyfill)  {\n    module.exports = polyfill\n}\n\n\n");
}
exports["default"] = NodeModulesPolyfillPlugin;
