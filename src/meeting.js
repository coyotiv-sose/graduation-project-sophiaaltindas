class Meeting {
  //  comments = []
  attendees = []
  // photo = []

  constructor(name, description, location, date, createdBy) {
    this.name = name
    this.description = description
    this.location = location
    this.date = date
    this.createdBy = createdBy

    // this.attendees = [creator]
    // creator.meetings.push(this)
  }
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

module.exports = Meeting
