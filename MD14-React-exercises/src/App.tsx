import React from "react";
import SubApp01 from "./SubApps/subapp-01";
import SubApp02 from "./SubApps/subapp-02";
import SubApp03 from "./SubApps/subapp-03";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className = "wrapper">
      <div className="box"><SubApp01 /></div>
      <div className="box"><SubApp02 /></div>
      <div className="box"><SubApp03 /></div>
    </div>
  );
};

export default App;
