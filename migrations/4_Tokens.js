const mlq = artifacts.require("MLQ");
const usdc = artifacts.require("USDC");
const pc = artifacts.require("PriceConsumerV3");
// 0 Fuji // 1 Avax // 2 Fantom Test // 3 Fantom Main // 4 Polygon Mumbai // 5 Polygon Main
module.exports = function (deployer) {
  const net = 4;
  deployer.deploy(mlq, usdc.address, pc.address, net);
};
