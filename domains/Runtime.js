import { trigger } from '../lib/connector.js';
import * as stringifyObj from '../lib/stringifyObj.js';
import { each, toArray } from 'https://lsong.org/scripts/array.js';

const global = {
  copy(value) {
    if (!isStr(value)) value = JSON.stringify(value, null, 2);
    copy(value);
  },
  $(selector) {
    return document.querySelector(selector);
  },
  $$(selector) {
    return toArray(document.querySelectorAll(selector));
  },
  // $x(path) {
  //   return xpath(path);
  // },
};

const executionContext = {
  id: 1,
  name: document.title,
  origin: location.origin,
};

export function injectGlobal() {
  each(global, (val, name) => {
    if (window[name]) return;
    window[name] = val;
  });
}

export function clearGlobal() {
  each(global, (val, name) => {
    if (window[name] && window[name] === val) {
      delete window[name];
    }
  });
}

export function setGlobal(name, val) {
  global[name] = val;
}

export const evaluateJs = expression => {
  let result;
  injectGlobal();
  try {
    result = eval.call(window, `(${expression})`);
  } catch (e) {
    result = eval.call(window, expression);
  }
  clearGlobal();
  return result;
};

export const enable = () => {
  trigger('Runtime.executionContextCreated', {
    context: executionContext,
  });
};

export const compileScript = () => {

};

export const evaluate = ({ expression }) => {
  const ret = {};
  try {
    const result = evaluateJs(expression);
    console.log('$_', result);
    setGlobal('$_', result);
    ret.result = stringifyObj.wrap(result);
  } catch (e) {
    ret.exceptionDetails = {
      exception: stringifyObj.wrap(e),
      text: 'Uncaught',
    };
    ret.result = stringifyObj.wrap(e, {
      generatePreview: true,
    });
  }
  return ret;
};

export const runIfWaitingForDebugger = () => {

};

export const getIsolateId = () => {

};

export const releaseObjectGroup = ({ objectGroup }) => {

};

export const getHeapUsage = () => {

};
