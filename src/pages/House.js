import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { houseFetchData } from '../actions/houses'

import HouseholdListTable from '../components/HouseholdListTable'
import PersonLink from '../components/PersonLink'
import PlaceOwners from '../components/PlaceOwners'
import PlaceResidentsTimeline from '../components/PlaceResidentsTimeline'

import { friendlyDate } from '../utils/dates'
import { renderDefaultTitle } from '../utils/pages'
import { placeTypeToPathType } from '../utils/places'
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
                Owned by <PersonLink person={owner} />
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

                    <HouseholdListTable households={this.props.house.households} />
                </div>

                <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to={`/places/houses/${this.props.house.id}/owners`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Owners</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/places/houses/${this.props.house.id}/residents`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Residents</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Switch>
                    <Route path="/places/houses/:id/owners" render={ (props) => <PlaceOwners {...props} id={this.props.house.id} place={this.props.house} /> } />
                    <Route path="/places/houses/:id/residents" render={ (props) => <PlaceResidentsTimeline {...props} id={this.props.house.id} place={this.props.house} /> } />
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
