import { useReducer } from "react";
import { uiStateReducer } from "../reducers";
import { uiStateActions }  from "../actions";
import { withMiddleware, logger, thunk} from "../middleware";

export default function useUiState() {
  const [uiState, uiStateDispatch] = useReducer(uiStateReducer, {});
  // const wrappedUiStateDispatch = withMiddleware(uiState, uiStateDispatch)(logger,thunk )
  let wrappedUiStateDispatch;
  if (process.env.NODE_ENV === 'development') {
    wrappedUiStateDispatch = withMiddleware(uiState, uiStateDispatch)(logger,thunk )
  } else {
    wrappedUiStateDispatch = withMiddleware(uiState, uiStateDispatch)(thunk)
  }

  const { initUiState, updateUiState, setCurrentStage, setCurrentPage, setTraveller, setPrevSaved,
    updateUiStateCustomer, setMessage, clearMessage, fetchCustomer, saveCustomer } = uiStateActions(wrappedUiStateDispatch);

  return {
    uiState, initUiState, updateUiState, setCurrentStage, setCurrentPage, setTraveller,
    updateUiStateCustomer, setMessage, clearMessage, fetchCustomer, saveCustomer, setPrevSaved
  };
}
