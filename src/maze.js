// *
// * Get cells that are of given type that are two blocks away from given coordinates.
// *
function getFrontiers(map, x, y, type) {
  const frontiers = [];
  // Above
  if (isValidTile(map, x, y - 2, type)) {
    frontiers.push([x, y - 2]);
  }
  // Below
  if (isValidTile(map, x, y + 2, type)) {
    frontiers.push([x, y + 2]);
  }
  // Right
  if (isValidTile(map, x - 2, y, type)) {
    frontiers.push([x - 2, y]);
  }
  // Left
  if (isValidTile(map, x + 2, y, type)) {
    frontiers.push([x + 2, y]);
  }
  return frontiers;
}

// *
// * If tile is not out-of-bounds and is of correct type
// *
function isValidTile(map, x, y, type) {
  if (
    (x > 0 && y > 0) &&
    (x < map[0].length - 1 && y < map.length - 1) &&
    (map[y][x] === type)
  ) {
    return true;
  }
}

// *
// * Logs map to console
// *
function log(map) {
  console.log(map);
  let string = '';
  map.forEach(row => {
    row.forEach(isWall => {
      string += isWall ? '#' : ' ';
    });
    string += '\n';
  });
  console.log(string);
}

// *
// * Generate a maze with given height and width
// *
export default function(width, height) {
  // Initialize maze with only walls
  const maze = [];
  for (let y = 0; y < height; y++) {
    maze[y] = [];
    for (let x = 0; x < width; x++) {
      maze[y][x] = 1;
    }
  }

  // Starting coordinates
  let x = 1;
  let y = 1;
  maze[y][x] = 0;

  let frontiers = getFrontiers(maze, x, y, 1);

  while (frontiers.length) {
    // Remove random frontier from list
    const frontier = frontiers.splice(Math.ceil(Math.random() * (frontiers.length - 1)), 1)[0];

    // Get neighbours of the frontier and grab a random
    const neighbours = getFrontiers(maze, frontier[0], frontier[1], 0);
    const neighbour = neighbours[Math.ceil(Math.random() * (neighbours.length - 1))];

    // Get the direction
    const xDiff = neighbour[0] - frontier[0];
    const yDiff = neighbour[1] - frontier[1];

    // Carve the cell between the frontier and the neighbour
    if (xDiff === -2) {
      maze[neighbour[1]][neighbour[0] + 1] = 0;
    }
    if (xDiff === 2) {
      maze[neighbour[1]][neighbour[0] - 1] = 0;
    }
    if (yDiff === -2) {
      maze[neighbour[1] + 1][neighbour[0]] = 0;
    }
    if (yDiff === 2) {
      maze[neighbour[1] - 1][neighbour[0]] = 0;
    }

    // Carve the frontier cell
    maze[frontier[1]][frontier[0]] = 0;

    // Add the newly discovered frontiers
    frontiers = frontiers.concat(getFrontiers(maze, frontier[0], frontier[1], 1));
  }

  return maze;
}