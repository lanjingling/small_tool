$(document).ready(function(){

    $("#goback").click(function(){
        gobackPopup();
    });
    //paste clean format
    $("#json-display").on("paste", function (e) {
        textInit(e)
    });

    $("#format_btn").click(function(){
        //var json_val = $("#json-display").text();
        var my_json_val = $("#json-display").clone(false);
        my_json_val.find("a.json-placeholder").remove();
        var json_val = my_json_val.text();
        if(json_val){
            try {
                var jsonObj = JSON.parse(json_val);   //把json字符串转为json对象
                $("#json-display").jsonViewer(jsonObj,{withQuotes: true});

                setLocalStorage('json.input.jv', json_val);
            } catch(err) {
                $("#json-display").html(json_val+"<br><font color='red'>"+err.message+"</font>");
            }
        }
    });

    $("#compress_btn").click(function(){
        //var json_val = $("#json-display").text();
        var my_json_val = $("#json-display").clone(false);
        my_json_val.find("a.json-placeholder").remove();
        var json_val = my_json_val.text();
        if (json_val){
            var e = yasuo(json_val,1);
            //var e = json_val.trim().replace(/\ +/g,"").replace(/[\r\n]/g,"");
            $("#json-display").text(e);//去空格，去换行

            setLocalStorage('json.input.jv', e);
        }
    });

    $("#escap_btn").click(function(){
        //var json_val = $("#json-display").text();
        var my_json_val = $("#json-display").clone(false);
        my_json_val.find("a.json-placeholder").remove();
        var json_val = my_json_val.text();
        if(json_val){
            //var e = json_val.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
            var e = yasuo(json_val,2);
            $("#json-display").text(e);

            setLocalStorage('json.input.jv', e);
        }
    });

    $("#unescap_btn").click(function(){
        //var json_val = $("#json-display").text();
        var my_json_val = $("#json-display").clone(false);
        my_json_val.find("a.json-placeholder").remove();
        var json_val = my_json_val.text();
        if(json_val){
            //var e = json_val.replace(/\\\\/g, "\\").replace(/\\\"/g, '"')
            var e = yasuo(json_val,4);
            $("#json-display").text(e);

            setLocalStorage('json.input.jv', e);
        }
    });


    $("#clean_btn").click(function(){
        $("#json-display").empty();

        setLocalStorage('json.input.jv', "");
    });

    setLocalStorage('page.current', "json");

     //init
     var inputSjc = getLocalStorage('json.input.jv');
     if(inputSjc) {
         var jsonObj = JSON.parse(inputSjc);   //把json字符串转为json对象
         $("#json-display").jsonViewer(jsonObj,{withQuotes: true});
     }
});

function textInit(e) {
    e.preventDefault();
    var text;
    var clp = (e.originalEvent || e).clipboardData;
    if (clp === undefined || clp === null) {
        text = window.clipboardData.getData("text") || "";
        if (text !== "") {
            if (window.getSelection) {
                var newNode = document.createElement("span");
                newNode.innerHTML = text;
                window.getSelection().getRangeAt(0).insertNode(newNode);
            } else {
                document.selection.createRange().pasteHTML(text);
            }
        }
    } else {
        text = clp.getData('text/plain') || "";
        if (text !== "") {
            document.execCommand('insertText', false, text);
        }
    }
}

function yasuo(e,t) {
    if (1 === t || 3 === t) {
        for (var n = [], i = !1, o = 0, r = (e = e.split("\n").join(" ")).length; o < r; o++) {
            var a = e.charAt(o);
            i && a === i ? "\\" !== e.charAt(o - 1) && (i = !1) : i || '"' !== a && "'" !== a ? i || " " !== a && "\t" !== a || (a = "") : i = a,
            n.push(a)
        }
        e = n.join("")
    }
    2 !== t && 3 !== t || (e = e.replace(/\\/g, "\\\\").replace(/\"/g, '\\"')),
    4 === t && (e = e.replace(/\\\\/g, "\\").replace(/\\\"/g, '"')),
    ee = e;
    return ee;
}