import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    Table
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { houseFetchData } from '../actions/houses'
import PlaceOwners from './PlaceOwners'
import { friendlyAge, friendlyDate } from '../utils/dates'
import { renderDefaultTitle } from '../utils/pages'
import { placeTypeToPathType } from '../utils/places'
import { friendlyClass } from '../utils/persons'
import { formatNumber } from '../utils/strings'

class House extends Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.houseId}?onDate=current`)
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

        if (place.currentOwner == null) {
            return <p><i>Unowned</i></p>
        }

        let owner = place.currentOwner
        return (
            <p>
                Owned by <Link to={ `/persons/${owner.id}` }>{owner.firstName}{owner.lastName != null && ` ${owner.lastName}`}</Link>
                {owner.occupation != null && `, ${owner.occupation.name}`}
                {place.entailed && ' (entailed)'}
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
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading) {
            return <p>Loading...</p>
        }

        return (
            <div>
                { renderDefaultTitle(this.renderHouseName(this.props.house)) }
                <div className="inner-content">
                    <h2>{ this.renderHouseName(this.props.house) }</h2>

                    <p>House, located in { this.renderParentLocationLink(this.props.house) }</p>

                    <p>Built { friendlyDate(this.props.house.foundedDate )}</p>

                    { this.props.house.ruinedDate != null && <p>Ruined { friendlyDate(this.props.house.ruinedDate)}</p> }

                    { this.props.house.value != null &&
                        <p>Value: { formatNumber(this.props.house.value) }</p>
                    }

                    { this.renderPlaceOwner(this.props.house) }

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
                </div>

            <Navbar color="light" light expand="md">
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <LinkContainer to={`/places/houses/${this.props.house.id}/owners`}>
                            <NavItem className="btn btn-light btn-sm" role="button">Owners</NavItem>
                        </LinkContainer>
                    </Nav>
                </Collapse>
            </Navbar>

            <Switch>
                <Route path="/places/houses/:id/owners" render={ (props) => <PlaceOwners {...props} id={this.props.house.id} place={this.props.house} /> } />
            </Switch>

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

export default connect(mapStateToProps, mapDispatchToProps)(House)
