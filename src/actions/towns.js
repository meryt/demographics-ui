import {
  TOWN_HAS_ERRORED,
  TOWN_IS_LOADING,
  TOWN_FETCH_DATA_SUCCESS,
  TOWN_SELECT_DWELLING
} from '../constants/action-types.js'

export function townHasErrored(bool) {
  return {
    type: TOWN_HAS_ERRORED,
    hasErrored: bool
  }
}

export function townIsLoading(bool) {
  return {
    type: TOWN_IS_LOADING,
    isLoading: bool
  }
}

export function townFetchDataSuccess(town) {
  return {
    type: TOWN_FETCH_DATA_SUCCESS,
    town
  }
}

export function townFetchData(url) {
  return (dispatch) => {
    dispatch(townIsLoading(true))

    console.log("Fetching " + url)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(townIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((town) => dispatch(townFetchDataSuccess(town)))
      .catch(() => dispatch(townHasErrored(true)))
  }
}

export function townSelectDwelling(dwellingId) {
    return {
        type: TOWN_SELECT_DWELLING,
        selectedDwelling: dwellingId
    }
}
