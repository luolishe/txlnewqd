//APPKEY
//var appKey1 = 'FFBK6BEEF2EBRF';//
var appKey1 = 'hsl3cp';
var ComID = 'xosPOvavQhyt5lrMDC0zMA==';
var shareInstall = new Object();
//0=OpenInstall，1=ShareInstall
var InstallType = "0";
//色粉引流节省开关  0=关  1=开
var sfCutDown = 0;
var sfRate = 5;
var kfindex=0;//1=美洽 2=53KF
var KfLink = new Array();//客服链接
KfLink[0] = "http://ptchats.net/chatlink.html" //
var DomainList = new Array();
DomainList[0]="sftest0312.baidu.032515.cc";
//app安装配置
var signType = 0 ;	//0=企业签 1=TF签  2=超级签
//var JJ_signType = 0;	//0=企业签|超级签 1=TF签   注意：如果是超级签的请在平台后台上的那推广配置上改为超级签下载页面
var linkType = 0 ;  //0=OP,1=直接链接  如OP平台挂了请将此改为1
var ptindex = 6 ;   //2=02群 
var tfindex = 4 ;	//请选择下面 TFLink 对应的序号值
var cjindex = 4 ;	//4=04群,6=06群
//安卓下载
var AndDownLink = new Array();
AndDownLink[0] = "http://ptoss.gzmingxi.com/app/paaa0226.apk";
//IOS下载
//企业签 
var PTLink = new Array();
PTLink[1] = "https://ptoss.gzmingxi.com/list10.plist";//10群
PTLink[2] = "https://ptoss.gzmingxi.com/list2.plist";//2群
PTLink[3] = "https://ptoss.gzmingxi.com/list3.plist";//3群
PTLink[4] = "https://ptoss.gzmingxi.com/list4.plist";//F群 放4
PTLink[6] = "https://ptoss.gzmingxi.com/list6.plist";//6群
//TF签
var TFLink = new Array();
TFLink[1] = "https://testflight.apple.com/join/DagD8lbL"; //E群无限量 
TFLink[2] = "https://testflight.apple.com/join/gvw5ZnHF"; //10群 
TFLink[3] = "https://testflight.apple.com/join/ZKHvuCCO"; //03群 0924
TFLink[4] = "http://fir.jhelumfin.com/downapple?randStr=15wxsjs6on"; //F群 
//超级签
var CJLink = new Array();
CJLink[4] = "https://appkk666.com/zLh.html"; //C群
CJLink[5] = "https://zhongyueshijie.com/qpbH07Kxa"; //C群
//console.log("=============================加载PTCODE===================================")
//验证手机操作系统
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
/***************调用下载********************/
function getData(urlValue,alterTxt) {
	if(typeof OpenInstall == 'undefined')
	{
	    var t = $(isiOS ? '.ios_text': '.an_text').text();
	    //alert(t);
	    var downRequest = new Request({
	        baseUrl: 'https://x3p.a0bq7.cn/liveInstall/init',
	        comId: ComID,
	        inviteCode: GetUrlParam('code')
	    });
	    downRequest.getRequest();
	}
	else
	{
		shareInstall.wakeupOrInstall();
		return;
	}	
}
//下载事件
var DownApp = function(codeValue,sType) {
	    if(typeof(sType)!="undefined" && typeof(JJ_signType)!="undefined")
	    {
	        signType = JJ_signType;
	    }
		var t = $(isiOS ? '.ios_text': '.an_text').text();
		if (isiOS) {
			if (signType == 1) {
				location.href = 'https://669tf.com/?t=' + encodeURIComponent(TFLink[tfindex]);
			}
			else if (signType == 2) {
				location.href = CJLink[cjindex];
			}
			else if (signType == 0)
			{
				if(linkType==0)
				{
					//转下复制邀请码
					if(typeof OpenInstall != 'undefined' && codeValue!=undefined && codeValue!=null && codeValue!="")
					{
					    console.log(codeValue,"--------------------");
					    location.href="List.html?channelCode="+codeValue;
					}
					else
					{
						getData('',t);
					}
				}
				else{
					location.href = 'itms-services://?action=download-manifest&url='+PTLink[ptindex];
				}
			}
		} 
		else{
			if (linkType == 1 && AndDownLink.length > 0) {
				var n = Math.floor(Math.random() * AndDownLink.length + 1) - 1;
				location.href = AndDownLink[n];
			} else {
				//转下复制邀请码
				if(typeof OpenInstall != 'undefined' && codeValue!=undefined && codeValue!=null && codeValue!="")
				{
				    console.log(codeValue,"--------------------");
				    location.href="List.html?channelCode="+codeValue;
				}
				else
				{
					getData('',t);
				}
			}
		}
		return;
}
//获取代理商邀请码
function GetChannelCode(channelCode,RateValue,cutDownStatus)
{
	var fromDomain = window.location.hostname.toLowerCase();
	var gfCode = new Array('YY498','6M6Z6');
	var gfCodeIndex =  Math.floor(Math.random() * gfCode.length + 1) - 1;
	channelCode = channelCode=='' ? fnGetQueryString('channelcode'): channelCode;
	channelCode = channelCode!=null && channelCode.length>5 ? channelCode.substr(0,5) : channelCode;
	console.log(channelCode,"=================================");
	//console.log(sfRate,RateValue,sfCutDown,cutDownStatus,channelCode);
	//验证是否有邀请码要没有，则符上官方SF邀请码
	if(channelCode===undefined || channelCode==null){
		return gfCode[gfCodeIndex];
	}
	return channelCode;
}
//获取URL参数值
function fnGetQueryString(name) {
    name = name!=undefined && name=='channelCode' ? 'code' : name;
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return String((r[2]));return "";
}
//生成随机数
function Rnd(arr1, arr2) {
    var sum = 0,
    factor = 0,
    random = Math.random();

    for (var i = arr2.length - 1; i >= 0; i--) {
        sum += arr2[i]; // 统计概率总和
    };
    random *= sum; // 生成概率随机数
    for (var i = arr2.length - 1; i >= 0; i--) {
        factor += arr2[i];
        if (random <= factor) return arr1[i];
    };
    return null;
}