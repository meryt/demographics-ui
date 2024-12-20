import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Person from '../pages/Person'
import Characters from '../pages/Characters'
import TitleList from '../pages/TitleList'
import Title from '../pages/Title'

import PersonSearchForm from '../components/PersonSearchForm'

import '../css/Persons.scss'
import { renderDefaultTitle } from '../utils/pages'

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
            <div>
                { renderDefaultTitle('People') }
                <header>People</header>
                <div className="main-content persons">
                    <Navbar className="sub-nav" expand="md">
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <LinkContainer to="/persons/characters">
                                    <NavItem className="btn btn-sm" role="button">Characters</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/persons/titles">
                                    <NavItem className="btn btn-sm" role="button">Titles</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/persons/search">
                                    <NavItem className="btn btn-sm" role="button">Search</NavItem>
                                </LinkContainer>
                            </Nav>
                        </Collapse>
                    </Navbar>

                    <Switch>
                        <Route exact path="/persons/search" component={PersonSearchForm} />
                        <Route exact path="/persons/characters" render={ (props) => <Characters {...props} /> } />
                        <Route exact path="/persons/titles" render={ (props) => <TitleList {...props} /> } />
                        <Route path={`/persons/titles/:titleId`} component={Title} />
                        <Route path={`/persons/:id`} component={Person} />
                    </Switch>
                </div>
            </div>
        )
    }
}
