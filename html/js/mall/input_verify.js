/**
 * Created by 二更 on 2016/12/21.
 */
   $(function(){
    /*   $('#username').bind('blur',function(){
           checkUsername();
       });

       $('#phone').bind('blur',function(){
           checkPhone();
       });*/

       $('#loginPwd').bind('blur',function(){
           checkLoginPwd();
       });

       $('#confirmPwd').bind('blur',function(){
           checkConfirmPwd();
       });

       $('#qq').bind('blur',function(){
           checkQQ();
       });

       // $('#testGetCode').bind('click',function(){
       //     settime(this);
       // });


 /*      //1. 用户名的验证
       function checkUsername(username){
           username = $('#username').val();
           if($('#username').val()==""){
               $('.username_error').text('用户名不能为空！');
               return false;
           }
         
       }

       // 手机号码的验证
       function checkPhone(phone){
           phone=$('#phone').val();
           var reg=/^1[3|4|5|7|8]\d{9}$/;
           if($('#phone').val()==""){
               $('.phone_error').text('手机号码不能为空！');
               return false;
           }else if(!(reg.test(phone))){
               $('.phone_error').text('手机号码格式不正确！');
               return false;
           }else{
               $('.phone_error').css('display','none');
               return true;
           }
       }*/

       // 登录密码的验证(数字+字母+字符 或 字母+字符 或 数字+字母 或 数字+字符6-16)
       function  checkLoginPwd(loginPwd){
           loginPwd=$('#loginPwd').val();
           var reg=/^((?!\d+$)(?![a-zA-Z]+$)[a-zA-Z\d@#$%^&_+].{5,15})+$/;
           if($('#loginPwd').val()==""){
               $('.loginPwd_error').html('<i class="iconfont icon-cuowu"></i>密码不能为空！');
               return false;
           }
           else if(loginPwd.length<6||loginPwd.length>16){
               $('.loginPwd_error').html('<i class="iconfont icon-cuowu"></i>密码应该在6~16个字符');
               return false;
           }
           else if(!(reg.test(loginPwd))){
               $('.loginPwd_error').html('<i class="iconfont icon-cuowu"></i>密码强度不够！');
           }
           else if($('#confirmPwd').val()!=""&&$('#loginPwd').val()!=$('#confirmPwd').val()){
         
               return false;
           }else{
               $('.loginPwd_error').html('');
  
               return true;
           }

       }

       // 确认密码
       function checkConfirmPwd(confirmPwd){
           confirmPwd=$('#confirmPwd').val();
           loginPwd=$('#loginPwd').val();
           if($('#confirmPwd').val()==""){
               $('.confirmPwd_error').html('<i class="iconfont icon-cuowu"></i>确认密码不能为空！');
               return false;
           }
           else if($('#loginPwd').val()!=""&&$('#confirmPwd').val()!=$('#loginPwd').val()){
               $('.confirmPwd_error').html('<i class="iconfont icon-cuowu"></i>确认密码和密码不一致！');
               return false;
           }else{
               $('.confirmPwd_error').html('');
               return true;
           }
       }

       // QQ号的验证
       function checkQQ(qq){
           qq=$('#qq').val();
           var reg = /^[1-9]{1}[0-9]{4,10}$/;
           if($("#qq").val()==""){
               $(".qq_error").html('<i class="iconfont icon-cuowu"></i>QQ不能为空！');
               return false;
           }else if(!reg.test(qq)){
               $(".qq_error").html('<i class="iconfont icon-cuowu"></i>QQ格式不正确！');
               return false;
           }else {
               $(".qq_error").css('display','none');
               return true;
           }
       }



       //手机验证码获取的倒计时
       var countdown=60;
       function settime(obj){
		   var phone = $('#phone').val();
			var phonereg = /^1[3|4|5|7|8]\d{9}$/;
			if (phone.length == 0) {
				$('.phone_error').html('<i class="iconfont icon-cuowu"></i>请输入手机号码！');
				 return false;
			}
			if (!phonereg.test(phone)){
				$('.phone_error').html('<i class="iconfont icon-cuowu"></i>请输入正确的手机号码！');
				return false;
			}
           if(countdown==0){
               obj.removeAttribute('disabled');
               obj.value='获取验证码';
               countdown =60;
               return ;
           }else{
               obj.setAttribute('disabled',true);
               obj.value='重新发送（'+countdown+'s）';
               countdown --;
           }
           setTimeout(function(){
               settime(obj)
           },1000);
       }
   })
















