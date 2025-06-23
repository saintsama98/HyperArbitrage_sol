import * as hre from "hardhat";
const { ethers, network } = hre as any;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying MinimalAaveReceiver with:", deployer.address);
  console.log("Network:", network.name);

  // Debug: Check code size at PoolAddressesProvider
  const providerAddress = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb";
  const code = await ethers.provider.getCode(providerAddress);
  console.log("Provider code size:", code.length, "(should be >2 for a contract)");
  console.log("Provider code (first 32 bytes):", code.slice(0, 66));

  const Minimal = await ethers.getContractFactory("MinimalAaveReceiver");
  const contract = await Minimal.deploy(
    providerAddress,
    {
      maxFeePerGas: ethers.parseUnits("100", "gwei"),
      maxPriorityFeePerGas: ethers.parseUnits("2", "gwei"),
    }
  );
  await contract.deploymentTransaction()?.wait();
  console.log("MinimalAaveReceiver deployed at:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
