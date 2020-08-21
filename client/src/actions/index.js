export const TODO_REPLACE_LIST = 'TODO_REPLACE_LIST';
export const TODO_SET_LOADING = 'TODO_SET_LOADING';
export const TODO_SET_ERROR = 'TODO_SET_ERROR';

export function todoSetLoading() {
    return {
        type: TODO_SET_LOADING,
    };
}

export function todoReplaceList(list) {
    return {
        type: TODO_REPLACE_LIST,
        payload: list,
    };
}

export function todoSetError() {
    return {
        type: TODO_SET_ERROR,
    };
}

export function todoUpdateListAsync() {
    return async function (dispatch) {
        dispatch(todoSetLoading());
        const response = await fetch('/todo/all');
        if (response.status === 200) {
            dispatch(todoReplaceList(await response.json()));
        } else {
            dispatch(todoSetError());
        }
    };
}

export function todoAddActionAsync(who, what, when) {
    return async function (dispatch) {
        dispatch(todoSetLoading());
        const response = await fetch('/todo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ who, what, when }),
        });
        if (response.status === 201) {
            dispatch(todoUpdateListAsync());
        } else {
            dispatch(todoSetError());
        }
    };
}

