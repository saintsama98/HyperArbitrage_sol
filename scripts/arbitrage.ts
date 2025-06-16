import * as dotenv from "dotenv";
dotenv.config();
import { ethers } from "hardhat"; // Use Hardhat's ethers

async function main() {
  console.log("Ethers object:", ethers);
  console.log("Ethers utils object:", ethers.utils);
  console.log("parseUnits method:", ethers.utils?.parseUnits);

  // Create a provider using Hardhat's ethers
  const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const contractAddress = process.env.CONTRACT_ADDRESS!;
  const ArbitrageBotABI = (await import("../artifacts/contracts/ArbitrageBot.sol/ArbitrageBot.json")).abi; // Load ABI
  const bot = new ethers.Contract(contractAddress, ArbitrageBotABI, wallet);

  console.log("Connected to contract at:", contractAddress);

  // Example: Request a flash loan
  const token = "0xTokenAddress"; // Replace with token address
  const amount = ethers.utils.parseUnits("1000", 18); // Use ethers.utils.parseUnits

  // Add your logic here
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
