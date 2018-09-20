import {
    TOWN_HAS_ERRORED,
    TOWN_IS_LOADING,
    TOWN_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function townHasErrored(state = false, action) {
    switch(action.type) {
        case TOWN_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function townIsLoading(state = false, action) {
    switch(action.type) {
        case TOWN_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function town(state = {}, action) {
    switch(action.type) {
        case TOWN_FETCH_DATA_SUCCESS:
            return action.town
        default:
            return state
    }
}
