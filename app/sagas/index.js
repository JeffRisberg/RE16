/* eslint-disable no-constant-condition */
import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import * as actions from '../actions'

export function fetchCharitiesApi() {
    return fetch(`/api/charities` )
        .then(response => response.json() )
        .then(json => json.data )
}

export function* fetchCharities() {
    yield put( actions.requestCharities() )
    const charities = yield call(fetchCharitiesApi)
    yield put( actions.receiveCharities(charities) )
}

export function fetchDonationsApi() {
    return fetch(`/api/donations` )
        .then(response => response.json() )
        .then(json => json.data )
}

export function* fetchDonations() {
    yield put( actions.requestDonations() )
    const donations = yield call(fetchDonationsApi)
    yield put( actions.receiveDonations(donations) )
}

export default function* root() {
    yield fork(fetchCharities)
    yield fork(fetchDonations)
}

