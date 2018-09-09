import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import concaveman from "concaveman";

// utils
import { computeNewPosWithOffset } from "../utils/Geo";
// constants
import { BASE_GEOJSON } from "../constants/Geo";
// styles
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.pickers = [];
  }

  _createUserPositionMarker = userPos => {
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

  _createPickerMarker = markerPos => {
    // create a DOM element for the marker
    const marker = document.createElement("div");

    marker.className = "picker-pin";

    // add marker to map
    const picker = new mapboxgl.Marker(marker, { draggable: true }).setLngLat(
      markerPos
    );
    picker.on("drag", this._updateSelection);
    picker.on("dragend", () => {
      this.props.onSelectionChange(this._generateConvexGeoJson());
    });

    this.pickers.push(picker);
  };

  _generateConvexGeoJson = () => {
    const pickersPos = this.pickers.map(picker => {
      const pos = picker.getLngLat();
      return [pos.lng, pos.lat];
    });
    let convexGJ = BASE_GEOJSON;

    convexGJ.geometry.coordinates = [concaveman(pickersPos)];
    return convexGJ;
  };

  _updateSelection = () => {
    this.map
      .getSource("selection-source")
      .setData(this._generateConvexGeoJson());
  };

  _initViewPort = posObj => {
    const userPos = [posObj.coords.longitude, posObj.coords.latitude];
    console.log("Initing viewport at pos ", userPos);
    this._createUserPositionMarker(userPos);

    const boundingBox = [500, -500];

    boundingBox.forEach(y => {
      boundingBox.forEach(x => {
        this._createPickerMarker(computeNewPosWithOffset(y, x, userPos));
      });
    });

    //add pickers to the map
    this.pickers.forEach(picker => picker.addTo(this.map));

    this._updateSelection();
    this.props.onSelectionChange(this._generateConvexGeoJson());

    this.map.flyTo({
      speed: 3,
      zoom: 14,
      center: userPos
    });
  };

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/light-v9"
    });

    navigator.geolocation.getCurrentPosition(this._initViewPort);

    this.map.on("load", () => {
      this.map.addSource("selection-source", {
        type: "geojson",
        data: BASE_GEOJSON
      });

      this.map.addLayer({
        id: "selection",
        type: "fill",
        source: "selection-source",
        paint: {
          "fill-opacity": 0.2,
          "fill-color": "#f00"
        }
      });
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      height: "100%",
      width: "100%"
    };

    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}
