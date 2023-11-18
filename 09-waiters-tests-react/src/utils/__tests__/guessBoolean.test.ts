import {guessBoolean} from '../guessBoolean'

describe('guessBoolean', () => {
  describe('positive', () => {
    it('should return true if \'true\' str provided', () => {
      expect(guessBoolean('true')).toBe(true)
    })

    it('should return true if True provided', () => {
      expect(guessBoolean('True')).toBe(true)
    })

    it('should return true if TRUE provided', () => {
      expect(guessBoolean('TRUE')).toBe(true)
    })

    it('should return true if \'yes\' provided', () => {
      expect(guessBoolean('yes')).toBe(true)
    })

    it('should return true if \'1\' provided', () => {
      expect(guessBoolean('1')).toBe(true)
    })

    it('should return true if true provided', () => {
      expect(guessBoolean(true)).toBe(true)
    })

    it('should return true if 1 provided', () => {
      expect(guessBoolean(1)).toBe(true)
    })
  })

  describe('negative', () => {
    it('should return false if \'any other string\' provided', () => {
      expect(guessBoolean('any other string')).toBe(false)
    })

    it('should return false if false provided', () => {
      expect(guessBoolean(false)).toBe(false)
    })

    it('should return false if 0 provided', () => {
      expect(guessBoolean(0)).toBe(false)
    })

    it('should return false if [] provided', () => {
      expect(guessBoolean([])).toBe(false)
    })

    it('should return false if {} provided', () => {
      expect(guessBoolean({})).toBe(false)
    })
  })
})
