var _class, _descriptor, _temp, _class3, _descriptor2, _temp2;

function dec(target, name, descriptor) {
  expect(target).toBeTruthy();
  expect(babelHelpers["typeof"](name)).toBe("string");
  expect(babelHelpers["typeof"](descriptor)).toBe("object");
  target.decoratedProps = (target.decoratedProps || []).concat([name]);
  var initializer = descriptor.initializer;

  descriptor.initializer = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return "__" + initializer.apply(this, args) + "__";
  };
}

var Base = (_class = (_temp = function Base() {
  "use strict";

  babelHelpers.classCallCheck(this, Base);
  babelHelpers.initializerDefineProperty(this, "prop2", _descriptor, this);
}, _temp), (_descriptor = babelHelpers.applyDecoratedDescriptor(_class.prototype, "prop2", [dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 4;
  }
})), _class);
var Example = (_class3 = (_temp2 = /*#__PURE__*/function (_Base) {
  "use strict";

  babelHelpers.inherits(Example, _Base);

  var _super = babelHelpers.createSuper(Example);

  function Example() {
    var _this;

    babelHelpers.classCallCheck(this, Example);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    babelHelpers.initializerDefineProperty(_this, "prop", _descriptor2, babelHelpers.assertThisInitialized(_this));
    return _this;
  }

  return Example;
}(Base), _temp2), (_descriptor2 = babelHelpers.applyDecoratedDescriptor(_class3.prototype, "prop", [dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3;
  }
})), _class3);
var inst = new Example();
expect(inst.prop).toBe("__3__");
expect(inst.prop2).toBe("__4__");
