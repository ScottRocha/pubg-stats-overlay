import React from "react";
import PropTypes from "prop-types";

import HeaderPage from "../../containers/common/HeaderPage";
import Footer from "./Footer";


const Loading = ({ history }) => (
  <div>
    <HeaderPage isAuthenticated={false} history={history} />

    <div className="middle-content container text-center">
      <h1>Loading...</h1>
    </div>

    <Footer />
  </div>
);

Loading.propTypes = {
  "history": PropTypes.object.isRequired,
};

export default Loading;
