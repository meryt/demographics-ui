import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import { descendantsFetchData } from '../actions/person'

import PersonLink from '../components/PersonLink'

import { friendlyAge, getYear } from '../utils/dates'
import { renderPersonTitles } from '../utils/persons'

class PersonDescendantsTree extends Component {

    constructor(props) {
        super(props)

        this.numGenerations = null
    }

    maybeFetchData(queryValues) {
        let numGenerations = (typeof(queryValues.numGenerations) !== 'string' || queryValues.numGenerations === null)
            ? '5'
            : queryValues.numGenerations

        if (numGenerations !== this.numGenerations) {
            this.numGenerations = numGenerations

            this.props.fetchData(`http://localhost:8095/api/persons/${this.props.match.params.id}/descendants?onDate=current&numGenerations=${this.numGenerations}`)
        }
    }

    componentDidMount() {
        this.maybeFetchData(queryString.parse(this.props.location.search))
    }

    componentDidUpdate() {
        this.maybeFetchData(queryString.parse(this.props.location.search))
    }

    render() {
        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || typeof(this.props.descendants) === 'undefined' ) {
          return <p>Loading...</p>
        }
        if (this.props.descendants.id == null) {
            return <p>No descendants</p>
        }

        let person = this.props.descendants

        return (
            <div className="inner-content">
                <h4>Descendants</h4>

                <p>
                    <Link to={ `/persons/${this.props.match.params.id}/descendants?numGenerations=${parseInt(this.numGenerations, 10) - 1}` }>&laquo; Show fewer generations</Link>
                     &nbsp;|&nbsp;
                     <Link to={ `/persons/${this.props.match.params.id}/descendants?numGenerations=${parseInt(this.numGenerations, 10) + 1}` }>Show more generations &raquo;</Link>
                </p>

                <ul className="descendant-tree">
                    <li><PersonLink person={person} />{ this.renderTitles(person) }
                    { person.children != null && person.children.length > 0 &&
                        this.renderChildren(person.children)
                    }
                    </li>
                </ul>
            </div>
        )
    }

    renderChildren(listOfChildren) {
        if (listOfChildren == null || listOfChildren.length === 0) {
            return null
        }

        return (
            <ul>
                { listOfChildren.map(child => <li key={ `child-${child.id}` }>{ this.renderPersonSpan(child) }{ this.renderChildren(child.children) }</li>) }
            </ul>
        )
    }

    renderPersonSpan(person) {
        return (
            <span className={ person.age == null ? 'deceased' : 'living' }>
                <PersonLink person={ person } extraPath="/descendants" />{ this.renderTitles(person) } ({ getYear(person.birthDate) } - { getYear(person.deathDate) }, aged { friendlyAge(person.ageAtDeath) }{ person.age != null && `, currently aged ${ friendlyAge(person.age) }` })
            </span>
        )
    }

    renderTitles(person) {
        if (person.titles != null && person.titles.length > 0) {
            return <span className="descendant-titles">, { renderPersonTitles(person) }</span>
        } else {
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        descendants: state.descendants,
        hasErrored: state.descendantsHasErrored,
        isLoading: state.descendantsIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(descendantsFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDescendantsTree)
