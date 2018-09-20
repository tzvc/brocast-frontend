import React, { Component } from "react";
import { Grid, Input, Form, TextArea, Button } from "semantic-ui-react";

export default class CastsExplorer extends Component {
  state = { title: "", message: "" };

  _handleTitleChange = (e, { name, value }) => {
    if (value.length < 30) this.setState({ [name]: value });
  };

  _handleMessageChange = (e, { name, value }) => {
    if (value.length < 200) this.setState({ [name]: value });
  };

  _handleSubmit = () => {
    this.setState({ title: "", message: "" });
    this.props.onCastSubmit({
      title: this.state.title,
      message: this.state.message
    });
  };

  render() {
    return (
      <Form onSubmit={this._handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Enter your title"
            name="title"
            value={this.state.title}
            onChange={this._handleTitleChange}
          />

          <Form.Button
            floated="right"
            disabled={
              this.state.title.length <= 0 || this.state.message.length <= 0
            }
            content="Broadcast"
            color="red"
          />
        </Form.Group>
        <Form.TextArea
          placeholder="Enter your message"
          name="message"
          value={this.state.message}
          onChange={this._handleMessageChange}
        />
      </Form>
    );
  }
}
