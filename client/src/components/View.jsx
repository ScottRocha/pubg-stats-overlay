import React from "react";
import PropTypes from "prop-types";

import WebfontLoader from "@dr-kobros/react-webfont-loader";

import StatTypes from "../helpers/statTypes";


const style = (view = "", width, height, fontFamily, fontSize) => {

  return {
    "width": "100vw",
    "height": "100vh",
    "textAlign": "center",
    "verticalAlign": "middle",
    "lineHeight": "100vh",
    fontFamily,
    fontSize,
  };


};


const View = ({ data, width, height }) => (
  <div>
    { data.font_type ? <WebfontLoader config={{ "google": { "families": [data.font_type] } }} /> : <div /> }
    <div key={"view-" + data.view + "-font-" + (data.font_size || 12)} style={style(data.view, width, height, data.font_type ? data.font_type.replace("+", " ") : "Roboto", data.font_size || 12)}>
      {(data.stat_with_name ? StatTypes[data.stat_type] + ": " : "") + (data.view || "")}
    </div>
  </div>

);

View.propTypes = {
  "data": PropTypes.object.isRequired,
  "width": PropTypes.number.isRequired,
  "height": PropTypes.number.isRequired,
};

export default View;

