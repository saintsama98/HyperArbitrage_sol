"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = __importDefault(require("hardhat"));
const { ethers, network } = hardhat_1.default;
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying MinimalOwnable with:", deployer.address);
    console.log("Network:", network.name);
    const Minimal = await ethers.getContractFactory("MinimalOwnable");
    const contract = await Minimal.deploy({
        maxFeePerGas: ethers.parseUnits("100", "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
    });
    await contract.deploymentTransaction()?.wait();
    console.log("MinimalOwnable deployed at:", contract.target);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
