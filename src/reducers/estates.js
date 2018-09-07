import {
    ESTATES_HAS_ERRORED,
    ESTATES_IS_LOADING,
    ESTATES_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function estatesHasErrored(state = false, action) {
    switch(action.type) {
        case ESTATES_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function estatesIsLoading(state = false, action) {
    switch(action.type) {
        case ESTATES_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function estates(state = [], action) {
    switch(action.type) {
        case ESTATES_FETCH_DATA_SUCCESS:
            return action.estates
        default:
            return state
    }
}
