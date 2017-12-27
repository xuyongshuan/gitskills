/**
 * 
 */
var platform = navigator.platform;
var srcid = window.Utils.request("srcid");
var isLogin;
var ivCode =window.Utils.request("ivCode");
//如果是通过好友邀请后，注册的用户，则获取其被好友邀请的类型
var ivtype =window.Utils.request("ivtype");
(function() {
	if(ivCode){
        sessionStorage.setItem("ivCode",ivCode);
    }
    if(ivtype){
        sessionStorage.setItem("ivtype",ivtype);
    }
    javascript: document.body.onselectstart = 'true';document.body.oncopy = 'true';void(0)

    document.addEventListener('DOMContentLoaded', function() {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        html.style.fontSize = windowWidth / 7.5 + 'px';
        // 等价于html.style.fontSize = windowWidth / 750 * 100 + 'px';
    }, false);

    $('#footer_nav').load('/html/common/footer_nav.html',function(){
    	 $('#index').find('img').attr('src','//staitc-h5-alicnd.shike8888.com/images/bottom_icon_home_selected@2x.png');
         $('#index').addClass('mui-active');
    });

    /**************初始化品牌专场*****************/
    newGoods();
    highRate();
    goNewPage();
    init();
    bindEve();
    
})();

/*var key = localStorage.getItem("key");
if (!key){
    window.location.href = '/guide_page';
}
*/
function bindEve() {

    $('#gosign').on("tap", function() {
        window.location.href = '/sign/shike_signIn'; //前往签到页面
    });

    //    关注我们弹框出现小时弹框
    $('.follow_us').on('tap',function(){
        showMask(".mask_layer",'.followUs_box');
    })
    $('.close').on('touchend',function(e){
    	e.preventDefault();
        closeMasks('.followUs_box');
    })
    $('#goMsgPage').on('touchend',function(e){
    	e.preventDefault();
    	window.location.href='/msg/goMsgPage';
    })
}

function init() {
    initBrand();
    isLogined();//判断是否登录
    logIn();
    // headLine();
    brandGoods();
}

function brandGoods() {
    // 页面模块分类整体的数据格式
    var data = [
        {'id': 'list1', 'name': '时尚女装', 'image_url': 'images/new_index/home_bg_ladies_default@2x.png'},
        {'id': 'list2', 'name': '精品女装', 'image_url': 'images/new_index/home_bg_man_default@2x.png"'},
        {'id': 'list3', 'name': '护肤美妆', 'image_url': 'images/new_index/home_bg_cosmetics_default@2x.png'},
        {'id': 'list4', 'name': '鞋包配饰', 'image_url': 'images/new_index/home_bg_shoes_default@2x.png'},
        {'id': 'list5', 'name': '居家生活', 'image_url': 'images/new_index/home_bg_life_default@2x.png'},
        {'id': 'list6', 'name': '数码电器', 'image_url': 'images/new_index/home_bg_digital_default@2x.png'},
        {'id': 'list7', 'name': '母婴儿童', 'image_url': 'images/new_index/home_bg_baby_default@2x.png'},
        {'id': 'list8', 'name': '户外运动', 'image_url': 'images/new_index/home_bg_sport_default@2x.png'},
        {'id': 'list9', 'name': '食品酒水', 'image_url': 'images/new_index/home_bg_food_default@2x.png'},
        {'id': 'list10', 'name': '其他百货', 'image_url': 'images/new_index/home_bg_other_default@2x.png'}
    ];

    function build_data(obj){
        data.forEach(function(item){
            var id = item['id'] ;
            item.list = obj[id];
        });
        return data;
    }
    /*商品随机展示*/
    var arr1 = [1,2,3,4];
    var arr2 = [1,2];

    var result = [];

    while(arr1.length !=0){

        var index2 = Math.floor(Math.random()*(arr2.length));
        var random2=String(arr2[index2]);


        var len = arr1.length;
        var index1 = Math.floor(Math.random()*(len));
        var random1 = String(arr1[index1]);

        result.push(random1 + random2);

        arr1.splice(index1,1);
    }

    var str=result.join(",");
    mui.ajax('/activity/getSortGoodsInfo',{
        data: {"random":str},
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        success:function(ret){
            var html = '';
            var data = build_data(ret);
            //额外的更多产品

            data.forEach(function(item,index){
                html +='<div class="goods_recommend">'+'<p class="special_name" ><a href="/activity/goExpertSort?category='+ (index + 1)+'&shop_type=0&yf_type=0&sy_type=0&sp_type=0&order=0&classes=0&type=0"><img src="'+ item['image_url']+'" alt=""></a></p>';
                var list = item['list'];
                var list_html = '';
                list_html += '<div class="new-try-goods">' +
                    '<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">' +
                    '<div class="mui-scroll">';
                var productList_arr = data[index].list;
                //判断商品显示的个数
                if(productList_arr.length <= 8){
                    //正常输出
                    var result_arr = productList_arr;


                }else if(productList_arr.length > 8){
                    //只截取前8个产品
                    var result_arr = productList_arr.slice(0,8);
                }else if(productList_arr.length == 0){
                    //如果该分类下一个产品都没有

                }
                //根据商品的显示个数循环商品列表
                result_arr.forEach(function(product){
                    var detailUrl = srcid ? '/activity/toDetail?srcid=' + srcid + '&aid=' + product.act_id : '/activity/toDetail?aid=' + product.act_id;
                    list_html += '<div class="mui-control-item">';
                    if(product['visit'] == 1){
                        list_html += ' <div class="bafen"><img src="images/home_bg_jb_default.png" alt=""></div>';
                    }
                    list_html += '<a href="'+detailUrl+'"><img src="'+taobaoImageUtil(product['picture_url'],90,200)+'" /></a>';
                    list_html += ' <div class="goods-description">';
                    list_html += ' <p class="one"><i class="icon iconfont ';
                    if (product['iphone_tb'] == 1 && (product['pc_tb'] == 1 || product['pc_tm'] == 1)) {
                        list_html += 'icon-diannaoyushouji';
                    }
                    if(product['iphone_tb'] == 1 && product['pc_tb'] != 1 && product['pc_tm'] != 1){
                        list_html += 'icon-shouji';
                    }
                    if(product['iphone_tb'] != 1 &&(product['pc_tb'] == 1 || product['iphone_tb'] == 1)){
                        list_html += 'icon-diannao';
                    }
                    list_html += '"></i>'+ product['product_name'] + '</p>';
                    list_html += '<p class="two"><span>&yen;' + product['unit_price'] + '</span><b>限量：<b>' + product['apply_amount'] + '</b>份</b></p>';
                    list_html += '</div></div>';
                });
                var more_html ='';
                more_html += '<div class="mui-control-item">';
                more_html += '<a href="/activity/goExpertSort?category='+ (index + 1)+'&shop_type=0&yf_type=0&sy_type=0&sp_type=0&order=0&classes=0&type=0">';
                more_html += '<img src="images/index/new_icon_more_default2x.png " />';
                more_html += '</a>';
                more_html += '<div class="goods-description">';
                more_html += ' <p class="one"><i class="icon iconfont ';
                more_html += '"></i>&nbsp;&nbsp;</p>';
                more_html += '<p class="two"><span>&nbsp;&nbsp;</span><b><b>&nbsp;&nbsp;</b></b></p>';
                more_html += '</div>';
                more_html += '</div>';

                list_html += more_html;

                list_html += '</div></div>';
                html +=list_html + '</div></div>';
            });
            $('.recommend_try').append(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

        }
    });
}

function newGoods(){
	mui.ajax("/activity/newGoods",{
        data:{page:0,size:8},
        dataType:"json",
        type:"post",
        success: function(data){
            if(data.code==1){
                var list=data.date.list;
                newGoodsList(list);
            }
        }
    })
}
function newGoodsList(list){
	var len = list.length;
	var html='';
	for (var i = 0; i < len; i++) {
		var detailUrl = srcid ? '/activity/toDetail?srcid=' + srcid + '&aid=' + list[i].act_id : '/activity/toDetail?aid=' + list[i].act_id;
		html += '<div class="mui-control-item"  onclick="javascript:window.location.href=\'' + detailUrl + '\';">';
		html += '<a href="'+detailUrl+'" class="goods_picture">';
		html += '<img src="'+ taobaoImageUtil(list[i].picture_url,90,150)+'" />';
		html += '<div class="limited_number">限量：<span>'+list[i].apply_amount+'</span>份</div>';
		html += '</a>';
		html += '<div class="goods-description">';
		html += '<p class="one">';
		if(list[i].iphone_tb==1 && (list[i].pc_tb==1 || list[i].pc_tm==1)){
			html += '<i class="icon iconfont icon-diannaoyushouji"></i>'+list[i].product_name+'</p>';
		}
		if(list[i].iphone_tb==1 && (list[i].pc_tb !=1 && list[i].pc_tm !=1)){
			html += '<i class="icon iconfont icon-shouji"></i>'+list[i].product_name+'</p>';
		}
		if(list[i].iphone_tb !=1 && (list[i].pc_tb==1 || list[i].pc_tm==1)){
			html += '<i class="icon iconfont icon-diannao"></i>'+list[i].product_name+'</p>';
		}
		html += '<p class="two">';
		html += '<span><b>&yen;'+list[i].unit_price.toFixed(2)+'</b></span>';
		html += '</p>';
		html += '</div>';
		html += '</div>';
	}

    html += '<div class="mui-control-item" style="height: 2.82rem">';
    html += '<a href="/activity/goExpertSort?category=0&shop_type=0&yf_type=0&sy_type=0&sp_type=0&order=1&classes=0&type=0" class="look_more">';
    html += '<span class="icon iconfont icon-chakangengduo"></span>';
    html += '<br/>';
    html += '<span>查看更多</span>';
    html += '</a>';
    html += '<div class="goods-description">';
    html += ' <p class="one"><i class="icon iconfont ';
    html += '"></i></p>';
    html += '<p class="two"><span>&nbsp;&nbsp;</span><b><b>&nbsp;&nbsp;</b></b></p>';
    html += '</div>';
    html += '</div>';
	    
	    $('#newGoodsId').html(html);
}

/*实时中奖商品*/
function highRate(){
    mui.ajax("/activity/realTimeGoods",{
        data:{page:0,size:8},
        dataType:"json",
        type:"post",
        success: function(data){
            if(data.code==1){
                var list=data.data.list;
                highRateList(list);
            }
        }
    })
}
function highRateList(list){

    var len=list.length;
   
    var html='';
    for(var i=0 ; i<len ;i++){
    	var detailUrl = srcid ? '/activity/toDetail?srcid=' + srcid + '&aid=' + list[i].act_id : '/activity/toDetail?aid=' + list[i].act_id;
        html += '<div class="mui-control-item"  onclick="javascript:window.location.href=\'' + detailUrl + '\';">';
        html += '<a href="'+detailUrl+'">';
        html += ' <img src="'+ taobaoImageUtil(list[i].picture_url,90,150)+'" />';
        html += '</a>';
        html += '<div class="goods-description">';
        html += '<p class="one">';
        if(list[i].iphone_tb==1 && (list[i].pc_tb==1 || list[i].pc_tm==1)){
            html += '<i class="icon iconfont icon-diannaoyushouji"></i>'+list[i].product_name+'</p>';
        }
        if(list[i].iphone_tb==1 && (list[i].pc_tb !=1 && list[i].pc_tm !=1)){
            html += '<i class="icon iconfont icon-shouji"></i>'+list[i].product_name+'</p>';
        }
        if(list[i].iphone_tb !=1 && (list[i].pc_tb==1 || list[i].pc_tm==1)){
            html += '<i class="icon iconfont icon-diannao"></i>'+list[i].product_name+'</p>';
        }
        html += '<p class="two">';
        html += '<span>&yen;'+ list[i].unit_price.toFixed(2)+'</span>';
        html +='<b>限量：<b>'+ list[i].apply_amount+'</b>份</b>'
        html += '</p>';
        html += '</div>';
        html += '</div>';
    }

        html +='<div class="mui-control-item">';
        html +=' <a href="#">';
        html +=' <a href="/activity/goRealGoods/?category=0&shop_type=0&yf_type=0&sy_type=0&sp_type=0&order=0&classes=0&type=3">';
        html +=' <img src="//staitc-h5-alicnd.shike8888.com/images/index/new_icon_more_default2x.png " />';
        html +=' </a>';
        html += '<div class="goods-description">';
        html += ' <p class="one"><i class="icon iconfont ';
        html += '"></i>&nbsp;&nbsp;</p>';
        html += '<p class="two"><span>&nbsp;&nbsp;</span><b><b>&nbsp;&nbsp;</b></b></p>';
        html += '</div>';
        html += '</div>';

    $('#highRateList').html(html);
}

function headLine() {
    mui.ajax('/activity/headLine', {
        data: { size: 10 },
        dataType: 'json',
        type: 'post',
        success: function(ret) {
            if (ret.code == 1) {
                var data = ret.dataSavemoney;
                $('#todayAddGoods').html(ret.dataTodaySum);
                if(new Date().getHours()>=10){
                    $('#todaySendGoods').text(ret.dataTodayGoodsSum);
                }else {
                    $('#todaySendGoods').html('0');
                }


                 /*随机取5个数*/
                var arr = uniqueArry(5);
                var len = uniqueArry(5).length;
                for (var i = 0; i < len; i++) {
                    $('#ycbig').append('<li><p>截止目前：<span>' + replaceNameByStr(data[arr[i]].shikename, 1, 3, '*') + '</span>通过试客巴省下<span><b>' + data[arr[i]].real_paymoney + '</b>元</span></p></li>')
             
                }

               // scrollTxt();
               new scrollTxt().init();

            }
        }
    });
}

// 生成len个不重复的随机数
function uniqueArry(len) {
    var random_arr = [];
    for (var i = 0;; i++) {
        var num = Math.floor(Math.random() * 10);

        if (random_arr.indexOf(num) < 0) {
            random_arr.push(num);
        }

        if (random_arr.length > len - 1)
            return random_arr;
    }
}


function goNewPage() {
    var srcid = window.Utils.request("srcid")
    $("#index").attr('href', srcid ? "/index?srcid=" + srcid : "/index");
    $("#home").attr('href', srcid ? "/user/personal_center?srcid=" + srcid : "/user/personal_center");
    $("#tryProgress").attr('href', srcid ? "/tryUse/tryManage?srcid=" + srcid : "/tryUse/tryManage");
}

function logIn(){
	if(isLogin=='true'){
        getUserInfo();
        getMessageCount();
	}else{
		$('#message_count').css('display','none');
	}
}

/*获取消息信息的条数*/
function getMessageCount() {
    mui.ajax('/msg/getMsgCount',{
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型
        timeout:10000,//超时时间设置为10秒；
        async :false,
        success:function(data){
            if (data.code == 0) {
//                $("#message_count").html(data.data);
                $('#message_count').css('display','none');
            }
        }
    });
}

/*判断该登入用户是否是新手*/
function getUserInfo() {
    mui.ajax('/userInfo/isNew',{
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型
        success:function(data){
            if (data.code == 1) {
                    var freeze_reward = 19.8;
                    showMask($(".mask_layer"),$("#gift"));
                    receiveGift(freeze_reward,data.data.user_id);
            }else if(data.code == 2){
                $('.novice_area').show();
            }
        }
    });
}
/*领取礼包*/
function receiveGift(freeze_reward,user_id) {
    $("#go_gift,#close").on("tap",function (e) {
        mui.ajax("/userInfo/updateFreeze_reward",{
            data:{"freeze_reward":freeze_reward,"user_id":user_id},
            dataType:"json",
            type:"post",
            success:function (data) {
                if(data.code==1){
                    if($(e.currentTarget).data('type') == 1){
                        window.location.href="/activity/goNovice"
                    }else {
                        closeMask($("#gift"))
                    }
                }else {
                    mui.alert(data.msg);
                }
            }
        });
    });
}

function isLogined(){
	mui.ajax('/auth/isLogined',{
		async:false,
		success:function(ret){
			isLogin = ret;
		}
	});
}


function initBrand(){
	mui.ajax('/brandSpecial/initLeastIndexContent',{
		dataType:'json',
		success:function(ret){
			if (ret.code==1) {
				$('.newbBrand_special').html(ret.data)
			}
		}
	})
}