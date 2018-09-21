import React from 'react'
import { Link } from 'react-router-dom'
import { titleCase } from './strings'

export function placeTypeToPathType(placeType) {
    if (placeType == null) {
        return null
    }

    if (placeType === 'DWELLING') {
        return 'houses'
    } else if (placeType === 'PARISH') {
        return 'parishes'
    } else {
        return placeType.toLowerCase() + 's';
    }
}

export function formatPlaceName(place) {
    if (place == null) {
        return null;
    }

    if (place.name != null) {
        return place.name
    }

    return titleCase(place.type) + ' ' + place.id
}

export function renderPlaceLink(place) {
    if (place == null || place.type == null) {
        return null
    }

    return <Link to={ `/places/${ placeTypeToPathType(place.type) }/${ place.id }` }>{ formatPlaceName(place) }</Link>
}
