import React from "react";
import { motion } from "framer-motion";
import { AppContainer } from "../styles/styled-components/app/appComponents";
import Loading from "./modal/Loading";

const AnimatedContainer = ({ children, isLoading }) => {
  return (
    <AppContainer
      as={motion.main}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.5 }}
    >
      {isLoading ? (
        <Loading isLoading={isLoading} text={"Loading"} />
      ) : (
        children
      )}
    </AppContainer>
  );
};

export default AnimatedContainer;
