import React, { Component } from "react";
import { Image, Divider, Header, Button } from "semantic-ui-react";
//components

export default class CastViewer extends Component {
  render() {
    return (
      <React.Fragment>
        <Image
          src="https://storage.googleapis.com/picture-delivery-pipeline.appspot.com/A6lpktG.png"
          size="small"
        />
        <Divider />

        <Header
          content={this.props.cast.properties.title}
          subheader={this.props.cast.geometry.coordinates}
        />
        {this.props.cast.properties.message}
        <Divider />
        <Button onClick={this.props.onReturn} content="return" color="red" />
      </React.Fragment>
    );
  }
}
