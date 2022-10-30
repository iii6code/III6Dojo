const s0x = artifacts.require("s0xFactory");
const mlq = artifacts.require("MLQ");

module.exports = function (deployer) {
  const mode = 0;

  if (mode === 0) deployer.deploy(s0x, mlq.address);
};
