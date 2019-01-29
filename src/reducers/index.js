import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { estate, estateHasErrored, estateIsLoading } from './estates'
import { house, houseHasErrored, houseIsLoading } from './houses'
import { parish, parishHasErrored, parishIsLoading } from './parishes'
import { characters, charactersHasErrored, charactersIsLoading,
         descendants, descendantsHasErrored, descendantsIsLoading,
         relatives, relativesHasErrored, relativesIsLoading,
         person, personHasErrored, personIsLoading } from './persons'
import { places, placesHasErrored, placesIsLoading,
         placeResidents, placeResidentsHasErrored, placeResidentsIsLoading,
         placeResidentsTimeline, placeResidentsTimelineHasErrored, placeResidentsTimelineIsLoading } from './places'
import { currentDate, currentDateHasErrored, currentDateIsLoading,
         timeline, timelineHasErrored, timelineIsLoading } from './timeline'
import { title, titleHasErrored, titleIsLoading,
         titles, titlesHasErrored, titlesIsLoading } from './titles'
import { town, townHasErrored, townIsLoading, townSelectedDwelling } from './towns'

export default (history) => combineReducers({

    router: connectRouter(history),

    characters,
    charactersHasErrored,
    charactersIsLoading,
    currentDate,
    currentDateIsLoading,
    currentDateHasErrored,
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
    placeResidents,
    placeResidentsHasErrored,
    placeResidentsIsLoading,
    placeResidentsTimeline,
    placeResidentsTimelineHasErrored,
    placeResidentsTimelineIsLoading,
    relatives,
    relativesHasErrored,
    relativesIsLoading,
    timeline,
    timelineHasErrored,
    timelineIsLoading,
    title,
    titleHasErrored,
    titleIsLoading,
    titles,
    titlesHasErrored,
    titlesIsLoading,
    town,
    townHasErrored,
    townIsLoading,
    townSelectedDwelling
})
