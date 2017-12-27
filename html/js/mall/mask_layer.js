
$('.modal .mask_layer').height(document.body.scrollHeight+1000);
$('.modal .close,.cancel,.confirm').on('click',function(){
    $(this).parents('.modal').css('display','none');
    enableScroll();
});
$.fn.myAlert=function(msg){
    $(this).css('display','block');
    $(this).find('.modal_content p').text(msg);
}
