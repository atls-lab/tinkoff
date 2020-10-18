import { TinkoffDefaultOptions } from '../interfaces/tinkoff'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export const tinkoffDefaultOptions: TinkoffDefaultOptions = {
  baseUrl: 'https://securepay.tinkoff.ru/v2/',
  headers: defaultHeaders,
}
