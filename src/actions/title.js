import {
  TITLE_HAS_ERRORED,
  TITLE_IS_LOADING,
  TITLE_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function titleHasErrored(bool) {
  return {
    type: TITLE_HAS_ERRORED,
    hasErrored: bool
  }
}

export function titleIsLoading(bool) {
  return {
    type: TITLE_IS_LOADING,
    isLoading: bool
  }
}

export function titleFetchDataSuccess(title) {
  return {
    type: TITLE_FETCH_DATA_SUCCESS,
    title
  }
}

export function titleFetchData(url) {
  return (dispatch) => {
    dispatch(titleIsLoading(true))

    console.log("Fetching " + url)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(titleIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((title) => dispatch(titleFetchDataSuccess(title)))
      .catch(() => dispatch(titleHasErrored(true)))
  }
}
