import {useEffect} from 'react';
import React from 'react';
import {Box, Grid, makeStyles, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";

import MessageForm from "../MessageForm/MessageForm";
import {getMessages, getNewMessages} from "../../store/actions/actions";
import Messages from "../Messages/Messages";

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getNewMessages());
        }, 3000);
        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <Box className={classes.root}>
            <Box className={classes.title}>
                <Typography variant="h5">Hello!</Typography>
                <Typography variant="h6">Welcome to JS group 10 chat!</Typography>
            </Box>
            <Grid container direction="column" spacing={2}>
                <Messages />
                <MessageForm/>
            </Grid>
        </Box>
    );
};

export default Chat;