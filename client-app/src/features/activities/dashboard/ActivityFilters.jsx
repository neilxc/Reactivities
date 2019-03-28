import React, { Fragment } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';
import { inject, observer } from 'mobx-react';

export default inject('activityStore')(
  observer(
    ({ activityStore: { predicate, setPredicate, setDatePredicate } }) => (
      <Fragment>
        <Menu vertical size={'large'} style={{ width: '100%', marginTop: 30 }}>
          <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
          <Menu.Item
            active={!predicate.isGoing && !predicate.isHost}
            onClick={setPredicate}
            color={'blue'}
            name={'all'}
            content={'All Activities'}
          />
          <Menu.Item
            active={predicate.isGoing}
            onClick={setPredicate}
            color={'blue'}
            name={'isGoing'}
            content={"I'm Going"}
          />
          <Menu.Item
            active={predicate.isHost}
            onClick={setPredicate}
            color={'blue'}
            name={'isHost'}
            content={"I'm hosting"}
          />
        </Menu>
        <Header
          icon={'calendar'}
          attached
          color={'teal'}
          content={'Select Date'}
        />
        <Calendar onChange={setDatePredicate} value={predicate.startDate || new Date()} />
      </Fragment>
    )
  )
);
