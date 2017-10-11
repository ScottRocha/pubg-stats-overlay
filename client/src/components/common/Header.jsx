import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { AppBar, Drawer, List, ListItem, Subheader } from "material-ui";


const Header = ({ isAuthenticated, isDrawerOpen, onToggleDrawer, onCloseDrawer, onSetDrawerState, history }) => (
  <div>
    <Drawer
      docked={false}
      open={isDrawerOpen}
      onRequestChange={(state) => onSetDrawerState(state)}>

      {!isAuthenticated ? (
        <div>
          <List>
            <Subheader>Account</Subheader>
            <ListItem
              onTouchTap={onCloseDrawer}
              containerElement={<Link to={"/login"} />}
              primaryText="Login" />
            <ListItem
              onTouchTap={onCloseDrawer}
              containerElement={<Link to={"/register"} />}
              primaryText="Register" />
          </List>
        </div>
      ) : (
        <div>
          <List>
            <Subheader>Account</Subheader>
            <ListItem
              onTouchTap={onCloseDrawer}
              containerElement={<Link to={"/logout"} />}
              primaryText="Logout"/>
          </List>
        </div>
      )}

    </Drawer>
    <AppBar
      title="PUBG Stats"
      titleStyle={{ "cursor": "pointer" }}
      onTitleTouchTap={() => history.push("/")}
      onLeftIconButtonTouchTap={onToggleDrawer}
    />
  </div>
);

Header.propTypes = {
  "isAuthenticated": PropTypes.bool.isRequired,
  "isDrawerOpen": PropTypes.bool.isRequired,
  "onToggleDrawer": PropTypes.func.isRequired,
  "onCloseDrawer": PropTypes.func.isRequired,
  "onSetDrawerState": PropTypes.func.isRequired,
  "history": PropTypes.object.isRequired,
};

export default Header;
