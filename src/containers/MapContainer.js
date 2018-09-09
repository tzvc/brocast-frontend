import React, { Component } from "react";
// components
import Map from "../components/Map";

import { BASE_GEOJSON } from "../constants/Geo";
import CastsExplorer from "../components/CastsExplorer";
import { Grid } from "semantic-ui-react";
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
          "Hey I'm stuck with my broken bike, anybody has a 15mm wrench I can borColumn?"
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
    ,
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
          <CastsExplorer casts={this.state.casts} />
        </Grid.Column>
        <Grid.Column
          style={{ padding: 0 }}
          mobile={10}
          tablet={10}
          computer={10}
        >
          <Map
            onSelectionChange={this._handleSelectionChange}
            selection={this.state.selection}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
