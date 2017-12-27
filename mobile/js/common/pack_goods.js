
function packGoodsData(goods) {
    var detailUrl = srcid ? '/activity/toDetail?srcid=' + srcid + '&aid=' + goods.act_id : '/activity/toDetail?aid=' + goods.act_id;
    var html = "";
    if(goods.status==3){
        html += '<li class="pack_goods" onclick="javascript:window.location.href=\'' + detailUrl + '\';"> <a href="' + detailUrl + '">';
             if(goods.visit==1){
                 html +='<img class="img_award" src="//staitc-h5-alicnd.shike8888.com/images/home_bg_jb_default.png" alt="">';
             }
        html +='<img src="' + taobaoImageUtil(goods.picture_url,90,200)+ '" /> </a>';
    }else {
        html += '<li class="pack_goods"> <a href="#"> <img src="' + taobaoImageUtil(goods.picture_url,90,200) + '" /> </a>';
    }
    // html += '<div class="goods-description"> <p class="one">' + goods.product_name + '</p><p class="two"> <span>价值：<b>&yen;' + goods.unit_price.toFixed(2) + '</b></span>';
    html +='<div class="goods-description"> <p class="one">';
    if(goods.iphone_tb==1 && (goods.pc_tb==1 || goods.pc_tm==1)){
        html += '<i class="icon iconfont icon-diannaoyushouji"></i>';
    }
    if(goods.iphone_tb==1 && (goods.pc_tb !=1 && goods.pc_tm !=1)){
        html += '<i class="icon iconfont icon-shouji"></i>';
    }
    if(goods.iphone_tb !=1 && (goods.pc_tb==1 || goods.pc_tm==1)){
        html += '<i class="icon iconfont icon-diannao"></i>';
    }
    html += goods.product_name+'</p><p class="two">';
    html += '<span>价值：<b>&yen;' + goods.unit_price.toFixed(2) + '</b></span>';

    if (goods.freight > 0) {

        html += '<span class="notPinkage"> 付邮 </span> '
    } else {
        html += '<span class="pinkage">包邮</span> '
    }

    html += '</p><p class="three"> <span>限量：<b>' + goods.apply_amount + '份</b></span> <span class="applyFor"><b>' + goods.apply_count + '人</b>已申请</span></p> </div> </li>'

    return html;
}


 function packGoodsDatas(goods){
     var detailUrl = srcid ? '/activity/toDetail?srcid=' + srcid + '&aid=' + goods.act_id : '/activity/toDetail?aid=' + goods.act_id;
     var html = "";
     if(goods.status==3){
         html += '<li class="pack_goods" onclick="javascript:window.location.href=\'' + detailUrl + '\';"> ';

         if(goods.today_ex_left_num == 0){
            //如果已经兑换完
            html += '<div class="stock_over">';
            html += '<p class="stock_over_icon iconfont icon-zanwuneirong"></p>';
            html += '<p class="stock_over_des">今日已兑完</p>';
            html += '</div>';
         }
         


         html += '<a href="' + detailUrl + '">';
         if(goods.visit==1){
             html +='<img class="img_award" src="//staitc-h5-alicnd.shike8888.com/images/home_bg_jb_default.png" alt="">';
         }
                  
         var buy_sum = goods.buy_sum;
         var price = goods.unit_price.toFixed(2);
         html +='<div class="ex_indian"><p class="ex_price">仅需：'+Math.ceil(buy_sum * price )+'夺宝币</p></div>';
         html +='<img src="' + taobaoImageUtil(goods.picture_url,90,200)+ '" /></a>' 

     }else {
         html += '<li class="pack_goods"> <a href="#"> <img src="' + taobaoImageUtil(goods.picture_url,90,200) + '" /> </a>';
     }
     html += '<div class="goods-description"> <p class="one">' + goods.product_name + '</p><p class="two"> <span>价值：<b>&yen;' + goods.unit_price.toFixed(2) + '</b></span>';

     if (goods.freight > 0) {

         html += '<span class="notPinkage"> 付邮 </span> '
     } else {
         html += '<span class="pinkage">包邮</span> '
     }

 var exchanged = goods.todayExNum - goods.today_ex_left_num;
 html+='</p><p class="three"> <span>已抢：<b>'+exchanged+'份</b></span> <span class="applyFor">今日剩余：<b>'+goods.today_ex_left_num+'份</b></span></p> </div> </li>'

 return html;
 }


function packAllGoodsData(goods) {
    var detailUrl = srcid ? '/activity/toDetail?srcid=' + srcid + '&aid=' + goods.act_id : '/activity/toDetail?aid=' + goods.act_id;
    var html = "";
    if(goods.status==3){
        html += '<li class="pack_goods" onclick="javascript:window.location.href=\'' + detailUrl + '\';"> <a href="' + detailUrl + '">';
        html +='<img src="' + taobaoImageUtil(goods.picture_url,90,200)+ '" /> </a>';
    }else {
        html += '<li class="pack_goods"> <a href="#"> <img src="' + taobaoImageUtil(goods.picture_url,90,200) + '" /> </a>';
    }
    // html += '<div class="goods-description"> <p class="one">' + goods.product_name + '</p><p class="two"> <span>价值：<b>&yen;' + goods.unit_price.toFixed(2) + '</b></span>';
    html +='<div class="goods-description"> <p class="one">';
    if(goods.iphone_tb==1 && (goods.pc_tb==1 || goods.pc_tm==1)){
        html += '<i class="icon iconfont icon-diannaoyushouji"></i>';
    }
    if(goods.iphone_tb==1 && (goods.pc_tb !=1 && goods.pc_tm !=1)){
        html += '<i class="icon iconfont icon-shouji"></i>';
    }
    if(goods.iphone_tb !=1 && (goods.pc_tb==1 || goods.pc_tm==1)){
        html += '<i class="icon iconfont icon-diannao"></i>';
    }
    html += goods.product_name+'</p><p class="two">';
    html += '<span><b>&yen;' + goods.unit_price.toFixed(2) + '</b></span>';

    if (goods.freight > 0) {

        html += '<span class="notPinkage"> 付邮 </span> '
    } else {
        html += '<span class="pinkage">包邮</span> '
    }
    if(goods.visit==1){
        html +='<span class="right icon iconfont icon-shang_xin"></span>';
    }
    if(goods.red_packet==1){
        html +='<span class="right icon iconfont icon-jiang_xin"></span>';
    }
    if(goods.is_huabei==1){
        html +='<span class="right icon iconfont icon-huabeixinyongqia"></span>';
    }

    html += '</p><p class="three"> <span>限量：<b>' + goods.apply_amount + '份</b></span> <span class="applyFor"><b>' + goods.apply_count + '人</b>已申请</span></p> </div> </li>'

    return html;
}



function packLessGoodsData(goods) {
    var detailUrl = srcid ? '/activity/toDetail?srcid=' + srcid + '&aid=' + goods.act_id+'&a_type='+goods.act_id : '/activity/toDetail?aid=' + goods.act_id+'&a_type='+goods.act_id;
    var html = "";
    if(goods.status==3){
        html += '<li class="pack_goods" onclick="javascript:window.location.href=\'' + detailUrl + '\';"> <a href="' + detailUrl + '">';
        if(goods.visit==1){
            html +='<img class="img_award" src="//staitc-h5-alicnd.shike8888.com/images/home_bg_jb_default.png" alt="">';
        }
        html +='<img src="' + taobaoImageUtil(goods.picture_url,90,200)+ '" /> </a>';
    }else {
        html += '<li class="pack_goods"> <a href="#"> <img src="' + taobaoImageUtil(goods.picture_url,90,200) + '" /> </a>';
    }
    // html += '<div class="goods-description"> <p class="one">' + goods.product_name + '</p><p class="two"> <span>价值：<b>&yen;' + goods.unit_price.toFixed(2) + '</b></span>';
    html +='<div class="goods-description"> <p class="one">';
    if(goods.iphone_tb==1 && (goods.pc_tb==1 || goods.pc_tm==1)){
        html += '<i class="icon iconfont icon-diannaoyushouji"></i>';
    }
    if(goods.iphone_tb==1 && (goods.pc_tb !=1 && goods.pc_tm !=1)){
        html += '<i class="icon iconfont icon-shouji"></i>';
    }
    if(goods.iphone_tb !=1 && (goods.pc_tb==1 || goods.pc_tm==1)){
        html += '<i class="icon iconfont icon-diannao"></i>';
    }
    html += goods.product_name+'</p><p class="two">';
    html += '<span>价值：<b>&yen;' + goods.unit_price.toFixed(2) + '</b></span>';

    if (goods.freight > 0) {

        html += '<span class="notPinkage"> 付邮 </span> '
    } else {
        html += '<span class="pinkage">包邮</span> '
    }

    html += '</p><p class="three"> <span>限量：<b>' + goods.apply_amount + '份</b></span> <span class="applyFor"><b>' + goods.apply_count + '人</b>已申请</span></p> </div> </li>'

    return html;
}