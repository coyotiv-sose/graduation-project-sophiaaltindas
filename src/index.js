console.log("LET'SGO is a social network for people who love to travel and attend events.")

// Users and Events are main objects. Users can create events and join events.
// Users can comment on events and other users' comments.
// Users can also like events and other users' comments.
// Users can see a list of events they are attending and a list of events they are hosting.

// I need to be able to create a new user, create a new event, and join an event.
// I need to be able to get a list of all events, and get a list of all users.
// I need to be able to get a list of all events a user is attending, and get a list of all events a user is hosting.
// I need to be able to get a list of all users attending an event, and get a list of all users hosting an event.
// I need to be able to get a list of all comments on an event, and get a list of all comments on a user.
// I need to be able to get a list of all comments a user has made.
// I need to be able to get a list of all events a user has commented on.
// I need to be able to get a list of all users who have commented on an event.
// I need to be able to let the creator of an event delete it.
// I need to be able to let the creator of a comment delete it.
// I need to be able to let the user leave an event.

class User {
  events = []
  userId = new Date().getTime()

  constructor(name) {
    this.name = name
  }

  createEvent(name, location, date) {
    const event = new Event(name, location, date)

    this.joinEvent(event)

    return event
  }

  joinEvent(event) {
    this.events.push(event)
    event.attendees.push(this)
  }

  leaveEvent(event) {
    this.events = this.events.filter(e => e !== event)
    event.attendees = event.attendees.filter(attendee => attendee !== this)
  }

  deleteEvent(event) {
    if (this.userId === event.createdBy) {
      this.events = this.events.filter(e => e !== event)
    }
  }
}

class Event {
  comments = []
  attendees = []

  constructor(name, location, date, createdBy) {
    this.name = name
    this.location = location
    this.date = date
    this.createdBy = createdBy

    // this.attendees = [creator]
    // creator.events.push(this)
  }
}

const sophia = new User('Sophia')
const john = new User('John')

const sophiasEvent = sophia.createEvent("Sophia's Event", 'New York', '2023-01-01')
const johnsEvent = john.createEvent("John's Event", 'Barcelona', '2023-01-01')

john.joinEvent(sophiasEvent)
sophia.joinEvent(johnsEvent)

// const sophiasEvent = new Event(sophia, "Sophia's Event", 'New York', '2023-01-01')
// const johnsEvent = new Event(john, "John's Event", 'Barcelona', '2023-01-01')

// Test
console.log(`sophia has a name of ${sophia.name} and has ${sophia.events.length} events.`)
console.log(
  `sophiasEvent has a name of ${sophiasEvent.name} and takes place in
  ${sophiasEvent.location} on ${sophiasEvent.date}, and it has ${sophiasEvent.attendees.length}
  attendees: ${sophiasEvent.attendees.map(attendee => attendee.name).join(', ')}.`
)

console.log(`John has joined Sophia's Event at ${john.events[0].location}`)
console.log(`Sophia's event has Sophia as the first attendee: ${sophiasEvent.attendees[0] === sophia}`)
console.log(sophia)
console.log(john)
console.log(`Sophia has two events : ${sophia.events.length === 2}`)
