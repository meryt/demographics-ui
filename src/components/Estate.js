import React, { Component } from 'react'
import { connect } from 'react-redux'
import { estateFetchData } from '../actions/estate'

class Estate extends Component {
  componentDidMount() {
      this.props.fetchData(`http://localhost:8095/api/places/${this.props.match.params.estateId}`)
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, there was an error loading the item</p>
    }

    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <h2>{this.props.estate.name}, {this.props.estate.location}</h2>
        <p>Value: {this.props.estate.value}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        estate: state.estate,
        hasErrored: state.estateHasErrored,
        isLoading: state.estateIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(estateFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Estate)
