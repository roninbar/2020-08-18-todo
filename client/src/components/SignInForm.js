import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        '& .MuiTextField-root, & .MuiButton-root': {
            margin: theme.spacing(1),
        },
        '& .MuiTextField-root': {
            width: '25ch',
        },
    },
});

function SignInForm({ classes }) {

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
            <TextField
                type="text"
                variant="outlined"
                label="Username" />
            <TextField
                type="password"
                variant="outlined"
                label="Password"
                autoComplete="current-password"
            />
            <Button type="submit" variant="contained" color="primary" size="large">Log In</Button>
        </form>
    );
}

export default withStyles(styles)(SignInForm);