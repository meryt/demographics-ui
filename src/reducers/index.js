import { combineReducers } from 'redux'
import { estates, estatesHasErrored, estatesIsLoading } from './estates'

export default combineReducers({
    estates,
    estatesHasErrored,
    estatesIsLoading
})
