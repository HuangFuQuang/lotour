/**
 * Created by Administrator on 2017/1/16.
 */
var Index;
if (sessionStorage.length>0){
    var Id=sessionStorage.getItem("regionId");
    var Size=sessionStorage.getItem("pageSize");
    Index=sessionStorage.getItem("pageIndex");
    var is=sessionStorage.getItem("isbroad");
    getData(Id,Size,Index,is);
//regionId代表地区，pageSize:代表一次请求的数据条数,pageIndex:代表请求的页码，默认2，isbroad:代表数据库源码
//地区值将由session storage值决定
}

function getData(regionId,pageSize,pageIndex,isbroad) {
    $.ajax({
        type: "get",
        url: "http://api.lotour.net/brandhome/water/SelectDiscoverList?regionId="+regionId+"&pageSize="+pageSize+"&pageIndex="+pageIndex+"&isbroad="+isbroad,
        dataType: "jsonp",
        jsonp:"callback",
        success: function(datas) {
            // console.log(datas)
           successjson(datas);
            //执行增加屏幕高
            addHeight(pageSize,datas);
        },
        error:function () {
            console.log("数据请求错误")
        }

    });
}
//数据生成
function successjson(datas) {
   if(datas.length==0){
       console.log("没有数据了亲")
       $(".loading").find("span").text("没有数据了亲......");
       setTimeout(function () {
           $(".loading").css("display","none");
       },2000)
   }else {
       console.log(datas)
       $(".loading").css("display","none");
       mylock=true;//数据只有加载完才释放下一次加载的窗口
       var H=new Array();//用于收集图片高度
       var idArr=new Array();//用于收集会员编号
       var itemArr=new Array();//用于收集阅读编号
       $.each(datas,function (i,value) {
            H[i]=value.PicHeight;//获取每个元素的图片高度
           var $li=$("<li></li>");
           var $flowPic=$("<div class='flowPic'><a class='share' href='javascript:void(0);'></a><div class='sharelb'><a href='javascript:void(0);' class='renren'></a><a href='javascript:void(0);' class='qzone'></a><a href='javascript:void(0);' class='qq'></a><a href='javascript:void(0);' class='wechat'></a><a href='javascript:void(0);' class='weibo'></a></div><a href='javascript:void(0);' class='img'><img src="+value.PicUrl+" title="+value.Title+"</a></div>");
           var $flowTxt=$("<div class='flowTxt'><a  href="+value.ArticleURL+"  target='_blank' title="+value.Author+"><img src='' width='35' height='35'></a><a  href='http://guangzhou.lotour.com/zj/1104283' target='_blank'>"+value.Title+"</a><span class='flowNum'><i class='icon iconfont icon-dingwei'>"+value.RegionName+"</i><i class='icon iconfont icon-yanjing' title="+value.ItemId+">9718</i> </span></div>")
           $flowPic.appendTo($li);
           $flowTxt.appendTo($li);
           if(value.CommentList.length>0){
               var $flowPing=$("<div class='flowPing' title="+value.CommentList[0].Author+"><div class='flowPingL'> <a href='http://my.lotour.com/i/5485932/' target='_blank' ><img width='30' height='30' src='' ></a></div><div class='flowPingR'><p class='pingUser'><a href='http://my.lotour.com/i/5485932/' title='' target='_blank'></a></p><p class='pingCon'><a href='http://guangzhou.lotour.com/zj/1104283#commentarea' title=''  target='_blank'>"+value.CommentList[0].Content+"</a></p></div></div>")
               $flowPing.appendTo($li);
               idArr.push(value.CommentList[0].Author);//将会员编号存入
           }
           $li.appendTo($(".flowItem"));
           $("section .flowItem li").eq(i).find(".img img").css("height",H[i])//给每一个图片加高度
           idArr.push(value.Author);//将作者编号存入
           itemArr.push(value.ItemId);//将阅读编号存入
       })
    // console.log(idArr);
       //删除重复项;
      var IdArr=deRepeat(idArr);
       // console.log(IdArr)
       //处理作者编号
       getAuthorData(IdArr);
       //处理阅读数量
       var ItemArr=deRepeat(itemArr);
       getItemIdData(ItemArr);
       //给第一个元素增加id
       $(".flowItem li:first-child").attr("id","firstItem")
       //执行瀑布流
       waterfall();
       //数据分享按钮只能放这里，因为数据是异步的
       share();
   }
}

function deRepeat(arr) {
    var newArr=[];
    var obj={};
    var index=0;
    for (var i=0;i<arr.length;i++){
        if (obj[arr[i]]==undefined){
            obj[arr[i]]=1;
            newArr[index++]=arr[i];
        }else if(obj[arr[i]]==1){
            continue;
        }
    }
    return newArr;
}

function getAuthorData(arr) {
    var authorString=arr.join(",");
    $.ajax({
        type:"get",
        url:"http://fw1.lotour.com/i/Common/GetMembersMessageByFw?memberIds="+authorString,
        dataType:"jsonp",
        jsonp:"callback",
        success:function (datas) {
            // console.log(datas);
            getimg(datas)
        },
        error:function () {
            console.log("读取数据失败")
        }
    })
}
function getimg(value) {
    var getImgobj=value.Result;
    var getImgArr=getImgobj.Data;//获取数组
    // console.log(getImgArr)
    var imgArr=new Array();
    var nameArr=new Array();
    var aimg=$(".flowTxt a:first-child");
    $.each(getImgArr,function (i,val) {
        imgArr[val.MemberId]=val.Photo;
    })
    $.each(getImgArr,function (i,val) {
        nameArr[val.MemberId]=val.NickName;
    })
    // console.log(imgArr)
    //填充作者
    for (var i=0;i<aimg.length;i++){
       var urlImg="http://img.lotour.net/UserPhoto/"+imgArr[aimg.eq(i).attr("title")];
        aimg.eq(i).find("img").attr("src",urlImg);
    }
    //填充读者
    var reader=$(".flowPing");
    for (var j=0;j<reader.length;j++){
        var urlReaderImg="http://img.lotour.net/UserPhoto/"+imgArr[reader.eq(j).attr("title")];
        var readerName=nameArr[reader.eq(j).attr("title")];
        reader.eq(j).find(".flowPingL img").attr("src",urlReaderImg);
        reader.eq(j).find(".pingUser a").text(readerName).attr("title",readerName);

    }
}
function getItemIdData(arr) {
    var viewString=arr.join(",");
    $.ajax({
        type:"get",
        url:"http://api.lotour.net/brandhome/API/SelectFootPageView?footids="+viewString,
        dataType:"jsonp",
        jsonp:"callback",
        success:function (datas) {
            // console.log(datas);
            getItem(datas);
        },
        error:function () {
            console.log("数据请求失败")
        }
    })
}
function getItem(value) {
    var yueduArr=new Array();
    $.each(value,function (i,val) {
        yueduArr[val.FootId]=val.RegionId;
    })
    //填充阅读量
    var yuedu=$(".flowNum")
    for (var k=0;k<yuedu.length;k++){
        var yueNum=yueduArr[yuedu.eq(k).find("i:nth-child(2)").attr("title")];
        yuedu.eq(k).find("i:nth-child(2)").text(yueNum)
    }
}

