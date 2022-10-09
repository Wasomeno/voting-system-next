import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children, path }) => {
  return (
    <>
      <Navigation path={path} />
      {children}
    </>
  );
};

export default Layout;
