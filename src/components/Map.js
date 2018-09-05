import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default class Map extends Component {
  _addUserPositionMarker = userPos => {
    // create a DOM element for the marker
    const marker = document.createElement("div");
    const pin = document.createElement("div");
    const pinEffect = document.createElement("div");

    marker.className = "marker";
    pin.className = "pin";
    pinEffect.className = "pinEffect";

    marker.appendChild(pin);
    marker.appendChild(pinEffect);

    // add marker to map
    new mapboxgl.Marker(marker).setLngLat(userPos).addTo(this.map);
  };

  _initViewPort = posObj => {
    const userPos = [posObj.coords.longitude, posObj.coords.latitude];
    console.log("Init viewport", userPos);
    this._addUserPositionMarker(userPos);
    this.map.flyTo({
      zoom: 14,
      center: userPos
    });
  };

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9"
    });

    navigator.geolocation.getCurrentPosition(this._initViewPort);

    this.map.on("load", () => {
      this.map.on("click", e => {
        console.log(e.lnglat);
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%"
    };

    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}
