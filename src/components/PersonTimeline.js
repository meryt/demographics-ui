import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'

import '../css/timeline.scss'

import { getYear, subtractOneDay } from '../utils/dates'
import { formatPlaceName } from '../utils/places'
import { titleCase } from '../utils/strings'
import { createTimelineEntry, formatNameAndDatesForPerson } from '../utils/timelines'

class PersonTimeline extends Component {

    render() {
        if (this.props.person == null || this.props.person.birthDate == null) {
            return null
        }

        const person = this.props.person

        const options = {
          width: '100%',
          start: person.birthDate,
          end: person.deathDate,
          margin: {
              item: {
                  horizontal: 0
              }
          }
        }

        const LIFE_ID = `person_${person.id}-lifespan`
        const TITLES_ID = `person_${person.id}-titles`
        const RESIDENCES_ID = `person_${person.id}-residences`

        let order = 0

        let groups = [
          {
            id: LIFE_ID,
            content: 'Life',
            order: order++
          }
        ];

        let items = [ ];
        items.push(this.createPersonLifespanItem(person, LIFE_ID))

        if (person.family != null) {
            let groupId = `family_${person.family.id}`

          groups.push({id: groupId, content: 'Parents', order: order++})

          if (person.family.father != null) {
            items.unshift(this.createPersonLifespanItem(person.family.father, groupId, 'MALE'))
          }
          if (person.family.mother != null) {
            items.unshift(this.createPersonLifespanItem(person.family.mother, groupId, 'FEMALE'))
          }
        }

        if (person.families != null && person.families.length > 0) {
          for (var i = 0; i < person.families.length; i++) {
            var family = person.families[i];
            let groupId = `family_${family.id}`
            groups.push({id: groupId, content: 'Family', order: order++})

            if (family.spouse != null) {
              var spouseGender = person.gender === 'MALE' ? 'FEMALE' : 'MALE'
              items.unshift(this.createPersonLifespanItem(family.spouse, groupId, spouseGender))
            }

            var marriageSpan = this.createMarriageItem(family, person, groupId)
            if (marriageSpan != null) {
              items.unshift(marriageSpan)
            }

            if (family.children != null && family.children.length > 0) {
              for (var j = 0; j < family.children.length; j++) {
                items.unshift(this.createPersonLifespanItem(family.children[j], groupId))
              }
            }
          }
        }

        if (person.titles != null && person.titles.length > 0) {
          groups.push({id: TITLES_ID, content: 'Titles', order: order++})
          for (var k = 0; k < person.titles.length; k++) {
            items.unshift(this.createTitleSpan(person.titles[k], TITLES_ID))
          }
        }

        if (person.residences != null && person.residences.length > 0) {
          groups.push({id: RESIDENCES_ID, content: 'Residences', order: order++})

          for (var l = 0; l < person.residences.length; l++) {
            items.unshift(this.createResidenceSpan(person.residences[l], RESIDENCES_ID))
          }
        }

        if (person.timeline != null && person.timeline.length > 0) {
            for (var m = 0; m < person.timeline.length; m++) {
                var entry = person.timeline[m]
                var groupId = `timeline-group-${entry.category}`
                if (!groups.find(function(element) { return element.id === groupId})) {
                    groups.push({id: groupId, content: titleCase(entry.category), order: order++})
                }
                items.unshift(createTimelineEntry(entry, groupId))
            }
        }

        return (
            <div className="inner-content personTimeline timeline-component">
                <h3>Timeline</h3>
                <Timeline options={options} items={items} groups={groups} />
            </div>
        )
    }

    createPersonLifespanItem(person, groupId, gender) {
      var gen = person.gender == null ? gender : person.gender
      var obj = {
          start: person.birthDate,
          end: person.deathDate,
          content: formatNameAndDatesForPerson(person),
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
          end: subtractOneDay(residence.toDate),
          content: `<a href="/places/houses/${residence.location.id}">${formatPlaceName(residence.location)}</a>, ${residence.location.location} (${getYear(residence.fromDate)} - ${getYear(residence.toDate)})`,
          group: groupId,
          className: 'timeline-residence'
      }
      obj.title = obj.content
      return obj
    }

    createMarriageItem(family, person, groupId) {
      if (family == null || family.weddingDate == null || family.spouse == null) {
        return null
      }
      var lowestDeathDate = (family.spouse.deathDate < person.deathDate) ? family.spouse.deathDate : person.deathDate
      var obj = {
        start: family.weddingDate,
        end: lowestDeathDate,
        content: `Married ${getYear(family.weddingDate)} - ${getYear(lowestDeathDate)}`,
        group: groupId
      }
      obj.title = obj.content
      return obj
    }
}

export default PersonTimeline;
