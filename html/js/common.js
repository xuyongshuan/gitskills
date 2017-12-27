var admin = {url:$('base').attr('href')};
var base_url = 'https://www.shike8888.com/';

$(function() {
    $(document).keydown(function(event){
        var code=event.keyCode;
        if(code==13){
            $('.enter').click(); //调用登录按钮的登录事件
        }
    })
});