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

import { townFetchData } from '../actions/towns'
import PlaceChildPlaces from './PlaceChildPlaces'
import PlaceOccupations from './PlaceOccupations'
import PlaceResidents from './PlaceResidents'
import Map from '../maps/Map'

import { renderDefaultTitle } from '../utils/pages'
import { placeTypeToPathType } from '../utils/places'

class Town extends Component {

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
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.townId}?onDate=current`)
    }

    renderParentLocationLink(place) {
        if (place == null || place.parent == null) {
            return null
        }

        let parent = place.parent

        return <Link to={ `/places/${ placeTypeToPathType(parent.type) }/${ parent.id }` }>{place.location}</Link>
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
                { renderDefaultTitle(`${this.props.town.name}, ${this.props.town.location}`) }
                <div className="inner-content">
                    <h2>{this.props.town.name}, { this.renderParentLocationLink(this.props.town) }</h2>

                    <p>Population { this.props.town.totalPopulation }</p>

                    <Map town={ this.props.town } />


                </div>

                <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to={`/places/towns/${this.props.town.id}/houses`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Houses</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/places/towns/${this.props.town.id}/occupations`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Occupations</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/places/towns/${this.props.town.id}/residents?onDate=current`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Residents</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Switch>
                    <Route path="/places/towns/:id/houses" render={ (props) => <PlaceChildPlaces {...props} id={this.props.town.id} childPlaceType="DWELLING" place={this.props.town} updateStateOnClick="true" /> } />
                    <Route path="/places/towns/:id/occupations" render={ (props) => <PlaceOccupations {...props} id={this.props.town.id} place={this.props.town} updateStateOnClick="true" /> } />
                    <Route path="/places/towns/:id/residents" render={ (props) => <PlaceResidents {...props} id={this.props.town.id} place={this.props.town} /> } />
                </Switch>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        town: state.town,
        hasErrored: state.townHasErrored,
        isLoading: state.townIsLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(townFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Town)
