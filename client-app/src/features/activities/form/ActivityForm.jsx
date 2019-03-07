import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import format from "date-fns/format";

const categories = [
  { key: "drinks", text: "Drinks", value: "Drinks" },
  { key: "culture", text: "Culture", value: "Culture" },
  { key: "film", text: "Film", value: "Film" },
  { key: "food", text: "Food", value: "Food" },
  { key: "music", text: "Music", value: "Music" },
  { key: "travel", text: "Travel", value: "Travel" }
];

class ActivityForm extends Component {
  state = this.getInitialState();

  getInitialState() {
    const { activity } = this.props;

    if (activity) {
      activity.date = format(activity.date, "YYYY-MM-DDTHH:mm");
    }

    return activity
      ? activity
      : {
          title: "",
          description: "",
          category: "",
          date: "",
          city: "",
          venue: ""
        };
  }

  // curried function
  handleChange = name => ({ target: { value } }) =>
    this.setState({ [name]: value });

  handleSelectChange = (e, data) => {
    this.setState({
      ...this.state.activity,
      category: data.value
    });
  };

  handleSubmit = () => {
    const { createActivity, editActivity, activity } = this.props;
    if (!activity) {
      createActivity({ ...this.state });
    } else {
      editActivity({ ...this.state });
    }
  };

  render() {
    const { cancelFormEdit, activity, loading } = this.props;
    const { title, description, category, date, city, venue } = this.state;
    return (
      <Segment clearing>
        <Form autoComplete="off">
          <Form.Input
            label="Title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange("title")}
          />
          <Form.TextArea
            rows={2}
            name="description"
            label="Description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange("description")}
          />
          <Form.Select
            name="category"
            label="Category"
            placeholder="Category"
            options={categories}
            value={category}
            onChange={(e, data) => this.handleSelectChange(e, data)}
          />
          <Form.Input
            name="date"
            type="datetime-local"
            label="Date"
            placeholder="Date"
            value={date}
            onChange={this.handleChange("date")}
          />
          <Form.Input
            name="city"
            label="City"
            placeholder="City"
            value={city}
            onChange={this.handleChange("city")}
          />
          <Form.Input
            name="venue"
            label="Venue"
            placeholder="Venue"
            value={venue}
            onChange={this.handleChange("venue")}
          />
          <Button
            floated="right"
            positive
            type="button"
            onClick={this.handleSubmit}
            loading={loading}
          >
            {activity ? "Edit" : "Create"}
          </Button>
          <Button
            floated="right"
            color="grey"
            type="button"
            onClick={cancelFormEdit}
            disabled={loading}
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default ActivityForm;
