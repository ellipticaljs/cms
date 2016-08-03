(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.utils);
    global.elliptical.PageTemplate = mod.exports.default;
  }
})(this, function (exports, _ellipticalUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalUtils2 = _interopRequireDefault(_ellipticalUtils);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var array = _ellipticalUtils2.default.array;
  var string = _ellipticalUtils2.default.string;

  /*
  
    template{
      id:String
      name:String
      description:String,
      image:String,
      cssClassOptions:Array<String>
      placeholder:Object
    }
  
   */

  var PageTemplate = function () {
    function PageTemplate() {
      _classCallCheck(this, PageTemplate);

      this._data = [];
      this._init();
    }

    _createClass(PageTemplate, [{
      key: 'get',
      value: function get() {
        return this._data;
      }
    }, {
      key: 'getById',
      value: function getById(id) {
        var data = this._data;
        return array.findById(data, id);
      }
    }, {
      key: 'add',
      value: function add(template) {
        template = this._setTemplateImage(template);
        this._data.push(template);
      }
    }, {
      key: 'addArray',
      value: function addArray(templateArr) {
        var self = this;
        templateArr.forEach(function (template) {
          template = self._setTemplateImage(template);
        });
        this._data.concat(templateArr);
      }
    }, {
      key: 'update',
      value: function update(template) {
        template = this._setTemplateImage(template);
        this._replace(template);
      }
    }, {
      key: 'remove',
      value: function remove(id) {
        var data = this._data;
        var index = array.indexById(data, id);
        this._data.splice(index, 1);
      }
    }, {
      key: 'removeArray',
      value: function removeArray(idArray) {
        var _this = this;

        idArray.forEach(function (id) {
          return _this.remove(id);
        });
      }
    }, {
      key: '_init',
      value: function _init() {
        this._templateArticleSimple();
        this._templateArticleImage();
      }
    }, {
      key: '_templateArticleSimple',
      value: function _templateArticleSimple() {
        var imageRoot = this.constructor["@imageRoot"];
        var template = {
          id: 'article-simple',
          name: 'Simple article',
          description: null,
          image: imageRoot + '/article-simple.svg',
          cssClassOptions: [],
          placeholder: {
            title: 'Content title',
            body: 'Content goes here'
          }
        };

        this._data.push(template);
      }
    }, {
      key: '_templateArticleImage',
      value: function _templateArticleImage() {
        var imageRoot = this.constructor["@imageRoot"];
        var template = {
          id: 'article-image',
          name: 'Two column article with image',
          description: null,
          image: imageRoot + '/article-image.svg',
          cssClassOptions: [],
          placeholder: {
            title: 'Content title',
            body: 'Content goes here'
          }
        };

        this._data.push(template);
      }
    }, {
      key: '_replace',
      value: function _replace(newTemplate) {
        var old = this.getById(newTemplate.id);
        for (var key in old) {
          if (old.hasOwnProperty(key)) {
            if (newTemplate[key] !== undefined) old[key] = newTemplate[key];
          }
        }
      }
    }, {
      key: '_setTemplateImage',
      value: function _setTemplateImage(template) {
        var imageRoot = this.constructor["@imageRoot"];
        if (string.firstChar(template.image) !== '/') {
          template.image = imageRoot + '/' + template.image;
        }
        return template;
      }
    }]);

    return PageTemplate;
  }();

  PageTemplate["@imageRoot"] = '/images/cms/templates';
  PageTemplate["@templateRoot"] = '/app/views/shared/cms';

  exports.default = PageTemplate;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-soa', 'elliptical-repository-provider', 'moment-import'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-soa'), require('elliptical-repository-provider'), require('moment-import'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical, global.elliptical.RepositoryProvider, global.momentImport);
    global.elliptical.PageLocalProvider = mod.exports.default;
  }
})(this, function (exports, _ellipticalSoa, _ellipticalRepositoryProvider, _momentImport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalRepositoryProvider2 = _interopRequireDefault(_ellipticalRepositoryProvider);

  var _momentImport2 = _interopRequireDefault(_momentImport);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var PAGE_KEY = 'Page_CMS';

  var PageLocalProvider = function (_RepositoryProvider) {
    _inherits(PageLocalProvider, _RepositoryProvider);

    function PageLocalProvider() {
      _classCallCheck(this, PageLocalProvider);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PageLocalProvider).call(this, PAGE_KEY, _ellipticalSoa.$Local));
    }

    _createClass(PageLocalProvider, [{
      key: 'get',
      value: function get(params, resource, query, callback) {
        if (params && params.id) this._repo.get(params, resource, query, callback);else {
          var result = this.enumerable().Where(function (x) {
            return x.isPublished === params.isPublished;
          });
          result = result.ToArray();
          if (query && query.filter && query.filter !== undefined) result = this.query(query.filter);
          if (callback) callback(null, result);
        }
      }
    }, {
      key: 'post',
      value: function post(params, resource, callback) {
        var date = (0, _momentImport2.default)().format();
        params.isPublished = false;
        params.version = 1;
        params.dateCreated = date;
        params.datePublished = date;
        this._repo.post(params, resource, callback);
      }
    }, {
      key: 'put',
      value: function put(params, resource, callback) {
        var date = (0, _momentImport2.default)().format();
        params.version += 1;
        params.datePublished = date;
        this._repo.put(params, resource, callback);
      }
    }, {
      key: 'query',
      value: function query(filter, asEnumerable) {
        var keys = Object.keys(filter);
        filter = filter[keys[0]];
        filter = filter.toLowerCase();
        var result = this.enumerable().Where(function (x) {
          return x.title.toLowerCase().indexOf(filter) == 0;
        });
        return result.ToArray();
      }
    }, {
      key: 'verify',
      value: function verify(params, resource, callback) {
        if (params.id.length < 2) {
          if (callback) callback({ statusCode: 400, message: 'invalid id length' }, null);
        } else {
          var result = this.enumerable().Where(function (x) {
            return x.id.toLowerCase() == params.id.toLowerCase();
          });
          result = result.ToArray();
          if (result.length > 0) {
            if (callback) callback({ statusCode: 400, message: 'duplicate id' }, null);
          } else {
            if (callback) callback(null, true);
          }
        }
      }
    }]);

    return PageLocalProvider;
  }(_ellipticalRepositoryProvider2.default);

  exports.default = PageLocalProvider;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-rest-provider'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-rest-provider'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.RestProvider);
    global.elliptical.PageRestProvider = mod.exports.default;
  }
})(this, function (exports, _ellipticalRestProvider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalRestProvider2 = _interopRequireDefault(_ellipticalRestProvider);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var PageRestProvider = function (_RestProvider) {
    _inherits(PageRestProvider, _RestProvider);

    function PageRestProvider() {
      _classCallCheck(this, PageRestProvider);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PageRestProvider).apply(this, arguments));
    }

    _createClass(PageRestProvider, [{
      key: 'verify',
      value: function verify(params, resource, callback) {
        this.$provider.post(params, resource, callback);
      }
    }]);

    return PageRestProvider;
  }(_ellipticalRestProvider2.default);

  exports.default = PageRestProvider;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-service', './pageTemplate'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-service'), require('./pageTemplate'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.Service, global.elliptical.PageTemplate);
    global.elliptical.PageService = mod.exports.default;
  }
})(this, function (exports, _ellipticalService, _pageTemplate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalService2 = _interopRequireDefault(_ellipticalService);

  var _pageTemplate2 = _interopRequireDefault(_pageTemplate);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var PageService = function (_Service) {
    _inherits(PageService, _Service);

    function PageService() {
      _classCallCheck(this, PageService);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PageService).apply(this, arguments));
    }

    _createClass(PageService, null, [{
      key: 'toId',
      value: function toId(title) {
        return title.replace(/ /g, '-');
      }
    }, {
      key: 'verify',
      value: function verify(params, callback) {
        var $provider = this.$provider;
        var resource = this['@verifyResource'];
        $provider.verify(params, resource, function (err, data) {
          if (callback) callback(err, data);
        });
      }
    }, {
      key: 'verifyAsync',
      value: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(params) {
          var $provider, resource;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  $provider = this.$provider;
                  resource = this['@verifyResource'];
                  return _context.abrupt('return', new Promise(function (resolve, reject) {
                    $provider.verify(params, resource, function (err, data) {
                      if (err) reject(err);else {
                        resolve(data);
                      }
                    });
                  }));

                case 3:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function verifyAsync(_x) {
          return _ref.apply(this, arguments);
        }

        return verifyAsync;
      }()
    }, {
      key: 'setTemplateRoot',
      value: function setTemplateRoot(root) {
        this["@templateRoot"] = root;
        _pageTemplate2.default["@templateRoot"] = root;
      }
    }, {
      key: 'getTemplateRoot',
      value: function getTemplateRoot() {
        return this["@templateRoot"];
      }
    }]);

    return PageService;
  }(_ellipticalService2.default);

  PageService["@resource"] = 'Page';
  PageService["@verifyResource"] = 'Page/verify';
  PageService["@templateRoot"] = '/app/views/shared/cms';

  exports.default = PageService;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-controller'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-controller'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.Controller);
    global.elliptical.PageController = mod.exports.default;
  }
})(this, function (exports, _ellipticalController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalController2 = _interopRequireDefault(_ellipticalController);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var PageController = function (_Controller) {
    _inherits(PageController, _Controller);

    function PageController(app, name, pageService, templateRoot) {
      _classCallCheck(this, PageController);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PageController).call(this, app, name, '/@action/:id'));

      _this.service = pageService;
      _this.templateRoot = templateRoot;
      return _this;
    }

    _createClass(PageController, [{
      key: 'Index',
      value: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
          var id, page, context, template;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  id = req.params.id;
                  _context.prev = 1;
                  _context.next = 4;
                  return this.service.getAsync({ id: id });

                case 4:
                  page = _context.sent;
                  context = { content: page.content };
                  template = this.templateRoot + id;

                  res.render(context, template);
                  _context.next = 13;
                  break;

                case 10:
                  _context.prev = 10;
                  _context.t0 = _context['catch'](1);

                  next(_context.t0);

                case 13:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 10]]);
        }));

        function Index(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        }

        return Index;
      }()
    }]);

    return PageController;
  }(_ellipticalController2.default);

  exports.default = PageController;
});