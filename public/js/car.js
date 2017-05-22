$(document).ready(function(){
   csubtotal();
   csubtotal1(); 
})
/*加法*/
$(document).on('click', '.add', function () {
    var t = $(this).parent().find('input[class*=text_box]');
    t.val(parseInt(t.val()) + 1);
    if (isNaN(t.val())) {
        t.val(1);
    }
    csubtotal();
    csubtotal1();
});
/*减法*/
$(document).on('click', '.min', function () {
    var t = $(this).parent().find('input[class*=text_box]');
    t.val(parseInt(t.val()) - 1);
    if (parseInt(t.val()) <= 0 || isNaN(t.val())) {
        t.val(1);
    }
    csubtotal();
    csubtotal1();
});
/*点选*/
$('input[name="order[chkItem]"]:checkbox').click(function(){
    var isCheck = $('input[name="order[chkItem]"]:not(:checked)').length?false:true;
    $('#CheckAll').prop("checked",isCheck);
    csubtotal1();
});
/*全选*/
$('#CheckAll').click(function(){
    var self = $(this);
    $('input[name="order[chkItem]"]').each(function(){
        $(this).prop("checked",self.is(':checked'));
    });
    csubtotal1();
});
/*删除*/
$(function(){
    $('.del').click(function(){
        var id = $(this).data('id');
        var tr = $('.i-id-' + id);

        $.ajax({
            type:'DELETE',
            url:'/car/list?id=' + id
        })
        .done(function(results){
            if(results.success === 1){
                if(tr.length>0){
                    tr.remove()
                }
            }
        })
    })
})
/*小计*/
function csubtotal(){
    var sum = 0;
    $(".table02").each(function(){
        var price = $(this).attr("data-price");//attr则是返回属性值
        var index = $(this).attr('data-index');
        var quantity = $('#q'+index).val();//val()设置的是input的value属性
        sum =(parseFloat(price)*parseFloat(quantity));
        $("#subtotal"+index).html( sum +'.00');
    });
}
/*总计*/
function csubtotal1(){
            sum = 0;
            $('input[name="order[chkItem]"]:checked').each(function(){
                var self = $(this),
                    price = self.attr('data-price'),
                    index = self.attr('data-index');
                    id = self.data('id');

                var quantity = $('#q'+index).val();
                console.log(quantity)
                console.log(id)
                sum +=(parseFloat(price)*parseFloat(quantity));
            });
            $("#money").html(sum +'.00');
            var money = sum+'.00';
            console.log(money)
            $.ajax({
                type:"POST",
                url:"/car/new",
                data:{money:[id,money]}
            })
        }
/*额外餐具*/
$(function () {
    $("#addPayCanjuBtn").click(function () {
        $(".tab_number1").show();
    })
    $(".deltable").click(function () {
        $(".tab_number1").hide();
    })
})




