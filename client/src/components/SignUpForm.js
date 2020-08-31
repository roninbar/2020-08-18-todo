import React, { Component } from 'react';
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

class SignUpForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
        };
    }

    onChange({ target: { name, value } }) {
        this.setState({ [name]: value });
    }

    async onSubmit(e) {
        e.preventDefault();
        const { username, password, password2 } = this.state;
        if (username && password === password2) {
            const body = new FormData();
            body.set('username', username);
            body.set('password', password);
            const response = await fetch('/signup', {
                method: 'POST',
                body,
            });
        }
    }

    render() {
        const { username, password, password2 } = this.state;
        const { classes } = this.props;
        return (
            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.onSubmit.bind(this)}>
                <TextField
                    variant="outlined"
                    type="text"
                    name="username"
                    label="Username"
                    error={!username}
                    value={username}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    error={password !== password2}
                    value={password}
                    onChange={this.onChange.bind(this)}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    name="password2"
                    label="Repeat Password"
                    error={password !== password2}
                    value={password2}
                    onChange={this.onChange.bind(this)}
                />
                <Button variant="contained" type="submit" color="primary" size="large">Sign Up</Button>
            </form>
        );
    }

}

export default withStyles(styles)(SignUpForm);