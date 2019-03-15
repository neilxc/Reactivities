import React, { Fragment } from 'react';
import { Header, Card, Image, Button, ButtonGroup } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';

export default inject('profileStore')(
  observer(
    ({
      profileStore: {
        profile,
        deletePhoto,
        loading,
        clickedButton,
        setMainPhoto
      }
    }) => (
      <Fragment>
        <Header sub color='teal' content='All Photos' />
        <Card.Group itemsPerRow={5}>
          {profile.photos.map(photo => (
            <Card key={photo.id}>
              <Image src={photo.url} />
              {photo.isMain ? (
                <Button positive>Main Photo</Button>
              ) : (
                <ButtonGroup fluid widths={2}>
                  <Button
                    name={photo.id}
                    basic
                    color='green'
                    loading={clickedButton === photo.id && loading}
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
                      loading
                    }
                    basic
                    icon='trash'
                    color='red'
                  />
                </ButtonGroup>
              )}
            </Card>
          ))}
        </Card.Group>
      </Fragment>
    )
  )
);
