$(document).ready(function(){
    $("#goback").click(function(){
        gobackPopup();
    });

    $("#zh_btn").click(function(){
        var data = $("#val_n").val();
        var sel = $("#sel_opt").val();

        if(data && sel){
            let v_10 = parseInt(data,sel);
            $("#res_2").val(v_10.toString(2));
            $("#res_8").val(v_10.toString(8));
            $("#res_10").val(v_10);
            $("#res_16").val(v_10.toString(16));
    
            setLocalStorage('binary.input.val', data);
            setLocalStorage('binary.input.sel', sel);
        }
    });

    $("#clean_btn").click(function(){
        $("#val_n").val("");
        $("#sel_opt").get(0).selectedIndex = 0;
        $("#res_2").val("");
        $("#res_8").val("");
        $("#res_10").val("");
        $("#res_16").val("");


        setLocalStorage('binary.input.val', "");
        setLocalStorage('binary.input.sel', "");
    });

    $("#title_btn").click(function(){
        location.reload();
    });

    //init
    var inputval = getLocalStorage('binary.input.val');
    var inputval2 = getLocalStorage('binary.input.sel');
    $("#val_n").val(inputval);
    if (inputval2) {
        $("#sel_opt").val(inputval2);
    }

    $('#zh_btn').trigger('click');	

    setLocalStorage('page.current', "binary");
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


