$(document).ready(function(){
    $("#goback").click(function(){
        gobackPopup();
    });

    $("#json_btn").click(function(){
        var val = $("#url_val").val();
        if (val) {
            var res = parseQueryString(val);
            var formattedStr = JSON.stringify(res, null, 4);
            $("#url_res").val(formattedStr);

            $("#url_res").prop("readonly",false)

            setLocalStorage('urlparam.input.val', val);
        }
    });

    $("#kv_btn").click(function(){
        var val = $("#url_val").val();
        if (val) {
            var res_obj = parseQueryString(val);
            var res_arr = [];
            for (var val in res_obj) {
                res_arr.push(val+"="+res_obj[val])
            }
            var res = res_arr.join("\n");
            $("#url_res").val(res);
            $("#url_res").prop("readonly",true)
        }    
    });

    $("#md_btn").click(function(){
        var val = $("#url_res").val();
        if (val && $("#url_res").attr("readonly")==undefined) {
            var jsonObj = JSON.parse(val);
            var res_arr = [];
            for(let key in jsonObj){
                let v = jsonObj[key];
                if (Array.isArray(v)) {
                    for(let j=0;j<v.length;j++) {
                        res_arr.push(key+"="+v[j]);
                    }
                } else {
                    res_arr.push(key+"="+v);
                }
            }
            var res = host_str+"?"+res_arr.join("&");
            $("#url_val").val(res);

            setLocalStorage('urlparam.input.val', res);

            $("#url_val").focus();
        }
    });
    
    $("#clean_btn").click(function(){
        $("#url_val").val("");
        $("#url_res").val("");

        setLocalStorage('urlparam.input.val', "");
    });

    $("#title_btn").click(function(){
        location.reload();
    });

    //init
    let inputval = getLocalStorage('urlparam.input.val');
    $("#url_val").val(inputval);
    $('#json_btn').trigger('click');	

    setLocalStorage('page.current', "url");
});

let host_str = "";

function parseQueryString(url) {
    let query = {};
    if (url.indexOf("?") != -1) {
        host_str = url.substr(0,url.indexOf("?"));
        const str = url.substr(url.indexOf("?")+1);
        const pairs = str.split("&");
        for(let i = 0; i < pairs.length; i ++) {
            const pair = pairs[i].split("=");
            const k = pair[0];
            const v = pair[1];
            if(query[k]){//string or array
                if(Array.isArray(query[k])) {
                    var arr = query[k];
                    arr[arr.length] = v;
                    query[k] = arr;
                } else {
                    var arr=new Array(2)
                    arr[0]=query[k];
                    arr[1]=v;
                    query[k] = arr;
                }
            } else {
                query[k] = v;
            }
        }
    }
    return query ;  // 返回对象
}
