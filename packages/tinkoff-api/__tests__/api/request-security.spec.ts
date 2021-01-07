import { signRequest, verifyRequest } from '../../src'

describe('RequestSigner', () => {
  describe('signRequest', () => {
    it('should add Token property', () => {
      const request: any = {
        TerminalKey: 'TinkoffBankTest',
        Amount: 100000,
        OrderId: 'TokenExample',
        Description: 'test',
        Password: 'TinkoffBankTest',
        DATA: {
          Phone: '+71234567890',
          Email: 'a@test.com',
        },
        Receipt: {
          Email: 'a@test.ru',
          Phone: '+79031234567',
          Taxation: 'osn',
          Items: [
            {
              Name: 'Наименование товара 1',
              Price: 10000,
              Quantity: 1.0,
              Amount: 10000,
              Tax: 'vat10',
              Ean13: '0123456789',
            },
          ],
        },
      }
      const expectedToken = '48d4ca825aab2ede06736d3eae099bd56ac97bd1bcdd598aff210f729de4eb21'

      const signedRequest = signRequest(request)

      expect(signedRequest.Token).toEqual(expectedToken)
    })
  })

  describe('verifyRequest', () => {
    it('should be successfully verify request', () => {
      const request: any = {
        TerminalKey: 'TinkoffBankTest',
        Amount: 100000,
        OrderId: 'TokenExample',
        Description: 'test',
        Password: 'TinkoffBankTest',
        DATA: {
          Phone: '+71234567890',
          Email: 'a@test.com',
        },
        Receipt: {
          Email: 'a@test.ru',
          Phone: '+79031234567',
          Taxation: 'osn',
          Items: [
            {
              Name: 'Наименование товара 1',
              Price: 10000,
              Quantity: 1.0,
              Amount: 10000,
              Tax: 'vat10',
              Ean13: '0123456789',
            },
          ],
        },
        Token: '48d4ca825aab2ede06736d3eae099bd56ac97bd1bcdd598aff210f729de4eb21',
      }

      const isValid = verifyRequest(request)

      expect(isValid).toBe(true)
    })

    it('request verification should be failed', () => {
      const request: any = {
        TerminalKey: 'TinkoffBankTest',
        Amount: 100000,
        OrderId: 'TokenExample',
        Description: 'test',
        Password: 'TinkoffBankTest',
        DATA: {
          Phone: '+71234567890',
          Email: 'a@test.com',
        },
        Receipt: {
          Email: 'a@test.ru',
          Phone: '+79031234567',
          Taxation: 'osn',
          Items: [
            {
              Name: 'Наименование товара 1',
              Price: 10000,
              Quantity: 1.0,
              Amount: 10000,
              Tax: 'vat10',
              Ean13: '0123456789',
            },
          ],
        },
        Token: 'INVALID_TOKEN',
      }

      const isValid = verifyRequest(request)

      expect(isValid).toBe(false)
    })
  })
})
