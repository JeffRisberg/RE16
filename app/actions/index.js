export const REQUEST_CHARITIES = 'REQUEST_CHARITIES'
export const RECEIVE_CHARITIES = 'RECEIVE_CHARITIES'

export const REQUEST_DONATIONS = 'REQUEST_DONATIONS'
export const RECEIVE_DONATIONS = 'RECEIVE_DONATIONS'


export function requestCharities() {
    return {
        type: REQUEST_CHARITIES
    }
}

export function receiveCharities(charities) {
    return {
        type: RECEIVE_CHARITIES,
        charities: charities,
        receivedAt: Date.now()
    }
}

export function requestDonations() {
    return {
        type: REQUEST_DONATIONS
    }
}

export function receiveDonations(donations) {
    return {
        type: RECEIVE_DONATIONS,
        donations: donations,
        receivedAt: Date.now()
    }
}
