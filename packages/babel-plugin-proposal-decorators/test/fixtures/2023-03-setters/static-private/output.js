var _call_a, _initStatic;
const dec = () => {};
class Foo {
  static {
    [_call_a, _initStatic] = babelHelpers.applyDecs2303(this, [[dec, 12, "a", function (v) {
      return this.value = v;
    }]], []).e;
    _initStatic(this);
  }
  static value = 1;
  static set #a(v) {
    _call_a(this, v);
  }
  static setA(v) {
    this.#a = v;
  }
}
