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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var hre = require("hardhat");
var _a = hre, ethers = _a.ethers, network = _a.network;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var deployer, providerAddress, code, Minimal, contract;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ethers.getSigners()];
                case 1:
                    deployer = (_b.sent())[0];
                    console.log("Deploying MinimalAaveReceiver with:", deployer.address);
                    console.log("Network:", network.name);
                    providerAddress = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb";
                    return [4 /*yield*/, ethers.provider.getCode(providerAddress)];
                case 2:
                    code = _b.sent();
                    console.log("Provider code size:", code.length, "(should be >2 for a contract)");
                    console.log("Provider code (first 32 bytes):", code.slice(0, 66));
                    return [4 /*yield*/, ethers.getContractFactory("MinimalAaveReceiver")];
                case 3:
                    Minimal = _b.sent();
                    return [4 /*yield*/, Minimal.deploy(providerAddress, {
                            maxFeePerGas: ethers.parseUnits("100", "gwei"),
                            maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
                        })];
                case 4:
                    contract = _b.sent();
                    return [4 /*yield*/, ((_a = contract.deploymentTransaction()) === null || _a === void 0 ? void 0 : _a.wait())];
                case 5:
                    _b.sent();
                    console.log("MinimalAaveReceiver deployed at:", contract.target);
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (error) {
    console.error(error);
    process.exitCode = 1;
});
