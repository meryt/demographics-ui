import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
    Table
} from 'reactstrap'
import { friendlyDate } from '../utils/dates'

class PersonAncestors extends Component {
    renderPerson(person) {
        if (person == null) {
            return null
        }

        let linkLocation = (person.father != null || person.mother != null) ? `/persons/${person.id}/ancestors` : `/persons/${person.id}`

        return (
            <div>
                <h6><Link to={linkLocation}>{person.firstName} {person.lastName}</Link></h6>
                { person.titles != null && <p>{ this.renderTitles(person.titles) }</p> }
                <p>Born: {friendlyDate(person.birthDate)}</p>
                <p>Died: {friendlyDate(person.deathDate)}</p>
            </div>
        )
    }

    renderTitles(titles) {
        return titles.map((title) => (
            title.name
        )).join(', ')
    }

    render() {
        var person = this.props.person;
        var family = person.family;

        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading) {
          return <p>Loading...</p>
        }

        if (this.props.person.id == null) {
            // Can happen if the person has no ancestors
            return <Redirect to={`/persons/${this.props.id}`} />
        }

        return (
            <div className="personAncestors">
                <Table>
                    <thead>
                        <tr>
                            <th>Parents</th>
                            <th>Grandparents</th>
                            <th>Great-grandparnts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan="4">{this.renderPerson(family.father)}</td>
                            <td rowSpan="2">{family.father != null && this.renderPerson(family.father.father)}</td>
                            <td>{family.father != null && family.father.father != null && this.renderPerson(family.father.father.father)}</td>
                        </tr>
                        <tr>
                            <td>{family.father != null && family.father.father != null && this.renderPerson(family.father.father.mother)}</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">{family.father != null && this.renderPerson(family.father.mother)}</td>
                            <td>{family.father != null && family.father.mother != null && this.renderPerson(family.father.mother.father)}</td>
                        </tr>
                        <tr>
                            <td>{family.father != null && family.father.mother != null && this.renderPerson(family.father.mother.mother)}</td>
                        </tr>

                        <tr>
                            <td rowSpan="4">{this.renderPerson(family.mother)}</td>
                            <td rowSpan="2">{family.mother != null && this.renderPerson(family.mother.father)}</td>
                            <td>{family.mother != null && family.mother.father != null && this.renderPerson(family.mother.father.father)}</td>
                        </tr>
                        <tr>
                            <td>{family.mother != null && family.mother.father != null && this.renderPerson(family.mother.father.mother)}</td>
                        </tr>
                        <tr>
                            <td rowSpan="2">{family.mother != null && this.renderPerson(family.mother.mother)}</td>
                            <td>{family.mother != null && family.mother.mother != null && this.renderPerson(family.mother.mother.father)}</td>
                        </tr>
                        <tr>
                            <td>{family.mother != null && family.mother.mother != null && this.renderPerson(family.mother.mother.mother)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default PersonAncestors
