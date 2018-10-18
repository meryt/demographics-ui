import React, { Component } from 'react'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    Table
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { estateFetchData } from '../actions/estate'
import PlaceOwners from './PlaceOwners'
import PlaceResidents from './PlaceResidents'
import { placeTypeToPathType } from '../utils/places'
import { formatNumber, titleCase } from '../utils/strings'

class Farm extends Component {

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
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.farmId}?onDate=current`)
    }

    renderPlaceRow(place) {
        if (place == null) {
            return null
        }

        return (
            <tr key={`child-place-${place.id}`}>
                <td><Link to={ `/places/${placeTypeToPathType(place.type)}/${place.id}` }>{ place.name == null ? <i>{ place.type === 'DWELLING' ? 'House' : titleCase(place.type) }</i> : place.name }</Link></td>
                <td>{ formatNumber(place.value) }</td>
                <td>{ this.renderPlaceOwner(place) }</td>
                <td>{ place.totalPopulation }</td>
            </tr>
        )
    }

    renderPlaceOwner(place) {
        if (place == null) {
            return null
        }

        if (place.owner == null) {
            return 'no owner'
        }

        let owner = place.owner
        return (
            <div>
                <Link to={ `/persons/${owner.id}` }>{owner.firstName}{owner.lastName != null && ` ${owner.lastName}`}</Link>{owner.occupation != null && `, ${owner.occupation.name}`}
            </div>
        )
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || this.props.estate.id == null) {
            return <p>...</p>
        }

        if (this.props.estate != null && this.props.location.pathname === `/places/estates/${this.props.estate.id}`) {
            if (this.props.estate.owners != null && this.props.estate.owners.length > 0) {
                return <Redirect to={`/places/estates/${this.props.estate.id}/owners`} />
            }
        }

        return (
            <div>
                <div className="inner-content">
                    <h2>{this.props.estate.name}, {this.props.estate.location}</h2>
                    <p>Farm value: { formatNumber(this.props.estate.value) }</p>
                    { this.props.estate.acres != null &&
                        <p>Estate size: { formatNumber(Math.round(this.props.estate.acres)) } acres</p>
                    }

                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Owner</th>
                                <th>Residents</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.estate.places != null && this.props.estate.places.map(p => this.renderPlaceRow(p))
                        }
                        </tbody>
                    </Table>
                </div>


                <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to={`/places/estates/${this.props.estate.id}/owners`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Owners</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/places/estates/${this.props.estate.id}/residents?onDate=current`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Residents</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Switch>
                    <Route path="/places/estates/:id/owners" render={ (props) => <PlaceOwners {...props} id={this.props.estate.id} place={this.props.estate} /> } />
                    <Route path="/places/estates/:id/residents" render={ (props) => <PlaceResidents {...props} id={this.props.estate.id} place={this.props.estate} /> } />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        estate: state.estate,
        hasErrored: state.estateHasErrored,
        isLoading: state.estateIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(estateFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Farm)
