import {
    CURRENT_DATE_HAS_ERRORED,
    CURRENT_DATE_IS_LOADING,
    CURRENT_DATE_FETCH_DATA_SUCCESS,
    TIMELINE_HAS_ERRORED,
    TIMELINE_IS_LOADING,
    TIMELINE_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function timelineHasErrored(bool) {
    return {
        type: TIMELINE_HAS_ERRORED,
        hasErrored: bool
    }
}

export function timelineIsLoading(bool) {
    return {
        type: TIMELINE_IS_LOADING,
        isLoading: bool
    }
}

export function timelineFetchDataSuccess(entries) {
    return {
        type: TIMELINE_FETCH_DATA_SUCCESS,
        entries
    }
}

export function timelineFetchData(url) {
    return (dispatch) => {
        dispatch(timelineIsLoading(true))

        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText)
            }

            dispatch(timelineIsLoading(false))

            return response
        })
        .then((response) => response.json())
        .then((entries) => dispatch(timelineFetchDataSuccess(entries)))
        .catch(() => dispatch(timelineHasErrored(true)))
    }
}

export function currentDateHasErrored(bool) {
    return {
        type: CURRENT_DATE_HAS_ERRORED,
        hasErrored: bool
    }
}

export function currentDateIsLoading(bool) {
    return {
        type: CURRENT_DATE_IS_LOADING,
        isLoading: bool
    }
}

export function currentDateFetchDataSuccess(date) {
    return {
        type: CURRENT_DATE_FETCH_DATA_SUCCESS,
        date
    }
}

export function currentDateFetchData(url) {
    return (dispatch) => {
        dispatch(currentDateIsLoading(true))

        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText)
            }

            dispatch(currentDateIsLoading(false))

            return response
        })
        .then((response) => response.json())
        .then((date) => dispatch(currentDateFetchDataSuccess(date)))
        .catch(() => dispatch(currentDateHasErrored(true)))
    }
}
