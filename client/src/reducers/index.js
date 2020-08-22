import _ from 'lodash';
import { combineReducers } from 'redux';
import { TODO_REPLACE_LIST, TODO_SET_ERROR, TODO_SET_LOADING } from '../actions';

function todo(state = { list: [], loading: true, error: false }, { type, payload }) {
    switch (type) {
        case TODO_SET_LOADING:
            return { ...state, loading: true, error: false };
        case TODO_REPLACE_LIST:
            return { list: payload, loading: false, error: false };
        case TODO_SET_ERROR:
            return _.set({ ...state, loading: false, error: true }, `list[${payload.id}].error`, true);
        default:
            return state;
    }
}

export default combineReducers({ todo });