/**
 * Created by Administrator on 2017/1/16.
 */
//执行滚屏监控事件
var pageIndex=2;//防止重复
var mylock=true;
$(document).scroll(function () {
    // console.log($(window).scrollTop())

    if (checkScrollslide()&&mylock){
        mylock=false;
        console.log("开始读取数据")
        //显示数据加载\
        $(".loading").find("span").text("正在加载信息，请稍候...");
        $(".loading").css("display","block")
        //加载数据
        pageIndex++;
        console.log(pageIndex)
        var rId=sessionStorage.getItem("regionId");
        var ris=sessionStorage.getItem("isbroad");
        var rSize=sessionStorage.getItem("pageSize");
        getData(rId,rSize,pageIndex,ris);

    }
})

//执行增加屏幕高
var num=0;
function addHeight(pageNum,datas) {

    if(pageNum>0) {
        var picH = [];
        $.each(datas, function (i, value) {
            picH.push(value.PicHeight);
        })
        var liH=145;
        var maxH_pic = Math.max.apply(null, picH);
        // console.log(maxH_pic)
        num+=(maxH_pic+liH)*pageNum/5;
        // console.log(num);
        $(".flowItem").css("min-height",num);
      // console.log($(".flowItem").css("min-height"))
    }
}
// 执行瀑布流
function waterfall() {
    var $lis=$(".flowItem").find("li")
    var w_li=$lis.eq(0).width()+12;//取一下数据块的宽度，包含有padding,border这些值，更准确
    var hArr=[];
    $lis.each(function (index,value) {
        var h=$(value).height()+18;
         if(index<5){
             if (index==0){hArr[index]=h+60}//第一个挪一点下来给搜索
             else {hArr[index]=h;}
             }
        else{
            var minH=Math.min.apply(null,hArr);
            var minHindex=$.inArray(minH,hArr);
            // console.log(h)
            $(value).css({
                "position":"absolute",
                "top":minH+"px",
                "left":minHindex*w_li+"px",
                "float":"",
            });
            hArr[minHindex]+=$lis.eq(index).height()+18;//保证最小值不在是这个
        }
    })

}
//滚屏调试
function checkScrollslide() {
    var $lastLi=$(".flowItem>li").last();
    var lastLiDis=$lastLi.offset().top+Math.floor($lastLi.height()+200)//获取最后一个元素的高度加200加距离顶部的高度
    var scrollTop=$(window).scrollTop();//获取当前的偏移量
    var windowH=$(window).height();//获取当前屏幕的高度
    return (lastLiDis<scrollTop+windowH)?true:false;
}

