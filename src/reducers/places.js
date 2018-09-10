import {
    PLACES_HAS_ERRORED,
    PLACES_IS_LOADING,
    PLACES_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function placesHasErrored(state = false, action) {
    switch(action.type) {
        case PLACES_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function placesIsLoading(state = false, action) {
    switch(action.type) {
        case PLACES_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function places(state = [], action) {
    switch(action.type) {
        case PLACES_FETCH_DATA_SUCCESS:
            return action.places
        default:
            return state
    }
}
