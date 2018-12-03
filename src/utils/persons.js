import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

import { friendlyAge, getYear } from './dates'

export function renderPersonLink(person, extraPath) {
    if (person == null || person.firstName == null) {
        return null
    }

    let path = extraPath == null ? '' : extraPath

    return <Link to={ `/persons/${person.id}${path}` }>{person.firstName}{person.lastName != null && ` ${person.lastName}`}</Link>
}

export function renderPersonTitles(person) {
    if (person == null || person.titles == null) {
        return null
    }

    let shouldDereferenceTitle = person.titles[0].title != null

    return (
        <span>
          {person.titles
              .map(t => shouldDereferenceTitle ? t.title : t )
              .map(t => <Link key={ `title-${t.id}` } to={`/titles/${t.id}`}>{t.name}</Link>)
              .reduce((accu, elem) => {
                  return accu === null ? [elem] : [...accu, ', ', elem]
              }, null)}
        </span>
    )
}

export function friendlyClass(socialClassString) {
    return socialClassString.split(' ')[0].split(',')[0]
}

export function renderTableOfPersons(persons) {
    if (persons == null) {
        return null
    }
    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Born</th>
                    <th>Died</th>
                </tr>
            </thead>
            <tbody>
            {
                persons.map(p => _renderPersonRow(p))
            }
            </tbody>
        </Table>
    )
}

function _renderPersonRow(person) {
    if (person == null) {
        return null
    }

    return (
        <tr key={`person-${person.id}`}>
            <td>{ renderPersonLink(person)}</td>
            <td>{ friendlyAge(person.age) }</td>
            <td>{ getYear(person.birthDate) }</td>
            <td>{ getYear(person.deathDate) }</td>
        </tr>
    )
}
