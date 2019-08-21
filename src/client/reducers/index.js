import authentication from './authentication';
import dirList from './dirList';
import {combineReducers} from 'redux';

export default combineReducers({
    authentication,
    dirList
});