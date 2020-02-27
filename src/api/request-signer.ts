import { createHash }         from 'crypto'

import { TinkoffOptions }     from '../interfaces'
import { sortAlphabetically } from '../utils/helpers'

export type RequestSignerOptions = Pick<TinkoffOptions, 'password'>

export class RequstSigner {
  private static readonly signatureHashingAlgorithm = 'sha256'

  private static readonly excludedKeysList = ['Receipt', 'DATA']

  private readonly options: RequestSignerOptions

  private readonly hasher = createHash(RequstSigner.signatureHashingAlgorithm)

  public constructor(options: RequestSignerOptions) {
    this.options = options
  }

  public singRequest(request: any) {
    request.Token = this.generateSignatureByRequest(request)
  }

  /**
   * @see https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  private generateSignatureByRequest(request: any) {
    const requestCopy = { ...request }
    const rawKey = this.convertRequestToKey(requestCopy)
    const hashedKey = this.hasher.update(rawKey).digest('hex')

    return hashedKey
  }

  private convertRequestToKey(request: any): string {
    RequstSigner.excludedKeysList.forEach(key => {
      delete request[key]
    })

    request.Password = this.options.password

    const rawKey = Object.entries(request)
      .sort(([keyA], [keyB]) => sortAlphabetically(keyA, keyB))
      .map(([, value]) => value)
      .join('')

    return rawKey
  }
}
