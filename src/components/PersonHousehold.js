import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { friendlyAge } from '../utils/dates'
import { renderPersonTitles } from '../utils/persons'
import { formatPlaceName, placeTypeToPathType } from '../utils/places'

class PersonHousehold extends Component {

    renderHouseholdRows(household) {
        if (household == null) {
            return null
        }

        return (
            <tbody key={`household-${household.id}`}>

                { household.head != null && this.renderInhabitantRow(household.head) }

                { household.inhabitants != null && household.inhabitants.map(person => this.renderInhabitantRow(person)) }

            </tbody>
        )
    }

    renderInhabitantRow(person) {
        if (person == null) {
            return null
        }

        return (
            <tr key={ `household-inhabitant-${person.id}` }>
                <td><Link to={ `/persons/${person.id}` }>{person.firstName} {person.lastName}</Link>{
                    person.titles != null && ', '}{ renderPersonTitles(person) }</td>
                <td>{ friendlyAge(person.age) } </td>
                <td>{ person.occupation != null && person.occupation.name }</td>
                <td>{ person.relationshipToHead != null && person.relationshipToHead.name }</td>
            </tr>
        )
    }

    renderPlaceLocationLink(place) {
        if (place == null) {
            return null
        }

        return <Link to={ `/places/${ placeTypeToPathType(place.type) }/${ place.id }` }>{ formatPlaceName(place) }</Link>
    }

    render() {
        if (this.props.person == null || this.props.person.household == null) {
            return null
        }

        return (
            <div className="inner-content personHousehold">
                <h3>Household {this.props.person.household.id}</h3>

                <p>Located in { this.renderPlaceLocationLink(this.props.person.household.location) }</p>

                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Occupation</th>
                            <th>Relationship to head</th>
                        </tr>
                    </thead>

                    { this.renderHouseholdRows(this.props.person.household) }
                </Table>
            </div>
        )
    }

}

export default PersonHousehold;
