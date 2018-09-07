import React, { Component } from 'react'
import { connect } from 'react-redux'
import { estatesFetchData } from '../actions/estates'

class EstateList extends Component {
  componentDidMount() {
    this.props.fetchData('http://localhost:8095/api/places/estates')
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
        {this.props.estates.map((estate) => (
          <li key={estate.id}>
            {estate.name}
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        estates: state.estates,
        hasErrored: state.estatesHasErrored,
        isLoading: state.estatesIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(estatesFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstateList)
