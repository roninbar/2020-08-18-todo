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
    dispatch => ({ submit: ({ what, when }) => dispatch(addTodoAsync(who(), what, when)) }),
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
                <div>
                    <TextField id="filled-basic" label="What" variant="filled" value={what} onChange={onChangeWhat} />
                </div>
                <div>
                    <DateTimePicker value={when} onChange={setWhen} />
                </div>
                <div>
                    <Button type="submit" variant="contained" color="primary">Add</Button>
                </div>
            </form>
        </MuiPickersUtilsProvider>
    );
});

function who() {
    return 'ron';
}

const NEW = 'NEW';

function addTodo(who, what, when) {
    return {
        type: NEW,
        payload: { who, what, when },
    };
}

function addTodoAsync(who, what, when) {
    return async dispatch => {
        const response = await fetch('/todo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ who, what, when }),
        });
        if (response.status === 201) {
            dispatch(addTodo(who, what, when));
        }
    };
}