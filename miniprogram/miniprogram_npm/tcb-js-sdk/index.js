module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1588515576597, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var database_1 = require("@cloudbase/database");
var cloudbase_adapter_wx_mp_1 = __importDefault(require("cloudbase-adapter-wx_mp"));
var auth_1 = require("./auth");
var Storage = __importStar(require("./storage"));
var Functions = __importStar(require("./functions"));
var request_1 = require("./lib/request");
var events_1 = require("./lib/events");
var adapters_1 = require("./adapters");
var types_1 = require("./types");
var util_1 = require("./lib/util");
var cache_1 = require("./lib/cache");
var DEFAULT_INIT_CONFIG = {
    timeout: 15000,
    persistence: 'session'
};
var MAX_TIMEOUT = 1000 * 60 * 10;
var MIN_TIMEOUT = 100;
var extensionMap = {};
var TCB = (function () {
    function TCB(config) {
        this.config = config ? config : this.config;
        this.authObj = undefined;
        if (adapters_1.Adapter.adapter) {
            this.requestClient = new adapters_1.Adapter.adapter.reqClass({
                timeout: this.config.timeout,
                timeoutMsg: "[tcb-js-sdk] \u8BF7\u6C42\u5728" + this.config.timeout / 1000 + "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"
            });
        }
    }
    TCB.prototype.init = function (config) {
        if (!adapters_1.Adapter.adapter) {
            this._useDefaultAdapter();
            this.requestClient = new adapters_1.Adapter.adapter.reqClass({
                timeout: config.timeout || 5000,
                timeoutMsg: "[tcb-js-sdk] \u8BF7\u6C42\u5728" + (config.timeout || 5000) / 1000 + "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"
            });
        }
        if (adapters_1.Adapter.runtime !== adapters_1.RUNTIME.WEB) {
            if (!config.appSecret) {
                throw new Error('[tcb-js-sdk]参数错误：请正确配置appSecret');
            }
            var appSign = adapters_1.Adapter.adapter.getAppSign ? adapters_1.Adapter.adapter.getAppSign() : '';
            if (config.appSign && appSign && config.appSign !== appSign) {
                throw new Error('[tcb-js-sdk]参数错误：非法的应用标识');
            }
            appSign && (config.appSign = appSign);
            if (!config.appSign) {
                throw new Error('[tcb-js-sdk]参数错误：请正确配置应用标识');
            }
        }
        this.config = __assign(__assign({}, DEFAULT_INIT_CONFIG), config);
        switch (true) {
            case this.config.timeout > MAX_TIMEOUT:
                console.warn('[tcb-js-sdk] timeout大于可配置上限[10分钟]，已重置为上限数值');
                this.config.timeout = MAX_TIMEOUT;
                break;
            case this.config.timeout < MIN_TIMEOUT:
                console.warn('[tcb-js-sdk] timeout小于可配置下限[100ms]，已重置为下限数值');
                this.config.timeout = MIN_TIMEOUT;
                break;
        }
        return new TCB(this.config);
    };
    TCB.prototype.database = function (dbConfig) {
        database_1.Db.reqClass = request_1.IRequest;
        database_1.Db.wsClass = adapters_1.Adapter.adapter.wsClass;
        if (!this.authObj) {
            console.warn('需要app.auth()授权');
            return;
        }
        database_1.Db.getAccessToken = this.authObj.getAccessToken.bind(this.authObj);
        database_1.Db.runtime = adapters_1.Adapter.runtime;
        if (adapters_1.Adapter.runtime !== adapters_1.RUNTIME.WEB) {
            database_1.Db.dataVersion = types_1.dataVersion;
            database_1.Db.createSign = util_1.createSign;
            database_1.Db.appSecretInfo = __assign({ appSign: this.config.appSign }, this.config.appSecret);
        }
        if (!database_1.Db.ws) {
            database_1.Db.ws = null;
        }
        return new database_1.Db(__assign(__assign({}, this.config), dbConfig));
    };
    TCB.prototype.auth = function (_a) {
        var persistence = (_a === void 0 ? {} : _a).persistence;
        if (this.authObj) {
            console.warn('tcb实例只存在一个auth对象');
            return this.authObj;
        }
        var _persistence = persistence || adapters_1.Adapter.adapter.primaryStorage || DEFAULT_INIT_CONFIG.persistence;
        if (_persistence !== this.config.persistence) {
            this.config.persistence = _persistence;
        }
        cache_1.initCache(this.config);
        request_1.initRequest(this.config);
        this.authObj = new auth_1.Auth(this.config);
        return this.authObj;
    };
    TCB.prototype.on = function (eventName, callback) {
        return events_1.addEventListener.apply(this, [eventName, callback]);
    };
    TCB.prototype.off = function (eventName, callback) {
        return events_1.removeEventListener.apply(this, [eventName, callback]);
    };
    TCB.prototype.callFunction = function (params, callback) {
        return Functions.callFunction.apply(this, [params, callback]);
    };
    TCB.prototype.deleteFile = function (params, callback) {
        return Storage.deleteFile.apply(this, [params, callback]);
    };
    TCB.prototype.getTempFileURL = function (params, callback) {
        return Storage.getTempFileURL.apply(this, [params, callback]);
    };
    TCB.prototype.downloadFile = function (params, callback) {
        return Storage.downloadFile.apply(this, [params, callback]);
    };
    TCB.prototype.uploadFile = function (params, callback) {
        return Storage.uploadFile.apply(this, [params, callback]);
    };
    TCB.prototype.getUploadMetadata = function (params, callback) {
        return Storage.getUploadMetadata.apply(this, [params, callback]);
    };
    TCB.prototype.registerExtension = function (ext) {
        extensionMap[ext.name] = ext;
    };
    TCB.prototype.invokeExtension = function (name, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var ext, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ext = extensionMap[name];
                        if (!ext) {
                            throw Error("\u6269\u5C55" + name + " \u5FC5\u987B\u5148\u6CE8\u518C");
                        }
                        return [4, ext.invoke(opts, this)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    TCB.prototype.useAdapters = function (adapters) {
        var _a = adapters_1.useAdapters(adapters) || {}, adapter = _a.adapter, runtime = _a.runtime;
        adapter && (adapters_1.Adapter.adapter = adapter);
        runtime && (adapters_1.Adapter.runtime = runtime);
    };
    TCB.prototype._useDefaultAdapter = function () {
        var _a = adapters_1.useDefaultAdapter(), adapter = _a.adapter, runtime = _a.runtime;
        adapters_1.Adapter.adapter = adapter;
        adapters_1.Adapter.runtime = runtime;
    };
    return TCB;
}());
var tcb = new TCB();
tcb.useAdapters(cloudbase_adapter_wx_mp_1.default);
try {
    window['tcb'] = tcb;
}
catch (e) {
}
module.exports = tcb;

}, function(modId) {var map = {"./auth":1588515576598,"./storage":1588515576611,"./functions":1588515576612,"./lib/request":1588515576602,"./lib/events":1588515576608,"./adapters":1588515576606,"./types":1588515576603,"./lib/util":1588515576600,"./lib/cache":1588515576605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576598, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var weixinAuthProvider_1 = require("./weixinAuthProvider");
var anonymousAuthProvider_1 = require("./anonymousAuthProvider");
var base_1 = require("./base");
var cache_1 = require("../lib/cache");
var request_1 = require("../lib/request");
var events_1 = require("../lib/events");
var customAuthProvider_1 = require("./customAuthProvider");
var Auth = (function () {
    function Auth(config) {
        this.config = config;
        this._cache = cache_1.getCache(config.env);
        this._request = request_1.getRequestByEnvId(config.env);
        this._onAnonymousConverted = this._onAnonymousConverted.bind(this);
        this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this);
        events_1.addEventListener(events_1.EVENTS.LOGIN_TYPE_CHANGED, this._onLoginTypeChanged);
    }
    Object.defineProperty(Auth.prototype, "loginType", {
        get: function () {
            return this._cache.getStore(this._cache.keys.loginTypeKey);
        },
        enumerable: true,
        configurable: true
    });
    Auth.prototype.weixinAuthProvider = function (_a) {
        var appid = _a.appid, scope = _a.scope, state = _a.state;
        return new weixinAuthProvider_1.WeixinAuthProvider(this.config, appid, scope, state);
    };
    Auth.prototype.anonymousAuthProvider = function () {
        return new anonymousAuthProvider_1.AnonymousAuthProvider(this.config);
    };
    Auth.prototype.customAuthProvider = function () {
        return new customAuthProvider_1.CustomAuthProvider(this.config);
    };
    Auth.prototype.signInAnonymously = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new anonymousAuthProvider_1.AnonymousAuthProvider(this.config).signIn()];
            });
        });
    };
    Auth.prototype.linkAndRetrieveDataWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._anonymousAuthProvider) {
                            this._anonymousAuthProvider = new anonymousAuthProvider_1.AnonymousAuthProvider(this.config);
                        }
                        events_1.addEventListener(events_1.EVENTS.ANONYMOUS_CONVERTED, this._onAnonymousConverted);
                        return [4, this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(ticket)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    Auth.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, refreshTokenKey, accessTokenKey, accessTokenExpireKey, action, refresh_token, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.loginType === base_1.LOGINTYPE.ANONYMOUS) {
                            throw new Error('[tcb-js-sdk] 匿名用户不支持登出操作');
                        }
                        _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        action = 'auth.logout';
                        refresh_token = this._cache.getStore(refreshTokenKey);
                        if (!refresh_token) {
                            return [2];
                        }
                        return [4, this._request.send(action, { refresh_token: refresh_token })];
                    case 1:
                        res = _b.sent();
                        this._cache.removeStore(refreshTokenKey);
                        this._cache.removeStore(accessTokenKey);
                        this._cache.removeStore(accessTokenExpireKey);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_CHANGED);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this.config.env,
                            loginType: base_1.LOGINTYPE.NULL,
                            persistence: this.config.persistence
                        });
                        return [2, res];
                }
            });
        });
    };
    Auth.prototype.onLoginStateChanged = function (callback) {
        var _this = this;
        events_1.addEventListener(events_1.EVENTS.LOGIN_STATE_CHANGED, function () {
            var loginState = _this.hasLoginState();
            callback.call(_this, loginState);
        });
        var loginState = this.hasLoginState();
        callback.call(this, loginState);
    };
    Auth.prototype.onLoginStateExpired = function (callback) {
        events_1.addEventListener(events_1.EVENTS.LOGIN_STATE_EXPIRED, callback.bind(this));
    };
    Auth.prototype.onAccessTokenRefreshed = function (callback) {
        events_1.addEventListener(events_1.EVENTS.ACCESS_TOKEN_REFRESHD, callback.bind(this));
    };
    Auth.prototype.onAnonymousConverted = function (callback) {
        events_1.addEventListener(events_1.EVENTS.ANONYMOUS_CONVERTED, callback.bind(this));
    };
    Auth.prototype.onLoginTypeChanged = function (callback) {
        var _this = this;
        events_1.addEventListener(events_1.EVENTS.LOGIN_TYPE_CHANGED, function () {
            var loginState = _this.hasLoginState();
            callback.call(_this, loginState);
        });
    };
    Auth.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = {};
                        return [4, this._request.getAccessToken()];
                    case 1: return [2, (_a.accessToken = (_b.sent()).accessToken,
                            _a.env = this.config.env,
                            _a)];
                }
            });
        });
    };
    Auth.prototype.hasLoginState = function () {
        var _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
        var refreshToken = this._cache.getStore(refreshTokenKey);
        var accessToken = this._cache.getStore(accessTokenKey);
        var accessTokenExpire = this._cache.getStore(accessTokenExpireKey);
        if (accessToken && accessTokenExpire > new Date().getTime()) {
            return {
                isAnonymous: this.loginType === base_1.LOGINTYPE.ANONYMOUS,
                credential: {
                    refreshToken: refreshToken,
                    accessToken: this._cache.getStore(accessTokenKey)
                }
            };
        }
        else {
            return null;
        }
    };
    Auth.prototype.getLoginState = function () {
        return Promise.resolve(this.hasLoginState());
    };
    Auth.prototype.signInWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new customAuthProvider_1.CustomAuthProvider(this.config).signIn(ticket)];
            });
        });
    };
    Auth.prototype.shouldRefreshAccessToken = function (hook) {
        this._request._shouldRefreshAccessTokenHook = hook.bind(this);
    };
    Auth.prototype.getUserInfo = function () {
        var action = 'auth.getUserInfo';
        return this._request.send(action, {}).then(function (res) {
            if (res.code) {
                return res;
            }
            else {
                return __assign(__assign({}, res.data), { requestId: res.seqId });
            }
        });
    };
    Auth.prototype.getAuthHeader = function () {
        var _a = this._cache.keys, refreshTokenKey = _a.refreshTokenKey, accessTokenKey = _a.accessTokenKey;
        var refreshToken = this._cache.getStore(refreshTokenKey);
        var accessToken = this._cache.getStore(accessTokenKey);
        return {
            'x-cloudbase-credentials': accessToken + '/@@/' + refreshToken
        };
    };
    Auth.prototype._onAnonymousConverted = function (ev) {
        var env = ev.data.env;
        if (env !== this.config.env) {
            return;
        }
        this._cache.updatePersistence(this.config.persistence);
    };
    Auth.prototype._onLoginTypeChanged = function (ev) {
        var _a = ev.data, loginType = _a.loginType, persistence = _a.persistence, env = _a.env;
        if (env !== this.config.env) {
            return;
        }
        this._cache.updatePersistence(persistence);
        this._cache.setStore(this._cache.keys.loginTypeKey, loginType);
    };
    return Auth;
}());
exports.Auth = Auth;

}, function(modId) { var map = {"./weixinAuthProvider":1588515576599,"./anonymousAuthProvider":1588515576609,"./base":1588515576601,"../lib/cache":1588515576605,"../lib/request":1588515576602,"../lib/events":1588515576608,"./customAuthProvider":1588515576610}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576599, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = __importStar(require("../lib/util"));
var base_1 = require("./base");
var events_1 = require("../lib/events");
var adapters_1 = require("../adapters");
var AllowedScopes;
(function (AllowedScopes) {
    AllowedScopes["snsapi_base"] = "snsapi_base";
    AllowedScopes["snsapi_userinfo"] = "snsapi_userinfo";
    AllowedScopes["snsapi_login"] = "snsapi_login";
})(AllowedScopes || (AllowedScopes = {}));
var SignInPromiseMap = {};
var WeixinAuthProvider = (function (_super) {
    __extends(WeixinAuthProvider, _super);
    function WeixinAuthProvider(config, appid, scope, state) {
        var _this = _super.call(this, config) || this;
        _this.config = config;
        _this.appid = appid;
        _this.scope = adapters_1.Adapter.runtime === adapters_1.RUNTIME.WX_MP ? 'snsapi_base' : scope;
        _this.state = state || 'weixin';
        return _this;
    }
    WeixinAuthProvider.prototype.signInWithRedirect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.redirect()];
            });
        });
    };
    WeixinAuthProvider.prototype.getRedirectResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var code;
            return __generator(this, function (_a) {
                code = util.getWeixinCode();
                if (!code) {
                    return [2, null];
                }
                return [2, this._signInWithCode(code)];
            });
        });
    };
    WeixinAuthProvider.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, err, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!SignInPromiseMap[this.config.env]) {
                            SignInPromiseMap[this.config.env] = this._signIn();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, SignInPromiseMap[this.config.env]];
                    case 2:
                        result = _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        err = e_1;
                        return [3, 4];
                    case 4:
                        SignInPromiseMap[this.config.env] = null;
                        if (err) {
                            throw err;
                        }
                        return [2, result];
                }
            });
        });
    };
    WeixinAuthProvider.prototype._signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, accessToken, accessTokenExpire, code;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        accessToken = this._cache.getStore(accessTokenKey);
                        accessTokenExpire = this._cache.getStore(accessTokenExpireKey);
                        if (accessToken) {
                            if (accessTokenExpire && accessTokenExpire > Date.now()) {
                                return [2, {
                                        credential: {
                                            accessToken: accessToken,
                                            refreshToken: this._cache.getStore(refreshTokenKey)
                                        }
                                    }];
                            }
                            else {
                                this._cache.removeStore(accessTokenKey);
                                this._cache.removeStore(accessTokenExpireKey);
                            }
                        }
                        if (Object.values(AllowedScopes).includes(AllowedScopes[this.scope]) === false) {
                            throw new Error('错误的scope类型');
                        }
                        if (!(adapters_1.Adapter.runtime === adapters_1.RUNTIME.WX_MP)) return [3, 2];
                        return [4, util.getMiniAppCode()];
                    case 1:
                        code = _b.sent();
                        return [3, 3];
                    case 2:
                        code = util.getWeixinCode();
                        if (!code) {
                            return [2, this.redirect()];
                        }
                        _b.label = 3;
                    case 3: return [2, this._signInWithCode(code)];
                }
            });
        });
    };
    WeixinAuthProvider.prototype.redirect = function () {
        var currUrl = util.removeParam('code', location.href);
        currUrl = util.removeParam('state', currUrl);
        currUrl = encodeURIComponent(currUrl);
        var host = '//open.weixin.qq.com/connect/oauth2/authorize';
        if (this.scope === 'snsapi_login') {
            host = '//open.weixin.qq.com/connect/qrconnect';
        }
        location.href = host + "?appid=" + this.appid + "&redirect_uri=" + currUrl + "&response_type=code&scope=" + this.scope + "&state=" + this.state + "#wechat_redirect";
    };
    WeixinAuthProvider.prototype._signInWithCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, loginType, refreshTokenRes, refreshToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
                        loginType = (function (scope) {
                            switch (scope) {
                                case AllowedScopes.snsapi_login:
                                    return 'WECHAT-OPEN';
                                default:
                                    return 'WECHAT-PUBLIC';
                            }
                        })(this.scope);
                        return [4, this.getRefreshTokenByWXCode(this.appid, loginType, code)];
                    case 1:
                        refreshTokenRes = _b.sent();
                        refreshToken = refreshTokenRes.refreshToken;
                        this._cache.setStore(refreshTokenKey, refreshToken);
                        if (refreshTokenRes.accessToken) {
                            this._cache.setStore(accessTokenKey, refreshTokenRes.accessToken);
                        }
                        if (refreshTokenRes.accessTokenExpire) {
                            this._cache.setStore(accessTokenExpireKey, refreshTokenRes.accessTokenExpire + Date.now());
                        }
                        events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_CHANGED);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGED, { loginType: base_1.LOGINTYPE.WECHAT, persistence: this.config.persistence });
                        return [2, {
                                credential: {
                                    refreshToken: refreshToken
                                }
                            }];
                }
            });
        });
    };
    WeixinAuthProvider.prototype.getRefreshTokenByWXCode = function (appid, loginType, code) {
        return __awaiter(this, void 0, void 0, function () {
            var action, hybridMiniapp;
            return __generator(this, function (_a) {
                action = 'auth.getJwt';
                hybridMiniapp = adapters_1.Adapter.runtime === adapters_1.RUNTIME.WX_MP ? '1' : '0';
                return [2, this._request.send(action, { appid: appid, loginType: loginType, code: code, hybridMiniapp: hybridMiniapp }).then(function (res) {
                        if (res.code) {
                            throw new Error("[tcb-js-sdk] \u5FAE\u4FE1\u767B\u5F55\u5931\u8D25: " + res.code);
                        }
                        if (res.refresh_token) {
                            return {
                                refreshToken: res.refresh_token,
                                accessToken: res.access_token,
                                accessTokenExpire: res.access_token_expire
                            };
                        }
                        else {
                            throw new Error("[tcb-js-sdk] getJwt\u672A\u8FD4\u56DErefreshToken");
                        }
                    })];
            });
        });
    };
    return WeixinAuthProvider;
}(base_1.AuthProvider));
exports.WeixinAuthProvider = WeixinAuthProvider;

}, function(modId) { var map = {"../lib/util":1588515576600,"./base":1588515576601,"../lib/events":1588515576608,"../adapters":1588515576606}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576600, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hmac_sha256_1 = __importDefault(require("crypto-js/hmac-sha256"));
var enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
var enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
exports.getQuery = function (name, url) {
    if (typeof window === 'undefined') {
        return false;
    }
    var u = url || window.location.search;
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = u.substr(u.indexOf('?') + 1).match(reg);
    return r != null ? r[2] : '';
};
exports.getHash = function (name) {
    if (typeof window === 'undefined') {
        return '';
    }
    var matches = window.location.hash.match(new RegExp("[#?&/]" + name + "=([^&#]*)"));
    return matches ? matches[1] : '';
};
exports.removeParam = function (key, sourceURL) {
    var rtn = sourceURL.split('?')[0];
    var param;
    var params_arr = [];
    var queryString = sourceURL.indexOf('?') !== -1 ? sourceURL.split('?')[1] : '';
    if (queryString !== '') {
        params_arr = queryString.split('&');
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split('=')[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + '?' + params_arr.join('&');
    }
    return rtn;
};
exports.createPromiseCallback = function () {
    var cb;
    if (!Promise) {
        cb = function () { };
        cb.promise = {};
        var throwPromiseNotDefined = function () {
            throw new Error('Your Node runtime does support ES6 Promises. ' +
                'Set "global.Promise" to your preferred implementation of promises.');
        };
        Object.defineProperty(cb.promise, 'then', { get: throwPromiseNotDefined });
        Object.defineProperty(cb.promise, 'catch', { get: throwPromiseNotDefined });
        return cb;
    }
    var promise = new Promise(function (resolve, reject) {
        cb = function (err, data) {
            if (err)
                return reject(err);
            return resolve(data);
        };
    });
    cb.promise = promise;
    return cb;
};
exports.getWeixinCode = function () {
    return exports.getQuery('code') || exports.getHash('code');
};
exports.getMiniAppCode = function () {
    return new Promise(function (resolve, reject) {
        wx.login({
            success: function (res) {
                resolve(res.code);
            },
            fail: function (err) {
                reject(err);
            }
        });
    });
};
function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
}
exports.isArray = isArray;
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
function isUndefined(val) {
    return typeof val === 'undefined';
}
exports.isUndefined = isUndefined;
function isNull(val) {
    return Object.prototype.toString.call(val) === '[object Null]';
}
exports.isNull = isNull;
function isInstanceOf(instance, construct) {
    return instance instanceof construct;
}
exports.isInstanceOf = isInstanceOf;
function isFormData(val) {
    return Object.prototype.toString.call(val) === '[object FormData]';
}
exports.isFormData = isFormData;
function genSeqId() {
    return Math.random().toString(16).slice(2);
}
exports.genSeqId = genSeqId;
function getArgNames(fn) {
    var funStr = fn.toString();
    return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}
exports.getArgNames = getArgNames;
function formatUrl(protocol, url, query) {
    if (query === void 0) { query = {}; }
    var urlHasQuery = /\?/.test(url);
    var queryString = '';
    for (var key in query) {
        if (queryString === '') {
            !urlHasQuery && (url += '?');
        }
        else {
            queryString += '&';
        }
        queryString += key + "=" + encodeURIComponent(query[key]);
    }
    url += queryString;
    if (/^http(s)?\:\/\//.test(url)) {
        return url;
    }
    return "" + protocol + url;
}
exports.formatUrl = formatUrl;
function toQueryString(query) {
    if (query === void 0) { query = {}; }
    var queryString = [];
    for (var key in query) {
        queryString.push(key + "=" + encodeURIComponent(query[key]));
    }
    return queryString.join('&');
}
exports.toQueryString = toQueryString;
function base64url(source) {
    var encodedSource = enc_base64_1.default.stringify(source);
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
    return encodedSource;
}
function createSign(payload, secret) {
    var header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    var headerStr = base64url(enc_utf8_1.default.parse(JSON.stringify(header)));
    var payloadStr = base64url(enc_utf8_1.default.parse(JSON.stringify(payload)));
    var token = headerStr + "." + payloadStr;
    var sign = base64url(hmac_sha256_1.default(token, secret));
    return token + "." + sign;
}
exports.createSign = createSign;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576601, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../lib/request");
var cache_1 = require("../lib/cache");
var LOGINTYPE;
(function (LOGINTYPE) {
    LOGINTYPE["ANONYMOUS"] = "ANONYMOUS";
    LOGINTYPE["WECHAT"] = "WECHAT";
    LOGINTYPE["CUSTOM"] = "CUSTOM";
    LOGINTYPE["NULL"] = "NULL";
})(LOGINTYPE = exports.LOGINTYPE || (exports.LOGINTYPE = {}));
var AuthProvider = (function () {
    function AuthProvider(config) {
        this.config = config;
        this._cache = cache_1.getCache(config.env);
        this._request = request_1.getRequestByEnvId(config.env);
    }
    AuthProvider.prototype.setRefreshToken = function (refreshToken) {
        var _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey;
        this._cache.removeStore(accessTokenKey);
        this._cache.removeStore(accessTokenExpireKey);
        this._cache.setStore(refreshTokenKey, refreshToken);
    };
    return AuthProvider;
}());
exports.AuthProvider = AuthProvider;

}, function(modId) { var map = {"../lib/request":1588515576602,"../lib/cache":1588515576605}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576602, function(require, module, exports) {

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var cache_1 = require("./cache");
var events_1 = require("./events");
var util_1 = require("./util");
var adapters_1 = require("../adapters");
var base_1 = require("../auth/base");
var actionsWithoutAccessToken = [
    'auth.getJwt',
    'auth.logout',
    'auth.signInWithTicket',
    'auth.signInAnonymously'
];
var commonHeader = {
    'X-SDK-Version': types_1.SDK_VERISON
};
function bindHooks(instance, name, hooks) {
    var originMethod = instance[name];
    instance[name] = function (options) {
        var data = {};
        var headers = {};
        hooks.forEach(function (hook) {
            var _a = hook.call(instance, options), appendedData = _a.data, appendedHeaders = _a.headers;
            Object.assign(data, appendedData);
            Object.assign(headers, appendedHeaders);
        });
        var originData = options.data;
        originData && (function () {
            if (util_1.isFormData(originData)) {
                for (var key in data) {
                    originData.append(key, data[key]);
                }
                return;
            }
            options.data = __assign(__assign({}, originData), data);
        })();
        options.headers = __assign(__assign({}, (options.headers || {})), headers);
        return originMethod.call(instance, options);
    };
}
function beforeEach() {
    var seqId = util_1.genSeqId();
    return {
        data: {
            seqId: seqId
        },
        headers: __assign(__assign({}, commonHeader), { 'x-seqid': seqId })
    };
}
var IRequest = (function () {
    function IRequest(config) {
        if (config === void 0) { config = {}; }
        this.config = config;
        this._reqClass = new adapters_1.Adapter.adapter.reqClass({
            timeout: this.config.timeout,
            timeoutMsg: "[tcb-js-sdk] \u8BF7\u6C42\u5728" + this.config.timeout / 1000 + "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD",
            restrictedMethods: ['post']
        });
        this._cache = cache_1.getCache(this.config.env);
        this._localCache = cache_1.getLocalCache(this.config.env);
        bindHooks(this._reqClass, 'post', [beforeEach]);
        bindHooks(this._reqClass, 'upload', [beforeEach]);
        bindHooks(this._reqClass, 'download', [beforeEach]);
    }
    IRequest.prototype.post = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.post(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    IRequest.prototype.upload = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.upload(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    IRequest.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._reqClass.download(options)];
                    case 1:
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    };
    IRequest.prototype.refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, err, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._refreshAccessTokenPromise) {
                            this._refreshAccessTokenPromise = this._refreshAccessToken();
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this._refreshAccessTokenPromise];
                    case 2:
                        result = _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        err = e_1;
                        return [3, 4];
                    case 4:
                        this._refreshAccessTokenPromise = null;
                        this._shouldRefreshAccessTokenHook = null;
                        if (err) {
                            throw err;
                        }
                        return [2, result];
                }
            });
        });
    };
    IRequest.prototype._refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, refreshTokenKey, loginTypeKey, anonymousUuidKey, refreshToken, params, isAnonymous, response, code;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey, refreshTokenKey = _a.refreshTokenKey, loginTypeKey = _a.loginTypeKey, anonymousUuidKey = _a.anonymousUuidKey;
                        this._cache.removeStore(accessTokenKey);
                        this._cache.removeStore(accessTokenExpireKey);
                        refreshToken = this._cache.getStore(refreshTokenKey);
                        if (!refreshToken) {
                            throw new Error('[tcb-js-sdk] 未登录CloudBase');
                        }
                        params = {
                            refresh_token: refreshToken,
                        };
                        isAnonymous = this._cache.getStore(loginTypeKey) === base_1.LOGINTYPE.ANONYMOUS;
                        if (isAnonymous) {
                            params.anonymous_uuid = this._cache.getStore(anonymousUuidKey);
                        }
                        return [4, this.request('auth.getJwt', params)];
                    case 1:
                        response = _b.sent();
                        if (response.data.code) {
                            code = response.data.code;
                            if (code === 'SIGN_PARAM_INVALID' || code === 'REFRESH_TOKEN_EXPIRED' || code === 'INVALID_REFRESH_TOKEN') {
                                events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_EXPIRED);
                                this._cache.removeStore(refreshTokenKey);
                            }
                            throw new Error("[tcb-js-sdk] \u5237\u65B0access token\u5931\u8D25\uFF1A" + response.data.code);
                        }
                        if (response.data.access_token) {
                            events_1.activateEvent(events_1.EVENTS.ACCESS_TOKEN_REFRESHD);
                            this._cache.setStore(accessTokenKey, response.data.access_token);
                            this._cache.setStore(accessTokenExpireKey, response.data.access_token_expire + Date.now());
                            return [2, {
                                    accessToken: response.data.access_token,
                                    accessTokenExpire: response.data.access_token_expire
                                }];
                        }
                        if (response.data.refresh_token) {
                            this._cache.removeStore(refreshTokenKey);
                            this._cache.setStore(refreshTokenKey, response.data.refresh_token);
                            this._refreshAccessToken();
                        }
                        return [2];
                }
            });
        });
    };
    IRequest.prototype.getAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, accessTokenKey, accessTokenExpireKey, accessToken, accessTokenExpire, shouldRefreshAccessToken, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this._cache.keys, accessTokenKey = _a.accessTokenKey, accessTokenExpireKey = _a.accessTokenExpireKey;
                        accessToken = this._cache.getStore(accessTokenKey);
                        accessTokenExpire = this._cache.getStore(accessTokenExpireKey);
                        shouldRefreshAccessToken = true;
                        _b = this._shouldRefreshAccessTokenHook;
                        if (!_b) return [3, 2];
                        return [4, this._shouldRefreshAccessTokenHook(accessToken, accessTokenExpire)];
                    case 1:
                        _b = !(_c.sent());
                        _c.label = 2;
                    case 2:
                        if (_b) {
                            shouldRefreshAccessToken = false;
                        }
                        if ((!accessToken || !accessTokenExpire || accessTokenExpire < Date.now()) && shouldRefreshAccessToken) {
                            return [2, this.refreshAccessToken()];
                        }
                        else {
                            return [2, {
                                    accessToken: accessToken,
                                    accessTokenExpire: accessTokenExpire
                                }];
                        }
                        return [2];
                }
            });
        });
    };
    IRequest.prototype.request = function (action, params, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tcbTraceKey, contentType, tmpObj, _a, payload, key, key, _b, appSign, appSecret, timestamp, appAccessKey, appAccessKeyId, sign, opts, traceHeader, parse, inQuery, search, formatQuery, newUrl, res, resTraceHeader;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tcbTraceKey = "x-tcb-trace_" + this.config.env;
                        contentType = 'application/x-www-form-urlencoded';
                        tmpObj = __assign({ action: action,
                            dataVersion: types_1.dataVersion, env: this.config.env }, params);
                        if (!(actionsWithoutAccessToken.indexOf(action) === -1)) return [3, 2];
                        _a = tmpObj;
                        return [4, this.getAccessToken()];
                    case 1:
                        _a.access_token = (_c.sent()).accessToken;
                        _c.label = 2;
                    case 2:
                        if (action === 'storage.uploadFile') {
                            payload = new FormData();
                            for (key in payload) {
                                if (payload.hasOwnProperty(key) && payload[key] !== undefined) {
                                    payload.append(key, tmpObj[key]);
                                }
                            }
                            contentType = 'multipart/form-data';
                        }
                        else {
                            contentType = 'application/json;charset=UTF-8';
                            payload = {};
                            for (key in tmpObj) {
                                if (tmpObj[key] !== undefined) {
                                    payload[key] = tmpObj[key];
                                }
                            }
                        }
                        if (adapters_1.Adapter.runtime !== adapters_1.RUNTIME.WEB) {
                            _b = this.config, appSign = _b.appSign, appSecret = _b.appSecret;
                            timestamp = Date.now();
                            appAccessKey = appSecret.appAccessKey, appAccessKeyId = appSecret.appAccessKeyId;
                            sign = util_1.createSign({
                                data: payload,
                                timestamp: timestamp,
                                appAccessKeyId: appAccessKeyId,
                                appSign: appSign
                            }, appAccessKey);
                            payload = __assign(__assign({}, payload), { timestamp: timestamp,
                                appAccessKey: appAccessKey,
                                appSign: appSign,
                                sign: sign });
                        }
                        opts = {
                            headers: {
                                'content-type': contentType
                            }
                        };
                        if (options && options['onUploadProgress']) {
                            opts.onUploadProgress = options['onUploadProgress'];
                        }
                        traceHeader = this._localCache.getStore(tcbTraceKey);
                        if (traceHeader) {
                            opts.headers['X-TCB-Trace'] = traceHeader;
                        }
                        parse = params.parse, inQuery = params.inQuery, search = params.search;
                        formatQuery = {
                            env: this.config.env
                        };
                        parse && (formatQuery.parse = true);
                        inQuery && (formatQuery = __assign(__assign({}, inQuery), formatQuery));
                        newUrl = util_1.formatUrl(types_1.protocol, types_1.BASE_URL, formatQuery);
                        if (search) {
                            newUrl += search;
                        }
                        return [4, this.post(__assign({ url: newUrl, data: payload }, opts))];
                    case 3:
                        res = _c.sent();
                        resTraceHeader = res.header && res.header['x-tcb-trace'];
                        if (resTraceHeader) {
                            this._localCache.setStore(tcbTraceKey, resTraceHeader);
                        }
                        if ((Number(res.status) !== 200 && Number(res.statusCode) !== 200) || !res.data) {
                            throw new Error('network request error');
                        }
                        return [2, res];
                }
            });
        });
    };
    IRequest.prototype.send = function (action, data) {
        if (data === void 0) { data = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, response_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 1:
                        response = _a.sent();
                        if (!(response.data.code === 'ACCESS_TOKEN_EXPIRED' && actionsWithoutAccessToken.indexOf(action) === -1)) return [3, 4];
                        return [4, this.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        return [4, this.request(action, data, { onUploadProgress: data.onUploadProgress })];
                    case 3:
                        response_1 = _a.sent();
                        if (response_1.data.code) {
                            throw new Error("[" + response_1.data.code + "] " + response_1.data.message);
                        }
                        return [2, response_1.data];
                    case 4:
                        if (response.data.code) {
                            throw new Error("[" + response.data.code + "] " + response.data.message);
                        }
                        return [2, response.data];
                }
            });
        });
    };
    return IRequest;
}());
exports.IRequest = IRequest;
var requestMap = {};
function initRequest(config) {
    requestMap[config.env] = new IRequest(config);
}
exports.initRequest = initRequest;
function getRequestByEnvId(env) {
    return requestMap[env];
}
exports.getRequestByEnvId = getRequestByEnvId;

}, function(modId) { var map = {"../types":1588515576603,"./cache":1588515576605,"./events":1588515576608,"./util":1588515576600,"../adapters":1588515576606,"../auth/base":1588515576601}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576603, function(require, module, exports) {

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var packageInfo = __importStar(require("../package.json"));
exports.SDK_VERISON = packageInfo.version;
exports.ACCESS_TOKEN = 'access_token';
exports.ACCESS_TOKEN_Expire = 'access_token_expire';
exports.REFRESH_TOKEN = 'refresh_token';
exports.ANONYMOUS_UUID = 'anonymous_uuid';
exports.LOGIN_TYPE_KEY = 'login_type';
exports.protocol = typeof location !== 'undefined' && location.protocol === 'http:' ? 'http:' : 'https:';
exports.BASE_URL = process.env.NODE_ENV === 'e2e' && process.env.END_POINT === 'pre'
    ? '//tcb-pre.tencentcloudapi.com/web'
    : '//tcb-api.tencentcloudapi.com/web';
exports.dataVersion = '2020-01-10';

}, function(modId) { var map = {"../package.json":1588515576604}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576604, function(require, module, exports) {
module.exports = {
  "_from": "tcb-js-sdk@latest",
  "_id": "tcb-js-sdk@1.6.1",
  "_inBundle": false,
  "_integrity": "sha512-yKRuihpyypyKuw2HHMtll6TG606sx18Ii3Z531BfcHIenDkY7akOCx/RDzzLTHNFiKMXdHauEmK2G/1kU3NtnA==",
  "_location": "/tcb-js-sdk",
  "_phantomChildren": {},
  "_requested": {
    "type": "tag",
    "registry": true,
    "raw": "tcb-js-sdk@latest",
    "name": "tcb-js-sdk",
    "escapedName": "tcb-js-sdk",
    "rawSpec": "latest",
    "saveSpec": null,
    "fetchSpec": "latest"
  },
  "_requiredBy": [
    "#USER",
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/tcb-js-sdk/-/tcb-js-sdk-1.6.1.tgz",
  "_shasum": "8da2e7aedc11fa2358aadaebd98712838b211543",
  "_spec": "tcb-js-sdk@latest",
  "_where": "D:\\develop\\wx_xcx\\pmdog\\miniprogram",
  "author": {
    "name": "jimmyjzhang"
  },
  "bugs": {
    "url": "https://github.com/TencentCloudBase/tcb-js-sdk/issues"
  },
  "bundleDependencies": false,
  "dependencies": {
    "@cloudbase/adapter-interface": "^0.4.0",
    "@cloudbase/database": "0.9.11-rc.0",
    "axios": "^0.19.1",
    "cloudbase-adapter-wx_mp": "^0.1.0",
    "crypto-js": "^3.1.9-1",
    "fingerprintjs2": "^2.1.0",
    "url": "^0.11.0"
  },
  "deprecated": false,
  "description": "js sdk for tcb",
  "devDependencies": {
    "@babel/core": "^7.6.2",
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/plugin-proposal-object-rest-spread": "^7.6.2",
    "@babel/plugin-transform-runtime": "^7.6.2",
    "@babel/preset-env": "^7.6.2",
    "@babel/preset-typescript": "^7.6.0",
    "@babel/runtime": "^7.6.2",
    "@types/jest": "^23.1.4",
    "@types/node": "^10.14.4",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.6",
    "dts-bundle": "^0.7.3",
    "eslint": "^5.16.0",
    "eslint-config-alloy": "^1.4.2",
    "eslint-config-prettier": "^4.1.0",
    "eslint-plugin-prettier": "^3.0.1",
    "eslint-plugin-typescript": "^1.0.0-rc.3",
    "express": "^4.17.1",
    "husky": "^3.1.0",
    "jest": "^24.7.1",
    "jest-puppeteer": "^4.3.0",
    "lint-staged": "^9.5.0",
    "power-assert": "^1.6.1",
    "puppeteer": "^1.20.0",
    "serve-static": "^1.14.1",
    "ts-jest": "^23.10.4",
    "ts-loader": "^6.2.1",
    "typescript": "^3.4.3",
    "typescript-eslint-parser": "^22.0.0",
    "webpack": "^4.41.3",
    "webpack-bundle-analyzer": "^3.4.1",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.3.1",
    "webpack-visualizer-plugin": "^0.1.11"
  },
  "homepage": "https://github.com/TencentCloudBase/tcb-js-sdk#readme",
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "keywords": [
    "tcb",
    "js-sdk"
  ],
  "license": "ISC",
  "lint-staged": {
    "*.{js,ts}": [
      "eslint --fix",
      "git add"
    ]
  },
  "main": "dist/index.js",
  "name": "tcb-js-sdk",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/TencentCloudBase/tcb-js-sdk.git"
  },
  "scripts": {
    "build": "npm run tsc && webpack",
    "e2e": "NODE_ENV=e2e webpack && jest --config=\"./jest.e2e.config.js\"  --verbose false -i \"e2e\"",
    "eslint": "eslint \"./**/*.js\" \"./**/*.ts\"",
    "eslint-fix": "eslint --fix \"./**/*.js\" \"./**/*.ts\"",
    "prepublish": "npm run tsc",
    "start": "webpack-dev-server --hot --open",
    "test": "jest --verbose false -i",
    "test_web": "npm run tsc && webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./dist --host jimmytest-088bef.tcb.qcloud.la --port 80 --disableHostCheck true --mode development --config webpack.test.js",
    "tsc": "tsc -p tsconfig.json",
    "tsc:w": "tsc -p tsconfig.json -w"
  },
  "types": "./dist/index.d.ts",
  "version": "1.6.1"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576605, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_interface_1 = require("@cloudbase/adapter-interface");
var adapters_1 = require("../adapters");
var types_1 = require("../types");
var util_1 = require("./util");
var alwaysLocalKeys = ['anonymousUuidKey'];
var TcbObject = (function (_super) {
    __extends(TcbObject, _super);
    function TcbObject() {
        var _this = _super.call(this) || this;
        if (!adapters_1.Adapter.adapter.root['tcbObject']) {
            adapters_1.Adapter.adapter.root['tcbObject'] = {};
        }
        return _this;
    }
    TcbObject.prototype.setItem = function (key, value) {
        adapters_1.Adapter.adapter.root['tcbObject'][key] = value;
    };
    TcbObject.prototype.getItem = function (key) {
        return adapters_1.Adapter.adapter.root['tcbObject'][key];
    };
    TcbObject.prototype.removeItem = function (key) {
        delete adapters_1.Adapter.adapter.root['tcbObject'][key];
    };
    TcbObject.prototype.clear = function () {
        delete adapters_1.Adapter.adapter.root['tcbObject'];
    };
    return TcbObject;
}(adapter_interface_1.AbstractStorage));
function createStorage(persistence, adapter) {
    switch (persistence) {
        case 'local':
            return adapter.localStorage || new TcbObject();
        case 'none':
            return new TcbObject();
        default:
            return adapter.sessionStorage || new TcbObject();
    }
}
var ICache = (function () {
    function ICache(config) {
        this.keys = {};
        if (!this._storage) {
            this._persistence = adapters_1.Adapter.adapter.primaryStorage || config.persistence;
            this._storage = createStorage(this._persistence, adapters_1.Adapter.adapter);
            var accessTokenKey = types_1.ACCESS_TOKEN + "_" + config.env;
            var accessTokenExpireKey = types_1.ACCESS_TOKEN_Expire + "_" + config.env;
            var refreshTokenKey = types_1.REFRESH_TOKEN + "_" + config.env;
            var anonymousUuidKey = types_1.ANONYMOUS_UUID + "_" + config.env;
            var loginTypeKey = types_1.LOGIN_TYPE_KEY + "_" + config.env;
            this.keys = {
                accessTokenKey: accessTokenKey,
                accessTokenExpireKey: accessTokenExpireKey,
                refreshTokenKey: refreshTokenKey,
                anonymousUuidKey: anonymousUuidKey,
                loginTypeKey: loginTypeKey
            };
        }
    }
    ICache.prototype.updatePersistence = function (persistence) {
        if (persistence === this._persistence) {
            return;
        }
        var isCurrentLocal = this._persistence === 'local';
        this._persistence = persistence;
        var storage = createStorage(persistence, adapters_1.Adapter.adapter);
        for (var key in this.keys) {
            var name_1 = this.keys[key];
            if (isCurrentLocal && alwaysLocalKeys.includes(key)) {
                continue;
            }
            var val = this._storage.getItem(name_1);
            if (!util_1.isUndefined(val) && !util_1.isNull(val)) {
                storage.setItem(name_1, val);
                this._storage.removeItem(name_1);
            }
        }
        this._storage = storage;
    };
    ICache.prototype.setStore = function (key, value, version) {
        if (!this._storage) {
            return;
        }
        var d = {
            version: version || 'localCachev1',
            content: value
        };
        var content = JSON.stringify(d);
        try {
            this._storage.setItem(key, content);
        }
        catch (e) {
            return;
        }
        return;
    };
    ICache.prototype.getStore = function (key, version) {
        try {
            if (process && process.env && process.env.tcb_token) {
                return process.env.tcb_token;
            }
            if (!this._storage) {
                return;
            }
        }
        catch (e) {
            return '';
        }
        version = version || 'localCachev1';
        var content = this._storage.getItem(key);
        if (!content) {
            return '';
        }
        if (content.indexOf(version) >= 0) {
            var d = JSON.parse(content);
            return d.content;
        }
        else {
            return '';
        }
    };
    ICache.prototype.removeStore = function (key) {
        this._storage.removeItem(key);
    };
    return ICache;
}());
exports.ICache = ICache;
var cacheMap = {};
var localCacheMap = {};
function initCache(config) {
    var env = config.env;
    cacheMap[env] = new ICache(config);
    localCacheMap[env] = new ICache(__assign(__assign({}, config), { persistence: 'local' }));
}
exports.initCache = initCache;
function getCache(env) {
    return cacheMap[env];
}
exports.getCache = getCache;
function getLocalCache(env) {
    return localCacheMap[env];
}
exports.getLocalCache = getLocalCache;

}, function(modId) { var map = {"../adapters":1588515576606,"../types":1588515576603,"./util":1588515576600}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576606, function(require, module, exports) {

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Web = __importStar(require("./platforms/web"));
var util_1 = require("../lib/util");
var RUNTIME;
(function (RUNTIME) {
    RUNTIME["WEB"] = "web";
    RUNTIME["WX_MP"] = "wx_mp";
})(RUNTIME = exports.RUNTIME || (exports.RUNTIME = {}));
function useAdapters(adapters) {
    var adapterList = util_1.isArray(adapters) ? adapters : [adapters];
    for (var _i = 0, adapterList_1 = adapterList; _i < adapterList_1.length; _i++) {
        var adapter = adapterList_1[_i];
        var isMatch = adapter.isMatch, genAdapter = adapter.genAdapter, runtime = adapter.runtime;
        if (isMatch()) {
            return {
                adapter: genAdapter(),
                runtime: runtime
            };
        }
    }
}
exports.useAdapters = useAdapters;
function useDefaultAdapter() {
    return {
        adapter: Web.genAdapter(),
        runtime: RUNTIME.WEB
    };
}
exports.useDefaultAdapter = useDefaultAdapter;
exports.Adapter = {
    adapter: null,
    runtime: undefined
};

}, function(modId) { var map = {"./platforms/web":1588515576607,"../lib/util":1588515576600}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576607, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_interface_1 = require("@cloudbase/adapter-interface");
var types_1 = require("../../types");
var util_1 = require("../../lib/util");
var WebRequest = (function (_super) {
    __extends(WebRequest, _super);
    function WebRequest(config) {
        var _this = _super.call(this) || this;
        var timeout = config.timeout, timeoutMsg = config.timeoutMsg, restrictedMethods = config.restrictedMethods;
        _this._timeout = timeout || 0;
        _this._timeoutMsg = timeoutMsg || '请求超时';
        _this._restrictedMethods = restrictedMethods || ['get', 'post', 'upload', 'download'];
        return _this;
    }
    WebRequest.prototype.get = function (options) {
        return this._request(__assign(__assign({}, options), { method: 'get' }), this._restrictedMethods.includes('get'));
    };
    WebRequest.prototype.post = function (options) {
        return this._request(__assign(__assign({}, options), { method: 'post' }), this._restrictedMethods.includes('post'));
    };
    WebRequest.prototype.put = function (options) {
        return this._request(__assign(__assign({}, options), { method: 'put' }));
    };
    WebRequest.prototype.upload = function (options) {
        var data = options.data, file = options.file, name = options.name;
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        formData.append('key', name);
        formData.append('file', file);
        return this._request(__assign(__assign({}, options), { data: formData, method: 'post' }), this._restrictedMethods.includes('upload'));
    };
    WebRequest.prototype.download = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var fileName, link;
            return __generator(this, function (_a) {
                fileName = decodeURIComponent(new URL(options.url).pathname.split('/').pop() || '');
                link = document.createElement('a');
                link.href = options.url;
                link.setAttribute('download', fileName);
                link.setAttribute('target', '_blank');
                document.body.appendChild(link);
                link.click();
                return [2, new Promise(function (resolve) {
                        resolve({
                            statusCode: 200,
                            tempFilePath: options.url
                        });
                    })];
            });
        });
    };
    WebRequest.prototype._request = function (options, enableAbort) {
        var _this = this;
        if (enableAbort === void 0) { enableAbort = false; }
        var method = (String(options.method)).toLowerCase() || 'get';
        return new Promise(function (resolve) {
            var url = options.url, _a = options.headers, headers = _a === void 0 ? {} : _a, data = options.data, responseType = options.responseType, withCredentials = options.withCredentials, body = options.body, onUploadProgress = options.onUploadProgress;
            var realUrl = util_1.formatUrl(types_1.protocol, url, method === 'get' ? data : {});
            var ajax = new XMLHttpRequest();
            ajax.open(method, realUrl);
            responseType && (ajax.responseType = responseType);
            for (var key in headers) {
                ajax.setRequestHeader(key, headers[key]);
            }
            var timer;
            if (onUploadProgress) {
                ajax.addEventListener('progress', onUploadProgress);
            }
            ajax.onreadystatechange = function () {
                var result = {};
                if (ajax.readyState === 4) {
                    var headers_1 = ajax.getAllResponseHeaders();
                    var arr = headers_1.trim().split(/[\r\n]+/);
                    var headerMap_1 = {};
                    arr.forEach(function (line) {
                        var parts = line.split(': ');
                        var header = parts.shift().toLowerCase();
                        var value = parts.join(': ');
                        headerMap_1[header] = value;
                    });
                    result.header = headerMap_1;
                    result.statusCode = ajax.status;
                    try {
                        result.data = JSON.parse(ajax.responseText);
                    }
                    catch (e) {
                        result.data = ajax.responseText;
                    }
                    clearTimeout(timer);
                    resolve(result);
                }
            };
            if (enableAbort && _this._timeout) {
                timer = setTimeout(function () {
                    console.warn(_this._timeoutMsg);
                    ajax.abort();
                }, _this._timeout);
            }
            var payload;
            if (util_1.isFormData(data)) {
                payload = data;
            }
            else if (headers['content-type'] === 'application/x-www-form-urlencoded') {
                payload = util_1.toQueryString(data);
            }
            else if (body) {
                payload = body;
            }
            else {
                payload = data ? JSON.stringify(data) : undefined;
            }
            if (withCredentials) {
                ajax.withCredentials = true;
            }
            ajax.send(payload);
        });
    };
    return WebRequest;
}(adapter_interface_1.AbstractSDKRequest));
exports.WebRequest = WebRequest;
function genAdapter() {
    var adapter = {
        root: window,
        reqClass: WebRequest,
        wsClass: WebSocket,
        localStorage: localStorage,
        sessionStorage: sessionStorage
    };
    return adapter;
}
exports.genAdapter = genAdapter;

}, function(modId) { var map = {"../../types":1588515576603,"../../lib/util":1588515576600}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576608, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function _addEventListener(name, listener, listeners) {
    listeners[name] = listeners[name] || [];
    listeners[name].push(listener);
}
function _removeEventListener(name, listener, listeners) {
    if (listeners && listeners[name]) {
        var index = listeners[name].indexOf(listener);
        if (index !== -1) {
            listeners[name].splice(index, 1);
        }
    }
}
var IEvent = (function () {
    function IEvent(name, data) {
        this.data = data || null;
        this.name = name;
    }
    return IEvent;
}());
exports.IEvent = IEvent;
var IErrorEvent = (function (_super) {
    __extends(IErrorEvent, _super);
    function IErrorEvent(error, data) {
        var _this = _super.call(this, 'error', { error: error, data: data }) || this;
        _this.error = error;
        return _this;
    }
    return IErrorEvent;
}(IEvent));
exports.IErrorEvent = IErrorEvent;
var IEventEmitter = (function () {
    function IEventEmitter() {
        this._listeners = {};
    }
    IEventEmitter.prototype.on = function (name, listener) {
        _addEventListener(name, listener, this._listeners);
        return this;
    };
    IEventEmitter.prototype.off = function (name, listener) {
        _removeEventListener(name, listener, this._listeners);
        return this;
    };
    IEventEmitter.prototype.fire = function (event, data) {
        if (util_1.isInstanceOf(event, IErrorEvent)) {
            console.error(event.error);
            return this;
        }
        var ev = util_1.isString(event) ? new IEvent(event, data || {}) : event;
        var name = ev.name;
        if (this._listens(name)) {
            ev.target = this;
            var handlers = this._listeners[name] ? __spreadArrays(this._listeners[name]) : [];
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var fn = handlers_1[_i];
                fn.call(this, ev);
            }
        }
        return this;
    };
    IEventEmitter.prototype._listens = function (name) {
        return this._listeners[name] && this._listeners[name].length > 0;
    };
    return IEventEmitter;
}());
exports.IEventEmitter = IEventEmitter;
var iEventEmitter = new IEventEmitter();
function addEventListener(event, callback) {
    iEventEmitter.on(event, callback);
}
exports.addEventListener = addEventListener;
function activateEvent(event, data) {
    if (data === void 0) { data = {}; }
    iEventEmitter.fire(event, data);
}
exports.activateEvent = activateEvent;
function removeEventListener(event, callback) {
    iEventEmitter.off(event, callback);
}
exports.removeEventListener = removeEventListener;
exports.EVENTS = {
    LOGIN_STATE_CHANGED: 'loginStateChanged',
    LOGIN_STATE_EXPIRED: 'loginStateExpire',
    LOGIN_TYPE_CHANGED: 'loginTypeChanged',
    ANONYMOUS_CONVERTED: 'anonymousConverted',
    ACCESS_TOKEN_REFRESHD: 'refreshAccessToken'
};

}, function(modId) { var map = {"./util":1588515576600}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576609, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var events_1 = require("../lib/events");
var AnonymousAuthProvider = (function (_super) {
    __extends(AnonymousAuthProvider, _super);
    function AnonymousAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnonymousAuthProvider.prototype.signIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, refreshTokenKey, anonymous_uuid, refresh_token, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._cache.updatePersistence('local');
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, refreshTokenKey = _a.refreshTokenKey;
                        anonymous_uuid = this._cache.getStore(anonymousUuidKey) || undefined;
                        refresh_token = this._cache.getStore(refreshTokenKey) || undefined;
                        return [4, this._request.send('auth.signInAnonymously', {
                                anonymous_uuid: anonymous_uuid,
                                refresh_token: refresh_token
                            })];
                    case 1:
                        res = _b.sent();
                        if (!(res.uuid && res.refresh_token)) return [3, 3];
                        this._setAnonymousUUID(res.uuid);
                        this.setRefreshToken(res.refresh_token);
                        return [4, this._request.refreshAccessToken()];
                    case 2:
                        _b.sent();
                        events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_CHANGED);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this.config.env,
                            loginType: base_1.LOGINTYPE.ANONYMOUS,
                            persistence: 'local'
                        });
                        return [2, {
                                credential: {
                                    refreshToken: res.refresh_token
                                }
                            }];
                    case 3: throw new Error('[tcb-js-sdk] 匿名登录失败');
                }
            });
        });
    };
    AnonymousAuthProvider.prototype.linkAndRetrieveDataWithTicket = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, anonymousUuidKey, refreshTokenKey, uuid, refresh_token, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, refreshTokenKey = _a.refreshTokenKey;
                        uuid = this._cache.getStore(anonymousUuidKey);
                        refresh_token = this._cache.getStore(refreshTokenKey);
                        return [4, this._request.send('auth.linkAndRetrieveDataWithTicket', {
                                anonymous_uuid: uuid,
                                refresh_token: refresh_token,
                                ticket: ticket
                            })];
                    case 1:
                        res = _b.sent();
                        if (!res.refresh_token) return [3, 3];
                        this._clearAnonymousUUID();
                        this.setRefreshToken(res.refresh_token);
                        return [4, this._request.refreshAccessToken()];
                    case 2:
                        _b.sent();
                        events_1.activateEvent(events_1.EVENTS.ANONYMOUS_CONVERTED, { env: this.config.env });
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGED, { loginType: base_1.LOGINTYPE.CUSTOM, persistence: 'local' });
                        return [2, {
                                credential: {
                                    refreshToken: res.refresh_token
                                }
                            }];
                    case 3: throw new Error('[tcb-js-sdk] 匿名转化失败');
                }
            });
        });
    };
    AnonymousAuthProvider.prototype._setAnonymousUUID = function (id) {
        var _a = this._cache.keys, anonymousUuidKey = _a.anonymousUuidKey, loginTypeKey = _a.loginTypeKey;
        this._cache.removeStore(anonymousUuidKey);
        this._cache.setStore(anonymousUuidKey, id);
        this._cache.setStore(loginTypeKey, base_1.LOGINTYPE.ANONYMOUS);
    };
    AnonymousAuthProvider.prototype._clearAnonymousUUID = function () {
        this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    };
    return AnonymousAuthProvider;
}(base_1.AuthProvider));
exports.AnonymousAuthProvider = AnonymousAuthProvider;

}, function(modId) { var map = {"./base":1588515576601,"../lib/events":1588515576608}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576610, function(require, module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var events_1 = require("../lib/events");
var CustomAuthProvider = (function (_super) {
    __extends(CustomAuthProvider, _super);
    function CustomAuthProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomAuthProvider.prototype.signIn = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshTokenKey, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof ticket !== 'string') {
                            throw new Error('ticket must be a string');
                        }
                        refreshTokenKey = this._cache.keys.refreshTokenKey;
                        return [4, this._request.send('auth.signInWithTicket', {
                                ticket: ticket,
                                refresh_token: this._cache.getStore(refreshTokenKey) || ''
                            })];
                    case 1:
                        res = _a.sent();
                        if (!res.refresh_token) return [3, 3];
                        this.setRefreshToken(res.refresh_token);
                        return [4, this._request.refreshAccessToken()];
                    case 2:
                        _a.sent();
                        events_1.activateEvent(events_1.EVENTS.LOGIN_STATE_CHANGED);
                        events_1.activateEvent(events_1.EVENTS.LOGIN_TYPE_CHANGED, {
                            env: this.config.env,
                            loginType: base_1.LOGINTYPE.CUSTOM,
                            persistence: this.config.persistence
                        });
                        return [2, {
                                credential: {
                                    refreshToken: res.refresh_token
                                }
                            }];
                    case 3: throw new Error('[tcb-js-sdk] 自定义登录失败');
                }
            });
        });
    };
    return CustomAuthProvider;
}(base_1.AuthProvider));
exports.CustomAuthProvider = CustomAuthProvider;

}, function(modId) { var map = {"./base":1588515576601,"../lib/events":1588515576608}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576611, function(require, module, exports) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../lib/request");
var util_1 = require("../lib/util");
exports.uploadFile = function (params, callback) {
    callback = callback || util_1.createPromiseCallback();
    var request = request_1.getRequestByEnvId(this.config.env);
    var metaData = 'storage.getUploadMetadata';
    var cloudPath = params.cloudPath, filePath = params.filePath, onUploadProgress = params.onUploadProgress;
    request
        .send(metaData, {
        path: cloudPath
    })
        .then(function (metaData) {
        var _a = metaData.data, url = _a.url, authorization = _a.authorization, token = _a.token, fileId = _a.fileId, cosFileId = _a.cosFileId, requestId = metaData.requestId;
        var data = {
            key: cloudPath,
            signature: authorization,
            'x-cos-meta-fileid': cosFileId,
            'success_action_status': '201',
            'x-cos-security-token': token
        };
        request.upload({
            url: url,
            data: data,
            file: filePath,
            name: cloudPath,
            onUploadProgress: onUploadProgress
        }).then(function (res) {
            if (res.statusCode === 201) {
                callback(null, {
                    fileID: fileId,
                    requestId: requestId
                });
            }
            else {
                callback(new Error("STORAGE_REQUEST_FAIL: " + res.data));
            }
        })
            .catch(function (err) {
            callback(err);
        });
    })
        .catch(function (err) {
        callback(err);
    });
    return callback.promise;
};
exports.getUploadMetadata = function (params, callback) {
    callback = callback || util_1.createPromiseCallback();
    var request = request_1.getRequestByEnvId(this.config.env);
    var metaData = 'storage.getUploadMetadata';
    var cloudPath = params.cloudPath;
    request
        .send(metaData, {
        path: cloudPath
    })
        .then(function (metaData) {
        callback(null, metaData);
    })
        .catch(function (err) {
        callback(err);
    });
    return callback.promise;
};
exports.deleteFile = function (_a, callback) {
    var fileList = _a.fileList;
    callback = callback || util_1.createPromiseCallback();
    if (!fileList || !Array.isArray(fileList)) {
        return {
            code: 'INVALID_PARAM',
            message: 'fileList必须是非空的数组'
        };
    }
    for (var _i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
        var file = fileList_1[_i];
        if (!file || typeof file !== 'string') {
            return {
                code: 'INVALID_PARAM',
                message: 'fileList的元素必须是非空的字符串'
            };
        }
    }
    var action = 'storage.batchDeleteFile';
    var params = {
        fileid_list: fileList
    };
    var request = request_1.getRequestByEnvId(this.config.env);
    request
        .send(action, params)
        .then(function (res) {
        if (res.code) {
            callback(null, res);
        }
        else {
            callback(null, {
                fileList: res.data.delete_list,
                requestId: res.requestId
            });
        }
    })
        .catch(function (err) {
        callback(err);
    });
    return callback.promise;
};
exports.getTempFileURL = function (_a, callback) {
    var fileList = _a.fileList;
    callback = callback || util_1.createPromiseCallback();
    if (!fileList || !Array.isArray(fileList)) {
        callback(null, {
            code: 'INVALID_PARAM',
            message: 'fileList必须是非空的数组'
        });
    }
    var file_list = [];
    for (var _i = 0, fileList_2 = fileList; _i < fileList_2.length; _i++) {
        var file = fileList_2[_i];
        if (typeof file === 'object') {
            if (!file.hasOwnProperty('fileID') || !file.hasOwnProperty('maxAge')) {
                callback(null, {
                    code: 'INVALID_PARAM',
                    message: 'fileList的元素必须是包含fileID和maxAge的对象'
                });
            }
            file_list.push({
                fileid: file.fileID,
                max_age: file.maxAge
            });
        }
        else if (typeof file === 'string') {
            file_list.push({
                fileid: file
            });
        }
        else {
            callback(null, {
                code: 'INVALID_PARAM',
                message: 'fileList的元素必须是字符串'
            });
        }
    }
    var action = 'storage.batchGetDownloadUrl';
    var params = {
        file_list: file_list
    };
    var request = request_1.getRequestByEnvId(this.config.env);
    request
        .send(action, params)
        .then(function (res) {
        if (res.code) {
            callback(null, res);
        }
        else {
            callback(null, {
                fileList: res.data.download_list,
                requestId: res.requestId
            });
        }
    })
        .catch(function (err) {
        callback(err);
    });
    return callback.promise;
};
exports.downloadFile = function (_a, callback) {
    var fileID = _a.fileID;
    return __awaiter(this, void 0, void 0, function () {
        var tmpUrlRes, res, request, tmpUrl, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, exports.getTempFileURL.call(this, {
                        fileList: [
                            {
                                fileID: fileID,
                                maxAge: 600
                            }
                        ]
                    })];
                case 1:
                    tmpUrlRes = _b.sent();
                    res = tmpUrlRes.fileList[0];
                    if (res.code !== 'SUCCESS') {
                        return [2, callback ? callback(res) : new Promise(function (resolve) { resolve(res); })];
                    }
                    request = request_1.getRequestByEnvId(this.config.env);
                    tmpUrl = res.download_url;
                    tmpUrl = encodeURI(tmpUrl);
                    if (!callback) return [3, 3];
                    return [4, request.download({ url: tmpUrl })];
                case 2:
                    result = _b.sent();
                    callback(result);
                    return [3, 4];
                case 3: return [2, request.download({ url: tmpUrl })];
                case 4: return [2];
            }
        });
    });
};

}, function(modId) { var map = {"../lib/request":1588515576602,"../lib/util":1588515576600}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1588515576612, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../lib/request");
var util_1 = require("../lib/util");
exports.callFunction = function (_a, callback) {
    var name = _a.name, data = _a.data, query = _a.query, parse = _a.parse, search = _a.search;
    var promisedCallback = callback || util_1.createPromiseCallback();
    var jsonData;
    try {
        jsonData = data ? JSON.stringify(data) : '';
    }
    catch (e) {
        return Promise.reject(e);
    }
    if (!name) {
        return Promise.reject(new Error('函数名不能为空'));
    }
    var action = 'functions.invokeFunction';
    var params = {
        inQuery: query,
        parse: parse,
        search: search,
        function_name: name,
        request_data: jsonData
    };
    var request = request_1.getRequestByEnvId(this.config.env);
    request
        .send(action, params)
        .then(function (res) {
        if (res.code) {
            promisedCallback(null, res);
        }
        else {
            var result = res.data.response_data;
            if (parse) {
                promisedCallback(null, {
                    result: result,
                    requestId: res.requestId
                });
            }
            else {
                try {
                    result = JSON.parse(res.data.response_data);
                    promisedCallback(null, {
                        result: result,
                        requestId: res.requestId
                    });
                }
                catch (e) {
                    promisedCallback(new Error('response data must be json'));
                }
            }
        }
        return promisedCallback.promise;
    })
        .catch(function (err) {
        promisedCallback(err);
    });
    return promisedCallback.promise;
};

}, function(modId) { var map = {"../lib/request":1588515576602,"../lib/util":1588515576600}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1588515576597);
})()
//# sourceMappingURL=index.js.map