import React from "react";

import Axios from "axios";
import cron from "node-cron";

import View from "../components/View";

let job = null;

class StatsPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "data": {},
      "loading": false,
      "id": this.props.match.params.view,
      "width": document.documentElement.clientWidth,
      "height": document.documentElement.clientHeight,
    };

  }

  componentWillMount() {

    this.getViewData();
    this.startViewSocket();

    window.addEventListener("resize", this.updateDimensions);

  }

  componentWillUnmount() {

    this.stopViewSocket();

    window.removeEventListener("resize", this.updateDimensions);

  }

  getViewData() {

    const self = this;

    self.setState({
      "loading": true,
    }, () => {

      Axios("/api/stat", {
        "method": "get",
        "params": {
          "id": self.state.id,
        },
      }).then((stat) => {

        stat = stat.data;

        Axios("/api/view", {
          "method": "get",
          "headers": {
            "apiKey": stat.api_key,
          },
          "params": {
            "profile_name": stat.profile_name,
            "stat_type": stat.stat_type,
            "region": stat.region,
            "season": stat.season,
            "match": stat.match,
          },
        }).then((view) => {

          view = view.data;

          self.setState({
            "data": Object.assign({}, stat, view),
            "loading": false,
          });

        }).catch(() => {

        });


      }).catch(() => {

        self.setState({
          "data": [],
          "loading": false,
        });

      });

    });

  }

  startViewSocket() {

    const self = this;

    job = cron.schedule("* * * * *", () => {

      self.getViewData();

    }, true);

  }

  stopViewSocket() {


    job || job.stop();

  }

  updateDimensions() {

    self.setState({
      "width": document.documentElement.clientWidth,
      "height": document.documentElement.clientHeight,
    });

  }

  render() {

    return (
      <View
        data={this.state.data}
        width={this.state.width}
        height={this.state.height}
      />
    );

  }

}

export default StatsPage;
