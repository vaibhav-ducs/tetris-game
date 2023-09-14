import React, { useEffect, useState } from "react";
// import { useEffect } from "react/cjs/react.production.min";

function Cell({ value, cellColor }) {
  const [cellValue, setValue] = useState(undefined);
  useEffect(() => {
    setValue(value);
    console.log("1111");
  }, [value]);
  return (
    <div
      className="mycell"
      style={{
        boxShadow: cellColor && "rgba(0, 0, 0, 0.2) 0 0 10px inset",
        backgroundColor: cellColor,
        opacity: "0.5",
      }}
    >
      <p style={{ color: "yellow" }}>{cellValue}</p>
    </div>
  );
}
export default Cell;
