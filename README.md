# tinkoff API

## Install

### yarn

```shell
yarn add @aunited/tinkoff-api
```

### npm

```shell
npm i @aunited/tinkoff-api
```

## Example usage

```js
import { Tinkoff } from 'tinkoff-api'

const tinkoff = new Tinkoff({
  password: process.env.PASSWORD
})

const response = await tinkoff.api.autopayments.init({ ... })
```
