/*删除*/
$(function(){
    $('.del').click(function(e){
        var id = $(this).data('id');
        console.log(id)
        var tr = $('.i-id-' + id);
        console.log(tr)

        $.ajax({
            type:'DELETE',
            url:'/user/list?id=' + id
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