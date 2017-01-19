/**
 * Created by Administrator on 2017/1/9.
 */
$(document).ready(function () {
    var imgArr=[
        {"a":"img1","b":"mudidiplay","c":2016,"d":1026,"e":"2016102617155933017_1920_680","f":"荟萃全球精选目的地，发现最新鲜有趣玩法"},
        {"a":"img3","b":"bcef","c":2016,"d":12,"e":"2016122211164624662184","f":"十二星座旅游达人 发现六安之美"},
        {"a":"img3","b":"bcef","c":2017,"d":"01","e":"2017010517330187428426","f":"嬉冰雪 泡温泉 到辽宁 过大年"},
        {"a":"img3","b":"bcef","c":2016,"d":12,"e":"2016121414215315160621","f":"尖叫吧！女神！勇攀冰峰·勇敢者的挑战"},
        {"a":"img1","b":"Home","c":2017,"d":"0108","e":"2017010819455623dbb","f":"即将消失的土家木屋，是怎样在勾心斗角中建成的"}
    ];
    //填充数据
    if(imgArr){
    	$.each(imgArr,function(i,value){
            var $li=$("<li></li>");
            var $a=$("<a></a>");
            var $h5=$("<h5>"+value.f+"</h5>");
            $a.appendTo($li);
            $h5.appendTo($li);
           $li.prependTo($(".banner_ul"));
           $li.css("background","url('http://"+value.a+".lotour.net/"+value.b+"/"+value.c+"/"+value.d+"/"+value.e+".jpg')");
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
    var lock=true;
    // //监控时间
    var TM=1000;
    var Tnum=0;
    var Tmer;
    //首次进来执行
    KM();
    //鼠标滑过停止,显示按钮
    $(".banner").mouseenter(function () {
        lock=false;
        $(".arrow-on").css("display","block");

    })
    //鼠标离开运动.隐藏按钮
    $(".banner").mouseleave(function () {
        lock=true;
        KM();
        $(".arrow-on").css("display","none");
    })
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
                    //换条行
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
                    //换条行
                    cirFunc();
                })
            }

        }
    }
    function cirFunc(){
        $(".schedule li").eq(nowIndex).addClass('on').siblings().removeClass('on');
        KM();
    }

    function KM() {
        if(Tnum<100){
            clearTimeout(Tmer)
            Tnum++;
            $(".schedule .on em").css("width",Tnum+"%").siblings().css("width",0);
            Tmer=setTimeout(KM,TM/100);
        }else {
            clearTimeout(Tmer);
            Tnum=0;
            if(lock==true){rightbtn()}

        }
    }
    function func() {
        $(".banner_ul").animate({"margin-left":-(nowIndex)*$liWidth},500,function () {
            cirFunc()
        })
    }

})
