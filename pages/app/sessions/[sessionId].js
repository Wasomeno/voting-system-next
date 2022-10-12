import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/modal/Loading";
import useContract from "../../../hooks/useContract";
import {
  AppContainer,
  AppTitle,
  Button,
  Card,
  FlexColumn,
  FlexRow,
  Input,
  Section,
  Submit,
  Text,
} from "../../../styles/styled-components/app/appComponents";

const Session = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [selected, setSelected] = useState(0);
  const votingContract = useContract("voting");
  const fetchedDetails = useQuery(["sessionDetails"], () => getDetails());
  const fetchedHistory = useQuery(["sessionHistory"], () => getHistory());
  const fetchedCandidates = useQuery(["sessionCandidates"], () =>
    getCandidates()
  );
  const voteMutation = useMutation(() => submitVote());

  const submitVote = async () => {
    const vote = await votingContract.vote(sessionId, selected);
    return vote;
  };

  const getDetails = async () => {
    const details = await votingContract.votingDetails(sessionId);
    return details;
  };

  const getCandidates = async () => {
    const candidates = await votingContract.getCandidatesDetails(sessionId);
    return candidates;
  };

  const getHistory = async () => {
    const history = await votingContract.votingHistory(sessionId, 0);
    return history;
  };

  const radioButtonHandler = (value) => {
    setSelected((currentSelected) => value);
  };

  return (
    <AppContainer>
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
              <Text align={"center"}>Recent Votes</Text>
              <FlexColumn
                alignItems={"center"}
                justifyContent={"start"}
                height={"100%"}
              >
                {parseInt(fetchedHistory.data.timeStamp) !== 0 ? (
                  fetchedHistory.data.map((votes, index) => (
                    <FlexRow key={index}>
                      <Text>{votes.voter}</Text>
                      <Text>{votes.timeStamp}</Text>
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
                  {fetchedCandidates.data.map((details) => (
                    <Section>
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
      ) : (
        <Loading isLoading={fetchedCandidates.isLoading} text={"Loading"} />
      )}
    </AppContainer>
  );
};

export default Session;
