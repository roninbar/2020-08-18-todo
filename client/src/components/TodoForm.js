import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { todoAddAsync } from '../actions';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default connect(
    null, // map state to props
    function (dispatch) { // map dispatch to props
        return {
            submit: ({ what, when }) => what && when && dispatch(todoAddAsync(who(), what, when)),
        };
    },
)(function ({ submit }) {

    const [what, setWhat] = useState('');
    const onChangeWhat = function ({ target: { value } }) {
        return setWhat(value);
    };

    const [when, setWhen] = useState(new Date());

    const onSubmit = function (event) {
        event.preventDefault();
        submit({ what, when });
        setWhat('');
        setWhen(new Date());
    };

    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField variant="outlined" label="What" value={what} onChange={onChangeWhat} />
                <DateTimePicker inputVariant="outlined" value={when} onChange={setWhen} />
                <Button variant="contained" type="submit" color="primary" size="large">Add</Button>
            </form>
        </MuiPickersUtilsProvider>
    );
});

function who() {
    return 'ron';
}

