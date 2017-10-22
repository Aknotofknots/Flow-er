function comments(state = [], action) {

    switch(action.type){

        case 'ADD_COMMENT':
            return [...state, action.payload];
        case 'REMOVE_COMMENT':
             return state.filter(comment => {return comment.commentId !== action.payload.commentId});
        default:
            return state;
    }

}

export default comments;