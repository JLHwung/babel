var _init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initProto;
const dec = () => {};
class Foo {
  static {
    [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initProto] = babelHelpers.applyDecs2303(this, [[[0, dec], 1, "a", o => o.#A, (o, v) => o.#A = v], [[0, dec], 1, "b", o => o.#B, (o, v) => o.#B = v]], [], _ => #a in _).e;
  }
  #A = (_initProto(this), _init_a(this));
  set #a(v) {
    _set_a(this, v);
  }
  get #a() {
    return _get_a(this);
  }
  #B = _init_b(this, 123);
  set #b(v) {
    _set_b(this, v);
  }
  get #b() {
    return _get_b(this);
  }
}
