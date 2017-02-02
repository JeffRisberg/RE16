import { combineReducers } from 'redux'
import {
    REQUEST_CHARITIES,
    RECEIVE_CHARITIES,
    REQUEST_DONATIONS,
    RECEIVE_DONATIONS
} from '../actions'

function charities(state = {
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

function donations(state = {
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

const rootReducer = combineReducers({
    charities,
    donations
})

export default rootReducer
