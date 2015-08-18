import isPlainObject from 'lodash.isplainobject';

const validKeys = {
  type: true,
  payload: true,
  error: true,
  meta: true
};

function isValidKey(key) {
  return validKeys[key];
}

export function isRSA(action) {
  if (!isPlainObject(action)) {
    return false;
  }
  const { type, error, payload } = action;
  const typeofType = typeof type;
  if (typeofType !== 'string' && typeofType !== 'symbol') {
    return false;
  }
  if (!Object.keys(action).every(isValidKey)) {
    return false;
  }

  if (error && !(payload instanceof Error)) {
    return false;
  }
  if (payload instanceof Error && !error) {
    return false;
  }
  return true;
}
