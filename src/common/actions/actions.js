import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import moment from 'moment';


function addMessage(message) {
    return {
        type: types.ADD_MESSAGE,
        message
    };
}

export function receiveRawMessage(message) {
    return {
        type: types.RECEIVE_MESSAGE,
        message
    };
}

export function receiveRawChannel(channel) {
    return {
        type: types.RECEIVE_CHANNEL,
        channel
    };
}

function addChannel(channel) {
    return {
        type: types.ADD_CHANNEL,
        channel
    };
}

export function typing(username) {
    return {
        type: types.TYPING,
        username
    };
}

export function stopTyping(username) {
    return {
        type: types.STOP_TYPING,
        username
    };
}


export function homePage(username) {
    return {
        type: types.SAVE_USERNAME,
        username
    };
}

function requestChannels() {
    return {
        type: types.LOAD_CHANNELS
    };
}
function receiveChannels(json) {
    return {
        type: types.LOAD_CHANNELS_SUCCESS,
        json
    };
}
export function fetchChannels(user) {
    return dispatch => {
        dispatch(requestChannels());
        return fetch(`/api/channels/${user}`)
            .then(response => response.json())
            .then(json => dispatch(receiveChannels(json)))
            .catch(error => {
                throw error;
            });
    };
}

function requestMessages() {
    return {
        type: types.LOAD_MESSAGES
    };
}
function receiveMessages(json, channel) {
    const date = moment().format('lll');
    return {
        type: types.LOAD_MESSAGES_SUCCESS,
        json,
        channel,
        date
    };
}
export function fetchMessages(channel) {
    return dispatch => {
        dispatch(requestMessages());
        return fetch(`/api/messages/${channel}`)
            .then(response => response.json())
            .then(json => dispatch(receiveMessages(json, channel)))
            .catch(error => {
                throw error;
            });
    };
}

function loadingValidationList() {
    return {
        type: types.LOAD_USERVALIDATION
    };
}

function receiveValidationList(json) {
    return {
        type: types.LOAD_USERVALIDATION_SUCCESS,
        json
    };
}

export function usernameValidationList() {
    return dispatch => {
        dispatch(loadingValidationList());
        return fetch('/api/all_usernames')
            .then(response => {
                return response.json();
            })
            .then(json => {
                return dispatch(receiveValidationList(json.map((item) => item.local.username)));
            })
            .catch(error => {
                throw error;
            });
    };
}

export function createMessage(message) {
    return dispatch => {
        dispatch(addMessage(message));
        return fetch('/api/newmessage', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
            .catch(error => {
                throw error;
            });
    };
}

export function createChannel(channel) {
    return dispatch => {
        dispatch(addChannel(channel));
        return fetch('/api/channels/new_channel', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(channel)
        })
        .catch(error => {
            throw error;
        });
    };
}


