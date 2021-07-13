$(document).ready(function(){
    //init
    var inputSjc = getLocalStorage('json.input.jv');
    $("#json_value").val(inputSjc);

    $("#goback").click(function(){
        gobackPopup();
    });

    $("#format_btn").click(function(){
        
        var json_val = $("#json_value").val();
        if(json_val){
            var jsonObj = JSON.parse(json_val)   //把json字符串转为json对象
            var formattedStr = JSON.stringify(jsonObj, null, 4);
            $("#json_value").val(formattedStr);

            setLocalStorage('json.input.jv', formattedStr);
        }
    });

    $("#compress_btn").click(function(){
        var json_val = $("#json_value").val();
        if (json_val){
            var e = json_val.trim().replace(/\ +/g,"").replace(/[\r\n]/g,"");
            $("#json_value").val(e);//去空格，去换行

            setLocalStorage('json.input.jv', e);
        }
    });

    $("#escap_btn").click(function(){
        var json_val = $("#json_value").val();
        if(json_val){
            var e = json_val.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
            $("#json_value").val(e);

            setLocalStorage('json.input.jv', e);
        }
    });

    $("#unescap_btn").click(function(){
        var json_val = $("#json_value").val();
        if(json_val){
            var e = json_val.replace(/\\\\/g, "\\").replace(/\\\"/g, '"')
            $("#json_value").val(e);

            setLocalStorage('json.input.jv', e);
        }
    });


    $("#clean_btn").click(function(){
        $("#json_value").val("");

        setLocalStorage('json.input.jv', "");
    });

    setLocalStorage('page.current', "json");
});
