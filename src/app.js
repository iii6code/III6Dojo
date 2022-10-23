//////////////////////////////////////////
//                                      //
//          MAIN CONTRACT               //
//          III6 LifeAnd.Eth            //
//          stereoIII6                  //
//          stereodocbush@gmail.com     //
//                                      //
//////////////////////////////////////////

import { ethers } from "ethers";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import "../public/app.scss";
import { sha256 } from "crypto-hash";
import UAuth from "@uauth/js";
import { create } from "underscore";
import { stripZeros } from "ethers/lib/utils";
// globals
let accounts;
let network;
let user;

const client = require("ipfs-http-client");
const ipfs = client.create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

const provider = new ethers.providers.Web3Provider(window.ethereum);
if (!ethereum.isConnected()) {
  // alert("install https://metamask.io extension to browser");
}
let signer = provider.getSigner();
// const url = "https://gateway.pinata.cloud/ipfs/QmamRUaez9fyXpeuTuiKCNvrKSsLxid4hzyKKkJXSi67LL/";
const url = "./images/";
let rand = 1234567;
const goRand = () => {
  rand = Math.floor(Math.random() * 99999999);

  if (rand < 99999) rand *= 99;
  if (rand < 999999) rand *= 9;
  console.log(rand);
  draw();
};
const ids = [];
for (let i = 0; i < 5555; i++) {
  ids[i] = Math.floor(Math.random() * 9999999);
  for (let j = 0; j < i; j++) {
    while (ids[j] === ids[i]) ids[i] = Math.floor(Math.random() * 9999999);
  }
}
console.log("dias shuffle", JSON.stringify(ids));
// console.log("sorted", JSON.stringify(diasIds.sort()));
setInterval(goRand, 25000);

const logo = document.getElementById("logo");
const wallet = document.getElementById("wallet");
const btn = document.getElementById("connect");
const app = document.getElementById("app");
const net = document.getElementById("net");
const about = document.getElementById("about");
const service = document.getElementById("service");
const team = document.getElementById("team");
const mwallet = document.getElementById("mwallet");
const mbtn = document.getElementById("mconnect");
const mapp = document.getElementById("mapp");
const mnet = document.getElementById("mnet");
const mabout = document.getElementById("mabout");
const mservice = document.getElementById("mservice");
const mteam = document.getElementById("mteam");
const MoBtn = document.getElementById("mobbtn");
const MobNav = document.getElementById("mobnav");
const closeMob = document.getElementById("closemob");
const stage = document.getElementById("stage");

let mob_toggle = true;
const toggle = () => {
  mob_toggle = !mob_toggle;
  if (mob_toggle == false) {
    MobNav.style.display = "grid";
    MoBtn.style.transform = "rotate(0deg)";
  } else {
    MobNav.style.display = "none";
    MoBtn.style.transform = "rotate(90deg)";
  }
  console.log(mob_toggle);
};
const openLanding = () => {
  MobNav.style.display = "none";
  MoBtn.style.transform = "rotate(90deg)";
  stage.innerHTML = document.getElementById("landingTemp").innerHTML;
  console.log(mob_toggle);
};
const openWallet = () => {
  toggle();
  stage.innerHTML = document.getElementById("walletTemp").innerHTML;
};
const openApp = () => {
  toggle();
  stage.innerHTML = document.getElementById("appTemp").innerHTML;
};
const openNet = () => {
  toggle();
  stage.innerHTML = document.getElementById("netTemp").innerHTML;
};
const openAbout = () => {
  toggle();
  stage.innerHTML = document.getElementById("aboutTemp").innerHTML;
};
const openService = () => {
  toggle();
  stage.innerHTML = document.getElementById("serviceTemp").innerHTML;
};
const openTeam = () => {
  toggle();
  stage.innerHTML = document.getElementById("teamTemp").innerHTML;
};

const onClickConnect = () => {};
const draw = () => {};
MoBtn.addEventListener("click", toggle);
closeMob.addEventListener("click", toggle);
wallet.addEventListener("click", openWallet);
app.addEventListener("click", openApp);
net.addEventListener("click", openNet);
about.addEventListener("click", openAbout);
service.addEventListener("click", openService);
team.addEventListener("click", openTeam);
mwallet.addEventListener("click", openWallet);
mapp.addEventListener("click", openApp);
mnet.addEventListener("click", openNet);
mabout.addEventListener("click", openAbout);
mservice.addEventListener("click", openService);
mteam.addEventListener("click", openTeam);
logo.addEventListener("click", openLanding);
// CONTRACT IMPORT
/*
const GreenListData = async () => {
  let a;
  if (Number(network) === 9000) a = 2;
  else if (Number(network) === 9001) a = 2;
  else if (Number(network) === 80001) a = 0;
  else if (Number(network) === 137) a = 1;
  const deploymentKey = await Object.keys(Greenlist.networks)[a];
  // console.log(deploymentKey, a, network);
  return new ethers.Contract(Greenlist.networks[deploymentKey].address, Greenlist.abi, signer);
};
const FrootyCoolTingsData = async () => {
  let a;
  if (Number(network) === 9000) a = 2;
  else if (Number(network) === 9001) a = 2;
  else if (Number(network) === 80001) a = 0;
  else if (Number(network) === 137) a = 1;
  const deploymentKey = await Object.keys(FrootyCoolTingz.networks)[a];
  // console.log(deploymentKey, a, network);
  return new ethers.Contract(FrootyCoolTingz.networks[deploymentKey].address, FrootyCoolTingz.abi, signer);
};
const IceData = async () => {
  let a;
  if (Number(network) === 9000) a = 2;
  else if (Number(network) === 9001) a = 2;
  else if (Number(network) === 80001) a = 0;
  else if (Number(network) === 137) a = 1;
  const deploymentKey = await Object.keys(Ice.networks)[a];
  // console.log(deploymentKey, a, network);
  return new ethers.Contract(Ice.networks[deploymentKey].address, Ice.abi, signer);
};
const MarketData = async () => {
  let a;
  if (Number(network) === 9000) a = 2;
  else if (Number(network) === 9001) a = 2;
  else if (Number(network) === 80001) a = 0;
  else if (Number(network) === 137) a = 1;
  const deploymentKey = await Object.keys(Market.networks)[a];
  // console.log(deploymentKey, a, network);
  return new ethers.Contract(Market.networks[deploymentKey].address, Market.abi, signer);
}; */
// CONTRACT VARS
// Greenlist
/*
let GL;
let glSlotMax;
let glSlotsTaken;
let glMsg;
let glStamp;
let glAdmin;
let glFctAdr;
const getGreenVars = async () => {
  GL = await GreenListData();
  glSlotMax = await GL.max()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  glSlotsTaken = await GL.l()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  glMsg = await GL.message()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  glStamp = await GL.stamp()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  glAdmin = await GL.admin();
  glFctAdr = await GL.FCT();
  return glSlotMax, glSlotsTaken, glMsg, glStamp;
};

// ICE
let ICE;
let icePrice;
const getIceVars = async () => {
  ICE = await IceData();
  icePrice = await ICE.price()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
};

// Froots
let FCT;
let fctPrice;
let fctMaxMints;
let fctMax;
let fctMinted;
let fctSlotMax;
let fctSlotsMinted;
let fctStart;
const getFrootVars = async () => {
  FCT = await FrootyCoolTingsData();
  fctPrice = await FCT.price()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  fctMaxMints = await FCT.num()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  fctMax = await FCT.max()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  fctMinted = await FCT.minted()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  fctSlotMax = await FCT.sloz()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  fctSlotsMinted = await FCT.slots()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  fctStart = await FCT.start()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
  // fctAdr = await FCT().address;
  return fctStart, fctMax, fctMinted;
};
// Market
let MRKT;
let marketRoy;
const getMarketVars = async () => {
  MRKT = await MarketData();
  marketRoy = await MRKT.roy()
    .then((result) => {
      return Number(result._hex);
    })
    .catch((err) => {
      console.error(err);
    });
};


const netSwap = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  accounts = await ethereum.request({ method: "eth_requestAccounts" });
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  network = await ethereum.request({ method: "net_version" });
  window.location.reload();
};
const goPoly = async () => {
  const change = await ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x89",
        chainName: "Polygon",
        nativeCurrency: {
          name: "Polygon",
          symbol: "MATIC",
          decimals: 18, //In number form
        },
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com"],
      },
    ],
  });
  netSwap();
};
const goEvmos = async () => {
  const change = await ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x2328",
        chainName: "EVMOS",
        nativeCurrency: {
          name: "EVMOS",
          symbol: "EVMOS",
          decimals: 18, //In number form
        },
        rpcUrls: ["https://eth.bd.evmos.dev:8545"],
        blockExplorerUrls: ["https://evm.evmos.dev/"],
      },
    ],
  });
  netSwap();
};
*/
/* IMPORTANT FUNCTION WEB3INIT DO NOT EDIT  //
//////////////////////////////////////////
//                                      //
//          Init Metamask               //
//                                      //
//////////////////////////////////////////


Function initializes dapp for Defi interaction

requirements :
- a button with id:'profile_btn'
- a button with id:'net_btn'
- a button with id: 'wallet_btn' 
- a div with class: 'stage' and id: 'profile_stage'

*/
const web3init = async () => {
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  const clickInstall = (e) => {
    e.preventDefault();

    alert("You are being redirected to the official download of Metamask.io ... Please Follow their installation instructions.");
    window.open("https://metamask.io");
  };
  const MetaMaskClientCheck = () => {
    console.log(isMetaMaskInstalled());
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      btn.innerText = "install metamask!";
      btn.addEventListener("click", clickInstall);
      mbtn.innerText = "install metamask!";
      mbtn.addEventListener("click", clickInstall);
    } else {
      //If it is installed we change our button text
      btn.innerText = "LOG";
      btn.addEventListener("click", onClickConnect);
      mbtn.innerText = "LOG";
      mbtn.addEventListener("click", onClickConnect);
    }
  };
  MetaMaskClientCheck();
};
// IMPRTANT INITIAL FUNCTION CALL
web3init();
// IMPORTANT FUNCTION WEB3INIT DO NOT EDIT END //
