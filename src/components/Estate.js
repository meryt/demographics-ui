import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
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
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.estateId}`)
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
            <h2>{this.props.estate.name}, {this.props.estate.location}</h2>
            <p>Value: {this.props.estate.value}</p>


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

export default connect(mapStateToProps, mapDispatchToProps)(Estate)
