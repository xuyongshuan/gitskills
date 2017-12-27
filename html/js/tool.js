
var tool = {
    
   // 储存上传图片的宽和高,和下面的uploadBtnClick配合使用的
   	up_img:{
   		width:0,
   		height:0
   	},

    uploadBtnClick: function(param_fileToUpload,param_compressValue,param_imgBase64,$imgList) {
        var scope = this;
        // change pic to base64
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //For Ext :
            //var filefield = me.down('filefield'),
            //    file = filefield.fileInputEl.dom.files[0];    
            var filefield = param_fileToUpload,
                file = filefield.files[0];

            var compressValue = param_compressValue;
            processfile(file, compressValue, uploadCompressFile, scope);
        } else {
            alert("浏览器版本过低，请更新至最新浏览器版本。推荐谷歌、火狐浏览器！");
        }


        function processfile(file, compressValue, uploadCompressFile, scope) {
            var reader = new FileReader();
            reader.onload = function(event) {
                var blob = new Blob([event.target.result]);

                window.URL = window.URL || window.webkitURL;
                var blobURL = window.URL.createObjectURL(blob);

                var image = new Image();
                image.src = blobURL;
                image.onload = function() {
                    var resized = resizeMe(image);

                    compressValue.value = resized;
                    uploadCompressFile.apply(scope);
                }
            };
            reader.readAsArrayBuffer(file);

        }

        function resizeMe(img) {

            var max_width = 800;
            var max_height = 800;

            var canvas = document.createElement('canvas');
            var width = img.width;
            var height = img.height;

            tool.up_img.width = width;
            tool.up_img.height= height;

            if (width > height) {
                if (width > max_width) {
                    height = Math.round(height *= max_width / width);
                    width = max_width;
                }
            } else {
                if (height > max_height) {
                    width = Math.round(width *= max_height / height);
                    height = max_height;
                }
            }

            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            //压缩率
            return canvas.toDataURL("image/jpeg", 0.7);
        }


        function uploadCompressFile() {
            //do ajax upload
            param_imgBase64.innerHTML = param_compressValue.value;
            $imgList.attr('src', param_compressValue.value);
            var preview = param_compressValue.value;
            //  document.form1.submit();
            //$('#preview99').html(preview);
            //alert(preview);
            //必须对base64字符串进行转码，不然会丢失数据，后台获取保存数据出错
            preview = encodeURIComponent(preview);


            // if (preview) {
            //     $.ajax({
            //         url: "Merchant_issue_try3/save_uploadimg",
            //         type: "POST",
            //         data: 'imgBase64=' + preview,
            //         success: function(json) {
            //             $('#displayValue').html(json);
            //             //$('#imgList').attr('src',json);
            //             //alert(json);
            //         },
            //         error: function() {
            //             alert('操作失败，请跟技术联系');
            //         }
            //     });
            // }
        }

    }
    
}


// js 解决精度计算误差的问题
//加法
Number.prototype.add = function(arg){
    var r1,r2,m;
    try{r1=this.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (this*m+arg*m)/m
}

//减法
Number.prototype.sub = function (arg){
    return this.add(-arg);
}

//乘法
Number.prototype.mul = function (arg)
{
    var m=0,s1=this.toString(),s2=arg.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//除法
Number.prototype.div = function (arg){
    var t1=0,t2=0,r1,r2;
    try{t1=this.toString().split(".")[1].length}catch(e){}
    try{t2=arg.toString().split(".")[1].length}catch(e){}
    with(Math){
        r1=Number(this.toString().replace(".",""))
        r2=Number(arg.toString().replace(".",""))
        return (r1/r2)*pow(10,t2-t1);
    }
}


