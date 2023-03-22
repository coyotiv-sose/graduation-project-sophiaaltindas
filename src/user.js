const Meeting = require('./meeting')

class User {
  meetings = []

  constructor(name) {
    this.name = name
  }

  createMeeting(name, location, date) {
    const meeting = new Meeting(name, location, date, this)

    this.joinMeeting(meeting)

    return meeting
  }

  joinMeeting(meeting) {
    this.meetings.push(meeting)
    meeting.attendees.push(this)
  }

  leaveMeeting(meeting) {
    this.meetings = this.meetings.filter(e => e !== meeting)
    meeting.attendees = meeting.attendees.filter(attendee => attendee !== this)
  }

  deleteMeeting(meeting) {
    if (this === meeting.createdBy) {
      this.meetings = this.meetings.filter(e => e !== meeting)
    }
  }
}

module.exports = User
