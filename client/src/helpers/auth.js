export const checkAuth = (props) => {

  if (!props.isAuthenticated) {

    props.history.push("/");

  }

};
