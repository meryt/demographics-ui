import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Table
} from 'reactstrap'

import { relativesFetchData } from '../actions/person'

import { renderPersonLink } from '../utils/persons'
import { friendlyAge, friendlyDate } from '../utils/dates'

class PersonRelatives extends Component {
    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/persons/${this.props.match.params.id}/relatives?aliveOnDate=current&maxDistance=4`)
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
                <h4>Living Relatives</h4>

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
                                <td>{ renderPersonLink(person) }</td>
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
