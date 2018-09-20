import {
    PERSON_HAS_ERRORED,
    PERSON_IS_LOADING,
    PERSON_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function personHasErrored(state = false, action) {
    switch(action.type) {
        case PERSON_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function personIsLoading(state = false, action) {
    switch(action.type) {
        case PERSON_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function person(state = {}, action) {
    switch(action.type) {
        case PERSON_FETCH_DATA_SUCCESS:
            return action.person
        default:
            return state
    }
}
