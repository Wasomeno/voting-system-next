import React, { useEffect, useState } from "react";
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
  const [candidates, setCandidates] = useState(["Candidate 1", "Candidate 2"]);

  const submitSession = (e) => {
    e.preventDefault();
    console.log("Submit");
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
    setCandidates((currentCandidates) => [
      ...currentCandidates,
      "Candidate " + parseInt(candidates.length + 1),
    ]);
  };

  const candidatesDecrement = () => {
    if (candidates.length <= 2) return;
    const lastCandidate = "Candidate " + candidates.length;
    setCandidates((currentCandidates) =>
      currentCandidates.filter((candidate) => candidate !== lastCandidate)
    );
  };

  useEffect(() => {}, [candidates]);
  return (
    <AppContainer>
      <AppTitle>Create Session</AppTitle>

      <Form onSubmit={(e) => submitSession(e)}>
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
          <Input type={"text"} onChange={titleInpuHandler} width={"15rem"} />
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
                  placeholder={candidate}
                  onChange={(e) =>
                    candidatesInputHandler(index, e.target.value)
                  }
                />
              ))}
            </FlexColumn>

            <FlexRow justifyContent={"center"} alignItems={"center"}>
              <Button
                width={"2rem"}
                height={"2rem"}
                onClick={candidatesDecrement}
              >
                {"<"}
              </Button>
              <Input type={"number"} value={candidates.length} width={"5rem"} />
              <Button
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
          <Submit type={"submit"} />
        </Section>
      </Form>
    </AppContainer>
  );
};

export default create;
