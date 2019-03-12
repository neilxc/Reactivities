import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import DevTools from 'mobx-react-devtools';
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Header from "../../features/header/Header";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import { NotFound } from "../api/errors/NotFound";
import { inject, observer } from "mobx-react";
import { ServerError } from "../api/errors/ServerError";

@inject("activityStore")
@observer
class App extends Component {
  componentDidMount() {
    this.props.activityStore.loadActivities();
  }

  render() {
    return (
      <Fragment>
        <DevTools position='bottomLeft' />
        <Route path="/" exact component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              <Header />
              <Container style={{ paddingTop: "7em" }}>
                <Switch key={this.props.location.key}>
                  <Route path="/activities" component={ActivityDashboard} />
                  <Route path="/manage/:id" component={ActivityForm} />
                  <Route path="/createActivity" component={ActivityForm} />
                  <Route path="/activity/:id" component={ActivityDetails} />
                  <Route path="/serverError" component={ServerError} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
