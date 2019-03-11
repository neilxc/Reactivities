import React, {Fragment} from "react";
import {inject, observer} from 'mobx-react';

const HomePage = ({history, homeStore: {title, name, isLoggedIn, login}}) => {
  return (
    <div className="ui inverted vertical masthead center aligned segment">
      <div className="ui text container">
        <h1 className="ui inverted stackable header">
          <img className="ui image massive" src="/assets/logo.png" alt="logo" />
          <div className="content">{title}</div>
        </h1>
        {!isLoggedIn ? (
          <Fragment>
            <h2>Welcome to the {title}</h2>
            <h3>Sign in or Register to join in the activities</h3>
            <div className="ui huge white inverted button" onClick={login}>Login</div>
            <div className="ui huge white inverted button">Register</div>
          </Fragment>
        ) : (
          <Fragment>
            <h2>Welcome back {name}!</h2>
            <h3>Click the big button below to go to the activities!</h3>
            <div
              onClick={() => history.push("/activities")}
              className="ui huge white inverted button"
            >
              Take me to the Activities!
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default inject('homeStore')(observer(HomePage));
