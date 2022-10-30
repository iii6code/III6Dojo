const pc = artifacts.require("PriceConsumerV3");
const vrf = artifacts.require("VRFv2Consumer");
// 0 Fuji // 1 Avax // 2 Fantom Test // 3 Fantom Main // 4 Polygon Mumbai // 5 Polygon Main
module.exports = function (deployer) {
  const net = 4;
  let sub;
  if (net === 0) sub = 0;
  if (net === 1) sub = 0;
  if (net === 2) sub = 0;
  if (net === 3) sub = 0;
  if (net === 4) sub = 2022;
  if (net === 5) sub = 320;
  deployer.deploy(pc, net);
  deployer.deploy(vrf, sub);
};
