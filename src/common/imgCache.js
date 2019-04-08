import md5 from 'md5'
import $plus from './plus'


 let imgCache = function(path){
    return new Promise(function(resolve, reject) {
      
      if(path!=null){

        if(process.env.NODE_ENV == 'development'){
          return resolve(path)
        }

        $plus.plusReady(()=>{

          // 1. 转换网络图片地址为本地缓存图片路径，判断该图片是否存在本地缓存
          // http://...jpg -> md5
          let image_url           = path;

          //获取最后一个.的位置
          let index= image_url.lastIndexOf(".");
          //获取后缀
          let ext = image_url.substr(index+1);
          //输出结果
          // console.log(ext);


          // 缓存目录 _downloads/image/(md5).jpg
          let image_md5           = md5(image_url);
          // 缓存本地图片url
          let local_image_url     = '_downloads/image/'+image_md5+'.' + ext;
          // 平台绝对路径
          let absolute_image_path = plus.io.convertLocalFileSystemURL(local_image_url);

          // console.log('平台绝对路径'+absolute_image_path);

          // 判断本地是否存在该文件，存在就就直接使用，否则就下载
          plus.io.resolveLocalFileSystemURL( local_image_url, function( entry ) {

              if(entry){
                let path = plus.io.convertLocalFileSystemURL(local_image_url)
                // console.log('本地图片存在',path)
                return resolve(path)
              }else{
                  download_img();
              }

          }, function ( error ) {
              // console.log(error)
              // console.log("Resolve file URL failed: ");
              download_img();
          } );
          function download_img(){
              // filename:下载任务在本地保存的文件路径
              let download_task = plus.downloader.createDownload(image_url, {
                  filename: local_image_url
              }, function(download, status) {
                  // 下载失败,删除本地临时文件
                  if(status != 200){
                      // console.log('下载失败,status'+status);
                      if(local_image_url != null){
                          plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
                              entry.remove(function(entry) {
                                  // console.log("临时文件删除成功" + local_image_url);
                                  // 重新下载图片
                                  download_img();
                              }, function(e) {
                                  // console.log("临时文件删除失败" + local_image_url);
                              });
                          });
                      }
                  }else{
                      // 把下载成功的图片显示
                      // 将本地URL路径转换成平台绝对路径
                      // console.log("下载成功" + local_image_url);
                      let path = plus.io.convertLocalFileSystemURL(local_image_url);
                      // console.log("下载成功的绝对路径"+path)
                      return resolve(path)
                  }
              });
              download_task.start();
          }  

        })





      }else{
        return resolve('static/images/wutupian.jpg')
      }




    })
 }
 
export default imgCache;

