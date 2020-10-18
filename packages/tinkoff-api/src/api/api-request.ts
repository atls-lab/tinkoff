import fetch              from 'node-fetch'

import { ApiCallOptions } from '../interfaces'
import { RequestSigner }  from './request-signer'
import { apply }          from '../utils/helpers'

export class APIRequest<T = any> extends Promise<T> {
  public static get [Symbol.species]() {
    return Promise
  }

  private static readonly requestSigner = new RequestSigner()

  private readonly options: ApiCallOptions

  private resolve: Function

  private reject: Function

  public constructor(options: ApiCallOptions) {
    let resolve: Function
    let reject: Function

    super((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    this.resolve = resolve
    this.reject = reject

    this.options = options

    this.call()
  }

  private async call() {
    try {
      this.patchRequest()

      const requestUrl = this.buildUrl()

      APIRequest.requestSigner.singRequest(this.options.requestParams)

      const response = await fetch(requestUrl, {
        method: this.options.httpMethod,
        body: JSON.stringify(this.options.requestParams),
        headers: this.options.headers,
      })

      if (!response.ok) {
        const body = await response.text()
        throw new Error(`Status code: ${response.status}\n Body: ${body}`)
      }

      const responseJson = await response.json()

      this.resolve(responseJson)
    } catch (error) {
      this.reject(error)
    }
  }

  private patchRequest() {
    apply(this.options.requestParams, this.options.additionalBody)
  }

  private buildUrl() {
    const { baseUrl } = this.options
    const requestUrl = new URL(baseUrl)
    requestUrl.pathname += this.options.apiMethod
    return requestUrl
  }

  public get [Symbol.toStringTag]() {
    return this.constructor.name
  }
}
