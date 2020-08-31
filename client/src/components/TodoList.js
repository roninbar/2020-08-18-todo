import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import 'fontsource-roboto';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { todoDeleteAsync, todoDoneAsync, todoUpdateListAsync } from '../actions';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default connect(
    ({ todo }) => ({ todo }),
    dispatch => ({
        updateList: () => dispatch(todoUpdateListAsync()),
        doneItem: (id, done) => dispatch(todoDoneAsync(id, done)),
        deleteItem: (id) => dispatch(todoDeleteAsync(id)),
    }),
)(function ({ todo, updateList, doneItem, deleteItem }) {

    useEffect(function () {
        updateList();
    }, [updateList]);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>What</TableCell>
                        <TableCell align="right">When</TableCell>
                        <TableCell align="right">Done</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todo.list.map(({ id, what, when, done, error }) => (
                        <TableRow key={id} style={{ backgroundColor: error ? 'lightcoral' : done ? 'palegreen' : 'white' }}>
                            <TableCell component="th" scope="row" style={{ textDecoration: done ? 'line-through' : 'none' }}>
                                {what}
                            </TableCell>
                            <TableCell align="right">{when.toString()}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" onClick={() => doneItem(id, !done)}>Done</Button>
                            </TableCell>
                            <TableCell align="right">
                                <Button variant="contained" onClick={() => deleteItem(id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
