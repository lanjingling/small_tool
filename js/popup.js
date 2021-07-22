$(function() {

	var currentPage = getLocalStorage('page.current');
	if(currentPage) {
		location.href = currentPage + '.html';
	}

	$( "#toolList" ).sortable({
		revert: true
	});

    //$('body').hide().fadeIn(200);

	$("#json_click").click(function(){
		chrome.tabs.create({'url': chrome.extension.getURL('json_all.html')}, function(tab) {
			// Tab opened.
		});
    });
	

	// 加载设置
	// var defaultConfig = {color: 'white'}; // 默认配置
	// chrome.storage.sync.get(defaultConfig, function(items) {
	// 	document.body.style.backgroundColor = items.color;
	// });

	// 初始化国际化
	// $('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));


});
function getLocalStorage(key){
    var storage=window.localStorage;
    return storage[key];
}
function setLocalStorage(key,val){
    var storage=window.localStorage;
    storage[key] = val;
}

