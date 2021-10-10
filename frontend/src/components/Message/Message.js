import React from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    header: {
        marginBottom: theme.spacing(2),
    },
}));

const Message = ({message}) => {
    const classes = useStyles();

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Grid container direction="column">
                    <Grid item container direction="row" justifyContent="space-between" className={classes.header}>
                        <Typography variant="subtitle2">{message.author}</Typography>
                        <Typography variant="subtitle2">{message.datetime}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">{message.message}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Message;