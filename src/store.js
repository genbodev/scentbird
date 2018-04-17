import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { routerReducer } from 'react-router-redux';
import citiesReducer from './reducers/citiesReducer';

const reducer = combineReducers({
    routing: routerReducer,
    citiesReducer
});

const composeEnhancers = composeWithDevTools({
    //
});

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(logger, thunk, promise()),
    //
));

export default store;