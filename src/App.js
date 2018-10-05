import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'

import Routes from './Routes'

class App extends Component {
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
            <div className="above-app" />
            <div className="App container">
                <Navbar className="top-nav" expand="md">
                        <Nav className="ml-auto" navbar>
                            <NavItem className="btn people-btn" role="button"></NavItem>
                            <NavItem className="btn places-btn" role="button"></NavItem>
                            <NavItem className="btn titles-btn" role="button"></NavItem>
                        </Nav>
                </Navbar>

                <Navbar className="main-nav" light expand="md">
                    <LinkContainer to="/">
                        <NavbarBrand>Demographics</NavbarBrand>
                    </LinkContainer>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <LinkContainer to="/persons">
                                <NavItem className="btn people-btn" role="button">People</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/places/estates">
                                <NavItem className="btn places-btn" role="button">Places</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/titles">
                                <NavItem className="btn titles-btn" role="button">Titles</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Routes />
            </div>
        </div>
    );
  }
}

export default App;
