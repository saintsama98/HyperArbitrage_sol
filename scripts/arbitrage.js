require("dotenv").config();
const { ethers } = require("ethers");

async function main() {
  console.log("Ethers object:", ethers);
  console.log("Ethers utils object:", ethers.utils);
  console.log("parseUnits method:", ethers.utils?.parseUnits);

  // Create a provider using ethers.js
  const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contractAddress = process.env.CONTRACT_ADDRESS;
  const ArbitrageBotABI = require("../artifacts/contracts/ArbitrageBot.sol/ArbitrageBot.json").abi; // Load ABI
  const bot = new ethers.Contract(contractAddress, ArbitrageBotABI, wallet);

  console.log("Connected to contract at:", contractAddress);

  // Example: Request a flash loan
  const token = "0xTokenAddress"; // Replace with token address
  const amount = ethers.utils.parseUnits("1000", 18); // Correctly access parseUnits
  const params = ethers.utils.defaultAbiCoder.encode(
    ["address", "address", "address", "address", "uint", "uint"],
    ["0xTokenA", "0xTokenB", "0xUniswapRouter", "0xSushiSwapRouter", 1, 1]
  );

  const tx = await bot.requestFlashLoan(token, amount, params);
  console.log("Flash loan requested:", tx.hash);

  await tx.wait();
  console.log("Transaction confirmed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});