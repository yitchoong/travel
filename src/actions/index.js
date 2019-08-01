
import * as quoteImports from './quoteActionCreators'
import * as uiImports from './uiStateActionCreators'


const { Constants:QuoteConstants, ...quoteActionCreatorList} = quoteImports
const { Constants:UiConstants, ...uiStateActionCreatorList} = uiImports


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

