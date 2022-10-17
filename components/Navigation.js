import React from "react";
import { useEffect } from "react";
import AppNavigation from "./AppNavigation";
import HomeNavigation from "./HomeNavigation";

const Navigation = ({ path }) => {
  useEffect(() => {}, [path]);
  return <>{path === "app" ? <AppNavigation /> : <HomeNavigation />}</>;
};

export default Navigation;
