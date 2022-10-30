const usdc = artifacts.require("USDC");
// 0 Fuji // 1 Avax // 2 Fantom Test // 3 Fantom Main // 4 Polygon Mumbai // 5 Polygon Main
module.exports = function (deployer) {
  const net = 4;
  if (net === 0 || net === 2 || net === 4) deployer.deploy(usdc);
};
