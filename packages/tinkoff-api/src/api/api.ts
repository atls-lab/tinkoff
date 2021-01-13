import { ApiCallOptions, Autopayments, Payments } from '../interfaces'
import { TinkoffCore }                            from '../tinkoff-core'
import { APIRequest }                             from './api-request'

const tinkoffAPIMetaInfo = {
  autopayments: new Map([
    ['Init', 'POST'],
    ['RemoveCard', 'POST'],
    ['Charge', 'POST'],
    ['GetCardList', 'POST'],
  ]),
  payments: new Map([
    ['Init', 'POST'],
    ['Cancel', 'POST'],
  ]),
}

export class API {
  private readonly core: TinkoffCore

  public readonly autopayments!: Autopayments

  public readonly payments!: Payments

  public constructor(core: TinkoffCore) {
    this.core = core
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

            /**
             * @todo refactor it, need to create an abstraction for options
             */
            const apiCallOptions: ApiCallOptions = {
              httpMethod,
              apiMethod: property,
              requestParams: params,
              baseUrl: this.core.options.baseUrl,
              headers: this.core.options.headers,
              additionalBody: {
                Password: this.core.options.password,
                TerminalKey: this.core.options.terminalKey,
              },
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
    return new APIRequest(this.core, options)
  }
}
