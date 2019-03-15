import React from 'react';
import { Segment, Header, Grid, Divider } from 'semantic-ui-react';
import SettingsPhotosDisplay from './SettingsPhotosDisplay';
import SettingsPhotosDropzone from './SettingsPhotosDropzone';
import SettingsPhotosCropper from './SettingsPhotosCropper';
import SettingsPhotoPreview from './SettingsPhotoPreview';
import { inject, observer } from 'mobx-react';

export default inject('profileStore')(
  observer(({ profileStore: { imagePreview, imageCropPreview } }) => (
    <Segment>
      <Header dividing size='large' content='Your Photos' />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <SettingsPhotosDropzone />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {imagePreview &&
          <SettingsPhotosCropper />}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview and Upload' />
          {imageCropPreview &&
          <SettingsPhotoPreview />}
        </Grid.Column>
      </Grid>
      <Divider />
      <SettingsPhotosDisplay />
    </Segment>
  ))
);
