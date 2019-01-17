import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Table
} from 'reactstrap'

import { townSelectDwelling } from '../actions/towns'

import { getYear } from '../utils/dates'
import { renderPlaceOwner, renderPlaceLink } from '../utils/places'
import { formatNumber } from '../utils/strings'

class PlaceChildPlaces extends Component {

    constructor(props) {
        super(props)

        this.clickRow = this.clickRow.bind(this)
    }

    render() {
        if (this.props.childPlaceType == null || this.props.place == null || this.props.place.places == null) {
            return null
        }

        let placeType = this.props.childPlaceType

        let type = placeType.toLowerCase()

        let place = this.props.place

        if (placeType === 'DWELLING' || placeType === 'FARM') {
            return this.renderTableOfDwellings(place.places.filter(p => p.type === placeType), this.props.selectedPlaceId)
        }

        if (placeType === 'ESTATE') {
            return this.renderTableOfDwellings(place.places.filter(p => p.type === placeType), this.props.selectedPlaceId, true)
        }

        return (
            <Table className="inner-content">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Population</th>
                    </tr>
                </thead>
                <tbody>
            { place.places.filter(p => p.type === placeType).map((p) => (
                <tr key={`${type}-${p.id}`}>
                    <td>{ renderPlaceLink(p) }</td>
                    <td>{ p.totalPopulation }</td>
                </tr>
            ))}
                </tbody>
            </Table>
        )
    }


    renderTableOfDwellings(dwellings, selectedPlaceId = null, showAcres = false) {

        if (dwellings == null) {
            return null
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        { showAcres && <th>Acres</th> }
                        <th>Built</th>
                        <th>Owner</th>
                        <th>Residents</th>
                    </tr>
                </thead>
                <tbody>
                {
                    dwellings.map(p => this.renderPlaceRow(p, selectedPlaceId, showAcres))
                }
                </tbody>
            </Table>
        )
    }

    renderPlaceRow(place, selectedPlaceId = null, showAcres = false) {
        if (place == null) {
            return null
        }

        return (
            <tr key={`child-place-${place.id}`} id={ `row-${place.type.toLowerCase()}-${place.id}` }
                    className={ (place.id === Number(selectedPlaceId)) ? 'table-active' : '' } onClick={ this.clickRow }>
                <td>{ renderPlaceLink(place) }{ place.mapId === null && ' (unassigned)' }</td>
                <td>{ formatNumber(place.value) }</td>
                { showAcres && <td>{ formatNumber(Math.round(place.acres)) }</td> }
                <td>{ getYear(place.foundedDate) }</td>
                <td>{ renderPlaceOwner(place) }</td>
                <td>{ place.totalPopulation }</td>
            </tr>
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
            this.props.selectDwelling(row.id.replace('row-', ''))
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceChildPlaces)
