import {Constants} from '../actions/quoteActionCreators'
const initialState = {
  tripType:'single', 
  countries:[],
  isOneWay:false, 
  travelDates:[], 
  couponCode:'', 
  adultCount:2, 
  childrenCount:1, 
  isTransitTraveller:false, 
  groupOrFamily:'', 
  totalPremium:[0,0,0], 
  planType:'entry' ,
}

const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case Constants.QUOTE_INIT:
        return initialState
      case Constants.QUOTE_UPDATE:
        return Object.assign({}, action.quote)
      case Constants.QUOTE_FETCH:
      case Constants.QUOTE_SAVE:
          return state
      default:
        return state;
    }
  };
  
  export default quoteReducer
  