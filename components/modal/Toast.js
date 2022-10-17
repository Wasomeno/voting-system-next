import React, { useContext, useEffect, useState } from "react";
import { toastDetails, useToastDetails } from "../../stores/stores";
import { Icon } from "../../styles/styled-components/home/navigationComponents";
import {
  Text,
  ToastContainer,
} from "../../styles/styled-components/modals/toastComponents";

export const Toast = () => {
  const [show, text, condition] = useToastDetails();

  return (
    <ToastContainer show={show}>
      <Text>{condition}</Text>
      <Text>{text}</Text>
    </ToastContainer>
  );
};
