import {useEffect, useState} from 'react';
import React from 'react';
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";

import Message from "../../components/Message/Message";
import MessageForm from "../../components/MessageForm/MessageForm";
import axiosApi from "../../axiosApi";

const ERROR_MESSAGE_TEXT = 'Something went wrong... Error status ';
let lastDatetime;

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
}));

const Chat = () => {
    const classes = useStyles();

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const result = await getMessages();
                setMessages(result);
                setError('');

                lastDatetime = result[result.length - 1].datetime;
            } catch (e) {
                setError(ERROR_MESSAGE_TEXT + e.response.status);
            }
        })();
    }, []);

    useEffect(() => {
        const interval = checkForNewMessages();
        return () => clearInterval(interval);
    }, []);

    const getMessages = async () => {
        const response = await axiosApi.get('/messages');
        return response.data;
    };

    const getNewMessages = async () => {
        const response = await axiosApi.get(`messages?datetime=${lastDatetime}`);
        return response.data;
    };

    const storeNewMessagesLocally = data => {
        if (data && data.length > 0) {
            setMessages(prevMessages => (
                [
                    ...prevMessages,
                    ...data
                ]
            ));

            lastDatetime = data[data.length - 1].datetime;
        }
    };

    const checkForNewMessages = () => {
        return setInterval(async () => {
            try {
                const result = await getNewMessages();
                setError('');
                storeNewMessagesLocally(result);
            } catch (e) {
                setError(ERROR_MESSAGE_TEXT + e.response.status);
            }
        }, 2000);
    };

    const handleFormChange = (author, text) => {
        const newMessage = {
            author,
            text
        };

        setCurrentMessage(newMessage);
    };

    const handleFormSend = async (e) => {
        e.preventDefault();

        try {
            await axiosApi.post('/messages', {author: currentMessage.author, message: currentMessage.text});
            setCurrentMessage('');

            const result = await getNewMessages();
            storeNewMessagesLocally(result);

            setError('');
        } catch (e) {
            setError(ERROR_MESSAGE_TEXT + e.response.status);
        }
    };

    return (
        <Box className={classes.root}>
            {error ? <div className="text-center bg-danger text-white py-2">{error}</div> : null }
            <Box className={classes.title}>
                <Typography variant="h5">Hello!</Typography>
                <Typography variant="h6">Welcome to JS group 10 chat!</Typography>
            </Box>
            <Grid container direction="column" spacing={2}>
                {messages.map(message => (
                    <Message
                        message={message}
                        key={message.id}
                    />
                ))}
                <MessageForm
                    value={currentMessage}
                    onChange={handleFormChange}
                    onSend={handleFormSend}
                />
            </Grid>
        </Box>
    );
};

export default Chat;