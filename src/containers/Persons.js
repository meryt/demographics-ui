import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Person from '../components/Person'

import '../css/Persons.css'

export default class Persons extends Component {
    render() {
        return (
            <div className="main-content persons">
                <Switch>
                    <Route path={`/persons/:id`} component={Person} />
                </Switch>
            </div>
        )
    }
}
