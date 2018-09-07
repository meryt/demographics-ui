import { combineReducers } from 'redux'
import { estate, estateHasErrored, estateIsLoading,
         estates, estatesHasErrored, estatesIsLoading } from './estates'

export default combineReducers({
    estate,
    estateHasErrored,
    estateIsLoading,
    estates,
    estatesHasErrored,
    estatesIsLoading
})
