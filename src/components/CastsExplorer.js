import React, { Component } from "react";
import { Image, Divider, List } from "semantic-ui-react";
//components
import CastCreationForm from "./CastCreationForm";

export default class CastsExplorer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Image src="https://i.imgur.com/A6lpktG.png" size="small" />
        <Divider />

        <List
          style={{ overflow: "auto", maxHeight: "60vh" }}
          selection
          verticalAlign="middle"
        >
          {this.props.casts.features.map(cast => (
            <List.Item>
              <List.Content
                header={cast.properties.title}
                description={cast.properties.msg}
              />
            </List.Item>
          ))}
        </List>
        <Divider />
        <CastCreationForm onCastSubmit={this.props.onCastSubmit} />
      </React.Fragment>
    );
  }
}
