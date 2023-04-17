const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const Meeting = require('../src/models/meeting')

describe('Meeting', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Meeting.deleteMany()
  })

  it('should create a user', async () => {
    const name = 'Sophia'

    const expectedOutput = {
      name,
      meetings: [],
    }

    const actualOutput = await request(app).post('/users').send({ name })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })

  it('should create a meeting', async () => {
    const name = 'Sophia'
    const user = await request(app).post('/users').send({ name })

    const meetingName = "Sophia's Meeting"
    const location = 'New York'
    const date = '2023-01-01'
    const limit = 2

    const expectedOutput = {
      name: meetingName,
      location,
      date,
      limit,
      attendees: [user.body],
    }

    const actualOutput = await request(app)
      .post('/meetings')
      .send({ user: user.body._id, name: meetingName, location, date, limit })

    expect(actualOutput.body).toMatchObject(expectedOutput)

    expect(actualOutput.body._id).toBeDefined()
  })
})
