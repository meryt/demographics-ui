import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timeline from 'react-visjs-timeline'
import moment from 'moment'

import '../css/timeline.scss'

import { timelineFetchData } from '../actions/timeline'

import { createTimelineEntry, timelineCategoryToGroupName } from '../utils/timelines'

class TimelineComponent extends Component {

    componentDidMount() {
        this.fetchTimeline(this.props.type)
    }

    fetchTimeline(type) {
        if (type === 'storylines') {
            this.props.fetchData(`http://localhost:8095/api/timeline?category=RULER_ENGLAND,RULER_FRANCE,WAR,PARLIAMENT&includeStorylines=true`)
        } else {
            this.props.fetchData(`http://localhost:8095/api/timeline?category=RULER_ENGLAND,RULER_FRANCE,WAR,PARLIAMENT`)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.fetchTimeline(this.props.type)
        }
    }

    render() {

        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the items</p>
        }

        if (this.props.isLoading) {
          return <p>Loading...</p>
        }

        if (this.props.entries == null || this.props.entries.length === 0) {
            return <p>no entries found</p>
        }

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

        if (this.props.currentDate != null) {
            let cd = moment(this.props.currentDate)
            options.start = cd.subtract(3, 'years').format('YYYY-MM-DD')
            // add 6 years so that it centers on the current date (cd.subtract is modifying cd)
            options.end = cd.add(6, 'years').format('YYYY-MM-DD')
        }

        const items = []
        const groups = []
        var order = 0

        for (var m = 0; m < this.props.entries.length; m++) {
            var entry = this.props.entries[m]
            var groupId
            if (this.props.type === 'storylines' && entry.storylines != null && entry.storylines.length > 0) {
                // Add an entry to a separate group for each storyline
                for (var n = 0; n < entry.storylines.length; n++) {
                    var storyline = entry.storylines[n]
                    var storylineGroupId = 'storyline-' + storyline.id
                    if (!groups.find(function(element) { return element.id === storylineGroupId })) {
                        groups.push({ id: storylineGroupId, content: storyline.name, order: order++ })
                    }
                    items.unshift(createTimelineEntry(entry, storylineGroupId))
                }
            }
            if (entry.category !== 'STORY' || (this.props.type !== 'storylines' || entry.storylines == null || entry.storylines.length === 0)) {
                // Add an entry to the group according to the category
                groupId = `timeline-group-${entry.category}`
                if (!groups.find(function(element) { return element.id === groupId})) {
                    groups.push({id: groupId, content: timelineCategoryToGroupName(entry.category), order: order++})
                }
                items.unshift(createTimelineEntry(entry, groupId))
            }
        }

        return (
            <div className="inner-content timeline-component">
                <Timeline options={options} items={items} groups={groups} />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentDate: state.currentDate,
        entries: state.timeline,
        hasErrored: state.timelineHasErrored,
        isLoading: state.timelineIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(timelineFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineComponent)
