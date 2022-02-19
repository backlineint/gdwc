export default function resolve(path, obj) {
  return path
    .split('.')
    .reduce((prev, curr) => (prev ? prev[curr] : null), obj); // was previously obj || self
}
