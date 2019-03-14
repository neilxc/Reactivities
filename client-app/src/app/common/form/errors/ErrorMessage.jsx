import React from 'react';
import { Message, MessageHeader, MessageList, MessageItem, MessageContent } from 'semantic-ui-react';

export default ({error, text}) =>
    <Message error>
        <MessageHeader>Error</MessageHeader>
        {text &&
        <MessageContent content={error} />}
        <MessageList>
            {error && Object.values(error).map((err, i) => (
                <MessageItem key={i}>{err}</MessageItem>
            ))}
        </MessageList>
        {/* {error.data && Object.keys(error.data).length > 0 && 
        <MessageList>
            {Object.values(error.data).map((err, i) => (
                <MessageItem key={i}>{err}</MessageItem>
            ))}
        </MessageList>} */}
    </Message>
