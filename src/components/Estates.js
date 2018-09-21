import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table
} from 'reactstrap'
import { placesFetchData } from '../actions/places'
import { titleCase } from '../utils/strings'
import { placeTypeToPathType, renderPlaceLink } from '../utils/places'
import { renderPersonLink, renderPersonTitles } from '../utils/persons'

class Estates extends Component {
  componentDidMount() {
      this.props.fetchData(`http://localhost:8095/api/places/estates?onDate=current`)
  }

  renderEstateRows(estate) {
      if (estate == null) {
          return null
      }

      return (
          <tbody>
            <tr>
                <th colSpan="2"><Link to={`/places/estates/${estate.id}`}>{estate.name}</Link>, { estate.location }</th>
            </tr>
            <tr>
                <th>Owner</th>
                <td>{ this.renderCurrentOwner(estate) }</td>
            </tr>
            { this.renderLeadingHouseholds(estate) }
          </tbody>
      )
  }

  renderCurrentOwner(estate) {
      if (estate == null || estate.currentOwners == null) {
          return null
      }

      if (estate.currentOwners.length === 0) {
          return <p><i>Unowned</i></p>
      }

      let owner = estate.currentOwners[0]
      return (
            <div>
                { renderPersonLink(owner) }{owner.occupation != null && `, ${owner.occupation.name}`}
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

      let firstHousehold = estate.leadingHouseholds[0]
      var result = this.renderHouseholdRow(firstHousehold, true, numHouseholds)

      for (var i = 1; i < numHouseholds; i++) {
          result += this.renderHouseholdRow(estate.leadingHouseholds[i], false, numHouseholds)
      }

      return result
  }

  renderHouseholdRow(household, isFirst, numHouseholds) {
      if (household == null) {
          return null
      }

      return (
          <tr>
            { isFirst && <th rowSpan={ numHouseholds }>Leading Households</th> }
            <td>Household of { renderPersonLink(household.head, '/household') }{
                household.head.titles != null && ` ${renderPersonTitles(household.head)}` },
                resident of { renderPlaceLink(household.location) }</td>
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
