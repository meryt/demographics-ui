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

import { townFetchData } from '../actions/towns'
import PlaceOwners from './PlaceOwners'
import PlaceResidents from './PlaceResidents'

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

    renderPlaceRow(place) {
        if (place == null) {
            return null
        }

        return (
            <tr key={`child-place-${place.id}`}>
                <td>{ place.name }</td>
                <td>{ place.value }</td>
                <td>{ this.renderPlaceOwner(place) }</td>
                <td>{ place.totalPopulation }</td>
            </tr>
        )
    }

    renderPlaceOwner(place) {
        if (place == null || place.owners == null) {
            return null
        }

        if (place.owners.length === 0) {
            return 'no owner'
        }

        let owner = place.owners[0]
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

        if (this.props.isLoading) {
            return <p>Loading...</p>
        }

        return (
            <div>
            <h2>{this.props.town.name}, {this.props.town.location}</h2>

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
                    this.props.town.places != null && this.props.town.places.map(p => this.renderPlaceRow(p))
                }
                </tbody>
            </Table>

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
