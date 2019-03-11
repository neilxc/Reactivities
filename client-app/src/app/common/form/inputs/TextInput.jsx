import React from 'react';
import { observer } from 'mobx-react';
import { FormField, Label } from 'semantic-ui-react';

export default observer(({field, type = 'text'}) =>
    <FormField error={field.blurred && field.hasError}>
        {field.label &&
            <label htmlFor={field.id}>{field.label}</label>
        }
        <input {...field.bind({type})} autoComplete='off'/>
        {field.error && <Label pointing color='red'>{field.error}</Label>}
    </FormField>);