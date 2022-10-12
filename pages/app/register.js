import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../context/AppContext";
import {
  AppContainer,
  AppTitle,
  FlexRow,
  Form,
  Input,
  Section,
  Submit,
  Text,
} from "../../styles/styled-components/app/appComponents";

const register = () => {
  const session = useRef();
  const username = useRef();
  const secret = useRef();
  const detailsRef = useRef({ session, username, secret });

  const toast = useContext(AppContext).toast;

  const submitRegistration = (form) => {
    form.preventDefault();
    toast.success("Test");
  };

  useEffect(() => {}, []);

  return (
    <AppContainer>
      <AppTitle>Register to Session</AppTitle>
      <Form onSubmit={(e) => submitRegistration(e)}>
        <Section>
          <Text align={"center"}>Voting Session ID</Text>
          <Input
            ref={detailsRef.current.session}
            type={"number"}
            width={"15rem"}
          />
        </Section>

        <Section>
          <Text align={"center"}>Username</Text>
          <Input
            type={"text"}
            width={"15rem"}
            ref={detailsRef.current.username}
          />
        </Section>

        <Section>
          <Text align={"center"}>Secret</Text>
          <Input
            type={"number"}
            width={"15rem"}
            ref={detailsRef.current.secret}
          />
        </Section>
        <FlexRow justifyContent={"center"}>
          <Submit type={"submit"} />
        </FlexRow>
      </Form>
    </AppContainer>
  );
};

export default register;
