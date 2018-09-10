import {
    ESTATE_HAS_ERRORED,
    ESTATE_IS_LOADING,
    ESTATE_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function estateHasErrored(state = false, action) {
    switch(action.type) {
        case ESTATE_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function estateIsLoading(state = false, action) {
    switch(action.type) {
        case ESTATE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function estate(state = {}, action) {
    switch(action.type) {
        case ESTATE_FETCH_DATA_SUCCESS:
            return action.estate
        default:
            return state
    }
}
