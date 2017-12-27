/**
 * Created by bingbing on 2017/07/13.
 */

// 让左侧导航高度等于右侧div
$(function(){
    var H=$('.left_nav').height();
    $('#my_main').css({'min-height':H+'px'})
});

/* 商家左侧导航栏js */
 $(function(){
    $("aside").append($(".left_nav"));
    $(".left_nav").css("display","none");
    $("aside div").css("display","block");
 })
 
 
 /* 商家发布活动js*/
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
            }else {
                location.href = '/merchant_issue_try.html';
            }
        },
        error : function (XMLHttpRequest, textStatus){
        }
    })
}


 /* 商家发布流量任务js */
 function issue_task()
{
    $.ajax({
        url : '/merchant_issue_task/issure_task',
        data:{},
        type : 'post',
        dataType : 'json',
        cache : false,
        success : function (result){
            var data = eval(result);
            if(data.status == false) {
                $(".modal_issue .succeed_content").html(data.msg);
                $(".modal_issue").show();
            }else {
                location.href = '/merchant_issue_task';
            }
        },
        error : function (XMLHttpRequest, textStatus){
        }
    })
}


/* 取消所有弹框js*/
$(function(){
    $('.mask_layer').height(document.body.scrollHeight+1600);
// 关闭弹框
    $('.close,.cancel,.confirm').bind('click',function(){
        $('.pay_modal,.modal_delete,.modal,.reject ,.modal_issue,.binding_modal').hide();
        $('.delivery_modal,.delivery_modal2,.audit_modal,.pass_modal,.credits_exchange,.pass_modal2').css('display', 'none');
        enableScroll();
    });
});


/*modal_scrollbar.js 里面的代码 */

var keys = { 32: 1, 37: 1, 38: 1, 39: 1, 40: 1 };//左右 tab 上下键盘code号

function preventDefault(e){
e = e || window.event;
e.preventDefault && e.preventDefault();//阻止元素发生默认行为
e.returnValue = false;// 设置事件的返回值为false,即取消事件处理
}

function preventDefaultForScrollKeys(e){
if(keys[e.keyCode]){
	preventDefault(e);
	return false;
}
}

// 记录原来的事件函数，以便恢复
var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown;
var isDisabled;

var disableScroll = function(){
if(window.addEventListener){ // older FF
	window.addEventListener('DOMMouseScroll', preventDefault, false);
}

oldonwheel = window.onwheel;
window.onwheel = preventDefault; //现代化的标准

oldonmousewheel1 = window.onmousewheel;
window.onmousewheel = preventDefault; // 旧的, IE
oldonmousewheel2 = document.onmousewheel;
document.onmousewheel = preventDefault; //旧的, IE

oldontouchmove = window.ontouchmove;
window.ontouchmove = preventDefault; // mobile

oldonkeydown = document.onkeydown;
document.onkeydown = preventDefaultForScrollKeys;
isDisabled = true;
};

var enableScroll = function(){
if(!isDisabled){
	return;
}
if(window.removeEventListener){
	window.removeEventListener('DOMMouseScroll', preventDefault, false);
}

window.onwheel = oldonwheel; // 现代化的标准

window.onmousewheel = oldonmousewheel1; // 旧的, IE
document.onmousewheel = oldonmousewheel2; // 旧的, IE

window.ontouchmove = oldontouchmove; // mobile

document.onkeydown = oldonkeydown;
isDisabled = false;
};

