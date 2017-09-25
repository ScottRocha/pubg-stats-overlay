import React from "react";
import { matchPath } from "react-router-dom";
import { connect } from "react-redux";

import Base from "../../components/common/Base";
import Loading from "../../components/common/Loading";


class BasePage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "path": this.props.location.pathname,
    };

  }

  render() {

    const { dispatch, isAuthenticated, apiKey, error, isRehydrated } = this.props;

    if (isRehydrated) {

      const childrenWithProps = React.Children.map(this.props.children, (child) => {

        const Component = child.props.component;
        const props = {
          "path": child.props.path,
          "history": this.props.history,
          "match": matchPath(this.props.history.location.pathname, {
            "path": child.props.path,
            "exact": true,
            "strict": false,
          }),
          dispatch,
          isAuthenticated,
          apiKey,
          error,
        };

        return React.cloneElement(child, {
          // eslint-disable-next-line no-undefined
          "component": undefined,
          "render": () => <Component {...props} />,
        }
        );

      });

      return (
        <Base
          childrenWithProps={childrenWithProps}
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          history={this.props.history} />
      );

    }

    return (
      <Loading history={this.props.history} />
    );


  }

}

const mapStateToProps = (state) => {

  const { authentication, rehydrate } = state;

  const { isAuthenticated, apiKey, error } = authentication;
  const { isRehydrated } = rehydrate;

  return {
    isAuthenticated,
    apiKey,
    error,
    isRehydrated,
  };

};

export default connect(mapStateToProps)(BasePage);
