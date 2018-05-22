//X axis 
var myDate = new Date();
timestamp = myDate.getTime();

var timeline=[];
var timelinelength=99;
for(var i=timelinelength;i>=0;i--) {
    var timebefore = new Date(timestamp-i*1000);
    timeline.push(timebefore.toLocaleTimeString());
}

var timebar=[];
var timebarlength=20;

for(var i=timebarlength;i>=0;i--) {
    var timebefore = new Date(timestamp-i*1000);
    timebar.push(timebefore.toLocaleTimeString());
}
//end X axis 

/******************cpu_utils*********************** */
var cpu_utils = echarts.init(document.getElementById('cpu_utils'));
var cpu_utils_data = [];
var totalcpusum = 0;
var idlecpusum = 0;
var temputils = 0;
for(var i=timelinelength;i>=0;i--) {
    cpu_utils_data.push(0);
}
$.get('/proc/stat').done(function (data) {
    totalcpusum= data.totalcpu;
    idlecpusum=data.idlecpu;
});
cpu_util_option = {
    title: {
        text: 'CPU Utilization'
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'category',
        splitLine: {
            show: false
        },
        data:timeline
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, 1],
        axisLabel: {  
            show: true,  
            interval: 'auto',  
            formatter: '{value} %'  
        },  
        splitLine: {
            show: true
        },
        min: 0 ,
        max: 100 ,
    },
    series: [{
        name: 'CPU_UTIL',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: cpu_utils_data
    }]
};
cpu_utils.setOption(cpu_util_option);
/****************** end cpu_utils*********************** */


/****************** running_process*********************** */
var running_process = echarts.init(document.getElementById('running_process'));
var running_process_data = [];
for(var i=timebarlength;i>=0;i--) {
    running_process_data.push(0);
}
running_process_option = {
    title: {
        text: 'Process',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['Process-bar', 'Process-line']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: timebar
        },
        {
            type: 'category',
            boundaryGap: true,
	    scale: true,
            data: timebar
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: 'Process NUmber',
            min: 0 ,
            boundaryGap: [0, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: 'Process NUmber',
            min: 0 ,
            boundaryGap: [0, 0.2]
        }
    ],
    series: [
        {
            name:'Process-bar',
            type:'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data:running_process_data
        },
        {
            name:'Process-line',
            type:'line',
            
            data:running_process_data
        }
    ]
};
running_process.setOption(running_process_option);

/****************** end running_process*********************** */


/****************** loadavg*********************** */
var loadavg = echarts.init(document.getElementById('loadavg'));
var loadavg_5_data = [];
var loadavg_10_data = [];
var loadavg_15_data = [];

for(var i=timelinelength;i>=0;i--) {
    loadavg_5_data.push(0);
    loadavg_10_data.push(0);
    loadavg_15_data.push(0);
}
loadavg_option = {
    title: {
        text: 'Load Average',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['5 Min', '10 Min', '15 Min']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: timeline
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: 'Average Tasks',
            min: 0 ,
            boundaryGap: [0, 0.2]
        },
    ],
    series: [
        {
            name:'5 Min',
            type:'line',
            data:loadavg_5_data
        },
        {
            name:'10 Min',
            type:'line',
            data:loadavg_10_data
        },
        {
            name:'15 Min',
            type:'line',
            data:loadavg_15_data
        }

    ]
};
loadavg.setOption(loadavg_option);
/****************** end loadavg*********************** */


/****************** Meminfo*********************** */
var meminfo = echarts.init(document.getElementById('memory_usage'));
var meminfo_data = [];

for(var i=timelinelength;i>=0;i--) {
    meminfo_data.push(0);
}

meminfo_option = {
    title: {
        text: 'Memeory Usage',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['Memory Usage']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },

    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: timeline
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: 'Memory Usage',
            min: 0 ,
            max: 100,
            boundaryGap: [0, 0.2],
            axisLabel: {  
                show: true,  
                interval: 'auto',  
                formatter: '{value} %'  
            },  
        },
    ],
    series: [
        {
            name:'Memory Usage',
            type:'line',
            itemStyle: {
                normal: {
                    color: '#a8bcd4'
                }
            },
            data:meminfo_data
        }
    ]
};
meminfo.setOption(meminfo_option);

/****************** end meminfo*********************** */

/****************** tcp*********************** */
var tcp = echarts.init(document.getElementById('tcp'));
var tcp_v4_data = [];
var tcp_v6_data = [];
for(var i=timebarlength;i>=0;i--) {
    tcp_v4_data.push(0);
    tcp_v6_data.push(0);
}
tcp_option = {
    title: {
        text: 'TCP Links',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['TCPv4', 'TCPv6']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: timebar
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: 'TCP Links',
            min: 0 ,
            boundaryGap: [0, 0.2]
        },
    ],
    series: [
        {
            name:'TCPv4',
            type:'bar',
            itemStyle: {
                normal: {
                    color: '#5f9ea0'
                }
            },
            data:tcp_v4_data
        },
        {
            name:'TCPv6',
            type:'bar',
            itemStyle: {
                normal: {
                    color: '#7fff00'
                }
            },
            data:tcp_v6_data
        }
    ]
};
tcp.setOption(tcp_option);

/****************** end tcp*********************** */


/****************** udp*********************** */
var udp = echarts.init(document.getElementById('udp'));
var udp_v4_data = [];
var udp_v6_data = [];
for(var i=timebarlength;i>=0;i--) {
    udp_v4_data.push(0);
    udp_v6_data.push(0);
}
udp_option = {
    title: {
        text: 'UDP Links',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    legend: {
        data:['UDPv4', 'UDPv6']
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: {
        show: false,
        start: 0,
        end: 100
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: true,
            data: timebar
        }
    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: 'udp Links',
            min: 0 ,
            boundaryGap: [0, 0.2]
        },
    ],
    series: [
        {
            name:'UDPv4',
            type:'bar',
            data:udp_v4_data
        },
        {
            name:'UDPv6',
            type:'bar',
            
            data:udp_v6_data
        }
    ]
};
udp.setOption(udp_option);

/****************** end udp*********************** */


/*********************NetDevice************************** */
var netdevice=[];

var receive=[];
var receive_data=[];
var receive_option = [];
var transmit = [];
var transmit_data = [];
var transmit_option = [];

$.ajax({
    url: "/proc/netdev",
    async:true,
    success: function(data){
        var i = 0;
        for(var item in data) {
            netdevice[i]=item;
            i++;
        }
        for (var i=0;i<netdevice.length;i++) {
            createNewDiv(netdevice[i]+"_T",netdevice[i]+"_R");
            createNetChart(netdevice[i]+"_T",netdevice[i]+"_R",data[netdevice[i]][0],data[netdevice[i]][1],netdevice[i],i);
        }
    }  
  });


/*********************end NetDevice************************** */


/********************Update the chart every one second********************************** */
setInterval(function () {
    /************update x axis************/
    timeline.push(new Date().toLocaleTimeString());
    timeline.shift();
    /************update x axis************/


    /*********CPU utilization update**********/
     $.get('/proc/stat').done(function (data) {
        temputils = 1-(data.idlecpu-idlecpusum)/(data.totalcpu- totalcpusum);
        totalcpusum = data.totalcpu;
        idlecpusum = data.idlecpu;
        cpu_utils_data.push (temputils*100);
        cpu_utils_data.shift();
        //update cpu utilization chart
        cpu_utils.setOption({
            xAxis: {
                data:timeline
            },
            series: [{
                data:cpu_utils_data
            }]
        });
    });
}, 1000);
/******************end cpu_utils*********************** */


/******************running process*********************** */
setInterval(function () {
    $.get('/proc/loadavg').done(function (data){
        running_process_data.push(data.runningprocess);
        running_process_data.shift();

        running_process_option.xAxis[0].data.shift();
        running_process_option.xAxis[0].data.push(new Date().toLocaleTimeString());
        running_process_option.xAxis[1].data.shift();
        running_process_option.xAxis[1].data.push(new Date().toLocaleTimeString());
        running_process.setOption(running_process_option);
    });
}, 2500);
/******************end running process*********************** */


/******************loadavg*********************** */
setInterval(function () {
    $.get('/proc/loadavg').done(function (data){
        loadavg_5_data.push(data.load5);
        loadavg_5_data.shift();
        loadavg_10_data.push(data.load10);
        loadavg_10_data.shift();
        loadavg_15_data.push(data.load15);
        loadavg_15_data.shift();

        loadavg_option.xAxis[0].data.shift();
        loadavg_option.xAxis[0].data.push(new Date().toLocaleTimeString());
        loadavg.setOption(loadavg_option);
    });
}, 1000);
/******************end loadavg********************** */


/******************loadavg*********************** */
setInterval(function () {
    $.get('/proc/meminfo').done(function (data){
        var memusage = data.usedMem/data.totalMem;
        meminfo_data.push(memusage*100);
        meminfo_data.shift();

        meminfo_option.xAxis[0].data.shift();
        meminfo_option.xAxis[0].data.push(new Date().toLocaleTimeString());
        meminfo.setOption(meminfo_option);
    });
}, 1000);
/******************end loadavg********************** */


/******************tcp*********************** */
setInterval(function () {
    $.get('/proc/tcp').done(function (data){
        tcp_v4_data.push(data.tcpV4Links);
        tcp_v4_data.shift();
        tcp_v6_data.push(data.tcpV6Links);
        tcp_v6_data.shift();

        tcp_option.xAxis[0].data.shift();
        tcp_option.xAxis[0].data.push(new Date().toLocaleTimeString());
        tcp.setOption(tcp_option);
    });
}, 1000);
/******************end tcp********************** */


/******************udp*********************** */
setInterval(function () {
    $.get('/proc/udp').done(function (data){
        udp_v4_data.push(data.udpV4Links);
        udp_v4_data.shift();
        udp_v6_data.push(data.udpV6Links);
        udp_v6_data.shift();

        udp_option.xAxis[0].data.shift();
        udp_option.xAxis[0].data.push(new Date().toLocaleTimeString());
        udp.setOption(udp_option);
    });
}, 1000);
/******************end udp********************** */


function createNewDiv(id1,id2) {
    var parentDiv1 = document.getElementById("fisrt-column");
    var div = document.createElement("div");
    var inputattr = document.createAttribute("class");  
    inputattr.value = "dashcharts";
    div.setAttributeNode(inputattr); 
    inputattr = document.createAttribute("id");  
    inputattr.value = id1;
    div.setAttributeNode(inputattr); 
    parentDiv1.appendChild(div)
    
    var parentDiv2 = document.getElementById("second-column");
    var div = document.createElement("div");
    var inputattr = document.createAttribute("class");  
    inputattr.value = "dashcharts";
    div.setAttributeNode(inputattr); 
    inputattr = document.createAttribute("id");  
    inputattr.value =id2;
    div.setAttributeNode(inputattr); 
    parentDiv2.appendChild(div);
}

/****************** receive*********************** */
function createNetChart(id1,id2,initR,initT,deviceName,count) {
    receive[count] = echarts.init(document.getElementById(id1));
    receive_data[count] = [];

    for(var i=timelinelength;i>=0;i--) {
        receive_data[count].push(initR);
    }

    receive_option[count] = {
        title: {
            text: deviceName+'-Received Data',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data:['Receive']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },

        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: timeline
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Receive',
                boundaryGap: [0, 0.2], 
            },
        ],
        series: [
            {
                name:'Receive',
                type:'line',
                data:receive_data[count]
            }
        ]
    };
    receive[count].setOption(receive_option[count]);
    /****************** end receive*********************** */


    /****************** transmit*********************** */

    transmit[count] = echarts.init(document.getElementById(id2));
    transmit_data[count] = [];

    for(var i=timelinelength;i>=0;i--) {
        transmit_data[count].push(initT);
    }

    transmit_option[count] = {
        title: {
            text: deviceName+'-Transmited Data',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#283b56'
                }
            }
        },
        legend: {
            data:['Transmit']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },

        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                data: timeline
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                name: 'Transmit',
                boundaryGap: [0, 0.2], 
            },
        ],
        series: [
            {
                name:'Transmit',
                type:'line',
                data:transmit_data[count]
            }
        ]
    };
    transmit[count].setOption(transmit_option[count]);
    /****************** end transmit*********************** */

        setInterval(function () {
        $.get('/proc/netdev').done(function (data){

            receive_data[count].push(data[deviceName][0]);
            receive_data[count].shift();

            receive_option[count].xAxis[0].data.shift();
            receive_option[count].xAxis[0].data.push(new Date().toLocaleTimeString());
            receive[count].setOption(receive_option[count]);

            transmit_data[count].push(data[deviceName][1]);
            transmit_data[count].shift();

            transmit_option[count].xAxis[0].data.shift();
            transmit_option[count].xAxis[0].data.push(new Date().toLocaleTimeString());
            transmit[count].setOption(transmit_option[count]);

        });
        }, 1000);
}



