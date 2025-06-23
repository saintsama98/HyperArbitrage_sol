import hre from "hardhat";
const { ethers, network } = hre as any;

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
