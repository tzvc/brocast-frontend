import React, { Component } from "react";
// components
import Map from "../components/Map";

import { BASE_GEOJSON } from "../constants/Geo";
//constants

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: BASE_GEOJSON
    };
  }
  _handleSelectionChange = newSelection => {
    console.log("Subscribing to new poly", newSelection);
  };

  render() {
    return (
      <Map
        onSelectionChange={this._handleSelectionChange}
        selection={this.state.selection}
      />
    );
  }
}
