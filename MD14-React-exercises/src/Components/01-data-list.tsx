import React from "react";

interface Props {
  data: string[];
}

const DataList: React.FC<Props> = ({ data }) => {
  return (
    <ul>
      {data.map((value, index) => (
        <li key={index}>{value}</li>
      ))}
    </ul>
  );
};

export default DataList;