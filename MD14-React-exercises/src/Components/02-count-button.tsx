import React, { useState } from "react";

interface ButtonProps {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  isDisabled: boolean;
}

const CounterButton: React.FC<ButtonProps> = ({
  counter,
  setCounter,
  isDisabled,
}) => {
  return (
    <button disabled={isDisabled} onClick={() => setCounter(counter + 1)}>
      BUTTON {counter}
    </button>
  );
};

export default CounterButton;
