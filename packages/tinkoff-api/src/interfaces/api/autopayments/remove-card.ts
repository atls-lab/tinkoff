/**
 * @example
  {
    "Success": true,
    "ErrorCode": "0",
    "TerminalKey": "1509463751731DEMO",
    "CustomerKey": "740892",
    "CardId": "879157",
    "Status": "D",
    "CardType": 0
  }
 */
export interface RemoveCardResponse {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала	string(20)
   */
  TerminalKey: string

  /**
   * Идентификатор покупателя в системе продавца	string(36)
   */
  CustomerKey: string

  /**
   * Идентификатор карты в системе Банка	string(36)
   */
  CardId: string

  /**
   * Успешность операции	string(100)
   */
  Status: string

  /**
   * Успешность операции
   */
  Success: boolean

  /**
   * Тип карты
   */
  CardType: string

  /**
   * Код ошибки, «0» - успешно	string(15)
   */
  ErrorCode?: string

  /**
   * Краткое описание ошибки	string(40)
   */
  Message?: string

  /**
   * Подробное описание ошибки
   */
  Details?: string
}

/**
 * @example
  { 
    "TerminalKey" : "TinkoffBankTest",
    "CustomerKey" : "Customer1",
    "CardId" : "156516516",
    "Token" : "c0ad1dfc4e94ed44715c5ed0e84f8ec439695b9ac219a7a19555a075a3c3ed24"
  }
 */
export interface RemoveCardRequestParams {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала	string(20)
   */
  TerminalKey: string

  /**
   * Идентификатор покупателя в системе продавца	string(36)
   */
  CustomerKey: string

  /**
   * Идентификатор карты в системе Банка	string(40)
   */
  CardId: string

  Token: string

  /**
   * IP-адрес покупателя	string(40)
   */
  Ip?: string
}
