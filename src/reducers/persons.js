import {
    PERSON_HAS_ERRORED,
    PERSON_IS_LOADING,
    PERSON_FETCH_DATA_SUCCESS,
    DESCENDANTS_HAS_ERRORED,
    DESCENDANTS_IS_LOADING,
    DESCENDANTS_FETCH_DATA_SUCCESS,
    RELATIVES_HAS_ERRORED,
    RELATIVES_IS_LOADING,
    RELATIVES_FETCH_DATA_SUCCESS
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

export function descendantsHasErrored(state = false, action) {
    switch(action.type) {
        case DESCENDANTS_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function descendantsIsLoading(state = false, action) {
    switch(action.type) {
        case DESCENDANTS_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function descendants(state = [], action) {
    switch(action.type) {
        case DESCENDANTS_FETCH_DATA_SUCCESS:
            return action.descendants
        default:
            return state
    }
}

export function relativesHasErrored(state = false, action) {
    switch(action.type) {
        case RELATIVES_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function relativesIsLoading(state = false, action) {
    switch(action.type) {
        case RELATIVES_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function relatives(state = [], action) {
    switch(action.type) {
        case RELATIVES_FETCH_DATA_SUCCESS:
            return action.relatives
        default:
            return state
    }
}
