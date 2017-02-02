import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import AppView from './containers/AppView'

import Home from './components/Home'
import NamedStyleResolution from './components/NamedStyleResolution'
import ComposedStyleResolution from './components/ComposedStyleResolution'
import CharityList from './components/CharityList'
import DonationList from './components/DonationList'

import { rootSaga } from './redux/modules/index'
import rootReducer from './redux/modules/index'

var initialContent = {
    charities: [],
    donations: []
}

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
            <Router history={hashHistory}>
                <Route path="/" component={AppView}>
                    <IndexRoute component={Home}/>
                    <Route path="charities" component={CharityList}/>
                    <Route path="donations" component={DonationList}/>
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('main')
)