$(function(){
	$(document).on('click', '.action-set-default', function (e) {
        var target = $(e.target);
		var id = target.data('id');
        var tr = $('.i-id-' + id);
        if (typeof(id) != 'undefined' && id != '') {
            $.ajax({
            	type:"POST",
            	url:"/adresss/moren/new"
            })
            .done(function(d){
            	if(d.success === 1){
            		tr.addClass("lighthigh");
            		tr.siblings().removeClass("lighthigh")
            		$.ajax({
            			type:"POST",
            			url:"/adresss/moren?id="+id
            		})
            	}
            })
        }
    });
})

$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.i-id-' + id);

		$.ajax({
			type:'DELETE',
			url:'/address?id=' + id
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

$(function(){
	$(".add_address").click(function(){
	    $(".modal-dialog").show();
	    $(".modal-content").show();
	})
	$(".close").click(function(){
		$(".modal-dialog").hide();
		$(".modal-content").hide();
	})
})