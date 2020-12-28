import { CardStatus, CardType } from '../../../enums'

export interface GetCardListResponse {
  /**
   * Идентификатор сохраненной карты в системе банка
   */
  readonly CardId: string

  /**
   * Замаскированный номер карты
   */
  readonly Pan: string

  /**
   * Срок действия карты
   */
  readonly ExpDate: string

  readonly CardType: CardType
  readonly Status: CardStatus

  /**
   * Идентификатор автоплатежа
   */
  readonly RebillId?: string
}

export interface GetCardListParams {
  /**
   * Идентификатор покупателя в системе продавца string(36)
   */
  readonly CustomerKey: string

  /**
   * адрес покупателя	string(40)
   */
  readonly IP?: string
}
