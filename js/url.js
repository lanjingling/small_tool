$(document).ready(function(){
    

  
    $("#json_btn").click(function(){
        var val = $("#url_val").val();
        if (val) {
            var res = parseQueryString(val);
            var formattedStr = JSON.stringify(res, null, 4);
            $("#url_res").val(formattedStr);

            setLocalStorage('urlparam.input.val', val);
        }
    });

    $("#kv_btn").click(function(){
        var val = $("#url_val").val();
        if (val) {

        }    
    });
    
    $("#clean_btn").click(function(){
        $("#url_val").val("");
        $("#url_res").val("");

        setLocalStorage('urlparam.input.val', "");
    });

    //init
    let inputval = getLocalStorage('urlparam.input.val');
    $("#url_val").val(inputval);
    $('#json_btn').trigger('click');	
});



function parseQueryString(url) {
    let query = {};
    if (url.indexOf("?") != -1) {
        const str = url.substr(url.indexOf("?")+1);
        const pairs = str.split("&");
        for(let i = 0; i < pairs.length; i ++) {
            const pair = pairs[i].split("=");
            query[pair[0]] = pair[1];
        }
    }
    return query ;  // 返回对象
}
function getLocalStorage(key){
    var storage=window.localStorage;
    return storage[key];
}
function setLocalStorage(key,val){
    var storage=window.localStorage;
    storage[key] = val;
}
