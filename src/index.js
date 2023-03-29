const User = require('./user')
const Meeting = require('./meeting')
const axios = require('axios')

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

//fetch users with axios
axios.get('http://localhost:3000/users').then(response => {
  console.log(response.data)
})

//create a user with axios
async function main() {
  const john = await axios.post('http://localhost:3000/users', {
    name: 'John',
  })
  const sophia = await axios.post('http://localhost:3000/users', {
    name: 'Sophia',
  })

  const allUsers = await axios.get('http://localhost:3000/users')

  console.log('List of all users', allUsers.data)
}

main()

// const sophia = new User('Sophia')
// const john = new User('John')
// const mary = new User('Mary')

// const sophiasMeeting = sophia.createMeeting("Sophia's Meeting", 'New York', '2023-01-01')
// const johnsMeeting = john.createMeeting("John's Meeting", 'Barcelona', '2023-01-01')

// //john.joinMeeting(sophiasMeeting)
// sophia.joinMeeting(johnsMeeting)

// //const sophiasMeeting = new Event(sophia, "Sophia's Event", 'New York', '2023-01-01')
// // const johnsMeeting = new Event(john, "John's Event", 'Barcelona', '2023-01-01')

// // Test
// console.log(`sophia has a name of ${sophia.name} and has ${sophia.meetings.length} events.`)
// console.log(
//   `sophiasMeeting has a name of ${sophiasMeeting.name} and takes place in
//   ${sophiasMeeting.location} on ${sophiasMeeting.date}, and it has ${sophiasMeeting.attendees.length}
//   attendees: ${sophiasMeeting.attendees.map(attendee => attendee.name).join(', ')}.`
// )

// console.log(`John has joined Sophia's Meeting at ${john.meetings[0].location}`)
// console.log(`Sophia's event has Sophia as the first attendee: ${sophiasMeeting.attendees[0] === sophia}`)
// console.log(sophia)
// console.log(john)
// console.log(`Sophia has two meetings : ${sophia.meetings.length === 2}`)

// sophia.changeMeetingName(sophiasMeeting, 'Halloween Party')
// console.log(`Sophia changed the Meeting's name to ${sophiasMeeting.getName()}`)
