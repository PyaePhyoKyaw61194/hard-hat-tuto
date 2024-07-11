require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    /*   hardhat:{
        accounts:[
          {
            privateKey: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
            balance: "100000000000000000000000"
          }
        ],
        chainId: 31337
      } */
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.SEPOILA_PRIVATE_KEY],
      chainId: 11155111,
    }
  }
};
