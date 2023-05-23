// const User = require('./models/user')
// const Meeting = require('./models/meeting')
const axios = require('axios')
const User = require('./models/user')
const Meeting = require('./models/meeting')

axios.defaults.baseURL = 'http://localhost:3000'

// require('dotenv').config()
// require('./database-connection')

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
// axios.get('http://localhost:3000/users').then(response => {
//   console.log(response.data)
// })

//create a user with axios
async function main() {
  // await Meeting.deleteMany()
  // await User.deleteMany()

  const sophia = await axios.post('/users', {
    name: 'Sophia',
    email: 'sophia456abc@gmail.com',
    password: '654321',
  })

  const john = await axios.post('/users', {
    name: 'John',
    email: 'john345abc@gmail.com',
    password: '65jk21',
  })

  const mary = await axios.post('/users', {
    name: 'Mary',
    email: 'mary567abc@gmail.com',
    password: '65jk21',
  })

  //   await axios.post('/users', {
  //     name: 'Bob',
  //   })

  const sophiasmeeting = await axios.post('/meetings', {
    user: sophia.data._id,
    limit: 2,
    name: "Sophia's Meeting",
    location: 'New York',
    date: '2023-01-01',
    description: 'This is a meeting for Sophia',
  })

  const johnsmeeting = await axios.post('/meetings', {
    user: john.data._id,
    name: "John's Meeting",
    location: 'Barcelona',
    date: '2023-01-01',
    description: 'This is a meeting for John',
  })

  await axios.post(`/meetings/${sophiasmeeting.data._id}/attendees`, {
    user: john.data._id,
  })

  await axios.post(`/meetings/${sophiasmeeting.data._id}/attendees`, {
    user: mary.data._id,
  })

  await axios.post(`/meetings/${johnsmeeting.data._id}/attendees`, {
    user: sophia.data._id,
  })

  //const allUsers = await axios.get('/users')
  //console.log('List of all users', allUsers.data)

  // const allMeetings = await axios.get('/meetings')
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
