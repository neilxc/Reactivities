import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Header from "../../features/header/Header";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard />
        </Container>
      </Fragment>
    );
  }
}

export default App;
