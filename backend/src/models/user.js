const Meeting = require('./meeting')
const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meeting',
      autopopulate: { maxDepth: 1 },
    },
  ],
})

userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

class User {
  async createMeeting(name, location, date, limit) {
    const meeting = await Meeting.create({ name, location, date, limit, createdBy: this })

    await this.joinMeeting(meeting)

    return meeting
  }

  async joinMeeting(meeting) {
    if (meeting.attendees.length >= meeting.limit) {
      throw new Error('Meeting is full')
    }
    this.meetings.push(meeting)
    meeting.attendees.push(this)

    await meeting.save()
    await this.save()
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

  // changeMeetingName(meeting, newName) {
  //   if (this === meeting.createdBy) {
  //     meeting.setName(newName)
  //   }
  // }

  // changeMeetingLocation(meeting, newLocation) {
  //   if (this === meeting.createdBy) {
  //     meeting.setLocation(newLocation)
  //   }
  // }

  // changeMeetingDate(meeting, newDate) {
  //   if (this === meeting.createdBy) {
  //     meeting.setDate(newDate)
  //   }
  // }

  // changeMeetingDescription(meeting, newDescription) {
  //   if (this === meeting.createdBy) {
  //     meeting.setDescription(newDescription)
  //   }
  // }

  setProfilePictureUrl(url) {
    this.profilePictureUrl = url
  }

  getProfilePictureUrl() {
    return this.profilePictureUrl
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
module.exports = mongoose.model('User', userSchema)
