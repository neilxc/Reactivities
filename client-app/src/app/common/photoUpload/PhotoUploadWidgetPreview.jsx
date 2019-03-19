import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { Image, Button } from 'semantic-ui-react';

export default inject('photoWidgetStore', 'profileStore')(
  observer(({ photoWidgetStore: { imageCropPreview, clearImages }, profileStore: {addPhoto, loadingPhoto} }) => (
    <Fragment>
      <Image
        style={{ minHeight: '200px', minWidth: '200px' }}
        src={imageCropPreview}
      />
      <Button.Group>
        <Button style={{ width: '100px' }} loading={loadingPhoto} positive icon='check' onClick={addPhoto} />
        <Button style={{ width: '100px' }} icon='close' onClick={clearImages} />
      </Button.Group>
    </Fragment>
  ))
);
