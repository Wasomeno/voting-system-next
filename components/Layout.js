import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import Navigation from "./Navigation";
import NotConnected from "./NotConnected";

const Layout = ({ children, path }) => {
  const user = useContext(AppContext).user;
  const isConnected = Boolean(user);

  return (
    <>
      {isConnected ? (
        <>
          <Navigation path={path} />
          {children}
        </>
      ) : (
        <NotConnected />
      )}
    </>
  );
};

export default Layout;
