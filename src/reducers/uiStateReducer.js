import {Constants} from '../actions/uiStateActionCreators'

const initialState = {
    page: '',
    stage: 1,
}
const uiStateReducer = (state = {}, action) => {

    switch (action.type) {
      case Constants.UI_STATE_INIT:
      case Constants.UI_STATE_UPDATE:
        return Object.assign({}, action.uiState)        
      case Constants.UI_STATE_SET_STAGE:
          return Object.assign({}, state, {stage:action.stage})        

      case Constants.UI_STATE_SET_PAGE:
          return Object.assign({}, state, {page:action.page})        

      default:
        return state;
    }
  };
  
  export default uiStateReducer