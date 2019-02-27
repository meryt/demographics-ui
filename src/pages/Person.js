import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { personFetchData } from '../actions/person'
import {
    Table,
    Collapse,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'

import PersonFamilies from '../components/PersonFamilies'
import PersonAncestors from '../components/PersonAncestors'
import PersonDescendants from '../components/PersonDescendants'
import PersonDescendantsTree from '../components/PersonDescendantsTree'
import PersonRelatives from '../components/PersonRelatives'
import PersonHousehold from '../components/PersonHousehold'
import PersonCapital from '../components/PersonCapital'
import PersonResidences from '../components/PersonResidences'
import PersonProperty from '../components/PersonProperty'
import PersonTimeline from '../components/PersonTimeline'

import { pageTitleFromPerson } from '../utils/pages'
import { renderPersonTitles } from '../utils/persons'
import { formatNumber } from '../utils/strings'

class Person extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

  componentDidMount() {
      this.props.fetchData(`http://localhost:8095/api/persons/${this.props.match.params.id}?onDate=current`)
  }

  componentDidUpdate(prevProps) {
      if (this.props.match.params.id !== prevProps.match.params.id) {
          this.props.fetchData(`http://localhost:8095/api/persons/${this.props.match.params.id}?onDate=current`)
      }
  }

  formatDecimal(num) {
      if (num == null) {
          return null
      }
      return num.toFixed(2)
  }

  joinArray(arr, sep) {
      if (arr == null) {
          return null
      }
      return arr.join(sep)
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry, there was an error loading the item</p>
    }

    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    if (this.props.person != null && this.props.location.pathname === `/persons/${this.props.person.id}`) {
        if (this.props.person.families != null && this.props.person.families.length > 0) {
            return <Redirect to={`/persons/${this.props.person.id}/families`} />
        }
        if (this.props.person.family != null) {
            return <Redirect to={`/persons/${this.props.person.id}/ancestors`} />
        }
    }

    return (
      <div>
        {this.props.person.firstName != null && pageTitleFromPerson(this.props.person) }

        <div className="inner-content">
            <h2>{this.props.person.firstName} {this.props.person.lastName}</h2>
            {this.props.person.titles != null && <p>{ renderPersonTitles(this.props.person) }</p> }
            <Table>
                <tbody>
                    <tr>
                        <th>Born</th>
                        <td>{moment(this.props.person.birthDate).format('MMMM Do, YYYY')}</td>
                        <th>Died</th>
                        <td>{moment(this.props.person.deathDate).format('MMMM Do, YYYY')}{ this.props.person.causeOfDeath != null && `, of ${this.props.person.causeOfDeath}` }</td>
                        <th>Aged</th>
                        <td>{this.props.person.ageAtDeath}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>{this.props.person.gender}</td>
                        <th>Age</th>
                        <td>{typeof(this.props.person.age) === 'undefined' ? <span className="deceased">deceased</span> : this.props.person.age}</td>
                        <th>Capital</th>
                        <td>{ formatNumber(this.props.person.capital) }</td>
                    </tr>
                    <tr>
                        <th>Height</th>
                        <td>{this.props.person.height}{ this.props.person.currentHeight && ` (${this.props.person.currentHeight})`}</td>
                        <th>Hair</th>
                        <td>{this.props.person.hairColor}</td>
                        <th>Eyes</th>
                        <td>{this.props.person.eyeColor}</td>
                    </tr>
                    <tr>
                        <th>Comeliness</th>
                        <td>{this.formatDecimal(this.props.person.comeliness)}</td>
                        <th>Charisma</th>
                        <td>{this.formatDecimal(this.props.person.charisma)}</td>
                        <th>Domesticity</th>
                        <td>{this.formatDecimal(this.props.person.domesticity)}</td>
                    </tr>
                    <tr>
                        <th>Intelligence</th>
                        <td>{this.formatDecimal(this.props.person.intelligence)}</td>
                        <th>Strength</th>
                        <td>{this.formatDecimal(this.props.person.strength)}</td>
                        <th>Morality</th>
                        <td>{this.formatDecimal(this.props.person.morality)}</td>
                    </tr>
                    { this.props.person.pregnancy &&
                        <tr>
                            <th>Pregnancy</th>
                            <td colSpan="5">{this.props.person.pregnancy}</td>
                        </tr>
                    }
                    <tr>
                        <th>Class</th>
                        <td colSpan="5">{this.props.person.socialClass}</td>
                    </tr>
                    <tr>
                        <th>Traits</th>
                        <td colSpan="5">{this.joinArray(this.props.person.traits, ', ')}</td>
                    </tr>
                    { this.props.person.occupation &&
                        <tr>
                            <th>Occupation</th>
                            <td colSpan="5">{ this.props.person.occupation.name }</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </div>

        <div>
            <Navbar color="light" light expand="md">
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {(this.props.person.families != null && this.props.person.families.length > 0) &&
                            <LinkContainer to={`/persons/${this.props.person.id}/families`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Families</NavItem>
                                </LinkContainer>
                        }
                        {(this.props.person.family != null) &&
                            <LinkContainer to={`/persons/${this.props.person.id}/ancestors`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Ancestors</NavItem>
                            </LinkContainer>
                        }

                        {(this.props.person.household != null) &&
                            <LinkContainer to={`/persons/${this.props.person.id}/household`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Household</NavItem>
                            </LinkContainer>
                        }

                        <LinkContainer to={`/persons/${this.props.person.id}/descendants`}>
                            <NavItem className="btn btn-light btn-sm" role="button">Descendants</NavItem>
                        </LinkContainer>

                        <LinkContainer to={`/persons/${this.props.person.id}/living-descendants`}>
                            <NavItem className="btn btn-light btn-sm" role="button">Living Descendants</NavItem>
                        </LinkContainer>

                        {(this.props.person.family != null || this.props.person.families != null) &&
                            <LinkContainer to={`/persons/${this.props.person.id}/relatives`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Relatives</NavItem>
                            </LinkContainer>
                        }

                        {(this.props.person.residences != null && this.props.person.residences.length > 0) &&
                            <LinkContainer to={`/persons/${this.props.person.id}/residences`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Residences</NavItem>
                            </LinkContainer>
                        }

                        <LinkContainer to={`/persons/${this.props.person.id}/timeline`}>
                            <NavItem className="btn btn-light btn-sm" role="button">Timeline</NavItem>
                        </LinkContainer>

                        {(this.props.person.capitalHistory != null && this.props.person.capitalHistory.length > 0) &&
                            <LinkContainer to={`/persons/${this.props.person.id}/capital`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Capital</NavItem>
                            </LinkContainer>
                        }
                        {(this.props.person.ownedProperties != null && this.props.person.ownedProperties.length > 0) &&
                            <LinkContainer to={`/persons/${this.props.person.id}/property`}>
                                <NavItem className="btn btn-light btn-sm" role="button">Property</NavItem>
                            </LinkContainer>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

        <Switch>
            <Route path="/persons/:id/families" render={ (props) => <PersonFamilies {...props} id={this.props.match.params.id} person={this.props.person} /> } />
            <Route path="/persons/:id/ancestors" render={ (props) => <PersonAncestors {...props} id={this.props.match.params.id} person={this.props.person} /> } />
            <Route path="/persons/:id/descendants" render={ (props) => <PersonDescendantsTree {...props} id={this.props.match.params.id} /> } />
            <Route path="/persons/:id/living-descendants" render={ (props) => <PersonDescendants {...props} id={this.props.match.params.id} /> } />
            <Route path="/persons/:id/household" render={ (props) => <PersonHousehold {...props} id={this.props.match.params.id} person={this.props.person} /> } />
            <Route path="/persons/:id/capital" render={ (props) => <PersonCapital {...props} id={this.props.match.params.id} person={this.props.person} /> } />
            <Route path="/persons/:id/residences" render={ (props) => <PersonResidences {...props} id={this.props.match.params.id} person={this.props.person} /> } />
            <Route path="/persons/:id/timeline" render={ (props) => <PersonTimeline {...props} id={this.props.match.params.id} person={this.props.person} /> } />
            <Route path="/persons/:id/property" render={ (props) => <PersonProperty {...props} id={this.props.match.params.id} person={this.props.person} /> } />
            <Route path="/persons/:id/relatives" render={ (props) => <PersonRelatives {...props} id={this.props.match.params.id} person={this.props.person} /> } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        person: state.person,
        hasErrored: state.personHasErrored,
        isLoading: state.personIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(personFetchData(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)
