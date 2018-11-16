import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'
import { renderPlaceLink } from '../utils/places'
import { formatNumber } from '../utils/strings'

class PersonResidences extends Component {

    renderResidenceRow(residenceRow) {
        if (residenceRow == null) {
            return null
        }

        return (
            <tr key={`residenceRow-${residenceRow.householdId}-${residenceRow.location.id}`}>
                <td>{ residenceRow.householdId }</td>
                <td>{ renderPlaceLink(residenceRow.location) }, { residenceRow.location.location }</td>
                <td>{ formatNumber(Math.round(residenceRow.location.value)) }</td>
                <td>{ residenceRow.fromDate }</td>
                <td>{ residenceRow.toDate }</td>
            </tr>
        )
    }
    render() {
        if (this.props.person == null || this.props.person.residences == null) {
            return null
        }

        return (
            <div className="inner-content personResidences">
                <h3>Residences</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>Household</th>
                            <th>Residence</th>
                            <th>Value</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                    </thead>

                    { this.props.person.residences.map(residenceRow => this.renderResidenceRow(residenceRow)) }
                </Table>
            </div>
        )
    }

}

export default PersonResidences;
