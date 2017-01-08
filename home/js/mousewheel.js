/**
 * Created by Administrator on 2017/1/6.
 */
//监控屏幕的滚动
var hideFirstbar=true;
$(window).scroll(function () {
    //垂直滚动条距离顶部的值
    var srlTop=$(this).scrollTop();
    // 获取滚动屏前的页面高度
    var e=$(".index-ad-item").offset().top;//jq获取元素距离document顶部偏移量
    // console.log(e);
    var eHelght=$(".index-ad-item").height();//元素高度
    // console.log(eHelght)
    var toTop=e+eHelght;
    // console.log(toTop);
    if (srlTop>=toTop&&hideFirstbar){
        hideFirstbar=false;
        $()
    }

})