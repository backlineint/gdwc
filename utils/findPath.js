const findPath = (ob, key) => {
  const path = [];
  const keyExists = obj => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return true;
    }
    if (Array.isArray(obj)) {
      const parentKey = path.length ? path.pop() : '';

      for (let i = 0; i < obj.length; i += 1) {
        path.push(`${parentKey}[${i}]`);
        const result = keyExists(obj[i], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    } else {
      // TODO - refactor to iterate over object.
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    return false;
  };

  keyExists(ob);

  return path.join('.');
};

export default findPath;
