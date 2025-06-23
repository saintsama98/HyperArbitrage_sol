"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUniswapV2Router__factory = exports.ArbitrageBot__factory = exports.IERC20__factory = exports.Ownable__factory = exports.IPoolAddressesProvider__factory = exports.IPool__factory = exports.IFlashLoanSimpleReceiver__factory = exports.FlashLoanSimpleReceiverBase__factory = exports.factories = void 0;
exports.factories = __importStar(require("./factories"));
var FlashLoanSimpleReceiverBase__factory_1 = require("./factories/@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase__factory");
Object.defineProperty(exports, "FlashLoanSimpleReceiverBase__factory", { enumerable: true, get: function () { return FlashLoanSimpleReceiverBase__factory_1.FlashLoanSimpleReceiverBase__factory; } });
var IFlashLoanSimpleReceiver__factory_1 = require("./factories/@aave/core-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver__factory");
Object.defineProperty(exports, "IFlashLoanSimpleReceiver__factory", { enumerable: true, get: function () { return IFlashLoanSimpleReceiver__factory_1.IFlashLoanSimpleReceiver__factory; } });
var IPool__factory_1 = require("./factories/@aave/core-v3/contracts/interfaces/IPool__factory");
Object.defineProperty(exports, "IPool__factory", { enumerable: true, get: function () { return IPool__factory_1.IPool__factory; } });
var IPoolAddressesProvider__factory_1 = require("./factories/@aave/core-v3/contracts/interfaces/IPoolAddressesProvider__factory");
Object.defineProperty(exports, "IPoolAddressesProvider__factory", { enumerable: true, get: function () { return IPoolAddressesProvider__factory_1.IPoolAddressesProvider__factory; } });
var Ownable__factory_1 = require("./factories/@openzeppelin/contracts/access/Ownable__factory");
Object.defineProperty(exports, "Ownable__factory", { enumerable: true, get: function () { return Ownable__factory_1.Ownable__factory; } });
var IERC20__factory_1 = require("./factories/@openzeppelin/contracts/token/ERC20/IERC20__factory");
Object.defineProperty(exports, "IERC20__factory", { enumerable: true, get: function () { return IERC20__factory_1.IERC20__factory; } });
var ArbitrageBot__factory_1 = require("./factories/contracts/ArbitrageBot.sol/ArbitrageBot__factory");
Object.defineProperty(exports, "ArbitrageBot__factory", { enumerable: true, get: function () { return ArbitrageBot__factory_1.ArbitrageBot__factory; } });
var IUniswapV2Router__factory_1 = require("./factories/contracts/ArbitrageBot.sol/IUniswapV2Router__factory");
Object.defineProperty(exports, "IUniswapV2Router__factory", { enumerable: true, get: function () { return IUniswapV2Router__factory_1.IUniswapV2Router__factory; } });
