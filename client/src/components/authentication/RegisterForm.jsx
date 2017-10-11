import React from "react";
import PropTypes from "prop-types";
import { Card, CardActions, CardHeader, CardMedia, RaisedButton, TextField } from "material-ui";

const RegisterForm = ({
  email, password, passwordConf,
  firstName, lastName, submitted,
  error, onSubmit, onInputChange,
}) => (
 <Card className="centered-card">
    <CardHeader
      title="Registration Page"
      subtitle="Please enter your information to register for our service"
      textStyle={{ "padding": "0px" }}
    />
    <CardMedia>
      <div style={{ "color": "red", "fontWeight": "bold" }}>
        {!error || error.message}
      </div>
      <div>
        <TextField
          name="email"
          label="Email"
          floatingLabelText="Email"
          value={email}
          onChange={onInputChange}
          errorText={!email && submitted && "This field is required"}
        />
      </div>
      <div>
        <TextField
          name="password"
          label="Password"
          floatingLabelText="Password"
          type="password"
          value={password}
          onChange={onInputChange}
          errorText={!password && submitted && "This field is required"}
        />
      </div>
      <div>
        <TextField
          name="passwordConf"
          label="Password Confirmation"
          floatingLabelText="Password Confirmation"
          type="password"
          value={passwordConf}
          onChange={onInputChange}
          errorText={!passwordConf && submitted && "This field is required" || passwordConf !== password && "These passwords don't match. Try again?"}
        />
      </div>
      <div>
        <TextField
          name="firstName"
          label="First Name"
          floatingLabelText="First Name"
          value={firstName}
          onChange={onInputChange}
          errorText={!firstName && submitted && "This field is required"}
        />
      </div>
      <div>
        <TextField
          name="lastName"
          label="Last Name"
          floatingLabelText="Last Name"
          value={lastName}
          onChange={onInputChange}
          errorText={!lastName && submitted && "This field is required"}
        />
      </div>
    </CardMedia>
    <CardActions>
      <RaisedButton label="Submit" onTouchTap={onSubmit} secondary={true} fullWidth={true} />
    </CardActions>
  </Card>
);

RegisterForm.propTypes = {
  "email": PropTypes.string.isRequired,
  "password": PropTypes.string.isRequired,
  "passwordConf": PropTypes.string.isRequired,
  "firstName": PropTypes.string.isRequired,
  "lastName": PropTypes.string.isRequired,
  "submitted": PropTypes.bool.isRequired,
  "error": PropTypes.object,
  "onSubmit": PropTypes.func.isRequired,
  "onInputChange": PropTypes.func.isRequired,
};

export default RegisterForm;
