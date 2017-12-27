/**
 * Created by bingbing on 2017-06-07.
 */


function post_yundan(){
    var order_id = $("#hidden_orderid").val();
    $.ajax({
        url : '/merchant_personal/update_confirm_ship',
        data:{order_id:order_id},
        type : 'post',
        cache : false,
        success : function (data){
            if(data == 1000){
                alert("确认发货成功");
                location.reload();
            }else{
                alert("确认发货失败");
            }
        },
        error : function (XMLHttpRequest, textStatus){
        }
    })
}

//试客已填写单号的确认发货
function post_yundan2(){
    var wuliu = $("#logistics2").val();
    var yundan = $("#waybill_number2").val();
    var order_id = $("#hidden_orderid").val();
    if(!wuliu){
        $("#logistics_error2").text("物流不能为空");
        return;
    }
    if(!yundan){
        $("#waybill_number_error2").text("运单号不能为空");
        return;
    }
    $.ajax({
        url : '/merchant_personal/update_confirm_ship',
        data:{wuliu:wuliu,yundan:yundan,order_id:order_id},
        //data:{order_id:order_id},
        type : 'post',
        cache : false,
        success : function (data){
            if(data == 1000){
                alert("确认发货成功");
                location.reload();
            }
            else{
                alert("确认发货失败");
            }
        },
        error : function (XMLHttpRequest, textStatus){
        }
    })
}

//弹出驳回框
$('.btn_alert_one,.btn_alert_two').on('click', function(e) {
    var order_id = $("#hidden_orderid").val();
    $.ajax({
        url : '/merchant_personal/check_rollback_nums',
        data:{order_id:order_id},
        type: 'post',
        cache:false,
        success: function(data){
            if(data == 1000){
                if ($(e.target).data('pannel')) {
                    var id = $(e.target).data('pannel');
                    $('.audit_modal').hide();
                    $('.pass_modal').hide();
                    $('.pass_modal2').hide();
                    $('#' + id + ',.mask_layer').show();
                    //$('body').css('overflow','hidden');
                    disableScroll();
                }
            } else if(data == 1001){
                alert('未知的订单ID');
                enableScroll();
            } else if(data == 1002){
                alert('查询的订单跟商家不匹配');
                enableScroll();
            } else {
                alert('已达到最大驳回次数，不能再驳回,如有问题，请联系客服');
                enableScroll();
            }
        }
    });

})


//试客发货单号的驳回
function rollback(){
    var content = $("#content").val();
    if( content.length == 0 ){
        alert("请输入驳回的原因");
        return false;
    }
    var act_id= $("#act_id").val();
    var order_id = $("#hidden_orderid").val();
    $.ajax({
        url : '/merchant_personal/rollback_shenhe',
        data:{order_id:order_id,content:content,act_id:act_id},
        type : 'post' ,
        cache : false,
        success : function (data){
            if(data == 'true'){
                alert("驳回审核成功");
                location.reload();
            }
            else{
                alert("驳回审核失败");
            }
        },
        error : function (XMLHttpRequest, textStatus){
            alert(2);
        }
    })
}

function post_shenhe(){
    var order_id = $("#hidden_orderid").val();
    $.ajax({
        url : '/merchant_personal/update_shenhe',
        data:{order_id:order_id},
        type : 'post',
        cache : false,
        success : function (data){
            if(data == 1000){
                // alert("确认审核成功");
                location.reload();
            }else if(data == 1001) {
                alert('确认审核失败');
            }else if(data == 1002){
                alert('订单状态不匹配')
            } else{
                alert("确认审核失败");
            }

        },
        error : function (XMLHttpRequest, textStatus){
            alert(2);
        }
    })
}


function post_tongguo(){
    var order_id = $("#hidden_orderid").val();
    $.ajax({
        url : '/merchant_personal/tongguo_shenhe',
        data:{order_id:order_id},
        type : 'post',
        cache : false,
        success : function (data){
            if(data == 0 || data == 500){
                //alert(data);
		location.reload();
            } else{
                // alert("确认通过成功");
                location.reload();
            }
        },
        error : function (XMLHttpRequest, textStatus){
        }
    })
}


//同意追评
function agree_add_comment(){
    var order_id = $("#hidden_orderid").val();

    $.ajax({
        url : '/merchant_order_details/agree_add_comment',
        data:{
            order_id:order_id
        },
        type : 'post',
        cache : false,
        success : function (data){
            if(data == 'false'){
                //alert("确认通过失败");
                location.reload();
            } else{
                // alert("确认通过成功");
                location.reload();
            }
        },
        error : function (XMLHttpRequest, textStatus){
        }
    })
}
//不通过追评
function disagree_add_comment(order_id){
    $.ajax({
        url:'/merchant_order_details/disagree_add_comment',
        data:{
            order_id:order_id
        },
        type : 'post',
        cache : false,
        success : function (data){
            if(data == 'true'){
                // alert("确认通过成功");
                location.reload();
            }
            else{
                alert("操作失败");
            }
        },
        error : function (XMLHttpRequest, textStatus){
            alert(2);
        }

    })
}

function show_deliver_modal(o){
    $('.delivery_modal').css('display','block');
    disableScroll();
    $('#hidden_orderid').val(o);
}

function show_audit_modal(o){
    $('.audit_modal').css('display','block');
    disableScroll();
    $('#hidden_orderid').val(o);
}
function show_pass_modal(o){
    $('.pass_modal').css('display','block');
    disableScroll();
    $('#hidden_orderid').val(o);
}

//确认追评
function show_pass_modal2(o){
    $('.pass_modal2').css('display','block');
     disableScroll();
    $('#hidden_orderid').val(o);
}

function show_deliver_modal2(o, wuliu, yundan){
    $('.delivery_modal2').css('display','block');
    $('#hidden_orderid').val(o);
    $("#logistics2").val(wuliu);
    $("#waybill_number2").val(yundan);
}


$(function () {
    $('.personal_center').find('a').addClass('leftNav_active');
    $('.mask_layer').height(document.body.scrollHeight+1000);
})
$('#exchange_money').bind('click', function () {
    $('.credits_exchange').css('display', 'block');
    disableScroll();
});

$('.confirm_exchange').bind('click', function () {
    var to_exchange = $("#principal").val();
    if (to_exchange <= 0) {
        return;
    }
    $.ajax({
        url: '/Merchant_personal/exchange_gold',
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: {
            to_exchange: to_exchange
        },
        success: function (result) {
            if (result.success == true) {
                $('.credits_get').css('display', 'block');
                $('.credits_exchange').css('display', 'none');
                $('.payment_succeed span').text(to_exchange);
                $('.reduce').text('已扣除' + to_exchange + '押金');
                disableScroll();
            }
            else {
                code = result.code;
                switch (code) {
                    case 1:
                        $(".principal_error").text("本金不足");
                        $("#myMoney b").text(result.data.my_money + '元');
                        break;
                    default:
                        break;
                }
            }
        },
        error: function (XMLHttpRequest, textStatus) {
        }
    })
});

$('.close,.cancel,.confirm').bind('click', function () {
    $('.delivery_modal,.delivery_modal2,.audit_modal,.pass_modal,.credits_exchange,.pass_modal2').css('display', 'none');
    $('#principal').val(0);
    $('.get_money').text(0);
    $('.principal_error').text();
    enableScroll();
});

