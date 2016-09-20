
import Controller from 'elliptical-controller';

class PageController extends Controller{
  constructor(app,name,pageService,templateRoot){
    super(app,name,'/@action/:id');
    this.service=pageService;
    this.templateRoot=templateRoot;
  }
  
  async Index(req, res, next){
    var id=req.params.id;
    try {
      let page = await this.service.getAsync({id});
      if(!page) next({statusCode:404, message:'Page Not Found',description:'The resource you are looking for could have been removed, had its name changed, or is temporarily unavailable.'});
      else{
        let context = {content:page.content, title:page.title, cssClass:page.cssClass, id:page.id};
        let template=this.templateRoot + page.template;
        var titleElement=document.querySelector('title');
        var metaElement=document.querySelector('meta[name="keywords"]');
        if(titleElement) titleElement.innerHTML=page.title;
        if(metaElement) metaElement.setAttribute('content',page.keywords);
        res.render(context,template);
      }
    } catch (err) {
      next(err);
    }
  }
}

export default PageController;