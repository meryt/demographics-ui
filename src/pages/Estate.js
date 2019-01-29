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
import PlaceChildPlaces from '../components/PlaceChildPlaces'
import PlaceOwners from '../components/PlaceOwners'
import PlaceResidents from '../components/PlaceResidents'
import { renderDefaultTitle } from '../utils/pages'
import { formatNumber } from '../utils/strings'

class Estate extends Component {

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
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.estateId}?onDate=current`)
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
                { renderDefaultTitle(`${this.props.estate.name}, ${this.props.estate.location}`) }
                <div className="inner-content">
                    <h2>{this.props.estate.name}, {this.props.estate.location}</h2>
                    <p>Estate value: { formatNumber(this.props.estate.value) }</p>
                    <p>Estate size: { formatNumber(Math.round(this.props.estate.acres)) } acres</p>
                </div>


                <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to={`/places/estates/${this.props.estate.id}/houses`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Houses</NavItem>
                            </LinkContainer>
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
                    <Route path="/places/estates/:id/houses" render={ (props) => <PlaceChildPlaces {...props} id={this.props.estate.id} childPlaceType="DWELLING" place={this.props.estate} /> } />
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

export default connect(mapStateToProps, mapDispatchToProps)(Estate)
