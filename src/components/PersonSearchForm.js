import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personsFetchData } from '../actions/person'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

import PersonPageTable from './PersonPageTable'

class PersonSearchForm extends Component {

    constructor(props) {
        super(props)

        this.clickSearch = this.clickSearch.bind(this)
    }

    clickSearch(e) {
        this.props.fetchData(`http://localhost:8095/api/persons?aliveOnDate=${this.props.currentDate}`)
        return false
    }

    render() {
        return (
            <div className="inner-content">
                <h2>Person Search</h2>
                <Form>
                    <FormGroup tag="fieldset">
                        <Label>Gender</Label>
                        <FormGroup check inline>
                            <Label check><Input type="radio" name="gender" value="MALE" required />Male</Label>
                            <Label check><Input type="radio" name="gender" value="FEMALE" required />Female</Label>
                            <Label check><Input type="radio" name="gender" value="" required defaultChecked />Any</Label>
                        </FormGroup>
                    </FormGroup>
                    <Button color="primary" onClick={this.clickSearch}>Search</Button>
                </Form>

                { this.props.persons != null && <PersonPageTable page={this.props.persons} /> }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons,
        hasErrored: state.personsHasErrored,
        isLoading: state.personsIsLoading,
        currentDate: state.currentDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(personsFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonSearchForm)
