import axios from 'axios';
import{
    DIR_POST,
    DIR_POST_SUCCESS,
    DIR_POST_FAILURE,
    DIR_LIST,
    DIR_LIST_SUCCESS,
    DIR_LIST_FAILURE,
    DIR_REMOVE,
    DIR_REMOVE_SUCCESS,
    DIR_REMOVE_FAILURE
}from './ActionTypes';

export function dirPostRequest(insertDirinput){
    return (dispatch) => {
        dispatch(dirPost());
        return  axios.post('/api/dirlist/insertDir', { insertDirinput })
        .then((response) => {
            dispatch(dirPostSuccess());
        }).catch((error) => {
            dispatch(dirPostFailure(error.response.data.code));
        });
    };
}

export function dirPost() {
    return {
        type: DIR_POST
    };
}
 
export function dirPostSuccess() {
    return {
        type: DIR_POST_SUCCESS
    };
}
 
export function dirPostFailure() {
    return {
        type: DIR_POST_FAILURE,
        error
    };
}

export function dirListRequest(isInitial) {
    return(dispatch) => {
        dispatch(dirList());
        let url = '/api/dirlist';
        url = isInitial ? url : '/api/dirlist/new';
        return axios.get(url)
        .then((response) => {
            // console.log("whybb:" + response.data);
            dispatch(dirListSuccess(response.data, isInitial));
        }).catch((error) => {
            dispatch(dirListFailure());
        });
    };
}

export function dirList() {
    return{
        type: DIR_LIST
    };
}

export function dirListSuccess(data, isInitial){
    return{
        type: DIR_LIST_SUCCESS,
        data,
        isInitial
    };
}

export function dirListFailure() {
    return{
        type: DIR_LIST_FAILURE
    };
}

export function dirRemoveRequest(deleteDirInput, index){
    return (dispatch) => {
        dispatch(dirRemove());
        return axios.delete('/api/dirlist/delete', { data: {deleteDirInput: deleteDirInput}})
        .then((response) => {
            // console.log("index: " + index);
            dispatch(dirRemoveSuccess(index));
        }).catch((error) => {
            // dispatch(dirRemoveFailure(error.response.data.code));
        })
    };
}

export function dirRemove(){
    return{
        type: DIR_REMOVE
    };
}

export function dirRemoveSuccess(index) {
    return{
        type: DIR_REMOVE_SUCCESS,
        index
    }
}

export function dirRemoveFailure(error) {
    return{
        type: DIR_REMOVE_FAILURE,
        error
    }
}