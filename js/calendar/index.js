
$(function() {
    $("#calendar").calendar({
        /*
         * 传入今天的时间
         * 默认：客户端时间
         * 可传入一个服务器的时间
         */
        date: new Date(),
        width: 680,
        height: 400,
        /* 左右框显示的比例 */
        rate: 0.78,
        /*
         * 休假和加班设置
         * JSON格式：Y加年-M加月-D加日
         * 0表示休假 1表示加吧
         */
        configDay: {
            "Y2021": {
                "M9": {
                    "D18": 1,
                    "D19": 0,
                    "D20": 0,
                    "D21": 0
                },"M10": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D5": 1,
                    "D6": 0,
                    "D7": 0,
                    "D9": 1
                }
            }
        },
        week: false, // 是否开启单双休
        //week_walue: "2016/9/17", // 双休对应的周六
        isclick: false
    });

    $("#goback").click(function(){
        gobackPopup();
    });

    setLocalStorage('page.current', "calendar");
});
