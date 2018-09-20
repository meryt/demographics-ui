import {
    TITLES_HAS_ERRORED,
    TITLES_IS_LOADING,
    TITLES_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function titlesHasErrored(bool) {
    return {
        type: TITLES_HAS_ERRORED,
        hasErrored: bool
    }
}

export function titlesIsLoading(bool) {
    return {
        type: TITLES_IS_LOADING,
        isLoading: bool
    }
}

export function titlesFetchDataSuccess(titles) {
    return {
        type: TITLES_FETCH_DATA_SUCCESS,
        titles
    }
}

export function titlesFetchData(url) {
    return (dispatch) => {
        dispatch(titlesIsLoading(true))

        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText)
            }

            dispatch(titlesIsLoading(false))

            return response
        })
        .then((response) => response.json())
        .then((titles) => dispatch(titlesFetchDataSuccess(titles)))
        .catch(() => dispatch(titlesHasErrored(true)))
    }
}
