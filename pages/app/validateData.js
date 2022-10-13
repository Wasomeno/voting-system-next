import { useMutation } from "@tanstack/react-query";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import { useRouter } from "next/router";
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

const validateData = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const usernameRef = useRef();
  const secretRef = useRef();
  const toast = useContext(AppContext).toast;
  const votingContract = useContract("voting");
  const voterDataContract = useContract("voterData");
  const validateMutation = useMutation((event) => submitData(event));

  const merklePrep = async () => {
    const leaf = [
      sessionId,
      usernameRef.current.value,
      secretRef.current.value,
    ];

    const leafBytes = "0x" + keccak256(leaf).toString("hex");
    const leaves = await voterDataContract.getLeaves(sessionId);
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const proofs = tree.getProof(leafBytes).map((proof) => {
      return "0x" + proof.data.toString("hex");
    });
    return { leafBytes, proofs };
  };

  const submitData = async (form) => {
    form.preventDefault();
    const { leafBytes, proofs } = await merklePrep();
    const validate = await votingContract.verifyVoter(
      sessionId,
      proofs,
      leafBytes
    );
    return validate;
  };

  useEffect(() => {
    toast.error("You are not verified");
  }, []);

  return (
    <AnimatedContainer>
      <AppTitle>Validate your Data</AppTitle>
      <Text margin={"5px 5px"}>(Session {sessionId})</Text>
      <Form onSubmit={(event) => validateMutation.mutate(event)}>
        <Section>
          <Text align={"center"}>Username</Text>
          <Input type={"text"} width={"15rem"} ref={usernameRef} />
        </Section>

        <Section>
          <Text align={"center"}>Secret</Text>
          <Input type={"number"} width={"15rem"} ref={secretRef} />
        </Section>
        <FlexRow justifyContent={"center"}>
          <Submit type={"submit"} />
        </FlexRow>
      </Form>
    </AnimatedContainer>
  );
};

export default validateData;
