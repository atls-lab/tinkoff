import { sortAlphabetically } from '../../src/utils/helpers'

describe('helpers', () => {
  describe('sortAlphabetically', () => {
    it('shoud sort chars alphabetically', () => {
      const expected = ['A', 'B', 'c']
      const words = ['c', 'A', 'B']

      const sortedWords = words.sort(sortAlphabetically)

      expect(sortedWords).toEqual(expected)
    })

    it('shoud sort words alphabetically', () => {
      const expected = ['Bob', 'Mark', 'zero']
      const words = ['Bob', 'Mark', 'zero']

      const sortedWords = words.sort(sortAlphabetically)

      expect(sortedWords).toEqual(expected)
    })
  })
})
