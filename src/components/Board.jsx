import React from "react";
import Block from "./Block";
import Cell from "./Cell";
import * as C from "../constants";
import Grid from "./Grid";
import Autofocus from "./Autofocus";

const getStyle = () => ({
  display: "grid",
  gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 20px)`,
  gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 20px)`,
  gridArea: "board",
  border: "solid 1px white",
});

class Board extends React.Component {
  words = ["we", "design", "and", "develop", "applications", "that", "run", "the", "world", "and", "showcase", "the", "future"];
  constructor(props) {
    super(props);

    let grid = new Grid(this.props.addScore);
    const nextBlock = Block.getRandomBlock("we", 0);
    this.props.setNextBlock(nextBlock);
    this.state = {
      ticker: setInterval(() => this.update(), 1000),
      grid: grid,
      gridView: grid.cells,
      activeBlock: Block.getRandomBlock(""),
      nextBlock,
      saveUsed: false,
      word: "we",
      iteration: 0,
    };
  }

  componentDidMount = () => {
    this.redraw();
    this.update();
  };

  componentWillUnmount = () => clearInterval(this.state.ticker);

  redraw = (showBlock = true) => {
    const gridView = showBlock
      ? this.state.grid.addBlockToCells(this.state.activeBlock)
      : this.state.grid.cells;

    this.setState({
      gridView: gridView,
    });
  };

  update = () => {
    this.redraw();

    if (this.state.grid.blockCanMoveDown(this.state.activeBlock)) {
      this.state.activeBlock.moveDown();
    } else {
      this.lockPiece();
    }
  };

  lockPiece = () => {
    const grid = this.state.grid;

    grid.storeBlock(this.state.activeBlock);
    let scoreToAdd = grid.clearFilledRows();
    grid.addScore(scoreToAdd);
    this.redraw(false);

    let nextBlock = this.consumeNextBlock();
    this.setState({ activeBlock: nextBlock, saveUsed: false });

    if (grid.blockOverlapsGrid(nextBlock)) {
      this.props.gameOver();
    }
  };

  nextWord = () => {
    if (this.state.iteration === this.words.length - 1)
      this.setState({
        word: "we",
        iteration: 0,
      });
    else
      this.setState({
        word: this.words[this.state.iteration + 1],
        iteration: this.state.iteration + 1,
      });
    return null;
  };

  consumeNextBlock = () => {
    this.nextWord();
    let nextBlock = this.state.nextBlock;
    const newNextBlock = Block.getRandomBlock(this.state.word, this.state.iteration);
    this.props.setNextBlock(newNextBlock);
    this.setState({ nextBlock: newNextBlock });
    return nextBlock;
  };

  swapSavedBlock = () => {
    let newActiveBlock = this.state.savedBlock
      ? this.state.savedBlock
      : this.consumeNextBlock();
    let newSavedBlock = this.state.activeBlock;

    this.props.setSavedBlock(newSavedBlock);

    this.setState({
      activeBlock: newActiveBlock,
      savedBlock: newSavedBlock,
      saveUsed: true,
    });

    newActiveBlock.resetPosition();
    newSavedBlock.resetPosition();
  };

  handleKeyDown = (event) => {
    let keyCode = event.keyCode;
    let grid = this.state.grid;

    if (keyCode === 82) {
      // r key
      this.props.restartGame();
    } else if (keyCode === 32) {
      // Space bar
      while (grid.blockCanMoveDown(this.state.activeBlock)) {
        this.update();
      }

      this.lockPiece();
    } else {
      //clearTimeout(this.state.lock);

      if (keyCode === 40 && grid.blockCanMoveDown(this.state.activeBlock)) {
        // Down arrow
        this.state.activeBlock.moveDown();
      } else if (
        keyCode === 37 &&
        grid.blockCanMoveLeft(this.state.activeBlock)
      ) {
        // Left arrow
        this.state.activeBlock.moveLeft();
      } else if (
        keyCode === 39 &&
        grid.blockCanMoveRight(this.state.activeBlock)
      ) {
        // Right arrow
        this.state.activeBlock.moveRight();
      } else if (
        keyCode === 38 &&
        grid.blockCanRotate(this.state.activeBlock)
      ) {
        // Up arrow
        this.state.activeBlock.rotate();
      } else if (keyCode === 16 && !this.state.saveUsed) {
        // Shift key
        this.swapSavedBlock();
      }

      this.redraw();
    }
  };

  render() {
    return (
      <Autofocus style={getStyle()} onKeyDown={this.handleKeyDown}>
        {this.state.gridView.map((cellColorList, x) =>
          cellColorList.map((cellColor, y) => (
            <Cell key={`${x},${y}`} cellColor={cellColor}/>
          )),
        )}
      </Autofocus>
    );
  }
}

export default Board;
