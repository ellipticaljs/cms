
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
      let context = {content:page.content};
      let template=this.templateRoot + id;
      res.render(context,template);
    } catch (err) {
      next(err);
    }
  }
}

export default PageController;