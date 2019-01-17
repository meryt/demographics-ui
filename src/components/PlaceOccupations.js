import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Table
} from 'reactstrap'

import { townSelectDwelling } from '../actions/towns'

import { friendlyAge } from '../utils/dates'
import { renderPersonLink } from '../utils/persons'
import { renderPlaceLink } from '../utils/places'

class PlaceOccupations extends Component {

    constructor(props) {
        super(props)

        this.clickRow = this.clickRow.bind(this)
    }

    renderPersonRow(person) {
        return (
            <tr key={ `occ-person-${person.id}` } id={ `row-person-${person.id}-dwelling-${person.dwelling.id}`}
                className={ (person.dwelling.id === Number(this.props.selectedPlaceId)) ? 'table-active' : '' } onClick={ this.clickRow }>
                <td>{ renderPersonLink(person) }</td>
                <td>{ friendlyAge(person.age) }</td>
                <td>{ renderPlaceLink(person.dwelling) }</td>
            </tr>
        )
    }

    renderOccupationRows(name, people) {
        if (name == null || people == null || people.length === 0) {
            return null
        }

        return (
            <tbody key={ `occupation-${name}` }>
                <tr>
                    <th colSpan="3">{ name }</th>
                </tr>
                { people.map((person) => this.renderPersonRow(person)) }
            </tbody>
        )
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading || this.props.place == null || this.props.place.occupations == null) {
            return <p>Loading...</p>
        }

        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th colSpan="3">Name</th>
                        </tr>
                    </thead>
                        { Object.entries(this.props.place.occupations).map((entry) => this.renderOccupationRows(entry[0], entry[1])) }
                </Table>
            </div>
        )
    }

    clickRow(e) {
        if (this.props.updateStateOnClick) {
            if (e.target.tagName === 'A') {
                return
            }
            var row = e.target
            if (row.tagName === 'TD') {
                row = e.target.parentNode
            }
            let dwellingId = row.id.replace(/.*-(\d+)$/, "dwelling-$1")
            console.log('attempting to select dwelling ' + dwellingId)
            this.props.selectDwelling(dwellingId)
        }
    }
}

const mapStateToProps = (state) => {

    let elementId = state.townSelectedDwelling
    let selectedPlaceId = null
    if (elementId != null) {
        if (!elementId.startsWith('polygon-')) {
            const regex = /.*-(\d+)$/
            let match = regex.exec(elementId)
            if (match != null && match.length >= 2) {
                selectedPlaceId = match[1]
            }
        }
    }

    return {
        selectedPlaceId: selectedPlaceId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectDwelling: (id) => dispatch(townSelectDwelling(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOccupations)
