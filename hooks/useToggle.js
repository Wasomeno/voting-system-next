import React, { useState } from "react";

const useToggle = (condition) => {
  const [state, setState] = useState(condition);

  const toggleState = () => {
    setState((currentState) => !currentState);
  };

  return [state, toggleState];
};

export default useToggle;
