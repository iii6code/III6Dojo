const iii6AssetFactory = artifacts.require("iii6Utils/Assets/iii6AssetFactory");
const iii6CoinFactory = artifacts.require("iii6Utils/Assets/iii6CoinFactory");
// const iii6MarketFactory = artifacts.require("iii6Utils/Assets/iii6MarketFactory");
// const iii6PoolFactory = artifacts.require("iii6Utils/Assets/iii6PoolFactory");

module.exports = function (deployer) {
  deployer.deploy(iii6AssetFactory);
  deployer.deploy(iii6CoinFactory);
  // deployer.deploy(iii6MarketFactory);
  // deployer.deploy(iii6PoolFactory);
};
