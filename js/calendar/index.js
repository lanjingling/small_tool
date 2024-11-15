﻿
$(function() {
    const ind = Math.floor(Math.random()*3);
    const year = new Date().getFullYear();

    var isAlmanac = true;//是否开启宜忌
    var almanacDatas = {};
    if (isAlmanac) {
        const almanac_json = getLocalStorage('calendar.almanac.data');
        if(!almanac_json || JSON.parse(almanac_json).year !== year) {
            $.ajax({
                url: "http://calendar.itemev.com/index/almanac.json?year="+year,
                type: "GET",
                async: false,
                dataType: "json",
                timeout : 500,
                error : function(xhr,textStatus) {
                    isAlmanac = false;
                    console.log('get almanac data error:'+textStatus);
                },
                success: function(data) {
                    //{"2021-1-1":{"avoid":"斋醮、作梁","suit":"动土、定磉、扫舍"},"2021-1-10":{"avoid":"嫁娶、开市、入宅、安床、破土","suit":"捕捉、畋猎"}}
                    almanacDatas = data;
                    const item = {
                        value: almanacDatas,
                        year: year
                    }
                    setLocalStorage('calendar.almanac.data', JSON.stringify(item));
                }
            });
        } else {
            almanacDatas = JSON.parse(almanac_json).value;
        }
    }
    

    $("#calendar").calendar({
        /*
         * 传入今天的时间
         * 默认：客户端时间
         * 可传入一个服务器的时间
         */
        date: new Date(),
        width: 680,
        height: 480,
        /* 左右框显示的比例 */
        rate: 0.8,
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
                    "D5": 0,
                    "D6": 0,
                    "D7": 0,
                    "D9": 1
                }
            },
            "Y2022": {
                "M4": {
                    "D2": 1,
                    "D3": 0,
                    "D4": 0,
                    "D5": 0,
                    "D30": 0
                }, "M5": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D7": 1
                }, "M6": {
                    "D3": 0,
                    "D4": 0,
                    "D5": 0
                }, "M9": {
                    "D10": 0,
                    "D11": 0,
                    "D12": 0
                }, "M10": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D5": 0,
                    "D6": 0,
                    "D7": 0,
                    "D8": 1,
                    "D9": 1
                }, "M12": {
                    "D31":0
                }
            },
            "Y2023": {
                "M1": {
                    "D1": 0,
                    "D2": 0,
                    "D21": 0,
                    "D22": 0,
                    "D23": 0,
                    "D24": 0,
                    "D25": 0,
                    "D26": 0,
                    "D27": 0,
                    "D28": 1,
                    "D29": 1
                }, "M4": {
                    "D5": 0,
                    "D23": 1,
                    "D29": 0,
                    "D30": 0
                }, "M5": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D6": 1
                }, "M6": {
                    "D22": 0,
                    "D23": 0,
                    "D24": 0,
                    "D25": 1
                }, "M9": {
                    "D29": 0,
                    "D30": 0
                }, "M10": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D5": 0,
                    "D6": 0,
                    "D7": 1,
                    "D8": 1
                }, "M12": {
                    "D30": 0,
                    "D31": 0
                }
            },
            "Y2024": {
                "M1": {
                    "D1": 0
                }, 
                "M2": {
                    "D4": 1,
                    "D10": 0,
                    "D11": 0,
                    "D12": 0,
                    "D13": 0,
                    "D14": 0,
                    "D15": 0,
                    "D16": 0,
                    "D17": 0,
                    "D18": 1
                }, "M4": {
                    "D4": 0,
                    "D5": 0,
                    "D6": 0,
                    "D7": 1,
                    "D28": 1
                }, "M5": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D5": 0,
                    "D11": 1
                }, "M6": {
                    "D8": 0,
                    "D9": 0,
                    "D10": 0
                }, "M9": {
                    "D14": 1,
                    "D15": 0,
                    "D16": 0,
                    "D17": 0,
                    "D29": 1
                }, "M10": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D5": 0,
                    "D6": 0,
                    "D7": 0,
                    "D12": 1
                }
            },
            "Y2025": {
                "M1": {
                    "D1": 0,
                    "D26": 1,
                    "D28": 0,
                    "D29": 0,
                    "D30": 0,
                    "D31": 0,
                }, 
                "M2": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D8": 1
                }, "M4": {
                    "D4": 0,
                    "D5": 0,
                    "D6": 0,
                    "D27": 1
                }, "M5": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D5": 0,
                    "D31": 0
                }, "M6": {
                    "D1": 0,
                    "D2": 0
                }, "M9": {
                    "D28": 1
                }, "M10": {
                    "D1": 0,
                    "D2": 0,
                    "D3": 0,
                    "D4": 0,
                    "D5": 0,
                    "D6": 0,
                    "D7": 0,
                    "D8": 0,
                    "D11": 1
                }
            }
        },
        week: false, // 是否开启单双休
        //week_walue: "2016/9/17", // 双休对应的周六
        isclick: false,
        isAlmanac: isAlmanac,
        almanacDatas:almanacDatas,
        skin_ind:ind
    });

    
    
   

    $('body').hide().fadeIn(500);

    $("#goback").click(function(){
        gobackPopup();
    });
    $("#title_btn").click(function(){
        location.reload();
    });

    setLocalStorage('page.current', "calendar");
});
function setWithExpiry(key, value, ttl) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}