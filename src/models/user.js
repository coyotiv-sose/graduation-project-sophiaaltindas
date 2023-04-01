const Meeting = require('./meeting')

class User {
  meetings = []
  profilePictureUrl = null

  constructor(name) {
    this.name = name
  }

  createMeeting(name, location, date) {
    const meeting = Meeting.create({ name, location, date, createdBy: this })

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

  changeMeetingName(meeting, newName) {
    if (this === meeting.createdBy) {
      meeting.setName(newName)
    }
  }

  changeMeetingLocation(meeting, newLocation) {
    if (this === meeting.createdBy) {
      meeting.setLocation(newLocation)
    }
  }

  changeMeetingDate(meeting, newDate) {
    if (this === meeting.createdBy) {
      meeting.setDate(newDate)
    }
  }

  changeMeetingDescription(meeting, newDescription) {
    if (this === meeting.createdBy) {
      meeting.setDescription(newDescription)
    }
  }

  setProfilePictureUrl(url) {
    this.profilePictureUrl = url
  }

  getProfilePictureUrl() {
    return this.profilePictureUrl
  }

  static create({ name }) {
    const newUser = new User(name)

    User.list.push(newUser)
    return newUser
  }

  static list = []
}

module.exports = User
