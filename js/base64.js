$(document).ready(function(){
    //init
    let inputval = getLocalStorage('base64.input.val');
    let outputval = getLocalStorage('base64.output.val');
    $("#base_val").val(inputval);
    $("#base_res").val(outputval);

    let inputval2 = getLocalStorage('url.input.val');
    let outputval2 = getLocalStorage('url.output.val');
    $("#url_val").val(inputval2);
    $("#url_res").val(outputval2);


    $("#base_encode_btn").click(function(){
        var val = $("#base_val").val();
        var str = Base64.encode(val);
        $("#base_res").val(str);

        setLocalStorage('base64.input.val', val);
        setLocalStorage('base64.output.val', str);
    });
    $("#base64_change").click(function(){
        var base_val = $("#base_val").val();
        var base_res = $("#base_res").val();

        $("#base_val").val(base_res);
        $("#base_res").val(base_val);
    });
    $("#base_decode_btn").click(function(){
        var val = $("#base_val").val();
        var str = Base64.decode(val);
        $("#base_res").val(str);

        setLocalStorage('base64.input.val',val);
        setLocalStorage('base64.output.val', str);
    });
    $("#clean_btn").click(function(){
        $("#base_val").val("");
        $("#base_res").val("");

        setLocalStorage('base64.input.val', "");
        setLocalStorage('base64.output.val', "");
    });


    $("#url_encode_btn").click(function(){
        var val = $("#url_val").val();
        var str = encodeURIComponent(val);
        $("#url_res").val(str);

        setLocalStorage('url.input.val', val);
        setLocalStorage('url.output.val', str);
    });
    $("#url_change").click(function(){
        var url_val = $("#url_val").val();
        var url_res = $("#url_res").val();

        $("#url_val").val(url_res);
        $("#url_res").val(url_val);
    });
    $("#url_decode_btn").click(function(){
        var val = $("#url_val").val();
        var str = decodeURIComponent(val);
        $("#url_res").val(str);

        setLocalStorage('url.input.val',val);
        setLocalStorage('url.output.val', str);
    });
    $("#url_clean_btn").click(function(){
        $("#url_val").val("");
        $("#url_res").val("");

        setLocalStorage('url.input.val', "");
        setLocalStorage('url.output.val', "");
    });
});



function getCurrentTimeStr(){
    var t1 = Date.parse(new Date())/1000;
    var t2 = new Date().getTime();

    return "10位：" + t1 + " ; 13位（毫秒）:" + t2;
}

function add0(m){return m<10?'0'+m:m }
function timeFormatStr(shijianchuo){
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
}

function getLocalStorage(key){
    var storage=window.localStorage;
    return storage[key];
}
function setLocalStorage(key,val){
    var storage=window.localStorage;
    storage[key] = val;
}
