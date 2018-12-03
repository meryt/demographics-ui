import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'

import { getYear } from '../utils/dates'
import { renderPersonLink } from '../utils/persons'
import { formatPlaceName } from '../utils/places'

class PersonTimeline extends Component {

    render() {
        if (this.props.person == null || this.props.person.birthDate == null) {
            return null
        }

        const person = this.props.person

        const options = {
          width: '100%',
          start: person.birthDate,
          end: person.deathDate
        }

        const LIFE_ID = 0
        const TITLES_ID = -1
        const RESIDENCES_ID = -2

        let groups = [
          {
            id: LIFE_ID,
            content: 'Life'
          }
        ];

        let items = [ ];
        items.push(this.createPersonLifespanItem(person, LIFE_ID))

        if (person.titles != null && person.titles.length > 0) {
          groups.push({id: TITLES_ID, content: 'Titles'})
          for (var k = 0; k < person.titles.length; k++) {
            items.unshift(this.createTitleSpan(person.titles[k], TITLES_ID))
          }
        }

        if (person.residences != null && person.residences.length > 0) {
          groups.push({id: RESIDENCES_ID, content: 'Residences'})

          for (var l = 0; l < person.residences.length; l++) {
            items.unshift(this.createResidenceSpan(person.residences[l], RESIDENCES_ID))
          }
        }

        if (person.family != null) {
          groups.push({id: person.family.id, content: 'Parents'})

          if (person.family.father != null) {
            items.unshift(this.createPersonLifespanItem(person.family.father, person.family.id, 'MALE'))
          }
          if (person.family.mother != null) {
            items.unshift(this.createPersonLifespanItem(person.family.mother, person.family.id, 'FEMALE'))
          }
        }

        if (person.families != null && person.families.length > 0) {
          for (var i = 0; i < person.families.length; i++) {
            var family = person.families[i];
            groups.push({id: family.id, content: 'Family'})

            if (family.spouse != null) {
              var spouseGender = person.gender === 'MALE' ? 'FEMALE' : 'MALE'
              items.unshift(this.createPersonLifespanItem(family.spouse, family.id, spouseGender))
            }

            var marriageSpan = this.createMarriageItem(family, person)
            if (marriageSpan != null) {
              items.unshift(marriageSpan)
            }

            if (family.children != null && family.children.length > 0) {
              for (var j = 0; j < family.children.length; j++) {
                items.unshift(this.createPersonLifespanItem(family.children[j], family.id))
              }
            }
          }
        }

        return (
            <div className="inner-content personTimeline">
                <h3>Timeline</h3>
                <Timeline options={options} items={items} groups={groups} />
            </div>
        )
    }

    formatNameAndDates(person) {
      return `${person.firstName} ${person.lastName} (${getYear(person.birthDate)} - ${getYear(person.deathDate)})`
    }

    createPersonLifespanItem(person, groupId, gender) {
      var gen = person.gender == null ? gender : person.gender
      var obj = {
          start: person.birthDate,
          end: person.deathDate,
          content: this.formatNameAndDates(person),
          group: groupId,
          className: `timeline-person-${gen}`
      }
      obj.title = obj.content
      return obj
    }

    createTitleSpan(title, groupId) {
      var obj = {
          start: title.fromDate,
          end: title.toDate,
          content: `${title.title.name} (${getYear(title.fromDate)} - ${getYear(title.toDate)})`,
          group: groupId,
          className: 'timeline-title'
      }
      obj.title = obj.content
      return obj
    }

    createResidenceSpan(residence, groupId) {
      var obj = {
          start: residence.fromDate,
          end: residence.toDate,
          content: `${formatPlaceName(residence.location)}, ${residence.location.location} (${getYear(residence.fromDate)} - ${getYear(residence.toDate)})`,
          group: groupId,
          className: 'timeline-residence'
      }
      obj.title = obj.content
      return obj
    }

    createMarriageItem(family, person) {
      if (family == null || family.weddingDate == null || family.spouse == null) {
        return null
      }
      var lowestDeathDate = (family.spouse.deathDate < person.deathDate) ? family.spouse.deathDate : person.deathDate
      var obj = {
        start: family.weddingDate,
        end: lowestDeathDate,
        content: `Married ${getYear(family.weddingDate)} - ${getYear(lowestDeathDate)}`,
        group: family.id
      }
      obj.title = obj.content
      return obj
    }
}

export default PersonTimeline;
