
import utils from 'elliptical-utils';

var array=utils.array;
var string=utils.string;

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

class PageTemplate{
  constructor(){
    this._data=[];
    this._init();
  }

  static get(){
     return this._data;
  }

  static getById(id){
    var data= this._data;
    return array.findById(data,id);
  }

  static add(template){
    template=this._setTemplateImage(template);
    this._data.push(template);
  }

  static addArray(templateArr){
    var self=this;
    templateArr.forEach(function(template){
      template=self._setTemplateImage(template);
    });
    this._data.concat(templateArr);
  }

  static update(template){
    template=this._setTemplateImage(template);
    this._replace(template);
  }

  static remove(id){
    var data=this._data;
    var index=array.indexById(data,id);
    this._data.splice(index, 1);
  }

  static removeArray(idArray){
    idArray.forEach((id)=>this.remove(id));
  }

  static _init(){
    this._templateArticleSimple();
    this._templateArticleImage();
  }

  static _templateArticleSimple(){
    var imageRoot=PageTemplate["@imageRoot"];
    var template={
      id:'article-simple',
      name:'Simple article',
      description:null,
      image:imageRoot + '/article-simple.svg',
      cssClassOptions:[],
      placeholder:{
        title:'Content title',
        body:'Content goes here'
      }
    };

    this._data.push(template);
  }

  static _templateArticleImage(){
    var imageRoot=PageTemplate["@imageRoot"];
    var template={
      id:'article-image',
      name:'Two column article with image',
      description:null,
      image:imageRoot + '/article-image.svg',
      cssClassOptions:[],
      placeholder:{
        title:'Content title',
        body:'Content goes here'
      }
    };

    this._data.push(template);
  }
  
  static _replace(newTemplate){
    var old=this.getById(newTemplate.id);
    for(var key in old){
      if(old.hasOwnProperty(key)){
        if(newTemplate[key] !==undefined) old[key]=newTemplate[key];
      }
    }
  }
  
  static _setTemplateImage(template){
    var imageRoot=PageTemplate["@imageRoot"];
    if(string.firstChar(template.image)!=='/'){
      template.image=imageRoot + '/' + template.image;
    }
    return template;
  }
}

PageTemplate["@imageRoot"] ='/images/cms/templates';
PageTemplate["@templateRoot"] ='/app/views/shared/cms';

export default PageTemplate;