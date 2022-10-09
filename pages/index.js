import Link from "next/link";
import {
  Title,
  Subtitle,
  Container,
  Button,
} from "../styles/styled-components/home/homeComponents";

export default function Home() {
  return (
    <Container>
      <Title>Decentralize Voting System</Title>
      <Subtitle>Better than the Centralize one.</Subtitle>
      <Link href="/app">
        <Button>Go to App </Button>
      </Link>
    </Container>
  );
}
