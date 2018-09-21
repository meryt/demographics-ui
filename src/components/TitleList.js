import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table
} from 'reactstrap'
import { titlesFetchData } from '../actions/titles'
import { renderPersonLink, renderPersonTitles } from '../utils/persons'
import { friendlyDate } from '../utils/dates'

class TitleList extends Component {
  componentDidMount() {
      this.props.fetchData(`http://localhost:8095/api/titles?onDate=current`)
  }

    renderCurrentHolder(title) {
        if (title == null) {
            return null
        }

        if (title.extinct) {
            return <i>Extinct</i>
        }

        if (title.currentHolder == null) {
            if (title.abeyanceCheckDate != null) {
                return <i>In abeyance until at least { friendlyDate(title.abeyanceCheckDate) }</i>
            }
            return <i>No current holder</i>
        }

        return (
            <div>{ renderPersonLink(title.currentHolder) }, { renderPersonTitles(title.currentHolder) }</div>
        )
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
        <div className="inner-content">
            <h2>Titles</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Current Holder</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.titles.map((title) => (
                    <tr key={title.id}>
                        <td><Link to={`/titles/${title.id}`}>{title.name}</Link></td>
                        <td>{ this.renderCurrentHolder(title) }</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
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
