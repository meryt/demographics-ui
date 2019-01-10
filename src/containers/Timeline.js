import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import TimelineComponent from '../components/TimelineComponent'

import { renderDefaultTitle } from '../utils/pages'

export default class Timeline extends Component {
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
            <div>
                { renderDefaultTitle('Timeline') }
                <header>Timeline</header>
                <div className="main-content timeline">
                    <Navbar className="sub-nav" expand="md">
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <LinkContainer to="/timeline">
                                    <NavItem className="btn btn-sm" role="button">Timeline</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/timeline/storylines">
                                    <NavItem className="btn btn-sm" role="button">Storylines</NavItem>
                                </LinkContainer>
                            </Nav>
                        </Collapse>
                    </Navbar>

                    <Switch>
                        <Route exact path={`/timeline/storylines`} render={ (props) => <TimelineComponent {...props} type="storylines" /> } />
                        <Route exact path={`/timeline`} render={ (props) => <TimelineComponent {...props} type="general" /> } />
                    </Switch>
                </div>
            </div>
        )
    }
}
