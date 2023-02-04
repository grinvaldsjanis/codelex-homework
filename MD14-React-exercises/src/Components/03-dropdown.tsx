import React, { useState } from "react";
import { Color } from "../SubApps/subapp-03";

interface Props {
  onSelect: (color: Color) => void;
}

const Dropdown: React.FC<Props> = ({ onSelect }) => {
  const [selected, setSelected] = useState<Color>("red");

  return (
    <select
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value as Color);
        onSelect(e.target.value as Color);
      }}
    >
      <option value="red">Red</option>
      <option value="orange">Orange</option>
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="indigo">Indigo</option>
      <option value="violet">Violet</option>
    </select>
  );
};

export default Dropdown;
