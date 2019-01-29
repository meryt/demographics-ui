import React from 'react'
import { Link } from 'react-router-dom'
import { friendlyAge } from '../utils/dates'
import { friendlyClass } from '../utils/persons'

function HouseholdListPersonRow(props) {

    if (props.person == null) {
        return null
    }

    const person = props.person

    return (
        <tr key={ `household-inhabitant-${person.id}` }>
            <td><Link to={ `/persons/${person.id}` }>{person.firstName} {person.lastName}</Link></td>
            <td>{ friendlyAge(person.age) } </td>
            <td>{ friendlyClass(person.socialClass) }</td>
            <td>{ person.occupation != null && person.occupation.name }</td>
            <td>{ person.relationshipToHead != null && person.relationshipToHead.name }</td>
        </tr>
    )
}

export default HouseholdListPersonRow
