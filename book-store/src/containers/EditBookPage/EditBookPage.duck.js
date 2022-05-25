export const FETCH_BOOK_REQUEST = 'app/EditBookPage/FETCH_BOOK_REQUEST'
export const FETCH_BOOK_SUCCESS = 'app/EditBookPage/FETCH_BOOK_SUCCESS'
export const FETCH_BOOK_ERROR = 'app/EditBookPage/FETCH_BOOK_ERROR'
export const UPDATE_BOOK_REQUEST = 'app/EditBookPage/UPDATE_BOOK_REQUEST'
export const UPDATE_BOOK_SUCCESS = 'app/EditBookPage/UPDATE_BOOK_SUCCESS'
export const UPDATE_BOOK_ERROR = 'app/EditBookPage/UPDATE_BOOK_SUCCESS'
export const DELETE_BOOK_REQUEST = 'app/EditBookPage/DELETE_BOOK_REQUEST'
export const DELETE_BOOK_SUCCESS = 'app/EditBookPage/DELETE_BOOK_SUCCESS'
export const DELETE_BOOK_ERROR = 'app/EditBookPage/DELETE_BOOK_SUCCESS'

const initialState = {
    fetchBookInProgress: false,
    fetchBookError: null,
    book: null,
    updateInProgress: false,
    updateError: null,
    deleteBookInProgress: false,
    deleteBookError: null
};

export default function EditPageReducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_BOOK_REQUEST:
            return { ...state, fetchBookInProgress: true, fetchBookError: null };
        case FETCH_BOOK_SUCCESS:
            return { ...state, fetchBookInProgress: false, book: payload };
        case FETCH_BOOK_ERROR:
            return { ...state, fetchBookInProgress: false, fetchBookError: payload };
        case UPDATE_BOOK_REQUEST:
            return { ...state, updateInProgress: true, updateError: null };
        case UPDATE_BOOK_SUCCESS:
            return { ...state, updateInProgress: false, book: payload };
        case UPDATE_BOOK_ERROR:
            return { ...state, updateInProgress: false, updateError: payload };
        case DELETE_BOOK_REQUEST:
            return { ...state, deleteBookInProgress: true, deleteBookError: null };
        case DELETE_BOOK_SUCCESS:
            return { ...state, deleteBookInProgress: false, book: payload };
        case DELETE_BOOK_ERROR:
            return { ...state, deleteBookInProgress: false, deleteBookError: payload };
        default:
            return state;
    }
}

const fetchBookRequest = () => ({ type: FETCH_BOOK_REQUEST })
const fetchBookSuccess = data => ({ type: FETCH_BOOK_SUCCESS, payload: data })
const fetchBookError = e => ({ type: FETCH_BOOK_ERROR, payload: e })

const updateBookRequest = () => ({ type: UPDATE_BOOK_REQUEST })
const updateBookSuccess = data => ({ type: UPDATE_BOOK_SUCCESS, payload: data })
const updateBookError = e => ({ type: UPDATE_BOOK_ERROR, payload: e })

const deleteBookRequest = () => ({ type: DELETE_BOOK_REQUEST })
const deleteBookSuccess = data => ({ type: DELETE_BOOK_SUCCESS, payload: data })
const deleteBookError = e => ({ type: DELETE_BOOK_ERROR, payload: e })

export const fetchBook = id => (dispatch, getState, axios) => {
    dispatch(fetchBookRequest());

    return axios.get(`/api/v1/books/${id}`)
        .then(response => dispatch(fetchBookSuccess(response.data)))
        .catch(err => dispatch(fetchBookError(err)))
}

export const updateBook = params => (dispatch, getState, axios) => {
    const { isbn, ...updateValues } = params;
    dispatch(updateBookRequest());

    return axios.put(`/api/v1/books/${isbn}`, updateValues)
        .then(response => dispatch(updateBookSuccess(response.data)))
        .catch(err => dispatch(updateBookError(err)));
}

export const deleteBook = id => (dispatch, getState, axios) => {
    dispatch(deleteBookRequest());

    return axios.delete(`/api/v1/books/${id}`)
        .then(response => dispatch(deleteBookSuccess(response.data)))
        .catch(err => dispatch(deleteBookError(err)));
}