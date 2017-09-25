import React from "react";

import Axios from "axios";

import Stats from "../components/Stats";
import { checkAuth } from "../helpers/auth";


class StatsPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "data": [],
      "expanded": {},
      "loading": true,
    };

  }

  componentWillMount() {

    checkAuth(this.props);
    this.onGetData();

  }

  onGetData() {

    const self = this;

    self.setState({
      "loading": true,
    }, () => {

      Axios("/api/stats", {
        "method": "get",
      }).then((response) => {

        self.setState({
          "data": response.data,
          "loading": false,
        });

      }).catch(() => {

        self.setState({
          "data": [],
          "loading": false,
        });

      });

    });

  }

  onExpandedChange(expanded) {

    this.setState({
      "expanded": Object.assign({}, this.state.expanded, expanded),
    });

  }

  onSelectChange(index, prop, value) {

    if (value) {

      const self = this;

      const data = self.state.data;

      if (data[index] && data[index][prop] !== value) {

        if (prop === "font_type") {

          if (value.split("|").length !== 1) {

            data[index].fontErrorText = "You can only include one font family per view";

          } else if (value.split(",").length !== 1) {

            data[index].fontErrorText = "You can only include one font style per view";

          } else {

            data[index][prop] = value;
            delete data[index].fontErrorText;

          }

        } else {

          data[index][prop] = value;

        }

        self.setState({ data }, () => {

          self.onSubmitUpdate(index);

        });

      }

    }

  }

  onSubmitUpdate(index) {

    const self = this;

    self.setState({
      "loading": true,
    }, () => {

      Axios("/api/stat", {
        "method": "post",
        "data": self.state.data[index],
      }).then((response) => {

        // TODO handle success
        self.setState({
          "loading": false,
        });

      }).catch((err) => {

        // TODO handle error
        self.setState({
          "loading": false,
        });

      });

    });

  }

  onAddView() {

    const self = this;

    self.setState({
      "loading": true,
    }, () => {

      Axios("/api/stat", {
        "method": "post",
      }).then((response) => {

        const data = self.state.data;

        data.push(response.data);

        self.setState({
          data,
          "loading": false,
        });

      }).catch(() => {

        self.setState({
          "loading": false,
        });

      });

    });

  }

  onRemoveView(id, index) {

    const self = this;

    self.setState({
      "loading": true,
    }, () => {

      Axios("/api/stat", {
        "method": "delete",
        "data": { id },
      }).then(() => {

        const data = self.state.data;

        data.splice(index, 1);

        self.setState({
          data,
          "loading": false,
        });

      }).catch(() => {

        self.setState({
          "loading": false,
        });

      });

    });

  }

  render() {

    return (
      <Stats
        data={this.state.data}
        loading={this.state.loading}
        expanded={this.state.expanded}
        onExpandedChange={this.onExpandedChange.bind(this)}
        onSelectChange={this.onSelectChange.bind(this)}
        onAddView={this.onAddView.bind(this)}
        onRemoveView={this.onRemoveView.bind(this)}
      />
    );

  }

}

export default StatsPage;
