import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ingredientsReducer, ordersReducer, contactDataReducer, authReducer } from './store/reducers/reducers';
import * as sagas from './store/sagas/index';

const rootReducer = combineReducers({
    ingredientsReducer: ingredientsReducer,
    ordersReducer: ordersReducer,
    contactDataReducer: contactDataReducer,
    authReducer: authReducer
});

const sagaMiddleware = createSagaMiddleware();

// const logger = store => {
//     return next => {
//         return action => {
//             console.log('[Middleware] Dispatching', action);
//             const result = next(action);
//             console.log('[Middleware] next state', store.getState());
//             return result;
//         }
//     }
// };

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)) );

sagaMiddleware.run(sagas.watchAuth);
sagaMiddleware.run(sagas.watchBurgerBuilder);
sagaMiddleware.run(sagas.watchOrders);
sagaMiddleware.run(sagas.watchContactData);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
