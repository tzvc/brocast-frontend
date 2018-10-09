import React, { Component } from "react";
import io from "socket.io-client";
// components
import Map from "../components/Map";

import { API_ROOT } from "../constants/api";
import { BASE_GJ_POINT } from "../constants/Geo";
import CastsExplorer from "../components/CastsExplorer";
import { Grid } from "semantic-ui-react";
import CastViewer from "../components/CastViewer";
//constants

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPos: null,
      casts: [],
      selectedCast: null
    };

    this.socket = null;
  }

  componentDidMount() {
    console.log("Getting user pos...");
    navigator.geolocation.getCurrentPosition(posObj =>
      this.setState({
        userPos: [posObj.coords.longitude, posObj.coords.latitude]
      })
    );

    this.socket = io(API_ROOT);
    this.socket.on("Brocast_area_feed", cast => {
      console.log("New cast recceived from feed", cast);
      this.setState({ casts: [...this.state.casts, cast] });
    });
  }

  _handleSelectionChange = newSelection => {
    console.log("Subscribing to new poly", newSelection);
    this.setState({ casts: [] }); // clear old markers
    this.socket.emit("Brocast_area_subscribe", newSelection); // subscribe to new polygon
  };

  _handleCastMarkerClick = cast => {
    this.setState({ selectedCast: cast });
  };

  _handleNewCastSubmit = newCastInfos => {
    const newCastGJ = BASE_GJ_POINT;
    newCastGJ.geometry.coordinates = this.state.userPos;
    newCastGJ.properties.title = newCastInfos.title;
    newCastGJ.properties.message = newCastInfos.message;

    console.log("Submitting new brocast ", newCastGJ);

    this.socket.emit("Brocast_create", newCastGJ);
  };

  render() {
    console.log("running in ", process.env.NODE_ENV);
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
          {this.state.selectedCast ? (
            <CastViewer
              cast={this.state.selectedCast}
              onReturn={() => this.setState({ selectedCast: null })}
            />
          ) : (
            <CastsExplorer
              casts={this.state.casts}
              onCastSubmit={this._handleNewCastSubmit}
              onNewCastSelection={this._handleCastMarkerClick}
            />
          )}
        </Grid.Column>
        <Grid.Column
          style={{ padding: 0 }}
          mobile={10}
          tablet={10}
          computer={10}
        >
          <Map
            userPos={this.state.userPos}
            casts={this.state.casts}
            onSelectionChange={this._handleSelectionChange}
            onCastMarkerClick={this._handleCastMarkerClick}
            cast={this.state.selectedCast}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
