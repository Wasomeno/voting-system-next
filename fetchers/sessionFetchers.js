import useContract from "../hooks/useContract";

export const getStatus = async (session, user) => {
  const votingContract = useContract("voting");
  const status = await votingContract.voterVerified(session, user);
  return status;
};

export const getDetails = async (session) => {
  const votingContract = useContract("voting");
  const details = await votingContract.votingDetails(session);
  return details;
};

export const getCandidates = async (session) => {
  const votingContract = useContract("voting");
  const candidates = await votingContract.getCandidatesDetails(session);
  return candidates;
};

export const getHistory = async (session) => {
  const votingContract = useContract("voting");
  const history = await votingContract.getHistory(session);
  return history;
};

export const getIsProposer = async (context) => {
  console.log("Hellow");
  const votingContract = useContract("voting");
  const result = await votingContract.verifiedProposer(context.user);
  return result;
};
