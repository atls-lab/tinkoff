import { CancelRequestParams, CancelResponse, InitRequestParams, InitResponse } from '../common'

export interface Payments {
  /**
   * Метод создает платеж: продавец получает ссылку на платежную форму и должен перенаправить по ней покупателя
   */
  Init(params?: InitRequestParams): Promise<InitResponse>

  /**
   * Метод отменяет платеж.
   */
  Cancel(params: CancelRequestParams): Promise<CancelResponse>
}
