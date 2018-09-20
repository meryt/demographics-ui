import {
    PARISH_HAS_ERRORED,
    PARISH_IS_LOADING,
    PARISH_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function parishHasErrored(state = false, action) {
    switch(action.type) {
        case PARISH_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function parishIsLoading(state = false, action) {
    switch(action.type) {
        case PARISH_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function parish(state = {}, action) {
    switch(action.type) {
        case PARISH_FETCH_DATA_SUCCESS:
            return action.parish
        default:
            return state
    }
}
