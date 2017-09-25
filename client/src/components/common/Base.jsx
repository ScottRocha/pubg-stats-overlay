import React from "react";
import PropTypes from "prop-types";

import { Switch } from "react-router-dom";

import Footer from "./Footer";
import HeaderPage from "../../containers/common/HeaderPage";

// insert module CSS
import "react-table/react-table.css";
import "react-select-plus/dist/react-select-plus.css";


const Base = ({ childrenWithProps, history, isAuthenticated }) => (
  <div>
    <HeaderPage isAuthenticated={isAuthenticated} history={history} />

    <div className="middle-content">
      <Switch>
        {childrenWithProps}
      </Switch>
    </div>

    <Footer />
  </div>
);

Base.propTypes = {
  "childrenWithProps": PropTypes.array.isRequired,
  "history": PropTypes.object.isRequired,
  "isAuthenticated": PropTypes.bool.isRequired,
};

export default Base;
