var _computedKey, _initProto;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2303(this, [[[0, dec], 3, "a"], [[0, dec], 3, _computedKey]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  get a() {
    return this.value;
  }
  get [_computedKey]() {
    return this.value;
  }
}
