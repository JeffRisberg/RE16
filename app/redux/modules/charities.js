import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'

export const REQUEST_CHARITIES = 'REQUEST_CHARITIES'
export const RECEIVE_CHARITIES = 'RECEIVE_CHARITIES'

/**
 * Defines the actions, the saga, and then the reducer for charities
 *
 * @author Jeff Risberg
 * @since 02/02/2017
 */

export function requestCharities() {
    return {
        type: REQUEST_CHARITIES
    }
}

function receiveCharities(charities) {
    return {
        type: RECEIVE_CHARITIES,
        charities: charities,
        receivedAt: Date.now()
    }
}

function fetchCharitiesApi() {
    return fetch(`/api/charities` )
        .then(response => response.json() )
        .then(json => json.data )
}

export function* watchForFetchCharities() {
    yield put( requestCharities() )
    const charities = yield call(fetchCharitiesApi)
    yield put( receiveCharities(charities) )
}

export default function reducer(state = {
    isFetching: false,
    items: []
}, action = {}) {
    switch (action.type) {
        case REQUEST_CHARITIES:
            return {...state, isFetching: true}

        case RECEIVE_CHARITIES:
            return {
                ...state,
                isFetching: false,
                items: action.charities,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}
