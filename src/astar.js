
function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function nodeIsEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

function findNode(nodeList, node) {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeIsEqual(node, nodeList[i])) {
      return node;
    }
  }
}

function convertMaze(maze) {
  return maze.map((row, y) => {
    return row.map((isWall, x) => {
      return {
        x,
        y,
        isWall
      };
    });
  });
}

function getNeighbours(map, node) {
  const neighbours = [];
  // Above
  if (map[node.y - 1][node.x]) {
    neighbours.push(map[node.y - 1][node.x]);
  }
  // Below
  if (map[node.y + 1][node.x]) {
    neighbours.push(map[node.y + 1][node.x]);
  }
  // Right
  if (map[node.y][node.x - 1]) {
    neighbours.push(map[node.y][node.x - 1]);
  }
  // Right
  if (map[node.y][node.x + 1]) {
    neighbours.push(map[node.y][node.x + 1]);
  }

  return neighbours;
}

export default function(maze, start, goal) {
  // Initialize the lists
  maze = convertMaze(maze);
  const open = [];
  const closed = [];
  open.push(start);

  while (open.length) {
    // Find the lowest open node and assign it to current
    let currentIndex = 0;
    for (let i = 0; i < open.length; i++) {
      if (open[i].f < open[currentIndex].f) {
        currentIndex = i;
      }
    }
    let current = open[currentIndex];

    // If we have reached the goal backtrack and return reversed path
    if (nodeIsEqual(current, goal)) {
      const path = [];
      let curr = current;
      while (curr.parent) {
        path.push(curr);
        curr = curr.parent;
      }
      return path.reverse();
    }

    // Put current node in closed list
    open.splice(currentIndex, 1);
    closed.push(current);

    let neighbours = getNeighbours(maze, current);
    let gScore = current.g + 1;

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      let isClosed = findNode(closed, neighbour);
      if (neighbour.isWall || isClosed) {
        continue;
      }

      let gScoreIsBest = false;

      if (!findNode(open, neighbour)) {
        gScoreIsBest = true;
        neighbour.h = heuristic(neighbour, goal);
        open.push(neighbour);
      }
      if (gScore < neighbour.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbour.parent = current;
        neighbour.g = gScore;
        neighbour.f = neighbour.g + neighbour.h;
      }
    }
  }
  return [];
}