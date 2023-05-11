let cube = [];
let cords = [
  [40, 40],
  [40, 100],
  [100, 100],
  [100, 40],
];
let dimX = 150;
let dimY = 150;
let rotationCenterCords = [70, 70];

function setup() {
  createCanvas(dimX * 10, dimY * 10);
  background(255);

  for (let i = 0; i < dimY; i++) {
    cube.push([]);
    for (let j = 0; j < dimX; j++) {
      cube[i].push(0);
    }
  }
  anim();
  
}

function draw() {
  background(255);
  for (let i = 0; i < dimY; i++) {
    for (let j = 0; j < dimX; j++) {
      if (cube[i][j] === 1) {
        fill(0);
        rect(j * 10, i * 10, 10, 10);
      } else if (cube[i][j] === 3) {
        fill(0255);
        rect(j * 10, i * 10, 10, 10);
      }else if (cube[i][j] === 4) {
        fill(255, 0, 0);
        rect(j * 10, i * 10, 10, 10);
      }else if (cube[i][j] === 5) {
        fill(0, 255, 0);
        rect(j * 10, i * 10, 10, 10);
      }else if (cube[i][j] === 6) {
        fill(0, 0, 255);
        rect(j * 10, i * 10, 10, 10);
      }
    }
  }
}

let slope = (c1, c2) => {
  let m = (c1[0] - c2[0]) / (c1[1] - c2[1] + 0.0001);
  let b = c1[0] - c1[1] * m;
  return [m, b];
};

const line = (c1, c2) => {
  let [m, b] = slope(c1, c2);
  let [y1, x1] = c1;
  let [y2, x2] = c2;
  if (m > 200 || m < -200) {
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      cube[i][x1] = 1;
    }
    console.log("ues");
  }
  for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
    for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
      if (
        j * m + b - 1 <= i &&
        j * m + b + 1 >= i
      ) {
        cube[i][j] = 1;
      }
    }
  }
};

const square = (matrix) => {
  console.log("matrix", matrix)
  matrix = matrix.map(i => i.map(j => Math.floor(j)))
  let [c1, c2, c3, c4] = matrix.sort((a, b) => a[0] - b[0]);
  
  line(c1, c2);
  line(c1, c3);
  line(c2, c4);
  line(c3, c4);
};
const fullCube = (matrix, displaceX, displaceY) => {
  let dispMatrix = matrix.map(i => [i[0]+displaceY, i[1]+displaceX])
  let lengthMatrix = dispMatrix.map(i => Math.sqrt(Math.pow(i[0]-rotationCenterCords[0], 2)+ Math.pow(i[1]-rotationCenterCords[1], 2)))
  let smallest = 1000000
  let index = false
  lengthMatrix.map((i, ind) => {
    if(i<smallest) {
      smallest = i
      index = ind
    }
  })
  console.log("len", lengthMatrix)
  console.log("disp", dispMatrix)
  console.log("index", index)
  let mainIndex = (index+2)%4
  
  console.log(mainIndex)
  cube = cube.map(i => i.map(j => 0))
  square(matrix)
  square([matrix[(mainIndex+3)%4], matrix[mainIndex], dispMatrix[(mainIndex+3)%4], dispMatrix[mainIndex]])
  square([matrix[(mainIndex+1)%4], matrix[mainIndex], dispMatrix[(mainIndex+1)%4], dispMatrix[mainIndex]])
  cube[Math.floor(matrix[0][0])][Math.floor(matrix[0][1])] = 3
  cube[Math.floor(matrix[1][0])][Math.floor(matrix[1][1])] = 4
  cube[Math.floor(matrix[2][0])][Math.floor(matrix[2][1])] = 5
  cube[Math.floor(matrix[3][0])][Math.floor(matrix[3][1])] = 6
  cube[rotationCenterCords[0]][rotationCenterCords[1]] = 1
  
}


const rotate = (matrix, deg, center) => {
  let rad = (deg * Math.PI) / 180;
  let newMatrix = matrix.map((i) => {
    let translatedPoint = [i[0] - center[0], i[1] - center[1]];
    return [
      center[0] + translatedPoint[0] * Math.cos(rad) - translatedPoint[1] * Math.sin(rad),
      center[1] + translatedPoint[0] * Math.sin(rad) + translatedPoint[1] * Math.cos(rad),
    ];
  });
  cords = newMatrix;
  fullCube(newMatrix, -5, 20);
};
  const anim = () => {
    setInterval(() => rotate(cords, -0.5, rotationCenterCords), 10);
  };
