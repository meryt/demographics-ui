import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table
} from 'reactstrap'
import { titleFetchData } from '../actions/title'
import { titleCase, enumToText } from '../utils/strings'
import { friendlyDate } from '../utils/dates'

class Title extends Component {


    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/titles/${this.props.match.params.titleId}`)
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchData(`http://localhost:8095/api/titles/${this.props.match.params.id}`)
        }
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading) {
            return <p>Loading...</p>
        }

        if (this.props.title == null) {
            return <p>No title found</p>
        }

        let title = this.props.title
        if (title.titleHolders == null) {
            title.titleHolders = []
        }

        return (
            <div>
            <h2>{title.name} {(title.extinct) && '(extinct)'}</h2>
            {(title.abeyanceCheckDate != null) && <p>(in abeyance until at least { friendlyDate(title.abeyanceCheckDate) })</p> }
            <p>Peerage: {titleCase(title.peerage)}</p>
            <p>Class: {title.socialClass}</p>
            <p>Inheritance: { enumToText(title.inheritanceStyle) }</p>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth date</th>
                        <th>From date</th>
                        <th>Death date</th>
                        <th>Relationship to previous</th>
                    </tr>
                </thead>
                <tbody>
                    {title.titleHolders.map((row) => (
                      <tr key={`person-${row.titleHolder.id}`}>
                        <td><Link to={`/persons/${row.titleHolder.id}`}>{row.titleHolder.firstName} {row.titleHolder.lastName}</Link></td>
                        <td>{friendlyDate(row.titleHolder.birthDate)}</td>
                        <td>{friendlyDate(row.fromDate)}</td>
                        <td>{friendlyDate(row.titleHolder.deathDate)}</td>
                        <td>{ row.relationshipToPrevious != null ? row.relationshipToPrevious.name : null }</td>
                      </tr>
                    ))}
                </tbody>
            </Table>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.title,
        hasErrored: state.titleHasErrored,
        isLoading: state.titleIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(titleFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Title)
