var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});

mui('.mui-scroll-wrapper').scroll({
  indicators:false
});

var tools ={
  getSearchObj:function () {
  //获取地址栏参数,封装成一个对象  {name:"zs", age:18, desc:"呵呵呵"}
    var search = location.search;
    //对search字符串进行解码
    search = decodeURI(search);
    //去除？    name=zs&age=18&desc=呵呵呵
    search = search.slice(1);
    //把search切割成一个数组    ["name=zs", "age=18", "desc=呵呵呵"]
    var arr = search.split("&");
    var obj = {};
    // 遍历数组
    arr.forEach(function(v){
      var key = v.split("=")[0];
      var value = v.split("=")[1];
      obj[key] = value;
    });
    return obj;
  },
  getSearch:function(key){
    return this.getSearchObj()[key];
  }
}