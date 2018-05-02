export const CHANGE_LANGUAGE = "redux-multilanguage/CHANGE_LANGUAGE";
export function changeLanguage(languageCode) {
  return {
    type: CHANGE_LANGUAGE,
    languageCode
  };
}

export const LOAD_LANGUAGES = "redux-multilanguage/LOAD_LANGUAGES";
export function loadLanguages({ languages }) {
  return {
    type: LOAD_LANGUAGES,
    languages
  };
}
