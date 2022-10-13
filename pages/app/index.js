import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import AnimatedContainer from "../../components/AnimatedContainer";
import AppContext from "../../context/AppContext";
import useContract from "../../hooks/useContract";
import {
  AppContainer,
  AppTitle,
  Button,
  Form,
  Input,
  Section,
  Submit,
  Text,
} from "../../styles/styled-components/app/appComponents";

export default function AppHome() {
  const sessionRef = useRef();
  const [result, setResult] = useState(false);
  const votingContract = useContract("voting");
  const toast = useContext(AppContext).toast;

  const findSession = async () => {
    const session = sessionRef.current.value;
    const result = await votingContract.checkSession(session);
    console.log(session);
    toast.success("Session Found");
    setResult(result);
  };

  const submitSession = (form) => {
    form.preventDefault();
    findSession();
  };

  useEffect(() => {}, [result]);

  return (
    <AnimatedContainer>
      <AppTitle>Welcome to the Entrance</AppTitle>
      <video width="320" height="240" autoPlay muted loop>
        <source src="/vote-hero.mp4" type="video/mp4" />
      </video>
      {!result ? (
        <Form onSubmit={(e) => submitSession(e)}>
          <Section>
            <Text>Input session Id</Text>
            <Input type={"number"} ref={sessionRef} />
          </Section>
          <Section>
            <Submit type={"submit"} value="Find Session" />
          </Section>
        </Form>
      ) : (
        <Section>
          <Link
            href={{
              pathname: "/app/sessions/[sessionId]",
              query: { sessionId: sessionRef.current.value },
            }}
          >
            <Button width={"10rem"} height={"3rem"}>
              Go to Session
            </Button>
          </Link>
        </Section>
      )}
    </AnimatedContainer>
  );
}
