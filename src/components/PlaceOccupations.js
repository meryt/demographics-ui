import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'
import { renderPersonLink } from '../utils/persons'

class PlaceOccupations extends Component {

    renderPersonRow(person) {
        return (
            <tr key={ `occ-person-${person.id}` }>
                <td>{ renderPersonLink(person) }</td>
            </tr>
        )
    }

    renderOccupationRows(name, people) {
        if (name == null || people == null || people.length === 0) {
            return null
        }

        return (
            <tbody key={ `occupation-${name}` }>
                <tr>
                    <th>{ name }</th>
                </tr>
                { people.map((person) => this.renderPersonRow(person)) }
            </tbody>
        )
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || this.props.place == null || this.props.place.occupations == null) {
            return <p>Loading...</p>
        }

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                        { Object.entries(this.props.place.occupations).map((entry) => this.renderOccupationRows(entry[0], entry[1])) }
                </Table>
            </div>
        )
    }
}

export default PlaceOccupations
