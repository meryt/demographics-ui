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
import PlaceResidents from './PlaceResidents'
import { placeTypeToPathType, renderTableOfDwellings } from '../utils/places'

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
                <div className="inner-content">
                    <h2>{this.props.town.name}</h2>

                    <p>Town, located in { this.renderParentLocationLink(this.props.town) }</p>

                    <p>Population { this.props.town.totalPopulation }</p>

                    { renderTableOfDwellings(this.props.town.places) }

                </div>

            <Navbar color="light" light expand="md">
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <LinkContainer to={`/places/towns/${this.props.town.id}/residents?onDate=current`}>
                            <NavItem className="btn btn-light btn-sm" role="button">Residents</NavItem>
                        </LinkContainer>
                    </Nav>
                </Collapse>
            </Navbar>

            <Switch>
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
        isLoading: state.townIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(townFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Town)
