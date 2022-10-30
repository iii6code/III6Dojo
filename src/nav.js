import { MoBtn, MobNav, stage } from "./elements";

export let a = 0;
export const showAdmin = async () => {
  console.log("// start admin");
  let ins;
  let time;
  const leave = () => {
    console.log("// leave called //");
    clearInterval(ins);
    fadeAdmin();
  };
  const stopTime = () => {
    console.log("// stop called //");
    clearTimeout(time);
    clearInterval(ins);
  };
  admin.addEventListener("mouseleave", stopTime);
  time = setTimeout(() => {
    admin.removeEventListener("mouseleave", stopTime);
    admin.addEventListener("mouseleave", leave);
    ins = setInterval(() => {
      if (a < 100) {
        a++;
        console.log("// a val // ", a);
        admin.style.opacity = a / 100;
      } else stopTime();
    }, 10);
  }, 5000);

  admin.removeEventListener("click", showAdmin);
  admin.addEventListener("click", fadeAdmin);
};

export const fadeAdmin = () => {
  console.log("// stop admin");
  const outs = setInterval(() => {
    if (a > 0) {
      a--;
      console.log("// stop // ", a);
      admin.style.opacity = a / 100;
    } else {
      clearInterval(outs);
      doAdmin();
    }
  }, 10);
  admin.removeEventListener("click", fadeAdmin);
  admin.addEventListener("click", showAdmin);
};
export let mob_toggle = true;
export const toggle = () => {
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
export const doAdmin = () => {
  console.log("// admin //");
  MobNav.style.display = "none";
  MoBtn.style.transform = "rotate(90deg)";
  stage.innerHTML = document.getElementById("adminTemp").innerHTML;
};
export const openLanding = () => {
  MobNav.style.display = "none";
  MoBtn.style.transform = "rotate(90deg)";
  stage.innerHTML = document.getElementById("landingTemp").innerHTML;
  console.log(mob_toggle);
};
export const openWallet = () => {
  toggle();
  stage.innerHTML = document.getElementById("walletTemp").innerHTML;
};
export const openApp = () => {
  toggle();
  stage.innerHTML = document.getElementById("appTemp").innerHTML;
};
export const openNet = () => {
  toggle();
  stage.innerHTML = document.getElementById("netTemp").innerHTML;
};
export const openAbout = () => {
  toggle();
  stage.innerHTML = document.getElementById("aboutTemp").innerHTML;
};
export const openService = () => {
  toggle();
  stage.innerHTML = document.getElementById("serviceTemp").innerHTML;
};
export const openTeam = () => {
  toggle();
  stage.innerHTML = document.getElementById("teamTemp").innerHTML;
};
export const openImprint = () => {
  toggle();
  stage.innerHTML = document.getElementById("imprintTemp").innerHTML;
};
export const openTerms = () => {
  toggle();
  stage.innerHTML = document.getElementById("termsTemp").innerHTML;
};
export const openContact = () => {
  toggle();
  stage.innerHTML = document.getElementById("contactTemp").innerHTML;
};
