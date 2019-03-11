import React, { Fragment } from "react";
import { Header, List } from "semantic-ui-react";
import ActivityListItem from "./ActivityListItem";
import { format, parseISO } from "date-fns";
import {inject, observer} from 'mobx-react';

const ActivityList = ({ activityStore: {activitiesByDate} }) => {
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
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

export default inject('activityStore')(observer(ActivityList));
