function errors(state = '', action) {

    switch (action.type){

        case 'FETCH_ERROR' :
            return action.error;
        default :
            return state
    }


}

export default errors;