import { InitRequestParams, InitResponse } from '../common'

export interface Autopayments {
  /**
   * Метод создает платеж: продавец получает ссылку на платежную форму и должен перенаправить по ней покупателя
   */
  Init(params?: InitRequestParams): Promise<InitResponse>
}
