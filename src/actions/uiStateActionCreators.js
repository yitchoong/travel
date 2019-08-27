export const Constants = {
    UI_STATE_INIT: "UI_STATE_INIT",
    UI_STATE_UPDATE: "UI_STATE_UPDATE",
    UI_STATE_SET_CURRENT_STAGE: "UI_STATE_SET_CURRENT_STAGE",
    UI_STATE_SET_CURRENT_PAGE: "UI_STATE_SET_CURRENT_PAGE",
    UI_STATE_UPDATE_CUSTOMER: "UI_STATE_UPDATE_CUSTOMER",
    UI_STATE_FETCH_CUSTOMER: "UI_STATE_FETCH_CUSTOMER",
    UI_STATE_SAVE_CUSTOMER: "UI_STATE_SAVE_CUSTOMER",
    UI_STATE_SET_MESSAGE: "UI_STATE_SET_MESSAGE",
    UI_STATE_SET_TRAVELLER: "UI_STATE_SET_TRAVELLER",
    UI_STATE_PREV_SAVED: "UI_STATE_PREV_SAVED",

};

export const initUiState = (uiState) => ({ type: Constants.UI_STATE_INIT, uiState})

export const updateUiState = (uiState) => ({ type: Constants.UI_STATE_UPDATE, uiState})

export const setCurrentStage = (stage) => ({ type: Constants.UI_STATE_SET_CURRENT_STAGE, stage})

export const setCurrentPage = (page) => ({ type: Constants.UI_STATE_SET_CURRENT_PAGE, page})

export const updateUiStateCustomer = (customer) => ({ type: Constants.UI_STATE_UPDATE_CUSTOMER, customer})

export const setMessage = (msg) => ({ type: Constants.UI_STATE_SET_MESSAGE, message:msg})

export const clearMessage = () => ({ type: Constants.UI_STATE_SET_MESSAGE, message:''})

export const setTraveller = (travellerNo) => ({ type: Constants.UI_STATE_SET_TRAVELLER, travellerNo})

export const setPrevSaved = (prevSaved) => ({ type: Constants.UI_STATE_PREV_SAVED, prevSaved})

// this one is special, async --> makes use of thunk

export const fetchCustomer = (username, password) => {

    const login = async (username, password) => {
        
        // mock data
        const data = {
            customer : {
                nric: 'S7282777J',
                fullName: 'Jennifer Lim Doe',
                dob: new Date('1985-12-16'),
                gender: 'F',
                phoneNumber: '+65 83756430',
                email: 'jenifer@gmail.com',
                postalCode: '479265',
                street: '738 Bedok Resovoir Road',
                unitNumber: '#02-16',
                blockNumber: '465'

            },
            relations: [
                {
                    nric: 'S837992K',
                    fullName: 'John Doe',
                    dob: new Date('1986-02-11'),
                    gender: 'M',
                    phoneNumber: '86276372',
                    email: 'john.doe@gmail.com',
                    postalCode: '479265',
                    street: '738 Bedok Resovoir Road',
                    unitNumber: '#02-16',
                    blockNumber: '465'
                },
                {
                    nric: 'S7282782A',
                    fullName: 'Jake Doe',
                    dob: '22/2/2001',
                    gender: 'M',
                    phoneNumber: '98273822',
                    email: 'jake.doe@yahoo.com',
                    postalCode: '479265',
                    street: '738 Bedok Resovoir Road',
                    unitNumber: '#02-16',
                    blockNumber: '465'
                },
                {
                    nric: 'S7282980B',
                    fullName: 'Aleena Doe',
                    dob: '02/09/2001',
                    gender: 'F',
                    phoneNumber: '87889221',
                    email: 'aleena.doe@hotmail.com',
                    postalCode: '479265',
                    street: '738 Bedok Resovoir Road',
                    unitNumber: '#02-16',
                    blockNumber: '465'

                },
    
            ]
        }

        return new Promise(resolve => {
          setTimeout(() => {
            resolve(data);
        }, 100);
        })
    }

    return async (dispatch, getState) => {
        console.log("state inside fetchCustomer", getState())
        const customerData = await login()        
        dispatch(updateUiStateCustomer(customerData))
    }
}

// simulate a call to backend
export const saveCustomer = (customerData) => {

    const save = async (customerData) => {
        
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({'status':'ok'});
        }, 100);
        })
    }


    return async (dispatch, getState) => {
        console.log("state inside saveCustomer", getState())
        const info = await save(customerData)        
        dispatch(setMessage(info.status))
    }
}





