import React from "react";
import PropTypes from "prop-types";

import { Card, CardActions, CardText, CardTitle, FlatButton } from "material-ui";


const Home = ({ history }) => (
  <Card>
    <CardTitle title="Welcome to my PUBG Stats Stream Overlay Creator" />
    <CardText>
      This site now requires account creation. Please login or register using the links below.
    </CardText>
    <CardActions>
      <FlatButton
        primary
        label="Register"
        onClick={history.push("/register")}
      />
      <FlatButton
        secondary
        label="Login"
        onClick={history.push("/login")}
      />
    </CardActions>
  </Card>
);

Home.propTypes = {
  "history": PropTypes.object.isRequired,
};

export default Home;
