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
