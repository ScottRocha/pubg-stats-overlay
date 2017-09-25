import React from "react";

import Home from "../components/Home";
import { checkKey } from "../datastore/actions/authentication";


class HomePage extends React.Component {

  constructor(props) {

    super(props);

    this.state = { "apiKey": "" };

  }

  onAPIKeyChange(event) {

    this.setState({ "apiKey": event.target.value });

  }

  onAPIKeySubmit() {

    const self = this;

    self.props.dispatch(checkKey(self.state.apiKey))
      .then(() => {

        self.props.history.push("/stats");

      }).catch((err) => {

        self.setState({
          "apiKeyError": err.message,
        });

      });

  }

  render() {

    return (
      <Home
        apiKey={this.state.apiKey}
        apiKeyError={this.state.apiKeyError}
        onAPIKeyChange={this.onAPIKeyChange.bind(this)}
        onAPIKeySubmit={this.onAPIKeySubmit.bind(this)}
      />
    );

  }

}

export default HomePage;
