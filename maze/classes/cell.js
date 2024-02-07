const TOP_ = 0;
const RIGHT_ = 1;
const BOTTOM_ = 2;
const LEFT_ = 3;

const COMMUM = 0;
const START = 1;
const END = 2;


class Cell {
  
  constructor(i, j, s, padding) {
    this.i = i;
    this.j = j;
    this.s = s;
    this.padding = padding / 2;
    
    this.visited = false;
    this.walls = [1, 1, 1, 1];
    
    this.type = COMMUM;
  }
  
  setStart() {
    this.type = START;
  }
  
  setEnd() {
    this.type = END;
  }
  
  getUnvisitedNeighbourRandomly() {
    let neighbours = []
    if (this.walls[TOP_] && this.j > 0) {
      neighbours.push(cells[this.i][this.j - 1]);
    }
    if (this.walls[RIGHT_] && this.i < CELL_PER_ROW - 1) {
      neighbours.push(cells[this.i + 1][this.j]);
    }
    if (this.walls[BOTTOM_] && this.j < CELL_PER_ROW - 1) {
      neighbours.push(cells[this.i][this.j + 1]);
    }
    if (this.walls[LEFT_] && this.i > 0) {
      neighbours.push(cells[this.i - 1][this.j]);
    }
    
    neighbours = neighbours.filter(cell => !cell.visited);
    
    return random(neighbours);
  }
  
  removeWallBetween(other) {    
    if (this.i == other.i && this.j > other.j) {
      this.walls[TOP_] = 0;
      other.walls[BOTTOM_] = 0;
    }
    if (this.i == other.i && this.j < other.j) {
      this.walls[BOTTOM_] = 0;
      other.walls[TOP_] = 0;
    }
    if (this.j == other.j && this.i > other.i) {
      this.walls[LEFT_] = 0;
      other.walls[RIGHT_] = 0;
    }
    if (this.j == other.j && this.i < other.i) {
      this.walls[RIGHT_] = 0;
      other.walls[LEFT_] = 0;
    }
  }
  
  makeVisited() {
    this.visited = true;
  }
  
  highlight() {
    const x = this.i * this.s + this.padding;
    const y = this.j * this.s + this.padding;
    
    noStroke();
    fill(47, 72, 88);
    rect(x, y, this.s, this.s);
  }
  
  draw() {
    const x = this.i * this.s + this.padding;
    const y = this.j * this.s + this.padding;
    
    if (this.visited) {
      noStroke();
      // fill(47, 72, 88);
      fill(20, 210, 90);
      rect(x, y, this.s, this.s);
      
    }
    
    this.drawTop(x, y);    
    this.drawRight(x, y);    
    this.drawBottom(x, y);    
    this.drawLeft(x, y);    
  }
  
  drawTop(x, y) {
    stroke(0);
    strokeWeight(1);
    if (this.walls[TOP_]) {
      line(x, y, x + this.s, y);
    }
  }
  
  drawRight(x, y) {  
    stroke(0);
    strokeWeight(1);
    if (this.type === END) {
      stroke(255, 0, 0);
      strokeWeight(4);
    }

    if (this.walls[RIGHT_]) {
      line(x + this.s, y, x + this.s, y + this.s);
    }
  }
  
  drawBottom(x, y) {
    stroke(0);
    strokeWeight(1);
    if (this.walls[BOTTOM_]) {
      line(x, y + this.s, x + this.s, y + this.s);
    }
  }
  
  drawLeft(x, y) {
    stroke(0);
    strokeWeight(1);
    if (this.type === START) {
      stroke(255, 0, 0);
      strokeWeight(4);
    }

    if (this.walls[LEFT_]) {
        line(x, y, x, y + this.s);
    }
  }
  
}