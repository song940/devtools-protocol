import EventEmitter from 'https://lsong.org/scripts/events.js';

const events = new EventEmitter();

export const trigger = (method, params) =>
  events.emit('message', { method, params });

export default events;