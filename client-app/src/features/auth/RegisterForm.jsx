import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import forms from "../../app/common/form/forms";
import TextInput from "../../app/common/form/inputs/TextInput";
import FormSubmitButton from "../../app/common/form/controls/FormSubmitButton";
import { observer } from "mobx-react";
import ErrorMessage from "../../app/common/form/errors/ErrorMessage";

const form = forms.registerForm;

@observer
class RegisterForm extends Component {
  componentWillMount() {
    form.clear();
  }

  render() {
    return (
      <Form error>
        <TextInput field={form.$("displayName")} />
        <TextInput field={form.$("username")} />
        <TextInput field={form.$("email")} />
        <TextInput field={form.$("password")} type="password" />
        <TextInput field={form.$("confirmPassword")} type="password" />
        {form.error &&
        <ErrorMessage error={form.error} />}
        <FormSubmitButton content="Register" form={form} fluid={true} color={'teal'} />
      </Form>
    );
  }
}

export default RegisterForm;
