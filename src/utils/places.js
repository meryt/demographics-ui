import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
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

    return <Link to={ `/places/${ placeTypeToPathType(place.type) }/${ place.id }` }>{ formatPlaceName(place) }</Link>
}

export function renderTableOfDwellings(dwellings) {

    if (dwellings == null) {
        return null
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Built</th>
                    <th>Owner</th>
                    <th>Residents</th>
                </tr>
            </thead>
            <tbody>
            {
                dwellings.map(p => _renderPlaceRow(p))
            }
            </tbody>
        </Table>
    )
}

function _renderPlaceRow(place) {
    if (place == null) {
        return null
    }

    return (
        <tr key={`child-place-${place.id}`}>
            <td><Link to={ `/places/${placeTypeToPathType(place.type)}/${place.id}` }>{ place.name == null
                 ? <i>{ place.type === 'DWELLING' ? 'House' : titleCase(place.type) }</i>
                 : place.name }</Link></td>
            <td>{ place.value }</td>
            <td>{ getYear(place.foundedDate) }</td>
            <td>{ renderPlaceOwner(place) }</td>
            <td>{ place.totalPopulation }</td>
        </tr>
    )
}

export function renderPlaceOwner(place) {
    if (place == null) {
        return null
    }

    if (place.ruinedDate != null) {
        return <i>Ruined</i>
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
