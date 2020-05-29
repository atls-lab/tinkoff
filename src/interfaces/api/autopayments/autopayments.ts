import { InitRequestParams, InitResponse }             from '../common'
import { ChargeRequestParams, ChargeResponse }         from './charge'
import { RemoveCardRequestParams, RemoveCardResponse } from './remove-card'

export interface Autopayments {
  /**
   * Метод создает платеж: продавец получает ссылку на платежную форму и должен перенаправить по ней покупателя
   */
  Init(params?: InitRequestParams): Promise<InitResponse>

  /**
   * Метод осуществляет автоплатеж.
   * Всегда работает по типу одностадийной оплаты:
   * во время выполнения метода на Notification URL будет отправлен синхронный запрос,
   * на который требуется корректный ответ.
   */
  Charge(params?: ChargeRequestParams): Promise<ChargeResponse>

  /**
   * Метод удаляет привязанную карту покупателя
   */
  RemoveCard(params?: RemoveCardRequestParams): Promise<RemoveCardResponse>
}
