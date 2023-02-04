import React, { useState } from "react";
import CountButton from "../Components/02-count-button";
import NumberBox from "../Components/02-number-box";

interface Props {}

const SubApp02: React.FC<Props> = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [counter, setCounter] = useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <CountButton
        counter={counter}
        setCounter={setCounter}
        isDisabled={isDisabled}
      />
      <NumberBox counter={counter} />
    </div>
  );
};

export default SubApp02;
