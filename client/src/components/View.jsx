import React from "react";
import PropTypes from "prop-types";

import WebfontLoader from "@dr-kobros/react-webfont-loader";

import StatTypes from "../helpers/statTypes";


const style = (view = "", fontFamily, fontSize) => {

  return {
    "position": "absolute",
    "top": "50%",
    "left": "50%",
    "marginLeft": "-" + (400 - view.toString().length / 2) + "px",
    "marginTop": "-300px",
    "width": "800px",
    "height": "600px",
    "textAlign": "center",
    "verticalAlign": "middle",
    "lineHeight": "600px",
    fontFamily,
    fontSize,
  };


};


const View = ({ data }) => (
  <div>
    { data.font_type ? <WebfontLoader config={{ "google": { "families": [data.font_type] } }} /> : <div /> }
    <div key={"view-" + data.view + "-font-" + (data.font_size || 12)} style={style(data.view, data.font_type ? data.font_type.replace("+", " ") : "Roboto", data.font_size || 12)}>
      {(data.stat_with_name ? StatTypes[data.stat_type] + ": " : "") + (data.view || "")}
    </div>
  </div>

);

View.propTypes = {
  "data": PropTypes.object.isRequired,
};

export default View;

