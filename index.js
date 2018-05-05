import multilanguage from "./hoc/multilanguage.js";
import { changeLanguage, loadLanguages } from "./actions";
import multilanguageReducer, {
  createMultilanguageReducer
} from "./reducers/multilanguage.js";

export {
  multilanguage,
  createMultilanguageReducer,
  changeLanguage,
  loadLanguages,
  multilanguageReducer
};
