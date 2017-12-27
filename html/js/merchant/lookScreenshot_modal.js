/**
 * Created by 二更 on 2017/5/16.
 */
$(function(){
    $('.pinjia').on('click',function () {
        Shike.custom(['确定'], function () {
            Shike.close();
            $('.mask_layer').height(document.body.scrollHeight+500);
            },$(this).data('context')
        )
    })

    bindEve()
});

function bindEve(){
    $('.mask_layer_shot').height(document.body.scrollHeight+500);
    $('.show_img').on('click', function(){
        var img = $(this).data('img');
        $("#show_img").attr('src', img).load(lookScreenshot);
        $('.lookScreenshot').css('visibility','visible');
        disableScroll();

    });

    // 单张图片弹框的位置
    function lookScreenshot(){
        var H=$('.lookScreenshot_modal').height();
        var W=$('.lookScreenshot_modal').width();
        $('.lookScreenshot_modal').css('marginTop',-(H/2)+'px');
        $('.lookScreenshot_modal').css('marginLeft',-(W/2)+'px');
    }

    //多张固定图片点击弹框事件
    $('.show_imgs').on('click', function(){
        pictureSeat();
        $('.lookScreenshot_many').css('visibility','visible');
        disableScroll();

    });

    // 轮播图弹框的位置
    function pictureSeat(){
        var Hs=$('.carousel-inner .active').height();
        var Ws=$('.carousel-inner .active').width();
        var height=-(Hs/2)+'px';
        var width=-(Ws/2)+'px';
        $('.lookScreenshot_modals').css('marginTop',height);
        $('.lookScreenshot_modals').css('marginLeft',width);
    }

    //关闭收藏店铺
    $('.close_btn').on('click',function(){
        closeBtn();
    });

    //关闭聊天
    $('.close_btnCha').on('click',function(){
        $('.lookScreenshotCha').css('visibility','hidden');
        enableScroll();
    });

    //查看收藏很多
    $('.lookPicture_btn').on('click',function(){
            var order_id=$(this).data('context');
            $.ajax({
                url:"/Merchant_order_list/search_shaidan",
                data:{order_id:order_id},
                success:function (data) {
                   var data =JSON.parse(data);
                    $('#img_0').attr('src',data.data.shaidan1_img);
                    $('#img_1').attr('src',data.data.shaidan2_img);
                    $('#img_2').attr('src',data.data.shaidan3_img);
                    $('#img_3').attr('src',data.data.shaidan4_img);
                }
        });
        lookBtns();
    });
    //关闭收藏很多
    $('.close_btns').on('click',function(){
        closeBtns();
    });
}
//收藏店铺
function lookBtn(){
    $('.lookScreenshot').css('visibility','visible');
    disableScroll();
}
//收藏宝贝
function lookBtnPro(){
    $('.lookScreenshotPro').css('visibility','visible');
    disableScroll();
}
//关闭收藏店铺
function closeBtn(){
    $('.lookScreenshot').css('visibility','hidden');
    enableScroll();
}
//查看聊天截图
function lookBtnCha(){
    $('.lookScreenshotCha').css('visibility','visible');
    disableScroll();
}



//关闭聊天截图
function closeBtnCha(){
    $('.lookScreenshotCha').css('visibility','hidden');
    enableScroll();
}



//关闭收藏宝贝
function closeBtnPro(){
    $('.lookScreenshotPro').css('visibility','hidden');
    enableScroll();
}

//收藏很多
function lookBtns(){
    $('.lookScreenshot_many').css('visibility','visible');
    // disableScroll();
}
//关闭很多
function closeBtns(){
    $('.lookScreenshot_many').css('visibility','hidden');
    enableScroll();
}


