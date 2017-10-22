import {combineReducers} from 'redux';

//reducer imports
import errors from './errors';
import user from './user';
import articles from './articles';
import comments from './comments';
import notifications from './notifications';


const rootReducer = combineReducers({
    errors,
    user,
    articles,
    comments,
    notifications
});

export default rootReducer;