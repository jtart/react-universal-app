import { hydrateClient } from '../../../';
import routes from './routes';
import withClientWrapper from './withClientWrapper';

hydrateClient(routes, withClientWrapper);
