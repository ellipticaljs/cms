import Service from 'elliptical-service';
import PageTemplate from './pageTemplate';
import PageCategory from './pageCategoryService';
import utils from 'elliptical-utils';

var array=utils.array;
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

class PageService extends Service{

  static toId(title){
    return title.replace(/ /g,'-');
  }
  
  static verify(params,callback) {
    var $provider = this.$provider;
    var resource = this['@verifyResource'];
    $provider.verify(params, resource, callback);
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
  
  static getMenu(callback){
    var self=this;
    var menu=[];
    var pageCategory=new PageCategory();
    this.get({isPublished:true, showInMenu:true,isContentPage:true},function(err,pages){
      pageCategory.orderBy('order')
        .get({},function(e,categories){
          categories.forEach(function(obj){
            obj.pages=self._getMenuItems(pages,obj.category);
            menu.push(obj);
          });
          if(callback) callback(null,menu);
        });
    });
  }
  
  static async getMenuAsync(){
    var self=this;
    return new Promise(function(resolve,reject){
      self.getMenu(function(err,menu){
        if(err) reject(err);
        else{
          resolve(menu);
        }
      })
    });
  }

  static publish(params,callback){
    var self=this;
    this.get(params,{},function(err,page){
      if(err) callback(err,null);
      else{
        page.isPublished=true;
        self.put(page,callback);
      }
    });
  }

  static async publishAsync(params){
    var page =await this.getAsync(params);
    page.isPublished=true;
    this.putAsync(page);
  }
  
  static getSettings(params,callback){
    var self=this;
    this.get(params,{},function(err,page){
      if(!err){
        var pageTemplate=new PageTemplate();
        var data=self._getClone(page);
        var template=pageTemplate.getById(data.template);
        data.cssClassOptions=template.cssClassOptions;
        data.cssOptionsLength=template.cssClassOptions.length;
        data.templates=pageTemplate.getTemplateIds();
        data.categories=[];
        PageCategory.get({},{},function(e,result){
          if(!e)data.categories=result;
          if(callback) callback(null,data);
        });

      }else {
        if(callback) callback(err,null);
      }
    });
  }

  static async getSettingsAsync(params){
    var self=this;
    return new Promise(function(resolve,reject){
      self.getSettings(params,function(err,data){
        if(err) reject(err);
        else{
          resolve(data);
        }
      })
    });
  }

  static saveSettings(params,callback){
    var self=this;
    if(params.category==='') params.category=null;
    this.get(params,{},function(err,page){
      if(err) callback(err,null);
      else{
        page.isPublished = (params.isPublished ==='true' || params.isPublished===true);
        page.showInMenu = (params.showInMenu ==='true' || params.showInMenu===true);
        page.menuOrder=parseInt(params.menuOrder);
        page.cssClass=params.cssClass;
        page.title=params.title;
        page.template=params.template;
        page.keywords=params.keywords;
        page.category=params.category;
        self.put(page,callback);
      }
    });
  }

  static async saveSettingsAsync(params){
    if(params.category==='') params.category=null;
    var page =await this.getAsync(params);
    page.isPublished = (params.isPublished ==='true' || params.isPublished===true);
    page.showInMenu = (params.showInMenu ==='true' || params.showInMenu===true);
    page.menuOrder=parseInt(params.menuOrder);
    page.cssClass=params.cssClass;
    page.title=params.title;
    page.template=params.template;
    page.keywords=params.keywords;
    page.category=params.category;
    this.putAsync(page);
  }
  
  static replaceCategory(params,callback) {
    var $provider = this.$provider;
    var resource = this['@updateResource'];
    $provider.replaceCategory(params, resource, callback);
  }

  static async replaceCategoryAsync(params){
    var self=this;
    return new Promise(function(resolve,reject){
      self.replaceCategory(params,function (err, data) {
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

  static _getClone(page){
    var obj={};
    for (var key in page) {
      if (page.hasOwnProperty(key)) {
        if(key!=='content') obj[key]=page[key];
      }
    }
    return obj;
  }

  static _getMenuItems(arr,category){
    var pages=[];
    arr.forEach(function(page){
      if(page.category===category) pages.push(page);
    });
    return pages.sort(array.sort('menuOrder',false,parseInt));
  }
  
}

PageService["@resource"]='Page';
PageService["@verifyResource"]='Page/Verify';
PageService["@replaceResource"]='Page/ReplaceCategory';
PageService["@templateRoot"] ='/app/views/shared/page';

export default PageService;