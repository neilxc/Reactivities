import React, { Fragment } from "react";
import { Header, List } from "semantic-ui-react";
import { withContext } from "../../../app/context";
import ActivityListItem from "./ActivityListItem";
import { format, parseISO } from "date-fns";

const ActivityList = ({ activities, getActivitiesByDate }) => {
  const activityGroup = getActivitiesByDate(activities);
  return (
    <Fragment>
      {activityGroup.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color={"teal"}>
            {format(parseISO(group), "EEEE dd MMMM")}
          </Header>
          <List>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </List>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default withContext(ActivityList);
