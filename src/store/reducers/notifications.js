function notifications(state = false, action) {

    switch(action.type){

        case 'ALERT_USER':
            return action.payload;
        default:
            return state;
    }

}

export default notifications;