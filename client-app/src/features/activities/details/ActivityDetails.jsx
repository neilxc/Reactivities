import React, { Component } from "react";
import { Button, Card, Image, Grid } from "semantic-ui-react";
import format from "date-fns/format";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { withContext } from "../../../app/context";

class ActivityDetails extends Component {
  componentDidMount() {
    const { match, loadActivity } = this.props;
    loadActivity(+match.params.id, true);
  }

  render() {
    const { history, activity, loadingActivity } = this.props;
    if (loadingActivity)
      return <LoadingComponent inverted content="Loading Activity" />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
              <Card.Header>{activity.title}</Card.Header>
              <Card.Meta>
                <span className="date">
                  {format(activity.date, "DD MMM YYYY")} at{" "}
                  {format(activity.date, "HH:mm A")}
                </span>
              </Card.Meta>
              <Card.Description>
                <div>{activity.description}</div>
                <div>{activity.city}</div>
                <div>{activity.venue}</div>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                basic
                fluid
                color="grey"
                onClick={() => history.push("/activities")}
              >
                Cancel
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withContext(ActivityDetails);
