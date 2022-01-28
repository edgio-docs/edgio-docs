---
title: Getting started
---



```typescript
// src/routes.ts
import { Router } from '@layer0/core/router'
import shoppingFlowRouteHandler from './route-handler'

export default new Router()
  .get('/', shoppingFlowRouteHandler)
  .get('/collections/*path', shoppingFlowRouteHandler)
  .get('/products/*path', shoppingFlowRouteHandler)
```