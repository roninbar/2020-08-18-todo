import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default connect(
    null,
    dispatch => ({ submit: ({ what, when }) => dispatch({ type: 'NEW', payload: { what, when } }) })
)(function ({ submit }) {

    const [what, setWhat] = useState('');
    const [when, setWhen] = useState(new Date());
    const classes = useStyles();
    const onSubmit = function (event) {
        event.preventDefault();
        submit({ what, when });
    };
    const onChangeWhat = function (event) {
        return setWhat(event.target.value);
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField id="filled-basic" label="What" variant="filled" value={what} onChange={onChangeWhat} />
                <DateTimePicker value={when} onChange={setWhen} />
                <Button type="submit" variant="contained" color="primary">Add</Button>
            </form>
        </MuiPickersUtilsProvider>
    );
});