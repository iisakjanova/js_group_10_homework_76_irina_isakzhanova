import React from 'react';
import {useSelector} from "react-redux";

import Message from "../../components/Message/Message";

const Messages = () => {
    const messages = useSelector(state => state.messages);

    return (
        <>
            {messages
                ?
                messages.map(message => (
                    <Message
                        message={message}
                        key={message.id}
                    />
                ))
                :
                null
            }
        </>
    );
};

export default Messages;