//监控的逻辑
(function () {
    $(".content").eq(0).show()
    $(".monitor .tabs span").click(function () {
        const _index = $(this).index()
        $(this).addClass('active').siblings("span").removeClass('active')
        $(".content").eq(_index).show().siblings(".content").hide()
    })

    $(".marquee").each(function () {
        const rows = $(this).children().clone()
        $(this).append(rows)
    })
})();

//饼图
(function () {
    const pie = document.querySelector(".pie")
    const echartsInstance = echarts.init(pie)
    const option = {
        color: ['#006cff', "#60cda0", "#ed8884", "#ff9f7f", '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
            {
                name: '销售统计',
                type: 'pie',
                radius: ["10%", "70%"],
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                label: {
                    fontSize: 10
                },
                labelLine: {
                    //连接到图形的线长度
                    length: 6,
                    //连接到文字的线长度
                    length2: 8
                },
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '⼭东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ]
            }
        ]
    }

    echartsInstance.setOption(option)
    window.addEventListener('resize', () => {
        echartsInstance.resize()
    })
})();

//柱状图
(function () {
    const bar = document.querySelector(".bar")
    const echartsInstance = echarts.init(bar)
    const item = {
        value: 1200,
        itemStyle: {
            color: '#254065'
        },
        //鼠标经过柱子字颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        //工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        }
    };

    const option = {
        tooltip: {
            trigger: 'item',
        },
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                {
                    offset: 0,
                    color: '#00fffb'
                },
                {
                    offset: 1,
                    color: "#0061ce"
                }
            ],
            global: false
        },
        grid: {
            top: '3%',
            left: '0',
            right: '3%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderColor: 'rgba(0,240,255,0.3)'

        },
        xAxis: {
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: { show: false, alignWithLabel: false },
            axisLabel: {
                color: '#4c9bfd',
                fontSize: 8
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0,240,255,0.3)'
                }
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                //不显示刻度
                show: false
            },
            axisLabel: {
                //y坐标轴文字标签样式设置
                color: '#4c9bfd'
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0,240,255,0.3)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0,240,255,0.3)'
                }
            }
        },
        series: [
            {
                barWidth: "50%",
                data: [
                    2100,
                    1900,
                    1700,
                    1560,
                    1400,
                    item,
                    item,
                    item,
                    900,
                    750,
                    600,
                    480,
                    240
                ],
                type: 'bar'
            }
        ]
    };

    echartsInstance.setOption(option)
    window.addEventListener("resize", () => {
        echartsInstance.resize()
    })
})();


//订单逻辑
(function () {
    //数据源
    var data = {
        day365: { orders: '20,301,987', amount: '99834' },
        day90: { orders: '301,987', amount: '9834' },
        day30: { orders: '1,987', amount: '3834' },
        day1: { orders: '987', amount: '834' },
    }
    //获取显示 订单数量 容器
    const $h4rders = $(".order h4").eq(0)
    const $h4Amount = $(".order h4").eq(1)
    $h4rders.html(data["day365"].orders)
    $h4Amount.html(data["day365"].amount)

    $(".order .filter span").click(function () {
        let _index = $(this).index()
        render(_index)
    })

    function render(index) {
        const key = $(".order .filter span").get(index).dataset.index
        $(".order .filter span").eq(index).addClass("active").siblings("span").removeClass("active")
        const item = data[key]
        $h4rders.html(item.orders)
        $h4Amount.html(item.amount)
    }
    let timer
    let i = 0
    function autoToggle() {
        timer = setInterval(() => {
            i++;
            if (i > 3) {
                i = 0
            }
            render(i)
        }, 1000)
    }
    autoToggle()

    $(".order").hover(function () {
        clearInterval(timer)
    }, function () {
        autoToggle()
    })
})();


//销售额逻辑
//折线图
(function () {

    function render(index) {
        $(".caption span").eq(index).addClass("active").siblings("span").removeClass("active")
    }
    let i = 0
    let timer = -1
    function autoToggle() {
        timer = setInterval(() => {
            i++;
            if (i > 3) {
                i = 0
            }
            render(i)
        }, 1000)
    }
    autoToggle()

    $(".sales").hover(() => {
        clearInterval(timer)
    }, () => {
        autoToggle()
    })

    const line = document.querySelector(".line")
    const echartsInstance = echarts.init(line)
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };
    echartsInstance.setOption(option)
    window.addEventListener("resize", () => {
        echartsInstance.resize()
    })

    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    $(".caption span").click(function () {
        const index = ($(this).index()) - 1
        render(index)
        const item = data[this.dataset.index]

        option.series[0].data = item[0]
        option.series[1].data = item[1]
        echartsInstance.setOption(option)
    })
})();











(function () {
    const redar = document.querySelector('.radar')
    const echartsInstance = echarts.init(redar)

    const lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    }
    const option = {
        tooltip: {
            show: true,
            // 控制提示框组件的显示位置
            position: ["60%", "10%"]
        },
        radar: {
            indicator: [
                { name: "机场", max: 100 },
                { name: "商场", max: 100 },
                { name: "⽕⻋站", max: 100 },
                { name: "汽⻋站", max: 100 },
                { name: "地铁", max: 100 }
            ],
            // 修改雷达图的⼤⼩
            radius: "65%",
            shape: "circle",
            // 分割的圆圈个数
            splitNumber: 4,
            name: {
                // 修饰雷达图⽂字的颜⾊
                textStyle: {
                    color: "#4c9bfd"
                }
            },
            // 分割的圆圈线条的样式
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255, 0.5)"
                }
            },
            splitArea: {
                show: false
            },
            // 坐标轴的线修改为⽩⾊半透明
            axisLine: {
                lineStyle: {
                    color: "rgba(255, 255, 255, 0.5)"
                }
            }
        },
        series: [
            {
                name: "北京",
                type: "radar",
                // 填充区域的线条颜⾊
                lineStyle: {
                    normal: {
                        color: "#fff",
                        width: 1,
                        opacity: 0.5
                    }
                },
                data: [[90, 19, 56, 11, 34]],
                // 设置图形标记 （拐点）
                symbol: "circle",
                // 这个是设置⼩圆点⼤⼩
                symbolSize: 5,
                // 设置⼩圆点颜⾊
                itemStyle: {
                    color: "#fff"
                },
                // 让⼩圆点显示数据
                label: {
                    show: true,
                    fontSize: 10
                },
                // 修饰我们区域填充的背景颜⾊
                areaStyle: {
                    color: "rgba(238, 197, 102, 0.6)"
                }
            }
        ]
    };
    // 3.把配置和数据给对象
    echartsInstance.setOption(option);
    // 当我们浏览器缩放的时候，图表也等⽐例缩放
    window.addEventListener("resize", function () {
        // 让我们的图表调⽤ resize这个⽅法
        echartsInstance.resize();
    });
})()