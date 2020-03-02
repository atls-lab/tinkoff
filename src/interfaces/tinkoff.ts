import { KeyValue } from './utils'

export interface TinkoffOptions {
  readonly baseUrl: string
  readonly password: string
  readonly terminalKey: string
  readonly headers: Headers
}

export type Headers = KeyValue

export type AdditionalBody = KeyValue

export interface TinkoffPublicOptions extends Partial<TinkoffOptions> {
  readonly password: string
  readonly terminalKey: string
}

export interface TinkoffDefaultOptions extends Partial<TinkoffOptions> {
  readonly baseUrl: string
  readonly headers: Headers
}
