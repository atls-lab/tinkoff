import { createHash }  from 'crypto'

import { TinkoffCore } from '../tinkoff-core'
import { sortByASCII } from '../utils/helpers'

export class RequstSigner {
  private static readonly signatureHashingAlgorithm = 'sha256'

  private static readonly excludedKeysList = ['Receipt', 'DATA']

  private readonly tinkoffCore: TinkoffCore

  private readonly hasher = createHash(RequstSigner.signatureHashingAlgorithm)

  public constructor(tinkoffCore: TinkoffCore) {
    this.tinkoffCore = tinkoffCore
  }

  /**
   * @see https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  public generateSignatureByRequest(request: any) {
    const requestCopy = { ...request }
    const rawKey = this.convertRequestToKey(requestCopy)
    const hashedKey = this.hasher
      .update(rawKey)
      .digest()
      .toString('utf8')

    return hashedKey
  }

  private convertRequestToKey(request: any): string {
    RequstSigner.excludedKeysList.forEach(key => {
      delete request[key]
    })

    request.password = this.tinkoffCore.options.password

    const rawKey = Object.keys(request)
      .sort(sortByASCII)
      .join('')

    return rawKey
  }
}
