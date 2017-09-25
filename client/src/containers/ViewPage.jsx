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
    };

  }

  componentWillMount() {

    this.getViewData();
    this.startViewSocket();
    document.body.style.backgroundColor = "#00ff00";

  }

  componentWillUnmount() {

    this.stopViewSocket();
    document.body.style.backgroundColor = null;

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

  render() {

    return (
      <View
        data={this.state.data}
      />
    );

  }

}

export default StatsPage;
