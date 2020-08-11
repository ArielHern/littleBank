import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

const MessageIcon = () => (
    <div style={{ width: "400px" }}>
        <Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Just one second</Message.Header>
      We are fetching your banking information.
    </Message.Content>
        </Message>
    </div>
)

export default MessageIcon