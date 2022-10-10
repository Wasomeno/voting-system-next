import React, { useContext, useEffect, useState } from "react";
import useToggle from "../../../monster-game-next/hooks/useToggle";
import AppContext from "../../context/AppContext";
import {
  Text,
  ToastContainer,
} from "../../styles/styled-components/modals/toastComponents";

export const Toast = () => {
  const toast = useContext(AppContext).toast;

  //   useEffect(() => {}, [toast.show]);
  return (
    <ToastContainer show={toast.show}>
      <Text>{toast.text}</Text>
    </ToastContainer>
  );
};

const useToast = () => {
  const [show, toggleShow] = useToggle(false);
  const [text, setText] = useState("");

  const error = (text) => {
    setText(text);
    toggleShow();
    setTimeout(() => toggleShow(), 2500);
  };

  const success = (text) => {
    setText(text);
    toggleShow();

    setTimeout(() => toggleShow(), 2500);
  };

  return [success, error, text, show];
};

export default useToast;
