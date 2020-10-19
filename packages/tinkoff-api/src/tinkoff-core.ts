import { TinkoffOptions }        from './interfaces'
import { TinkoffPublicOptions }  from './interfaces'
import { Tinkoff }               from './tinkoff'
import { tinkoffDefaultOptions } from './utils/constants'

export class TinkoffCore {
  public readonly tinkoff: Tinkoff

  public readonly options: TinkoffOptions

  public constructor(tinkoff: Tinkoff, options: TinkoffPublicOptions) {
    this.tinkoff = tinkoff
    this.options = Object.assign(options, tinkoffDefaultOptions)
  }
}
