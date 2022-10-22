const Greenlist = artifacts.require("Greenlist");
module.exports = function (deployer) {
  deployer.deploy(Greenlist);
};
