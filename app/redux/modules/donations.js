import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

export const REQUEST_DONATIONS = 'REQUEST_DONATIONS'
export const RECEIVE_DONATIONS = 'RECEIVE_DONATIONS'

/**
 * Defines the actions, the saga, and then the reducer for donations
 *
 * @author Jeff Risberg
 * @since 02/02/2017
 */

export function requestDonations() {
    return {
        type: REQUEST_DONATIONS
    }
}

function receiveDonations(donations) {
    return {
        type: RECEIVE_DONATIONS,
        donations: donations,
        receivedAt: Date.now()
    }
}

function fetchDonationsApi() {
    return fetch(`/api/donations` )
        .then(response => response.json() )
        .then(json => json.data )
}

export function* watchForFetchDonations() {
    yield put( requestDonations() )
    const donations = yield call(fetchDonationsApi)
    yield put( receiveDonations(donations) )
}

export default function reducer(state = {
    isFetching: false,
    items: []
}, action = {}) {
    switch (action.type) {
        case REQUEST_DONATIONS:
            return {...state, isFetching: true}

        case RECEIVE_DONATIONS:
            return {
                ...state,
                isFetching: false,
                items: action.donations,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}
