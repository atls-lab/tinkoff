export interface ChargeRequestParams {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала	string(20)
   */
  readonly TerminalKey?: string

  /**
   * См. Подпись запроса
   */
  readonly Token?: string

  /**
   * Идентификатор платежа в системе банка	number(20)
   */
  readonly PaymentId: number

  /**
   * Идентификатор автоплатежа	number(20)
   */
  readonly RebillId: number

  /**
   * Получение покупателем уведомлений на электронную почту
   */
  readonly SendEmail: boolean

  /**
   * лектронная почта покупателя	string	Да, если передан параметр
   */
  readonly InfoEmail: string

  /**
   * IP-адрес покупателя	string(40)
   */
  readonly IP: string
}

export interface ChargeResponse {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала	string(20)
   */
  readonly TerminalKey: string

  /**
   * Сумма в копейках	number(10)
   */
  readonly Amount: number

  /**
   * Идентификатор заказа в системе продавца	string(20)
   */
  readonly OrderID: string

  /**
   * Выполнение платежа
   */
  readonly Success: boolean

  /**
   * Уникальный идентификатор транзакции в системе банка	number(20)
   */
  readonly PaymentID: number

  /**
   * Код ошибки string(20)
   */
  readonly ErrorCode: string

  /**
   * Краткое описание ошибки	string
   */
  readonly Message?: string

  /**
   * Подробное описание ошибки	string
   */
  readonly Details?: string
}
