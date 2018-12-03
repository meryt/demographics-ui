import React, { Component } from 'react'
import { connect } from 'react-redux'
import { charactersFetchData } from '../actions/person'

import { renderTableOfPersons } from '../utils/persons'

class Characters extends Component {
    componentDidMount() {
        this.props.fetchData(`http://localhost:8095/api/persons/characters?onDate=current`)
    }

    render() {
        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the items</p>
        }

        if (this.props.isLoading) {
          return <p>Loading characters...</p>
        }

        if (this.props.characters == null) {
            return <p>no characters found</p>
        }

        return renderTableOfPersons(this.props.characters)
    }

}

const mapStateToProps = (state) => {
    return {
        characters: state.characters,
        hasErrored: state.charactersHasErrored,
        isLoading: state.charactersIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(charactersFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Characters)
