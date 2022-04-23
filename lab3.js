const K = 2;
const K2 = 2;
const TIME = 1473;
const p = [0.66, 0.04, 0.55, 0.63, 0.86, 0.58];

const P = 0.18011335439999995;
const Q = 1 - 0.18011335439999995;
const T = -TIME / Math.log(P);

const fact = (i) => (i ? fact(i - 1) * i : 1);
const Qr = (1 / fact(K + 1)) * Q;
const Pr = 1 - (1 / fact(K + 1)) * Q;
const Tr = -TIME / Math.log(Pr);

console.log({ P, Q, T, Pr, Qr, Tr });

const Gq = Qr / Q;
const Gp = Pr / P;
const Gt = Tr / T;

console.log({ Gp, Gq, Gt });

const tmp = p.map((item) => 1 - Math.pow(1 - item, K2 + 1));
console.log(tmp);
console.log(tmp.map((item) => 1 - item));

const E = [
  //  1  2  3  4  5  6  -
  [0, 1, 1, 0, 0, 0, 0, 0], // start
  [0, 0, 0, 1, 1, 1, 0, 0], // 1
  [0, 0, 0, 1, 1, 0, 1, 0], // 2
  [0, 0, 0, 0, 1, 1, 1, 0], // 3
  [0, 0, 0, 0, 0, 1, 1, 0], // 4
  [0, 0, 0, 0, 0, 0, 0, 1], // 5
  [0, 0, 0, 0, 0, 0, 0, 1], // 6
  [0, 0, 0, 0, 0, 0, 0, 0], // end
];

function DFS(path, paths = []) {
  const index = path.slice(-1)[0];
  if (index == E[index].length - 1) return [...paths, path];

  for (let i = 0; i < E[index].length; i++) {
    if (!E[index][i]) continue;

    paths = DFS([...path, i], paths);
  }

  return paths;
}

const paths = DFS([0]).map((item) => item.slice(1, -1));
console.log(
  paths.map((path) =>
    path.reduce((acc, curr) => (acc ? acc + " -> " : "") + "E" + curr, "")
  )
);

const temp = paths.map((path) =>
  tmp.reduce((acc, curr, i) => acc * (path.includes(i) ? curr : 1 - curr), 1)
);

const _p = temp.reduce((acc, curr) => acc + curr, 0);
console.log({ p: _p, q: 1 - _p, t: -TIME / Math.log(_p) });

console.log({ Gp: _p / P, Gq: (1 - _p) / Q, Gt: -TIME / Math.log(_p) / T });
