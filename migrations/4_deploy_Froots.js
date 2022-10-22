const Greenlist = artifacts.require("Greenlist");
const ICE = artifacts.require("ICE");
const FCT = artifacts.require("FrootyCoolTingz");
module.exports = function (deployer) {
  deployer.deploy(FCT, ICE.address, Greenlist.address);
};
