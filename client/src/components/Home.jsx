import React from "react";
import PropTypes from "prop-types";

import { Card, CardActions, CardText, CardTitle, RaisedButton, TextField } from "material-ui";


const Home = ({ apiKey, apiKeyError, onAPIKeyChange, onAPIKeySubmit }) => (
  <Card>
    <CardTitle title="Welcome to my PUBG Stats Stream Overlay Creator" />
    <CardText>
      You must first obtain an API key from <a href={"https://pubgtracker.com/site-api/create"}>https://pubgtracker.com/site-api/create</a> as this site uses their API exclusively.
      <br />
      Once you get your API key please enter it below to begin.
    </CardText>
    <CardActions>
      <TextField
        minLength={36}
        floatingLabelText="PUBG Tracker API Key"
        value={apiKey}
        onChange={onAPIKeyChange}
        errorText={apiKeyError}
        maxLength={36}
      />
      <RaisedButton
        primary
        label="Lookup Stats Views"
        disabled={apiKey.length !== 36 || apiKey.split("-").length !== 5}
        onClick={onAPIKeySubmit}
      />
    </CardActions>
  </Card>
);

Home.propTypes = {
  "apiKey": PropTypes.string.isRequired,
  "apiKeyError": PropTypes.string,
  "onAPIKeyChange": PropTypes.func.isRequired,
  "onAPIKeySubmit": PropTypes.func.isRequired,
};

export default Home;
