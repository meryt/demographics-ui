import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import {
    Table
} from 'reactstrap'

import { relativesFetchData } from '../actions/person'

import PersonLink from '../components/PersonLink'

import { friendlyDate } from '../utils/dates'

class PersonRelatives extends Component {

    constructor(props) {
        super(props)

        this.isOnlyLiving = true
        this.aliveOnDate = null
        this.maxDistance = null
    }

    componentDidUpdate() {
        this.maybeFetchData(queryString.parse(this.props.location.search))
    }

    componentDidMount() {
        this.maybeFetchData(queryString.parse(this.props.location.search))
    }

    maybeFetchData(queryValues) {

        let aliveOnDate = (typeof(queryValues.aliveOnDate) !== 'string' || queryValues.aliveOnDate === null)
            ? 'current'
            : queryValues.aliveOnDate
        let maxDistance = (typeof(queryValues.maxDistance) !== 'string' || queryValues.maxDistance === null)
            ? '4'
            : queryValues.maxDistance

        if (aliveOnDate !== this.aliveOnDate || maxDistance !== this.maxDistance) {
            this.aliveOnDate = aliveOnDate
            this.maxDistance = maxDistance
            this.isOnlyLiving = aliveOnDate === 'current'

            this.props.fetchData(`http://localhost:8095/api/persons/${this.props.match.params.id}/relatives?aliveOnDate=${this.aliveOnDate}&maxDistance=${this.maxDistance}`)
        }

    }

    render() {
        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || typeof(this.props.relatives) === 'undefined' ) {
          return <p>Loading...</p>
        }
        if (this.props.relatives === []) {
            return <p>No living relatives</p>
        }

        return (
            <div className="inner-content">
                <h4>{ this.isOnlyLiving && 'Living' }{ this.isOnlyLiving || 'All' } Relatives</h4>

                <p>
                { this.isOnlyLiving && <Link to={ `/persons/${this.props.match.params.id}/relatives?aliveOnDate=&maxDistance=${this.maxDistance}` }>Show living and dead relatives</Link> }
                { this.isOnlyLiving || <Link to={ `/persons/${this.props.match.params.id}/relatives?aliveOnDate=current&maxDistance=${this.maxDistance}` }>Show only living relatives</Link> }
                </p>

                <p>
                    <Link to={ `/persons/${this.props.match.params.id}/relatives?aliveOnDate=${this.aliveOnDate}&maxDistance=${parseInt(this.maxDistance, 10) - 1}` }>&laquo; Show only closer relatives</Link>
                     &nbsp;|&nbsp;
                     <Link to={ `/persons/${this.props.match.params.id}/relatives?aliveOnDate=${this.aliveOnDate}&maxDistance=${parseInt(this.maxDistance, 10) + 1}` }>Show more distant relatives &raquo;</Link>
                </p>

                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birth date</th>
                            <th>Death date</th>
                            <th>Relationship</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.relatives.map(person => (
                            <tr key={ `relative-${person.id}` }>
                                <td><PersonLink person={ person } /></td>
                                <td>{ friendlyDate(person.birthDate) }</td>
                                <td>{ friendlyDate(person.deathDate) }</td>
                                <td>{ person.relationship.name }</td>
                            </tr>
                        )) }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        relatives: state.relatives,
        hasErrored: state.relativesHasErrored,
        isLoading: state.relativesIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(relativesFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonRelatives)
