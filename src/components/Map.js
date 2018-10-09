import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import concaveman from "concaveman";

// utils
import { computeNewPosWithOffset } from "../utils/Geo";
// constants
import { BASE_GJ_POLY } from "../constants/Geo";
// styles
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.pickers = [];
    this.casts = [];

    this.setMapLoadedResolve = null;

    this.mapLoaded = new Promise((resolve, reject) => {
      this.setMapLoadedResolve = resolve;
    });
  }

  componentDidUpdate(prevProps) {
    console.log(this.props, prevProps);
    // Typical usage (don't forget to compare props):
    if (this.props.userPos !== prevProps.userPos) {
      this._initViewPort(this.props.userPos);
    }
    if (this.props.cast !== prevProps.cast) {
      console.log(this.props.cast, prevProps.cast);
      if (this.props.cast)
        this.map.flyTo({
          speed: 3,
          zoom: 16,
          center: this.props.cast.geometry.coordinates
        });
      else
        this.map.flyTo({
          speed: 3,
          zoom: 14,
          center: this.map.getCenter()
        });
    }

    if (this.props.casts.length !== prevProps.casts.length) {
      if (this.props.casts.length === 0) {
        // a new polygon has been chosen, remove all old markers
        this.casts.forEach(cast => {
          cast.remove();
        });
        this.casts = [];
      } else {
        // Add new cast to map
        console.log(
          "Adding new cast ",
          this.props.casts[this.props.casts.length - 1]
        );
        const newCastMarker = this._createCastMarker(
          this.props.casts[this.props.casts.length - 1]
        );
        newCastMarker.addTo(this.map);
        this.casts.push(newCastMarker);
      }
    }
  }

  _createCastMarker = cast => {
    console.log(cast);
    // create a DOM element for the marker
    const marker = document.createElement("div");

    marker.className = "cast-pin";

    // add marker to map
    const castMarker = new mapboxgl.Marker(marker).setLngLat(
      cast.geometry.coordinates
    );
    marker.addEventListener("click", () => {
      this.props.onCastMarkerClick(cast);
    });
    return castMarker;
  };

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
    return picker;
  };

  _generateConvexGeoJson = () => {
    const pickersPos = this.pickers.map(picker => {
      const pos = picker.getLngLat();
      return [pos.lng, pos.lat];
    });
    let convexGJ = BASE_GJ_POLY;

    convexGJ.geometry.coordinates = [concaveman(pickersPos)];
    return convexGJ;
  };

  _updateSelection = () => {
    this.map
      .getSource("selection-source")
      .setData(this._generateConvexGeoJson());
  };

  _initViewPort = async userPos => {
    console.log("Initing viewport at pos ", userPos);
    this._createUserPositionMarker(userPos);

    const boundingBox = [500, -500];

    boundingBox.forEach(y => {
      boundingBox.forEach(x => {
        this.pickers.push(
          this._createPickerMarker(computeNewPosWithOffset(y, x, userPos))
        );
      });
    });

    //add pickers to the map
    this.pickers.forEach(picker => picker.addTo(this.map));

    this.props.onSelectionChange(this._generateConvexGeoJson());

    // wait until map style is loaded
    await this.mapLoaded;

    this._updateSelection();
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

    this.map.on("load", () => {
      this.map.addSource("selection-source", {
        type: "geojson",
        data: BASE_GJ_POLY
      });
      this.setMapLoadedResolve();
      console.log(this.mapLoaded);
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
