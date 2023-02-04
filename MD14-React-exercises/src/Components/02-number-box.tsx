import React from "react";

interface DisplayNumberProps {
  counter: number;
}

const NumberBox: React.FC<DisplayNumberProps> = ({ counter }) => {
  return <div>{counter * 2}</div>;
};

export default NumberBox;
