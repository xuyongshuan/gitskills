/**
 * Created by 二更 on 2017/4/24.
 */
$(function(){
    $('.shop_name').on('click',function(){
        $(this).addClass('shop_name_active');
        $(this).siblings().removeClass('shop_name_active');
        $(this).parent().siblings().children().removeClass('shop_name_active');
        shop_id = $(this).find('.shop_id').val();
        platform_id = $(this).find('.platform_id').val();
        //console.log('shop_id:'+shop_id);
    });
    $('.try').on('click',function(){
        $(this).addClass('a_active');
        $(this).siblings().removeClass('a_active');
        var trys= $('.try');
        for(var i=0; i<trys.length; i++){
            if(trys.eq(i).hasClass('a_active')){
                $('.try_content').eq(i).css('display','block');
                $('.try_content').eq(i).siblings().css('display','none');
            }
        }
    });
});