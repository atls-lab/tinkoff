export interface InitRequestParams {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала string(20)
   */
  readonly TerminalKey: string

  /**
   * Сумма в копейках	number(10)
   */
  readonly Amount?: number

  /**
   * Идентификатор заказа в системе продавца string(20)
   */
  readonly OrderId: string

  /**
   * IP-адрес покупателя string(40)
   */
  readonly IP?: string

  /**
   * Описание заказа string(250)
   */
  readonly Description?: string

  /**
   * Подпись запроса	string
   */
  readonly Token: string

  /**
   * Язык платежной формы string(2):
   * ru — русский
   * en — английский
   */
  readonly Language?: LanguageType

  /**
   * Идентификатор родительского платежа string(1)
   */
  readonly Recurrent?: string

  /**
   * Идентификатор покупателя в системе продавца string(36)
   */
  readonly CustomerKey?: string

  /**
   * Cрок жизни ссылки (не более 90 дней)
   * Временная метка по стандарту ISO8601 в формате
   */
  readonly RedirectDueDate?: string

  /**
   * Адрес для получения http нотификаций
   */
  readonly NotificationURL?: string

  /**
   * Страница успеха
   */
  readonly SuccessURL?: string

  /**
   * Страница ошибки
   */
  readonly FailURL?: string

  /**
   * Тип оплаты:
   * O — одностадийная
   * T — двухстадийная
   */
  readonly PayType?: PayType

  /**
   * Массив данных чека
   */
  readonly Receipt?: Receipt

  /**
   * Дополнительные параметры платежа в формате "ключ":"значение" (не более 20 пар)
   * Ключ — string(20), значение — string(100)
   */
  readonly DATA?: DATA
}

interface DATA {
  readonly [key: string]: string
}

export interface InitResponse {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала string(20)
   */
  readonly TerminalKey: string

  /**
   * Сумма в копейках	number(10)
   */
  readonly Amount: number

  /**
   * Идентификатор заказа в системе продавца string(20)
   */
  readonly OrderId: string

  /**
   * Выполнение платежа
   */
  readonly Success: boolean

  /**
   * Статус платежа	string(20)
   */
  readonly Status: string

  /**
   * Идентификатор платежа в системе банка	number(20)
   */
  readonly PaymentId: number

  /**
   * Код ошибки string(20)
   *
   * Если ошибки не произошло, передайте значение «0»
   */
  readonly ErrorCode: string

  /**
   * Ссылка на платежную форму string(100)
   */
  readonly PaymentURL?: string

  /**
   * Краткое описание ошибки
   */
  readonly Message?: string

  /**
   * Подробное описание ошибки
   */
  readonly Details?: string
}

interface Receipt {
  /**
   * Электронная почта покупателя string(64)x
   */
  readonly Email?: string

  /**
   * Телефон покупателя string(64)
   */
  readonly Phone?: string

  /**
   * Электронная почта продавца string(64)
   */
  readonly EmailCompany?: string

  /**
   * Система налогообложения
   */
  readonly Taxation: TexationType

  /**
   * Массив позиций чека с информацией о товарах
   */
  readonly Items: Items
}

export enum LanguageType {
  /**
   * русский
   */
  Ru = 'ru',

  /**
   * английский
   */
  En = 'en',
}

export enum PayType {
  /**
   * одностадийная
   */
  O = 'О',

  /**
   * двухстадийная
   */
  T = 'Т',
}

export enum TexationType {
  /**
   * общая
   */
  Osn = 'osn',

  /**
   * упрощенная (доходы)
   */
  UsnIncome = 'usn_income',

  /**
   * упрощенная (доходы минус расходы)
   */
  UsnIncomeOutcome = 'usn_income_outcome',

  /**
   * патентная
   */
  Patent = 'patent',

  /**
   * единый налог на вмененный доход
   */
  Envd = 'envd',

  /**
   * единый сельскохозяйственный налог
   */
  Esn = 'esn',
}

export interface Items {
  /**
   * Наименование товара number(10)
   */
  readonly Name: number

  /**
   * Количество или вес товара
   */
  readonly Quantity: string

  /**
   * Стоимость товара в копейках number(10)
   */
  readonly Amount: number

  /**
   * Цена товара в копейках
   */
  readonly Price: number

  /**
   * Признак способа расчета:
   */
  readonly PaymentMethod: PaymentMethodType

  /**
   * Признак предмета расчета:
   */
  readonly PaymentObject: PaymentObjectType

  /**
   * Ставка НДС
   */
  readonly Tax: TaxType

  /**
   * Ean13 string(20)
   */
  readonly Ean13?: string

  /**
   * Код магазина string(64)
   */
  readonly ShopCode?: string
}

export enum PaymentMethodType {
  /**
   * полный расчет
   */
  FullPayment = 'full_payment',

  /**
   * предоплата 100%
   */
  FullPrepayment = 'full_prepayment',

  /**
   * предоплата
   */
  Prepayment = 'prepayment',

  /**
   * аванс
   */
  Advance = 'advance',

  /**
   * частичный расчет и кредит
   */
  PartialPayment = 'partial_payment',

  /**
   * передача в кредит
   */
  Credit = 'credit',

  /**
   * оплата кредита
   */
  CreditPayment = 'credit_payment',
}

export enum PaymentObjectType {
  /**
   * товар
   */
  Commodity = 'commodity',

  /**
   * подакцизный товар
   */
  Excise = 'excise',

  /**
   * работа
   */
  Job = 'job',

  /**
   * услуга
   */
  Service = 'service',

  /**
   * ставка азартной игры
   */
  GamblingBet = 'gambling_bet',

  /**
   * выигрыш азартной игры
   */
  GamblingPrize = 'gambling_prize',

  /**
   * лотерейный билет
   */
  Lottery = 'lottery',

  /**
   * выигрыш лотереи
   */
  LotteryPrize = 'lottery_prize',

  /**
   * предоставление результатов интеллектуальной деятельности
   */
  IntellectualActivity = 'intellectual_activity',

  /**
   * платеж
   */
  Payment = 'payment',

  /**
   * агентское вознаграждение
   */
  AgentCommission = 'agent_commission',

  /**
   * составной предмет расчета
   */
  Composite = 'composite',

  /**
   * иной предмет расчета
   */
  Another = 'another',
}

export enum TaxType {
  /**
   * без НДС
   */
  None = 'none',

  /**
   * 0%
   */
  Vat0 = 'vat0',

  /**
   * 10%
   */
  Vat10 = 'vat10',

  /**
   * 20%
   */
  Vat20 = 'vat20',

  /**
   * 10/110
   */
  Vat110 = 'vat110',

  /**
   * 20/120
   */
  Vat120 = 'vat120',
}
