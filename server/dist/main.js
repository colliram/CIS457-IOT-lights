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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst cors = __webpack_require__(/*! cors */ \"cors\");\r\nconst smartHomeServer_1 = __webpack_require__(/*! ./smartHomeServer */ \"./src/smartHomeServer.ts\");\r\nconst ip = '192.168.86.99';\r\nconst app = express();\r\nconst homeHub = new smartHomeServer_1.SmartHomeServer(ip);\r\napp.use(cors());\r\napp.use(express.json());\r\napp.get('/', (_, response) => {\r\n    response.status(200).send('hello');\r\n});\r\napp.post('/command', async (request, response) => {\r\n    const res = await homeHub.command(request.body);\r\n    if (res.error) {\r\n        response.status(500).send(res);\r\n    }\r\n    else {\r\n        response.status(200).send(res);\r\n    }\r\n});\r\napp.listen(8080, () => {\r\n    console.log('[hub] relay listening');\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/smartHomeServer.ts":
/*!********************************!*\
  !*** ./src/smartHomeServer.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst dgram = __webpack_require__(/*! dgram */ \"dgram\");\r\nconst smartHomeTcpService_1 = __webpack_require__(/*! ../src/smartHomeTcpService */ \"./src/smartHomeTcpService.ts\");\r\nclass SmartHomeServer {\r\n    constructor(address = '127.0.0.1', port = 8888) {\r\n        this.socket = dgram.createSocket('udp4');\r\n        this.address = address;\r\n        this.udpPort = port;\r\n        this.tcpPort = new smartHomeTcpService_1.TcpService();\r\n    }\r\n    command(request) {\r\n        console.log(\"pinged\", request);\r\n        var message = request ? this.processCommandString(JSON.stringify(request)) : ' ';\r\n        this.tcpPort.connect(message);\r\n        return new Promise((resolve, reject) => {\r\n            const message = JSON.stringify(request);\r\n            this.socket.send(message, this.udpPort, this.address, (err) => {\r\n                if (err) {\r\n                    reject();\r\n                    return;\r\n                }\r\n            });\r\n            const error = (err) => {\r\n                this.socket.removeListener('error', error);\r\n                reject(err);\r\n            };\r\n            const receive = (buffer) => {\r\n                this.socket.removeListener('error', error);\r\n                this.socket.removeListener('message', receive);\r\n                const data = JSON.parse(buffer.toString());\r\n                resolve(data);\r\n            };\r\n            this.socket.once('error', error);\r\n            this.socket.once('message', receive);\r\n        });\r\n    }\r\n    processCommandString(message) {\r\n        return message.substring(8, message.length - 2);\r\n    }\r\n}\r\nexports.SmartHomeServer = SmartHomeServer;\r\n\n\n//# sourceURL=webpack:///./src/smartHomeServer.ts?");

/***/ }),

/***/ "./src/smartHomeTcpService.ts":
/*!************************************!*\
  !*** ./src/smartHomeTcpService.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst net = __webpack_require__(/*! net */ \"net\");\r\nclass TcpService {\r\n    constructor() {\r\n        this.connect();\r\n    }\r\n    connect(message = 'Hello, server! Love, Client.') {\r\n        const client = new net.Socket();\r\n        client.connect(80, '10.0.0.101', function () {\r\n            client.write(message);\r\n        });\r\n        client.on('data', function (data) {\r\n            console.log('Received: ' + data);\r\n            client.destroy(); // kill client after server's response\r\n        });\r\n        client.on('close', function () {\r\n            console.log('Connection closed');\r\n        });\r\n    }\r\n}\r\nexports.TcpService = TcpService;\r\n\n\n//# sourceURL=webpack:///./src/smartHomeTcpService.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dgram":
/*!************************!*\
  !*** external "dgram" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dgram\");\n\n//# sourceURL=webpack:///external_%22dgram%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

/***/ })

/******/ });