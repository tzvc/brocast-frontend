import React, { Component } from "react";
import {
  Segment,
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
      <Grid padded stretched>
        <Grid.Column mobile={16} tablet={6} computer={6}>
          <Segment>
            <List
              style={{ overflow: "auto", maxHeight: 400 }}
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
            <Grid verticalAlign="middle">
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
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
