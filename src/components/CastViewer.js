import React, { Component } from "react";
import { Image, Divider, Header, Button } from "semantic-ui-react";
//components

export default class CastViewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Image src="https://i.imgur.com/A6lpktG.png" size="small" />
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
