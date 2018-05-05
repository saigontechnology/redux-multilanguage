import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

export default combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" })
});
