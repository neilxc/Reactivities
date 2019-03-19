import React from 'react';
import {observer} from 'mobx-react';
import {SelectList} from 'react-widgets';
import {Form, Label} from 'semantic-ui-react';
import {classnames} from 'classnames';

export default observer(({field, inline}) => {
        return (
            <Form.Field>
                <label
                    htmlFor={field.id}
                >
                    {field.label}
                </label>
                <SelectList
                    className={inline && 'radio--inline'}
                    {...field.bind()}
                    value={field.value}
                    onChange={field.sync}
                    data={field.extra}
                />
                {field.error && <Label pointing color='red'>{field.error}</Label>}
            </Form.Field>
        )
    }
);