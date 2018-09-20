import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    Table
} from 'reactstrap'
import { friendlyDate } from '../utils/dates'

class PlaceOwners extends Component {

    renderReason(reason) {
        if (reason == null) {
            return <td></td>
        }

        // Persons include an ID, a name, a comma, and a relationship, like "5 Boby Zozo, first cousin"
        let match = reason.match(/([^\d]*)(\d+) ([^,]+)(,.*)/)
        if (match != null && match.length > 1) {
            let personId = match[2]
            let personName = match[3]
            return <td>{ match[1] }<Link to={`/persons/${personId}`}>{personName}</Link>{ match[4] }</td>
        } else {
            // Titles are just an ID followed by the name and nothing else
            let titleMatch = reason.match(/([^\d]*)(\d+) (.*)/)
            if (titleMatch != null && titleMatch.length > 1) {
                let titleId = titleMatch[2]
                let titleName = titleMatch[3]
                return <td>{ titleMatch[1] }<Link to={`/titles/${titleId}`}>{titleName}</Link></td>
            }

            return <td>{ reason }</td>
        }
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
