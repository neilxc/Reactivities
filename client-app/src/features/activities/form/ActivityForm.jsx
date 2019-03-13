import React, { Component } from "react";
import { Form, Button, Segment, Grid } from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import forms from '../../../app/common/form/forms';
import TextInput from "../../../app/common/form/inputs/TextInput";
import TextAreaInput from "../../../app/common/form/inputs/TextAreaInput";
import SelectInput from "../../../app/common/form/inputs/SelectInput";
import DateInput from "../../../app/common/form/inputs/DateInput";
import FormSubmitButton from "../../../app/common/form/controls/FormSubmitButton";
import ErrorMessage from "../../../app/common/form/errors/ErrorMessage";

const form = forms.activityForm;

@inject("activityStore")
@observer
class ActivityForm extends Component {
  async componentDidMount() {
    const {
      match,
      activityStore: { initializeForm }
    } = this.props;
    try {
      // reset the form
      // form.init();
      const activity = await initializeForm(+match.params.id, true);
      if (activity) {
        form.init({ ...activity });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      activityStore: { loadingActivity, loading },
      history
    } = this.props;
    if (loadingActivity)
      return <LoadingComponent inverted content="Loading activity..." />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <Form autoComplete="off" error={!!form.error}>
              <TextInput field={form.$("title")} />
              <TextAreaInput rows={2} field={form.$("description")} />
              <SelectInput field={form.$("category")} />
              <Form.Group widths="equal">
                <DateInput field={form.$("date")} date={true} />
                <DateInput field={form.$("time")} time={true} />
              </Form.Group>
              <TextInput field={form.$("city")} />
              <TextInput field={form.$("venue")} />
              {form.error &&
              <ErrorMessage error={form.error}/>}
              <FormSubmitButton form={form} floated="right" loading={loading}>
                {form.has("id") ? "Edit" : "Create"}
              </FormSubmitButton>
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
