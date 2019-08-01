import { useReducer } from "react";
import { uiStateReducer } from "../reducers";
import { uiStateActions }  from "../actions";
import { withMiddleware, logger, thunk} from "../middleware";

export default function useUiState() {
  const [uiState, uiStateDispatch] = useReducer(uiStateReducer, {});
  const wrappedUiStateDispatch = withMiddleware(uiState, uiStateDispatch)(logger,thunk )
  const { initUiState, updateUiState, setCurrentStage, setCurrentPage } = uiStateActions(wrappedUiStateDispatch);

  return {
    uiState, initUiState, updateUiState, setCurrentStage, setCurrentPage
  };
}
