import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table
} from 'reactstrap'

import { placesFetchData } from '../actions/places'

import { friendlyDate } from '../utils/dates'
import { renderPlaceLink } from '../utils/places'
import { formatNumber } from '../utils/strings'
import { renderPersonLink, renderPersonTitles } from '../utils/persons'

class Estates extends Component {

    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/places/${this.props.type}?onDate=current`)
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            // Must call this function every time the type changes, since componentDidMount is only called once.
            // Otherwise once you are on the PlaceList, clicking between types of place will not reload data.
            this.props.fetchData(`http://localhost:8095/api/places/${this.props.type}?onDate=current`)
        }
    }

  renderEstateRows(estate) {
      if (estate == null) {
          return null
      }

      return (
          <tbody key={ `estate-row-${estate.id}` }>
            <tr>
                <th colSpan="2"><Link to={`/places/${this.props.type}/${estate.id}`}>{estate.name}</Link>, { estate.location },
                 { estate.acres != null && <span>{ formatNumber(Math.round(estate.acres)) } acres,</span> }
                 value { formatNumber(estate.value) }</th>
            </tr>
            <tr>
                <th>Owner</th>
                <td>{ this.renderCurrentOwner(estate) }</td>
            </tr>
            { this.renderLeadingHouseholds(estate) }
            <tr>
                <th>Population</th>
                <td>{ estate.totalPopulation }</td>
            </tr>
          </tbody>
      )
  }

  renderCurrentOwner(estate) {
      if (estate == null) {
          return null
      }

      if (estate.currentOwner == null) {
          return <p><i>Unowned</i></p>
      }

      let owner = estate.currentOwner
      return (
            <div>
                { renderPersonLink(owner) }{owner.occupation != null && `, ${owner.occupation.name}`}, died { friendlyDate(owner.deathDate) }
            </div>
      )
  }

  renderLeadingHouseholds(estate) {
      if (estate == null || estate.leadingHouseholds == null) {
          return null
      }

      let numHouseholds = estate.leadingHouseholds.length
      if (numHouseholds === 0) {
          return null
      }

      let i = 0
      return estate.leadingHouseholds.map(hh => this.renderHouseholdRow(hh, i++, numHouseholds))
  }

  renderHouseholdRow(household, index, numHouseholds) {
      if (household == null) {
          return null
      }

      let titles = renderPersonTitles(household.head)

      return (
          <tr key={ `household-row-${household.id}` }>
            { index === 0 && <th rowSpan={ numHouseholds }>Leading Households</th> }
            <td>Household of { renderPersonLink(household.head, '/household') }
            { titles != null && ', '}
            { titles != null && titles },
                resident of { renderPlaceLink(household.location) }, value { household.location.value }</td>
          </tr>
      )
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, there was an error loading the items</p>
    }

    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    return (
        <div className="inner-content">
            <h2>Estates</h2>

            <Table>
                {this.props.estates.map((estate) => ( this.renderEstateRows(estate) ))}
            </Table>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        estates: state.places,
        hasErrored: state.placesHasErrored,
        isLoading: state.placesIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(placesFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Estates)
