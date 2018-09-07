import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Button
} from 'reactstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import EstateList from './components/EstateList'

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
        <Navbar color="inverse" light expand="md">
            <NavbarBrand href="/">DemoUI</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/persons">People</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/places">Places</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
        <Container>
            <EstateList />
        </Container>
      </div>
    );
  }
}

export default App;
