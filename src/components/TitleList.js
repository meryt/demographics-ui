import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { titlesFetchData } from '../actions/titles'

class TitleList extends Component {
  componentDidMount() {
      this.props.fetchData(`http://localhost:8095/api/titles`)
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, there was an error loading the items</p>
    }

    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    if (this.props.titles == null) {
        return <p>no titles found</p>
    }

    return (
      <ul>
        {this.props.titles.map((title) => (
          <li key={title.id}>
            <Link to={`/titles/${title.id}`}>{title.name}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        titles: state.titles,
        hasErrored: state.titlesHasErrored,
        isLoading: state.titlesIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(titlesFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleList)
