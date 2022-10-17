import React from "react";
import Link from "next/link";
import {
  Button,
  Icon,
  NavButton,
  NavContainer,
} from "../styles/styled-components/home/navigationComponents";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useRouter } from "next/router";

const AppNavigation = () => {
  const router = useRouter();
  const user = useContext(AppContext).user;
  const isConnected = Boolean(user);
  const setAccount = useContext(AppContext).setAccount;

  async function connectAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
    }
  }

  return (
    <NavContainer>
      <Link href={"/app"}>
        <NavButton isActive={router.pathname === "/app"}>App</NavButton>
      </Link>

      <Link href={"/app/create"}>
        <NavButton isActive={router.pathname === "/app/create"}>
          Create Session
        </NavButton>
      </Link>

      <Link href={"/app/register"}>
        <NavButton isActive={router.pathname === "/app/register"}>
          Register Session
        </NavButton>
      </Link>

      {isConnected ? (
        <Link href={"/app/profile"}>
          <NavButton isActive={router.pathname === "/app/profile"}>
            <Icon src="/button.png" />
            {user.slice(0, 12)}...
          </NavButton>
        </Link>
      ) : (
        <Button onClick={connectAccount}>Connect Wallet</Button>
      )}
    </NavContainer>
  );
};

export default AppNavigation;
