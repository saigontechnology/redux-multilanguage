export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE"
export function changeLanguage(languageCode){
    return {
        type: CHANGE_LANGUAGE,
        languageCode
    }
}