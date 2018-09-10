import { combineReducers } from 'redux'
import { estate, estateHasErrored, estateIsLoading } from './estates'
import { places, placesHasErrored, placesIsLoading } from './places'

export default combineReducers({
    estate,
    estateHasErrored,
    estateIsLoading,
    places,
    placesHasErrored,
    placesIsLoading
})
