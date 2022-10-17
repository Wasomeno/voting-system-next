import { useMutation, useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AnimatedContainer from "../../components/AnimatedContainer";
import AppContext from "../../context/AppContext";
import { getIsProposer } from "../../fetchers/sessionFetchers";
import useContract from "../../hooks/useContract";
import { useLoading, useToast } from "../../stores/stores";
import {
  AppTitle,
  Button,
  FlexColumn,
  FlexRow,
  Form,
  Input,
  Section,
  Submit,
  Text,
} from "../../styles/styled-components/app/appComponents";

const create = () => {
  const titleRef = useRef();
  const sessionRef = useRef();
  const [candidates, setCandidates] = useState(["", ""]);
  const votingContract = useContract("voting");
  const [, setLoading] = useLoading();
  const [error, success] = useToast();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const context = useContext(AppContext);
  const isProposer = useQuery(["isProposer", context], () =>
    getIsProposer(context)
  );

  const createSessionMutation = useMutation((event) => createSession(event), {
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      success("Session Created");
    },
    onError: (data) => {
      setLoading(false);
      console.log(data.code);
      error("Transaction error");
    },
  });

  const createSession = async (event) => {
    event.preventDefault();
    const session = sessionRef.current.value;
    const titleBytes = ethers.utils.formatBytes32String(titleRef.current.value);
    const candidatesBytes = candidates.map((candidate) => {
      return ethers.utils.formatBytes32String(candidate);
    });
    const create = await votingContract.createVoting(
      titleBytes,
      session,
      candidatesBytes
    );
    const listener = await provider.waitForTransaction(create.hash);
    return listener;
  };

  const candidatesInputHandler = (inputIndex, value) => {
    const newCandidates = candidates.map((candidate, index) => {
      if (inputIndex === index) {
        return value;
      } else {
        return candidate;
      }
    });
    setCandidates(newCandidates);
  };

  const candidatesIncrement = () => {
    if (candidates.length >= 5) return;
    setCandidates((currentCandidates) => [...currentCandidates, ""]);
  };

  const candidatesDecrement = () => {
    if (candidates.length <= 2) return;
    setCandidates((currentCandidates) => currentCandidates.slice(0, -1));
  };

  useEffect(() => {
    if (isProposer.isFetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isProposer.isLoading]);

  if (isProposer.isLoading) return;
  return (
    <AnimatedContainer justify={"center"} align={"center"}>
      {isProposer.data !== false ? (
        <>
          <AppTitle fontSize="52px">Create Session</AppTitle>
          <Form onSubmit={(event) => createSessionMutation.mutate(event)}>
            <Section>
              <Text align={"center"} margin={"5px 5px"}>
                Session Id
              </Text>
              <Input ref={sessionRef} type={"number"} width={"15rem"} />
            </Section>

            <Section>
              <Text align={"center"} margin={"5px 5px"}>
                Title
              </Text>
              <Input ref={titleRef} type={"text"} width={"15rem"} />
            </Section>

            <Section>
              <Text align={"center"} margin={"5px 5px"}>
                Candidates
              </Text>
              <FlexRow alignitems={"start"}>
                <FlexColumn>
                  {candidates.map((candidate, index) => (
                    <Input
                      key={index}
                      type={"text"}
                      width={"15rem"}
                      value={candidate}
                      placeholder={"Candidates " + parseInt(index + 1)}
                      onChange={(e) =>
                        candidatesInputHandler(index, e.target.value)
                      }
                    />
                  ))}
                </FlexColumn>

                <FlexRow justifycontent={"center"} alignitems={"center"}>
                  <Button
                    type="button"
                    width={"2rem"}
                    height={"2rem"}
                    onClick={candidatesDecrement}
                  >
                    {"<"}
                  </Button>
                  <Input
                    type={"number"}
                    value={candidates.length}
                    readOnly
                    width={"5rem"}
                  />
                  <Button
                    type="button"
                    width={"2rem"}
                    height={"2rem"}
                    onClick={candidatesIncrement}
                  >
                    {">"}
                  </Button>
                </FlexRow>
              </FlexRow>
            </Section>

            <Section>
              <Submit type={"submit"} value={"Create Session"} />
            </Section>
          </Form>
        </>
      ) : (
        <>
          <AppTitle>Send your Appliances to Our Team</AppTitle>
          <Text>You need to be a verified proposer to create a session</Text>
        </>
      )}
    </AnimatedContainer>
  );
};

export default create;
