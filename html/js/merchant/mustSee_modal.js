/**
 * Created by 二更 on 2017/5/5.
 */
$(function(){
    disableScroll();
    showTime();
    $('#confirm').on('click',function(){
        $('.merchant_mustSee_modal').hide();
        enableScroll();
    })
})
var t = 10;

function showTime(){
    var confirmBtn= $('#confirm');
    confirmBtn.val('确定 (' +t+'s)');
    t -= 1;//t=t-1;
    if(t==0){
        confirmBtn.removeAttr("disabled");
        confirmBtn.val('确定');
        confirmBtn.css('backgroundColor','#f10180');
        confirmBtn.css('cursor','pointer');
        return;
    }
    //每秒执行一次,showTime()
    setTimeout("showTime()",1000);

}
