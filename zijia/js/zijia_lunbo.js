/**
 * Created by Administrator on 2017/1/19.
 */
$(document).ready(function () {
    //模拟一个从后台传来的json
    var imgArr=[
        {"a":"img3","b":"bcef","c":2016,"d":12,"e":"2016120118160068721779","f":"自驾穿越内蒙古大草原 看尽千里冰封万里雪飘"},
        {"a":"img3","b":"bcef","c":2016,"d":10,"e":"2016100916193120633930","f":"内蒙古呼伦贝尔除了草原 这里还有绝美的湿地"},
        {"a":"img3","b":"bcef","c":2016,"d":10,"e":"2016100916231002706082","f":"自驾无人区神秘地带 带你走进最真实的无人区"},
    ];
    if (imgArr){
        $.each(imgArr,function (i,value) {
            var $li=$("<li class='banner_li'></li>");
            var $h5=$("<h5>"+value.f+"</h5>");
            $h5.appendTo($li);
            $li.css("background","url('http://"+value.a+".lotour.net/"+value.b+"/"+value.c+"/"+value.d+"/"+value.e+".jpg')");
            $li.appendTo($(".banner_ul"))
        })
        //补充第一张到最后
        var $first=$(".banner_ul li:first").clone();
        $first.appendTo($(".banner_ul"));
    }
    //判断当前的屏幕宽度
    bannerwidth();
    function bannerwidth(){
        var $winWidth=$(window).width();
        if($winWidth<=1030){
            $(".banner_ul").find("li").css("width",1030).end().css("width",(imgArr.length+1)*($(".banner_ul li").width()));
        }else{
            $(".banner_ul").find("li").css("width",$winWidth).end().css("width",(imgArr.length+1)*($(".banner_ul li").width()));
        }
        setTimeout(bannerwidth, 500);
    }
    var nowIndex=0;//0代表第一张
    var $liWidth=$(".banner_ul li").width();
    //单击事件
    $(".arrow-on").click(function () {
        if ($(this).hasClass("banner_right")) {
            rightbtn();
        }else{
            leftbtn();
        }

    })
    //自动事件
    var i=setTimeout(star,2000);
    function star() {
        clearTimeout(i)
        rightbtn();
        i=setTimeout(star,2000)
    }
    //右边函数
    function rightbtn() {
        if(!$(".banner_ul").is(":animated")){//:animate用于判断是否处于动画状态
            if (nowIndex<imgArr.length+1-2) {
                nowIndex++
                //console.log(nowIndex)
                //执行运动
                func();
            }else {
                nowIndex=0;
                $(".banner_ul").animate({"margin-left":-(imgArr.length)*$liWidth},500,function () {
                    $(".banner_ul").css("margin-left",0);
                    //小圆点
                    cirFunc();
                })
            }

        }
    }
    //左边函数
    function leftbtn() {
        if(!$(".banner_ul").is(":animated")){
            if(nowIndex>0){
                nowIndex--;
                console.log(nowIndex)
                func();
            }else{
                nowIndex=4;
                //否则左侧到头了  再点击的时候让图瞬间回到假1
                $(".banner_ul").css("margin-left",-(imgArr.length)*$liWidth);
                $(".banner_ul").animate({"margin-left":-(nowIndex)*$liWidth},500,function () {
                    //小圆点
                    cirFunc();
                })
            }

        }
    }
    function func() {
        $(".banner_ul").animate({"margin-left":-(nowIndex)*$liWidth},500,function () {
            cirFunc()
        })
    }
    function cirFunc(){
        $(".pgs span").eq(nowIndex).addClass('on').siblings().removeClass('on');
    }
})