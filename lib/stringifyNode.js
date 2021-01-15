import { trim }              from 'https://lsong.org/scripts/string.js';
import { each, map, filter } from 'https://lsong.org/scripts/array.js';

let id = 1;
const nodes = new Map();
const nodeIds = new Map();

export function getOrCreateNodeId(node) {
  let nodeId = nodeIds.get(node);
  if (nodeId) return nodeId;

  nodeId = id++;
  nodes.set(nodeId, node);
  nodeIds.set(node, nodeId);
  return nodeId;
}

export const wrap = (node, { depth = 1 } = {}) => {
  const nodeId = getOrCreateNodeId(node);
  const { nodeName, nodeType, localName, nodeValue } = node;
  const result = {
    nodeId,
    nodeName,
    nodeType,
    nodeValue: nodeValue || '',
    localName: localName || '',
    backendNodeId: nodeId,
  };

  if (node.parentNode) {
    result.parentId = getOrCreateNodeId(node.parentNode);
  }

  if (node.attributes) {
    const attributes = [];
    each(node.attributes, ({ name, value }) => attributes.push(name, value));
    result.attributes = attributes;
  }

  const childNodes = filterNodes(node.childNodes);
  result.childNodeCount = childNodes.length;
  const hasOneTextNode = result.childNodeCount === 1 && childNodes[0].nodeType === 3;
  if (depth > 0 || hasOneTextNode) {
    result.children = getChildNodes(node, depth);
  }
  return result;
};

const filterNodes = childNodes => {
  return filter(childNodes, isValidNode);
};

export function getNode(nodeId) {
  return nodes.get(nodeId);
}

export function getNodeId(node) {
  return nodeIds.get(node);
}

export const getChildNodes = (node, depth) => {
  const childNodes = filterNodes(node.childNodes);
  return map(childNodes, node => wrap(node, { depth: depth - 1 }));
};

function isValidNode(node) {
  return !(node.nodeType === 3 && trim(node.nodeValue || '') === '');
}

export function clear() {
  nodes.clear();
  nodeIds.clear();
}