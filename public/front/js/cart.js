$(function () {

//mui中的下拉功能中 click会失效

    //下拉刷新功能
    mui.init({
        // 配置下拉刷新以及上拉加载
        pullRefresh: {
            container: ".mui-scroll-wrapper",//获取下拉的容器
            down: {
                //进入页面自动刷新
                auto: true,
                //下拉刷新时触发
                callback: function () {
                    $.ajax({
                        type: "get",
                        url: "/cart/queryCart",
                        success: function (info) {
                            console.log(info)
                            if(info.error === 400){
                                location.href = "login.html?retUrl="+location.href;
                            }

                            setTimeout(function () {
                                $(".mui-table-view").html(template("tpl", { list: info }));
                                // 结束下拉刷新
                                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                            },1000)
                        }
                    })
                }
            }
        }
    })

    //删除功能
    $(".mui-table-view").on("tap",".btn_delete",function(){
        var $this = $(this);
        var id = $this.data("id");
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            data:{
                id:id,
            },
            success:function (data) {
                if(data.success){
                    //重新加载
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading()
                }
            }
        })
    })

    // 编辑功能
    $(".mui-table-view").on("tap",".btn_edit",function(){
        var data = this.dataset;
        console.log(data)
        var html = template("tpl2",data);
        html = html.replace( /\n/g ,"" )

        mui.confirm(html,"编辑内容",["确定","取消"],function(e){
            if(e.index==0){
                var id = data.id;
                console.log(id)
                var size = $(".lt_edit_size span.now").text();
                var num = $(".mui-numbox-input").val();
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:id,
                        size:size,
                        num:num,
                    },
                    success:function (data) {
                        //console.log(data)
                        if(data.success){
                            //重新加载
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading()
                        }
                    }
                })
            }
        })

        $(".lt_edit_size span").on("tap",function(){
            $(this).addClass("now").siblings().removeClass("now");
        })
        //初始化numbox
        mui(".mui-numbox").numbox()
    })

    //计算总金额
    //获取到页面中所有的checkbox
    $("body").on("change",".ck",function () {
      //获取到选中的哪些checkbox
      var total = 0;

      $(":checked").each(function(){
          var price = $(this).data("price");
          var num = $(this).data("num");
          total += price * num;
      });
      $(".lt_total .total").text(total.toFixed(2));
    })

})