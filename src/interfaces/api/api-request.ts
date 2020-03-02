import { AdditionalBody, Headers } from '../tinkoff'

export interface ApiCallOptions {
  readonly apiMethod: string
  readonly httpMethod: string
  readonly requestParams: any
  readonly headers: Headers
  readonly baseUrl: string
  readonly additionalBody: AdditionalBody
}
