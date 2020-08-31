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

export function todoSetError(error) {
    return {
        type: TODO_SET_ERROR,
        payload: error,
    };
}

export function todoAddAsync(who, what, when) {
    return sendJsonRequestAsync(201, 'POST', '/todo', { who, what, when });
}

export function todoDoneAsync(id, done) {
    return sendJsonRequestAsync(200, 'PATCH', `/todo/${id}`, { done });
}

export function todoDeleteAsync(id) {
    return modifyListAsync(204, `/todo/${id}`, { method: 'DELETE' });
}

export function todoUpdateListAsync() {
    return async function (dispatch) {
        dispatch(todoSetLoading());
        const response = await fetch('/todo/all');
        if (response.status === 200) {
            dispatch(todoReplaceList(await response.json()));
        } else {
            dispatch(todoSetError({ message: response.statusText }));
        }
    };
}

function sendJsonRequestAsync(expectedStatus, method, url, body) {
    return modifyListAsync(expectedStatus, url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

function modifyListAsync(expectedStatus, url, fetchOptions) {
    return async function (dispatch) {
        dispatch(todoSetLoading());
        const response = await fetch(url, fetchOptions);
        if (response.status === expectedStatus) {
            dispatch(todoUpdateListAsync());
        }
        else {
            dispatch(todoSetError({ message: response.statusText }));
        }
    };
}

