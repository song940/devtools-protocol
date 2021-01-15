import { trigger } from '../lib/connector.js';
import * as stringifyNode from '../lib/stringifyNode.js';

export const enable = () => {
  stringifyNode.clear();
};

/**
 * getDocument
 * Returns the root DOM node (and optionally the subtree) to the caller.
 */
export const getDocument = ({ depth = 1, pierce } = {}) => {
  return {
    root: stringifyNode.wrap(document, { depth, pierce })
  };
};

/**
 * requestChildNodes
 * Requests that children of the node with given id are returned to the caller in form of
 * `setChildNodes` events where not only immediate children are retrieved, but all children down to
 * the specified depth.
 * @param {*} param0 
 */
export const requestChildNodes = ({ nodeId, depth = 1 } = {}) => {
  const node = stringifyNode.getNode(nodeId);
  trigger('DOM.setChildNodes', {
    parentId: nodeId,
    nodes: stringifyNode.getChildNodes(node, depth),
  });
};

export const setNodeValue = () => {
  
};

export const getBoxModel = () => {

};

export const setInspectedNode = () => {

};

export const getMatchedStylesForNode = () => {

};

export const markUndoableState = () => {
  
};