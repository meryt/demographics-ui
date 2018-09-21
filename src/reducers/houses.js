import {
    HOUSE_HAS_ERRORED,
    HOUSE_IS_LOADING,
    HOUSE_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function houseHasErrored(state = false, action) {
    switch(action.type) {
        case HOUSE_HAS_ERRORED:
            return action.hasErrored
        default:
            return state
    }
}

export function houseIsLoading(state = false, action) {
    switch(action.type) {
        case HOUSE_IS_LOADING:
            return action.isLoading
        default:
            return state
    }
}

export function house(state = {}, action) {
    switch(action.type) {
        case HOUSE_FETCH_DATA_SUCCESS:
            return action.house
        default:
            return state
    }
}
