import * as C from "../constants";

class Block {
  constructor() {
    this.resetPosition();
  }

  resetPosition = () => {
    this.col = C.BLOCK_START_COORDINATES.col;
    this.row = C.BLOCK_START_COORDINATES.row;
  };

  // getShape = () => "undefined";

  getRow = () => this.row;

  getCol = () => this.col;

  getHeight = () => this.getShape().length;

  // Assumes width is constant throughout the block! This will fail to work if a block has rows of different size.
  getWidth = () => this.getShape()[0].length;

  canMoveLeft = () => this.col > 0;

  canMoveDown = () => this.row + this.getHeight() < C.BOARD_HEIGHT_CELLS;

  canMoveRight = () => this.col + this.getWidth() < C.BOARD_WIDTH_CELLS;

  moveLeft = () => {
    if (this.canMoveLeft()) {
      this.col -= 1;
    }
  };

  moveRight = () => {
    if (this.canMoveRight()) {
      this.col += 1;
    }
  };

  moveDown = () => {
    if (this.canMoveDown()) {
      this.row += 1;
    }
  };

  getShape = () => this.shape;

  setShape = (shape) => {
    this.shape = shape;
  };

  static getRandomBlock(word, index) {
    return new IBlock(word, index);
  }
}

class IBlock extends Block {
  constructor(word, index) {
    super();
    let color = ["red", "yellow", "green", "blue", "white"];
    this.color = color[index % 5];
    let temp = [];
    for (let i = 0; i < word.length; i = i + 1) {
      // console.log(word[i]);
      temp[i] = this.color;
    }
    this.shape = [temp];
    this.originalShape = this.shape;
  }
}

export default Block;
