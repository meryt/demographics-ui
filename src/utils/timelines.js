import { friendlyDate, subtractOneDay } from './dates'
import { titleCase } from './strings'

export function createTimelineEntry(entry, groupId) {
    var obj = {
        start: entry.fromDate,
        content: entry.content,
        group: groupId,
        className: 'timeline-entry'
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
