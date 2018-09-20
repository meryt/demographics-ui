import {
  PERSON_HAS_ERRORED,
  PERSON_IS_LOADING,
  PERSON_FETCH_DATA_SUCCESS
} from '../constants/action-types.js'

export function personHasErrored(bool) {
  return {
    type: PERSON_HAS_ERRORED,
    hasErrored: bool
  }
}

export function personIsLoading(bool) {
  return {
    type: PERSON_IS_LOADING,
    isLoading: bool
  }
}

export function personFetchDataSuccess(person) {
  return {
    type: PERSON_FETCH_DATA_SUCCESS,
    person
  }
}

export function personFetchData(url) {
  return (dispatch) => {
    dispatch(personIsLoading(true))

    console.log("Fetching " + url)

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(personIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((person) => dispatch(personFetchDataSuccess(person)))
      .catch(() => dispatch(personHasErrored(true)))
  }
}
