require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("ts-node/register");

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.8.21" }
    ]
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        // blockNumber: 19xxxxxx, // (optional) for deterministic state
      }
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
    localhost: {
      url: "http://127.0.0.1:8546", // Custom port for forked node
    }
  },
  mocha: {
    timeout: 20000 // Increase timeout for tests
  }
};
