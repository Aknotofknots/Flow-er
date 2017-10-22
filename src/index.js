//modules/components import
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'; // this provides the app with the store so it's accessible from anywhere instead of passing the store down through every component tree


//service worker
import registerServiceWorker from './registerServiceWorker';

//css
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';

//store
import store from './store/store';

render(

    <Provider store={store}>
        <App/>
    </Provider>,

    document.getElementById('root')
);
registerServiceWorker();


/*The below setup is common when rendering a vanilla redux app, but if the react-reduc library is used the
 this setup is run for us in the background so we can just write the usuall render method */

/*
function render() {

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();

}

//render the application initially
render();

//when an update occurs re-render the application
store.subscribe(render);
*/

