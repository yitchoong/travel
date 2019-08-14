
import * as quoteImports from './quoteActionCreators'
import * as uiImports from './uiStateActionCreators'
import * as proposalImports from './proposalActionCreators'


const { Constants:QuoteConstants, ...quoteActionCreatorList} = quoteImports
const { Constants:UiConstants, ...uiStateActionCreatorList} = uiImports
const { Constants:ProposalConstants, ...proposalActionCreatorList} = proposalImports


const bindActionCreators = (dispatch, actionsMap) => {
    const boundActions = {}
    Object.keys(actionsMap).forEach(key => {
        const fn = actionsMap[key]
        boundActions[key] = (...args) => dispatch(fn(...args))
    })
    return boundActions
}

export const quoteActions = (dispatch) => {
    const quoteActionCreators = bindActionCreators(dispatch, quoteActionCreatorList)
    return Object.assign({}, quoteActionCreators)
}

export const uiStateActions = (dispatch) => {
    const uiStateActionCreators = bindActionCreators(dispatch, uiStateActionCreatorList)
    return Object.assign({},  uiStateActionCreators)
}
export const proposalActions = (dispatch) => {
    const proposalActionCreators = bindActionCreators(dispatch, proposalActionCreatorList)
    return Object.assign({}, proposalActionCreators)
}


