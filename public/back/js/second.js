/**
 * Created by Air on 2017/11/22.
 */
$(function () {
    //二级分类的分页渲染功能
    var currentPage = 1;
    var pageSize = 5;

    //渲染页面
    render()
    function render() {
        //发送ajax
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);

                $("tbody").html(template("tpl",info));

                //分页渲染
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total/pageSize),
                    onPageClicked:function (a,b,c,page) {
                        currentPage = page;
                        render();
                    }
                })

            }

        })
    }

    //添加功能
    $(".btn_add").on("click",function () {
        //显示模态框
        $("#addModal").modal("show");

        //发送ajax请求，获取所有的一级分类数据，渲染下拉框组建
        $.ajax({
            tpye:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100,
            },
            success:function (data) {
                console.log(data);
                $(".dropdown-menu").html( template("tpl2",data) );
            }
        })


        //给a注册事件
        $(".dropdown-menu").on("click","a",function () {
           
            //设置按钮的内容
            $(".dropdown-text").text($(this).text());
            
            //获取a的id值
            $('[name="categoryId"]').val( $(this).data('id') );

            //让categoryId的状态发生改变
            $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
            
        })

        //初始化图片上传
        $("#fileupload").fileupload({
            dataType:"json",//指定响应的格式
            done:function (e, data) {//图片上传成功之后的回调函数
                //通过data.result.picAddr可以获取到图片上传后的路径
                console.log(data);
                console.log(data.result.picAddr);
                $(".img_box img").attr("src",data.result.picAddr);

                $('[name="brandLogo"]').val(data.result.picAddr);

                $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
            }
        });

    //    表单校验
        //2. 调用bootstrapValidator
        var $form = $("#form");
        $form.bootstrapValidator({
            excluded: [],
            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons:{
                valid:'glyphicon glyphicon-ok',
                invalid:'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
        //    指定校验字段
            fields:{
            //   校验对应name表单的name属性
                categoryId:{
                    validators:{
                        notEmpty:{
                            message: '请输入一级分类'
                        }
                    }
                },
                brandName:{
                    validators:{
                        notEmpty:{
                            message: '请输入二级分类'
                        }
                    }
                },
                brandLogo:{
                    validators:{
                        notEmpty:{
                            message: '请上传文件'
                        }
                    }
                }
            }
        })


        $form.on('success.form.bv', function (e) {
            e.preventDefault();
            //使用ajax提交逻辑
            $.ajax({
                type:"POST",
                url:"/category/addSecondCategory",
                data:$form.serialize(),//表单序列化
                success:function (data) {
                    if(data.success){
                        $("#addModal").modal("hide");
                        //重新渲染第一页
                        currentPage = 1;
                        render();

                        //清空插件中的内容
                        $form.data("bootstrapValidator").resetForm();
                        $form.get(0).reset();


                        $(".dropdown-text").text("请选择一级分类");
                        $(".img_box img").attr("src","./img/none.png");
                        $("[name='categoryId']").val("");
                        $("[name='brandLogo']").val("")
                    }
                }
            })
        });
    })
})






