import { API }                  from './api'
import { TinkoffPublicOptions } from './interfaces'
import { TinkoffCore }          from './tinkoff-core'

export class Tinkoff {
  public readonly api: API

  private readonly tinkoffCore: TinkoffCore

  public constructor(options: TinkoffPublicOptions) {
    this.tinkoffCore = new TinkoffCore(this, options)
    this.api = new API(this.tinkoffCore)
  }
}
