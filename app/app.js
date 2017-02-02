import React from 'react';
import ReactDom from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import NamedStyleResolution from './components/NamedStyleResolution';
import ComposedStyleResolution from './components/ComposedStyleResolution';
import CharityList from './components/CharityList';
import DonationList from './components/DonationList';
import rootSaga from './sagas'
import rootReducer from './reducers'

var initialContent = {
    charities: [],
    donations: []
};

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

ReactDom.render(
    <Provider store={store}>
        <div>
            <NamedStyleResolution />
            <ComposedStyleResolution />
            <br/>
            <br/>
            <CharityList />
            <br/>
            <DonationList />
        </div>
    </Provider>, document.getElementById('main'));
