import axios from 'axios';
import{
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
}from './ActionTypes';

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());
        return axios.get('/api/memberLogin/getInfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.user_id));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}
 
export function getStatusSuccess(user_id) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        user_id
    };
}
 
export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

export function registerRequest(user_id, user_pw, group_id){
    return(dispatch) => {
        dispatch(register());
        return axios.post('/api/memberJoin/signup', {user_id, user_pw, group_id})
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export function register(){
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess(){
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(){
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

export function loginRequest(user_id, user_pw){
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/memberLogin/signin', {user_id, user_pw})
        .then((response) => {
            console.log("react: login 성공 확인");
            dispatch(loginSuccess(user_id));
        }).catch((error) => {
            dispatch(loginFailure());
        });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(user_id){
    return {
        type: AUTH_LOGIN_SUCCESS,
        user_id
    };
}

export function loginFailure(){
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

export function logoutRequest() {
    return(dispatch) => {
        return axios.post('/api/memberLogin/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}