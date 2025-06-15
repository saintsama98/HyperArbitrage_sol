const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with:", deployer.address);

  const Bot = await ethers.getContractFactory("ArbitrageBot");

  // Replace with the actual Aave Pool Provider address for the Sepolia network
  const providerAddress = "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A";
  const bot = await Bot.deploy(providerAddress);

  console.log("Deployment transaction:", bot.deployTransaction);

  await bot.waitForDeployment();

  // Use the `target` property as the contract address
  const contractAddress = bot.target;

  if (!contractAddress) {
    console.error("Deployment failed: Contract address is undefined.");
    process.exit(1);
  }

  console.log("Bot deployed at:", contractAddress);

  // Save the contract address to the .env file
  fs.appendFileSync(".env", `CONTRACT_ADDRESS=${contractAddress}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
