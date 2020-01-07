let grid = initGrid(12);

function initGrid(size) {
  const grid = [];
  for (let y=0; y < size; y++) {
    grid[y] = [];
    for (let x=0; x < size; x++) {
      grid[y][x] = Math.round(Math.random());
    }  
  }
  return grid;
}

function isAlive(x, y, grid) {
  if (checkBounds(x, y, grid) && grid[y][x] === 1) {  
      return true;    
  }
  else {
    return false;
  }
}

function liveOrDie(x, y, grid) {
  let livingNeighbours = 0;
  let livesOrDies;
  const currentCell = grid[y][x];
  
  for (let i = y - 1; i < y + 2; i++) {
    for (let j = x -1; j < x + 2; j++) {
      if (i !== y && j !== x && isAlive(j, i, grid)) {
        livingNeighbours++;
      }
    }  
  }

  if (currentCell === 0) {
    if (livingNeighbours === 3) {
      livesOrDies = true;
    }
    else {
      livesOrDies = false;
    }
  }

  if (currentCell === 1) {
    if (livingNeighbours < 2 || livingNeighbours >= 4) {
      livesOrDies = false;
    }
    else {
      livesOrDies = true;
    }
  }

  return livesOrDies;
}

function checkBounds(x, y, grid) {
  let result = true;

  if (
    x < 0 
    || x >= grid.length
    || y < 0
    || y >= grid.length) 
    {
      result = false;
    }

  return result;
}

function renderGrid(grid) {
  const results = []
  for (let y=0; y < grid.length; y++) {
    results[y] = [];
    for (let x=0; x < grid.length; x++) {
      results[y][x] = grid[y][x] ? "😎" : "🥶";
    }  
  }

  return results;
}

function generateNewGrid(grid) {
  const results = []

  for (let y=0; y < grid.length; y++) {
    results[y] = [];
    for (let x=0; x < grid.length; x++) {
      results[y][x] = liveOrDie(x,y,grid) ? 1 : 0;
    }  
  }

  return results;
}

function clearScreen() {
  // https://stackoverflow.com/questions/9006988/node-js-on-windows-how-to-clear-console
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
      console.log('\r\n');
  }
}

const newGrid = generateNewGrid(grid);



const playTheGame = setInterval(()=>{
  clearScreen();
  console.log(renderGrid(grid));
  grid = generateNewGrid(grid);  
}, 1000)