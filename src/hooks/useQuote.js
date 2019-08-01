import { useReducer } from "react";
import { quoteReducer } from "../reducers";
import { quoteActions }  from "../actions";
import { withMiddleware, logger, thunk} from "../middleware";

export default function useQuote() {
  const [quote, quoteDispatch] = useReducer(quoteReducer, {});
  const wrappedQuoteDispatch = withMiddleware(quote, quoteDispatch)(logger,thunk )
  const { initQuote, updateQuote, fetchQuote, saveQuote } = quoteActions(wrappedQuoteDispatch);

  return {
    quote,
    initQuote,
    updateQuote,
    fetchQuote,
    saveQuote
  };
}
