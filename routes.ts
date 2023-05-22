import {Router} from '@layer0/core/router';

const BASE_URL = 'https://docs.edg.io';

const router = new Router()
  .match('/:path*', ({redirect}) => {
    redirect(`${BASE_URL}/guides/v4/:path*`, 301);
  })
  .fallback(({redirect}) => {
    redirect(`${BASE_URL}/guides/v4/`, 301);
  });
export default router;
