import React, { Component } from "react";
import { Form, Button, Segment, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { withContext } from "../../../app/context";
import dateFnsLocalizer from "react-widgets-date-fns";
import { DateTimePicker } from "react-widgets";

dateFnsLocalizer();

class ActivityForm extends Component {
  componentDidMount() {
    const { match, onFormLoad } = this.props;
    onFormLoad(+match.params.id, true);
  }

  componentWillUnmount() {
    this.props.clearActivity();
  }

  render() {
    const {
      onInputChange,
      onSelectInputChange,
      onActivityCreate,
      onDateInputChange,
      onActivityEdit,
      match,
      history,
      categories,
      loading,
      loadingActivity,
      isEmpty,
      activity,
      activity: { title, description, category, date, time, city, venue }
    } = this.props;
    const existingActivity = !isEmpty(match.params);
    if (loadingActivity || isEmpty(activity) || typeof(activity.date) === 'string' )
      return <LoadingComponent inverted content="Loading activity..." />;
    return (
      <Grid>
        <Grid.Column width={10}>
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
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Date</label>
                  <DateTimePicker
                    name="date"
                    time={false}
                    placeholder="Date"
                    value={date}
                    onChange={(value)=> onDateInputChange(value, "date")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Time</label>
                  <DateTimePicker
                    name="time"
                    date={false}
                    placeholder="Time"
                    value={time}
                    onChange={(value) => onDateInputChange(value, "time")}
                  />
                </Form.Field>
              </Form.Group>

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
        </Grid.Column>
      </Grid>
    );
  }
}

export default withContext(ActivityForm);
