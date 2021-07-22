$(document).ready(function(){
    var str = getCurrentTimeStr();
    $("#current_value").html(str).css("color","red");
    //init
    var inputSjc = getLocalStorage('time.input.sjc');
    let outputSjc = getLocalStorage('time.output.sjc');
    $("#sjc").val(inputSjc);
    $("#sjc_value").val(outputSjc);
    let inputSj = getLocalStorage('time.input.sj');
    let outputSj = getLocalStorage('time.output.sj');
    $("#sj").val(inputSj);
    $("#sj_value").val(outputSj);


    $("#goback").click(function(){
        gobackPopup();
    });
    
    $("#sh_refresh").click(function(){
        var str = getCurrentTimeStr();
        $("#current_value").html(str).css("color","red");
    });

    $("#sjc_btn").click(function(){
        var stmp = $("#sjc").val();
        var shijianchuo = 0;
        if(stmp.length == 10){
            shijianchuo = parseInt(stmp) * 1000;
        } else if(stmp.length == 13){
            shijianchuo = parseInt(stmp);
        }
        var str = timeFormatStr(shijianchuo);
        $("#sjc_value").val(str);

        setLocalStorage('time.input.sjc', stmp);
        setLocalStorage('time.output.sjc', str);
    });

    $("#sj_btn").click(function(){
        var stmp = $("#sj").val();
        var date = new Date(stmp);
        var str = date.getTime()/1000;
        $("#sj_value").val(str);

        setLocalStorage('time.input.sj', stmp);
        setLocalStorage('time.output.sj', str);
    });

    $("#clean_btn").click(function(){
        $("#sjc").val("");
        $("#sj").val("");
        $("#sjc_value").val("");
        $("#sj_value").val("");

        setLocalStorage('time.input.sj', "");
        setLocalStorage('time.input.sjc', "");
        setLocalStorage('time.output.sj', "");
        setLocalStorage('time.output.sjc', "");
    });

    $("#title_btn").click(function(){
        location.reload();
    });

    setLocalStorage('page.current', "time");
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

