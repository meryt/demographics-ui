import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    Nav
} from 'reactstrap'
import TimelineComponent from '../components/TimelineComponent'

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
                <header>Timeline</header>
                <div className="main-content timeline">
                    <Navbar className="sub-nav" expand="md">
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            </Nav>
                        </Collapse>
                    </Navbar>

                    <Switch>
                        <Route exact path={`/timeline`} component={TimelineComponent} />
                    </Switch>
                </div>
            </div>
        )
    }
}
