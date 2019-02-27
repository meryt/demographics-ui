import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'
import { renderPlaceLink } from '../utils/places'
import { formatNumber, titleCase } from '../utils/strings'

class PersonProperty extends Component {

    renderPropertyRow(property) {
        if (property == null) {
            return null
        }

        return (
            <tr key={`personProperty-${property.id}`}>
                <td>{ renderPlaceLink(property) }</td>
                <td>{ titleCase(property.type) }</td>
                <td>{ formatNumber(Math.round(property.value)) }</td>
                <td>{ renderPlaceLink(property.parent) }</td>
            </tr>
        )
    }
    render() {
        if (this.props.person == null || this.props.person.ownedProperties == null) {
            return null
        }

        return (
            <div className="inner-content personProperty">
                <h3>Properties</h3>

                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.person.ownedProperties.map(property => this.renderPropertyRow(property)) }
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default PersonProperty;
