import {
  PARISH_HAS_ERRORED,
  PARISH_IS_LOADING,
  PARISH_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function parishHasErrored(bool) {
  return {
    type: PARISH_HAS_ERRORED,
    hasErrored: bool
  }
}

export function parishIsLoading(bool) {
  return {
    type: PARISH_IS_LOADING,
    isLoading: bool
  }
}

export function parishFetchDataSuccess(parish) {
  return {
    type: PARISH_FETCH_DATA_SUCCESS,
    parish
  }
}

export function parishFetchData(url) {
  return (dispatch) => {
    dispatch(parishIsLoading(true))

    console.log("Fetching " + url)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(parishIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((parish) => dispatch(parishFetchDataSuccess(parish)))
      .catch(() => dispatch(parishHasErrored(true)))
  }
}
