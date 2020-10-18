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
