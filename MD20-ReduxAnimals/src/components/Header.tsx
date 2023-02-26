import React from "react";
import logo from '/logo.svg';
import { Image, Stack } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"

const Header: React.FC = () => {
  return (
    <Stack direction="horizontal" gap={3}>
      <Image style={{width: "70px", height: "70px"}} src={logo} alt="logo" />
      <h1 className="App-title">Animal Kingdom</h1>
    </Stack>
  );
};

export default Header;