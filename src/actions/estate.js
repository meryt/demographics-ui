import {
  ESTATE_HAS_ERRORED,
  ESTATE_IS_LOADING,
  ESTATE_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function estateHasErrored(bool) {
  return {
    type: ESTATE_HAS_ERRORED,
    hasErrored: bool
  }
}

export function estateIsLoading(bool) {
  return {
    type: ESTATE_IS_LOADING,
    isLoading: bool
  }
}

export function estateFetchDataSuccess(estate) {
  return {
    type: ESTATE_FETCH_DATA_SUCCESS,
    estate
  }
}

export function estateFetchData(url) {
  return (dispatch) => {
    dispatch(estateIsLoading(true))

    console.log("Fetching " + url)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(estateIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((estate) => dispatch(estateFetchDataSuccess(estate)))
      .catch(() => dispatch(estateHasErrored(true)))
  }
}
