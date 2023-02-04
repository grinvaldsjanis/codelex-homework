import React, { useState } from "react";
import Button from "../Components/03-button";
import Dropdown from "../Components/03-dropdown";
import Container from "../Components/03-container";

export type Color =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "violet";

const SubApp03: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<Color>("red");
  const [colors, setColors] = useState<Color[]>([]);

  const handleClick = () => {
    setColors([...colors, selectedColor]);
  };

  const handleSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <Button onClick={handleClick} />
      <Dropdown onSelect={handleSelect} />
      <Container colors={colors} />
    </div>
  );
};

export default SubApp03;
