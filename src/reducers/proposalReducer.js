import {Constants} from '../actions/quoteActionCreators'
const initialState = {
    travellers: [
        {
            nric: '',
            fullName: '',
            dob: '',
            gender: '',
            phoneNumber: '',
            email: '',
            postalCode: '',
            street: '',
            unitNumber: '',
            blockNumber: ''
        }
    ]
}

const proposalReducer = (state = initialState, action) => {
    switch (action.type) {
      case Constants.PROPOSAL_INIT:
        return initialState
      case Constants.PROPOSAL_UPDATE:
        return Object.assign({}, action.proposal)
      case Constants.PROPOSAL_FETCH:
      case Constants.PROPOSAL_SAVE:
          return state
      default:
        return state;
    }
  };
  
  export default proposalReducer
  