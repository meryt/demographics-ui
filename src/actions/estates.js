import {
  ESTATES_HAS_ERRORED,
  ESTATES_IS_LOADING,
  ESTATES_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function estatesHasErrored(bool) {
  return {
    type: ESTATES_HAS_ERRORED,
    hasErrored: bool
  }
}

export function estatesIsLoading(bool) {
  return {
    type: ESTATES_IS_LOADING,
    isLoading: bool
  }
}

export function estatesFetchDataSuccess(estates) {
  return {
    type: ESTATES_FETCH_DATA_SUCCESS,
    estates
  }
}

export function estatesFetchData(url) {
  return (dispatch) => {
    dispatch(estatesIsLoading(true))

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(estatesIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((estates) => dispatch(estatesFetchDataSuccess(estates)))
      .catch(() => dispatch(estatesHasErrored(true)))
  }
}
