/**
 * Created by Air on 2017/11/21.
 */
$(function () {
    //表单校验的功能
    //1. 用户名不能为空
    //2. 用户密码不能为空
    //3. 用户密码的长度是6-12位

    //如何使用表单校验插件：
    //1. 引包
    //2. 调用bootstrapValidator
    var $form = $("form");
    $form.bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons:{
            valid:'glyphicon glphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    callback:{
                        message: '用户名不正确'
                    }
                }
            },
            password:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    callback:{
                        message: '密码不正确'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    },
                }
            }
        }
    })

    //需要给表单注册一个校验成功的事件  success.form.bv
        $form.on('success.form.bv',function (e) {
            e.preventDefault();//阻止浏览器默认事件的发生
            //使用ajax提交逻辑
            $.ajax({
                type:'post',
                url:'/employee/employeeLogin',
                data:$form.serialize(),//表单序列化
                //username=wwee&password=123
                success:function (data) {
                    console.log(data)
                    //如果成功，就跳转到首页
                    if(data.success){
                        location.href = 'index.html';
                    }
                    if(data.error === 1000){
                        //手动调用方法，updateStatus让username校验失败即可
                        //第一个参数：改变哪个字段
                        //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
                        //第三个参数：选择提示的信息
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback')
                    }
                    if(data.error===1001){
                        $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                    }
                }
                
            })
        })


    //重置表单
    $("[type = 'reset']").on("click",function () {
        $form.data("bootstrapValidator").resetForm();
    })
})

