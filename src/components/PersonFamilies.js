import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import moment from 'moment'

const NUM_CHILD_COLS = 4

class PersonFamilies extends Component {

    formatAge(age) {
        if (age == null) {
            return null
        }

        return age.split(',')[0]
    }

    formatDate(date) {
        if (date == null) {
            return null
        }
        return moment(date).format('MMMM Do, YYYY')
    }

    marriageDateOrSpouse(family, pos) {
        if (family == null || family.weddingDate == null) {
            return ' '
        }

        let age = this.props.person.gender === 'MALE'
            ? this.formatAge(family.husbandAgeAtMarriage)
            : this.formatAge(family.wifeAgeAtMarriage)
        let spouseAge = this.props.person.gender === 'FEMALE'
            ? this.formatAge(family.husbandAgeAtMarriage) :
            this.formatAge(family.wifeAgeAtMarriage)

        let isMale = this.props.person.gender === 'MALE'

        if ((pos === 'left' && isMale) || (pos === 'right' && !isMale)) {
            return <p>Married {this.formatDate(family.weddingDate)}, aged {age}</p>
        } else {
            return (
                <div>
                    <h5><Link to={`/persons/${family.spouse.id}/families`}>{family.spouse.firstName} {family.spouse.lastName}</Link></h5>
                    <p>Born: {this.formatDate(family.spouse.birthDate)}</p>
                    <p>Married: aged {spouseAge}</p>
                    <p>Died: {this.formatDate(family.spouse.deathDate)}, aged {this.formatAge(family.spouse.ageAtDeath)}</p>
                </div>
            )
        }
    }

    chunkList(array, chunk_size) {
        if (array == null || array.length === 0) {
            return []
        }

        var initialLength = array.length
        var outer = []
        for (var i = 0; i < Math.ceil(initialLength / chunk_size); i++) {
            var inner = []
            for (var j = 0; j < chunk_size; j++) {
                if (array.length === 0) {
                    inner.push(null)
                } else {
                    inner.push(array.shift())
                }
            }
            outer.push(inner)
        }
        return outer
    }

    renderChildren(children) {
        if (children == null || children.length === 0) {
            return null
        }

        let numCols = children.length >= NUM_CHILD_COLS ? NUM_CHILD_COLS : children.length
        let listOfLists = this.chunkList(children, numCols)

        var i = 0
        var j = 0
        return (
            <Table>
                <tbody>
                    {listOfLists.map((rowOfChildren) => (
                        <tr key={`child-row-${i++}`}>
                            {rowOfChildren.map((child) => this.renderChild(child, j++))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    renderChild(child, index) {
        if (child == null) {
            return <td key={`null-child-${index}`}></td>
        }

        return <td key={`child-${child.id}`}>
            <h5><Link to={`/persons/${child.id}/families`}>{child.firstName} {child.lastName}</Link></h5>

            <p>Born: {this.formatDate(child.birthDate)}</p>
            <p>Died: {this.formatDate(child.deathDate)}, aged {this.formatAge(child.ageAtDeath)}</p>
        </td>
    }

    render() {
        if (this.props.hasErrored) {
          return <p>Sorry, there was an error loading the item</p>
        }

        if (this.props.isLoading) {
          return <p>Loading...</p>
        }

        if (this.props.person.families == null || this.props.person.families.length === 0) {
            return <Redirect to={`/persons/${this.props.id}`} />
        }

        return (
            <div className="personFamilies">
                {this.props.person.families.map((family) => (
                  <div key={`family-${family.id}`}>
                    <h4>Family {family.id}</h4>
                    <Table>
                        <tbody>
                            <tr>
                                <td>{this.marriageDateOrSpouse(family, 'left')}</td>
                                <td>{this.marriageDateOrSpouse(family, 'right')}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {this.renderChildren(family.children)}
                  </div>
                ))}
            </div>
        )
    }
}

export default PersonFamilies;
