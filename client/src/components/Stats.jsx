/* eslint-disable no-underscore-dangle */

import React from "react";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import Select from "react-select-plus";
import { Paper, RaisedButton, TextField } from "material-ui";
import { REGION, SEASON, MATCH } from "pubg-api-redis/src/util/constants";

import StatTypes from "../helpers/statTypes";


const Stats = ({ data, loading, expanded, onExpandedChange, onSelectChange, onAddView, onRemoveView }) => (
  <Paper>
    <ReactTable
      style={{ "fontSize": "1.2em" }}
      data={data}
      columns={[{
        "Header": <h4>Stat Views</h4>,
        "columns": [ {
          "Header": "Profile Name",
          "Cell": (row) => (
            <TextField
              id={"profile-name-" + row.original._id}
              fullWidth={true}
              maxLength={16}
              value={row.original.profile_name}
              onChange={(event) => {

                onSelectChange(row.index, "profile_name", event.target.value || "MiracleM4n");

              }}
            />
          ),
          "minWidth": 55,
        }, {
          "Header": "Stat Type",
          "Cell": (row) => (
            <Select
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
          ),
          "minWidth": 75,
        }, {
          "Header": "Include Stat Name",
          "Cell": (row) => (
            <Select
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
          ),
          "minWidth": 35,
        }, {
          "Header": "Region",
          "Cell": (row) => (
            <Select
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
          ),
          "minWidth": 35,
        }, {
          "Header": "Season",
          "Cell": (row) => (
            <Select
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
          ),
          "minWidth": 50,
        }, {
          "Header": "Game-Mode",
          "Cell": (row) => (
            <Select
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
          ),
          "minWidth": 50,
        }, {
          "Header": "Font Type",
          "Cell": (row) => (
            <TextField
              id={"font-type-" + row.original._id}
              fullWidth={true}
              floatingLabelStyle={{ "fontSize": "1.2em" }}
              floatingLabelText={"https\://fonts.googleapis.com/css?family="}
              errorText={row.original.fontErrorText}
              value={row.original.font_type}
              onChange={(event) => {

                onSelectChange(row.index, "font_type", event.target.value || "Roboto");

              }}
            />
          ),
          "minWidth": 115,
        }, {
          "Header": "Font Size",
          "Cell": (row) => (
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
          ),
          "minWidth": 22,
        }, {

        //   "Header": "Animation Type",
        //   "Cell": (row) => (
        //     <Select
        //       multi={false}
        //       value={row.original.animation_type}
        //       options={[
        //         { "name": "Static", "value": 0 },
        //         { "name": "Pop-In", "value": 1 },
        //         { "name": "Scrolling", "value": 2 },
        //       ]}
        //       onChange={(value) => {
        //
        //         onSelectChange(row.index, "animation_type", value.value);
        //
        //       }}
        //       onValueClick={(value) => {
        //
        //         onSelectChange(row.index, "animation_type", value.value);
        //
        //       }}
        //       valueKey="value"
        //       labelKey="name"
        //       backspaceRemoves={true}
        //     />
        //   ),
        // }, {
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

      // SubComponent={(row) => {
      // }}
    />
  </Paper>
);

Stats.propTypes = {
  "data": PropTypes.array.isRequired,
  "loading": PropTypes.bool.isRequired,
  "expanded": PropTypes.object.isRequired,
  "onExpandedChange": PropTypes.func.isRequired,
  "onAddView": PropTypes.func.isRequired,
  "onRemoveView": PropTypes.func.isRequired,
};

export default Stats;
