import { take, put, call, fork, select } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import { watchForFetchCharities } from './charities'
import { watchForFetchDonations } from './donations'

import charities from './charities'
import donations from './donations'

export function* rootSaga() {
    yield fork(watchForFetchCharities)
    yield fork(watchForFetchDonations)
}

export default combineReducers({
    charities,
    donations
});
