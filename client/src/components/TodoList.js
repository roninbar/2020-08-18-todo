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
import React from 'react';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default connect(
    ({ todo }) => ({ todo }),
    null,
)(function ({ todo }) {
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>What</TableCell>
                        <TableCell align="right">When</TableCell>
                        <TableCell align="right">Done</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todo.map(({ what, when }, idx) => (
                        <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                                {what}
                            </TableCell>
                            <TableCell align="right">{when.toString()}</TableCell>
                            <TableCell align="right"><Button variant="contained">Done</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});
