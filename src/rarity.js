export const roll = (base) => {
  // working bases are 2 / 10 / 16 / 99 / 255
  let a = Math.floor((Math.random() * (base + 2)) / 2);
  let b = Math.floor((Math.random() * (base + 2)) / 2);
  a += 1;
  b += 1;
  let c = a + b - 2;

  if (c === base) {
    if (Math.floor(Math.random() * 2) > 1) {
      c = base - 1;
      // console.log("bounds // ", c, " // base // ", base);
    } else {
      c = 0;
      // console.log("bounds // ", c, " // base // ", base);
    }
  } // else console.log("roll // ", c, " // base // ", base);
  return c;
};
// working bases are 2 / 10 / 16 / 99 / 255
export const makeId = (base, len) => {
  let arr = [];
  let str = "";
  for (let i = 1; i <= len; i++) {
    arr[i] = roll(base[i - 1]);
    str += arr[i].toString(16);
    // console.log(arr[i].toString(16));
  }
  // console.log(len + " character code", str);
  return str;
};

export const doCollection = (base, len, amnt) => {
  let arr = [];
  for (let i = 0; i < amnt; i++) {
    arr[i] = makeId(base, len, amnt);
    for (let j = 0; j < i; j++) {
      if (arr[j] == arr[i]) {
        console.log("match");
        i--;
      }
    }
  }
  return arr;
};
// const list = doCollection([16, 16, 16, 16, 8, 8, 8, 8, 2, 2, 2, 2], 12, 500);

// console.log(list.sort());
export const showRarity = (base, len, amnt, list) => {};
