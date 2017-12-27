


/**
 * Created by 二更 on 2017/2/8.
 */
$(function(){

    (function(){
        var parent=$('.category_navigation');
        var item=$('.category_navigation b');
        var imgs=$('.category_navigation b img');
        item.on('tap',parent,function(){
            var src=$(this).find('img').data('selected');
            src='//staitc-h5-alicnd.shike8888.com/images/all_goods/'+src;
            for(var i=0; i<item.length; i++){
                var imgSrc=$(imgs[i]).data('unselected');
                imgSrc='//staitc-h5-alicnd.shike8888.com/images/all_goods/'+imgSrc;
                $(imgs[i]).attr('src',imgSrc);
                $(item).removeClass('mui_active');
            }
            $(this).addClass('mui_active').find('img').attr('src',src);
        })
    })();
})
