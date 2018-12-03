import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Person from '../components/Person'
import Characters from '../components/Characters'

import '../css/Persons.css'

export default class Persons extends Component {
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

    render() {

        return (
            <div className="main-content persons">
                <Navbar className="sub-nav" expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to="/persons/characters">
                                <NavItem className="btn btn-sm" role="button">Characters</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Switch>
                    <Route exact path="/persons/characters" render={ (props) => <Characters {...props} /> } />
                    <Route path={`/persons/:id`} component={Person} />
                </Switch>
            </div>
        )
    }
}
