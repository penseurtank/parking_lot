import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux'
import {combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';
import homeReducer from './components/home/reducer'

const rootReducer= combineReducers({homeReducer})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store= createStore(
   rootReducer,
  composeEnhancers(applyMiddleware( ReduxThunk))
 )

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
