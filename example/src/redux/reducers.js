import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
/**
 * This place is to register all reducers of the app.
 */

export default combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" })
});
