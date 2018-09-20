import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Persons from './containers/Persons'
import Places from './containers/Places'
import Titles from './containers/Titles'

export default () =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/persons" component={Persons} />
        <Route path="/places" component={Places} />
        <Route path="/titles" component={Titles} />
        <Route render={() => (<div>404</div>)} />
    </Switch>
