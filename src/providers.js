import React, { useContext } from "react";
import useQuote from "./hooks/useQuote";
import useUiState from "./hooks/useUiState";

const StateContext = React.createContext(undefined);

export const StateProvider = ({ children }) => {
  const appState = {
    quote: useQuote(),
    uiState: useUiState(),
    // proposal: useProposal(), # to be added later on
  };
  return (
    <StateContext.Provider value={appState}>{children}</StateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(StateContext);
};

export const wrapRootElement = ({element}) => (<StateProvider>{element}</StateProvider>)