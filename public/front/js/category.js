$(function () {

    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        success:function(info){
            console.log(info);
            $(".lt_category_l .mui-scroll").html(template("tpl_l",info) );
            
            render(info.rows[0].id);
        },

       
    })

    function render(id) { 
        $.ajax({
            type: "get",
            url: "/category/querySecondCategory",
            data: {
                id: id,
            },
            success: function (info) {
                $(".lt_category_r .mui-scroll").html(template("tpl_r", info))
            }
        })
     }

    $(".lt_category_l .mui-scroll").on("click","li",function () {
        $(this).addClass("now").siblings().removeClass("now")
        var id = $(this).data("id");

        render(id)

      })
})