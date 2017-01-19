/**
 * Created by Administrator on 2017/1/11.
 */
//获取元素
$(".fr-h6").find("a").mouseenter(function () {
    $(this).addClass("fr-h6-on").siblings().removeClass("fr-h6-on")
    if($(this).hasClass("day")){
        $("#daylist").css("display","block");
        $("#monthlist").css("display","none");
    }else {
        $("#daylist").css("display","none");
        $("#monthlist").css("display","block");
    }
})
