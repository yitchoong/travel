import {Constants} from '../actions/proposalActionCreators'

const range = n => Array(n + 1).join(1).split('').map((x, i) => i) // range(3) => gives us [0,1,2]

const initialState = (props) => {
    const {addons} = props
    const {
      couponCode, 
      adultCount, 
      travelDates,
      childrenCount, 
      planType,
      productCode    
    } = props.quote
    const count = (adultCount || 2) + (childrenCount || 0)

    const addonList = addons.map( addon => ({label:addon.label, amount: addon.amount, selected:false,name:addon.value}) )

    const traveller =  {
            nric: '',
            fullName: '',
            dob: '',
            gender: '',
            phoneNumber: '',
            email: '',
            postalCode: '',
            street: '',
            unitNumber: '',
            blockNumber: '',
            addons: Object.assign([],addonList),
            preExAmount: 47.55,
            hasPreExCondition: false,
    }
    const travellers = range(count).map( idx => Object.assign({},traveller))
    


    // return {proposalDate: new Date(), travellers, pdpaAgree: false, pdpaPhone: false, pdpaSms: false}
    return {
      proposalDate: new Date(), 
      travelDates: travelDates,
      productCode: productCode,
      planType: planType || 'entry',
      travellers, 
      pdpaAgree: false, 
      pdpaPhone: false, 
      pdpaSms: false,
      departureFlightNo: '',
      arrivalFlightNo: '',
      paymentOption: '',
      ddaAgree: false,
      dealCode: '',
      couponCode: couponCode || '',
      referralCode: '',
      totalPremium: 0,
      quoteData: props.quote
    }

}

const proposalReducer = (state = initialState(1), action) => {
    switch (action.type) {
      case Constants.PROPOSAL_INIT:
        console.log("Proposal Init *******", action.props)
        return initialState(action.props)
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
  