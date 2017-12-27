//        模态框的高度(500：表示头部和尾部高度的和)；
$('.mask_layer').height(document.body.scrollHeight+1000);

$('.search .nav').mouseover(function(){
    $('.search .right ul').find('a').removeClass('header_active');
});

$('.search .nav').mouseout(function(){
    $('.search .right ul').find('a').removeClass('header_active');
});
$('#search_button').on('click',function(){
    var search = $('.search_input').val().trim();
    if(search != '')
    {
        url = search_url + search;
        location.href = url;
    }
})
$('.search_input').keydown(function(event){
    var code=event.keyCode;
    if(code==13){
        $('#search_button').click();
    }
});

$(function(){
    $('.return_top ').hover(function(){
        $(this).find('img').attr('src','/images/mall/right_icon_top_selected.png');
    },function(){
        $(this).find('img').attr('src','/images/mall/right_icon_top_default.png');
    });


    if($("meta[name=toTop]").attr("content")=="true"){
        if($(".return_top").scrollTop()==0){
            $(".return_top").hide();
        }
        $(window).scroll(function(event) {
            /* Act on the event */
            if($(this).scrollTop()==0){
                $(".return_top").hide();
            }
            if($(this).scrollTop()!=0){
                $(".return_top").show();
            }
        });
        $(".return_top").click(function(event) {
            /* Act on the event */
            $("html,body").animate({scrollTop:"0px"},1000)
        });
    }

    //        收藏本站
    $('#collection').bind('mouseover',function(){
        $('.collection').css('display','block')
    });
    $('#collection').bind('mouseout',function(){
        $('.collection').css('display','none')
    });

})

function issue_try()
{
    $.ajax({
        url : '/merchant_issue_try/issure_try.json',
        data:{},
        type : 'post',
        dataType : 'json',
        cache : false,
        success : function (result){
            var data = eval(result);
            if(data.status == false) {
                $(".modal_issue .succeed_content").html(data.msg);
                $(".modal_issue").show();
                disableScroll();
            }else {
                location.href = '/merchant_issue_try.html';
            }
        },
        error : function (XMLHttpRequest, textStatus){
        }
    })
}
