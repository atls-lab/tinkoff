import { RequstSigner } from '../../src/api/request-signer'

describe('RequstSigner', () => {
  let requestSigner: RequstSigner

  beforeEach(() => {
    requestSigner = new RequstSigner({ password: 'TinkoffBankTest' })
  })

  describe('singRequest', () => {
    it('shoud add Token property', () => {
      const request: any = {
        TerminalKey: 'TinkoffBankTest',
        Amount: 100000,
        OrderId: 'TokenExample',
        Description: 'test',
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

      requestSigner.singRequest(request)

      expect(request.Token).toEqual(expectedToken)
    })
  })
})
