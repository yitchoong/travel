export const Constants = {
    UI_STATE_INIT: "UI_STATE_INIT",
    UI_STATE_UPDATE: "UI_STATE_UPDATE",
    UI_STATE_SET_CURRENT_STAGE: "UI_STATE_SET_CURRENT_STAGE",
    UI_STATE_SET_CURRENT_PAGE: "UI_STATE_SET_CURRENT_PAGE"
};

export const initUiState = (uiState) => ({ type: Constants.UI_STATE_INIT, uiState})

export const updateUiState = (uiState) => ({ type: Constants.UI_STATE_UPDATE, uiState})

export const setCurrentStage = (stage) => ({ type: Constants.UI_STATE_SET_CURRENT_STAGE, stage})

export const setCurrentPage = (page) => ({ type: Constants.UI_STATE_SET_CURRENT_PAGE, page})




