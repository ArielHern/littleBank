import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification: React.FC<{ content: string, header: string }> = ({ content, header }) => {
    const [visile, setVisival] = React.useState(true);

    const handleDismiss = () => {
        setVisival(false);
    }
    if (!visile) {
        return null
    }

    return (
        <Message
            onDismiss={handleDismiss}
            header={header}
            content={content}
        />
    )

}

export default Notification