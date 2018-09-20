import {
    TITLE_HAS_ERRORED,
    TITLE_IS_LOADING,
    TITLE_FETCH_DATA_SUCCESS,
    TITLES_HAS_ERRORED,
    TITLES_IS_LOADING,
    TITLES_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function titlesHasErrored(state = false, action) {
    switch(action.type) {
        case TITLES_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function titlesIsLoading(state = false, action) {
    switch(action.type) {
        case TITLES_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function titles(state = [], action) {
    switch(action.type) {
        case TITLES_FETCH_DATA_SUCCESS:
            return action.titles
        default:
            return state
    }
}

export function titleHasErrored(state = false, action) {
    switch(action.type) {
        case TITLE_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function titleIsLoading(state = false, action) {
    switch(action.type) {
        case TITLE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function title(state = [], action) {
    switch(action.type) {
        case TITLE_FETCH_DATA_SUCCESS:
            return action.title
        default:
            return state
    }
}
