
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

  get(){
     return this._data;
  }

  getById(id){
    var data= this._data;
    return array.findById(data,id);
  }

  add(template){
    template=this._setTemplateImage(template);
    this._data.push(template);
  }

  addArray(templateArr){
    var self=this;
    templateArr.forEach(function(template){
      template=self._setTemplateImage(template);
    });
    this._data.concat(templateArr);
  }

  update(template){
    template=this._setTemplateImage(template);
    this._replace(template);
  }

  remove(id){
    var data=this._data;
    var index=array.indexById(data,id);
    this._data.splice(index, 1);
  }

  removeArray(idArray){
    idArray.forEach((id)=>this.remove(id));
  }

  _init(){
    this._templateArticleSimple();
    this._templateArticleImage();
  }

  _templateArticleSimple(){
    var imageRoot=this.constructor["@imageRoot"];
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

  _templateArticleImage(){
    var imageRoot=this.constructor["@imageRoot"];
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
  
  _replace(newTemplate){
    var old=this.getById(newTemplate.id);
    for(var key in old){
      if(old.hasOwnProperty(key)){
        if(newTemplate[key] !==undefined) old[key]=newTemplate[key];
      }
    }
  }
  
  _setTemplateImage(template){
    var imageRoot=this.constructor["@imageRoot"];
    if(string.firstChar(template.image)!=='/'){
      template.image=imageRoot + '/' + template.image;
    }
    return template;
  }
}

PageTemplate["@imageRoot"] ='/images/cms/templates';
PageTemplate["@templateRoot"] ='/app/views/shared/cms';

export default PageTemplate;