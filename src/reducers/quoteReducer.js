import {Constants} from '../actions/quoteActionCreators'

const quoteReducer = (state = {}, action) => {
    switch (action.type) {
      case Constants.QUOTE_INIT:
        return {
            tripType:'single', 
            countries:"",
            isOneWay:false, 
            departureDate:'', 
            arrivalDate:'', 
            couponCode:'', 
            adultCount:1, 
            childrenCount:0, 
            isTransitTraveller:false, 
            groupOrFamily:'', 
            totalPremium:0, 
            planType:'Entry' 
        }
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
  