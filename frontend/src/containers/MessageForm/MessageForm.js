import React, {useState} from 'react';
import {Grid, makeStyles, Paper, Typography, TextField, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getNewMessages, postMessage} from "../../store/actions/actions";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
}));

const initialState = {
    author: '',
    message: ''
};

const MessageForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [message, setMessage] = useState(initialState);
    const error = useSelector(state => state.postMessageError)

    const handleInputChange = e => {
        const {name, value} = e.target;

        setMessage(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        await dispatch(postMessage(message));
        dispatch(getNewMessages());

        if (message.author && message.message) {
            setMessage(initialState);
        }
    };

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography variant="h6" className={classes.title}>Send message</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                error={!!error}
                                name="author"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={message.author}
                                onChange={handleInputChange}
                                helperText={error && !message.author ? 'Enter your name! ' + error : null}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                error={!!error}
                                name="message"
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={5}
                                fullWidth
                                value={message.message}
                                onChange={handleInputChange}
                                helperText={error && !message.message ? 'Enter a message! ' + error : null}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                type="submit"
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default MessageForm;