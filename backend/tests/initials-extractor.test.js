const initialsExtractor = require('../src/lib/initials-extractor')

describe('initialsExtractor', () => {
  it('should return the initials of a name', () => {
    const actualOutput = initialsExtractor('John Doe')
    const expectedOutput = 'JD'

    expect(actualOutput).toBe(expectedOutput)
  })

  it('should return the initials of a name with a middle name', () => {
    const actualOutput = initialsExtractor('John Doe Smith')
    const expectedOutput = 'JDS'

    expect(actualOutput).toBe(expectedOutput)
  })

  it('should return the initials of a name with multiple middlenames', () => {
    const actualOutput = initialsExtractor('Rodrigo Martines de la Cruz')
    const expectedOutput = 'RMC'

    expect(actualOutput).toBe(expectedOutput)
  })

  it('should shorten zu to z', () => {
    const actualOutput = initialsExtractor('Andreas zu Guttenberg')
    const expectedOutput = 'AzG'

    expect(actualOutput).toBe(expectedOutput)
  })

  it('should not shorten za to z', () => {
    const actualOutput = initialsExtractor('Andreas za Guttenberg')
    const expectedOutput = 'AG'

    expect(actualOutput).toBe(expectedOutput)
  })

  it('should throw an error if the name has more than 10 words', () => {
    const name = 'John Doe Smith John Doe Smith John Doe Smith John '

    expect(() => initialsExtractor(name)).toThrowError('Too many names')
  })
})
