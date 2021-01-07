# tinkoff API

## Install

### yarn

```shell
yarn add @atlantis-lab/tinkoff-api
```

## Example usage

```js
import { Tinkoff } from 'tinkoff-api'

const tinkoff = new Tinkoff({
  password: process.env.PASSWORD
})

const response = await tinkoff.api.autopayments.init({ ... })
```
