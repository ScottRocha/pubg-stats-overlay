import React from "react";
import { render } from "react-dom";

import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import BasePage from "./containers/common/BasePage";
import HomePage from "./containers/HomePage";

import RegisterPage from "./containers/authentication/RegisterPage";
import LoginPage from "./containers/authentication/LoginPage";
import LogoutPage from "./containers/authentication/LogoutPage";

import StatsPage from "./containers/StatsPage";
import ViewPage from "./containers/ViewPage";

import NotFound from "./components/common/NotFound";

import createStore from "./datastore/createStore";

const store = createStore();

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/view/:view" component={ViewPage} />
          <Route
            render={(props) => {

              return (
                <BasePage {...props}>
                  <Route exact path="/" component={HomePage} />

                  <Route exact path="/register" component={RegisterPage} />
                  <Route exact path="/login" component={LoginPage} />
                  <Route exact path="/logout" component={LogoutPage} />

                  <Route exact path="/stats" component={StatsPage} />
                  <Route component={NotFound} />
                </BasePage>
              );

            }}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>, document.getElementById("react-app"));
