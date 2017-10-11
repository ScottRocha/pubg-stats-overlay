import React from "react";

import Home from "../components/Home";
import { checkUnAuth } from "../helpers/auth";


class HomePage extends React.Component {

  constructor(props) {

    super(props);

  }

  componentWillMount() {

    checkUnAuth(this.props);

  }

  render() {

    return (
      <Home history={this.props.history} />
    );

  }

}

export default HomePage;
