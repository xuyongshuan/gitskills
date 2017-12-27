var imgpath = "http://image.shike8888.com/";

(function(){
	poster_init();
//	poster_bindEve();
})();
function poster_init(){
	initPoster();
	
}
//海报初始化
function initPoster(){
	//********** 用ajax获取poster信息,动态加载  ************
	
	$.ajax({
		url:'/poster/getAllPoster',
		dataType:'json',
		type:'post',//HTTP请求类型
		timeout:10000,
		success:function(data){
			if (data.code == 1) {
				var list = data.data;
				var html;
				//如果只有一个海报
				if (list.length == 1) {
					//如果没有链接  否则
					if (!list[0].hrefUrl.trim()) {
						html = '<div class="mui-slider-item"><a href="javascript:;"><img src="'+imgpath+list[0].imgUrl+'" /></a></div>'
					}else{
						html = '<div class="mui-slider-item"><a href="'+list[0].hrefUrl+'"><img src="'+imgpath+list[0].imgUrl+'" /></a></div>'
					}
					$("#slider").find(".mui-slider-group").html(html);
				}else{
					
					var html_commen;
					var html_dot = '<div class="mui-indicator mui-active"></div>';
					
					if (!list[0].hrefUrl.trim()) {
						
						html_foot = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="javascript:;"><img src="'+imgpath+list[0].imgUrl+'" /></a></div>';
					}else{
						
						html_foot = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="'+list[0].hrefUrl+'"><img src="'+imgpath+list[0].imgUrl+'" /></a></div>';
					}
					
					var last_num = list.length - 1;
					//最后一个轮播的图片
					if (!list[last_num].hrefUrl.trim()) {
						
						html_head = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="javascript:;"><img src="'+imgpath+list[last_num].imgUrl+'" /></a></div>';
					}else{
						
						html_head = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="'+list[last_num].hrefUrl+'"><img src="'+imgpath+list[last_num].imgUrl+'" /></a></div>';
					}
					html +=html_head;
					//多个海报
					for (var i = 0; i < list.length; i++) {
					
						//如果没有链接  否则
						if (!list[i].hrefUrl.trim()) {
							html +='<div class="mui-slider-item"><a href="javascript:;"><img src="'+imgpath+list[i].imgUrl+'" /></a></div>'
						}else{
							html +='<div class="mui-slider-item"><a href="'+list[i].hrefUrl+'"><img src="'+imgpath+list[i].imgUrl+'" /></a></div>';
						}
//						debugger;
						if (i != 0) {
							html_dot += '<div class="mui-indicator"></div>';
						}
						
						
					}
					
					html += html_foot;
				
				}
				$("#slider").find(".mui-slider-indicator").html(html_dot);
				$("#slider").find(".mui-slider-group").html(html);
				
				mui("#slider").slider({
				    interval: 2000
				});
			}
		}
	})
}