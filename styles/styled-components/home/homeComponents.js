import styled from "styled-components";

export const Container = styled.main({
  height: "75vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "0",
  padding: "0",
});

export const Title = styled.h1({
  fontSize: "72px",
  fontFamily: "Cambria, Cochin, Georgia, Times, Times New Roman, serif",
  fontWeight: "normal",
  letterSpacing: "0.25rem",
  margin: "6px auto",
});

export const Subtitle = styled.h2({
  fontSize: "24px",
  fontFamily: "monospace",
  fontWeight: "normal",
  margin: "6px auto",
});

export const Text = styled.p({
  fontSize: "18px",
  fontFamily: "monospace",
  letterSpacing: "0.1rem",
});

export const Button = styled.button({
  fontSize: "18px",
  backgroundColor: "#fff",
  padding: "3px 6pxpx",
  width: "10rem",
  height: "3rem",
  fontFamily: "monospace",
  borderRadius: "3rem",
  border: "2px solid black",
  margin: "2rem auto",
  transition: "0.25s",
  textDecorationLine: "none",
  ":hover": {
    backgroundColor: "#000",
    color: "#fff",
  },
  cursor: "pointer",
});
