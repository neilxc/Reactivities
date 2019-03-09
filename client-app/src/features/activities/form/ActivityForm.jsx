import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { withContext } from "../../../app/context";

class ActivityForm extends Component {
  componentDidMount() {
    const { match, onFormLoad } = this.props;
    onFormLoad(+match.params.id, true);
  }

  render() {
    const {
      onInputChange,
      onSelectInputChange,
      onActivityCreate,
      onActivityEdit,
      match,
      history,
      categories,
      loading,
      loadingActivity,
      isEmpty,
      activity,
      activity: { title, description, category, date, city, venue }
    } = this.props;
    const existingActivity = !isEmpty(match.params);
    if (loadingActivity || isEmpty(activity))
      return <LoadingComponent inverted content="Loading activity..." />;
    return (
      <Segment clearing>
        <Form autoComplete="off">
          <Form.Input
            label="Title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onInputChange("title")}
          />
          <Form.TextArea
            rows={2}
            name="description"
            label="Description"
            placeholder="Description"
            value={description}
            onChange={onInputChange("description")}
          />
          <Form.Select
            name="category"
            label="Category"
            placeholder="Category"
            options={categories}
            value={category}
            onChange={(e, data) => onSelectInputChange(e, data)}
          />
          <Form.Input
            name="date"
            type="datetime-local"
            label="Date"
            placeholder="Date"
            value={date}
            onChange={onInputChange("date")}
          />
          <Form.Input
            name="city"
            label="City"
            placeholder="City"
            value={city}
            onChange={onInputChange("city")}
          />
          <Form.Input
            name="venue"
            label="Venue"
            placeholder="Venue"
            value={venue}
            onChange={onInputChange("venue")}
          />
          <Button
            floated="right"
            positive
            type="button"
            onClick={existingActivity ? onActivityEdit : onActivityCreate}
            loading={loading}
          >
            {existingActivity ? "Edit" : "Create"}
          </Button>
          <Button
            onClick={() => history.push("/activities")}
            floated="right"
            color="grey"
            type="button"
            disabled={loading}
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default withContext(ActivityForm);
