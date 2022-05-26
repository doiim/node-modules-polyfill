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
exports.__esModule = true;
var esbuild_1 = require("esbuild");
var test_support_1 = require("test-support");
var fs_1 = require("fs");
var _1 = require(".");
var node_globals_polyfill_1 = require("@esbuild-plugins/node-globals-polyfill");
require('debug').enable(require('../package.json').name);
test('works', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "import {x} from './utils'; console.log(x);",
                    'utils.ts': "import path from 'path'; import { Buffer } from 'buffer'; export const x = path.resolve(Buffer.from('x').toString());"
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])()]
                    })];
            case 2:
                res = _b.sent();
                eval(res.outputFiles[0].text);
                // console.log(res.outputFiles[0].text)
                unlink();
                return [2 /*return*/];
        }
    });
}); });
test('works with SafeBuffer and other package consumers', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "import {Buffer as SafeBuffer} from './safe-buffer'; console.log(SafeBuffer);",
                    'safe-buffer.ts': fs_1["default"]
                        .readFileSync(require.resolve('safe-buffer'))
                        .toString()
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])()]
                    })
                    // console.log(
                    //     res.outputFiles[0].text
                    //         .split('\n')
                    //         .map((x, i) => i + ' ' + x)
                    //         .join('\n'),
                    // )
                ];
            case 2:
                res = _b.sent();
                // console.log(
                //     res.outputFiles[0].text
                //         .split('\n')
                //         .map((x, i) => i + ' ' + x)
                //         .join('\n'),
                // )
                eval(res.outputFiles[0].text);
                unlink();
                return [2 /*return*/];
        }
    });
}); });
test('events works', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "\n        import EventEmitter from 'events';\n\n        class Test extends EventEmitter {\n            constructor() { };\n        }\n        console.log(Test)\n        "
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])()]
                    })
                    // console.log(res.outputFiles[0].text)
                ];
            case 2:
                res = _b.sent();
                // console.log(res.outputFiles[0].text)
                eval(res.outputFiles[0].text);
                unlink();
                return [2 /*return*/];
        }
    });
}); });
test('require can use default export', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "\n        const assert = require('assert')\n        // console.log(assert)\n        assert('ok')\n        "
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])()]
                    })
                    // console.log(res.outputFiles[0].text)
                ];
            case 2:
                res = _b.sent();
                // console.log(res.outputFiles[0].text)
                eval(res.outputFiles[0].text);
                unlink();
                return [2 /*return*/];
        }
    });
}); });
test.skip('crypto', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "import { randomBytes } from 'crypto'; console.log(randomBytes(20).toString('hex'))"
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])()]
                    })];
            case 2:
                res = _b.sent();
                eval(res.outputFiles[0].text);
                // console.log(res.outputFiles[0].text)
                unlink();
                return [2 /*return*/];
        }
    });
}); });
test.skip('fs', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "import { readFile } from 'fs'; console.log(readFile(''))"
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])()]
                    })];
            case 2:
                res = _b.sent();
                eval(res.outputFiles[0].text);
                // console.log(res.outputFiles[0].text)
                unlink();
                return [2 /*return*/];
        }
    });
}); });
test('does not include global keyword', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res, text;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "import {x} from './utils'; console.log(x);",
                    'utils.ts': "import path from 'path'; import { Buffer } from 'buffer'; export const x = path.resolve(Buffer.from('x').toString());"
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])()]
                    })];
            case 2:
                res = _b.sent();
                text = res.outputFiles[0].text;
                eval(text);
                expect(text).not.toContain(/\bglobal\b/);
                // console.log(res.outputFiles[0].text)
                unlink();
                return [2 /*return*/];
        }
    });
}); });
test('works with globals polyfills', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, unlink, ENTRY, res, text;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, test_support_1.writeFiles)({
                    'entry.ts': "import {x} from './utils'; console.log(x);",
                    'utils.ts': "import path from 'path'; import { Buffer } from 'buffer'; export const x = path.resolve(Buffer.from('x').toString());"
                })
                // const outfile = randomOutputFile()
            ];
            case 1:
                _a = _b.sent(), unlink = _a.unlink, ENTRY = _a.paths[0];
                return [4 /*yield*/, (0, esbuild_1.build)({
                        entryPoints: [ENTRY],
                        write: false,
                        format: 'esm',
                        target: 'es2017',
                        bundle: true,
                        plugins: [(0, _1["default"])(), (0, node_globals_polyfill_1["default"])()]
                    })];
            case 2:
                res = _b.sent();
                text = res.outputFiles[0].text;
                eval(text);
                console.log(text);
                // console.log(res.outputFiles[0].text)
                unlink();
                return [2 /*return*/];
        }
    });
}); });
