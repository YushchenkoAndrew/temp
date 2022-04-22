const P = [0.66, 0.04, 0.55, 0.63, 0.86, 0.58];
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
  P.reduce((acc, curr, i) => acc * (path.includes(i) ? curr : 1 - curr), 1)
);
console.log(temp);

console.log(temp.reduce((acc, curr) => acc + curr, 0));
