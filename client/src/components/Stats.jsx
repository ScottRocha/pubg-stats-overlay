/* eslint-disable no-underscore-dangle */

import React from "react";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import Select from "react-select-plus";
import { Paper, RaisedButton, TextField } from "material-ui";
import { REGION, SEASON, MATCH } from "pubg-api-redis/src/util/constants";

import StatTypes from "../helpers/statTypes";
import ColorPicker from "../containers/picker/ColorPicker";
import FontExample from "../containers/font/FontExample";


const Stats = ({
  data, font, loading, expanded,
  onGetFonts, onExpandedChange, onFontChange,
  onSelectChange, onAddView, onRemoveView,
}) => (
  <Paper>
    <ReactTable
      style={{ "fontSize": "1.2em" }}
      data={data}
      columns={[{
        "Header": <h4>Stat Views</h4>,
        "columns": [ {
          "Header": "View URL",
          "Cell": (row) => <TextField id={"view-url-" + row.original._id} fullWidth={true} value={window.location.origin + "/view/" + row.original._id} onChange={() => {}} />,
          "minWidth": 175,
        }, {
          "maxWidth": 125,
          "Header": <RaisedButton
            label="Add View"
            primary={true}
            fullWidth={true}
            onClick={() => onAddView()} />,
          "Cell": (row) => (
            <RaisedButton
              label="Remove View"
              primary={true}
              onClick={() => onRemoveView(row.original._id, row.index)} />
          ),
        } ],
      }]}
      minRows={14}
      loading={loading}
      resizable={false}
      filterable={false}
      sortable={false}
      expanded={expanded}
      onExpandedChange={(newExpanded) => {

        onExpandedChange(newExpanded);

      }}
      SubComponent={(row) => (
        <div className="col-md-10 col-md-offset-1">
          <h4>Profile Name</h4>
          <TextField
            id={"profile-name-" + row.original._id}
            fullWidth={true}
            maxLength={16}
            value={row.original.profile_name}
            onChange={(event) => {

              onSelectChange(row.index, "profile_name", event.target.value || "MiracleM4n");

            }}
          />
          <h4>Stat Type</h4>
          <Select
            id={"stat-type-" + row.original._id}
            clearable={false}
            multi={false}
            value={row.original.stat_type}
            options={Object.keys(StatTypes).map((value) => ({ "name": StatTypes[value], value }))}
            onChange={(value) => {

              onSelectChange(row.index, "stat_type", value.value);

            }}
            onValueClick={(value) => {

              onSelectChange(row.index, "stat_type", value.value);

            }}
            valueKey="value"
            labelKey="name"
            backspaceRemoves={true}
          />
          <h4>Include Stat Name in View</h4>
          <Select
            id={"stat-name-" + row.original._id}
            clearable={false}
            multi={false}
            value={row.original.stat_with_name}
            options={[
              { "name": "Yes", "value": true },
              { "name": "No", "value": false },
            ]}
            onChange={(value) => {

              onSelectChange(row.index, "stat_with_name", value.value);

            }}
            onValueClick={(value) => {

              onSelectChange(row.index, "stat_with_name", value.value);

            }}
            valueKey="value"
            labelKey="name"
            backspaceRemoves={true}
          />
          <h4>Region</h4>
          <Select
            id={"region-" + row.original._id}
            clearable={false}
            multi={false}
            value={row.original.region}
            options={Object.keys(REGION).map((key) => {

              return { "name": key, "value": REGION[key] };

            })}
            onChange={(value) => {

              onSelectChange(row.index, "region", value.value);

            }}
            onValueClick={(value) => {

              onSelectChange(row.index, "region", value.value);

            }}
            valueKey="value"
            labelKey="name"
            backspaceRemoves={true}
          />
          <h4>Season</h4>
          <Select
            id={"season-" + row.original._id}
            clearable={false}
            multi={false}
            value={row.original.season}
            options={Object.keys(SEASON).map((key) => {

              return { "name": SEASON[key], "value": SEASON[key] };

            })}
            onChange={(value) => {

              onSelectChange(row.index, "season", value.value);

            }}
            onValueClick={(value) => {

              onSelectChange(row.index, "season", value.value);

            }}
            valueKey="value"
            labelKey="name"
            backspaceRemoves={true}
          />
          <h4>Match / Game-mode</h4>
          <Select
            id={"match-" + row.original._id}
            clearable={false}
            multi={false}
            value={row.original.match}
            options={Object.keys(MATCH).map((key) => {

              return { "name": MATCH[key], "value": MATCH[key] };

            })}
            onChange={(value) => {

              onSelectChange(row.index, "match", value.value);

            }}
            onValueClick={(value) => {

              onSelectChange(row.index, "match", value.value);

            }}
            valueKey="value"
            labelKey="name"
            backspaceRemoves={true}
          />
          <h4>Font Options</h4>
          <div className="row">
            <div className="col-md-4">
              <h5>Type</h5>
              <Select.Async
                id={"font-type-" + row.original._id}
                clearable={false}
                multi={false}
                value={row.original.font_type}
                loadOptions={(input) => {

                  return onGetFonts(input);

                }}
                onChange={(value) => {

                  onFontChange(row.index, value.family);

                }}
                onValueClick={(value) => {

                  onFontChange(row.index, value.family);

                }}
                valueKey="family"
                labelKey="family"
                backspaceRemoves={true}
              />
            </div>
            <div className="col-md-4">
              <h5>Size</h5>
              <TextField
                id={"font-size-" + row.original._id}
                fullWidth={true}
                type="number"
                min={1}
                value={row.original.font_size}
                onChange={(event) => {

                  onSelectChange(row.index, "font_size", event.target.value || 1);

                }}
              />
            </div>
            <div className="col-md-4">
              <h5>Color</h5>
              <ColorPicker
                id={"font-color-" + row.original._id}
                value={row.original.font_color || "#000000"}
                onChangeComplete={(color) => {

                  onSelectChange(row.index, "font_color", color.hex || "#000000");

                }}
              />
            </div>
          </div>

          {
            Object.keys(font).length !== 0
              ? <FontExample font={font} font_size={row.original.font_size} font_color={row.original.font_color} />
              : <div />
          }

          {/*
          <Select
            multi={false}
            value={row.original.animation_type}
            options={[
              { "name": "Static", "value": 0 },
              { "name": "Pop-In", "value": 1 },
              { "name": "Scrolling", "value": 2 },
            ]}
            onChange={(value) => {

              onSelectChange(row.index, "animation_type", value.value);

            }}
            onValueClick={(value) => {

              onSelectChange(row.index, "animation_type", value.value);

            }}
            valueKey="value"
            labelKey="name"
            backspaceRemoves={true}
          />
          */}

        </div>
      )}
    />
  </Paper>
);

Stats.propTypes = {
  "data": PropTypes.array.isRequired,
  "font": PropTypes.object.isRequired,
  "loading": PropTypes.bool.isRequired,
  "expanded": PropTypes.object.isRequired,
  "onGetFonts": PropTypes.func.isRequired,
  "onFontChange": PropTypes.func.isRequired,
  "onExpandedChange": PropTypes.func.isRequired,
  "onAddView": PropTypes.func.isRequired,
  "onRemoveView": PropTypes.func.isRequired,
};

export default Stats;
