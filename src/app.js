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
const Greenlist = require("../dist/contracts/Greenlist.json");
const FrootyCoolTingz = require("../dist/contracts/FrootyCoolTingz.json");
const Ice = require("../dist/contracts/ICE.json");
const Market = require("../dist/contracts/Market.json");
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

const bg = document.getElementById("bg_img");
const bodi = document.getElementById("bodi_img");
const bubble = document.getElementById("bubble_img");
const brow = document.getElementById("brow_img");
const eye = document.getElementById("eye_img");
const mouth = document.getElementById("mouth_img");
const msg = document.getElementById("msg");
const new_msg = document.getElementById("new_msg");
const set = document.getElementById("set");
const inf = document.getElementById("inf");
const slots = document.getElementById("slots");
const dias = document.getElementById("dias_canvas");
const uform = document.getElementById("uForm");
const about = document.getElementById("about");
const road = document.getElementById("road");
const mint = document.getElementById("mint");
const info = document.getElementById("info");
const community = document.getElementById("community");
const swap = document.getElementById("swap");
const social = document.getElementById("social");
const minty = document.getElementById("minty");
const glist = document.getElementById("glist");
const mintHead = document.getElementById("minthead");
const gCount = document.getElementById("gCount");
const pCount = document.getElementById("pCount");
const gMint = document.getElementById("greenmnt");
const gMintNow = document.getElementById("gMintNow");
const pMint = document.getElementById("pubmnt");
const pMintNow = document.getElementById("pMintNow");
const tCount = document.getElementById("tCount");
const btn = document.getElementById("btn");

// MAIN NAVIGATION LINKS

const goInfo = () => {
  shutAll();
  about.style.display = "block";
  road.style.display = "block";
};
info.addEventListener("click", goInfo);
const goMint = () => {
  shutAll();
  mint.style.display = "grid";
};
minty.addEventListener("click", goMint);
const goGreen = () => {
  shutAll();
  dias.style.display = "grid";
  uform.style.display = "block";
};
glist.addEventListener("click", goGreen);
const goS0x = () => {
  shutAll();
  social.style.display = "grid";
};
community.addEventListener("click", goS0x);
const goSwap = () => {
  shutAll();
  market.style.display = "grid";
};
swap.addEventListener("click", goSwap);
const shutAll = () => {
  uform.style.display = "none";
  dias.style.display = "none";
  about.style.display = "none";
  road.style.display = "none";
  mint.style.display = "none";
};

// CONTRACT IMPORT
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
};
// CONTRACT VARS
// Greenlist
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

// GREENMINT DISPLAY
const setAdminMsg = async () => {
  const GL = await GreenListData();
  const NewMsg = await GL.setMsgAdmin(new_msg.value)
    .then((result) => {
      set.innerHTML = "ADMIN MESSIGE RESET";
      return result;
    })
    .catch((err) => {
      console.error(err);
      set.innerHTML = err.message.split(": ")[1];
    });
  NewMsg.wait().then((result) => {
    // console.log(result);
    set.innerHTML = "NU MESSIGE SET";
  });
};
const setNewMsg = async () => {
  const GL = await GreenListData();
  const NewMsg = await GL.setMsg(new_msg.value, { value: BigInt(1 * 1e14) })
    .then((result) => {
      set.innerHTML = "MESSIGE BEING SET";
      return result;
    })
    .catch((err) => {
      console.error(err.message.data);

      set.innerHTML = err.data.message.split(": ")[1];
    });
  NewMsg.wait().then((result) => {
    // console.log(result);
    set.innerHTML = "NU MESSIGE SET";
  });
};
let MSG;
const getMSG = async () => {
  const GL = await GreenListData();

  const MSGH = GL.showMsg()
    .then((result) => {
      // console.log(result);
      return result;
    })
    .catch((err) => {
      console.error(err.data.message);
    });

  // console.log(MSGH);
  return MSGH;
};
const draw = async () => {
  // console.log(rand, "bg :" + Math.floor(Number(String(rand)[0])), "body :" + Math.floor(Number(String(rand)[1]) / 2), "bubble :" + Math.floor(Number(String(rand)[2]) / 3), "eye :" + String(rand)[3], "mouth :" + String(rand)[4]);
  bg.src = url + "bg/" + Math.floor(Number(String(rand)[0])) + ".png";
  bodi.src = url + "body/" + Math.floor(Number(String(rand)[1])) + ".png";
  // body.src = url+"body/"+4+".png";
  bubble.src = url + "bubble/" + Math.floor(Number(String(rand)[2]) / 2) + ".png";
  brow.src = url + "brow/" + Math.floor(Number(String(rand)[3])) + ".png";
  eye.src = url + "eye/" + Math.floor(Number(String(rand)[4])) + ".png";
  let go;
  if (String(rand)[5] + String(rand)[0] == undefined) go = "0" + String(rand)[0];
  else go = Math.floor(Number(String(rand)[5]));
  mouth.src = url + "mouth/" + go + ".png";
  msg.innerHTML = "U CAN EDIT DIS MESSIGE !";
  // // console.log(accounts[0]);
  if (typeof accounts[0] !== "undefined" || accounts[0] !== null) msg.innerHTML = await getMSG();
  const l = msg.innerHTML.length;
  // // console.log(l);
  if (l <= 12) msg.style.fontSize = "3em";
  else if (l <= 32) msg.style.fontSize = "2em";
  else if (l <= 45) msg.style.fontSize = "1.2em";
  else msg.style.fontSize = "1em";
};

draw();

const setSlot = async () => {
  slots.innerHTML = glSlotMax - glSlotsTaken;

  gCount.innerHTML = fctSlotMax - fctSlotsMinted; // Testnet
  // gCount.innerHTML = slozMax - slozNum; // Mainnet
  pCount.innerHTML = fctMax - fctMinted + fctSlotsMinted; // Testnet
  // pCount.innerHTML = 4321 - minted; // mainnet
  tCount.innerHTML = fctMax - fctMinted + fctSlotsMinted;
};
const getStamp = async () => {
  const GL = await GreenListData();
  const stamp = await GL.stamp().then((result) => {
    // console.log(result);
    return Number(result._hex);
  });
  // console.log(Math.floor((1000 * (stamp + 60 * 60) - Number(String(Date.now()))) / (60 * 1000)));
  if (1000 * (stamp + 60 * 60) >= Number(Date.now())) {
    set.innerHTML = "U NIED 2 W8 " + Math.floor((1000 * (stamp + 60 * 60) - Number(String(Date.now()))) / (60 * 1000)) + " MIN UNTIL THE NEXT UPDATE !";
    set.removeEventListener("click", setNewMsg);
  } else set.addEventListener("click", setNewMsg);
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
const goGreenMint = async (e) => {
  e.preventDefault();
  const count = await FCT.minted()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
  const diasTemp = await fetch("./json/dias_base.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });

  let diasID = diasTemp.diasIds[fctMinted];
  let diasOBJ = diasTemp.diasObject;
  diasOBJ.image = "./images/ad.png";
  diasOBJ.id = fctMinted;
  diasOBJ.diasId = diasID;
  diasOBJ.diasName = (diasOBJ.colors[Number(String(diasID).slice(0, 2))] + " " + diasOBJ.attitudes[Number(String(diasID).slice(2, 4))] + " " + diasOBJ.animals[Number(String(diasID).slice(4, 6))]).toLowerCase();
  diasOBJ.traits.background = Number(String(diasID).slice(0, 1));
  diasOBJ.traits.workspace = Number(String(diasID).slice(0, 1));
  diasOBJ.traits.body = Number(String(diasID).slice(1, 2));
  diasOBJ.traits.mouth = Number(String(diasID).slice(2, 3));
  diasOBJ.traits.brows = Number(String(diasID).slice(3, 4));
  diasOBJ.traits.eye = Number(String(diasID).slice(4, 5));
  diasOBJ.traits.brows = Number(String(diasID).slice(5, 6));
  diasOBJ.traits.fly = 0;
  diasOBJ.traits.ice = 0;
  console.log(diasOBJ.diasName, diasOBJ.traits, diasID);
  const doGreenMint = await FCT.greenMint([diasID], [diasOBJ])
    .then((result) => {
      gMintNow.innerHTML = "MINTING";
      return result;
    })
    .catch((err) => {
      console.error(err);
      gMintNow.innerHTML = err.data.message.split(": ")[1];
    });
  doGreenMint.wait().then((result) => {
    gMintNow.innerHTML = "MINTED";
    setSlot();
    return result;
  });
};
const goPubMint = async (e) => {
  e.preventDefault();
  const count = await FCT.minted()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
  const diasTemp = await fetch("./json/dias_base.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    });
  const minted = await FCT.minted().then((result) => {
    return Number(result._hex);
  });
  let diasID = diasTemp.diasIds[fctMinted];
  let diasOBJ = diasTemp.diasObject;
  diasOBJ.image = "./images/ad.png";
  diasOBJ.id = fctMinted;
  diasOBJ.diasId = diasID;
  diasOBJ.diasName = (diasOBJ.colors[Number(String(diasID).slice(0, 2))] + " " + diasOBJ.attitudes[Number(String(diasID).slice(2, 4))] + " " + diasOBJ.animals[Number(String(diasID).slice(4, 6))]).toLowerCase();
  const bgNum = Number(String(diasID).slice(0, 1));
  const wsNum = Number(String(diasID).slice(1, 2));
  diasOBJ.traits.background = bgNum === 0 ? "bamboo" : bgNum === 1 ? "mint" : bgNum === 2 ? "lemon" : bgNum === 3 ? "sun" : bgNum === 4 ? "mango" : bgNum === 5 ? "pink" : bgNum === 6 ? "berry" : bgNum === 7 ? "violet" : bgNum === 8 ? "turquoise" : bgNum === 9 ? "cyan" : "bamboo";
  diasOBJ.traits.workspace = wsNum === 0 ? "city" : wsNum === 1 ? "mountains" : wsNum === 2 ? "forest" : wsNum === 3 ? "castle" : wsNum === 4 ? "island" : wsNum === 5 ? "temple" : wsNum === 6 ? "pyramid" : wsNum === 7 ? "" : wsNum === 8 ? "" : wsNum === 9 ? "" : "city";
  diasOBJ.traits.body = Number(String(diasID).slice(2, 3));
  diasOBJ.traits.mouth = Number(String(diasID).slice(3, 4));
  diasOBJ.traits.brows = Number(String(diasID).slice(4, 5));
  diasOBJ.traits.eye = Number(String(diasID).slice(5, 6));
  diasOBJ.traits.brows = Number(String(diasID).slice(6, 7));
  diasOBJ.traits.bubble = Number(String(diasID).slice(7, 8));
  diasOBJ.traits.fly = 0;
  diasOBJ.traits.ice = 0;
  diasOBJ.layers[0].data.filename = "bg/" + bgNum + ".png";
  diasOBJ.layers[1].data.filename = "ws/" + Number(String(diasID).slice(1, 2)) + ".png";
  diasOBJ.layers[2].data.filename = "body/" + Number(String(diasID).slice(2, 3)) + ".png";
  diasOBJ.layers[3].data.filename = "mouth/" + Number(String(diasID).slice(3, 4)) + ".png";
  diasOBJ.layers[4].data.filename = "brows/" + Number(String(diasID).slice(4, 5)) + ".png";
  diasOBJ.layers[5].data.filename = "eye/" + Number(String(diasID).slice(5, 6)) + ".png";
  diasOBJ.layers[6].data.filename = "brows/" + Number(String(diasID).slice(6, 7)) + ".png";
  diasOBJ.layers[7].data.filename = "bubble/" + Number(String(diasID).slice(7, 8)) + ".png";
  diasOBJ.layers[8].data.filename = "ice/0.png";
  diasOBJ.layers[9].data.filename = "fly/0.png";
  console.log(diasOBJ.diasName, diasOBJ.traits, diasID);
  const doPubMint = await FCT.mint(1, [diasID], [diasOBJ], { value: BigInt(5 * 1e14) })
    .then((result) => {
      pMintNow.innerHTML = "MINTING";
      return result;
    })
    .catch((err) => {
      console.error(err);
      pMintNow.innerHTML = err.data.message.split(": ")[1];
    });
  doPubMint.wait().then((result) => {
    pMintNow.innerHTML = "MINTED";
    setSlot();
    return result;
  });
};
const goSetFCT = async () => {
  const GL = await GreenListData();
  let a;
  if (Number(network) === 9000) a = 1;
  if (Number(network) === 9001) a = 2;
  if (Number(network) === 80001) a = 0;
  if (Number(network) === 137) a = 3;
  const deploymentKey = await Object.keys(FrootyCoolTingz.networks)[a];
  const setFCT = await GL.setFCT(FrootyCoolTingz.networks[deploymentKey].address)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
  setFCT.wait().then((result) => {});
  alert(`THE FROOT CONTRACT HAS BEEN SET TO ${FrootyCoolTingz.networks[deploymentKey].address}`);
};
const onClickConnect = async (e) => {
  e.preventDefault();
  try {
    // set label for profile button
    // console.log("connecting");
    btn.innerHTML = "LO DING ...";
    // set eventlistener for profile button

    // get wallet address and account data of client and store in main state accounts
    accounts = await ethereum.request({ method: "eth_requestAccounts" });
    // get network data
    network = await ethereum.request({ method: "net_version" });
    var networkTag = "Switch Network";
    // evaluate legal networks
    if (Number(network) !== 137 && Number(network) !== 80001 && Number(network) !== 9001 && Number(network) !== 9000) {
      // prompt network switch to evmos main
      goEvmos(e);
    } else {
      // console.log(networkTag);
      set.style.display = "block";
      btn.removeEventListener("click", onClickConnect);
      btn.innerHTML = "GWAB GREENLIZ SLOZ NOW";
      btn.addEventListener("click", goGreenList);

      await getGreenVars();
      await getIceVars();
      await getFrootVars();
      await getMarketVars();
      let a;

      if (Number(network) === 80001) a = 0;
      if (Number(network) === 9000) a = 1;
      if (Number(network) === 9001) a = 2;
      if (Number(network) === 137) a = 3;
      const deploymentKey = await Object.keys(FrootyCoolTingz.networks)[a];
      console.log(Number(FrootyCoolTingz.networks[deploymentKey].address), Number(glFctAdr));
      if (Number(FrootyCoolTingz.networks[deploymentKey].address) !== Number(glFctAdr)) {
        // console.log(fctAdr);
        goSetFCT();
      }
      console.log(fctStart);
      if (fctMax > 0) {
        mintHead.innerHTML = "<h2>MINT IS LIVE NOW !</h2>";
        gMint.addEventListener("click", goGreenMint);
        pMint.addEventListener("click", goPubMint);
      } else {
        mintHead.innerHTML = `<h2>MINT GO'S LIVE AFTER<br/> ${fctMax - fctMinted} MORE GREENLIST !</h2>`; // Testnet
        // else mintHead.innerHTML = `<h2>MINT GO'S LIVE AFTER<br/> ${1234 - mintState} MORE GREENLIST !</h2>`; // Mainnet

        gMint.removeEventListener("click", goGreenMint);
        pMint.removeEventListener("click", goPubMint);
        // minty.disabled = true;
      }

      setSlot();
      if (Number(await GL.admin()) === Number(accounts[0])) {
        // set.removeEventListener("click", setNewMsg);
        set.addEventListener("click", setAdminMsg);
        // getStamp();
        // console.log("admin");
      } else {
        // set.removeEventListener("click", setAdminMsg);
        set.addEventListener("click", setNewMsg);
        getStamp();
        // console.log("user", set.innerHTML);
      }
      new_msg.style.display = "block";
      inf.style.display = "block";
    }
  } catch (error) {
    console.error("connect error", error);
    btn.innerText = "CONNEC";
  }
};

const goGreenList = async () => {
  const GL = await GreenListData();

  const GLme = await GL.getListed()
    .then((result) => {
      // console.log(result);
      btn.removeEventListener("click", goGreenList);
      btn.innerHTML = "PLEAZ WAIT 4 TX 2 FINNISH";
      return result;
    })
    .catch((err) => {
      console.error(err.message);
      btn.innerHTML = err.data.message.split(": ")[1];
      btn.removeEventListener("click", goGreenList);
    });
  GLme.wait().then((load) => {
    // console.log(load);
    btn.innerHTML = "WOWZERS ... UR ON DA GREENLIZ NOW";
    btn.style.background = "white";
    btn.style.color = "mediumseagreen";
    setSlot();
  });
};

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
    } else {
      //If it is installed we change our button text
      btn.innerText = "connec";
      btn.addEventListener("click", onClickConnect);
    }
  };
  MetaMaskClientCheck();
};
// IMPRTANT INITIAL FUNCTION CALL
set.style.display = "none";
new_msg.style.display = "none";
web3init();
// IMPORTANT FUNCTION WEB3INIT DO NOT EDIT END //
