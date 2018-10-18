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
import House from '../components/House'
import Parish from '../components/Parish'
import PlaceList from '../components/PlaceList'
import Estates from '../components/Estates'
import Farm from '../components/Farm'
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
                            <LinkContainer to="/places/farms">
                                <NavItem className="btn btn-sm" role="button">Farms</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Switch>
                    <Route exact path="/places/estates" render={ (props) => <Estates {...props} type="estates" /> } />
                    <Route exact path="/places/towns" render={ (props) => <PlaceList {...props} type="towns" /> } />
                    <Route exact path="/places/parishes" render={ (props) => <PlaceList {...props} type="parishes" /> } />
                    <Route exact path="/places/farms" render={ (props) => <Estates {...props} type="farms" /> } />

                    <Route path={`/places/parishes/:parishId`} component={Parish} />
                    <Route path={`/places/estates/:estateId`} component={Estate} />
                    <Route path={`/places/towns/:townId`} component={Town} />
                    <Route path={`/places/houses/:houseId`} component={House} />
                    <Route path={`/places/farms/:farmId`} component={Farm} />
                </Switch>
            </div>
        )
    }
}
