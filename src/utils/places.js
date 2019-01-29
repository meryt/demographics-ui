import React from 'react'
import { Link } from 'react-router-dom'
import { getYear } from './dates'
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

    return <Link to={ `/places/${placeTypeToPathType(place.type)}/${place.id}` }>{ place.name == null
         ? <i>{ place.type === 'DWELLING' ? `House ${place.id}` : titleCase(place.type) }</i>
         : place.name }</Link>
}

export function renderPlaceOwner(place) {
    if (place == null) {
        return null
    }

    if (place.ruinedDate != null) {
        return <i>Abandoned since { getYear(place.ruinedDate) }</i>
    }

    let owner = place.owner != null ? place.owner : (place.currentOwner != null ? place.currentOwner : null);

    if (owner == null) {
        return 'no owner'
    }

    return (
        <span>
            <Link to={ `/persons/${owner.id}` }>{owner.firstName}{owner.lastName != null && ` ${owner.lastName}`}</Link>{owner.occupation != null && `, ${owner.occupation.name}`}
        </span>
    )
}

export function renderOwnerReason(reason) {
    if (reason == null) {
        return null
    }

    // Persons include an ID, a name, a comma, and a relationship, like "5 Boby Zozo, first cousin"
    let match = reason.match(/([^\d]*)(\d+) ([^,]+)(,.*)/)
    if (match != null && match.length > 1) {
        let personId = match[2]
        let personName = match[3]
        return <span>{ match[1] }<Link to={`/persons/${personId}`}>{personName}</Link>{ match[4] }</span>
    } else {
        // Titles are just an ID followed by the name and nothing else
        let titleMatch = reason.match(/([^\d]*)(\d+) (.*)/)
        if (titleMatch != null && titleMatch.length > 1) {
            let titleId = titleMatch[2]
            let titleName = titleMatch[3]
            return <span>{ titleMatch[1] }<Link to={`/titles/${titleId}`}>{titleName}</Link></span>
        }

        return <span>{ reason }</span>
    }
}
