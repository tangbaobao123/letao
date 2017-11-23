/**
 * Created by Air on 2017/11/22.
 */
$(function () {
    //去后端获取数据，渲染到页面中
    var currentPage = 1;
    var pageSize = 5;

    //页面一加载就需要渲染一次
    render();

    function render() {
        //发送ajax请求，获取数据
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);

                //把数据渲染到tbody中
                var html = template("tpl",info);
                $("tbody").html(html);

                //渲染分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total/pageSize),
                    onPageClicked:function (a,b,c,page) {
                        currentPage=page;
                        render();
                    }

                });

            }
        })
    }


    //启用禁用功能
    //1. 需要给表格中所有的按钮，注册点击事件（委托事件）
    $('tbody').on('click','.btn',function () {
        $("#userModal").modal("show");

        //获取到对应的id
        var id = $(this).parent().data("id");
        var isDelete = $(this).hasClass("btn-danger")?0:1;

        //给确定按钮注册事件
        $(".btn_confirm").off().on('click',function () {
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function (info) {
                    if(info.success){
                        //关闭模态框
                        $("#userModal").modal("hide");
                    //重新渲染表格
                        render();
                    }
                }
            })
        })

    })
})