import { Tinkoff } from '../../src'

describe('RequestSigner', () => {
  const options = {
    password: 'ripazha',
    terminalKey: 'DEMO',
  }

  let tinkoff: Tinkoff

  beforeEach(() => {
    tinkoff = new Tinkoff(options)
  })

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

      const signedRequest = tinkoff.security.signRequest(request)

      expect(signedRequest.Token).toEqual(expectedToken)
    })
  })

  it('request verification should be success', () => {
    const request = {
      Token: '0384b0f144043de7d1aa848f0e38c494f7e5243efee1e2675fcaa5be534e6a91',
      RebillId: 1610360457462,
      ExpDate: '1122',
      Pan: '430000******0777',
      CardId: 32273381,
      Amount: 125000,
      ErrorCode: '0',
      PaymentId: 422409756,
      Status: 'CONFIRMED',
      Success: true,
      OrderId: '214',
      TerminalKey: options.terminalKey,
      Password: options.password,
    }

    const verified = tinkoff.security.verifyRequest(request)

    expect(verified).toEqual(true)
  })

  describe('verifyRequest', () => {
    it('request verification should be failed', () => {
      const request = {
        Token: '0384b0f144043de7d1aa848f0e38c494f7e5243efee1e2675fcaa5be534e6a91',
        RebillId: 1610360457462,
        ExpDate: '1122',
        Pan: '430000******0777',
        CardId: 32273381,
        Amount: 999999999999999,
        ErrorCode: '0',
        PaymentId: 422409756,
        Status: 'CONFIRMED',
        Success: true,
        OrderId: '214',
        TerminalKey: options.terminalKey,
        Password: options.password,
      }

      const verified = tinkoff.security.verifyRequest(request)

      expect(verified).toEqual(false)
    })
  })
})
