import React from "react";

import { Menu, FlatButton, Paper } from "material-ui";


const Footer = () => (
  <Paper zDepth={1} style={{ "position": "fixed", "left": 0, "bottom": 0, "right": 0, "height": 48 }}>
    <Menu>
      <FlatButton style={{ "position": "fixed", "right": 0 }}
        disabled={true}
        label={"© Scott Rocha, 2017-" + new Date().getFullYear()}
      />
    </Menu>
  </Paper>
);

export default Footer;
