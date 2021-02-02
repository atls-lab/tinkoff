# Tinkoff Payments Provider

## Install

```
yarn add @atlantis-lab/tinkoff-api
```

## Initialize purchase example

```typescript
import { Tinkoff } from '@atlantis-lab/tinkoff-api'

const tinkoff = new Tinkoff({
  password: process.env.TINKOFF_PASSWORD,
  terminalKey: process.env.TINKOFF_TERMINAL_KEY,
})

const response = await tinkoff.api.payments.Init({
  OrderId: 1,
  Amount: 2000,
})

// ..logic
```

## Tinkoff request verifing example

```typescript
import http        from 'http'
import { Tinkoff } from '@atlantis-lab/tinkoff-api'
const tinkoff = new Tinkoff({
  password: process.env.TINKOFF_PASSWORD,
  terminalKey: process.env.TINKOFF_TERMINAL_KEY,
})
const downloadJSONBody = async (request: http.IncomingMessage) => {
  const chunks: Buffer[] = []
  for await (const chunk of request) {
    chunks.push(chunk)
  }
  const rawBody = Buffer.concat(chunks)
  const serializedBody = rawBody.toJSON()
  return serializedBody
}
const rejectRequest = (response: http.ServerResponse) => {
  response.statusCode = 400
  response.end()
}
const resolveRequest = (response: http.ServerResponse) => {
  response.statusCode = 200
  response.end('OK')
}
const requestHandler: http.RequestListener = (request, response) => {
  const body = await downloadJSONBody(request)
  const verified = tinkoff.security.verifyRequest(body)
  verified ? resolveRequest(response) : rejectRequest(response)
}
const server = http.createServer(requestHandler)
server.listen(process.env.APPLICATION_PORT)
```
