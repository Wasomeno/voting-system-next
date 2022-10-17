import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AnimatedContainer from "../../../components/AnimatedContainer";
import AppContext from "../../../context/AppContext";
import useContract from "../../../hooks/useContract";
import {
  AppTitle,
  Button,
  Card,
  FlexColumn,
  FlexRow,
  Input,
  Section,
  Text,
} from "../../../styles/styled-components/app/appComponents";
import {
  getCandidates,
  getDetails,
  getHistory,
  getStatus,
} from "../../../fetchers/sessionFetchers";
import ValidateData from "../validateData";
import { useLoading, useToast } from "../../../stores/stores";

const Session = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [selected, setSelected] = useState(0);
  const votingContract = useContract("voting");
  const [error, success] = useToast();
  const [, setLoading] = useLoading();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const user = useContext(AppContext).user;

  const isVerified = useQuery(["status", sessionId, user], () =>
    getStatus(sessionId, user)
  );
  const fetchedDetails = useQuery(["sessionDetails", sessionId], () =>
    getDetails(sessionId)
  );
  const fetchedHistory = useQuery(["sessionHistory", sessionId], () =>
    getHistory(sessionId)
  );
  const fetchedCandidates = useQuery(["sessionCandidates", sessionId], () =>
    getCandidates(sessionId)
  );
  const voteMutation = useMutation(() => submitVote(), {
    onMutate: () => {
      setLoading(true);
    },
    onError: () => {
      setLoading(false);
      error("Transaction Error");
    },
    onSuccess: () => {
      setLoading(false);
      success("Voting Success");
    },
  });

  const submitVote = async () => {
    const vote = await votingContract.vote(sessionId, selected);
    const listener = await provider.waitForTransaction(vote.hash);
    return listener;
  };

  const test = () => {
    loading.setText("Test...");
    loading.toggle();
  };

  const radioButtonHandler = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    if (fetchedCandidates.isFetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchedCandidates.isLoading]);

  if (!isVerified.data && !isVerified.isLoading) return <ValidateData />;
  return (
    <AnimatedContainer>
      {!fetchedCandidates.isLoading ? (
        <>
          <Section>
            <AppTitle fontSize={"45px"}>
              {ethers.utils.parseBytes32String(fetchedDetails.data.title)}
            </AppTitle>
          </Section>
          <FlexRow justifyContent={"space-between"} alignItems={"center"}>
            <Text margin={"5px auto"}>
              {fetchedDetails.data.started ? "Started" : "Not Started"}
            </Text>
            <Text margin={"5px auto"}>
              Proposer: {fetchedDetails.data.proposer.slice(0, 10)}...
            </Text>
          </FlexRow>
          <FlexRow
            justifyContent={"center"}
            alignItems={"start"}
            height={"75%"}
          >
            <Card width={"25%"} height={"100%"}>
              <Text align={"center"} margin={"5px 5px"}>
                Recent Votes
              </Text>
              <FlexColumn
                alignItems={"center"}
                justifyContent={"start"}
                height={"100%"}
              >
                {parseInt(fetchedHistory.data.timeStamp) !== 0 ? (
                  fetchedHistory.data.map((votes, index) => (
                    <FlexRow
                      key={index}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                    >
                      <Text>{index + 1}.</Text>
                      <Text>{votes.voter.slice(0, 12)}...</Text>
                      <Text>{votes.candidateId}</Text>
                    </FlexRow>
                  ))
                ) : (
                  <FlexRow
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"75%"}
                  >
                    <Text>No recent votes</Text>
                  </FlexRow>
                )}
              </FlexColumn>
            </Card>
            <FlexColumn
              justifyContent={"center"}
              alignItems={"center"}
              width={"50%"}
              height={"100%"}
            >
              <Card width={"100%"} height={"40%"}>
                <Text align={"center"} margin={"5px auto"}>
                  Candidates
                </Text>
                <FlexRow alignItems={"start"} justifyContent={"center"}>
                  {fetchedCandidates.data.map((details, index) => (
                    <Section key={index}>
                      <Text margin={"5px auto"}>
                        {ethers.utils.parseBytes32String(details.candidate)}
                      </Text>
                      <Text align={"center"} margin={"5px auto"}>
                        {details.votes.toString()} votes
                      </Text>
                    </Section>
                  ))}
                </FlexRow>
              </Card>
              <Card width={"100%"} height={"60%"}>
                <Text align={"center"} margin={"10px auto"}>
                  Vote Section
                </Text>
                <FlexRow alignItems={"start"} justifyContent={"center"}>
                  {fetchedCandidates.data.map((details) => (
                    <FlexRow
                      justifyContent={"center"}
                      key={parseInt(details.candidateId)}
                    >
                      <Input
                        type={"radio"}
                        value={parseInt(details.candidateId)}
                        name={"candidateRadio"}
                        onChange={(e) => radioButtonHandler(e.target.value)}
                      />
                      <Text margin={"5px 5px"}>
                        {ethers.utils.parseBytes32String(details.candidate)}
                      </Text>
                    </FlexRow>
                  ))}
                </FlexRow>
                <FlexRow justifyContent={"center"} alignItems={"center"}>
                  <Button
                    width={"20%"}
                    height={"3rem"}
                    onClick={() => voteMutation.mutate()}
                  >
                    Submit Vote
                  </Button>
                </FlexRow>
              </Card>
            </FlexColumn>
          </FlexRow>
        </>
      ) : null}
    </AnimatedContainer>
  );
};

export default Session;
