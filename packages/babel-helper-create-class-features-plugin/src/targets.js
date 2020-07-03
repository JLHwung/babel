import { hasOwnDecorators } from "./decorators.js";

const NATIVES = Object.freeze({
  publicProperty: 1,
  privateProperty: 1 << 1,
});

const nativesKey = "@babel/plugin-class-features/nativesKey";

function supports(file, feature) {
  return !!(file.get(nativesKey) & feature);
}

export function declareSupport(file, feature) {
  file.set(nativesKey, file.get(nativesKey) | feature);
}
/**
 * Check if a class path can skip transforming in a given file
 *
 * @export
 * @param {*} path
 * @param {*} file
 */
export function shouldSkipTransform(path, file) {
  let hasDecorators = hasOwnDecorators(path.node);
  let hasPrivateProperties = false;
  let hasPrivateMethods = false;
  let hasPublicProperties = false;
  const body = path.get("body");
  for (const elementPath of (body.get("body"): Array)) {
    hasDecorators = hasDecorators || hasOwnDecorators(elementPath.node);
    hasPrivateProperties =
      hasPrivateProperties || elementPath.isClassPrivateProperty();
    hasPublicProperties = hasPublicProperties || elementPath.isClassProperty();
    hasPrivateMethods = hasPrivateMethods || elementPath.isClassPrivateMethod();
  }
  if (hasDecorators || hasPrivateMethods) {
    // todo: check privateIn
    return false;
  } else {
    switch (true) {
      case hasPublicProperties && hasPrivateProperties:
        return (
          supports(file, NATIVES.publicProperty) &&
          supports(file, NATIVES.privateProperty)
        );
      case hasPublicProperties && !hasPrivateProperties:
        return supports(file, NATIVES.publicProperty);
      case !hasPublicProperties && hasPrivateProperties:
        return supports(file, NATIVES.privateProperty);
      case !hasPublicProperties && !hasPrivateProperties:
      // fall through
      default:
        return true;
    }
  }
}
