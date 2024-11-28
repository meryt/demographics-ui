import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

import PersonLink from '../components/PersonLink'

import { friendlyAge, getYear } from './dates'

export function renderPersonTitles(person, showInheritanceStyle) {
    if (person == null || person.titles == null) {
        return null
    }

    let shouldDereferenceTitle = person.titles[0].title != null

    return (
        <span>
          {person.titles
              .map(t => shouldDereferenceTitle ? t.title : t )
              .map(t => <Link key={ `title-${t.id}` } to={`/persons/titles/${t.id}`}>{t.name}
                  { showInheritanceStyle && _renderInheritanceStyle(t.inheritanceStyle) }</Link>)
              .reduce((accu, elem) => {
                  return accu === null ? [elem] : [...accu, ', ', elem]
              }, null)}
        </span>
    )
}

function _renderInheritanceStyle(style) {
    switch (style) {
        case 'HEIRS_MALE_OF_THE_BODY':
            return '  (MB)'
        case 'HEIRS_MALE_GENERAL':
            return ' (M)'
        case 'HEIRS_OF_THE_BODY':
            return ' (B)'
        default:
            return ''
    }
}

export function friendlyClass(socialClassString) {
    let firstWord = socialClassString.split(' ')[0].split(',')[0]
    switch (firstWord) {
        case 'Itinerant':
            return 'Pauper'
        case 'Freehold':
            return 'Farmer, craftsman'
        default:
            return firstWord
    }
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
            <td><PersonLink person={person} /></td>
            <td>{ friendlyAge(person.age) }</td>
            <td>{ getYear(person.birthDate) }</td>
            <td>{ getYear(person.deathDate) }</td>
        </tr>
    )
}
