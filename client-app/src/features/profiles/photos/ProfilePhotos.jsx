import React, { Fragment } from 'react';
import { Header, Image, TabPane, Button, Card } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import ProfileEditButtons from './PhotoEditButtons';
import TabHeader from '../tabs/TabHeader';
import TabContent from '../tabs/TabContent';
import PhotoUploadWidget from '../../../app/common/photoUpload/PhotoUploadWidget';

export default inject('profileStore')(
  observer(
    ({
      profileStore: {
        profile,
        clickedButton,
        loading,
        setMainPhoto,
        editMode,
        deletePhoto,
        editPhotoMode,
        toggleEditMode,
        toggleEditPhotoMode,
        toggleAddPhotoMode,
        addPhotoMode,
        isCurrentUser
      }
    }) => (
      <TabPane>
        <TabHeader>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Fragment>
              {!addPhotoMode && (
                <Button
                  floated='right'
                  content={editPhotoMode ? 'Cancel' : 'Edit'}
                  basic
                  onClick={toggleEditPhotoMode}
                />
              )}
              {editPhotoMode && (
                <Button
                  floated='right'
                  content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                  basic
                  onClick={toggleAddPhotoMode}
                />
              )}
            </Fragment>
          )}
        </TabHeader>
        <TabContent>
          {addPhotoMode ? (
            <PhotoUploadWidget />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image src={photo.url} />
                    {editPhotoMode && <ProfileEditButtons photo={photo} />}
                  </Card>
                ))}
            </Card.Group>
          )}
        </TabContent>
      </TabPane>
    )
  )
);
