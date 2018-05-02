import React from "react";
import {
  languageLoader,
  multilanguage,
  changeLanguage,
  loadLanguages
} from "redux-multilanguage";
import { connect } from "react-redux";

class App extends React.Component {
  state = { language: "en" };
  componentDidMount() {
    this.loadLanguages();
  }
  loadLanguages() {
    // You can lazily load the languages on demand or just import them directly
    this.props.dispatch(
      loadLanguages({
        languages: {
          vi: require("./languages/vi.json"),
          en: require("./languages/en.json")
        }
      })
    );
  }
  changeLanguage = e => {
    const languageCode = e.target.value;
    this.props.dispatch(changeLanguage(languageCode));
  };
  render() {
    const { strings, currentLanguageCode } = this.props;
    return (
      <div>
        <h1>{strings["title"]}</h1>
        Change language:{" "}
        <select value={currentLanguageCode} onChange={this.changeLanguage}>
          <option value="en">en</option>
          <option value="vi">vi</option>
        </select>
      </div>
    );
  }
}
export default connect()(multilanguage(App));
