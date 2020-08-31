import React, { Component } from 'react';
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

class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    async onSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state;
        const body = new FormData();
        body.set('username', username);
        body.set('password', password);
        await fetch('/login', {
            method: 'post',
            body,
        });
    }

    onChangeField({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    render() {
        const { classes } = this.props;
        const { username, password } = this.state;
        return (
            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    variant="outlined"
                    type="text"
                    name="username"
                    label="Username"
                    value={username}
                    onChange={this.onChangeField.bind(this)} />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={this.onChangeField.bind(this)}
                />
                <Button type="submit" variant="contained" color="primary" size="large">Log In</Button>
            </form>
        );
    }

}

export default withStyles(styles)(SignInForm);