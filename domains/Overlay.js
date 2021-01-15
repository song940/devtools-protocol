import { getNode, getNodeId } from '../lib/stringifyNode.js';

export const enable = () => {

};

export const setShowViewportSizeOnResize = () => {

};

const transparent = { r: 0, g: 0, b: 0, a: 0 };

/**
 * highlightNode
 * Highlights DOM node with given id or with the given JavaScript object wrapper. Either nodeId or
 * objectId must be specified.
 */
export const highlightNode = ({ nodeId, highlightConfig }) => {
  const {
    borderColor = transparent,
    contentColor = transparent,
    marginColor = transparent,
    paddingColor = transparent,
    showInfo,
    showRulers,
    showStyles,
    showExtensionLines,
    shapeColor,
    shapeMarginColor,
    cssGridColor,
    eventTargetColor,
  } = highlightConfig;
  let node;
  if (nodeId) node = getNode(nodeId);

  if (node.nodeType === 3) {
    const range = document.createRange();
    range.selectNode(node);
    const { left, width, top, height } = range.getBoundingClientRect();
    range.detach();
  }
};

export const hideHighlight = () => {

};