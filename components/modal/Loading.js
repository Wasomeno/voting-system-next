import React from "react";
import { Text } from "../../styles/styled-components/app/appComponents";
import {
  LoadingContainer,
  Screen,
} from "../../styles/styled-components/modals/loadingComponents";
import Loader from "react-spinners/PuffLoader";

const Loading = ({ text, isLoading }) => {
  return (
    <>
      <LoadingContainer>
        <Text align={"center"}>{text}</Text>
        <Loader loading={isLoading} color={"#fff"} size={75} />
      </LoadingContainer>
      <Screen />
    </>
  );
};

export default Loading;
