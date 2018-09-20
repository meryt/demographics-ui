import { combineReducers } from 'redux'
import { estate, estateHasErrored, estateIsLoading } from './estates'
import { parish, parishHasErrored, parishIsLoading } from './parishes'
import { person, personHasErrored, personIsLoading } from './persons'
import { places, placesHasErrored, placesIsLoading } from './places'
import { title, titleHasErrored, titleIsLoading,
         titles, titlesHasErrored, titlesIsLoading } from './titles'
import { town, townHasErrored, townIsLoading } from './towns'

export default combineReducers({
    estate,
    estateHasErrored,
    estateIsLoading,
    parish,
    parishHasErrored,
    parishIsLoading,
    person,
    personHasErrored,
    personIsLoading,
    places,
    placesHasErrored,
    placesIsLoading,
    title,
    titleHasErrored,
    titleIsLoading,
    titles,
    titlesHasErrored,
    titlesIsLoading,
    town,
    townHasErrored,
    townIsLoading
})
