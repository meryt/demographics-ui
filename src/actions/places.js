import {
  PLACES_HAS_ERRORED,
  PLACES_IS_LOADING,
  PLACES_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function placesHasErrored(bool) {
  return {
    type: PLACES_HAS_ERRORED,
    hasErrored: bool
  }
}

export function placesIsLoading(bool) {
  return {
    type: PLACES_IS_LOADING,
    isLoading: bool
  }
}

export function placesFetchDataSuccess(places) {
  return {
    type: PLACES_FETCH_DATA_SUCCESS,
    places
  }
}

export function placesFetchData(url) {
  return (dispatch) => {
    dispatch(placesIsLoading(true))

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(placesIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((places) => dispatch(placesFetchDataSuccess(places)))
      .catch(() => dispatch(placesHasErrored(true)))
  }
}
