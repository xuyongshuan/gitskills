
    $(".types").bind("click", function(){
        var type = $(this).data("type");
        var id = "";
        id = "recommend_trial";
        $(".types").each(function(j){
            if($(this).data("type") == type){
                $(this).css("color", "#2e5516");
                $(this).css("text-decoration", "underline");
            }else{
                $(this).css("color", "#646464");
                $(this).css("text-decoration", "none");
            }
        });


        $.ajax({
            url: getRecommend,
            method:'post',
            data:{type:type},
            success:function(result){
                result = JSON.parse(result);
                if(result.success==true){

                    $('#recommend_trial').empty();
                    var html = '';
                    recommend_list = result.data.recommend_list;
                    recommend_list.forEach(function(e){
						var freight = (parseInt(e.freight))?'<span style="color:#f35920;border: 1px solid #f35920;">付邮</span>':'<span>包邮</span>';
                        var apply = (e.isApply)?'<input class="apply_product" type="button" disabled="disabled" style="background:#c8c8c8" value="已申请"/>':'<input class="apply_product" type="button" onclick="window.location.href=\'/mall/homepage/productdetails'+ e.act_id+ '\'" value="申请试用"/>';
                        var platform = (e.platformid == 1)?'<img style="float:right" src="/images/mall/bg_tb_default.png'+'">':'<img style="float:right" src="/images/mall/bg_tm_default.png'+'">';
                        html = '<div class="products left">'+
                            '<a target="_blank" href="/mall/homepage/productdetails/'+ e.act_id+ '"><img src="'+ e.picture_url + '" alt=""></a>'+
                            '<div style="overflow: hidden;margin-top: 8px;">'+
                            '<img class="left" src="/images/mall/'+ e.ico +'" alt="">'+
                            '<p class="product_introduction">'+ e.product_name +'</p>'+ platform +
                            '</div>'+
                            '<p class="quantity">'+
                            '<span>限量'+ e.apply_amount + '份</span>'+ freight + '<span>已申请<b>'+ e.apply_count + '</b>次</span>'+
                            '</p>'+
                            '<p class="price">'+
                            '<span>&yen;'+ e.unit_price +'</span><span>'+apply+'</span>'+
                            '</p>'+
                            '</div>';
                        $('#recommend_trial').append(html);
                        //la(e.start_time)
                    });
                }
            },
            error:function(result){
                //alert('error');
            }
        });
    });


    $(".category").bind("click", function(){
    //$(".category").click(function(){
        var type = $(this).data("type");
        $(".category").each(function(){
            if($(this).data("type") == type){
                $(this).css("color", "#ac7418");
                $(this).css("text-decoration", "underline");
            }else{
                $(this).css("color", "#646464");
                $(this).css("text-decoration", "none");
            }
        });
        $(".sort_order li").each(function(){
            $(this).removeClass("sort_orderActive");
        });
        $(".sort_order ul li:first-child").addClass("sort_orderActive");

        $.ajax({
            url: getRecommend,
            method:'post',
            data:{type:type,orderby:1},
            success:function(result){
                result = JSON.parse(result);
                if(result.success==true){
     
                    $('#recommending').empty();
                    var html = '';
                    recommend_list = result.data.recommend_list;
                    recommend_list.forEach(function(e){
						var freight = (parseInt(e.freight))?'<span style="color:#f35920;border: 1px solid #f35920;">付邮</span>':'<span>包邮</span>';
                        var apply = (e.isApply)?'<input class="apply_product" type="button" disabled="disabled" style="background:#c8c8c8" value="已申请"/>':'<input class="apply_product" type="button" onclick="window.location.href=\'/mall/homepage/productdetails/'+ e.act_id+ '\'" value="申请试用"/>';
                        var platform = (e.platformid == 1)?'<img style="float:right" src="/images/mall/bg_tb_default.png">':'<img style="float:right" src="/images/mall/bg_tm_default.png">';
                        html = '<div class="products left">'+
                            '<a target="_blank" href="/mall/homepage/productdetails/'+ e.act_id+ '"><img src="'+ e.picture_url + '" alt=""></a>'+
                            '<div style="overflow: hidden;margin-top: 8px;">'+
                            '<img class="left" src="/images/mall/'+ e.ico +'" alt="">'+
                            '<p class="product_introduction left">'+ e.product_name +'</p>'+ platform +
                            '</div>'+
                            '<p class="quantity">'+
                            '<span>限量'+ e.apply_amount + '份</span>'+ freight + '<span>已申请<b>'+ e.apply_count + '</b>次</span>'+
                            '</p>'+
                            '<p class="price">'+
                            '<span>&yen;'+ e.unit_price +'</span><span>'+apply+'</span>'+
                            '</p>'+
                            '</div>';
                        $('#recommending').append(html);
                        //la(e.start_time)
                    });
                    var sorta = $(".sort a").each(function(){
                        $(this).attr('data-type',type);
						var order = $(this).data("order");
						$(this).attr('onclick', 'order('+order+','+type+');');
                    })
                }
            },
            error:function(result){
               // alert('error');
            }
        });
    });

    //$(".orderby").bind("click", function(){
	function order(order, type){
		var type = type;
        var order = order;

        $(".sort_order ul li").each(function(){
            $(this).removeClass("sort_orderActive");
			if($(this).find("a").data('order') == order){
				$(this).addClass("sort_orderActive");
			}
        });
       
        $.ajax({
            url: getRecommend,
            method:'post',
            data:{type:type,order:order},
            success:function(result){
                result = JSON.parse(result);
                if(result.success==true){
                    $('#recommending').empty();
                    var html = '';
                    recommend_list = result.data.recommend_list;
                    recommend_list.forEach(function(e){
						var freight = (parseInt(e.freight))?'<span style="color:#f35920;border: 1px solid #f35920;">付邮</span>':'<span>包邮</span>';
                        var apply = (e.isApply)?'<input class="apply_product" type="button" disabled="disabled" style="background:#c8c8c8" value="已申请"/>':'<input class="apply_product" type="button" onclick="window.location.href=\'/mall/homepage/productdetails/'+ e.act_id+ '\'" value="申请试用"/>';
                        var platform = (e.platformid == 1)?'<img style="float:right" src="images/mall/bg_tb_default.png">':'<img style="float:right" src="/images/mall/bg_tm_default.png">';
                        html = '<div class="products left">'+
                            '<a target="_blank" href="/mall/homepage/productdetails/'+ e.act_id+ '"><img src="'+ e.picture_url + '" alt=""></a>'+
                            '<div style="overflow: hidden;margin-top: 8px;">'+
                            '<img class="left" src="/images/mall/'+ e.ico +'" alt="">'+
                            '<p class="product_introduction left">'+ e.product_name +'</p>'+ platform +
                            '</div>'+
                            '<p class="quantity">'+
                            '<span>限量'+ e.apply_amount + '份</span>'+ freight + '<span>已申请<b>'+ e.apply_count + '</b>次</span>'+
                            '</p>'+
                            '<p class="price">'+
                            '<span>&yen;'+ e.unit_price +'</span><span>'+apply+'</span>'+
                            '</p>'+
                            '</div>';
                        $('#recommending').append(html);
                    });
                }
            },
            error:function(result){
            }
        });
	}	
    $(function(){

         // 轮播图初始化
        $('.flexslider').flexslider({
            directionNav: true,
            pauseOnAction: false
        });
     
        $('.shike_course').mouseover(function(){
            $(this).find('a').css("background-image","url(../../images/mall/nav_icon_ren_selected.png)");
            $(this).find('a').stop().animate({marginTop:'0px'},300)
        });
        $('.shike_course').mouseout(function(){
            $(this).find('a').css("background-image","url(../../images/mall/nav_icon_ren_default.png)");
            $(this).find('a').stop().animate({marginTop:'10px'},300)
        });
        $('.merchant_course').mouseover(function(){
            $(this).find('a').css("background-image","url(../../images/mall/nav_icon_gwc_selected.png)");
           $(this).find('a').stop().animate({marginTop:'0px'},300)
        })
        $('.merchant_course').mouseout(function(){
            $(this).find('a').css("background-image","url(../../images/mall/nav_icon_gwc_default.png)");
            $(this).find('a').stop().animate({marginTop:'10px'},300)
        });
        $('.winning_tips').mouseover(function(){
            $(this).find('a').css("background-image","url(../../images/mall/nav_icon_diannao_selected.png)");
           $(this).find('a').stop().animate({marginTop:'0px'},300)
        });
        $('.winning_tips').mouseout(function(){
            $(this).find('a').css("background-image","url(../../images/mall/nav_icon_diannao_default.png)");
            $(this).find('a').stop().animate({marginTop:'10px'},300)
        });
          $('.goods_shopType').mouseout(function(){
                $(this).find('img').stop().animate({marginRight:'40px'},500);
            });
            $('.goods_shopType').mouseover(function(){
                $(this).find('img').stop().animate({marginRight:'20px'},500);
            });
        //推荐试用
        function load_recommend(types,id) {
            var type = types;
            var id = id;
            $.ajax({
                url: getRecommend,
                method: 'post',
                data: {type: types },
                success: function (result) {
                    result = JSON.parse(result);
                    if (result.success == true) {
                        var html = '';
                        recommend_list = result.data.recommend_list;
                        recommend_list.forEach(function (e) {
                            $('#'+id).empty();
                            var html = '';
                            recommend_list = result.data.recommend_list;
                            recommend_list.forEach(function (e) {
								var freight = (parseInt(e.freight))?'<span style="color:#f35920;border: 1px solid #f35920;">付邮</span>':'<span>包邮</span>';
                                var apply = (e.isApply)?'<input class="apply_product" type="button" disabled="disabled" style="background:#c8c8c8" value="已申请"/>':'<input class="apply_product" type="button" onclick="window.location.href=\'/mall/homepage/productdetails/'+ e.act_id+ '\'" value="申请试用"/>';
                                var platform = (e.platformid == 1) ? '<img style="float:right" src="/images/mall/bg_tb_default.png">' : '<img style="float:right" src="/images/mall/bg_tm_default.png">';
                                html = '<div class="products left">' +
                                    '<a target="_blank" href="/mall/homepage/productdetails/' + e.act_id + '"><img  src="' + e.picture_url + '" alt=""></a>' +
                                    '<div style="overflow: hidden;margin-top: 8px;">' +
                                    '<img class="left" src="/images/mall/'+ e.ico +'" alt="">'+
                                    '<p class="product_introduction left">' + e.product_name + '</p>' + platform +
                                    '</div>' +
                                    '<p class="quantity">' +
                                    '<span>限量' + e.apply_amount + '份</span>' + freight + '<span>已申请<b>' + e.apply_count + '</b>次</span>' +
                                    '</p>' +
                                    '<p class="price">' +
                                    '<span>&yen;' + e.unit_price + '</span><span>' + apply + '</span>' +
                                    '</p>' +
                                    '</div>';
                                $('#'+id).append(html);
                                //la(e.start_time)
                            });
                        });
                    }
                },
                error: function (result) {
                 //   alert('error')
                }
            });
        }
        window.onload=function() {
            load_recommend(1, "recommend_trial");
            load_recommend(5, "recommending"); //试用进行中
        }
    });

    //是否申请过
    function apply_product(e,act_id) {
        $.ajax({
            url:"/mall/ApplyTry/isApply",
            method: 'post',
            data:{
                act_id:act_id
            },
            success:function(result){
                result = JSON.parse(result);
                if(result.success==true){
                    location.href = '/mall/applyTry/applyTry_one'+ '/'+ act_id
                }
                else{
                    code = result.code;
                    switch (code)
                    {
                        case 1:
                            //alert('您已经申请过该产品');
                            $('.modal').myAlert('您已经申请过该产品');
//                            myAlert('您已申请过该产品')
                            $(e).attr('disabled',true).val('已申请').css('background-color','#c8c8c8');
                            break;
                        case 2:
                            location.href = login_url;
                            break;
                        case 3:
                            $('.modal').myAlert('未绑定淘宝');
                            $('#qubangding').show();
                            $('.confirm').val('取消');
                            break;
                        case 4:
                            //alert('淘宝审核中');
                            $('.modal').myAlert('淘宝账号审核中，请耐心等待！');
                            break;
                        case 5:
                            //alert('该账号不能申请试用');
                            $('.modal').myAlert('商家账号不能申请试用，请使用试客账号进行试用申请！');
                            break;
                        case 6:
                            $('.modal').myAlert('您是试用会员，一个周只能申请试用一款商品，本周已经申请试用，请下个周再来申请试用或者充值办理正式会员');
                            break;
                        default:
                            break;
                    }
                }
            },
            error:function(){
                //alert('error');
            }
        })
    }


