$(document).ready(function(){
    //init
    var inputSjc = getLocalStorage('cron.exp.input');
    $("#cron_val").val(inputSjc);


    $("#goback").click(function(){
        gobackPopup();
    });

    $("#exp_parse_btn").click(function(){
        var conVal = $("#cron_val").val();
        if (conVal) {
            var arr = conVal.split(" ");
            var isSec = arr.length > 5;
            try {
                var cron = later.parse.cron(conVal);
                var schedule = later.schedule(cron).next(10);
                var res = "<pre style='padding:5px;margin:5px;background: #1c2833;color: #fff;'>";
                for (let i in schedule) {
                    res += "第"+(Number(i)+1)+"次执行："+timeFormatStr(schedule[i]) + "\n";
                }
                res +="</pre>";

                $("#con_res").empty();
                $("#con_res").append(res);
    
                setLocalStorage('cron.exp.input', conVal);
            } catch(err) {
                alert("cron 表达式有误！");
                $("#con_res").empty();
            }
        }
    });

    $("#clean_btn").click(function(){
        $("#cron_val").val("");
        $("#con_res").empty();

        setLocalStorage('cron.exp.input', "");
    });

    $("#title_btn").click(function(){
        location.reload();
    });

    setLocalStorage('page.current', "crontab");
});

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