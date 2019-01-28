import React, { Component } from 'react'

import { connect } from 'react-redux'
import {
    Card,
    CardHeader,
    CardBody
} from 'reactstrap'

import { townSelectDwelling } from '../actions/towns'

import HouseInfo from '../components/HouseInfo'
import Map1 from './Map1'
import Map2 from './Map2'
import Map3 from './Map3'
import Map4 from './Map4'
import Map5 from './Map5'
import Map6 from './Map6'
import Map7 from './Map7'
import Map8 from './Map8'
import Map9 from './Map9'
import Map10 from './Map10'
import { renderPlaceLink } from '../utils/places'

class Map extends Component {

    constructor(props) {
        super(props)
        this.clickBuilding = this.clickBuilding.bind(this)
        this.classForPolygon = this.classForPolygon.bind(this)
    }

    clickBuilding(e) {
        let id = e.target.id
        let dwelling = this.findDwellingByPolygonId(id)
        if (dwelling != null) {
            id = 'dwelling-' + dwelling.id
        }
        this.props.selectDwelling(id)
    }

    findDwellingByPolygonId(polygonId) {
        if (this.props.town === null || this.props.town.places == null || this.props.town.places.length === 0) {
            return null
        }
        return this.props.town.places.find(d => d.mapId === polygonId)
    }

    classForPolygon(polygonId) {

        if (this.props.town === null || this.props.town.places == null || this.props.town.places.length === 0) {
            return 'unassigned'
        }
        let dwelling = this.props.town.places.find(d => d.mapId === polygonId)
        if (dwelling != null) {
            if ('dwelling-' + dwelling.id === this.props.selectedDwelling) {
                return 'selected'
            }
            if (dwelling.ruinedDate != null && dwelling.ruinedDate < this.props.currentDate) {
                return 'ruined'
            } else {
                if (dwelling.totalPopulation == null) {
                    return 'empty'
                } else {
                    return 'assigned'
                }
            }
        } else {
            return 'unassigned'
        }
    }

    render() {

        if (this.props.town === null) {
            return null
        }

        return (
            <div id="map-container">
                { this.props.town.mapId === 'Map1' && <Map1 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map2' && <Map2 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map3' && <Map3 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map4' && <Map4 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map5' && <Map5 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map6' && <Map6 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map7' && <Map7 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map8' && <Map8 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map9' && <Map9 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }
                { this.props.town.mapId === 'Map10' && <Map10 clickBuilding={ this.clickBuilding } classForPolygon={ this.classForPolygon } /> }

                <div id="map-info">{ this.renderDwellingInfoFromId(this.props.selectedDwelling) }</div>
            </div>
        )
    }

    dwellingFromDwellingId(dwellingId) {
        if (this.props.town == null || this.props.town.places == null) {
            return null
        }
        let id = dwellingId.replace('dwelling-', '')
        return this.props.town.places.find(p => p.id === Number(id))
    }

    renderDwellingInfoFromId(dwellingId) {

        let body, dwelling;
        if (dwellingId == null) {
            body = <div>&nbsp;</div>
        } else {
            if (!dwellingId.startsWith('dwelling-')) {
                body = dwellingId
            } else {
                dwelling = this.dwellingFromDwellingId(dwellingId)
                if (dwelling == null) {
                    body = dwellingId
                } else {
                    body = this.renderDwellingInfo(dwelling)
                }
            }

        }

        return (
            <div>
                { body }
            </div>
        )
    }

    renderDwellingInfo(dwelling) {
        return (
            <Card>
                <CardHeader><h6>{ renderPlaceLink(dwelling) }</h6></CardHeader>
                <CardBody>
                    <HouseInfo dwelling={ dwelling } />
                </CardBody>
            </Card>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentDate: state.currentDate,
        selectedDwelling: state.townSelectedDwelling
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectDwelling: (id) => dispatch(townSelectDwelling(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
