import React, { Component } from "react";
import {
  Image,
  Grid,
  Input,
  Form,
  TextArea,
  Divider,
  List,
  Button
} from "semantic-ui-react";

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
        <Grid style={{ height: "20vh" }} verticalAlign="middle">
          <Grid.Column mobile={13} tablet={13} computer={13}>
            <Form>
              <Input fluid placeholder="Title" />
              <TextArea
                autoHeight
                placeholder="Enter message..."
                style={{ minHeight: 70 }}
              />
            </Form>
          </Grid.Column>
          <Grid.Column mobile={3} tablet={3} computer={3}>
            <Button circular icon="paper plane" size="large" color="red" />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}
