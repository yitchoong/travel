import { useReducer } from "react";
import { proposalReducer } from "../reducers";
import { proposalActions }  from "../actions";
import { withMiddleware, logger, thunk} from "../middleware";

export default function useQuote() {
  const [proposal, proposalDispatch] = useReducer(proposalReducer, {});
  let wrappedProposalDispatch;
  if (process.env.NODE_ENV === 'development') {
    wrappedProposalDispatch = withMiddleware(proposal, proposalDispatch)(logger,thunk )
  } else {
    wrappedProposalDispatch = withMiddleware(proposal, proposalDispatch)(thunk)
  }
  const { initProposal, updateProposal, fetchProposal, saveProposal } = proposalActions(wrappedProposalDispatch);

  return {
    proposal,
    initProposal,
    updateProposal,
    fetchProposal,
    saveProposal
  };
}
