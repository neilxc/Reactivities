import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoadingComponent = ({inverted, content, style}) => {
    return (
        <Dimmer inverted={inverted} active={true} style={style}>
            <Loader content={content}/>
        </Dimmer>
    )
};

export default LoadingComponent