import {Constants} from '../actions/uiStateActionCreators'

const initialState = {
    page: '',
    stage: 1,
    message: '',
    travellerNo: 0,
    prevSavedMap: {},
    customerData: {
        customer: {},
        relations: []
    }
}
const uiStateReducer = (state = initialState, action) => {

    switch (action.type) {
        case Constants.UI_STATE_INIT:
        case Constants.UI_STATE_UPDATE:
            return Object.assign({}, action.uiState)        
        case Constants.UI_STATE_SET_STAGE:
            return Object.assign({}, state, {stage:action.stage})        
        case Constants.UI_STATE_SET_PAGE:
            return Object.assign({}, state, {page:action.page})        
        case Constants.UI_STATE_UPDATE_CUSTOMER:
            return Object.assign({},state, { customerData: action.customer})        
        case Constants.UI_STATE_SET_MESSAGE:
            return Object.assign({},state, { message: action.message})        
        case Constants.UI_STATE_SET_TRAVELLER:
            return Object.assign({},state, { travellerNo: action.travellerNo})        
        case Constants.UI_STATE_PREV_SAVED:
            return Object.assign({},state, { prevSavedMap: action.prevSaved})        
      default:
        return state;
    }
  };
  
  export default uiStateReducer