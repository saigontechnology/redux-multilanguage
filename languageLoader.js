class LanguageLoader{
    constructor(){
        this.languages = []
    }

    load({languages}){
        this.languages = languages
    }
    getLanguage(languageCode){
        if (this.languages.hasOwnProperty(languageCode)){
            return this.languages[languageCode]
        }else{
            console.error('Current loaded languages:', this.languages)
            throw `[LanguageLoader]: No language for language code '${languageCode}'`
        }
    }
}

const languageLoader = new LanguageLoader()
export default languageLoader