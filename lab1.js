const data = [
  766, 137, 105, 124, 63, 356, 67, 113, 325, 10, 291, 271, 199, 90, 146, 461,
  48, 305, 150, 900, 640, 120, 23, 403, 36, 321, 102, 136, 451, 257, 55, 87,
  264, 135, 542, 425, 54, 148, 188, 387, 133, 193, 524, 161, 179, 558, 132, 139,
  74, 23, 71, 140, 131, 168, 159, 97, 31, 625, 34, 111, 452, 12, 26, 234, 543,
  252, 269, 10, 228, 143, 40, 120, 237, 171, 16, 221, 55, 99, 105, 192, 213,
  539, 7, 89, 452, 161, 478, 85, 443, 32, 162, 633, 249, 132, 283, 76, 548, 136,
  322, 107,
].sort((a, b) => a - b);
console.log(data);
const avg = data.reduce((acc, curr) => acc + curr, 0) / data.length;
console.log(avg);

const step = data.slice(-1)[0] / 10;
const range = Array.from(Array(10).keys()).map((i) => i * step);
console.log(range);

let f = [];
for (let i = 0; i < range.length; i++) {
  f.push(
    data.filter(
      (item) => item > range[i] && (!range[i + 1] || item <= range[i + 1])
    ).length /
      (data.length * step)
  );
}
console.log(f);

const p = f.map((item) => 1 - item * step);
console.log(p);

const d = (p[0] - 0.84) / (p[0] - 1);
console.log(d);
console.log(step - step * d);

let temp = range.map((item) => item + step).filter((item) => item < 511);
let index = temp.length;
const P511 =
  1 -
  (temp.slice(0, -1).reduce((acc, _, i) => acc + f[i] * step, 0) +
    f[index] * (511 - range[index]));
console.log("p511 = ", P511);
console.log(f[index] / P511);

temp = range.map((item) => item + step).filter((item) => item < 488);
index = temp.length;
const P488 =
  1 -
  (temp.slice(0, -1).reduce((acc, _, i) => acc + f[i] * step, 0) +
    f[index] * (488 - range[index]));

console.log("p488 = ", P488);
// console.log(f[index]);
// console.log(range.filter((item) => item + step < 511).slice(0, -1));
console.log(f[index] / P488);
