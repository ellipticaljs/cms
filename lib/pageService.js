import Service from 'elliptical-service';
import PageTemplate from './pageTemplate';
/*

 Page{
 id:String
 title:String
 isPublished:Boolean
 dateCreated: DateTime
 datePublished:DateTime
 version: Number
 template: String,
 cssClass:String
 content:{ Object
 }

}

 */

class PageService extends Service{

  static verify(params,callback){
    var $provider = this.$provider;
    var resource = this['@verifyResource'];
    $provider.verify(params, resource, function (err, data) {
      if (callback) callback(err, data);
    });
  }

  static async verifyAsync(params){
    var $provider = this.$provider;
    var resource = this['@verifyResource'];
    return new Promise(function(resolve,reject){
      $provider.verify(params, resource,function (err, data) {
        if(err) reject(err);
        else{
          resolve(data);
        }
      });
    });
  }
  
  static setTemplateRoot(root){
    this["@templateRoot"]=root;
    PageTemplate["@templateRoot"]=root;
  }

  static getTemplateRoot(){
    return this["@templateRoot"];
  }
  
}

PageService["@resource"]='Page';
PageService["@verifyResource"]='Page/verify';
PageService["@templateRoot"] ='/app/views/shared/cms';

export default PageService;