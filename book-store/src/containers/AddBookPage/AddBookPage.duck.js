export const ADD_BOOK_REQUEST = 'app/AddBookPage/ADD_BOOK_REQUEST'
export const ADD_BOOK_SUCCESS = 'app/AddBookPage/ADD_BOOK_SUCCESS'
export const ADD_BOOK_ERROR = 'app/AddBookPage/ADD_BOOK_SUCCESS'

const initialState = {
    AddBookInProgress: false,
    AddBookError: null
};

export default function AddBookPageReducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case ADD_BOOK_REQUEST:
            return { ...state, AddBookInProgress: true, AddBookError: null };
        case ADD_BOOK_SUCCESS:
            return { ...state, AddBookInProgress: false, book: payload };
        case ADD_BOOK_ERROR:
            return { ...state, AddBookInProgress: false, AddBookError: payload };
        default:
            return state;
    }
}

const AddBookRequest = () => ({ type: ADD_BOOK_REQUEST })
const AddBookSuccess = data => ({ type: ADD_BOOK_SUCCESS, payload: data })
const AddBookError = e => ({ type: ADD_BOOK_ERROR, payload: e })

export const addBook = params => (dispatch, getState, axios) => {
    const { isbn, ...bookValues } = params;
    dispatch(AddBookRequest());

    return axios.post(`/api/v1/books`, bookValues)
        .then(response => dispatch(AddBookSuccess(response.data)))
        .catch(err => dispatch(AddBookError(err)));
}