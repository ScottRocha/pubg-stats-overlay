/* eslint-disable camelcase */

import React from "react";

import Axios from "axios";

import Stats from "../components/Stats";
import { checkAuth } from "../helpers/auth";


class StatsPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "data": [],
      "font": {},
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

  onGetFonts(search) {

    return new Promise((resolve) => {

      Axios("/api/fonts", {
        "method": "get",
        "params": {
          search,
        },
      }).then((response) => {

        return resolve({ "options": response.data });

      }).catch(() => {

        return resolve({ "options": [] });

      });

    });

  }

  onGetFontData(font) {

    let self = this;

    Axios("/api/font/" + font, {
      "method": "get",
    }).then((response) => {

      self.setState({ "font": response.data });

    }).catch(() => {

      self.setState({ "font": {} });

    });

  }

  onExpandedChange(expanded) {

    this.setState({
      "expanded": Object.assign({}, this.state.expanded, expanded),
      "font": {},
    });

  }

  onFontChange(index, value) {

    if (value !== null) {

      const self = this;

      const data = self.state.data;

      if (data[index] && data[index].font_type !== value) {

        data[index].font_type = value;

        self.setState({ data }, () => {

          self.onGetFontData(value);
          self.onSubmitUpdate(index);

        });

      }

    }

  }

  onFontColorClick(index) {

    this.setState({
      "picker": Object.assign({}, this.state.picker, {

        [index]: typeof this.state.picker[index] === "boolean" ? !this.state.picker[index] : true,

      }),
    });

  }

  onCloseAllFontPickers() {

    this.setState({ "picker": {} });

  }

  onSelectChange(index, prop, value) {

    if (value !== null) {

      const self = this;

      const data = self.state.data;

      if (data[index] && data[index][prop] !== value) {

        data[index][prop] = value;

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
        font={this.state.font}
        loading={this.state.loading}
        expanded={this.state.expanded}
        onGetFonts={this.onGetFonts.bind(this)}
        onExpandedChange={this.onExpandedChange.bind(this)}
        onFontChange={this.onFontChange.bind(this)}
        onFontColorClick={this.onFontColorClick.bind(this)}
        onCloseAllFontPickers={this.onCloseAllFontPickers.bind(this)}
        onSelectChange={this.onSelectChange.bind(this)}
        onAddView={this.onAddView.bind(this)}
        onRemoveView={this.onRemoveView.bind(this)}
      />
    );

  }

}

export default StatsPage;
