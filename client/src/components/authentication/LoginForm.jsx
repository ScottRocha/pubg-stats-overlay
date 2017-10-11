import React from "react";
import PropTypes from "prop-types";
import { Card, CardActions, CardHeader, CardMedia, RaisedButton, TextField } from "material-ui";

const LoginForm = ({ email, password, submitted, error, onSubmit, onInputChange }) => (
  <Card className="centered-card">
    <CardHeader
      title="Login Page"
      subtitle="Please enter your information to login"
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
    </CardMedia>
    <CardActions>
      <RaisedButton label="Submit" onTouchTap={onSubmit} secondary={true} fullWidth={true} />
    </CardActions>
  </Card>
);

LoginForm.propTypes = {
  "email": PropTypes.string.isRequired,
  "password": PropTypes.string.isRequired,
  "submitted": PropTypes.bool.isRequired,
  "error": PropTypes.object,
  "onSubmit": PropTypes.func.isRequired,
  "onInputChange": PropTypes.func.isRequired,
};

export default LoginForm;
