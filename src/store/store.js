//node import modules
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

/*
const getEnhancer = () => {

    // a little hack to get by that the redux devtools causes problems in different browsers
    if (window.navigator.userAgent.includes('Chrome')) {
        return compose(
            applyMiddleware(thunk), //this MUST go before the dev tools extension
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        );
    }

    return compose(applyMiddleware(thunk))

};*/

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

/*if (module.hot) {

    module.hot.accept('./reducers/', () => {

        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}
*/

export default store;
