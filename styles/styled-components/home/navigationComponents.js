import styled from "styled-components";

export const NavContainer = styled.header({
  height: "5rem",
  width: "100vw",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "0",
  padding: "0",
});

export const NavButton = styled.a({
  fontSize: "16px",
  color: "#000",
  margin: "2px auto",
  padding: "3px 6px",
  fontFamily: "monospace",
  textDecoration: "none",
});
