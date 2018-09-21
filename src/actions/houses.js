import {
  HOUSE_HAS_ERRORED,
  HOUSE_IS_LOADING,
  HOUSE_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function houseHasErrored(bool) {
  return {
    type: HOUSE_HAS_ERRORED,
    hasErrored: bool
  }
}

export function houseIsLoading(bool) {
  return {
    type: HOUSE_IS_LOADING,
    isLoading: bool
  }
}

export function houseFetchDataSuccess(house) {
  return {
    type: HOUSE_FETCH_DATA_SUCCESS,
    house
  }
}

export function houseFetchData(url) {
  return (dispatch) => {
    dispatch(houseIsLoading(true))

    console.log("Fetching " + url)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(houseIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((house) => dispatch(houseFetchDataSuccess(house)))
      .catch(() => dispatch(houseHasErrored(true)))
  }
}
