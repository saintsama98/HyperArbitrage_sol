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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importDefault(require("hardhat"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const { ethers, network } = hardhat_1.default;
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with:", deployer.address);
    console.log("Network:", network.name);
    const Bot = await ethers.getContractFactory("ArbitrageBot");
    // Deploy and get the deployment transaction
    const contract = await Bot.deploy("0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb", {
        maxFeePerGas: ethers.parseUnits("100", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
    });
    const deploymentReceipt = await contract.deploymentTransaction()?.wait();
    // Transaction hash
    const txHash = contract.deploymentTransaction()?.hash;
    console.log("Deployment transaction hash:", txHash);
    // Contract address
    const contractAddress = contract.target;
    console.log("Contract deployed at:", contractAddress);
    // Save the contract address and ABI path for frontend use
    const output = {
        address: contractAddress,
        abiPath: path.resolve(__dirname, "../artifacts/contracts/ArbitrageBot.sol/ArbitrageBot.json"),
    };
    fs.writeFileSync("deployedAddress.json", JSON.stringify(output, null, 2));
    console.log("Deployment info saved to deployedAddress.json");
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
