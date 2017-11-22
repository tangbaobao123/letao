/**
 * Created by Air on 2017/11/21.
 */

//注册一个全局的ajaxStart事件，所有的ajax在开启的时候，会触发这个事件
$(document).ajaxStart(function () {
    //开心进度条
    NProgress.start();
})

$(document).ajaxStop(function () {
    //关闭进度条
    NProgress.done();
})

//二级分类显示隐藏功能
$(".child").prev().on("click",function () {
    $(this).next().slideToggle();
});


//侧边栏
$(".icon-menu").on("click",function(){
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");
})

//退出功能
$(".icon_logout").on("click",function () {
    $("#logoutModal").modal("show");
})

$(".btn_logout").on("click",function () {
    $.ajax({
        tpye:"get",
        url:"/employee/employeeLogout",
        success:function(data){
            if(data.success){
                location.href = "login.html";
            }
        }
    })
})


//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
if(location.href.indexOf("login.html")==-1){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function (data) {
            if(data.error === 400){
                location.href = "login.html";
            }

        }
    })
}

