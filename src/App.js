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
      <div className="App container">
        <Navbar color="light" light expand="md">
            <LinkContainer to="/">
                <NavbarBrand>DemoUI</NavbarBrand>
            </LinkContainer>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <LinkContainer to="/persons">
                        <NavItem className="btn btn-light" role="button">People</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/places">
                        <NavItem className="btn btn-light" role="button">Places</NavItem>
                    </LinkContainer>
                </Nav>
            </Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
