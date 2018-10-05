import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'
import { formatNumber } from '../utils/strings'

class PersonCapital extends Component {

    renderCapitalRow(capitalHistoryRow) {
        if (capitalHistoryRow == null) {
            return null
        }

        return (
            <tr key={`personCapital-${capitalHistoryRow.fromDate}`}>
                <td>{ capitalHistoryRow.fromDate }</td>
                <td>{ formatNumber(Math.round(capitalHistoryRow.capital)) }</td>
                <td>{ capitalHistoryRow.reason }</td>
            </tr>
        )
    }
    render() {
        if (this.props.person == null || this.props.person.capitalHistory == null) {
            return null
        }

        return (
            <div className="inner-content personCapital">
                <h3>Capital History</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Capital</th>
                            <th>Notes</th>
                        </tr>
                    </thead>

                    { this.props.person.capitalHistory.map(capitalHistoryRow => this.renderCapitalRow(capitalHistoryRow)) }
                </Table>
            </div>
        )
    }

}

export default PersonCapital;
