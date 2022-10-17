import React, { useContext } from "react";
import { Text } from "../../styles/styled-components/app/appComponents";
import {
  LoadingContainer,
  Screen,
} from "../../styles/styled-components/modals/loadingComponents";
import Loader from "react-spinners/PuffLoader";
import { useLoading } from "../../stores/stores";

export const Loading = () => {
  const [loading] = useLoading();
  return (
    <>
      <LoadingContainer loading={loading ? 1 : 0}>
        <Text align={"center"}>Loading</Text>
        <Loader loading={loading} color={"#fff"} size={75} />
      </LoadingContainer>
      <Screen loading={loading ? 1 : 0} />
    </>
  );
};
