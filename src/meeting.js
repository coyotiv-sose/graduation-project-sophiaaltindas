class Meeting {
  //  comments = []
  attendees = []

  constructor(name, location, date, createdBy) {
    this.name = name
    this.location = location
    this.date = date
    this.createdBy = createdBy

    // this.attendees = [creator]
    // creator.meetings.push(this)
  }
}

module.exports = Meeting
