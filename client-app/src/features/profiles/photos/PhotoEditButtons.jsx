import React from 'react';
import {
  Button,
  ButtonGroup,
} from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

export default inject('profileStore')(
  observer(({profileStore: {clickedButton, loadingPhoto, setMainPhoto, deletePhoto}, photo}) => (
    <ButtonGroup fluid widths={2}>
      <Button
        name={photo.id}
        basic
        color='green'
        loading={clickedButton === photo.id && loadingPhoto}
        onClick={e => setMainPhoto(photo, e)}
      >
        Main
      </Button>
      <Button
        name={photo.id}
        onClick={e => deletePhoto(photo, e)}
        loading={
          clickedButton &&
          clickedButton.name === photo.id &&
          clickedButton.type === 'delete' &&
          loadingPhoto
        }
        basic
        icon='trash'
        color='red'
      />
    </ButtonGroup>
  ))
);
