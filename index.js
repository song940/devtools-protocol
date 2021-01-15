import * as domains from './domains/index.js';
import connector from './lib/connector.js';

const debug = console.debug.bind(console);

export const callMethod = (method, params) => {
  let domain;
  [domain, method] = method.split('.');
  debug('callMethod', domain, method, params);
  const fn = domains[domain][method];
  return fn(params);
};

connector.send = message => {
  if (typeof message === 'string')
    message = JSON.parse(message);
  const { id, method, params } = message;
  debug(id, method, params);
  const out = { id };
  try {
    out.result = callMethod(method, params);
  } catch (e) {
    const { message } = e;
    out.error = { message };
    debug('callMethod Error:', method, e);
  }
  connector.emit('message', out);
  return out;
};

export default connector;