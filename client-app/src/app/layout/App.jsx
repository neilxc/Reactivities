import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import MobxReactFormDevTools from "mobx-react-form-devtools";
import DevTools from "mobx-react-devtools";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import forms from '../common/form/forms';
import Header from "../../features/header/Header";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import LoadingComponent from './LoadingComponent';
import { NotFound } from "../api/errors/NotFound";
import { inject, observer } from "mobx-react";
import { ServerError } from "../api/errors/ServerError";
import ModalContainer from "../modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import SettingsPage from "../../features/user/SettingsPage";

MobxReactFormDevTools.register(forms);
// MobxReactFormDevTools.select('loginForm');
// MobxReactFormDevTools.open(true);

@inject("commonStore", "authStore")
@observer
class App extends Component {
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.authStore
        .getUser()
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }

  render() {
    if (!this.props.commonStore.appLoaded)
      return <LoadingComponent content="Loading app..." />;

    return (
      <Fragment>
        <DevTools position="bottomLeft" />
        <MobxReactFormDevTools.UI />
        <ModalContainer/>
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
                  <Route path="/profile/:username" component={ProfilePage} />
                  <Route path="/settings" component={SettingsPage} />
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
