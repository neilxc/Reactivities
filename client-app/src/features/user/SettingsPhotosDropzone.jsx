import React from 'react';
import { observer, inject } from 'mobx-react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import { Icon, Header } from 'semantic-ui-react';

export default inject('profileStore')(
  observer(({ profileStore: { imagePreview, onDropFile } }) => (
    <Dropzone
      onDrop={acceptedFiles => onDropFile(acceptedFiles)}
      multiple={false}
      disabled={!!imagePreview}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          className={classNames('dropzone', {
            'dropzone--isActive': isDragActive
          })}
        >
          <input {...getInputProps()} />
          <Icon name='upload' size='huge' />
          <Header content='Drop image here or click to upload' />
        </div>
      )}
    </Dropzone>
  ))
);
