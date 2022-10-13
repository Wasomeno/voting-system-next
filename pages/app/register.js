import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import React, { useContext, useEffect, useRef, useState } from "react";
import AnimatedContainer from "../../components/AnimatedContainer";
import AppContext from "../../context/AppContext";
import useContract from "../../hooks/useContract";
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
  const detailsRef = useRef([session, username, secret]);
  const toast = useContext(AppContext).toast;
  const votingContract = useContract("voting");
  const voterDataContract = useContract("voterData");
  const registerMutations = useMutation((event) => submitRegistration(event));

  const merklePrep = () => {
    const leaf = detailsRef.current.map((value) => {
      return value.current.value;
    });
    const leafBytes = "0x" + keccak256(leaf).toString("hex");
    const leaves = [
      leafBytes,
      "0xcfee7c08a98f4b565d124c7e4e28acc52e1bc780e3887db0a02a7d2d5bc66728",
    ];
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const treeRoot = "0x" + tree.getRoot().toString("hex");

    return { leafBytes, treeRoot };
  };

  const submitRegistration = async (form) => {
    form.preventDefault();
    const isExist = await votingContract.checkSession(session.current.value);
    if (isExist) {
      const { leafBytes, treeRoot } = merklePrep();
      const register = await voterDataContract.addLeaf(
        session.current.value,
        leafBytes,
        treeRoot
      );
      return register;
    } else {
      toast.error("Session Not Exist");
    }
  };

  useEffect(() => {}, []);

  return (
    <AnimatedContainer>
      <AppTitle>Register to Session</AppTitle>
      <Form onSubmit={(event) => registerMutations.mutate(event)}>
        <Section>
          <Text align={"center"}>Voting Session ID</Text>
          <Input ref={detailsRef.current[0]} type={"number"} width={"15rem"} />
        </Section>

        <Section>
          <Text align={"center"}>Username</Text>
          <Input type={"text"} width={"15rem"} ref={detailsRef.current[1]} />
        </Section>

        <Section>
          <Text align={"center"}>Secret</Text>
          <Input type={"number"} width={"15rem"} ref={detailsRef.current[2]} />
        </Section>
        <FlexRow justifyContent={"center"}>
          <Submit type={"submit"} />
        </FlexRow>
      </Form>
    </AnimatedContainer>
  );
};

export default register;
