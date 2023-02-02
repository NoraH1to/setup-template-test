const dpMerge = (source, target) => {
  for (const key in target) {
    const s = source[key];
    const t = target[key];
    const res = {};
    if (
      !Array.isArray(s) &&
      !Array.isArray(t) &&
      typeof s === 'object' &&
      typeof t === 'object'
    ) {
      res[key] = dpMerge(s, t);
    } else res[key] = t;
  }
};

export default () => {
  return {
    onMerge({ src, dest }) {
      if (src.filename === 'package.json')
        return JSON.stringify(dpMerge(dest.getJson(), src.getJson()));
      return src.getContent();
    },
  };
};
