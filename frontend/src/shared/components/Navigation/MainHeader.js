import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./MainHeader.css";

const MainHeader = (props) => {
  return <div>{props.children}</div>;
};

export default MainHeader;
