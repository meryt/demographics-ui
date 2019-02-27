import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'

import HouseholdListRow from './HouseholdListRow'

class HouseholdListTable extends Component {

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || this.props.households == null || this.props.households.length === 0) {
            return <p>Loading...</p>
        }

        // Create a new array that we can sort
        let households = this.props.households.slice()
        //households.sort(this.compareHouseholds)

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Class</th>
                        <th>Occupation</th>
                        <th>Relationship to head</th>
                    </tr>
                </thead>
                {
                  households.map((hh) => <HouseholdListRow household={hh} key={`household-section-${hh.id}`}/>)
                }
            </Table>
        )
    }

    compareHouseholds(a, b) {
        if (a.location != null && b.location != null && a.location.value != null && b.location.value != null) {
            // Sort descending
            return (b.location.value - a.location.value)
        } else {
            // sort ascending
            return (a.id - b.id)
        }
    }
}

export default HouseholdListTable;
