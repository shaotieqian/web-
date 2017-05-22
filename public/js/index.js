//
//  index.js
//

//首页分类鼠标经过
$(function() {
    $(".row_bg01").show();
});

$(function () {
	//banner调节器
	//$(".example").luara({
	//	width: "100%",
	//	height: "auto",
	//	interval: 4000,
	//	selected: "seleted"
	//});
});

$(function(){
	$('.classify_product').children('div').on('click',function(){
		var index = $(this).index();
		var url = 'order' + '?index=' + index;
		window.location.href = url;
	});

    //首页banner点击跳转事件
    //$(".main-slider li").click(function(){
    //    var href = $(this).attr("href");
    //    window.location.href =  href;
    //    return true;
    //});
});