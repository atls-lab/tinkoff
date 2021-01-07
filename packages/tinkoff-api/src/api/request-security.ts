import { createHash }                      from 'crypto'

import { excludeKeys, sortAlphabetically } from '../utils/helpers'

const HASH_ALGORITHM = 'sha256'
const KEY_ENCODING_METHOD = 'hex'

const excludedKeysList = ['Receipt', 'DATA', 'Token']

const generateKeyByRequest = (request: any): string => {
  const preparedRequest = excludeKeys(request, excludedKeysList)
  const rawKey = Object.entries(preparedRequest)
    .sort(([keyA], [keyB]) => sortAlphabetically(keyA, keyB))
    .map(([, value]) => value)
    .join('')
  return rawKey
}

const generateSignatureByRequest = (request: any) => {
  const requestCopy = { ...request }
  const rawKey = generateKeyByRequest(requestCopy)
  const hashedKey = createHash(HASH_ALGORITHM)
    .update(rawKey)
    .digest(KEY_ENCODING_METHOD)
  return hashedKey
}

export const signRequest = (request: any) => ({
  ...request,
  Token: generateSignatureByRequest(request),
})

export const verifyRequest = (request): boolean =>
  request.Token === generateSignatureByRequest(request)
