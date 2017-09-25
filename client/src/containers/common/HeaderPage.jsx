import React from "react";
import PropTypes from "prop-types";

import Header from "../../components/common/Header";


class HeaderPage extends React.Component {

  constructor(props) {

    super(props);

  }

  render() {

    return (
      <Header history={this.props.history} />
    );

  }

}

HeaderPage.propTypes = {
  "history": PropTypes.object.isRequired,
};

export default HeaderPage;
