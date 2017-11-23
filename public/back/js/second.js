/**
 * Created by Air on 2017/11/22.
 */
$(function () {
    //二级分类的分页渲染功能
    var currentPage = 1;
    var pageSize = 5;
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
})