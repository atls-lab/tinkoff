import { createHash }                      from 'crypto'

import { TinkoffCore }                     from '../tinkoff-core'
import { excludeKeys, sortAlphabetically } from '../utils/helpers'

const HASH_ALGORITHM = 'sha256'
const KEY_ENCODING_METHOD = 'hex'

const excludedKeysList = ['Receipt', 'DATA', 'Token']

export class RequestSecurity {
  public constructor(private readonly core: TinkoffCore) {}

  public verifyRequest = (request: any): boolean => {
    const requestWithPassword = { ...request, Password: this.core.options.password }
    const verified = request.Token === this.generateSignatureByRequest(requestWithPassword)
    return verified
  }

  public signRequest = (request: any) => {
    const signedRequest = {
      ...request,
      Token: this.generateSignatureByRequest(request),
    }
    return signedRequest
  }

  private generateSignatureByRequest = (request: any) => {
    const requestCopy = { ...request }
    const rawKey = this.generateKeyByRequest(requestCopy)
    const hashedKey = createHash(HASH_ALGORITHM)
      .update(rawKey)
      .digest(KEY_ENCODING_METHOD)
    return hashedKey
  }

  private generateKeyByRequest = (request: any): string => {
    const preparedRequest = excludeKeys(request, excludedKeysList)
    const rawKey = Object.entries(preparedRequest)
      .sort(([keyA], [keyB]) => sortAlphabetically(keyA, keyB))
      .map(([, value]) => value)
      .join('')
    return rawKey
  }
}
