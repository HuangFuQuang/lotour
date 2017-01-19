/**
 * Created by Administrator on 2017/1/6.
 */
var e=$(".index-ad-item").offset().top;//jq获取元素距离document顶部偏移量
var eHeight=$(".index-ad-item").height();
console.log(e+eHeight)
$(".index-inspire").css("top",e+eHeight-692);
//监控屏幕的滚动
var hideFirstbar=true;
var nowpage=0;//当前张数
var nextpage;//下一张
$(document).mousewheel(function (event,delta) {
    console.log(delta);
    //垂直滚动条距离顶部的值
    var srlTop=$(this).scrollTop();
    // console.log(srlTop)
    // // 获取滚动屏前的元素页面高度
    console.log(e);
    if (srlTop>=e+eHeight+100&&hideFirstbar){
        $(this).scrollTop+=500;
    // //    $("html").addClass("onHtml");
    //     $(".index-inspire").css({"position":"fixed","top":0})
    // //     $(".index-inspire").css("top",0)
    //     console.log("a")
    //         $(".index-inspire").find("page1").slideUp()


    }else if (srlTop<e+eHeight-51){
        $(".index-inspire").css({"position":"absolute","top":e+eHeight-692})
        // $("html").removeClass("onHtml");

    }

})