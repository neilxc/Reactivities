import React from 'react';
import { Message, MessageHeader, MessageList, MessageItem } from 'semantic-ui-react';

export default ({error}) =>
    <Message error>
        <MessageHeader>{error.statusText}</MessageHeader>
        <MessageList>
            {Object.values(error.data).map((err, i) => (
                <MessageItem key={i}>{err}</MessageItem>
            ))}
        </MessageList>
    </Message>
