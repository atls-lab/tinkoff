import fetch              from 'node-fetch'

import { ApiCallOptions } from '../interfaces'
import { TinkoffCore }    from '../tinkoff-core'

export class APIRequest<T = any> extends Promise<T> {
  public static get [Symbol.species]() {
    return Promise
  }

  private readonly core: TinkoffCore

  private readonly options: ApiCallOptions

  private resolve: Function

  private reject: Function

  public constructor(core: TinkoffCore, options: ApiCallOptions) {
    let resolve: Function
    let reject: Function

    super((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    this.resolve = resolve
    this.reject = reject

    this.options = options
    this.core = core

    this.call()
  }

  private async call() {
    try {
      const requestUrl = this.buildUrl()
      const requestBody = this.buildBody()

      const response = await fetch(requestUrl, {
        body: requestBody,
        method: this.options.httpMethod,
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

  private buildBody() {
    const body = { ...this.options.requestParams, ...this.options.additionalBody }
    const signedBody = this.core.tinkoff.security.signRequest(body)
    const serializedBody = JSON.stringify(signedBody)
    return serializedBody
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
