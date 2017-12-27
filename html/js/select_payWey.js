/**
 * Created by 二更 on 2017/4/8.
 * 选择支付方式
 */
$(function(){
    $('.bank').on('click',function(){
        $(this).addClass('pay_select_active');
        $(this).siblings().removeClass('pay_select_active');
        $(this).parent().siblings().find('td').removeClass('pay_select_active');
    });
    $('.zfb_rechange').on('click',function(){
        $(this).addClass('rechange_waySE');
        $('.yh_rechange').removeClass('rechange_waySE');
        $('.pay_select').addClass('pay_select_active');
        $('tfoot td.bank').removeClass('pay_select_active');
        set_bank('alipay');
    });
    $('.yh_rechange').on('click',function(){
        $(this).addClass('rechange_waySE');
        $('.zfb_rechange').removeClass('rechange_waySE');
        $('.pay_select').removeClass('pay_select_active');

        //$('tfoot td.first').parent().siblings().find('td').removeClass('pay_select_active');
        //set_bank('ICBC');
        $('tfoot td.first').siblings().removeClass('pay_select_active');
        $('tfoot td.first').parent().siblings().find('td').removeClass('pay_select_active');
        $('tfoot td.first').addClass('pay_select_active');
        set_bank('ICBC')
    });
    $('.pay_select').on('click',function(){
        $(this).addClass('pay_select_active');
        $('.zfb_rechange').addClass('rechange_waySE');
        $('.yh_rechange').removeClass('rechange_waySE');
        $('tfoot td.bank').removeClass('pay_select_active');
    });
    $('tfoot td.bank').on('click', function () {
        $('.zfb_rechange').removeClass('rechange_waySE');
        $('.yh_rechange').addClass('rechange_waySE');
        $('.pay_select').removeClass('pay_select_active');
    })

})

