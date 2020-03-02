import { createHash }                              from 'crypto'

import { deletePropertyByKey, sortAlphabetically } from '../utils/helpers'

export class RequestSigner {
  private static readonly signatureHashingAlgorithm = 'sha256'

  private static readonly excludedKeysList = ['Receipt', 'DATA']

  public singRequest(request: any) {
    request.Token = this.generateSignatureByRequest(request)
  }

  /**
   * @see https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  private generateSignatureByRequest(request: any) {
    const requestCopy = { ...request }
    const rawKey = this.convertRequestToKey(requestCopy)
    const hashedKey = createHash(RequestSigner.signatureHashingAlgorithm)
      .update(rawKey)
      .digest('hex')

    return hashedKey
  }

  private convertRequestToKey(request: any): string {
    RequestSigner.excludedKeysList.forEach(deletePropertyByKey(request))

    const rawKey = Object.entries(request)
      .sort(([keyA], [keyB]) => sortAlphabetically(keyA, keyB))
      .map(([, value]) => value)
      .join('')

    return rawKey
  }
}
