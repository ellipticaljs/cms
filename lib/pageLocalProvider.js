import IndexedDBProvider from 'elliptical-indexedDB-provider'
import moment from 'moment-import';
import async from 'async';

class PageLocalProvider extends IndexedDBProvider {
  constructor(version,dbName){
    version=(version) ? version :1;
    dbName=(dbName) ? dbName : 'EllipticalLocalPageStore';
    var store= "objPages";
    var filterProp='title';
    //dbName, store,version,autoIncrement,filterProp,key
    super(dbName,store,version,false,filterProp);
  }


  verify(params,resource,callback){
    var self=this;
    if(params.id.length < 2){
      if(callback) callback({statusCode:400,message:'invalid id length'},null);
    }else{
      this.get({},resource,{},function(err,data){
        var result = self.enumerable(data).Where(function (x) {
          return ((x.id.toLowerCase() == params.id.toLowerCase()) );
        });
        result=result.ToArray();
        if(result.length > 0) {
          if(callback) callback({statusCode:400,message:'duplicate id'},null);
        }else{
          if(callback) callback(null,true);
        }
      });
    }
  }

  replaceCategory(params,resource,callback){
    var self=this;
    var oldCategory=params.oldCategory;
    var category=params.category;
    this.get({},resource,{},function(err,data){
      if(err) callback(err,null);
      else self._replacePageCategories(data,oldCategory,category,callback);
    });
  }

  onUpgrade(store){
    if(!store.indexNames.contains('menuOrder')) {
      store.createIndex('menuOrder', 'menuOrder', { unique: false });
    }
  }

  onGet(params,model){
    var result;
    if(typeof params.isPublished!=='undefined'){
      result = this.enumerable(model).Where(function (x) {
        return ((x.isPublished===params.isPublished));
      });
    }else result=this.enumerable(model);
    
    if(typeof params.showInMenu !=='undefined'){
      result = this.enumerable(result.ToArray()).Where(function (x) {
        return ((x.showInMenu === params.showInMenu));
      });
    }
    result = this.enumerable(result.ToArray()).Where(function (x) {
      return x.isContentPage === true;
    });
    
    return result.ToArray();
  }


  onPost(params){
    var key=this._key;
    params[key]=params[key].toLowerCase();
    var date=moment().format();
    params.isPublished=false;
    params.version=1;
    params.dateCreated=date;
    params.dateUpdated=date;
    return params;
  }

  onPut(params){
    var key=this._key;
    params[key]=params[key].toLowerCase();
    var date=moment().format();
    params.version+=1;
    params.dateUpdated=date;
    return params;
  }

  _replacePageCategories(pages,oldCategory,category,callback){
    var funcArray=[];
    var put=this._put.bind(this);
    pages.forEach(function(page){
      var cat=page.category;
      if(cat===oldCategory){
        page.category=category;
        funcArray.push(function(cb){put(page,cb)});
      }
    });
    
    if(funcArray.length >0){
      async.series(funcArray,function(err,results){
        if(callback) callback(err,null);
      });
    }else{
      if(callback) callback(null,null);
    }
  }

}


export default PageLocalProvider;