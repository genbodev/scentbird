import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store';
import './index.css';
import Subscription from './containers/subscription/subscription';
import About from './containers/about/about';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCities } from './actions/citiesAction';
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(getCities());

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={Subscription} />
            <Route path='/about' component={About} />
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
