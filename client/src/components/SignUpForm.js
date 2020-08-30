import React from 'react';
import { TextField, withStyles, Button } from '@material-ui/core';

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

function SignUpForm({ classes }) {
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
            />
            <TextField
                type="password"
                variant="outlined"
                label="Repeat Password"
            />
            <Button type="submit" variant="contained" color="primary" size="large">Sign Up</Button>
        </form>
    );
}

export default withStyles(styles)(SignUpForm);