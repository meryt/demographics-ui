import React from 'react'

import HouseholdListPersonRow from './HouseholdListPersonRow'

import { renderPlaceLink } from '../utils/places'

function HouseholdListRow(props) {

    if (props.household == null) {
        return null
    }

    const household = props.household
    return (
        <tbody key={`household-${household.id}`}>
            <tr>
                <td colSpan="4">Household { household.id }{ _renderHouseholdLocation(household) }</td>
            </tr>

            { household.head != null && <HouseholdListPersonRow person={ household.head } key={ `person-row-${household.head.id}` } /> }

            { household.inhabitants != null && household.inhabitants.map(person => <HouseholdListPersonRow person={ person } key={ `person-row-${person.id}` } />) }

        </tbody>
    )
}

function _renderHouseholdLocation(household) {
    if (household == null || household.location == null) {
        return null
    }

    return <span>, { renderPlaceLink(household.location) }</span>
}

export default HouseholdListRow
