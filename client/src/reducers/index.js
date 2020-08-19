import { combineReducers } from 'redux';

function todo(state = [], { type, payload }) {
    switch (type) {
        case 'NEW':
            return [...state, payload];
        default:
            return state;
    }
}

export default combineReducers({ todo });