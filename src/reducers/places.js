import {
    PLACES_HAS_ERRORED,
    PLACES_IS_LOADING,
    PLACES_FETCH_DATA_SUCCESS,
    PLACE_RESIDENTS_HAS_ERRORED,
    PLACE_RESIDENTS_IS_LOADING,
    PLACE_RESIDENTS_FETCH_DATA_SUCCESS,
    PLACE_RESIDENTS_TIMELINE_HAS_ERRORED,
    PLACE_RESIDENTS_TIMELINE_IS_LOADING,
    PLACE_RESIDENTS_TIMELINE_FETCH_DATA_SUCCESS
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

export function placeResidentsHasErrored(state = false, action) {
    switch(action.type) {
        case PLACE_RESIDENTS_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function placeResidentsIsLoading(state = false, action) {
    switch(action.type) {
        case PLACE_RESIDENTS_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function placeResidents(state = [], action) {
    switch(action.type) {
        case PLACE_RESIDENTS_FETCH_DATA_SUCCESS:
            return action.placeResidents
        default:
            return state
    }
}

export function placeResidentsTimelineHasErrored(state = false, action) {
    switch(action.type) {
        case PLACE_RESIDENTS_TIMELINE_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function placeResidentsTimelineIsLoading(state = false, action) {
    switch(action.type) {
        case PLACE_RESIDENTS_TIMELINE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function placeResidentsTimeline(state = [], action) {
    switch(action.type) {
        case PLACE_RESIDENTS_TIMELINE_FETCH_DATA_SUCCESS:
            return action.placeResidentsTimeline
        default:
            return state
    }
}
