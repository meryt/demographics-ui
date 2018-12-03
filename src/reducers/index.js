import { combineReducers } from 'redux'
import { estate, estateHasErrored, estateIsLoading } from './estates'
import { house, houseHasErrored, houseIsLoading } from './houses'
import { parish, parishHasErrored, parishIsLoading } from './parishes'
import { characters, charactersHasErrored, charactersIsLoading,
         descendants, descendantsHasErrored, descendantsIsLoading,
         relatives, relativesHasErrored, relativesIsLoading,
         person, personHasErrored, personIsLoading } from './persons'
import { places, placesHasErrored, placesIsLoading } from './places'
import { title, titleHasErrored, titleIsLoading,
         titles, titlesHasErrored, titlesIsLoading } from './titles'
import { town, townHasErrored, townIsLoading } from './towns'

export default combineReducers({
    characters,
    charactersHasErrored,
    charactersIsLoading,
    descendants,
    descendantsHasErrored,
    descendantsIsLoading,
    estate,
    estateHasErrored,
    estateIsLoading,
    house,
    houseHasErrored,
    houseIsLoading,
    parish,
    parishHasErrored,
    parishIsLoading,
    person,
    personHasErrored,
    personIsLoading,
    places,
    placesHasErrored,
    placesIsLoading,
    relatives,
    relativesHasErrored,
    relativesIsLoading,
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
