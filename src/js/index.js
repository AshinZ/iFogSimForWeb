function isnull(val) {
    if (val == '' || val == undefined || val == null)
    {
        return true;
    }
    var str = val.replace(/(^\s*)|(\s*$)/g, '');//去除空格;
    if (str == '' || str == undefined || str == null) {
        return true;
    } else {
        return false;
    }
}

function accept_string(str)
{
    var reg = /^[0-9A-Za-z_]+$/g;
    return reg.test(str);
}

var cookie = {
    set:function(key,val){//,time){//设置cookie方法
        var date=new Date(); //获取当前时间
        //var expiresDays=time;  //将date设置为n天以后的时间
        //date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
        document.cookie=key+ "=" + val +";";//expires="+date.toGMTString();  //设置cookie
    },
    get:function(key){//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
            var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips=arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return tips;
    },
    delete:function(key){ //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime()-10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
    }
}

var backend="backend/";
var test_post = "zhzero.top:8080/api/post";
Date.prototype.Format = function(fmt)
{ //author: meizz
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

var app=new Vue ({
    el:"#app",
    data:{
    	test_post_return_data:{},
    	test_post_data:{
		    "linkData": [
		        {
		            "targetNodeName": "m-1-1",
		            "latency": 1,
		            "startNodeName": "a-1-1"
		        },
		        {
		            "targetNodeName": "m-0-0",
		            "latency": 1,
		            "startNodeName": "a-0-0"
		        },
		        {
		            "targetNodeName": "m-0-1",
		            "latency": 1,
		            "startNodeName": "a-0-1"
		        },
		        {
		            "targetNodeName": "m-1-0",
		            "latency": 1,
		            "startNodeName": "a-1-0"
		        },
		        {
		            "targetNodeName": "m-0-0",
		            "latency": 6,
		            "startNodeName": "s-0-0"
		        },
		        {
		            "targetNodeName": "m-0-1",
		            "latency": 6,
		            "startNodeName": "s-0-1"
		        },
		        {
		            "targetNodeName": "m-1-0",
		            "latency": 6,
		            "startNodeName": "s-1-0"
		        },
		        {
		            "targetNodeName": "m-1-1",
		            "latency": 6,
		            "startNodeName": "s-1-1"
		        },
		        {
		            "targetNodeName": "d-0",
		            "latency": 4,
		            "startNodeName": "m-0-0"
		        },
		        {
		            "targetNodeName": "d-1",
		            "latency": 4,
		            "startNodeName": "m-1-1"
		        },
		        {
		            "targetNodeName": "d-0",
		            "latency": 4,
		            "startNodeName": "m-0-1"
		        },
		        {
		            "targetNodeName": "d-1",
		            "latency": 4,
		            "startNodeName": "m-1-0"
		        },
		        {
		            "targetNodeName": "proxy-server",
		            "latency": 6,
		            "startNodeName": "d-1"
		        },
		        {
		            "targetNodeName": "proxy-server",
		            "latency": 6,
		            "startNodeName": "d-0"
		        },
		        {
		            "targetNodeName": "cloud",
		            "latency": 100,
		            "startNodeName": "proxy-server"
		        }
		    ],
		    "nodes": [
		        {
		            "nodes": [
		                {
		                    "level": 3,
		                    "upBw": 10000,
		                    "ratePerMips": 0,
		                    "name": "m-1-1",
		                    "type": "FOG_DEVICE",
		                    "mips": 1000,
		                    "ram": 1000,
		                    "downBw": 270
		                },
		                {
		                    "name": "a-1-1",
		                    "type": "ACTUATOR",
		                    "actuatorType": "DISPLAY"
		                },
		                {
		                    "level": 1,
		                    "upBw": 10000,
		                    "ratePerMips": 0,
		                    "name": "proxy-server",
		                    "type": "FOG_DEVICE",
		                    "mips": 2800,
		                    "ram": 4000,
		                    "downBw": 10000
		                },
		                {
		                    "level": 2,
		                    "upBw": 10000,
		                    "ratePerMips": 0,
		                    "name": "d-1",
		                    "type": "FOG_DEVICE",
		                    "mips": 2800,
		                    "ram": 4000,
		                    "downBw": 10000
		                },
		                {
		                    "level": 3,
		                    "upBw": 10000,
		                    "ratePerMips": 0,
		                    "name": "m-0-1",
		                    "type": "FOG_DEVICE",
		                    "mips": 1000,
		                    "ram": 1000,
		                    "downBw": 270
		                },
		                {
		                    "level": 3,
		                    "upBw": 10000,
		                    "ratePerMips": 0,
		                    "name": "m-1-0",
		                    "type": "FOG_DEVICE",
		                    "mips": 1000,
		                    "ram": 1000,
		                    "downBw": 270
		                },
		                {
		                    "level": 2,
		                    "upBw": 10000,
		                    "ratePerMips": 0,
		                    "name": "d-0",
		                    "type": "FOG_DEVICE",
		                    "mips": 2800,
		                    "ram": 4000,
		                    "downBw": 10000
		                },
		                {
		                    "level": 3,
		                    "upBw": 10000,
		                    "ratePerMips": 0,
		                    "name": "m-0-0",
		                    "type": "FOG_DEVICE",
		                    "mips": 1000,
		                    "ram": 1000,
		                    "downBw": 270
		                },
		                {
		                    "name": "a-0-0",
		                    "type": "ACTUATOR",
		                    "actuatorType": "DISPLAY"
		                },
		                {
		                    "name": "a-0-1",
		                    "type": "ACTUATOR",
		                    "actuatorType": "DISPLAY"
		                },
		                {
		                    "name": "a-1-0",
		                    "type": "ACTUATOR",
		                    "actuatorType": "DISPLAY"
		                },
		                {
		                    "sensorType": "EEG",
		                    "name": "s-0-1",
		                    "type": "SENSOR",
		                    "distribution": 2,
		                    "value": 4
		                },
		                {
		                    "sensorType": "EEG",
		                    "name": "s-1-0",
		                    "type": "SENSOR",
		                    "distribution": 2,
		                    "value": 4
		                },
		                {
		                    "level": 0,
		                    "upBw": 100,
		                    "ratePerMips": 0.01,
		                    "name": "cloud",
		                    "type": "FOG_DEVICE",
		                    "mips": 44800,
		                    "ram": 40000,
		                    "downBw": 10000
		                },
		                {
		                    "sensorType": "EEG",
		                    "name": "s-0-0",
		                    "type": "SENSOR",
		                    "distribution": 2,
		                    "value": 4
		                },
		                {
		                    "sensorType": "EEG",
		                    "name": "s-1-1",
		                    "type": "SENSOR",
		                    "distribution": 2,
		                    "value": 4
		                }
		            ],
		            "links": [
		                {
		                    "latency": 4,
		                    "destination": "d-1",
		                    "source": "m-1-1"
		                },
		                {
		                    "latency": 1,
		                    "destination": "m-1-1",
		                    "source": "a-1-1"
		                },
		                {
		                    "latency": 100,
		                    "destination": "cloud",
		                    "source": "proxy-server"
		                },
		                {
		                    "latency": 6,
		                    "destination": "proxy-server",
		                    "source": "d-1"
		                },
		                {
		                    "latency": 4,
		                    "destination": "d-0",
		                    "source": "m-0-1"
		                },
		                {
		                    "latency": 4,
		                    "destination": "d-1",
		                    "source": "m-1-0"
		                },
		                {
		                    "latency": 6,
		                    "destination": "proxy-server",
		                    "source": "d-0"
		                },
		                {
		                    "latency": 4,
		                    "destination": "d-0",
		                    "source": "m-0-0"
		                },
		                {
		                    "latency": 1,
		                    "destination": "m-0-0",
		                    "source": "a-0-0"
		                },
		                {
		                    "latency": 1,
		                    "destination": "m-0-1",
		                    "source": "a-0-1"
		                },
		                {
		                    "latency": 1,
		                    "destination": "m-1-0",
		                    "source": "a-1-0"
		                },
		                {
		                    "latency": 6,
		                    "destination": "m-0-1",
		                    "source": "s-0-1"
		                },
		                {
		                    "latency": 6,
		                    "destination": "m-1-0",
		                    "source": "s-1-0"
		                },
		                {
		                    "latency": 6,
		                    "destination": "m-0-0",
		                    "source": "s-0-0"
		                },
		                {
		                    "latency": 6,
		                    "destination": "m-1-1",
		                    "source": "s-1-1"
		                }
		            ]
		        }
		    ],
		    "actuatorData": [
		        {
		            "name": "a-0-0",
		            "actuatorType": "DISPLAY"
		        },
		        {
		            "name": "a-0-1",
		            "actuatorType": "DISPLAY"
		        },
		        {
		            "name": "a-1-0",
		            "actuatorType": "DISPLAY"
		        },
		        {
		            "name": "a-1-1",
		            "actuatorType": "DISPLAY"
		        }
		    ],
		    "fogDeviceData": [
		        {
		            "nodeName": "cloud",
		            "busyPower": 87.53,
		            "level": 0,
		            "upBw": 100,
		            "ratePerMips": 0.01,
		            "mips": 44800,
		            "idlePower": 82.44,
		            "ram": 40000,
		            "downBw": 10000
		        },
		        {
		            "nodeName": "proxy-server",
		            "busyPower": 87.53,
		            "level": 1,
		            "upBw": 10000,
		            "ratePerMips": 0,
		            "mips": 2800,
		            "idlePower": 82.44,
		            "ram": 4000,
		            "downBw": 10000
		        },
		        {
		            "nodeName": "d-0",
		            "busyPower": 87.53,
		            "level": 2,
		            "upBw": 10000,
		            "ratePerMips": 0,
		            "mips": 2800,
		            "idlePower": 82.44,
		            "ram": 4000,
		            "downBw": 10000
		        },
		        {
		            "nodeName": "d-1",
		            "busyPower": 87.53,
		            "level": 2,
		            "upBw": 10000,
		            "ratePerMips": 0,
		            "mips": 2800,
		            "idlePower": 82.44,
		            "ram": 4000,
		            "downBw": 10000
		        },
		        {
		            "nodeName": "m-0-0",
		            "busyPower": 87.53,
		            "level": 3,
		            "upBw": 10000,
		            "ratePerMips": 0,
		            "mips": 1000,
		            "idlePower": 82.44,
		            "ram": 1000,
		            "downBw": 270
		        },
		        {
		            "nodeName": "m-0-1",
		            "busyPower": 87.53,
		            "level": 3,
		            "upBw": 10000,
		            "ratePerMips": 0,
		            "mips": 1000,
		            "idlePower": 82.44,
		            "ram": 1000,
		            "downBw": 270
		        },
		        {
		            "nodeName": "m-1-0",
		            "busyPower": 87.53,
		            "level": 3,
		            "upBw": 10000,
		            "ratePerMips": 0,
		            "mips": 1000,
		            "idlePower": 82.44,
		            "ram": 1000,
		            "downBw": 270
		        },
		        {
		            "nodeName": "m-1-1",
		            "busyPower": 87.53,
		            "level": 3,
		            "upBw": 10000,
		            "ratePerMips": 0,
		            "mips": 1000,
		            "idlePower": 82.44,
		            "ram": 1000,
		            "downBw": 270
		        }
		    ],
		    "sensorData": [
		        {
		            "distributionType": "Deterministic",
		            "min": -1,
		            "max": -1,
		            "mean": -1,
		            "sensorType": "EEG",
		            "name": "s-0-0",
		            "deterministicValue": 4,
		            "stdDev": -1
		        },
		        {
		            "distributionType": "Deterministic",
		            "min": -1,
		            "max": -1,
		            "mean": -1,
		            "sensorType": "EEG",
		            "name": "s-0-1",
		            "deterministicValue": 4,
		            "stdDev": -1
		        },
		        {
		            "distributionType": "Deterministic",
		            "min": -1,
		            "max": -1,
		            "mean": -1,
		            "sensorType": "EEG",
		            "name": "s-1-0",
		            "deterministicValue": 4,
		            "stdDev": -1
		        },
		        {
		            "distributionType": "Deterministic",
		            "min": -1,
		            "max": -1,
		            "mean": -1,
		            "sensorType": "EEG",
		            "name": "s-1-1",
		            "deterministicValue": 4,
		            "stdDev": -1
		        }
		    ]
		},

        webtype:"",//该网页的类型

        login_data:{//登陆数据
            action:"login", //行为描述
            user_id:"",     //账号
            user_passwd:"", //密码 
            user_type:"null",  //用户类型 用来判断是教师还是学生
        },

        register_data:{//注册数据
            action:"register",//行为
            user_id:"",       //账号
            user_name:"",     //姓名
            user_passwd:"",   //密码
            user_mail:"",     //邮箱
            user_class:"",    //班级
        },

        passwd_confirm:"",//用来进行密码校验 和register一起使用

        passwd:{
            id:"",
            old_passwd:"",
            new_passwd:"",
        },

        user_info:{//登陆以后的用户信息 
            user_name:"",     //姓名
            user_id:"",       //账号
            user_type:"",     //用户类型
            user_token:"",    //token
            class_id:"",      //班级名
            system_time:"",   //时间
        },

    	my_work_info:{ //下载我的提交
                user_id:"",       //账号
    	        user_name:"",     //姓名
    	        class_work_name:"",//作业名
                class_id:"",     //班级id
                save_way:"",     //作业存储方式
                file_name:"",     //我的作业的名字
    	},	

        class_info:{ //作业信息
            class_id:"",       //班级id
            class_work_name:"",//作业名
            class_work_name_form:"",//作业的名字格式
            class_work_size:"",//作业大小限制
            class_work_deadline:"",//作业时间限制
            class_note:"",
            class_work_type:[],//作业类型
            class_work_file_type:[], //作业的文件存放方式
        },

        class_type_number:0,//作业类型数
        upload_confirm: false,
        class_type_number_int:[], //用来计算每次的作业类型数
        class_work_type_str:"", //用于展示的作业类型字符串

        work_upload_info:{
            action:"upload_work",   //行为
            user_id:"",             //上传人id
            user_name:"",           //上传人名字
            upload_type:"",         //判断是补交还是正常提交
            work_name:"",           //作业名
            work_type:"",           //作业类型
        },

        auto_login_info:{ //用以自动登陆
            action:"auto_login",    //行为
            user_id:"",             //user_id
            user_type:"",           //用户类型
            user_token:"",          //用户的token 结合user_id和数据库核验进行自动登陆
            user_place:"",          //用户当前所在页面的url  用来判断自动登录后返回哪些数据
            class_id:"",            //班级
        },

        //如果是学生和老师登陆后见到的第一个页面 学生需要返回已选课程 未选课程需要主动获取 
        //老师则需要已发布课程和当前课程的一些总体情况
        //当学生进入课程以后 需要返回相关课程的作业、通知等情况
        //当教师进入课程可以查看很多的学生信息
        //如果是在线做题 则需要返回相应的题目 题干 答案可以考虑返回 个人认为这里偏自主学习 

        select_info:{
            action:"selectclass", //行为
            user_id:"",           //用户id  
            class_id:"",          //班级id
        },

        quit_info:{
            action:"quitclass",   //行为
            user_id:"",           //用户id
            class_id:"",          //班级id
        },


        resourse:{
            file_name:"",  //文件名
            file_des:"",   //文件描述
            file_class:"", //文件的班级
            file_uper:"",  //文件上传人
            file_type:"",//文件类型
        },

        classes:{
            myClasses:[],//已选择课程 或者教师自己发布的课程
            allClasses:[],//全部课程
            selectiveClasses:[],//可选课程 
        },

        mySubmitList:[],  //我的提交  或者查看学生提交

        myGrades:[],

        teacherNew:{//教师端的一些功能的数据
            user_id:"",                 //教师id
            new_note:"",                //新的公告
            class_id:"",                //新的id
            user_name:"",               //教师名
            new_class_name:"",          //新的班级名
        },

        download_work:{   //下载作业
            class_id:"",  //班级名
            work_name:"", //作业名
            work_type:"", //类型 判断是作业下载还是忏悔下载
        },
        
        file:[],

        video:[],


    },




    methods:{
        log_out:function(){
            cookie.delete("user_token");
            cookie.delete("user_id");
            cookie.delete("user_type");
            alert("退出成功！");
            window.location.href='index.html';
        },

	get_my_work:function(file_type){
	/*	this.my_work_info.user_name=this.user_info.user_name;
		this.my_work_info.user_id=this.user_info.user_id;
		this.my_work_info.class_id=this.class_info.class_id;
		this.my_work_info.class_work_name=this.class_info.class_work_name;
        this.my_work_info.save_way=this.class_info.class_work_file_type[this.class_info.class_work_type.indexOf(file_type)];
        this.my_work_info.file_name=this.class_info.class_work_name_form;
        this.my_work_info.file_type=file_type;*/
        console.log(this.test_post_data);
        console.log(typeof(this.test_post_data));
        $.ajax({
				url: "http://zhzero.top:8080/api/post",
				method: 'POST',
				dataType:'json',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(this.test_post_data),
				success: function(res) {
				console.log(typeof(res) === "object");
				},
			});
     /*this.$http.post("http://zhzero.top:8080/api/post",this.test_post_data, {emulateJSON:true}).then(function(res){
            		var dataret = JSON.parse(res.bodyText);
            		if (dataret.code == 200)
            		{
                		test_post_return_data = this.bodyText;
            		}
            		else
            		{
        				if(dataret.code ==201)
        				alert("无法移动文件!");
        				else 
                		alert("未找到文件!");
            			}
        			},function(res){
            				alert("无法查看(Unknown Reason)");
        			});*/

	},
   /*    
        get_student_work:function(){
 
        // 发送 token 到服务端获取登录信息
        this.$http.post(backend + "get_student_work.php",this.user_info, {emulateJSON:true}).then(function(res){
            //console.log(res.bodyText);
            var dataret = JSON.parse(res.bodyText);
            if (dataret.code == 200)
            {

            //    this.mySubmitList = dataret.work;
                window.open('Submitlist/'+dataret.url+'.zip');
            }
            else
            {
                alert("无法查询");
            }
        },function(res){
            alert("无法查询(Unknown Reason)");
        });
        },*/

        get_work:function(){
 
        // 发送 token 到服务端获取登录信息
        this.$http.post(backend + "get_work.php",this.user_info, {emulateJSON:true}).then(function(res){
            //console.log(res.bodyText);
            var dataret = JSON.parse(res.bodyText);
            if (dataret.code == 200)
            {

                this.mySubmitList = dataret.work;
            }
            else
            {
                alert("无法查询");
            }
        },function(res){
            alert("无法查询(Unknown Reason)");
        });
        },


        get_video:function(){
            this.$http.post(backend + "get_video.php",this.user_info, {emulateJSON:true}).then(function(res){
            var dataret = JSON.parse(res.bodyText);
            if (dataret.code == 200)
            {

                this.video = dataret.video;
            }
            else
                {
                    alert("无法查询");
                }
            },function(res){
                alert("无法查询(Unknown Reason)");
            });
        },

        get_resourse:function(){
            this.$http.post(backend + "get_resourse.php",this.user_info, {emulateJSON:true}).then(function(res){
            var dataret = JSON.parse(res.bodyText);
            if (dataret.code == 200)
            {

                this.file = dataret.resourse;
            }
            else
                {
                    alert("无法查询");
                }
            },function(res){
                alert("无法查询(Unknown Reason)");
            });
        },


        new_work:function(){
                    console.log(this.class_info.class_work_file_type);
                    var i=0; //将是否换成0,1存储
                    for(;i<this.class_info.class_work_file_type.length;++i){
                        if(this.class_info.class_work_file_type[i]=='是')
                            this.class_info.class_work_file_type[i]=1;
                        else
                            this.class_info.class_work_file_type[i]=0;
                    }

                    this.class_info.class_id=this.class_info.class_id.split("-")[0];
                    this.$http.post(backend + "work.php",this.class_info, {emulateJSON:true}).then(function(res){
                    var dataret = JSON.parse(res.bodyText);
                    if (dataret.code == 200)
                    {
                          alert("发布成功!");
                          window.location.reload();
                    }
                    else
                    {
                    
                        alert("发布失败(201)");
                    }
                },function(res){
                        alert("发布失败(Unknown Reason)")
                });
            },


       new_class:function(){
                this.teacherNew.user_id=this.user_info.user_id;
                this.teacherNew.user_name=this.user_info.user_name;
                this.$http.post(backend + "new_class.php",this.teacherNew, {emulateJSON:true}).then(function(res){
                //console.log(res.bodyText);
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {
                      alert("建立成功!");
                      window.location.reload();
                }
                else
                {
                    if(dataret.code== 201)
                    alert("建立失败(201)");
                    if(dataret.code==202)
                    alert("建立失败(班级已存在)");
                }
            },function(res){
                    alert("建立失败(Unknown Reason)")
            });
        },

        new_note:function(){
            this.teacherNew.user_id=this.user_info.user_id;
            this.teacherNew.class_id=this.teacherNew.class_id.split("-")[0];
            this.$http.post(backend + "note.php",this.teacherNew, {emulateJSON:true}).then(function(res){
            //console.log(res.bodyText);
            var dataret = JSON.parse(res.bodyText);
            if (dataret.code == 200)
            {
                  alert("发布成功!");
                  window.location.reload();
            }
            else
            {
                if(dataret.code== 201)
                alert("发布失败(201)");
            }
            },function(res){
                alert("发布失败(Unknown Reason)")
        });
        },

        login:function(){
            if (isnull(this.login_data.user_id) || isnull(this.login_data.user_passwd))//判断是否输入学号密码
            {
                alert("学号和密码均不能为空！");
                return;
            }
            if(this.login_data.user_type=="null") //判断是否选择身份
            {
                alert("请选择身份！");
                return;
            }
            if (!accept_string(this.login_data.user_passwd) || !accept_string(this.login_data.user_id))//判断是否有非法字符 注：应该为数字以及大小写字母
            {
                alert("学号或密码有非法字符！");
                return;
            }
            this.$http.post(backend + "login.php", this.login_data, {emulateJSON:true}).then(function(res){
                console.log(res.bodyText);
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == '200')
                {
                    alert("登陆成功！");
                    cookie.set("user_id",this.login_data.user_id);
                    cookie.set("user_token",dataret.token);
                    cookie.set("user_type",this.login_data.user_type);
                    if(this.login_data.user_type=="teacher")
                    {
                        window.location.href="index.html?teacher_login&user_id="+this.login_data.user_id;
                    }
                    else if(this.login_data.user_type=="student")
                    {
                        window.location.href="index.html?student_login&user_id="+this.login_data.user_id;
                    }
                }
                else
                {
                    if(dataret.code=='201')
                        alert("密码错误");
                    if(dataret.code=='202')
                        alert("当前用户未注册");
                }
            },function(res){
                console.log(res.status);
                alert('登录失败(Unknown Reason)');
            });
        },

        download:function(class_id,work_name,work_type){
            
            this.download_work.class_id=class_id;
            this.download_work.work_name=work_name;
            this.download_work.work_type=work_type;
            this.$http.post("Submitlist/"+class_id+"/get_student_work.php", this.download_work, {emulateJSON:true}).then(function(res){
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {
                    window.location.href=dataret.url;
                }
                else
                    {
			if(dataret.code==201)
                        alert("下载失败!(文件夹无内容)");
			else if(dataret.code==202)
			alert("下载失败，无下载文件名");
                }
            },function(res){
                console.log(res.status);
                alert('下载失败(unknown error)');
            });
        },

        register:function(){
            if (isnull(this.register_data.user_id) || isnull(this.register_data.user_name) || isnull(this.register_data.user_passwd))
            {
                alert("姓名、学号和密码均不能为空！");
                return;
            }
            if (this.passwd_confirm != this.register_data.user_passwd)
            {
                alert("两次输入的密码不匹配");
                return;
            }
            if (!accept_string(this.register_data.user_passwd) || !accept_string(this.register_data.user_id))
            {
                alert("学号或密码有非法字符！");
                return;
            }
            if(isnull(this.register_data.user_mail))
            {
                alert("邮箱不能为空！");
                return;
            }
            this.$http.post(backend + "register.php", this.register_data, {emulateJSON:true}).then(function(res){
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {
                    alert(this.register_data.user_name + '(' + this.register_data.user_id + ')注册成功，请重新登录');
                    location.reload();
                }
                else
                    {
                        if (dataret.code==201)
                                alert('注册失败:该用户名已存在,请检查');
                        else
                        alert('注册失败()');
                }
            },function(res){
                console.log(res.status);
                alert('注册失败(unknown error)');
            });
        },


        passwd_change:function(){
            this.passwd.id = cookie.get("user_id");
            if (isnull(this.passwd.old_passwd) || isnull(this.passwd.new_passwd) || isnull(this.passwd_confirm))
                {
                    alert("不能为空!");
                    return;
                    }
            if (this.passwd_confirm != this.passwd.new_passwd)
                {
                    alert("两次输入的密码不匹配");
                    return;
                }
            if (!accept_string(this.passwd.new_passwd) || !accept_string(this.passwd.old_passwd) || !accept_string(this.passwd_confirm))
                {
                    alert("密码有非法字符！");
                    return;
                }
                this.$http.post(backend + "change_passwd.php", this.passwd, {emulateJSON:true}).then(function(res){
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {
                    alert("修改成功，请重新登录");
                    cookie.delete("user_token");
                    cookie.delete("user_id");
                    cookie.delete("user_type");
                    window.location.href="index.html";
                }
                else
                {
                    if (dataret.code==201)
                        alert("原密码错误");
                    else
                        alert("修改失败()");
                }
                },function(res){
                    alert("修改失败(unknown error)");
                });
            },    

        upload_repent:function(){
           
            var file_info = $( '#file_selected_repent')[0].files[0];
            if (file_info == undefined){
                alert('你没有选择任何文件');
                return;
            }
            // 判断文件后缀名
            var ext = file_info.name.substr(file_info.name.lastIndexOf(".")).toLowerCase().split(".")[1];
	    if(ext!='pdf'&&ext!='md'){
		alert("请提交pdf或md格式文件!");
		return ;
	    }
            this.work_upload_info.work_name='repent';
            var form_data = new FormData();
            var time=this.getdate();
            form_data.append('user_name', this.user_info.user_name);
            form_data.append('user_id', this.user_info.user_id);
            form_data.append('work_name',this.work_upload_info.work_name);
            form_data.append('work_type',ext);
            form_data.append('work_time',time);
            form_data.append('class_id',this.user_info.class_id);
            form_data.append('upload_type','repent');
            form_data.append('file', file_info);
            var xhrOnProgress = function (fun) {
                xhrOnProgress.onprogress = fun; //绑定监听
                //使用闭包实现监听绑
                return function () {
                    //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
                    var xhr = $.ajaxSettings.xhr();
                    //判断监听函数是否为函数
                    if (typeof xhrOnProgress.onprogress !== 'function')
                        return xhr;
                    //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
                    if (xhrOnProgress.onprogress && xhr.upload) {
                        xhr.upload.onprogress = xhrOnProgress.onprogress;
                    }
                    return xhr;
                }
            }            
            $.ajax({
                url: backend + 'upload_file.php',
                type:'POST',
                data: form_data,
                processData: false,  // tell jquery not to process the data
                contentType: false, // tell jquery not to set contentType
                success: function(callback) {
                    alert('上传成功');
                    location.reload();
                },
                error: function(callback) {
                    alert('上传失败，可能的原因：1)提交的文件不符合要求；2)你已经提交过了；3)本次提交已经截止；4)你的登录已过期');
                    //location.reload();
                },
                xhr: xhrOnProgress(function (e) {
                    var percent = e.loaded / e.total;
                    var per = Math.floor((e.loaded / e.total) * 100) + "%";
                    //console.log(per);
                    //$("#progress-bar").css("width", (percent * 500));
                    $("#upload_prog_bar").css("width", per);
                    $("#upload_prog_per").html(per);
                    $("#upload_prog_size").html(e.loaded + ' / ' + e.total);
                })
            });
        },

        get_time:function(){
            this.$http.get(backend + "time.php", {emulateJSON:true}).then(function(res){
                //console.log(res.bodyText);
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {

                    this.user_info.system_time= dataret.time;
                }
                else
                {
                    alert("当前系统时间有误，暂停提交");
                }
            },function(res){
                alert("无法查询(Unknown Reason)");
            });
        },


        upload_file:function(){
            if (this.upload_confirm != true)
            {
                alert('请确认提交信息后再提交');
                return;
            }
            var expire_time = (new Date(this.class_info.class_work_deadline)).getTime();
            var timestamp = (new Date(this.user_info.system_time)).getTime();
            if (timestamp > expire_time+6*3600)//超时六小时
            {
                alert('本次提交已经截止');
                return;
            }
            else if(timestamp >= expire_time+3*3600){//3-6小时
                alert("超时3-6小时");
                this.work_upload_info.upload_type='abnormal6';
            }
            else if(timestamp >= expire_time){//超时三小时内
                alert("超时0-3小时");
                this.work_upload_info.upload_type='abnormal3';
            }
            else {
                this.work_upload_info.upload_type='normal';
            }
            var file_info = $( '#file_selected')[0].files[0];
            if (file_info == undefined){
                alert('你没有选择任何文件');
                return;
            }
            var re = new RegExp(this.class_info.class_work_type);
            //var re = this.submit_modal_data.pattern;
            // 判断文件后缀名
            var ext = file_info.name.substr(file_info.name.lastIndexOf(".")).toLowerCase().split(".")[1];
    	    if(this.class_info.class_work_type.indexOf(ext)==-1){
    		alert("请提交指定格式的文件！");
    		return ;
	        }
            // 判断文件大小
            if (file_info.size > this.class_info.class_work_size*1024*1024)
            {
                alert('文件大小超过限制');
                return;
            }
            this.work_upload_info.work_name=this.class_info.class_work_name;
            this.work_upload_info.work_type=this.class_info.class_work_type;
            var form_data = new FormData();
            form_data.append('user_name', this.user_info.user_name);
            form_data.append('user_id', this.user_info.user_id);
            form_data.append('work_name',this.work_upload_info.work_name);  //提交的文件名
            form_data.append('work_personal_name',this.class_info.class_work_name_form); //个人提交的作业名
            form_data.append('work_type',ext);
            form_data.append('work_time',this.user_info.system_time);
            form_data.append('class_id',this.user_info.class_id);
            form_data.append('upload_type',this.work_upload_info.upload_type);
            form_data.append('save_way',this.class_info.class_work_file_type[this.class_info.class_work_type.indexOf(ext)]);
            form_data.append('file', file_info);
            var xhrOnProgress = function (fun) {
                xhrOnProgress.onprogress = fun; //绑定监听
                //使用闭包实现监听绑
                return function () {
                    //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
                    var xhr = $.ajaxSettings.xhr();
                    //判断监听函数是否为函数
                    if (typeof xhrOnProgress.onprogress !== 'function')
                        return xhr;
                    //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
                    if (xhrOnProgress.onprogress && xhr.upload) {
                        xhr.upload.onprogress = xhrOnProgress.onprogress;
                    }
                    return xhr;
                }
            }            
            $.ajax({
                url: backend + 'upload_file.php',
                type:'POST',
                data: form_data,
                processData: false,  // tell jquery not to process the data
                contentType: false, // tell jquery not to set contentType
                success: function(callback) {
                    alert('上传成功');
                    location.reload();
                },
                error: function(callback) {
                    alert('上传失败，可能的原因：1)提交的文件不符合要求；2)你已经提交过了；3)本次提交已经截止；4)你的登录已过期');
                    //location.reload();
                },
                xhr: xhrOnProgress(function (e) {
                    var percent = e.loaded / e.total;
                    var per = Math.floor((e.loaded / e.total) * 100) + "%";
                    //console.log(per);
                    //$("#progress-bar").css("width", (percent * 500));
                    $("#upload_prog_bar").css("width", per);
                    $("#upload_prog_per").html(per);
                    $("#upload_prog_size").html(e.loaded + ' / ' + e.total);
                })
            });
        },

        getdate:function() {
 　　         var now = new Date(),
 　　         y = now.getFullYear(),
 　　         m = now.getMonth() + 1,
 　　         d = now.getDate();
 　　         return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
        },

        get_grade:function(token){
            this.$http.post(backend + "grade_query.php",this.user_info, {emulateJSON:true}).then(function(res){
                //console.log(res.bodyText);
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {

                    this.myGrades = dataret.grade;
                }
                else
                {
                    alert("无法查询");
                }
            },function(res){
                alert("无法查询(Unknown Reason)");
            });
        },

        auto_login:function(x){
            this.auto_login_info.user_id=cookie.get("user_id");
            this.auto_login_info.user_token=cookie.get("user_token");
            this.auto_login_info.user_type=cookie.get("user_type");
            this.auto_login_info.user_place=x;
            if(x=='student_class_login') 
                {   
                    this.auto_login_info.class_id=window.location.href.split("?")[1].split("&")[1].split("=")[1];
                }

            this.$http.post(backend + "auto_login.php", this.auto_login_info, {emulateJSON:true}).then(function(res){
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {
                    cookie.delete("user_token");
                    cookie.set("user_token",dataret.user_token);
                    
                    this.classes.myClasses=dataret.myClasses;
                    this.user_info.user_id=cookie.get("user_id");
                    this.user_info.user_name=dataret.user_name;
                    this.user_info.user_type=cookie.get("user_type");
                    this.user_info.user_token=dataret.user_token;

                    if(x=='student_class_login'){
                        this.class_info.class_id=this.auto_login_info.class_id;
                        this.class_info.class_work_name=dataret.class_work_name;
                        this.class_info.class_work_name_form=dataret.class_work_name_form.replace("$i",this.user_info.user_id).replace("$s",this.user_info.user_name).replace("$f",dataret.class_work_name);
                        this.class_info.class_work_deadline=dataret.class_work_deadline;
                        this.class_info.class_work_size=dataret.class_work_size;
                        this.class_info.class_work_type=dataret.class_work_type.split("+");
                        this.class_info.class_work_file_type=dataret.class_work_file_type.split("+");
                        this.class_info.class_note=dataret.class_note;
                        this.user_info.class_id=this.auto_login_info.class_id;
                        this.class_work_type_str=dataret.class_work_type.replace("+","、");
                    }


                }
                else if (dataret.code==201)
                    { 
                        alert('token失效，重新登陆');
                        cookie.delete("user_token");
                        cookie.delete("user_id");
                        cookie.delete("user_type");
                        window.location.href='index.html';
                    }
            },function(res){
                console.log(res.status);
                alert('自动登陆失败(unknown error)');
            });
        },


        get_classes:function(){
            this.$http.get(backend + "get_classes.php",{emulateJSON:true}).then(function(res){
                //console.log(res.bodyText);
                var dataret = JSON.parse(res.bodyText);
                if (dataret.code == 200)
                {

                    this.classes.allClasses = dataret.classes;
                //    this.computeClasses();
                }
                else
                {
                    alert("无法查询");
                }
            },function(res){
                alert("无法查询(Unknown Reason)");
            });
        },

        quitclass:function(class_id,class_name){
            var test=class_id+class_name+'退课成功';
            this.quit_info.user_id=this.user_info.user_id;
            this.quit_info.class_id=class_id;
            this.$http.post(backend+"quitclass.php",this.quit_info,{emulateJSON:true}).then(function(res){
                var dataret =JSON.parse(res.bodyText);
                if(dataret.code==200)
                {
                    alert(test);
                    window.location.reload();
                }
                else if(dataret.code==201)
                {
                    alert("退课失败");
                }
            },function(res){
                alert("退课失败(Network Error");
            });
        },  

        selectclass:function(class_id,class_name){
            this.select_info.user_id=this.user_info.user_id;
            this.select_info.class_id=class_id;
            this.$http.post(backend+"selectclass.php",this.select_info,{emulateJSON:true}).then(function(res){
                var dataret =JSON.parse(res.bodyText);
                if(dataret.code==200)
                {
                    var test=class_id+class_name+'选课成功';
                    alert(test);
                    window.location.reload();
                }
                else if(dataret.code==201)
                {
                    var test=class_id+class_name+'选课失败:已经选过该课程';
                    alert(test);
                }
                else{
                    var test=class_id+class_name+'选课失败:未知原因';
                    alert(test);
                }
            },function(res){
                alert("选课失败(Network Error");
            });
        },

        check_login_status:function(){//判断是否有保存的cookie 有返回true 否则返回false
            //如果没有cookie 我们认为其并未登陆 所以进入登录页面 否则我们根据域名解析出的类型进行初始化
            var cookie_token=cookie.get("user_token");
            if(cookie_token==undefined)
                return true;
            return false;
        },

        web_type_init:function(x){
            if(x){//如果返回值为真 说明未登录
                this.webtype='login';
            }   
            else 
            {
		//说明曾经登陆  如果他没有带后缀 那就说明是有cookie重新开启网页
                var web_url=window.location.href;
		if(web_url.indexOf("?")==-1)
		{
			console.log(web_url);
			window.location.href="index.html?"+cookie.get("user_type")+"_login&user_id="+cookie.get("user_id");
		}
                web_url=web_url.split("?")[1].split("&")[0];
                this.webtype=web_url;
                this.auto_login(web_url);
            }
        },


        test:function(){
        	alert("系统维护中。请勿提交！");
        },

    },

    watch:{
        class_type_number:function(newVal,oldVal){
            this.class_type_number_int=[];
            this.class_info.class_work_type=[];
            this.class_info.class_work_file_type=[];
            var i=0;
            for(;i<newVal;++i){
                this.class_type_number_int.push(i);
            }
        }
    },

    created:function(){
//		this.test();
        this.web_type_init(this.check_login_status());
    },

})