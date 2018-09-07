import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Estate from '../components/Estate'
import EstateList from '../components/EstateList'

export default class Places extends Component {
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
            <div className="places">
                <Navbar color="light" light expand="md">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to="/places/parishes">
                                <NavItem className="btn btn-sm" role="button">Parishes</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/places/estates">
                                <NavItem className="btn btn-sm" role="button">Estates</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/places/towns">
                                <NavItem className="btn btn-sm" role="button">Towns</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <h1>Places</h1>
                <p>places go here.</p>

                <Switch>
                    <Route exact path="/places/estates" component={EstateList} />
                    <Route path={`/places/estates/:estateId`} component={Estate} />
                </Switch>
            </div>
        )
    }
}
