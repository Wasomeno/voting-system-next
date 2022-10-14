import React, { useContext } from "react";
import { Text } from "../../styles/styled-components/app/appComponents";
import {
  LoadingContainer,
  Screen,
} from "../../styles/styled-components/modals/loadingComponents";
import Loader from "react-spinners/PuffLoader";
import AppContext from "../../context/AppContext";

const Loading = () => {
  const loadingContext = useContext(AppContext).loading;
  return (
    <>
      <LoadingContainer loading={loadingContext.isLoading ? 1 : 0}>
        <Text align={"center"}>{loadingContext.text}</Text>
        <Loader loading={loadingContext.isLoading} color={"#fff"} size={75} />
      </LoadingContainer>
      <Screen loading={loadingContext.isLoading ? 1 : 0} />
    </>
  );
};
export default Loading;
