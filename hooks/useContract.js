import React from "react";
import { ethers } from "ethers";
import VotingABI from "../abi/Voting.json";
import VoterDataABI from "../abi/VoterDataMerkle.json";
import BallotABI from "../abi/BallotToken.json";

const votingContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.VOTING_CONTRACT_ADDRESS,
    VotingABI.abi,
    provider.getSigner()
  );

  return contract;
};

const voterDataContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.VOTER_DATA_CONTRACT_ADDRESS,
    VoterDataABI.abi,
    provider.getSigner()
  );

  return contract;
};

const useContract = (value) => {
  const contract = new Map([
    ["voting", votingContract()],
    ["voterData", voterDataContract()],
  ]);
  return contract.get(value);
};

export default useContract;
