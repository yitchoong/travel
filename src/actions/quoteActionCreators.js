export const Constants = {
    QUOTE_INIT: "QUOTE_INIT",
    QUOTE_UPDATE: "QUOTE_UPDATE",
    QUOTE_SAVE: "QUOTE_SAVE",
    QUOTE_FETCH: "QUOTE_FETCH"
};

export const initQuote = () => ({ type: Constants.QUOTE_INIT})

export const updateQuote = (quote) => ({ type: Constants.QUOTE_UPDATE, quote})

export const saveQuote = (quote) => ({ type: Constants.QUOTE_SAVE, quote})

// this one is special, async --> makes use of thunk

export const fetchQuote = (id) => {

    const fetchById = async (id) => {
        // mock

        const data = {id:1, tripType:'single', countries:"Malaysia,Thailand",isOneWay:false, departureDate:'', arrivalDate:'', couponCode:'12345', adultCount:2, childrenCount:0, isTransitTraveller:false, groupOrFamily:'', totalPremium:0, planType:'Entry' }
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(data);
        }, 500);
        })
    }

    return async (dispatch, getState) => {
        console.log("state inside fetchQuote", getState())
        const quote = await fetchById()        
        dispatch(updateQuote(quote))
    }
}



