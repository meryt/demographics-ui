import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import TitleList from '../components/TitleList'
import Title from '../components/Title'

//import '../css/Titles.css'

export default class Titles extends Component {
    render() {
        return (
            <div className="main-content titles">
                <Switch>
                    <Route exact path={`/titles`} component={TitleList} />
                    <Route path={`/titles/:titleId`} component={Title} />
                </Switch>

            </div>
        )
    }
}
