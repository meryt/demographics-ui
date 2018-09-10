import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { placesFetchData } from '../actions/places'

class PlaceList extends Component {
  componentDidMount() {
      this.props.fetchData(`http://localhost:8095/api/places/${this.props.type}`)
  }

  componentDidUpdate(prevProps) {
      if (this.props.type !== prevProps.type) {
          // Must call this function every time the type changes, since componentDidMount is only called once.
          // Otherwise once you are on the PlaceList, clicking between types of place will not reload data.
          this.props.fetchData(`http://localhost:8095/api/places/${this.props.type}`)
      }
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, there was an error loading the items</p>
    }

    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    return (
      <ul>
        {this.props.places.map((place) => (
          <li key={place.id}>
            <Link to={`/places/${this.props.type}/${place.id}`}>{place.name}, {place.location}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        places: state.places,
        hasErrored: state.placesHasErrored,
        isLoading: state.placesIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(placesFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList)
