
/*弹出窗口*/
$(function(){
    $("#add_shop").click(function(){
        alert("添加成功！")
    })
})
$(document).on('click', '.shopping_car', function () {
        window.location.href = '/car';
    });
/*成功与错误*/
$(function () {
    function showerror(ele, text) {
        $(ele).html(text);
        $(ele).show();
        setTimeout(function () {
            $(ele).hide();
        }, 2000);
    }
        $(document).on('click','#login_l',function(){
            var p = $('#password').val();
            console.log("mima:"+p)
            if(p == ""|| p == "undefined"){
                showerror("#login_error","密码不能为空！");
                return false;
            }else{
                
            }
        })
        $(document).on('click', '#re_l', function () {
            var u = $('#re_user').val();
            var p = $('#re_password').val();
            if (u == ""|| u == "undefined") {
                alert("账号不能为空！")
                return false;
            }else if (p.length<6){
                showerror("#error","密码不能少于6位！");
                return false;
            }else{
                alert("注册成功！");
            }
        })
})
/*登录*/
$(function () {
    $("#login").click(function () {

        $(".window_bg").show();
        $("#login_window").show();

    })

    $("#lo_closed").click(function () {

        $(".window_bg").hide();
        $("#login_window").hide();

    })
    $("#login_r").click(function () {
        $("#login_window").hide();
        $("#re_window").show();
    })
})
/*注册*/
$(function () {
    $("#register").click(function () {

        $(".window_bg").show();
        $("#re_window").show();

    })

    $("#re_closed").click(function () {

        $(".window_bg").hide();
        $("#re_window").hide();

    })

    $("#re_login").click(function () {
        $("#re_window").hide();
        $("#login_window").show();
    })

    $('#foot_login').click(function() {
        $("#re_window").hide();
        $("#login_window").show();
    })

})

/*foot*/
$(function () {
    $(".ft_01").mouseenter(function () {
        $(this).find(".ft_01_t1").show();
        $(this).find(".ft_01_t").show();
        $(this).find(".ft_01_t").animate({
            "bottom": "-30px"
        }, 200, function () {
            $(this).hide();
        });
        $(this).find(".ft_01_t_bg").fadeIn(400);
        $(this).find(".ft_01_t1").animate({
            "top": "80px"
        }, 200, function () {
            $(this).fadeIn();
        });
    }).mouseleave(function () {
        $(this).find(".ft_01_t").animate({
            "bottom": "0px"
        }, 200, function () {
            $(this).fadeIn();
        });
        $(this).find(".ft_01_t_bg").fadeOut(400);
        $(this).find(".ft_01_t1").animate({
            "top": "100px"
        }, 200, function () {
            $(this).fadeOut();
        });
    });
});