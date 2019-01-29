import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timeline from 'react-visjs-timeline'

import { placeResidentsTimelineFetchData } from '../actions/places'
import { getDefaultOptions, formatNameAndDatesForPerson } from '../utils/timelines'

class PlaceResidentsTimeline extends Component {

    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.id}/residents-timeline`)
    }

    render() {

        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || typeof(this.props.residents) === 'undefined' ) {
          return <p>Loading...</p>
        }
        if (this.props.residents === []) {
            return <p>No residents</p>
        }

        const options = getDefaultOptions(this.props.currentDate)

        const items = []
        this.props.residents.forEach(r => items.push(
            {
                content: formatNameAndDatesForPerson(r.person, r.fromDate, r.toDate),
                id: `${r.person.id}-${r.fromDate}`,
                title: formatNameAndDatesForPerson(r.person, r.fromDate, r.toDate),
                start: r.fromDate,
                end: r.toDate
            }
        ))

        return (
            <div className="inner-content timeline-component">
                <p>Residents</p>
                <Timeline options={options} items={items} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentDate: state.currentDate,
        residents: state.placeResidentsTimeline,
        hasErrored: state.placeResidentsTimelineHasErrored,
        isLoading: state.placeResidentsTimelineIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(placeResidentsTimelineFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceResidentsTimeline)
