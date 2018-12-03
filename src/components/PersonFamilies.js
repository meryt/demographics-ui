import React, { Component } from 'react'
import {
    Table
} from 'reactstrap'
import { Link, Redirect } from 'react-router-dom'
import { friendlyAge, friendlyDate } from '../utils/dates'
import { renderPersonTitles } from '../utils/persons'

const NUM_CHILD_COLS = 4

class PersonFamilies extends Component {

    marriageDateOrSpouse(family, pos) {
        if (family == null || family.id == null) {
            return ' '
        }

        let age = this.props.person.gender === 'MALE'
            ? friendlyAge(family.husbandAgeAtMarriage)
            : friendlyAge(family.wifeAgeAtMarriage)
        let spouseAge = this.props.person.gender === 'FEMALE'
            ? friendlyAge(family.husbandAgeAtMarriage) :
            friendlyAge(family.wifeAgeAtMarriage)

        let isMale = this.props.person.gender === 'MALE'

        if ((pos === 'left' && isMale) || (pos === 'right' && !isMale)) {
            if (family.weddingDate == null) {
                return <p>Never married</p>
            } else {
                return <p>Married {friendlyDate(family.weddingDate)}, aged {age}</p>
            }
        } else {
            return (
                <div>
                    <h5><Link to={`/persons/${family.spouse.id}/families`}>{family.spouse.firstName} {family.spouse.lastName}</Link></h5>
                    { family.spouse.titles && <p>{ renderPersonTitles(family.spouse) }</p> }
                    <p>Born: {friendlyDate(family.spouse.birthDate)}</p>
                    <p>Age: { family.spouse.age == null ? <i>Deceased</i> : friendlyAge(family.spouse.age) }</p>
                    { (family.weddingDate != null) && <p>Married: aged {spouseAge}</p> }
                    <p>Died: {friendlyDate(family.spouse.deathDate)}, aged {friendlyAge(family.spouse.ageAtDeath)}</p>
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
                    inner.push(array[(i * chunk_size) + j])
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
            { child.titles && <p>{ renderPersonTitles(child) }</p> }
            <p>Born: {friendlyDate(child.birthDate)}</p>
            <p>Age: { child.age == null ? <i>Deceased</i> : friendlyAge(child.age) }</p>
            <p>Died: {friendlyDate(child.deathDate)}, aged {friendlyAge(child.ageAtDeath)}</p>
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
            <div className="inner-content personFamilies">
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
