import React, { Component } from "react";
import { Form, Button, Segment, Grid } from "semantic-ui-react";
import {inject, observer} from 'mobx-react';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { DateTimePicker } from "react-widgets";
import {isEmpty} from '../../../app/common/util/util';
import {categories} from '../../../app/common/form/data/options';

@inject('activityStore')
@observer
class ActivityForm extends Component {
  componentDidMount() {
    const { match, activityStore: {initializeForm} } = this.props;
    initializeForm(+match.params.id, true);
  }
  
  render() {
    const {
      activityStore: {
        activity,
        loadingActivity,
        loading,
        activity: {
          title, description, category, date, time, city, venue
        },
        dateInputChange,
        selectInputChange,
        inputChange,
        submitActivityForm
      },
      history
    } = this.props;
    if (loadingActivity || isEmpty(activity))
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
                onChange={inputChange("title")}
              />
              <Form.TextArea
                rows={2}
                name="description"
                label="Description"
                placeholder="Description"
                value={description}
                onChange={inputChange("description")}
              />
              <Form.Select
                name="category"
                label="Category"
                placeholder="Category"
                options={categories}
                value={category}
                onChange={(e, data) => selectInputChange(e, data)}
              />
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Date</label>
                  <DateTimePicker
                    name="date"
                    time={false}
                    placeholder="Date"
                    value={date}
                    onChange={(value)=> dateInputChange(value, "date")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Time</label>
                  <DateTimePicker
                    name="time"
                    date={false}
                    placeholder="Time"
                    value={time}
                    onChange={(value) => dateInputChange(value, "time")}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Input
                name="city"
                label="City"
                placeholder="City"
                value={city}
                onChange={inputChange("city")}
              />
              <Form.Input
                name="venue"
                label="Venue"
                placeholder="Venue"
                value={venue}
                onChange={inputChange("venue")}
              />
              <Button
                floated="right"
                positive
                type="button"
                onClick={submitActivityForm}
                loading={loading}
              >
                {activity.id ? "Edit" : "Create"}
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

export default ActivityForm;
