import { hydrateClient } from '@jtart/uni';
import routes from './app/routes';
import withClientWrapper from './withClientWrapper';

hydrateClient(routes, withClientWrapper);

if (module.hot) {
  module.hot.accept();
}
