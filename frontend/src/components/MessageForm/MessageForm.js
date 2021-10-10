import React from 'react';
import {Grid, makeStyles, Paper, Typography, TextField, Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
}));

const MessageForm = props => {
    const classes = useStyles();

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Typography variant="h6" className={classes.title}>Send message</Typography>
                <form onSubmit={(e) => props.onSend(e)}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                name="author"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={props.value.author || ''}
                                onChange={e => props.onChange(e.target.value, props.value.text)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                name="message"
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={5}
                                fullWidth
                                value={props.value.text || ''}
                                onChange={e => props.onChange(props.value.author, e.target.value)}
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