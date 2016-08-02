import RestProvider from 'elliptical-rest-provider';

class PageRestProvider extends RestProvider{
  
  verify(params,resource,callback){
    this.$provider.post(params,resource,callback);
  }
}


export default PageRestProvider;