import React from "react";
import Link from "next/link";
import {
  NavButton,
  NavContainer,
} from "../styles/styled-components/home/navigationComponents";

const HomeNavigation = () => {
  return (
    <NavContainer>
      <Link href={"/"}>
        <NavButton>Home</NavButton>
      </Link>

      <Link href={"about"}>
        <NavButton>About</NavButton>
      </Link>

      <Link href={"/app"}>
        <NavButton>App</NavButton>
      </Link>
    </NavContainer>
  );
};

export default HomeNavigation;
