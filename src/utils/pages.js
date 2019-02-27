import React from 'react'
import { Helmet } from 'react-helmet'

export function renderDefaultTitle(optionalString) {
    var extendedString = ''
    if (optionalString) {
        if (typeof(optionalString) === 'object') {
            extendedString = optionalString.join(' - ')
        } else {
            extendedString = optionalString
        }
    }
    if (extendedString) {
        return (
            <Helmet>
                <title>Demographics - {extendedString}</title>
            </Helmet>
        )
    } else {
        return (
            <Helmet>
                <title>Demographics</title>
            </Helmet>
        )
    }
}

export function pageTitleFromPerson(person) {
    return renderDefaultTitle(`${ person.firstName } ${ person.lastName == null ? '' : person.lastName }`)
}
