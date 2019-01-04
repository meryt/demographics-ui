import {
    CURRENT_DATE_HAS_ERRORED,
    CURRENT_DATE_IS_LOADING,
    CURRENT_DATE_FETCH_DATA_SUCCESS,
    TIMELINE_HAS_ERRORED,
    TIMELINE_IS_LOADING,
    TIMELINE_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function timelineHasErrored(state = false, action) {
    switch(action.type) {
        case TIMELINE_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function timelineIsLoading(state = false, action) {
    switch(action.type) {
        case TIMELINE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function timeline(state = [], action) {
    switch(action.type) {
        case TIMELINE_FETCH_DATA_SUCCESS:
            return action.entries
        default:
            return state
    }
}

export function currentDateHasErrored(state = false, action) {
    switch(action.type) {
        case CURRENT_DATE_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function currentDateIsLoading(state = false, action) {
    switch(action.type) {
        case CURRENT_DATE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function currentDate(state = [], action) {
    switch(action.type) {
        case CURRENT_DATE_FETCH_DATA_SUCCESS:
            return action.date
        default:
            return state
    }
}
