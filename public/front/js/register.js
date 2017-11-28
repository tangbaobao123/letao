$(function () {
    //获取验证码功能
    $(".btn_vcode").on("click", function () {
        //1. 只要点击了，先禁用按钮
        var $this = $(this);
        $this.prop("disabled", true).addClass("disabled").text("发送中...")
        
        // 发送ajax请求
        $.ajax({
            type: "get",
            url: "/user/vCode",
            success: function (info) {
                console.log(info.vCode);
                //验证码发送成功了，应该开启倒计时功能。60秒可以重新发送
                var count = 60;
                var timer = setInterval(function () {
                    count--;
                    $this.text(count+"秒后再次发送")
                    if(count===0){
                        clearInterval(timer);
                        $this.prop("disabled",false).removeClass("disabled").text("获取验证码");
                    }
                    
                }, 1000)

            }
        })
    });


    $(".btn_register").on("click",function(e){
        e.preventDefault();

       var username =  $("[name='username']").val();
       var password = $("[name='password']").val();
       var repassword = $("[name='repassword']").val();
       var mobile = $("[name='mobile']").val();
       var vCode = $("[name='vCode']").val();


        if(!username){
            mui.toast("请输入用户名");
            return false;
        }

        if(!password){
            mui.toast("请输入密码");
            return false;
        }

        if(repassword != password){
            mui.toast("两次输入的密码不一致");
            return false;
        }

        if(!mobile){
            mui.toast("请输入手机号");
            return false;
        }


        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast("手机号码格式不对");
            return false;
        }

        if (!vCode) {
            mui.toast("请输入手机验证码");
            return false;
        }


    //    发送ajax请求
    $.ajax({
        type:"post",
        url:"/user/register",
        data:{
            username:username,
            password:password,
            mobile:mobile,
            vCode:vCode
        },
        success:function (info) {
           console.log(info)
           if(info.success){
               mui.toast("恭喜你，注册成功了，一秒后跳转到登录页");
               setTimeout(function(){
                   location.href ="login.html";
               },1000);
           }
           if(info.error){
               mui.toast(info.message);
           }

        }
    })
    })
})