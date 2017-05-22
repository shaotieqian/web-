$(function(){
			$('.linkweb:first-child').css({display:'block'}).css({opacity:1});
			var now=0;
			var next=0;
			var flag=true;
			var t=setInterval(move,4000);
			function move(){
				if (!flag) {return};
				flag=false;				
				next++;
				if (next>$('.linkweb').length-1) {
					next=0;
				};
				same();
			};
			function same(){
				$('.linkweb').eq(now).css({'display':'none'}).animate({opacity:0},200,function(){
				});
				$('.linkweb').eq(next).css({'display':'block'}).animate({opacity:1},200,function(){
					flag=true;
				});
				$('.num1').eq(now).removeClass('hot');
				$('.num1').eq(next).addClass('hot');
				now=next;
			}
			$('.out').hover(function(){
				clearInterval(t);
			},function(){
				t=setInterval(move,4000);
			});
			$('.num1').mouseover(function(){
				var index=$(this).index();
				if (now==index||!flag) {return};
				flag=false;
				next=index;
				same();
			});
		})