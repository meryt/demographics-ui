import React from 'react'
import { Link } from 'react-router-dom'

function PersonLink(props) {
    if (props.person == null || props.person.firstName == null) {
        return null
    }

    let path = props.extraPath == null ? '' : props.extraPath

    return <Link to={ `/persons/${props.person.id}${path}` }>{props.person.firstName}{props.person.lastName != null && ` ${props.person.lastName}`}</Link>
}

export default PersonLink
