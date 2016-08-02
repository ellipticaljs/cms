import {$Local} from 'elliptical-soa';
import RepositoryProvider from 'elliptical-repository-provider';
import moment from 'moment-import';

var PAGE_KEY='Page_CMS';

class PageLocalProvider extends RepositoryProvider {
  constructor(){
    super(PAGE_KEY,$Local);
  }

  get(params,resource,query,callback){
    if(params && params.id) this._repo.get(params,resource,query,callback);
    else{
      var result = this.enumerable().Where(function (x) {
        return ((x.isPublished===params.isPublished));
      });
      result=result.ToArray();
      if(query && query.filter && query.filter !==undefined) result=this.query(query.filter);
      if(callback) callback(null,result);
    }
  }

  post(params,resource,callback){
    var date=moment().format();
    params.isPublished=false;
    params.version=1;
    params.dateCreated=date;
    params.datePublished=date;
    this._repo.post(params,resource,callback);
  }

  put(params,resource,callback){
    var date=moment().format();
    params.version+=1;
    params.datePublished=date;
    this._repo.put(params,resource,callback);
  }
  
  query(filter, asEnumerable){
    var keys = Object.keys(filter);
    filter = filter[keys[0]];
    filter = filter.toLowerCase();
    var result = this.Enumerable().Where(function (x) {
      return ((x.title.toLowerCase().indexOf(filter) == 0) );
    });
    return result.ToArray();
  }
  
  verify(params,resource,callback){
    if(params.id.length < 2){
      if(callback) callback({statusCode:400,message:'invalid id length'},null);
    }else{
      var result = this.Enumerable().Where(function (x) {
        return ((x.id.toLowerCase() == params.id.toLowerCase()) );
      });
      result=result.ToArray();
      if(result.length > 0) {
        if(callback) callback({statusCode:400,message:'duplicate id'},null);
      }else{
        if(callback) callback(null,true);
      }
    }
  }

}


export default PageLocalProvider;