/**
 * Created by Administrator on 2017/1/18.
 */
//点击返回
$("#top").click(function () {
    $("html,body").animate({scrollTop:0},1000);//回到顶端
    return false;
})
//顶部搜索区
$(".search_select").click(function () {
    $(".search_select").find("ul").css("display","block")
})
$(".sUl").find("li").click(function (event) {
    event=event||window.event;
    if (event.stopPropagation()){event.stopPropagation()}
    else {event.cancelBubble=true}//防止事件冒泡没有这个就会触发父元素的冒泡
   var liTxt=$(this).text();
    $(".search_select").find("span").text(liTxt);
    $(".sUl").css("display","none")
})
// 导航部分的选项卡
$("#zhoubian").mouseenter(function () {
    $(".zhoubian").css("display","block")
})
$("#zhoubian").mouseleave(function () {
    $(".zhoubian").css("display","none")
})
$("#shequ").mouseenter(function () {
    $(".shequ").css("display","block")
})
$("#shequ").mouseleave(function () {
    $(".shequ").css("display","none")
})
$("#yudin").mouseenter(function () {
    $(".yudin").css("display","block")
})
$("#yudin").mouseleave(function () {
    $(".yudin").css("display","none")
})

//数据搜索部分
$(".qh").click(function () {
    $(this).hide();
    $(".flowList").show();
    $("section .flowItem li .flowPic .share").css("z-index",0);
})
$(".flowList .close").click(function () {
    $(".qh").show();
    $(".flowList").hide();
    $("section .flowItem li .flowPic .share").css("z-index",99);
})
$(".word").find("a").mouseenter(function () {
    $(this).addClass("word_on").siblings().removeClass("word_on");
    var wordIndex=$(this).index();
    $(".citys>div").eq(wordIndex).addClass("citys_on").siblings().removeClass("citys_on")
})

function share() {
    $(".share").click(function (event) {
        $(this).parent().find(".sharelb").toggle()
    })
    $(".flowPic").mouseenter(function () {
        $(this).find(".share").toggle();
        $(this).find(".sharelb").css("display","none")
    })
    $(".flowPic").mouseleave(function () {
        $(this).find(".share").toggle();
        $(this).find(".sharelb").css("display","none")
    })
}