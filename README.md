# Tinkoff Payments Provider

## Install

```
yarn add @atlantis-lab/tinkoff-api
```

## Example usage

```typescript
import { Tinkoff } from 'tinkoff-api'

const tinkoff = new Tinkoff({
    password: process.env.PASSWORD
})

const response = await tinkoff.api.autopayments.init({ ... })

```
