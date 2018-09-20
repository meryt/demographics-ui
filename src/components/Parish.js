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

import { parishFetchData } from '../actions/parish'
import PlaceOwners from './PlaceOwners'
import PlaceResidents from './PlaceResidents'

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
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.parishId}`)
    }

    renderChildPlaces(placeType) {
        if (this.props.isLoading || this.props.parish.places == null) {
            return null
        }

        let type = placeType.toLowerCase()

        return (
            <ul>
            { this.props.parish.places.filter(p => p.type === placeType).map((p) => (
                <li key={`${type}-${p.id}`}><Link to={`/places/${type}s/${p.id}`}>{p.name}</Link></li>
            ))}
            </ul>
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
            <h2>{this.props.parish.name}, {this.props.parish.location}</h2>
            <p>Square miles: {this.props.parish.squareMiles}</p>
            <p>Acres: {this.props.parish.acres}</p>

            <h3>Towns</h3>
            { this.renderChildPlaces('TOWN') }

            <h3>Estates</h3>
            { this.renderChildPlaces('ESTATE') }

            <Navbar color="light" light expand="md">
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <LinkContainer to={`/places/parishes/${this.props.parish.id}/owners`}>
                            <NavItem className="btn btn-light btn-sm" role="button">Owners</NavItem>
                        </LinkContainer>
                        <LinkContainer to={`/places/parishes/${this.props.parish.id}/residents`}>
                            <NavItem className="btn btn-light btn-sm" role="button">Residents</NavItem>
                        </LinkContainer>
                    </Nav>
                </Collapse>
            </Navbar>

            <Switch>
                <Route path="/places/parishes/:id/owners" render={ (props) => <PlaceOwners {...props} id={this.props.parish.id} place={this.props.parish} /> } />
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
