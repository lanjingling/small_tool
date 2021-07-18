$(document).ready(function(){
    $("#sidebyside").click(function(){
        diffUsingJS(0);

        setLocalStorage('diff.text.input1', $("#baseText").val());
        setLocalStorage('diff.text.input2', $("#newText").val());
    });

    $("#inline").click(function(){
        diffUsingJS(1);

        setLocalStorage('diff.text.input1', $("#baseText").val());
        setLocalStorage('diff.text.input2', $("#newText").val());
    });

    $("#json_diff_btn").click(function(){
        var left = parseTxt($("#baseJson").val());
        var right = parseTxt($("#newJson").val());
        
        var delta = instance.diff(left, right);
        //console.log(rows[0].schema);
        //console.log(rows[1].schema);
        if (typeof delta === 'undefined') {
            document.getElementById('visual').innerHTML = "<div style='margin:10px;font-size:30px;'>no diff...</div>";
        } else {
            document.getElementById('visual').innerHTML = jsondiffpatch.formatters.html.format(delta, left);
            jsondiffpatch.formatters.html.hideUnchanged();
        }

        setLocalStorage('diff.json.input1', $("#baseJson").val());
        setLocalStorage('diff.json.input2', $("#newJson").val());
    });

    $("#clean_btn").click(function(){
        $("#baseText").val("");
        $("#newText").val("");
        $("#diffoutput").empty();

        setLocalStorage('diff.text.input1', "");
        setLocalStorage('diff.text.input2', "");
    });
    $("#clean_btn2").click(function(){
        $("#baseJson").val("");
        $("#newJson").val("");
        $("#visual").empty();

        setLocalStorage('diff.json.input1', "");
        setLocalStorage('diff.json.input2', "");
    });

    //init
    var val1 = getLocalStorage('diff.text.input1');
    let val2 = getLocalStorage('diff.text.input2');
    $("#baseText").val(val1);
    $("#newText").val(val2);

    var val12 = getLocalStorage('diff.json.input1');
    let val22 = getLocalStorage('diff.json.input2');
    $("#baseJson").val(val12);
    $("#newJson").val(val22);
    

    //popup.html
    setLocalStorage('page.current', "");

    //back top
    var $goTopBottom = $('<div id="goTop" style="border-radius:5px;solid #444;background:#333;color:#fff;text-align:center;padding:10px 13px 7px 13px;position:fixed;bottom:50px;right:5px;cursor:pointer;display:none;font-family:verdana;font-size:15px;">∧</div><div id="goBottom" style="border-radius:5px;solid #444;background:#333;color:#fff;text-align:center;padding:10px 13px 7px 13px;position:fixed;bottom:10px;right:5px;cursor:pointer;display:none;font-family:verdana;font-size:15px;">∨</div>').appendTo('body');

    $(window).scroll(function() {
       if ($(this).scrollTop() != 0) {
           $goTopBottom.fadeIn();
       } else {
           $goTopBottom.fadeOut();
       }
    });
    $("#goTop").click(function() {
       $('body, html').animate({
           scrollTop: 0
       }, 800);
    });
    $("#goBottom").click(function() {
       $('body, html').animate({
           scrollTop: document.body.clientHeight
       }, 800);
    });
});

const instance = jsondiffpatch.create({
    objectHash: function(obj, index) {
    if (typeof obj._id !== 'undefined') {
        return obj._id;
    }
    if (typeof obj.id !== 'undefined') {
        return obj.id;
    }
    if (typeof obj.name !== 'undefined') {
        return obj.name;
    }
    return '$$index:' + index;
    },
});
function parseTxt(txt) {
    if (
        /^\d+(.\d+)?(e[+-]?\d+)?$/i.test(txt) ||
        /^(true|false)$/.test(txt) ||
        /^["].*["]$/.test(txt) ||
        /^[{[](.|\n)*[}\]]$/.test(txt)
    ) {
        return JSON.parse(txt, jsondiffpatch.dateReviver);
    }
    return txt; 
}


function diffUsingJS(viewType) {
	"use strict";
	var byId = function (id) { return document.getElementById(id); },
		base = difflib.stringAsLines(byId("baseText").value),
		newtxt = difflib.stringAsLines(byId("newText").value),
		sm = new difflib.SequenceMatcher(base, newtxt),
		opcodes = sm.get_opcodes(),
		diffoutputdiv = byId("diffoutput"),
		contextSize = byId("contextSize").value;

	diffoutputdiv.innerHTML = "";
	contextSize = contextSize || null;

	diffoutputdiv.appendChild(diffview.buildView({
		baseTextLines: base,
		newTextLines: newtxt,
		opcodes: opcodes,
		baseTextName: "文本一",
		newTextName: "文本二",
		contextSize: contextSize,
		viewType: viewType
	}));
}

function getLocalStorage(key){
    var storage=window.localStorage;
    return storage[key];
}
function setLocalStorage(key,val){
    var storage=window.localStorage;
    storage[key] = val;
}
