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

    //init
    var val1 = getLocalStorage('diff.text.input1');
    let val2 = getLocalStorage('diff.text.input2');
    $("#baseText").val(val1);
    $("#newText").val(val2);

    setLocalStorage('page.current', "popup");
});



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
