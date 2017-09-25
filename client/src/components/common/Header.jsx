import React from "react";
import PropTypes from "prop-types";

import { AppBar } from "material-ui";


const Header = ({ history }) => (
  <div>
    <AppBar
      title="PUBG Stats"
      titleStyle={{ "cursor": "pointer" }}
      onTitleTouchTap={() => history.push("/")}
    />
  </div>
);

Header.propTypes = {
  "history": PropTypes.object.isRequired,
};

export default Header;
