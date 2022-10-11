import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useContract from "../../../hooks/useContract";
import {
  AppContainer,
  AppTitle,
  Section,
} from "../../../styles/styled-components/app/appComponents";

const Session = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const votingContract = useContract("voting");

  const getDetails = async () => {
    const fetchedDetails = await votingContract.votingDetails(sessionId);
    setDetails(fetchedDetails);
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <AppContainer>
      <Section>
        {!loading ? (
          <AppTitle>{ethers.utils.parseBytes32String(details.title)}</AppTitle>
        ) : (
          <AppTitle>Loading</AppTitle>
        )}
      </Section>
    </AppContainer>
  );
};

export default Session;
