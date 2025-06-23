import hre from "hardhat";
import * as fs from "fs";
import * as path from "path";
const { ethers, network } = hre as any;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);
  console.log("Network:", network.name);

  const Bot = await ethers.getContractFactory("ArbitrageBot");

  // Deploy and get the deployment transaction
  const contract = await Bot.deploy(
    "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb",
    {
      maxFeePerGas: ethers.parseUnits("100", "gwei"),
      maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
    }
  );
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
