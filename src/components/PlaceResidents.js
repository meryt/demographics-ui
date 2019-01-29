import React, { Component } from 'react'
import { connect } from 'react-redux'

import { placeResidentsFetchData } from '../actions/places'
import HouseholdList from './HouseholdList'

class PlaceResidents extends Component {

    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.id}/households?onDate=current`)
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

        return (
            <HouseholdList households={this.props.residents} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentDate: state.currentDate,
        residents: state.placeResidents,
        hasErrored: state.placeResidentsHasErrored,
        isLoading: state.placeResidentsIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(placeResidentsFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceResidents)
