import React, { Component } from 'react'
import {
    Table
} from 'reactstrap';

import PersonLink from './PersonLink'

class PersonPageTable extends Component {

    render() {
        console.log(this.props.page)

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.page != null && this.props.page.content != null && this.props.page.content.map(p => this.renderPersonRow(p)) }
                </tbody>
            </Table>
        )
    }

    renderPersonRow(person) {
        console.log('rendering person ' + person.id)
        return (
            <tr key={`person-${person.id}`}>
                <td><PersonLink person={person} /></td>
            </tr>
        )
    }

}
export default PersonPageTable
