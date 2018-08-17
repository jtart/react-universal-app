import { hydrateClient } from '@jtart/uni';
import routes from './app/routes';
import clientWrapper from './wrappers/client';

hydrateClient(routes, clientWrapper);

if (module.hot) {
  module.hot.accept();
}
