import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import {
  Button,
  Container,
  Text,
  Title,
} from "../styles/styled-components/home/homeComponents";

const NotConnected = () => {
  const setAccount = useContext(AppContext).setAccount;
  async function connectAccount() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
    }
  }
  return (
    <Container>
      <Title>Connect Your Wallet</Title>
      <Button onClick={connectAccount}>Connect</Button>
      <Text>you need to connect your wallet first to access the site.</Text>
    </Container>
  );
};

export default NotConnected;
