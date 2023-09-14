import React from "react";
import Game from "./Game";

function GameContainer() {
  const getGameContainerStyle = () => ({
    minHeight: "100vh",
    minWidth: "80vw",
    backgroundColor: "black",
    color: "gray",
  });

  const getGameTitleStyle = () => ({
    textAlign: "left",
    fontSize: 50,
    margin: 0,
    fontFamily: "Time New Roman",
    backgroundColor: "black",
    color: "gray",
  });

  return (
    <div style={getGameContainerStyle()}>
      <h1 style={getGameTitleStyle()}>USERFACET</h1>
      <Game />
    </div>
  );
}

export default GameContainer;
