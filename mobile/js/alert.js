
/**
 * 模态窗显示
 * 
 */
function showMask(mask,modal){
	$(mask).height(document.body.scrollHeight+30);
    $(modal).css('display','block');
    $(document.body).css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
    });
}

/**
 * 关闭模态窗
 * @returns
 */
function closeMask(modal){
	setTimeout(function() {
		$(modal).css('display','none');
        $(document.body).css({
            "overflow-x":"auto",
            "overflow-y":"auto"
        });
	}, 400);
}

/**
 * 不延迟关闭模态窗-而且已经解决穿透问题，需在js的事件变成“touchend” 调用阻止冒泡方法即可
 * @param modal
 */
function closeMasks(modal){
		$(modal).css('display','none');
        $(document.body).css({
            "overflow-x":"auto",
            "overflow-y":"auto"
        });
}

function oncilk(){
	
 	 
	showMask($('.mask_layer'),$('.modal_box'));
        
    $('.close').bind("tap",function(){
		 
    	closeMask($('.modal_box'));
    })
    
    $('.ok').bind("tap",function(){
        
    	closeMask($('.modal_box'));
    })
}

function onclick(mask,modal) {

    showMask(mask,modal);

    // 弹框两个按钮时
    $('.close').bind("tap",function(){

        closeMasks($('.modal_box'));
    })

    $('.ok').bind("tap",function(){

        closeMasks($('.modal_box'));
    })

    //只有一个确认弹框
    $('#success').bind("tap",function(){

        closeMasks($('.modal_box'));
    })

}

/*待收货评价*/
function onclicks(mask,modal) {

    showMask(mask, modal);

    // 弹框两个按钮时
    $('.close').bind("tap", function () {

        closeMasks($('.modal_box'));
    })

    $('.submit').bind("tap", function () {

        closeMasks($('.modal_box'));
    })

}



function clicks() {

    $("#uploadWait").addClass("mui-spinner");
    $('.mask_layer1').show();
    $('.mask_layer1').height(document.body.scrollHeight+30);
    $(document.body).css({
        "overflow-x":"hidden",
        "overflow-y":"hidden"
    });
}

function closeWait() {
    $("#uploadWait").removeClass("mui-spinner");
    $('.mask_layer1').hide();
    $(document.body).css({
        "overflow-x":"auto",
        "overflow-y":"auto"
    });
}
