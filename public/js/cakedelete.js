$(function(){
	$('.del').click(function(e){
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.i-id-' + id);

		$.ajax({
			type:'DELETE',
			url:'/cake/list?id=' + id
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