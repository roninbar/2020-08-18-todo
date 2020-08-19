import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function () {
    const [selectedDate, handleDateChange] = useState(new Date());
    const classes = useStyles();
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="filled-basic" label="What" variant="filled" />
                <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                <Button type="submit" variant="contained" color="primary">Add</Button>
            </form>
        </MuiPickersUtilsProvider>
    );
}