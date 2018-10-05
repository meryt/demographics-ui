import React from 'react'
import { Link } from 'react-router-dom'

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
