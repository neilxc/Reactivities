import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import TextAreaInput from '../../app/common/form/inputs/TextAreaInput';
import TextInput from '../../app/common/form/inputs/TextInput';
import forms from '../../app/common/form/forms';
import SubmitButton from '../../app/common/form/controls/FormSubmitButton';
import { inject, observer } from 'mobx-react';

const form = forms.profileForm;

@inject('profileStore')
@observer
class ProfileEditForm extends Component {
  componentDidMount() {
    const {
      profileStore: { profile }
    } = this.props;
    form.init({ displayName: profile.displayName, bio: profile.bio });
  }

  render() {
    const {
      profileStore: { toggleEditProfileMode, loading }
    } = this.props;
    return (
      <Form>
        <TextInput field={form.$('displayName')} />
        <TextAreaInput field={form.$('bio')} rows={4} />
        <SubmitButton
          form={form}
          loading={loading}
          content={'Update Profile'}
          floated='right'
          color={'green'}
        />
        <Button floated='right' content={'Cancel'} onClick={toggleEditProfileMode} />
      </Form>
    );
  }
}

export default ProfileEditForm;
