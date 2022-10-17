import React from "react";
import { Section } from "../styles/styled-components/app/appComponents";
import {
  Container,
  Text,
  Title,
} from "../styles/styled-components/home/homeComponents";

const About = () => {
  return (
    <Container>
      <Title>About</Title>
      <Section>
        <Text>
          a Simple Voting App that i made with Next.js and Ethereum Smart
          Contract
        </Text>
      </Section>
    </Container>
  );
};

export default About;
