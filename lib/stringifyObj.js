
let id = 1;
const selfs = new Map();
const objects = new Map();
const objectIds = new Map();

function getOrCreateObjId(obj, self) {
  let objId = objectIds.get(obj);
  if (objId) return objId;
  objId = JSON.stringify({
    injectedScriptId: 0,
    id: id++,
  });
  selfs.set(objId, self);
  objects.set(objId, obj);
  objectIds.set(obj, objId);
  return objId;
}

export function clear() {
  selfs.clear();
  objects.clear();
  objectIds.clear();
}

export const wrap = (value, { generatePreview = false, self = value } = {}) => {
  const ret = basic(value);
  const { type, subtype } = ret;

  if (type === 'undefined') {
    return ret;
  }

  if (type === 'string' || type === 'boolean' || subtype === 'null') {
    ret.value = value;
    return ret;
  }

  if (type === 'number') {
    ret.description = toStr(value);
    ret.value = value;
    return ret;
  }

  if (type === 'symbol') {
    ret.objectId = getOrCreateObjId(value, self);
    ret.description = toStr(value);
    return ret;
  }

  if (type === 'function') {
    ret.className = 'Function';
    ret.description = toSrc(value);
  } else if (subtype === 'array') {
    ret.className = 'Array';
    ret.description = `Array(${value.length})`;
  } else if (subtype === 'regexp') {
    ret.className = 'RegExp';
    ret.description = toStr(value);
  } else if (subtype === 'error') {
    ret.className = value.name;
    ret.description = value.stack;
  } else {
    ret.className = getType(value, false);
    ret.description = ret.className;
  }

  if (generatePreview) {
    ret.preview = {
      ...ret,
      // ...preview(value, self),
    };
  }

  ret.objectId = getOrCreateObjId(value, self);
  return ret;
};


function basic(value) {
  const type = typeof value;
  const ret = { type };

  if (value === null) {
    ret.subtype = 'null';
  } else if (Array.isArray(value)) {
    ret.subtype = 'array';
  } else if (value instanceof RegExp) {
    ret.subtype = 'regexp';
  } else if (value instanceof Error) {

    ret.subtype = 'error';
  }
  return ret;
}