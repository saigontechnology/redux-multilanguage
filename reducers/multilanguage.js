import { CHANGE_LANGUAGE, LOAD_LANGUAGES } from "../actions";

const initialState = {
  currentLanguageCode: "en",
  languages: {
    en: {}
  }
};

function multilanguage(state = initialState, action) {
  switch (action.type) {
    case LOAD_LANGUAGES:
      return {
        ...state,
        languages: {
          ...state.languages,
          ...action.languages
        }
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        currentLanguageCode: action.languageCode
      };
    default:
      return state;
  }
}
export default multilanguage;

export function createMultilanguageReducer(_initialState) {
  return (state = { ...initialState, ..._initialState }, action) => {
    return multilanguage(state, action);
  };
}
