import { API, RequestSecurity } from './api'
import { TinkoffPublicOptions } from './interfaces'
import { TinkoffCore }          from './tinkoff-core'

export class Tinkoff {
  public readonly api: API

  public readonly security: RequestSecurity

  private readonly tinkoffCore: TinkoffCore

  public constructor(options: TinkoffPublicOptions) {
    this.tinkoffCore = new TinkoffCore(this, options)
    this.api = new API(this.tinkoffCore)
    this.security = new RequestSecurity(this.tinkoffCore)
  }
}
