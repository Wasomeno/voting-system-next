import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useLoading, useToast } from "../stores/stores";
import {
  Button,
  Container,
  Text,
  Title,
} from "../styles/styled-components/home/homeComponents";

const NotConnected = () => {
  const setAccount = useContext(AppContext).setAccount;
  const [error] = useToast();
  const [, setLoading] = useLoading();
  const fetchedChain = useQuery(["chainId"], () => getChainId());

  const connectAccount = async () => {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
    }
  };

  async function getChainId() {
    const chainId = parseInt(
      await window.ethereum.request({ method: "eth_chainId" })
    );
    if (chainId !== 5) error("Wrong Chain");
    return chainId;
  }

  useEffect(() => {
    if (fetchedChain.isFetching) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fetchedChain.isLoading]);

  if (fetchedChain.isLoading) return;
  return (
    <>
      <Container
        as={motion.main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <Title>Connect Your Wallet</Title>
        <Button
          disabled={parseInt(fetchedChain.data) !== 5}
          onClick={connectAccount}
        >
          Connect
        </Button>
        {parseInt(fetchedChain.data) !== 5 ? (
          <Text>You're connected to the wrong network</Text>
        ) : (
          <Text>you need to connect your wallet first to access the site.</Text>
        )}
      </Container>
    </>
  );
};

export default NotConnected;
