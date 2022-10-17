import React from "react";
import { motion } from "framer-motion";
import { AppContainer } from "../styles/styled-components/app/appComponents";

const AnimatedContainer = ({ children, justify, align }) => {
  return (
    <AppContainer
      as={motion.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
      justifycontent={justify}
      alignitems={align}
    >
      {children}
    </AppContainer>
  );
};

export default AnimatedContainer;
