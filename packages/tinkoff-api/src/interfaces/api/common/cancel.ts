/**
 * @todo remove duplicate types
 */

import { Receipt } from './init'

export interface CancelRequestParams {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала string(20)
   */
  readonly TerminalKey?: string

  /**
   * Идентификатор платежа в системе банка number(20)
   */
  readonly PaymentId: number

  /**
   * Сумма возврата в копейках
   * В статусах NEW и AUTHORIZED возможен только полный возврат, поэтому параметр игнорируется
   * number(10)
   */
  readonly Amount: number

  /**
   * IP-адрес покупателя string(40)
   */
  readonly IP: string

  /**
   * подпись запроса
   */
  readonly Token?: string

  readonly Receipt: Receipt
}

export interface CancelResponse {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала string(20)
   */
  readonly TerminalKey: string

  /**
   * Идентификатор заказа в системе продавца	string(20)
   */
  readonly OrderID: string

  /**
   * Выполнение платежа
   */
  readonly Success: boolean

  /**
   * Статус платежа string(20)
   */
  readonly Status: string

  /**
   * Уникальный идентификатор транзакции в системе банка number(20)
   */
  readonly PaymentId: number

  /**
   * Код ошибки Если ошибки не произошло, передайте значение «0»
   */
  readonly ErrorCode: string

  /**
   * Краткое описание ошибки
   */
  readonly Message?: string

  /**
   * Подробное описание ошибки
   */
  readonly Details?: string

  /**
   * Сумма до возврата в копейках
   */
  readonly OriginalAmount: number

  /**
   * Сумма после возврата в копейках
   */
  readonly NewAmount: number
}
