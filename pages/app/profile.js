import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import React, { useContext } from "react";
import AnimatedContainer from "../../components/AnimatedContainer";
import AppContext from "../../context/AppContext";
import useContract from "../../hooks/useContract";
import {
  AppContainer,
  AppTitle,
  Table,
  TableData,
  TableHead,
  Text,
} from "../../styles/styled-components/app/appComponents";

const profile = () => {
  const voterDataContract = useContract("voterData");
  const historyFetched = useQuery(["voterHistory"], () => getHistory());
  const user = useContext(AppContext).user;

  const getHistory = async () => {
    const history = await voterDataContract.getVoterHistory(user);
    return history;
  };

  const toString = (value) => {
    const string = value.toString();
    return string;
  };

  return (
    <AnimatedContainer isLoading={historyFetched.isLoading}>
      {!historyFetched.isLoading ? (
        <>
          <AppTitle>Profile</AppTitle>
          <Text>Your history</Text>
          <Table>
            <tr>
              <TableHead>
                <Text>Session Id</Text>
              </TableHead>
              <TableHead>
                <Text>Voted For</Text>
              </TableHead>
              <TableHead>
                <Text>Time Stamp</Text>
              </TableHead>
            </tr>
            <tr>
              {historyFetched.data.map((history) => (
                <>
                  <TableData>{history.sessionId}</TableData>
                  <TableData>{history.candidateId}</TableData>
                  <TableData>{toString(history.timeStamp)}</TableData>
                </>
              ))}
            </tr>
          </Table>
        </>
      ) : null}
    </AnimatedContainer>
  );
};

export default profile;
