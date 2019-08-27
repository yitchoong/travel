import {Constants} from '../actions/quoteActionCreators'
const quoteInitialState = {
  tripType:'single', 
  countries:[],
  isOneWay:false, 
  travelDates:[], 
  couponCode:'', 
  adultCount:1, 
  childrenCount:0, 
  isTransitTraveller:false, 
  groupOrFamily:'', 
  totalPremium:[0,0,0], 
  planType:'entry' ,
  recommendedPlan: 'entry',
  productCode: '',
  quoteDate: undefined
}
const initState = () => {
  return Object.assign({}, quoteInitialState, {quoteDate: new Date()})
}

const quoteReducer = (state = quoteInitialState, action) => {
    switch (action.type) {
      case Constants.QUOTE_INIT:
        return initState()
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
  export { quoteInitialState }