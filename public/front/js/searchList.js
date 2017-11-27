$(function () {
    //1. 获取地址栏中的key对应的值，设置到文本框search_input中
    var key = tools.getSearch("key");
    $(".search_input").val(key);

    render();


    // 点击搜索,重新渲染
    $(".search_btn").on("click", function () {
        render();
    })

    //4. 点击排序的时候，
    $(".lt_sort a[data-type]").on("click", function () {
        console.log(1)
        //如果有now这个类，换箭头
        //如果没有now这个类，移除别人，添加自己,,, 让所有箭头都向下
        var $this = $(this);

        if ($this.hasClass("now")) {
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        } else {
            $this.addClass("now").siblings().removeClass("now");
            $(".lt-sort span").removeClass("fa-angle-up").addClass("fa-angle-down")
        }
        render();
    })

    function render() {
        $(".lt_product").html('<div class="loading"></div>');
        //这个就是参数对象
        var param = {};
        param.page = 1;
        param.pageSize = 100;
        //文本框的值是啥，就发送什么
        param.proName = $(".search_input").val().trim();

        //对于price和num， 如果价格被点了，需要发送price  如果库存被点了，需要发送num, 如果都没被点，都不发送
        var $now = $(".lt_sort a.now");
        if ($now.length > 0) {
            //说明有一个被点击了，说明需要排序, 需要给param设置参数，可能是price，也可能是num,需要获取到$now这个元素是price或者type
            var type = $now.data("type");
            var value = $now.find("span").hasClass("fa-angle-down") ? 2 : 1;
            param[type] = value;
        }

        //发送请求
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: param,
            success: function (info) {
                console.log(info)
                setTimeout(function () {
                    $(".lt_product").html(template("tpl", info));
                }, 1000);

            }
        })

    }

})