import moment from 'moment'

import { friendlyDate, getYear, subtractOneDay } from './dates'
import { titleCase } from './strings'

export function formatNameAndDatesForPerson(person, fromDate, toDate) {
    if (!fromDate) {
        fromDate = person.birthDate
    }
    if (!toDate) {
        toDate = person.deathDate
    }
  return `<a href="/persons/${person.id}/timeline">${person.firstName} ${(person.lastName == null ? '' : person.lastName)} (${getYear(fromDate)} - ${getYear(toDate)})</a>`
}

export function formatNameAndFriendlyDatesForPerson(person, fromDate, toDate) {
    if (!fromDate) {
        fromDate = person.birthDate
    }
    if (!toDate) {
        toDate = person.deathDate
    }
  return `<a href="/persons/${person.id}/timeline">${person.firstName} ${(person.lastName == null ? '' : person.lastName)} (${friendlyDate(fromDate)} - ${friendlyDate(toDate)})</a>`    
}

export function getDefaultOptions(currentDate) {
    var start = '1800-01-01'
    var end = '1805-01-01'

    const options = {
      width: '100%',
      start: start,
      end: end,
      margin: {
          item: {
              horizontal: 0
          }
      }
    }

    if (currentDate != null) {
        let cd = moment(currentDate)
        options.start = cd.subtract(3, 'years').format('YYYY-MM-DD')
        // add 6 years so that it centers on the current date (cd.subtract is modifying cd)
        options.end = cd.add(6, 'years').format('YYYY-MM-DD')
    }

    return options
}

export function createTimelineEntry(entry, groupId) {
    var obj = {
        start: entry.fromDate,
        content: entry.content,
        className: 'timeline-entry'
    }
    if (groupId) {
        obj.group = groupId
    }
    obj.title = entry.title == null ? entry.content : entry.title

    if (entry.toDate == null) {
        obj.type = 'point'
        obj.title += ` (${friendlyDate(entry.fromDate)})`
    } else {
        obj.end = subtractOneDay(entry.toDate)
        obj.title += ` (${friendlyDate(entry.fromDate)} - ${friendlyDate(entry.toDate)})`
    }
    return obj
}

export function timelineCategoryToGroupName(category) {
    switch (category) {
        case 'RULER_ENGLAND':
            return 'Britain'
        case 'RULER_FRANCE':
            return 'France'
        default:
            return titleCase(category)

    }
}
