import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import React, { useContext, useEffect } from "react";
import AnimatedContainer from "../../components/AnimatedContainer";
import { Toast } from "../../components/modal/Toast";
import AppContext from "../../context/AppContext";
import useContract from "../../hooks/useContract";
import { useLoading } from "../../stores/stores";
import {
  AppTitle,
  Table,
  TableData,
  TableHead,
  Text,
} from "../../styles/styled-components/app/appComponents";

const profile = () => {
  const voterDataContract = useContract("voterData");
  const fetchedHistory = useQuery(["voterHistory"], () => getHistory());
  const user = useContext(AppContext).user;
  const [, setLoading] = useLoading();

  const getHistory = async () => {
    const history = await voterDataContract.getVoterHistory(user);
    return history;
  };

  const toString = (value) => {
    const string = value.toString();
    return string;
  };

  useEffect(() => {
    if (fetchedHistory.isFetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchedHistory.isLoading]);

  return (
    <AnimatedContainer justifyContent={"start"} alignItems={"center"}>
      {!fetchedHistory.isLoading ? (
        <>
          <AppTitle fontSize="52px">Profile</AppTitle>
          <Text>Your history</Text>
          {fetchedHistory.data.length !== 0 ? (
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
                {fetchedHistory.data.map((history) => (
                  <>
                    <TableData>{history.sessionId}</TableData>
                    <TableData>{history.candidateId}</TableData>
                    <TableData>{toString(history.timeStamp)}</TableData>
                  </>
                ))}
              </tr>
            </Table>
          ) : (
            <Text>No History</Text>
          )}
        </>
      ) : null}
    </AnimatedContainer>
  );
};

export default profile;
