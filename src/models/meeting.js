const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const meetingSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  date: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: { maxDepth: 1 },
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],
})

meetingSchema.plugin(autopopulate)

class Meeting {
  getAttendees() {
    return this.attendees
  }
  getCreatedBy() {
    return this.createdBy
  }
  getName() {
    return this.name
  }
  getDescription() {
    return this.description
  }
  getLocation() {
    return this.location
  }
  getDate() {
    return this.date
  }
  setName(name) {
    this.name = name
  }
  setDescription(description) {
    this.description = description
  }
  setLocation(location) {
    this.location = location
  }
  setDate(date) {
    this.date = date
  }

  addAttendee(user) {
    this.attendees.push(user)
  }
  removeAttendee(user) {
    this.attendees = this.attendees.filter(attendee => attendee !== user)
  }
  expiredMeeting(date) {
    if (this.date > Date()) {
      this.attendees.forEach(attendee => {
        attendee.leaveMeeting(this)
      })
      return true
    }
    return false
  }
}

meetingSchema.loadClass(Meeting)

module.exports = mongoose.model('Meeting', meetingSchema)
