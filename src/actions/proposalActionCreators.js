export const Constants = {
    PROPOSAL_INIT: "PROPOSAL_INIT",
    PROPOSAL_UPDATE: "PROPOSAL_UPDATE",
    PROPOSAL_SAVE: "PROPOSAL_SAVE",
    PROPOSAL_FETCH: "PROPOSAL_FETCH"
};

export const initProposal = () => ({ type: Constants.PROPOSAL_INIT})

export const updateProposal = (proposal) => ({ type: Constants.PROPOSAL_UPDATE, proposal})

export const saveProposal = (proposal) => ({ type: Constants.PROPOSAL_SAVE, proposal})

// this one is special, async --> makes use of thunk

export const fetchProposal = (id) => {

    const fetchById = async (id) => {
        // mock
        const data = { 
            proposalDate: '',
            productCode: 'TiqTravel',
            travellers : [
            {
                nric: 'S1256897j',
                fullName: 'Jennifer Lim Doe',
                dob: '16/12/1985',
                gender: 'F',
                phoneNumber: '+65 83756430',
                email: 'Jennifer85@gmail.com',
                postalCode: '479265',
                street: '738 Bedok Resovoir Road',
                unitNumber: '#02-16',
                blockNumber: '276'                    
            },
            {
                nric: 'S1256899K',
                fullName: 'Michael Lim Joon Koong',
                dob: '16/09/1982',
                gender: 'M',
                phoneNumber: '+65 83756432',
                email: 'MichaelLimJK@gmail.com',
                postalCode: '479265',
                street: '738 Bedok Resovoir Road',
                unitNumber: '#02-16',
                blockNumber: '276'                    
            },
            {
                nric: 'S12568987K',
                fullName: 'Lim Soon Kheng',
                dob: '16/09/2017',
                gender: 'M',
                phoneNumber: '',
                email: 'sklim17@gmail.com',
                postalCode: '479265',
                street: '738 Bedok Resovoir Road',
                unitNumber: '#02-16',
                blockNumber: '276'                    
            }            
        ]}
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(data);
        }, 500);
        })
    }

    return async (dispatch, getState) => {
        console.log("state inside fetchProposal", getState())
        const proposal = await fetchById()        
        dispatch(updateProposal(proposal))
    }
}



