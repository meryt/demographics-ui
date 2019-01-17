import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Table
} from 'reactstrap'

import { houseFetchData } from '../actions/houses'

import { friendlyAge, friendlyDate } from '../utils/dates'
import { placeTypeToPathType, renderOwnerReason } from '../utils/places'
import { friendlyClass } from '../utils/persons'
import { formatNumber } from '../utils/strings'

/**
 * This component takes a "dwelling" in its properties so that it can show some data right away, and then uses
 * the dwelling.id to load the "house" and display other data like current residents.
 */
class HouseInfo extends Component {

    componentDidMount() {
        this.maybeLoadHouse()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dwelling.id !== this.props.dwelling.id) {
            this.maybeLoadHouse()
        }
    }

    maybeLoadHouse() {
        if (this.props.dwelling.ruinedDate == null) {
            this.props.fetchData(`http://localhost:8095/api/places/${this.props.dwelling.id}?onDate=current`)
        }
    }

    renderHouseholdRows(household) {
        if (household == null) {
            return null
        }

        return (
            <tbody key={`household-${household.id}`}>
                <tr>
                    <td colSpan="4">Household { household.id }</td>
                </tr>

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
                <td><Link to={ `/persons/${person.id}` }>{person.firstName} {person.lastName}</Link></td>
                <td>{ friendlyAge(person.age) } </td>
                <td>{ friendlyClass(person.socialClass) }</td>
                <td>{ person.occupation != null && person.occupation.name }</td>
                <td>{ person.relationshipToHead != null && person.relationshipToHead.name }</td>
            </tr>
        )
    }

    renderHouseName(house) {
        if (house == null) {
            return null
        }

        if (house.name == null) {
            return 'House ' + house.id
        } else {
            return house.name
        }
    }

    renderPlaceOwner(place) {
        if (place == null) {
            return null
        }

        if (place.owner == null) {
            return <p><i>Unowned</i></p>
        }

        let owner = place.owner
        return (
            <p>
                Owned by <Link to={ `/persons/${owner.id}` }>{owner.firstName}{owner.lastName != null && ` ${owner.lastName}`}</Link>
                {owner.occupation != null && `, ${owner.occupation.name}`}
                {place.entailed && ' (entailed)'}
                { owner.acquired != null && <span> – { renderOwnerReason(owner.acquired) }</span> }
            </p>
        )
    }

    renderParentLocationLink(house) {
        if (house == null || house.parent == null) {
            return null
        }

        let parent = house.parent

        return <Link to={ `/places/${ placeTypeToPathType(parent.type) }/${ parent.id }` }>{parent.name}</Link>
    }

    render() {
        return (
            <div>
                <p>Built { friendlyDate(this.props.dwelling.foundedDate )}</p>

                { this.props.dwelling.ruinedDate != null && <p>Ruined { friendlyDate(this.props.dwelling.ruinedDate)}</p> }

                { this.props.dwelling.value != null &&
                    <p>Value: { formatNumber(this.props.dwelling.value) }</p>
                }

                { this.renderPlaceOwner(this.props.dwelling) }

                { this.props.isLoading && <p>Loading { this.props.dwelling.directPopulation } inhabitants...</p> }

                { !(this.props.isLoading) && (this.props.dwelling.id === this.props.house.id) && (
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Class</th>
                            <th>Occupation</th>
                            <th>Relationship to head</th>
                        </tr>
                    </thead>
                    {
                        this.props.house.households != null && this.props.house.households.map(hh => this.renderHouseholdRows(hh))
                    }
                </Table>
            )}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        house: state.house,
        hasErrored: state.houseHasErrored,
        isLoading: state.houseIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(houseFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseInfo)
