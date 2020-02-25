import { InitRequestParams, InitResponse } from './init'

export interface Autopayments {
  /**
   * Метод создает платеж: продавец получает ссылку на платежную форму и должен перенаправить по ней покупателя
   */
  init(params?: InitRequestParams): InitResponse
}
