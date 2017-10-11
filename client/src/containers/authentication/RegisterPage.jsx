import React from "react";

import RegisterForm from "../../components/authentication/RegisterForm";

import { registerUser } from "../../datastore/actions/authentication";
import { checkUnAuth } from "../../helpers/auth";


export default class RegisterPage extends React.Component {

  /*
   * Class constructor.
   */
  constructor(props, context) {

    super(props, context);

    if (props.user && props.user.userid) {

      this.props.history.push("/");

    }

    this.processForm = this.processForm.bind(this);

    this.state = {
      "email": "",
      "password": "",
      "passwordConf": "",
      "firstName": "",
      "lastName": "",
      "submitted": false,
    };

  }

  componentWillMount() {

    checkUnAuth(this.props);

  }

  processForm(event) {

    event.preventDefault();

    const self = this;

    if (self.state.email && self.state.password && self.state.passwordConf
      && self.state.password === self.state.passwordConf && self.state.firstName && self.state.lastName) {

      self.setState({
        "submitted": true,
      }, () => {

        self.props.dispatch(registerUser(self.state.email, self.state.password, self.state.firstName, self.state.lastName))
          .then(() => {

            self.props.history.push("/stats");

          }).catch((err) => {

            self.setState({ "error": err.error });

          });

      });

    }

  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

  }

  /*
   * Render the component.
   */
  render() {

    return (
      <RegisterForm
        onSubmit={this.processForm.bind(this)}
        onInputChange={this.handleInputChange.bind(this)}
        email={this.state.email}
        password={this.state.password}
        passwordConf={this.state.passwordConf}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        submitted={this.state.submitted}
        error={this.state.error}
      />
    );

  }

}
