import styled from "styled-components";

export const AppContainer = styled.div({
  height: "75vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
});

export const AppTitle = styled.h1({
  fontSize: (props) => props.fontSize,
  fontFamily: "Cambria, Cochin, Georgia, Times, Times New Roman, serif",
  letterSpacing: "0.25rem",
  margin: "5px auto",
  padding: "5px 5px",
  fontWeight: "normal",
});

export const Text = styled.p({
  fontSize: "18px",
  fontFamily: "monospace",
  letterSpacing: "0.1rem",
  margin: (props) => props.margin,
  padding: "5px",
  textAlign: (props) => props.align,
});

export const Input = styled.input({
  fontFamily: "monospace",
  fontSize: "16px",
  textAlign: "center",
  border: "1px solid #000 ",
  borderRadius: "0.25rem",
  height: "2rem",
  width: (props) => props.width,
  margin: "0.25rem 0.25rem",
});

export const Form = styled.form({
  display: "flex",
  flexDirection: "column",
});

export const FlexRow = styled.div({
  width: "100%",
  height: (props) => props.height,
  display: "flex",
  margin: "5px auto",
  justifyContent: (props) => props.justifyContent,
  alignItems: (props) => props.alignItems,
});

export const FlexColumn = styled.div({
  width: (props) => props.width,
  display: "flex",
  flexDirection: "column",
  height: (props) => props.height,
  justifyContent: (props) => props.justifyContent,
  alignItems: (props) => props.alignItems,
});

export const Section = styled.section({
  margin: "5px auto",
});

export const Button = styled.button({
  color: "white",
  backgroundColor: "#000",
  fontFamily: "monospace",
  fontSize: "16px",
  width: (props) => props.width,
  height: (props) => props.height,
  margin: "0 0.25rem",
  borderRadius: "0.5rem",
  cursor: "pointer",
  transition: "0.25s",
  ":hover": {
    color: "#000",
    backgroundColor: "#fff",
  },
});

export const Submit = styled.input({
  color: "white",
  backgroundColor: "#000",
  fontFamily: "monospace",
  fontSize: "16px",
  width: "10rem",
  height: "3rem",
  margin: "0 0.25rem",
  borderRadius: "3rem",
  cursor: "pointer",
  transition: "0.25s",
  ":hover": {
    color: "#000",
    backgroundColor: "#fff",
  },
});

export const Table = styled.table({
  margin: "1rem 0",
  width: "75%",
  textAlign: "center",
  fontFamily: "monospace",
  borderCollapse: "collapse",
});

export const TableHead = styled.th({
  border: "1px solid #ddd",
  padding: "0.25rem",
});

export const TableData = styled(TableHead)({
  fontWeight: "normal",
  fontSize: "1rem",
  padding: "0.5rem",
});

export const Card = styled.div({
  backgroundColor: "rgba(0,0,0,0.05)",
  width: (props) => props.width,
  height: (props) => props.height,
  margin: "5px 5px",
  padding: "5px",
  borderRadius: "1rem",
  border: "1.75px solid #000",
});
