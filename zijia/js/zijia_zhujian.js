/**
 * Created by Administrator on 2017/1/19.
 */
//聚焦事件
$(".search").find("input").focusin(function () {
    $(".search_lb").show();
})
//失焦事件
$(".search").find("input").focusout(function () {
    $(".search_lb").hide();
})
//点击关闭
$(".search_lb").find(".search_cls").click(function () {
    $(".search_lb").hide();
})
