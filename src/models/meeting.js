const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const meetingSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  date: String,
  limit: Number,
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

module.exports = mongoose.model('Meeting', meetingSchema)
