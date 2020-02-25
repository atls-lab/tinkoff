import fetch            from 'node-fetch'

import { TinkoffCore }  from '../tinkoff-core'
import { Autopayments } from './api-types'
import { RequstSigner } from './request-signer'

const tinkoffAPIMetaInfo = {
  autopayments: new Map([
    ['init', 'POST'],
    ['charge', 'POST'],
    ['addCustomer', 'POST'],
    ['getCustomer', 'POST'],
    ['removeCustomer', 'POST'],
    ['getCardList', 'POST'],
    ['removeCard', 'POST'],
  ]),
}

export interface ApiCallOptions {
  readonly namespace: string
  readonly method: string
  readonly httpMethod: string
  readonly requestParams: any
}

export class API {
  private readonly tinkoffCore: TinkoffCore

  private readonly requestSigner: RequstSigner

  public readonly autopayments!: Autopayments

  public constructor(tinkoffCore: TinkoffCore) {
    this.tinkoffCore = tinkoffCore
    this.requestSigner = new RequstSigner(this.tinkoffCore)
    this.injectAPI()
  }

  private injectAPI() {
    Object.entries(tinkoffAPIMetaInfo).forEach(([namespace, methodsMap]) => {
      const target = Object.create(null)
      const handler: ProxyHandler<object> = {
        get: (_object: object, property: string) => {
          return (params: object): Promise<any> | void => {
            const httpMethod = methodsMap.get(property)

            if (!httpMethod) {
              return
            }

            const apiCallOptions: ApiCallOptions = {
              httpMethod,
              method: property,
              namespace,
              requestParams: params,
            }

            // eslint-disable-next-line consistent-return
            return this.call(apiCallOptions)
          }
        },
      }
      ;(this as any)[namespace] = new Proxy(target, handler)
    })
  }

  private async call(options: ApiCallOptions) {
    const { baseUrl } = this.tinkoffCore.options
    const requestUrl = new URL(baseUrl)
    requestUrl.pathname = `${options.namespace}/${options.method}`

    this.signRequest(options.requestParams)

    const response = await fetch(requestUrl, {
      method: options.httpMethod,
      body: JSON.stringify(options.requestParams),
    })

    return response.json()
  }

  private signRequest(request: any) {
    request.Token = this.requestSigner.generateSignatureByRequest(request)
  }
}
