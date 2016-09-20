import IndexedDBProvider from 'elliptical-indexedDB-provider'


class PageCategoryLocalProvider extends IndexedDBProvider {
  constructor(version,dbName){
    version=(version) ? version :1;
    dbName=(dbName) ? dbName : 'EllipticalLocalPageCategoryStore';
    var store= "objCategories";
    var filterProp='id';
    //dbName, store,version,autoIncrement,filterProp,key
    super(dbName,store,version,false,filterProp);
  }

  
  onUpgrade(store){
    if(!store.indexNames.contains('order')) {
      store.createIndex('order', 'order', { unique: false });
    }
  }
  

}


export default PageCategoryLocalProvider;