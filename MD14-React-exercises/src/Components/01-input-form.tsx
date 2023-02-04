import React, { useRef } from "react";

interface Props {
  inputValue: string;
  handleChange: (chEvent: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (suEvent: React.FormEvent<HTMLFormElement>) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputForm: React.FC<Props> = ({
  inputValue,
  handleChange,
  handleSubmit,
  setInputValue,
}) => {

  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(submitEvent);
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <form className="field columns " onSubmit={handleFormSubmit}>
      <input
        className="input"
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default InputForm;
