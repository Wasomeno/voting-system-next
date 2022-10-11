import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import useContract from "../../hooks/useContract";
import {
  AppContainer,
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
  const [title, setTitle] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [candidates, setCandidates] = useState(["", ""]);
  const votingContract = useContract("voting");

  const createSession = async (event) => {
    event.preventDefault();
    const titleBytes = ethers.utils.formatBytes32String(title);
    const candidatesBytes = candidates.map((candidate) => {
      return ethers.utils.formatBytes32String(candidate);
    });
    await votingContract.createVoting(titleBytes, sessionId, candidatesBytes);
  };

  const sessionInputHandler = (value) => {
    if (value.length >= 10) return;
    setSessionId(value);
  };

  const titleInpuHandler = (value) => {
    if (value.length >= 100) return;
    setTitle(value);
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

  return (
    <AppContainer>
      <AppTitle>Create Session</AppTitle>

      <Form onSubmit={(e) => createSession(e)}>
        <Section>
          <Text align={"center"}>Session Id</Text>
          <Input
            type={"number"}
            value={sessionId}
            onChange={(e) => sessionInputHandler(e.target.value)}
            width={"15rem"}
          />
        </Section>

        <Section>
          <Text align={"center"}>Title</Text>
          <Input
            type={"text"}
            value={title}
            onChange={(e) => titleInpuHandler(e.target.value)}
            width={"15rem"}
          />
        </Section>

        <Section>
          <Text align={"center"}>Candidates</Text>
          <FlexRow alignItems={"start"}>
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

            <FlexRow justifyContent={"center"} alignItems={"center"}>
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
    </AppContainer>
  );
};

export default create;
