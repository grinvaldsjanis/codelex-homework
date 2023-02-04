import React, { useState } from "react";
import InputForm from "../Components/01-input-form";
import DataList from "../Components/01-data-list";

interface Props {}

const SubApp01: React.FC<Props> = () => {
  const [formData, setFormData] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    setFormData([...formData, inputValue]);
    setInputValue("");
  };

  const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(changeEvent.target.value);
  };

  return (
    <div>
      <InputForm
        inputValue={inputValue}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setInputValue={setInputValue}
      />
      <DataList data={formData} />
    </div>
  );
};

export default SubApp01;