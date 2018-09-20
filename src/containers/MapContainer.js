import React, { Component } from "react";
import io from "socket.io-client";
// components
import Map from "../components/Map";

import { API_ROOT } from "../constants/api";
import { BASE_FC, BASE_GJ_POINT } from "../constants/Geo";
import CastsExplorer from "../components/CastsExplorer";
import { Grid } from "semantic-ui-react";
//constants

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPos: null,
      casts: BASE_FC
    };

    this.socket = null;
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(posObj =>
      this.setState({
        userPos: [posObj.coords.longitude, posObj.coords.latitude]
      })
    );

    this.socket = io(API_ROOT);
    this.socket.on("brocastChangeFeed", cast => {
      console.log("New cast recceived from feed", cast);
      this.setState({ lastCast: cast });
    });
  }

  _handleSelectionChange = newSelection => {
    console.log("Subscribing to new poly", newSelection);
    this.setState({ lastCast: null }); // clear old markers
    this.socket.emit("subscribe", newSelection); // subscribe to new polygon
  };

  _handleNewCastSubmit = newCastInfos => {
    const newCastGJ = BASE_GJ_POINT;
    newCastGJ.geometry.coordinates = this.state.userPos;
    newCastGJ.properties.title = newCastInfos.title;
    newCastGJ.properties.message = newCastInfos.message;

    console.log("Submitting new brocast ", newCastGJ);

    this.socket.emit("newBrocast", newCastGJ);
  };

  render() {
    console.log(this.state);
    return (
      <Grid padded style={{ height: "100vh" }}>
        <Grid.Column
          style={{
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            zIndex: 1
          }}
          mobile={6}
          tablet={6}
          computer={6}
        >
          <CastsExplorer
            casts={this.state.casts}
            onCastSubmit={this._handleNewCastSubmit}
          />
        </Grid.Column>
        <Grid.Column
          style={{ padding: 0 }}
          mobile={10}
          tablet={10}
          computer={10}
        >
          <Map
            userPos={this.state.userPos}
            lastCast={this.state.lastCast}
            onSelectionChange={this._handleSelectionChange}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
