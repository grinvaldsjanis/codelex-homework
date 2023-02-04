import React, { useState } from "react";
import { Color } from "../SubApps/subapp-03";

interface Props {
  colors: Color[];
}

const Container: React.FC<Props> = ({ colors }) => {
  return (
    <div>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color, height: "50px", width: "50px" }}
        />
      ))}
    </div>
  );
};

export default Container;
