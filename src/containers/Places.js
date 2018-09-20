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
import Parish from '../components/Parish'
import PlaceList from '../components/PlaceList'
import Town from '../components/Town'

import '../css/Places.css'

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
            <div className="main-content places">
                <Navbar className="sub-nav" expand="md">
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

                <Switch>
                    <Route exact path="/places/estates" render={ (props) => <PlaceList {...props} type="estates" /> } />
                    <Route exact path="/places/towns" render={ (props) => <PlaceList {...props} type="towns" /> } />
                    <Route exact path="/places/parishes" render={ (props) => <PlaceList {...props} type="parishes" /> } />

                    <Route path={`/places/parishes/:parishId`} component={Parish} />
                    <Route path={`/places/estates/:estateId`} component={Estate} />
                    <Route path={`/places/towns/:townId`} component={Town} />
                </Switch>
            </div>
        )
    }
}
