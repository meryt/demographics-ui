import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { currentDateFetchData } from './actions/timeline'

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

    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/calendar/currentDate`)
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

  render() {
      if (this.props.hasErrored) {
        return <p>Sorry, there was an error loading the current date</p>
      }

      if (this.props.isLoading) {
        return <p>Loading...</p>
      }

      if (this.props.currentDate == null) {
          return <p>no current date found</p>
      }

    return (
        <div>
            <div className="above-app" />
            <div className="App container">
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
                            <LinkContainer to="/timeline">
                                <NavItem className="btn titles-btn" role="button">Timeline</NavItem>
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

const mapStateToProps = (state) => {
    return {
        currentDate: state.currentDate,
        hasErrored: state.currentDateHasErrored,
        isLoading: state.currentDateIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(currentDateFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
