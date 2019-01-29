import {
  PLACES_HAS_ERRORED,
  PLACES_IS_LOADING,
  PLACES_FETCH_DATA_SUCCESS,
  PLACE_RESIDENTS_HAS_ERRORED,
  PLACE_RESIDENTS_IS_LOADING,
  PLACE_RESIDENTS_FETCH_DATA_SUCCESS,
  PLACE_RESIDENTS_TIMELINE_HAS_ERRORED,
  PLACE_RESIDENTS_TIMELINE_IS_LOADING,
  PLACE_RESIDENTS_TIMELINE_FETCH_DATA_SUCCESS
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

export function placeResidentsHasErrored(bool) {
  return {
    type: PLACE_RESIDENTS_HAS_ERRORED,
    hasErrored: bool
  }
}

export function placeResidentsIsLoading(bool) {
  return {
    type: PLACE_RESIDENTS_IS_LOADING,
    isLoading: bool
  }
}

export function placeResidentsFetchDataSuccess(placeResidents) {
  return {
    type: PLACE_RESIDENTS_FETCH_DATA_SUCCESS,
    placeResidents
  }
}

export function placeResidentsFetchData(url) {
  return (dispatch) => {
    dispatch(placeResidentsIsLoading(true))

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(placeResidentsIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((placeResidents) => dispatch(placeResidentsFetchDataSuccess(placeResidents)))
      .catch(() => dispatch(placeResidentsHasErrored(true)))
  }
}

export function placeResidentsTimelineHasErrored(bool) {
  return {
    type: PLACE_RESIDENTS_TIMELINE_HAS_ERRORED,
    hasErrored: bool
  }
}

export function placeResidentsTimelineIsLoading(bool) {
  return {
    type: PLACE_RESIDENTS_TIMELINE_IS_LOADING,
    isLoading: bool
  }
}

export function placeResidentsTimelineFetchDataSuccess(placeResidentsTimeline) {
  return {
    type: PLACE_RESIDENTS_TIMELINE_FETCH_DATA_SUCCESS,
    placeResidentsTimeline
  }
}

export function placeResidentsTimelineFetchData(url) {
  return (dispatch) => {
    dispatch(placeResidentsTimelineIsLoading(true))

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        dispatch(placeResidentsTimelineIsLoading(false))

        return response
      })
      .then((response) => response.json())
      .then((placeResidentsTimeline) => dispatch(placeResidentsTimelineFetchDataSuccess(placeResidentsTimeline)))
      .catch(() => dispatch(placeResidentsTimelineHasErrored(true)))
  }
}
