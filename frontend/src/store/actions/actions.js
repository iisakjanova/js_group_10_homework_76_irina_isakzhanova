import axiosApi from "../../axiosApi";

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

export const GET_NEW_MESSAGES_REQUEST = 'GET_NEW_MESSAGES_REQUEST';
export const GET_NEW_MESSAGES_SUCCESS = 'GET_NEW_MESSAGES_SUCCESS';
export const GET_NEW_MESSAGES_FAILURE = 'GET_NEW_MESSAGES_FAILURE';

export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';

export const getMessagesRequest = () => ({type: GET_MESSAGES_REQUEST});
export const getMessagesSuccess = data => ({type: GET_MESSAGES_SUCCESS, payload: data});
export const getMessagesFailure = error => ({type: GET_MESSAGES_FAILURE, payload: error});

export const getNewMessagesRequest = () => ({type: GET_NEW_MESSAGES_REQUEST});
export const getNewMessagesSuccess = data => ({type: GET_NEW_MESSAGES_SUCCESS, payload: data});
export const getNewMessagesFailure = error => ({type: GET_NEW_MESSAGES_FAILURE, payload: error});

export const postMessageRequest = () => ({type: POST_MESSAGE_REQUEST});
export const postMessageSuccess = () => ({type: POST_MESSAGE_SUCCESS});
export const postMessageFailure = error => ({type: POST_MESSAGE_FAILURE, payload: error});

export const getMessages = () => {
    return async dispatch => {
        try {
            dispatch(getMessagesRequest());
            const response = await axiosApi.get('/messages');
            dispatch(getMessagesSuccess(response.data));
        } catch (error) {
            dispatch(getMessagesFailure(error));
        }
    };
};

export const getNewMessages = () => {
    return async (dispatch, getState) => {
        const lastDatetime = getState().lastDatetime;

        try {
            dispatch(getNewMessagesRequest());
            const response = await axiosApi.get(`/messages?datetime=${lastDatetime}`);
            dispatch(getNewMessagesSuccess(response.data));
        } catch (error) {
            dispatch(getNewMessagesFailure(error));
        }
    };
};

export const postMessage = (data) => {
    return async dispatch => {
        try {
            dispatch(postMessageRequest());
            await axiosApi.post('/messages', data);
            dispatch(postMessageSuccess());
        } catch (error) {
            dispatch(postMessageFailure(error));
        }
    };
};