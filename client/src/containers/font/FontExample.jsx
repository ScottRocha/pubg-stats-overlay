import React from "react";
import PropTypes from "prop-types";

import { TextField } from "material-ui";
import { ChromePicker } from "react-color";


class FontExample extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "showPicker": false,
    };

  }

  render() {

    let self = this;

    return (
      <div>
        <TextField
          name={self.props.name}
          id={self.props.id}
          hintText={self.props.hintText}
          defaultValue={self.props.defaultValue}
          value={self.props.value}
          floatingLabelText={self.props.floatingLabelText}
          onClick={() => self.setState({ "showPicker": true })}
          onChange={(e) => {

            self.props.onChange(e.target.value);

          }}
        />
        {self.state.showPicker && (
          <div style={{ "position": "absolute", "zIndex": "2" }}>
            <div
              style={{ "position": "fixed", "top": "0px", "right": "0px", "bottom": "0px", "left": "0px" }}
              onClick={() => {

                self.setState({ "showPicker": false });
                self.props.onChange && self.props.onChange(self.props.value);

              }}
            />
            <ChromePicker
              color={self.props.value}
              onChange={self.props.onChange}
              onChangeComplete={self.props.onChangeComplete}
            />
          </div>
        )}
      </div>
    );

  }

}

FontExample.propTypes = {
  "name": PropTypes.string,
  "id": PropTypes.string,
  "hintText": PropTypes.string,
  "defaultValue": PropTypes.string,
  "value": PropTypes.string,
  "floatingLabelText": PropTypes.string,
  "onChange": PropTypes.func,
  "onChangeComplete": PropTypes.func,
};

export default FontExample;
