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
  avatarUrl: String,
})

userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

class User {
  async createMeeting(name, location, date, limit, description) {
    const meeting = await Meeting.create({ name, location, date, limit, createdBy: this, description })

    await this.joinMeeting(meeting)

    return meeting
  }

  async joinMeeting(meeting) {
    if (meeting.attendees.length >= meeting.limit) {
      throw new Error('Meeting is full')
    }
    const existingUser = meeting.attendees.find(attendee => attendee._id.equals(this._id))
    //check if user is already attending
    if (existingUser) {
      throw new Error('User is already attending')
    }

    this.meetings.push(meeting)
    meeting.attendees.push(this)

    await meeting.save()
    await this.save()
  }

  async leaveMeeting(meeting) {
    this.meetings = this.meetings.filter(m => !m._id.equals(meeting._id))
    meeting.attendees = meeting.attendees.filter(attendee => !attendee._id.equals(this._id))

    await meeting.save()
    await this.save()
  }

  async deleteMeeting(meeting) {
    if (!this._id.equals(meeting.createdBy._id)) {
      throw new Error('User did not create this meeting')
    }

    this.meetings = this.meetings.filter(m => !m._id.equals(meeting._id))
    await this.save()
  }

  async updateAvatar(url) {
    this.avatarUrl = url
    await this.save()
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
