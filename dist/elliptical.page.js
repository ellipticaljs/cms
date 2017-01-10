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

      this.constructor._data = [];

    }

    _createClass(PageTemplate, [{
      key: 'get',
      value: function get() {
        return this.constructor._data;
      }
    }, {
      key: 'getById',
      value: function getById(id) {
        var data = this.constructor._data;
        return array.findById(data, id);
      }
    }, {
      key: 'getTemplateIds',
      value: function getTemplateIds() {
        var data = this.constructor._data;
        return data.map(function (obj) {
          return obj.id;
        });
      }
    }, {
      key: 'add',
      value: function add(template) {
        template = this._setTemplateImage(template);
        this.constructor._data.push(template);
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
        var data = this.constructor._data;
        var index = array.indexById(data, id);
        this.constructor._data.splice(index, 1);
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
            title: 'Content header',
            body: 'Content goes here'
          }
        };

        this.constructor._data.push(template);
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
          cssClassOptions: ['default', 'reverse', 'mobile-show-image', 'mobile-hide-image', 'reverse-mobile-show-image', 'reverse-mobile-hide-image'],
          placeholder: {
            title: 'Content header',
            body: 'Content goes here',
            image: null
          }
        };

        this.constructor._data.push(template);
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

  PageTemplate["@imageRoot"] = '/images/page/templates';
  PageTemplate["@templateRoot"] = '/app/views/shared/page';

  exports.default = PageTemplate;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-indexedDB-provider', 'moment-import', 'async'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-indexedDB-provider'), require('moment-import'), require('async'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.IndexedDBProvider, global.moment, global.async);
    global.elliptical.PageLocalProvider = mod.exports.default;
  }
})(this, function (exports, _ellipticalIndexedDBProvider, _momentImport, _async) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalIndexedDBProvider2 = _interopRequireDefault(_ellipticalIndexedDBProvider);

  var _momentImport2 = _interopRequireDefault(_momentImport);

  var _async2 = _interopRequireDefault(_async);

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

  var PageLocalProvider = function (_IndexedDBProvider) {
    _inherits(PageLocalProvider, _IndexedDBProvider);

    function PageLocalProvider(version, dbName) {
      _classCallCheck(this, PageLocalProvider);

      version = version ? version : 1;
      dbName = dbName ? dbName : 'EllipticalLocalPageStore';
      var store = "objPages";
      var filterProp = 'title';
      //dbName, store,version,autoIncrement,filterProp,key
      return _possibleConstructorReturn(this, Object.getPrototypeOf(PageLocalProvider).call(this, dbName, store, version, false, filterProp));
    }

    _createClass(PageLocalProvider, [{
      key: 'verify',
      value: function verify(params, resource, callback) {
        var self = this;
        if (params.id.length < 2) {
          if (callback) callback({ statusCode: 400, message: 'invalid id length' }, null);
        } else {
          this.get({}, resource, {}, function (err, data) {
            var result = self.enumerable(data).Where(function (x) {
              return x.id.toLowerCase() == params.id.toLowerCase();
            });
            result = result.ToArray();
            if (result.length > 0) {
              if (callback) callback({ statusCode: 400, message: 'duplicate id' }, null);
            } else {
              if (callback) callback(null, true);
            }
          });
        }
      }
    }, {
      key: 'replaceCategory',
      value: function replaceCategory(params, resource, callback) {
        var self = this;
        var oldCategory = params.oldCategory;
        var category = params.category;
        this.get({}, resource, {}, function (err, data) {
          if (err) callback(err, null);else self._replacePageCategories(data, oldCategory, category, callback);
        });
      }
    }, {
      key: 'onUpgrade',
      value: function onUpgrade(store) {
        if(!store.indexNames.contains('menuOrder')) {
          store.createIndex('menuOrder', 'menuOrder', { unique: false });
        }
      }
    }, {
      key: 'onGet',
      value: function onGet(params, model) {
        var result;
        if(typeof params.isPublished!=='undefined'){
          result = this.enumerable(model).Where(function (x) {
            return ((x.isPublished===params.isPublished));
          });
        }else result=this.enumerable(model);
        
        if (typeof params.showInMenu !== 'undefined') {
          result = this.enumerable(result.ToArray()).Where(function (x) {
            return x.showInMenu === params.showInMenu;
          });
        }
        result = this.enumerable(result.ToArray()).Where(function (x) {
          return x.isContentPage === true;
        });

        return result.ToArray();
      }
    }, {
      key: 'onPost',
      value: function onPost(params) {
        var key = this._key;
        params[key] = params[key].toLowerCase();
        var date = (0, _momentImport2.default)().format();
        params.isPublished = false;
        params.version = 1;
        params.dateCreated = date;
        params.dateUpdated = date;
        return params;
      }
    }, {
      key: 'onPut',
      value: function onPut(params) {
        var key = this._key;
        params[key] = params[key].toLowerCase();
        var date = (0, _momentImport2.default)().format();
        params.version += 1;
        params.dateUpdated = date;
        return params;
      }
    }, {
      key: '_replacePageCategories',
      value: function _replacePageCategories(pages, oldCategory, category, callback) {
        var funcArray = [];
        var put = this._put.bind(this);
        pages.forEach(function (page) {
          var cat = page.category;
          if (cat === oldCategory) {
            page.category = category;
            funcArray.push(function (cb) {
              put(page, cb);
            });
          }
        });

        if (funcArray.length > 0) {
          _async2.default.series(funcArray, function (err, results) {
            if (callback) callback(err, null);
          });
        } else {
          if (callback) callback(null, null);
        }
      }
    }]);

    return PageLocalProvider;
  }(_ellipticalIndexedDBProvider2.default);

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
    }, {
      key: 'replaceCategory',
      value: function replaceCategory(params, resource, callback) {
        this.$provider.post(params, resource, callback);
      }
    }]);

    return PageRestProvider;
  }(_ellipticalRestProvider2.default);

  exports.default = PageRestProvider;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-indexedDB-provider', 'moment-import'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-indexedDB-provider'), require('moment-import'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.IndexedDBProvider);
    global.elliptical.PageCategoryLocalProvider = mod.exports.default;
  }
})(this, function (exports, _ellipticalIndexedDBProvider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalIndexedDBProvider2 = _interopRequireDefault(_ellipticalIndexedDBProvider);

  
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

  var PageCategoryLocalProvider = function (_IndexedDBProvider) {
    _inherits(PageCategoryLocalProvider, _IndexedDBProvider);

    function PageCategoryLocalProvider(version, dbName) {
      _classCallCheck(this, PageCategoryLocalProvider);

      version = version ? version : 1;
      dbName = dbName ? dbName : 'EllipticalLocalPageCategoryStore';
      var store = "objCategories";
      var filterProp = 'id';
      //dbName, store,version,autoIncrement,filterProp,key
      return _possibleConstructorReturn(this, Object.getPrototypeOf(PageCategoryLocalProvider).call(this, dbName, store, version, false, filterProp));
    }

    _createClass(PageCategoryLocalProvider, [{
      key: 'onUpgrade',
      value: function onUpgrade(store) {
        if(!store.indexNames.contains('order')) {
          store.createIndex('order', 'order', { unique: false });
        }
      }
    }]);

    return PageCategoryLocalProvider;
  }(_ellipticalIndexedDBProvider2.default);

  exports.default = PageCategoryLocalProvider;
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
    global.elliptical.PageCategoryRestProvider = mod.exports.default;
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

  var PageCategoryRestProvider = function (_RestProvider) {
    _inherits(PageCategoryRestProvider, _RestProvider);

    function PageCategoryRestProvider() {
      _classCallCheck(this, PageCategoryRestProvider);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PageCategoryRestProvider).apply(this, arguments));
    }

    return PageCategoryRestProvider;
  }(_ellipticalRestProvider2.default);

  exports.default = PageCategoryRestProvider;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-service'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-service'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.Service);
    global.elliptical.PageCategoryService = mod.exports.default;
  }
})(this, function (exports, _ellipticalService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalService2 = _interopRequireDefault(_ellipticalService);

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

  var PageCategoryService = function (_Service) {
    _inherits(PageCategoryService, _Service);

    function PageCategoryService() {
      _classCallCheck(this, PageCategoryService);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(PageCategoryService).apply(this, arguments));
    }

    return PageCategoryService;
  }(_ellipticalService2.default);

  PageCategoryService["@resource"] = 'PageCategory';

  exports.default = PageCategoryService;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'elliptical-service', './pageTemplate', './pageCategoryService', 'elliptical-utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('elliptical-service'), require('./pageTemplate'), require('./pageCategoryService'), require('elliptical-utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elliptical.Service, global.elliptical.PageTemplate, global.elliptical.PageCategoryService, global.elliptical.utils);
    global.elliptical.PageService = mod.exports.default;
  }
})(this, function (exports, _ellipticalService, _pageTemplate, _pageCategoryService, _ellipticalUtils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ellipticalService2 = _interopRequireDefault(_ellipticalService);

  var _pageTemplate2 = _interopRequireDefault(_pageTemplate);

  var _pageCategoryService2 = _interopRequireDefault(_pageCategoryService);

  var _ellipticalUtils2 = _interopRequireDefault(_ellipticalUtils);

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

  var array = _ellipticalUtils2.default.array;
  /*
  
   Page{
   id:String
   title:String
   category:String,
   keywords:String
   isPublished:Boolean
   isContentPage:Boolean
   showInMenu: Boolean
   menuOrder: Number
   dateCreated: DateTime
   dateUpdated:DateTime
   version: Number
   template: String,
   cssClass:String
   content:{ Object
   }
  
  }
  
  
  
   */

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
        $provider.verify(params, resource, callback);
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
      key: 'getMenu',
      value: function getMenu(callback) {
        var self = this;
        var menu = [];
        var pageCategory = new _pageCategoryService2.default();
        this.get({ isPublished: true, showInMenu: true, isContentPage:true }, function (err, pages) {
          pageCategory.orderBy('order').get({}, function (e, categories) {
            categories.forEach(function (obj) {
              obj.pages = self._getMenuItems(pages, obj.id);
              menu.push(obj);
            });
            if(callback) callback(null, menu);
          });
        });
      }
    }, {
      key: 'getMenuAsync',
      value: function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
          var self;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  self = this;
                  return _context2.abrupt('return', new Promise(function (resolve, reject) {
                    self.getMenu(function (err, menu) {
                      if (err) reject(err);else {
                        resolve(menu);
                      }
                    });
                  }));

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function getMenuAsync() {
          return _ref2.apply(this, arguments);
        }

        return getMenuAsync;
      }()
    }, {
      key: 'publish',
      value: function publish(params, callback) {
        var self = this;
        this.get(params, {}, function (err, page) {
          if (err) callback(err, null);else {
            page.isPublished = true;
            self.put(page, callback);
          }
        });
      }
    }, {
      key: 'publishAsync',
      value: function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(params) {
          var page;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.getAsync(params);

                case 2:
                  page = _context3.sent;

                  page.isPublished = true;
                  this.putAsync(page);

                case 5:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function publishAsync(_x2) {
          return _ref3.apply(this, arguments);
        }

        return publishAsync;
      }()
    }, {
      key: 'getSettings',
      value: function getSettings(params, callback) {
        var self = this;
        this.get(params, {}, function (err, page) {
          if (!err) {
            var pageTemplate = new _pageTemplate2.default();
            var data = self._getClone(page);
            var template = pageTemplate.getById(data.template);
            if(template){
              data.cssClassOptions = template.cssClassOptions;
              data.cssOptionsLength = template.cssClassOptions.length;
              data.templates = pageTemplate.getTemplateIds();
            }
            data.categories = [];
            _pageCategoryService2.default.get({}, {}, function (e, result) {
              if (!e) data.categories = result;
              if(callback) callback(null, data);
            });
          } else {
            if(callback) callback(err, null);
          }
        });
      }
    }, {
      key: 'getSettingsAsync',
      value: function () {
        var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(params) {
          var self;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  self = this;
                  return _context4.abrupt('return', new Promise(function (resolve, reject) {
                    self.getSettings(params, function (err, data) {
                      if (err) reject(err);else {
                        resolve(data);
                      }
                    });
                  }));

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function getSettingsAsync(_x3) {
          return _ref4.apply(this, arguments);
        }

        return getSettingsAsync;
      }()
    }, {
      key: 'saveSettings',
      value: function saveSettings(params, callback) {
        var self = this;
        if(params.category==='') params.category=null;
        this.get({id:params.id}, {}, function (err, page) {
          if (err) callback(err, null);else {
            page.isPublished = (params.isPublished === 'true' || params.isPublished===true);
            page.showInMenu = (params.showInMenu === 'true' || params.showInMenu===true);
            page.menuOrder = parseInt(params.menuOrder);
            page.cssClass = params.cssClass;
            page.title = params.title;
            page.template = params.template;
            page.keywords=params.keywords;
            page.category=params.category;
            self.put(page, callback);
          }
        });
      }
    }, {
      key: 'saveSettingsAsync',
      value: function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(params) {
          var page;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return this.getAsync({id:params.id});

                case 2:
                  page = _context5.sent;
                  if(params.category==='') params.category=null;
                  page.isPublished = (params.isPublished === 'true' || params.isPublished===true);
                  page.showInMenu = (params.showInMenu === 'true' || params.showInMenu===true);
                  page.menuOrder = parseInt(params.menuOrder);
                  page.cssClass = params.cssClass;
                  page.title = params.title;
                  page.template = params.template;
                  page.keywords=params.keywords;
                  page.category=params.category;
                  this.putAsync(page);

                case 10:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, this);
        }));

        function saveSettingsAsync(_x4) {
          return _ref5.apply(this, arguments);
        }

        return saveSettingsAsync;
      }()
    }, {
      key: 'replaceCategory',
      value: function replaceCategory(params, callback) {
        var $provider = this.$provider;
        var resource = this['@replaceResource'];
        $provider.replaceCategory(params, resource, callback);
      }
    }, {
      key: 'replaceCategoryAsync',
      value: function () {
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(params) {
          var self;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  self = this;
                  return _context6.abrupt('return', new Promise(function (resolve, reject) {
                    self.replaceCategory(params, function (err, data) {
                      if (err) reject(err);else {
                        resolve(data);
                      }
                    });
                  }));

                case 2:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, this);
        }));

        function replaceCategoryAsync(_x5) {
          return _ref6.apply(this, arguments);
        }

        return replaceCategoryAsync;
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
    }, {
      key: '_getClone',
      value: function _getClone(page) {
        var obj = {};
        for (var key in page) {
          if (page.hasOwnProperty(key)) {
            if (key !== 'content') obj[key] = page[key];
          }
        }
        return obj;
      }
    }, {
      key: '_getMenuItems',
      value: function _getMenuItems(arr, category) {
        var pages = [];
        arr.forEach(function (page) {
          if (page.category === category) pages.push(page);
        });
        return pages.sort(array.sort('menuOrder', false, parseInt));
      }
    }]);

    return PageService;
  }(_ellipticalService2.default);

  PageService["@resource"] = 'Page';
  PageService["@verifyResource"] = 'Page/Verify';
  PageService["@replaceResource"] = 'Page/ReplaceCategory';
  PageService["@templateRoot"] = '/app/views/shared/page';

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

                  if (!page) next({ statusCode: 404, message: 'Page Not Found', description: 'The resource you are looking for could have been removed, had its name changed, or is temporarily unavailable.' });else {
                    context = { content: page.content, title: page.title, cssClass: page.cssClass, id: page.id };
                    template = this.templateRoot + page.template;
                    var titleElement=document.querySelector('title');
                    var metaElement=document.querySelector('meta[name="keywords"]');
                    if(titleElement) titleElement.innerHTML=page.title;
                    if(metaElement) metaElement.setAttribute('content',page.keywords);
                    res.render(context, template);
                  }
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context['catch'](1);

                  next(_context.t0);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[1, 8]]);
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