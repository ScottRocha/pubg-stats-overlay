import React from "react";

import LoginForm from "../../components/authentication/LoginForm";

import { loginUser } from "../../datastore/actions/authentication";
import { checkUnAuth } from "../../helpers/auth";


export default class LoginPage extends React.Component {

  constructor(props, context) {

    super(props, context);

    this.state = {
      "email": "",
      "password": "",
      "submitted": false,
      "error": {},
    };

  }

  componentWillMount() {

    checkUnAuth(this.props);

  }

  processForm(event) {

    event.preventDefault();

    const self = this;

    if (self.state.email && self.state.password) {

      self.setState({
        "submitted": true,
      }, () => {

        self.props.dispatch(loginUser(self.state.email, self.state.password))
          .then(() => {

            self.props.history.push("/stats");

          }).catch((err) => {

            self.setState({ "error": err.error });

          });

      });

    }

  }

  handleInputChange(event) {

    const newState = {
      [event.target.name]: event.target.value,
    };

    if (this.state.error) {

      newState.error = {};

    }

    this.setState(newState);

  }

  render() {

    return (
      <LoginForm
        onSubmit={this.processForm.bind(this)}
        onInputChange={this.handleInputChange.bind(this)}
        email={this.state.email}
        password={this.state.password}
        submitted={this.state.submitted}
        error={this.state.error}
      />
    );

  }

}
