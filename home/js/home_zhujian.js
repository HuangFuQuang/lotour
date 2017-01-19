/**
 * Created by Administrator on 2017/1/12.
 */
//广告侧边栏
$(".bt-ad-btn").click(function () {
    $(this).animate({"left":-45},250,function () {
        // alert("完成")
        $(".bt-ad").animate({"left":0},500)
    })
})
$(".ad-in").find(".cls").click(function () {
    $(".bt-ad").animate({"left":"-100%"},500,function () {
        $(".bt-ad-btn").animate({"left":0},250)
    })
})
//意见反馈
$(".ltfeeback").click(function () {
    $(".ltfeebbg").css("display","block");
    $(".ltfeebin").css("display","block")
})
$(".ltfeebin").find(".close").click(function () {
    $(".ltfeebbg").css("display","none");
    $(".ltfeebin").css("display","none")
})
$(".ltfeebin").find(".send").click(function () {
    if ($(".ltfeebin").find("textarea").text()=="亮出你的毒舌，晒晒你的想法，叨叨你的建议 ，让乐途为你更完美！"){
        $(".ltfeebin").find(".tip").css("display","block");
        $(".ltfeebin").find("textarea").text()="";
    }else {
        $(".ltfeebbg").css("display","none");
        $(".ltfeebin").css("display","none")
    }
})