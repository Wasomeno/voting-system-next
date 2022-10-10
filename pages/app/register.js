import React, { useEffect, useState } from "react";
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
  const [details, setDetails] = useState({
    session: "",
    username: "",
    secret: "",
  });

  const submitRegistration = (form) => {
    form.preventDefault();
  };

  const sessionInputHandler = (value) => {
    setDetails((currentDetails) => ({
      ...currentDetails,
      session: value,
    }));
  };

  const usernameInputHandler = (value) => {
    setDetails((currentDetails) => ({
      ...currentDetails,
      username: value,
    }));
  };

  const secretInputHandler = (value) => {
    setDetails((currentDetails) => ({
      ...currentDetails,
      secret: value,
    }));
  };

  useEffect(() => {}, []);

  return (
    <AppContainer>
      <AppTitle>Register to Session</AppTitle>
      <Form onSubmit={(e) => submitRegistration(e)}>
        <Section>
          <Text align={"center"}>Voting Session ID</Text>
          <Input
            type={"number"}
            width={"15rem"}
            value={details.session}
            onChange={(e) => sessionInputHandler(e.target.value)}
          />
        </Section>

        <Section>
          <Text align={"center"}>Username</Text>
          <Input
            type={"text"}
            width={"15rem"}
            value={details.username}
            onChange={(e) => usernameInputHandler(e.target.value)}
          />
        </Section>

        <Section>
          <Text align={"center"}>Secret</Text>
          <Input
            type={"number"}
            width={"15rem"}
            value={details.secret}
            onChange={(e) => secretInputHandler(e.target.value)}
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
