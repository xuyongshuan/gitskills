$(function() {

    init();

})

function init() {

    // 渲染试用进展表格
    tryPlan();
}


function tryPlan() {

    // 获取数据
    var act_id = $('#act_id').val();
    $.ajax({
        url: '/Merchant_activity_details/get_num',
        data: { 'act_id': act_id },
        dataType: 'json',
        success: function(data) {
            if (data.code == 1)
                planTable(data.res)
        }
    })
}

function planTable(data) {
    var show_day = parseInt(data.show_day);
    var arr_trial_num = data.trial_num.split(',');
    var arr_exchange_num=data.exchange_num.split(',');
    var arr_conversion_rate = data.conversion_rate.split(',');
    var act_status = parseInt(data.status);
    var dates = JSON.parse(data.dates);
    var cur_day_index = parseInt(data.cur_day_index);

    // 计算总跨度
    var len = show_day + arr_trial_num.length;
    var row = parseInt(len / 7);
    var remain_num = len % 7;



    // 返回表格DOM树
    var table = tableDom(row, remain_num);
    $('#try_plan_table').html(table);
    
    // 填充数据
    fillNum(show_day,arr_trial_num,arr_conversion_rate,act_status,dates,cur_day_index)

}

// row整数行，remain_num剩余单元格
function tableDom(row, remain_num) {

    // 渲染整数行
    var str = '';
    for (var i = 0; i < row; i++) {
        // 写表格标题
        str += '<tr>';
        for (var j = 0; j < 7; j++) {
            str += '<th></th>';
        }
        str += '</tr>';

        // 写表格份数
        str += '<tr>';
        for (var j = 0; j < 7; j++) {
            str += '<td></td>';
        }
        str += '</tr>';
    }

    // 渲染剩余行
    str += '<tr>';
    for (var i = 0; i < remain_num; i++) {
        str += '<th></th>';
    }
    str += '</tr>';

    str += '<tr>';
    for (var i = 0; i < remain_num; i++) {
        str += '<td></td>';
    }
    str += '</tr>';

    return str;
}

function fillNum(show_day,arr_trial_num,arr_exchange_num,act_status,dates,cur_day_index){
    var arr_days = ['第一天','第二天','第三天','第四天','第五天','第六天','第七天','第八天','第九天','第十天','第十一天','第十二天','第十三天','第十四天','第十五天','第十六天','第十七天','第十八天','第十九天','第二十天','第二十一天','第二十二天'];
    var new_arr = [];
    arr_exchange_num.map(function (value,index,array) {
        new_arr[index] = value === "0" ?"无转化率":value+"%";
    });
    var $table_th = $('#try_plan_table th');
    var $table_td = $('#try_plan_table td');
    $table_th.each(function(index,el){
        if(act_status == 3 || act_status == 4){
            if(dates){
                $(el).html(arr_days[index] + '<br/>' + dates[index]);

                if(cur_day_index == index){
                    $(el).css('color', 'red');
                }
            }
        }else {
            $(el).html(arr_days[index]);
        }
    })
    var str ="";
    var i=0;
    $table_td.each(function(index, el) {
        str = index < show_day?'展示期':arr_trial_num[index-show_day] + '份' + '('+ (new_arr[index-show_day] ? new_arr[index-show_day] : '%') +')';
        $(el).html(str);
        if(act_status == 3 || act_status == 4){
            if(cur_day_index == index){
                $(el).css('color', 'red');
            }
        }
    });
}

