import React, { Component } from "react";
// components
import Map from "../components/Map";

import { BASE_GEOJSON } from "../constants/Geo";
import CastsExplorer from "../components/CastsExplorer";
//constants
const fake_resp = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.03238901390978, 38.913188059745586]
      },
      properties: {
        title: "RUSU free food this afternoon",
        msg: "Hey come check out the free food at union square until 3:00pm"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "RMIT creative showcase",
        msg: "Come check out the new art pieces at the RMIT creative gallery"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Looking for bike tools",
        msg:
          "Hey I'm stuck with my broken bike, anybody has a 15mm wrench I can borrow?"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Looking for skate mate",
        msg:
          "New in town, looking for someone to show me around the city for skate spots"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Looking for skate mate",
        msg:
          "New in town, looking for someone to show me around the city for skate spots"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Looking for skate mate",
        msg:
          "New in town, looking for someone to show me around the city for skate spots"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Looking for skate mate",
        msg:
          "New in town, looking for someone to show me around the city for skate spots"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: "Looking for skate mate",
        msg:
          "New in town, looking for someone to show me around the city for skate spots"
      }
    }
  ]
};

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      casts: fake_resp
    };
  }
  _handleSelectionChange = newSelection => {
    console.log("Subscribing to new poly", newSelection);
  };

  render() {
    return (
      <React.Fragment>
        <Map
          onSelectionChange={this._handleSelectionChange}
          selection={this.state.selection}
        />
        <CastsExplorer casts={this.state.casts} />
      </React.Fragment>
    );
  }
}
