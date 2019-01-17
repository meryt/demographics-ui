import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Table
} from 'reactstrap'
import { friendlyDate } from '../utils/dates'
import { renderOwnerReason } from '../utils/places'

class PlaceOwners extends Component {

    renderReason(reason) {
        return <td>{ renderOwnerReason(reason) }</td>
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || this.props.place == null || this.props.place.owners == null) {
            return <p>Loading...</p>
        }

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>From</th>
                            <th>To</th>
                            <th>How acquired</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.place.owners.map((owner) => (
                            <tr key={`owner-row-${owner.person.id}`}>
                                <td><Link to={`/persons/${owner.person.id}`}>{owner.person.firstName} {owner.person.lastName}</Link></td>
                                <td>{ friendlyDate(owner.fromDate) }</td>
                                <td>{ friendlyDate(owner.toDate) }</td>
                                { this.renderReason(owner.reason) }
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default PlaceOwners
