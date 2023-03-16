const pc = artifacts.require("iii6Utils/Oracles/iii6PriceConsumer");
const vrfEth = artifacts.require("iii6Utils/Oracles/iii6VRFEth");
const vrfGoerli = artifacts.require("iii6Utils/Oracles/iii6VRFGoerli");
const vrfMatic = artifacts.require("iii6Utils/Oracles/iii6VRFMatic");
const vrfMumbai = artifacts.require("iii6Utils/Oracles/iii6VRFMumbai");
const vrfAvax = artifacts.require("iii6Utils/Oracles/iii6VRFAvax");
const vrfFuji = artifacts.require("iii6Utils/Oracles/iii6VRFFuji");
const vrfFantom = artifacts.require("iii6Utils/Oracles/iii6VRFFantom");
const vrfFtmTest = artifacts.require("iii6Utils/Oracles/iii6VRFFantomTest");
const vrfBsc = artifacts.require("iii6Utils/Oracles/iii6VRFBsc");
const vrfChalen = artifacts.require("iii6Utils/Oracles/iii6VRFChalen");
/**
 * net function returns the networkID and logs the id to the console
 * @returns netID the network id
 */
const net = async () => {
  const netID = await web3.eth.net.getId();
  console.log(netID);
  return netID;
};

module.exports = function (deployer) {
  deployer.deploy(pc);
  const netID = net();
  /**
   * @dev create a chainlink vrf subscription and fund it with link on https://vrf.chain.link
   * make sure to have the network settings correct for your chosen network
   * you have to verify the contracts back and forth therefor you need to add your sub_id
   * @dev deployer.deploy(vrfNetwork, <SUBSCRIPTION_ID>);
   * and inside the subscription panel you need to add the deployed contract address as a consumer
   * @link https://vrf.chain.link
   */
  if (netID == 1) deployer.deploy(vrfEth, 0);
  if (netID == 5) deployer.deploy(vrfGoerli, 7331);
  if (netID == 137) deployer.deploy(vrfMatic, 490);
  if (netID == 80001) deployer.deploy(vrfMumbai, 2022);
  if (netID == 43114) deployer.deploy(vrfAvax, 0);
  if (netID == 43113) deployer.deploy(vrfFuji, 423);
  if (netID == 250) deployer.deploy(vrfFantom, 49);
  if (netID == 4002) deployer.deploy(vrfFtmTest, 137);
  if (netID == 56) deployer.deploy(vrfBsc, 0); // just blanks
  if (netID == 97) deployer.deploy(vrfChalen, 2267);
};
