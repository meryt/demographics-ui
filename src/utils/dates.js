import moment from 'moment'

export function friendlyDate(date) {
    if (date == null) {
        return null
    }
    return moment(date).format('MMMM Do, YYYY')
}
