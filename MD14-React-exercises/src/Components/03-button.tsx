import React from "react";

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick }) => (
  <button onClick={onClick}>Add</button>
);

export default Button;
