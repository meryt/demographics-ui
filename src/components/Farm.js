import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { estateFetchData } from '../actions/estate'
import PlaceOwners from './PlaceOwners'
import PlaceResidents from './PlaceResidents'
import { renderDefaultTitle } from '../utils/pages'
import { renderPlaceOwner, renderTableOfDwellings } from '../utils/places'
import { formatNumber } from '../utils/strings'

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

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || this.props.farm.id == null) {
            return <p>...</p>
        }

        if (this.props.farm != null && this.props.location.pathname === `/places/estates/${this.props.farm.id}`) {
            if (this.props.farm.owners != null && this.props.farm.owners.length > 0) {
                return <Redirect to={`/places/estates/${this.props.farm.id}/owners`} />
            }
        }

        return (
            <div>
                { renderDefaultTitle(`${this.props.farm.name}, ${this.props.farm.location}`) }
                <div className="inner-content">
                    <h2>{this.props.farm.name}, {this.props.farm.location}</h2>
                    <p>Farm value: { formatNumber(this.props.farm.value) }</p>
                    { this.props.farm.acres != null &&
                        <p>Estate size: { formatNumber(Math.round(this.props.farm.acres)) } acres</p>
                    }
                    <p>Owner: { renderPlaceOwner(this.props.farm) }</p>

                    { renderTableOfDwellings(this.props.farm.places) }
                </div>


                <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to={`/places/farms/${this.props.farm.id}/owners`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Owners</NavItem>
                            </LinkContainer>
                            <LinkContainer to={`/places/farms/${this.props.farm.id}/residents?onDate=current`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Residents</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Switch>
                    <Route path="/places/farms/:id/owners" render={ (props) => <PlaceOwners {...props} id={this.props.farm.id} place={this.props.farm} /> } />
                    <Route path="/places/farms/:id/residents" render={ (props) => <PlaceResidents {...props} id={this.props.farm.id} place={this.props.farm} /> } />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        farm: state.estate,
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
