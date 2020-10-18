import {
  LanguageType,
  PayType,
  PaymentMethodType,
  PaymentObjectType,
  TaxType,
  TexationType,
} from '../../../enums'

export interface InitRequestParams {
  /**
   * Идентификатор терминала. Выдается продавцу банком при заведении терминала string(20)
   */
  readonly TerminalKey?: string

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

export interface DATA {
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

export interface Receipt {
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
  readonly Items: Item[]
}

export interface Item {
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
