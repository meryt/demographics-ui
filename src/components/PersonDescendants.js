import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Table
} from 'reactstrap'

import { livingDescendantsFetchData } from '../actions/person'

import PersonLink from '../components/PersonLink'

import { friendlyAge, friendlyDate } from '../utils/dates'

class PersonDescendants extends Component {
    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/persons/${this.props.match.params.id}/living-descendants?aliveOnDate=current`)
    }

    render() {
        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || typeof(this.props.descendants) === 'undefined' ) {
          return <p>Loading...</p>
        }
        if (this.props.descendants === []) {
            return <p>No descendants</p>
        }

        return (
            <div className="inner-content">
                <h4>Living Descendants</h4>

                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birth date</th>
                            <th>Age</th>
                            <th>Death date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.descendants.map(person => (
                            <tr key={ `descendant-${person.id}` }>
                                <td><PersonLink person={person} /></td>
                                <td>{ friendlyDate(person.birthDate) }</td>
                                <td>{ friendlyAge(person.age) }</td>
                                <td>{ friendlyDate(person.deathDate) }</td>
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
        descendants: state.livingDescendants,
        hasErrored: state.livingDescendantsHasErrored,
        isLoading: state.livingDescendantsIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(livingDescendantsFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonDescendants)
