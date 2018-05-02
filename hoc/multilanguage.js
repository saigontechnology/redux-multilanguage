import React from "react";
import { connect } from "react-redux";

/**
 *  A higer-order component for multilanguage. See usage instruction in ../index.js
 */
export default function multilanguage(WrappedComponent) {
  return connect(state => {
    const currentLanguageCode = state.multilanguage.currentLanguageCode;
    const strings = state.multilanguage.languages[currentLanguageCode];
    return {
      currentLanguageCode,
      strings
    };
  })(WrappedComponent);
}
