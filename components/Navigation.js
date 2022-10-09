import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import AppNavigation from "./AppNavigation";
import HomeNavigation from "./HomeNavigation";

const Navigation = ({ path }) => {
  //   const isConnected = Boolean(account[0]);
  //   async function connectAccount() {
  //     if (window.ethereum) {
  //       const account = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       //   setAccount(account);
  //     }
  //   }
  useEffect(() => {}, [path]);

  return <>{path === "/app" ? <AppNavigation /> : <HomeNavigation />}</>;
};

export default Navigation;
