export const checkAuth = (props) => {

  if (!props.isAuthenticated) {

    props.history.push("/");

  }

};

export const checkUnAuth = (props) => {

  if (props.isAuthenticated) {

    props.history.push("/stats");

  }

};
