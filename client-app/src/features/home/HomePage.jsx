import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

const HomePage = ({
  history,
  authStore: { isLoggedIn, user },
  modalStore: { openModal }
}) => {
  return (
    <div className='ui inverted vertical masthead center aligned segment'>
      <div className='ui text container'>
        <h1 className='ui inverted stackable header'>
          <img className='ui image massive' src='/assets/logo.png' alt='logo' />
          <div className='content'>Reactivities</div>
        </h1>
        {!isLoggedIn ? (
          <Fragment>
            <h2>Welcome to Reactivities</h2>
            <h3>Sign in or Register to join in the activities</h3>
            <Button
              onClick={() =>
                openModal({
                  component: <LoginForm />,
                  header: 'Sign in!'
                })
              }
              size='huge'
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() =>
                openModal({
                  component: <RegisterForm />,
                  header: 'Register for Reactivities!'
                })
              }
              size='huge'
              inverted
            >
              Register
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <h2>Welcome back {user.displayName}!</h2>
            <h3>Click the big button below to go to the activities!</h3>
            <div
              onClick={() => history.push('/activities')}
              className='ui huge white inverted button'
            >
              Take me to the Activities!
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default inject('authStore', 'modalStore')(observer(HomePage));
