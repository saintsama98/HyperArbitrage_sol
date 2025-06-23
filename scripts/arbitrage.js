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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const ethers_1 = require("ethers");
const fs = __importStar(require("fs"));
const UNISWAP_ROUTER_ABI = [
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
];
// Example token/router addresses (real Sepolia testnet addresses)
const TOKEN_A = "0xdd13E55209Fd76AfE204dBda4007C227904f0a81"; // WETH (Sepolia)
const TOKEN_B = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"; // DAI (Polygon DAI, for example)
const ROUTER1 = "0x2D99ABD9008Dc933ff5c0CD271B88309593aB921"; // Sushiswap/UniswapV2 Router (Sepolia)
const ROUTER2 = "0x2D99ABD9008Dc933ff5c0CD271B88309593aB921"; // Same for both, or use another if available
const provider = new ethers_1.ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || "");
async function getAmountOut(routerAddress, amountIn, path) {
    const router = new ethers_1.ethers.Contract(routerAddress, UNISWAP_ROUTER_ABI, provider);
    const amounts = await router.getAmountsOut(amountIn, path);
    return amounts[amounts.length - 1];
}
async function main() {
    // Load deployment info
    const deployment = JSON.parse(fs.readFileSync("deployedAddress.json", "utf-8"));
    const contractAddress = deployment.address;
    const abiPath = deployment.abiPath;
    const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8")).abi;
    // Create a provider using Hardhat's ethers
    const wallet = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // Connect to deployed contract
    const bot = new ethers_1.ethers.Contract(contractAddress, abi, wallet);
    console.log("Connected to contract at:", contractAddress);
    // 1. Set amount to borrow (e.g., 1 WETH)
    const amountIn = ethers_1.ethers.parseUnits("1", 18); // Adjust decimals for TOKEN_A
    // 2. Simulate swap on Router1: TOKEN_A -> TOKEN_B
    const out1 = await getAmountOut(ROUTER1, amountIn, [TOKEN_A, TOKEN_B]);
    // 3. Simulate swap on Router2: TOKEN_B -> TOKEN_A
    const out2 = await getAmountOut(ROUTER2, out1, [TOKEN_B, TOKEN_A]);
    // 4. Estimate gas cost (rough estimate, can be improved)
    const gasPrice = BigInt(await provider.send("eth_gasPrice", []));
    const gasLimit = 800000n; // Adjust as needed
    const gasCost = gasPrice * gasLimit;
    // 5. Calculate profit
    const profit = out2 - amountIn - gasCost;
    console.log(`Simulated profit: ${ethers_1.ethers.formatUnits(profit, 18)} TOKEN_A`);
    if (profit > 0n) {
        // Prepare ArbitrageParams
        const ArbitrageParams = {
            tokenA: TOKEN_A,
            tokenB: TOKEN_B,
            router1: ROUTER1,
            router2: ROUTER2,
            amountOutMin1: out1 * 99n / 100n, // 1% slippage
            amountOutMin2: out2 * 99n / 100n, // 1% slippage
        };
        const params = ethers_1.ethers.AbiCoder.defaultAbiCoder().encode([
            "tuple(address tokenA, address tokenB, address router1, address router2, uint256 amountOutMin1, uint256 amountOutMin2)"
        ], [Object.values(ArbitrageParams)]);
        // Call requestFlashLoan
        const tx = await bot.requestFlashLoan(TOKEN_A, amountIn, params);
        console.log("Arbitrage transaction sent:", tx.hash);
        await tx.wait();
        console.log("Arbitrage transaction confirmed.");
    }
    else {
        console.log("No profitable arbitrage opportunity found.");
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
