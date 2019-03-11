import React from 'react';
import { observer } from 'mobx-react';
import { FormField, Label } from 'semantic-ui-react';

export default observer(({field, rows}) =>
    <FormField error={field.blurred && field.hasError}>
        {field.label &&
            <label htmlFor={field.id}>{field.label}</label>
        }
        <textarea {...field.bind()} rows={rows} autoComplete='off'/>
        {field.error && <Label pointing color='red'>{field.error}</Label>}
    </FormField>);