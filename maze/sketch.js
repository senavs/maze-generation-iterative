const BOARD_DIM = 600;
const CELL_PER_ROW = 20;
const CELL_DIM = BOARD_DIM / CELL_PER_ROW;
const PADDING = 30;

let cells = [];
let currentCell;

let stack = [];

function setup() {
  createCanvas(BOARD_DIM + PADDING, BOARD_DIM + PADDING);
  
  for (let i = 0; i < CELL_PER_ROW; i++) {
    const row = []
    for (let j = 0; j < CELL_PER_ROW; j++) {
      row.push(new Cell(i, j, CELL_DIM, PADDING));
    }
    cells.push(row);
  }
  
  // STEP 1
  currentCell = cells[0][0];
  currentCell.makeVisited();
  stack.push(currentCell);
  
  // START AND END CELLS
  cells[0][0].setStart();
  cells[CELL_PER_ROW - 1][CELL_PER_ROW - 1].setEnd();

}

function draw() {
  background(255);
  
  for (let i = 0; i < CELL_PER_ROW; i++) {
    for (let j = 0; j < CELL_PER_ROW; j++) {
      cells[i][j].draw();
      currentCell.highlight();
    }
  }
    
  // STEP 2
  if (stack.length !== 0) {
    // STEP 2.1
    currentCell = stack.pop();    
        
    // STEP 2.2
    const nextCell = currentCell.getUnvisitedNeighbourRandomly();
    
    if (nextCell) {
      // STEP 2.2.1
      stack.push(currentCell);
      
      // STEP 2.2.3
      currentCell.removeWallBetween(nextCell);
      currentCell = nextCell; 
      
      // STEP 2.2.4
      currentCell.makeVisited();
      stack.push(currentCell);
    }
  } else {
    currentCell.draw();
    noLoop();
  }
}