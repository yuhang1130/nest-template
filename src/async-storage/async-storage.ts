import { AsyncLocalStorage } from 'async_hooks';
import * as _ from 'lodash';

export interface ALSConfig {
  request: Request;
  requestId: string;
}

export const ASLStore = new AsyncLocalStorage<ALSConfig>();

export const AlsGetRequest = (): Request => {
  return ASLStore.getStore().request;
};

export const ALSSetRequest = (data: Request) => {
  const config = ASLStore.getStore();
  return _.set(config, 'request', data);
};

export const ALSSetRequestId = (requestId: string) => {
  const config = ASLStore.getStore();
  return _.set(config, 'requestId', requestId);
};
