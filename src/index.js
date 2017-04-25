import './styles/main.scss';

import Maze from './maze';
import Astar from './astar';

const canvas = document.getElementById('canvas');
canvas.addEventListener('click', generate);
const ctx = canvas.getContext('2d');

const mazeSize = 101;

let maze, path;

generate();

window.addEventListener('resize', draw);

function generate() {
  maze = Maze(mazeSize, mazeSize);
  path = Astar(maze, {x: 1, y: 1}, {x: mazeSize - 2, y: mazeSize - 2});

  draw();
}

function draw() {
  canvas.width = 500 > window.innerWidth ? window.innerWidth : 500;
  canvas.height = 500 > window.innerHeight ? window.innerHeight : 500;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let tileSize = canvas.width > canvas.height ? canvas.height / mazeSize : canvas.width / mazeSize;
  maze.forEach((row, y) => {
    row.forEach((isWall, x) => {
      if (isWall) {
        ctx.fillStyle = '#000';
      } else {
        ctx.fillStyle = '#fff';
      }
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    });
  });
  ctx.fillStyle = 'purple';
  path.forEach(tile => {
    ctx.fillRect(tile.x * tileSize, tile.y * tileSize, tileSize, tileSize);
  });
}