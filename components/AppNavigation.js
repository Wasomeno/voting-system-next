import React from "react";
import Link from "next/link";
import {
  NavButton,
  NavContainer,
} from "../styles/styled-components/home/navigationComponents";

const AppNavigation = () => {
  return (
    <NavContainer>
      <Link href={""}>
        <NavButton>App</NavButton>
      </Link>

      <Link href={""}>
        <NavButton>Create Session</NavButton>
      </Link>

      <Link href={""}>
        <NavButton>Register Session</NavButton>
      </Link>

      <Link href={""}>
        <NavButton>Profile</NavButton>
      </Link>
    </NavContainer>
  );
};

export default AppNavigation;
