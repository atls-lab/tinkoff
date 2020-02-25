export interface TinkoffOptions {
  readonly baseUrl: string
  readonly password: string
}

export interface TinkoffPublicOptions extends Partial<TinkoffOptions> {
  readonly password: string
}

export interface TinkoffDefaultOptions extends Partial<TinkoffOptions> {
  readonly baseUrl: string
}
