import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    Table
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { parishFetchData } from '../actions/parish'
import PlaceOccupations from './PlaceOccupations'
import PlaceResidents from './PlaceResidents'
import { friendlyAge } from '../utils/dates'
import { renderDefaultTitle } from '../utils/pages'
import { friendlyClass, renderPersonLink } from '../utils/persons'
import { renderPlaceLink, renderTableOfDwellings } from '../utils/places'
import { formatNumber } from '../utils/strings'

class Parish extends Component {

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
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.parishId}?onDate=current`)
    }

    renderChildPlaces(placeType) {
        if (this.props.isLoading || this.props.parish.places == null) {
            return null
        }

        let type = placeType.toLowerCase()

        if (placeType === 'DWELLING') {
            return renderTableOfDwellings(this.props.parish.places.filter(p => p.type === placeType))
        }

        if (placeType === 'FARM') {
            return renderTableOfDwellings(this.props.parish.places.filter(p => p.type === placeType))
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
            { this.props.parish.places.filter(p => p.type === placeType).map((p) => (
                <tr key={`${type}-${p.id}`}>
                    <td>{ renderPlaceLink(p) }</td>
                    <td>{ p.totalPopulation }</td>
                </tr>
            ))}
                </tbody>
            </Table>
        )
    }

    renderEstates() {
        if (this.props.isLoading || this.props.parish.places == null) {
            return null
        }

        let placeType = 'ESTATE'
        let type = placeType.toLowerCase()

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Acres</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
            { this.props.parish.places.filter(p => p.type === placeType).map((p) => (
                <tr key={`${type}-${p.id}`}>
                    <td>{ renderPlaceLink(p) }</td>
                    <td>{ formatNumber(p.value) }</td>
                    <td>{ formatNumber(Math.round(p.acres)) }</td>
                    <td>{ p.totalPopulation }</td>
                </tr>
            ))}
                </tbody>
            </Table>
        )
    }

    renderLeadingHouseholds() {
        if (this.props.isLoading || this.props.parish.leadingHouseholds == null) {
            return null;
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Class</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.parish.leadingHouseholds.map(hh => (
                            <tr key={`leading-household-${hh.id}`}>
                                <td>{ renderPersonLink(hh.head) }</td>
                                <td>{ friendlyAge(hh.head.age) }</td>
                                <td>{ friendlyClass(hh.head.socialClass) }</td>
                                <td>{ hh.location.name != null ? (renderPlaceLink(hh.location)) : hh.location.location }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        )

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
                { renderDefaultTitle(`${this.props.parish.name}, ${this.props.parish.location}`) }
                <div className="inner-content">
                    <h2>{this.props.parish.name}, {this.props.parish.location}</h2>
                    <p>Square miles: {this.props.parish.squareMiles}</p>
                    <p>Acres: { formatNumber(this.props.parish.acres) }</p>
                    <p>Population: { this.props.parish.totalPopulation }</p>
                    <p>Density: { this.props.parish.populationPerSquareMile } people per square mile</p>

                    <h3>Leading Households</h3>
                    { this.renderLeadingHouseholds() }

                    <h3>Towns</h3>
                    { this.renderChildPlaces('TOWN') }

                    <h3>Estates</h3>
                    { this.renderEstates() }

                    <h3>Farms</h3>
                    { this.renderChildPlaces('FARM') }

                    <h3>Houses</h3>
                    { this.renderChildPlaces('DWELLING') }
                </div>

                <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to={`/places/parishes/${this.props.parish.id}/occupations`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Occupations</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/places/parishes/${this.props.parish.id}/residents`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Residents</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Switch>
                    <Route path="/places/parishes/:id/occupations" render={ (props) => <PlaceOccupations {...props} id={this.props.parish.id} place={this.props.parish} /> } />
                    <Route path="/places/parishes/:id/residents" render={ (props) => <PlaceResidents {...props} id={this.props.parish.id} place={this.props.parish} /> } />
                </Switch>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        parish: state.parish,
        hasErrored: state.parishHasErrored,
        isLoading: state.parishIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(parishFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Parish)
