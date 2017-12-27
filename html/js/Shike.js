
// 创建一个公共对象
var Shike = function(){}

Shike.prototype = {
    extend:function(tar,source){
        for(var i in source){
            tar[i] = source[i];
        }
        return tar;
    },
     // 第三方依赖
    'dependencies':{
         'modal_scrollbar':{
                'main'  :'modal_scrollbar.js',
                'des'   :'模态框出现，禁止、解除页面滚动',
                'time'  :'2017.06.15',
                'author':'rj',
                'fn'    :['disableScroll','enableScroll']

                }

    }     
        
}



var Shike = new Shike();

/*弹框模块*/
Shike.extend(Shike,{

    alertDOM:function() {
        var str = "";
            str +='<div class="modal_box">'
                        +'<div class="modal_prompt">'
                            +'<span id="alert_title">提示</span>'
                          +'<a class="yc-close iconfont icon-guanbi"></a>'
                        +'</div>'
                        +'<div class="modal_content">'
                             +'<div class="modal_context">'
                                 +'<p id="alert_message">确认</p>'
                            +'</div>'
                        +'</div>'
                        +'<div class="modal_submit">'
                            +'<input id="alert_do"class="confirm" type="button" value="确认" />'
                        +'</div>'
                +'</div>'
                +'<div class="mask_layer"></div>';
         
        return str;
    },

    confirmDOM:function(){
         var str = "";
             str +='<div class="modal_box">'
                        +'<div class="modal_prompt">'
                            +'<span id="alert_title">提示</span>'
                         +'<a class="yc-close iconfont icon-guanbi"></a>'
                        +'</div>'
                        +'<div class="modal_content">'
                             +'<div class="modal_context">'
                                  +'<p id="alert_message">确认</p>'
                             +'</div>'
                        +'</div>'
                        +'<div class="modal_submit">'
                            +'<input id="alert_do" class="confirm" type="button" value="确认" />'
                            +'<input id="alert_cancel" class="confirm" type="button" value="取消"/>'
                        +'</div>'
                  +'</div>'
                  +'<div class="mask_layer"></div>';
        return str;
    },
    promptDOM:function(){
        var str = "";
           str +='<div class="modal_box">'
                        +'<div class="modal_prompt">'
                            +'<span id="alert_title">提示</span>'
                           +'<a class="yc-close iconfont icon-guanbi"></a>'
                        +'</div>'
                        +'<div class="modal_content reject">'
                            +'<div class="modal_context reject-content">'
                                +'<p class="tips" id="message"></p>'
                                +'<select name="reject_name" class="reject_sel" style="display:none">'
                                    +'<option value="0">请选择驳回类型</option>'
                                    +'<option value="1">选项1</option>'
                                    +'<option value="2">选项2</option>'
                                +'</select>'
                                +'<textarea  id="textarea_content" name="" maxlength="255"  class="reject_textarea" cols="52" rows="8"  placeholder=""></textarea>'
                            +'</div>'
                        +'</div>'
                        +'<div class="modal_submit">'
                            +'<input id="alert_do" class="confirm" type="button" value="提交" />'
                            +'<input id="alert_cancel" class="confirm" type="button" value="取消"/>'
                        +'</div>'
                +'</div>'
                +'<div class="mask_layer"></div>';
     
        return str;


    },
    formDOM:function(){},

    // 自定义弹框，改造自confirmDOM
    customDOM:function(){
         var str = "";
           str +='<div class="modal_box">'
                        +'<div class="modal_prompt">'
                            +'<span id="alert_title">提示</span>'
                            +'<a class="yc-close iconfont icon-guanbi"></a>'
                        +'</div>'
                        +'<div class="modal_content">'
                             +'<div class="modal_context">'
                             +'</div>'
                        +'</div>'
                        +'<div class="modal_submit">'
                            +'<input id="alert_do" class="confirm" type="button" value="确认" />'
                            +'<input id="alert_cancel" class="confirm" type="button" value="取消"/>'
                        +'</div>'
                +'</div>'
                +'<div class="mask_layer"></div>';

         
        return str;

    },


    bindEvent: function() {
        this.alert    =  function(){},    // 普通提醒     
        this.confirm  =  function(){},    // 确定消息框      
        this.prompt   =  function(){},    // 输入框
        this.form     =  function(){}     // 表单输入框
    },

    alert: function(message , btnValue , extendDOM) {

        // 依赖第三方modal_scrollbar.js  禁止页面滚动
        disableScroll();

        // 添加弹框
        $('body').append(this.alertDOM());


        // 绑定数据
        $('#alert_message').html(message);
        $('#alert_do').val(btnValue);

        // 绑定事件
        $('#alert_do,.yc-close').on('click',this.close);


        // 如果有扩展DOM，执行扩展
        extendDOM?this.extendDOM(extendDOM):null;

    },

    confirm:function(message , btn_arr , do_callback , extendDOM){

        // 依赖第三方modal_scrollbar.js  禁止页面滚动
        disableScroll();
        
        // 添加弹框
        $('body').append(this.confirmDOM());

       
        // 绑定数据
        $('#alert_message').html(message);
        $('#alert_do').val(btn_arr[0]);
        $('#alert_cancel').val(btn_arr[1]);

        // 绑定函数
        $('#alert_cancel,.yc-close').on('click',this.close);
        $('#alert_do').on('click',do_callback).on('click',this.close);

        // 如果有扩展DOM，执行扩展
        extendDOM?this.extendDOM(extendDOM):null;
       

    },

    prompt:function(message , btn_arr , textarea , do_callback,extendDOM){

        // 依赖第三方modal_scrollbar.js  禁止页面滚动
        disableScroll();
        
        // 添加弹框
        $('body').append(this.promptDOM());


        // 绑定数据
        $('#message').html(message);
        $('#alert_do').val(btn_arr[0]);
        $('#alert_cancel').val(btn_arr[1]);
        $('#textarea_content').attr('placeholder',textarea);


        // 绑定函数
        $('#alert_cancel,.yc-close').on('click',this.close);
        $('#alert_do').on('click',do_callback).on('click',this.close);

        // 如果有扩展DOM，执行扩展
        extendDOM?this.extendDOM(extendDOM):null;

    },

    custom:function(btn_arr , do_callback , extendDOM){

        // 依赖第三方modal_scrollbar.js  禁止页面滚动
        disableScroll();

        // 添加弹框
        $('body').append(this.customDOM());


        // 如果1个按钮
        if(typeof btn_arr == 'string' || btn_arr.length == 1){

            var do_val = btn_arr == 'string'?btn_arr:btn_arr[0];

            $('#alert_do').val(do_val);
            $('#alert_cancel').remove();

            // 传入了do_cb
            if(do_callback && typeof do_callback == 'function'){
                $('#alert_do').on('click',do_callback);
            }

        // 如果2个按钮
        }else if(btn_arr.length == 2){

            $('#alert_do').val(btn_arr[0]);
            $('#alert_cancel').val(btn_arr[1]);

             // 传入了do_cb
            if(do_callback && typeof do_callback == 'function'){
                $('#alert_do').on('click',do_callback);
            }

        }
       
        // 绑定函数
        $('.yc-close').on('click',this.close);
        $('#alert_cancel')? $('#alert_cancel').on('click',this.close):null;

        // 如果有扩展DOM，执行扩展
        extendDOM?this.extendDOM(extendDOM):null;
       

    },

    // 关闭、删除弹框
    close:function(){
        $('.modal_box,.mask_layer').remove();

        // 依赖第三方modal_scrollbar.js   解除禁止页面滚动
        enableScroll();

    },

    // 扩展DOM，允许用户在弹框中添加代码
    extendDOM:function(extendDOM){
        if(extendDOM && typeof extendDOM == 'string'){
            // 如果添加的是字符串
            $('.modal_context').append($('<div>'+ extendDOM+'</div>'));

        }else if(extendDOM && typeof extendDOM == 'object' && extendDOM.nodeType == 1){
            // 如果添加的是DOM节点
            $('.modal_context').append($(extendDOM));

        }else if(extendDOM && typeof extendDOM == 'object' && extendDOM instanceof jQuery){
            // 如果传入的是jQuery对象
            $('.modal_context').append(extendDOM);

        }else if(extendDOM){
            alert('extend参数不合符规范！');
        }
    }

  
})



